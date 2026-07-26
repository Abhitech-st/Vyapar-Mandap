import React from 'react';
import { Settings as SettingsIcon, Building, ShieldCheck, Key, Database } from 'lucide-react';

export const Settings: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      
      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-slate-100 flex items-center space-x-2">
          <SettingsIcon className="w-5 h-5 text-emerald-400" />
          <span>Organization & Statutory Settings</span>
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">Manage multi-tenant company details, GSTIN rules, and role-based access controls</p>
      </div>

      <div className="glass-card rounded-xl p-6 max-w-3xl space-y-6 border border-slate-800">
        
        {/* Business Details */}
        <div className="space-y-4">
          <h3 className="font-semibold text-sm text-slate-200 border-b border-slate-800 pb-2 flex items-center space-x-2">
            <Building className="w-4 h-4 text-emerald-400" />
            <span>Business Entity Master</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-slate-400 font-sans">Legal Entity Name</label>
              <input
                type="text"
                readOnly
                value="M/S Sharma Traders"
                className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-slate-200 font-bold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 font-sans">Primary GSTIN</label>
              <input
                type="text"
                readOnly
                value="27AABCS9876E1Z2"
                className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-emerald-400 font-bold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 font-sans">Permanent Account Number (PAN)</label>
              <input
                type="text"
                readOnly
                value="AABCS9876E"
                className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-slate-200 font-bold focus:outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-400 font-sans">Financial Year Start</label>
              <input
                type="text"
                readOnly
                value="01-April-2026"
                className="w-full bg-slate-900 border border-slate-800 rounded p-2.5 text-slate-200 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* AI & Compliance Constraints */}
        <div className="space-y-4 pt-4 border-t border-slate-800">
          <h3 className="font-semibold text-sm text-slate-200 border-b border-slate-800 pb-2 flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>AI Safety & Human-in-the-Loop Thresholds</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div>
                <div className="font-medium text-slate-200">Require Human Approval for Low Confidence OCR</div>
                <div className="text-slate-400 text-[11px]">Halt automatic posting if vision extraction score &lt; 0.85</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500 rounded" />
            </div>

            <div className="flex items-center justify-between p-3 bg-slate-900 rounded-lg border border-slate-800">
              <div>
                <div className="font-medium text-slate-200">Strict Immutable Ledger Postings</div>
                <div className="text-slate-400 text-[11px]">Disallow unposting or editing committed journal entries without explicit CA audit reversal</div>
              </div>
              <input type="checkbox" defaultChecked className="w-4 h-4 accent-emerald-500 rounded" />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
