import React from 'react';

export const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const items = Array.from({ length: count });

  if (type === 'list') {
    return (
      <div className="space-y-4 w-full">
        {items.map((_, i) => (
          <div key={i} className="flex items-center space-x-4 animate-pulse">
            <div className="rounded-full bg-slate-300 dark:bg-slate-700 h-10 w-10"></div>
            <div className="flex-1 space-y-2 py-1">
              <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
              <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'detail') {
    return (
      <div className="max-w-5xl mx-auto py-6 px-4 space-y-6 w-full animate-pulse">
        <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-panel rounded-2xl p-6 md:p-8 space-y-4 h-64">
              <div className="flex space-x-2">
                <div className="h-5 w-16 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
                <div className="h-5 w-24 bg-slate-300 dark:bg-slate-700 rounded-full"></div>
              </div>
              <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-3/4"></div>
              <div className="space-y-2 pt-4">
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
                <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-4/6"></div>
              </div>
            </div>
            <div className="glass-panel rounded-2xl p-6 h-40 space-y-4">
              <div className="h-6 bg-slate-300 dark:bg-slate-700 rounded w-40"></div>
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="glass-panel rounded-2xl p-6 h-72 space-y-4">
              <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-32 mb-4"></div>
              <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
              <div className="h-10 bg-slate-300 dark:bg-slate-700 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
      {items.map((_, i) => (
        <div key={i} className="glass-panel animate-pulse rounded-2xl p-6 h-48 space-y-4">
          <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-2/3"></div>
          <div className="space-y-2">
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded"></div>
            <div className="h-3 bg-slate-300 dark:bg-slate-700 rounded w-5/6"></div>
          </div>
          <div className="pt-4 flex justify-between items-center">
            <div className="h-8 bg-slate-300 dark:bg-slate-700 rounded w-24"></div>
            <div className="h-4 bg-slate-300 dark:bg-slate-700 rounded w-12"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-full min-h-[200px]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
  </div>
);
