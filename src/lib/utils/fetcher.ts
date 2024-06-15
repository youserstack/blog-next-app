const ROOT_URL = process.env.ROOT_URL;

/* 서버 컴포넌트에 사용할 유틸 함수 */

// 전체 카테고리 읽기 (레이아웃 서버컴포넌트에서 사용)
export async function getCategories() {
  const response = await fetch(`${ROOT_URL}/api/categories`);
  return response.json();
}

// 카테고리 포스트 리스트 읽기
export async function getPosts(categoryPath: any, page: number) {
  const encodedCategoryPath = encodeURIComponent(categoryPath);
  const response = await fetch(
    `${ROOT_URL}/api/posts?categoryPath=${encodedCategoryPath}&page=${page}`,
    { headers: { "Content-Type": "application/json" }, cache: "no-cache" }
  );
  return response.json();
}

// 포스트 읽기
export async function getPost(postId: any) {
  const response = await fetch(`${ROOT_URL}/api/posts/${postId}`);
  return response.json();
}

/* 클라이언트 컴포넌트에 사용할 유틸 함수 */

// 포스트 생성
export async function createPost(formData: any, accessToken: string) {
  console.log("\n\x1b[35m<createPost>\x1b[0m");

  const response = await fetch(`${process.env.ROOT_URL}/api/posts`, {
    method: "POST",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: formData,
  });

  return response.json();
}

// 포스트 수정
export async function updatePost(postId: string, payload: any, accessToken: string) {
  console.log("\n\x1b[35m<updatePost>\x1b[0m");

  const response = await fetch(`${ROOT_URL}/api/posts/${postId}`, {
    method: "PATCH",
    headers: { Authorization: `Bearer ${accessToken}` },
    body: payload,
  });

  return response.json();
}

// 포스트 삭제
export async function deletePost(postId: string, accessToken: string) {
  console.log("\n\x1b[35m<deletePost>\x1b[0m");

  const response = await fetch(`${ROOT_URL}/api/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  });

  return response.json();
}

// 댓글 삭제
export async function deleteComment(commentId: string, accessToken: string) {
  console.log("\n\x1b[35m<deleteComment>\x1b[0m");
  const response = await fetch(`${ROOT_URL}/api/comments/${commentId}`, {
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
