"use client";

import { createComment } from "@/app/posts/[...id]/actions";
import { useFormState } from "react-dom";

export default function CommentCreateForm({ postId }: { postId: string }) {
  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const response = await createComment(
      formData,
      postId,
      localStorage.getItem("accessToken") as string
    );
    return response;
  }, null);

  if (state?.newComment) console.log({ newComment: state.newComment });

  return (
    <form action={formAction}>
      <input type="text" name="content" />
      <button type="submit">등록하기</button>
    </form>
  );
}
