"use client";

import { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { Context } from "@/components/context/Provider";
import "../../styles/CategoryDeleteModal.scss";

export default function CategoryDeleteModal() {
  const router = useRouter();
  const params = useParams();
  const categories = params.category as string[];
  const parentCategories = categories.slice(0, -1);
  // const childCategory = categories[categories.length - 1] as string;
  const { setCurrentModal }: any = useContext(Context);

  const handleClickDeleteButton = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${process.env.ROOT_URL}/api/categories`, {
        method: "delete",
        headers: {
          authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categories }),
      });
      if (!response.ok) return;
      const { deletedCategory } = await response.json();
      console.log({ deletedCategory });
    } catch (error) {
      console.log({ error });
    }

    // 현재 모달창을 닫는다.
    setCurrentModal("");
    router.push(`/categories/${parentCategories.join("/")}`);
    router.refresh();
  };

  const handleClickCancelButton = () => {
    setCurrentModal("");
  };

  return (
    <div className="category-delete-modal" onClick={(e) => e.stopPropagation()}>
      <h3>현재 카테고리를 삭제하시겠습니까?</h3>
      <div className="buttons">
        <button onClick={handleClickDeleteButton}>delete</button>
        <button onClick={handleClickCancelButton}>cancel</button>
      </div>
    </div>
  );
}
