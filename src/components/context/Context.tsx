"use client";

import { createContext, useEffect, useState } from "react";
import { ThemeProvider } from "./ThemeContext"; // 서버 프로퍼티를 받는 컨텍스트 컴포넌트
import { AuthProvider } from "./AuthContext";
import { ModalProvider } from "./ModalContext";
import { CategoryProvider } from "./CategoryContext";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
  mode: string;
  // user: string;
}

export const Context = createContext({});
export const Provider = ({ children, mode }: Props) => {
  const [previousScrollY, setPreviousScrollY] = useState(0);

  const handleScroll = (e: any) => {
    const header = document.querySelector("header") as HTMLHeadElement;
    if (!header) return console.log("헤더가 없어서 스크롤이벤트가 동작하지 않고 있습니다.");

    const currentScrollY = window.scrollY;

    if (window.scrollY <= 200) {
      // console.log('scroll top area')
      header.style.transform = "translateY(0)";
    } else {
      if (currentScrollY > previousScrollY) {
        // console.log("scroll down");
        header.style.transform = "translateY(-70px)";
      } else {
        // console.log("scroll up");
        header.style.transform = "translateY(0)";
      }
    }

    setPreviousScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return (
    <SessionProvider>
      <ThemeProvider mode={mode}>
        <AuthProvider
        // user={user}
        >
          <ModalProvider>
            <CategoryProvider>{children}</CategoryProvider>
          </ModalProvider>
        </AuthProvider>
      </ThemeProvider>
    </SessionProvider>
  );
};
