export interface PaginationParams {
  page: number;
  pageSize: number;
  total: number;
}

export interface PaginationState {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
  isLoading: boolean;
  error: string | null;
}
