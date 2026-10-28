const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
const html = fs.readFileSync(indexPath, 'utf8');

console.log('--- ENHANCEMENT INTEGRITY AUDIT ---');

let errors = 0;
function assert(condition, message) {
  if (!condition) {
    console.error('FAIL: ' + message);
    errors++;
  } else {
    console.log('PASS: ' + message);
  }
}

// 1. Bloomberg Mandi Ticker
assert(html.includes('id="bloombergMandiTicker"'), 'Ticker element exists');
assert(html.includes('h-10.5 min-h-[42px]'), 'Ticker has comfortable 42px height');
assert(html.includes('APMC LIVE MANDI'), 'APMC Live Mandi badge present');
assert(html.includes('Cotton'), 'Cotton present');
assert(html.includes('₹7,450/Qtl'), 'Cotton price formatted with rupee');
assert(html.includes('Groundnut'), 'Groundnut present');
assert(html.includes('Wheat'), 'Wheat present');
assert(html.includes('Cumin'), 'Cumin present');
assert(html.includes('Mustard'), 'Mustard present');
assert(html.includes('Castor'), 'Castor present');
assert(html.includes('Soyabean'), 'Soyabean present');
assert(html.includes('NPK FERT'), 'NPK present');
assert(html.includes('white-space: nowrap'), 'CSS specifies white-space: nowrap for ticker items');

// 2. Portal Preferences New Controls
assert(html.includes('id="cfgPortalFontSize"'), 'cfgPortalFontSize element exists');
assert(html.includes('id="cfgPortalCardShadow"'), 'cfgPortalCardShadow element exists');
assert(html.includes('id="cfgPortalFiscalYear"'), 'cfgPortalFiscalYear element exists');
assert(html.includes('id="cfgPortalTimeFormat"'), 'cfgPortalTimeFormat element exists');
assert(html.includes('id="cfgPortalStickyHeader"'), 'cfgPortalStickyHeader element exists');
assert(html.includes('id="cfgPortalMandiTickerVisible"'), 'cfgPortalMandiTickerVisible element exists');
assert(html.includes('id="cfgPortalTableRowHeight"'), 'cfgPortalTableRowHeight element exists');
assert(html.includes('id="cfgPortalExportFormat"'), 'cfgPortalExportFormat element exists');
assert(html.includes('id="cfgPortalChimeTone"'), 'cfgPortalChimeTone element exists');
assert(html.includes('id="cfgPortalChimeVolume"'), 'cfgPortalChimeVolume element exists');

// 3. Mobile App Settings New Controls
assert(html.includes('id="cfgMobileIconStyle"'), 'cfgMobileIconStyle element exists');
assert(html.includes('id="cfgMobileDefaultTheme"'), 'cfgMobileDefaultTheme element exists');
assert(html.includes('id="cfgMobileBannerTarget"'), 'cfgMobileBannerTarget element exists');
assert(html.includes('id="cfgMobileHomeLayoutMode"'), 'cfgMobileHomeLayoutMode element exists');
assert(html.includes('id="cfgMobileBottomNavStyle"'), 'cfgMobileBottomNavStyle element exists');
assert(html.includes('id="cfgMobileMandiWidgetStyle"'), 'cfgMobileMandiWidgetStyle element exists');
assert(html.includes('id="cfgMobileSyncPolicy"'), 'cfgMobileSyncPolicy element exists');

// 4. Check that applyAllPortalPreferences handles all new settings
assert(html.includes("fontSize: document.getElementById('cfgPortalFontSize')"), 'applyAllPortalPreferences reads fontSize');
assert(html.includes("cardShadow: document.getElementById('cfgPortalCardShadow')"), 'applyAllPortalPreferences reads cardShadow');
assert(html.includes("mandiTickerVisible: document.getElementById('cfgPortalMandiTickerVisible')"), 'applyAllPortalPreferences reads mandiTickerVisible');
assert(html.includes("portal-ticker-hidden"), 'portal-ticker-hidden class toggled');
assert(html.includes("portal-font-"), 'portal-font- class toggled');

// 5. Check syncSettingsAcrossAllPages handles new settings
assert(html.includes("document.getElementById('cfgPortalFontSize') && prefs.fontSize"), 'syncSettings updates cfgPortalFontSize');
assert(html.includes("document.getElementById('cfgPortalCardShadow') && prefs.cardShadow"), 'syncSettings updates cfgPortalCardShadow');

console.log('-----------------------------------');
if (errors === 0) {
  console.log('ALL AUDITS PASSED WITH 100% SUCCESS!');
} else {
  console.error(`AUDIT FAILED with ${errors} errors.`);
  process.exit(1);
}
