"use client";

import { createPost } from "@/app/posts/create/actions";
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
    const response = await createPost(formData, accessToken);

    if (response?.errorCode === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken(); // 새로운 토큰 발급
      const response = await createPost(formData, newAccessToken); // 재요청
      return response;
    } else if (response?.newPost) {
      console.log("성공적으로 새로운 포스트 글을 생성하였습니다.");
      return response;
    } else return null;
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
