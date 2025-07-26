import { Routes } from '@angular/router';
import { MainComponent } from './components/main-component';
import { localeGuard } from './guards/locale.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/fr-FR',
    pathMatch: 'full'
  },
  {
    path: ':locale',
    component: MainComponent,
    canActivate: [localeGuard],
    children: [
      {
        path: '',
        loadComponent: () => import('./components/landing-page/landing-page').then(m => m.LandingPage)
      },
      {
        path: 'features',
        loadComponent: () => import('./components/landing-page/landing-page').then(m => m.LandingPage)
      },
      {
        path: 'pricing',
        loadComponent: () => import('./components/landing-page/landing-page').then(m => m.LandingPage)
      },
      {
        path: 'demo',
        loadComponent: () => import('./components/landing-page/landing-page').then(m => m.LandingPage)
      },
      {
        path: 'contact',
        loadComponent: () => import('./components/landing-page/landing-page').then(m => m.LandingPage)
      },
      {
        path: 'about',
        loadComponent: () => import('./components/landing-page/landing-page').then(m => m.LandingPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/fr-FR'
  }
];