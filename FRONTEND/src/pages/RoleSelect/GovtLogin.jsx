import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { Mail, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, ShieldCheck, Building2, Sparkles, Scale } from 'lucide-react';
import Button from '../../components/common/Button';

export const GovtLogin = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('govt.officer@bhoomivision.demo');
  const [password, setPassword] = useState('Govt@123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Please enter your government email address.';
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
      await login(email, password, ROLES.GOVT_OFFICER);
      navigate('/dashboard/govt');
    } catch (err) {
      setApiError(err.message || 'Authentication failed. Please check your official credentials.');
    }
  };

  const handleFillDemo = () => {
    setEmail('govt.officer@bhoomivision.demo');
    setPassword('Govt@123');
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
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-900 bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
          GOVERNANCE & POLICY PORTAL
        </span>
      </div>

      {/* Main Title */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-amber-800 flex items-center justify-center text-amber-100">
            <Building2 className="w-3.5 h-3.5" />
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[11px] font-bold tracking-wide uppercase">
            Govt. Officer / Policy Maker Access
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Govt. Officer Login</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Sign in to access policy simulation, land governance intelligence, and evidence-based decision support systems.
        </p>
      </div>

      {/* Demo Credentials Alert */}
      <div className="p-3.5 bg-amber-50/80 rounded-2xl border border-amber-200/80 space-y-1.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="font-bold text-amber-900 flex items-center gap-1.5 text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Demo Account for Frontend Preview</span>
          </span>
          <button
            type="button"
            onClick={handleFillDemo}
            className="text-[10px] text-amber-900 font-bold hover:underline bg-white px-2 py-0.5 rounded border border-amber-300"
          >
            Auto-fill
          </button>
        </div>
        <p className="text-[11px] text-amber-900 font-mono">
          <strong>Email:</strong> govt.officer@bhoomivision.demo <br />
          <strong>Password:</strong> Govt@123
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
            Official Email Address <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="malini.banerjee@gov.in"
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
              className="rounded text-amber-700 focus:ring-amber-700"
            />
            <span>Remember me</span>
          </label>
          <Link
            to="/auth/govt/forgot-password"
            className="text-amber-900 hover:underline font-semibold"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          disabled={loading}
          className="w-full text-xs font-bold py-3 bg-amber-800 hover:bg-amber-900 text-white rounded-xl shadow-md transition-all"
        >
          <span>{loading ? 'Signing in…' : 'Sign In'}</span>
          {!loading && <ArrowRight className="w-4 h-4" />}
        </Button>
      </form>

      {/* Footer Option */}
      <div className="pt-4 border-t border-slate-100 text-center space-y-3">
        <p className="text-xs text-slate-600">
          Need a Government Officer account?{' '}
          <Link
            to="/auth/govt/register"
            className="text-amber-900 hover:underline font-bold"
          >
            Register Official Account
          </Link>
        </p>

        <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
          <span>Role-Based Access • Decision Support Studio</span>
        </div>
      </div>
    </div>
  );
};

export default GovtLogin;
