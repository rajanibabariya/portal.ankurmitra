// builder_all_mobile_views.js
// Exports the complete HTML view sections and helper functions derived from all 145 mobile screens

const views = {};

// 1. RETAILER DASHBOARD (R10_Home.png)
views['view-retailer-dashboard'] = `
<div id="view-retailer-dashboard" class="hidden space-y-6 view-section">
  <!-- Top Retailer Identity Card -->
  <div class="saas-card p-6 bg-gradient-to-r from-teal-50/90 via-white to-emerald-50/70 border border-teal-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-2 text-xs font-bold text-teal-800">
        <span class="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
        <span>F2R Procurement Hub · Direct Farmgate Retail Sourcing</span>
      </div>
      <h2 class="text-2xl font-black text-[#0F172A] mt-1">Mina Kirana & Provision Store</h2>
      <p class="text-xs text-[#64748B] mt-0.5 font-medium">
        Amreli Station Road · Retail License #RET-AMR-2024-912 · Direct buying from 48 verified local farmers
      </p>
    </div>
    <div class="flex flex-wrap items-center gap-2.5">
      <button onclick="navigateTo('f2r-procurement')" class="h-9 px-4 bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
        <i data-lucide="shopping-bag" class="w-4 h-4"></i>
        <span>નવી ખરીદી (Browse Farm Lots)</span>
      </button>
      <button onclick="navigateTo('retailer-orders')" class="h-9 px-3.5 bg-white border border-[#E5E7EB] hover:bg-teal-50 text-xs font-bold text-teal-900 rounded-xl shadow-2xs transition flex items-center gap-1.5">
        <i data-lucide="list-ordered" class="w-4 h-4"></i>
        <span>મારા ઓર્ડર (Active POs)</span>
      </button>
    </div>
  </div>

  <!-- Retailer KPIs -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <div class="saas-card p-4 border-l-4 border-l-teal-600">
      <div class="text-[11px] font-bold text-[#64748B] uppercase">Today's Procurement</div>
      <div class="text-2xl font-black text-[#0F172A] mt-1">42 <span class="text-xs font-normal text-slate-500">Quintals</span></div>
      <div class="text-[11px] text-teal-700 font-semibold mt-1 flex items-center gap-1">
        <i data-lucide="arrow-down-left" class="w-3.5 h-3.5"></i>
        <span>3 deliveries arriving today</span>
      </div>
    </div>
    <div class="saas-card p-4 border-l-4 border-l-emerald-600">
      <div class="text-[11px] font-bold text-[#64748B] uppercase">Monthly F2R Spend</div>
      <div class="text-2xl font-black text-[#0F172A] mt-1">₹ 1,48,200</div>
      <div class="text-[11px] text-emerald-700 font-semibold mt-1 flex items-center gap-1">
        <i data-lucide="check-circle" class="w-3.5 h-3.5"></i>
        <span>100% Escrow protected</span>
      </div>
    </div>
    <div class="saas-card p-4 border-l-4 border-l-amber-500">
      <div class="text-[11px] font-bold text-[#64748B] uppercase">APMC Mandi Margin Gain</div>
      <div class="text-2xl font-black text-amber-600 mt-1">+14.2%</div>
      <div class="text-[11px] text-amber-700 font-semibold mt-1">
        Saved ₹18,400 in broker fees
      </div>
    </div>
    <div class="saas-card p-4 border-l-4 border-l-indigo-600">
      <div class="text-[11px] font-bold text-[#64748B] uppercase">Active Farmer Suppliers</div>
      <div class="text-2xl font-black text-indigo-700 mt-1">28 Farmers</div>
      <div class="text-[11px] text-indigo-700 font-semibold mt-1">
        Within 25 km radius (Sudavad, Bagasara)
      </div>
    </div>
  </div>

  <!-- Live Produce Direct Listings Grid (from R10_Home.png & R11_Categories.png) -->
  <div class="saas-card p-6">
    <div class="flex items-center justify-between pb-4 border-b border-slate-100 mb-4">
      <div>
        <h3 class="font-extrabold text-[#0F172A] text-sm">ખેડૂતો દ્વારા સીધા મૂકેલા તાજા પાક (Live Farmgate Produce)</h3>
        <p class="text-xs text-slate-500">Direct sourcing without Mandi commission or middleman markups</p>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-xs font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-200">
          Amreli Hub Active
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <!-- Groundnut Bold -->
      <div class="bg-white border border-slate-200 hover:border-teal-400 rounded-2xl p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between">
            <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">તેલીબિયાં</span>
            <span class="text-xs font-bold text-teal-700">12 km away</span>
          </div>
          <div class="mt-3">
            <h4 class="font-extrabold text-[#0F172A] text-base">મગફળી બોલ્ડ (Groundnut)</h4>
            <p class="text-xs text-slate-500">ખેડૂત: જયેશ પટેલ (સુડાવદ)</p>
          </div>
          <div class="mt-3 p-2.5 bg-slate-50 rounded-xl space-y-1 text-xs">
            <div class="flex justify-between text-slate-600">
              <span>જથ્થો (Stock):</span>
              <span class="font-bold text-[#0F172A]">20 ક્વિન્ટલ</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>ભેજ (Moisture):</span>
              <span class="font-bold text-emerald-700">7.0% (Clean & Dry)</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>ભાવ (Farmgate):</span>
              <span class="font-black text-teal-800 text-sm">₹ 5,200 / Q</span>
            </div>
          </div>
        </div>
        <button onclick="openF2RQuickOrderModal('Groundnut Bold', 'Jayesh Patel (Sudavad)', 5200, 20)" class="mt-4 w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs">
          <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
          <span>ઓર્ડર કરો (Direct Buy)</span>
        </button>
      </div>

      <!-- Cumin / Jeeru -->
      <div class="bg-white border border-slate-200 hover:border-teal-400 rounded-2xl p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between">
            <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">મસાલા</span>
            <span class="text-xs font-bold text-teal-700">18 km away</span>
          </div>
          <div class="mt-3">
            <h4 class="font-extrabold text-[#0F172A] text-base">જીરું પ્રીમિયમ (Cumin)</h4>
            <p class="text-xs text-slate-500">ખેડૂત: રમેશ પટેલ (બગસરા)</p>
          </div>
          <div class="mt-3 p-2.5 bg-slate-50 rounded-xl space-y-1 text-xs">
            <div class="flex justify-between text-slate-600">
              <span>જથ્થો (Stock):</span>
              <span class="font-bold text-[#0F172A]">15 ક્વિન્ટલ</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>ક્વોલિટી (Sortex):</span>
              <span class="font-bold text-emerald-700">99.2% Pure Grade-A</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>ભાવ (Farmgate):</span>
              <span class="font-black text-teal-800 text-sm">₹ 28,000 / Q</span>
            </div>
          </div>
        </div>
        <button onclick="openF2RQuickOrderModal('Cumin Premium', 'Ramesh Patel (Bagasara)', 28000, 15)" class="mt-4 w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs">
          <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
          <span>ઓર્ડર કરો (Direct Buy)</span>
        </button>
      </div>

      <!-- Sharbati Wheat -->
      <div class="bg-white border border-slate-200 hover:border-teal-400 rounded-2xl p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between">
            <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-100 text-sky-800">અનાજ</span>
            <span class="text-xs font-bold text-teal-700">8 km away</span>
          </div>
          <div class="mt-3">
            <h4 class="font-extrabold text-[#0F172A] text-base">ટુકડા ઘઉં (Tukda Wheat)</h4>
            <p class="text-xs text-slate-500">ખેડૂત: મનજીભાઈ (ચિતલ)</p>
          </div>
          <div class="mt-3 p-2.5 bg-slate-50 rounded-xl space-y-1 text-xs">
            <div class="flex justify-between text-slate-600">
              <span>જથ્થો (Stock):</span>
              <span class="font-bold text-[#0F172A]">40 ક્વિન્ટલ</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>દાણો (Grain Size):</span>
              <span class="font-bold text-emerald-700">Bold Golden Luster</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>ભાવ (Farmgate):</span>
              <span class="font-black text-teal-800 text-sm">₹ 2,400 / Q</span>
            </div>
          </div>
        </div>
        <button onclick="openF2RQuickOrderModal('Tukda Wheat', 'Manjibhai (Chital)', 2400, 40)" class="mt-4 w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs">
          <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
          <span>ઓર્ડર કરો (Direct Buy)</span>
        </button>
      </div>

      <!-- Cotton / Kapas -->
      <div class="bg-white border border-slate-200 hover:border-teal-400 rounded-2xl p-4 shadow-2xs hover:shadow-sm transition flex flex-col justify-between">
        <div>
          <div class="flex items-start justify-between">
            <span class="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-100 text-purple-800">રોકડિયો પાક</span>
            <span class="text-xs font-bold text-teal-700">14 km away</span>
          </div>
          <div class="mt-3">
            <h4 class="font-extrabold text-[#0F172A] text-base">કપાસ શંકર-6 (Cotton)</h4>
            <p class="text-xs text-slate-500">ખેડૂત: બાબુભાઈ (રાજુલા)</p>
          </div>
          <div class="mt-3 p-2.5 bg-slate-50 rounded-xl space-y-1 text-xs">
            <div class="flex justify-between text-slate-600">
              <span>જથ્થો (Stock):</span>
              <span class="font-bold text-[#0F172A]">25 ક્વિન્ટલ</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>સ્ટેપલ (Staple):</span>
              <span class="font-bold text-emerald-700">29mm Extra Long</span>
            </div>
            <div class="flex justify-between text-slate-600">
              <span>ભાવ (Farmgate):</span>
              <span class="font-black text-teal-800 text-sm">₹ 7,150 / Q</span>
            </div>
          </div>
        </div>
        <button onclick="openF2RQuickOrderModal('Cotton Shankar-6', 'Babubhai (Rajula)', 7150, 25)" class="mt-4 w-full py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-2xs">
          <i data-lucide="shopping-cart" class="w-3.5 h-3.5"></i>
          <span>ઓર્ડર કરો (Direct Buy)</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Recent Sourcing Orders & Fast Inward Tracking -->
  <div class="saas-card overflow-hidden">
    <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
      <div>
        <h4 class="font-bold text-[#0F172A] text-xs">તાજેતરના ખરીદ ઓર્ડર (Active Sourcing POs)</h4>
        <p class="text-[11px] text-slate-500">Live fulfillment status from farm to Mina Kirana store</p>
      </div>
      <button onclick="navigateTo('retailer-orders')" class="text-xs font-bold text-teal-700 hover:underline">
        બધા ઓર્ડર જુઓ &rarr;
      </button>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
            <th class="py-3 px-4">PO Number</th>
            <th class="py-3 px-4">પાક (Commodity)</th>
            <th class="py-3 px-4">ખેડૂત (Farmer)</th>
            <th class="py-3 px-4">જથ્થો</th>
            <th class="py-3 px-4">કુલ રકમ</th>
            <th class="py-3 px-4">સ્થિતિ (Status)</th>
            <th class="py-3 px-4 text-right">ક્રિયા (Action)</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 font-medium">
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-teal-800">#F2R-8821</td>
            <td class="py-3 px-4 font-bold text-[#0F172A]">મગફળી બોલ્ડ (Groundnut)</td>
            <td class="py-3 px-4 text-slate-600">જયેશ પટેલ · સુડાવદ</td>
            <td class="py-3 px-4">10 ક્વિન્ટલ</td>
            <td class="py-3 px-4 font-mono font-bold">₹ 52,000</td>
            <td class="py-3 px-4">
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-sky-100 text-sky-800">
                <i data-lucide="truck" class="w-3 h-3"></i> રસ્તામાં (In Transit)
              </span>
            </td>
            <td class="py-3 px-4 text-right">
              <button onclick="openDeliveryTrackModal('F2R-8821')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition">
                ટ્રેક કરો (GPS)
              </button>
            </td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-teal-800">#F2R-8819</td>
            <td class="py-3 px-4 font-bold text-[#0F172A]">જીરું પ્રીમિયમ (Cumin)</td>
            <td class="py-3 px-4 text-slate-600">રમેશ પટેલ · બગસરા</td>
            <td class="py-3 px-4">5 ક્વિન્ટલ</td>
            <td class="py-3 px-4 font-mono font-bold">₹ 1,40,000</td>
            <td class="py-3 px-4">
              <span class="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                <i data-lucide="check" class="w-3 h-3"></i> ડિલિવર થયેલ (Received)
              </span>
            </td>
            <td class="py-3 px-4 text-right">
              <button onclick="showToast('Invoice #F2R-8819 downloaded.', 'success')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition">
                બિલ (PDF)
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;

// 2. F2R PROCUREMENT DETAIL & QUALITY INSPECTOR (R11_Categories.png, R12_Peanut_Details.png)
views['view-f2r-procurement'] = `
<div id="view-f2r-procurement" class="hidden space-y-6 view-section">
  <!-- Header -->
  <div class="saas-card p-6 bg-gradient-to-r from-teal-50/80 via-white to-sky-50/60 border border-teal-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-2 text-xs font-bold text-teal-800">
        <span class="w-2 h-2 rounded-full bg-teal-600 animate-pulse"></span>
        <span>F2R Direct Farmgate Marketplace</span>
      </div>
      <h2 class="text-2xl font-black text-[#0F172A] mt-1">Farmgate Produce Lots & Quality Inspection</h2>
      <p class="text-xs text-[#64748B] mt-0.5 font-medium">
        Filter direct farmer lots by moisture content, sortex grading, distance, and certified lab tests.
      </p>
    </div>
    <div class="flex items-center gap-2">
      <input type="text" id="f2rSearchInput" placeholder="પાક અથવા ખેડૂત શોધો..." onkeyup="filterF2RLotsTable()" class="h-9 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-medium text-[#0F172A] outline-none focus:border-teal-600 shadow-2xs w-60">
    </div>
  </div>

  <!-- Featured Inspection Lot (Matching R12_Peanut_Details.png) -->
  <div class="saas-card p-6 border-2 border-teal-200 bg-white">
    <div class="flex flex-col lg:flex-row gap-6">
      <div class="w-full lg:w-1/3">
        <div class="h-56 bg-slate-100 rounded-2xl overflow-hidden relative border border-slate-200 flex items-center justify-center">
          <!-- Produce Mock Graphic -->
          <div class="text-center p-6">
            <span class="text-5xl">🥜</span>
            <div class="mt-2 text-xs font-extrabold text-[#0F172A]">મગફળી બોલ્ડ (Groundnut Bold Grade-A)</div>
            <span class="text-[10px] text-teal-800 bg-teal-100 px-2 py-0.5 rounded-full font-bold">100% Sorted & Cleaned</span>
          </div>
          <div class="absolute top-3 left-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-lg text-[10px] font-bold text-teal-800 border border-teal-200">
            Certified Lot #AMR-LOT-441
          </div>
        </div>
      </div>
      <div class="w-full lg:w-2/3 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between">
            <div>
              <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">Verified Farmer Produce</span>
              <h3 class="text-xl font-black text-[#0F172A] mt-2">જયેશ પટેલ · સુડાવદ (Sudavad, Bagasara Taluka)</h3>
              <p class="text-xs text-slate-500">Farm Location: Sudavad (12 km from Mina Kirana store) · Phone: +91 98251 44102</p>
            </div>
            <div class="text-right">
              <div class="text-2xl font-black text-teal-800">₹ 5,200 <span class="text-xs font-normal text-slate-500">/ ક્વિન્ટલ</span></div>
              <span class="text-[11px] text-amber-700 font-bold bg-amber-50 px-2 py-0.5 rounded">Mandi Rate: ₹ 5,450 (Save ₹250/Q)</span>
            </div>
          </div>

          <!-- Quality Parameter Grid -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
            <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span class="text-[10px] font-bold text-slate-400 uppercase">ઉપલબ્ધ જથ્થો (Stock)</span>
              <div class="text-sm font-black text-[#0F172A] mt-0.5">20 ક્વિન્ટલ</div>
              <span class="text-[10px] text-slate-500">2000 kg (40 Bags)</span>
            </div>
            <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span class="text-[10px] font-bold text-slate-400 uppercase">ભેજ (Moisture)</span>
              <div class="text-sm font-black text-emerald-700 mt-0.5">7.0% (Optimal)</div>
              <span class="text-[10px] text-emerald-600 font-semibold">Dry & Crisp</span>
            </div>
            <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span class="text-[10px] font-bold text-slate-400 uppercase">દાણાનું કદ (Boldness)</span>
              <div class="text-sm font-black text-[#0F172A] mt-0.5">Bold 40-50 Count</div>
              <span class="text-[10px] text-slate-500">Large Oilseed</span>
            </div>
            <div class="bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <span class="text-[10px] font-bold text-slate-400 uppercase">કાપણી તારીખ (Harvest)</span>
              <div class="text-sm font-black text-[#0F172A] mt-0.5">18 Oct 2026</div>
              <span class="text-[10px] text-slate-500">Fresh Kharif Crop</span>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between pt-4 border-t border-slate-100 mt-4">
          <div class="text-xs text-slate-500">
            Escrow payment released only after store weighing and physical quality acceptance.
          </div>
          <div class="flex items-center gap-2">
            <button onclick="showToast('Calling farmer Jayesh Patel (+91 98251 44102)...', 'info')" class="px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5">
              <i data-lucide="phone" class="w-3.5 h-3.5"></i>
              <span>ખેડૂતને કૉલ કરો</span>
            </button>
            <button onclick="openF2RQuickOrderModal('Groundnut Bold Grade-A', 'Jayesh Patel (Sudavad)', 5200, 20)" class="px-5 py-2 bg-teal-700 hover:bg-teal-800 text-white rounded-xl text-xs font-bold shadow-xs transition flex items-center gap-1.5">
              <i data-lucide="shopping-cart" class="w-4 h-4"></i>
              <span>સીધી ખરીદી કરો (Instant PO)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
`;

// 3. INDUSTRIAL PROCUREMENT & DEMANDS (I10_Home.png, I11_F2I_Purchase_Request.png, I26_My_Demand.png)
views['view-f2i-demands'] = `
<div id="view-f2i-demands" class="hidden space-y-6 view-section">
  <!-- Header -->
  <div class="saas-card p-6 bg-gradient-to-r from-indigo-50/80 via-white to-amber-50/60 border border-indigo-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-2 text-xs font-bold text-indigo-800">
        <span class="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
        <span>F2I Bulk Industrial Procurement Desk</span>
      </div>
      <h2 class="text-2xl font-black text-[#0F172A] mt-1">Patel Agro Industries · Raw Material Demands</h2>
      <p class="text-xs text-[#64748B] mt-0.5 font-medium">
        Publish crop purchase tenders, set moisture & quality standards, and contract directly with farmers and FPOs.
      </p>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="openNewIndustrialTenderModal()" class="h-9 px-4 bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
        <i data-lucide="plus-circle" class="w-4 h-4"></i>
        <span>નવી માંગણી ઉમેરો (Create Purchase Request)</span>
      </button>
      <button onclick="navigateTo('farmer-offers')" class="h-9 px-3.5 bg-white border border-[#E5E7EB] hover:bg-indigo-50 text-xs font-bold text-indigo-900 rounded-xl shadow-2xs transition flex items-center gap-1.5">
        <i data-lucide="tag" class="w-4 h-4"></i>
        <span>ખેડૂતોની ઓફર (Farmer Bids)</span>
      </button>
    </div>
  </div>

  <!-- Industrial Demand KPI Cards (from I10_Home.png) -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Cotton Demand Card -->
    <div class="saas-card p-5 border-l-4 border-l-indigo-600">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-indigo-900 bg-indigo-50 px-2 py-0.5 rounded">ટેન્ડર #F2I-COT-01</span>
        <span class="text-xs text-amber-600 font-bold">20 Quintals Needed</span>
      </div>
      <h3 class="text-lg font-black text-[#0F172A] mt-2">કપાસ શંકર-6 (Cotton)</h3>
      <div class="text-2xl font-black text-[#0F172A] mt-1">80 / 100 <span class="text-xs font-normal text-slate-500">ક્વિન્ટલ</span></div>
      <div class="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden">
        <div class="bg-indigo-600 h-full rounded-full" style="width: 80%"></div>
      </div>
      <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span class="text-slate-500">ટાર્ગેટ ભાવ: <strong class="text-[#0F172A]">₹ 7,200/Q</strong></span>
        <button onclick="navigateTo('farmer-offers')" class="text-indigo-700 font-bold hover:underline">8 Bids Active &rarr;</button>
      </div>
    </div>

    <!-- Groundnut Demand Card -->
    <div class="saas-card p-5 border-l-4 border-l-teal-600">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-teal-900 bg-teal-50 px-2 py-0.5 rounded">ટેન્ડર #F2I-GNT-02</span>
        <span class="text-xs text-amber-600 font-bold">15 Quintals Needed</span>
      </div>
      <h3 class="text-lg font-black text-[#0F172A] mt-2">મગફળી તેલ માટે (Groundnut Oilseed)</h3>
      <div class="text-2xl font-black text-[#0F172A] mt-1">25 / 40 <span class="text-xs font-normal text-slate-500">ક્વિન્ટલ</span></div>
      <div class="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden">
        <div class="bg-teal-600 h-full rounded-full" style="width: 62.5%"></div>
      </div>
      <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span class="text-slate-500">ટાર્ગેટ ભાવ: <strong class="text-[#0F172A]">₹ 5,400/Q</strong></span>
        <button onclick="navigateTo('farmer-offers')" class="text-teal-700 font-bold hover:underline">5 Bids Active &rarr;</button>
      </div>
    </div>

    <!-- Castor Demand Card -->
    <div class="saas-card p-5 border-l-4 border-l-amber-600">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded">ટેન્ડર #F2I-CST-03</span>
        <span class="text-xs text-amber-600 font-bold">15 Quintals Needed</span>
      </div>
      <h3 class="text-lg font-black text-[#0F172A] mt-2">દિવેલા / એરંડા (Castor Seed)</h3>
      <div class="text-2xl font-black text-[#0F172A] mt-1">10 / 25 <span class="text-xs font-normal text-slate-500">ક્વિન્ટલ</span></div>
      <div class="w-full bg-slate-100 h-2.5 rounded-full mt-2 overflow-hidden">
        <div class="bg-amber-600 h-full rounded-full" style="width: 40%"></div>
      </div>
      <div class="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
        <span class="text-slate-500">ટાર્ગેટ ભાવ: <strong class="text-[#0F172A]">₹ 6,100/Q</strong></span>
        <button onclick="navigateTo('farmer-offers')" class="text-amber-700 font-bold hover:underline">4 Bids Active &rarr;</button>
      </div>
    </div>
  </div>

  <!-- Published Purchase Tenders Table (from I11_F2I_Purchase_Request.png) -->
  <div class="saas-card overflow-hidden">
    <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
      <div>
        <h4 class="font-bold text-[#0F172A] text-xs">સક્રિય ઔદ્યોગિક ટેન્ડર્સ (Active Industrial Tenders)</h4>
        <p class="text-[11px] text-slate-500">Real-time status of raw agro-commodity tenders in Saurashtra</p>
      </div>
      <span class="text-xs font-bold text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-lg">3 Active Demands</span>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
            <th class="py-3 px-4">ટેન્ડર ID</th>
            <th class="py-3 px-4">પાક</th>
            <th class="py-3 px-4">કુલ જથ્થો</th>
            <th class="py-3 px-4">ટાર્ગેટ ભાવ</th>
            <th class="py-3 px-4">ગુણવત્તાના માપદંડ (Quality Specs)</th>
            <th class="py-3 px-4">ડિલિવરી સ્થળ</th>
            <th class="py-3 px-4">આવેલી ઓફર્સ</th>
            <th class="py-3 px-4 text-right">ક્રિયા</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 font-medium">
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-indigo-800">#F2I-COT-01</td>
            <td class="py-3 px-4 font-bold text-[#0F172A]">કપાસ શંકર-6</td>
            <td class="py-3 px-4">100 ક્વિન્ટલ</td>
            <td class="py-3 px-4 font-mono font-bold text-indigo-900">₹ 7,200 / Q</td>
            <td class="py-3 px-4 text-slate-600">ભેજ &lt; 8%, સફાઈ 98%</td>
            <td class="py-3 px-4 text-slate-600">ગોડાઉન નં. 2, અમરેલી GIDC</td>
            <td class="py-3 px-4">
              <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">8 ખેડૂત ઓફર</span>
            </td>
            <td class="py-3 px-4 text-right">
              <button onclick="navigateTo('farmer-offers')" class="px-3 py-1 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold transition">
                ઓફર જુઓ
              </button>
            </td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-indigo-800">#F2I-GNT-02</td>
            <td class="py-3 px-4 font-bold text-[#0F172A]">મગફળી તેલ માટે</td>
            <td class="py-3 px-4">40 ક્વિન્ટલ</td>
            <td class="py-3 px-4 font-mono font-bold text-indigo-900">₹ 5,400 / Q</td>
            <td class="py-3 px-4 text-slate-600">તેલ ટકાવારી &gt; 48%</td>
            <td class="py-3 px-4 text-slate-600">ઓઇલ મિલ યાર્ડ, અમરેલી</td>
            <td class="py-3 px-4">
              <span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">5 ખેડૂત ઓફર</span>
            </td>
            <td class="py-3 px-4 text-right">
              <button onclick="navigateTo('farmer-offers')" class="px-3 py-1 bg-indigo-700 hover:bg-indigo-800 text-white rounded-lg text-xs font-bold transition">
                ઓફર જુઓ
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;

// 4. FARMER OFFERS & BIDDING REVIEW (I12_Farmer_Offers.png, I13_Offer_Details.png, I14_Offer_Accepted.png)
views['view-farmer-offers'] = `
<div id="view-farmer-offers" class="hidden space-y-6 view-section">
  <!-- Header Strip -->
  <div class="saas-card p-6 bg-gradient-to-r from-indigo-50/80 via-white to-emerald-50/60 border border-indigo-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-2 text-xs font-bold text-indigo-800">
        <span class="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
        <span>Farmer Bids & Contracting Desk</span>
      </div>
      <h2 class="text-2xl font-black text-[#0F172A] mt-1">ખેડૂતો તરફથી આવેલી ઓફર્સ (Incoming Farmer Bids)</h2>
      <p class="text-xs text-[#64748B] mt-0.5 font-medium">
        Review commodity bids submitted by local farmers against Patel Agro Industries Cotton & Groundnut tenders.
      </p>
    </div>
    <div class="flex items-center gap-2">
      <span class="px-3 py-1.5 rounded-xl bg-indigo-50 border border-indigo-200 text-xs font-bold text-indigo-800">
        8 Incoming Bids on Cotton #F2I-COT-01
      </span>
    </div>
  </div>

  <!-- Bid Review Cards (Matching I12_Farmer_Offers.png) -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <!-- Offer 1: Jayesh Patel -->
    <div class="saas-card p-5 border-2 border-indigo-200 bg-white flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-full bg-indigo-100 text-indigo-800 font-black flex items-center justify-center text-sm">
              JP
            </div>
            <div>
              <h4 class="font-extrabold text-[#0F172A] text-sm">જયેશ પટેલ</h4>
              <p class="text-[11px] text-slate-500">ગામ: સુડાવદ (બગસરા)</p>
            </div>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Grade-A Clean</span>
        </div>

        <div class="mt-4 p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
          <div class="flex justify-between">
            <span class="text-slate-500">ઓફર કરેલો જથ્થો:</span>
            <span class="font-bold text-[#0F172A]">20 ક્વિન્ટલ (કપાસ)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">ઓફર ભાવ (Bid Price):</span>
            <span class="font-black text-indigo-800 text-sm">₹ 7,150 / Q</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">ભેજ (Moisture Meter):</span>
            <span class="font-bold text-emerald-700">7.2% (પાસ)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">ડિલિવરી વાહન:</span>
            <span class="font-mono text-slate-700 font-semibold">ટ્રેક્ટર GJ-14-R-2810</span>
          </div>
        </div>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
        <button onclick="acceptFarmerBid('Jayesh Patel (Sudavad)', 20, 7150)" class="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1">
          <i data-lucide="check" class="w-3.5 h-3.5"></i>
          <span>ઓફર સ્વીકારો</span>
        </button>
        <button onclick="rejectFarmerBid('Jayesh Patel (Sudavad)')" class="px-3 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 rounded-xl text-xs font-bold transition">
          નામંજૂર
        </button>
      </div>
    </div>

    <!-- Offer 2: Ramesh Patel -->
    <div class="saas-card p-5 border border-slate-200 bg-white flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-800 font-black flex items-center justify-center text-sm">
              RP
            </div>
            <div>
              <h4 class="font-extrabold text-[#0F172A] text-sm">રમેશ પટેલ</h4>
              <p class="text-[11px] text-slate-500">ગામ: બગસરા ટાઉન</p>
            </div>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">Grade-A</span>
        </div>

        <div class="mt-4 p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
          <div class="flex justify-between">
            <span class="text-slate-500">ઓફર કરેલો જથ્થો:</span>
            <span class="font-bold text-[#0F172A]">35 ક્વિન્ટલ (કપાસ)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">ઓફર ભાવ (Bid Price):</span>
            <span class="font-black text-indigo-800 text-sm">₹ 7,200 / Q</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">ભેજ (Moisture Meter):</span>
            <span class="font-bold text-emerald-700">7.6% (પાસ)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">ડિલિવરી વાહન:</span>
            <span class="font-mono text-slate-700 font-semibold">આઈશર GJ-14-T-8820</span>
          </div>
        </div>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
        <button onclick="acceptFarmerBid('Ramesh Patel (Bagasara)', 35, 7200)" class="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1">
          <i data-lucide="check" class="w-3.5 h-3.5"></i>
          <span>ઓફર સ્વીકારો</span>
        </button>
        <button onclick="rejectFarmerBid('Ramesh Patel (Bagasara)')" class="px-3 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 rounded-xl text-xs font-bold transition">
          નામંજૂર
        </button>
      </div>
    </div>

    <!-- Offer 3: Manjibhai -->
    <div class="saas-card p-5 border border-slate-200 bg-white flex flex-col justify-between">
      <div>
        <div class="flex items-start justify-between">
          <div class="flex items-center gap-2.5">
            <div class="w-10 h-10 rounded-full bg-slate-100 text-slate-800 font-black flex items-center justify-center text-sm">
              MB
            </div>
            <div>
              <h4 class="font-extrabold text-[#0F172A] text-sm">મનજીભાઈ આહિર</h4>
              <p class="text-[11px] text-slate-500">ગામ: રાજુલા</p>
            </div>
          </div>
          <span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">Grade-B</span>
        </div>

        <div class="mt-4 p-3 bg-slate-50 rounded-xl space-y-1.5 text-xs">
          <div class="flex justify-between">
            <span class="text-slate-500">ઓફર કરેલો જથ્થો:</span>
            <span class="font-bold text-[#0F172A]">25 ક્વિન્ટલ (કપાસ)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">ઓફર ભાવ (Bid Price):</span>
            <span class="font-black text-indigo-800 text-sm">₹ 7,180 / Q</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">ભેજ (Moisture Meter):</span>
            <span class="font-bold text-amber-700">8.2% (Moderate)</span>
          </div>
          <div class="flex justify-between">
            <span class="text-slate-500">ડિલિવરી વાહન:</span>
            <span class="font-mono text-slate-700 font-semibold">ટ્રેક્ટર GJ-14-Y-1014</span>
          </div>
        </div>
      </div>

      <div class="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
        <button onclick="acceptFarmerBid('Manjibhai Ahir (Rajula)', 25, 7180)" class="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center justify-center gap-1">
          <i data-lucide="check" class="w-3.5 h-3.5"></i>
          <span>ઓફર સ્વીકારો</span>
        </button>
        <button onclick="rejectFarmerBid('Manjibhai Ahir (Rajula)')" class="px-3 py-2 bg-slate-100 hover:bg-rose-50 hover:text-rose-700 text-slate-600 rounded-xl text-xs font-bold transition">
          નામંજૂર
        </button>
      </div>
    </div>
  </div>
</div>
`;

// 5. GATE INWARD, WEIGHBRIDGE & QC INSPECTION (I15_Delivery.png, I27_Incoming_Goods_Status.png)
views['view-gate-intake'] = `
<div id="view-gate-intake" class="hidden space-y-6 view-section">
  <!-- Header -->
  <div class="saas-card p-6 bg-gradient-to-r from-sky-50/80 via-white to-indigo-50/60 border border-sky-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-2 text-xs font-bold text-sky-800">
        <span class="w-2 h-2 rounded-full bg-sky-600 animate-pulse"></span>
        <span>Gate Inward & Electronic Weighbridge Station</span>
      </div>
      <h2 class="text-2xl font-black text-[#0F172A] mt-1">Weighbridge & QC Inward Log</h2>
      <p class="text-xs text-[#64748B] mt-0.5 font-medium">
        Patel Agro Industries · Mill Gate #1 Weighbridge & Lab Quality Analysis Station.
      </p>
    </div>
    <button onclick="openWeighbridgeQCModal()" class="h-9 px-4 bg-sky-700 hover:bg-sky-800 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
      <i data-lucide="scale" class="w-4 h-4"></i>
      <span>નવી ગાડી વજન કરો (Log Inward Vehicle)</span>
    </button>
  </div>

  <!-- Live Weighbridge Feed (Matching I15_Delivery.png & I27_Incoming_Goods_Status.png) -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="saas-card p-4 border-l-4 border-l-sky-600">
      <div class="text-[11px] font-bold text-slate-400 uppercase">Current Inward Trucks</div>
      <div class="text-2xl font-black text-[#0F172A] mt-1">3 Vehicles</div>
      <span class="text-xs text-sky-700 font-semibold mt-1 block">At Gate #1 Weighbridge</span>
    </div>
    <div class="saas-card p-4 border-l-4 border-l-emerald-600">
      <div class="text-[11px] font-bold text-slate-400 uppercase">Today's QC Passed Volume</div>
      <div class="text-2xl font-black text-[#0F172A] mt-1">68.5 <span class="text-xs font-normal text-slate-500">Quintals</span></div>
      <span class="text-xs text-emerald-700 font-semibold mt-1 block">Cotton & Groundnut lots</span>
    </div>
    <div class="saas-card p-4 border-l-4 border-l-amber-500">
      <div class="text-[11px] font-bold text-slate-400 uppercase">Average Moisture Level</div>
      <div class="text-2xl font-black text-amber-700 mt-1">7.3 %</div>
      <span class="text-xs text-amber-600 font-semibold mt-1 block">Within permissible standard (&lt; 8%)</span>
    </div>
  </div>

  <!-- Weighbridge Slips Table -->
  <div class="saas-card overflow-hidden">
    <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
      <h4 class="font-bold text-[#0F172A] text-xs">આજના વજન કાંટાની રસીદો (Weighbridge Slips)</h4>
      <span class="text-xs text-slate-500 font-medium">Digital Scale calibration active</span>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
            <th class="py-3 px-4">સ્લિપ નં.</th>
            <th class="py-3 px-4">વાહન નંબર</th>
            <th class="py-3 px-4">ખેડૂતનું નામ</th>
            <th class="py-3 px-4">પાક</th>
            <th class="py-3 px-4">ગ્રોસ વજન</th>
            <th class="py-3 px-4">ખાલી વજન (Tare)</th>
            <th class="py-3 px-4">ચોખ્ખો કપાસ (Net)</th>
            <th class="py-3 px-4">QC રિપોર્ટ</th>
            <th class="py-3 px-4 text-right">ગેટ પાસ</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 font-medium">
          <tr>
            <td class="py-3 px-4 font-mono font-bold text-sky-800">#WB-2026-901</td>
            <td class="py-3 px-4 font-mono font-bold text-[#0F172A]">GJ-14-X-4921</td>
            <td class="py-3 px-4">જયેશ પટેલ (સુડાવદ)</td>
            <td class="py-3 px-4 font-bold">કપાસ શંકર-6</td>
            <td class="py-3 px-4 font-mono">14,850 kg</td>
            <td class="py-3 px-4 font-mono">4,850 kg</td>
            <td class="py-3 px-4 font-mono font-bold text-emerald-800">10,000 kg (100 Q)</td>
            <td class="py-3 px-4">
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                QC પાસ (7.4% ભેજ)
              </span>
            </td>
            <td class="py-3 px-4 text-right">
              <button onclick="showToast('Printing Gate Pass & Weighbridge Slip #WB-2026-901...', 'success')" class="px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition">
                પ્રિન્ટ સ્લિપ
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;

// 6. INDUSTRIAL STOCK & SILOS (I28_Warehouse_Stock.png)
views['view-industrial-stock'] = `
<div id="view-industrial-stock" class="hidden space-y-6 view-section">
  <!-- Header -->
  <div class="saas-card p-6 bg-gradient-to-r from-slate-50 via-white to-indigo-50/60 border border-slate-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-2 text-xs font-bold text-indigo-800">
        <span class="w-2 h-2 rounded-full bg-indigo-600 animate-pulse"></span>
        <span>Factory Warehouse & Silo Storage Monitoring</span>
      </div>
      <h2 class="text-2xl font-black text-[#0F172A] mt-1">Raw Material Silos & Warehouse Inventory</h2>
      <p class="text-xs text-[#64748B] mt-0.5 font-medium">
        Live storage capacity, silo humidity levels, and batch aging across Patel Agro Industries Amreli GIDC Godowns.
      </p>
    </div>
    <span class="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1.5 rounded-xl border border-slate-200">
      Total Godown Capacity: 1,500 MT
    </span>
  </div>

  <!-- Silos Visualization -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <!-- Silo 1 -->
    <div class="saas-card p-5 border border-slate-200">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-slate-500">સાયલો #1 (Cotton Godown)</span>
        <span class="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">78% Full</span>
      </div>
      <div class="mt-4 flex items-center justify-center">
        <div class="w-28 h-40 bg-slate-100 rounded-2xl relative border-2 border-slate-300 overflow-hidden flex flex-col justify-end">
          <div class="bg-indigo-600 w-full transition-all duration-500 flex items-center justify-center text-white text-[10px] font-bold" style="height: 78%">
            390 MT
          </div>
        </div>
      </div>
      <div class="mt-4 text-center">
        <div class="font-extrabold text-[#0F172A] text-sm">કપાસ શંકર-6 (ગાસડીઓ)</div>
        <p class="text-xs text-slate-500 mt-0.5">તાપમાન: 24°C · ભેજ: 62%</p>
      </div>
    </div>

    <!-- Silo 2 -->
    <div class="saas-card p-5 border border-slate-200">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-slate-500">સાયલો #2 (Groundnut Silo)</span>
        <span class="text-xs font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">65% Full</span>
      </div>
      <div class="mt-4 flex items-center justify-center">
        <div class="w-28 h-40 bg-slate-100 rounded-2xl relative border-2 border-slate-300 overflow-hidden flex flex-col justify-end">
          <div class="bg-teal-600 w-full transition-all duration-500 flex items-center justify-center text-white text-[10px] font-bold" style="height: 65%">
            325 MT
          </div>
        </div>
      </div>
      <div class="mt-4 text-center">
        <div class="font-extrabold text-[#0F172A] text-sm">મગફળી તેલીબિયાં</div>
        <p class="text-xs text-slate-500 mt-0.5">તાપમાન: 22°C · ભેજ: 58%</p>
      </div>
    </div>

    <!-- Silo 3 -->
    <div class="saas-card p-5 border border-slate-200">
      <div class="flex items-center justify-between">
        <span class="text-xs font-bold text-slate-500">સાયલો #3 (Castor & Grain)</span>
        <span class="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">42% Full</span>
      </div>
      <div class="mt-4 flex items-center justify-center">
        <div class="w-28 h-40 bg-slate-100 rounded-2xl relative border-2 border-slate-300 overflow-hidden flex flex-col justify-end">
          <div class="bg-amber-600 w-full transition-all duration-500 flex items-center justify-center text-white text-[10px] font-bold" style="height: 42%">
            210 MT
          </div>
        </div>
      </div>
      <div class="mt-4 text-center">
        <div class="font-extrabold text-[#0F172A] text-sm">દિવેલા / એરંડા</div>
        <p class="text-xs text-slate-500 mt-0.5">તાપમાન: 25°C · ભેજ: 55%</p>
      </div>
    </div>
  </div>
</div>
`;

// 7. DEALER STOCK & PRICE CHANGER (D13_Stock.png, D14_Change_Price.png)
views['view-dealer-stock'] = `
<div id="view-dealer-stock" class="hidden space-y-6 view-section">
  <!-- Header -->
  <div class="saas-card p-6 bg-gradient-to-r from-amber-50/80 via-white to-emerald-50/60 border border-amber-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-2 text-xs font-bold text-amber-800">
        <span class="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
        <span>Kishan Agro Krushi Kendra · Input Inventory & POS Pricing</span>
      </div>
      <h2 class="text-2xl font-black text-[#0F172A] mt-1">ખાતર, બિયારણ અને દવાનો સ્ટોક (Agro-Input Stock)</h2>
      <p class="text-xs text-[#64748B] mt-0.5 font-medium">
        Manage fertilizer quotas, batch expiries, retail MRP, and dealer selling prices for Bagasara farmers.
      </p>
    </div>
    <div class="flex items-center gap-2">
      <button onclick="openPriceChangeModal()" class="h-9 px-4 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
        <i data-lucide="tag" class="w-4 h-4"></i>
        <span>ભાવ બદલો (Update Retail Prices)</span>
      </button>
    </div>
  </div>

  <!-- Critical Low Stock Warning Banner (from D10_Home.png & D11_Order_Management.png) -->
  <div class="saas-card p-4 bg-rose-50 border-2 border-rose-300 rounded-2xl flex items-center justify-between">
    <div class="flex items-center gap-3">
      <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center font-bold">
        <i data-lucide="alert-triangle" class="w-5 h-5"></i>
      </div>
      <div>
        <div class="text-xs font-black text-rose-800">તાકીદની સ્ટોક ચેતવણી: નીમ કોટેડ યુરિયા (Urea Low Stock Warning!)</div>
        <p class="text-[11px] text-rose-700 mt-0.5">માત્ર 12 બેગ સ્ટોકમાં બાકી છે. આજના 14 ઓર્ડર પૂરા કરવા માટે તરત જ સપ્લાયરને નવો ઓર્ડર આપો.</p>
      </div>
    </div>
    <button onclick="showToast('Reorder PO placed with IFFCO Amreli depot for 100 Urea bags.', 'success')" class="px-4 py-2 bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold rounded-xl transition shadow-xs">
      નવો જથ્થો મંગાવો (Reorder)
    </button>
  </div>

  <!-- Stock Table -->
  <div class="saas-card overflow-hidden">
    <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
      <h4 class="font-bold text-[#0F172A] text-xs">દુકાનનો સ્ટોક અને કિંમતો (Shop Inventory)</h4>
      <span class="text-xs text-slate-500 font-medium">Updated 10 mins ago</span>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-left text-xs">
        <thead>
          <tr class="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold">
            <th class="py-3 px-4">ઉત્પાદનનું નામ</th>
            <th class="py-3 px-4">શ્રેણી</th>
            <th class="py-3 px-4">હાલનો સ્ટોક</th>
            <th class="py-3 px-4">સરકારી MRP</th>
            <th class="py-3 px-4">વેચાણ ભાવ (Selling)</th>
            <th class="py-3 px-4">બેચ નંબર</th>
            <th class="py-3 px-4">સ્થિતિ</th>
            <th class="py-3 px-4 text-right">ભાવ બદલો</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100 font-medium">
          <tr class="bg-rose-50/40">
            <td class="py-3 px-4 font-bold text-[#0F172A]">નીમ કોટેડ યુરિયા (45 kg)</td>
            <td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">ખાતર</span></td>
            <td class="py-3 px-4 font-mono font-bold text-rose-700">12 બેગ (Low!)</td>
            <td class="py-3 px-4 font-mono">₹ 266.50</td>
            <td class="py-3 px-4 font-mono font-bold text-[#0F172A]">₹ 266.50</td>
            <td class="py-3 px-4 font-mono text-slate-600">IFF-26-881</td>
            <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">ઓછો સ્ટોક</span></td>
            <td class="py-3 px-4 text-right">
              <button onclick="openPriceChangeModal('Neem Coated Urea 45kg', 266.50)" class="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition">
                સંપાદિત કરો
              </button>
            </td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-[#0F172A]">DAP 18:46:00 (50 kg)</td>
            <td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold">ખાતર</span></td>
            <td class="py-3 px-4 font-mono font-bold text-[#0F172A]">48 બેગ</td>
            <td class="py-3 px-4 font-mono">₹ 1,350.00</td>
            <td class="py-3 px-4 font-mono font-bold text-[#0F172A]">₹ 1,350.00</td>
            <td class="py-3 px-4 font-mono text-slate-600">GSF-26-102</td>
            <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">પર્યાપ્ત સ્ટોક</span></td>
            <td class="py-3 px-4 text-right">
              <button onclick="openPriceChangeModal('DAP 50kg', 1350)" class="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition">
                સંપાદિત કરો
              </button>
            </td>
          </tr>
          <tr>
            <td class="py-3 px-4 font-bold text-[#0F172A]">હાઇબ્રિડ મકાઈ બિયારણ (4 kg)</td>
            <td class="py-3 px-4"><span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">બિયારણ</span></td>
            <td class="py-3 px-4 font-mono font-bold text-[#0F172A]">85 પેકેટ</td>
            <td class="py-3 px-4 font-mono">₹ 950.00</td>
            <td class="py-3 px-4 font-mono font-bold text-[#0F172A]">₹ 890.00</td>
            <td class="py-3 px-4 font-mono text-slate-600">MAH-26-44</td>
            <td class="py-3 px-4"><span class="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">પર્યાપ્ત સ્ટોક</span></td>
            <td class="py-3 px-4 text-right">
              <button onclick="openPriceChangeModal('Hybrid Maize Seed 4kg', 890)" class="px-2.5 py-1 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 rounded-lg text-xs font-bold transition">
                સંપાદિત કરો
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
`;

// 8. DEALER SERVICE AREA (D18_Service_Area.png)
views['view-service-area'] = `
<div id="view-service-area" class="hidden space-y-6 view-section">
  <!-- Header -->
  <div class="saas-card p-6 bg-gradient-to-r from-amber-50/80 via-white to-sky-50/60 border border-amber-200 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
    <div>
      <div class="flex items-center gap-2 text-xs font-bold text-amber-800">
        <span class="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
        <span>Dealer Territory & Delivery Radius</span>
      </div>
      <h2 class="text-2xl font-black text-[#0F172A] mt-1">સેવા વિસ્તાર (15 km Delivery Service Area)</h2>
      <p class="text-xs text-[#64748B] mt-0.5 font-medium">
        Kishan Agro · Bagasara Taluka · Delivery to 18 villages within 24 hours of farmer mobile order.
      </p>
    </div>
    <span class="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1.5 rounded-xl">
      15 km Operational Radius
    </span>
  </div>

  <!-- Village Grid (from D18_Service_Area.png) -->
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <div class="saas-card p-4 border-l-4 border-l-emerald-600">
      <div class="flex items-center justify-between">
        <h4 class="font-extrabold text-[#0F172A] text-sm">સુડાવદ (Sudavad)</h4>
        <span class="text-xs font-bold text-emerald-700">6 km away</span>
      </div>
      <p class="text-xs text-slate-500 mt-1">42 Registered Farmers · Daily morning delivery route</p>
      <div class="mt-3 flex items-center justify-between text-xs text-slate-600">
        <span>Delivery fee: <strong class="text-emerald-700">Free &gt; ₹1,000</strong></span>
        <span class="text-emerald-700 font-bold">Active</span>
      </div>
    </div>
    <div class="saas-card p-4 border-l-4 border-l-emerald-600">
      <div class="flex items-center justify-between">
        <h4 class="font-extrabold text-[#0F172A] text-sm">માવજીંજવા (Mavjinjava)</h4>
        <span class="text-xs font-bold text-emerald-700">9 km away</span>
      </div>
      <p class="text-xs text-slate-500 mt-1">28 Registered Farmers · Afternoon route</p>
      <div class="mt-3 flex items-center justify-between text-xs text-slate-600">
        <span>Delivery fee: <strong class="text-emerald-700">Free &gt; ₹1,000</strong></span>
        <span class="text-emerald-700 font-bold">Active</span>
      </div>
    </div>
    <div class="saas-card p-4 border-l-4 border-l-emerald-600">
      <div class="flex items-center justify-between">
        <h4 class="font-extrabold text-[#0F172A] text-sm">કાડાયા (Kadaya)</h4>
        <span class="text-xs font-bold text-emerald-700">11 km away</span>
      </div>
      <p class="text-xs text-slate-500 mt-1">34 Registered Farmers · Daily evening route</p>
      <div class="mt-3 flex items-center justify-between text-xs text-slate-600">
        <span>Delivery fee: <strong class="text-emerald-700">Free &gt; ₹1,000</strong></span>
        <span class="text-emerald-700 font-bold">Active</span>
      </div>
    </div>
  </div>
</div>
`;

module.exports = views;
