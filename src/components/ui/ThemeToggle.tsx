"use client";

import { useContext, useEffect } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { Context } from "@/components/context/Provider";
import { Box } from "@mui/material";

export default function ThemeToggle() {
  // 테마모드 초기화
  const { theme, setTheme, toggleTheme }: any = useContext(Context);

  // 운영체제에 의한 테마변경
  useEffect(() => {
    // CSS미디어쿼리 (os 테마를 가져오는데 css 에 설정되지 않더라도 사용할 수 있다.)
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    // 미디어쿼리 이벤트 파라미터로부터 현재 os 테마를 가져올 수 있다. (동기화 작업을 할 수 있다.)
    const handleChange = (e: MediaQueryListEvent) => {
      e.matches ? setTheme("dark") : setTheme("light");
    };

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [setTheme]);

  // 포커싱에 의한 테마변경
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const osTheme = isDarkTheme ? "dark" : "light";
        setTheme(osTheme);
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [setTheme]);

  // 토글에 의한 테마변경
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Box
      className="theme-toggle"
      onClick={toggleTheme}
      sx={{
        width: "40px",
        height: "22px",
        borderRadius: "20px",
        display: "flex",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
        overflowX: "hidden",
        backgroundColor: theme === "light" ? "#fff" : "#000",
      }}
    >
      <div
        className="moving-ball"
        style={{
          position: "absolute",
          left: "2px",
          transition: "all 1s",
          display: "flex",
          transform: theme === "light" ? "translateX(0)" : "translateX(20px)",
        }}
      >
        {theme === "light" ? <IoIosSunny color="orange" /> : <IoIosMoon color="yellow" />}
      </div>
    </Box>
  );
}
