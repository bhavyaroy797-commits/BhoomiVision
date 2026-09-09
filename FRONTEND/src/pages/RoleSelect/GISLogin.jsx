import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck, MapPin, Sparkles, Globe } from 'lucide-react';
import Button from '../../components/common/Button';

export const GISLogin = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('gis.officer@bhoomivision.demo');
  const [password, setPassword] = useState('GIS@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Please enter your email address.';
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
      await login(email, password, ROLES.GIS_OFFICER);
      navigate('/dashboard/gis-expert');
    } catch (err) {
      setApiError(err.message || 'Authentication failed. Please check your GIS credentials.');
    }
  };

  const handleFillDemo = () => {
    setEmail('gis.officer@bhoomivision.demo');
    setPassword('GIS@123');
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
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
          GIS FIELD PORTAL
        </span>
      </div>

      {/* Main Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-purple-900 flex items-center justify-center text-purple-200">
            <MapPin className="w-3.5 h-3.5" />
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-purple-100 text-purple-900 text-[11px] font-bold tracking-wide uppercase">
            GIS Field Officer Access
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">GIS Field Officer Login</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Sign in to monitor land-use change, conduct spatial analysis, and verify on-ground field evidence across India.
        </p>
      </div>

      {/* Demo Credentials Alert */}
      <div className="p-3.5 bg-purple-50/80 rounded-2xl border border-purple-200/80 space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-purple-900 flex items-center gap-1.5 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-purple-700" />
            <span>Demo Account for Frontend Preview</span>
          </span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[10px] text-purple-900 font-bold hover:underline bg-white px-2 py-0.5 rounded border border-purple-300"
          >
            Auto-fill
          </button>
        </div>
        <p className="text-[11px] text-purple-900 font-mono">
          <strong>Email:</strong> gis.officer@bhoomivision.demo <br />
          <strong>Password:</strong> GIS@123
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
            GIS Officer Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="gis.officer@surveyofindia.gov.in"
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
              className="rounded text-purple-700 focus:ring-purple-700"
            />
            <span>Remember me</span>
          </label>
          <Link
            to="/auth/gis/forgot-password"
            className="text-purple-900 hover:underline font-semibold"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
          className="w-full text-xs font-bold py-3 bg-purple-900 hover:bg-purple-950 text-white rounded-xl shadow-md transition-all"
        >
          <span>{loading ? 'Signing in…' : 'Sign In'}</span>
          {!loading && <ArrowRight className="w-4 h-4" />}
        </Button>
      </form>

      {/* Footer Option */}
      <div className="pt-4 border-t border-slate-100 text-center space-y-3">
        <p className="text-xs text-slate-600">
          Need a GIS Field Officer account?{' '}
          <Link
            to="/auth/gis/register"
            className="text-purple-900 hover:underline font-bold"
          >
            Register GIS Account
          </Link>
        </p>

        <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-purple-800" />
          <span>Role-Based Access • Field Operations Studio</span>
        </div>
      </div>
    </div>
  );
};

export default GISLogin;
