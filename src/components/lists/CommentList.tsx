"use client";

import useSWR from "swr";
import Image from "next/image";
import CommentOptionButton from "@/components/buttons/CommentOptionButton";
import { useContext, useEffect } from "react";
import { Context } from "@/components/context/Provider";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
// import { Button, Paper } from "@mui/material";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function CommentList({ postId }: any) {
  const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
  const { isLoading, data } = useSWR(url, fetcher);
  const { setIsLoading }: any = useContext(Context);

  useEffect(() => {
    // isLoading은 처음 로드시에만 값이 true에서 false로 변경된다.
    // 하지만, isValidating은 데이터를 패칭할때마다 true에서 false로 변경된다.
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  if (isLoading) return null;

  return (
    <Paper
      component={"ul"}
      className="comment-list"
      variant="outlined"
      sx={{
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      {data?.comments?.map((comment: any) => (
        <li className="comment-item" key={comment._id} style={{ display: "flex", gap: "1rem" }}>
          <div
            className="thumbnail"
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "1px solid",
            }}
          >
            <Image src={comment.author.image} alt="" width={30} height={30} />
          </div>

          <div style={{ flex: "1" }}>
            <div className="author-name">{comment.author.name}</div>
            <p>{comment.content}</p>
            <Button>답글</Button>
          </div>

          <CommentOptionButton commentId={comment._id} postId={comment.post._id} />
        </li>
      ))}
    </Paper>
  );
}
