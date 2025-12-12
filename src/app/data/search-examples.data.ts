import { SearchExamplesGroup } from '../models/search-example.model';

export const SEARCH_EXAMPLE_GROUPS: readonly SearchExamplesGroup[] = [
  {
    title: 'Simple Search',
    description: 'Basic keyword search',
    icon: 'search',
    expandedByDefault: true,
    examples: [
      {
        query: 'bitcoin',
        description: 'Find bitcoin news',
        type: 'simple',
        icon: 'currency_bitcoin',
      },
      {
        query: 'tesla',
        description: 'Tesla articles',
        type: 'simple',
        icon: 'electric_car',
      },
      {
        query: 'AI',
        description: 'Artificial intelligence',
        type: 'simple',
        icon: 'smart_toy',
      },
      {
        query: 'climate',
        description: 'Climate news',
        type: 'simple',
        icon: 'thermostat',
      },
      {
        query: 'election',
        description: 'Election coverage',
        type: 'simple',
        icon: 'how_to_vote',
      },
      {
        query: 'startup',
        description: 'Startup news',
        type: 'simple',
        icon: 'rocket_launch',
      },
    ],
  },
  {
    title: 'Phrase Search',
    description: 'Exact phrase matching',
    icon: 'format_quote',
    examples: [
      {
        query: '"elon musk"',
        description: 'Exact phrase: elon musk',
        type: 'phrase',
        icon: 'person',
      },
      {
        query: '"climate change"',
        description: 'Climate change phrase',
        type: 'phrase',
        icon: 'public',
      },
      {
        query: '"space exploration"',
        description: 'Space exploration news',
        type: 'phrase',
        icon: 'rocket',
      },
      {
        query: '"machine learning"',
        description: 'Machine learning articles',
        type: 'phrase',
        icon: 'psychology',
      },
      {
        query: '"quantum computing"',
        description: 'Quantum computing news',
        type: 'phrase',
        icon: 'calculate',
      },
    ],
  },
  {
    title: 'Boolean Search',
    description: 'Advanced search with operators',
    icon: 'code',
    examples: [
      {
        query: 'bitcoin AND ethereum',
        description: 'Both terms must appear',
        type: 'boolean',
        icon: 'add_circle',
      },
      {
        query: 'crypto OR blockchain',
        description: 'Either term',
        type: 'boolean',
        icon: 'shuffle',
      },
      {
        query: 'tesla NOT musk',
        description: 'Exclude specific term',
        type: 'boolean',
        icon: 'remove_circle',
      },
      {
        query: '(AI AND robots) NOT danger',
        description: 'Complex query with parentheses',
        type: 'boolean',
        icon: 'integration_instructions',
      },
      {
        query: 'apple AND (iphone OR macbook)',
        description: 'Combined conditions',
        type: 'boolean',
        icon: 'device_hub',
      },
      {
        query: 'startup AND funding NOT bankrupt',
        description: 'Positive news filtering',
        type: 'boolean',
        icon: 'trending_up',
      },
    ],
  },
  {
    title: 'Time-based Search',
    description: 'Recent and trending news',
    icon: 'schedule',
    examples: [
      {
        query: 'today',
        description: "Today's top news",
        type: 'simple',
        icon: 'today',
      },
      {
        query: 'breaking',
        description: 'Breaking news',
        type: 'simple',
        icon: 'notifications_active',
      },
      {
        query: 'trending',
        description: 'Currently trending',
        type: 'simple',
        icon: 'trending_up',
      },
      {
        query: '2024 election',
        description: 'Time-specific events',
        type: 'simple',
        icon: 'event',
      },
    ],
  },
] as const;
