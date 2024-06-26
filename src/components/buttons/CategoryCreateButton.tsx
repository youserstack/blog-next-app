"use client";

import { Context } from "@/components/context/Provider";
import { useContext } from "react";

export default function CategoryCreateButton({
  parentCategories,
  label,
}: {
  parentCategories: string[] | null;
  label: string;
}) {
  const { user, setParentCategories, setCurrentModal }: any = useContext(Context);

  const handleClick = (e: any) => {
    setParentCategories(parentCategories);
    setCurrentModal("category-create-modal");
  };

  if (!user) return null;

  return (
    <button className="category-create-button" onClick={handleClick}>
      {label}
    </button>
  );
}
