// 검색 쿼리 파라미터
export interface PostsSearchParams {
  searchWords?: string;
  categoryPath?: string;
  sort?: string;
  page?: string;
}

export interface CategoryProps {
  params: { category: string[] };
  searchParams: { [key: string]: any };
}
