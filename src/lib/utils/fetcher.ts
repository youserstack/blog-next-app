// server fetchers
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

// client fetchers
export async function deletePost(postId: string) {
  try {
    console.log("\n\x1b[35m<deletePost>\x1b[0m");
    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`, {
      method: "delete",
      headers: {
        authorization: `bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const { deletedPost } = await response.json();
      return { deletedPost };
    }
  } catch (error: any) {
    console.error(error);
    return { error: error.message };
  }
}
