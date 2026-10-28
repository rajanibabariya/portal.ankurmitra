const fs = require('fs');
const path = require('path');

const portalDir = __dirname;
const indexPath = path.join(portalDir, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

console.log('--- Patching Header Dropdown Controllers & Language Selection ---');

// 1. Ensure toggleLangDropdown, togglePortalTheme, and consolidated click handler exist
const controllersSection = `// ============================================================================
// HEADER POPUP CONTROLLERS (Role, Language, Notifications, Profile, Theme)
// ============================================================================
function toggleRoleDropdown(e) {
  if (e) e.stopPropagation();
  const r = document.getElementById("roleDropdownMenu");
  const l = document.getElementById("headerLangDropdownMenu");
  const n = document.getElementById("notificationPopupDropdown");
  const p = document.getElementById("profileDropdownMenu");
  if (l) l.classList.add("hidden");
  if (n) n.classList.add("hidden");
  if (p) p.classList.add("hidden");
  if (r) r.classList.toggle("hidden");
  if (window.lucide && typeof lucide.createIcons === 'function') {
    try { lucide.createIcons(); } catch (_) {}
  }
}

function toggleLangDropdown(e) {
  if (e) e.stopPropagation();
  const l = document.getElementById("headerLangDropdownMenu");
  const r = document.getElementById("roleDropdownMenu");
  const n = document.getElementById("notificationPopupDropdown");
  const p = document.getElementById("profileDropdownMenu");
  if (r) r.classList.add("hidden");
  if (n) n.classList.add("hidden");
  if (p) p.classList.add("hidden");
  if (l) l.classList.toggle("hidden");
  if (window.lucide && typeof lucide.createIcons === 'function') {
    try { lucide.createIcons(); } catch (_) {}
  }
}

function toggleNotificationPopup(e) {
  if (e) e.stopPropagation();
  const n = document.getElementById("notificationPopupDropdown");
  const l = document.getElementById("headerLangDropdownMenu");
  const p = document.getElementById("profileDropdownMenu");
  const r = document.getElementById("roleDropdownMenu");
  if (l) l.classList.add("hidden");
  if (p) p.classList.add("hidden");
  if (r) r.classList.add("hidden");
  if (n) n.classList.toggle("hidden");
  if (window.lucide && typeof lucide.createIcons === 'function') {
    try { lucide.createIcons(); } catch (_) {}
  }
}

function markAllNotificationsRead() {
  const b = document.getElementById("notificationBadgeCounter");
  if (b) b.classList.add("hidden");
  if (typeof showToast === "function") showToast("All notifications marked as read.", "success");
}

function toggleProfileDropdown(e) {
  if (e) e.stopPropagation();
  const p = document.getElementById("profileDropdownMenu");
  const l = document.getElementById("headerLangDropdownMenu");
  const n = document.getElementById("notificationPopupDropdown");
  const r = document.getElementById("roleDropdownMenu");
  if (l) l.classList.add("hidden");
  if (n) n.classList.add("hidden");
  if (r) r.classList.add("hidden");
  if (p) p.classList.toggle("hidden");
  if (window.lucide && typeof lucide.createIcons === 'function') {
    try { lucide.createIcons(); } catch (_) {}
  }
}

function togglePortalTheme() {
  const isDark = document.documentElement.classList.contains('dark');
  setPortalTheme(isDark ? 'light' : 'dark', true);
}

function setPortalTheme(theme, showFeedback = true) {
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
    localStorage.setItem('ankurmitra_theme', 'dark');
  } else {
    document.documentElement.classList.remove('dark');
    localStorage.setItem('ankurmitra_theme', 'light');
  }
  const themeBtn = document.getElementById('headerThemeToggleBtn');
  if (themeBtn) {
    const icon = theme === 'dark' ? 'sun' : 'moon';
    themeBtn.innerHTML = \`<i data-lucide="\${icon}" class="w-4 h-4"></i>\`;
    if (window.lucide && typeof lucide.createIcons === 'function') {
      try { lucide.createIcons(); } catch (_) {}
    }
  }
  if (showFeedback && typeof showToast === 'function') {
    showToast(\`Switched theme to \${theme} mode.\`, 'info');
  }
}

document.addEventListener("click", () => {
  const l = document.getElementById("headerLangDropdownMenu");
  const r = document.getElementById("roleDropdownMenu");
  const n = document.getElementById("notificationPopupDropdown");
  const p = document.getElementById("profileDropdownMenu");
  if (l) l.classList.add("hidden");
  if (r) r.classList.add("hidden");
  if (n) n.classList.add("hidden");
  if (p) p.classList.add("hidden");
});`;

// Replace existing controllers block
const targetHeaderControllers = '// HEADER POPUP CONTROLLERS (Notifications & Profile)';
const idx = indexHtml.indexOf(targetHeaderControllers);
if (idx !== -1) {
  // Find where this section ends (before NEW PORTAL 2026 SAAS CONTROLLERS)
  const nextSectionIdx = indexHtml.indexOf('// ============================================================================', idx + 100);
  indexHtml = indexHtml.substring(0, idx) + controllersSection + '\n\n' + indexHtml.substring(nextSectionIdx);
  console.log('✓ Replaced header controllers section with complete unified toggle suite.');
} else {
  console.log('Could not find header controllers marker, looking for toggleNotificationPopup...');
  const fnIdx = indexHtml.indexOf('function toggleNotificationPopup');
  if (fnIdx !== -1) {
    const nextSectionIdx = indexHtml.indexOf('// ============================================================================', fnIdx);
    indexHtml = indexHtml.substring(0, fnIdx) + controllersSection + '\n\n' + indexHtml.substring(nextSectionIdx);
    console.log('✓ Injected controllers before toggleNotificationPopup.');
  }
}

// 2. Also ensure in translateSubtree we exclude #headerLangDropdownMenu and #roleDropdownMenu
const oldFilter = `if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'SVG' || tag === 'PATH' || tag === 'CODE') {
          return NodeFilter.FILTER_REJECT;
        }`;

const newFilter = `if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'SVG' || tag === 'PATH' || tag === 'CODE') {
          return NodeFilter.FILTER_REJECT;
        }
        if (parent.closest('#headerLangDropdownMenu') || parent.closest('#roleDropdownMenu') || parent.closest('#sidebarZoneA')) {
          return NodeFilter.FILTER_REJECT;
        }`;

if (indexHtml.includes(oldFilter)) {
  indexHtml = indexHtml.replace(oldFilter, newFilter);
  console.log('✓ Added menu exclusion filters to translateSubtree.');
}

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('✓ Successfully saved updated index.html.');
