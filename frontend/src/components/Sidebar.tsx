import React from 'react';
import { 
  LayoutDashboard, FileText, Landmark, BookOpen, Receipt, 
  BarChart3, Bot, Settings, Sparkles, ShieldCheck, Building, X
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ 
  currentTab, 
  setCurrentTab, 
  isOpenMobile = false, 
  onCloseMobile 
}) => {
  const { organization } = useApp();

  const navItems = [
    { id: 'dashboard', label: 'AI Operations Center', icon: LayoutDashboard },
    { id: 'invoices', label: 'Invoice Inbox', icon: FileText, badge: '1 Approval' },
    { id: 'banking', label: 'Reconciliation', icon: Landmark },
    { id: 'accounting', label: 'Ledger Engine', icon: BookOpen },
    { id: 'gst-tds', label: 'Tax Compliance', icon: Receipt },
    { id: 'reports', label: 'AI Reports', icon: BarChart3 },
    { id: 'ai-copilot', label: 'AI Copilot', icon: Bot },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const handleSelectTab = (tabId: string) => {
    setCurrentTab(tabId);
    if (onCloseMobile) onCloseMobile();
  };

  const sidebarContent = (
    <div className="flex flex-col justify-between h-full bg-white select-none">
      <div className="p-4 space-y-5">
        
        {/* App Logo & Integrated Company Master Card */}
        <div className="space-y-3 px-1">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 tracking-tight text-sm leading-tight">Vyapar Mandap</h1>
                <p className="text-[10px] text-blue-700 font-medium">AI Accounting Platform</p>
              </div>
            </div>

            {/* Mobile Drawer Close Button */}
            {onCloseMobile && (
              <button onClick={onCloseMobile} className="md:hidden p-1 text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Integrated Organization Card */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 space-y-1">
            <div className="flex items-center space-x-1.5 text-xs font-semibold text-slate-800 truncate">
              <Building className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span className="truncate">{organization.name}</span>
            </div>
            <div className="text-[10px] text-slate-500 font-mono font-medium pl-5">
              GST: {organization.gstin}
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-semibold transition cursor-pointer ${
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
                  <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-300 px-1.5 py-0.5 rounded font-mono font-bold">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Compliance Badge */}
      <div className="p-4 border-t border-slate-100">
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 text-xs text-slate-600 space-y-1 shadow-xs">
          <div className="flex items-center space-x-2 text-blue-700 font-semibold">
            <ShieldCheck className="w-4 h-4 text-blue-600" />
            <span>Immutable Ledger Core</span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium">
            Strict $Dr = Cr$ Enforcement
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden md:block w-64 border-r border-slate-200 h-[calc(100vh-4rem)] sticky top-16 shadow-xs shrink-0">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div 
            className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
            onClick={onCloseMobile}
          />
          <div className="relative w-72 max-w-[80vw] bg-white h-full shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
