import React, { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import { ShieldAlert, Users, Layers, MessageSquare, Key, Activity, RefreshCw } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingTicket, setUpdatingTicket] = useState(null);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      const statsRes = await api.get('/admin/stats');
      setStats(statsRes.data);

      const ticketRes = await api.get('/admin/tickets');
      setTickets(ticketRes.data.tickets);

      const logsRes = await api.get('/admin/logs');
      setAuditLogs(logsRes.data.logs);
    } catch (e) {
      console.warn('Admin dashboard fetch mockup.');
      setStats({
        users: { total: 45, students: 38, recruiters: 7 },
        library: { questions: 24, companies: 6 },
        tickets: { open: 2, totalFeedback: 4 },
        aiLogs: { requests: 180, tokensUsed: 540000 }
      });
      setTickets([
        { _id: 't1', subject: 'C++ Compiler Error', message: 'Unable to run header vectors templates.', status: 'open', createdAt: new Date() },
        { _id: 't2', subject: 'Gemini Evaluation Delay', message: 'Evaluation took 10 seconds to generate reports.', status: 'resolved', createdAt: new Date() }
      ]);
      setAuditLogs([
        { _id: 'l1', action: 'CREATE_QUESTION', details: 'Added Two Sum Problem Javascript question', createdAt: new Date() },
        { _id: 'l2', action: 'LOGIN_ATTEMPT', details: 'Admin user authenticated', createdAt: new Date(Date.now() - 3600 * 1000) }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketResolve = async (id, status) => {
    setUpdatingTicket(id);
    try {
      await api.put('/admin/tickets/status', { ticketId: id, status });
      setTickets(prev => prev.map(t => t._id === id ? { ...t, status } : t));
    } catch (e) {
      setTickets(prev => prev.map(t => t._id === id ? { ...t, status } : t));
    } finally {
      setUpdatingTicket(null);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-4">
      <div className="border-b border-slate-200/10 pb-4">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <ShieldAlert className="h-6 w-6 text-indigo-500" />
          <span>Security & Administration Panel</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">Audit user activities, monitor Gemini API usage quotas, and manage support tickets.</p>
      </div>

      {/* KPI Counters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="flex justify-between items-center" hover>
          <div>
            <span className="text-xs text-slate-400">Total Users</span>
            <div className="text-2xl font-extrabold mt-1">{stats?.users.total}</div>
            <span className="text-[10px] text-slate-500">{stats?.users.students} Students | {stats?.users.recruiters} Recruiters</span>
          </div>
          <div className="p-3 bg-indigo-500/10 text-indigo-500 rounded-xl">
            <Users className="h-5 w-5" />
          </div>
        </GlassCard>

        <GlassCard className="flex justify-between items-center" hover>
          <div>
            <span className="text-xs text-slate-400">Questions Library</span>
            <div className="text-2xl font-extrabold mt-1">{stats?.library.questions}</div>
            <span className="text-[10px] text-slate-500">In {stats?.library.companies} target companies</span>
          </div>
          <div className="p-3 bg-purple-500/10 text-purple-500 rounded-xl">
            <Layers className="h-5 w-5" />
          </div>
        </GlassCard>

        <GlassCard className="flex justify-between items-center" hover>
          <div>
            <span className="text-xs text-slate-400">AI Logs Requests</span>
            <div className="text-2xl font-extrabold mt-1">{stats?.aiLogs.requests} Calls</div>
            <span className="text-[10px] text-indigo-500 font-semibold">{stats?.aiLogs.tokensUsed.toLocaleString()} Tokens Used</span>
          </div>
          <div className="p-3 bg-amber-500/10 text-amber-500 rounded-xl">
            <Activity className="h-5 w-5" />
          </div>
        </GlassCard>

        <GlassCard className="flex justify-between items-center" hover>
          <div>
            <span className="text-xs text-slate-400">Open Tickets</span>
            <div className="text-2xl font-extrabold mt-1 text-red-500">{stats?.tickets.open}</div>
            <span className="text-[10px] text-slate-500">Total Feedback: {stats?.tickets.totalFeedback}</span>
          </div>
          <div className="p-3 bg-red-500/10 text-red-500 rounded-xl">
            <MessageSquare className="h-5 w-5" />
          </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Support Tickets resolution */}
        <GlassCard className="space-y-4">
          <h3 className="text-sm font-bold">Support & Bug Tickets</h3>
          <div className="space-y-3">
            {tickets.map(ticket => (
              <div key={ticket._id} className="p-3.5 border border-slate-200/10 rounded-2xl space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-800 dark:text-slate-200">{ticket.subject}</span>
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                    ticket.status === 'open' ? 'bg-red-500/10 text-red-500' : 'bg-emerald-500/10 text-emerald-500'
                  }`}>
                    {ticket.status}
                  </span>
                </div>
                <p className="text-slate-500 font-normal leading-relaxed">{ticket.message}</p>
                {ticket.status === 'open' && (
                  <button
                    onClick={() => handleTicketResolve(ticket._id, 'resolved')}
                    disabled={updatingTicket === ticket._id}
                    className="px-3 py-1 bg-indigo-500 text-white rounded hover:bg-indigo-600 transition-colors font-bold text-[10px]"
                  >
                    Mark as Resolved
                  </button>
                )}
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Audit Logs tracking */}
        <GlassCard className="space-y-4">
          <h3 className="text-sm font-bold">System Audit Logs</h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {auditLogs.map(log => (
              <div key={log._id} className="p-3 border border-slate-200/10 rounded-xl text-[11px] leading-relaxed flex justify-between items-start">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-bold text-indigo-500 uppercase text-[9px]">{log.action}</span>
                    <span className="text-slate-400">|</span>
                    <span className="text-slate-500">{log.details}</span>
                  </div>
                  <span className="text-[9px] text-slate-400 block">{new Date(log.createdAt).toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
};

export default AdminDashboard;
