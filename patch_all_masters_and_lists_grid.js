// patch_all_masters_and_lists_grid.js
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// Backup
fs.writeFileSync(path.join(__dirname, 'index.html.bak_masters_grid'), html, 'utf8');
console.log('Backed up index.html');

// ─────────────────────────────────────────────────────────────────────────────
// 1. PATCH USER LIST (view-user-list)
// ─────────────────────────────────────────────────────────────────────────────
console.log('Patching view-user-list...');
const userListStart = html.indexOf('id="view-user-list"');
const userBtnNeedle = `<button onclick="openCreateUserForm()" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition">`;
const userBtnPos = html.indexOf(userBtnNeedle, userListStart);

if (userBtnPos === -1) {
  console.error('User list Add new button not found!');
  process.exit(1);
}

const userSwitcherHtml = `<!-- VIEW SWITCHER (Manage in Grid / Table View) -->
                  <div class="inline-flex items-center p-1 bg-[#F1F5F9] dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
                    <button id="userViewBtnGrid" onclick="setUserViewMode('grid')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer" title="Manage in Grid">
                      <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
                      <span>Manage in Grid</span>
                    </button>
                    <button id="userViewBtnTable" onclick="setUserViewMode('table')" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer" title="Table View">
                      <i data-lucide="table" class="w-3.5 h-3.5"></i>
                      <span>Table View</span>
                    </button>
                  </div>\n\n                  `;

html = html.substring(0, userBtnPos) + userSwitcherHtml + html.substring(userBtnPos);

// Now wrap table in view-user-list
const userTableCardNeedle = `<!-- Table Card (Prompt A03 Columns: Name, Role, Place, Mobile, Status, Action) -->\n            <div class="saas-card overflow-hidden">`;
const userTableCardPos = html.indexOf(userTableCardNeedle, userListStart);

if (userTableCardPos === -1) {
  console.error('User table card needle not found!');
  process.exit(1);
}

const userGridViewHtml = `<!-- VIEW 1: User Grid View Container (Manage in Grid) -->
            <div id="usersGridView" class="space-y-4">
              <div id="usersGridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <!-- Dynamically rendered by renderUsersTable() -->
              </div>

              <!-- Empty State for Users Grid -->
              <div id="usersGridEmpty" class="hidden saas-card p-12 text-center space-y-3">
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-[#64748B] flex items-center justify-center">
                  <i data-lucide="users" class="w-6 h-6"></i>
                </div>
                <div class="text-sm font-bold text-[#0F172A] dark:text-white">No users found</div>
                <p class="text-xs text-[#64748B] max-w-sm mx-auto">No user profiles match your search criteria. Try modifying your filter chips or query.</p>
                <button onclick="resetUserFilters()" class="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold rounded-lg text-[#0F172A] dark:text-white transition cursor-pointer">Reset Filters</button>
              </div>

              <!-- Grid Pagination / Count Footer -->
              <div class="saas-card p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
                <div class="flex items-center gap-2">
                  <span>Showing <span class="font-bold text-[#0F172A] dark:text-white" id="visibleUserCountGrid">0</span> of <span class="font-bold text-[#0F172A] dark:text-white" id="totalUserCountGrid">0</span> registered users in grid</span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-[#0B6623] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    <i data-lucide="sparkles" class="w-3 h-3"></i> Interactive Grid
                  </span>
                </div>
                <div class="flex items-center gap-1">
                  <button class="px-2.5 py-1 bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-xs font-semibold text-[#64748B] hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50" disabled>Previous</button>
                  <button class="px-2.5 py-1 bg-[#0B6623] text-white rounded-lg text-xs font-bold">1</button>
                  <button class="px-2.5 py-1 bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-xs font-semibold text-[#64748B] hover:bg-slate-50 dark:hover:bg-slate-700">2</button>
                  <button class="px-2.5 py-1 bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-xs font-semibold text-[#64748B] hover:bg-slate-50 dark:hover:bg-slate-700">Next</button>
                </div>
              </div>
            </div>

            <!-- VIEW 2: User Table Card -->
            <div id="usersTableView" class="saas-card overflow-hidden hidden">`;

html = html.substring(0, userTableCardPos) + userGridViewHtml + html.substring(userTableCardPos + userTableCardNeedle.length);
console.log('Patched view-user-list successfully');

// ─────────────────────────────────────────────────────────────────────────────
// 2. PATCH FARMER NETWORK (view-farmer-network)
// ─────────────────────────────────────────────────────────────────────────────
console.log('Patching view-farmer-network...');
const farmerStart = html.indexOf('id="view-farmer-network"');
const farmerRegBtnNeedle = `<button type="button" onclick="navigateTo('new-user', 'Users', 'New user')" class="h-9 px-3.5 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition">`;
const farmerRegBtnPos = html.indexOf(farmerRegBtnNeedle, farmerStart);

if (farmerRegBtnPos === -1) {
  console.error('Farmer network register button not found!');
  process.exit(1);
}

const farmerSwitcherHtml = `<!-- VIEW SWITCHER (Manage in Grid / Table View) -->
                  <div class="inline-flex items-center p-1 bg-[#F1F5F9] dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
                    <button id="farmerNetworkViewBtnGrid" onclick="setFarmerNetworkViewMode('grid')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer" title="Manage in Grid">
                      <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
                      <span>Manage in Grid</span>
                    </button>
                    <button id="farmerNetworkViewBtnTable" onclick="setFarmerNetworkViewMode('table')" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer" title="Table View">
                      <i data-lucide="table" class="w-3.5 h-3.5"></i>
                      <span>Table View</span>
                    </button>
                  </div>\n\n                  `;

html = html.substring(0, farmerRegBtnPos) + farmerSwitcherHtml + html.substring(farmerRegBtnPos);

// Wrap table in view-farmer-network
const farmerTableCardNeedle = `<!-- Table Card (Farmer, Location, Crops, Channel, Status, Action) -->\n            <div class="saas-card overflow-hidden">`;
const farmerTableCardPos = html.indexOf(farmerTableCardNeedle, farmerStart);

if (farmerTableCardPos === -1) {
  console.error('Farmer network table card needle not found!');
  process.exit(1);
}

const farmerGridViewHtml = `<!-- VIEW 1: Farmer Network Grid View Container (Manage in Grid) -->
            <div id="farmerNetworkGridView" class="space-y-4">
              <div id="farmerNetworkGridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <!-- Dynamically rendered by renderFarmerNetworkGrid() -->
              </div>

              <!-- Empty State for Farmer Network Grid -->
              <div id="farmerNetworkGridEmpty" class="hidden saas-card p-12 text-center space-y-3">
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-[#64748B] flex items-center justify-center">
                  <i data-lucide="sprout" class="w-6 h-6"></i>
                </div>
                <div class="text-sm font-bold text-[#0F172A] dark:text-white">No farmers match filter</div>
                <p class="text-xs text-[#64748B] max-w-sm mx-auto">No network producers match your location or channel filter. Try resetting filters.</p>
                <button onclick="resetFarmerNetworkFilters()" class="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold rounded-lg text-[#0F172A] dark:text-white transition cursor-pointer">Reset Filters</button>
              </div>

              <!-- Grid Pagination / Count Footer -->
              <div class="saas-card p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
                <div class="flex items-center gap-2">
                  <span>Showing <span class="font-bold text-[#0F172A] dark:text-white" id="visibleFarmerCountGrid">14</span> of <span class="font-bold text-[#0F172A] dark:text-white" id="totalFarmerCountGrid">14</span> network producers in grid</span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-[#0B6623] dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                    <i data-lucide="sparkles" class="w-3 h-3"></i> Interactive Grid
                  </span>
                </div>
                <div class="flex items-center gap-1">
                  <button class="px-2.5 py-1 bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-xs font-semibold text-[#64748B] hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50" disabled>Previous</button>
                  <button class="px-2.5 py-1 bg-[#0B6623] text-white rounded-lg text-xs font-bold">1</button>
                  <button class="px-2.5 py-1 bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-xs font-semibold text-[#64748B] hover:bg-slate-50 dark:hover:bg-slate-700">2</button>
                  <button class="px-2.5 py-1 bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-xs font-semibold text-[#64748B] hover:bg-slate-50 dark:hover:bg-slate-700">Next</button>
                </div>
              </div>
            </div>

            <!-- VIEW 2: Farmer Network Table Card -->
            <div id="farmerNetworkTableView" class="saas-card overflow-hidden hidden">`;

html = html.substring(0, farmerTableCardPos) + farmerGridViewHtml + html.substring(farmerTableCardPos + farmerTableCardNeedle.length);
console.log('Patched view-farmer-network successfully');

// ─────────────────────────────────────────────────────────────────────────────
// 3. PATCH ALL 8 MASTER VIEWS
// ─────────────────────────────────────────────────────────────────────────────
const masterConfigsList = [
  { id: 'view-crop-master', type: 'crop', tbody: 'cropTableBody', title: 'Crop' },
  { id: 'view-location-master', type: 'location', tbody: 'locationTableBody', title: 'Location' },
  { id: 'view-category-master', type: 'category', tbody: 'categoryTableBody', title: 'Category' },
  { id: 'view-product-master', type: 'product', tbody: 'productTableBody', title: 'Product' },
  { id: 'view-scheme-master', type: 'scheme', tbody: 'schemeTableBody', title: 'Scheme' },
  { id: 'view-sell-channels', type: 'channel', tbody: 'channelsTableBody', title: 'Sell Channel' },
  { id: 'view-language-master', type: 'language', tbody: 'languageTableBody', title: 'Language' },
  { id: 'view-unit-master', type: 'unit', tbody: 'unitTableBody', title: 'Unit' }
];

masterConfigsList.forEach(m => {
  console.log(`Patching master: ${m.type} (${m.id})...`);
  const vStart = html.indexOf(`id="${m.id}"`);
  if (vStart === -1) {
    console.error(`View ${m.id} not found!`);
    process.exit(1);
  }

  const tbodyPos = html.indexOf(`id="${m.tbody}"`, vStart);
  if (tbodyPos === -1) {
    console.error(`Tbody ${m.tbody} not found!`);
    process.exit(1);
  }

  // Find the table card starting before tbody
  const subChunk = html.substring(vStart, tbodyPos);
  const cardStartOffset = subChunk.lastIndexOf('<div class="saas-card overflow-hidden">');
  const realCardStart = vStart + cardStartOffset;

  // Insert Switcher in the toolbar before the table card
  // Look for toolbar closing </div> right before realCardStart
  const toolbarClose = html.lastIndexOf('</div>', realCardStart - 1);
  const switcherHtml = `
              <!-- VIEW SWITCHER (Manage in Grid / Table View) -->
              <div class="inline-flex items-center p-1 bg-[#F1F5F9] dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700 ml-auto">
                <button id="masterViewBtnGrid_${m.type}" onclick="setMasterViewMode('${m.type}', 'grid')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer" title="Manage in Grid">
                  <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
                  <span>Manage in Grid</span>
                </button>
                <button id="masterViewBtnTable_${m.type}" onclick="setMasterViewMode('${m.type}', 'table')" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer" title="Table View">
                  <i data-lucide="table" class="w-3.5 h-3.5"></i>
                  <span>Table View</span>
                </button>
              </div>\n`;

  // Insert switcher before the toolbar ends
  html = html.substring(0, toolbarClose) + switcherHtml + html.substring(toolbarClose);

  // Recalculate realCardStart
  const vStartNew = html.indexOf(`id="${m.id}"`);
  const tbodyPosNew = html.indexOf(`id="${m.tbody}"`, vStartNew);
  const subChunkNew = html.substring(vStartNew, tbodyPosNew);
  const cardStartOffsetNew = subChunkNew.lastIndexOf('<div class="saas-card overflow-hidden">');
  const realCardStartNew = vStartNew + cardStartOffsetNew;

  // Insert Grid View Container and wrap table card in #${m.type}TableView
  const gridViewContainerHtml = `<!-- VIEW 1: Master Grid View Container (Manage in Grid) -->
            <div id="${m.type}GridView" class="space-y-4">
              <div id="${m.type}GridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <!-- Dynamically populated by renderMasterGrid('${m.type}') -->
              </div>
              <div id="${m.type}GridEmpty" class="hidden saas-card p-12 text-center space-y-3">
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-[#64748B] flex items-center justify-center">
                  <i data-lucide="database" class="w-6 h-6"></i>
                </div>
                <div class="text-sm font-bold text-[#0F172A] dark:text-white">No records found</div>
                <p class="text-xs text-[#64748B] max-w-sm mx-auto">No ${m.title.toLowerCase()} records match the current filter or search criteria.</p>
              </div>
            </div>

            <!-- VIEW 2: Master Table Card -->
            <div id="${m.type}TableView" class="saas-card overflow-hidden hidden">`;

  html = html.substring(0, realCardStartNew) + gridViewContainerHtml + html.substring(realCardStartNew + '<div class="saas-card overflow-hidden">'.length);
  console.log(`Patched master ${m.type} markup successfully`);
});

// ─────────────────────────────────────────────────────────────────────────────
// 4. WRITE THE JAVASCRIPT CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────
console.log('Patching JavaScript controllers for Masters, Users, and Farmer Network...');

// Find insertion point right before // ─── MASTERS MODULE CRUD CONTROLLER
const masterCtrlStart = html.indexOf('// ─── MASTERS MODULE CRUD CONTROLLER');
if (masterCtrlStart === -1) {
  console.error('Masters module CRUD controller start not found!');
  process.exit(1);
}

// Enhance Master Controller & add Universal Master Grid Engine
const masterGridEngineJs = `// ─── UNIVERSAL MASTER GRID ENGINE & CONTROLLER ─────────────────────────────

    const masterIconsMap = {
      crop: 'sprout',
      location: 'map-pin',
      category: 'tag',
      product: 'package',
      scheme: 'award',
      channel: 'repeat',
      language: 'languages',
      unit: 'scale'
    };

    const masterColorsMap = {
      crop: { bg: 'bg-emerald-100 text-[#0B6623] dark:bg-emerald-950/60 dark:text-emerald-300' },
      location: { bg: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300' },
      category: { bg: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300' },
      product: { bg: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300' },
      scheme: { bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' },
      channel: { bg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300' },
      language: { bg: 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300' },
      unit: { bg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950/60 dark:text-cyan-300' }
    };

    function setMasterViewMode(type, mode) {
      try {
        localStorage.setItem('ankurmitra_master_view_' + type, mode);
      } catch (e) {}

      const gridView = document.getElementById(type + 'GridView');
      const tableView = document.getElementById(type + 'TableView');
      const btnGrid = document.getElementById('masterViewBtnGrid_' + type);
      const btnTable = document.getElementById('masterViewBtnTable_' + type);

      if (mode === 'grid') {
        if (gridView) gridView.classList.remove('hidden');
        if (tableView) tableView.classList.add('hidden');

        if (btnGrid) {
          btnGrid.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
        }
        if (btnTable) {
          btnTable.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
        }
      } else {
        if (gridView) gridView.classList.add('hidden');
        if (tableView) tableView.classList.remove('hidden');

        if (btnGrid) {
          btnGrid.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
        }
        if (btnTable) {
          btnTable.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
        }
      }

      renderMasterGrid(type);
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    function renderMasterGrid(type) {
      const cfg = masterConfigs[type];
      if (!cfg) return;

      const container = document.getElementById(type + 'GridContainer');
      if (!container) return;

      const tbody = document.getElementById(cfg.tableBody);
      if (!tbody) return;

      const rows = Array.from(tbody.querySelectorAll('tr'));
      const icon = masterIconsMap[type] || 'database';
      const colorStyle = masterColorsMap[type] || { bg: 'bg-slate-100 text-slate-800' };

      container.innerHTML = rows.map((r, idx) => {
        const id = r.getAttribute('data-id') || (type.slice(0, 3) + '-' + (idx + 1));
        const val1 = r.getAttribute('data-val1') || 'Title';
        const val2 = r.getAttribute('data-val2') || '';
        const val3 = r.getAttribute('data-val3') || '';
        const val4 = r.getAttribute('data-val4') || '';
        const val5 = r.getAttribute('data-val5') || '';
        const status = r.getAttribute('data-status') || 'Active';

        const statusClass = status === 'Active'
          ? 'bg-emerald-100 text-[#0B6623] dark:bg-emerald-950/60 dark:text-emerald-300'
          : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400';
        const dotClass = status === 'Active' ? 'bg-[#0B6623] dark:bg-emerald-400' : 'bg-slate-400';

        return \`
          <div class="master-grid-card saas-card p-4 hover:shadow-md transition-all duration-200 flex flex-col justify-between border border-[#E2E8F0] dark:border-slate-800 rounded-2xl group bg-white dark:bg-slate-900"
               data-id="\${id}" data-type="\${type}" data-val1="\${val1}" data-val2="\${val2}" data-status="\${status}">
            <div>
              <!-- Header -->
              <div class="flex items-start justify-between gap-2 mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-10 h-10 rounded-xl font-bold flex items-center justify-center shadow-xs \${colorStyle.bg}">
                    <i data-lucide="\${icon}" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-[#0F172A] dark:text-white leading-tight group-hover:text-[#0B6623] transition-colors">\${val1}</h4>
                    <div class="flex items-center gap-1.5 text-[11px] text-[#64748B] mt-0.5">
                      <span class="font-semibold text-emerald-700 dark:text-emerald-400">\${val2}</span>
                      <span class="text-slate-300 dark:text-slate-700">•</span>
                      <span class="font-mono text-[10px] text-slate-400">\${id}</span>
                    </div>
                  </div>
                </div>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold \${statusClass}">
                  <span class="w-1.5 h-1.5 rounded-full \${dotClass}"></span>
                  \${status}
                </span>
              </div>

              <!-- Parameter details box -->
              <div class="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-[#E2E8F0] dark:border-slate-700/80 mb-3 space-y-2">
                \${val3 ? \`
                <div class="flex items-start justify-between gap-2 text-xs">
                  <span class="text-[10px] text-[#64748B] font-medium">\${cfg.l3 ? cfg.l3.split('(')[0].trim() : 'Parameter'}:</span>
                  <span class="font-semibold text-[#0F172A] dark:text-slate-200 text-right text-[11px]">\${val3}</span>
                </div>\` : ''}
                \${val4 ? \`
                <div class="flex items-start justify-between gap-2 text-xs">
                  <span class="text-[10px] text-[#64748B] font-medium">\${cfg.l4 ? cfg.l4.split('(')[0].trim() : 'Specification'}:</span>
                  <span class="font-semibold text-emerald-700 dark:text-emerald-400 text-right text-[11px]">\${val4}</span>
                </div>\` : ''}
                \${val5 ? \`
                <div class="flex items-start justify-between gap-2 text-xs pt-1.5 border-t border-slate-200/60 dark:border-slate-700/60">
                  <span class="text-[10px] text-[#64748B] font-medium">\${cfg.l5 ? cfg.l5.split('(')[0].trim() : 'Policy'}:</span>
                  <span class="font-semibold text-[#0F172A] dark:text-slate-300 text-right text-[10px]">\${val5}</span>
                </div>\` : ''}
              </div>
            </div>

            <!-- Action buttons -->
            <div class="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between gap-2">
              <button onclick="editMasterFromCard('\${type}', '\${id}')" class="flex-1 h-8 px-3 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer">
                <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
                <span>Edit</span>
              </button>
              <button onclick="toggleMasterStatusFromCard('\${type}', '\${id}')" class="h-8 px-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-xs font-bold \${status === 'Active' ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30' : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'} transition flex items-center gap-1 cursor-pointer">
                <i data-lucide="\${status === 'Active' ? 'pause-circle' : 'play-circle'}" class="w-3.5 h-3.5"></i>
                <span class="hidden sm:inline">\${status === 'Active' ? 'Pause' : 'Activate'}</span>
              </button>
              <button onclick="deleteMasterFromCard('\${type}', '\${id}')" title="Delete record" class="h-8 w-8 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center justify-center transition cursor-pointer">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        \`;
      }).join('');

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    function renderAllMasterGrids() {
      if (typeof masterConfigs !== 'object') return;
      Object.keys(masterConfigs).forEach(type => {
        const storedView = localStorage.getItem('ankurmitra_master_view_' + type) || 'grid';
        setMasterViewMode(type, storedView);
      });
    }

    function editMasterFromCard(type, id) {
      const cfg = masterConfigs[type];
      if (!cfg) return;
      const tbody = document.getElementById(cfg.tableBody);
      if (!tbody) return;
      const row = tbody.querySelector(\`tr[data-id="\${id}"]\`);
      if (row) {
        const editBtn = row.querySelector('button[onclick*="openMasterModal"]') || row.querySelector('button');
        openMasterModal(type, 'edit', editBtn || row);
      }
    }

    function toggleMasterStatusFromCard(type, id) {
      const cfg = masterConfigs[type];
      if (!cfg) return;
      const tbody = document.getElementById(cfg.tableBody);
      if (!tbody) return;
      const row = tbody.querySelector(\`tr[data-id="\${id}"]\`);
      if (row) {
        const curr = row.getAttribute('data-status') || 'Active';
        const next = curr === 'Active' ? 'Inactive' : 'Active';
        row.setAttribute('data-status', next);
        renderMasterGrid(type);
        showToast(\`\${cfg.title} record status updated to \${next}\`, 'info');
      }
    }

    function deleteMasterFromCard(type, id) {
      const cfg = masterConfigs[type];
      if (!cfg) return;
      const tbody = document.getElementById(cfg.tableBody);
      if (!tbody) return;
      const row = tbody.querySelector(\`tr[data-id="\${id}"]\`);
      if (row) {
        deleteMasterRow(row.querySelector('button[onclick*="deleteMasterRow"]') || row);
        renderMasterGrid(type);
      }
    }

    // Expose Master Grid functions
    window.setMasterViewMode = setMasterViewMode;
    window.renderMasterGrid = renderMasterGrid;
    window.renderAllMasterGrids = renderAllMasterGrids;
    window.editMasterFromCard = editMasterFromCard;
    window.toggleMasterStatusFromCard = toggleMasterStatusFromCard;
    window.deleteMasterFromCard = deleteMasterFromCard;

    \n    `;

html = html.substring(0, masterCtrlStart) + masterGridEngineJs + html.substring(masterCtrlStart);

// Update filterMasterTable to also filter cards in master grid
const oldFilterMasterTable = `function filterMasterTable(tableBodyId, query) {
      const q = (query || '').toLowerCase().trim();
      const rows = document.querySelectorAll('#' + tableBodyId + ' tr');
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = (!q || text.includes(q)) ? '' : 'none';
      });
    }`;

const newFilterMasterTable = `function filterMasterTable(tableBodyId, query) {
      const q = (query || '').toLowerCase().trim();
      const rows = document.querySelectorAll('#' + tableBodyId + ' tr');
      rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        row.style.display = (!q || text.includes(q)) ? '' : 'none';
      });

      // Also filter corresponding master grid container
      const type = Object.keys(masterConfigs).find(k => masterConfigs[k].tableBody === tableBodyId);
      if (type) {
        const cards = document.querySelectorAll('#' + type + 'GridContainer .master-grid-card');
        let visibleCount = 0;
        cards.forEach(card => {
          const text = card.innerText.toLowerCase();
          const match = !q || text.includes(q);
          card.style.display = match ? '' : 'none';
          if (match) visibleCount++;
        });
        const empty = document.getElementById(type + 'GridEmpty');
        if (empty) {
          if (visibleCount === 0) empty.classList.remove('hidden');
          else empty.classList.add('hidden');
        }
      }
    }`;

if (html.includes(oldFilterMasterTable)) {
  html = html.replace(oldFilterMasterTable, newFilterMasterTable);
  console.log('Enhanced filterMasterTable to filter both table and grid');
}

// In handleMasterSubmit, call renderMasterGrid(type)
const handleMasterSubmitClose = `closeMasterModal();\n    }`;
const enhancedHandleMasterSubmitClose = `closeMasterModal();
      if (typeof renderMasterGrid === 'function') {
        renderMasterGrid(type);
      }
    }`;

if (html.includes(handleMasterSubmitClose)) {
  html = html.replace(handleMasterSubmitClose, enhancedHandleMasterSubmitClose);
  console.log('Hooked renderMasterGrid into handleMasterSubmit');
}

// ─────────────────────────────────────────────────────────────────────────────
// 5. ENHANCE USER LIST JAVASCRIPT CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────
console.log('Enhancing User List controllers...');

// In renderUsersTable, also populate #usersGridContainer
const oldRenderUsersTableStart = `function renderUsersTable() {
  const tbody = document.getElementById('usersTableBody');
  if (!tbody || !window.ANKURMITRA_USERS) return;`;

const newRenderUsersTableStart = `function setUserViewMode(mode) {
  try {
    localStorage.setItem('ankurmitra_user_view_mode', mode);
  } catch (e) {}

  const gridView = document.getElementById('usersGridView');
  const tableView = document.getElementById('usersTableView');
  const btnGrid = document.getElementById('userViewBtnGrid');
  const btnTable = document.getElementById('userViewBtnTable');

  if (mode === 'grid') {
    if (gridView) gridView.classList.remove('hidden');
    if (tableView) tableView.classList.add('hidden');

    if (btnGrid) {
      btnGrid.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
    }
    if (btnTable) {
      btnTable.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
    }
  } else {
    if (gridView) gridView.classList.add('hidden');
    if (tableView) tableView.classList.remove('hidden');

    if (btnGrid) {
      btnGrid.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
    }
    if (btnTable) {
      btnTable.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
    }
  }

  filterUserList();
  if (window.lucide && typeof lucide.createIcons === 'function') {
    lucide.createIcons();
  }
}
window.setUserViewMode = setUserViewMode;

function renderUsersTable() {
  const tbody = document.getElementById('usersTableBody');
  const gridContainer = document.getElementById('usersGridContainer');
  if (!window.ANKURMITRA_USERS) initUsersRegistry();
  const users = window.ANKURMITRA_USERS;`;

if (html.includes(oldRenderUsersTableStart)) {
  html = html.replace(oldRenderUsersTableStart, newRenderUsersTableStart);
  console.log('Added setUserViewMode and enhanced renderUsersTable start');
}

// In renderUsersTable, after tbody.innerHTML = rows; add gridContainer.innerHTML = cards
const oldRenderUsersTableEnd = `tbody.innerHTML = rows;
  filterUserList();
}`;

const newRenderUsersTableEnd = `tbody.innerHTML = rows;

  if (gridContainer) {
    gridContainer.innerHTML = users.map(u => {
      const initials = (u.name || 'User').split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
      let roleBadgeBg = 'bg-emerald-100 text-[#0B6623] dark:bg-emerald-950/60 dark:text-emerald-300';
      let roleIcon = 'sprout';
      let tagClass = 'bg-emerald-50 text-[#0B6623] border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800';

      if (u.role === 'Dealer') {
        roleBadgeBg = 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300';
        roleIcon = 'store';
        tagClass = 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800';
      } else if (u.role === 'Retailer') {
        roleBadgeBg = 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300';
        roleIcon = 'shopping-bag';
        tagClass = 'bg-teal-50 text-teal-800 border border-teal-200 dark:bg-teal-950/40 dark:text-teal-300 dark:border-teal-800';
      } else if (u.role === 'Industrial') {
        roleBadgeBg = 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300';
        roleIcon = 'factory';
        tagClass = 'bg-purple-50 text-purple-800 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800';
      } else if (u.role === 'Staff') {
        roleBadgeBg = 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300';
        roleIcon = 'shield-check';
        tagClass = 'bg-indigo-50 text-indigo-800 border border-indigo-200 dark:bg-indigo-950/40 dark:text-indigo-300 dark:border-indigo-800';
      }

      const statusClass = u.status === 'Active'
        ? 'bg-emerald-100 text-[#0B6623] dark:bg-emerald-950/60 dark:text-emerald-300'
        : (u.status === 'Pending' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300' : 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300');
      const dotClass = u.status === 'Active' ? 'bg-[#0B6623]' : (u.status === 'Pending' ? 'bg-amber-600' : 'bg-rose-600');

      return \`
        <div class="user-grid-card saas-card p-4 hover:shadow-md transition-all duration-200 flex flex-col justify-between border border-[#E2E8F0] dark:border-slate-800 rounded-2xl group bg-white dark:bg-slate-900"
             data-id="\${u.id}" data-name="\${u.name}" data-role="\${u.role}" data-phone="\${u.phone}" data-location="\${u.location}" data-status="\${u.status}">
          <div>
            <div class="flex items-start justify-between gap-2 mb-3">
              <div class="flex items-center gap-2.5">
                <div class="relative">
                  <div class="w-10 h-10 rounded-xl font-black text-xs flex items-center justify-center shadow-xs \${roleBadgeBg}">
                    \${initials}
                  </div>
                  <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] bg-white dark:bg-slate-800 shadow-xs border border-white dark:border-slate-700">
                    <i data-lucide="\${roleIcon}" class="w-2.5 h-2.5"></i>
                  </span>
                </div>
                <div>
                  <h4 class="font-bold text-sm text-[#0F172A] dark:text-white leading-tight group-hover:text-[#0B6623] transition-colors">\${u.name}</h4>
                  <div class="flex items-center gap-1.5 text-[11px] text-[#64748B] mt-0.5">
                    <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
                    <span>\${u.location}</span>
                    <span class="text-slate-300 dark:text-slate-700">•</span>
                    <span class="font-mono text-[10px] text-slate-400">\${u.id}</span>
                  </div>
                </div>
              </div>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold \${statusClass}">
                <span class="w-1.5 h-1.5 rounded-full \${dotClass}"></span>
                \${u.status}
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-1.5 mb-3">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider \${tagClass}">
                \${u.role}
              </span>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <i data-lucide="shield-check" class="w-3 h-3 text-emerald-600"></i>
                \${u.kyc || 'KYC Verified'}
              </span>
            </div>

            <div class="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-[#E2E8F0] dark:border-slate-700/80 mb-3 space-y-1.5 text-xs">
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-[#64748B]">Capacity / Scope:</span>
                <span class="font-bold text-[#0F172A] dark:text-white">\${u.land || u.capacity || 'Standard Tier'}</span>
              </div>
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-[#64748B]">Contact:</span>
                <a href="tel:\${u.phone}" class="font-mono text-[#0B6623] hover:underline font-bold">\${u.phone}</a>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between gap-2">
            <button onclick="editUserRecord('\${u.id}')" class="flex-1 h-8 px-3 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              <span>Edit</span>
            </button>
            <button onclick="openUserRecord('\${u.id}')" class="h-8 px-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-xs font-bold text-[#0F172A] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              <span>Detail</span>
            </button>
            <button onclick="deleteUserRecord('\${u.id}')" title="Delete user" class="h-8 w-8 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center justify-center transition cursor-pointer">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      \`;
    }).join('');
  }

  const storedUserView = localStorage.getItem('ankurmitra_user_view_mode') || 'grid';
  setUserViewMode(storedUserView);
  filterUserList();
}`;

if (html.includes(oldRenderUsersTableEnd)) {
  html = html.replace(oldRenderUsersTableEnd, newRenderUsersTableEnd);
  console.log('Enhanced renderUsersTable to also populate usersGridContainer');
}

// Enhance filterUserList to also filter usersGridContainer cards
const oldFilterUserList = `function filterUserList() {
  const query = (document.getElementById('userListSearchInput')?.value || '').toLowerCase().trim();
  const rows = document.querySelectorAll('#usersTableBody tr.user-row');
  let visibleCount = 0;

  rows.forEach(row => {
    const name = (row.getAttribute('data-name') || '').toLowerCase();
    const role = row.getAttribute('data-role') || '';
    const phone = (row.getAttribute('data-phone') || '').toLowerCase();
    const location = (row.getAttribute('data-location') || '').toLowerCase();
    const status = row.getAttribute('data-status') || '';

    const matchesQuery = !query || name.includes(query) || phone.includes(query) || location.includes(query);
    const matchesRole = currentUserRoleFilter === 'all' || role === currentUserRoleFilter;
    const matchesStatus = currentUserStatusFilter === 'all' || status === currentUserStatusFilter;

    if (matchesQuery && matchesRole && matchesStatus) {
      row.style.display = '';
      visibleCount++;
    } else {
      row.style.display = 'none';
    }
  });

  const countEl = document.getElementById('showingUsersCount');
  if (countEl) countEl.textContent = visibleCount;
}`;

const newFilterUserList = `function filterUserList() {
  const query = (document.getElementById('userListSearchInput')?.value || '').toLowerCase().trim();
  const rows = document.querySelectorAll('#usersTableBody tr.user-row');
  const cards = document.querySelectorAll('#usersGridContainer div.user-grid-card');
  let visibleCount = 0;

  rows.forEach(row => {
    const name = (row.getAttribute('data-name') || '').toLowerCase();
    const role = row.getAttribute('data-role') || '';
    const phone = (row.getAttribute('data-phone') || '').toLowerCase();
    const location = (row.getAttribute('data-location') || '').toLowerCase();
    const status = row.getAttribute('data-status') || '';
    const id = (row.getAttribute('data-id') || '').toLowerCase();

    const matchesQuery = !query || name.includes(query) || phone.includes(query) || location.includes(query) || id.includes(query);
    const matchesRole = currentUserRoleFilter === 'all' || role === currentUserRoleFilter;
    const matchesStatus = currentUserStatusFilter === 'all' || status === currentUserStatusFilter;

    if (matchesQuery && matchesRole && matchesStatus) {
      row.style.display = '';
      visibleCount++;
    } else {
      row.style.display = 'none';
    }
  });

  // Also filter Grid cards
  cards.forEach(card => {
    const name = (card.getAttribute('data-name') || '').toLowerCase();
    const role = card.getAttribute('data-role') || '';
    const phone = (card.getAttribute('data-phone') || '').toLowerCase();
    const location = (card.getAttribute('data-location') || '').toLowerCase();
    const status = card.getAttribute('data-status') || '';
    const id = (card.getAttribute('data-id') || '').toLowerCase();

    const matchesQuery = !query || name.includes(query) || phone.includes(query) || location.includes(query) || id.includes(query);
    const matchesRole = currentUserRoleFilter === 'all' || role === currentUserRoleFilter;
    const matchesStatus = currentUserStatusFilter === 'all' || status === currentUserStatusFilter;

    if (matchesQuery && matchesRole && matchesStatus) {
      card.style.display = '';
    } else {
      card.style.display = 'none';
    }
  });

  const countEl = document.getElementById('showingUsersCount');
  if (countEl) countEl.textContent = visibleCount;

  const countGridEl = document.getElementById('visibleUserCountGrid');
  if (countGridEl) countGridEl.textContent = visibleCount;

  const totalGridEl = document.getElementById('totalUserCountGrid');
  if (totalGridEl && window.ANKURMITRA_USERS) totalGridEl.textContent = window.ANKURMITRA_USERS.length;

  const gridEmpty = document.getElementById('usersGridEmpty');
  if (gridEmpty) {
    if (visibleCount === 0) gridEmpty.classList.remove('hidden');
    else gridEmpty.classList.add('hidden');
  }
}`;

if (html.includes(oldFilterUserList)) {
  html = html.replace(oldFilterUserList, newFilterUserList);
  console.log('Enhanced filterUserList to filter both table rows and grid cards');
}

// ─────────────────────────────────────────────────────────────────────────────
// 6. ENHANCE FARMER NETWORK JAVASCRIPT CONTROLLERS
// ─────────────────────────────────────────────────────────────────────────────
console.log('Enhancing Farmer Network controllers...');

const farmerNetworkEngineJs = `// ─── FARMER NETWORK GRID & VIEW ENGINE ──────────────────────────────────────

    function setFarmerNetworkViewMode(mode) {
      try {
        localStorage.setItem('ankurmitra_farmer_network_view_mode', mode);
      } catch (e) {}

      const gridView = document.getElementById('farmerNetworkGridView');
      const tableView = document.getElementById('farmerNetworkTableView');
      const btnGrid = document.getElementById('farmerNetworkViewBtnGrid');
      const btnTable = document.getElementById('farmerNetworkViewBtnTable');

      if (mode === 'grid') {
        if (gridView) gridView.classList.remove('hidden');
        if (tableView) tableView.classList.add('hidden');

        if (btnGrid) {
          btnGrid.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
        }
        if (btnTable) {
          btnTable.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
        }
      } else {
        if (gridView) gridView.classList.add('hidden');
        if (tableView) tableView.classList.remove('hidden');

        if (btnGrid) {
          btnGrid.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
        }
        if (btnTable) {
          btnTable.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
        }
      }

      renderFarmerNetworkGrid();
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    function renderFarmerNetworkGrid() {
      const container = document.getElementById('farmerNetworkGridContainer');
      const tbody = document.getElementById('farmerNetworkTableBody');
      if (!container || !tbody) return;

      const rows = Array.from(tbody.querySelectorAll('tr'));
      container.innerHTML = rows.map((r, idx) => {
        const nameEl = r.querySelector('.font-bold.text-\\[\\#0F172A\\]') || r.querySelector('.font-bold');
        const name = nameEl ? nameEl.textContent.trim() : 'Farmer Producer';
        const village = r.getAttribute('data-village') || 'Sudavad';
        const district = r.getAttribute('data-district') || 'Amreli';
        const state = r.getAttribute('data-state') || 'Gujarat';
        const channel = r.getAttribute('data-channel') || 'F2R';
        const crops = r.getAttribute('data-crops') || 'Groundnut';
        const acreage = r.getAttribute('data-acreage') || '14';
        const initials = name.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();

        return \`
          <div class="farmer-grid-card saas-card p-4 hover:shadow-md transition-all duration-200 flex flex-col justify-between border border-[#E2E8F0] dark:border-slate-800 rounded-2xl group bg-white dark:bg-slate-900"
               data-state="\${state}" data-district="\${district}" data-village="\${village}" data-channel="\${channel}" data-crops="\${crops}" data-name="\${name}">
            <div>
              <div class="flex items-start justify-between gap-2 mb-3">
                <div class="flex items-center gap-2.5">
                  <div class="w-10 h-10 rounded-xl font-black text-xs flex items-center justify-center shadow-xs bg-lime-100 text-lime-800 dark:bg-lime-950/60 dark:text-lime-300">
                    \${initials}
                  </div>
                  <div>
                    <h4 class="font-bold text-sm text-[#0F172A] dark:text-white leading-tight group-hover:text-[#0B6623] transition-colors">\${name}</h4>
                    <div class="flex items-center gap-1.5 text-[11px] text-[#64748B] mt-0.5">
                      <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
                      <span>\${village}, \${district}</span>
                    </div>
                  </div>
                </div>
                <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B6623] dark:bg-emerald-950/60 dark:text-emerald-300">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#0B6623]"></span>
                  Active
                </span>
              </div>

              <div class="flex flex-wrap items-center gap-1.5 mb-3">
                <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider bg-lime-50 text-lime-800 border border-lime-200 dark:bg-lime-950/40 dark:text-lime-300 dark:border-lime-800">
                  \${acreage} Acres Holding
                </span>
                <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-emerald-50 text-[#0B6623] border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800">
                  Channel: \${channel}
                </span>
              </div>

              <div class="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-[#E2E8F0] dark:border-slate-700/80 mb-3 space-y-1.5 text-xs">
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-[#64748B]">Primary Crops:</span>
                  <span class="font-bold text-[#0F172A] dark:text-white">\${crops}</span>
                </div>
                <div class="flex items-center justify-between text-[11px]">
                  <span class="text-[#64748B]">Verification:</span>
                  <span class="font-bold text-emerald-600 flex items-center gap-1">
                    <i data-lucide="shield-check" class="w-3 h-3"></i> Aadhaar & DBT Verified
                  </span>
                </div>
              </div>
            </div>

            <div class="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between gap-2">
              <button onclick="openAddSupplierLinkModalWith('\${name}')" class="flex-1 h-8 px-3 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer">
                <i data-lucide="link" class="w-3.5 h-3.5"></i>
                <span>Supply Link</span>
              </button>
              <button onclick="showToast('Loading geo-tag survey map for \${name}...', 'info')" class="h-8 px-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-xs font-bold text-[#0F172A] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer" title="View Farm Map">
                <i data-lucide="map" class="w-3.5 h-3.5"></i>
                <span>Map</span>
              </button>
            </div>
          </div>
        \`;
      }).join('');

      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    window.setFarmerNetworkViewMode = setFarmerNetworkViewMode;
    window.renderFarmerNetworkGrid = renderFarmerNetworkGrid;

    \n    `;

// Insert farmerNetworkEngineJs right before filterFarmerNetwork function
const filterFarmerNetworkPos = html.indexOf('function filterFarmerNetwork()');
if (filterFarmerNetworkPos !== -1) {
  html = html.substring(0, filterFarmerNetworkPos) + farmerNetworkEngineJs + html.substring(filterFarmerNetworkPos);
  console.log('Inserted farmer network engine functions');
}

// Enhance filterFarmerNetwork to also filter farmer-grid-card
const oldFilterFarmerNetBody = `function filterFarmerNetwork() {
      const q = (document.getElementById('farmerSearchInput')?.value || '').toLowerCase().trim();
      const rows = document.querySelectorAll('#farmerNetworkTableBody tr');
      let visible = 0;

      rows.forEach(r => {
        const text = r.innerText.toLowerCase();
        const matchesQuery = !q || text.includes(q);
        const matchesLocation = checkFarmerLocationMatch(r);
        const matchesChannel = checkFarmerChannelMatch(r);

        if (matchesQuery && matchesLocation && matchesChannel) {
          r.style.display = '';
          visible++;
        } else {
          r.style.display = 'none';
        }
      });

      const countEl = document.getElementById('visibleFarmerCount');
      if (countEl) countEl.textContent = visible;
    }`;

const newFilterFarmerNetBody = `function filterFarmerNetwork() {
      const q = (document.getElementById('farmerSearchInput')?.value || '').toLowerCase().trim();
      const rows = document.querySelectorAll('#farmerNetworkTableBody tr');
      const cards = document.querySelectorAll('#farmerNetworkGridContainer .farmer-grid-card');
      let visible = 0;

      rows.forEach(r => {
        const text = r.innerText.toLowerCase();
        const matchesQuery = !q || text.includes(q);
        const matchesLocation = checkFarmerLocationMatch(r);
        const matchesChannel = checkFarmerChannelMatch(r);

        if (matchesQuery && matchesLocation && matchesChannel) {
          r.style.display = '';
          visible++;
        } else {
          r.style.display = 'none';
        }
      });

      cards.forEach(c => {
        const text = c.innerText.toLowerCase();
        const matchesQuery = !q || text.includes(q);
        const matchesLocation = checkFarmerLocationMatch(c);
        const matchesChannel = checkFarmerChannelMatch(c);

        if (matchesQuery && matchesLocation && matchesChannel) {
          c.style.display = '';
        } else {
          c.style.display = 'none';
        }
      });

      const countEl = document.getElementById('visibleFarmerCount');
      if (countEl) countEl.textContent = visible;

      const countGridEl = document.getElementById('visibleFarmerCountGrid');
      if (countGridEl) countGridEl.textContent = visible;

      const gridEmpty = document.getElementById('farmerNetworkGridEmpty');
      if (gridEmpty) {
        if (visible === 0) gridEmpty.classList.remove('hidden');
        else gridEmpty.classList.add('hidden');
      }
    }`;

if (html.includes(oldFilterFarmerNetBody)) {
  html = html.replace(oldFilterFarmerNetBody, newFilterFarmerNetBody);
  console.log('Enhanced filterFarmerNetwork to filter both table rows and grid cards');
}

// ─────────────────────────────────────────────────────────────────────────────
// 7. AUTO-INITIALIZATION IN DOMContentLoaded AND navigateTo
// ─────────────────────────────────────────────────────────────────────────────
console.log('Adding auto-initialization hooks...');

const domLoadedHook = `renderAllMasterGrids();
      const storedFarmerView = localStorage.getItem('ankurmitra_farmer_network_view_mode') || 'grid';
      if (typeof setFarmerNetworkViewMode === 'function') setFarmerNetworkViewMode(storedFarmerView);
      `;

// Find where initSuppliersRegistry is called in DOMContentLoaded
const domInitPos = html.indexOf("initSuppliersRegistry();");
if (domInitPos !== -1) {
  html = html.substring(0, domInitPos) + domLoadedHook + html.substring(domInitPos);
  console.log('Added DOMContentLoaded initialization hooks');
}

// Write the patched index.html
fs.writeFileSync(indexPath, html, 'utf8');
console.log('index.html successfully patched with Grid View & Table View for all Masters and Lists!');
