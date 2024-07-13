"use client";

import { Context } from "@/components/context/Provider";
import { useContext } from "react";
import { Button } from "@mui/material";

export default function CategoryCreateButton({
  parentCategories,
}: {
  parentCategories: string[] | null;
}) {
  const { setParentCategories, openModal, user }: any = useContext(Context);

  const handleOpenCategoryCreateModal = () => {
    setParentCategories(parentCategories);
    openModal("category-create-modal");
  };

  if (!user) return null;

  return (
    <Button className="category-create-button" onClick={handleOpenCategoryCreateModal}>
      +
    </Button>
  );
}
