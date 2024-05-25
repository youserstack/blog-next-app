import PostListArticle from "@/components/post/PostListArticle";
import { getPosts } from "@/lib/utils/fetcher";
// import "./page.scss";

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     category: post.category,
//   }))
// }

export default async function Category({
  params,
  searchParams,
}: {
  params: { category: string[] };
  searchParams: any;
}) {
  console.log("\n[categories/[...category]]");

  // breadcrumbs 를 위해서 url params 를 decoding 한다.
  const categorySegments: string[] = params.category.map((v: any) => decodeURIComponent(v));
  const categoryPath: string = params.category.map((v: any) => `/${v}`).join("");
  const page: string = searchParams.page || 1;
  const { posts } = await getPosts(categoryPath, page);

  return <PostListArticle categorySegments={categorySegments} posts={posts} />;
}
