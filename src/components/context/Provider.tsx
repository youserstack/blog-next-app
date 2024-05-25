"use client";

import { createContext, useState } from "react";

export const Context = createContext({});

export default function Provider({ children }: { children: React.ReactNode }) {
  // 모달창을 팝업시키기 위해서 필요한 상태
  const [currentModal, setCurrentModal] = useState("");

  // 새로운 카테고리 생성을 위해서 필요한 상태
  const [parentCategories, setParentCategories] = useState<string[]>([]);

  // 현재 카테고리 포스트 데이터를 가져오기 위해서 필요한 상태
  const [categoryPaths, setCategoryPaths] = useState<string[]>([]);

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
