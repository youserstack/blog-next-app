import { getCategories } from "@/lib/utils/fetchers/getters";
import { headers } from "next/headers";
import HeaderScript from "@/components/script/HeaderScript";
import NavBar from "@/components/ui/NavBar";

export default async function Header() {
  const { categories } = await getCategories();
  const user = JSON.parse(headers().get("user") as string);

  return (
    <header
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        transition: "all 1s",
      }}
    >
      <NavBar user={user} categories={categories} />
      <HeaderScript />
    </header>
  );
}
