/**
 * AnkurMitra Portal — Executive Dashboard & Product Logo Theme Engine
 * Ultra-premium, hyper-interactive controllers for Amreli District Operations Grid,
 * Welcome Dashboard Cockpit, Chart.js synchronizations, live operational pulse,
 * multi-cluster triage, and 5 official Product Logo Theme presets with light color palettes.
 */
(function(window, document) {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // 1. DESIGN THEME PRESETS ENGINE (LIGHT, CRISP & PROFESSIONAL PALETTES)
  // Matches exact 6 Themes from Design Theme Setting UI:
  // 1. Emerald Field  2. Sunbeam  3. Terracotta Soil  4. Monsoon Glass  5. Morning Mist  6. Ink & Paper
  // ─────────────────────────────────────────────────────────────────────────
  const THEME_PALETTES = {
    'emerald-field': {
      id: 'emerald-field',
      name: 'Emerald Field',
      primary: '#15803D',      // Botanical Forest Canopy
      primaryHover: '#166534',
      secondary: '#22C55E',    // Mint / Sprout
      secondaryHover: '#16A34A',
      accent: '#4ADE80',
      leaf: '#86EFAC',
      soil: '#B45309',
      canvas: '#F0FDF4',       // Mint Canvas
      badgeClass: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
      desc: 'Forest sidebar, mint canvas and crop-row texture. Brand-true.'
    },
    'sunbeam': {
      id: 'sunbeam',
      name: 'Sunbeam',
      primary: '#D97706',      // Solar Honey / Gold
      primaryHover: '#B45309',
      secondary: '#EAB308',    // Sunny Yellow
      secondaryHover: '#CA8A04',
      accent: '#FDE047',
      leaf: '#4ADE80',
      soil: '#92400E',
      canvas: '#FEFCE8',       // Cream Canvas
      badgeClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-200 dark:border-amber-800',
      desc: 'Cream canvas with sunny yellow pills. Friendly and bright.'
    },
    'terracotta-soil': {
      id: 'terracotta-soil',
      name: 'Terracotta Soil',
      primary: '#C2410C',      // Warm Terracotta / Rich Clay
      primaryHover: '#9A3412',
      secondary: '#EA580C',    // Vibrant Clay
      secondaryHover: '#C2410C',
      accent: '#FB923C',
      leaf: '#16A34A',
      soil: '#7C2D12',
      canvas: '#FFF7ED',       // Warm Paper
      badgeClass: 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-200 dark:border-orange-800',
      desc: 'Warm clay tones, serif headings and a paper grain.'
    },
    'monsoon-glass': {
      id: 'monsoon-glass',
      name: 'Monsoon Glass',
      primary: '#0284C7',      // Rain Cloud / Sky Cerulean
      primaryHover: '#0369A1',
      secondary: '#0EA5E9',    // Vibrant Sky
      secondaryHover: '#0284C7',
      accent: '#38BDF8',
      leaf: '#10B981',
      soil: '#475569',
      canvas: '#F0F9FF',       // Drifting Rain-Cloud Canvas
      badgeClass: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-200 dark:border-sky-800',
      desc: 'Frosted glass panels over drifting rain-cloud colour.'
    },
    'morning-mist': {
      id: 'morning-mist',
      name: 'Morning Mist',
      primary: '#0F766E',      // Executive Deep Teal / Crisp Slate
      primaryHover: '#115E59',
      secondary: '#10B981',    // Fresh Lime Glow
      secondaryHover: '#059669',
      accent: '#34D399',
      leaf: '#6EE7B7',
      soil: '#475569',
      canvas: '#F8FAFC',       // Clean Live Grid Slate
      badgeClass: 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300 border-teal-200 dark:border-teal-800',
      desc: 'Crisp executive slate with fresh lime glow and a clean live grid.'
    },
    'ink-paper': {
      id: 'ink-paper',
      name: 'Ink & Paper',
      primary: '#2563EB',      // Electric Blue Neo-Brutalist
      primaryHover: '#1D4ED8',
      secondary: '#3B82F6',
      secondaryHover: '#2563EB',
      accent: '#60A5FA',
      leaf: '#16A34A',
      soil: '#1E293B',
      canvas: '#FFFFFF',       // Clean Paper White
      badgeClass: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border-blue-200 dark:border-blue-800',
      desc: 'Hard borders, offset shadows, electric blue. Neo-brutalist.'
    }
  };

  // Backward-compatible aliases for legacy preset calls
  THEME_PALETTES['ankurmitra-harmony'] = THEME_PALETTES['emerald-field'];
  THEME_PALETTES['ankur-emerald'] = THEME_PALETTES['emerald-field'];
  THEME_PALETTES['mitra-sprout'] = THEME_PALETTES['emerald-field'];
  THEME_PALETTES['surya-gold'] = THEME_PALETTES['sunbeam'];
  THEME_PALETTES['dharati-soil'] = THEME_PALETTES['terracotta-soil'];

  function hexToRgba(hex, alpha) {
    let c;
    if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
      c = hex.substring(1).split('');
      if (c.length === 3) c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      c = '0x' + c.join('');
      return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
    }
    return hex;
  }

  /**
   * Applies one of the 6 Design Themes across the entire portal.
   * Updates CSS dataset attribute, live stylesheet override, localStorage, active cards, badges, and charts.
   */
  function selectDesignTheme(themeId, notify) {
    // Resolve alias if needed
    if (!THEME_PALETTES[themeId]) {
      themeId = 'emerald-field';
    }

    const theme = THEME_PALETTES[themeId];
    const canonicalId = theme.id;

    // 1. Set dataset attribute on html root for CSS variable scoping
    document.documentElement.setAttribute('data-theme-preset', canonicalId);

    // 2. Set direct CSS variables on root style for instantaneous override
    const rootStyle = document.documentElement.style;
    rootStyle.setProperty('--am-primary', theme.primary);
    rootStyle.setProperty('--am-primary-hover', theme.primaryHover);
    rootStyle.setProperty('--am-secondary', theme.secondary);
    rootStyle.setProperty('--am-secondary-hover', theme.secondaryHover);
    rootStyle.setProperty('--am-accent', theme.accent);
    rootStyle.setProperty('--am-leaf', theme.leaf);
    rootStyle.setProperty('--am-soil', theme.soil);
    rootStyle.setProperty('--am-canvas', theme.canvas);
    rootStyle.setProperty('--am-glow', hexToRgba(theme.primary, 0.35));
    rootStyle.setProperty('--am-gradient-brand', `linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%)`);
    rootStyle.setProperty('--portal-accent', theme.primary);
    rootStyle.setProperty('--portal-accent-hover', theme.primaryHover);
    rootStyle.setProperty('--portal-accent-border', theme.secondary);
    rootStyle.setProperty('--portal-accent-light', hexToRgba(theme.primary, 0.12));

    // Also update global currentPortalAccentColor if defined
    if (typeof window.currentPortalAccentColor !== 'undefined') {
      window.currentPortalAccentColor = theme.primary;
    }

    // 3. Inject or update dynamic stylesheet to enforce theme across all elements
    let dynStyle = document.getElementById('am-dynamic-theme-style');
    if (!dynStyle) {
      dynStyle = document.createElement('style');
      dynStyle.id = 'am-dynamic-theme-style';
      document.head.appendChild(dynStyle);
    }

    dynStyle.textContent = `
      :root {
        --am-primary: ${theme.primary} !important;
        --am-primary-hover: ${theme.primaryHover} !important;
        --am-secondary: ${theme.secondary} !important;
        --am-secondary-hover: ${theme.secondaryHover} !important;
        --am-accent: ${theme.accent} !important;
        --am-soil: ${theme.soil} !important;
        --am-leaf: ${theme.leaf} !important;
        --am-canvas: ${theme.canvas} !important;
        --am-glow: ${hexToRgba(theme.primary, 0.35)} !important;
        --am-gradient-brand: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%) !important;
        --portal-accent: ${theme.primary} !important;
        --portal-accent-hover: ${theme.primaryHover} !important;
        --portal-accent-border: ${theme.secondary} !important;
      }
      body:not(.dark) #mainScrollCanvas {
        background-color: ${theme.canvas} !important;
      }
      .child-nav-selected {
        background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%) !important;
        border-left: 3px solid ${theme.secondary} !important;
        color: #FFFFFF !important;
        box-shadow: 0 4px 14px -4px ${hexToRgba(theme.primary, 0.5)} !important;
      }
      .child-nav-selected svg {
        color: #FFFFFF !important;
        stroke: #FFFFFF !important;
      }
      .bg-\\[\\#0B6623\\],
      .bg-\\[\\#16A34A\\],
      [class*="bg-[#0B6623]"],
      [class*="bg-[#16A34A]"],
      .portal-accent-bg,
      .portal-pref-tab-btn.active,
      .appcfg-tab-btn.active,
      .mobile-cfg-tab-btn.active {
        background-color: ${theme.primary} !important;
      }
      button.bg-\\[\\#0B6623\\],
      a.bg-\\[\\#0B6623\\],
      button.bg-\\[\\#16A34A\\],
      a.bg-\\[\\#16A34A\\],
      .am-primary {
        background: linear-gradient(135deg, ${theme.primary} 0%, ${theme.secondary} 100%) !important;
        color: #FFFFFF !important;
        box-shadow: 0 4px 14px -4px ${hexToRgba(theme.primary, 0.5)} !important;
      }
      button.bg-\\[\\#0B6623\\]:hover,
      a.bg-\\[\\#0B6623\\]:hover,
      button.bg-\\[\\#16A34A\\]:hover,
      a.bg-\\[\\#16A34A\\]:hover,
      .hover\\:bg-\\[\\#074818\\]:hover,
      .hover\\:bg-\\[\\#09521C\\]:hover,
      .hover\\:bg-\\[\\#15803D\\]:hover {
        background-color: ${theme.primaryHover} !important;
        filter: brightness(1.06) !important;
      }
      .text-\\[\\#0B6623\\],
      .text-\\[\\#16A34A\\],
      [class*="text-[#0B6623]"],
      [class*="text-[#16A34A]"] {
        color: ${theme.primary} !important;
      }
      .border-\\[\\#0B6623\\],
      .border-\\[\\#16A34A\\],
      [class*="border-[#0B6623]"],
      [class*="border-[#16A34A]"] {
        border-color: ${theme.primary} !important;
      }
      .focus\\:border-\\[\\#0B6623\\]:focus,
      .focus\\:border-\\[\\#16A34A\\]:focus {
        border-color: ${theme.primary} !important;
      }
      .focus\\:ring-\\[\\#0B6623\\]:focus,
      .focus\\:ring-\\[\\#16A34A\\]:focus {
        --tw-ring-color: ${theme.primary} !important;
      }
      #portalTopProgressBar {
        background: linear-gradient(90deg, ${theme.primary}, ${theme.secondary}, ${theme.accent}) !important;
      }
      .design-theme-card.active-theme {
        border-color: ${theme.primary} !important;
        box-shadow: 0 0 0 1px ${theme.primary}, 0 8px 20px -6px ${hexToRgba(theme.primary, 0.4)} !important;
      }
      .theme-preset-card.active-theme {
        border-color: ${theme.primary} !important;
        box-shadow: 0 0 0 1px ${theme.primary}, 0 8px 20px -6px ${hexToRgba(theme.primary, 0.4)} !important;
      }
      .theme-preset-card.active-theme .theme-check-badge {
        background-color: ${theme.primary} !important;
        display: flex !important;
      }
    `;

    // 4. Persist in localStorage
    try {
      localStorage.setItem('ankurmitra_theme_preset', canonicalId);
    } catch (_) {}

    // 5. Update Active Theme Pill Badge in Appearance Setting View
    const pill = document.getElementById('activeDesignThemePill');
    if (pill) {
      pill.textContent = theme.name;
      pill.className = `px-3 py-1 rounded-full text-xs font-extrabold border shrink-0 self-start sm:self-auto ${theme.badgeClass}`;
    }

    // 6. Update Design Theme Cards Grid in Appearance Settings
    const designGrid = document.getElementById('designThemeCardsGrid');
    if (designGrid) {
      designGrid.querySelectorAll('.design-theme-card').forEach(card => {
        const cardTheme = card.getAttribute('data-theme');
        const check = card.querySelector('.theme-mockup-check');
        if (cardTheme === canonicalId) {
          card.classList.add('active-theme');
          card.classList.add('border-2');
          card.classList.remove('border');
          card.style.borderColor = theme.primary;
          if (check) check.classList.remove('hidden');
        } else {
          card.classList.remove('active-theme');
          card.classList.remove('border-2');
          card.classList.add('border');
          card.style.borderColor = '';
          if (check) check.classList.add('hidden');
        }
      });
    }

    // 7. Update Legacy Theme Preset Cards Grid if present
    const legacyGrid = document.getElementById('productLogoThemeCardsGrid');
    if (legacyGrid) {
      legacyGrid.querySelectorAll('.theme-preset-card').forEach(card => {
        const cardPreset = card.getAttribute('data-preset');
        if (cardPreset === canonicalId || cardPreset === themeId) {
          card.classList.add('active-theme');
          card.style.borderColor = theme.primary;
        } else {
          card.classList.remove('active-theme');
          card.style.borderColor = '';
        }
      });
    }

    // 8. Dynamic Chart recoloring
    updateChartsWithTheme(theme);

    // 9. Toast feedback if user-initiated
    if (notify && typeof window.showToast === 'function') {
      window.showToast(`Applied "${theme.name}" design theme!`, 'success');
    }
  }
  window.selectDesignTheme = selectDesignTheme;
  window.selectProductLogoTheme = selectDesignTheme;

  /**
   * Sets Portal Motion & Animation Mode: 'full', 'calm', or 'off'.
   * 'full': plays every entrance and ambient effect.
   * 'calm': keeps entrances only, stops continuous loops.
   * 'off': stops all animations and transitions.
   */
  function setPortalMotion(mode, notify) {
    if (!['full', 'calm', 'off'].includes(mode)) {
      mode = 'full';
    }

    document.documentElement.setAttribute('data-motion', mode);

    try {
      localStorage.setItem('ankurmitra_motion', mode);
    } catch (_) {}

    // Update segmented pill button states
    const modes = ['full', 'calm', 'off'];
    modes.forEach(m => {
      const cap = m.charAt(0).toUpperCase() + m.slice(1);
      const btn = document.getElementById('motionBtn' + cap);
      if (btn) {
        if (m === mode) {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0F172A] dark:text-white shadow-2xs';
        } else {
          btn.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 text-[#64748B] dark:text-slate-400 hover:text-[#0F172A] dark:hover:text-white';
        }
      }
    });

    if (notify && typeof window.showToast === 'function') {
      const label = mode === 'full' ? 'Full motion' : (mode === 'calm' ? 'Calm motion' : 'Motion paused');
      window.showToast(`${label} activated.`, 'info');
    }
  }
  window.setPortalMotion = setPortalMotion;

  /**
   * Sets Portal Theme Mode: 'light', 'dark', or 'system'.
   */
  function setPortalTheme(theme, showFeedback = true) {
    let effectiveDark = false;
    if (theme === 'dark') {
      effectiveDark = true;
    } else if (theme === 'system') {
      effectiveDark = !!(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
    }

    if (effectiveDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    try {
      localStorage.setItem('ankurmitra_theme', theme);
    } catch (_) {}

    // Update Appearance Settings Theme Cards
    ['light', 'dark', 'system'].forEach(mode => {
      const card = document.getElementById('themeCard-' + mode);
      const check = document.getElementById('themeCheck-' + mode);
      if (card) {
        if (mode === theme) {
          card.className = 'p-4 rounded-2xl border-2 border-[var(--am-primary,#16A34A)] bg-emerald-50/40 dark:bg-emerald-950/30 cursor-pointer transition relative group';
        } else {
          card.className = 'p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 cursor-pointer transition relative group hover:border-[var(--am-primary,#16A34A)]';
        }
      }
      if (check) {
        if (mode === theme) {
          check.classList.remove('hidden');
        } else {
          check.classList.add('hidden');
        }
      }
    });

    // Update Header Theme Toggle Button
    const themeBtn = document.getElementById('headerThemeToggleBtn');
    if (themeBtn) {
      const isDark = document.documentElement.classList.contains('dark');
      const icon = isDark ? 'sun' : 'moon';
      themeBtn.innerHTML = `<i data-lucide="${icon}" class="w-4 h-4"></i>`;
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch (_) {}
      }
    }

    if (showFeedback && typeof window.showToast === 'function') {
      window.showToast(`Applied ${theme.charAt(0).toUpperCase() + theme.slice(1)} theme mode.`, 'info');
    }
  }
  window.setPortalTheme = setPortalTheme;

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    setPortalTheme(isDark ? 'light' : 'dark', true);
  }
  window.toggleTheme = toggleTheme;

  // Listen to OS theme changes if user has 'system' active
  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      let saved = 'light';
      try { saved = localStorage.getItem('ankurmitra_theme'); } catch (_) {}
      if (saved === 'system') {
        setPortalTheme('system', false);
      }
    });
  }

  /**
   * Updates Chart.js charts with the active theme colors.
   */
  function updateChartsWithTheme(theme) {
    if (typeof Chart === 'undefined') return;

    const t = theme || THEME_PALETTES[document.documentElement.getAttribute('data-theme-preset')] || THEME_PALETTES['ankurmitra-harmony'];

    // 1. Sell vs Purchase Area Chart
    if (window.chartSellVsBuyInstance) {
      try {
        const ds = window.chartSellVsBuyInstance.data.datasets;
        if (ds[0]) {
          ds[0].borderColor = t.primary;
          ds[0].backgroundColor = hexToRgba(t.primary, 0.12);
        }
        if (ds[1]) {
          ds[1].borderColor = t.secondary;
        }
        window.chartSellVsBuyInstance.update();
      } catch (e) {
        console.warn('Could not update chartSellVsBuyInstance:', e);
      }
    }

    // 2. Users by Role Donut
    if (window.chartUsersByRoleInstance) {
      try {
        const ds = window.chartUsersByRoleInstance.data.datasets;
        if (ds[0]) {
          ds[0].backgroundColor = [t.accent, '#00A6C7', t.secondary, t.soil];
        }
        window.chartUsersByRoleInstance.update();
      } catch (e) {
        console.warn('Could not update chartUsersByRoleInstance:', e);
      }
    }

    // 3. Mandi Price Comparison Bar Chart
    if (window.chartMandiComparisonInstance) {
      try {
        const ds = window.chartMandiComparisonInstance.data.datasets;
        if (ds[0]) ds[0].backgroundColor = t.primary;
        if (ds[1]) ds[1].backgroundColor = '#94A3B8';
        window.chartMandiComparisonInstance.update();
      } catch (e) {
        console.warn('Could not update chartMandiComparisonInstance:', e);
      }
    }
  }
  window.updateChartsWithTheme = updateChartsWithTheme;

  // ─────────────────────────────────────────────────────────────────────────
  // 2. MANDI PRICE COMPARISON BAR CHART INITIALIZER
  // ─────────────────────────────────────────────────────────────────────────
  function initMandiComparisonChart() {
    const canvas = document.getElementById('chartMandiComparison');
    if (!canvas || typeof Chart === 'undefined') return;

    if (window.chartMandiComparisonInstance) {
      try { window.chartMandiComparisonInstance.destroy(); } catch (_) {}
    }

    const currentPreset = document.documentElement.getAttribute('data-theme-preset') || 'ankurmitra-harmony';
    const theme = THEME_PALETTES[currentPreset] || THEME_PALETTES['ankurmitra-harmony'];

    window.chartMandiComparisonInstance = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: ['Cotton Shanker-6', 'Groundnut Bold', 'Wheat Tukdi', 'Cumin Unjha-1'],
        datasets: [
          {
            label: 'AnkurMitra Farmgate Direct (₹/Qtl)',
            data: [7780, 7150, 3120, 29400],
            backgroundColor: theme.primary,
            borderRadius: 6,
            barPercentage: 0.7,
            categoryPercentage: 0.8
          },
          {
            label: 'APMC Mandi Yard (₹/Qtl)',
            data: [7450, 6820, 2940, 28500],
            backgroundColor: '#CBD5E1',
            borderRadius: 6,
            barPercentage: 0.7,
            categoryPercentage: 0.8
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            align: 'end',
            labels: {
              boxWidth: 10,
              boxHeight: 10,
              usePointStyle: true,
              pointStyle: 'circle',
              font: { size: 10, weight: '600' }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                return `${context.dataset.label}: ₹${context.raw.toLocaleString('en-IN')}/Qtl`;
              },
              footer: function(items) {
                if (items.length >= 2) {
                  const gain = items[0].raw - items[1].raw;
                  return `Direct Farmer Gain: +₹${gain.toLocaleString('en-IN')}/Qtl`;
                }
                return '';
              }
            }
          }
        },
        scales: {
          y: {
            grid: { color: 'rgba(226, 232, 240, 0.6)' },
            ticks: {
              font: { size: 10 },
              callback: function(val) {
                return '₹' + (val >= 1000 ? (val/1000) + 'k' : val);
              }
            }
          },
          x: {
            grid: { display: false },
            ticks: { font: { size: 10, weight: '600' } }
          }
        }
      }
    });
  }
  window.initMandiComparisonChart = initMandiComparisonChart;

  // ─────────────────────────────────────────────────────────────────────────
  // 3. DASHBOARD TIMEFRAME & REVENUE CONTROLLERS
  // ─────────────────────────────────────────────────────────────────────────
  const TIMEFRAME_DATA = {
    '7d': {
      labels: ['Oct 9', 'Oct 10', 'Oct 11', 'Oct 12', 'Oct 13', 'Oct 14', 'Oct 15'],
      sell: [720000, 740000, 765000, 780000, 795000, 810000, 820000],
      purchase: [380000, 390000, 395000, 400000, 405000, 415000, 420000]
    },
    '15d': {
      labels: ['Oct 1', 'Oct 4', 'Oct 7', 'Oct 10', 'Oct 13', 'Oct 15'],
      sell: [610000, 680000, 720000, 750000, 790000, 820000],
      purchase: [320000, 340000, 380000, 390000, 410000, 420000]
    },
    '30d': {
      labels: ['Sep 16', 'Sep 21', 'Sep 26', 'Oct 1', 'Oct 6', 'Oct 11', 'Oct 15'],
      sell: [480000, 530000, 590000, 640000, 710000, 780000, 820000],
      purchase: [240000, 270000, 310000, 340000, 370000, 395000, 420000]
    }
  };

  function setDashboardChartTimeframe(tf) {
    if (!window.chartSellVsBuyInstance || !TIMEFRAME_DATA[tf]) return;

    const data = TIMEFRAME_DATA[tf];
    window.chartSellVsBuyInstance.data.labels = data.labels;
    window.chartSellVsBuyInstance.data.datasets[0].data = data.sell;
    window.chartSellVsBuyInstance.data.datasets[1].data = data.purchase;
    window.chartSellVsBuyInstance.update();

    // Toggle button styles
    const container = document.querySelector('#view-dashboard div[onclick*="setDashboardChartTimeframe"]')?.parentElement;
    if (container) {
      container.querySelectorAll('button').forEach(btn => {
        if (btn.getAttribute('onclick')?.includes(`'${tf}'`)) {
          btn.className = 'px-2 py-0.5 text-[9px] font-bold rounded bg-white dark:bg-slate-700 text-[#0F172A] dark:text-white shadow-2xs';
        } else {
          btn.className = 'px-2 py-0.5 text-[9px] font-bold rounded text-[#64748B] hover:text-[#0F172A] dark:hover:text-white';
        }
      });
    }

    if (typeof window.showToast === 'function') {
      window.showToast(`Updated Sell vs Purchase timeframe to past ${tf.toUpperCase()}`, 'info');
    }
  }
  window.setDashboardChartTimeframe = setDashboardChartTimeframe;

  // ─────────────────────────────────────────────────────────────────────────
  // 4. INTERACTIVE AMRELI DISTRICT GEOGRAPHIC MAP CONTROLLER
  // ─────────────────────────────────────────────────────────────────────────
  const CLUSTER_DATA = {
    'sudavad': {
      title: 'Sudavad Cluster · 640 Farmers · 0 Input Dealers (Coverage Gap)',
      action: 'Jayesh Patel (4 acre cotton) • Active 12 min ago • Nearest dealer: Bagasara (11 km) • Pink bollworm window active',
      taluka: 'Sudavad'
    },
    'bagasara': {
      title: 'Bagasara Hub · 86 Dealers · 140 Retailers · Kishan Agro',
      action: 'Rameshbhai Patel • Stock buffer: 12 bags Urea (critically low) • 200 bags requested from central godown',
      taluka: 'Bagasara'
    },
    'amreli': {
      title: 'Amreli District HQ · 18 Industrial Processing Mills · Central APMC',
      action: 'Saurashtra Ginning Mill • Bulk purchase demand: 500 Quintals Shankar-6 Cotton at ₹7,780/Qtl premium',
      taluka: 'Amreli City'
    },
    'dhari': {
      title: 'Dhari Organic Belt · 120 Organic Farmers · Shetrunji River Valley',
      action: 'Pure Organic Sesame & Cumin cluster • Soil moisture 28% • Scheduled spray safe window open',
      taluka: 'Dhari Belt'
    }
  };

  function selectDashboardMapPin(pinId) {
    const data = CLUSTER_DATA[pinId];
    if (!data) return;

    const titleEl = document.getElementById('mapCalloutTitle');
    const actEl = document.getElementById('mapCalloutAction');

    if (titleEl) titleEl.textContent = data.title;
    if (actEl) actEl.textContent = data.action;

    // Pulse highlight the callout box
    const box = document.getElementById('mapCalloutBox');
    if (box) {
      box.classList.add('ring-2', 'ring-[#16A34A]');
      setTimeout(() => box.classList.remove('ring-2', 'ring-[#16A34A]'), 1200);
    }

    if (typeof window.showToast === 'function') {
      window.showToast(`Inspecting ${data.taluka} live cluster status`, 'info');
    }
  }
  window.selectDashboardMapPin = selectDashboardMapPin;

  function filterDashboardMapLayers(layer) {
    const pins = {
      farmer: document.getElementById('mapPinSudavad'),
      dealer: document.getElementById('mapPinBagasara'),
      industrial: document.getElementById('mapPinAmreli'),
      dhari: document.getElementById('mapPinDhari')
    };

    // Update layer buttons
    const btns = ['btnMapLayerAll', 'btnMapLayerFarmer', 'btnMapLayerDealer', 'btnMapLayerIndustrial', 'btnMapLayerGaps'];
    btns.forEach(id => {
      const b = document.getElementById(id);
      if (!b) return;
      b.className = 'px-2.5 py-1 text-[10px] font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-[#0F172A] dark:text-slate-300 hover:bg-slate-200';
    });

    const activeBtn = document.getElementById('btnMapLayer' + layer.charAt(0).toUpperCase() + layer.slice(1));
    if (activeBtn) {
      activeBtn.className = 'px-2.5 py-1 text-[10px] font-bold rounded-lg bg-[#16A34A] text-white shadow-2xs';
    }

    if (layer === 'all') {
      Object.values(pins).forEach(p => p && p.classList.remove('hidden'));
    } else if (layer === 'farmer') {
      if (pins.farmer) pins.farmer.classList.remove('hidden');
      if (pins.dhari) pins.dhari.classList.remove('hidden');
      if (pins.dealer) pins.dealer.classList.add('hidden');
      if (pins.industrial) pins.industrial.classList.add('hidden');
    } else if (layer === 'dealer') {
      if (pins.dealer) pins.dealer.classList.remove('hidden');
      if (pins.farmer) pins.farmer.classList.add('hidden');
      if (pins.industrial) pins.industrial.classList.add('hidden');
      if (pins.dhari) pins.dhari.classList.add('hidden');
    } else if (layer === 'industrial') {
      if (pins.industrial) pins.industrial.classList.remove('hidden');
      if (pins.farmer) pins.farmer.classList.add('hidden');
      if (pins.dealer) pins.dealer.classList.add('hidden');
      if (pins.dhari) pins.dhari.classList.add('hidden');
    } else if (layer === 'gaps') {
      if (pins.farmer) pins.farmer.classList.remove('hidden');
      if (pins.dealer) pins.dealer.classList.add('hidden');
      if (pins.industrial) pins.industrial.classList.add('hidden');
      if (pins.dhari) pins.dhari.classList.add('hidden');
      selectDashboardMapPin('sudavad');
    }
  }
  window.filterDashboardMapLayers = filterDashboardMapLayers;

  // ─────────────────────────────────────────────────────────────────────────
  // 5. LIVE OPS PULSE SIMULATOR & ADVISORY DISPATCH
  // ─────────────────────────────────────────────────────────────────────────
  const OPS_STREAM_EVENTS = [
    {
      msg: 'Farmer Jayesh Patel (Sudavad) locked 40 Quintals Shankar-6 Cotton with Saurashtra Ginning at ₹7,780/Qtl (+₹330 above Mandi)!',
      kpi: 'kpiSellGmv',
      delta: '₹ 8,51,200',
      tone: 'success'
    },
    {
      msg: 'Kishan Agro (Bagasara) received confirmation for 200 Bags IFFCO Neem Urea. Buffer replenishment dispatched from Rajkot Silo.',
      kpi: 'kpiDeliveries',
      delta: '22',
      tone: 'info'
    },
    {
      msg: 'APMC Price Flash: Gondal yard Groundnut jumped +₹42.50 to ₹6,820/Qtl. Arbitrage alert sent to registered growers.',
      kpi: 'kpiActive',
      delta: '318',
      tone: 'warn'
    },
    {
      msg: 'Agro-Met Radar: Humidity 54%, Wind 12 km/h SW in Amreli Central. Recommended micro-climate spray window remains SAFE.',
      kpi: 'kpiFarmers',
      delta: '1,244',
      tone: 'success'
    }
  ];

  let pulseEventIndex = 0;

  function simulateLiveOpsPulse() {
    const ev = OPS_STREAM_EVENTS[pulseEventIndex % OPS_STREAM_EVENTS.length];
    pulseEventIndex++;

    // Update target KPI with gentle glow
    if (ev.kpi) {
      const el = document.getElementById(ev.kpi);
      if (el) {
        el.textContent = ev.delta;
        el.classList.add('text-amber-500', 'scale-105', 'transition-transform');
        setTimeout(() => el.classList.remove('text-amber-500', 'scale-105'), 1200);
      }
    }

    // Flash live clock
    const clock = document.getElementById('dashLiveClock');
    if (clock) {
      const now = new Date();
      clock.textContent = now.toLocaleTimeString('en-IN', { hour12: false }) + ' IST · New Event Received';
      clock.classList.add('text-emerald-500', 'font-bold');
      setTimeout(() => clock.classList.remove('text-emerald-500', 'font-bold'), 2000);
    }

    if (typeof window.showToast === 'function') {
      window.showToast(ev.msg, ev.tone);
    }
  }
  window.simulateLiveOpsPulse = simulateLiveOpsPulse;

  // ─────────────────────────────────────────────────────────────────────────
  // 6. WELCOME DASHBOARD INTERACTIVE CONTROLLERS
  // ─────────────────────────────────────────────────────────────────────────
  const WELCOME_WEATHER_DATA = {
    'Amreli': { temp: '32°C', hum: '58%', wind: '12 km/h SW', soil: '26.4°C', spray: 'SPRAY STATUS: SAFE FOR APPLICATION' },
    'Bagasara': { temp: '33°C', hum: '52%', wind: '14 km/h W', soil: '27.1°C', spray: 'SPRAY STATUS: SAFE FOR APPLICATION' },
    'Dhari': { temp: '31°C', hum: '64%', wind: '9 km/h S', soil: '25.8°C', spray: 'SPRAY STATUS: SAFE FOR APPLICATION' },
    'Sudavad': { temp: '32.5°C', hum: '55%', wind: '11 km/h SW', soil: '26.8°C', spray: 'SPRAY WINDOW CLOSES AT 17:00 IST' }
  };

  function changeWelcomeTaluka(taluka) {
    const d = WELCOME_WEATHER_DATA[taluka] || WELCOME_WEATHER_DATA['Amreli'];
    const tEl = document.getElementById('welcomeWeatherTemp');
    const hEl = document.getElementById('welcomeWeatherHum');
    const wEl = document.getElementById('welcomeWeatherWind');
    const sEl = document.getElementById('welcomeWeatherSoil');
    const spEl = document.getElementById('welcomeWeatherSpray');

    if (tEl) tEl.textContent = d.temp;
    if (hEl) hEl.textContent = d.hum;
    if (wEl) wEl.textContent = d.wind;
    if (sEl) sEl.textContent = d.soil;
    if (spEl) spEl.textContent = d.spray;

    if (typeof window.showToast === 'function') {
      window.showToast(`Updated morning weather radar for ${taluka} (${d.temp})`, 'info');
    }
  }
  window.changeWelcomeTaluka = changeWelcomeTaluka;

  function calculateWelcomeMandiGain() {
    const input = document.getElementById('welcomeCalcQuintals');
    const resultEl = document.getElementById('welcomeCalcGainResult');
    if (!input || !resultEl) return;

    const q = parseFloat(input.value) || 0;
    const gain = q * 330; // +₹330 direct farmer premium per quintal
    resultEl.textContent = `+₹ ${gain.toLocaleString('en-IN')} Gain`;
  }
  window.calculateWelcomeMandiGain = calculateWelcomeMandiGain;

  function toggleWelcomeChecklist(checkbox) {
    if (!checkbox) return;
    const labelSpan = checkbox.parentElement.querySelector('span');
    if (checkbox.checked) {
      if (labelSpan) labelSpan.classList.add('line-through', 'opacity-70');
    } else {
      if (labelSpan) labelSpan.classList.remove('line-through', 'opacity-70');
    }

    const allCheckboxes = document.querySelectorAll('#view-welcome input[type="checkbox"][onchange*="toggleWelcomeChecklist"]');
    let completed = 0;
    allCheckboxes.forEach(cb => {
      if (cb.checked) completed++;
    });

    const total = allCheckboxes.length || 4;
    const pct = Math.round((completed / total) * 100);

    const bar = document.getElementById('welcomeChecklistProgressBar');
    const badge = document.getElementById('welcomeChecklistProgressBadge');

    if (bar) bar.style.width = pct + '%';
    if (badge) badge.textContent = `${completed}/${total} Done (${pct}%)`;

    if (completed === total && typeof window.showToast === 'function') {
      window.showToast('Excellent! All 4 morning shift operational checklists completed.', 'success');
    }
  }
  window.toggleWelcomeChecklist = toggleWelcomeChecklist;

  function approveWelcomeRx(farmerName, medicine) {
    const btn = window.event ? window.event.currentTarget : null;
    if (btn) {
      btn.outerHTML = '<span class="px-2.5 py-1 rounded-lg bg-emerald-100 text-[#16A34A] font-bold text-[10px] inline-flex items-center gap-1"><span>Approved ✓</span></span>';
    }

    if (typeof window.showToast === 'function') {
      window.showToast(`Prescription for "${medicine}" approved and sent to ${farmerName} on WhatsApp!`, 'success');
    }
  }
  window.approveWelcomeRx = approveWelcomeRx;

  const MORNING_PULSE_EVENTS = [
    'Farmer Jayesh Patel (Sudavad) confirmed morning harvest intake of 40 Quintals Shankar-6 Cotton!',
    'Kishan Agro (Bagasara) confirmed receipt of 200 bags Neem Urea buffer from Rajkot Silo.',
    'Gondal APMC morning auction: Groundnut opened at ₹6,820/q (+₹42.50 above baseline).',
    'Doppler Radar update: Micro-climate spray window confirmed Safe until 17:00 IST in Amreli District.'
  ];
  let morningPulseIdx = 0;

  function simulateWelcomePulse() {
    const msg = MORNING_PULSE_EVENTS[morningPulseIdx % MORNING_PULSE_EVENTS.length];
    morningPulseIdx++;

    const clock = document.getElementById('welcomeLiveClock');
    if (clock) {
      const now = new Date();
      clock.textContent = now.toLocaleTimeString('en-IN', { hour12: false }) + ' IST · Morning Pulse Received';
      clock.classList.add('text-emerald-500', 'font-bold');
      setTimeout(() => clock.classList.remove('text-emerald-500', 'font-bold'), 2000);
    }

    if (typeof window.showToast === 'function') {
      window.showToast(msg, 'success');
    }
  }
  window.simulateWelcomePulse = simulateWelcomePulse;

  // ─────────────────────────────────────────────────────────────────────────
  // 7. BROADCAST ADVISORY MODAL
  // ─────────────────────────────────────────────────────────────────────────
  function openBroadcastAdvisoryModal(targetVillage) {
    const modal = document.getElementById('broadcastAdvisoryModal');
    if (!modal) return;
    modal.classList.remove('hidden');

    if (targetVillage) {
      const sel = document.getElementById('broadcastTargetVillage');
      if (sel) sel.value = targetVillage;
    }

    if (window.lucide && typeof lucide.createIcons === 'function') {
      try { lucide.createIcons(); } catch (_) {}
    }
  }
  window.openBroadcastAdvisoryModal = openBroadcastAdvisoryModal;

  function closeBroadcastAdvisoryModal() {
    const modal = document.getElementById('broadcastAdvisoryModal');
    if (modal) modal.classList.add('hidden');
  }
  window.closeBroadcastAdvisoryModal = closeBroadcastAdvisoryModal;

  function submitBroadcastAdvisory(e) {
    if (e && e.preventDefault) e.preventDefault();

    const village = document.getElementById('broadcastTargetVillage')?.value || 'Sudavad';
    const aud = document.getElementById('broadcastAudience')?.value || 'farmers';
    const channel = document.getElementById('broadcastChannel')?.value || 'WhatsApp + Push';
    const title = document.getElementById('broadcastTitle')?.value || 'Cluster Advisory';

    closeBroadcastAdvisoryModal();

    if (typeof window.showToast === 'function') {
      window.showToast(`Advisory "${title}" sent to ${village} (${aud}) via ${channel}!`, 'success');
    }
  }
  window.submitBroadcastAdvisory = submitBroadcastAdvisory;

  // ─────────────────────────────────────────────────────────────────────────
  // 8. EXPORT DASHBOARD TELEMETRY REPORT
  // ─────────────────────────────────────────────────────────────────────────
  function exportDashboardData() {
    const csvContent =
      'Cluster,Farmers,Dealers,Retailers,Mills,Sell GMV (INR),Purchase GMV (INR),Top Commodity,Status\n' +
      'Sudavad,640,0,24,0,380000,140000,Cotton Shankar-6,Coverage Gap (0 Dealers)\n' +
      'Bagasara,290,86,65,2,240000,190000,Neem Urea,Active Supply Hub\n' +
      'Amreli City,190,12,38,16,160000,75000,Cotton F2I & Wheat,Industrial Milling HQ\n' +
      'Dhari Belt,120,4,13,0,40000,15000,Organic Groundnut,Organic Protected Valley\n';

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AnkurMitra_Amreli_Operations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (typeof window.showToast === 'function') {
      window.showToast('Downloaded Amreli District Operations CSV Report', 'success');
    }
  }
  window.exportDashboardData = exportDashboardData;

  // ─────────────────────────────────────────────────────────────────────────
  // 9. KPI CARD DRILLDOWNS & FILTERS
  // ─────────────────────────────────────────────────────────────────────────
  function drillDashboardKpi(kpiKey) {
    if (typeof window.navigateTo !== 'function') return;

    switch (kpiKey) {
      case 'farmers':
        window.navigateTo('user-list', 'Users', 'User list');
        break;
      case 'dealers':
        window.navigateTo('user-list', 'Users', 'User list');
        break;
      case 'retailers':
        window.navigateTo('user-list', 'Users', 'User list');
        break;
      case 'industrial':
        window.navigateTo('f2i-demands', 'Bulk', 'F2I demands');
        break;
      case 'active':
        window.navigateTo('live-pulse', 'Dashboard', 'Live pulse');
        break;
      case 'sell':
        window.navigateTo('sales-orders', 'Sales', 'Sales orders');
        break;
      case 'purchase':
        window.navigateTo('f2r-procurement', 'Procurement', 'F2R procurement');
        break;
      case 'deliveries':
        window.navigateTo('deliveries', 'Delivery', 'Deliveries');
        break;
      default:
        break;
    }
  }
  window.drillDashboardKpi = drillDashboardKpi;

  function selectDashboardTaluka(taluka) {
    const sel = document.getElementById('dashboardPlaceSelect');
    if (sel) {
      for (let i = 0; i < sel.options.length; i++) {
        if (sel.options[i].text.includes(taluka)) {
          sel.selectedIndex = i;
          break;
        }
      }
    }
    applyDashboardFilters();
  }
  window.selectDashboardTaluka = selectDashboardTaluka;

  function applyDashboardFilters() {
    const dateVal = document.getElementById('dashboardDateSelect')?.value || '1–15 October';
    const placeVal = document.getElementById('dashboardPlaceSelect')?.value || 'All';

    if (typeof window.showToast === 'function') {
      window.showToast(`Applied filter: ${placeVal} (${dateVal})`, 'info');
    }
  }
  window.applyDashboardFilters = applyDashboardFilters;

  function toggleDashboardRole(btn) {
    if (!btn) return;
    const isSelected = btn.classList.contains('bg-[#0B6623]') || btn.classList.contains('bg-[#16A34A]');
    if (isSelected) {
      btn.classList.remove('bg-[#0B6623]', 'bg-[#16A34A]', 'text-white');
      btn.classList.add('bg-slate-100', 'text-[#0F172A]', 'dark:bg-slate-800', 'dark:text-slate-300');
    } else {
      btn.classList.add('bg-[#16A34A]', 'text-white');
      btn.classList.remove('bg-slate-100', 'text-[#0F172A]', 'dark:bg-slate-800', 'dark:text-slate-300');
    }
  }
  window.toggleDashboardRole = toggleDashboardRole;

  // ─────────────────────────────────────────────────────────────────────────
  // 10. AUTOMATIC INITIALIZATION ON DOM READY & IMMEDIATE PRE-PAINT RESTORE
  // ─────────────────────────────────────────────────────────────────────────
  function initDashboardAndTheme() {
    // 1. Restore Theme Mode (Light / Dark / System)
    let savedMode = 'light';
    try {
      savedMode = localStorage.getItem('ankurmitra_theme') || 'light';
    } catch (_) {}
    setPortalTheme(savedMode, false);

    // 2. Restore Motion & Animation Mode (Full / Calm / Off)
    let savedMotion = 'full';
    try {
      savedMotion = localStorage.getItem('ankurmitra_motion') || 'full';
    } catch (_) {}
    setPortalMotion(savedMotion, false);

    // 3. Restore Design Theme Preset (Default: Emerald Field)
    let savedPreset = 'emerald-field';
    try {
      savedPreset = localStorage.getItem('ankurmitra_theme_preset') || 'emerald-field';
    } catch (_) {}
    selectDesignTheme(savedPreset, false);

    // 4. Initialize Mandi Comparison Bar Chart if canvas exists
    initMandiComparisonChart();

    // 5. Live Synchronized Dashboard Clock
    if (!window.dashClockInterval) {
      window.dashClockInterval = setInterval(() => {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IN', { hour12: false }) + ' IST';

        const el1 = document.getElementById('dashLiveClock');
        if (el1) el1.textContent = timeStr + ' · Live Telemetry';

        const el2 = document.getElementById('welcomeLiveClock');
        if (el2) el2.textContent = timeStr + ' · Shift A Operational';
      }, 1000);
    }
  }

  // Run immediately for instant theme variables & anti-flicker pre-paint
  try {
    const savedPreset = localStorage.getItem('ankurmitra_theme_preset') || 'emerald-field';
    selectDesignTheme(savedPreset, false);

    const savedMotion = localStorage.getItem('ankurmitra_motion') || 'full';
    setPortalMotion(savedMotion, false);

    const savedMode = localStorage.getItem('ankurmitra_theme') || 'light';
    setPortalTheme(savedMode, false);
  } catch (_) {}

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboardAndTheme);
  } else {
    initDashboardAndTheme();
  }

})(window, document);
