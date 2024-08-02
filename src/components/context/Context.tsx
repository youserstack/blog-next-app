"use client";

import { createContext, useState } from "react";
import { ThemeProvider } from "./ThemeContext"; // 서버 프로퍼티를 받는 컨텍스트 컴포넌트
import { AuthProvider } from "./AuthContext";
import { LoadingProvider } from "./LoadingContext";
import { ModalProvider } from "./ModalContext";
import { CategoryProvider } from "./CategoryContext";
import combineProviders from "./utils/combineProviders";

const Providers = combineProviders([
  AuthProvider,
  LoadingProvider,
  ModalProvider,
  CategoryProvider,
]);

export const Context = createContext({});
export const Provider = ({ children, mode }: { children: React.ReactNode; mode: string }) => {
  // Dynamic Urls
  const [dynamicUrl, setDynamicUrl] = useState("");

  return (
    <Context.Provider
      value={{
        // 데이터 패칭 URLs
        dynamicUrl,
        setDynamicUrl,
      }}
    >
      <ThemeProvider mode={mode}>
        <Providers>{children}</Providers>
      </ThemeProvider>
    </Context.Provider>
  );
};
