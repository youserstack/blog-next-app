"use client";

import { createContext, useState } from "react";

export const Context = createContext({});

export default function Provider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<string[]>([]);
  const [parentCategories, setParentCategories] = useState<string[]>([""]);

  return (
    <Context.Provider
      value={{
        categories,
        setCategories,
        parentCategories,
        setParentCategories,
      }}
    >
      {children}
    </Context.Provider>
  );
}
