// patch_navigate_to_hooks.js
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

const needle = `if (pageId === 'user-list' && typeof renderUsersTable === 'function') {
          renderUsersTable();
        }`;

const replacement = `if (pageId === 'user-list' && typeof renderUsersTable === 'function') {
          renderUsersTable();
        }
        if (pageId === 'suppliers' && typeof renderSuppliersUI === 'function') {
          renderSuppliersUI();
        }
        if (pageId === 'farmer-network' && typeof renderFarmerNetworkGrid === 'function') {
          renderFarmerNetworkGrid();
        }
        if (pageId.includes('master') || pageId === 'sell-channels') {
          if (typeof renderAllMasterGrids === 'function') {
            renderAllMasterGrids();
          }
        }`;

if (html.includes(needle)) {
  html = html.replace(needle, replacement);
  fs.writeFileSync(indexPath, html, 'utf8');
  console.log('Successfully patched navigateTo hooks!');
} else {
  console.error('needle not found in navigateTo!');
}
