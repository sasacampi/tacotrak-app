"use client";

import type React from "react";
import { createContext, useState, useContext } from "react";
import { useColorScheme } from "react-native";

type ThemeType = "light" | "dark" | "system";

interface ThemeContextType {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
  isDarkMode: boolean;
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
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>("system");

  const isDarkMode =
    theme === "system" ? colorScheme === "dark" : theme === "dark";

  const colors = {
    background: isDarkMode ? "#121212" : "#FFFFFF",
    card: isDarkMode ? "#1E1E1E" : "#F5F5F5",
    text: isDarkMode ? "#FFFFFF" : "#000000",
    border: isDarkMode ? "#2C2C2C" : "#E0E0E0",
    primary: "#4CAF50", // Green for nutrition theme
    secondary: "#8BC34A", // Light green
    accent: "#CDDC39", // Lime
    success: "#4CAF50",
    warning: "#FFC107",
    danger: "#F44336",
    gray: isDarkMode ? "#AAAAAA" : "#757575",
    lightGray: isDarkMode ? "#2C2C2C" : "#EEEEEE",
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDarkMode, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
