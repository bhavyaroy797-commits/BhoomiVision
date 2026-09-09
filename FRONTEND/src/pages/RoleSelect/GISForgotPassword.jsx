import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowRight, ArrowLeft, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import Button from '../../components/common/Button';

export const GISForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <Link
          to="/auth/gis/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to GIS Login</span>
        </Link>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
          RECOVERY
        </span>
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Reset Password</h2>
        <p className="text-xs text-slate-600">Enter your GIS Officer email to receive reset instructions.</p>
      </div>

      {submitted ? (
        <div className="p-5 bg-purple-50 rounded-2xl border border-purple-200 text-center space-y-3 text-xs">
          <CheckCircle2 className="w-8 h-8 text-purple-900 mx-auto" />
          <p>If an account with <strong>{email}</strong> exists, password reset instructions have been sent.</p>
          <Link to="/auth/gis/login" className="block pt-2">
            <Button variant="primary" className="w-full text-xs font-bold py-2 bg-purple-900">
              Back to GIS Login
            </Button>
          </Link>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">GIS Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="gis.officer@surveyofindia.gov.in"
              className="bhoomi-input text-xs"
              required
            />
          </div>
          <Button type="submit" variant="primary" loading={loading} className="w-full text-xs font-bold py-3 bg-purple-900">
            Send Reset Link
          </Button>
        </form>
      )}
    </div>
  );
};

export default GISForgotPassword;
