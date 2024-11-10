import PostArticleEditForm from "@/components/forms/PostArticleEditForm";

export default function PostIdEdit({ params: { id: postId } }: { params: { id: string } }) {
  return (
    <main>
      <section>
        <PostArticleEditForm postId={postId} />
      </section>
    </main>
  );
}
