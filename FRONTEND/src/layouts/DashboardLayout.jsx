import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Topbar from '../components/layout/Topbar';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex bg-[#f4f7f5] font-sans antialiased text-slate-800 relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Workspace Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto relative">
        {/* Full Page Background Image (scarch.jpeg) */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-20 pointer-events-none z-0"
          style={{ backgroundImage: `url('/FRONTEND/Public/assets/image/scarch.jpeg')` }}
        />
        <div className="relative z-10 flex flex-col min-h-screen">
          <Topbar />
          <main className="flex-1 p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
