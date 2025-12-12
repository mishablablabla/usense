import { Injectable } from '@angular/core';
import {
  SearchExample,
  SearchExampleType,
  SearchExamplesGroup,
} from '../models/search-example.model';
import { SEARCH_EXAMPLE_GROUPS } from '../data/search-examples.data';

@Injectable({ providedIn: 'root' })
export class SearchExamplesService {
  getExamplesByType(type: SearchExampleType): SearchExample[] {
    return SEARCH_EXAMPLE_GROUPS.flatMap((group) => group.examples).filter(
      (example) => example.type === type
    );
  }

  getRandomExample(): SearchExample {
    const allExamples = SEARCH_EXAMPLE_GROUPS.flatMap(
      (group) => group.examples
    );
    const randomIndex = Math.floor(Math.random() * allExamples.length);
    return allExamples[randomIndex];
  }

  getExamplesByGroup(title: string): SearchExample[] {
    const group = SEARCH_EXAMPLE_GROUPS.find((g) => g.title === title);
    return group?.examples || [];
  }

  searchExamples(keyword: string): SearchExample[] {
    const lowerKeyword = keyword.toLowerCase();
    return SEARCH_EXAMPLE_GROUPS.flatMap((group) => group.examples).filter(
      (example) =>
        example.query.toLowerCase().includes(lowerKeyword) ||
        example.description.toLowerCase().includes(lowerKeyword)
    );
  }

  getAllGroups(): readonly SearchExamplesGroup[] {
    return SEARCH_EXAMPLE_GROUPS;
  }

  getGroupTitles(): string[] {
    return SEARCH_EXAMPLE_GROUPS.map((group) => group.title);
  }
}
