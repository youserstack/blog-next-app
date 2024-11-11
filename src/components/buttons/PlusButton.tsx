"use client";

import { useContext } from "react";
import { Button } from "@mui/material";
import { MdAdd } from "react-icons/md";
import { CategoryContext } from "../context/CategoryContext";
import { ModalContext } from "../context/ModalContext";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

interface Props {
  hasParentCategories?: boolean;
}

export default function PlusButton({ hasParentCategories = true }: Props) {
  const { data: session } = useSession();
  const { openModal } = useContext(ModalContext);
  const { setParentCategories } = useContext(CategoryContext);
  const params = useParams();
  // "categories/${param}/..." 경로의 이외의 경로는 params가 없으므로 빈배열로 보완할 필요가 있다.
  const segments = (params.category as string[]) || [];

  const handleClick = () => {
    if (!hasParentCategories) {
      setParentCategories([]);
      openModal("category-create-modal");
      return;
    }

    setParentCategories(segments);
    openModal("category-create-modal");
  };

  // if (!segments) return null;

  return (
    <Button
      className="카테고리_생성_버튼"
      color="inherit"
      disabled={!session || segments.length >= 3}
      onClick={handleClick}
      sx={{ display: "flex", gap: "0.5rem" }}
    >
      <MdAdd />
      {hasParentCategories && "하위 카테고리 생성"}
    </Button>
  );
}
