"use client";

import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  post: IPost;
}

const fetcher = async (url: string) => {
  const response = await fetch(url, { method: "delete" });
  if (!response.ok) throw new Error("최신글 데이터 요청 실패");
  return response.json();
};

export default function PostDeleteButton({ post }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClick = async () => {
    const postId = post._id;
    const category = post.category;

    try {
      setIsDeleting(true);
      const data = await fetcher(`${process.env.ROOT_URL}/api/posts/${postId}`);
      console.log("삭제된 포스트글", data);
      router.replace(`/categories/${category}`);
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : "알수없는 에러가 발생");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button onClick={handleClick} variant="contained" disabled={isDeleting}>
      {isDeleting ? "삭제 중..." : "포스트 게시글 삭제"}
    </Button>
  );
}
