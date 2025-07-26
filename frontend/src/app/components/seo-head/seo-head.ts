import { Component, input, OnInit, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

interface SEOData {
  title: string;
  description: string;
  keywords: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: Record<string, unknown>;
}

@Component({
  selector: 'app-seo-head',
  template: '',
})
export class SeoHeadComponent implements OnInit {
  private readonly meta = inject(Meta);
  private readonly title = inject(Title);

  readonly seoData = input<SEOData>({
    title: 'KioskCraft - Solution Borne Restaurant Innovante | Interface Tactile Personnalisable',
    description: 'Transformez votre restaurant avec KioskCraft, la solution borne interactive pour franchiseurs. Interface tactile personnalisable, gestion multi-tenant, optimisation des ventes.',
    keywords: 'solution borne restaurant, borne interactive restaurant, interface tactile restaurant, borne commande restaurant, système borne restaurant, franchise borne tactile, borne self-service restaurant',
    ogTitle: 'KioskCraft - Solution Borne Restaurant pour Franchiseurs',
    ogDescription: 'Solution SaaS complète pour créer et gérer des bornes restaurant personnalisées. Augmentez vos ventes avec nos interfaces tactiles innovantes.',
    ogImage: '/assets/images/kioskcraft-og-image.webp',
    canonicalUrl: 'https://kioskcraft.com'
  });

  ngOnInit() {
    this.updateSEOTags();
  }

  private updateSEOTags() {
    const data = this.seoData();
    
    this.title.setTitle(data.title);

    this.meta.updateTag({ name: 'description', content: data.description });
    this.meta.updateTag({ name: 'keywords', content: data.keywords });
    this.meta.updateTag({ name: 'author', content: 'KioskCraft' });
    this.meta.updateTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });

    this.meta.updateTag({ property: 'og:title', content: data.ogTitle || data.title });
    this.meta.updateTag({ property: 'og:description', content: data.ogDescription || data.description });
    this.meta.updateTag({ property: 'og:image', content: data.ogImage || '' });
    this.meta.updateTag({ property: 'og:url', content: data.canonicalUrl || '' });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'KioskCraft' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.ogTitle || data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.ogDescription || data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.ogImage || '' });

    if (data.canonicalUrl) {
      this.updateCanonicalUrl(data.canonicalUrl);
    }

    if (data.structuredData) {
      this.addStructuredData(data.structuredData);
    } else {
      this.addDefaultStructuredData();
    }
  }

  private updateCanonicalUrl(url: string) {
    let link: HTMLLinkElement | null = document.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.rel = 'canonical';
      document.head.appendChild(link);
    }
    link.href = url;
  }

  private addStructuredData(data: Record<string, unknown>) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    document.head.appendChild(script);
  }

  private addDefaultStructuredData() {
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'KioskCraft',
      description: 'Solution SaaS pour créer et gérer des bornes restaurant interactives',
      url: 'https://kioskcraft.com',
      applicationCategory: 'BusinessApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'EUR',
        availability: 'https://schema.org/InStock'
      },
      provider: {
        '@type': 'Organization',
        name: 'KioskCraft',
        url: 'https://kioskcraft.com'
      },
      serviceType: 'Restaurant Management Software',
      areaServed: {
        '@type': 'Country',
        name: 'France'
      }
    };
    this.addStructuredData(structuredData);
  }
}