"use client";

import { FormEvent, useContext } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Context } from "@/components/context/Provider";
import "../../styles/CategoryCreateModal.scss";

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
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${process.env.ROOT_URL}/api/categories/create`, {
        method: "post",
        headers: {
          authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ parentCategories, childCategory }),
      });
      if (!response.ok) return;
      const { newCategory } = await response.json();

      if (parentCategories.length === 0) {
        // 네비게이션 메뉴에서 + 버튼으로 실행한 경우
        router.refresh();
      } else {
        // 다이나믹 라우트 페이지 > breadcrumb > + 버튼으로 실행한 경우
        router.push(`${pathname}/${newCategory}`);
        router.refresh();
      }
    } catch (error) {
      console.log({ error });
    }

    // Set display none
    setCurrentModal("");
  };

  return (
    <div className="category-create-modal" onClick={(e) => e.stopPropagation()}>
      <h3>새 카테고리 생성</h3>
      <small>생성할 새 카테고리 이름을 작성하세요.</small>
      <form onSubmit={handleSubmit}>
        <input type="text" name="category" />
        <button type="submit">add</button>
      </form>
    </div>
  );
}
