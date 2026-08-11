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
