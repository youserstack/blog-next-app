/* 클라이언트 컴포넌트에 사용할 유틸 함수 */

// 카테고리 삭제
export async function deleteCategory(categories: string[], accessToken: string) {
  const response = await fetch(`${process.env.ROOT_URL}/api/categories`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
    body: JSON.stringify({ categories }),
  });

  return response.json();
}

// 포스트 삭제
export async function deletePost(postId: string, accessToken: string) {
  const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.json();
}

// 댓글 삭제
export async function deleteComment(commentId: string, accessToken: string) {
  const response = await fetch(`${process.env.ROOT_URL}/api/comments/${commentId}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  return response.json();
}
