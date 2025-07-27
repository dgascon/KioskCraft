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
  selector: 'app-partners-page',
  imports: [
    TranslatePipe,
    SeoHeadComponent,
    FooterSectionComponent,
    ThemeToggleComponent,
    LanguageToggleComponent
  ],
  templateUrl: './partners-page.html'
})
export class PartnersPage {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }
}