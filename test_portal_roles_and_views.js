// test_portal_roles_and_views.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const shellContent = fs.readFileSync(path.join(__dirname, 'portal-shell.js'), 'utf8');

console.log('Testing portal roles, views, and navigation logic...');

// 1. Verify all roles in AM.roles
const roles = ['superadmin', 'operate', 'maintenance', 'analysis', 'dealer', 'industrial', 'retailer'];
roles.forEach(r => {
  if (!shellContent.includes(`${r}: {`)) {
    console.error(`ERROR: Missing role ${r} in portal-shell.js`);
    process.exit(1);
  }
});
console.log('✓ All 7 core roles defined in portal-shell.js');

// 2. Verify all views in index.html
const expectedViews = [
  'view-dashboard',
  'view-shop-dashboard',
  'view-retailer-dashboard',
  'view-unit-dashboard',
  'view-f2r-procurement',
  'view-f2i-demands',
  'view-farmer-offers',
  'view-gate-intake',
  'view-industrial-stock',
  'view-dealer-stock',
  'view-service-area',
  'view-crop-doctor',
  'view-soil-doctor',
  'view-weather',
  'view-tool-rental',
  'view-sell-requests',
  'view-dealer-desk',
  'view-dealer-orders',
  'view-dealer-customers',
  'view-offers-schemes'
];

expectedViews.forEach(v => {
  if (!indexHtml.includes(`id="${v}"`)) {
    console.error(`ERROR: View container ${v} is missing in index.html!`);
    process.exit(1);
  }
});
console.log(`✓ All ${expectedViews.length} critical views verified present in index.html`);

// 3. Verify Header Role Dropdown elements
const requiredHeaderElements = [
  'headerRolePillBtn',
  'headerRolePill',
  'roleDropdownMenu'
];
requiredHeaderElements.forEach(id => {
  if (!indexHtml.includes(`id="${id}"`)) {
    console.error(`ERROR: Missing header element ${id} in index.html!`);
    process.exit(1);
  }
});
console.log('✓ All header multi-role dropdown elements verified');

// 4. Test script compilation
const scriptRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let m;
let scriptIndex = 0;
while ((m = scriptRegex.exec(indexHtml)) !== null) {
  scriptIndex++;
  const code = m[1].trim();
  if (code.length > 50) {
    try {
      new vm.Script(code);
    } catch (e) {
      console.error(`ERROR compiling inline script #${scriptIndex}:`, e.message);
      process.exit(1);
    }
  }
}
console.log(`✓ All inline scripts compiled cleanly with 0 syntax errors`);
console.log('\n========================================');
console.log('ALL TESTS PASSED WITH 100% SUCCESS!');
console.log('========================================');
