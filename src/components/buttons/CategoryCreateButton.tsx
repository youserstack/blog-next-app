"use client";

import { useContext } from "react";
import { Button } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { CategoryContext } from "../context/CategoryContext";
import { ModalContext } from "../context/ModalContext";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function CategoryCreateButton() {
  const { data: session } = useSession();
  const { openModal } = useContext(ModalContext);
  const { setParentCategories } = useContext(CategoryContext);
  const params = useParams();
  const segments = params.category as string[];

  const handleClick = () => {
    setParentCategories(segments);
    openModal("category-create-modal");
  };

  if (!session || segments.length >= 3) return null;

  return (
    <Button className="category-create-button" color="inherit" onClick={handleClick}>
      <MdAdd />
    </Button>
  );
}
