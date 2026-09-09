import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { Mail, Lock, Eye, EyeOff, ArrowRight, UserPlus, ArrowLeft, ShieldCheck } from 'lucide-react';
import Button from '../../components/common/Button';

export const PublicLogin = () => {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState('ratnadeepnath@gmail.com');
  const [password, setPassword] = useState('password123');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password, ROLES.PUBLIC);
      navigate('/dashboard/public');
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your details.');
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Back Link */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Role Selection</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-[11px] font-bold tracking-wide uppercase">
            Public User
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">Welcome Back</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Sign in to explore India's land intelligence and governance platform.
        </p>
      </div>

      {error && (
        <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Email Address
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
          className="w-full text-sm font-semibold py-3"
        >
          <span>Sign In</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      {/* Footer Option */}
      <div className="pt-4 border-t border-slate-100 text-center space-y-3">
        <p className="text-xs text-slate-500">
          Don't have an account?{' '}
          <Link
            to="/auth/public/register"
            className="text-emerald-800 hover:underline font-bold"
          >
            Create Account
          </Link>
        </p>

        <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
          <span>Role restricted: Public User Portal</span>
        </div>
      </div>
    </div>
  );
};

export default PublicLogin;
