import SearchArticle from "@/components/articles/SearchArticle";
import { getCategories, getPosts } from "@/lib/utils/fetchers/getters";
import { PostsSearchParams } from "@/types/api";

export default async function Search({ searchParams }: any) {
  const postsSearchParams: PostsSearchParams = {
    searchWords: searchParams.searchWords,
    categoryPath: searchParams.categoryPath || "/",
    sort: searchParams.sort || "newest",
    page: searchParams.page || "1",
  };

  const { posts } = await getPosts(postsSearchParams);
  const { categories } = await getCategories();

  return (
    <main className="search">
      <section>
        <SearchArticle posts={posts} categories={categories} />
      </section>
    </main>
  );
}
