/**
 * RC TCET Magazines - Central Data Store
 * Rotaract Club of Thakur College of Engineering & Technology (RID 3141)
 *
 * Each magazine displays:
 * - Title & Year (Tenure)
 * - Edition / Subtitle
 * - Cover Image
 * - Heyzine Flipbook URL (direct redirection on click)
 */

const DEFAULT_MAGAZINES = [
  {
    id: "mag-ignite-2024",
    title: "IGNITE",
    subtitle: "Annual Flagship Edition",
    year: "2024 - 2025",
    editionTag: "Vol. 14 • Issue 01",
    theme: "Innovation • Leadership • Technology",
    badge: "Latest Edition",
    cover: "assets/covers/cover_ignite.jpg",
    heyzineUrl: "https://heyzine.com/flip-book/sample-ignite-rc-tcet",
    featured: true
  },
  {
    id: "mag-vanguard-2024",
    title: "VANGUARD",
    subtitle: "Tech & Innovation Edition",
    year: "2024 - 2025",
    editionTag: "Vol. 02 • Issue 04",
    theme: "The Neural Frontier & Quantum AI",
    badge: "Tech Special",
    cover: "assets/covers/cover_vanguard.jpg",
    heyzineUrl: "https://heyzine.com/flip-book/sample-vanguard-rc-tcet",
    featured: true
  },
  {
    id: "mag-odyssey-2024",
    title: "ODYSSEY",
    subtitle: "Community & Social Impact",
    year: "2024 - 2025",
    editionTag: "Vol. 10 • Issue 02",
    theme: "Service Above Self • Grassroots Change",
    badge: "Social Impact",
    cover: "assets/covers/cover_odyssey.jpg",
    heyzineUrl: "https://heyzine.com/flip-book/sample-odyssey-rc-tcet",
    featured: false
  },
  {
    id: "mag-aura-2024",
    title: "AURA",
    subtitle: "Cultural & Youth Expression",
    year: "2024 - 2025",
    editionTag: "Vol. 04 • Issue 04",
    theme: "The Metallic Movement & Creative Arts",
    badge: "Culture & Arts",
    cover: "assets/covers/cover_aura.jpg",
    heyzineUrl: "https://heyzine.com/flip-book/sample-aura-rc-tcet",
    featured: false
  },
  {
    id: "mag-genesis-2023",
    title: "GENESIS",
    subtitle: "Leadership & Legacy Edition",
    year: "2023 - 2024",
    editionTag: "Vol. 14 • Issue 03",
    theme: "Forging the Future • 25 Years of Impact",
    badge: "Silver Jubilee",
    cover: "assets/covers/cover_genesis.jpg",
    heyzineUrl: "https://heyzine.com/flip-book/sample-genesis-rc-tcet",
    featured: true
  },
  {
    id: "mag-echoes-2023",
    title: "ECHOES",
    subtitle: "Voices of Change & Community",
    year: "2023 - 2024",
    editionTag: "Vol. 09 • Issue 02",
    theme: "Youth Amplified for Social Good",
    badge: "Community Drive",
    cover: "assets/covers/cover_odyssey.jpg",
    heyzineUrl: "https://heyzine.com/flip-book/sample-echoes-rc-tcet",
    featured: false
  },
  {
    id: "mag-synapse-2023",
    title: "SYNAPSE",
    subtitle: "Engineering, Web3 & Placements",
    year: "2023 - 2024",
    editionTag: "Vol. 01 • Issue 02",
    theme: "Future Code & Professional Velocity",
    badge: "Career & Tech",
    cover: "assets/covers/cover_vanguard.jpg",
    heyzineUrl: "https://heyzine.com/flip-book/sample-synapse-rc-tcet",
    featured: false
  },
  {
    id: "mag-lumina-2022",
    title: "LUMINA",
    subtitle: "Annual Retrospective & Revival",
    year: "2022 - 2023",
    editionTag: "Vol. 13 • Issue 01",
    theme: "Breakthrough Fellowship & Resilient Service",
    badge: "Annual Issue",
    cover: "assets/covers/cover_ignite.jpg",
    heyzineUrl: "https://heyzine.com/flip-book/sample-lumina-rc-tcet",
    featured: false
  }
];

// Presets available when adding a new magazine
const COVER_PRESETS = [
  { name: "Ignite (Flame Core)", path: "assets/covers/cover_ignite.jpg" },
  { name: "Vanguard (Cyber Tech)", path: "assets/covers/cover_vanguard.jpg" },
  { name: "Odyssey (Glowing Heart)", path: "assets/covers/cover_odyssey.jpg" },
  { name: "Aura (Liquid Chrome)", path: "assets/covers/cover_aura.jpg" },
  { name: "Genesis (Phoenix Ember)", path: "assets/covers/cover_genesis.jpg" }
];

// LocalStorage helpers for dynamic management
const STORAGE_KEY = "rctcet_magazines_heyzine_catalog_v2";

function getStoredMagazines() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_MAGAZINES;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_MAGAZINES;
  } catch (e) {
    console.warn("Could not read localStorage, using defaults", e);
    return DEFAULT_MAGAZINES;
  }
}

function saveMagazines(magazines) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(magazines));
    return true;
  } catch (e) {
    console.error("Failed to save magazines to localStorage", e);
    return false;
  }
}

function resetMagazinesToDefault() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return DEFAULT_MAGAZINES;
  } catch (e) {
    return DEFAULT_MAGAZINES;
  }
}
