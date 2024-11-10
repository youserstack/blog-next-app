import PostArticle from "@/components/ui/PostArticle";
import Loading from "@/components/ui/Loading";
import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";
import { Suspense } from "react";

export async function generateStaticParams() {
  await connectDB();
  const posts = await Post.find({}).select("_id");
  const staticParams = posts.map((post: any) => ({ id: post._id.toString() }));
  return staticParams;
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
