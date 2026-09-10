import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, MapPin, FileText, CheckCircle2, Leaf, Youtube, Linkedin, Twitter, Database, Layers, Scale, ShieldCheck, Sparkles, Network } from 'lucide-react';

export const AuthLayout = () => {
  const location = useLocation();
  const isResearcherAuth = location.pathname.startsWith('/auth/researcher');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-emerald-950/5 via-emerald-900/5 to-slate-100 text-slate-800 relative overflow-x-hidden font-sans">
      {/* Background Decorative Landscape Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-85 pointer-events-none z-0"
        style={{
          backgroundImage: `url('/FRONTEND/Public/assets/image/scarch.jpeg')`,
        }}
      />
      {/* Light Glass Tint Overlay to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/70 via-white/40 to-white/60 pointer-events-none z-0 backdrop-blur-[1px]" />


      {/* TOP HEADER */}
      <header className="w-full bg-white/90 backdrop-blur-md border-b border-emerald-900/10 px-6 py-3.5 flex items-center justify-between z-10 shadow-xs">
        <Link to="/" className="flex items-center gap-3 group">
          <img
            src="/FRONTEND/Public/assets/image/logo.jpeg"
            alt="BHOOMIVISION Logo"
            className="w-10 h-10 rounded-xl object-contain shadow-md group-hover:scale-105 transition-transform shrink-0 border border-emerald-900/10 bg-white"
          />
          <div>
            <h1 className="text-xl font-extrabold tracking-tight text-[#064e3b]">
              BHOOMIVISION
            </h1>
            <p className="text-[11px] font-medium text-emerald-700 tracking-wide">
              {isResearcherAuth ? 'National Land Research & Intelligence Platform' : 'Land Insights for a Better Tomorrow'}
            </p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-2 text-xs font-semibold text-emerald-900/80">
          <span>Better Data</span>
          <span className="text-emerald-400">•</span>
          <span>Smarter Research</span>
          <span className="text-emerald-400">•</span>
          <span>Stronger Land Governance</span>
        </div>
      </header>

      {/* MAIN CONTENT WORKSPACE */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 flex items-center justify-center z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 w-full items-center">
          
          {/* LEFT HERO PANEL */}
          <div className="lg:col-span-6 space-y-6 text-left pr-0 lg:pr-4">
            {isResearcherAuth ? (
              /* RESEARCHER VISUAL SECTION */
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#064e3b] text-emerald-100 text-xs font-bold shadow-md">
                  <Search className="w-4 h-4 text-emerald-300" />
                  <span>BHOOMIVISION RESEARCH WORKSPACE</span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#064e3b] tracking-tight leading-tight">
                    Research Beyond <br />
                    <span className="text-emerald-700">Data.</span>
                  </h2>
                  <p className="text-slate-700 text-base sm:text-lg font-normal max-w-xl leading-relaxed">
                    Explore evidence, datasets, GIS intelligence, land-use trends and policy connections through one integrated research workspace.
                  </p>
                </div>

                {/* Conceptual Intelligence Network Diagram */}
                <div className="p-4 bg-white/90 backdrop-blur-md rounded-2xl border border-emerald-900/15 shadow-sm space-y-3">
                  <p className="text-[11px] font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Network className="w-3.5 h-3.5 text-emerald-700" />
                    <span>Conceptual Land Intelligence Pipeline</span>
                  </p>
                  <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 text-center text-[10px] font-bold">
                    <div className="p-2 bg-emerald-100/80 text-emerald-950 rounded-xl border border-emerald-300">RESEARCH</div>
                    <div className="p-2 bg-emerald-100/80 text-emerald-950 rounded-xl border border-emerald-300">EVIDENCE</div>
                    <div className="p-2 bg-emerald-100/80 text-emerald-950 rounded-xl border border-emerald-300">DATA</div>
                    <div className="p-2 bg-emerald-100/80 text-emerald-950 rounded-xl border border-emerald-300">GIS</div>
                    <div className="p-2 bg-emerald-100/80 text-emerald-950 rounded-xl border border-emerald-300">POLICY</div>
                    <div className="p-2 bg-[#064e3b] text-white rounded-xl shadow-xs">GOVERNANCE</div>
                  </div>
                </div>

                {/* Feature Highlights Grid */}
                <div className="space-y-3 pt-1">
                  <div className="flex items-start gap-3.5 group">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100/80 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Evidence & Data Integration</h3>
                      <p className="text-xs text-slate-600 leading-normal">
                        Multi-source scientific datasets, satellite observations & land tribunal registries.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 group">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100/80 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
                      <Layers className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">GIS Spatial Intelligence</h3>
                      <p className="text-xs text-slate-600 leading-normal">
                        High-resolution multi-spectral LULC overlays and geo-referenced plot boundaries.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 group">
                    <div className="w-9 h-9 rounded-xl bg-emerald-100/80 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
                      <Scale className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-sm">Policy & Gap Synthesis</h3>
                      <p className="text-xs text-slate-600 leading-normal">
                        Automated identification of research gaps for evidence-based policy formulation.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-2 text-emerald-950 text-xs font-bold italic">
                  <ShieldCheck className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>National Digital Platform for Research, Policy Innovation & Evidence-Based Land Governance</span>
                </div>
              </div>
            ) : (
              /* DEFAULT PUBLIC HERO PANEL */
              <>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/80 text-emerald-900 text-xs font-semibold border border-emerald-300/50 shadow-xs">
                  <Leaf className="w-4 h-4 text-emerald-700" />
                  <span>Evidence-Based Land Governance</span>
                </div>

                <div className="space-y-3">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#064e3b] tracking-tight leading-tight">
                    Welcome to <br />
                    <span className="text-emerald-700">BHOOMIVISION</span>
                  </h2>
                  <p className="text-slate-600 text-base sm:text-lg font-normal max-w-xl leading-relaxed">
                    Your trusted platform for land research, policy innovation and GIS-based insights.
                  </p>
                </div>

                {/* Feature Highlights Grid */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-start gap-3.5 group">
                    <div className="w-10 h-10 rounded-full bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <Search className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Explore</h3>
                      <p className="text-xs text-slate-600 leading-normal">
                        Research, data and insights on land governance across India.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 group">
                    <div className="w-10 h-10 rounded-full bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Visualize</h3>
                      <p className="text-xs text-slate-600 leading-normal">
                        Access GIS maps and spatial analysis for better decision-making.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 group">
                    <div className="w-10 h-10 rounded-full bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Innovate</h3>
                      <p className="text-xs text-slate-600 leading-normal">
                        Find policy solutions and research gaps for sustainable land management.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5 group">
                    <div className="w-10 h-10 rounded-full bg-emerald-100/70 border border-emerald-200 flex items-center justify-center text-emerald-800 shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Build a Sustainable Future</h3>
                      <p className="text-xs text-slate-600 leading-normal">
                        Together for better land governance and a stronger tomorrow.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bottom Quote Banner */}
                <div className="pt-4 flex items-center gap-2 text-emerald-900/90 text-xs font-semibold italic">
                  <Leaf className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Healthy Land • Stronger Communities • A Sustainable India</span>
                </div>
              </>
            )}
          </div>

          {/* RIGHT AUTH CARD WRAPPER */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl border border-emerald-900/10 shadow-xl p-6 sm:p-8">
              <Outlet />
            </div>
          </div>

        </div>
      </main>

      {/* FOOTER */}
      <footer className="w-full bg-white/90 backdrop-blur-md border-t border-emerald-900/10 px-6 py-4 z-10 text-xs text-slate-600">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <img
              src="/FRONTEND/Public/assets/image/logo.jpeg"
              alt="BHOOMIVISION Logo"
              className="w-6 h-6 rounded-md object-contain shrink-0"
            />
            <span className="font-bold text-slate-800">BHOOMIVISION</span>
            <span className="text-slate-400">|</span>
            <span>Land Insights for a Better Tomorrow</span>
          </div>

          <div className="flex items-center gap-6 font-medium text-slate-700">
            <a href="#about" className="hover:text-emerald-800 transition-colors">About</a>
            <a href="#help" className="hover:text-emerald-800 transition-colors">Help</a>
            <a href="#privacy" className="hover:text-emerald-800 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-emerald-800 transition-colors">Terms of Service</a>
          </div>

          <div className="flex items-center gap-4 text-slate-500">
            <a href="#youtube" className="hover:text-emerald-800 transition-colors" aria-label="YouTube">
              <Youtube className="w-4 h-4" />
            </a>
            <a href="#linkedin" className="hover:text-emerald-800 transition-colors" aria-label="LinkedIn">
              <Linkedin className="w-4 h-4" />
            </a>
            <a href="#twitter" className="hover:text-emerald-800 transition-colors" aria-label="X Twitter">
              <Twitter className="w-4 h-4" />
            </a>
            <span className="text-slate-300">|</span>
            <span className="flex items-center gap-1 font-semibold text-emerald-900 text-[11px]">
              <Leaf className="w-3.5 h-3.5 text-emerald-600" />
              Together for Sustainable Land
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
