// apply_user_fixes.js
const fs = require('fs');
const path = require('path');
const { dictionary, reverseDictionary } = require('./build_full_i18n_dictionary.js');

const portalDir = __dirname;
const indexPath = path.join(portalDir, 'index.html');
const i18nEnginePath = path.join(portalDir, 'portal_i18n_full_engine.js');

console.log('--- Applying User Fixes: Session Persistence, Login Label & Bi-directional i18n ---');

let indexHtml = fs.readFileSync(indexPath, 'utf8');

// ============================================================================
// FIX 2: LOGIN PAGE LABEL "Sign in to Web Portal" -> "Sign in"
// ============================================================================
indexHtml = indexHtml.replace(
  '<h1 id="loginCardTitle" class="text-2xl font-extrabold text-[#0F172A] tracking-tight">Sign in to Web Portal</h1>',
  '<h1 id="loginCardTitle" class="text-2xl font-extrabold text-[#0F172A] tracking-tight">Sign in</h1>'
);

indexHtml = indexHtml.replace(
  '<span>Sign in to Web Portal</span>',
  '<span>Sign in</span>'
);
console.log('✓ Fix 2 applied: Changed "Sign in to Web Portal" to "Sign in" on login card & button.');


// ============================================================================
// FIX 1: SESSION PERSISTENCE (Refresh page then logout issue)
// ============================================================================
// Replace handleSignIn, logout, and add checkPersistedSession()
const oldSignInCode = `function handleSignIn(e) {
      e.preventDefault();
      const phone = document.getElementById('loginMobileInput').value;
      const detected = detectRoleFromMobile(phone);
      currentRole = detected;

      document.getElementById('page-login').classList.add('hidden');
      switchActiveRole(currentRole);
      
      const roleCfg = AM.roles[currentRole] || AM.roles['superadmin'];
      showToast(\`Auto-detected role: \${roleCfg.label} · Welcome \${roleCfg.user}\`, 'success');
    }

    function logout() {
      const p = document.getElementById("profileDropdownMenu");
      if (p) p.classList.add("hidden");
      const loginPage = document.getElementById("page-login");
      if (loginPage) {
        loginPage.classList.remove("hidden");
        const pInput = document.getElementById("loginPasswordInput");
        if (pInput) pInput.value = "";
        const pinInput = document.getElementById("loginPinInput");
        if (pinInput) pinInput.value = "";
      }
      if (typeof showToast === "function") {
        showToast("Signed out successfully. Session closed.", "info");
      }
    }`;

const newSignInCode = `function handleSignIn(e) {
      e.preventDefault();
      const phone = document.getElementById('loginMobileInput').value;
      const detected = detectRoleFromMobile(phone);
      currentRole = detected;

      const roleCfg = (window.AM && window.AM.roles && window.AM.roles[currentRole]) || {
        label: 'Super admin · Full access',
        user: 'Rudram Admin',
        unit: 'Amreli',
        afterLogin: 'dashboard'
      };

      // Persist session to localStorage so page refresh never logs out
      const sessionData = {
        authenticated: true,
        role: currentRole,
        activePage: roleCfg.afterLogin || 'dashboard',
        user: roleCfg.user,
        unit: roleCfg.unit,
        phone: phone,
        loginTime: Date.now()
      };
      localStorage.setItem('ankurmitra_session', JSON.stringify(sessionData));

      const loginPage = document.getElementById('page-login');
      if (loginPage) loginPage.classList.add('hidden');

      switchActiveRole(currentRole);
      showToast(\`Auto-detected role: \${roleCfg.label} · Welcome \${roleCfg.user}\`, 'success');
    }

    function logout() {
      const p = document.getElementById("profileDropdownMenu");
      if (p) p.classList.add("hidden");
      
      // Clear persisted session
      localStorage.removeItem('ankurmitra_session');

      const loginPage = document.getElementById("page-login");
      if (loginPage) {
        loginPage.classList.remove("hidden");
        const pInput = document.getElementById("loginPasswordInput");
        if (pInput) pInput.value = "";
        const pinInput = document.getElementById("loginPinInput");
        if (pinInput) pinInput.value = "";
      }
      if (typeof showToast === "function") {
        showToast("Signed out successfully. Session closed.", "info");
      }
    }

    function checkPersistedSession() {
      let sess = null;
      try {
        sess = JSON.parse(localStorage.getItem('ankurmitra_session') || 'null');
      } catch (_) {}

      const loginPage = document.getElementById('page-login');
      if (sess && sess.authenticated) {
        if (loginPage) loginPage.classList.add('hidden');
        currentRole = sess.role || 'superadmin';
        const roleCfg = (window.AM && window.AM.roles && window.AM.roles[currentRole]) || {
          label: 'Super admin · Full access',
          user: 'Rudram Admin',
          unit: 'Amreli',
          afterLogin: 'dashboard'
        };

        // Update header role indicators
        const rPill = document.getElementById('headerRolePill');
        if (rPill) rPill.textContent = roleCfg.label;
        const uName = document.getElementById('headerUserName');
        if (uName) uName.textContent = roleCfg.user;
        const uUnit = document.getElementById('headerUserUnit');
        if (uUnit) uUnit.textContent = roleCfg.unit;
        const uAvatar = document.getElementById('headerAvatar');
        if (uAvatar) uAvatar.textContent = roleCfg.user.split(' ').map(n=>n[0]).join('').substring(0, 2);

        renderNavigationTree(currentRole);
        navigateTo(sess.activePage || roleCfg.afterLogin || 'dashboard');
      } else {
        if (loginPage) loginPage.classList.remove('hidden');
      }
    }`;

if (indexHtml.includes("function handleSignIn(e) {")) {
  indexHtml = indexHtml.replace(oldSignInCode, newSignInCode);
  console.log('✓ Fix 1 applied: Enhanced handleSignIn and logout with localStorage session persistence.');
}

// In switchActiveRole, keep stored session updated
const oldSwitchActiveRole = "currentRole = roleKey;\n      const cfg = AM.roles[roleKey] || AM.roles.superadmin;";
const newSwitchActiveRole = `currentRole = roleKey;
      const cfg = AM.roles[roleKey] || AM.roles.superadmin;
      try {
        const sess = JSON.parse(localStorage.getItem('ankurmitra_session') || '{}');
        if (sess && sess.authenticated) {
          sess.role = roleKey;
          sess.activePage = cfg.afterLogin || 'dashboard';
          sess.user = cfg.user;
          sess.unit = cfg.unit;
          localStorage.setItem('ankurmitra_session', JSON.stringify(sess));
        }
      } catch (_) {}`;
if (indexHtml.includes(oldSwitchActiveRole)) {
  indexHtml = indexHtml.replace(oldSwitchActiveRole, newSwitchActiveRole);
}

// In navigateTo, keep stored activePage updated and translate newly shown view
const oldNavigateToStart = "currentActivePage = pageId;\n\n      // Hide all view sections";
const newNavigateToStart = `currentActivePage = pageId;

      try {
        const sess = JSON.parse(localStorage.getItem('ankurmitra_session') || '{}');
        if (sess && sess.authenticated) {
          sess.activePage = pageId;
          localStorage.setItem('ankurmitra_session', JSON.stringify(sess));
        }
      } catch (_) {}

      // Hide all view sections`;
if (indexHtml.includes(oldNavigateToStart)) {
  indexHtml = indexHtml.replace(oldNavigateToStart, newNavigateToStart);
}

// Call checkPersistedSession in DOMContentLoaded
const oldDomLoaded = `window.addEventListener('DOMContentLoaded', () => {
      renderNavigationTree(currentRole);
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
      initCharts();
    });`;

const newDomLoaded = `window.addEventListener('DOMContentLoaded', () => {
      checkPersistedSession();
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
      initCharts();
    });`;

if (indexHtml.includes(oldDomLoaded)) {
  indexHtml = indexHtml.replace(oldDomLoaded, newDomLoaded);
  console.log('✓ Fix 1 applied: checkPersistedSession() connected to DOMContentLoaded.');
}


// ============================================================================
// FIX 3: FULL BI-DIRECTIONAL i18n DOM TRANSLATION ENGINE
// ============================================================================
// Build the new comprehensive i18n script block
const newI18nScript = `
// ============================================================================
// PORTAL THEME, INDIAN LOCALIZATION & COMPREHENSIVE i18n TRANSLATION ENGINE
// ============================================================================

window.INDIAN_LANGUAGES = {
  en: { name: 'English (India)', native: 'English', flag: 'IN', code: 'EN' },
  hi: { name: 'Hindi', native: 'हिन्दी', flag: 'IN', code: 'HI' },
  gu: { name: 'Gujarati', native: 'ગુજરાતી', flag: 'IN', code: 'GU' },
  mr: { name: 'Marathi', native: 'मराठी', flag: 'IN', code: 'MR' },
  te: { name: 'Telugu', native: 'తెలుగు', flag: 'IN', code: 'TE' },
  ta: { name: 'Tamil', native: 'தமிழ்', flag: 'IN', code: 'TA' },
  kn: { name: 'Kannada', native: 'ಕನ್ನಡ', flag: 'IN', code: 'KN' },
  bn: { name: 'Bengali', native: 'বাংলা', flag: 'IN', code: 'BN' },
  pa: { name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: 'IN', code: 'PA' },
  ml: { name: 'Malayalam', native: 'മലയാളം', flag: 'IN', code: 'ML' },
  or: { name: 'Odia', native: 'ଓଡ଼ିଆ', flag: 'IN', code: 'OR' },
  as: { name: 'Assamese', native: 'অসমীয়া', flag: 'IN', code: 'AS' }
};

window.I18N_DICTIONARY = ${JSON.stringify(dictionary, null, 2)};
window.REVERSE_DICTIONARY = ${JSON.stringify(reverseDictionary, null, 2)};

window.PORTAL_PREFERENCES = {
  theme: localStorage.getItem('ankurmitra_theme') || 'light',
  language: localStorage.getItem('ankurmitra_language') || 'en',
  timezone: localStorage.getItem('ankurmitra_timezone') || 'Asia/Kolkata',
  currency: localStorage.getItem('ankurmitra_currency') || 'INR'
};

window.t = function(key, targetLang) {
  if (!key) return '';
  const currentLang = targetLang || (window.PORTAL_PREFERENCES ? window.PORTAL_PREFERENCES.language : (localStorage.getItem('ankurmitra_language') || 'en'));
  
  if (currentLang === 'en') {
    return (window.REVERSE_DICTIONARY && window.REVERSE_DICTIONARY[key]) || key;
  }

  // Exact match
  if (window.I18N_DICTIONARY && window.I18N_DICTIONARY[key] && window.I18N_DICTIONARY[key][currentLang]) {
    return window.I18N_DICTIONARY[key][currentLang];
  }

  // Trimmed match
  const trimmed = key.trim();
  if (window.I18N_DICTIONARY && window.I18N_DICTIONARY[trimmed] && window.I18N_DICTIONARY[trimmed][currentLang]) {
    return window.I18N_DICTIONARY[trimmed][currentLang];
  }

  return key;
};

// Apply Language Preference & Trigger Full-Body Translation
function applyLanguagePreference(lang, showFeedback = true) {
  const cfg = window.INDIAN_LANGUAGES[lang] || window.INDIAN_LANGUAGES.en;
  window.PORTAL_PREFERENCES.language = lang;
  localStorage.setItem('ankurmitra_language', lang);

  // Close dropdown if open
  const dropMenu = document.getElementById('headerLangDropdownMenu');
  if (dropMenu) dropMenu.classList.add('hidden');

  // Update header badge
  const headerCode = document.getElementById('headerCurrentLangCode');
  if (headerCode) headerCode.textContent = cfg.code;

  // Update portal-settings select
  const sel = document.getElementById('portalPrefLanguage');
  if (sel && sel.value !== lang) sel.value = lang;

  // Update simulation display in portal-settings
  const localeDisplay = document.getElementById('settingsActiveLocaleDisplay');
  if (localeDisplay) {
    localeDisplay.textContent = \`\${cfg.code} · \${cfg.name} (\${cfg.native})\`;
  }

  // Run full application bi-directional translation!
  translateFullApplication(lang);

  if (showFeedback && typeof showToast === 'function') {
    const toastMsgs = {
      en: 'Language set to English.',
      hi: 'भाषा बदलकर हिन्दी कर दी गई है।',
      gu: 'ભાષા બદલીને ગુજરાતી કરવામાં આવી છે.',
      mr: 'भाषा मराठी मध्ये बदलली आहे.',
      te: 'భాష తెలుగులోకి మార్చబడింది.'
    };
    showToast(toastMsgs[lang] || \`Language set to \${cfg.name}.\`, 'success');
  }
}

// Master Bi-directional Translation Engine
function translateFullApplication(lang) {
  document.documentElement.lang = lang;

  // 1. Re-render Sidebar Navigation Tree with Translated Labels
  if (typeof renderNavigationTree === 'function') {
    renderNavigationTree(currentRole);
  }

  // 2. Update Breadcrumbs and Current Page Heading
  const headingEl = document.getElementById('pageHeading');
  const childBcEl = document.getElementById('breadcrumbChild');
  const parentBcEl = document.getElementById('breadcrumbParent');

  if (headingEl && currentActivePage) {
    const rawTitle = (typeof titles !== 'undefined' && titles[currentActivePage]) || headingEl.textContent;
    headingEl.textContent = window.t(rawTitle, lang);
    if (childBcEl) childBcEl.textContent = window.t(rawTitle, lang);
  }

  // 3. Update Header Search Input Placeholder
  const searchInput = document.getElementById('headerSearchInput');
  if (searchInput) {
    searchInput.placeholder = window.t('Search orders, users, places', lang);
  }

  // 4. Translate Entire DOM Tree
  translateSubtree(document.body, lang);

  // 5. Translate Placeholders
  document.querySelectorAll('input[placeholder], textarea[placeholder]').forEach(input => {
    if (!input.hasAttribute('data-i18n-orig-ph')) {
      let origPh = input.placeholder.trim();
      if (window.REVERSE_DICTIONARY && window.REVERSE_DICTIONARY[origPh]) {
        origPh = window.REVERSE_DICTIONARY[origPh];
      }
      input.setAttribute('data-i18n-orig-ph', origPh);
    }
    const origPh = input.getAttribute('data-i18n-orig-ph');
    if (lang === 'en') {
      input.placeholder = origPh;
    } else {
      input.placeholder = window.t(origPh, lang);
    }
  });

  // Re-run icons
  if (window.lucide && typeof lucide.createIcons === 'function') {
    try { lucide.createIcons(); } catch (_) {}
  }
}

// Deep DOM Text Node Traversal & Replacement
function translateSubtree(root, lang) {
  if (!root) return;

  const walker = document.createTreeWalker(
    root,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode: function(node) {
        if (!node.nodeValue) return NodeFilter.FILTER_REJECT;
        const text = node.nodeValue.trim();
        if (text.length === 0) return NodeFilter.FILTER_REJECT;
        const parent = node.parentElement;
        if (!parent) return NodeFilter.FILTER_REJECT;
        const tag = parent.tagName.toUpperCase();
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'SVG' || tag === 'PATH' || tag === 'CODE') {
          return NodeFilter.FILTER_REJECT;
        }
        // Skip pure numbers, icons, coordinates or symbols
        if (/^[0-9\\s,.\\-+%₹/()QtlkCr#:]+$/.test(text)) {
          return NodeFilter.FILTER_REJECT;
        }
        return NodeFilter.FILTER_ACCEPT;
      }
    },
    false
  );

  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) {
    textNodes.push(node);
  }

  for (let i = 0; i < textNodes.length; i++) {
    const textNode = textNodes[i];
    const parent = textNode.parentElement;
    if (!parent) continue;

    const currentText = textNode.nodeValue.trim();

    // Preserve original English text on the parent element
    if (!parent.hasAttribute('data-i18n-orig')) {
      let orig = currentText;
      if (window.REVERSE_DICTIONARY && window.REVERSE_DICTIONARY[orig]) {
        orig = window.REVERSE_DICTIONARY[orig];
      }
      parent.setAttribute('data-i18n-orig', orig);
    }

    const origText = parent.getAttribute('data-i18n-orig') || currentText;

    if (lang === 'en') {
      // Revert to pristine English
      const englishTarget = (window.REVERSE_DICTIONARY && window.REVERSE_DICTIONARY[currentText]) || origText;
      if (currentText !== englishTarget) {
        textNode.nodeValue = textNode.nodeValue.replace(currentText, englishTarget);
      }
    } else {
      // Translate to Gujarati, Hindi, etc.
      const translated = window.t(origText, lang);
      if (translated && translated !== origText) {
        textNode.nodeValue = textNode.nodeValue.replace(currentText, translated);
      }
    }
  }
}

// Ensure navigateTo immediately translates the target view
const origNavigateTo = window.navigateTo;
`;

// Replace inlined i18n section in index.html
const startI18nMarker = '// PORTAL THEME, INDIAN LOCALIZATION';
const startIdx = indexHtml.indexOf(startI18nMarker);
if (startIdx !== -1) {
  // Find where this script block ends
  const endScriptIdx = indexHtml.indexOf('</script>', startIdx);
  if (endScriptIdx !== -1) {
    // Keep the tail handlers (theme, timezone, currency, initPortalPreferencesUi)
    const tailMarker = '// --- CURRENCY HANDLERS ---';
    const tailIdx = indexHtml.indexOf(tailMarker, startIdx);
    const tailCode = tailIdx !== -1 ? indexHtml.substring(tailIdx, endScriptIdx) : '';

    const fullReplacement = newI18nScript + '\n' + tailCode;
    indexHtml = indexHtml.substring(0, startIdx) + fullReplacement + indexHtml.substring(endScriptIdx);
    console.log('✓ Fix 3 applied: Inlined comprehensive bi-directional i18n engine in index.html.');
  }
}

// Also in navigateTo(pageId), make sure newly navigated view is translated
const navTargetCheck = "if (target) {\n        target.classList.remove('hidden');\n      }";
const navTargetReplace = `if (target) {
        target.classList.remove('hidden');
        const activeLang = window.PORTAL_PREFERENCES ? window.PORTAL_PREFERENCES.language : (localStorage.getItem('ankurmitra_language') || 'en');
        if (activeLang !== 'en') {
          setTimeout(() => { translateSubtree(target, activeLang); }, 10);
        }
      }`;

if (indexHtml.includes(navTargetCheck)) {
  indexHtml = indexHtml.replace(navTargetCheck, navTargetReplace);
  console.log('✓ Fix 3 applied: Added dynamic view translation in navigateTo().');
}

fs.writeFileSync(indexPath, indexHtml, 'utf8');
console.log('✓ Successfully saved updated index.html.');

// Also update portal_i18n_full_engine.js with the expanded dictionary
fs.writeFileSync(i18nEnginePath, newI18nScript + '\n' + fs.readFileSync(i18nEnginePath, 'utf8').substring(fs.readFileSync(i18nEnginePath, 'utf8').indexOf('// --- CURRENCY HANDLERS ---')), 'utf8');
console.log('✓ Successfully saved updated portal_i18n_full_engine.js.');
