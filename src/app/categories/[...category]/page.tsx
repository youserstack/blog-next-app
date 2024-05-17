import PostListArticle from "@/components/PostListArticle";
import ScrollNav from "@/components/ScrollNav";
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
  // const response = await fetch("http://localhost:3000/api");
  // const data = await response.json();

  // console.log({ params, searchParams });

  return (
    <main className="category-page">
      <section>
        <ScrollNav />
        <PostListArticle params={params} />
      </section>
      <section></section>
    </main>
  );
}
