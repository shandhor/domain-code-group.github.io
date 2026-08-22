# MIGRATION_NOTES.md

توثيق ترحيل موقع **Domain Code Group** من:
- Angular 16 + Hash Routing + GitHub Pages (SPA فقط، بدون SEO)

إلى:
- Angular 18 + Path Routing + Prerendered HTML لكل route + Cloudflare Pages

تاريخ الترحيل: **2026-08-11**

---

## 1. جدول الـ commits

| # | Hash | الوصف |
|---|------|-------|
| 1 | `7784b95` | Checkpoint قبل الترحيل (الحالة الأصلية) |
| 2 | `f5bb4a9` | ترقية Angular 16 → 17 |
| 3 | `6dee0bd` | ترقية Angular 17 → 18 |
| 4 | `26a475d` | إزالة hash routing + إصلاحات صغيرة |
| 5 | `8a703ce` | إضافة `@angular/ssr` + prerendering |
| 6 | `92b5864` | توسعة `SeoService` + canonical + structured data |
| 7 | `d8526c4` | إعدادات Cloudflare Pages + تنظيف schema |
| 8 | (هذا الـ commit) | `MIGRATION_NOTES.md` |

للرجوع لأي مرحلة: `git checkout <hash>`

---

## 2. ملفات جديدة

| الملف | الغرض |
|-------|-------|
| `server.ts` | Express server يُستخدم فقط أثناء `ng run prerender` — **لا يُنشر** |
| `src/main.server.ts` | Entry point للـ server bundle |
| `src/app/app.module.server.ts` | ServerModule يستورد AppModule |
| `tsconfig.server.json` | TS config للـ server build |
| `src/prerender-routes.txt` | قائمة الـ routes للـ prerender |
| `src/_headers` | Security headers + cache policy لـ Cloudflare |
| `src/robots.txt` | Crawler policy + sitemap reference |
| `MIGRATION_NOTES.md` | هذا الملف |

## 3. ملفات معدلة

| الملف | التغيير |
|-------|---------|
| `package.json` | ترقية كل `@angular/*` من 16 → 18، إضافة `@angular/ssr`, `@angular/platform-server`, `express`, `browser-sync`, `@types/express`, `@types/node`. Scripts جديدة: `dev:ssr`, `serve:ssr`, `build:ssr`, `prerender` |
| `angular.json` | إضافة 3 targets: `server`, `serve-ssr`, `prerender`. توحيد output paths على `dist/domain-code-group/{browser,server}`. تسجيل `_headers`, `robots.txt` في assets. تحديث deploy dir |
| `src/app/app-routing.module.ts` | إزالة `{ useHash: true }` |
| `src/app/app.module.ts` | إضافة `provideClientHydration()` |
| `src/app/app.component.ts` | استدعاءات جديدة للـ SeoService (canonical + WebSite structured data) |
| `src/app/app.component.html` | حذف `<!DOCTYPE html>` مكرر |
| `src/app/dcg_erp/dcgERP.ts` | حذف `debugger;`، استدعاءات SeoService (canonical + SoftwareApplication schema بدون aggregateRating/offers الوهمية) |
| `src/app/dcg_erp/dcgERP.html` | حذف `<script application/ld+json>` القديم (كان يُجرَّد أثناء render) |
| `src/app/services/SeoService.ts` | توسعة: `updateTitle`, `updateCanonicalUrl`, `addStructuredData`. حماية SSR عبر DOCUMENT token |
| `src/index.html` | `lang="en"` → `lang="ar"`، حذف تعليق GitHub Pages base href، إضافة hash-to-path redirect snippet، إضافة Organization JSON-LD ثابت |
| `src/sitemap.xml` | إضافة `<lastmod>` و `<changefreq>` لكل URL |

## 4. تغييرات جوهرية في `angular.json`

### Output structure
- **قبل**: `dist/domain-code-group/` (مسطح)
- **بعد**: `dist/domain-code-group/browser/` (SPA files) + `dist/domain-code-group/server/` (server bundle — للـ prerender فقط)

### Assets الجديدة
```json
"assets": [
  "src/favicon.ico",
  "src/assets",
  "src/sitemap.xml",
  "src/robots.txt",
  "src/googled08af12d52142e9c.html",
  {
    "glob": "_headers",
    "input": "src",
    "output": "/"
  }
]
```
> `_headers` يحتاج glob-style pattern لأن Angular يتجاهل الملفات التي تبدأ بـ `_` افتراضياً.

### Prerender target
```json
"prerender": {
  "builder": "@angular-devkit/build-angular:prerender",
  "options": {
    "routesFile": "src/prerender-routes.txt"
  },
  "configurations": {
    "production": {
      "browserTarget": "domainCodeGroup:build:production",
      "serverTarget": "domainCodeGroup:server:production"
    }
  }
}
```

---

## 5. خطوات النشر على Cloudflare Pages

### أ. من الـ Cloudflare Dashboard

1. اذهب إلى **Workers & Pages → Create → Pages → Connect to Git**
2. اختر repository: `shandhor/<repo-name>`
3. Branch: `master` (أو أي branch للـ production)
4. **Build settings**:

| الحقل | القيمة |
|-------|--------|
| Framework preset | `None` (نتحكم يدوياً) |
| Build command | `npm ci && npm run prerender` |
| Build output directory | `dist/domain-code-group/browser` |
| Root directory | `/` (الافتراضي) |
| Node.js version | `20` أو `22` (Angular 18 يدعم كليهما) |

### ب. Environment Variables

**لا يوجد env vars مطلوبة** للبناء الحالي. لو أضفت لاحقاً (مثلاً API endpoints)، أضفها من Cloudflare dashboard تحت **Settings → Environment Variables**.

**متغير موصى به** لضمان الأداء:
```
NODE_VERSION = 20
```

### ج. Build script في `package.json`

الـ script الحالي:
```json
"prerender": "ng run domainCodeGroup:prerender"
```
يعمل الـ browser build + server build + prerender لكل الـ routes في `src/prerender-routes.txt`.

**زمن البناء المتوقع**: ~1 دقيقة لكل route، للحالي (2 routes) ≈ 30-45 ثانية على Cloudflare.

---

## 6. إعدادات DNS المقترحة

بعد ربط الموقع في Cloudflare Pages، ستحصل على subdomain مثل `<project>.pages.dev`.

### لربط الدومين المخصص `domaincodegroup.com`:

1. **من Cloudflare Pages Dashboard**:
   - `Custom domains → Set up a custom domain`
   - أدخل: `domaincodegroup.com` و `www.domaincodegroup.com`

2. **من Cloudflare DNS Dashboard** (لو الدومين مسجل داخل Cloudflare — الأسهل):
   - Cloudflare يضيف الـ CNAME تلقائياً
   
3. **لو الدومين مسجل خارج Cloudflare**، أضف:

| Type | Name | Content | Proxy |
|------|------|---------|-------|
| CNAME | `@` | `<project>.pages.dev` | ✅ Proxied |
| CNAME | `www` | `<project>.pages.dev` | ✅ Proxied |

### SSL/TLS
- Cloudflare يوفر SSL مجاناً تلقائياً
- **SSL/TLS mode**: `Full (strict)` (موصى)
- **Always Use HTTPS**: enabled

### Page Rules أو Redirects (اختياري)
- **www → non-www** (أو العكس، حسب تفضيلك):
  - في **Rules → Redirect Rules**: `www.domaincodegroup.com/*` → `https://domaincodegroup.com/$1` (301)

---

## 7. ملفات النشر المهمة

### `_headers` (في dist)

```
/*
  X-Frame-Options: SAMEORIGIN
  X-Content-Type-Options: nosniff
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: geolocation=(), microphone=(), camera=(), payment=()
  Strict-Transport-Security: max-age=31536000; includeSubDomains

/*.js
  Cache-Control: public, max-age=31536000, immutable

/*.css
  Cache-Control: public, max-age=31536000, immutable

/assets/*
  Cache-Control: public, max-age=604800

/favicon.ico
  Cache-Control: public, max-age=86400

/*.html
  Cache-Control: public, max-age=3600, must-revalidate

/
  Cache-Control: public, max-age=3600, must-revalidate
```

### 🚫 لماذا لا يوجد `_redirects`?

**تجنب SPA fallback `/* /index.html 200`**. Cloudflare Pages يخدم:
- `/` → `index.html` (prerendered)
- `/app/dcgERP` → `app/dcgERP/index.html` (prerendered)
- URLs غير معروفة → 404 صحيح

إضافة SPA fallback ستعطي الصفحة الرئيسية بدل صفحة ERP، مما يكسر SEO ويسبب فقدان الـ prerendered content.

---

## 8. الأوامر المهمة

```bash
# التطوير المحلي (بدون SSR)
npm start
# → http://localhost:4200

# البناء العادي (بدون prerender)
npm run build

# البناء الكامل مع prerender (للنشر)
npm run prerender
# → dist/domain-code-group/browser/

# اختبار الـ prerendered output محلياً
npx http-server dist/domain-code-group/browser -p 4200 -a 127.0.0.1

# التشغيل مع SSR (dev mode)
npm run dev:ssr

# البناء ثم تشغيل SSR كـ Node server
npm run build:ssr
npm run serve:ssr
```

---

## 9. اختبارات التحقق بعد النشر

بعد نشر الموقع على Cloudflare، شغّل:

```bash
# 1. تحقق من prerendered content بدون JavaScript
curl -sL https://domaincodegroup.com/ | grep -E '<title>|name="description"|rel="canonical"'
curl -sL https://domaincodegroup.com/app/dcgERP | grep -E '<title>|name="description"|rel="canonical"'

# 2. تحقق من security headers
curl -I https://domaincodegroup.com/ | grep -Ei 'x-frame|x-content|referrer|hsts|permissions'

# 3. تحقق من robots و sitemap
curl -s https://domaincodegroup.com/robots.txt
curl -s https://domaincodegroup.com/sitemap.xml

# 4. تحقق من hash redirect
curl -sIL 'https://domaincodegroup.com/#/app/dcgERP' | head -20
```

### أدوات خارجية للفحص

- **Google Rich Results Test**: https://search.google.com/test/rich-results
  - يتوقع اكتشاف: Organization, WebSite (home), SoftwareApplication (ERP page)
- **PageSpeed Insights**: https://pagespeed.web.dev/
  - الهدف: LCP < 2.5s, CLS < 0.1
- **Google Search Console**: أضف الموقع وقدّم `sitemap.xml`
- **schema.org validator**: https://validator.schema.org/

---

## 10. مخاطر وملاحظات

### 🔴 روابط قديمة `/#/`

الروابط القديمة بشكل `https://domaincodegroup.com/#/app/dcgERP` (من عهد GitHub Pages) ستُعالج بواسطة snippet JavaScript في `index.html` يحوّلها إلى `/app/dcgERP` قبل تحميل Angular. **يعمل فقط لو المستخدم يحمّل صفحة `/` أولاً**، وهو السلوك الطبيعي لأي bookmark قديم.

للحماية الإضافية على مستوى Cloudflare، يمكنك إضافة **Redirect Rule** يحول أي URL يحتوي `#/xxx` — لكن hash لا يُرسل للسيرفر، فهذا غير ممكن على مستوى HTTP.

### 🟡 Trailing slash

الـ `canonical` يشير لـ `/app/dcgERP` بدون trailing slash، لكن الملف الفعلي في `app/dcgERP/index.html`. Cloudflare Pages عادةً يخدم كلا الشكلين. **تحقق بعد النشر** — لو أجبر trailing slash، حدّث:
- `src/prerender-routes.txt` → `/app/dcgERP/`
- `src/sitemap.xml` → `https://domaincodegroup.com/app/dcgERP/`
- والـ canonical URLs في المكونات

### 🟡 Legacy multi-builder
المشروع يستخدم legacy multi-builder (browser + server + prerender) لأن التطبيق `NgModule`-based. الـ `application` builder الحديث متاح لكن يحتاج migration للـ standalone. الوضع الحالي مدعوم في Angular 18 لكن قد يتطلب مراجعة عند ترقية 19+.

### 🟡 Deploy target القديم لـ GitHub Pages
`angular-cli-ghpages` deploy target ما زال في `angular.json` كـ backup:
```bash
npx ng deploy  # ينشر إلى shandhor/domain-code-group.github.io.git
```
**ملاحظة**: هذا الـ script لن يشغّل prerender تلقائياً. لو أردت استخدامه:
```bash
npm run prerender && npx ng deploy
```

### 🟡 التقييمات الوهمية
تم حذف `aggregateRating: 4.9/124 reviews` و `offers` block من `SoftwareApplication` schema (كانت وهمية). لو رغبت في إضافة تقييمات حقيقية، عدّل `DcgERP.ngOnInit()`.

### 🟡 Bundle size warnings
main bundle ~78 kB (transfer). ضمن budget `500 kB`. لا يحتاج إجراء الآن.

---

## 11. مراجع سريعة

- **Angular 18 SSR docs**: https://angular.dev/guide/ssr
- **@angular/ssr package**: https://www.npmjs.com/package/@angular/ssr
- **Cloudflare Pages docs**: https://developers.cloudflare.com/pages/
- **`_headers` syntax**: https://developers.cloudflare.com/pages/configuration/headers/
- **schema.org Organization**: https://schema.org/Organization
- **schema.org SoftwareApplication**: https://schema.org/SoftwareApplication

---

## 12. rollback plan

لو حدث خطأ في production ولزم الرجوع:

```bash
# رجوع كامل للحالة الأصلية (قبل الترحيل)
git reset --hard 7784b95
# ثم نشر الحالة القديمة يدوياً على GitHub Pages
npx ng deploy
```

أو رجوع لمرحلة معينة (مثلاً بعد الترقية وقبل SSR):
```bash
git checkout 6dee0bd
```

**تحذير**: `git reset --hard` يحذف كل الـ commits اللاحقة. تأكد من دفع الحالة الحالية إلى remote branch قبل الـ reset.

---

# Phase 2 — AI/SEO Enhancement (2026-08-16)

توسعة SEO تستهدف AI answer engines (Claude, ChatGPT, Perplexity, Gemini) + محركات البحث التقليدية + معيار `llms.txt` الحديث + صفحة FAQ.

## الملفات الجديدة

| الملف | الغرض |
|-------|-------|
| `src/llms.txt` | Markdown بمعلومات الشركة مصمّم لـ AI crawlers (تخطيط للمعيار الحديث `/llms.txt`) |
| `src/app/pages/faq/faq.component.ts` | 12 سؤال ثنائي اللغة + FAQPage schema + SeoService integration |
| `src/app/pages/faq/faq.component.html` | template بنمط بصري مطابق لباقي الموقع (glass + gradient + accordion) |
| `src/app/pages/faq/faq.component.scss` | scoped: `.glass`, `.gradient-text`, `.gradient-bg`, animations |

## الملفات المعدلة

| الملف | التغيير |
|-------|---------|
| `src/robots.txt` | استبدال بقائمة موسعة (27 User-agent): GPTBot, ClaudeBot (+Claude-Web/anthropic-ai), PerplexityBot, Google-Extended, Applebot-Extended, CCBot, Meta, Bytespider, Amazonbot, cohere-ai، وباقي المحركات التقليدية |
| `src/index.html` | Organization schema محسّنة: `@id`, `alternateName` array، founder (Mohammed Shanzour)، locations array (4 مدن)، areaServed موسع لـ 8 دول، `knowsAbout`, `makesOffer`, contact بلغتين |
| `src/app/app-routing.module.ts` | إضافة `{ path: 'faq', component: FaqComponent }` |
| `src/app/app.module.ts` | إضافة `FaqComponent` للـ declarations |
| `src/app/app.component.ts` | تحديث NavigationEnd handler: `showStatic` يخفي static home على أي route غير `/` (بدل التحقق فقط من `/app/dcgERP`) — ضروري لظهور FAQ لوحده |
| `src/prerender-routes.txt` | إضافة `/faq` |
| `src/sitemap.xml` | إضافة `/faq` (priority 0.8)، تحديث `lastmod` لكل الصفحات إلى `2026-08-16` |
| `angular.json` | إضافة `src/llms.txt` لقائمة assets (build + test) |

## الميزات المضافة

- **صفحة FAQ** مع 12 سؤال (عربي/إنجليزي) + accordion تفاعلي + CTA WhatsApp
- **FAQPage structured data** (JSON-LD) بصيغة schema.org — 12 Question / Answer pair بالعربية
- **AI crawlers مسموح لهم صراحة** في robots.txt (ChatGPT, Claude, Perplexity, Gemini, Apple Intelligence, وغيرهم)
- **`llms.txt` file** — معيار حديث يعطي AI crawlers ملخص منظم بـ Markdown عن الشركة والمنتجات والأسعار
- **Enhanced Organization schema** بمعلومات المؤسس، 4 مواقع، 8 دول areaServed، 12 مجال خبرة، عرض SoftwareApplication

## Build metrics (بعد التحسين)

```
main.js         : 81.99 kB (transfer, +3.6 kB من phase 1)
styles.css      :  4.27 kB (transfer, +0.1 kB — FAQ component styles minimal)
polyfills.js    : 11.36 kB (unchanged)
runtime.js      :  0.51 kB (unchanged)
Total initial   : 98.14 kB (transfer)

Prerendered pages: 3
  /             : 73,136 bytes  (grew من enhanced Organization schema)
  /app/dcgERP   : 55,181 bytes  (grew من نفس السبب)
  /faq          : 52,702 bytes  (جديد)

Errors: 0 | Warnings: 0 | Build time: ~25s
```

## نتائج التحقق (curl)

- ✅ `/robots.txt`: 27 User-agent entries تشمل GPTBot, ClaudeBot, PerplexityBot, Google-Extended, Applebot, CCBot، إلخ
- ✅ `/llms.txt`: يخدم Markdown 3,859 bytes
- ✅ `/faq`: HTTP 200، title/description عربية FAQ-specific، canonical `/faq`، 12 accordion buttons في HTML البصري، 12 Question في JSON-LD
- ✅ لا leak لمحتوى الصفحة الرئيسية على `/faq` (بفضل تحديث `showStatic`)
- ✅ WhatsApp CTA link صحيح: `wa.me/966561316069`
- ✅ 404 route غير معروف: HTTP 404 صحيح (لا SPA fallback يخفي المشكلة)
- ✅ Structured data:
  - `/`: Organization + WebSite
  - `/app/dcgERP`: Organization + SoftwareApplication
  - `/faq`: Organization + WebSite + FAQPage (12 Q/A)

## قرارات تصميم مختصرة

1. **لم أضف رابط FAQ في القائمة الرئيسية** — القيد كان "لا تغير أي محتوى مرئي في الصفحات الحالية". Google/AI crawlers ستكتشف الصفحة عبر `sitemap.xml` و`llms.txt` بدون رابط ظاهر.
2. **Tailwind inline بدل مكتبة SCSS منفصلة** — matches باقي الموقع (طول faq.component.scss فقط ~30 سطر لتعريف classes scoped).
3. **`showStatic` صار "hide-on-any-non-root"** — بدلاً من قائمة routes محدد. يبقى محافظاً على السلوك الحالي (home يعرض static, ERP يخفيه) ويعمل لأي route جديد تلقائياً.
4. **`@angular/router` `component:` بدل `loadComponent:`** — التطبيق NgModule-based، والصفحة صغيرة (~10 kB) فلا داعي لـ lazy loading.
5. **`aggregateRating`/`offers` الوهمية بقيت محذوفة** (من phase 1) — لم أستعدها.

## الخطوات اليدوية المطلوبة بعد النشر

1. **Google Search Console**:
   - أثبت ملكية الدومين (لديك ملف `googled08af12d52142e9c.html` موجود)
   - قدّم `https://domaincodegroup.com/sitemap.xml`
   - راجع Rich Results لكل صفحة: FAQPage, Organization, SoftwareApplication
2. **Bing Webmaster Tools**: أضف الموقع وقدّم نفس sitemap
3. **Rich Results Test** (اختبار Google): https://search.google.com/test/rich-results
   - `/` → متوقع: Organization + WebSite
   - `/app/dcgERP` → متوقع: Organization + SoftwareApplication
   - `/faq` → متوقع: Organization + WebSite + FAQPage (12 questions)
4. **Schema.org validator**: https://validator.schema.org/
5. **زمن الاكتشاف**: AI crawlers تحتاج 2-4 أسابيع لتضمين المحتوى الجديد في نتائجها. Google أسرع (أيام إلى أسبوع بعد submitting sitemap).

## Commit جديد

هذا التحسين يضاف كـ commit تاسع فوق الترحيل الأصلي.

---

# Phase 3 — Product Pages Expansion (2026-08-23)

توسعة بصمة الموقع لتغطي كل منتجات Domain Code Group: إضافة صفحتين منتج جديدتين (Commerce، AI) بنفس تصميم DomainCode ERP، مع تحديث llms.txt والـ Organization schema لتضمين المنتجات الجديدة.

## الملفات الجديدة (6)

| الملف | الغرض |
|-------|-------|
| `src/app/pages/dcgCommerce/dcgCommerce.ts` | DcgCommerce component: 6 features + 4 packages (3,500 - 14,000+ SAR) + SoftwareApplication schema |
| `src/app/pages/dcgCommerce/dcgCommerce.html` | Template مستنسخ بنية DcgERP كاملة (نفس badges/glass/gradient/packages layout) |
| `src/app/pages/dcgCommerce/dcgCommerce.scss` | Scoped styles مطابق دcgERP.scss (Cairo font, glass, gradient, card-hover, float) |
| `src/app/pages/dcgAI/dcgAI.ts` | DcgAI component: 6 features + 4 packages (5,000 - 35,000+ SAR) + SoftwareApplication schema |
| `src/app/pages/dcgAI/dcgAI.html` | نفس بنية dcgERP بمحتوى AI |
| `src/app/pages/dcgAI/dcgAI.scss` | Scoped styles مطابق دcgERP.scss |

## الملفات المعدلة (5)

| الملف | التغيير |
|-------|---------|
| `src/index.html` | Organization schema: أضيف DomainCode Commerce و DomainCode AI في `knowsAbout` و `makesOffer` (3 SoftwareApplication offers الآن بدل 1) |
| `src/app/app-routing.module.ts` | إضافة routes: `app/dcgCommerce` و `app/dcgAI` |
| `src/app/app.module.ts` | إضافة `DcgCommerce` و `DcgAI` للـ declarations |
| `src/prerender-routes.txt` | إضافة `/app/dcgCommerce` و `/app/dcgAI` (الإجمالي 5 routes) |
| `src/sitemap.xml` | إضافة الصفحتين (priority 0.9)، تحديث `lastmod` لكل الصفحات إلى `2026-08-23` |
| `src/llms.txt` | إعادة تنظيم: قسم Core Products الآن يضم DomainCode Commerce و DomainCode AI مع جداول أسعار كاملة (4 باقات لكل منتج) |

## الميزات المضافة

- **صفحة DomainCode Commerce** — منصة تجارة إلكترونية، 6 مميزات (بوابات دفع محلية، المخزون، الشحن، التسويق، تحليلات، SEO)، 4 باقات
- **صفحة DomainCode AI** — حلول ذكاء اصطناعي بالعربية، 6 قدرات (نماذج لغوية، RAG، chatbots، تحليل مستندات، تنبؤية، رؤية حاسوبية)، 4 باقات
- **SoftwareApplication schema لكل صفحة** (مع publisher = Organization)
- **Organization schema محسّنة** — تشير الآن للمنتجات الثلاثة صراحة عبر `makesOffer` array
- **llms.txt موسّع** — جداول أسعار مفصلة لكل منتج بلغتين

## قرارات تصميم

1. **نسخ SCSS بدل `@import`** — كل صفحة تحتوي على نسخة كاملة من styles، يمنع الاعتماد المتقاطع ويتيح تخصيص مستقبلي منفصل. الحجم الإضافي داخل budget الـ 2kB لكل component.
2. **`showStatic` handler لم يُعدَّل** — كان بالفعل يخفي static home على أي route غير `/`، فيغطي dcgCommerce/dcgAI تلقائياً بدون تغيير.
3. **لم أضف روابط للصفحات الجديدة في navbar** — القيد "لا تغير أي محتوى مرئي في الصفحات الحالية". الاكتشاف يتم عبر sitemap.xml و llms.txt و JSON-LD.
4. **`component:` بدل `loadComponent:`** — تطبيق NgModule-based، والصفحتان صغيرتان (~10 kB each) فلا داعي للتحميل الكسول.
5. **نفس رقم WhatsApp موحد** (966561316069) لكن رسالة WhatsApp تحتوي على اسم المنتج والباقة (تسهيل معالجة الاستفسارات).
6. **`robots.txt` لم يُعدَّل** — قائمة AI crawlers الحالية (Phase 2) تغطي كل المطلوب.
7. **FAQ page لم تُعدَّل** — بعض الأسئلة الحالية موجّهة لـ ERP فقط، لكن الصفحة أساساً تدعم Domain Code Group ككل. تحديث الأسئلة لتضمين Commerce/AI يمكن أن يتم في iteration لاحقة.

## Build metrics

```
main.1313332fe5032780.js     : 85.31 kB (transfer, +3.3 kB من phase 2)
polyfills.c916ef1a4d288290.js: 11.36 kB (unchanged)
styles.514454f5c161005d.css  :  4.27 kB (unchanged)
runtime.80c9d91f2427777c.js  :  0.51 kB
Initial total                : 101.45 kB (transfer)

Prerendered pages: 5 (كان 3)
  /                        : يحتوي Organization بـ 3 SoftwareApplication offers
  /app/dcgERP              : 55,920 bytes (باقات ERP بلا تغيير)
  /app/dcgCommerce         : 56,260 bytes (جديد)
  /app/dcgAI               : 56,472 bytes (جديد)
  /faq                     : 53,441 bytes (بلا تغيير)

Errors: 0 | Warnings: 0 | Build time: ~63s
```

## نتائج التحقق

- ✅ 5 صفحات prerendered بنجاح
- ✅ `/app/dcgCommerce/`: title Arabic، canonical صحيح، 4 SoftwareApplication schema references، كل باقات (البداية/النمو/الأعمال/المؤسسات) موجودة في HTML
- ✅ `/app/dcgAI/`: title Arabic، canonical صحيح، 4 SoftwareApplication references، كل باقات AI موجودة
- ✅ `/app/dcgERP/`: بدون أي تغيير (title/description/canonical/packages مطابقة لـ Phase 2)
- ✅ لا تسرب لمحتوى static home على الصفحات الجديدة (`grep "شريكك الرقمي الموثوق"` = 0)
- ✅ `/`: 3 SoftwareApplication في Organization.makesOffer
- ✅ `/robots.txt`: 27 User-agents (بلا تغيير من Phase 2)
- ✅ `/llms.txt`: يخدم Markdown بالمنتجات الثلاثة (~5 kB)
- ✅ `/sitemap.xml`: 5 URLs

## الخطوات اليدوية بعد النشر

1. **Git push** إلى `master` branch — Cloudflare Pages ينشر تلقائياً
2. **Google Search Console**: أعد تقديم `sitemap.xml` (يحتوي 2 URLs جديدة)
3. **Rich Results Test** لكل صفحة جديدة:
   - `/app/dcgCommerce` → متوقع: Organization + SoftwareApplication
   - `/app/dcgAI` → متوقع: Organization + SoftwareApplication
4. **راجع الأسعار المقترحة** — الأرقام الحالية في `dcgCommerce.ts` و `dcgAI.ts` مقترحة، عدّلها قبل الترويج
5. **زمن الاكتشاف**: 
   - Google: أيام إلى أسبوع بعد submit sitemap
   - AI crawlers (Claude, ChatGPT, Perplexity, Gemini): 2-4 أسابيع

## Commit جديد

Phase 3 يضاف كـ commit عاشر فوق commits الترحيل + Phase 2.

