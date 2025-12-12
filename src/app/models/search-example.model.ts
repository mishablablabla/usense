export interface SearchExample {
  query: string;
  description: string;
  type: 'simple' | 'phrase' | 'boolean';
  icon?: string;
}

export interface SearchExamplesGroup {
  title: string;
  description?: string;
  examples: SearchExample[];
  icon?: string;
  expandedByDefault?: boolean;
}

export type SearchExampleType = SearchExample['type'];
