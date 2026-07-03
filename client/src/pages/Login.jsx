import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import { LogIn, Key, Mail, ShieldAlert, Loader2 } from 'lucide-react';
import Footer from '../components/Footer';
import BackButton from '../components/BackButton';

const Login = () => {
  const { user, login, googleLogin } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      const msg = err.message || 'Login failed. Please check your credentials.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    try {
      await googleLogin();
      navigate('/dashboard');
    } catch (err) {
      setError(err.message || 'Google Sign-In failed.');
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
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -z-10 h-64 w-64 rounded-full bg-purple-500/10 blur-[80px]"></div>

        <GlassCard className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight">Welcome Back</h2>
            <p className="text-xs text-slate-400">Log in to resume your placement preparation.</p>
          </div>

          {error && (
            <div className="flex items-center space-x-2.5 bg-red-500/10 border border-red-500/20 text-red-500 p-3.5 rounded-xl text-xs">
              <ShieldAlert className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-xl text-xs font-bold hover:opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <LogIn className="h-4 w-4" />}
              <span>{loading ? 'Logging In...' : 'Log In'}</span>
            </button>
          </form>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200/10"></div>
            <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-bold uppercase">Or Continue With</span>
            <div className="flex-grow border-t border-slate-200/10"></div>
          </div>

          <button
            onClick={handleGoogleLogin}
            disabled={loading}
            className="w-full flex items-center justify-center space-x-2 py-2.5 glass-panel hover:bg-indigo-500/10 border border-slate-200/10 rounded-xl text-xs font-bold transition-all"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" className="h-4 w-4" />}
            <span>{loading ? 'Signing In...' : 'Google Account'}</span>
          </button>

          <p className="text-center text-xs text-slate-400 pt-2">
            New here?{' '}
            <Link to="/signup" className="text-indigo-500 hover:underline font-semibold">
              Create an Account
            </Link>
          </p>
        </GlassCard>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
