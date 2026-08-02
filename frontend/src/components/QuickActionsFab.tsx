import React, { useState } from 'react';
import { Plus, FileText, Upload, Bot, BarChart3, X } from 'lucide-react';

interface QuickActionsFabProps {
  onNavigate: (tab: string) => void;
}

export const QuickActionsFab: React.FC<QuickActionsFabProps> = ({ onNavigate }) => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    { label: 'Create Invoice', icon: FileText, tab: 'invoices' },
    { label: 'Upload Bills', icon: Upload, tab: 'invoices' },
    { label: 'Ask AI Copilot', icon: Bot, tab: 'ai-copilot' },
    { label: 'Generate Report', icon: BarChart3, tab: 'reports' }
  ];

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end space-y-1.5 select-none">
      
      {/* Expanded Speed Dial Action Items */}
      {isOpen && (
        <div className="flex flex-col items-end space-y-1.5 mb-1.5 animate-in fade-in slide-in-from-bottom-2 duration-150">
          {actions.map((act, idx) => {
            const Icon = act.icon;
            return (
              <button
                key={idx}
                onClick={() => {
                  onNavigate(act.tab);
                  setIsOpen(false);
                }}
                className="flex items-center space-x-2 bg-white border border-slate-200 hover:border-blue-300 text-slate-800 px-3 py-1.5 rounded-full shadow-md hover:shadow-lg transition cursor-pointer text-[11px] font-semibold group"
              >
                <span>{act.label}</span>
                <div className="w-6 h-6 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition">
                  <Icon className="w-3 h-3" />
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* Main Compact Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-9 px-3 sm:h-10 sm:px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg shadow-blue-500/20 flex items-center space-x-1.5 text-[11px] sm:text-xs font-bold transition transform hover:scale-105 cursor-pointer border border-blue-500"
      >
        {isOpen ? <X className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
        <span>{isOpen ? 'Close' : 'Quick Action'}</span>
      </button>

    </div>
  );
};
