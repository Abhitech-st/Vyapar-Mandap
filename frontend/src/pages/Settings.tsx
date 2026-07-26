import React from 'react';
import { Settings as SettingsIcon, Building, ShieldCheck, Key, Database } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-900 flex items-center space-x-2">
          <SettingsIcon className="w-5 h-5 text-blue-600" />
          <span>Organization & Statutory Settings</span>
        </h1>
        <p className="text-xs text-slate-600 font-medium mt-0.5">Manage multi-tenant company details, GSTIN rules, and role-based access controls</p>
      </div>

      <div className="glass-card rounded-xl p-6 max-w-3xl space-y-6 border border-slate-200 shadow-sm bg-white">
        
        {/* Business Details */}
        <div className="space-y-4">
          <h3 className="font-bold text-sm text-slate-800 border-b border-slate-200 pb-2 flex items-center space-x-2">
            <Building className="w-4 h-4 text-blue-600" />
            <span>Business Entity Master</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-slate-600 font-sans font-semibold">Legal Entity Name</label>
              <input
                type="text"
                readOnly
                value="M/S Sharma Traders"
                className="w-full bg-slate-100 border border-slate-200 rounded p-2.5 text-slate-900 font-bold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600 font-sans font-semibold">Primary GSTIN</label>
              <input
                type="text"
                readOnly
                value="27AABCS9876E1Z2"
                className="w-full bg-slate-100 border border-slate-200 rounded p-2.5 text-blue-700 font-bold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600 font-sans font-semibold">Permanent Account Number (PAN)</label>
              <input
                type="text"
                readOnly
                value="AABCS9876E"
                className="w-full bg-slate-100 border border-slate-200 rounded p-2.5 text-slate-900 font-bold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600 font-sans font-semibold">Financial Year Start</label>
              <input
                type="text"
                readOnly
                value="01-April-2026"
                className="w-full bg-slate-100 border border-slate-200 rounded p-2.5 text-slate-900 font-medium focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* AI & Compliance Constraints */}
        <div className="space-y-4 pt-4 border-t border-slate-200">
          <h3 className="font-bold text-sm text-slate-800 border-b border-slate-200 pb-2 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>AI Safety & Human-in-the-Loop Thresholds</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <div className="font-bold text-slate-900">Require Human Approval for Low Confidence OCR</div>
                <div className="text-slate-600 text-[11px] font-medium">Halt automatic posting if vision extraction score &lt; 0.85</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 rounded cursor-pointer" />
            </div>

            <div className="flex items-center justify-between p-3.5 bg-slate-50 rounded-lg border border-slate-200">
              <div>
                <div className="font-bold text-slate-900">Strict Immutable Ledger Postings</div>
                <div className="text-slate-600 text-[11px] font-medium">Disallow unposting or editing committed journal entries without explicit CA audit reversal</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 rounded cursor-pointer" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
