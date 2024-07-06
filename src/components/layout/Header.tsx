import SearchBar from "@/components/ui/SearchBar";
import Etc from "@/components/ui/Etc";
import Nav from "@/components/ui/Nav";
import Link from "next/link";
import UserArea from "@/components/areas/UserArea";
import { getCategories } from "@/lib/utils/fetchers/getters";
import { headers } from "next/headers";
import dynamic from "next/dynamic";
import AppBar from "@mui/material/AppBar";

const HeaderScript = dynamic(() => import("@/components/script/HeaderScript"), {
  ssr: false,
});

const AuthScript = dynamic(() => import("@/components/script/AuthScript"), {
  ssr: false,
});

export default async function Header() {
  const { categories } = await getCategories();
  const user = JSON.parse(headers().get("user") as string);

  return (
    <header>
      <AppBar component="nav">
        <section className="header-upper">
          <h1>
            <Link href={"/"}>blog</Link>
          </h1>
          <SearchBar />
          <UserArea user={user} />
        </section>
        <section className="header-lower">
          <Nav categories={categories} user={user} />
          <Etc user={user} />
        </section>
      </AppBar>

      {/* scripts */}
      <HeaderScript />
      <AuthScript user={user} />
    </header>
  );
}
