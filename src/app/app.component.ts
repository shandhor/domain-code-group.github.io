import { Component, computed, signal } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SeoService } from './services/SeoService';
import { DcgCommerce } from './pages/dcgCommerce/dcgCommerce';
import { DcgAI } from './pages/dcgAI/dcgAI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] 
})
export class AppComponent {
  navigateToDcgERP() { 
  }
  showStatic = signal(true);
 lang = signal<'ar' | 'en'>('ar');
  isArabic = computed(() => this.lang() === 'ar');
  isSubmitting = signal(false);
  mobileMenuOpen = signal<boolean>(false);
  formStatus = signal<'idle' | 'sending' | 'success' | 'error'>('idle');
  formName = signal<string>('');
  formEmail = signal<string>('');
  formMessage = signal<string>('');
whyUs = signal([
    { icon: 'fas fa-medal', titleAr: 'جودة عالمية', titleEn: 'Global Quality', descAr: 'نلتزم بأعلى معايير البرمجة والهندسة.', descEn: 'Committed to top engineering standards.' },
    { icon: 'fas fa-users', titleAr: 'فريق خبير', titleEn: 'Expert Team', descAr: 'نخبة من المطورين بخبرات واسعة.', descEn: 'Elite developers with deep expertise.' },
    { icon: 'fas fa-laptop-code', titleAr: 'حلول مخصصة', titleEn: 'Custom Solutions', descAr: 'نصمم الكود ليناسب احتياجاتك بدقة.', descEn: 'Tailored code for your specific needs.' },
    { icon: 'fas fa-headset', titleAr: 'دعم مستمر', titleEn: '24/7 Support', descAr: 'متابعة دورية لضمان استقرار الأنظمة.', descEn: 'Continuous monitoring and support.' }
  ]);
  translations: any = {
    ar: {
      nav: { home: 'الرئيسية', services: 'خبراتنا', erp: 'نظام ERP',dcgCommerce: 'التجارة الإلكترونية', dcgAI: 'الذكاء الاصطناعي', consulting: 'الاستشارات', contact: 'اتصل بنا' },
      hero: {
        badge: 'شريكك الرقمي الموثوق',
        title: 'نحول <span class="gradient-text">الأفكار</span> إلى أكواد <br> وواقع رقمي مبهر',
        subtitle: 'في Domain Code Group، نبتكر حلولاً برمجية مخصصة تبدأ من مجرد فكرة وتنتهي بمنتج رقمي متكامل يغير قواعد اللعبة.',
        cta_main: 'ابدأ مشروعك',
        cta_explore: 'استكشف خبراتنا',
        cta_consult: 'استشارة مجانية',
        cta_erp: 'اكتشف DomainCode ERP PRO',
        cta_commerce: 'اكتشف DCG Commerce',
        cta_ai: 'اكتشف DCG AI'
      },
      services_section: { 
        title: 'خبراتنا', 
        highlight: 'التقنية',
        desc: 'نحن متخصصون في بناء أنظمة رقمية متقدمة مصممة خصيصاً لتلبية احتياجات الأعمال الحديثة.'
      },
      services_list: [
        { title: 'أنظمة ERP', icon: 'fas fa-cogs', description: 'حلول متكاملة لإدارة الموارد المؤسسية بكفاءة عالية وتنظيم سير العمل.' },
        { title: 'منصات الويب', icon: 'fas fa-desktop', description: 'تطوير منصات ويب تفاعلية وسريعة الاستجابة تقدم أفضل تجربة للمستخدم.' },
        { title: 'الذكاء الاصطناعي', icon: 'fas fa-brain', description: 'دمج تقنيات تعلم الآلة والذكاء الاصطناعي لتحليل البيانات وأتمتة القرارات.' },
        { title: 'إدارة المستندات (DMS)', icon: 'fas fa-file-invoice', description: 'أنظمة ذكية لتنظيم وحفظ وأرشفة الملفات الرقمية بأمان تام.' },
        { title: 'منصات مخصصة', icon: 'fas fa-project-diagram', description: 'بناء أنظمة ومنصات برمجية مصممة خصيصاً وفقاً لمتطلبات عملك الفريدة.' },
        { title: 'التجارة الإلكترونية', icon: 'fas fa-shopping-cart', description: 'تطوير متاجر ومنصات بيع إلكترونية قوية تدعم النمو والانتشار.' }
      ],
       erp: {
        badge: 'هندسة برمجية متطورة',
        title: 'نظام الإدارة الشامل',
        brand: 'DomainCode ERP',
        desc: 'نظام DomainCode ERP PRO هو بيئة عمل رقمية صُممت لتمثل العمود الفقري لمؤسستك، بتكامل تام يجمع بين الأداء العالي والمرونة البرمجية الفائقة لمواكبة تطلعاتك.',
        pills: ['دقة بيانات 100%', 'تخصيص برمجي بالكامل'],
        note: 'تكنولوجيا سحابية مشفرة ومطورة بالكامل داخل معامل Domain Code Group.',
        features: [
          { title: 'محرك الأتمتة الذكي', iconClass: 'fas fa-microchip', desc: 'أتمتة المهام المتكررة لتقليل الأخطاء البشرية وزيادة سرعة التنفيذ.' },
          { title: 'التحليلات التنبؤية (BI)', iconClass: 'fas fa-chart-line', desc: 'لوحات تحكم ذكية توضح مسار عملك وتدعم اتخاذ القرارات الاستراتيجية.' },
          { title: 'تكامل API لا محدود', iconClass: 'fas fa-plug', desc: 'بنية تحتية مرنة تسمح بالربط مع مختلف المنصات والخدمات الخارجية.' }
        ]
      },
      consulting_section: {
        badge: 'توجيه استراتيجي',
        title: 'نقدم حلولاً',
        highlight: 'استشارية تقنية',
        desc: 'لا نكتفي بالبناء فقط، بل نوجهك نحو التقنيات الأمثل التي تناسب ميزانيتك وطموحاتك السوقية، لنضمن لك عائداً استثمارياً حقيقياً.',
        points: [
          'دراسة الجدوى التقنية للمشاريع',
          'تحليل وتطوير البنية التحتية الرقمية',
          'استشارات التحول الرقمي الشامل',
          'تقييم أمان واستقرار الأنظمة'  
        ],
        cta: 'احجز جلسة استشارية الآن'
      },
      stats: [
        { value: '+150', label: 'مشروع منجز' },
        { value: '+99', label: 'عملاء سعداء' },
        { value: '24/7', label: 'دعم فني' },
        { value: '100%', label: 'أداء عالي' }
      ],
      contact_section: {
        title: 'تواصل', highlight: 'مباشرة',
        desc: 'نحن هنا للإجابة على استفساراتك ومناقشة مشروعك القادم.',
        email_label: 'البريد الإلكتروني',
        phone_label: 'الجوال',
        linkedin_label: 'لينكد إن',
        locations_label: 'مواقعنا',
        locations_list: ['• الرياض - السعودية', '• عمان - الأردن', '• الدوحة - قطر', '• عدن - اليمن']
      },
      form: {
        name: 'الاسم',
        email: 'البريد',
        message: 'التفاصيل',
        submit: 'إرسال',
        sending: 'جاري الإرسال...',
        success: '✅ تم استلام رسالتك بنجاح! سنتواصل معك قريباً',
        error: '❌ حدث خطأ في الإرسال. الرجاء المحاولة مرة أخرى أو التواصل عبر الواتساب',
        namePlaceholder: 'اكتب اسمك الكامل',
        emailPlaceholder: 'example@email.com',
        messagePlaceholder: 'اشرح لنا مشروعك أو استفسارك...'
      },
      footer: { copy: '© 2026 جميع الحقوق محفوظة لشركة Domain Code Group' }
    },
    en: {
      nav: { home: 'Home', services: 'Expertise',  erp: 'ERP System', dcgCommerce: 'DCG Commerce', dcgAI: 'DCG AI', consulting: 'Consulting', contact: 'Contact' },
      hero: {
        badge: 'Your Trusted Digital Partner',
        title: 'Turning <span class="gradient-text">Ideas</span> into Code <br> and Stunning Digital Reality',
        subtitle: 'At Domain Code Group, we create custom software solutions that help organizations operate efficiently and grow confidently.',
        cta_main: 'Start Your Project',
        cta_explore: 'Our Expertise',
        cta_erp: 'Discover DomainCode ERP PRO',
        cta_commerce: 'Discover DCG Commerce',
        cta_ai: 'Discover DCG AI',
        cta_consult: 'Free Consultation'        
      },
      services_section: { 
        title: 'Our Technical', 
        highlight: 'Expertise',
        desc: 'At DomainCode Group, we specialize in building advanced digital systems tailored to modern business needs.'
      },
      services_list: [
        { title: 'ERP Systems', icon: 'fas fa-cogs', description: 'Integrated resource management solutions to streamline workflows and boost efficiency.' },
        { title: 'Web Platforms', icon: 'fas fa-desktop', description: 'Developing high-performance, interactive web platforms for a seamless user experience.' },
        { title: 'AI & Machine Learning', icon: 'fas fa-brain', description: 'Integrating AI and ML models for data analysis and intelligent decision-making.' },
        { title: 'DMS Systems', icon: 'fas fa-file-invoice', description: 'Smart document management systems to organize, store, and archive digital assets securely.' },
        { title: 'Custom Platforms', icon: 'fas fa-project-diagram', description: 'Building bespoke software architectures and platforms tailored to your unique needs.' },
        { title: 'E-Commerce Solutions', icon: 'fas fa-shopping-cart', description: 'Developing powerful e-commerce stores designed for scalability and high performance.' }
      ],
      erp: {
        badge: 'Advanced Software Engineering',
        title: 'Enterprise Management',
        brand: 'DomainCode ERP PRO',
        desc: 'DomainCode ERP PRO is a digital work environment designed to be the backbone of your organization, combining high performance with superior flexibility.',
        pills: ['100% Accuracy', 'Full Customization'],
        note: 'Encrypted cloud technology developed entirely within Domain Code Group labs.',
        features: [
          { title: 'Smart Automation Engine', iconClass: 'fas fa-microchip', desc: 'Automating repetitive tasks to reduce human error and increase speed.' },
          { title: 'Predictive Analytics (BI)', iconClass: 'fas fa-chart-line', desc: 'Intelligent dashboards to support strategic decision making.' },
          { title: 'Unlimited API Integration', iconClass: 'fas fa-plug', desc: 'Flexible infrastructure to connect with various external platforms.' }
        ]
      },
      consulting_section: {
        badge: 'Strategic Guidance',
        title: 'We provide',
        highlight: 'Technical Consulting',
        desc: 'We don\'t just build; we guide you towards the optimal technologies that fit your budget and market ambitions, ensuring a real return on investment.',
        points: [
          'Technical feasibility studies',
          'Infrastructure analysis & development',
          'Comprehensive digital transformation',
          'System security & stability auditing'
        ],
        cta: 'Book a consultation session'
      },
      stats: [
        { value: '+150', label: 'Projects Done' },
        { value: '+99', label: 'Happy Clients' },
        { value: '24/7', label: 'Support' },
        { value: '100%', label: 'Performance' }  
      ],
      contact_section: {
        title: 'Get in', highlight: 'Touch',
        desc: 'We are here to answer your questions and discuss your next project.',
        email_label: 'Email',
        phone_label: 'Mobile',
        linkedin_label: 'LinkedIn',
        locations_label: 'Our Locations',
        locations_list: ['• Riyadh - KSA', '• Amman - Jordan', '• Doha - Qatar', '• Aden - Yemen']
      },
      form: {
        name: 'Name',
        email: 'Email',
        message: 'Details',
        submit: 'Submit',
        sending: 'Sending...',
        success: '✅ Your message has been received! We\'ll contact you soon',
        error: '❌ Sending failed. Please try again or contact us via WhatsApp',
        namePlaceholder: 'Enter your full name',
        emailPlaceholder: 'example@email.com',
        messagePlaceholder: 'Tell us about your project or inquiry...'
      },
      footer: { copy: '© 2026 All rights reserved to Domain Code Group' }
    }
  };

  t = computed(() => this.translations[this.lang()]);

  constructor(private router: Router,
    private seo: SeoService
  ) {
    this.router.events.subscribe((evt) => {
      if (evt instanceof NavigationEnd) {
        // Only the root path shows the static homepage; every other
        // route (e.g. /app/dcgERP, /faq) is a standalone routed page.
        const url = evt.urlAfterRedirects || '';
        const path = url.split('?')[0].split('#')[0];
        this.showStatic.set(path === '/' || path === '');
        this.closeMobileMenu();
      }
    });
  }

  toggleLanguage() {
    this.lang.set(this.lang() === 'ar' ? 'en' : 'ar');
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.set(!this.mobileMenuOpen());
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.mobileMenuOpen() ? 'hidden' : '';
    }
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  scrollTo(id: string) {
    if (typeof document !== 'undefined') {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }
    this.closeMobileMenu();
  }

  async handleSubmit(event: Event): Promise<void> {
    event.preventDefault();

    if (!this.formName().trim() || !this.formEmail().trim() || !this.formMessage().trim()) {
      return;
    }

    this.formStatus.set('sending');
    this.isSubmitting.set(true);

    const formData = {
      access_key: 'dfd0d838-bd49-4f56-b630-456c979ededb',
      name: this.formName(),
      email: this.formEmail(),
      message: this.formMessage(),
      subject: `رسالة جديدة من موقع Domain Code Group - ${this.formName()}`,
      from_name: 'Domain Code Group Website',
      botcheck: ''
    };

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        this.formStatus.set('success');
        this.formName.set('');
        this.formEmail.set('');
        this.formMessage.set('');

        setTimeout(() => {
          this.formStatus.set('idle');
        }, 6000);
      } else {
        console.error('Web3Forms error:', result);
        this.formStatus.set('error');

        setTimeout(() => {
          this.formStatus.set('idle');
        }, 8000);
      }
    } catch (error) {
      console.error('Submission error:', error);
      this.formStatus.set('error');

      setTimeout(() => {
        this.formStatus.set('idle');
      }, 8000);
    } finally {
      this.isSubmitting.set(false);
    }
  }
  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: 'مجموعة دومين كود (DG) | حلول البرمجيات والتحول الرقمي',
      description: 'نقدم حلولاً تقنية متكاملة من تطوير المواقع إلى أنظمة ERP المتطورة. شريككم في النجاح الرقمي بالمملكة العربية السعودية.',
      keywords: 'مجموعة كود النطاق، تطوير برمجيات، تصميم مواقع، تحول رقمي السعودية، DG',
      image: 'https://domaincodegroup.com/assets/images/logo.png'
    });
    this.seo.updateCanonicalUrl('https://domaincodegroup.com/');
    this.seo.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      'name': 'Domain Code Group',
      'url': 'https://domaincodegroup.com',
      'inLanguage': 'ar'
    }, 'page-structured-data');
  }
}
