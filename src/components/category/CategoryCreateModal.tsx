"use client";

import { useContext } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Context } from "@/components/context/Provider";
import { useFormState } from "react-dom";
import { refreshAccessToken } from "@/lib/utils/auth";
import { createCategoryAction } from "@/app/actions";
import "../../styles/CategoryCreateModal.scss";

export default function CategoryCreateModal() {
  const router = useRouter();
  const { parentCategories, setCurrentModal }: any = useContext(Context);

  const [state, formAction] = useFormState(async (currentState: any, formData: FormData) => {
    formData.set("parentCategories", JSON.stringify(parentCategories));
    const accessToken = localStorage.getItem("accessToken") as string;
    const data = await createCategoryAction(formData, accessToken);

    // 토큰만료시 > 토큰갱신 > 재요청
    if (data.error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken(); // 재발급
      const data = await createCategoryAction(formData, newAccessToken); // 재요청

      if (data.error) {
        console.error("재요청에 대한 에러가 발생했습니다.", data.error);
        return { error: data.error };
      }

      console.log("토큰갱신 > 재요청 > 카테고리 생성", { newCategoryPath: data.newCategoryPath });
      setCurrentModal("");
      router.push(`/categories${data.newCategoryPath}`);
      router.refresh();
      return { newCategoryPath: data.newCategoryPath };
    } else if (data.error) {
      console.error("에러가 발생했습니다.", data.error);
      console.log({ data });
      return { error: data.error };
    }

    console.log("카테고리 생성", { newCategoryPath: data.newCategoryPath });
    setCurrentModal("");
    router.push(`/categories${data.newCategoryPath}`);
    router.refresh();
    return { newCategoryPath: data.newCategoryPath };
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
