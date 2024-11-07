"use client";

import { Button, Paper, TextField } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import { mutate } from "swr";
import { useSession } from "next-auth/react";

interface Props {
  postId: string;
}

export default function CommentCreateForm({ postId }: Props) {
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const response = await fetch(`${process.env.ROOT_URL}/api/comments?postId=${postId}`, {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    console.log("생성된 댓글", data);

    mutate("post-comments");
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      variant="outlined"
      sx={{ padding: "1rem", display: "flex", alignItems: "center", gap: "1rem" }}
    >
      <div
        style={{
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          overflow: "hidden",
          border: "2px solid green",
          alignSelf: "flex-start",
        }}
      >
        <Image
          src={
            session?.user.image ||
            "https://res.cloudinary.com/dzktdrw7o/image/upload/v1713961579/blog-next-app/user2_zrx6nk.png"
          }
          alt=""
          width={30}
          height={30}
        />
      </div>

      <div className="main" style={{ flex: "1" }}>
        {session ? (
          <>
            <TextField
              multiline
              maxRows={30}
              name="userId"
              value={session.user.id}
              style={{ display: "none" }}
            />
            <TextField multiline maxRows={30} name="content" fullWidth label="댓글" />
            <Button type="submit">등록하기</Button>
          </>
        ) : (
          <Button>
            <Link href={"/auth/signin"}>로그인</Link>
          </Button>
        )}
      </div>
    </Paper>
  );
}
