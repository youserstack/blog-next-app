"use client";

import CommentOptionButton from "@/components/buttons/CommentOptionButton";
import { LoadingContext } from "../context/LoadingContext";
import { Button, Paper } from "@mui/material";
import { useContext, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function CommentList({ postId }: any) {
  const { isLoading, data } = useSWR(`/api/comments?postId=${postId}`, fetcher);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => setIsLoading(isLoading), [setIsLoading, isLoading]);

  if (isLoading || !data) return null;
  return (
    <Paper
      component="ul"
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
