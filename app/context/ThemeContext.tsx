"use client";

import type React from "react";
import { createContext, useContext } from "react";

interface ThemeContextType {
  colors: {
    background: string;
    card: string;
    text: string;
    border: string;
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    warning: string;
    danger: string;
    gray: string;
    lightGray: string;
  };
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const colors = {
    background: "#FFFFFF",
    card: "#FFFFFF",
    text: "#333333",
    border: "#F0F0F0",
    primary: "#007AFF",
    secondary: "#64DFDF",
    accent: "#72EFDD",
    success: "#4CAF50",
    warning: "#FFC107",
    danger: "#F44336",
    gray: "#9E9E9E",
    lightGray: "#F5F5F5",
  };

  return (
    <ThemeContext.Provider value={{ colors }}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export default ThemeProvider;
