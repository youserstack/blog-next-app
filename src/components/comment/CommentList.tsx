"use client";

import useSWR from "swr";
import Image from "next/image";
import CommentOptionButton from "@/components/comment/CommentOptionButton";
import "../../styles/CommentList.scss";

async function fetcher(url: string) {
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("전체 댓글 읽기 실패");
    const { comments } = await response.json();
    return comments;
  } catch (error: any) {
    console.error(error.message);
    return error;
  }
}

export default function CommentList({ postId }: any) {
  const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
  const { isLoading, data: comments } = useSWR(url, fetcher);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <ul className="comment-list">
      {comments?.map((comment: any) => (
        <li className="comment-item" key={comment._id}>
          <div className="thumbnail">
            <Image src={comment.author.image} alt="" width={30} height={30} />
          </div>
          <div className="main">
            <div className="header">
              <div className="author-name">{comment.author.name}</div>
            </div>
            <div className="body">
              <p>{comment.content}</p>
            </div>
            <div className="footer">
              <button>답글</button>
            </div>
          </div>

          <CommentOptionButton comment={comment} />
        </li>
      ))}
    </ul>
  );
}
