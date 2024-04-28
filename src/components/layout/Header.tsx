import SearchBar from "@/components/SearchBar";
import Etc from "@/components/Etc";
import Nav from "@/components/Nav";
import UserArea from "@/components/UserArea";
// import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import HeaderStyleController from "@/components/HeaderStyleController";

export default function Header() {
  console.log("[Header-client-component]");

  // scroll
  // const ref = useRef<HTMLElement>(null);
  // const [previousScrollY, setPreviousScrollY] = useState(0);

  // const handleScroll = (e: any) => {
  //   const header: HTMLElement | null = ref.current;
  //   if (!header) return;

  //   const currentScrollY = window.scrollY;

  //   if (window.scrollY <= 200) {
  //     header.style.transform = "translateY(0)";
  //   } else {
  //     if (currentScrollY > previousScrollY) {
  //       header.style.transform = "translateY(-70px)";
  //     } else {
  //       header.style.transform = "translateY(0)";
  //     }
  //   }

  //   setPreviousScrollY(currentScrollY);
  // };

  // useEffect(() => {
  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, [handleScroll]);

  // refresh auth
  // const [auth, setAuth] = useState("");
  // useEffect(() => {
  //   const handleRefreshAuth = async () => {
  //     try {
  //       const response = await fetch("/api/auth/refresh", { method: "get" });
  //       const { accessToken } = await response.json();
  //       setAuth(accessToken);
  //     } catch (error) {
  //       console.log({ error });
  //     }
  //   };

  //   handleRefreshAuth();
  // }, []);

  return (
    <header>
      <div className="header-upper-wrapper">
        <section className="header-upper">
          <h1>
            <Link href={"/"}>blog</Link>
          </h1>
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
      <HeaderStyleController />
    </header>
  );
}
