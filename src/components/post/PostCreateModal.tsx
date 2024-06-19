"use client";

import { Context } from "@/components/context/Provider";
import { useContext, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useParams, useRouter } from "next/navigation";
import { refreshAccessToken } from "@/lib/utils/auth";
import { createPostAction } from "@/app/actions";
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
  const { category } = useParams();
  if (!(category instanceof Array)) return null;
  const categoryPath = decodeURI(category.map((v: any) => `/${v}`).join(""));
  console.log({ categoryPath });

  const router = useRouter();
  const { setCurrentModal }: any = useContext(Context);
  const [state, formAction] = useFormState(async (currentState: any, formData: FormData) => {
    const accessToken = localStorage.getItem("accessToken") as string;
    const data = await createPostAction(formData, accessToken);
    const { newPost, error } = data;

    // 토큰만료시 > 토큰갱신 > 재요청
    if (error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken(); // 재발급
      const data = await createPostAction(formData, newAccessToken); // 재요청
      const { newPost, error } = data;

      if (error) {
        console.error("재요청에 대한 에러가 발생했습니다.", error);
        return data;
      }

      console.log("토큰갱신 > 재요청 > 포스트를 생성하였습니다.", { newPost });
      return { newPost };
    } else if (error) {
      console.error("에러가 발생했습니다.", error);
      return { error };
    }

    console.log("포스트를 생성하였습니다.", { newPost });
    return { newPost };
  }, null);

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
          <option value={categoryPath}>{categoryPath.replaceAll("/", " > ")}</option>
        </select>
        <input type="text" name="title" placeholder="title" />
        <textarea name="content" placeholder="content" />
        <input type="text" name="author" placeholder="author" />
        <input type="text" name="tags" placeholder="tags" />
        <Button />
      </form>
    </div>
  );
}
