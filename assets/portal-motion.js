/**
 * Ankur Mitra Portal — motion layer
 * Staggered card entrances on every view change, KPI count-up, cursor
 * spotlight on cards, button ripples and login-screen particles.
 * Purely additive: observes the DOM, never changes routing or data.
 */
(function () {
  'use strict';
  if (window.__amMotion) return;
  window.__amMotion = true;

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CARD_SELECTOR = '.saas-card, .bg-white.border.rounded-2xl, .bg-white.border.rounded-xl';
  var MAX_STAGGER = 28;
  var MAX_REVEAL = 80;
  // Card backgrounds that become glass: plain white, and the dark-mode card/surface colours.
  // Tinted cards (emerald, amber, …) keep their colour.
  var PLAIN_SURFACES = ['rgb(255, 255, 255)', 'rgb(22, 31, 48)', 'rgb(17, 24, 39)'];

  function isVisible(el) {
    return el.offsetParent !== null || el.getClientRects().length > 0;
  }

  // ─── Card entrance + tagging ─────────────────────────────────────────────
  function animateView(view) {
    if (!view || reduceMotion) return;
    // Anything still waiting from a previous visit must be visible before we measure
    revealObserver.disconnect();
    var waiting = view.querySelectorAll('.am-pre');
    for (var w = 0; w < waiting.length; w++) waiting[w].classList.remove('am-pre');

    var cards = view.querySelectorAll(CARD_SELECTOR);
    var foldLine = window.innerHeight;
    var top = [];
    var later = [];
    var glass = [];
    // Read phase only: interleaving writes would force a layout per card
    for (var i = 0; i < cards.length; i++) {
      var c = cards[i];
      var parentCard = c.parentElement && c.parentElement.closest(CARD_SELECTOR);
      var nested = !!(parentCard && view.contains(parentCard));
      if (!c.classList.contains('am-glass') && !c.classList.contains('am-glass-inner') &&
          PLAIN_SURFACES.indexOf(getComputedStyle(c).backgroundColor) !== -1) {
        glass.push([c, nested ? 'am-glass-inner' : 'am-glass']);
      }
      // Only animate outermost cards so nested ones don't double-animate
      if (nested || !isVisible(c)) continue;
      if (c.getBoundingClientRect().top > foldLine) {
        if (later.length < MAX_REVEAL) later.push(c);
      } else if (top.length < MAX_STAGGER) {
        top.push(c);
      }
    }
    for (var j = 0; j < cards.length; j++) cards[j].classList.add('am-card');
    glass.forEach(function (g) { g[0].classList.add(g[1]); });
    later.forEach(function (c) {
      c.classList.add('am-pre');
      revealObserver.observe(c);
    });
    replayHeading();
    top.forEach(function (c, idx) {
      // fill "backwards" so no transform lingers once the entrance is done
      c.animate([
        { opacity: 0, transform: 'translateY(16px) scale(.985)' },
        { opacity: 1, transform: 'none' }
      ], { duration: 600, delay: 60 + idx * 45, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    });
    setTimeout(function () { countUp(view); }, 120);
  }

  // ─── Scroll reveal for cards below the fold ──────────────────────────────
  var revealObserver = typeof IntersectionObserver === 'undefined'
    ? { observe: function (el) { el.classList.remove('am-pre'); }, disconnect: function () {} }
    : new IntersectionObserver(function (entries) {
        var batch = 0;
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var el = entry.target;
          revealObserver.unobserve(el);
          el.classList.remove('am-pre');
          el.animate([
            { opacity: 0, transform: 'translateY(28px) scale(.98)' },
            { opacity: 1, transform: 'none' }
          ], { duration: 650, delay: batch++ * 70, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
        });
      }, { rootMargin: '0px 0px -6% 0px', threshold: 0.05 });

  // ─── Page title: wipe-in reveal on every view change ─────────────────────
  function replayHeading() {
    var h = document.getElementById('pageHeading');
    var crumbs = h && h.previousElementSibling;
    if (!h || !h.animate) return;
    h.animate([
      { clipPath: 'inset(0 100% 0 0)', opacity: 0, transform: 'translateY(6px)' },
      { clipPath: 'inset(0 0 0 0)', opacity: 1, transform: 'none' }
    ], { duration: 700, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'backwards' });
    if (crumbs) {
      crumbs.animate([{ opacity: 0, transform: 'translateX(-8px)' }, { opacity: 1, transform: 'none' }],
        { duration: 500, delay: 80, easing: 'ease-out', fill: 'backwards' });
    }
  }

  // ─── KPI count-up ────────────────────────────────────────────────────────
  var NUM_RE = /^([^\d-]*?)(-?[\d,]+(?:\.\d+)?)(\s*[^\d\s]{0,4})$/;

  function countUp(root, selector) {
    var nodes = root.querySelectorAll(selector || '.text-2xl, .text-3xl, .text-4xl');
    var n = 0;
    for (var i = 0; i < nodes.length && n < 24; i++) {
      var el = nodes[i];
      if (el.children.length || !isVisible(el) || el.dataset.amCounting) continue;
      var original = el.textContent;
      var m = original.trim().match(NUM_RE);
      if (!m) continue;
      var raw = m[2];
      var target = parseFloat(raw.replace(/,/g, ''));
      if (!isFinite(target) || Math.abs(target) < 2) continue;
      n++;
      runCount(el, original, m[1], raw, m[3], target);
    }
  }

  function formatLike(sample, value) {
    var decimals = (sample.split('.')[1] || '').length;
    var fixed = value.toFixed(decimals);
    if (sample.indexOf(',') === -1) return fixed;
    // Preserve Indian (12,34,567) vs western (1,234,567) grouping
    var parts = fixed.split('.');
    var intPart = parts[0].replace('-', '');
    var neg = parts[0].charAt(0) === '-' ? '-' : '';
    var indian = /^\d{1,2},(\d{2},)*\d{3}/.test(sample.replace('-', '')) && sample.replace(/[^,]/g, '').length > 1;
    var grouped;
    if (indian && intPart.length > 3) {
      var last3 = intPart.slice(-3);
      var rest = intPart.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ',');
      grouped = rest + ',' + last3;
    } else {
      grouped = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return neg + grouped + (parts[1] ? '.' + parts[1] : '');
  }

  function runCount(el, original, prefix, raw, suffix, target) {
    el.dataset.amCounting = '1';
    var leading = original.match(/^\s*/)[0];
    var trailing = original.match(/\s*$/)[0];
    var duration = 900 + Math.min(600, Math.log10(Math.abs(target) + 1) * 120);
    var start = performance.now();
    var lastWritten = original;

    function frame(now) {
      // Someone else (live data, i18n) changed the text: stop and leave theirs
      if (el.textContent !== lastWritten) { delete el.dataset.amCounting; return; }
      var t = Math.min(1, (now - start) / duration);
      var eased = 1 - Math.pow(1 - t, 4);
      if (t < 1) {
        lastWritten = leading + prefix + formatLike(raw, target * eased) + suffix + trailing;
        el.textContent = lastWritten;
        requestAnimationFrame(frame);
      } else {
        el.textContent = original;
        delete el.dataset.amCounting;
      }
    }
    requestAnimationFrame(frame);
  }

  // ─── Watch for view switches ─────────────────────────────────────────────
  function watchViews() {
    var observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        var t = mutations[i].target;
        if (t.classList && t.classList.contains('view-section') && !t.classList.contains('hidden')) {
          var was = mutations[i].oldValue || '';
          if (/\bhidden\b/.test(was)) animateView(t);
        } else if (t.id === 'page-login' && !t.classList.contains('hidden')) {
          spawnParticles();
        }
      }
    });
    observer.observe(document.body, {
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
      attributeOldValue: true
    });
  }

  // ─── Cursor spotlight on cards ───────────────────────────────────────────
  // Spotlight + 3D tilt on cards, magnetic pull on primary buttons
  var TILT_MAX_WIDTH = 420; // wide panels look wrong tilting, so only small cards tilt
  var MAGNET_SELECTOR = 'button.bg-\\[\\#0B6623\\], a.bg-\\[\\#0B6623\\]';

  function bindSpotlight() {
    var pending = null, lastEvt = null, lastCard = null, lastBtn = null;
    document.addEventListener('pointermove', function (e) {
      if (e.pointerType === 'touch') return;
      lastEvt = e;
      if (pending) return;
      pending = requestAnimationFrame(function () {
        pending = null;
        var target = lastEvt.target;
        var card = target && target.closest && target.closest('.am-card');
        var btn = target && target.closest && target.closest(MAGNET_SELECTOR);

        if (lastCard && lastCard !== card) {
          lastCard.style.removeProperty('--am-rx');
          lastCard.style.removeProperty('--am-ry');
        }
        if (lastBtn && lastBtn !== btn) {
          lastBtn.style.removeProperty('--am-tx');
          lastBtn.style.removeProperty('--am-ty');
        }
        lastCard = card;
        lastBtn = btn;

        if (card) {
          var r = card.getBoundingClientRect();
          var x = lastEvt.clientX - r.left, y = lastEvt.clientY - r.top;
          card.style.setProperty('--am-mx', x + 'px');
          card.style.setProperty('--am-my', y + 'px');
          if (!reduceMotion && r.width <= TILT_MAX_WIDTH) {
            card.style.setProperty('--am-rx', ((0.5 - y / r.height) * 7).toFixed(2) + 'deg');
            card.style.setProperty('--am-ry', ((x / r.width - 0.5) * 9).toFixed(2) + 'deg');
          }
        }
        if (btn && !reduceMotion) {
          var b = btn.getBoundingClientRect();
          var dx = lastEvt.clientX - (b.left + b.width / 2);
          var dy = lastEvt.clientY - (b.top + b.height / 2);
          btn.style.setProperty('--am-tx', Math.max(-6, Math.min(6, dx * 0.18)).toFixed(1) + 'px');
          btn.style.setProperty('--am-ty', Math.max(-4, Math.min(4, dy * 0.25)).toFixed(1) + 'px');
        }
      });
    }, { passive: true });
  }

  // ─── Scroll progress under the header ────────────────────────────────────
  function bindScrollProgress() {
    var main = document.getElementById('mainScrollCanvas');
    if (!main) return;
    var bar = document.createElement('div');
    bar.className = 'am-scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    var queued = false;

    function place() {
      var r = main.getBoundingClientRect();
      bar.style.top = r.top + 'px';
      bar.style.left = r.left + 'px';
      bar.style.width = r.width + 'px';
      bar.style.display = r.width ? '' : 'none';
    }
    function update() {
      queued = false;
      var max = main.scrollHeight - main.clientHeight;
      bar.style.transform = 'scaleX(' + (max > 0 ? main.scrollTop / max : 0) + ')';
    }
    main.addEventListener('scroll', function () {
      if (queued) return;
      queued = true;
      requestAnimationFrame(update);
    }, { passive: true });
    window.addEventListener('resize', place);
    var sidebar = document.getElementById('portalSidebar');
    if (sidebar) sidebar.addEventListener('transitionend', place);
    var login = document.getElementById('page-login');
    if (login) new MutationObserver(place).observe(login, { attributes: true, attributeFilter: ['class'] });
    place();
    update();
  }

  // ─── Theme switch: circular reveal from the click point ──────────────────
  function bindThemeReveal() {
    var orig = window.togglePortalTheme;
    if (typeof orig !== 'function' || !document.startViewTransition || reduceMotion) return;
    var origin = { x: innerWidth - 120, y: 32 };
    document.addEventListener('pointerdown', function (e) { origin = { x: e.clientX, y: e.clientY }; }, true);
    window.togglePortalTheme = function () {
      var self = this, args = arguments;
      var x = origin.x, y = origin.y;
      var transition = document.startViewTransition(function () { orig.apply(self, args); });
      transition.ready.then(function () {
        var radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        document.documentElement.animate({
          clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)', 'circle(' + radius + 'px at ' + x + 'px ' + y + 'px)']
        }, { duration: 750, easing: 'cubic-bezier(.22,1,.36,1)', pseudoElement: '::view-transition-new(root)' });
      }).catch(function () {});
    };
  }

  // ─── Ripple on primary buttons ───────────────────────────────────────────
  function bindRipple() {
    document.addEventListener('pointerdown', function (e) {
      if (reduceMotion) return;
      var btn = e.target.closest && e.target.closest('button.bg-\\[\\#0B6623\\], a.bg-\\[\\#0B6623\\]');
      if (!btn) return;
      var r = btn.getBoundingClientRect();
      var size = Math.max(r.width, r.height);
      var ink = document.createElement('span');
      ink.className = 'am-ripple';
      ink.style.width = ink.style.height = size + 'px';
      ink.style.left = (e.clientX - r.left - size / 2) + 'px';
      ink.style.top = (e.clientY - r.top - size / 2) + 'px';
      btn.appendChild(ink);
      setTimeout(function () { ink.remove(); }, 700);
    }, { passive: true });
  }

  // ─── Login particles ─────────────────────────────────────────────────────
  function spawnParticles() {
    if (reduceMotion) return;
    var login = document.getElementById('page-login');
    var stage = login && login.firstElementChild;
    if (!stage || stage.dataset.amParticles) return;
    stage.dataset.amParticles = '1';
    for (var i = 0; i < 22; i++) {
      var p = document.createElement('span');
      var size = 4 + Math.random() * 10;
      p.className = 'am-particle';
      p.style.width = p.style.height = size + 'px';
      p.style.left = (Math.random() * 100) + '%';
      p.style.animationDuration = (10 + Math.random() * 14) + 's';
      p.style.animationDelay = (-Math.random() * 20) + 's';
      p.style.setProperty('--am-drift', (Math.random() * 120 - 60) + 'px');
      stage.appendChild(p);
    }
    // A few floating glass orbs over the photo
    [[150, '58%', '64%', 0], [90, '70%', '14%', -4], [56, '8%', '80%', -8]].forEach(function (o) {
      var orb = document.createElement('span');
      orb.className = 'am-orb';
      orb.style.width = orb.style.height = o[0] + 'px';
      orb.style.left = o[1];
      orb.style.top = o[2];
      orb.style.animationDelay = o[3] + 's';
      stage.appendChild(orb);
    });
    // Count the hero stats up (42.8k farmers, ₹4.82 Cr, 100%)
    setTimeout(function () { countUp(stage, '.text-base'); }, 500);
  }

  // ─── Liquid glass: blob layers + refraction filter ───────────────────────
  function makeBlobLayer() {
    var layer = document.createElement('div');
    layer.className = 'am-liquid-bg';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = '<span class="am-blob"></span><span class="am-blob"></span><span class="am-blob"></span><span class="am-blob"></span>';
    return layer;
  }

  function installLiquidGlass() {
    document.body.insertBefore(makeBlobLayer(), document.body.firstChild);
    var loginPanel = document.querySelector('#page-login > div:last-child');
    if (loginPanel) loginPanel.appendChild(makeBlobLayer());

    // SVG backdrop filters only render in Chromium; elsewhere plain blur is used
    var brands = navigator.userAgentData && navigator.userAgentData.brands;
    var chromium = brands && brands.some(function (b) { return /Chromium/.test(b.brand); });
    if (!chromium || reduceMotion) return;
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '0');
    svg.setAttribute('height', '0');
    svg.setAttribute('aria-hidden', 'true');
    svg.style.position = 'absolute';
    svg.innerHTML =
      '<filter id="am-liquid-refract" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB">' +
        '<feTurbulence type="fractalNoise" baseFrequency="0.006 0.011" numOctaves="2" seed="11" result="noise"/>' +
        '<feGaussianBlur in="noise" stdDeviation="2.5" result="soft"/>' +
        '<feDisplacementMap in="SourceGraphic" in2="soft" scale="34" xChannelSelector="R" yChannelSelector="G"/>' +
      '</filter>';
    document.body.appendChild(svg);
    document.documentElement.classList.add('am-refract');
  }

  // ─── Sidebar liquid pill ─────────────────────────────────────────────────
  function bindNavBlob() {
    var zone = document.getElementById('sidebarZoneB');
    if (!zone) return;
    var queued = false;

    function sync() {
      queued = false;
      var blob = zone.querySelector(':scope > .am-nav-blob');
      if (!blob) {
        blob = document.createElement('div');
        blob.className = 'am-nav-blob';
        zone.appendChild(blob);
        zone.classList.add('am-has-blob');
      }
      var sel = zone.querySelector('.child-nav-selected');
      if (!sel || !isVisible(sel)) { blob.style.opacity = '0'; return; }
      var zr = zone.getBoundingClientRect();
      var r = sel.getBoundingClientRect();
      var x = r.left - zr.left + zone.scrollLeft;
      var y = r.top - zr.top + zone.scrollTop;
      var moved = blob._y != null && Math.abs(blob._y - y) > 4;
      blob.style.width = r.width + 'px';
      blob.style.height = r.height + 'px';
      blob.style.transform = 'translate(' + x + 'px,' + y + 'px)';
      blob.style.opacity = '1';
      if (moved && !reduceMotion && blob.animate) {
        // squash-and-stretch while the pill travels, like a drop of liquid
        blob.animate([
          { scale: '1 1' }, { scale: '.9 1.45', offset: .3 }, { scale: '1.05 .9', offset: .7 }, { scale: '1 1' }
        ], { duration: 620, easing: 'ease-out' });
      }
      blob._y = y;
      if (!blob.classList.contains('am-ready')) {
        requestAnimationFrame(function () { blob.classList.add('am-ready'); });
      }
    }
    function queue() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(sync);
    }
    new MutationObserver(queue).observe(zone, { subtree: true, childList: true, attributes: true, attributeFilter: ['class'] });
    window.addEventListener('resize', queue);
    var sidebar = document.getElementById('portalSidebar');
    if (sidebar) sidebar.addEventListener('transitionend', queue);
    queue();
  }

  function init() {
    installLiquidGlass();
    bindNavBlob();
    watchViews();
    bindSpotlight();
    bindRipple();
    bindScrollProgress();
    bindThemeReveal();
    var login = document.getElementById('page-login');
    if (login && !login.classList.contains('hidden')) spawnParticles();
    var current = document.querySelector('.view-section:not(.hidden)');
    if (current) animateView(current);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
