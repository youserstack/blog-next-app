"use client";

import { useEffect, useState } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import "./ThemeToggle.scss";

export default function ThemeToggle() {
  // 테마모드 초기화
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return;
    const osTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    setTheme(osTheme);
  }, []);

  // OS 테마에 의한 브라우저 테마변경
  useEffect(() => {
    // CSS미디어쿼리 (os 테마를 가져오는데 css 에 설정되지 않더라도 사용할 수 있다.)
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");
    // console.log({ mediaQueryList });

    // 미디어쿼리 이벤트 파라미터로부터 현재 os 테마를 가져올 수 있다. (동기화 작업을 할 수 있다.)
    const handleChange = (e: MediaQueryListEvent) => {
      e.matches ? setTheme("dark") : setTheme("light");
    };

    // 이벤트 등록과 제거
    mediaQueryList.addEventListener("change", handleChange);
    return () => mediaQueryList.removeEventListener("change", handleChange);
  }, []);

  // 브라우저 포커싱에 의한 테마변경
  useEffect(() => {
    // 비저블러티 체인지 핸들러
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        const osTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
        setTheme(osTheme);
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  // 브라우저 테마에 의한 변경
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <div className="moving-ball">
        {theme === "light" ? <IoIosSunny color="orange" /> : <IoIosMoon color="yellow" />}
      </div>
    </div>
  );
}
