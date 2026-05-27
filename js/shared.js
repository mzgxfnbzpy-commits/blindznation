// ============================================================
// Blindznation — Shared Components
// ============================================================


function _injectHead(isHome) {
  const prefix = isHome ? '' : '../';

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
    i.content = 'https://blindznation.com/img/social-preview.jpg';
    document.head.appendChild(i);
  }
  if (!document.querySelector('meta[name="twitter:image"]')) {
    const i = document.createElement('meta');
    i.name = 'twitter:image';
    i.content = 'https://blindznation.com/img/social-preview.jpg';
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
      "logo": "https://blindznation.com/img/social-preview.jpg",
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
        <span class="nav-brand-other">Philly Blinds</span>
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
  setTimeout(function(){ _initShippingEstimators(); _initFileUploads(); _initInstallationAddons(); }, 0);
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
function pbAddToCart(item) {
  item.cartId = Date.now() + '-' + Math.floor(Math.random()*9999);
  var cart = pbGetCart();
  cart.push(item);
  _pbSaveCart(cart);
  _pbCartToast(item.product || 'Item');
}
function pbRemoveCartItem(cartId) {
  _pbSaveCart(pbGetCart().filter(function(i){ return i.cartId !== cartId; }));
  _renderCartBody();
}
function pbClearCart() { _pbSaveCart([]); _renderCartBody(); }

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
    body.innerHTML = '<div class="pb-cart-empty"><div class="pb-cart-empty-icon">🛍️</div>Your cart is empty.<br><span style="font-size:12px">Configure a product and click Add to Cart.</span></div>';
    if (foot) foot.style.display = 'none';
    return;
  }
  if (foot) foot.style.display = 'block';
  body.innerHTML = cart.map(function(item, idx) {
    var motorHtml = '';
    if (item.motorized && item.motorOptions) {
      var mo = item.motorOptions;
      var lines = ['Power: ' + mo.power];
      if (mo.power === 'Rechargeable' && mo.chargers) lines.push('Chargers: ' + mo.chargers);
      if (mo.power === 'Hardwire') {
        lines.push('Wiring: ' + mo.wiring);
        if (mo.cord) lines.push('Cord: ' + mo.cord);
      }
      if (mo.remote === 'Yes') lines.push('Remote: ' + mo.channel + ' × ' + mo.remotes);
      else lines.push('Remote: No');
      motorHtml = '<div class="pb-ci-motor">⚡ ' + lines.map(_pbEsc).join(' · ') + '</div>';
    }
    return '<div class="pb-ci">' +
      '<button class="pb-ci-remove" onclick="pbRemoveCartItem(\'' + _pbEsc(item.cartId) + '\')" aria-label="Remove">×</button>' +
      '<div class="pb-ci-name">' + _pbEsc(item.product || 'Item') + (item.qty > 1 ? ' ×' + item.qty : '') + '</div>' +
      (item.specs ? '<div class="pb-ci-specs">' + _pbEsc(item.specs) + '</div>' : '') +
      motorHtml +
      '</div>';
  }).join('');
}

// ── Checkout from cart ───────────────────────────────────────
// TODO: replace PB_CHECKOUT_URL with the real Stripe / checkout link when ready
var PB_CHECKOUT_URL = '#checkout';

function pbGoCheckout() {
  if (PB_CHECKOUT_URL === '#checkout') {
    var cart = pbGetCart();
    if (!cart.length) return;
    var lines = cart.map(function(item, i) {
      var s = (i+1) + '. ' + (item.product || 'Item');
      if (item.qty > 1) s += ' \xd7' + item.qty;
      if (item.specs) s += ' — ' + item.specs;
      return s;
    }).join('\n');
    window.location.href = 'mailto:justin@blindznation.com' +
      '?subject=' + encodeURIComponent('Order Inquiry') +
      '&body=' + encodeURIComponent('Hi, I\'d like to place an order for:\n\n' + lines + '\n\nPlease contact me to complete my purchase.');
    return;
  }
  sessionStorage.setItem('pb_checkout_cart', JSON.stringify(pbGetCart()));
  window.location.href = PB_CHECKOUT_URL;
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
      '<button class="btn-gold" style="width:100%;padding:13px;font-size:15px;font-weight:600;margin-bottom:8px" ' +
        'onclick="pbGoCheckout()">Check out now →</button>' +
      '<div style="text-align:center;font-size:11px;color:#aaa;margin-bottom:12px">Secure checkout &bull; All major cards accepted</div>' +
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
    opts.channel = _pmmGet('pmm-grp-channel') || 'Single channel';
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
        '<div class="pmm-sub-label">Channel type</div>' +
        '<div class="pmm-row" id="pmm-grp-channel">' +
          '<button class="pmm-opt sel" onclick="_pmmSel(this,\'pmm-grp-channel\')">Single channel</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-channel\')">Multi channel</button>' +
        '</div>' +
        '<div class="pmm-note" style="margin-bottom:8px">Single: one remote for all shades together. Multi: control each shade independently.</div>' +
        '<div class="pmm-sub-label" style="margin-top:8px">Number of remotes</div>' +
        '<div class="pmm-row" id="pmm-grp-remotes">' +
          '<button class="pmm-opt sel" onclick="_pmmSel(this,\'pmm-grp-remotes\')">1</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remotes\')">2</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remotes\')">3</button>' +
          '<button class="pmm-opt" onclick="_pmmSel(this,\'pmm-grp-remotes\')">4+</button>' +
        '</div></div>' +

      // Confirm
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:20px">' +
        '<button onclick="document.getElementById(\'pb-motor-overlay\').classList.remove(\'open\')" ' +
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
 * @param {Function} onCheckout — called when user clicks Check Out Now (after validation)
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

  var tariffAmt = subtotal ? Math.round(subtotal * PB_TARIFF_RATE) : 0;
  var total = subtotal ? subtotal + tariffAmt : 0;
  var hasConflict = conflictMsg && conflictMsg.trim().length > 0;

  // Build line-by-line HTML
  var linesHtml = lines.map(function(l) {
    return '<div style="display:flex;justify-content:space-between;align-items:baseline;gap:12px;padding:6px 0;border-bottom:1px solid #f5f5f3">' +
      '<span style="font-size:12px;color:#666;flex-shrink:0">' + l.label + '</span>' +
      '<span style="font-size:12px;font-weight:500;color:#1a1a1a;text-align:right">' + l.value + '</span>' +
      '</div>';
  }).join('');

  var tariffLine = PB_TARIFF_RATE > 0
    ? '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f5f5f3"><span style="font-size:12px;color:#666">Tariff (' + Math.round(PB_TARIFF_RATE*100) + '%)</span><span style="font-size:12px;font-weight:500;color:#b45309">+$' + tariffAmt.toFixed(0) + '</span></div>'
    : '<div style="display:flex;justify-content:space-between;padding:6px 0;border-bottom:1px solid #f5f5f3"><span style="font-size:12px;color:#999">Tariff</span><span style="font-size:11px;color:#aaa">None on this product</span></div>';

  var conflictHtml = hasConflict
    ? '<div style="background:#FEE2E2;border-radius:8px;padding:10px 13px;margin-bottom:12px;font-size:12px;color:#991B1B;line-height:1.5">⚠ ' + conflictMsg + '</div>'
    : '';

  var totalColor = hasConflict ? '#aaa' : 'var(--espresso)';
  var totalHtml = subtotal
    ? '<div style="display:flex;justify-content:space-between;align-items:baseline;padding:10px 0 4px"><span style="font-size:13px;font-weight:600;color:#1a1a1a">Estimated total</span><span style="font-size:20px;font-weight:700;color:' + totalColor + '">$' + total.toFixed(0) + '</span></div>'
    : '<div style="font-size:13px;color:#888;padding:8px 0">Enter dimensions above to see estimate.</div>';

  // Store order data on panel for checkout modal
  panel._pbOrderData = { lines: lines, total: subtotal, product: lines.length ? lines[0].value : '' };
  panel._pbOnCheckout = onCheckout || null;

  panel.innerHTML =
    '<div style="padding:16px 18px">' +
      '<div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:12px">Your selection</div>' +
      linesHtml +
      (subtotal ? tariffLine : '') +
      totalHtml +
      '<div style="font-size:10px;color:#aaa;margin-bottom:6px">Estimate only. Shipping and final pricing confirmed at order review.</div>' +
      conflictHtml +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
        '<button onclick="pbEstimateAddCart(\'' + priceBoxId + '\')" style="padding:11px;border:1.5px solid #e8e8e4;border-radius:8px;background:#fff;font-size:13px;font-weight:500;cursor:pointer;font-family:inherit;color:#333">Add to Cart</button>' +
        '<button onclick="pbEstimateCheckoutNew(\'' + priceBoxId + '\')" ' +
          (hasConflict ? 'disabled style="padding:11px;border-radius:8px;background:#e5e5e5;font-size:13px;font-weight:700;cursor:not-allowed;font-family:inherit;color:#aaa;border:none"' :
                         'style="padding:11px;border-radius:8px;background:var(--espresso);color:var(--gold);font-size:13px;font-weight:700;cursor:pointer;font-family:inherit;border:none"') +
          '>Check Out Now &#8594;</button>' +
      '</div>' +
    '</div>';
}

function pbEstimateAddCart(priceBoxId) {
  var panel = document.getElementById(priceBoxId + '-checkout-panel');
  if (panel && panel._pbOnCheckout) panel._pbOnCheckout(false);
  else pbOpenCart();
}

function pbEstimateCheckout(priceBoxId) {
  var panel = document.getElementById(priceBoxId + '-checkout-panel');
  if (panel && panel._pbOnCheckout) panel._pbOnCheckout(true);
}
function pbEstimateCheckoutNew(priceBoxId) {
  var panel = document.getElementById(priceBoxId + '-checkout-panel');
  if (!panel) return;
  if (panel._pbOrderData) {
    pbShowCheckout(panel._pbOrderData);
  } else if (panel._pbOnCheckout) {
    panel._pbOnCheckout(true);
  }
}

function pbCollectItem(productName, lines, total, motorized) {
  var specs = lines.map(function(l){ return l.label + ': ' + l.value; }).join(' | ');
  pbAddToCartWithMotor({ product: productName, specs: specs, qty: 1 }, !!motorized);
}

// ── FULL CHECKOUT MODAL ─────────────────────────────────────────
// Flow: Options → estimate → "Check Out Now" → this modal (contact + billing last)
var _pbCheckoutOrder = null;

function pbInitCheckoutModal() {
  if (document.getElementById('pb-checkout-overlay')) return;

  var s = document.createElement('style');
  s.textContent =
    '.pb-co2{display:none;position:fixed;inset:0;background:rgba(0,0,0,.6);z-index:800;align-items:center;justify-content:center;padding:12px}' +
    '.pb-co2.open{display:flex}' +
    '.pb-checkout-modal{background:#fff;border-radius:16px;width:100%;max-width:560px;max-height:94vh;overflow-y:auto;display:flex;flex-direction:column}' +
    '.pb-chk-head{background:var(--espresso);padding:20px 22px;border-radius:16px 16px 0 0;display:flex;align-items:center;justify-content:space-between}' +
    '.pb-chk-title{font-size:16px;font-weight:700;color:var(--cream)}' +
    '.pb-chk-close{background:none;border:none;color:var(--text-muted);font-size:22px;cursor:pointer;line-height:1;font-family:inherit}.pb-chk-close:hover{color:var(--cream)}' +
    '.pb-chk-body{padding:20px 22px;flex:1}' +
    '.pb-chk-section{margin-bottom:20px}' +
    '.pb-chk-section-title{font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:10px}' +
    '.pb-chk-line{display:flex;justify-content:space-between;font-size:13px;padding:5px 0;border-bottom:1px solid #f0f0ec}' +
    '.pb-chk-line:last-child{border-bottom:none}' +
    '.pb-chk-label{color:#666}.pb-chk-value{font-weight:500;color:#1a1a1a;text-align:right;max-width:60%}' +
    '.pb-chk-total{display:flex;justify-content:space-between;font-size:18px;font-weight:700;padding:12px 0;border-top:2px solid var(--espresso);margin-top:8px}' +
    '.pb-chk-notice{background:#FBF7F0;border-left:3px solid var(--gold);border-radius:0 8px 8px 0;padding:10px 13px;font-size:12px;color:#7A5A28;line-height:1.6;margin-bottom:16px}' +
    '.pb-chk-field{margin-bottom:12px}' +
    '.pb-chk-field label{font-size:11px;font-weight:600;color:#555;display:block;margin-bottom:4px}' +
    '.pb-chk-field input,.pb-chk-field select{width:100%;padding:10px 12px;border:1px solid #e8e8e4;border-radius:8px;font-size:14px;font-family:inherit;color:#1a1a1a}' +
    '.pb-chk-field input:focus{border-color:var(--gold);outline:none}' +
    '.pb-pay-notice{background:var(--espresso);border-radius:10px;padding:14px 16px;margin-bottom:16px}' +
    '.pb-pay-notice-title{font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;color:var(--gold);margin-bottom:6px}' +
    '.pb-pay-notice-body{font-size:12px;color:var(--text-dark);line-height:1.6}' +
    '.pb-chk-submit{width:100%;background:var(--espresso);color:var(--gold);border:none;border-radius:10px;padding:15px;font-size:15px;font-weight:700;cursor:pointer;font-family:inherit;letter-spacing:.3px}' +
    '.pb-chk-submit:hover{opacity:.9}' +
    '.pb-chk-sent{display:none;text-align:center;padding:24px;background:#EAF3DE;border-radius:10px;margin-top:10px}';
  document.head.appendChild(s);

  var ov = document.createElement('div');
  ov.id = 'pb-checkout-overlay';
  ov.className = 'pb-co2';
  ov.addEventListener('click', function(e){ if(e.target===ov) pbCloseCheckout(); });
  ov.innerHTML =
    '<div class="pb-checkout-modal">' +
      '<div class="pb-chk-head">' +
        '<div class="pb-chk-title">&#128274; Secure Checkout</div>' +
        '<button class="pb-chk-close" onclick="pbCloseCheckout()">&#215;</button>' +
      '</div>' +
      '<div class="pb-chk-body">' +
        // Order summary
        '<div class="pb-chk-section">' +
          '<div class="pb-chk-section-title">Order summary</div>' +
          '<div id="pb-chk-lines"></div>' +
          '<div class="pb-chk-total"><span>Estimated total</span><span id="pb-chk-total" style="color:var(--espresso)">—</span></div>' +
        '</div>' +
        // Shipping notice
        '<div class="pb-chk-notice">' +
          '&#128667; <strong>Shipping &amp; pricing subject to final confirmation.</strong> Freight charges may be adjusted based on actual package dimensions and weight. We will contact you before any changes are made.' +
        '</div>' +
        // Contact info
        '<div class="pb-chk-section">' +
          '<div class="pb-chk-section-title">Your information</div>' +
          '<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px">' +
            '<div class="pb-chk-field"><label>First name *</label><input id="pb-chk-fname" type="text" placeholder="Jane"></div>' +
            '<div class="pb-chk-field"><label>Last name *</label><input id="pb-chk-lname" type="text" placeholder="Smith"></div>' +
          '</div>' +
          '<div class="pb-chk-field"><label>Phone *</label><input id="pb-chk-phone" type="tel" placeholder="(215) 555-0100"></div>' +
          '<div class="pb-chk-field"><label>Email *</label><input id="pb-chk-email" type="email" placeholder="jane@example.com"></div>' +
          '<div class="pb-chk-field"><label>Shipping address *</label><input id="pb-chk-addr" type="text" placeholder="123 Main St, Philadelphia PA 19103"></div>' +
          '<div class="pb-chk-field"><label>Notes / special instructions</label><input id="pb-chk-notes" type="text" placeholder="Room name, timeline, questions..."></div>' +
        '</div>' +
        // Payment notice
        '<div class="pb-pay-notice">' +
          '<div class="pb-pay-notice-title">&#128274; Payment authorization</div>' +
          '<div class="pb-pay-notice-body">Your card will <strong style="color:var(--cream)">not be charged</strong> until we review and approve your order. A payment link will be sent to your email once we confirm availability, final pricing, and shipping. If anything changes, we contact you first — always.</div>' +
        '</div>' +
        '<button class="pb-chk-submit" onclick="pbSubmitCheckout()">Place Order Request &#8594;</button>' +
        '<div class="pb-chk-sent" id="pb-chk-sent">' +
          '<div style="font-size:24px;margin-bottom:10px">&#10003;</div>' +
          '<div style="font-size:16px;font-weight:700;color:#27500A;margin-bottom:8px">Order request received!</div>' +
          '<div style="font-size:13px;color:#3B6D11;margin-bottom:14px">Justin will review your order, confirm final pricing and shipping, then send a secure payment link to your email. Expect to hear from us within a few hours.</div>' +
          '<a href="tel:6097421720" style="display:inline-block;background:var(--espresso);color:var(--gold);font-size:14px;font-weight:700;padding:11px 22px;border-radius:8px;text-decoration:none">&#128222; (609) 742-1720</a>' +
        '</div>' +
      '</div>' +
    '</div>';
  document.body.appendChild(ov);
}

function pbShowCheckout(order) {
  pbInitCheckoutModal();
  _pbCheckoutOrder = order;
  var linesHtml = (order.lines || []).map(function(l) {
    return '<div class="pb-chk-line"><span class="pb-chk-label">' + l.label + '</span><span class="pb-chk-value">' + l.value + '</span></div>';
  }).join('');
  document.getElementById('pb-chk-lines').innerHTML = linesHtml;
  document.getElementById('pb-chk-total').textContent = order.total ? '$' + Number(order.total).toFixed(0) + ' est.' : '—';
  document.getElementById('pb-chk-sent').style.display = 'none';
  document.querySelector('.pb-chk-submit').style.display = 'block';
  document.getElementById('pb-checkout-overlay').classList.add('open');
}

function pbCloseCheckout() {
  var ov = document.getElementById('pb-checkout-overlay');
  if (ov) ov.classList.remove('open');
}

function pbSubmitCheckout() {
  var fname = (document.getElementById('pb-chk-fname')||{}).value || '';
  var lname = (document.getElementById('pb-chk-lname')||{}).value || '';
  var phone = (document.getElementById('pb-chk-phone')||{}).value || '';
  var email = (document.getElementById('pb-chk-email')||{}).value || '';
  var addr  = (document.getElementById('pb-chk-addr') ||{}).value || '';
  if (!fname.trim() || !phone.trim() || !email.trim() || !addr.trim()) {
    alert('Please fill in your name, phone, email, and shipping address.');
    return;
  }
  var order = _pbCheckoutOrder || {};
  var lines = (order.lines || []).map(function(l){ return l.label + ': ' + l.value; }).join('\n');
  var notes = (document.getElementById('pb-chk-notes')||{}).value || '';
  var body = 'ORDER REQUEST\n' +
    '===========================\n' +
    'Name:    ' + fname + ' ' + lname + '\n' +
    'Phone:   ' + phone + '\n' +
    'Email:   ' + email + '\n' +
    'Address: ' + addr + '\n\n' +
    'PRODUCT:\n' + (order.product || '—') + '\n\n' +
    'SELECTIONS:\n' + lines + '\n\n' +
    'Estimated total: $' + (order.total ? Number(order.total).toFixed(0) : '—') + '\n\n' +
    'Notes: ' + (notes || 'None') + '\n\n' +
    'NOTE: Card NOT yet charged — awaiting order review and approval.';
  window.location.href = 'mailto:justin@blindznation.com' +
    '?subject=' + encodeURIComponent('Order Request — ' + fname + ' ' + lname) +
    '&body=' + encodeURIComponent(body);
  document.querySelector('.pb-chk-submit').style.display = 'none';
  document.getElementById('pb-chk-sent').style.display = 'block';
  // Also add to cart for tracking
  pbAddToCart({ product: order.product || 'Order', specs: lines, qty: 1, cartId: Date.now()+'-order' });
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

  var batteryDetail = wandAllowed
    ? '<div style="font-size:11px;color:var(--text-dark);line-height:1.6;margin-bottom:6px">Battery options:</div>' +
      '<div class="opt-row" id="nm-grp-battery-type">' +
        '<button class="opt-btn sel" onclick="selOpt(this,\'nm-grp-battery-type\')" style="color:#333">Charging Wand</button>' +
        '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-battery-type\')" style="color:#333">AC Adapter Charger</button>' +
      '</div>' +
      '<div style="font-size:10px;color:var(--text-faint);margin-top:5px;line-height:1.5">Charging Wand: NOT available with Cassette headrail or Dual shades. Use AC Adapter Charger for those configurations.</div>'
    : '<div style="font-size:11px;color:var(--text-dark);line-height:1.6">Rechargeable battery with AC Adapter Charger. No wiring required — ideal for retrofit installations. ' +
      (isSmartDrape ? '' : '') +
      'Charging Wand is not available for this product type.</div>';

  var dcLowVoltageBtn = isSmartDrape
    ? '<button class="opt-btn" style="color:#aaa;text-decoration:line-through;cursor:not-allowed" disabled title="DC Low Voltage not available for SmartDrape">DC Low Voltage ⚠</button>'
    : '<button class="opt-btn sel" onclick="selOpt(this,\'nm-grp-wire\')" style="color:#333">24V DC (low voltage)</button>';

  var html =
    '<div class="pb-norman-motor" style="margin-top:12px;padding:16px 18px;background:var(--espresso-mid);border-radius:12px;border:0.5px solid var(--border-dark)">' +
      '<div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:12px">&#9889; Norman Smart Motorization</div>' +
      (isSmartDrape ? '<div style="font-size:11px;background:#2a1c0e;border:1px solid #7a5020;border-radius:7px;padding:8px 12px;color:#e8b060;margin-bottom:12px;line-height:1.5">SmartDrape motor: $642 per shade (Norman Smart). DC Low Voltage is not available for SmartDrape.</div>' : '') +

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
          '<button class="opt-btn sel" onclick="selOpt(this,\'nm-grp-remote-type\')" style="color:#333">Basic Remote — $75</button>' +
          '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-remote-type\')" style="color:#333">SmartDial G2 — $268</button>' +
        '</div>' +
        '<div style="font-size:11px;font-weight:600;color:var(--text-muted);margin-bottom:6px;margin-top:10px">Channel assignment</div>' +
        '<div class="opt-row" id="nm-grp-channel">' +
          '<button class="opt-btn sel" onclick="selOpt(this,\'nm-grp-channel\')" style="color:#333">Single channel</button>' +
          '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-channel\')" style="color:#333">Multi channel</button>' +
        '</div>' +
        '<div style="font-size:10px;color:var(--text-faint);margin-top:5px">Single: all shades respond together. Multi: control each shade independently. Shades default to Ch 1 if not assigned.</div>' +
      '</div>' +

      // Smart home
      '<div>' +
        '<div style="font-size:12px;font-weight:600;color:var(--cream);margin-bottom:7px">Smart home integration</div>' +
        '<div class="opt-row" id="nm-grp-smart" style="flex-wrap:wrap">' +
          '<button class="opt-btn sel" onclick="selOpt(this,\'nm-grp-smart\')" style="color:#333">None</button>' +
          '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-smart\')" style="color:#333">Amazon Alexa</button>' +
          '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-smart\')" style="color:#333">Google Home</button>' +
          '<button class="opt-btn" onclick="selOpt(this,\'nm-grp-smart\')" style="color:#333">Apple HomeKit</button>' +
        '</div>' +
        '<div style="font-size:10px;color:var(--text-faint);margin-top:5px">Hub required for app and voice control. ShadeAuto Hub + Repeater available as add-on. Max 5 repeaters per system.</div>' +
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
  var smart   = (document.querySelector('#nm-grp-smart .opt-btn.sel') || {}).textContent || 'None';
  return 'Power: ' + power.replace(/[^\w\s]/g,'').trim() +
    (wire ? ' — ' + wire : '') +
    ' | Remote: ' + remote.replace(/[^\w\s\-]/g,'').trim() +
    (remotes ? ' × ' + remotes + ' (' + channel + ')' : '') +
    ' | Smart home: ' + smart;
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
  var names = Array.from(input.files).map(function(f){ return '📄 ' + f.name; }).join('<br>');
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
  var p = parseInt(String(zip).replace(/D/g,"").padStart(5,"0").substring(0,3));
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
            'var fn=fi&&fi.files.length?\'\\n\\nFiles: \'+Array.from(fi.files).map(function(f){return f.name}).join(\', \')+\'\\n(Please email to justin@blindznation.com)\':\'\';\'' +
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
    <button class="pb-chat-bubble" id="pb-chat-bubble" aria-label="Chat with Philly Blinds support">
      <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4C2.9 2 2 2.9 2 4v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
      <span class="pb-chat-badge" id="pb-chat-badge">1</span>
    </button>
    <div class="pb-chat-panel" id="pb-chat-panel" hidden>
      <div class="pb-chat-header">
        <div class="pb-chat-header-info">
          <div class="pb-chat-avatar">PB</div>
          <div>
            <div class="pb-chat-name">Philly Blinds Support</div>
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

  addMsg('Hi! I\'m the Philly Blinds assistant. Ask me about shades, drapery, shutters, motorization, or pricing — or tap Talk to Justin above to reach a real person right away.', 'bot');

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

// LIVE MODE — intercept product selections site-wide → contact form popup
document.addEventListener('DOMContentLoaded', function() {
  var BLOCK = [
    '.product-card', 'a.product-card',
    '[onclick*="selectProduct"]', '[onclick*="selectBlindsType"]', '[onclick*="selectVerticalsType"]',
    '[onclick*="selectPleat"]', '[onclick*="selectRomanStyle"]', '[onclick*="selectPinchDetail"]',
    '[onclick*="selLine"]',
    '[onclick*="setProd"]', '[onclick*="selSystem"]', '[onclick*="pickType"]',
    '[onclick*="setType"]', '[onclick*="selCollection"]', '[onclick*="selProduct"]',
    '[onclick*="openConfig"]', '.configure-btn', '.btn-configure'
  ];
  BLOCK.forEach(function(sel) {
    document.querySelectorAll(sel).forEach(function(el) {
      el.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopImmediatePropagation();
        var nameEl = el.querySelector('.product-name, .opt-name, h3, h4');
        var label = nameEl ? nameEl.textContent.trim() : el.textContent.trim().split('\n')[0].trim();
        pbShowContact(label ? 'Get a Quote — ' + label : 'Get a Free Quote');
      }, true);
    });
  });
});

