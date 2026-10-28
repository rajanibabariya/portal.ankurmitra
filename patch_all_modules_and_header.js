// patch_all_modules_and_header.js
const fs = require('fs');
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
              <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">Full</span>
            </button>
            <button onclick="switchActiveRole('operate')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between">
              <span>Operate</span>
              <span class="text-[10px] text-[#64748B]">Live orders</span>
            </button>
            <button onclick="switchActiveRole('maintenance')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between">
              <span>Maintenance</span>
              <span class="text-[10px] text-[#64748B]">System health</span>
            </button>
            <button onclick="switchActiveRole('analysis')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between">
              <span>Analysis</span>
              <span class="text-[10px] text-[#64748B]">Network map</span>
            </button>
            <div class="my-1 border-t border-[#E5E7EB]"></div>
            <button onclick="switchActiveRole('dealer')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between">
              <span>Dealer (Kishan Agro)</span>
              <span class="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">Shop</span>
            </button>
            <button onclick="switchActiveRole('industrial')" class="w-full text-left px-2.5 py-1.5 rounded-lg hover:bg-[#F8FAFC] flex items-center justify-between">
              <span>Industrial (Patel Agro)</span>
              <span class="text-[10px] font-bold text-amber-700 bg-amber-50 px-1.5 py-0.2 rounded">Unit</span>
            </button>
          </div>
        </div>

        <!-- Notification Bell with Interactive Flyout Popup -->
        <div class="relative">
          <button onclick="toggleNotificationPopup(event)" id="headerNotificationBtn" class="relative p-2 text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC] rounded-xl transition" title="Smart Alerts & Notifications">
            <i data-lucide="bell" class="w-5 h-5"></i>
            <span id="notificationBadgeCounter" class="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full ring-2 ring-white"></span>
          </button>
          
          <!-- Flyout Notification Dropdown -->
          <div id="notificationPopupDropdown" class="hidden absolute right-0 mt-2 w-80 sm:w-96 bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl p-4 z-50 space-y-3 text-xs">
            <div class="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
              <div class="flex items-center gap-2">
                <span class="font-extrabold text-[#0F172A]">Notifications</span>
                <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700">3 New</span>
              </div>
              <button onclick="markAllNotificationsRead()" class="text-[11px] font-bold text-[#0B6623] hover:underline">Mark all read</button>
            </div>

            <!-- Notification Items -->
            <div class="space-y-2 max-h-72 overflow-y-auto">
              <div class="p-2.5 bg-rose-50/70 rounded-xl border border-rose-100 flex items-start gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-rose-500 text-white flex items-center justify-center shrink-0 text-xs">
                  <i data-lucide="alert-triangle" class="w-3.5 h-3.5"></i>
                </span>
                <div class="flex-1">
                  <div class="font-bold text-[#0F172A] text-xs">Pest Alert: Pink Bollworm in Amreli</div>
                  <div class="text-[11px] text-[#64748B] mt-0.5">Sudavad & Bagasara clusters reported >8 moths/trap.</div>
                  <span class="text-[9px] text-[#94A3B8] font-bold">12 mins ago</span>
                </div>
              </div>

              <div class="p-2.5 bg-blue-50/70 rounded-xl border border-blue-100 flex items-start gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 text-xs">
                  <i data-lucide="truck" class="w-3.5 h-3.5"></i>
                </span>
                <div class="flex-1">
                  <div class="font-bold text-[#0F172A] text-xs">Wholesale Order Inward: 40 MT Urea</div>
                  <div class="text-[11px] text-[#64748B] mt-0.5">Godown Bay 2 dispatch truck confirmed at weighbridge.</div>
                  <span class="text-[9px] text-[#94A3B8] font-bold">45 mins ago</span>
                </div>
              </div>

              <div class="p-2.5 bg-emerald-50/70 rounded-xl border border-emerald-100 flex items-start gap-2.5">
                <span class="w-7 h-7 rounded-lg bg-[#0B6623] text-white flex items-center justify-center shrink-0 text-xs">
                  <i data-lucide="wallet" class="w-3.5 h-3.5"></i>
                </span>
                <div class="flex-1">
                  <div class="font-bold text-[#0F172A] text-xs">DBT Payout Disbursed: INR 42,800</div>
                  <div class="text-[11px] text-[#64748B] mt-0.5">Tranche #4 approved for certified groundnut seed cultivators.</div>
                  <span class="text-[9px] text-[#94A3B8] font-bold">2 hours ago</span>
                </div>
              </div>
            </div>

            <div class="pt-2 border-t border-[#E5E7EB] text-center">
              <button onclick="navigateTo('smart-alerts', 'Content', 'Smart alerts'); toggleNotificationPopup();" class="text-xs font-bold text-[#0B6623] hover:underline flex items-center justify-center gap-1 mx-auto">
                <span>View all alerts in Smart Alerts</span>
                <i data-lucide="arrow-right" class="w-3 h-3"></i>
              </button>
            </div>
          </div>
        </div>

        <!-- User Avatar & Profile Dropdown Flyout -->
        <div class="relative pl-2 border-l border-[#E5E7EB]">
          <button onclick="toggleProfileDropdown(event)" id="headerProfileBtn" class="flex items-center gap-2 p-1 rounded-xl hover:bg-[#F8FAFC] transition">
            <div id="headerAvatar" class="w-8 h-8 rounded-full bg-[#0B6623] text-white font-black text-xs flex items-center justify-center shadow-xs">
              RA
            </div>
            <div class="hidden md:block text-left leading-tight">
              <div id="headerUserName" class="text-xs font-bold text-[#0F172A]">Rudram Admin</div>
              <div id="headerUserUnit" class="text-[11px] text-[#64748B] font-medium">Amreli Hub</div>
            </div>
            <i data-lucide="chevron-down" class="w-3.5 h-3.5 text-[#64748B] hidden md:block"></i>
          </button>

          <!-- Flyout Profile Dropdown Menu -->
          <div id="profileDropdownMenu" class="hidden absolute right-0 mt-2 w-64 bg-white border border-[#E5E7EB] rounded-2xl shadow-2xl p-3 z-50 space-y-2 text-xs">
            <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] space-y-1">
              <div class="font-extrabold text-[#0F172A]">Rudram Administrator</div>
              <div class="text-[11px] text-[#64748B] font-mono">admin@ankurmitra.in</div>
              <span class="inline-block px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B6623] mt-1">Super Admin • SaaS</span>
            </div>

            <div class="space-y-1 font-semibold text-[#0F172A]">
              <button onclick="navigateTo('portal-settings', 'Settings', 'Portal settings'); toggleProfileDropdown();" class="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8FAFC] flex items-center gap-2">
                <i data-lucide="settings" class="w-4 h-4 text-[#64748B]"></i>
                <span>Portal Preferences</span>
              </button>
              <button onclick="navigateTo('system-health', 'Settings', 'System health'); toggleProfileDropdown();" class="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8FAFC] flex items-center gap-2">
                <i data-lucide="activity" class="w-4 h-4 text-[#64748B]"></i>
                <span>System Health & Uptime</span>
              </button>
              <button onclick="navigateTo('audit-logs', 'Settings', 'Audit logs'); toggleProfileDropdown();" class="w-full text-left px-3 py-2 rounded-xl hover:bg-[#F8FAFC] flex items-center gap-2">
                <i data-lucide="shield-check" class="w-4 h-4 text-[#64748B]"></i>
                <span>Security Audit Trail</span>
              </button>
            </div>

            <div class="pt-2 border-t border-[#E5E7EB]">
              <button onclick="signOutAction()" class="w-full text-left px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 font-bold flex items-center gap-2 transition">
                <i data-lucide="log-out" class="w-4 h-4"></i>
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

// Replace from bottom to top so offsets remain strictly valid
// 1. Settings
html = html.substring(0, bSettings.s) + settingsBuilder.settingsHtml + '\n\n' + html.substring(bSettings.e);
// 2. Access
html = html.substring(0, bAccess.s) + accessBuilder.accessHtml + '\n\n' + html.substring(bAccess.e);
// 3. Reports
html = html.substring(0, bReports.s) + reportsBuilder.reportsHtml + '\n\n' + html.substring(bReports.e);
// 4. Support
html = html.substring(0, bSupport.s) + supportBuilder.supportHtml + '\n\n' + html.substring(bSupport.e);
// 5. Content
html = html.substring(0, bContent.s) + contentBuilder.contentHtml + '\n\n' + html.substring(bContent.e);

// 4. APPEND NEW CONTROLLER SCRIPTS
const lastScriptEnd = html.lastIndexOf('</script>');
if (lastScriptEnd === -1) throw new Error('No </script> tag found!');

const headerAndNewControllers = `
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

// ============================================================================
// FULL NEW SAAS CONTROLLERS (Content, Support, Reports, Access, Settings)
// ============================================================================
${contentBuilder.contentJs}

${supportBuilder.supportJs}

${reportsBuilder.reportsJs}

${accessBuilder.accessJs}

${settingsBuilder.settingsJs}
`;

html = html.substring(0, lastScriptEnd) + '\n\n' + headerAndNewControllers + '\n\n' + html.substring(lastScriptEnd);

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
