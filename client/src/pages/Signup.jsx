import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { UserPlus, Mail, Key, User, ShieldAlert } from 'lucide-react';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const Signup = () => {
  const { user, signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signup(name, email, password, role);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Registration failed. Try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-between relative">
      <div className="absolute top-6 left-6 z-50">
        <BackButton />
      </div>
      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 h-64 w-64 rounded-full bg-indigo-500/10 blur-[80px]"></div>

        <GlassCard className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Create Account</h2>
            <p className="text-xs text-slate-400">Join our gamified placement prep ecosystem.</p>
          </div>

          {error && (
            <div className="flex items-center space-x-2.5 bg-red-500/10 border border-red-500/20 text-red-500 p-3.5 rounded-xl text-xs">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-xs font-semibold block mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1">Password</label>
              <div className="relative">
                <Key className="absolute left-3.5 top-3.5 h-4.5 w-4.5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-500/10 border border-slate-500/20 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold block mb-1.5">Select Account Role</label>
              <div className="grid grid-cols-3 gap-2">
                {['student', 'recruiter', 'admin'].map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                      role === r
                        ? 'bg-indigo-500 border-indigo-500 text-white shadow-md'
                        : 'glass-panel border-slate-200/10 hover:bg-indigo-500/10 text-slate-400'
                    }`}
                  >
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-xs font-bold hover:opacity-95 disabled:opacity-50 transition-all"
            >
              <UserPlus className="h-4 w-4" />
              <span>{loading ? 'Creating Account...' : 'Sign Up'}</span>
            </button>
          </form>

          <p className="text-center text-xs text-slate-400 pt-2">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-500 hover:underline font-semibold">
              Log In
            </Link>
          </p>
        </GlassCard>
      </div>
      <Footer />
    </div>
  );
};

export default Signup;
