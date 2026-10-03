import React, { createContext, useContext, useState, useEffect } from 'react';
import { DEFAULT_SCHEMES } from '../data/defaultSchemes';
import { DEFAULT_NOTIFICATIONS } from '../data/defaultNotifications';

const AppContext = createContext();

const INITIAL_PROFILE = {
  fullName: "Ramesh Kumar",
  email: "ramesh.kumar@example.com",
  phone: "+91 98765 43210",
  age: 24,
  annualIncome: 220000,
  occupation: "Student",
  state: "Tamil Nadu",
  district: "Chennai",
  category: "OBC",
  gender: "Male",
  educationLevel: "Undergraduate",
  employmentStatus: "Unemployed",
  completionPercentage: 85
};

const INITIAL_USER = {
  id: "usr-1",
  name: "Ramesh Kumar",
  email: "ramesh.kumar@example.com",
  role: "user"
};

export function AppProvider({ children }) {
  // Auth state
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('gns_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [userProfile, setUserProfile] = useState(() => {
    const saved = localStorage.getItem('gns_profile');
    return saved ? JSON.parse(saved) : INITIAL_PROFILE;
  });

  // Active Page Navigation
  const [activeView, setActiveView] = useState('dashboard');

  // Global Schemes State (Supports Admin CRUD)
  const [schemes, setSchemes] = useState(() => {
    const saved = localStorage.getItem('gns_schemes');
    return saved ? JSON.parse(saved) : DEFAULT_SCHEMES;
  });

  // Saved Schemes Bookmarks
  const [savedSchemeIds, setSavedSchemeIds] = useState(() => {
    const saved = localStorage.getItem('gns_saved_scheme_ids');
    return saved ? JSON.parse(saved) : ["scheme-1", "scheme-3", "scheme-4"];
  });

  // Document Readiness Tracker: { "schemeId_docId": "Ready" | "Not Started" | "Not Applicable" }
  const [documentReadiness, setDocumentReadiness] = useState(() => {
    const saved = localStorage.getItem('gns_doc_readiness');
    return saved ? JSON.parse(saved) : {
      "scheme-1_doc-1": "Ready",
      "scheme-1_doc-2": "Not Started",
      "scheme-3_doc-6": "Ready"
    };
  });

  // Scheme Comparison Queue
  const [compareSchemeIds, setCompareSchemeIds] = useState(() => {
    const saved = localStorage.getItem('gns_compare_ids');
    return saved ? JSON.parse(saved) : ["scheme-1", "scheme-2"];
  });

  // Notifications List
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('gns_notifications');
    return saved ? JSON.parse(saved) : DEFAULT_NOTIFICATIONS;
  });

  // Global Search Query in Topbar
  const [globalSearchQuery, setGlobalSearchQuery] = useState("");

  // Modals & Popups
  const [selectedSchemeDetail, setSelectedSchemeDetail] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register'

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('gns_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('gns_profile', JSON.stringify(userProfile));
  }, [userProfile]);

  useEffect(() => {
    localStorage.setItem('gns_schemes', JSON.stringify(schemes));
  }, [schemes]);

  useEffect(() => {
    localStorage.setItem('gns_saved_scheme_ids', JSON.stringify(savedSchemeIds));
  }, [savedSchemeIds]);

  useEffect(() => {
    localStorage.setItem('gns_doc_readiness', JSON.stringify(documentReadiness));
  }, [documentReadiness]);

  useEffect(() => {
    localStorage.setItem('gns_compare_ids', JSON.stringify(compareSchemeIds));
  }, [compareSchemeIds]);

  useEffect(() => {
    localStorage.setItem('gns_notifications', JSON.stringify(notifications));
  }, [notifications]);

  // Auth Helpers
  const login = (userData) => {
    setUser(userData);
    if (userData.role === 'admin') {
      setActiveView('admin');
    } else {
      setActiveView('dashboard');
    }
    setAuthModalOpen(false);
  };

  const logout = () => {
    setUser(null);
    setActiveView('landing');
  };

  // Saved Scheme Toggle
  const toggleSaveScheme = (schemeId) => {
    setSavedSchemeIds(prev => {
      if (prev.includes(schemeId)) {
        return prev.filter(id => id !== schemeId);
      } else {
        return [...prev, schemeId];
      }
    });
  };

  // Scheme Comparison Toggle
  const toggleCompareScheme = (schemeId) => {
    setCompareSchemeIds(prev => {
      if (prev.includes(schemeId)) {
        return prev.filter(id => id !== schemeId);
      } else {
        if (prev.length >= 4) {
          alert("You can compare up to 4 schemes at once.");
          return prev;
        }
        return [...prev, schemeId];
      }
    });
  };

  // Document Readiness Update
  const setDocStatus = (schemeId, docId, status) => {
    const key = `${schemeId}_${docId}`;
    setDocumentReadiness(prev => ({
      ...prev,
      [key]: status
    }));
  };

  // Notification Actions
  const markNotificationRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  // Admin Scheme CRUD
  const addScheme = (newScheme) => {
    const created = {
      ...newScheme,
      id: `scheme-${Date.now()}`,
      verifiedStatus: true,
      startDate: newScheme.startDate || new Date().toISOString().split('T')[0]
    };
    setSchemes(prev => [created, ...prev]);
  };

  const updateScheme = (updatedScheme) => {
    setSchemes(prev => prev.map(s => s.id === updatedScheme.id ? updatedScheme : s));
  };

  const deleteScheme = (schemeId) => {
    setSchemes(prev => prev.filter(s => s.id !== schemeId));
  };

  return (
    <AppContext.Provider value={{
      user,
      login,
      logout,
      userProfile,
      setUserProfile,
      activeView,
      setActiveView,
      schemes,
      addScheme,
      updateScheme,
      deleteScheme,
      savedSchemeIds,
      toggleSaveScheme,
      documentReadiness,
      setDocStatus,
      compareSchemeIds,
      toggleCompareScheme,
      notifications,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
      globalSearchQuery,
      setGlobalSearchQuery,
      selectedSchemeDetail,
      setSelectedSchemeDetail,
      authModalOpen,
      setAuthModalOpen,
      authMode,
      setAuthMode
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
