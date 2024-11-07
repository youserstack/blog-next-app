"use client";

import CommentOptionButton from "@/components/buttons/CommentOptionButton";
import { Button, Paper } from "@mui/material";
import Image from "next/image";
import useSWR from "swr";
import Loading from "../ui/Loading";

export default function CommentList({ postId }: any) {
  const { isValidating, data } = useSWR("post-comments", () =>
    fetch(`/api/comments?postId=${postId}`, { cache: "no-cache" }).then((res) => res.json())
  );

  if (isValidating) return <Loading />;

  if (!data || !data.comments || data.comments.length === 0) {
    if (!data) console.log("데이터가 null입니다.");
    if (!data.comments) console.log("댓글리스트가 null입니다.");
    if (data.comments.length === 0) console.log("댓글리스트 길이가 0입니다.");
    return null;
  }

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
      {data.comments.map((comment: any) => {
        if (!comment) {
          console.error("해당 댓글이 존재하지 않습니다.");
          return null;
        }

        const { _id, content, post, author } = comment;
        const name = author.name;
        if (!author.image) console.error("댓글 사용자 이미지가 존재하지 않습니다.");
        const image = author.image ?? "no image url"; // 이미지없는경우 기본값으로

        return (
          <li className="comment-item" key={_id} style={{ display: "flex", gap: "1rem" }}>
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
              <Image src={image} alt={image} width={30} height={30} />
            </div>

            <div style={{ flex: "1" }}>
              <div className="author-name">{name}</div>
              <p>{content}</p>
              <Button>답글</Button>
            </div>

            <CommentOptionButton commentId={_id} postId={post._id} />
          </li>
        );
      })}
    </Paper>
  );
}
