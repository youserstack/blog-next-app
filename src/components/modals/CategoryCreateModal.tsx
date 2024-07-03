"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Context } from "@/components/context/Provider";
import { useFormState } from "react-dom";
import { refreshAccessToken } from "@/lib/utils/auth";
import { createCategoryAction } from "@/app/actions";
import "./CategoryCreateModal.scss";

export default function CategoryCreateModal() {
  const router = useRouter();
  const { parentCategories, closeModal }: any = useContext(Context);

  const [state, formAction] = useFormState(async (currentState: any, formData: FormData) => {
    formData.set("parentCategories", JSON.stringify(parentCategories));
    const accessToken = localStorage.getItem("accessToken") as string;
    const { error, newCategoryPath } = await createCategoryAction(formData, accessToken);

    if (error?.code === "ERR_JWT_EXPIRED") {
      console.log("재요청");
      const newAccessToken = await refreshAccessToken();
      const { error, newCategoryPath } = await createCategoryAction(formData, newAccessToken);

      if (error) return { error };
      return { newCategoryPath };
    } else if (error) return { error };

    return { newCategoryPath };
  }, null);

  useEffect(() => {
    if (state?.newCategoryPath) {
      console.log({ newCategoryPath: state.newCategoryPath });
      closeModal();
      router.refresh();
    }
    if (state?.error) {
      console.error({ error: state.error });
      closeModal();
    }
  }, [state, closeModal, router]);

  return (
    <div className="category-create-modal">
      <h3>새 카테고리 생성</h3>
      <small>생성할 새 카테고리 이름을 작성하세요.</small>
      <form action={formAction}>
        <input type="text" name="childCategory" />
        <button type="submit">add</button>
      </form>
    </div>
  );
}
