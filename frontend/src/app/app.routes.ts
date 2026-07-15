import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('../app/core/layout/main/main')
      .then(m => m.Main),
    children: [
      {
        path: 'gestao',
        loadComponent: () => import('./features/gestao/gestao-page')
          .then(m => m.GestaoPage),
      },
    ]
  },
];
