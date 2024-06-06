"use client";

import useSWR from "swr";

async function fetcher(url: string) {
  try {
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(url, { headers: { Authorization: `Bearer ${accessToken}` } });
    const data = await response.json();
    if (!response.ok) throw new Error("not ok");
    return data.comments;
  } catch (error: any) {
    console.error(error.message);
    return error;
  }
}

export default function Comments({ postId }: any) {
  const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
  const { isLoading, data: comments } = useSWR(url, fetcher);

  return (
    <div>
      <h1>Comments</h1>
      {isLoading ? (
        <h3>Loading...</h3>
      ) : (
        <ul>
          {comments.map((comment: any) => (
            <li>
              <p>{comment.content}</p>
              <p>{comment.author}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
