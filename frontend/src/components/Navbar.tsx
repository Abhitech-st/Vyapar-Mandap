import React from 'react';
import { Search, Bell, Sparkles, Building, User, Command } from 'lucide-react';

interface NavbarProps {
  onOpenCommandPalette: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCommandPalette }) => {
  return (
    <header className="h-16 border-b border-slate-800 bg-slate-950/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-40">
      {/* Organization Switcher & Search Bar */}
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 cursor-pointer hover:border-slate-700 transition">
          <Building className="w-4 h-4 text-emerald-400" />
          <span className="text-sm font-medium text-slate-200">M/S Sharma Traders</span>
          <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-1.5 py-0.5 rounded font-mono">GST: 27AABCS9876E1Z2</span>
        </div>

        <button 
          onClick={onOpenCommandPalette}
          className="flex items-center space-x-3 bg-slate-900/90 border border-slate-800 hover:border-slate-700 text-slate-400 px-4 py-1.5 rounded-lg text-sm transition w-80 justify-between group"
        >
          <div className="flex items-center space-x-2">
            <Search className="w-4 h-4 text-slate-500 group-hover:text-slate-300" />
            <span>Search or command...</span>
          </div>
          <kbd className="flex items-center space-x-0.5 bg-slate-800 border border-slate-700 px-2 py-0.5 rounded text-[11px] font-mono text-slate-300">
            <Command className="w-3 h-3" />
            <span>K</span>
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center space-x-4">
        {/* Live Multi-Agent Stream Status */}
        <div className="flex items-center space-x-2 bg-emerald-950/50 border border-emerald-800/60 text-emerald-400 px-3 py-1 rounded-full text-xs font-mono glow-emerald">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>10 AI AGENTS ACTIVE</span>
        </div>

        {/* Notifications */}
        <button className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 relative transition">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full glow-amber"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center space-x-3 pl-2 border-l border-slate-800">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-800 flex items-center justify-center font-bold text-white text-xs ring-2 ring-emerald-500/20">
            JS
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-sm font-medium text-slate-200">John Sharma</div>
            <div className="text-[11px] text-slate-400">Chartered Accountant</div>
          </div>
        </div>
      </div>
    </header>
  );
};
