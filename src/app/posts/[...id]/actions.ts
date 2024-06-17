"use server";

export async function updatePostAction(formData: FormData, postId: string, accessToken: string) {
  console.log("\n\x1b[35m\n<updatePostAction>\x1b[0m");

  const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  return response.json();
}

export async function createCommentAction(formData: FormData, postId: string, accessToken: string) {
  console.log("\n\x1b[35m<createCommentAction>\x1b[0m");

  const response = await fetch(`${process.env.ROOT_URL}/api/comments?postId=${postId}`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  return response.json();
}
