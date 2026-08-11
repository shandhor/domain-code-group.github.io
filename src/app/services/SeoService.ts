import { Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(private titleService: Title, private metaService: Meta) { }

  updateMetaTags(config: { title: string, description: string, keywords: string, image?: string }) {
    // تحديث عنوان الصفحة
    this.titleService.setTitle(config.title);

    // تحديث الوسوم الأساسية (Description & Keywords)
    this.metaService.updateTag({ name: 'description', content: config.description });
    this.metaService.updateTag({ name: 'keywords', content: config.keywords });

    // وسوم التواصل الاجتماعي (Open Graph - Facebook/LinkedIn)
    this.metaService.updateTag({ property: 'og:title', content: config.title });
    this.metaService.updateTag({ property: 'og:description', content: config.description });
    this.metaService.updateTag({ property: 'og:type', content: 'website' });
    if (config.image) {
      this.metaService.updateTag({ property: 'og:image', content: config.image });
    }

    // وسوم تويتر (Twitter Cards)
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: config.title });
    this.metaService.updateTag({ name: 'twitter:description', content: config.description });
  }
}