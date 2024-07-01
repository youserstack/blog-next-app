"use client";

import { updatePostAction } from "@/app/actions";
import { refreshAccessToken } from "@/lib/utils/auth";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { FcAddImage } from "react-icons/fc";
import { useEffect } from "react";
import Image from "next/image";
import "./PostArticleEditForm.scss";

export default function PostArticleEditForm({ post }: any) {
  const router = useRouter();
  const [updateState, updateAction] = useFormState(
    async (currentState: any, formData: FormData) => {
      const accessToken = localStorage.getItem("accessToken") as string;
      const { error, updatedPost } = await updatePostAction(formData, post._id, accessToken);

      if (error?.code === "ERR_JWT_EXPIRED") {
        const newAccessToken = await refreshAccessToken();
        const { error, updatedPost } = await updatePostAction(formData, post._id, newAccessToken);

        if (error) {
          console.error("재요청에 대한 에러가 발생했습니다.", error);
          return { error };
        }

        console.log("토큰갱신 > 재요청 > 포스트 수정", { updatedPost });
        router.refresh();
        return { updatedPost };
      } else if (error) {
        console.error("에러가 발생했습니다.", error);
        return { error };
      }

      console.log("포스트 수정", { updatedPost });
      router.refresh();
      return { updatedPost };
    },
    null
  );

  useEffect(() => {
    const content: HTMLTextAreaElement | null = document.querySelector(".content");
    if (!content) return;
    content.style.height = `${content.scrollHeight}px`;
  }, [post.content]);

  useEffect(() => {
    if (updateState?.updatedPost) router.back();
  }, [updateState, router]);

  return (
    <form className="post-article-edit-form" action={updateAction}>
      <div className="form-header">
        <input className="title" type="text" name="title" defaultValue={post.title} />
        <div className="info">
          <p>작성자 : {post.author?.name}</p>
          <p>{post.createdAt?.slice(0, 10)}</p>
        </div>
        <div>
          <span>카테고리 : </span>
          <input type="text" name="category" defaultValue={post.category} />
        </div>
      </div>
      <div className="form-body">
        <div className="thumbnail">
          <Image src={post.image} alt="" width={1000} height={1000} />
          <input type="file" id="image" name="image" style={{ display: "none" }} />
          <label className="image-label" htmlFor="image">
            <FcAddImage size={30} />
            <span>썸네일 변경하기</span>
          </label>
        </div>
        <textarea className="content">{post.content}</textarea>
      </div>
      <div className="form-footer">
        <button type="submit">저장</button>
        <button onClick={() => router.back()}>취소</button>
      </div>
    </form>
  );
}
