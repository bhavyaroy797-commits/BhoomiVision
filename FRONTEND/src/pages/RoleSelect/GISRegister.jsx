import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { Mail, Lock, Eye, EyeOff, User, Building, MapPin, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Globe } from 'lucide-react';
import Button from '../../components/common/Button';

export const GISRegister = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agency: 'Survey of India / State GIS Cell',
    state: 'West Bengal',
    district: 'North 24 Parganas',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
    if (!formData.email.trim()) newErrors.email = 'Email is required.';
    if (!formData.password) newErrors.password = 'Password is required.';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match.';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const gisData = {
        fullName: formData.fullName,
        email: formData.email,
        organization: formData.agency,
        designation: 'GIS Field & Spatial Survey Officer',
        location: `${formData.district}, ${formData.state}`,
        verificationStatus: 'Verified Field Officer (Demo)',
      };

      await register(gisData, ROLES.GIS_OFFICER);
      setSubmitted(true);
    } catch (err) {
      setApiError(err.message || 'Registration failed.');
    }
  };

  return (
    <div className="space-y-6 text-left font-sans">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <Link
          to="/auth/gis/login"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800 hover:text-emerald-950 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to GIS Officer Login</span>
        </Link>
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-purple-900 bg-purple-50 px-2.5 py-1 rounded-md border border-purple-200">
          GIS REGISTRATION
        </span>
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Register GIS Officer Profile</h2>
        <p className="text-xs text-slate-600">Register as a Field & Spatial Survey Officer for BHOOMIVISION.</p>
      </div>

      {submitted ? (
        <div className="p-6 bg-purple-50 rounded-3xl border border-purple-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-900 text-white mx-auto flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-purple-100 text-purple-900 text-[10px] font-bold uppercase">
              Status: Verified Field Officer
            </span>
            <h3 className="text-xl font-extrabold text-slate-800">GIS Profile Configured!</h3>
            <p className="text-xs text-slate-600">Your account is ready to access the GIS Spatial Intelligence Workspace.</p>
          </div>
          <Button
            onClick={() => navigate('/dashboard/gis-expert')}
            variant="primary"
            className="w-full text-xs font-bold py-3 bg-purple-900 text-white rounded-xl"
          >
            Enter GIS Intelligence Workspace
          </Button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {apiError && <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl">{apiError}</div>}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
            <input
              type="text"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Rajesh Kumar"
              className="bhoomi-input text-xs"
            />
            {errors.fullName && <p className="text-[11px] text-red-600 mt-0.5">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="rajesh.kumar@surveyofindia.gov.in"
              className="bhoomi-input text-xs"
            />
            {errors.email && <p className="text-[11px] text-red-600 mt-0.5">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="bhoomi-input text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                className="bhoomi-input text-xs"
              />
            </div>
          </div>

          <Button type="submit" variant="primary" loading={loading} className="w-full text-xs font-bold py-3 bg-purple-900">
            Create GIS Officer Profile
          </Button>
        </form>
      )}
    </div>
  );
};

export default GISRegister;
