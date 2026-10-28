// generate_full_mobile_code.js
// Generates the replacement view-mobile-app HTML and JS controller

const fs = require('fs');
const path = require('path');
const vm = require('vm');

const SVG_ICONS = {
  aiMitra: `<svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="7" r="3" fill="#0EA5E9"/>
    <path d="M24 10V14" stroke="#0EA5E9" stroke-width="2.5" stroke-linecap="round"/>
    <rect x="9" y="14" width="30" height="24" rx="10" fill="#E0F2FE" stroke="#0284C7" stroke-width="2"/>
    <circle cx="18" cy="23" r="3.2" fill="#0284C7"/>
    <circle cx="30" cy="23" r="3.2" fill="#0284C7"/>
    <path d="M19 30C20.5 32 27.5 32 29 30" stroke="#0284C7" stroke-width="2.2" stroke-linecap="round"/>
    <rect x="18" y="38" width="12" height="4" rx="2" fill="#0284C7"/>
    <circle cx="7" cy="26" r="2" fill="#0284C7"/>
    <circle cx="41" cy="26" r="2" fill="#0284C7"/>
  </svg>`,

  cropDoctor: `<svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 36C12 26 22 16 34 14C34 26 26 36 12 36Z" fill="#22C55E"/>
    <path d="M22 28C22 20 28 14 36 12C36 20 30 28 22 28Z" fill="#15803D"/>
    <path d="M12 36C16 32 24 24 34 14" stroke="#166534" stroke-width="2" stroke-linecap="round"/>
    <circle cx="36" cy="34" r="7" fill="#EF4444"/>
    <path d="M36 30V38M32 34H40" stroke="white" stroke-width="2.2" stroke-linecap="round"/>
  </svg>`,

  mandi: `<svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="26" width="6.5" height="15" rx="2" fill="#22C55E"/>
    <rect x="20.5" y="19" width="6.5" height="22" rx="2" fill="#16A34A"/>
    <rect x="32" y="13" width="6.5" height="28" rx="2" fill="#15803D"/>
    <path d="M7 23L19 13L33 9L42 5" stroke="#15803D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M37 5H42V10" stroke="#15803D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="26" cy="10" r="5.5" fill="#F59E0B"/>
    <text x="26" y="13.5" font-size="8" font-weight="900" fill="white" text-anchor="middle" font-family="sans-serif">₹</text>
  </svg>`,

  weather: `<svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="19" cy="18" r="9" fill="#F59E0B"/>
    <path d="M19 5V8M19 28V31M6 18H9M29 18H32M10 9L12 11M26 25L28 27M10 27L12 25M26 11L28 9" stroke="#F59E0B" stroke-width="2" stroke-linecap="round"/>
    <path d="M21 35H36C39.3 35 42 32.3 42 29C42 25.8 39.5 23.2 36.4 23C35.7 18.5 31.8 15 27.1 15C22.5 15 18.6 18.4 17.9 22.8C14.6 23.2 12 25.8 12 29C12 32.3 14.7 35 18 35H21Z" fill="#38BDF8"/>
    <path d="M23 35H36C38.5 35 40.5 33 40.5 30.5C40.5 28.1 38.6 26.1 36.2 26C35.7 22.5 32.7 19.8 29.1 19.8C25.6 19.8 22.6 22.4 22 25.8C19.5 26.1 17.5 28.1 17.5 30.5C17.5 33 19.5 35 22 35H23Z" fill="#7DD3FC"/>
  </svg>`,

  cropGuide: `<svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 38C20 34 14 34 8 36V18C14 16 20 16 24 20C28 16 34 16 40 18V36C34 34 28 34 24 38Z" fill="#15803D" stroke="#166534" stroke-width="2"/>
    <path d="M24 20V38" stroke="#166534" stroke-width="2"/>
    <path d="M24 16C24 10 18 7 14 8C14 14 19 16 24 16Z" fill="#4ADE80"/>
    <path d="M24 16C24 10 30 7 34 8C34 14 29 16 24 16Z" fill="#86EFAC"/>
  </svg>`,

  farmerMart: `<svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="38" r="3.5" fill="#15803D"/>
    <circle cx="33" cy="38" r="3.5" fill="#15803D"/>
    <path d="M8 12H13L17 31H36L40 16H15" stroke="#15803D" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M26 23C26 17 21 14 17 15C17 20 22 23 26 23Z" fill="#22C55E"/>
    <path d="M26 23C26 17 31 14 35 15C35 20 30 23 26 23Z" fill="#4ADE80"/>
  </svg>`,

  toolRental: `<svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="16" cy="32" r="7.5" fill="none" stroke="#15803D" stroke-width="3"/>
    <circle cx="16" cy="32" r="3.5" fill="#15803D"/>
    <circle cx="36" cy="34" r="5" fill="none" stroke="#15803D" stroke-width="2.5"/>
    <circle cx="36" cy="34" r="2" fill="#15803D"/>
    <path d="M16 24H25V17H31L36 24V29H23L16 29" fill="#22C55E"/>
    <path d="M25 17H29L33 24H25V17Z" fill="#86EFAC"/>
    <path d="M33 12V17" stroke="#15803D" stroke-width="2" stroke-linecap="round"/>
    <path d="M34 12L31 11" stroke="#15803D" stroke-width="2" stroke-linecap="round"/>
  </svg>`,

  more: `<svg class="w-7 h-7 sm:w-8 sm:h-8" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="9" y="9" width="12" height="12" rx="3.5" fill="#15803D"/>
    <rect x="27" y="9" width="12" height="12" rx="3.5" fill="#15803D"/>
    <rect x="9" y="27" width="12" height="12" rx="3.5" fill="#15803D"/>
    <rect x="27" y="27" width="12" height="12" rx="3.5" fill="#15803D"/>
  </svg>`
};

console.log('SVG icons defined.');
