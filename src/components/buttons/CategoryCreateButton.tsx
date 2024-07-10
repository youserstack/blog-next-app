"use client";

import { Context } from "@/components/context/Provider";
import { useContext } from "react";
import { Button } from "@mui/material";

export default function CategoryCreateButton({
  parentCategories,
  label,
}: {
  parentCategories: string[] | null;
  label: string;
}) {
  const { setParentCategories, openModal }: any = useContext(Context);

  return (
    <Button
      onClick={() => {
        setParentCategories(parentCategories);
        openModal("category-create-modal");
      }}
    >
      {label}
    </Button>
  );
}
