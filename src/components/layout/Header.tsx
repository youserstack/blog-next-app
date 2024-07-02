import SearchBar from "@/components/ui/SearchBar";
import Etc from "@/components/ui/Etc";
import Nav from "@/components/ui/Nav";
import Link from "next/link";
import UserArea from "@/components/areas/UserArea";
import { getCategories } from "@/lib/utils/fetchers/getters";
import { headers } from "next/headers";
import dynamic from "next/dynamic";
// import HeaderScript from "@/components/script/HeaderScript";

const HeaderScript = dynamic(() => import("@/components/script/HeaderScript"), {
  ssr: false,
});

export default async function Header() {
  const { categories } = await getCategories();
  const user = JSON.parse(headers().get("user") as string);

  return (
    <header>
      <div className="header-upper-wrapper">
        <section className="header-upper">
          <h1>
            <Link href={"/"}>blog</Link>
          </h1>
          <SearchBar />
          <UserArea user={user} />
        </section>
      </div>
      <div className="header-lower-wrapper">
        <section className="header-lower">
          <Nav categories={categories} user={user} />
          <Etc user={user} />
        </section>
      </div>
      <HeaderScript />
    </header>
  );
}
