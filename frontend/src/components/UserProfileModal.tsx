import React, { useState } from 'react';
import { User, X, CheckCircle2, Save, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const UserProfileModal: React.FC<UserProfileModalProps> = ({ isOpen, onClose }) => {
  const { user, updateUser, resetOnboarding } = useApp();

  const [editName, setEditName] = useState(user.name);
  const [editRole, setEditRole] = useState(user.role);
  const [editEmail, setEditEmail] = useState(user.email);
  const [editCaNum, setEditCaNum] = useState(user.caMembershipNumber);
  const [profileSaveSuccess, setProfileSaveSuccess] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSaveProfile = () => {
    updateUser({
      name: editName,
      role: editRole,
      email: editEmail,
      caMembershipNumber: editCaNum
    });
    setProfileSaveSuccess("Profile credentials saved to local device & synced to Supabase database.");
    setTimeout(() => {
      setProfileSaveSuccess(null);
      onClose();
    }, 900);
  };

  const handleSwitchFirm = () => {
    onClose();
    resetOnboarding();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-[100] overflow-y-auto">
      <div className="min-h-full flex items-center justify-center p-4 sm:p-6">
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-4 my-8 relative animate-in fade-in zoom-in-95 duration-150 z-[101]">
          
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-bold text-base text-slate-900 flex items-center space-x-2">
              <User className="w-5 h-5 text-blue-600" />
              <span>User Credentials & Workspace</span>
            </h3>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100 transition">
              <X className="w-5 h-5" />
            </button>
          </div>

          {profileSaveSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-xs text-emerald-900 font-semibold flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{profileSaveSuccess}</span>
            </div>
          )}

          {/* Form */}
          <div className="space-y-3.5 text-xs">
            <div>
              <label className="font-bold text-slate-700">Full Name</label>
              <input 
                type="text" 
                value={editName} 
                onChange={(e) => setEditName(e.target.value)} 
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-bold text-slate-900 focus:outline-none focus:border-blue-600" 
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">Role / Designation</label>
              <input 
                type="text" 
                value={editRole} 
                onChange={(e) => setEditRole(e.target.value)} 
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-semibold text-slate-900 focus:outline-none focus:border-blue-600" 
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">Email Address</label>
              <input 
                type="email" 
                value={editEmail} 
                onChange={(e) => setEditEmail(e.target.value)} 
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-medium text-slate-900 focus:outline-none focus:border-blue-600" 
              />
            </div>
            <div>
              <label className="font-bold text-slate-700">CA Membership / Professional Registration No.</label>
              <input 
                type="text" 
                value={editCaNum} 
                onChange={(e) => setEditCaNum(e.target.value)} 
                className="w-full mt-1 p-2.5 bg-slate-50 border border-slate-300 rounded-xl font-mono font-bold text-blue-700 focus:outline-none focus:border-blue-600" 
              />
            </div>
          </div>

          {/* Switch Firm Link */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              type="button"
              onClick={handleSwitchFirm}
              className="text-xs font-bold text-blue-700 hover:text-blue-800 flex items-center space-x-1.5 transition cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Switch Firm / Re-run Onboarding</span>
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-2">
            <button 
              onClick={onClose} 
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold transition cursor-pointer"
            >
              Cancel
            </button>
            <button 
              onClick={handleSaveProfile} 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold shadow-md shadow-blue-500/20 flex items-center space-x-1.5 cursor-pointer transition"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save & Sync to Supabase</span>
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
