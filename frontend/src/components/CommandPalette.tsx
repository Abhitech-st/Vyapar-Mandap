import React, { useEffect, useState } from 'react';
import { Search, FileUp, BookOpen, Receipt, Bot, X, Sparkles, ArrowRight } from 'lucide-react';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, onSelectAction }) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onSelectAction('open_cmd');
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onSelectAction]);

  if (!isOpen) return null;

  const commands = [
    { id: 'invoices', title: 'Upload & Parse Vendor Invoice', category: 'Actions', icon: FileUp },
    { id: 'accounting', title: 'Create Manual Double-Entry Journal', category: 'Actions', icon: BookOpen },
    { id: 'gst-tds', title: 'Run GST 2B ITC Audit Check', category: 'Compliance', icon: Receipt },
    { id: 'ai-copilot', title: 'Ask AI Accounting Copilot', category: 'Copilot', icon: Bot },
    { id: 'reports', title: 'Generate Certified Profit & Loss Statement', category: 'Reports', icon: Sparkles },
  ];

  const filtered = commands.filter(c => c.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-start justify-center pt-24 px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl shadow-2xl w-full max-w-xl overflow-hidden divide-y divide-slate-800 animate-in fade-in zoom-in duration-150">
        
        {/* Input Bar */}
        <div className="flex items-center px-4 py-3 space-x-3">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Type a command or query..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-slate-100 placeholder-slate-500 focus:outline-none text-base font-sans"
          />
          <button onClick={onClose} className="p-1 rounded text-slate-400 hover:text-slate-200">
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Command List */}
        <div className="p-2 max-h-80 overflow-y-auto space-y-1">
          {filtered.length > 0 ? (
            filtered.map((cmd) => {
              const Icon = cmd.icon;
              return (
                <button
                  key={cmd.id}
                  onClick={() => {
                    onSelectAction(cmd.id);
                    onClose();
                  }}
                  className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-slate-800/80 text-left transition group"
                >
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-md bg-slate-800 group-hover:bg-emerald-500/20 text-slate-300 group-hover:text-emerald-400 transition">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-medium text-slate-200 group-hover:text-emerald-300">{cmd.title}</div>
                      <div className="text-[11px] text-slate-500">{cmd.category}</div>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 transition transform group-hover:translate-x-1" />
                </button>
              );
            })
          ) : (
            <div className="p-6 text-center text-slate-500 text-sm">No commands found. Try typing 'invoice' or 'GST'.</div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-950 text-[11px] text-slate-500 flex justify-between items-center font-mono">
          <span>Press ESC to close</span>
          <span>Vyapar Mandap Command Engine</span>
        </div>

      </div>
    </div>
  );
};
