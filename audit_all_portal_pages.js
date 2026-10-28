// audit_all_portal_pages.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const baseDir = __dirname;

const moduleFolders = [
  '.',
  'wallet',
  'content',
  'support',
  'reports',
  'settings',
  'masters',
  'sales',
  'delivery',
  'orders',
  'field',
  'users',
  'insights',
  'dashboard'
];

let allFiles = [];

moduleFolders.forEach(folder => {
  const fullFolder = path.resolve(baseDir, folder);
  if (fs.existsSync(fullFolder)) {
    const files = fs.readdirSync(fullFolder)
      .filter(f => f.endsWith('.html') && !f.includes('_block') && !f.includes('_code'))
      .map(f => path.join(fullFolder, f));
    allFiles.push(...files);
  }
});

console.log(`Auditing ${allFiles.length} HTML files across root and all module directories...`);

let hasError = false;
const scriptTagRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
// Verify no forbidden legacy tagline in branding
const legacyTaglineRegex = /વૃદ્ધિ\s*માટે\s*સ્માર્ટ\s*સાથી/g;

// Core required functions across portal modules
const requiredFunctions = [
  // Header Controllers
  'toggleRoleDropdown',
  'toggleLangDropdown',
  'toggleNotificationPopup',
  'toggleProfileDropdown',
  'applyLanguagePreference',
  'translateFullApplication',
  // Wallet
  'filterWalletPayoutsTable',
  'openSendPayoutModal',
  'filterPendingPaymentsTable',
  'sendPaymentReminder',
  // Content
  'filterAdsTable',
  'toggleAdStatus',
  'filterAlertsTable',
  'switchToolRentalTab',
  // Support
  'filterSupportTable',
  'resolveTicket',
  // Reports
  'exportSalesReport',
  'initReportCharts',
  // Users Module
  'handleCreateUser',
  'openCreateUserForm',
  'editUserRecord',
  'renderUsersTable',
  'filterUserList',
  'openUserRecord',
  'handleUserApprovalAction',
  // Access
  'saveRoleMatrix',
  'resetRoleMatrix',
  // Settings
  'saveAppConfig',
  'rebuildSystemCache',
  // Sales & Delivery & Masters
  'openDeliveryTrackModal',
  'closeDeliveryTrackModal',
  'approveSellRequest',
  'rejectSellRequest',
  'acceptDealerDeskItem',
  'acceptDealerOrder'
];

// Required views for multi-module support
const requiredViews = [
  'view-wallet-payouts',
  'view-pending-payments',
  'view-ads',
  'view-smart-alerts',
  'view-farmer-community',
  'view-knowledge-hub',
  'view-tool-rental',
  'view-nearby-services',
  'view-mandi-prices',
  'view-help-support',
  'view-reports-hub',
  'view-sales-report',
  'view-order-report',
  'view-master-report',
  'view-wallet-report',
  'view-performance-reports',
  'view-dealer-sales-report',
  'view-role-matrix',
  'view-settings-hub',
  'view-portal-settings',
  'view-app-config',
  'view-mobile-app',
  'view-system-health',
  'view-deliveries',
  'view-sell-requests',
  'view-dealer-desk',
  'view-master-hub'
];

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  const relPath = path.relative(baseDir, file);

  // 1. Tagline audit
  if (legacyTaglineRegex.test(content)) {
    console.error(`[FAIL] ${relPath} contains forbidden legacy tagline!`);
    hasError = true;
  }

  // 2. Official Brand Tagline check
  if (!content.includes('વિકાસ માટે સ્માર્ટ સાથી') && !content.includes('Smart companion for growth')) {
    console.error(`[FAIL] ${relPath} is missing official brand tagline!`);
    hasError = true;
  }

  // 3. Official Gujarati script language check
  if (!content.includes('ગુજરાતી')) {
    console.error(`[FAIL] ${relPath} is missing native Gujarati script in language switcher!`);
    hasError = true;
  }

  // 4. Required views check
  requiredViews.forEach(viewId => {
    if (!content.includes(`id="${viewId}"`)) {
      console.error(`[FAIL] ${relPath} is missing view: ${viewId}`);
      hasError = true;
    }
  });

  // 5. Required functions check
  requiredFunctions.forEach(fn => {
    if (!content.includes(`function ${fn}`)) {
      console.error(`[FAIL] ${relPath} is missing function: ${fn}`);
      hasError = true;
    }
  });

  // 6. Assets check
  if (!content.includes('product_logo.png')) {
    console.error(`[FAIL] ${relPath} is missing product_logo.png!`);
    hasError = true;
  }
  if (!content.includes('rudram.png')) {
    console.error(`[FAIL] ${relPath} is missing rudram.png!`);
    hasError = true;
  }
  if (!content.includes('Innovating Beyond Boundaries.')) {
    console.error(`[FAIL] ${relPath} is missing Rudram tagline: "Innovating Beyond Boundaries."`);
    hasError = true;
  }

  // 7. Footer Social Icons check
  const footerIcons = ['linkedin', 'globe', 'twitter', 'instagram'];
  const labels = ['LinkedIn', 'Website', 'Twitter', 'Instagram'];
  footerIcons.forEach((icon, idx) => {
    const hasIcon = content.includes(`data-lucide="${icon}"`) || 
                    content.includes(`aria-label="${labels[idx]}"`) || 
                    content.includes(`title="${labels[idx]}"`);
    if (!hasIcon) {
      console.error(`[FAIL] ${relPath} is missing ${labels[idx]} icon in footer!`);
      hasError = true;
    }
  });

  // 8. JS Syntax validation on all inline scripts
  let match;
  scriptTagRegex.lastIndex = 0;
  while ((match = scriptTagRegex.exec(content)) !== null) {
    const scriptCode = match[1];
    if (scriptCode && scriptCode.trim().length > 0) {
      try {
        new vm.Script(scriptCode);
      } catch (err) {
        console.error(`[FAIL] Syntax error in script of ${relPath}: ${err.message}`);
        hasError = true;
      }
    }
  }
});

if (hasError) {
  console.error('\nAUDIT FAILED with errors! Check log output above.');
  process.exit(1);
} else {
  console.log(`\nSUCCESS: All ${allFiles.length} files passed the exhaustive audit!`);
  console.log('✓ Validated 0 forbidden legacy taglines across all files.');
  console.log('✓ Verified official brand tagline in Gujarati and English.');
  console.log('✓ Verified native Gujarati script in all language switchers.');
  console.log('✓ Verified all 27 required views exist in every file.');
  console.log('✓ Verified all required functions (including header controllers) exist in every file.');
  console.log('✓ Verified high-fidelity product & company logos.');
  console.log('✓ Verified Rudram corporate tagline and all 4 social icons in footers.');
  console.log('✓ Validated JS syntax of all inline scripts across every HTML file.');
}
