"use client";

import CommentOptionButton from "@/components/buttons/CommentOptionButton";
import { Button, Paper } from "@mui/material";
import { useContext, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";
import { LoadingContext } from "../context/LoadingContext";

const fetcher = (url: string) => fetch(url, { cache: "no-cache" }).then((res) => res.json());

export default function CommentList({ postId }: any) {
  const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
  const { isValidating, data } = useSWR(url, fetcher);
  const { setIsLoading } = useContext(LoadingContext);

  useEffect(() => setIsLoading(isValidating), [setIsLoading, isValidating]);

  if (!data) return null;

  return (
    <Paper
      component={"ul"}
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
