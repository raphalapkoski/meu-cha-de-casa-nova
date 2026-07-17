import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: 'gestao',
    loadComponent: () => import('../app/core/layout/main/main')
      .then(m => m.Main),
    children: [
      {
        path: '',
        loadComponent: () => import('./features/gestao/gestao-page')
          .then(m => m.GestaoPage),
      },
    ],
  },
  {
    path: 'convidado',
    loadComponent: () => import('./features/convidado/convidado-page')
      .then(m => m.ConvidadoPage),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'convidado'
  }
];
