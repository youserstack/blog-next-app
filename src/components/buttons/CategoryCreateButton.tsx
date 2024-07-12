"use client";

import { Context } from "@/components/context/Provider";
import { useContext } from "react";
import { Button, useTheme } from "@mui/material";

export default function CategoryCreateButton({
  parentCategories,
  label,
}: {
  parentCategories: string[] | null;
  label: string;
}) {
  const { setParentCategories, openModal }: any = useContext(Context);
  const theme = useTheme();

  return (
    <Button
      onClick={() => {
        setParentCategories(parentCategories);
        openModal("category-create-modal");
      }}
      sx={{ color: theme.palette.primary.contrastText }}
    >
      {label}
    </Button>
  );
}
