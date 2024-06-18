"use client";

import { useContext } from "react";
import { useParams, useRouter } from "next/navigation";
import { Context } from "@/components/context/Provider";
import { deleteCategory } from "@/lib/utils/fetchers/deleters";
import { refreshAccessToken } from "@/lib/utils/auth";
import "../../styles/CategoryDeleteModal.scss";

export default function CategoryDeleteModal() {
  const router = useRouter();
  const params = useParams();
  const categories = params.category as string[];
  const parentCategories = categories.slice(0, -1);
  const { setCurrentModal, categoryPaths }: any = useContext(Context);

  const handleClickDeleteButton = async () => {
    const accessToken = localStorage.getItem("accessToken") as string;
    const data = await deleteCategory(categories, accessToken);

    // 토큰만료시 > 토큰갱신 > 재요청
    if (data.error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken(); // 재발급
      const data = await deleteCategory(categories, newAccessToken); // 재요청

      if (data.error) {
        console.error("재요청에 대한 에러가 발생했습니다.", data.error);
        return { error: data.error };
      }

      console.log("토큰갱신 > 재요청 > 카테고리 삭제", {
        deletedCategory: data.deletedCategory,
      });
      setCurrentModal("");
      // 최상위 카테고리인 경우는 카테고리 홈경로(categoryPaths[0])로 이동한다.
      // 이외는 부모 카테고리로 이동한다.
      !parentCategories.length
        ? router.push("/categories" + categoryPaths[0])
        : router.push(`/categories/${parentCategories.join("/")}`);
      router.refresh();
      return { deletedCategory: data.deletedCategory };
    } else if (data.error) {
      console.error("에러가 발생했습니다.", data.error);
      return { error: data.error };
    }

    console.log("카테고리 삭제 완료", { deletedCategory: data.deletedCategory });
    setCurrentModal("");
    // 최상위 카테고리인 경우는 카테고리 홈경로(categoryPaths[0])로 이동한다.
    // 이외는 부모 카테고리로 이동한다.
    !parentCategories.length
      ? router.push("/categories" + categoryPaths[0])
      : router.push(`/categories/${parentCategories.join("/")}`);
    router.refresh();
    return { deletedCategory: data.deletedCategory };
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
