"use client";

import { useRouter } from "next/navigation";
import { createContext, useCallback, useEffect, useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

export const Context = createContext({});

export default function Provider({
  children,
  mode: storedMode,
}: {
  children: React.ReactNode;
  mode: string;
}) {
  // Theme
  const [mode, setMode] = useState(storedMode ? storedMode : "light");
  const toggleTheme = () => setMode((mode) => (mode === "light" ? "dark" : "light"));

  // Loading
  const [isLoading, setIsLoading] = useState(false);

  // Modal
  const [modal, setModal] = useState("");
  const openModal = (type: string) => setModal(type);
  const closeModal = () => setModal("");

  // Auth
  const [user, setUser] = useState(null);

  //
  const [categories, setCategories] = useState([]); // 서버로부터 요청한 카테고리 데이터를 이곳에 저장한다.
  const [parentCategories, setParentCategories] = useState<string[]>([]); // 새 카테고리 항목을 생성할때 사용한다.
  const [categoryPaths, setCategoryPaths] = useState<string[]>([]); // 전체 카테고리 경로이고 새 포스트 글을 생성할때 해당 카테고리를 지정해야하는데 그때에 사용한다.
  const router = useRouter();

  // Dynamic Urls
  const [dynamicUrl, setDynamicUrl] = useState("");

  const signout = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.ROOT_URL}/api/auth/signout`);
      const data = await response.json();

      if (!response.ok) throw new Error("로그아웃을 실패했습니다.");
      console.log({ data });
      localStorage.removeItem("accessToken");
      setUser(null);
      router.refresh();
    } catch (error) {
      console.error(error);
      return error;
    }
  }, [router]);

  const refreshAccessToken = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) return;
      const response = await fetch(`${process.env.ROOT_URL}/api/auth/refresh`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "accessToken 갱신을 실패했습니다.");
      else localStorage.setItem("accessToken", data.newAccessToken);
    } catch (error) {
      console.error(error);
      signout();
    }
  }, [signout]);

  // 인터벌 액세스 토큰 갱신
  useEffect(() => {
    refreshAccessToken();
    const intervalId = setInterval(refreshAccessToken, 1000 * 60 * 15); // 15분마다 토큰 갱신 (1초*60*15=15분)
    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 클리어
  }, [refreshAccessToken]);

  return (
    <Context.Provider
      value={{
        // 테마
        mode,
        setMode,
        toggleTheme,
        // 로딩
        isLoading,
        setIsLoading,
        // 모달
        modal,
        openModal,
        closeModal,
        // 인증
        user,
        setUser,
        signout,
        refreshAccessToken,
        // 카테고리
        categoryPaths,
        parentCategories,
        setCategoryPaths,
        setParentCategories,
        setCategories,
        // 데이터 패칭 URLs
        dynamicUrl,
        setDynamicUrl,
      }}
    >
      <ThemeProvider theme={mode === "light" ? lightTheme : darkTheme}>
        <CssBaseline enableColorScheme />
        {children}
      </ThemeProvider>
    </Context.Provider>
  );
}

const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#3f50b5",
      light: "#757ce8",
      dark: "#002884",
    },
  },
});
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#757ce8",
    },
  },
});
