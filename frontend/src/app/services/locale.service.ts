import { Injectable, signal, computed, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { filter, take } from 'rxjs/operators';

export interface SupportedLocale {
  code: string;
  name: string;
  nativeName: string;
}

@Injectable({
  providedIn: 'root'
})
export class LocaleService {
  private router = inject(Router);
  private translateService = inject(TranslateService);

  readonly supportedLocales: SupportedLocale[] = [
    { code: 'fr-FR', name: 'French', nativeName: 'Français' },
    { code: 'en-US', name: 'English', nativeName: 'English' }
  ];

  readonly defaultLocale = 'fr-FR';
  private currentLocaleSignal = signal<string>(this.defaultLocale);

  readonly currentLocale = this.currentLocaleSignal.asReadonly();

  readonly currentLocaleInfo = computed(() => 
    this.supportedLocales.find(locale => locale.code === this.currentLocale()) || 
    this.supportedLocales[0]
  );

  readonly availableLocales = computed(() => 
    this.supportedLocales.filter(locale => locale.code !== this.currentLocale())
  );

  constructor() {
    this.initializeLocale();
    this.setupRouterSubscription();
  }

  private initializeLocale(): void {
    const urlLocale = this.extractLocaleFromUrl();
    
    if (this.isValidLocale(urlLocale)) {
      this.setCurrentLocale(urlLocale);
    } else {
      this.setCurrentLocale(this.defaultLocale);
    }
  }

  private setupRouterSubscription(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const urlLocale = this.extractLocaleFromUrl();
        if (this.isValidLocale(urlLocale) && urlLocale !== this.currentLocale()) {
          this.setCurrentLocale(urlLocale);
        }
      });
  }

  private extractLocaleFromUrl(): string {
    const urlSegments = this.router.url.split('/');
    return urlSegments[1] || '';
  }

  private isValidLocale(locale: string): boolean {
    return this.supportedLocales.some(supported => supported.code === locale);
  }

  private setCurrentLocale(locale: string): void {
    if (this.isValidLocale(locale)) {
      this.currentLocaleSignal.set(locale);
      this.translateService.use(locale);
    }
  }

  switchToLocale(newLocale: string): Promise<boolean> {
    if (!this.isValidLocale(newLocale) || newLocale === this.currentLocale()) {
      return Promise.resolve(false);
    }

    const currentUrl = this.router.url;
    const newUrl = this.buildUrlWithNewLocale(currentUrl, newLocale);
    
    return this.router.navigateByUrl(newUrl, { replaceUrl: false });
  }

  private buildUrlWithNewLocale(currentUrl: string, newLocale: string): string {
    const urlSegments = currentUrl.split('/').filter(segment => segment !== '');
    
    // Remove current locale if it exists
    if (urlSegments.length > 0 && this.isValidLocale(urlSegments[0])) {
      urlSegments.shift();
    }
    
    // Add new locale at the beginning
    urlSegments.unshift(newLocale);
    
    return '/' + urlSegments.join('/');
  }

  getLocaleDisplayName(locale: string): string {
    const localeInfo = this.supportedLocales.find(l => l.code === locale);
    return localeInfo?.nativeName || locale;
  }

  isCurrentLocale(locale: string): boolean {
    return this.currentLocale() === locale;
  }
}