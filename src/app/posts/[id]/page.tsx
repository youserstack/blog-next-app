import ServerLoading from "@/components/ui/ServerLoading";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// 서버 컴포넌트의 자식 클라이언트 컴포넌트만 지연로딩한다. 서버 컴포넌트 자체는 지연로딩하지 않는다.
const PostArticle = dynamic(() => import("@/components/articles/PostArticle"));

export async function generateStaticParams() {
  const url = `${process.env.ROOT_URL}/api/static/all-posts`;
  const { posts } = await fetch(url).then((res) => res.json());
  return posts.map((post: any) => ({ id: post._id }));
}

export default async function PostId({ params: { id: postId } }: { params: { id: string } }) {
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
