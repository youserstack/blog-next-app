"use client";

import { useEffect, useState } from "react";
import { IoIosMoon, IoIosSunny } from "react-icons/io";
import "../../styles/ThemeToggle.scss";

export default function ThemeToggle() {
  // 테마모드 초기화
  const getInitialTheme = () => {
    // 로컬스토리지로부터 캐시된 테마가 있다면 사용한다.
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) return storedTheme;
    // 캐시된 테마가 없다면 운영체제 테마를 사용한다.
    const osTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    return osTheme;
  };
  const [theme, setTheme] = useState(getInitialTheme);

  // OS 테마에 의한 브라우저 테마변경
  useEffect(() => {
    // 미디어쿼리
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    // CSS 미디어쿼리 체인지 핸들러
    // OS 테마모드와 동기화한다.
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
