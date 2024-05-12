"use client";

import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import "../styles/Popup.scss";

export default function Popup() {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    // Get input data
    const form = e.target as HTMLFormElement;
    const categoryInput = form.elements.namedItem("category") as HTMLInputElement;
    const category = categoryInput.value;
    console.log({ category });

    try {
      const response = await fetch(`${process.env.ROOT_URL}/api/categories/create`, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category }),
      });
      if (!response.ok) return;
      router.refresh();

      const { newCategory } = await response.json();
      console.log({ newCategory });
    } catch (error) {
      console.log({ error });
    }

    // Set display none
    const popupLayout = document.querySelector(".popup-layout") as HTMLElement;
    popupLayout.style.display = "none";
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
