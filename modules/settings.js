// modules/settings.js
// Settings Module: A38 Settings hub, A67 Portal settings, A66 App config, A68 Mobile app, A65 System health, Audit logs, Notification settings

const settingsHtml = `
          <!-- -------------------------------------------------------------
               VIEW: SETTINGS HUB (A38)
               Left list: Profile, Language, Notifications, App config, Mobile app, System health, About.
               About: Picture 2 full lockup, Version 1.0.0, © 2026. Tagline "Innovating Beyond Boundaries."
               "Log out" red pill.
               ------------------------------------------------------------- -->
          <div id="view-settings-hub" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white rounded-full">Super admin · Full access</span>
                <span class="text-xs font-semibold text-[#64748B]">Platform Administration & Global Configurations</span>
              </div>
              <button onclick="logout()" class="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-bold text-red-700 shadow-sm flex items-center gap-2">
                <i data-lucide="log-out" class="w-4 h-4"></i>
                <span>Log out</span>
              </button>
            </div>

            <!-- Settings Grid / Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <!-- Profile Card -->
              <div class="saas-card p-5">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-full bg-emerald-100 text-[#0B6623] flex items-center justify-center font-bold text-lg">RA</div>
                  <div>
                    <h4 class="font-bold text-[#0F172A] text-sm">Rudram Admin</h4>
                    <p class="text-xs text-[#64748B]">Amreli HQ • Super Administrator</p>
                    <span class="text-[11px] text-[#475569] font-medium">+91 98251 XXXXX</span>
                  </div>
                </div>
                <div class="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span class="text-xs text-[#64748B]">Root access</span>
                  <button onclick="navigateTo('portal-settings', 'Settings', 'Portal settings')" class="text-xs text-[#0B6623] font-bold hover:underline">Manage profile &rarr;</button>
                </div>
              </div>

              <!-- Language & Region -->
              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-[#0F172A] text-sm">Language & Region</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">English (Default)</span>
                </div>
                <p class="text-xs text-[#64748B] mt-2">Portal chrome display is English. Regional Gujarati & Hindi enabled for mobile apps.</p>
                <div class="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span class="text-xs text-[#64748B]">3 active locales</span>
                  <button onclick="navigateTo('language-master', 'Masters', 'Language master')" class="text-xs text-[#0B6623] font-bold hover:underline">Edit languages &rarr;</button>
                </div>
              </div>

              <!-- App Config -->
              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-[#0F172A] text-sm">App Config</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">Live</span>
                </div>
                <p class="text-xs text-[#64748B] mt-2">Channels, ads, alerts, trade gates, and drone dispatch configuration.</p>
                <div class="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span class="text-xs text-[#64748B]">10 channels</span>
                  <button onclick="navigateTo('app-config', 'Settings', 'App config')" class="text-xs text-[#0B6623] font-bold hover:underline">Open config &rarr;</button>
                </div>
              </div>

              <!-- Mobile App Customizer -->
              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-[#0F172A] text-sm">Mobile App Experience</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">v1.0.4</span>
                </div>
                <p class="text-xs text-[#64748B] mt-2">Farmer, Dealer, Industrial, Retailer home tiles, docks, and hero banners.</p>
                <div class="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span class="text-xs text-[#64748B]">4 app roles</span>
                  <button onclick="navigateTo('mobile-app', 'Settings', 'Mobile app')" class="text-xs text-[#0B6623] font-bold hover:underline">Customize apps &rarr;</button>
                </div>
              </div>

              <!-- System Health -->
              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <h4 class="font-bold text-[#0F172A] text-sm">System Health</h4>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">99.98% Uptime</span>
                </div>
                <p class="text-xs text-[#64748B] mt-2">API latency 34ms, database cluster healthy, Redis cache sync up to date.</p>
                <div class="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <span class="text-xs text-[#64748B]">Mandi sync 2m ago</span>
                  <button onclick="navigateTo('system-health', 'Settings', 'System health')" class="text-xs text-[#0B6623] font-bold hover:underline">View telemetry &rarr;</button>
                </div>
              </div>

              <!-- About Rudram Card -->
              <div class="saas-card p-5 flex flex-col justify-between">
                <div>
                  <div class="h-8 flex items-center mb-2">
                    <img src="assets/rudram.png" alt="Rudram" class="h-7 object-contain">
                  </div>
                  <p class="text-xs font-bold text-[#0B6623]">Innovating Beyond Boundaries.</p>
                  <p class="text-[11px] text-[#64748B] mt-1">Version 1.0.0 • Enterprise Architecture &copy; 2026 Rudram. All rights reserved.</p>
                </div>
                <div class="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs text-[#64748B]">
                  <span>Status: Production Ready</span>
                  <span class="font-bold text-[#0B6623]">Verified</span>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: SYSTEM HEALTH (A65)
               Status cards: API Up, Mandi feed 2 min, Notifications On, Drone 12 Free today.
               Nearby lab Sudavad Active. Button "Rebuild cache".
               ------------------------------------------------------------- -->
          <div id="view-system-health" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 text-xs font-bold bg-emerald-500 text-white rounded-full">Maintenance</span>
                <span class="text-xs font-semibold text-[#64748B]">Infrastructure Telemetry & Diagnostic Health Check</span>
              </div>
              <button onclick="rebuildSystemCache()" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                <span>Rebuild cache</span>
              </button>
            </div>

            <!-- Status cards: API Up, Mandi feed 2 min, Notifications On, Drone 12 Free today -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div class="saas-card p-5 border-emerald-200 bg-emerald-50/20">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-emerald-800">API Gateway</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Operational</span>
                </div>
                <div class="text-2xl font-extrabold text-[#0B6623] mt-2">API Up (99.98%)</div>
                <p class="text-xs text-[#64748B] mt-1">Average latency: 34ms • 0 error rate</p>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#0F172A]">Mandi Feed</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Synced</span>
                </div>
                <div class="text-2xl font-extrabold text-[#0F172A] mt-2">Mandi feed 2 min</div>
                <p class="text-xs text-[#64748B] mt-1">Amreli APMC live socket active</p>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#0F172A]">Broadcast System</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Live</span>
                </div>
                <div class="text-2xl font-extrabold text-[#0B6623] mt-2">Notifications On</div>
                <p class="text-xs text-[#64748B] mt-1">WhatsApp & FCM Push gateways connected</p>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#0F172A]">Tool Fleet</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Ready</span>
                </div>
                <div class="text-2xl font-extrabold text-[#0F172A] mt-2">Drone 12 Free today</div>
                <p class="text-xs text-[#64748B] mt-1">Nearby lab Sudavad Active</p>
              </div>
            </div>

            <!-- Telemetry Details Table -->
            <div class="saas-card overflow-hidden">
              <div class="p-4 border-b border-[#E5E7EB] bg-[#F8FAFC]">
                <h4 class="text-xs font-bold text-[#0F172A]">Database & Microservice Nodes</h4>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3">Component</th>
                      <th class="px-5 py-3">Endpoint / Cluster</th>
                      <th class="px-5 py-3">Load / Memory</th>
                      <th class="px-5 py-3">Status</th>
                      <th class="px-5 py-3 text-right">Ping</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium text-[#0F172A]">
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">PostgreSQL Master Cluster</td>
                      <td class="px-5 py-3.5 text-[#475569]">pg-primary.amreli.internal:5432</td>
                      <td class="px-5 py-3.5">24% CPU • 3.2 GB / 16 GB</td>
                      <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Healthy</span></td>
                      <td class="px-5 py-3.5 text-right font-mono text-[#0B6623]">2ms</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Redis Distributed Cache</td>
                      <td class="px-5 py-3.5 text-[#475569]">redis-cache.amreli.internal:6379</td>
                      <td class="px-5 py-3.5">94.2% Hit Rate • 420 MB / 4 GB</td>
                      <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Healthy</span></td>
                      <td class="px-5 py-3.5 text-right font-mono text-[#0B6623]">1ms</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Regional Geo-Mapping Tile Engine</td>
                      <td class="px-5 py-3.5 text-[#475569]">tiles.ankurmitra.in</td>
                      <td class="px-5 py-3.5">18% Load • Sudavad Corridor SH-104</td>
                      <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Healthy</span></td>
                      <td class="px-5 py-3.5 text-right font-mono text-[#0B6623]">12ms</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: PORTAL SETTINGS (A67)
               Super admin page. Cards: Profile, Language, Notifications, Linked role.
               Button "Open mobile app". About Rudram lockup + "Innovating Beyond Boundaries." "Log out".
               ------------------------------------------------------------- -->
          <div id="view-portal-settings" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white rounded-full">Super admin · Full access</span>
                <span class="text-xs font-semibold text-[#64748B]">Admin Desk Profile & Workspace Security</span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="navigateTo('mobile-app', 'Settings', 'Mobile app')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                  <i data-lucide="smartphone" class="w-4 h-4"></i>
                  <span>Open mobile app</span>
                </button>
                <button onclick="logout()" class="px-4 py-2 rounded-xl bg-red-50 hover:bg-red-100 border border-red-200 text-xs font-bold text-red-700 shadow-sm flex items-center gap-2">
                  <i data-lucide="log-out" class="w-4 h-4"></i>
                  <span>Log out</span>
                </button>
              </div>
            </div>

            <!-- Profile & Settings Cards -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="saas-card p-5 space-y-4">
                <h4 class="text-xs font-bold text-[#0F172A]">Desk Profile</h4>
                <div class="space-y-3 text-xs">
                  <div>
                    <label class="block text-[11px] font-semibold text-[#64748B]">Administrator Name</label>
                    <input type="text" value="Rudram Admin" class="mt-1 w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0B6623]">
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold text-[#64748B]">Headquarters Unit / Location</label>
                    <input type="text" value="Amreli, Gujarat" class="mt-1 w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0B6623]">
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold text-[#64748B]">Linked System Role</label>
                    <input type="text" value="Super admin" disabled class="mt-1 w-full px-3 py-2 bg-slate-50 border border-[#E5E7EB] rounded-xl text-xs font-bold text-emerald-800">
                  </div>
                </div>
              </div>

              <div class="saas-card p-5 space-y-4">
                <h4 class="text-xs font-bold text-[#0F172A]">Language & Notifications</h4>
                <div class="space-y-3 text-xs">
                  <div>
                    <label class="block text-[11px] font-semibold text-[#64748B]">Portal System Language</label>
                    <select class="mt-1 w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#0F172A] focus:outline-none focus:border-[#0B6623]">
                      <option selected>English (Default)</option>
                      <option>Gujarati</option>
                      <option>Hindi</option>
                    </select>
                  </div>
                  <div class="flex items-center justify-between pt-2">
                    <div>
                      <div class="font-bold text-[#0F172A]">Desktop Browser Notifications</div>
                      <div class="text-[11px] text-[#64748B]">Instant audio and push alerts for orders and support tickets</div>
                    </div>
                    <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded focus:ring-[#0B6623]">
                  </div>
                  <div class="flex items-center justify-between pt-2">
                    <div>
                      <div class="font-bold text-[#0F172A]">Two-Factor Authentication (2FA)</div>
                      <div class="text-[11px] text-[#64748B]">Enforce OTP or 4-digit PIN for high-value wallet payouts</div>
                    </div>
                    <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded focus:ring-[#0B6623]">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: APP CONFIG (A66)
               Toggles: F2C, F2R, F2I, Drone home banner, Pin drone first tile, Dealer web, Industry web.
               Channel chips: all ten sell channels Active.
               Ads preview "Drone spray available today". Alert composer "Rain tomorrow...".
               Button "Save config".
               ------------------------------------------------------------- -->
          <div id="view-app-config" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white rounded-full">Super admin · Full access</span>
                <span class="text-xs font-semibold text-[#64748B]">Mobile Platform Runtime Rules & Trade Channels</span>
              </div>
              <button onclick="saveAppConfig()" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                <i data-lucide="check" class="w-4 h-4"></i>
                <span>Save config</span>
              </button>
            </div>

            <!-- Toggles Matrix -->
            <div class="saas-card p-5">
              <h4 class="text-xs font-bold text-[#0F172A] mb-3">Feature Toggles & Trading Channels</h4>
              <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
                <label class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex items-center justify-between cursor-pointer">
                  <div>
                    <div class="font-bold text-[#0F172A]">F2C Channel</div>
                    <div class="text-[10px] text-[#64748B]">Farmer to Consumer</div>
                  </div>
                  <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded">
                </label>
                <label class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex items-center justify-between cursor-pointer">
                  <div>
                    <div class="font-bold text-[#0F172A]">F2R Channel</div>
                    <div class="text-[10px] text-[#64748B]">Farmer to Retailer</div>
                  </div>
                  <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded">
                </label>
                <label class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex items-center justify-between cursor-pointer">
                  <div>
                    <div class="font-bold text-[#0F172A]">F2I Channel</div>
                    <div class="text-[10px] text-[#64748B]">Farmer to Industry</div>
                  </div>
                  <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded">
                </label>
                <label class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex items-center justify-between cursor-pointer">
                  <div>
                    <div class="font-bold text-[#0F172A]">Drone Home Banner</div>
                    <div class="text-[10px] text-[#64748B]">Active on Sudavad feed</div>
                  </div>
                  <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded">
                </label>
                <label class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex items-center justify-between cursor-pointer">
                  <div>
                    <div class="font-bold text-[#0F172A]">Pin Drone 1st Tile</div>
                    <div class="text-[10px] text-[#64748B]">High priority home tile</div>
                  </div>
                  <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded">
                </label>
                <label class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex items-center justify-between cursor-pointer">
                  <div>
                    <div class="font-bold text-[#0F172A]">Dealer Web Access</div>
                    <div class="text-[10px] text-[#64748B]">Kishan Agro portal login</div>
                  </div>
                  <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded">
                </label>
                <label class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex items-center justify-between cursor-pointer">
                  <div>
                    <div class="font-bold text-[#0F172A]">Industry Web Access</div>
                    <div class="text-[10px] text-[#64748B]">Patel Agro portal login</div>
                  </div>
                  <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded">
                </label>
              </div>
            </div>

            <!-- Channel Chips: all 10 sell channels Active -->
            <div class="saas-card p-5">
              <h4 class="text-xs font-bold text-[#0F172A] mb-3">Active Operational Sell Channels</h4>
              <div class="flex flex-wrap gap-2 text-xs">
                <span class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> F2C (Farmer to Consumer)
                </span>
                <span class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> F2R (Farmer to Retailer)
                </span>
                <span class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> F2I (Farmer to Industry)
                </span>
                <span class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Dealer Counter Pickup
                </span>
                <span class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Ankur Logistics Delivery
                </span>
                <span class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> FPO Bulk Aggregation
                </span>
                <span class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Direct Ginning Mill Gate
                </span>
                <span class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Oil Extraction Sourcing
                </span>
                <span class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Tool Rental Desk
                </span>
                <span class="px-3 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold flex items-center gap-1.5">
                  <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Subsidized Scheme Mart
                </span>
              </div>
            </div>

            <!-- Ads Preview & Alert Composer -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="saas-card p-5">
                <h4 class="text-xs font-bold text-[#0F172A] mb-3">Live Sponsored Ad Banner Preview</h4>
                <div class="p-4 bg-emerald-900 text-white rounded-2xl relative overflow-hidden">
                  <div class="relative z-10">
                    <span class="px-2 py-0.5 rounded text-[9px] font-bold bg-amber-400 text-black uppercase">Sponsored</span>
                    <h5 class="text-base font-extrabold mt-1">Drone spray available today</h5>
                    <p class="text-xs text-emerald-100 mt-1">Special rate ₹ 400/acre for Sudavad cluster • Instant booking</p>
                  </div>
                </div>
              </div>

              <div class="saas-card p-5">
                <h4 class="text-xs font-bold text-[#0F172A] mb-3">Real-time Alert Broadcast Composer</h4>
                <div class="space-y-3 text-xs">
                  <div>
                    <label class="block text-[11px] font-semibold text-[#64748B]">Message Content</label>
                    <input type="text" value="Rain tomorrow. Cover the cotton." class="mt-1 w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#0F172A]">
                  </div>
                  <div>
                    <label class="block text-[11px] font-semibold text-[#64748B]">Target Cluster</label>
                    <input type="text" value="Sudavad (All cotton farmers)" class="mt-1 w-full px-3 py-2 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#0F172A]">
                  </div>
                  <button onclick="showToast('Alert broadcast dispatched to Sudavad', 'success')" class="px-4 py-1.5 rounded-xl bg-[#0B6623] text-white font-bold text-xs">Dispatch Alert</button>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: MOBILE APP (A68)
               Tabs: Farmer, Dealer, Industrial, Retailer.
               Farmer tab: Home tiles, first tile Drone, banner "Drone spray · Sudavad 4 acre" on.
               Dock: Home, My farm, Mitra, Mart, My page. Language default English. PIN not password.
               Small phone preview on right. Buttons Save, Publish.
               ------------------------------------------------------------- -->
          <div id="view-mobile-app" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white rounded-full">Super admin · Full access</span>
                <!-- Tabs: Farmer, Dealer, Industrial, Retailer -->
                <div class="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl text-xs font-semibold text-[#475569]">
                  <button class="px-3 py-1 rounded-lg bg-white text-[#0B6623] font-bold shadow-sm">Farmer</button>
                  <button class="px-3 py-1 rounded-lg hover:text-[#0F172A]">Dealer</button>
                  <button class="px-3 py-1 rounded-lg hover:text-[#0F172A]">Industrial</button>
                  <button class="px-3 py-1 rounded-lg hover:text-[#0F172A]">Retailer</button>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="showToast('Mobile configurations saved as draft', 'info')" class="px-3.5 py-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A]">Save</button>
                <button onclick="showToast('Publishing OTA update to 1,240 farmer mobile apps...', 'success')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                  <i data-lucide="upload-cloud" class="w-4 h-4"></i>
                  <span>Publish</span>
                </button>
              </div>
            </div>

            <!-- Two Column Layout: Left Controls, Right Phone Mockup Preview -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <!-- Left 2 Cols: Configuration Details -->
              <div class="lg:col-span-2 space-y-5">
                <div class="saas-card p-5 space-y-4">
                  <h4 class="text-xs font-bold text-[#0F172A]">Farmer Mobile App Chrome Settings</h4>
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[11px] text-[#64748B] font-semibold">Authentication Method</span>
                      <div class="font-bold text-[#0F172A] mt-1">4-Digit PIN (Not complex password)</div>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[11px] text-[#64748B] font-semibold">Default Language</span>
                      <div class="font-bold text-[#0F172A] mt-1">English (with Gujarati audio prompt)</div>
                    </div>
                  </div>
                </div>

                <div class="saas-card p-5 space-y-3">
                  <h4 class="text-xs font-bold text-[#0F172A]">Farmer Bottom Dock Navigation Items</h4>
                  <div class="grid grid-cols-5 gap-2 text-center text-xs">
                    <div class="p-3 rounded-xl bg-emerald-50 border border-emerald-200 font-bold text-[#0B6623]">
                      <i data-lucide="home" class="w-5 h-5 mx-auto mb-1"></i>
                      <span>Home</span>
                    </div>
                    <div class="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] font-bold text-[#0F172A]">
                      <i data-lucide="sprout" class="w-5 h-5 mx-auto mb-1 text-[#64748B]"></i>
                      <span>My farm</span>
                    </div>
                    <div class="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] font-bold text-[#0F172A]">
                      <i data-lucide="bot" class="w-5 h-5 mx-auto mb-1 text-[#64748B]"></i>
                      <span>Mitra</span>
                    </div>
                    <div class="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] font-bold text-[#0F172A]">
                      <i data-lucide="shopping-cart" class="w-5 h-5 mx-auto mb-1 text-[#64748B]"></i>
                      <span>Mart</span>
                    </div>
                    <div class="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] font-bold text-[#0F172A]">
                      <i data-lucide="user" class="w-5 h-5 mx-auto mb-1 text-[#64748B]"></i>
                      <span>My page</span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Right 1 Col: Small Phone Preview with Ankurmitra Green Kit -->
              <div class="saas-card p-5 flex flex-col items-center">
                <span class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider mb-3">Live Mobile App Mockup</span>
                <!-- Phone Chassis -->
                <div class="w-64 bg-slate-900 p-2.5 rounded-[36px] shadow-2xl border-4 border-slate-800">
                  <!-- Phone Screen -->
                  <div class="w-full bg-[#F8FAFC] rounded-[28px] overflow-hidden flex flex-col h-[460px] text-[11px] relative select-none">
                    <!-- Top Status Bar -->
                    <div class="bg-[#0B6623] text-white px-4 pt-2 pb-1 flex justify-between items-center text-[9px] font-bold">
                      <span>9:41</span>
                      <div class="flex items-center gap-1">
                        <i data-lucide="wifi" class="w-3 h-3"></i>
                        <i data-lucide="battery-full" class="w-3 h-3"></i>
                      </div>
                    </div>
                    <!-- App Header -->
                    <div class="bg-[#0B6623] text-white p-3 flex items-center justify-between">
                      <div class="flex items-center gap-2">
                        <img src="assets/product_logo.png" alt="Ankurmitra" class="h-6 object-contain">
                        <div>
                          <div class="font-extrabold text-[11px] leading-tight">Ankurmitra</div>
                          <div class="text-[9px] text-emerald-100">Sudavad Farm</div>
                        </div>
                      </div>
                    </div>
                    <!-- Hero Banner -->
                    <div class="p-2.5">
                      <div class="bg-gradient-to-r from-[#0B6623] to-[#7CB342] text-white p-2.5 rounded-xl shadow-sm">
                        <span class="px-1.5 py-0.5 rounded text-[8px] font-black bg-amber-400 text-black uppercase">Active</span>
                        <div class="font-bold text-[10px] mt-1">Drone spray · Sudavad 4 acre</div>
                        <div class="text-[9px] text-emerald-100">Booked for 16 Oct</div>
                      </div>
                    </div>
                    <!-- Home Tiles -->
                    <div class="px-2.5 grid grid-cols-3 gap-2 text-center text-[9px] font-bold text-[#0F172A]">
                      <div class="p-2 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
                        <i data-lucide="plane" class="w-4 h-4 mx-auto text-[#0B6623] mb-1"></i>
                        <span>Drone</span>
                      </div>
                      <div class="p-2 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
                        <i data-lucide="tractor" class="w-4 h-4 mx-auto text-[#0B6623] mb-1"></i>
                        <span>Tractor</span>
                      </div>
                      <div class="p-2 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
                        <i data-lucide="droplets" class="w-4 h-4 mx-auto text-[#0B6623] mb-1"></i>
                        <span>Soil test</span>
                      </div>
                      <div class="p-2 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
                        <i data-lucide="leaf" class="w-4 h-4 mx-auto text-[#0B6623] mb-1"></i>
                        <span>Crop doctor</span>
                      </div>
                      <div class="p-2 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
                        <i data-lucide="cloud-sun" class="w-4 h-4 mx-auto text-[#0B6623] mb-1"></i>
                        <span>Weather</span>
                      </div>
                      <div class="p-2 rounded-xl bg-white border border-[#E5E7EB] shadow-xs">
                        <i data-lucide="bar-chart-2" class="w-4 h-4 mx-auto text-[#0B6623] mb-1"></i>
                        <span>Mandi</span>
                      </div>
                    </div>
                    <!-- Bottom Dock -->
                    <div class="mt-auto bg-white border-t border-[#E5E7EB] p-2 flex justify-around text-[8px] font-bold text-[#64748B]">
                      <div class="text-[#0B6623] flex flex-col items-center">
                        <i data-lucide="home" class="w-3.5 h-3.5"></i>
                        <span>Home</span>
                      </div>
                      <div class="flex flex-col items-center">
                        <i data-lucide="sprout" class="w-3.5 h-3.5"></i>
                        <span>Farm</span>
                      </div>
                      <div class="flex flex-col items-center">
                        <i data-lucide="bot" class="w-3.5 h-3.5"></i>
                        <span>Mitra</span>
                      </div>
                      <div class="flex flex-col items-center">
                        <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
                        <span>Mart</span>
                      </div>
                      <div class="flex flex-col items-center">
                        <i data-lucide="user" class="w-3.5 h-3.5"></i>
                        <span>Profile</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: AUDIT LOGS (SUGGESTED)
               ------------------------------------------------------------- -->
          <div id="view-audit-logs" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="text-xs font-semibold text-[#64748B]">Security & System Administrative Audit Trail</div>
              <button onclick="showToast('Exporting audit logs CSV...', 'info')" class="px-4 py-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A] flex items-center gap-2">
                <i data-lucide="download" class="w-4 h-4 text-[#64748B]"></i>
                <span>Export Log</span>
              </button>
            </div>

            <div class="saas-card overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3">Timestamp</th>
                      <th class="px-5 py-3">Staff User</th>
                      <th class="px-5 py-3">Action Description</th>
                      <th class="px-5 py-3">Module</th>
                      <th class="px-5 py-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium text-[#0F172A]">
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-[#64748B]">15 Oct 2026, 12:40 PM</td>
                      <td class="px-5 py-3.5 font-bold">Rudram Admin</td>
                      <td class="px-5 py-3.5">Approved F2I Cotton Shankar-6 inward lot</td>
                      <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">Sales</span></td>
                      <td class="px-5 py-3.5 text-right"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Success</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-[#64748B]">15 Oct 2026, 11:15 AM</td>
                      <td class="px-5 py-3.5 font-bold">Kiran Joshi</td>
                      <td class="px-5 py-3.5">Dispatched Van 1 Sudavad to Bagasara Route</td>
                      <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800">Delivery</span></td>
                      <td class="px-5 py-3.5 text-right"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Success</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: NOTIFICATION SETTINGS (SUGGESTED)
               ------------------------------------------------------------- -->
          <div id="view-notification-settings" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="text-xs font-semibold text-[#64748B]">SMS Gateway, WhatsApp Business API & FCM Push Setup</div>
              <button onclick="showToast('Notification channel test ping sent successfully', 'success')" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white text-xs font-bold shadow-sm">Test Channels</button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div class="saas-card p-5 space-y-3 text-xs">
                <h4 class="font-bold text-[#0F172A]">WhatsApp Business API</h4>
                <div class="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div class="font-bold text-emerald-900">Meta Cloud API Gateway</div>
                    <div class="text-[11px] text-emerald-700">Account: +91 98251 44320 • Active & Verified</div>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">Connected</span>
                </div>
              </div>

              <div class="saas-card p-5 space-y-3 text-xs">
                <h4 class="font-bold text-[#0F172A]">SMS & Push Gateway</h4>
                <div class="p-3 bg-blue-50 border border-blue-200 rounded-xl flex items-center justify-between">
                  <div>
                    <div class="font-bold text-blue-900">Firebase Cloud Messaging (FCM)</div>
                    <div class="text-[11px] text-blue-700">Push Token Server • 99.8% Delivery Rate</div>
                  </div>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">Connected</span>
                </div>
              </div>
            </div>
          </div>
`;

const settingsJs = `
    // Settings Module Controllers
    function saveAppConfig() {
      showToast('App config rules saved & broadcasted to mobile clients', 'success');
    }

    function rebuildSystemCache() {
      showToast('Rebuilding Redis & API Gateway microservice caches...', 'info');
      setTimeout(() => {
        showToast('All system caches successfully rebuilt in 140ms', 'success');
      }, 700);
    }
`;

module.exports = { settingsHtml, settingsJs };
