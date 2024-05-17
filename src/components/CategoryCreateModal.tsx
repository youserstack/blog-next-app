"use client";

import { FormEvent, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Context } from "@/components/Provider";
import "../styles/CategoryCreateModal.scss";

export default function CategoryCreateModal() {
  const pathname = usePathname();
  const router = useRouter();
  const { parentCategories, setCurrentModal }: any = useContext(Context);

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
      console.log("카테고리 생성 완료");
      // router.refresh();
      const { newCategory } = await response.json();
      router.push(`${pathname}/${newCategory}`);
      router.refresh();
    } catch (error) {
      console.log({ error });
    }

    // Set display none
    setCurrentModal("");
  };

  return (
    <div className="category-create-modal" onClick={(e) => e.stopPropagation()}>
      <h3>Category Create Form</h3>
      <form onSubmit={handleSubmit}>
        <input type="text" name="category" />
        <button type="submit">add</button>
      </form>
    </div>
  );
}
