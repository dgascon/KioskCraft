import { Component, input, OnInit, inject, computed } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { LocaleService } from '../../services/locale.service';

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
  private readonly translate = inject(TranslateService);
  private readonly localeService = inject(LocaleService);

  readonly seoData = input<Partial<SEOData>>({});

  readonly translatedSeoData = computed(() => {
    const inputData = this.seoData();
    const currentLocale = this.localeService.currentLocale();

    return {
      title: inputData.title || this.translate.instant('seo.title'),
      description: inputData.description || this.translate.instant('seo.description'),
      keywords: inputData.keywords || this.translate.instant('seo.keywords'),
      ogTitle: inputData.ogTitle || this.translate.instant('seo.ogTitle'),
      ogDescription: inputData.ogDescription || this.translate.instant('seo.ogDescription'),
      ogImage: inputData.ogImage || '/assets/images/kioskcraft-og-image.webp',
      canonicalUrl: inputData.canonicalUrl || `https://kioskcraft.com/${currentLocale}`,
      structuredData: inputData.structuredData
    } as SEOData;
  });

  ngOnInit() {
    this.updateSEOTags();

  }

  private updateSEOTags() {
    const data = this.translatedSeoData();

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
    const currentLocale = this.localeService.currentLocale();
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      name: 'KioskCraft',
      description: this.translate.instant('seo.structuredData.description'),
      url: `https://kioskcraft.com/${currentLocale}`,
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
      serviceType: this.translate.instant('seo.structuredData.serviceType'),
      areaServed: {
        '@type': 'Country',
        name: this.translate.instant('seo.structuredData.areaServedCountry')
      }
    };
    this.addStructuredData(structuredData);
  }
}