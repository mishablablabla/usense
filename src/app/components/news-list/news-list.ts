import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { NewsService, Article } from '../../services/news.service';
import { SearchExamples } from '../search-examples/search-examples';
import { NewsCard } from '../news-card/news-card';

@Component({
  selector: 'app-news-list',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    SearchExamples,
    NewsCard,
  ],
  templateUrl: './news-list.html',
  styleUrl: './news-list.scss',
})
export class NewsList implements OnInit {
  articles: Article[] = [];
  loading = false;
  loadingMore = false;
  error: string | null = null;
  selectedCategory: string | null = null;
  searchControl = new FormControl('');
  currentPage = 1;
  totalResults = 0;
  hasMore = true;
  private currentSearchQuery: string | null = null;
  private readonly MAX_PAGE = 5;
  private readonly PAGE_SIZE = 20;

  categories = [
    { value: null, label: 'All' },
    { value: 'business', label: 'Business' },
    { value: 'entertainment', label: 'Entertainment' },
    { value: 'health', label: 'Health' },
    { value: 'science', label: 'Science' },
    { value: 'sports', label: 'Sports' },
    { value: 'technology', label: 'Technology' },
  ];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    this.loadNews();
    this.setupSearch();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    const scrollPosition = window.innerHeight + window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const threshold = 200;

    if (
      scrollPosition >= scrollHeight - threshold &&
      !this.loadingMore &&
      this.hasMore
    ) {
      this.loadMoreNews();
    }
  }

  setupSearch(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((query) => {
        if (query && query.trim().length > 2) {
          this.searchNews(query.trim());
        } else if (!query || query.trim().length === 0) {
          this.loadNews();
        }
      });
  }

  loadNews(category?: string): void {
    this.loading = true;
    this.error = null;
    this.selectedCategory = category || null;
    this.currentPage = 1;
    this.articles = [];
    this.currentSearchQuery = null;

    this.newsService
      .getTopHeadlines(
        category || undefined,
        'us',
        this.currentPage,
        this.PAGE_SIZE
      )
      .subscribe({
        next: (response) => {
          this.articles = response.articles;
          this.totalResults = response.totalResults;
          this.hasMore =
            this.currentPage < this.MAX_PAGE &&
            this.articles.length < response.totalResults;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to load news. Please try again later.';
          this.loading = false;
          console.error('Error loading news:', err);
        },
      });
  }

  loadMoreNews(): void {
    if (this.loadingMore || !this.hasMore || this.currentPage >= this.MAX_PAGE)
      return;

    this.loadingMore = true;
    this.currentPage++;

    if (this.currentSearchQuery) {
      this.newsService
        .searchNews(this.currentSearchQuery, this.currentPage, this.PAGE_SIZE)
        .subscribe({
          next: (response) => {
            this.articles = [...this.articles, ...response.articles];
            this.hasMore =
              this.currentPage < this.MAX_PAGE &&
              this.articles.length < response.totalResults;
            this.loadingMore = false;
          },
          error: (err) => {
            this.loadingMore = false;
            this.hasMore = false;
            console.error('Error loading more news:', err);
          },
        });
    } else {
      this.newsService
        .getTopHeadlines(
          this.selectedCategory || undefined,
          'us',
          this.currentPage,
          this.PAGE_SIZE
        )
        .subscribe({
          next: (response) => {
            this.articles = [...this.articles, ...response.articles];
            this.hasMore =
              this.currentPage < this.MAX_PAGE &&
              this.articles.length < response.totalResults;
            this.loadingMore = false;
          },
          error: (err) => {
            this.loadingMore = false;
            this.hasMore = false;
            console.error('Error loading more news:', err);
          },
        });
    }
  }

  searchNews(query: string): void {
    this.loading = true;
    this.error = null;
    this.selectedCategory = null;
    this.currentPage = 1;
    this.articles = [];
    this.currentSearchQuery = query;

    this.newsService
      .searchNews(query, this.currentPage, this.PAGE_SIZE)
      .subscribe({
        next: (response) => {
          this.articles = response.articles;
          this.totalResults = response.totalResults;
          this.hasMore =
            this.currentPage < this.MAX_PAGE &&
            this.articles.length < response.totalResults;
          this.loading = false;
        },
        error: (err) => {
          this.error = 'Failed to search news. Please try again.';
          this.loading = false;
          console.error('Error searching news:', err);
        },
      });
  }

  selectCategory(category: string | null): void {
    this.searchControl.setValue('', { emitEvent: false });
    this.loadNews(category || undefined);
  }

  clearSearch(): void {
    this.searchControl.setValue('');
    this.loadNews(this.selectedCategory || undefined);
  }

  onExampleSelected(query: string): void {
    this.searchControl.setValue(query);
  }

  openArticle(url: string): void {
    window.open(url, '_blank');
  }
}
