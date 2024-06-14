"use client";

import { createPostAction } from "@/app/posts/actions";
import { Context } from "@/components/context/Provider";
import { useContext, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useParams, useRouter } from "next/navigation";
import { refreshAccessToken } from "@/lib/utils/auth";
import "../../styles/PostCreateModal.scss";

function Button() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      publish (게시하기)
    </button>
  );
}

export default function PostCreateModal() {
  const router = useRouter();
  const { setCurrentModal }: any = useContext(Context);
  const [state, formAction] = useFormState(async (currentState: any, formData: FormData) => {
    const accessToken = localStorage.getItem("accessToken") as string;
    const result = await createPostAction(formData, accessToken);

    // 토큰만료시 > 토큰갱신 > 재요청
    if (result.error.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken(); // 재발급
      const result = await createPostAction(formData, newAccessToken); // 재요청

      if (result.error) {
        console.error("재요청에 대한 에러가 발생했습니다.", result.error);
        return { error: result.error };
      }

      console.log("토큰갱신 > 재요청 > 새로운 포스트를 생성하였습니다.", {
        newPost: result.newPost,
      });
      return { newPost: result.newPost };
    } else if (result.error) {
      console.error("에러가 발생했습니다.", result.error);
      return { error: result.error };
    }

    console.log("새로운 포스트를 생성하였습니다.", { newPost: result.newPost });
    return { newPost: result.newPost };
  }, null);

  // options
  // 각 페이지에서 포스트를 생성할 경우에 사용할 값
  const { category: categorySegments }: any = useParams();
  const currentCategoryPath = categorySegments.map((segment: any) => `/${segment}`).join("");
  const decodedCategory = decodeURI(categorySegments[categorySegments.length - 1]);
  // console.log({ currentCategoryPath, decodedCategory });

  useEffect(() => {
    if (state?.newPost) {
      setCurrentModal("");
      router.refresh();
    }
  }, [state, setCurrentModal, router]);

  return (
    <div className="post-create-modal" onClick={(e) => e.stopPropagation()}>
      <form action={formAction}>
        <select name="category" id="category">
          <option value={currentCategoryPath}>{decodedCategory}</option>
        </select>
        <input type="text" name="title" placeholder="title" />
        <textarea name="content" placeholder="content" />
        <input type="text" name="author" placeholder="author" />
        <input type="text" name="tags" placeholder="tags" />
        <Button />
      </form>
      {/* {state && <p>{state.message}</p>} */}
    </div>
  );
}
