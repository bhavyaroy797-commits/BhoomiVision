import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import {
  Home,
  Search,
  Building2,
  MapPin,
  Map,
  FileText,
  User,
  LogOut,
  Leaf,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export const Sidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/dashboard/public', icon: Home },
    { name: 'Research', path: '/research', icon: Search },
    { name: 'Policy Innovation', path: '/policy-innovation', icon: Building2 },
    { name: 'Land Governance', path: '/land-governance', icon: MapPin },
    { name: 'GIS & Maps', path: '/gis-maps', icon: Map },
    { name: 'Reports', path: '/reports', icon: FileText },
    { name: 'Profile', path: '/profile', icon: User },
  ];

  const handleLogout = () => {
    logout();
    navigate('/auth/public/login');
  };

  return (
    <aside className="w-64 bg-[#064e3b] text-white flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-emerald-900/40 select-none z-30 shadow-xl">
      {/* Brand Header */}
      <div className="p-5 border-b border-emerald-800/40">
        <div className="flex items-center gap-3">
          <img
            src="/FRONTEND/Public/assets/image/logo.jpeg"
            alt="BHOOMIVISION Logo"
            className="w-10 h-10 rounded-xl object-contain shadow-md shrink-0 border border-emerald-500/30 bg-white"
          />
          <div className="min-w-0">
            <h1 className="text-base font-extrabold tracking-tight text-white leading-tight truncate">
              BHOOMIVISION
            </h1>
            <p className="text-[10px] font-medium text-emerald-300 tracking-wide truncate">
              Land Insights for a Better Tomorrow
            </p>
          </div>
        </div>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all group ${
                  isActive
                    ? 'bg-emerald-700/90 text-white shadow-sm font-bold border-l-4 border-emerald-300'
                    : 'text-emerald-100/80 hover:bg-emerald-800/50 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Illustration & Slogan Box */}
      <div className="p-4 space-y-3 border-t border-emerald-800/40 bg-emerald-950/40">
        <div className="p-3 bg-emerald-900/60 rounded-xl border border-emerald-800/60 text-left space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-300">
            <Leaf className="w-3.5 h-3.5" />
            <span>Public Intelligence Portal</span>
          </div>
          <p className="text-[11px] text-emerald-100/70 leading-relaxed italic">
            "Better Insights • Better Decisions • Sustainable Land"
          </p>
        </div>

        {/* User Mini Bar & Logout */}
        <div className="flex items-center justify-between pt-1 text-xs">
          <div className="flex items-center gap-2 truncate">
            <div className="w-7 h-7 rounded-full bg-emerald-800 flex items-center justify-center font-bold text-white shrink-0 text-xs border border-emerald-600">
              {user?.name ? user.name.charAt(0) : 'P'}
            </div>
            <div className="truncate text-left">
              <p className="font-semibold text-white truncate text-[12px]">{user?.name || 'Public User'}</p>
              <p className="text-[10px] text-emerald-300/80 uppercase font-semibold">PUBLIC</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 rounded-lg hover:bg-emerald-800/80 text-emerald-200 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
