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
  // console.log({ accessToken, postId, content });
  const content = formData.get("content");

  // fetch
  const response = await fetch(`${process.env.ROOT_URL}/api/comments/create`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content, postId }),
  });

  // branch
  const data = await response.json();
  console.log({ data });
  if (!response.ok) return { error: data.error };
  return { newComment: data.newComment };
}
