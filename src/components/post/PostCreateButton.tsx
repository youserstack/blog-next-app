"use client";

import { Context } from "@/components/context/Provider";
import { useContext } from "react";

export default function PostCreateButton() {
  const { setCurrentModal }: any = useContext(Context);

  return (
    <button className="post-create-button" onClick={() => setCurrentModal("post-create-modal")}>
      create a post
    </button>
  );
}
