import React from 'react';
import { Search, Bell, Sparkles, Building, User, Command, CheckCircle2, AlertCircle } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/90 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Organization Switcher & Search Bar */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 cursor-pointer hover:border-slate-700 transition">
          <Building className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-semibold text-slate-100">M/S Sharma Traders</span>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded font-mono">GST: 27AABCS9876E1Z2</span>
        </div>

        <button 
          onClick={onOpenCommandPalette}
          className="flex items-center space-x-3 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 px-4 py-1.5 rounded-lg text-sm transition w-80 justify-between group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-200" />
            <span className="text-slate-300">Search or command...</span>
          </div>
          <kbd className="flex items-center space-x-0.5 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-[11px] font-mono text-slate-200">
            <Command className="w-3 h-3" />
            <span>K</span>
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Scoped Decision-Support Status Badge */}
        <div className="flex items-center space-x-2 bg-slate-900 border border-amber-500/40 text-amber-300 px-3 py-1 rounded-full text-xs font-mono glow-amber">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>STATUS: 1 PENDING APPROVAL • 0 FAILURES</span>
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 relative transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full glow-amber"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-800 flex items-center justify-center font-bold text-white text-xs ring-2 ring-emerald-500/30">
            JS
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-semibold text-slate-100">John Sharma</div>
            <div className="text-[11px] text-slate-300 font-medium">Chartered Accountant</div>
          </div>
        </div>
      </div>
    </header>
  );
};
