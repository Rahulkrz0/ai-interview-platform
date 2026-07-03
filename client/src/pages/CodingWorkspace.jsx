import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import { api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import { 
  Play, Send, Zap, HelpCircle, Code2, ArrowLeft, Maximize2, Minimize2, 
  RefreshCw, CheckCircle2, XCircle, Clock, Database, Terminal, FileCode2, 
  Cpu, Award, MessageSquare, Save, Keyboard, BookOpen, AlertCircle
} from 'lucide-react';

const LANGUAGE_TEMPLATES = {
  javascript: '// Write your JavaScript code here\n',
  python: '# Write your Python code here\n',
  java: 'public class Main {\n    public static void main(String[] args) {\n        // Write your Java code here\n    }\n}',
  cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    // Write your C++ code here\n    return 0;\n}',
  c: '#include <stdio.h>\n\nint main() {\n    // Write your C code here\n    return 0;\n}',
  typescript: '// Write your TypeScript code here\n',
  go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    // Write your Go code here\n}',
  rust: 'fn main() {\n    // Write your Rust code here\n}',
  kotlin: 'fun main(args: Array<String>) {\n    // Write your Kotlin code here\n}',
  csharp: 'using System;\n\nclass Program {\n    static void Main(string[] args) {\n        // Write your C# code here\n    }\n}',
  php: '<?php\n// Write your PHP code here\n?>',
  swift: 'import Foundation\n// Write your Swift code here\n'
};

const CodingWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('javascript');
  const [theme, setTheme] = useState('vs-dark');
  const [code, setCode] = useState('');
  
  // UI State
  const [activeTab, setActiveTab] = useState('problem'); // problem, testcases, history, editorial, ai
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState('Saved');

  // Execution State
  const [customInput, setCustomInput] = useState('');
  const [useCustomInput, setUseCustomInput] = useState(false);
  const [executionResult, setExecutionResult] = useState(null);
  const [submissionResult, setSubmissionResult] = useState(null);
  const [submissionHistory, setSubmissionHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  // AI Assistant State
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [userMessage, setUserMessage] = useState('');

  useEffect(() => {
    fetchProblemDetail();
    fetchSubmissions();
  }, [id]);

  const fetchProblemDetail = async () => {
    setFetchLoading(true);
    try {
      const res = await api.get(`/coding/problems/${id}`);
      const prob = res.data.data.problem;
      setProblem(prob);
      if (prob) {
        setLanguage('javascript');
        setCode(prob.starterCode?.javascript || LANGUAGE_TEMPLATES['javascript']);
      }
    } catch (err) {
      console.error('Error fetching problem details:', err);
    } finally {
      setFetchLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const res = await api.get('/coding/history', { params: { problemId: id } });
      setSubmissionHistory(res.data.data.submissions || []);
    } catch (err) {
      console.error('Error fetching submissions history:', err);
    }
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    if (problem && problem.starterCode && problem.starterCode[lang]) {
      setCode(problem.starterCode[lang]);
    } else {
      setCode(LANGUAGE_TEMPLATES[lang] || `// Write your ${lang} code here\n`);
    }
  };

  const handleCodeChange = (val) => {
    setCode(val);
    setAutoSaveStatus('Saving...');
    const timer = setTimeout(() => {
      setAutoSaveStatus('Saved');
    }, 1000);
    return () => clearTimeout(timer);
  };

  // Run Code (Sample test cases + custom input)
  const handleRunCode = async () => {
    setLoading(true);
    setExecutionResult(null);
    setSubmissionResult(null);
    setActiveTab('testcases');
    try {
      const res = await api.post('/coding/run', {
        problemId: problem._id,
        language,
        code,
        customInput: useCustomInput ? customInput : ''
      });
      setExecutionResult(res.data.data);
    } catch (err) {
      setExecutionResult({
        isSuccess: false,
        compileOutput: err.response?.data?.message || 'Error occurred during execution.',
        testCaseResults: []
      });
    } finally {
      setLoading(false);
    }
  };

  // Submit Code (All hidden test cases + AI evaluation)
  const handleSubmitCode = async () => {
    setLoading(true);
    setExecutionResult(null);
    setSubmissionResult(null);
    setActiveTab('testcases');
    try {
      const res = await api.post('/coding/submit', {
        problemId: problem._id,
        language,
        code
      });
      setSubmissionResult(res.data.data);
      fetchSubmissions(); // refresh history
    } catch (err) {
      setSubmissionResult({
        status: 'fail',
        verdict: err.response?.data?.message || 'Error occurred during submission.'
      });
    } finally {
      setLoading(false);
    }
  };

  // AI Assistant trigger
  const handleAiAction = async (action, message = '') => {
    setAiLoading(true);
    setActiveTab('ai');
    try {
      const res = await api.post('/coding/assistant', {
        problemId: problem._id,
        code,
        language,
        action,
        message
      });
      setAiResponse(res.data.data.assistantReply || 'No response from AI Assistant.');
      if (message) setUserMessage('');
    } catch (err) {
      setAiResponse(err.response?.data?.message || 'Error reaching AI Assistant.');
    } finally {
      setAiLoading(false);
    }
  };

  if (fetchLoading) return <LoadingSpinner />;

  if (!problem) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4 text-center space-y-4">
        <AlertCircle className="h-12 w-12 text-rose-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">Coding Problem Not Found</h2>
        <p className="text-sm text-slate-500">The problem you are looking for does not exist or has been removed.</p>
        <button onClick={() => navigate('/coding')} className="px-5 py-2.5 bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg hover:bg-indigo-600 transition-all">
          Back to Problem List
        </button>
      </div>
    );
  }

  return (
    <div className={`flex flex-col h-[calc(100vh-70px)] bg-slate-900/5 dark:bg-slate-950/50 ${isFullScreen ? 'fixed inset-0 z-50 bg-slate-950 p-4' : 'p-4 max-w-[1600px] mx-auto w-full'} transition-all duration-300 animate-fade-in`}>
      {/* Top Workspace Navbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-slate-200/10 mb-4">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => navigate('/coding')}
            className="flex items-center space-x-1.5 px-3 py-1.5 border border-slate-200/10 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-500/10 transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Problems</span>
          </button>
          
          <div className="flex items-center space-x-3">
            <span className="text-sm font-black text-indigo-500 bg-indigo-500/10 px-2.5 py-1 rounded-xl border border-indigo-500/20">
              #{problem.problemNumber}
            </span>
            <h1 className="text-lg font-black text-slate-800 dark:text-slate-100">{problem.title}</h1>
            <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold ${
              problem.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
              problem.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
              'bg-rose-500/10 text-rose-500 border border-rose-500/20'
            }`}>
              {problem.difficulty}
            </span>
          </div>
        </div>

        {/* Action Controls & Toggles */}
        <div className="flex items-center space-x-3">
          {/* Auto Save indicator */}
          <div className="flex items-center space-x-1.5 text-[11px] font-semibold text-slate-500 border border-slate-200/10 px-2.5 py-1.5 rounded-xl bg-slate-500/5">
            <Save className="h-3.5 w-3.5 text-emerald-500" />
            <span>{autoSaveStatus}</span>
          </div>

          {/* Keyboard Shortcuts Trigger */}
          <button 
            onClick={() => setShowKeyboardShortcuts(!showKeyboardShortcuts)}
            className="flex items-center space-x-1 px-2.5 py-1.5 border border-slate-200/10 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-500/10 transition-all shadow-sm"
            title="Keyboard Shortcuts"
          >
            <Keyboard className="h-4 w-4 text-indigo-500" />
            <span className="hidden sm:inline">Shortcuts</span>
          </button>

          {/* Full Screen Toggle */}
          <button 
            onClick={() => setIsFullScreen(!isFullScreen)}
            className="flex items-center space-x-1 px-2.5 py-1.5 border border-slate-200/10 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-500/10 transition-all shadow-sm"
          >
            {isFullScreen ? <Minimize2 className="h-4 w-4 text-amber-500" /> : <Maximize2 className="h-4 w-4 text-indigo-500" />}
            <span className="hidden sm:inline">{isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Layout Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 flex-1 overflow-hidden">
        
        {/* Left Panel: Tabs & Details (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4 h-full overflow-hidden">
          {/* Tabs Navigation */}
          <GlassCard className="flex items-center p-1 space-x-1 bg-slate-500/5 border border-slate-200/10 rounded-2xl shadow-sm">
            <button
              onClick={() => setActiveTab('problem')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'problem' ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-500/10'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Problem</span>
            </button>
            <button
              onClick={() => setActiveTab('testcases')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'testcases' ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-500/10'
              }`}
            >
              <Terminal className="h-3.5 w-3.5" />
              <span>Console</span>
            </button>
            <button
              onClick={() => setActiveTab('ai')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'ai' ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30' : 'text-purple-500 hover:bg-purple-500/10 font-black'
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              <span>AI Tutor</span>
            </button>
            <button
              onClick={() => setActiveTab('editorial')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'editorial' ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-500/10'
              }`}
            >
              <FileCode2 className="h-3.5 w-3.5" />
              <span>Editorial</span>
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-3 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'history' ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30' : 'text-slate-600 dark:text-slate-400 hover:bg-slate-500/10'
              }`}
            >
              <Clock className="h-3.5 w-3.5" />
              <span>History</span>
            </button>
          </GlassCard>

          {/* Tab Content Container */}
          <GlassCard className="flex-1 overflow-y-auto p-6 space-y-6 flex flex-col border border-slate-200/10 shadow-lg">
            {/* TAB: PROBLEM DESCRIPTION */}
            {activeTab === 'problem' && (
              <div className="space-y-6 text-slate-700 dark:text-slate-300">
                {/* Meta Tags */}
                <div className="flex flex-wrap items-center gap-2 border-b border-slate-200/10 pb-4">
                  <span className="text-xs font-bold bg-indigo-500/10 text-indigo-500 px-3 py-1 rounded-xl border border-indigo-500/20">
                    Topic: {problem.topic}
                  </span>
                  <span className="text-xs font-bold bg-slate-500/10 text-slate-500 px-3 py-1 rounded-xl border border-slate-200/10">
                    Time: {problem.timeComplexity || 'O(N)'}
                  </span>
                  <span className="text-xs font-bold bg-slate-500/10 text-slate-500 px-3 py-1 rounded-xl border border-slate-200/10">
                    Space: {problem.spaceComplexity || 'O(1)'}
                  </span>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Problem Description</h3>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                    {problem.description}
                  </p>
                </div>

                {/* Function & Input/Output Formats */}
                <div className="grid grid-cols-1 gap-4 p-4 bg-slate-500/5 rounded-2xl border border-slate-200/10 text-xs">
                  <div>
                    <span className="font-bold text-indigo-500 block mb-1">Input Format:</span>
                    <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">{problem.inputFormat || 'Standard parameter arguments matching signature.'}</p>
                  </div>
                  <div>
                    <span className="font-bold text-indigo-500 block mb-1">Output Format:</span>
                    <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">{problem.outputFormat || 'Return expected result matching return type.'}</p>
                  </div>
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Examples</h3>
                  {problem.testCases?.slice(0, 3).map((tc, index) => (
                    <div key={index} className="p-4 bg-slate-500/5 rounded-2xl border border-slate-200/10 space-y-2 text-xs font-mono">
                      <div className="font-bold text-indigo-500 text-[11px] uppercase tracking-wider">Example {index + 1}:</div>
                      <div>
                        <span className="text-slate-400 font-bold">Input:</span> <span className="text-slate-700 dark:text-slate-300">{tc.input}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 font-bold">Output:</span> <span className="text-emerald-500 font-bold">{tc.expectedOutput}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-3 border-t border-slate-200/10 pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Constraints</h3>
                  <ul className="list-disc pl-5 text-xs text-slate-600 dark:text-slate-400 space-y-1 font-mono">
                    {problem.constraints?.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>

                {/* Company Tags */}
                <div className="space-y-3 border-t border-slate-200/10 pt-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Frequently Asked In</h3>
                  <div className="flex flex-wrap gap-2">
                    {problem.companies?.map(c => (
                      <span key={c} className="text-xs bg-slate-500/10 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-xl font-bold border border-slate-200/10">
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: TEST CASES & EXECUTION RESULTS */}
            {activeTab === 'testcases' && (
              <div className="space-y-6 flex-1 flex flex-col">
                {/* Results Overview Header */}
                {loading ? (
                  <div className="py-12 text-center space-y-4 my-auto">
                    <LoadingSpinner />
                    <p className="text-xs text-slate-500 font-bold animate-pulse">Compiling & executing code on Judge0 servers...</p>
                  </div>
                ) : submissionResult ? (
                  // Submission Results View
                  <div className="space-y-6 animate-fade-in">
                    <div className={`p-6 rounded-2xl border ${
                      submissionResult.verdict === 'Accepted' ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                    } flex items-center space-x-4 shadow-lg`}>
                      {submissionResult.verdict === 'Accepted' ? <CheckCircle2 className="h-10 w-10 shrink-0" /> : <XCircle className="h-10 w-10 shrink-0" />}
                      <div>
                        <h3 className="text-xl font-black text-slate-800 dark:text-slate-100">{submissionResult.verdict}</h3>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                          Passed {submissionResult.passedCases} / {submissionResult.totalCases} Test Cases (including hidden test cases).
                        </p>
                      </div>
                    </div>

                    {/* AI Review Details */}
                    {submissionResult.submission && (
                      <div className="space-y-4 p-5 bg-gradient-to-br from-indigo-500/5 to-purple-600/5 border border-indigo-500/20 rounded-2xl shadow-sm">
                        <h4 className="text-xs font-black uppercase tracking-wider text-indigo-500 flex items-center space-x-1.5">
                          <Zap className="h-4 w-4" />
                          <span>AI Complexity & Code Optimization Review</span>
                        </h4>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="bg-slate-500/10 p-3 rounded-xl border border-slate-200/10">
                            <span className="text-slate-400 font-medium">Time Complexity</span>
                            <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{submissionResult.submission.complexityAnalysis?.timeComplexity || 'O(N)'}</div>
                          </div>
                          <div className="bg-slate-500/10 p-3 rounded-xl border border-slate-200/10">
                            <span className="text-slate-400 font-medium">Space Complexity</span>
                            <div className="font-bold text-slate-800 dark:text-slate-200 mt-0.5">{submissionResult.submission.complexityAnalysis?.spaceComplexity || 'O(1)'}</div>
                          </div>
                        </div>
                        <div className="space-y-1 text-xs text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-200/10">
                          <span className="font-bold text-slate-400 block mb-1">Optimization Suggestion:</span>
                          <p className="leading-relaxed">{submissionResult.submission.aiOptimizationSuggestion}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ) : executionResult ? (
                  // Run Code Results View
                  <div className="space-y-6 animate-fade-in">
                    <div className={`p-4 rounded-2xl border ${
                      executionResult.isSuccess ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500' : 'bg-rose-500/10 border-rose-500/30 text-rose-500'
                    } flex items-center space-x-3 shadow-sm`}>
                      {executionResult.isSuccess ? <CheckCircle2 className="h-6 w-6 shrink-0" /> : <XCircle className="h-6 w-6 shrink-0" />}
                      <div>
                        <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{executionResult.isSuccess ? 'Compilation Successful & Test Cases Passed' : 'Execution Failed'}</h4>
                        <p className="text-[11px] text-slate-500">Time: {executionResult.executionTime}ms | Memory: {executionResult.memoryUsed}KB</p>
                      </div>
                    </div>

                    {/* Custom Input Output */}
                    {executionResult.customInputResult && (
                      <div className="space-y-2 p-4 bg-slate-500/5 rounded-2xl border border-slate-200/10 font-mono text-xs">
                        <div className="font-bold text-indigo-500 text-[11px] uppercase tracking-wider">Custom Input Output:</div>
                        <div><span className="text-slate-400 font-semibold">Input:</span> {executionResult.customInputResult.input}</div>
                        <div><span className="text-slate-400 font-semibold">Output:</span> <span className="text-emerald-500 font-bold">{executionResult.customInputResult.output}</span></div>
                      </div>
                    )}

                    {/* Sample Test Case Breakdown */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Sample Test Cases Breakdown</h4>
                      {executionResult.testCaseResults?.map((tc, idx) => (
                        <div key={idx} className={`p-4 rounded-2xl border ${tc.passed ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'} font-mono text-xs space-y-1.5`}>
                          <div className="flex items-center justify-between font-bold text-[11px]">
                            <span className={tc.passed ? 'text-emerald-500' : 'text-rose-500'}>Test Case {idx + 1}: {tc.passed ? 'PASSED' : 'FAILED'}</span>
                            <span className="text-slate-500">{tc.time}ms</span>
                          </div>
                          <div><span className="text-slate-400">Input:</span> {tc.input}</div>
                          <div><span className="text-slate-400">Expected:</span> {tc.expectedOutput}</div>
                          <div><span className="text-slate-400">Actual Output:</span> <span className={tc.passed ? 'text-emerald-500 font-bold' : 'text-rose-500 font-bold'}>{tc.actualOutput}</span></div>
                        </div>
                      ))}
                    </div>

                    {/* Compile Output Log */}
                    {executionResult.compileOutput && (
                      <div className="space-y-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-500 block">Console Logs / Compilation Stream:</span>
                        <pre className="p-4 bg-slate-950 rounded-2xl text-rose-400 border border-slate-800 font-mono text-[11px] overflow-x-auto leading-relaxed">
                          {executionResult.compileOutput}
                        </pre>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="py-12 text-center text-slate-400 space-y-3 my-auto">
                    <Terminal className="h-12 w-12 mx-auto opacity-40" />
                    <h3 className="text-base font-bold text-slate-700 dark:text-slate-200">Execution Console Ready</h3>
                    <p className="text-xs text-slate-500 max-w-sm mx-auto">Click "Run Code" to execute sample test cases or "Submit Code" to run all hidden test cases.</p>
                  </div>
                )}

                {/* Custom Input Box Toggle */}
                <div className="mt-auto border-t border-slate-200/10 pt-4 space-y-4">
                  <label className="flex items-center space-x-2 cursor-pointer text-xs font-bold text-slate-700 dark:text-slate-300">
                    <input 
                      type="checkbox" 
                      checked={useCustomInput} 
                      onChange={e => setUseCustomInput(e.target.checked)}
                      className="rounded border-slate-200/20 text-indigo-500 focus:ring-indigo-500 bg-slate-500/10 w-4 h-4"
                    />
                    <span>Test against Custom Input</span>
                  </label>

                  {useCustomInput && (
                    <textarea
                      value={customInput}
                      onChange={e => setCustomInput(e.target.value)}
                      placeholder="Enter custom input arguments matching problem input format..."
                      rows={3}
                      className="w-full p-4 bg-slate-500/5 dark:bg-slate-900/50 border border-slate-200/20 dark:border-slate-700/50 rounded-2xl text-xs font-mono text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 shadow-inner"
                    />
                  )}
                </div>
              </div>
            )}

            {/* TAB: AI ASSISTANT */}
            {activeTab === 'ai' && (
              <div className="space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-6">
                  {/* Title */}
                  <div className="flex items-center space-x-3 pb-4 border-b border-slate-200/10">
                    <div className="w-10 h-10 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-sm">
                      <Zap className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">AI Coding Interview Assistant</h3>
                      <p className="text-xs text-slate-500">Get personalized hints, complexity breakdowns, and code reviews without giving away the complete answer immediately.</p>
                    </div>
                  </div>

                  {/* AI Quick Actions */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button onClick={() => handleAiAction('explain_problem')} disabled={aiLoading} className="p-3 bg-slate-500/5 hover:bg-slate-500/10 border border-slate-200/10 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-2 transition-all shadow-sm">
                      <BookOpen className="h-4 w-4 text-indigo-500" /><span>Explain Problem</span>
                    </button>
                    <button onClick={() => handleAiAction('hint')} disabled={aiLoading} className="p-3 bg-slate-500/5 hover:bg-slate-500/10 border border-slate-200/10 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-2 transition-all shadow-sm">
                      <HelpCircle className="h-4 w-4 text-amber-500" /><span>Give Hint</span>
                    </button>
                    <button onClick={() => handleAiAction('brute_force')} disabled={aiLoading} className="p-3 bg-slate-500/5 hover:bg-slate-500/10 border border-slate-200/10 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-2 transition-all shadow-sm">
                      <Cpu className="h-4 w-4 text-rose-500" /><span>Explain Brute Force</span>
                    </button>
                    <button onClick={() => handleAiAction('optimal_solution')} disabled={aiLoading} className="p-3 bg-slate-500/5 hover:bg-slate-500/10 border border-slate-200/10 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center space-x-2 transition-all shadow-sm">
                      <Award className="h-4 w-4 text-emerald-500" /><span>Explain Optimal Solution</span>
                    </button>
                    <button onClick={() => handleAiAction('explain_code')} disabled={aiLoading} className="col-span-2 p-3 bg-gradient-to-r from-indigo-500/10 to-purple-600/10 border border-indigo-500/20 rounded-2xl text-xs font-bold text-indigo-500 flex items-center justify-center space-x-2 hover:opacity-90 transition-all shadow-sm">
                      <Code2 className="h-4 w-4" /><span>Explain My Code / Suggest Improvements</span>
                    </button>
                  </div>

                  {/* AI Response Box */}
                  <div className="flex-1 min-h-[200px] p-6 bg-slate-500/5 rounded-2xl border border-slate-200/10 overflow-y-auto space-y-4 shadow-inner">
                    {aiLoading ? (
                      <div className="py-12 text-center space-y-4">
                        <LoadingSpinner />
                        <p className="text-xs text-purple-500 font-bold animate-pulse">AI Assistant is analyzing your code & generating response...</p>
                      </div>
                    ) : aiResponse ? (
                      <div className="space-y-4 text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap font-sans">
                        {aiResponse}
                      </div>
                    ) : (
                      <div className="py-12 text-center text-slate-400 space-y-2">
                        <MessageSquare className="h-10 w-10 mx-auto opacity-40 text-purple-500" />
                        <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">How can I assist you today?</h4>
                        <p className="text-xs text-slate-500 max-w-xs mx-auto">Select a quick action above or type a custom question below regarding your code or logic.</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Custom Chat Input Box */}
                <div className="flex items-center space-x-2 pt-2 border-t border-slate-200/10">
                  <input
                    type="text"
                    placeholder="Ask AI anything about this problem or your code..."
                    value={userMessage}
                    onChange={e => setUserMessage(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && userMessage.trim() && handleAiAction('custom', userMessage)}
                    className="flex-1 px-4 py-3 bg-slate-500/5 dark:bg-slate-900/50 border border-slate-200/20 dark:border-slate-700/50 rounded-2xl text-xs font-semibold text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:border-purple-500 shadow-inner"
                  />
                  <button
                    onClick={() => userMessage.trim() && handleAiAction('custom', userMessage)}
                    disabled={aiLoading || !userMessage.trim()}
                    className="px-5 py-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold text-xs rounded-2xl shadow-lg hover:shadow-purple-600/30 transition-all flex items-center space-x-1.5"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send</span>
                  </button>
                </div>
              </div>
            )}

            {/* TAB: EDITORIAL SOLUTION */}
            {activeTab === 'editorial' && (
              <div className="space-y-6 text-slate-700 dark:text-slate-300 animate-fade-in">
                <div className="border-b border-slate-200/10 pb-4">
                  <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Editorial & Optimal Solution</h3>
                  <p className="text-xs text-slate-500">Comprehensive breakdown of the best algorithmic approach.</p>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500">Optimal Approach Explanation</h4>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                    {problem.editorial || 'To solve this problem optimally, examine the state transitions and constraints. Using an auxiliary data structure or a multi-pointer traversal reduces the redundant comparisons significantly.'}
                  </p>
                </div>

                <div className="space-y-4 border-t border-slate-200/10 pt-4">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500">Clean Optimal Code Solution</h4>
                  <pre className="p-4 bg-slate-950 rounded-2xl text-emerald-400 border border-slate-800 font-mono text-[11px] overflow-x-auto leading-relaxed shadow-inner">
                    {problem.starterCode?.javascript || '// Editorial solution code block'}
                  </pre>
                </div>
              </div>
            )}

            {/* TAB: SUBMISSION HISTORY */}
            {activeTab === 'history' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-center justify-between border-b border-slate-200/10 pb-4">
                  <div>
                    <h3 className="text-base font-bold text-slate-800 dark:text-slate-100">Submission History</h3>
                    <p className="text-xs text-slate-500">Review your past code submissions and verdicts.</p>
                  </div>
                  <button onClick={fetchSubmissions} className="p-2 border border-slate-200/10 rounded-xl hover:bg-slate-500/10 text-slate-500 transition-all">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>

                {submissionHistory.length === 0 ? (
                  <div className="py-12 text-center text-slate-400 space-y-2 my-auto">
                    <Clock className="h-12 w-12 mx-auto opacity-40" />
                    <h4 className="text-sm font-bold text-slate-700 dark:text-slate-200">No submissions yet</h4>
                    <p className="text-xs text-slate-500">Submit your code to see your performance history and AI optimization suggestions here.</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {submissionHistory.map(sub => (
                      <div key={sub._id} className="p-4 bg-slate-500/5 rounded-2xl border border-slate-200/10 flex items-center justify-between gap-4 hover:border-indigo-500/20 transition-all shadow-sm">
                        <div className="space-y-1">
                          <div className="flex items-center space-x-2">
                            <span className={`font-black text-xs ${sub.status === 'Accepted' ? 'text-emerald-500' : 'text-rose-500'}`}>
                              {sub.verdict}
                            </span>
                            <span className="text-[10px] uppercase bg-slate-500/10 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-md font-bold">
                              {sub.language}
                            </span>
                          </div>
                          <p className="text-[11px] text-slate-500">
                            Passed {sub.testCasesPassed} / {sub.totalTestCases} | Time: {sub.executionTime}ms | Memory: {sub.memoryUsed}KB
                          </p>
                        </div>
                        <div className="text-right text-[11px] text-slate-400 font-semibold">
                          {new Date(sub.createdAt).toLocaleDateString()} {new Date(sub.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </GlassCard>
        </div>

        {/* Right Panel: Monaco Editor & Action Bars (7 cols) */}
        <div className="lg:col-span-7 flex flex-col space-y-4 h-full overflow-hidden">
          {/* Editor Controls Bar */}
          <GlassCard className="flex flex-wrap items-center justify-between p-3 border border-slate-200/10 rounded-2xl shadow-sm gap-2">
            <div className="flex items-center space-x-3">
              {/* Language Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-bold hidden sm:inline">Language:</span>
                <select
                  value={language}
                  onChange={e => handleLanguageChange(e.target.value)}
                  className="bg-slate-500/10 border border-slate-200/20 dark:border-slate-700/50 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 px-3 py-2 focus:outline-none focus:border-indigo-500 shadow-inner"
                >
                  <option value="c" className="bg-white dark:bg-slate-800">C</option>
                  <option value="cpp" className="bg-white dark:bg-slate-800">C++</option>
                  <option value="csharp" className="bg-white dark:bg-slate-800">C#</option>
                  <option value="go" className="bg-white dark:bg-slate-800">Go</option>
                  <option value="java" className="bg-white dark:bg-slate-800">Java</option>
                  <option value="javascript" className="bg-white dark:bg-slate-800">JavaScript</option>
                  <option value="kotlin" className="bg-white dark:bg-slate-800">Kotlin</option>
                  <option value="php" className="bg-white dark:bg-slate-800">PHP</option>
                  <option value="python" className="bg-white dark:bg-slate-800">Python 3</option>
                  <option value="rust" className="bg-white dark:bg-slate-800">Rust</option>
                  <option value="swift" className="bg-white dark:bg-slate-800">Swift</option>
                  <option value="typescript" className="bg-white dark:bg-slate-800">TypeScript</option>
                </select>
              </div>

              {/* Theme Selector */}
              <div className="flex items-center space-x-2">
                <span className="text-xs text-slate-600 dark:text-slate-400 font-bold hidden sm:inline">Theme:</span>
                <select
                  value={theme}
                  onChange={e => setTheme(e.target.value)}
                  className="bg-slate-500/10 border border-slate-200/20 dark:border-slate-700/50 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 px-3 py-2 focus:outline-none focus:border-indigo-500 shadow-inner"
                >
                  <option value="vs-dark" className="bg-white dark:bg-slate-800">Visual Studio Dark</option>
                  <option value="light" className="bg-white dark:bg-slate-800">Light Theme</option>
                </select>
              </div>
            </div>

            {/* Execute & Submit Buttons */}
            <div className="flex items-center space-x-3 w-full sm:w-auto justify-end">
              <button
                onClick={handleRunCode}
                disabled={loading}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-5 py-2.5 bg-slate-500/10 border border-slate-200/20 hover:bg-slate-500/20 text-slate-800 dark:text-slate-100 rounded-xl text-xs font-bold transition-all shadow-sm"
              >
                <Play className="h-4 w-4 text-emerald-500 fill-current" />
                <span>Run Code</span>
              </button>
              <button
                onClick={handleSubmitCode}
                disabled={loading}
                className="flex-1 sm:flex-none flex items-center justify-center space-x-1.5 px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 hover:opacity-95 text-white rounded-xl text-xs font-bold transition-all shadow-lg hover:shadow-indigo-500/30"
              >
                <Send className="h-4 w-4" />
                <span>Submit Code</span>
              </button>
            </div>
          </GlassCard>

          {/* Monaco Editor Wrapper */}
          <div className="flex-1 rounded-2xl overflow-hidden border border-slate-200/10 shadow-2xl relative bg-slate-950">
            <Editor
              height="100%"
              language={language}
              theme={theme}
              value={code}
              onChange={handleCodeChange}
              options={{
                fontSize: 14,
                fontFamily: 'JetBrains Mono, Fira Code, monospace',
                minimap: { enabled: false },
                automaticLayout: true,
                tabSize: 2,
                scrollBeyondLastLine: false,
                smoothScrolling: true,
                cursorBlinking: 'smooth'
              }}
            />
          </div>
        </div>
      </div>

      {/* KEYBOARD SHORTCUTS MODAL */}
      {showKeyboardShortcuts && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <GlassCard className="max-w-md w-full p-6 space-y-6 border border-slate-200/20 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-200/10 pb-4">
              <div className="flex items-center space-x-2 text-indigo-500">
                <Keyboard className="h-6 w-6" />
                <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Editor Keyboard Shortcuts</h3>
              </div>
              <button onClick={() => setShowKeyboardShortcuts(false)} className="p-2 border border-slate-200/10 rounded-xl hover:bg-slate-500/10 text-slate-400">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400">
              <div className="flex items-center justify-between p-2.5 bg-slate-500/5 rounded-xl border border-slate-200/10">
                <span className="font-bold">Run Code (Sample Cases)</span>
                <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded font-mono font-bold">Ctrl + '</kbd>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-500/5 rounded-xl border border-slate-200/10">
                <span className="font-bold">Submit Code (All Cases)</span>
                <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded font-mono font-bold">Ctrl + Enter</kbd>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-500/5 rounded-xl border border-slate-200/10">
                <span className="font-bold">Toggle Full Screen</span>
                <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded font-mono font-bold">F11</kbd>
              </div>
              <div className="flex items-center justify-between p-2.5 bg-slate-500/5 rounded-xl border border-slate-200/10">
                <span className="font-bold">Command Palette</span>
                <kbd className="px-2 py-1 bg-slate-200 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded font-mono font-bold">F1</kbd>
              </div>
            </div>

            <button onClick={() => setShowKeyboardShortcuts(false)} className="w-full py-3 bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg hover:bg-indigo-600 transition-all">
              Got it, Close
            </button>
          </GlassCard>
        </div>
      )}
    </div>
  );
};

export default CodingWorkspace;
