"use client";

import { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { Context } from "@/components/context/Provider";
import { deleteCategory } from "@/lib/utils/fetchers/deleters";
import { refreshAccessToken } from "@/lib/utils/auth";
import { Button, Paper, Typography } from "@mui/material";
import { RiErrorWarningFill } from "react-icons/ri";

export default function CategoryDeleteModal() {
  const router = useRouter();
  const params = useParams();
  const categories = (params.category as string[]).map((v: string) => decodeURI(v));
  const parentCategories = categories.slice(0, -1);
  const { closeModal, categoryPaths }: any = useContext(Context);
  // console.log({ categories, categoryPaths });

  const handleClickDeleteButton = async () => {
    const accessToken = localStorage.getItem("accessToken") as string;
    const { deletedCategory, error } = await deleteCategory(categories, accessToken);

    if (error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken();
      const { deletedCategory, error } = await deleteCategory(categories, newAccessToken);

      if (error) {
        console.error("재요청에 대한 에러가 발생했습니다.", error);
        return { error: error };
      }

      console.log("재요청", { deletedCategory });
      closeModal();
      !parentCategories.length
        ? router.push("/categories" + categoryPaths[0])
        : router.push(`/categories/${parentCategories.join("/")}`);
      router.refresh();
    } else if (error) {
      console.error("에러가 발생했습니다.", error);
    } else {
      console.error("exception");
    }

    console.log({ deletedCategory });
    closeModal();
    !parentCategories.length
      ? router.push("/categories" + categoryPaths[0]) // 최상위 카테고리인 경우는 카테고리 홈경로(categoryPaths[0])로 이동한다.
      : router.push(`/categories/${parentCategories.join("/")}`); // 이외는 부모 카테고리로 이동한다.
    router.refresh();
  };

  const handleClickCancelButton = () => closeModal();

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
          onClick={handleClickDeleteButton}
          disabled={categories.some((category: string) => protectedCategories.includes(category))}
          variant="contained"
          sx={{ backgroundColor: "#d73a49" }}
        >
          삭제
        </Button>
        <Button onClick={handleClickCancelButton} variant="contained">
          취소
        </Button>
      </div>
    </Paper>
  );
}

const protectedCategories = ["development"];
