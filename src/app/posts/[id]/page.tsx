import PostArticle from "@/components/articles/PostArticle";
import { getPost } from "@/lib/utils/fetchers/getters";
import "./page.scss";

export async function generateStaticParams() {
  const { posts } = await fetch(`${process.env.ROOT_URL}/api/static/all-posts`).then((res) =>
    res.json()
  );
  // console.log({ posts });

  // return posts;
  return posts.map((post: any) => ({ id: post._id }));
}

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
