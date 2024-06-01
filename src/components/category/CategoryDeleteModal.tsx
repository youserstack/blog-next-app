"use client";

import { MouseEvent, useContext } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Context } from "@/components/context/Provider";
import "../../styles/CategoryDeleteModal.scss";

export default function CategoryDeleteModal() {
  const router = useRouter();
  const params = useParams();
  const categories = params.category as string[];
  const parentCategories = categories.slice(0, -1);
  const childCategory = categories[categories.length - 1] as string;
  const { setCurrentModal }: any = useContext(Context);

  const handleClickDeleteButton = async (e: MouseEvent) => {
    // console.log({ parentCategories, childCategory });
    try {
      const accessToken = localStorage.getItem("accessToken");
      const response = await fetch(`${process.env.ROOT_URL}/api/categories`, {
        method: "delete",
        headers: {
          authorization: `bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ categories, parentCategories, childCategory }),
      });
      if (!response.ok) return;
      const { message } = await response.json();
      console.log({ message });
      // const { deletedCategories } = await response.json();

      // 다이나믹 라우트 페이지 > breadcrumb > + 버튼으로 실행한 경우
      // router.push(`${pathname}/${newCategory}`);
      // router.refresh();
    } catch (error) {
      console.log({ error });
    }

    // 현재 모달창을 닫는다.
    // setCurrentModal("");
    // router.push(`/categories/${parentCategories.join("/")}`);
    // router.refresh();
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
