/**
 * RC TCET - VALERIE 7.1 Application Controller
 * Rotaract Club of Thakur College of Engineering & Technology (RID 3141)
 *
 * Implements:
 * 1. 3D Spotlight Book Physics with smooth lerp and glare tracking
 * 2. Dynamic rendering of The 7 Arched Perspectives with exact Heyzine #page/X links
 * 3. The Sevenfold Atlas with specific Heyzine #page/X deep links (+3 offset)
 * 4. Credits Section with Real Photos
 * 5. Robust IntersectionObserver Scroll-Spy
 * 6. Mobile Navigation Drawer (Open, Close, Backdrop Click, Touch navigation)
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

  // Mobile Drawer Elements
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

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
          <div class="member-photo-frame">
            <img src="${escapeHtml(m.photo)}" alt="${escapeHtml(m.name)}" class="member-photo-img" loading="lazy">
          </div>
          <span class="member-badge">
            ${escapeHtml(m.badge)}
          </span>
          <h4 class="member-name">${escapeHtml(m.name)}</h4>
          <span class="member-role">${escapeHtml(m.role)}</span>
        </div>
      `).join('');
    }

    // Render Supporting Team dynamically from data store
    const supportingMembersContainer = document.querySelector('.supporting-team-members');
    if (supportingMembersContainer && MAGAZINE_CONFIG.credits && MAGAZINE_CONFIG.credits.supporting) {
      supportingMembersContainer.innerHTML = MAGAZINE_CONFIG.credits.supporting.map(s => `
        <span class="supporting-member-pill">
          <span class="gold-sparkle">✦</span>
          <span>${escapeHtml(s.name)}</span>
        </span>
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

    let closeTimer = null;

    function openSpread() {
      if (closeTimer) {
        clearTimeout(closeTimer);
        closeTimer = null;
      }
      if (window.innerWidth > 860) {
        spotlightBook.classList.add('is-open');
      }
    }

    function scheduleCloseSpread() {
      if (closeTimer) clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        targetRotateX = -3;
        targetRotateY = 14;
        isHovered = false;
        spotlightBook.classList.remove('is-open', 'is-force-open');
      }, 280); // 280ms grace window eliminates all boundary/corner flicker
    }

    const stage = document.querySelector('.hero-spotlight-stage');

    if (stage) {
      stage.addEventListener('mousemove', (e) => {
        openSpread();
        const isDesktop = window.innerWidth > 860;
        const rect = stage.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normX = (x / rect.width) * 2 - 1;
        const normY = (y / rect.height) * 2 - 1;

        if (isDesktop) {
          targetRotateY = normX * 10;
          targetRotateX = -normY * 7;
        } else {
          targetRotateY = normX * 16;
          targetRotateX = -normY * 14;
        }
        isHovered = true;

        const glare = spotlightBook.querySelector('.book-glare');
        if (glare) {
          glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.45) 0%, rgba(197,155,75,0.2) 40%, transparent 70%)`;
        }
      });

      stage.addEventListener('mouseenter', openSpread);
      stage.addEventListener('mouseleave', scheduleCloseSpread);
    }

    // Direct listener on spotlightBook as well to reinforce zero-glitch hover
    spotlightBook.addEventListener('mouseenter', openSpread);
    spotlightBook.addEventListener('mousemove', openSpread);
    spotlightBook.addEventListener('mouseleave', scheduleCloseSpread);

    // On laptop, clicking Credits & Team smoothly navigates to hero and flips book open
    document.querySelectorAll('a[href="#credits"]').forEach(link => {
      link.addEventListener('click', (e) => {
        if (window.innerWidth > 860) {
          e.preventDefault();
          const hero = document.getElementById('hero');
          if (hero) {
            hero.scrollIntoView({ behavior: 'smooth' });
          }
          if (spotlightBook) {
            spotlightBook.classList.add('is-force-open');
            setTimeout(() => {
              spotlightBook.classList.remove('is-force-open');
            }, 5500);
          }
        }
      });
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
    if (!sections.length) return;

    // Desktop nav link click
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinks.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      });
    });

    // Mobile nav link click
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeMobileNav();
        mobileNavLinks.forEach(l => l.classList.remove('active'));
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
          // Update desktop links
          navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === currentId) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
          // Update mobile links
          mobileNavLinks.forEach(link => {
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
     4. Mobile Navigation Drawer Controller
     ========================================================================== */
  function openMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.add('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('open');
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    if (mobileMenuBtn) mobileMenuBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function initMobileNav() {
    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openMobileNav);
    if (mobileNavClose) mobileNavClose.addEventListener('click', closeMobileNav);
    if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileNav);

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileNavDrawer && mobileNavDrawer.classList.contains('open')) {
        closeMobileNav();
      }
    });
  }

  /* ==========================================================================
     5. Header Scrolled Styling
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
     6. Initialization
     ========================================================================== */
  function init() {
    syncMagazineData();
    initBookPhysics();
    initScrollSpy();
    initMobileNav();
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
