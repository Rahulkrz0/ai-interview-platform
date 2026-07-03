const PISTON_API_URL = process.env.PISTON_API_URL || 'http://localhost:2000/api/v2';
const PISTON_TIMEOUT = parseInt(process.env.PISTON_TIMEOUT, 10) || 5000;
const MAX_CODE_SIZE = parseInt(process.env.MAX_CODE_SIZE, 10) || 50000;

const LANGUAGE_MAP = {
  javascript: 'javascript',
  python: 'python',
  java: 'java',
  cpp: 'cpp',
  c: 'c',
  typescript: 'typescript',
  go: 'go',
  rust: 'rust',
  kotlin: 'kotlin',
  csharp: 'csharp',
  php: 'php',
  swift: 'swift'
};

exports.executeCode = async ({ language, code, input = '' }) => {
  if (code.length > MAX_CODE_SIZE) {
    return {
      success: false,
      stdout: '',
      stderr: `Code exceeds maximum allowed size of ${MAX_CODE_SIZE} bytes.`,
      compile_output: '',
      time: 0,
      memory: 0,
      status: { id: 13, description: 'Internal Error' }
    };
  }

  let langKey = language.toLowerCase();
  if (langKey === 'c++') langKey = 'cpp';
  if (langKey === 'c#') langKey = 'csharp';
  if (langKey === 'node') langKey = 'javascript';

  const mappedLanguage = LANGUAGE_MAP[langKey];

  if (!mappedLanguage) {
    return {
      success: false,
      stdout: '',
      stderr: `Unsupported language: ${language}`,
      compile_output: '',
      time: 0,
      memory: 0,
      status: { id: 13, description: 'Internal Error' }
    };
  }

  try {
    const payload = {
      language: mappedLanguage,
      version: '*',
      files: [
        {
          content: code
        }
      ],
      stdin: input,
      run_timeout: PISTON_TIMEOUT,
      compile_timeout: PISTON_TIMEOUT
    };

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PISTON_TIMEOUT + 2000);

    const response = await fetch(`${PISTON_API_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Piston API returned status ${response.status}`);
    }

    const data = await response.json();
    
    // Check if Compilation Error exists
    if (data.compile && data.compile.code !== 0) {
      return {
        success: false,
        stdout: '',
        stderr: '',
        compile_output: data.compile.stderr || data.compile.stdout || 'Compilation failed.',
        time: 0,
        memory: 0,
        status: { id: 6, description: 'Compilation Error' }
      };
    }

    // Check Run Status
    const run = data.run || {};
    
    // Check for Time Limit Exceeded
    if (run.signal === 'SIGKILL' || (run.stderr && run.stderr.includes('Time Limit Exceeded'))) {
      return {
        success: false,
        stdout: run.stdout || '',
        stderr: run.stderr || 'Time Limit Exceeded',
        compile_output: '',
        time: PISTON_TIMEOUT,
        memory: 0,
        status: { id: 5, description: 'Time Limit Exceeded' }
      };
    }
    
    if (run.code !== 0) {
      return {
        success: false,
        stdout: run.stdout || '',
        stderr: run.stderr || 'Runtime Error',
        compile_output: '',
        time: 0,
        memory: 0,
        status: { id: 11, description: 'Runtime Error' }
      };
    }

    // Accepted / Successful execution
    return {
      success: true,
      stdout: run.stdout ? run.stdout.trim() : '',
      stderr: run.stderr ? run.stderr.trim() : '',
      compile_output: '',
      time: 15,
      memory: 12000,
      status: { id: 3, description: 'Accepted' }
    };

  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        success: false,
        stdout: '',
        stderr: 'Execution timed out (Network)',
        compile_output: '',
        time: PISTON_TIMEOUT,
        memory: 0,
        status: { id: 5, description: 'Time Limit Exceeded' }
      };
    }
    return {
      success: false,
      stdout: '',
      stderr: `Network Error: Could not reach Piston execution API.`,
      compile_output: '',
      time: 0,
      memory: 0,
      status: { id: 13, description: 'Internal Error' }
    };
  }
};
