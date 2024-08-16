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

  if (!user || parentCategories.length >= 3) return null;

  return (
    <Button
      className="category-create-button"
      color="inherit"
      onClick={() => {
        setParentCategories(parentCategories);
        openModal("category-create-modal");
      }}
    >
      <MdAdd />
    </Button>
  );
}
