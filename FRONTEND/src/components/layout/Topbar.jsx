import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Search, Bell, Sun, Moon, LogOut, User, Shield } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Topbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/auth/public/login');
  };

  return (
    <header className="h-16 bg-white border-b border-emerald-900/10 px-6 flex items-center justify-between sticky top-0 z-20 shadow-xs">
      {/* Search Input Bar */}
      <div className="w-full max-w-xl">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          <input
            type="text"
            placeholder="Search for land, policies, research, or ask a question..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-700/30 focus:border-emerald-700 transition-all"
          />
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Notifications"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white">
            3
          </span>
        </button>

        {/* Theme Toggle */}
        <button
          type="button"
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors"
          title="Toggle Light/Dark Theme"
        >
          {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-slate-600" />}
        </button>

        {/* User Profile Menu */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2.5 p-1 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <div className="w-9 h-9 rounded-full bg-emerald-800 text-white flex items-center justify-center font-bold text-sm border-2 border-emerald-600 shadow-xs">
              {user?.name ? user.name.charAt(0) : 'P'}
            </div>
            <span className="hidden md:inline-block text-xs font-semibold text-slate-700">
              {user?.name || 'Public User'}
            </span>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 text-left">
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-bold text-slate-800">{user?.name || 'Public User'}</p>
                <p className="text-[11px] text-slate-500 truncate">{user?.email || 'ratnadeepnath@gmail.com'}</p>
                <span className="inline-block mt-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold uppercase">
                  Role: PUBLIC
                </span>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    setShowProfileMenu(false);
                    navigate('/profile');
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-50"
                >
                  <User className="w-4 h-4 text-emerald-800" />
                  <span>My Profile</span>
                </button>

                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;
