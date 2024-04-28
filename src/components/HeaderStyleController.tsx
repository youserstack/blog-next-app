"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function HeaderStyleController() {
  // scroll
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

  // refresh auth
  const router = useRouter();
  const handleRefreshAuth = async () => {
    try {
      const response = await fetch("/api/auth/refresh", { method: "get" });
      const { accessToken } = await response.json();
      if (response.ok && accessToken) {
        window.localStorage.setItem("accessToken", accessToken);
      } else {
        window.localStorage.removeItem("accessToken");
        router.push("/auth/signin");
      }
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    handleRefreshAuth();
  }, [handleRefreshAuth]);

  return null;
}
