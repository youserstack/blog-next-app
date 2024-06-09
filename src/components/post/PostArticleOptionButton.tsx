"use client";

import { deletePost } from "@/lib/utils/fetcher";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect } from "react";
import { IoIosMore } from "react-icons/io";

export default function PostArticleOptionButton({
  post,
  isClicked,
  setIsClicked,
  setIsEditMode,
}: any) {
  const router = useRouter();
  const handleClickOptionButton = () => setIsClicked(!isClicked);
  const handleClickEditButton = () => setIsEditMode(true);
  const handleClickDeleteButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await deletePost(post._id);
    router.push(`/categories/${post.category.slice(1)}`);
    router.refresh();
  };

  useEffect(() => {
    const handleClick = () => setIsClicked(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
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
  );
}
