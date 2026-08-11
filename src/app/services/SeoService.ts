import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

export interface MetaTagsConfig {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private titleService: Title,
    private metaService: Meta,
    @Inject(DOCUMENT) private document: Document
  ) { }

  updateTitle(title: string): void {
    this.titleService.setTitle(title);
  }

  updateMetaTags(config: MetaTagsConfig): void {
    if (config.title) {
      this.titleService.setTitle(config.title);
    }
    if (config.description) {
      this.metaService.updateTag({ name: 'description', content: config.description });
    }
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }

    const ogTitle = config.ogTitle ?? config.title;
    const ogDescription = config.ogDescription ?? config.description;
    const ogImage = config.ogImage ?? config.image;
    const ogType = config.ogType ?? 'website';

    if (ogTitle) {
      this.metaService.updateTag({ property: 'og:title', content: ogTitle });
      this.metaService.updateTag({ name: 'twitter:title', content: ogTitle });
    }
    if (ogDescription) {
      this.metaService.updateTag({ property: 'og:description', content: ogDescription });
      this.metaService.updateTag({ name: 'twitter:description', content: ogDescription });
    }
    if (ogImage) {
      this.metaService.updateTag({ property: 'og:image', content: ogImage });
    }
    this.metaService.updateTag({ property: 'og:type', content: ogType });
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
  }

  updateCanonicalUrl(url: string): void {
    const head = this.document.head;
    let link: HTMLLinkElement | null = head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      head.appendChild(link);
    }
    link.setAttribute('href', url);
    this.metaService.updateTag({ property: 'og:url', content: url });
  }

  addStructuredData(schema: object, id: string = 'app-structured-data'): void {
    const head = this.document.head;
    let script: HTMLScriptElement | null = head.querySelector(`script[type="application/ld+json"]#${id}`);
    if (!script) {
      script = this.document.createElement('script');
      script.setAttribute('type', 'application/ld+json');
      script.setAttribute('id', id);
      head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);
  }
}
