import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Article {
  source: {
    id: string | null;
    name: string;
  };
  author: string | null;
  title: string;
  description: string | null;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  content: string | null;
}

export interface NewsResponse {
  status: string;
  totalResults: number;
  articles: Article[];
}

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  private apiUrl = environment.apiUrl;
  private apiKey = environment.apiKey;

  constructor(private http: HttpClient) {}

  getTopHeadlines(
    category?: string,
    country: string = 'us',
    page: number = 1,
    pageSize: number = 20
  ): Observable<NewsResponse> {
    let params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('country', country)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (category) {
      params = params.set('category', category);
    }

    return this.http.get<NewsResponse>(`${this.apiUrl}/top-headlines`, {
      params,
    });
  }

  searchNews(
    query: string,
    page: number = 1,
    pageSize: number = 20
  ): Observable<NewsResponse> {
    const params = new HttpParams()
      .set('apiKey', this.apiKey)
      .set('q', query)
      .set('page', page.toString())
      .set('pageSize', pageSize.toString())
      .set('sortBy', 'publishedAt');

    return this.http.get<NewsResponse>(`${this.apiUrl}/everything`, { params });
  }
}
