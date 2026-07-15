import { Route } from '@angular/router';

export const appRoutes: Route[] = [
    {
    path: '',
    loadComponent: () => import('../app/core/layout/main/main')
      .then(m => m.Main),
      children: [
        
      ]
    },
];
