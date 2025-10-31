# AI Vision - GÃ¶rÃ¼ntÃ¼ Ä°yileÅŸtirme ve Ä°ÅŸleme (Web Sitesi)

TÃ¼rkÃ§e, animasyonlu, mobil uyumlu bir tanÄ±tÄ±m sitesi. Ekip bilgileri `team.json` dosyasÄ±ndan dinamik yÃ¼klenir. Tamamen statik dosyalardan oluÅŸur (HTML/CSS/JS) ve herkese aÃ§Ä±k ÅŸekilde GitHub Pages, Netlify veya Vercel ile kolayca yayÄ±nlanabilir.

## Ã–zellikler
- Animasyonlu ve eriÅŸilebilir tek sayfa tasarÄ±m
- KaranlÄ±k/AydÄ±nlÄ±k tema ve kalÄ±cÄ± tema tercihi
- Dinamik ekip bÃ¶lÃ¼mÃ¼ (`team.json`)
- SEO meta ve sosyal paylaÅŸÄ±m etiketleri (OG/Twitter)
- JÃ¼ri daveti iÃ§in hazÄ±r eâ€‘posta CTA, form ve WhatsApp linki

## HÄ±zlÄ± BaÅŸlangÄ±Ã§ (GeliÅŸtirme)
Statik dosyalar olduÄŸu iÃ§in bir yerel sunucu ile aÃ§manÄ±z Ã¶nerilir (tarayÄ±cÄ± gÃ¼venlik kÄ±sÄ±tlarÄ± nedeniyle `fetch('team.json')` dosya:// protokolÃ¼nde engellenebilir).

- Python ile (Windows PowerShell):
```bash
python -m http.server 8080
```
ArdÄ±ndan tarayÄ±cÄ±da `http://localhost:8080` adresini aÃ§Ä±n.

- Node.js varsa:
```bash
npx serve -l 5173
```
`http://localhost:5173` adresini aÃ§Ä±n.

## YayÄ±nlama (Herkese AÃ§Ä±k)
AÅŸaÄŸÄ±daki Ã¼Ã§ kolay yÃ¶ntemden birini seÃ§in.

### 1) GitHub Pages
1. GitHub'da boÅŸ bir repo oluÅŸturun (Public).
2. Bu klasÃ¶rdeki tÃ¼m dosyalarÄ± repoya gÃ¶nderin:
   - `git init && git add . && git commit -m "site: initial"`
   - `git branch -M main && git remote add origin https://github.com/<kullanici>/<repo>.git`
   - `git push -u origin main`
3. Repo iÃ§inde Settings â†’ Pages â†’ "Deploy from a branch" â†’ Branch: `main` ve `/ (root)` seÃ§in â†’ Save.
4. 1-3 dakika iÃ§inde site `https://<kullanici>.github.io/<repo>/` adresinde yayÄ±nda olur.

Not: Ã–zel alan adÄ± kullanacaksanÄ±z Pages ayarlarÄ±ndan domain ekleyebilirsiniz. `CNAME` kaydÄ±nÄ±zÄ± saÄŸlayÄ±cÄ±nÄ±zda `username.github.io`'ya yÃ¶nlendirin.

### 2) Netlify
- `https://app.netlify.com` adresinde Sign in â†’ Add new site â†’ Deploy manually â†’ Bu klasÃ¶rÃ¼ sÃ¼rÃ¼kleyip bÄ±rakÄ±n.
- veya GitHub repo iÃ§e aktarÄ±n (New site from Git â†’ GitHub â†’ repo seÃ§in â†’ Build: yok, Publish directory: `/`).

### 3) Vercel
- `https://vercel.com/new` â†’ Import Git Repository â†’ Repo'yu seÃ§in â†’ Framework = Other â†’ Root directory = `/` â†’ Deploy.

## Ã–zelleÅŸtirme
- Ekip bilgileri: `team.json` dosyasÄ±nÄ± dÃ¼zenleyin (name, role, bio, email, linkedin, github, photo).
- Ä°letiÅŸim eâ€‘posta adresi: `assets/js/main.js` iÃ§inde `buildMailTo()` fonksiyonundaki `info@example.com` adresini deÄŸiÅŸtirin.
- WhatsApp ve Form: `index.html` iÃ§inde `#contact` bÃ¶lÃ¼mÃ¼ndeki linkleri gÃ¼ncelleyin.
- BaÅŸlÄ±k ve aÃ§Ä±klama: `index.html` iÃ§indeki `<title>` ve meta `description` etiketlerini gÃ¼ncelleyin.
- Sosyal Ã¶nizleme: `og:url` ve `canonical` alanlarÄ±nÄ± kendi alan adÄ±nÄ±zla deÄŸiÅŸtirin, gÃ¶rseli `assets/img/hero-bg.svg` yerine PNG kullanmak isterseniz dosya ekleyip yolu deÄŸiÅŸtirin.
- Favicon: `assets/icons/favicon.svg` dosyasÄ±nÄ± dilediÄŸiniz SVG/PNG ile deÄŸiÅŸtirin.

## Dosya YapÄ±sÄ±
```
index.html
assets/
  css/style.css
  js/main.js
  js/team.js
  img/hero-bg.svg
  icons/favicon.svg
team.json
.nojekyll
robots.txt
README.md
```

## Lisans
Bu web sitesi ÅŸablonu aÃ§Ä±k kaynaktÄ±r. Kendi projenize gÃ¶re deÄŸiÅŸtirebilirsiniz.