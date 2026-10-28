// modules/support.js
// Support Module: A49 Help and support

const supportHtml = `
          <!-- -------------------------------------------------------------
               VIEW: HELP AND SUPPORT (A49)
               ------------------------------------------------------------- -->
          <div id="view-help-support" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#E5E7EB]">
              <!-- Hours Card -->
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B6623] flex items-center justify-center">
                  <i data-lucide="headphones" class="w-5 h-5"></i>
                </div>
                <div>
                  <div class="font-bold text-xs text-[#0F172A]">Call desk 9 am to 6 pm</div>
                  <div class="text-[11px] text-[#64748B]">Toll-Free Helpline: +91 98251 44320 • Gujarati & English</div>
                </div>
              </div>
              <button onclick="openLogTicketModal()" class="px-4 py-2 rounded-xl bg-[#0B6623] hover:bg-[#09521C] text-xs font-bold text-white shadow-sm flex items-center gap-2">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Log ticket</span>
              </button>
            </div>

            <!-- KPIs: Open 14, Closed today 9 -->
            <div class="grid grid-cols-1 md:grid-cols-4 gap-5">
              <div class="saas-card p-5 border-amber-200 bg-amber-50/20">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-amber-800">Open Tickets</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-200 text-amber-900">Active queue</span>
                </div>
                <div class="text-3xl font-extrabold text-amber-900 mt-2">14</div>
                <p class="text-xs text-[#64748B] mt-1">Requiring agronomist or logistics triage</p>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Closed today</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">Resolved</span>
                </div>
                <div class="text-3xl font-extrabold text-[#0B6623] mt-2">9</div>
                <p class="text-xs text-[#64748B] mt-1">Average resolution time: 1.4 hours</p>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">First Response Time</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-700">Fast</span>
                </div>
                <div class="text-3xl font-extrabold text-[#0F172A] mt-2">12m</div>
                <p class="text-xs text-[#64748B] mt-1">Via mobile inbound call & WhatsApp</p>
              </div>

              <div class="saas-card p-5">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-semibold text-[#64748B]">Farmer CSAT</span>
                  <span class="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700">98.4%</span>
                </div>
                <div class="text-3xl font-extrabold text-[#0B6623] mt-2">4.9 / 5</div>
                <p class="text-xs text-[#64748B] mt-1">Based on 142 post-call feedback ratings</p>
              </div>
            </div>

            <!-- Tickets Table -->
            <div class="saas-card overflow-hidden">
              <div class="p-4 border-b border-[#E5E7EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#F8FAFC]">
                <div class="relative w-full sm:w-72">
                  <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>
                  <input type="text" id="supportSearchInput" onkeyup="filterSupportTable()" placeholder="Search farmer, topic, or place..." class="w-full pl-9 pr-3 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs focus:outline-none focus:border-[#0B6623]">
                </div>
                <div class="flex items-center gap-2">
                  <select id="supportStatusFilter" onchange="filterSupportTable()" class="px-3 py-1.5 bg-white border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#0F172A] focus:outline-none focus:border-[#0B6623]">
                    <option value="all">All Status</option>
                    <option value="Open">Open</option>
                    <option value="Pending">Pending</option>
                    <option value="Closed">Closed</option>
                  </select>
                </div>
              </div>

              <div class="overflow-x-auto">
                <table class="w-full text-left border-collapse saas-table" id="supportTable">
                  <thead>
                    <tr class="border-b border-[#E5E7EB] bg-[#F8FAFC] text-[11px] font-bold text-[#64748B] uppercase tracking-wider">
                      <th class="px-5 py-3">Farmer / User</th>
                      <th class="px-5 py-3">Place</th>
                      <th class="px-5 py-3">Topic</th>
                      <th class="px-5 py-3">Channel</th>
                      <th class="px-5 py-3">Status</th>
                      <th class="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-[#E5E7EB] text-xs font-medium text-[#0F172A]">
                    <tr class="hover:bg-amber-50/20 transition-colors" data-status="Open">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Jayesh Patel</div>
                        <div class="text-[11px] text-[#64748B]">Ticket #TK-1082 • 45m ago</div>
                      </td>
                      <td class="px-5 py-3.5 font-semibold text-[#475569]">Sudavad</td>
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Order problem</td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700">
                          <i data-lucide="phone-call" class="w-3 h-3"></i> Call
                        </span>
                      </td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span> Open
                        </span>
                      </td>
                      <td class="px-5 py-3.5 text-right">
                        <button onclick="resolveTicket('TK-1082', 'Jayesh Patel')" class="px-3 py-1 rounded-lg bg-[#0B6623] hover:bg-[#09521C] text-[11px] font-bold text-white shadow-sm">Resolve</button>
                      </td>
                    </tr>
                    <tr class="hover:bg-amber-50/20 transition-colors" data-status="Pending">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Jayesh Patel</div>
                        <div class="text-[11px] text-[#64748B]">Ticket #TK-1081 • 2h ago</div>
                      </td>
                      <td class="px-5 py-3.5 font-semibold text-[#475569]">Sudavad</td>
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Cancel rental</td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-purple-50 text-purple-700">
                          <i data-lucide="smartphone" class="w-3 h-3"></i> App
                        </span>
                      </td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 border border-amber-200">
                          <span class="w-1.5 h-1.5 rounded-full bg-amber-500"></span> Pending
                        </span>
                      </td>
                      <td class="px-5 py-3.5 text-right">
                        <button onclick="resolveTicket('TK-1081', 'Jayesh Patel')" class="px-3 py-1 rounded-lg border border-[#E5E7EB] hover:bg-slate-50 text-[11px] font-bold text-[#475569]">Update</button>
                      </td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors" data-status="Closed">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Jayesh Patel</div>
                        <div class="text-[11px] text-[#64748B]">Ticket #TK-1080 • 1 day ago</div>
                      </td>
                      <td class="px-5 py-3.5 font-semibold text-[#475569]">Sudavad</td>
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Sell request</td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-blue-50 text-blue-700">
                          <i data-lucide="phone-call" class="w-3 h-3"></i> Call
                        </span>
                      </td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Closed
                        </span>
                      </td>
                      <td class="px-5 py-3.5 text-right">
                        <span class="text-[11px] text-[#64748B]">Resolved by Kiran</span>
                      </td>
                    </tr>
                    <tr class="hover:bg-[#F8FAFC] transition-colors" data-status="Closed">
                      <td class="px-5 py-3.5">
                        <div class="font-bold text-[#0F172A]">Rambhai Ahir</div>
                        <div class="text-[11px] text-[#64748B]">Ticket #TK-1078 • 2 days ago</div>
                      </td>
                      <td class="px-5 py-3.5 font-semibold text-[#475569]">Sudavad</td>
                      <td class="px-5 py-3.5 font-bold text-[#0F172A]">Soil test report card</td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700">
                          <i data-lucide="message-square" class="w-3 h-3"></i> WhatsApp
                        </span>
                      </td>
                      <td class="px-5 py-3.5">
                        <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800">
                          <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Closed
                        </span>
                      </td>
                      <td class="px-5 py-3.5 text-right">
                        <span class="text-[11px] text-[#64748B]">Resolved by Dr. Trivedi</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
`;

const supportJs = `
    // Support Module Controllers
    function filterSupportTable() {
      const q = (document.getElementById('supportSearchInput')?.value || '').toLowerCase();
      const status = document.getElementById('supportStatusFilter')?.value || 'all';
      const rows = document.querySelectorAll('#supportTable tbody tr');
      rows.forEach(r => {
        const text = r.textContent.toLowerCase();
        const rStatus = r.getAttribute('data-status');
        const mQ = !q || text.includes(q);
        const mStatus = status === 'all' || rStatus === status;
        r.style.display = (mQ && mStatus) ? '' : 'none';
      });
    }

    function openLogTicketModal() {
      showToast('Opening Support Ticket Intake Form...', 'info');
    }

    function resolveTicket(ticketId, farmer) {
      showToast('Ticket #' + ticketId + ' for ' + farmer + ' marked as Resolved & Closed', 'success');
    }
`;

module.exports = { supportHtml, supportJs };
