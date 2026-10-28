const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// 1. Check Mobile App settings preview
console.log('--- MOBILE APP PREVIEW INVESTIGATION ---');
const mobileUpdateFn = html.indexOf('function updateMobileAppPreview()');
console.log('updateMobileAppPreview pos:', mobileUpdateFn);

// 2. Check Portal settings preview
console.log('--- PORTAL SETTINGS PREVIEW INVESTIGATION ---');
const portalPreviewIdx = html.indexOf('updatePortalPreview');
console.log('updatePortalPreview pos:', portalPreviewIdx);

// 3. Check App Config preview
console.log('--- APP CONFIG PREVIEW INVESTIGATION ---');
const appConfigPreviewIdx = html.indexOf('updateAppConfigPreview');
console.log('updateAppConfigPreview pos:', appConfigPreviewIdx);

// 4. Check where initMobileAppSettings is called
const initCalls = [];
let idx = 0;
while ((idx = html.indexOf('initMobileAppSettings()', idx)) !== -1) {
  initCalls.push(idx);
  idx += 20;
}
console.log('initMobileAppSettings() call locations:', initCalls);
