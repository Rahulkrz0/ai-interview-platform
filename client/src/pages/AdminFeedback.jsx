import React, { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import { 
  MessageSquare, Search, Filter, Trash2, CheckCircle2, Eye, 
  Download, ArrowUpDown, Calendar, Star, X, Check, EyeOff
} from 'lucide-react';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Filters state
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [status, setStatus] = useState('All');
  const [rating, setRating] = useState('All');
  const [sort, setSort] = useState('newest');

  // UI state
  const [selectedScreenshot, setSelectedScreenshot] = useState(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  // Fetch Feedback Logs
  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      setError('');
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (category !== 'All') params.append('category', category);
      if (status !== 'All') params.append('status', status);
      if (rating !== 'All') params.append('rating', rating);
      params.append('sort', sort);

      const res = await api.get(`/admin/feedback?${params.toString()}`);
      setFeedbacks(res.data.feedbacks || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to retrieve feedbacks.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Debounce search slightly
    const delayDebounceFn = setTimeout(() => {
      fetchFeedbacks();
    }, 400);

    return () => clearTimeout(delayDebounceFn);
  }, [search, category, status, rating, sort]);

  // Update Status
  const handleUpdateStatus = async (id, newStatus) => {
    setActionLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.put(`/admin/feedback/${id}/status`, { status: newStatus });
      setFeedbacks(prev => prev.map(fb => fb._id === id ? { ...fb, status: newStatus } : fb));
      setSuccess(`Status updated to ${newStatus} successfully.`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to update status.');
    } finally {
      setActionLoading(false);
    }
  };

  // Delete Feedback
  const handleDeleteFeedback = async (id) => {
    setActionLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.delete(`/admin/feedback/${id}`);
      setFeedbacks(prev => prev.filter(fb => fb._id !== id));
      setSuccess('Feedback entry deleted successfully.');
      setDeleteConfirmId(null);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to delete feedback entry.');
    } finally {
      setActionLoading(false);
    }
  };

  // CSV Export
  const handleExportCSV = async () => {
    try {
      setError('');
      const response = await api.get('/admin/feedback/export', {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `AI_Platform_Feedback_Report_${new Date().toISOString().split('T')[0]}.csv`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      setSuccess('CSV file downloaded successfully.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to export feedback report.');
    }
  };

  // Statistics summaries
  const totalCount = feedbacks.length;
  const newCount = feedbacks.filter(f => f.status === 'New').length;
  const reviewedCount = feedbacks.filter(f => f.status === 'Reviewed').length;
  const resolvedCount = feedbacks.filter(f => f.status === 'Resolved').length;

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-4 text-slate-800 dark:text-slate-100">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-slate-200/10 pb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center space-x-2">
            <MessageSquare className="h-6 w-6 text-indigo-500" />
            <span>User Feedback Management</span>
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit rating profiles, view screenshots, export data arrays, and transition feedback action states.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center space-x-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-emerald-500/15"
        >
          <Download className="h-4 w-4" />
          <span>Export CSV Report</span>
        </button>
      </div>

      {/* Message Notifications */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-3.5 rounded-xl text-xs">
          {error}
        </div>
      )}
      {success && (
        <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 p-3.5 rounded-xl text-xs">
          {success}
        </div>
      )}

      {/* Stats Summary Panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <GlassCard className="py-4 px-5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Total Responses</span>
          <div className="text-2xl font-extrabold mt-1">{totalCount}</div>
        </GlassCard>
        <GlassCard className="py-4 px-5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">New</span>
          <div className="text-2xl font-extrabold mt-1 text-blue-500">{newCount}</div>
        </GlassCard>
        <GlassCard className="py-4 px-5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Reviewed</span>
          <div className="text-2xl font-extrabold mt-1 text-amber-500">{reviewedCount}</div>
        </GlassCard>
        <GlassCard className="py-4 px-5">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Resolved</span>
          <div className="text-2xl font-extrabold mt-1 text-green-500">{resolvedCount}</div>
        </GlassCard>
      </div>

      {/* Filters and Search Bar */}
      <GlassCard className="p-4 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          {/* Search box */}
          <div className="md:col-span-4 relative">
            <Search className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or message..."
              className="w-full bg-slate-500/5 border border-slate-500/15 rounded-xl pl-10 pr-4 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Filters */}
          <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
            <div>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full bg-slate-500/5 dark:bg-slate-900 border border-slate-500/15 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Categories</option>
                <option value="Bug Report">Bug Reports</option>
                <option value="Feature Request">Feature Requests</option>
                <option value="General Feedback">General Feedback</option>
                <option value="Improvement Suggestion">Suggestions</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-slate-500/5 dark:bg-slate-900 border border-slate-500/15 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Statuses</option>
                <option value="New">New</option>
                <option value="Reviewed">Reviewed</option>
                <option value="Resolved">Resolved</option>
              </select>
            </div>

            <div>
              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full bg-slate-500/5 dark:bg-slate-900 border border-slate-500/15 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="All">All Ratings</option>
                <option value="5">5 Stars</option>
                <option value="4">4 Stars</option>
                <option value="3">3 Stars</option>
                <option value="2">2 Stars</option>
                <option value="1">1 Star</option>
              </select>
            </div>

            <div>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="w-full bg-slate-500/5 dark:bg-slate-900 border border-slate-500/15 rounded-xl px-3 py-2.5 text-xs focus:outline-none focus:border-indigo-500"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="rating-desc">Rating: High-Low</option>
                <option value="rating-asc">Rating: Low-High</option>
              </select>
            </div>

            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
                setStatus('All');
                setRating('All');
                setSort('newest');
              }}
              className="col-span-2 sm:col-span-1 py-2.5 text-xs font-bold text-indigo-500 bg-indigo-500/10 hover:bg-indigo-500/15 rounded-xl transition-all"
            >
              Reset Filters
            </button>

          </div>

        </div>
      </GlassCard>

      {/* Main Content Logs list */}
      {loading ? (
        <div className="py-20"><LoadingSpinner /></div>
      ) : feedbacks.length === 0 ? (
        <GlassCard className="py-16 text-center text-slate-400">
          <EyeOff className="h-10 w-10 mx-auto mb-3 text-slate-500" />
          <p className="text-sm font-semibold">No feedback entries match your filter selectors.</p>
        </GlassCard>
      ) : (
        <div className="space-y-4">
          {feedbacks.map((fb) => (
            <GlassCard key={fb._id} className="p-5 border border-slate-200/5 space-y-4 hover:border-indigo-500/10 transition-all">
              
              {/* Row 1: Header (User details, Status, Category) */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div className="flex items-center space-x-3">
                  <div className="h-9 w-9 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center font-bold text-xs uppercase">
                    {fb.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{fb.name}</span>
                      <span className="text-[10px] bg-slate-500/10 text-slate-500 px-2 py-0.5 rounded-full uppercase font-bold">
                        {fb.role}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400 font-medium">{fb.email}</span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  {/* Category */}
                  <span className="text-[10px] bg-indigo-500/10 text-indigo-500 px-2.5 py-0.5 rounded-full font-bold uppercase">
                    {fb.category}
                  </span>

                  {/* Recommendation */}
                  <span className={`text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase flex items-center space-x-1 ${
                    fb.recommendation === 'Yes' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                  }`}>
                    <span>Recommend: {fb.recommendation}</span>
                  </span>

                  {/* Status Badge */}
                  <div className="relative group">
                    <span className={`text-[10px] px-2.5 py-1 rounded-full font-bold uppercase cursor-pointer flex items-center space-x-1 ${
                      fb.status === 'New' 
                        ? 'bg-blue-500/10 text-blue-500' 
                        : fb.status === 'Reviewed' 
                        ? 'bg-amber-500/10 text-amber-500' 
                        : 'bg-green-500/10 text-green-500'
                    }`}>
                      <span>Status: {fb.status}</span>
                      <ArrowUpDown className="h-3 w-3 inline" />
                    </span>
                    
                    {/* Status quick select dropdown */}
                    <div className="absolute right-0 mt-1.5 w-32 hidden group-hover:block bg-white dark:bg-slate-900 border border-slate-200/10 rounded-xl shadow-2xl p-1.5 z-20">
                      {['New', 'Reviewed', 'Resolved'].map((st) => (
                        <button
                          key={st}
                          disabled={actionLoading}
                          onClick={() => handleUpdateStatus(fb._id, st)}
                          className="w-full text-left px-2.5 py-1.5 rounded-lg text-[10px] font-bold hover:bg-slate-500/10 text-slate-600 dark:text-slate-300 hover:text-indigo-500 transition-all"
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Message & Rating Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
                
                {/* Message */}
                <div className="md:col-span-3 space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-semibold text-slate-500">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{new Date(fb.createdAt).toLocaleString()}</span>
                  </div>
                  <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-300 font-normal">
                    {fb.message}
                  </p>
                </div>

                {/* Rating scores list */}
                <div className="md:col-span-1 bg-slate-500/5 rounded-2xl p-3 border border-slate-200/5 space-y-2 text-[10px]">
                  <div className="flex justify-between items-center font-bold border-b border-slate-200/10 pb-1.5">
                    <span>Overall Rating</span>
                    <span className="flex items-center text-amber-400">
                      <Star className="h-3 w-3 fill-amber-400 mr-0.5" />
                      {fb.overallRating}/5
                    </span>
                  </div>
                  {fb.featureRatings && (
                    <div className="space-y-1 font-medium text-slate-500 dark:text-slate-400">
                      <div className="flex justify-between">
                        <span>AI Mock:</span>
                        <span>{fb.featureRatings.mockInterview || 5}★</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Coding Sandbox:</span>
                        <span>{fb.featureRatings.codingInterview || 5}★</span>
                      </div>
                      <div className="flex justify-between">
                        <span>ATS Analyzer:</span>
                        <span>{fb.featureRatings.resumeChecker || 5}★</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Career Coach:</span>
                        <span>{fb.featureRatings.careerAssistant || 5}★</span>
                      </div>
                      <div className="flex justify-between">
                        <span>UI/UX Interface:</span>
                        <span>{fb.featureRatings.websiteUiUx || 5}★</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Row 3: Action Tools & Screenshot Trigger */}
              <div className="flex justify-between items-center border-t border-slate-200/10 pt-3">
                <div>
                  {fb.screenshotUrl ? (
                    <button
                      onClick={() => setSelectedScreenshot(fb.screenshotUrl)}
                      className="flex items-center space-x-1.5 text-xs text-indigo-500 hover:text-indigo-600 font-bold transition-colors"
                    >
                      <Eye className="h-4.5 w-4.5" />
                      <span>View Attached Screenshot</span>
                    </button>
                  ) : (
                    <span className="text-[10px] text-slate-400 italic">No screenshot uploaded.</span>
                  )}
                </div>

                <div>
                  {deleteConfirmId === fb._id ? (
                    <div className="flex items-center space-x-2 animate-in fade-in zoom-in-95 duration-200">
                      <span className="text-[10px] text-red-500 font-bold uppercase">Confirm Delete?</span>
                      <button
                        disabled={actionLoading}
                        onClick={() => handleDeleteFeedback(fb._id)}
                        className="p-1 bg-red-500 hover:bg-red-600 text-white rounded transition-colors"
                      >
                        <Check className="h-3.5 w-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="p-1 bg-slate-500/20 hover:bg-slate-500/30 text-slate-400 rounded transition-colors"
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(fb._id)}
                      className="p-2 text-slate-400 hover:text-red-500 rounded-xl hover:bg-red-500/10 transition-all"
                      title="Delete Feedback Entry"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>

            </GlassCard>
          ))}
        </div>
      )}

      {/* Lightbox Screenshot Modal Dialog */}
      {selectedScreenshot && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50 animate-in fade-in duration-200">
          <div className="relative max-w-4xl w-full bg-slate-900 border border-slate-200/10 rounded-2xl overflow-hidden shadow-2xl p-2 animate-in zoom-in-95 duration-250">
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-black/80 text-white rounded-full transition-colors z-10"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="aspect-video w-full flex items-center justify-center bg-black/30">
              <img 
                src={`http://localhost:5000${selectedScreenshot}`} 
                alt="Screenshot Detail" 
                className="max-h-[80vh] object-contain"
                onError={(e) => {
                  // Fallback for absolute urls
                  if (!e.target.src.includes('uploads/')) {
                    e.target.src = selectedScreenshot;
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AdminFeedback;
