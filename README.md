# VALERIE — A Version in Seven
> **RC TCET Official Annual Publication • 2026–2027**
> **Rotaract Club of Thakur College of Engineering & Technology (RID 3141)**

A single-magazine launch landing page for **VALERIE**, the official annual magazine of RC TCET. 

Designed with a **Warm Antique Linen & Parchment** palette, **Prismatic Iridescent** typography, arched lancet window story cards, real-time 3D physics book tilt, and seamless integration with **Heyzine digital flipbooks**.

---

## 🧚 Features

1. **Warm Parchment & Prismatic Aesthetics:**
   - Eye-friendly, soft antique linen tone (`#F6F2EA`) inspired by the authentic magazine cover.
   - Iridescent text shimmer on **VALERIE** mirroring the rainbow prism letters on the cover.
   - Zero harsh glare, high-contrast velvet espresso typography (`#221E1B`).

2. **3D Floating Book Showcase:**
   - Features the real **VALERIE** cover art with interactive mouse-follow 3D tilt physics (`perspective: 1400px`, smooth lerp, and soft golden ambient diffusion).
   - Clicking anywhere on the book or CTA buttons launches the flipbook on **Heyzine**.

3. **The Seven Arched Perspectives:**
   - Arched lancet window cards echoing the seven windows on the cover:
     - *Window 01: The Spectrum (Art & Colors)*
     - *Window 02: The Grid (Tech & Global Network)*
     - *Window 03: The Heritage (Wonders & History)*
     - *Window 04: The Summit (Resilience & Altitudes)*
     - *Window 05: The Symphony (Music & Verse)*
     - *Window 06: The Phases (Mind & Reflection)*
     - *Window 07: The Horizon (Earth & Tides)*

4. **Curated Sneak Peek & Editor's Desk:**
   - Highlighting key page spreads and authentic behind-the-scenes student narratives.
   - Student editorial creators board.

5. **Smooth Scroll-Spy Navigation:**
   - Active section indicator dynamically follows as you scroll or click between sections (`The Edition`, `7 Perspectives`, `Sneak Peek`, `Editor's Desk`, `Creators`).

---

## 📁 How to Update Details & Heyzine Link

All text, links, and perspectives are neatly centralized in **`js/data.js`**:
```javascript
const MAGAZINE_CONFIG = {
  title: "VALERIE",
  subtitle: "A Version in Seven",
  tagline: "Where every perspective finds its place...",
  tenure: "2024 - 2025",
  heyzineUrl: "https://heyzine.com/flip-book/your-actual-link",
  // ...
};
```
Simply edit `js/data.js` and push to GitHub!

---

## 🚀 Running Locally

```bash
python -m http.server 5173
```
Visit: `http://localhost:5173`
