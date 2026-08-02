import React, { createContext, useContext, useState, useEffect } from 'react';
import { saveProfileToSupabase, saveOrganizationToSupabase, isSupabaseConfigured } from '../services/supabaseClient';

export interface UserProfile {
  name: string;
  role: string;
  email: string;
  initials: string;
  caMembershipNumber: string;
}

export interface OrganizationInfo {
  name: string;
  gstin: string;
  pan: string;
  address: string;
  financialYearStart: string;
}

interface AppContextType {
  user: UserProfile;
  organization: OrganizationInfo;
  isOnboarded: boolean;
  updateUser: (updated: Partial<UserProfile>) => void;
  updateOrganization: (updated: Partial<OrganizationInfo>) => void;
  completeOnboarding: (user: UserProfile, org: OrganizationInfo) => Promise<void>;
  resetOnboarding: () => void;
}

const defaultUser: UserProfile = {
  name: "John Sharma",
  role: "Chartered Accountant",
  email: "john.sharma@vyaparmandap.in",
  initials: "JS",
  caMembershipNumber: "CA-190482"
};

const defaultOrg: OrganizationInfo = {
  name: "M/S Sharma Traders",
  gstin: "27AABCS9876E1Z2",
  pan: "AABCS9876E",
  address: "Bandra West, Mumbai, Maharashtra",
  financialYearStart: "01-April-2026"
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOnboarded, setIsOnboarded] = useState<boolean>(() => {
    const saved = localStorage.getItem("vyapar_onboarded");
    return saved ? JSON.parse(saved) : true; // Default true so demo loads seamlessly
  });

  const [user, setUser] = useState<UserProfile>(() => {
    const saved = localStorage.getItem("vyapar_user");
    return saved ? JSON.parse(saved) : defaultUser;
  });

  const [organization, setOrganization] = useState<OrganizationInfo>(() => {
    const saved = localStorage.getItem("vyapar_org");
    return saved ? JSON.parse(saved) : defaultOrg;
  });

  useEffect(() => {
    localStorage.setItem("vyapar_user", JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem("vyapar_org", JSON.stringify(organization));
  }, [organization]);

  useEffect(() => {
    localStorage.setItem("vyapar_onboarded", JSON.stringify(isOnboarded));
  }, [isOnboarded]);

  const updateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => {
      const name = updated.name !== undefined ? updated.name : prev.name;
      const parts = name.trim().split(" ");
      const initials = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();
      const newProf = { ...prev, ...updated, initials };
      
      // Async sync to Supabase (fire & forget for instant local UI performance)
      void saveProfileToSupabase({
        full_name: newProf.name,
        email: newProf.email,
        role: newProf.role,
        ca_membership_number: newProf.caMembershipNumber
      });

      return newProf;
    });
  };

  const updateOrganization = (updated: Partial<OrganizationInfo>) => {
    setOrganization(prev => {
      const newOrg = { ...prev, ...updated };
      
      void saveOrganizationToSupabase({
        name: newOrg.name,
        gstin: newOrg.gstin,
        pan: newOrg.pan,
        address: newOrg.address,
        financial_year_start: newOrg.financialYearStart
      });

      return newOrg;
    });
  };

  const completeOnboarding = async (newUser: UserProfile, newOrg: OrganizationInfo) => {
    // 1. Save locally to client device
    setUser(newUser);
    setOrganization(newOrg);
    setIsOnboarded(true);

    // 2. Sync to Supabase central database
    await saveProfileToSupabase({
      full_name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      ca_membership_number: newUser.caMembershipNumber
    });

    await saveOrganizationToSupabase({
      name: newOrg.name,
      gstin: newOrg.gstin,
      pan: newOrg.pan,
      address: newOrg.address,
      financial_year_start: newOrg.financialYearStart
    });
  };

  const resetOnboarding = () => {
    setIsOnboarded(false);
  };

  return (
    <AppContext.Provider value={{ 
      user, 
      organization, 
      isOnboarded, 
      updateUser, 
      updateOrganization, 
      completeOnboarding, 
      resetOnboarding 
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
