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
  selector: 'app-terms-page',
  imports: [
    TranslatePipe,
    SeoHeadComponent,
    FooterSectionComponent,
    ThemeToggleComponent,
    LanguageToggleComponent
  ],
  templateUrl: './terms-page.html'
})
export class TermsPage {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }
}