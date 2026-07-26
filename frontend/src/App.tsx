import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import { Dashboard } from './pages/Dashboard';
import { Invoices } from './pages/Invoices';
import { Banking } from './pages/Banking';
import { Accounting } from './pages/Accounting';
import { GstTds } from './pages/GstTds';
import { Reports } from './pages/Reports';
import { AiCopilot } from './pages/AiCopilot';
import { Settings } from './pages/Settings';
import { AppProvider } from './context/AppContext';

export function MainLayout() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isCmdOpen, setIsCmdOpen] = useState<boolean>(false);
  const [reviewInvoiceId, setReviewInvoiceId] = useState<string | null>(null);

  const handleOpenReview = (invId: string) => {
    setReviewInvoiceId(invId);
    setCurrentTab('invoices');
  };

  const handleSelectCommand = (actionId: string) => {
    if (actionId === 'open_cmd') {
      setIsCmdOpen(true);
    } else {
      setCurrentTab(actionId);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Header */}
      <Navbar onOpenCommandPalette={() => setIsCmdOpen(true)} />

      {/* Main Workspace Layout */}
      <div className="flex flex-1">
        {/* Left Navigation Sidebar */}
        <Sidebar currentTab={currentTab} setCurrentTab={setCurrentTab} />

        {/* Content Area */}
        <main className="flex-1 min-w-0 bg-slate-50 overflow-y-auto min-h-[calc(100vh-4rem)]">
          {currentTab === 'dashboard' && <Dashboard onOpenInvoiceReview={handleOpenReview} />}
          {currentTab === 'invoices' && (
            <Invoices 
              selectedReviewId={reviewInvoiceId} 
              onClearReviewId={() => setReviewInvoiceId(null)} 
            />
          )}
          {currentTab === 'banking' && <Banking />}
          {currentTab === 'accounting' && <Accounting />}
          {currentTab === 'gst-tds' && <GstTds />}
          {currentTab === 'reports' && <Reports />}
          {currentTab === 'ai-copilot' && <AiCopilot />}
          {currentTab === 'settings' && <Settings />}
        </main>
      </div>

      {/* Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onSelectAction={handleSelectCommand}
      />

    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}

export default App;
