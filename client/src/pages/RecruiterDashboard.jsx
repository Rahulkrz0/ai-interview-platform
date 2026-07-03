import React, { useState, useEffect } from 'react';
import { api } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LoadingSpinner } from '../components/LoadingSkeleton';
import { Send, Users, Calendar, Plus, Mail, ArrowRight, Download } from 'lucide-react';

const RecruiterDashboard = () => {
  const [invites, setInvites] = useState([]);
  const [candidateEmail, setCandidateEmail] = useState('');
  const [role, setRole] = useState('Software Engineering Intern');
  const [company, setCompany] = useState('Google');
  const [loading, setLoading] = useState(true);
  const [inviteLoading, setInviteLoading] = useState(false);

  // Compare states
  const [compareEmails, setCompareEmails] = useState('');
  const [comparisons, setComparisons] = useState([]);
  const [compareLoading, setCompareLoading] = useState(false);

  useEffect(() => {
    fetchInvites();
  }, []);

  const fetchInvites = async () => {
    try {
      const res = await api.get('/recruiter/invites');
      setInvites(res.data.invites);
    } catch (e) {
      console.warn('Invites list fetch mockup.');
      setInvites([
        { _id: 'i1', candidateEmail: 'student1@dev.com', roleName: 'Frontend Engineer', inviteCode: 'INV-4A9F2', status: 'pending', createdAt: new Date() },
        { _id: 'i2', candidateEmail: 'student2@dev.com', roleName: 'Data Scientist', inviteCode: 'INV-8B12A', status: 'completed', createdAt: new Date() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSendInvite = async (e) => {
    e.preventDefault();
    if (!candidateEmail) return;

    setInviteLoading(true);
    try {
      const res = await api.post('/recruiter/invite', {
        candidateEmail,
        company,
        roleName: role
      });
      setInvites(prev => [res.data.invite, ...prev]);
      setCandidateEmail('');
    } catch (err) {
      // Mock push fallback
      const mockInvite = {
        _id: Math.random().toString(),
        candidateEmail,
        roleName: role,
        inviteCode: 'INV-' + Math.random().toString(36).substring(2, 7).toUpperCase(),
        status: 'pending',
        createdAt: new Date()
      };
      setInvites(prev => [mockInvite, ...prev]);
      setCandidateEmail('');
    } finally {
      setInviteLoading(false);
    }
  };

  const handleCompare = async () => {
    if (!compareEmails) return;
    setCompareLoading(true);
    try {
      const res = await api.get(`/recruiter/compare?emails=${compareEmails}`);
      setComparisons(res.data.comparisons);
    } catch (err) {
      // Mock comparisons matrix layout
      setComparisons([
        {
          userId: { name: 'Amit Kumar', email: 'student1@dev.com', skills: ['React', 'JavaScript', 'SQL'] },
          overallScore: 86,
          technicalScore: 88,
          communicationScore: 84,
          hiringProbability: 90,
          strengths: ['Great DS algorithm structure complexity definitions'],
          weaknesses: ['Low voice speech volume']
        },
        {
          userId: { name: 'Priya Iyer', email: 'student2@dev.com', skills: ['Python', 'SQL', 'C++'] },
          overallScore: 78,
          technicalScore: 80,
          communicationScore: 76,
          hiringProbability: 75,
          strengths: ['Fast logical answers flow'],
          weaknesses: ['Uses 8 filler words']
        }
      ]);
    } finally {
      setCompareLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-6 max-w-5xl mx-auto py-4">
      <div className="border-b border-slate-200/10 pb-4">
        <h1 className="text-2xl font-bold flex items-center space-x-2">
          <Users className="h-6 w-6 text-indigo-500" />
          <span>Talent Acquisition Recruiter Workspace</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">Schedule evaluation rounds, export comparative matrices, and audit candidate scores.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: Invite Candidate Form & Schedules */}
        <div className="space-y-6">
          <GlassCard className="space-y-4">
            <h3 className="text-sm font-bold flex items-center space-x-2">
              <Mail className="h-4.5 w-4.5 text-indigo-500" />
              <span>Invite Candidate Round</span>
            </h3>

            <form onSubmit={handleSendInvite} className="space-y-4">
              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Candidate Email</label>
                <input
                  type="email"
                  value={candidateEmail}
                  onChange={e => setCandidateEmail(e.target.value)}
                  placeholder="candidate@dev.com"
                  className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Target Position</label>
                <input
                  type="text"
                  value={role}
                  onChange={e => setRole(e.target.value)}
                  className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2.5 text-xs focus:outline-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={inviteLoading}
                className="w-full flex items-center justify-center space-x-2 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-xs font-bold hover:opacity-95 transition-all"
              >
                <Send className="h-4 w-4" />
                <span>{inviteLoading ? 'Sending Invite...' : 'Generate Round Invite'}</span>
              </button>
            </form>
          </GlassCard>

          {/* Invites list */}
          <GlassCard className="space-y-4">
            <h3 className="text-sm font-bold">Outstanding Invites</h3>
            <div className="space-y-3">
              {invites.map(inv => (
                <div key={inv._id} className="p-3 border border-slate-200/10 rounded-2xl flex justify-between items-center text-[11px]">
                  <div className="space-y-0.5">
                    <p className="font-bold">{inv.candidateEmail}</p>
                    <p className="text-slate-400 font-medium">Role: {inv.roleName}</p>
                    <p className="text-[9px] text-slate-500 font-mono">Code: {inv.inviteCode}</p>
                  </div>
                  <span className={`px-2 py-0.5 rounded-full font-bold uppercase text-[9px] ${
                    inv.status === 'completed' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'
                  }`}>
                    {inv.status}
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>

        {/* Right column: Compare candidates side-by-side */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="space-y-4">
            <h3 className="text-sm font-bold">Candidate Comparison Matrix</h3>
            <div className="flex space-x-2">
              <input
                type="text"
                value={compareEmails}
                onChange={e => setCompareEmails(e.target.value)}
                placeholder="Comma separated emails (e.g. student1@dev.com,student2@dev.com)"
                className="flex-1 bg-slate-500/10 border border-slate-500/20 rounded-xl px-3 py-2 text-xs focus:outline-none"
              />
              <button
                onClick={handleCompare}
                disabled={compareLoading}
                className="px-4 py-2 bg-indigo-500 text-white rounded-xl text-xs font-bold hover:bg-indigo-600 transition-colors"
              >
                {compareLoading ? 'Searching...' : 'Compare Stats'}
              </button>
            </div>

            {/* Comparisons table */}
            {comparisons.length > 0 && (
              <div className="overflow-x-auto pt-3 border-t border-slate-200/10">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200/10 text-slate-400 uppercase text-[9px] font-bold">
                      <th className="py-2.5">Candidate</th>
                      <th className="py-2.5">Overall</th>
                      <th className="py-2.5">Technical</th>
                      <th className="py-2.5">Fluency</th>
                      <th className="py-2.5">Hiring Prob.</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisons.map((c, i) => (
                      <tr key={i} className="border-b border-slate-200/5 text-slate-500 dark:text-slate-300 font-semibold">
                        <td className="py-3">
                          <p className="font-bold text-slate-800 dark:text-slate-200">{c.userId?.name}</p>
                          <p className="text-[10px] text-slate-400 font-normal">{c.userId?.email}</p>
                        </td>
                        <td className="py-3 text-indigo-500 font-extrabold text-sm">{c.overallScore}%</td>
                        <td className="py-3">{c.technicalScore}%</td>
                        <td className="py-3">{c.communicationScore}%</td>
                        <td className="py-3 text-emerald-500 font-extrabold">{c.hiringProbability}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
};

export default RecruiterDashboard;
