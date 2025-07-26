import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface Stat {
  value: string;
  labelKey: string;
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  templateUrl: './stats-section.html',
  imports: [TranslateModule]
})
export class StatsSectionComponent {
  stats: Stat[] = [
    { value: '+35%', labelKey: 'stats.sales_increase' },
    { value: '-60%', labelKey: 'stats.wait_time_reduction' },
    { value: '500+', labelKey: 'stats.kiosks_deployed' },
    { value: '98%', labelKey: 'stats.customer_satisfaction' }
  ];
}