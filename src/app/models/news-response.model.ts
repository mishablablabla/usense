import { Article } from './article.model';

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface PaginatedNewsResponse extends NewsResponse {
  currentPage: number;
  totalPages: number;
  hasMore: boolean;
}
