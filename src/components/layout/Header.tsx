"use client";

import { useEffect, useRef, useState } from "react";

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [previousScrollY, setPreviousScrollY] = useState(0);

  const handler = (e: any) => {
    const header: HTMLElement | null = ref.current;
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
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, [handler]);

  return (
    <header ref={ref}>
      <section className="header-upper">
        <h1>header</h1>
      </section>
      <section></section>
    </header>
  );
}
