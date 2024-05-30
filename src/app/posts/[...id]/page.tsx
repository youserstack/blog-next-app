import PostItemArticle from "@/components/post/PostItemArticle";
import "./page.scss";

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     category: post.category,
//   }))
// }

export default async function PostId({ params }: { params: { category: string[] } }) {
  console.log("\n\x1b[34m[pages/post/[...id]]\x1b[0m");

  // console.log({ params });

  return (
    <main className="post-page">
      <section>
        <PostItemArticle />
      </section>
      <section></section>
    </main>
  );
}
