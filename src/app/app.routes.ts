import { Routes } from '@angular/router';
import { NewsList } from './components/news-list/news-list';

export const routes: Routes = [
  { path: '', component: NewsList },
  { path: '**', redirectTo: '' },
];
