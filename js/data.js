/**
 * RC TCET - VALERIE 7.1 Editorial Data Store
 * Rotaract Club of Thakur College of Engineering & Technology (RID 3141)
 * Sponsoring Rotary: Rotary Club of Mumbai Borivali East (Club ID: 215309)
 * MERAKI — Infinite by Soul
 */

const MAGAZINE_CONFIG = {
  id: "mag-valerie-7-1",
  title: "VALERIE 7.1",
  displayTitle: "VALERIE",
  editionTag: "Edition 7.1",
  subtitle: "A Version in Seven",
  tagline: "Where every perspective finds its place...",
  tenure: "2026 - 2027",
  club: "Rotaract Club of TCET",
  district: "RID 3141 • Zone 1",
  sponsoringRotary: "Rotary Club of Mumbai Borivali East (Club ID: 215309)",
  initiative: "MERAKI — Infinite by Soul",
  coverImage: "assets/covers/cover_valerie.jpg",
  heyzineUrl: "https://heyzine.com/flip-book/33f2b2b6b6.html",

  // Core metrics from actual publication
  metrics: [
    { value: "07", label: "Core Perspectives" },
    { value: "52", label: "Illustrated Pages" },
    { value: "15+", label: "Featured Chapters" },
    { value: "100%", label: "Student Driven" }
  ],

  // The Sevenfold Atlas (The 7 Perspectives aligned directly with the Table of Contents & page deep-links)
  perspectives: [
    {
      id: "perspective-1",
      number: "01",
      title: "Our World in Colour",
      facet: "The Spectrum",
      tagline: "Prismatic Expression & Creative Soul",
      description: "A celebration of colors, artistic canvases, and youthful vibrancy that paint the foundation of our club's shared vision.",
      previewPage: "Page 06",
      pageNumber: 6
    },
    {
      id: "perspective-2",
      number: "02",
      title: "Seven Layers, One Soul",
      facet: "Unity & Purpose",
      tagline: "Many Dimensions, Single Fellowship",
      description: "Exploring the multidimensional spirit of RC TCET, connecting individual passions into one unified, unstoppable heartbeat.",
      previewPage: "Page 09",
      pageNumber: 9
    },
    {
      id: "perspective-3",
      number: "03",
      title: "The Mystery of Petra",
      facet: "July • Wonders in Motion",
      tagline: "Timeless Wonders & Historic Legacy",
      description: "From ancient architectural marvels to ground-level student action, witnessing world wonders through an inquisitive lens.",
      previewPage: "Page 10 – 11",
      pageNumber: 10
    },
    {
      id: "perspective-4",
      number: "04",
      title: "Beyond the Summit",
      facet: "August • Himalayan Grit",
      tagline: "Resilience, Endurance & Reaching Heights",
      description: "Scaling new leadership altitudes, overcoming collegiate hurdles, and standing tall against every mountain in our path.",
      previewPage: "Page 17",
      pageNumber: 17
    },
    {
      id: "perspective-5",
      number: "05",
      title: "A Symphony of Stories",
      facet: "September • Melodies & Fests",
      tagline: "Campus Cadence, Verse & Celebration",
      description: "Harmonizing student memoirs, musical jam sessions, poetic verses, and the dynamic rhythm of campus festivals.",
      previewPage: "Page 26",
      pageNumber: 26
    },
    {
      id: "perspective-6",
      number: "06",
      title: "Many Phases, One Orbit",
      facet: "Heart of Every Phase",
      tagline: "Mental Wellness, Waxing & Waning",
      description: "Finding clarity through transitions: open reflections on mental health, personal evolution, and grounding inner balance.",
      previewPage: "Page 37 – 41",
      pageNumber: 37
    },
    {
      id: "perspective-7",
      number: "07",
      title: "Where the Blues Unite",
      facet: "Colours of the Current",
      tagline: "Oceans, Eco-Drives & Fellowship",
      description: "Diving into marine restoration, community social drives, and the unbreakable bond where fellowship meets grassroots impact.",
      previewPage: "Page 48 – 50",
      pageNumber: 48
    }
  ],

  // Table of Contents (The Sevenfold Atlas with specific Heyzine page numbers)
  tableOfContents: [
    { title: "Faculty Guidance", page: "01", pageNumber: 1 },
    { title: "President's Perspective", page: "04", pageNumber: 4 },
    { title: "Editorial Preface", page: "05", pageNumber: 5 },
    { title: "Our World in Colour", page: "06", pageNumber: 6 },
    { title: "Faculty Reflections", page: "07", pageNumber: 7 },
    { title: "Seven Layers, One Soul", page: "09", pageNumber: 9 },
    { title: "The Mystery of Petra", page: "10", pageNumber: 10 },
    { title: "July - Wonders in Motion", page: "11", pageNumber: 11 },
    { title: "August - Beyond the Summit", page: "17", pageNumber: 17 },
    { title: "September - A Symphony of Stories", page: "26", pageNumber: 26 },
    { title: "At the Heart of Every Phase", page: "37", pageNumber: 37 },
    { title: "Many Phases, One Orbit", page: "41", pageNumber: 41 },
    { title: "Achievements", page: "46", pageNumber: 46 },
    { title: "Colours of the Current", page: "48", pageNumber: 48 },
    { title: "Where the Blues Unite", page: "50", pageNumber: 50 },
    { title: "Credits & Editorial Signoff", page: "51", pageNumber: 51 }
  ],

  // Editorial Preface Note
  editorialPreface: {
    heading: "Editorial Preface",
    quote: "Valerie 7.1 is not just a publication; it is The Sevenfold Atlas. Each chapter mirrors an archway into student creativity, resilience, cultural vibrancy, and unwavering service.",
    note: "Brought to life by the Bulletin and Editorial Directorate of RC TCET, this edition embodies the essence of Meraki — pouring soul, creativity, and love into every story.",
    signedBy: "Editorial Directorate • MERAKI 2026–27",
    clubName: "Rotaract Club of TCET (RID 3141)",
    pageNumber: 5
  },

  // Credits - The Editorial Creators (Real Names & Photos)
  credits: {
    pageNumber: 51,
    leaders: [
      {
        name: "Rtr. Juilee",
        role: "Bulletin Head",
        photo: "assets/team_juilee.png",
        badge: "Editorial Leadership"
      },
      {
        name: "Rtr. Hitanshi",
        role: "Design Head",
        photo: "assets/team_hitanshi.png",
        badge: "Visual & Art Direction"
      },
      {
        name: "Rtr. Anushka",
        role: "Editorial Director",
        photo: "assets/team_anushka.png",
        badge: "Content Curation"
      },
      {
        name: "Rtr. Diya",
        role: "Editorial Director",
        photo: "assets/team_diya.png",
        badge: "Content Curation"
      }
    ],
    supporting: [
      { name: "Rtr. Fuzail Aqdas Khan", role: "Supporting Team" },
      { name: "Rtr. Shristi Vishwakarma", role: "Supporting Team" },
      { name: "Rtr. Anubhav Prasad", role: "Supporting Team" }
    ]
  }
};

/**
 * Returns deep link to exact page inside the Heyzine flipbook
 * Offset: +3 (Since Cover = Page 1, Index = Page 3, Magazine Page 1 = Flipbook Page 4)
 * e.g., Magazine Page 1 -> https://heyzine.com/flip-book/33f2b2b6b6.html#page/4
 */
const HEYZINE_PAGE_OFFSET = 3;

function getHeyzinePageUrl(pageNumber) {
  const baseUrl = MAGAZINE_CONFIG.heyzineUrl.split('#')[0];
  if (!pageNumber) return baseUrl;
  const targetPage = Number(pageNumber) + HEYZINE_PAGE_OFFSET;
  return `${baseUrl}#page/${targetPage}`;
}
