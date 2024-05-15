"use client";

import { createPost } from "@/app/posts/create/actions";
import { Context } from "@/components/Provider";
import { useContext } from "react";
import { useFormState } from "react-dom";
import "../styles/PostCreateModal.scss";

export default function PostCreateModal() {
  const [state, formAction]: any = useFormState((prevState: any, formData: FormData) => {
    createPost(formData, localStorage.getItem("accessToken") as string);
  }, undefined);
  // console.log({ state });

  const { categories }: any = useContext(Context);
  console.log({ categories });

  return (
    <div className="post-create-modal">
      <form action={formAction}>
        <select name="category" id="category">
          {categories.map((category: any) => (
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
