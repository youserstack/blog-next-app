"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { CategoryContext } from "../context/CategoryContext";
import { ModalContext } from "../context/ModalContext";

export default function CategoryCreateModal() {
  const router = useRouter();
  const { parentCategories } = useContext(CategoryContext);
  const { closeModal } = useContext(ModalContext);

  return (
    <Paper
      component="form"
      className="category-create-modal"
      elevation={5}
      onSubmit={async (e) => {
        e.preventDefault();

        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const parentCategories = formData.get("parentCategories");
        const childCategory = formData.get("childCategory");
        const response = await fetch(`${process.env.ROOT_URL}/api/categories`, {
          method: "POST",
          body: JSON.stringify({ parentCategories, childCategory }),
        });
        const data = await response.json();
        console.log("생성된 카테고리", data);

        closeModal();
        router.refresh();
      }}
      sx={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}
    >
      <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <MdAdd />
        카테고리 생성
      </Typography>
      <TextField
        type="text"
        name="parentCategories"
        value={JSON.stringify(parentCategories)}
        style={{ display: "none" }}
      />
      <TextField type="text" name="childCategory" label="카테고리" required />
      <Button type="submit">확인</Button>
    </Paper>
  );
}
