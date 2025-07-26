import { Component, computed, inject, input, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

interface Language {
  code: string;
  name: string;
}

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  templateUrl: './language-toggle.html',
  imports: [TranslateModule]
})
export class LanguageToggleComponent {
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isOpen = signal(false);

  currentLocale = computed(() => {
    const urlSegments = this.router.url.split('/');
    return urlSegments[1] || 'fr-FR';
  });

  supportedLanguages: Language[] = [
    { code: 'fr-FR', name: 'fr-FR' },
    { code: 'en-US', name: 'en-US' }
  ];

  currentLanguage = computed(() =>
    this.supportedLanguages.find(lang => lang.code === this.currentLocale()) || this.supportedLanguages[0]
  );

  availableLanguages = computed(() =>
    this.supportedLanguages.filter(lang => lang.code !== this.currentLocale())
  );

  toggleDropdown(): void {
    this.isOpen.update(value => !value);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  switchLanguage(newLocale: string): void {
    const currentUrl = this.router.url;
    const urlSegments = currentUrl.split('/');

    // Replace the locale in the URL (first segment after /)
    if (urlSegments.length > 1) {
      urlSegments[1] = newLocale;
    } else {
      urlSegments.push(newLocale);
    }

    const newUrl = urlSegments.join('/');
    this.router.navigateByUrl(newUrl);
    this.closeDropdown();
  }
}