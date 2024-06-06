"use client";

import { createComment } from "@/app/posts/[...id]/actions";
import { refreshAccessToken } from "@/lib/utils/auth";
import { useFormState } from "react-dom";
import "../../styles/CommentCreateForm.scss";
import { useRouter } from "next/navigation";

export default function CommentCreateForm({ postId }: { postId: string }) {
  const router = useRouter();
  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const accessToken = localStorage.getItem("accessToken") as string;
    let response = await createComment(formData, postId, accessToken); // 서버액션으로부터 요청한다.

    // rejected
    if (response.error === "JWTExpired") {
      console.log("JWTExpired");
      // extraction
      const content = formData.get("content");
      // refresh
      const newAccessToken = await refreshAccessToken();
      // re-request
      const response: any = await fetch(`${process.env.ROOT_URL}/api/comments/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${newAccessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content, postId }),
      });
      if (!response.ok) return { error: "failed refresh" };
      const { newComment } = await response.json();
      console.log("accessToken을 갱신한 후에 다시 요청을 보내고난 후의 응답결과입니다", {
        newComment,
      });
      router.refresh();
      return { newComment };
    }

    // fullfiled
    if (response.newComment) {
      console.log("성공적으로 새로운 댓글을 생성하였습니다.");
      return { newComment: response.newComment };
    }

    console.log("exception...");
  }, null);

  return (
    <form className="comment-create-form" action={formAction}>
      <input type="text" name="content" />
      <button type="submit">등록하기</button>
    </form>
  );
}
