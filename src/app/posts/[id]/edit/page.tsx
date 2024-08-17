import Loading from "@/components/ui/Loading";
import dynamic from "next/dynamic";

const PostArticleEditForm = dynamic(() => import("@/components/forms/PostArticleEditForm"), {
  ssr: false, // 클라이언트 컴포넌트를 클라이언트에서 렌더링 (인터렉션이 필요하기 때문에)
  loading: () => <Loading />, // fallback(보류)되는 동안 로딩
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
