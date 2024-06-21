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
    // 현재 상위 카테고리를 글로벌 변수에 저장한다.
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
