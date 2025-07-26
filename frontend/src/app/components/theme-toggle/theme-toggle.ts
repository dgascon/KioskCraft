import { Component, inject } from '@angular/core';
import { ThemeService } from '../../services/theme.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.html',
  imports: [TranslatePipe]
})
export class ThemeToggleComponent {
  private themeService = inject(ThemeService);

  get isDark() {
    return this.themeService.theme() === 'dark';
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}