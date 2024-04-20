"use client";

import SearchBar from "@/components/SearchBar";
import Etc from "@/components/Etc";
import Nav from "@/components/Nav";
import UserArea from "@/components/UserArea";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const ref = useRef<HTMLElement>(null);
  const [previousScrollY, setPreviousScrollY] = useState(0);

  const handleScroll = (e: any) => {
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const handleResize = () => {
    const header = ref.current;
    if (!header) return;

    const main = document.querySelector("main");
    if (!main) return;
    main.style.paddingTop = header.offsetHeight + "px";

    const firstSection = document.querySelector("main > section:nth-of-type(1)") as HTMLElement;
    if (!firstSection) return;
    firstSection.style.minHeight = window.innerHeight - header.offsetHeight + "px";
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <header ref={ref}>
      <div className="header-upper-wrapper">
        <section className="header-upper">
          <h2>BLOG</h2>
          <SearchBar />
          <UserArea />
        </section>
      </div>
      <div className="header-lower-wrapper">
        <section className="header-lower">
          <Nav />
          <Etc />
        </section>
      </div>
    </header>
  );
}
