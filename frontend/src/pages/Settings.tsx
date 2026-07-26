import React, { useState } from 'react';
import { Settings as SettingsIcon, Building, ShieldCheck, Key, Database, Save, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Settings: React.FC = () => {
  const { organization, updateOrganization, user, updateUser } = useApp();

  const [orgName, setOrgName] = useState(organization.name);
  const [gstin, setGstin] = useState(organization.gstin);
  const [pan, setPan] = useState(organization.pan);
  const [address, setAddress] = useState(organization.address);
  const [fyStart, setFyStart] = useState(organization.financialYearStart);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSaveOrg = () => {
    updateOrganization({
      name: orgName,
      gstin: gstin,
      pan: pan,
      address: address,
      financialYearStart: fyStart
    });
    setSuccessMsg("Organization & GST Master details updated dynamically.");
    setTimeout(() => setSuccessMsg(null), 3000);
  };

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

      {successMsg && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-semibold flex items-center space-x-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>{successMsg}</span>
        </div>
      )}

      <div className="glass-card rounded-xl p-6 max-w-3xl space-y-6 border border-slate-200 shadow-sm bg-white">
        
        {/* Business Details */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <h3 className="font-bold text-sm text-slate-800 flex items-center space-x-2">
              <Building className="w-4 h-4 text-blue-600" />
              <span>Business Entity & Statutory Master</span>
            </h3>
            <button 
              onClick={handleSaveOrg}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition shadow-xs flex items-center space-x-1.5 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Entity Master</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="space-y-1">
              <label className="text-slate-600 font-sans font-semibold">Legal Entity Name</label>
              <input
                type="text"
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600 font-sans font-semibold">Primary GSTIN</label>
              <input
                type="text"
                value={gstin}
                onChange={(e) => setGstin(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-blue-700 font-bold focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600 font-sans font-semibold">Permanent Account Number (PAN)</label>
              <input
                type="text"
                value={pan}
                onChange={(e) => setPan(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-bold focus:outline-none focus:border-blue-600"
              />
            </div>
            <div className="space-y-1">
              <label className="text-slate-600 font-sans font-semibold">Financial Year Start</label>
              <input
                type="text"
                value={fyStart}
                onChange={(e) => setFyStart(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-medium focus:outline-none focus:border-blue-600"
              />
            </div>
          </div>

          <div className="space-y-1 text-xs">
            <label className="text-slate-600 font-sans font-semibold">Registered Office Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-slate-50 border border-slate-300 rounded p-2.5 text-slate-900 font-medium focus:outline-none focus:border-blue-600 font-sans"
            />
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
