"use client";

import { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { Context } from "@/components/context/Provider";
import { deleteCategory } from "@/lib/utils/category";
import "../../styles/CategoryDeleteModal.scss";

export default function CategoryDeleteModal() {
  const router = useRouter();
  const params = useParams();
  const categories = params.category as string[];
  const categoryPath = categories.map((v: string) => `/${v}`).join("");
  const parentCategories = categories.slice(0, -1);
  // const childCategory = categories[categories.length - 1] as string;
  const { setCurrentModal, categoryPaths }: any = useContext(Context);

  const handleClickDeleteButton = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken") as string;
      const result = await deleteCategory(categoryPath, accessToken);
      // if (result.error.code === "") {
      // } else if (result.error) {
      // }

      console.log({ result });

      // const { deletedCategory } = result;
      // console.log({ deletedCategory });
    } catch (error) {
      console.log({ error });
    }

    // 현재 모달창을 닫는다.
    setCurrentModal("");
    // 최상위 카테고리인 경우는 카테고리 홈경로(categoryPaths[0])로 이동한다.
    if (!parentCategories.length) router.push("/categories" + categoryPaths[0]);
    // 이외는 부모 카테고리로 이동한다.
    else router.push(`/categories/${parentCategories.join("/")}`);
    // 데이터 캐시를 리프레시한다.
    router.refresh();
  };

  const handleClickCancelButton = () => setCurrentModal("");

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
