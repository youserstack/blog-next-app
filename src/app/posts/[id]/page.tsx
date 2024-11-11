import PostArticle from "@/components/ui/PostArticle";
import Loading from "@/components/ui/Loading";
import connectDB from "@/lib/config/connectDB";
import { Suspense } from "react";

export async function generateStaticParams() {
  await connectDB();
  const response = await fetch(`${process.env.ROOT_URL}/api/static/all-posts`);
  if (!response.ok) return new Error("정적 페이지 경로 생성 에러발생");
  const { posts } = await response.json();
  return posts.map((post: IPost) => ({ id: post._id.toString() }));
}

export default function PostDetail({ params: { id: postId } }: { params: { id: string } }) {
  return (
    <main className="포스트_상세페이지">
      <section>
        <Suspense fallback={<Loading />}>
          <PostArticle postId={postId} />
        </Suspense>
      </section>
    </main>
  );
}
