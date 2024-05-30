import CategorizedPostCardListArticle from "@/components/category/CategorizedPostCardListArticle";
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
  console.log("\n\x1b[34m[pages/categories/[...category]]\x1b[0m");

  // breadcrumbs 를 위해서 url params 를 decoding 한다.
  const categorySegments: string[] = params.category.map((v: any) => decodeURIComponent(v));
  const categoryPath: string = params.category.map((v: any) => `/${v}`).join("");
  const page: number = parseInt(searchParams.page) || 1;
  const { totalCount, posts } = await getPosts(categoryPath, page);

  return (
    <CategorizedPostCardListArticle
      categorySegments={categorySegments} // breadcrumb
      totalCount={totalCount} // pagination
      posts={posts} // list
      page={page} // pagination
    />
  );
}
