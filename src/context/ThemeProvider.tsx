"use client";

import { useEffect, useState, ReactNode } from "react";
import ThemeContext, { ThemeContextType } from "./ThemeContext";

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // loading theme from local storage

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as
      | "light"
      | "dark"
      | null;
    const initialTheme = storedTheme ?? "light";
    //   storing theme in the state
    setTheme(initialTheme);

    // setting theme in the data-theme in html attribute

    document.documentElement.setAttribute("data-theme", initialTheme);
    // storing theme in the local storage for consistency of theme
    localStorage.setItem("theme", initialTheme);
  }, []);

  //   toggle theme between light and dark
  const toggleTheme = () => {
    const newTheme: "light" | "dark" = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  const contextValue: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
