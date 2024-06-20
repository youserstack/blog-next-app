"use client";

import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";

export const Context = createContext({});

export default function Provider({ children }: { children: React.ReactNode }) {
  // 모달창을 스위칭할때 사용한다.
  const [currentModal, setCurrentModal] = useState("");

  // 서버로부터 요청한 카테고리 데이터를 이곳에 저장한다.
  const [categories, setCategories] = useState([]);

  // 새 카테고리 항목을 생성할때 사용한다.
  const [parentCategories, setParentCategories] = useState<string[]>([]);

  // 전체 카테고리 경로이고 새 포스트 글을 생성할때 해당 카테고리를 지정해야하는데 그때에 사용한다.
  const [categoryPaths, setCategoryPaths] = useState<string[]>([]);

  // 로그인 상태
  const [isSignedIn, setIsSignedIn] = useState(false);
  const router = useRouter();

  const signout = async () => {
    try {
      const response = await fetch(`${process.env.ROOT_URL}/api/auth/signout`);
      const data = await response.json();

      if (!response.ok) throw new Error("로그아웃을 실패했습니다.");
      console.log({ data });
      localStorage.removeItem("accessToken");
      setIsSignedIn(false);
      router.refresh();
    } catch (error) {
      console.error(error);
      return error;
    }
  };

  const refreshAccessToken = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;
      const response = await fetch("/api/auth/refresh");
      const data = await response.json();

      if (!response.ok) throw new Error(data.error.message || "accessToken 갱신을 실패했습니다.");
      localStorage.setItem("accessToken", data.newAccessToken);
      setIsSignedIn(true);
    } catch (error) {
      console.error(error);
      signout();
    }
  };

  // 인터벌 액세스 토큰 갱신
  useEffect(() => {
    refreshAccessToken();
    const intervalId = setInterval(refreshAccessToken, 1000 * 60 * 15); // 15분마다 토큰 갱신 (1초*60*15=15분)
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
  }, []);

  // useEffect(() => {
  //   if (categories.length) console.log({ categories });
  // }, [categories]);

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
        isSignedIn,
        signout,
        refreshAccessToken,
        setIsSignedIn,

        // 컨텍스트에 카테고리 저장
        setCategories,
      }}
    >
      {children}
    </Context.Provider>
  );
}
