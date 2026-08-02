import React, { useState } from 'react';
import { Sparkles, Building, User, ArrowRight, CheckCircle2, ShieldCheck, Database } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Onboarding: React.FC = () => {
  const { user, organization, completeOnboarding } = useApp();

  const [step, setStep] = useState<number>(1);
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [role, setRole] = useState(user.role);
  const [caNum, setCaNum] = useState(user.caMembershipNumber);

  const [firmName, setFirmName] = useState(organization.name);
  const [gstin, setGstin] = useState(organization.gstin);
  const [pan, setPan] = useState(organization.pan);
  const [address, setAddress] = useState(organization.address);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (step === 1) setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parts = name.trim().split(" ");
    const initials = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();

    const newUser = {
      name,
      email,
      role,
      initials,
      caMembershipNumber: caNum
    };

    const newOrg = {
      name: firmName,
      gstin,
      pan,
      address,
      financialYearStart: "01-April-2026"
    };

    await completeOnboarding(newUser, newOrg);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans">
      <div className="w-full max-w-xl bg-slate-800/90 border border-slate-700 rounded-3xl shadow-2xl overflow-hidden backdrop-blur-md">
        
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 p-6 sm:p-8 space-y-2 text-white">
          <div className="flex items-center space-x-2 text-xs font-semibold text-blue-200 uppercase tracking-wider">
            <Sparkles className="w-4 h-4 text-blue-300" />
            <span>Vyapar Mandap — Multi-Agent AI SaaS</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Setup Your Professional Workspace
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 font-medium">
            Register your Chartered Accountant profile and Firm Entity master. Data is saved locally on your client device & synced to Supabase database.
          </p>

          {/* Stepper Indicator */}
          <div className="flex items-center space-x-3 pt-3">
            <div className={`flex items-center space-x-1 text-xs font-bold ${step === 1 ? 'text-white' : 'text-blue-200'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 1 ? 'bg-white text-blue-800 font-bold' : 'bg-blue-800 text-white'}`}>1</span>
              <span>User Credentials</span>
            </div>
            <span className="text-blue-400">•</span>
            <div className={`flex items-center space-x-1 text-xs font-bold ${step === 2 ? 'text-white' : 'text-blue-300'}`}>
              <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] ${step === 2 ? 'bg-white text-blue-800 font-bold' : 'bg-blue-800 text-white'}`}>2</span>
              <span>Firm Entity Master</span>
            </div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          
          {step === 1 ? (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-200 flex items-center space-x-2 border-b border-slate-700 pb-2">
                <User className="w-4 h-4 text-blue-400" />
                <span>Step 1: Personal & Professional Credentials</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. John Sharma"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="john@firm.in"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-medium focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">Role / Designation</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold focus:outline-none focus:border-blue-500"
                  >
                    <option value="Chartered Accountant">Chartered Accountant</option>
                    <option value="CFO / Finance Director">CFO / Finance Director</option>
                    <option value="Senior Tax Consultant">Senior Tax Consultant</option>
                    <option value="Business Owner / Partner">Business Owner / Partner</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-300">CA Registration / Reg No.</label>
                  <input
                    type="text"
                    value={caNum}
                    onChange={(e) => setCaNum(e.target.value)}
                    placeholder="e.g. CA-190482"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-blue-400 font-mono font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs transition shadow-lg shadow-blue-600/30 flex items-center space-x-2 cursor-pointer"
                >
                  <span>Next: Configure Business Entity</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-slate-200 flex items-center space-x-2 border-b border-slate-700 pb-2">
                <Building className="w-4 h-4 text-blue-400" />
                <span>Step 2: Business Entity & Statutory GST Master</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="space-y-1">
                  <label className="font-sans font-bold text-slate-300">Legal Business Name</label>
                  <input
                    type="text"
                    required
                    value={firmName}
                    onChange={(e) => setFirmName(e.target.value)}
                    placeholder="M/S Sharma Traders"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold font-sans focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-sans font-bold text-slate-300">Primary GSTIN</label>
                  <input
                    type="text"
                    required
                    maxLength={15}
                    value={gstin}
                    onChange={(e) => setGstin(e.target.value.toUpperCase())}
                    placeholder="27AABCS9876E1Z2"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-blue-400 font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-sans font-bold text-slate-300">PAN Number</label>
                  <input
                    type="text"
                    required
                    maxLength={10}
                    value={pan}
                    onChange={(e) => setPan(e.target.value.toUpperCase())}
                    placeholder="AABCS9876E"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-bold focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-sans font-bold text-slate-300">Financial Year</label>
                  <input
                    type="text"
                    disabled
                    value="2026-2027 (Q2 Active)"
                    className="w-full bg-slate-900/60 border border-slate-800 rounded-xl p-3 text-slate-400 font-semibold cursor-not-allowed"
                  />
                </div>
              </div>

              <div className="space-y-1 text-xs">
                <label className="font-bold text-slate-300">Registered Office Address</label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Bandra West, Mumbai, Maharashtra"
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white font-medium focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="bg-slate-900/60 p-3.5 rounded-xl border border-slate-700/80 flex items-center space-x-3 text-xs text-slate-300">
                <Database className="w-5 h-5 text-emerald-400 shrink-0" />
                <span className="text-[11px] leading-relaxed">
                  Your credentials will be saved in <strong>Client Device Storage</strong> for instant offline loading and synchronized with <strong>Supabase Central Database</strong>.
                </span>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-300 font-semibold text-xs transition cursor-pointer"
                >
                  Back
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition shadow-lg shadow-emerald-600/30 flex items-center space-x-2 cursor-pointer disabled:opacity-60"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isSubmitting ? 'Syncing to Supabase...' : 'Save & Launch AI Workspace'}</span>
                </button>
              </div>
            </div>
          )}

        </form>

      </div>
    </div>
  );
};
