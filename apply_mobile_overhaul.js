const fs = require('fs');
const path = require('path');
const vm = require('vm');

const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

const newHtmlBlock = fs.readFileSync(path.join(__dirname, 'mobile_app_view_template.html'), 'utf8');
const newJsBlock = fs.readFileSync(path.join(__dirname, 'mobile_app_controller.js'), 'utf8');

// Find HTML replacement boundaries
const htmlStartMarker = '<div id="view-mobile-app"';
const htmlEndMarker = '<div id="view-system-health"';

const htmlStartIdx = indexHtml.indexOf(htmlStartMarker);
const htmlEndIdx = indexHtml.indexOf(htmlEndMarker);

if (htmlStartIdx === -1 || htmlEndIdx === -1) {
  console.error('Failed to locate HTML boundaries!', htmlStartIdx, htmlEndIdx);
  process.exit(1);
}

// Find JS replacement boundaries
const jsStartMarker = '// ─── MOBILE APP SETTINGS CONTROLLER & LIVE REAL-TIME PREVIEW ───────────────';
const jsEndMarker = 'window.resetMobileAppConfig = resetMobileAppConfig;';

const jsStartIdx = indexHtml.indexOf(jsStartMarker);
const jsEndIdx = indexHtml.indexOf(jsEndMarker) + jsEndMarker.length;

if (jsStartIdx === -1 || jsEndIdx === -1) {
  console.error('Failed to locate JS boundaries!', jsStartIdx, jsEndIdx);
  process.exit(1);
}

console.log('HTML boundaries:', htmlStartIdx, 'to', htmlEndIdx);
console.log('JS boundaries:', jsStartIdx, 'to', jsEndIdx);

// Note: Replace JS first since jsStartIdx > htmlEndIdx
const updatedIndexHtml = indexHtml.slice(0, htmlStartIdx) +
  newHtmlBlock + '\n\n          ' +
  indexHtml.slice(htmlEndIdx, jsStartIdx) +
  newJsBlock +
  indexHtml.slice(jsEndIdx);

console.log('Original length:', indexHtml.length, 'New length:', updatedIndexHtml.length);

// Verify script tags in updatedIndexHtml
const scriptTagRegex = /<script\b[^>]*>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptTagRegex.exec(updatedIndexHtml)) !== null) {
  count++;
  try {
    new vm.Script(match[1]);
  } catch (err) {
    console.error(`Script tag #${count} validation failed:`, err);
    process.exit(1);
  }
}
console.log(`All ${count} script tags in updated index.html passed syntax validation!`);

// Save updated index.html
fs.writeFileSync(indexPath, updatedIndexHtml, 'utf8');
console.log('index.html successfully updated and saved!');
