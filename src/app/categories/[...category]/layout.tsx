import ScrollNav from "@/components/ScrollNav";
import { getCategories } from "@/lib/utils/fetcher";
import "./page.scss";

export default async function CategoryLayout({ children }: { children: React.ReactNode }) {
  const { categories } = await getCategories();

  return (
    <main className="category-layout">
      <section>
        <ScrollNav categories={categories} />
        {children}
      </section>
      <section></section>
    </main>
  );
}
