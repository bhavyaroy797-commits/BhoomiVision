import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#f4f7f5] font-sans antialiased text-slate-800">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <Topbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
