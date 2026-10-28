// builder_content_full.js
// Exports contentHtml, contentJs
// 100% English only. Zero Gujarati characters. Modern 2026 SaaS design.

const fs = require('fs');

// We load the existing pristine first 4 views from modules/content.js
const currentContent = fs.readFileSync('modules/content.js', 'utf8');
const pToolRental = currentContent.indexOf('id="view-tool-rental"');
const divStart = currentContent.lastIndexOf('<div', pToolRental);
const first4Html = currentContent.substring(currentContent.indexOf('const contentHtml = `') + 21, divStart);

const remaining3Html = `
          <!-- =============================================================
               VIEW: TOOL RENTAL (Equipment & Machinery Registry + Booking)
               ============================================================= -->
          <div id="view-tool-rental" class="hidden space-y-6 view-section">
            
            <!-- Header Strip -->
            <div class="saas-card p-6 bg-gradient-to-r from-emerald-50/80 via-white to-amber-50/60 border border-emerald-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <span class="w-2 h-2 rounded-full bg-[#0B6623] animate-pulse"></span>
                  Farm Mechanization & Implement Rental Hub
                </div>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">Tool rental</h2>
                <p class="text-xs text-[#64748B] mt-0.5 font-medium">
                  Rent high-capacity tractors, combine harvesters, drone sprayers, laser land levelers, and rotavators with guaranteed uptime.
                </p>
              </div>
              <div class="flex flex-wrap items-center gap-2.5">
                <button onclick="openAddToolModal()" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="plus" class="w-4 h-4"></i>
                  <span>List New Tool</span>
                </button>
                <button onclick="exportToolLedger()" class="h-9 px-3.5 bg-white hover:bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="download" class="w-4 h-4 text-[#64748B]"></i>
                  <span>Export Ledger</span>
                </button>
              </div>
            </div>

            <!-- KPI Summary Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="saas-card p-5 border-l-4 border-l-[#0B6623]">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Active Implements</span>
                  <span class="w-8 h-8 rounded-xl bg-emerald-50 text-[#0B6623] flex items-center justify-center">
                    <i data-lucide="wrench" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2" id="kpiActiveTools">48 Tools</div>
                <div class="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                  <i data-lucide="check-circle-2" class="w-3 h-3"></i> 36 available now
                </div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-blue-600">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Active Shifts</span>
                  <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <i data-lucide="calendar" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">19 Bookings</div>
                <div class="text-[11px] text-blue-700 font-bold mt-1">Operating in 12 villages</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-amber-500">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Hours Clocked</span>
                  <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <i data-lucide="clock" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">1,420 Hours</div>
                <div class="text-[11px] text-amber-700 font-bold mt-1">This harvesting season</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-purple-600">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Owner Earnings</span>
                  <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <i data-lucide="indian-rupee" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">INR 6.45 Lakhs</div>
                <div class="text-[11px] text-purple-700 font-bold mt-1">Settled directly via wallet</div>
              </div>
            </div>

            <!-- Toolbar & Filter Bar -->
            <div class="saas-card p-6 space-y-4">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div class="flex flex-wrap items-center gap-2.5">
                  <div class="relative">
                    <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>
                    <input id="toolSearchInput" oninput="filterToolsTable()" type="text" placeholder="Search implement or owner..." class="h-9 pl-9 pr-3 text-xs bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-medium outline-none focus:border-[#0B6623] w-64 transition">
                  </div>
                  
                  <select id="toolCategoryFilter" onchange="filterToolsTable()" class="h-9 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#334155] outline-none focus:border-[#0B6623]">
                    <option value="ALL">All Categories</option>
                    <option value="Tractors">Tractors</option>
                    <option value="Harvesters">Harvesters</option>
                    <option value="Drones">Spraying Drones</option>
                    <option value="Tillers">Power Tillers & Rotavators</option>
                    <option value="Laser Levelers">Laser Land Levelers</option>
                  </select>

                  <select id="toolAvailabilityFilter" onchange="filterToolsTable()" class="h-9 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#334155] outline-none focus:border-[#0B6623]">
                    <option value="ALL">All Statuses</option>
                    <option value="Available">Available Now</option>
                    <option value="Booked">Currently Booked</option>
                    <option value="Maintenance">In Maintenance</option>
                  </select>
                </div>

                <div class="text-xs font-bold text-[#64748B]" id="toolsCountDisplay">
                  Showing 6 Implements
                </div>
              </div>

              <!-- Tools Data Table -->
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="bg-[#F8FAFC] text-[#64748B] font-bold border-y border-[#E5E7EB]">
                    <tr>
                      <th class="py-3 px-4">Equipment & Model</th>
                      <th class="py-3 px-4">Category</th>
                      <th class="py-3 px-4">Daily / Hourly Rate</th>
                      <th class="py-3 px-4">Security Deposit</th>
                      <th class="py-3 px-4">Owner & Location</th>
                      <th class="py-3 px-4">Status</th>
                      <th class="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="toolsTableBody" class="divide-y divide-[#E5E7EB] font-medium text-[#0F172A]">
                    <!-- Rendered by renderToolsTable() -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- MODAL: ADD TOOL -->
            <div id="addToolModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E7EB]">
                <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white z-10">
                  <div>
                    <h3 class="text-lg font-black text-[#0F172A]">List New Tool / Machinery</h3>
                    <p class="text-xs text-[#64748B]">Make farm equipment available for rental to fellow cultivators.</p>
                  </div>
                  <button type="button" onclick="closeAddToolModal()" class="w-8 h-8 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <form onsubmit="handleSaveTool(event)" class="p-6 space-y-4 text-xs">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Equipment Name <span class="text-rose-500">*</span></label>
                      <input id="newToolName" type="text" required placeholder="e.g. John Deere 5050D 4WD" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Category <span class="text-rose-500">*</span></label>
                      <select id="newToolCategory" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                        <option value="Tractors">Tractors</option>
                        <option value="Harvesters">Harvesters</option>
                        <option value="Drones">Spraying Drones</option>
                        <option value="Tillers">Power Tillers & Rotavators</option>
                        <option value="Laser Levelers">Laser Land Levelers</option>
                      </select>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Specifications / HP</label>
                      <input id="newToolSpecs" type="text" placeholder="e.g. 50 HP / 4WD / Dual Clutch" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Daily Rate (INR) <span class="text-rose-500">*</span></label>
                      <input id="newToolDailyRate" type="number" required placeholder="e.g. 2500" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Hourly Rate (INR)</label>
                      <input id="newToolHourlyRate" type="number" placeholder="e.g. 450" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Security Deposit (INR)</label>
                      <input id="newToolDeposit" type="number" value="3000" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Owner Name <span class="text-rose-500">*</span></label>
                      <input id="newToolOwner" type="text" required placeholder="e.g. Jayesh Patel" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Village / Location</label>
                      <input id="newToolLocation" type="text" value="Sudavad, Amreli" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                  </div>

                  <div class="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                    <button type="button" onclick="closeAddToolModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                      Cancel
                    </button>
                    <button type="submit" class="h-10 px-6 bg-[#0B6623] hover:bg-[#074818] text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                      <i data-lucide="check" class="w-4 h-4"></i> Save Implement
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: VIEW TOOL -->
            <div id="viewToolModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#E5E7EB] overflow-hidden">
                <div class="p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-start justify-between">
                  <div>
                    <span id="viewToolBadge" class="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase">Tractor</span>
                    <h3 id="viewToolTitle" class="text-xl font-black mt-2">John Deere 5050D (50 HP 4WD)</h3>
                    <p id="viewToolOwner" class="text-xs text-emerald-100 mt-0.5">Owned by Jayesh Patel • Sudavad Village</p>
                  </div>
                  <button type="button" onclick="closeViewToolModal()" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <div class="p-6 space-y-4 text-xs">
                  <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Daily Rate</span>
                      <span id="viewToolDaily" class="font-extrabold text-[#0B6623] text-sm">INR 2,800</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Hourly Rate</span>
                      <span id="viewToolHourly" class="font-bold text-[#0F172A] text-sm">INR 550</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Deposit</span>
                      <span id="viewToolDeposit" class="font-bold text-[#0F172A] text-sm">INR 4,000</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Status</span>
                      <span id="viewToolStatus" class="font-bold text-emerald-700 text-sm">Available</span>
                    </div>
                  </div>

                  <div>
                    <h4 class="font-bold text-[#0F172A] mb-1">Specifications & Equipment Rules</h4>
                    <p id="viewToolSpecs" class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] text-[#64748B] leading-relaxed">
                      Equipped with high-torque diesel engine, power steering, oil-immersed disc brakes, and auxiliary hydraulic remotes. Includes qualified operator on request.
                    </p>
                  </div>

                  <div class="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-2.5">
                    <button type="button" onclick="closeViewToolModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                      Close
                    </button>
                    <button id="viewToolBookBtn" type="button" class="h-10 px-6 bg-[#0B6623] hover:bg-[#074818] text-white font-bold rounded-xl transition flex items-center gap-1.5">
                      <i data-lucide="calendar-check" class="w-4 h-4"></i> Book This Tool
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- MODAL: BOOK TOOL -->
            <div id="bookToolModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#E5E7EB] overflow-hidden">
                <div class="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
                  <div>
                    <h3 class="text-base font-black text-[#0F172A]">Book Farm Implement</h3>
                    <p id="bookModalToolTitle" class="text-xs text-emerald-800 font-bold">John Deere 5050D 4WD</p>
                  </div>
                  <button type="button" onclick="closeBookToolModal()" class="w-8 h-8 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <form onsubmit="handleConfirmBooking(event)" class="p-6 space-y-4 text-xs">
                  <input type="hidden" id="bookModalToolId">
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Rental Start Date <span class="text-rose-500">*</span></label>
                      <input id="bookStartDate" type="date" required value="2026-10-27" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Duration (Days) <span class="text-rose-500">*</span></label>
                      <input id="bookDuration" type="number" min="1" max="30" value="2" oninput="calculateBookingTotal()" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-bold outline-none focus:border-[#0B6623]">
                    </div>
                  </div>

                  <div>
                    <label class="block font-bold text-[#0F172A] mb-1">Farmer / Booking Name <span class="text-rose-500">*</span></label>
                    <input id="bookFarmerName" type="text" required value="Ramesh Patel" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Contact Phone</label>
                      <input id="bookFarmerPhone" type="tel" value="+91 98251 90812" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Delivery Method</label>
                      <select id="bookDeliveryMethod" onchange="calculateBookingTotal()" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold">
                        <option value="pickup">Self-Pickup at Yard</option>
                        <option value="delivery">Doorstep Farm Delivery (+₹350)</option>
                      </select>
                    </div>
                  </div>

                  <!-- Price Breakdown -->
                  <div class="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 space-y-2 text-xs">
                    <div class="flex items-center justify-between text-[#64748B]">
                      <span>Rental Fee (<span id="calcDaysDisplay">2 days</span>):</span>
                      <span id="calcRentalFee" class="font-bold text-[#0F172A]">INR 5,600</span>
                    </div>
                    <div class="flex items-center justify-between text-[#64748B]">
                      <span>Refundable Security Deposit:</span>
                      <span id="calcDepositFee" class="font-bold text-[#0F172A]">INR 4,000</span>
                    </div>
                    <div class="flex items-center justify-between text-[#64748B]">
                      <span>Logistics & Delivery:</span>
                      <span id="calcDeliveryFee" class="font-bold text-[#0F172A]">INR 0</span>
                    </div>
                    <div class="pt-2 border-t border-emerald-200 flex items-center justify-between font-black text-sm text-[#0B6623]">
                      <span>Total Estimated Payable:</span>
                      <span id="calcTotalFee">INR 9,600</span>
                    </div>
                  </div>

                  <div class="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                    <button type="button" onclick="closeBookToolModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                      Cancel
                    </button>
                    <button type="submit" class="h-10 px-6 bg-[#0B6623] hover:bg-[#074818] text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                      <i data-lucide="check" class="w-4 h-4"></i> Confirm Booking
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>


          <!-- =============================================================
               VIEW: NEARBY SERVICES (Agri-Services, Spraying & Storage)
               ============================================================= -->
          <div id="view-nearby-services" class="hidden space-y-6 view-section">
            
            <!-- Header Strip -->
            <div class="saas-card p-6 bg-gradient-to-r from-blue-50/80 via-white to-emerald-50/60 border border-blue-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-blue-700">
                  <span class="w-2 h-2 rounded-full bg-blue-600 animate-pulse"></span>
                  Agricultural Services & Rural Support Hub
                </div>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">Nearby services</h2>
                <p class="text-xs text-[#64748B] mt-0.5 font-medium">
                  Connect with certified tractor repair workshops, drone spraying crews, soil testing laboratories, cold storage chambers, and borewell engineers.
                </p>
              </div>
              <div class="flex flex-wrap items-center gap-2.5">
                <button onclick="openAddServiceModal()" class="h-9 px-4 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="plus" class="w-4 h-4"></i>
                  <span>Register Service</span>
                </button>
                <button onclick="exportServicesList()" class="h-9 px-3.5 bg-white hover:bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="download" class="w-4 h-4 text-[#64748B]"></i>
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <!-- KPI Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="saas-card p-5 border-l-4 border-l-blue-600">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Verified Providers</span>
                  <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <i data-lucide="badge-check" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">84 Hubs</div>
                <div class="text-[11px] text-blue-700 font-bold mt-1">Across 11 Amreli Talukas</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-emerald-600">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Ready for Dispatch</span>
                  <span class="w-8 h-8 rounded-xl bg-emerald-50 text-[#0B6623] flex items-center justify-center">
                    <i data-lucide="truck" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">62 Teams</div>
                <div class="text-[11px] text-emerald-700 font-bold mt-1">Immediate field booking</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-amber-500">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Avg Response Time</span>
                  <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <i data-lucide="zap" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">45 Minutes</div>
                <div class="text-[11px] text-amber-700 font-bold mt-1">Direct phone dispatch</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-purple-600">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Farmer Rating</span>
                  <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <i data-lucide="star" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">4.8 / 5.0</div>
                <div class="text-[11px] text-purple-700 font-bold mt-1">Based on 1,840 reviews</div>
              </div>
            </div>

            <!-- Services Filter & Data Table -->
            <div class="saas-card p-6 space-y-4">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div class="flex flex-wrap items-center gap-2.5">
                  <div class="relative">
                    <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>
                    <input id="serviceSearchInput" oninput="filterServicesTable()" type="text" placeholder="Search service or provider..." class="h-9 pl-9 pr-3 text-xs bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-medium outline-none focus:border-blue-600 w-64 transition">
                  </div>
                  
                  <select id="serviceCategoryFilter" onchange="filterServicesTable()" class="h-9 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#334155] outline-none focus:border-blue-600">
                    <option value="ALL">All Categories</option>
                    <option value="Drone Spraying">Drone Spraying Crews</option>
                    <option value="Tractor Workshop">Tractor Workshops & Repairs</option>
                    <option value="Soil Testing">Soil Testing Laboratories</option>
                    <option value="Cold Storage">Cold Storage & Warehousing</option>
                    <option value="Borewell">Borewell & Pump Engineers</option>
                  </select>
                </div>

                <div class="text-xs font-bold text-[#64748B]" id="servicesCountDisplay">
                  Showing 5 Verified Service Providers
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="bg-[#F8FAFC] text-[#64748B] font-bold border-y border-[#E5E7EB]">
                    <tr>
                      <th class="py-3 px-4">Service & Provider</th>
                      <th class="py-3 px-4">Category</th>
                      <th class="py-3 px-4">Radius & Hours</th>
                      <th class="py-3 px-4">Pricing Model</th>
                      <th class="py-3 px-4">Customer Rating</th>
                      <th class="py-3 px-4">Status</th>
                      <th class="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="servicesTableBody" class="divide-y divide-[#E5E7EB] font-medium text-[#0F172A]">
                    <!-- Rendered by renderServicesTable() -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- MODAL: ADD SERVICE -->
            <div id="addServiceModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E7EB]">
                <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white z-10">
                  <div>
                    <h3 class="text-lg font-black text-[#0F172A]">Register New Nearby Service</h3>
                    <p class="text-xs text-[#64748B]">Enroll repair workshop, drone team, or soil testing facility.</p>
                  </div>
                  <button type="button" onclick="closeAddServiceModal()" class="w-8 h-8 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <form onsubmit="handleSaveService(event)" class="p-6 space-y-4 text-xs">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Service Entity Name <span class="text-rose-500">*</span></label>
                      <input id="newServiceName" type="text" required placeholder="e.g. Amreli Drone Spraying Squad" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-blue-600">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Category <span class="text-rose-500">*</span></label>
                      <select id="newServiceCategory" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-blue-600">
                        <option value="Drone Spraying">Drone Spraying</option>
                        <option value="Tractor Workshop">Tractor Workshop</option>
                        <option value="Soil Testing">Soil Testing Lab</option>
                        <option value="Cold Storage">Cold Storage</option>
                        <option value="Borewell">Borewell & Pump</option>
                      </select>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Provider / Owner</label>
                      <input id="newServiceProvider" type="text" required placeholder="e.g. Arvindbhai Vala" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Contact Mobile <span class="text-rose-500">*</span></label>
                      <input id="newServicePhone" type="tel" required placeholder="+91 98252 00000" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Coverage Radius (km)</label>
                      <input id="newServiceRadius" type="number" value="30" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Pricing Model</label>
                      <input id="newServicePricing" type="text" placeholder="e.g. INR 350 / Acre" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Base Yard / Village</label>
                      <input id="newServiceVillage" type="text" value="Amreli APMC Yard Gate 1" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold">
                    </div>
                  </div>

                  <div class="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                    <button type="button" onclick="closeAddServiceModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                      Cancel
                    </button>
                    <button type="submit" class="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                      <i data-lucide="check" class="w-4 h-4"></i> Save Service
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: VIEW SERVICE DETAILS -->
            <div id="viewServiceModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#E5E7EB] overflow-hidden">
                <div class="p-6 bg-gradient-to-r from-blue-700 to-indigo-900 text-white flex items-start justify-between">
                  <div>
                    <span id="viewServiceBadge" class="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase">Drone Spraying</span>
                    <h3 id="viewServiceTitle" class="text-xl font-black mt-2">Amreli Precision Drone Spraying Squad</h3>
                    <p id="viewServiceProvider" class="text-xs text-blue-100 mt-0.5">Arvindbhai Vala • 35 km Radius</p>
                  </div>
                  <button type="button" onclick="closeViewServiceModal()" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <div class="p-6 space-y-4 text-xs">
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 text-center">
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Pricing</span>
                      <span id="viewServicePrice" class="font-bold text-[#0F172A] text-sm">INR 350 / Acre</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Operating Hours</span>
                      <span id="viewServiceHours" class="font-bold text-[#0F172A] text-sm">6:00 AM - 7:00 PM</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Verified Rating</span>
                      <span id="viewServiceRating" class="font-bold text-amber-600 text-sm">4.9 ★ (142)</span>
                    </div>
                  </div>

                  <div>
                    <h4 class="font-bold text-[#0F172A] mb-1">Service Capabilities & Certifications</h4>
                    <p id="viewServiceDesc" class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] text-[#64748B] leading-relaxed">
                      DGCA-certified drone pilots equipped with twin DJI Agras T40 systems with ultra-low volume atomizing nozzles. Specialized in pink bollworm and fungal spore eradication.
                    </p>
                  </div>

                  <div class="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                    <button id="viewServiceCallBtn" type="button" class="h-10 px-5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl transition flex items-center gap-2">
                      <i data-lucide="phone-call" class="w-4 h-4"></i> Call Service Now
                    </button>
                    <button type="button" onclick="closeViewServiceModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- MODAL: CHECK SERVICE SPACE / CAPACITY -->
            <div id="checkServiceSpaceModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#E5E7EB] p-6 space-y-5">
                <div class="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <div>
                    <h3 class="text-base font-black text-[#0F172A]">Realtime Space & Capacity Meter</h3>
                    <p id="spaceModalServiceTitle" class="text-xs text-blue-700 font-bold">Saurashtra Agro Cold Storage</p>
                  </div>
                  <button type="button" onclick="closeServiceCapacityModal()" class="w-8 h-8 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <div class="p-4 bg-blue-50/70 rounded-2xl border border-blue-200/80 space-y-3 text-xs">
                  <div class="flex items-center justify-between font-bold text-[#0F172A]">
                    <span>Current Utilization:</span>
                    <span id="spaceOccupiedText">850 MT / 1,200 MT (71%)</span>
                  </div>
                  <div class="w-full h-3 bg-blue-200 rounded-full overflow-hidden">
                    <div id="spaceProgressBar" class="h-full bg-blue-600 rounded-full" style="width: 71%"></div>
                  </div>
                  <div class="flex items-center justify-between text-[11px] text-[#64748B] pt-1">
                    <span>Available Capacity: <strong class="text-emerald-700 font-black" id="spaceAvailableText">350 MT Free</strong></span>
                    <span>Next Intake Slot: <strong class="text-[#0F172A]">Today 4:30 PM</strong></span>
                  </div>
                </div>

                <div class="space-y-2 text-xs">
                  <h4 class="font-bold text-[#0F172A]">Queue and Equipment Status</h4>
                  <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] text-[#64748B] space-y-1">
                    <div>• Temperature Chamber 1 (Groundnut/Seeds): <strong>4°C / 65% Humidity (Stable)</strong></div>
                    <div>• Unloading Ramp Bays: <strong>Bay 2 & Bay 4 Free for Inward Trucks</strong></div>
                    <div>• Digital Weighbridge: <strong>Active with Automated Slip Printing</strong></div>
                  </div>
                </div>

                <div class="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                  <button type="button" onclick="closeServiceCapacityModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                    Close
                  </button>
                  <button onclick="bookCapacitySlot()" class="h-10 px-6 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition flex items-center gap-1.5">
                    <i data-lucide="calendar" class="w-4 h-4"></i> Reserve Space Slot
                  </button>
                </div>
              </div>
            </div>

            <!-- MODAL: VIEW RATINGS & REVIEWS -->
            <div id="viewServiceRatingsModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#E5E7EB]">
                <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white z-10">
                  <div>
                    <h3 class="text-base font-black text-[#0F172A]">Verified Farmer Ratings & Testimonials</h3>
                    <p id="ratingsModalServiceTitle" class="text-xs text-[#64748B]">Jay Jalaram Tractor Workshop</p>
                  </div>
                  <button type="button" onclick="closeServiceRatingsModal()" class="w-8 h-8 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <div class="p-6 space-y-4 text-xs">
                  <!-- Ratings Summary -->
                  <div class="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 flex items-center justify-between">
                    <div>
                      <div class="text-3xl font-black text-amber-700">4.9 / 5.0</div>
                      <div class="text-amber-900 font-bold mt-0.5">Based on 142 Farmer Ratings</div>
                    </div>
                    <div class="space-y-1 text-[11px] text-[#64748B] w-48">
                      <div class="flex items-center gap-2"><span>5★</span><div class="flex-1 h-1.5 bg-amber-200 rounded-full"><div class="h-full bg-amber-500 rounded-full w-[85%]"></div></div><span>85%</span></div>
                      <div class="flex items-center gap-2"><span>4★</span><div class="flex-1 h-1.5 bg-amber-200 rounded-full"><div class="h-full bg-amber-500 rounded-full w-[12%]"></div></div><span>12%</span></div>
                      <div class="flex items-center gap-2"><span>3★</span><div class="flex-1 h-1.5 bg-amber-200 rounded-full"><div class="h-full bg-amber-500 rounded-full w-[3%]"></div></div><span>3%</span></div>
                    </div>
                  </div>

                  <!-- Reviews List -->
                  <div class="space-y-3" id="serviceReviewsContainer">
                    <div class="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] space-y-1.5">
                      <div class="flex items-center justify-between">
                        <span class="font-extrabold text-[#0F172A]">Bhaveshbhai Radadiya (Bagasara)</span>
                        <span class="text-amber-600 font-bold">5.0 ★</span>
                      </div>
                      <p class="text-[#64748B] leading-relaxed">
                        Replaced hydraulic pump seal on Mahindra 575 DI in less than 2 hours. Very honest pricing and genuine Mahindra parts used.
                      </p>
                      <span class="text-[10px] text-[#94A3B8] block">Verified Cotton Farmer • 18 Oct 2026</span>
                    </div>

                    <div class="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] space-y-1.5">
                      <div class="flex items-center justify-between">
                        <span class="font-extrabold text-[#0F172A]">Kishorebhai Vaghani (Sudavad)</span>
                        <span class="text-amber-600 font-bold">5.0 ★</span>
                      </div>
                      <p class="text-[#64748B] leading-relaxed">
                        Clutch plate overhaul done during peak sowing rush. Saved our 15 acres from delay. Highly recommended technician.
                      </p>
                      <span class="text-[10px] text-[#94A3B8] block">Verified Groundnut Farmer • 12 Oct 2026</span>
                    </div>
                  </div>

                  <div class="pt-3 border-t border-[#E5E7EB] flex items-center justify-end">
                    <button type="button" onclick="closeServiceRatingsModal()" class="h-10 px-6 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-xl transition">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>


          <!-- =============================================================
               VIEW: MANDI PRICES (Live APMC Yard Stream & Price History)
               ============================================================= -->
          <div id="view-mandi-prices" class="hidden space-y-6 view-section">
            
            <!-- Header Strip -->
            <div class="saas-card p-6 bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/60 border border-emerald-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <span class="w-2 h-2 rounded-full bg-[#0B6623] animate-pulse"></span>
                  Real-time APMC Mandi Market Intelligence Stream
                </div>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">Mandi prices</h2>
                <p class="text-xs text-[#64748B] mt-0.5 font-medium">
                  Live daily auction pricing for Cotton, Groundnut, Wheat, Cumin, Castor, and Sesame across Saurashtra APMC yards.
                </p>
              </div>
              <div class="flex flex-wrap items-center gap-2.5">
                <button onclick="openAddMandiPriceModal()" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="plus" class="w-4 h-4"></i>
                  <span>Record Daily Price</span>
                </button>
                <button onclick="exportMandiTicker()" class="h-9 px-3.5 bg-white hover:bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="download" class="w-4 h-4 text-[#64748B]"></i>
                  <span>Export Ticker</span>
                </button>
              </div>
            </div>

            <!-- KPI Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="saas-card p-5 border-l-4 border-l-[#0B6623]">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Tracked Commodities</span>
                  <span class="w-8 h-8 rounded-xl bg-emerald-50 text-[#0B6623] flex items-center justify-center">
                    <i data-lucide="sprout" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">32 Crops</div>
                <div class="text-[11px] text-emerald-700 font-bold mt-1">Updated every 15 minutes</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-blue-600">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Today's Total Arrivals</span>
                  <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <i data-lucide="package-check" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">14,250 Qtl</div>
                <div class="text-[11px] text-blue-700 font-bold mt-1">Highest arrival: Amreli Yard</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-amber-500">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Highest Gainer</span>
                  <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <i data-lucide="trending-up" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">Cotton Shankar-6</div>
                <div class="text-[11px] text-emerald-700 font-bold mt-1">+4.2% up today (INR 7,450)</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-purple-600">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">APMC Connected Yards</span>
                  <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <i data-lucide="network" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">18 Yards</div>
                <div class="text-[11px] text-purple-700 font-bold mt-1">Integrated electronic auction</div>
              </div>
            </div>

            <!-- Main Mandi Table & Filter Panel -->
            <div class="saas-card p-6 space-y-4">
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div class="flex flex-wrap items-center gap-2.5">
                  <div class="relative">
                    <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>
                    <input id="mandiSearchInput" oninput="filterMandiTable()" type="text" placeholder="Search commodity or yard..." class="h-9 pl-9 pr-3 text-xs bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-medium outline-none focus:border-[#0B6623] w-64 transition">
                  </div>
                  
                  <select id="mandiYardFilter" onchange="filterMandiTable()" class="h-9 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#334155] outline-none focus:border-[#0B6623]">
                    <option value="ALL">All APMC Yards</option>
                    <option value="Amreli APMC">Amreli APMC</option>
                    <option value="Rajkot APMC">Rajkot APMC</option>
                    <option value="Gondal APMC">Gondal APMC</option>
                    <option value="Unjha APMC">Unjha APMC</option>
                    <option value="Mahuva APMC">Mahuva APMC</option>
                  </select>

                  <select id="mandiCommodityFilter" onchange="filterMandiTable()" class="h-9 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#334155] outline-none focus:border-[#0B6623]">
                    <option value="ALL">All Commodities</option>
                    <option value="Cotton">Cotton (Kapas)</option>
                    <option value="Groundnut">Groundnut (Mungfali)</option>
                    <option value="Wheat">Wheat (Gehu)</option>
                    <option value="Cumin">Cumin (Jeera)</option>
                    <option value="Castor">Castor (Divela)</option>
                    <option value="Sesame">Sesame (Til)</option>
                  </select>
                </div>

                <div class="text-xs font-bold text-[#64748B]" id="mandiCountDisplay">
                  Showing 6 Daily Mandi Price Quotes
                </div>
              </div>

              <!-- Table -->
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="bg-[#F8FAFC] text-[#64748B] font-bold border-y border-[#E5E7EB]">
                    <tr>
                      <th class="py-3 px-4">Commodity & Grade</th>
                      <th class="py-3 px-4">Market Yard</th>
                      <th class="py-3 px-4">Min Price</th>
                      <th class="py-3 px-4">Modal Price (Prevailing)</th>
                      <th class="py-3 px-4">Max Price</th>
                      <th class="py-3 px-4">Arrivals (Qtl)</th>
                      <th class="py-3 px-4">Recorded Date</th>
                      <th class="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="mandiTableBody" class="divide-y divide-[#E5E7EB] font-medium text-[#0F172A]">
                    <!-- Rendered by renderMandiTable() -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- MODAL: ADD MANDI PRICE -->
            <div id="addMandiPriceModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E7EB]">
                <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white z-10">
                  <div>
                    <h3 class="text-lg font-black text-[#0F172A]">Record Daily Mandi Price</h3>
                    <p class="text-xs text-[#64748B]">Publish APMC auction benchmark rates for transparent cultivator pricing.</p>
                  </div>
                  <button type="button" onclick="closeAddMandiPriceModal()" class="w-8 h-8 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <form onsubmit="handleSaveMandiPrice(event)" class="p-6 space-y-4 text-xs">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">APMC Market Yard <span class="text-rose-500">*</span></label>
                      <select id="newMandiYard" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                        <option value="Amreli APMC">Amreli APMC</option>
                        <option value="Rajkot APMC">Rajkot APMC</option>
                        <option value="Gondal APMC">Gondal APMC</option>
                        <option value="Unjha APMC">Unjha APMC</option>
                        <option value="Mahuva APMC">Mahuva APMC</option>
                      </select>
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Commodity <span class="text-rose-500">*</span></label>
                      <select id="newMandiCommodity" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                        <option value="Cotton">Cotton (Kapas)</option>
                        <option value="Groundnut">Groundnut (Mungfali)</option>
                        <option value="Wheat">Wheat (Gehu)</option>
                        <option value="Cumin">Cumin (Jeera)</option>
                        <option value="Castor">Castor (Divela)</option>
                        <option value="Sesame">Sesame (Til)</option>
                      </select>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Variety / Grade <span class="text-rose-500">*</span></label>
                      <input id="newMandiVariety" type="text" required placeholder="e.g. Shankar-6 FAQ" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Total Arrivals (Quintals)</label>
                      <input id="newMandiArrivals" type="number" required placeholder="e.g. 2400" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Min Price (INR/Qtl) <span class="text-rose-500">*</span></label>
                      <input id="newMandiMinPrice" type="number" required placeholder="e.g. 6800" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Modal Price (INR/Qtl) <span class="text-rose-500">*</span></label>
                      <input id="newMandiModalPrice" type="number" required placeholder="e.g. 7450" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-black text-[#0B6623] outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Max Price (INR/Qtl) <span class="text-rose-500">*</span></label>
                      <input id="newMandiMaxPrice" type="number" required placeholder="e.g. 7820" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                  </div>

                  <div class="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                    <button type="button" onclick="closeAddMandiPriceModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                      Cancel
                    </button>
                    <button type="submit" class="h-10 px-6 bg-[#0B6623] hover:bg-[#074818] text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                      <i data-lucide="check" class="w-4 h-4"></i> Publish Daily Price
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: VIEW MANDI PRICE DETAILS -->
            <div id="viewMandiPriceModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#E5E7EB] overflow-hidden">
                <div class="p-6 bg-gradient-to-r from-emerald-800 to-teal-900 text-white flex items-start justify-between">
                  <div>
                    <span id="viewMandiYardBadge" class="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase">Amreli APMC</span>
                    <h3 id="viewMandiTitle" class="text-xl font-black mt-2">Cotton (Kapas) — Shankar-6 FAQ</h3>
                    <p id="viewMandiDate" class="text-xs text-emerald-100 mt-0.5">Recorded: 26 Oct 2026 • 2,400 Qtl Arrivals</p>
                  </div>
                  <button type="button" onclick="closeViewMandiPriceModal()" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <div class="p-6 space-y-4 text-xs">
                  <div class="grid grid-cols-3 gap-3 text-center">
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Minimum Price</span>
                      <span id="viewMandiMin" class="font-bold text-[#0F172A] text-sm">INR 6,800</span>
                    </div>
                    <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
                      <span class="text-[10px] text-emerald-800 font-bold block">Modal Benchmark</span>
                      <span id="viewMandiModal" class="font-black text-[#0B6623] text-base">INR 7,450</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Maximum Price</span>
                      <span id="viewMandiMax" class="font-bold text-[#0F172A] text-sm">INR 7,820</span>
                    </div>
                  </div>

                  <div>
                    <h4 class="font-bold text-[#0F172A] mb-1">Quality Specifications & Moisture Standards</h4>
                    <p id="viewMandiSpecs" class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] text-[#64748B] leading-relaxed">
                      Staple length 28-29mm, Micronaire 3.8-4.2, Moisture content 8.5% maximum. Lots exceeding 10% moisture will incur standard APMC drying deductions.
                    </p>
                  </div>

                  <div class="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                    <button id="viewMandiHistoryBtn" type="button" class="h-10 px-5 bg-slate-800 hover:bg-[#0F172A] text-white font-bold rounded-xl transition flex items-center gap-2">
                      <i data-lucide="line-chart" class="w-4 h-4"></i> View 30-Day Price Trend
                    </button>
                    <button type="button" onclick="closeViewMandiPriceModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- MODAL: PRICE HISTORY & TREND ANALYSIS -->
            <div id="viewPriceHistoryModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] overflow-y-auto shadow-2xl border border-[#E5E7EB]">
                <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white z-10">
                  <div>
                    <h3 class="text-base font-black text-[#0F172A]">30-Day Historical Price Trend & Analysis</h3>
                    <p id="historyModalTitle" class="text-xs text-[#0B6623] font-bold">Cotton Shankar-6 • Amreli APMC</p>
                  </div>
                  <button type="button" onclick="closePriceHistoryModal()" class="w-8 h-8 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <div class="p-6 space-y-4 text-xs">
                  <!-- Weekly Delta Banner -->
                  <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-between">
                    <div>
                      <span class="text-[10px] text-[#64748B] font-bold block uppercase">Week-over-Week Movement</span>
                      <span class="text-lg font-black text-[#0B6623] flex items-center gap-1.5 mt-0.5">
                        <i data-lucide="trending-up" class="w-5 h-5"></i> +INR 380 / Qtl (+5.3%)
                      </span>
                    </div>
                    <div class="text-right">
                      <span class="text-[10px] text-[#64748B] block">Advisory Recommendation</span>
                      <span class="px-2.5 py-1 rounded-full bg-emerald-700 text-white font-bold text-[10px]">Good Time to Sell</span>
                    </div>
                  </div>

                  <!-- 30-Day Historical Ledger -->
                  <div>
                    <h4 class="font-bold text-[#0F172A] mb-2">Daily Modal Price Ledger</h4>
                    <div class="overflow-x-auto border border-[#E5E7EB] rounded-xl">
                      <table class="w-full text-left text-xs">
                        <thead class="bg-[#F8FAFC] text-[#64748B] font-bold border-b border-[#E5E7EB]">
                          <tr>
                            <th class="py-2.5 px-3">Date</th>
                            <th class="py-2.5 px-3">Arrivals (Qtl)</th>
                            <th class="py-2.5 px-3">Min Rate</th>
                            <th class="py-2.5 px-3">Modal Rate</th>
                            <th class="py-2.5 px-3">Max Rate</th>
                          </tr>
                        </thead>
                        <tbody id="mandiHistoryTableBody" class="divide-y divide-[#E5E7EB] text-[#0F172A]">
                          <tr><td class="py-2 px-3">26 Oct 2026</td><td class="py-2 px-3">2,400</td><td class="py-2 px-3">INR 6,800</td><td class="py-2 px-3 font-bold text-[#0B6623]">INR 7,450</td><td class="py-2 px-3">INR 7,820</td></tr>
                          <tr><td class="py-2 px-3">25 Oct 2026</td><td class="py-2 px-3">2,150</td><td class="py-2 px-3">INR 6,750</td><td class="py-2 px-3 font-bold text-[#0B6623]">INR 7,330</td><td class="py-2 px-3">INR 7,750</td></tr>
                          <tr><td class="py-2 px-3">24 Oct 2026</td><td class="py-2 px-3">1,980</td><td class="py-2 px-3">INR 6,700</td><td class="py-2 px-3 font-bold text-[#0B6623]">INR 7,290</td><td class="py-2 px-3">INR 7,680</td></tr>
                          <tr><td class="py-2 px-3">22 Oct 2026</td><td class="py-2 px-3">1,820</td><td class="py-2 px-3">INR 6,650</td><td class="py-2 px-3 font-bold text-[#0B6623]">INR 7,200</td><td class="py-2 px-3">INR 7,600</td></tr>
                          <tr><td class="py-2 px-3">20 Oct 2026</td><td class="py-2 px-3">1,650</td><td class="py-2 px-3">INR 6,600</td><td class="py-2 px-3 font-bold text-[#0B6623]">INR 7,120</td><td class="py-2 px-3">INR 7,540</td></tr>
                          <tr><td class="py-2 px-3">15 Oct 2026</td><td class="py-2 px-3">1,400</td><td class="py-2 px-3">INR 6,550</td><td class="py-2 px-3 font-bold text-[#0B6623]">INR 7,070</td><td class="py-2 px-3">INR 7,480</td></tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div class="pt-3 border-t border-[#E5E7EB] flex items-center justify-end">
                    <button type="button" onclick="closePriceHistoryModal()" class="h-10 px-6 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-xl transition">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
`;

const contentHtml = first4Html + remaining3Html;

// Load existing contentJs directly from module export
const baseContentJs = require('./modules/content.js').contentJs;

const newToolsServicesMandiJs = `

// ============================================================================
// TOOL RENTAL CONTROLLER
// ============================================================================

let TOOLS_DATA_STORE = [
  {
    id: "TOOL-01",
    name: "John Deere 5050D 4WD Tractor",
    category: "Tractors",
    specs: "50 HP • 4WD • Dual Clutch",
    dailyRate: 2800,
    hourlyRate: 550,
    deposit: 4000,
    owner: "Jayesh Patel",
    phone: "+91 98250 12345",
    location: "Sudavad, Amreli",
    delivery: true,
    status: "Available"
  },
  {
    id: "TOOL-02",
    name: "DJI Agras T40 Spraying Drone",
    category: "Drones",
    specs: "40L Tank • 16L/min Atomizer • Dual Radar",
    dailyRate: 4500,
    hourlyRate: 850,
    deposit: 10000,
    owner: "Arvindbhai Vala",
    phone: "+91 98252 88412",
    location: "Amreli Hub",
    delivery: true,
    status: "Available"
  },
  {
    id: "TOOL-03",
    name: "Shaktiman 7-Foot Rotary Tiller",
    category: "Tillers",
    specs: "48 Blades • Multi-Speed Gearbox",
    dailyRate: 1500,
    hourlyRate: 350,
    deposit: 2500,
    owner: "Bhavesh Radadiya",
    phone: "+91 98251 44102",
    location: "Bagasara",
    delivery: false,
    status: "Booked"
  },
  {
    id: "TOOL-04",
    name: "Kubota Multi-Crop Combine Harvester",
    category: "Harvesters",
    specs: "70 HP • Rubber Track • Grain Tank 1400L",
    dailyRate: 7500,
    hourlyRate: 1400,
    deposit: 15000,
    owner: "Saurashtra Agro Rentals",
    phone: "+91 98253 99201",
    location: "Dhari Yard",
    delivery: true,
    status: "Available"
  },
  {
    id: "TOOL-05",
    name: "Laser Land Leveler with Transmitter",
    category: "Laser Levelers",
    specs: "Scraper 7-ft • Dual Receiver Mast",
    dailyRate: 3200,
    hourlyRate: 600,
    deposit: 5000,
    owner: "Khedut Kendra",
    phone: "+91 98254 77123",
    location: "Lathi",
    delivery: true,
    status: "Available"
  },
  {
    id: "TOOL-06",
    name: "VST Shakti 130DI Power Tiller",
    category: "Tillers",
    specs: "13 HP • Hand Start • Puddling Wheels",
    dailyRate: 1200,
    hourlyRate: 250,
    deposit: 2000,
    owner: "Mansukhbhai Patel",
    phone: "+91 98255 33019",
    location: "Savarkundla",
    delivery: false,
    status: "Maintenance"
  }
];

function renderToolsTable() {
  const tbody = document.getElementById("toolsTableBody");
  if (!tbody) return;

  const search = document.getElementById("toolSearchInput")?.value.toLowerCase().trim() || "";
  const cat = document.getElementById("toolCategoryFilter")?.value || "ALL";
  const avail = document.getElementById("toolAvailabilityFilter")?.value || "ALL";

  const filtered = TOOLS_DATA_STORE.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search) || item.owner.toLowerCase().includes(search) || item.location.toLowerCase().includes(search);
    const matchCat = (cat === "ALL") || (item.category === cat);
    const matchAvail = (avail === "ALL") || (item.status === avail);
    return matchSearch && matchCat && matchAvail;
  });

  const countDisplay = document.getElementById("toolsCountDisplay");
  if (countDisplay) {
    countDisplay.textContent = \`Showing \${filtered.length} of \${TOOLS_DATA_STORE.length} Implements\`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="py-8 text-center text-xs text-[#64748B]">No equipment found matching criteria.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    return \`
      <tr class="hover:bg-[#F8FAFC] transition">
        <td class="py-3 px-4">
          <div class="font-bold text-[#0F172A]">\${item.name}</div>
          <div class="text-[10px] text-[#64748B] mt-0.5">\${item.specs}</div>
        </td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800">\${item.category}</span>
        </td>
        <td class="py-3 px-4">
          <div class="font-black text-[#0B6623]">INR \${item.dailyRate.toLocaleString()} / Day</div>
          <div class="text-[10px] text-[#64748B]">INR \${item.hourlyRate} / Hr</div>
        </td>
        <td class="py-3 px-4 font-semibold text-[#0F172A]">
          INR \${item.deposit.toLocaleString()}
        </td>
        <td class="py-3 px-4">
          <div class="font-bold text-[#0F172A]">\${item.owner}</div>
          <div class="text-[10px] text-[#64748B]">\${item.location}</div>
        </td>
        <td class="py-3 px-4">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold \${getToolStatusClass(item.status)}">
            \${item.status}
          </span>
        </td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            \${item.status === 'Available' ? \`<button onclick="openBookToolModal('\${item.id}')" class="h-7 px-2.5 bg-[#0B6623] hover:bg-[#074818] text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1">
              <i data-lucide="calendar" class="w-3 h-3"></i> Book
            </button>\` : ''}
            <button onclick="openViewToolModal('\${item.id}')" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#64748B] flex items-center justify-center transition" title="View Details">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="deleteToolItem('\${item.id}')" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-[#64748B] flex items-center justify-center transition" title="Delete">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    \`;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

function getToolStatusClass(st) {
  if (st === "Available") return "bg-emerald-100 text-[#0B6623]";
  if (st === "Booked") return "bg-blue-100 text-blue-800";
  return "bg-amber-100 text-amber-800";
}

function filterToolsTable() {
  renderToolsTable();
}

function openAddToolModal() {
  const m = document.getElementById("addToolModal");
  if (m) m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeAddToolModal() {
  const m = document.getElementById("addToolModal");
  if (m) m.classList.add("hidden");
}

function handleSaveTool(e) {
  if (e) e.preventDefault();
  const name = document.getElementById("newToolName")?.value;
  const category = document.getElementById("newToolCategory")?.value;
  const specs = document.getElementById("newToolSpecs")?.value || "Standard Specifications";
  const dailyRate = parseInt(document.getElementById("newToolDailyRate")?.value || "2500", 10);
  const hourlyRate = parseInt(document.getElementById("newToolHourlyRate")?.value || "450", 10);
  const deposit = parseInt(document.getElementById("newToolDeposit")?.value || "3000", 10);
  const owner = document.getElementById("newToolOwner")?.value;
  const location = document.getElementById("newToolLocation")?.value || "Amreli";

  const newId = "TOOL-" + (TOOLS_DATA_STORE.length + 1).toString().padStart(2, "0");
  TOOLS_DATA_STORE.unshift({
    id: newId,
    name,
    category,
    specs,
    dailyRate,
    hourlyRate,
    deposit,
    owner,
    phone: "+91 98250 00000",
    location,
    delivery: true,
    status: "Available"
  });

  closeAddToolModal();
  renderToolsTable();
  if (typeof showToast === "function") showToast(\`Tool "\${name}" listed successfully.\`, "success");
}

function deleteToolItem(id) {
  const idx = TOOLS_DATA_STORE.findIndex(t => t.id === id);
  if (idx === -1) return;
  const item = TOOLS_DATA_STORE[idx];
  TOOLS_DATA_STORE.splice(idx, 1);
  renderToolsTable();
  if (typeof showToast === "function") showToast(\`Removed tool "\${item.name}".\`, "info");
}

function openViewToolModal(id) {
  const item = TOOLS_DATA_STORE.find(t => t.id === id);
  if (!item) return;
  const m = document.getElementById("viewToolModal");
  if (!m) return;

  document.getElementById("viewToolBadge").textContent = item.category;
  document.getElementById("viewToolTitle").textContent = item.name;
  document.getElementById("viewToolOwner").textContent = \`Owned by \${item.owner} • \${item.location}\`;
  document.getElementById("viewToolDaily").textContent = \`INR \${item.dailyRate.toLocaleString()}\`;
  document.getElementById("viewToolHourly").textContent = \`INR \${item.hourlyRate}\`;
  document.getElementById("viewToolDeposit").textContent = \`INR \${item.deposit.toLocaleString()}\`;
  document.getElementById("viewToolStatus").textContent = item.status;
  document.getElementById("viewToolSpecs").textContent = item.specs + " • Regular maintenance performed by authorized brand technician. Includes doorstep delivery within 25km radius.";

  const bookBtn = document.getElementById("viewToolBookBtn");
  if (bookBtn) {
    if (item.status === "Available") {
      bookBtn.classList.remove("hidden");
      bookBtn.onclick = () => { closeViewToolModal(); openBookToolModal(item.id); };
    } else {
      bookBtn.classList.add("hidden");
    }
  }

  m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeViewToolModal() {
  const m = document.getElementById("viewToolModal");
  if (m) m.classList.add("hidden");
}

let activeBookingTool = null;

function openBookToolModal(id) {
  const item = TOOLS_DATA_STORE.find(t => t.id === id);
  if (!item) return;
  activeBookingTool = item;

  const m = document.getElementById("bookToolModal");
  if (!m) return;

  document.getElementById("bookModalToolId").value = item.id;
  document.getElementById("bookModalToolTitle").textContent = \`\${item.name} (\${item.category})\`;
  document.getElementById("bookDuration").value = "2";

  calculateBookingTotal();
  m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeBookToolModal() {
  const m = document.getElementById("bookToolModal");
  if (m) m.classList.add("hidden");
}

function calculateBookingTotal() {
  if (!activeBookingTool) return;
  const days = parseInt(document.getElementById("bookDuration")?.value || "1", 10);
  const delivery = document.getElementById("bookDeliveryMethod")?.value === "delivery";

  const rentalFee = activeBookingTool.dailyRate * days;
  const deposit = activeBookingTool.deposit;
  const deliveryFee = delivery ? 350 : 0;
  const total = rentalFee + deposit + deliveryFee;

  document.getElementById("calcDaysDisplay").textContent = \`\${days} day\${days > 1 ? "s" : ""}\`;
  document.getElementById("calcRentalFee").textContent = \`INR \${rentalFee.toLocaleString()}\`;
  document.getElementById("calcDepositFee").textContent = \`INR \${deposit.toLocaleString()}\`;
  document.getElementById("calcDeliveryFee").textContent = \`INR \${deliveryFee}\`;
  document.getElementById("calcTotalFee").textContent = \`INR \${total.toLocaleString()}\`;
}

function handleConfirmBooking(e) {
  if (e) e.preventDefault();
  if (activeBookingTool) {
    activeBookingTool.status = "Booked";
  }
  const farmer = document.getElementById("bookFarmerName")?.value || "Farmer";
  closeBookToolModal();
  renderToolsTable();
  if (typeof showToast === "function") {
    showToast(\`Booking confirmed for \${farmer}! Shift logged in reservation grid.\`, "success");
  }
}

function exportToolLedger() {
  if (typeof showToast === "function") showToast("Exported farm implement rental ledger to CSV.", "success");
}

// ============================================================================
// NEARBY SERVICES CONTROLLER
// ============================================================================

let SERVICES_DATA_STORE = [
  {
    id: "SRV-01",
    name: "Amreli Precision Drone Spraying Squad",
    category: "Drone Spraying",
    provider: "Arvindbhai Vala",
    phone: "+91 98252 88412",
    radius: 35,
    hours: "6:00 AM - 7:00 PM",
    pricing: "INR 350 / Acre",
    rating: 4.9,
    reviewsCount: 142,
    village: "Amreli APMC Yard",
    capacity: "2 Drone Crews Available",
    occupiedPercent: 40,
    desc: "DGCA-certified drone pilots equipped with twin DJI Agras T40 systems with ultra-low volume atomizing nozzles. Specialized in pink bollworm and fungal spore eradication."
  },
  {
    id: "SRV-02",
    name: "Jay Jalaram Tractor Workshop",
    category: "Tractor Workshop",
    provider: "Dineshbhai Patel",
    phone: "+91 98251 77201",
    radius: 25,
    hours: "8:00 AM - 8:30 PM",
    pricing: "INR 500 Base Inspection",
    rating: 4.8,
    reviewsCount: 98,
    village: "Bagasara Road",
    capacity: "Bay 1 & Bay 3 Free",
    occupiedPercent: 50,
    desc: "Authorized hydraulic overhaul, clutch plate replacement, fuel pump calibration, and electrical tractor wiring service. Genuine spare parts inventory."
  },
  {
    id: "SRV-03",
    name: "Saurashtra Agro Cold Storage Chambers",
    category: "Cold Storage",
    provider: "Patel Warehousing LLP",
    phone: "+91 98253 44109",
    radius: 50,
    hours: "24 Hours Operational",
    pricing: "INR 180 / Bag / Season",
    rating: 4.9,
    reviewsCount: 215,
    village: "Amreli Industrial Area",
    capacity: "350 MT Available (71% Full)",
    occupiedPercent: 71,
    desc: "Controlled atmosphere cold storage for seed preservation, potato tubers, and spices. Multi-chamber automated temperature & humidity logging."
  },
  {
    id: "SRV-04",
    name: "Khedut Soil Testing & Micro-Nutrient Lab",
    category: "Soil Testing",
    provider: "Dr. Hasmukh Joshi",
    phone: "+91 98254 33218",
    radius: 40,
    hours: "9:00 AM - 6:00 PM",
    pricing: "INR 250 / Assay Sample",
    rating: 4.7,
    reviewsCount: 164,
    village: "Dhari Market",
    capacity: "Daily Capacity: 40 Samples",
    occupiedPercent: 65,
    desc: "12-parameter soil testing laboratory providing instant Soil Health Cards with electrical conductivity, pH, organic carbon, and trace mineral assay."
  },
  {
    id: "SRV-05",
    name: "Shri Ram Borewell & Solar Pump Services",
    category: "Borewell",
    provider: "Rameshbhai Boricha",
    phone: "+91 98255 11980",
    radius: 45,
    hours: "7:00 AM - 8:00 PM",
    pricing: "INR 120 / Foot Drilling",
    rating: 4.8,
    reviewsCount: 76,
    village: "Savarkundla",
    capacity: "Rig Ready for Dispatch",
    occupiedPercent: 30,
    desc: "Hydraulic rotary drilling rigs capable of 800-foot depths. Solar pump installation and submersible motor rewinding with 1-year replacement warranty."
  }
];

function renderServicesTable() {
  const tbody = document.getElementById("servicesTableBody");
  if (!tbody) return;

  const search = document.getElementById("serviceSearchInput")?.value.toLowerCase().trim() || "";
  const cat = document.getElementById("serviceCategoryFilter")?.value || "ALL";

  const filtered = SERVICES_DATA_STORE.filter(item => {
    const matchSearch = item.name.toLowerCase().includes(search) || item.provider.toLowerCase().includes(search) || item.village.toLowerCase().includes(search);
    const matchCat = (cat === "ALL") || (item.category === cat);
    return matchSearch && matchCat;
  });

  const countDisplay = document.getElementById("servicesCountDisplay");
  if (countDisplay) {
    countDisplay.textContent = \`Showing \${filtered.length} of \${SERVICES_DATA_STORE.length} Verified Service Providers\`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="7" class="py-8 text-center text-xs text-[#64748B]">No services found matching filters.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    return \`
      <tr class="hover:bg-[#F8FAFC] transition">
        <td class="py-3 px-4">
          <div class="font-bold text-[#0F172A]">\${item.name}</div>
          <div class="text-[10px] text-[#64748B] mt-0.5">\${item.provider} • \${item.village}</div>
        </td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">\${item.category}</span>
        </td>
        <td class="py-3 px-4">
          <div class="font-semibold text-[#0F172A]">\${item.radius} km Radius</div>
          <div class="text-[10px] text-[#64748B]">\${item.hours}</div>
        </td>
        <td class="py-3 px-4 font-black text-[#0B6623]">
          \${item.pricing}
        </td>
        <td class="py-3 px-4">
          <button onclick="openServiceRatingsModal('\${item.id}')" class="flex items-center gap-1 font-bold text-amber-700 hover:underline">
            <i data-lucide="star" class="w-3.5 h-3.5 fill-amber-500 text-amber-500"></i> \${item.rating} (\${item.reviewsCount})
          </button>
        </td>
        <td class="py-3 px-4">
          <button onclick="checkServiceCapacityModal('\${item.id}')" class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B6623] hover:bg-emerald-200 transition">
            Check Space
          </button>
        </td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="callServiceProvider('\${item.phone}', '\${item.provider}')" class="h-7 px-2.5 bg-emerald-700 hover:bg-[#0B6623] text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1" title="Direct Phone Call">
              <i data-lucide="phone-call" class="w-3 h-3"></i> Call
            </button>
            <button onclick="openViewServiceModal('\${item.id}')" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#64748B] flex items-center justify-center transition" title="View Full Details">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="deleteServiceItem('\${item.id}')" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-[#64748B] flex items-center justify-center transition" title="Delete">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    \`;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

function filterServicesTable() {
  renderServicesTable();
}

function callServiceProvider(phone, name) {
  if (typeof showToast === "function") {
    showToast(\`Initiating direct call to \${name} at \${phone}...\`, "success");
  }
}

function checkServiceCapacityModal(id) {
  const item = SERVICES_DATA_STORE.find(s => s.id === id);
  if (!item) return;
  const m = document.getElementById("checkServiceSpaceModal");
  if (!m) return;

  document.getElementById("spaceModalServiceTitle").textContent = \`\${item.name} (\${item.category})\`;
  document.getElementById("spaceOccupiedText").textContent = item.capacity;
  document.getElementById("spaceProgressBar").style.width = item.occupiedPercent + "%";
  document.getElementById("spaceAvailableText").textContent = (100 - item.occupiedPercent) + "% Available Capacity";

  m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeServiceCapacityModal() {
  const m = document.getElementById("checkServiceSpaceModal");
  if (m) m.classList.add("hidden");
}

function bookCapacitySlot() {
  closeServiceCapacityModal();
  if (typeof showToast === "function") showToast("Space reservation slot confirmed for intake.", "success");
}

function openServiceRatingsModal(id) {
  const item = SERVICES_DATA_STORE.find(s => s.id === id);
  if (!item) return;
  const m = document.getElementById("viewServiceRatingsModal");
  if (!m) return;

  document.getElementById("ratingsModalServiceTitle").textContent = \`\${item.name} • \${item.provider}\`;
  m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeServiceRatingsModal() {
  const m = document.getElementById("viewServiceRatingsModal");
  if (m) m.classList.add("hidden");
}

function openAddServiceModal() {
  const m = document.getElementById("addServiceModal");
  if (m) m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeAddServiceModal() {
  const m = document.getElementById("addServiceModal");
  if (m) m.classList.add("hidden");
}

function handleSaveService(e) {
  if (e) e.preventDefault();
  const name = document.getElementById("newServiceName")?.value;
  const category = document.getElementById("newServiceCategory")?.value;
  const provider = document.getElementById("newServiceProvider")?.value;
  const phone = document.getElementById("newServicePhone")?.value;
  const radius = parseInt(document.getElementById("newServiceRadius")?.value || "30", 10);
  const pricing = document.getElementById("newServicePricing")?.value || "Standard Rates";
  const village = document.getElementById("newServiceVillage")?.value || "Amreli";

  const newId = "SRV-" + (SERVICES_DATA_STORE.length + 1).toString().padStart(2, "0");
  SERVICES_DATA_STORE.unshift({
    id: newId,
    name,
    category,
    provider,
    phone,
    radius,
    hours: "7:00 AM - 7:00 PM",
    pricing,
    rating: 5.0,
    reviewsCount: 1,
    village,
    capacity: "Ready for Dispatch",
    occupiedPercent: 20,
    desc: "Newly onboarded verified service provider with AnkurMitra quality clearance."
  });

  closeAddServiceModal();
  renderServicesTable();
  if (typeof showToast === "function") showToast(\`Service "\${name}" registered successfully.\`, "success");
}

function deleteServiceItem(id) {
  const idx = SERVICES_DATA_STORE.findIndex(s => s.id === id);
  if (idx === -1) return;
  const item = SERVICES_DATA_STORE[idx];
  SERVICES_DATA_STORE.splice(idx, 1);
  renderServicesTable();
  if (typeof showToast === "function") showToast(\`Removed service "\${item.name}".\`, "info");
}

function openViewServiceModal(id) {
  const item = SERVICES_DATA_STORE.find(s => s.id === id);
  if (!item) return;
  const m = document.getElementById("viewServiceModal");
  if (!m) return;

  document.getElementById("viewServiceBadge").textContent = item.category;
  document.getElementById("viewServiceTitle").textContent = item.name;
  document.getElementById("viewServiceProvider").textContent = \`\${item.provider} • \${item.radius} km Radius\`;
  document.getElementById("viewServicePrice").textContent = item.pricing;
  document.getElementById("viewServiceHours").textContent = item.hours;
  document.getElementById("viewServiceRating").textContent = \`\${item.rating} ★ (\${item.reviewsCount})\`;
  document.getElementById("viewServiceDesc").textContent = item.desc;

  const callBtn = document.getElementById("viewServiceCallBtn");
  if (callBtn) {
    callBtn.onclick = () => callServiceProvider(item.phone, item.provider);
  }

  m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeViewServiceModal() {
  const m = document.getElementById("viewServiceModal");
  if (m) m.classList.add("hidden");
}

function exportServicesList() {
  if (typeof showToast === "function") showToast("Exported verified service providers to CSV.", "success");
}

// ============================================================================
// MANDI PRICES CONTROLLER
// ============================================================================

let MANDI_DATA_STORE = [
  {
    id: "MND-01",
    commodity: "Cotton",
    variety: "Shankar-6 FAQ",
    yard: "Amreli APMC",
    minPrice: 6800,
    modalPrice: 7450,
    maxPrice: 7820,
    arrivals: 2400,
    date: "2026-10-26",
    specs: "Staple length 28-29mm, Micronaire 3.8-4.2, Moisture 8.5% max."
  },
  {
    id: "MND-02",
    commodity: "Groundnut",
    variety: "G-20 Bold Pods",
    yard: "Gondal APMC",
    minPrice: 5900,
    modalPrice: 6450,
    maxPrice: 6800,
    arrivals: 3100,
    date: "2026-10-26",
    specs: "Oil content 48% minimum, Sound mature kernels 70%, Moisture 7.5%."
  },
  {
    id: "MND-03",
    commodity: "Wheat",
    variety: "Lokwan Premium Mill",
    yard: "Rajkot APMC",
    minPrice: 2850,
    modalPrice: 3120,
    maxPrice: 3350,
    arrivals: 1850,
    date: "2026-10-26",
    specs: "Lustrous golden grain, 12% protein content, 1.5% foreign matter max."
  },
  {
    id: "MND-04",
    commodity: "Cumin",
    variety: "Unjha Super Bold Export",
    yard: "Unjha APMC",
    minPrice: 24500,
    modalPrice: 28200,
    maxPrice: 31000,
    arrivals: 1420,
    date: "2026-10-26",
    specs: "Machine-cleaned 99% purity, Essential oil content 3.2% min."
  },
  {
    id: "MND-05",
    commodity: "Castor",
    variety: "Hybrid GCH-7",
    yard: "Amreli APMC",
    minPrice: 5600,
    modalPrice: 6150,
    maxPrice: 6400,
    arrivals: 1100,
    date: "2026-10-26",
    specs: "Oil content 47% minimum, sound whole seed."
  },
  {
    id: "MND-06",
    commodity: "Sesame",
    variety: "White Sesame Export",
    yard: "Mahuva APMC",
    minPrice: 11200,
    modalPrice: 12800,
    maxPrice: 13900,
    arrivals: 850,
    date: "2026-10-26",
    specs: "Natural 99/1 sortex grade, moisture 6% max."
  }
];

function renderMandiTable() {
  const tbody = document.getElementById("mandiTableBody");
  if (!tbody) return;

  const search = document.getElementById("mandiSearchInput")?.value.toLowerCase().trim() || "";
  const yard = document.getElementById("mandiYardFilter")?.value || "ALL";
  const comm = document.getElementById("mandiCommodityFilter")?.value || "ALL";

  const filtered = MANDI_DATA_STORE.filter(item => {
    const matchSearch = item.commodity.toLowerCase().includes(search) || item.variety.toLowerCase().includes(search) || item.yard.toLowerCase().includes(search);
    const matchYard = (yard === "ALL") || (item.yard === yard);
    const matchComm = (comm === "ALL") || (item.commodity === comm);
    return matchSearch && matchYard && matchComm;
  });

  const countDisplay = document.getElementById("mandiCountDisplay");
  if (countDisplay) {
    countDisplay.textContent = \`Showing \${filtered.length} of \${MANDI_DATA_STORE.length} Daily Mandi Price Quotes\`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="py-8 text-center text-xs text-[#64748B]">No mandi prices matching filters.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    return \`
      <tr class="hover:bg-[#F8FAFC] transition">
        <td class="py-3 px-4">
          <div class="font-bold text-[#0F172A]">\${item.commodity}</div>
          <div class="text-[10px] text-[#64748B] mt-0.5">\${item.variety}</div>
        </td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800">\${item.yard}</span>
        </td>
        <td class="py-3 px-4 text-[#64748B] font-semibold">
          INR \${item.minPrice.toLocaleString()}
        </td>
        <td class="py-3 px-4">
          <span class="font-black text-[#0B6623] text-sm">INR \${item.modalPrice.toLocaleString()}</span>
        </td>
        <td class="py-3 px-4 text-[#64748B] font-semibold">
          INR \${item.maxPrice.toLocaleString()}
        </td>
        <td class="py-3 px-4 font-mono font-bold text-[#0F172A]">
          \${item.arrivals.toLocaleString()} Qtl
        </td>
        <td class="py-3 px-4 text-[10px] text-[#64748B]">
          \${item.date}
        </td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openPriceHistoryModal('\${item.id}')" class="h-7 px-2 bg-slate-800 hover:bg-[#0F172A] text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1" title="30-Day Trend">
              <i data-lucide="line-chart" class="w-3 h-3"></i> Trend
            </button>
            <button onclick="openViewMandiPriceModal('\${item.id}')" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#64748B] flex items-center justify-center transition" title="View Specs">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="deleteMandiPriceItem('\${item.id}')" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-[#64748B] flex items-center justify-center transition" title="Delete">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    \`;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

function filterMandiTable() {
  renderMandiTable();
}

function openAddMandiPriceModal() {
  const m = document.getElementById("addMandiPriceModal");
  if (m) m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeAddMandiPriceModal() {
  const m = document.getElementById("addMandiPriceModal");
  if (m) m.classList.add("hidden");
}

function handleSaveMandiPrice(e) {
  if (e) e.preventDefault();
  const yard = document.getElementById("newMandiYard")?.value;
  const commodity = document.getElementById("newMandiCommodity")?.value;
  const variety = document.getElementById("newMandiVariety")?.value;
  const arrivals = parseInt(document.getElementById("newMandiArrivals")?.value || "1000", 10);
  const minPrice = parseInt(document.getElementById("newMandiMinPrice")?.value || "6000", 10);
  const modalPrice = parseInt(document.getElementById("newMandiModalPrice")?.value || "6500", 10);
  const maxPrice = parseInt(document.getElementById("newMandiMaxPrice")?.value || "7000", 10);

  const newId = "MND-" + (MANDI_DATA_STORE.length + 1).toString().padStart(2, "0");
  MANDI_DATA_STORE.unshift({
    id: newId,
    commodity,
    variety,
    yard,
    minPrice,
    modalPrice,
    maxPrice,
    arrivals,
    date: new Date().toISOString().split("T")[0],
    specs: "Standard APMC Fair Average Quality benchmark."
  });

  closeAddMandiPriceModal();
  renderMandiTable();
  if (typeof showToast === "function") showToast(\`Price for \${commodity} at \${yard} published successfully.\`, "success");
}

function deleteMandiPriceItem(id) {
  const idx = MANDI_DATA_STORE.findIndex(m => m.id === id);
  if (idx === -1) return;
  const item = MANDI_DATA_STORE[idx];
  MANDI_DATA_STORE.splice(idx, 1);
  renderMandiTable();
  if (typeof showToast === "function") showToast(\`Deleted rate quote for \${item.commodity}.\`, "info");
}

function openViewMandiPriceModal(id) {
  const item = MANDI_DATA_STORE.find(m => m.id === id);
  if (!item) return;
  const m = document.getElementById("viewMandiPriceModal");
  if (!m) return;

  document.getElementById("viewMandiYardBadge").textContent = item.yard;
  document.getElementById("viewMandiTitle").textContent = \`\${item.commodity} — \${item.variety}\`;
  document.getElementById("viewMandiDate").textContent = \`Recorded: \${item.date} • \${item.arrivals.toLocaleString()} Qtl Arrivals\`;
  document.getElementById("viewMandiMin").textContent = \`INR \${item.minPrice.toLocaleString()}\`;
  document.getElementById("viewMandiModal").textContent = \`INR \${item.modalPrice.toLocaleString()}\`;
  document.getElementById("viewMandiMax").textContent = \`INR \${item.maxPrice.toLocaleString()}\`;
  document.getElementById("viewMandiSpecs").textContent = item.specs;

  const trendBtn = document.getElementById("viewMandiHistoryBtn");
  if (trendBtn) {
    trendBtn.onclick = () => { closeViewMandiPriceModal(); openPriceHistoryModal(item.id); };
  }

  m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeViewMandiPriceModal() {
  const m = document.getElementById("viewMandiPriceModal");
  if (m) m.classList.add("hidden");
}

function openPriceHistoryModal(id) {
  const item = MANDI_DATA_STORE.find(m => m.id === id);
  if (!item) return;
  const m = document.getElementById("viewPriceHistoryModal");
  if (!m) return;

  document.getElementById("historyModalTitle").textContent = \`\${item.commodity} \${item.variety} • \${item.yard}\`;
  m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closePriceHistoryModal() {
  const m = document.getElementById("viewPriceHistoryModal");
  if (m) m.classList.add("hidden");
}

function exportMandiTicker() {
  if (typeof showToast === "function") showToast("Exported daily APMC mandi price stream to CSV.", "success");
}

// Auto render tables
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    renderToolsTable();
    renderServicesTable();
    renderMandiTable();
  });
} else {
  renderToolsTable();
  renderServicesTable();
  renderMandiTable();
}
`;

module.exports = {
  contentHtml,
  contentJs: baseContentJs + '\n\n' + newToolsServicesMandiJs
};
