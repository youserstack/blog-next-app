"use client";

import CommentOptionButton from "@/components/buttons/CommentOptionButton";
import { Button, Paper } from "@mui/material";
import Image from "next/image";
import useSWR from "swr";
import Loading from "../ui/Loading";

export default function CommentList({ postId }: any) {
  const { isLoading, data } = useSWR("post-comments", () =>
    fetch(`/api/comments?postId=${postId}`, { cache: "no-cache" }).then((res) => res.json())
  );

  if (isLoading || !data) return <Loading />;
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
            <Image
              src={
                comment.author.image ||
                "https://res.cloudinary.com/dzktdrw7o/image/upload/v1713961579/blog-next-app/user2_zrx6nk.png"
              }
              alt=""
              width={30}
              height={30}
            />
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
