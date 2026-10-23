/**
 * RC TCET Magazine Web - Core Application Logic
 * Rotaract Club of Thakur College of Engineering & Technology (RID 3141)
 *
 * Implements:
 * 1. 3D Spotlight Stage with Physics Lerping & Heyzine link
 * 2. 3D Scroll-Driven Infinite Runway (Glides left-to-right, reverses on up-scroll)
 * 3. Year-by-Year Magazine Showcase Grid with dynamic filters & instant search
 * 4. Dynamic In-Page Magazine Manager (Add, Persist to LocalStorage, Export JSON)
 */

(function () {
  'use strict';

  // State
  let magazines = getStoredMagazines();
  let activeYearFilter = 'all';
  let searchQuery = '';
  let selectedCoverPreset = COVER_PRESETS[0].path;

  // DOM Elements
  const siteHeader = document.getElementById('siteHeader');
  const spotlightBook = document.getElementById('spotlightBook');
  const heroFlagshipBtn = document.getElementById('heroFlagshipBtn');
  const heroSpotlightCover = document.getElementById('heroSpotlightCover');
  const heroSpotlightYear = document.getElementById('heroSpotlightYear');
  const heroSpotlightTitle = document.getElementById('heroSpotlightTitle');

  const runwayViewport = document.getElementById('runwayViewport');
  const runwayTrack = document.getElementById('runwayTrack');
  const scrollIndicator = document.getElementById('scrollIndicator');
  const scrollIndicatorText = document.getElementById('scrollIndicatorText');

  const yearFilterTabs = document.getElementById('yearFilterTabs');
  const magazineSearchInput = document.getElementById('magazineSearchInput');
  const magazinesGrid = document.getElementById('magazinesGrid');

  const addMagazineModal = document.getElementById('addMagazineModal');
  const openAddModalBtn = document.getElementById('openAddModalBtn');
  const openAddModalBtn2 = document.getElementById('openAddModalBtn2');
  const closeAddModalBtn = document.getElementById('closeAddModalBtn');
  const addMagazineForm = document.getElementById('addMagazineForm');
  const presetCoversSelector = document.getElementById('presetCoversSelector');
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');
  const exportDataBtn = document.getElementById('exportDataBtn');
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  /* ==========================================================================
     1. Toast Notification Helper
     ========================================================================== */
  let toastTimer = null;
  function showToast(text) {
    if (toastTimer) clearTimeout(toastTimer);
    toastMessage.textContent = text;
    toastNotice.classList.add('show');
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 3500);
  }

  /* ==========================================================================
     2. Hero 3D Spotlight Book Physics
     ========================================================================== */
  function initHeroSpotlight() {
    const featured = magazines.find(m => m.featured) || magazines[0];
    if (!featured) return;

    // Update Hero elements
    heroSpotlightCover.src = featured.cover;
    heroSpotlightCover.alt = `${featured.title} Magazine Cover`;
    heroSpotlightYear.textContent = featured.year;
    heroSpotlightTitle.textContent = `${featured.title} • ${featured.subtitle || 'Edition'}`;
    spotlightBook.href = featured.heyzineUrl;
    heroFlagshipBtn.href = featured.heyzineUrl;
    heroFlagshipBtn.querySelector('span').textContent = `Read Latest Edition (${featured.title})`;

    // Physics Lerp for 3D Tilt
    let mouseX = 0, mouseY = 0;
    let currentRotateX = 0, currentRotateY = 0;
    let targetRotateX = -4, targetRotateY = 16; // default aesthetic rest angle
    let isHovered = false;

    spotlightBook.addEventListener('mousemove', (e) => {
      const rect = spotlightBook.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;

      targetRotateY = normX * 24;
      targetRotateX = -normY * 22;
      isHovered = true;

      const glare = spotlightBook.querySelector('.book-glare');
      if (glare) {
        glare.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.4) 0%, rgba(255,106,0,0.2) 40%, transparent 70%)`;
      }
    });

    spotlightBook.addEventListener('mouseleave', () => {
      targetRotateX = -4;
      targetRotateY = 16;
      isHovered = false;
    });

    function animateBook() {
      // Linear interpolation
      currentRotateX += (targetRotateX - currentRotateX) * 0.1;
      currentRotateY += (targetRotateY - currentRotateY) * 0.1;

      const bookEl = spotlightBook.querySelector('.spotlight-book');
      if (bookEl) {
        bookEl.style.transform = `rotateX(${currentRotateX}deg) rotateY(${currentRotateY}deg) ${isHovered ? 'translateZ(20px)' : ''}`;
      }
      requestAnimationFrame(animateBook);
    }
    requestAnimationFrame(animateBook);
  }

  /* ==========================================================================
     3. 3D Scroll-Driven Infinite Runway (Conveyor Belt)
     ========================================================================== */
  let runwayScrollOffset = 0;
  let lastWindowScrollY = window.scrollY;
  let isRunwayHovered = false;
  let isDraggingRunway = false;
  let dragStartX = 0;
  let dragStartOffset = 0;

  function renderRunway() {
    if (!runwayTrack) return;

    // To ensure infinite looping feel, repeat catalog items
    const repeatCount = Math.max(3, Math.ceil(12 / magazines.length));
    let displayList = [];
    for (let i = 0; i < repeatCount; i++) {
      displayList = displayList.concat(magazines);
    }

    runwayTrack.innerHTML = displayList.map((mag, idx) => `
      <a href="${escapeHtml(mag.heyzineUrl)}" target="_blank" rel="noopener noreferrer" class="runway-card-anchor" title="Read ${escapeHtml(mag.title)} on Heyzine">
        <div class="runway-card">
          <div class="runway-card-cover">
            <img src="${escapeHtml(mag.cover)}" alt="${escapeHtml(mag.title)}" loading="lazy">
          </div>
          <div class="runway-card-overlay">
            <div class="runway-card-top">
              <span class="card-year-badge">${escapeHtml(mag.year)}</span>
              <span class="card-heyzine-tag">
                <span>Heyzine</span>
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
              </span>
            </div>
            <div class="runway-card-bottom">
              <span class="card-edition-subtitle">${escapeHtml(mag.subtitle || mag.editionTag || 'RC TCET Edition')}</span>
              <h3 class="card-mag-title">${escapeHtml(mag.title)}</h3>
              <div class="card-action-bar">
                <span>Click to Read</span>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </a>
    `).join('');
  }

  function initRunwayInteractions() {
    // Pause runway shift on hover so cards are easy to click
    runwayViewport.addEventListener('mouseenter', () => { isRunwayHovered = true; });
    runwayViewport.addEventListener('mouseleave', () => { isRunwayHovered = false; isDraggingRunway = false; });

    // Drag / Swipe handling
    runwayViewport.addEventListener('mousedown', (e) => {
      isDraggingRunway = true;
      dragStartX = e.clientX;
      dragStartOffset = runwayScrollOffset;
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDraggingRunway) return;
      const deltaX = e.clientX - dragStartX;
      runwayScrollOffset = dragStartOffset - deltaX * 1.5;
      updateRunwayTransform();
    });

    window.addEventListener('mouseup', () => {
      isDraggingRunway = false;
    });

    // Touch swipe
    runwayViewport.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        isDraggingRunway = true;
        dragStartX = e.touches[0].clientX;
        dragStartOffset = runwayScrollOffset;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (!isDraggingRunway || e.touches.length !== 1) return;
      const deltaX = e.touches[0].clientX - dragStartX;
      runwayScrollOffset = dragStartOffset - deltaX * 1.5;
      updateRunwayTransform();
    }, { passive: true });

    window.addEventListener('touchend', () => {
      isDraggingRunway = false;
    });

    // Continuous smooth animation loop
    function runwayRenderLoop() {
      // Gentle auto-float when idle
      if (!isRunwayHovered && !isDraggingRunway) {
        runwayScrollOffset += 0.4;
      }
      updateRunwayTransform();
      requestAnimationFrame(runwayRenderLoop);
    }
    requestAnimationFrame(runwayRenderLoop);
  }

  function updateRunwayTransform() {
    if (!runwayTrack) return;
    const trackWidth = runwayTrack.scrollWidth / 2;
    if (trackWidth > 0) {
      if (runwayScrollOffset > trackWidth) {
        runwayScrollOffset -= trackWidth;
      } else if (runwayScrollOffset < 0) {
        runwayScrollOffset += trackWidth;
      }
    }
    runwayTrack.style.transform = `translateX(${-runwayScrollOffset}px) rotateY(-3deg)`;
  }

  /* Scroll event listener: coupling window scroll to runway horizontal slide */
  function handleWindowScroll() {
    const currentScrollY = window.scrollY;
    const deltaY = currentScrollY - lastWindowScrollY;

    // Header blur styling
    if (currentScrollY > 40) {
      siteHeader.classList.add('scrolled');
    } else {
      siteHeader.classList.remove('scrolled');
    }

    // Scroll runway translation:
    // Scroll down: slides left (advancing runway right-to-left)
    // Scroll up: slides right (reversing)
    if (!isDraggingRunway) {
      runwayScrollOffset += deltaY * 1.8;

      if (deltaY > 0) {
        scrollIndicator.classList.remove('scrolling-up');
        scrollIndicatorText.textContent = 'Scrolling Down (Gliding Forward)';
      } else if (deltaY < 0) {
        scrollIndicator.classList.add('scrolling-up');
        scrollIndicatorText.textContent = 'Scrolling Up (Gliding Reverse)';
      }
    }

    lastWindowScrollY = currentScrollY;
  }
  window.addEventListener('scroll', handleWindowScroll, { passive: true });

  /* ==========================================================================
     4. Magazines by Year & Tenure (Archive Grid)
     ========================================================================== */
  function renderYearFilterTabs() {
    if (!yearFilterTabs) return;

    // Collect distinct years from current magazines
    const yearsSet = new Set(magazines.map(m => m.year.trim()));
    const distinctYears = Array.from(yearsSet).sort((a, b) => b.localeCompare(a));

    const html = `
      <button class="year-tab-btn ${activeYearFilter === 'all' ? 'active' : ''}" data-year="all">All Tenures (${magazines.length})</button>
      ${distinctYears.map(yr => {
        const count = magazines.filter(m => m.year.trim() === yr).length;
        const isActive = activeYearFilter === yr ? 'active' : '';
        return `<button class="year-tab-btn ${isActive}" data-year="${escapeHtml(yr)}">${escapeHtml(yr)} (${count})</button>`;
      }).join('')}
    `;

    yearFilterTabs.innerHTML = html;

    // Attach click listeners to tabs
    yearFilterTabs.querySelectorAll('.year-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        activeYearFilter = btn.getAttribute('data-year');
        renderYearFilterTabs();
        renderMagazinesGrid();
      });
    });
  }

  function renderMagazinesGrid() {
    if (!magazinesGrid) return;

    // Filter by activeYear and searchQuery
    const query = searchQuery.trim().toLowerCase();
    const filtered = magazines.filter(mag => {
      const matchesYear = (activeYearFilter === 'all') || (mag.year.trim() === activeYearFilter);
      const matchesSearch = !query || 
        (mag.title && mag.title.toLowerCase().includes(query)) ||
        (mag.subtitle && mag.subtitle.toLowerCase().includes(query)) ||
        (mag.year && mag.year.toLowerCase().includes(query)) ||
        (mag.theme && mag.theme.toLowerCase().includes(query)) ||
        (mag.badge && mag.badge.toLowerCase().includes(query));
      return matchesYear && matchesSearch;
    });

    if (filtered.length === 0) {
      magazinesGrid.innerHTML = `
        <div class="grid-empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <h3>No Magazines Found</h3>
          <p>No publications match "${escapeHtml(searchQuery)}" for ${escapeHtml(activeYearFilter === 'all' ? 'any tenure' : activeYearFilter)}.</p>
          <button class="btn-secondary" id="clearFiltersBtn">Clear Filters</button>
        </div>
      `;
      const clearBtn = document.getElementById('clearFiltersBtn');
      if (clearBtn) {
        clearBtn.addEventListener('click', () => {
          activeYearFilter = 'all';
          searchQuery = '';
          magazineSearchInput.value = '';
          renderYearFilterTabs();
          renderMagazinesGrid();
        });
      }
      return;
    }

    magazinesGrid.innerHTML = filtered.map(mag => `
      <a href="${escapeHtml(mag.heyzineUrl)}" target="_blank" rel="noopener noreferrer" class="grid-card-anchor" title="Open ${escapeHtml(mag.title)} (${escapeHtml(mag.year)}) on Heyzine">
        <div class="grid-mag-card" data-id="${escapeHtml(mag.id)}">
          
          <div class="grid-card-media">
            <img src="${escapeHtml(mag.cover)}" alt="${escapeHtml(mag.title)}" loading="lazy">
            <div class="card-float-badges">
              <span class="badge-tenure">${escapeHtml(mag.year)}</span>
              ${mag.badge ? `<span class="badge-pill-accent">${escapeHtml(mag.badge)}</span>` : ''}
            </div>
          </div>

          <div class="grid-card-details">
            <span class="card-edition-meta">${escapeHtml(mag.subtitle || mag.editionTag || 'RC TCET Digital Edition')}</span>
            <h3 class="grid-card-title">${escapeHtml(mag.title)}</h3>
            <p class="card-theme-tagline">${escapeHtml(mag.theme || 'Words that Ignite, Stories that Inspire')}</p>
            
            <div class="btn-launch-heyzine">
              <span>Read on Heyzine</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                <polyline points="15 3 21 3 21 9"></polyline>
                <line x1="10" y1="14" x2="21" y2="3"></line>
              </svg>
            </div>
          </div>

        </div>
      </a>
    `).join('');

    // Attach dynamic 3D Card Gyro/Mouse Tilt to each grid card
    initGridCardsTilt();
  }

  function initGridCardsTilt() {
    const cards = magazinesGrid.querySelectorAll('.grid-mag-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const normX = (x / rect.width) * 2 - 1;
        const normY = (y / rect.height) * 2 - 1;
        card.style.transform = `perspective(1000px) rotateX(${-normY * 10}deg) rotateY(${normX * 12}deg) translateY(-8px)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
      });
    });
  }

  // Search input live listener
  if (magazineSearchInput) {
    magazineSearchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderMagazinesGrid();
    });
  }

  /* ==========================================================================
     5. Preset Cover Selector & Modal Management
     ========================================================================== */
  function renderPresetCovers() {
    if (!presetCoversSelector) return;

    presetCoversSelector.innerHTML = COVER_PRESETS.map((preset, idx) => `
      <div class="preset-thumb ${preset.path === selectedCoverPreset ? 'active' : ''}" data-path="${preset.path}" title="${preset.name}">
        <img src="${preset.path}" alt="${preset.name}">
      </div>
    `).join('');

    presetCoversSelector.querySelectorAll('.preset-thumb').forEach(thumb => {
      thumb.addEventListener('click', () => {
        selectedCoverPreset = thumb.getAttribute('data-path');
        renderPresetCovers();
        const customInput = document.getElementById('magCustomCoverInput');
        if (customInput) customInput.value = '';
      });
    });
  }

  function openModal() {
    renderPresetCovers();
    addMagazineModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    addMagazineModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (openAddModalBtn) openAddModalBtn.addEventListener('click', openModal);
  if (openAddModalBtn2) openAddModalBtn2.addEventListener('click', openModal);
  if (closeAddModalBtn) closeAddModalBtn.addEventListener('click', closeModal);

  // Close modal on outside backdrop click
  addMagazineModal.addEventListener('click', (e) => {
    if (e.target === addMagazineModal) closeModal();
  });

  // Close modal on Escape key press
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && addMagazineModal.classList.contains('active')) {
      closeModal();
    }
  });

  // Handle Form Submission: Add New Magazine
  if (addMagazineForm) {
    addMagazineForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const title = document.getElementById('magTitleInput').value.trim();
      const year = document.getElementById('magYearInput').value.trim();
      const subtitle = document.getElementById('magSubtitleInput').value.trim();
      const badge = document.getElementById('magBadgeInput').value.trim();
      const heyzineUrl = document.getElementById('magHeyzineInput').value.trim();
      const theme = document.getElementById('magThemeInput').value.trim();
      const customCover = document.getElementById('magCustomCoverInput').value.trim();

      const cover = customCover || selectedCoverPreset || 'assets/covers/cover_ignite.jpg';

      if (!title || !year || !heyzineUrl) {
        alert('Please fill out Title, Tenure/Year, and Heyzine URL.');
        return;
      }

      const newMagazine = {
        id: 'mag-' + Date.now(),
        title,
        subtitle: subtitle || 'Digital Edition',
        year,
        editionTag: subtitle || year,
        theme: theme || 'RC TCET Digital Publication',
        badge: badge || 'New Issue',
        cover,
        heyzineUrl,
        featured: false
      };

      // Add to beginning of catalog
      magazines.unshift(newMagazine);
      saveMagazines(magazines);

      // Re-render
      renderYearFilterTabs();
      renderMagazinesGrid();
      renderRunway();
      closeModal();
      addMagazineForm.reset();

      showToast(`Added "${title}" (${year}) to showcase!`);
    });
  }

  // Reset to Defaults
  if (resetDefaultsBtn) {
    resetDefaultsBtn.addEventListener('click', () => {
      if (confirm('Reset showcase catalog back to default RC TCET magazines?')) {
        magazines = resetMagazinesToDefault();
        activeYearFilter = 'all';
        searchQuery = '';
        renderYearFilterTabs();
        renderMagazinesGrid();
        renderRunway();
        initHeroSpotlight();
        closeModal();
        showToast('Showcase reset to default catalog.');
      }
    });
  }

  // Export JSON (for easy copy & pasting into Git repo)
  if (exportDataBtn) {
    exportDataBtn.addEventListener('click', () => {
      const jsonStr = JSON.stringify(magazines, null, 2);
      navigator.clipboard.writeText(jsonStr).then(() => {
        showToast('Catalog JSON copied to clipboard! Ready to paste into data.js');
      }).catch(() => {
        prompt('Copy your catalog JSON:', jsonStr);
      });
    });
  }

  /* ==========================================================================
     6. Initialization
     ========================================================================== */
  function init() {
    initHeroSpotlight();
    renderRunway();
    initRunwayInteractions();
    renderYearFilterTabs();
    renderMagazinesGrid();
    renderPresetCovers();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  /* Utility: HTML escaping */
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
