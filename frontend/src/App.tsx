import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { CommandPalette } from './components/CommandPalette';
import { QuickActionsFab } from './components/QuickActionsFab';
import { UserProfileModal } from './components/UserProfileModal';
import { Dashboard } from './pages/Dashboard';
import { Invoices } from './pages/Invoices';
import { Banking } from './pages/Banking';
import { Accounting } from './pages/Accounting';
import { GstTds } from './pages/GstTds';
import { Reports } from './pages/Reports';
import { AiCopilot } from './pages/AiCopilot';
import { Settings } from './pages/Settings';
import { Onboarding } from './pages/Onboarding';
import { AppProvider, useApp } from './context/AppContext';

export function MainLayout() {
  const { isOnboarded } = useApp();

  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [isCmdOpen, setIsCmdOpen] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isProfileOpen, setIsProfileOpen] = useState<boolean>(false);
  const [reviewInvoiceId, setReviewInvoiceId] = useState<string | null>(null);

  if (!isOnboarded) {
    return <Onboarding />;
  }

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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans relative">
      
      {/* Top Responsive Header */}
      <Navbar 
        onOpenCommandPalette={() => setIsCmdOpen(true)} 
        onToggleMobileMenu={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Workspace Layout */}
      <div className="flex flex-1 min-w-0">
        {/* Left Navigation Sidebar (Desktop + Mobile Drawer) */}
        <Sidebar 
          currentTab={currentTab} 
          setCurrentTab={setCurrentTab}
          isOpenMobile={isMobileMenuOpen}
          onCloseMobile={() => setIsMobileMenuOpen(false)}
        />

        {/* Responsive Content Area */}
        <main className="flex-1 min-w-0 bg-slate-50 overflow-y-auto min-h-[calc(100vh-4rem)] p-2 sm:p-4 md:p-6">
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

      {/* Root-Level Command Palette Modal (Cmd+K) */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={() => setIsCmdOpen(false)}
        onSelectAction={handleSelectCommand}
      />

      {/* Root-Level User Profile Credentials Modal (z-[100] Above All Pages) */}
      <UserProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      {/* Quick Actions Floating Action Speed Dial Button */}
      <QuickActionsFab onNavigate={(tabId) => setCurrentTab(tabId)} />

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
