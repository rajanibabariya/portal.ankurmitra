// patch_user_module.js
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. KPI cards update in view-user-list
// Card 1
html = html.replace(
  '<div class="text-2xl font-black text-[#0F172A] mt-2">2,528</div>',
  '<div id="kpiTotalUsersCount" class="text-2xl font-black text-[#0F172A] mt-2">2,528</div>'
);
// Card 2
html = html.replace(
  '<div class="text-2xl font-black text-[#0F172A] mt-2">1,420</div>',
  '<div id="kpiFarmersCount" class="text-2xl font-black text-[#0F172A] mt-2">1,420</div>'
);
// Card 3
html = html.replace(
  '<div class="text-2xl font-black text-[#0F172A] mt-2">680</div>',
  '<div id="kpiDealersCount" class="text-2xl font-black text-[#0F172A] mt-2">680</div>'
);
// Card 4
html = html.replace(
  '<div class="text-2xl font-black text-[#0F172A] mt-2">380</div>',
  '<div id="kpiIndustrialCount" class="text-2xl font-black text-[#0F172A] mt-2">380</div>'
);
// Card 5
html = html.replace(
  '<div class="text-2xl font-black text-indigo-900 mt-2">48</div>',
  '<div id="kpiStaffCount" class="text-2xl font-black text-indigo-900 mt-2">48</div>'
);
console.log('Updated KPI card IDs');

// 2. "Add new" button in view-user-list -> openCreateUserForm()
const oldAddBtn = `<!-- Button: "Add new" -->
                  <button onclick="navigateTo('new-user', 'Users', 'New user')" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition">
                    <i data-lucide="user-plus" class="w-3.5 h-3.5"></i> Add new
                  </button>`;

const newAddBtn = `<!-- Button: "Add new" -->
                  <button onclick="openCreateUserForm()" class="h-9 px-4 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 shadow-sm transition">
                    <i data-lucide="user-plus" class="w-3.5 h-3.5"></i> Add new
                  </button>`;

if (html.includes(oldAddBtn)) {
  html = html.replace(oldAddBtn, newAddBtn);
  console.log('Updated Add new button to openCreateUserForm()');
}

// 3. New User Card Title & Submit Button in view-new-user
html = html.replace(
  '<h2 class="text-2xl font-extrabold text-[#0F172A] mt-1">Register New User</h2>',
  '<h2 id="newUserCardTitle" class="text-2xl font-extrabold text-[#0F172A] mt-1">Register New User</h2>'
);

const oldSubmitBtn = `<button type="submit" class="h-10 px-6 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition">
                        <i data-lucide="check" class="w-4 h-4"></i> Save User
                      </button>`;

const newSubmitBtn = `<button type="submit" id="newUserSubmitBtn" class="h-10 px-6 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-xs flex items-center gap-2 transition">
                        <i data-lucide="check" class="w-4 h-4" id="newUserSubmitBtnIcon"></i> <span id="newUserSubmitBtnText">Save User</span>
                      </button>`;

if (html.includes(oldSubmitBtn)) {
  html = html.replace(oldSubmitBtn, newSubmitBtn);
  console.log('Updated Submit button in new-user form');
}

// 4. In view-user-detail: add Edit Profile button
const oldDetailActionDiv = `<div class="flex items-center gap-2">
                    <button onclick="handleUserApprovalAction('reject')" class="h-9 px-4 bg-red-50 hover:bg-red-100 text-[#EF4444] border border-red-200 text-xs font-bold rounded-xl transition">
                      Reject
                    </button>
                    <button onclick="handleUserApprovalAction('approve')" class="h-9 px-5 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-xs transition">
                      Approve
                    </button>
                  </div>`;

const newDetailActionDiv = `<div class="flex items-center gap-2">
                    <button onclick="handleUserApprovalAction('reject')" class="h-9 px-4 bg-red-50 hover:bg-red-100 text-[#EF4444] border border-red-200 text-xs font-bold rounded-xl transition">
                      Reject
                    </button>
                    <button onclick="handleUserApprovalAction('approve')" class="h-9 px-5 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl shadow-xs transition">
                      Approve
                    </button>
                    <button onclick="editUserFromDetail()" class="h-9 px-4 bg-slate-100 hover:bg-slate-200 text-[#0F172A] border border-slate-200 text-xs font-bold rounded-xl transition inline-flex items-center gap-1.5">
                      <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Edit Profile
                    </button>
                  </div>`;

if (html.includes(oldDetailActionDiv)) {
  html = html.replace(oldDetailActionDiv, newDetailActionDiv);
  console.log('Added Edit Profile button to user detail view');
}

// 5. Remove old duplicate updateNewUserPreview at ~1301234
const oldUnpFunc = `    function updateNewUserPreview() {
      const name = document.getElementById('newUserNameInput')?.value || 'New User';
      const mobile = document.getElementById('newUserMobileInput')?.value || '+91 98250 12345';
      const role = document.getElementById('newUserRoleSelect')?.value || 'Farmer';
      const village = document.getElementById('newUserVillageInput')?.value || 'Sudavad';
      const district = document.getElementById('newUserDistrictInput')?.value || 'Amreli';
      const crop = document.getElementById('newUserCropSelect')?.value || 'Wheat';
      const firm = document.getElementById('newUserFirmInput')?.value || (name + ' Farm');

      const pName = document.getElementById('previewBadgeName');
      const pFirm = document.getElementById('previewBadgeFirm');
      const pRole = document.getElementById('previewBadgeRole');
      const pPlace = document.getElementById('previewBadgePlace');
      const pCrop = document.getElementById('previewBadgeCrop');
      const pMobile = document.getElementById('previewBadgeMobile');
      const pAvatar = document.getElementById('previewBadgeAvatar');

      if (pName) pName.textContent = name;
      if (pFirm) pFirm.textContent = firm;
      if (pRole) pRole.textContent = role;
      if (pPlace) pPlace.textContent = \`\${village}, \${district}\`;
      if (pCrop) pCrop.textContent = crop;
      if (pMobile) pMobile.textContent = mobile;
      if (pAvatar) {
        const initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
        pAvatar.textContent = initials || 'NU';
      }
    }`;

if (html.includes(oldUnpFunc)) {
  html = html.replace(oldUnpFunc, '// (old updateNewUserPreview migrated to modern implementation)');
  console.log('Removed duplicate updateNewUserPreview #1');
}

// 6. Remove old stub handleCreateUser at ~1359294
const oldHcuStub = `    function handleCreateUser(e) {
      e.preventDefault();
      showToast('New user registered successfully', 'success');
      navigateTo('user-list');
    }`;

if (html.includes(oldHcuStub)) {
  html = html.replace(oldHcuStub, '// (handleCreateUser migrated to complete user management suite)');
  console.log('Removed old stub handleCreateUser at 1359294');
}

// 7. Replace the User Management Suite around 1457577
const oldHcuSuite = `// ----------------------------------------------------------------------------
// 9. CREATE USER CONTROLLER
// ----------------------------------------------------------------------------
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
  }, 900);
}`;

const fullUserManagementSuite = `// ----------------------------------------------------------------------------
// 9. UNIFIED USER REGISTRY & DATA MAPPING ENGINE (List <-> Create/Edit Two-way)
// ----------------------------------------------------------------------------
window.CURRENT_EDITING_USER_ID = null;
window.CURRENT_VIEWING_USER_ID = null;

// Initial 12 comprehensive seed users across all 5 roles
const INITIAL_SEED_USERS = [
  {
    id: "USR-FM-8821",
    name: "Jayesh Patel",
    role: "Farmer",
    place: "Sudavad",
    taluka: "Bagasara",
    district: "Amreli",
    mobile: "+91 98251 44210",
    email: "jayesh.patel@farmer.in",
    status: "Active",
    subtitle: "Farm ID: #FM-8821 · 4.5 Acres",
    firm: "Patel Agro Farms",
    details: "Groundnut, Cotton, Wheat",
    acres: "4.5",
    created: "2026-06-12"
  },
  {
    id: "USR-DLR-4420",
    name: "Rameshbhai Patel",
    role: "Dealer",
    place: "Bagasara",
    taluka: "Bagasara",
    district: "Amreli",
    mobile: "+91 94282 11980",
    email: "ramesh@kishanagro.in",
    status: "Active",
    subtitle: "Kishan Agro Agrochemicals",
    firm: "Kishan Agro",
    details: "Urea, DAP, Certified Seeds",
    license: "AGR-DL-2026-901",
    created: "2026-06-15"
  },
  {
    id: "USR-RET-3310",
    name: "Rambhai",
    role: "Retailer",
    place: "Bagasara",
    taluka: "Bagasara",
    district: "Amreli",
    mobile: "+91 99099 33240",
    email: "rambhai@krishikendra.in",
    status: "Active",
    subtitle: "Krishi Seva Kendra",
    firm: "Krishi Seva Kendra",
    details: "Pesticides, Micronutrients",
    license: "RET-GUJ-7712",
    created: "2026-07-01"
  },
  {
    id: "USR-IND-1002",
    name: "Hiteshbhai Patel",
    role: "Industrial",
    place: "Amreli",
    taluka: "Amreli",
    district: "Amreli",
    mobile: "+91 97243 88102",
    email: "hitesh@patelagroind.com",
    status: "Pending",
    subtitle: "Patel Agro Industries · Ginning & Oil Mill",
    firm: "Patel Agro Industries",
    details: "Cotton F2I Procurement, 120 MT Ginning",
    gst: "24AAACP4412L1Z4",
    created: "2026-10-24"
  },
  {
    id: "USR-FM-8822",
    name: "Kantibhai Savaliya",
    role: "Farmer",
    place: "Sudavad",
    taluka: "Bagasara",
    district: "Amreli",
    mobile: "+91 98791 22345",
    email: "kantibhai@farmer.in",
    status: "Active",
    subtitle: "Farm ID: #FM-8822 · 6.0 Acres",
    firm: "Savaliya Farm",
    details: "Cotton, Cumin, Mustard",
    acres: "6.0",
    created: "2026-07-10"
  },
  {
    id: "USR-FM-8823",
    name: "Bhavesh Thummar",
    role: "Farmer",
    place: "Bagasara",
    taluka: "Bagasara",
    district: "Amreli",
    mobile: "+91 94263 77123",
    email: "bhavesh@farmer.in",
    status: "Active",
    subtitle: "Farm ID: #FM-8823 · 8.2 Acres",
    firm: "Thummar Krishi",
    details: "Groundnut, Sesame",
    acres: "8.2",
    created: "2026-07-22"
  },
  {
    id: "USR-FM-8824",
    name: "Mansukhbhai Vaghasiya",
    role: "Farmer",
    place: "Dhari",
    taluka: "Dhari",
    district: "Amreli",
    mobile: "+91 98242 55678",
    email: "mansukh@farmer.in",
    status: "Active",
    subtitle: "Farm ID: #FM-8824 · 3.8 Acres",
    firm: "Vaghasiya Farm",
    details: "Cotton, Wheat",
    acres: "3.8",
    created: "2026-08-05"
  },
  {
    id: "USR-IND-1003",
    name: "Saurashtra Ginning Corp",
    role: "Industrial",
    place: "Amreli",
    taluka: "Amreli",
    district: "Amreli",
    mobile: "+91 98795 44100",
    email: "procurement@saurashtragin.in",
    status: "Rejected",
    subtitle: "Saurashtra Ginning & Pressing",
    firm: "Saurashtra Ginning Corp",
    details: "Cotton Lint & Bales",
    gst: "24AABCS8891P1ZV",
    created: "2026-08-18"
  },
  {
    id: "USR-STF-001",
    name: "Rajesh Patel",
    role: "Staff",
    place: "Amreli HQ",
    taluka: "Amreli",
    district: "Amreli",
    mobile: "+91 98250 11001",
    email: "admin@ankurmitra.in",
    status: "Active",
    subtitle: "Super Administrator · System Lead",
    firm: "Rudram Core Team",
    details: "Full Platform Admin Access",
    username: "rajesh.patel",
    dept: "System Health and DevOps",
    created: "2026-01-10"
  },
  {
    id: "USR-STF-002",
    name: "Dr. Vikram Mehta",
    role: "Staff",
    place: "Amreli Hub",
    taluka: "Amreli",
    district: "Amreli",
    mobile: "+91 98790 22014",
    email: "vikram.mehta@ankurmitra.in",
    status: "Active",
    subtitle: "Chief Agronomist · Crop Advisory Lead",
    firm: "Agronomy Command",
    details: "Advisory, Disease Diagnostic & Lab",
    username: "dr.vikram",
    dept: "Agronomy Intelligence Desk",
    created: "2026-02-15"
  },
  {
    id: "USR-STF-003",
    name: "Neha Trivedi",
    role: "Staff",
    place: "Bagasara Depot",
    taluka: "Bagasara",
    district: "Amreli",
    mobile: "+91 99092 33451",
    email: "neha.trivedi@ankurmitra.in",
    status: "Active",
    subtitle: "Logistics Supervisor · Hub Dispatch",
    firm: "Logistics & Supply Desk",
    details: "Fleet Tracking & Mandi Weighment",
    username: "neha.t",
    dept: "Logistics and Fleet Operations",
    created: "2026-03-01"
  },
  {
    id: "USR-STF-004",
    name: "Amit Desai",
    role: "Staff",
    place: "Central Command",
    taluka: "Amreli",
    district: "Amreli",
    mobile: "+91 98244 55190",
    email: "amit.desai@ankurmitra.in",
    status: "Active",
    subtitle: "Field Operations Specialist",
    firm: "Field Service Unit",
    details: "Dealer Onboarding & IoT Gateways",
    username: "amit.desai",
    dept: "Customer Support Desk",
    created: "2026-03-20"
  }
];

// Initialize registry from localStorage or seed
function initUsersRegistry() {
  try {
    const stored = localStorage.getItem("ankurmitra_users_registry");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length > 0) {
        window.ANKURMITRA_USERS = parsed;
        return;
      }
    }
  } catch (_) {}
  window.ANKURMITRA_USERS = [...INITIAL_SEED_USERS];
  try {
    localStorage.setItem("ankurmitra_users_registry", JSON.stringify(window.ANKURMITRA_USERS));
  } catch (_) {}
}

// Render dynamic user list table
function renderUsersTable() {
  if (!window.ANKURMITRA_USERS || window.ANKURMITRA_USERS.length === 0) {
    initUsersRegistry();
  }
  const tbody = document.getElementById("usersTableBody");
  if (!tbody) return;

  const users = window.ANKURMITRA_USERS || [];
  
  const roleThemes = {
    Farmer: { badgeBg: "bg-emerald-50 text-[#0B6623] border-emerald-200", avatarBg: "bg-emerald-100 text-[#0B6623]" },
    Dealer: { badgeBg: "bg-amber-50 text-amber-700 border-amber-200", avatarBg: "bg-amber-100 text-amber-800" },
    Retailer: { badgeBg: "bg-blue-50 text-blue-700 border-blue-200", avatarBg: "bg-blue-100 text-blue-800" },
    Industrial: { badgeBg: "bg-purple-50 text-purple-700 border-purple-200", avatarBg: "bg-purple-100 text-purple-800" },
    Staff: { badgeBg: "bg-indigo-50 text-indigo-700 border-indigo-200", avatarBg: "bg-indigo-100 text-indigo-800" }
  };

  let rowsHtml = "";
  users.forEach(user => {
    const theme = roleThemes[user.role] || roleThemes.Farmer;
    
    let statusBadge = "";
    if (user.status === "Active") {
      statusBadge = \`<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#0B6623]">
        <span class="w-1.5 h-1.5 rounded-full bg-[#0B6623]"></span> Active
      </span>\`;
    } else if (user.status === "Pending") {
      statusBadge = \`<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
        <span class="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span> Pending
      </span>\`;
    } else {
      statusBadge = \`<span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
        <span class="w-1.5 h-1.5 rounded-full bg-rose-600"></span> Rejected
      </span>\`;
    }

    const initials = (user.name || "U").split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() || "U";

    rowsHtml += \`
      <tr class="user-row hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition" 
          data-id="\${user.id}" 
          data-name="\${user.name}" 
          data-role="\${user.role}" 
          data-place="\${user.place}" 
          data-mobile="\${user.mobile}" 
          data-status="\${user.status}">
        <td class="py-3 px-4">
          <div class="flex items-center gap-2.5">
            <div class="w-7 h-7 rounded-full \${theme.avatarBg} font-bold flex items-center justify-center text-xs shrink-0">\${initials}</div>
            <div>
              <div class="font-bold text-[#0F172A] dark:text-white">\${user.name}</div>
              <div class="text-[10px] text-[#64748B] dark:text-slate-400">\${user.subtitle || user.firm || user.id}</div>
            </div>
          </div>
        </td>
        <td class="py-3 px-4">
          <span class="px-2.5 py-0.5 rounded-full font-bold text-[10px] border \${theme.badgeBg}">\${user.role}</span>
        </td>
        <td class="py-3 px-4 font-medium text-[#0F172A] dark:text-slate-300">\${user.place}</td>
        <td class="py-3 px-4 font-mono text-[#64748B] dark:text-slate-400">\${user.mobile}</td>
        <td class="py-3 px-4">\${statusBadge}</td>
        <td class="py-3 px-4 text-right whitespace-nowrap">
          <div class="inline-flex items-center gap-1.5">
            <button onclick="openUserRecord('\${user.id}')" class="px-2 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/40 dark:hover:bg-emerald-900 text-[#0B6623] dark:text-emerald-400 font-bold text-xs inline-flex items-center gap-1 transition" title="View Profile">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i> View
            </button>
            <button onclick="editUserRecord('\${user.id}')" class="px-2 py-1 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0F172A] dark:text-white font-bold text-xs inline-flex items-center gap-1 transition" title="Edit User">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i> Edit
            </button>
            <button onclick="toggleUserStatus('\${user.id}')" class="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-[#64748B] transition" title="Toggle Status (Active/Pending)">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </td>
      </tr>\`;
  });

  tbody.innerHTML = rowsHtml;

  // Update KPI card numbers
  const totalCount = users.length;
  const farmerCount = users.filter(u => u.role === "Farmer").length;
  const dealerCount = users.filter(u => u.role === "Dealer" || u.role === "Retailer").length;
  const industrialCount = users.filter(u => u.role === "Industrial").length;
  const staffCount = users.filter(u => u.role === "Staff").length;

  const kTotal = document.getElementById("kpiTotalUsersCount");
  if (kTotal) kTotal.textContent = totalCount;
  const kFarmer = document.getElementById("kpiFarmersCount");
  if (kFarmer) kFarmer.textContent = farmerCount;
  const kDealer = document.getElementById("kpiDealersCount");
  if (kDealer) kDealer.textContent = dealerCount;
  const kInd = document.getElementById("kpiIndustrialCount");
  if (kInd) kInd.textContent = industrialCount;
  const kStaff = document.getElementById("kpiStaffCount");
  if (kStaff) kStaff.textContent = staffCount;

  // Apply current search / role / status filters
  filterUserList();

  if (window.lucide && typeof lucide.createIcons === "function") {
    try { lucide.createIcons(); } catch (_) {}
  }
}

// Open clean form for registering a new user
function openCreateUserForm() {
  window.CURRENT_EDITING_USER_ID = null;
  clearNewUserForm();
  
  const title = document.getElementById("newUserCardTitle");
  if (title) title.textContent = "Register New User";

  const btnText = document.getElementById("newUserSubmitBtnText");
  if (btnText) btnText.textContent = "Save User";

  navigateTo("new-user", "Users", "New user");
}

// Open form prefilled with user data for editing
function editUserRecord(userId) {
  if (!window.ANKURMITRA_USERS) initUsersRegistry();
  const user = window.ANKURMITRA_USERS.find(u => u.id === userId || u.name === userId);
  if (!user) {
    if (typeof showToast === "function") showToast("User record not found", "error");
    return;
  }

  window.CURRENT_EDITING_USER_ID = user.id;

  // Set card title and button
  const title = document.getElementById("newUserCardTitle");
  if (title) title.textContent = \`Edit User Profile: \${user.name}\`;

  const btnText = document.getElementById("newUserSubmitBtnText");
  if (btnText) btnText.textContent = "Update User";

  // Prefill core credentials
  const nameInput = document.getElementById("newUserNameInput");
  if (nameInput) nameInput.value = user.name || "";
  const mobInput = document.getElementById("newUserMobileInput");
  if (mobInput) mobInput.value = user.mobile || "";
  const emailInput = document.getElementById("newUserEmailInput");
  if (emailInput) emailInput.value = user.email || "";

  // Set role
  const roleSelect = document.getElementById("newUserRoleSelect");
  if (roleSelect) {
    roleSelect.value = user.role;
    handleUserRoleChange(user.role);
  }

  // Location fields
  const distSelect = document.getElementById("newUserDistrictSelect");
  if (distSelect && user.district) distSelect.value = user.district;

  // Role specific values
  if (user.role === "Farmer") {
    const acreInput = document.getElementById("newUserAcreageInput");
    if (acreInput && user.acres) acreInput.value = user.acres;
  } else if (user.role === "Dealer") {
    const dealerFirm = document.getElementById("newUserDealerFirmInput");
    if (dealerFirm && user.firm) dealerFirm.value = user.firm;
  } else if (user.role === "Retailer") {
    const retShop = document.getElementById("newUserRetailerShopInput");
    if (retShop && user.firm) retShop.value = user.firm;
  } else if (user.role === "Industrial") {
    const indUnit = document.getElementById("newUserIndustrialUnitInput");
    if (indUnit && user.firm) indUnit.value = user.firm;
  } else if (user.role === "Staff") {
    const staffUser = document.getElementById("newStaffUsernameInput");
    if (staffUser && user.username) staffUser.value = user.username;
    const staffDept = document.getElementById("newStaffDeptSelect");
    if (staffDept && user.dept) staffDept.value = user.dept;
  }

  // Status checkbox
  const statusCheck = document.getElementById("provisionStatusActiveCheck");
  if (statusCheck) statusCheck.checked = (user.status === "Active");

  // Update live preview
  updateNewUserPreview();

  // Navigate to new-user page
  navigateTo("new-user", "Users", "Edit User");
}

// Handle submit for both Create & Edit
function handleCreateUser(e) {
  if (e) e.preventDefault();
  if (!window.ANKURMITRA_USERS) initUsersRegistry();

  const name = (document.getElementById("newUserNameInput")?.value || "").trim() || "New User";
  const mobile = (document.getElementById("newUserMobileInput")?.value || "").trim() || "+91 98000 00000";
  const email = (document.getElementById("newUserEmailInput")?.value || "").trim();
  const role = document.getElementById("newUserRoleSelect")?.value || "Farmer";

  // Location
  const district = document.getElementById("newUserDistrictSelect")?.value || "Amreli";
  const taluka = document.getElementById("newUserTalukaSelect")?.value || "Bagasara";
  const village = document.getElementById("newUserVillageSelect")?.value || "Sudavad";
  const place = village || taluka || district;

  // Status
  const isActive = document.getElementById("provisionStatusActiveCheck")?.checked !== false;
  const status = isActive ? "Active" : "Pending";

  // Role specifics
  let subtitle = "";
  let firm = "";
  let details = "";
  let acres = "";
  let username = "";
  let dept = "";

  if (role === "Farmer") {
    acres = document.getElementById("newUserAcreageInput")?.value || "5.0";
    const selectedCrops = Array.from(document.querySelectorAll("#newUserCropChips .crop-chip.selected")).map(c => c.textContent.trim()).join(", ") || "Cotton, Groundnut";
    firm = \`\${name} Farm\`;
    details = selectedCrops;
    subtitle = \`Farm ID: #FM-\${Math.floor(1000 + Math.random() * 9000)} · \${acres} Acres\`;
  } else if (role === "Dealer") {
    firm = document.getElementById("newUserDealerFirmInput")?.value.trim() || "Kishan Agro";
    details = "Urea, DAP, Certified Seeds";
    subtitle = firm;
  } else if (role === "Retailer") {
    firm = document.getElementById("newUserRetailerShopInput")?.value.trim() || "Krishi Seva Kendra";
    details = "Pesticides, Micronutrients";
    subtitle = firm;
  } else if (role === "Industrial") {
    firm = document.getElementById("newUserIndustrialUnitInput")?.value.trim() || "Patel Agro Industries";
    details = "Cotton Ginning & Pressing";
    subtitle = \`\${firm} · Industrial Mill\`;
  } else if (role === "Staff") {
    username = document.getElementById("newStaffUsernameInput")?.value.trim() || "staff.user";
    dept = document.getElementById("newStaffDeptSelect")?.value || "Platform Operations";
    firm = dept;
    details = "Platform Administration";
    subtitle = \`\${dept} · @\${username}\`;
  }

  if (window.CURRENT_EDITING_USER_ID) {
    // Update existing user
    const idx = window.ANKURMITRA_USERS.findIndex(u => u.id === window.CURRENT_EDITING_USER_ID);
    if (idx !== -1) {
      window.ANKURMITRA_USERS[idx] = {
        ...window.ANKURMITRA_USERS[idx],
        name,
        mobile,
        email,
        role,
        place,
        district,
        taluka,
        village,
        status,
        subtitle: subtitle || window.ANKURMITRA_USERS[idx].subtitle,
        firm: firm || window.ANKURMITRA_USERS[idx].firm,
        details: details || window.ANKURMITRA_USERS[idx].details,
        acres,
        username,
        dept
      };
      if (typeof showToast === "function") {
        showToast(\`Successfully updated profile for "\${name}".\`, "success");
      }
    }
    window.CURRENT_EDITING_USER_ID = null;
  } else {
    // Create new user
    const rolePrefix = role.substring(0, 3).toUpperCase();
    const newId = \`USR-\${rolePrefix}-\${Math.floor(1000 + Math.random() * 9000)}\`;
    const newUser = {
      id: newId,
      name,
      role,
      place,
      district,
      taluka,
      village,
      mobile,
      email,
      status,
      subtitle,
      firm,
      details,
      acres,
      username,
      dept,
      created: new Date().toISOString().split("T")[0]
    };
    window.ANKURMITRA_USERS.unshift(newUser);
    if (typeof showToast === "function") {
      showToast(\`Successfully provisioned \${role} profile for "\${name}".\`, "success");
    }
  }

  // Persist to localStorage
  try {
    localStorage.setItem("ankurmitra_users_registry", JSON.stringify(window.ANKURMITRA_USERS));
  } catch (_) {}

  // Refresh user list and navigate back
  renderUsersTable();
  navigateTo("user-list", "Users", "User list");
}

// Open user detail page with user data
function openUserRecord(idOrName, role, place, mobile, status, firm, demand) {
  if (!window.ANKURMITRA_USERS) initUsersRegistry();
  
  let user = window.ANKURMITRA_USERS.find(u => u.id === idOrName || u.name === idOrName);
  if (!user && role) {
    user = { id: idOrName, name: idOrName, role, place, mobile, status, firm, details: demand };
  }
  if (!user) {
    if (typeof showToast === "function") showToast("User not found", "error");
    return;
  }

  window.CURRENT_VIEWING_USER_ID = user.id;

  const nameEl = document.getElementById("detailUserName");
  const subEl = document.getElementById("detailUserSubtitle");
  const mobEl = document.getElementById("detailUserMobile");
  const demEl = document.getElementById("detailUserDemand");
  const plcEl = document.getElementById("detailUserPlace");
  const stBadge = document.getElementById("detailStatusBadge");

  if (nameEl) nameEl.textContent = user.name;
  if (subEl) subEl.textContent = user.subtitle || \`\${user.firm || user.name} · \${user.role} Unit\`;
  if (mobEl) mobEl.textContent = user.mobile;
  if (demEl) demEl.textContent = user.details || "Produce Fulfillment";
  if (plcEl) plcEl.textContent = \`\${user.place}, \${user.district || "Amreli"} Region\`;
  
  if (stBadge) {
    stBadge.textContent = user.status;
    if (user.status === "Active") {
      stBadge.className = "px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#0B6623]";
    } else if (user.status === "Pending") {
      stBadge.className = "px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800";
    } else {
      stBadge.className = "px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800";
    }
  }

  navigateTo("user-detail", "Users", "User detail");
}

// Edit the user currently opened in detail view
function editUserFromDetail() {
  if (window.CURRENT_VIEWING_USER_ID) {
    editUserRecord(window.CURRENT_VIEWING_USER_ID);
  }
}

// Approve or reject user from detail view
function handleUserApprovalAction(action) {
  if (!window.ANKURMITRA_USERS) initUsersRegistry();
  const user = window.ANKURMITRA_USERS.find(u => u.id === window.CURRENT_VIEWING_USER_ID);
  const userName = user?.name || document.getElementById("detailUserName")?.textContent || "User";

  const newStatus = (action === "approve") ? "Active" : "Rejected";
  if (user) {
    user.status = newStatus;
    try {
      localStorage.setItem("ankurmitra_users_registry", JSON.stringify(window.ANKURMITRA_USERS));
    } catch (_) {}
  }

  const stBadge = document.getElementById("detailStatusBadge");
  if (stBadge) {
    stBadge.textContent = newStatus;
    stBadge.className = (newStatus === "Active") ? 
      "px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-[#0B6623]" : 
      "px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-100 text-rose-800";
  }

  if (typeof showToast === "function") {
    if (action === "approve") {
      showToast(\`User "\${userName}" has been approved and activated.\`, "success");
    } else {
      showToast(\`User "\${userName}" registration has been rejected.\`, "warning");
    }
  }

  renderUsersTable();
  setTimeout(() => navigateTo("user-list", "Users", "User list"), 800);
}

// Quick toggle user status between Active & Pending from the list
function toggleUserStatus(userId) {
  if (!window.ANKURMITRA_USERS) initUsersRegistry();
  const user = window.ANKURMITRA_USERS.find(u => u.id === userId);
  if (!user) return;

  user.status = (user.status === "Active") ? "Pending" : "Active";
  try {
    localStorage.setItem("ankurmitra_users_registry", JSON.stringify(window.ANKURMITRA_USERS));
  } catch (_) {}

  renderUsersTable();
  if (typeof showToast === "function") {
    showToast(\`Status for "\${user.name}" updated to \${user.status}.\`, "info");
  }
}

// Delete user record
function deleteUserRecord(userId) {
  if (!window.ANKURMITRA_USERS) initUsersRegistry();
  const idx = window.ANKURMITRA_USERS.findIndex(u => u.id === userId);
  if (idx === -1) return;

  const deletedName = window.ANKURMITRA_USERS[idx].name;
  window.ANKURMITRA_USERS.splice(idx, 1);
  try {
    localStorage.setItem("ankurmitra_users_registry", JSON.stringify(window.ANKURMITRA_USERS));
  } catch (_) {}

  renderUsersTable();
  if (typeof showToast === "function") {
    showToast(\`User "\${deletedName}" has been removed.\`, "info");
  }
}

// Global window bindings for user module
window.openCreateUserForm = openCreateUserForm;
window.editUserRecord = editUserRecord;
window.editUserFromDetail = editUserFromDetail;
window.handleCreateUser = handleCreateUser;
window.openUserRecord = openUserRecord;
window.handleUserApprovalAction = handleUserApprovalAction;
window.toggleUserStatus = toggleUserStatus;
window.deleteUserRecord = deleteUserRecord;
window.renderUsersTable = renderUsersTable;
window.initUsersRegistry = initUsersRegistry;`;

if (html.includes(oldHcuSuite)) {
  html = html.replace(oldHcuSuite, fullUserManagementSuite);
  console.log('Replaced handleCreateUser suite with Unified User Registry');
} else {
  console.error('Failed to match oldHcuSuite!');
}

// 8. Ensure initUsersRegistry and renderUsersTable are called during DOMContentLoaded
const domInitNeedle = 'initAllNewUserComponents();';
if (html.includes(domInitNeedle)) {
  html = html.replace(
    'initAllNewUserComponents();',
    'initAllNewUserComponents();\n  initUsersRegistry();\n  renderUsersTable();'
  );
  console.log('Added initUsersRegistry and renderUsersTable to DOMContentLoaded');
}

// 9. Update navigateTo to re-render users table whenever user-list is viewed
const navTargetNeedle = `if (target) {
        target.classList.remove('hidden');`;

if (html.includes(navTargetNeedle)) {
  html = html.replace(
    navTargetNeedle,
    `if (target) {
        target.classList.remove('hidden');
        if (pageId === 'user-list' && typeof renderUsersTable === 'function') {
          renderUsersTable();
        }`
  );
  console.log('Added renderUsersTable call inside navigateTo when viewing user-list');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Successfully applied user module mapping patch to index.html!');
