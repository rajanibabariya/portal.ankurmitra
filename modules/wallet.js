// modules/wallet.js
// A20 Wallet and payouts & A54 Pending payments

const walletHtml = `
          <!-- -------------------------------------------------------------
               VIEW: WALLET AND PAYOUTS (A20)
               ------------------------------------------------------------- -->
          <div id="view-wallet-payouts" class="hidden space-y-6 view-section">
            <!-- Header Controls & Date Chips -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex items-center gap-2">
                <span class="text-xs font-semibold text-[#64748B]">Period:</span>
                <div class="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl text-xs font-medium text-[#475569]">
                  <button class="px-3 py-1 rounded-lg bg-white text-[#0B6623] font-bold shadow-sm">Today</button>
                  <button class="px-3 py-1 rounded-lg hover:text-[#0F172A]">Week</button>
                  <button class="px-3 py-1 rounded-lg hover:text-[#0F172A]">Month</button>
                  <button class="px-3 py-1 rounded-lg hover:text-[#0F172A]">Quarter</button>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <button onclick="exportWalletPayoutsCSV()" class="px-3.5 py-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A] flex items-center gap-2">
                  <i data-lucide="download" class="w-4 h-4 text-[#64748B]"></i>
                  <span>Export CSV</span>
                </button>
                <button onclick="openSendPayoutModal('Hiteshbhai Patel', 'Industrial', 'Cotton F2I', 143000)" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                  <i data-lucide="send" class="w-4 h-4"></i>
                  <span>Send Payout</span>
                </button>
              </div>
            </div>

            <!-- KPI Cards: Total revenue, Pending payout, Paid today -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Total revenue</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">+18.4%</span>
                </div>
                <div class="text-3xl font-extrabold text-[#0F172A] mt-2">₹ 12,40,000</div>
                <p class="text-xs text-[#64748B] mt-1">Platform gross transaction volume (MTD)</p>
              </div>

              <div class="saas-card p-5 border-amber-200 bg-amber-50/20">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-amber-800">Pending payout</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">1 awaiting approval</span>
                </div>
                <div class="text-3xl font-extrabold text-amber-900 mt-2">₹ 1,43,000</div>
                <p class="text-xs text-[#64748B] mt-1">Hiteshbhai Patel • Cotton Shankar-6 F2I</p>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Paid today</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">4 settled</span>
                </div>
                <div class="text-3xl font-extrabold text-[#0B6623] mt-2">₹ 86,400</div>
                <p class="text-xs text-[#64748B] mt-1">Disbursed via automated bank IMPS/NEFT</p>
              </div>
            </div>

            <!-- Search, Role Filter, Table -->
            <div class="saas-card overflow-hidden">
              <div class="p-4 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC]">
                <div class="relative w-full sm:w-72">
                  <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>
                  <input type="text" id="walletPayoutsSearchInput" onkeyup="filterWalletPayoutsTable()" placeholder="Search payee or type..." class="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#0B6623]">
                </div>
                <div class="flex items-center gap-2">
                  <select id="walletPayoutsRoleFilter" onchange="filterWalletPayoutsTable()" class="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#0B6623]">
                    <option value="all">All Roles</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Industrial">Industrial</option>
                    <option value="Dealer">Dealer</option>
                  </select>
                  <select id="walletPayoutsStatusFilter" onchange="filterWalletPayoutsTable()" class="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#0B6623]">
                    <option value="all">All Status</option>
                    <option value="Completed">Completed</option>
                    <option value="Pending">Pending</option>
                  </select>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table" id="walletPayoutsTable">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3">Payee Name</th>
                      <th class="px-5 py-3">Role</th>
                      <th class="px-5 py-3">Transaction Type</th>
                      <th class="px-5 py-3">Amount</th>
                      <th class="px-5 py-3">Status</th>
                      <th class="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium text-[#0F172A]">
                    <tr class="hover:bg-[#F8FAFC] transition-colors" data-role="Farmer" data-status="Completed">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Jayesh Patel</div>
                        <div class="text-[11px] text-[#64748B]">Sudavad • ID: #FRM-2041</div>
                      </td>
                      <td class="px-5 py-3.5">
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Farmer</span>
                      </td>
                      <td class="px-5 py-3.5 text-[#475569]">Groundnut sale (Lot #GN-402)</td>
                      <td class="px-5 py-3.5 font-bold text-[#0B6623]">+₹ 10,400</td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Completed
                        </span>
                      </td>
                      <td class="px-5 py-3.5 text-right">
                        <button onclick="viewPayoutReceipt('Jayesh Patel', '+₹ 10,400', 'Groundnut sale', 'TXN-90241')" class="px-3 py-1 rounded-lg border border-[#E5E7EB] hover:bg-slate-50 text-[11px] font-bold text-[#475569]">Receipt</button>
                      </td>
                    </tr>
                    <tr class="hover:bg-amber-50/40 bg-amber-50/20 transition-colors" data-role="Industrial" data-status="Pending">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Hiteshbhai Patel</div>
                        <div class="text-[11px] text-[#64748B]">Patel Agro Industries • Amreli</div>
                      </td>
                      <td class="px-5 py-3.5">
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-300">Industrial</span>
                      </td>
                      <td class="px-5 py-3.5 text-[#475569]">Cotton F2I (20 Qtl direct delivery)</td>
                      <td class="px-5 py-3.5 font-extrabold text-[#0F172A]">₹ 1,43,000</td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Pending
                        </span>
                      </td>
                      <td class="px-5 py-3.5 text-right">
                        <button onclick="openSendPayoutModal('Hiteshbhai Patel', 'Industrial', 'Cotton F2I', 143000)" class="px-3.5 py-1.5 rounded-lg bg-[#0B6623] hover:bg-[#09521C] text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5 ml-auto">
                          <i data-lucide="send" class="w-3.5 h-3.5"></i>
                          <span>Send payout</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors" data-role="Dealer" data-status="Completed">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Rameshbhai</div>
                        <div class="text-[11px] text-[#64748B]">Kishan Agro • Bagasara</div>
                      </td>
                      <td class="px-5 py-3.5">
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Dealer</span>
                      </td>
                      <td class="px-5 py-3.5 text-[#475569]">Urea sale (10 bags settlement)</td>
                      <td class="px-5 py-3.5 font-bold text-[#0B6623]">+₹ 2,700</td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Completed
                        </span>
                      </td>
                      <td class="px-5 py-3.5 text-right">
                        <button onclick="viewPayoutReceipt('Rameshbhai', '+₹ 2,700', 'Urea sale', 'TXN-90242')" class="px-3 py-1 rounded-lg border border-[#E5E7EB] hover:bg-slate-50 text-[11px] font-bold text-[#475569]">Receipt</button>
                      </td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors" data-role="Farmer" data-status="Completed">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Rambhai Ahir</div>
                        <div class="text-[11px] text-[#64748B]">Sudavad • ID: #FRM-1988</div>
                      </td>
                      <td class="px-5 py-3.5">
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">Farmer</span>
                      </td>
                      <td class="px-5 py-3.5 text-[#475569]">Castor sale (Lot #CST-109)</td>
                      <td class="px-5 py-3.5 font-bold text-[#0B6623]">+₹ 18,500</td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Completed
                        </span>
                      </td>
                      <td class="px-5 py-3.5 text-right">
                        <button onclick="viewPayoutReceipt('Rambhai Ahir', '+₹ 18,500', 'Castor sale', 'TXN-90243')" class="px-3 py-1 rounded-lg border border-[#E5E7EB] hover:bg-slate-50 text-[11px] font-bold text-[#475569]">Receipt</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: PENDING PAYMENTS (A54)
               ------------------------------------------------------------- -->
          <div id="view-pending-payments" class="hidden space-y-6 view-section">
            <!-- Header Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex items-center gap-3">
                <span class="text-xs font-semibold text-[#64748B]">Outstanding Receivables Overview</span>
                <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">Active credit line</span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="sendBulkPaymentReminders()" class="px-3.5 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                  <i data-lucide="bell" class="w-4 h-4"></i>
                  <span>Send All Reminders</span>
                </button>
              </div>
            </div>

            <!-- KPI Card: Due ₹ 12,400 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div class="saas-card p-5 border-amber-200 bg-amber-50/20">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-amber-800">Total Due</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">Overdue</span>
                </div>
                <div class="text-3xl font-extrabold text-amber-900 mt-2">₹ 12,400</div>
                <p class="text-xs text-[#64748B] mt-1">Pending payments across 4 farmer accounts</p>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Overdue > 7 Days</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-700">1 account</span>
                </div>
                <div class="text-3xl font-extrabold text-[#0F172A] mt-2">₹ 4,330</div>
                <p class="text-xs text-[#64748B] mt-1">Hareshbhai • Bio-fertilizer batch</p>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Avg Settlement Speed</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">Healthy</span>
                </div>
                <div class="text-3xl font-extrabold text-[#0B6623] mt-2">4.2 Days</div>
                <p class="text-xs text-[#64748B] mt-1">From billing to dealer bank deposit</p>
              </div>
            </div>

            <!-- Table: Customer, Item, Amount, Status, Actions -->
            <div class="saas-card overflow-hidden">
              <div class="p-4 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC]">
                <div class="relative w-full sm:w-72">
                  <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>
                  <input type="text" id="pendingPaymentsSearchInput" onkeyup="filterPendingPaymentsTable()" placeholder="Search customer or item..." class="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#0B6623]">
                </div>
                <div class="text-xs text-[#64748B]">
                  Showing 4 overdue accounts
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table" id="pendingPaymentsTable">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3">Customer</th>
                      <th class="px-5 py-3">Item</th>
                      <th class="px-5 py-3">Amount</th>
                      <th class="px-5 py-3">Due Date</th>
                      <th class="px-5 py-3">Status</th>
                      <th class="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium text-[#0F172A]">
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Jayesh Patel</div>
                        <div class="text-[11px] text-[#64748B]">Sudavad • +91 98251 12345</div>
                      </td>
                      <td class="px-5 py-3.5 text-[#475569]">Urea (10 bags)</td>
                      <td class="px-5 py-3.5 font-extrabold text-[#0F172A]">₹ 2,700</td>
                      <td class="px-5 py-3.5 text-[#64748B]">12 Oct 2026</td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pending
                        </span>
                      </td>
                      <td class="px-5 py-3.5 text-right">
                        <button onclick="sendPaymentReminder('Jayesh Patel', '₹ 2,700', 'Urea', '+91 98251 12345')" class="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5 ml-auto">
                          <i data-lucide="bell" class="w-3.5 h-3.5"></i>
                          <span>Send reminder</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Rambhai</div>
                        <div class="text-[11px] text-[#64748B]">Sudavad • +91 98251 23456</div>
                      </td>
                      <td class="px-5 py-3.5 text-[#475569]">Seed (GS-20 8 pkts)</td>
                      <td class="px-5 py-3.5 font-extrabold text-[#0F172A]">₹ 1,920</td>
                      <td class="px-5 py-3.5 text-[#64748B]">14 Oct 2026</td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pending
                        </span>
                      </td>
                      <td class="px-5 py-3.5 text-right">
                        <button onclick="sendPaymentReminder('Rambhai', '₹ 1,920', 'Seed', '+91 98251 23456')" class="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5 ml-auto">
                          <i data-lucide="bell" class="w-3.5 h-3.5"></i>
                          <span>Send reminder</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Bharatbhai</div>
                        <div class="text-[11px] text-[#64748B]">Bagasara • +91 98251 34567</div>
                      </td>
                      <td class="px-5 py-3.5 text-[#475569]">Micro-nutrients & Zinc</td>
                      <td class="px-5 py-3.5 font-extrabold text-[#0F172A]">₹ 3,450</td>
                      <td class="px-5 py-3.5 text-[#64748B]">10 Oct 2026</td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pending
                        </span>
                      </td>
                      <td class="px-5 py-3.5 text-right">
                        <button onclick="sendPaymentReminder('Bharatbhai', '₹ 3,450', 'Micro-nutrients', '+91 98251 34567')" class="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5 ml-auto">
                          <i data-lucide="bell" class="w-3.5 h-3.5"></i>
                          <span>Send reminder</span>
                        </button>
                      </td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Hareshbhai</div>
                        <div class="text-[11px] text-[#64748B]">Amreli • +91 98251 45678</div>
                      </td>
                      <td class="px-5 py-3.5 text-[#475569]">Bio-fertilizer & Neem cake</td>
                      <td class="px-5 py-3.5 font-extrabold text-[#0F172A]">₹ 4,330</td>
                      <td class="px-5 py-3.5 text-[#64748B]">08 Oct 2026</td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pending
                        </span>
                      </td>
                      <td class="px-5 py-3.5 text-right">
                        <button onclick="sendPaymentReminder('Hareshbhai', '₹ 4,330', 'Bio-fertilizer', '+91 98251 45678')" class="px-3.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-[11px] font-bold text-white shadow-sm flex items-center gap-1.5 ml-auto">
                          <i data-lucide="bell" class="w-3.5 h-3.5"></i>
                          <span>Send reminder</span>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
`;

const walletJs = `
    // Wallet & Payout Controllers
    function filterWalletPayoutsTable() {
      const q = (document.getElementById('walletPayoutsSearchInput')?.value || '').toLowerCase();
      const role = document.getElementById('walletPayoutsRoleFilter')?.value || 'all';
      const status = document.getElementById('walletPayoutsStatusFilter')?.value || 'all';
      const rows = document.querySelectorAll('#walletPayoutsTable tbody tr');
      rows.forEach(r => {
        const text = r.textContent.toLowerCase();
        const rRole = r.getAttribute('data-role');
        const rStatus = r.getAttribute('data-status');
        const mQ = !q || text.includes(q);
        const mRole = role === 'all' || rRole === role;
        const mStatus = status === 'all' || rStatus === status;
        r.style.display = (mQ && mRole && mStatus) ? '' : 'none';
      });
    }

    function openSendPayoutModal(name, role, type, amount) {
      const modal = document.getElementById('sendPayoutModal');
      if (!modal) {
        showToast('Sending payout of ₹ ' + amount.toLocaleString('en-IN') + ' to ' + name + ' (' + type + ')...', 'info');
        setTimeout(() => {
          showToast('Payout of ₹ ' + amount.toLocaleString('en-IN') + ' disbursed successfully via HDFC NEFT Ref #TXN98241', 'success');
        }, 900);
        return;
      }
      document.getElementById('payoutModalPayee').textContent = name + ' (' + role + ')';
      document.getElementById('payoutModalType').textContent = type;
      document.getElementById('payoutModalAmount').textContent = '₹ ' + amount.toLocaleString('en-IN');
      modal.classList.remove('hidden');
    }

    function closeSendPayoutModal() {
      const modal = document.getElementById('sendPayoutModal');
      if (modal) modal.classList.add('hidden');
    }

    function confirmProcessPayout() {
      closeSendPayoutModal();
      showToast('Payout of ₹ 1,43,000 disbursed to Hiteshbhai Patel via HDFC IMPS. Ref #TXN98241029', 'success');
    }

    function viewPayoutReceipt(name, amount, type, txnId) {
      showToast('Downloading receipt for ' + name + ' (' + amount + ' - ' + txnId + ')...', 'info');
    }

    function exportWalletPayoutsCSV() {
      showToast('Exporting Wallet Payouts ledger as CSV...', 'info');
    }

    // Pending Payments Controllers
    function filterPendingPaymentsTable() {
      const q = (document.getElementById('pendingPaymentsSearchInput')?.value || '').toLowerCase();
      const rows = document.querySelectorAll('#pendingPaymentsTable tbody tr');
      rows.forEach(r => {
        r.style.display = !q || r.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    }

    function sendPaymentReminder(customer, amount, item, phone) {
      showToast('Payment reminder sent to ' + customer + ' (' + phone + ') for ' + item + ' (' + amount + ') via WhatsApp & SMS', 'success');
    }

    function sendBulkPaymentReminders() {
      showToast('Payment reminders dispatched to all 4 overdue accounts via WhatsApp & SMS', 'success');
    }
`;

module.exports = { walletHtml, walletJs };
