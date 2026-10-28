const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync('index.html', 'utf8');

const targetPages = {
  // Sales Module (User Request)
  'sell-requests.html': { viewId: 'sell-requests', parent: 'Sales', title: 'Sell requests' },
  'dealer-desk.html': { viewId: 'dealer-desk', parent: 'Sales', title: 'Dealer desk' },
  'dealer-orders.html': { viewId: 'dealer-orders', parent: 'Sales', title: 'Dealer orders' },
  'dealer-customers.html': { viewId: 'dealer-customers', parent: 'Sales', title: 'Dealer customers' },
  'offers-schemes.html': { viewId: 'offers-schemes', parent: 'Sales', title: 'Offers and schemes' },

  // Delivery Module
  'deliveries.html': { viewId: 'deliveries', parent: 'Delivery', title: 'Deliveries' },

  // Masters Module
  'master-hub.html': { viewId: 'master-hub', parent: 'Masters', title: 'Master Hub' },
  'crop-master.html': { viewId: 'crop-master', parent: 'Masters', title: 'Crop master' },
  'location-master.html': { viewId: 'location-master', parent: 'Masters', title: 'Location master' },
  'category-master.html': { viewId: 'category-master', parent: 'Masters', title: 'Category master' },
  'product-master.html': { viewId: 'product-master', parent: 'Masters', title: 'Product master' },
  'scheme-master.html': { viewId: 'scheme-master', parent: 'Masters', title: 'Scheme master' },
  'sell-channels.html': { viewId: 'sell-channels', parent: 'Masters', title: 'Sell channels' },
  'language-master.html': { viewId: 'language-master', parent: 'Masters', title: 'Language master' },
  'unit-master.html': { viewId: 'unit-master', parent: 'Masters', title: 'Unit master' },

  // Field Module
  'field-tools.html': { viewId: 'field-tools', parent: 'Field', title: 'Field tools' },
  'ai-mitra.html': { viewId: 'ai-mitra', parent: 'Field', title: 'AI Mitra' },
  'crop-doctor.html': { viewId: 'crop-doctor', parent: 'Field', title: 'Crop doctor' },
  'soil-doctor.html': { viewId: 'soil-doctor', parent: 'Field', title: 'Soil doctor' },
  'crop-guide.html': { viewId: 'crop-guide', parent: 'Field', title: 'Crop guide' },
  'seed-guide.html': { viewId: 'seed-guide', parent: 'Field', title: 'Seed guide' },
  'compost.html': { viewId: 'compost', parent: 'Field', title: 'Compost and organic' },
  'farm-manager.html': { viewId: 'farm-manager', parent: 'Field', title: 'Farm manager' },
  'weather.html': { viewId: 'weather', parent: 'Field', title: 'Weather' },
  'scheme-applications.html': { viewId: 'scheme-applications', parent: 'Field', title: 'Scheme applications' },
  'saved-items.html': { viewId: 'saved-items', parent: 'Field', title: 'Saved items' },

  // Orders Module
  'all-orders.html': { viewId: 'all-orders', parent: 'Orders', title: 'All orders' },
  'orders.html': { viewId: 'all-orders', parent: 'Orders', title: 'All orders' },
  'live-orders.html': { viewId: 'live-orders', parent: 'Orders', title: 'Live orders' },
  'godown-incoming.html': { viewId: 'godown-incoming', parent: 'Orders', title: 'Godown and incoming' },
  'godown.html': { viewId: 'godown-incoming', parent: 'Orders', title: 'Godown and incoming' },

  // Insights Module
  'active-time.html': { viewId: 'active-time', parent: 'Insights', title: 'Active time' },
  'sell-vs-buy.html': { viewId: 'sell-vs-buy', parent: 'Insights', title: 'Sell vs buy' },
  'growth-funnel.html': { viewId: 'growth-funnel', parent: 'Insights', title: 'Growth funnel' },
  'marketing-studio.html': { viewId: 'marketing-studio', parent: 'Insights', title: 'Marketing studio' },
  'coverage-gaps.html': { viewId: 'coverage-gaps', parent: 'Insights', title: 'Coverage gaps' },
  'crop-intelligence.html': { viewId: 'crop-intelligence', parent: 'Insights', title: 'Crop intelligence' },
  'channel-mix.html': { viewId: 'channel-mix', parent: 'Insights', title: 'Channel mix' },

  // Users Module
  'users.html': { viewId: 'user-list', parent: 'Users', title: 'Users' },
  'user-list.html': { viewId: 'user-list', parent: 'Users', title: 'Users' },
  'new-user.html': { viewId: 'new-user', parent: 'Users', title: 'New user' },
  'farmer-network.html': { viewId: 'farmer-network', parent: 'Users', title: 'Farmer network' },
  'suppliers.html': { viewId: 'suppliers', parent: 'Users', title: 'Suppliers' },
};

const domLoadedNeedle = `    // Initialize on window load
    window.addEventListener('DOMContentLoaded', () => {
      renderNavigationTree(currentRole);
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
      initCharts();
    });`;

if (!indexHtml.includes(domLoadedNeedle)) {
  console.error('ERROR: Could not find exact domLoadedNeedle in index.html!');
  process.exit(1);
}

let count = 0;
for (const [filename, cfg] of Object.entries(targetPages)) {
  const replacementDomLoaded = `    // Initialize on window load
    window.addEventListener('DOMContentLoaded', () => {
      renderNavigationTree(currentRole);
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
      initCharts();
      navigateTo('${cfg.viewId}', '${cfg.parent}', '${cfg.title}');
    });`;

  let pageContent = indexHtml.replace(domLoadedNeedle, replacementDomLoaded);

  // Also customize the <title> tag for the specific page
  const titleNeedle = '<title>Ankurmitra Web Portal — Smart companion for growth</title>';
  const customTitle = `<title>${cfg.title} — Ankurmitra Web Portal</title>`;
  pageContent = pageContent.replace(titleNeedle, customTitle);

  fs.writeFileSync(filename, pageContent, 'utf8');
  count++;
}

console.log(`Successfully synchronized all ${count} standalone pages including all 5 Sales pages!`);
