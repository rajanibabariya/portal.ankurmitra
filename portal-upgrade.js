/**
 * AnkurMitra portal upgrade layer — new views, field desks, i18n, FAB, masters.
 * Loaded after index.html inline controllers. Frontend mock only.
 */
(function (window, document) {
  'use strict';

  var UPGRADE_READY = false;

  function t(s) {
    return (typeof window.t === 'function') ? window.t(s) : s;
  }

  function icon(name, cls) {
    return '<i data-lucide="' + name + '" class="' + (cls || 'w-4 h-4') + '"></i>';
  }

  function kpiCard(label, value, hint, tone) {
    var color = tone === 'warn' ? 'text-amber-700' : tone === 'risk' ? 'text-rose-700' : 'text-[#0B6623]';
    return '<div class="saas-card p-4">' +
      '<div class="text-[11px] font-bold text-[#64748B] uppercase tracking-wider">' + label + '</div>' +
      '<div class="text-2xl font-black text-[#0F172A] mt-1">' + value + '</div>' +
      (hint ? '<div class="text-[11px] font-semibold mt-1 ' + color + '">' + hint + '</div>' : '') +
      '</div>';
  }

  function actionBar(buttons) {
    return '<div class="flex flex-wrap gap-2">' + buttons.map(function (b) {
      var cls = b.primary
        ? 'h-9 px-3.5 bg-[#0B6623] hover:bg-[#074818] text-white text-xs font-bold rounded-xl'
        : 'h-9 px-3.5 bg-white border border-[#E5E7EB] hover:bg-[#F8FAFC] text-xs font-bold rounded-xl text-[#0F172A]';
      return '<button type="button" class="' + cls + '" onclick="' + b.onclick + '">' + (b.icon ? icon(b.icon, 'w-3.5 h-3.5 inline') + ' ' : '') + b.label + '</button>';
    }).join('') + '</div>';
  }

  function dataTable(headers, rows) {
    var thead = headers.map(function (h) {
      return '<th class="text-left py-2.5 px-3 text-[11px] font-bold text-[#64748B] uppercase">' + h + '</th>';
    }).join('');
    var body = rows.map(function (r, idx) {
      var cells = r.cells.map(function (c) {
        return '<td class="py-2.5 px-3 text-xs text-[#0F172A] font-semibold">' + c + '</td>';
      }).join('');
      var acts = (r.actions || []).map(function (a) {
        return '<button type="button" class="text-xs font-bold text-[#0B6623] hover:underline mr-2" onclick="' + a.onclick + '">' + a.label + '</button>';
      }).join('');
      return '<tr class="' + (idx % 2 ? 'bg-[#F8FAFC]' : 'bg-white') + ' hover:bg-emerald-50/40">' + cells +
        '<td class="py-2.5 px-3 text-right whitespace-nowrap">' + acts + '</td></tr>';
    }).join('');
    return '<div class="saas-card overflow-hidden"><div class="table-scroll">' +
      '<table class="w-full text-sm"><thead class="bg-[#F8FAFC] border-b border-[#E5E7EB]"><tr>' + thead +
      '<th class="text-right py-2.5 px-3 text-[11px] font-bold text-[#64748B] uppercase">Action</th></tr></thead>' +
      '<tbody>' + body + '</tbody></table></div></div>';
  }

  function pageChrome(title, subtitle, kpis, toolbar, body) {
    return '<div class="saas-card p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-3">' +
      '<div><div class="text-[11px] font-bold text-[#0B6623] uppercase tracking-wider">AnkurMitra operations</div>' +
      '<h2 class="text-xl font-black text-[#0F172A] mt-1">' + title + '</h2>' +
      '<p class="text-xs text-[#64748B] mt-0.5">' + subtitle + '</p></div>' + (toolbar || '') + '</div>' +
      (kpis ? '<div class="grid grid-cols-2 md:grid-cols-4 gap-3">' + kpis + '</div>' : '') +
      (body || '');
  }

  function makeView(id, html) {
    var el = document.createElement('div');
    el.id = 'view-' + id;
    el.className = 'hidden space-y-6 view-section';
    el.innerHTML = html;
    return el;
  }

  var FARMERS = [
    { id: 'F-2401', name: 'Jayesh Patel', village: 'Sudavad', crop: 'Cotton Shanker-6', phone: '+91 98251 11001', last: '10 min ago', unread: 2 },
    { id: 'F-2408', name: 'Hareshbhai Vala', village: 'Bagasara', crop: 'Groundnut GG-20', phone: '+91 98792 44120', last: '28 min ago', unread: 1 },
    { id: 'F-2419', name: 'Nilesh Vaghasiya', village: 'Amreli', crop: 'Cumin Unjha', phone: '+91 99099 22118', last: '1 hr ago', unread: 0 },
    { id: 'D-086', name: 'Rameshbhai Patel', village: 'Kishan Agro', crop: 'Dealer desk', phone: '+91 98252 22222', last: 'Today 9:12', unread: 0 },
    { id: 'R-014', name: 'Mina Ben Patel', village: 'Mina Kirana', crop: 'Retailer', phone: '+91 98253 33440', last: 'Yesterday', unread: 0 }
  ];

  var ACTIVITIES = [
    { time: '10:42', who: 'Jayesh Patel', text: 'Asked pink bollworm spray window for Sudavad.', tone: 'chat' },
    { time: '10:18', who: 'AI Mitra', text: 'Replied with Emamectin 5% SG 80 g / acre + neem oil.', tone: 'ai' },
    { time: '09:50', who: 'Ops', text: 'Dispatched van GJ-14-T-2218 to Bagasara.', tone: 'ops' },
    { time: '09:12', who: 'Soil lab', text: 'Sudavad sample SD-188 marked alkaline pH 8.1.', tone: 'lab' },
    { time: '08:40', who: 'Scheme desk', text: 'PM-Kisan installment queued for 46 farmers.', tone: 'gov' }
  ];

  function chatListHtml(tool) {
    return '<div class="saas-card p-4 h-[520px] flex flex-col">' +
      '<div class="flex items-center justify-between mb-3">' +
      '<div class="text-xs font-black text-[#0F172A]">Conversations</div>' +
      '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#0B6623]">' + FARMERS.length + ' live</span></div>' +
      '<input type="search" oninput="AMUpgrade.filterDesk(this,\'' + tool + '\')" placeholder="Search farmer or vendor" class="h-9 px-3 rounded-xl border border-[#E5E7EB] text-xs mb-3">' +
      '<div class="flex-1 overflow-y-auto space-y-1.5" id="desk-list-' + tool + '">' +
      FARMERS.map(function (f, i) {
        return '<button type="button" data-desk-row="' + f.id + '" onclick="AMUpgrade.openDeskChat(\'' + tool + '\',\'' + f.id + '\')" class="w-full text-left p-2.5 rounded-xl border ' + (i === 0 ? 'bg-emerald-50 border-emerald-200' : 'border-transparent hover:bg-[#F8FAFC]') + '">' +
          '<div class="flex items-center justify-between gap-2"><span class="text-xs font-bold text-[#0F172A]">' + f.name + '</span>' +
          (f.unread ? '<span class="w-5 h-5 rounded-full bg-[#0B6623] text-white text-[10px] font-black flex items-center justify-center">' + f.unread + '</span>' : '') + '</div>' +
          '<div class="text-[11px] text-[#64748B]">' + f.village + ' · ' + f.crop + '</div>' +
          '<div class="text-[10px] text-[#94A3B8] mt-0.5">' + f.last + '</div></button>';
      }).join('') + '</div></div>';
  }

  function activityHtml(tool) {
    return '<div class="saas-card p-4 h-[520px] flex flex-col">' +
      '<div class="text-xs font-black text-[#0F172A] mb-3">Activity</div>' +
      '<div class="flex-1 overflow-y-auto space-y-3" id="desk-activity-' + tool + '">' +
      ACTIVITIES.map(function (a) {
        return '<div class="pl-3 border-l-2 border-emerald-200">' +
          '<div class="text-[10px] font-bold text-[#64748B]">' + a.time + ' · ' + a.who + '</div>' +
          '<div class="text-xs text-[#0F172A] font-semibold mt-0.5">' + a.text + '</div></div>';
      }).join('') + '</div>' +
      '<div class="pt-3 border-t border-[#E5E7EB] mt-2 space-y-2">' +
      '<textarea id="desk-reply-' + tool + '" rows="2" class="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] text-xs" placeholder="Reply to farmer or vendor..."></textarea>' +
      '<div class="flex gap-2">' +
      '<button type="button" class="flex-1 h-9 bg-[#0B6623] text-white text-xs font-bold rounded-xl" onclick="AMUpgrade.sendDeskReply(\'' + tool + '\')">Send reply</button>' +
      '<button type="button" class="h-9 px-3 border border-[#E5E7EB] rounded-xl text-xs font-bold" onclick="AMUpgrade.callDeskUser(\'' + tool + '\')">' + icon('phone', 'w-3.5 h-3.5') + '</button>' +
      '</div></div></div>';
  }

  function wrapFieldDesk(viewId, tool) {
    var view = document.getElementById(viewId);
    if (!view || view.dataset.deskWrapped === '1') return;
    view.dataset.deskWrapped = '1';
    var existing = Array.prototype.slice.call(view.children);
    var shell = document.createElement('div');
    shell.className = 'grid grid-cols-1 xl:grid-cols-12 gap-4';
    var left = document.createElement('div');
    left.className = 'xl:col-span-3';
    left.innerHTML = chatListHtml(tool);
    var mid = document.createElement('div');
    mid.className = 'xl:col-span-6 space-y-6 field-desk-main';
    existing.forEach(function (n) { mid.appendChild(n); });
    var right = document.createElement('div');
    right.className = 'xl:col-span-3';
    right.innerHTML = activityHtml(tool);
    shell.appendChild(left);
    shell.appendChild(mid);
    shell.appendChild(right);
    view.appendChild(shell);
  }

  function formGrid(fields, submitLabel, submitFn) {
    var html = '<form class="saas-card p-5 grid grid-cols-1 md:grid-cols-2 gap-3.5" onsubmit="' + submitFn + ';return false;">';
    fields.forEach(function (f) {
      html += '<div class="' + (f.span ? 'md:col-span-2' : '') + '"><label class="block text-xs font-bold text-[#0F172A] mb-1">' + f.label + '</label>';
      if (f.type === 'select') {
        html += '<select class="w-full h-10 px-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold">' +
          f.options.map(function (o) { return '<option>' + o + '</option>'; }).join('') + '</select>';
      } else if (f.type === 'textarea') {
        html += '<textarea rows="3" class="w-full px-3 py-2 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold" placeholder="' + (f.ph || '') + '"></textarea>';
      } else if (f.type === 'file') {
        html += '<input type="file" class="w-full text-xs">';
      } else {
        html += '<input type="' + (f.type || 'text') + '" class="w-full h-10 px-3 rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] text-xs font-semibold" placeholder="' + (f.ph || '') + '">';
      }
      html += '</div>';
    });
    html += '<div class="md:col-span-2 flex justify-end gap-2 pt-2">' +
      '<button type="button" class="h-9 px-4 rounded-xl border border-[#E5E7EB] text-xs font-bold" onclick="history.back()">Cancel</button>' +
      '<button type="submit" class="h-9 px-5 bg-[#0B6623] text-white text-xs font-bold rounded-xl">' + submitLabel + '</button></div></form>';
    return html;
  }

  function injectViews() {
    var host = document.getElementById('mainScrollCanvas');
    if (!host) return;

    var views = [];

    views.push(makeView('welcome', pageChrome(
      'Welcome to AnkurMitra',
      'Amreli command desk for farmers, dealers, retailers and mills. Pick a lane or continue to the master dashboard.',
      kpiCard('Farmers live', '312', 'Sudavad 148') + kpiCard('Open orders', '21', '3 need accept') + kpiCard('Weather risk', 'Amber', 'Spray window 4–6 pm', 'warn') + kpiCard('Payouts pending', '₹ 2.4 L', '14 farmers'),
      actionBar([
        { label: 'Open master dashboard', onclick: "navigateTo('dashboard','Dashboard','Master dashboard')", primary: true, icon: 'layout-dashboard' },
        { label: 'Inform farmers', onclick: "navigateTo('weather-dashboard','Dashboard','Weather dashboard')", icon: 'cloud-sun' },
        { label: 'Network map', onclick: "navigateTo('network-map','Dashboard','Network map')", icon: 'map-pin' }
      ]),
      '<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">' +
        [
          ['Field tools', 'AI Mitra, crop and soil desks', "navigateTo('field-tools','Field','Field tools')", 'sprout'],
          ['Live orders', 'Accept, dispatch, call desk', "navigateTo('live-orders','Orders','Live orders')", 'zap'],
          ['Create campaign', 'Peak-hour farmer push 4–6 pm', "navigateTo('create-campaign','Insights','Create campaign')", 'megaphone'],
          ['Wallet payouts', 'Run today\'s farmer settlements', "navigateTo('payout-run','Wallet','Payout run')", 'indian-rupee']
        ].map(function (c) {
          return '<button type="button" onclick="' + c[2] + '" class="saas-card p-5 text-left hover:border-[#0B6623] transition">' +
            '<div class="w-10 h-10 rounded-xl bg-emerald-50 text-[#0B6623] flex items-center justify-center mb-3">' + icon(c[3], 'w-5 h-5') + '</div>' +
            '<div class="font-black text-sm text-[#0F172A]">' + c[0] + '</div><p class="text-xs text-[#64748B] mt-1">' + c[1] + '</p></button>';
        }).join('') + '</div>' +
      '<div class="saas-card p-5"><h3 class="text-sm font-black text-[#0F172A] mb-3">Today in Amreli</h3>' +
      '<ul class="space-y-2 text-xs text-[#334155]">' +
      '<li>• Pink bollworm flagged in 14 Sudavad clusters — open Crop doctor.</li>' +
      '<li>• Urea at Kishan Agro is 12 bags — inform Bagasara dealers.</li>' +
      '<li>• Gondal groundnut +₹40 / qtl — alert farmers who saved lots.</li>' +
      '<li>• Rain 12 mm expected tonight — hold foliar spray after 6 pm.</li></ul></div>'
    )));

    views.push(makeView('weather-dashboard', pageChrome(
      'Weather dashboard',
      'Analyse micro-climate and push a direct advisory to farmers, dealers and vendors.',
      kpiCard('Sudavad now', '34°C', 'RH 42% · Wind 12 km/h') + kpiCard('Rain next 24h', '12 mm', 'Hold spray after 6 pm', 'warn') + kpiCard('Soil moisture', '18%', 'Irrigate cotton 2 hr') + kpiCard('Farmers in alert zone', '640', 'Sudavad cluster'),
      actionBar([
        { label: 'Send farmer advisory', onclick: "AMUpgrade.broadcast('farmer','Rain advisory: hold spray after 6 pm in Sudavad.')", primary: true, icon: 'send' },
        { label: 'Inform dealers', onclick: "AMUpgrade.broadcast('dealer','Urea demand likely tomorrow after rain pause.')", icon: 'store' },
        { label: 'Inform vendors', onclick: "AMUpgrade.broadcast('vendor','Harvest window open 6–9 am. Wet grain risk tonight.')", icon: 'truck' }
      ]),
      '<div class="grid grid-cols-1 lg:grid-cols-12 gap-4">' +
      '<div class="lg:col-span-8 saas-card p-5"><h3 class="text-sm font-black mb-3">7-day Amreli forecast</h3>' +
      '<div class="grid grid-cols-7 gap-2 text-center text-xs">' +
      ['Wed 34°','Thu 33°','Fri 31° rain','Sat 30° rain','Sun 32°','Mon 33°','Tue 34°'].map(function (d) {
        return '<div class="p-3 rounded-xl bg-[#F8FAFC] border border-[#E5E7EB] font-bold">' + d + '</div>';
      }).join('') + '</div>' +
      '<canvas id="weatherDashChart" height="120" class="mt-4"></canvas></div>' +
      '<div class="lg:col-span-4 saas-card p-5 space-y-3"><h3 class="text-sm font-black">Direct inform queue</h3>' +
      '<label class="text-xs font-bold">Audience</label><select id="weatherAudience" class="w-full h-9 rounded-xl border border-[#E5E7EB] text-xs px-3"><option>All Sudavad farmers</option><option>Cotton growers</option><option>Dealers Bagasara</option><option>Retail kirana</option><option>Patel Agro mill</option></select>' +
      '<label class="text-xs font-bold">Channel</label><select class="w-full h-9 rounded-xl border border-[#E5E7EB] text-xs px-3"><option>WhatsApp + In-app</option><option>SMS</option><option>Voice IVR Gujarati</option></select>' +
      '<textarea id="weatherAdvisoryText" rows="4" class="w-full rounded-xl border border-[#E5E7EB] text-xs p-3">Rain 12 mm tonight. Do not spray after 6 pm. Cover harvested groundnut.</textarea>' +
      '<button type="button" class="w-full h-10 bg-[#0B6623] text-white text-xs font-bold rounded-xl" onclick="AMUpgrade.sendWeatherAdvisory()">Send now</button></div></div>'
    )));

    views.push(makeView('network-dashboard', pageChrome(
      'Network dashboard',
      'Coverage, last-active, dealer gaps and mill demand across the Amreli grid.',
      kpiCard('Active now', '312', '+18 vs 1h') + kpiCard('Dark villages', '4', 'No dealer 8 km', 'risk') + kpiCard('Last-active 7d', '81%', 'Stickiness 31%') + kpiCard('Coverage score', '74', 'Invite 1 dealer'),
      actionBar([
        { label: 'Open network map', onclick: "navigateTo('network-map','Dashboard','Network map')", icon: 'map-pin' },
        { label: 'Invite dealer', onclick: "navigateTo('coverage-gaps','Insights','Coverage gaps')", primary: true, icon: 'user-plus' },
        { label: 'Alert farmers', onclick: "AMUpgrade.broadcast('farmer','Cotton demand 20 qtl left at Patel Agro.')", icon: 'bell' }
      ]),
      dataTable(['Cluster', 'Farmers', 'Dealers', 'Retail', 'Industry', 'Last active', 'Gap'], [
        { cells: ['Sudavad', '640', '0', '2', '0', '6 min', '<span class="text-rose-600">No input dealer</span>'], actions: [{ label: 'Inspect', onclick: "selectNetworkPin('farmer')" }, { label: 'Inform', onclick: "AMUpgrade.broadcast('farmer','Sudavad coverage gap — new dealer invite sent.')" }] },
        { cells: ['Bagasara', '220', '6', '18', '1', '2 min', 'Healthy'], actions: [{ label: 'Inspect', onclick: "selectNetworkPin('dealer')" }] },
        { cells: ['Amreli yard', '538', '12', '40', '8', '1 min', 'Mill pull'], actions: [{ label: 'Inspect', onclick: "selectNetworkPin('industrial')" }] }
      ]) +
      '<div class="saas-card p-5"><h3 class="text-sm font-black mb-2">Inform vendors directly</h3>' +
      '<div class="grid grid-cols-1 md:grid-cols-3 gap-3">' +
      '<button type="button" class="h-10 rounded-xl bg-emerald-50 text-[#0B6623] text-xs font-bold" onclick="AMUpgrade.broadcast(\'farmer\',\'Gondal groundnut +₹40. Bring lots before 11 am.\')">Farmers · mandi</button>' +
      '<button type="button" class="h-10 rounded-xl bg-amber-50 text-amber-800 text-xs font-bold" onclick="AMUpgrade.broadcast(\'dealer\',\'Restock urea. Sudavad demand after rain pause.\')">Dealers · stock</button>' +
      '<button type="button" class="h-10 rounded-xl bg-sky-50 text-sky-800 text-xs font-bold" onclick="AMUpgrade.broadcast(\'vendor\',\'Two vans free after 2 pm. Pick cotton lots.\')">Fleet · vans</button></div></div>'
    )));

    views.push(makeView('create-campaign', pageChrome(
      'Create campaign',
      'Build a timed push from Active time peaks. Farmers 7–8 am, dealers 4–6 pm.',
      kpiCard('Suggested window', '4–6 pm', 'Dealer offer peak') + kpiCard('Audience', '1,240', 'DAU today') + kpiCard('Channel mix', 'WA 62%', 'In-app 28%') + kpiCard('Est. reach', '980', 'Amreli filter'),
      '',
      formGrid([
        { label: 'Campaign name', ph: 'Pink bollworm 4 pm push' },
        { label: 'Goal', type: 'select', options: ['Engagement', 'Input sell', 'Produce buy', 'Weather advisory', 'Scheme awareness'] },
        { label: 'Audience', type: 'select', options: ['All farmers', 'Cotton growers Sudavad', 'Dealers Bagasara', 'Retail kirana', 'Industrial mills'] },
        { label: 'Channel', type: 'select', options: ['WhatsApp', 'In-app', 'SMS', 'Voice IVR', 'All channels'] },
        { label: 'Send at', type: 'datetime-local' },
        { label: 'Offer / scheme', type: 'select', options: ['None', '10% seed discount', 'Urea bag offer', 'PM-Kisan reminder'] },
        { label: 'Message (Gujarati + English)', type: 'textarea', span: true, ph: '4–6 pm dealer offer. Pink bollworm spray window is now.' },
        { label: 'Creative image', type: 'file' }
      ], 'Launch campaign', "AMUpgrade.saveCampaign()") +
      '<div class="saas-card p-4 text-xs text-[#64748B]">Preview posts to farmer app, dealer app and WhatsApp template. No live send in this demo — stored locally.</div>'
    )));

    views.push(makeView('campaign-performance', pageChrome(
      'Campaign performance',
      'Parent Active time · child campaign results.',
      kpiCard('Sent', '980', '98% delivered') + kpiCard('Opened', '612', '62%') + kpiCard('Clicked', '188', '19%') + kpiCard('Converted', '41', 'Orders ₹ 1.8 L'),
      actionBar([{ label: 'Create another', onclick: "navigateTo('create-campaign','Insights','Create campaign')", primary: true, icon: 'plus' }]),
      dataTable(['Campaign', 'Window', 'Audience', 'Sent', 'Open', 'GMV'], [
        { cells: ['Bollworm 4 pm', '4–6 pm', 'Cotton farmers', '640', '68%', '₹ 86,000'], actions: [{ label: 'View', onclick: "AMUpgrade.openChild('Bollworm 4 pm')" }] },
        { cells: ['Morning mandi', '7–8 am', 'Groundnut', '220', '71%', '₹ 42,000'], actions: [{ label: 'View', onclick: "AMUpgrade.openChild('Morning mandi')" }] }
      ])
    )));

    views.push(makeView('crop-diagnostics', pageChrome(
      'Crop diagnostics',
      'Computer-vision cases from Crop doctor. Review leaf scans and reply to the farmer.',
      kpiCard('Open cases', '14', '4 high severity', 'warn') + kpiCard('Resolved today', '9', 'Avg 11 min') + kpiCard('Top pest', 'Pink bollworm', 'Cotton 70 DAS') + kpiCard('Need lab', '3', 'Send to soil/plant'),
      actionBar([{ label: 'Open crop doctor', onclick: "navigateTo('crop-doctor','Field','Crop doctor')", primary: true }]),
      dataTable(['Case', 'Farmer', 'Crop', 'Finding', 'Confidence', 'Status'], [
        { cells: ['CD-118', 'Jayesh Patel', 'Cotton', 'Pink bollworm', '92%', 'Needs reply'], actions: [{ label: 'View', onclick: "navigateTo('crop-doctor')" }, { label: 'Reply', onclick: "AMUpgrade.openDeskChat('crop-doctor','F-2401')" }] },
        { cells: ['CD-119', 'Hareshbhai Vala', 'Groundnut', 'Tikka leaf spot', '88%', 'Advisory sent'], actions: [{ label: 'View', onclick: "navigateTo('crop-doctor')" }] }
      ])
    )));

    views.push(makeView('soil-request', pageChrome(
      'Soil request',
      'Request a field sample or upload a lab report for Soil doctor.',
      kpiCard('Open requests', '7', '2 overdue', 'warn') + kpiCard('Reports in', '18', 'This month') + kpiCard('Alkaline fields', '5', 'pH > 8.0') + kpiCard('Gypsum pending', '3', 'Sudavad'),
      '',
      '<div class="grid grid-cols-1 lg:grid-cols-2 gap-4">' +
      formGrid([
        { label: 'Farmer', ph: 'Jayesh Patel' },
        { label: 'Village', type: 'select', options: ['Sudavad', 'Bagasara', 'Amreli'] },
        { label: 'Survey no. / farm', ph: 'Survey 112/2' },
        { label: 'Test package', type: 'select', options: ['12-parameter SHC', 'pH + EC only', 'Micronutrient', 'Organic carbon'] },
        { label: 'Pickup date', type: 'date' },
        { label: 'Notes', type: 'textarea', span: true }
      ], 'Request soil pickup', "AMUpgrade.saveSoilRequest()") +
      formGrid([
        { label: 'Lab name', ph: 'Amreli soil lab' },
        { label: 'Report date', type: 'date' },
        { label: 'pH', ph: '8.1' },
        { label: 'EC (dS/m)', ph: '1.2' },
        { label: 'Upload PDF / photo', type: 'file', span: true },
        { label: 'Agronomy note', type: 'textarea', span: true }
      ], 'Upload report', "AMUpgrade.uploadSoilReport()") +
      '</div>'
    )));

    function opsPage(id, title, sub, kpis, headers, rows, extra) {
      views.push(makeView(id, pageChrome(title, sub, kpis, actionBar([
        { label: 'Export', onclick: "showToast('Export downloaded.','success')", icon: 'download' },
        { label: 'New record', onclick: "AMUpgrade.openChild('" + title + "')", primary: true, icon: 'plus' }
      ]), dataTable(headers, rows) + (extra || ''))));
    }

    opsPage('order-track', 'Track order', 'Live consignment trail for farmers, kirana and mills.',
      kpiCard('On the way', '8', '2 delayed', 'warn') + kpiCard('Packed', '6', '') + kpiCard('Delivered today', '11', '') + kpiCard('Exceptions', '2', 'Call desk', 'risk'),
      ['Order', 'From', 'To', 'Item', 'Vehicle', 'Status'], [
        { cells: ['1008', 'Jayesh Patel', 'Kuldevi Kirana', 'Groundnut 8 qtl', 'GJ-14-T-2218', 'On the way'], actions: [{ label: 'Track', onclick: "AMUpgrade.openChild('1008')" }, { label: 'Call', onclick: "navigateTo('call-desk')" }] },
        { cells: ['1007', 'Kishan Agro', 'Jayesh Patel', 'Urea 10 bags', 'GJ-14-T-1182', 'Packed'], actions: [{ label: 'Track', onclick: "AMUpgrade.openChild('1007')" }, { label: 'Dispatch', onclick: "navigateTo('dispatch-van')" }] }
      ]);

    opsPage('dispatch-van', 'Dispatch van', 'Assign van, driver and bay for the next live order.',
      kpiCard('Vans free', '3', 'Amreli yard') + kpiCard('En route', '5', '') + kpiCard('Capacity left', '42 qtl', '') + kpiCard('ETA risk', '1', 'Rain', 'warn'),
      ['Van', 'Driver', 'Now', 'Capacity', 'Next drop', 'Status'], [
        { cells: ['GJ-14-T-2218', 'Kiran Joshi', 'Sudavad road', '12 qtl left', 'Kuldevi Kirana', 'Moving'], actions: [{ label: 'Assign', onclick: "AMUpgrade.assignVan('GJ-14-T-2218')" }] },
        { cells: ['GJ-14-T-1182', 'Amit Desai', 'Kishan Agro', 'Full urea', 'Jayesh Patel', 'Loading'], actions: [{ label: 'Assign', onclick: "AMUpgrade.assignVan('GJ-14-T-1182')" }] },
        { cells: ['GJ-14-T-0091', 'Suresh Vala', 'Yard idle', '24 qtl', '—', 'Free'], actions: [{ label: 'Dispatch', onclick: "AMUpgrade.assignVan('GJ-14-T-0091')" }] }
      ],
      formGrid([
        { label: 'Order', type: 'select', options: ['1008 Groundnut F2R', '1007 Urea D2F', '1006 Cotton F2I'] },
        { label: 'Van', type: 'select', options: ['GJ-14-T-2218', 'GJ-14-T-1182', 'GJ-14-T-0091'] },
        { label: 'Driver', type: 'select', options: ['Kiran Joshi', 'Amit Desai', 'Suresh Vala'] },
        { label: 'Bay / godown', type: 'select', options: ['Bay A1', 'Bay A2', 'Bay B1'] },
        { label: 'Notes', type: 'textarea', span: true }
      ], 'Confirm dispatch', "AMUpgrade.confirmDispatch()"));

    opsPage('call-desk', 'Call desk', 'Talk to farmer, dealer or driver without leaving the live order.',
      kpiCard('Queue', '6', '2 SLA risk', 'warn') + kpiCard('On call', '1', 'Kiran · van') + kpiCard('Missed', '3', 'Call back') + kpiCard('Avg handle', '4.2 min', ''),
      ['Ticket', 'Who', 'About', 'Phone', 'Wait', 'Priority'], [
        { cells: ['CD-44', 'Jayesh Patel', 'Urea delay', '+91 98251 11001', '4 min', 'High'], actions: [{ label: 'Call', onclick: "AMUpgrade.placeCall('Jayesh Patel')" }, { label: 'View order', onclick: "navigateTo('order-track')" }] },
        { cells: ['CD-45', 'Mina Ben', 'Groundnut moisture', '+91 98253 33440', '9 min', 'Normal'], actions: [{ label: 'Call', onclick: "AMUpgrade.placeCall('Mina Ben Patel')" }] }
      ]);

    opsPage('godown-bays', 'Godown bays', 'Child of Godown and incoming — bay occupancy digital twin.',
      kpiCard('Bays used', '4 / 6', '') + kpiCard('Ready dispatch', 'Bay A1', 'Cotton') + kpiCard('QC hold', 'Bay A2', 'Groundnut', 'warn') + kpiCard('Full', 'Bay B2', 'Cumin', 'risk'),
      ['Bay', 'Crop', 'Lot', 'Farmer', 'Volume', 'Status'], [
        { cells: ['A1', 'Cotton S-6', 'LOT-088', 'Hareshbhai Patel', '24.0 qtl', 'Ready'], actions: [{ label: 'Open twin', onclick: "navigateTo('godown-incoming')" }] },
        { cells: ['A2', 'Groundnut', 'LOT-112', 'Kishorbhai', '31.0 qtl', 'Inspection'], actions: [{ label: 'QC', onclick: "AMUpgrade.openChild('Bay A2')" }] }
      ]);

    opsPage('incoming-lots', 'Incoming lots', 'Weighbridge and QC lots before they sit in a bay.',
      kpiCard('At gate', '5', '') + kpiCard('QC pending', '2', 'warn') + kpiCard('Accepted today', '11', '') + kpiCard('Rejected', '1', 'Moisture', 'risk'),
      ['Lot', 'Farmer', 'Crop', 'Weight', 'Moisture', 'Status'], [
        { cells: ['IN-331', 'Jayesh Patel', 'Groundnut', '8.2 qtl', '7.1%', 'QC pass'], actions: [{ label: 'Assign bay', onclick: "navigateTo('godown-bays')" }] },
        { cells: ['IN-332', 'Valabhai Vala', 'Wheat', '12 qtl', '11.8%', 'Hold'], actions: [{ label: 'Review', onclick: "AMUpgrade.openChild('IN-332')" }] }
      ]);

    opsPage('delivery-routes', 'Route planner', 'Build today\'s Amreli–Bagasara–Sudavad loops.',
      kpiCard('Routes', '6', '') + kpiCard('Stops', '28', '') + kpiCard('Km planned', '186', '') + kpiCard('Late risk', '2', 'Rain', 'warn'),
      ['Route', 'Van', 'Stops', 'Km', 'Window', 'Status'], [
        { cells: ['R-12 Sudavad loop', 'GJ-14-T-2218', '7', '42', '09–13', 'Live'], actions: [{ label: 'Edit', onclick: "AMUpgrade.openChild('R-12')" }] },
        { cells: ['R-13 Mill run', 'GJ-14-T-0091', '4', '28', '14–18', 'Draft'], actions: [{ label: 'Publish', onclick: "showToast('Route published to driver app.','success')" }] }
      ]);

    opsPage('delivery-fleet', 'Fleet board', 'Driver, fuel, GPS and duty status.',
      kpiCard('On duty', '8', '') + kpiCard('Idle', '3', '') + kpiCard('Workshop', '1', 'warn') + kpiCard('Fuel alerts', '2', 'risk'),
      ['Vehicle', 'Driver', 'Duty', 'Fuel', 'GPS', 'Next'], [
        { cells: ['GJ-14-T-2218', 'Kiran Joshi', 'On road', '58%', 'Live', 'Kuldevi'], actions: [{ label: 'Track', onclick: "navigateTo('order-track')" }] },
        { cells: ['GJ-14-T-4401', 'Workshop', 'Off', '—', 'Yard', 'Clutch'], actions: [{ label: 'Job card', onclick: "AMUpgrade.openChild('GJ-14-T-4401')" }] }
      ]);

    opsPage('delivery-exceptions', 'Exceptions', 'Failed delivery, wet grain, farmer not available.',
      kpiCard('Open', '5', 'risk') + kpiCard('SLA breach', '2', 'warn') + kpiCard('Resolved today', '7', '') + kpiCard('Refund queued', '₹ 4,800', ''),
      ['Case', 'Order', 'Reason', 'Owner', 'Age', 'Next'], [
        { cells: ['EX-19', '1008', 'Shop closed', 'Call desk', '40 min', 'Retry 4 pm'], actions: [{ label: 'Call', onclick: "navigateTo('call-desk')" }] }
      ]);

    opsPage('sell-bid-review', 'Bid review', 'Child of Sell requests — accept, counter or reject lots.',
      kpiCard('Open bids', '16', '') + kpiCard('Above mandi', '9', '') + kpiCard('Need QC', '4', 'warn') + kpiCard('Expired 2h', '3', 'risk'),
      ['Bid', 'Farmer', 'Crop', 'Qty', 'Ask', 'Mandi'], [
        { cells: ['B-77', 'Jayesh Patel', 'Groundnut', '8 qtl', '₹ 6,850', '₹ 6,820'], actions: [{ label: 'Accept', onclick: "showToast('Bid accepted on escrow.','success')" }, { label: 'Counter', onclick: "AMUpgrade.openChild('B-77')" }] }
      ]);

    opsPage('dealer-ledger', 'Customer ledger', 'Khata for dealer customers — credit, recovery, last lift.',
      kpiCard('Open credit', '₹ 3.2 L', '') + kpiCard('Overdue', '₹ 48k', 'risk') + kpiCard('Today collection', '₹ 22k', '') + kpiCard('Farmers', '86', ''),
      ['Customer', 'Village', 'Credit', 'Overdue', 'Last lift', 'Limit'], [
        { cells: ['Jayesh Patel', 'Sudavad', '₹ 12,400', '₹ 0', 'Urea 10', '₹ 25,000'], actions: [{ label: 'Ledger', onclick: "AMUpgrade.openChild('Jayesh Patel')" }] }
      ]);

    opsPage('offer-editor', 'Offer editor', 'Create manufacturer or platform scheme visible in dealer and farmer apps.',
      kpiCard('Live offers', '6', '') + kpiCard('Expiring 7d', '2', 'warn') + kpiCard('Redemptions', '118', '') + kpiCard('Budget left', '₹ 2.1 L', ''),
      ['Offer', 'Audience', 'Discount', 'Window', 'Status'], [
        { cells: ['Kharif seed 10%', 'Dealers', '10%', '1–15 Oct', 'Live'], actions: [{ label: 'Edit', onclick: "AMUpgrade.openChild('Kharif seed 10%')" }] }
      ],
      formGrid([
        { label: 'Offer title', ph: 'Urea monsoon restock' },
        { label: 'Audience', type: 'select', options: ['Farmers', 'Dealers', 'Retailers', 'Mills'] },
        { label: 'Benefit', ph: '₹ 40 / bag' },
        { label: 'Valid till', type: 'date' },
        { label: 'Terms', type: 'textarea', span: true }
      ], 'Publish offer', "showToast('Offer published to apps.','success')"));

    opsPage('payout-run', 'Payout run', 'Batch farmer and vendor settlements from wallet.',
      kpiCard('Ready', '₹ 2.40 L', '14 farmers') + kpiCard('Hold KYC', '₹ 18k', 'warn') + kpiCard('Paid today', '₹ 6.1 L', '') + kpiCard('Failed', '2', 'Retry', 'risk'),
      ['Party', 'Role', 'Amount', 'Bank / UPI', 'Reason', 'Status'], [
        { cells: ['Jayesh Patel', 'Farmer', '₹ 10,400', 'SBI ···4412', 'Groundnut 1008', 'Ready'], actions: [{ label: 'Pay', onclick: "showToast('Payout marked paid on mock ledger.','success')" }] }
      ]);

    opsPage('wallet-ledger', 'Ledger', 'Wallet movements for escrow, commission and refunds.',
      kpiCard('In', '₹ 8.2 L', '15 Oct') + kpiCard('Out', '₹ 6.1 L', '') + kpiCard('Escrow', '₹ 1.4 L', '') + kpiCard('Commission', '₹ 22k', ''),
      ['When', 'Ref', 'Party', 'In', 'Out', 'Balance'], [
        { cells: ['10:08', '1008', 'Jayesh Patel', '₹ 10,400', '—', '₹ 2.40 L'], actions: [{ label: 'Voucher', onclick: "AMUpgrade.openChild('1008 voucher')" }] }
      ]);

    opsPage('ad-editor', 'Ad editor', 'Banner and native ads for farmer and dealer apps.',
      kpiCard('Live ads', '9', '') + kpiCard('CTR', '3.4%', '') + kpiCard('Paused', '2', '') + kpiCard('Budget', '₹ 80k', ''),
      ['Ad', 'Slot', 'Lang', 'CTR', 'Status'], [
        { cells: ['Drip subsidy', 'Home hero', 'GU + HI', '4.1%', 'Live'], actions: [{ label: 'Preview', onclick: "AMUpgrade.openChild('Drip subsidy ad')" }] }
      ],
      formGrid([
        { label: 'Title', ph: 'PMKSY drip last date' },
        { label: 'Placement', type: 'select', options: ['Farmer home', 'Dealer home', 'Mandi strip'] },
        { label: 'Language', type: 'select', options: ['Gujarati', 'Hindi', 'English', 'All'] },
        { label: 'Creative', type: 'file' },
        { label: 'Copy', type: 'textarea', span: true }
      ], 'Save ad', "showToast('Ad saved and previewed on mobile mock.','success')"));

    opsPage('alert-composer', 'Alert composer', 'Smart alerts to a village, crop or role.',
      kpiCard('Sent 24h', '6', '') + kpiCard('Open rate', '71%', '') + kpiCard('Opt-out', '0.4%', '') + kpiCard('Failed WA', '12', 'warn'),
      ['Alert', 'Audience', 'Channel', 'When', 'Status'], [
        { cells: ['Rain hold spray', 'Sudavad cotton', 'WA + app', 'Today 16:00', 'Queued'], actions: [{ label: 'Send now', onclick: "AMUpgrade.broadcast('farmer','Rain hold spray')" }] }
      ]);

    opsPage('support-tickets', 'Tickets', 'Help desk queue with child ticket workspace.',
      kpiCard('Open', '14', '') + kpiCard('P1', '2', 'risk') + kpiCard('Waiting farmer', '5', '') + kpiCard('CSAT', '4.6', ''),
      ['Ticket', 'Who', 'Topic', 'Age', 'Owner', 'Priority'], [
        { cells: ['HS-902', 'Jayesh Patel', 'App login OTP', '22 min', 'Neha', 'P2'], actions: [{ label: 'Open', onclick: "AMUpgrade.openChild('HS-902')" }] }
      ]);

    opsPage('support-knowledge', 'Support knowledge', 'Macros for field and order issues.',
      kpiCard('Articles', '48', '') + kpiCard('Used today', '19', '') + kpiCard('Missing GU', '3', 'warn') + kpiCard('New drafts', '2', ''),
      ['Article', 'Desk', 'Lang', 'Updated'], [
        { cells: ['Urea dispatch delay', 'Orders', 'GU / HI / EN', 'Today'], actions: [{ label: 'Use', onclick: "showToast('Macro copied to reply box.','success')" }] }
      ]);

    opsPage('report-builder', 'Report builder', 'Compose a custom extract across orders, users, crops and wallet.',
      kpiCard('Saved views', '11', '') + kpiCard('Scheduled', '4', '08:00 IST') + kpiCard('Last run', '06:12', 'OK') + kpiCard('Failed', '0', ''),
      ['Report', 'Module', 'Cadence', 'Owner'], [
        { cells: ['Sudavad GMV', 'Orders', 'Daily', 'Analysis'], actions: [{ label: 'Run', onclick: "showToast('Report CSV downloaded.','success')" }] }
      ],
      formGrid([
        { label: 'Name', ph: 'Weekly cotton mill pull' },
        { label: 'Source', type: 'select', options: ['Orders', 'Users', 'Wallet', 'Field chats', 'Audit logs'] },
        { label: 'Place', type: 'select', options: ['All Amreli', 'Sudavad', 'Bagasara'] },
        { label: 'Format', type: 'select', options: ['CSV', 'XLSX', 'PDF'] }
      ], 'Save and run', "showToast('Custom report downloaded.','success')"));

    opsPage('app-features', 'Feature flags', 'Child of App config — toggle farmer/dealer/retailer modules.',
      kpiCard('Flags', '22', '') + kpiCard('Dark launched', '3', '') + kpiCard('Broken preview', '0', '') + kpiCard('Last change', 'Rudram Admin', ''),
      ['Flag', 'App', 'Default', 'Amreli', 'Status'], [
        { cells: ['Crop doctor CV', 'Farmer', 'On', 'On', 'Live'], actions: [{ label: 'Preview', onclick: "navigateTo('mobile-app')" }] },
        { cells: ['F2R lots', 'Retailer', 'On', 'On', 'Live'], actions: [{ label: 'Preview', onclick: "navigateTo('mobile-app')" }] }
      ]);

    opsPage('health-incidents', 'Incidents', 'Child of System health.',
      kpiCard('Open', '1', 'WhatsApp 2 min lag', 'warn') + kpiCard('MTTR', '18 min', '') + kpiCard('Uptime 30d', '99.94%', '') + kpiCard('Pages', '0', ''),
      ['ID', 'Service', 'Impact', 'Age', 'Owner'], [
        { cells: ['INC-44', 'WhatsApp template', 'Delay 2 min', '11 min', 'Amit'], actions: [{ label: 'Ack', onclick: "showToast('Incident acknowledged.','success')" }] }
      ]);

    opsPage('notify-templates', 'Notify templates', 'Child of Notification settings.',
      kpiCard('Templates', '18', 'Green tick') + kpiCard('Pending Meta', '1', 'warn') + kpiCard('Daily cap', '1,00,000', '') + kpiCard('Failed 24h', '22', ''),
      ['Template', 'Channel', 'Lang', 'Status'], [
        { cells: ['order_dispatched_gu', 'WhatsApp', 'Gujarati', 'Approved'], actions: [{ label: 'Preview', onclick: "AMUpgrade.openChild('order_dispatched_gu')" }] }
      ]);

    views.forEach(function (v) {
      if (document.getElementById(v.id)) return;
      host.appendChild(v);
    });
  }

  function enhanceDashboard() {
    var view = document.getElementById('view-dashboard');
    if (!view || view.dataset.mastered === '1') return;
    view.dataset.mastered = '1';
    var strip = document.createElement('div');
    strip.className = 'grid grid-cols-1 lg:grid-cols-3 gap-4';
    strip.innerHTML =
      '<div class="saas-card p-4"><div class="text-[11px] font-bold text-[#0B6623] uppercase">Weather to field</div>' +
      '<div class="text-lg font-black mt-1">12 mm rain tonight</div><p class="text-xs text-[#64748B] mt-1">Hold spray after 6 pm. Inform 640 Sudavad farmers.</p>' +
      '<button type="button" class="mt-3 h-9 px-3 bg-[#0B6623] text-white text-xs font-bold rounded-xl" onclick="navigateTo(\'weather-dashboard\',\'Dashboard\',\'Weather dashboard\')">Open weather desk</button></div>' +
      '<div class="saas-card p-4"><div class="text-[11px] font-bold text-[#0B6623] uppercase">Network gap</div>' +
      '<div class="text-lg font-black mt-1">Sudavad · 0 dealers</div><p class="text-xs text-[#64748B] mt-1">640 farmers, nearest input 18 km. Invite from Bagasara.</p>' +
      '<button type="button" class="mt-3 h-9 px-3 border border-[#E5E7EB] text-xs font-bold rounded-xl" onclick="navigateTo(\'network-dashboard\',\'Dashboard\',\'Network dashboard\')">Open network dashboard</button></div>' +
      '<div class="saas-card p-4"><div class="text-[11px] font-bold text-[#0B6623] uppercase">Direct inform</div>' +
      '<div class="flex flex-wrap gap-2 mt-2">' +
      '<button type="button" class="h-8 px-3 rounded-lg bg-emerald-50 text-[#0B6623] text-[11px] font-bold" onclick="AMUpgrade.broadcast(\'farmer\',\'Mandi groundnut +₹40. Bring lots before 11 am.\')">Farmers</button>' +
      '<button type="button" class="h-8 px-3 rounded-lg bg-amber-50 text-amber-800 text-[11px] font-bold" onclick="AMUpgrade.broadcast(\'dealer\',\'Restock urea — rain pause demand.\')">Dealers</button>' +
      '<button type="button" class="h-8 px-3 rounded-lg bg-sky-50 text-sky-800 text-[11px] font-bold" onclick="AMUpgrade.broadcast(\'vendor\',\'Two vans free after 2 pm.\')">Vendors</button></div></div>';
    var rail = document.getElementById('dashboardAttentionRail');
    if (rail && rail.parentNode === view) view.insertBefore(strip, rail.nextSibling);
    else view.insertBefore(strip, view.firstChild);
  }

  function enhanceMastersHub() {
    document.querySelectorAll('#view-master-hub .saas-card').forEach(function (card) {
      var btn = card.querySelector('button[onclick*="navigateTo"]');
      if (!btn) return;
      card.classList.add('cursor-pointer');
      card.addEventListener('click', function (e) {
        if (e.target.closest('button')) return;
        btn.click();
      });
    });
    document.querySelectorAll('[id^="view-"][id$="-master"] tbody tr, #view-sell-channels tbody tr, #view-unit-master tbody tr, #view-language-master tbody tr').forEach(function (tr) {
      var cell = tr.querySelector('td:last-child');
      if (!cell || cell.dataset.viewed === '1') return;
      cell.dataset.viewed = '1';
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'text-xs font-bold text-[#0B6623] hover:underline mr-2';
      b.textContent = 'View';
      b.onclick = function (e) {
        e.stopPropagation();
        if (typeof openMasterModal === 'function') {
          var type = (tr.closest('[id^="view-"]') || {}).id || '';
          type = type.replace('view-', '').replace('-master', '');
          if (type === 'sell-channels') type = 'channel';
          openMasterModal(type || 'crop', 'edit', b);
          var title = document.getElementById('masterModalTitle');
          if (title) title.textContent = (title.textContent || 'Record').replace('Edit', 'View');
        }
      };
      cell.insertBefore(b, cell.firstChild);
    });
  }

  function addToolActions() {
    function inject(viewId, html) {
      var view = document.getElementById(viewId);
      if (!view || view.querySelector('.am-tool-actions')) return;
      var bar = document.createElement('div');
      bar.className = 'am-tool-actions flex flex-wrap gap-2';
      bar.innerHTML = html;
      var main = view.querySelector('.field-desk-main') || view;
      main.insertBefore(bar, main.firstChild);
    }
    inject('view-soil-doctor',
      '<button type="button" class="h-9 px-3.5 bg-[#0B6623] text-white text-xs font-bold rounded-xl" onclick="navigateTo(\'soil-request\',\'Field\',\'Soil request\')">Request soil pickup</button>' +
      '<button type="button" class="h-9 px-3.5 border border-[#E5E7EB] text-xs font-bold rounded-xl" onclick="navigateTo(\'soil-request\',\'Field\',\'Soil request\')">Upload lab report</button>' +
      '<span class="text-[11px] font-bold text-[#64748B] self-center">Drag the 3D cylinder to inspect strata.</span>');
    inject('view-crop-doctor',
      '<button type="button" class="h-9 px-3.5 bg-[#0B6623] text-white text-xs font-bold rounded-xl" onclick="navigateTo(\'crop-diagnostics\',\'Field\',\'Crop diagnostics\')">Open diagnostics queue</button>');
    inject('view-ai-mitra',
      '<button type="button" class="h-9 px-3.5 bg-[#0B6623] text-white text-xs font-bold rounded-xl" onclick="AMUpgrade.openDeskChat(\'ai-mitra\',\'F-2401\')">Reply to Jayesh Patel</button>');
  }

  function enhanceFieldStart() {
    var view = document.getElementById('view-field-tools');
    if (!view || view.dataset.upgraded === '1') return;
    view.dataset.upgraded = '1';
    var banner = document.createElement('div');
    banner.className = 'grid grid-cols-2 md:grid-cols-4 gap-3';
    banner.innerHTML = kpiCard('Open chats', '27', '8 unread') + kpiCard('Diagnostics', '14', 'Crop doctor') + kpiCard('Soil jobs', '7', '2 pickup') + kpiCard('Schemes in review', '11', 'i-Khedut');
    view.insertBefore(banner, view.children[1] || null);
  }

  function addModuleRails() {
    var rails = {
      'view-all-orders': [['Track order', 'order-track'], ['Live orders', 'live-orders'], ['Dispatch van', 'dispatch-van'], ['Call desk', 'call-desk']],
      'view-live-orders': [['Dispatch van', 'dispatch-van'], ['Call desk', 'call-desk'], ['Track order', 'order-track']],
      'view-godown-incoming': [['Godown bays', 'godown-bays'], ['Incoming lots', 'incoming-lots']],
      'view-deliveries': [['Route planner', 'delivery-routes'], ['Fleet board', 'delivery-fleet'], ['Exceptions', 'delivery-exceptions']],
      'view-sell-requests': [['Bid review', 'sell-bid-review'], ['Offer editor', 'offer-editor']],
      'view-dealer-customers': [['Customer ledger', 'dealer-ledger']],
      'view-offers-schemes': [['Offer editor', 'offer-editor']],
      'view-wallet-payouts': [['Payout run', 'payout-run'], ['Ledger', 'wallet-ledger']],
      'view-ads': [['Ad editor', 'ad-editor']],
      'view-smart-alerts': [['Alert composer', 'alert-composer']],
      'view-help-support': [['Tickets', 'support-tickets'], ['Support knowledge', 'support-knowledge']],
      'view-reports-hub': [['Report builder', 'report-builder'], ['Audit logs', 'audit-logs']],
      'view-app-config': [['Feature flags', 'app-features']],
      'view-system-health': [['Incidents', 'health-incidents']],
      'view-notification-settings': [['Notify templates', 'notify-templates']],
      'view-active-time': [['Create campaign', 'create-campaign'], ['Campaign performance', 'campaign-performance']],
      'view-marketing-studio': [['Create campaign', 'create-campaign']]
    };
    Object.keys(rails).forEach(function (vid) {
      var view = document.getElementById(vid);
      if (!view || view.querySelector('.am-child-rail')) return;
      var rail = document.createElement('div');
      rail.className = 'am-child-rail flex flex-wrap gap-2';
      rail.innerHTML = rails[vid].map(function (x) {
        return '<button type="button" class="h-8 px-3 rounded-lg bg-white border border-[#E5E7EB] text-[11px] font-bold text-[#0F172A] hover:border-[#0B6623]" onclick="navigateTo(\'' + x[1] + '\')">' + x[0] + '</button>';
      }).join('');
      view.insertBefore(rail, view.firstChild);
    });
  }

  function enhanceAddForms() {
    var map = [
      { view: 'view-crop-guide', label: 'Add crop extras' },
      { view: 'view-seed-guide', label: 'Add seed extras' },
      { view: 'view-compost', label: 'Organic extras' },
      { view: 'view-farm-manager', label: 'Farm extras' },
      { view: 'view-scheme-applications', label: 'Scheme extras' }
    ];
    map.forEach(function (m) {
      var v = document.getElementById(m.view);
      if (!v || v.querySelector('.am-extra-fields')) return;
      var box = document.createElement('div');
      box.className = 'am-extra-fields saas-card p-4 grid grid-cols-1 md:grid-cols-3 gap-3';
      box.innerHTML = '<div class="md:col-span-3 text-xs font-black text-[#0F172A]">' + m.label + '</div>' +
        '<label class="text-xs font-bold">Season<select class="w-full h-9 mt-1 rounded-xl border border-[#E5E7EB] text-xs px-2"><option>Kharif</option><option>Rabi</option><option>Summer</option></select></label>' +
        '<label class="text-xs font-bold">Village cluster<select class="w-full h-9 mt-1 rounded-xl border border-[#E5E7EB] text-xs px-2"><option>Sudavad</option><option>Bagasara</option><option>Amreli</option></select></label>' +
        '<label class="text-xs font-bold">Publish to app<select class="w-full h-9 mt-1 rounded-xl border border-[#E5E7EB] text-xs px-2"><option>Farmers</option><option>Dealers</option><option>Both</option></select></label>' +
        '<label class="text-xs font-bold md:col-span-3">Advisory note<textarea class="w-full mt-1 rounded-xl border border-[#E5E7EB] text-xs p-2" rows="2" placeholder="Shown on farmer phone in selected language"></textarea></label>';
      v.appendChild(box);
    });
  }

  function bindSoilDrag() {
    var container = document.getElementById('soilStrataCanvasContainer');
    var canvas = document.getElementById('soilStrataCanvas3d');
    if (!container || !canvas || container.dataset.amDrag === '1') return;
    container.dataset.amDrag = '1';
    var dragging = false;
    var lastX = 0;
    function ptr(e) { return e.touches ? e.touches[0].clientX : e.clientX; }
    function start(e) {
      dragging = true;
      lastX = ptr(e);
      container.classList.add('cursor-grabbing');
      e.preventDefault();
    }
    function move(e) {
      if (!dragging) return;
      var x = ptr(e);
      window.soilCylinderRotation = (window.soilCylinderRotation || 0) + (x - lastX) * 0.045;
      lastX = x;
      if (typeof renderSoilStrata3dCanvas === 'function') renderSoilStrata3dCanvas();
    }
    function end() {
      dragging = false;
      container.classList.remove('cursor-grabbing');
    }
    container.addEventListener('pointerdown', start);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    container.addEventListener('touchstart', start, { passive: false });
    window.addEventListener('touchmove', move, { passive: false });
    window.addEventListener('touchend', end);
    var hint = document.createElement('div');
    hint.className = 'absolute bottom-2 left-2 text-[10px] font-bold text-white bg-slate-900/60 px-2 py-1 rounded-lg';
    hint.textContent = 'Drag to rotate 3D twin';
    container.style.position = 'relative';
    container.appendChild(hint);
  }

  function restoreFab() {
    var fab = document.getElementById('floatingAiMitraContainer');
    if (!fab) return;
    fab.style.display = '';
    var btn = document.getElementById('floatingAiMitraBtn');
    if (btn) {
      btn.setAttribute('aria-label', 'Open AI Mitra');
      btn.title = 'AI Mitra';
    }
  }

  function persistPreviewControls() {
    var origAccent = window.selectPortalAccentColor;
    if (origAccent && !origAccent.__amPersist) {
      window.selectPortalAccentColor = function (color, name) {
        origAccent(color, name);
        try { localStorage.setItem('ankurmitra_accent', color || '#0B6623'); } catch (e) {}
      };
      window.selectPortalAccentColor.__amPersist = true;
    }
  }

  function mergeI18n() {
    window.I18N_DICTIONARY = window.I18N_DICTIONARY || {};
    var extra = {
      'Welcome': { gu: 'સ્વાગત', hi: 'स्वागत', mr: 'स्वागत', te: 'స్వాగతం' },
      'Master dashboard': { gu: 'માસ્ટર ડેશબોર્ડ', hi: 'मास्टर डैशबोर्ड', mr: 'मास्टर डॅशबोर्ड', te: 'మాస్టర్ డాష్‌బోర్డ్' },
      'Weather dashboard': { gu: 'હવામાન ડેશબોર્ડ', hi: 'मौसम डैशबोर्ड' },
      'Network dashboard': {gu: 'નેટવર્ક ડેશબોર્ડ', hi: 'नेटवर्क डैशबोर्ड' },
      'Create campaign': { gu: 'કેમ્પેન બનાવો', hi: 'अभियान बनाएँ' },
      'Campaign performance': { gu: 'કેમ્પેન પ્રદર્શન', hi: 'अभियान प्रदर्शन' },
      'Track order': { gu: 'ઓર્ડર ટ્રેક', hi: 'ऑर्डर ट्रैक' },
      'Dispatch van': { gu: 'વેન ડિસ્પેચ', hi: 'वैन डिस्पैच' },
      'Call desk': { gu: 'કૉલ ડેસ્ક', hi: 'कॉल डेस्क' },
      'Godown bays': { gu: 'ગોડાઉન બે', hi: 'गोडाउन बे' },
      'Incoming lots': { gu: 'આવતા લોટ', hi: 'आने वाले लॉट' },
      'Route planner': { gu: 'રૂટ પ્લાનર', hi: 'रूट प्लानर' },
      'Fleet board': { gu: 'ફ્લીટ બોર્ડ', hi: 'फ्लीट बोर्ड' },
      'Exceptions': { gu: 'અપવાદ', hi: 'अपवाद' },
      'Bid review': { gu: 'બિડ સમીક્ષા', hi: 'बोली समीक्षा' },
      'Customer ledger': { gu: 'ગ્રાહક ખાતું', hi: 'ग्राहक खाता' },
      'Offer editor': { gu: 'ઑફર એડિટર', hi: 'ऑफ़र संपादक' },
      'Payout run': { gu: 'પેઆઉટ રન', hi: 'पेआउट रन' },
      'Ledger': { gu: 'ખાતવહી', hi: 'खाता' },
      'Ad editor': { gu: 'જાહેરાત એડિટર', hi: 'विज्ञापन संपादक' },
      'Alert composer': { gu: 'અલર્ટ કમ્પોઝર', hi: 'अलर्ट कंपोज़र' },
      'Tickets': { gu: 'ટિકિટ', hi: 'टिकट' },
      'Support knowledge': { gu: 'સપોર્ટ જ્ઞાન', hi: 'सहायता ज्ञान' },
      'Report builder': { gu: 'રિપોર્ટ બિલ્ડર', hi: 'रिपोर्ट बिल्डर' },
      'Feature flags': { gu: 'ફીચર ફ્લેગ', hi: 'फ़ीचर फ़्लैग' },
      'Incidents': { gu: 'ઘટનાઓ', hi: 'घटनाएँ' },
      'Notify templates': { gu: 'નોટિફાય ટેમ્પલેટ', hi: 'सूचना टेम्पलेट' },
      'Crop diagnostics': { gu: 'પાક નિદાન', hi: 'फसल निदान' },
      'Soil request': { gu: 'માટી વિનંતી', hi: 'मिट्टी अनुरोध' },
      'Compost and organic': { gu: 'ખાતર અને ઓર્ગેનિક', hi: 'कम्पोस्ट और जैविक' },
      'Conversations': { gu: 'વાતચીત', hi: 'बातचीत' },
      'Activity': { gu: 'પ્રવૃત્તિ', hi: 'गतिविधि' },
      'Send reply': { gu: 'જવાબ મોકલો', hi: 'उत्तर भेजें' },
      'Action': { gu: 'ક્રિયા', hi: 'कार्रवाई' },
      'View': { gu: 'જુઓ', hi: 'देखें' },
      'Edit': { gu: 'સંપાદિત', hi: 'संपादित' },
      'Export': { gu: 'એક્સપોર્ટ', hi: 'निर्यात' },
      'Status': { gu: 'સ્થિતિ', hi: 'स्थिति' },
      'Farmer': { gu: 'ખેડૂત', hi: 'किसान' },
      'Dealer': { gu: 'ડીલર', hi: 'डीलर' },
      'Retailer': { gu: 'રિટેલર', hi: 'खुदरा' },
      'Search farmer or vendor': { gu: 'ખેડૂત અથવા વેન્ડર શોધો', hi: 'किसान या विक्रेता खोजें' },
      'Reply to farmer or vendor...': { gu: 'ખેડૂત અથવા વેન્ડરને જવાબ...', hi: 'किसान या विक्रेता को उत्तर...' },
      'Drag to rotate 3D twin': { gu: '3D ટ્વિન ફેરવવા ખેંચો', hi: '3D ट्विन घुमाने के लिए खींचें' },
      'Open weather desk': { gu: 'હવામાન ડેસ્ક ખોલો', hi: 'मौसम डेस्क खोलें' },
      'Direct inform': { gu: 'સીધી માહિતી', hi: 'सीधी सूचना' }
    };
    Object.keys(extra).forEach(function (k) {
      var src = extra[k];
      window.I18N_DICTIONARY[k] = Object.assign({}, window.I18N_DICTIONARY[k] || {}, src);
    });

    var WORDS = {
      Welcome: { gu: 'સ્વાગત', hi: 'स्वागत' }, Dashboard: {gu: 'ડેશબોર્ડ', hi: 'डैशबोर्ड' },
      Master: { gu: 'માસ્ટર', hi: 'मास्टर' }, Weather: { gu: 'હવામાન', hi: 'मौसम' }, Network: { gu: 'નેટવર્ક', hi: 'नेटवर्क' },
      Map: { gu: 'નકશો', hi: 'मानचित्र' }, Live: { gu: 'લાઇવ', hi: 'लाइव' }, Insights: { gu: 'અંતર્દૃષ્ટિ', hi: 'अंतर्दृष्टि' },
      Users: { gu: 'વપરાશકર્તાઓ', hi: 'उपयोगकर्ता' }, Orders: { gu: 'ઓર્ડર', hi: 'ऑर्डर' }, Delivery: { gu: 'ડિલિવરી', hi: 'डिलीवरी' },
      Sales: { gu: 'વેચાણ', hi: 'बिक्री' }, Wallet: { gu: 'વોલેટ', hi: 'वॉलेट' }, Reports: { gu: 'રિપોર્ટ', hi: 'रिपोर्ट' },
      Settings: { gu: 'સેટિંગ્સ', hi: 'सेटिंग्स' }, Support: { gu: 'સપોર્ટ', hi: 'सहायता' }, Field: { gu: 'ફીલ્ડ', hi: 'खेत' },
      Farmer: { gu: 'ખેડૂત', hi: 'किसान' }, Dealers: { gu: 'ડીલર્સ', hi: 'डीलर' }, Active: { gu: 'સક્રિય', hi: 'सक्रिय' },
      Pending: { gu: 'બાકી', hi: 'लंबित' }, Export: { gu: 'એક્સપોર્ટ', hi: 'निर्यात' }, Search: {gu: 'શોધો', hi: 'खोजें' },
      Add: { gu: 'ઉમેરો', hi: 'जोड़ें' }, Save: {gu: 'સાચવો', hi: 'सहेजें' }, Cancel: { gu: 'રદ', hi: 'रद्द' },
      Delete: { gu: 'કાઢો', hi: 'हटाएँ' }, Open: { gu: 'ખોલો', hi: 'खोलें' }, View: { gu: 'જુઓ', hi: 'देखें' },
      Edit: { gu: 'સંપાદિત', hi: 'संपादित' }, Track: { gu: 'ટ્રેક', hi: 'ट्रैक' }, Call: { gu: 'કૉલ', hi: 'कॉल' },
      Status: { gu: 'સ્થિતિ', hi: 'स्थिति' }, Amount: { gu: 'રકમ', hi: 'राशि' }, Crop: { gu: 'પાક', hi: 'फसल' },
      Soil: { gu: 'માટી', hi: 'मिट्टी' }, Seed: { gu: 'બીયારણ', hi: 'बीज' }, Farm: { gu: 'ખેતર', hi: 'फार्म' },
      Scheme: { gu: 'યોજના', hi: 'योजना' }, Language: { gu: 'ભાષા', hi: 'भाषा' }, Notifications: { gu: 'સૂચનાઓ', hi: 'सूचनाएँ' },
      'Sign Out': { gu: 'સાઇન આઉટ', hi: 'साइन आउट' }, Reply: { gu: 'જવાબ', hi: 'उत्तर' }, Send: { gu: 'મોકલો', hi: 'भेजें' },
      Campaign: { gu: 'કેમ્પેન', hi: 'अभियान' }, Audience: { gu: 'પ્રેક્ષક', hi: 'दर्शक' }, Channel: { gu: 'ચેનલ', hi: 'चैनल' },
      Village: { gu: 'ગામ', hi: 'गाँव' }, District: { gu: 'જિલ્લો', hi: 'ज़िला' }, Today: { gu: 'આજે', hi: 'आज' },
      Action: { gu: 'ક્રિયા', hi: 'कार्रवाई' }, Name: {gu: 'નામ', hi: 'नाम' }, Phone: { gu: 'ફોન', hi: 'फ़ोन' },
      Driver: { gu: 'ડ્રાઇવર', hi: 'ड्राइवर' }, Vehicle: { gu: 'વાહન', hi: 'वाहन' }, Godown: { gu: 'ગોડાઉન', hi: 'गोडाउन' },
      Delivered: { gu: 'ડિલિવર થયું', hi: 'वितरित' }, Packed: { gu: 'પેક્ડ', hi: 'पैक' }, New: { gu: 'નવું', hi: 'नया' }
    };
    window.AM_I18N_WORDS = WORDS;

    var orig = window.t;
    window.t = function (key, lang) {
      if (!key) return '';
      var out = orig ? orig(key, lang) : key;
      var current = lang || (window.PORTAL_PREFERENCES && window.PORTAL_PREFERENCES.language) || localStorage.getItem('ankurmitra_language') || 'en';
      if (current === 'en' || out !== key) return out;
      var langKey = (current === 'gu' || current === 'hi') ? current : 'hi';
      var parts = String(key).split(/(\s+|\/|·|,|:)/);
      var translated = parts.map(function (p) {
        if (!p || /^\s+$/.test(p) || /^[0-9₹%.,+\-]+$/.test(p)) return p;
        var hit = WORDS[p] || WORDS[p.replace(/\s+/g, ' ')];
        if (hit && (hit[current] || hit[langKey] || hit.hi || hit.gu)) return hit[current] || hit[langKey] || hit.hi || hit.gu;
        var dict = window.I18N_DICTIONARY[p];
        if (dict && (dict[current] || dict[langKey] || dict.hi || dict.gu)) return dict[current] || dict[langKey] || dict.hi || dict.gu;
        return p;
      }).join('');
      return translated || key;
    };
  }

  function wrapNavigate() {
    if (!window.navigateTo || window.navigateTo.__amWrapped) return;
    var orig = window.navigateTo;
    window.navigateTo = function (pageId, parentLabel, childLabel) {
      orig(pageId, parentLabel, childLabel);
      var id = (typeof currentActivePage !== 'undefined' ? currentActivePage : null) || window.currentActivePage || pageId;
      window.currentActivePage = id;
      var lang = (window.PORTAL_PREFERENCES && window.PORTAL_PREFERENCES.language) || localStorage.getItem('ankurmitra_language') || 'en';
      var heading = document.getElementById('pageHeading');
      var bc = document.getElementById('breadcrumbChild');
      var parentBc = document.getElementById('breadcrumbParent');
      if (heading) {
        var titleEn = childLabel || heading.getAttribute('data-i18n-orig') || heading.textContent;
        heading.setAttribute('data-i18n-orig', titleEn);
        window.AM_CURRENT_TITLE = titleEn;
        if (lang !== 'en' && typeof window.t === 'function') heading.textContent = window.t(titleEn, lang);
        else heading.textContent = titleEn;
      }
      if (bc) {
        var childEn = childLabel || bc.getAttribute('data-i18n-orig') || bc.textContent;
        bc.setAttribute('data-i18n-orig', childEn);
        if (lang !== 'en' && typeof window.t === 'function') bc.textContent = window.t(childEn, lang);
        else bc.textContent = childEn;
      }
      if (parentBc && parentLabel) {
        parentBc.setAttribute('data-i18n-orig', parentLabel);
        if (lang !== 'en' && typeof window.t === 'function') parentBc.textContent = window.t(parentLabel, lang);
        else parentBc.textContent = parentLabel;
      }
      if (id === 'soil-doctor') {
        bindSoilDrag();
        setTimeout(function () {
          if (typeof initSoilCanvasInteractions === 'function') initSoilCanvasInteractions(true);
        }, 60);
      }
      if (id === 'weather-dashboard') drawWeatherChart();
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        try { lucide.createIcons(); } catch (e) {}
      }
      if (lang !== 'en') {
        if (typeof translateSubtree === 'function') {
          var view = document.getElementById('view-' + id);
          if (view) translateSubtree(view, lang);
          var aside = document.querySelector('aside');
          if (aside) translateSubtree(aside, lang);
        }
        if (typeof translateFullApplication === 'function') {
          try { translateFullApplication(lang); } catch (e) {}
        }
      }
    };
    window.navigateTo.__amWrapped = true;
  }

  function drawWeatherChart() {
    var canvas = document.getElementById('weatherDashChart');
    if (!canvas || typeof Chart === 'undefined') return;
    if (canvas.dataset.charted === '1') return;
    canvas.dataset.charted = '1';
    new Chart(canvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: ['Wed', 'Thu', 'Fri', 'Sat', 'Sun', 'Mon', 'Tue'],
        datasets: [
          { label: 'Max °C', data: [34, 33, 31, 30, 32, 33, 34], borderColor: '#0B6623', tension: 0.3 },
          { label: 'Rain mm', data: [0, 2, 12, 9, 1, 0, 0], borderColor: '#0284C7', tension: 0.3, yAxisID: 'y1' }
        ]
      },
      options: {
        plugins: { legend: { labels: { font: { size: 10 } } } },
        scales: { y1: { position: 'right', grid: { drawOnChartArea: false } } }
      }
    });
  }

  window.AMUpgrade = {
    filterDesk: function (input, tool) {
      var q = (input.value || '').toLowerCase();
      document.querySelectorAll('#desk-list-' + tool + ' [data-desk-row]').forEach(function (row) {
        row.style.display = row.textContent.toLowerCase().indexOf(q) >= 0 ? '' : 'none';
      });
    },
    openDeskChat: function (tool, id) {
      var f = FARMERS.filter(function (x) { return x.id === id; })[0] || FARMERS[0];
      document.querySelectorAll('#desk-list-' + tool + ' button').forEach(function (b) {
        b.classList.remove('bg-emerald-50', 'border-emerald-200');
      });
      var btn = document.querySelector('#desk-list-' + tool + ' [data-desk-row="' + id + '"]');
      if (btn) btn.classList.add('bg-emerald-50', 'border-emerald-200');
      var box = document.getElementById('desk-reply-' + tool);
      if (box) box.placeholder = 'Reply to ' + f.name + ' · ' + f.village;
      if (typeof showToast === 'function') showToast('Opened thread with ' + f.name + ' (' + f.phone + ')', 'info');
    },
    sendDeskReply: function (tool) {
      var box = document.getElementById('desk-reply-' + tool);
      var text = box ? box.value.trim() : '';
      if (!text) {
        showToast('Type a reply first.', 'info');
        return;
      }
      var feed = document.getElementById('desk-activity-' + tool);
      if (feed) {
        var row = document.createElement('div');
        row.className = 'pl-3 border-l-2 border-[#0B6623]';
        row.innerHTML = '<div class="text-[10px] font-bold text-[#64748B]">Now · You</div><div class="text-xs text-[#0F172A] font-semibold mt-0.5">' + text.replace(/[<>]/g, '') + '</div>';
        feed.insertBefore(row, feed.firstChild);
      }
      if (box) box.value = '';
      showToast('Reply sent to farmer / vendor thread.', 'success');
    },
    callDeskUser: function () {
      showToast('Calling +91 98251 11001 (demo).', 'info');
    },
    broadcast: function (audience, msg) {
      showToast('Advisory queued to ' + audience + 's: ' + msg, 'success');
    },
    sendWeatherAdvisory: function () {
      var msg = (document.getElementById('weatherAdvisoryText') || {}).value || 'Weather advisory';
      var aud = (document.getElementById('weatherAudience') || {}).value || 'farmers';
      showToast('Sent to ' + aud + ': ' + msg, 'success');
    },
    saveCampaign: function () {
      showToast('Campaign saved. It will fire in the 4–6 pm dealer window.', 'success');
      if (typeof navigateTo === 'function') navigateTo('campaign-performance', 'Insights', 'Campaign performance');
    },
    saveSoilRequest: function () {
      showToast('Soil pickup requested for Sudavad. Lab notified.', 'success');
    },
    uploadSoilReport: function () {
      showToast('Soil report attached to Jayesh Patel farm card.', 'success');
    },
    openChild: function (name) {
      showToast('Opened: ' + name, 'info');
    },
    assignVan: function (van) {
      showToast(van + ' assigned. Driver notified on app.', 'success');
    },
    confirmDispatch: function () {
      showToast('Van dispatched. Farmer and kirana both informed.', 'success');
      if (typeof navigateTo === 'function') navigateTo('order-track', 'Orders', 'Track order');
    },
    placeCall: function (who) {
      showToast('Dialling ' + who + ' from call desk (demo).', 'info');
    }
  };

  function init() {
    if (UPGRADE_READY) return;
    UPGRADE_READY = true;
    mergeI18n();
    injectViews();
    enhanceDashboard();
    enhanceMastersHub();
    enhanceFieldStart();
    enhanceAddForms();
    addModuleRails();
    wrapFieldDesk('view-ai-mitra', 'ai-mitra');
    wrapFieldDesk('view-crop-doctor', 'crop-doctor');
    wrapFieldDesk('view-soil-doctor', 'soil-doctor');
    wrapFieldDesk('view-crop-guide', 'crop-guide');
    wrapFieldDesk('view-seed-guide', 'seed-guide');
    wrapFieldDesk('view-compost', 'compost');
    wrapFieldDesk('view-farm-manager', 'farm-manager');
    wrapFieldDesk('view-scheme-applications', 'scheme-applications');
    addToolActions();
    bindSoilDrag();
    restoreFab();
    persistPreviewControls();
    wrapNavigate();
    if (typeof lucide !== 'undefined' && lucide.createIcons) {
      try { lucide.createIcons(); } catch (e) {}
    }
  }

  var origLang = window.applyLanguagePreference;
  if (origLang && !origLang.__amWrapped) {
    window.applyLanguagePreference = function (lang, showFeedback) {
      origLang(lang, showFeedback);
      try { localStorage.setItem('ankurmitra_language', lang || 'en'); } catch (e) {}
      var heading = document.getElementById('pageHeading');
      var child = document.getElementById('breadcrumbChild');
      var title = window.AM_CURRENT_TITLE;
      if (!title && heading) title = heading.getAttribute('data-i18n-orig') || heading.textContent;
      if (heading && title) {
        heading.setAttribute('data-i18n-orig', title);
        heading.textContent = window.t(title, lang);
      }
      if (child && title) {
        child.setAttribute('data-i18n-orig', title);
        child.textContent = window.t(title, lang);
      }
    };
    window.applyLanguagePreference.__amWrapped = true;
  }

  init();
  document.addEventListener('DOMContentLoaded', init);
})(window, document);
