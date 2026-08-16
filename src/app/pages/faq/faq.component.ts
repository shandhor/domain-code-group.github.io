import { Component, OnInit, computed, signal } from '@angular/core';
import { SeoService } from '../../services/SeoService';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  lang = signal<'ar' | 'en'>('ar');
  isArabic = computed(() => this.lang() === 'ar');
  openIndex = signal<number>(-1);

  translations: any = {
    ar: {
      badge: 'مركز المساعدة',
      title: 'الأسئلة',
      highlight: 'الشائعة',
      subtitle: 'إجابات على أكثر الأسئلة تكراراً حول Domain Code Group وخدماتنا',
      ctaTitle: 'لم تجد إجابة لسؤالك؟',
      ctaDesc: 'تواصل معنا مباشرة عبر الواتساب وسنرد عليك خلال ساعات',
      ctaButton: 'تواصل معنا الآن'
    },
    en: {
      badge: 'Help Center',
      title: 'Frequently',
      highlight: 'Asked Questions',
      subtitle: 'Answers to the most common questions about Domain Code Group and our services',
      ctaTitle: "Didn't find your answer?",
      ctaDesc: "Contact us directly via WhatsApp and we'll respond within hours",
      ctaButton: 'Contact Us Now'
    }
  };

  t = computed(() => this.translations[this.lang()]);

  faqs = [
    {
      questionAr: 'ما هي خدمات Domain Code Group؟',
      questionEn: 'What services does Domain Code Group offer?',
      answerAr: 'نقدم في Domain Code Group مجموعة متكاملة من الخدمات تشمل: تطوير أنظمة ERP، بناء منصات الويب التفاعلية، حلول الذكاء الاصطناعي، أنظمة إدارة المستندات (DMS)، منصات مخصصة حسب الطلب، وحلول التجارة الإلكترونية. نخدم عملاء في السعودية ودول الخليج والأردن واليمن.',
      answerEn: 'Domain Code Group offers a comprehensive suite of services including: ERP systems development, interactive web platforms, AI solutions, Document Management Systems (DMS), custom platforms, and e-commerce solutions. We serve clients in Saudi Arabia, GCC countries, Jordan, and Yemen.'
    },
    {
      questionAr: 'ما الفرق بين DomainCode ERP وأنظمة ERP الأخرى؟',
      questionEn: 'What makes DomainCode ERP different from other ERP systems?',
      answerAr: 'يتميز DomainCode ERP بعدة نقاط: أولاً، نموذج التمليك لمرة واحدة بدون اشتراك شهري. ثانياً، دعم كامل للغة العربية (RTL). ثالثاً، توافق كامل مع الفوترة الإلكترونية السعودية (ZATCA). رابعاً، إمكانية التخصيص الكامل حسب احتياجاتك. خامساً، ربط مباشر مع منصات التجارة الإلكترونية مثل سلة وزد.',
      answerEn: 'DomainCode ERP stands out through: one-time purchase model (no monthly subscription), full Arabic support with RTL, complete ZATCA e-invoicing compliance, full customization capability, and direct integration with e-commerce platforms like Salla and Zid.'
    },
    {
      questionAr: 'ما هي أسعار باقات DomainCode ERP؟',
      questionEn: 'What are the pricing plans for DomainCode ERP?',
      answerAr: 'نقدم أربع باقات رئيسية: باقة التجارة بـ 2,500 ريال (صيانة 500 ريال سنوياً)، باقة الأعمال بـ 5,000 ريال (صيانة 1,500 ريال سنوياً)، باقة الأعمال Pro بـ 8,500 ريال (صيانة 2,500 ريال سنوياً)، والباقة الاحترافية بأسعار مخصصة تشمل التصنيع والمشاريع والتجارة الإلكترونية.',
      answerEn: 'We offer four main packages: Trade Pack at 2,500 SAR (500 SAR yearly maintenance), Business Basic at 5,000 SAR (1,500 SAR maintenance), Business Pro at 8,500 SAR (2,500 SAR maintenance), and Ultimate Pack at custom pricing including manufacturing, projects, and e-commerce.'
    },
    {
      questionAr: 'هل نظام DomainCode ERP متوافق مع الفوترة الإلكترونية (ZATCA)؟',
      questionEn: 'Is DomainCode ERP compliant with ZATCA e-invoicing?',
      answerAr: 'نعم، DomainCode ERP متوافق بالكامل مع متطلبات الفوترة الإلكترونية لهيئة الزكاة والضريبة والجمارك السعودية (ZATCA)، ويشمل ذلك ربط الفواتير الإلكترونية بمنصة فاتورة والتوقيع الرقمي المطلوب.',
      answerEn: 'Yes, DomainCode ERP is fully compliant with the Saudi Zakat, Tax and Customs Authority (ZATCA) e-invoicing requirements, including Fatoora platform integration and required digital signatures.'
    },
    {
      questionAr: 'أين تقع مقرات Domain Code Group؟',
      questionEn: 'Where are Domain Code Group offices located?',
      answerAr: 'مقرنا الرئيسي في مدينة الرياض بالمملكة العربية السعودية، ولدينا حضور في عدة دول: عمّان (الأردن)، الدوحة (قطر)، وعدن (اليمن). نخدم عملاء في جميع أنحاء السعودية ودول مجلس التعاون الخليجي.',
      answerEn: 'Our headquarters is in Riyadh, Saudi Arabia, with presence in multiple countries: Amman (Jordan), Doha (Qatar), and Aden (Yemen). We serve clients across Saudi Arabia and GCC countries.'
    },
    {
      questionAr: 'ما هي المدة المتوقعة لتطبيق نظام DomainCode ERP؟',
      questionEn: 'How long does DomainCode ERP implementation take?',
      answerAr: 'تختلف المدة حسب حجم المؤسسة والباقة المختارة. عادةً تستغرق باقة التجارة من 3-7 أيام، باقة الأعمال من 1-2 أسبوع، باقة الأعمال Pro من 2-4 أسابيع، والباقة الاحترافية حسب متطلبات المشروع (عادة 1-3 أشهر).',
      answerEn: 'Duration varies based on organization size and package selected. Trade Pack typically takes 3-7 days, Business Basic 1-2 weeks, Business Pro 2-4 weeks, and Ultimate Pack based on project requirements (usually 1-3 months).'
    },
    {
      questionAr: 'هل تقدمون تدريباً ودعماً بعد التطبيق؟',
      questionEn: 'Do you provide training and support after implementation?',
      answerAr: 'نعم، جميع باقاتنا تشمل الصيانة والدعم الفني السنوي. نقدم أيضاً برامج تدريب مخصصة لفريق العميل لضمان الاستخدام الأمثل للنظام. الدعم الفني متاح 24/7 لعملاء الباقات المتقدمة.',
      answerEn: 'Yes, all our packages include annual maintenance and technical support. We also offer customized training programs for client teams to ensure optimal system usage. 24/7 technical support is available for advanced package clients.'
    },
    {
      questionAr: 'هل يمكن ربط DomainCode ERP مع المتاجر الإلكترونية؟',
      questionEn: 'Can DomainCode ERP integrate with e-commerce platforms?',
      answerAr: 'نعم، الباقة الاحترافية تدعم الربط المباشر مع منصات التجارة الإلكترونية الرئيسية مثل سلة (Salla) وزد (Zid) وغيرها. يتم مزامنة الطلبات والمخزون والعملاء بشكل تلقائي بين النظام والمتجر.',
      answerEn: 'Yes, the Ultimate Pack supports direct integration with major e-commerce platforms like Salla, Zid, and others. Orders, inventory, and customers are automatically synced between the ERP system and your online store.'
    },
    {
      questionAr: 'ما هي الوحدات المتوفرة في نظام DomainCode ERP؟',
      questionEn: 'What modules are available in DomainCode ERP?',
      answerAr: 'يشمل النظام وحدات متكاملة: المحاسبة والأصول، المشتريات والمخازن، المبيعات وعلاقات الزبائن (CRM)، التصنيع والجودة، إدارة المشاريع والدعم، والموقع الإلكتروني والتجارة الإلكترونية. تتوفر الوحدات حسب الباقة المختارة.',
      answerEn: 'The system includes integrated modules: Accounting & Assets, Buying & Stock, Sales & CRM, Manufacturing & Quality, Projects & Support, Website & E-commerce. Modules availability depends on your selected package.'
    },
    {
      questionAr: 'هل تقدمون خدمات استشارية للتحول الرقمي؟',
      questionEn: 'Do you offer digital transformation consulting?',
      answerAr: 'نعم، نقدم خدمات استشارية شاملة تشمل: دراسة الجدوى التقنية للمشاريع، تحليل وتطوير البنية التحتية الرقمية، استشارات التحول الرقمي الشامل، وتقييم أمان واستقرار الأنظمة. نساعدك في اختيار الحلول التقنية المناسبة لميزانيتك.',
      answerEn: 'Yes, we provide comprehensive consulting services including: technical feasibility studies, infrastructure analysis and development, digital transformation consulting, and system security and stability auditing. We help you choose the right technical solutions for your budget.'
    },
    {
      questionAr: 'ما التقنيات المستخدمة في تطوير حلولكم؟',
      questionEn: 'What technologies do you use in your solutions?',
      answerAr: 'نستخدم أحدث التقنيات: C#, ASP.NET Core, ABP Framework, Angular، SQL Server. لحلول الذكاء الاصطناعي نستخدم Ollama وONNX. لدينا خبرة عميقة في التخصيص والتكامل مع الأنظمة القائمة.',
      answerEn: 'We use modern technologies: C#, ASP.NET Core, ABP Framework, Angular, SQL Server. For AI solutions we use Ollama and ONNX. We have deep expertise in customization and integration with existing systems.'
    },
    {
      questionAr: 'كيف يمكنني التواصل مع Domain Code Group؟',
      questionEn: 'How can I contact Domain Code Group?',
      answerAr: 'يمكنك التواصل معنا مباشرة عبر الواتساب على الرقم +966 56 131 6069، أو زيارة موقعنا الإلكتروني domaincodegroup.com والتواصل عبر نموذج التواصل. نرد على جميع الاستفسارات باللغتين العربية والإنجليزية خلال ساعات العمل.',
      answerEn: 'You can contact us directly via WhatsApp at +966 56 131 6069, or visit our website domaincodegroup.com and use the contact form. We respond to all inquiries in Arabic and English during business hours.'
    }
  ];

  constructor(private seo: SeoService) {}

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: 'الأسئلة الشائعة | Domain Code Group - إجابات حول DomainCode ERP والخدمات',
      description: 'إجابات على أكثر الأسئلة تكراراً حول Domain Code Group، أسعار DomainCode ERP، الفوترة الإلكترونية ZATCA، التطبيق والدعم الفني، والتكامل مع المتاجر الإلكترونية.',
      keywords: 'أسئلة شائعة، DomainCode ERP، أسعار نظام محاسبة، ZATCA، سلة، زد، دعم فني',
      image: 'https://domaincodegroup.com/assets/images/logo.png'
    });

    this.seo.updateCanonicalUrl('https://domaincodegroup.com/faq');

    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      'mainEntity': this.faqs.map(faq => ({
        '@type': 'Question',
        'name': faq.questionAr,
        'acceptedAnswer': {
          '@type': 'Answer',
          'text': faq.answerAr
        }
      }))
    };

    this.seo.addStructuredData(faqSchema, 'faq-structured-data');
  }

  toggleFaq(index: number): void {
    this.openIndex.set(this.openIndex() === index ? -1 : index);
  }

  toggleLang(): void {
    this.lang.set(this.lang() === 'ar' ? 'en' : 'ar');
  }
}
