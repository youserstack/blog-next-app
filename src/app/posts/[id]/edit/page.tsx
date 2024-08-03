"use client";

import dynamic from "next/dynamic";

const PostArticleEditForm = dynamic(() => import("@/components/forms/PostArticleEditForm"), {
  ssr: false,
});

export default function PostIdEdit({ params: { id: postId } }: { params: { id: string } }) {
  return (
    <main>
      <section>
        <PostArticleEditForm postId={postId} />
      </section>
    </main>
  );
}
