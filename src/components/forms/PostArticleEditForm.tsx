"use client";

import { updatePostAction } from "@/app/actions";
import { refreshAccessToken } from "@/lib/utils/auth";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { FcAddImage } from "react-icons/fc";
import { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@mui/material/Button";
import "./PostArticleEditForm.scss";

export default function PostArticleEditForm({ post }: any) {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState(post.image);
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

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // URL 객체를 이용한 blob object의 url 생성
      const objectUrl = URL.createObjectURL(file);
      setThumbnail(objectUrl);

      // Clean up the URL object after using it
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <form className="post-article-edit-form" action={updateAction}>
      <div className="form-header">
        <input className="title" type="text" name="title" defaultValue={post.title} />
        <div className="info">
          <p>작성자 : {post.author?.name}</p>
          <p>{post.createdAt?.slice(0, 10)}</p>
          <p>
            <span>카테고리 : </span>
            <input className="category" type="text" name="category" defaultValue={post.category} />
          </p>
        </div>
      </div>
      <div className="form-body">
        <div className="thumbnail">
          <Image src={thumbnail} alt="" width={1000} height={1000} />
          <input
            type="file"
            id="image"
            name="image"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />
          <label className="image-label" htmlFor="image">
            <FcAddImage size={30} />
            <span>썸네일 변경하기</span>
          </label>
        </div>
        <textarea className="content" name="content" defaultValue={post.content} />
      </div>
      <div className="form-footer">
        <Button className="update-button" variant="contained" type="submit">
          저장
        </Button>
        <Button className="cancel-button" variant="contained" onClick={() => router.back()}>
          취소
        </Button>
      </div>
    </form>
  );
}
