const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

const logoIdx = html.indexOf('id="phoneBrandTitle"');
console.log('Snippet around phoneBrandTitle:');
console.log(html.slice(logoIdx - 400, logoIdx + 400));

const avatarIdx = html.indexOf('id="phoneFarmerAvatarImg"');
console.log('\nSnippet around phoneFarmerAvatarImg:');
console.log(html.slice(avatarIdx - 200, avatarIdx + 200));
