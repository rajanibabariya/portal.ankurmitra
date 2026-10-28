// apply_patch.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const contentBuilder = require('./builder_content_full.js');
const supportBuilder = require('./builder_support_full.js');
const reportsBuilder = require('./builder_reports_full.js');
const accessBuilder = require('./builder_access_full.js');
const settingsBuilder = require('./builder_settings_full.js');

let html = fs.readFileSync('index.html', 'utf8');

console.log('Original index.html len:', html.length);

// 1. UPDATE LOGIN PAGE BACKGROUND IMAGE (Real image)
html = html.replace(
  `style="background-image: url('assets/login_farm_bg.svg');"`,
  `style="background-image: url('assets/login_farm_real.jpg'), url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1600&q=80');"`
);

// 2. UPDATE HEADER PANEL (Remove date picker, add notification & profile flyout popups)
const headerStart = html.indexOf('<header');
const headerEnd = html.indexOf('</header>') + 9;
if (headerStart === -1 || headerEnd === -1) throw new Error('Could not find <header> tag in index.html');

const newHeaderHtml = `<header class="h-16 bg-white border-b border-[#E5E7EB] z-30 flex items-center justify-between px-6 flex-shrink-0">
      
      <!-- Left / Center: Search field 40px + Place chip (Date picker removed as requested) -->
      <div class="flex items-center gap-3 flex-1 max-w-2xl">
        <button onclick="toggleMobileSidebar()" class="lg:hidden p-2 text-[#64748B] hover:bg-[#F8FAFC] rounded-lg">
          <i data-lucide="menu" class="w-5 h-5"></i>
        </button>

        <!-- Wide Search 40px height, magnifier, placeholder 'Search orders, users, places' -->
        <div class="relative flex-1 max-w-md">
          <div class="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B]">
            <i data-lucide="search" class="w-4 h-4"></i>
          </div>
          <input type="text" id="headerSearchInput" oninput="handleGlobalSearch(this.value)"
            placeholder="Search orders, users, places" 
            class="w-full h-10 pl-10 pr-16 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#0F172A] focus:bg-white focus:border-[#0B6623] outline-none transition">
          <div class="absolute inset-y-0 right-0 pr-2.5 flex items-center">
            <kbd class="px-1.5 py-0.5 text-[10px] font-mono text-[#64748B] bg-white border border-[#E5E7EB] rounded shadow-2xs">Ctrl K</kbd>
          </div>
        </div>

        <!-- Place Chip Only (Date picker removed) -->
        <div class="hidden sm:flex items-center gap-2">
          <span class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E5E7EB] text-xs font-semibold text-[#0F172A]">
            <i data-lucide="map-pin" class="w-3.5 h-3.5 text-[#0B6623]"></i>
            <span id="headerPlaceChip">Amreli</span>
          </span>
        </div>
      </div>

      <!-- Right: Role pill, Notification Flyout Popup, User Profile Flyout Dropdown -->
      <div class="flex items-center gap-3">
        <!-- Interactive Role Switcher Pill Dropdown -->
        <div class="relative">
          <button onclick="toggleRoleDropdown(event)" id="headerRolePillBtn" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-xs transition bg-[#0B6623]">
            <span class="w-2 h-2 rounded-full bg-white/80"></span>
            <span id="headerRolePill">Super admin · Full access</span>
            <i data-lucide="chevron-down" class="w-3.5 h-3.5 ml-0.5"></i>
          </button>
          
          <div id="roleDropdownMenu" class="hidden absolute right-0 mt-2 w-56 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-2 z-50 text-xs font-semibold text-[#0F172A]">
            <div class="px-2.5 py-1 text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Switch Desk & Role:</div>
            <button onclick="switchActiveRole('superadmin')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between">
              <span>Super admin</span>
              <i data-lucide="shield-check" class="w-3.5 h-3.5 text-[#0B6623]"></i>
            </button>
            <button onclick="switchActiveRole('sales_admin')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between">
              <span>Sales desk admin</span>
            </button>
            <button onclick="switchActiveRole('dealer')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between">
              <span>Verified Dealer</span>
            </button>
            <button onclick="switchActiveRole('field_officer')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between">
              <span>Agronomy Officer</span>
            </button>
          </div>
        </div>

        <!-- Notification Bell with Interactive Popup Flyout -->
        <div class="relative">
          <button onclick="toggleNotificationPopup(event)" id="headerNotificationBtn" class="relative p-2 rounded-xl text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] transition">
            <i data-lucide="bell" class="w-5 h-5"></i>
            <span id="notificationBadgeCounter" class="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>

          <!-- Notification Flyout Dropdown -->
          <div id="notificationPopupDropdown" class="hidden absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl p-4 z-50 text-xs">
            <div class="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div class="flex items-center gap-2">
                <span class="font-bold text-sm text-[#0F172A]">Notifications</span>
                <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-[#0B6623] text-[10px] font-bold">3 New</span>
              </div>
              <button onclick="markAllNotificationsRead()" class="text-[11px] font-semibold text-[#0B6623] hover:underline">Mark all read</button>
            </div>
            
            <div class="divide-y divide-[#F1F5F9] max-h-80 overflow-y-auto mt-2">
              <div class="py-2.5 flex items-start gap-3 hover:bg-[#F8FAFC] rounded-lg px-2 transition cursor-pointer">
                <div class="w-8 h-8 rounded-full bg-emerald-100 text-[#0B6623] flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <i data-lucide="bell-ring" class="w-4 h-4"></i>
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-[#0F172A]">High Pest Warning: Pink Bollworm</p>
                  <p class="text-[11px] text-[#64748B]">Severe infestation flagged in Amreli & Bhavnagar clusters.</p>
                  <span class="text-[10px] text-slate-400 mt-1 block">10 mins ago</span>
                </div>
              </div>

              <div class="py-2.5 flex items-start gap-3 hover:bg-[#F8FAFC] rounded-lg px-2 transition cursor-pointer">
                <div class="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <i data-lucide="shopping-bag" class="w-4 h-4"></i>
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-[#0F172A]">New Dealer Order: ₹ 48,200</p>
                  <p class="text-[11px] text-[#64748B]">Shree Khodiyar Agro ordered 12 Bags of Gujarat-6 Cotton.</p>
                  <span class="text-[10px] text-slate-400 mt-1 block">28 mins ago</span>
                </div>
              </div>

              <div class="py-2.5 flex items-start gap-3 hover:bg-[#F8FAFC] rounded-lg px-2 transition cursor-pointer">
                <div class="w-8 h-8 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                  <i data-lucide="wrench" class="w-4 h-4"></i>
                </div>
                <div class="flex-1">
                  <p class="font-semibold text-[#0F172A]">Tool Booking Approved</p>
                  <p class="text-[11px] text-[#64748B]">Mahindra 575 DI Tractor allocated to Farmer Jignesh Patel.</p>
                  <span class="text-[10px] text-slate-400 mt-1 block">1 hour ago</span>
                </div>
              </div>
            </div>

            <div class="pt-3 border-t border-[#F1F5F9] text-center mt-2">
              <button onclick="navigateTo('smart-alerts')" class="text-xs font-bold text-[#0B6623] hover:underline">View All Alert History &rarr;</button>
            </div>
          </div>
        </div>

        <!-- User Profile Avatar with Interactive Dropdown Menu -->
        <div class="relative">
          <button onclick="toggleProfileDropdown(event)" id="headerProfileAvatarBtn" class="flex items-center gap-2 p-1.5 rounded-xl hover:bg-[#F8FAFC] transition">
            <div class="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-300 text-[#0B6623] flex items-center justify-center font-bold text-xs shadow-2xs">
              <span id="headerUserInitials">RB</span>
            </div>
            <div class="hidden md:block text-left text-xs leading-tight">
              <div class="font-bold text-[#0F172A]" id="headerUserName">Rajesh Patel</div>
              <div class="text-[11px] text-[#64748B]" id="headerUserRoleText">Super Admin</div>
            </div>
            <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-[#64748B] hidden md:block"></i>
          </button>

          <!-- Profile Flyout Dropdown -->
          <div id="profileDropdownMenu" class="hidden absolute right-0 mt-2 w-64 bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl p-3 z-50 text-xs">
            <div class="flex items-center gap-3 p-2 bg-[#F8FAFC] rounded-xl mb-2">
              <div class="w-10 h-10 rounded-full bg-[#0B6623] text-white flex items-center justify-center font-bold text-sm shadow-xs">
                RB
              </div>
              <div class="truncate">
                <p class="font-bold text-[#0F172A] truncate">Rajesh Patel</p>
                <p class="text-[11px] text-[#64748B] truncate">admin@ankurmitra.in</p>
                <span class="inline-block mt-0.5 px-2 py-0.5 rounded-md bg-emerald-100 text-[#0B6623] font-bold text-[9px] uppercase tracking-wider">Super Administrator</span>
              </div>
            </div>

            <div class="space-y-0.5 py-1">
              <button onclick="navigateTo('users')" class="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F8FAFC] flex items-center gap-2.5 text-[#334155] font-semibold transition">
                <i data-lucide="user" class="w-4 h-4 text-[#64748B]"></i>
                <span>My Profile & KYC</span>
              </button>
              <button onclick="navigateTo('role-matrix')" class="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F8FAFC] flex items-center gap-2.5 text-[#334155] font-semibold transition">
                <i data-lucide="shield" class="w-4 h-4 text-[#64748B]"></i>
                <span>Role Permissions</span>
              </button>
              <button onclick="navigateTo('settings')" class="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F8FAFC] flex items-center gap-2.5 text-[#334155] font-semibold transition">
                <i data-lucide="sliders" class="w-4 h-4 text-[#64748B]"></i>
                <span>Account & App Settings</span>
              </button>
              <button onclick="navigateTo('help-support')" class="w-full text-left px-3 py-2 rounded-lg hover:bg-[#F8FAFC] flex items-center gap-2.5 text-[#334155] font-semibold transition">
                <i data-lucide="life-buoy" class="w-4 h-4 text-[#64748B]"></i>
                <span>Help & SLA Support</span>
              </button>
            </div>

            <div class="pt-2 border-t border-[#F1F5F9] mt-1">
              <button onclick="logout()" class="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 flex items-center gap-2.5 text-red-600 font-bold transition">
                <i data-lucide="log-out" class="w-4 h-4 text-red-500"></i>
                <span>Sign Out of Portal</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </header>`;

html = html.substring(0, headerStart) + newHeaderHtml + html.substring(headerEnd);

// 3. CALCULATE EXACT BOUNDS FOR MODULE REPLACEMENTS
function getBounds(source, startTarget, endTarget) {
  const sTag = source.indexOf(startTarget);
  if (sTag === -1) throw new Error('Start target not found: ' + startTarget);
  let s = source.lastIndexOf('\n', sTag);
  s = s === -1 ? 0 : s + 1;
  const prevCommentEnd = source.lastIndexOf('-->', sTag);
  if (prevCommentEnd !== -1 && sTag - prevCommentEnd < 60) {
    const prevCommentStart = source.lastIndexOf('<!--', prevCommentEnd);
    if (prevCommentStart !== -1) {
      const lineBefore = source.lastIndexOf('\n', prevCommentStart);
      s = lineBefore === -1 ? 0 : lineBefore + 1;
    }
  }

  const eTag = source.indexOf(endTarget);
  if (eTag === -1) throw new Error('End target not found: ' + endTarget);
  let e = source.lastIndexOf('\n', eTag);
  e = e === -1 ? eTag : e + 1;
  const eCommentEnd = source.lastIndexOf('-->', eTag);
  if (eCommentEnd !== -1 && eTag - eCommentEnd < 60) {
    const eCommentStart = source.lastIndexOf('<!--', eCommentEnd);
    if (eCommentStart !== -1) {
      const lineBefore = source.lastIndexOf('\n', eCommentStart);
      e = lineBefore === -1 ? 0 : lineBefore + 1;
    }
  }
  return { s, e };
}

const bSettings = getBounds(html, 'id="view-settings-hub"', '</main>');
const bAccess = getBounds(html, 'id="view-role-matrix"', 'id="view-settings-hub"');
const bReports = getBounds(html, 'id="view-reports-hub"', 'id="view-role-matrix"');
const bSupport = getBounds(html, 'id="view-help-support"', 'id="view-reports-hub"');
const bContent = getBounds(html, 'id="view-ads"', 'id="view-help-support"');

console.log('Bounds calculated (bottom-to-top replacement):');
console.log('bSettings:', bSettings);
console.log('bAccess:', bAccess);
console.log('bReports:', bReports);
console.log('bSupport:', bSupport);
console.log('bContent:', bContent);

// Splice views bottom-to-top
html = html.substring(0, bSettings.s) + settingsBuilder.settingsHtml + '\n\n' + html.substring(bSettings.e);
html = html.substring(0, bAccess.s) + accessBuilder.accessHtml + '\n\n' + html.substring(bAccess.e);
html = html.substring(0, bReports.s) + reportsBuilder.reportsHtml + '\n\n' + html.substring(bReports.e);
html = html.substring(0, bSupport.s) + supportBuilder.supportHtml + '\n\n' + html.substring(bSupport.e);
html = html.substring(0, bContent.s) + contentBuilder.contentHtml + '\n\n' + html.substring(bContent.e);

// 4. SCRIPT REPLACEMENT
const oldStubsStart = html.indexOf('    // Content Module Controllers\n    function filterAdsTable');
const newPortalStart = html.indexOf('// ============================================================================\n// NEW PORTAL 2026 SAAS CONTROLLERS (Field, Content, Users, Offers)');
const contentInNewPortal = html.indexOf('    // Content Module Controllers\n\n    // ─── ADS CONTROLLERS', newPortalStart);
const lastScriptEnd = html.lastIndexOf('</script>');

console.log('Script boundaries:', { oldStubsStart, newPortalStart, contentInNewPortal, lastScriptEnd });
if ([oldStubsStart, newPortalStart, contentInNewPortal, lastScriptEnd].some(idx => idx === -1)) {
  throw new Error('Could not locate all script replacement landmarks in index.html');
}

const middleFieldAndUsersJs = html.substring(newPortalStart, contentInNewPortal);

const headerControllers = `
// ============================================================================
// HEADER POPUP CONTROLLERS (Notifications & Profile)
// ============================================================================
function toggleNotificationPopup(e) {
  if (e) e.stopPropagation();
  const m = document.getElementById("notificationPopupDropdown");
  const p = document.getElementById("profileDropdownMenu");
  const r = document.getElementById("roleDropdownMenu");
  if (p) p.classList.add("hidden");
  if (r) r.classList.add("hidden");
  if (m) m.classList.toggle("hidden");
  if (window.lucide) lucide.createIcons();
}

function markAllNotificationsRead() {
  const b = document.getElementById("notificationBadgeCounter");
  if (b) b.classList.add("hidden");
  if (typeof showToast === "function") showToast("All notifications marked as read.", "success");
}

function toggleProfileDropdown(e) {
  if (e) e.stopPropagation();
  const p = document.getElementById("profileDropdownMenu");
  const n = document.getElementById("notificationPopupDropdown");
  const r = document.getElementById("roleDropdownMenu");
  if (n) n.classList.add("hidden");
  if (r) r.classList.add("hidden");
  if (p) p.classList.toggle("hidden");
  if (window.lucide) lucide.createIcons();
}

document.addEventListener("click", () => {
  const n = document.getElementById("notificationPopupDropdown");
  const p = document.getElementById("profileDropdownMenu");
  const r = document.getElementById("roleDropdownMenu");
  if (n) n.classList.add("hidden");
  if (p) p.classList.add("hidden");
  if (r) r.classList.add("hidden");
});
`;

const combinedJs = [
  headerControllers,
  middleFieldAndUsersJs,
  contentBuilder.contentJs,
  supportBuilder.supportJs,
  reportsBuilder.reportsJs,
  accessBuilder.accessJs,
  settingsBuilder.settingsJs
].join('\n\n');

html = html.substring(0, oldStubsStart) + '\n\n' + combinedJs + '\n\n' + html.substring(lastScriptEnd);

// Check Gujarati characters
const gujaratiRegex = /[\u0A80-\u0AFF]/g;
const gujaratiMatches = html.match(gujaratiRegex);
if (gujaratiMatches && gujaratiMatches.length > 0) {
  throw new Error(`Gujarati characters found in generated HTML: ${gujaratiMatches.length}`);
}

// Check scripts syntax
const scriptTagRegex = /<script(?![^>]*src)[\s\S]*?>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptTagRegex.exec(html)) !== null) {
  count++;
  try {
    new vm.Script(match[1]);
  } catch (err) {
    throw new Error(`Script #${count} syntax error: ${err.message}`);
  }
}

console.log(`All ${count} inline scripts compiled cleanly with 0 syntax errors!`);

// Write out patched index.html
fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated! Length:', html.length);
