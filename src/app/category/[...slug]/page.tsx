import PostListArticle from "@/components/PostListArticle";
import ScrollNav from "@/components/ScrollNav";
import "./page.scss";

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }

export default async function Category({ params }: { params: { slug: string[] } }) {
  console.log("\n[category/[...slug]]");
  // console.log({ params });
  // const response = await fetch("http://localhost:3000/api");
  // const data = await response.json();

  return (
    <main className="category-page">
      <section>
        <ScrollNav />
        <PostListArticle />
      </section>
      <section></section>
    </main>
  );
}
