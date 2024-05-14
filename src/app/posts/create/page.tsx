"use client";

import { useFormState } from "react-dom";
import { createPost } from "@/app/posts/create/actions";
import { useContext } from "react";
import { Context } from "@/components/Provider";
import "./page.scss";

export default function PostCreate() {
  // console.log("\n[post-create-page]");

  const [state, formAction]: any = useFormState((prevState: any, formData: FormData) => {
    createPost(formData, localStorage.getItem("accessToken") as string);
  }, undefined);
  // console.log({ state });

  const { categories }: any = useContext(Context);
  console.log({ categories });

  return (
    <main className="post-create-page">
      <section>
        <h1>Post Create Page</h1>
        <form action={formAction}>
          <select name="category" id="category">
            {categories.map((category: any) => (
              <option value={`${category}/`}>{category}</option>
            ))}

            {/* <option value="/web">web</option>
            <option value="/web/framework">web/framework</option>
            <option value="/web/framework/nextjs">web/framework/nextjs</option>
            <option value="/web/framework/reactjs">web/framework/reactjs</option>
            <option value="/web/library">web/library</option> */}
          </select>

          <input type="text" name="title" placeholder="title" />
          <textarea name="content" placeholder="content" />
          <input type="text" name="author" placeholder="author" />
          <input type="text" name="tags" placeholder="tags" />
          <button type="submit">publish (게시하기)</button>
        </form>
        {state && <p>{state}</p>}
      </section>
    </main>
  );
}
