import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { Mail, Lock, Eye, EyeOff, User, Building, MapPin, CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, Search, Sparkles, BookOpen, Layers, Check } from 'lucide-react';
import Button from '../../components/common/Button';

export const ResearcherRegister = () => {
  const navigate = useNavigate();
  const { register, loading } = useAuth();

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    institution: '',
    researchRole: 'Researcher',
    researchDomain: 'Land Use & Land Cover',
    otherDomain: '',
    state: 'West Bengal',
    district: 'Nadia',
    selectedInterests: ['Land Use', 'GIS', 'Land Governance'],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const domainOptions = [
    'Land Use & Land Cover',
    'Land Governance',
    'Land Records',
    'Land Acquisition',
    'Agriculture',
    'Urban Development',
    'Environmental Studies',
    'Climate & Disaster',
    'Land Policy',
    'GIS / Remote Sensing',
    'Land Economics',
    'Other',
  ];

  const roleOptions = [
    'Researcher',
    'Analyst',
    'Academic',
    'Policy Researcher',
    'GIS Analyst',
    'Other',
  ];

  const availableInterests = [
    'Land Use',
    'Agriculture',
    'Urbanization',
    'Land Governance',
    'Policy',
    'GIS',
    'Environment',
    'Climate',
    'Land Disputes',
    'Land Markets',
  ];

  const statesList = ['West Bengal', 'Gujarat', 'Karnataka', 'Maharashtra', 'Punjab', 'All India'];
  const districtsList = ['Nadia', 'Ahmedabad', 'Bengaluru Urban', 'Ahmednagar', 'All Districts'];

  const toggleInterest = (interest) => {
    if (formData.selectedInterests.includes(interest)) {
      setFormData({
        ...formData,
        selectedInterests: formData.selectedInterests.filter((item) => item !== interest),
      });
    } else {
      setFormData({
        ...formData,
        selectedInterests: [...formData.selectedInterests, interest],
      });
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required.';
      if (!formData.email.trim()) {
        newErrors.email = 'Institutional email is required.';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email format.';
      }
      if (!formData.password) {
        newErrors.password = 'Password is required.';
      } else if (formData.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters.';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match.';
      }
    } else if (step === 2) {
      if (!formData.institution.trim()) newErrors.institution = 'Institution or organization is required.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError('');

    if (!validateStep(1) || !validateStep(2)) {
      setCurrentStep(1);
      return;
    }

    try {
      const researcherData = {
        fullName: formData.fullName,
        email: formData.email,
        organization: formData.institution,
        designation: `${formData.researchRole} (${formData.researchDomain})`,
        location: `${formData.district}, ${formData.state}`,
        verificationStatus: 'Verified Researcher (Demo)',
        researchDomain: formData.researchDomain === 'Other' ? formData.otherDomain : formData.researchDomain,
        researchInterests: formData.selectedInterests,
      };

      await register(researcherData, ROLES.RESEARCHER);
      setCurrentStep(4);
    } catch (err) {
      setApiError(err.message || 'Registration failed. Please check your information.');
    }
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
          RESEARCH REGISTRATION
        </span>
      </div>

      {/* Title */}
      <div className="space-y-1">
        <h2 className="text-2xl font-extrabold text-slate-800 tracking-tight">Create Researcher Account</h2>
        <p className="text-xs text-slate-600">
          Join India's national land research & intelligence network.
        </p>
      </div>

      {/* Multi-step Progress Indicator */}
      <div className="grid grid-cols-4 gap-1.5 py-1">
        {[
          { step: 1, label: 'Profile' },
          { step: 2, label: 'Research' },
          { step: 3, label: 'Interests' },
          { step: 4, label: 'Complete' },
        ].map((item) => (
          <div key={item.step} className="space-y-1">
            <div
              className={`h-1.5 rounded-full transition-all ${
                currentStep >= item.step ? 'bg-[#064e3b]' : 'bg-slate-200'
              }`}
            />
            <span
              className={`text-[10px] font-bold block text-center ${
                currentStep >= item.step ? 'text-[#064e3b]' : 'text-slate-400'
              }`}
            >
              {item.step}. {item.label}
            </span>
          </div>
        ))}
      </div>

      {apiError && (
        <div className="p-3 text-xs bg-red-50 text-red-700 rounded-xl border border-red-200 font-medium">
          {apiError}
        </div>
      )}

      {/* Step 1: Basic Information */}
      {currentStep === 1 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Full Name <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Dr. Ananya Roy"
                className={`bhoomi-input pl-10 text-xs ${errors.fullName ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.fullName && <p className="mt-1 text-[11px] text-red-600">{errors.fullName}</p>}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Institutional Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ananya.roy@nirdpr.gov.in"
                className={`bhoomi-input pl-10 text-xs ${errors.email ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.email && <p className="mt-1 text-[11px] text-red-600">{errors.email}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className={`bhoomi-input pl-10 pr-9 text-xs ${errors.password ? 'border-red-500' : ''}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-slate-400"
                >
                  {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-[11px] text-red-600">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  placeholder="••••••••"
                  className={`bhoomi-input pl-10 text-xs ${errors.confirmPassword ? 'border-red-500' : ''}`}
                />
              </div>
              {errors.confirmPassword && <p className="mt-1 text-[11px] text-red-600">{errors.confirmPassword}</p>}
            </div>
          </div>

          <Button onClick={handleNext} variant="primary" className="w-full text-xs font-bold py-2.5 bg-[#064e3b] mt-2">
            <span>Continue to Research Profile</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}

      {/* Step 2: Research Profile */}
      {currentStep === 2 && (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Institution / Organization <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                placeholder="National Institute of Rural Development / University / Think Tank"
                className={`bhoomi-input pl-10 text-xs ${errors.institution ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.institution && <p className="mt-1 text-[11px] text-red-600">{errors.institution}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Research Role</label>
              <select
                value={formData.researchRole}
                onChange={(e) => setFormData({ ...formData, researchRole: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl text-xs p-2.5 text-slate-700 font-semibold"
              >
                {roleOptions.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Primary Research Domain</label>
              <select
                value={formData.researchDomain}
                onChange={(e) => setFormData({ ...formData, researchDomain: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl text-xs p-2.5 text-slate-700 font-semibold"
              >
                {domainOptions.map((d) => (
                  <option key={d} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          {formData.researchDomain === 'Other' && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Specify Domain</label>
              <input
                type="text"
                value={formData.otherDomain}
                onChange={(e) => setFormData({ ...formData, otherDomain: e.target.value })}
                placeholder="Custom research focus area..."
                className="bhoomi-input text-xs"
              />
            </div>
          )}

          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handlePrev} variant="outline" className="w-1/3 text-xs py-2.5">
              Back
            </Button>
            <Button onClick={handleNext} variant="primary" className="w-2/3 text-xs font-bold py-2.5 bg-[#064e3b]">
              <span>Next: Location & Interests</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 3: Location & Research Interests */}
      {currentStep === 3 && (
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="block text-xs font-semibold text-slate-700">Target Research Region</label>
            <p className="text-[11px] text-slate-500">Select your primary geographical region of research interest.</p>
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl text-xs p-2 text-slate-700 font-semibold"
                >
                  {statesList.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
              <div>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl text-xs p-2 text-slate-700 font-semibold"
                >
                  {districtsList.map((dst) => (
                    <option key={dst} value={dst}>{dst}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Select Research Interests (Multiple)</label>
            <div className="flex flex-wrap gap-1.5">
              {availableInterests.map((interest) => {
                const isSelected = formData.selectedInterests.includes(interest);
                return (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => toggleInterest(interest)}
                    className={`px-3 py-1 rounded-xl text-xs font-semibold border transition-all flex items-center gap-1 ${
                      isSelected
                        ? 'bg-[#064e3b] text-white border-[#064e3b]'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:border-emerald-500'
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3 text-emerald-300" />}
                    <span>{interest}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <Button onClick={handlePrev} variant="outline" className="w-1/3 text-xs py-2.5">
              Back
            </Button>
            <Button
              onClick={handleSubmit}
              variant="primary"
              loading={loading}
              className="w-2/3 text-xs font-bold py-2.5 bg-[#064e3b]"
            >
              <span>Complete Account Creation</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
            </Button>
          </div>
        </div>
      )}

      {/* Step 4: Confirmation & Verification Status */}
      {currentStep === 4 && (
        <div className="p-6 bg-emerald-50/80 rounded-3xl border border-emerald-200 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#064e3b] text-emerald-300 mx-auto flex items-center justify-center shadow-md">
            <CheckCircle2 className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-[#064e3b] text-[10px] font-bold uppercase tracking-wider">
              Verification Status: Demo Researcher
            </span>
            <h3 className="text-xl font-extrabold text-slate-800">Researcher Profile Ready!</h3>
            <p className="text-xs text-slate-600 leading-relaxed max-w-sm mx-auto">
              Your researcher profile has been configured for the BHOOMIVISION demo research workspace.
            </p>
          </div>

          <div className="p-3.5 bg-white rounded-2xl border border-emerald-200 text-left text-xs space-y-1 text-slate-700">
            <p><strong>Researcher:</strong> {formData.fullName || 'Dr. Ananya Roy'}</p>
            <p><strong>Organization:</strong> {formData.institution || 'National Institute of Rural Development'}</p>
            <p><strong>Domain:</strong> {formData.researchDomain}</p>
            <p><strong>Status:</strong> Verified Demo Access</p>
          </div>

          <Button
            onClick={() => navigate('/dashboard/researcher')}
            variant="primary"
            className="w-full text-xs font-bold py-3 bg-[#064e3b] hover:bg-[#043e2f] text-white rounded-xl shadow-md"
          >
            <span>Enter Researcher Workspace</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default ResearcherRegister;
