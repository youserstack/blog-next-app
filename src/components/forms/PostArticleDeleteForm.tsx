"use client";

import { refreshAccessToken } from "@/lib/utils/auth";
import { deletePost } from "@/lib/utils/fetchers/deleters";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useFormState } from "react-dom";
import "./PostArticleDeleteForm.scss";

export default function PostArticleDeleteForm({ post }: any) {
  const router = useRouter();
  const [deleteState, deleteAction] = useFormState(async () => {
    const accessToken = localStorage.getItem("accessToken") as string;
    const { error, deletedPost } = await deletePost(post._id, accessToken);

    if (error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken();
      const { error, deletedPost } = await deletePost(post._id, newAccessToken);

      if (error) {
        console.error("재요청에 대한 에러가 발생했습니다.", error);
        return { error };
      }

      console.log("토큰갱신 > 재요청 > 포스트 생성 성공", { deletedPost });
      router.refresh();
      return { deletedPost };
    } else if (error) {
      console.error("에러가 발생했습니다.", error);
      return { error };
    }

    console.log("포스트 삭제 성공", { deletedPost });
    router.refresh();
    return { deletedPost };
  }, null);

  useEffect(() => {
    if (deleteState?.deletedPost) router.push("/");
  }, [deleteState]);

  return (
    <form className="post-article-delete-form" action={deleteAction}>
      <button type="submit">delete this post article</button>
    </form>
  );
}
