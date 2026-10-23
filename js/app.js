/**
 * RC TCET - VALERIE 7.1 Application Controller
 * Rotaract Club of Thakur College of Engineering & Technology (RID 3141)
 *
 * Implements:
 * 1. 3D Spotlight Book Physics with smooth lerp and glare tracking
 * 2. Dynamic rendering of The 7 Arched Perspectives with exact Heyzine #page/X links
 * 3. The Sevenfold Atlas with specific Heyzine #page/X deep links
 * 4. Credits Section with Real Photos
 * 5. Robust IntersectionObserver Scroll-Spy
 */

(function () {
  'use strict';

  // DOM Elements
  const siteHeader = document.getElementById('siteHeader');
  const spotlightBook = document.getElementById('spotlightBook');
  const valerieHeroCover = document.getElementById('valerieHeroCover');
  const heroHeyzineBtn = document.getElementById('heroHeyzineBtn');
  const headerHeyzineBtn = document.getElementById('headerHeyzineBtn');
  const bannerHeyzineBtn = document.getElementById('bannerHeyzineBtn');
  const perspectivesGrid = document.getElementById('perspectivesGrid');
  const tocListLeft = document.getElementById('tocListLeft');
  const tocListRight = document.getElementById('tocListRight');
  const teamGrid = document.getElementById('teamGrid');
  const navLinks = document.querySelectorAll('.nav-link');

  /* ==========================================================================
     1. Sync URLs & Render Data
     ========================================================================== */
  function syncMagazineData() {
    // Base Heyzine links
    if (spotlightBook) spotlightBook.href = MAGAZINE_CONFIG.heyzineUrl;
    if (heroHeyzineBtn) heroHeyzineBtn.href = MAGAZINE_CONFIG.heyzineUrl;
    if (headerHeyzineBtn) headerHeyzineBtn.href = MAGAZINE_CONFIG.heyzineUrl;
    if (bannerHeyzineBtn) bannerHeyzineBtn.href = MAGAZINE_CONFIG.heyzineUrl;

    if (valerieHeroCover) {
      valerieHeroCover.src = MAGAZINE_CONFIG.coverImage;
      valerieHeroCover.alt = `${MAGAZINE_CONFIG.title} - ${MAGAZINE_CONFIG.subtitle}`;
    }

    // Render The 7 Perspectives with exact page deep-links (#page/X)
    if (perspectivesGrid && MAGAZINE_CONFIG.perspectives) {
      perspectivesGrid.innerHTML = MAGAZINE_CONFIG.perspectives.map(p => {
        const pageUrl = getHeyzinePageUrl(p.pageNumber);
        return `
          <div class="arch-window-card" id="${p.id}">
            <div class="arch-number-badge">${p.number}</div>
            <span class="arch-facet-tag">${escapeHtml(p.facet)}</span>
            <h3 class="arch-window-title">${escapeHtml(p.title)}</h3>
            <div class="arch-window-tagline">${escapeHtml(p.tagline)}</div>
            <p class="arch-window-desc">${escapeHtml(p.description)}</p>
            <a href="${pageUrl}" target="_blank" rel="noopener noreferrer" class="arch-page-indicator" style="text-decoration: none; display: inline-flex; align-items: center; gap: 6px; transition: all 0.25s ease;" title="Jump directly to ${escapeHtml(p.previewPage)} on Heyzine">
              <span>${escapeHtml(p.previewPage)}</span>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
          </div>
        `;
      }).join('');
    }

    // Render Table of Contents (The Sevenfold Atlas) with exact page deep-links (#page/X)
    if (tocListLeft && tocListRight && MAGAZINE_CONFIG.tableOfContents) {
      const items = MAGAZINE_CONFIG.tableOfContents;
      const mid = Math.ceil(items.length / 2);
      const leftItems = items.slice(0, mid);
      const rightItems = items.slice(mid);

      const renderTocItem = (item) => {
        const pageUrl = getHeyzinePageUrl(item.pageNumber);
        return `
          <li style="display: flex; align-items: baseline; justify-content: space-between; gap: 10px;">
            <a href="${pageUrl}" target="_blank" rel="noopener noreferrer" style="color: var(--text-title); text-decoration: none; font-weight: 600; font-size: 0.96rem; transition: all 0.2s ease; display: inline-flex; align-items: center; gap: 6px;" onmouseover="this.style.color='#C59B4B'; this.style.transform='translateX(4px)'" onmouseout="this.style.color='var(--text-title)'; this.style.transform='translateX(0)'" title="Open Page ${item.pageNumber} in Heyzine flipbook">
              <span>${escapeHtml(item.title)}</span>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" opacity="0.6">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
            <span style="flex-grow: 1; border-bottom: 1px dotted rgba(100,80,60,0.25); margin: 0 4px;"></span>
            <a href="${pageUrl}" target="_blank" rel="noopener noreferrer" style="text-decoration: none; font-family: var(--font-serif); font-size: 0.9rem; font-weight: 700; color: var(--gold-dark); background: var(--bg-parchment-warm); padding: 3px 10px; border-radius: 6px; border: 1px solid var(--border-subtle); transition: all 0.2s ease;" onmouseover="this.style.background='#C59B4B'; this.style.color='#fff'" onmouseout="this.style.background='var(--bg-parchment-warm)'; this.style.color='var(--gold-dark)'" title="Jump to page ${item.pageNumber}">
              ${escapeHtml(item.page)}
            </a>
          </li>
        `;
      };

      tocListLeft.innerHTML = leftItems.map(renderTocItem).join('');
      tocListRight.innerHTML = rightItems.map(renderTocItem).join('');
    }

    // Render Editorial Leaders (Real Team Members with Photos)
    if (teamGrid && MAGAZINE_CONFIG.credits && MAGAZINE_CONFIG.credits.leaders) {
      teamGrid.innerHTML = MAGAZINE_CONFIG.credits.leaders.map(m => `
        <div class="team-member-card">
          <div style="width: 155px; height: 185px; margin: 0 auto 16px; border-radius: 20px; overflow: hidden; border: 2px solid var(--gold-border); box-shadow: var(--shadow-sm); background: #FAF7F2;">
            <img src="${escapeHtml(m.photo)}" alt="${escapeHtml(m.name)}" style="width: 100%; height: 100%; object-fit: cover;">
          </div>
          <span style="display: inline-block; padding: 4px 12px; border-radius: 100px; background: rgba(197, 155, 75, 0.12); color: var(--gold-dark); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px;">
            ${escapeHtml(m.badge)}
          </span>
          <h4 class="member-name">${escapeHtml(m.name)}</h4>
          <span class="member-role">${escapeHtml(m.role)}</span>
        </div>
      `).join('');
    }
  }

  /* ==========================================================================
     2. 3D Spotlight Book Physics
     ========================================================================== */
  function initBookPhysics() {
    if (!spotlightBook) return;

    let targetRotateX = -3;
    let targetRotateY = 14;
    let currentRotateX = 0;
    let currentRotateY = 0;
    let isHovered = false;

    spotlightBook.addEventListener('mousemove', (e) => {
      const rect = spotlightBook.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      targetRotateY = normX * 22;
      targetRotateX = -normY * 20;
      isHovered = true;

      const glare = spotlightBook.querySelector('.book-glare');
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.45) 0%, rgba(197,155,75,0.2) 40%, transparent 70%)`;
      }
    });

    spotlightBook.addEventListener('mouseleave', () => {
      targetRotateX = -3;
      targetRotateY = 14;
      isHovered = false;
    });

    function animateBook() {
      currentRotateX += (targetRotateX - currentRotateX) * 0.1;
      currentRotateY += (targetRotateY - currentRotateY) * 0.1;

      const book = spotlightBook.querySelector('.spotlight-book');
      if (book) {
        book.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) ${isHovered ? 'translateZ(20px)' : ''}`;
      }
      requestAnimationFrame(animateBook);
    }
    requestAnimationFrame(animateBook);
  }

  /* ==========================================================================
     3. Active Scroll-Spy
     ========================================================================== */
  function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    if (!sections.length || !navLinks.length) return;

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach(sec => observer.observe(sec));
  }

  /* ==========================================================================
     4. Header Scrolled Styling
     ========================================================================== */
  function handleWindowScroll() {
    if (window.scrollY > 30) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleWindowScroll, { passive: true });

  /* ==========================================================================
     5. Initialization
     ========================================================================== */
  function init() {
    syncMagazineData();
    initBookPhysics();
    initScrollSpy();
    handleWindowScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

})();
