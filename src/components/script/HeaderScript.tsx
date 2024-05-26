"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderScript() {
  // scroll
  const [previousScrollY, setPreviousScrollY] = useState(0);

  const handleScroll = (e: any) => {
    const header: HTMLElement | null = document.querySelector("header");
    if (!header) return;

    const currentScrollY = window.scrollY;

    if (window.scrollY <= 200) {
      // console.log('scroll top area')
      header.style.transform = "translateY(0)";
    } else {
      if (currentScrollY > previousScrollY) {
        // console.log("scroll down");
        header.style.transform = "translateY(-70px)";
      } else {
        // console.log("scroll up");
        header.style.transform = "translateY(0)";
      }
    }

    setPreviousScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  });

  return null;
}
