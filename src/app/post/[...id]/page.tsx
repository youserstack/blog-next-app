import ScrollNav from "@/components/ScrollNav";
import PostItemArticle from "@/components/PostItemArticle";
import "./page.scss";

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     slug: post.slug,
//   }))
// }

export default async function PostId({ params }: { params: { slug: string[] } }) {
  console.log("\n[post/[...id]]");
  // console.log({ params });
  // const response = await fetch("http://localhost:3000/api");
  // const data = await response.json();

  return (
    <main className="post-page">
      <section>
        <ScrollNav />
        <PostItemArticle />
      </section>
      <section></section>
    </main>
  );
}
