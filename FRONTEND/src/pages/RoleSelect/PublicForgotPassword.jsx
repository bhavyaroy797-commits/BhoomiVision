import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2, KeyRound } from 'lucide-react';
import Button from '../../components/common/Button';

export const PublicForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setLoading(true);

    try {
      const res = await forgotPassword(email);
      setSuccessMessage(res.message);
    } catch (err) {
      setErrorMessage(err.message || 'Failed to send reset link.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 text-left">
      {/* Top Back Link */}
      <div>
        <Link
          to="/auth/public/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Sign In</span>
        </Link>
      </div>

      {/* Header */}
      <div className="space-y-2">
        <div className="w-12 h-12 rounded-2xl bg-emerald-100/80 text-emerald-800 flex items-center justify-center">
          <KeyRound className="w-6 h-6" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 tracking-tight">
          Forgot Password?
        </h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          No worries! Enter your registered email address and we will send you a password reset link.
        </p>
      </div>

      {errorMessage && (
        <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200">
          {errorMessage}
        </div>
      )}

      {successMessage ? (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-3">
          <div className="flex items-center gap-2.5 text-emerald-900 font-bold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>Reset Link Sent</span>
          </div>
          <p className="text-xs text-emerald-800 leading-relaxed">
            {successMessage}
          </p>
          <p className="text-[11px] text-slate-500">
            Please check your inbox (and spam folder) for further instructions.
          </p>
          <div className="pt-2">
            <Link to="/auth/public/login">
              <Button variant="outline" className="w-full text-xs font-semibold">
                <span>Return to Sign In</span>
              </Button>
            </Link>
          </div>
        </div>
      ) : (
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

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            className="w-full text-sm font-semibold py-3"
          >
            <span>Send Reset Link</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </form>
      )}

      {/* Footer Option */}
      <div className="pt-4 border-t border-slate-100 text-center">
        <p className="text-xs text-slate-500">
          Remember your password?{' '}
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

export default PublicForgotPassword;
