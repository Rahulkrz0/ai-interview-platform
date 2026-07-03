import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  LayoutDashboard, PlayCircle, Code, BookOpen, FileText, Compass,
  Award, MessageSquare, ShieldAlert, Users, Calendar, Sparkles
} from 'lucide-react';

const Sidebar = () => {
  const { user } = useAuth();
  
  if (!user) return null;

  // Student Links
  const studentLinks = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/interview', label: 'AI Interview', icon: PlayCircle },
    { to: '/coding', label: 'Coding Platform', icon: Code },
    { to: '/question-bank', label: 'Question Bank', icon: BookOpen },
    { to: '/resume-ats', label: 'Resume Analyzer', icon: FileText },
    { to: '/career-coach', label: 'AI Career Coach', icon: Compass },
    { to: '/gamification', label: 'XP & Leaderboard', icon: Award },
    { to: '/discussions', label: 'Community', icon: MessageSquare }
  ];

  // Recruiter Links
  const recruiterLinks = [
    { to: '/recruiter-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/recruiter-compare', label: 'Candidate Stats', icon: Users },
    { to: '/recruiter-schedule', label: 'Schedule Rounds', icon: Calendar }
  ];

  // Admin Links
  const adminLinks = [
    { to: '/admin-dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin-questions', label: 'Question Editor', icon: BookOpen },
    { to: '/admin-feedback', label: 'Feedback Logs', icon: MessageSquare },
    { to: '/admin-audit', label: 'Audit Logs', icon: ShieldAlert }
  ];

  let activeLinks = studentLinks;
  if (user.role === 'recruiter') activeLinks = recruiterLinks;
  if (user.role === 'admin') activeLinks = adminLinks;

  return (
    <aside className="w-64 glass-panel border-r border-slate-200/20 h-[calc(100vh-73px)] py-6 px-4 hidden md:flex flex-col justify-start shrink-0">
      <div className="space-y-2 overflow-y-auto pr-1 scrollbar-thin">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3.5 mb-3">
            Navigation Workspace
          </p>
          <nav className="space-y-1.5">
            {activeLinks.map(link => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center space-x-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/10'
                        : 'hover:bg-indigo-500/10 hover:text-indigo-500'
                    }`
                  }
                >
                  <Icon className="h-5 w-5" />
                  <span>{link.label}</span>
                </NavLink>
              );
            })}
          </nav>
        </div>

        {user.role === 'student' && (
          <div className="pt-2">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-3.5 mb-3">
              AI Tools Space
            </p>
            <nav className="space-y-1.5">
              <NavLink
                to="/ai-tools"
                className={({ isActive }) =>
                  `flex items-center space-x-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/10'
                      : 'hover:bg-indigo-500/10 hover:text-indigo-500'
                  }`
                }
              >
                <Sparkles className="h-5 w-5" />
                <span>AI Tools Center</span>
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
