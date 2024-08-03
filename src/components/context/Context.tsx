"use client";

import { createContext } from "react";
import { ThemeProvider } from "./ThemeContext"; // 서버 프로퍼티를 받는 컨텍스트 컴포넌트
import { AuthProvider } from "./AuthContext";
import { LoadingProvider } from "./LoadingContext";
import { ModalProvider } from "./ModalContext";
import { CategoryProvider } from "./CategoryContext";
import { SwrProvider } from "./SwrContext";

export const Context = createContext({});
export const Provider = ({ children, mode }: { children: React.ReactNode; mode: string }) => {
  return (
    <ThemeProvider mode={mode}>
      <AuthProvider>
        <LoadingProvider>
          <ModalProvider>
            <CategoryProvider>
              <SwrProvider>{children}</SwrProvider>
            </CategoryProvider>
          </ModalProvider>
        </LoadingProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};
