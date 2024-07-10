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
  const { categories } = await getCategories();
  const user = headers().get("user") ? JSON.parse(headers().get("user") as string) : null;

  return (
    <header>
      <NavBar user={user} categories={categories} />
      <HeaderScript />
      <AuthScript user={user} />
    </header>
  );
}
