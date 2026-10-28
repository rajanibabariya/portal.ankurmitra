// test_mobile_settings_integrity.js
const fs = require('fs');
const path = require('path');
const assert = require('assert');

const filesToTest = [
  path.join(__dirname, 'index.html'),
  path.join(__dirname, 'settings/mobile-app.html')
];

filesToTest.forEach(filePath => {
  const content = fs.readFileSync(filePath, 'utf8');
  const filename = path.basename(filePath);
  console.log(`Testing ${filename}...`);

  // 1. Branding & Header elements
  assert(content.includes('id="cfgMobileFarmerName"'), 'Missing cfgMobileFarmerName in ' + filename);
  assert(content.includes('id="cfgMobileFarmerLocation"'), 'Missing cfgMobileFarmerLocation in ' + filename);
  assert(content.includes('id="cfgMobileGreetingFormat"'), 'Missing cfgMobileGreetingFormat in ' + filename);
  assert(content.includes('id="cfgMobileAlertCount"'), 'Missing cfgMobileAlertCount in ' + filename);
  assert(content.includes('id="cfgMobileFarmerAvatar"'), 'Missing cfgMobileFarmerAvatar in ' + filename);
  assert(content.includes('id="cfgMobileHeaderBg"'), 'Missing cfgMobileHeaderBg in ' + filename);

  // 2. Hero Banner elements
  assert(content.includes('id="cfgMobileBannerVisible"'), 'Missing cfgMobileBannerVisible in ' + filename);
  assert(content.includes('id="cfgMobileBannerTag"'), 'Missing cfgMobileBannerTag in ' + filename);
  assert(content.includes('id="cfgMobileBannerTitle"'), 'Missing cfgMobileBannerTitle in ' + filename);
  assert(content.includes('id="cfgMobileBannerSubtitle"'), 'Missing cfgMobileBannerSubtitle in ' + filename);
  assert(content.includes('id="cfgMobileBannerCta"'), 'Missing cfgMobileBannerCta in ' + filename);
  assert(content.includes('id="cfgMobileBannerTheme"'), 'Missing cfgMobileBannerTheme in ' + filename);
  assert(content.includes('id="cfgMobileBannerSlide"'), 'Missing cfgMobileBannerSlide in ' + filename);

  // 3. 8 Quick Action modules
  ['AiMitra', 'CropDoctor', 'Mandi', 'Weather', 'CropGuide', 'FarmerMart', 'ToolRental', 'More'].forEach(mod => {
    assert(content.includes(`id="cfgMod_${mod}"`), `Missing cfgMod_${mod} in ` + filename);
    assert(content.includes(`id="cfgModLabel_${mod}"`), `Missing cfgModLabel_${mod} in ` + filename);
    assert(content.includes(`id="phoneCard_${mod}"`), `Missing phoneCard_${mod} in ` + filename);
    assert(content.includes(`id="phoneModLabel_${mod}"`), `Missing phoneModLabel_${mod} in ` + filename);
  });

  // 4. Telemetry & Weather
  assert(content.includes('id="cfgMobileUpdateHeading"'), 'Missing cfgMobileUpdateHeading in ' + filename);
  assert(content.includes('id="cfgMobileWeatherTemp"'), 'Missing cfgMobileWeatherTemp in ' + filename);
  assert(content.includes('id="cfgMobileWeatherCondition"'), 'Missing cfgMobileWeatherCondition in ' + filename);
  assert(content.includes('id="cfgMobileRainProb"'), 'Missing cfgMobileRainProb in ' + filename);
  assert(content.includes('id="cfgMobileHumidity"'), 'Missing cfgMobileHumidity in ' + filename);
  assert(content.includes('id="cfgMobileWindSpeed"'), 'Missing cfgMobileWindSpeed in ' + filename);

  // 5. Mandi & Advisories
  assert(content.includes('id="cfgMobileMandiCrop"'), 'Missing cfgMobileMandiCrop in ' + filename);
  assert(content.includes('id="cfgMobileMandiRate"'), 'Missing cfgMobileMandiRate in ' + filename);
  assert(content.includes('id="cfgMobileMandiUnit"'), 'Missing cfgMobileMandiUnit in ' + filename);
  assert(content.includes('id="cfgMobileMandiDelta"'), 'Missing cfgMobileMandiDelta in ' + filename);
  assert(content.includes('id="cfgMobileAdv1Title"'), 'Missing cfgMobileAdv1Title in ' + filename);
  assert(content.includes('id="cfgMobileAdv1Sub"'), 'Missing cfgMobileAdv1Sub in ' + filename);
  assert(content.includes('id="cfgMobileAdv2Title"'), 'Missing cfgMobileAdv2Title in ' + filename);
  assert(content.includes('id="cfgMobileAdv2Sub"'), 'Missing cfgMobileAdv2Sub in ' + filename);

  // 6. Navigation Tabs
  for (let i = 1; i <= 5; i++) {
    assert(content.includes(`id="cfgMobileTab${i}"`), `Missing cfgMobileTab${i} in ` + filename);
    assert(content.includes(`id="phoneTab${i}Label"`), `Missing phoneTab${i}Label in ` + filename);
  }
  assert(content.includes('id="cfgMobileActiveTab"'), 'Missing cfgMobileActiveTab in ' + filename);

  // 7. Phone screen mockup elements
  assert(content.includes('id="phoneHardwareFrame"'), 'Missing phoneHardwareFrame in ' + filename);
  assert(content.includes('id="phoneScreen"'), 'Missing phoneScreen in ' + filename);
  assert(content.includes('id="phoneScreenshotOverlay"'), 'Missing phoneScreenshotOverlay in ' + filename);
  assert(content.includes('id="phoneHeroBannerContainer"'), 'Missing phoneHeroBannerContainer in ' + filename);
  assert(content.includes('id="phoneServicesGrid"'), 'Missing phoneServicesGrid in ' + filename);
  assert(content.includes('id="phoneBottomTabBar"'), 'Missing phoneBottomTabBar in ' + filename);

  // Exact Logo & Farmer Avatar assertions
  assert(content.includes('id="phoneBrandLogoImg"'), 'Missing phoneBrandLogoImg in ' + filename);
  assert(content.includes('id="phoneFarmerAvatarImg"'), 'Missing phoneFarmerAvatarImg in ' + filename);
  assert(content.includes('id="cfgMobileLogoStyle"'), 'Missing cfgMobileLogoStyle in ' + filename);
  if (filename === 'index.html') {
    assert(content.includes('assets/ankurmitra_emblem.png'), 'Missing ankurmitra_emblem.png in index.html');
    assert(content.includes('assets/farmer_jayesh_exact.png'), 'Missing farmer_jayesh_exact.png in index.html');
    assert(content.includes('assets/mobile_farm_header_exact.png'), 'Missing mobile_farm_header_exact.png in index.html');
    assert(content.includes('assets/mobile_drone_banner_exact.png'), 'Missing mobile_drone_banner_exact.png in index.html');
    assert(content.includes('assets/mobile_peanut_exact.png'), 'Missing mobile_peanut_exact.png in index.html');
  } else {
    assert(content.includes('../assets/ankurmitra_emblem.png'), 'Missing ../assets/ankurmitra_emblem.png in ' + filename);
    assert(content.includes('../assets/farmer_jayesh_exact.png'), 'Missing ../assets/farmer_jayesh_exact.png in ' + filename);
    assert(content.includes('../assets/mobile_farm_header_exact.png'), 'Missing ../assets/mobile_farm_header_exact.png in ' + filename);
    assert(content.includes('../assets/mobile_drone_banner_exact.png'), 'Missing ../assets/mobile_drone_banner_exact.png in ' + filename);
    assert(content.includes('../assets/mobile_peanut_exact.png'), 'Missing ../assets/mobile_peanut_exact.png in ' + filename);
  }

  // 8. JS Controller functions
  [
    'initMobileAppSettings',
    'switchMobileSettingsTab',
    'selectMobileColorSwatch',
    'setMockupViewMode',
    'setMobileDeviceFrame',
    'setMobilePreviewLanguage',
    'setMobileActiveTabPreview',
    'updateMobileAppPreview',
    'saveMobileAppConfig',
    'resetMobileAppConfig'
  ].forEach(fn => {
    assert(content.includes(`function ${fn}`), `Missing function ${fn} in ` + filename);
    assert(content.includes(`window.${fn} = ${fn}`), `Missing window.${fn} export in ` + filename);
  });

  console.log(`✓ ${filename} passed all assertions!`);
});

console.log('\nAll mobile settings integrity tests passed with 100% success!');
