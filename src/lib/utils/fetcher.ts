/* 서버 컴포넌트 함수 */

// 전체 카테고리 읽기 (레이아웃 서버컴포넌트에서 사용)
export async function getCategories() {
  const response = await fetch(`${process.env.ROOT_URL}/api/categories`);
  if (!response.ok) throw new Error("전체 카테고리 읽기 실패");
  return response.json();
}

// 카테고리 포스트글 리스트 읽기
export async function getPosts(categoryPath: any, page: number) {
  const response = await fetch(`${process.env.ROOT_URL}/api/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ categoryPath, page }),
    cache: "no-cache",
  });
  if (!response.ok) throw new Error("카테고리 포스트글 리스트 읽기 실패");
  return response.json();
}

// 특정 포스트글 읽기
export async function getPost(postId: any) {
  const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`);
  if (!response.ok) throw new Error("특정 포스트글 읽기 실패");
  return response.json();
}

/* 클라이언트 컴포넌트 함수 */

// 특정 카테고리 포스트글 삭제 (클라이언트 컴포넌트에서 사용)
export async function deletePost(postId: string) {
  console.log("\n\x1b[35m<deletePost>\x1b[0m");
  const accessToken = localStorage.getItem("accessToken");
  const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  // branch
  if (!response.ok) throw new Error("특정 포스트글 삭제 실패");
  return response.json();
}

// 특정 댓글 삭제
export async function deleteComment(commentId: string, accessToken: string) {
  console.log("\n\x1b[35m<deleteComment>\x1b[0m");
  const response = await fetch(`${process.env.ROOT_URL}/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });
  return response.json();
}

// 이하는 모두 동일
// cache: "no-store",
// cache: "no-cache",
// next: { revalidate: 0 },
