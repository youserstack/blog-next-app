"use client";

import { createContext, useState } from "react";

export const Context = createContext({});

export default function Provider({ children }: { children: React.ReactNode }) {
  const [parentCategories, setParentCategories] = useState<string[]>([""]);

  return (
    <Context.Provider value={{ parentCategories, setParentCategories }}>
      {children}
    </Context.Provider>
  );
}
