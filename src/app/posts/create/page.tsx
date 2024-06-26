"use client";

import { useFormState } from "react-dom";
import { useContext, useEffect } from "react";
import { Context } from "@/components/context/Provider";
import { useRouter } from "next/navigation";
import { refreshAccessToken } from "@/lib/utils/auth";
import { createPostAction } from "@/app/actions";
import "./page.scss";

export default function PostCreate() {
  console.log("\n\x1b[34m[/post-create]\x1b[0m");
  const router = useRouter();
  const { categoryPaths }: any = useContext(Context);
  // console.log({ categoryPaths });

  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const accessToken = localStorage.getItem("accessToken") as string;
    const { error, newPost } = await createPostAction(formData, accessToken);

    // 토큰만료시 재발급후 재요청
    if (error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken();
      const { error, newPost } = await createPostAction(formData, newAccessToken);

      if (error) {
        console.error("재요청에 대한 에러가 발생했습니다.", error);
        return { error };
      }

      console.log("토큰갱신 > 재요청 > 포스트 생성", { newPost });
      router.refresh();
      console.log({ newPost });
      return { newPost };
    } else if (error) {
      return { error };
    }

    console.log("성공적으로 새로운 포스트 글을 생성하였습니다.");
    router.refresh();
    return { newPost };
  }, null);

  return (
    <main className="post-create-page">
      <section>
        <h1>Post Create Page</h1>
        <form action={formAction}>
          <select name="category" id="category">
            {categoryPaths.map((category: any) => (
              <option value={category} key={category}>
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
        {/* {state && <p>{state}</p>} */}
      </section>
    </main>
  );
}
