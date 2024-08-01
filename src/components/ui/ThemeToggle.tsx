"use client";

import { useContext, useEffect } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import { Context } from "@/components/context/Provider";
import { Box } from "@mui/material";

export default function ThemeToggle() {
  // 테마모드 초기화
  const { mode, setMode, toggleTheme }: any = useContext(Context);

  // 토글에 의한 테마변경
  useEffect(() => {
    document.cookie = `mode=${mode}; expires=31536000; path=/`;
  }, [mode]);

  // 운영체제에 의한 테마변경
  useEffect(() => {
    // CSS미디어쿼리 (os 테마를 가져오는데 css 에 설정되지 않더라도 사용할 수 있다.)
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    // 미디어쿼리 이벤트 파라미터로부터 현재 os 테마를 가져올 수 있다. (동기화 작업을 할 수 있다.)
    const handleChange = (e: MediaQueryList | MediaQueryListEvent) => {
      e.matches ? setMode("dark") : setMode("light");
    };

    // handleChange(mediaQueryList);

    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, [setMode]);

  // 포커싱에 의한 테마변경
  // useEffect(() => {
  //   const handleVisibilityChange = () => {
  //     if (document.visibilityState === "visible") {
  //       const isDarkTheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
  //       const osTheme = isDarkTheme ? "dark" : "light";
  //       setMode(osTheme);
  //     }
  //   };

  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  // }, [setMode]);

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
        backgroundColor: mode === "light" ? "#fff" : "#000",
      }}
    >
      <div
        className="moving-ball"
        style={{
          position: "absolute",
          left: "2px",
          transition: "all 1s",
          display: "flex",
          transform: mode === "light" ? "translateX(0)" : "translateX(20px)",
        }}
      >
        {mode === "light" ? <IoIosSunny color="orange" /> : <IoIosMoon color="yellow" />}
      </div>
    </Box>
  );
}
