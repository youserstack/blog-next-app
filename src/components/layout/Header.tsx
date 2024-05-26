import SearchBar from "@/components/ui/SearchBar";
import Etc from "@/components/ui/Etc";
import Nav from "@/components/ui/Nav";
import UserArea from "@/components/ui/UserArea";
import Link from "next/link";
import HeaderScript from "@/components/script/HeaderScript";

async function refreshAuth() {
  const response = await fetch(`${process.env.ROOT_URL}/api/auth/refresh`);
  if (!response.ok) throw new Error("refresh failed");
  return response.json();
}

export default async function Header() {
  // const result = await refreshAuth()

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
