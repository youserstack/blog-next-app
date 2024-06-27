"use client";

import { useState } from "react";
import { useFormState } from "react-dom";
import { FcAddImage } from "react-icons/fc";
import ArticleOptionButton from "@/components/buttons/ArticleOptionButton";
import { useRouter } from "next/navigation";
import { refreshAccessToken } from "@/lib/utils/auth";
import { updatePostAction } from "@/app/actions";
import CommentCreateForm from "@/components/forms/CommentCreateForm";
import CommentList from "@/components/lists/CommentList";
import ArticleEditButtons from "@/components/buttons/ArticleEditButtons";
import "./PostArticle.scss";

export default function PostArticle({ post }: any) {
  const router = useRouter();
  const [isEditMode, setIsEditMode] = useState(false);
  const [updateState, updateAction] = useFormState(
    async (currentState: any, formData: FormData) => {
      const accessToken = localStorage.getItem("accessToken") as string;
      const { error, updatedPost } = await updatePostAction(formData, post._id, accessToken);

      if (error?.code === "ERR_JWT_EXPIRED") {
        const newAccessToken = await refreshAccessToken();
        const { error, updatedPost } = await updatePostAction(formData, post._id, newAccessToken);

        if (error) {
          console.error("재요청에 대한 에러가 발생했습니다.", error);
          setIsEditMode(false);
          return { error };
        }

        console.log("토큰갱신 > 재요청 > 포스트 수정", { updatedPost });
        setIsEditMode(false);
        router.refresh();
        return { updatedPost };
      } else if (error) {
        console.error("에러가 발생했습니다.", error);
        setIsEditMode(false);
        return { error };
      }

      console.log("포스트 수정", { updatedPost });
      setIsEditMode(false);
      router.refresh();
      return { updatedPost };
    },
    null
  );

  // 서버에서 revalidatePath를 했다면, 클라이언트에서 refresh를 해야한다.
  // useEffect(() => {
  //   if (updateState?.updatedPost) {
  //     router.refresh();
  //   }
  // }, [updateState, router]);

  if (!post) return null;

  if (isEditMode) {
    return (
      <form className="post-article edit-mode" action={updateAction}>
        <div className="article-header">
          <input className="title edit-title" type="text" name="title" defaultValue={post.title} />
          <div className="article-info">
            <p>작성자 : {post.author?.name}</p>
            <p>{post.createdAt?.slice(0, 10)}</p>
          </div>
          <small>
            <span>카테고리 : </span>
            <input type="text" name="category" defaultValue={post.category} />
          </small>
          <ArticleEditButtons setIsEditMode={setIsEditMode} />
        </div>
        <div className="article-body">
          <p className="content">{post.content}</p>
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
          <ArticleEditButtons setIsEditMode={setIsEditMode} />
        </div>
      </form>
    );
  }

  return (
    <article className="post-article">
      <div className="article-header">
        <h1 className="title">{post.title}</h1>
        <div className="info">
          <p>작성자 : {post.author?.name}</p>
          <p>{post.createdAt?.slice(0, 10)}</p>
          <p>카테고리 {post.category.replaceAll("/", " > ")}</p>
        </div>
        <ArticleOptionButton post={post} setIsEditMode={setIsEditMode} />
      </div>
      <div className="article-body">
        <p className="content">{post.content}</p>
      </div>
      <div className="article-footer">
        <CommentCreateForm authorImage={post.author?.image} postId={post._id} />
        <CommentList postId={post._id} />
      </div>
    </article>
  );
}
