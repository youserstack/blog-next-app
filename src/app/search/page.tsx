import SearchFilter from "@/components/features/SearchFilter";
import SearchResult from "@/components/articles/SearchResult";
import { getCategories } from "@/lib/utils/fetchers/getters";
import { Suspense } from "react";
import ServerLoading from "@/components/ui/ServerLoading";

export default async function Search() {
  const { categories } = await getCategories();

  return (
    <div className="search">
      <Suspense fallback={<ServerLoading />}>
        <SearchFilter categories={categories} />
        <SearchResult />
      </Suspense>
    </div>
  );
}
