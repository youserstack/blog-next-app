"use client";

import { createContext } from "react";
import { ThemeProvider } from "./ThemeContext"; // 서버 프로퍼티를 받는 컨텍스트 컴포넌트
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { CategoryProvider } from "./CategoryContext";
import { SessionProvider } from "next-auth/react";

interface ProviderParameters {
  children: React.ReactNode;
  mode: string;
  user: string;
}

export const Context = createContext({});
export const Provider = ({ children, mode, user }: ProviderParameters) => {
  return (
    <SessionProvider>
      <ThemeProvider mode={mode}>
        <AuthProvider user={user}>
          <ModalProvider>
            <CategoryProvider>{children}</CategoryProvider>
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};
