"use client";

import { MouseEvent, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { updatePost } from "@/app/posts/[...id]/actions";
import { useRouter } from "next/navigation";
import { deletePost } from "@/lib/utils/fetcher";
import { IoIosMore } from "react-icons/io";
import CommentList from "@/components/comment/CommentList";
import "../../styles/PostArticle.scss";
import CommentCreateForm from "@/components/comment/CommentCreateForm";

export default function PostArticle({ post }: any) {
  const [isClicked, setIsClicked] = useState(false);
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

  const handleClickOptionButton = () => setIsClicked(!isClicked);
  const handleClickEditButton = () => setIsEditMode(true);
  const handleClickCancelButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditMode(false);
    setIsClicked(false);
  };
  const handleClickDeleteButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log("delete");
    return;
    // await deletePost(post._id);
    // router.push(`/categories/${post.category.slice(1)}`);
    // router.refresh();
  };

  useEffect(() => {
    const handleClick = () => setIsClicked(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  if (isEditMode) {
    return (
      <form className="post-article" action={updateAction}>
        <div className="article-header">
          <input
            className="title edit-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="wrapper">
            <div className="writer">
              <p>작성자 : {post.author?.name}</p>
              <p>{post.createdAt?.slice(0, 10)}</p>
            </div>
            <div className="buttons">
              <button type="submit">save</button>
              <button onClick={handleClickCancelButton}>cancel</button>
            </div>
          </div>
        </div>
        <div className="article-body">
          <pre>{post.content}</pre>
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
          <div className="post-article-option-button">
            <IoIosMore
              className="more-button"
              onClick={(e) => {
                e.stopPropagation(); // window 에 등록된 mouse event 반응을 하지 않도록 한다.
                handleClickOptionButton();
              }}
            />
            {isClicked && (
              <div
                className="option-layer"
                onClick={(e) => e.stopPropagation()} // window 에 등록된 mouse event 반응을 하지 않도록 한다.
              >
                <ul>
                  <li>
                    <button onClick={handleClickEditButton}>edit</button>
                  </li>
                  <li>
                    <button onClick={handleClickDeleteButton}>delete this post article</button>
                  </li>
                </ul>
              </div>
            )}
          </div>
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
        <CommentCreateForm postId={post._id} />
        <CommentList postId={post._id} />
      </div>
    </article>
  );
}
