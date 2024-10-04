import Loading from "@/components/ui/Loading";
import dynamic from "next/dynamic";

const PostArticle = dynamic(() => import("@/components/articles/PostArticle"), {
  loading: () => <Loading />,
});

export async function generateStaticParams() {
  const response = await fetch(`${process.env.LOCAL_API_URL}/api/static/all-posts`);
  const { posts } = await response.json();
  return posts.map((post: any) => ({ id: post._id }));
}

// dynamic routes
export default function PostId({ params: { id: postId } }: { params: { id: string } }) {
  return (
    <main className="post-id">
      <section>
        <PostArticle postId={postId} />
      </section>
    </main>
  );
}
