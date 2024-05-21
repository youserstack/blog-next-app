import PostListArticle from "@/components/PostListArticle";
import { getCategories } from "@/lib/utils/fetcher";
import "./page.scss";

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

  const categorySegments = params.category;
  const categoryPath = params.category.join("/");
  const page = parseInt(searchParams.page) || 1;

  const { categories } = await getCategories();

  return (
    <PostListArticle categorySegments={categorySegments} categoryPath={categoryPath} page={page} />
  );
}
