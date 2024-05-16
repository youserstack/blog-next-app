"use client";

import { createPost } from "@/app/posts/create/actions";
import { Context } from "@/components/Provider";
import { useContext } from "react";
import { useFormState } from "react-dom";
import { useParams } from "next/navigation";
import "../styles/PostCreateModal.scss";

export default function PostCreateModal() {
  const { setCurrentModal }: any = useContext(Context);

  const [state, formAction]: any = useFormState(
    async (prevState: any, formData: FormData): Promise<any> => {
      // 서버액션으로부터 클라이언트상태를 리터한다.
      const result = await createPost(formData, localStorage.getItem("accessToken") as string);
      setCurrentModal("");
      if (result.status === "ok") return "블로그 포스트 완료";
      if (result.status === "error") return "포스트 등록 실패";
    },
    undefined
  );
  console.log({ state });

  // options
  const { categories }: any = useContext(Context);
  const { category }: any = useParams();
  const joinedParentCategories = category.join("/");
  // console.log({ category });
  // console.log({ joinedParentCategories });

  return (
    <div className="post-create-modal" onClick={(e) => e.stopPropagation()}>
      <form action={formAction}>
        <select name="category" id="category">
          {joinedParentCategories && (
            <option value={`/${joinedParentCategories}`}>{joinedParentCategories}</option>
          )}
          {!joinedParentCategories &&
            categories.map((category: any) => (
              <option value={`/${category}`} key={category}>
                {category}
              </option>
            ))}
        </select>

        <input type="text" name="title" placeholder="title" />
        <textarea name="content" placeholder="content" />
        <input type="text" name="author" placeholder="author" />
        <input type="text" name="tags" placeholder="tags" />
        <button type="submit">publish (게시하기)</button>
      </form>
      {state && <p>{state}</p>}
    </div>
  );
}
