"use client";

import { useContext } from "react";
import { Context } from "@/components/context/Provider";
import { useParams } from "next/navigation";
import "./CategoryDeleteButton.scss";

export default function CategoryDeleteButton() {
  const { user, setCurrentModal }: any = useContext(Context);
  const params = useParams();
  const categories = (params.category as string[]).map((v: string) => decodeURI(v));

  const handleClickDeleteButton = () => setCurrentModal("category-delete-modal");

  if (!user) return null;

  return (
    <button
      className="category-delete-button"
      onClick={handleClickDeleteButton}
      disabled={categories.some((category: string) => protectedCategories.includes(category))}
    >
      delete this category
    </button>
  );
}

const protectedCategories = ["Coding"];
