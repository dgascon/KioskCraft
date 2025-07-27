import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import {
  SeoHeadComponent,
  FooterSectionComponent,
  ThemeToggleComponent,
  LanguageToggleComponent
} from '../index';

@Component({
  selector: 'app-pricing-page',
  imports: [
    TranslatePipe,
    SeoHeadComponent,
    FooterSectionComponent,
    ThemeToggleComponent,
    LanguageToggleComponent
  ],
  templateUrl: './pricing-page.html'
})
export class PricingPage {
  billingPeriod: 'monthly' | 'yearly' = 'monthly';

  // Pricing structure
  pricing = {
    freemium: {
      monthly: { price: 0, period: '/mois', savings: undefined },
      yearly: { price: 0, period: '/an', savings: undefined }
    },
    pro: {
      monthly: { price: 50, period: '€/mois', savings: undefined },
      yearly: { price: 40, period: '€/mois', savings: 'Économisez 20%' }
    },
    enterprise: {
      monthly: { price: 200, period: '€/mois', savings: undefined },
      yearly: { price: 160, period: '€/mois', savings: 'Économisez 20%' }
    }
  };

  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }

  setBillingPeriod(period: 'monthly' | 'yearly') {
    this.billingPeriod = period;
  }

  getPrice(plan: 'freemium' | 'pro' | 'enterprise') {
    return this.pricing[plan][this.billingPeriod];
  }

  getPlan(planType: string) {
    // TODO: Implement plan selection logic
    console.log(`Selected ${planType} plan with ${this.billingPeriod} billing`);
  }
}