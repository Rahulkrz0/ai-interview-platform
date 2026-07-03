import React, { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { 
  Sparkles, FileText, CheckSquare, Users, Code, Terminal, Compass, 
  Activity, Map, Key, Briefcase, Wand2, SpellCheck, Mail, Calendar, 
  Loader2, Copy, Check, ChevronDown, ChevronUp, AlertCircle, Bookmark
} from 'lucide-react';

const AiTools = () => {
  const [activeTool, setActiveTool] = useState('resume-reviewer');
  const [inputs, setInputs] = useState({
    resumeText: '',
    jobDescription: '',
    companyName: '',
    jobRole: '',
    experience: 'Entry level',
    category: 'JavaScript',
    difficulty: 'Medium',
    topic: 'Arrays',
    skills: '',
    dreamRole: '',
    currentSkills: '',
    targetSkills: '',
    timelineWeeks: 4,
    question: '',
    draftAnswer: '',
    text: '',
    emailType: 'cold-email',
    recipientName: '',
    userDetails: '',
    targetCompany: 'Google',
    dailyHours: '2',
    timeWindowWeeks: '4'
  });

  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const [openHintIndex, setOpenHintIndex] = useState(null);

  // Tools categorizations
  const tools = [
    {
      category: 'Resume & Job Search',
      items: [
        { id: 'resume-reviewer', name: 'AI Resume Reviewer', icon: FileText, desc: 'Section-by-section formatting and keyword review.' },
        { id: 'ats-checker', name: 'ATS Resume Checker', icon: CheckSquare, desc: 'Measure resume compatibility against a job description.' },
        { id: 'cover-letter', name: 'Cover Letter Generator', icon: FileText, desc: 'Generate customized, professional cover letters.' },
        { id: 'keyword-optimizer', name: 'Resume Keyword Optimizer', icon: Key, desc: 'Extract key industry-standard keywords from JDs.' },
        { id: 'jd-analyzer', name: 'Job Description Analyzer', icon: Briefcase, desc: 'Extract responsibilities, tech stacks, and topics.' },
        { id: 'grammar-checker', name: 'AI Grammar Checker', icon: SpellCheck, desc: 'Fix spelling, phrasing, and formal tone errors.' },
        { id: 'email-generator', name: 'AI Email Generator', icon: Mail, desc: 'Draft cold networking, referral, and follow-up templates.' }
      ]
    },
    {
      category: 'Interview Preparation',
      items: [
        { id: 'hr-generator', name: 'HR Interview Generator', icon: Users, desc: 'Generate role & company-specific HR questions.' },
        { id: 'tech-generator', name: 'Technical Interview Generator', icon: Code, desc: 'Get category-specific technical concepts questions.' },
        { id: 'coding-generator', name: 'Coding Interview Generator', icon: Terminal, desc: 'Generate coding challenges with progressive hints.' },
        { id: 'answer-improver', name: 'Interview Answer Improver', icon: Wand2, desc: 'Refine weak responses using strong action words.' }
      ]
    },
    {
      category: 'Career & Studies',
      items: [
        { id: 'career-coach', name: 'AI Career Coach', icon: Compass, desc: 'Assess qualifications, salaries, and certificates.' },
        { id: 'skill-gap', name: 'Skill Gap Analyzer', icon: Activity, desc: 'Identify tech shortages and receive custom learning tips.' },
        { id: 'roadmap-generator', name: 'Learning Roadmap Generator', icon: Map, desc: 'Get a week-by-week timeline resource guide.' },
        { id: 'study-planner', name: 'AI Study Planner', icon: Calendar, desc: 'Generate a day-by-day weekly study schedule.' }
      ]
    }
  ];

  // Clear output on tool switch
  useEffect(() => {
    setResult(null);
    setError('');
    setProgress(0);
    setOpenHintIndex(null);
  }, [activeTool]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInputs(prev => ({ ...prev, [name]: value }));
  };

  const handleCopyText = (textToCopy) => {
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setProgress(15);
    setResult(null);

    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 85) {
          clearInterval(interval);
          return 85;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 250);

    try {
      const res = await api.post(`/ai-tools/${activeTool}`, inputs);
      setProgress(100);
      setTimeout(() => {
        setResult(res.data.data.result);
      }, 300);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || err.message || 'AI processing encountered an error. Please try again.');
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  // Find active tool metadata
  const currentToolMeta = tools.flatMap(cat => cat.items).find(t => t.id === activeTool);

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-4 px-4 text-slate-800 dark:text-slate-100 animate-in fade-in duration-200">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <Sparkles className="h-6 w-6 text-indigo-500 fill-indigo-500/20" />
          <span>Advanced AI Tools Center</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">Accelerate your career preparation using modular Generative AI modules.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left Side: Tool List Selector */}
        <div className="lg:col-span-1 space-y-4">
          <GlassCard className="p-4 space-y-4 max-h-[75vh] overflow-y-auto pr-1 scrollbar-thin">
            {tools.map(cat => (
              <div key={cat.category} className="space-y-1.5">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-2.5 pt-2">
                  {cat.category}
                </h4>
                <div className="space-y-0.5">
                  {cat.items.map(item => {
                    const IconComp = item.icon;
                    const isActive = activeTool === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTool(item.id)}
                        className={`w-full flex items-center space-x-2.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/10'
                            : 'hover:bg-indigo-500/10 text-slate-500 hover:text-indigo-500 dark:hover:text-indigo-400'
                        }`}
                      >
                        <IconComp className="h-4 w-4 shrink-0" />
                        <span className="truncate">{item.name}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </GlassCard>
        </div>

        {/* Right Side: Active Workspace & Output */}
        <div className="lg:col-span-3 space-y-6">
          <GlassCard className="p-6 space-y-6">
            {/* Active Tool Header */}
            <div className="flex items-start space-x-3.5 border-b border-slate-200/10 pb-4">
              <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-2xl">
                {currentToolMeta && React.createElement(currentToolMeta.icon, { className: 'h-6 w-6' })}
              </div>
              <div className="space-y-0.5">
                <h2 className="text-lg font-bold">{currentToolMeta?.name}</h2>
                <p className="text-xs text-slate-400 leading-relaxed">{currentToolMeta?.desc}</p>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="flex items-center space-x-2.5 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Dynamic Inputs Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Resume Reviewer / ATS Check / Cover Letter / Profile review / Keyword optimization */}
                {['resume-reviewer', 'ats-checker', 'cover-letter'].includes(activeTool) && (
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-400 block uppercase">Resume Text</label>
                    <textarea
                      name="resumeText"
                      value={inputs.resumeText}
                      onChange={handleInputChange}
                      rows="6"
                      placeholder="Paste your plain text resume content here..."
                      className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                      disabled={loading}
                      required
                    ></textarea>
                  </div>
                )}

                {/* 2. ATS Check / Keyword Optimization / Job Description Analyzer */}
                {['ats-checker', 'keyword-optimizer', 'jd-analyzer'].includes(activeTool) && (
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-400 block uppercase">Job Description</label>
                    <textarea
                      name="jobDescription"
                      value={inputs.jobDescription}
                      onChange={handleInputChange}
                      rows="6"
                      placeholder="Paste target job role descriptions here..."
                      className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                      disabled={loading}
                      required
                    ></textarea>
                  </div>
                )}

                {/* 3. Cover Letter Inputs */}
                {activeTool === 'cover-letter' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={inputs.companyName}
                        onChange={handleInputChange}
                        placeholder="Google"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Target Job Role</label>
                      <input
                        type="text"
                        name="jobRole"
                        value={inputs.jobRole}
                        onChange={handleInputChange}
                        placeholder="Full Stack Software Engineer"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                      />
                    </div>
                  </>
                )}

                {/* 4. HR Interview / Tech Interview Generator Inputs */}
                {['hr-generator', 'tech-generator'].includes(activeTool) && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Target Job Role</label>
                      <input
                        type="text"
                        name="jobRole"
                        value={inputs.jobRole}
                        onChange={handleInputChange}
                        placeholder="Full Stack Engineer"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Experience Level</label>
                      <select
                        name="experience"
                        value={inputs.experience}
                        onChange={handleInputChange}
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                      >
                        <option value="Entry level" className="bg-slate-900 text-white">Entry Level (0-1 yrs)</option>
                        <option value="Associate" className="bg-slate-900 text-white">Associate (1-3 yrs)</option>
                        <option value="Mid Senior" className="bg-slate-900 text-white">Mid-Senior (3-5 yrs)</option>
                        <option value="Lead Architect" className="bg-slate-900 text-white">Lead / Architect (5+ yrs)</option>
                      </select>
                    </div>
                  </>
                )}

                {/* HR Company */}
                {activeTool === 'hr-generator' && (
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-400 block uppercase">Target Company</label>
                    <input
                      type="text"
                      name="companyName"
                      value={inputs.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g. Microsoft, TCS"
                      className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                      disabled={loading}
                    />
                  </div>
                )}

                {/* Tech category */}
                {activeTool === 'tech-generator' && (
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-400 block uppercase">Technology Category</label>
                    <select
                      name="category"
                      value={inputs.category}
                      onChange={handleInputChange}
                      className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                      disabled={loading}
                    >
                      <option value="React" className="bg-slate-900 text-white">React.js</option>
                      <option value="Node.js" className="bg-slate-900 text-white">Node.js</option>
                      <option value="JavaScript" className="bg-slate-900 text-white">JavaScript (ES6)</option>
                      <option value="SQL" className="bg-slate-900 text-white">SQL & Relational DB</option>
                      <option value="DBMS" className="bg-slate-900 text-white">DBMS Principles</option>
                      <option value="OOP" className="bg-slate-900 text-white">Object Oriented Design</option>
                      <option value="Operating System" className="bg-slate-900 text-white">Operating System</option>
                      <option value="Computer Networks" className="bg-slate-900 text-white">Computer Networks</option>
                      <option value="System Design" className="bg-slate-900 text-white">System Design (Basic)</option>
                    </select>
                  </div>
                )}

                {/* 5. Coding Interview Generator Inputs */}
                {activeTool === 'coding-generator' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Topic</label>
                      <select
                        name="topic"
                        value={inputs.topic}
                        onChange={handleInputChange}
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                      >
                        <option value="Arrays" className="bg-slate-900 text-white">Arrays & Hashing</option>
                        <option value="Linked Lists" className="bg-slate-900 text-white">Linked Lists</option>
                        <option value="Trees" className="bg-slate-900 text-white">Binary Trees / BST</option>
                        <option value="Dynamic Programming" className="bg-slate-900 text-white">Dynamic Programming</option>
                        <option value="Recursion" className="bg-slate-900 text-white">Recursion & Backtracking</option>
                        <option value="Sorting" className="bg-slate-900 text-white">Sorting & Searching</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Difficulty</label>
                      <select
                        name="difficulty"
                        value={inputs.difficulty}
                        onChange={handleInputChange}
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                      >
                        <option value="Easy" className="bg-slate-900 text-white">Easy</option>
                        <option value="Medium" className="bg-slate-900 text-white">Medium</option>
                        <option value="Hard" className="bg-slate-900 text-white">Hard</option>
                      </select>
                    </div>
                  </>
                )}

                {/* 6. AI Career Coach Inputs */}
                {activeTool === 'career-coach' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Skills (Comma-separated)</label>
                      <input
                        type="text"
                        name="skills"
                        value={inputs.skills}
                        onChange={handleInputChange}
                        placeholder="React, Node.js, JS, CSS"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Dream Career Role</label>
                      <input
                        type="text"
                        name="dreamRole"
                        value={inputs.dreamRole}
                        onChange={handleInputChange}
                        placeholder="Software Architect"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                  </>
                )}

                {/* 7. Skill Gap Analyzer Inputs */}
                {activeTool === 'skill-gap' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Your Current Skills</label>
                      <input
                        type="text"
                        name="currentSkills"
                        value={inputs.currentSkills}
                        onChange={handleInputChange}
                        placeholder="HTML, CSS, JS, React"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Target Job Requirements</label>
                      <input
                        type="text"
                        name="targetSkills"
                        value={inputs.targetSkills}
                        onChange={handleInputChange}
                        placeholder="React, Redux, Node.js, Docker, AWS"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                  </>
                )}

                {/* 8. Learning Roadmap Generator Inputs */}
                {activeTool === 'roadmap-generator' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Topic/Skill to Master</label>
                      <input
                        type="text"
                        name="topic"
                        value={inputs.topic}
                        onChange={handleInputChange}
                        placeholder="Docker & Kubernetes"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Timeline (Weeks)</label>
                      <input
                        type="number"
                        name="timelineWeeks"
                        value={inputs.timelineWeeks}
                        onChange={handleInputChange}
                        min="1"
                        max="24"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                  </>
                )}

                {/* 9. Interview Answer Improver Inputs */}
                {activeTool === 'answer-improver' && (
                  <>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Interview Question</label>
                      <input
                        type="text"
                        name="question"
                        value={inputs.question}
                        onChange={handleInputChange}
                        placeholder="e.g. Tell me about how you handle data fetching in React?"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Your Draft Answer</label>
                      <textarea
                        name="draftAnswer"
                        value={inputs.draftAnswer}
                        onChange={handleInputChange}
                        rows="4"
                        placeholder="Paste your quick draft or conversational response..."
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      ></textarea>
                    </div>
                  </>
                )}

                {/* 10. AI Grammar Checker Inputs */}
                {activeTool === 'grammar-checker' && (
                  <div className="md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-400 block uppercase">Text to Check</label>
                    <textarea
                      name="text"
                      value={inputs.text}
                      onChange={handleInputChange}
                      rows="6"
                      placeholder="Paste professional paragraphs, messages, or descriptions here..."
                      className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                      disabled={loading}
                      required
                    ></textarea>
                  </div>
                )}

                {/* 11. AI Email Generator Inputs */}
                {activeTool === 'email-generator' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Email Type</label>
                      <select
                        name="emailType"
                        value={inputs.emailType}
                        onChange={handleInputChange}
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                      >
                        <option value="cold-email" className="bg-slate-900 text-white">Cold Placement Pitch</option>
                        <option value="job-application" className="bg-slate-900 text-white">Job Application Mail</option>
                        <option value="referral-request" className="bg-slate-900 text-white">Referral Request</option>
                        <option value="follow-up" className="bg-slate-900 text-white">Post-Interview Follow-Up</option>
                      </select>
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Recipient Name/Title</label>
                      <input
                        type="text"
                        name="recipientName"
                        value={inputs.recipientName}
                        onChange={handleInputChange}
                        placeholder="Hiring Manager / Recruiter Name"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Company Name</label>
                      <input
                        type="text"
                        name="companyName"
                        value={inputs.companyName}
                        onChange={handleInputChange}
                        placeholder="e.g. Amazon, Infosys"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Your Details Summary</label>
                      <input
                        type="text"
                        name="userDetails"
                        value={inputs.userDetails}
                        onChange={handleInputChange}
                        placeholder="React intern graduate at Tech School"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                  </>
                )}

                {/* 12. AI Study Planner Inputs */}
                {activeTool === 'study-planner' && (
                  <>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Target Company</label>
                      <input
                        type="text"
                        name="targetCompany"
                        value={inputs.targetCompany}
                        onChange={handleInputChange}
                        placeholder="Google, TCS, Microsoft"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Daily Practice Hours</label>
                      <input
                        type="number"
                        name="dailyHours"
                        value={inputs.dailyHours}
                        onChange={handleInputChange}
                        min="1"
                        max="16"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                    <div className="md:col-span-2 space-y-1">
                      <label className="text-xs font-bold text-slate-400 block uppercase">Time Window (Weeks)</label>
                      <input
                        type="number"
                        name="timeWindowWeeks"
                        value={inputs.timeWindowWeeks}
                        onChange={handleInputChange}
                        min="1"
                        max="24"
                        className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-200"
                        disabled={loading}
                        required
                      />
                    </div>
                  </>
                )}

              </div>

              {/* Progress and submit area */}
              <div className="pt-2">
                {loading && (
                  <div className="space-y-2 p-3.5 bg-indigo-500/5 border border-indigo-500/15 rounded-2xl text-center mb-4">
                    <div className="flex items-center justify-center space-x-2 text-xs font-bold text-indigo-500">
                      <Loader2 className="h-4.5 w-4.5 animate-spin" />
                      <span>Gemini AI is processing your inputs...</span>
                    </div>
                    <div className="w-full bg-slate-500/10 h-2.5 rounded-full overflow-hidden">
                      <div 
                        style={{ width: `${progress}%` }}
                        className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-300"
                      ></div>
                    </div>
                    <span className="text-[10px] text-slate-400 font-bold">{progress}% completed</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-xs font-bold hover:shadow-lg hover:shadow-indigo-500/15 disabled:opacity-50 transition-all flex items-center justify-center space-x-2"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>{loading ? 'AI Processing...' : 'Generate AI Review Output'}</span>
                </button>
              </div>
            </form>
          </GlassCard>

          {/* Results Output Box */}
          {result && (
            <GlassCard className="p-6 md:p-8 space-y-6 animate-in fade-in duration-300">
              <div className="flex justify-between items-center border-b border-slate-200/10 pb-3">
                <h3 className="text-base font-bold flex items-center space-x-2 text-indigo-500">
                  <Sparkles className="h-5 w-5 fill-indigo-500/10" />
                  <span>AI Tool Result Analysis</span>
                </h3>
                {/* Global copy handler if single text is present */}
                {typeof result === 'string' && (
                  <button
                    onClick={() => handleCopyText(result)}
                    className="flex items-center space-x-1.5 px-3 py-1.5 glass-panel border border-slate-200/10 text-slate-400 hover:text-indigo-500 rounded-xl text-xs font-bold transition-all"
                  >
                    {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                )}
              </div>

              {/* DYNAMIC RESULTS FORMATTING RENDERERS */}
              <div className="text-left space-y-4">
                
                {/* 1. Resume Reviewer */}
                {activeTool === 'resume-reviewer' && (
                  <div className="space-y-4 text-xs md:text-sm">
                    <div className="p-4 bg-indigo-500/5 border border-indigo-500/15 rounded-2xl flex items-center justify-between">
                      <span className="font-bold text-slate-400">Visual & Section Score</span>
                      <span className="text-2xl font-black text-indigo-500">{result.visualScore}%</span>
                    </div>

                    <div className="space-y-2">
                      <h4 className="font-bold text-indigo-500 uppercase tracking-wider text-[10px]">Formatting Gaps</h4>
                      <ul className="list-disc pl-5 space-y-1.5 text-slate-500">
                        {result.formattingFeedback?.map((item, idx) => <li key={idx}>{item}</li>)}
                      </ul>
                    </div>

                    <div className="space-y-3.5 border-t border-slate-200/10 pt-4">
                      <h4 className="font-bold text-indigo-500 uppercase tracking-wider text-[10px]">Section Evaluation</h4>
                      {result.sectionReviews && Object.keys(result.sectionReviews).map(sec => (
                        <div key={sec} className="bg-slate-500/5 p-3 rounded-xl border border-slate-200/10">
                          <span className="font-bold uppercase text-[10px] text-slate-400 block mb-1">{sec} review</span>
                          <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-xs">{result.sectionReviews[sec]}</p>
                        </div>
                      ))}
                    </div>

                    {result.actionPlan && (
                      <div className="border-t border-slate-200/10 pt-4 space-y-2">
                        <h4 className="font-bold text-emerald-500 uppercase tracking-wider text-[10px]">Top Immediate Fixes</h4>
                        <ol className="list-decimal pl-5 space-y-1 text-slate-500">
                          {result.actionPlan.map((action, idx) => <li key={idx} className="font-semibold">{action}</li>)}
                        </ol>
                      </div>
                    )}
                  </div>
                )}

                {/* 2. ATS Resume Checker */}
                {activeTool === 'ats-checker' && (
                  <div className="space-y-4 text-xs md:text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-indigo-500/5 border border-indigo-500/15 rounded-2xl text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400">ATS Formatting Score</span>
                        <p className="text-2xl font-black text-indigo-500 mt-1">{result.atsScore}%</p>
                      </div>
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl text-center">
                        <span className="text-[10px] uppercase font-bold text-slate-400">Keyword Match Score</span>
                        <p className="text-2xl font-black text-emerald-500 mt-1">{result.matchPercentage}%</p>
                      </div>
                    </div>

                    {/* Matched Keywords */}
                    <div className="space-y-2">
                      <span className="font-bold text-slate-400 block uppercase text-[10px]">Matched Keywords</span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.matchedKeywords?.map(kw => (
                          <span key={kw} className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded text-[10px] font-bold">
                            ✓ {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Missing Keywords */}
                    <div className="space-y-2 border-t border-slate-200/10 pt-4">
                      <span className="font-bold text-slate-400 block uppercase text-[10px] text-red-500">Missing Keywords (Required in JD)</span>
                      <div className="flex flex-wrap gap-1.5">
                        {result.missingKeywords?.map(kw => (
                          <span key={kw} className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded text-[10px] font-bold">
                            + {kw}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Recommendations */}
                    {result.recommendations && (
                      <div className="border-t border-slate-200/10 pt-4 space-y-2">
                        <span className="font-bold text-slate-400 block uppercase text-[10px]">ATS Tuning Suggestions</span>
                        <ul className="list-disc pl-5 space-y-1.5 text-slate-500 leading-relaxed">
                          {result.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. Cover Letter Generator */}
                {activeTool === 'cover-letter' && (
                  <div className="space-y-4 text-xs md:text-sm bg-slate-500/5 p-6 rounded-2xl border border-slate-200/10 relative">
                    <button
                      onClick={() => handleCopyText(`${result.subjectLine}\n\n${result.salutation}\n\n${result.body?.replace(/<[^>]*>/g, '')}\n\n${result.signOff}`)}
                      className="absolute top-4 right-4 p-2 bg-slate-500/10 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-500 rounded-xl transition-all"
                      title="Copy Cover Letter"
                    >
                      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </button>

                    <div className="space-y-2 font-mono">
                      <p className="border-b border-slate-200/10 pb-2">
                        <span className="font-bold text-slate-400">Subject:</span> {result.subjectLine}
                      </p>
                      <p className="pt-2">{result.salutation}</p>
                      <div 
                        className="space-y-3 pt-2 text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: result.body }}
                      ></div>
                      <p className="pt-4 whitespace-pre-line">{result.signOff}</p>
                    </div>
                  </div>
                )}

                {/* 4. HR Interview & Technical Interview Questions Generator */}
                {['hr-generator', 'tech-generator'].includes(activeTool) && Array.isArray(result) && (
                  <div className="space-y-4">
                    {result.map((q, i) => (
                      <GlassCard key={i} className="p-5 border border-slate-200/10 space-y-3">
                        <h4 className="font-bold text-slate-800 dark:text-slate-100 flex items-start space-x-2 text-sm">
                          <span className="h-5 w-5 rounded-full bg-indigo-500 text-white flex items-center justify-center text-[10px] shrink-0 font-black mt-0.5">{i+1}</span>
                          <span>{q.question}</span>
                        </h4>
                        
                        {q.intent && (
                          <p className="text-xs text-slate-500 leading-relaxed">
                            <span className="font-bold text-slate-400 uppercase text-[9px] block">Evaluation Intent:</span>
                            {q.intent}
                          </p>
                        )}
                        {q.topicsCovered && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {q.topicsCovered.map(topic => (
                              <span key={topic} className="bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded text-[9px] font-bold">
                                #{topic}
                              </span>
                            ))}
                          </div>
                        )}
                        {q.optimalAnswerSummary && (
                          <p className="text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-500/5 p-2 rounded-lg border border-indigo-500/10 leading-relaxed">
                            <span className="font-bold uppercase text-[9px] block text-slate-400">Target Keywords:</span>
                            {q.optimalAnswerSummary}
                          </p>
                        )}
                        <p className="text-xs text-slate-600 dark:text-slate-400 bg-slate-500/5 p-2 rounded-lg leading-relaxed">
                          <span className="font-bold uppercase text-[9px] block text-slate-400">Prep Strategy:</span>
                          {q.tips}
                        </p>
                      </GlassCard>
                    ))}
                  </div>
                )}

                {/* 5. Coding Interview Generator */}
                {activeTool === 'coding-generator' && (
                  <div className="space-y-4 text-xs md:text-sm">
                    <div className="flex justify-between items-center border-b border-slate-200/10 pb-2">
                      <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">{result.title}</h4>
                      <span className="text-[10px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded">
                        {result.optimalComplexity}
                      </span>
                    </div>

                    <div className="bg-slate-500/5 p-4 rounded-xl border border-slate-200/10 font-mono whitespace-pre-line text-xs">
                      {result.description}
                    </div>

                    {result.starterCode && (
                      <div className="space-y-2">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block">Starter Template Code</span>
                        <pre className="bg-slate-900 text-emerald-400 p-4 rounded-xl font-mono text-[11px] overflow-x-auto">
                          {result.starterCode}
                        </pre>
                      </div>
                    )}

                    {/* Hints Progressive Accordion */}
                    {result.hints && (
                      <div className="space-y-2.5 border-t border-slate-200/10 pt-4">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block">Progressive Coding Hints</span>
                        <div className="space-y-2">
                          {result.hints.map((hint, idx) => {
                            const isOpen = openHintIndex === idx;
                            return (
                              <div key={idx} className="border border-slate-200/10 rounded-xl overflow-hidden">
                                <button
                                  type="button"
                                  onClick={() => setOpenHintIndex(isOpen ? null : idx)}
                                  className="w-full flex justify-between items-center px-4 py-2.5 bg-slate-500/5 hover:bg-slate-500/10 text-left text-xs font-bold transition-all text-slate-700 dark:text-slate-300"
                                >
                                  <span>Hint {idx + 1}: {idx === 0 ? 'Basic Direction' : (idx === 1 ? 'Data Structure' : 'Complexity Target')}</span>
                                  {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                                </button>
                                {isOpen && (
                                  <div className="p-4 bg-indigo-500/5 text-xs leading-relaxed text-indigo-500 font-semibold border-t border-slate-200/10">
                                    {hint}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 6. Career Coach */}
                {activeTool === 'career-coach' && (
                  <div className="space-y-4 text-xs md:text-sm">
                    <div className="bg-indigo-500/5 p-4 rounded-2xl border border-indigo-500/15">
                      <span className="font-bold text-indigo-500 uppercase text-[10px] block mb-1">Coach Profile Assessment</span>
                      <p className="text-slate-600 dark:text-slate-300 leading-relaxed">{result.currentAssessment}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Salary */}
                      <div className="p-4 bg-amber-500/5 border border-amber-500/15 rounded-2xl">
                        <span className="font-bold text-amber-500 uppercase text-[10px] block mb-1">Target Market Salary Range</span>
                        <p className="text-base font-bold text-slate-800 dark:text-slate-200">{result.salaryTrend}</p>
                      </div>

                      {/* Certifications */}
                      <div className="p-4 bg-purple-500/5 border border-purple-500/15 rounded-2xl space-y-1.5">
                        <span className="font-bold text-purple-500 uppercase text-[10px] block">Recommended Certifications</span>
                        <ul className="list-disc pl-4 space-y-1 font-semibold text-slate-600 dark:text-slate-400 text-xs">
                          {result.recommendedCertificates?.map(c => <li key={c}>{c}</li>)}
                        </ul>
                      </div>
                    </div>

                    {/* Pathway Progression */}
                    {result.progressionSteps && (
                      <div className="space-y-2 border-t border-slate-200/10 pt-4">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block">Suggested Job Pathway Timeline</span>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pt-2">
                          {result.progressionSteps.map((step, idx) => (
                            <React.Fragment key={step}>
                              <div className="p-3 bg-slate-500/5 border border-slate-200/10 rounded-xl text-xs font-bold text-center shrink-0 w-full sm:w-auto">
                                {step}
                              </div>
                              {idx < result.progressionSteps.length - 1 && (
                                <span className="hidden sm:inline text-slate-400 font-extrabold mx-2">→</span>
                              )}
                            </React.Fragment>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.coachAdvice && (
                      <div className="border-t border-slate-200/10 pt-4">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block mb-1">Strategy Advice</span>
                        <p className="text-slate-500 leading-relaxed italic">"{result.coachAdvice}"</p>
                      </div>
                    )}
                  </div>
                )}

                {/* 7. Skill Gap Analyzer */}
                {activeTool === 'skill-gap' && (
                  <div className="space-y-4 text-xs md:text-sm">
                    <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/15 rounded-2xl">
                      <span className="font-bold text-slate-400">Identified Tech Gap Severity</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                        result.gapSeverity === 'High' ? 'bg-red-500/10 text-red-500' : (result.gapSeverity === 'Medium' ? 'bg-amber-500/10 text-amber-500' : 'bg-emerald-500/10 text-emerald-500')
                      }`}>{result.gapSeverity}</span>
                    </div>

                    {/* Missing list */}
                    <div className="space-y-1.5">
                      <span className="font-bold text-slate-400 uppercase text-[10px] block">Missing skills from target JD</span>
                      <div className="flex flex-wrap gap-1">
                        {result.missingSkills?.map(s => (
                          <span key={s} className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded font-bold text-[10px]">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Prioritization List */}
                    {result.skillPrioritization && (
                      <div className="space-y-3 border-t border-slate-200/10 pt-4">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block">Study Prioritization Checklist</span>
                        <div className="space-y-2">
                          {result.skillPrioritization.map(skill => (
                            <div key={skill.skillName} className="p-3.5 border border-slate-200/10 rounded-xl space-y-1.5 text-xs text-left">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-slate-800 dark:text-slate-100">{skill.skillName}</span>
                                <span className={`px-2 py-0.5 rounded text-[9px] font-bold ${
                                  skill.importance === 'High' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500'
                                }`}>{skill.importance} Priority</span>
                              </div>
                              <p className="text-slate-500 leading-relaxed text-xs">{skill.learningPlan}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {result.remedyActionPlan && (
                      <div className="border-t border-slate-200/10 pt-4 space-y-2">
                        <span className="font-bold text-emerald-500 uppercase text-[10px] block">Action Plan Remedy Items</span>
                        <ul className="list-decimal pl-5 space-y-1 text-slate-500 font-semibold">
                          {result.remedyActionPlan.map((action, i) => <li key={i}>{action}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* 8. Learning Roadmap Generator */}
                {activeTool === 'roadmap-generator' && (
                  <div className="space-y-4 text-xs md:text-sm">
                    <div className="flex justify-between items-center border-b border-slate-200/10 pb-2">
                      <h4 className="font-bold text-sm text-indigo-500">{result.roadmapTitle}</h4>
                      <span className="text-[10px] text-slate-400 font-bold uppercase">Time Commitment: {result.estimatedTimeCommitment}</span>
                    </div>

                    <div className="space-y-3">
                      {result.weeklyMilestones?.map(m => (
                        <div key={m.week} className="p-4 bg-slate-500/5 border border-slate-200/10 rounded-2xl space-y-2 text-xs">
                          <span className="font-bold text-indigo-500 text-xs block uppercase">Week {m.week}: {m.topic}</span>
                          
                          {/* Subtopics */}
                          <div className="flex flex-wrap gap-1.5 pt-1">
                            {m.subtopics?.map(st => (
                              <span key={st} className="bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded font-bold text-[9px]">
                                {st}
                              </span>
                            ))}
                          </div>

                          <p className="text-slate-500 mt-1 leading-relaxed">
                            <span className="font-semibold text-slate-400 block text-[10px] uppercase">Exercise/Project Goal:</span>
                            {m.projectGoal}
                          </p>

                          {m.resources && m.resources.length > 0 && (
                            <div className="pt-1.5 border-t border-slate-200/5 text-[10px] text-slate-400 flex items-center flex-wrap gap-2 font-semibold">
                              <span>Recommended Guides:</span>
                              {m.resources.map(res => <span key={res} className="bg-slate-500/10 text-slate-500 px-2 py-0.5 rounded">{res}</span>)}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 9. Resume Keyword Optimizer */}
                {activeTool === 'keyword-optimizer' && (
                  <div className="space-y-4 text-xs md:text-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Tech */}
                      <div className="p-4 bg-indigo-500/5 border border-indigo-500/15 rounded-2xl space-y-1.5">
                        <span className="font-bold text-indigo-500 text-xs block mb-1">Technical Skills keywords</span>
                        <div className="flex flex-wrap gap-1">
                          {result.technicalKeywords?.map(kw => (
                            <span key={kw} className="bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded font-bold text-[10px]">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Soft */}
                      <div className="p-4 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl space-y-1.5">
                        <span className="font-bold text-emerald-500 text-xs block mb-1">Soft Skills keywords</span>
                        <div className="flex flex-wrap gap-1">
                          {result.softSkills?.map(kw => (
                            <span key={kw} className="bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded font-bold text-[10px]">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Context Usage */}
                    {result.contextUsage && (
                      <div className="space-y-3 border-t border-slate-200/10 pt-4">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block">Context-Based Integration Examples</span>
                        <div className="space-y-2">
                          {result.contextUsage.map(cu => (
                            <div key={cu.keyword} className="bg-slate-500/5 p-3.5 rounded-xl border border-slate-200/10 space-y-1 leading-relaxed">
                              <span className="font-bold text-indigo-500 text-[10px] uppercase block">Keyword: {cu.keyword}</span>
                              <p className="text-slate-600 dark:text-slate-400 font-mono text-[11px]">"{cu.sampleBulletPoint}"</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 10. Job Description Analyzer */}
                {activeTool === 'jd-analyzer' && (
                  <div className="space-y-4 text-xs md:text-sm">
                    {/* Responsibilities */}
                    <div className="space-y-1.5">
                      <span className="font-bold text-slate-400 uppercase text-[10px] block">Core Responsibilities</span>
                      <ul className="list-disc pl-5 space-y-1 text-slate-500 leading-relaxed">
                        {result.coreResponsibilities?.map((resp, i) => <li key={i}>{resp}</li>)}
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-slate-200/10 pt-4">
                      {/* Tech Stack */}
                      <div className="space-y-2">
                        <span className="font-bold text-indigo-500 uppercase text-[10px] block">Primary Tech Stack</span>
                        <div className="flex flex-wrap gap-1">
                          {result.primaryStack?.map(tech => (
                            <span key={tech} className="bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded font-bold text-[10px]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Nice to Have */}
                      <div className="space-y-2">
                        <span className="font-bold text-purple-500 uppercase text-[10px] block">Preferred/Nice to have</span>
                        <div className="flex flex-wrap gap-1">
                          {result.niceToHave?.map(tech => (
                            <span key={tech} className="bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded font-bold text-[10px]">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Interview Topics */}
                    {result.likelyInterviewTopics && (
                      <div className="border-t border-slate-200/10 pt-4 space-y-1.5">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block">Predicted Interview Technical topics</span>
                        <ul className="list-disc pl-5 space-y-1.5 text-slate-500 leading-relaxed font-semibold">
                          {result.likelyInterviewTopics.map((topic, i) => <li key={i}>{topic}</li>)}
                        </ul>
                      </div>
                    )}
                  </div>
                )}

                {/* 11. Interview Answer Improver */}
                {activeTool === 'answer-improver' && (
                  <div className="space-y-4 text-xs md:text-sm">
                    {/* Critique */}
                    <div className="bg-red-500/5 border border-red-500/15 p-4 rounded-xl">
                      <span className="font-bold text-red-500 uppercase text-[10px] block mb-1">Critique of Draft Answer</span>
                      <p className="text-slate-500 leading-relaxed">{result.originalCritique}</p>
                    </div>

                    {/* Improved Answer */}
                    {result.improvedAnswer && (
                      <div className="space-y-2 border-t border-slate-200/10 pt-4">
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-indigo-500 uppercase text-[10px] block">Polished Answer Version</span>
                          <button
                            onClick={() => handleCopyText(result.improvedAnswer)}
                            className="text-xs text-slate-400 hover:text-indigo-500 flex items-center space-x-1"
                          >
                            <Copy className="h-3 w-3" />
                            <span>Copy</span>
                          </button>
                        </div>
                        <div className="bg-indigo-500/5 border border-indigo-500/10 p-5 rounded-2xl font-mono text-[11px] leading-relaxed text-slate-700 dark:text-slate-200">
                          {result.improvedAnswer}
                        </div>
                      </div>
                    )}

                    {/* Added keywords */}
                    {result.addedKeywords && (
                      <div className="space-y-2 pt-2">
                        <span className="font-bold text-slate-400 uppercase text-[9px] block">Added Professional Terms</span>
                        <div className="flex flex-wrap gap-1">
                          {result.addedKeywords.map(kw => (
                            <span key={kw} className="bg-emerald-500/10 text-emerald-500 px-2.5 py-0.5 rounded font-bold text-[9px]">
                              + {kw}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 12. AI Grammar Checker */}
                {activeTool === 'grammar-checker' && (
                  <div className="space-y-4 text-xs md:text-sm">
                    <div className="p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-xs font-semibold text-indigo-500">
                      Tone Rating: {result.toneAnalysis}
                    </div>

                    {/* Corrected Text Box */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block">Corrected Phrasing Output</span>
                        <button
                          onClick={() => handleCopyText(result.correctedText)}
                          className="text-xs text-slate-400 hover:text-indigo-500 flex items-center space-x-1"
                        >
                          <Copy className="h-3 w-3" />
                          <span>Copy</span>
                        </button>
                      </div>
                      <div className="bg-slate-500/5 p-4 rounded-xl border border-slate-200/10 font-mono text-[11px] leading-relaxed">
                        {result.correctedText}
                      </div>
                    </div>

                    {/* Corrections List */}
                    {result.correctionsList && result.correctionsList.length > 0 && (
                      <div className="space-y-3 border-t border-slate-200/10 pt-4">
                        <span className="font-bold text-slate-400 uppercase text-[10px] block">List of edits</span>
                        <div className="space-y-2.5">
                          {result.correctionsList.map((c, i) => (
                            <div key={i} className="p-3 bg-slate-500/5 border border-slate-200/10 rounded-xl space-y-1 text-xs">
                              <div className="flex flex-wrap gap-2 text-[10px] font-bold">
                                <span className="text-red-500 line-through">"{c.original}"</span>
                                <span className="text-slate-400">→</span>
                                <span className="text-emerald-500">"{c.corrected}"</span>
                              </div>
                              <p className="text-[10px] text-slate-400 pt-0.5 font-semibold">Reason: {c.reason}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* 13. AI Email Generator */}
                {activeTool === 'email-generator' && (
                  <div className="space-y-4 text-xs md:text-sm bg-slate-500/5 p-5 rounded-2xl border border-slate-200/10 relative font-mono">
                    <button
                      onClick={() => handleCopyText(`Subject: ${result.subject}\n\n${result.salutation}\n\n${result.body?.replace(/\\n/g, '\n')}\n\n${result.closing}`)}
                      className="absolute top-4 right-4 p-2 bg-slate-500/10 hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-500 rounded-xl transition-all"
                      title="Copy Email Template"
                    >
                      {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
                    </button>

                    <p className="border-b border-slate-200/10 pb-2">
                      <span className="font-bold text-slate-400">Subject:</span> {result.subject}
                    </p>
                    <p className="pt-2">{result.salutation}</p>
                    <p className="pt-2 whitespace-pre-line text-slate-600 dark:text-slate-300 leading-relaxed">
                      {result.body?.replace(/\\n/g, '\n')}
                    </p>
                    <p className="pt-4 whitespace-pre-line">{result.closing}</p>
                  </div>
                )}

                {/* 14. AI Study Planner */}
                {activeTool === 'study-planner' && (
                  <div className="space-y-4 text-xs md:text-sm">
                    <div className="flex justify-between items-center border-b border-slate-200/10 pb-2">
                      <h4 className="font-bold text-sm text-indigo-500">{result.plannerTitle}</h4>
                    </div>

                    <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/15 rounded-xl text-xs font-semibold text-emerald-500">
                      Weekly Focus Target: {result.weeklyGoal}
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-bold text-slate-400 uppercase text-[10px] block">High Priority Topics</span>
                      <div className="flex flex-wrap gap-1">
                        {result.focusTopics?.map(t => (
                          <span key={t} className="bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded text-[10px] font-bold">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3 border-t border-slate-200/10 pt-4">
                      <span className="font-bold text-slate-400 uppercase text-[10px] block">Weekly Schedule breakdown</span>
                      {result.schedule?.map(w => (
                        <div key={w.week} className="p-4 bg-slate-500/5 border border-slate-200/10 rounded-xl space-y-2 text-xs">
                          <span className="font-bold text-indigo-500 uppercase text-[10px] block">Week {w.week}: {w.focusArea}</span>
                          <ul className="space-y-1.5 text-slate-500 leading-relaxed list-disc pl-5">
                            {w.dailyTasks?.map((task, i) => <li key={i}>{task}</li>)}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            </GlassCard>
          )}
        </div>

      </div>
    </div>
  );
};

export default AiTools;
