import SideNav from "@/components/ui/SideNav";
import { getCategories } from "@/lib/utils/fetchers/getters";
import "./page.scss";

export default async function CategoryLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  const { categories } = await getCategories();
  // console.log({ categories });

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
