/**
 * clean_duplicate_destroys.js
 * Removes redundant `if (chartXxxInstance) chartXxxInstance.destroy();` lines
 * that now precede safeDestroyChart() calls (keeping only safeDestroyChart).
 */

const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(filePath, 'utf8');

console.log('=== Clean Duplicate Destroys ===');

// These are the old patterns - one per report chart instance variable
const oldDestroyPatterns = [
  `        if (chartSalesReportDailyInstance) chartSalesReportDailyInstance.destroy();\n        safeDestroyChart('chartSalesReportDaily');`,
  `        if (chartOrderStatusStackedInstance) chartOrderStatusStackedInstance.destroy();\n        safeDestroyChart('chartOrderStatusStacked');`,
  `        if (chartWalletIncomeExpenseInstance) chartWalletIncomeExpenseInstance.destroy();\n        safeDestroyChart('chartWalletIncomeExpense');`,
  `        if (chartPerfOrdersVsRevInstance) chartPerfOrdersVsRevInstance.destroy();\n        safeDestroyChart('chartPerfOrdersVsRev');`,
  `        if (chartPerfUsersByRoleInstance) chartPerfUsersByRoleInstance.destroy();\n        safeDestroyChart('chartPerfUsersByRole');`,
  `        if (chartPerfPlaceMixInstance) chartPerfPlaceMixInstance.destroy();\n        safeDestroyChart('chartPerfPlaceMix');`,
  `        if (chartPerfMandiTrendsInstance) chartPerfMandiTrendsInstance.destroy();\n        safeDestroyChart('chartPerfMandiTrends');`,
  `        if (chartDealerSalesByItemInstance) chartDealerSalesByItemInstance.destroy();\n        safeDestroyChart('chartDealerSalesByItem');`,
];

const cleanReplacements = [
  `        safeDestroyChart('chartSalesReportDaily');`,
  `        safeDestroyChart('chartOrderStatusStacked');`,
  `        safeDestroyChart('chartWalletIncomeExpense');`,
  `        safeDestroyChart('chartPerfOrdersVsRev');`,
  `        safeDestroyChart('chartPerfUsersByRole');`,
  `        safeDestroyChart('chartPerfPlaceMix');`,
  `        safeDestroyChart('chartPerfMandiTrends');`,
  `        safeDestroyChart('chartDealerSalesByItem');`,
];

let cleanCount = 0;
for (let i = 0; i < oldDestroyPatterns.length; i++) {
  if (html.includes(oldDestroyPatterns[i])) {
    html = html.replace(oldDestroyPatterns[i], cleanReplacements[i]);
    cleanCount++;
    console.log(`✅ Cleaned duplicate destroy #${i+1}`);
  } else {
    console.log(`ℹ️  Pattern #${i+1} not found (may already be clean)`);
  }
}

fs.writeFileSync(filePath, html, 'utf8');
console.log(`\nCleaned ${cleanCount} duplicate destroy patterns.`);
console.log('File size:', html.length);
console.log('\n✅ Done. Run sync_module_directories.js then audit_all_portal_pages.js');
