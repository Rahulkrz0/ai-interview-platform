import React, { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import { Compass, CheckCircle2, Circle, DollarSign, Award, ArrowRight, Lightbulb } from 'lucide-react';

const CareerCoach = () => {
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([]);
  const [projectLoading, setProjectLoading] = useState(false);

  // Salary Predict params
  const [role, setRole] = useState('Software Engineer');
  const [company, setCompany] = useState('Google');
  const [exp, setExp] = useState('Mid');
  const [country, setCountry] = useState('United States');
  const [stateRegion, setStateRegion] = useState('California');
  const [skills, setSkills] = useState('React, Node.js');
  const [degree, setDegree] = useState('Bachelors');
  const [years, setYears] = useState('3');
  
  const [salaryResult, setSalaryResult] = useState(null);
  const [salaryLoading, setSalaryLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState('');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetchCoachData();
  }, []);

  const fetchCoachData = async () => {
    try {
      const rmRes = await api.get('/coach/roadmap');
      setRoadmap(rmRes.data.data.roadmap);
    } catch (e) {
      console.warn('Roadmap fetch mock setup.');
    } finally {
      setLoading(false);
    }
  };

  const toggleStep = async (stepId, currentStatus) => {
    const nextStatus = currentStatus === 'completed' ? 'todo' : 'completed';
    try {
      const res = await api.put('/coach/roadmap/step', { stepId, status: nextStatus });
      setRoadmap(res.data.data.roadmap);
    } catch (err) {
      // Mock toggle fallback
      setRoadmap(prev => {
        if (!prev) return null;
        return {
          ...prev,
          steps: prev.steps.map(s => s._id === stepId ? { ...s, status: nextStatus } : s)
        };
      });
    }
  };

  const checkSalary = async () => {
    setSalaryLoading(true);
    setErrorMsg('');
    setSalaryResult(null);
    setAnalysisProgress(0);

    const messages = [
      'Analyzing Job Role...',
      'Checking Market Trends...',
      'Consulting Gemini AI...',
      'Calculating Salary Range...',
      'Generating Career Advice...'
    ];
    let msgIndex = 0;
    setLoadingMsg(messages[0]);
    
    // Simulate 5 seconds total loading
    const totalTime = 5000;
    const intervalTime = 100;
    let elapsed = 0;

    const progressInterval = setInterval(() => {
      elapsed += intervalTime;
      const progress = Math.min(99, Math.floor((elapsed / totalTime) * 100));
      setAnalysisProgress(progress);
      
      const nextMsgIndex = Math.floor((elapsed / totalTime) * messages.length);
      if (nextMsgIndex < messages.length && nextMsgIndex !== msgIndex) {
        msgIndex = nextMsgIndex;
        setLoadingMsg(messages[msgIndex]);
      }
    }, intervalTime);

    try {
      const params = new URLSearchParams({
        targetRole: role,
        companyName: company,
        experienceLevel: exp,
        country,
        state: stateRegion,
        skills,
        degree,
        yearsOfExperience: years
      });

      const startTime = Date.now();
      const res = await api.get(`/coach/salary-predict?${params.toString()}`);
      
      const timeTaken = Date.now() - startTime;
      const remainingTime = totalTime - timeTaken;
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setLoadingMsg('Analysis Complete!');
      
      setTimeout(() => {
        setSalaryResult(res.data.data);
        setSalaryLoading(false);
      }, 500);
    } catch (e) {
      clearInterval(progressInterval);
      setSalaryLoading(false);
      setSalaryResult(null); // Ensure report is hidden completely
      setErrorMsg(e.response?.data?.message || 'Unable to generate salary prediction. Please try again.');
    }
  };

  const fetchProjects = async () => {
    setProjectLoading(true);
    try {
      const res = await api.get('/coach/projects');
      setProjects(res.data.data.projects);
    } catch (e) {
      console.error(e.message);
    } finally {
      setProjectLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      <div className="border-b border-slate-200/10 pb-4">
        <h1 className="text-2xl font-bold">AI Career Coach & Roadmap Portal</h1>
        <p className="text-xs text-slate-400 mt-0.5">Explore learning timelines, salary metrics, and custom portfolio project templates.</p>
      </div>

      <div className="space-y-6">
        {/* Learning Roadmap Nodes */}
        <GlassCard className="space-y-4">
          <h3 className="text-sm font-bold flex items-center space-x-2">
            <Compass className="h-4.5 w-4.5 text-indigo-500" />
            <span>Personalized Learning Roadmap</span>
          </h3>

          <div className="relative border-l border-slate-200/10 pl-6 ml-3 space-y-6 text-xs">
            {(roadmap?.steps || [
              { _id: '1', title: 'HTML & CSS Layouts', description: 'Master flexbox, css grids, responsive screens, and viewport units.', status: 'completed' },
              { _id: '2', title: 'Core Javascript', description: 'Deep dive into variable scopes, closure patterns, asynchronous promises, and basic execution stacks.', status: 'in-progress' },
              { _id: '3', title: 'React Hooks and Context APIs', description: 'Understand lifecycle nodes, component dependencies, and token authorization cookies.', status: 'todo' }
            ]).map((step) => (
              <div key={step._id} className="relative">
                <div
                  className={`absolute -left-[31px] p-1 rounded-full border border-slate-800 ${
                    step.status === 'completed' ? 'bg-indigo-500/20 text-indigo-400' :
                    step.status === 'in-progress' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-slate-800 text-slate-500'
                  }`}
                >
                  {step.status === 'completed' ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                </div>
                <div>
                  <div className="flex items-center space-x-3">
                    <h4 className="font-bold text-slate-200 text-sm">{step.title}</h4>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase ${
                      step.status === 'completed' ? 'bg-indigo-500/10 text-indigo-400' :
                      step.status === 'in-progress' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-slate-500/10 text-slate-400'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  <p className="text-slate-500 mt-1.5 leading-relaxed">{step.description}</p>
                  
                  <div className="mt-3 flex items-center space-x-3">
                    <button
                      onClick={() => toggleStep(step._id, step.status)}
                      className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      {step.status === 'completed' ? 'Mark Incomplete' : 'Mark Completed'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* AI Salary Calculator Dashboard */}
        <GlassCard className="space-y-6">
          <div className="flex flex-col space-y-1 border-b border-slate-200/10 pb-4">
            <h3 className="text-lg font-bold flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-emerald-500" />
              <span>AI Salary Calculator Dashboard</span>
            </h3>
            <p className="text-xs text-slate-400">Generate a highly accurate, AI-powered salary forecast based on real-time market data.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Target Title</label>
              <input type="text" value={role} onChange={e => setRole(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Company</label>
              <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Experience Level</label>
              <select value={exp} onChange={e => setExp(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus:outline-none text-slate-300">
                <option value="Entry">Entry Level / Junior</option>
                <option value="Mid">Mid-Career (2-4 yrs)</option>
                <option value="Senior">Senior / Staff</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Years of Exp</label>
              <input type="number" value={years} onChange={e => setYears(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Country</label>
              <input type="text" value={country} onChange={e => setCountry(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">State / City</label>
              <input type="text" value={stateRegion} onChange={e => setStateRegion(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Degree</label>
              <input type="text" value={degree} onChange={e => setDegree(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus:outline-none" />
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Key Skills</label>
              <input type="text" value={skills} onChange={e => setSkills(e.target.value)} placeholder="e.g. React, Node" className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 focus:outline-none" />
            </div>
          </div>

          <button
            onClick={checkSalary}
            disabled={salaryLoading}
            className="w-full py-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-xl font-bold hover:bg-emerald-500 hover:text-white transition-all"
          >
            Compute Salary Forecast
          </button>

          {salaryLoading && (
            <div className="mt-6 p-6 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl flex flex-col items-center justify-center space-y-4">
              <div className="h-10 w-10 border-4 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin"></div>
              <p className="text-emerald-400 font-medium text-sm animate-pulse">{loadingMsg}</p>
              <div className="w-64 h-1.5 bg-emerald-900/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${analysisProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {errorMsg && (
            <div className="mt-4 p-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-500/10 flex items-center space-x-3 text-red-600 dark:text-red-400 text-sm font-medium">
              <p>{errorMsg}</p>
            </div>
          )}

          {salaryResult && !salaryLoading && (
            <div className="mt-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Minimum</span>
                  <div className="text-xl font-bold text-slate-300 mt-1">{salaryResult.predictedSalary.currency} {salaryResult.predictedSalary.minSalary?.toLocaleString()}</div>
                </div>
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 transform scale-105 shadow-lg shadow-emerald-500/10">
                  <span className="text-[11px] uppercase font-bold text-emerald-500">Average / Median</span>
                  <div className="text-3xl font-extrabold text-emerald-400 mt-1">{salaryResult.predictedSalary.currency} {salaryResult.predictedSalary.avgSalary?.toLocaleString()}</div>
                  <span className="text-[10px] text-emerald-500/70">{salaryResult.predictedSalary.currency} {salaryResult.predictedSalary.monthlySalary?.toLocaleString()} / month</span>
                </div>
                <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
                  <span className="text-[10px] uppercase font-bold text-slate-500">Maximum</span>
                  <div className="text-xl font-bold text-slate-300 mt-1">{salaryResult.predictedSalary.currency} {salaryResult.predictedSalary.maxSalary?.toLocaleString()}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                <div className="space-y-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <h4 className="font-bold text-slate-300 border-b border-slate-800 pb-2">Market Analysis</h4>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Demand Level</span>
                      <span className={`px-2 py-0.5 rounded font-bold ${salaryResult.predictedSalary.marketDemand === 'High' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>{salaryResult.predictedSalary.marketDemand}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">Interview Difficulty</span>
                      <span className="px-2 py-0.5 rounded font-bold bg-rose-500/20 text-rose-400">{salaryResult.predictedSalary.interviewDifficulty}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-400">AI Confidence</span>
                      <span className="text-slate-300 font-bold">{salaryResult.predictedSalary.confidenceScore}%</span>
                    </div>
                  </div>

                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <h4 className="font-bold text-slate-300 border-b border-slate-800 pb-2">Career Growth (5 Years)</h4>
                    <p className="text-slate-400 text-xs leading-relaxed">{salaryResult.predictedSalary.careerGrowth}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                    <h4 className="font-bold text-slate-300 border-b border-slate-800 pb-2">Skill Gap Analysis</h4>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Required Skills</span>
                      <div className="flex flex-wrap gap-1.5">
                        {salaryResult.predictedSalary.requiredSkills?.map((s, i) => (
                          <span key={i} className="bg-slate-800 text-slate-300 px-2 py-1 rounded text-[10px] font-medium">{s}</span>
                        ))}
                      </div>
                    </div>
                    <div className="pt-2">
                      <span className="text-[10px] uppercase font-bold text-slate-500 mb-1 block">Missing Skills (To Maximize Salary)</span>
                      <div className="flex flex-wrap gap-1.5">
                        {salaryResult.predictedSalary.missingSkills?.map((s, i) => (
                          <span key={i} className="bg-rose-500/10 border border-rose-500/20 text-rose-400 px-2 py-1 rounded text-[10px] font-medium">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
                <h4 className="font-bold text-slate-300 border-b border-slate-800 pb-2">Actionable Insights</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 mb-2 block">Salary Negotiation Tips</span>
                    <ul className="list-disc pl-4 text-slate-400 space-y-1">
                      {salaryResult.predictedSalary.improvementSuggestions?.map((tip, i) => <li key={i}>{tip}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 mb-2 block">Recommended Certifications</span>
                    <ul className="list-disc pl-4 text-slate-400 space-y-1">
                      {salaryResult.predictedSalary.recommendedCertifications?.map((cert, i) => <li key={i}>{cert}</li>)}
                    </ul>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-500 mb-2 block">Top Hiring Companies</span>
                    <ul className="list-disc pl-4 text-slate-400 space-y-1">
                      {salaryResult.predictedSalary.topCompanies?.map((comp, i) => <li key={i}>{comp}</li>)}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  );
};

export default CareerCoach;
