import { getCategories } from "@/lib/utils/fetchers/getters";
import SearchFilter from "@/components/features/SearchFilter";

export default async function SearchLayout({ children }: { children: React.ReactNode }) {
  const { categories } = await getCategories();

  return (
    <main>
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <div className="search">
          <SearchFilter categories={categories} />
          {children}
        </div>
      </section>
    </main>
  );
}
