import React, { useState } from 'react';
import { Search, Bell, Building, Command, AlertCircle, X, FileText, Edit3, Menu } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenCommandPalette: () => void;
  onToggleMobileMenu?: () => void;
  onOpenProfile?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  onOpenCommandPalette, 
  onToggleMobileMenu,
  onOpenProfile
}) => {
  const { user, organization } = useApp();
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const notifications = [
    {
      id: "n-1",
      title: "GSTR-3B Filing Deadline Approaching",
      desc: "July 2026 return due in 25 days. Estimated Net Payable: ₹2,45,000.",
      time: "10 mins ago",
      type: "warning"
    },
    {
      id: "n-2",
      title: "Invoice #INV-2026-089 Pending Signoff",
      desc: "Apex Technologies bill (₹47,200) parsed with 98.5% OCR confidence.",
      time: "25 mins ago",
      type: "action"
    },
    {
      id: "n-3",
      title: "Bank Statement Auto-Match Complete",
      desc: "12 of 15 HDFC bank transactions matched with payment vouchers.",
      time: "1 hour ago",
      type: "success"
    }
  ];

  return (
    <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      
      {/* Mobile Hamburger & Organization Bar */}
      <div className="flex items-center space-x-3">
        {/* Mobile Hamburger Button */}
        <button
          onClick={onToggleMobileMenu}
          className="p-2 rounded-lg bg-slate-100 border border-slate-200 text-slate-700 md:hidden hover:bg-slate-200 transition cursor-pointer"
          title="Toggle Navigation Menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Company Badge */}
        <div className="hidden sm:flex items-center space-x-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:border-blue-300 transition">
          <Building className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-slate-800 truncate max-w-[140px] md:max-w-none">{organization.name}</span>
          <span className="hidden lg:inline text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-mono font-medium">
            GST: {organization.gstin}
          </span>
        </div>

        {/* Command Palette Trigger Search Bar */}
        <button 
          onClick={onOpenCommandPalette}
          className="flex items-center space-x-3 bg-slate-100 border border-slate-200 hover:border-blue-300 text-slate-600 px-3 py-1.5 rounded-lg text-xs transition w-36 sm:w-48 md:w-64 justify-between group shadow-inner cursor-pointer"
        >
          <div className="flex items-center space-x-2 truncate">
            <Search className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
            <span className="text-slate-500 truncate">Search...</span>
          </div>
          <kbd className="hidden sm:flex items-center space-x-0.5 bg-white border border-slate-300 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-700 shadow-xs">
            <Command className="w-3 h-3" />
            <span>K</span>
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-2 sm:space-x-4">
        
        {/* Status Badge */}
        <div className="hidden xl:flex items-center space-x-2 bg-amber-50 border border-amber-300 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold shadow-xs">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>STATUS: 1 PENDING APPROVAL</span>
        </div>

        {/* Notifications Button */}
        <div className="relative">
          <button 
            onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
            className="p-2 rounded-lg bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 relative transition shadow-xs cursor-pointer"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
          </button>

          {/* Notifications Dropdown */}
          {isNotificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-3 bg-slate-50 flex items-center justify-between">
                <span className="font-bold text-xs text-slate-800">Compliance & Task Alerts</span>
                <button onClick={() => setIsNotificationsOpen(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto">
                {notifications.map((n) => (
                  <div key={n.id} className="p-3.5 hover:bg-blue-50/50 transition space-y-1">
                    <div className="flex items-start justify-between">
                      <span className="font-bold text-xs text-slate-900 leading-tight">{n.title}</span>
                      <span className="text-[10px] font-mono text-slate-400 shrink-0 ml-2">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{n.desc}</p>
                  </div>
                ))}
              </div>

              <div className="p-2.5 bg-slate-50 text-center text-[11px] text-blue-700 font-bold font-mono">
                Audit Trail Active (All Events Recorded)
              </div>
            </div>
          )}
        </div>

        {/* Dynamic User Profile Trigger */}
        <div 
          onClick={onOpenProfile}
          className="flex items-center space-x-2 sm:space-x-3 pl-2 border-l border-slate-200 cursor-pointer hover:opacity-80 transition group"
        >
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-blue-500/20 group-hover:scale-105 transition">
            {user.initials}
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-semibold text-slate-900 flex items-center space-x-1">
              <span>{user.name}</span>
              <Edit3 className="w-3 h-3 text-slate-400 group-hover:text-blue-600" />
            </div>
            <div className="text-[11px] text-slate-500 font-medium">{user.role}</div>
          </div>
        </div>
      </div>

    </header>
  );
};
