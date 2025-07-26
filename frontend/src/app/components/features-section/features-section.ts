import { Component } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface Feature {
  title: string;
  description: string;
  icon: string;
  color: 'blue' | 'orange' | 'green';
  features: string[];
}

@Component({
  selector: 'app-features-section',
  imports: [TranslatePipe],
  templateUrl: './features-section.html'
})
export class FeaturesSectionComponent {
  features: Feature[] = [
    {
      title: `features.feature1.title`,
      description: `features.feature1.description`,
      icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z',
      color: 'blue',
      features: [
        `features.feature1.item1`,
        `features.feature1.item2`,
        `features.feature1.item3`
      ]
    },
    {
      title: `features.feature2.title`,
      description: `features.feature2.description`,
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      color: 'orange',
      features: [
        `features.feature2.item1`,
        `features.feature2.item2`,
        `features.feature2.item3`
      ]
    },
    {
      title: `features.feature3.title`,
      description: `features.feature3.description`,
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
      color: 'green',
      features: [
        `features.feature3.item1`,
        `features.feature3.item2`,
        `features.feature3.item3`
      ]
    }
  ];

  getColorClasses(color: string): { background: string; text: string; } {
    const colorMap = {
      blue: { background: 'bg-blue-100', text: 'text-blue-600' },
      orange: { background: 'bg-orange-100', text: 'text-orange-600' },
      green: { background: 'bg-green-100', text: 'text-green-600' }
    };
    return colorMap[color as keyof typeof colorMap];
  }
}