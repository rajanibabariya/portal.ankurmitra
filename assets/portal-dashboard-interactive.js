/**
 * AnkurMitra Portal — Executive Dashboard & Product Logo Theme Engine
 * Ultra-premium, hyper-interactive controllers for Amreli District Operations Grid,
 * Chart.js synchronizations, live operational pulse, multi-cluster triage,
 * and 5 official Product Logo Theme presets with light color palettes.
 */
(function(window, document) {
  'use strict';

  // ─────────────────────────────────────────────────────────────────────────
  // 1. PRODUCT LOGO THEME PRESETS ENGINE (LIGHT & VIBRANT PALETTES)
  // ─────────────────────────────────────────────────────────────────────────
  const THEME_PALETTES = {
    'ankurmitra-harmony': {
      id: 'ankurmitra-harmony',
      name: 'Light Harmonized Dual',
      primary: '#16A34A',      // Fresh Spring Emerald
      primaryHover: '#15803D',
      secondary: '#F59E0B',    // Radiant Solar Amber
      secondaryHover: '#D97706',
      accent: '#22C55E',       // Sprout Green
      leaf: '#4ADE80',
      soil: '#B45309',         // Warm Golden Sand
      canvas: '#F8FAF8',
      desc: 'Balanced dual harmony of crisp leaf canopy, warm sunrise glow, and fertile soil furrows.'
    },
    'ankur-emerald': {
      id: 'ankur-emerald',
      name: 'Light Ankur Emerald',
      primary: '#15803D',      // Botanical Forest Canopy
      primaryHover: '#166534',
      secondary: '#16A34A',    // Emerald Shoot
      secondaryHover: '#15803D',
      accent: '#22C55E',
      leaf: '#4ADE80',
      soil: '#B45309',
      canvas: '#F8FAF8',
      desc: 'Vibrant botanical green inspired by flourishing Saurashtra crop canopies and ANKUR text.'
    },
    'mitra-sprout': {
      id: 'mitra-sprout',
      name: 'Light Mitra Spring',
      primary: '#22C55E',      // Fresh Germinating Sprout
      primaryHover: '#16A34A',
      secondary: '#4ADE80',    // Spring Meadow
      secondaryHover: '#22C55E',
      accent: '#86EFAC',
      leaf: '#86EFAC',
      soil: '#B45309',
      canvas: '#F8FAF8',
      desc: 'Airy, energetic spring lime representing germination, partnership, and new beginnings.'
    },
    'surya-gold': {
      id: 'surya-gold',
      name: 'Light Surya Sunrise',
      primary: '#F59E0B',      // Radiant Solar Amber
      primaryHover: '#D97706',
      secondary: '#FBBF24',    // Morning Golden Ray
      secondaryHover: '#F59E0B',
      accent: '#FDE68A',
      leaf: '#4ADE80',
      soil: '#B45309',
      canvas: '#FFFDF7',
      desc: 'Warm sunrise gold bringing life to the fields and illuminating Saurashtra mornings.'
    },
    'dharati-soil': {
      id: 'dharati-soil',
      name: 'Light Dharati Sand',
      primary: '#B45309',      // Golden Sand & Furrow
      primaryHover: '#92400E',
      secondary: '#D97706',    // Warm Terracotta
      secondaryHover: '#B45309',
      accent: '#F59E0B',
      leaf: '#4ADE80',
      soil: '#B45309',
      canvas: '#FAF8F5',
      desc: 'Grounded organic warm bronze and golden earth tones honoring fertile agricultural furrows.'
    }
  };

  /**
   * Applies one of the 5 product logo themes.
   * Updates CSS dataset attribute, localStorage, settings cards, and active charts.
   */
  function selectProductLogoTheme(presetId, notify) {
    if (!THEME_PALETTES[presetId]) {
      presetId = 'ankurmitra-harmony';
    }

    const theme = THEME_PALETTES[presetId];

    // Set dataset attribute on html root for CSS variable scoping
    document.documentElement.setAttribute('data-theme-preset', presetId);

    // Persist in localStorage
    try {
      localStorage.setItem('ankurmitra_theme_preset', presetId);
    } catch (_) {}

    // Update Theme Selection Cards UI in Setting View
    const grid = document.getElementById('productLogoThemeCardsGrid');
    if (grid) {
      grid.querySelectorAll('.theme-preset-card').forEach(card => {
        const cardPreset = card.getAttribute('data-preset');
        if (cardPreset === presetId) {
          card.classList.add('active-theme', 'border-2', 'border-[#16A34A]');
          card.classList.remove('border-slate-200', 'dark:border-slate-700');
        } else {
          card.classList.remove('active-theme', 'border-2', 'border-[#16A34A]');
          card.classList.add('border', 'border-slate-200', 'dark:border-slate-700');
        }
      });
    }

    // Dynamic Chart recoloring
    updateChartsWithTheme(theme);

    // Toast feedback if user-initiated
    if (notify && typeof window.showToast === 'function') {
      window.showToast(`Applied "${theme.name}" theme based on AnkurMitra emblem!`, 'success');
    }
  }
  window.selectProductLogoTheme = selectProductLogoTheme;

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
  // 6. BROADCAST ADVISORY MODAL
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
  // 7. EXPORT DASHBOARD TELEMETRY REPORT
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
  // 8. KPI CARD DRILLDOWNS & FILTERS
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
  // 9. AUTOMATIC INITIALIZATION ON DOM READY
  // ─────────────────────────────────────────────────────────────────────────
  function initDashboardAndTheme() {
    // 1. Initialize saved product logo theme preset
    let savedPreset = 'ankurmitra-harmony';
    try {
      savedPreset = localStorage.getItem('ankurmitra_theme_preset') || 'ankurmitra-harmony';
    } catch (_) {}

    selectProductLogoTheme(savedPreset, false);

    // 2. Initialize Mandi Comparison Bar Chart
    initMandiComparisonChart();

    // 3. Live synchronized dashboard clock
    if (!window.dashClockInterval) {
      window.dashClockInterval = setInterval(() => {
        const el = document.getElementById('dashLiveClock');
        if (el) {
          const now = new Date();
          el.textContent = now.toLocaleTimeString('en-IN', { hour12: false }) + ' IST · Live Telemetry';
        }
      }, 1000);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboardAndTheme);
  } else {
    initDashboardAndTheme();
  }

})(window, document);
