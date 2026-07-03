import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import BackButton from '../components/BackButton';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto px-6 py-6 bg-slate-500/5 space-y-4">
          <div className="flex justify-start">
            <BackButton />
          </div>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
