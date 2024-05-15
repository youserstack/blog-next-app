"use client";

import { Context } from "@/components/Provider";
import Link from "next/link";
import { useContext } from "react";

export default function CategoryCreateButton({
  parentCategories,
}: {
  parentCategories: string[] | null;
}) {
  const { setParentCategories }: any = useContext(Context);

  const handleClick = (e: any) => {
    e.preventDefault();

    // 현재 상위 카테고리를 글로벌 변수에 저장한다.
    setParentCategories(parentCategories);

    // 팝업창을 활성화한다.
    const popupElement = document.querySelector("html body .popup-layout") as HTMLElement;
    popupElement.style.display = "flex";
  };

  return (
    <li className="nav-item category-create">
      <Link href={""} onClick={handleClick}>
        +
      </Link>
    </li>
  );
}
