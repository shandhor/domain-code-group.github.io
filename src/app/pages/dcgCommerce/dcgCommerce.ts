import { Component, OnInit } from "@angular/core";
import { SeoService } from "../../services/SeoService";

@Component({
  selector: 'app-dcg-commerce',
  templateUrl: './dcgCommerce.html',
  styleUrls: ['./dcgCommerce.scss']
})
export class DcgCommerce implements OnInit {
  isArabic = true;
  slotsTotal = 50;
  slotsTaken = 38;

  content = {
    ar: {
      hero: {
        badge: 'التجارة الإلكترونية المتطورة',
        title: 'DomainCode Commerce',
        subtitle: 'منصة تجارة إلكترونية سعودية متكاملة مصممة لتنمية أعمالك في السوق الخليجي بأداء عالٍ وتصميم عصري.',
        cta: 'اطلب عرض تجريبي'
      },
      featuresTitle: 'مميزات DomainCode Commerce',
      pricingTitle: 'خطط أسعار مرنة تناسب نمو متجرك',
      whyDcg: 'لماذا DomainCode Commerce؟',
      whyDcgDesc: 'صممنا المنصة خصيصاً للسوق السعودي والخليجي مع دعم كامل للغة العربية، بوابات دفع محلية، وربط مباشر مع شركات الشحن.',
      footer: 'جميع الحقوق محفوظة لـ DomainCode Commerce - 2026'
    },
    en: {
      hero: {
        badge: 'ADVANCED E-COMMERCE',
        title: 'DomainCode Commerce',
        subtitle: 'Integrated Saudi e-commerce platform designed to grow your business in the GCC market with high performance and modern design.',
        cta: 'Request Demo'
      },
      featuresTitle: 'DomainCode Commerce Features',
      pricingTitle: 'Flexible Pricing Plans for Your Store Growth',
      whyDcg: 'Why DomainCode Commerce?',
      whyDcgDesc: 'Purpose-built for the Saudi and GCC market with full Arabic support, local payment gateways, and direct integration with shipping providers.',
      footer: 'All Rights Reserved for DomainCode Commerce - 2026'
    }
  };

  features = [
    {
      ar: 'بوابات دفع محلية',
      en: 'Local Payment Gateways',
      icon: '💳',
      detailsAr: ['دعم مدى وApple Pay وSTC Pay', 'تكامل مع HyperPay وMoyasar', 'دفع آمن وسريع بمعايير PCI DSS'],
      detailsEn: ['Mada, Apple Pay, STC Pay support', 'HyperPay & Moyasar integration', 'PCI DSS secure payments']
    },
    {
      ar: 'إدارة المنتجات والمخزون',
      en: 'Products & Inventory',
      icon: '📦',
      detailsAr: ['كتالوج منتجات لا محدود', 'تتبع المخزون في الوقت الفعلي', 'دعم المتغيرات (لون، مقاس، إلخ)'],
      detailsEn: ['Unlimited product catalog', 'Real-time inventory tracking', 'Product variants support']
    },
    {
      ar: 'الشحن والتوصيل',
      en: 'Shipping & Delivery',
      icon: '🚚',
      detailsAr: ['ربط مع Aramex وSMSA وDHL', 'حساب أسعار الشحن التلقائي', 'تتبع الشحنات المباشر'],
      detailsEn: ['Aramex, SMSA, DHL integration', 'Auto shipping rate calculation', 'Real-time shipment tracking']
    },
    {
      ar: 'التسويق والولاء',
      en: 'Marketing & Loyalty',
      icon: '🎯',
      detailsAr: ['أكواد خصم وكوبونات ذكية', 'برنامج نقاط الولاء', 'تكامل مع مواقع التواصل'],
      detailsEn: ['Smart discount codes', 'Loyalty points program', 'Social media integration']
    },
    {
      ar: 'تحليلات وتقارير',
      en: 'Analytics & Reports',
      icon: '📊',
      detailsAr: ['لوحة تحكم تحليلية شاملة', 'تقارير المبيعات المتقدمة', 'تكامل Google Analytics 4'],
      detailsEn: ['Comprehensive analytics dashboard', 'Advanced sales reports', 'Google Analytics 4 integration']
    },
    {
      ar: 'تحسين محركات البحث SEO',
      en: 'SEO Optimization',
      icon: '🔍',
      detailsAr: ['هيكل URL محسن', 'Schema.org structured data', 'خرائط XML تلقائية'],
      detailsEn: ['Optimized URL structure', 'Schema.org structured data', 'Automatic XML sitemaps']
    }
  ];

  packages = [
    {
      nameAr: 'باقة البداية',
      nameEn: 'Starter',
      price: '3,500',
      old: '5,500',
      popular: false,
      maintenance: '750',
      isContactUs: false,
      fAr: ['حتى 500 منتج', 'بوابات دفع أساسية', 'دعم فني عبر الإيميل', 'تصميم قالب جاهز'],
      fEn: ['Up to 500 products', 'Basic payment gateways', 'Email support', 'Ready-made template']
    },
    {
      nameAr: 'باقة النمو',
      nameEn: 'Growth',
      price: '7,500',
      old: '12,000',
      popular: true,
      maintenance: '1,800',
      isContactUs: false,
      fAr: ['منتجات لا محدودة', 'كل بوابات الدفع', 'دعم فني مباشر', 'تخصيص التصميم', 'تكامل شركات الشحن'],
      fEn: ['Unlimited products', 'All payment gateways', 'Priority support', 'Design customization', 'Shipping integration']
    },
    {
      nameAr: 'باقة الأعمال',
      nameEn: 'Business',
      price: '14,000',
      old: '22,000',
      popular: false,
      maintenance: '3,000',
      isContactUs: false,
      fAr: ['كل مزايا النمو', 'متجر متعدد البائعين', 'تطبيق جوال iOS/Android', 'API متقدم', 'دعم فني 24/7'],
      fEn: ['All Growth features', 'Multi-vendor marketplace', 'iOS/Android mobile app', 'Advanced API', '24/7 support']
    },
    {
      nameAr: 'باقة المؤسسات',
      nameEn: 'Enterprise',
      price: null,
      old: null,
      popular: false,
      maintenance: '5,000',
      isContactUs: true,
      fAr: [
        'كل مزايا الأعمال',
        'استضافة مخصصة',
        'ربط مع DomainCode ERP',
        'حلول B2B متقدمة',
        'مدير حساب مخصص',
        'اتفاقية SLA'
      ],
      fEn: [
        'All Business features',
        'Dedicated hosting',
        'DomainCode ERP integration',
        'Advanced B2B solutions',
        'Dedicated account manager',
        'SLA agreement'
      ]
    }
  ];

  toggleLang() { this.isArabic = !this.isArabic; }

  onBuy(pkg: string) {
    const msg = `مرحباً DomainCode، أود الاستفادة من عرض DomainCode Commerce - باقة: ${pkg}`;
    window.open(`https://wa.me/966561316069?text=${encodeURIComponent(msg)}`, '_blank');
  }

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: 'DomainCode Commerce | منصة التجارة الإلكترونية السعودية المتكاملة',
      description: 'منصة تجارة إلكترونية سعودية متكاملة مع دعم مدى وApple Pay وSTC Pay، ربط مع Aramex وSMSA، وتصميم يدعم اللغة العربية بالكامل. باقات من 3,500 ريال.',
      keywords: 'متجر إلكتروني سعودي، منصة تجارة إلكترونية، بوابات دفع، مدى، STC Pay، Salla، Zid، دروبشيبنغ',
      image: 'https://domaincodegroup.com/assets/images/logo.png'
    });
    this.seo.updateCanonicalUrl('https://domaincodegroup.com/app/dcgCommerce');
    this.seo.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'DomainCode Commerce',
      'operatingSystem': 'Web, iOS, Android',
      'applicationCategory': 'BusinessApplication',
      'description': 'منصة تجارة إلكترونية متكاملة للسوق السعودي والخليجي',
      'publisher': {
        '@type': 'Organization',
        'name': 'Domain Code Group',
        'url': 'https://domaincodegroup.com'
      }
    }, 'page-structured-data');
  }
}
