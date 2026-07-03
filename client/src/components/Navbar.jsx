import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, api } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon, Bell, LogOut, User, Award, CheckCircle, MessageSquare } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [notifications, setNotifications] = useState([]);
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchNotifications();
    }
  }, [user]);

  const fetchNotifications = async () => {
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data.notifications);
    } catch (err) {
      console.warn('Could not load notifications:', err.message);
    }
  };

  const markAllRead = async () => {
    try {
      await api.post('/notifications/read');
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <header className="glass-panel sticky top-0 z-40 w-full border-b border-slate-200/20 px-6 py-4 flex items-center justify-between shadow-sm">
      {/* Brand Logo */}
      <Link to="/" className="flex items-center space-x-2 text-xl font-bold tracking-tight">
        <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">AI Prep</span>
      </Link>

      <div className="flex items-center space-x-4">
        {/* Feedback Link */}
        <Link
          to="/feedback"
          className="flex items-center space-x-1.5 px-3 py-1.5 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 rounded-xl text-xs font-semibold transition-all"
        >
          <MessageSquare className="h-4 w-4" />
          <span className="hidden sm:inline">Feedback</span>
        </Link>

        {/* Create Profile Link */}
        {user && (
          <Link
            to="/profile"
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-purple-500/10 hover:bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-xl text-xs font-semibold transition-all"
          >
            <User className="h-4 w-4" />
            <span className="hidden sm:inline font-bold">Create Profile</span>
          </Link>
        )}

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          title="Toggle Theme"
        >
          {theme === 'dark' ? <Sun className="h-5 w-5 text-amber-500" /> : <Moon className="h-5 w-5" />}
        </button>

        {user && (
          <>
            {/* Gamification Streak Display */}
            <div className="hidden sm:flex items-center space-x-2 bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 px-3.5 py-1.5 rounded-2xl text-sm font-semibold">
              <Award className="h-4 w-4" />
              <span>Lvl {user.level}</span>
              <span className="text-slate-400">|</span>
              <span>🔥 {user.streakCount} Day Streak</span>
            </div>

            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  setShowProfileDropdown(false);
                }}
                className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors relative"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-red-500 rounded-full animate-pulse"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-3 w-80 glass-panel rounded-2xl shadow-2xl border border-slate-200/20 p-4 z-50 animate-in fade-in slide-in-from-top-3 duration-250">
                  <div className="flex justify-between items-center pb-2 mb-2 border-b border-slate-200/10">
                    <h3 className="font-semibold text-sm">Notifications</h3>
                    {unreadCount > 0 && (
                      <button onClick={markAllRead} className="text-xs text-indigo-500 hover:underline">
                        Mark all as read
                      </button>
                    )}
                  </div>
                  <div className="max-h-60 overflow-y-auto space-y-2.5">
                    {notifications.length === 0 ? (
                      <div className="text-center py-6 text-slate-400 text-xs">No notifications yet.</div>
                    ) : (
                      notifications.map(notif => (
                        <div key={notif._id} className={`p-2.5 rounded-xl text-xs transition-colors ${notif.isRead ? 'opacity-70' : 'bg-indigo-500/5 border border-indigo-500/10'}`}>
                          <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center justify-between">
                            <span>{notif.title}</span>
                            {!notif.isRead && <span className="h-1.5 w-1.5 bg-indigo-500 rounded-full"></span>}
                          </div>
                          <p className="text-slate-500 dark:text-slate-400 mt-1">{notif.message}</p>
                          <span className="text-[10px] text-slate-400 mt-1 block">{new Date(notif.createdAt).toLocaleDateString()}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowProfileDropdown(!showProfileDropdown);
                  setShowNotifDropdown(false);
                }}
                className="flex items-center space-x-2 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                {user.photo ? (
                  <img src={user.photo} alt="Avatar" className="h-8 w-8 rounded-full object-cover border border-indigo-500/30" />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 mt-3 w-56 glass-panel rounded-2xl shadow-2xl border border-slate-200/20 p-2.5 z-50 animate-in fade-in slide-in-from-top-3 duration-250">
                  <div className="px-3.5 py-2.5 border-b border-slate-200/10">
                    <p className="font-semibold text-sm truncate">{user.name}</p>
                    <p className="text-xs text-slate-400 truncate">{user.email}</p>
                    <span className="text-[10px] uppercase tracking-wider bg-indigo-500/10 text-indigo-500 px-2 py-0.5 rounded-full font-bold mt-2 inline-block">
                      {user.role}
                    </span>
                  </div>
                  <div className="py-2 space-y-1">
                    <Link
                      to="/dashboard"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm hover:bg-indigo-500/10 hover:text-indigo-500 transition-all"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>My Dashboard</span>
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setShowProfileDropdown(false)}
                      className="flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm hover:bg-indigo-500/10 hover:text-indigo-500 transition-all"
                    >
                      <User className="h-4 w-4" />
                      <span>My Profile</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-2 px-3.5 py-2 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-all"
                    >
                      <LogOut className="h-4 w-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {!user && (
          <div className="flex items-center space-x-2">
            <Link to="/login" className="px-4 py-2 text-sm font-semibold hover:text-indigo-500 transition-colors">
              Log In
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl hover:shadow-lg hover:shadow-indigo-500/20 hover:opacity-95 transition-all"
            >
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
