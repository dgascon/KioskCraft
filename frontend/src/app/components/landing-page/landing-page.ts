import { Component, input } from '@angular/core';
import {
  SeoHeadComponent,
  HeroSectionComponent,
  FeaturesSectionComponent,
  StatsSectionComponent,
  TestimonialsSectionComponent,
  CtaSectionComponent,
  FooterSectionComponent,
  ThemeToggleComponent,
  LanguageToggleComponent
} from '../index';

@Component({
  selector: 'app-landing-page',
  imports: [
    SeoHeadComponent,
    HeroSectionComponent,
    FeaturesSectionComponent,
    StatsSectionComponent,
    TestimonialsSectionComponent,
    CtaSectionComponent,
    FooterSectionComponent,
    ThemeToggleComponent,
    LanguageToggleComponent
  ],
  templateUrl: './landing-page.html'
})
export class LandingPage {
}
