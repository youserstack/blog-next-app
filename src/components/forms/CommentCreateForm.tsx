"use client";

import { Button, Paper, TextField } from "@mui/material";
import { refreshAccessToken } from "@/lib/utils/auth";
import { AuthContext } from "../context/AuthContext";
import { createCommentAction } from "@/app/actions";
import { useContext, useEffect } from "react";
import { useFormState } from "react-dom";
import Image from "next/image";
import Link from "next/link";
import { mutate } from "swr";

export default function CommentCreateForm({
  authorImage,
  postId,
}: {
  authorImage: any;
  postId: string;
}) {
  const { user } = useContext(AuthContext);

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
    if (state?.newComment) {
      console.log({ newComment: state.newComment });
      mutate(`${process.env.ROOT_URL}/api/comments?postId=${postId}`); // 클라이언트 리패칭
    }
    if (state?.error) {
      console.error({ error: state.error });
    }
  }, [state, postId]);

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
