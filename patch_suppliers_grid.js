// patch_suppliers_grid.js
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Backup
fs.writeFileSync(path.join(__dirname, 'index.html.bak_suppliers'), html, 'utf8');
console.log('Backed up index.html');

// 2. Locate view-suppliers
const viewSuppliersStart = html.indexOf('<div id="view-suppliers"');
if (viewSuppliersStart === -1) {
  console.error('view-suppliers not found!');
  process.exit(1);
}

// Find where view-suppliers ends: right before VIEW 5: A06 MASTER HUB
const nextViewComment = html.indexOf('<!-- -------------------------------------------------------------\n               VIEW 5: A06 MASTER HUB', viewSuppliersStart);
if (nextViewComment === -1) {
  console.error('Next view comment not found!');
  process.exit(1);
}

console.log('view-suppliers range:', viewSuppliersStart, 'to', nextViewComment);

// New view-suppliers markup
const newViewSuppliersHtml = `<div id="view-suppliers" class="hidden space-y-5 view-section">
            <!-- Top Metric KPI Cards -->
            <div class="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="saas-card p-4">
                <div class="flex items-center justify-between text-[#64748B] text-xs font-bold">
                  <span>Active Supply Links</span>
                  <div class="w-7 h-7 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-[#0B6623] dark:text-emerald-300 flex items-center justify-center">
                    <i data-lucide="link" class="w-4 h-4"></i>
                  </div>
                </div>
                <div class="text-2xl font-black text-[#0F172A] dark:text-white mt-2" id="kpiActiveSupplyLinks">248</div>
                <div class="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 mt-1 flex items-center gap-1">
                  <i data-lucide="trending-up" class="w-3 h-3"></i> +18 links this quarter
                </div>
              </div>

              <div class="saas-card p-4">
                <div class="flex items-center justify-between text-[#64748B] text-xs font-bold">
                  <span>Farmer Suppliers</span>
                  <div class="w-7 h-7 rounded-lg bg-lime-50 dark:bg-lime-950/60 text-lime-700 dark:text-lime-300 flex items-center justify-center">
                    <i data-lucide="sprout" class="w-4 h-4"></i>
                  </div>
                </div>
                <div class="text-2xl font-black text-[#0F172A] dark:text-white mt-2" id="kpiFarmerSuppliers">184</div>
                <div class="text-[11px] font-semibold text-[#64748B] mt-1">Direct produce fulfillment</div>
              </div>

              <div class="saas-card p-4">
                <div class="flex items-center justify-between text-[#64748B] text-xs font-bold">
                  <span>Agro Dealers</span>
                  <div class="w-7 h-7 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 flex items-center justify-center">
                    <i data-lucide="store" class="w-4 h-4"></i>
                  </div>
                </div>
                <div class="text-2xl font-black text-[#0F172A] dark:text-white mt-2" id="kpiAgroDealers">42</div>
                <div class="text-[11px] font-semibold text-[#64748B] mt-1">Fertilizer & Seed distributors</div>
              </div>

              <div class="saas-card p-4">
                <div class="flex items-center justify-between text-[#64748B] text-xs font-bold">
                  <span>Industrial Processors</span>
                  <div class="w-7 h-7 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 flex items-center justify-center">
                    <i data-lucide="factory" class="w-4 h-4"></i>
                  </div>
                </div>
                <div class="text-2xl font-black text-[#0F172A] dark:text-white mt-2" id="kpiIndustrialProcessors">22</div>
                <div class="text-[11px] font-semibold text-emerald-700 dark:text-emerald-400 mt-1 flex items-center gap-1">
                  <i data-lucide="shield-check" class="w-3 h-3"></i> 99.4% on-time settlement
                </div>
              </div>
            </div>

            <!-- Filter & Action Bar with "Manage in Grid" Switcher -->
            <div class="saas-card p-4 space-y-3">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div class="flex flex-wrap items-center gap-3 flex-1">
                  <!-- Search: "Search suppliers" -->
                  <div class="relative w-full sm:w-64">
                    <i data-lucide="search" class="w-4 h-4 text-[#64748B] absolute left-3 top-2.5"></i>
                    <input id="supplierSearchInput" oninput="filterSuppliers()" type="text" placeholder="Search supplier or commodity" class="w-full h-9 pl-9 pr-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-xl text-xs font-semibold text-[#0F172A] dark:text-white outline-none focus:border-[#0B6623] transition">
                  </div>

                  <!-- Filters: Farmer, Dealer, Manufacturer -->
                  <div class="flex flex-wrap items-center gap-1.5 text-xs" id="supplierRoleFilterChips">
                    <button onclick="setSupplierRoleFilter('all', this)" class="supplier-role-chip px-3 py-1 rounded-full bg-[#0B6623] text-white font-bold text-xs shadow-xs transition cursor-pointer">All Roles</button>
                    <button onclick="setSupplierRoleFilter('Farmer', this)" class="supplier-role-chip px-3 py-1 rounded-full bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-[#0F172A] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-xs transition cursor-pointer">Farmer</button>
                    <button onclick="setSupplierRoleFilter('Dealer', this)" class="supplier-role-chip px-3 py-1 rounded-full bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-[#0F172A] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-xs transition cursor-pointer">Dealer</button>
                    <button onclick="setSupplierRoleFilter('Manufacturer', this)" class="supplier-role-chip px-3 py-1 rounded-full bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-[#0F172A] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-xs transition cursor-pointer">Manufacturer</button>
                  </div>
                </div>

                <!-- Status Chips, Manage in Grid Toggle & Add Link Button -->
                <div class="flex items-center gap-3 flex-wrap">
                  <div class="hidden sm:flex items-center gap-1.5 text-xs" id="supplierStatusFilterChips">
                    <button onclick="setSupplierStatusFilter('all', this)" class="supplier-status-chip px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-[#0F172A] dark:text-white font-bold text-xs transition cursor-pointer">All</button>
                    <button onclick="setSupplierStatusFilter('Active', this)" class="supplier-status-chip px-2.5 py-1 rounded-lg bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 font-semibold text-xs transition cursor-pointer">Active</button>
                    <button onclick="setSupplierStatusFilter('Pending', this)" class="supplier-status-chip px-2.5 py-1 rounded-lg bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 font-semibold text-xs transition cursor-pointer">Pending</button>
                  </div>

                  <!-- Manage in Grid / Table View Switcher -->
                  <div class="inline-flex items-center p-1 bg-[#F1F5F9] dark:bg-slate-800 rounded-xl border border-[#E2E8F0] dark:border-slate-700">
                    <button id="supplierViewBtnGrid" onclick="setSupplierViewMode('grid')" class="px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer" title="Manage in Grid">
                      <i data-lucide="layout-grid" class="w-3.5 h-3.5"></i>
                      <span>Manage in Grid</span>
                    </button>
                    <button id="supplierViewBtnTable" onclick="setSupplierViewMode('table')" class="px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer" title="Table View">
                      <i data-lucide="table" class="w-3.5 h-3.5"></i>
                      <span>Table View</span>
                    </button>
                  </div>

                  <button onclick="openAddSupplierLinkModal()" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition cursor-pointer">
                    <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add link
                  </button>
                </div>
              </div>
            </div>

            <!-- VIEW 1: Grid View Container (Manage in Grid) -->
            <div id="suppliersGridView" class="space-y-4">
              <div id="suppliersGridContainer" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                <!-- Supplier Cards Dynamically Injected by renderSuppliersUI() -->
              </div>

              <!-- Empty State for Grid -->
              <div id="suppliersGridEmpty" class="hidden saas-card p-12 text-center space-y-3">
                <div class="w-12 h-12 mx-auto rounded-full bg-slate-100 dark:bg-slate-800 text-[#64748B] flex items-center justify-center">
                  <i data-lucide="users" class="w-6 h-6"></i>
                </div>
                <div class="text-sm font-bold text-[#0F172A] dark:text-white">No suppliers found</div>
                <p class="text-xs text-[#64748B] max-w-sm mx-auto">No suppliers match the current search query or filter criteria. Try resetting the filters or add a new supplier link.</p>
                <button onclick="resetSupplierFilters()" class="px-3.5 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-semibold rounded-lg text-[#0F172A] dark:text-white transition cursor-pointer">Reset Filters</button>
              </div>

              <!-- Grid Pagination / Summary Footer -->
              <div class="saas-card p-3.5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
                <div class="flex items-center gap-2">
                  <span>Showing <span class="font-bold text-[#0F172A] dark:text-white" id="visibleSupplierCountGrid">8</span> of <span class="font-bold text-[#0F172A] dark:text-white" id="totalSupplierCountGrid">8</span> suppliers in grid view</span>
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

            <!-- VIEW 2: Table Card (Prompt A57 Columns: Name, Role, Place, Supply, Linked to, Status, Action) -->
            <div id="suppliersTableView" class="saas-card overflow-hidden hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse text-xs saas-table" id="suppliersTable">
                  <thead>
                    <tr class="bg-[#F8FAFC] dark:bg-slate-800 border-b border-[#E5E7EB] dark:border-slate-700 text-[#64748B] font-bold uppercase tracking-wider text-[11px]">
                      <th class="py-3 px-4">Name</th>
                      <th class="py-3 px-4">Role</th>
                      <th class="py-3 px-4">Place</th>
                      <th class="py-3 px-4">Supply</th>
                      <th class="py-3 px-4">Linked to</th>
                      <th class="py-3 px-4">Status</th>
                      <th class="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] dark:divide-slate-800" id="suppliersTableBody">
                    <!-- Populated dynamically by renderSuppliersUI() -->
                  </tbody>
                </table>
              </div>

              <!-- Pagination Footer -->
              <div class="p-3.5 bg-[#F8FAFC] dark:bg-slate-800/80 border-t border-[#E5E7EB] dark:border-slate-700 flex items-center justify-between text-xs text-[#64748B]">
                <div>Showing <span class="font-bold text-[#0F172A] dark:text-white" id="visibleSupplierCount">8</span> of <span class="font-bold text-[#0F172A] dark:text-white" id="totalSupplierCountTable">8</span> active supplier ties</div>
                <div class="flex items-center gap-1">
                  <button class="px-2.5 py-1 bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-xs font-semibold text-[#64748B] hover:bg-slate-50 dark:hover:bg-slate-700 disabled:opacity-50" disabled>Previous</button>
                  <button class="px-2.5 py-1 bg-[#0B6623] text-white rounded-lg text-xs font-bold">1</button>
                  <button class="px-2.5 py-1 bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-xs font-semibold text-[#64748B] hover:bg-slate-50 dark:hover:bg-slate-700">2</button>
                  <button class="px-2.5 py-1 bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-xs font-semibold text-[#64748B] hover:bg-slate-50 dark:hover:bg-slate-700">3</button>
                  <button class="px-2.5 py-1 bg-white dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-lg text-xs font-semibold text-[#64748B] hover:bg-slate-50 dark:hover:bg-slate-700">Next</button>
                </div>
              </div>
            </div>
          </div>\n\n\n          `;

html = html.substring(0, viewSuppliersStart) + newViewSuppliersHtml + html.substring(nextViewComment);
console.log('Replaced view-suppliers markup successfully');

// 3. Add #manageSupplierModal markup right after #addSupplierLinkModal
const addModalCloseIdx = html.indexOf('id="addSupplierLinkModal"');
const formEndIdx = html.indexOf('</form>', addModalCloseIdx);
const div1 = html.indexOf('</div>', formEndIdx + 7);
const div2 = html.indexOf('</div>', div1 + 6);
const insertModalPos = div2 + 6;

const manageModalHtml = `\n\n  <!-- Manage Supplier Link Modal -->
  <div id="manageSupplierModal" class="fixed inset-0 bg-slate-900/40 backdrop-blur-xs z-50 hidden flex items-center justify-center p-4">
    <div class="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-[#E5E7EB] dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-150 max-h-[90vh] overflow-y-auto">
      <div class="flex items-start justify-between pb-3 border-b border-[#E5E7EB] dark:border-slate-800">
        <div>
          <div class="flex items-center gap-2">
            <h3 class="text-base font-extrabold text-[#0F172A] dark:text-white">Manage Supplier Link</h3>
            <span id="manageModalSupplierIdBadge" class="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">SUP-001</span>
          </div>
          <p class="text-xs text-[#64748B] mt-0.5">Update commodity allocation, linked partner, fulfillment quota and settlement terms.</p>
        </div>
        <button onclick="closeManageSupplierModal()" class="w-8 h-8 rounded-lg text-[#64748B] hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center cursor-pointer">
          <i data-lucide="x" class="w-4 h-4"></i>
        </button>
      </div>

      <form onsubmit="handleSaveSupplierLink(event)" class="space-y-4 text-xs">
        <input type="hidden" id="manageModalSupplierId" />

        <!-- Row: Supplier Name & Role -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#0F172A] dark:text-white mb-1">Supplier Name <span class="text-rose-500">*</span></label>
            <input id="manageModalSupplierName" type="text" required class="w-full h-10 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs text-[#0F172A] dark:text-white" />
          </div>
          <div>
            <label class="block font-bold text-[#0F172A] dark:text-white mb-1">Supplier Role <span class="text-rose-500">*</span></label>
            <select id="manageModalSupplierRole" required class="w-full h-10 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs text-[#0F172A] dark:text-white">
              <option value="Farmer">Farmer (Direct Producer)</option>
              <option value="Dealer">Dealer (Agro Input Dist.)</option>
              <option value="Manufacturer">Manufacturer (Industrial Mill)</option>
            </select>
          </div>
        </div>

        <!-- Row: Place & Contact Mobile -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#0F172A] dark:text-white mb-1">Location / Village <span class="text-rose-500">*</span></label>
            <input id="manageModalSupplierPlace" type="text" required class="w-full h-10 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs text-[#0F172A] dark:text-white" />
          </div>
          <div>
            <label class="block font-bold text-[#0F172A] dark:text-white mb-1">Contact Phone</label>
            <input id="manageModalSupplierMobile" type="tel" class="w-full h-10 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs text-[#0F172A] dark:text-white" />
          </div>
        </div>

        <!-- Row: Linked Destination Partner & Commodity -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#0F172A] dark:text-white mb-1">Linked Destination Partner <span class="text-rose-500">*</span></label>
            <select id="manageModalSupplierLinked" required class="w-full h-10 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs text-[#0F172A] dark:text-white">
              <option value="Kuldevi Kirana">Kuldevi Kirana (Retailer Desk)</option>
              <option value="Patel Agro Industries">Patel Agro Industries (Industrial Mill)</option>
              <option value="Saurashtra Ginning Corp">Saurashtra Ginning Corp (Ginning Unit)</option>
              <option value="Amreli APMC Mandi Yard">Amreli APMC Mandi Yard (Terminal Market)</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-[#0F172A] dark:text-white mb-1">Supply Commodity <span class="text-rose-500">*</span></label>
            <select id="manageModalSupplierSupply" required class="w-full h-10 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs text-[#0F172A] dark:text-white">
              <option value="Groundnut">Groundnut</option>
              <option value="Cotton">Cotton</option>
              <option value="Urea & DAP">Urea & DAP</option>
              <option value="Bulk fertilizer / DAP">Bulk fertilizer / DAP</option>
              <option value="Certified Seeds">Certified Seeds</option>
              <option value="Cumin & Mustard">Cumin & Mustard</option>
              <option value="Wheat Tukdi">Wheat Tukdi</option>
              <option value="Cotton Bales">Cotton Bales</option>
            </select>
          </div>
        </div>

        <!-- Row: Agreed Volume & Grade -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#0F172A] dark:text-white mb-1">Agreed Volume / Quota <span class="text-rose-500">*</span></label>
            <input id="manageModalSupplierVolume" type="text" required class="w-full h-10 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs text-[#0F172A] dark:text-white" />
          </div>
          <div>
            <label class="block font-bold text-[#0F172A] dark:text-white mb-1">Quality Grade / Spec</label>
            <input id="manageModalSupplierGrade" type="text" class="w-full h-10 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs text-[#0F172A] dark:text-white" />
          </div>
        </div>

        <!-- Row: Settlement Terms & Link Status -->
        <div class="grid grid-cols-2 gap-3">
          <div>
            <label class="block font-bold text-[#0F172A] dark:text-white mb-1">Settlement Terms</label>
            <select id="manageModalSupplierTerms" class="w-full h-10 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs text-[#0F172A] dark:text-white">
              <option value="7-day Mandi NEFT">7-day Mandi NEFT</option>
              <option value="Instant Gate Settlement">Instant Gate Settlement</option>
              <option value="Direct DBT Bank Transfer">Direct DBT Bank Transfer</option>
              <option value="Fortnightly Clearing">Fortnightly Clearing</option>
              <option value="Cooperative Credit Khata">Cooperative Credit Khata</option>
              <option value="Consignment Billing">Consignment Billing</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
              <option value="Escrow Milestone">Escrow Milestone</option>
            </select>
          </div>
          <div>
            <label class="block font-bold text-[#0F172A] dark:text-white mb-1">Link Status <span class="text-rose-500">*</span></label>
            <select id="manageModalSupplierStatus" required class="w-full h-10 px-3 bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs text-[#0F172A] dark:text-white">
              <option value="Active">Active (In Pipeline)</option>
              <option value="Paused">Paused (Temporarily on Hold)</option>
              <option value="Pending">Pending (Awaiting Verification)</option>
            </select>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-3 border-t border-[#E5E7EB] dark:border-slate-800 flex items-center justify-between gap-2">
          <button type="button" onclick="deleteCurrentManagedSupplier()" class="h-9 px-3 text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 rounded-xl font-bold flex items-center gap-1.5 transition cursor-pointer">
            <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            <span>Delete Link</span>
          </button>
          <div class="flex items-center gap-2">
            <button type="button" onclick="closeManageSupplierModal()" class="h-9 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-[#0F172A] dark:text-white font-bold rounded-xl transition cursor-pointer">
              Cancel
            </button>
            <button type="submit" class="h-9 px-5 bg-[#0B6623] hover:bg-[#074818] text-white font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition cursor-pointer">
              <i data-lucide="save" class="w-3.5 h-3.5"></i>
              <span>Update Link</span>
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>`;

html = html.substring(0, insertModalPos) + manageModalHtml + html.substring(insertModalPos);
console.log('Inserted manageSupplierModal markup successfully');

// 4. Replace the old script block with the complete Suppliers Module Suite
const scriptOldStart = html.indexOf("let currentSupplierRoleFilter = 'all';");
if (scriptOldStart === -1) {
  console.error("let currentSupplierRoleFilter not found in script!");
  process.exit(1);
}
const scriptOldEnd = html.indexOf("// ─── MASTERS MODULE CRUD CONTROLLER", scriptOldStart);
if (scriptOldEnd === -1) {
  console.error("MASTERS MODULE CRUD CONTROLLER comment not found!");
  process.exit(1);
}

const newSuppliersScript = `// ─── SUPPLIERS MODULE GRID & CRUD CONTROLLER ─────────────────────────────────

    const DEFAULT_SEED_SUPPLIERS = [
      {
        id: 'SUP-001',
        name: 'Jayesh Patel',
        role: 'Farmer',
        place: 'Sudavad',
        district: 'Amreli',
        supply: 'Groundnut',
        linked: 'Kuldevi Kirana',
        linkedType: 'Retailer Desk',
        status: 'Active',
        volume: '120 Qtl / season',
        fulfillment: '99.4%',
        grade: 'Grade-A Bold',
        mobile: '+91 98251 44210',
        terms: '7-day Mandi NEFT'
      },
      {
        id: 'SUP-002',
        name: 'Kishan Agro',
        role: 'Dealer',
        place: 'Bagasara',
        district: 'Amreli',
        supply: 'Urea & DAP',
        linked: 'Kuldevi Kirana',
        linkedType: 'Retailer Desk',
        status: 'Active',
        volume: '45 Bags weekly',
        fulfillment: '98.8%',
        grade: 'IFFCO Certified',
        mobile: '+91 94282 11980',
        terms: 'Fortnightly Clearing'
      },
      {
        id: 'SUP-003',
        name: 'Jayesh Patel',
        role: 'Farmer',
        place: 'Sudavad',
        district: 'Amreli',
        supply: 'Cotton',
        linked: 'Patel Agro Industries',
        linkedType: 'Industrial Mill',
        status: 'Active',
        volume: '80 Qtl Cotton',
        fulfillment: '100%',
        grade: 'Shankar-6 High Staple',
        mobile: '+91 98251 44210',
        terms: 'Instant Gate Settlement'
      },
      {
        id: 'SUP-004',
        name: 'Ramesh Patel',
        role: 'Farmer',
        place: 'Amreli',
        district: 'Amreli',
        supply: 'Cotton',
        linked: 'Patel Agro Industries',
        linkedType: 'Industrial Mill',
        status: 'Active',
        volume: '60 Qtl Cotton',
        fulfillment: '97.5%',
        grade: 'Gujarat-6 Clean',
        mobile: '+91 97243 88102',
        terms: 'Direct DBT Bank Transfer'
      },
      {
        id: 'SUP-005',
        name: 'IFFCO Cooperative Hub',
        role: 'Manufacturer',
        place: 'Rajkot',
        district: 'Rajkot',
        supply: 'Bulk fertilizer / DAP',
        linked: 'Patel Agro Industries',
        linkedType: 'Industrial Mill',
        status: 'Active',
        volume: '200 MT Monthly',
        fulfillment: '99.8%',
        grade: 'National Standard',
        mobile: '+91 98790 22014',
        terms: 'Cooperative Credit Khata'
      },
      {
        id: 'SUP-006',
        name: 'Mahyco Seeds Network',
        role: 'Dealer',
        place: 'Amreli',
        district: 'Amreli',
        supply: 'Certified Seeds',
        linked: 'Kuldevi Kirana',
        linkedType: 'Retailer Desk',
        status: 'Active',
        volume: '80 Packets Batch',
        fulfillment: '99.1%',
        grade: 'Bt-Cotton & Sesame',
        mobile: '+91 99092 33451',
        terms: 'Consignment Billing'
      },
      {
        id: 'SUP-007',
        name: 'Kantibhai Savaliya',
        role: 'Farmer',
        place: 'Sudavad',
        district: 'Amreli',
        supply: 'Cumin & Mustard',
        linked: 'Kuldevi Kirana',
        linkedType: 'Retailer Desk',
        status: 'Active',
        volume: '35 Qtl Cumin',
        fulfillment: '98.2%',
        grade: 'Organic Unpolished',
        mobile: '+91 98791 22345',
        terms: 'Cash on Delivery'
      },
      {
        id: 'SUP-008',
        name: 'Saurashtra Ginning Corp',
        role: 'Manufacturer',
        place: 'Amreli',
        district: 'Amreli',
        supply: 'Cotton Bales',
        linked: 'Patel Agro Industries',
        linkedType: 'Industrial Mill',
        status: 'Pending',
        volume: '500 Bales',
        fulfillment: '94.0%',
        grade: 'Export Grade 29mm',
        mobile: '+91 98795 44100',
        terms: 'Escrow Milestone'
      }
    ];

    let currentSupplierRoleFilter = 'all';
    let currentSupplierStatusFilter = 'all';
    let currentSupplierViewMode = 'grid'; // Default view is "grid" as requested by user

    function initSuppliersRegistry() {
      try {
        const stored = localStorage.getItem('ankurmitra_suppliers_registry');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            window.ANKURMITRA_SUPPLIERS = parsed;
          } else {
            window.ANKURMITRA_SUPPLIERS = [...DEFAULT_SEED_SUPPLIERS];
          }
        } else {
          window.ANKURMITRA_SUPPLIERS = [...DEFAULT_SEED_SUPPLIERS];
          localStorage.setItem('ankurmitra_suppliers_registry', JSON.stringify(window.ANKURMITRA_SUPPLIERS));
        }

        const storedView = localStorage.getItem('ankurmitra_supplier_view_mode');
        if (storedView === 'table' || storedView === 'grid') {
          currentSupplierViewMode = storedView;
        }
      } catch (e) {
        window.ANKURMITRA_SUPPLIERS = [...DEFAULT_SEED_SUPPLIERS];
      }
    }

    function saveSuppliersRegistry() {
      try {
        localStorage.setItem('ankurmitra_suppliers_registry', JSON.stringify(window.ANKURMITRA_SUPPLIERS));
      } catch (e) {
        console.error('Failed to persist suppliers registry', e);
      }
    }

    function setSupplierViewMode(mode) {
      currentSupplierViewMode = mode;
      try {
        localStorage.setItem('ankurmitra_supplier_view_mode', mode);
      } catch (e) {}

      const gridView = document.getElementById('suppliersGridView');
      const tableView = document.getElementById('suppliersTableView');
      const btnGrid = document.getElementById('supplierViewBtnGrid');
      const btnTable = document.getElementById('supplierViewBtnTable');

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

      filterSuppliers();
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }

    function getSupplierInitials(name) {
      if (!name) return 'SP';
      const parts = name.trim().split(/\\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return name.slice(0, 2).toUpperCase();
    }

    function getSupplierRoleStyle(role) {
      if (role === 'Farmer') {
        return {
          avatarClass: 'bg-emerald-100 text-[#0B6623] dark:bg-emerald-950/60 dark:text-emerald-300',
          roleTagClass: 'bg-emerald-50 text-[#0B6623] border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800',
          roleIcon: 'sprout',
          roleIconColor: 'text-[#0B6623]'
        };
      } else if (role === 'Dealer') {
        return {
          avatarClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
          roleTagClass: 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800',
          roleIcon: 'store',
          roleIconColor: 'text-amber-700'
        };
      } else {
        return {
          avatarClass: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300',
          roleTagClass: 'bg-blue-50 text-blue-800 border border-blue-200 dark:bg-blue-950/40 dark:text-blue-300 dark:border-blue-800',
          roleIcon: 'factory',
          roleIconColor: 'text-blue-700'
        };
      }
    }

    function getSupplierCropStyle(supply) {
      const s = (supply || '').toLowerCase();
      if (s.includes('cotton')) return { cropIcon: 'feather', cropTagClass: 'bg-lime-50 text-lime-800 border border-lime-200 dark:bg-lime-950/40 dark:text-lime-300 dark:border-lime-800' };
      if (s.includes('urea') || s.includes('fertilizer') || s.includes('dap')) return { cropIcon: 'beaker', cropTagClass: 'bg-amber-50 text-amber-800 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800' };
      if (s.includes('seed')) return { cropIcon: 'sparkles', cropTagClass: 'bg-purple-50 text-purple-800 border border-purple-200 dark:bg-purple-950/40 dark:text-purple-300 dark:border-purple-800' };
      if (s.includes('cumin') || s.includes('mustard')) return { cropIcon: 'sun', cropTagClass: 'bg-yellow-50 text-yellow-800 border border-yellow-200 dark:bg-yellow-950/40 dark:text-yellow-300 dark:border-yellow-800' };
      return { cropIcon: 'leaf', cropTagClass: 'bg-emerald-50 text-[#0B6623] border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800' };
    }

    function getSupplierStatusStyle(status) {
      if (status === 'Active') {
        return {
          statusClass: 'bg-emerald-100 text-[#0B6623] dark:bg-emerald-950/60 dark:text-emerald-300',
          statusDotClass: 'bg-[#0B6623] dark:bg-emerald-400'
        };
      } else if (status === 'Pending') {
        return {
          statusClass: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
          statusDotClass: 'bg-amber-600 dark:bg-amber-400'
        };
      } else {
        return {
          statusClass: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300',
          statusDotClass: 'bg-slate-400 dark:bg-slate-500'
        };
      }
    }

    function updateSuppliersKpis() {
      const list = window.ANKURMITRA_SUPPLIERS || [];
      const activeCount = list.filter(s => s.status === 'Active').length;
      const farmerCount = list.filter(s => s.role === 'Farmer').length;
      const dealerCount = list.filter(s => s.role === 'Dealer').length;
      const mfgCount = list.filter(s => s.role === 'Manufacturer').length;

      const kpiActive = document.getElementById('kpiActiveSupplyLinks');
      if (kpiActive) kpiActive.textContent = activeCount;

      const kpiFarmer = document.getElementById('kpiFarmerSuppliers');
      if (kpiFarmer) kpiFarmer.textContent = farmerCount;

      const kpiDealer = document.getElementById('kpiAgroDealers');
      if (kpiDealer) kpiDealer.textContent = dealerCount;

      const kpiMfg = document.getElementById('kpiIndustrialProcessors');
      if (kpiMfg) kpiMfg.textContent = mfgCount;
    }

    function renderSuppliersUI() {
      if (!window.ANKURMITRA_SUPPLIERS) {
        initSuppliersRegistry();
      }

      const list = window.ANKURMITRA_SUPPLIERS;
      updateSuppliersKpis();

      // 1. Render Grid View Cards
      const gridContainer = document.getElementById('suppliersGridContainer');
      if (gridContainer) {
        gridContainer.innerHTML = list.map(s => {
          const initials = getSupplierInitials(s.name);
          const roleStyle = getSupplierRoleStyle(s.role);
          const cropStyle = getSupplierCropStyle(s.supply);
          const statusStyle = getSupplierStatusStyle(s.status);
          const destIcon = s.linked.toLowerCase().includes('kirana') ? 'store' : 'factory';

          return \`
            <div class="supplier-grid-card saas-card p-4 hover:shadow-md transition-all duration-200 flex flex-col justify-between border border-[#E2E8F0] dark:border-slate-800 rounded-2xl group bg-white dark:bg-slate-900"
                 data-id="\${s.id}" data-name="\${s.name}" data-role="\${s.role}" data-place="\${s.place}" data-supply="\${s.supply}" data-linked="\${s.linked}" data-status="\${s.status}">
              
              <div>
                <!-- Header: Avatar, Name, Link ID, Status Pill -->
                <div class="flex items-start justify-between gap-2 mb-3">
                  <div class="flex items-center gap-2.5">
                    <div class="relative">
                      <div class="w-10 h-10 rounded-xl font-black text-xs flex items-center justify-center shadow-xs \${roleStyle.avatarClass}">
                        \${initials}
                      </div>
                      <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] bg-white dark:bg-slate-800 shadow-xs border border-white dark:border-slate-700 \${roleStyle.roleIconColor}">
                        <i data-lucide="\${roleStyle.roleIcon}" class="w-2.5 h-2.5"></i>
                      </span>
                    </div>
                    <div>
                      <h4 class="font-bold text-sm text-[#0F172A] dark:text-white leading-tight group-hover:text-[#0B6623] transition-colors">\${s.name}</h4>
                      <div class="flex items-center gap-1.5 text-[11px] text-[#64748B] mt-0.5">
                        <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
                        <span>\${s.place}</span>
                        <span class="text-slate-300 dark:text-slate-700">•</span>
                        <span class="font-mono text-[10px] text-slate-400">\${s.id}</span>
                      </div>
                    </div>
                  </div>
                  <!-- Status Pill -->
                  <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold \${statusStyle.statusClass}">
                    <span class="w-1.5 h-1.5 rounded-full \${statusStyle.statusDotClass}"></span>
                    \${s.status}
                  </span>
                </div>

                <!-- Role and Commodity tags -->
                <div class="flex flex-wrap items-center gap-1.5 mb-3">
                  <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider \${roleStyle.roleTagClass}">
                    \${s.role}
                  </span>
                  <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold \${cropStyle.cropTagClass}">
                    <i data-lucide="\${cropStyle.cropIcon}" class="w-3 h-3"></i>
                    \${s.supply}
                  </span>
                  <span class="px-2 py-0.5 rounded-lg text-[10px] font-medium bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    \${s.grade}
                  </span>
                </div>

                <!-- Linked Destination Partner Box -->
                <div class="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-[#E2E8F0] dark:border-slate-700/80 mb-3 space-y-1.5">
                  <div class="text-[10px] font-semibold text-[#64748B] flex items-center justify-between">
                    <span class="flex items-center gap-1">
                      <i data-lucide="arrow-right-left" class="w-3 h-3 text-[#0B6623]"></i>
                      <span>Linked Destination</span>
                    </span>
                    <span class="font-mono text-[9px] text-emerald-600 dark:text-emerald-400 font-bold">Active Link</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-1.5 font-bold text-xs text-[#0F172A] dark:text-white">
                      <i data-lucide="\${destIcon}" class="w-3.5 h-3.5 text-teal-600"></i>
                      <span>\${s.linked}</span>
                    </div>
                    <span class="text-[10px] text-[#64748B]">\${s.linkedType || 'Procurement Hub'}</span>
                  </div>
                </div>

                <!-- Allocation / SLA Metrics Grid -->
                <div class="grid grid-cols-2 gap-2 mb-3 text-xs">
                  <div class="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <div class="text-[10px] text-[#64748B]">Agreed Volume</div>
                    <div class="font-bold text-[#0F172A] dark:text-white text-[11px] truncate mt-0.5">\${s.volume}</div>
                  </div>
                  <div class="p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <div class="text-[10px] text-[#64748B]">Fulfillment SLA</div>
                    <div class="font-bold text-emerald-600 dark:text-emerald-400 text-[11px] flex items-center gap-1 mt-0.5">
                      <i data-lucide="check-circle" class="w-3 h-3"></i>
                      <span>\${s.fulfillment}</span>
                    </div>
                  </div>
                </div>

                <!-- Settlement Terms & Phone -->
                <div class="space-y-1 text-[11px] text-[#64748B] pb-3 border-b border-[#E2E8F0] dark:border-slate-800">
                  <div class="flex items-center justify-between">
                    <span class="flex items-center gap-1 text-[10px] text-slate-500">
                      <i data-lucide="credit-card" class="w-3 h-3"></i> Terms:
                    </span>
                    <span class="font-semibold text-[#0F172A] dark:text-slate-300 text-[10px]">\${s.terms}</span>
                  </div>
                  <div class="flex items-center justify-between">
                    <span class="flex items-center gap-1 text-[10px] text-slate-500">
                      <i data-lucide="phone" class="w-3 h-3"></i> Contact:
                    </span>
                    <a href="tel:\${s.mobile}" class="font-mono text-[#0B6623] hover:underline text-[10px] font-bold">\${s.mobile}</a>
                  </div>
                </div>
              </div>

              <!-- Direct Grid Management Actions -->
              <div class="pt-3 flex items-center gap-2">
                <button onclick="openManageSupplierModal('\${s.id}')" class="flex-1 h-8 px-3 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer">
                  <i data-lucide="sliders" class="w-3.5 h-3.5"></i>
                  <span>Manage</span>
                </button>
                <button onclick="toggleSupplierLinkStatus('\${s.id}')" title="\${s.status === 'Active' ? 'Pause supply link' : 'Activate supply link'}" class="h-8 px-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-xs font-bold \${s.status === 'Active' ? 'text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30' : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'} transition flex items-center gap-1 cursor-pointer">
                  <i data-lucide="\${s.status === 'Active' ? 'pause-circle' : 'play-circle'}" class="w-3.5 h-3.5"></i>
                  <span class="hidden sm:inline">\${s.status === 'Active' ? 'Pause' : 'Activate'}</span>
                </button>
                <button onclick="deleteSupplierLink('\${s.id}')" title="Delete link" class="h-8 w-8 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 flex items-center justify-center transition cursor-pointer">
                  <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                </button>
              </div>
            </div>
          \`;
        }).join('');
      }

      // 2. Render Table View Rows
      const tableBody = document.getElementById('suppliersTableBody');
      if (tableBody) {
        tableBody.innerHTML = list.map(s => {
          const initials = getSupplierInitials(s.name);
          const roleStyle = getSupplierRoleStyle(s.role);
          const cropStyle = getSupplierCropStyle(s.supply);
          const statusStyle = getSupplierStatusStyle(s.status);
          const destIcon = s.linked.toLowerCase().includes('kirana') ? 'store' : 'factory';

          return \`
            <tr class="supplier-row hover:bg-slate-50/60 dark:hover:bg-slate-800/50 transition" data-id="\${s.id}" data-name="\${s.name}" data-role="\${s.role}" data-place="\${s.place}" data-supply="\${s.supply}" data-linked="\${s.linked}" data-status="\${s.status}">
              <td class="py-3 px-4">
                <div class="flex items-center gap-2.5">
                  <div class="w-7 h-7 rounded-full font-bold flex items-center justify-center text-xs \${roleStyle.avatarClass}">\${initials}</div>
                  <div>
                    <div class="font-bold text-[#0F172A] dark:text-white">\${s.name}</div>
                    <div class="text-[10px] text-[#64748B] font-mono">\${s.id} · \${s.volume}</div>
                  </div>
                </div>
              </td>
              <td class="py-3 px-4">
                <span class="px-2.5 py-0.5 rounded-full font-bold text-[10px] \${roleStyle.roleTagClass}">\${s.role}</span>
              </td>
              <td class="py-3 px-4 font-medium text-[#0F172A] dark:text-slate-300">\${s.place}</td>
              <td class="py-3 px-4 font-semibold">
                <span class="px-2 py-0.5 rounded text-[11px] font-bold \${cropStyle.cropTagClass}">\${s.supply}</span>
              </td>
              <td class="py-3 px-4 font-bold text-[#0F172A] dark:text-white">
                <div class="flex items-center gap-1.5">
                  <i data-lucide="\${destIcon}" class="w-3.5 h-3.5 text-teal-600"></i>
                  <span>\${s.linked}</span>
                </div>
              </td>
              <td class="py-3 px-4">
                <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold \${statusStyle.statusClass}">
                  <span class="w-1.5 h-1.5 rounded-full \${statusStyle.statusDotClass}"></span> \${s.status}
                </span>
              </td>
              <td class="py-3 px-4 text-right">
                <button onclick="openManageSupplierModal('\${s.id}')" class="text-xs font-bold text-[#0B6623] hover:text-[#074818] inline-flex items-center gap-1 hover:underline cursor-pointer">
                  <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Manage
                </button>
              </td>
            </tr>
          \`;
        }).join('');
      }

      // Update footers
      const totalCountGrid = document.getElementById('totalSupplierCountGrid');
      if (totalCountGrid) totalCountGrid.textContent = list.length;
      const totalCountTable = document.getElementById('totalSupplierCountTable');
      if (totalCountTable) totalCountTable.textContent = list.length;

      // Apply active view mode
      setSupplierViewMode(currentSupplierViewMode);
    }

    function filterSuppliers() {
      const query = (document.getElementById('supplierSearchInput')?.value || '').toLowerCase().trim();
      const cards = document.querySelectorAll('#suppliersGridContainer div.supplier-grid-card');
      const rows = document.querySelectorAll('#suppliersTableBody tr.supplier-row');

      let visibleCount = 0;

      // Filter Cards in Grid View
      cards.forEach(card => {
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        const role = card.getAttribute('data-role') || '';
        const place = (card.getAttribute('data-place') || '').toLowerCase();
        const supply = (card.getAttribute('data-supply') || '').toLowerCase();
        const linked = (card.getAttribute('data-linked') || '').toLowerCase();
        const status = card.getAttribute('data-status') || '';
        const id = (card.getAttribute('data-id') || '').toLowerCase();

        const matchesQuery = !query || name.includes(query) || supply.includes(query) || linked.includes(query) || place.includes(query) || id.includes(query);
        const matchesRole = currentSupplierRoleFilter === 'all' || role === currentSupplierRoleFilter;
        const matchesStatus = currentSupplierStatusFilter === 'all' || status === currentSupplierStatusFilter;

        if (matchesQuery && matchesRole && matchesStatus) {
          card.style.display = '';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });

      // Filter Rows in Table View
      rows.forEach(row => {
        const name = (row.getAttribute('data-name') || '').toLowerCase();
        const role = row.getAttribute('data-role') || '';
        const place = (row.getAttribute('data-place') || '').toLowerCase();
        const supply = (row.getAttribute('data-supply') || '').toLowerCase();
        const linked = (row.getAttribute('data-linked') || '').toLowerCase();
        const status = row.getAttribute('data-status') || '';
        const id = (row.getAttribute('data-id') || '').toLowerCase();

        const matchesQuery = !query || name.includes(query) || supply.includes(query) || linked.includes(query) || place.includes(query) || id.includes(query);
        const matchesRole = currentSupplierRoleFilter === 'all' || role === currentSupplierRoleFilter;
        const matchesStatus = currentSupplierStatusFilter === 'all' || status === currentSupplierStatusFilter;

        if (matchesQuery && matchesRole && matchesStatus) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });

      // Update counters
      const countEl = document.getElementById('visibleSupplierCount');
      if (countEl) countEl.textContent = visibleCount;
      const countGridEl = document.getElementById('visibleSupplierCountGrid');
      if (countGridEl) countGridEl.textContent = visibleCount;

      // Empty states
      const gridEmpty = document.getElementById('suppliersGridEmpty');
      if (gridEmpty) {
        if (visibleCount === 0) gridEmpty.classList.remove('hidden');
        else gridEmpty.classList.add('hidden');
      }
    }

    function setSupplierRoleFilter(role, btn) {
      currentSupplierRoleFilter = role;
      document.querySelectorAll('#supplierRoleFilterChips button.supplier-role-chip').forEach(b => {
        b.className = 'supplier-role-chip px-3 py-1 rounded-full bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-[#0F172A] dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-xs transition cursor-pointer';
      });
      if (btn) {
        btn.className = 'supplier-role-chip px-3 py-1 rounded-full bg-[#0B6623] text-white font-bold text-xs shadow-xs transition cursor-pointer';
      }
      filterSuppliers();
    }

    function setSupplierStatusFilter(status, btn) {
      currentSupplierStatusFilter = status;
      document.querySelectorAll('#supplierStatusFilterChips button.supplier-status-chip').forEach(b => {
        b.className = 'supplier-status-chip px-2.5 py-1 rounded-lg bg-[#F8FAFC] dark:bg-slate-800 border border-[#E5E7EB] dark:border-slate-700 text-[#64748B] hover:bg-slate-100 dark:hover:bg-slate-700 font-semibold text-xs transition cursor-pointer';
      });
      if (btn) {
        btn.className = 'supplier-status-chip px-2.5 py-1 rounded-lg bg-slate-200 dark:bg-slate-700 text-[#0F172A] dark:text-white font-bold text-xs transition cursor-pointer';
      }
      filterSuppliers();
    }

    function resetSupplierFilters() {
      const searchInput = document.getElementById('supplierSearchInput');
      if (searchInput) searchInput.value = '';
      currentSupplierRoleFilter = 'all';
      currentSupplierStatusFilter = 'all';

      const firstRoleChip = document.querySelector('#supplierRoleFilterChips button.supplier-role-chip');
      if (firstRoleChip) setSupplierRoleFilter('all', firstRoleChip);

      const firstStatusChip = document.querySelector('#supplierStatusFilterChips button.supplier-status-chip');
      if (firstStatusChip) setSupplierStatusFilter('all', firstStatusChip);

      filterSuppliers();
    }

    function openManageSupplierModal(supplierId) {
      if (!window.ANKURMITRA_SUPPLIERS) initSuppliersRegistry();
      const s = window.ANKURMITRA_SUPPLIERS.find(item => item.id === supplierId || item.name === supplierId);
      if (!s) {
        showToast('Supplier link not found', 'error');
        return;
      }

      document.getElementById('manageModalSupplierId').value = s.id;
      document.getElementById('manageModalSupplierIdBadge').textContent = s.id;
      document.getElementById('manageModalSupplierName').value = s.name;
      document.getElementById('manageModalSupplierRole').value = s.role;
      document.getElementById('manageModalSupplierPlace').value = s.place;
      document.getElementById('manageModalSupplierMobile').value = s.mobile || '';
      document.getElementById('manageModalSupplierLinked').value = s.linked;
      document.getElementById('manageModalSupplierSupply').value = s.supply;
      document.getElementById('manageModalSupplierVolume').value = s.volume;
      document.getElementById('manageModalSupplierGrade').value = s.grade || '';
      document.getElementById('manageModalSupplierTerms').value = s.terms || '7-day Mandi NEFT';
      document.getElementById('manageModalSupplierStatus').value = s.status;

      const modal = document.getElementById('manageSupplierModal');
      if (modal) {
        modal.classList.remove('hidden');
        if (window.lucide && typeof lucide.createIcons === 'function') {
          lucide.createIcons();
        }
      }
    }

    function closeManageSupplierModal() {
      const modal = document.getElementById('manageSupplierModal');
      if (modal) modal.classList.add('hidden');
    }

    function handleSaveSupplierLink(e) {
      e.preventDefault();
      const id = document.getElementById('manageModalSupplierId').value;
      const s = window.ANKURMITRA_SUPPLIERS.find(item => item.id === id);
      if (!s) {
        showToast('Supplier record could not be located', 'error');
        return;
      }

      s.name = document.getElementById('manageModalSupplierName').value.trim();
      s.role = document.getElementById('manageModalSupplierRole').value;
      s.place = document.getElementById('manageModalSupplierPlace').value.trim();
      s.mobile = document.getElementById('manageModalSupplierMobile').value.trim() || s.mobile;
      s.linked = document.getElementById('manageModalSupplierLinked').value;
      s.linkedType = s.linked.toLowerCase().includes('kirana') ? 'Retailer Desk' : 'Industrial Mill';
      s.supply = document.getElementById('manageModalSupplierSupply').value;
      s.volume = document.getElementById('manageModalSupplierVolume').value.trim();
      s.grade = document.getElementById('manageModalSupplierGrade').value.trim() || s.grade;
      s.terms = document.getElementById('manageModalSupplierTerms').value;
      s.status = document.getElementById('manageModalSupplierStatus').value;

      saveSuppliersRegistry();
      renderSuppliersUI();
      closeManageSupplierModal();
      showToast(\`Supplier link \${s.id} (\${s.name}) updated successfully\`, 'success');
    }

    function toggleSupplierLinkStatus(supplierId) {
      if (!window.ANKURMITRA_SUPPLIERS) initSuppliersRegistry();
      const s = window.ANKURMITRA_SUPPLIERS.find(item => item.id === supplierId);
      if (!s) return;

      const oldStatus = s.status;
      s.status = oldStatus === 'Active' ? 'Paused' : 'Active';
      saveSuppliersRegistry();
      renderSuppliersUI();
      showToast(\`Link for \${s.name} is now \${s.status}\`, 'info');
    }

    function deleteSupplierLink(supplierId) {
      if (!window.ANKURMITRA_SUPPLIERS) initSuppliersRegistry();
      const s = window.ANKURMITRA_SUPPLIERS.find(item => item.id === supplierId);
      const name = s ? s.name : supplierId;

      window.ANKURMITRA_SUPPLIERS = window.ANKURMITRA_SUPPLIERS.filter(item => item.id !== supplierId);
      saveSuppliersRegistry();
      renderSuppliersUI();
      showToast(\`Supplier link \${supplierId} (\${name}) removed\`, 'warning');
    }

    function deleteCurrentManagedSupplier() {
      const id = document.getElementById('manageModalSupplierId').value;
      if (id) {
        deleteSupplierLink(id);
        closeManageSupplierModal();
      }
    }

    function manageSupplierLink(name, linked, supply, status) {
      if (!window.ANKURMITRA_SUPPLIERS) initSuppliersRegistry();
      const match = window.ANKURMITRA_SUPPLIERS.find(s => s.name.toLowerCase().includes(name.toLowerCase()) || (s.linked && s.linked.toLowerCase().includes(linked.toLowerCase())));
      if (match) {
        openManageSupplierModal(match.id);
      } else {
        openAddSupplierLinkModalWith(name);
      }
    }

    function openAddSupplierLinkModal() {
      const modal = document.getElementById('addSupplierLinkModal');
      if (modal) {
        modal.classList.remove('hidden');
        if (window.lucide && typeof lucide.createIcons === 'function') {
          lucide.createIcons();
        }
      }
    }

    function openAddSupplierLinkModalWith(supplierName) {
      openAddSupplierLinkModal();
      const select = document.getElementById('modalSupplierSource');
      if (select) {
        for (let opt of select.options) {
          if (opt.value.includes(supplierName)) {
            opt.selected = true;
            break;
          }
        }
      }
    }

    function closeAddSupplierLinkModal() {
      const modal = document.getElementById('addSupplierLinkModal');
      if (modal) modal.classList.add('hidden');
    }

    function handleCreateSupplierLink(e) {
      e.preventDefault();
      const source = document.getElementById('modalSupplierSource')?.value || 'Jayesh Patel (Farmer, Sudavad)';
      const target = document.getElementById('modalSupplierTarget')?.value || 'Kuldevi Kirana (Retailer, Bagasara)';
      const crop = document.getElementById('modalSupplierCrop')?.value || 'Groundnut';
      const volume = document.getElementById('modalSupplierVolume')?.value || '25 Quintals';

      // Parse source name and role
      let name = source.split('(')[0].trim();
      let role = 'Farmer';
      if (source.includes('Dealer')) role = 'Dealer';
      if (source.includes('Manufacturer')) role = 'Manufacturer';

      let place = 'Amreli';
      if (source.includes('Sudavad')) place = 'Sudavad';
      if (source.includes('Bagasara')) place = 'Bagasara';
      if (source.includes('Rajkot')) place = 'Rajkot';

      let linkedName = target.split('(')[0].trim();
      let linkedType = linkedName.toLowerCase().includes('kirana') ? 'Retailer Desk' : 'Industrial Mill';

      if (!window.ANKURMITRA_SUPPLIERS) initSuppliersRegistry();

      const newId = \`SUP-00\${window.ANKURMITRA_SUPPLIERS.length + 1}\`;
      const newSupplier = {
        id: newId,
        name: name,
        role: role,
        place: place,
        district: 'Amreli',
        supply: crop,
        linked: linkedName,
        linkedType: linkedType,
        status: 'Active',
        volume: volume,
        fulfillment: '100%',
        grade: 'Standard Spec',
        mobile: '+91 98250 ' + Math.floor(10000 + Math.random() * 90000),
        terms: '7-day Mandi NEFT'
      };

      window.ANKURMITRA_SUPPLIERS.unshift(newSupplier);
      saveSuppliersRegistry();
      renderSuppliersUI();
      closeAddSupplierLinkModal();
      showToast(\`Supplier link \${newId} established: \${name} -> \${linkedName} (\${crop})\`, 'success');
    }

    // Expose suppliers controllers globally
    window.initSuppliersRegistry = initSuppliersRegistry;
    window.renderSuppliersUI = renderSuppliersUI;
    window.setSupplierViewMode = setSupplierViewMode;
    window.filterSuppliers = filterSuppliers;
    window.setSupplierRoleFilter = setSupplierRoleFilter;
    window.setSupplierStatusFilter = setSupplierStatusFilter;
    window.resetSupplierFilters = resetSupplierFilters;
    window.openManageSupplierModal = openManageSupplierModal;
    window.closeManageSupplierModal = closeManageSupplierModal;
    window.handleSaveSupplierLink = handleSaveSupplierLink;
    window.toggleSupplierLinkStatus = toggleSupplierLinkStatus;
    window.deleteSupplierLink = deleteSupplierLink;
    window.deleteCurrentManagedSupplier = deleteCurrentManagedSupplier;
    window.manageSupplierLink = manageSupplierLink;
    window.openAddSupplierLinkModal = openAddSupplierLinkModal;
    window.openAddSupplierLinkModalWith = openAddSupplierLinkModalWith;
    window.closeAddSupplierLinkModal = closeAddSupplierLinkModal;
    window.handleCreateSupplierLink = handleCreateSupplierLink;

    // Auto-initialize suppliers when document is ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        initSuppliersRegistry();
        renderSuppliersUI();
      });
    } else {
      initSuppliersRegistry();
      renderSuppliersUI();
    }

    
    `;

html = html.substring(0, scriptOldStart) + newSuppliersScript + html.substring(scriptOldEnd);
console.log('Replaced script block successfully');

// 5. In navigateTo, ensure renderSuppliersUI is triggered when pageId === 'suppliers'
const navTargetViewPos = html.indexOf('const targetView = document.getElementById(`view-${pageId}`);');
if (navTargetViewPos !== -1) {
  const insertNavHook = `if (pageId === 'suppliers' && typeof renderSuppliersUI === 'function') {
        renderSuppliersUI();
      }
      `;
  if (!html.includes("pageId === 'suppliers' && typeof renderSuppliersUI")) {
    html = html.substring(0, navTargetViewPos) + insertNavHook + html.substring(navTargetViewPos);
    console.log('Inserted navigateTo hook for suppliers');
  }
}

// 6. Write patched index.html
fs.writeFileSync(indexPath, html, 'utf8');
console.log('Patched index.html successfully written!');
