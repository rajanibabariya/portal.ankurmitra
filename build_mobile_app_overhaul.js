// build_mobile_app_overhaul.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const indexPath = path.join(__dirname, 'index.html');
let indexHtml = fs.readFileSync(indexPath, 'utf8');

// Ensure assets/mobile_app_screenshot.png is ready
if (!fs.existsSync(path.join(__dirname, 'assets/mobile_app_screenshot.png'))) {
  fs.copyFileSync(
    'C:/Users/rajani.babariya/.gemini/antigravity/brain/6059bd11-1f3b-4411-bf52-282c45be11c1/.user_uploaded/media_1793166415935_e78321f3.png',
    path.join(__dirname, 'assets/mobile_app_screenshot.png')
  );
}

console.log('Mobile screenshot confirmed in assets.');
