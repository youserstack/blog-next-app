"use server";

import { createPost } from "@/lib/utils/fetcher";

export async function createPostAction(formData: FormData, accessToken: string) {
  console.log("\x1b[35m\n<createPostAction>\x1b[0m");
  const result = await createPost(formData, accessToken);
  return result;
}
