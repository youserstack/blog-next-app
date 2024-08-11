"use client";

import { Button, FormControl, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { useFormState, useFormStatus } from "react-dom";
import { MdCloudUpload, MdCreate } from "react-icons/md";
import { useContext, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { refreshAccessToken } from "@/lib/utils/auth";
import { createPostAction } from "@/app/actions";
import { mutate } from "swr";
import { ModalContext } from "../context/ModalContext";

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending} variant="contained">
      {pending ? "게시중..." : "게시하기"}
    </Button>
  );
}

export default function PostCreateModal() {
  const router = useRouter();
  const { closeModal } = useContext(ModalContext);
  const { category }: any = useParams();
  const categoryPath = decodeURI(category.map((v: any) => `/${v}`).join(""));
  const searchParams = useSearchParams();
  const page = searchParams?.get("page") || "1";

  const [state, formAction] = useFormState(async (currentState: any, formData: FormData) => {
    const accessToken = localStorage.getItem("accessToken") as string;
    const { newPost, error } = await createPostAction(formData, accessToken);

    // 토큰만료시 > 토큰갱신 > 재요청
    if (error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken(); // 재발급
      const data = await createPostAction(formData, newAccessToken); // 재요청
      const { newPost, error } = data;

      console.log("재요청");
      if (error) return { error };
      return { newPost };
    } else if (error) {
      return { error };
    }

    return { newPost };
  }, null);

  useEffect(() => {
    if (state?.newPost) {
      closeModal();
      const url = `${process.env.ROOT_URL}/api/posts?categoryPath=${categoryPath}&page=${page}`;
      mutate(url);
    }
  }, [state, closeModal, router]);

  return (
    <Paper
      component="form"
      className="post-create-modal"
      elevation={5}
      action={formAction}
      sx={{
        minWidth: "500px",
        maxHeight: "calc(100% - 150px)",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        overflowY: "scroll",
        scrollbarWidth: "thin",
        "& input#image": {
          display: "none",
        },
      }}
    >
      <Typography variant="h5" sx={{ display: "flex", gap: "0.5rem" }}>
        <MdCreate />
        포스트 게시물 작성하기
      </Typography>
      <FormControl>
        <Select value={categoryPath} name="category" id="category">
          <MenuItem value={categoryPath}>{categoryPath.replaceAll("/", " > ")}</MenuItem>
        </Select>
      </FormControl>
      <TextField type="text" name="title" label="제목" required />
      <TextField type="text" name="content" label="내용" minRows={10} multiline required />
      <TextField
        type="text"
        name="tags"
        label="태그를 comma로 나열해주세요. (예시 spring,summer)"
      />
      <input type="file" name="image" id="image" required />
      <Button component="label" variant="contained" startIcon={<MdCloudUpload />} htmlFor="image">
        이미지 업로드
      </Button>

      <SubmitButton />
    </Paper>
  );
}
