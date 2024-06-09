"use client";

import { MouseEvent, useContext, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { updatePost } from "@/app/posts/[...id]/actions";
import { useRouter } from "next/navigation";
import { deletePost } from "@/lib/utils/fetcher";
import { IoIosMore } from "react-icons/io";
import CommentList from "@/components/comment/CommentList";
import CommentCreateForm from "@/components/comment/CommentCreateForm";
import "../../styles/PostArticle.scss";
import { Context } from "@/components/context/Provider";
import PostArticleOptionButton from "@/components/post/PostArticleOptionButton";

export default function PostArticle({ post }: any) {
  const { isSignedIn }: any = useContext(Context); // 로그인 상태
  const [isClicked, setIsClicked] = useState(false); // 옵션 버튼 클릭 상태
  const [isEditMode, setIsEditMode] = useState(false); // 편집 모드 상태

  // update logic
  const [category, setCategory] = useState(post.category);
  const [title, setTitle] = useState(post.title);
  const [content, setContent] = useState(post.content);
  const [tags, setTags] = useState(post.tags);
  const [updateState, updateAction] = useFormState(
    async (currentState: any, formData: FormData) => {
      // request
      const response = await updatePost(
        formData,
        post._id,
        localStorage.getItem("accessToken") as string
      );

      // branch
      if (response?.error) return response.error;
      setIsEditMode(false);
      console.log({ response });
      console.log("....");
      return response;
    },
    null // 초기값
  );

  const handleClickCancelButton = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsEditMode(false);
    setIsClicked(false);
  };

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
          <PostArticleOptionButton
            post={post}
            isClicked={isClicked}
            setIsClicked={setIsClicked}
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
        {isSignedIn && <CommentCreateForm authorImage={post.author.image} postId={post._id} />}
        <CommentList postId={post._id} />
      </div>
    </article>
  );
}
