import PostItemArticle from "@/components/PostItemArticle";
import "./page.scss";

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     category: post.category,
//   }))
// }

export default async function PostId({ params }: { params: { category: string[] } }) {
  console.log("\n[post/[...id]]");
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
