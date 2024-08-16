import ServerLoading from "@/components/ui/ServerLoading";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const PostArticle = dynamic(() => import("@/components/articles/PostArticle"));

export async function generateStaticParams() {
  const url = `${process.env.ROOT_URL}/api/static/all-posts`;
  const { posts } = await fetch(url).then((res) => res.json());
  return posts.map((post: any) => ({ id: post._id }));
}

// dynamic routes
export default function PostId({ params: { id: postId } }: { params: { id: string } }) {
  return (
    <main className="post-id">
      <section>
        <Suspense fallback={<ServerLoading />}>
          <PostArticle postId={postId} />
        </Suspense>
      </section>
    </main>
  );
}
