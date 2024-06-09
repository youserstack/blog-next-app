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
    // request
    const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`; // 댓글생성후 리패칭할 주소
    const accessToken = localStorage.getItem("accessToken") as string;
    const response = await createComment(formData, postId, accessToken); // 서버액션으로부터 요청한다.

    // 토큰만료시 > 토큰갱신 > 재요청
    if (response.error.code === "ERR_JWT_EXPIRED") {
      // request
      const newAccessToken = await refreshAccessToken();
      const response = await createComment(formData, postId, newAccessToken); // 서버액션으로부터 요청한다.

      // branch
      if (response.error) return response;
      console.log("토큰갱신 > 재요청 > 성공적으로 새로운 댓글을 생성하였습니다.");
      console.log({ newComment: response.newComment });
      mutate(url); // 클라이언트 리패칭
      return response;
    }

    console.log("성공적으로 새로운 댓글을 생성하였습니다.");
    mutate(url); // 클라이언트 리패칭
    return { newComment: response.newComment };
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
