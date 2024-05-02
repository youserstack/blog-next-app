"use client";

import { createContext, useState } from "react";

export const ThemeContext = createContext("");

export const ThemeContextProvider = ({ children }: any) => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== undefined) {
      return localStorage.getItem("theme") || "light";
    } else {
      return "light";
    }
  });

  return (
    <ThemeContext.Provider value={theme || localStorage.getItem("theme") || "light"}>
      {children}
    </ThemeContext.Provider>
  );
};
