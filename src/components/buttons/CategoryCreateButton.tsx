"use client";

import { useContext } from "react";
import { Button } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { CategoryContext } from "../context/CategoryContext";
import { ModalContext } from "../context/ModalContext";
import { AuthContext } from "../context/AuthContext";

export default function CategoryCreateButton({ parentCategories }: { parentCategories: string[] }) {
  const { user } = useContext(AuthContext);
  const { openModal } = useContext(ModalContext);
  const { setParentCategories } = useContext(CategoryContext);

  const handleOpenCategoryCreateModal = () => {
    setParentCategories(parentCategories);
    openModal("category-create-modal");
  };

  if (!user) return null;

  return (
    <Button
      className="category-create-button"
      onClick={handleOpenCategoryCreateModal}
      color="inherit"
    >
      <MdAdd />
    </Button>
  );
}
