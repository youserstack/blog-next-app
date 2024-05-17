"use client";

import { createContext, useState } from "react";

export const Context = createContext({});

export default function Provider({ children }: { children: React.ReactNode }) {
  const [categoryPaths, setCategoryPaths] = useState<string[]>([]);
  const [parentCategories, setParentCategories] = useState<string[]>([""]);

  const [currentModal, setCurrentModal] = useState("");

  return (
    <Context.Provider
      value={{
        // 카테고리 생성 시 필요
        categoryPaths,
        setCategoryPaths,

        parentCategories,
        setParentCategories,

        currentModal,
        setCurrentModal,
      }}
    >
      {children}
    </Context.Provider>
  );
}
