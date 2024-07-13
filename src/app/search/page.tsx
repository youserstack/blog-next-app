import SearchResult from "@/components/articles/SearchResult";
import SearchFilter from "@/components/features/SearchFilter";
// import Loading from "@/components/ui/Loading";
import SuspenseLoading from "@/components/ui/SuspenseLoading";
import { getCategories } from "@/lib/utils/fetchers/getters";
import { Suspense } from "react";

export default async function Search() {
  const { categories } = await getCategories();

  return (
    <main>
      <section style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <SearchFilter categories={categories} />
        <Suspense fallback={<SuspenseLoading />}>
          <SearchResult />
        </Suspense>
      </section>
    </main>
  );
}
