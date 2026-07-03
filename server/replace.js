const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'services', 'geminiService.js');
let content = fs.readFileSync(filePath, 'utf8');

const helperFunc = `
let cachedModelName = null;

async function getValidModel() {
  if (!genAI) {
    throw new Error('Gemini API key is not configured. Real AI evaluation requires a valid API key.');
  }

  if (cachedModelName) return genAI.getGenerativeModel({ model: cachedModelName });
  
  if (isMockMode || !env.GEMINI_API_KEY) {
    cachedModelName = 'gemini-2.5-flash';
    return genAI.getGenerativeModel({ model: cachedModelName });
  }
  
  try {
    const url = \`https://generativelanguage.googleapis.com/v1beta/models?key=\${env.GEMINI_API_KEY}\`;
    const response = await fetch(url);
    const data = await response.json();
    
    if (data && data.models) {
      const validModels = data.models.filter(m => m.supportedGenerationMethods && m.supportedGenerationMethods.includes('generateContent'));
      const preferred = ['models/gemini-2.5-flash', 'models/gemini-2.0-flash', 'models/gemini-1.5-flash'];
      for (const pref of preferred) {
        if (validModels.find(m => m.name === pref)) {
           cachedModelName = pref.replace('models/', '');
           return genAI.getGenerativeModel({ model: cachedModelName });
        }
      }
      if (validModels.length > 0) {
        cachedModelName = validModels[0].name.replace('models/', '');
        return genAI.getGenerativeModel({ model: cachedModelName });
      }
    }
  } catch (err) {
    console.error('Failed to dynamically fetch Gemini models. Falling back to default.', err.message);
  }
  
  cachedModelName = 'gemini-2.5-flash';
  return genAI.getGenerativeModel({ model: cachedModelName });
}
`;

// Insert after the genAI block (around line 14)
content = content.replace(
  "console.error('Failed to initialize GoogleGenerativeAI:', err.message);\n  }\n}",
  "console.error('Failed to initialize GoogleGenerativeAI:', err.message);\n  }\n}\n" + helperFunc
);

// We need to also handle the one in evaluateAnswer where I already added `if (!genAI) throw new Error(...)` manually.
// Let's remove the redundant `if (!genAI) throw` from evaluateAnswer because it's now inside getValidModel().
content = content.replace(
  "    if (!genAI) {\n      throw new Error('Gemini API key is not configured. Real AI evaluation requires a valid API key.');\n    }\n    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });",
  "    const model = await getValidModel();"
);

// Global replace for the rest
content = content.replaceAll(
  "const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });",
  "const model = await getValidModel();"
);

fs.writeFileSync(filePath, content);
console.log("Replaced successfully!");
