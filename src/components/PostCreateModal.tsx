"use client";

import { createPost } from "@/app/posts/create/actions";
import { Context } from "@/components/Provider";
import { useContext } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useParams } from "next/navigation";
import "../styles/PostCreateModal.scss";

function Button() {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending}>
      publish (게시하기)
    </button>
  );
}

export default function PostCreateModal() {
  // action
  const { setCurrentModal }: any = useContext(Context);
  const [state, formAction]: any = useFormState(
    // 래퍼함수 : 클라이언트와 서버의 작업을 순서대로 처리하기 위해서 존재한다.
    async (currentState: any, formData: FormData) => {
      const result = await createPost(formData, localStorage.getItem("accessToken") as string);
      setCurrentModal("");
      return result;
    },
    null
  );

  // options
  // header etc 에서 create a post 버튼 클릭한 경우에 사용할 값
  const { categories }: any = useContext(Context);
  // 각 페이지에서 포스트를 생성할 경우에 사용할 값
  const { category }: any = useParams();
  const joinedCurrentCategories = category.join("/");

  return (
    <div className="post-create-modal" onClick={(e) => e.stopPropagation()}>
      <form action={formAction}>
        <select name="category" id="category">
          {!joinedCurrentCategories &&
            categories.map((category: any) => (
              <option value={`/${category}`} key={category}>
                {category}
              </option>
            ))}
          {joinedCurrentCategories && (
            <option value={`/${joinedCurrentCategories}`}>{joinedCurrentCategories}</option>
          )}
        </select>

        <input type="text" name="title" placeholder="title" />
        <textarea name="content" placeholder="content" />
        <input type="text" name="author" placeholder="author" />
        <input type="text" name="tags" placeholder="tags" />
        {/* <button type="submit">publish (게시하기)</button> */}
        <Button />
      </form>
      {/* {state && <p>{state.message}</p>} */}
    </div>
  );
}