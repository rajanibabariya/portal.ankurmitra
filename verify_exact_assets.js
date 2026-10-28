const fs = require('fs');

console.log('Testing asset presence:');
console.log('product_logo.png exists:', fs.existsSync('assets/product_logo.png'));
console.log('farmer_jayesh_exact.png exists:', fs.existsSync('assets/farmer_jayesh_exact.png'));
console.log('mobile_logo_exact_full_74.png exists:', fs.existsSync('assets/mobile_logo_exact_full_74.png'));
console.log('mobile_farm_header_exact.png exists:', fs.existsSync('assets/mobile_farm_header_exact.png'));
console.log('mobile_drone_banner_exact.png exists:', fs.existsSync('assets/mobile_drone_banner_exact.png'));
