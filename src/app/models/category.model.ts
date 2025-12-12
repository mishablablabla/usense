export interface Category {
  value: string | null;
  label: string;
  icon?: string;
}

export const CATEGORIES: Category[] = [
  { value: null, label: 'All', icon: 'home' },
  { value: 'business', label: 'Business', icon: 'business' },
  { value: 'entertainment', label: 'Entertainment', icon: 'movie' },
  { value: 'health', label: 'Health', icon: 'favorite' },
  { value: 'science', label: 'Science', icon: 'science' },
  { value: 'sports', label: 'Sports', icon: 'sports' },
  { value: 'technology', label: 'Technology', icon: 'computer' },
] as const;

export type CategoryValue = (typeof CATEGORIES)[number]['value'];
