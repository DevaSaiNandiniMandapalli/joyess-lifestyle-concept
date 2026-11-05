# JOYESS LIFESTYLE — concept website

An independent, premium website **concept** for Joyess Lifestyle, Banjara Hills, Hyderabad.
It is **not the official website** and makes no claim of affiliation with the business.

**Live demo:** <https://joyess-lifestyle-concept.vercel.app>

## Run it

Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

No build step, no dependencies. Images and fonts: images are stored locally in
`assets/images/`; the two typefaces load from Google Fonts, so an internet connection is
needed for the intended typography (sensible serif/sans fallbacks are defined).

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page content and structure |
| `styles.css` | Design tokens, layout, responsive rules |
| `script.js` | Menu, scroll reveal, gallery lightbox, form validation |
| `assets/images/` | Optimised local WebP photography |
| `assets/favicon.svg` | Monogram favicon |

## Editing the content

* **Categories** — each `.xcard` in the Explore section is self-contained. Rename the
  `<h3>` and paragraph, reorder the blocks, or delete a card entirely. The grid adapts to
  any number of cards. Remove the “Proposed category” tag once an offering is confirmed.
* **Business details** — search for `Plot No. 131` in `index.html` and for
  `BUSINESS_PHONE` / `BUSINESS_EMAIL` in `script.js`. Update both the visible text and
  the `tel:`, `mailto:`, WhatsApp and Google Maps links. Remove the “Details to be
  verified” notice only after the owner confirms them.
* **About copy** — replace the placeholder paragraphs and the philosophy line with the
  owner’s own story before launch. No history, founders, awards or claims are implied.
* **Photography** — replace files in `assets/images/` using the same filenames, or update
  the `src` attributes. Keep the credit note if stock images remain.

## Enquiry form behaviour

There is no backend. On submit the form validates name, phone, optional email and
message, then opens WhatsApp with a prefilled enquiry. “Send by email instead” opens a
prefilled mailto message. Nothing is stored or transmitted by the site itself.

## Verified in this build

* Layout checked at 320, 360, 375, 390, 430, 768, 1024, 1280 and 1440 px — no horizontal
  overflow, no header overlap.
* Navigation, mobile menu (Escape, link click, focus return), gallery lightbox
  (keyboard arrows/Escape), and form validation tested in Chromium.
* Axe accessibility scan: 0 violations at 390 px and 1440 px.
* All local images verified as loading; lazy-loaded gallery images confirmed.
* Colour contrast adjusted for small text on ivory and charcoal.

## Photography

All photographs are from Unsplash and used under the Unsplash License for concept
presentation only. They are **not** photographs of Joyess Lifestyle or its work.

`hero` 1616486338812-3dadae4b4ace · `about` 1524504388940-b1c1722653e1 ·
`explore-boutique` 1441986300917-64674bd600d8 · `explore-creative` 1567016432779-094069958ea5 ·
`explore-photography` 1516035069371-29a1b244cc32 · `explore-events` 1511578314322-379afb476865 ·
`explore-lifestyle` 1586023492125-27b2c045efd7 · `gallery-1` 1469334031218-e382a71b716b ·
`gallery-2` 1445205170230-053b83016050 · `gallery-3` 1515886657613-9f3515b0c78f ·
`gallery-4` 1522708323590-d24dbb6b0267 · `gallery-5` 1539109136881-3be0616acf4b ·
`gallery-6` 1470229722913-7c0e2dbbafd3 · `gallery-7` 1452587925148-ce544e77e70d ·
`gallery-8` 1487222477894-8943e31ef7b2 · `gallery-9` 1600210492486-724fe5c67fb0 ·
`gallery-10` 1522335789203-aabd1fc54bc9

## Disclaimer

Independent concept demo created by a freelance web development team. Not the official
website of Joyess Lifestyle. Address, phone and email are directory-listed and must be
verified by the owner before launch.
