import SearchResult from "@/components/articles/SearchResult";
import SearchFilter from "@/components/features/SearchFilter";
import { getCategories } from "@/lib/utils/fetchers/getters";

export default async function Search() {
  const { categories } = await getCategories();

  return (
    <main>
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <SearchFilter categories={categories} />
        <SearchResult />
      </section>
    </main>
  );
}
