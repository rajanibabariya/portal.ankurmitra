// patch_orders_deliveries_sell_grid.js
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. ALL ORDERS (view-all-orders)
console.log('Patching view-all-orders...');
const ordersStart = html.indexOf('id="view-all-orders"');
const ordersTbodyIdx = html.indexOf('id="allOrdersTableBody"', ordersStart);
const ordersSub = html.substring(ordersStart, ordersTbodyIdx);
const ordersCardStartOffset = ordersSub.lastIndexOf('<div class="saas-card overflow-hidden">');
const ordersRealCardStart = ordersStart + ordersCardStartOffset;

// Insert switcher inside toolbar before ordersRealCardStart
const ordersToolbarClose = html.lastIndexOf('</div>', ordersRealCardStart - 1);
const ordersSwitcherHtml = `
              <!-- VIEW SWITCHER (Manage in Grid / Table View) -->
              <div class="inline-flex items-center p-1 bg-[#F1F5F9] dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700 ml-auto">
                <button id="ordersViewBtnGrid" onclick="setOrdersViewMode('grid')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer" title="Manage in Grid">
                  <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
                  <span>Manage in Grid</span>
                </button>
                <button id="ordersViewBtnTable" onclick="setOrdersViewMode('table')" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer" title="Table View">
                  <i data-lucide="table" class="w-3.5 h-3.5"></i>
                  <span>Table View</span>
                </button>
              </div>\n`;

html = html.substring(0, ordersToolbarClose) + ordersSwitcherHtml + html.substring(ordersToolbarClose);

// Recalculate
const ordersStartNew = html.indexOf('id="view-all-orders"');
const ordersTbodyIdxNew = html.indexOf('id="allOrdersTableBody"', ordersStartNew);
const ordersSubNew = html.substring(ordersStartNew, ordersTbodyIdxNew);
const ordersCardStartOffsetNew = ordersSubNew.lastIndexOf('<div class="saas-card overflow-hidden">');
const ordersRealCardStartNew = ordersStartNew + ordersCardStartOffsetNew;

const ordersGridContainerHtml = `<!-- VIEW 1: Orders Grid View Container (Manage in Grid) -->
            <div id="ordersGridView" class="space-y-4">
              <div id="ordersGridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <!-- Dynamically rendered by renderOrdersGrid() -->
              </div>
              <div id="ordersGridEmpty" class="hidden saas-card p-12 text-center space-y-3">
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-[#64748B] flex items-center justify-center">
                  <i data-lucide="shopping-cart" class="w-6 h-6"></i>
                </div>
                <div class="text-sm font-bold text-[#0F172A] dark:text-white">No orders match filters</div>
                <p class="text-xs text-[#64748B] max-w-sm mx-auto">No orders found matching the selected status or search query.</p>
              </div>
            </div>

            <!-- VIEW 2: Orders Table Card -->
            <div id="ordersTableView" class="saas-card overflow-hidden hidden">`;

html = html.substring(0, ordersRealCardStartNew) + ordersGridContainerHtml + html.substring(ordersRealCardStartNew + '<div class="saas-card overflow-hidden">'.length);
console.log('Patched view-all-orders successfully');

// 2. DELIVERIES (view-deliveries)
console.log('Patching view-deliveries...');
const delivStart = html.indexOf('id="view-deliveries"');
const delivTbodyIdx = html.indexOf('id="deliveriesTableBody"', delivStart);
const delivSub = html.substring(delivStart, delivTbodyIdx);
const delivCardStartOffset = delivSub.lastIndexOf('<div class="saas-card overflow-hidden">');
const delivRealCardStart = delivStart + delivCardStartOffset;

const delivToolbarClose = html.lastIndexOf('</div>', delivRealCardStart - 1);
const delivSwitcherHtml = `
              <!-- VIEW SWITCHER (Manage in Grid / Table View) -->
              <div class="inline-flex items-center p-1 bg-[#F1F5F9] dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700 ml-auto">
                <button id="deliveriesViewBtnGrid" onclick="setDeliveriesViewMode('grid')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer" title="Manage in Grid">
                  <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
                  <span>Manage in Grid</span>
                </button>
                <button id="deliveriesViewBtnTable" onclick="setDeliveriesViewMode('table')" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer" title="Table View">
                  <i data-lucide="table" class="w-3.5 h-3.5"></i>
                  <span>Table View</span>
                </button>
              </div>\n`;

html = html.substring(0, delivToolbarClose) + delivSwitcherHtml + html.substring(delivToolbarClose);

// Recalculate
const delivStartNew = html.indexOf('id="view-deliveries"');
const delivTbodyIdxNew = html.indexOf('id="deliveriesTableBody"', delivStartNew);
const delivSubNew = html.substring(delivStartNew, delivTbodyIdxNew);
const delivCardStartOffsetNew = delivSubNew.lastIndexOf('<div class="saas-card overflow-hidden">');
const delivRealCardStartNew = delivStartNew + delivCardStartOffsetNew;

const delivGridContainerHtml = `<!-- VIEW 1: Deliveries Grid View Container (Manage in Grid) -->
            <div id="deliveriesGridView" class="space-y-4">
              <div id="deliveriesGridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <!-- Dynamically rendered by renderDeliveriesGrid() -->
              </div>
              <div id="deliveriesGridEmpty" class="hidden saas-card p-12 text-center space-y-3">
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-[#64748B] flex items-center justify-center">
                  <i data-lucide="truck" class="w-6 h-6"></i>
                </div>
                <div class="text-sm font-bold text-[#0F172A] dark:text-white">No dispatches match filters</div>
                <p class="text-xs text-[#64748B] max-w-sm mx-auto">No active vehicle dispatches match the selected route or status.</p>
              </div>
            </div>

            <!-- VIEW 2: Deliveries Table Card -->
            <div id="deliveriesTableView" class="saas-card overflow-hidden hidden">`;

html = html.substring(0, delivRealCardStartNew) + delivGridContainerHtml + html.substring(delivRealCardStartNew + '<div class="saas-card overflow-hidden">'.length);
console.log('Patched view-deliveries successfully');

// 3. SELL REQUESTS (view-sell-requests)
console.log('Patching view-sell-requests...');
const sellStart = html.indexOf('id="view-sell-requests"');
const sellTbodyIdx = html.indexOf('id="sellRequestsTableBody"', sellStart);
const sellSub = html.substring(sellStart, sellTbodyIdx);
const sellCardStartOffset = sellSub.lastIndexOf('<div class="saas-card overflow-hidden">');
const sellRealCardStart = sellStart + sellCardStartOffset;

const sellToolbarClose = html.lastIndexOf('</div>', sellRealCardStart - 1);
const sellSwitcherHtml = `
              <!-- VIEW SWITCHER (Manage in Grid / Table View) -->
              <div class="inline-flex items-center p-1 bg-[#F1F5F9] dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700 ml-auto">
                <button id="sellRequestsViewBtnGrid" onclick="setSellRequestsViewMode('grid')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer" title="Manage in Grid">
                  <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
                  <span>Manage in Grid</span>
                </button>
                <button id="sellRequestsViewBtnTable" onclick="setSellRequestsViewMode('table')" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer" title="Table View">
                  <i data-lucide="table" class="w-3.5 h-3.5"></i>
                  <span>Table View</span>
                </button>
              </div>\n`;

html = html.substring(0, sellToolbarClose) + sellSwitcherHtml + html.substring(sellToolbarClose);

// Recalculate
const sellStartNew = html.indexOf('id="view-sell-requests"');
const sellTbodyIdxNew = html.indexOf('id="sellRequestsTableBody"', sellStartNew);
const sellSubNew = html.substring(sellStartNew, sellTbodyIdxNew);
const sellCardStartOffsetNew = sellSubNew.lastIndexOf('<div class="saas-card overflow-hidden">');
const sellRealCardStartNew = sellStartNew + sellCardStartOffsetNew;

const sellGridContainerHtml = `<!-- VIEW 1: Sell Requests Grid View Container (Manage in Grid) -->
            <div id="sellRequestsGridView" class="space-y-4">
              <div id="sellRequestsGridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <!-- Dynamically rendered by renderSellRequestsGrid() -->
              </div>
              <div id="sellRequestsGridEmpty" class="hidden saas-card p-12 text-center space-y-3">
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-[#64748B] flex items-center justify-center">
                  <i data-lucide="tag" class="w-6 h-6"></i>
                </div>
                <div class="text-sm font-bold text-[#0F172A] dark:text-white">No sell requests match</div>
                <p class="text-xs text-[#64748B] max-w-sm mx-auto">No procurement bids or sell requests found matching the current criteria.</p>
              </div>
            </div>

            <!-- VIEW 2: Sell Requests Table Card -->
            <div id="sellRequestsTableView" class="saas-card overflow-hidden hidden">`;

html = html.substring(0, sellRealCardStartNew) + sellGridContainerHtml + html.substring(sellRealCardStartNew + '<div class="saas-card overflow-hidden">'.length);
console.log('Patched view-sell-requests successfully');

// 4. ADD JS CONTROLLER FOR ORDERS, DELIVERIES, AND SELL REQUESTS
const extraControllersJs = `// ─── ORDERS, DELIVERIES & SELL REQUESTS GRID CONTROLLERS ───────────────────

    function setOrdersViewMode(mode) {
      try { localStorage.setItem('ankurmitra_orders_view_mode', mode); } catch (_) {}
      const g = document.getElementById('ordersGridView');
      const t = document.getElementById('ordersTableView');
      const bg = document.getElementById('ordersViewBtnGrid');
      const bt = document.getElementById('ordersViewBtnTable');
      if (mode === 'grid') {
        if (g) g.classList.remove('hidden');
        if (t) t.classList.add('hidden');
        if (bg) bg.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
        if (bt) bt.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
      } else {
        if (g) g.classList.add('hidden');
        if (t) t.classList.remove('hidden');
        if (bg) bg.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
        if (bt) bt.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
      }
      renderOrdersGrid();
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    }

    function renderOrdersGrid() {
      const container = document.getElementById('ordersGridContainer');
      const tbody = document.getElementById('allOrdersTableBody');
      if (!container || !tbody) return;
      const rows = Array.from(tbody.querySelectorAll('tr'));
      container.innerHTML = rows.map((r, i) => {
        const id = (r.innerText.match(/ORD-[0-9]+/i) || [])[0] || ('ORD-100' + (i+1));
        const status = r.innerText.includes('Delivered') ? 'Delivered' : (r.innerText.includes('Intake') ? 'Gate Intake' : 'In Transit');
        const buyer = (r.innerText.match(/Patel Agro|Kuldevi Kirana|Kishan Agro|Amreli APMC|Saurashtra Ginning/i) || [])[0] || 'Procurement Partner';
        const crop = (r.innerText.match(/Cotton|Groundnut|Wheat|Urea|DAP|Cumin/i) || [])[0] || 'Agricultural Lot';
        
        return \`
          <div class="orders-grid-card saas-card p-4 hover:shadow-md transition-all duration-200 flex flex-col justify-between border border-[#E2E8F0] dark:border-slate-800 rounded-2xl group bg-white dark:bg-slate-900" data-status="\${status}">
            <div>
              <div class="flex items-start justify-between gap-2 mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-10 h-10 rounded-xl font-bold flex items-center justify-center shadow-xs bg-emerald-100 text-[#0B6623] dark:bg-emerald-950/60 dark:text-emerald-300">
                    <i data-lucide="shopping-bag" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-[#0F172A] dark:text-white leading-tight group-hover:text-[#0B6623] transition-colors">\${id}</h4>
                    <div class="text-[11px] text-[#64748B] mt-0.5 font-medium">\${buyer}</div>
                  </div>
                </div>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold \${status === 'Delivered' ? 'bg-emerald-100 text-[#0B6623]' : 'bg-amber-100 text-amber-800'}">
                  \${status}
                </span>
              </div>
              <div class="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-[#E2E8F0] dark:border-slate-700/80 mb-3 space-y-1.5 text-xs">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-[#64748B]">Commodity:</span>
                  <span class="font-bold text-[#0F172A] dark:text-white">\${crop}</span>
                </div>
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-[#64748B]">Escrow Status:</span>
                  <span class="font-bold text-emerald-600">Fund Secured</span>
                </div>
              </div>
            </div>
            <div class="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center gap-2">
              <button onclick="showToast('Loading order \${id} details...', 'info')" class="flex-1 h-8 px-3 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i> Details
              </button>
            </div>
          </div>
        \`;
      }).join('');
    }

    function setDeliveriesViewMode(mode) {
      try { localStorage.setItem('ankurmitra_deliveries_view_mode', mode); } catch (_) {}
      const g = document.getElementById('deliveriesGridView');
      const t = document.getElementById('deliveriesTableView');
      const bg = document.getElementById('deliveriesViewBtnGrid');
      const bt = document.getElementById('deliveriesViewBtnTable');
      if (mode === 'grid') {
        if (g) g.classList.remove('hidden');
        if (t) t.classList.add('hidden');
        if (bg) bg.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
        if (bt) bt.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
      } else {
        if (g) g.classList.add('hidden');
        if (t) t.classList.remove('hidden');
        if (bg) bg.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
        if (bt) bt.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
      }
      renderDeliveriesGrid();
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    }

    function renderDeliveriesGrid() {
      const container = document.getElementById('deliveriesGridContainer');
      const tbody = document.getElementById('deliveriesTableBody');
      if (!container || !tbody) return;
      const rows = Array.from(tbody.querySelectorAll('tr'));
      container.innerHTML = rows.map((r, i) => {
        const id = (r.innerText.match(/TRK-[0-9]+|DEL-[0-9]+/i) || [])[0] || ('DEL-200' + (i+1));
        const driver = (r.innerText.match(/Kishore|Bipin|Nitin|Ramesh|Mansukh/i) || [])[0] || 'Assigned Driver';
        const route = (r.innerText.match(/Sudavad to|Bagasara to|Amreli to/i) || [])[0] ? 'Saurashtra Corridor' : 'Regional Express';
        const status = r.innerText.includes('Delivered') ? 'Delivered' : 'On Route';

        return \`
          <div class="deliveries-grid-card saas-card p-4 hover:shadow-md transition-all duration-200 flex flex-col justify-between border border-[#E2E8F0] dark:border-slate-800 rounded-2xl group bg-white dark:bg-slate-900" data-status="\${status}">
            <div>
              <div class="flex items-start justify-between gap-2 mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-10 h-10 rounded-xl font-bold flex items-center justify-center shadow-xs bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                    <i data-lucide="truck" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-[#0F172A] dark:text-white leading-tight group-hover:text-[#0B6623] transition-colors">\${id}</h4>
                    <div class="text-[11px] text-[#64748B] mt-0.5 font-medium">Driver: \${driver}</div>
                  </div>
                </div>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold \${status === 'Delivered' ? 'bg-emerald-100 text-[#0B6623]' : 'bg-blue-100 text-blue-800'}">
                  \${status}
                </span>
              </div>
              <div class="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-[#E2E8F0] dark:border-slate-700/80 mb-3 space-y-1.5 text-xs">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-[#64748B]">Route:</span>
                  <span class="font-bold text-[#0F172A] dark:text-white">\${route}</span>
                </div>
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-[#64748B]">Telemetry:</span>
                  <span class="font-bold text-emerald-600 flex items-center gap-1">
                    <i data-lucide="navigation" class="w-3 h-3"></i> GPS Active
                  </span>
                </div>
              </div>
            </div>
            <div class="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center gap-2">
              <button onclick="openDeliveryTrackModal('\${id}')" class="flex-1 h-8 px-3 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer">
                <i data-lucide="navigation-2" class="w-3.5 h-3.5"></i> Live Track
              </button>
            </div>
          </div>
        \`;
      }).join('');
    }

    function setSellRequestsViewMode(mode) {
      try { localStorage.setItem('ankurmitra_sell_requests_view_mode', mode); } catch (_) {}
      const g = document.getElementById('sellRequestsGridView');
      const t = document.getElementById('sellRequestsTableView');
      const bg = document.getElementById('sellRequestsViewBtnGrid');
      const bt = document.getElementById('sellRequestsViewBtnTable');
      if (mode === 'grid') {
        if (g) g.classList.remove('hidden');
        if (t) t.classList.add('hidden');
        if (bg) bg.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
        if (bt) bt.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
      } else {
        if (g) g.classList.add('hidden');
        if (t) t.classList.remove('hidden');
        if (bg) bg.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
        if (bt) bt.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
      }
      renderSellRequestsGrid();
      if (window.lucide && typeof lucide.createIcons === 'function') lucide.createIcons();
    }

    function renderSellRequestsGrid() {
      const container = document.getElementById('sellRequestsGridContainer');
      const tbody = document.getElementById('sellRequestsTableBody');
      if (!container || !tbody) return;
      const rows = Array.from(tbody.querySelectorAll('tr'));
      container.innerHTML = rows.map((r, i) => {
        const id = (r.innerText.match(/SELL-[0-9]+|BID-[0-9]+/i) || [])[0] || ('REQ-300' + (i+1));
        const farmer = (r.innerText.match(/Jayesh|Ramesh|Kantibhai|Bhavna|Kishan/i) || [])[0] || 'Farmer Producer';
        const commodity = (r.innerText.match(/Cotton|Groundnut|Wheat|Sesame|Cumin/i) || [])[0] || 'Organic Produce';
        const status = r.innerText.includes('Approved') ? 'Approved' : 'Pending';

        return \`
          <div class="sell-requests-grid-card saas-card p-4 hover:shadow-md transition-all duration-200 flex flex-col justify-between border border-[#E2E8F0] dark:border-slate-800 rounded-2xl group bg-white dark:bg-slate-900" data-status="\${status}">
            <div>
              <div class="flex items-start justify-between gap-2 mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-10 h-10 rounded-xl font-bold flex items-center justify-center shadow-xs bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300">
                    <i data-lucide="tag" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-[#0F172A] dark:text-white leading-tight group-hover:text-[#0B6623] transition-colors">\${id}</h4>
                    <div class="text-[11px] text-[#64748B] mt-0.5 font-medium">Farmer: \${farmer}</div>
                  </div>
                </div>
                <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold \${status === 'Approved' ? 'bg-emerald-100 text-[#0B6623]' : 'bg-amber-100 text-amber-800'}">
                  \${status}
                </span>
              </div>
              <div class="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-[#E2E8F0] dark:border-slate-700/80 mb-3 space-y-1.5 text-xs">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-[#64748B]">Commodity:</span>
                  <span class="font-bold text-[#0F172A] dark:text-white">\${commodity}</span>
                </div>
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-[#64748B]">QC Benchmark:</span>
                  <span class="font-bold text-emerald-600">Grade-A Standard</span>
                </div>
              </div>
            </div>
            <div class="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center gap-2">
              <button onclick="approveSellRequest('\${id}')" class="flex-1 h-8 px-3 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer">
                <i data-lucide="check" class="w-3.5 h-3.5"></i> Approve
              </button>
            </div>
          </div>
        \`;
      }).join('');
    }

    window.setOrdersViewMode = setOrdersViewMode;
    window.renderOrdersGrid = renderOrdersGrid;
    window.setDeliveriesViewMode = setDeliveriesViewMode;
    window.renderDeliveriesGrid = renderDeliveriesGrid;
    window.setSellRequestsViewMode = setSellRequestsViewMode;
    window.renderSellRequestsGrid = renderSellRequestsGrid;

    \n    `;

const insertPos = html.indexOf('function openDeliveryTrackModal');
if (insertPos !== -1) {
  html = html.substring(0, insertPos) + extraControllersJs + html.substring(insertPos);
  console.log('Inserted Orders, Deliveries & Sell Requests controllers');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Saved index.html with all list and master grid views!');
