"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState } from "react-dom";
import { refreshAccessToken } from "@/lib/utils/auth";
import { createCategoryAction } from "@/app/actions";
import { Button, Paper, TextField, Typography } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { CategoryContext } from "../context/CategoryContext";
import { ModalContext } from "../context/ModalContext";

export default function CategoryCreateModal() {
  const router = useRouter();
  const { parentCategories } = useContext(CategoryContext);
  const { closeModal } = useContext(ModalContext);

  const [state, formAction] = useFormState(async (currentState: any, formData: FormData) => {
    formData.set("parentCategories", JSON.stringify(parentCategories));
    const accessToken = localStorage.getItem("accessToken") as string;
    const { error, newCategoryPath } = await createCategoryAction(formData, accessToken);

    if (error?.code === "ERR_JWT_EXPIRED") {
      console.log("재요청");
      const newAccessToken = await refreshAccessToken();
      const { error, newCategoryPath } = await createCategoryAction(formData, newAccessToken);

      if (error) return { error };
      return { newCategoryPath };
    } else if (error) return { error };

    return { newCategoryPath };
  }, null);

  useEffect(() => {
    if (state?.newCategoryPath) {
      // console.log({ newCategoryPath: state.newCategoryPath });
      closeModal();
      router.refresh();
    }
    if (state?.error) {
      console.error({ error: state.error });
      // closeModal();
    }
  }, [state, closeModal, router]);

  return (
    <Paper
      component={"form"}
      className="category-create-modal"
      elevation={5}
      action={formAction}
      sx={{ display: "flex", flexDirection: "column", gap: "1rem", padding: "1rem" }}
    >
      <Typography variant="h5" sx={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <MdAdd />
        카테고리 생성
      </Typography>
      <TextField type="text" name="childCategory" label="카테고리" required />
      <Button type="submit">확인</Button>
    </Paper>
  );
}
