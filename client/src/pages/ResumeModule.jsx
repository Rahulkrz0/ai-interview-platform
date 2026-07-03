import React, { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import { Upload, FileText, CheckCircle, Zap, ShieldAlert, Award, FileCode, Copy, AlertTriangle, Loader2 } from 'lucide-react';

const ResumeModule = () => {
  const [file, setFile] = useState(null);
  const [targetRole, setTargetRole] = useState('Full Stack Software Engineer');
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [loadingMsg, setLoadingMsg] = useState('Uploading Resume...');
  const [errorMsg, setErrorMsg] = useState('');

  // Cover Letter parameters
  const [companyName, setCompanyName] = useState('Google');
  const [coverLetter, setCoverLetter] = useState('');
  const [coverLoading, setCoverLoading] = useState(false);

  // LinkedIn/Portfolio Review
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [profileFeedback, setProfileFeedback] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    fetchResumeData();
  }, []);

  const fetchResumeData = async () => {
    try {
      const res = await api.get('/resumes/detail');
      setResumeData(res.data.data.resume);
    } catch (err) {
      console.warn('Resume data detail fetch fail: no profile uploaded.');
    } finally {
      setFetchLoading(false);
    }
  };

  const handleFileChange = (e) => {
    setErrorMsg('');
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile.type !== 'application/pdf') {
        setErrorMsg('Only PDF files are supported for resume analysis.');
        setFile(null);
        return;
      }
      setFile(selectedFile);
    }
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!file || loading) return;

    setLoading(true);
    setErrorMsg('');
    setAnalysisProgress(0);

    const messages = [
      'Uploading PDF...',
      'Extracting Resume Text...',
      'Analyzing with Gemini AI...',
      'Calculating ATS Score...',
      'Generating Suggestions...'
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

    const formData = new FormData();
    formData.append('resume', file);
    formData.append('targetRole', targetRole);

    try {
      const startTime = Date.now();
      const res = await api.post('/resumes/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      const timeTaken = Date.now() - startTime;
      const remainingTime = totalTime - timeTaken;
      
      if (remainingTime > 0) {
        await new Promise(resolve => setTimeout(resolve, remainingTime));
      }

      clearInterval(progressInterval);
      setAnalysisProgress(100);
      setLoadingMsg('Analysis Complete!');
      
      setTimeout(() => {
        setResumeData(res.data.data.resume);
        setFile(null);
        setLoading(false);
      }, 500);
    } catch (err) {
      clearInterval(progressInterval);
      setLoading(false);
      setResumeData(null); // Ensure report is fully hidden if Gemini or Parsing fails
      setErrorMsg(err.response?.data?.message || 'Unable to analyze this resume.');
    }
  };

  const handleGenerateCoverLetter = async () => {
    setCoverLoading(true);
    try {
      const res = await api.post('/resumes/cover-letter', { companyName, jobRole: targetRole });
      setCoverLetter(res.data.data.coverLetter);
    } catch (err) {
      console.error(err.message);
    } finally {
      setCoverLoading(false);
    }
  };

  const handleReviewProfiles = async () => {
    setProfileLoading(true);
    try {
      const res = await api.post('/resumes/review-profiles', { linkedinUrl, portfolioUrl });
      setProfileFeedback(res.data.data.feedback);
    } catch (err) {
      console.error(err.message);
    } finally {
      setProfileLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Cover letter text copied!');
  };

  if (fetchLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 text-slate-800 dark:text-slate-100">
      
      {/* Page Title */}
      <div className="border-b border-slate-200/10 pb-4">
        <h1 className="text-2xl font-bold">Resume ATS Analysis & Builder</h1>
        <p className="text-xs text-slate-400 mt-0.5">Optimize your credentials for target applicant tracking filters.</p>
      </div>

      {errorMsg && (
        <div className="flex items-center space-x-2.5 bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-xs">
          <AlertTriangle className="h-5 w-5 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Upload Form Panel */}
        <div className="space-y-6">
          <GlassCard className="space-y-4">
            <h3 className="text-sm font-bold flex items-center space-x-2">
              <Upload className="h-4.5 w-4.5 text-indigo-500" />
              <span>Upload PDF Resume</span>
            </h3>

            <form onSubmit={handleUploadSubmit} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Target Job Role</label>
                <input
                  type="text"
                  value={targetRole}
                  onChange={e => setTargetRole(e.target.value)}
                  className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                  disabled={loading}
                  required
                />
              </div>

              <div className="border-2 border-dashed border-slate-500/20 rounded-2xl p-6 text-center space-y-2 cursor-pointer hover:border-indigo-500/40 transition-colors relative">
                <input
                  type="file"
                  id="resume-file"
                  onChange={handleFileChange}
                  className="hidden"
                  accept=".pdf"
                  disabled={loading}
                  required={!resumeData}
                />
                <label htmlFor="resume-file" className={`cursor-pointer space-y-1 block ${loading ? 'pointer-events-none opacity-50' : ''}`}>
                  <FileText className="h-8 w-8 text-indigo-500 mx-auto opacity-70" />
                  <span className="text-xs font-bold text-slate-400 block">
                    {file ? file.name : 'Select PDF File'}
                  </span>
                  <span className="text-[10px] text-slate-500 block">Maximum size limit: 5MB</span>
                </label>
              </div>

              {loading && (
                <div className="space-y-2 p-3 bg-indigo-500/5 rounded-xl border border-indigo-500/10 text-center">
                  <div className="flex items-center justify-center space-x-2 text-xs font-bold text-indigo-500">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>{loadingMsg}</span>
                  </div>
                  <div className="w-full bg-slate-500/10 h-2 rounded-full overflow-hidden">
                    <div 
                      style={{ width: `${analysisProgress}%` }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full rounded-full transition-all duration-300"
                    ></div>
                  </div>
                  <span className="text-[10px] text-slate-400 font-bold">{analysisProgress}% Processed</span>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !file}
                className="w-full py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-xs font-bold hover:opacity-95 disabled:opacity-50 transition-all shadow-md shadow-indigo-500/10"
              >
                {loading ? 'Analyzing ATS metrics...' : 'Upload & Analyze Resume'}
              </button>
            </form>
          </GlassCard>

          {/* Version History Log */}
          {resumeData?.versionHistory?.length > 0 && (
            <GlassCard className="space-y-3">
              <h3 className="text-sm font-bold">Upload History</h3>
              <div className="space-y-2">
                {resumeData.versionHistory.map(v => (
                  <div key={v.version} className="p-3 border border-slate-200/10 rounded-xl flex items-center justify-between text-[11px]">
                    <div>
                      <p className="font-semibold">Version {v.version}</p>
                      <p className="text-slate-400 mt-0.5 truncate max-w-[120px]">{v.fileName}</p>
                    </div>
                    <span className="bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full font-bold">
                      ATS: {v.atsScore}%
                    </span>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}
        </div>

        {/* ATS Results View Screen */}
        <div className="lg:col-span-2 space-y-6">
          {resumeData ? (
            <>
              {/* Score summary panel */}
              <GlassCard className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center divide-y sm:divide-y-0 sm:divide-x divide-slate-200/10">
                <div className="space-y-1">
                  <span className="text-xs text-slate-400 font-semibold">Overall ATS Score</span>
                  <div className="text-4xl font-extrabold text-indigo-500">{resumeData.atsScore}%</div>
                  <span className="text-[10px] text-slate-400 block">System Rating</span>
                </div>
                <div className="space-y-1 sm:pt-0 pt-4">
                  <span className="text-xs text-slate-400 font-semibold">Keywords Fit</span>
                  <div className="text-4xl font-extrabold text-emerald-500">{resumeData.keywordMatch || resumeData.matchScore || 0}%</div>
                  <span className="text-[10px] text-slate-400 block">Job Description Alignment</span>
                </div>
                <div className="space-y-1 sm:pt-0 pt-4">
                  <span className="text-xs text-slate-400 font-semibold">Grammar Issues</span>
                  <div className="text-4xl font-extrabold text-amber-500">{resumeData.grammarIssuesCount}</div>
                  <span className="text-[10px] text-slate-400 block">Identified Typos</span>
                </div>
              </GlassCard>

              {/* Detailed Metrics Grid */}
              <GlassCard className="space-y-4">
                <h3 className="font-bold text-sm text-slate-300">Detailed AI Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { label: 'Skills Match', val: resumeData.skillsMatch },
                    { label: 'Structure', val: resumeData.resumeStructureScore },
                    { label: 'Experience', val: resumeData.experienceScore },
                    { label: 'Education', val: resumeData.educationScore },
                    { label: 'Grammar', val: resumeData.grammarScore },
                    { label: 'Formatting', val: resumeData.formattingScore },
                    { label: 'Readability', val: resumeData.readabilityScore },
                  ].map((metric) => (
                    metric.val !== undefined && (
                      <div key={metric.label} className="bg-slate-500/5 border border-slate-200/10 p-3 rounded-xl flex flex-col justify-between">
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">{metric.label}</span>
                        <div className="flex items-end justify-between">
                          <span className={`text-xl font-extrabold ${metric.val >= 80 ? 'text-emerald-500' : metric.val >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                            {metric.val}%
                          </span>
                        </div>
                        <div className="w-full bg-slate-200/10 h-1 mt-2 rounded-full overflow-hidden">
                          <div style={{ width: `${metric.val}%` }} className={`h-full ${metric.val >= 80 ? 'bg-emerald-500' : metric.val >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}></div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </GlassCard>

              {/* Suggestions Box */}
              <GlassCard className="space-y-4">
                <h3 className="font-bold text-sm flex items-center space-x-2 text-indigo-500">
                  <Zap className="h-4.5 w-4.5" />
                  <span>Resume Insights & Gaps</span>
                </h3>
                <div className="space-y-3.5 text-xs leading-relaxed">
                  <p className="font-semibold text-slate-500">{resumeData.summary}</p>
                  
                  {/* Strengths & Weaknesses Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                    <div className="p-3.5 bg-emerald-500/5 border border-emerald-500/15 rounded-2xl space-y-1.5">
                      <span className="font-bold text-emerald-500 text-xs block mb-1">Key Strengths</span>
                      {resumeData.strengths && resumeData.strengths.length > 0 ? (
                        <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                          {resumeData.strengths.map((st, i) => (
                            <li key={i}>{st}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-slate-400 italic">No key strengths extracted yet.</span>
                      )}
                    </div>

                    <div className="p-3.5 bg-red-500/5 border border-red-500/15 rounded-2xl space-y-1.5">
                      <span className="font-bold text-red-500 text-xs block mb-1">Gaps & Weaknesses</span>
                      {resumeData.weaknesses && resumeData.weaknesses.length > 0 ? (
                        <ul className="list-disc pl-4 space-y-1 text-slate-600 dark:text-slate-400">
                          {resumeData.weaknesses.map((wk, i) => (
                            <li key={i}>{wk}</li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-slate-400 italic">No weaknesses detected.</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-400">Missing Core Keywords:</span>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {resumeData.missingKeywords && resumeData.missingKeywords.length > 0 ? (
                        resumeData.missingKeywords.map(kw => (
                          <span key={kw} className="bg-red-500/10 text-red-500 px-2 py-0.5 rounded text-[10px] font-bold">
                            + {kw}
                          </span>
                        ))
                      ) : (
                        <span className="text-slate-400 italic">No missing keywords identified.</span>
                      )}
                    </div>
                  </div>

                  <div>
                    <span className="font-bold text-slate-400">Actionable Suggestions:</span>
                    <ul className="list-disc pl-5 space-y-1 mt-2 text-slate-500">
                      {resumeData.suggestions && resumeData.suggestions.length > 0 ? (
                        resumeData.suggestions.map((s, i) => (
                          <li key={i}>{s}</li>
                        ))
                      ) : (
                        <li className="text-slate-400 italic">No suggestions required.</li>
                      )}
                    </ul>
                  </div>
                </div>
              </GlassCard>

              {/* Cover Letter Builder */}
              <GlassCard className="space-y-4">
                <h3 className="font-bold text-sm">Tailored Cover Letter Generator</h3>
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={companyName}
                    onChange={e => setCompanyName(e.target.value)}
                    placeholder="e.g. Google"
                    className="flex-1 bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    onClick={handleGenerateCoverLetter}
                    disabled={coverLoading}
                    className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors"
                  >
                    {coverLoading ? 'Writing...' : 'Generate Letter'}
                  </button>
                </div>

                {coverLetter && (
                  <div className="bg-slate-500/5 border border-slate-200/10 rounded-2xl p-4 space-y-3 relative">
                    <button
                      onClick={() => copyToClipboard(coverLetter)}
                      className="absolute top-3 right-3 p-1.5 bg-slate-500/10 rounded hover:bg-indigo-500/20 text-slate-400 hover:text-indigo-500 transition-colors"
                    >
                      <Copy className="h-4 w-4" />
                    </button>
                    <pre className="text-[10px] font-sans whitespace-pre-wrap leading-relaxed text-slate-500 dark:text-slate-300">
                      {coverLetter}
                    </pre>
                  </div>
                )}
              </GlassCard>

              {/* LinkedIn / Portfolio Profile Review */}
              <GlassCard className="space-y-4">
                <h3 className="font-bold text-sm">Online Portfolio & LinkedIn Profile Review</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="url"
                    value={linkedinUrl}
                    onChange={e => setLinkedinUrl(e.target.value)}
                    placeholder="LinkedIn Profile Link"
                    className="bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={e => setPortfolioUrl(e.target.value)}
                    placeholder="Portfolio URL"
                    className="bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleReviewProfiles}
                  disabled={profileLoading}
                  className="px-4 py-2 border border-indigo-500 text-indigo-500 rounded-xl text-xs font-bold hover:bg-indigo-500/10 transition-colors"
                >
                  {profileLoading ? 'Analyzing link profiles...' : 'Audit Profiles'}
                </button>

                {profileFeedback && (
                  <div className="space-y-2 text-xs">
                    <p className="font-semibold text-indigo-500">LinkedIn Audit:</p>
                    <p className="text-slate-500 leading-relaxed">{profileFeedback.linkedinReview}</p>
                    <p className="font-semibold text-indigo-500 mt-2">Portfolio Audit:</p>
                    <p className="text-slate-500 leading-relaxed">{profileFeedback.portfolioReview}</p>
                  </div>
                )}
              </GlassCard>
            </>
          ) : (
            <GlassCard className="py-20 text-center border-2 border-dashed border-slate-500/20 rounded-2xl flex flex-col items-center justify-center space-y-4">
              <FileText className="h-12 w-12 text-slate-400 opacity-60" />
              <div className="space-y-1">
                <h4 className="font-bold text-sm">No Resume Uploaded Yet</h4>
                <p className="text-xs text-slate-400">Upload your PDF CV to compute ATS scores and compute placement key terms.</p>
              </div>
            </GlassCard>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResumeModule;
