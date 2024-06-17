"use server";

export async function createPostAction(formData: FormData, accessToken: string) {
  console.log("\x1b[35m\n<createPostAction>\x1b[0m");

  const response = await fetch(`${process.env.ROOT_URL}/api/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  return response.json();
}
