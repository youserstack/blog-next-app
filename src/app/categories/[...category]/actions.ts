"use client";

import { createCategory } from "@/lib/utils/category";

export async function createCategoryAction(formData: FormData, accessToken: string) {
  console.log("\x1b[35m\n<createCategoryAction>\x1b[0m");
  const result = await createCategory(formData, accessToken);
  return result;
}
