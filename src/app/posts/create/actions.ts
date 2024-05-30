"use server";

export async function createPost(formData: FormData, accessToken: string) {
  console.log("\x1b[35m<createPost>\x1b[0m");

  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");
  const author = formData.get("author");
  const tags = formData.get("tags");

  try {
    const response = await fetch(`${process.env.ROOT_URL}/api/posts/create`, {
      method: "post",
      headers: {
        authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, title, content, author, tags }),
    });
    if (response.ok) {
      const { newPost } = await response.json();
      return { newPost };
    }
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}
