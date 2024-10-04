"use client";

import { Box, Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";

export default function PostArticleEditForm({ postId }: { postId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);
  const { isLoading, data } = useSWR("post", () =>
    fetch(`/api/posts/${postId}`, { cache: "no-cache" }).then((res) => res.json())
  );
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  if (isLoading || !data) return null;
  const { post } = data;
  return (
    <Paper
      className="post-article-edit-form"
      component="form"
      onSubmit={async (e) => {
        e.preventDefault();
        setPending(true);

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`, {
          method: "PATCH",
          body: formData,
        });
        const data = await response.json();

        console.log("수정된 포스트글", data);
        setTimeout(() => {
          router.refresh();
          setPending(false);
        }, 1);
        router.push(`/posts/${postId}`);
      }}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <Box sx={{ display: "flex", gap: "1rem" }}>
        <p>작성자 : {post.author?.name}</p>
        <p>{post.createdAt?.slice(0, 10)}</p>
      </Box>

      <Box
        sx={{
          minHeight: "300px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          position: "relative",
        }}
      >
        <Image
          src={previewUrl || post.image}
          alt=""
          width={1000}
          height={1000}
          style={{ height: "300px" }}
        />

        <input
          type="file"
          id="image"
          name="image"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              // URL 객체를 이용한 blob object의 url 생성
              const objectUrl = URL.createObjectURL(file);
              console.log({ objectUrl });
              setPreviewUrl(objectUrl);
              return () => URL.revokeObjectURL(objectUrl);
            }
          }}
          style={{ display: "none" }}
        />
        <Button
          component="label"
          htmlFor="image"
          variant="contained"
          startIcon={<MdCloudUpload />}
          sx={{ position: "absolute", bottom: "1rem", right: "1rem" }}
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
        <Button type="submit" disabled={pending} variant="contained">
          {pending ? "수정중..." : "수정"}
        </Button>

        <Button className="cancel-button" variant="contained" onClick={() => router.back()}>
          취소
        </Button>
        {/* <PostDeleteButton post={post} /> */}
      </Box>
    </Paper>
  );
}
