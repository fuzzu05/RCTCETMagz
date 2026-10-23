# RC TCET — Digital Magazine Archive & Flipbooks
> **Rotaract Club of Thakur College of Engineering & Technology (RID 3141)**

A landing page and interactive showcase for the official publications and annual editions of RC TCET. 

Designed with a **Deep Obsidian Black & Fury Orange** dark theme, interactive 3D perspective transforms, a scroll-coupled conveyor runway, academic tenure filtering, and instant redirection to **Heyzine digital flipbooks**.

---

## 🌟 Key Features

1. **3D Interactive Hero Spotlight Stage:**
   - Features the latest flagship edition (*IGNITE*) with real-time physics mouse tilt (`perspective: 1400px`, dynamic lerp, and neon orange rim backlight).
   - Instant "Read on Heyzine ↗" direct action.

2. **Scroll-Driven 3D Infinite Runway:**
   - As you scroll down the page, magazines glide smoothly across the screen on a 3D tilted rail (and reverses when scrolling up).
   - Drag & touch-swipe support for mobile & tablet exploration.
   - Click any card to launch the flipbook directly on Heyzine.

3. **Academic Tenure & Year Filtering:**
   - Sort editions by tenure (`2024 - 2025`, `2023 - 2024`, `2022 - 2023`).
   - Instant real-time search filtering across titles, editions, and themes.
   - Interactive 3D gyroscope/mouse tilt cards.

4. **Dynamic In-Page Magazine Manager:**
   - Click the **"+ Add Magazine"** button in the header or footer.
   - Enter Magazine Title, Tenure/Year, Subtitle, Badge, and your **Heyzine Flipbook URL**.
   - Pick from preset cover artworks or provide a custom cover URL.
   - Instantly updates the showcase and persists to `localStorage`.
   - Includes **"Export JSON"** to copy the updated catalog directly into your code repository.

---

## 🚀 Running Locally

You can run this project with any local web server:

### Option A: Python (Pre-installed)
```bash
python -m http.server 5173
```
Then visit: `http://localhost:5173`

### Option B: Node.js / npx
```bash
npx serve .
```

---

## 📁 Project Structure

```
MagazineWeb/
├── index.html            # Semantic HTML5 with 3D viewport and modals
├── css/
│   └── style.css         # Modern CSS design system (Dark + Fury Orange)
├── js/
│   ├── data.js           # Central magazine data store and Heyzine URLs
│   └── app.js            # 3D tilt physics, scroll runway engine & manager
├── assets/
│   └── covers/           # Generated high-resolution magazine cover artworks
│       ├── cover_ignite.jpg
│       ├── cover_vanguard.jpg
│       ├── cover_odyssey.jpg
│       ├── cover_aura.jpg
│       └── cover_genesis.jpg
└── README.md
```

---

## 🔗 Heyzine Integration
Whenever a visitor clicks any magazine cover or button (in the Hero, in the 3D Runway, or in the Catalog Grid), it automatically opens the corresponding **Heyzine Flipbook** URL in a new tab (`target="_blank" rel="noopener noreferrer"`).
