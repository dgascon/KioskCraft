import { Component } from '@angular/core';

interface Stat {
  value: string;
  label: string;
}

@Component({
  selector: 'app-stats-section',
  standalone: true,
  templateUrl: './stats-section.html'
})
export class StatsSectionComponent {
  stats: Stat[] = [
    { value: '+35%', label: 'Augmentation des ventes' },
    { value: '-60%', label: 'Temps d\'attente réduit' },
    { value: '500+', label: 'Bornes déployées' },
    { value: '98%', label: 'Satisfaction client' }
  ];
}