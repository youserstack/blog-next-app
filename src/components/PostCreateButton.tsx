"use client";

import { Context } from "@/components/Provider";
import { useContext } from "react";

export default function PostCreateButton() {
  const { setCurrentModal }: any = useContext(Context);

  return <button onClick={() => setCurrentModal("post-create-modal")}>create a post</button>;
}
