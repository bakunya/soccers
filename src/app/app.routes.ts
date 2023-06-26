import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.routes').then((m) => m.routes),
  },
  {
    path: 'league-search',
    loadComponent: () => import('./league-search/league-search.page').then( m => m.LeagueSearchPage)
  },
  {
    path: 'league/:id',
    loadComponent: () => import('./league/league.page').then( m => m.LeaguePage)
  },
  {
    path: 'player/:id',
    loadComponent: () => import('./player/player.page').then( m => m.PlayerPage)
  },
  {
    path: 'bookmarks',
    loadComponent: () => import('./bookmarks/bookmarks.page').then( m => m.BookmarksPage)
  },
];
