"use client";

import { FormEvent, useContext } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/components/Provider";
import "../styles/Popup.scss";

export default function Popup() {
  const router = useRouter();
  const { parentCategories }: any = useContext(Context);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Get input data
    const form = e.target as HTMLFormElement;
    const categoryInput = form.elements.namedItem("category") as HTMLInputElement;
    const childCategory = categoryInput.value;

    try {
      const response = await fetch(`${process.env.ROOT_URL}/api/categories/create`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ parentCategories, childCategory }),
      });
      if (!response.ok) return;
      const { newCategory } = await response.json();
      console.log({ newCategory });
      router.refresh();
    } catch (error) {
      console.log({ error });
    }

    // Set display none
    // const popupLayout = document.querySelector(".popup-layout") as HTMLElement;
    // popupLayout.style.display = "none";
  };

  return (
    <div
      className="popup-layout"
      onClick={(e) => ((e.target as HTMLElement).style.display = "none")}
    >
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <h3>Category Create Form</h3>
        <form onSubmit={handleSubmit}>
          <input type="text" name="category" />
          <button type="submit">add</button>
        </form>
      </div>
    </div>
  );
}
