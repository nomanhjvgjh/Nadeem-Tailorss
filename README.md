# Nadeem Tailor — Website

A modern, responsive, premium website for **Nadeem Tailor** (Laxmi Nagar, New Delhi).
Built with plain **HTML, CSS & JavaScript** — no build tools, no dependencies. Just open and go.

**Theme:** Black · Gold · White · Dark/Light toggle · Mobile-first · SEO friendly.

---

## 📂 Files

```
nadeem bhai/
├── index.html      ← Home (hero + rate-list card)
├── services.html   ← Services + real Rate List
├── reviews.html    ← Reviews & testimonials
├── faq.html        ← Frequently Asked Questions
├── contact.html    ← Contact form + map
├── Nadeem.pdf      ← Original rate card (linked from Home)
├── css/style.css   ← All styling
└── js/main.js      ← All logic + YOUR SETTINGS
```

**Theme:** Black & White (monochrome) with a dark/light toggle.

---

## ⚙️ IMPORTANT — Edit your details (1 place!)

Open **`js/main.js`** and update the `CONFIG` block at the top. Every page updates automatically.

| Setting | What to put |
|---|---|
| `phone` | Your number, international format, digits only. India = `91` + 10 digits → e.g. `919876543210` |
| `phoneDisplay` | How the number looks on the site, e.g. `+91 98765 43210` |
| `waMessage` | Default WhatsApp greeting |
| `address` | Full shop address |
| `email` | Your email |
| `mapEmbed` | Google Maps embed link — **see below** |
| `googleReviews` | Your Google Business "write a review" / profile link |
| `social` | Instagram / Facebook / YouTube links (leave `#` to disable) |

> ⚠️ The phone number is currently a **placeholder** (`919876543210`). The WhatsApp & Call buttons won't reach you until you change it.

### How to get the Google Maps embed link
1. Open [Google Maps](https://maps.google.com) → search your shop.
2. Click **Share** → **Embed a map** → **Copy HTML**.
3. From the copied code, take only the `src="..."` URL and paste it as `mapEmbed`.

---

## 🖼️ Replace the photos
The site uses free demo photos (Unsplash). Swap them for real shop/work photos:
- **Home:** edit the `<img>` in `index.html`; the hero background is in `css/style.css` → `.hero__bg`.

Tip: put your photos in an `images/` folder and use `src="images/your-photo.jpg"`.

---

## 🚀 How to view / publish
- **View locally:** just double-click `index.html`.
- **Publish free:** upload the folder to **Netlify**, **Vercel**, or **GitHub Pages** — no server needed.

---

## ✅ Features included
- Responsive & mobile-first · Fast loading (no libraries)
- Floating WhatsApp + Click-to-Call buttons
- Contact form that sends enquiries straight to WhatsApp
- Google Maps embed · Google Reviews CTA
- Dark / Light theme (remembers choice)
- Gallery filter + lightbox
- SEO meta tags + local-business structured data
- Real alteration rate list from your rate card
