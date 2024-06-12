"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { updatePostAction } from "@/app/posts/[...id]/actions";
import { FcAddImage } from "react-icons/fc";
import CommentList from "@/components/comment/CommentList";
import CommentCreateForm from "@/components/comment/CommentCreateForm";
import PostArticleOptionButton from "@/components/post/PostArticleOptionButton";
import PostArticleEditModeButton from "@/components/post/PostArticleEditModeButton";
import "../../styles/PostArticle.scss";
import { useRouter } from "next/navigation";
import { deletePost } from "@/lib/utils/fetcher";
import { refreshAccessToken } from "@/lib/utils/auth";

export default function PostArticle({ post }: any) {
  const [isClickedOptionButton, setIsClickedOptionButton] = useState(false); // 옵션 버튼 클릭 상태
  const [isEditMode, setIsEditMode] = useState(false); // 편집 모드 상태

  const [updateState, updateAction] = useFormState(
    async (currentState: any, formData: FormData) => {
      const accessToken = localStorage.getItem("accessToken") as string;
      const result = await updatePostAction(formData, post._id, accessToken);

      if (result.error?.code === "ERR_JWT_EXPIRED") {
        const newAccessToken = await refreshAccessToken();
        const result = await updatePostAction(formData, post._id, newAccessToken);

        if (result.error) return result;
        console.log("토큰갱신 > 재요청 > 성공적으로 포스트글을 수정하였습니다.", result);
        setIsEditMode(false);
        setIsClickedOptionButton(false);
        return result;
      }

      console.log("성공적으로 포스트글을 수정하였습니다.", result);
      setIsEditMode(false);
      setIsClickedOptionButton(false);
      return result;
    },
    null
  );

  if (isEditMode) {
    return (
      <form className="post-article edit-mode" action={updateAction}>
        <div className="article-header">
          <PostArticleEditModeButton
            setIsEditMode={setIsEditMode}
            setIsClickedOptionButton={setIsClickedOptionButton}
          />
          <input className="title edit-title" type="text" name="title" defaultValue={post.title} />
          <div className="wrapper">
            <div className="writer">
              <p>작성자 : {post.author?.name}</p>
              <p>{post.createdAt?.slice(0, 10)}</p>
            </div>
          </div>
          <small>
            <span>카테고리 : </span>
            <input type="text" name="category" defaultValue={post.category} />
          </small>
        </div>
        <div className="article-body">
          <pre>{post.content}</pre>
          <ul>
            <li>
              <input
                type="file"
                id="image"
                name="image"
                // defaultValue={post.image ? post.image : null}
                style={{ display: "none" }}
              />
              <label className="image-label" htmlFor="image">
                <FcAddImage size={30} />
                <span>image</span>
              </label>
            </li>
          </ul>
          <button type="submit">저장</button>
        </div>
        <div className="article-footer">
          <PostArticleEditModeButton
            setIsEditMode={setIsEditMode}
            setIsClickedOptionButton={setIsClickedOptionButton}
          />
        </div>
      </form>
    );
  }

  return (
    <article className="post-article">
      <div className="article-header">
        <h1 className="title">{post.title}</h1>
        <div className="wrapper">
          <div className="writer">
            <p>작성자 : {post.author?.name}</p>
            <p>{post.createdAt?.slice(0, 10)}</p>
          </div>
          <PostArticleOptionButton
            post={post}
            isClickedOptionButton={isClickedOptionButton}
            setIsClickedOptionButton={setIsClickedOptionButton}
            setIsEditMode={setIsEditMode}
          />
        </div>
      </div>
      <div className="article-body">
        <pre>{post.content}</pre>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum harum aliquam iste
          voluptas doloremque maiores qui tempore corporis dolorem nisi eum vero, iusto ipsum cum
          esse? Quae ratione inventore mollitia?
        </p>
      </div>
      <div className="article-footer">
        <CommentCreateForm authorImage={post.author.image} postId={post._id} />
        <CommentList postId={post._id} />
      </div>
    </article>
  );
}
