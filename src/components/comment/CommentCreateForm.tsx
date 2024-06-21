"use client";

import { refreshAccessToken } from "@/lib/utils/auth";
import { useFormState } from "react-dom";
import { mutate } from "swr";
import { useContext } from "react";
import { Context } from "@/components/context/Provider";
import { createCommentAction } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";
import "../../styles/CommentCreateForm.scss";

export default function CommentCreateForm({
  authorImage,
  postId,
}: {
  authorImage: any;
  postId: string;
}) {
  const { user }: any = useContext(Context);
  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
    const accessToken = localStorage.getItem("accessToken") as string;
    const { error, newComment } = await createCommentAction(formData, postId, accessToken);

    // 토큰만료시 > 토큰갱신 > 재요청
    if (error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken();
      const { error, newComment } = await createCommentAction(formData, postId, newAccessToken);

      if (error) {
        console.error("재요청에 대한 에러가 발생했습니다.", error);
        return { error: error };
      }

      console.log("토큰갱신 > 재요청 > 댓글 생성", { newComment });
      mutate(url); // 클라이언트 리패칭 (swr)
      return { newComment };
    } else if (error) {
      console.error("에러가 발생했습니다.", error);
      return { error };
    }

    console.log("댓글 생성");
    mutate(url); // 클라이언트 리패칭
    return { newComment };
  }, null);

  return (
    <form className="comment-create-form" action={formAction}>
      <div className="author-thumbnail">
        <Image src={authorImage} alt="" width={30} height={30} />
      </div>
      {user ? (
        <div className="main">
          <textarea name="content" placeholder="댓글 추가" maxLength={500} />
          <button type="submit">등록하기</button>
        </div>
      ) : (
        <div className="main">
          <Link href={"/auth/signin"}>로그인</Link>
        </div>
      )}
    </form>
  );
}
