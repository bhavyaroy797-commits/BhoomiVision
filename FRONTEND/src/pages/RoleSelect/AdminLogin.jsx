import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck, Settings, Sparkles, Key } from 'lucide-react';
import Button from '../../components/common/Button';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('admin@bhoomivision.demo');
  const [password, setPassword] = useState('Admin@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Please enter your admin email address.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateForm()) return;

    try {
      await login(email, password, ROLES.ADMIN);
      navigate('/dashboard/admin');
    } catch (err) {
      setApiError(err.message || 'Authentication failed. Please check your admin credentials.');
    }
  };

  const handleFillDemo = () => {
    setEmail('admin@bhoomivision.demo');
    setPassword('Admin@123');
    setErrors({});
  };

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Header Link */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>← Back to BHOOMIVISION</span>
        </Link>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-slate-800 bg-slate-100 px-2.5 py-1 rounded-md border border-slate-300">
          SYSTEM ADMIN PORTAL
        </span>
      </div>

      {/* Main Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-slate-800 flex items-center justify-center text-slate-100">
            <Settings className="w-3.5 h-3.5" />
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-slate-200 text-slate-900 text-[11px] font-bold tracking-wide uppercase">
            System Admin Access
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">System Admin Login</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Sign in to manage platform users, role permissions, datasets, GIS layers, AI monitoring, and audit logs.
        </p>
      </div>

      {/* Demo Credentials Alert */}
      <div className="p-3.5 bg-slate-100/90 rounded-2xl border border-slate-300 space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-slate-900 flex items-center gap-1.5 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-slate-700" />
            <span>Demo Super Admin Account</span>
          </span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[10px] text-slate-900 font-bold hover:underline bg-white px-2 py-0.5 rounded border border-slate-300"
          >
            Auto-fill
          </button>
        </div>
        <p className="text-[11px] text-slate-900 font-mono">
          <strong>Email:</strong> admin@bhoomivision.demo <br />
          <strong>Password:</strong> Admin@123
        </p>
      </div>

      {apiError && (
        <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200 font-medium">
          {apiError}
        </div>
      )}

      {/* Login Form */}
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Admin Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@bhoomivision.gov.in"
              className={`bhoomi-input pl-10 text-xs ${
                errors.email ? 'border-red-500 focus:ring-red-200' : ''
              }`}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`bhoomi-input pl-10 pr-10 text-xs ${
                errors.password ? 'border-red-500 focus:ring-red-200' : ''
              }`}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
              title={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-[11px] text-red-600 font-medium">{errors.password}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-xs pt-1">
          <label className="flex items-center gap-2 cursor-pointer text-slate-600">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="rounded text-slate-800 focus:ring-slate-800"
            />
            <span>Remember me</span>
          </label>
          <Link
            to="/auth/admin/forgot-password"
            className="text-slate-800 hover:underline font-semibold"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
          className="w-full text-xs font-bold py-3 bg-slate-900 hover:bg-slate-950 text-white rounded-xl shadow-md transition-all"
        >
          <span>{loading ? 'Authenticating Admin…' : 'Sign In as Admin'}</span>
          {!loading && <ArrowRight className="w-4 h-4" />}
        </Button>
      </form>

      {/* Restricted Info Notice */}
      <div className="pt-4 border-t border-slate-100 text-center space-y-3">
        <p className="text-xs text-slate-500 italic">
          🔒 Admin registration is restricted to authorized platform administrators.
        </p>

        <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-slate-800" />
          <span>Role-Based Security • System Admin Control Panel</span>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
