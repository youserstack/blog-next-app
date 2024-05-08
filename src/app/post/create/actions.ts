"use server";

export async function createPost(formData: FormData, accessToken: string) {
  // console.log("\n<createPost>");
  // console.log(
  //   "클라이언트로부터 전달된 액세스토큰과 폼데이터를 받아서, 백단에 포스트 생성을 요청한다."
  // );

  const category = formData.get("category");
  const title = formData.get("title");
  const content = formData.get("content");
  const author = formData.get("author");
  const tags = formData.get("tags");
  // const test = formData.getAll();

  const response = await fetch(`${process.env.ROOT_URL}/api/post/create`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      authorization: `bearer ${accessToken}`,
    },
    body: JSON.stringify({ category, title, content, author, tags }),
  });
  const result = await response.json();
  // console.log({ result });

  if (response.ok) {
    // console.log("\n</createPost>");
    // console.log("response ok\n");
    return { status: "ok" };
  } else {
    console.log("\n<createPost>");
    // console.log("\n</createPost>");
    console.log("response error\n");
    return { status: "error", error: result.error };
  }
}
