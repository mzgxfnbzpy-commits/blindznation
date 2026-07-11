// ============================================================
// Blindznation — Shared Components
// ============================================================

// ─── SECURITY — form load timestamp (bot timing check) ───────────────────────
var _formLoadTime = Date.now();

// ─── SHARED CONTEXT — persist dims/room across product pages ─────────────────
window.pbCtx = (function() {
  var KEY = 'pbSharedCtx';
  function _get() { try { return JSON.parse(localStorage.getItem(KEY)) || {}; } catch(e) { return {}; } }
  function save(k, v) { try { var d = _get(); d[k] = v; localStorage.setItem(KEY, JSON.stringify(d)); } catch(e) {} }
  function get(k) { return _get()[k]; }
  function prefill(id, ctxKey, onFilled) {
    var el = document.getElementById(id);
    if (!el) return;
    var saved = _get()[ctxKey];
    if (saved !== undefined && saved !== '' && !el.value) {
      el.value = saved;
      if (onFilled) onFilled(saved);
    }
    el.addEventListener('input', function() { save(ctxKey, el.value); });
  }
  return { save: save, get: get, prefill: prefill };
})();


function _injectHead(isHome) {
  const prefix = isHome ? '' : '../';

  // Google Analytics — G-CBQP5S8CN6
  if (!document.querySelector('script[data-ga]')) {
    const gs = document.createElement('script');
    gs.async = true;
    gs.src = 'https://www.googletagmanager.com/gtag/js?id=G-CBQP5S8CN6';
    gs.setAttribute('data-ga', '1');
    document.head.appendChild(gs);
    const gi = document.createElement('script');
    gi.setAttribute('data-ga', '1');
    gi.textContent = 'window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("js",new Date());gtag("config","G-CBQP5S8CN6");';
    document.head.appendChild(gi);
  }

  // Canonical — derived from og:url already set per-page
  if (!document.querySelector('link[rel="canonical"]')) {
    const og = document.querySelector('meta[property="og:url"]');
    if (og) {
      const c = document.createElement('link');
      c.rel = 'canonical'; c.href = og.content;
      document.head.appendChild(c);
    }
  }

  // Theme color (mobile browser chrome)
  if (!document.querySelector('meta[name="theme-color"]')) {
    const m = document.createElement('meta');
    m.name = 'theme-color'; m.content = '#111110';
    document.head.appendChild(m);
  }

  // Favicon
  if (!document.querySelector('link[rel="icon"]')) {
    const l = document.createElement('link');
    l.rel = 'icon'; l.type = 'image/svg+xml';
    l.href = prefix + 'favicon.svg';
    document.head.appendChild(l);
  }

  // Default og:image / twitter:image (pages set their own to override)
  if (!document.querySelector('meta[property="og:image"]')) {
    const i = document.createElement('meta');
    i.setAttribute('property', 'og:image');
    i.content = 'https://blindznation.com/img/social-preview.png';
    document.head.appendChild(i);
  }
  if (!document.querySelector('meta[name="twitter:image"]')) {
    const i = document.createElement('meta');
    i.name = 'twitter:image';
    i.content = 'https://blindznation.com/img/social-preview.png';
    document.head.appendChild(i);
  }
  if (!document.querySelector('meta[property="og:image:width"]')) {
    const iw = document.createElement('meta'); iw.setAttribute('property','og:image:width'); iw.content = '1200';
    const ih = document.createElement('meta'); ih.setAttribute('property','og:image:height'); ih.content = '630';
    document.head.appendChild(iw); document.head.appendChild(ih);
  }

  // Local Business JSON-LD schema
  if (!document.querySelector('script[data-pb-schema]')) {
    const s = document.createElement('script');
    s.type = 'application/ld+json';
    s.setAttribute('data-pb-schema', '1');
    s.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "HomeAndConstructionBusiness"],
      "@id": "https://blindznation.com/#business",
      "name": "Blindznation",
      "alternateName": "Michael J. Healy Installations LLC",
      "description": "Custom window treatments — roller shades, cellular shades, roman shades, drapery, and plantation shutters. Professional fabrication and installation serving Salt Lake City, Utah and Philadelphia, PA.",
      "url": "https://blindznation.com",
      "telephone": "+16097421720",
      "email": "justin@blindznation.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Midvale",
        "addressRegion": "UT",
        "postalCode": "84047",
        "addressCountry": "US"
      },
      "geo": {"@type": "GeoCoordinates", "latitude": 40.6109, "longitude": -111.8997},
      "areaServed": [
        {"@type": "City", "name": "Salt Lake City"},
        {"@type": "AdministrativeArea", "name": "Salt Lake County, UT"},
        {"@type": "City", "name": "Midvale"},
        {"@type": "City", "name": "Orem"},
        {"@type": "City", "name": "Alta"},
        {"@type": "AdministrativeArea", "name": "Utah County, UT"},
        {"@type": "City", "name": "Park City"},
        {"@type": "City", "name": "Philadelphia"},
        {"@type": "AdministrativeArea", "name": "Montgomery County, PA"},
        {"@type": "State", "name": "Out of state — available nationwide"}
      ],
      "priceRange": "$$",
      "openingHoursSpecification": {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"],
        "opens": "08:00", "closes": "21:00"
      },
      "hasMap": "https://maps.google.com/?q=Midvale+UT+84047",
      "makesOffer": [
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Roller Shade Fabrication and Installation"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Cellular Honeycomb Shade Installation"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Roman Shade Fabrication and Installation"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Drapery Fabrication and Installation"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Norman Plantation Shutter Installation"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Motorized Window Treatment Installation"}},
        {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Free In-Home Window Treatment Consultation"}}
      ],
      "sameAs": []
    });
    document.head.appendChild(s);
  }

  // Organization schema
  if (!document.querySelector('script[data-bz-org-schema]')) {
    const o = document.createElement('script');
    o.type = 'application/ld+json';
    o.setAttribute('data-bz-org-schema', '1');
    o.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": "https://blindznation.com/#organization",
      "name": "Blindznation",
      "legalName": "Michael J. Healy Installations LLC",
      "url": "https://blindznation.com",
      "logo": "https://blindznation.com/img/social-preview.png",
      "telephone": "+16097421720",
      "email": "justin@blindznation.com",
      "foundingDate": "2014",
      "areaServed": [
        {"@type": "State", "name": "Utah"},
        {"@type": "State", "name": "Pennsylvania"},
        {"@type": "Country", "name": "United States"}
      ],
      "knowsAbout": [
        "Custom Window Treatments",
        "Roller Shades",
        "Cellular Shades",
        "Roman Shades",
        "Plantation Shutters",
        "Custom Drapery",
        "Woven Wood Shades",
        "Motorized Window Treatments",
        "Drapery Hardware"
      ]
    });
    document.head.appendChild(o);
  }

  // Service schema (Salt Lake City area)
  if (!document.querySelector('script[data-bz-service-schema]')) {
    const sv = document.createElement('script');
    sv.type = 'application/ld+json';
    sv.setAttribute('data-bz-service-schema', '1');
    sv.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Service",
      "name": "Custom Window Treatment Fabrication and Installation",
      "provider": {"@id": "https://blindznation.com/#business"},
      "serviceType": "Window Treatment Installation",
      "areaServed": [
        {"@type": "City", "name": "Salt Lake City", "containedInPlace": {"@type": "State", "name": "Utah"}},
        {"@type": "City", "name": "Midvale", "containedInPlace": {"@type": "State", "name": "Utah"}},
        {"@type": "City", "name": "Murray", "containedInPlace": {"@type": "State", "name": "Utah"}},
        {"@type": "City", "name": "Sandy", "containedInPlace": {"@type": "State", "name": "Utah"}},
        {"@type": "City", "name": "South Jordan", "containedInPlace": {"@type": "State", "name": "Utah"}},
        {"@type": "City", "name": "West Jordan", "containedInPlace": {"@type": "State", "name": "Utah"}},
        {"@type": "City", "name": "Draper", "containedInPlace": {"@type": "State", "name": "Utah"}},
        {"@type": "City", "name": "Orem", "containedInPlace": {"@type": "State", "name": "Utah"}},
        {"@type": "City", "name": "Provo", "containedInPlace": {"@type": "State", "name": "Utah"}},
        {"@type": "City", "name": "Park City", "containedInPlace": {"@type": "State", "name": "Utah"}},
        {"@type": "City", "name": "Alta", "containedInPlace": {"@type": "State", "name": "Utah"}},
        {"@type": "City", "name": "Philadelphia", "containedInPlace": {"@type": "State", "name": "Pennsylvania"}}
      ],
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Window Treatment Services",
        "itemListElement": [
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Roller Shades — Salt Lake City"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Roman Shades — Salt Lake City"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Plantation Shutters — Salt Lake City"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Custom Drapery — Salt Lake City"}},
          {"@type": "Offer", "itemOffered": {"@type": "Service", "name": "Motorized Window Treatments — Salt Lake City"}}
        ]
      }
    });
    document.head.appendChild(sv);
  }

  // Breadcrumb schema — auto-generated from og:url on every inner page
  if (!document.querySelector('script[data-bz-breadcrumb]')) {
    const ogUrl = document.querySelector('meta[property="og:url"]');
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogUrl && ogTitle && ogUrl.content !== 'https://blindznation.com/') {
      const pageTitle = ogTitle.content.replace(/\s*[—–-]\s*Blindznation\s*$/i, '').trim();
      const bc = document.createElement('script');
      bc.type = 'application/ld+json';
      bc.setAttribute('data-bz-breadcrumb', '1');
      bc.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
          {"@type":"ListItem","position":1,"name":"Blindznation","item":"https://blindznation.com/"},
          {"@type":"ListItem","position":2,"name":pageTitle,"item":ogUrl.content}
        ]
      });
      document.head.appendChild(bc);
    }
  }
}

function renderNav(activePage) {
  const pages = [
    { href: '../pages/shades.html', label: 'Shades & blinds' },
    { href: '../pages/soft-treatments.html', label: 'Soft treatments' },
    { href: '../pages/hardware.html', label: 'Hardware' },
    { href: '../pages/shutters.html', label: 'Shutters' },
    { href: '../pages/gallery.html', label: 'Our work' },
    { href: '../pages/upholstery.html', label: 'Custom upholstery' },
    { href: '../pages/installation.html', label: 'Installation' },
    { href: '../pages/measure.html', label: 'How to measure' },
    { href: '../pages/about.html', label: 'About' },
    { href: '../pages/fabric-calculator.html', label: 'Fabric calculator' },
    
  ];
  const isHome = activePage === 'home';
  const prefix = isHome ? 'pages/' : '../pages/';

  const root = isHome ? 'index.html' : '../index.html';
  const consultHref = isHome ? 'pages/consult.html' : '../pages/consult.html';

  document.getElementById('site-nav').innerHTML = `
    <div class="nav-identity">
      <span class="nav-company">Michael J. Healy Installations LLC</span>
      <div class="nav-brand-row">
        <a class="nav-brand-active" href="${root}">Blindznation</a>
        <span class="nav-brand-sep">·</span>
        <a class="nav-brand-other" href="https://www.phillyblinds.com" target="_blank" rel="noopener">Philly Blinds</a>
      </div>
    </div>
    <div class="nav-main">
      <a class="nav-logo" href="${root}">
        <svg width="28" height="16" viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle;margin-right:7px;flex-shrink:0">
          <path d="M20 130 C60 140, 120 50, 200 20 C230 8, 255 12, 265 30 C275 48, 260 68, 238 62 C220 58, 215 68, 240 72 C260 76, 270 90, 250 110 C230 130, 200 128, 180 115" stroke="#C9A96E" stroke-width="22" fill="none" stroke-linecap="round"/>
        </svg>Blind<em>znation</em>
      </a>
      <div class="nav-links">
        ${pages.map(p => {
          const href = isHome ? p.href.replace('../', '') : p.href;
          const active = p.label === activePage ? ' active' : '';
          return `<a href="${href}" class="${active}">${p.label}</a>`;
        }).join('')}
      </div>
      <div class="nav-right">
        <button class="nav-cart-btn" onclick="pbOpenCart()" aria-label="Open cart">
          🛒 Cart<span class="nav-cart-count" id="pb-nav-cart-count" style="display:none">0</span>
        </button>
        <a class="nav-phone" href="tel:6097421720">
          📞 (609) 742-1720 <span class="badge-24">24/7</span>
        </a>
        <a class="nav-cta" href="${consultHref}">Free consultation</a>
        <button class="nav-hamburger" id="nav-hamburger" aria-label="Open menu" onclick="_toggleDrawer()">
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
    <div class="nav-drawer" id="nav-drawer">
      ${pages.map(p => {
        const href = isHome ? p.href.replace('../', '') : p.href;
        const active = p.label === activePage ? ' active' : '';
        return `<a href="${href}" class="${active}">${p.label}</a>`;
      }).join('')}
      <a class="nav-drawer-phone-link" href="tel:6097421720">&#128222;&nbsp;&nbsp;(609) 742-1720 &mdash; call or text 24/7</a>
      <a class="nav-drawer-cta" href="${consultHref}">Free consultation</a>
    </div>
  `;
  _injectHead(isHome);
  _initCart();
  _initMotorModal();
  _initContactPanel();
  _initChatbot();
  _initMobileBar(consultHref);
}

function renderFooter(isHome) {
  const pre = isHome ? 'pages/' : '../pages/';
  // Shipping estimators are injected after footer renders (deferred so all form HTML is in DOM)
  document.getElementById('site-footer').innerHTML = `
    <div class="footer-grid">
      <div class="footer-col">
        <div class="footer-logo">
          <svg width="22" height="13" viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" style="display:inline-block;vertical-align:middle;margin-right:6px;flex-shrink:0">
            <path d="M20 130 C60 140, 120 50, 200 20 C230 8, 255 12, 265 30 C275 48, 260 68, 238 62 C220 58, 215 68, 240 72 C260 76, 270 90, 250 110 C230 130, 200 128, 180 115" stroke="#C9A96E" stroke-width="22" fill="none" stroke-linecap="round"/>
          </svg>Blind<em>znation</em>
        </div>
        <div class="footer-brand-alt">Philly Blinds</div>
        <div class="footer-company">Michael J. Healy Installations LLC</div>
        <div class="footer-tagline">Serving Philadelphia, South Jersey, Salt Lake City &amp; surrounding areas. Out-of-state available — product ships nationwide.</div>
        <a href="tel:6097421720" style="display:block;font-size:15px;font-weight:600;color:var(--gold);text-decoration:none;margin-bottom:2px">(609) 742-1720</a>
        <div style="font-size:11px;color:var(--text-faint);margin-bottom:6px">Justin Healy &mdash; call or text 24/7</div>
        <a href="mailto:justin@blindznation.com" style="font-size:12px;color:var(--text-muted);text-decoration:none">justin@blindznation.com</a>
      </div>
      <div class="footer-col">
        <h4>Shades</h4>
        <a href="${pre}shades.html?type=roller">Roller shades</a>
        <a href="${pre}shades.html">Cellular shades</a>
        <a href="${pre}shades.html">Zebra shades</a>
        <a href="${pre}shades.html">Woven wood</a>
        <a href="${pre}shades.html">Faux wood blinds</a>
        <a href="${pre}shades.html">Silhouette / Pirouette / Luminette</a>
      </div>
      <div class="footer-col">
        <h4>Soft treatments</h4>
        <a href="${pre}soft-treatments.html">Custom drapery</a>
        <a href="${pre}soft-treatments.html">Roman shades</a>
        <a href="${pre}hardware.html">Drapery hardware</a>
      </div>
      <div class="footer-col">
        <h4>Premium</h4>
        <a href="${pre}shutters.html">Plantation shutters</a>
        <a href="${pre}shades.html">Hunter Douglas</a>
      </div>
      <div class="footer-col">
        <h4>Help</h4>
        <a href="${pre}upholstery.html">Custom upholstery</a>
        <a href="${pre}installation.html">Installation services</a>
        <a href="${pre}measure.html">Measure: shades &amp; blinds</a>
        <a href="${pre}measure-shutters.html">Measure: shutters</a>
        <a href="${pre}measure-drapes.html">Measure: drapery</a>
        <a href="${pre}gallery.html">Our work</a>
        <a href="${pre}consult.html">Book consultation</a>
        <a href="${pre}about.html">About us</a>
        <a href="${pre}privacy.html">Privacy policy</a>
      </div>
    </div>
    <div class="footer-disc">Blindznation is an independent business providing professional installation and consulting services. Product names, logos, and trademarks are the property of their respective owners and are used for identification purposes only. Blindznation is not affiliated with, endorsed by, or sponsored by any manufacturer. &nbsp;·&nbsp; <a href="${pre}privacy.html" style="color:inherit;text-decoration:underline">Privacy Policy</a></div>
  `;
  setTimeout(function(){ _initShippingEstimators(); _initCartExtras(); _initFileUploads(); _initInstallationAddons(); _initShadeLabels(); }, 0);
}

function _toggleDrawer() {
  var btn    = document.getElementById('nav-hamburger');
  var drawer = document.getElementById('nav-drawer');
  if (!btn || !drawer) return;
  var open = drawer.classList.toggle('open');
  btn.classList.toggle('open', open);
  btn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

// Close mobile drawer when clicking a link inside it
document.addEventListener('click', function(e) {
  var drawer = document.getElementById('nav-drawer');
  var btn    = document.getElementById('nav-hamburger');
  if (!drawer || !drawer.classList.contains('open')) return;
  if (e.target.closest('.nav-drawer a') && !e.target.classList.contains('nav-drawer-cta')) {
    drawer.classList.remove('open');
    if (btn) btn.classList.remove('open');
  }
});

// Opt button toggle helper
function selOpt(el, groupId) {
  document.querySelectorAll('#' + groupId + ' .opt-btn').forEach(b => b.classList.remove('sel'));
  el.classList.add('sel');
}
function getOpt(groupId) {
  const s = document.querySelector('#' + groupId + ' .opt-btn.sel');
  return s ? s.textContent.trim() : '—';
}
function selOrToggle(el, groupId) {
  var was = el.classList.contains('sel');
  document.querySelectorAll('#' + groupId + ' .opt-btn').forEach(b => b.classList.remove('sel'));
  if (!was) el.classList.add('sel');
}

// ============================================================
// CONTACT PERSISTENCE
// ============================================================
var _PB_CONTACT_KEY = 'pb_contact_v1';

function pbGetContact() {
  try { return JSON.parse(localStorage.getItem(_PB_CONTACT_KEY) || '{}'); } catch(e) { return {}; }
}
function pbSaveContact(updates) {
  try {
    var cur = pbGetContact();
    for (var k in updates) if (Object.prototype.hasOwnProperty.call(updates, k) && updates[k] !== undefined) cur[k] = updates[k];
    localStorage.setItem(_PB_CONTACT_KEY, JSON.stringify(cur));
  } catch(e) {}
}

// Auto-fill all [data-pb-contact] inputs from saved data; attach input listeners to keep saving.
// Called once on DOMContentLoaded from shared.js init.
function pbAutoFillContact() {
  var c = pbGetContact();
  document.querySelectorAll('[data-pb-contact]').forEach(function(el) {
    var key = el.getAttribute('data-pb-contact');
    if (c[key] && !el.value) el.value = c[key];
    if (!el._pbCBound) {
      el._pbCBound = true;
      el.addEventListener('input', function() {
        var upd = {}; upd[key] = el.value.trim();
        pbSaveContact(upd);
      });
    }
  });
}

// Returns true when name + phone + email are filled; shows error in element with id=errId.
// Returns the first VISIBLE [data-pb-contact=key] input, falling back to the first match.
// Pages can have more than one contact form in the DOM; visibility preference stops a hidden
// form's empty fields from wrongly blocking the active form's submit.
function _pbContactEl(key) {
  var els = document.querySelectorAll('[data-pb-contact="' + key + '"]');
  for (var i = 0; i < els.length; i++) { if (els[i].offsetParent !== null) return els[i]; }
  return els[0] || null;
}

// Returns true when name + phone + email are filled; shows error in element with id=errId.
function pbContactValid(errId) {
  var nameEl  = _pbContactEl('name');
  var phoneEl = _pbContactEl('phone');
  var emailEl = _pbContactEl('email');
  var errEl   = errId ? document.getElementById(errId) : null;
  function _fail(msg, focusEl) {
    if (errEl) { errEl.textContent = msg; errEl.style.display = 'block'; }
    if (focusEl) { try { focusEl.scrollIntoView({ behavior:'smooth', block:'center' }); focusEl.focus(); } catch(e){} }
    return false;
  }
  if (!nameEl  || !nameEl.value.trim())  return _fail('Please enter your name.', nameEl);
  if (!phoneEl || !phoneEl.value.trim()) return _fail('Please enter your phone number.', phoneEl);
  if (!emailEl || !emailEl.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim()))
    return _fail('Please enter a valid email address.', emailEl);
  if (errEl) errEl.style.display = 'none';
  return true;
}

// ─────────────────────────────────────────────────────────────────────────────
// TERMS OF AGREEMENT — required acceptance before any "Submit Order for Review".
// One source of truth for the checkbox markup + validation, reused by the cart
// checkout modal (pbShowQuoteModal) and any inline contact form that carries a
// [data-pb-require-contact] submit button (checkbox auto-injected on load).
// Adding to cart never requires it — only submitting for review does.
// ─────────────────────────────────────────────────────────────────────────────
// Resolve the correct relative path to the terms page from any page depth.
function pbTermsHref() {
  var p = location.pathname || '';
  return /\/pages\//i.test(p) ? 'terms-of-agreement.html' : 'pages/terms-of-agreement.html';
}
var _pbTermsSeq = 0;
// Shared checkbox block. id defaults to 'cf-terms'; pass a unique id for other contexts.
function pbTermsCheckboxHTML(id) {
  id = id || 'cf-terms';
  return '<div class="pb-terms-row" style="display:flex;align-items:flex-start;gap:9px;margin:2px 0 12px;padding:11px 13px;background:#fafaf8;border:1px solid #e8e8e4;border-radius:9px">' +
      '<input type="checkbox" id="' + id + '" class="pb-terms-check" style="margin-top:1px;width:17px;height:17px;flex-shrink:0;cursor:pointer" ' +
        'onchange="var r=this.closest(\'.pb-terms-row\');if(r){r.style.borderColor=\'#e8e8e4\';r.style.background=\'#fafaf8\';}">' +
      '<label for="' + id + '" style="font-size:12px;color:#555;line-height:1.55;cursor:pointer">I have read and agree to the ' +
        '<a href="' + pbTermsHref() + '" target="_blank" rel="noopener" style="color:var(--gold);font-weight:600;text-decoration:underline">Terms of Agreement</a> ' +
        '<span style="color:#c0392b">*</span>. A copy will be emailed to me when I submit.</label>' +
    '</div>';
}
// Validate the terms checkbox is checked. scope = element to search within (default document).
// Graceful: if no VISIBLE checkbox is present in scope, returns true (page has no terms gate).
function pbTermsValid(scope, errId) {
  var root = scope || document;
  var boxes = Array.prototype.slice.call(root.querySelectorAll('.pb-terms-check'))
    .filter(function(b){ return b.offsetParent !== null; }); // visible only
  if (!boxes.length) return true;
  var unchecked = boxes.filter(function(b){ return !b.checked; });
  if (!unchecked.length) return true;
  var b = unchecked[0];
  var row = b.closest('.pb-terms-row');
  if (row) { row.style.borderColor = '#c0392b'; row.style.background = '#fff5f5'; }
  if (errId) { var el = document.getElementById(errId); if (el) { el.textContent = 'Please check the box to agree to the Terms of Agreement before submitting.'; el.style.display = 'block'; } }
  try { b.scrollIntoView({ behavior:'smooth', block:'center' }); } catch(e){}
  return false;
}
// Inject the terms checkbox just before any [data-pb-require-contact] submit button
// that doesn't already have one in its container. Runs on load (inline forms exist then).
function _pbInjectTermsCheckboxes() {
  var btns = document.querySelectorAll('[data-pb-require-contact]');
  Array.prototype.forEach.call(btns, function(btn) {
    if (btn._pbTermsInjected) return;
    var scope = btn.closest('.pb-cart-extras') || btn.closest('form') || btn.parentNode;
    if (scope && scope.querySelector('.pb-terms-check')) { btn._pbTermsInjected = true; return; }
    btn._pbTermsInjected = true;
    var holder = document.createElement('div');
    holder.innerHTML = pbTermsCheckboxHTML('cf-terms-' + (++_pbTermsSeq));
    var node = holder.firstChild;
    if (btn.parentNode) btn.parentNode.insertBefore(node, btn);
  });
}

// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL FINAL STEP — identical "Your details" contact + files step on every
// product configurator (ported from Philly Blinds — one source of truth).
// Usage:  <div id="pb-final-step"></div>
//   document.getElementById('pb-final-step').innerHTML =
//     pbContactStepHTML({ stepNum: 7, cartFn: "addFooToCart()", submitFn: "submitFooQuote()" });
// opts: { stepNum, submitFn (default "submitQuote()"), cartFn (omit to hide Add to Cart), bare }
function pbContactStepHTML(opts) {
  opts = opts || {};
  var stepNum  = opts.stepNum != null ? opts.stepNum : '';
  var submitFn = opts.submitFn || 'submitQuote()';
  var cartBtn  = opts.cartFn
    ? '<button class="btn-cart-add" onclick="' + opts.cartFn + '" style="width:100%;margin-bottom:8px">+ Add to Cart</button>'
    : '';
  var inner = '' +
      '<div class="pb-cart-extras">' +
        '<div class="dim-row">' +
          '<div class="form-group"><label>Name *</label><input type="text" id="cf-name" data-pb-contact="name" placeholder="Jane Smith"></div>' +
          '<div class="form-group"><label>Phone *</label><input type="tel" id="cf-phone" data-pb-contact="phone" placeholder="(215) 555-0100"></div>' +
        '</div>' +
        '<div class="form-group"><label>Email *</label><input type="email" id="cf-email" data-pb-contact="email" placeholder="jane@example.com"></div>' +
        '<div class="form-group"><label>Address <span style="font-weight:400;color:#888">(optional)</span></label><input type="text" id="cf-address" data-pb-contact="address" placeholder="123 Main St, Philadelphia PA"></div>' +
        '<div class="form-group"><label>Notes</label><textarea id="cf-notes" placeholder="Room name, ceiling height, fabric ideas, timeline &mdash; anything helpful" style="min-height:60px"></textarea></div>' +
        '<div style="border:1.5px dashed #ddd;border-radius:10px;padding:14px 16px;margin-bottom:12px;background:#fafaf8">' +
          '<div style="font-size:12px;font-weight:600;color:#333;margin-bottom:8px">&#128206; Attach photos or files <span style="font-weight:400;color:#999">(optional)</span></div>' +
          '<input type="file" id="cf-files" class="pb-ce-files" multiple accept="image/*,.pdf,.heic,.png,.jpg,.jpeg" style="width:100%;font-size:12px;color:#555;font-family:inherit;cursor:pointer;padding:4px 0" onchange="pbShowFileNames(this,\'cf-files-names\')">' +
          '<div id="cf-files-names" style="font-size:11px;color:#555;margin-top:6px;line-height:1.8"></div>' +
          '<div style="font-size:11px;color:#aaa;margin-top:5px;line-height:1.5">Window photos, room photos, measurements, inspiration &mdash; anything that helps.</div>' +
        '</div>' +
        // Honeypot — hidden from humans; bots that fill it are blocked in the submit interceptor.
        '<input type="text" id="pb-hp" name="pb-hp" tabindex="-1" autocomplete="off" aria-hidden="true" style="position:absolute;left:-9999px;top:auto;width:1px;height:1px;opacity:0;pointer-events:none">' +
        '<div id="cf-contact-err" style="display:none;background:#FEE2E2;border-radius:8px;padding:9px 13px;font-size:12px;color:#991B1B;margin-bottom:8px"></div>' +
        cartBtn +
        // Required Terms of Agreement acceptance — gates "Submit Order for Review" only (not Add to Cart).
        pbTermsCheckboxHTML('cf-terms') +
        '<button class="btn-gold" onclick="' + submitFn + '" style="width:100%;padding:13px;margin-top:4px" data-pb-require-contact="cf-contact-err">Submit Order for Review &rarr;</button>' +
      '</div>';
  if (opts.bare) return inner;
  return '' +
    '<div class="step-block" id="contact-block">' +
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">' +
        '<div class="step-num">' + stepNum + '</div>' +
        '<div class="step-title" style="margin-bottom:0">Your details</div>' +
      '</div>' +
      inner +
    '</div>';
}

// Adjust a numeric quantity <input id=id> by delta, clamped to [min,max]. Shared qty stepper.
function pbAdjQty(id, delta, min, max) {
  var el = document.getElementById(id);
  if (!el) return;
  min = (min == null ? 1 : min); max = (max == null ? 50 : max);
  var v = (parseInt(el.value, 10) || min) + delta;
  if (v < min) v = min; if (v > max) v = max;
  el.value = v;
}

// ─────────────────────────────────────────────────────────────────────────────
// CANONICAL STEP 1 — "Window measurements & mount" (ported from Philly Blinds).
// opts: { stepNum(1), title, widthId, heightId, qtyId, mountGroupId, widthMin/Max/Placeholder/Hint,
//         heightMin/Max/Placeholder/Hint, calc (default 'updateSummary()'), mountOnclick,
//         qtyMin(1)/qtyMax(50), measureHref('measure.html'), extraFieldsHTML, coupled, noMount, noQty, bare }
function pbSizeMountStepHTML(opts) {
  opts = opts || {};
  var stepNum = (opts.stepNum != null ? opts.stepNum : 1);
  var title   = opts.title || 'Window measurements &amp; mount';
  var calc    = opts.calc || 'updateSummary()';
  var wId = opts.widthId || 'inp-width', hId = opts.heightId || 'inp-height', qId = opts.qtyId || 'inp-qty';
  var wMin = (opts.widthMin != null ? opts.widthMin : 12),  wMax = (opts.widthMax != null ? opts.widthMax : 144);
  var hMin = (opts.heightMin != null ? opts.heightMin : 12), hMax = (opts.heightMax != null ? opts.heightMax : 144);
  var wPh = opts.widthPlaceholder || '36', hPh = opts.heightPlaceholder || '60';
  var wHint = opts.widthHint  || ('inches &mdash; ' + wMin + '&Prime; min &middot; ' + wMax + '&Prime; max');
  var hHint = opts.heightHint || ('inches &mdash; ' + hMin + '&Prime; min &middot; ' + hMax + '&Prime; max');
  var measureHref = opts.measureHref || 'measure.html';
  var grp = opts.mountGroupId || 'grp-mount';
  var mountOnclick = opts.mountOnclick || ("selOpt(this,'" + grp + "');" + calc);
  var qMin = (opts.qtyMin != null ? opts.qtyMin : 1), qMax = (opts.qtyMax != null ? opts.qtyMax : 50);

  var mount = opts.noMount ? '' :
    '<div style="font-size:12px;font-weight:600;color:#555;margin:14px 0 6px">Mount type</div>' +
    '<div class="opt-row" id="' + grp + '" style="margin-bottom:14px">' +
      '<button class="opt-btn sel" onclick="' + mountOnclick + '">Inside mount</button>' +
      '<button class="opt-btn" onclick="' + mountOnclick + '">Outside mount</button>' +
    '</div>';

  var coupledBtn = opts.coupled
    ? '<button id="coupled-toggle-btn" class="opt-btn" style="font-size:11px;padding:5px 12px" onclick="' + opts.coupled + '">+ Coupled Shades</button>'
    : '';
  var qty = opts.noQty ? '' :
    '<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap">' +
      '<span style="font-size:12px;color:#666">Qty:</span>' +
      '<div class="qty-btns">' +
        '<button class="qty-btn" onclick="pbAdjQty(\'' + qId + '\',-1,' + qMin + ',' + qMax + ');' + calc + '">&#8722;</button>' +
        '<input class="qty-num" type="number" id="' + qId + '" value="1" min="' + qMin + '" max="' + qMax + '" oninput="' + calc + '">' +
        '<button class="qty-btn" onclick="pbAdjQty(\'' + qId + '\',1,' + qMin + ',' + qMax + ');' + calc + '">&#43;</button>' +
      '</div>' + coupledBtn +
    '</div>';

  var inner =
    '<div class="dim-box">' +
      '<div class="dim-box-label">Enter your window size</div>' +
      '<div class="form-row">' +
        '<div class="form-group"><label>Width</label><input type="number" id="' + wId + '" min="' + wMin + '" max="' + wMax + '" step="0.125" placeholder="' + wPh + '" oninput="' + calc + '"><div class="dim-unit">' + wHint + '</div></div>' +
        '<div class="form-group"><label>Height</label><input type="number" id="' + hId + '" min="' + hMin + '" max="' + hMax + '" step="0.125" placeholder="' + hPh + '" oninput="' + calc + '"><div class="dim-unit">' + hHint + '</div></div>' +
      '</div>' + (opts.extraFieldsHTML || '') +
    '</div>' +
    '<div class="step-note" style="margin-bottom:10px"><a href="' + measureHref + '" style="color:var(--gold)">How to measure &rarr;</a> &bull; Approximate is fine &mdash; we confirm at the home visit.</div>' +
    mount + qty;

  if (opts.bare) return inner;
  return '<div class="step-block" id="size-mount-block">' +
    '<div style="display:flex;align-items:center;gap:10px;margin-bottom:10px">' +
      '<div class="step-num">' + stepNum + '</div>' +
      '<div class="step-title" style="margin-bottom:0">' + title + '</div>' +
    '</div>' + inner + '</div>';
}

// Auto-injects a notes/files + professional-installation block before any "Add to Cart"
// button that doesn't already have one (ported from Philly Blinds).
function _initCartExtras() {
  var btns = document.querySelectorAll('button');
  Array.prototype.forEach.call(btns, function(btn) {
    if (!/add to cart/i.test(btn.textContent || '')) return;
    if (/pbEstimateAddCart/.test(btn.getAttribute('onclick') || '')) return; // estimate panel has its own notes/files
    var container = btn.parentNode;
    if (!container || container.querySelector('.pb-cart-extras')) return;
    var id = 'ce-' + Math.random().toString(36).slice(2, 7);
    var wrap = document.createElement('div');
    wrap.className = 'pb-cart-extras';
    wrap.style.cssText = 'margin:0 0 12px';
    wrap.innerHTML =
      '<div style="border:1.5px dashed #ddd;border-radius:10px;padding:14px 16px;margin-bottom:12px;background:#fafaf8">' +
        '<div style="font-size:12px;font-weight:600;color:#333;margin-bottom:7px">&#128206; Add files / notes <span style="font-weight:400;color:#999">(optional)</span></div>' +
        '<textarea id="' + id + '-notes" placeholder="Room, timeline, questions, special requirements&hellip;" ' +
          'style="width:100%;box-sizing:border-box;font-family:inherit;font-size:12px;padding:8px 10px;border:1px solid #e8e8e4;border-radius:8px;resize:vertical;min-height:40px;margin-bottom:8px"></textarea>' +
        '<input type="file" id="' + id + '-files" class="pb-ce-files" multiple accept="image/*,.pdf,.heic,.png,.jpg,.jpeg" ' +
          'style="width:100%;font-size:12px;color:#555;font-family:inherit;cursor:pointer;padding:4px 0" onchange="pbShowFileNames(this,\'' + id + '-names\')">' +
        '<div id="' + id + '-names" style="font-size:11px;color:#555;margin-top:6px;line-height:1.8"></div>' +
        '<div style="font-size:11px;color:#aaa;margin-top:4px;line-height:1.5">Window/room photos, measurements, inspiration &mdash; anything that helps.</div>' +
      '</div>' +
      '<div style="border:2px solid var(--gold,#C9A96E);border-radius:12px;padding:14px 16px;background:var(--gold-mid,#FAF7EF)">' +
        '<label style="display:flex;align-items:flex-start;gap:11px;cursor:pointer">' +
          '<input type="checkbox" id="' + id + '-install" class="pb-ce-install" ' +
            'style="margin-top:2px;flex-shrink:0;width:19px;height:19px;cursor:pointer;accent-color:var(--espresso,#111110)">' +
          '<div>' +
            '<div style="font-size:14px;font-weight:700;color:#1a1a1a;margin-bottom:3px">&#128295; Add professional installation</div>' +
            '<div style="font-size:12px;color:#555;line-height:1.55">Our team installs it for you. Priced separately by location &amp; product &mdash; Justin confirms installation pricing in your quote.</div>' +
          '</div>' +
        '</label>' +
      '</div>';
    container.insertBefore(wrap, btn);
  });
}
// Pull notes / files / installation flag from the in-form block into the cart item, then reset it.
function _pbMergeCartExtras(item) {
  var ce = document.querySelector('.pb-cart-extras');
  if (!ce) return;
  var nEl = ce.querySelector('textarea');
  var fEl = ce.querySelector('.pb-ce-files');
  var iEl = ce.querySelector('.pb-ce-install');
  if (!item.notes && nEl && nEl.value.trim()) item.notes = nEl.value.trim();
  if ((!item._files || !item._files.length) && fEl && fEl.files && fEl.files.length) item._files = Array.prototype.slice.call(fEl.files);
  if (iEl && iEl.checked) {
    item.installation = true;
    item.lines = (item.lines || []).concat([{ label: 'Professional Installation', value: 'Requested — priced at quote' }]);
  }
  var labels = pbGetShadeLabels();
  if (labels) {
    item.labels = labels;
    item.lines = (item.lines || []).concat([{ label: 'Labels', value: labels }]);
  }
  if (nEl) nEl.value = '';
  if (fEl) fEl.value = '';
  var nm = ce.querySelector('[id$="-names"]'); if (nm) nm.innerHTML = '';
  if (iEl) iEl.checked = false;
}

// ── PER-UNIT LABELS — auto-injected after every .qty-btns stepper (ported from PB). ──
function pbRenderShadeLabels(wrap) {
  if (!wrap) return;
  var qtyEl = wrap._pbQtyEl;
  var count = 1;
  if (qtyEl) {
    var raw = (qtyEl.tagName === 'INPUT') ? qtyEl.value : qtyEl.textContent;
    count = parseInt(raw, 10) || 1;
  }
  if (count < 1) count = 1; if (count > 50) count = 50;
  var prev = {};
  Array.prototype.forEach.call(wrap.querySelectorAll('.pb-shade-label'), function(inp) {
    prev[inp.getAttribute('data-idx')] = inp.value;
  });
  var inStyle = 'padding:7px 10px;border:1px solid #ddd;border-radius:7px;font-size:12px;font-family:inherit;box-sizing:border-box';
  var html;
  if (count === 1) {
    html = '<div style="font-size:12px;font-weight:600;color:#555;margin-bottom:6px">Label <span style="font-weight:400;color:#999">(optional)</span></div>' +
           '<input type="text" class="pb-shade-label" data-idx="1" placeholder="e.g. Master bedroom window" style="' + inStyle + ';width:100%">';
  } else {
    html = '<div style="font-size:12px;font-weight:600;color:#555;margin-bottom:6px">Label each one <span style="font-weight:400;color:#999">(optional)</span></div>';
    for (var i = 1; i <= count; i++) {
      html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">' +
                '<span style="font-size:11px;color:#888;min-width:26px">#' + i + '</span>' +
                '<input type="text" class="pb-shade-label" data-idx="' + i + '" placeholder="Room / window ' + i + '" style="' + inStyle + ';flex:1;min-width:0">' +
              '</div>';
    }
  }
  wrap.innerHTML = html;
  Array.prototype.forEach.call(wrap.querySelectorAll('.pb-shade-label'), function(inp) {
    var k = inp.getAttribute('data-idx'); if (prev[k]) inp.value = prev[k];
  });
}
function _initShadeLabels() {
  document.querySelectorAll('.qty-btns').forEach(function(q) {
    if (q._pbLabelsInit) return; q._pbLabelsInit = true;
    var qtyEl = q.querySelector('.qty-num') || q.querySelector('input, span');
    var wrap = document.createElement('div');
    wrap.className = 'pb-labels-wrap';
    wrap.style.cssText = 'margin-top:12px';
    wrap._pbQtyEl = qtyEl;
    var host = q.parentNode;
    if (host && host.parentNode) host.parentNode.insertBefore(wrap, host.nextSibling);
    else q.parentNode.appendChild(wrap);
    var render = function() { setTimeout(function() { pbRenderShadeLabels(wrap); }, 0); };
    if (qtyEl) { qtyEl.addEventListener('input', render); qtyEl.addEventListener('change', render); }
    q.querySelectorAll('.qty-btn').forEach(function(b) { b.addEventListener('click', render); });
    pbRenderShadeLabels(wrap);
  });
}
// Collect the VISIBLE per-unit labels into a single string for the quote.
function pbGetShadeLabels() {
  var vals = [];
  document.querySelectorAll('.pb-shade-label').forEach(function(inp) {
    if (inp.offsetParent === null) return;
    var v = (inp.value || '').trim();
    if (v) vals.push(inp.getAttribute('data-idx') + ': ' + v);
  });
  return vals.join(' | ');
}

// ============================================================
// GLOBAL CART ENGINE
// ============================================================
var _PB_CART_KEY = 'pb_cart_v1';

function pbGetCart() {
  try { return JSON.parse(localStorage.getItem(_PB_CART_KEY) || '[]'); } catch(e) { return []; }
}
function _pbSaveCart(cart) {
  try { localStorage.setItem(_PB_CART_KEY, JSON.stringify(cart)); } catch(e) {}
  _updateCartBadge();
}
// In-memory file store: cartId -> [File,...]. Held in memory only (never serialized to
// localStorage — files would blow the ~5MB quota). Sent at checkout via base64 payload.
window._pbFiles = window._pbFiles || {};
// Transient extras (notes/files) captured from an estimate panel just before an item is added.
// Consumed once by pbAddToCart so it works for both direct adds and the motor-modal (async) path.
var _pbPendingExtras = null;

function pbAddToCart(item) {
  item.cartId = Date.now() + '-' + Math.floor(Math.random()*9999);
  // Merge any extras captured from the estimate panel (notes/files) if the item didn't set them
  if (_pbPendingExtras) {
    if (!item.notes && _pbPendingExtras.notes) item.notes = _pbPendingExtras.notes;
    if ((!item._files || !item._files.length) && _pbPendingExtras.files && _pbPendingExtras.files.length) item._files = _pbPendingExtras.files;
    _pbPendingExtras = null;
  }
  // Merge extras from the in-form "files / notes + professional installation" block (Add-to-Cart flow)
  _pbMergeCartExtras(item);
  if (item.notes == null) item.notes = '';
  // Move pending File objects into the per-item in-memory store; keep lightweight metadata on the item
  if (item._files && item._files.length) {
    window._pbFiles[item.cartId] = Array.prototype.slice.call(item._files);
    item.attachments = window._pbFiles[item.cartId].map(function(f){ return { name:f.name, type:f.type, size:f.size }; });
  } else if (!item.attachments) {
    item.attachments = [];
  }
  delete item._files;
  var cart = pbGetCart();
  cart.push(item);
  _pbSaveCart(cart);
  _pbCartToast(item.product || 'Item');
}
function pbRemoveCartItem(cartId) {
  if (window._pbFiles) delete window._pbFiles[cartId];
  _pbSaveCart(pbGetCart().filter(function(i){ return i.cartId !== cartId; }));
  _renderCartBody();
}
function pbClearCart() { window._pbFiles = {}; _pbSaveCart([]); _renderCartBody(); }

// ── Per-item notes (kept separate per cartId — one item's note never overwrites another's) ──
function pbSetItemNotes(cartId, text) {
  var cart = pbGetCart();
  for (var i = 0; i < cart.length; i++) { if (cart[i].cartId === cartId) { cart[i].notes = text; break; } }
  _pbSaveCart(cart);
}
// ── Per-item file attachments (held in memory, metadata mirrored on the cart item) ──
function pbAttachItemFiles(cartId, inputEl) {
  if (!inputEl || !inputEl.files || !inputEl.files.length) return;
  window._pbFiles = window._pbFiles || {};
  var existing = window._pbFiles[cartId] || [];
  Array.prototype.forEach.call(inputEl.files, function(f){ existing.push(f); });
  window._pbFiles[cartId] = existing;
  _pbSyncAttachMeta(cartId);
  inputEl.value = '';
  _renderCartBody();
}
function pbRemoveItemFile(cartId, idx) {
  var arr = (window._pbFiles && window._pbFiles[cartId]) || [];
  arr.splice(idx, 1);
  window._pbFiles[cartId] = arr;
  _pbSyncAttachMeta(cartId);
  _renderCartBody();
}
function _pbSyncAttachMeta(cartId) {
  var arr = (window._pbFiles && window._pbFiles[cartId]) || [];
  var cart = pbGetCart();
  for (var i = 0; i < cart.length; i++) {
    if (cart[i].cartId === cartId) { cart[i].attachments = arr.map(function(f){ return { name:f.name, type:f.type, size:f.size }; }); break; }
  }
  _pbSaveCart(cart);
}

function _updateCartBadge() {
  var n = pbGetCart().length;
  var b = document.getElementById('pb-nav-cart-count');
  if (b) { b.textContent = n; b.style.display = n ? 'flex' : 'none'; }
}
function _pbCartToast(name) {
  var t = document.getElementById('pb-cart-toast');
  if (!t) return;
  t.textContent = '✓ ' + name + ' added to cart';
  t.classList.add('show');
  setTimeout(function(){ t.classList.remove('show'); }, 2600);
}

// ── Cart drawer ──────────────────────────────────────────────
function pbOpenCart() {
  document.getElementById('pb-cart-overlay').classList.add('open');
  document.getElementById('pb-cart-drawer').classList.add('open');
  _renderCartBody();
}
function pbCloseCart() {
  document.getElementById('pb-cart-overlay').classList.remove('open');
  document.getElementById('pb-cart-drawer').classList.remove('open');
}
function _pbEsc(s) {
  return String(s)
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}

function _renderCartBody() {
  var cart = pbGetCart();
  var body = document.getElementById('pb-cart-body');
  if (!body) return;
  _updateCartBadge();
  var foot = document.getElementById('pb-cart-foot');
  if (!cart.length) {
    body.innerHTML = '<div class="pb-cart-empty"><div class="pb-cart-empty-icon">🛒</div>Your cart is empty.<br><span style="font-size:12px">Configure a product and click "+ Add to Cart."</span></div>';
    if (foot) foot.style.display = 'none';
    return;
  }
  if (foot) foot.style.display = 'block';
  var pricedTotal = 0;
  var hasCustom = false;
  body.innerHTML = cart.map(function(item) {
    var motorHtml = '';
    if (item.motorized && item.motorOptions) {
      var mo = item.motorOptions;
      var mlines = ['Power: ' + mo.power];
      if (mo.power === 'Rechargeable' && mo.chargers) mlines.push('Chargers: ' + mo.chargers);
      if (mo.power === 'Hardwire') {
        mlines.push('Wiring: ' + mo.wiring);
        if (mo.cord) mlines.push('Cord: ' + mo.cord);
      }
      if (mo.remote === 'Yes') mlines.push('Remote: ' + mo.channel + ' × ' + mo.remotes);
      else mlines.push('Remote: No');
      motorHtml = '<div class="pb-ci-motor">⚡ ' + mlines.map(_pbEsc).join(' · ') + '</div>';
    }
    var itemQty = item.qty || 1;
    var priceHtml = '';
    if (item.price && item.price > 0) {
      var lineTotal = Math.round(item.price * itemQty);
      pricedTotal += lineTotal;
      priceHtml = '<div style="font-size:14px;font-weight:700;color:var(--espresso);margin-top:6px">$' + lineTotal.toLocaleString() + ' <span style="font-size:10px;font-weight:400;color:#aaa">est.</span></div>';
    } else {
      hasCustom = true;
      priceHtml = '<div style="font-size:12px;color:#888;margin-top:6px;font-style:italic">Custom quote</div>';
    }
    // Per-item attachment chips (with remove ×)
    var atts = item.attachments || [];
    var attHtml = atts.map(function(a, ai) {
      return '<span style="display:inline-flex;align-items:center;gap:4px;background:#f0ede7;border-radius:5px;padding:2px 7px;margin:4px 5px 0 0;font-size:11px;color:#555;max-width:100%">' +
        '<span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">📎 ' + _pbEsc(a.name) + '</span>' +
        '<span onclick="pbRemoveItemFile(\'' + _pbEsc(item.cartId) + '\',' + ai + ')" style="cursor:pointer;color:#b00;font-weight:700;flex-shrink:0" aria-label="Remove file">×</span></span>';
    }).join('');
    var fid = 'pbci-f-' + _pbEsc(item.cartId);
    var notesFilesHtml =
      '<div style="margin-top:10px;border-top:1px dashed #eee;padding-top:9px">' +
        '<textarea onchange="pbSetItemNotes(\'' + _pbEsc(item.cartId) + '\',this.value)" placeholder="Notes for this item (room, timeline, questions)…" ' +
          'style="width:100%;box-sizing:border-box;font-family:inherit;font-size:12px;padding:7px 9px;border:1px solid #e8e8e4;border-radius:7px;resize:vertical;min-height:38px">' + _pbEsc(item.notes || '') + '</textarea>' +
        (attHtml ? '<div style="margin-top:4px">' + attHtml + '</div>' : '') +
        '<label style="display:inline-block;margin-top:8px;font-size:11px;color:var(--gold,#C8973F);font-weight:600;cursor:pointer">📎 Attach photos / PDFs' +
          '<input type="file" id="' + fid + '" multiple accept="image/*,.pdf,.heic,.png,.jpg,.jpeg" style="display:none" onchange="pbAttachItemFiles(\'' + _pbEsc(item.cartId) + '\',this)">' +
        '</label>' +
      '</div>';
    return '<div class="pb-ci">' +
      '<div style="display:flex;justify-content:space-between;align-items:flex-start;gap:6px">' +
        '<div style="flex:1;min-width:0">' +
          '<div class="pb-ci-name">' + _pbEsc(item.product || 'Item') + (itemQty > 1 ? ' ×' + itemQty : '') + '</div>' +
          (item.specs ? '<div class="pb-ci-specs">' + _pbEsc(item.specs) + '</div>' : '') +
          motorHtml +
          priceHtml +
        '</div>' +
        '<button class="pb-ci-remove" onclick="pbRemoveCartItem(\'' + _pbEsc(item.cartId) + '\')" aria-label="Remove">×</button>' +
      '</div>' +
      notesFilesHtml +
    '</div>';
  }).join('');
  var totEl = document.getElementById('pb-cart-est-total');
  if (totEl) {
    if (pricedTotal > 0) {
      totEl.innerHTML =
        '<div style="display:flex;justify-content:space-between;align-items:baseline;padding:12px 0 4px;border-top:2px solid #e8e8e4;margin-top:4px">' +
          '<span style="font-size:12px;color:#555;font-weight:600">Estimated total' + (hasCustom ? '*' : '') + '</span>' +
          '<span style="font-size:22px;font-weight:700;color:var(--espresso)">$' + pricedTotal.toLocaleString() + '</span>' +
        '</div>' +
        (hasCustom ? '<div style="font-size:10px;color:#aaa;margin-bottom:4px">* Custom-quote items not included in total above</div>' : '') +
        '<div style="font-size:10px;color:#aaa;margin-bottom:10px">Estimate only — final price confirmed at review</div>';
    } else {
      totEl.innerHTML = '<div style="font-size:11px;color:#aaa;padding:10px 0;text-align:center">Prices confirmed after Justin reviews your specs — no charge until then.</div>';
    }
  }
}

// ── Checkout from cart ───────────────────────────────────────
var PB_CHECKOUT_URL = '#checkout';

function pbGoCheckout() {
  var cart = pbGetCart();
  if (!cart.length) return;
  var allLines = [];
  var pricedTotal = 0;
  var hasPrice = false;
  var hasCustom = false;
  var checkoutFiles = [];   // all File objects across all cart items, for the email payload
  cart.forEach(function(item, i) {
    var itemQty = item.qty || 1;
    allLines.push({ label: '─── Item ' + (i + 1), value: (item.product || 'Item') + (itemQty > 1 ? ' ×' + itemQty : '') });
    if (item.lines && item.lines.length) {
      item.lines.forEach(function(l) { allLines.push(l); });
    } else if (item.specs) {
      item.specs.split(' | ').forEach(function(s) {
        var idx = s.indexOf(': ');
        allLines.push(idx > -1 ? { label: s.slice(0,idx), value: s.slice(idx+2) } : { label: s, value: '' });
      });
    }
    if (item.motorized && item.motorOptions) {
      var mo = item.motorOptions;
      var mstr = 'Power: ' + mo.power;
      if (mo.remote === 'Yes') mstr += ' | Remote: ' + mo.channel + ' ×' + mo.remotes;
      allLines.push({ label: 'Motorization', value: mstr });
    }
    if (item.price && item.price > 0) {
      var lineTotal = Math.round(item.price * itemQty);
      allLines.push({ label: 'Estimate', value: '$' + lineTotal.toLocaleString() + ' (estimate only)' });
      pricedTotal += lineTotal;
      hasPrice = true;
    } else {
      hasCustom = true;
      allLines.push({ label: 'Price', value: 'Custom quote' });
    }
    // Per-item notes — kept directly under this item so they never bleed into another product
    if (item.notes && item.notes.trim()) allLines.push({ label: 'Notes', value: item.notes.trim() });
    // Per-item file attachments — gather the in-memory Files and list their names under this item
    var fl = (window._pbFiles && window._pbFiles[item.cartId]) || [];
    if (fl.length) {
      fl.forEach(function(f){ checkoutFiles.push(f); });
      allLines.push({ label: 'Attachments', value: fl.map(function(f){ return f.name; }).join(', ') });
    }
  });
  var productName = cart.length === 1 ? (cart[0].product || 'Custom Window Treatment') : cart.length + ' items';
  pbCloseCart();
  pbShowQuoteModal(allLines, productName, hasPrice ? pricedTotal : null, checkoutFiles);
}

// ── Inject cart DOM ─────────────────────────────────────────
function _initCart() {
  if (document.getElementById('pb-cart-overlay')) return;

  // Toast
  var toast = document.createElement('div');
  toast.id = 'pb-cart-toast'; toast.className = 'pb-cart-toast';
  document.body.appendChild(toast);

  // Overlay
  var overlay = document.createElement('div');
  overlay.id = 'pb-cart-overlay'; overlay.className = 'pb-cart-overlay';
  overlay.addEventListener('click', pbCloseCart);
  document.body.appendChild(overlay);

  // Drawer
  var drawer = document.createElement('div');
  drawer.id = 'pb-cart-drawer'; drawer.className = 'pb-cart-drawer';
  drawer.innerHTML =
    '<div class="pb-cart-drawer-head">' +
      '<div><div class="pb-cart-drawer-title">Your cart</div></div>' +
      '<button class="pb-cart-close" onclick="pbCloseCart()">×</button>' +
    '</div>' +
    '<div class="pb-cart-body" id="pb-cart-body"></div>' +
    '<div id="pb-cart-foot" style="padding:16px;border-top:1px solid #e8e8e4;display:none">' +
      '<div id="pb-cart-est-total"></div>' +
      '<button class="btn-gold" style="width:100%;padding:13px;font-size:15px;font-weight:600;margin-bottom:8px" ' +
        'onclick="pbGoCheckout()">Submit Order for Review →</button>' +
      '<div style="text-align:center;font-size:11px;color:#aaa;margin-bottom:12px">No payment now &bull; Justin reviews before any charge</div>' +
      '<button onclick="pbClearCart()" style="display:block;width:100%;background:none;border:none;font-size:11px;color:#ccc;cursor:pointer;font-family:inherit">Clear cart</button>' +
    '</div>';
  document.body.appendChild(drawer);

  _updateCartBadge();
}

// ============================================================
// MOTOR OPTIONS MODAL
// ============================================================
var _pmmCallback = null;

function pbAddToCartWithMotor(item, isMotorized) {
  if (!isMotorized) { pbAddToCart(item); return; }
  _pmmCallback = function(opts) {
    item.motorized = true;
    item.motorOptions = opts;
    pbAddToCart(item);
  };
  var ov = document.getElementById('pb-motor-overlay');
  if (ov) {
    // reset
    ov.querySelectorAll('.pmm-opt').forEach(function(b){ b.classList.remove('sel'); });
    ['pmm-rechargeable-opts','pmm-hardwire-opts','pmm-cord-opts','pmm-remote-detail'].forEach(function(id){
      var el = document.getElementById(id); if(el) el.style.display='none';
    });
    ov.classList.add('open');
  }
}

function _pmmSel(btn, grpId) {
  document.querySelectorAll('#' + grpId + ' .pmm-opt').forEach(function(b){ b.classList.remove('sel'); });
  btn.classList.add('sel');
}
function _pmmGet(grpId) {
  var s = document.querySelector('#' + grpId + ' .pmm-opt.sel');
  return s ? s.textContent.trim() : '';
}
function _pmmPower(type) {
  document.getElementById('pmm-rechargeable-opts').style.display = type==='rechargeable' ? 'block':'none';
  document.getElementById('pmm-hardwire-opts').style.display     = type==='hardwire'     ? 'block':'none';
}
function _pmmWiring(type) {
  document.getElementById('pmm-cord-opts').style.display = type==='plugin' ? 'block':'none';
}
function _pmmRemote(val) {
  document.getElementById('pmm-remote-detail').style.display = val==='yes' ? 'block':'none';
}
function _pmmConfirm() {
  var power = _pmmGet('pmm-grp-power');
  if (!power) { alert('Please select a power type.'); return; }
  var remote = _pmmGet('pmm-grp-remote');
  if (!remote) { alert('Please choose whether you need a remote.'); return; }
  var opts = { power: power };
  if (power === 'Rechargeable') opts.chargers = _pmmGet('pmm-grp-chargers') || '1';
  if (power === 'Hardwire') {
    opts.wiring = _pmmGet('pmm-grp-wiring');
    if (opts.wiring === 'Line voltage (plug-in)') opts.cord = _pmmGet('pmm-grp-cord') || '6 ft';
  }
  opts.remote = remote === 'Yes' ? 'Yes' : 'No';
  if (remote === 'Yes') {
    opts.channel = _pmmGet('pmm-grp-channel') || 'Multi channel';
    opts.remotes = _pmmGet('pmm-grp-remotes') || '1';
  }
  document.getElementById('pb-motor-overlay').classList.remove('open');
  if (_pmmCallback) { _pmmCallback(opts); _pmmCallback = null; }
}

function _initMotorModal() {
  if (document.getElementById('pb-motor-overlay')) return;
  var ov = document.createElement('div');
  ov.id = 'pb-motor-overlay'; ov.className = 'pb-motor-overlay';
  ov.addEventListener('click', function(e){ if(e.target===ov) ov.classList.remove('open'); });
  ov.innerHTML =
    '<div class="pb-motor-modal">' +
      '<div class="pb-motor-modal-head">⚡ Motorization options</div>' +
      '<div class="pb-motor-modal-sub">Tell us how you want this shade powered and controlled.</div>' +

      // Power type
      '<div class="pmm-section"><div class="pmm-label">Power type</div>' +
        '<div class="pmm-row" id="pmm-grp-power">' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-power\');_pmmPower(\'rechargeable\')">Rechargeable</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-power\');_pmmPower(\'hardwire\')">Hardwire</button>' +
        '</div></div>' +

      // Rechargeable sub
      '<div id="pmm-rechargeable-opts" style="display:none" class="pmm-sub">' +
        '<div class="pmm-sub-label">Number of chargers</div>' +
        '<div class="pmm-row" id="pmm-grp-chargers">' +
          '<button class="pmm-opt sel" onclick="_pmmSel(this,\'pmm-grp-chargers\')">1</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-chargers\')">2</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-chargers\')">3</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-chargers\')">4+</button>' +
        '</div></div>' +

      // Hardwire sub
      '<div id="pmm-hardwire-opts" style="display:none" class="pmm-sub">' +
        '<div class="pmm-sub-label">Wiring type</div>' +
        '<div class="pmm-row" id="pmm-grp-wiring">' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-wiring\');_pmmWiring(\'lowv\')">Low voltage</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-wiring\');_pmmWiring(\'plugin\')">Line voltage (plug-in)</button>' +
        '</div>' +
        '<div id="pmm-cord-opts" style="display:none;margin-top:12px">' +
          '<div class="pmm-sub-label">Cord length</div>' +
          '<div class="pmm-row" id="pmm-grp-cord">' +
            '<button class="pmm-opt sel" onclick="_pmmSel(this,\'pmm-grp-cord\')">6 ft</button>' +
            '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-cord\')">10 ft</button>' +
          '</div></div></div>' +

      // Remote
      '<div class="pmm-section"><div class="pmm-label">Do you want a remote?</div>' +
        '<div class="pmm-row" id="pmm-grp-remote">' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remote\');_pmmRemote(\'yes\')">Yes</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remote\');_pmmRemote(\'no\')">No</button>' +
        '</div></div>' +

      // Remote detail
      '<div id="pmm-remote-detail" style="display:none" class="pmm-sub">' +
        '<div class="pmm-sub-label">Channels</div>' +
        '<div class="pmm-row" id="pmm-grp-channel">' +
          '<button class="pmm-opt sel" onclick="_pmmSel(this,\'pmm-grp-channel\')">Multi channel</button>' +
        '</div>' +
        '<div class="pmm-note" style="margin-bottom:8px">Norman remotes are multi-channel — control each shade independently, or assign several to the same channel to move together.</div>' +
        '<div class="pmm-sub-label" style="margin-top:8px">Number of remotes</div>' +
        '<div class="pmm-row" id="pmm-grp-remotes">' +
          '<button class="pmm-opt sel" onclick="_pmmSel(this,\'pmm-grp-remotes\')">1</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remotes\')">2</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remotes\')">3</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remotes\')">4+</button>' +
        '</div></div>' +

      // Confirm
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:20px">' +
        '<button onclick="_pbPendingExtras=null;document.getElementById(\'pb-motor-overlay\').classList.remove(\'open\')" ' +
          'style="padding:11px;border:1.5px solid #e8e8e4;border-radius:8px;background:#fff;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit">Cancel</button>' +
        '<button onclick="_pmmConfirm()" class="btn-gold" style="padding:11px;font-size:14px">Add to cart →</button>' +
      '</div>' +
    '</div>';
  document.body.appendChild(ov);
}

// ============================================================
// ESTIMATE PANEL + CHECKOUT
// ============================================================

var PB_TARIFF_RATE = 0; // default 0 — set per product when tariffs apply

/**
 * Render a clean line-by-line estimate panel after a price box.
 * Call this from each configurator's calc function.
 *
 * @param {string} priceBoxId   — the existing dark price box element ID
 * @param {Array}  lines        — [{label, value}] list of selected options
 * @param {number} subtotal     — calculated price before tariff
 * @param {string} conflictMsg  — non-empty string = show error, block checkout
 * @param {Function} onCheckout — called when user clicks 'Request a Quote' (after validation)
 */
function pbRenderEstimate(priceBoxId, lines, subtotal, conflictMsg, onCheckout) {
  var priceBox = document.getElementById(priceBoxId);
  if (!priceBox) return;

  var panelId = priceBoxId + '-checkout-panel';
  var panel = document.getElementById(panelId);
  if (!panel) {
    panel = document.createElement('div');
    panel.id = panelId;
    panel.style.cssText = 'margin-top:12px;background:#fff;border:1px solid #e8e8e4;border-radius:12px;overflow:hidden';
    priceBox.after(panel);
  }

  var hasConflict = conflictMsg && conflictMsg.trim().length > 0;
  var tariffAmt   = (subtotal && PB_TARIFF_RATE > 0) ? Math.round(subtotal * PB_TARIFF_RATE) : 0;
  var total       = subtotal ? subtotal + tariffAmt : 0;

  var linesHtml = lines.map(function(l) {
    return '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:6px 0;border-bottom:1px solid #f5f5f3">' +
      '<span style="font-size:12px;color:#666;flex-shrink:0">' + l.label + '</span>' +
      '<span style="font-size:12px;font-weight:500;color:#1a1a1a;text-align:right">' + l.value + '</span>' +
      '</div>';
  }).join('');

  var estimateHtml = total
    ? '<div style="background:#FBF7F0;border-radius:10px;padding:14px 16px;margin:12px 0 8px">' +
        '<div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:6px">&#x1F4CB; Estimate Only</div>' +
        (tariffAmt ? '<div style="display:flex;justify-content:space-between;font-size:12px;color:#888;margin-bottom:4px"><span>Subtotal</span><span>$' + subtotal.toFixed(0) + '</span></div>' +
          '<div style="display:flex;justify-content:space-between;font-size:12px;color:#b45309;margin-bottom:4px"><span>Tariff (' + Math.round(PB_TARIFF_RATE*100) + '%)</span><span>+$' + tariffAmt.toFixed(0) + '</span></div>' : '') +
        '<div style="display:flex;justify-content:space-between;align-items:baseline;border-top:1px solid #e8ddc8;padding-top:8px;margin-top:4px">' +
          '<span style="font-size:13px;font-weight:600;color:#1a1a1a">Estimated total</span>' +
          '<span style="font-size:22px;font-weight:700;color:var(--espresso)">$' + total.toFixed(0) + '</span>' +
        '</div>' +
      '</div>'
    : '<div style="font-size:12px;color:#aaa;padding:8px 0">Enter dimensions above to see an estimate.</div>';

  var conflictHtml = hasConflict
    ? '<div style="background:#FEE2E2;border-radius:8px;padding:10px 13px;margin-bottom:12px;font-size:12px;color:#991B1B;line-height:1.5">&#9888; ' + conflictMsg + '</div>'
    : '';

  panel._pbLines      = lines;
  panel._pbProduct    = lines.length ? lines[0].value : '';
  panel._pbEstimate   = total || null;
  panel._pbOnCheckout = onCheckout || null;

  panel.innerHTML =
    '<div style="padding:16px 18px">' +
      '<div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:12px">Your configuration</div>' +
      linesHtml +
      estimateHtml +
      '<div style="font-size:10px;color:#aaa;line-height:1.6;margin-bottom:10px">&#9432; This is an estimate only. Final price is confirmed after your free in-home measurement. Actual price may vary based on exact dimensions, fabric availability, and installation scope.</div>' +
      conflictHtml +
      // Per-item notes + attachments — captured into the cart item on Add to Cart
      '<div style="margin:2px 0 12px">' +
        '<textarea id="' + priceBoxId + '-note" placeholder="Notes for this item — room, timeline, questions (optional)" style="width:100%;box-sizing:border-box;font-family:inherit;font-size:12px;padding:8px 10px;border:1px solid #e8e8e4;border-radius:8px;resize:vertical;min-height:40px"></textarea>' +
        '<div style="margin-top:8px;font-size:11px;color:#888;font-weight:600">&#128206; Attach photos / PDFs <span style="font-weight:400;color:#aaa">(optional)</span></div>' +
        '<input type="file" id="' + priceBoxId + '-files" multiple accept="image/*,.pdf,.heic,.png,.jpg,.jpeg" style="width:100%;font-size:11px;color:#555;font-family:inherit;cursor:pointer;padding:3px 0" onchange="pbShowFileNames(this,\'' + priceBoxId + '-fnames\')">' +
        '<div id="' + priceBoxId + '-fnames" style="font-size:11px;color:#555;margin-top:4px;line-height:1.7"></div>' +
      '</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
        '<button onclick="pbEstimateAddCart(\'' + priceBoxId + '\')" style="padding:11px;border:2px solid var(--espresso);border-radius:8px;background:#fff;font-size:13px;font-weight:600;cursor:pointer;font-family:inherit;color:var(--espresso)">+ Add to Cart</button>' +
        '<button onclick="pbPanelSubmit(\'' + priceBoxId + '\')" ' +
          (hasConflict ? 'disabled style="padding:11px;border-radius:8px;background:#e5e5e5;font-size:13px;font-weight:700;cursor:not-allowed;font-family:inherit;color:#aaa;border:none"' :
                         'style="padding:11px;border-radius:8px;background:var(--espresso);color:var(--gold);font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;border:none"') +
          '>Submit Order for Review &#8594;</button>' +
      '</div>' +
    '</div>';
}

function pbOpenQuoteFromPanel(priceBoxId) {
  var panel = document.getElementById(priceBoxId + '-checkout-panel');
  if (!panel) return;
  pbShowQuoteModal(panel._pbLines || [], panel._pbProduct || '', panel._pbEstimate || null);
}

// Read the notes textarea + file input from an estimate panel
function _pbReadPanelExtras(priceBoxId) {
  var nEl = document.getElementById(priceBoxId + '-note');
  var fEl = document.getElementById(priceBoxId + '-files');
  return {
    notes: nEl ? nEl.value.trim() : '',
    files: (fEl && fEl.files) ? Array.prototype.slice.call(fEl.files) : []
  };
}
function _pbResetPanelExtras(priceBoxId) {
  var nEl = document.getElementById(priceBoxId + '-note');   if (nEl) nEl.value = '';
  var fEl = document.getElementById(priceBoxId + '-files');  if (fEl) fEl.value = '';
  var fn  = document.getElementById(priceBoxId + '-fnames'); if (fn)  fn.innerHTML = '';
}

function pbEstimateAddCart(priceBoxId) {
  var panel = document.getElementById(priceBoxId + '-checkout-panel');
  // Stash notes/files so they attach to the next item added (works for both the direct
  // add path and the async motorization-modal path, which adds later via pbAddToCart).
  _pbPendingExtras = _pbReadPanelExtras(priceBoxId);
  if (panel && panel._pbOnCheckout) {
    panel._pbOnCheckout(false);
    _pbResetPanelExtras(priceBoxId);
    return true;
  } else if (panel && panel._pbLines) {
    var lines = panel._pbLines || [];
    var specs = lines.map(function(l){ return l.label + ': ' + l.value; }).join(' | ');
    pbAddToCart({ product: panel._pbProduct || 'Item', specs: specs, lines: lines, price: panel._pbEstimate || null, qty: 1 });
    _pbResetPanelExtras(priceBoxId);
    return true;
  } else {
    _pbPendingExtras = null;
    pbOpenCart();
    return false;
  }
}

// "Submit Order for Review" from a product panel: add the current config (with its notes/files)
// to the cart, then open checkout for the whole cart (requires name + email + phone).
function pbPanelSubmit(priceBoxId) {
  pbEstimateAddCart(priceBoxId);
  pbGoCheckout();
}

function pbEstimateCheckout(priceBoxId) { pbOpenQuoteFromPanel(priceBoxId); }
function pbEstimateCheckoutNew(priceBoxId) { pbOpenQuoteFromPanel(priceBoxId); }

function pbCollectItem(productName, lines, total, motorized) {
  var specs = lines.map(function(l){ return l.label + ': ' + l.value; }).join(' | ');
  pbAddToCartWithMotor({ product: productName, specs: specs, lines: lines, price: total || null, qty: 1 }, !!motorized);
}

// ── QUOTE REQUEST MODAL ─────────────────────────────────────────
var _pbQuoteLines   = [];
var _pbQuoteProduct = '';

var _pbQuoteEstimate = null;
var _pbQuoteFiles = [];   // File objects to attach to this submission (set by the caller, e.g. pbGoCheckout)
function pbShowQuoteModal(lines, productName, estimate, files) {
  _pbQuoteLines   = Array.isArray(lines) ? lines : [];
  _pbQuoteProduct = productName || (_pbQuoteLines.length ? _pbQuoteLines[0].value : 'Custom Window Treatment');
  _pbQuoteEstimate = estimate || null;
  _pbQuoteFiles   = Array.isArray(files) ? files : [];

  var existing = document.getElementById('pb-quote-overlay');
  if (existing) existing.remove();

  if (!document.getElementById('pb-quote-style')) {
    var s = document.createElement('style');
    s.id = 'pb-quote-style';
    s.textContent =
      '.pb-qm{display:flex;position:fixed;inset:0;background:rgba(0,0,0,.65);z-index:900;align-items:center;justify-content:center;padding:12px;overflow-y:auto}' +
      '.pb-qm-card{background:#fff;border-radius:16px;width:100%;max-width:520px;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.35);margin:auto}' +
      '.pb-qm-head{background:var(--espresso);padding:18px 22px;display:flex;justify-content:space-between;align-items:center}' +
      '.pb-qm-title{color:var(--cream);font-size:15px;font-weight:700}' +
      '.pb-qm-close{background:none;border:none;color:#9A8570;font-size:22px;cursor:pointer;line-height:1;padding:0;font-family:inherit}.pb-qm-close:hover{color:var(--cream)}' +
      '.pb-qm-body{padding:20px 22px;max-height:80vh;overflow-y:auto}' +
      '.pb-qm-lbl{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:8px}' +
      '.pb-qm-field{margin-bottom:12px}.pb-qm-field label{font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px}' +
      '.pb-qm-field input,.pb-qm-field textarea{width:100%;padding:10px 12px;border:1px solid #e8e8e4;border-radius:8px;font-size:14px;font-family:inherit;color:#1a1a1a;box-sizing:border-box}' +
      '.pb-qm-field input:focus,.pb-qm-field textarea:focus{border-color:var(--gold);outline:none}' +
      '.pb-qm-submit{width:100%;background:var(--espresso);color:var(--gold);border:none;border-radius:10px;padding:14px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit}' +
      '.pb-qm-submit:hover{opacity:.9}.pb-qm-submit:disabled{opacity:.5;cursor:not-allowed}' +
      '.pb-qm-err{display:none;background:#FEE2E2;border-radius:8px;padding:10px 13px;font-size:12px;color:#991B1B;margin-bottom:12px;line-height:1.5}' +
      '.pb-qm-ok{display:none;text-align:center;padding:10px 4px}';
    document.head.appendChild(s);
  }

  var selectionsHtml = _pbQuoteLines.map(function(l) {
    return '<div style="display:flex;justify-content:space-between;gap:12px;padding:5px 0;border-bottom:1px solid #f0f0ec;font-size:12px">' +
      '<span style="color:#888;flex-shrink:0">' + _pbEsc(l.label) + '</span>' +
      '<span style="font-weight:500;color:#333;text-align:right;max-width:60%">' + _pbEsc(l.value) + '</span>' +
      '</div>';
  }).join('');

  var ov = document.createElement('div');
  ov.id = 'pb-quote-overlay';
  ov.className = 'pb-qm';
  ov.addEventListener('click', function(e){ if(e.target===ov) ov.remove(); });
  ov.innerHTML =
    '<div class="pb-qm-card">' +
      '<div class="pb-qm-head">' +
        '<div class="pb-qm-title">Request a Free Quote</div>' +
        '<button class="pb-qm-close" onclick="document.getElementById(\'pb-quote-overlay\').remove()">&#215;</button>' +
      '</div>' +
      '<div class="pb-qm-body">' +
        (selectionsHtml
          ? '<div class="pb-qm-lbl">Your Configuration</div>' +
            '<div style="background:#f9f9f7;border-radius:8px;padding:10px 14px;margin-bottom:12px">' + selectionsHtml + '</div>'
          : '') +
        (_pbQuoteEstimate
          ? '<div style="background:#FBF7F0;border-radius:10px;padding:14px 16px;margin-bottom:16px;display:flex;justify-content:space-between;align-items:center">' +
              '<div><div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold)">Your Estimate</div>' +
              '<div style="font-size:10px;color:#aaa;margin-top:3px">Estimate only — final price confirmed after measurement</div></div>' +
              '<div style="font-size:24px;font-weight:700;color:var(--espresso)">$' + _pbQuoteEstimate.toFixed(0) + '</div>' +
            '</div>'
          : '') +
        '<div class="pb-qm-lbl">Your Information</div>' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
          '<div class="pb-qm-field"><label>First name *</label><input id="pbq-fname" type="text" placeholder="Jane" autocomplete="given-name"></div>' +
          '<div class="pb-qm-field"><label>Last name *</label><input id="pbq-lname" type="text" placeholder="Smith" autocomplete="family-name"></div>' +
        '</div>' +
        '<div class="pb-qm-field"><label>Email address *</label><input id="pbq-email" type="email" placeholder="jane@example.com" autocomplete="email"></div>' +
        '<div class="pb-qm-field"><label>Phone number *</label><input id="pbq-phone" data-pb-contact="phone" type="tel" placeholder="(215) 555-0100" autocomplete="tel"></div>' +
        '<div class="pb-qm-field"><label>Address <span style="font-weight:400;color:#888">(optional)</span></label><input id="pbq-address" data-pb-contact="address" type="text" placeholder="Street, City, State" autocomplete="street-address"></div>' +
        '<div class="pb-qm-field"><label>Additional notes <span style="font-weight:400;color:#888">(optional)</span></label><textarea id="pbq-notes" rows="3" placeholder="Anything else — overall timeline, install questions..."></textarea></div>' +
        '<div class="pb-qm-err" id="pbq-err"></div>' +
        pbTermsCheckboxHTML('pbq-terms') +
        '<button class="pb-qm-submit" id="pbq-submit" onclick="pbSubmitQuote()">Submit Order for Review &#8594;</button>' +
        '<div style="text-align:center;font-size:11px;color:#aaa;margin-top:8px">We\'ll respond by email and phone — no spam, ever.</div>' +
        '<div class="pb-qm-ok" id="pbq-ok">' +
          '<div style="font-size:36px;margin-bottom:8px">&#10003;</div>' +
          '<div style="font-size:17px;font-weight:700;color:var(--espresso);margin-bottom:8px">Quote request received!</div>' +
          '<div style="font-size:13px;color:#555;line-height:1.7;margin-bottom:16px">Our team has all your details and is putting together your custom quote. You\'ll hear from us by email and phone — typically within a few hours.<br><br><strong>We will not send marketing emails or spam your contact info.</strong></div>' +
          '<a href="tel:6097421720" style="display:inline-block;background:var(--espresso);color:var(--gold);font-size:14px;font-weight:700;padding:12px 24px;border-radius:8px;text-decoration:none">&#128222; (609) 742-1720 &nbsp;&mdash;&nbsp; 24/7</a>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(ov);
  // Pre-fill from saved contact
  var _ck = pbGetContact();
  if (_ck.name) {
    var _pts = _ck.name.trim().split(' ');
    var _fnEl = document.getElementById('pbq-fname');
    var _lnEl = document.getElementById('pbq-lname');
    if (_fnEl && !_fnEl.value) _fnEl.value = _pts[0] || '';
    if (_lnEl && !_lnEl.value) _lnEl.value = _pts.slice(1).join(' ') || '';
  }
  var _emEl = document.getElementById('pbq-email');
  var _phEl = document.getElementById('pbq-phone');
  if (_emEl && !_emEl.value && _ck.email) _emEl.value = _ck.email;
  if (_phEl && !_phEl.value && _ck.phone) _phEl.value = _ck.phone;
  var _adEl = document.getElementById('pbq-address');
  if (_adEl && !_adEl.value && _ck.address) _adEl.value = _ck.address;
  setTimeout(function(){ var f=document.getElementById('pbq-fname'); if(f) f.focus(); }, 80);
}

// ── Attachment helpers — turn File objects into base64 for the JSON email payload ──
// Images are downscaled client-side (canvas) so phone photos don't blow the request body limit.
function _pbCompressImage(file, maxDim, quality) {
  return new Promise(function(resolve) {
    try {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function() {
        var w = img.width, h = img.height;
        var scale = Math.min(1, maxDim / Math.max(w, h));
        var cw = Math.max(1, Math.round(w * scale)), ch = Math.max(1, Math.round(h * scale));
        var c = document.createElement('canvas'); c.width = cw; c.height = ch;
        c.getContext('2d').drawImage(img, 0, 0, cw, ch);
        URL.revokeObjectURL(url);
        try { resolve(c.toDataURL('image/jpeg', quality).split(',')[1] || null); }
        catch (e) { resolve(null); }
      };
      img.onerror = function() { URL.revokeObjectURL(url); resolve(null); };
      img.src = url;
    } catch (e) { resolve(null); }
  });
}
function _pbFileToBase64(file) {
  return new Promise(function(resolve) {
    try {
      var r = new FileReader();
      r.onload = function() { var s = String(r.result); var i = s.indexOf(','); resolve(i > -1 ? s.slice(i + 1) : s); };
      r.onerror = function() { resolve(null); };
      r.readAsDataURL(file);
    } catch (e) { resolve(null); }
  });
}
async function _pbBuildAttachments(files) {
  var out = [];
  var TOTAL_CAP = 2.5 * 1024 * 1024;  // ~2.5MB of raw bytes → keeps JSON body under Vercel's ~4.5MB limit
  var used = 0;
  out._overflow = 0;
  for (var i = 0; i < (files || []).length; i++) {
    var f = files[i];
    var b64 = null;
    if (/^image\//i.test(f.type)) b64 = await _pbCompressImage(f, 1600, 0.82);
    if (!b64) b64 = await _pbFileToBase64(f);
    if (!b64) continue;
    var approxBytes = Math.ceil(b64.length * 0.75);
    if (used + approxBytes > TOTAL_CAP) { out._overflow++; continue; }
    used += approxBytes;
    out.push({ filename: f.name, type: f.type || 'application/octet-stream', content: b64 });
  }
  return out;
}

async function pbSubmitQuote() {
  var fname  = (document.getElementById('pbq-fname') ||{}).value || '';
  var lname  = (document.getElementById('pbq-lname') ||{}).value || '';
  var email  = (document.getElementById('pbq-email') ||{}).value || '';
  var phone  = (document.getElementById('pbq-phone') ||{}).value || '';
  var address= (document.getElementById('pbq-address')||{}).value || '';
  var notes  = (document.getElementById('pbq-notes') ||{}).value || '';
  var errEl  = document.getElementById('pbq-err');
  var submit = document.getElementById('pbq-submit');
  var name   = (fname.trim() + ' ' + lname.trim()).trim();

  if (!name) {
    if (errEl) { errEl.textContent = 'Please enter your name.'; errEl.style.display = 'block'; }
    return;
  }
  if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    if (errEl) { errEl.textContent = 'Please enter a valid email address.'; errEl.style.display = 'block'; }
    return;
  }
  if (!phone.trim()) {
    if (errEl) { errEl.textContent = 'Please enter your phone number.'; errEl.style.display = 'block'; }
    var _pf = document.getElementById('pbq-phone'); if (_pf) { try { _pf.focus(); } catch(e){} }
    return;
  }
  // Required Terms of Agreement acceptance before submitting for review.
  if (!pbTermsValid(document.querySelector('.pb-qm-body') || document, 'pbq-err')) return;
  if (errEl) errEl.style.display = 'none';
  if (submit) { submit.disabled = true; submit.textContent = 'Sending…'; }

  // Build base64 attachments from the gathered cart files
  var attachments = [];
  try { attachments = await _pbBuildAttachments(_pbQuoteFiles || []); } catch(e) { attachments = []; }

  try {
    var resp = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name,
        email: email.trim(),
        phone: phone.trim(),
        address: address.trim(),
        delivery: 'Ship to me',
        product: _pbQuoteProduct,
        selections: _pbQuoteLines,
        estimate: _pbQuoteEstimate ? '$' + _pbQuoteEstimate.toFixed(0) + ' (estimate only)' : null,
        notes: notes.trim(),
        attachments: attachments,
        agreedToTerms: true,
        agreedToTermsAt: new Date().toISOString(),
        sourceUrl: window.location.href,
        _hp: '',
        _t: Date.now() - _formLoadTime
      })
    });
    var data = {};
    try { data = await resp.json(); } catch(e) {}
    if (!resp.ok) throw new Error(data.error || 'Server error ' + resp.status);

    // Show success state — hide all form children except ok/err divs
    var qbody = document.querySelector('.pb-qm-body');
    if (qbody) {
      Array.from(qbody.children).forEach(function(el) {
        if (el.id !== 'pbq-ok' && el.id !== 'pbq-err') el.style.display = 'none';
      });
    }
    var ok = document.getElementById('pbq-ok');
    if (ok) ok.style.display = 'block';
    pbSaveContact({ name: name, email: email.trim(), phone: phone.trim(), address: address.trim() });
    // Order submitted — empty the cart so it can't be resubmitted (also clears in-memory files)
    try { pbClearCart(); } catch(e) {}

  } catch(err) {
    console.error('Quote error:', err.message);

    // Build emergency mailto so the customer can still send their quote
    var mailLines = ['QUOTE REQUEST', ''];
    mailLines.push('Name: ' + name, 'Email: ' + email.trim());
    if (phone.trim()) mailLines.push('Phone: ' + phone.trim());
    if (address.trim()) mailLines.push('Address: ' + address.trim());
    mailLines.push('Delivery: Ship to me');
    mailLines.push('', 'Product: ' + (_pbQuoteProduct || 'Custom Window Treatment'));
    if (_pbQuoteLines && _pbQuoteLines.length) {
      mailLines.push('', 'Configuration:');
      _pbQuoteLines.forEach(function(l){ mailLines.push('  ' + l.label + ': ' + l.value); });
    }
    if (notes.trim()) mailLines.push('', 'Notes:', notes.trim());
    if (_pbQuoteFiles && _pbQuoteFiles.length) mailLines.push('', '(' + _pbQuoteFiles.length + ' file attachment(s) — please reply to this email with the photos/PDFs attached.)');
    var mailHref = 'mailto:justin@blindznation.com?subject=' + encodeURIComponent('Quote Request — ' + name) +
      '&body=' + encodeURIComponent(mailLines.join('\n'));

    if (errEl) {
      errEl.innerHTML =
        '<strong>There was an issue submitting the form.</strong><br>' +
        '<a href="' + mailHref + '" style="color:#991B1B;font-weight:700;text-decoration:underline">Click here to email your quote directly →</a><br>' +
        'Or call/text <a href="tel:6097421720" style="color:#991B1B">(609) 742-1720</a> — available 24/7.';
      errEl.style.display = 'block';
    }
    if (submit) { submit.disabled = false; submit.textContent = 'Submit Quote Request →'; }
  }
}

// Backward-compat aliases
function pbShowCheckout(order) {
  pbShowQuoteModal(order ? order.lines : [], order ? order.product : '');
}
function pbCloseCheckout() {
  var ov = document.getElementById('pb-quote-overlay');
  if (ov) ov.remove();
}

// ============================================================
// NORMAN SMART MOTORIZATION — shared section for all products
// ============================================================
/**
 * Renders a Norman motorization options panel inside containerId.
 * Call this when "Motorized" is selected in any product configurator.
 * @param {string} containerId  — element to inject into (or null to return HTML)
 * @param {string} productName  — e.g. 'Cellular Shade', 'Roller Shade'
 * @param {Function} onChange   — called when any option changes
 */
function normanMotorSection(containerId, productName, onChange) {
  // Per Norman April 2026 price book:
  // - Charging Wand only available on Honeycomb and Roller (not Roman, PerfectSheer, SmartDrape, SmartFold)
  // - SmartDrape: DC Low Voltage NOT available
  // - Max 2 remotes (Basic or SmartDial G2) per Norman Smart system
  var isSmartDrape  = (productName || '').toLowerCase().indexOf('smartdrape') !== -1 ||
                      (productName || '').toLowerCase().indexOf('smart drape') !== -1;
  var wandAllowed   = !isSmartDrape &&
                      (productName || '').toLowerCase().indexOf('roman') === -1 &&
                      (productName || '').toLowerCase().indexOf('smartfold') === -1 &&
                      (productName || '').toLowerCase().indexOf('perfectsheer') === -1;

  var isRoller   = (productName || '').toLowerCase().indexOf('roller') !== -1;
  var isCellular = (productName || '').toLowerCase().indexOf('cellular') !== -1 || (productName || '').toLowerCase().indexOf('honeycomb') !== -1;

  // Battery charging method. On rollers a charging wand needs a visible control box at the headrail
  // — not recommended; on cellular the wand connects directly at the shade.
  var batteryDetail = wandAllowed
    ? '<div style="font-size:11px;color:var(--text-dark);line-height:1.6;margin-bottom:6px">Battery charging method:</div>' +
      '<div class="opt-row" id="nm-grp-battery-type">' +
        '<button class="opt-btn' + (isCellular ? ' sel' : '') + '" onclick="selOpt(this,\'nm-grp-battery-type\')" style="color:#333">Charging Wand (corded)' + (isRoller ? ' <span style="font-size:9px;color:#c77">not rec.</span>' : '') + '</button>' +
        '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-battery-type\')" style="color:#333">Cordless Charging Wand' + (isRoller ? ' <span style="font-size:9px;color:#c77">not rec.</span>' : '') + '</button>' +
        '<button class="opt-btn' + (!isCellular ? ' sel' : '') + '" onclick="selOpt(this,\'nm-grp-battery-type\')" style="color:#333">AC Adapter Charger' + (isRoller ? ' <span style="font-size:9px;color:var(--gold)">recommended</span>' : '') + '</button>' +
      '</div>' +
      '<div style="font-size:10px;color:var(--text-faint);margin-top:5px;line-height:1.5">' +
        (isRoller
          ? 'On roller shades a charging wand needs a small visible control box at the top of the shade — we don\'t recommend it; use the AC Adapter Charger. '
          : (isCellular ? 'On cellular shades the charging wand connects directly at the shade (no visible box). ' : '')) +
        'The corded Charging Wand supports an extension; the Cordless Charging Wand does not. Charging Wand is not available with a Cassette headrail or Dual shades — use the AC Adapter Charger for those.</div>'
    : '<div style="font-size:11px;color:var(--text-dark);line-height:1.6">Rechargeable battery, recharged with an AC Adapter Charger. No wiring required — ideal for retrofit installations. Charging Wand is not available for this product type.</div>';

  var dcLowVoltageBtn = isSmartDrape
    ? '<button class="opt-btn" style="color:#aaa;text-decoration:line-through;cursor:not-allowed" disabled title="DC Low Voltage not available for SmartDrape">DC Low Voltage ⚠</button>'
    : '<button class="opt-btn sel" onclick="selOpt(this,\'nm-grp-wire\')" style="color:#333">24V DC (low voltage)</button>';

  var html =
    '<div class="pb-norman-motor" style="margin-top:12px;padding:16px 18px;background:var(--espresso-mid);border-radius:12px;border:0.5px solid var(--border-dark)">' +
      '<div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:12px">&#9889; Norman Smart Motorization</div>' +
      (isSmartDrape ? '<div style="font-size:11px;background:#2a1c0e;border:1px solid #7a5020;border-radius:7px;padding:8px 12px;color:#e8b060;margin-bottom:12px;line-height:1.5">SmartDrape: Norman Smart motorization only. DC Low Voltage is not available for SmartDrape.</div>' : '') +

      // Power source
      '<div style="margin-bottom:12px">' +
        '<div style="font-size:12px;font-weight:600;color:var(--cream);margin-bottom:7px">Power source</div>' +
        '<div class="opt-row" id="nm-grp-power">' +
          '<button class="opt-btn sel" onclick="selOpt(this,\'nm-grp-power\');nmTogglePower(\'battery\')" style="color:#333">&#128267; Rechargeable battery</button>' +
          '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-power\');nmTogglePower(\'ac\')" style="color:#333">&#128268; AC Adapter plug-in</button>' +
          '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-power\');nmTogglePower(\'hardwire\')" style="color:#333">&#9889; DC Hardwired</button>' +
        '</div>' +
      '</div>' +

      // Battery detail
      '<div id="nm-battery-opts" style="margin-bottom:12px;padding:10px 12px;background:rgba(255,255,255,.06);border-radius:8px">' +
        batteryDetail +
      '</div>' +

      // AC adapter detail
      '<div id="nm-ac-opts" style="display:none;margin-bottom:12px;padding:10px 12px;background:rgba(255,255,255,.06);border-radius:8px">' +
        '<div style="font-size:11px;color:var(--text-dark);line-height:1.6">AC Adapter plug-in. Plugs into standard 120V outlet. No battery charging required. Cord management needed near the window.</div>' +
      '</div>' +

      // Hardwire detail
      '<div id="nm-hardwire-opts" style="display:none;margin-bottom:12px">' +
        '<div style="font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:6px">DC wiring</div>' +
        '<div class="opt-row" id="nm-grp-wire">' +
          dcLowVoltageBtn +
          (isSmartDrape ? '' : '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-wire\')" style="color:#333">DC Low Voltage hard wire</button>') +
        '</div>' +
        '<div style="font-size:10px;color:var(--text-faint);margin-top:5px;line-height:1.5">DC hard wire (15V). Licensed electrician install recommended. Confirmed at measurement visit.' +
          (isSmartDrape ? ' DC Low Voltage is NOT available for SmartDrape.' : '') + '</div>' +
      '</div>' +

      // Remote
      '<div style="margin-bottom:12px">' +
        '<div style="font-size:12px;font-weight:600;color:var(--cream);margin-bottom:7px">Remote control</div>' +
        '<div class="opt-row" id="nm-grp-remote">' +
          '<button class="opt-btn sel" onclick="selOpt(this,\'nm-grp-remote\');nmToggleRemote(true)" style="color:#333">Yes — include remote</button>' +
          '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-remote\');nmToggleRemote(false)" style="color:#333">No remote (app only)</button>' +
        '</div>' +
      '</div>' +

      // Remote detail
      '<div id="nm-remote-detail" style="padding:10px 12px;background:rgba(255,255,255,.06);border-radius:8px;margin-bottom:12px">' +
        '<div style="font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:6px">Number of remotes <span style="font-size:10px;font-weight:400;color:var(--text-faint)">(max 2 per Norman Smart system)</span></div>' +
        '<div class="opt-row" id="nm-grp-remotes">' +
          '<button class="opt-btn sel" onclick="selOpt(this,\'nm-grp-remotes\')" style="color:#333">1</button>' +
          '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-remotes\')" style="color:#333">2</button>' +
        '</div>' +
        '<div style="font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:6px;margin-top:10px">Remote type</div>' +
        '<div class="opt-row" id="nm-grp-remote-type">' +
          '<button class="opt-btn sel" onclick="selOpt(this,\'nm-grp-remote-type\')" style="color:#333">Basic Remote</button>' +
          '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-remote-type\')" style="color:#333">SmartDial G2</button>' +
        '</div>' +
        '<div style="font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:6px;margin-top:10px">Channels</div>' +
        '<div class="opt-row" id="nm-grp-channel">' +
          '<button class="opt-btn sel" onclick="selOpt(this,\'nm-grp-channel\')" style="color:#333">Multi channel</button>' +
        '</div>' +
        '<div style="font-size:10px;color:var(--text-faint);margin-top:5px">Norman Smart remotes (Basic &amp; SmartDial G2) are multi-channel — control each shade independently, or assign several shades to the same channel to move them together.</div>' +
      '</div>' +

      // Smart home
      '<div>' +
        '<div style="font-size:12px;font-weight:600;color:var(--cream);margin-bottom:7px">Smart home integration</div>' +
        '<div style="font-size:11px;color:var(--text-dark);line-height:1.7">Works with <strong>Amazon Alexa, Google Home &amp; Apple HomeKit</strong> — no need to choose; the system integrates with all of them. A hub enables app &amp; voice control (ShadeAuto Hub + Repeater available as an add-on; max 5 repeaters per system).</div>' +
      '</div>' +
    '</div>';

  if (containerId) {
    var el = document.getElementById(containerId);
    if (el) el.innerHTML = html;
  }
  return html;
}

function nmTogglePower(type) {
  var bat = document.getElementById('nm-battery-opts');
  var ac  = document.getElementById('nm-ac-opts');
  var hw  = document.getElementById('nm-hardwire-opts');
  if (bat) bat.style.display = type === 'battery'   ? 'block' : 'none';
  if (ac)  ac.style.display  = type === 'ac'        ? 'block' : 'none';
  if (hw)  hw.style.display  = type === 'hardwire'  ? 'block' : 'none';
}
function nmToggleRemote(show) {
  var el = document.getElementById('nm-remote-detail');
  if (el) el.style.display = show ? 'block' : 'none';
}
function nmGetMotorSummary() {
  var power   = (document.querySelector('#nm-grp-power .opt-btn.sel') || {}).textContent || '—';
  var wire    = (document.querySelector('#nm-grp-wire .opt-btn.sel') || {}).textContent || '';
  var remote  = (document.querySelector('#nm-grp-remote .opt-btn.sel') || {}).textContent || '—';
  var remotes = (document.querySelector('#nm-grp-remotes .opt-btn.sel') || {}).textContent || '';
  var channel = (document.querySelector('#nm-grp-channel .opt-btn.sel') || {}).textContent || '';
  return 'Power: ' + power.replace(/[^\w\s]/g,'').trim() +
    (wire ? ' — ' + wire : '') +
    ' | Remote: ' + remote.replace(/[^\w\s\-]/g,'').trim() +
    (remotes ? ' × ' + remotes + ' (' + channel + ')' : '') +
    ' | Integrates with Alexa, Google Home & Apple HomeKit';
}

// ---- INSTALLATION ADD-ON — auto-injects into every quote form ----
function _initInstallationAddons() {
  document.querySelectorAll('.delivery-section').forEach(function(del) {
    var parent = del.parentElement;
    if (!parent || parent.querySelector('.pb-install-wrap')) return;
    var btn = parent.querySelector('.btn-gold');
    if (!btn) return;

    var id = 'inst-' + Math.random().toString(36).slice(2, 7);
    var wrap = document.createElement('div');
    wrap.className = 'pb-install-wrap';
    wrap.style.cssText = 'border:2px solid var(--gold);border-radius:12px;padding:16px 18px;margin-bottom:16px;background:#FBF7F0';
    wrap.innerHTML =
      '<div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:10px">&#128295; Professional Installation</div>' +
      '<label style="display:flex;align-items:flex-start;gap:12px;cursor:pointer">' +
        '<input type="checkbox" id="' + id + '" class="pb-install-check" ' +
          'style="margin-top:3px;flex-shrink:0;width:20px;height:20px;cursor:pointer;accent-color:var(--espresso)" ' +
          'onchange="pbToggleInstall(this)">' +
        '<div>' +
          '<div style="font-size:15px;font-weight:700;color:#1a1a1a;margin-bottom:4px">Add professional installation</div>' +
          '<div style="font-size:13px;color:#555;line-height:1.6">Installation is priced separately based on your location and product. Submit your quote — Justin will follow up with installation pricing via email.</div>' +
        '</div>' +
      '</label>' +
      '<div id="' + id + '-detail" style="display:none;margin-top:12px;padding:12px 14px;background:var(--espresso);border-radius:8px">' +
        '<div style="font-size:11px;font-weight:600;color:var(--gold);text-transform:uppercase;letter-spacing:1px;margin-bottom:8px">We\'ll follow up with installation pricing</div>' +
        '<div style="font-size:13px;color:var(--cream);margin-bottom:6px">Philadelphia, South Jersey, Salt Lake City &amp; surrounding areas. Out-of-state installation available at reasonable rates.</div>' +
        '<a href="tel:6097421720" style="display:inline-flex;align-items:center;gap:7px;background:var(--gold);color:var(--espresso);font-size:13px;font-weight:700;padding:9px 16px;border-radius:7px;text-decoration:none;margin-bottom:6px">&#128222; (609) 742-1720</a>' +
        '<div style="font-size:12px;color:var(--text-dark);margin-top:4px">Or email: <a href="mailto:justin@blindznation.com" style="color:var(--gold);text-decoration:none">justin@blindznation.com</a></div>' +
      '</div>';
    btn.before(wrap);
    btn.setAttribute('data-install-id', id);
  });
}
function pbInstallLine(parentEl) {
  var cb = (parentEl || document).querySelector('.pb-install-check:checked');
  return cb ? '\nInstallation: REQUESTED — Justin will follow up with pricing.' : '\nInstallation: Not requested';
}
function pbToggleInstall(cb) {
  var detail = document.getElementById(cb.id + '-detail');
  if (detail) detail.style.display = cb.checked ? 'block' : 'none';
}
function pbInstallRequested(parentEl) {
  var cb = (parentEl || document).querySelector('.pb-install-check:checked');
  return !!cb;
}

// ---- FILE UPLOAD — auto-injects into every quote form ----
function pbGetFileNames(inputId) {
  var el = document.getElementById(inputId);
  if (!el || !el.files || !el.files.length) return '';
  return Array.from(el.files).map(function(f){ return f.name; }).join(', ');
}
function pbShowFileNames(input, displayId) {
  var el = document.getElementById(displayId);
  if (!el) return;
  var names = Array.from(input.files).map(function(f){ return '📄 ' + _pbEsc(f.name); }).join('<br>');
  el.innerHTML = names;
}
function _initFileUploads() {
  // Inject into forms that have a delivery section (all main quote forms)
  document.querySelectorAll('.delivery-section').forEach(function(del) {
    var parent = del.parentElement;
    if (!parent || parent.querySelector('.pb-fu-wrap')) return;
    var btn = parent.querySelector('.btn-gold');
    if (!btn) return;
    var id = 'fu-' + Math.random().toString(36).slice(2, 8);
    var wrap = document.createElement('div');
    wrap.className = 'pb-fu-wrap';
    wrap.style.cssText = 'border:1.5px dashed #ddd;border-radius:10px;padding:14px 16px;margin-bottom:14px;background:#fafaf8';
    wrap.innerHTML =
      '<div style="font-size:12px;font-weight:600;color:#333;margin-bottom:8px">&#128206; Attach photos or files <span style="font-weight:400;color:#999">(optional)</span></div>' +
      '<input type="file" id="' + id + '" multiple accept="image/*,.pdf,.heic,.png,.jpg,.jpeg" ' +
        'style="width:100%;font-size:12px;color:#555;font-family:inherit;cursor:pointer;padding:4px 0" ' +
        'onchange="pbShowFileNames(this,\'' + id + '-names\')">' +
      '<div id="' + id + '-names" style="font-size:11px;color:#555;margin-top:6px;line-height:1.8"></div>' +
      '<div style="font-size:11px;color:#aaa;margin-top:5px;line-height:1.5">Window photos, room photos, measurements, inspiration — anything that helps. ' +
        'After submitting, email files directly to <a href="mailto:justin@blindznation.com" style="color:inherit">justin@blindznation.com</a> if needed.</div>';
    btn.before(wrap);
    btn.setAttribute('data-fu-id', id);
  });

  // Also inject into Formspree quick-quote forms (no delivery section)
  document.querySelectorAll('form[id$="-quote-form"],form[id$="-form"]').forEach(function(form) {
    if (form.querySelector('.pb-fu-wrap')) return;
    var btn = form.querySelector('button[type="submit"]');
    if (!btn) return;
    var id = 'fu-' + Math.random().toString(36).slice(2, 8);
    var wrap = document.createElement('div');
    wrap.className = 'pb-fu-wrap';
    wrap.style.cssText = 'border:1.5px dashed #ddd;border-radius:10px;padding:14px 16px;margin-bottom:14px;background:#fafaf8';
    wrap.innerHTML =
      '<div style="font-size:12px;font-weight:600;color:#333;margin-bottom:8px">&#128206; Attach photos or files <span style="font-weight:400;color:#999">(optional)</span></div>' +
      '<input type="file" name="attachments" id="' + id + '" multiple accept="image/*,.pdf,.heic,.png,.jpg,.jpeg" ' +
        'style="width:100%;font-size:12px;color:#555;font-family:inherit;cursor:pointer;padding:4px 0" ' +
        'onchange="pbShowFileNames(this,\'' + id + '-names\')">' +
      '<div id="' + id + '-names" style="font-size:11px;color:#555;margin-top:6px;line-height:1.8"></div>' +
      '<div style="font-size:11px;color:#aaa;margin-top:5px;line-height:1.5">Window photos, room photos, measurements, inspiration — anything that helps.</div>';
    btn.before(wrap);
  });
}

// ---- SHIPPING ESTIMATOR ----
function _calcShipping(zip, opts) {
  opts = opts || {};
  var p = parseInt(String(zip).replace(/\D/g,"").padStart(5,"0").substring(0,3));
  if (isNaN(p)) return null;
  var zone = 6;
  if      ((p>=70&&p<=89)||(p>=190&&p<=199))                              zone=1;
  else if ((p>=10&&p<=69)||(p>=200&&p<=269)||(p>=430&&p<=458)||(p>=400&&p<=427)) zone=2;
  else if ((p>=270&&p<=349)||(p>=460&&p<=499)||(p>=600&&p<=629))          zone=3;
  else if ((p>=350&&p<=399)||(p>=500&&p<=599)||(p>=630&&p<=679))          zone=4;
  else if ((p>=700&&p<=849))                                               zone=5;
  var base = {
    1:{low:14,high:28,region:"PA / NJ / DE"},
    2:{low:22,high:40,region:"NY / NE / MD / OH"},
    3:{low:32,high:52,region:"Southeast / Midwest"},
    4:{low:42,high:65,region:"South / Midwest"},
    5:{low:55,high:80,region:"Mountain West / TX"},
    6:{low:68,high:98,region:"West Coast / HI / AK"}
  };
  var r = Object.assign({}, base[zone] || base[6]);
  if (opts.oversized) { r.low += 30; r.high += 55; r.region += " (oversized)"; }
  if (opts.softGoods) { r.low = Math.max(50, r.low * 2); r.high = Math.max(50, r.high * 2); }
  if (opts.minShip)   { r.low = Math.max(opts.minShip, r.low); r.high = Math.max(opts.minShip, r.high); }
  return r;
}

function _initShippingEstimators() {
  document.querySelectorAll('[id$="-s"].delivery-note').forEach(function(el) {
    if (el.querySelector('.pb-ship-est')) return;
    var wrap = document.createElement('div');
    wrap.className = 'pb-ship-est';
    wrap.style.cssText = 'margin-top:10px;padding:12px 14px;background:#f5f5f3;border-radius:8px;border:1px solid #e0e0dc';
    wrap.innerHTML =
      '<div style="font-size:11px;font-weight:600;color:#444;text-transform:uppercase;letter-spacing:.5px;margin-bottom:8px">&#128230; Estimate shipping</div>' +
      '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">' +
        '<input type="text" class="pb-zip-input" inputmode="numeric" maxlength="5" placeholder="Your ZIP code" ' +
          'style="width:130px;padding:8px 10px;border:1px solid #ddd;border-radius:6px;font-size:13px;font-family:inherit;background:#fff">' +
        '<span class="pb-zip-result" style="font-size:13px;color:#555;min-width:140px"></span>' +
      '</div>' +
      '<div style="font-size:10px;color:#aaa;margin-top:6px;line-height:1.5">UPS / FedEx Ground estimate from Huntingdon Valley PA 19006 &nbsp;&middot;&nbsp; Actual rate confirmed at order</div>';
    el.appendChild(wrap);
    var input = wrap.querySelector('.pb-zip-input');
    var result = wrap.querySelector('.pb-zip-result');
    input.addEventListener('input', function() {
      var zip = this.value.replace(/\D/g,'');
      if (zip.length === 5) {
        // Detect product type from nearest form context for correct shipping rules
        var elId = el.id || '';
        var isSoft = /drape|roman|val|corn|soft/.test(elId);
        var parentText = (el.closest('form,div') || document.body).textContent || '';
        var isOversized = false; // set by individual configurators via data attribute
        var dataEl = el.closest('[data-ship-oversized]');
        if (dataEl) isOversized = dataEl.getAttribute('data-ship-oversized') === 'true';
        var est = _calcShipping(zip, { softGoods: isSoft, oversized: isOversized, minShip: isSoft ? 50 : 0 });
        if (est) result.innerHTML = '<strong style="color:#111110">~$'+est.low+' – $'+est.high+'</strong> <span style="font-size:11px;color:#888">('+est.region+')</span>';
        // Note: pickup from SLC/Huntingdon Valley still incurs shipping charges
        if (result.innerHTML) result.innerHTML += '<div style="font-size:10px;color:#999;margin-top:3px">Note: Pickup still incurs freight — product ships to you first.</div>';
      } else {
        result.textContent = '';
      }
    });
  });
}

// ============================================================
// CONTACT / CONSULTATION PANEL — Blindznation
// ============================================================
function _initContactPanel() {
  if (document.getElementById('pb-contact-overlay')) return;
  var s = document.createElement('style');
  s.textContent =
    '.pb-co{display:none;position:fixed;inset:0;background:rgba(0,0,0,.55);z-index:700;align-items:center;justify-content:center;padding:16px}' +
    '.pb-co.open{display:flex}' +
    '.pb-cp{background:#fff;border-radius:16px;width:100%;max-width:500px;max-height:90vh;overflow-y:auto;padding:28px 24px;position:relative}' +
    '.pb-cp-close{position:absolute;top:14px;right:14px;background:none;border:none;font-size:24px;cursor:pointer;color:#aaa;line-height:1;font-family:inherit}.pb-cp-close:hover{color:#333}' +
    '.pb-cp-badge{display:inline-block;font-size:10px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--gold);background:var(--espresso);padding:4px 10px;border-radius:20px;margin-bottom:12px}' +
    '.pb-cp-title{font-size:20px;font-weight:700;color:#111110;margin-bottom:6px;line-height:1.2}' +
    '.pb-cp-note{font-size:13px;color:#666;line-height:1.6;margin-bottom:18px}' +
    '.pb-cp-phone-btn{display:flex;align-items:center;justify-content:center;gap:10px;background:#111110;color:#C9A96E;text-decoration:none;font-size:22px;font-weight:700;padding:14px;border-radius:10px;margin-bottom:8px;transition:opacity .15s}.pb-cp-phone-btn:hover{opacity:.85}' +
    '.pb-cp-sub{text-align:center;font-size:11px;color:#888;margin-bottom:10px}' +
    '.pb-cp-email-link{display:block;text-align:center;font-size:14px;color:#111110;font-weight:600;text-decoration:none;margin-bottom:18px}.pb-cp-email-link:hover{text-decoration:underline}' +
    '.pb-cp-or{text-align:center;font-size:12px;color:#bbb;margin-bottom:14px;display:flex;align-items:center;gap:8px}.pb-cp-or::before,.pb-cp-or::after{content:"";flex:1;height:1px;background:#e8e8e4}';
  document.head.appendChild(s);
  var ov = document.createElement('div');
  ov.id = 'pb-contact-overlay'; ov.className = 'pb-co';
  ov.addEventListener('click', function(e){ if(e.target===ov) pbCloseContact(); });
  ov.innerHTML =
    '<div class="pb-cp">' +
      '<button class="pb-cp-close" onclick="pbCloseContact()">&#215;</button>' +
      '<div class="pb-cp-badge">Free &middot; No obligation</div>' +
      '<div class="pb-cp-title">Free Consultation &amp; Custom Quote</div>' +
      '<div class="pb-cp-note" id="pb-cp-hint">Tell us what you need &mdash; we\'ll measure, advise, and quote at no charge.</div>' +
      '<div style="font-size:13px;font-weight:700;color:#111110;margin-bottom:10px;text-align:center">Justin Healy &nbsp;&middot;&nbsp; Blindznation</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:6px">' +
        '<a href="tel:6097421720" class="pb-cp-action" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:#111110;color:#C9A96E;text-decoration:none;font-size:12px;font-weight:700;padding:12px 8px;border-radius:10px;transition:opacity .15s" onmouseover="this.style.opacity=\'.82\'" onmouseout="this.style.opacity=\'1\'">&#128222;<span>Call now</span></a>' +
        '<a href="sms:6097421720" class="pb-cp-action" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:#111110;color:#C9A96E;text-decoration:none;font-size:12px;font-weight:700;padding:12px 8px;border-radius:10px;transition:opacity .15s" onmouseover="this.style.opacity=\'.82\'" onmouseout="this.style.opacity=\'1\'">&#128172;<span>Text now</span></a>' +
        '<a href="mailto:justin@blindznation.com" class="pb-cp-action" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;background:#111110;color:#C9A96E;text-decoration:none;font-size:12px;font-weight:700;padding:12px 8px;border-radius:10px;transition:opacity .15s" onmouseover="this.style.opacity=\'.82\'" onmouseout="this.style.opacity=\'1\'">&#9993;&#65039;<span>Email</span></a>' +
      '</div>' +
      '<div style="text-align:center;font-size:11px;color:#999;margin-bottom:14px">(609) 742-1720 &nbsp;&middot;&nbsp; justin@blindznation.com &nbsp;&middot;&nbsp; 24/7</div>' +
      '<div style="border:1.5px solid #e5f7f4;border-radius:9px;padding:11px 13px;margin-bottom:14px;background:#f4fdfb">' +
        '<div style="font-size:11px;font-weight:700;color:#111110;margin-bottom:5px">&#128206; Attach photos, PDFs, or measurements <span style="font-weight:400;color:#888">(optional)</span></div>' +
        '<input type="file" id="pb-cp-files" multiple accept="image/*,.pdf,.heic,.png,.jpg,.jpeg" style="width:100%;font-size:12px;color:#555;font-family:inherit;cursor:pointer" onchange="pbCpShowFiles()">' +
        '<div id="pb-cp-file-names" style="font-size:11px;color:#555;margin-top:5px;line-height:1.7"></div>' +
        '<div style="font-size:10px;color:#aaa;margin-top:3px">Window photos, room photos, inspiration, spec sheets — email to justin@blindznation.com or attach here.</div>' +
      '</div>' +
      '<div class="pb-cp-or">or send a message below</div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">' +
        '<div><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Name *</label>' +
          '<input id="pb-cp-name" type="text" placeholder="Jane Smith" style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
        '<div><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Phone *</label>' +
          '<input id="pb-cp-phone-inp" type="tel" placeholder="(215) 555-0100" style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
      '</div>' +
      '<div style="margin-bottom:10px"><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Email</label>' +
        '<input id="pb-cp-email" type="email" placeholder="jane@example.com" style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
      '<div style="margin-bottom:10px"><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">What are you interested in?</label>' +
        '<input id="pb-cp-product" type="text" placeholder="e.g. Pirouette shadings, specialty shutters, oversized shade..." style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">' +
        '<div><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Approx. width (inches)</label>' +
          '<input id="pb-cp-width" type="number" placeholder="e.g. 48" style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
        '<div><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Approx. height (inches)</label>' +
          '<input id="pb-cp-height" type="number" placeholder="e.g. 72" style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit"></div>' +
      '</div>' +
      '<div style="margin-bottom:10px"><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Notes</label>' +
        '<textarea id="pb-cp-notes" rows="2" placeholder="Window sizes, room, timeline, questions..." style="width:100%;padding:9px 11px;border:1px solid #e8e8e4;border-radius:7px;font-size:13px;font-family:inherit;resize:vertical"></textarea></div>' +
      '<button onclick="pbSubmitContact()" style="width:100%;background:#111110;color:#C9A96E;border:none;border-radius:8px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">Request free consultation &#8594;</button>' +
      '<div id="pb-cp-sent" style="display:none;text-align:center;padding:16px;background:#EAF3DE;border-radius:10px;margin-top:10px;font-size:13px;color:#27500A">' +
        '<strong>Request sent!</strong> Justin will be in touch soon.<br>' +
        'Urgent? <a href="tel:6097421720" style="color:#27500A;font-weight:700">(609) 742-1720</a>' +
      '</div>' +
    '</div>';
  document.body.appendChild(ov);
}

function pbCpShowFiles() {
  var el = document.getElementById('pb-cp-file-names');
  var fi = document.getElementById('pb-cp-files');
  if (!el || !fi) return;
  el.innerHTML = Array.from(fi.files).map(function(f) { return '📄 ' + _pbEsc(f.name); }).join('<br>');
}

async function pbSubmitContact() {
  var name    = (document.getElementById('pb-cp-name') || {}).value || '';
  var phone   = (document.getElementById('pb-cp-phone-inp') || {}).value || '';
  var email   = (document.getElementById('pb-cp-email') || {}).value || '';
  var product = (document.getElementById('pb-cp-product') || {}).value || '';
  var width   = (document.getElementById('pb-cp-width') || {}).value || '';
  var height  = (document.getElementById('pb-cp-height') || {}).value || '';
  var notes   = (document.getElementById('pb-cp-notes') || {}).value || '';
  var btn     = document.querySelector('[onclick="pbSubmitContact()"]');
  if (!name.trim()) { alert('Please enter your name.'); return; }
  if (!phone.trim()) { alert('Please enter your phone number.'); return; }
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  var selections = [];
  if (product) selections.push({ label: 'Interested in', value: product });
  if (width || height) selections.push({ label: 'Approx. dimensions', value: (width ? width + '″W' : '') + (width && height ? ' × ' : '') + (height ? height + '″H' : '') });
  try {
    var resp = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), email: email.trim() || undefined, phone: phone.trim(), product: product || 'Free Consultation Request', selections: selections, notes: notes.trim() })
    });
    var data = {};
    try { data = await resp.json(); } catch(ex) {}
    if (!resp.ok) throw new Error(data.error || 'Server error');
    var sent = document.getElementById('pb-cp-sent');
    if (sent) sent.style.display = 'block';
    if (btn) btn.style.display = 'none';
  } catch(err) {
    if (btn) { btn.disabled = false; btn.textContent = 'Request free consultation →'; }
    alert('Something went wrong. Please call (609) 742-1720 or email justin@blindznation.com');
  }
}

function pbShowContact(title) {
  var t = title || 'Get a Free Quote';
  var uid = 'bzcp-' + Date.now();
  var html =
    '<div id="' + uid + '" style="position:fixed;inset:0;background:rgba(0,0,0,.7);z-index:9999;display:flex;align-items:center;justify-content:center;padding:16px;overflow-y:auto" onclick="if(event.target===this)document.getElementById(\'' + uid + '\').remove()">' +
      '<div style="background:#fff;border-radius:16px;max-width:460px;width:100%;overflow:hidden;box-shadow:0 24px 60px rgba(0,0,0,.3);margin:auto">' +
        '<div style="background:#111110;padding:18px 22px;display:flex;justify-content:space-between;align-items:center">' +
          '<div style="color:#FAF8F3;font-size:15px;font-weight:600">' + t + '</div>' +
          '<button onclick="document.getElementById(\'' + uid + '\').remove()" style="background:none;border:none;color:#9A8E7A;font-size:24px;cursor:pointer;line-height:1;padding:0 0 0 12px">×</button>' +
        '</div>' +
        '<div style="padding:22px">' +
          '<p style="font-size:13px;color:#666;margin:0 0 16px;line-height:1.6">We handle every order personally — call or text Justin for pricing, samples, and installation.</p>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px;margin-bottom:16px">' +
            '<a href="tel:6097421720" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:#111110;color:#C9A96E;padding:12px 6px;border-radius:10px;text-decoration:none;font-size:12px;font-weight:700;text-align:center">📞<span>Call now</span><span style="font-size:10px;font-weight:400;color:#9A8E7A">(609) 742-1720</span></a>' +
            '<a href="sms:6097421720" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:#111110;color:#C9A96E;padding:12px 6px;border-radius:10px;text-decoration:none;font-size:12px;font-weight:700;text-align:center">💬<span>Text us</span><span style="font-size:10px;font-weight:400;color:#9A8E7A">24/7</span></a>' +
            '<a href="mailto:justin@blindznation.com" style="display:flex;flex-direction:column;align-items:center;gap:4px;background:#111110;color:#C9A96E;padding:12px 6px;border-radius:10px;text-decoration:none;font-size:12px;font-weight:700;text-align:center">✉️<span>Email</span><span style="font-size:10px;font-weight:400;color:#9A8E7A">Same day reply</span></a>' +
          '</div>' +
          '<div style="display:flex;align-items:center;gap:8px;margin-bottom:14px"><div style="flex:1;height:1px;background:#eee"></div><span style="font-size:11px;color:#bbb">or send us a message</span><div style="flex:1;height:1px;background:#eee"></div></div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:10px">' +
            '<div><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Your name *</label><input id="' + uid + '-name" type="text" placeholder="Jane Smith" style="width:100%;padding:9px 11px;border:1px solid #e0e0e0;border-radius:7px;font-size:13px;font-family:inherit;box-sizing:border-box"></div>' +
            '<div><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Phone *</label><input id="' + uid + '-phone" type="tel" placeholder="(215) 555-0100" style="width:100%;padding:9px 11px;border:1px solid #e0e0e0;border-radius:7px;font-size:13px;font-family:inherit;box-sizing:border-box"></div>' +
          '</div>' +
          '<div style="margin-bottom:10px"><label style="font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px">Message / notes</label><textarea id="' + uid + '-msg" rows="3" placeholder="What are you looking for? Window sizes, room, timeline, questions..." style="width:100%;padding:9px 11px;border:1px solid #e0e0e0;border-radius:7px;font-size:13px;font-family:inherit;resize:vertical;box-sizing:border-box"></textarea></div>' +
          '<div style="border:1.5px dashed #C9A96E;border-radius:9px;padding:12px 14px;margin-bottom:14px;background:#FAF7EF">' +
            '<div style="font-size:11px;font-weight:600;color:#555;margin-bottom:6px">📎 Attach photos, PDFs, or measurements <span style="font-weight:400;color:#999">(optional)</span></div>' +
            '<input type="file" id="' + uid + '-files" multiple accept="image/*,.pdf,.heic,.png,.jpg,.jpeg" style="width:100%;font-size:12px;color:#555;font-family:inherit;cursor:pointer" onchange="(function(i,d){var n=Array.from(i.files).map(function(f){return\'📄 \'+f.name}).join(\'<br>\');d.innerHTML=n})(this,document.getElementById(\'' + uid + '-fnames\'))">' +
            '<div id="' + uid + '-fnames" style="font-size:11px;color:#666;margin-top:5px;line-height:1.7"></div>' +
            '<div style="font-size:10px;color:#aaa;margin-top:4px">Window photos, room photos, inspiration images — email to justin@blindznation.com or attach here.</div>' +
          '</div>' +
          '<button onclick="(function(){'  +
            'var n=document.getElementById(\'' + uid + '-name\').value.trim();' +
            'var p=document.getElementById(\'' + uid + '-phone\').value.trim();' +
            'if(!n||!p){alert(\'Please enter your name and phone number.\');return;}' +
            'var m=document.getElementById(\'' + uid + '-msg\').value;' +
            'var fi=document.getElementById(\'' + uid + '-files\');' +
            'var fn=fi&&fi.files.length?\'\\n\\nFiles: \'+Array.from(fi.files).map(function(f){return f.name}).join(\', \')+\'\\n(Please email to justin@blindznation.com)\':\'\';' +
            'var subj=\'Quote Request — \'+n;' +
            'var body=\'QUOTE REQUEST\\n\\nName: \'+n+\'\\nPhone: \'+p+\'\\n\\nMessage:\\n\'+(m||\'(none)\')+fn;' +
            'window.location.href=\'mailto:justin@blindznation.com?subject=\'+encodeURIComponent(subj)+\'&body=\'+encodeURIComponent(body);' +
            'document.getElementById(\'' + uid + '\').remove();' +
          '})()" style="width:100%;background:#111110;color:#C9A96E;border:none;border-radius:8px;padding:13px;font-size:14px;font-weight:700;cursor:pointer;font-family:inherit">Send request →</button>' +
        '</div>' +
      '</div>' +
    '</div>';
  var el = document.createElement('div');
  el.innerHTML = html;
  document.body.appendChild(el.firstChild);
}
function pbCloseContact() {
  var ov = document.getElementById('pb-contact-overlay');
  if (ov) ov.classList.remove('open');
}

// ---- MEASURE HELP MODAL ----
function _initMeasureHelp(htmlContent, measurePageUrl) {
  if (document.getElementById('pb-help-btn')) return;
  measurePageUrl = measurePageUrl || '../pages/measure.html';

  const style = document.createElement('style');
  style.textContent = `
    #pb-help-btn{position:fixed;bottom:90px;right:20px;z-index:400;width:44px;height:44px;border-radius:50%;background:var(--espresso);border:2px solid var(--gold);color:var(--gold);font-size:18px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 3px 12px rgba(0,0,0,0.3);transition:transform 0.15s}
    #pb-help-btn:hover{transform:scale(1.1)}
    #pb-help-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.55);z-index:410;align-items:flex-end;justify-content:center}
    #pb-help-overlay.open{display:flex}
    @media(min-width:600px){#pb-help-overlay{align-items:center}}
    #pb-help-modal{background:#fff;width:100%;max-width:520px;border-radius:16px 16px 0 0;max-height:82vh;overflow-y:auto;padding:24px;position:relative}
    @media(min-width:600px){#pb-help-modal{border-radius:16px;max-height:80vh}}
    #pb-help-close{position:absolute;top:14px;right:14px;background:none;border:none;font-size:22px;cursor:pointer;color:#999;line-height:1}
    #pb-help-close:hover{color:#333}
    .pb-help-heading{font-size:17px;font-weight:600;color:var(--espresso);margin-bottom:4px}
    .pb-help-sub{font-size:12px;color:#888;margin-bottom:20px}
    .pb-help-section{margin-bottom:18px}
    .pb-help-section h4{font-size:13px;font-weight:600;color:var(--espresso);margin-bottom:8px;padding-bottom:5px;border-bottom:1px solid #f0f0ec}
    .pb-help-section ol,.pb-help-section ul{padding-left:18px;font-size:13px;color:#444;line-height:1.8}
    .pb-help-tip{background:#FBF7F0;border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:10px 13px;font-size:12px;color:#555;line-height:1.6;margin-top:10px}
    .pb-help-full-link{display:block;text-align:center;margin-top:16px;font-size:13px;color:var(--gold);text-decoration:none;font-weight:500}
    .pb-help-full-link:hover{text-decoration:underline}
    .pb-help-call{display:flex;align-items:center;gap:10px;background:var(--espresso);border-radius:10px;padding:14px 16px;margin-top:16px}
    .pb-help-call a{color:var(--gold);font-weight:700;text-decoration:none;font-size:14px}
    .pb-help-call span{font-size:12px;color:#9A8570}
  `;
  document.head.appendChild(style);

  const btn = document.createElement('button');
  btn.id = 'pb-help-btn';
  btn.setAttribute('aria-label', 'Measuring help');
  btn.innerHTML = '?';
  document.body.appendChild(btn);

  const overlay = document.createElement('div');
  overlay.id = 'pb-help-overlay';
  overlay.innerHTML = `
    <div id="pb-help-modal" role="dialog" aria-modal="true" aria-label="Measuring guide">
      <button id="pb-help-close" aria-label="Close help">&times;</button>
      ${htmlContent}
      <a class="pb-help-full-link" href="${measurePageUrl}">View full measuring guide &rarr;</a>
      <div class="pb-help-call">
        <div>
          <a href="tel:6097421720">&#128222; (609) 742-1720</a>
          <div><span>Call or text Justin — he'll walk you through it, 24/7</span></div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  btn.addEventListener('click', () => overlay.classList.add('open'));
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.classList.remove('open'); });
  document.getElementById('pb-help-close').addEventListener('click', () => overlay.classList.remove('open'));
}

// ---- MOBILE STICKY CALL BAR ----
function _initMobileBar(consultHref) {
  if (document.getElementById('pb-mobile-bar')) return;
  var bar = document.createElement('div');
  bar.id = 'pb-mobile-bar';
  bar.className = 'pb-mobile-bar';
  bar.innerHTML =
    '<a href="tel:6097421720" class="pb-mb-call" aria-label="Call (609) 742-1720">&#128222; Call Justin</a>' +
    '<a href="' + consultHref + '" class="pb-mb-book" aria-label="Book free consultation">Book free visit</a>';
  document.body.appendChild(bar);
}

// ---- CHATBOT ----
function _initChatbot() {
  if (document.getElementById('pb-chat')) return;

  const widget = document.createElement('div');
  widget.id = 'pb-chat';
  widget.innerHTML = `
    <button class="pb-chat-bubble" id="pb-chat-bubble" aria-label="Chat with Blindznation support">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
      <span class="pb-chat-badge" id="pb-chat-badge">1</span>
    </button>
    <div class="pb-chat-panel" id="pb-chat-panel" hidden>
      <div class="pb-chat-header">
        <div class="pb-chat-header-info">
          <div class="pb-chat-avatar">BZ</div>
          <div>
            <div class="pb-chat-name">Blindznation Support</div>
            <div class="pb-chat-status">&#9679; Online now</div>
          </div>
        </div>
        <a href="tel:6097421720" class="pb-chat-human-btn">&#128222; Talk to Justin</a>
      </div>
      <div class="pb-chat-messages" id="pb-chat-messages"></div>
      <div class="pb-chat-footer">
        <input type="text" id="pb-chat-input" placeholder="Ask about shades, pricing, installation..." autocomplete="off" />
        <button id="pb-chat-send" aria-label="Send">Send</button>
      </div>
    </div>
  `;
  document.body.appendChild(widget);

  const bubble  = document.getElementById('pb-chat-bubble');
  const panel   = document.getElementById('pb-chat-panel');
  const badge   = document.getElementById('pb-chat-badge');
  const msgsEl  = document.getElementById('pb-chat-messages');
  const input   = document.getElementById('pb-chat-input');
  const sendBtn = document.getElementById('pb-chat-send');
  const history = [];

  function addMsg(text, role) {
    const div = document.createElement('div');
    div.className = 'pb-msg pb-msg-' + role;
    div.textContent = text;
    msgsEl.appendChild(div);
    msgsEl.scrollTop = msgsEl.scrollHeight;
    return div;
  }

  addMsg('Hi! I\'m the Blindznation assistant. Ask me about shades, drapery, shutters, motorization, or pricing — or tap Talk to Justin above to reach a real person right away.', 'bot');

  bubble.addEventListener('click', function() {
    if (panel.hasAttribute('hidden')) {
      panel.removeAttribute('hidden');
      badge.style.display = 'none';
      input.focus();
    } else {
      panel.setAttribute('hidden', '');
    }
  });

  async function send() {
    const text = input.value.trim();
    if (!text || sendBtn.disabled) return;
    input.value = '';
    sendBtn.disabled = true;

    addMsg(text, 'user');
    history.push({ role: 'user', content: text });

    const typing = addMsg('Typing…', 'typing');

    try {
      const resp = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history })
      });
      const data = await resp.json();
      typing.remove();
      const reply = data.content || 'Sorry, something went wrong. Please call (609) 742-1720.';
      addMsg(reply, 'bot');
      history.push({ role: 'assistant', content: reply });
    } catch (e) {
      typing.remove();
      addMsg('Sorry, I had a connection issue. Call or text Justin at (609) 742-1720 — available 24/7!', 'bot');
    }

    sendBtn.disabled = false;
    input.focus();
  }

  sendBtn.addEventListener('click', send);
  input.addEventListener('keydown', function(e) { if (e.key === 'Enter') send(); });
}

// ── Request more information ──────────────────────────────────────────────
function reqMoreInfo(product) {
  var subj = product ? 'Request for more information: ' + product : 'Request for more information';
  var body = 'Hi, I would like to request more information about ' + (product || 'your products') + '.\n\nName:\nPhone:\nBest time to call:';
  window.location.href = 'mailto:justin@blindznation.com?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);
}

// ── LIVE SITE — CONTACT-FIRST MODE ───────────────────────────────────────────
// On blindznation.com, configurator pages are replaced with a contact panel
// and product card links are intercepted to show the contact popup instead.
(function () {
  if (window.location.hostname !== 'blindznation.com' && window.location.hostname !== 'www.blindznation.com') return;

  var CONF_PAGES = [
    'shades','hardware','norman-sheers',
    'faux-wood-blinds','soluna-roller-shades','norman-centerpiece-roman',
    'select-rods','kirsch-rods','paris-texas-rods','orion-rods','finial-company',
    'hardware-quote','synchrony-verticals','city-lights-aluminum-blinds',
    'wallace-3d-sheer','galaxy-woven-woods','dynasty-woven-woods',
    'portfolio-dual-sheer','wallace-portfolio-roman',
    'wallace-portfolio-natural-shades','wallace-natural-roller-shades',
    'wallace-banded-shades','wallace-woven','wallace-verticals',
    'kirsch-spec-complete','kirsch-estate-traverse','kirsch-2in-estate-traverse',
    'walden-premier-woven','walden-select-woven','wallace-dynasty-woven',
    'woven-wood-shades','sheer-shades'
  ]; // shutters, soft-treatments, upholstery removed — open for real quotes

  var slug = window.location.pathname.split('/').pop().replace(/\.html$/i, '').toLowerCase();
  var isConfPage = CONF_PAGES.indexOf(slug) !== -1;

  // ── 1. Full-page block for configurator pages ──────────────────────────────
  if (isConfPage) {
    document.addEventListener('DOMContentLoaded', function () {
      var s = document.createElement('style');
      s.textContent =
        '#pb-live-block{background:#F8F6F2;padding:60px 24px 80px;text-align:center;min-height:50vh;display:flex;flex-direction:column;align-items:center;justify-content:center}' +
        '#pb-live-block h2{font-size:26px;font-weight:600;color:#111110;margin-bottom:10px;letter-spacing:-.3px;line-height:1.2}' +
        '#pb-live-block .plb-sub{font-size:15px;color:#555;max-width:440px;line-height:1.7;margin:0 auto 28px}' +
        '.plb-btns{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-bottom:22px}' +
        '.plb-btn{display:inline-flex;flex-direction:column;align-items:center;gap:3px;background:#111110;color:#C9A96E;padding:14px 22px;border-radius:10px;text-decoration:none;font-size:13px;font-weight:700;min-width:100px}' +
        '.plb-btn:hover{opacity:.85}' +
        '.plb-btn small{font-size:10px;font-weight:400;color:#888}';
      document.head.appendChild(s);

      var nav    = document.getElementById('site-nav');
      var footer = document.getElementById('site-footer');
      var nodes  = [];
      var cur    = nav ? nav.nextSibling : document.body.firstChild;
      while (cur && cur !== footer) { nodes.push(cur); cur = cur.nextSibling; }
      nodes.forEach(function (n) { if (n.parentNode) n.parentNode.removeChild(n); });

      var block = document.createElement('div');
      block.id  = 'pb-live-block';
      block.innerHTML =
        '<div style="font-size:38px;margin-bottom:14px">&#127695;</div>' +
        '<h2>Get a Free Custom Quote</h2>' +
        '<p class="plb-sub">We handle every order personally. Call or text Justin for pricing, fabric samples, and a free in-home consultation.</p>' +
        '<div class="plb-btns">' +
          '<a href="tel:6097421720" class="plb-btn">&#128222; Call now<small>(609) 742-1720</small></a>' +
          '<a href="sms:6097421720" class="plb-btn">&#128172; Text us<small>24/7</small></a>' +
          '<a href="mailto:justin@blindznation.com" class="plb-btn">&#9993;&#65039; Email<small>Same day reply</small></a>' +
        '</div>' +
        '<a href="consult.html" style="font-size:13px;color:#C9A96E;font-weight:600;text-decoration:none">Book a free in-home consultation &#8594;</a>';

      if (nav && nav.parentNode) {
        nav.parentNode.insertBefore(block, nav.nextSibling);
      } else {
        document.body.insertBefore(block, footer || null);
      }
    });
  }

  // ── 2. Intercept ALL anchor clicks to configurator pages ──────────────────────
  document.addEventListener('click', function (e) {
    var link = e.target.closest('a[href]');
    if (!link) return;
    if (link.closest('#site-nav, #site-footer, .breadcrumb')) return;
    var raw  = link.getAttribute('href') || '';
    if (raw.charAt(0) === '#') return;
    var slug = raw.split('/').pop().replace(/\.html.*/i, '').toLowerCase();
    if (CONF_PAGES.indexOf(slug) === -1) return;
    e.preventDefault();
    var nameEl = link.querySelector('.pcard-name,.pc-name,.brand-name,.opt-card-b-name');
    var title  = nameEl ? nameEl.textContent.trim() : (link.textContent.trim().slice(0, 60) || 'Get a Free Quote');
    pbShowContact(title || 'Get a Free Quote');
  }, true);
}());

// ── Contact auto-fill + submit guard ────────────────────────────────────────
// Runs on every page that includes shared.js.
document.addEventListener('DOMContentLoaded', function() {
  pbAutoFillContact();
  // Add the required Terms of Agreement checkbox to any inline submit-for-review form.
  try { _pbInjectTermsCheckboxes(); } catch(e) {}
  // Intercept clicks on [data-pb-require-contact] buttons (capture phase = before onclick handler).
  // Prevents submission when name / phone / email are missing, or the Terms box is unchecked.
  document.addEventListener('click', function(e) {
    var btn = e.target.closest('[data-pb-require-contact]');
    if (!btn || btn.disabled) return;
    // Honeypot: a filled hidden field means a bot — silently block submission.
    var _hp = document.getElementById('pb-hp');
    if (_hp && _hp.value.trim() !== '') { e.stopImmediatePropagation(); e.preventDefault(); return; }
    var errId = btn.getAttribute('data-pb-require-contact');
    if (!pbContactValid(errId)) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }
    // Required Terms of Agreement acceptance — block submit-for-review if not checked.
    var _termsScope = btn.closest('.pb-cart-extras') || btn.closest('form') || btn.closest('.step-block') || document;
    if (!pbTermsValid(_termsScope, errId)) {
      e.stopImmediatePropagation();
      e.preventDefault();
      return;
    }
    // Fold per-unit labels into the notes so they reach the quote email/cart.
    var _lbl = pbGetShadeLabels();
    var _n = document.getElementById('cf-notes');
    if (_lbl && _n && (_n.value || '').indexOf(_lbl) < 0) {
      _n.value = (_n.value ? _n.value.replace(/\n?Labels: .*/,'') + '\n' : '') + 'Labels: ' + _lbl;
    }
  }, true);
});

// Quote submission helper used by standalone product pages (ported from Philly Blinds).
async function _apiSubmit(name, email, phone, productName, configText, successId, formHideId, btn, onSuccess) {
  if (btn) { btn._origText = btn.textContent; btn.disabled = true; btn.textContent = 'Sending…'; }
  try {
    var r = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email || '', phone: phone, product: productName, selections: [], notes: configText })
    });
    var d = {}; try { d = await r.json(); } catch(e) {}
    if (!r.ok) throw new Error(d.error || 'Server error ' + r.status);
    if (onSuccess) onSuccess();
    if (formHideId) { var fEl = document.getElementById(formHideId); if (fEl) { fEl.classList.remove('show'); fEl.style.display = 'none'; } }
    var sEl = document.getElementById(successId);
    if (sEl) { sEl.classList.add('show'); sEl.style.display = 'block'; sEl.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  } catch(err) {
    if (btn) { btn.disabled = false; btn.textContent = btn._origText || 'Send quote request'; }
    var mh = 'mailto:blindznation@gmail.com?subject=' + encodeURIComponent('Quote — ' + name) + '&body=' + encodeURIComponent('Name: ' + name + '\nPhone: ' + phone + '\nProduct: ' + productName + '\n\n' + configText);
    var eDiv = document.createElement('div');
    eDiv.style.cssText = 'background:#FEE2E2;border-radius:8px;padding:10px 13px;margin-top:10px;font-size:12px;color:#991B1B;line-height:1.5';
    eDiv.innerHTML = '<strong>Issue sending.</strong> <a href="' + mh + '" style="color:#991B1B;font-weight:700;text-decoration:underline">Email directly →</a> or call <a href="tel:6097421720" style="color:#991B1B">(609) 742-1720</a>';
    if (btn && btn.parentElement) btn.insertAdjacentElement('afterend', eDiv);
    setTimeout(function(){ if (eDiv.parentElement) eDiv.remove(); }, 15000);
  }
}

// ── Auto-init nav/footer from data-page body attribute (ported from Philly Blinds) ──
// Pages declare: <body data-page="Page Name"> → shared.js renders nav + footer automatically,
// so ported pages need no inline renderNav()/renderFooter() script. Pages without data-page
// (they call renderNav()/renderFooter() themselves) are left untouched.
(function() {
  var pg = document.body && document.body.getAttribute('data-page');
  if (pg !== null) {
    if (typeof renderPromoBar === 'function') renderPromoBar();
    renderNav(pg);
    renderFooter(pg === 'home');
  }
})();



