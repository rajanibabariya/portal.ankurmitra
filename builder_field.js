// builder_field.js
// Complete 2026 SaaS redesign for all Field Module pages with full details:
// - AI Mitra: Redesigned page & View chat modal
// - Crop Doctor: Redesigned page & View scan modal
// - Soil Doctor: Redesigned page & View report modal
// - Crop Guide: Redesigned page + Add, Delete, View Crop modal
// - Seed Guide: Redesigned page + Add, Delete, View Seed modal
// - Compost & Organic: Redesigned page + Add, Delete, View Compost modal
// - Farm Manager: Redesigned page + Add, Delete, View Farm modal
// - Weather: Redesigned page with Gujarat Taluka selector & agro advisories
// - Scheme Applications: Redesigned page + Add, Delete, View Scheme modal

const fieldHtml = `
          <!-- -------------------------------------------------------------
               VIEW: FIELD TOOLS HUB (Original Hub retained and refined)
               ------------------------------------------------------------- -->
          <div id="view-field-tools" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <i data-lucide="sprout" class="w-4 h-4"></i>
                  <span>Field Operations & Agronomy Suite</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Field Intelligence Tools</h2>
                <p class="text-xs text-[#64748B]">Complete digital toolkit for farm advisors, agronomists, and growers.</p>
              </div>
              <div class="flex items-center gap-2">
                <span class="px-3 py-1.5 rounded-full bg-emerald-50 text-[#0B6623] text-xs font-bold border border-emerald-200">10 Active Field Tools</span>
              </div>
            </div>

            <!-- Grid of 10 Field Tools -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div onclick="navigateTo('ai-mitra')" class="saas-card p-5 cursor-pointer hover:border-[#0B6623] hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center mb-3">
                  <i data-lucide="message-circle" class="w-5 h-5"></i>
                </div>
                <h3 class="font-extrabold text-[#0F172A] text-sm">AI Mitra</h3>
                <p class="text-xs text-[#64748B] mt-1">Real-time vernacular conversational agronomy copilot.</p>
              </div>

              <div onclick="navigateTo('crop-doctor')" class="saas-card p-5 cursor-pointer hover:border-[#0B6623] hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center mb-3">
                  <i data-lucide="leaf" class="w-5 h-5"></i>
                </div>
                <h3 class="font-extrabold text-[#0F172A] text-sm">Crop Doctor</h3>
                <p class="text-xs text-[#64748B] mt-1">Computer vision foliar diagnostic scanner with instant remedy.</p>
              </div>

              <div onclick="navigateTo('soil-doctor')" class="saas-card p-5 cursor-pointer hover:border-[#0B6623] hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                  <i data-lucide="droplets" class="w-5 h-5"></i>
                </div>
                <h3 class="font-extrabold text-[#0F172A] text-sm">Soil Doctor</h3>
                <p class="text-xs text-[#64748B] mt-1">12-parameter soil health card assays & fertilizer dosing.</p>
              </div>

              <div onclick="navigateTo('crop-guide')" class="saas-card p-5 cursor-pointer hover:border-[#0B6623] hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-emerald-100 text-[#0B6623] flex items-center justify-center mb-3">
                  <i data-lucide="book-open" class="w-5 h-5"></i>
                </div>
                <h3 class="font-extrabold text-[#0F172A] text-sm">Crop Guide</h3>
                <p class="text-xs text-[#64748B] mt-1">Stage-by-stage package of practices for Saurashtra crops.</p>
              </div>

              <div onclick="navigateTo('seed-guide')" class="saas-card p-5 cursor-pointer hover:border-[#0B6623] hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-lime-100 text-lime-800 flex items-center justify-center mb-3">
                  <i data-lucide="circle-dot" class="w-5 h-5"></i>
                </div>
                <h3 class="font-extrabold text-[#0F172A] text-sm">Seed Guide</h3>
                <p class="text-xs text-[#64748B] mt-1">Certified variety catalog, seed rates, and germination guides.</p>
              </div>

              <div onclick="navigateTo('compost')" class="saas-card p-5 cursor-pointer hover:border-[#0B6623] hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 flex items-center justify-center mb-3">
                  <i data-lucide="recycle" class="w-5 h-5"></i>
                </div>
                <h3 class="font-extrabold text-[#0F172A] text-sm">Compost & Organic</h3>
                <p class="text-xs text-[#64748B] mt-1">Jeevamrut, vermicompost & zero-budget natural farming protocols.</p>
              </div>

              <div onclick="navigateTo('farm-manager')" class="saas-card p-5 cursor-pointer hover:border-[#0B6623] hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                  <i data-lucide="tractor" class="w-5 h-5"></i>
                </div>
                <h3 class="font-extrabold text-[#0F172A] text-sm">Farm Manager</h3>
                <p class="text-xs text-[#64748B] mt-1">Geo-tagged parcel ledger, input costs & harvest log.</p>
              </div>

              <div onclick="navigateTo('weather')" class="saas-card p-5 cursor-pointer hover:border-[#0B6623] hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-sky-100 text-sky-800 flex items-center justify-center mb-3">
                  <i data-lucide="cloud-sun" class="w-5 h-5"></i>
                </div>
                <h3 class="font-extrabold text-[#0F172A] text-sm">Weather Station</h3>
                <p class="text-xs text-[#64748B] mt-1">Micro-climate hyper-local forecast & spray advisories.</p>
              </div>

              <div onclick="navigateTo('scheme-applications')" class="saas-card p-5 cursor-pointer hover:border-[#0B6623] hover:shadow-md transition">
                <div class="w-10 h-10 rounded-xl bg-purple-100 text-purple-800 flex items-center justify-center mb-3">
                  <i data-lucide="stamp" class="w-5 h-5"></i>
                </div>
                <h3 class="font-extrabold text-[#0F172A] text-sm">Scheme Applications</h3>
                <p class="text-xs text-[#64748B] mt-1">i-Khedut, PM-Kisan & drip irrigation DBT tracking.</p>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: AI MITRA (Redesigned Page + View Chat Modal)
               ------------------------------------------------------------- -->
          <div id="view-ai-mitra" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-teal-700">
                  <span class="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                  <span>AI Mitra Copilot · Gujarat Agronomy LLM 4.0</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">AI Mitra Advisory Desk</h2>
                <p class="text-xs text-[#64748B]">Real-time vernacular crop assistance, pest diagnosis, and mandi market predictions.</p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="openViewChatModal('session-current')" class="px-3.5 py-2 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold flex items-center gap-1.5 hover:bg-teal-100 transition">
                  <i data-lucide="history" class="w-4 h-4"></i>
                  <span>View Chat History</span>
                </button>
                <button type="button" onclick="newAiMitraChat()" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white text-xs font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-1.5 transition">
                  <i data-lucide="plus" class="w-4 h-4"></i>
                  <span>New Conversation</span>
                </button>
              </div>
            </div>

            <!-- Main Chat Workspace -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
              <!-- Left Sidebar: Recent Sessions -->
              <div class="lg:col-span-1 saas-card p-4 space-y-3">
                <div class="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Recent Consultations</div>
                <div class="space-y-1.5 text-xs">
                  <button type="button" onclick="loadChatSession('session-1')" class="w-full text-left p-2.5 rounded-xl bg-emerald-50 text-[#0B6623] font-bold border border-emerald-200 flex items-center justify-between">
                    <span class="truncate">Cotton Pink Bollworm Spray</span>
                    <i data-lucide="chevron-right" class="w-3.5 h-3.5 flex-shrink-0"></i>
                  </button>
                  <button type="button" onclick="loadChatSession('session-2')" class="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-between">
                    <span class="truncate">Groundnut Pod Rot Remedy</span>
                    <i data-lucide="chevron-right" class="w-3.5 h-3.5 flex-shrink-0 text-slate-400"></i>
                  </button>
                  <button type="button" onclick="loadChatSession('session-3')" class="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-between">
                    <span class="truncate">Jeevamrut Preparation Ratio</span>
                    <i data-lucide="chevron-right" class="w-3.5 h-3.5 flex-shrink-0 text-slate-400"></i>
                  </button>
                  <button type="button" onclick="loadChatSession('session-4')" class="w-full text-left p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold flex items-center justify-between">
                    <span class="truncate">Drip Subsidy Document List</span>
                    <i data-lucide="chevron-right" class="w-3.5 h-3.5 flex-shrink-0 text-slate-400"></i>
                  </button>
                </div>
              </div>

              <!-- Right Center: Chat Feed & Input Box -->
              <div class="lg:col-span-3 saas-card flex flex-col h-[560px] overflow-hidden">
                <!-- Chat Feed -->
                <div id="aiMitraChatFeed" class="flex-1 overflow-y-auto p-5 space-y-4 text-xs">
                  <!-- AI Welcome Message -->
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full bg-[#0B6623] text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">AM</div>
                    <div class="bg-slate-50 border border-slate-200 p-4 rounded-2xl rounded-tl-xs max-w-xl text-slate-800 space-y-2">
                      <p class="font-bold text-[#0B6623]">Namaste Jayeshbhai! I am AI Mitra, your 24x7 agronomy advisor.</p>
                      <p>I have live weather data for Sudavad (Bagasara) and current Amreli mandi bids. How can I assist your crop today?</p>
                      <!-- Quick prompt chips -->
                      <div class="pt-2 flex flex-wrap gap-1.5">
                        <button type="button" onclick="quickPromptAiMitra('What is the dosage of Emamectin Benzoate for cotton bollworm?')" class="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:border-[#0B6623] hover:text-[#0B6623] transition text-[11px]">Bollworm chemical dosage</button>
                        <button type="button" onclick="quickPromptAiMitra('Is today good for spraying in Bagasara?')" class="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:border-[#0B6623] hover:text-[#0B6623] transition text-[11px]">Spraying feasibility today</button>
                        <button type="button" onclick="quickPromptAiMitra('Groundnut price trend in Gondal Mandi')" class="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:border-[#0B6623] hover:text-[#0B6623] transition text-[11px]">Mandi price trend</button>
                      </div>
                    </div>
                  </div>

                  <!-- Farmer User Message -->
                  <div class="flex items-start justify-end gap-3">
                    <div class="bg-[#0B6623] text-white p-4 rounded-2xl rounded-tr-xs max-w-md text-xs space-y-1">
                      <p>My cotton crop is 70 days old. Pink bollworm larvae seen in few green bolls. Suggest best immediate action.</p>
                      <div class="text-[10px] text-emerald-200 text-right">Today, 10:42 AM</div>
                    </div>
                    <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">JP</div>
                  </div>

                  <!-- AI Structured Response Card -->
                  <div class="flex items-start gap-3">
                    <div class="w-8 h-8 rounded-full bg-[#0B6623] text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">AM</div>
                    <div class="bg-slate-50 border border-slate-200 p-4 rounded-2xl rounded-tl-xs max-w-xl text-slate-800 space-y-3">
                      <div class="flex items-center justify-between pb-2 border-b border-slate-200">
                        <span class="font-extrabold text-[#0B6623] flex items-center gap-1.5">
                          <i data-lucide="shield-alert" class="w-4 h-4 text-amber-600"></i>
                          <span>Critical ETL Warning: Pink Bollworm Action Protocol</span>
                        </span>
                        <span class="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Confidence: 99.1%</span>
                      </div>
                      <p>At 70 days, your crop is at peak boll development. To prevent internal lint staining and yield loss:</p>
                      <div class="p-3 bg-white border border-slate-200 rounded-xl space-y-1.5 font-medium">
                        <div class="font-bold text-[#0F172A]">1. Immediate Chemical Control:</div>
                        <p class="text-slate-600">Spray <strong>Emamectin Benzoate 5% SG</strong> @ 4 grams per 10 Litres of water (or 60-80 grams per acre).</p>
                        <div class="font-bold text-[#0F172A] mt-2">2. Pheromone Trapping:</div>
                        <p class="text-slate-600">Install <strong>5 Delta Pheromone traps/acre</strong> with Gossyplure lures to mass-trap male moths.</p>
                      </div>
                      <div class="flex items-center gap-2 pt-1">
                        <button type="button" onclick="showToast('Prescription saved to your Farm Journal', 'success')" class="px-3 py-1.5 rounded-lg bg-[#0B6623] text-white font-bold text-[11px] hover:bg-[#09521C]">Save Treatment</button>
                        <button type="button" onclick="navigateTo('crop-doctor')" class="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-bold text-[11px] hover:bg-slate-50">Upload Leaf Photo to Doctor</button>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Input Footer -->
                <div class="p-3.5 bg-white border-t border-slate-200 flex items-center gap-2">
                  <button type="button" onclick="showToast('Microphone activated. Listening in Gujarati/English...', 'info')" class="p-2 text-slate-500 hover:text-[#0B6623] hover:bg-slate-100 rounded-xl transition" title="Voice Input">
                    <i data-lucide="mic" class="w-5 h-5"></i>
                  </button>
                  <input id="aiMitraInputText" type="text" placeholder="Type your crop question or paste symptoms..." onkeydown="if(event.key==='Enter') sendAiMitraMessage()" class="flex-1 h-10 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-[#0F172A] outline-none focus:border-[#0B6623]">
                  <button type="button" onclick="sendAiMitraMessage()" class="px-4 py-2 bg-[#0B6623] text-white rounded-xl text-xs font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-1.5">
                    <span>Send</span>
                    <i data-lucide="send" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </div>
            </div>

            <!-- MODAL: VIEW CHAT TRANSCRIPT DETAILS -->
            <div id="viewChatModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-teal-100 text-teal-800 flex items-center justify-center">
                      <i data-lucide="history" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]">Consultation Transcript Record</h3>
                      <p class="text-[11px] text-slate-500">Session ID: #AIM-2026-1049 · Oct 26, 2026</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeViewChatModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="p-6 space-y-4 text-xs max-h-[75vh] overflow-y-auto">
                  <div class="bg-slate-50 p-3 rounded-xl border border-slate-200">
                    <div class="font-bold text-slate-700">Farmer: Jayesh Patel (+91 98250 12345)</div>
                    <div class="text-slate-500 text-[11px]">Location: Sudavad, Bagasara · Crop: Cotton Shankar-6</div>
                  </div>
                  <div class="space-y-2">
                    <div class="font-bold text-[#0F172A]">Complete Transcript Log:</div>
                    <div class="p-4 bg-white border border-slate-200 rounded-xl space-y-2 leading-relaxed">
                      <p><strong>[10:41 AM - User]:</strong> Pink bollworm noticed in green bolls at 70 days. What should I spray?</p>
                      <p><strong>[10:42 AM - AI Mitra]:</strong> Emamectin Benzoate 5% SG recommended @ 4g/10L. Pheromone trap installation advised at 5 traps/acre. Spray during evening hours.</p>
                      <p><strong>[10:44 AM - User]:</strong> Can I mix it with 19:19:19 fertilizer?</p>
                      <p><strong>[10:45 AM - AI Mitra]:</strong> Yes, Emamectin Benzoate is compatible with 19:19:19 water-soluble fertilizer. Avoid mixing with copper oxychloride or alkaline lime.</p>
                    </div>
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeViewChatModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Close</button>
                    <button type="button" onclick="showToast('Chat transcript exported as PDF and sent to farmer WhatsApp', 'success'); closeViewChatModal();" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-1.5">
                      <i data-lucide="share-2" class="w-3.5 h-3.5"></i>
                      <span>Export & Share</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: CROP DOCTOR (Redesigned Page + View Scan Modal)
               ------------------------------------------------------------- -->
          <div id="view-crop-doctor" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-rose-700">
                  <span class="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
                  <span>Visual Phytopathology Lab · Real-Time CV Detection</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Crop Doctor Diagnostics</h2>
                <p class="text-xs text-[#64748B]">Automated leaf lesion identification, fungal pathogen detection, and instant prescription protocols.</p>
              </div>
              <div class="flex items-center gap-2">
                <button type="button" onclick="openViewScanModal('scan-1')" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white text-xs font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-2 transition">
                  <i data-lucide="scan-line" class="w-4 h-4"></i>
                  <span>Inspect Latest Scan</span>
                </button>
              </div>
            </div>

            <!-- Interactive Diagnostic Upload Area -->
            <div class="saas-card p-6 border-2 border-dashed border-emerald-300 bg-emerald-50/20 text-center rounded-2xl">
              <div class="w-12 h-12 mx-auto rounded-full bg-emerald-100 text-[#0B6623] flex items-center justify-center mb-3">
                <i data-lucide="upload-cloud" class="w-6 h-6"></i>
              </div>
              <h3 class="font-extrabold text-[#0F172A] text-sm">Upload or Select Sample Crop Photo for AI Analysis</h3>
              <p class="text-xs text-slate-500 mt-1 max-w-md mx-auto">Click any sample below to simulate neural network scanning & instant diagnosis</p>
              
              <!-- Sample Diagnostic Images Buttons -->
              <div class="mt-4 flex flex-wrap justify-center gap-2.5">
                <button type="button" onclick="runCropScanSimulator('Pink Bollworm (Cotton)')" class="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#0B6623] text-xs font-bold text-slate-800 shadow-2xs transition">Cotton: Pink Bollworm</button>
                <button type="button" onclick="runCropScanSimulator('Tikka Leaf Spot (Groundnut)')" class="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#0B6623] text-xs font-bold text-slate-800 shadow-2xs transition">Groundnut: Tikka Spot</button>
                <button type="button" onclick="runCropScanSimulator('Yellow Rust (Wheat)')" class="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#0B6623] text-xs font-bold text-slate-800 shadow-2xs transition">Wheat: Yellow Rust</button>
                <button type="button" onclick="runCropScanSimulator('Whitefly Vector (Cotton)')" class="px-3.5 py-1.5 rounded-xl bg-white border border-slate-200 hover:border-[#0B6623] text-xs font-bold text-slate-800 shadow-2xs transition">Cotton: Whitefly</button>
              </div>

              <!-- Scanning Progress Simulator -->
              <div id="cropScanProgressBox" class="hidden mt-5 max-w-md mx-auto bg-white p-4 rounded-xl border border-slate-200 shadow-xs text-left">
                <div class="flex items-center justify-between text-xs font-bold mb-1.5">
                  <span id="scanStatusText" class="text-[#0B6623]">Analyzing foliar pattern...</span>
                  <span id="scanPercentText" class="font-mono">75%</span>
                </div>
                <div class="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div id="scanProgressBar" class="bg-[#0B6623] h-full transition-all duration-300" style="width: 75%"></div>
                </div>
              </div>
            </div>

            <!-- Recent Diagnostics Table -->
            <div class="saas-card overflow-hidden">
              <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div class="font-bold text-[#0F172A] text-xs">Recent Field Scans in Amreli District</div>
                <span class="text-xs text-slate-500 font-semibold">42 Scans Processed Today</span>
              </div>
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200 bg-[#F8FAFC] font-bold text-slate-500">
                    <th class="px-5 py-3">Scan ID</th>
                    <th class="px-5 py-3">Farmer & Location</th>
                    <th class="px-5 py-3">Crop</th>
                    <th class="px-5 py-3">Diagnosis Identified</th>
                    <th class="px-5 py-3">Confidence</th>
                    <th class="px-5 py-3">Severity</th>
                    <th class="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium">
                  <tr class="hover:bg-slate-50 transition">
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">#SCN-8841</td>
                    <td class="px-5 py-3.5">
                      <div class="font-bold text-[#0F172A]">Jayesh Patel</div>
                      <div class="text-[11px] text-slate-500">Sudavad, Bagasara</div>
                    </td>
                    <td class="px-5 py-3.5 font-bold">Cotton (Shankar-6)</td>
                    <td class="px-5 py-3.5 text-rose-700 font-bold">Pink Bollworm (Pectinophora gossypiella)</td>
                    <td class="px-5 py-3.5 font-mono font-bold text-emerald-700">98.6%</td>
                    <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 font-bold border border-rose-200 text-[10px]">Critical</span></td>
                    <td class="px-5 py-3.5 text-right">
                      <button type="button" onclick="openViewScanModal('scan-1')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] hover:bg-emerald-100 font-bold transition">View Scan</button>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition">
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">#SCN-8839</td>
                    <td class="px-5 py-3.5">
                      <div class="font-bold text-[#0F172A]">Mansukhbhai Kotadiya</div>
                      <div class="text-[11px] text-slate-500">Dhari Village</div>
                    </td>
                    <td class="px-5 py-3.5 font-bold">Groundnut (GG-20)</td>
                    <td class="px-5 py-3.5 text-amber-800 font-bold">Early Leaf Spot (Cercospora arachidicola)</td>
                    <td class="px-5 py-3.5 font-mono font-bold text-emerald-700">96.4%</td>
                    <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200 text-[10px]">Moderate</span></td>
                    <td class="px-5 py-3.5 text-right">
                      <button type="button" onclick="openViewScanModal('scan-2')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] hover:bg-emerald-100 font-bold transition">View Scan</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- MODAL: VIEW CROP SCAN DETAILS -->
            <div id="viewCropScanModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                      <i data-lucide="scan-line" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]" id="viewScanTitle">Diagnostic Inspection #SCN-8841</h3>
                      <p class="text-[11px] text-slate-500">Foliar Neural Classification & Prescription</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeViewScanModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
                  <div class="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    <div>
                      <div class="text-[10px] font-bold text-slate-400 uppercase">Diagnosed Pathogen</div>
                      <div class="font-extrabold text-[#0F172A] text-sm mt-0.5" id="viewScanPathogen">Pink Bollworm (Pectinophora gossypiella)</div>
                      <div class="text-[11px] text-slate-500 italic">Order: Lepidoptera · Family: Gelechiidae</div>
                    </div>
                    <div>
                      <div class="text-[10px] font-bold text-slate-400 uppercase">Detection Metric</div>
                      <div class="font-mono font-extrabold text-emerald-700 text-base mt-0.5">98.6% Match</div>
                      <span class="px-2 py-0.5 rounded bg-rose-50 text-rose-700 font-bold border border-rose-200 text-[10px]">Severity: Critical ETL Exceeded</span>
                    </div>
                  </div>

                  <!-- Prescription Protocols -->
                  <div class="space-y-3">
                    <div class="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-1">
                      <div class="font-bold text-[#0B6623]">Approved Chemical Prescription:</div>
                      <p class="text-slate-700">Emamectin Benzoate 5% SG @ 4g / 10L water OR Chlorantraniliprole 18.5% SC @ 3ml / 10L water. Thorough spray covering lower and upper canopy.</p>
                    </div>
                    <div class="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1">
                      <div class="font-bold text-amber-900">Organic & Cultural Intervention:</div>
                      <p class="text-slate-700">Install 5 Delta Pheromone Traps per acre. Spray Neem Oil (Azadirachtin 1500 ppm) @ 50ml per 15L pump. Collect and destroy dropped rosette flowers.</p>
                    </div>
                  </div>

                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeViewScanModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Close</button>
                    <button type="button" onclick="showToast('Prescription certificate downloaded', 'success'); closeViewScanModal();" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-1.5">
                      <i data-lucide="download" class="w-3.5 h-3.5"></i>
                      <span>Download Rx PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: SOIL DOCTOR (Redesigned Page + View Report Modal)
               ------------------------------------------------------------- -->
          <div id="view-soil-doctor" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-amber-800">
                  <span class="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
                  <span>Soil Nutrients & Chemical Assay Station</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Soil Doctor Reports</h2>
                <p class="text-xs text-[#64748B]">Official 12-parameter soil health card evaluations, alkaline pH mitigation, and macro/micro nutrient dosing.</p>
              </div>
              <button type="button" onclick="openViewSoilReportModal('shc-1')" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white text-xs font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-2 transition">
                <i data-lucide="file-text" class="w-4 h-4"></i>
                <span>View Sample Card</span>
              </button>
            </div>

            <!-- Soil KPI Summary -->
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div class="saas-card p-4">
                <div class="text-[10px] font-bold text-slate-400 uppercase">Average Soil pH</div>
                <div class="text-2xl font-black text-amber-700 mt-1">7.9 pH</div>
                <div class="text-[11px] text-amber-600 font-semibold mt-1">Moderately Alkaline</div>
              </div>
              <div class="saas-card p-4">
                <div class="text-[10px] font-bold text-slate-400 uppercase">Organic Carbon</div>
                <div class="text-2xl font-black text-rose-600 mt-1">0.42 %</div>
                <div class="text-[11px] text-rose-600 font-semibold mt-1">Deficient (&lt; 0.5%)</div>
              </div>
              <div class="saas-card p-4">
                <div class="text-[10px] font-bold text-slate-400 uppercase">Available Nitrogen</div>
                <div class="text-2xl font-black text-amber-700 mt-1">198 kg/ha</div>
                <div class="text-[11px] text-amber-600 font-semibold mt-1">Low (Needs Urea split)</div>
              </div>
              <div class="saas-card p-4">
                <div class="text-[10px] font-bold text-slate-400 uppercase">Available Potassium</div>
                <div class="text-2xl font-black text-emerald-700 mt-1">340 kg/ha</div>
                <div class="text-[11px] text-emerald-600 font-semibold mt-1">High (Sufficient)</div>
              </div>
            </div>

            <!-- Soil Test Reports Table -->
            <div class="saas-card overflow-hidden">
              <div class="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div class="font-bold text-[#0F172A] text-xs">Soil Health Cards Issued Across Talukas</div>
                <span class="text-xs text-slate-500 font-semibold">NABL Accredited Lab Partner</span>
              </div>
              <table class="w-full text-left text-xs">
                <thead>
                  <tr class="border-b border-slate-200 bg-[#F8FAFC] font-bold text-slate-500">
                    <th class="px-5 py-3">Report ID</th>
                    <th class="px-5 py-3">Farmer & Village</th>
                    <th class="px-5 py-3">Survey No</th>
                    <th class="px-5 py-3">pH / EC</th>
                    <th class="px-5 py-3">Primary Deficiency</th>
                    <th class="px-5 py-3">Advisory Status</th>
                    <th class="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium">
                  <tr class="hover:bg-slate-50 transition">
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">#SHC-2026-884</td>
                    <td class="px-5 py-3.5">
                      <div class="font-bold text-[#0F172A]">Jayesh Patel</div>
                      <div class="text-[11px] text-slate-500">Sudavad, Bagasara</div>
                    </td>
                    <td class="px-5 py-3.5 font-mono">142/2</td>
                    <td class="px-5 py-3.5 font-mono font-bold">7.8 pH / 0.38 dS/m</td>
                    <td class="px-5 py-3.5 text-rose-700 font-bold">Nitrogen & Zinc Deficient</td>
                    <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px]">Issued</span></td>
                    <td class="px-5 py-3.5 text-right">
                      <button type="button" onclick="openViewSoilReportModal('shc-1')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] hover:bg-emerald-100 font-bold transition">View Report</button>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition">
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">#SHC-2026-881</td>
                    <td class="px-5 py-3.5">
                      <div class="font-bold text-[#0F172A]">Ramesh Kotadiya</div>
                      <div class="text-[11px] text-slate-500">Dhari Hub</div>
                    </td>
                    <td class="px-5 py-3.5 font-mono">98/1</td>
                    <td class="px-5 py-3.5 font-mono font-bold">8.1 pH / 0.44 dS/m</td>
                    <td class="px-5 py-3.5 text-amber-800 font-bold">Organic Carbon & Phosphorus</td>
                    <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px]">Issued</span></td>
                    <td class="px-5 py-3.5 text-right">
                      <button type="button" onclick="openViewSoilReportModal('shc-2')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] hover:bg-emerald-100 font-bold transition">View Report</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- MODAL: VIEW SOIL HEALTH CARD REPORT -->
            <div id="viewSoilReportModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                      <i data-lucide="file-text" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]">Soil Health Card #SHC-2026-884</h3>
                      <p class="text-[11px] text-slate-500">Official Analytical Assay · Government Standards Grounding</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeViewSoilReportModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
                  <div class="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Farmer</span>
                      <div class="font-extrabold text-[#0F172A]">Jayesh Patel</div>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Survey / Parcel</span>
                      <div class="font-extrabold text-[#0F172A]">142/2 Sudavad (5.5 Acres)</div>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Date Sampled</span>
                      <div class="font-extrabold text-[#0F172A]">14 Oct 2026</div>
                    </div>
                  </div>

                  <!-- 12 Parameter Matrix Table -->
                  <div class="border border-slate-200 rounded-xl overflow-hidden">
                    <table class="w-full text-left text-xs">
                      <thead class="bg-slate-100 text-[11px] font-bold text-slate-600">
                        <tr>
                          <th class="p-2.5">Parameter</th>
                          <th class="p-2.5">Value</th>
                          <th class="p-2.5">Standard Range</th>
                          <th class="p-2.5">Rating</th>
                        </tr>
                      </thead>
                      <tbody class="divide-y divide-slate-100 font-medium">
                        <tr>
                          <td class="p-2.5 font-bold">pH (Reaction)</td>
                          <td class="p-2.5 font-mono">7.8</td>
                          <td class="p-2.5 font-mono text-slate-500">6.5 – 7.5</td>
                          <td class="p-2.5"><span class="text-amber-700 font-bold">Moderately Alkaline</span></td>
                        </tr>
                        <tr>
                          <td class="p-2.5 font-bold">EC (Electrical Conductivity)</td>
                          <td class="p-2.5 font-mono">0.38 dS/m</td>
                          <td class="p-2.5 font-mono text-slate-500">&lt; 1.0</td>
                          <td class="p-2.5"><span class="text-emerald-700 font-bold">Normal</span></td>
                        </tr>
                        <tr>
                          <td class="p-2.5 font-bold">Organic Carbon (OC)</td>
                          <td class="p-2.5 font-mono">0.42 %</td>
                          <td class="p-2.5 font-mono text-slate-500">&gt; 0.50</td>
                          <td class="p-2.5"><span class="text-rose-700 font-bold">Low / Deficient</span></td>
                        </tr>
                        <tr>
                          <td class="p-2.5 font-bold">Available Nitrogen (N)</td>
                          <td class="p-2.5 font-mono">198 kg/ha</td>
                          <td class="p-2.5 font-mono text-slate-500">280 – 560</td>
                          <td class="p-2.5"><span class="text-rose-700 font-bold">Deficient</span></td>
                        </tr>
                        <tr>
                          <td class="p-2.5 font-bold">Available Phosphorus (P)</td>
                          <td class="p-2.5 font-mono">24 kg/ha</td>
                          <td class="p-2.5 font-mono text-slate-500">20 – 50</td>
                          <td class="p-2.5"><span class="text-emerald-700 font-bold">Medium / Optimum</span></td>
                        </tr>
                        <tr>
                          <td class="p-2.5 font-bold">Available Potassium (K)</td>
                          <td class="p-2.5 font-mono">340 kg/ha</td>
                          <td class="p-2.5 font-mono text-slate-500">140 – 280</td>
                          <td class="p-2.5"><span class="text-emerald-700 font-bold">High / Sufficient</span></td>
                        </tr>
                        <tr>
                          <td class="p-2.5 font-bold">Zinc (Zn)</td>
                          <td class="p-2.5 font-mono">0.48 ppm</td>
                          <td class="p-2.5 font-mono text-slate-500">&gt; 0.60</td>
                          <td class="p-2.5"><span class="text-rose-700 font-bold">Deficient</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <!-- Customized Fertilizer Recommendation -->
                  <div class="p-4 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1.5">
                    <div class="font-extrabold text-[#0B6623]">Customized Fertilizer Dosage (Per Acre for Cotton):</div>
                    <ul class="list-disc pl-5 space-y-1 text-slate-700">
                      <li><strong>Basal Application:</strong> DAP 50 kg + Zinc Sulphate 21% @ 10 kg + Farm Yard Manure 2 Tonnes.</li>
                      <li><strong>First Top Dressing (30 DAS):</strong> Neem Coated Urea 30 kg per acre.</li>
                      <li><strong>Second Top Dressing (60 DAS):</strong> Urea 25 kg + 10 kg Magnesium Sulphate.</li>
                      <li><strong>Alkaline Correction:</strong> Apply Gypsum @ 100 kg/acre prior to next monsoon ploughing.</li>
                    </ul>
                  </div>

                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeViewSoilReportModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Close</button>
                    <button type="button" onclick="showToast('Soil Health Card PDF printed', 'success'); closeViewSoilReportModal();" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-1.5">
                      <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                      <span>Print Card</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: CROP GUIDE (Redesigned Page + Add, Delete, View Crop)
               ------------------------------------------------------------- -->
          <div id="view-crop-guide" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <i data-lucide="book-open" class="w-4 h-4"></i>
                  <span>Agronomy Standard Operating Procedures</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Crop Production Guides</h2>
                <p class="text-xs text-[#64748B]">Complete package of practices, sowing schedules, irrigation stages & harvesting protocols.</p>
              </div>
              <button type="button" onclick="openAddCropModal()" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white text-xs font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-2 transition">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Add Crop</span>
              </button>
            </div>

            <!-- Crop Cards Grid -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5" id="cropsGridContainer">
              <!-- Cotton -->
              <div class="saas-card overflow-hidden flex flex-col justify-between crop-card" data-id="crop-cotton">
                <div class="p-5">
                  <div class="flex items-center justify-between mb-2">
                    <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0B6623] border border-emerald-200 text-[10px] font-bold">Kharif Season</span>
                    <span class="text-slate-500 font-mono text-xs">150 – 165 Days</span>
                  </div>
                  <h3 class="font-extrabold text-[#0F172A] text-base">Cotton (Bt Cotton / Shankar-6)</h3>
                  <p class="text-xs text-slate-600 mt-1 line-clamp-2">Deep black cotton soil. Optimum sowing window June 15 - July 15. Spacing 4ft x 1.5ft. Potential yield 14-18 Qtl/Acre.</p>
                </div>
                <div class="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-[#0B6623] font-bold">Yield: 16 Qtl/Acre</span>
                  <div class="flex items-center gap-1.5">
                    <button type="button" onclick="openViewCropModal('crop-cotton')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View Guide</button>
                    <button type="button" onclick="deleteCrop('crop-cotton')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete Crop"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                  </div>
                </div>
              </div>

              <!-- Groundnut -->
              <div class="saas-card overflow-hidden flex flex-col justify-between crop-card" data-id="crop-groundnut">
                <div class="p-5">
                  <div class="flex items-center justify-between mb-2">
                    <span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">Kharif / Summer</span>
                    <span class="text-slate-500 font-mono text-xs">110 – 120 Days</span>
                  </div>
                  <h3 class="font-extrabold text-[#0F172A] text-base">Groundnut (GG-20 / GJG-32)</h3>
                  <p class="text-xs text-slate-600 mt-1 line-clamp-2">Well-drained sandy loam soil. Gypsum application at pegging stage mandatory for bold pod development.</p>
                </div>
                <div class="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-[#0B6623] font-bold">Yield: 18-22 Qtl/Acre</span>
                  <div class="flex items-center gap-1.5">
                    <button type="button" onclick="openViewCropModal('crop-groundnut')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View Guide</button>
                    <button type="button" onclick="deleteCrop('crop-groundnut')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete Crop"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                  </div>
                </div>
              </div>

              <!-- Cumin -->
              <div class="saas-card overflow-hidden flex flex-col justify-between crop-card" data-id="crop-cumin">
                <div class="p-5">
                  <div class="flex items-center justify-between mb-2">
                    <span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 text-[10px] font-bold">Rabi Season</span>
                    <span class="text-slate-500 font-mono text-xs">100 – 115 Days</span>
                  </div>
                  <h3 class="font-extrabold text-[#0F172A] text-base">Cumin (Gujarat Cumin-4 / GC-4)</h3>
                  <p class="text-xs text-slate-600 mt-1 line-clamp-2">Sown in November. High cash crop sensitive to cloudy weather and blight (Chharo). Preventative copper spray key.</p>
                </div>
                <div class="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span class="text-[#0B6623] font-bold">Yield: 5-7 Qtl/Acre</span>
                  <div class="flex items-center gap-1.5">
                    <button type="button" onclick="openViewCropModal('crop-cumin')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View Guide</button>
                    <button type="button" onclick="deleteCrop('crop-cumin')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete Crop"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                  </div>
                </div>
              </div>
            </div>

            <!-- MODAL: ADD CROP -->
            <div id="addCropModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B6623] flex items-center justify-center">
                      <i data-lucide="sprout" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]">Add Crop Guide</h3>
                      <p class="text-[11px] text-slate-500">Define package of practices</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeAddCropModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <form onsubmit="handleSaveCrop(event)" class="p-6 space-y-4 text-xs">
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Crop Name <span class="text-rose-500">*</span></label>
                    <input id="cropNameInput" type="text" required placeholder="e.g. Wheat (GW-496)" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Season</label>
                      <select id="cropSeasonInput" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                        <option value="Kharif">Kharif</option>
                        <option value="Rabi">Rabi</option>
                        <option value="Summer/Zaid">Summer/Zaid</option>
                      </select>
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Maturity (Days)</label>
                      <input id="cropDurationInput" type="number" value="120" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Expected Yield (Qtl/Acre)</label>
                      <input id="cropYieldInput" type="text" value="18-22 Qtl" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Ideal Soil Type</label>
                      <input id="cropSoilInput" type="text" value="Medium Black Loam" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Package of Practices Summary</label>
                    <textarea id="cropDescInput" rows="3" placeholder="Sowing spacing, key fertilizer doses, critical irrigation stages..." class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]"></textarea>
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeAddCropModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs">Save Crop Guide</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: VIEW CROP FULL DETAILS -->
            <div id="viewCropModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div>
                    <h3 class="text-sm font-bold text-[#0F172A]" id="viewCropModalTitle">Cotton (Bt Cotton / Shankar-6) Guide</h3>
                    <p class="text-[11px] text-slate-500">Comprehensive Package of Practices (Saurashtra Zone)</p>
                  </div>
                  <button type="button" onclick="closeViewCropModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
                  <div class="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Sowing Period</span>
                      <div class="font-extrabold text-[#0F172A]">June 15 – July 15</div>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Seed Rate</span>
                      <div class="font-extrabold text-[#0F172A]">900g – 1.2 kg / Acre</div>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Spacing</span>
                      <div class="font-extrabold text-[#0F172A]">120 cm x 45 cm</div>
                    </div>
                  </div>

                  <!-- Stage by stage lifecycle -->
                  <div class="space-y-2">
                    <h4 class="font-bold text-[#0F172A] text-sm">Crop Growth Milestones & Management</h4>
                    <div class="space-y-2">
                      <div class="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
                        <div class="font-bold text-[#0B6623]">0 - 25 Days: Sowing & Emergence</div>
                        <p class="text-slate-700 mt-0.5">Seed treatment with Imidacloprid 600 FS @ 5ml/kg to protect against early sucking pests (thrips, aphids).</p>
                      </div>
                      <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <div class="font-bold text-slate-800">25 - 60 Days: Square & Vegetative Phase</div>
                        <p class="text-slate-700 mt-0.5">First top dressing of Urea @ 30kg/acre. Nipping of terminal shoot at 80-90 cm height to promote lateral branching.</p>
                      </div>
                      <div class="p-3 bg-amber-50/60 border border-amber-200 rounded-xl">
                        <div class="font-bold text-amber-900">60 - 110 Days: Peak Flowering & Boll Formation</div>
                        <p class="text-slate-700 mt-0.5">Critical irrigation window. Avoid water stress. Install pheromone traps and monitor for Pink Bollworm.</p>
                      </div>
                      <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <div class="font-bold text-slate-800">110 - 160 Days: Boll Bursting & Picking</div>
                        <p class="text-slate-700 mt-0.5">Pick clean cotton during morning hours when dew has evaporated. Store in dry, well-ventilated godown.</p>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeViewCropModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Close</button>
                    <button type="button" onclick="showToast('Crop Guide PDF downloaded', 'success'); closeViewCropModal();" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-1.5">
                      <i data-lucide="download" class="w-3.5 h-3.5"></i>
                      <span>Download PDF</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: SEED GUIDE (Redesigned Page + Add, Delete, View Seed)
               ------------------------------------------------------------- -->
          <div id="view-seed-guide" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <i data-lucide="circle-dot" class="w-4 h-4"></i>
                  <span>Certified Seed Varietal Directory</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Certified Seed Catalog</h2>
                <p class="text-xs text-[#64748B]">Saurashtra university & ICAR validated seed varieties, resistance profiles, and authorized stockists.</p>
              </div>
              <button type="button" onclick="openAddSeedModal()" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white text-xs font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-2 transition">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Add Seed Variety</span>
              </button>
            </div>

            <!-- Seed Varieties Table -->
            <div class="saas-card overflow-hidden">
              <table class="w-full text-left text-xs" id="seedGuideTable">
                <thead>
                  <tr class="border-b border-slate-200 bg-[#F8FAFC] font-bold text-slate-500">
                    <th class="px-5 py-3">Variety Name</th>
                    <th class="px-5 py-3">Crop</th>
                    <th class="px-5 py-3">Breeder / Company</th>
                    <th class="px-5 py-3">Duration</th>
                    <th class="px-5 py-3">Germination %</th>
                    <th class="px-5 py-3">Key Resistance Traits</th>
                    <th class="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium" id="seedTableBody">
                  <tr class="hover:bg-slate-50 transition" data-id="seed-1" data-name="Gujarat Groundnut-20 (GG-20)" data-crop="Groundnut">
                    <td class="px-5 py-3.5 font-bold text-[#0F172A]">GG-20 (Gujarat Groundnut-20)</td>
                    <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold text-[10px]">Groundnut</span></td>
                    <td class="px-5 py-3.5 text-slate-600">Junagadh Agricultural University (JAU)</td>
                    <td class="px-5 py-3.5 font-mono">115 – 120 Days</td>
                    <td class="px-5 py-3.5 font-mono font-bold text-emerald-700">88% Min</td>
                    <td class="px-5 py-3.5 text-slate-700">Semi-spreading, bold pod, high shelling (72%)</td>
                    <td class="px-5 py-3.5 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button type="button" onclick="openViewSeedModal('seed-1')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View</button>
                        <button type="button" onclick="deleteSeed('seed-1')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition" data-id="seed-2" data-name="GW-496 (Gujarat Wheat-496)" data-crop="Wheat">
                    <td class="px-5 py-3.5 font-bold text-[#0F172A]">GW-496 (Gujarat Wheat-496)</td>
                    <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px]">Wheat</span></td>
                    <td class="px-5 py-3.5 text-slate-600">SDAU / State Seed Corp</td>
                    <td class="px-5 py-3.5 font-mono">105 – 110 Days</td>
                    <td class="px-5 py-3.5 font-mono font-bold text-emerald-700">92% Min</td>
                    <td class="px-5 py-3.5 text-slate-700">Amber lustrous grain, rust tolerant, high chapati score</td>
                    <td class="px-5 py-3.5 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button type="button" onclick="openViewSeedModal('seed-2')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View</button>
                        <button type="button" onclick="deleteSeed('seed-2')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- MODAL: ADD SEED -->
            <div id="addSeedModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B6623] flex items-center justify-center">
                      <i data-lucide="circle-dot" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]">Add Seed Variety</h3>
                      <p class="text-[11px] text-slate-500">Register certified cultivar</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeAddSeedModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <form onsubmit="handleSaveSeed(event)" class="p-6 space-y-4 text-xs">
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Variety Name <span class="text-rose-500">*</span></label>
                    <input id="seedNameInput" type="text" required placeholder="e.g. Gujarat Cumin-4 (GC-4)" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Crop Type</label>
                      <input id="seedCropInput" type="text" required value="Cumin" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Breeder / Agency</label>
                      <input id="seedBreederInput" type="text" value="JAU Junagadh" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Maturity Days</label>
                      <input id="seedDurationInput" type="number" value="110" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Min Germination %</label>
                      <input id="seedGermInput" type="number" value="85" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Resistance Traits & Notes</label>
                    <input id="seedTraitsInput" type="text" placeholder="Fusarium wilt tolerant, bold grain..." class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeAddSeedModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs">Save Seed</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: VIEW SEED FULL DETAILS -->
            <div id="viewSeedModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div>
                    <h3 class="text-sm font-bold text-[#0F172A]" id="viewSeedModalTitle">GG-20 Groundnut Technical Dossier</h3>
                    <p class="text-[11px] text-slate-500">Certified Varietal Specifications</p>
                  </div>
                  <button type="button" onclick="closeViewSeedModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
                  <div class="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Seed Rate</span>
                      <div class="font-extrabold text-[#0F172A]">40 – 45 kg / Acre</div>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Oil Content</span>
                      <div class="font-extrabold text-[#0F172A]">49 – 51 %</div>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Shelling Outturn</span>
                      <div class="font-extrabold text-[#0F172A]">72 %</div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <h4 class="font-bold text-[#0F172A] text-sm">Mandatory Seed Treatment Protocol:</h4>
                    <p class="text-slate-700 leading-relaxed">
                      Treat kernels with <strong>Thiram 75% WP @ 3g/kg</strong> or <strong>Carboxin + Thiram (Vitavax Power) @ 2g/kg</strong> seed 24 hours prior to sowing to prevent collar rot. Inoculate with <strong>Rhizobium & PSB culture</strong> @ 250g/10kg seed for biological nitrogen fixation.
                    </p>
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeViewSeedModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Close</button>
                    <button type="button" onclick="showToast('Seed certified spec sheet downloaded', 'success'); closeViewSeedModal();" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-1.5">
                      <i data-lucide="download" class="w-3.5 h-3.5"></i>
                      <span>Download Spec Sheet</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: COMPOST AND ORGANIC (Redesigned + Add, Delete, View)
               ------------------------------------------------------------- -->
          <div id="view-compost" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-amber-900">
                  <i data-lucide="recycle" class="w-4 h-4"></i>
                  <span>Zero-Budget Natural Farming & Organic Formulations</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Compost & Organic Formulations</h2>
                <p class="text-xs text-[#64748B]">Traditional fermented bio-inputs, liquid organic nutrients, and microbial enrichers.</p>
              </div>
              <button type="button" onclick="openAddCompostModal()" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white text-xs font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-2 transition">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Add Formulation</span>
              </button>
            </div>

            <!-- Formulations Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-5" id="compostGridContainer">
              <!-- Jeevamrut -->
              <div class="saas-card p-5 flex flex-col justify-between compost-card" data-id="compost-jeevamrut">
                <div>
                  <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0B6623] border border-emerald-200 text-[10px] font-bold">Liquid Bio-Fertilizer</span>
                  <h3 class="font-extrabold text-[#0F172A] text-base mt-2">Jeevamrut (Liquid Microbial Culture)</h3>
                  <p class="text-xs text-slate-600 mt-1">200L barrel recipe using desi cow dung, cow urine, jaggery & besan. Ferments in 5-7 days. Applied @ 200L/Acre via drip or flood.</p>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-xs font-bold text-emerald-700">Cost: ₹ 120 / Acre</span>
                  <div class="flex items-center gap-1.5">
                    <button type="button" onclick="openViewCompostModal('compost-jeevamrut')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold text-xs hover:bg-emerald-100">Recipe</button>
                    <button type="button" onclick="deleteCompost('compost-jeevamrut')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                  </div>
                </div>
              </div>

              <!-- Ghan Jeevamrut -->
              <div class="saas-card p-5 flex flex-col justify-between compost-card" data-id="compost-ghan">
                <div>
                  <span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-[10px] font-bold">Solid Bio-Fertilizer</span>
                  <h3 class="font-extrabold text-[#0F172A] text-base mt-2">Ghan Jeevamrut (Solid Form)</h3>
                  <p class="text-xs text-slate-600 mt-1">Dried microbial cakes made with 100kg cow dung and Jeevamrut slurry. Replaces synthetic DAP at sowing. Shelf life 6 months.</p>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-xs font-bold text-emerald-700">Cost: ₹ 350 / Acre</span>
                  <div class="flex items-center gap-1.5">
                    <button type="button" onclick="openViewCompostModal('compost-ghan')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold text-xs hover:bg-emerald-100">Recipe</button>
                    <button type="button" onclick="deleteCompost('compost-ghan')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                  </div>
                </div>
              </div>

              <!-- Neemastra -->
              <div class="saas-card p-5 flex flex-col justify-between compost-card" data-id="compost-neemastra">
                <div>
                  <span class="px-2.5 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200 text-[10px] font-bold">Botanical Bio-Pesticide</span>
                  <h3 class="font-extrabold text-[#0F172A] text-base mt-2">Neemastra (Sucking Pest Control)</h3>
                  <p class="text-xs text-slate-600 mt-1">Extract of crushed neem leaves and cow urine fermented for 48 hours. Controls whitefly, aphids, and jassids effectively.</p>
                </div>
                <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span class="text-xs font-bold text-emerald-700">Cost: ₹ 80 / Acre</span>
                  <div class="flex items-center gap-1.5">
                    <button type="button" onclick="openViewCompostModal('compost-neemastra')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold text-xs hover:bg-emerald-100">Recipe</button>
                    <button type="button" onclick="deleteCompost('compost-neemastra')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                  </div>
                </div>
              </div>
            </div>

            <!-- MODAL: ADD COMPOST -->
            <div id="addCompostModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center">
                      <i data-lucide="recycle" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]">Add Organic Formulation</h3>
                      <p class="text-[11px] text-slate-500">Natural farming recipe registry</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeAddCompostModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <form onsubmit="handleSaveCompost(event)" class="p-6 space-y-4 text-xs">
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Method / Formulation Name <span class="text-rose-500">*</span></label>
                    <input id="compostNameInput" type="text" required placeholder="e.g. Panchagavya" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Category</label>
                      <select id="compostCategoryInput" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                        <option value="Liquid Bio-Fertilizer">Liquid Bio-Fertilizer</option>
                        <option value="Solid Bio-Fertilizer">Solid Bio-Fertilizer</option>
                        <option value="Botanical Bio-Pesticide">Botanical Bio-Pesticide</option>
                      </select>
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Fermentation Days</label>
                      <input id="compostDaysInput" type="number" value="7" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Key Ingredients & Measurements</label>
                    <input id="compostIngredientsInput" type="text" placeholder="10kg cow dung, 10L cow urine, 2kg jaggery, 2kg besan..." class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Application Method & Dosage</label>
                    <textarea id="compostDosageInput" rows="2" placeholder="200L per acre via drip irrigation once every 21 days..." class="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]"></textarea>
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeAddCompostModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs">Save Recipe</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: VIEW COMPOST FULL DETAILS -->
            <div id="viewCompostModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div>
                    <h3 class="text-sm font-bold text-[#0F172A]" id="viewCompostTitle">Jeevamrut Preparation Protocol</h3>
                    <p class="text-[11px] text-slate-500">Zero-Budget Natural Farming (ZBNF) Formulation</p>
                  </div>
                  <button type="button" onclick="closeViewCompostModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
                  <div class="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Barrel Volume</span>
                      <div class="font-extrabold text-[#0F172A]">200 Litres Water</div>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Fermentation Time</span>
                      <div class="font-extrabold text-[#0F172A]">5 to 7 Days in Shade</div>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <h4 class="font-bold text-[#0F172A] text-sm">Required Ingredients:</h4>
                    <ul class="list-disc pl-5 space-y-1 text-slate-700">
                      <li>Fresh Desi Cow Dung: 10 kg</li>
                      <li>Desi Cow Urine: 10 Litres</li>
                      <li>Organic Jaggery (Gur): 2 kg</li>
                      <li>Gram Flour (Besan): 2 kg</li>
                      <li>Uncultivated Virgin Bund Soil: 1 Handful (serves as microbial inoculum)</li>
                    </ul>
                  </div>
                  <div class="space-y-2">
                    <h4 class="font-bold text-[#0F172A] text-sm">Step-by-Step Stirring Instructions:</h4>
                    <p class="text-slate-700 leading-relaxed">
                      Mix all ingredients into the barrel with 190L water. Stir clockwise with a wooden stick for 5 minutes twice daily (morning and evening). Keep covered with a wet jute gunny bag. After 7 days, strain through cotton cloth and apply via drip irrigation or direct flood.
                    </p>
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeViewCompostModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Close</button>
                    <button type="button" onclick="showToast('Recipe printed for field use', 'success'); closeViewCompostModal();" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-1.5">
                      <i data-lucide="printer" class="w-3.5 h-3.5"></i>
                      <span>Print Recipe</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: FARM MANAGER (Redesigned + Add, Delete, View Farm)
               ------------------------------------------------------------- -->
          <div id="view-farm-manager" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-[#0B6623]">
                  <i data-lucide="tractor" class="w-4 h-4"></i>
                  <span>Geo-Tagged Land Parcel Ledger</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Farm Manager</h2>
                <p class="text-xs text-[#64748B]">Manage farmer field plots, soil classification, irrigation infrastructure & cropping history.</p>
              </div>
              <button type="button" onclick="openAddFarmModal()" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white text-xs font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-2 transition">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>Register Farm Parcel</span>
              </button>
            </div>

            <!-- Farms Table -->
            <div class="saas-card overflow-hidden">
              <table class="w-full text-left text-xs" id="farmManagerTable">
                <thead>
                  <tr class="border-b border-slate-200 bg-[#F8FAFC] font-bold text-slate-500">
                    <th class="px-5 py-3">Farm Name & Owner</th>
                    <th class="px-5 py-3">Location / Village</th>
                    <th class="px-5 py-3">Survey No</th>
                    <th class="px-5 py-3">Acreage</th>
                    <th class="px-5 py-3">Standing Crop</th>
                    <th class="px-5 py-3">Irrigation Type</th>
                    <th class="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium" id="farmTableBody">
                  <tr class="hover:bg-slate-50 transition" data-id="farm-1" data-name="Patel Sudavad Field #1" data-owner="Jayesh Patel">
                    <td class="px-5 py-3.5">
                      <div class="font-bold text-[#0F172A]">Patel Sudavad Field #1</div>
                      <div class="text-[11px] text-slate-500">Owner: Jayesh Patel</div>
                    </td>
                    <td class="px-5 py-3.5">Sudavad, Bagasara</td>
                    <td class="px-5 py-3.5 font-mono">142/2</td>
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">5.5 Acres</td>
                    <td class="px-5 py-3.5 font-bold">Cotton (Shankar-6)</td>
                    <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">Drip (Borewell)</span></td>
                    <td class="px-5 py-3.5 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button type="button" onclick="openViewFarmModal('farm-1')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View Details</button>
                        <button type="button" onclick="deleteFarm('farm-1')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition" data-id="farm-2" data-name="Kotadiya Dhari Riverfront Farm" data-owner="Ramesh Kotadiya">
                    <td class="px-5 py-3.5">
                      <div class="font-bold text-[#0F172A]">Kotadiya Dhari Riverfront Farm</div>
                      <div class="text-[11px] text-slate-500">Owner: Ramesh Kotadiya</div>
                    </td>
                    <td class="px-5 py-3.5">Dhari Rural</td>
                    <td class="px-5 py-3.5 font-mono">98/1</td>
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">8.2 Acres</td>
                    <td class="px-5 py-3.5 font-bold">Groundnut (GG-20)</td>
                    <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">Canal + Sprinkler</span></td>
                    <td class="px-5 py-3.5 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button type="button" onclick="openViewFarmModal('farm-2')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View Details</button>
                        <button type="button" onclick="deleteFarm('farm-2')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- MODAL: ADD FARM -->
            <div id="addFarmModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-emerald-100 text-[#0B6623] flex items-center justify-center">
                      <i data-lucide="tractor" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]">Register Farm Parcel</h3>
                      <p class="text-[11px] text-slate-500">Record land survey & crop details</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeAddFarmModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <form onsubmit="handleSaveFarm(event)" class="p-6 space-y-4 text-xs">
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Farm Title <span class="text-rose-500">*</span></label>
                    <input id="farmTitleInput" type="text" required placeholder="e.g. Amreli West Orchard Field" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Owner Farmer <span class="text-rose-500">*</span></label>
                      <input id="farmOwnerInput" type="text" required value="Jayesh Patel" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Village / Taluka <span class="text-rose-500">*</span></label>
                      <input id="farmVillageInput" type="text" required value="Sudavad, Bagasara" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                  </div>
                  <div class="grid grid-cols-3 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Survey No</label>
                      <input id="farmSurveyInput" type="text" value="142/2" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Area (Acres)</label>
                      <input id="farmAcresInput" type="number" step="0.1" value="5.5" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Irrigation</label>
                      <select id="farmIrrigInput" class="w-full h-9 px-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                        <option value="Drip (Borewell)">Drip</option>
                        <option value="Canal">Canal</option>
                        <option value="Sprinkler">Sprinkler</option>
                        <option value="Rainfed">Rainfed</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Current Standing Crop</label>
                    <input id="farmCropInput" type="text" value="Cotton (Shankar-6)" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeAddFarmModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs">Register Farm</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: VIEW FARM FULL DETAILS -->
            <div id="viewFarmModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div>
                    <h3 class="text-sm font-bold text-[#0F172A]" id="viewFarmModalTitle">Patel Sudavad Field #1 Profile</h3>
                    <p class="text-[11px] text-slate-500">Geo-Tagged Farm Parcel & Cropping Ledger</p>
                  </div>
                  <button type="button" onclick="closeViewFarmModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
                  <div class="grid grid-cols-4 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Acreage</span>
                      <div class="font-extrabold text-[#0B6623] text-sm">5.5 Acres</div>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Soil Class</span>
                      <div class="font-extrabold text-[#0F172A]">Medium Black</div>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Irrigation</span>
                      <div class="font-extrabold text-blue-700">Drip (Borewell)</div>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Moisture</span>
                      <div class="font-extrabold text-emerald-700">68% (Optimal)</div>
                    </div>
                  </div>

                  <!-- Season Expenditure vs Estimated Yield -->
                  <div class="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                    <div class="font-bold text-[#0B6623] flex items-center justify-between">
                      <span>Kharif 2026 Season Economic Ledger:</span>
                      <span class="font-mono text-xs">Estimated Profit: ₹ 2,14,000</span>
                    </div>
                    <div class="grid grid-cols-3 gap-2 text-[11px]">
                      <div>Input Cost: <strong>₹ 38,500</strong> (Seed, Fertilizers, Drip)</div>
                      <div>Labor & Sprays: <strong>₹ 16,000</strong></div>
                      <div>Expected Harvest: <strong>88 Quintals Cotton</strong></div>
                    </div>
                  </div>

                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeViewFarmModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Close</button>
                    <button type="button" onclick="showToast('Farm ledger exported as PDF', 'success'); closeViewFarmModal();" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-1.5">
                      <i data-lucide="download" class="w-3.5 h-3.5"></i>
                      <span>Download Ledger</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: WEATHER (Redesigned Page with Taluka Selector)
               ------------------------------------------------------------- -->
          <div id="view-weather" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-sky-700">
                  <span class="w-2 h-2 rounded-full bg-sky-500 animate-pulse"></span>
                  <span>Agro-Meteorological Station (IMD Saurashtra Network)</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Weather & Spray Advisory</h2>
                <p class="text-xs text-[#64748B]">Hyper-local temperature, dew point, wind dynamics, and pesticide spraying conditions.</p>
              </div>
              <div class="flex items-center gap-2">
                <label class="text-xs font-bold text-slate-600">Taluka:</label>
                <select id="weatherTalukaSelect" onchange="changeWeatherTaluka(this.value)" class="h-10 px-3 bg-white border border-[#E5E7EB] rounded-xl text-xs font-bold text-[#0B6623] outline-none focus:border-[#0B6623] shadow-2xs">
                  <option value="Amreli" selected>Amreli</option>
                  <option value="Bagasara">Bagasara</option>
                  <option value="Dhari">Dhari</option>
                  <option value="Babra">Babra</option>
                  <option value="Rajula">Rajula</option>
                  <option value="Savarkundla">Savarkundla</option>
                  <option value="Jafrabad">Jafrabad</option>
                  <option value="Lathi">Lathi</option>
                  <option value="Lilia">Lilia</option>
                  <option value="Khambha">Khambha</option>
                </select>
              </div>
            </div>

            <!-- Current Weather Card -->
            <div class="saas-card p-6 bg-gradient-to-r from-sky-500 to-blue-700 text-white rounded-2xl shadow-md">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div class="text-xs font-bold text-sky-100 uppercase tracking-wider" id="weatherCardTaluka">Amreli District Headquarters</div>
                  <div class="text-4xl font-black mt-1 flex items-center gap-3">
                    <span id="weatherCardTemp">32°C</span>
                    <span class="text-base font-medium text-sky-100">| Partly Cloudy</span>
                  </div>
                  <p class="text-xs text-sky-100 mt-1">Ideal field conditions for cotton and groundnut harvesting.</p>
                </div>
                <!-- Spray Feasibility Badge -->
                <div class="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20 text-right">
                  <div class="text-[11px] font-bold text-emerald-300 flex items-center justify-end gap-1.5">
                    <span class="w-2 h-2 rounded-full bg-emerald-400"></span>
                    <span>Safe For Pesticide Spraying</span>
                  </div>
                  <div class="text-xs text-white mt-1">Wind &lt; 14 km/h · No rain in next 48h</div>
                </div>
              </div>

              <!-- Weather Sensor Matrix -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-5 border-t border-white/20 text-xs">
                <div>
                  <span class="text-sky-200 text-[10px] uppercase font-bold">Relative Humidity</span>
                  <div class="text-lg font-black mt-0.5">58%</div>
                </div>
                <div>
                  <span class="text-sky-200 text-[10px] uppercase font-bold">Wind Speed</span>
                  <div class="text-lg font-black mt-0.5">12 km/h SW</div>
                </div>
                <div>
                  <span class="text-sky-200 text-[10px] uppercase font-bold">Soil Temp (10cm)</span>
                  <div class="text-lg font-black mt-0.5">26.4°C</div>
                </div>
                <div>
                  <span class="text-sky-200 text-[10px] uppercase font-bold">Dew Point</span>
                  <div class="text-lg font-black mt-0.5">18.5°C</div>
                </div>
              </div>
            </div>

            <!-- 7-Day Agro Forecast Cards -->
            <div class="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3" id="forecastCardsContainer">
              <div class="saas-card p-3.5 text-center">
                <div class="text-xs font-bold text-slate-700">Mon 26</div>
                <div class="w-7 h-7 mx-auto my-1 text-amber-500"><i data-lucide="sun" class="w-6 h-6"></i></div>
                <div class="font-extrabold text-sm text-[#0F172A]">33° / 21°</div>
                <div class="text-[10px] text-emerald-600 font-bold mt-1">0% Rain</div>
              </div>
              <div class="saas-card p-3.5 text-center">
                <div class="text-xs font-bold text-slate-700">Tue 27</div>
                <div class="w-7 h-7 mx-auto my-1 text-amber-500"><i data-lucide="sun" class="w-6 h-6"></i></div>
                <div class="font-extrabold text-sm text-[#0F172A]">34° / 22°</div>
                <div class="text-[10px] text-emerald-600 font-bold mt-1">0% Rain</div>
              </div>
              <div class="saas-card p-3.5 text-center">
                <div class="text-xs font-bold text-slate-700">Wed 28</div>
                <div class="w-7 h-7 mx-auto my-1 text-slate-400"><i data-lucide="cloud-sun" class="w-6 h-6"></i></div>
                <div class="font-extrabold text-sm text-[#0F172A]">32° / 20°</div>
                <div class="text-[10px] text-emerald-600 font-bold mt-1">5% Rain</div>
              </div>
              <div class="saas-card p-3.5 text-center">
                <div class="text-xs font-bold text-slate-700">Thu 29</div>
                <div class="w-7 h-7 mx-auto my-1 text-amber-500"><i data-lucide="sun" class="w-6 h-6"></i></div>
                <div class="font-extrabold text-sm text-[#0F172A]">33° / 21°</div>
                <div class="text-[10px] text-emerald-600 font-bold mt-1">0% Rain</div>
              </div>
              <div class="saas-card p-3.5 text-center">
                <div class="text-xs font-bold text-slate-700">Fri 30</div>
                <div class="w-7 h-7 mx-auto my-1 text-amber-500"><i data-lucide="sun" class="w-6 h-6"></i></div>
                <div class="font-extrabold text-sm text-[#0F172A]">34° / 22°</div>
                <div class="text-[10px] text-emerald-600 font-bold mt-1">0% Rain</div>
              </div>
              <div class="saas-card p-3.5 text-center">
                <div class="text-xs font-bold text-slate-700">Sat 31</div>
                <div class="w-7 h-7 mx-auto my-1 text-slate-400"><i data-lucide="cloud-sun" class="w-6 h-6"></i></div>
                <div class="font-extrabold text-sm text-[#0F172A]">32° / 21°</div>
                <div class="text-[10px] text-emerald-600 font-bold mt-1">10% Rain</div>
              </div>
              <div class="saas-card p-3.5 text-center">
                <div class="text-xs font-bold text-slate-700">Sun 01</div>
                <div class="w-7 h-7 mx-auto my-1 text-amber-500"><i data-lucide="sun" class="w-6 h-6"></i></div>
                <div class="font-extrabold text-sm text-[#0F172A]">33° / 20°</div>
                <div class="text-[10px] text-emerald-600 font-bold mt-1">0% Rain</div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: SCHEME APPLICATIONS (Redesigned + Add, Delete, View)
               ------------------------------------------------------------- -->
          <div id="view-scheme-applications" class="hidden space-y-6 view-section">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-[#E5E7EB] shadow-xs">
              <div>
                <div class="flex items-center gap-2 text-xs font-bold text-purple-700">
                  <i data-lucide="stamp" class="w-4 h-4"></i>
                  <span>Government Direct Benefit Transfer (DBT) & Subsidy Portal</span>
                </div>
                <h2 class="text-xl font-black text-[#0F172A] mt-1">Scheme Applications Desk</h2>
                <p class="text-xs text-[#64748B]">i-Khedut portal, PM-Kisan, GGRC micro-irrigation & solar pump subsidies tracking.</p>
              </div>
              <button type="button" onclick="openAddSchemeModal()" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white text-xs font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-2 transition">
                <i data-lucide="plus" class="w-4 h-4"></i>
                <span>New Application</span>
              </button>
            </div>

            <!-- Schemes Pipeline Table -->
            <div class="saas-card overflow-hidden">
              <table class="w-full text-left text-xs" id="schemesTable">
                <thead>
                  <tr class="border-b border-slate-200 bg-[#F8FAFC] font-bold text-slate-500">
                    <th class="px-5 py-3">App ID</th>
                    <th class="px-5 py-3">Beneficiary Farmer</th>
                    <th class="px-5 py-3">Government Scheme</th>
                    <th class="px-5 py-3">Sanctioned Subsidy</th>
                    <th class="px-5 py-3">Taluka</th>
                    <th class="px-5 py-3">DBT Status</th>
                    <th class="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-slate-100 font-medium" id="schemeTableBody">
                  <tr class="hover:bg-slate-50 transition" data-id="sch-1" data-farmer="Jayesh Patel" data-scheme="GGRC Drip Irrigation Subsidy (70%)">
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">#IKH-2026-992</td>
                    <td class="px-5 py-3.5">
                      <div class="font-bold text-[#0F172A]">Jayesh Patel</div>
                      <div class="text-[11px] text-slate-500">+91 98250 12345 · Sudavad</div>
                    </td>
                    <td class="px-5 py-3.5 font-bold">GGRC Drip Irrigation Subsidy (70%)</td>
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">₹ 84,000</td>
                    <td class="px-5 py-3.5">Bagasara</td>
                    <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 font-bold border border-emerald-200 text-[10px]">Approved · Sanctioned</span></td>
                    <td class="px-5 py-3.5 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button type="button" onclick="openViewSchemeModal('sch-1')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View Dossier</button>
                        <button type="button" onclick="deleteScheme('sch-1')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                      </div>
                    </td>
                  </tr>
                  <tr class="hover:bg-slate-50 transition" data-id="sch-2" data-farmer="Mansukhbhai Kotadiya" data-scheme="PM-KUSUM Component-B Solar Pump (60%)">
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">#KUSUM-8410</td>
                    <td class="px-5 py-3.5">
                      <div class="font-bold text-[#0F172A]">Mansukhbhai Kotadiya</div>
                      <div class="text-[11px] text-slate-500">+91 98251 67890 · Dhari</div>
                    </td>
                    <td class="px-5 py-3.5 font-bold">PM-KUSUM Solar Pump 5 HP (60%)</td>
                    <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">₹ 1,42,000</td>
                    <td class="px-5 py-3.5">Dhari</td>
                    <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 font-bold border border-amber-200 text-[10px]">Under Verification</span></td>
                    <td class="px-5 py-3.5 text-right">
                      <div class="flex items-center justify-end gap-1.5">
                        <button type="button" onclick="openViewSchemeModal('sch-2')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View Dossier</button>
                        <button type="button" onclick="deleteScheme('sch-2')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- MODAL: ADD SCHEME -->
            <div id="addSchemeModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div class="flex items-center gap-2">
                    <div class="w-8 h-8 rounded-lg bg-purple-100 text-purple-800 flex items-center justify-center">
                      <i data-lucide="stamp" class="w-4 h-4"></i>
                    </div>
                    <div>
                      <h3 class="text-sm font-bold text-[#0F172A]">New Subsidy Application</h3>
                      <p class="text-[11px] text-slate-500">Government scheme registration</p>
                    </div>
                  </div>
                  <button type="button" onclick="closeAddSchemeModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <form onsubmit="handleSaveScheme(event)" class="p-6 space-y-4 text-xs">
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Beneficiary Farmer Name <span class="text-rose-500">*</span></label>
                    <input id="schemeFarmerInput" type="text" required value="Jayesh Patel" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Mobile</label>
                      <input id="schemeMobileInput" type="text" required value="+91 98250 12345" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Aadhaar Last 4 Digits</label>
                      <input id="schemeAadhaarInput" type="text" value="8421" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                  </div>
                  <div>
                    <label class="block font-bold text-slate-700 mb-1">Scheme Selection <span class="text-rose-500">*</span></label>
                    <select id="schemeSelectInput" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                      <option value="GGRC Drip Irrigation Subsidy (70%)">GGRC Drip Irrigation Subsidy (70%)</option>
                      <option value="PM-KUSUM Solar Pump 5 HP (60%)">PM-KUSUM Solar Pump 5 HP (60%)</option>
                      <option value="Subhash Palekar Natural Farming Cow Aid">Subhash Palekar Natural Farming Cow Aid (₹ 900/month)</option>
                      <option value="Tractor Mechanization Subsidy SMAM">Tractor Mechanization Subsidy SMAM (₹ 45,000)</option>
                    </select>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Taluka</label>
                      <input id="schemeTalukaInput" type="text" value="Bagasara" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                    <div>
                      <label class="block font-bold text-slate-700 mb-1">Subsidy Amount (₹)</label>
                      <input id="schemeAmountInput" type="text" value="84,000" class="w-full h-9 px-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:border-[#0B6623]">
                    </div>
                  </div>
                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeAddSchemeModal()" class="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-bold hover:bg-slate-50">Cancel</button>
                    <button type="submit" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs">Submit Application</button>
                  </div>
                </form>
              </div>
            </div>

            <!-- MODAL: VIEW SCHEME DOSSIER -->
            <div id="viewSchemeModal" class="hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
              <div class="bg-white rounded-2xl border border-slate-100 shadow-2xl w-full max-w-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                  <div>
                    <h3 class="text-sm font-bold text-[#0F172A]" id="viewSchemeTitle">Scheme Dossier #IKH-2026-992</h3>
                    <p class="text-[11px] text-slate-500">Government DBT Disbursement Record</p>
                  </div>
                  <button type="button" onclick="closeViewSchemeModal()" class="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                    <i data-lucide="x" class="w-4 h-4"></i>
                  </button>
                </div>
                <div class="p-6 space-y-4 text-xs max-h-[80vh] overflow-y-auto">
                  <div class="grid grid-cols-3 gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Beneficiary</span>
                      <div class="font-extrabold text-[#0F172A]">Jayesh Patel</div>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Approved Subsidy</span>
                      <div class="font-extrabold text-[#0B6623] text-sm">₹ 84,000</div>
                    </div>
                    <div>
                      <span class="text-slate-400 text-[10px] font-bold uppercase">Land Record</span>
                      <div class="font-extrabold text-emerald-700">7/12 &amp; 8-A Verified</div>
                    </div>
                  </div>

                  <!-- Disbursement Milestones -->
                  <div class="space-y-2">
                    <h4 class="font-bold text-[#0F172A] text-sm">DBT Direct Transfer Timeline:</h4>
                    <div class="space-y-2">
                      <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                        <div>
                          <div class="font-bold text-[#0B6623]">Step 1: Application & 7/12 Verification</div>
                          <div class="text-slate-600 text-[11px]">Completed by Bagasara Taluka Officer · Oct 04, 2026</div>
                        </div>
                        <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>
                      </div>
                      <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                        <div>
                          <div class="font-bold text-[#0B6623]">Step 2: Technical Field Survey (GGRC Officer)</div>
                          <div class="text-slate-600 text-[11px]">Drip pipeline layout validated on 5.5 Acres · Oct 12, 2026</div>
                        </div>
                        <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>
                      </div>
                      <div class="p-3 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                        <div>
                          <div class="font-bold text-[#0B6623]">Step 3: State Treasury Sanction Letter</div>
                          <div class="text-slate-600 text-[11px]">Sanction Order #GUJ-AGRI-84102 issued · Oct 19, 2026</div>
                        </div>
                        <i data-lucide="check-circle" class="w-4 h-4 text-emerald-600"></i>
                      </div>
                      <div class="p-3 bg-blue-50/70 border border-blue-200 rounded-xl flex items-center justify-between">
                        <div>
                          <div class="font-bold text-blue-900">Step 4: Bank Account DBT Credit</div>
                          <div class="text-slate-600 text-[11px]">Bank of Baroda A/c ending in 4109 · Scheduled Oct 28</div>
                        </div>
                        <i data-lucide="clock" class="w-4 h-4 text-blue-600"></i>
                      </div>
                    </div>
                  </div>

                  <div class="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                    <button type="button" onclick="closeViewSchemeModal()" class="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-bold hover:bg-slate-200">Close</button>
                    <button type="button" onclick="showToast('Government Sanction Certificate PDF downloaded', 'success'); closeViewSchemeModal();" class="px-4 py-2 rounded-xl bg-[#0B6623] text-white font-bold hover:bg-[#09521C] shadow-xs flex items-center gap-1.5">
                      <i data-lucide="download" class="w-3.5 h-3.5"></i>
                      <span>Download Sanction Order</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- -------------------------------------------------------------
               VIEW: SAVED ITEMS (Preserved)
               ------------------------------------------------------------- -->
          <div id="view-saved-items" class="hidden space-y-6 view-section">
            <div class="saas-card p-5">
              <h3 class="font-extrabold text-[#0F172A] text-base mb-1">Bookmarked Items & Saved Content</h3>
              <p class="text-xs text-slate-500 mb-4">Saved agronomy guides, mandi rates, and seed varieties for offline access</p>
              <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
                You have 4 saved guides and 2 pinned mandi yards. All saved items are synced with your local storage cache.
              </div>
            </div>
          </div>
`;

const fieldJs = `
    // =========================================================================
    // FIELD MODULE CONTROLLERS (AI Mitra, Crop Doctor, Soil, Guides, Farm, Weather, Schemes)
    // =========================================================================

    // ─── AI MITRA CONTROLLERS ──────────────────────────────────────────────────
    function sendAiMitraMessage() {
      const input = document.getElementById('aiMitraInputText');
      if (!input || !input.value.trim()) return;
      const text = input.value.trim();
      input.value = '';

      const feed = document.getElementById('aiMitraChatFeed');
      if (!feed) return;

      // Append user bubble
      const userBubble = document.createElement('div');
      userBubble.className = 'flex items-start justify-end gap-3';
      userBubble.innerHTML = \`
        <div class="bg-[#0B6623] text-white p-4 rounded-2xl rounded-tr-xs max-w-md text-xs space-y-1">
          <p>\${text}</p>
          <div class="text-[10px] text-emerald-200 text-right">Just now</div>
        </div>
        <div class="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 font-bold text-xs">JP</div>
      \`;
      feed.appendChild(userBubble);
      feed.scrollTop = feed.scrollHeight;

      // Simulate AI response
      setTimeout(() => {
        const aiBubble = document.createElement('div');
        aiBubble.className = 'flex items-start gap-3';
        aiBubble.innerHTML = \`
          <div class="w-8 h-8 rounded-full bg-[#0B6623] text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">AM</div>
          <div class="bg-slate-50 border border-slate-200 p-4 rounded-2xl rounded-tl-xs max-w-xl text-slate-800 space-y-2">
            <div class="font-extrabold text-[#0B6623] flex items-center gap-1.5">
              <i data-lucide="check-circle-2" class="w-4 h-4 text-emerald-600"></i>
              <span>AI Mitra Agronomy Recommendation</span>
            </div>
            <p>Based on Saurashtra weather telemetry and current phenological crop stage for your query: "<strong>\${text}</strong>":</p>
            <p class="font-medium text-slate-700">Recommended action verified with JAU agronomy guidelines. Maintain field moisture and monitor pest thresholds. Consult local dealer for genuine batch-certified inputs.</p>
            <div class="pt-2 flex items-center gap-2">
              <button type="button" onclick="showToast('Prescription logged in your Farm Record', 'success')" class="px-3 py-1.5 rounded-lg bg-[#0B6623] text-white font-bold text-[11px] hover:bg-[#09521C]">Log to Farm</button>
            </div>
          </div>
        \`;
        feed.appendChild(aiBubble);
        if (window.lucide && typeof lucide.createIcons === 'function') {
          try { lucide.createIcons(); } catch(_) {}
        }
        feed.scrollTop = feed.scrollHeight;
      }, 700);
    }

    function quickPromptAiMitra(promptText) {
      const input = document.getElementById('aiMitraInputText');
      if (input) {
        input.value = promptText;
        sendAiMitraMessage();
      }
    }

    function newAiMitraChat() {
      const feed = document.getElementById('aiMitraChatFeed');
      if (feed) {
        feed.innerHTML = \`
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-[#0B6623] text-white flex items-center justify-center flex-shrink-0 font-bold text-xs">AM</div>
            <div class="bg-slate-50 border border-slate-200 p-4 rounded-2xl rounded-tl-xs max-w-xl text-slate-800 space-y-2">
              <p class="font-bold text-[#0B6623]">New conversation started. How can I assist you with your crops?</p>
              <div class="pt-2 flex flex-wrap gap-1.5">
                <button type="button" onclick="quickPromptAiMitra('Cotton fertilizer schedule at 60 days')" class="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:border-[#0B6623] hover:text-[#0B6623] transition text-[11px]">Cotton fertilizer schedule</button>
                <button type="button" onclick="quickPromptAiMitra('Today mandi rate for Groundnut')" class="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 font-semibold hover:border-[#0B6623] hover:text-[#0B6623] transition text-[11px]">Groundnut mandi price</button>
              </div>
            </div>
          </div>
        \`;
        showToast('Fresh consultation session initialized', 'info');
      }
    }

    function loadChatSession(sessionId) {
      showToast('Loaded past session ' + sessionId, 'info');
    }

    function openViewChatModal(sessionId) {
      const modal = document.getElementById('viewChatModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeViewChatModal() {
      const modal = document.getElementById('viewChatModal');
      if (modal) modal.classList.add('hidden');
    }

    // ─── CROP DOCTOR CONTROLLERS ────────────────────────────────────────────────
    function runCropScanSimulator(sampleName) {
      const box = document.getElementById('cropScanProgressBox');
      const bar = document.getElementById('scanProgressBar');
      const status = document.getElementById('scanStatusText');
      const percent = document.getElementById('scanPercentText');

      if (!box || !bar || !status) return;

      box.classList.remove('hidden');
      bar.style.width = '20%';
      percent.textContent = '20%';
      status.textContent = 'Preprocessing image resolution for ' + sampleName + '...';

      setTimeout(() => {
        bar.style.width = '65%';
        percent.textContent = '65%';
        status.textContent = 'Comparing Saurashtra foliar disease dataset...';
      }, 500);

      setTimeout(() => {
        bar.style.width = '100%';
        percent.textContent = '100%';
        status.textContent = 'Analysis complete! 98.6% match confirmed.';
        setTimeout(() => {
          openViewScanModal('scan-1');
        }, 400);
      }, 1000);
    }

    function openViewScanModal(scanId) {
      const modal = document.getElementById('viewCropScanModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeViewScanModal() {
      const modal = document.getElementById('viewCropScanModal');
      if (modal) modal.classList.add('hidden');
    }

    // ─── SOIL DOCTOR CONTROLLERS ────────────────────────────────────────────────
    function openViewSoilReportModal(reportId) {
      const modal = document.getElementById('viewSoilReportModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeViewSoilReportModal() {
      const modal = document.getElementById('viewSoilReportModal');
      if (modal) modal.classList.add('hidden');
    }

    // ─── CROP GUIDE CONTROLLERS ─────────────────────────────────────────────────
    function openAddCropModal() {
      const modal = document.getElementById('addCropModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeAddCropModal() {
      const modal = document.getElementById('addCropModal');
      if (modal) modal.classList.add('hidden');
    }

    function handleSaveCrop(e) {
      e.preventDefault();
      const name = document.getElementById('cropNameInput')?.value.trim();
      const season = document.getElementById('cropSeasonInput')?.value;
      const duration = document.getElementById('cropDurationInput')?.value || '120';
      const yieldVal = document.getElementById('cropYieldInput')?.value || '16 Qtl';
      const desc = document.getElementById('cropDescInput')?.value || '';

      if (!name) return;

      const grid = document.getElementById('cropsGridContainer');
      if (grid) {
        const id = 'crop-' + Date.now();
        const card = document.createElement('div');
        card.className = 'saas-card overflow-hidden flex flex-col justify-between crop-card';
        card.setAttribute('data-id', id);

        card.innerHTML = \`
          <div class="p-5">
            <div class="flex items-center justify-between mb-2">
              <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0B6623] border border-emerald-200 text-[10px] font-bold">\${season} Season</span>
              <span class="text-slate-500 font-mono text-xs">\${duration} Days</span>
            </div>
            <h3 class="font-extrabold text-[#0F172A] text-base">\${name}</h3>
            <p class="text-xs text-slate-600 mt-1 line-clamp-2">\${desc}</p>
          </div>
          <div class="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
            <span class="text-[#0B6623] font-bold">Yield: \${yieldVal}</span>
            <div class="flex items-center gap-1.5">
              <button type="button" onclick="openViewCropModal('\${id}')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View Guide</button>
              <button type="button" onclick="deleteCrop('\${id}')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete Crop"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
            </div>
          </div>
        \`;
        grid.prepend(card);
        if (window.lucide && typeof lucide.createIcons === 'function') {
          try { lucide.createIcons(); } catch(_) {}
        }
      }

      closeAddCropModal();
      showToast('Crop Guide for "' + name + '" saved successfully!', 'success');
    }

    function deleteCrop(cropId) {
      if (!confirm('Are you sure you want to remove this crop guide?')) return;
      const card = document.querySelector(\`div[data-id="\${cropId}"]\`);
      if (card) {
        card.remove();
        showToast('Crop guide removed', 'info');
      }
    }

    function openViewCropModal(cropId) {
      const modal = document.getElementById('viewCropModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeViewCropModal() {
      const modal = document.getElementById('viewCropModal');
      if (modal) modal.classList.add('hidden');
    }

    // ─── SEED GUIDE CONTROLLERS ─────────────────────────────────────────────────
    function openAddSeedModal() {
      const modal = document.getElementById('addSeedModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeAddSeedModal() {
      const modal = document.getElementById('addSeedModal');
      if (modal) modal.classList.add('hidden');
    }

    function handleSaveSeed(e) {
      e.preventDefault();
      const name = document.getElementById('seedNameInput')?.value.trim();
      const crop = document.getElementById('seedCropInput')?.value.trim();
      const breeder = document.getElementById('seedBreederInput')?.value.trim() || 'State Agriculture Dept';
      const duration = document.getElementById('seedDurationInput')?.value || '110';
      const germ = document.getElementById('seedGermInput')?.value || '85';
      const traits = document.getElementById('seedTraitsInput')?.value.trim() || 'Certified variety';

      if (!name) return;

      const tbody = document.getElementById('seedTableBody');
      if (tbody) {
        const id = 'seed-' + Date.now();
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition';
        tr.setAttribute('data-id', id);
        tr.innerHTML = \`
          <td class="px-5 py-3.5 font-bold text-[#0F172A]">\${name}</td>
          <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold text-[10px]">\${crop}</span></td>
          <td class="px-5 py-3.5 text-slate-600">\${breeder}</td>
          <td class="px-5 py-3.5 font-mono">\${duration} Days</td>
          <td class="px-5 py-3.5 font-mono font-bold text-emerald-700">\${germ}% Min</td>
          <td class="px-5 py-3.5 text-slate-700">\${traits}</td>
          <td class="px-5 py-3.5 text-right">
            <div class="flex items-center justify-end gap-1.5">
              <button type="button" onclick="openViewSeedModal('\${id}')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View</button>
              <button type="button" onclick="deleteSeed('\${id}')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
            </div>
          </td>
        \`;
        tbody.prepend(tr);
        if (window.lucide && typeof lucide.createIcons === 'function') {
          try { lucide.createIcons(); } catch(_) {}
        }
      }

      closeAddSeedModal();
      showToast('Seed variety "' + name + '" registered!', 'success');
    }

    function deleteSeed(seedId) {
      if (!confirm('Are you sure you want to remove this seed entry?')) return;
      const row = document.querySelector(\`tr[data-id="\${seedId}"]\`);
      if (row) {
        row.remove();
        showToast('Seed variety removed', 'info');
      }
    }

    function openViewSeedModal(seedId) {
      const modal = document.getElementById('viewSeedModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeViewSeedModal() {
      const modal = document.getElementById('viewSeedModal');
      if (modal) modal.classList.add('hidden');
    }

    // ─── COMPOST & ORGANIC CONTROLLERS ──────────────────────────────────────────
    function openAddCompostModal() {
      const modal = document.getElementById('addCompostModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeAddCompostModal() {
      const modal = document.getElementById('addCompostModal');
      if (modal) modal.classList.add('hidden');
    }

    function handleSaveCompost(e) {
      e.preventDefault();
      const name = document.getElementById('compostNameInput')?.value.trim();
      const category = document.getElementById('compostCategoryInput')?.value;
      const days = document.getElementById('compostDaysInput')?.value || '7';
      const ingredients = document.getElementById('compostIngredientsInput')?.value.trim() || 'Natural ingredients';

      if (!name) return;

      const grid = document.getElementById('compostGridContainer');
      if (grid) {
        const id = 'compost-' + Date.now();
        const card = document.createElement('div');
        card.className = 'saas-card p-5 flex flex-col justify-between compost-card';
        card.setAttribute('data-id', id);

        card.innerHTML = \`
          <div>
            <span class="px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#0B6623] border border-emerald-200 text-[10px] font-bold">\${category}</span>
            <h3 class="font-extrabold text-[#0F172A] text-base mt-2">\${name}</h3>
            <p class="text-xs text-slate-600 mt-1">\${ingredients}. Ready in \${days} days.</p>
          </div>
          <div class="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
            <span class="text-xs font-bold text-emerald-700">Custom Recipe</span>
            <div class="flex items-center gap-1.5">
              <button type="button" onclick="openViewCompostModal('\${id}')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold text-xs hover:bg-emerald-100">Recipe</button>
              <button type="button" onclick="deleteCompost('\${id}')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
            </div>
          </div>
        \`;
        grid.prepend(card);
        if (window.lucide && typeof lucide.createIcons === 'function') {
          try { lucide.createIcons(); } catch(_) {}
        }
      }

      closeAddCompostModal();
      showToast('Formulation "' + name + '" saved to Organic Hub!', 'success');
    }

    function deleteCompost(compostId) {
      if (!confirm('Are you sure you want to delete this organic formulation?')) return;
      const card = document.querySelector(\`div[data-id="\${compostId}"]\`);
      if (card) {
        card.remove();
        showToast('Formulation deleted', 'info');
      }
    }

    function openViewCompostModal(compostId) {
      const modal = document.getElementById('viewCompostModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeViewCompostModal() {
      const modal = document.getElementById('viewCompostModal');
      if (modal) modal.classList.add('hidden');
    }

    // ─── FARM MANAGER CONTROLLERS ───────────────────────────────────────────────
    function openAddFarmModal() {
      const modal = document.getElementById('addFarmModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeAddFarmModal() {
      const modal = document.getElementById('addFarmModal');
      if (modal) modal.classList.add('hidden');
    }

    function handleSaveFarm(e) {
      e.preventDefault();
      const title = document.getElementById('farmTitleInput')?.value.trim();
      const owner = document.getElementById('farmOwnerInput')?.value.trim();
      const village = document.getElementById('farmVillageInput')?.value.trim();
      const survey = document.getElementById('farmSurveyInput')?.value.trim() || '101';
      const acres = document.getElementById('farmAcresInput')?.value || '4.0';
      const irrig = document.getElementById('farmIrrigInput')?.value || 'Drip';
      const crop = document.getElementById('farmCropInput')?.value.trim() || 'Cotton';

      if (!title || !owner) return;

      const tbody = document.getElementById('farmTableBody');
      if (tbody) {
        const id = 'farm-' + Date.now();
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition';
        tr.setAttribute('data-id', id);

        tr.innerHTML = \`
          <td class="px-5 py-3.5">
            <div class="font-bold text-[#0F172A]">\${title}</div>
            <div class="text-[11px] text-slate-500">Owner: \${owner}</div>
          </td>
          <td class="px-5 py-3.5">\${village}</td>
          <td class="px-5 py-3.5 font-mono">\${survey}</td>
          <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">\${acres} Acres</td>
          <td class="px-5 py-3.5 font-bold">\${crop}</td>
          <td class="px-5 py-3.5"><span class="px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold text-[10px]">\${irrig}</span></td>
          <td class="px-5 py-3.5 text-right">
            <div class="flex items-center justify-end gap-1.5">
              <button type="button" onclick="openViewFarmModal('\${id}')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View Details</button>
              <button type="button" onclick="deleteFarm('\${id}')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
            </div>
          </td>
        \`;
        tbody.prepend(tr);
        if (window.lucide && typeof lucide.createIcons === 'function') {
          try { lucide.createIcons(); } catch(_) {}
        }
      }

      closeAddFarmModal();
      showToast('Farm parcel "' + title + '" registered!', 'success');
    }

    function deleteFarm(farmId) {
      if (!confirm('Are you sure you want to remove this farm parcel?')) return;
      const row = document.querySelector(\`tr[data-id="\${farmId}"]\`);
      if (row) {
        row.remove();
        showToast('Farm parcel removed', 'info');
      }
    }

    function openViewFarmModal(farmId) {
      const modal = document.getElementById('viewFarmModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeViewFarmModal() {
      const modal = document.getElementById('viewFarmModal');
      if (modal) modal.classList.add('hidden');
    }

    // ─── WEATHER STATION CONTROLLERS ────────────────────────────────────────────
    function changeWeatherTaluka(taluka) {
      const titleEl = document.getElementById('weatherCardTaluka');
      const tempEl = document.getElementById('weatherCardTemp');
      if (titleEl) titleEl.textContent = taluka + ' Taluka (Amreli District)';

      const temps = {
        'Amreli': '32°C',
        'Bagasara': '33°C',
        'Dhari': '31°C',
        'Babra': '34°C',
        'Rajula': '30°C',
        'Savarkundla': '32°C',
        'Jafrabad': '29°C',
        'Lathi': '33°C',
        'Lilia': '32°C',
        'Khambha': '31°C'
      };
      if (tempEl) tempEl.textContent = temps[taluka] || '32°C';
      showToast('Loaded micro-climate weather feed for ' + taluka, 'info');
    }

    // ─── SCHEME APPLICATIONS CONTROLLERS ────────────────────────────────────────
    function openAddSchemeModal() {
      const modal = document.getElementById('addSchemeModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeAddSchemeModal() {
      const modal = document.getElementById('addSchemeModal');
      if (modal) modal.classList.add('hidden');
    }

    function handleSaveScheme(e) {
      e.preventDefault();
      const farmer = document.getElementById('schemeFarmerInput')?.value.trim();
      const mobile = document.getElementById('schemeMobileInput')?.value.trim() || '';
      const scheme = document.getElementById('schemeSelectInput')?.value;
      const taluka = document.getElementById('schemeTalukaInput')?.value.trim() || 'Bagasara';
      const amount = document.getElementById('schemeAmountInput')?.value.trim() || '50,000';

      if (!farmer) return;

      const tbody = document.getElementById('schemeTableBody');
      if (tbody) {
        const id = 'sch-' + Date.now();
        const tr = document.createElement('tr');
        tr.className = 'hover:bg-slate-50 transition';
        tr.setAttribute('data-id', id);

        tr.innerHTML = \`
          <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">#IKH-2026-\${Math.floor(Math.random()*800+100)}</td>
          <td class="px-5 py-3.5">
            <div class="font-bold text-[#0F172A]">\${farmer}</div>
            <div class="text-[11px] text-slate-500">\${mobile} · \${taluka}</div>
          </td>
          <td class="px-5 py-3.5 font-bold">\${scheme}</td>
          <td class="px-5 py-3.5 font-mono font-bold text-[#0B6623]">₹ \${amount}</td>
          <td class="px-5 py-3.5">\${taluka}</td>
          <td class="px-5 py-3.5"><span class="px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 font-bold border border-blue-200 text-[10px]">Applied · In Review</span></td>
          <td class="px-5 py-3.5 text-right">
            <div class="flex items-center justify-end gap-1.5">
              <button type="button" onclick="openViewSchemeModal('\${id}')" class="px-3 py-1 rounded-lg bg-emerald-50 text-[#0B6623] font-bold hover:bg-emerald-100 transition">View Dossier</button>
              <button type="button" onclick="deleteScheme('\${id}')" class="p-1 text-slate-400 hover:text-rose-600" title="Delete"><i data-lucide="trash-2" class="w-3.5 h-3.5"></i></button>
            </div>
          </td>
        \`;
        tbody.prepend(tr);
        if (window.lucide && typeof lucide.createIcons === 'function') {
          try { lucide.createIcons(); } catch(_) {}
        }
      }

      closeAddSchemeModal();
      showToast('Scheme application for "' + farmer + '" submitted to i-Khedut desk!', 'success');
    }

    function deleteScheme(appId) {
      if (!confirm('Are you sure you want to delete this scheme application?')) return;
      const row = document.querySelector(\`tr[data-id="\${appId}"]\`);
      if (row) {
        row.remove();
        showToast('Application deleted', 'info');
      }
    }

    function openViewSchemeModal(appId) {
      const modal = document.getElementById('viewSchemeModal');
      if (modal) modal.classList.remove('hidden');
      if (window.lucide && typeof lucide.createIcons === 'function') {
        try { lucide.createIcons(); } catch(_) {}
      }
    }

    function closeViewSchemeModal() {
      const modal = document.getElementById('viewSchemeModal');
      if (modal) modal.classList.add('hidden');
    }
`;

module.exports = { fieldHtml, fieldJs };
