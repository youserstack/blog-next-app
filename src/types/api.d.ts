export interface PostsSearchParams {
  searchWords?: string;
  categoryPath?: string;
  sort?: string;
  page?: number;
}

export interface CategoryProps {
  params: {
    category: string[];
  };
  searchParams: {
    [key: string]: any;
  };
}
