"use client";

import { useFormState } from "react-dom";
import { createPost } from "@/app/posts/create/actions";
import { useContext } from "react";
import { Context } from "@/components/context/Provider";
import { useRouter } from "next/navigation";
import "./page.scss";
import { refreshAccessToken } from "@/lib/utils/auth";

export default function PostCreate() {
  console.log("\n\x1b[34m[pages/post-create]\x1b[0m");
  const router = useRouter();
  const { categoryPaths }: any = useContext(Context);
  // console.log({ categoryPaths });

  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const accessToken = localStorage.getItem("accessToken") as string;
    const result = await createPost(formData, accessToken);

    // 토큰만료시 재발급후 재요청
    if (result.error.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken();
      const result = await createPost(formData, newAccessToken);
      console.log("accessToken 갱신후 재요청...");
      console.log({ newPost: result.newPost });
    }

    console.log({ newPost: result.newPost });
    return { newPost: result.newPost };
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
