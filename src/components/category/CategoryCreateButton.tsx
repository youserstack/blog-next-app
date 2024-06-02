"use client";

import { Context } from "@/components/context/Provider";
import { useContext } from "react";
import Link from "next/link";

export default function CategoryCreateButton({
  parentCategories,
}: {
  parentCategories: string[] | null;
}) {
  const { setParentCategories, setCurrentModal }: any = useContext(Context);

  const handleClick = (e: any) => {
    e.preventDefault();

    // 현재 상위 카테고리를 글로벌 변수에 저장한다.
    setParentCategories(parentCategories);
    setCurrentModal("category-create-modal");
  };

  return (
    <Link className="category-create-button" href={""} onClick={handleClick}>
      +
    </Link>
  );
}
