"use client";

import { FormEvent, useContext, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Context } from "@/components/context/Provider";
import { useFormState } from "react-dom";
import { createCategoryAction } from "@/app/categories/[...category]/actions";
import { refreshAccessToken } from "@/lib/utils/auth";
import "../../styles/CategoryCreateModal.scss";

export default function CategoryCreateModal() {
  const pathname = usePathname();
  const params = useParams();
  // const parentCategories =
  //   params.category instanceof Array
  //     ? params.category.map((v: string) => `/${v}`).join("")
  //     : `/${params.category}`;
  const router = useRouter();
  const { setCurrentModal }: any = useContext(Context);
  const [state, formAction] = useFormState(async (currentState: any, formData: FormData) => {
    const parentCategories = params.category as string[];
    const childCategory = formData.get("childCategory");
    const payload = { parentCategories, childCategory };
    const accessToken = localStorage.getItem("accessToken") as string;
    const result = await createCategoryAction(payload, accessToken);

    // 토큰만료시 > 토큰갱신 > 재요청
    if (result.error?.code === "ERR_JWT_EXPIRED") {
      const newAccessToken = await refreshAccessToken(); // 재발급
      const result = await createCategoryAction(payload, newAccessToken); // 재요청

      if (result.error) {
        console.error("재요청에 대한 에러가 발생했습니다.", result.error);
        return { error: result.error };
      }

      console.log("토큰갱신 > 재요청 > 카테고리 생성", { newCategory: result.newCategory });
      router.push(`${pathname}/${result.newCategory}`);
      router.refresh();
      setCurrentModal("");
      return { newCategory: result.newCategory };
    } else if (result.error) {
      console.error("에러가 발생했습니다.", result.error);
      return { error: result.error };
    }

    console.log("카테고리 생성", { newCategory: result.newCategory });
    setCurrentModal("");
    router.push(`${pathname}/${result.newCategory}`);
    router.refresh();
    return { newCategory: result.newCategory };
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
