export type PaginatedQueryRequest = {
  pageSize: number;
  currentPage: number;
  search?: string;
};

export type PaginatedQueryResponse<K> = {
  totalPages: number;
  pageSize: number;
  currentPage: number;
  totalItems: number;
  results: Array<K>;
};
