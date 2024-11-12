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

interface IContext {
  headerHidden: boolean;
  setHeaderHidden: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Context = createContext<IContext>({
  headerHidden: false,
  setHeaderHidden: () => {},
});
export const Provider = ({ children, mode }: Props) => {
  const [previousScrollY, setPreviousScrollY] = useState(0);
  const [headerHidden, setHeaderHidden] = useState(false); // 헤더 숨김 상태 관리

  const handleScroll = () => {
    const header = document.querySelector("header") as HTMLElement;
    if (!header) return console.log("헤더가 없어서 스크롤 이벤트가 동작하지 않습니다.");

    const currentScrollY = window.scrollY;

    if (currentScrollY <= 200) {
      header.style.transform = "translateY(0)";
      setHeaderHidden(false);
    } else {
      if (currentScrollY > previousScrollY) {
        header.style.transform = "translateY(-100%)";
        setHeaderHidden(true); // 스크롤 내리면 헤더 숨김
      } else {
        header.style.transform = "translateY(0)";
        setHeaderHidden(false); // 스크롤 올리면 헤더 표시
      }
    }

    setPreviousScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [previousScrollY]);

  return (
    <Context.Provider value={{ headerHidden, setHeaderHidden }}>
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
    </Context.Provider>
  );
};
