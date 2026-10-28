// modules/access.js
// Access Module: A59 Role matrix, A69 Admin staff, A63 Approvals, A60 Dealer web access, A70 Dealer review, A61 Industrial web access, A71 Industrial review

const accessHtml = `
          <!-- -------------------------------------------------------------
               VIEW: ROLE MATRIX (A59)
               Eight roles only: Super admin, Operate, Maintenance, Analysis, Dealer, Industrial, Farmer, Retailer
               Legend chips: C green, R amber, A teal, X grey lock
               ------------------------------------------------------------- -->
          <div id="view-role-matrix" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div>
                <span class="text-xs font-bold text-[#0F172A]">Permission & Access Control Matrix</span>
                <p class="text-[11px] text-[#64748B]">Eight roles only · functional page authorization source of truth</p>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="resetRoleMatrix()" class="px-3.5 py-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A]">Reset</button>
                <button onclick="saveRoleMatrix()" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                  <i data-lucide="check" class="w-4 h-4"></i>
                  <span>Save matrix</span>
                </button>
              </div>
            </div>

            <!-- Legend Chips -->
            <div class="flex flex-wrap items-center gap-4 bg-white p-3 rounded-2xl border border-[#E5E7EB] text-xs font-medium">
              <span class="text-[#64748B] font-bold">Permissions Legend:</span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold">
                <span class="w-2 h-2 rounded-full bg-emerald-600"></span> C • Create / Edit
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-100 text-amber-800 font-bold">
                <span class="w-2 h-2 rounded-full bg-amber-600"></span> R • Read Only
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-teal-100 text-teal-800 font-bold">
                <span class="w-2 h-2 rounded-full bg-teal-600"></span> A • Approve
              </span>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 text-slate-500 font-bold">
                <i data-lucide="lock" class="w-3 h-3"></i> X • No Access
              </span>
            </div>

            <!-- Wide Matrix Table -->
            <div class="saas-card overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-center border-collapse saas-table">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3 text-left sticky left-0 bg-[#F8FAFC] z-10">Module / Capability</th>
                      <th class="px-3 py-3">Super admin</th>
                      <th class="px-3 py-3">Operate</th>
                      <th class="px-3 py-3">Maintenance</th>
                      <th class="px-3 py-3">Analysis</th>
                      <th class="px-3 py-3">Dealer</th>
                      <th class="px-3 py-3">Industrial</th>
                      <th class="px-3 py-3">Farmer</th>
                      <th class="px-3 py-3">Retailer</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-bold">
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-left font-bold text-[#0F172A] sticky left-0 bg-white">Dashboard</td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-left font-bold text-[#0F172A] sticky left-0 bg-white">Insights</td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-left font-bold text-[#0F172A] sticky left-0 bg-white">Users</td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-teal-100 text-teal-800">A</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-left font-bold text-[#0F172A] sticky left-0 bg-white">Masters</td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-left font-bold text-[#0F172A] sticky left-0 bg-white">Field Tools</td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-left font-bold text-[#0F172A] sticky left-0 bg-white">Orders & Godown</td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-left font-bold text-[#0F172A] sticky left-0 bg-white">Delivery</td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-left font-bold text-[#0F172A] sticky left-0 bg-white">Sales & Dealer Desk</td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-teal-100 text-teal-800">A</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-left font-bold text-[#0F172A] sticky left-0 bg-white">Wallet & Payouts</td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-left font-bold text-[#0F172A] sticky left-0 bg-white">Reports Hub</td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-amber-100 text-amber-800">R</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 text-left font-bold text-[#0F172A] sticky left-0 bg-white">Settings & Config</td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-emerald-100 text-emerald-800">C</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                      <td class="px-3 py-3.5"><span class="px-2 py-1 rounded bg-slate-100 text-slate-400">X</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: ADMIN STAFF (A69)
               ------------------------------------------------------------- -->
          <div id="view-admin-staff" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white rounded-full">Super admin · Full access</span>
                <span class="text-xs font-semibold text-[#64748B]">Internal Operations & Technical Staff Directory</span>
              </div>
              <button onclick="showToast('Opening Add Staff Member modal...', 'info')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Add staff</span>
              </button>
            </div>

            <!-- Staff Table -->
            <div class="saas-card overflow-hidden">
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3">Staff Name</th>
                      <th class="px-5 py-3">Assigned Role</th>
                      <th class="px-5 py-3">Operating Unit</th>
                      <th class="px-5 py-3">Last Active</th>
                      <th class="px-5 py-3">Status</th>
                      <th class="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium text-[#0F172A]">
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Rudram Admin</div>
                        <div class="text-[11px] text-[#64748B]">admin@rudram.in • Super Administrator</div>
                      </td>
                      <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-600 text-white">Super admin</span></td>
                      <td class="px-5 py-3.5 font-bold">Amreli HQ</td>
                      <td class="px-5 py-3.5 text-emerald-600 font-bold">Active now</td>
                      <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Active</span></td>
                      <td class="px-5 py-3.5 text-right"><span class="text-xs text-[#64748B]">Primary Root</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Kiran Joshi</div>
                        <div class="text-[11px] text-[#64748B]">kiran.j@ankurmitra.in • Operations Lead</div>
                      </td>
                      <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">Operate</span></td>
                      <td class="px-5 py-3.5 font-bold">Amreli Ops Desk</td>
                      <td class="px-5 py-3.5 text-[#64748B]">10 min ago</td>
                      <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Active</span></td>
                      <td class="px-5 py-3.5 text-right"><button onclick="showToast('Editing permissions for Kiran Joshi', 'info')" class="text-xs text-[#0B6623] font-bold hover:underline">Edit</button></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Amit Desai</div>
                        <div class="text-[11px] text-[#64748B]">amit.d@ankurmitra.in • Platform Maintenance</div>
                      </td>
                      <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">Maintenance</span></td>
                      <td class="px-5 py-3.5 font-bold">Amreli Tech Hub</td>
                      <td class="px-5 py-3.5 text-[#64748B]">1 hour ago</td>
                      <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Active</span></td>
                      <td class="px-5 py-3.5 text-right"><button onclick="showToast('Editing permissions for Amit Desai', 'info')" class="text-xs text-[#0B6623] font-bold hover:underline">Edit</button></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Neha Shah</div>
                        <div class="text-[11px] text-[#64748B]">neha.s@ankurmitra.in • Data Analyst</div>
                      </td>
                      <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-white">Analysis</span></td>
                      <td class="px-5 py-3.5 font-bold">Amreli HQ</td>
                      <td class="px-5 py-3.5 text-[#64748B]">25 min ago</td>
                      <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Active</span></td>
                      <td class="px-5 py-3.5 text-right"><button onclick="showToast('Editing permissions for Neha Shah', 'info')" class="text-xs text-[#0B6623] font-bold hover:underline">Edit</button></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: APPROVALS (A63)
               ------------------------------------------------------------- -->
          <div id="view-approvals" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div class="flex items-center gap-3">
                <span class="px-2.5 py-1 text-xs font-bold bg-emerald-600 text-white rounded-full">Super admin · Full access</span>
                <span class="text-xs font-semibold text-[#64748B]">Verification & Access Grant Queue</span>
              </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
              <!-- Item 1: Dealer Web Access -->
              <div class="saas-card p-5 border-l-4 border-l-amber-500">
                <div class="flex items-center justify-between">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800">Dealer Access Request</span>
                  <span class="text-xs text-[#64748B]">Pending 2 hours</span>
                </div>
                <h4 class="font-bold text-[#0F172A] mt-2">Kishan Agro • Bagasara (Rameshbhai Patel)</h4>
                <p class="text-xs text-[#64748B] mt-1">Requesting Web Portal credentials for inventory syncing and digital customer ledger.</p>
                <div class="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <button onclick="navigateTo('dealer-review', 'Access', 'Dealer review')" class="text-xs text-[#0B6623] font-bold hover:underline">Open dealer review &rarr;</button>
                  <div class="flex items-center gap-2">
                    <button onclick="showToast('Web login rejected for Kishan Agro', 'error')" class="px-3 py-1 rounded-lg border border-red-200 text-red-700 font-bold text-xs">Reject</button>
                    <button onclick="showToast('Web access granted to Kishan Agro (Rameshbhai)', 'success')" class="px-3 py-1 rounded-lg bg-[#0B6623] text-white font-bold text-xs">Approve</button>
                  </div>
                </div>
              </div>

              <!-- Item 2: Industrial Sourcing Settle -->
              <div class="saas-card p-5 border-l-4 border-l-blue-500">
                <div class="flex items-center justify-between">
                  <span class="px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-800">Industrial Mill Verification</span>
                  <span class="text-xs text-[#64748B]">Pending 1 day</span>
                </div>
                <h4 class="font-bold text-[#0F172A] mt-2">Patel Agro Industries • Amreli (Hiteshbhai Patel)</h4>
                <p class="text-xs text-[#64748B] mt-1">Cotton Shankar-6 direct sourcing quota of 500 Quintals and automated F2I inward pass.</p>
                <div class="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                  <button onclick="navigateTo('industrial-review', 'Access', 'Industrial review')" class="text-xs text-[#0B6623] font-bold hover:underline">Open industrial review &rarr;</button>
                  <div class="flex items-center gap-2">
                    <button onclick="showToast('Industrial quota rejected', 'error')" class="px-3 py-1 rounded-lg border border-red-200 text-red-700 font-bold text-xs">Reject</button>
                    <button onclick="showToast('Industrial quota & web access approved for Patel Agro', 'success')" class="px-3 py-1 rounded-lg bg-[#0B6623] text-white font-bold text-xs">Approve</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: DEALER WEB ACCESS (A60)
               ------------------------------------------------------------- -->
          <div id="view-dealer-web-access" class="hidden space-y-6 view-section">
            <div class="saas-card p-5 border-amber-200 bg-amber-50/20">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-extrabold text-[#0F172A]">Kishan Agro • Bagasara</h3>
                  <p class="text-xs text-[#64748B]">Dealer Portal Access Configuration • Rameshbhai Patel (+91 98251 12345)</p>
                </div>
                <span class="px-2.5 py-1 text-xs font-bold bg-amber-500 text-white rounded-full">Dealer · Limited access</span>
              </div>
            </div>

            <!-- Permissions Matrix for Dealer -->
            <div class="saas-card p-5 space-y-4">
              <h4 class="text-xs font-bold text-[#0F172A]">Feature Privileges & Permissions</h4>
              <div class="divide-y divide-[#E5E7EB] text-xs">
                <div class="py-3 flex items-center justify-between">
                  <div>
                    <div class="font-bold text-[#0F172A]">Customer Order Fulfillment</div>
                    <div class="text-[11px] text-[#64748B]">Allow accepting and dispatching orders from local farmers</div>
                  </div>
                  <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded focus:ring-[#0B6623]">
                </div>
                <div class="py-3 flex items-center justify-between">
                  <div>
                    <div class="font-bold text-[#0F172A]">Godown Stock Sync</div>
                    <div class="text-[11px] text-[#64748B]">Real-time synchronization of urea, seed, and pesticide inventory</div>
                  </div>
                  <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded focus:ring-[#0B6623]">
                </div>
                <div class="py-3 flex items-center justify-between">
                  <div>
                    <div class="font-bold text-[#0F172A]">Direct Payout Request</div>
                    <div class="text-[11px] text-[#64748B]">Trigger instant bank settlements for commission and retail margin</div>
                  </div>
                  <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded focus:ring-[#0B6623]">
                </div>
              </div>

              <div class="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                <button onclick="navigateTo('dealer-review', 'Access', 'Dealer review')" class="px-4 py-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A]">Open Dealer Review</button>
                <button onclick="showToast('Dealer permissions saved successfully', 'success')" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold text-xs shadow-sm">Save Permissions</button>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: DEALER REVIEW (A70)
               Shop "Kishan Agro · Bagasara". Pill "Super admin · Full access".
               Header Rameshbhai Patel, Dealer · Limited access, Active.
               KPI Orders 14, Revenue ₹ 86,400, Due ₹ 12,400, Low stock Urea 12 bags.
               Chart sales 7 days. Table last orders Jayesh Patel urea ₹ 2,700 New, Rambhai seed ₹ 1,920 Done.
               Buttons: "Keep limited", "Revoke web", "Open dealer desk".
               ------------------------------------------------------------- -->
          <div id="view-dealer-review" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-[#0F172A]">Kishan Agro · Bagasara</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">Active</span>
                </div>
                <p class="text-[11px] text-[#64748B]">Rameshbhai Patel • Dealer · Limited access</p>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="showToast('Web access revoked for Kishan Agro', 'error')" class="px-3.5 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-bold">Revoke web</button>
                <button onclick="navigateTo('dealer-desk', 'Sales', 'Dealer desk')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm">Open dealer desk</button>
              </div>
            </div>

            <!-- KPIs: Orders 14, Revenue ₹ 86,400, Due ₹ 12,400, Low stock Urea 12 bags -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Orders</span>
                <div class="text-3xl font-extrabold text-[#0F172A] mt-2">14</div>
                <p class="text-xs text-[#64748B] mt-1">Direct farmer purchases</p>
              </div>

              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Revenue</span>
                <div class="text-3xl font-extrabold text-[#0B6623] mt-2">₹ 86,400</div>
                <p class="text-xs text-[#64748B] mt-1">Total billing volume (MTD)</p>
              </div>

              <div class="saas-card p-5 border-amber-200 bg-amber-50/20">
                <span class="text-xs font-semibold text-amber-800">Due</span>
                <div class="text-3xl font-extrabold text-amber-900 mt-2">₹ 12,400</div>
                <p class="text-xs text-[#64748B] mt-1">Outstanding farmer credit</p>
              </div>

              <div class="saas-card p-5 border-red-200 bg-red-50/10">
                <span class="text-xs font-semibold text-red-700">Low Stock Alert</span>
                <div class="text-2xl font-extrabold text-red-700 mt-2">Urea 12 bags</div>
                <p class="text-xs text-[#64748B] mt-1">Reorder threshold reached</p>
              </div>
            </div>

            <!-- Table: Last Orders -->
            <div class="saas-card overflow-hidden">
              <div class="p-4 border-b border-[#E5E7EB] bg-[#F8FAFC]">
                <h4 class="text-xs font-bold text-[#0F172A]">Recent Customer Order Activity</h4>
              </div>
              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3">Customer</th>
                      <th class="px-5 py-3">Item Ordered</th>
                      <th class="px-5 py-3">Amount</th>
                      <th class="px-5 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium text-[#0F172A]">
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 font-bold">Jayesh Patel (Sudavad)</td>
                      <td class="px-5 py-3.5">Urea (10 Bags)</td>
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">₹ 2,700</td>
                      <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800">New</span></td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC]">
                      <td class="px-5 py-3.5 font-bold">Rambhai (Sudavad)</td>
                      <td class="px-5 py-3.5">Seed (GS-20 8 pkts)</td>
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">₹ 1,920</td>
                      <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">Done</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: INDUSTRIAL WEB ACCESS (A61)
               ------------------------------------------------------------- -->
          <div id="view-industrial-web-access" class="hidden space-y-6 view-section">
            <div class="saas-card p-5 border-amber-200 bg-amber-50/20">
              <div class="flex items-center justify-between">
                <div>
                  <h3 class="text-sm font-extrabold text-[#0F172A]">Patel Agro Industries • Amreli</h3>
                  <p class="text-xs text-[#64748B]">Industrial Sourcing Desk • Hiteshbhai Patel (GSTIN: 24AAACP1234F1Z8)</p>
                </div>
                <span class="px-2.5 py-1 text-xs font-bold bg-amber-500 text-white rounded-full">Industrial · Limited access</span>
              </div>
            </div>

            <div class="saas-card p-5 space-y-4">
              <h4 class="text-xs font-bold text-[#0F172A]">Direct Farm Sourcing Privileges</h4>
              <div class="divide-y divide-[#E5E7EB] text-xs">
                <div class="py-3 flex items-center justify-between">
                  <div>
                    <div class="font-bold text-[#0F172A]">Raw Material Demand Broadcast</div>
                    <div class="text-[11px] text-[#64748B]">Post bulk procurement tenders directly to regional farmer cooperatives</div>
                  </div>
                  <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded focus:ring-[#0B6623]">
                </div>
                <div class="py-3 flex items-center justify-between">
                  <div>
                    <div class="font-bold text-[#0F172A]">Gate Inward & Electronic Weighbridge Sync</div>
                    <div class="text-[11px] text-[#64748B]">Direct acceptance of farmer lots via digital weight slip verification</div>
                  </div>
                  <input type="checkbox" checked class="w-4 h-4 text-[#0B6623] rounded focus:ring-[#0B6623]">
                </div>
              </div>

              <div class="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                <button onclick="navigateTo('industrial-review', 'Access', 'Industrial review')" class="px-4 py-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A]">Open Industrial Review</button>
                <button onclick="showToast('Industrial settings saved', 'success')" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold text-xs shadow-sm">Save Settings</button>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: INDUSTRIAL REVIEW (A71)
               Unit "Patel Agro Industries · Amreli". Pill "Super admin · Full access".
               Header Hiteshbhai Patel, Industrial · Limited access, Web login Pending.
               KPI Demand cotton 100, Incoming 20 quintal on the way, Godown cotton 80, Amount ₹ 1,43,000.
               Pipeline Pickup -> On the way -> At unit. Offer Jayesh Patel cotton 20 quintal ₹ 7,150.
               Buttons "Approve web login", "Reject", "Keep limited".
               ------------------------------------------------------------- -->
          <div id="view-industrial-review" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-xs font-bold text-[#0F172A]">Patel Agro Industries · Amreli</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900">Web login Pending</span>
                </div>
                <p class="text-[11px] text-[#64748B]">Hiteshbhai Patel • Industrial · Limited access</p>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="showToast('Industrial review status kept limited', 'info')" class="px-3.5 py-2 rounded-xl border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold text-[#0F172A]">Keep limited</button>
                <button onclick="showToast('Web login rejected', 'error')" class="px-3.5 py-2 rounded-xl border border-red-200 text-red-700 hover:bg-red-50 text-xs font-bold">Reject</button>
                <button onclick="showToast('Web login approved for Patel Agro Industries', 'success')" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm">Approve web login</button>
              </div>
            </div>

            <!-- KPIs: Demand cotton 100, Incoming 20 quintal, Godown cotton 80, Amount ₹ 1,43,000 -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Demand Cotton</span>
                <div class="text-3xl font-extrabold text-[#0F172A] mt-2">100 <span class="text-xs font-normal text-[#64748B]">Qtl</span></div>
                <p class="text-xs text-[#64748B] mt-1">Monthly target requirement</p>
              </div>

              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-blue-700">Incoming (In Transit)</span>
                <div class="text-3xl font-extrabold text-blue-600 mt-2">20 <span class="text-xs font-normal text-[#64748B]">Qtl</span></div>
                <p class="text-xs text-[#64748B] mt-1">Van 1 on the way from Sudavad</p>
              </div>

              <div class="saas-card p-5">
                <span class="text-xs font-semibold text-[#64748B]">Godown Cotton</span>
                <div class="text-3xl font-extrabold text-[#0B6623] mt-2">80 <span class="text-xs font-normal text-[#64748B]">Qtl</span></div>
                <p class="text-xs text-[#64748B] mt-1">Current verified storage</p>
              </div>

              <div class="saas-card p-5 border-amber-200 bg-amber-50/20">
                <span class="text-xs font-semibold text-amber-800">Pending Amount</span>
                <div class="text-3xl font-extrabold text-amber-900 mt-2">₹ 1,43,000</div>
                <p class="text-xs text-[#64748B] mt-1">Awaiting batch gate delivery</p>
              </div>
            </div>

            <!-- Pipeline: Pickup -> On the way -> At unit -->
            <div class="saas-card p-5">
              <h4 class="text-xs font-bold text-[#0F172A] mb-4">Sourcing Pipeline Status</h4>
              <div class="flex items-center justify-between text-xs font-bold text-center">
                <div class="flex-1">
                  <div class="w-8 h-8 mx-auto rounded-full bg-emerald-600 text-white flex items-center justify-center mb-1">
                    <i data-lucide="check" class="w-4 h-4"></i>
                  </div>
                  <span class="text-emerald-800">Pickup</span>
                  <div class="text-[10px] text-[#64748B] font-normal">Sudavad Farm</div>
                </div>
                <div class="w-16 h-0.5 bg-emerald-600"></div>
                <div class="flex-1">
                  <div class="w-8 h-8 mx-auto rounded-full bg-blue-600 text-white flex items-center justify-center mb-1 animate-pulse">
                    <i data-lucide="truck" class="w-4 h-4"></i>
                  </div>
                  <span class="text-blue-800">On the way</span>
                  <div class="text-[10px] text-[#64748B] font-normal">SH-104 Near Bagasara</div>
                </div>
                <div class="w-16 h-0.5 bg-[#E5E7EB]"></div>
                <div class="flex-1">
                  <div class="w-8 h-8 mx-auto rounded-full bg-[#E5E7EB] text-[#64748B] flex items-center justify-center mb-1">
                    <i data-lucide="building" class="w-4 h-4"></i>
                  </div>
                  <span class="text-[#64748B]">At unit</span>
                  <div class="text-[10px] text-[#64748B] font-normal">Patel Agro Gate</div>
                </div>
              </div>

              <!-- Offer Detail -->
              <div class="mt-5 p-4 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div class="font-bold text-[#0F172A]">Direct Farm Sourcing Contract</div>
                  <div class="text-[11px] text-[#64748B]">Farmer Jayesh Patel • 20 Quintals Cotton @ ₹ 7,150/quintal</div>
                </div>
                <span class="font-extrabold text-[#0B6623] text-sm">Contract Value: ₹ 1,43,000</span>
              </div>
            </div>
          </div>
`;

const accessJs = `
    // Access Module Controllers
    function saveRoleMatrix() {
      showToast('Permissions role matrix saved successfully across all 8 roles', 'success');
    }

    function resetRoleMatrix() {
      showToast('Permissions role matrix reset to system defaults', 'info');
    }
`;

module.exports = { accessHtml, accessJs };
