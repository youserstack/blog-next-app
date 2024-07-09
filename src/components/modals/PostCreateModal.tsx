"use client";

import { Context } from "@/components/context/Provider";
import { useContext, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useParams, useRouter } from "next/navigation";
import { refreshAccessToken } from "@/lib/utils/auth";
import { createPostAction } from "@/app/actions";
import { MdCloudUpload } from "react-icons/md";
import { mutate } from "swr";
import { Button, FormControl, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
// import Button from "@mui/material/Button";
// import FormControl from "@mui/material/FormControl";
// import MenuItem from "@mui/material/MenuItem";
// import Paper from "@mui/material/Paper";
// import Select from "@mui/material/Select";
// import TextField from "@mui/material/TextField";
// import Typography from "@mui/material/Typography";

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
  const { closeModal, dynamicUrl }: any = useContext(Context);
  const { category }: any = useParams();
  const categoryPath = decodeURI(category.map((v: any) => `/${v}`).join(""));
  const url = `${process.env.ROOT_URL}/api/posts?categoryPath=${encodeURIComponent(categoryPath)}`;

  const [state, formAction] = useFormState(async (currentState: any, formData: FormData) => {
    const accessToken = localStorage.getItem("accessToken") as string;
    const data = await createPostAction(formData, accessToken);
    const { newPost, error } = data;

    // 토큰만료시 > 토큰갱신 > 재요청
    if (error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken(); // 재발급
      const data = await createPostAction(formData, newAccessToken); // 재요청
      const { newPost, error } = data;

      if (error) {
        console.error("재요청에 대한 에러가 발생했습니다.", error);
        return data;
      }
      console.log("토큰갱신 > 재요청 > 포스트를 생성하였습니다.", { newPost });
      return { newPost };
    } else if (error) {
      console.error("에러가 발생했습니다.", error);
      return { error };
    }

    console.log("포스트를 생성하였습니다.", { newPost });
    return { newPost };
  }, null);

  useEffect(() => {
    if (state?.newPost) {
      closeModal();
      // mutate("categorized-posts");
      mutate(dynamicUrl);
    }
  }, [state, closeModal, router]);

  return (
    <Paper
      component={"form"}
      className="post-create-modal"
      elevation={5}
      action={formAction}
      sx={{
        minWidth: "500px",
        minHeight: "500px",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        "& input#image": {
          display: "none",
        },
      }}
    >
      <Typography variant="h5">포스트 게시물 등록</Typography>
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
