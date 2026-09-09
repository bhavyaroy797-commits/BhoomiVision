import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Camera,
  FileText,
  Search,
  Map,
  Download,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  Sparkles,
  ShieldCheck,
  Key,
  Globe,
  Bell,
  Lock,
  LogOut,
  ChevronRight,
  X,
  CheckCircle2,
  Sliders,
  Settings,
  HelpCircle,
  Eye,
  Activity,
  Award,
} from 'lucide-react';
import Card from '../../components/common/Card';
import Button from '../../components/common/Button';

export const ProfilePage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  // Active Tab state
  const [activeTab, setActiveTab] = useState('Overview');

  // Edit Profile Modal state
  const [showEditModal, setShowEditModal] = useState(false);
  const [profileName, setProfileName] = useState(user?.name || 'Ratnadeep Nath');
  const [profileEmail, setProfileEmail] = useState(user?.email || 'ratnadeepnath@gmail.com');
  const [profilePhone, setProfilePhone] = useState(user?.phone || '+91 98765 43210');
  const [profileLocation, setProfileLocation] = useState(user?.location || 'Nadia, West Bengal');
  const [profileOrg, setProfileOrg] = useState(user?.organization || 'Adamas University');
  const [profileDesignation, setProfileDesignation] = useState(user?.designation || 'B.Tech CSE (AI & ML)');
  const [profileBio, setProfileBio] = useState(
    user?.bio || 'Passionate about land governance, GIS and using data for sustainable development.'
  );

  // Language & Preference State
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [selectedInterests, setSelectedInterests] = useState([
    'Land Use & Land Cover',
    'Land Disputes',
    'Agricultural Land',
    'Land Policy',
  ]);

  // Password Change State
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  // Saved Content State (Local State Demo)
  const [savedResearchList, setSavedResearchList] = useState([
    {
      id: 'res_01',
      title: 'Land Use Transformation in Nadia District (2015–2025)',
      location: 'Nadia, West Bengal',
      year: '2024',
      topic: 'LULC Change',
      savedDate: 'Yesterday',
    },
  ]);

  const [savedPoliciesList, setSavedPoliciesList] = useState([
    {
      id: 'pol_01',
      title: 'National Land Use Policy 2019 Framework',
      category: 'Policy Documents',
      location: 'National',
      savedDate: '3 days ago',
    },
  ]);

  const [savedAreasList, setSavedAreasList] = useState([
    { id: 'area_01', name: 'Nadia, West Bengal', type: 'District Area', savedDate: '5 days ago' },
    { id: 'area_02', name: 'Agartala, Tripura', type: 'Municipal Area', savedDate: '1 week ago' },
  ]);

  const [savedReportsList, setSavedReportsList] = useState([
    {
      id: 'rep_01',
      title: 'Land Use Change Intelligence Report (2015-2025)',
      location: 'Nadia, West Bengal',
      period: '2015–2025',
      savedDate: '4 days ago',
    },
  ]);

  const allInterestsList = [
    'Land Use & Land Cover',
    'Land Disputes',
    'Land Acquisition',
    'Land Records',
    'Agricultural Land',
    'Rural Development',
    'Urban Development',
    'Land Policy',
    'Environment',
    'Climate & Disaster Impact',
  ];

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((i) => i !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!currentPass || !newPass) return;
    setPassSuccess('Password updated successfully!');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
    setTimeout(() => setPassSuccess(''), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('/auth/public/login');
  };

  return (
    <div className="space-y-8 text-left pb-12 font-sans">
      {/* 1. HEADER / BREADCRUMB WITH QUOTE (EXACT MATCH FOR IMAGE 1 MOCKUP) */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
          <Link to="/dashboard/public" className="hover:underline">Home</Link>
          <span className="text-slate-400">/</span>
          <span className="text-slate-600 font-normal">Profile</span>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#064e3b] via-[#047857] to-[#0f766e] p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 text-xs font-semibold backdrop-blur-sm">
              <User className="w-3.5 h-3.5 text-emerald-300" />
              <span>Public User Account</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
              My Profile
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Manage your personal information, preferences and activity.
            </p>
          </div>

          {/* Floating Quote Card (Matching Image 1 Mockup) */}
          <div className="bg-white/15 backdrop-blur-md p-4 rounded-2xl border border-white/20 max-w-xs text-right hidden sm:block shrink-0">
            <p className="text-xs italic font-medium text-emerald-100 leading-snug">
              "Data today for a sustainable tomorrow."
            </p>
            <div className="flex items-center justify-end gap-1 text-[11px] font-bold text-emerald-300 mt-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>My BHOOMIVISION</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. USER INFO HEADER CARD (EXACT MATCH FOR IMAGE 1 MOCKUP) */}
      <Card className="p-6 bg-white border-slate-200 shadow-sm rounded-3xl space-y-6">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          {/* Avatar & Personal Metadata Left */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-emerald-800 text-white font-extrabold text-3xl flex items-center justify-center border-4 border-emerald-100 shadow-md">
                {profileName ? profileName.charAt(0) : 'R'}
              </div>
              <button
                onClick={() => setShowEditModal(true)}
                className="absolute bottom-0 right-0 p-2 bg-[#064e3b] text-white rounded-full border-2 border-white shadow-sm hover:scale-105 transition-transform"
                title="Change Photo"
              >
                <Camera className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-1.5 text-left">
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">{profileName}</h2>
                <span className="px-3 py-0.5 rounded-full bg-emerald-100 text-emerald-900 text-xs font-bold border border-emerald-300">
                  Public User
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-medium">
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profileEmail}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profilePhone}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>{profileLocation}</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  <span>Joined on 12 Mar 2025</span>
                </span>
              </div>
            </div>
          </div>

          {/* Inspirational Quote Box Right (Matching Image 1 Mockup) */}
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200 max-w-sm text-left">
            <p className="text-xs text-emerald-950 font-medium italic leading-relaxed">
              "Exploring land data, driving better decisions for a sustainable future."
            </p>
          </div>
        </div>

        {/* Navigation Tabs (Overview, Personal Information, Preferences, Activity, Settings) */}
        <div className="flex items-center gap-2 border-t border-slate-100 pt-4 overflow-x-auto">
          {['Overview', 'Personal Information', 'Preferences', 'Activity', 'Settings'].map((tb) => (
            <button
              key={tb}
              onClick={() => setActiveTab(tb)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 ${
                activeTab === tb
                  ? 'bg-[#064e3b] text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tb}
            </button>
          ))}
        </div>
      </Card>

      {/* 3. QUICK STAT CARDS GRID (EXACT MATCH FOR IMAGE 1 MOCKUP) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 bg-white border-slate-200 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500">Total Reports Viewed</p>
            <p className="text-2xl font-extrabold text-slate-800">18</p>
            <p className="text-[10px] text-slate-400">Last 30 days →</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 bg-white border-slate-200 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500">Research Queries</p>
            <p className="text-2xl font-extrabold text-slate-800">24</p>
            <p className="text-[10px] text-slate-400">Last 30 days →</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
            <Search className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 bg-white border-slate-200 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500">Maps Explored</p>
            <p className="text-2xl font-extrabold text-slate-800">12</p>
            <p className="text-[10px] text-slate-400">Last 30 days →</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
            <Map className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 bg-white border-slate-200 flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-slate-500">Documents Downloaded</p>
            <p className="text-2xl font-extrabold text-slate-800">7</p>
            <p className="text-[10px] text-slate-400">Last 30 days →</p>
          </div>
          <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
            <Download className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* 4. MAIN 2-COLUMN WORKSPACE SECTION (PERSONAL INFO + RECENT ACTIVITY - EXACT MATCH FOR IMAGE 1) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: PERSONAL INFORMATION (6 COLS) */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="p-6 bg-white border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <User className="w-4 h-4 text-emerald-800" />
                <span>Personal Information</span>
              </h3>
              <Button
                onClick={() => setShowEditModal(true)}
                variant="outline"
                size="sm"
                className="text-xs font-semibold py-1 px-3 rounded-xl"
              >
                <Edit className="w-3.5 h-3.5" />
                <span>Edit</span>
              </Button>
            </div>

            <div className="space-y-3 text-xs text-slate-700">
              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Full Name</span>
                <span className="col-span-2 font-bold text-slate-800">{profileName}</span>
              </div>

              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Email Address</span>
                <span className="col-span-2 font-bold text-slate-800">{profileEmail}</span>
              </div>

              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Phone Number</span>
                <span className="col-span-2 font-bold text-slate-800">{profilePhone}</span>
              </div>

              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Location</span>
                <span className="col-span-2 font-bold text-slate-800">{profileLocation}</span>
              </div>

              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Role</span>
                <span className="col-span-2 font-bold text-emerald-800">Public User</span>
              </div>

              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Organization</span>
                <span className="col-span-2 font-bold text-slate-800">{profileOrg}</span>
              </div>

              <div className="grid grid-cols-3 py-1 border-b border-slate-100">
                <span className="text-slate-500 font-medium">Designation</span>
                <span className="col-span-2 font-bold text-slate-800">{profileDesignation}</span>
              </div>

              <div className="grid grid-cols-3 py-1">
                <span className="text-slate-500 font-medium">Bio</span>
                <span className="col-span-2 text-slate-600 leading-relaxed">{profileBio}</span>
              </div>
            </div>
          </Card>
        </div>

        {/* RIGHT COLUMN: RECENT ACTIVITY (6 COLS - EXACT MATCH FOR IMAGE 1) */}
        <div className="lg:col-span-6 space-y-4">
          <Card className="p-6 bg-white border-slate-200 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-800" />
                <span>Recent Activity</span>
              </h3>
              <span className="text-xs text-emerald-800 font-semibold cursor-pointer hover:underline">View All →</span>
            </div>

            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center shrink-0">
                  <FileText className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 text-xs space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800">Viewed Land Use Change Report</h4>
                    <span className="text-[10px] text-slate-400 font-medium">2 hours ago</span>
                  </div>
                  <p className="text-slate-500">Nadia District (2015–2025)</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center shrink-0">
                  <Search className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 text-xs space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800">Asked a question in Research</h4>
                    <span className="text-[10px] text-slate-400 font-medium">4 hours ago</span>
                  </div>
                  <p className="text-slate-500">How has agricultural land changed in Nadia?</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center shrink-0">
                  <Map className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 text-xs space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800">Explored GIS Map</h4>
                    <span className="text-[10px] text-slate-400 font-medium">6 hours ago</span>
                  </div>
                  <p className="text-slate-500">Land Use Land Cover – West Bengal</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                  <Download className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 text-xs space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800">Downloaded Report</h4>
                    <span className="text-[10px] text-slate-400 font-medium">1 day ago</span>
                  </div>
                  <p className="text-slate-500">Agricultural Productivity Report (2020–2024)</p>
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center shrink-0">
                  <BookOpen className="w-4.5 h-4.5" />
                </div>
                <div className="flex-1 text-xs space-y-0.5">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-800">Viewed Policy Document</h4>
                    <span className="text-[10px] text-slate-400 font-medium">1 day ago</span>
                  </div>
                  <p className="text-slate-500">National Land Use Policy 2019</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* 5. BOTTOM 3 CARDS ROW (PREFERENCES + CHANGE PASSWORD + QUICK LINKS - EXACT MATCH FOR IMAGE 1) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Preferences */}
        <Card className="p-5 bg-white border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h4 className="font-bold text-xs text-slate-800 uppercase flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-emerald-800" />
              <span>Preferences</span>
            </h4>
            <button onClick={() => setShowEditModal(true)} className="text-xs text-emerald-800 font-semibold hover:underline">
              Edit
            </button>
          </div>

          <div className="space-y-2 text-xs text-slate-700">
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Language</span>
              <span className="font-bold">{selectedLanguage}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Data Focus</span>
              <span className="font-bold">Agriculture, Land, Environment</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Notification</span>
              <span className="font-bold">Email & In-app</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Map Style</span>
              <span className="font-bold">Satellite + Hybrid</span>
            </div>
            <div className="flex justify-between py-1 border-b border-slate-100">
              <span className="text-slate-500">Theme</span>
              <span className="font-bold">Light Mode</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-slate-500">Preferred Reports</span>
              <span className="font-bold">PDF, Excel</span>
            </div>
          </div>
        </Card>

        {/* Card 2: Change Password */}
        <Card className="p-5 bg-white border-slate-200 space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase border-b border-slate-100 pb-2">
            <Lock className="w-4 h-4 text-emerald-800" />
            <span>Change Password</span>
          </div>

          {passSuccess && (
            <div className="p-2 text-xs bg-emerald-50 text-emerald-800 rounded-xl border border-emerald-200 font-semibold">
              {passSuccess}
            </div>
          )}

          <form onSubmit={handlePasswordUpdate} className="space-y-2.5 text-left text-xs">
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Current Password</label>
              <input
                type="password"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
                placeholder="Enter current password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">New Password</label>
              <input
                type="password"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
                placeholder="Enter new password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-0.5">Confirm Password</label>
              <input
                type="password"
                value={confirmPass}
                onChange={(e) => setConfirmPass(e.target.value)}
                placeholder="Confirm new password"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2 text-slate-800"
              />
            </div>

            <Button type="submit" variant="primary" className="w-full text-xs font-semibold py-2 rounded-xl mt-1">
              <Lock className="w-3.5 h-3.5" />
              <span>Update Password</span>
            </Button>
          </form>
        </Card>

        {/* Card 3: Quick Links */}
        <Card className="p-5 bg-white border-slate-200 space-y-4">
          <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 uppercase border-b border-slate-100 pb-2">
            <Globe className="w-4 h-4 text-emerald-800" />
            <span>Quick Links</span>
          </div>

          <div className="space-y-2 text-xs">
            <button className="w-full p-2 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 flex items-center justify-between font-semibold text-slate-700 hover:text-emerald-900 transition-colors">
              <span className="flex items-center gap-2">
                <Download className="w-4 h-4 text-slate-500" />
                <span>Download My Data</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button className="w-full p-2 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 flex items-center justify-between font-semibold text-slate-700 hover:text-emerald-900 transition-colors">
              <span className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-slate-500" />
                <span>Manage Notifications</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button className="w-full p-2 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 flex items-center justify-between font-semibold text-slate-700 hover:text-emerald-900 transition-colors">
              <span className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-slate-500" />
                <span>Help & Support</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button className="w-full p-2 bg-slate-50 hover:bg-emerald-50/60 rounded-xl border border-slate-200 flex items-center justify-between font-semibold text-slate-700 hover:text-emerald-900 transition-colors">
              <span className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-slate-500" />
                <span>Privacy Policy</span>
              </span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>

            <button
              onClick={handleLogout}
              className="w-full p-2 bg-red-50 hover:bg-red-100 rounded-xl border border-red-200 flex items-center justify-between font-bold text-red-600 transition-colors"
            >
              <span className="flex items-center gap-2">
                <LogOut className="w-4 h-4 text-red-500" />
                <span>Log Out</span>
              </span>
              <ChevronRight className="w-4 h-4 text-red-400" />
            </button>
          </div>
        </Card>
      </div>

      {/* 6. MY SAVED RESEARCH & POLICIES & AREAS WORKSPACE */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-800 flex items-center gap-2">
          <Bookmark className="w-4 h-4 text-emerald-800" />
          <span>My Saved Land Intelligence Workspace</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Saved Research Card */}
          <Card className="p-5 bg-white border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-xs text-slate-800">Saved Research ({savedResearchList.length})</span>
              <Link to="/research" className="text-xs text-emerald-800 font-semibold hover:underline">Explore →</Link>
            </div>

            {savedResearchList.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">No saved research papers yet.</p>
            ) : (
              savedResearchList.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                  <h5 className="font-bold text-slate-800">{item.title}</h5>
                  <p className="text-slate-500">{item.location} ({item.year})</p>
                  <div className="pt-1 flex items-center justify-between">
                    <Link to="/research" className="text-emerald-800 font-semibold hover:underline">View Research</Link>
                    <button onClick={() => setSavedResearchList([])} className="text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
              ))
            )}
          </Card>

          {/* Saved Policies Card */}
          <Card className="p-5 bg-white border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-xs text-slate-800">Saved Policies ({savedPoliciesList.length})</span>
              <Link to="/policy-innovation" className="text-xs text-emerald-800 font-semibold hover:underline">Explore →</Link>
            </div>

            {savedPoliciesList.length === 0 ? (
              <p className="text-xs text-slate-400 py-3 text-center">No saved policies yet.</p>
            ) : (
              savedPoliciesList.map((item) => (
                <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                  <h5 className="font-bold text-slate-800">{item.title}</h5>
                  <p className="text-slate-500">Category: {item.category}</p>
                  <div className="pt-1 flex items-center justify-between">
                    <Link to="/policy-innovation" className="text-emerald-800 font-semibold hover:underline">View Policy</Link>
                    <button onClick={() => setSavedPoliciesList([])} className="text-red-500 hover:underline">Remove</button>
                  </div>
                </div>
              ))
            )}
          </Card>

          {/* Saved Areas Card */}
          <Card className="p-5 bg-white border-slate-200 space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="font-bold text-xs text-slate-800">Saved Areas ({savedAreasList.length})</span>
              <Link to="/gis-maps" className="text-xs text-emerald-800 font-semibold hover:underline">Open GIS →</Link>
            </div>

            {savedAreasList.map((item) => (
              <div key={item.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1 text-xs">
                <h5 className="font-bold text-slate-800">{item.name}</h5>
                <p className="text-slate-500">{item.type}</p>
                <div className="pt-1 flex items-center justify-between">
                  <Link to="/gis-maps" className="text-emerald-800 font-semibold hover:underline">View on Map</Link>
                  <button
                    onClick={() => setSavedAreasList(savedAreasList.filter((a) => a.id !== item.id))}
                    className="text-red-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </Card>
        </div>
      </div>

      {/* EDIT PROFILE MODAL */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 text-left shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-lg text-slate-800">Edit Profile</h3>
              <button onClick={() => setShowEditModal(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={profileName}
                  onChange={(e) => setProfileName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={profileEmail}
                  onChange={(e) => setProfileEmail(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-semibold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Location</label>
                <input
                  type="text"
                  value={profileLocation}
                  onChange={(e) => setProfileLocation(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 font-semibold"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
              <Button onClick={() => setShowEditModal(false)} variant="ghost" className="text-xs rounded-xl">
                Cancel
              </Button>
              <Button onClick={() => setShowEditModal(false)} variant="primary" className="text-xs rounded-xl">
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
