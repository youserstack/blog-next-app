"use client";

import { MouseEvent, useState } from "react";
import { useFormState } from "react-dom";
import { updatePost } from "@/app/posts/[...id]/actions";
import { useRouter } from "next/navigation";
import "../../styles/PostArticle.scss";
import { deletePost } from "@/lib/utils/fetcher";

export default function PostArticle({ post }: any) {
  const [isEditMode, setIsEditMode] = useState(false);
  const router = useRouter();

  // update logic
  const [category, setCategory] = useState(post.category);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags);
  const [updateState, updateAction] = useFormState(
    async (currentState: any, formData: FormData) => {
      const response = await updatePost(
        formData,
        post._id,
        localStorage.getItem("accessToken") as string
      );
      if (response?.error) return response.error;
      setIsEditMode(false);
      console.log({ response });
      console.log("....");
      return response;
    },
    null
  );

  const handleClickCancelButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditMode(false);
  };
  const handleClickDeleteButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deletePost(post._id);
    router.push(`/categories/${post.category.slice(1)}`);
    router.refresh();
  };

  if (isEditMode) {
    return (
      <article className="post-article">
        <div className="content">
          <div className="content-header">
            <div className="title">
              <form action={updateAction}>
                <small>
                  <p>작성자 : {post.author?.name}</p>
                  <p>{post.createdAt?.slice(0, 10)}</p>
                </small>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                <button type="submit">save</button>
              </form>
            </div>
            <div className="buttons">
              <button onClick={handleClickDeleteButton}>delete this post</button>
              <button onClick={handleClickCancelButton}>cancel</button>
            </div>
          </div>
          <div className="content-body">
            <pre>{post.content}</pre>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="post-article">
      <div className="content">
        <div className="content-header">
          <div className="title">
            <small>
              <p>작성자 : {post.author?.name}</p>
              <p>{post.createdAt?.slice(0, 10)}</p>
            </small>
            <h1>Title : {post.title}</h1>
          </div>
          <div className="buttons">
            <button onClick={() => setIsEditMode(true)}>edit</button>
          </div>
        </div>
        <div className="content-body">
          <pre>{post.content}</pre>
        </div>
      </div>
    </article>
  );
}
