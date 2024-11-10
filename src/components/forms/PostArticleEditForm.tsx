"use client";

import { Button, Paper, TextField } from "@mui/material";
import { useState } from "react";
import { MdCloudUpload } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import PostDeleteButton from "./PostDeleteButton";
import Loading from "../ui/Loading";

function EditImage({ imageUrl }: { imageUrl: string }) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      // URL 객체를 이용한 blob object의 url 생성
      const objectUrl = URL.createObjectURL(file);
      console.log({ objectUrl });
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  };

  return (
    <div
      style={{
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
        src={previewUrl || imageUrl}
        alt=""
        width={1000}
        height={1000}
        style={{ height: "300px" }}
      />

      <input
        type="file"
        id="image"
        name="image"
        onChange={handleChange}
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
    </div>
  );
}

const fetcher = (url: string) =>
  fetch(url)
    .then((res) => res.json())
    .then((data) => data.post);

export default function PostArticleEditForm({ postId }: { postId: string }) {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const { isLoading, data: post } = useSWR("post", () => fetcher(`/api/posts/${postId}`));

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`, {
      method: "PATCH",
      body: formData,
    });

    if (response.ok) {
      router.push(`/posts/${postId}`);
    } else {
      console.error("게시글 수정 요청 실패");
    }

    router.refresh();
    setPending(false);
  };

  if (isLoading) return <Loading />;

  return (
    <Paper
      className="post-article-edit-form"
      component="form"
      onSubmit={handleSubmit}
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <div className="상단" style={{ display: "flex", gap: "1rem" }}>
        <p>작성자 : {post.author?.name}</p>
        <p>{post.createdAt?.slice(0, 10)}</p>
      </div>

      <EditImage imageUrl={post.image} />

      <div style={{ display: "flex", gap: "1rem" }}>
        <TextField
          name="category"
          defaultValue={post.category}
          label="카테고리"
          disabled
          fullWidth
        />
        <TextField name="title" defaultValue={post.title} label="제목" required fullWidth />
      </div>

      <TextField name="content" defaultValue={post.content} label="본문내용" multiline />

      <div style={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
        <Button type="submit" disabled={pending} variant="contained">
          {pending ? "수정중..." : "수정"}
        </Button>

        <Button className="cancel-button" variant="contained" onClick={() => router.back()}>
          취소
        </Button>

        <PostDeleteButton post={post} />
      </div>
    </Paper>
  );
}
