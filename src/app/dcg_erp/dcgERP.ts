import { Component, OnInit } from "@angular/core";
import { SeoService } from "../services/SeoService";

@Component({
  selector: 'app-dcg-erp',
  templateUrl: './dcgERP.html',
  styleUrls: ['./dcgERP.scss']
})  
export class DcgERP implements OnInit {
  isArabic = true; // التحكم في اللغة
  slotsTotal = 50;
  slotsTaken = 42;

  content = {
    ar: {
      hero: { badge: 'مستقبل الإدارة الذكية', title: 'نظام دومين كود الإداري', subtitle: 'حلول ERP المتطورة لإدارة منشأتك من شاشة واحدة بدقة متناهية.', cta: 'استكشف العروض' },
      featuresTitle: 'مميزات نظام DomainCode',
      pricingTitle: 'امتلك نظامك للأبد بسعر الإطلاق',
      whyDcg: 'لماذا نقدم هذه الأسعار؟',
      whyDcgDesc: 'نحن في مجموعة دومين كود نهدف لدعم التحول الرقمي للمنشآت السعودية وفق رؤية 2030.',
      footer: 'جميع الحقوق محفوظة لنظام DomainCode - 2026'
    },
    en: {
      hero: { badge: 'FUTURE OF SMART MANAGEMENT', title: 'DomainCode ERP SYSTEM', subtitle: 'Advanced ERP solutions to manage your enterprise from a single screen with high precision.', cta: 'Explore Offers' },
      featuresTitle: 'DomainCode Core Features',
      pricingTitle: 'Own Your System Forever - Launch Price',
      whyDcg: 'Why these prices?',
      whyDcgDesc: 'At Range Code Group, we aim to support the digital transformation of Saudi enterprises in line with Vision 2030.',
      footer: 'All Rights Reserved for DomainCode System - 2026'
    }
  };

  features = [
    { 
      ar: 'المحاسبة والأصول', 
      en: 'Accounting & Assets', 
      icon: '💰', 
      detailsAr: ['إدارة الحسابات العامة', 'إدارة الأصول الثابتة', 'التقارير المالية والضرائب'], 
      detailsEn: ['General Ledger', 'Fixed Asset Management', 'Financial Reporting & Tax'] 
    },
    { 
      ar: 'المشتريات والمخازن', 
      en: 'Buying & Stock', 
      icon: '📦', 
      detailsAr: ['دورة المشتريات المكتملة', 'إدارة المستودعات والجرد', 'تتبع المخزون والباركود'], 
      detailsEn: ['Full Procurement Cycle', 'Warehouse & Inventory mgmt', 'Stock Tracking & Barcode'] 
    },
    { 
      ar: 'المبيعات وعلاقات الزبائن (CRM)', 
      en: 'Sales & CRM', 
      icon: '🤝', 
      detailsAr: ['إدارة العملاء والفرص', 'عروض الأسعار والمبيعات', 'تحليلات أداء المبيعات'], 
      detailsEn: ['Customer & Lead Mgmt', 'Quotations & Sales Orders', 'Sales Performance Analytics'] 
    },
    { 
      ar: 'التصنيع والجودة', 
      en: 'Manufacturing & Quality', 
      icon: '⚙️', 
      detailsAr: ['تخطيط الإنتاج و BOM', 'أوامر الشغل ومحطات العمل', 'فحص الجودة والمعايير'], 
      detailsEn: ['Production Planning & BOM', 'Work Orders & Stations', 'Quality Inspections'] 
    },
    { 
      ar: 'إدارة المشاريع والدعم', 
      en: 'Projects & Support', 
      icon: '🏗️', 
      detailsAr: ['تتبع المهام والمشاريع', 'نظام التذاكر والدعم الفني', 'سجلات الوقت والربحية'], 
      detailsEn: ['Task & Project Tracking', 'Support Ticket System', 'Timesheets & Profitability'] 
    },
    { 
      ar: 'الموقع والتجارة الإلكترونية', 
      en: 'Website & E-commerce', 
      icon: '🌐', 
      detailsAr: ['إدارة محتوى الموقع الإلكتروني', 'ربط المتاجر (سلة، زد، وغيرها)', 'مزامنة الطلبات والمخزون'], 
      detailsEn: ['Website Content Mgmt', 'Store Integrations (Salla, Zid)', 'Order & Stock Sync'] 
    }
  ];  

  packages = [
    { 
      nameAr: 'باقة التجارة', 
      nameEn: 'Trade Pack', 
      price: '2,500', 
      old: '4,500', 
      popular: false, 
      maintenance: '500',
      isContactUs: false,
      fAr: ['نظام مبيعات ومشتريات', 'نقاط بيع POS ذكية', 'الفاتورة الإلكترونية ZATCA', 'إدارة العملاء والموردين'], 
      fEn: ['Sales & Buying System', 'Smart POS Systems', 'ZATCA E-Invoicing', 'CRM & Vendor Management'] 
    },
    { 
      nameAr: 'باقة الأعمال', 
      nameEn: 'Business Basic', 
      price: '5,000', 
      old: '8,000', 
      popular: false, 
      maintenance: '1,500',
      isContactUs: false,
      fAr: ['كل مزايا باقة التجارة', 'المحاسبة المالية المتكاملة', 'إدارة المخازن والمستودعات', 'تقارير الأرباح والخسائر'], 
      fEn: ['All Trade Pack features', 'Integrated Accounting', 'Inventory Management', 'P&L Financial Reports'] 
    },
    { 
      nameAr: 'باقة الأعمال Pro', 
      nameEn: 'Business Pro', 
      price: '8,500', 
      old: '15,000', 
      popular: true, 
      maintenance: '2,500',
      isContactUs: false,
      fAr: ['كل مزايا باقة الأعمال', 'نظام الموارد البشرية HR', 'إدارة الرواتب والعمليات', 'إدارة الأصول والصلاحيات'], 
      fEn: ['All Business features', 'Human Resources System', 'Payroll Management', 'Asset & Permissions Mgmt'] 
    },
    { 
      nameAr: 'الباقة الاحترافية', 
      nameEn: 'Ultimate Pack', 
      price: null, 
      old: null, 
      popular: false, 
      maintenance: '3,500',
      isContactUs: true, // إضافة هذا المؤشر لاستخدامه في قالب HTML
      fAr: [
        'كل مزايا الأعمال Pro', 
        'إدارة التصنيع والإنتاج', 
        'إدارة المشاريع والمقاولات', 
        'إدارة الجودة والصيانة',
        'ربط التجارة الإلكترونية API', 
        'مزامنة المخزون (E-commerce Core)'
      ], 
      fEn: [
        'All Business Pro features', 
        'Manufacturing & Production', 
        'Project Management', 
        'Quality & Maintenance',
        'E-commerce API Integration', 
        'Stock Sync (E-commerce Core)'
      ] 
    }
  ];

  toggleLang() { this.isArabic = !this.isArabic; }    
  
  onBuy(pkg: string) {
    const msg = `مرحباً DomainCode، أود الاستفادة من عرض: ${pkg}`;
    window.open(`https://wa.me/966561316069?text=${encodeURIComponent(msg)}`, '_blank');
  }

  constructor(private seo: SeoService) {}   

  ngOnInit(): void {
    this.seo.updateMetaTags({
      title: 'نظام DomainCode ERP المتكامل | تمليك لمرة واحدة بدون اشتراك شهري',
      description: 'النظام الأقوى لإدارة المبيعات، المستودعات، والموارد البشرية مع ربط مباشر للمتاجر الإلكترونية (سلة وزد). احصل على عرض التمليك المحدود الآن.',
      keywords: 'نظام ERP تمليك، برنامج محاسبة سحابي، ربط سلة وزد، الفاتورة الإلكترونية السعودية، نظام إدارة مصانع',
      image: 'https://domaincodegroup.com/assets/images/logo.png'
    });
    this.seo.updateCanonicalUrl('https://domaincodegroup.com/app/dcgERP');
    this.seo.addStructuredData({
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': 'DomainCode ERP System',
      'operatingSystem': 'Web, Windows, Android, iOS',
      'applicationCategory': 'BusinessApplication',
      'publisher': {
        '@type': 'Organization',
        'name': 'Domain Code Group',
        'url': 'https://domaincodegroup.com'
      }
    }, 'page-structured-data');
  }
}