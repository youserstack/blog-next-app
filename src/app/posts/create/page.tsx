"use client";

import { useFormState } from "react-dom";
import { createPost } from "@/app/posts/create/actions";
import { useContext } from "react";
import { Context } from "@/components/context/Provider";
import { useRouter } from "next/navigation";
import "./page.scss";

export default function PostCreate() {
  console.log("\n\x1b[34m[pages/post-create]\x1b[0m");
  const router = useRouter();
  const { categoryPaths }: any = useContext(Context);
  // console.log({ categoryPaths });

  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const response = await createPost(formData, localStorage.getItem("accessToken") as string);
    return response;
  }, null);
  // console.log({ state });

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
