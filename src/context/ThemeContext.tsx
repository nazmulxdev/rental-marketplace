"use client";
import { createContext } from "react";

// defining the type of context
export interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);
export default ThemeContext;
