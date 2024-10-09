"use client";

import {
  Button,
  FormControl,
  IconButton,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { MdCloudUpload, MdCreate } from "react-icons/md";
import { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { mutate } from "swr";
import { ModalContext } from "../context/ModalContext";
import { useSession } from "next-auth/react";
import { CgClose } from "react-icons/cg";

export default function PostCreateModal() {
  const { data: session } = useSession();
  const { closeModal } = useContext(ModalContext);
  const { category }: any = useParams();
  const categoryPath = decodeURI(category.map((v: any) => `/${v}`).join(""));
  const [pending, setPending] = useState(false);

  return (
    <Paper
      component="form"
      className="post-create-modal"
      elevation={5}
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const response = await fetch(`${process.env.ROOT_URL}/api/posts`, {
          method: "POST",
          body: formData,
        });
        const data = await response.json();
        console.log("생성된 포스트글", { data });

        setPending(false);
        closeModal();
        mutate("categorized-posts");
      }}
      sx={{
        width: { xs: "90vw", sm: "70vw", md: "60vw", lg: "50vw" },
        maxWidth: "800px",
        maxHeight: "90vh",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        overflowY: "scroll",
        scrollbarWidth: "none",
        borderRadius: "10px",
        "& input#image": { display: "none" },
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h5" sx={{ display: "flex", gap: "0.5rem" }}>
          <MdCreate />
          포스트글 만들기
        </Typography>

        <Button onClick={() => closeModal()}>
          <CgClose />
        </Button>
      </div>

      <FormControl>
        <Select value={categoryPath} name="category" id="category">
          <MenuItem value={categoryPath}>{categoryPath.replaceAll("/", " > ")}</MenuItem>
        </Select>
      </FormControl>

      <TextField
        type="text"
        name="userId"
        value={session?.user.id}
        required
        style={{ display: "none" }}
      />
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

      <Button type="submit" disabled={pending} variant="contained">
        {pending ? "게시중..." : "게시하기"}
      </Button>
    </Paper>
  );
}
