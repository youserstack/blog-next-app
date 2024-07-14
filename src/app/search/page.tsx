import SearchFilter from "@/components/features/SearchFilter";
import SearchResult from "@/components/articles/SearchResult";
import { getCategories } from "@/lib/utils/fetchers/getters";

export default async function Search() {
  const { categories } = await getCategories();

  return (
    <div className="search">
      <SearchFilter categories={categories} />
      <SearchResult />
    </div>
  );
}
