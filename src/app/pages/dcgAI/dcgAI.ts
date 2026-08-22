import { Component, OnInit } from "@angular/core";
import { SeoService } from "../../services/SeoService";

@Component({
  selector: 'app-dcg-ai',
  templateUrl: './dcgAI.html',
  styleUrls: ['./dcgAI.scss']
})
export class DcgAI implements OnInit {
  isArabic = true;
  slotsTotal = 30;
  slotsTaken = 22;

  content = {
    ar: {
      hero: {
        badge: 'الذكاء الاصطناعي بالعربية',
        title: 'DomainCode AI',
        subtitle: 'حلول ذكاء اصطناعي متقدمة مصممة للغة العربية، تحول بياناتك إلى قرارات ذكية وعمليات مؤتمتة.',
        cta: 'اطلب استشارة AI'
      },
      featuresTitle: 'قدرات DomainCode AI',
      pricingTitle: 'حلول مخصصة حسب احتياجك',
      whyDcg: 'لماذا DomainCode AI؟',
      whyDcgDesc: 'نبني حلول ذكاء اصطناعي تفهم اللغة العربية بلهجاتها المختلفة، وتتكامل مع أنظمتك الحالية، وتحترم خصوصية بياناتك.',
      footer: 'جميع الحقوق محفوظة لـ DomainCode AI - 2026'
    },
    en: {
      hero: {
        badge: 'ARABIC-FIRST AI',
        title: 'DomainCode AI',
        subtitle: 'Advanced AI solutions built for Arabic language, transforming your data into smart decisions and automated operations.',
        cta: 'Request AI Consultation'
      },
      featuresTitle: 'DomainCode AI Capabilities',
      pricingTitle: 'Custom Solutions Tailored to Your Needs',
      whyDcg: 'Why DomainCode AI?',
      whyDcgDesc: 'We build AI solutions that understand Arabic in its various dialects, integrate with your existing systems, and respect your data privacy.',
      footer: 'All Rights Reserved for DomainCode AI - 2026'
    }
  };

  features = [
    {
      ar: 'نماذج لغوية بالعربية',
      en: 'Arabic Language Models',
      icon: '🧠',
      detailsAr: ['فهم اللهجات العربية المتعددة', 'معالجة النصوص القانونية والطبية', 'دقة عالية في اللغة الفصحى'],
      detailsEn: ['Multi-dialect Arabic understanding', 'Legal and medical text processing', 'High accuracy in MSA']
    },
    {
      ar: 'أنظمة RAG المتقدمة',
      en: 'Advanced RAG Systems',
      icon: '📚',
      detailsAr: ['البحث الدلالي في مستنداتك', 'إجابات دقيقة من مصادرك الخاصة', 'دعم PDF وWord وExcel'],
      detailsEn: ['Semantic search in your docs', 'Accurate answers from your sources', 'PDF, Word, Excel support']
    },
    {
      ar: 'المساعدات الذكية (Chatbots)',
      en: 'Smart Chatbots',
      icon: '💬',
      detailsAr: ['مساعد ذكي لخدمة العملاء', 'تكامل مع واتساب وتليجرام', 'ردود آلية باللغة العربية'],
      detailsEn: ['Smart customer service assistant', 'WhatsApp and Telegram integration', 'Automated Arabic responses']
    },
    {
      ar: 'تحليل المستندات',
      en: 'Document Intelligence',
      icon: '📄',
      detailsAr: ['استخراج البيانات من الفواتير', 'قراءة الهوية والوثائق الرسمية', 'أتمتة إدخال البيانات'],
      detailsEn: ['Invoice data extraction', 'ID and official docs reading', 'Data entry automation']
    },
    {
      ar: 'التحليلات التنبؤية',
      en: 'Predictive Analytics',
      icon: '📈',
      detailsAr: ['توقع سلوك العملاء', 'تنبؤ بحجم المبيعات', 'كشف الأنماط الشاذة'],
      detailsEn: ['Customer behavior prediction', 'Sales volume forecasting', 'Anomaly detection']
    },
    {
      ar: 'الرؤية الحاسوبية',
      en: 'Computer Vision',
      icon: '👁️',
      detailsAr: ['تحليل الصور والفيديو', 'التعرف على الوجوه والأشياء', 'مراقبة الجودة في التصنيع'],
      detailsEn: ['Image and video analysis', 'Face and object recognition', 'Manufacturing quality control']
    }
  ];

  packages = [
    {
      nameAr: 'باقة الاستكشاف',
      nameEn: 'Exploration',
      price: '5,000',
      old: '8,000',
      popular: false,
      maintenance: '1,000',
      isContactUs: false,
      fAr: ['استشارة AI أولية', 'دراسة جدوى تقنية', 'نموذج تجريبي (POC)', 'تقرير توصيات مفصل'],
      fEn: ['Initial AI consultation', 'Technical feasibility study', 'Proof of Concept (POC)', 'Detailed recommendations report']
    },
    {
      nameAr: 'باقة التطبيق',
      nameEn: 'Implementation',
      price: '15,000',
      old: '25,000',
      popular: true,
      maintenance: '3,500',
      isContactUs: false,
      fAr: ['كل مزايا الاستكشاف', 'تطوير حل AI مخصص', 'تكامل مع نظامك الحالي', 'تدريب الفريق', 'دعم فني 3 أشهر'],
      fEn: ['All Exploration features', 'Custom AI solution development', 'Integration with existing systems', 'Team training', '3-month support']
    },
    {
      nameAr: 'باقة الإنتاج',
      nameEn: 'Production',
      price: '35,000',
      old: '55,000',
      popular: false,
      maintenance: '8,000',
      isContactUs: false,
      fAr: ['كل مزايا التطبيق', 'استضافة سحابية آمنة', 'مراقبة الأداء 24/7', 'تحديثات النموذج الدورية', 'دعم فني سنة كاملة'],
      fEn: ['All Implementation features', 'Secure cloud hosting', '24/7 performance monitoring', 'Regular model updates', 'Full year support']
    },
    {
      nameAr: 'الباقة المؤسسية',
      nameEn: 'Enterprise AI',
      price: null,
      old: null,
      popular: false,
      maintenance: '15,000',
      isContactUs: true,
      fAr: [
        'كل مزايا الإنتاج',
        'نموذج LLM مخصص',
        'استضافة محلية (On-premise)',
        'ربط مع DomainCode ERP وCommerce',
        'فريق AI مخصص',
        'اتفاقية SLA متقدمة',
        'أمان معلوماتي متقدم'
      ],
      fEn: [
        'All Production features',
        'Custom LLM model',
        'On-premise hosting',
        'Integration with DomainCode ERP & Commerce',
        'Dedicated AI team',
        'Advanced SLA',
        'Advanced information security'
      ]
    }
  ];

  toggleLang() { this.isArabic = !this.isArabic; }

  onBuy(pkg: string) {
    const msg = `مرحباً DomainCode، أود الاستفادة من عرض DomainCode AI - باقة: ${pkg}`;
    window.open(`https://wa.me/966561316069?text=${encodeURIComponent(msg)}`, '_blank');
  }

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: 'DomainCode AI | حلول الذكاء الاصطناعي بالعربية للمؤسسات السعودية',
      description: 'حلول ذكاء اصطناعي متقدمة تدعم اللغة العربية: نماذج LLM، أنظمة RAG، chatbots ذكية، تحليل مستندات، وتحليلات تنبؤية. مصمم للمؤسسات السعودية والخليجية.',
      keywords: 'ذكاء اصطناعي عربي، LLM بالعربية، RAG، chatbot عربي، معالجة اللغة العربية، AI السعودية',
      image: 'https://domaincodegroup.com/assets/images/logo.png'
    });
    this.seo.updateCanonicalUrl('https://domaincodegroup.com/app/dcgAI');
    this.seo.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'DomainCode AI',
      'operatingSystem': 'Web, Cloud, On-premise',
      'applicationCategory': 'BusinessApplication',
      'description': 'حلول الذكاء الاصطناعي المصممة للغة العربية والسوق السعودي',
      'publisher': {
        '@type': 'Organization',
        'name': 'Domain Code Group',
        'url': 'https://domaincodegroup.com'
      }
    }, 'page-structured-data');
  }
}
