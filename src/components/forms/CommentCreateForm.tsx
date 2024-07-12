"use client";

import { refreshAccessToken } from "@/lib/utils/auth";
import { useFormState } from "react-dom";
import { mutate } from "swr";
import { useContext, useEffect } from "react";
import { Context } from "@/components/context/Provider";
import { createCommentAction } from "@/app/actions";
import Image from "next/image";
import Link from "next/link";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
// import { Button, Paper, TextField } from "@mui/material";

export default function CommentCreateForm({
  authorImage,
  postId,
}: {
  authorImage: any;
  postId: string;
}) {
  const { user }: any = useContext(Context);

  const [state, formAction] = useFormState(async (prevState: any, formData: FormData) => {
    const accessToken = localStorage.getItem("accessToken") as string;
    const { error, newComment } = await createCommentAction(formData, postId, accessToken);

    // 토큰만료시 > 토큰갱신 > 재요청
    if (error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken();
      const { error, newComment } = await createCommentAction(formData, postId, newAccessToken);
      console.log("재요청");
      return { error, newComment };
    } else if (error || newComment) {
      return { error, newComment };
    } else {
      return { error: "exception" };
    }
  }, null);

  useEffect(() => {
    const url = `${process.env.ROOT_URL}/api/comments?postId=${postId}`;
    if (state?.newComment) {
      console.log({ newComment: state.newComment });
      mutate(url); // 클라이언트 리패칭
    }
    if (state?.error) {
      console.error({ error: state.error });
    }
  }, [state]);

  return (
    <Paper
      component={"form"}
      action={formAction}
      variant="outlined"
      sx={{
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
      }}
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
        <Image src={authorImage} alt="" width={30} height={30} />
      </div>
      <div className="main" style={{ flex: "1" }}>
        {user ? (
          <>
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
