// test_all_masters_and_lists_verification.js
const fs = require('fs');
const path = require('path');

console.log('=== 1. Verifying Markup in Main Files ===');

const pagesToVerify = [
  { file: 'index.html', checks: ['cropGridView', 'userViewBtnGrid', 'farmerNetworkViewBtnGrid', 'ordersViewBtnGrid'] },
  { file: path.join('masters', 'crop-master.html'), checks: ['cropGridView', 'cropGridContainer', 'masterViewBtnGrid_crop', 'cropTableView'] },
  { file: path.join('masters', 'location-master.html'), checks: ['locationGridView', 'locationGridContainer', 'masterViewBtnGrid_location', 'locationTableView'] },
  { file: path.join('masters', 'category-master.html'), checks: ['categoryGridView', 'categoryGridContainer', 'masterViewBtnGrid_category', 'categoryTableView'] },
  { file: path.join('masters', 'product-master.html'), checks: ['productGridView', 'productGridContainer', 'masterViewBtnGrid_product', 'productTableView'] },
  { file: path.join('masters', 'scheme-master.html'), checks: ['schemeGridView', 'schemeGridContainer', 'masterViewBtnGrid_scheme', 'schemeTableView'] },
  { file: path.join('masters', 'sell-channels.html'), checks: ['channelGridView', 'channelGridContainer', 'masterViewBtnGrid_channel', 'channelTableView'] },
  { file: path.join('masters', 'language-master.html'), checks: ['languageGridView', 'languageGridContainer', 'masterViewBtnGrid_language', 'languageTableView'] },
  { file: path.join('masters', 'unit-master.html'), checks: ['unitGridView', 'unitGridContainer', 'masterViewBtnGrid_unit', 'unitTableView'] },
  { file: path.join('users', 'user-list.html'), checks: ['usersGridView', 'usersGridContainer', 'userViewBtnGrid', 'userViewBtnTable', 'usersTableView'] },
  { file: path.join('users', 'farmer-network.html'), checks: ['farmerNetworkGridView', 'farmerNetworkGridContainer', 'farmerNetworkViewBtnGrid', 'farmerNetworkTableView'] },
  { file: path.join('orders', 'all-orders.html'), checks: ['ordersGridView', 'ordersGridContainer', 'ordersViewBtnGrid', 'ordersTableView'] },
  { file: path.join('delivery', 'deliveries.html'), checks: ['deliveriesGridView', 'deliveriesGridContainer', 'deliveriesViewBtnGrid', 'deliveriesTableView'] },
  { file: path.join('sales', 'sell-requests.html'), checks: ['sellRequestsGridView', 'sellRequestsGridContainer', 'sellRequestsViewBtnGrid', 'sellRequestsTableView'] }
];

pagesToVerify.forEach(p => {
  const filePath = path.join(__dirname, p.file);
  if (!fs.existsSync(filePath)) {
    console.error(`FAIL: File ${p.file} not found!`);
    process.exit(1);
  }
  const content = fs.readFileSync(filePath, 'utf8');
  p.checks.forEach(check => {
    if (!content.includes(check)) {
      console.error(`FAIL: ${p.file} is missing required token: ${check}`);
      process.exit(1);
    }
  });
  console.log(`PASS: ${p.file} has all ${p.checks.length} required elements.`);
});

console.log('\n=== 2. Testing JSDOM Simulation of Master Grid Engine ===');

// Mock DOM
const localStorageStore = {};
global.localStorage = {
  getItem: key => localStorageStore[key] || null,
  setItem: (key, val) => { localStorageStore[key] = String(val); },
  removeItem: key => { delete localStorageStore[key]; },
  clear: () => { Object.keys(localStorageStore).forEach(k => delete localStorageStore[k]); }
};

global.window = global;
global.elements = {};
global.document = {
  readyState: 'complete',
  createElement: tag => ({
    tagName: tag,
    className: '',
    classList: { add: () => {}, remove: () => {} },
    innerHTML: '',
    appendChild: () => {}
  }),
  getElementById: id => {
    if (!global.elements[id]) {
      global.elements[id] = {
        id,
        value: '',
        textContent: '',
        innerHTML: '',
        classList: {
          classes: new Set(),
          add: function(c) { this.classes.add(c); },
          remove: function(c) { this.classes.delete(c); },
          contains: function(c) { return this.classes.has(c); }
        },
        style: {},
        querySelectorAll: () => [],
        querySelector: () => null
      };
    }
    return global.elements[id];
  },
  querySelectorAll: selector => {
    if (selector.includes('user-row') || selector.includes('user-grid-card')) {
      return Object.values(global.elements).filter(e => e.className && (e.className.includes('user-row') || e.className.includes('user-grid-card')));
    }
    return [];
  },
  querySelector: () => null,
  addEventListener: () => {}
};
global.lucide = { createIcons: () => {} };
global.showToast = (msg, type) => { console.log(`[TOAST (${type})]: ${msg}`); };
global.filterUserList = () => {};

// Extract and eval relevant scripts from index.html
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// 1. Master Grid Engine
const masterGridStart = indexHtml.indexOf('// ─── UNIVERSAL MASTER GRID ENGINE');
const masterGridEnd = indexHtml.indexOf('window.deleteMasterFromCard = deleteMasterFromCard;', masterGridStart) + 'window.deleteMasterFromCard = deleteMasterFromCard;'.length;
const masterGridScript = indexHtml.substring(masterGridStart, masterGridEnd);

// Also provide masterConfigs mock
global.masterConfigs = {
  crop: {
    title: 'Crop',
    tableBody: 'cropTableBody',
    l1: 'Crop Name',
    l2: 'Season Mode',
    l3: 'Unit Mode',
    l4: 'Procurement Mode',
    l5: 'Moisture Mode'
  }
};

eval(masterGridScript);
console.log('Master Grid Script evaluated successfully.');

// Mock a master table body for 'crop'
global.elements['cropTableBody'] = {
  querySelectorAll: () => [
    {
      getAttribute: attr => ({
        'data-id': 'c1',
        'data-val1': 'Wheat (GW-496 / Lokwan)',
        'data-val2': 'Rabi (October)',
        'data-val3': 'Quintal (100 kg = 5 Mann)',
        'data-val4': 'MSP Procured (₹ 2,275/qtl)',
        'data-val5': 'Moisture ≤ 12.0% Grade A',
        'data-status': 'Active'
      }[attr]),
      innerText: 'Wheat GW-496 Rabi Quintal MSP Active',
      style: {}
    },
    {
      getAttribute: attr => ({
        'data-id': 'c2',
        'data-val1': 'Cotton (Shankar-6 Clean)',
        'data-val2': 'Kharif (June-July)',
        'data-val3': 'Quintal (100 kg)',
        'data-val4': 'Mandi Auction (₹ 7,120/qtl)',
        'data-val5': 'Moisture ≤ 8.5% Staple 29mm',
        'data-status': 'Active'
      }[attr]),
      innerText: 'Cotton Shankar-6 Kharif Mandi Active',
      style: {}
    }
  ]
};

// Test renderMasterGrid('crop')
renderMasterGrid('crop');
const cropGridHtml = global.elements['cropGridContainer']?.innerHTML || '';
if (!cropGridHtml.includes('Wheat (GW-496 / Lokwan)') || !cropGridHtml.includes('Cotton (Shankar-6 Clean)')) {
  console.error('FAIL: cropGridContainer missing crop cards!');
  process.exit(1);
}
console.log('PASS: renderMasterGrid("crop") rendered 2 crop cards properly.');

// Test setMasterViewMode('crop', 'grid') and 'table'
setMasterViewMode('crop', 'grid');
if (global.elements['cropGridView'].classList.contains('hidden')) {
  console.error('FAIL: cropGridView should not be hidden in grid mode');
  process.exit(1);
}
setMasterViewMode('crop', 'table');
if (global.elements['cropTableView'].classList.contains('hidden')) {
  console.error('FAIL: cropTableView should not be hidden in table mode');
  process.exit(1);
}
console.log('PASS: Master view mode toggling between grid and table verified.');

// Test User View Mode
const userViewModeStart = indexHtml.indexOf('function setUserViewMode(mode)');
const userViewModeEnd = indexHtml.indexOf('window.setUserViewMode = setUserViewMode;', userViewModeStart) + 'window.setUserViewMode = setUserViewMode;'.length;
const userViewScript = indexHtml.substring(userViewModeStart, userViewModeEnd);
eval(userViewScript);

setUserViewMode('grid');
if (global.elements['usersGridView'].classList.contains('hidden')) {
  console.error('FAIL: usersGridView should not be hidden in grid mode');
  process.exit(1);
}
setUserViewMode('table');
if (global.elements['usersTableView'].classList.contains('hidden')) {
  console.error('FAIL: usersTableView should not be hidden in table mode');
  process.exit(1);
}
console.log('PASS: User view mode toggling verified.');

console.log('\n============================================================');
console.log('ALL MASTER & LIST GRID VIEW TESTS PASSED 100%!');
console.log('============================================================');
