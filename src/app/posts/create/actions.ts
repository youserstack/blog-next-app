"use server";

export async function createPost(formData: FormData, accessToken: string) {
  console.log("\x1b[35m\n<createPost>\x1b[0m");

  // extraction
  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");
  const author = formData.get("author");
  const tags = formData.get("tags");

  // request
  const response = await fetch(`${process.env.ROOT_URL}/api/posts/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, title, content, author, tags }),
  });

  return response.json();
}
