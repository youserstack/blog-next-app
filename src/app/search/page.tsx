import SearchResult from "@/components/articles/SearchResult";
import SearchFilter from "@/components/features/SearchFilter";
import { getCategories } from "@/lib/utils/fetchers/getters";
// import { PostsSearchParams } from "@/types/api";

export default async function Search({ searchParams }: any) {
  // const postsSearchParams: PostsSearchParams = {
  //   searchWords: searchParams.searchWords,
  //   categoryPath: searchParams.categoryPath || "/",
  //   sort: searchParams.sort || "newest",
  //   page: searchParams.page || "1",
  // };

  // const { posts, totalCount } = await getPosts(postsSearchParams);
  const { categories } = await getCategories();

  return (
    <main>
      <section>
        <SearchFilter categories={categories} />
        <SearchResult />
      </section>
    </main>
  );
}
