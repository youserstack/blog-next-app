"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

export default function PostDeleteButton({ post }: any) {
  const router = useRouter();

  return (
    <Button
      onClick={async (e) => {
        e.preventDefault();

        const postId = post._id;
        const category = post.category;

        const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`, {
          method: "delete",
        });
        const data = await response.json();

        console.log("삭제된 포스트글", data);
        router.push(`/categories/${category}`);
      }}
      variant="contained"
    >
      포스트 게시글 삭제
    </Button>
  );
}
