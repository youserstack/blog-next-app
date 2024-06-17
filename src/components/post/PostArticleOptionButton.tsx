"use client";

import { deletePost } from "@/lib/utils/fetcher";
import { useRouter } from "next/navigation";
import { MouseEvent, useEffect } from "react";
import { IoIosMore } from "react-icons/io";
import { refreshAccessToken } from "@/lib/utils/auth";
import "../../styles/PostArticleOptionButton.scss";

export default function PostArticleOptionButton({
  post,
  isClickedOptionButton,
  setIsClickedOptionButton,
  setIsEditMode,
}: any) {
  const router = useRouter();
  const handleClickOptionButton = () => setIsClickedOptionButton(!isClickedOptionButton);
  const handleClickEditButton = () => setIsEditMode(true);
  const handleClickDeleteButton = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken") as string;
    const result = await deletePost(post._id, accessToken);

    if (result.error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken(); // 재발급
      const result = await deletePost(post._id, newAccessToken);

      if (result.error) {
        console.error("재요청에 대한 에러가 발생했습니다.", result.error);
        return { error: result.error };
      }

      console.log("토큰갱신 > 재요청 > 포스트 생성 성공", {
        deletedPost: result.deletedPost,
      });
      return { deletedPost: result.deletedPost };
    } else if (result.error) {
      console.error("에러가 발생했습니다.", result.error);
      return { error: result.error };
    }

    console.log("포스트 삭제 성공", { deletedPost: result.deletedPost });
    router.back();
    router.refresh();
  };

  useEffect(() => {
    const handleClick = () => setIsClickedOptionButton(false);
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
      {isClickedOptionButton && (
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
