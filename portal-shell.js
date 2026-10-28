if (typeof window !== 'undefined') {
  window.isSidebarCollapsed = false;
}
/**
 * AnkurMitra Enterprise Web Portal — Shell Controller
 * Manages: role switching, nav tree, page routing, charts, tables
 */

const AM = {
  // ─── App State ───────────────────────────────────────────────────────────
  state: {
    role: 'superadmin',
    currentPage: 'login',
    period: 'today',
    sidebarOpen: true,
    expandedParents: {},
  },

  // ─── Role Configurations ─────────────────────────────────────────────────
  roles: {
    superadmin: {
      label: 'Super admin · Full access',
      pillClass: 'bg-emerald-600 text-white',
      user: 'Rudram Admin',
      unit: 'Amreli',
      afterLogin: 'welcome',
      nav: 'admin',
    },
    operate: {
      label: 'Operate',
      pillClass: 'bg-emerald-500 text-white',
      user: 'Kiran Joshi',
      unit: 'Amreli',
      afterLogin: 'live-orders',
      nav: 'operate',
    },
    maintenance: {
      label: 'Maintenance',
      pillClass: 'bg-emerald-500 text-white',
      user: 'Amit Desai',
      unit: 'Amreli',
      afterLogin: 'system-health',
      nav: 'maintenance',
    },
    analysis: {
      label: 'Analysis',
      pillClass: 'bg-emerald-500 text-white',
      user: 'Neha Shah',
      unit: 'Amreli',
      afterLogin: 'network-map',
      nav: 'analysis',
    },
    retailer: {
      label: 'Retailer · Mina Kirana',
      pillClass: 'bg-teal-600 text-white',
      user: 'Mina Ben Patel',
      unit: 'Mina Kirana & Provision (Amreli)',
      afterLogin: 'retailer-dashboard',
      nav: 'retailer',
    },
    dealer: {
      label: 'Dealer · Limited access',
      pillClass: 'bg-amber-500 text-white',
      user: 'Rameshbhai Patel',
      unit: 'Kishan Agro',
      afterLogin: 'shop-dashboard',
      nav: 'dealer',
    },
    industrial: {
      label: 'Industrial · Limited access',
      pillClass: 'bg-amber-500 text-white',
      user: 'Hiteshbhai Patel',
      unit: 'Patel Agro Industries',
      afterLogin: 'unit-dashboard',
      nav: 'industrial',
    },
  },

  // ─── Nav Trees ───────────────────────────────────────────────────────────
  navTrees: {
    superadmin: null, // will alias to admin below
    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: 'layout-grid', children: [
        { id: 'welcome', label: 'Welcome', icon: 'sparkles' },
        { id: 'dashboard', label: 'Master dashboard', icon: 'layout-grid' },
        { id: 'weather-dashboard', label: 'Weather dashboard', icon: 'cloud-sun' },
        { id: 'network-map', label: 'Network map', icon: 'map-pin' },
        { id: 'network-dashboard', label: 'Network dashboard', icon: 'globe' },
        { id: 'live-pulse', label: 'Live pulse', icon: 'radio' },
      ]},
      { id: 'insights', label: 'Insights', icon: 'zap', children: [
        { id: 'active-time', label: 'Active time', icon: 'clock' },
        { id: 'create-campaign', label: 'Create campaign', icon: 'plus-circle' },
        { id: 'campaign-performance', label: 'Campaign performance', icon: 'trending-up' },
        { id: 'sell-vs-buy', label: 'Sell vs buy', icon: 'arrow-left-right' },
        { id: 'growth-funnel', label: 'Growth funnel', icon: 'filter' },
        { id: 'marketing-studio', label: 'Marketing studio', icon: 'megaphone' },
        { id: 'coverage-gaps', label: 'Coverage gaps', icon: 'alert-triangle' },
        { id: 'crop-intelligence', label: 'Crop intelligence', icon: 'wheat' },
        { id: 'channel-mix', label: 'Channel mix', icon: 'share-2' },
      ]},
      { id: 'users', label: 'Users', icon: 'users', children: [
        { id: 'user-list', label: 'User list', icon: 'list' },
        { id: 'new-user', label: 'New user', icon: 'user-plus' },
        { id: 'farmer-network', label: 'Farmer network', icon: 'network' },
        { id: 'suppliers', label: 'Suppliers', icon: 'link' },
        { id: 'role-matrix', label: 'Role matrix', icon: 'table' },
      ]},
      { id: 'masters', label: 'Masters', icon: 'layers', children: [
        { id: 'master-hub', label: 'Master hub', icon: 'grid-2x2' },
        { id: 'crop-master', label: 'Crop master', icon: 'leaf' },
        { id: 'location-master', label: 'Location master', icon: 'map-pin' },
        { id: 'category-master', label: 'Category master', icon: 'tag' },
        { id: 'product-master', label: 'Product master', icon: 'package' },
        { id: 'scheme-master', label: 'Scheme master', icon: 'stamp' },
        { id: 'sell-channels', label: 'Sell channels', icon: 'git-branch' },
        { id: 'language-master', label: 'Language master', icon: 'globe' },
        { id: 'unit-master', label: 'Unit master', icon: 'ruler' },
      ]},
      { id: 'field', label: 'Field', icon: 'sprout', children: [
        { id: 'field-tools', label: 'Field tools', icon: 'wrench' },
        { id: 'ai-mitra', label: 'AI Mitra', icon: 'message-circle' },
        { id: 'crop-doctor', label: 'Crop doctor', icon: 'leaf' },
        { id: 'crop-diagnostics', label: 'Crop diagnostics', icon: 'activity' },
        { id: 'soil-doctor', label: 'Soil doctor', icon: 'droplets' },
        { id: 'soil-request', label: 'Soil request', icon: 'beaker' },
        { id: 'crop-guide', label: 'Crop guide', icon: 'book-open' },
        { id: 'seed-guide', label: 'Seed guide', icon: 'circle-dot' },
        { id: 'compost', label: 'Compost and organic', icon: 'recycle' },
        { id: 'farm-manager', label: 'Farm manager', icon: 'tractor' },
        { id: 'scheme-applications', label: 'Scheme applications', icon: 'stamp' },
      ]},
      { id: 'orders', label: 'Orders', icon: 'shopping-bag', children: [
        { id: 'all-orders', label: 'All orders', icon: 'list' },
        { id: 'order-track', label: 'Track order', icon: 'map' },
        { id: 'live-orders', label: 'Live orders', icon: 'zap' },
        { id: 'dispatch-van', label: 'Dispatch van', icon: 'truck' },
        { id: 'call-desk', label: 'Call desk', icon: 'phone-call' },
        { id: 'godown-incoming', label: 'Godown and incoming', icon: 'warehouse' },
        { id: 'godown-bays', label: 'Godown bays', icon: 'boxes' },
        { id: 'incoming-lots', label: 'Incoming lots', icon: 'package-plus' },
      ]},
      { id: 'delivery', label: 'Delivery', icon: 'truck', children: [
        { id: 'deliveries', label: 'Deliveries', icon: 'route' },
        { id: 'delivery-routes', label: 'Route planner', icon: 'map' },
        { id: 'delivery-fleet', label: 'Fleet board', icon: 'bus' },
        { id: 'delivery-exceptions', label: 'Exceptions', icon: 'alert-triangle' },
      ]},
      { id: 'sales', label: 'Sales', icon: 'trending-up', children: [
        { id: 'sell-requests', label: 'Sell requests', icon: 'tag' },
        { id: 'sell-bid-review', label: 'Bid review', icon: 'scale' },
        { id: 'dealer-desk', label: 'Dealer desk', icon: 'store' },
        { id: 'dealer-orders', label: 'Dealer orders', icon: 'shopping-cart' },
        { id: 'dealer-customers', label: 'Dealer customers', icon: 'users' },
        { id: 'dealer-ledger', label: 'Customer ledger', icon: 'book' },
        { id: 'offers-schemes', label: 'Offers and schemes', icon: 'percent' },
        { id: 'offer-editor', label: 'Offer editor', icon: 'pencil' },
      ]},
      { id: 'wallet', label: 'Wallet', icon: 'wallet', children: [
        { id: 'wallet-payouts', label: 'Wallet and payouts', icon: 'indian-rupee' },
        { id: 'payout-run', label: 'Payout run', icon: 'banknote' },
        { id: 'wallet-ledger', label: 'Ledger', icon: 'scroll-text' },
        { id: 'pending-payments', label: 'Pending payments', icon: 'clock' },
      ]},
      { id: 'content', label: 'Content', icon: 'megaphone', children: [
        { id: 'ads', label: 'Ads', icon: 'image' },
        { id: 'ad-editor', label: 'Ad editor', icon: 'pencil' },
        { id: 'smart-alerts', label: 'Smart alerts', icon: 'bell' },
        { id: 'alert-composer', label: 'Alert composer', icon: 'send' },
        { id: 'farmer-community', label: 'Farmer community', icon: 'message-square' },
        { id: 'knowledge-hub', label: 'Knowledge hub', icon: 'book' },
        { id: 'tool-rental', label: 'Tool rental', icon: 'plane' },
        { id: 'nearby-services', label: 'Nearby services', icon: 'map-pin' },
        { id: 'mandi-prices', label: 'Mandi prices', icon: 'bar-chart-3' },
      ]},
      { id: 'support', label: 'Support', icon: 'headphones', children: [
        { id: 'help-support', label: 'Help and support', icon: 'headphones' },
        { id: 'support-tickets', label: 'Tickets', icon: 'ticket' },
        { id: 'support-knowledge', label: 'Support knowledge', icon: 'life-buoy' },
      ]},
      { id: 'reports', label: 'Reports', icon: 'bar-chart', children: [
        { id: 'reports', label: 'Reports', icon: 'file-bar-chart' },
        { id: 'report-builder', label: 'Report builder', icon: 'wand' },
        { id: 'sales-report', label: 'Sales report', icon: 'trending-up' },
        { id: 'order-report', label: 'Order report', icon: 'shopping-bag' },
        { id: 'master-report', label: 'Master report', icon: 'layers' },
        { id: 'user-report', label: 'User report', icon: 'users' },
        { id: 'location-report', label: 'Location report', icon: 'map-pin' },
        { id: 'crop-report', label: 'Crop report', icon: 'leaf' },
        { id: 'wallet-report', label: 'Wallet report', icon: 'wallet' },
        { id: 'performance-reports', label: 'Performance reports', icon: 'activity' },
        { id: 'dealer-sales-report', label: 'Dealer sales report', icon: 'store' },
        { id: 'audit-logs', label: 'Audit logs', icon: 'shield-check' },
      ]},
      { id: 'settings', label: 'Settings', icon: 'settings', children: [
        { id: 'portal-settings', label: 'Portal settings', icon: 'user-cog' },
        { id: 'app-config', label: 'App config', icon: 'toggle-right' },
        { id: 'app-features', label: 'Feature flags', icon: 'flag' },
        { id: 'mobile-app', label: 'Mobile app', icon: 'smartphone' },
        { id: 'system-health', label: 'System health', icon: 'activity' },
        { id: 'health-incidents', label: 'Incidents', icon: 'alert-triangle' },
        { id: 'notification-settings', label: 'Notification settings', icon: 'bell-ring' },
        { id: 'notify-templates', label: 'Notify templates', icon: 'mail' },
      ]},
    ],

    operate: [
      { id: 'dashboard', label: 'Dashboard', icon: 'layout-grid', children: [
        { id: 'welcome', label: 'Welcome', icon: 'sparkles' },
        { id: 'dashboard', label: 'Master dashboard', icon: 'layout-grid' },
        { id: 'weather-dashboard', label: 'Weather dashboard', icon: 'cloud-sun' },
        { id: 'network-map', label: 'Network map', icon: 'map-pin' },
        { id: 'network-dashboard', label: 'Network dashboard', icon: 'globe' },
      ]},
      { id: 'orders', label: 'Orders', icon: 'shopping-bag', children: [
        { id: 'all-orders', label: 'All orders', icon: 'list' },
        { id: 'order-track', label: 'Track order', icon: 'map' },
        { id: 'live-orders', label: 'Live orders', icon: 'zap' },
        { id: 'dispatch-van', label: 'Dispatch van', icon: 'truck' },
        { id: 'call-desk', label: 'Call desk', icon: 'phone-call' },
      ]},
      { id: 'delivery', label: 'Delivery', icon: 'truck', children: [
        { id: 'deliveries', label: 'Deliveries', icon: 'route' },
      ]},
      { id: 'sales', label: 'Sales', icon: 'trending-up', children: [
        { id: 'sell-requests', label: 'Sell requests', icon: 'tag' },
        { id: 'dealer-desk', label: 'Dealer desk', icon: 'store' },
      ]},
      { id: 'support', label: 'Support', icon: 'headphones', children: [
        { id: 'help-support', label: 'Help and support', icon: 'headphones' },
      ]},
    ],

    maintenance: [
      { id: 'dashboard', label: 'Dashboard', icon: 'layout-grid', children: [
        { id: 'welcome', label: 'Welcome', icon: 'sparkles' },
        { id: 'dashboard', label: 'Master dashboard', icon: 'layout-grid' },
        { id: 'weather-dashboard', label: 'Weather dashboard', icon: 'cloud-sun' },
      ]},
      { id: 'masters', label: 'Masters', icon: 'layers', children: [
        { id: 'master-hub', label: 'Master hub', icon: 'grid-2x2' },
        { id: 'crop-master', label: 'Crop master', icon: 'leaf' },
        { id: 'location-master', label: 'Location master', icon: 'map-pin' },
        { id: 'category-master', label: 'Category master', icon: 'tag' },
        { id: 'product-master', label: 'Product master', icon: 'package' },
        { id: 'scheme-master', label: 'Scheme master', icon: 'stamp' },
        { id: 'sell-channels', label: 'Sell channels', icon: 'git-branch' },
        { id: 'language-master', label: 'Language master', icon: 'globe' },
        { id: 'unit-master', label: 'Unit master', icon: 'ruler' },
      ]},
      { id: 'field', label: 'Field', icon: 'sprout', children: [
        { id: 'field-tools', label: 'Field tools', icon: 'wrench' },
        { id: 'ai-mitra', label: 'AI Mitra', icon: 'message-circle' },
        { id: 'crop-doctor', label: 'Crop doctor', icon: 'leaf' },
        { id: 'soil-doctor', label: 'Soil doctor', icon: 'droplets' },
        { id: 'crop-guide', label: 'Crop guide', icon: 'book-open' },
        { id: 'seed-guide', label: 'Seed guide', icon: 'circle-dot' },
        { id: 'compost', label: 'Compost', icon: 'recycle' },
        { id: 'farm-manager', label: 'Farm manager', icon: 'tractor' },
        { id: 'scheme-applications', label: 'Scheme applications', icon: 'stamp' },
      ]},
      { id: 'content', label: 'Content', icon: 'megaphone', children: [
        { id: 'ads', label: 'Ads', icon: 'image' },
        { id: 'smart-alerts', label: 'Smart alerts', icon: 'bell' },
        { id: 'farmer-community', label: 'Farmer community', icon: 'message-square' },
        { id: 'knowledge-hub', label: 'Knowledge hub', icon: 'book' },
        { id: 'tool-rental', label: 'Tool rental', icon: 'plane' },
        { id: 'nearby-services', label: 'Nearby services', icon: 'map-pin' },
        { id: 'mandi-prices', label: 'Mandi prices', icon: 'bar-chart-3' },
      ]},
      { id: 'settings', label: 'Settings', icon: 'settings', children: [
        { id: 'system-health', label: 'System health', icon: 'activity' },
        { id: 'app-config', label: 'App config', icon: 'toggle-right' },
        { id: 'mobile-app', label: 'Mobile app', icon: 'smartphone' },
      ]},
    ],

    analysis: [
      { id: 'dashboard', label: 'Dashboard', icon: 'layout-grid', children: [
        { id: 'welcome', label: 'Welcome', icon: 'sparkles' },
        { id: 'dashboard', label: 'Master dashboard', icon: 'layout-grid' },
        { id: 'weather-dashboard', label: 'Weather dashboard', icon: 'cloud-sun' },
        { id: 'network-map', label: 'Network map', icon: 'map-pin' },
        { id: 'network-dashboard', label: 'Network dashboard', icon: 'globe' },
        { id: 'live-pulse', label: 'Live pulse', icon: 'radio' },
      ]},
      { id: 'insights', label: 'Insights', icon: 'zap', children: [
        { id: 'active-time', label: 'Active time', icon: 'clock' },
        { id: 'create-campaign', label: 'Create campaign', icon: 'plus-circle' },
        { id: 'campaign-performance', label: 'Campaign performance', icon: 'trending-up' },
        { id: 'sell-vs-buy', label: 'Sell vs buy', icon: 'arrow-left-right' },
        { id: 'growth-funnel', label: 'Growth funnel', icon: 'filter' },
        { id: 'marketing-studio', label: 'Marketing studio', icon: 'megaphone' },
        { id: 'coverage-gaps', label: 'Coverage gaps', icon: 'alert-triangle' },
        { id: 'crop-intelligence', label: 'Crop intelligence', icon: 'wheat' },
        { id: 'channel-mix', label: 'Channel mix', icon: 'share-2' },
      ]},
      { id: 'reports', label: 'Reports', icon: 'bar-chart', children: [
        { id: 'reports', label: 'Reports', icon: 'file-bar-chart' },
        { id: 'report-builder', label: 'Report builder', icon: 'wand' },
        { id: 'sales-report', label: 'Sales report', icon: 'trending-up' },
        { id: 'order-report', label: 'Order report', icon: 'shopping-bag' },
        { id: 'user-report', label: 'User report', icon: 'users' },
        { id: 'location-report', label: 'Location report', icon: 'map-pin' },
        { id: 'crop-report', label: 'Crop report', icon: 'leaf' },
        { id: 'wallet-report', label: 'Wallet report', icon: 'wallet' },
        { id: 'performance-reports', label: 'Performance reports', icon: 'activity' },
        { id: 'dealer-sales-report', label: 'Dealer sales report', icon: 'store' },
        { id: 'audit-logs', label: 'Audit logs', icon: 'shield-check' },
      ]},
    ],

        retailer: [
      { id: 'dashboard', label: 'Dashboard', icon: 'layout-grid', children: [
        { id: 'retailer-dashboard', label: 'Retailer dashboard', icon: 'home' },
        { id: 'mandi-prices', label: 'Mandi vs Farmgate', icon: 'bar-chart-2' },
      ]},
      { id: 'procurement', label: 'F2R Sourcing', icon: 'shopping-bag', children: [
        { id: 'f2r-procurement', label: 'Direct farm produce', icon: 'tag' },
        { id: 'retailer-orders', label: 'Purchase orders', icon: 'list' },
      ]},
      { id: 'suppliers', label: 'Farmer Network', icon: 'users', children: [
        { id: 'farmer-network', label: 'Verified farmers', icon: 'users' },
      ]},
      { id: 'inventory', label: 'Store Stock', icon: 'package', children: [
        { id: 'retailer-stock', label: 'Shop produce stock', icon: 'package' },
      ]},
      { id: 'delivery', label: 'Shipments', icon: 'truck', children: [
        { id: 'deliveries', label: 'Farm-to-store delivery', icon: 'route' },
      ]},
      { id: 'wallet', label: 'Wallet', icon: 'wallet', children: [
        { id: 'wallet-payouts', label: 'Procurement wallet', icon: 'indian-rupee' },
      ]},
      { id: 'support', label: 'Support', icon: 'headphones', children: [
        { id: 'help-support', label: 'Help & support', icon: 'headphones' },
      ]},
    ],

    dealer: [
      { id: 'dashboard', label: 'Dashboard', icon: 'layout-grid', children: [
        { id: 'shop-dashboard', label: 'Shop dashboard', icon: 'home' },
        { id: 'service-area', label: 'Service area', icon: 'map-pin' },
      ]},
      { id: 'orders', label: 'Orders', icon: 'shopping-bag', children: [
        { id: 'dealer-orders', label: 'Orders management', icon: 'list' },
      ]},
      { id: 'customers', label: 'Customers', icon: 'users', children: [
        { id: 'dealer-customers', label: 'Customer khata ledger', icon: 'users' },
      ]},
      { id: 'stock', label: 'Stock', icon: 'package', children: [
        { id: 'dealer-stock', label: 'Input inventory & pricing', icon: 'package' },
      ]},
      { id: 'dispatch', label: 'Dispatch', icon: 'truck', children: [
        { id: 'deliveries', label: 'Local delivery', icon: 'route' },
      ]},
      { id: 'wallet', label: 'Wallet', icon: 'wallet', children: [
        { id: 'wallet-payouts', label: 'Wallet and dues', icon: 'indian-rupee' },
        { id: 'pending-payments', label: 'Pending payments', icon: 'clock' },
      ]},
      { id: 'reports', label: 'Reports', icon: 'bar-chart', children: [
        { id: 'dealer-sales-report', label: 'Dealer sales report', icon: 'trending-up' },
      ]},
      { id: 'offers', label: 'Offers', icon: 'percent', children: [
        { id: 'offers-schemes', label: 'Manufacturer schemes', icon: 'percent' },
      ]},
      { id: 'settings', label: 'Settings', icon: 'settings', children: [
        { id: 'portal-settings', label: 'Portal settings', icon: 'user-cog' },
        { id: 'help-support', label: 'Help & support', icon: 'headphones' },
      ]},
    ],

    industrial: [
      { id: 'dashboard', label: 'Dashboard', icon: 'layout-grid', children: [
        { id: 'unit-dashboard', label: 'Unit dashboard', icon: 'home' },
        { id: 'industrial-stock', label: 'Silo and godown stock', icon: 'warehouse' },
      ]},
      { id: 'demand', label: 'Demands', icon: 'arrow-down-to-line', children: [
        { id: 'f2i-demands', label: 'Purchase tenders', icon: 'file-plus' },
        { id: 'farmer-offers', label: 'Farmer offers & bids', icon: 'tag' },
      ]},
      { id: 'intake', label: 'Weighbridge', icon: 'truck', children: [
        { id: 'gate-intake', label: 'Weighbridge & QC pass', icon: 'scale' },
        { id: 'deliveries', label: 'Delivery tracking', icon: 'route' },
      ]},
      { id: 'network', label: 'Network', icon: 'network', children: [
        { id: 'farmer-network', label: 'Contract farmers', icon: 'users' },
        { id: 'suppliers', label: 'Suppliers directory', icon: 'link' },
      ]},
      { id: 'settlements', label: 'Settlements', icon: 'credit-card', children: [
        { id: 'wallet-payouts', label: 'Direct farmer payouts', icon: 'indian-rupee' },
      ]},
      { id: 'settings', label: 'Settings', icon: 'settings', children: [
        { id: 'help-support', label: 'Help & support', icon: 'headphones' },
      ]},
    ],
  },
};