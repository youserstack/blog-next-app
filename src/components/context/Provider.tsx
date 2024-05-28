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
  const pathname = usePathname();

  const signout = async () => {
    const response = await fetch(`${process.env.ROOT_URL}/api/auth/signout`);
    const { message } = await response.json();
    console.log({ message });

    if (response.ok) {
      localStorage.removeItem("accessToken");
      router.push("/auth/signin");
      router.refresh();
    } else {
      console.log("로그아웃을 실패했습니다.");
    }
  };

  useEffect(() => {
    const handleRefreshAuth = async () => {
      try {
        // accessToken을 리프레시요청한다.
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch("/api/auth/refresh", {
          headers: {
            authorization: `bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const { newAccessToken } = await response.json();
          if (!newAccessToken) return;
          localStorage.setItem("accessToken", newAccessToken);
        } else {
          signout();
        }
      } catch (error) {
        console.log("액세스토큰 갱신을 실패했습니다.");
        console.log({ error });
      }
    };

    handleRefreshAuth();
  }, []);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
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

        signout,
      }}
    >
      {children}
    </Context.Provider>
  );
}
