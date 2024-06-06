"use client";

import { refreshAccessToken } from "@/lib/utils/auth";
import useSWR from "swr";

async function fetcher(url: string) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    let response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
    if (response.status === 403) {
      console.log("403");
      const newAccessToken = await refreshAccessToken();
      response = await fetch(url, { headers: { Authorization: `Bearer ${newAccessToken}` } });
    }
    if (!response.ok) throw new Error("not ok");
    const { comments } = await response.json();
    return comments;
  } catch (error: any) {
    console.error(error.message);
    return error;
  }
}

export default function Comments({ postId }: any) {
  const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
  const { isLoading, data: comments } = useSWR(url, fetcher);
  console.log({ comments });

  return (
    <div>
      <h1>Comments</h1>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <ul>
          {comments?.map((comment: any) => (
            <li key={comment._id}>
              <p>{comment.content}</p>
              <p>{comment.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
