"use client";

import useSWR from "swr";
import Image from "next/image";
import CommentOptionButton from "@/components/buttons/CommentOptionButton";
import { useContext, useEffect } from "react";
import { Context } from "@/components/context/Provider";
import "./CommentList.scss";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function CommentList({ postId }: any) {
  const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
  const { isLoading, data } = useSWR(url, fetcher);
  const { setIsLoading }: any = useContext(Context);

  useEffect(() => {
    // isLoading은 처음 로드시에만 값이 true에서 false로 변경된다.
    // 하지만, isValidating은 데이터를 패칭할때마다 true에서 false로 변경된다.
    setIsLoading(isLoading);
  }, [isLoading]);

  if (isLoading) return null;

  return (
    <ul className="comment-list">
      {data?.comments?.map((comment: any) => (
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
