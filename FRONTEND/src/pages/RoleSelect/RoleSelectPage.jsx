import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { User, Search, MapPin, Building2, Settings, Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';

export const RoleSelectPage = () => {
  const navigate = useNavigate();
  const { selectRole, selectedRole, login, loading } = useAuth();

  const [email, setEmail] = useState('ratnadeepnath@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const rolesConfig = [
    {
      id: ROLES.PUBLIC,
      title: 'Public User',
      description: 'Explore general information, view maps and access basic research.',
      icon: User,
      bgColor: 'bg-emerald-100/80',
      iconColor: 'text-emerald-800',
      borderColor: 'border-emerald-500',
      radioColor: 'accent-emerald-700',
      activeBg: 'bg-emerald-50/80 border-emerald-600 ring-2 ring-emerald-600/20',
      available: true,
    },
    {
      id: ROLES.RESEARCHER,
      title: 'Researcher / Analyst',
      description: 'Access detailed research, datasets, reports and advanced analysis tools.',
      icon: Search,
      bgColor: 'bg-sky-100/80',
      iconColor: 'text-sky-800',
      borderColor: 'border-sky-500',
      radioColor: 'accent-sky-700',
      activeBg: 'bg-sky-50/80 border-sky-600 ring-2 ring-sky-600/20',
      available: false,
    },
    {
      id: ROLES.GIS_OFFICER,
      title: 'GIS Field Officer',
      description: 'Use spatial data, maps and field reporting tools for on-ground work.',
      icon: MapPin,
      bgColor: 'bg-purple-100/80',
      iconColor: 'text-purple-800',
      borderColor: 'border-purple-500',
      radioColor: 'accent-purple-700',
      activeBg: 'bg-purple-50/80 border-purple-600 ring-2 ring-purple-600/20',
      available: false,
    },
    {
      id: ROLES.GOVT_OFFICER,
      title: 'Govt. Officer / Policy Maker',
      description: 'Access policy documents, governance tools and decision support systems.',
      icon: Building2,
      bgColor: 'bg-amber-100/80',
      iconColor: 'text-amber-800',
      borderColor: 'border-amber-500',
      radioColor: 'accent-amber-700',
      activeBg: 'bg-amber-50/80 border-amber-600 ring-2 ring-amber-600/20',
      available: false,
    },
    {
      id: ROLES.ADMIN,
      title: 'System Admin',
      description: 'Manage users, data and platform settings.',
      icon: Settings,
      bgColor: 'bg-slate-100',
      iconColor: 'text-slate-700',
      borderColor: 'border-slate-400',
      radioColor: 'accent-slate-700',
      activeBg: 'bg-slate-50 border-slate-500 ring-2 ring-slate-500/20',
      available: false,
    },
  ];

  const handleRoleSelect = (roleId) => {
    selectRole(roleId);
    if (roleId === ROLES.PUBLIC) {
      navigate('/auth/public/login');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (selectedRole !== ROLES.PUBLIC) {
      setError('Only Public User authentication is currently active in this module.');
      return;
    }

    try {
      await login(email, password, ROLES.PUBLIC);
      navigate('/dashboard/public');
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-1 text-left">
        <div className="flex items-center gap-2">
          <User className="w-5 h-5 text-emerald-800" />
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Choose Your Role</h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-500">
          Select how you will use BHOOMIVISION
        </p>
      </div>

      {/* Role Selection List */}
      <div className="space-y-3">
        {rolesConfig.map((role) => {
          const IconComponent = role.icon;
          const isSelected = selectedRole === role.id;

          return (
            <div
              key={role.id}
              onClick={() => handleRoleSelect(role.id)}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isSelected
                  ? role.activeBg
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
              } ${!role.available && role.id !== ROLES.PUBLIC ? 'opacity-80' : ''}`}
            >
              <div className="flex items-center gap-3.5">
                <div
                  className={`w-10 h-10 rounded-full ${role.bgColor} ${role.iconColor} flex items-center justify-center shrink-0`}
                >
                  <IconComponent className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 text-sm">{role.title}</h3>
                    {role.id !== ROLES.PUBLIC && (
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                        Module Locked
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500 leading-snug mt-0.5">
                    {role.description}
                  </p>
                </div>
              </div>

              <input
                type="radio"
                name="roleSelection"
                checked={isSelected}
                onChange={() => handleRoleSelect(role.id)}
                className={`w-4 h-4 text-emerald-700 focus:ring-emerald-700 cursor-pointer shrink-0`}
              />
            </div>
          );
        })}
      </div>

      {/* Public User Sign In Section */}
      <div className="pt-2 border-t border-slate-100 space-y-4">
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span className="font-semibold text-slate-700">Public User Authentication</span>
          <Link
            to="/auth/public/login"
            className="text-emerald-800 hover:underline font-semibold"
          >
            Direct Login Page →
          </Link>
        </div>

        {error && (
          <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleLoginSubmit} className="space-y-3 text-left">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Email address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@domain.com"
                required
                className="bhoomi-input pl-10"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="bhoomi-input pl-10 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 cursor-pointer text-slate-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded text-emerald-700 focus:ring-emerald-700"
              />
              <span>Remember me</span>
            </label>
            <Link
              to="/auth/public/forgot-password"
              className="text-emerald-800 hover:underline font-medium"
            >
              Forgot password?
            </Link>
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full text-sm font-semibold"
          >
            <span>Login</span>
            <ArrowRight className="w-4 h-4" />
          </Button>

          <div className="relative my-3 text-center text-xs text-slate-400">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-3 text-slate-400">or</span>
          </div>

          <Link to="/auth/public/register" className="block w-full">
            <Button variant="outline" className="w-full text-xs font-semibold">
              <UserPlus className="w-4 h-4" />
              <span>Create New Account</span>
            </Button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RoleSelectPage;
