"use client";

import { createComment } from "@/app/posts/[...id]/actions";
import { refreshAccessToken } from "@/lib/utils/auth";
import { useFormState } from "react-dom";
import { mutate } from "swr";
import Image from "next/image";
import "../../styles/CommentCreateForm.scss";

export default function CommentCreateForm({
  authorImage,
  postId,
}: {
  authorImage: any;
  postId: string;
}) {
  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
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
      // branch
      if (!response.ok) return { error: "failed refresh" };
      const { newComment } = await response.json();
      console.log("accessToken 갱신후 재요청후 응답결과입니다", { newComment });
      mutate(url);
      return { newComment };
    }

    // fulfilled
    if (response.newComment) {
      console.log("성공적으로 새로운 댓글을 생성하였습니다.");
      mutate(url);
      return { newComment: response.newComment };
    }

    console.log("exception...");
  }, null);

  return (
    <form className="comment-create-form" action={formAction}>
      <div className="author-thumbnail">
        <Image src={authorImage} alt="" width={30} height={30} />
      </div>
      <div className="main">
        <input type="text" name="content" placeholder="댓글 추가" />
        <button type="submit">등록하기</button>
      </div>
    </form>
  );
}
