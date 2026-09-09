import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { User, Mail, Phone, Lock, Eye, EyeOff, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import Button from '../../components/common/Button';

export const PublicRegister = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('You must agree to the Terms & Conditions and Privacy Policy.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    try {
      await register(
        {
          fullName,
          email,
          phone,
          password,
        },
        ROLES.PUBLIC
      );
      navigate('/dashboard/public');
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="space-y-5 text-left">
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
            Public Registration
          </span>
        </div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Create Your Account
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Join BHOOMIVISION to explore land information, research, policies and maps.
        </p>
      </div>

      {error && (
        <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200">
          {error}
        </div>
      )}

      {/* Registration Form */}
      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Ratnadeep Nath"
              required
              className="bhoomi-input pl-10"
            />
          </div>
        </div>

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
            Mobile Number
          </label>
          <div className="relative">
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 43210"
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
              placeholder="At least 6 characters"
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

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter password"
              required
              className="bhoomi-input pl-10"
            />
          </div>
        </div>

        <div className="pt-1">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-700 shrink-0"
            />
            <span>
              I agree to the{' '}
              <a href="#terms" className="text-emerald-800 underline font-medium">
                Terms & Conditions
              </a>{' '}
              and{' '}
              <a href="#privacy" className="text-emerald-800 underline font-medium">
                Privacy Policy
              </a>
              .
            </span>
          </label>
        </div>

        <Button
          type="submit"
          variant="primary"
          loading={loading}
          className="w-full text-sm font-semibold py-3 mt-2"
        >
          <span>Create Account</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </form>

      {/* Footer Option */}
      <div className="pt-3 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-500">
          Already have an account?{' '}
          <Link
            to="/auth/public/login"
            className="text-emerald-800 hover:underline font-bold"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default PublicRegister;
