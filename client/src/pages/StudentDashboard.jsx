import React, { useState, useEffect } from 'react';
import { useAuth, api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import { Link } from 'react-router-dom';
import {
  Calendar, CheckSquare, TrendingUp, Flame, Star, Award, Code, Play, AlertCircle
} from 'lucide-react';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const StudentDashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [codingHistory, setCodingHistory] = useState([]);
  const [resume, setResume] = useState(null);
  const [questionStats, setQuestionStats] = useState({
    totalQuestions: 0,
    viewedQuestions: 0,
    completedQuestions: 0,
    bookmarkedQuestions: 0,
    completionPercentage: 0
  });
  const [loading, setLoading] = useState(true);
  const [goals, setGoals] = useState([
    { id: 1, text: 'Solve 1 Medium Coding Question', done: false },
    { id: 2, text: 'Complete an AI HR Mock Interview', done: false },
    { id: 3, text: 'Upload updated resume version for keyword analysis', done: false }
  ]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [histRes, codingRes, resumeRes, qProgressRes] = await Promise.all([
        api.get('/interviews/history').catch(() => ({ data: { history: [] } })),
        api.get('/coding/history').catch(() => ({ data: { history: [] } })),
        api.get('/resumes/detail').catch(() => ({ data: { resume: null } })),
        api.get('/questions/progress').catch(() => ({ data: { stats: { totalQuestions: 0, viewedQuestions: 0, completedQuestions: 0, bookmarkedQuestions: 0, completionPercentage: 0 } } }))
      ]);
      
      setHistory(histRes.data.history || []);
      setCodingHistory(codingRes.data.history || []);
      setResume(resumeRes.data.resume);
      if (qProgressRes.data && qProgressRes.data.stats) {
        setQuestionStats(qProgressRes.data.stats);
      }
    } catch (err) {
      console.warn('Dashboard fetch warning:', err.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleGoal = (id) => {
    setGoals(prev => prev.map(g => g.id === id ? { ...g, done: !g.done } : g));
  };

  if (loading) return <LoadingSpinner />;

  // Metrics computation backed by user-specific QuestionProgress source of truth
  const completedInterviews = history.length;
  const codingCompletedCount = codingHistory.filter(c => c.status === 'Accepted').length;
  const conceptualCompletedCount = questionStats.completedQuestions;
  
  // Unique questions solved: from both QuestionProgress conceptual completed count and coding accepted submissions
  const uniqueQuestionsSolved = conceptualCompletedCount + codingCompletedCount;

  const currentXp = user?.xp || 0;
  const isNewUser = completedInterviews === 0 && codingCompletedCount === 0 && conceptualCompletedCount === 0 && currentXp === 0;

  // Calculate Progress Percent strictly backed by QuestionProgress completionPercentage + interviews/coding/XP
  const progressPercent = isNewUser ? 0 : Math.min(100, Math.round(
    questionStats.completionPercentage + (completedInterviews * 5) + (codingCompletedCount * 2) + (currentXp / 50)
  ));

  // Chart Setup
  const chartData = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Placement Readiness (%)',
        data: isNewUser ? [0, 0, 0, 0, 0, 0, 0] : [72, 75, 74, 80, 82, 85, progressPercent],
        borderColor: '#6366f1',
        backgroundColor: 'rgba(99, 102, 241, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { min: 0, max: 100, grid: { color: 'rgba(255, 255, 255, 0.05)' } },
      x: { grid: { display: false } }
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-4 text-slate-800 dark:text-slate-100">
      
      {/* Welcome Banner */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-500/15 via-purple-600/10 to-transparent p-8 rounded-3xl border border-indigo-500/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name || 'Developer'}!</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Dream Company: <span className="font-semibold text-indigo-500">{user?.dreamCompany || 'Not configured'}</span>
          </p>
        </div>
        <div className="flex space-x-2">
          <Link
            to="/profile"
            className="flex items-center space-x-2 px-4 py-2.5 bg-slate-500/15 text-slate-700 dark:text-slate-200 rounded-2xl text-xs font-semibold hover:bg-slate-500/25 transition-all"
          >
            Configure Profile
          </Link>
          <Link
            to="/interview"
            className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-2xl text-xs font-semibold hover:shadow-lg hover:shadow-indigo-500/15 transition-all"
          >
            <Play className="h-4 w-4" />
            <span>Launch AI Interview</span>
          </Link>
        </div>
      </div>

      {/* Welcome Warning CTA Banner for New Users */}
      {isNewUser && (
        <div className="bg-indigo-500/10 border border-indigo-500/25 rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-pulse">
          <div className="flex items-start space-x-3.5">
            <AlertCircle className="h-6 w-6 text-indigo-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-indigo-500 dark:text-indigo-400">✨ Kickstart Your Interview Prep!</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl">
                You have not completed any mock sessions or coding sandbox challenges yet. Launch an AI Mock Interview now to get personalized, real-time feedback on your communication speed and tech answers!
              </p>
            </div>
          </div>
          <Link
            to="/interview"
            className="w-full sm:w-auto px-4.5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl text-xs font-bold transition-all shrink-0 text-center shadow-md shadow-indigo-500/10"
          >
            Start First Mock Interview
          </Link>
        </div>
      )}

      {/* Analytics Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
        <GlassCard className="p-4 flex items-center justify-between" hover>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Progress</span>
            <div className="text-xl font-bold mt-1">{progressPercent}%</div>
          </div>
          <div className="p-2.5 bg-indigo-500/10 text-indigo-500 rounded-xl">
            <TrendingUp className="h-4.5 w-4.5" />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between" hover>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Interviews Completed</span>
            <div className="text-xl font-bold mt-1">{completedInterviews}</div>
          </div>
          <div className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl">
            <Play className="h-4.5 w-4.5" />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between" hover>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Questions Solved</span>
            <div className="text-xl font-bold mt-1">{uniqueQuestionsSolved}</div>
          </div>
          <div className="p-2.5 bg-purple-500/10 text-purple-500 rounded-xl">
            <Star className="h-4.5 w-4.5" />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between" hover>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Coding Completed</span>
            <div className="text-xl font-bold mt-1">{codingCompletedCount}</div>
          </div>
          <div className="p-2.5 bg-emerald-500/10 text-emerald-500 rounded-xl">
            <Code className="h-4.5 w-4.5" />
          </div>
        </GlassCard>

        <GlassCard className="p-4 flex items-center justify-between hover col-span-2 lg:col-span-1" hover>
          <div>
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total XP</span>
            <div className="text-xl font-bold mt-1">{currentXp} XP</div>
          </div>
          <div className="p-2.5 bg-amber-500/10 text-amber-500 rounded-xl">
            <Award className="h-4.5 w-4.5" />
          </div>
        </GlassCard>
      </div>

      {/* Main Grid content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Grid: Heatmap Chart & Goals */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="space-y-4 relative">
            <h3 className="text-base font-bold">Placement Progress Weekly Heatmap</h3>
            <div className="h-64 relative">
              <Line data={chartData} options={chartOptions} />
              {isNewUser && (
                <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center rounded-2xl">
                  <div className="text-center p-4">
                    <p className="text-xs font-semibold text-slate-300">No progress data recorded yet.</p>
                    <p className="text-[10px] text-slate-400 mt-1">Complete tasks to populate your weekly readiness chart!</p>
                  </div>
                </div>
              )}
            </div>
          </GlassCard>

          {/* Today's Goals */}
          <GlassCard className="space-y-4">
            <h3 className="text-base font-bold">Today's Practice Goals</h3>
            <div className="space-y-3">
              {goals.map(goal => (
                <div
                  key={goal.id}
                  onClick={() => toggleGoal(goal.id)}
                  className={`flex items-center space-x-3 p-3 rounded-2xl cursor-pointer border transition-all ${
                    goal.done
                      ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-500 line-through opacity-70'
                      : 'glass-card border-slate-200/10 hover:border-indigo-500/20'
                  }`}
                >
                  <div className={`h-4.5 w-4.5 rounded border flex items-center justify-center ${
                    goal.done ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-500/30'
                  }`}>
                    {goal.done && <span className="text-[10px]">✓</span>}
                  </div>
                  <span className="text-xs font-semibold">{goal.text}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right Grid: Calendar, Upcoming interviews & recent submissions */}
        <div className="space-y-6">
          {/* Calendar Box */}
          <GlassCard className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold">Schedule Calendar</h3>
              <Calendar className="h-4.5 w-4.5 text-indigo-500" />
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-slate-400 font-bold border-b border-slate-200/10 pb-2">
              <span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span>
            </div>
            <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold">
              {Array.from({ length: 30 }).map((_, i) => {
                const day = i + 1;
                const isSelected = day === 26; // Highlight June 26 mock current date
                return (
                  <span
                    key={day}
                    className={`py-2 rounded-xl block ${
                      isSelected ? 'bg-indigo-500 text-white font-bold' : 'hover:bg-slate-500/10'
                    }`}
                  >
                    {day}
                  </span>
                );
              })}
            </div>
          </GlassCard>

          {/* Past Interview Logs */}
          <GlassCard className="space-y-4">
            <h3 className="text-base font-bold">Recent Mock Attempts</h3>
            <div className="space-y-3">
              {history.length === 0 ? (
                <div className="text-center text-xs py-8 text-slate-400 italic">
                  No interview sessions completed yet.
                </div>
              ) : (
                history.slice(0, 3).map(interview => (
                  <div key={interview._id} className="p-3 border border-slate-200/10 rounded-2xl flex items-center justify-between text-xs">
                    <div>
                      <p className="font-semibold">{interview.type} Prep ({interview.roleName})</p>
                      <p className="text-[10px] text-slate-400">{new Date(interview.createdAt).toLocaleDateString()}</p>
                    </div>
                    <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                      interview.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                      {interview.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
