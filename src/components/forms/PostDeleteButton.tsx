"use client";

import { refreshAccessToken } from "@/lib/utils/auth";
import { deletePost } from "@/lib/utils/fetchers/deleters";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { MouseEvent } from "react";

export default function PostDeleteButton({ post }: any) {
  const router = useRouter();

  const handleClick = async (e: MouseEvent) => {
    e.preventDefault();

    const accessToken = localStorage.getItem("accessToken") as string;
    const { error, deletedPost } = await deletePost(post._id, accessToken);

    if (error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken();
      const { error, deletedPost } = await deletePost(post._id, newAccessToken);

      if (error) return console.error({ error });

      console.log({ deletedPost });
      router.refresh();
      router.push("/");
    } else if (error) {
      return console.error({ error });
    }

    console.log({ deletedPost });
    router.refresh();
    router.push("/");
  };

  return (
    <Button onClick={handleClick} variant="contained" disabled>
      포스트 게시글 삭제
    </Button>
  );
}
