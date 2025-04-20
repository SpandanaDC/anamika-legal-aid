
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  age?: number;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  // This is a mock implementation - in a real app, this would connect to an authentication service
  const login = async (email: string, password: string) => {
    // Mock successful login
    setUser({
      id: '1',
      name: 'Demo User',
      email: email,
      phone: '+91 9876543210',
      age: 30
    });
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }) => {
    // Mock successful registration
    setUser({
      id: '1',
      name: userData.name,
      email: userData.email,
      phone: userData.phone,
      age: userData.age
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
