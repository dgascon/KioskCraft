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
        loadComponent: () => import('./components/features-page/features-page').then(m => m.FeaturesPage)
      },
      {
        path: 'pricing',
        loadComponent: () => import('./components/pricing-page/pricing-page').then(m => m.PricingPage)
      },
      {
        path: 'demo',
        loadComponent: () => import('./components/landing-page/landing-page').then(m => m.LandingPage)
      },
      {
        path: 'contact',
        loadComponent: () => import('./components/contact-page/contact-page').then(m => m.ContactPage)
      },
      {
        path: 'about',
        loadComponent: () => import('./components/about-page/about-page').then(m => m.AboutPage)
      },
      {
        path: 'partners',
        loadComponent: () => import('./components/partners-page/partners-page').then(m => m.PartnersPage)
      },
      {
        path: 'privacy',
        loadComponent: () => import('./components/privacy-page/privacy-page').then(m => m.PrivacyPage)
      },
      {
        path: 'legal',
        loadComponent: () => import('./components/legal-page/legal-page').then(m => m.LegalPage)
      },
      {
        path: 'terms',
        loadComponent: () => import('./components/terms-page/terms-page').then(m => m.TermsPage)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/fr-FR'
  }
];