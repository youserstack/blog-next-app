"use client";

import useSWR from "swr";

export default function Comments({ postId }: any) {
  const { data, isLoading } = useSWR(`${process.env.ROOT_URL}/api/comments?postId=${postId}`);

  return (
    <div>
      <h1>Comments</h1>
    </div>
  );
}
