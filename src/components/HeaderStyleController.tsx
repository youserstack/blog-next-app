"use client";

import { useEffect, useState } from "react";

export default function HeaderStyleController() {
  const [previousScrollY, setPreviousScrollY] = useState(0);

  const handleScroll = (e: any) => {
    const header: HTMLElement | null = document.querySelector("header");
    if (!header) return;

    const currentScrollY = window.scrollY;

    if (window.scrollY <= 200) {
      header.style.transform = "translateY(0)";
    } else {
      if (currentScrollY > previousScrollY) {
        header.style.transform = "translateY(-70px)";
      } else {
        header.style.transform = "translateY(0)";
      }
    }

    setPreviousScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return null;
}
