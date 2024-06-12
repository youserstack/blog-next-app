"use server";

import { updatePost } from "@/lib/utils/fetcher";

export async function updatePostAction(formData: FormData, postId: string, accessToken: string) {
  console.log("\n\x1b[35m<updatePost>\x1b[0m");

  // extract
  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");
  const tags = formData.get("tags");
  const image = formData.get("image");
  const payload = { category, title, content, tags, image };

  // console.log({ payload });

  // request
  const result = await updatePost(postId, payload, accessToken);
  return result;
}

export async function createComment(formData: FormData, postId: string, accessToken: string) {
  console.log("\n\x1b[35m<createComment>\x1b[0m");

  // extract
  // console.log({ accessToken, postId, content });
  const content = formData.get("content");

  // request
  const response = await fetch(`${process.env.ROOT_URL}/api/comments/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, postId }),
  });
  const result = await response.json();
  return result;
}
