import PostArticle from "@/components/post/PostArticle";
import { getPost } from "@/lib/utils/fetchers/getters";
import "./page.scss";

export async function generateStaticParams() {
  const { categories } = await fetch(`${process.env.ROOT_URL}/api/static/posts`).then((res) =>
    res.json()
  );
  // const list = categories.map((v: any) => ({ category: v.category }));
  console.log({ categories });

  // return posts.map((post:any) => ({
  //   category: post.category,
  // }))
  return [{ category: "navi" }];
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
