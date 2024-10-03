"use client";

import { useContext } from "react";
import { Button } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { CategoryContext } from "../context/CategoryContext";
import { ModalContext } from "../context/ModalContext";
import { useSession } from "next-auth/react";

export default function CategoryCreateButton({ parentCategories }: { parentCategories: string[] }) {
  const { data: session } = useSession();
  const { openModal } = useContext(ModalContext);
  const { setParentCategories } = useContext(CategoryContext);

  if (!session || parentCategories.length >= 3) return null;

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
