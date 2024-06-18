/* 서버 컴포넌트에 사용할 유틸 함수 */

// 전체 카테고리 읽기 (레이아웃 서버컴포넌트에서 사용)
export async function getCategories() {
  const response = await fetch(`${process.env.ROOT_URL}/api/categories`);
  return response.json();
}

// 카테고리 포스트 리스트 읽기
export async function getPosts(categoryPath: any, page: number) {
  const encodedCategoryPath = encodeURIComponent(categoryPath);

  const response = await fetch(
    `${process.env.ROOT_URL}/api/posts?categoryPath=${encodedCategoryPath}&page=${page}`,
    {
      headers: { "Content-Type": "application/json" },
      cache: "no-cache",
    }
  );

  return response.json();
}

// 포스트 읽기
export async function getPost(postId: any) {
  const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`);
  return response.json();
}
