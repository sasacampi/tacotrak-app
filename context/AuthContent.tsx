"use client";

import type React from "react";
import { createContext, useState, useContext, useEffect } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in
  useEffect(() => {
    // In a real app, this would check for a stored token or session
    // For this mock, we'll just simulate a loading state
    setTimeout(() => {
      setIsLoading(false);
      // Default to not authenticated
      setIsAuthenticated(false);
    }, 1000);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // In a real app, this would make an API call to authenticate
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock credentials check
        if (email === "user@example.com" && password === "password123") {
          setIsAuthenticated(true);
          resolve(true);
        } else {
          resolve(false);
        }
      }, 1000);
    });
  };

  const logout = () => {
    // In a real app, this would clear tokens/session
    setIsAuthenticated(false);
  };

  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    // In a real app, this would make an API call to register
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock successful registration
        setIsAuthenticated(true);
        resolve(true);
      }, 1000);
    });
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
