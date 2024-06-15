import PostArticle from "@/components/post/PostArticle";
import { getPost } from "@/lib/utils/fetcher";
import "./page.scss";

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     category: post.category,
//   }))
// }

export default async function PostId({ params }: { params: { id: string } }) {
  console.log("\n\x1b[34m[pages/post/[...id]]\x1b[0m");

  const postId: string = params.id;
  const { post } = await getPost(postId);

  return (
    <main className="post">
      <section>
        <PostArticle post={post} />
      </section>
      <section></section>
    </main>
  );
}
