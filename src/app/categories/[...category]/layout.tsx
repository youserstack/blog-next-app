import SideNav from "@/components/ui/SideNav";
import { getCategories } from "@/lib/utils/fetchers/getters";
import "./page.scss";

export default async function CategoryLayout({ children }: { children: React.ReactNode }) {
  const { categories } = await getCategories();

  return (
    <main className="category-layout">
      <section>
        <SideNav categories={categories} />
        {children}
      </section>
      <section></section>
    </main>
  );
}
