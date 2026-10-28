// test_suppliers_engine.js
const seedSuppliers = [
  {
    id: 'SUP-001',
    name: 'Jayesh Patel',
    role: 'Farmer',
    place: 'Sudavad',
    supply: 'Groundnut',
    linked: 'Kuldevi Kirana',
    status: 'Active',
    volume: '120 Qtl / season',
    fulfillment: '99.4%',
    grade: 'Grade-A Bold',
    mobile: '+91 98251 44210',
    terms: '7-day Mandi NEFT'
  },
  {
    id: 'SUP-002',
    name: 'Kishan Agro',
    role: 'Dealer',
    place: 'Bagasara',
    supply: 'Urea & DAP',
    linked: 'Kuldevi Kirana',
    status: 'Active',
    volume: '45 Bags weekly',
    fulfillment: '98.8%',
    grade: 'IFFCO Certified',
    mobile: '+91 94282 11980',
    terms: 'Fortnightly Clearing'
  },
  {
    id: 'SUP-003',
    name: 'Jayesh Patel',
    role: 'Farmer',
    place: 'Sudavad',
    supply: 'Cotton',
    linked: 'Patel Agro Industries',
    status: 'Active',
    volume: '80 Qtl Cotton',
    fulfillment: '100%',
    grade: 'Shankar-6 High Staple',
    mobile: '+91 98251 44210',
    terms: 'Instant Gate Settlement'
  },
  {
    id: 'SUP-004',
    name: 'Ramesh Patel',
    role: 'Farmer',
    place: 'Amreli',
    supply: 'Cotton',
    linked: 'Patel Agro Industries',
    status: 'Active',
    volume: '60 Qtl Cotton',
    fulfillment: '97.5%',
    grade: 'Gujarat-6 Clean',
    mobile: '+91 97243 88102',
    terms: 'Direct DBT Bank Transfer'
  },
  {
    id: 'SUP-005',
    name: 'IFFCO Cooperative Hub',
    role: 'Manufacturer',
    place: 'Rajkot',
    supply: 'Bulk fertilizer / DAP',
    linked: 'Patel Agro Industries',
    status: 'Active',
    volume: '200 MT Monthly',
    fulfillment: '99.8%',
    grade: 'National Standard',
    mobile: '+91 98790 22014',
    terms: 'Cooperative Credit Khata'
  },
  {
    id: 'SUP-006',
    name: 'Mahyco Seeds Network',
    role: 'Dealer',
    place: 'Amreli',
    supply: 'Certified Seeds',
    linked: 'Kuldevi Kirana',
    status: 'Active',
    volume: '80 Packets Batch',
    fulfillment: '99.1%',
    grade: 'Bt-Cotton & Sesame',
    mobile: '+91 99092 33451',
    terms: 'Consignment Billing'
  },
  {
    id: 'SUP-007',
    name: 'Kantibhai Savaliya',
    role: 'Farmer',
    place: 'Sudavad',
    supply: 'Cumin & Mustard',
    linked: 'Kuldevi Kirana',
    status: 'Active',
    volume: '35 Qtl Cumin',
    fulfillment: '98.2%',
    grade: 'Organic Unpolished',
    mobile: '+91 98791 22345',
    terms: 'Cash on Delivery'
  },
  {
    id: 'SUP-008',
    name: 'Saurashtra Ginning Corp',
    role: 'Manufacturer',
    place: 'Amreli',
    supply: 'Cotton Bales',
    linked: 'Patel Agro Industries',
    status: 'Pending',
    volume: '500 Bales',
    fulfillment: '94.0%',
    grade: 'Export Grade 29mm',
    mobile: '+91 98795 44100',
    terms: 'Escrow Milestone'
  }
];

console.log('Suppliers seed data count:', seedSuppliers.length);
console.log('Roles breakdown:');
const roles = {};
seedSuppliers.forEach(s => roles[s.role] = (roles[s.role] || 0) + 1);
console.log(roles);
