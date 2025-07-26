import { Component, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  company: string;
}

@Component({
  selector: 'app-testimonials-section',
  templateUrl: './testimonials-section.html',
  imports: [TranslatePipe]
})
export class TestimonialsSectionComponent {
  starRating = signal([1, 2, 3, 4, 5]);

  testimonials: Testimonial[] = [
    {
      quote: "KioskCraft a révolutionné notre expérience client. Nos ventes ont augmenté de 40% depuis l'installation des bornes tactiles.",
      author: 'Marie Dubois',
      position: 'Directrice',
      company: 'FastFood France'
    },
    {
      quote: "La gestion centralisée de nos 120 franchisés n'a jamais été aussi simple. Un gain de temps considérable pour nos équipes.",
      author: 'Pierre Martin',
      position: 'CEO',
      company: 'Burger Chain'
    },
    {
      quote: "L'interface est si intuitive que nos clients passent commande 60% plus rapidement. ROI atteint en 6 mois seulement.",
      author: 'Sophie Laurent',
      position: 'Propriétaire',
      company: 'Pizza Express'
    }
  ];
}