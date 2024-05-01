import SearchBar from "@/components/SearchBar";
import Etc from "@/components/Etc";
import Nav from "@/components/Nav";
import UserArea from "@/components/UserArea";
import Link from "next/link";
import HeaderStyleController from "@/components/HeaderStyleController";

export default function Header() {
  console.log("[Header]:client");

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
