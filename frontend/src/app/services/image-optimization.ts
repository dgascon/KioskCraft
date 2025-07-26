import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ImageOptimizationService {
  
  /**
   * Get optimized image URL with WebP support and fallbacks
   */
  getOptimizedImageUrl(imagePath: string, options: {
    width?: number;
    height?: number;
    quality?: number;
    format?: 'webp' | 'jpg' | 'png';
  } = {}): string {
    const { width, height, quality = 80, format = 'webp' } = options;
    
    // In a real implementation, this would integrate with a CDN like Cloudinary or ImageKit
    // For now, return the base path with WebP extension
    const basePath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '');
    let optimizedPath = `${basePath}.${format}`;
    
    // Add query parameters for optimization (would be handled by CDN)
    const params = new URLSearchParams();
    if (width) params.set('w', width.toString());
    if (height) params.set('h', height.toString());
    if (quality !== 80) params.set('q', quality.toString());
    
    const queryString = params.toString();
    return queryString ? `${optimizedPath}?${queryString}` : optimizedPath;
  }

  /**
   * Check if browser supports WebP format
   */
  supportsWebP(): Promise<boolean> {
    return new Promise((resolve) => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }

  /**
   * Get picture element sources for responsive images with WebP fallback
   */
  getPictureSources(imagePath: string, sizes: {
    mobile: number;
    tablet: number;
    desktop: number;
  }): {
    webpSources: string;
    fallbackSources: string;
    defaultSrc: string;
  } {
    const { mobile, tablet, desktop } = sizes;
    
    // WebP sources
    const webpSources = [
      `${this.getOptimizedImageUrl(imagePath, { width: mobile, format: 'webp' })} ${mobile}w`,
      `${this.getOptimizedImageUrl(imagePath, { width: tablet, format: 'webp' })} ${tablet}w`,
      `${this.getOptimizedImageUrl(imagePath, { width: desktop, format: 'webp' })} ${desktop}w`
    ].join(', ');

    // Fallback sources (JPEG)
    const fallbackSources = [
      `${this.getOptimizedImageUrl(imagePath, { width: mobile, format: 'jpg' })} ${mobile}w`,
      `${this.getOptimizedImageUrl(imagePath, { width: tablet, format: 'jpg' })} ${tablet}w`,
      `${this.getOptimizedImageUrl(imagePath, { width: desktop, format: 'jpg' })} ${desktop}w`
    ].join(', ');

    const defaultSrc = this.getOptimizedImageUrl(imagePath, { width: desktop, format: 'jpg' });

    return {
      webpSources,
      fallbackSources,
      defaultSrc
    };
  }

  /**
   * Implement lazy loading with Intersection Observer
   */
  setupLazyLoading(element: HTMLImageElement, src: string): void {
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = src;
            img.classList.remove('blur-up');
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      observer.observe(element);
    } else {
      // Fallback for older browsers
      element.src = src;
      element.classList.add('loaded');
    }
  }

  /**
   * Preload critical images for better performance
   */
  preloadCriticalImages(images: string[]): void {
    images.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }
}