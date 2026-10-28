// modules/reports.js
// Reports Module: A31 Reports hub, A32 Sales report, A33 Order report, Master report, A37 Wallet report, A64 Performance reports, A53 Dealer sales report, A36 Crop report, A35 Location report, A34 User report

const reportsHtml = `
          <!-- -------------------------------------------------------------
               VIEW: REPORTS HUB (A31)
               ------------------------------------------------------------- -->
          <div id="view-reports-hub" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white rounded-full">Super admin · Full access</span>
                <!-- Filter chips: Today, Week, Month -->
                <div class="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl text-xs font-medium text-[#475569]">
                  <button class="px-3 py-1 rounded-lg bg-white text-[#0B6623] font-bold shadow-sm">Today</button>
                  <button class="px-3 py-1 rounded-lg hover:text-[#0F172A]">Week</button>
                  <button class="px-3 py-1 rounded-lg hover:text-[#0F172A]">Month</button>
                </div>
              </div>
              <button onclick="navigateTo('performance-reports', 'Reports', 'Performance reports')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                <i data-lucide="activity" class="w-4 h-4"></i>
                <span>Open performance reports</span>
              </button>
            </div>

            <!-- Eight cards with sparkline and "Open":
                 Sales ₹ 12,40,000, Orders 64, Users 1,484, Location 3 places, Crops 6,
                 Wallet pending ₹ 1,43,000, Dealer Kishan Agro ₹ 86,400, Industry F2I ₹ 1,43,000 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <!-- Card 1: Sales -->
              <div class="saas-card p-5 hover:border-[#0B6623] transition-all">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Sales</span>
                  <button onclick="navigateTo('sales-report', 'Reports', 'Sales report')" class="text-xs font-bold text-[#0B6623] hover:underline flex items-center gap-1">Open &rarr;</button>
                </div>
                <div class="text-2xl font-extrabold text-[#0F172A] mt-2">₹ 12,40,000</div>
                <div class="mt-3 h-8 flex items-end gap-1">
                  <div class="w-full bg-emerald-100 h-3 rounded-sm"></div>
                  <div class="w-full bg-emerald-200 h-5 rounded-sm"></div>
                  <div class="w-full bg-emerald-300 h-4 rounded-sm"></div>
                  <div class="w-full bg-emerald-400 h-6 rounded-sm"></div>
                  <div class="w-full bg-[#0B6623] h-8 rounded-sm"></div>
                </div>
              </div>

              <!-- Card 2: Orders -->
              <div class="saas-card p-5 hover:border-[#0B6623] transition-all">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Orders</span>
                  <button onclick="navigateTo('order-report', 'Reports', 'Order report')" class="text-xs font-bold text-[#0B6623] hover:underline flex items-center gap-1">Open &rarr;</button>
                </div>
                <div class="text-2xl font-extrabold text-[#0F172A] mt-2">64 Orders</div>
                <div class="mt-3 h-8 flex items-end gap-1">
                  <div class="w-full bg-blue-100 h-4 rounded-sm"></div>
                  <div class="w-full bg-blue-200 h-6 rounded-sm"></div>
                  <div class="w-full bg-blue-300 h-5 rounded-sm"></div>
                  <div class="w-full bg-blue-400 h-7 rounded-sm"></div>
                  <div class="w-full bg-blue-600 h-8 rounded-sm"></div>
                </div>
              </div>

              <!-- Card 3: Users -->
              <div class="saas-card p-5 hover:border-[#0B6623] transition-all">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Users</span>
                  <button onclick="navigateTo('user-report', 'Reports', 'User report')" class="text-xs font-bold text-[#0B6623] hover:underline flex items-center gap-1">Open &rarr;</button>
                </div>
                <div class="text-2xl font-extrabold text-[#0F172A] mt-2">1,484</div>
                <div class="mt-3 h-8 flex items-end gap-1">
                  <div class="w-full bg-teal-100 h-2 rounded-sm"></div>
                  <div class="w-full bg-teal-200 h-4 rounded-sm"></div>
                  <div class="w-full bg-teal-300 h-5 rounded-sm"></div>
                  <div class="w-full bg-teal-400 h-6 rounded-sm"></div>
                  <div class="w-full bg-teal-600 h-8 rounded-sm"></div>
                </div>
              </div>

              <!-- Card 4: Location -->
              <div class="saas-card p-5 hover:border-[#0B6623] transition-all">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Location</span>
                  <button onclick="navigateTo('location-report', 'Reports', 'Location report')" class="text-xs font-bold text-[#0B6623] hover:underline flex items-center gap-1">Open &rarr;</button>
                </div>
                <div class="text-2xl font-extrabold text-[#0F172A] mt-2">3 Places</div>
                <div class="text-[11px] text-[#64748B] mt-2">Amreli • Bagasara • Sudavad</div>
                <div class="w-full bg-[#F1F5F9] h-2 rounded-full mt-3 overflow-hidden">
                  <div class="bg-[#0B6623] h-full" style="width: 78%"></div>
                </div>
              </div>

              <!-- Card 5: Crops -->
              <div class="saas-card p-5 hover:border-[#0B6623] transition-all">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Crops</span>
                  <button onclick="navigateTo('crop-report', 'Reports', 'Crop report')" class="text-xs font-bold text-[#0B6623] hover:underline flex items-center gap-1">Open &rarr;</button>
                </div>
                <div class="text-2xl font-extrabold text-[#0F172A] mt-2">6 Active</div>
                <div class="text-[11px] text-[#64748B] mt-2">Cotton, Groundnut, Wheat, Cumin...</div>
                <div class="w-full bg-[#F1F5F9] h-2 rounded-full mt-3 overflow-hidden">
                  <div class="bg-[#7CB342] h-full" style="width: 90%"></div>
                </div>
              </div>

              <!-- Card 6: Wallet Pending -->
              <div class="saas-card p-5 hover:border-[#0B6623] transition-all border-amber-200 bg-amber-50/20">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-amber-800">Wallet Pending</span>
                  <button onclick="navigateTo('wallet-report', 'Reports', 'Wallet report')" class="text-xs font-bold text-amber-900 hover:underline flex items-center gap-1">Open &rarr;</button>
                </div>
                <div class="text-2xl font-extrabold text-amber-900 mt-2">₹ 1,43,000</div>
                <div class="text-[11px] text-[#64748B] mt-2">1 industrial settlement awaiting</div>
                <div class="w-full bg-[#F1F5F9] h-2 rounded-full mt-3 overflow-hidden">
                  <div class="bg-amber-500 h-full" style="width: 45%"></div>
                </div>
              </div>

              <!-- Card 7: Dealer Kishan Agro -->
              <div class="saas-card p-5 hover:border-[#0B6623] transition-all">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Dealer Kishan Agro</span>
                  <button onclick="navigateTo('dealer-sales-report', 'Reports', 'Dealer sales report')" class="text-xs font-bold text-[#0B6623] hover:underline flex items-center gap-1">Open &rarr;</button>
                </div>
                <div class="text-2xl font-extrabold text-[#0F172A] mt-2">₹ 86,400</div>
                <div class="text-[11px] text-[#64748B] mt-2">14 customer orders fulfilled</div>
                <div class="w-full bg-[#F1F5F9] h-2 rounded-full mt-3 overflow-hidden">
                  <div class="bg-blue-500 h-full" style="width: 65%"></div>
                </div>
              </div>

              <!-- Card 8: Industry F2I -->
              <div class="saas-card p-5 hover:border-[#0B6623] transition-all">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Industry F2I</span>
                  <button onclick="navigateTo('wallet-report', 'Reports', 'Wallet report')" class="text-xs font-bold text-[#0B6623] hover:underline flex items-center gap-1">Open &rarr;</button>
                </div>
                <div class="text-2xl font-extrabold text-[#0F172A] mt-2">₹ 1,43,000</div>
                <div class="text-[11px] text-[#64748B] mt-2">Patel Agro direct mill sourcing</div>
                <div class="w-full bg-[#F1F5F9] h-2 rounded-full mt-3 overflow-hidden">
                  <div class="bg-[#0B6623] h-full" style="width: 82%"></div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: SALES REPORT (A32)
               Filters: 1 Oct to 15 Oct, Place "All", Crop "All", Button "Export"
               Green column chart by day. Table columns Date, Crop, Amount.
               Total line "Total ₹ 1,56,100"
               ------------------------------------------------------------- -->
          <div id="view-sales-report" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex flex-wrap items-center gap-3">
                <div class="flex items-center gap-1 text-xs font-semibold text-[#64748B]">
                  <span>Dates:</span>
                  <span class="px-2.5 py-1 rounded-lg bg-[#F1F5F9] text-[#0F172A] font-bold">1 October – 15 October</span>
                </div>
                <select class="px-3 py-1.5 bg-[#F1F5F9] border-0 rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none">
                  <option>Place: All</option>
                  <option>Sudavad</option>
                  <option>Bagasara</option>
                  <option>Amreli</option>
                </select>
                <select class="px-3 py-1.5 bg-[#F1F5F9] border-0 rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none">
                  <option>Crop: All</option>
                  <option>Cotton</option>
                  <option>Groundnut</option>
                  <option>Wheat</option>
                </select>
              </div>
              <button onclick="exportSalesReport()" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                <i data-lucide="download" class="w-4 h-4"></i>
                <span>Export</span>
              </button>
            </div>

            <!-- Green Column Chart by Day -->
            <div class="saas-card p-5">
              <h4 class="text-xs font-bold text-[#0F172A] mb-3">Daily Sales Volume (1 Oct – 15 Oct)</h4>
              <div class="h-64">
                <canvas id="chartSalesReportDaily"></canvas>
              </div>
            </div>

            <!-- Table: Date, Crop, Amount. Total line: Total ₹ 1,56,100 -->
            <div class="saas-card overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3">Date</th>
                      <th class="px-5 py-3">Crop / Item</th>
                      <th class="px-5 py-3">Channel / Buyer</th>
                      <th class="px-5 py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium text-[#0F172A]">
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold">15 October</td>
                      <td class="px-5 py-3.5">Cotton (Shankar-6 20 Qtl)</td>
                      <td class="px-5 py-3.5 text-[#475569]">F2I • Patel Agro Industries</td>
                      <td class="px-5 py-3.5 text-right font-bold text-[#0F172A]">₹ 1,43,000</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold">14 October</td>
                      <td class="px-5 py-3.5">Groundnut (GG-20 2 Qtl)</td>
                      <td class="px-5 py-3.5 text-[#475569]">F2C • Direct Order</td>
                      <td class="px-5 py-3.5 text-right font-bold text-[#0F172A]">₹ 10,400</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold">14 October</td>
                      <td class="px-5 py-3.5">Urea (10 Bags)</td>
                      <td class="px-5 py-3.5 text-[#475569]">Dealer • Kishan Agro</td>
                      <td class="px-5 py-3.5 text-right font-bold text-[#0F172A]">₹ 2,700</td>
                    </tr>
                  </tbody>
                  <tfoot>
                    <tr class="bg-[#F8FAFC] border-t-2 border-[#E5E7EB] font-extrabold text-[#0F172A] text-xs">
                      <td colspan="3" class="px-5 py-3.5 text-right text-xs uppercase tracking-wider text-[#64748B]">Total</td>
                      <td class="px-5 py-3.5 text-right text-sm text-[#0B6623]">Total ₹ 1,56,100</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: ORDER REPORT (A33)
               Four KPI cards: Total 64, Completed 40, On the way 21, Cancelled 3
               Stacked bar by status. Table: Status, Count, Amount.
               Completed 40 ₹ 8,20,000, On the way 21 ₹ 3,40,000, Pending 9 ₹ 80,000, Cancelled 3 ₹ 12,000
               ------------------------------------------------------------- -->
          <div id="view-order-report" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="text-xs font-semibold text-[#64748B]">Order Pipeline & Fulfillment Analytics</div>
              <button onclick="showToast('Exporting order report...', 'info')" class="px-4 py-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A] flex items-center gap-2">
                <i data-lucide="download" class="w-4 h-4 text-[#64748B]"></i>
                <span>Export Report</span>
              </button>
            </div>

            <!-- Four KPI cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Total Orders</span>
                <div class="text-3xl font-extrabold text-[#0F172A] mt-2">64</div>
                <p class="text-xs text-[#64748B] mt-1">Platform gross order intake</p>
              </div>

              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-emerald-700">Completed</span>
                <div class="text-3xl font-extrabold text-[#0B6623] mt-2">40</div>
                <p class="text-xs text-[#64748B] mt-1">Delivered & settled (62.5%)</p>
              </div>

              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-blue-700">On the way</span>
                <div class="text-3xl font-extrabold text-blue-600 mt-2">21</div>
                <p class="text-xs text-[#64748B] mt-1">In transit via logistics vans</p>
              </div>

              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-red-600">Cancelled</span>
                <div class="text-3xl font-extrabold text-red-600 mt-2">3</div>
                <p class="text-xs text-[#64748B] mt-1">Weather or stockouts (4.6%)</p>
              </div>
            </div>

            <!-- Stacked bar chart by status -->
            <div class="saas-card p-5">
              <h4 class="text-xs font-bold text-[#0F172A] mb-3">Order Status Distribution</h4>
              <div class="h-44">
                <canvas id="chartOrderStatusStacked"></canvas>
              </div>
            </div>

            <!-- Table: Status, Count, Amount -->
            <div class="saas-card overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3">Fulfillment Status</th>
                      <th class="px-5 py-3">Order Count</th>
                      <th class="px-5 py-3">Percentage</th>
                      <th class="px-5 py-3 text-right">Settled Amount</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium text-[#0F172A]">
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold text-emerald-800 flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Completed
                      </td>
                      <td class="px-5 py-3.5 font-bold">40</td>
                      <td class="px-5 py-3.5 text-[#64748B]">62.5%</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-[#0B6623]">₹ 8,20,000</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold text-blue-800 flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span> On the way
                      </td>
                      <td class="px-5 py-3.5 font-bold">21</td>
                      <td class="px-5 py-3.5 text-[#64748B]">32.8%</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-blue-700">₹ 3,40,000</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold text-amber-800 flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Pending
                      </td>
                      <td class="px-5 py-3.5 font-bold">9</td>
                      <td class="px-5 py-3.5 text-[#64748B]">14.0%</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-amber-800">₹ 80,000</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold text-red-700 flex items-center gap-2">
                        <span class="w-2.5 h-2.5 rounded-full bg-red-500"></span> Cancelled
                      </td>
                      <td class="px-5 py-3.5 font-bold">3</td>
                      <td class="px-5 py-3.5 text-[#64748B]">4.6%</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-red-600">₹ 12,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: MASTER REPORT (All Masters Included)
               Consolidated audit across Crops, Locations, Categories, Products, Schemes, Channels, Languages, Units
               ------------------------------------------------------------- -->
          <div id="view-master-report" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex items-center gap-3">
                <span class="text-xs font-semibold text-[#64748B]">Comprehensive Master Data Dictionary Audit</span>
                <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">253 Total Catalog Entries</span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="showToast('Re-indexing all 8 master databases across regional caches...', 'info')" class="px-3.5 py-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A] flex items-center gap-2">
                  <i data-lucide="refresh-cw" class="w-4 h-4 text-[#64748B]"></i>
                  <span>Rebuild Caches</span>
                </button>
                <button onclick="showToast('Exporting complete master data JSON/CSV dictionary...', 'info')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                  <i data-lucide="download" class="w-4 h-4"></i>
                  <span>Export Dictionary</span>
                </button>
              </div>
            </div>

            <!-- Master Data Grid: 8 Entities -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#0F172A]">Crop Master</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700">6 Crops</span>
                </div>
                <p class="text-xs text-[#64748B] mt-2">Cotton, Groundnut, Wheat, Cumin, Castor, Maize</p>
                <div class="mt-3 pt-2 border-t border-[#E5E7EB] text-[11px] text-[#0B6623] font-bold flex items-center justify-between">
                  <span>Synced</span>
                  <button onclick="navigateTo('crop-master', 'Masters', 'Crop master')" class="hover:underline">View master &rarr;</button>
                </div>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#0F172A]">Location Master</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700">3 Talukas</span>
                </div>
                <p class="text-xs text-[#64748B] mt-2">Amreli, Bagasara, Kunkavav • 24 active villages</p>
                <div class="mt-3 pt-2 border-t border-[#E5E7EB] text-[11px] text-[#0B6623] font-bold flex items-center justify-between">
                  <span>Synced</span>
                  <button onclick="navigateTo('location-master', 'Masters', 'Location master')" class="hover:underline">View master &rarr;</button>
                </div>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#0F172A]">Category Master</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-purple-50 text-purple-700">8 Categories</span>
                </div>
                <p class="text-xs text-[#64748B] mt-2">Seeds, Fertilizers, Pesticides, Machinery, Tools...</p>
                <div class="mt-3 pt-2 border-t border-[#E5E7EB] text-[11px] text-[#0B6623] font-bold flex items-center justify-between">
                  <span>Synced</span>
                  <button onclick="navigateTo('category-master', 'Masters', 'Category master')" class="hover:underline">View master &rarr;</button>
                </div>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#0F172A]">Product Master</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800">18 SKUs</span>
                </div>
                <p class="text-xs text-[#64748B] mt-2">Certified input inventory with barcode tracking</p>
                <div class="mt-3 pt-2 border-t border-[#E5E7EB] text-[11px] text-[#0B6623] font-bold flex items-center justify-between">
                  <span>Synced</span>
                  <button onclick="navigateTo('product-master', 'Masters', 'Product master')" class="hover:underline">View master &rarr;</button>
                </div>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#0F172A]">Scheme Master</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-teal-50 text-teal-800">8 Schemes</span>
                </div>
                <p class="text-xs text-[#64748B] mt-2">PM-Kisan, i-Khedut, Solar Pump, Micro Irrigation...</p>
                <div class="mt-3 pt-2 border-t border-[#E5E7EB] text-[11px] text-[#0B6623] font-bold flex items-center justify-between">
                  <span>Synced</span>
                  <button onclick="navigateTo('scheme-master', 'Masters', 'Scheme master')" class="hover:underline">View master &rarr;</button>
                </div>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#0F172A]">Sell Channels</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-800">10 Channels</span>
                </div>
                <p class="text-xs text-[#64748B] mt-2">F2C, F2R, F2I, Dealer In-Store, Online Delivery...</p>
                <div class="mt-3 pt-2 border-t border-[#E5E7EB] text-[11px] text-[#0B6623] font-bold flex items-center justify-between">
                  <span>Synced</span>
                  <button onclick="navigateTo('sell-channels', 'Masters', 'Sell channels')" class="hover:underline">View master &rarr;</button>
                </div>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#0F172A]">Language Master</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800">3 Languages</span>
                </div>
                <p class="text-xs text-[#64748B] mt-2">English (Default portal chrome), Gujarati, Hindi</p>
                <div class="mt-3 pt-2 border-t border-[#E5E7EB] text-[11px] text-[#0B6623] font-bold flex items-center justify-between">
                  <span>Synced</span>
                  <button onclick="navigateTo('language-master', 'Masters', 'Language master')" class="hover:underline">View master &rarr;</button>
                </div>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#0F172A]">Unit Master</span>
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-800">6 Units</span>
                </div>
                <p class="text-xs text-[#64748B] mt-2">Quintal (100 kg), Mann (20 kg), Bag (50 kg), Acre...</p>
                <div class="mt-3 pt-2 border-t border-[#E5E7EB] text-[11px] text-[#0B6623] font-bold flex items-center justify-between">
                  <span>Synced</span>
                  <button onclick="navigateTo('unit-master', 'Masters', 'Unit master')" class="hover:underline">View master &rarr;</button>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: WALLET REPORT (A37)
               Two lines on one chart: Income green, Expense amber.
               Table: Date, Income, Expense, Pending.
               15 October ₹ 1,56,100, ₹ 12,400, ₹ 1,43,000. 14 October ₹ 86,400, ₹ 4,200, ₹ 82,200.
               Button "Export"
               ------------------------------------------------------------- -->
          <div id="view-wallet-report" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="text-xs font-semibold text-[#64748B]">Wallet Payouts & Settlement Cashflow Report</div>
              <button onclick="showToast('Exporting wallet reconciliation report...', 'info')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                <i data-lucide="download" class="w-4 h-4"></i>
                <span>Export</span>
              </button>
            </div>

            <!-- Two lines on one chart: Income green, Expense amber -->
            <div class="saas-card p-5">
              <div class="flex items-center justify-between mb-3">
                <h4 class="text-xs font-bold text-[#0F172A]">Income vs Expense Cashflow</h4>
                <div class="flex items-center gap-4 text-xs font-semibold">
                  <span class="flex items-center gap-1.5 text-emerald-700"><span class="w-3 h-1 bg-[#0B6623] rounded-full"></span> Income</span>
                  <span class="flex items-center gap-1.5 text-amber-700"><span class="w-3 h-1 bg-amber-500 rounded-full"></span> Expense</span>
                </div>
              </div>
              <div class="h-64">
                <canvas id="chartWalletIncomeExpense"></canvas>
              </div>
            </div>

            <!-- Table: Date, Income, Expense, Pending -->
            <div class="saas-card overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3">Date</th>
                      <th class="px-5 py-3">Gross Income</th>
                      <th class="px-5 py-3">Expense / Fees</th>
                      <th class="px-5 py-3 text-right">Pending Settlement</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium text-[#0F172A]">
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold">15 October</td>
                      <td class="px-5 py-3.5 font-bold text-[#0B6623]">₹ 1,56,100</td>
                      <td class="px-5 py-3.5 font-bold text-amber-700">₹ 12,400</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-[#0F172A]">₹ 1,43,000</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold">14 October</td>
                      <td class="px-5 py-3.5 font-bold text-[#0B6623]">₹ 86,400</td>
                      <td class="px-5 py-3.5 font-bold text-amber-700">₹ 4,200</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-[#0F172A]">₹ 82,200</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: PERFORMANCE REPORTS (A64)
               Analysis role view. Filters 1-15 October, All places, role chips.
               Four chart tiles: area Orders vs revenue; donut Users by role;
               stacked Place mix; line Mandi wheat/cotton. Heatmap 3x4 places vs crops.
               ------------------------------------------------------------- -->
          <div id="view-performance-reports" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white rounded-full">Analysis</span>
                <span class="text-xs font-semibold text-[#64748B]">1–15 October • Amreli District Ecosystem</span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="showToast('Exporting CSV performance dataset...', 'info')" class="px-3.5 py-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A]">Export CSV</button>
                <button onclick="showToast('Generating signed PDF audit brief...', 'info')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm">Export PDF</button>
              </div>
            </div>

            <!-- Role Chips -->
            <div class="flex flex-wrap items-center gap-2 bg-white p-3 rounded-2xl border border-[#E5E7EB] text-xs font-medium">
              <span class="text-[#64748B] font-bold mr-1">Role Filter:</span>
              <span class="px-3 py-1 rounded-lg bg-[#0B6623] text-white font-bold cursor-pointer">Super admin</span>
              <span class="px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-slate-200 cursor-pointer">Operate</span>
              <span class="px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-slate-200 cursor-pointer">Maintenance</span>
              <span class="px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-slate-200 cursor-pointer">Analysis</span>
              <span class="px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-slate-200 cursor-pointer">Dealer</span>
              <span class="px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-slate-200 cursor-pointer">Industrial</span>
              <span class="px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-slate-200 cursor-pointer">Farmer</span>
              <span class="px-3 py-1 rounded-lg bg-[#F1F5F9] text-[#475569] hover:bg-slate-200 cursor-pointer">Retailer</span>
            </div>

            <!-- Four Chart Tiles -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- Chart 1: Area Orders vs Revenue -->
              <div class="saas-card p-5">
                <h4 class="text-xs font-bold text-[#0F172A] mb-3">Area: Orders vs Revenue</h4>
                <div class="h-56">
                  <canvas id="chartPerfOrdersVsRev"></canvas>
                </div>
              </div>

              <!-- Chart 2: Donut Users by Role -->
              <div class="saas-card p-5">
                <h4 class="text-xs font-bold text-[#0F172A] mb-3">Donut: Users by Role</h4>
                <div class="h-56 flex items-center justify-center">
                  <canvas id="chartPerfUsersByRole"></canvas>
                </div>
              </div>

              <!-- Chart 3: Stacked Place Mix -->
              <div class="saas-card p-5">
                <h4 class="text-xs font-bold text-[#0F172A] mb-3">Stacked: Place Mix (Sudavad / Bagasara / Amreli)</h4>
                <div class="h-56">
                  <canvas id="chartPerfPlaceMix"></canvas>
                </div>
              </div>

              <!-- Chart 4: Line Mandi Wheat/Cotton -->
              <div class="saas-card p-5">
                <h4 class="text-xs font-bold text-[#0F172A] mb-3">Line: Mandi Trends (Wheat vs Cotton)</h4>
                <div class="h-56">
                  <canvas id="chartPerfMandiTrends"></canvas>
                </div>
              </div>
            </div>

            <!-- Heatmap 3x4 places vs crops -->
            <div class="saas-card p-5">
              <h4 class="text-xs font-bold text-[#0F172A] mb-3">Heatmap: Places vs Crops Acreage Density</h4>
              <div class="overflow-x-auto">
                <table class="w-full text-center border-collapse">
                  <thead>
                    <tr class="text-xs font-bold text-[#64748B] border-b border-[#E5E7EB]">
                      <th class="py-2.5 px-4 text-left">Village / Cluster</th>
                      <th class="py-2.5 px-4">Cotton</th>
                      <th class="py-2.5 px-4">Groundnut</th>
                      <th class="py-2.5 px-4">Wheat</th>
                      <th class="py-2.5 px-4">Cumin</th>
                    </tr>
                  </thead>
                  <tbody class="text-xs font-semibold divide-y divide-[#E5E7EB]">
                    <tr>
                      <td class="py-3 px-4 text-left font-bold text-[#0F172A]">Sudavad</td>
                      <td class="py-3 px-4"><span class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold block">180 Acres (High)</span></td>
                      <td class="py-3 px-4"><span class="px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold block">140 Acres</span></td>
                      <td class="py-3 px-4"><span class="px-3 py-1.5 rounded-lg bg-emerald-200 text-emerald-900 font-bold block">60 Acres</span></td>
                      <td class="py-3 px-4"><span class="px-3 py-1.5 rounded-lg bg-emerald-100 text-emerald-800 font-bold block">35 Acres</span></td>
                    </tr>
                    <tr>
                      <td class="py-3 px-4 text-left font-bold text-[#0F172A]">Bagasara</td>
                      <td class="py-3 px-4"><span class="px-3 py-1.5 rounded-lg bg-emerald-400 text-emerald-950 font-bold block">110 Acres</span></td>
                      <td class="py-3 px-4"><span class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold block">210 Acres (High)</span></td>
                      <td class="py-3 px-4"><span class="px-3 py-1.5 rounded-lg bg-emerald-300 text-emerald-900 font-bold block">90 Acres</span></td>
                      <td class="py-3 px-4"><span class="px-3 py-1.5 rounded-lg bg-emerald-200 text-emerald-900 font-bold block">50 Acres</span></td>
                    </tr>
                    <tr>
                      <td class="py-3 px-4 text-left font-bold text-[#0F172A]">Amreli Yard</td>
                      <td class="py-3 px-4"><span class="px-3 py-1.5 rounded-lg bg-emerald-500 text-white font-bold block">160 Acres</span></td>
                      <td class="py-3 px-4"><span class="px-3 py-1.5 rounded-lg bg-emerald-300 text-emerald-900 font-bold block">95 Acres</span></td>
                      <td class="py-3 px-4"><span class="px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold block">240 Acres (High)</span></td>
                      <td class="py-3 px-4"><span class="px-3 py-1.5 rounded-lg bg-emerald-400 text-emerald-950 font-bold block">115 Acres</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: DEALER SALES REPORT (A53)
               Shop "Kishan Agro". Chips Today, Week, Month.
               KPI "Revenue ₹ 86,400", "Orders 14". Bar by item: Urea, Seed, Pesticide.
               Table: Item, Amount. Urea ₹ 2,700, Seed ₹ 1,920. Button "Export"
               ------------------------------------------------------------- -->
          <div id="view-dealer-sales-report" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div>
                <span class="text-xs font-bold text-[#0F172A]">Kishan Agro • Bagasara Store</span>
                <p class="text-[11px] text-[#64748B]">Dealer Retail Sourcing & Distribution Performance</p>
              </div>
              <div class="flex items-center gap-3">
                <div class="flex items-center gap-1 bg-[#F1F5F9] p-1 rounded-xl text-xs font-medium text-[#475569]">
                  <button class="px-3 py-1 rounded-lg bg-white text-[#0B6623] font-bold shadow-sm">Today</button>
                  <button class="px-3 py-1 rounded-lg hover:text-[#0F172A]">Week</button>
                  <button class="px-3 py-1 rounded-lg hover:text-[#0F172A]">Month</button>
                </div>
                <button onclick="showToast('Exporting dealer sales ledger...', 'info')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                  <i data-lucide="download" class="w-4 h-4"></i>
                  <span>Export</span>
                </button>
              </div>
            </div>

            <!-- KPIs: Revenue ₹ 86,400, Orders 14 -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Revenue</span>
                <div class="text-3xl font-extrabold text-[#0F172A] mt-2">₹ 86,400</div>
                <p class="text-xs text-[#64748B] mt-1">Retail store sales fulfilled</p>
              </div>

              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Orders</span>
                <div class="text-3xl font-extrabold text-[#0B6623] mt-2">14</div>
                <p class="text-xs text-[#64748B] mt-1">Direct farmer collections</p>
              </div>

              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Top Selling Category</span>
                <div class="text-3xl font-extrabold text-blue-600 mt-2">Fertilizer</div>
                <p class="text-xs text-[#64748B] mt-1">Urea & DAP 48% of sales</p>
              </div>
            </div>

            <!-- Bar by Item: Urea, Seed, Pesticide -->
            <div class="saas-card p-5">
              <h4 class="text-xs font-bold text-[#0F172A] mb-3">Sales Volume by Input Category</h4>
              <div class="h-52">
                <canvas id="chartDealerSalesByItem"></canvas>
              </div>
            </div>

            <!-- Table: Item, Amount -->
            <div class="saas-card overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3">Item Name</th>
                      <th class="px-5 py-3">Category</th>
                      <th class="px-5 py-3">Units Sold</th>
                      <th class="px-5 py-3 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium text-[#0F172A]">
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Urea</td>
                      <td class="px-5 py-3.5 text-[#475569]">Fertilizer (10 Bags)</td>
                      <td class="px-5 py-3.5 font-bold">10 Bags</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-[#0B6623]">₹ 2,700</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Seed</td>
                      <td class="px-5 py-3.5 text-[#475569]">GS-20 Groundnut</td>
                      <td class="px-5 py-3.5 font-bold">8 Packets</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-[#0B6623]">₹ 1,920</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Pesticide</td>
                      <td class="px-5 py-3.5 text-[#475569]">Neem Oil & Bio-guard</td>
                      <td class="px-5 py-3.5 font-bold">4 Bottles</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-[#0B6623]">₹ 1,840</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: CROP REPORT (A36) - SUGGESTED
               ------------------------------------------------------------- -->
          <div id="view-crop-report" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="text-xs font-semibold text-[#64748B]">Regional Crop Cultivation & Yield Analysis</div>
              <button onclick="showToast('Exporting crop report...', 'info')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                <i data-lucide="download" class="w-4 h-4"></i>
                <span>Export Report</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Total Sown Area</span>
                <div class="text-3xl font-extrabold text-[#0F172A] mt-2">1,240 Acres</div>
                <p class="text-xs text-[#64748B] mt-1">Across 24 surveyed villages</p>
              </div>

              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Primary Kharif Crop</span>
                <div class="text-3xl font-extrabold text-[#0B6623] mt-2">Cotton (48%)</div>
                <p class="text-xs text-[#64748B] mt-1">595 Acres under Shankar-6</p>
              </div>

              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Groundnut Acreage</span>
                <div class="text-3xl font-extrabold text-amber-600 mt-2">GG-20 (36%)</div>
                <p class="text-xs text-[#64748B] mt-1">446 Acres under GG-20</p>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: LOCATION REPORT (A35) - SUGGESTED
               ------------------------------------------------------------- -->
          <div id="view-location-report" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="text-xs font-semibold text-[#64748B]">Taluka & Village Penetration Analytics</div>
              <button onclick="showToast('Exporting location report...', 'info')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                <i data-lucide="download" class="w-4 h-4"></i>
                <span>Export Report</span>
              </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Sudavad Hub</span>
                <div class="text-3xl font-extrabold text-[#0B6623] mt-2">520 Farmers</div>
                <p class="text-xs text-[#64748B] mt-1">84% Smartphone app adoption</p>
              </div>

              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Bagasara Cluster</span>
                <div class="text-3xl font-extrabold text-blue-600 mt-2">480 Farmers</div>
                <p class="text-xs text-[#64748B] mt-1">12 Certified Input Dealers</p>
              </div>

              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Amreli Yard Zone</span>
                <div class="text-3xl font-extrabold text-amber-600 mt-2">484 Farmers</div>
                <p class="text-xs text-[#64748B] mt-1">Main Mandi & Industrial Units</p>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: USER REPORT (A34) - SUGGESTED
               ------------------------------------------------------------- -->
          <div id="view-user-report" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="text-xs font-semibold text-[#64748B]">User Base Growth & Role Demographics</div>
              <button onclick="showToast('Exporting user report...', 'info')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                <i data-lucide="download" class="w-4 h-4"></i>
                <span>Export Report</span>
              </button>
            </div>

            <!-- Table: Role, Active, Pending, Rejected -->
            <div class="saas-card overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3">Role</th>
                      <th class="px-5 py-3">Active</th>
                      <th class="px-5 py-3">Pending Verification</th>
                      <th class="px-5 py-3">Rejected</th>
                      <th class="px-5 py-3 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium text-[#0F172A]">
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Farmer</td>
                      <td class="px-5 py-3.5 font-bold text-[#0B6623]">1,180</td>
                      <td class="px-5 py-3.5 text-amber-700">40</td>
                      <td class="px-5 py-3.5 text-red-600">20</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-[#0F172A]">1,240</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Dealer</td>
                      <td class="px-5 py-3.5 font-bold text-[#0B6623]">80</td>
                      <td class="px-5 py-3.5 text-amber-700">4</td>
                      <td class="px-5 py-3.5 text-red-600">2</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-[#0F172A]">86</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Retailer</td>
                      <td class="px-5 py-3.5 font-bold text-[#0B6623]">130</td>
                      <td class="px-5 py-3.5 text-amber-700">6</td>
                      <td class="px-5 py-3.5 text-red-600">4</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-[#0F172A]">140</td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Industrial</td>
                      <td class="px-5 py-3.5 font-bold text-[#0B6623]">16</td>
                      <td class="px-5 py-3.5 text-amber-700">2</td>
                      <td class="px-5 py-3.5 text-red-600">0</td>
                      <td class="px-5 py-3.5 text-right font-extrabold text-[#0F172A]">18</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
`;

const reportsJs = `
    // Reports Module Controllers & Chart Instances
    let chartSalesReportDailyInstance = null;
    let chartOrderStatusStackedInstance = null;
    let chartWalletIncomeExpenseInstance = null;
    let chartPerfOrdersVsRevInstance = null;
    let chartPerfUsersByRoleInstance = null;
    let chartPerfPlaceMixInstance = null;
    let chartPerfMandiTrendsInstance = null;
    let chartDealerSalesByItemInstance = null;

    function exportSalesReport() {
      showToast('Exporting Sales Report (1-15 Oct)...', 'info');
    }

    function initReportCharts() {
      // 1. Sales Report Column Chart
      const ctxSalesDaily = document.getElementById('chartSalesReportDaily');
      if (ctxSalesDaily && typeof Chart !== 'undefined') {
        if (chartSalesReportDailyInstance) chartSalesReportDailyInstance.destroy();
        chartSalesReportDailyInstance = new Chart(ctxSalesDaily, {
          type: 'bar',
          data: {
            labels: ['1 Oct', '3 Oct', '5 Oct', '7 Oct', '9 Oct', '11 Oct', '13 Oct', '14 Oct', '15 Oct'],
            datasets: [{
              label: 'Sales (₹)',
              data: [12000, 18400, 24000, 31000, 42000, 68000, 75000, 99500, 156100],
              backgroundColor: '#0B6623',
              borderRadius: 6
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { ticks: { callback: v => '₹ ' + (v >= 1000 ? (v/1000) + 'k' : v) } }
            }
          }
        });
      }

      // 2. Order Status Stacked
      const ctxOrderStatus = document.getElementById('chartOrderStatusStacked');
      if (ctxOrderStatus && typeof Chart !== 'undefined') {
        if (chartOrderStatusStackedInstance) chartOrderStatusStackedInstance.destroy();
        chartOrderStatusStackedInstance = new Chart(ctxOrderStatus, {
          type: 'bar',
          data: {
            labels: ['Week 1', 'Week 2'],
            datasets: [
              { label: 'Completed', data: [18, 22], backgroundColor: '#0B6623' },
              { label: 'On the way', data: [8, 13], backgroundColor: '#00A6C7' },
              { label: 'Cancelled', data: [1, 2], backgroundColor: '#EF4444' }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { x: { stacked: true }, y: { stacked: true } }
          }
        });
      }

      // 3. Wallet Income vs Expense
      const ctxWallet = document.getElementById('chartWalletIncomeExpense');
      if (ctxWallet && typeof Chart !== 'undefined') {
        if (chartWalletIncomeExpenseInstance) chartWalletIncomeExpenseInstance.destroy();
        chartWalletIncomeExpenseInstance = new Chart(ctxWallet, {
          type: 'line',
          data: {
            labels: ['10 Oct', '11 Oct', '12 Oct', '13 Oct', '14 Oct', '15 Oct'],
            datasets: [
              { label: 'Income', data: [42000, 65000, 89000, 72000, 86400, 156100], borderColor: '#0B6623', tension: 0.3 },
              { label: 'Expense', data: [3100, 4500, 5200, 3900, 4200, 12400], borderColor: '#F59E0B', tension: 0.3 }
            ]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false
          }
        });
      }

      // 4. Performance Reports - 4 tiles
      const ctxP1 = document.getElementById('chartPerfOrdersVsRev');
      if (ctxP1 && typeof Chart !== 'undefined') {
        if (chartPerfOrdersVsRevInstance) chartPerfOrdersVsRevInstance.destroy();
        chartPerfOrdersVsRevInstance = new Chart(ctxP1, {
          type: 'line',
          data: {
            labels: ['1-3 Oct', '4-6 Oct', '7-9 Oct', '10-12 Oct', '13-15 Oct'],
            datasets: [{ label: 'Revenue (₹)', data: [120000, 240000, 480000, 720000, 1240000], borderColor: '#0B6623', fill: true, backgroundColor: 'rgba(11, 102, 35, 0.1)' }]
          },
          options: { responsive: true, maintainAspectRatio: false }
        });
      }

      const ctxP2 = document.getElementById('chartPerfUsersByRole');
      if (ctxP2 && typeof Chart !== 'undefined') {
        if (chartPerfUsersByRoleInstance) chartPerfUsersByRoleInstance.destroy();
        chartPerfUsersByRoleInstance = new Chart(ctxP2, {
          type: 'doughnut',
          data: {
            labels: ['Farmer (1,240)', 'Retailer (140)', 'Dealer (86)', 'Industrial (18)'],
            datasets: [{ data: [1240, 140, 86, 18], backgroundColor: ['#0B6623', '#7CB342', '#00A6C7', '#F59E0B'] }]
          },
          options: { responsive: true, maintainAspectRatio: false }
        });
      }

      const ctxP3 = document.getElementById('chartPerfPlaceMix');
      if (ctxP3 && typeof Chart !== 'undefined') {
        if (chartPerfPlaceMixInstance) chartPerfPlaceMixInstance.destroy();
        chartPerfPlaceMixInstance = new Chart(ctxP3, {
          type: 'bar',
          data: {
            labels: ['Sudavad', 'Bagasara', 'Amreli'],
            datasets: [
              { label: 'Cotton', data: [180, 110, 160], backgroundColor: '#0B6623' },
              { label: 'Groundnut', data: [140, 210, 95], backgroundColor: '#7CB342' }
            ]
          },
          options: { responsive: true, maintainAspectRatio: false, scales: { x: { stacked: true }, y: { stacked: true } } }
        });
      }

      const ctxP4 = document.getElementById('chartPerfMandiTrends');
      if (ctxP4 && typeof Chart !== 'undefined') {
        if (chartPerfMandiTrendsInstance) chartPerfMandiTrendsInstance.destroy();
        chartPerfMandiTrendsInstance = new Chart(ctxP4, {
          type: 'line',
          data: {
            labels: ['10 Oct', '11 Oct', '12 Oct', '13 Oct', '14 Oct', '15 Oct'],
            datasets: [
              { label: 'Cotton (₹/Qtl)', data: [7050, 7100, 7080, 7120, 7100, 7150], borderColor: '#0B6623' },
              { label: 'Wheat (₹/Qtl)', data: [2380, 2390, 2400, 2410, 2415, 2425], borderColor: '#F59E0B' }
            ]
          },
          options: { responsive: true, maintainAspectRatio: false }
        });
      }

      // 5. Dealer Sales by Item
      const ctxD = document.getElementById('chartDealerSalesByItem');
      if (ctxD && typeof Chart !== 'undefined') {
        if (chartDealerSalesByItemInstance) chartDealerSalesByItemInstance.destroy();
        chartDealerSalesByItemInstance = new Chart(ctxD, {
          type: 'bar',
          data: {
            labels: ['Urea', 'Seed GS-20', 'Pesticide Bio-guard'],
            datasets: [{ label: 'Sales (₹)', data: [2700, 1920, 1840], backgroundColor: ['#0B6623', '#7CB342', '#00A6C7'] }]
          },
          options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
        });
      }
    }
`;

module.exports = { reportsHtml, reportsJs };
