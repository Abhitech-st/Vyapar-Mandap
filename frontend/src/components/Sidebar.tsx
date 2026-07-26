import React from 'react';
import { 
  LayoutDashboard, FileText, Landmark, BookOpen, Receipt, 
  Percent, BarChart3, Bot, Settings, Sparkles, ShieldCheck
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, setCurrentTab }) => {
  const { organization } = useApp();

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
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col justify-between h-[calc(100vh-4rem)] sticky top-16 select-none shadow-xs">
      <div className="p-4 space-y-6">
        {/* App Logo */}
        <div className="flex items-center space-x-3 px-2">
          <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/25">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-slate-900 tracking-tight text-base leading-tight">Vyapar Mandap</h1>
            <p className="text-[11px] text-blue-700 font-mono font-medium">Multi-Agent AI Accounting</p>
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
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm font-semibold transition ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] bg-amber-100 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !item.badge && (
                  <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Compliance Badge */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 space-y-1.5 shadow-xs">
          <div className="flex items-center space-x-2 text-blue-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Immutable Ledger Core</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium font-mono">
            {organization.gstin}
          </p>
        </div>
      </div>
    </aside>
  );
};
