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
  // Fixed light theme colors
  const colors = {
    background: "#F8F8F8",
    card: "#FFFFFF",
    text: "#333333",
    border: "#F0F0F0",
    primary: "#e950a3", // Rosa
    secondary: "#64DFDF", // Teal
    accent: "#72EFDD", // Mint
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
