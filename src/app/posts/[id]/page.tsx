// import Loading from "@/components/ui/Loading";
import PostArticle from "@/components/articles/PostArticle";
import { CircularProgress } from "@mui/material";
import dynamic from "next/dynamic";
import { Suspense } from "react";

// const PostArticle = dynamic(() => import("@/components/articles/PostArticle"), {
//   loading: () => <Loading />,
// });

export async function generateStaticParams() {
  const response = await fetch(`${process.env.ROOT_URL}/api/static/all-posts`);
  const { posts } = await response.json();
  return posts.map((post: any) => ({ id: post._id }));
}

// dynamic routes
export default function PostId({ params: { id: postId } }: { params: { id: string } }) {
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

function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: "9999",
      }}
    >
      <CircularProgress sx={{ color: "yellow" }} />
    </div>
  );
}
