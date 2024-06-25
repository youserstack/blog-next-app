import PostArticle from "@/components/post/PostArticle";
import { getPost } from "@/lib/utils/fetchers/getters";
import "./page.scss";

// export async function generateStaticParams() {
//   const posts = await fetch('https://.../posts').then((res) => res.json())

//   return posts.map((post) => ({
//     category: post.category,
//   }))
// }

export default async function PostId({ params: { id: postId } }: { params: { id: string } }) {
  console.log(`\n\x1b[34m[/posts/${postId}]\x1b[0m`);

  const { post } = await getPost(postId);

  return (
    <main className="post-id">
      <section>
        <PostArticle post={post} />
      </section>
      <section></section>
    </main>
  );
}
