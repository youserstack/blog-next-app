import SearchArticle from "@/components/articles/SearchArticle";
import { getPosts } from "@/lib/utils/fetchers/getters";
import { PostsSearchParams } from "@/types/api";

export default async function Search({ searchParams }: any) {
  const postsSearchParams: PostsSearchParams = {
    searchWords: searchParams.searchWords,
    categoryPath: searchParams.categoryPath || "/",
    page: parseInt(searchParams.page) || 1,
  };
  const posts = await getPosts(postsSearchParams);
  // console.log({ posts });

  return (
    <main className="search">
      <section>
        <SearchArticle posts={posts} />
      </section>
    </main>
  );
}
