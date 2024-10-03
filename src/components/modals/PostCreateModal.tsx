"use client";

import { Button, FormControl, MenuItem, Paper, Select, TextField, Typography } from "@mui/material";
import { MdCloudUpload, MdCreate } from "react-icons/md";
import { useContext, useState } from "react";
import { useParams } from "next/navigation";
import { mutate } from "swr";
import { ModalContext } from "../context/ModalContext";
import { useSession } from "next-auth/react";

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
        console.log("created post article", { data });

        setPending(false);
        closeModal();
        mutate("categorized-posts");
      }}
      sx={{
        minWidth: "500px",
        maxHeight: "calc(100% - 150px)",
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        overflowY: "scroll",
        scrollbarWidth: "thin",
        "& input#image": { display: "none" },
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
