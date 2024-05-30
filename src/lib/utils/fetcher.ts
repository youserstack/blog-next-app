export async function getCategories() {
  const response = await fetch(`${process.env.ROOT_URL}/api/categories`);
  if (!response.ok) throw new Error("failed to fetch data");
  return response.json();
}

export async function getPost(postId: any) {
  const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`);
  if (!response.ok) throw new Error("failed to fetch data");
  return response.json();
}

export async function getPosts(categoryPath: any, page: number) {
  const response = await fetch(`${process.env.ROOT_URL}/api/posts`, {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categoryPath, page }),
    // 이하는 모두 동일
    // cache: "no-store",
    cache: "no-cache",
    // next: { revalidate: 0 },
  });
  if (!response.ok) throw new Error("failed to fetch data");
  return response.json();
}
