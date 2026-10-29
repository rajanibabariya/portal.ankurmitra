// sync_module_directories.js
// Synchronizes all module-wise pages into their dedicated module directories
// and cleans up root directory so only index.html resides at root.

const fs = require('fs');
const path = require('path');

const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

const modulesConfig = {
  wallet: {
    folder: 'wallet',
    pages: {
      'wallet-payouts.html': { viewId: 'wallet-payouts', parent: 'Wallet', title: 'Wallet and payouts' },
      'pending-payments.html': { viewId: 'pending-payments', parent: 'Wallet', title: 'Pending payments' },
      'payout-run.html': { viewId: 'payout-run', parent: 'Wallet', title: 'Payout run' },
      'wallet-ledger.html': { viewId: 'wallet-ledger', parent: 'Wallet', title: 'Ledger' },
      'index.html': { viewId: 'wallet-payouts', parent: 'Wallet', title: 'Wallet and payouts' }
    }
  },
  content: {
    folder: 'content',
    pages: {
      'ads.html': { viewId: 'ads', parent: 'Content', title: 'Ads' },
      'ad-editor.html': { viewId: 'ad-editor', parent: 'Content', title: 'Ad editor' },
      'smart-alerts.html': { viewId: 'smart-alerts', parent: 'Content', title: 'Smart alerts' },
      'alert-composer.html': { viewId: 'alert-composer', parent: 'Content', title: 'Alert composer' },
      'farmer-community.html': { viewId: 'farmer-community', parent: 'Content', title: 'Farmer community' },
      'knowledge-hub.html': { viewId: 'knowledge-hub', parent: 'Content', title: 'Knowledge hub' },
      'tool-rental.html': { viewId: 'tool-rental', parent: 'Content', title: 'Tool rental' },
      'nearby-services.html': { viewId: 'nearby-services', parent: 'Content', title: 'Nearby services' },
      'mandi-prices.html': { viewId: 'mandi-prices', parent: 'Content', title: 'Mandi prices' },
      'index.html': { viewId: 'ads', parent: 'Content', title: 'Ads' }
    }
  },
  support: {
    folder: 'support',
    pages: {
      'help-support.html': { viewId: 'help-support', parent: 'Support', title: 'Help and support' },
      'support-tickets.html': { viewId: 'support-tickets', parent: 'Support', title: 'Tickets' },
      'support-knowledge.html': { viewId: 'support-knowledge', parent: 'Support', title: 'Support knowledge' },
      'index.html': { viewId: 'help-support', parent: 'Support', title: 'Help and support' }
    }
  },
  reports: {
    folder: 'reports',
    pages: {
      'reports.html': { viewId: 'reports-hub', parent: 'Reports', title: 'Reports' },
      'sales-report.html': { viewId: 'sales-report', parent: 'Reports', title: 'Sales report' },
      'order-report.html': { viewId: 'order-report', parent: 'Reports', title: 'Order report' },
      'master-report.html': { viewId: 'master-report', parent: 'Reports', title: 'Master report' },
      'wallet-report.html': { viewId: 'wallet-report', parent: 'Reports', title: 'Wallet report' },
      'performance-reports.html': { viewId: 'performance-reports', parent: 'Reports', title: 'Performance reports' },
      'dealer-sales-report.html': { viewId: 'dealer-sales-report', parent: 'Reports', title: 'Dealer sales report' },
      'crop-report.html': { viewId: 'crop-report', parent: 'Reports', title: 'Crop report' },
      'location-report.html': { viewId: 'location-report', parent: 'Reports', title: 'Location report' },
      'user-report.html': { viewId: 'user-report', parent: 'Reports', title: 'User report' },
      'report-builder.html': { viewId: 'report-builder', parent: 'Reports', title: 'Report builder' },
      'audit-logs.html': { viewId: 'audit-logs', parent: 'Reports', title: 'Audit logs' },
      'index.html': { viewId: 'reports-hub', parent: 'Reports', title: 'Reports' }
    }
  },
  settings: {
    folder: 'settings',
    pages: {
      'portal-settings.html': { viewId: 'portal-settings', parent: 'Settings', title: 'Portal settings' },
      'app-config.html': { viewId: 'app-config', parent: 'Settings', title: 'App config' },
      'app-features.html': { viewId: 'app-features', parent: 'Settings', title: 'Feature flags' },
      'mobile-app.html': { viewId: 'mobile-app', parent: 'Settings', title: 'Mobile app' },
      'system-health.html': { viewId: 'system-health', parent: 'Settings', title: 'System health' },
      'health-incidents.html': { viewId: 'health-incidents', parent: 'Settings', title: 'Incidents' },
      'notification-settings.html': { viewId: 'notification-settings', parent: 'Settings', title: 'Notification settings' },
      'notify-templates.html': { viewId: 'notify-templates', parent: 'Settings', title: 'Notify templates' },
      'settings.html': { viewId: 'portal-settings', parent: 'Settings', title: 'Portal settings' },
      'audit-logs.html': { viewId: 'audit-logs', parent: 'Reports', title: 'Audit logs' },
      'index.html': { viewId: 'portal-settings', parent: 'Settings', title: 'Portal settings' }
    }
  },
  masters: {
    folder: 'masters',
    pages: {
      'master-hub.html': { viewId: 'master-hub', parent: 'Masters', title: 'Master Hub' },
      'crop-master.html': { viewId: 'crop-master', parent: 'Masters', title: 'Crop master' },
      'location-master.html': { viewId: 'location-master', parent: 'Masters', title: 'Location master' },
      'category-master.html': { viewId: 'category-master', parent: 'Masters', title: 'Category master' },
      'product-master.html': { viewId: 'product-master', parent: 'Masters', title: 'Product master' },
      'scheme-master.html': { viewId: 'scheme-master', parent: 'Masters', title: 'Scheme master' },
      'sell-channels.html': { viewId: 'sell-channels', parent: 'Masters', title: 'Sell channels' },
      'language-master.html': { viewId: 'language-master', parent: 'Masters', title: 'Language master' },
      'unit-master.html': { viewId: 'unit-master', parent: 'Masters', title: 'Unit master' },
      'index.html': { viewId: 'master-hub', parent: 'Masters', title: 'Master Hub' }
    }
  },
  sales: {
    folder: 'sales',
    pages: {
      'sell-requests.html': { viewId: 'sell-requests', parent: 'Sales', title: 'Sell requests' },
      'sell-bid-review.html': { viewId: 'sell-bid-review', parent: 'Sales', title: 'Bid review' },
      'dealer-desk.html': { viewId: 'dealer-desk', parent: 'Sales', title: 'Dealer desk' },
      'dealer-ledger.html': { viewId: 'dealer-ledger', parent: 'Sales', title: 'Customer ledger' },
      'offer-editor.html': { viewId: 'offer-editor', parent: 'Sales', title: 'Offer editor' },
      'dealer-orders.html': { viewId: 'dealer-orders', parent: 'Sales', title: 'Dealer orders' },
      'dealer-customers.html': { viewId: 'dealer-customers', parent: 'Sales', title: 'Dealer customers' },
      'offers-schemes.html': { viewId: 'offers-schemes', parent: 'Sales', title: 'Offers and schemes' },
      'dealer-stock.html': { viewId: 'dealer-stock', parent: 'Sales', title: 'Dealer stock' },
      'service-area.html': { viewId: 'service-area', parent: 'Sales', title: 'Service area' },
      'f2r-procurement.html': { viewId: 'f2r-procurement', parent: 'Sales', title: 'F2R procurement' },
      'f2i-demands.html': { viewId: 'f2i-demands', parent: 'Sales', title: 'F2I demands' },
      'farmer-offers.html': { viewId: 'farmer-offers', parent: 'Sales', title: 'Farmer offers' },
      'gate-intake.html': { viewId: 'gate-intake', parent: 'Delivery', title: 'Gate intake' },
      'industrial-stock.html': { viewId: 'industrial-stock', parent: 'Orders', title: 'Industrial stock' },
      'retailer-dashboard.html': { viewId: 'retailer-dashboard', parent: 'Dashboard', title: 'Retailer dashboard' },
      'index.html': { viewId: 'sell-requests', parent: 'Sales', title: 'Sell requests' }
    }
  },
  delivery: {
    folder: 'delivery',
    pages: {
      'deliveries.html': { viewId: 'deliveries', parent: 'Delivery', title: 'Deliveries' },
      'delivery-routes.html': { viewId: 'delivery-routes', parent: 'Delivery', title: 'Route planner' },
      'delivery-fleet.html': { viewId: 'delivery-fleet', parent: 'Delivery', title: 'Fleet board' },
      'delivery-exceptions.html': { viewId: 'delivery-exceptions', parent: 'Delivery', title: 'Exceptions' },
      'index.html': { viewId: 'deliveries', parent: 'Delivery', title: 'Deliveries' }
    }
  },
  orders: {
    folder: 'orders',
    pages: {
      'all-orders.html': { viewId: 'all-orders', parent: 'Orders', title: 'All orders' },
      'orders.html': { viewId: 'all-orders', parent: 'Orders', title: 'All orders' },
      'order-track.html': { viewId: 'order-track', parent: 'Orders', title: 'Track order' },
      'live-orders.html': { viewId: 'live-orders', parent: 'Orders', title: 'Live orders' },
      'dispatch-van.html': { viewId: 'dispatch-van', parent: 'Orders', title: 'Dispatch van' },
      'call-desk.html': { viewId: 'call-desk', parent: 'Orders', title: 'Call desk' },
      'godown-incoming.html': { viewId: 'godown-incoming', parent: 'Orders', title: 'Godown and incoming' },
      'godown.html': { viewId: 'godown-incoming', parent: 'Orders', title: 'Godown and incoming' },
      'godown-bays.html': { viewId: 'godown-bays', parent: 'Orders', title: 'Godown bays' },
      'incoming-lots.html': { viewId: 'incoming-lots', parent: 'Orders', title: 'Incoming lots' },
      'index.html': { viewId: 'all-orders', parent: 'Orders', title: 'All orders' }
    }
  },
  field: {
    folder: 'field',
    pages: {
      'field-tools.html': { viewId: 'field-tools', parent: 'Field', title: 'Field tools' },
      'ai-mitra.html': { viewId: 'ai-mitra', parent: 'Field', title: 'AI Mitra' },
      'crop-doctor.html': { viewId: 'crop-doctor', parent: 'Field', title: 'Crop doctor' },
      'soil-doctor.html': { viewId: 'soil-doctor', parent: 'Field', title: 'Soil doctor' },
      'crop-guide.html': { viewId: 'crop-guide', parent: 'Field', title: 'Crop guide' },
      'seed-guide.html': { viewId: 'seed-guide', parent: 'Field', title: 'Seed guide' },
      'compost.html': { viewId: 'compost', parent: 'Field', title: 'Compost and organic' },
      'farm-manager.html': { viewId: 'farm-manager', parent: 'Field', title: 'Farm manager' },
      'scheme-applications.html': { viewId: 'scheme-applications', parent: 'Field', title: 'Scheme applications' },
      'crop-diagnostics.html': { viewId: 'crop-diagnostics', parent: 'Field', title: 'Crop diagnostics' },
      'soil-request.html': { viewId: 'soil-request', parent: 'Field', title: 'Soil request' },
      'saved-items.html': { viewId: 'saved-items', parent: 'Field', title: 'Saved items' },
      'weather.html': { viewId: 'weather-dashboard', parent: 'Dashboard', title: 'Weather' },
      'index.html': { viewId: 'field-tools', parent: 'Field', title: 'Field tools' }
    }
  },
  users: {
    folder: 'users',
    pages: {
      'user-list.html': { viewId: 'user-list', parent: 'Users', title: 'Users' },
      'users.html': { viewId: 'user-list', parent: 'Users', title: 'Users' },
      'new-user.html': { viewId: 'new-user', parent: 'Users', title: 'New user' },
      'user-detail.html': { viewId: 'user-detail', parent: 'Users', title: 'User detail' },
      'role-matrix.html': { viewId: 'role-matrix', parent: 'Users', title: 'Role matrix' },
      'farmer-network.html': { viewId: 'farmer-network', parent: 'Users', title: 'Farmer network' },
      'suppliers.html': { viewId: 'suppliers', parent: 'Users', title: 'Suppliers' },
      'index.html': { viewId: 'user-list', parent: 'Users', title: 'Users' }
    }
  },
  insights: {
    folder: 'insights',
    pages: {
      'live-pulse.html': { viewId: 'live-pulse', parent: 'Dashboard', title: 'Live pulse' },
      'active-time.html': { viewId: 'active-time', parent: 'Insights', title: 'Active time' },
      'create-campaign.html': { viewId: 'create-campaign', parent: 'Insights', title: 'Create campaign' },
      'campaign-performance.html': { viewId: 'campaign-performance', parent: 'Insights', title: 'Campaign performance' },
      'sell-vs-buy.html': { viewId: 'sell-vs-buy', parent: 'Insights', title: 'Sell vs buy' },
      'growth-funnel.html': { viewId: 'growth-funnel', parent: 'Insights', title: 'Growth funnel' },
      'marketing-studio.html': { viewId: 'marketing-studio', parent: 'Insights', title: 'Marketing studio' },
      'coverage-gaps.html': { viewId: 'coverage-gaps', parent: 'Insights', title: 'Coverage gaps' },
      'crop-intelligence.html': { viewId: 'crop-intelligence', parent: 'Insights', title: 'Crop intelligence' },
      'channel-mix.html': { viewId: 'channel-mix', parent: 'Insights', title: 'Channel mix' },
      'network-map.html': { viewId: 'network-map', parent: 'Dashboard', title: 'Network map' },
      'index.html': { viewId: 'active-time', parent: 'Insights', title: 'Active time' }
    }
  },
  dashboard: {
    folder: 'dashboard',
    pages: {
      'dashboard.html': { viewId: 'dashboard', parent: 'Dashboard', title: 'Master dashboard' },
      'welcome.html': { viewId: 'welcome', parent: 'Dashboard', title: 'Welcome' },
      'weather-dashboard.html': { viewId: 'weather-dashboard', parent: 'Dashboard', title: 'Weather dashboard' },
      'network-map.html': { viewId: 'network-map', parent: 'Dashboard', title: 'Network map' },
      'network-dashboard.html': { viewId: 'network-dashboard', parent: 'Dashboard', title: 'Network dashboard' },
      'index.html': { viewId: 'welcome', parent: 'Dashboard', title: 'Welcome' }
    }
  }
};

const domLoadedNeedle = `// Initialize on window load
    window.addEventListener('DOMContentLoaded', () => {
      checkPersistedSession();
      if (typeof initAllPortalGrids === 'function') {
        initAllPortalGrids();
      }
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
      initCharts();
      if (typeof initResponsivePortal === 'function') initResponsivePortal();
      if (typeof enhanceOperationalToastButtons === 'function') enhanceOperationalToastButtons();
      if (typeof bindPortalEscape === 'function') bindPortalEscape();
      if (typeof renderSavedItems === 'function') renderSavedItems();
      document.querySelectorAll('input[placeholder]').forEach((input) => {
        if (!input.getAttribute('aria-label') && !document.querySelector('label[for="' + input.id + '"]')) {
          input.setAttribute('aria-label', input.getAttribute('placeholder') || 'Input');
        }
      });
      document.querySelectorAll('[id^="loginOtp"]').forEach((input, idx, list) => {
        input.addEventListener('input', () => {
          if (input.value && list[idx + 1]) list[idx + 1].focus();
        });
      });
    });`;

// Clean obsolete access directory if present
const accessDir = path.join(__dirname, 'access');
if (fs.existsSync(accessDir)) {
  fs.rmSync(accessDir, { recursive: true, force: true });
  console.log('Removed obsolete access/ directory.');
}

let modulePageCount = 0;

// 1. Generate into module directories
for (const [modKey, mod] of Object.entries(modulesConfig)) {
  const dirPath = path.join(__dirname, mod.folder);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }

  for (const [filename, cfg] of Object.entries(mod.pages)) {
    const replacementDomLoaded = `    // Initialize on window load
    window.addEventListener('DOMContentLoaded', () => {
      checkPersistedSession();
      if (typeof initAllPortalGrids === 'function') {
        initAllPortalGrids();
      }
      renderNavigationTree(currentRole);
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
      initCharts();
      if (typeof initReportCharts === 'function') {
        initReportCharts();
      }
      if (typeof initResponsivePortal === 'function') initResponsivePortal();
      if (typeof enhanceOperationalToastButtons === 'function') enhanceOperationalToastButtons();
      if (typeof bindPortalEscape === 'function') bindPortalEscape();
      if (typeof renderSavedItems === 'function') renderSavedItems();
      document.querySelectorAll('input[placeholder]').forEach((input) => {
        if (!input.getAttribute('aria-label') && !document.querySelector('label[for="' + input.id + '"]')) {
          input.setAttribute('aria-label', input.getAttribute('placeholder') || 'Input');
        }
      });
      document.querySelectorAll('[id^="loginOtp"]').forEach((input, idx, list) => {
        input.addEventListener('input', () => {
          if (input.value && list[idx + 1]) list[idx + 1].focus();
        });
      });
      navigateTo('${cfg.viewId}', '${cfg.parent}', '${cfg.title}');
    });`;

    let subPageContent = indexHtml.replace(domLoadedNeedle, replacementDomLoaded);
    if (cfg.viewId !== 'dashboard') {
      subPageContent = subPageContent.replace(
        'id="view-dashboard" class="space-y-6 view-section"',
        'id="view-dashboard" class="hidden space-y-6 view-section"'
      );
      subPageContent = subPageContent.replace(
        'id="view-' + cfg.viewId + '" class="hidden ',
        'id="view-' + cfg.viewId + '" class="'
      );
    }

    // Title tag
    subPageContent = subPageContent.replace(
      '<title>Ankurmitra Web Portal — Smart companion for growth</title>',
      `<title>${cfg.title} — Ankurmitra Web Portal</title>`
    );

    // Rewrite relative asset paths for subdirectory
    subPageContent = subPageContent.replace(/src="assets\//g, 'src="../assets/');
    subPageContent = subPageContent.replace(/href="assets\//g, 'href="../assets/');
    subPageContent = subPageContent.replace(/url\('assets\//g, "url('../assets/");
    subPageContent = subPageContent.replace(/src="portal-shell.js"/g, 'src="../portal-shell.js"');
    subPageContent = subPageContent.replace(/src="portal-upgrade.js"/g, 'src="../portal-upgrade.js"');
    subPageContent = subPageContent.replace(/'assets\/farmer_jayesh_exact.png'/g, "'../assets/farmer_jayesh_exact.png'");
    subPageContent = subPageContent.replace(/'assets\/ankurmitra_emblem.png'/g, "'../assets/ankurmitra_emblem.png'");
    subPageContent = subPageContent.replace(/'assets\/product_logo.png'/g, "'../assets/product_logo.png'");
    subPageContent = subPageContent.replace(/'assets\/mobile_farm_header_exact.png'/g, "'../assets/mobile_farm_header_exact.png'");
    subPageContent = subPageContent.replace(/'assets\/mobile_drone_banner_exact.png'/g, "'../assets/mobile_drone_banner_exact.png'");
    subPageContent = subPageContent.replace(/'assets\/mobile_peanut_exact.png'/g, "'../assets/mobile_peanut_exact.png'");

    const subFilePath = path.join(dirPath, filename);
    fs.writeFileSync(subFilePath, subPageContent, 'utf8');
    modulePageCount++;
  }
}

// 2. Clean up loose HTML files in root (except index.html)
const rootHtmlFiles = fs.readdirSync(__dirname).filter(f => f.endsWith('.html') && f !== 'index.html');
let cleanedRootCount = 0;
rootHtmlFiles.forEach(f => {
  try {
    fs.unlinkSync(path.join(__dirname, f));
    cleanedRootCount++;
  } catch (err) {
    console.warn(`Could not delete root file ${f}:`, err.message);
  }
});

console.log(`Generated ${modulePageCount} files across module folders!`);
console.log(`Cleaned ${cleanedRootCount} loose HTML files from root directory.`);
console.log(`Root now cleanly contains: index.html`);
