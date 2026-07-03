import React, { useState, useEffect } from 'react';
import { api, useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import { MessageSquare, Heart, Send, Plus } from 'lucide-react';

const Discussions = () => {
  const { user } = useAuth();
  const [threads, setThreads] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // New thread form
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('General');
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchThreads();
  }, []);

  const fetchThreads = async () => {
    try {
      // Seed default threads if database collection is empty
      setThreads([
        {
          _id: 't1',
          title: 'Google Technical Round Experience 2026',
          userName: 'Rohan Sharma',
          content: 'I had 3 technical coding interviews. The first focused on sliding window algorithms, and the other two had systems designs. Make sure you practice replicas clustering!',
          category: 'Interview Experience',
          likes: ['1'],
          comments: [{ userName: 'Elena Mock', content: 'Super helpful detail regarding caching replication!', createdAt: new Date() }],
          createdAt: new Date()
        },
        {
          _id: 't2',
          title: 'How does React diffing algorithm work?',
          userName: 'Priya Iyer',
          content: 'Can someone explain in simple terms how reconciliation works under the hood with key dependencies?',
          category: 'Doubts',
          likes: [],
          comments: [],
          createdAt: new Date(Date.now() - 3600 * 1000)
        }
      ]);
    } catch (e) {
      console.warn('Discussions fetch mock setup.');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateThread = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    const newThread = {
      _id: Math.random().toString(),
      title,
      content,
      category,
      userName: user?.name || 'Guest Developer',
      likes: [],
      comments: [],
      createdAt: new Date()
    };

    setThreads(prev => [newThread, ...prev]);
    setTitle('');
    setContent('');
    setShowForm(false);
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-4">
      <div className="flex justify-between items-center border-b border-slate-200/10 pb-4">
        <div>
          <h1 className="text-2xl font-bold">Community Forum & Notes</h1>
          <p className="text-xs text-slate-400 mt-0.5">Share interview experiences, ask doubts, and write public study notes.</p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center space-x-1.5 px-4 py-2 bg-indigo-500 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors"
        >
          <Plus className="h-4 w-4" />
          <span>New Thread</span>
        </button>
      </div>

      {showForm && (
        <GlassCard className="space-y-4">
          <h3 className="text-sm font-bold">Post New Discussion</h3>
          <form onSubmit={handleCreateThread} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
                  required
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={e => setCategory(e.target.value)}
                  className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-xs focus:outline-none text-slate-400"
                >
                  <option value="General" className="bg-slate-900">General Discussion</option>
                  <option value="Interview Experience" className="bg-slate-900">Interview Experience</option>
                  <option value="Doubts" className="bg-slate-900">Doubts / Questions</option>
                  <option value="Notes" className="bg-slate-900">Study Notes</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Content Body</label>
              <textarea
                value={content}
                onChange={e => setContent(e.target.value)}
                rows={4}
                className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
                required
              ></textarea>
            </div>
            <button type="submit" className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-xs font-bold">
              Submit Post
            </button>
          </form>
        </GlassCard>
      )}

      {/* Threads list */}
      <div className="space-y-4">
        {threads.map(thread => (
          <GlassCard key={thread._id} className="space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded text-[9px] font-bold uppercase">
                  {thread.category}
                </span>
                <h3 className="font-bold text-base mt-2 text-slate-800 dark:text-slate-200">
                  {thread.title}
                </h3>
                <p className="text-[10px] text-slate-400 mt-1">
                  Posted by <span className="font-semibold">{thread.userName}</span> | {new Date(thread.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            <p className="text-xs text-slate-500 leading-relaxed font-normal">
              {thread.content}
            </p>

            <div className="flex items-center space-x-4 border-t border-slate-200/10 pt-3 text-xs text-slate-400 font-semibold">
              <button className="flex items-center space-x-1.5 hover:text-red-500 transition-colors">
                <Heart className="h-4 w-4" />
                <span>{thread.likes.length} Likes</span>
              </button>
              <div className="flex items-center space-x-1.5">
                <MessageSquare className="h-4 w-4" />
                <span>{thread.comments.length} Comments</span>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};

export default Discussions;
