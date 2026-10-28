// builder_support_full.js
// Exports supportHtml, supportJs
// 100% English only. Zero Gujarati characters. Modern 2026 SaaS design.

const supportHtml = `
          <!-- =============================================================
               VIEW: HELP AND SUPPORT (Agri-Support & Ticketing Desk)
               ============================================================= -->
          <div id="view-help-support" class="hidden space-y-6 view-section">
            
            <!-- Header Strip -->
            <div class="saas-card p-6 bg-gradient-to-r from-emerald-50/80 via-white to-blue-50/60 border border-emerald-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <span class="w-2 h-2 rounded-full bg-[#0B6623] animate-pulse"></span>
                  24/7 Farmer Agronomy Helpline & Support Desk
                </div>
                <h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">Help and support</h2>
                <p class="text-xs text-[#64748B] mt-0.5 font-medium">
                  Log farmer technical tickets, resolve field disputes, escalate complex phytopathology queries, and manage omnichannel support SLA.
                </p>
              </div>
              <div class="flex flex-wrap items-center gap-2.5">
                <button onclick="openLogTicketModal()" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="plus" class="w-4 h-4"></i>
                  <span>Log New Ticket</span>
                </button>
                <button onclick="exportSupportTickets()" class="h-9 px-3.5 bg-white hover:bg-[#F8FAFC] text-[#334155] border border-[#E5E7EB] text-xs font-bold rounded-xl shadow-2xs transition flex items-center gap-1.5">
                  <i data-lucide="download" class="w-4 h-4 text-[#64748B]"></i>
                  <span>Export Tickets</span>
                </button>
              </div>
            </div>

            <!-- KPI Cards -->
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div class="saas-card p-5 border-l-4 border-l-rose-500">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Open Tickets</span>
                  <span class="w-8 h-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                    <i data-lucide="alert-circle" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2" id="kpiOpenTickets">14 Open</div>
                <div class="text-[11px] text-rose-600 font-bold mt-1">4 critical priority</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-blue-600">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Avg Resolution Time</span>
                  <span class="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <i data-lucide="clock" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">2.4 Hours</div>
                <div class="text-[11px] text-blue-700 font-bold mt-1">Within target SLA (< 4h)</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-[#0B6623]">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">First-Contact Fix</span>
                  <span class="w-8 h-8 rounded-xl bg-emerald-50 text-[#0B6623] flex items-center justify-center">
                    <i data-lucide="check-check" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">86.4%</div>
                <div class="text-[11px] text-emerald-700 font-bold mt-1">Direct phone & chat resolution</div>
              </div>

              <div class="saas-card p-5 border-l-4 border-l-purple-600">
                <div class="flex items-center justify-between">
                  <span class="text-xs font-bold text-[#64748B]">Farmer CSAT Rating</span>
                  <span class="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <i data-lucide="star" class="w-4 h-4"></i>
                  </span>
                </div>
                <div class="text-2xl font-black text-[#0F172A] mt-2">4.9 / 5.0</div>
                <div class="text-[11px] text-purple-700 font-bold mt-1">Based on 640 feedback surveys</div>
              </div>
            </div>

            <!-- Main Support Desk Panel -->
            <div class="saas-card p-6 space-y-4">
              <!-- Pipeline Status Filter Chips & Search -->
              <div class="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-4 border-b border-[#E5E7EB]">
                <div class="flex flex-wrap items-center gap-2">
                  <div class="relative">
                    <i data-lucide="search" class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#94A3B8]"></i>
                    <input id="supportSearchInput" oninput="filterSupportTable()" type="text" placeholder="Search ticket #, farmer, or topic..." class="h-9 pl-9 pr-3 text-xs bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-medium outline-none focus:border-[#0B6623] w-64 transition">
                  </div>

                  <select id="supportStatusFilter" onchange="filterSupportTable()" class="h-9 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#334155] outline-none focus:border-[#0B6623]">
                    <option value="ALL">All Statuses</option>
                    <option value="New">New / Unassigned</option>
                    <option value="Triaged">Triaged</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Escalated">Escalated to Agronomist</option>
                    <option value="Resolved">Resolved</option>
                    <option value="Closed">Closed</option>
                  </select>

                  <select id="supportPriorityFilter" onchange="filterSupportTable()" class="h-9 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl text-xs font-semibold text-[#334155] outline-none focus:border-[#0B6623]">
                    <option value="ALL">All Priorities</option>
                    <option value="Critical">Critical Urgent</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div class="text-xs font-bold text-[#64748B]" id="supportCountDisplay">
                  Showing 6 Support Tickets
                </div>
              </div>

              <!-- Tickets Table -->
              <div class="overflow-x-auto">
                <table class="w-full text-left text-xs">
                  <thead class="bg-[#F8FAFC] text-[#64748B] font-bold border-y border-[#E5E7EB]">
                    <tr>
                      <th class="py-3 px-4">Ticket ID & Subject</th>
                      <th class="py-3 px-4">Farmer / User</th>
                      <th class="py-3 px-4">Category</th>
                      <th class="py-3 px-4">Priority</th>
                      <th class="py-3 px-4">Current Step / Status</th>
                      <th class="py-3 px-4">Assigned Desk</th>
                      <th class="py-3 px-4">Logged Time</th>
                      <th class="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody id="supportTableBody" class="divide-y divide-[#E5E7EB] font-medium text-[#0F172A]">
                    <!-- Rendered by renderSupportTable() -->
                  </tbody>
                </table>
              </div>
            </div>

            <!-- MODAL: LOG NEW TICKET -->
            <div id="logTicketModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E7EB]">
                <div class="p-6 border-b border-[#E5E7EB] flex items-center justify-between sticky top-0 bg-white z-10">
                  <div>
                    <h3 class="text-lg font-black text-[#0F172A]">Log New Support Ticket</h3>
                    <p class="text-xs text-[#64748B]">Create a tracked customer service or agronomy assistance case.</p>
                  </div>
                  <button type="button" onclick="closeLogTicketModal()" class="w-8 h-8 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <form onsubmit="handleSaveTicket(event)" class="p-6 space-y-4 text-xs">
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Farmer / Caller Name <span class="text-rose-500">*</span></label>
                      <input id="newTicketUser" type="text" required placeholder="e.g. Jayesh Patel" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Contact Mobile <span class="text-rose-500">*</span></label>
                      <input id="newTicketPhone" type="tel" required placeholder="+91 98250 12345" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-mono">
                    </div>
                  </div>

                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Category <span class="text-rose-500">*</span></label>
                      <select id="newTicketCategory" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                        <option value="Agronomy & Pest Alert">Agronomy & Pest Alert</option>
                        <option value="Fertilizer Order Delivery">Fertilizer Order Delivery</option>
                        <option value="Wallet Payout & DBT">Wallet Payout & DBT</option>
                        <option value="Mobile App Technical">Mobile App Technical</option>
                        <option value="Tool Rental Dispute">Tool Rental Dispute</option>
                      </select>
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Priority Level <span class="text-rose-500">*</span></label>
                      <select id="newTicketPriority" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                        <option value="Critical">Critical Urgent</option>
                        <option value="High" selected>High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block font-bold text-[#0F172A] mb-1">Subject / Summary <span class="text-rose-500">*</span></label>
                    <input id="newTicketSubject" type="text" required placeholder="e.g. Severe pink bollworm spreading in 12-acre cotton parcel" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold outline-none focus:border-[#0B6623]">
                  </div>

                  <div>
                    <label class="block font-bold text-[#0F172A] mb-1">Detailed Description <span class="text-rose-500">*</span></label>
                    <textarea id="newTicketDesc" rows="3" required placeholder="Provide full context, symptoms, affected survey numbers, or delivery invoice references..." class="w-full p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-medium outline-none focus:border-[#0B6623]"></textarea>
                  </div>

                  <div class="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                    <button type="button" onclick="closeLogTicketModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                      Cancel
                    </button>
                    <button type="submit" class="h-10 px-6 bg-[#0B6623] hover:bg-[#074818] text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                      <i data-lucide="check" class="w-4 h-4"></i> Submit Ticket
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: UPDATE TICKET -->
            <div id="updateTicketModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-[#E5E7EB] overflow-hidden">
                <div class="p-5 border-b border-[#E5E7EB] flex items-center justify-between">
                  <div>
                    <h3 class="text-base font-black text-[#0F172A]">Update Support Ticket</h3>
                    <p id="updateModalTicketId" class="text-xs text-[#0B6623] font-bold">#TCK-2026-881</p>
                  </div>
                  <button type="button" onclick="closeUpdateTicketModal()" class="w-8 h-8 rounded-xl hover:bg-[#F1F5F9] flex items-center justify-center text-[#64748B] transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <form onsubmit="handleUpdateTicket(event)" class="p-6 space-y-4 text-xs">
                  <input type="hidden" id="updateTargetTicketId">
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Status / Workflow Step</label>
                      <select id="updateTicketStatus" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold">
                        <option value="New">New / Unassigned</option>
                        <option value="Triaged">Triaged</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Escalated">Escalated to Agronomist</option>
                        <option value="Resolved">Resolved</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </div>
                    <div>
                      <label class="block font-bold text-[#0F172A] mb-1">Assigned Agent</label>
                      <select id="updateTicketAgent" class="w-full h-10 px-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-semibold">
                        <option value="Dr. Arvind Vala (Senior Agronomist)">Dr. Arvind Vala (Agronomist)</option>
                        <option value="Ramesh Joshi (Logistics Desk)">Ramesh Joshi (Logistics)</option>
                        <option value="Pooja Sharma (FinTech & DBT)">Pooja Sharma (FinTech)</option>
                        <option value="Devendra Patel (Field Agent)">Devendra Patel (Field)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label class="block font-bold text-[#0F172A] mb-1">Resolution / Internal Notes</label>
                    <textarea id="updateTicketNotes" rows="3" placeholder="Add diagnosis, recommended spray treatment, or resolution actions taken..." class="w-full p-3 bg-[#F8FAFC] border border-[#E5E7EB] rounded-xl font-medium outline-none focus:border-[#0B6623]"></textarea>
                  </div>

                  <label class="flex items-center gap-2 cursor-pointer font-semibold text-[#0F172A]">
                    <input id="updateSendSmsCheck" type="checkbox" checked class="rounded text-[#0B6623]">
                    <span>Send automated SMS update with resolution to farmer</span>
                  </label>

                  <div class="pt-3 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                    <button type="button" onclick="closeUpdateTicketModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                      Cancel
                    </button>
                    <button type="submit" class="h-10 px-6 bg-[#0B6623] hover:bg-[#074818] text-white font-bold rounded-xl shadow-xs transition flex items-center gap-1.5">
                      <i data-lucide="check" class="w-4 h-4"></i> Save Updates
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: VIEW TICKET DETAILS & STEP MOVER -->
            <div id="viewTicketModal" class="hidden fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5E7EB] overflow-hidden">
                <div class="p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-start justify-between">
                  <div>
                    <div class="flex items-center gap-2">
                      <span id="viewTicketIdBadge" class="px-2.5 py-0.5 rounded-full bg-white/20 text-white font-mono font-bold text-[10px]">#TCK-2026-881</span>
                      <span id="viewTicketPriorityBadge" class="px-2.5 py-0.5 rounded-full bg-rose-500 text-white font-bold text-[10px] uppercase">Critical</span>
                    </div>
                    <h3 id="viewTicketSubject" class="text-xl font-black mt-2">Pink Bollworm infestation in 12-acre cotton parcel</h3>
                    <p id="viewTicketUser" class="text-xs text-slate-300 mt-0.5">Jayesh Patel (+91 98250 12345) • Sudavad Village</p>
                  </div>
                  <button type="button" onclick="closeViewTicketModal()" class="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>

                <div class="p-6 space-y-5 text-xs">
                  <!-- Step Progression Workflow Bar -->
                  <div class="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E5E7EB] space-y-2.5">
                    <div class="flex items-center justify-between font-bold text-[#0F172A]">
                      <span>Resolution Lifecycle Workflow:</span>
                      <span id="workflowCurrentStep" class="font-extrabold text-[#0B6623]">Step 3: In Progress</span>
                    </div>
                    
                    <!-- 5-Step Bar -->
                    <div class="grid grid-cols-5 gap-1.5 text-center text-[10px] font-bold">
                      <div id="stepPill-New" class="py-1.5 rounded-lg bg-emerald-100 text-[#0B6623]">1. New</div>
                      <div id="stepPill-Triaged" class="py-1.5 rounded-lg bg-emerald-100 text-[#0B6623]">2. Triaged</div>
                      <div id="stepPill-InProgress" class="py-1.5 rounded-lg bg-emerald-600 text-white shadow-2xs">3. In Progress</div>
                      <div id="stepPill-Escalated" class="py-1.5 rounded-lg bg-slate-100 text-slate-500">4. Escalated</div>
                      <div id="stepPill-Resolved" class="py-1.5 rounded-lg bg-slate-100 text-slate-500">5. Resolved</div>
                    </div>

                    <!-- Step Mover Action Buttons -->
                    <div class="flex flex-wrap items-center gap-1.5 pt-2 border-t border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] font-semibold mr-1">Move To Step:</span>
                      <button onclick="moveActiveTicketStep('Triaged')" class="px-2.5 py-1 bg-white hover:bg-slate-50 border border-[#E5E7EB] rounded-lg text-[10px] font-bold text-[#334155] transition">Triaged</button>
                      <button onclick="moveActiveTicketStep('In Progress')" class="px-2.5 py-1 bg-white hover:bg-slate-50 border border-[#E5E7EB] rounded-lg text-[10px] font-bold text-[#334155] transition">In Progress</button>
                      <button onclick="moveActiveTicketStep('Escalated')" class="px-2.5 py-1 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg text-[10px] font-bold text-amber-800 transition">Escalate</button>
                      <button onclick="moveActiveTicketStep('Resolved')" class="px-2.5 py-1 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg text-[10px] font-bold text-[#0B6623] transition">Mark Resolved</button>
                    </div>
                  </div>

                  <!-- Details Grid -->
                  <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Category</span>
                      <span id="viewTicketCat" class="font-bold text-[#0F172A]">Agronomy & Pest</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Assigned Desk</span>
                      <span id="viewTicketAgent" class="font-bold text-[#0F172A]">Dr. Arvind Vala</span>
                    </div>
                    <div class="p-3 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB]">
                      <span class="text-[10px] text-[#64748B] block">Logged Timestamp</span>
                      <span id="viewTicketTime" class="font-bold text-[#0F172A]">26 Oct 14:15</span>
                    </div>
                  </div>

                  <div>
                    <h4 class="font-bold text-[#0F172A] mb-1">Issue Description & Agronomic Findings</h4>
                    <p id="viewTicketDesc" class="p-3.5 bg-[#F8FAFC] rounded-xl border border-[#E5E7EB] text-[#64748B] leading-relaxed">
                      Farmer observed rosette flowers and larval bore holes on developing squares across 12 acres. Pheromone trap catch exceeded 8 moths per night. Field technician dispatched with Emamectin Benzoate 5% SG dosage recommendations.
                    </p>
                  </div>

                  <div class="pt-3 border-t border-[#E5E7EB] flex items-center justify-between">
                    <button id="viewTicketResolveActionBtn" type="button" class="h-10 px-6 bg-[#0B6623] hover:bg-[#074818] text-white font-bold rounded-xl transition flex items-center gap-1.5">
                      <i data-lucide="check-circle-2" class="w-4 h-4"></i> Complete & Resolve Ticket
                    </button>
                    <button type="button" onclick="closeViewTicketModal()" class="h-10 px-5 rounded-xl border border-[#E5E7EB] font-bold text-[#64748B] hover:bg-[#F8FAFC] transition">
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
`;

const supportJs = `
// ============================================================================
// HELP AND SUPPORT CONTROLLER (Ticketing, Resolution & Workflow Steps)
// ============================================================================

let TICKETS_DATA_STORE = [
  {
    id: "TCK-881",
    user: "Jayesh Patel",
    phone: "+91 98250 12345",
    category: "Agronomy & Pest Alert",
    priority: "Critical",
    subject: "Pink bollworm infestation in 12-acre cotton parcel",
    desc: "Farmer observed rosette flowers and larval bore holes on developing squares across 12 acres. Pheromone trap catch exceeded 8 moths per night.",
    status: "In Progress",
    step: "In Progress",
    agent: "Dr. Arvind Vala (Senior Agronomist)",
    time: "26 Oct 14:15"
  },
  {
    id: "TCK-882",
    user: "Kishorebhai Vaghani",
    phone: "+91 98251 77102",
    category: "Fertilizer Order Delivery",
    priority: "High",
    subject: "Delayed delivery of 40 bags NPK 12:32:16",
    desc: "Delivery truck stuck near Bagasara check post. Sowing scheduled for tomorrow morning. Urgent dispatch needed.",
    status: "Triaged",
    step: "Triaged",
    agent: "Ramesh Joshi (Logistics Desk)",
    time: "26 Oct 13:40"
  },
  {
    id: "TCK-883",
    user: "Arvindbhai Vala",
    phone: "+91 98252 88412",
    category: "Wallet Payout & DBT",
    priority: "Medium",
    subject: "Aadhaar bank account verification pending for subsidy",
    desc: "Direct Benefit Transfer payout of INR 4,200 held due to mismatch in bank branch IFSC code update.",
    status: "In Progress",
    step: "In Progress",
    agent: "Pooja Sharma (FinTech & DBT)",
    time: "26 Oct 11:20"
  },
  {
    id: "TCK-884",
    user: "Mansukhbhai Patel",
    phone: "+91 98253 99401",
    category: "Agronomy & Pest Alert",
    priority: "Critical",
    subject: "Groundnut collar rot causing severe seedling wilt",
    desc: "Wilting observed across 8 acres after unseasonal rainfall. Fungal white mycelium visible at ground level.",
    status: "Escalated",
    step: "Escalated",
    agent: "Dr. Arvind Vala (Senior Agronomist)",
    time: "26 Oct 09:50"
  },
  {
    id: "TCK-885",
    user: "Bhavesh Radadiya",
    phone: "+91 98254 33012",
    category: "Tool Rental Dispute",
    priority: "Low",
    subject: "Security deposit refund confirmation for laser leveler",
    desc: "Equipment returned in good condition. Awaiting wallet refund release of INR 5,000 security deposit.",
    status: "Resolved",
    step: "Resolved",
    agent: "Ramesh Joshi (Logistics Desk)",
    time: "25 Oct 17:30"
  },
  {
    id: "TCK-886",
    user: "Dineshbhai Patel",
    phone: "+91 98255 22108",
    category: "Mobile App Technical",
    priority: "Medium",
    subject: "Offline sync not syncing photo upload on 2G network",
    desc: "Crop Doctor leaf image upload timeout when roaming in interior rural farm areas.",
    status: "New",
    step: "New",
    agent: "Devendra Patel (Field Agent)",
    time: "26 Oct 14:45"
  }
];

function renderSupportTable() {
  const tbody = document.getElementById("supportTableBody");
  if (!tbody) return;

  const search = document.getElementById("supportSearchInput")?.value.toLowerCase().trim() || "";
  const st = document.getElementById("supportStatusFilter")?.value || "ALL";
  const pr = document.getElementById("supportPriorityFilter")?.value || "ALL";

  const filtered = TICKETS_DATA_STORE.filter(item => {
    const matchSearch = item.id.toLowerCase().includes(search) || item.user.toLowerCase().includes(search) || item.subject.toLowerCase().includes(search);
    const matchStatus = (st === "ALL") || (item.status === st);
    const matchPriority = (pr === "ALL") || (item.priority === pr);
    return matchSearch && matchStatus && matchPriority;
  });

  const countDisplay = document.getElementById("supportCountDisplay");
  if (countDisplay) {
    countDisplay.textContent = \`Showing \${filtered.length} of \${TICKETS_DATA_STORE.length} Support Tickets\`;
  }

  if (filtered.length === 0) {
    tbody.innerHTML = '<tr><td colspan="8" class="py-8 text-center text-xs text-[#64748B]">No tickets found matching filters.</td></tr>';
    return;
  }

  tbody.innerHTML = filtered.map(item => {
    return \`
      <tr class="hover:bg-[#F8FAFC] transition">
        <td class="py-3 px-4">
          <div class="font-bold text-[#0F172A]">\${item.subject}</div>
          <div class="font-mono text-[10px] text-[#0B6623] font-bold mt-0.5">#\${item.id}</div>
        </td>
        <td class="py-3 px-4">
          <div class="font-bold text-[#0F172A]">\${item.user}</div>
          <div class="font-mono text-[10px] text-[#64748B]">\${item.phone}</div>
        </td>
        <td class="py-3 px-4 text-[#334155]">
          \${item.category}
        </td>
        <td class="py-3 px-4">
          <span class="px-2 py-0.5 rounded-md text-[10px] font-bold \${getTicketPriorityClass(item.priority)}">\${item.priority}</span>
        </td>
        <td class="py-3 px-4">
          <span class="px-2.5 py-1 rounded-full text-[10px] font-bold \${getTicketStatusClass(item.status)}">\${item.status}</span>
        </td>
        <td class="py-3 px-4 text-[10px] text-[#64748B]">
          \${item.agent}
        </td>
        <td class="py-3 px-4 text-[10px] text-[#64748B]">
          \${item.time}
        </td>
        <td class="py-3 px-4 text-right">
          <div class="flex items-center justify-end gap-1.5">
            <button onclick="openViewTicketModal('\${item.id}')" class="h-7 px-2.5 bg-slate-800 hover:bg-[#0F172A] text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1" title="View & Steps">
              <i data-lucide="eye" class="w-3 h-3"></i> View
            </button>
            \${item.status !== 'Resolved' ? \`<button onclick="resolveTicket('\${item.id}')" class="h-7 px-2 bg-emerald-700 hover:bg-[#0B6623] text-white rounded-lg text-[10px] font-bold transition flex items-center gap-1" title="Resolve">
              <i data-lucide="check" class="w-3 h-3"></i>
            </button>\` : ''}
            <button onclick="openUpdateTicketModal('\${item.id}')" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#64748B] flex items-center justify-center transition" title="Update">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
            </button>
            <button onclick="deleteTicket('\${item.id}')" class="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-50 hover:text-rose-600 text-[#64748B] flex items-center justify-center transition" title="Delete">
              <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>
    \`;
  }).join("");

  if (window.lucide) lucide.createIcons();
}

function getTicketPriorityClass(pr) {
  if (pr === "Critical") return "bg-rose-100 text-rose-800 font-black";
  if (pr === "High") return "bg-amber-100 text-amber-800";
  if (pr === "Medium") return "bg-blue-100 text-blue-800";
  return "bg-slate-100 text-slate-700";
}

function getTicketStatusClass(st) {
  if (st === "Resolved" || st === "Closed") return "bg-emerald-100 text-[#0B6623]";
  if (st === "In Progress") return "bg-blue-100 text-blue-800";
  if (st === "Escalated") return "bg-purple-100 text-purple-800";
  if (st === "Triaged") return "bg-amber-100 text-amber-800";
  return "bg-slate-200 text-slate-700";
}

function filterSupportTable() {
  renderSupportTable();
}

function openLogTicketModal() {
  const m = document.getElementById("logTicketModal");
  if (m) m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeLogTicketModal() {
  const m = document.getElementById("logTicketModal");
  if (m) m.classList.add("hidden");
}

function handleSaveTicket(e) {
  if (e) e.preventDefault();
  const user = document.getElementById("newTicketUser")?.value;
  const phone = document.getElementById("newTicketPhone")?.value;
  const category = document.getElementById("newTicketCategory")?.value;
  const priority = document.getElementById("newTicketPriority")?.value;
  const subject = document.getElementById("newTicketSubject")?.value;
  const desc = document.getElementById("newTicketDesc")?.value;

  const newId = "TCK-" + (880 + TICKETS_DATA_STORE.length + 1);
  TICKETS_DATA_STORE.unshift({
    id: newId,
    user,
    phone,
    category,
    priority,
    subject,
    desc,
    status: "New",
    step: "New",
    agent: "Pending Triage",
    time: "Just Now"
  });

  closeLogTicketModal();
  renderSupportTable();
  if (typeof showToast === "function") showToast(\`Ticket #\${newId} logged and routed to support queue.\`, "success");
}

function resolveTicket(id) {
  const item = TICKETS_DATA_STORE.find(t => t.id === id);
  if (!item) return;
  item.status = "Resolved";
  item.step = "Resolved";
  renderSupportTable();
  if (typeof showToast === "function") showToast(\`Ticket #\${item.id} marked as Resolved.\`, "success");
}

function deleteTicket(id) {
  const idx = TICKETS_DATA_STORE.findIndex(t => t.id === id);
  if (idx === -1) return;
  const item = TICKETS_DATA_STORE[idx];
  TICKETS_DATA_STORE.splice(idx, 1);
  renderSupportTable();
  if (typeof showToast === "function") showToast(\`Deleted ticket #\${item.id}.\`, "info");
}

let activeViewingTicket = null;

function openViewTicketModal(id) {
  const item = TICKETS_DATA_STORE.find(t => t.id === id);
  if (!item) return;
  activeViewingTicket = item;

  const m = document.getElementById("viewTicketModal");
  if (!m) return;

  document.getElementById("viewTicketIdBadge").textContent = "#" + item.id;
  document.getElementById("viewTicketPriorityBadge").textContent = item.priority;
  document.getElementById("viewTicketSubject").textContent = item.subject;
  document.getElementById("viewTicketUser").textContent = \`\${item.user} (\${item.phone})\`;
  document.getElementById("viewTicketCat").textContent = item.category;
  document.getElementById("viewTicketAgent").textContent = item.agent;
  document.getElementById("viewTicketTime").textContent = item.time;
  document.getElementById("viewTicketDesc").textContent = item.desc;

  updateWorkflowStepsVisual(item.step);

  const resolveBtn = document.getElementById("viewTicketResolveActionBtn");
  if (resolveBtn) {
    if (item.status === "Resolved") {
      resolveBtn.classList.add("hidden");
    } else {
      resolveBtn.classList.remove("hidden");
      resolveBtn.onclick = () => {
        resolveTicket(item.id);
        closeViewTicketModal();
      };
    }
  }

  m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeViewTicketModal() {
  const m = document.getElementById("viewTicketModal");
  if (m) m.classList.add("hidden");
}

function updateWorkflowStepsVisual(step) {
  const steps = ["New", "Triaged", "InProgress", "Escalated", "Resolved"];
  const stepMap = {
    "New": "New",
    "Triaged": "Triaged",
    "In Progress": "InProgress",
    "Escalated": "Escalated",
    "Resolved": "Resolved",
    "Closed": "Resolved"
  };

  const current = stepMap[step] || "New";
  document.getElementById("workflowCurrentStep").textContent = "Step: " + step;

  steps.forEach(s => {
    const el = document.getElementById("stepPill-" + s);
    if (!el) return;
    if (s === current) {
      el.className = "py-1.5 rounded-lg bg-emerald-600 text-white font-extrabold shadow-2xs";
    } else {
      el.className = "py-1.5 rounded-lg bg-slate-100 text-slate-500";
    }
  });
}

function moveActiveTicketStep(newStep) {
  if (!activeViewingTicket) return;
  activeViewingTicket.step = newStep;
  activeViewingTicket.status = newStep;
  updateWorkflowStepsVisual(newStep);
  renderSupportTable();
  if (typeof showToast === "function") showToast(\`Ticket #\${activeViewingTicket.id} moved to \${newStep}.\`, "success");
}

function openUpdateTicketModal(id) {
  const item = TICKETS_DATA_STORE.find(t => t.id === id);
  if (!item) return;

  const m = document.getElementById("updateTicketModal");
  if (!m) return;

  document.getElementById("updateTargetTicketId").value = item.id;
  document.getElementById("updateModalTicketId").textContent = "#" + item.id;
  document.getElementById("updateTicketStatus").value = item.status;
  document.getElementById("updateTicketAgent").value = item.agent;

  m.classList.remove("hidden");
  if (window.lucide) lucide.createIcons();
}

function closeUpdateTicketModal() {
  const m = document.getElementById("updateTicketModal");
  if (m) m.classList.add("hidden");
}

function handleUpdateTicket(e) {
  if (e) e.preventDefault();
  const id = document.getElementById("updateTargetTicketId")?.value;
  const item = TICKETS_DATA_STORE.find(t => t.id === id);
  if (!item) return;

  item.status = document.getElementById("updateTicketStatus")?.value;
  item.step = item.status;
  item.agent = document.getElementById("updateTicketAgent")?.value;

  closeUpdateTicketModal();
  renderSupportTable();
  if (typeof showToast === "function") showToast(\`Ticket #\${id} successfully updated.\`, "success");
}

function exportSupportTickets() {
  if (typeof showToast === "function") showToast("Exported support tickets ledger to CSV.", "success");
}

// Auto render on ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderSupportTable);
} else {
  renderSupportTable();
}
`;

module.exports = {
  supportHtml,
  supportJs
};
