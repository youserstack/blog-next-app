"use client";

import { Context } from "@/components/Provider";
import Link from "next/link";
import { useContext } from "react";

export default function CategoryCreateButton({ category }: { category: string }) {
  const { setCategory }: any = useContext(Context);

  const handleClick = (e: any) => {
    // Prevent default action of anker tag
    e.preventDefault();

    // 팝업창에서 카테고리를 저장한 글로벌 상태를 사용하기 위해서 상태변경을 한다.
    setCategory(category);

    // 팝업창을 활성화한다.
    (document.querySelector("html body .popup-layout") as HTMLElement).style.display = "flex";
  };

  return (
    <li className="nav-item category-create">
      <Link href={""} onClick={handleClick}>
        +
      </Link>
      {/* {children} */}
    </li>
  );
}
