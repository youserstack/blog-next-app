import { getCategories } from "@/lib/utils/fetchers/getters";
import { headers } from "next/headers";
import HeaderScript from "@/components/script/HeaderScript";
import AuthScript from "@/components/script/AuthScript";
import NavBar from "@/components/ui/NavBar";
// import dynamic from "next/dynamic";

// const HeaderScript = dynamic(() => import("@/components/script/HeaderScript"), {
//   ssr: false,
// });

// const AuthScript = dynamic(() => import("@/components/script/AuthScript"), {
//   ssr: false,
// });

export default async function Header() {
  const user = JSON.parse(headers().get("user") as string);
  const { categories } = await getCategories();

  return (
    <header>
      <NavBar user={user} categories={categories} />
      {/* <AppBar component="nav">
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
      </AppBar> */}

      {/* scripts */}
      <HeaderScript />
      <AuthScript user={user} />
    </header>
  );
}
