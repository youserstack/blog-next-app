import PostArticle from "@/components/articles/PostArticle";
import Loading from "@/components/ui/Loading";
import connectDB from "@/lib/config/connectDB";
import Post from "@/lib/models/Post";
import { Suspense } from "react";

export async function generateStaticParams() {
  await connectDB();

  const posts = await Post.find({}).select("_id");
  const staticParams = posts.map((post: any) => ({ id: post._id.toString() }));
  console.log({ staticParams });

  return staticParams;
}

export default function PostId({ params: { id: postId } }: { params: { id: string } }) {
  console.log({ postId });

  return (
    <main className="post-id">
      <section>
        <Suspense fallback={<Loading />}>
          <PostArticle postId={postId} />
        </Suspense>
      </section>
    </main>
  );
}
