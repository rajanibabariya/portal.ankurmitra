// update_index_mobile.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

console.log('Original index.html length:', indexHtml.length);
