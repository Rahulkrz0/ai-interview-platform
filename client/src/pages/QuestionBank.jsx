import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import { 
  Search, Bookmark, CheckCircle, ChevronLeft, ChevronRight, 
  Clock, Tag, Building, Award, BookOpen, RotateCcw
} from 'lucide-react';

const QuestionBank = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter states
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedCompany, setSelectedCompany] = useState('All');
  const [selectedTopic, setSelectedTopic] = useState('All');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  
  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);

  // Progress stats
  const [stats, setStats] = useState({
    totalQuestions: 0,
    viewedQuestions: 0,
    completedQuestions: 0,
    bookmarkedQuestions: 0,
    completionPercentage: 0
  });

  // Filter Option Lists
  const categories = [
    'All', 'Java', 'C++', 'Python', 'JavaScript', 'React', 'Node.js', 'Express.js',
    'MongoDB', 'SQL', 'DBMS', 'OOP', 'Operating System', 'Computer Networks', 
    'Data Structures', 'Algorithms', 'Aptitude', 'HR', 'Behavioral', 'System Design'
  ];

  const difficulties = ['All', 'Easy', 'Medium', 'Hard'];

  const companies = [
    'All', 'Google', 'Microsoft', 'Amazon', 'Meta', 'Apple', 'Netflix', 
    'TCS', 'Infosys', 'Wipro', 'Accenture', 'Deloitte', 'Capgemini'
  ];

  const commonTopics = [
    'All', 'Introduction', 'Self Evaluation', 'Company Fit', 'Career Growth', 'Value Proposition',
    'Pointers', 'Reference', 'OOP', 'Classes', 'Inheritance', 'Polymorphism', 'Encapsulation',
    'Memory Management', 'Garbage Collection', 'Functions', 'Threading', 'Processes',
    'Scheduling', 'Deadlock', 'Virtual Memory', 'OS Basics', 'TCP/IP', 'OSI Model',
    'DNS', 'HTTP', 'IP Addressing', 'Subnetting', 'Database Basics', 'SQL Queries',
    'Normalization', 'Indexing', 'Transactions', 'NoSQL', 'Schema Design',
    'React Hooks', 'Virtual DOM', 'State Management', 'Components', 'Express Routing',
    'Middleware', 'Event Loop', 'Asynchronous JS', 'Rest API', 'Arrays', 'Linked Lists',
    'Stacks', 'Queues', 'Trees', 'Graphs', 'Hashing', 'Sorting', 'Searching',
    'Recursion', 'Dynamic Programming', 'Complexity', 'Aptitude Math', 'Logic'
  ];

  useEffect(() => {
    fetchQuestions();
    fetchProgressStats();
  }, [
    currentPage, selectedCategory, selectedDifficulty, 
    selectedCompany, selectedTopic, showBookmarkedOnly
  ]);

  // Handle Search Input with Debounce or search submission
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setCurrentPage(1);
      fetchQuestions();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      if (showBookmarkedOnly) {
        // Fetch bookmarked questions from bookmarks endpoint
        const res = await api.get('/questions/bookmarks');
        if (res.data && res.data.status === 'success') {
          // Filter bookmarks locally on other criteria since the endpoint returns all
          let filtered = res.data.questions.map(q => ({
            ...q,
            isBookmarked: true,
            // Since bookmark model populates we might need to match format
          }));

          if (search) {
            filtered = filtered.filter(q => 
              q.title.toLowerCase().includes(search.toLowerCase()) || 
              q.description?.toLowerCase().includes(search.toLowerCase()) ||
              q.topic?.toLowerCase().includes(search.toLowerCase())
            );
          }
          if (selectedCategory !== 'All') {
            filtered = filtered.filter(q => q.category === selectedCategory);
          }
          if (selectedDifficulty !== 'All') {
            filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
          }
          if (selectedCompany !== 'All') {
            filtered = filtered.filter(q => q.companies?.some(c => c.toLowerCase().includes(selectedCompany.toLowerCase())));
          }
          if (selectedTopic !== 'All') {
            filtered = filtered.filter(q => q.topic?.toLowerCase().includes(selectedTopic.toLowerCase()));
          }

          setQuestions(filtered);
          setTotalQuestions(filtered.length);
          setTotalPages(1);
        }
      } else {
        // Fetch paginated questions from database with query params
        const params = {
          page: currentPage,
          limit: 20
        };

        if (search) params.search = search;
        if (selectedCategory !== 'All') params.category = selectedCategory;
        if (selectedDifficulty !== 'All') params.difficulty = selectedDifficulty;
        if (selectedCompany !== 'All') params.company = selectedCompany;
        if (selectedTopic !== 'All') params.topic = selectedTopic;

        const res = await api.get('/questions', { params });
        if (res.data && res.data.status === 'success') {
          setQuestions(res.data.questions);
          setTotalPages(res.data.totalPages || 1);
          setTotalQuestions(res.data.total || 0);
        }
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProgressStats = async () => {
    try {
      const res = await api.get('/questions/progress');
      if (res.data && res.data.status === 'success') {
        setStats(res.data.stats);
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    }
  };

  const toggleBookmark = async (e, id) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await api.post('/gamification/bookmark', { questionId: id });
      if (res.data && res.data.status === 'success') {
        // Update local state
        setQuestions(prev => 
          prev.map(q => q._id === id ? { ...q, isBookmarked: res.data.bookmarked } : q)
        );
        fetchProgressStats();
        // If we are in bookmarked only view, filter it out immediately
        if (showBookmarkedOnly && !res.data.bookmarked) {
          setQuestions(prev => prev.filter(q => q._id !== id));
        }
      }
    } catch (err) {
      console.error('Failed to toggle bookmark:', err);
    }
  };

  const handleResetFilters = () => {
    setSearch('');
    setSelectedCategory('All');
    setSelectedDifficulty('All');
    setSelectedCompany('All');
    setSelectedTopic('All');
    setShowBookmarkedOnly(false);
    setCurrentPage(1);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4 px-4 animate-in fade-in duration-200">
      
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold">Concept Questions Library</h1>
        <p className="text-xs text-slate-400 mt-0.5">Explore standard placement questions asked by target companies.</p>
      </div>

      {/* Progress Tracking Widget */}
      <GlassCard className="p-6 grid grid-cols-1 md:grid-cols-4 gap-6 items-center">
        <div className="md:col-span-1 border-r border-slate-200/10 pr-4 space-y-1">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Available</span>
          <p className="text-2xl font-black text-slate-800 dark:text-slate-200">{stats.totalQuestions}</p>
        </div>
        
        <div className="grid grid-cols-3 gap-4 md:col-span-2 text-center md:text-left">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Viewed</span>
            <p className="text-base font-bold text-indigo-500">{stats.viewedQuestions}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Completed</span>
            <p className="text-base font-bold text-emerald-500">{stats.completedQuestions}</p>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-semibold text-slate-400">Bookmarked</span>
            <p className="text-base font-bold text-purple-500">{stats.bookmarkedQuestions}</p>
          </div>
        </div>

        <div className="md:col-span-1 space-y-2">
          <div className="flex justify-between items-center text-xs font-bold">
            <span className="text-slate-400">Completion</span>
            <span className="text-indigo-500">{stats.completionPercentage}%</span>
          </div>
          <div className="overflow-hidden h-2.5 rounded-full bg-slate-500/15">
            <div 
              style={{ width: `${stats.completionPercentage}%` }} 
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 transition-all duration-500"
            />
          </div>
        </div>
      </GlassCard>

      {/* Search and Filters panel */}
      <GlassCard className="p-4 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Text Search */}
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by question, category, company, topic..."
              className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500 transition-all"
            />
          </div>

          <div className="flex flex-wrap gap-2 w-full md:w-auto items-center justify-end">
            {/* Bookmarks Toggle */}
            <button
              onClick={() => {
                setShowBookmarkedOnly(!showBookmarkedOnly);
                setCurrentPage(1);
              }}
              className={`px-4 py-2.5 rounded-xl border text-xs font-bold transition-all flex items-center space-x-1.5 ${
                showBookmarkedOnly
                  ? 'bg-indigo-500 border-indigo-500 text-white'
                  : 'glass-panel border-slate-200/10 text-slate-400 hover:bg-slate-500/10'
              }`}
            >
              <Bookmark className="h-4 w-4" />
              <span>Saved Only</span>
            </button>

            {/* Reset Filters */}
            <button
              onClick={handleResetFilters}
              className="p-2.5 rounded-xl border border-slate-200/10 text-slate-400 hover:bg-slate-500/10 hover:text-indigo-500 transition-all"
              title="Reset Filters"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Dropdown Filters Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {/* Category Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 block uppercase">Category</label>
            <select
              value={selectedCategory}
              onChange={e => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {categories.map(c => <option key={c} value={c} className="bg-slate-900 text-white">{c}</option>)}
            </select>
          </div>

          {/* Difficulty Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 block uppercase">Difficulty</label>
            <select
              value={selectedDifficulty}
              onChange={e => { setSelectedDifficulty(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {difficulties.map(d => <option key={d} value={d} className="bg-slate-900 text-white">{d}</option>)}
            </select>
          </div>

          {/* Company Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 block uppercase">Company</label>
            <select
              value={selectedCompany}
              onChange={e => { setSelectedCompany(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {companies.map(co => <option key={co} value={co} className="bg-slate-900 text-white">{co}</option>)}
            </select>
          </div>

          {/* Topic Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] font-bold text-slate-400 block uppercase">Topic</label>
            <select
              value={selectedTopic}
              onChange={e => { setSelectedTopic(e.target.value); setCurrentPage(1); }}
              className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-indigo-500"
            >
              {commonTopics.map(t => <option key={t} value={t} className="bg-slate-900 text-white">{t}</option>)}
            </select>
          </div>
        </div>
      </GlassCard>

      {/* Questions list display */}
      {loading ? (
        <LoadingSpinner />
      ) : questions.length === 0 ? (
        <div className="text-center py-16 text-slate-400 text-xs">
          No questions found matching your search criteria or filter combinations.
        </div>
      ) : (
        <div className="space-y-4">
          {questions.map(q => (
            <Link 
              key={q._id} 
              to={`/question-bank/${q._id}`}
              className="block cursor-pointer transition-all"
            >
              <GlassCard 
                className="flex items-center justify-between py-4 px-6 hover:shadow-indigo-500/5 hover:border-indigo-500/20 transition-all border border-slate-200/10"
                hover
              >
                <div className="space-y-1.5 flex-1 pr-6 text-left">
                  <div className="flex flex-wrap items-center gap-2 text-[9px] font-bold">
                    {/* Completion checkmark */}
                    {q.isCompleted && (
                      <span className="flex items-center text-emerald-500 space-x-0.5 bg-emerald-500/10 px-1.5 py-0.5 rounded font-bold">
                        <CheckCircle className="h-3 w-3 fill-emerald-500/20" />
                        <span>Completed</span>
                      </span>
                    )}
                    {q.isViewed && !q.isCompleted && (
                      <span className="text-slate-400 bg-slate-500/10 px-1.5 py-0.5 rounded font-bold">
                        Viewed
                      </span>
                    )}
                    
                    <span className={`px-2 py-0.5 rounded uppercase ${
                      q.difficulty === 'Easy' 
                        ? 'bg-emerald-500/10 text-emerald-500' 
                        : (q.difficulty === 'Hard' ? 'bg-red-500/10 text-red-500' : 'bg-amber-500/10 text-amber-500')
                    }`}>
                      {q.difficulty}
                    </span>
                    <span className="text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded">
                      {q.category}
                    </span>
                    {q.topic && (
                      <span className="text-purple-500 bg-purple-500/10 px-2 py-0.5 rounded">
                        {q.topic}
                      </span>
                    )}
                    {q.estimatedTime && (
                      <span className="text-slate-400 flex items-center space-x-1 font-semibold">
                        <Clock className="h-3 w-3" />
                        <span>{q.estimatedTime} min</span>
                      </span>
                    )}
                  </div>
                  
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 line-clamp-1">
                    {q.title}
                  </h3>
                  
                  {/* Company Badges */}
                  {q.companies && q.companies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {q.companies.slice(0, 5).map(comp => (
                        <span key={comp} className="text-[9px] text-slate-500 flex items-center space-x-0.5">
                          <Building className="h-2.5 w-2.5 text-slate-400" />
                          <span>{comp}</span>
                        </span>
                      ))}
                      {q.companies.length > 5 && (
                        <span className="text-[9px] text-slate-400 font-bold">
                          +{q.companies.length - 5} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-3">
                  <button
                    onClick={(e) => toggleBookmark(e, q._id)}
                    className={`p-2.5 rounded-xl border transition-all ${
                      q.isBookmarked
                        ? 'bg-indigo-500/10 border-indigo-500 text-indigo-500 hover:bg-indigo-500/20'
                        : 'border-slate-200/10 hover:bg-slate-500/10 text-slate-400'
                    }`}
                    title={q.isBookmarked ? "Remove Bookmark" : "Bookmark Question"}
                  >
                    <Bookmark className={`h-4 w-4 ${q.isBookmarked ? 'fill-indigo-500' : ''}`} />
                  </button>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {!loading && !showBookmarkedOnly && totalPages > 1 && (
        <div className="flex justify-between items-center pt-6 text-xs font-bold text-slate-500">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-500/10 hover:bg-slate-500/20 disabled:opacity-50 disabled:hover:bg-slate-500/10 rounded-xl transition-all"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          {/* Page numbers */}
          <div className="flex items-center space-x-1.5">
            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`px-3 py-1.5 rounded-lg border transition-all ${
                    currentPage === pageNum
                      ? 'bg-indigo-500 border-indigo-500 text-white'
                      : 'border-slate-200/10 text-slate-400 hover:bg-slate-500/10'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="flex items-center space-x-1.5 px-4 py-2 bg-slate-500/10 hover:bg-slate-500/20 disabled:opacity-50 disabled:hover:bg-slate-500/10 rounded-xl transition-all"
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionBank;
