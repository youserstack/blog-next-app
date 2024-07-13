import PostArticleEditForm from "@/components/forms/PostArticleEditForm";
import { getPost } from "@/lib/utils/fetchers/getters";

export default async function PostIdEdit({ params: { id: postId } }: { params: { id: string } }) {
  const { post } = await getPost(postId);

  return (
    <main>
      <section>
        <PostArticleEditForm post={post} />
      </section>
    </main>
  );
}
