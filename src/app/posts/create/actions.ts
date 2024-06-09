"use server";

export async function createPost(formData: FormData, accessToken: string) {
  console.log("\x1b[35m<createPost>\x1b[0m");

  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");
  const author = formData.get("author");
  const tags = formData.get("tags");

  const response = await fetch(`${process.env.ROOT_URL}/api/posts/create`, {
    method: "post",
    headers: {
      authorization: `bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, title, content, author, tags }),
  });
  const result = await response.json();
  console.log({ result });

  if (response.ok) return { newPost: result.newPost };
  else {
    if (result.error) {
    }
  }

  if (!response.ok && result.error.code === "ERR_JWT_EXPIRED") {
    return { errorCode: result.error.code };
  } else if (result.newPost) {
    return { newPost: result.newPost };
  } else {
    return { error: result.error };
  }
}
