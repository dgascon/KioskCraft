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
  selector: 'app-privacy-page',
  imports: [
    TranslatePipe,
    SeoHeadComponent,
    FooterSectionComponent,
    ThemeToggleComponent,
    LanguageToggleComponent
  ],
  templateUrl: './privacy-page.html'
})
export class PrivacyPage {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }
}