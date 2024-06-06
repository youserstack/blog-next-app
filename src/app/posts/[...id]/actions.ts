"use server";

export async function updatePost(formData: FormData, postId: string, accessToken: string) {
  console.log("\n\x1b[35m<updatePost>\x1b[0m");

  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");
  const tags = formData.get("tags");

  try {
    const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`, {
      method: "patch",
      headers: {
        authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ category, title, content, tags }),
    });
    if (response.ok) {
      const { updatedPost } = await response.json();
      console.log({ updatePost });
      return { updatedPost };
    }
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}

export async function createComment(formData: FormData, postId: string, accessToken: string) {
  console.log("\n\x1b[35m<createComment>\x1b[0m");

  // extraction
  const content = formData.get("content");
  console.log({ content, postId });

  const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}/comments`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, postId }),
  });
  const data = await response.json();

  if (response.ok) {
    const { newComment } = await response.json();
    return { newComment };
  } else {
    return { error: data.error };
  }
}
