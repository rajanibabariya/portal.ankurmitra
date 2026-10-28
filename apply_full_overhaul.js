/**
 * apply_full_overhaul.js
 * Applies the 2026 SaaS UI overhaul, fixes sidebar, logos, chevrons, charts,
 * and sets up clean module-wise structure.
 */

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

console.log('=== Applying Full Portal Overhaul ===');
console.log('Original index.html length:', html.length);

// ─── 1. OVERHAUL SIDEBAR ZONE A & ZONE C IN HTML ─────────────────────────────
const oldSidebarRegex = /<!-- ZONE A — TOP[\s\S]*?<\/aside>/;

const newSidebarHtml = `<!-- ZONE A — TOP, 100px, brand lockup -->
        <div id="sidebarZoneA" class="h-[100px] px-4 py-3 flex items-center justify-between border-b border-[#E5E7EB] flex-shrink-0 select-none bg-white transition-all duration-300">
          <div id="sidebarBrandFull" class="flex items-center gap-2.5 overflow-hidden">
            <!-- Official Product Logo -->
            <img id="sidebarLogo" src="assets/product_logo.png" alt="Ankurmitra" class="h-9 w-auto max-w-[90px] object-contain flex-shrink-0" onerror="this.onerror=null; if(!this.src.includes('../assets/')) this.src='assets/product_logo.png';">
            <div id="sidebarBrandText" class="flex flex-col overflow-hidden">
              <span class="text-xs font-black text-[#0B6623] tracking-wide leading-tight">ANKURMITRA</span>
              <span id="sidebarTagline" class="text-[10px] text-[#64748B] font-semibold tracking-tight truncate leading-tight">Smart companion for growth</span>
            </div>
          </div>
          <!-- Collapse/Expand icon button with inline SVG for 100% reliable rendering -->
          <button id="sidebarToggleBtn" onclick="toggleSidebarWidth()" class="text-[#64748B] hover:text-[#0B6623] hover:bg-[#F1F5F9] p-2 rounded-xl transition flex items-center justify-center flex-shrink-0 shadow-2xs" title="Collapse menu" aria-label="Collapse menu">
            <svg id="sidebarToggleIcon" class="w-4 h-4 transition-transform duration-200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2"></rect>
              <path d="M9 3v18"></path>
              <path d="m14 9-3 3 3 3"></path>
            </svg>
          </button>
        </div>

        <!-- ZONE B — MIDDLE, remaining height, this zone only may scroll -->
        <div id="sidebarZoneB" class="flex-1 overflow-y-auto px-3 py-4 space-y-1 pb-6 transition-all duration-300">
          <!-- Parent & Child navigation rows injected dynamically based on active role -->
        </div>

        <!-- ZONE C — BOTTOM BRAND STRIP. Mandatory 280px standard (76px collapsed) × 96px tall.
             Does not scroll. Does not hide. White fill, 1px #E5E7EB top line, 12px padding.
             Silver wordmark RUDRAM + full line 'Innovating Beyond Boundaries.' -->
        <div id="sidebarZoneC" class="w-full h-[96px] border-t border-[#E5E7EB] bg-white p-3 flex flex-col items-center justify-center text-center flex-shrink-0 select-none transition-all duration-300">
          <div id="sidebarRudramFull" class="flex flex-col items-center justify-center w-full">
            <div class="flex items-center justify-center gap-2 mb-1.5">
              <img src="assets/rudram.png" alt="RUDRAM" class="h-7 w-auto object-contain" onerror="this.onerror=null; if(!this.src.includes('../assets/')) this.src='assets/rudram.png';">
              <span class="font-black text-base tracking-widest text-slate-800">RUDRAM</span>
            </div>
            <div class="text-[11px] font-semibold text-[#64748B] tracking-wide">
              Innovating Beyond Boundaries.
            </div>
          </div>
          <div id="sidebarRudramMini" class="hidden flex items-center justify-center" title="Rudram — Innovating Beyond Boundaries.">
            <img src="assets/rudram.png" alt="RUDRAM" class="h-7 w-7 object-contain" onerror="this.onerror=null; if(!this.src.includes('../assets/')) this.src='assets/rudram.png';">
          </div>
        </div>

      </aside>`;

if (oldSidebarRegex.test(html)) {
  html = html.replace(oldSidebarRegex, newSidebarHtml);
  console.log('✅ Step 1: Overhauled Sidebar Zone A, B, C HTML');
} else {
  console.error('❌ Step 1 FAILED: Could not match oldSidebarRegex');
  process.exit(1);
}

// ─── 2. REWRITE safeDestroyChart ─────────────────────────────────────────────
const oldSafeStr = `    // Universal safe-destroy helper (Chart.js v4)
    function safeDestroyChart(canvasId) {
      try {
        const existing = Chart.getChart(canvasId);
        if (existing) existing.destroy();
      } catch(e) {}
    }`;

const newSafeDestroy = `    // Universal safe-destroy helper (Chart.js v4 + instances registry)
    function safeDestroyChart(canvasOrId) {
      try {
        const canvas = typeof canvasOrId === 'string' ? document.getElementById(canvasOrId) : canvasOrId;
        if (!canvas || typeof Chart === 'undefined') return;

        try {
          const existing = Chart.getChart(canvas);
          if (existing) existing.destroy();
        } catch (_) {}

        if (Chart.instances) {
          Object.keys(Chart.instances).forEach(id => {
            const inst = Chart.instances[id];
            if (inst && (inst.canvas === canvas || (inst.ctx && inst.ctx.canvas === canvas))) {
              try { inst.destroy(); } catch (_) {}
            }
          });
        }
      } catch (e) {
        console.warn('safeDestroyChart error:', e);
      }
    }`;

if (html.includes(oldSafeStr)) {
  html = html.replace(oldSafeStr, newSafeDestroy);
  console.log('✅ Step 2: Upgraded safeDestroyChart helper with Chart.instances registry safety');
} else {
  console.log('ℹ️ Step 2: safeDestroyChart pattern not matched directly, continuing...');
}

// ─── 3. REWRITE renderNavigationTree USING EXACT SUBSTRING MATCHING ───────────
const navTreeStart = html.indexOf('function renderNavigationTree(roleKey) {');
if (navTreeStart === -1) {
  console.error('❌ Step 3 FAILED: function renderNavigationTree not found');
  process.exit(1);
}
const navTreeEnd = html.indexOf('function renderInsightCharts() {', navTreeStart);
if (navTreeEnd === -1) {
  console.error('❌ Step 3 FAILED: function renderInsightCharts not found after renderNavigationTree');
  process.exit(1);
}

const newRenderNav = `function renderNavigationTree(roleKey) {
      const zoneB = document.getElementById('sidebarZoneB');
      if (!zoneB) return;
      zoneB.innerHTML = '';

      const tree = AM.navTrees[roleKey] || AM.navTrees.admin;

      if (isSidebarCollapsed) {
        // COLLAPSED RAIL MODE (76px width)
        zoneB.className = 'flex-1 overflow-y-auto px-2 py-3 space-y-2 pb-6 flex flex-col items-center';

        tree.forEach(parent => {
          const isParentActive = parent.children.some(c => c.id === currentActivePage) || parent.id === currentActivePage;
          const activeChild = parent.children.find(c => c.id === currentActivePage) || parent.children[0];

          const railBtn = document.createElement('button');
          railBtn.className = \`w-11 h-11 flex items-center justify-center rounded-xl transition group relative \${
            isParentActive
              ? 'bg-[#0B6623] text-white shadow-xs'
              : 'text-[#64748B] hover:bg-[#F1F5F9] hover:text-[#0F172A]'
          }\`;
          railBtn.setAttribute('title', \`\${parent.label}: \${activeChild.label}\`);
          railBtn.setAttribute('aria-label', \`\${parent.label}: \${activeChild.label}\`);
          railBtn.innerHTML = \`
            <i data-lucide="\${parent.icon}" class="w-5 h-5 \${isParentActive ? 'text-white' : 'text-[#0B6623]'}"></i>
            \${isParentActive ? '<span class="absolute right-1 top-1 w-2 h-2 rounded-full bg-[#7CB342] ring-2 ring-white"></span>' : ''}
          \`;

          railBtn.onclick = () => {
            navigateTo(activeChild.id, parent.label, activeChild.label);
          };

          zoneB.appendChild(railBtn);
        });
      } else {
        // FULL EXPANDED ACCORDION MODE (280px width)
        zoneB.className = 'flex-1 overflow-y-auto px-3 py-3 space-y-1 pb-6';

        tree.forEach((parent, pIdx) => {
          const isExpanded = parent.children.some(c => c.id === currentActivePage) || (pIdx === 0 && !tree.some(p => p.children.some(c => c.id === currentActivePage)));
          const parentDiv = document.createElement('div');
          parentDiv.className = 'space-y-0.5';

          // Parent Row (40px: 18px line icon, label 14 medium, smooth rotating SVG chevron)
          const parentRow = document.createElement('button');
          parentRow.className = 'w-full h-10 px-3 flex items-center justify-between text-[#0F172A] hover:bg-[#F1F5F9] rounded-xl text-sm font-medium transition group';
          parentRow.innerHTML = \`
            <div class="flex items-center gap-2.5">
              <i data-lucide="\${parent.icon}" class="w-4 h-4 text-[#0B6623]"></i>
              <span class="text-xs font-bold text-[#0F172A] group-hover:text-[#0B6623] transition-colors">\${parent.label}</span>
            </div>
            <svg class="nav-chevron w-3.5 h-3.5 text-[#64748B] transition-transform duration-200 \${isExpanded ? 'rotate-90' : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          \`;

          const childrenContainer = document.createElement('div');
          childrenContainer.className = \`space-y-0.5 \${isExpanded ? '' : 'hidden'}\`;

          // Child Rows (36px, indent 28px: 16px line icon, label 13)
          parent.children.forEach(child => {
            const isSelected = child.id === currentActivePage;
            const childBtn = document.createElement('button');
            childBtn.className = \`w-full h-9 pl-7 pr-3 flex items-center gap-2 text-xs font-semibold rounded-lg transition \${
              isSelected ? 'child-nav-selected shadow-xs' : 'text-[#64748B] hover:bg-[#F8FAFC] hover:text-[#0F172A]'
            }\`;
            childBtn.innerHTML = \`
              <i data-lucide="\${child.icon}" class="w-3.5 h-3.5 \${isSelected ? 'text-white' : 'text-[#64748B]'}"></i>
              <span>\${child.label}</span>
            \`;
            childBtn.onclick = () => {
              navigateTo(child.id, parent.label, child.label);
            };
            childrenContainer.appendChild(childBtn);
          });

          // Toggle accordion with smooth pure-CSS chevron rotation
          parentRow.onclick = () => {
            const isHidden = childrenContainer.classList.toggle('hidden');
            const chevron = parentRow.querySelector('.nav-chevron');
            if (chevron) {
              chevron.classList.toggle('rotate-90', !isHidden);
            }
          };

          parentDiv.appendChild(parentRow);
          parentDiv.appendChild(childrenContainer);
          zoneB.appendChild(parentDiv);
        });
      }

      // Re-initialize Lucide icons safely for Zone B
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try {
          lucide.createIcons();
        } catch (_) {}
      }
    }

    `;

html = html.substring(0, navTreeStart) + newRenderNav + html.substring(navTreeEnd);
console.log('✅ Step 3: Rewrote renderNavigationTree (clean boundary, pure SVG chevrons)');

// ─── 4. REWRITE renderInsightCharts WITH PER-CHART TRY/CATCH BLOCKS ────────────
const startIdx = html.indexOf('function renderInsightCharts() {');
if (startIdx !== -1) {
  const nextFnIdx = html.indexOf('function navigateTo(', startIdx);
  if (nextFnIdx !== -1) {
    const newInsightHtml = `function renderInsightCharts() {
      // 5. Active Time Line Chart (Farmer vs Dealer vs Retailer vs Industrial)
      try {
        const ctxActiveLine = document.getElementById('chartActiveTimeLine');
        if (ctxActiveLine && typeof Chart !== 'undefined') {
          safeDestroyChart('chartActiveTimeLine');
          chartActiveTimeLineInstance = new Chart(ctxActiveLine, {
            type: 'line',
            data: {
              labels: ['06h', '08h', '10h', '12h', '14h', '16h', '17h', '18h', '20h', '22h'],
              datasets: [
                { label: 'Farmer', data: [18, 142, 24, 46, 32, 88, 168, 72, 22, 8], borderColor: '#0B6623', tension: 0.35, borderWidth: 2, pointRadius: 2 },
                { label: 'Dealer', data: [5, 22, 35, 42, 30, 94, 184, 85, 26, 6], borderColor: '#F59E0B', tension: 0.35, borderWidth: 2, pointRadius: 2 },
                { label: 'Retailer', data: [8, 30, 54, 38, 28, 102, 190, 92, 30, 9], borderColor: '#00A6C7', tension: 0.35, borderWidth: 2, pointRadius: 2 },
                { label: 'Industrial', data: [2, 10, 48, 115, 95, 76, 50, 20, 7, 2], borderColor: '#9333EA', tension: 0.35, borderWidth: 2, pointRadius: 2 }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 9 }, color: '#64748B' } },
                x: { grid: { display: false }, ticks: { font: { size: 9 }, color: '#64748B' } }
              }
            }
          });
        }
      } catch (err) {
        console.warn('chartActiveTimeLine init skipped:', err.message);
      }

      // 6. Sell vs Buy Dual Area Chart
      try {
        const ctxDual = document.getElementById('chartSellVsBuyDual');
        if (ctxDual && typeof Chart !== 'undefined') {
          safeDestroyChart('chartSellVsBuyDual');
          chartSellVsBuyDualInstance = new Chart(ctxDual, {
            type: 'line',
            data: {
              labels: ['Oct 1', 'Oct 3', 'Oct 6', 'Oct 9', 'Oct 12', 'Oct 15'],
              datasets: [
                { label: 'Sell GMV', data: [610000, 680000, 720000, 750000, 790000, 820000], borderColor: '#0B6623', backgroundColor: 'rgba(11, 102, 35, 0.1)', fill: true, tension: 0.35, borderWidth: 2.5 },
                { label: 'Purchase GMV', data: [320000, 340000, 380000, 390000, 410000, 420000], borderColor: '#00A6C7', backgroundColor: 'rgba(0, 166, 199, 0.08)', fill: true, tension: 0.35, borderWidth: 2.5 }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 9 }, color: '#64748B', callback: v => '₹' + (v/1000) + 'k' } },
                x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#64748B' } }
              }
            }
          });
        }
      } catch (err) {
        console.warn('chartSellVsBuyDual init skipped:', err.message);
      }

      // 7. Sell vs Buy Stacked Bar Chart by Crop
      try {
        const ctxBars = document.getElementById('chartSellVsBuyBars');
        if (ctxBars && typeof Chart !== 'undefined') {
          safeDestroyChart('chartSellVsBuyBars');
          chartSellVsBuyBarsInstance = new Chart(ctxBars, {
            type: 'bar',
            data: {
              labels: ['Cotton', 'Groundnut', 'Wheat', 'Urea', 'Seed'],
              datasets: [
                { label: 'Sell Supply', data: [20, 45, 12, 0, 15], backgroundColor: '#0B6623', borderRadius: 6 },
                { label: 'Buy Demand', data: [100, 30, 60, 10, 40], backgroundColor: '#00A6C7', borderRadius: 6 }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { grid: { color: '#F1F5F9' }, ticks: { font: { size: 9 }, color: '#64748B' } },
                x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#64748B' } }
              }
            }
          });
        }
      } catch (err) {
        console.warn('chartSellVsBuyBars init skipped:', err.message);
      }

      // 8. Crop Intelligence Trend Line Chart
      try {
        const ctxTrend = document.getElementById('chartCropIntelTrend');
        if (ctxTrend && typeof Chart !== 'undefined') {
          safeDestroyChart('chartCropIntelTrend');
          chartCropIntelTrendInstance = new Chart(ctxTrend, {
            type: 'line',
            data: {
              labels: ['Oct 1', 'Oct 3', 'Oct 5', 'Oct 7', 'Oct 9', 'Oct 11', 'Oct 13', 'Oct 15'],
              datasets: [
                { label: 'Ankurmitra App (₹/Qtl)', data: [7050, 7080, 7120, 7150, 7180, 7200, 7200, 7200], borderColor: '#0B6623', backgroundColor: 'rgba(11, 102, 35, 0.05)', fill: true, borderWidth: 2.5, tension: 0.3 },
                { label: 'Amreli Mandi Yard (₹/Qtl)', data: [7000, 7020, 7060, 7090, 7110, 7130, 7140, 7150], borderColor: '#94A3B8', borderDash: [4, 4], borderWidth: 2, tension: 0.3 }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { min: 6900, max: 7300, grid: { color: '#F1F5F9' }, ticks: { font: { size: 9 }, color: '#64748B', callback: v => '₹' + v } },
                x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#64748B' } }
              }
            }
          });
        }
      } catch (err) {
        console.warn('chartCropIntelTrend init skipped:', err.message);
      }

      // 9. Channel Mix Donut Chart (10 Channels)
      try {
        const ctxMixDonut = document.getElementById('chartChannelMixDonut');
        if (ctxMixDonut && typeof Chart !== 'undefined') {
          safeDestroyChart('chartChannelMixDonut');
          chartChannelMixDonutInstance = new Chart(ctxMixDonut, {
            type: 'doughnut',
            data: {
              labels: ['F2I', 'F2R', 'F2C', 'F2W', 'F2A', 'F2F', 'F2N', 'CSA', 'F2H', 'F2G'],
              datasets: [{
                data: [31, 28, 8, 7, 6, 5, 5, 4, 3, 3],
                backgroundColor: [
                  '#7E22CE', '#00A6C7', '#0B6623', '#2563EB', '#F59E0B',
                  '#10B981', '#14B8A6', '#EC4899', '#6366F1', '#64748B'
                ],
                borderWidth: 2,
                borderColor: '#ffffff'
              }]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              cutout: '68%',
              plugins: { legend: { display: false } }
            }
          });
        }
      } catch (err) {
        console.warn('chartChannelMixDonut init skipped:', err.message);
      }

      // 10. Channel Mix Place Breakdown Bar Chart
      try {
        const ctxMixBars = document.getElementById('chartChannelMixBars');
        if (ctxMixBars && typeof Chart !== 'undefined') {
          safeDestroyChart('chartChannelMixBars');
          chartChannelMixBarsInstance = new Chart(ctxMixBars, {
            type: 'bar',
            data: {
              labels: ['Amreli', 'Bagasara', 'Sudavad'],
              datasets: [
                { label: 'Industrial (F2I)', data: [1420000, 180000, 450000], backgroundColor: '#7E22CE', borderRadius: 6 },
                { label: 'Retailer (F2R)', data: [380000, 940000, 210000], backgroundColor: '#00A6C7', borderRadius: 6 },
                { label: 'Direct / Farmer', data: [220000, 310000, 190000], backgroundColor: '#0B6623', borderRadius: 6 }
              ]
            },
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: { legend: { display: false } },
              scales: {
                y: { stacked: true, grid: { color: '#F1F5F9' }, ticks: { font: { size: 9 }, color: '#64748B', callback: v => '₹' + (v/100000) + 'L' } },
                x: { stacked: true, grid: { display: false }, ticks: { font: { size: 10 }, color: '#64748B' } }
              }
            }
          });
        }
      } catch (err) {
        console.warn('chartChannelMixBars init skipped:', err.message);
      }
    }`;
    html = html.substring(0, startIdx) + newInsightHtml + '\n\n    // Switch View\n    ' + html.substring(nextFnIdx);
    console.log('✅ Step 4: Replaced renderInsightCharts via substring matching');
  }
}

// ─── 5. UPDATE navigateTo CHART CALLS ──────────────────────────────────────────
const oldNavChartStart = html.indexOf('// Re-render charts');
if (oldNavChartStart !== -1) {
  const oldNavChartEnd = html.indexOf('// Handle Login Role Switcher', oldNavChartStart);
  if (oldNavChartEnd !== -1) {
    const newNavChartCalls = `// Re-render charts safely according to active view
      if (['dashboard', 'shop-dashboard', 'network-map', 'live-pulse'].includes(pageId)) {
        setTimeout(initCharts, 50);
      }
      if (['active-time', 'sell-vs-buy', 'growth-funnel', 'crop-intelligence', 'channel-mix'].includes(pageId)) {
        setTimeout(renderInsightCharts, 50);
      }
      if (['reports', 'reports-hub', 'sales-report', 'order-report', 'wallet-report', 'performance-reports', 'dealer-sales-report', 'crop-report', 'location-report', 'user-report', 'master-report'].includes(pageId)) {
        setTimeout(initReportCharts, 50);
      }
    }

    `;
    html = html.substring(0, oldNavChartStart) + newNavChartCalls + html.substring(oldNavChartEnd);
    console.log('✅ Step 5: Updated navigateTo chart triggers cleanly');
  }
}

// ─── 6. REWRITE toggleSidebarWidth ───────────────────────────────────────────
const toggleStart = html.indexOf('function toggleSidebarWidth() {');
if (toggleStart !== -1) {
  const toggleEnd = html.indexOf('function toggleMobileSidebar() {', toggleStart);
  if (toggleEnd !== -1) {
    const newToggleSidebar = `function toggleSidebarWidth() {
      const sb = document.getElementById('portalSidebar');
      const brandFull = document.getElementById('sidebarBrandFull');
      const brandText = document.getElementById('sidebarBrandText');
      const toggleBtn = document.getElementById('sidebarToggleBtn');
      const toggleIcon = document.getElementById('sidebarToggleIcon');
      const rudramFull = document.getElementById('sidebarRudramFull');
      const rudramMini = document.getElementById('sidebarRudramMini');
      const logo = document.getElementById('sidebarLogo');

      isSidebarCollapsed = !isSidebarCollapsed;

      if (isSidebarCollapsed) {
        sb.classList.remove('w-[280px]');
        sb.classList.add('w-[76px]');

        if (brandText) brandText.classList.add('hidden');
        if (logo) {
          logo.classList.remove('max-w-[90px]');
          logo.classList.add('w-8', 'h-8');
        }
        if (rudramFull) rudramFull.classList.add('hidden');
        if (rudramMini) rudramMini.classList.remove('hidden');

        if (toggleBtn) {
          toggleBtn.setAttribute('title', 'Expand menu');
          toggleBtn.setAttribute('aria-label', 'Expand menu');
        }
        if (toggleIcon) {
          toggleIcon.innerHTML = '<rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 3v18"></path><path d="m13 15 3-3-3-3"></path>';
        }
        showToast('Sidebar collapsed to compact rail mode', 'info');
      } else {
        sb.classList.remove('w-[76px]');
        sb.classList.add('w-[280px]');

        if (brandText) brandText.classList.remove('hidden');
        if (logo) {
          logo.classList.remove('w-8', 'h-8');
          logo.classList.add('max-w-[90px]');
        }
        if (rudramFull) rudramFull.classList.remove('hidden');
        if (rudramMini) rudramMini.classList.add('hidden');

        if (toggleBtn) {
          toggleBtn.setAttribute('title', 'Collapse menu');
          toggleBtn.setAttribute('aria-label', 'Collapse menu');
        }
        if (toggleIcon) {
          toggleIcon.innerHTML = '<rect width="18" height="18" x="3" y="3" rx="2"></rect><path d="M9 3v18"></path><path d="m14 9-3 3 3 3"></path>';
        }
        showToast('Sidebar expanded to standard 280px layout', 'info');
      }

      // Re-render Zone B for the newly toggled mode
      renderNavigationTree(currentRole);

      if (window.lucide && typeof lucide.createIcons === 'function') {
        try {
          lucide.createIcons();
        } catch (_) {}
      }
    }

    `;
    html = html.substring(0, toggleStart) + newToggleSidebar + html.substring(toggleEnd);
    console.log('✅ Step 6: Rewrote toggleSidebarWidth with inline SVG icon swap');
  } else {
    console.error('❌ Step 6 FAILED: function toggleMobileSidebar not found');
    process.exit(1);
  }
} else {
  console.error('❌ Step 6 FAILED: function toggleSidebarWidth not found');
  process.exit(1);
}

// ─── 7. TEST SYNTAX OF ALL SCRIPTS ───────────────────────────────────────────
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let sMatch;
let scriptIdx = 0;
while ((sMatch = scriptRegex.exec(html)) !== null) {
  const code = sMatch[1];
  if (!code || !code.trim()) continue;
  scriptIdx++;
  try {
    new vm.Script(code, { filename: `index.html-script-${scriptIdx}` });
  } catch (err) {
    console.error(`❌ Syntax error in Script #${scriptIdx}:`, err);
    throw err;
  }
}
console.log(`✅ Step 7: All ${scriptIdx} inline scripts compiled cleanly with 0 syntax errors.`);

// ─── 8. WRITE UPDATED index.html ─────────────────────────────────────────────
fs.writeFileSync(filePath, html, 'utf8');
console.log('✅ Step 8: Successfully wrote overhauled index.html! Length:', html.length);
