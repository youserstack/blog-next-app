"use client";

import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { IoIosMore } from "react-icons/io";
import { refreshAccessToken } from "@/lib/utils/auth";
import { deletePost } from "@/lib/utils/fetchers/deleters";
import { useFormState } from "react-dom";
import { Context } from "@/components/context/Provider";
import "../../styles/PostArticleOptionButton.scss";

export default function PostArticleOptionButton({
  post,
  isClickedOptionButton,
  setIsClickedOptionButton,
  setIsEditMode,
}: any) {
  const router = useRouter();
  const { user }: any = useContext(Context);
  const [state, action] = useFormState(async () => {
    const accessToken = localStorage.getItem("accessToken") as string;
    const { error, deletedPost } = await deletePost(post._id, accessToken);

    if (error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken();
      const { error, deletedPost } = await deletePost(post._id, newAccessToken);

      if (error) {
        console.error("재요청에 대한 에러가 발생했습니다.", error);
        return { error };
      }

      console.log("토큰갱신 > 재요청 > 포스트 생성 성공", { deletedPost });
      router.refresh();
      return { deletedPost };
    } else if (error) {
      console.error("에러가 발생했습니다.", error);
      return { error };
    }

    console.log("포스트 삭제 성공", { deletedPost });
    router.refresh();
    return { deletedPost };
  }, null);

  useEffect(() => {
    if (state?.deletedPost) router.back();
  }, [state]);

  useEffect(() => {
    const handleClick = () => setIsClickedOptionButton(false);
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const handleClickOptionButton = () => setIsClickedOptionButton(!isClickedOptionButton);
  const handleClickEditButton = () => setIsEditMode(true);

  if (!user) return null;

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
              <form action={action}>
                <button type="submit">delete this post article</button>
              </form>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
