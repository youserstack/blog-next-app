/* 서버 컴포넌트에 사용할 유틸 함수 */

import { PostsSearchParams } from "@/types/api";

// 전체 카테고리 읽기 (레이아웃 서버컴포넌트에서 사용)
export async function getCategories() {
  const response = await fetch(`${process.env.ROOT_URL}/api/categories`, {
    credentials: "include", // 쿠키를 포함하여 요청을 보냅니다.
  });
  return response.json();
}

// 포스트 리스트 읽기
export async function getPosts({ categoryPath, page, searchWords }: PostsSearchParams) {
  const response = await fetch(
    `${process.env.ROOT_URL}/api/posts?categoryPath=${categoryPath}&page=${page}&searchWords=${searchWords}`,
    { cache: "no-cache" }
  );

  return response.json();
}

// 포스트 읽기
export async function getPost(postId: any) {
  const response = await fetch(`${process.env.ROOT_URL}/api/posts/${postId}`);
  return response.json();
}
