"use client";

import { MouseEvent, useEffect, useState } from "react";
import { IoIosMore } from "react-icons/io";
import { deleteComment } from "@/lib/utils/fetcher";
import { mutate } from "swr";
import { usePathname, useRouter } from "next/navigation";
import "../../styles/CommentOptionButton.scss";
import { refreshAccessToken } from "@/lib/utils/auth";

export default function CommentOptionButton({ comment }: any) {
  const [isClicked, setIsClicked] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const handleClickOptionButton = (e: MouseEvent) => {
    e.stopPropagation();
    setIsClicked(!isClicked);
  };

  const handleClickDeleteButton = async (e: MouseEvent<HTMLButtonElement>) => {
    // console.log({ comment });
    e.preventDefault();
    try {
      const accessToken = localStorage.getItem("accessToken") as string;
      const result = await deleteComment(comment._id, accessToken);
      if (result.error.code === "ERR_JWT_EXPIRED") {
        const newAccessToken = await refreshAccessToken();
        const result = await deleteComment(comment._id, newAccessToken);
      }
      console.log({ result });
      router.push(pathname);
      router.refresh();
    } catch (error) {}
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
              <button>menu</button>
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
