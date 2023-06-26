import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'league-search',
        loadComponent: () =>
          import('../league-search/league-search.page').then((m) => m.LeagueSearchPage),
      },
      {
        path: 'bookmarks',
        loadComponent: () =>
          import('../bookmarks/bookmarks.page').then((m) => m.BookmarksPage),
      },
      {
        path: '',
        redirectTo: '/tabs/league-search',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
	redirectTo: '/tabs/league-search',
    pathMatch: 'full',
  },
];
