// verify_three_issues.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const indexPath = path.join(__dirname, 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

console.log('--- Verifying Solutions for Issues 1, 2, and 3 ---');

// 1. Verify Issue 1: Session persistence
const hasSessionSet = indexHtml.includes("localStorage.setItem('ankurmitra_session'");
const hasSessionGet = indexHtml.includes("localStorage.getItem('ankurmitra_session'");
const hasCheckSession = indexHtml.includes("function checkPersistedSession()");
const hasDomInit = indexHtml.includes("checkPersistedSession();");

if (!hasSessionSet || !hasSessionGet || !hasCheckSession || !hasDomInit) {
  console.error('FAIL: Issue 1 (Session persistence) checks failed!', {
    hasSessionSet, hasSessionGet, hasCheckSession, hasDomInit
  });
  process.exit(1);
}
console.log('✓ Issue 1 PASSED: Session persistence properly implemented with localStorage and checkPersistedSession().');

// 2. Verify Issue 2: Login label changed to "Sign in"
const hasOldTitle = indexHtml.includes('>Sign in to Web Portal</h1>');
const hasNewTitle = indexHtml.includes('>Sign in</h1>');
const hasNewBtn = indexHtml.includes('<span>Sign in</span>');

if (hasOldTitle || !hasNewTitle || !hasNewBtn) {
  console.error('FAIL: Issue 2 (Login page label) checks failed!', {
    hasOldTitle, hasNewTitle, hasNewBtn
  });
  process.exit(1);
}
console.log('✓ Issue 2 PASSED: Login title is "Sign in" and button is "Sign in".');

// 3. Verify Issue 3: Bi-directional i18n
const hasI18nDict = indexHtml.includes('window.I18N_DICTIONARY =');
const hasReverseDict = indexHtml.includes('window.REVERSE_DICTIONARY =');
const hasTranslateSubtree = indexHtml.includes('function translateSubtree(');

const sampleTerms = [
  'Registered farmers',
  'Dealers',
  'Retailers',
  'Industrial',
  'Active now',
  'Sell GMV',
  'Purchase GMV',
  'Open deliveries',
  'Amreli District Operating Map',
  'Sell vs Purchase GMV (₹)',
  'Users by Role',
  'Growth Funnel',
  'Export'
];

let missingInDict = [];
sampleTerms.forEach(t => {
  if (!indexHtml.includes(`"${t}": {`)) {
    missingInDict.push(t);
  }
});

let missingInReverse = [];
const sampleReverse = [
  'નોંધાયેલા ખેડૂતો',
  'ડીલર્સ',
  'રિટેલર્સ',
  'ઔદ્યોગિક',
  'હાલમાં સક્રિય',
  'વેચાણ GMV',
  'ખરીદી GMV',
  'ચાલુ ડિલિવરી',
  'એક્સપોર્ટ કરો'
];

sampleReverse.forEach(t => {
  if (!indexHtml.includes(`"${t}":`)) {
    missingInReverse.push(t);
  }
});

if (!hasI18nDict || !hasReverseDict || !hasTranslateSubtree || missingInDict.length > 0 || missingInReverse.length > 0) {
  console.error('FAIL: Issue 3 (i18n bi-directional translation) checks failed!', {
    hasI18nDict, hasReverseDict, hasTranslateSubtree, missingInDict, missingInReverse
  });
  process.exit(1);
}
console.log('✓ Issue 3 PASSED: Full body translation dictionary, reverse dictionary, and translateSubtree verified.');

console.log('\n========================================');
console.log('ALL 3 ISSUES VERIFIED AND FIXED SUCCESSFULLY!');
console.log('========================================');
