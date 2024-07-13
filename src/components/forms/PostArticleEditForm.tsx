"use client";

import { updatePostAction } from "@/app/actions";
import { refreshAccessToken } from "@/lib/utils/auth";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";
import { MdCloudUpload } from "react-icons/md";
import { Box, Button, Paper, TextField } from "@mui/material";
import PostDeleteButton from "./PostDeleteButton";
import Image from "next/image";
import { CSSProperties, useEffect, useState } from "react";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import Paper from "@mui/material/Paper";
// import TextField from "@mui/material/TextField";

export default function PostArticleEditForm({ post }: any) {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState(post.image);
  const [updateState, updateAction] = useFormState(
    async (currentState: any, formData: FormData) => {
      const accessToken = localStorage.getItem("accessToken") as string;
      const { error, updatedPost } = await updatePostAction(formData, post._id, accessToken);

      if (error?.code === "ERR_JWT_EXPIRED") {
        const newAccessToken = await refreshAccessToken();
        const { error, updatedPost } = await updatePostAction(formData, post._id, newAccessToken);

        if (error) {
          console.error("재요청에 대한 에러가 발생했습니다.", error);
          return { error };
        }

        console.log("토큰갱신 > 재요청 > 포스트 수정", { updatedPost });
        router.refresh();
        return { updatedPost };
      } else if (error) {
        console.error("에러가 발생했습니다.", error);
        return { error };
      }

      console.log("포스트 수정", { updatedPost });
      router.refresh();
      return { updatedPost };
    },
    null
  );

  useEffect(() => {
    if (updateState?.updatedPost) router.back();
  }, [updateState, router]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // URL 객체를 이용한 blob object의 url 생성
      const objectUrl = URL.createObjectURL(file);
      setThumbnail(objectUrl);

      // Clean up the URL object after using it
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <Paper
      component={"form"}
      className="post-article-edit-form"
      action={updateAction}
      sx={editFormStyle}
    >
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <p>작성자 : {post.author?.name}</p>
        <p>{post.createdAt?.slice(0, 10)}</p>
      </Box>

      <Box sx={imageBoxStyle}>
        <Image src={thumbnail} alt="" width={1000} height={1000} style={{ height: "300px" }} />
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Button
          component="label"
          className="image-label"
          startIcon={<MdCloudUpload />}
          htmlFor="image"
          sx={{ position: "absolute", bottom: "1rem", right: "1rem" }}
          variant="contained"
        >
          썸네일 변경하기
        </Button>
      </Box>

      <Box sx={{ display: "flex", gap: "1rem" }}>
        <TextField
          name="category"
          defaultValue={post.category}
          label="카테고리"
          disabled
          fullWidth
        />
        <TextField name="title" defaultValue={post.title} label="제목" required fullWidth />
      </Box>

      <TextField name="content" defaultValue={post.content} label="본문내용" multiline />

      <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <SubmitButton />
        <Button className="cancel-button" variant="contained" onClick={() => router.back()}>
          취소
        </Button>
        <PostDeleteButton post={post} />
      </Box>
    </Paper>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant="contained">
      {pending ? "수정중..." : "수정"}
    </Button>
  );
}

const editFormStyle: CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "1rem",
};

const imageBoxStyle: CSSProperties = {
  minHeight: "300px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "1rem",
  position: "relative",
};
