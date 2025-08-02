import React, { createContext, useContext, useState, ReactNode } from 'react';

interface DrAdminUser {
  id: string;
  name: string;
  role: 'doctor' | 'admin' | 'nurse' | 'staff';
  department: string;
  email: string;
  permissions: string[];
  isOnline: boolean;
  lastActive: string;
}

interface DrAdminContextType {
  currentUser: DrAdminUser | null;
  users: DrAdminUser[];
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserStatus: (userId: string, isOnline: boolean) => void;
  hasPermission: (permission: string) => boolean;
  getUsersByRole: (role: string) => DrAdminUser[];
  getOnlineUsers: () => DrAdminUser[];
}

const DrAdminContext = createContext<DrAdminContextType | undefined>(undefined);

const mockUsers: DrAdminUser[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    role: 'doctor',
    department: 'Cardiology',
    email: 'sarah.johnson@hospital.com',
    permissions: ['patient_view', 'patient_edit', 'prescribe', 'discharge'],
    isOnline: true,
    lastActive: new Date().toISOString(),
  },
  {
    id: '2',
    name: 'Admin John Smith',
    role: 'admin',
    department: 'Administration',
    email: 'john.smith@hospital.com',
    permissions: ['all'],
    isOnline: true,
    lastActive: new Date().toISOString(),
  },
  {
    id: '3',
    name: 'Dr. Michael Chen',
    role: 'doctor',
    department: 'Emergency',
    email: 'michael.chen@hospital.com',
    permissions: ['patient_view', 'patient_edit', 'prescribe', 'emergency'],
    isOnline: false,
    lastActive: new Date(Date.now() - 3600000).toISOString(), // 1 hour ago
  },
  {
    id: '4',
    name: 'Nurse Emily Brown',
    role: 'nurse',
    department: 'ICU',
    email: 'emily.brown@hospital.com',
    permissions: ['patient_view', 'vitals_update', 'medication_admin'],
    isOnline: true,
    lastActive: new Date().toISOString(),
  },
];

export function DrAdminProvider({ children }: { children: ReactNode }) {
  const [currentUser, setCurrentUser] = useState<DrAdminUser | null>(mockUsers[0]); // Default logged in as Dr. Sarah
  const [users, setUsers] = useState<DrAdminUser[]>(mockUsers);
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Default authenticated

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate login - in real app, this would call an API
    const user = users.find(u => u.email === email);
    if (user && password === 'password') { // Simple mock authentication
      setCurrentUser(user);
      setIsAuthenticated(true);
      updateUserStatus(user.id, true);
      return true;
    }
    return false;
  };

  const logout = () => {
    if (currentUser) {
      updateUserStatus(currentUser.id, false);
    }
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const updateUserStatus = (userId: string, isOnline: boolean) => {
    setUsers(prev => prev.map(user => 
      user.id === userId 
        ? { ...user, isOnline, lastActive: new Date().toISOString() }
        : user
    ));
  };

  const hasPermission = (permission: string): boolean => {
    if (!currentUser) return false;
    return currentUser.permissions.includes('all') || currentUser.permissions.includes(permission);
  };

  const getUsersByRole = (role: string): DrAdminUser[] => {
    return users.filter(user => user.role === role);
  };

  const getOnlineUsers = (): DrAdminUser[] => {
    return users.filter(user => user.isOnline);
  };

  return (
    <DrAdminContext.Provider
      value={{
        currentUser,
        users,
        isAuthenticated,
        login,
        logout,
        updateUserStatus,
        hasPermission,
        getUsersByRole,
        getOnlineUsers,
      }}
    >
      {children}
    </DrAdminContext.Provider>
  );
}

export const useDrAdmin = () => {
  const context = useContext(DrAdminContext);
  if (context === undefined) {
    throw new Error('useDrAdmin must be used within a DrAdminProvider');
  }
  return context;
};