import React from 'react';

const GlassCard = ({ children, className = '', hover = false }) => {
  return (
    <div
      className={`glass-panel rounded-2xl p-6 shadow-xl transition-all duration-300 ${
        hover ? 'hover:translate-y-[-4px] hover:shadow-2xl hover:border-indigo-500/20' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;
