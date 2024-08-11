/* 서버 컴포넌트에 사용할 유틸 함수 */

// 전체 카테고리 읽기 (레이아웃 서버컴포넌트에서 사용)
export async function getCategories() {
  const url = `${process.env.ROOT_URL}/api/categories`;
  const response = await fetch(url, { cache: "no-cache" });
  return response.json();
}
