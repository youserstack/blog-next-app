"use client";

import { Context } from "@/components/context/Provider";
import { useContext, useEffect } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { useParams, useRouter } from "next/navigation";
import { refreshAccessToken } from "@/lib/utils/auth";
import { createPostAction } from "@/app/actions";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { MdCloudUpload } from "react-icons/md";
import "./PostCreateModal.scss";

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
  const { closeModal }: any = useContext(Context);
  const { category }: any = useParams();
  const categoryPath = decodeURI(category.map((v: any) => `/${v}`).join(""));
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
      router.refresh();
    }
  }, [state, closeModal, router]);

  return (
    <Paper className="post-create-modal" elevation={5}>
      <form action={formAction}>
        <FormControl>
          <Select value={categoryPath} name="category" id="category">
            <MenuItem value={categoryPath}>{categoryPath.replaceAll("/", " > ")}</MenuItem>
          </Select>
        </FormControl>
        <TextField type="text" name="title" label="제목" />
        <TextField type="text" name="content" label="내용" minRows={10} multiline />
        <TextField
          type="text"
          name="tags"
          label="태그를 comma로 나열해주세요. (예시 spring,summer)"
        />
        <input type="file" name="image" id="image" />
        <Button
          component="label"
          role={undefined}
          variant="contained"
          startIcon={<MdCloudUpload />}
          htmlFor="image"
        >
          이미지 업로드
        </Button>

        <SubmitButton />
      </form>
    </Paper>
  );
  // return (
  //   <Paper className="post-create-modal" elevation={5}>
  //     <form action={formAction}>
  //       <select
  //         name="category"
  //         id="category"
  //         className="MuiSelect-root MuiSelect-outlined MuiInputBase-input"
  //       >
  //         <option value={categoryPath}>{categoryPath.replaceAll("/", " > ")}</option>
  //       </select>
  //       <input
  //         type="text"
  //         name="title"
  //         placeholder="title"
  //         className="MuiInputBase-root MuiOutlinedInput-root MuiInputBase-input"
  //       />
  //       <textarea name="content" placeholder="content" />
  //       <input type="text" name="tags" placeholder="tags" />
  //       <input type="file" name="image" id="image" />
  //       <label htmlFor="image">
  //         <FcAddImage size={30} />
  //       </label>

  //       <Button />
  //     </form>
  //   </Paper>
  // );
}
