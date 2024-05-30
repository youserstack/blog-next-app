"use server";

export async function createPost(formData: FormData, accessToken: string) {
  // console.log("\n<createPost>");

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

  if (response.ok) {
    console.log({ result });
    return { status: "ok", message: "포스트 등록 완료" };
  } else {
    console.log({ result });
    return { status: "error", message: "포스트 등록 실패", error: result.error };
  }
}
