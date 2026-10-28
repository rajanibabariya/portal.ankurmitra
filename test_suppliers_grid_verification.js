// test_suppliers_grid_verification.js
const fs = require('fs');
const path = require('path');

console.log('--- 1. Testing file markup in index.html & users/suppliers.html ---');
const filesToCheck = ['index.html', path.join('users', 'suppliers.html')];

const requiredTokens = [
  'id="suppliersGridView"',
  'id="suppliersGridContainer"',
  'id="suppliersTableView"',
  'id="suppliersTableBody"',
  'id="supplierViewBtnGrid"',
  'id="supplierViewBtnTable"',
  'id="manageSupplierModal"',
  'id="manageModalSupplierName"',
  'id="manageModalSupplierRole"',
  'id="manageModalSupplierLinked"',
  'id="manageModalSupplierSupply"',
  'id="manageModalSupplierVolume"',
  'id="manageModalSupplierStatus"',
  'initSuppliersRegistry',
  'renderSuppliersUI',
  'setSupplierViewMode',
  'openManageSupplierModal',
  'handleSaveSupplierLink',
  'toggleSupplierLinkStatus',
  'deleteSupplierLink'
];

filesToCheck.forEach(file => {
  const content = fs.readFileSync(path.join(__dirname, file), 'utf8');
  console.log(`Checking ${file}... (${content.length} bytes)`);
  requiredTokens.forEach(token => {
    if (!content.includes(token)) {
      console.error(`FAIL: ${file} is missing ${token}`);
      process.exit(1);
    }
  });
  console.log(`PASS: All tokens present in ${file}`);
});

console.log('\n--- 2. Testing JSDOM / Mock DOM simulation of Suppliers Engine ---');

// Mock browser environment
const localStorageStore = {};
global.localStorage = {
  getItem: key => localStorageStore[key] || null,
  setItem: (key, val) => { localStorageStore[key] = String(val); },
  removeItem: key => { delete localStorageStore[key]; },
  clear: () => { Object.keys(localStorageStore).forEach(k => delete localStorageStore[k]); }
};

global.window = global;
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
        style: {}
      };
    }
    return global.elements[id];
  },
  querySelectorAll: selector => {
    if (selector.includes('supplier-grid-card')) {
      return global.mockCards || [];
    }
    if (selector.includes('supplier-row')) {
      return global.mockRows || [];
    }
    return [];
  },
  querySelector: () => null,
  addEventListener: () => {}
};
global.elements = {};
global.mockCards = [];
global.mockRows = [];
global.lucide = { createIcons: () => {} };
global.showToast = (msg, type) => { console.log(`[TOAST (${type})]: ${msg}`); };

// Extract and eval script from index.html
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const scriptStart = indexHtml.indexOf('// ─── SUPPLIERS MODULE GRID & CRUD CONTROLLER');
const scriptEnd = indexHtml.indexOf('// ─── MASTERS MODULE CRUD CONTROLLER', scriptStart);
const fullSuppliersScript = indexHtml.substring(scriptStart, scriptEnd);

eval(fullSuppliersScript);

console.log('Suppliers script evaluated successfully.');

// Test 1: initSuppliersRegistry
initSuppliersRegistry();
if (!window.ANKURMITRA_SUPPLIERS || window.ANKURMITRA_SUPPLIERS.length !== 8) {
  console.error('FAIL: Expected 8 seed suppliers, got', window.ANKURMITRA_SUPPLIERS?.length);
  process.exit(1);
}
console.log('PASS: Initialized 8 seed suppliers');

// Test 2: renderSuppliersUI
renderSuppliersUI();
const gridHtml = global.elements['suppliersGridContainer']?.innerHTML || '';
const tableHtml = global.elements['suppliersTableBody']?.innerHTML || '';

if (!gridHtml.includes('SUP-001') || !gridHtml.includes('Jayesh Patel') || !gridHtml.includes('Kuldevi Kirana')) {
  console.error('FAIL: Grid HTML missing SUP-001 content');
  process.exit(1);
}
console.log('PASS: Grid View contains SUP-001 and rich card content');

if (!tableHtml.includes('SUP-001') || !tableHtml.includes('Jayesh Patel')) {
  console.error('FAIL: Table HTML missing SUP-001 content');
  process.exit(1);
}
console.log('PASS: Table View contains SUP-001 row content');

// Check KPI calculations
const activeKpi = global.elements['kpiActiveSupplyLinks']?.textContent;
const farmerKpi = global.elements['kpiFarmerSuppliers']?.textContent;
const dealerKpi = global.elements['kpiAgroDealers']?.textContent;
const mfgKpi = global.elements['kpiIndustrialProcessors']?.textContent;

console.log(`KPIs: Active=${activeKpi}, Farmers=${farmerKpi}, Dealers=${dealerKpi}, Mfg=${mfgKpi}`);
if (activeKpi != 7 || farmerKpi != 4 || dealerKpi != 2 || mfgKpi != 2) {
  console.error('FAIL: KPI counts mismatch');
  process.exit(1);
}
console.log('PASS: KPI metrics accurately reflect suppliers registry');

// Test 3: setSupplierViewMode
setSupplierViewMode('grid');
if (global.elements['suppliersGridView'].classList.contains('hidden')) {
  console.error('FAIL: Grid view should not be hidden in grid mode');
  process.exit(1);
}
setSupplierViewMode('table');
if (global.elements['suppliersTableView'].classList.contains('hidden')) {
  console.error('FAIL: Table view should not be hidden in table mode');
  process.exit(1);
}
setSupplierViewMode('grid');
console.log('PASS: View mode toggling between grid and table verified');

// Test 4: openManageSupplierModal & handleSaveSupplierLink
openManageSupplierModal('SUP-001');
if (global.elements['manageModalSupplierName'].value !== 'Jayesh Patel') {
  console.error('FAIL: Modal name field was not populated');
  process.exit(1);
}
console.log('PASS: openManageSupplierModal accurately populated SUP-001');

// Edit volume and commodity
global.elements['manageModalSupplierVolume'].value = '150 Qtl / season';
global.elements['manageModalSupplierSupply'].value = 'Groundnut Premium';
handleSaveSupplierLink({ preventDefault: () => {} });

const updatedS1 = window.ANKURMITRA_SUPPLIERS.find(s => s.id === 'SUP-001');
if (updatedS1.volume !== '150 Qtl / season' || updatedS1.supply !== 'Groundnut Premium') {
  console.error('FAIL: Supplier SUP-001 did not update properly', updatedS1);
  process.exit(1);
}
console.log('PASS: handleSaveSupplierLink successfully updated SUP-001');

// Test 5: toggleSupplierLinkStatus
toggleSupplierLinkStatus('SUP-001');
if (updatedS1.status !== 'Paused') {
  console.error('FAIL: Supplier SUP-001 status should be Paused, got', updatedS1.status);
  process.exit(1);
}
console.log('PASS: toggleSupplierLinkStatus toggled SUP-001 to Paused');

// Test 6: handleCreateSupplierLink
global.elements['modalSupplierSource'] = { value: 'Bhavna Ben (Farmer, Sudavad)' };
global.elements['modalSupplierTarget'] = { value: 'Patel Agro Industries (Industrial, Amreli)' };
global.elements['modalSupplierCrop'] = { value: 'Cotton F2I' };
global.elements['modalSupplierVolume'] = { value: '40 Quintals' };

handleCreateSupplierLink({ preventDefault: () => {} });
if (window.ANKURMITRA_SUPPLIERS.length !== 9) {
  console.error('FAIL: Expected 9 suppliers after create, got', window.ANKURMITRA_SUPPLIERS.length);
  process.exit(1);
}
const created = window.ANKURMITRA_SUPPLIERS[0];
console.log(`PASS: Created new link ${created.id}: ${created.name} (${created.role}) -> ${created.linked}`);

// Test 7: deleteSupplierLink
deleteSupplierLink(created.id);
if (window.ANKURMITRA_SUPPLIERS.length !== 8) {
  console.error('FAIL: Expected 8 suppliers after delete, got', window.ANKURMITRA_SUPPLIERS.length);
  process.exit(1);
}
console.log('PASS: deleteSupplierLink successfully deleted', created.id);

console.log('\n=========================================');
console.log('ALL SUPPLIERS GRID TESTS PASSED 100%!');
console.log('=========================================');
