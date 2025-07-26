import { Component, signal, inject, HostListener } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LocaleService } from '../../services/locale.service';

@Component({
  selector: 'app-language-toggle',
  standalone: true,
  templateUrl: './language-toggle.html',
  imports: [TranslateModule]
})
export class LanguageToggleComponent {
  private localeService = inject(LocaleService);

  readonly isOpen = signal(false);
  readonly currentLocale = this.localeService.currentLocale;
  readonly currentLocaleInfo = this.localeService.currentLocaleInfo;
  readonly availableLocales = this.localeService.availableLocales;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const dropdown = document.querySelector('.language-dropdown');
    
    if (dropdown && !dropdown.contains(target)) {
      this.closeDropdown();
    }
  }

  @HostListener('document:keydown.escape')
  onEscapeKey(): void {
    this.closeDropdown();
  }

  toggleDropdown(): void {
    this.isOpen.update(value => !value);
  }

  closeDropdown(): void {
    this.isOpen.set(false);
  }

  async switchLanguage(newLocale: string): Promise<void> {
    try {
      await this.localeService.switchToLocale(newLocale);
      this.closeDropdown();
    } catch (error) {
      console.error('Error switching language:', error);
    }
  }

  getLocaleDisplayName(locale: string): string {
    return this.localeService.getLocaleDisplayName(locale);
  }
}