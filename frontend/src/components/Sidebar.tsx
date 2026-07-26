import React from 'react';
import { 
  LayoutDashboard, FileText, Landmark, BookOpen, Receipt, 
  Percent, BarChart3, Bot, Settings, Sparkles, ShieldCheck
} from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invoices & Bills', icon: FileText, badge: '1 Approval' },
    { id: 'banking', label: 'Banking & Rec', icon: Landmark },
    { id: 'accounting', label: 'Ledger & Journals', icon: BookOpen },
    { id: 'gst-tds', label: 'GST & TDS Filing', icon: Receipt },
    { id: 'reports', label: 'Financial Reports', icon: BarChart3 },
    { id: 'ai-copilot', label: 'AI Agent Monitor', icon: Bot, highlight: true },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none">
      <div className="p-4 space-y-6">
        {/* App Logo */}
        <div className="flex items-center space-x-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-100 tracking-tight text-base leading-tight">Vyapar Mandap</h1>
            <p className="text-[11px] text-slate-400 font-mono">Multi-Agent AI Accounting</p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setCurrentTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/80'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.5 rounded font-mono glow-amber">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !item.badge && (
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Compliance Badge */}
      <div className="p-4 border-t border-slate-900">
        <div className="glass-card rounded-lg p-3 text-xs text-slate-400 space-y-2">
          <div className="flex items-center space-x-2 text-emerald-400 font-medium">
            <ShieldCheck className="w-4 h-4" />
            <span>Immutable Double-Entry</span>
          </div>
          <p className="text-[11px] text-slate-500">Every journal entry is cryptographically audited before ledger commit.</p>
        </div>
      </div>
    </aside>
  );
};
