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
  selector: 'app-about-page',
  imports: [
    TranslatePipe,
    SeoHeadComponent,
    FooterSectionComponent,
    ThemeToggleComponent,
    LanguageToggleComponent
  ],
  templateUrl: './about-page.html'
})
export class AboutPage {
  constructor(private router: Router) {}

  navigateToHome() {
    this.router.navigate(['/']);
  }

  navigateToContact() {
    this.router.navigate(['/contact']);
  }

  navigateToDemo() {
    // TODO: Implement demo navigation or contact with demo request
    this.router.navigate(['/contact']);
  }
}