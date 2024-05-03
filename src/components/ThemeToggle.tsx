"use client";

import { useEffect, useState } from "react";
import "../styles/ThemeToggle.scss";

export default function ThemeToggle() {
  // 브라우저의 로컬스토리지에서 컬러모드를 확인하고 없으면 기본값을 라이트모드로 설정한다.
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // 운영체제의 컬러모드에 의한 브라우저의 컬러모드 변경
  useEffect(() => {
    // matchMedia 는 입력한 문자열을 통해서 matcing 된 MediaQueryList 객체를 반환한다.
    const mediaQueryList = window.matchMedia("(prefers-color-scheme: dark)");

    // 미디어쿼리리스트 객체에 이벤트를 등록한다.
    mediaQueryList.addEventListener("change", (e) => {
      // e.matches 를 통해서 운영체제의 컬러모드를 확인할 수 있다.
      if (e.matches) {
        window.document.body.classList.add("dark");
        setTheme("dark");
      } else {
        window.document.body.classList.remove("dark");
        setTheme("light");
      }
    });
  }, []);

  // 브라우저의 컬러모드에 의한 변경
  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="theme-toggle" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
      <div className="moving-ball"></div>
    </div>
  );
}
