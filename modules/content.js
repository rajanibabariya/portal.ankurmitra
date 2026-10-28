// modules/content.js
// Content Module: A21 Ads, A22 Smart alerts, A23 Farmer community, A24 Knowledge hub, A25 Tool rental, A29 Nearby services, A30 Mandi prices
// Fully redesigned with Add, Delete, and View modals with rich details.

const contentHtml = `
          <!-- -------------------------------------------------------------
               VIEW: ADS (A21) - Redesigned with Add, Delete, View Modal
               ------------------------------------------------------------- -->
          <div id="view-ads" class="hidden space-y-6 view-section">
            <!-- Header & KPI Summary -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <i data-lucide="megaphone" class="w-4 h-4"></i>
                  <span>In-App Banners & Sponsored Placements</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Advertising Campaigns Hub</h2>
                <p class="text-xs text-[#64748B]">Manage hero banners, contextual ads, and sponsored brand campaigns across Gujarat user base.</p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="exportAdsReport()" class="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition flex items-center gap-1.5">
                  <i data-lucide="download" class="w-4 h-4"></i>
                  <span>Export</span>
                </button>
                <button type="button" onclick="openAddAdModal()" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-xs flex items-center gap-2 transition">
                  <i data-lucide="plus" class="w-4 h-4"></i>
                  <span>Create Campaign</span>
                </button>
              </div>
            </div>

            <!-- Performance Metric Cards -->
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="saas-card p-4">
                <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Active Campaigns</div>
                <div class="text-2xl font-black text-[#0F172A] mt-1" id="activeAdsCountDisplay">4 Live</div>
                <div class="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                  <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> +1 scheduled for Diwali
                </div>
              </div>
              <div class="saas-card p-4">
                <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Impressions</div>
                <div class="text-2xl font-black text-[#0F172A] mt-1">2.48 M</div>
                <div class="text-[11px] text-emerald-600 font-semibold mt-1">Saurashtra cluster (92%)</div>
              </div>
              <div class="saas-card p-4">
                <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Total Clicks</div>
                <div class="text-2xl font-black text-[#0F172A] mt-1">154.2 K</div>
                <div class="text-[11px] text-emerald-600 font-semibold mt-1">Avg CTR: 6.2%</div>
              </div>
              <div class="saas-card p-4">
                <div class="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Campaign Spend</div>
                <div class="text-2xl font-black text-[#0B6623] mt-1">₹ 1,84,500</div>
                <div class="text-[11px] text-slate-500 font-semibold mt-1">ROI: 4.8x GMV generated</div>
              </div>
            </div>

            <!-- Filter & Search Bar -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="relative flex-1 max-w-md">
                <i data-lucide="search" class="w-4 h-4 absolute left-3 top-3 text-[#64748B]"></i>
                <input id="adsSearchInput" oninput="filterAdsTable()" type="text" placeholder="Search campaign by title, brand, or placement..." class="w-full h-10 pl-9 pr-4 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#0F172A] outline-none focus:border-[#0B6623] shadow-2xs">
              </div>
              <div class="flex items-center gap-2">
                <select id="adPlacementFilter" onchange="filterAdsTable()" class="h-10 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-slate-700 outline-none focus:border-[#0B6623]">
                  <option value="all">All Placements</option>
                  <option value="Home Carousel">Home Carousel</option>
                  <option value="Mandi Sticky">Mandi Sticky Banner</option>
                  <option value="Crop Doctor Footer">Crop Doctor Footer</option>
                </select>
              </div>
            </div>

            <!-- Ads Table -->
            <div class="saas-card overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table" id="adsTable">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3.5">Campaign & Advertiser</th>
                      <th class="px-5 py-3.5">Placement</th>
                      <th class="px-5 py-3.5">Impressions</th>
                      <th class="px-5 py-3.5">Clicks (CTR)</th>
                      <th class="px-5 py-3.5">Duration</th>
                      <th class="px-5 py-3.5">Status</th>
                      <th class="px-5 py-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium" id="adsTableBody">
                    <!-- Row 1 -->
                    <tr class="hover:bg-slate-50/70 transition" data-id="ad-1" data-title="Kishan Hybrid Cotton Seed Fest" data-brand="Mahyco Agro" data-placement="Home Carousel">
                      <td class="px-5 py-4">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-xl bg-emerald-100 text-[#0B6623] flex items-center justify-center font-black text-sm flex-shrink-0">
                            AD1
                          </div>
                          <div>
                            <div class="font-extrabold text-[#0F172A]">Kishan Hybrid Cotton Seed Fest</div>
                            <div class="text-[11px] text-[#64748B]">Sponsor: Mahyco Agro Gujarat</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-4">
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">Home Carousel</span>
                      </td>
                      <td class="px-5 py-4 font-mono font-bold text-slate-800">842,500</td>
                      <td class="px-5 py-4 font-mono font-bold text-slate-800">
                        58,400 <span class="text-emerald-600 text-[10px]">(6.9%)</span>
                      </td>
                      <td class="px-5 py-4 text-slate-600 font-mono text-[11px]">01 Oct – 31 Oct 2026</td>
                      <td class="px-5 py-4">
                        <span id="adStatus-1" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                        </span>
                      </td>
                      <td class="px-5 py-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                          <button type="button" onclick="openViewAdModal('ad-1')" class="p-1.5 text-slate-500 hover:text-[#0B6623] hover:bg-emerald-50 rounded-lg transition" title="View Ad Details">
                            <i data-lucide="eye" class="w-4 h-4"></i>
                          </button>
                          <button type="button" id="adBtn-1" onclick="toggleAdStatus(1, 'Kishan Hybrid Cotton Seed Fest')" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition">
                            Pause
                          </button>
                          <button type="button" onclick="deleteAd('ad-1')" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete Ad">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <!-- Row 2 -->
                    <tr class="hover:bg-slate-50/70 transition" data-id="ad-2" data-title="IFFCO Nano Urea Autumn Scheme" data-brand="IFFCO Gujarat" data-placement="Mandi Sticky">
                      <td class="px-5 py-4">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm flex-shrink-0">
                            AD2
                          </div>
                          <div>
                            <div class="font-extrabold text-[#0F172A]">IFFCO Nano Urea Autumn Scheme</div>
                            <div class="text-[11px] text-[#64748B]">Sponsor: IFFCO State Marketing</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-4">
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">Mandi Sticky</span>
                      </td>
                      <td class="px-5 py-4 font-mono font-bold text-slate-800">624,100</td>
                      <td class="px-5 py-4 font-mono font-bold text-slate-800">
                        39,800 <span class="text-emerald-600 text-[10px]">(6.4%)</span>
                      </td>
                      <td class="px-5 py-4 text-slate-600 font-mono text-[11px]">05 Oct – 25 Oct 2026</td>
                      <td class="px-5 py-4">
                        <span id="adStatus-2" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                        </span>
                      </td>
                      <td class="px-5 py-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                          <button type="button" onclick="openViewAdModal('ad-2')" class="p-1.5 text-slate-500 hover:text-[#0B6623] hover:bg-emerald-50 rounded-lg transition" title="View Ad Details">
                            <i data-lucide="eye" class="w-4 h-4"></i>
                          </button>
                          <button type="button" id="adBtn-2" onclick="toggleAdStatus(2, 'IFFCO Nano Urea Autumn Scheme')" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition">
                            Pause
                          </button>
                          <button type="button" onclick="deleteAd('ad-2')" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete Ad">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <!-- Row 3 -->
                    <tr class="hover:bg-slate-50/70 transition" data-id="ad-3" data-title="Bayer Belt Expert Bollworm Spray" data-brand="Bayer CropScience" data-placement="Crop Doctor Footer">
                      <td class="px-5 py-4">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-black text-sm flex-shrink-0">
                            AD3
                          </div>
                          <div>
                            <div class="font-extrabold text-[#0F172A]">Bayer Belt Expert Bollworm Spray</div>
                            <div class="text-[11px] text-[#64748B]">Sponsor: Bayer CropScience India</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-4">
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">Crop Doctor Footer</span>
                      </td>
                      <td class="px-5 py-4 font-mono font-bold text-slate-800">415,200</td>
                      <td class="px-5 py-4 font-mono font-bold text-slate-800">
                        28,900 <span class="text-emerald-600 text-[10px]">(7.0%)</span>
                      </td>
                      <td class="px-5 py-4 text-slate-600 font-mono text-[11px]">10 Oct – 05 Nov 2026</td>
                      <td class="px-5 py-4">
                        <span id="adStatus-3" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
                        </span>
                      </td>
                      <td class="px-5 py-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                          <button type="button" onclick="openViewAdModal('ad-3')" class="p-1.5 text-slate-500 hover:text-[#0B6623] hover:bg-emerald-50 rounded-lg transition" title="View Ad Details">
                            <i data-lucide="eye" class="w-4 h-4"></i>
                          </button>
                          <button type="button" id="adBtn-3" onclick="toggleAdStatus(3, 'Bayer Belt Expert Bollworm Spray')" class="px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition">
                            Pause
                          </button>
                          <button type="button" onclick="deleteAd('ad-3')" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete Ad">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                    <!-- Row 4 -->
                    <tr class="hover:bg-slate-50/70 transition" data-id="ad-4" data-title="Jain Drip Irrigation 70% Subsidy Drive" data-brand="Jain Irrigation Systems" data-placement="Home Carousel">
                      <td class="px-5 py-4">
                        <div class="flex items-center gap-3">
                          <div class="w-10 h-10 rounded-xl bg-slate-100 text-slate-700 flex items-center justify-center font-black text-sm flex-shrink-0">
                            AD4
                          </div>
                          <div>
                            <div class="font-extrabold text-[#0F172A]">Jain Drip Irrigation 70% Subsidy Drive</div>
                            <div class="text-[11px] text-[#64748B]">Sponsor: Jain Irrigation Systems Ltd</div>
                          </div>
                        </div>
                      </td>
                      <td class="px-5 py-4">
                        <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">Home Carousel</span>
                      </td>
                      <td class="px-5 py-4 font-mono font-bold text-slate-800">598,000</td>
                      <td class="px-5 py-4 font-mono font-bold text-slate-800">
                        27,100 <span class="text-slate-500 text-[10px]">(4.5%)</span>
                      </td>
                      <td class="px-5 py-4 text-slate-600 font-mono text-[11px]">15 Oct – 15 Nov 2026</td>
                      <td class="px-5 py-4">
                        <span id="adStatus-4" class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600">
                          <span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Inactive
                        </span>
                      </td>
                      <td class="px-5 py-4 text-right">
                        <div class="flex items-center justify-end gap-1.5">
                          <button type="button" onclick="openViewAdModal('ad-4')" class="p-1.5 text-slate-500 hover:text-[#0B6623] hover:bg-emerald-50 rounded-lg transition" title="View Ad Details">
                            <i data-lucide="eye" class="w-4 h-4"></i>
                          </button>
                          <button type="button" id="adBtn-4" onclick="toggleAdStatus(4, 'Jain Drip Irrigation 70% Subsidy Drive')" class="px-2.5 py-1 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-[11px] font-bold text-emerald-700 transition">
                            Turn on
                          </button>
                          <button type="button" onclick="deleteAd('ad-4')" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete Ad">
                            <i data-lucide="trash-2" class="w-4 h-4"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- MODAL: ADD AD -->
            <div id="addAdModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B6623] flex items-center justify-center">
                      <i data-lucide="plus" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]">Create Ad Campaign</h3>
                      <p class="text-[11px] text-slate-500">Deploy banner placements across web & app</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeAddAdModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <form onsubmit="handleSaveAd(event)" class="p-6 space-y-4 text-xs">
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Campaign Title <span class="text-rose-500">*</span></label>
                    <input id="adTitleInput" type="text" required placeholder="e.g. Gujarat Groundnut Seed Pre-Booking" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Advertiser / Brand <span class="text-rose-500">*</span></label>
                      <input id="adBrandInput" type="text" required placeholder="e.g. GSFC Fertilizers" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Placement Target <span class="text-rose-500">*</span></label>
                      <select id="adPlacementInput" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                        <option value="Home Carousel">Home Carousel</option>
                        <option value="Mandi Sticky">Mandi Sticky Banner</option>
                        <option value="Crop Doctor Footer">Crop Doctor Footer</option>
                      </select>
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Start Date</label>
                      <input id="adStartDateInput" type="date" value="2026-10-27" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">End Date</label>
                      <input id="adEndDateInput" type="date" value="2026-11-27" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Destination Web / App URL</label>
                    <input id="adUrlInput" type="url" placeholder="https://ankurmitra.in/dealers/offer" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Target District / Audience</label>
                    <input id="adAudienceInput" type="text" value="Amreli, Junagadh, Rajkot Farmers" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeAddAdModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs">Publish Campaign</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: VIEW AD FULL DETAILS -->
            <div id="viewAdModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2.5">
                    <div class="w-9 h-9 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-black text-sm">
                      <i data-lucide="eye" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]" id="viewAdModalTitle">Campaign Inspection</h3>
                      <p class="text-[11px] text-slate-500" id="viewAdModalSubtitle">Sponsor Details & Live Creative Preview</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeViewAdModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="p-6 space-y-5 text-xs max-h-[80vh] overflow-y-auto">
                  <!-- Creative Preview Box -->
                  <div class="rounded-xl border border-slate-200 overflow-hidden bg-gradient-to-r from-emerald-600 to-teal-700 text-white p-5 relative">
                    <span class="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/30 text-[10px] uppercase font-bold tracking-wider">Sponsored</span>
                    <div class="text-[11px] font-bold text-emerald-200" id="viewAdBrand">Brand Name</div>
                    <div class="text-lg font-black mt-1" id="viewAdHeadline">Headline Banner Text</div>
                    <p class="text-xs text-emerald-100 mt-1 max-w-md">Certified seeds and agro-inputs delivered to village doorstep. Special Kharif pre-booking discounts live now.</p>
                    <div class="mt-4 flex items-center gap-3">
                      <button type="button" class="px-3.5 py-1.5 rounded-lg bg-white text-[#0B6623] font-bold text-xs shadow-xs">Order via AnkurMitra</button>
                      <span class="text-[11px] text-emerald-200">T&C Apply · Gujarat Agri Dept Approved</span>
                    </div>
                  </div>

                  <!-- Details Grid -->
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <div class="text-[10px] font-bold text-slate-400 uppercase">Placement</div>
                      <div class="font-extrabold text-[#0F172A] mt-0.5" id="viewAdPlacement">Home Carousel</div>
                    </div>
                    <div>
                      <div class="text-[10px] font-bold text-slate-400 uppercase">Schedule</div>
                      <div class="font-extrabold text-[#0F172A] mt-0.5" id="viewAdSchedule">01 Oct – 31 Oct 2026</div>
                    </div>
                    <div>
                      <div class="text-[10px] font-bold text-slate-400 uppercase">Status</div>
                      <div class="font-extrabold text-emerald-600 mt-0.5" id="viewAdStatus">Active Live</div>
                    </div>
                    <div>
                      <div class="text-[10px] font-bold text-slate-400 uppercase">Impressions</div>
                      <div class="font-mono font-extrabold text-slate-800 mt-0.5" id="viewAdImpressions">842,500</div>
                    </div>
                    <div>
                      <div class="text-[10px] font-bold text-slate-400 uppercase">Clicks / CTR</div>
                      <div class="font-mono font-extrabold text-slate-800 mt-0.5" id="viewAdCtr">58,400 (6.9%)</div>
                    </div>
                    <div>
                      <div class="text-[10px] font-bold text-slate-400 uppercase">Audience</div>
                      <div class="font-extrabold text-slate-800 mt-0.5">Saurashtra Farmers</div>
                    </div>
                  </div>

                  <!-- Action Buttons -->
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeViewAdModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Close</button>
                    <button type="button" onclick="showToast('Ad campaign analytics exported to PDF', 'success'); closeViewAdModal();" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-1.5">
                      <i data-lucide="download" class="w-3.5 h-3.5"></i>
                      <span>Download Report</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: SMART ALERTS (A22)
               ------------------------------------------------------------- -->
          <div id="view-smart-alerts" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div class="flex items-center gap-3">
                <span class="text-xs font-semibold text-[#64748B]">Emergency Crop Alerts & Weather Advisories</span>
                <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">2 Active advisories</span>
              </div>
              <button onclick="openSendAlertModal()" class="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-xs font-bold text-white shadow-xs flex items-center gap-2 transition">
                <i data-lucide="bell-ring" class="w-4 h-4"></i>
                <span>Broadcast Alert</span>
              </button>
            </div>

            <!-- Alerts Table -->
            <div class="saas-card overflow-hidden">
              <table class="w-full text-left border-collapse saas-table" id="alertsTable">
                <thead>
                  <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                    <th class="px-5 py-3.5">Alert Subject</th>
                    <th class="px-5 py-3.5">Category</th>
                    <th class="px-5 py-3.5">Target Talukas</th>
                    <th class="px-5 py-3.5">Recipients</th>
                    <th class="px-5 py-3.5">Broadcast Time</th>
                    <th class="px-5 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium">
                  <tr class="hover:bg-slate-50 transition">
                    <td class="px-5 py-4 font-bold text-[#0F172A]">
                      <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-rose-500"></span>
                        Pink Bollworm Outbreak Advisory (Kharif Cotton)
                      </div>
                    </td>
                    <td class="px-5 py-4"><span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">Critical Pest</span></td>
                    <td class="px-5 py-4 text-slate-700">Amreli, Bagasara, Babra</td>
                    <td class="px-5 py-4 font-mono font-bold">14,820 Farmers</td>
                    <td class="px-5 py-4 text-slate-500">Today, 08:30 AM</td>
                    <td class="px-5 py-4 text-right">
                      <button onclick="showToast('Re-broadcasting notification...', 'info')" class="px-3 py-1 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-50">Resend</button>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition">
                    <td class="px-5 py-4 font-bold text-[#0F172A]">
                      <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-amber-500"></span>
                        Groundnut Pod Drying Window - 4 Days Dry Weather
                      </div>
                    </td>
                    <td class="px-5 py-4"><span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-700 border border-amber-200">Harvest Advisory</span></td>
                    <td class="px-5 py-4 text-slate-700">All 11 Amreli Talukas</td>
                    <td class="px-5 py-4 font-mono font-bold">28,450 Farmers</td>
                    <td class="px-5 py-4 text-slate-500">Yesterday, 04:15 PM</td>
                    <td class="px-5 py-4 text-right">
                      <button onclick="showToast('Notification details opened', 'info')" class="px-3 py-1 rounded-lg border border-slate-200 text-slate-700 font-bold hover:bg-slate-50">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: FARMER COMMUNITY (A23) - Redesigned with Add, Delete, View Modal
               ------------------------------------------------------------- -->
          <div id="view-farmer-community" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <i data-lucide="message-square" class="w-4 h-4"></i>
                  <span>Peer Exchange & Expert Verified Solutions</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Farmer Community Forum</h2>
                <p class="text-xs text-[#64748B]">Real-time discussions, practical farming advice, and verified agronomy answers.</p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="filterCommunityPosts('verified')" class="px-3.5 py-2 rounded-xl bg-emerald-50 text-[#0B6623] border border-emerald-200 text-xs font-bold flex items-center gap-1.5">
                  <i data-lucide="check-circle-2" class="w-4 h-4"></i>
                  <span>Verified Answers Only</span>
                </button>
                <button type="button" onclick="openAddCommunityPostModal()" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-xs flex items-center gap-2 transition">
                  <i data-lucide="plus" class="w-4 h-4"></i>
                  <span>New Discussion</span>
                </button>
              </div>
            </div>

            <!-- Topic Filter Pills -->
            <div class="flex flex-wrap items-center gap-2">
              <button type="button" onclick="filterCommunityByTopic('all', this)" class="px-3 py-1.5 rounded-full text-xs font-bold bg-[#0B6623] text-white shadow-xs topic-btn">All Topics</button>
              <button type="button" onclick="filterCommunityByTopic('Cotton Care', this)" class="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 topic-btn">Cotton Care</button>
              <button type="button" onclick="filterCommunityByTopic('Groundnut Threshing', this)" class="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 topic-btn">Groundnut Threshing</button>
              <button type="button" onclick="filterCommunityByTopic('Organic Fertilizers', this)" class="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 topic-btn">Organic Inputs</button>
              <button type="button" onclick="filterCommunityByTopic('Mandi Rates', this)" class="px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 topic-btn">Mandi Rates</button>
            </div>

            <!-- Community Posts Feed -->
            <div class="space-y-4" id="communityPostsContainer">
              <!-- Post 1 -->
              <div class="saas-card p-5 hover:border-emerald-200 transition community-post-card" data-id="post-1" data-topic="Cotton Care">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-full bg-emerald-100 text-[#0B6623] font-black flex items-center justify-center text-xs flex-shrink-0">
                      JP
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-extrabold text-[#0F172A] text-sm">Jayesh Patel</span>
                        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">Sudavad · Farmer</span>
                        <span class="text-[11px] text-slate-400">2 hours ago</span>
                      </div>
                      <h4 class="font-bold text-[#0F172A] text-sm mt-1">Yellowing leaves in 65-day cotton crop after canal irrigation. Which spray is best?</h4>
                      <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                        After third watering, bottom leaves are turning bright yellow with minor leaf curl. Soil is medium black. Should I spray 19:19:19 NPK or micronutrient mixture?
                      </p>
                      <!-- Agronomist Verified Answer Badge -->
                      <div class="mt-3 p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl">
                        <div class="flex items-center gap-1.5 text-xs font-bold text-[#0B6623]">
                          <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>
                          <span>Verified Agronomist Solution · Dr. Hiren Vora (JAU Junagadh)</span>
                        </div>
                        <p class="text-xs text-slate-700 mt-1">
                          This is Magnesium deficiency combined with minor nitrogen leaching. Spray Magnesium Sulphate @ 50g + Urea @ 100g per 15L pump. Leaves will recover green pigmentation within 4 days.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div class="flex items-center gap-1.5 flex-shrink-0">
                    <button type="button" onclick="openViewCommunityPostModal('post-1')" class="px-3 py-1.5 rounded-lg bg-emerald-50 text-[#0B6623] hover:bg-emerald-100 text-xs font-bold transition flex items-center gap-1">
                      <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                      <span>View Thread</span>
                    </button>
                    <button type="button" onclick="deleteCommunityPost('post-1')" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete Post">
                      <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div class="flex items-center gap-4">
                    <button type="button" onclick="likeCommunityPost('post-1', this)" class="flex items-center gap-1.5 hover:text-[#0B6623] font-bold">
                      <i data-lucide="thumbs-up" class="w-3.5 h-3.5"></i>
                      <span class="like-count">24</span> Likes
                    </button>
                    <span class="flex items-center gap-1.5">
                      <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                      8 Farmer Replies
                    </span>
                  </div>
                  <span class="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-600 text-[10px]">Tag: Cotton Care</span>
                </div>
              </div>

              <!-- Post 2 -->
              <div class="saas-card p-5 hover:border-emerald-200 transition community-post-card" data-id="post-2" data-topic="Groundnut Threshing">
                <div class="flex items-start justify-between gap-4">
                  <div class="flex items-start gap-3">
                    <div class="w-10 h-10 rounded-full bg-amber-100 text-amber-800 font-black flex items-center justify-center text-xs flex-shrink-0">
                      MK
                    </div>
                    <div>
                      <div class="flex items-center gap-2">
                        <span class="font-extrabold text-[#0F172A] text-sm">Mansukhbhai Kotadiya</span>
                        <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">Dhari · Farmer</span>
                        <span class="text-[11px] text-slate-400">5 hours ago</span>
                      </div>
                      <h4 class="font-bold text-[#0F172A] text-sm mt-1">Groundnut GG-20 current mandi yard rates in Amreli vs Gondal?</h4>
                      <p class="text-xs text-slate-600 mt-1 leading-relaxed">
                        I have 140 quintals ready. Amreli Yard is bidding ₹ 1,480/20kg for bold quality. Has anyone traded in Gondal today? Is transportation cost justified?
                      </p>
                    </div>
                  </div>
                  <div class="flex items-center gap-1.5 flex-shrink-0">
                    <button type="button" onclick="openViewCommunityPostModal('post-2')" class="px-3 py-1.5 rounded-lg bg-emerald-50 text-[#0B6623] hover:bg-emerald-100 text-xs font-bold transition flex items-center gap-1">
                      <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                      <span>View Thread</span>
                    </button>
                    <button type="button" onclick="deleteCommunityPost('post-2')" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete Post">
                      <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div class="flex items-center gap-4">
                    <button type="button" onclick="likeCommunityPost('post-2', this)" class="flex items-center gap-1.5 hover:text-[#0B6623] font-bold">
                      <i data-lucide="thumbs-up" class="w-3.5 h-3.5"></i>
                      <span class="like-count">19</span> Likes
                    </button>
                    <span class="flex items-center gap-1.5">
                      <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                      14 Farmer Replies
                    </span>
                  </div>
                  <span class="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-600 text-[10px]">Tag: Groundnut Threshing</span>
                </div>
              </div>
            </div>

            <!-- MODAL: ADD COMMUNITY POST -->
            <div id="addCommunityPostModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B6623] flex items-center justify-center">
                      <i data-lucide="edit-3" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]">Ask the Farmer Community</h3>
                      <p class="text-[11px] text-slate-500">Share queries with 30,000+ Saurashtra growers</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeAddCommunityPostModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <form onsubmit="handleSaveCommunityPost(event)" class="p-6 space-y-4 text-xs">
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Author Name <span class="text-rose-500">*</span></label>
                    <input id="commAuthorInput" type="text" required value="Jayesh Patel" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Village / Taluka <span class="text-rose-500">*</span></label>
                      <input id="commVillageInput" type="text" required value="Sudavad, Bagasara" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Topic Category <span class="text-rose-500">*</span></label>
                      <select id="commCategoryInput" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                        <option value="Cotton Care">Cotton Care</option>
                        <option value="Groundnut Threshing">Groundnut Threshing</option>
                        <option value="Organic Fertilizers">Organic Fertilizers</option>
                        <option value="Mandi Rates">Mandi Rates</option>
                        <option value="Machinery">Machinery & Tools</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Question / Discussion Title <span class="text-rose-500">*</span></label>
                    <input id="commTitleInput" type="text" required placeholder="e.g. Best fungicide for Cumin wilt prevention?" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Detailed Explanation</label>
                    <textarea id="commContentInput" rows="3" placeholder="Describe soil conditions, crop stage, current symptoms..." class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]"></textarea>
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeAddCommunityPostModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs">Post Discussion</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: VIEW COMMUNITY POST FULL THREAD -->
            <div id="viewCommunityPostModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B6623] flex items-center justify-center">
                      <i data-lucide="message-square" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]" id="viewPostAuthorHeader">Community Discussion Thread</h3>
                      <p class="text-[11px] text-slate-500">Verified Agronomy Solutions</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeViewCommunityPostModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
                  <!-- Original Query -->
                  <div class="p-4 rounded-xl bg-slate-50 border border-slate-200">
                    <div class="flex items-center gap-2 mb-2">
                      <span class="font-extrabold text-[#0F172A]" id="viewPostAuthor">Jayesh Patel</span>
                      <span class="px-2 py-0.5 rounded bg-slate-200 text-slate-700 text-[10px] font-bold" id="viewPostLocation">Sudavad</span>
                      <span class="text-[11px] text-slate-400">Oct 26, 2026</span>
                    </div>
                    <h4 class="font-bold text-sm text-[#0F172A]" id="viewPostTitle">Title Text</h4>
                    <p class="text-slate-700 mt-2 leading-relaxed" id="viewPostContent">Body text</p>
                  </div>

                  <!-- Verified Response -->
                  <div class="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200">
                    <div class="flex items-center justify-between mb-2">
                      <div class="flex items-center gap-2">
                        <div class="w-6 h-6 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px] font-black">AM</div>
                        <span class="font-extrabold text-[#0B6623]">Dr. Hiren Vora (Chief Agronomist)</span>
                        <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-[#0B6623] text-[9px] font-black uppercase tracking-wider">Verified Answer</span>
                      </div>
                      <span class="text-[10px] text-emerald-700 font-mono">Official Advisory</span>
                    </div>
                    <p class="text-slate-800 leading-relaxed">
                      Recommended treatment verified for Saurashtra soil conditions. Maintain proper moisture and apply Magnesium Sulphate + 19:19:19 via foliar spray during early morning hours for optimal uptake.
                    </p>
                  </div>

                  <!-- Reply Box -->
                  <div class="pt-2">
                    <label class="block font-bold text-slate-700 mb-1.5">Add Your Agricultural Insight</label>
                    <div class="flex items-center gap-2">
                      <input id="postReplyInput" type="text" placeholder="Share your experience or advice..." class="flex-1 h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                      <button type="button" onclick="submitCommunityReply()" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold text-xs hover:bg-[#09521C] shadow-xs">Reply</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: KNOWLEDGE HUB (A24) - Redesigned with Add, Delete, View Modal
               ------------------------------------------------------------- -->
          <div id="view-knowledge-hub" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <i data-lucide="book-open" class="w-4 h-4"></i>
                  <span>Digital Agronomy Library & Package of Practices</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Knowledge Hub & Guides</h2>
                <p class="text-xs text-[#64748B]">Scientifically validated guides, pest alerts, organic recipes, and government scheme dossiers.</p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="openAddGuideModal()" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-xs flex items-center gap-2 transition">
                  <i data-lucide="plus" class="w-4 h-4"></i>
                  <span>Publish Guide</span>
                </button>
              </div>
            </div>

            <!-- Categories Tabs -->
            <div class="flex flex-wrap items-center gap-2">
              <button type="button" onclick="filterGuidesByCategory('all', this)" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0B6623] text-white shadow-xs guide-cat-btn">All Guides (18)</button>
              <button type="button" onclick="filterGuidesByCategory('Crop Protection', this)" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 guide-cat-btn">Crop Protection</button>
              <button type="button" onclick="filterGuidesByCategory('Soil Fertility', this)" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 guide-cat-btn">Soil Fertility</button>
              <button type="button" onclick="filterGuidesByCategory('Organic Methods', this)" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 guide-cat-btn">Organic Methods</button>
              <button type="button" onclick="filterGuidesByCategory('Micro-Irrigation', this)" class="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 guide-cat-btn">Micro-Irrigation</button>
            </div>

            <!-- Guides Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="guidesContainer">
              <!-- Guide Card 1 -->
              <div class="saas-card overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition guide-card" data-id="guide-1" data-cat="Crop Protection">
                <div class="p-5">
                  <div class="flex items-center justify-between text-[11px] mb-2.5">
                    <span class="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 font-bold">Crop Protection</span>
                    <span class="text-slate-400 font-semibold flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> 6 min read</span>
                  </div>
                  <h3 class="font-extrabold text-[#0F172A] text-sm leading-snug">Comprehensive Pink Bollworm IPM Protocol for Cotton</h3>
                  <p class="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    Integrated Pest Management (IPM) guidelines for Saurashtra cotton growers. Pheromone trap installation at 45 DAS, biological sprays, and chemical threshold intervention.
                  </p>
                </div>
                <div class="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-slate-500 font-semibold">By JAU Agronomy Team</span>
                  <div class="flex items-center gap-1.5">
                    <button type="button" onclick="openViewGuideModal('guide-1')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] hover:bg-emerald-100 font-bold transition flex items-center gap-1">
                      <i data-lucide="book-open" class="w-3.5 h-3.5"></i> Read
                    </button>
                    <button type="button" onclick="deleteGuide('guide-1')" class="p-1 text-slate-400 hover:text-rose-600 rounded" title="Delete Guide">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Guide Card 2 -->
              <div class="saas-card overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition guide-card" data-id="guide-2" data-cat="Organic Methods">
                <div class="p-5">
                  <div class="flex items-center justify-between text-[11px] mb-2.5">
                    <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-bold">Organic Methods</span>
                    <span class="text-slate-400 font-semibold flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> 8 min read</span>
                  </div>
                  <h3 class="font-extrabold text-[#0F172A] text-sm leading-snug">Jeevamrut & Waste Decomposer: Preparation & Field Application</h3>
                  <p class="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    Complete recipe with 200L barrel measurement. Fermentation timeline, beneficial bacterial CFU counts, and application methods via drip lines without clogging emitters.
                  </p>
                </div>
                <div class="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-slate-500 font-semibold">By Subhash Palekar Network</span>
                  <div class="flex items-center gap-1.5">
                    <button type="button" onclick="openViewGuideModal('guide-2')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] hover:bg-emerald-100 font-bold transition flex items-center gap-1">
                      <i data-lucide="book-open" class="w-3.5 h-3.5"></i> Read
                    </button>
                    <button type="button" onclick="deleteGuide('guide-2')" class="p-1 text-slate-400 hover:text-rose-600 rounded" title="Delete Guide">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>
              </div>

              <!-- Guide Card 3 -->
              <div class="saas-card overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition guide-card" data-id="guide-3" data-cat="Soil Fertility">
                <div class="p-5">
                  <div class="flex items-center justify-between text-[11px] mb-2.5">
                    <span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 font-bold">Soil Fertility</span>
                    <span class="text-slate-400 font-semibold flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> 5 min read</span>
                  </div>
                  <h3 class="font-extrabold text-[#0F172A] text-sm leading-snug">Correcting High Soil pH & Alkaline Soil in Amreli District</h3>
                  <p class="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                    Management of soils with pH 8.0 - 8.4 using agricultural gypsum, elemental sulphur, and green manuring with Dhaincha (Sesbania bispinosa).
                  </p>
                </div>
                <div class="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-slate-500 font-semibold">By Soil Health Mission</span>
                  <div class="flex items-center gap-1.5">
                    <button type="button" onclick="openViewGuideModal('guide-3')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] hover:bg-emerald-100 font-bold transition flex items-center gap-1">
                      <i data-lucide="book-open" class="w-3.5 h-3.5"></i> Read
                    </button>
                    <button type="button" onclick="deleteGuide('guide-3')" class="p-1 text-slate-400 hover:text-rose-600 rounded" title="Delete Guide">
                      <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- MODAL: ADD GUIDE -->
            <div id="addGuideModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B6623] flex items-center justify-center">
                      <i data-lucide="book-plus" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]">Publish New Agronomy Guide</h3>
                      <p class="text-[11px] text-slate-500">Share validated protocols with farmers</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeAddGuideModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <form onsubmit="handleSaveGuide(event)" class="p-6 space-y-4 text-xs">
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Guide Title <span class="text-rose-500">*</span></label>
                    <input id="guideTitleInput" type="text" required placeholder="e.g. Cumin Sowing Package of Practices 2026" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Category <span class="text-rose-500">*</span></label>
                      <select id="guideCategoryInput" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                        <option value="Crop Protection">Crop Protection</option>
                        <option value="Organic Methods">Organic Methods</option>
                        <option value="Soil Fertility">Soil Fertility</option>
                        <option value="Micro-Irrigation">Micro-Irrigation</option>
                      </select>
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Read Time (minutes)</label>
                      <input id="guideTimeInput" type="number" value="6" min="1" max="60" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Author / Institute <span class="text-rose-500">*</span></label>
                    <input id="guideAuthorInput" type="text" required value="AnkurMitra Agronomy Panel" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Summary Overview</label>
                    <textarea id="guideSummaryInput" rows="2" placeholder="Brief 2-line summary for cards..." class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]"></textarea>
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Full Guide Content</label>
                    <textarea id="guideContentInput" rows="4" placeholder="Detailed step-by-step practices, dosages, dos and don'ts..." class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]"></textarea>
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeAddGuideModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs">Publish Guide</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: VIEW GUIDE READER -->
            <div id="viewGuideModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-[#0B6623] text-xs font-bold" id="viewGuideCategory">Category</span>
                    <span class="text-xs text-slate-500 font-semibold" id="viewGuideReadTime">5 min read</span>
                  </div>
                  <button type="button" onclick="closeViewGuideModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
                  <h2 class="text-lg font-black text-[#0F172A]" id="viewGuideTitle">Guide Title</h2>
                  <div class="text-[11px] text-slate-500 font-semibold" id="viewGuideAuthor">Published by AnkurMitra Agronomy Panel</div>
                  <div class="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-slate-800 leading-relaxed font-medium" id="viewGuideSummary">
                    Summary text here
                  </div>
                  <div class="space-y-3 text-slate-700 leading-relaxed" id="viewGuideBody">
                    <h4 class="font-bold text-[#0F172A] text-sm">Key Cultural & Preventive Practices</h4>
                    <ul class="list-disc pl-5 space-y-1.5">
                      <li>Deep summer ploughing to expose hibernating pupae to solar heat and predators.</li>
                      <li>Install Delta Pheromone traps @ 5 traps per acre at 45 DAS to monitor initial moth flights.</li>
                      <li>Observe economic threshold level (ETL): 1 live larva per 10 green bolls or 8 moths/trap/night for 3 consecutive nights.</li>
                      <li>Rotate chemical mode of action (IRAC groups) to prevent insecticide resistance.</li>
                    </ul>
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                    <button type="button" onclick="closeViewGuideModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Close</button>
                    <button type="button" onclick="showToast('Guide PDF downloaded successfully', 'success'); closeViewGuideModal();" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-1.5">
                      <i data-lucide="download" class="w-3.5 h-3.5"></i>
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: TOOL RENTAL (A25)
               ------------------------------------------------------------- -->
          <div id="view-tool-rental" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div class="flex items-center gap-3">
                <span class="text-xs font-semibold text-[#64748B]">Farm Mechanization & Tractor Rental Registry</span>
                <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800">12 Implements available</span>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="switchToolRentalTab('tools')" id="btnTabTools" class="px-3.5 py-1.5 rounded-xl bg-[#0B6623] text-white font-bold text-xs shadow-xs">Equipment Catalog</button>
                <button type="button" onclick="switchToolRentalTab('bookings')" id="btnTabBookings" class="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50">Active Bookings</button>
              </div>
            </div>

            <!-- Tab 1: Equipment Catalog -->
            <div id="toolRentalPane-tools" class="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div class="saas-card p-5">
                <div class="flex items-center justify-between mb-3">
                  <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0B6623] border border-emerald-200 text-[10px] font-bold">Tractor & Plough</span>
                  <span class="text-xs font-extrabold text-[#0F172A]">₹ 850 / hr</span>
                </div>
                <h4 class="font-extrabold text-[#0F172A] text-sm">John Deere 5050D (50 HP) + MB Plough</h4>
                <p class="text-xs text-slate-500 mt-1">Owner: Rajesh Patel (Sudavad) · 1.5 km away</p>
                <button onclick="showToast('Booking request sent to owner', 'success')" class="w-full mt-4 py-2 rounded-xl bg-[#0B6623] text-white text-xs font-bold hover:bg-[#09521C] transition">Book for Farm</button>
              </div>
              <div class="saas-card p-5">
                <div class="flex items-center justify-between mb-3">
                  <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0B6623] border border-emerald-200 text-[10px] font-bold">Harvester</span>
                  <span class="text-xs font-extrabold text-[#0F172A]">₹ 1,400 / acre</span>
                </div>
                <h4 class="font-extrabold text-[#0F172A] text-sm">Groundnut Digger & Shaker Machine</h4>
                <p class="text-xs text-slate-500 mt-1">Owner: Bharat Agro Hub (Bagasara) · 4 km away</p>
                <button onclick="showToast('Booking request sent to owner', 'success')" class="w-full mt-4 py-2 rounded-xl bg-[#0B6623] text-white text-xs font-bold hover:bg-[#09521C] transition">Book for Farm</button>
              </div>
              <div class="saas-card p-5">
                <div class="flex items-center justify-between mb-3">
                  <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0B6623] border border-emerald-200 text-[10px] font-bold">Drone Spray</span>
                  <span class="text-xs font-extrabold text-[#0F172A]">₹ 450 / acre</span>
                </div>
                <h4 class="font-extrabold text-[#0F172A] text-sm">Agricultural 16L Spray Drone (Certified Pilot)</h4>
                <p class="text-xs text-slate-500 mt-1">Owner: Garuda Drone Mitra Amreli · Fast dispatch</p>
                <button onclick="showToast('Booking request sent to owner', 'success')" class="w-full mt-4 py-2 rounded-xl bg-[#0B6623] text-white text-xs font-bold hover:bg-[#09521C] transition">Book for Farm</button>
              </div>
            </div>

            <!-- Tab 2: Bookings -->
            <div id="toolRentalPane-bookings" class="hidden saas-card p-5">
              <div class="text-xs font-bold text-slate-700 mb-3">Active Dispatch & Rental Engagements</div>
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200 font-bold text-slate-500">
                    <th class="py-2">Equipment</th>
                    <th class="py-2">Renter Farmer</th>
                    <th class="py-2">Village</th>
                    <th class="py-2">Hours / Acre</th>
                    <th class="py-2">Status</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                  <tr>
                    <td class="py-2.5 font-bold">John Deere 5050D</td>
                    <td class="py-2.5">Jayesh Patel</td>
                    <td class="py-2.5">Sudavad</td>
                    <td class="py-2.5">4 Hours</td>
                    <td class="py-2.5"><span class="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold text-[10px]">In Progress</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: NEARBY SERVICES (A29)
               ------------------------------------------------------------- -->
          <div id="view-nearby-services" class="hidden space-y-6 view-section">
            <div class="saas-card p-5">
              <div class="flex items-center justify-between mb-4">
                <div>
                  <h3 class="font-extrabold text-[#0F172A] text-base">Agri Services Directory & Processing Units</h3>
                  <p class="text-xs text-slate-500">Ginning mills, oil expellers, cold storages, and testing labs in Saurashtra</p>
                </div>
                <button onclick="showToast('Opening service registry...', 'info')" class="px-3.5 py-1.5 rounded-xl bg-[#0B6623] text-white text-xs font-bold">Add Service</button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div class="font-bold text-[#0F172A] text-sm">Patel Cotton Ginning & Pressing Industries</div>
                  <div class="text-slate-500 mt-0.5">Bagasara Highway, Amreli · 4.2 km</div>
                  <div class="mt-2 text-emerald-700 font-bold">Daily Capacity: 400 Bales · Sourcing Shankar-6 Cotton</div>
                </div>
                <div class="p-4 rounded-xl border border-slate-200 bg-slate-50/50">
                  <div class="font-bold text-[#0F172A] text-sm">Amreli District NABL Soil Testing Laboratory</div>
                  <div class="text-slate-500 mt-0.5">APMC Yard Complex, Amreli · 1.8 km</div>
                  <div class="mt-2 text-blue-700 font-bold">Turnaround: 48 Hours · Full 12-Nutrient Report</div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: MANDI PRICES (A30)
               ------------------------------------------------------------- -->
          <div id="view-mandi-prices" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <h3 class="font-extrabold text-[#0F172A] text-base">Live APMC Mandi Yard Rates (Gujarat)</h3>
                <p class="text-xs text-slate-500">Updated Oct 26, 2026 · Official APMC auction settlement prices</p>
              </div>
              <button onclick="showToast('Fetching latest APMC e-NAM feed...', 'info')" class="px-3.5 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold text-xs hover:bg-slate-200 flex items-center gap-1.5">
                <i data-lucide="refresh-cw" class="w-4 h-4"></i>
                <span>Refresh Live Rates</span>
              </button>
            </div>
            <div class="saas-card overflow-hidden">
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200 bg-[#F8FAFC] font-bold text-slate-500">
                    <th class="px-5 py-3">Crop / Commodity</th>
                    <th class="px-5 py-3">Mandi Yard</th>
                    <th class="px-5 py-3">Min Price (₹/20kg)</th>
                    <th class="px-5 py-3">Max Price (₹/20kg)</th>
                    <th class="px-5 py-3">Modal Price (₹/20kg)</th>
                    <th class="px-5 py-3">Arrivals (Qtl)</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium">
                  <tr>
                    <td class="px-5 py-3.5 font-bold text-[#0F172A]">Cotton (Kapas)</td>
                    <td class="px-5 py-3.5">Amreli APMC</td>
                    <td class="px-5 py-3.5 font-mono">₹ 1,380</td>
                    <td class="px-5 py-3.5 font-mono">₹ 1,515</td>
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">₹ 1,460</td>
                    <td class="px-5 py-3.5 font-mono">1,840</td>
                  </tr>
                  <tr>
                    <td class="px-5 py-3.5 font-bold text-[#0F172A]">Groundnut (Mungfali)</td>
                    <td class="px-5 py-3.5">Bagasara APMC</td>
                    <td class="px-5 py-3.5 font-mono">₹ 1,240</td>
                    <td class="px-5 py-3.5 font-mono">₹ 1,485</td>
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">₹ 1,390</td>
                    <td class="px-5 py-3.5 font-mono">2,410</td>
                  </tr>
                  <tr>
                    <td class="px-5 py-3.5 font-bold text-[#0F172A]">Cumin (Jeera)</td>
                    <td class="px-5 py-3.5">Unjha / Gondal</td>
                    <td class="px-5 py-3.5 font-mono">₹ 4,800</td>
                    <td class="px-5 py-3.5 font-mono">₹ 5,650</td>
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">₹ 5,280</td>
                    <td class="px-5 py-3.5 font-mono">920</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
`;

const contentJs = `
    // Content Module Controllers

    // ─── ADS CONTROLLERS ─────────────────────────────────────────────────────────
    function filterAdsTable() {
      const q = (document.getElementById('adsSearchInput')?.value || '').toLowerCase().trim();
      const placement = document.getElementById('adPlacementFilter')?.value || 'all';
      const rows = document.querySelectorAll('#adsTableBody tr');
      let count = 0;

      rows.forEach(r => {
        const title = (r.getAttribute('data-title') || '').toLowerCase();
        const brand = (r.getAttribute('data-brand') || '').toLowerCase();
        const p = r.getAttribute('data-placement') || '';

        const matchQ = !q || title.includes(q) || brand.includes(q);
        const matchP = placement === 'all' || p === placement;

        if (matchQ && matchP) {
          r.style.display = '';
          count++;
        } else {
          r.style.display = 'none';
        }
      });
    }

    function toggleAdStatus(adId, title) {
      const statusEl = document.getElementById('adStatus-' + adId);
      const btnEl = document.getElementById('adBtn-' + adId);
      if (!statusEl || !btnEl) return;
      const isCurrentlyActive = statusEl.textContent.includes('Active');
      if (isCurrentlyActive) {
        statusEl.className = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-slate-100 text-slate-600';
        statusEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-slate-400"></span> Inactive';
        btnEl.className = 'px-2.5 py-1 rounded-lg border border-emerald-200 bg-emerald-50 hover:bg-emerald-100 text-[11px] font-bold text-emerald-700 transition';
        btnEl.textContent = 'Turn on';
        showToast('Campaign "' + title + '" paused', 'info');
      } else {
        statusEl.className = 'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800';
        statusEl.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active';
        btnEl.className = 'px-2.5 py-1 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-[11px] font-bold text-slate-700 transition';
        btnEl.textContent = 'Pause';
        showToast('Campaign "' + title + '" activated', 'success');
      }
    }

    function openAddAdModal() {
      const modal = document.getElementById('addAdModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeAddAdModal() {
      const modal = document.getElementById('addAdModal');
      if (modal) modal.classList.add('hidden');
    }

    function handleSaveAd(e) {
      e.preventDefault();
      const title = document.getElementById('adTitleInput')?.value.trim();
      const brand = document.getElementById('adBrandInput')?.value.trim();
      const placement = document.getElementById('adPlacementInput')?.value;

      if (!title || !brand) return;

      const tbody = document.getElementById('adsTableBody');
      if (tbody) {
        const id = 'ad-' + Date.now();
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50/70 transition';
        tr.setAttribute('data-id', id);
        tr.setAttribute('data-title', title);
        tr.setAttribute('data-brand', brand);
        tr.setAttribute('data-placement', placement);

        tr.innerHTML = \`
          <td class="px-5 py-4">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-emerald-100 text-[#0B6623] flex items-center justify-center font-black text-sm flex-shrink-0">
                NEW
              </div>
              <div>
                <div class="font-extrabold text-[#0F172A]">\${title}</div>
                <div class="text-[11px] text-[#64748B]">Sponsor: \${brand}</div>
              </div>
            </div>
          </td>
          <td class="px-5 py-4">
            <span class="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">\${placement}</span>
          </td>
          <td class="px-5 py-4 font-mono font-bold text-slate-800">0</td>
          <td class="px-5 py-4 font-mono font-bold text-slate-800">0 <span class="text-slate-400 text-[10px]">(0.0%)</span></td>
          <td class="px-5 py-4 text-slate-600 font-mono text-[11px]">Just Launched</td>
          <td class="px-5 py-4">
            <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active
            </span>
          </td>
          <td class="px-5 py-4 text-right">
            <div class="flex items-center justify-end gap-1.5">
              <button type="button" onclick="openViewAdModal('\${id}')" class="p-1.5 text-slate-500 hover:text-[#0B6623] hover:bg-emerald-50 rounded-lg transition" title="View Ad Details">
                <i data-lucide="eye" class="w-4 h-4"></i>
              </button>
              <button type="button" onclick="deleteAd('\${id}')" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete Ad">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </td>
        \`;
        tbody.prepend(tr);
        if (window.lucide && typeof lucide.createIcons === 'function') {
          try { lucide.createIcons(); } catch(_) {}
        }
      }

      closeAddAdModal();
      showToast('Campaign "' + title + '" published successfully!', 'success');
    }

    function deleteAd(adId) {
      if (!confirm('Are you sure you want to remove this ad campaign?')) return;
      const row = document.querySelector(\`tr[data-id="\${adId}"]\`);
      if (row) {
        row.remove();
        showToast('Ad campaign removed', 'info');
      }
    }

    function openViewAdModal(adId) {
      const modal = document.getElementById('viewAdModal');
      const row = document.querySelector(\`tr[data-id="\${adId}"]\`);
      if (modal && row) {
        const title = row.getAttribute('data-title') || 'Ad Campaign';
        const brand = row.getAttribute('data-brand') || 'Brand Sponsor';
        const placement = row.getAttribute('data-placement') || 'Home Carousel';

        document.getElementById('viewAdHeadline').textContent = title;
        document.getElementById('viewAdBrand').textContent = brand;
        document.getElementById('viewAdPlacement').textContent = placement;
        document.getElementById('viewAdModalTitle').textContent = title;
        document.getElementById('viewAdModalSubtitle').textContent = 'Advertiser: ' + brand;

        modal.classList.remove('hidden');
        if (window.lucide && typeof lucide.createIcons === 'function') {
          try { lucide.createIcons(); } catch(_) {}
        }
      }
    }

    function closeViewAdModal() {
      const modal = document.getElementById('viewAdModal');
      if (modal) modal.classList.add('hidden');
    }

    function exportAdsReport() {
      showToast('Exporting ad analytics CSV for October 2026...', 'info');
    }

    function openSendAlertModal() {
      showToast('Opening Emergency Alert Broadcast Composer...', 'info');
    }

    // ─── FARMER COMMUNITY CONTROLLERS ───────────────────────────────────────────
    function filterCommunityByTopic(topic, btn) {
      document.querySelectorAll('.topic-btn').forEach(b => {
        b.className = 'px-3 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 topic-btn';
      });
      if (btn) {
        btn.className = 'px-3 py-1.5 rounded-full text-xs font-bold bg-[#0B6623] text-white shadow-xs topic-btn';
      }
      const cards = document.querySelectorAll('.community-post-card');
      cards.forEach(c => {
        const t = c.getAttribute('data-topic') || '';
        c.style.display = (topic === 'all' || t === topic) ? '' : 'none';
      });
    }

    function filterCommunityPosts(filterType) {
      showToast('Filtering for verified agronomy answers...', 'info');
    }

    function likeCommunityPost(postId, btn) {
      const countEl = btn.querySelector('.like-count');
      if (countEl) {
        let n = parseInt(countEl.textContent, 10) || 0;
        n++;
        countEl.textContent = n;
        btn.classList.add('text-[#0B6623]');
        showToast('Upvoted community discussion', 'success');
      }
    }

    function openAddCommunityPostModal() {
      const modal = document.getElementById('addCommunityPostModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeAddCommunityPostModal() {
      const modal = document.getElementById('addCommunityPostModal');
      if (modal) modal.classList.add('hidden');
    }

    function handleSaveCommunityPost(e) {
      e.preventDefault();
      const author = document.getElementById('commAuthorInput')?.value.trim();
      const village = document.getElementById('commVillageInput')?.value.trim();
      const category = document.getElementById('commCategoryInput')?.value;
      const title = document.getElementById('commTitleInput')?.value.trim();
      const content = document.getElementById('commContentInput')?.value.trim();

      if (!title || !author) return;

      const container = document.getElementById('communityPostsContainer');
      if (container) {
        const id = 'post-' + Date.now();
        const card = document.createElement('div');
        card.className = 'saas-card p-5 hover:border-emerald-200 transition community-post-card';
        card.setAttribute('data-id', id);
        card.setAttribute('data-topic', category);

        const initials = author.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase() || 'FM';

        card.innerHTML = \`
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-start gap-3">
              <div class="w-10 h-10 rounded-full bg-emerald-100 text-[#0B6623] font-black flex items-center justify-center text-xs flex-shrink-0">
                \${initials}
              </div>
              <div>
                <div class="flex items-center gap-2">
                  <span class="font-extrabold text-[#0F172A] text-sm">\${author}</span>
                  <span class="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold">\${village}</span>
                  <span class="text-[11px] text-slate-400">Just now</span>
                </div>
                <h4 class="font-bold text-[#0F172A] text-sm mt-1">\${title}</h4>
                <p class="text-xs text-slate-600 mt-1 leading-relaxed">\${content}</p>
              </div>
            </div>
            <div class="flex items-center gap-1.5 flex-shrink-0">
              <button type="button" onclick="openViewCommunityPostModal('\${id}')" class="px-3 py-1.5 rounded-lg bg-emerald-50 text-[#0B6623] hover:bg-emerald-100 text-xs font-bold transition flex items-center gap-1">
                <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                <span>View</span>
              </button>
              <button type="button" onclick="deleteCommunityPost('\${id}')" class="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition" title="Delete Post">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <div class="flex items-center gap-4">
              <button type="button" onclick="likeCommunityPost('\${id}', this)" class="flex items-center gap-1.5 hover:text-[#0B6623] font-bold">
                <i data-lucide="thumbs-up" class="w-3.5 h-3.5"></i>
                <span class="like-count">1</span> Like
              </button>
              <span class="flex items-center gap-1.5">
                <i data-lucide="message-circle" class="w-3.5 h-3.5"></i>
                0 Replies
              </span>
            </div>
            <span class="px-2 py-0.5 rounded bg-slate-100 font-bold text-slate-600 text-[10px]">Tag: \${category}</span>
          </div>
        \`;
        container.prepend(card);
        if (window.lucide && typeof lucide.createIcons === 'function') {
          try { lucide.createIcons(); } catch(_) {}
        }
      }

      closeAddCommunityPostModal();
      showToast('Community discussion posted!', 'success');
    }

    function deleteCommunityPost(postId) {
      if (!confirm('Are you sure you want to delete this community post?')) return;
      const card = document.querySelector(\`div[data-id="\${postId}"]\`);
      if (card) {
        card.remove();
        showToast('Discussion post deleted', 'info');
      }
    }

    function openViewCommunityPostModal(postId) {
      const modal = document.getElementById('viewCommunityPostModal');
      const card = document.querySelector(\`div[data-id="\${postId}"]\`);
      if (modal && card) {
        const title = card.querySelector('h4')?.textContent || 'Community Post';
        const body = card.querySelector('p')?.textContent || '';
        const author = card.querySelector('span.font-extrabold')?.textContent || 'Farmer';

        document.getElementById('viewPostTitle').textContent = title;
        document.getElementById('viewPostContent').textContent = body;
        document.getElementById('viewPostAuthor').textContent = author;
        document.getElementById('viewPostAuthorHeader').textContent = author + "'s Inquiry";

        modal.classList.remove('hidden');
        if (window.lucide && typeof lucide.createIcons === 'function') {
          try { lucide.createIcons(); } catch(_) {}
        }
      }
    }

    function closeViewCommunityPostModal() {
      const modal = document.getElementById('viewCommunityPostModal');
      if (modal) modal.classList.add('hidden');
    }

    function submitCommunityReply() {
      const input = document.getElementById('postReplyInput');
      if (input && input.value.trim()) {
        showToast('Your agronomy advice submitted to discussion thread!', 'success');
        input.value = '';
      }
    }

    // ─── KNOWLEDGE HUB CONTROLLERS ───────────────────────────────────────────────
    function filterGuidesByCategory(cat, btn) {
      document.querySelectorAll('.guide-cat-btn').forEach(b => {
        b.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 guide-cat-btn';
      });
      if (btn) {
        btn.className = 'px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#0B6623] text-white shadow-xs guide-cat-btn';
      }
      const cards = document.querySelectorAll('.guide-card');
      cards.forEach(c => {
        const cCat = c.getAttribute('data-cat') || '';
        c.style.display = (cat === 'all' || cCat === cat) ? '' : 'none';
      });
    }

    function openAddGuideModal() {
      const modal = document.getElementById('addGuideModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeAddGuideModal() {
      const modal = document.getElementById('addGuideModal');
      if (modal) modal.classList.add('hidden');
    }

    function handleSaveGuide(e) {
      e.preventDefault();
      const title = document.getElementById('guideTitleInput')?.value.trim();
      const category = document.getElementById('guideCategoryInput')?.value;
      const readTime = document.getElementById('guideTimeInput')?.value || '5';
      const author = document.getElementById('guideAuthorInput')?.value.trim() || 'AnkurMitra Agronomy Panel';
      const summary = document.getElementById('guideSummaryInput')?.value.trim() || 'Scientific package of practices for Saurashtra growers.';

      if (!title) return;

      const container = document.getElementById('guidesContainer');
      if (container) {
        const id = 'guide-' + Date.now();
        const card = document.createElement('div');
        card.className = 'saas-card overflow-hidden flex flex-col justify-between hover:border-emerald-300 transition guide-card';
        card.setAttribute('data-id', id);
        card.setAttribute('data-cat', category);

        card.innerHTML = \`
          <div class="p-5">
            <div class="flex items-center justify-between text-[11px] mb-2.5">
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0B6623] border border-emerald-200 font-bold">\${category}</span>
              <span class="text-slate-400 font-semibold flex items-center gap-1"><i data-lucide="clock" class="w-3 h-3"></i> \${readTime} min read</span>
            </div>
            <h3 class="font-extrabold text-[#0F172A] text-sm leading-snug">\${title}</h3>
            <p class="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">\${summary}</p>
          </div>
          <div class="px-5 py-3.5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-slate-500 font-semibold">By \${author}</span>
            <div class="flex items-center gap-1.5">
              <button type="button" onclick="openViewGuideModal('\${id}')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] hover:bg-emerald-100 font-bold transition flex items-center gap-1">
                <i data-lucide="book-open" class="w-3.5 h-3.5"></i> Read
              </button>
              <button type="button" onclick="deleteGuide('\${id}')" class="p-1 text-slate-400 hover:text-rose-600 rounded" title="Delete Guide">
                <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
              </button>
            </div>
          </div>
        \`;
        container.prepend(card);
        if (window.lucide && typeof lucide.createIcons === 'function') {
          try { lucide.createIcons(); } catch(_) {}
        }
      }

      closeAddGuideModal();
      showToast('Guide "' + title + '" published to Knowledge Hub!', 'success');
    }

    function deleteGuide(guideId) {
      if (!confirm('Are you sure you want to delete this guide?')) return;
      const card = document.querySelector(\`div[data-id="\${guideId}"]\`);
      if (card) {
        card.remove();
        showToast('Guide removed from library', 'info');
      }
    }

    function openViewGuideModal(guideId) {
      const modal = document.getElementById('viewGuideModal');
      const card = document.querySelector(\`div[data-id="\${guideId}"]\`);
      if (modal && card) {
        const title = card.querySelector('h3')?.textContent || 'Agronomy Guide';
        const summary = card.querySelector('p')?.textContent || '';
        const cat = card.getAttribute('data-cat') || 'General Agronomy';

        document.getElementById('viewGuideTitle').textContent = title;
        document.getElementById('viewGuideCategory').textContent = cat;
        document.getElementById('viewGuideSummary').textContent = summary;

        modal.classList.remove('hidden');
        if (window.lucide && typeof lucide.createIcons === 'function') {
          try { lucide.createIcons(); } catch(_) {}
        }
      }
    }

    function closeViewGuideModal() {
      const modal = document.getElementById('viewGuideModal');
      if (modal) modal.classList.add('hidden');
    }

    // ─── TOOL RENTAL & OTHER CONTROLLERS ────────────────────────────────────────
    function switchToolRentalTab(tab) {
      const toolsPane = document.getElementById('toolRentalPane-tools');
      const bookingsPane = document.getElementById('toolRentalPane-bookings');
      const toolsBtn = document.getElementById('btnTabTools');
      const bookingsBtn = document.getElementById('btnTabBookings');

      if (tab === 'tools') {
        if (toolsBtn) toolsBtn.className = 'px-3.5 py-1.5 rounded-xl bg-[#0B6623] text-white font-bold text-xs shadow-xs';
        if (bookingsBtn) bookingsBtn.className = 'px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50';
        if (toolsPane) toolsPane.classList.remove('hidden');
        if (bookingsPane) bookingsPane.classList.add('hidden');
      } else {
        if (bookingsBtn) bookingsBtn.className = 'px-3.5 py-1.5 rounded-xl bg-[#0B6623] text-white font-bold text-xs shadow-xs';
        if (toolsBtn) toolsBtn.className = 'px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-bold text-xs hover:bg-slate-50';
        if (bookingsPane) bookingsPane.classList.remove('hidden');
        if (toolsPane) toolsPane.classList.add('hidden');
      }
    }

    function openAddToolModal() {
      showToast('Opening Add Tool Registry form...', 'info');
    }

    function editToolItem(tool, owner, price) {
      showToast('Editing ' + tool + ' owned by ' + owner + ' (' + price + ')', 'info');
    }

    function openAddMandiPriceModal() {
      showToast('Opening Mandi Price Daily Entry Modal...', 'info');
    }

    function filterAlertsTable() {
      const q = (document.getElementById('alertsSearchInput')?.value || '').toLowerCase();
      const rows = document.querySelectorAll('#alertsTable tbody tr');
      rows.forEach(r => {
        r.style.display = !q || r.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    }
`;

module.exports = { contentHtml, contentJs };
