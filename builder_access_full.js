// builder_access_full.js
// Exports accessHtml, accessJs
// 100% English only. Zero Gujarati characters. Modern 2026 SaaS design.

const accessHtml = `
          <!-- =============================================================
               VIEW: ROLE MATRIX & UNIFIED ACCESS CONTROL (A59)
               Granular Module & Page Permissions + Multi-select + User Module Sync
               ============================================================= -->
          <div id="view-role-matrix" class="hidden space-y-6 view-section">
            
            <!-- Header Strip -->
            <div class="saas-card p-6 bg-gradient-to-r from-emerald-50/80 via-white to-indigo-50/60 border border-emerald-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <span class="w-2 h-2 rounded-full bg-[#0B6623] animate-pulse"></span>
                  Hierarchical Role Matrix & Multi-Permission Governance
                </div>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">Role matrix</h2>
                <p class="text-xs text-[#64748B] mt-0.5 font-medium">
                  Configure granular page-level permissions across all portal modules, grant or revoke multi-access privileges, and link profiles with the User module.
                </p>
              </div>
              <div class="flex flex-wrap items-center gap-2.5">
                <button onclick="saveRoleMatrix()" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="check-check" class="w-4 h-4"></i>
                  <span>Save Matrix</span>
                </button>
                <button onclick="openAssignRoleToUserModal()" class="h-9 px-3.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="user-check" class="w-4 h-4"></i>
                  <span>Move to User Module</span>
                </button>
                <button onclick="resetRoleMatrix()" class="h-9 px-3 bg-white hover:bg-[#F8FAFC] text-[#64748B] border border-[#E5E7EB] text-xs font-bold rounded-xl transition">
                  Reset
                </button>
              </div>
            </div>

            <!-- Access Sub-Navigation Tabs: Matrix vs Merged B2B Access Desks -->
            <div class="flex flex-wrap items-center gap-2 p-1.5 bg-[#F1F5F9] rounded-2xl w-fit text-xs font-bold">
              <button onclick="switchAccessViewTab('matrix')" id="accessTab-matrix" class="px-4 py-2 rounded-xl bg-white text-[#0F172A] shadow-xs transition">
                Module & Page Role Matrix
              </button>
              <button onclick="switchAccessViewTab('dealer-access')" id="accessTab-dealer-access" class="px-4 py-2 rounded-xl text-[#64748B] hover:text-[#0F172A] transition">
                Dealer Web Access Privileges (Merged)
              </button>
              <button onclick="switchAccessViewTab('industrial-access')" id="accessTab-industrial-access" class="px-4 py-2 rounded-xl text-[#64748B] hover:text-[#0F172A] transition">
                Industrial Mill Web Privileges (Merged)
              </button>
              <button onclick="switchAccessViewTab('b2b-reviews')" id="accessTab-b2b-reviews" class="px-4 py-2 rounded-xl text-[#64748B] hover:text-[#0F172A] transition">
                Unified KYC & Staff Desk (Merged)
              </button>
            </div>

            <!-- PANE 1: HIERARCHICAL MODULE & PAGE MATRIX -->
            <div id="accessPane-matrix" class="space-y-5">
              
              <!-- Role Selector Bar & Multi-Select Batch Actions -->
              <div class="saas-card p-5 space-y-4">
                <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <span class="text-xs font-extrabold text-[#0F172A]">Select Role Profile to Configure:</span>
                    <div class="flex flex-wrap items-center gap-2 mt-2" id="roleSelectorChipsContainer">
                      <button type="button" onclick="selectMatrixRole('Super admin', this)" class="matrix-role-btn px-3 py-1.5 rounded-xl text-xs font-black bg-[#0B6623] text-white shadow-xs">Super admin</button>
                      <button type="button" onclick="selectMatrixRole('Operate', this)" class="matrix-role-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] hover:bg-slate-100">Operate</button>
                      <button type="button" onclick="selectMatrixRole('Maintenance', this)" class="matrix-role-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] hover:bg-slate-100">Maintenance</button>
                      <button type="button" onclick="selectMatrixRole('Analysis', this)" class="matrix-role-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] hover:bg-slate-100">Analysis</button>
                      <button type="button" onclick="selectMatrixRole('Dealer', this)" class="matrix-role-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] hover:bg-slate-100">Dealer</button>
                      <button type="button" onclick="selectMatrixRole('Industrial', this)" class="matrix-role-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] hover:bg-slate-100">Industrial</button>
                      <button type="button" onclick="selectMatrixRole('Farmer', this)" class="matrix-role-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] hover:bg-slate-100">Farmer</button>
                      <button type="button" onclick="selectMatrixRole('Retailer', this)" class="matrix-role-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] hover:bg-slate-100">Retailer</button>
                    </div>
                  </div>

                  <!-- Multi-Select Bulk Actions -->
                  <div class="flex items-center gap-2 self-start lg:self-center">
                    <span class="text-[11px] font-bold text-[#64748B]">Batch Multi-Select:</span>
                    <button type="button" onclick="batchTogglePermissions('all', true)" class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 text-[#0B6623] border border-emerald-200 rounded-lg text-xs font-bold transition">
                      Grant All
                    </button>
                    <button type="button" onclick="batchTogglePermissions('view', true)" class="px-2.5 py-1 bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 rounded-lg text-xs font-bold transition">
                      View Only
                    </button>
                    <button type="button" onclick="batchTogglePermissions('all', false)" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-lg text-xs font-bold transition">
                      Revoke All
                    </button>
                  </div>
                </div>

                <!-- Hierarchical Module & Page Matrix Table -->
                <div class="overflow-x-auto">
                  <table class="w-full text-left text-xs">
                    <thead class="bg-[#F8FAFC] text-[#64748B] font-bold border-y border-[#E5E7EB]">
                      <tr>
                        <th class="py-3 px-4 w-72">Portal Module & Child Pages</th>
                        <th class="py-3 px-4 text-center">View / Read</th>
                        <th class="py-3 px-4 text-center">Create / Add</th>
                        <th class="py-3 px-4 text-center">Edit / Update</th>
                        <th class="py-3 px-4 text-center">Delete / Remove</th>
                        <th class="py-3 px-4 text-center">Export Data</th>
                        <th class="py-3 px-4 text-right">Row Quick Toggle</th>
                      </tr>
                    </thead>
                    <tbody id="matrixTableBody" class="divide-y divide-[#E5E7EB] text-[#0F172A]">
                      <!-- Rendered by renderRoleMatrixTree() -->
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- PANE 2: MERGED DEALER WEB ACCESS PRIVILEGES -->
            <div id="accessPane-dealer-access" class="hidden saas-card p-6 space-y-5">
              <div class="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h3 class="text-base font-extrabold text-[#0F172A]">Dealer B2B Web Access & Portal Desk</h3>
                  <p class="text-xs text-[#64748B]">Integrated with Role Matrix. Manage dealer web login permissions and wholesale ordering rights.</p>
                </div>
                <button onclick="navigateTo('user-list', 'Users', 'User list')" class="h-8 px-3 bg-white hover:bg-slate-50 border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#334155] transition flex items-center gap-1.5">
                  <i data-lucide="users" class="w-3.5 h-3.5"></i> Open Dealer Directory in Users
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] space-y-2">
                  <div class="font-bold text-xs text-[#0F172A] flex items-center gap-2">
                    <i data-lucide="shield-check" class="w-4 h-4 text-[#0B6623]"></i> Wholesale Catalog Access
                  </div>
                  <p class="text-[11px] text-[#64748B]">Dealers can browse bulk fertilizer SKUs, seed bags, and request truckload quotes.</p>
                  <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F172A]">
                    <input type="checkbox" checked class="rounded text-[#0B6623]">
                    <span>Enabled for Dealer Role</span>
                  </label>
                </div>

                <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] space-y-2">
                  <div class="font-bold text-xs text-[#0F172A] flex items-center gap-2">
                    <i data-lucide="credit-card" class="w-4 h-4 text-blue-600"></i> Working Capital Credit Line
                  </div>
                  <p class="text-[11px] text-[#64748B]">Direct authorization for net-30 deferred payment invoices up to assigned credit limit.</p>
                  <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F172A]">
                    <input type="checkbox" checked class="rounded text-[#0B6623]">
                    <span>Enabled for Verified Dealers</span>
                  </label>
                </div>

                <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] space-y-2">
                  <div class="font-bold text-xs text-[#0F172A] flex items-center gap-2">
                    <i data-lucide="tag" class="w-4 h-4 text-purple-600"></i> Local Voucher Distribution
                  </div>
                  <p class="text-[11px] text-[#64748B]">Ability to create and issue village coupon codes to affiliated retailers.</p>
                  <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F172A]">
                    <input type="checkbox" checked class="rounded text-[#0B6623]">
                    <span>Enabled for Tier-1 Dealers</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- PANE 3: MERGED INDUSTRIAL WEB ACCESS PRIVILEGES -->
            <div id="accessPane-industrial-access" class="hidden saas-card p-6 space-y-5">
              <div class="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                <div>
                  <h3 class="text-base font-extrabold text-[#0F172A]">Industrial Processor Web Portal Privileges</h3>
                  <p class="text-xs text-[#64748B]">Integrated with Role Matrix. Direct procurement access for ginning mills and crushing plants.</p>
                </div>
                <button onclick="navigateTo('suppliers', 'Users', 'Suppliers')" class="h-8 px-3 bg-white hover:bg-slate-50 border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#334155] transition flex items-center gap-1.5">
                  <i data-lucide="factory" class="w-3.5 h-3.5"></i> Open Processor Desk in Users
                </button>
              </div>

              <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] space-y-2">
                  <div class="font-bold text-xs text-[#0F172A] flex items-center gap-2">
                    <i data-lucide="scale" class="w-4 h-4 text-purple-600"></i> Weighbridge API Integration
                  </div>
                  <p class="text-[11px] text-[#64748B]">Automated digital gross/tare weight logging connected to APMC electronic gate slips.</p>
                  <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F172A]">
                    <input type="checkbox" checked class="rounded text-[#0B6623]">
                    <span>Active API Token Generated</span>
                  </label>
                </div>

                <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] space-y-2">
                  <div class="font-bold text-xs text-[#0F172A] flex items-center gap-2">
                    <i data-lucide="shopping-cart" class="w-4 h-4 text-[#0B6623]"></i> Direct Mandi Bulk Lot Bidding
                  </div>
                  <p class="text-[11px] text-[#64748B]">Participate in electronic auctions for cotton bales and groundnut truckload lots.</p>
                  <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F172A]">
                    <input type="checkbox" checked class="rounded text-[#0B6623]">
                    <span>Bidding Authority Granted</span>
                  </label>
                </div>

                <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] space-y-2">
                  <div class="font-bold text-xs text-[#0F172A] flex items-center gap-2">
                    <i data-lucide="file-check" class="w-4 h-4 text-blue-600"></i> Lab Quality Certificate Upload
                  </div>
                  <p class="text-[11px] text-[#64748B]">Direct upload rights for staple length, ginning turnout (RD), and moisture assays.</p>
                  <label class="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#0F172A]">
                    <input type="checkbox" checked class="rounded text-[#0B6623]">
                    <span>Quality Clearance Permitted</span>
                  </label>
                </div>
              </div>
            </div>

            <!-- PANE 4: MERGED UNIFIED B2B VERIFICATION & STAFF DESK -->
            <div id="accessPane-b2b-reviews" class="hidden saas-card p-6 space-y-5">
              <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold">
                    <i data-lucide="users" class="w-5 h-5"></i>
                  </div>
                  <div>
                    <h4 class="font-black text-[#0F172A] text-xs">Unified B2B User Verification & KYC Synchronization</h4>
                    <p class="text-[11px] text-[#64748B]">Dealer reviews, industrial verifications, approvals, and administrative staff profiles are unified with the Users module.</p>
                  </div>
                </div>
                <button onclick="navigateTo('user-list', 'Users', 'User list')" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs whitespace-nowrap">
                  <span>Open Unified User Desk</span>
                  <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                </button>
              </div>

              <!-- Live Verification Ledger -->
              <div class="overflow-x-auto border border-[#E5E7EB] rounded-2xl">
                <table class="w-full text-left text-xs">
                  <thead class="bg-[#F8FAFC] text-[#64748B] font-bold border-b border-[#E5E7EB]">
                    <tr>
                      <th class="py-3 px-4">Entity & Category</th>
                      <th class="py-3 px-4">Identifier / License</th>
                      <th class="py-3 px-4">Submission Date</th>
                      <th class="py-3 px-4">Workflow Step</th>
                      <th class="py-3 px-4 text-right">Verification Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-[#0F172A] font-medium">
                    <tr>
                      <td class="py-3 px-4">
                        <div class="font-bold">Kisan Agro Distributors</div>
                        <div class="text-[10px] text-[#64748B]">Wholesale Dealer Application</div>
                      </td>
                      <td class="py-3 px-4 font-mono">GSTIN: 24AAAFK8912P1Z0</td>
                      <td class="py-3 px-4 text-[#64748B]">26 Oct 11:30</td>
                      <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">Pending Review</span></td>
                      <td class="py-3 px-4 text-right">
                        <button onclick="approveVerificationItem('Kisan Agro Distributors')" class="h-7 px-2.5 bg-[#0B6623] hover:bg-[#074818] text-white rounded-lg text-[10px] font-bold transition">Approve</button>
                      </td>
                    </tr>
                    <tr>
                      <td class="py-3 px-4">
                        <div class="font-bold">Gujarat Ginning & Oil Expellers</div>
                        <div class="text-[10px] text-[#64748B]">Industrial Processor Intake</div>
                      </td>
                      <td class="py-3 px-4 font-mono">CIN: U01100GJ2026PTC0981</td>
                      <td class="py-3 px-4 text-[#64748B]">25 Oct 16:45</td>
                      <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B6623]">Approved</span></td>
                      <td class="py-3 px-4 text-right">
                        <span class="text-[10px] font-bold text-emerald-700">Verified</span>
                      </td>
                    </tr>
                    <tr>
                      <td class="py-3 px-4">
                        <div class="font-bold">Pooja Sharma (FinTech Desk)</div>
                        <div class="text-[10px] text-[#64748B]">Portal Staff Admin Onboarding</div>
                      </td>
                      <td class="py-3 px-4 font-mono">EMP-AM-4419</td>
                      <td class="py-3 px-4 text-[#64748B]">25 Oct 14:00</td>
                      <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800">Active Staff</span></td>
                      <td class="py-3 px-4 text-right">
                        <button onclick="navigateTo('user-list', 'Users', 'User list')" class="h-7 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-[10px] font-bold transition">Manage</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- MODAL: MOVE MATRIX PROFILE TO USER MODULE -->
            <div id="assignRoleToUserModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#E5E7EB] p-6 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <div>
                    <h3 class="text-base font-black text-[#0F172A]">Assign Role Matrix to Users</h3>
                    <p class="text-xs text-[#64748B]">Synchronize current matrix rules with user profiles in the User module.</p>
                  </div>
                  <button type="button" onclick="closeAssignRoleToUserModal()" class="w-8 h-8 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 space-y-2 text-xs">
                  <div class="font-bold text-[#0F172A]">Target Role Matrix Profile:</div>
                  <div id="assignModalRoleName" class="font-black text-[#0B6623] text-sm">Super admin</div>
                  <p class="text-[#64748B] text-[11px]">
                    Applying this will update permission scopes for 14 active user accounts assigned to this role.
                  </p>
                </div>

                <div class="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-3 text-xs">
                  <button type="button" onclick="closeAssignRoleToUserModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                    Cancel
                  </button>
                  <button onclick="confirmRoleAssignment()" class="h-10 px-6 bg-[#0B6623] hover:bg-[#074818] text-white font-bold rounded-xl transition flex items-center gap-1.5 shadow-xs">
                    <i data-lucide="check" class="w-4 h-4"></i> Apply & Move to Users
                  </button>
                </div>
              </div>
            </div>

          </div>

          <!-- =============================================================
               COMPATIBILITY INTEGRATED VIEWS (Dealer Web Access, Industrial, Reviews)
               Unified with Role Matrix & User Module
               ============================================================= -->
          <div id="view-dealer-web-access" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-amber-50 to-white border border-amber-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 uppercase">Merged Architectural View</span>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Dealer Web Access Desk</h2>
                <p class="text-xs text-[#64748B]">Dealer portal credentials and ordering privileges are unified in the Role Matrix.</p>
              </div>
              <button onclick="navigateTo('role-matrix', 'Access', 'Role matrix'); switchAccessViewTab('dealer-access');" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                <i data-lucide="sliders" class="w-4 h-4"></i>
                <span>Open in Role Matrix</span>
              </button>
            </div>
          </div>

          <div id="view-industrial-web-access" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-purple-50 to-white border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 uppercase">Merged Architectural View</span>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Industrial Web Access Desk</h2>
                <p class="text-xs text-[#64748B]">Industrial mill procurement and weighbridge access permissions are unified in the Role Matrix.</p>
              </div>
              <button onclick="navigateTo('role-matrix', 'Access', 'Role matrix'); switchAccessViewTab('industrial-access');" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                <i data-lucide="sliders" class="w-4 h-4"></i>
                <span>Open in Role Matrix</span>
              </button>
            </div>
          </div>

          <div id="view-dealer-review" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-blue-50 to-white border border-blue-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-800 uppercase">Unified User Review Desk</span>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Dealer Verification Review</h2>
                <p class="text-xs text-[#64748B]">Dealer credit approvals and KYC documents are centralized in the Users management desk.</p>
              </div>
              <button onclick="navigateTo('user-list', 'Users', 'User list')" class="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                <i data-lucide="users" class="w-4 h-4"></i>
                <span>Open Users Management Desk</span>
              </button>
            </div>
          </div>

          <div id="view-industrial-review" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-purple-50 to-white border border-purple-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 uppercase">Unified User Review Desk</span>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Industrial Mill Review</h2>
                <p class="text-xs text-[#64748B]">Agro-processor registration and capacity verification are synchronized with the Users module.</p>
              </div>
              <button onclick="navigateTo('suppliers', 'Users', 'Suppliers')" class="h-9 px-4 bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                <i data-lucide="factory" class="w-4 h-4"></i>
                <span>Open Industrial Desk</span>
              </button>
            </div>
          </div>

          <div id="view-approvals" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-emerald-50 to-white border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 uppercase">Maker-Checker Authorization</span>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Unified Approvals Ledger</h2>
                <p class="text-xs text-[#64748B]">Commercial discounts, credit overrides, and user onboardings awaiting supervisor signature.</p>
              </div>
              <button onclick="navigateTo('role-matrix', 'Access', 'Role matrix'); switchAccessViewTab('b2b-reviews');" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                <i data-lucide="check-circle" class="w-4 h-4"></i>
                <span>Open Unified Approvals Desk</span>
              </button>
            </div>
          </div>

          <div id="view-admin-staff" class="hidden space-y-6 view-section">
            <div class="saas-card p-6 bg-gradient-to-r from-indigo-50 to-white border border-indigo-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span class="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800 uppercase">Administrative Profiles</span>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Admin Staff Desk</h2>
                <p class="text-xs text-[#64748B]">Staff access credentials and agronomy department assignments are unified with the User module.</p>
              </div>
              <button onclick="navigateTo('user-list', 'Users', 'User list')" class="h-9 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                <i data-lucide="users" class="w-4 h-4"></i>
                <span>Manage Staff in Users Desk</span>
              </button>
            </div>
          </div>
`;

const accessJs = `
// ============================================================================
// ROLE MATRIX & UNIFIED ACCESS GOVERNANCE CONTROLLER
// ============================================================================

const PORTAL_MODULES_PAGES_TREE = [
  {
    module: "Field Tools Module",
    pages: [
      { id: "ai-mitra", name: "AI Mitra Conversational Desk" },
      { id: "crop-doctor", name: "Crop Doctor Phytopathology" },
      { id: "soil-doctor", name: "Soil Doctor 12-Assay Cards" },
      { id: "crop-guide", name: "Crop Guide & Agronomy" },
      { id: "seed-guide", name: "Seed Variety Directory" },
      { id: "compost", name: "Compost & Organic Recipes" },
      { id: "farm-manager", name: "Farm Manager & Cadastral" },
      { id: "weather", name: "Weather & Spray Advisory" },
      { id: "scheme-applications", name: "Scheme Applications & DBT" }
    ]
  },
  {
    module: "Sales & Commercial Desk",
    pages: [
      { id: "sell-requests", name: "Farmer Sell Requests" },
      { id: "dealer-desk", name: "Dealer Desk Operations" },
      { id: "dealer-orders", name: "Dealer Wholesale Orders" },
      { id: "dealer-customers", name: "Dealer Customer Ledger" },
      { id: "offers-schemes", name: "Offers & Schemes Campaigns" }
    ]
  },
  {
    module: "Orders & Warehouse Logistics",
    pages: [
      { id: "all-orders", name: "All Orders Grid" },
      { id: "live-orders", name: "Live Dispatch Stream" },
      { id: "godown-incoming", name: "Godown & Inward Intake" },
      { id: "deliveries", name: "Deliveries & Fleet Tracking" }
    ]
  },
  {
    module: "Wallet & Payment Settlements",
    pages: [
      { id: "wallet-payouts", name: "Wallet Payouts & DBT" },
      { id: "pending-payments", name: "Pending Merchant Payments" }
    ]
  },
  {
    module: "Content & Agricultural Services",
    pages: [
      { id: "ads", name: "In-App Promotional Ads" },
      { id: "smart-alerts", name: "Smart SMS & Push Alerts" },
      { id: "farmer-community", name: "Farmer Q&A Community" },
      { id: "knowledge-hub", name: "Knowledge Hub Guides" },
      { id: "tool-rental", name: "Machinery & Tool Rental" },
      { id: "nearby-services", name: "Nearby Agricultural Services" },
      { id: "mandi-prices", name: "Realtime APMC Mandi Stream" }
    ]
  },
  {
    module: "Helpdesk & Support",
    pages: [
      { id: "help-support", name: "Help and Support Desk" }
    ]
  },
  {
    module: "Reports & Business Intelligence",
    pages: [
      { id: "reports-hub", name: "Reports Hub & Audit Ledger" },
      { id: "sales-report", name: "Sales Volume Report" },
      { id: "order-report", name: "Order Fulfillment Report" },
      { id: "wallet-report", name: "Wallet & Settlement Report" }
    ]
  },
  {
    module: "Settings & System Health",
    pages: [
      { id: "app-config", name: "App Configuration & Flags" },
      { id: "mobile-app", name: "Mobile App Version Control" },
      { id: "system-health", name: "Server & Microservice Telemetry" },
      { id: "audit-logs", name: "Security Audit Logs" },
      { id: "notification-settings", name: "Omni-Channel Gateways" }
    ]
  }
];

let selectedMatrixRole = "Super admin";

function renderRoleMatrixTree() {
  const tbody = document.getElementById("matrixTableBody");
  if (!tbody) return;

  let html = "";
  PORTAL_MODULES_PAGES_TREE.forEach((mod, modIdx) => {
    // Module Header Row
    html += \`
      <tr class="bg-[#F8FAFC]/80 font-black text-xs text-[#0F172A] border-t-2 border-[#E2E8F0]">
        <td class="py-2.5 px-4 flex items-center gap-2">
          <span class="w-2 h-2 rounded-full bg-[#0B6623]"></span>
          <span>\${mod.module}</span>
        </td>
        <td colspan="5" class="py-2.5 px-4 text-[10px] text-[#64748B] font-semibold text-center">
          Module Permissions Scope
        </td>
        <td class="py-2.5 px-4 text-right">
          <button type="button" onclick="toggleModuleRowPermissions('\${modIdx}', true)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-[#0B6623] hover:bg-emerald-100 mr-1">All</button>
          <button type="button" onclick="toggleModuleRowPermissions('\${modIdx}', false)" class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-600 hover:bg-slate-200">Clear</button>
        </td>
      </tr>
    \`;

    // Pages Under Module
    mod.pages.forEach(p => {
      const isSuper = selectedMatrixRole === "Super admin";
      const isFarmer = selectedMatrixRole === "Farmer";
      const defaultView = isSuper || isFarmer || selectedMatrixRole === "Dealer";
      const defaultCreate = isSuper;

      html += \`
        <tr class="hover:bg-[#F8FAFC] transition">
          <td class="py-2 px-4 pl-8 text-[#334155] font-semibold flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-slate-300"></span>
            <span>\${p.name}</span>
          </td>
          <td class="py-2 px-4 text-center">
            <input type="checkbox" \${defaultView ? 'checked' : ''} class="matrix-perm-chk rounded text-[#0B6623]" data-mod="\${modIdx}" data-perm="view">
          </td>
          <td class="py-2 px-4 text-center">
            <input type="checkbox" \${defaultCreate ? 'checked' : ''} class="matrix-perm-chk rounded text-[#0B6623]" data-mod="\${modIdx}" data-perm="create">
          </td>
          <td class="py-2 px-4 text-center">
            <input type="checkbox" \${isSuper ? 'checked' : ''} class="matrix-perm-chk rounded text-[#0B6623]" data-mod="\${modIdx}" data-perm="edit">
          </td>
          <td class="py-2 px-4 text-center">
            <input type="checkbox" \${isSuper ? 'checked' : ''} class="matrix-perm-chk rounded text-[#0B6623]" data-mod="\${modIdx}" data-perm="delete">
          </td>
          <td class="py-2 px-4 text-center">
            <input type="checkbox" \${isSuper || selectedMatrixRole === 'Analysis' ? 'checked' : ''} class="matrix-perm-chk rounded text-[#0B6623]" data-mod="\${modIdx}" data-perm="export">
          </td>
          <td class="py-2 px-4 text-right">
            <button type="button" onclick="toggleSingleRowPerms(this)" class="text-[10px] text-blue-600 hover:underline font-bold">Toggle Row</button>
          </td>
        </tr>
      \`;
    });
  });

  tbody.innerHTML = html;
}

function selectMatrixRole(role, btn) {
  selectedMatrixRole = role;
  const buttons = document.querySelectorAll(".matrix-role-btn");
  buttons.forEach(b => {
    b.className = "matrix-role-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] hover:bg-slate-100";
  });
  if (btn) btn.className = "matrix-role-btn px-3 py-1.5 rounded-xl text-xs font-black bg-[#0B6623] text-white shadow-xs";

  renderRoleMatrixTree();
  if (typeof showToast === "function") showToast(\`Loaded permission scopes for "\${role}".\`, "info");
}

function batchTogglePermissions(type, state) {
  const checkboxes = document.querySelectorAll(".matrix-perm-chk");
  checkboxes.forEach(c => {
    if (type === "all") {
      c.checked = state;
    } else if (type === "view") {
      if (c.getAttribute("data-perm") === "view") c.checked = state;
      else c.checked = false;
    }
  });
  if (typeof showToast === "function") showToast(state ? "Granted batch permissions across all pages." : "Revoked all batch permissions.", "info");
}

function toggleModuleRowPermissions(modIdx, state) {
  const checkboxes = document.querySelectorAll(\`.matrix-perm-chk[data-mod="\${modIdx}"]\`);
  checkboxes.forEach(c => c.checked = state);
}

function toggleSingleRowPerms(btn) {
  const tr = btn.closest("tr");
  if (!tr) return;
  const chks = tr.querySelectorAll("input[type='checkbox']");
  const anyChecked = [...chks].some(c => c.checked);
  chks.forEach(c => c.checked = !anyChecked);
}

function switchAccessViewTab(tab) {
  const tabs = ["matrix", "dealer-access", "industrial-access", "b2b-reviews"];
  tabs.forEach(t => {
    const btn = document.getElementById("accessTab-" + t);
    const pane = document.getElementById("accessPane-" + t);
    if (t === tab) {
      if (btn) btn.className = "px-4 py-2 rounded-xl bg-white text-[#0F172A] shadow-xs transition font-extrabold";
      if (pane) pane.classList.remove("hidden");
    } else {
      if (btn) btn.className = "px-4 py-2 rounded-xl text-[#64748B] hover:text-[#0F172A] transition";
      if (pane) pane.classList.add("hidden");
    }
  });
  if (window.lucide) lucide.createIcons();
}

function saveRoleMatrix() {
  if (typeof showToast === "function") showToast(\`Saved updated permission matrix for "\${selectedMatrixRole}".\`, "success");
}

function resetRoleMatrix() {
  renderRoleMatrixTree();
  if (typeof showToast === "function") showToast("Reset role matrix to baseline.", "info");
}

function openAssignRoleToUserModal() {
  const m = document.getElementById("assignRoleToUserModal");
  if (!m) return;
  document.getElementById("assignModalRoleName").textContent = selectedMatrixRole;
  m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeAssignRoleToUserModal() {
  const m = document.getElementById("assignRoleToUserModal");
  if (m) m.classList.add("hidden");
}

function confirmRoleAssignment() {
  closeAssignRoleToUserModal();
  if (typeof showToast === "function") showToast(\`Synchronized "\${selectedMatrixRole}" matrix rules with User module.\`, "success");
  setTimeout(() => {
    if (typeof navigateTo === "function") navigateTo("user-list", "Users", "User list");
  }, 700);
}

function approveVerificationItem(name) {
  if (typeof showToast === "function") showToast(\`Approved verification for "\${name}". Synchronized with User directory.\`, "success");
}

// Auto render matrix on ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderRoleMatrixTree);
} else {
  renderRoleMatrixTree();
}
`;

module.exports = {
  accessHtml,
  accessJs
};
