"use client";

import { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button, Paper, Typography } from "@mui/material";
import { RiErrorWarningFill } from "react-icons/ri";
import { ModalContext } from "../context/ModalContext";

export default function CategoryDeleteModal() {
  const router = useRouter();
  const params = useParams();
  const categories = (params.category as string[]).map((v: string) => decodeURI(v));
  const parentCategories = categories.slice(0, -1);
  const { closeModal } = useContext(ModalContext);

  return (
    <Paper
      className="category-delete-modal"
      onClick={(e) => e.stopPropagation()}
      sx={{
        padding: "1rem",
        color: "#d73a49",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <div>
        <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <RiErrorWarningFill />
          현재 카테고리를 삭제하시겠습니까?
        </Typography>

        <Typography variant="subtitle2">
          카테고리를 삭제하면 해당된 포스트 게시글도 함께 삭제됩니다.
        </Typography>
      </div>

      <div style={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
        <Button
          onClick={async (e) => {
            e.preventDefault();
            const response = await fetch(`${process.env.ROOT_URL}/api/categories`, {
              method: "delete",
              body: JSON.stringify({ categories }),
            });
            const data = await response.json();
            console.log("삭제된 카테고리", data);

            closeModal();
            !parentCategories.length
              ? router.push("/categories/development")
              : router.push(`/categories/${parentCategories.join("/")}`); // 이외는 부모 카테고리로 이동한다.
            router.refresh();
          }}
          disabled={categories.some((category: string) => protectedCategories.includes(category))}
          variant="contained"
          sx={{ backgroundColor: "#d73a49" }}
        >
          삭제
        </Button>

        <Button onClick={() => closeModal()} variant="contained">
          취소
        </Button>
      </div>
    </Paper>
  );
}

const protectedCategories = ["development"];
