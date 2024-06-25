"use client";

import useSWR from "swr";
import Image from "next/image";
import CommentOptionButton from "@/components/comment/CommentOptionButton";
import "../../styles/CommentList.scss";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function CommentList({ postId }: any) {
  const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
  const { isLoading, data } = useSWR(url, fetcher);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <ul className="comment-list">
      {data.comments?.map((comment: any) => (
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

          <CommentOptionButton commentId={comment._id} postId={comment.post._id} />
        </li>
      ))}
    </ul>
  );
}
