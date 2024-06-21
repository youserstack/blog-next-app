import PostListArticle from "@/components/category/PostListArticle";
import { getPosts } from "@/lib/utils/fetchers/getters";
import { PostsSearchParams } from "@/types/api";
import "./page.scss";

export default async function Category({
  params: { category },
  searchParams,
}: {
  params: { category: string[] };
  searchParams: any;
}) {
  console.log(
    `\n\x1b[34m[categories/${category.map((v: string) => decodeURI(v)).join("/")}]\x1b[0m`
  );

  const categorySegments: string[] = category.map((v: any) => decodeURIComponent(v));
  const page: number = parseInt(searchParams.page) || 1;
  const postsSearchParams: PostsSearchParams = {
    categoryPath: `/${categorySegments.join("/")}`,
    page,
  };
  const { totalCount, posts } = await getPosts(postsSearchParams);

  return (
    <div className="category">
      <PostListArticle
        categorySegments={categorySegments} // breadcrumb
        totalCount={totalCount} // pagination
        posts={posts} // list
        page={page} // pagination
      />
    </div>
  );
}
