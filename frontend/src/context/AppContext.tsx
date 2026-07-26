import React, { createContext, useContext, useState, useEffect } from 'react';

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
  updateUser: (updated: Partial<UserProfile>) => void;
  updateOrganization: (updated: Partial<OrganizationInfo>) => void;
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

  const updateUser = (updated: Partial<UserProfile>) => {
    setUser(prev => {
      const name = updated.name !== undefined ? updated.name : prev.name;
      const parts = name.trim().split(" ");
      const initials = parts.length > 1 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.substring(0, 2).toUpperCase();
      return { ...prev, ...updated, initials };
    });
  };

  const updateOrganization = (updated: Partial<OrganizationInfo>) => {
    setOrganization(prev => ({ ...prev, ...updated }));
  };

  return (
    <AppContext.Provider value={{ user, organization, updateUser, updateOrganization }}>
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
