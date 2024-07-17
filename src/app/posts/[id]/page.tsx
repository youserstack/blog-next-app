import PostArticle from "@/components/articles/PostArticle";
import ServerLoading from "@/components/ui/ServerLoading";
import { getPost } from "@/lib/utils/fetchers/getters";
import { Suspense } from "react";

export async function generateStaticParams() {
  const url = `${process.env.ROOT_URL}/api/static/all-posts`;
  // console.log({ url });
  const { posts } = await fetch(url).then((res) => res.json());
  // console.log({ posts });
  return posts.map((post: any) => ({ id: post._id }));
}

export default async function PostId({ params: { id: postId } }: { params: { id: string } }) {
  const { post } = await getPost(postId);

  return (
    <main className="post-id">
      <section>
        <Suspense fallback={<ServerLoading />}>
          <PostArticle post={post} />
        </Suspense>
      </section>
    </main>
  );
}
