import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Do not render on the landing page
  if (location.pathname === '/') {
    return null;
  }

  // Check if there is a previous page in the session history stack
  const hasHistory = window.history.state && window.history.state.idx > 0;

  if (!hasHistory) {
    return null;
  }

  return (
    <button
      onClick={() => navigate(-1)}
      className="inline-flex items-center space-x-1.5 px-3 py-1.5 glass-panel border border-slate-200/10 hover:border-indigo-500/30 hover:bg-indigo-500/10 text-slate-600 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 rounded-xl text-xs font-bold transition-all shadow-sm hover:scale-105 duration-200 cursor-pointer shrink-0"
      title="Go Back"
    >
      <ArrowLeft className="h-3.5 w-3.5" />
      <span>Back</span>
    </button>
  );
};

export default BackButton;
