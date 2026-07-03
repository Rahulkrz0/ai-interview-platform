import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner, LoadingSkeleton } from '../components/LoadingSkeleton';
import { 
  ArrowLeft, Bookmark, CheckCircle, AlertTriangle, 
  Clock, Building, Tag, Award, BookOpen, Lightbulb, XCircle,
  Copy, Check, HelpCircle, Key, FileText, ChevronDown, ChevronUp, Sparkles,
  Save
} from 'lucide-react';

const QuestionDetail = () => {
  const { id } = useParams();
  
  const [question, setQuestion] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Interactive Answer State
  const [userAnswer, setUserAnswer] = useState('');
  const [evaluation, setEvaluation] = useState(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [saveStatus, setSaveStatus] = useState('');
  const [evaluationError, setEvaluationError] = useState(null);
  
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchQuestionDetails();
  }, [id]);

  // Auto-save logic
  useEffect(() => {
    if (!userAnswer || isEvaluating) return;
    
    const timer = setTimeout(() => {
      saveDraft(userAnswer);
    }, 30000); // 30s debounce

    return () => clearTimeout(timer);
  }, [userAnswer, isEvaluating]);

  const fetchQuestionDetails = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/questions/${id}`);
      if (res.data && res.data.status === 'success') {
        setQuestion(res.data.question);
        setIsBookmarked(res.data.isBookmarked);
        setIsCompleted(res.data.isCompleted);
        setRelatedQuestions(res.data.relatedQuestions || []);
      } else {
        setError('Failed to load question details.');
      }

      // Fetch user's saved answer
      try {
        const ansRes = await api.get(`/questions/${id}/answer`);
        if (ansRes.data && ansRes.data.answer) {
          const ans = ansRes.data.answer;
          setUserAnswer(ans.answerText || '');
          if (ans.isEvaluated) {
            setEvaluation(ans);
          }
        }
      } catch (err) {
        console.error("No previous answer found.");
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Could not fetch question details.');
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async (text) => {
    if (!text.trim()) return;
    setSaveStatus('Saving...');
    try {
      await api.post(`/questions/${id}/answer`, { answerText: text });
      setSaveStatus('Saved');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (err) {
      setSaveStatus('Error saving');
    }
  };

  const handleEvaluate = async () => {
    if (!userAnswer.trim()) {
      alert("Please write your answer before evaluation.");
      return;
    }
    
    setIsEvaluating(true);
    setSaveStatus('Evaluating...');
    setEvaluationError(null); // Clear any previous errors
    setEvaluation(null); // Clear previous evaluation report
    
    try {
      const res = await api.post(`/questions/${id}/evaluate`, { answerText: userAnswer });
      if (res.data && res.data.answer) {
        setEvaluation(res.data.answer);
        setSaveStatus('Evaluated successfully');
        setTimeout(() => setSaveStatus(''), 3000);
      }
    } catch (err) {
      console.error(err);
      setSaveStatus('Evaluation failed');
      const apiMsg = err.response?.data?.message || 'AI evaluation is temporarily unavailable. Please try again later.';
      setEvaluationError(apiMsg);
      // We no longer alert the raw error, we show it inline instead
    } finally {
      setIsEvaluating(false);
    }
  };

  const handleToggleBookmark = async () => {
    try {
      const res = await api.post('/gamification/bookmark', { questionId: id });
      if (res.data && res.data.status === 'success') {
        setIsBookmarked(res.data.bookmarked);
      }
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

  const handleToggleCompleted = async () => {
    try {
      const targetState = !isCompleted;
      const res = await api.post(`/questions/${id}/complete`, { isCompleted: targetState });
      if (res.data && res.data.status === 'success') {
        setIsCompleted(res.data.isCompleted);
      }
    } catch (err) {
      console.error('Failed to toggle completion status:', err);
    }
  };

  if (loading) return (
    <div className="max-w-5xl mx-auto py-12 px-4 text-center space-y-4">
      <LoadingSkeleton type="detail" />
      <p className="text-xs text-slate-400 font-semibold animate-pulse">Loading question and your progress...</p>
    </div>
  );

  if (error || !question) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-6 text-center space-y-4">
        <div className="inline-flex p-3 bg-red-500/10 text-red-500 rounded-full">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="text-xl font-bold">Error Loading Question</h2>
        <p className="text-sm text-slate-400">{error || 'Question details could not be found.'}</p>
        <Link 
          to="/question-bank" 
          className="inline-flex items-center space-x-2 px-6 py-2.5 bg-indigo-500 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Question Bank</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-6 px-4 space-y-6 animate-in fade-in duration-200 text-left">
      {/* Top Navigation & Action Panel */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <Link 
          to="/question-bank" 
          className="inline-flex items-center space-x-2 text-xs font-bold text-slate-500 hover:text-indigo-500 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Question Bank</span>
        </Link>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          {/* Bookmark Button */}
          <button
            onClick={handleToggleBookmark}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
              isBookmarked
                ? 'bg-indigo-500/15 border-indigo-500/30 text-indigo-500'
                : 'glass-panel border-slate-200/10 text-slate-400 hover:bg-slate-500/10'
            }`}
          >
            <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-indigo-500' : ''}`} />
            <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
          </button>

          {/* Mark Complete Button */}
          <button
            onClick={handleToggleCompleted}
            className={`flex-1 sm:flex-initial flex items-center justify-center space-x-1.5 px-4 py-2.5 rounded-xl border text-xs font-bold transition-all ${
              isCompleted
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-500'
                : 'glass-panel border-slate-200/10 text-slate-400 hover:bg-slate-500/10 hover:text-emerald-500'
            }`}
          >
            <CheckCircle className={`h-4 w-4 ${isCompleted ? 'fill-emerald-500/20' : ''}`} />
            <span>{isCompleted ? 'Completed' : 'Mark as Completed'}</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Details on Left, Meta on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left column: Full Question details */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 md:p-8 space-y-6">
            {/* Header info */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  question.difficulty === 'Easy' 
                    ? 'bg-emerald-500/10 text-emerald-500' 
                    : (question.difficulty === 'Hard' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500')
                }`}>
                  {question.difficulty}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-indigo-500/10 text-indigo-500 uppercase">
                  {question.category}
                </span>
                {question.topic && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-purple-500/10 text-purple-500 uppercase">
                    {question.topic}
                  </span>
                )}
              </div>

              <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 dark:text-slate-200">
                {question.title}
              </h1>

              <div className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line bg-slate-500/5 p-4 rounded-xl border border-slate-200/10">
                {question.description}
              </div>
            </div>

            {/* Detailed Explanation */}
            {question.detailedExplanation && (
              <div className="border-t border-slate-200/10 pt-6 space-y-3">
                <h3 className="font-bold text-sm text-purple-500 flex items-center space-x-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Detailed Explanation</span>
                </h3>
                <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line bg-purple-500/5 p-4 rounded-xl border border-purple-500/10 animate-in fade-in">
                  {question.detailedExplanation}
                </div>
              </div>
            )}

            {/* Best Answer Structure */}
            {question.bestAnswerStructure && (
              <div className="border-t border-slate-200/10 pt-6 space-y-3">
                <h3 className="font-bold text-sm text-indigo-500 flex items-center space-x-2">
                  <FileText className="h-4 w-4" />
                  <span>Best Answer Structure</span>
                </h3>
                <div className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-line bg-slate-500/5 p-4 rounded-xl border border-slate-200/10 font-mono">
                  {question.bestAnswerStructure}
                </div>
              </div>
            )}

            {/* Key Points */}
            {question.keyPoints && question.keyPoints.length > 0 && (
              <div className="border-t border-slate-200/10 pt-6 space-y-3">
                <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 uppercase tracking-wider text-[10px]">
                  Key Points to Cover
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-600 dark:text-slate-400 font-semibold">
                  {question.keyPoints.map((point, idx) => (
                    <li key={idx} className="leading-relaxed">{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </GlassCard>

          {/* User Answer Area */}
          <GlassCard className="p-6 md:p-8 space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-bold text-sm text-indigo-500 flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Your Interview Answer</span>
              </h3>
              {saveStatus && (
                <span className="text-xs text-slate-400 font-semibold flex items-center space-x-1">
                  {saveStatus === 'Saving...' || saveStatus === 'Evaluating...' ? <Clock className="h-3 w-3 animate-spin" /> : 
                   <Check className="h-3 w-3 text-emerald-500" />}
                  <span>{saveStatus}</span>
                </span>
              )}
            </div>

            <textarea
              className="w-full h-48 bg-transparent border-2 border-slate-200 dark:border-slate-700 rounded-xl p-4 text-sm text-slate-700 dark:text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y placeholder:text-slate-400"
              placeholder="Write your interview answer here..."
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              disabled={isEvaluating}
            />

            <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
              <div className="text-xs text-slate-400 font-semibold">
                {userAnswer.length} characters
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setUserAnswer('')}
                  disabled={isEvaluating}
                  className="px-4 py-2 text-xs font-bold text-slate-500 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-xl transition-all"
                >
                  Clear
                </button>
                <button
                  onClick={() => saveDraft(userAnswer)}
                  disabled={isEvaluating}
                  className="px-4 py-2 text-xs font-bold text-slate-600 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-all flex items-center space-x-1"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>Save Draft</span>
                </button>
                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating || !userAnswer.trim()}
                  className="px-4 py-2 text-xs font-bold text-white bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 rounded-xl transition-all shadow-md shadow-indigo-500/20 flex items-center space-x-1"
                >
                  {isEvaluating ? (
                    <>
                      <Clock className="h-3.5 w-3.5 animate-spin" />
                      <span>Evaluating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Evaluate Answer</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </GlassCard>

          {/* Error Message */}
          {evaluationError && (
            <div className="p-4 mt-4 rounded-xl border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 font-medium text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              {evaluationError}
            </div>
          )}

          {/* AI Evaluation Results */}
          {evaluation && (
            <GlassCard className="p-6 md:p-8 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 border-indigo-500/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
              
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h3 className="font-extrabold text-lg flex items-center space-x-2 text-slate-800 dark:text-slate-100">
                    <Award className="h-5 w-5 text-indigo-500" />
                    <span>AI Evaluation Report</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">{evaluation.aiFeedback}</p>
                </div>

                <div className="flex items-center space-x-3 bg-indigo-500/10 px-4 py-2 rounded-2xl border border-indigo-500/20">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">Overall Score</span>
                  <span className="text-2xl font-black text-indigo-600 dark:text-indigo-400">
                    {evaluation.overallScore}<span className="text-sm text-indigo-500/50">/100</span>
                  </span>
                </div>
              </div>

              {/* Sub-scores Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  { label: 'Relevance', score: evaluation.scores?.relevance },
                  { label: 'Accuracy', score: evaluation.scores?.technicalAccuracy },
                  { label: 'Communication', score: evaluation.scores?.communication },
                  { label: 'Confidence', score: evaluation.scores?.confidence },
                  { label: 'Completeness', score: evaluation.scores?.completeness },
                  { label: 'Grammar', score: evaluation.scores?.grammar },
                  { label: 'Prof. Tone', score: evaluation.scores?.professionalTone },
                  { label: 'Fluency', score: evaluation.scores?.fluency }
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-slate-700 flex justify-between items-center">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">{s.label}</span>
                    <span className={`text-sm font-black ${s.score >= 80 ? 'text-emerald-500' : s.score >= 60 ? 'text-amber-500' : 'text-red-500'}`}>
                      {s.score || 0}%
                    </span>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Strengths */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center space-x-1.5">
                    <CheckCircle className="h-4 w-4" />
                    <span>Strengths</span>
                  </h4>
                  <ul className="space-y-2">
                    {evaluation.strengths?.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start space-x-2 bg-emerald-500/5 p-2 rounded-lg border border-emerald-500/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Weaknesses */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-red-500 flex items-center space-x-1.5">
                    <AlertTriangle className="h-4 w-4" />
                    <span>Areas to Improve</span>
                  </h4>
                  <ul className="space-y-2">
                    {evaluation.weaknesses?.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-600 dark:text-slate-300 flex items-start space-x-2 bg-red-500/5 p-2 rounded-lg border border-red-500/10">
                        <span className="h-1.5 w-1.5 rounded-full bg-red-500 mt-1.5 shrink-0" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Missing Points & Suggestions */}
              {evaluation.missingPoints?.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-slate-200/10">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-500 flex items-center space-x-1.5">
                    <Lightbulb className="h-4 w-4" />
                    <span>Missing Key Points</span>
                  </h4>
                  <div className="grid gap-2">
                    {evaluation.missingPoints.map((mp, idx) => (
                      <div key={idx} className="text-xs text-slate-600 dark:text-slate-300 p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                        <span className="font-semibold block mb-1">Missed: {mp}</span>
                        {evaluation.suggestedImprovements?.[idx] && (
                          <span className="text-amber-600 dark:text-amber-400 block mt-1"><span className="font-bold">Suggestion:</span> {evaluation.suggestedImprovements[idx]}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Better Sample Answer */}
              {evaluation.sampleAnswer && (
                <div className="space-y-3 pt-4 border-t border-slate-200/10">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-500 flex items-center space-x-1.5">
                      <Sparkles className="h-4 w-4" />
                      <span>Better Sample Answer</span>
                    </h4>
                  </div>
                  <div className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line bg-indigo-500/5 p-4 rounded-xl border border-indigo-500/10 font-mono">
                    {evaluation.sampleAnswer}
                  </div>
                </div>
              )}
            </GlassCard>
          )}

          {/* Tips and Common Mistakes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Interview Tips */}
            {question.interviewTips && question.interviewTips.length > 0 && (
              <GlassCard className="p-6 space-y-4">
                <h3 className="font-bold text-sm text-emerald-500 flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4" />
                  <span>Interview Tips</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                  {question.interviewTips.map((tip, idx) => (
                    <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}

            {/* Common Mistakes */}
            {question.commonMistakes && question.commonMistakes.length > 0 && (
              <GlassCard className="p-6 space-y-4">
                <h3 className="font-bold text-sm text-red-500 flex items-center space-x-2">
                  <XCircle className="h-4 w-4" />
                  <span>Common Mistakes</span>
                </h3>
                <ul className="space-y-2.5 text-xs text-slate-600 dark:text-slate-400">
                  {question.commonMistakes.map((mistake, idx) => (
                    <li key={idx} className="flex items-start space-x-2 leading-relaxed">
                      <span className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                      <span>{mistake}</span>
                    </li>
                  ))}
                </ul>
              </GlassCard>
            )}
          </div>
        </div>

        {/* Right column: Metadata & Related Questions */}
        <div className="space-y-6">
          {/* Question Stats Info Card */}
          <GlassCard className="p-6 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Question Meta</h4>
            
            <div className="space-y-3">
              {/* Est Time */}
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-200/10">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  <span>Preparation Time</span>
                </span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {question.estimatedTime} mins
                </span>
              </div>

              {/* Category */}
              <div className="flex items-center justify-between text-xs py-2 border-b border-slate-200/10">
                <span className="text-slate-400 flex items-center space-x-1.5">
                  <Tag className="h-3.5 w-3.5" />
                  <span>Category</span>
                </span>
                <span className="font-bold text-slate-700 dark:text-slate-300">
                  {question.category}
                </span>
              </div>

              {/* Topic */}
              {question.topic && (
                <div className="flex items-center justify-between text-xs py-2 border-b border-slate-200/10">
                  <span className="text-slate-400 flex items-center space-x-1.5">
                    <Award className="h-3.5 w-3.5" />
                    <span>Topic</span>
                  </span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    {question.topic}
                  </span>
                </div>
              )}
            </div>

            {/* Target Companies */}
            {question.companies && question.companies.length > 0 && (
              <div className="pt-2 space-y-2">
                <span className="text-xs text-slate-400 flex items-center space-x-1.5">
                  <Building className="h-3.5 w-3.5" />
                  <span>Target Companies</span>
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {question.companies.map(company => (
                    <span 
                      key={company} 
                      className="px-2.5 py-0.5 rounded bg-indigo-500/10 text-indigo-500 font-bold text-[10px]"
                    >
                      {company}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Keywords */}
            {question.importantKeywords && question.importantKeywords.length > 0 && (
              <div className="pt-2 space-y-2 border-t border-slate-200/10 mt-2">
                <span className="text-xs text-slate-400 flex items-center space-x-1.5">
                  <Key className="h-3.5 w-3.5 text-slate-400" />
                  <span>Important Keywords</span>
                </span>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {question.importantKeywords.map(kw => (
                    <span 
                      key={kw} 
                      className="px-2.5 py-0.5 rounded bg-purple-500/10 text-purple-500 font-bold text-[10px]"
                    >
                      {kw}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>

          {/* Company Specific Tips */}
          {question.companySpecificTips && question.companySpecificTips.length > 0 && (
            <GlassCard className="p-6 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Company Specific Tips</h4>
              <div className="space-y-3">
                {question.companySpecificTips.map((tip, idx) => (
                  <div key={idx} className="p-3 bg-amber-500/5 border border-amber-500/15 rounded-xl text-xs leading-relaxed text-slate-600 dark:text-slate-450 font-semibold flex items-start space-x-2">
                    <Award className="h-4 w-4 text-amber-500 shrink-0 mt-0.5" />
                    <span>{tip}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Follow-up Questions */}
          {question.followUpQuestions && question.followUpQuestions.length > 0 && (
            <GlassCard className="p-6 space-y-4">
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Interviewer Follow-ups</h4>
              <div className="space-y-3">
                {question.followUpQuestions.map((q, idx) => (
                  <div key={idx} className="p-3 bg-slate-500/5 border border-slate-200/10 rounded-xl text-xs leading-relaxed text-slate-600 dark:text-slate-400 flex items-start space-x-2">
                    <HelpCircle className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                    <span>{q}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Related Questions Card */}
          <GlassCard className="p-6 space-y-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-slate-400">Related Questions</h4>
            
            {relatedQuestions && relatedQuestions.length > 0 ? (
              <div className="space-y-3.5">
                {relatedQuestions.map(rq => (
                  <Link 
                    key={rq._id}
                    to={`/question-bank/${rq._id}`}
                    className="block p-3 bg-slate-500/5 hover:bg-indigo-500/5 border border-slate-200/10 hover:border-indigo-500/20 rounded-xl space-y-1.5 transition-all text-left"
                  >
                    <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase ${
                      rq.difficulty === 'Easy' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : (rq.difficulty === 'Hard' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500')
                    }`}>
                      {rq.difficulty}
                    </span>
                    <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200 line-clamp-2">
                      {rq.title}
                    </h5>
                    <span className="text-[9px] text-slate-400 block font-semibold">
                      {rq.category}
                    </span>
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 italic">No related questions found in this category.</p>
            )}
          </GlassCard>
        </div>

      </div>
    </div>
  );
};

export default QuestionDetail;
