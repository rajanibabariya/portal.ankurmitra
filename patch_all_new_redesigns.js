// patch_all_new_redesigns.js
const fs = require('fs');
const vm = require('vm');

const f = require('./builder_field.js');
const c = require('./modules/content.js');
const u = require('./builder_user_and_sales.js');

let html = fs.readFileSync('index.html', 'utf8');

function findBlockBounds(source, startTarget, endTarget) {
  const sTag = source.indexOf(startTarget);
  if (sTag === -1) throw new Error('Start target not found: ' + startTarget);
  let s = source.lastIndexOf('\n', sTag);
  s = s === -1 ? 0 : s + 1;
  const prevCommentEnd = source.lastIndexOf('-->', sTag);
  if (prevCommentEnd !== -1 && sTag - prevCommentEnd < 60) {
    const prevCommentStart = source.lastIndexOf('<!--', prevCommentEnd);
    if (prevCommentStart !== -1) {
      const lineBefore = source.lastIndexOf('\n', prevCommentStart);
      s = lineBefore === -1 ? 0 : lineBefore + 1;
    }
  }

  const eTag = source.indexOf(endTarget);
  if (eTag === -1) throw new Error('End target not found: ' + endTarget);
  let e = source.lastIndexOf('\n', eTag);
  e = e === -1 ? eTag : e + 1;
  const eCommentEnd = source.lastIndexOf('-->', eTag);
  if (eCommentEnd !== -1 && eTag - eCommentEnd < 60) {
    const eCommentStart = source.lastIndexOf('<!--', eCommentEnd);
    if (eCommentStart !== -1) {
      const lineBefore = source.lastIndexOf('\n', eCommentStart);
      e = lineBefore === -1 ? 0 : lineBefore + 1;
    }
  }
  return { s, e };
}

const bContent = findBlockBounds(html, 'id="view-ads"', 'id="view-help-support"');
const bOffers = findBlockBounds(html, 'id="view-offers-schemes"', 'id="view-shop-dashboard"');
const bField = findBlockBounds(html, 'id="view-field-tools"', 'id="view-all-orders"');
const bUser = findBlockBounds(html, 'id="view-new-user"', 'id="view-farmer-network"');

console.log('Bounds calculated:');
console.log('Content:', bContent);
console.log('Offers:', bOffers);
console.log('Field:', bField);
console.log('User:', bUser);

// Replace from bottom to top so offsets remain strictly valid
// 1. Content
html = html.substring(0, bContent.s) + c.contentHtml + '\n\n' + html.substring(bContent.e);
// 2. Offers
html = html.substring(0, bOffers.s) + u.offersSchemesHtml + '\n\n' + html.substring(bOffers.e);
// 3. Field
html = html.substring(0, bField.s) + f.fieldHtml + '\n\n' + html.substring(bField.e);
// 4. User
html = html.substring(0, bUser.s) + u.newUserHtml + '\n\n' + html.substring(bUser.e);

// Now append new controllers before the closing </script> tag
const lastScriptEnd = html.lastIndexOf('</script>');
if (lastScriptEnd === -1) throw new Error('No </script> tag found!');

const newControllers = `
// ============================================================================
// NEW PORTAL 2026 SAAS CONTROLLERS (Field, Content, Users, Offers)
// ============================================================================
${u.newUserJs}

${f.fieldJs}

${u.offersSchemesJs}

${c.contentJs}
`;

html = html.substring(0, lastScriptEnd) + '\n\n' + newControllers + '\n\n' + html.substring(lastScriptEnd);

// Check Gujarati characters
const gujaratiRegex = /[\u0A80-\u0AFF]/g;
const gujaratiMatches = html.match(gujaratiRegex);
if (gujaratiMatches && gujaratiMatches.length > 0) {
  throw new Error(`Gujarati characters found in generated HTML: ${gujaratiMatches.length}`);
}

// Check scripts syntax
const scriptTagRegex = /<script(?![^>]*src)[\s\S]*?>([\s\S]*?)<\/script>/gi;
let match;
let count = 0;
while ((match = scriptTagRegex.exec(html)) !== null) {
  count++;
  try {
    new vm.Script(match[1]);
  } catch (err) {
    throw new Error(`Script #${count} syntax error: ${err.message}`);
  }
}

console.log(`All ${count} inline scripts compiled cleanly with 0 syntax errors!`);

// Write out patched index.html
fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html successfully updated! Length:', html.length);
