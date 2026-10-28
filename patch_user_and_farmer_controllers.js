// patch_user_and_farmer_controllers.js
const fs = require('fs');
const path = require('path');

const indexPath = path.join(__dirname, 'index.html');
let html = fs.readFileSync(indexPath, 'utf8');

// 1. Update filterUserList (around 1323149)
const oldFilterUserListStart = `function filterUserList() {
      const query = (document.getElementById('userListSearchInput')?.value || '').toLowerCase().trim();
      const rows = document.querySelectorAll('#usersTableBody tr.user-row');
      let visibleCount = 0;

      rows.forEach(row => {
        const name = (row.getAttribute('data-name') || '').toLowerCase();
        const role = row.getAttribute('data-role') || '';
        const place = (row.getAttribute('data-place') || '').toLowerCase();
        const mobile = (row.getAttribute('data-mobile') || '').toLowerCase();
        const status = row.getAttribute('data-status') || '';

        const matchesQuery = !query || name.includes(query) || place.includes(query) || mobile.includes(query);
        const matchesRole = currentUserRoleFilter === 'all' || role === currentUserRoleFilter;
        const matchesStatus = currentUserStatusFilter === 'all' || status === currentUserStatusFilter;

        if (matchesQuery && matchesRole && matchesStatus) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      const countEl = document.getElementById('visibleUserCount');
      if (countEl) countEl.textContent = visibleCount;
    }`;

const newFilterUserListCode = `function setUserViewMode(mode) {
      try {
        localStorage.setItem('ankurmitra_user_view_mode', mode);
      } catch (e) {}

      const gridView = document.getElementById('usersGridView');
      const tableView = document.getElementById('usersTableView');
      const btnGrid = document.getElementById('userViewBtnGrid');
      const btnTable = document.getElementById('userViewBtnTable');

      if (mode === 'grid') {
        if (gridView) gridView.classList.remove('hidden');
        if (tableView) tableView.classList.add('hidden');

        if (btnGrid) {
          btnGrid.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
        }
        if (btnTable) {
          btnTable.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
        }
      } else {
        if (gridView) gridView.classList.add('hidden');
        if (tableView) tableView.classList.remove('hidden');

        if (btnGrid) {
          btnGrid.className = 'px-3 py-1.5 rounded-lg text-xs font-semibold transition flex items-center gap-1.5 text-[#64748B] hover:text-[#0F172A] dark:hover:text-white cursor-pointer';
        }
        if (btnTable) {
          btnTable.className = 'px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1.5 bg-white dark:bg-slate-700 text-[#0B6623] dark:text-emerald-400 shadow-sm cursor-pointer';
        }
      }

      filterUserList();
      if (window.lucide && typeof lucide.createIcons === 'function') {
        lucide.createIcons();
      }
    }
    window.setUserViewMode = setUserViewMode;

    function filterUserList() {
      const query = (document.getElementById('userListSearchInput')?.value || '').toLowerCase().trim();
      const rows = document.querySelectorAll('#usersTableBody tr.user-row');
      const cards = document.querySelectorAll('#usersGridContainer div.user-grid-card');
      let visibleCount = 0;

      rows.forEach(row => {
        const name = (row.getAttribute('data-name') || '').toLowerCase();
        const role = row.getAttribute('data-role') || '';
        const place = (row.getAttribute('data-place') || '').toLowerCase();
        const mobile = (row.getAttribute('data-mobile') || '').toLowerCase();
        const status = row.getAttribute('data-status') || '';
        const id = (row.getAttribute('data-id') || '').toLowerCase();

        const matchesQuery = !query || name.includes(query) || place.includes(query) || mobile.includes(query) || id.includes(query);
        const matchesRole = currentUserRoleFilter === 'all' || role === currentUserRoleFilter;
        const matchesStatus = currentUserStatusFilter === 'all' || status === currentUserStatusFilter;

        if (matchesQuery && matchesRole && matchesStatus) {
          row.style.display = '';
          visibleCount++;
        } else {
          row.style.display = 'none';
        }
      });

      cards.forEach(card => {
        const name = (card.getAttribute('data-name') || '').toLowerCase();
        const role = card.getAttribute('data-role') || '';
        const place = (card.getAttribute('data-place') || '').toLowerCase();
        const mobile = (card.getAttribute('data-mobile') || '').toLowerCase();
        const status = card.getAttribute('data-status') || '';
        const id = (card.getAttribute('data-id') || '').toLowerCase();

        const matchesQuery = !query || name.includes(query) || place.includes(query) || mobile.includes(query) || id.includes(query);
        const matchesRole = currentUserRoleFilter === 'all' || role === currentUserRoleFilter;
        const matchesStatus = currentUserStatusFilter === 'all' || status === currentUserStatusFilter;

        if (matchesQuery && matchesRole && matchesStatus) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });

      const countEl = document.getElementById('visibleUserCount');
      if (countEl) countEl.textContent = visibleCount;
      const countEl2 = document.getElementById('showingUsersCount');
      if (countEl2) countEl2.textContent = visibleCount;
      const countGridEl = document.getElementById('visibleUserCountGrid');
      if (countGridEl) countGridEl.textContent = visibleCount;
      const totalGridEl = document.getElementById('totalUserCountGrid');
      if (totalGridEl && window.ANKURMITRA_USERS) totalGridEl.textContent = window.ANKURMITRA_USERS.length;

      const gridEmpty = document.getElementById('usersGridEmpty');
      if (gridEmpty) {
        if (visibleCount === 0) gridEmpty.classList.remove('hidden');
        else gridEmpty.classList.add('hidden');
      }
    }`;

if (html.includes(oldFilterUserListStart)) {
  html = html.replace(oldFilterUserListStart, newFilterUserListCode);
  console.log('Replaced filterUserList with enhanced version + setUserViewMode');
} else {
  console.error('oldFilterUserListStart not found!');
}

// 2. Enhance renderUsersTable (around 1541701) to also populate usersGridContainer
const tbodyInnerNeedle = `tbody.innerHTML = rowsHtml;`;
const tbodyInnerPos = html.indexOf(tbodyInnerNeedle, html.indexOf('function renderUsersTable'));

if (tbodyInnerPos !== -1) {
  const gridRenderCode = `tbody.innerHTML = rowsHtml;

  const usersGridEl = document.getElementById("usersGridContainer");
  if (usersGridEl) {
    usersGridEl.innerHTML = users.map(user => {
      const theme = roleThemes[user.role] || roleThemes.Farmer;
      const initials = (user.name || "U").split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase() || "U";
      let roleIcon = 'sprout';
      if (user.role === 'Dealer') roleIcon = 'store';
      else if (user.role === 'Retailer') roleIcon = 'shopping-bag';
      else if (user.role === 'Industrial') roleIcon = 'factory';
      else if (user.role === 'Staff') roleIcon = 'shield-check';

      const statusStyle = user.status === 'Active'
        ? { pill: 'bg-emerald-100 text-[#0B6623] dark:bg-emerald-950/60 dark:text-emerald-300', dot: 'bg-[#0B6623] dark:bg-emerald-400' }
        : (user.status === 'Pending' ? { pill: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300', dot: 'bg-amber-600' } : { pill: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300', dot: 'bg-rose-600' });

      return \`
        <div class="user-grid-card saas-card p-4 hover:shadow-md transition-all duration-200 flex flex-col justify-between border border-[#E2E8F0] dark:border-slate-800 rounded-2xl group bg-white dark:bg-slate-900"
             data-id="\${user.id}" data-name="\${user.name}" data-role="\${user.role}" data-place="\${user.place}" data-mobile="\${user.mobile}" data-status="\${user.status}">
          <div>
            <div class="flex items-start justify-between gap-2 mb-3">
              <div class="flex items-center gap-2.5">
                <div class="relative">
                  <div class="w-10 h-10 rounded-xl font-black text-xs flex items-center justify-center shadow-xs \${theme.avatarBg}">
                    \${initials}
                  </div>
                  <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full flex items-center justify-center text-[9px] bg-white dark:bg-slate-800 shadow-xs border border-white dark:border-slate-700">
                    <i data-lucide="\${roleIcon}" class="w-2.5 h-2.5"></i>
                  </span>
                </div>
                <div>
                  <h4 class="font-bold text-sm text-[#0F172A] dark:text-white leading-tight group-hover:text-[#0B6623] transition-colors">\${user.name}</h4>
                  <div class="flex items-center gap-1.5 text-[11px] text-[#64748B] mt-0.5">
                    <i data-lucide="map-pin" class="w-3 h-3 text-slate-400"></i>
                    <span>\${user.place}</span>
                    <span class="text-slate-300 dark:text-slate-700">•</span>
                    <span class="font-mono text-[10px] text-slate-400">\${user.id}</span>
                  </div>
                </div>
              </div>
              <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold \${statusStyle.pill}">
                <span class="w-1.5 h-1.5 rounded-full \${statusStyle.dot}"></span>
                \${user.status}
              </span>
            </div>

            <div class="flex flex-wrap items-center gap-1.5 mb-3">
              <span class="px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border \${theme.badgeBg}">
                \${user.role}
              </span>
              <span class="inline-flex items-center gap-1 px-2 py-0.5 rounded-lg text-[11px] font-bold bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                <i data-lucide="shield-check" class="w-3 h-3 text-emerald-600"></i>
                KYC Verified
              </span>
            </div>

            <div class="p-2.5 rounded-xl bg-[#F8FAFC] dark:bg-slate-800/60 border border-[#E2E8F0] dark:border-slate-700/80 mb-3 space-y-1.5 text-xs">
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-[#64748B]">Capacity / Scope:</span>
                <span class="font-bold text-[#0F172A] dark:text-white truncate">\${user.subtitle || user.firm || 'Standard Tier'}</span>
              </div>
              <div class="flex items-center justify-between text-[11px]">
                <span class="text-[#64748B]">Contact:</span>
                <a href="tel:\${user.mobile}" class="font-mono text-[#0B6623] hover:underline font-bold">\${user.mobile}</a>
              </div>
            </div>
          </div>

          <div class="pt-3 border-t border-[#E2E8F0] dark:border-slate-800 flex items-center justify-between gap-2">
            <button onclick="editUserRecord('\${user.id}')" class="flex-1 h-8 px-3 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-xs transition cursor-pointer">
              <i data-lucide="edit-3" class="w-3.5 h-3.5"></i>
              <span>Edit</span>
            </button>
            <button onclick="openUserRecord('\${user.id}')" class="h-8 px-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-xs font-bold text-[#0F172A] dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition flex items-center gap-1 cursor-pointer">
              <i data-lucide="eye" class="w-3.5 h-3.5"></i>
              <span>Detail</span>
            </button>
            <button onclick="toggleUserStatus('\${user.id}')" title="Toggle status" class="h-8 w-8 rounded-xl border border-[#E2E8F0] dark:border-slate-700 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center transition cursor-pointer">
              <i data-lucide="refresh-cw" class="w-3.5 h-3.5"></i>
            </button>
          </div>
        </div>
      \`;
    }).join('');
  }

  const storedUserView = localStorage.getItem('ankurmitra_user_view_mode') || 'grid';
  setUserViewMode(storedUserView);`;

  html = html.substring(0, tbodyInnerPos) + gridRenderCode + html.substring(tbodyInnerPos + tbodyInnerNeedle.length);
  console.log('Hooked usersGridContainer rendering into renderUsersTable');
}

fs.writeFileSync(indexPath, html, 'utf8');
console.log('Saved index.html successfully!');
