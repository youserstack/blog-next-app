import SearchBar from "@/components/ui/SearchBar";
import Etc from "@/components/ui/Etc";
import Nav from "@/components/ui/Nav";
import Link from "next/link";
import HeaderScript from "@/components/script/HeaderScript";
import UserArea from "@/components/areas/UserArea";

export default async function Header() {
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
      <HeaderScript />
    </header>
  );
}
