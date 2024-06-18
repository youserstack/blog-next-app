"use client";

import { MouseEvent, useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { mutate } from "swr";
import { refreshAccessToken } from "@/lib/utils/auth";
import { deleteComment } from "@/lib/utils/fetchers/deleters";
import "../../styles/CommentOptionButton.scss";

export default function CommentOptionButton({ commentId, postId }: any) {
  const [isClicked, setIsClicked] = useState(false);

  const handleClickOptionButton = (e: MouseEvent) => {
    e.stopPropagation();
    setIsClicked(!isClicked);
  };

  const handleClickDeleteButton = async (e: MouseEvent<HTMLButtonElement>) => {
    // console.log({ comment });
    e.preventDefault();
    try {
      const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
      const accessToken = localStorage.getItem("accessToken") as string;
      const result = await deleteComment(commentId, accessToken);

      // 토큰만료시 > 토큰갱신 > 재요청
      if (result.error?.code === "ERR_JWT_EXPIRED") {
        const newAccessToken = await refreshAccessToken();
        const result = await deleteComment(commentId, newAccessToken);

        // branch
        if (result.error) throw new Error("토큰갱신 후 댓글삭제요청 실패");
        console.log("토큰갱신 > 재요청 > 댓글을 삭제하였습니다.");
        const { deletedComment } = result;
        console.log({ deletedComment });
        mutate(url);
        return;
      }

      console.log("댓글을 삭제하였습니다.");
      const { deletedComment } = result;
      console.log({ deletedComment });
      mutate(url);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClick = () => setIsClicked(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  return (
    <div className="comment-option-button" onClick={handleClickOptionButton}>
      <IoIosMore className="more" />
      {isClicked && (
        <div className="option-layer" onClick={(e) => e.stopPropagation()}>
          <ul>
            <li>
              <button onClick={handleClickDeleteButton}>삭제</button>
            </li>
            <li>
              <button onClick={() => console.log({ commentId })}>test</button>
            </li>
            <li>
              <button>menu</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
