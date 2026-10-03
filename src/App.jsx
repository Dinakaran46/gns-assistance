import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';

import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import Footer from './components/layout/Footer';

import LandingPage from './components/pages/LandingPage';
import AuthModal from './components/pages/AuthModal';
import Dashboard from './components/pages/Dashboard';
import DiscoverSchemes from './components/pages/DiscoverSchemes';
import SchemeDetailsPage from './components/pages/SchemeDetailsPage';
import EligibilityChecker from './components/pages/EligibilityChecker';
import AIAssistant from './components/pages/AIAssistant';
import DocumentGuide from './components/pages/DocumentGuide';
import SchemeComparison from './components/pages/SchemeComparison';
import SavedSchemes from './components/pages/SavedSchemes';
import NotificationCenter from './components/pages/NotificationCenter';
import UserProfile from './components/pages/UserProfile';
import AdminDashboard from './components/pages/AdminDashboard';

function MainAppContent() {
  const { activeView } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // If active view is public landing, render standalone layout with topbar/footer
  const isLandingPage = activeView === 'landing';

  return (
    <div className="app-container">
      {!isLandingPage && (
        <Sidebar 
          collapsed={collapsed} 
          setCollapsed={setCollapsed} 
          mobileOpen={mobileOpen} 
          setMobileOpen={setMobileOpen} 
        />
      )}

      <div className="main-content">
        <Topbar setMobileOpen={setMobileOpen} />

        <main className="page-body">
          {activeView === 'landing' && <LandingPage />}
          {activeView === 'dashboard' && <Dashboard />}
          {activeView === 'discover' && <DiscoverSchemes />}
          {activeView === 'eligibility' && <EligibilityChecker />}
          {activeView === 'ai' && <AIAssistant />}
          {activeView === 'documents' && <DocumentGuide />}
          {activeView === 'comparison' && <SchemeComparison />}
          {activeView === 'saved' && <SavedSchemes />}
          {activeView === 'notifications' && <NotificationCenter />}
          {activeView === 'profile' && <UserProfile />}
          {activeView === 'admin' && <AdminDashboard />}
        </main>

        <Footer />
      </div>

      <SchemeDetailsPage />
      <AuthModal />
    </div>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <AppProvider>
        <MainAppContent />
      </AppProvider>
    </LanguageProvider>
  );
}
