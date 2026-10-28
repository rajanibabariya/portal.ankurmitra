// patch_index_and_generate_modules.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const { walletHtml, walletJs } = require('./modules/wallet.js');
const { contentHtml, contentJs } = require('./modules/content.js');
const { supportHtml, supportJs } = require('./modules/support.js');
const { reportsHtml, reportsJs } = require('./modules/reports.js');
const { accessHtml, accessJs } = require('./modules/access.js');
const { settingsHtml, settingsJs } = require('./modules/settings.js');

let indexHtml = fs.readFileSync('index.html', 'utf8');

console.log('Original index.html length:', indexHtml.length);

// Clean previous module injections if present
const viewMarker = '<!-- =====================================================================\n     WALLET, CONTENT, SUPPORT, REPORTS, ACCESS & SETTINGS MODULE VIEWS';
const vMarkerIdx = indexHtml.indexOf(viewMarker);
if (vMarkerIdx !== -1) {
  const mainClose = indexHtml.indexOf('</main>', vMarkerIdx);
  indexHtml = indexHtml.substring(0, vMarkerIdx) + indexHtml.substring(mainClose);
  console.log('Stripped previously injected views, length now:', indexHtml.length);
}

const jsMarker = '// =========================================================================\n    // WALLET, CONTENT, SUPPORT, REPORTS, ACCESS & SETTINGS CONTROLLERS';
const jsMarkerIdx = indexHtml.indexOf(jsMarker);
if (jsMarkerIdx !== -1) {
  const lastScriptClose = indexHtml.lastIndexOf('</script>');
  indexHtml = indexHtml.substring(0, jsMarkerIdx) + indexHtml.substring(lastScriptClose);
  console.log('Stripped previously injected JS controllers, length now:', indexHtml.length);
}

// 1. Remove old view-role-matrix and view-system-health if they exist, to use the full versions
function removeView(html, viewId) {
  const start = html.indexOf(`id="${viewId}"`);
  if (start === -1) return html;
  const divStart = html.lastIndexOf('<div', start);
  let nextMarker = html.indexOf('<!-- -------------------------------------------------------------', start);
  const mainClose = html.indexOf('</main>', start);
  if (nextMarker === -1 || (mainClose !== -1 && mainClose < nextMarker)) {
    nextMarker = mainClose;
  }
  const divEnd = html.lastIndexOf('</div>', nextMarker);
  console.log(`Removing old ${viewId} from ${divStart} to ${divEnd + 6}`);
  return html.substring(0, divStart) + html.substring(divEnd + 6);
}

indexHtml = removeView(indexHtml, 'view-role-matrix');
indexHtml = removeView(indexHtml, 'view-system-health');

// 2. Combine all new view HTML
const allNewViewsHtml = [
  walletHtml,
  contentHtml,
  supportHtml,
  reportsHtml,
  accessHtml,
  settingsHtml
].join('\n\n');

// 3. Inject new views before </main>
const mainClosePos = indexHtml.indexOf('</main>');
if (mainClosePos === -1) {
  throw new Error('</main> tag not found in index.html');
}

indexHtml = indexHtml.substring(0, mainClosePos) + 
  '\n\n<!-- =====================================================================\n' +
  '     WALLET, CONTENT, SUPPORT, REPORTS, ACCESS & SETTINGS MODULE VIEWS\n' +
  '     ===================================================================== -->\n' +
  allNewViewsHtml + '\n\n' +
  indexHtml.substring(mainClosePos);

console.log('After view injection, index.html length:', indexHtml.length);

// 4. Update navigateTo in index.html
const oldNavStart = indexHtml.indexOf('function navigateTo(pageId, parentLabel = \'\', childLabel = \'\') {');
if (oldNavStart === -1) {
  throw new Error('function navigateTo not found in index.html');
}

const oldNavEnd = indexHtml.indexOf('function quickFillPhone(', oldNavStart);
if (oldNavEnd === -1) {
  throw new Error('function quickFillPhone not found in index.html');
}

const newNavCode = `function navigateTo(pageId, parentLabel = '', childLabel = '') {
      // Module Aliases
      if (pageId === 'orders') pageId = 'all-orders';
      if (pageId === 'godown') pageId = 'godown-incoming';
      if (pageId === 'masters' || pageId === 'master') pageId = 'master-hub';
      if (pageId === 'users') pageId = 'user-list';
      if (pageId === 'field') pageId = 'field-tools';
      if (pageId === 'delivery') pageId = 'deliveries';
      if (pageId === 'sales') pageId = 'sell-requests';
      if (pageId === 'wallet') pageId = 'wallet-payouts';
      if (pageId === 'content') pageId = 'ads';
      if (pageId === 'support') pageId = 'help-support';
      if (pageId === 'reports') pageId = 'reports-hub';
      if (pageId === 'access') pageId = 'role-matrix';
      if (pageId === 'settings') pageId = 'settings-hub';

      currentActivePage = pageId;

      // Hide all view sections
      document.querySelectorAll('.view-section').forEach(el => el.classList.add('hidden'));

      // Find target section or fallback to dashboard
      const target = document.getElementById(\`view-\${pageId}\`) || 
                     document.getElementById(\`view-\${pageId}-hub\`) || 
                     document.getElementById('view-dashboard');
      if (target) {
        target.classList.remove('hidden');
      }

      // Update Titles
      const titles = {
        'dashboard': 'Command dashboard',
        'network-map': 'Network map',
        'live-pulse': 'Live pulse',
        'active-time': 'Active time',
        'sell-vs-buy': 'Sell vs buy',
        'growth-funnel': 'Growth funnel',
        'marketing-studio': 'Marketing studio',
        'coverage-gaps': 'Coverage gaps',
        'crop-intelligence': 'Crop intelligence',
        'channel-mix': 'Channel mix',
        'user-list': 'Users',
        'user-detail': 'User detail',
        'new-user': 'New user',
        'farmer-network': 'Farmer network',
        'suppliers': 'Suppliers',
        'master-hub': 'Masters',
        'crop-master': 'Crop master',
        'location-master': 'Location master',
        'category-master': 'Category master',
        'product-master': 'Product master',
        'scheme-master': 'Scheme master',
        'sell-channels': 'Sell channels',
        'language-master': 'Language master',
        'unit-master': 'Unit master',
        'field-tools': 'Field tools',
        'ai-mitra': 'AI Mitra',
        'crop-doctor': 'Crop doctor',
        'soil-doctor': 'Soil doctor',
        'crop-guide': 'Crop guide',
        'seed-guide': 'Seed guide',
        'compost': 'Compost and organic',
        'farm-manager': 'Farm manager',
        'weather': 'Weather',
        'scheme-applications': 'Scheme applications',
        'saved-items': 'Saved items',
        'all-orders': 'All orders',
        'orders': 'All orders',
        'live-orders': 'Live orders',
        'godown-incoming': 'Godown and incoming',
        'godown': 'Godown and incoming',
        'deliveries': 'Deliveries',
        'delivery': 'Deliveries',
        'sell-requests': 'Sell requests',
        'dealer-desk': 'Dealer desk',
        'dealer-orders': 'Dealer orders',
        'dealer-customers': 'Dealer customers',
        'offers-schemes': 'Offers and schemes',
        'sales': 'Sell requests',
        'shop-dashboard': 'Shop dashboard',
        'unit-dashboard': 'Unit dashboard',
        // Wallet Module
        'wallet-payouts': 'Wallet and payouts',
        'wallet': 'Wallet and payouts',
        'pending-payments': 'Pending payments',
        // Content Module
        'ads': 'Ads',
        'content': 'Ads',
        'smart-alerts': 'Smart alerts',
        'farmer-community': 'Farmer community',
        'knowledge-hub': 'Knowledge hub',
        'tool-rental': 'Tool rental',
        'nearby-services': 'Nearby services',
        'mandi-prices': 'Mandi prices',
        // Support Module
        'help-support': 'Help and support',
        'support': 'Help and support',
        // Reports Module
        'reports': 'Reports',
        'reports-hub': 'Reports',
        'sales-report': 'Sales report',
        'order-report': 'Order report',
        'master-report': 'Master report',
        'wallet-report': 'Wallet report',
        'performance-reports': 'Performance reports',
        'dealer-sales-report': 'Dealer sales report',
        'crop-report': 'Crop report',
        'location-report': 'Location report',
        'user-report': 'User report',
        // Access Module
        'role-matrix': 'Role matrix',
        'access': 'Role matrix',
        'admin-staff': 'Admin staff',
        'approvals': 'Approvals',
        'dealer-web-access': 'Dealer web access',
        'dealer-review': 'Dealer review',
        'industrial-web-access': 'Industrial web access',
        'industrial-review': 'Industrial review',
        // Settings Module
        'settings': 'Settings',
        'settings-hub': 'Settings',
        'portal-settings': 'Portal settings',
        'app-config': 'App config',
        'mobile-app': 'Mobile app',
        'system-health': 'System health',
        'audit-logs': 'Audit logs',
        'notification-settings': 'Notification settings',
      };

      const title = titles[pageId] || childLabel || 'Command dashboard';
      document.getElementById('pageHeading').textContent = title;
      document.getElementById('breadcrumbChild').textContent = title;
      if (parentLabel) {
        document.getElementById('breadcrumbParent').textContent = parentLabel;
      }

      // Re-render nav tree to highlight active
      renderNavigationTree(currentRole);

      // Re-render charts
      if (['dashboard', 'shop-dashboard', 'network-map', 'live-pulse', 'active-time', 'sell-vs-buy', 'growth-funnel', 'crop-intelligence', 'channel-mix'].includes(pageId)) {
        setTimeout(initCharts, 50);
      }
      if (['reports', 'reports-hub', 'sales-report', 'order-report', 'wallet-report', 'performance-reports', 'dealer-sales-report'].includes(pageId)) {
        setTimeout(initReportCharts, 50);
      }
    }

    // Handle Login Role Switcher
    // Quick fill helper for testing demo logins
    `;

indexHtml = indexHtml.substring(0, oldNavStart) + newNavCode + indexHtml.substring(oldNavEnd);

// 5. Inject all module JS controllers before </script>
const allModuleJs = [
  walletJs,
  contentJs,
  supportJs,
  reportsJs,
  accessJs,
  settingsJs
].join('\n\n');

const lastScriptClose = indexHtml.lastIndexOf('</script>');
indexHtml = indexHtml.substring(0, lastScriptClose) + 
  '\n\n    // =========================================================================\n' +
  '    // WALLET, CONTENT, SUPPORT, REPORTS, ACCESS & SETTINGS CONTROLLERS\n' +
  '    // =========================================================================\n' +
  allModuleJs + '\n\n' +
  indexHtml.substring(lastScriptClose);

// 6. Test syntax of all inline scripts
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let m;
let sCount = 0;
while ((m = scriptRegex.exec(indexHtml)) !== null) {
  const code = m[1];
  if (!code || !code.trim()) continue;
  sCount++;
  try {
    new vm.Script(code, { filename: `index.html-script-${sCount}` });
    console.log(`Script #${sCount} compiled cleanly with 0 syntax errors.`);
  } catch (err) {
    console.error(`Syntax error in Script #${sCount}:`, err);
    throw err;
  }
}

// 7. Write index.html
fs.writeFileSync('index.html', indexHtml, 'utf8');
console.log('Successfully written updated index.html! Length:', indexHtml.length);
