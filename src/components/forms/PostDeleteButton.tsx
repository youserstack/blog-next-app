"use client";

import { refreshAccessToken } from "@/lib/utils/auth";
import { deletePost } from "@/lib/utils/fetchers/deleters";
import { Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function PostDeleteButton({ post }: any) {
  const router = useRouter();

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken") as string;
    const { error, deletedPost } = await deletePost(post._id, accessToken);

    if (error?.code === "ERR_JWT_EXPIRED") {
      console.log("재요청");
      const newAccessToken = await refreshAccessToken();
      const { error, deletedPost } = await deletePost(post._id, newAccessToken);

      if (error) return console.error({ error });
      console.log({ deletedPost });
      router.push("/categories" + post.category);
    } else if (error) {
      return console.error({ error });
    }

    console.log({ deletedPost });
    router.push("/categories" + post.category);
  };

  return (
    <Button onClick={handleClick} variant="contained">
      포스트 게시글 삭제
    </Button>
  );
}
