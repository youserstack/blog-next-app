import { getPosts } from "@/lib/utils/fetchers/getters";
import { PostsSearchParams } from "@/types/api";

export default async function Posts({ searchParams }: any) {
  const postsSearchParams: PostsSearchParams = {
    categoryPath: searchParams.categoryPath || "/",
    page: parseInt(searchParams.page) || 1,
  };
  const posts = await getPosts(postsSearchParams);
  console.log({ posts });

  return <div className="posts">sdfsdfs</div>;
}
