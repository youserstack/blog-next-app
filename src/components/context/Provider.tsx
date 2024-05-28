"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const Context = createContext({});

export default function Provider({ children }: { children: React.ReactNode }) {
  // 모달창을 팝업시키기 위해서 필요한 상태
  const [currentModal, setCurrentModal] = useState("");

  // 새로운 카테고리 생성을 위해서 필요한 상태
  const [parentCategories, setParentCategories] = useState<string[]>([]);

  // 현재 카테고리 포스트 데이터를 가져오기 위해서 필요한 상태
  const [categoryPaths, setCategoryPaths] = useState<string[]>([]);

  // refresh accessToken
  const router = useRouter();

  const signout = async () => {
    try {
      const response = await fetch(`${process.env.ROOT_URL}/api/auth/signout`);
      const { message } = await response.json();
      console.log({ message });

      if (response.ok) {
        localStorage.removeItem("accessToken");
        router.refresh();
      } else {
        throw new Error("로그아웃을 실패했습니다.");
      }
    } catch (error) {
      console.error("로그아웃 요청 중 에러가 발생했습니다.", error);
    }
  };

  const refreshAccessToken = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;
      const response = await fetch("/api/auth/refresh", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        const { newAccessToken } = await response.json();
        if (!newAccessToken) return;
        localStorage.setItem("accessToken", newAccessToken);
      } else {
        throw new Error("no newAccessToken");
      }
    } catch (error) {
      console.error("액세스 토큰 갱신을 실패했습니다.", error);
      signout();
    }
  };

  useEffect(() => {
    refreshAccessToken();
    const intervalId = setInterval(refreshAccessToken, 1000 * 60 * 15); // 15분마다 토큰 갱신 (1초*60*15=15분)
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

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

        // 인증
        signout,
        refreshAccessToken,
      }}
    >
      {children}
    </Context.Provider>
  );
}
