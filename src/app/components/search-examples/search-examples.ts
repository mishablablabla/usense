import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

import { SearchExamplesGroup } from '../../models/search-example.model';
import { SearchExamplesService } from '../../services/search-examples.service';

@Component({
  selector: 'app-search-examples',
  standalone: true,
  imports: [CommonModule, MatExpansionModule, MatChipsModule, MatIconModule],
  templateUrl: './search-examples.html',
  styleUrl: './search-examples.scss',
})
export class SearchExamples implements OnInit {
  @Output() exampleSelected = new EventEmitter<string>();

  exampleGroups: readonly SearchExamplesGroup[] = [];

  constructor(private searchExamplesService: SearchExamplesService) {}

  ngOnInit(): void {
    this.loadExamples();
  }

  loadExamples(): void {
    this.exampleGroups = this.searchExamplesService.getAllGroups();
  }

  selectExample(query: string): void {
    this.exampleSelected.emit(query);
  }

  getGroupIcon(group: SearchExamplesGroup): string {
    return group.icon || 'help';
  }

  getRandomQuery(): string {
    return this.searchExamplesService.getRandomExample().query;
  }
}
