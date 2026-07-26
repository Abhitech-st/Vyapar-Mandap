import React from 'react';
import { Search, Bell, Sparkles, Building, User, Command, AlertCircle, ShieldCheck } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  return (
    <header className="h-16 border-b border-slate-200 bg-white/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm">
      {/* Organization Switcher & Search Bar */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 bg-slate-100 border border-slate-200 rounded-lg px-3 py-1.5 cursor-pointer hover:border-blue-300 transition">
          <Building className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-slate-800">M/S Sharma Traders</span>
          <span className="text-[10px] bg-blue-50 text-blue-700 border border-blue-200 px-1.5 py-0.5 rounded font-mono font-medium">GST: 27AABCS9876E1Z2</span>
        </div>

        <button 
          onClick={onOpenCommandPalette}
          className="flex items-center space-x-3 bg-slate-100 border border-slate-200 hover:border-blue-300 text-slate-600 px-4 py-1.5 rounded-lg text-sm transition w-80 justify-between group shadow-inner"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
            <span className="text-slate-500">Search or command...</span>
          </div>
          <kbd className="flex items-center space-x-0.5 bg-white border border-slate-300 px-2 py-0.5 rounded text-[11px] font-mono text-slate-700 shadow-xs">
            <Command className="w-3 h-3" />
            <span>K</span>
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Scoped Decision-Support Status Badge */}
        <div className="flex items-center space-x-2 bg-amber-50 border border-amber-300 text-amber-800 px-3 py-1 rounded-full text-xs font-mono font-medium shadow-xs">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>STATUS: 1 PENDING APPROVAL • 0 FAILURES</span>
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-lg bg-slate-100 border border-slate-200 hover:border-slate-300 text-slate-700 relative transition shadow-xs">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-2 border-l border-slate-200">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold text-white text-xs shadow-md shadow-blue-500/20">
            JS
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-semibold text-slate-900">John Sharma</div>
            <div className="text-[11px] text-slate-500 font-medium">Chartered Accountant</div>
          </div>
        </div>
      </div>
    </header>
  );
};
