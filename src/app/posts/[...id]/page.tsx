import PostItemArticle from "@/components/post/PostItemArticle";
import "./page.scss";

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     category: post.category,
//   }))
// }

export default async function PostId({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: any;
}) {
  console.log("\n\x1b[34m[pages/post/[...id]]\x1b[0m");

  const postId: string = params.id;

  return (
    <main className="post-page">
      <section>
        <PostItemArticle postId={postId} />
      </section>
      <section></section>
    </main>
  );
}
