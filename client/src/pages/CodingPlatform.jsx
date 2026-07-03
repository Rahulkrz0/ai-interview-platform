import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import { Search, Flame, Award, CheckCircle2, Target, BarChart2, BookOpen, Code2, RefreshCw } from 'lucide-react';

const CodingPlatform = () => {
  const navigate = useNavigate();
  const [problems, setProblems] = useState([]);
  const [stats, setStats] = useState({
    problemsSolved: 0,
    easySolved: 0,
    mediumSolved: 0,
    hardSolved: 0,
    acceptanceRate: 0,
    totalSubmissions: 0,
    currentStreak: 0,
    longestStreak: 0,
    xpEarned: 0
  });

  // Filters & Search
  const [search, setSearch] = useState('');
  const [difficulty, setDifficulty] = useState('All');
  const [company, setCompany] = useState('All');
  const [topic, setTopic] = useState('All');
  const [sort, setSort] = useState('Recently Added');
  const [loading, setLoading] = useState(true);

  // Topics and Companies list for dropdowns
  const topicsList = ['All', 'Arrays', 'Strings', 'HashMap', 'Two Pointers', 'Sliding Window', 'Binary Search', 'Stack', 'Queue', 'Linked List', 'Trees', 'Dynamic Programming', 'Greedy', 'Backtracking', 'Graph', 'BFS', 'DFS', 'Bit Manipulation'];
  const companiesList = ['All', 'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 'Adobe', 'Oracle', 'Uber', 'Atlassian', 'TCS', 'Infosys', 'Wipro', 'Accenture', 'Deloitte', 'Capgemini'];

  useEffect(() => {
    fetchData();
  }, [difficulty, company, topic, sort, search]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [problemsRes, statsRes] = await Promise.all([
        api.get('/coding/problems', {
          params: { difficulty, company, topic, sort, search }
        }),
        api.get('/coding/stats')
      ]);

      setProblems(problemsRes.data.problems || []);
      setStats(statsRes.data.stats || {
        problemsSolved: 0, easySolved: 0, mediumSolved: 0, hardSolved: 0,
        acceptanceRate: 0, totalSubmissions: 0, currentStreak: 0, longestStreak: 0, xpEarned: 0
      });
    } catch (err) {
      console.error('Error fetching coding platform data:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 animate-fade-in">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center space-x-2 text-indigo-500 mb-1">
            <Code2 className="h-5 w-5" />
            <span className="text-xs font-bold uppercase tracking-wider">Professional Coding Environment</span>
          </div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Coding Platform</h1>
          <p className="text-sm text-slate-600 dark:text-slate-400">
            Practice 100+ real interview coding challenges with our multi-language compiler and AI Coding Assistant.
          </p>
        </div>
        <button
          onClick={fetchData}
          className="flex items-center space-x-2 px-4 py-2 border border-slate-200/10 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-500/10 transition-all shadow-sm"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Dashboard</span>
        </button>
      </div>

      {/* Dashboard Stats Panel */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Problems Solved */}
        <GlassCard className="p-4 flex flex-col justify-between border-t-4 border-t-indigo-500">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Solved</span>
            <CheckCircle2 className="h-4 w-4 text-indigo-500" />
          </div>
          <div className="my-2 flex items-baseline space-x-1">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{stats.problemsSolved}</span>
            <span className="text-xs text-slate-500">/ 120</span>
          </div>
          <div className="flex space-x-1.5 text-[10px] font-bold">
            <span className="text-emerald-500">E: {stats.easySolved}</span>
            <span className="text-amber-500">M: {stats.mediumSolved}</span>
            <span className="text-rose-500">H: {stats.hardSolved}</span>
          </div>
        </GlassCard>

        {/* Acceptance Rate */}
        <GlassCard className="p-4 flex flex-col justify-between border-t-4 border-t-emerald-500">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Acceptance</span>
            <Target className="h-4 w-4 text-emerald-500" />
          </div>
          <div className="my-2">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{stats.acceptanceRate}%</span>
          </div>
          <span className="text-[10px] text-slate-500 font-semibold">{stats.totalSubmissions} Total Submissions</span>
        </GlassCard>

        {/* Current Streak */}
        <GlassCard className="p-4 flex flex-col justify-between border-t-4 border-t-amber-500">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Current Streak</span>
            <Flame className="h-4 w-4 text-amber-500" />
          </div>
          <div className="my-2">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{stats.currentStreak}</span>
            <span className="text-xs text-slate-500 ml-1">days</span>
          </div>
          <span className="text-[10px] text-amber-500 font-bold">Keep it going!</span>
        </GlassCard>

        {/* Longest Streak */}
        <GlassCard className="p-4 flex flex-col justify-between border-t-4 border-t-rose-500">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>Longest Streak</span>
            <Flame className="h-4 w-4 text-rose-500" />
          </div>
          <div className="my-2">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{stats.longestStreak}</span>
            <span className="text-xs text-slate-500 ml-1">days</span>
          </div>
          <span className="text-[10px] text-slate-500 font-semibold">Personal Best</span>
        </GlassCard>

        {/* XP Earned */}
        <GlassCard className="p-4 flex flex-col justify-between border-t-4 border-t-purple-500">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-semibold">
            <span>XP Earned</span>
            <Award className="h-4 w-4 text-purple-500" />
          </div>
          <div className="my-2">
            <span className="text-2xl font-black text-slate-800 dark:text-slate-100">{stats.xpEarned}</span>
          </div>
          <span className="text-[10px] text-purple-500 font-bold">Leveling Up!</span>
        </GlassCard>

        {/* Overview Banner */}
        <GlassCard className="p-4 flex flex-col justify-between bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
          <div className="flex items-center justify-between text-white/80 text-xs font-semibold">
            <span>FAANG Prep</span>
            <BarChart2 className="h-4 w-4 text-white" />
          </div>
          <div className="text-xs font-bold leading-snug my-1">
            Master 5 Languages & Optimal Data Structures
          </div>
          <span className="text-[10px] text-white/90 underline cursor-pointer font-semibold">Judge0 Supported</span>
        </GlassCard>
      </div>

      {/* Filter Toolbar */}
      <GlassCard className="p-6 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search by problem name, topic, or company..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-500/5 dark:bg-slate-900/50 border border-slate-200/20 dark:border-slate-700/50 rounded-xl text-xs font-semibold focus:outline-none focus:border-indigo-500 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 shadow-inner transition-all"
            />
          </div>

          {/* Filter dropdowns */}
          <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
            {/* Difficulty */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold whitespace-nowrap">Difficulty:</span>
              <select
                value={difficulty}
                onChange={e => setDifficulty(e.target.value)}
                className="bg-slate-500/5 dark:bg-slate-900/50 border border-slate-200/20 dark:border-slate-700/50 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 px-3 py-2 focus:outline-none focus:border-indigo-500 flex-1"
              >
                <option value="All" className="bg-white dark:bg-slate-800">All Difficulties</option>
                <option value="Easy" className="bg-white dark:bg-slate-800">Easy</option>
                <option value="Medium" className="bg-white dark:bg-slate-800">Medium</option>
                <option value="Hard" className="bg-white dark:bg-slate-800">Hard</option>
              </select>
            </div>

            {/* Topic */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold whitespace-nowrap">Topic:</span>
              <select
                value={topic}
                onChange={e => setTopic(e.target.value)}
                className="bg-slate-500/5 dark:bg-slate-900/50 border border-slate-200/20 dark:border-slate-700/50 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 px-3 py-2 focus:outline-none focus:border-indigo-500 flex-1"
              >
                {topicsList.map(t => (
                  <option key={t} value={t} className="bg-white dark:bg-slate-800">{t}</option>
                ))}
              </select>
            </div>

            {/* Company */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold whitespace-nowrap">Company:</span>
              <select
                value={company}
                onChange={e => setCompany(e.target.value)}
                className="bg-slate-500/5 dark:bg-slate-900/50 border border-slate-200/20 dark:border-slate-700/50 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 px-3 py-2 focus:outline-none focus:border-indigo-500 flex-1"
              >
                {companiesList.map(c => (
                  <option key={c} value={c} className="bg-white dark:bg-slate-800">{c}</option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="flex items-center space-x-2 w-full sm:w-auto">
              <span className="text-xs text-slate-600 dark:text-slate-400 font-bold whitespace-nowrap">Sort By:</span>
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="bg-slate-500/5 dark:bg-slate-900/50 border border-slate-200/20 dark:border-slate-700/50 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 px-3 py-2 focus:outline-none focus:border-indigo-500 flex-1"
              >
                <option value="Recently Added" className="bg-white dark:bg-slate-800">Recently Added</option>
                <option value="Easy -> Hard" className="bg-white dark:bg-slate-800">Easy → Hard</option>
                <option value="Hard -> Easy" className="bg-white dark:bg-slate-800">Hard → Easy</option>
                <option value="Most Popular" className="bg-white dark:bg-slate-800">Most Popular</option>
              </select>
            </div>

            {/* Reset Filters Button */}
            {(difficulty !== 'All' || topic !== 'All' || company !== 'All' || search !== '') && (
              <button
                onClick={() => {
                  setDifficulty('All');
                  setTopic('All');
                  setCompany('All');
                  setSearch('');
                  setSort('Recently Added');
                }}
                className="px-4 py-2 bg-slate-500/10 hover:bg-indigo-500/20 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center space-x-1"
              >
                <span>Reset Filters</span>
              </button>
            )}
          </div>
        </div>
      </GlassCard>

      {/* Problems Table / Cards Grid */}
      <div className="space-y-4">
        {loading ? (
          <LoadingSpinner />
        ) : problems.length === 0 ? (
          <GlassCard className="p-12 text-center space-y-4">
            <BookOpen className="h-12 w-12 text-slate-400 mx-auto opacity-50" />
            <h3 className="text-lg font-bold text-slate-700 dark:text-slate-200">No coding problems match your filters</h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Try broadening your search query or selecting 'All' for Difficulty, Topic, and Company.
            </p>
          </GlassCard>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {problems.map(p => (
              <GlassCard
                key={p._id}
                className="p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-slate-200/10 hover:border-indigo-500/30 transition-all cursor-pointer group"
                onClick={() => navigate(`/coding/workspace/${p.slug || p._id}`)}
              >
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-10 h-10 rounded-2xl bg-slate-500/10 flex items-center justify-center font-black text-slate-700 dark:text-slate-200 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
                    {p.problemNumber}
                  </div>
                  <div className="space-y-1.5 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-slate-800 dark:text-slate-100 group-hover:text-indigo-500 transition-colors">
                        {p.title}
                      </h3>
                      <span className={`text-[10px] uppercase tracking-wider px-2.5 py-0.5 rounded-full font-bold ${
                        p.difficulty === 'Easy' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' :
                        p.difficulty === 'Medium' ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' :
                        'bg-rose-500/10 text-rose-500 border border-rose-500/20'
                      }`}>
                        {p.difficulty}
                      </span>
                      <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2.5 py-0.5 rounded-full font-bold border border-indigo-500/20">
                        {p.topic}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 leading-relaxed max-w-4xl">
                      {p.description}
                    </p>

                    {/* Company Tags */}
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-slate-400 font-bold uppercase mr-1">Companies:</span>
                      {p.companies?.slice(0, 5).map(c => (
                        <span key={c} className="text-[10px] bg-slate-500/10 text-slate-600 dark:text-slate-400 px-2 py-0.5 rounded-lg font-semibold">
                          {c}
                        </span>
                      ))}
                      {p.companies?.length > 5 && (
                        <span className="text-[10px] text-slate-500 font-bold">+{p.companies.length - 5} more</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-t-0 border-slate-200/10">
                  <div className="text-right hidden sm:block">
                    <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      {p.solvedCount || 0} Solved
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium">Acceptance Rate</div>
                  </div>
                  <button
                    onClick={e => {
                      e.stopPropagation();
                      navigate(`/coding/workspace/${p.slug || p._id}`);
                    }}
                    className="w-full md:w-auto px-5 py-2.5 bg-indigo-500 hover:bg-indigo-600 text-white font-bold text-xs rounded-xl shadow-lg hover:shadow-indigo-500/30 transition-all text-center"
                  >
                    Solve Challenge
                  </button>
                </div>
              </GlassCard>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodingPlatform;
