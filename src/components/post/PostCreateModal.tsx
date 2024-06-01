"use client";

import { createPost } from "@/app/posts/create/actions";
import { Context } from "@/components/context/Provider";
import { useContext } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useParams, useRouter } from "next/navigation";
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
  const [state, formAction] = useFormState(
    // 엑세스 토큰을 서버액션에 넘기기 위해서 래퍼함수를 사용한다.
    async (currentState: any, formData: FormData) => {
      const response = await createPost(formData, localStorage.getItem("accessToken") as string);
      return response;
    },
    null
  );

  // useEffect(() => {
  //   console.log({ state });
  // }, [state]);

  // options
  // 각 페이지에서 포스트를 생성할 경우에 사용할 값
  const { category: categorySegments }: any = useParams();
  const currentCategoryPath = categorySegments.map((segment: any) => `/${segment}`).join("");
  const decodedCategory = decodeURI(categorySegments[categorySegments.length - 1]);
  // console.log({ currentCategoryPath, decodedCategory });

  if (state?.newPost) {
    setCurrentModal("");
    router.refresh();
  }

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
