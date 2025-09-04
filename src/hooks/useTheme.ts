"use client";

import { useContext } from "react";
import ThemeContext, { ThemeContextType } from "../context/ThemeContext";

const useTheme = (): ThemeContextType => {
  const themeData = useContext(ThemeContext);
  if (!themeData) {
    throw new Error("Use theme must be used inside ThemeProvider.");
  }
  return themeData;
};

export default useTheme;
