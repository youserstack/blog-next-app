"use client";

import { useContext } from "react";
import { Context } from "@/components/context/Provider";
import "./CategoryDeleteButton.scss";

export default function CategoryDeleteButton() {
  const { user, setCurrentModal }: any = useContext(Context);

  const handleClickDeleteButton = () => setCurrentModal("category-delete-modal");

  if (!user) return null;

  return (
    <button className="category-delete-button" onClick={handleClickDeleteButton}>
      delete this category
    </button>
  );
}
