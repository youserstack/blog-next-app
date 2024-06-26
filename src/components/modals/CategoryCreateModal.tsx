"use client";

import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/components/context/Provider";
import { useFormState } from "react-dom";
import { refreshAccessToken } from "@/lib/utils/auth";
import { createCategoryAction } from "@/app/actions";
import "./CategoryCreateModal.scss";

export default function CategoryCreateModal() {
  const router = useRouter();
  const { parentCategories, setCurrentModal }: any = useContext(Context);

  const [state, formAction] = useFormState(async (currentState: any, formData: FormData) => {
    formData.set("parentCategories", JSON.stringify(parentCategories));
    const accessToken = localStorage.getItem("accessToken") as string;
    const { error, newCategoryPath } = await createCategoryAction(formData, accessToken);

    if (error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken();
      const { error, newCategoryPath } = await createCategoryAction(formData, newAccessToken);

      if (error) {
        console.error("재요청에 대한 에러가 발생했습니다.", error);
        setCurrentModal("");
        return { error };
      }

      console.log("토큰갱신 > 재요청 > 카테고리 생성", { newCategoryPath });
      setCurrentModal("");
      router.refresh();
      return { newCategoryPath };
    } else if (error) {
      console.error("에러가 발생했습니다.", error);
      setCurrentModal("");
      return { error };
    }

    console.log("카테고리 생성", { newCategoryPath });
    setCurrentModal("");
    router.refresh();
    return { newCategoryPath };
  }, null);

  return (
    <div className="category-create-modal" onClick={(e) => e.stopPropagation()}>
      <h3>새 카테고리 생성</h3>
      <small>생성할 새 카테고리 이름을 작성하세요.</small>
      <form action={formAction}>
        <input type="text" name="childCategory" />
        <button type="submit">add</button>
      </form>
    </div>
  );
}
