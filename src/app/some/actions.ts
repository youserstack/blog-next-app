"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function handleSubmit(formData: FormData) {
  cookies().set("some", "someValue...");

  const title = formData.get("title");
  console.log({ title });
  // revalidateTag, revalidatePath : 서버 컴포넌트 새로고침
  // 서버컴포넌트의 캐시를 삭제하여 새로고침을 한다.
  revalidatePath("/some");
}
