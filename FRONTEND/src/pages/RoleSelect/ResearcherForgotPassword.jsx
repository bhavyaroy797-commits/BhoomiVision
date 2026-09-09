import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Mail, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, Search } from 'lucide-react';
import Button from '../../components/common/Button';

export const ResearcherForgotPassword = () => {
  const navigate = useNavigate();
  const { forgotPassword } = useState(false);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid institutional email address.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="space-y-6 text-left font-sans">
      {/* Header Link */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <Link
          to="/auth/researcher/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Researcher Login</span>
        </Link>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
          PASSWORD RECOVERY
        </span>
      </div>

      {/* Main Content */}
      <div className="space-y-1">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#064e3b] flex items-center justify-center text-emerald-300">
            <Search className="w-3.5 h-3.5" />
          </div>
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#064e3b] text-[11px] font-bold tracking-wide uppercase">
            Researcher Access Recovery
          </span>
        </div>
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Reset Your Password</h2>
        <p className="text-xs text-slate-600 leading-relaxed">
          Enter your registered institutional email to receive password reset instructions.
        </p>
      </div>

      {submitted ? (
        <div className="p-5 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-center space-y-3">
          <div className="w-10 h-10 rounded-full bg-[#064e3b] text-emerald-300 mx-auto flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h4 className="font-bold text-slate-800 text-sm">Instructions Requested</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              If an account with <strong>{email}</strong> exists in our system, password reset instructions have been sent.
            </p>
          </div>
          <Link to="/auth/researcher/login" className="block pt-2">
            <Button variant="primary" className="w-full text-xs font-bold py-2.5 bg-[#064e3b]">
              Return to Researcher Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {error && (
            <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200 font-medium">
              {error}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Institutional Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="researcher@institution.edu.in"
                className="bhoomi-input pl-10 text-xs"
              />
            </div>
          </div>

          <Button
            type="submit"
            variant="primary"
            loading={loading}
            disabled={loading}
            className="w-full text-xs font-bold py-3 bg-[#064e3b] hover:bg-[#043e2f] text-white rounded-xl shadow-md"
          >
            <span>{loading ? 'Sending Request...' : 'Send Reset Link'}</span>
            {!loading && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>
      )}

      {/* Security UX */}
      <div className="pt-4 border-t border-slate-100 text-center">
        <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-medium bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
          <span>Role-Based Access • Secure Reset Protocol</span>
        </div>
      </div>
    </div>
  );
};

export default ResearcherForgotPassword;
