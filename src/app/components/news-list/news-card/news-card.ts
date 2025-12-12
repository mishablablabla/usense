import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Article } from '../../../services/news.service';

@Component({
  selector: 'app-news-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './news-card.html',
  styleUrl: './news-card.scss',
})
export class NewsCard {
  @Input() article!: Article;
  @Output() cardClick = new EventEmitter<string>();

  onCardClick(): void {
    this.cardClick.emit(this.article.url);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
