"use client";

import { Context } from "@/components/context/Provider";
import { useContext } from "react";
import "./CategoryCreateButton.scss";

export default function CategoryCreateButton({
  parentCategories,
  label,
}: {
  parentCategories: string[] | null;
  label: string;
}) {
  const { user, setParentCategories, openModal }: any = useContext(Context);

  if (!user) return null;

  return (
    <button
      className="category-create-button"
      onClick={() => {
        setParentCategories(parentCategories);
        openModal("category-create-modal");
      }}
    >
      {label}
    </button>
  );
}
