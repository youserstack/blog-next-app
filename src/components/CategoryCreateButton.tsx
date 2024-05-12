"use client";

import { Context } from "@/components/Provider";
import Link from "next/link";
import { useContext } from "react";

export default function CategoryCreateButton() {
  const { handleSomething }: any = useContext(Context);

  const handleClick = (e: any) => {
    // Prevent default action of anker tag
    e.preventDefault();
    // Set the dom element
    (document.querySelector("html body .popup-layout") as HTMLElement).style.display = "flex";

    // Call the global context handler
    // handleSomething();
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
