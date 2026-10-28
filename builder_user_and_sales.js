// builder_user_and_sales.js
// Exports newUserHtml, newUserJs, offersSchemesHtml, offersSchemesJs
// 100% English only. Zero Gujarati characters. Modern 2026 SaaS design.

const newUserHtml = `
          <!-- =============================================================
               VIEW: NEW USER REGISTRATION (Role-based Dynamic Fields + Multi-Crop)
               ============================================================= -->
          <div id="view-new-user" class="hidden space-y-6 view-section">
            
            <!-- Header Bar -->
            <div class="saas-card p-6 bg-gradient-to-r from-emerald-50/70 via-white to-blue-50/40 border border-emerald-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <span class="w-2 h-2 rounded-full bg-[#0B6623] animate-pulse"></span>
                  SaaS Unified Identity Provisioning
                </div>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">Register New User</h2>
                <p class="text-xs text-[#64748B] mt-0.5">
                  Dynamically provision user access across Farmer Network, Agri-Retailers, Wholesale Dealers, Agro-Processors, and Portal Staff.
                </p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="navigateTo('user-list', 'Users', 'User list')" class="h-9 px-4 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F8FAFC] text-xs font-bold text-[#334155] shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to User List
                </button>
              </div>
            </div>

            <!-- Form & Live Identity Card Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              <!-- Left Form Card (2 Columns on Desktop) -->
              <div class="lg:col-span-2 saas-card p-6 space-y-6">
                
                <form id="newUserForm" onsubmit="handleCreateUser(event)" class="space-y-6">
                  
                  <!-- Section 1: Core Credentials & Role Selection -->
                  <div>
                    <h3 class="text-xs font-black uppercase tracking-wider text-[#64748B] mb-3 flex items-center gap-2">
                      <span class="w-5 h-5 rounded-md bg-emerald-100 text-[#0B6623] inline-flex items-center justify-center font-bold text-[10px]">1</span>
                      Core Credentials & Role Assignment
                    </h3>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <!-- Full Name -->
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Full Name <span class="text-rose-500">*</span></label>
                        <input id="newUserNameInput" oninput="updateNewUserPreview()" type="text" value="Jayesh Patel" required placeholder="e.g. Jayeshbhai Patel" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs transition">
                      </div>

                      <!-- Mobile Number -->
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Mobile Number <span class="text-rose-500">*</span></label>
                        <input id="newUserMobileInput" oninput="updateNewUserPreview()" type="tel" value="+91 98250 12345" required placeholder="+91 98250 00000" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono font-semibold outline-none focus:border-[#0B6623] text-xs transition">
                      </div>

                      <!-- Email Address -->
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Email Address (Optional)</label>
                        <input id="newUserEmailInput" oninput="updateNewUserPreview()" type="email" placeholder="user@ankurmitra.in" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs transition">
                      </div>

                      <!-- Role Select Dropdown (Triggers Dynamic Form Fields) -->
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">User Role <span class="text-rose-500">*</span></label>
                        <select id="newUserRoleSelect" onchange="handleUserRoleChange(this.value)" class="w-full h-10 px-3 bg-[#F8FAFC] border border-emerald-300 rounded-xl font-bold text-[#0B6623] outline-none focus:border-[#0B6623] text-xs transition shadow-2xs">
                          <option value="Farmer" selected>Farmer (Cultivator)</option>
                          <option value="Retailer">Retailer (Agri-Input Store)</option>
                          <option value="Dealer">Dealer (Wholesale Distributor)</option>
                          <option value="Industrial">Industrial (Agro-Processor / Mill)</option>
                          <option value="Staff">Portal Staff (Ops / Maintenance / Agronomist)</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- =========================================================
                       DYNAMIC SECTION: FARMER FIELDS (Shown by Default)
                       ========================================================= -->
                  <div id="roleFieldsFarmer" class="space-y-4 pt-4 border-t border-[#E5E7EB]">
                    <h3 class="text-xs font-black uppercase tracking-wider text-emerald-800 mb-3 flex items-center gap-2">
                      <span class="w-5 h-5 rounded-md bg-emerald-100 text-[#0B6623] inline-flex items-center justify-center font-bold text-[10px]">2</span>
                      Farmer Agronomy & Land Details
                    </h3>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Village <span class="text-rose-500">*</span></label>
                        <input id="newUserVillageInput" oninput="updateNewUserPreview()" type="text" value="Sudavad" placeholder="Village name" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Taluka <span class="text-rose-500">*</span></label>
                        <select id="newUserTalukaSelect" onchange="updateNewUserPreview()" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs transition">
                          <option value="Amreli" selected>Amreli</option>
                          <option value="Bagasara">Bagasara</option>
                          <option value="Dhari">Dhari</option>
                          <option value="Kunkavav Vadia">Kunkavav Vadia</option>
                          <option value="Lathi">Lathi</option>
                          <option value="Lilia">Lilia</option>
                          <option value="Savarkundla">Savarkundla</option>
                          <option value="Babra">Babra</option>
                          <option value="Jafrabad">Jafrabad</option>
                          <option value="Rajula">Rajula</option>
                          <option value="Khambha">Khambha</option>
                        </select>
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">District <span class="text-rose-500">*</span></label>
                        <input id="newUserDistrictInput" oninput="updateNewUserPreview()" type="text" value="Amreli" placeholder="District" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs transition">
                      </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Total Landholding (Acres)</label>
                        <input id="newUserLandAcresInput" oninput="updateNewUserPreview()" type="number" step="0.5" value="12.5" placeholder="e.g. 12.5" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Khata / Survey No.</label>
                        <input id="newUserSurveyNoInput" oninput="updateNewUserPreview()" type="text" value="Khata #284 / Survey 142/P" placeholder="7/12 Survey No" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Irrigation Setup</label>
                        <select id="newUserIrrigationSelect" onchange="updateNewUserPreview()" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623] text-xs transition">
                          <option value="Drip Irrigation (Micro-irrigation)" selected>Drip Irrigation</option>
                          <option value="Sprinkler Irrigation">Sprinkler Irrigation</option>
                          <option value="Borewell / Tube Well">Borewell / Tube Well</option>
                          <option value="Canal Command Water">Canal Command Water</option>
                          <option value="Rainfed (Monsoon only)">Rainfed (Monsoon only)</option>
                        </select>
                      </div>
                    </div>

                    <!-- MULTIPLE SELECTION PRIMARY CROP PICKER -->
                    <div class="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 space-y-3">
                      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                        <div>
                          <label class="block font-bold text-[#0F172A] text-xs">
                            Primary Crops Cultivated <span class="text-rose-500">*</span>
                            <span class="text-emerald-700 font-normal ml-1.5">(Allow multiple selections)</span>
                          </label>
                          <p class="text-[11px] text-[#64748B]">Click badges to toggle crops grown across Kharif, Rabi, and Summer cycles.</p>
                        </div>
                        <span id="selectedCropsCountBadge" class="text-[11px] font-extrabold text-[#0B6623] bg-emerald-100/90 px-2.5 py-0.5 rounded-full self-start sm:self-auto">
                          3 Crops Selected
                        </span>
                      </div>

                      <!-- Interactive Multi-Select Crop Chips -->
                      <div id="cropChipPickerContainer" class="flex flex-wrap gap-2 pt-1">
                        <!-- Populated by JavaScript, with default active: Cotton, Groundnut, Wheat -->
                      </div>

                      <!-- Custom Crop Input -->
                      <div class="flex items-center gap-2 pt-2 border-t border-emerald-200/60">
                        <input id="customCropInput" type="text" placeholder="Add custom crop (e.g. Fennel, Guava)..." class="flex-1 h-9 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold outline-none focus:border-[#0B6623]">
                        <button type="button" onclick="addCustomCropTag()" class="h-9 px-4 bg-emerald-700 hover:bg-[#0B6623] text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1">
                          <i data-lucide="plus" class="w-3.5 h-3.5"></i> Add Crop
                        </button>
                      </div>
                      
                      <!-- Hidden field for form submission -->
                      <input type="hidden" id="newUserSelectedCropsHidden" name="crops" value="Cotton, Groundnut, Wheat">
                    </div>
                  </div>

                  <!-- =========================================================
                       DYNAMIC SECTION: RETAILER FIELDS (Agri-Input Store)
                       ========================================================= -->
                  <div id="roleFieldsRetailer" class="hidden space-y-4 pt-4 border-t border-[#E5E7EB]">
                    <h3 class="text-xs font-black uppercase tracking-wider text-blue-700 mb-3 flex items-center gap-2">
                      <span class="w-5 h-5 rounded-md bg-blue-100 text-blue-700 inline-flex items-center justify-center font-bold text-[10px]">2</span>
                      Retail Store & Commercial Licensing
                    </h3>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Retail Business Name <span class="text-rose-500">*</span></label>
                        <input id="newRetailerBusinessInput" oninput="updateNewUserPreview()" type="text" placeholder="e.g. Kisan Agro Kendra" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-blue-600 text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">GSTIN Number <span class="text-rose-500">*</span></label>
                        <input id="newRetailerGstinInput" oninput="updateNewUserPreview()" type="text" placeholder="24AAAAA0000A1Z5" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono uppercase font-semibold outline-none focus:border-blue-600 text-xs transition">
                      </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Fertilizer & Seed Retail License</label>
                        <input id="newRetailerLicenseInput" oninput="updateNewUserPreview()" type="text" placeholder="GJ-AML-RTL-2026-901" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Market Yard / Village</label>
                        <input id="newRetailerMarketInput" oninput="updateNewUserPreview()" type="text" placeholder="e.g. APMC Market Yard Amreli" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Credit Line Requested</label>
                        <select id="newRetailerCreditSelect" onchange="updateNewUserPreview()" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs transition">
                          <option value="INR 5 Lakhs (Standard)">INR 5 Lakhs (Standard)</option>
                          <option value="INR 10 Lakhs (Silver Tier)">INR 10 Lakhs (Silver Tier)</option>
                          <option value="INR 25 Lakhs (Gold Tier)">INR 25 Lakhs (Gold Tier)</option>
                          <option value="Cash and Carry Only">Cash and Carry Only</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- =========================================================
                       DYNAMIC SECTION: DEALER FIELDS (Wholesale Distributor)
                       ========================================================= -->
                  <div id="roleFieldsDealer" class="hidden space-y-4 pt-4 border-t border-[#E5E7EB]">
                    <h3 class="text-xs font-black uppercase tracking-wider text-amber-700 mb-3 flex items-center gap-2">
                      <span class="w-5 h-5 rounded-md bg-amber-100 text-amber-800 inline-flex items-center justify-center font-bold text-[10px]">2</span>
                      Dealership Enterprise & Logistics Infrastructure
                    </h3>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Dealership Enterprise Name <span class="text-rose-500">*</span></label>
                        <input id="newDealerFirmInput" oninput="updateNewUserPreview()" type="text" placeholder="e.g. Saurashtra Agro Distributors LLP" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-amber-600 text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Distributor Code / Permitted Territory</label>
                        <input id="newDealerCodeInput" oninput="updateNewUserPreview()" type="text" placeholder="DLR-AMR-ZONE-1" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono text-xs transition">
                      </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Godown Capacity (Metric Tonnes)</label>
                        <input id="newDealerGodownInput" oninput="updateNewUserPreview()" type="number" placeholder="e.g. 500" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Commercial Delivery Vehicles</label>
                        <input id="newDealerFleetInput" oninput="updateNewUserPreview()" type="number" placeholder="e.g. 4 trucks" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Regional Supply Hub</label>
                        <select id="newDealerHubSelect" onchange="updateNewUserPreview()" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs transition">
                          <option value="Amreli Central Hub">Amreli Central Hub</option>
                          <option value="Rajkot West Hub">Rajkot West Hub</option>
                          <option value="Bhavnagar Port Hub">Bhavnagar Port Hub</option>
                          <option value="Surat South Hub">Surat South Hub</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- =========================================================
                       DYNAMIC SECTION: INDUSTRIAL FIELDS (Agro-Processor / Mill)
                       ========================================================= -->
                  <div id="roleFieldsIndustrial" class="hidden space-y-4 pt-4 border-t border-[#E5E7EB]">
                    <h3 class="text-xs font-black uppercase tracking-wider text-purple-700 mb-3 flex items-center gap-2">
                      <span class="w-5 h-5 rounded-md bg-purple-100 text-purple-800 inline-flex items-center justify-center font-bold text-[10px]">2</span>
                      Industrial Processing Unit & Procurement Specifications
                    </h3>

                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Processing Mill / Factory Name <span class="text-rose-500">*</span></label>
                        <input id="newIndustrialNameInput" oninput="updateNewUserPreview()" type="text" placeholder="e.g. Gujarat Ginning and Cotton Fibers Ltd." class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-purple-600 text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Industrial Sector <span class="text-rose-500">*</span></label>
                        <select id="newIndustrialSectorSelect" onchange="updateNewUserPreview()" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold text-xs transition">
                          <option value="Cotton Ginning and Baling Mill">Cotton Ginning and Baling Mill</option>
                          <option value="Groundnut Oil Extraction Plant">Groundnut Oil Extraction Plant</option>
                          <option value="Flour Mill and Grain Processing">Flour Mill and Grain Processing</option>
                          <option value="Bio-Fertilizer and Organic Composting">Bio-Fertilizer and Organic Composting</option>
                          <option value="Spices Dehydration and Export">Spices Dehydration and Export</option>
                        </select>
                      </div>
                    </div>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">CIN / Udyam MSME Number</label>
                        <input id="newIndustrialCinInput" oninput="updateNewUserPreview()" type="text" placeholder="U01100GJ2026PTC087612" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Daily Intake Throughput (MT/Day)</label>
                        <input id="newIndustrialCapacityInput" oninput="updateNewUserPreview()" type="number" placeholder="e.g. 150 MT" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Primary Procurement Yard</label>
                        <input id="newIndustrialYardInput" oninput="updateNewUserPreview()" type="text" placeholder="Amreli APMC Yard Gate 2" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs transition">
                      </div>
                    </div>
                  </div>

                  <!-- =========================================================
                       DYNAMIC SECTION: STAFF FIELDS (Admin, Ops, Maintenance)
                       ========================================================= -->
                  <div id="roleFieldsStaff" class="hidden space-y-4 pt-4 border-t border-[#E5E7EB]">
                    <h3 class="text-xs font-black uppercase tracking-wider text-indigo-700 mb-3 flex items-center gap-2">
                      <span class="w-5 h-5 rounded-md bg-indigo-100 text-indigo-800 inline-flex items-center justify-center font-bold text-[10px]">2</span>
                      Portal Staff Clearance & Operations Desk
                    </h3>

                    <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Staff Employee ID <span class="text-rose-500">*</span></label>
                        <input id="newStaffIdInput" oninput="updateNewUserPreview()" type="text" placeholder="EMP-AM-4412" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono text-xs transition">
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Department</label>
                        <select id="newStaffDeptSelect" onchange="updateNewUserPreview()" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs transition">
                          <option value="Agronomy Intelligence Desk">Agronomy Intelligence Desk</option>
                          <option value="Logistics and Fleet Operations">Logistics and Fleet Operations</option>
                          <option value="System Health and DevOps">System Health and DevOps</option>
                          <option value="BI Analytics and Reporting">BI Analytics and Reporting</option>
                          <option value="Customer Support Desk">Customer Support Desk</option>
                        </select>
                      </div>
                      <div>
                        <label class="block font-bold text-[#0F172A] mb-1.5">Access Tier</label>
                        <select id="newStaffTierSelect" onchange="updateNewUserPreview()" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs transition">
                          <option value="Operator (Standard Write)">Operator (Standard Write)</option>
                          <option value="Supervisor (Approver)">Supervisor (Approver)</option>
                          <option value="Agronomist Specialist">Agronomist Specialist</option>
                          <option value="Platform Administrator">Platform Administrator</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <!-- Provisioning Options -->
                  <div class="pt-4 border-t border-[#E5E7EB] text-xs space-y-2">
                    <label class="flex items-center gap-2 cursor-pointer font-semibold text-[#0F172A]">
                      <input id="provisionStatusActiveCheck" type="checkbox" checked class="rounded text-[#0B6623] focus:ring-0">
                      <span>Grant immediate Active status (bypasses pending queue)</span>
                    </label>
                    <label class="flex items-center gap-2 cursor-pointer font-semibold text-[#0F172A]">
                      <input id="provisionSmsOtpCheck" type="checkbox" checked class="rounded text-[#0B6623] focus:ring-0">
                      <span>Send onboarding SMS with credentials & portal link</span>
                    </label>
                  </div>

                  <!-- Action Buttons -->
                  <div class="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                    <button type="button" onclick="navigateTo('user-list', 'Users', 'User list')" class="h-10 px-5 rounded-xl border border-[#E5E7EB] text-xs font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                      Cancel
                    </button>
                    <button type="submit" class="h-10 px-6 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition">
                      <i data-lucide="check" class="w-4 h-4"></i> Save User
                    </button>
                  </div>
                </form>
              </div>

              <!-- Right: Live SaaS Identity Preview Card -->
              <div class="saas-card p-5 space-y-4">
                <div class="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <h3 class="text-xs font-bold text-[#0F172A]">Live Identity Preview</h3>
                  <span class="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Realtime Sync
                  </span>
                </div>

                <!-- Digital ID Card Container -->
                <div id="liveIdentityCardContainer" class="p-5 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-slate-50 rounded-2xl border border-emerald-200/80 space-y-4 shadow-2xs">
                  
                  <!-- Top Row: Avatar & Role Pill -->
                  <div class="flex items-start justify-between">
                    <div id="previewBadgeAvatar" class="w-12 h-12 rounded-2xl bg-[#0B6623] text-white flex items-center justify-center font-black text-base shadow-xs">
                      JP
                    </div>
                    <span id="previewBadgeRole" class="px-3 py-1 rounded-full bg-[#0B6623] text-white font-black text-[11px] shadow-2xs">
                      Farmer
                    </span>
                  </div>

                  <!-- Name and Organization -->
                  <div>
                    <div id="previewBadgeName" class="font-black text-lg text-[#0F172A]">Jayesh Patel</div>
                    <div id="previewBadgeSubtitle" class="text-xs text-[#64748B] font-medium">Sudavad, Amreli - 12.5 Acres</div>
                  </div>

                  <!-- Dynamic Key-Value Grid -->
                  <div class="grid grid-cols-2 gap-2.5 text-[11px] pt-3 border-t border-emerald-200/60 text-[#0F172A]">
                    <div>
                      <span class="text-[#64748B] block text-[10px] font-medium">Location:</span>
                      <span id="previewBadgePlace" class="font-bold">Sudavad, Amreli</span>
                    </div>
                    <div>
                      <span class="text-[#64748B] block text-[10px] font-medium">Contact:</span>
                      <span id="previewBadgeMobile" class="font-mono font-bold">+91 98250 12345</span>
                    </div>
                    <div class="col-span-2">
                      <span id="previewDynamicLabel" class="text-[#64748B] block text-[10px] font-medium">Primary Crops:</span>
                      <div id="previewDynamicValueContainer" class="flex flex-wrap gap-1 mt-1">
                        <!-- Dynamic Tags rendered here -->
                        <span class="px-2 py-0.5 bg-emerald-100 text-[#0B6623] rounded-md font-bold text-[10px]">Cotton</span>
                        <span class="px-2 py-0.5 bg-emerald-100 text-[#0B6623] rounded-md font-bold text-[10px]">Groundnut</span>
                        <span class="px-2 py-0.5 bg-emerald-100 text-[#0B6623] rounded-md font-bold text-[10px]">Wheat</span>
                      </div>
                    </div>
                    <div>
                      <span class="text-[#64748B] block text-[10px] font-medium">System UID:</span>
                      <span class="font-mono font-bold text-[#0B6623]">#AM-2026-9921</span>
                    </div>
                    <div>
                      <span class="text-[#64748B] block text-[10px] font-medium">Verification:</span>
                      <span class="font-bold text-emerald-700 inline-flex items-center gap-1">
                        <i data-lucide="check-circle-2" class="w-3 h-3"></i> Auto Verified
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Explanation / Security Checklist -->
                <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] text-[11px] text-[#64748B] space-y-2">
                  <div class="font-bold text-[#0F172A] flex items-center gap-1.5">
                    <i data-lucide="shield-check" class="w-4 h-4 text-[#0B6623]"></i> Immediate Ecosystem Access
                  </div>
                  <p class="leading-relaxed">
                    Upon clicking <span class="font-bold text-[#0F172A]">Save User</span>, this identity profile will be immediately activated across AnkurMitra mobile app feeds, Mandi pricing updates, and field agronomy logs.
                  </p>
                </div>

              </div>

            </div>
          </div>
`;

const newUserJs = `
// ============================================================================
// NEW USER & ROLE CONTROLLER (Multi-Select Crops & Role-Driven Fields)
// ============================================================================

const AVAILABLE_CROPS_LIST = [
  "Cotton", "Groundnut", "Wheat", "Cumin", "Castor", 
  "Soybean", "Onion", "Garlic", "Bajra", "Banana", 
  "Mango", "Tur", "Chilli", "Pomegranate", "Potato", "Mustard", "Maize"
];

let selectedUserCrops = ["Cotton", "Groundnut", "Wheat"];

function initCropChipPicker() {
  const container = document.getElementById("cropChipPickerContainer");
  if (!container) return;
  
  container.innerHTML = AVAILABLE_CROPS_LIST.map(crop => {
    const isSelected = selectedUserCrops.includes(crop);
    return renderCropChipHtml(crop, isSelected);
  }).join("");

  updateSelectedCropsBadge();
}

function renderCropChipHtml(crop, isSelected) {
  if (isSelected) {
    return \`<button type="button" onclick="toggleUserCropPill('\${crop}')" class="crop-pill-btn px-3 py-1.5 rounded-xl text-xs font-bold bg-[#0B6623] text-white border border-[#0B6623] shadow-xs flex items-center gap-1.5 transition">
      <i data-lucide="check" class="w-3 h-3"></i> \${crop}
    </button>\`;
  } else {
    return \`<button type="button" onclick="toggleUserCropPill('\${crop}')" class="crop-pill-btn px-3 py-1.5 rounded-xl text-xs font-semibold bg-[#F8FAFC] hover:bg-[#F1F5F9] text-[#334155] border border-[#E5E7EB] flex items-center gap-1.5 transition">
      <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> \${crop}
    </button>\`;
  }
}

function toggleUserCropPill(crop) {
  const index = selectedUserCrops.indexOf(crop);
  if (index > -1) {
    if (selectedUserCrops.length === 1) {
      if (typeof showToast === "function") showToast("At least one primary crop must be selected.", "warning");
      return;
    }
    selectedUserCrops.splice(index, 1);
  } else {
    selectedUserCrops.push(crop);
  }
  
  const hiddenInput = document.getElementById("newUserSelectedCropsHidden");
  if (hiddenInput) hiddenInput.value = selectedUserCrops.join(", ");
  
  initCropChipPicker();
  updateNewUserPreview();
  if (window.lucide) lucide.createIcons();
}

function addCustomCropTag() {
  const input = document.getElementById("customCropInput");
  if (!input) return;
  const val = input.value.trim();
  if (!val) return;
  
  if (!AVAILABLE_CROPS_LIST.includes(val)) {
    AVAILABLE_CROPS_LIST.push(val);
  }
  if (!selectedUserCrops.includes(val)) {
    selectedUserCrops.push(val);
  }
  input.value = "";
  
  const hiddenInput = document.getElementById("newUserSelectedCropsHidden");
  if (hiddenInput) hiddenInput.value = selectedUserCrops.join(", ");
  
  initCropChipPicker();
  updateNewUserPreview();
  if (typeof showToast === "function") showToast(\`Added "\${val}" to selected crops.\`, "success");
  if (window.lucide) lucide.createIcons();
}

function updateSelectedCropsBadge() {
  const badge = document.getElementById("selectedCropsCountBadge");
  if (badge) {
    badge.textContent = \`\${selectedUserCrops.length} Crop\${selectedUserCrops.length > 1 ? "s" : ""} Selected\`;
  }
}

function handleUserRoleChange(role) {
  // Hide all dynamic role sections
  const sections = [
    "roleFieldsFarmer",
    "roleFieldsRetailer",
    "roleFieldsDealer",
    "roleFieldsIndustrial",
    "roleFieldsStaff"
  ];
  sections.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  });

  // Reveal matching role section
  if (role === "Farmer") {
    const f = document.getElementById("roleFieldsFarmer");
    if (f) f.classList.remove("hidden");
  } else if (role === "Retailer") {
    const r = document.getElementById("roleFieldsRetailer");
    if (r) r.classList.remove("hidden");
  } else if (role === "Dealer") {
    const d = document.getElementById("roleFieldsDealer");
    if (d) d.classList.remove("hidden");
  } else if (role === "Industrial") {
    const i = document.getElementById("roleFieldsIndustrial");
    if (i) i.classList.remove("hidden");
  } else if (role === "Staff" || role === "Operate" || role === "Maintenance" || role === "Analysis") {
    const s = document.getElementById("roleFieldsStaff");
    if (s) s.classList.remove("hidden");
  }

  updateNewUserPreview();
  if (window.lucide) lucide.createIcons();
}

function updateNewUserPreview() {
  const name = document.getElementById("newUserNameInput")?.value || "New User";
  const mobile = document.getElementById("newUserMobileInput")?.value || "+91 00000 00000";
  const role = document.getElementById("newUserRoleSelect")?.value || "Farmer";

  // Initials
  const initials = name.split(" ").map(w => w[0]).join("").substring(0, 2).toUpperCase() || "NU";
  const avatarEl = document.getElementById("previewBadgeAvatar");
  if (avatarEl) avatarEl.textContent = initials;

  // Name & Mobile
  const nameEl = document.getElementById("previewBadgeName");
  if (nameEl) nameEl.textContent = name;
  const mobEl = document.getElementById("previewBadgeMobile");
  if (mobEl) mobEl.textContent = mobile;

  // Role Pill Styling
  const roleEl = document.getElementById("previewBadgeRole");
  const subEl = document.getElementById("previewBadgeSubtitle");
  const placeEl = document.getElementById("previewBadgePlace");
  const dynLabel = document.getElementById("previewDynamicLabel");
  const dynVal = document.getElementById("previewDynamicValueContainer");

  if (role === "Farmer") {
    if (roleEl) {
      roleEl.textContent = "Farmer";
      roleEl.className = "px-3 py-1 rounded-full bg-[#0B6623] text-white font-black text-[11px] shadow-2xs";
    }
    const village = document.getElementById("newUserVillageInput")?.value || "Village";
    const district = document.getElementById("newUserDistrictInput")?.value || "Amreli";
    const acres = document.getElementById("newUserLandAcresInput")?.value || "10";
    if (subEl) subEl.textContent = \`\${village}, \${district} • \${acres} Acres\`;
    if (placeEl) placeEl.textContent = \`\${village}, \${district}\`;
    if (dynLabel) dynLabel.textContent = "Primary Crops:";
    if (dynVal) {
      dynVal.innerHTML = selectedUserCrops.slice(0, 4).map(c => 
        \`<span class="px-2 py-0.5 bg-emerald-100 text-[#0B6623] rounded-md font-bold text-[10px]">\${c}</span>\`
      ).join("") + (selectedUserCrops.length > 4 ? \`<span class="px-2 py-0.5 bg-emerald-50 text-[#0B6623] rounded-md font-bold text-[10px]">+\${selectedUserCrops.length - 4} more</span>\` : "");
    }
  } else if (role === "Retailer") {
    if (roleEl) {
      roleEl.textContent = "Retailer";
      roleEl.className = "px-3 py-1 rounded-full bg-blue-600 text-white font-black text-[11px] shadow-2xs";
    }
    const shop = document.getElementById("newRetailerBusinessInput")?.value || "Kisan Agro Kendra";
    const market = document.getElementById("newRetailerMarketInput")?.value || "Market Yard";
    const credit = document.getElementById("newRetailerCreditSelect")?.value || "INR 5 Lakhs";
    if (subEl) subEl.textContent = \`\${shop} • \${market}\`;
    if (placeEl) placeEl.textContent = market;
    if (dynLabel) dynLabel.textContent = "Authorized Credit Tier:";
    if (dynVal) dynVal.innerHTML = \`<span class="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-md font-bold text-[10px]">\${credit}</span>\`;
  } else if (role === "Dealer") {
    if (roleEl) {
      roleEl.textContent = "Wholesale Dealer";
      roleEl.className = "px-3 py-1 rounded-full bg-amber-600 text-white font-black text-[11px] shadow-2xs";
    }
    const firm = document.getElementById("newDealerFirmInput")?.value || "Distributor Agency";
    const hub = document.getElementById("newDealerHubSelect")?.value || "Amreli Hub";
    const godown = document.getElementById("newDealerGodownInput")?.value || "500";
    if (subEl) subEl.textContent = \`\${firm} • \${hub}\`;
    if (placeEl) placeEl.textContent = hub;
    if (dynLabel) dynLabel.textContent = "Logistics Capacity:";
    if (dynVal) dynVal.innerHTML = \`<span class="px-2 py-0.5 bg-amber-100 text-amber-800 rounded-md font-bold text-[10px]">\${godown} MT Godown</span>\`;
  } else if (role === "Industrial") {
    if (roleEl) {
      roleEl.textContent = "Industrial Mill";
      roleEl.className = "px-3 py-1 rounded-full bg-purple-600 text-white font-black text-[11px] shadow-2xs";
    }
    const mill = document.getElementById("newIndustrialNameInput")?.value || "Cotton Ginning & Baling";
    const sec = document.getElementById("newIndustrialSectorSelect")?.value || "Processing";
    const cap = document.getElementById("newIndustrialCapacityInput")?.value || "150";
    if (subEl) subEl.textContent = \`\${mill}\`;
    if (placeEl) placeEl.textContent = "Amreli Industrial Area";
    if (dynLabel) dynLabel.textContent = "Daily Intake:";
    if (dynVal) dynVal.innerHTML = \`<span class="px-2 py-0.5 bg-purple-100 text-purple-800 rounded-md font-bold text-[10px]">\${cap} MT/Day</span>\`;
  } else {
    if (roleEl) {
      roleEl.textContent = "Portal Staff";
      roleEl.className = "px-3 py-1 rounded-full bg-indigo-600 text-white font-black text-[11px] shadow-2xs";
    }
    const dept = document.getElementById("newStaffDeptSelect")?.value || "Agronomy Ops";
    const empId = document.getElementById("newStaffIdInput")?.value || "EMP-AM-01";
    if (subEl) subEl.textContent = \`\${dept} • \${empId}\`;
    if (placeEl) placeEl.textContent = "Central Command Desk";
    if (dynLabel) dynLabel.textContent = "Desk Clearance:";
    if (dynVal) dynVal.innerHTML = \`<span class="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded-md font-bold text-[10px]">\${dept}</span>\`;
  }
}

function handleCreateUser(e) {
  if (e) e.preventDefault();
  const name = document.getElementById("newUserNameInput")?.value || "User";
  const role = document.getElementById("newUserRoleSelect")?.value || "Farmer";
  
  if (typeof showToast === "function") {
    showToast(\`Successfully provisioned \${role} profile for "\${name}".\`, "success");
  }
  
  setTimeout(() => {
    if (typeof navigateTo === "function") {
      navigateTo("user-list", "Users", "User list");
    }
  }, 1000);
}

// Auto-run crop picker setup on page load
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initCropChipPicker);
} else {
  initCropChipPicker();
}
`;

const offersSchemesHtml = `
          <!-- =============================================================
               VIEW: OFFERS AND SCHEMES (Commercial Promos & Subsidy Hub)
               ============================================================= -->
          <div id="view-offers-schemes" class="hidden space-y-6 view-section">
            
            <!-- Header Strip -->
            <div class="saas-card p-6 bg-gradient-to-r from-emerald-50/80 via-white to-amber-50/60 border border-emerald-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <span class="w-2 h-2 rounded-full bg-[#0B6623] animate-pulse"></span>
                  Kharif 2026 Commercial Promos & Government Program Linkages
                </div>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">Offers and schemes</h2>
                <p class="text-xs text-[#64748B] mt-0.5 font-medium">
                  Manage commercial coupons, seasonal fertilizer discounts, dealer commission rebates, and public DBT subsidy incentive programs.
                </p>
              </div>
              <div class="flex flex-wrap items-center gap-2.5">
                <button onclick="openAddOfferModal()" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="plus" class="w-4 h-4"></i>
                  <span>Add Offer</span>
                </button>
                <button onclick="exportOffersReport()" class="h-9 px-3.5 bg-white hover:bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="download" class="w-4 h-4 text-[#64748B]"></i>
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            <!-- KPI Summary Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="saas-card p-5 border-l-4 border-l-[#0B6623]">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Active Campaigns</span>
                  <span class="w-8 h-8 rounded-xl bg-emerald-50 text-[#0B6623] flex items-center justify-center">
                    <i data-lucide="tag" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2" id="kpiActiveOffersCount">12 Active</div>
                <div class="text-[11px] text-emerald-700 font-bold mt-1 flex items-center gap-1">
                  <i data-lucide="trending-up" class="w-3 h-3"></i> +3 launching next week
                </div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-blue-600">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Farmer Redemptions</span>
                  <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <i data-lucide="users" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">18,450</div>
                <div class="text-[11px] text-blue-700 font-bold mt-1">Across 842 Village Centers</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-amber-500">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Subsidy Disbursed</span>
                  <span class="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
                    <i data-lucide="indian-rupee" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">INR 42.8 Lakhs</div>
                <div class="text-[11px] text-amber-700 font-bold mt-1">Direct DBT & in-store credits</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-purple-600">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Avg. Cart Benefit</span>
                  <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <i data-lucide="percent" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">14.8%</div>
                <div class="text-[11px] text-purple-700 font-bold mt-1">Net farmer input cost reduction</div>
              </div>
            </div>

            <!-- Main Offers Table & Filter Panel -->
            <div class="saas-card p-6 space-y-4">
              
              <!-- Toolbar & Search -->
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div class="flex flex-wrap items-center gap-2">
                  <div class="relative">
                    <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>
                    <input id="offersSearchInput" oninput="filterOffersTable()" type="text" placeholder="Search coupon code or title..." class="h-9 pl-9 pr-3 text-xs bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-medium outline-none focus:border-[#0B6623] w-64 transition">
                  </div>
                  
                  <!-- Target Audience Filter -->
                  <select id="offersAudienceFilter" onchange="filterOffersTable()" class="h-9 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#334155] outline-none focus:border-[#0B6623]">
                    <option value="ALL">All Audiences</option>
                    <option value="Farmers">Farmers Only</option>
                    <option value="Retailers">Retailers Only</option>
                    <option value="Dealers">Wholesale Dealers</option>
                  </select>

                  <!-- Category Filter -->
                  <select id="offersCategoryFilter" onchange="filterOffersTable()" class="h-9 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#334155] outline-none focus:border-[#0B6623]">
                    <option value="ALL">All Categories</option>
                    <option value="Fertilizers">Fertilizers & Soil</option>
                    <option value="Seeds">Certified Seeds</option>
                    <option value="Crop Protection">Crop Protection</option>
                    <option value="Micro-Irrigation">Micro-Irrigation</option>
                    <option value="Government Subsidy">Government Subsidy</option>
                  </select>
                </div>

                <div class="text-xs font-bold text-[#64748B]" id="offersCountDisplay">
                  Showing 6 Offers & Campaigns
                </div>
              </div>

              <!-- Table Container -->
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="bg-[#F8FAFC] text-[#64748B] font-bold border-y border-[#E5E7EB]">
                    <tr>
                      <th class="py-3 px-4">Offer / Promo Campaign</th>
                      <th class="py-3 px-4">Target & Category</th>
                      <th class="py-3 px-4">Discount / Benefit</th>
                      <th class="py-3 px-4">Min Order / Cap</th>
                      <th class="py-3 px-4">Validity Window</th>
                      <th class="py-3 px-4">Redemptions</th>
                      <th class="py-3 px-4">Status</th>
                      <th class="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="offersTableBody" class="divide-y divide-[#E5E7EB] font-medium text-[#0F172A]">
                    <!-- Dynamically rendered by renderOffersTable() -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- =========================================================
                 MODAL: ADD NEW OFFER
                 ========================================================= -->
            <div id="addOfferModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E7EB]">
                <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white z-10">
                  <div>
                    <h3 class="text-lg font-black text-[#0F172A]">Add New Offer or Scheme</h3>
                    <p class="text-xs text-[#64748B]">Create a promotional voucher code or public subsidy incentive rule.</p>
                  </div>
                  <button type="button" onclick="closeAddOfferModal()" class="w-8 h-8 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <form onsubmit="handleSaveOffer(event)" class="p-6 space-y-4 text-xs">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Campaign Title <span class="text-rose-500">*</span></label>
                      <input id="newOfferTitle" type="text" required placeholder="e.g. Monsoon Urea Booster Voucher" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Promo / Coupon Code <span class="text-rose-500">*</span></label>
                      <input id="newOfferCode" type="text" required placeholder="e.g. MONSOON26" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono uppercase font-bold outline-none focus:border-[#0B6623]">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Target Audience <span class="text-rose-500">*</span></label>
                      <select id="newOfferAudience" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                        <option value="Farmers">Farmers</option>
                        <option value="Retailers">Retailers</option>
                        <option value="Dealers">Dealers</option>
                        <option value="All Users">All Users</option>
                      </select>
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Product Category <span class="text-rose-500">*</span></label>
                      <select id="newOfferCategory" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                        <option value="Fertilizers">Fertilizers & Soil</option>
                        <option value="Seeds">Certified Seeds</option>
                        <option value="Crop Protection">Crop Protection</option>
                        <option value="Micro-Irrigation">Micro-Irrigation</option>
                        <option value="Government Subsidy">Government Subsidy</option>
                      </select>
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Discount Type</label>
                      <select id="newOfferType" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                        <option value="Percentage">Percentage Discount (%)</option>
                        <option value="Flat">Flat Cash Rebate (INR)</option>
                        <option value="Subsidy Match">Govt Subsidy Match</option>
                      </select>
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Benefit Value <span class="text-rose-500">*</span></label>
                      <input id="newOfferValue" type="text" required placeholder="e.g. 15% or INR 250" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Min. Order Value (INR)</label>
                      <input id="newOfferMinOrder" type="number" value="1000" placeholder="e.g. 1500" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Max Savings Cap (INR)</label>
                      <input id="newOfferMaxCap" type="number" value="1500" placeholder="e.g. 2000" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Start Date</label>
                      <input id="newOfferStartDate" type="date" value="2026-10-01" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Expiry Date</label>
                      <input id="newOfferEndDate" type="date" value="2026-12-31" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                  </div>

                  <div>
                    <label class="block font-bold text-[#0F172A] mb-1">Terms & Conditions</label>
                    <textarea id="newOfferTerms" rows="2" placeholder="e.g. Valid only on purchases made through authorized AnkurMitra Kendra retail counters in Saurashtra cluster." class="w-full p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-medium outline-none focus:border-[#0B6623]"></textarea>
                  </div>

                  <div class="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                    <button type="button" onclick="closeAddOfferModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                      Cancel
                    </button>
                    <button type="submit" class="h-10 px-6 bg-[#0B6623] hover:bg-[#074818] text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                      <i data-lucide="check" class="w-4 h-4"></i> Save Offer
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- =========================================================
                 MODAL: VIEW OFFER DETAILS & VOUCHER
                 ========================================================= -->
            <div id="viewOfferModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-xl w-full shadow-2xl border border-[#E5E7EB] overflow-hidden">
                <div class="p-6 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-start justify-between">
                  <div>
                    <span id="viewOfferBadge" class="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-bold text-[10px] uppercase tracking-wider">
                      Active Campaign
                    </span>
                    <h3 id="viewOfferTitle" class="text-xl font-black mt-2">Monsoon Cotton Booster Voucher</h3>
                    <p id="viewOfferCategory" class="text-xs text-emerald-100 mt-0.5">Fertilizers & Soil Health • For Farmers</p>
                  </div>
                  <button type="button" onclick="closeViewOfferModal()" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <div class="p-6 space-y-5 text-xs">
                  <!-- Voucher Code Banner -->
                  <div class="p-4 bg-emerald-50 rounded-2xl border border-dashed border-emerald-300 flex items-center justify-between">
                    <div>
                      <span class="text-[10px] text-[#64748B] font-bold uppercase tracking-wider block">Voucher Code</span>
                      <span id="viewOfferCode" class="text-xl font-mono font-black text-[#0B6623]">COTTONBOOST26</span>
                    </div>
                    <button onclick="copyOfferCode()" class="h-9 px-3.5 bg-[#0B6623] hover:bg-[#074818] text-white rounded-xl font-bold flex items-center gap-1.5 transition">
                      <i data-lucide="copy" class="w-3.5 h-3.5"></i> Copy Code
                    </button>
                  </div>

                  <!-- Details Grid -->
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Benefit</span>
                      <span id="viewOfferBenefit" class="font-extrabold text-[#0F172A] text-sm">15% Instant Off</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Min Order</span>
                      <span id="viewOfferMinOrder" class="font-extrabold text-[#0F172A] text-sm">INR 1,500</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Max Cap</span>
                      <span id="viewOfferMaxCap" class="font-extrabold text-[#0F172A] text-sm">INR 1,500</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Valid From</span>
                      <span id="viewOfferStart" class="font-bold text-[#0F172A]">01 Oct 2026</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Valid Until</span>
                      <span id="viewOfferEnd" class="font-bold text-[#0F172A]">31 Dec 2026</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Total Claimed</span>
                      <span id="viewOfferClaims" class="font-extrabold text-emerald-700">4,280 redemptions</span>
                    </div>
                  </div>

                  <!-- Terms -->
                  <div>
                    <h4 class="font-bold text-[#0F172A] mb-1.5">Terms and Redemption Protocol</h4>
                    <p id="viewOfferTerms" class="text-xs text-[#64748B] leading-relaxed p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      Applicable at all authorized AnkurMitra Kendra retail partner outlets across Amreli and Rajkot districts. Valid on purchases of certified NPK, Urea, and micronutrient packs.
                    </p>
                  </div>

                  <div class="pt-3 border-t border-[#E5E7EB] flex items-center justify-end">
                    <button type="button" onclick="closeViewOfferModal()" class="h-10 px-6 bg-[#0F172A] hover:bg-slate-800 text-white font-bold rounded-xl transition">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
`;

const offersSchemesJs = `
// ============================================================================
// OFFERS & SCHEMES CONTROLLER
// ============================================================================

let OFFERS_DATA_STORE = [
  {
    id: "OFFER-01",
    title: "Monsoon Cotton Fertilizer Booster",
    code: "COTTONBOOST26",
    audience: "Farmers",
    category: "Fertilizers",
    benefit: "15% Instant Off",
    minOrder: 1500,
    maxCap: 1500,
    validFrom: "2026-10-01",
    validTo: "2026-12-31",
    claims: 4280,
    budgetCap: 6000,
    active: true,
    terms: "Valid on all bio-fertilizers and micronutrient soil conditioning kits at participating village counters."
  },
  {
    id: "OFFER-02",
    title: "Certified Groundnut Seed Subsidy Match",
    code: "GNDNUT-SUB40",
    audience: "Farmers",
    category: "Government Subsidy",
    benefit: "40% Subsidy Match",
    minOrder: 2500,
    maxCap: 4000,
    validFrom: "2026-10-05",
    validTo: "2026-11-30",
    claims: 3120,
    budgetCap: 5000,
    active: true,
    terms: "Government Direct Benefit Transfer linked. Farmer 7/12 land survey records verified on purchase."
  },
  {
    id: "OFFER-03",
    title: "Wholesale Dealer Volume Incentive",
    code: "DLR-BULK-50",
    audience: "Dealers",
    category: "Crop Protection",
    benefit: "INR 250 / MT Rebate",
    minOrder: 50000,
    maxCap: 25000,
    validFrom: "2026-10-10",
    validTo: "2026-12-15",
    claims: 184,
    budgetCap: 300,
    active: true,
    terms: "For wholesale godown shipments exceeding 20 Metric Tonnes per delivery invoice."
  },
  {
    id: "OFFER-04",
    title: "Micro-Drip Kit Installation Rebate",
    code: "DRIP-CARE-20",
    audience: "Farmers",
    category: "Micro-Irrigation",
    benefit: "INR 1,200 Flat Off",
    minOrder: 8000,
    maxCap: 1200,
    validFrom: "2026-09-15",
    validTo: "2026-11-15",
    claims: 890,
    budgetCap: 1500,
    active: true,
    terms: "Includes free field technician visit for drip pressure regulator testing and filter cleaning."
  },
  {
    id: "OFFER-05",
    title: "Retailer Early Settlement Cashback",
    code: "RTL-QUICKPAY",
    audience: "Retailers",
    category: "Fertilizers",
    benefit: "2.5% Invoice Rebate",
    minOrder: 20000,
    maxCap: 10000,
    validFrom: "2026-10-01",
    validTo: "2026-12-31",
    claims: 560,
    budgetCap: 1000,
    active: true,
    terms: "Auto-credited when fertilizer wholesale balance is cleared within 7 calendar days."
  },
  {
    id: "OFFER-06",
    title: "Organic Trichoderma Soil Care Pack",
    code: "BIO-SHIELD10",
    audience: "Farmers",
    category: "Crop Protection",
    benefit: "10% Off + Free Kit",
    minOrder: 800,
    maxCap: 500,
    validFrom: "2026-10-01",
    validTo: "2026-11-20",
    claims: 1420,
    budgetCap: 2000,
    active: false,
    terms: "Limited stock batch manufactured by Junagadh Bio-Control Laboratories."
  }
];

function renderOffersTable() {
  const tbody = document.getElementById("offersTableBody");
  if (!tbody) return;

  const search = document.getElementById("offersSearchInput")?.value.toLowerCase().trim() || "";
  const audience = document.getElementById("offersAudienceFilter")?.value || "ALL";
  const category = document.getElementById("offersCategoryFilter")?.value || "ALL";

  const filtered = OFFERS_DATA_STORE.filter(item => {
    const matchSearch = item.title.toLowerCase().includes(search) || item.code.toLowerCase().includes(search);
    const matchAudience = (audience === "ALL") || (item.audience === audience);
    const matchCat = (category === "ALL") || (item.category === category);
    return matchSearch && matchAudience && matchCat;
  });

  const countDisplay = document.getElementById("offersCountDisplay");
  if (countDisplay) {
    countDisplay.textContent = \`Showing \${filtered.length} of \${OFFERS_DATA_STORE.length} Offers & Campaigns\`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = \`
      <tr>
        <td colspan="8" class="py-8 text-center text-xs text-[#64748B]">
          No matching offers or schemes found. Try resetting search filters.
        </td>
      </tr>
    \`;
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    const progressPercent = Math.min(100, Math.round((item.claims / item.budgetCap) * 100));
    return \`
      <tr class="hover:bg-[#F8FAFC] transition">
        <td class="py-3 px-4">
          <div class="font-bold text-[#0F172A]">\${item.title}</div>
          <div class="flex items-center gap-2 mt-1">
            <span class="font-mono font-bold text-[#0B6623] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 text-[10px]">
              \${item.code}
            </span>
          </div>
        </td>
        <td class="py-3 px-4">
          <span class="inline-block px-2 py-0.5 rounded-md text-[10px] font-bold \${getOfferAudienceStyle(item.audience)}">
            \${item.audience}
          </span>
          <div class="text-[10px] text-[#64748B] mt-0.5">\${item.category}</div>
        </td>
        <td class="py-3 px-4">
          <div class="font-black text-[#0F172A]">\${item.benefit}</div>
        </td>
        <td class="py-3 px-4">
          <div class="text-[11px] font-semibold text-[#0F172A]">Min: INR \${item.minOrder.toLocaleString()}</div>
          <div class="text-[10px] text-[#64748B]">Cap: INR \${item.maxCap.toLocaleString()}</div>
        </td>
        <td class="py-3 px-4 text-[10px] text-[#64748B]">
          <div>From: <span class="font-semibold text-[#0F172A]">\${item.validFrom}</span></div>
          <div>To: <span class="font-semibold text-[#0F172A]">\${item.validTo}</span></div>
        </td>
        <td class="py-3 px-4">
          <div class="text-[11px] font-bold text-[#0F172A]">\${item.claims.toLocaleString()} / \${item.budgetCap.toLocaleString()}</div>
          <div class="w-24 h-1.5 bg-[#E2E8F0] rounded-full overflow-hidden mt-1">
            <div class="h-full bg-[#0B6623] rounded-full" style="width: \${progressPercent}%"></div>
          </div>
        </td>
        <td class="py-3 px-4">
          <button onclick="toggleOfferItemStatus('\${item.id}')" class="px-2.5 py-1 rounded-full text-[10px] font-bold transition \${item.active ? 'bg-emerald-100 text-[#0B6623] hover:bg-emerald-200' : 'bg-slate-200 text-slate-600 hover:bg-slate-300'}">
            \${item.active ? 'Active' : 'Paused'}
          </button>
        </td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openViewOfferModal('\${item.id}')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-[#0B6623] flex items-center justify-center text-[#64748B] transition" title="View Full Details">
              <i data-lucide="eye" class="w-4 h-4"></i>
            </button>
            <button onclick="deleteOfferItem('\${item.id}')" class="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-50 hover:text-rose-600 flex items-center justify-center text-[#64748B] transition" title="Delete Offer">
              <i data-lucide="trash-2" class="w-4 h-4"></i>
            </button>
          </div>
        </td>
      </tr>
    \`;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

function getOfferAudienceStyle(aud) {
  if (aud === "Farmers") return "bg-emerald-100 text-[#0B6623]";
  if (aud === "Retailers") return "bg-blue-100 text-blue-800";
  if (aud === "Dealers") return "bg-amber-100 text-amber-800";
  return "bg-slate-100 text-slate-700";
}

function filterOffersTable() {
  renderOffersTable();
}

function toggleOfferItemStatus(id) {
  const item = OFFERS_DATA_STORE.find(o => o.id === id);
  if (!item) return;
  item.active = !item.active;
  renderOffersTable();
  if (typeof showToast === "function") {
    showToast(\`Offer "\${item.code}" is now \${item.active ? 'Active' : 'Paused'}.\`, "info");
  }
}

function openAddOfferModal() {
  const modal = document.getElementById("addOfferModal");
  if (modal) modal.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeAddOfferModal() {
  const modal = document.getElementById("addOfferModal");
  if (modal) modal.classList.add("hidden");
}

function handleSaveOffer(e) {
  if (e) e.preventDefault();
  const title = document.getElementById("newOfferTitle")?.value;
  const code = document.getElementById("newOfferCode")?.value.toUpperCase().trim();
  const audience = document.getElementById("newOfferAudience")?.value;
  const category = document.getElementById("newOfferCategory")?.value;
  const benefit = document.getElementById("newOfferValue")?.value;
  const minOrder = parseInt(document.getElementById("newOfferMinOrder")?.value || "1000", 10);
  const maxCap = parseInt(document.getElementById("newOfferMaxCap")?.value || "1500", 10);
  const validFrom = document.getElementById("newOfferStartDate")?.value || "2026-10-01";
  const validTo = document.getElementById("newOfferEndDate")?.value || "2026-12-31";
  const terms = document.getElementById("newOfferTerms")?.value || "Terms apply.";

  const newId = "OFFER-" + (OFFERS_DATA_STORE.length + 1).toString().padStart(2, "0");

  OFFERS_DATA_STORE.unshift({
    id: newId,
    title,
    code,
    audience,
    category,
    benefit,
    minOrder,
    maxCap,
    validFrom,
    validTo,
    claims: 0,
    budgetCap: 2500,
    active: true,
    terms
  });

  closeAddOfferModal();
  renderOffersTable();
  if (typeof showToast === "function") {
    showToast(\`Offer "\${code}" successfully created and activated.\`, "success");
  }
}

function deleteOfferItem(id) {
  const idx = OFFERS_DATA_STORE.findIndex(o => o.id === id);
  if (idx === -1) return;
  const item = OFFERS_DATA_STORE[idx];
  
  OFFERS_DATA_STORE.splice(idx, 1);
  renderOffersTable();
  if (typeof showToast === "function") {
    showToast(\`Offer "\${item.code}" deleted.\`, "info");
  }
}

function openViewOfferModal(id) {
  const item = OFFERS_DATA_STORE.find(o => o.id === id);
  if (!item) return;

  const modal = document.getElementById("viewOfferModal");
  if (!modal) return;

  document.getElementById("viewOfferTitle").textContent = item.title;
  document.getElementById("viewOfferCategory").textContent = \`\${item.category} • For \${item.audience}\`;
  document.getElementById("viewOfferCode").textContent = item.code;
  document.getElementById("viewOfferBenefit").textContent = item.benefit;
  document.getElementById("viewOfferMinOrder").textContent = \`INR \${item.minOrder.toLocaleString()}\`;
  document.getElementById("viewOfferMaxCap").textContent = \`INR \${item.maxCap.toLocaleString()}\`;
  document.getElementById("viewOfferStart").textContent = item.validFrom;
  document.getElementById("viewOfferEnd").textContent = item.validTo;
  document.getElementById("viewOfferClaims").textContent = \`\${item.claims.toLocaleString()} redemptions\`;
  document.getElementById("viewOfferTerms").textContent = item.terms;

  modal.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeViewOfferModal() {
  const modal = document.getElementById("viewOfferModal");
  if (modal) modal.classList.add("hidden");
}

function copyOfferCode() {
  const code = document.getElementById("viewOfferCode")?.textContent || "";
  if (navigator.clipboard) {
    navigator.clipboard.writeText(code);
  }
  if (typeof showToast === "function") {
    showToast(\`Voucher code "\${code}" copied to clipboard!\`, "success");
  }
}

function exportOffersReport() {
  if (typeof showToast === "function") {
    showToast("Exported active offers and subsidy redemption ledger to CSV.", "success");
  }
}

// Backward-compatibility aliases
function openNewOfferModal() { openAddOfferModal(); }
function closeNewOfferModal() { closeAddOfferModal(); }
function toggleOfferRowStatus(id) { toggleOfferItemStatus(id); }
function approveOfferLink() { if (typeof showToast === "function") showToast("Offer linked to partner portal successfully.", "success"); }

// Auto render on ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderOffersTable);
} else {
  renderOffersTable();
}
`;

module.exports = {
  newUserHtml,
  newUserJs,
  offersSchemesHtml,
  offersSchemesJs
};
