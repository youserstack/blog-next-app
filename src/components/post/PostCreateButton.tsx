"use client";

import { Context } from "@/components/context/Provider";
import { useContext } from "react";

export default function PostCreateButton() {
  const { user, setCurrentModal }: any = useContext(Context);

  if (!user) return null;

  return (
    <button className="post-create-button" onClick={() => setCurrentModal("post-create-modal")}>
      create a post
    </button>
  );
}
