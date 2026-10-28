// builder_settings_full.js
// Exports settingsHtml, settingsJs
// 100% English only. Zero Gujarati characters. Modern 2026 SaaS design.

const settingsHtml = `
          <!-- =============================================================
               VIEW: SETTINGS HUB (A38)
               ============================================================= -->
          <div id="view-settings-hub" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-emerald-50/80 via-white to-slate-50 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="text-xs font-bold text-[#0B6623]">System & Enterprise Configuration Hub</span>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">Platform Settings</h2>
                <p class="text-xs text-[#64748B] mt-0.5">Manage portal preferences, API gateways, mobile releases, infrastructure telemetry, and security audit trails.</p>
              </div>
              <button onclick="signOutAction()" class="h-9 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-2xs">
                <i data-lucide="log-out" class="w-4 h-4"></i>
                <span>Sign Out</span>
              </button>
            </div>

            <!-- Quick Navigation Tiles -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <div onclick="navigateTo('app-config', 'Settings', 'App config')" class="saas-card p-5 cursor-pointer hover:border-[#0B6623] hover:shadow-sm transition space-y-2 group">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B6623] flex items-center justify-center font-bold group-hover:bg-[#0B6623] group-hover:text-white transition">
                  <i data-lucide="sliders" class="w-5 h-5"></i>
                </div>
                <h3 class="text-sm font-extrabold text-[#0F172A]">App Configuration</h3>
                <p class="text-xs text-[#64748B]">Feature flags, microservice endpoints, cache TTL, and maintenance modes.</p>
              </div>

              <div onclick="navigateTo('mobile-app', 'Settings', 'Mobile app')" class="saas-card p-5 cursor-pointer hover:border-blue-600 hover:shadow-sm transition space-y-2 group">
                <div class="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold group-hover:bg-blue-600 group-hover:text-white transition">
                  <i data-lucide="smartphone" class="w-5 h-5"></i>
                </div>
                <h3 class="text-sm font-extrabold text-[#0F172A]">Mobile App Release</h3>
                <p class="text-xs text-[#64748B]">Android & iOS build versions, force-update rules, and staged rollout quotas.</p>
              </div>

              <div onclick="navigateTo('system-health', 'Settings', 'System health')" class="saas-card p-5 cursor-pointer hover:border-amber-600 hover:shadow-sm transition space-y-2 group">
                <div class="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold group-hover:bg-amber-600 group-hover:text-white transition">
                  <i data-lucide="activity" class="w-5 h-5"></i>
                </div>
                <h3 class="text-sm font-extrabold text-[#0F172A]">System Health & Telemetry</h3>
                <p class="text-xs text-[#64748B]">Real-time microservice status, CPU/RAM telemetry, and Redis cache rebuilding.</p>
              </div>

              <div onclick="navigateTo('audit-logs', 'Settings', 'Audit logs')" class="saas-card p-5 cursor-pointer hover:border-purple-600 hover:shadow-sm transition space-y-2 group">
                <div class="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold group-hover:bg-purple-600 group-hover:text-white transition">
                  <i data-lucide="shield-check" class="w-5 h-5"></i>
                </div>
                <h3 class="text-sm font-extrabold text-[#0F172A]">Security Audit Logs</h3>
                <p class="text-xs text-[#64748B]">Tamper-evident administrative action ledger, IP tracking, and state diffs.</p>
              </div>

              <div onclick="navigateTo('notification-settings', 'Settings', 'Notification settings')" class="saas-card p-5 cursor-pointer hover:border-indigo-600 hover:shadow-sm transition space-y-2 group">
                <div class="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold group-hover:bg-indigo-600 group-hover:text-white transition">
                  <i data-lucide="bell" class="w-5 h-5"></i>
                </div>
                <h3 class="text-sm font-extrabold text-[#0F172A]">Notification Settings</h3>
                <p class="text-xs text-[#64748B]">DLT SMS gateways, WhatsApp Cloud API, FCM push tokens, and SMTP triggers.</p>
              </div>

              <div onclick="navigateTo('portal-settings', 'Settings', 'Portal settings')" class="saas-card p-5 cursor-pointer hover:border-teal-600 hover:shadow-sm transition space-y-2 group">
                <div class="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center font-bold group-hover:bg-teal-600 group-hover:text-white transition">
                  <i data-lucide="globe" class="w-5 h-5"></i>
                </div>
                <h3 class="text-sm font-extrabold text-[#0F172A]">Portal Preferences</h3>
                <p class="text-xs text-[#64748B]">Language settings, date formats, theme modes, and company branding.</p>
              </div>
            </div>
          </div>

          <!-- =============================================================
               VIEW: PORTAL SETTINGS (A67)
               ============================================================= -->
          <div id="view-portal-settings" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-teal-50 to-white border border-teal-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="text-xs font-bold text-teal-700">Localization & Display</span>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Portal Preferences</h2>
                <p class="text-xs text-[#64748B]">Default timezone, date formatting, and official organizational metadata.</p>
              </div>
              <button onclick="showToast('Portal preferences updated.', 'success')" class="h-9 px-4 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl transition">
                Save Preferences
              </button>
            </div>

            <div class="saas-card p-6 space-y-4 text-xs">
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label class="block font-bold text-[#0F172A] mb-1">Default System Language</label>
                  <select class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold">
                    <option value="en" selected>English (Primary Portal Standard)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-[#0F172A] mb-1">Timezone</label>
                  <select class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold">
                    <option selected>Asia/Kolkata (IST +5:30)</option>
                  </select>
                </div>
                <div>
                  <label class="block font-bold text-[#0F172A] mb-1">Fiscal Currency Format</label>
                  <select class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold">
                    <option selected>Indian Rupee (INR ₹ Lakhs & Crores)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <!-- =============================================================
               VIEW: APP CONFIG (A66) — Full Details & Feature Flags
               ============================================================= -->
          <div id="view-app-config" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/60 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <span class="w-2 h-2 rounded-full bg-[#0B6623] animate-pulse"></span>
                  Active Environment: Production (Saurashtra Multi-Cluster)
                </div>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">App config</h2>
                <p class="text-xs text-[#64748B] mt-0.5 font-medium">
                  Configure feature flags, microservice endpoints, database connection limits, and global maintenance controls.
                </p>
              </div>
              <button onclick="saveAppConfig()" class="h-9 px-5 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                <i data-lucide="check" class="w-4 h-4"></i>
                <span>Save App Config</span>
              </button>
            </div>

            <!-- Feature Flags Grid -->
            <div class="saas-card p-6 space-y-4">
              <h3 class="text-xs font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-2">
                <i data-lucide="toggle-right" class="w-4 h-4 text-[#0B6623]"></i>
                Dynamic Feature Flags (Instant Client Sync)
              </h3>

              <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
                <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] flex items-start justify-between gap-3">
                  <div>
                    <div class="font-extrabold text-[#0F172A]">AI Mitra Voice Transcription</div>
                    <div class="text-[11px] text-[#64748B] mt-0.5">Enables voice input button for farmers.</div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0B6623]"></div>
                  </label>
                </div>

                <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] flex items-start justify-between gap-3">
                  <div>
                    <div class="font-extrabold text-[#0F172A]">IoT Soil Sensor Auto-Sync</div>
                    <div class="text-[11px] text-[#64748B] mt-0.5">Syncs farm telemetry every 15 mins.</div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0B6623]"></div>
                  </label>
                </div>

                <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] flex items-start justify-between gap-3">
                  <div>
                    <div class="font-extrabold text-[#0F172A]">Drone Spraying Dispatch</div>
                    <div class="text-[11px] text-[#64748B] mt-0.5">Allows direct pilot booking in app.</div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0B6623]"></div>
                  </label>
                </div>

                <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] flex items-start justify-between gap-3">
                  <div>
                    <div class="font-extrabold text-[#0F172A]">DBT Subsidy Auto-Claim</div>
                    <div class="text-[11px] text-[#64748B] mt-0.5">Auto-submits 7/12 land records to treasury.</div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0B6623]"></div>
                  </label>
                </div>

                <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] flex items-start justify-between gap-3">
                  <div>
                    <div class="font-extrabold text-[#0F172A]">Offline-First PWA Mode</div>
                    <div class="text-[11px] text-[#64748B] mt-0.5">Stores agronomy guides in local IndexedDB.</div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked class="sr-only peer">
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#0B6623]"></div>
                  </label>
                </div>

                <div class="p-4 bg-rose-50/70 rounded-2xl border border-rose-200 flex items-start justify-between gap-3">
                  <div>
                    <div class="font-extrabold text-rose-900">Maintenance Mode</div>
                    <div class="text-[11px] text-rose-700 mt-0.5">Halts mobile checkouts for server upgrade.</div>
                  </div>
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" class="sr-only peer">
                    <div class="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-rose-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Core API & System Endpoints -->
            <div class="saas-card p-6 space-y-4 text-xs">
              <h3 class="text-xs font-black uppercase tracking-wider text-[#0F172A] flex items-center gap-2">
                <i data-lucide="server" class="w-4 h-4 text-blue-600"></i>
                Core Infrastructure & Microservice Gateways
              </h3>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block font-bold text-[#0F172A] mb-1">API Gateway Microservice URL</label>
                  <input type="text" value="https://api.ankurmitra.in/v2" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono text-xs font-semibold outline-none focus:border-[#0B6623]">
                </div>
                <div>
                  <label class="block font-bold text-[#0F172A] mb-1">WebSocket Live Stream Endpoint</label>
                  <input type="text" value="wss://stream.ankurmitra.in/apmc/live" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono text-xs font-semibold outline-none focus:border-[#0B6623]">
                </div>
                <div>
                  <label class="block font-bold text-[#0F172A] mb-1">Redis Cache Cluster TTL (Seconds)</label>
                  <input type="number" value="3600" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                </div>
                <div>
                  <label class="block font-bold text-[#0F172A] mb-1">PostgreSQL DB Connection Pool Limit</label>
                  <input type="number" value="120" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                </div>
              </div>
            </div>
          </div>

          <!-- =============================================================
               VIEW: MOBILE APP (A68) — Release Version & Staged Rollout
               ============================================================= -->
          <div id="view-mobile-app" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-blue-50/80 via-white to-slate-50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-blue-700">
                  <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                  Mobile Release & Version Enforcement Desk
                </div>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">Mobile app</h2>
                <p class="text-xs text-[#64748B] mt-0.5 font-medium">
                  Manage Android APK and iOS App Store binaries, configure minimum required versions, and monitor crash-free sessions.
                </p>
              </div>
              <button onclick="saveMobileAppConfig()" class="h-9 px-5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                <i data-lucide="upload-cloud" class="w-4 h-4"></i>
                <span>Publish Release Rules</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <!-- Android Build Card -->
              <div class="saas-card p-5 space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <span class="font-extrabold text-xs text-[#0F172A] flex items-center gap-2">
                    <i data-lucide="play" class="w-4 h-4 text-emerald-600"></i> Google Play Store (Android)
                  </span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B6623]">Active</span>
                </div>
                <div class="text-xs space-y-2">
                  <div class="flex justify-between"><span>Current Live Version:</span><strong>v2.8.4 (Build 2840)</strong></div>
                  <div class="flex justify-between"><span>Min Required Version:</span><strong>v2.7.0</strong></div>
                  <div class="flex justify-between"><span>Package ID:</span><span class="font-mono text-[10px]">in.ankurmitra.farmer</span></div>
                  <div class="flex justify-between"><span>Crash-Free Rate:</span><strong class="text-emerald-700">99.86%</strong></div>
                </div>
              </div>

              <!-- iOS Build Card -->
              <div class="saas-card p-5 space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <span class="font-extrabold text-xs text-[#0F172A] flex items-center gap-2">
                    <i data-lucide="apple" class="w-4 h-4 text-slate-800"></i> Apple App Store (iOS)
                  </span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B6623]">Active</span>
                </div>
                <div class="text-xs space-y-2">
                  <div class="flex justify-between"><span>Current Live Version:</span><strong>v2.8.2 (Build 2820)</strong></div>
                  <div class="flex justify-between"><span>Min Required Version:</span><strong>v2.7.0</strong></div>
                  <div class="flex justify-between"><span>Bundle ID:</span><span class="font-mono text-[10px]">in.ankurmitra.ios</span></div>
                  <div class="flex justify-between"><span>Crash-Free Rate:</span><strong class="text-emerald-700">99.92%</strong></div>
                </div>
              </div>

              <!-- Staged Rollout Quota -->
              <div class="saas-card p-5 space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <span class="font-extrabold text-xs text-[#0F172A]">Staged Rollout Controls</span>
                  <span class="text-xs font-black text-blue-700" id="rolloutPercentLabel">75% Released</span>
                </div>
                <div class="text-xs space-y-3">
                  <p class="text-[11px] text-[#64748B]">Gradually increase distribution across Saurashtra farmer clusters to verify crash stability.</p>
                  <input type="range" min="0" max="100" value="75" oninput="document.getElementById('rolloutPercentLabel').textContent = this.value + '% Released'" class="w-full accent-blue-600">
                  <label class="flex items-center gap-2 cursor-pointer font-semibold">
                    <input type="checkbox" checked class="rounded text-blue-600">
                    <span>Force critical update for users with versions < 2.7.0</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- =============================================================
               VIEW: SYSTEM HEALTH (A65) — Live Gauges & Redis Rebuild
               ============================================================= -->
          <div id="view-system-health" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-emerald-50/80 via-white to-amber-50/60 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <span class="w-2 h-2 rounded-full bg-[#0B6623] animate-pulse"></span>
                  Real-time Microservice Telemetry & Health Monitoring
                </div>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">System health</h2>
                <p class="text-xs text-[#64748B] mt-0.5 font-medium">
                  Live CPU, memory, database pool status, API gateway latency, and Redis cache rebuilding.
                </p>
              </div>
              <div class="flex items-center gap-2.5">
                <button onclick="rebuildSystemCache()" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                  <span>Rebuild System Cache</span>
                </button>
                <button onclick="pingAllServices()" class="h-9 px-3.5 bg-white hover:bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] text-xs font-bold rounded-xl transition">
                  Ping Services
                </button>
              </div>
            </div>

            <!-- Health Status Tiles -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              <div class="saas-card p-5 border-l-4 border-l-[#0B6623] space-y-1">
                <span class="text-[#64748B] font-bold block">API Gateway Response</span>
                <div class="text-2xl font-black text-[#0B6623]">14 ms</div>
                <span class="text-[10px] text-emerald-700 font-bold">100% Operational • 0% Errors</span>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-blue-600 space-y-1">
                <span class="text-[#64748B] font-bold block">PostgreSQL Primary Pool</span>
                <div class="text-2xl font-black text-blue-700">18 / 120</div>
                <span class="text-[10px] text-blue-700 font-bold">15% Utilization • Healthy</span>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-amber-500 space-y-1">
                <span class="text-[#64748B] font-bold block">Redis Cache Hit Rate</span>
                <div class="text-2xl font-black text-amber-700">99.4%</div>
                <span class="text-[10px] text-amber-700 font-bold">4.2 GB Memory Used</span>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-purple-600 space-y-1">
                <span class="text-[#64748B] font-bold block">Agronomy Workers Queue</span>
                <div class="text-2xl font-black text-purple-700">16 Nodes</div>
                <span class="text-[10px] text-purple-700 font-bold">0 Pending Background Tasks</span>
              </div>
            </div>

            <!-- Server Telemetry Table -->
            <div class="saas-card p-6 space-y-4">
              <h3 class="text-xs font-black uppercase tracking-wider text-[#0F172A]">Core Microservice Component Status</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="bg-[#F8FAFC] text-[#64748B] font-bold border-y border-[#E5E7EB]">
                    <tr>
                      <th class="py-2.5 px-3">Microservice Component</th>
                      <th class="py-2.5 px-3">Instance Host</th>
                      <th class="py-2.5 px-3">Latency</th>
                      <th class="py-2.5 px-3">CPU / RAM</th>
                      <th class="py-2.5 px-3">Uptime</th>
                      <th class="py-2.5 px-3 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] font-medium text-[#0F172A]">
                    <tr>
                      <td class="py-2.5 px-3 font-bold">Authentication & RBAC Service</td>
                      <td class="py-2.5 px-3 font-mono text-[11px]">auth-node-01.ankurmitra</td>
                      <td class="py-2.5 px-3 text-[#0B6623]">12 ms</td>
                      <td class="py-2.5 px-3">14% / 512 MB</td>
                      <td class="py-2.5 px-3">99.99% (42 days)</td>
                      <td class="py-2.5 px-3 text-right"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B6623]">Healthy</span></td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-3 font-bold">APMC Mandi Price Websocket Feed</td>
                      <td class="py-2.5 px-3 font-mono text-[11px]">ws-stream-02.ankurmitra</td>
                      <td class="py-2.5 px-3 text-[#0B6623]">18 ms</td>
                      <td class="py-2.5 px-3">22% / 1.2 GB</td>
                      <td class="py-2.5 px-3">99.95% (28 days)</td>
                      <td class="py-2.5 px-3 text-right"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B6623]">Healthy</span></td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-3 font-bold">AI Mitra Deep Agronomy Inference</td>
                      <td class="py-2.5 px-3 font-mono text-[11px]">gpu-worker-01.ankurmitra</td>
                      <td class="py-2.5 px-3 text-amber-600">140 ms</td>
                      <td class="py-2.5 px-3">38% / 6.8 GB</td>
                      <td class="py-2.5 px-3">99.90% (14 days)</td>
                      <td class="py-2.5 px-3 text-right"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B6623]">Healthy</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- =============================================================
               VIEW: AUDIT LOGS — Detailed Activity Ledger & Diff Modal
               ============================================================= -->
          <div id="view-audit-logs" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-purple-50/80 via-white to-slate-50 border border-purple-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-purple-700">
                  <span class="w-2 h-2 rounded-full bg-purple-600 animate-pulse"></span>
                  Tamper-Evident Administrative Activity Ledger
                </div>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">Audit logs</h2>
                <p class="text-xs text-[#64748B] mt-0.5 font-medium">
                  Track user authentication events, permission modifications, pricing overrides, and commercial approvals with exact IP and timestamp logs.
                </p>
              </div>
              <button onclick="exportAuditLogsCsv()" class="h-9 px-4 bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                <i data-lucide="download" class="w-4 h-4"></i>
                <span>Export Audit Trail</span>
              </button>
            </div>

            <!-- Audit Table -->
            <div class="saas-card p-6 space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E5E7EB]">
                <div class="flex items-center gap-2">
                  <input id="auditLogSearch" oninput="filterAuditLogsTable()" type="text" placeholder="Search actor, action, or module..." class="h-8 px-3 text-xs bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-medium outline-none focus:border-purple-600 w-64">
                  <select id="auditLogSeverity" onchange="filterAuditLogsTable()" class="h-8 px-2.5 text-xs bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold text-[#334155] outline-none">
                    <option value="ALL">All Severities</option>
                    <option value="INFO">Info</option>
                    <option value="WARN">Warning</option>
                    <option value="CRITICAL">Critical Security</option>
                  </select>
                </div>
                <div class="text-xs font-bold text-[#64748B]">Showing 4 Recent Audit Events</div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="bg-[#F8FAFC] text-[#64748B] font-bold border-y border-[#E5E7EB]">
                    <tr>
                      <th class="py-2.5 px-3">Timestamp</th>
                      <th class="py-2.5 px-3">Actor / User</th>
                      <th class="py-2.5 px-3">Role</th>
                      <th class="py-2.5 px-3">IP Address</th>
                      <th class="py-2.5 px-3">Module</th>
                      <th class="py-2.5 px-3">Action & Summary</th>
                      <th class="py-2.5 px-3">Severity</th>
                      <th class="py-2.5 px-3 text-right">Payload Diff</th>
                    </tr>
                  </thead>
                  <tbody id="auditLogsTableBody" class="divide-y divide-[#E5E7EB] text-[#0F172A] font-medium">
                    <tr>
                      <td class="py-2.5 px-3 text-[#64748B]">26 Oct 14:15</td>
                      <td class="py-2.5 px-3 font-bold">Rudram Admin</td>
                      <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded bg-emerald-100 text-[#0B6623] text-[10px] font-bold">Super admin</span></td>
                      <td class="py-2.5 px-3 font-mono text-[11px]">103.24.112.45</td>
                      <td class="py-2.5 px-3 font-semibold">Access Matrix</td>
                      <td class="py-2.5 px-3">Updated Dealer Web Access permission scope</td>
                      <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">INFO</span></td>
                      <td class="py-2.5 px-3 text-right">
                        <button onclick="openAuditDiffModal('AUD-01')" class="text-purple-700 hover:underline font-bold text-[10px]">View Diff</button>
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-3 text-[#64748B]">26 Oct 13:40</td>
                      <td class="py-2.5 px-3 font-bold">Dr. Arvind Vala</td>
                      <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded bg-blue-100 text-blue-800 text-[10px] font-bold">Agronomist</span></td>
                      <td class="py-2.5 px-3 font-mono text-[11px]">103.24.112.89</td>
                      <td class="py-2.5 px-3 font-semibold">Field Tools</td>
                      <td class="py-2.5 px-3">Resolved Crop Doctor Leaf Spot scan diagnosis</td>
                      <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">INFO</span></td>
                      <td class="py-2.5 px-3 text-right">
                        <button onclick="openAuditDiffModal('AUD-02')" class="text-purple-700 hover:underline font-bold text-[10px]">View Diff</button>
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-3 text-[#64748B]">25 Oct 18:20</td>
                      <td class="py-2.5 px-3 font-bold">Pooja Sharma</td>
                      <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">FinTech</span></td>
                      <td class="py-2.5 px-3 font-mono text-[11px]">103.24.112.12</td>
                      <td class="py-2.5 px-3 font-semibold">Wallet Payouts</td>
                      <td class="py-2.5 px-3">Approved DBT subsidy tranche of INR 42,800</td>
                      <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">WARN</span></td>
                      <td class="py-2.5 px-3 text-right">
                        <button onclick="openAuditDiffModal('AUD-03')" class="text-purple-700 hover:underline font-bold text-[10px]">View Diff</button>
                      </td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-3 text-[#64748B]">25 Oct 11:05</td>
                      <td class="py-2.5 px-3 font-bold">Security Bot</td>
                      <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded bg-slate-100 text-slate-800 text-[10px] font-bold">System</span></td>
                      <td class="py-2.5 px-3 font-mono text-[11px]">127.0.0.1</td>
                      <td class="py-2.5 px-3 font-semibold">Auth Gateway</td>
                      <td class="py-2.5 px-3">Failed PIN retry limit reached (3 attempts)</td>
                      <td class="py-2.5 px-3"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">CRITICAL</span></td>
                      <td class="py-2.5 px-3 text-right">
                        <button onclick="openAuditDiffModal('AUD-04')" class="text-purple-700 hover:underline font-bold text-[10px]">View Diff</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- MODAL: AUDIT DIFF MODAL -->
            <div id="viewAuditDiffModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#E5E7EB] p-6 space-y-4 text-xs">
                <div class="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <div>
                    <h3 class="text-base font-black text-[#0F172A]">Administrative Payload Diff</h3>
                    <p class="text-xs text-[#64748B]">Before vs After state change verification.</p>
                  </div>
                  <button type="button" onclick="closeAuditDiffModal()" class="w-8 h-8 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <div class="grid grid-cols-2 gap-3 font-mono text-[11px]">
                  <div class="p-3 bg-rose-50 rounded-xl border border-rose-200">
                    <strong class="text-rose-900 block mb-1">Previous State (Before):</strong>
                    <pre class="text-rose-800 whitespace-pre-wrap">"dealer_web_access": false,
"credit_limit": 500000,
"status": "pending"</pre>
                  </div>
                  <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                    <strong class="text-emerald-900 block mb-1">Committed State (After):</strong>
                    <pre class="text-emerald-800 whitespace-pre-wrap">"dealer_web_access": true,
"credit_limit": 1000000,
"status": "approved"</pre>
                  </div>
                </div>

                <div class="pt-3 border-t border-[#E5E7EB] flex items-center justify-end">
                  <button type="button" onclick="closeAuditDiffModal()" class="h-10 px-6 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-xl transition">
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- =============================================================
               VIEW: NOTIFICATION SETTINGS — Omni-Channel Gateways
               ============================================================= -->
          <div id="view-notification-settings" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-indigo-50/80 via-white to-slate-50 border border-indigo-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-indigo-700">
                  <span class="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
                  Omni-Channel Farmer Alert & Messaging Gateways
                </div>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">Notification settings</h2>
                <p class="text-xs text-[#64748B] mt-0.5 font-medium">
                  Configure DLT-compliant SMS sender IDs, WhatsApp Business Cloud API, Firebase Cloud Messaging (FCM), and event dispatch rules.
                </p>
              </div>
              <button onclick="sendTestNotification()" class="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                <i data-lucide="send" class="w-4 h-4"></i>
                <span>Send Test Alert</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <!-- SMS Gateway -->
              <div class="saas-card p-5 space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <span class="font-bold text-xs text-[#0F172A] flex items-center gap-2">
                    <i data-lucide="message-square" class="w-4 h-4 text-blue-600"></i> DLT SMS Gateway (India Telecom)
                  </span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B6623]">Connected</span>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between"><span>Approved Header ID:</span><strong class="font-mono">ANKMIT</strong></div>
                  <div class="flex justify-between"><span>Available Balance:</span><strong>48,250 Credits</strong></div>
                  <div class="flex justify-between"><span>DLT Entity ID:</span><span class="font-mono text-[10px]">1101428910000042</span></div>
                </div>
              </div>

              <!-- WhatsApp Cloud API -->
              <div class="saas-card p-5 space-y-3">
                <div class="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                  <span class="font-bold text-xs text-[#0F172A] flex items-center gap-2">
                    <i data-lucide="message-circle" class="w-4 h-4 text-emerald-600"></i> WhatsApp Business Cloud API
                  </span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B6623]">Green Tick Verified</span>
                </div>
                <div class="space-y-2">
                  <div class="flex justify-between"><span>Business Number:</span><strong class="font-mono">+91 98251 44320</strong></div>
                  <div class="flex justify-between"><span>Approved Templates:</span><strong>18 Verified Templates</strong></div>
                  <div class="flex justify-between"><span>Daily Tier Limit:</span><strong>100,000 Messages / Day</strong></div>
                </div>
              </div>
            </div>

            <!-- Event Trigger Matrix -->
            <div class="saas-card p-6 space-y-4 text-xs">
              <h3 class="text-xs font-black uppercase tracking-wider text-[#0F172A]">Automated Event Dispatch Matrix</h3>
              <div class="overflow-x-auto">
                <table class="w-full text-left">
                  <thead class="bg-[#F8FAFC] text-[#64748B] font-bold border-y border-[#E5E7EB]">
                    <tr>
                      <th class="py-2.5 px-3">System Event Trigger</th>
                      <th class="py-2.5 px-3 text-center">SMS Text</th>
                      <th class="py-2.5 px-3 text-center">WhatsApp</th>
                      <th class="py-2.5 px-3 text-center">In-App Push</th>
                      <th class="py-2.5 px-3 text-right">Channel Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] font-medium text-[#0F172A]">
                    <tr>
                      <td class="py-2.5 px-3 font-bold">Fertilizer Order Dispatch & Delivery Tracking</td>
                      <td class="py-2.5 px-3 text-center"><input type="checkbox" checked class="rounded text-[#0B6623]"></td>
                      <td class="py-2.5 px-3 text-center"><input type="checkbox" checked class="rounded text-[#0B6623]"></td>
                      <td class="py-2.5 px-3 text-center"><input type="checkbox" checked class="rounded text-[#0B6623]"></td>
                      <td class="py-2.5 px-3 text-right"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-[#0B6623]">Instant</span></td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-3 font-bold">Critical Pest Outbreak & Severe Weather Alert</td>
                      <td class="py-2.5 px-3 text-center"><input type="checkbox" checked class="rounded text-[#0B6623]"></td>
                      <td class="py-2.5 px-3 text-center"><input type="checkbox" checked class="rounded text-[#0B6623]"></td>
                      <td class="py-2.5 px-3 text-center"><input type="checkbox" checked class="rounded text-[#0B6623]"></td>
                      <td class="py-2.5 px-3 text-right"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-100 text-rose-800">Priority 1</span></td>
                    </tr>
                    <tr>
                      <td class="py-2.5 px-3 font-bold">DBT Subsidy & Wallet Payout Disbursement</td>
                      <td class="py-2.5 px-3 text-center"><input type="checkbox" checked class="rounded text-[#0B6623]"></td>
                      <td class="py-2.5 px-3 text-center"><input type="checkbox" checked class="rounded text-[#0B6623]"></td>
                      <td class="py-2.5 px-3 text-center"><input type="checkbox" class="rounded text-[#0B6623]"></td>
                      <td class="py-2.5 px-3 text-right"><span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-[#0B6623]">Active</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
`;

const settingsJs = `
// ============================================================================
// SETTINGS MODULE CONTROLLERS
// ============================================================================

function saveAppConfig() {
  if (typeof showToast === "function") {
    showToast("App configuration rules saved & broadcasted to mobile clients in 12ms.", "success");
  }
}

function rebuildSystemCache() {
  if (typeof showToast === "function") {
    showToast("Rebuilding Redis & API Gateway microservice caches...", "info");
    setTimeout(() => {
      showToast("All system caches successfully rebuilt in 140ms.", "success");
    }, 700);
  }
}

function pingAllServices() {
  if (typeof showToast === "function") {
    showToast("Ping successful: All 5 core microservices reported 100% healthy.", "success");
  }
}

function saveMobileAppConfig() {
  if (typeof showToast === "function") {
    showToast("Mobile app release & version rules published to Play Store and App Store.", "success");
  }
}

function openAuditDiffModal(id) {
  const m = document.getElementById("viewAuditDiffModal");
  if (m) m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeAuditDiffModal() {
  const m = document.getElementById("viewAuditDiffModal");
  if (m) m.classList.add("hidden");
}

function filterAuditLogsTable() {
  const q = (document.getElementById("auditLogSearch")?.value || "").toLowerCase().trim();
  const sev = document.getElementById("auditLogSeverity")?.value || "ALL";
  const tbody = document.getElementById("auditLogsTableBody");
  if (!tbody) return;

  const rows = tbody.querySelectorAll("tr");
  rows.forEach(r => {
    const textMatch = !q || r.textContent.toLowerCase().includes(q);
    const sevMatch = (sev === "ALL") || r.textContent.includes(sev);
    r.style.display = textMatch && sevMatch ? "" : "none";
  });
}

function exportAuditLogsCsv() {
  if (typeof showToast === "function") {
    showToast("Exported administrative security audit logs to CSV.", "success");
  }
}

function sendTestNotification() {
  if (typeof showToast === "function") {
    showToast("Dispatched test push notification & WhatsApp ping successfully.", "success");
  }
}
`;

module.exports = {
  settingsHtml,
  settingsJs
};
