// Basic Roller Shades — configurator page (house line).
//
// Every price comes from BasicEngine.quote() (js/pages/basic-roller-engine.js), which reads
// BASIC_DATA (js/pages/basic-roller-data.js), both built from the Basic Roller rule book.
// This file only turns the form into an order for the engine and shows the answer.
// Customer sees: retail → 25% off → your price, then shipping (never discounted).
// Lutron is a referral: no price, no cart — the request goes to Justin for a call.

var CRS = {
  w: 0, h: 0, qty: 1,
  mount: 'inside',             // rule book §10 defaults
  blackout: false, openness: '', color: '',
  top: 'open roll', fasciaColor: '', endCaps: false, roll: 'regular',
  lift: 'manual', chainSide: 'right',
  brand: '', power: 'battery', remote: ''
  // Delivery lives in window.pbDelivery ('ship' | 'install') — shared pbDeliveryStepHTML.
};
var _crsDimTimer;
function _crsEl(id) { return document.getElementById(id); }
function _crsMoney(n) {
  var cents = Math.round(n * 100) % 100 !== 0;
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: 2 });
}
function _crsInt(id, min, max) {
  var v = Math.round(parseFloat((_crsEl(id) || {}).value));
  if (!(v >= min)) v = min;
  return v > max ? max : v;
}
function _crsPill(groupId, btn) {
  document.querySelectorAll('#' + groupId + ' .opt-btn').forEach(function (b) { b.classList.remove('sel'); });
  if (btn) btn.classList.add('sel');
}
function _crsShow(id, on) { var el = _crsEl(id); if (el) el.style.display = on ? '' : 'none'; }

// ── STEP CONTROL (accordion) ─────────────────────────────────
function crsToggle(id) { var el = _crsEl(id); if (!el) return; el.classList.toggle('open'); el.classList.toggle('active'); }
function crsOpen(id) {
  var el = _crsEl(id);
  if (!el || el.classList.contains('active')) return;
  el.classList.add('active');
  setTimeout(function () {
    var navH = (_crsEl('site-nav') || {}).offsetHeight || 60;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - navH - 14, behavior: 'smooth' });
  }, 80);
}
function crsDone(stepId, val) {
  var el = _crsEl(stepId);
  if (!el) return;
  el.classList.add('done');
  var sv = el.querySelector('.step-val');
  if (sv) sv.textContent = val || '';
}

// ── STEP 1: SIZE, MOUNT, QTY ─────────────────────────────────
function crsPickMount(val) {
  CRS.mount = val;
  _crsPill('crs-grp-mount', _crsEl('mc-' + val));
  var im = _crsEl('mount-note-im'), om = _crsEl('mount-note-om');
  if (im) im.classList.toggle('show', val === 'inside');
  if (om) om.classList.toggle('show', val === 'outside');
  if (CRS.w && CRS.h) crsDimChanged();
  crsUpdatePanel();
}
function crsDimChanged() {
  var w = parseFloat((_crsEl('crs-inp-w') || {}).value) || 0;
  var h = parseFloat((_crsEl('crs-inp-h') || {}).value) || 0;
  var warn = _crsEl('dim-warn'), info = _crsEl('dim-info');
  CRS.w = w > 0 ? w : 0; CRS.h = h > 0 ? h : 0;
  var errs = [];
  if (w > 120) errs.push('Over 120″ wide — we\'ll quote this one by hand.');
  if (h > 144) errs.push('Over 144″ tall — we\'ll quote this one by hand.');
  if (w < 0 || h < 0) errs.push('Enter a positive size.');
  if (warn) { warn.textContent = errs.join(' '); warn.classList.toggle('show', errs.length > 0); }
  if (info) {
    var msg = (CRS.mount === 'inside' && w > 0) ? 'Inside mount: we\'ll cut the width to ' + (Math.round((w - 0.25) * 1000) / 1000) + '″ for a proper fit.' : '';
    info.textContent = msg; info.classList.toggle('show', !!msg);
  }
  if (CRS.w && CRS.h) {
    crsDone('step-1', (CRS.mount === 'inside' ? 'Inside · ' : 'Outside · ') + CRS.w + '″ × ' + CRS.h + '″');
    clearTimeout(_crsDimTimer);
    _crsDimTimer = setTimeout(function () { crsOpen('step-2'); }, 900);
  }
  crsUpdatePanel();
}
function crsAdjQty(d) { CRS.qty = Math.max(1, Math.min(20, CRS.qty + d)); var el = _crsEl('qty-num'); if (el) el.value = CRS.qty; crsUpdatePanel(); }
function crsQtyInput() { CRS.qty = _crsInt('qty-num', 1, 20); crsUpdatePanel(); }

// ── STEP 2: FABRIC ───────────────────────────────────────────
function _crsRenderColors() {
  var B = BASIC_DATA, list = CRS.blackout ? B.fabric.blackout.colors : B.fabric.solar.colors;
  if (list.indexOf(CRS.color) === -1) CRS.color = '';
  var sw = { 'White': '#f8f8f5', 'Off-White': '#f1ede2', 'Cream': '#ece2cc', 'Black': '#1c1c1c', 'Gray': '#9a9a96', 'Brown': '#6b4a33', 'Silver': 'linear-gradient(135deg,#dcdcdc,#a4a4a4)' };
  var el = _crsEl('crs-grp-color');
  if (el) el.innerHTML = list.map(function (c) {
    return '<button class="opt-btn' + (c === CRS.color ? ' sel' : '') + '" onclick="crsPickColor(\'' + c + '\',this)"><span class="hw-sw" style="background:' + (sw[c] || '#ccc') + '"></span>' + c + '</button>';
  }).join('');
  var op = _crsEl('crs-grp-open');
  if (op) op.innerHTML = B.fabric.solar.openness.map(function (o) {
    return '<button class="opt-btn' + (o === CRS.openness ? ' sel' : '') + '" onclick="crsPickOpenness(\'' + o + '\',this)">' + o + '</button>';
  }).join('');
  var fc = _crsEl('crs-grp-fascia-color');
  if (fc) fc.innerHTML = B.topTreatment.fascia.colors.map(function (c) {
    return '<button class="opt-btn' + (c === CRS.fasciaColor ? ' sel' : '') + '" onclick="crsPickFasciaColor(\'' + c + '\',this)"><span class="hw-sw" style="background:' + (sw[c] || '#ccc') + '"></span>' + c + '</button>';
  }).join('');
}
function _crsFabricLabel() {
  if (CRS.blackout) return 'Blackout' + (CRS.color ? ' · ' + CRS.color : '');
  return 'Solar Screen' + (CRS.openness ? ' ' + CRS.openness : '') + (CRS.color ? ' · ' + CRS.color : '');
}
function crsPickType(val) {
  CRS.blackout = val === 'blackout';
  _crsPill('crs-grp-type', _crsEl('tc-' + val));
  var so = _crsEl('solar-opts'); if (so) so.classList.toggle('show', !CRS.blackout);
  _crsRenderColors();
  crsDone('step-2', _crsFabricLabel());
  crsUpdatePanel();
}
function crsPickOpenness(o, btn) { CRS.openness = o; _crsPill('crs-grp-open', btn); crsDone('step-2', _crsFabricLabel()); crsUpdatePanel(); }
function crsPickColor(c, btn) {
  CRS.color = c; _crsPill('crs-grp-color', btn); crsDone('step-2', _crsFabricLabel()); crsUpdatePanel();
  if (CRS.blackout || CRS.openness) setTimeout(function () { crsOpen('step-3'); }, 350);
}

// ── STEP 3: TOP OF THE SHADE ─────────────────────────────────
function _crsTopLabel() {
  var t = CRS.top === 'fascia' ? '4″ metal fascia' + (CRS.fasciaColor ? ' · ' + CRS.fasciaColor : '') + (CRS.endCaps ? ' · end caps' : '') : 'Open roll';
  return t + (CRS.roll === 'reverse' ? ' · reverse roll' : '');
}
function crsPickHeadrail(val) {
  CRS.top = val;
  _crsPill('crs-grp-headrail', _crsEl(val === 'fascia' ? 'hc-fascia' : 'hc-open'));
  var fo = _crsEl('fascia-opts'); if (fo) fo.classList.toggle('show', val === 'fascia');
  if (val !== 'fascia') { CRS.endCaps = false; _crsPill('crs-grp-endcaps', document.querySelector('#crs-grp-endcaps .opt-btn')); }
  crsDone('step-3', _crsTopLabel());
  crsUpdatePanel();
}
function crsPickFasciaColor(c, btn) { CRS.fasciaColor = c; _crsPill('crs-grp-fascia-color', btn); crsDone('step-3', _crsTopLabel()); crsUpdatePanel(); }
function crsPickEndCaps(on, btn) { CRS.endCaps = !!on; _crsPill('crs-grp-endcaps', btn); crsDone('step-3', _crsTopLabel()); crsUpdatePanel(); }
function crsPickRoll(r, btn) { CRS.roll = r; _crsPill('crs-grp-roll', btn); crsDone('step-3', _crsTopLabel()); crsUpdatePanel(); }

// ── STEP 4: OPERATION ────────────────────────────────────────
function _crsLiftLabel() {
  if (CRS.lift !== 'motorized') return 'Manual chain · ' + CRS.chainSide;
  if (CRS.brand === 'Lutron') return 'Motorized · Lutron (quoted by phone)';
  return 'Motorized' + (CRS.brand ? ' · ' + CRS.brand : '') + ' · ' + (CRS.power === 'hardwired' ? 'hardwired' : 'battery');
}
function crsPickLift(val) {
  CRS.lift = val;
  _crsPill('crs-grp-motor', _crsEl('motor-' + val));
  var mo = _crsEl('manual-opts'), mt = _crsEl('motor-opts');
  if (mo) mo.classList.toggle('show', val === 'manual');
  if (mt) mt.classList.toggle('show', val === 'motorized');
  crsDone('step-4', _crsLiftLabel());
  crsUpdatePanel();
}
function crsPickChain(side, btn) { CRS.chainSide = side; _crsPill('crs-grp-chain', btn); crsDone('step-4', _crsLiftLabel()); crsUpdatePanel(); }
function crsPickBrand(b, btn) {
  CRS.brand = b; _crsPill('crs-grp-brand', btn);
  var lut = b === 'Lutron';
  _crsShow('lutron-note', lut);
  _crsShow('motor-priced-opts', !lut);
  crsDone('step-4', _crsLiftLabel());
  crsUpdatePanel();
}
function crsPickPower(p, btn) { CRS.power = p; _crsPill('crs-grp-power', btn); crsDone('step-4', _crsLiftLabel()); crsUpdatePanel(); }
function crsPickRemote(r, btn) { CRS.remote = r; _crsPill('crs-grp-remote', btn); crsUpdatePanel(); }

// ── The order the engine prices ──────────────────────────────
function crsOrder() {
  var motor = CRS.lift === 'motorized';
  return {
    width: CRS.w, height: CRS.h, qty: CRS.qty,
    blackout: CRS.blackout, openness: CRS.blackout ? undefined : (CRS.openness || undefined), color: CRS.color || undefined,
    topTreatment: CRS.top, fasciaColor: CRS.top === 'fascia' ? (CRS.fasciaColor || undefined) : undefined,
    endCaps: CRS.top === 'fascia' && CRS.endCaps,
    lift: CRS.lift, chainSide: motor ? undefined : CRS.chainSide,
    brand: motor ? (CRS.brand || undefined) : undefined,
    power: motor ? CRS.power : undefined,
    remote: motor && CRS.remote ? CRS.remote : undefined,
    remoteQty: motor && CRS.remote ? _crsInt('crs-remote-qty', 1, 20) : undefined,
    chargers: motor ? _crsInt('crs-chargers', 0, 20) || undefined : undefined,
    hubs: motor ? _crsInt('crs-hubs', 0, 10) || undefined : undefined,
    repeaters: motor ? _crsInt('crs-repeaters', 0, 10) || undefined : undefined
  };
}
// { q, need[], issue, lutron }
function crsQuote() {
  var need = [];
  if (!(CRS.w > 0 && CRS.h > 0)) need.push('width and height');
  if (!CRS.blackout && !CRS.openness) need.push('an openness');
  if (!CRS.color) need.push('a fabric color');
  if (CRS.top === 'fascia' && !CRS.fasciaColor) need.push('a fascia color');
  if (CRS.lift === 'motorized' && !CRS.brand) need.push('a motor brand');
  var res = { q: null, need: need, issue: '', lutron: CRS.lift === 'motorized' && CRS.brand === 'Lutron', manual: false };
  if (!(CRS.w > 0 && CRS.h > 0) || res.lutron) return res;
  var q = BasicEngine.quote(crsOrder());
  if (q.errors) {
    var e = q.errors[0];
    res.manual = /^OFF_GRID/.test(e);
    res.issue = res.manual ? 'Past our price chart (120″ wide × 144″ tall) — we\'ll price this one by hand.' : e.replace(/^[A-Z_]+:\s*/, '');
    return res;
  }
  res.q = q;
  return res;
}

// ── PANEL ────────────────────────────────────────────────────
function _qrow(label, val) { return '<div class="summary-row"><span class="sr-key">' + label + '</span><span class="sr-val">' + val + '</span></div>'; }
function _prow(label, val, isNeg) {
  return '<div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:.5px solid rgba(255,255,255,.07)">' +
    '<span style="color:var(--text-muted)">' + label + '</span><span style="color:' + (isNeg ? '#f87171' : 'var(--cream)') + ';font-weight:500">' + val + '</span></div>';
}
function _crsAccessoryText() {
  if (CRS.lift !== 'motorized' || CRS.brand === 'Lutron') return '';
  var o = crsOrder(), p = [];
  if (o.remote) p.push(o.remoteQty + ' × ' + (o.remote === 'multi' ? '5-channel remote' : 'single-channel remote'));
  if (o.chargers) p.push(o.chargers + ' × charger');
  if (o.hubs) p.push(o.hubs + ' × hub');
  if (o.repeaters) p.push(o.repeaters + ' × repeater');
  return p.join(', ');
}
function crsUpdatePanel() {
  var rows = [
    ['Product', 'Basic Roller Shades'],
    ['Size', (CRS.w && CRS.h) ? CRS.w + '″ W × ' + CRS.h + '″ H' : '—'],
    ['Mount', CRS.mount === 'inside' ? 'Inside mount' : 'Outside mount'],
    ['Qty', CRS.qty + ' shade' + (CRS.qty === 1 ? '' : 's')],
    ['Fabric', _crsFabricLabel()],
    ['Top', _crsTopLabel()],
    ['Operation', _crsLiftLabel()]
  ];
  var acc = _crsAccessoryText();
  if (acc) rows.push(['Accessories', acc]);
  rows.push(['Delivery', typeof pbDeliveryLabel === 'function' ? pbDeliveryLabel() : 'Ship to me']);
  var rowsEl = _crsEl('qp-rows');
  if (rowsEl) rowsEl.innerHTML = rows.map(function (r) { return _qrow(r[0], r[1]); }).join('');

  var r = crsQuote();
  var pending = _crsEl('qp-pending'), divEl = _crsEl('qp-div'), noteEl = _crsEl('qp-note'), priceEl = _crsEl('qp-price');
  if (pending) pending.style.display = (CRS.w && CRS.h) ? 'none' : 'block';
  if (divEl) divEl.style.display = (CRS.w && CRS.h) ? '' : 'none';
  var note = '';
  if (r.lutron) note = 'Lutron is quoted by phone — send your request and Justin will call you with a price.';
  else if (r.issue) note = r.issue;
  if (noteEl) { noteEl.textContent = note; noteEl.style.display = note ? '' : 'none'; }
  if (!r.q) { if (priceEl) priceEl.style.display = 'none'; return; }
  var q = r.q, html = '';
  html += _prow('Retail', '$' + q.discountableRetail.toLocaleString(), false);
  html += _prow('Discount (25% off)', '−' + _crsMoney(q.clientDiscount), true);
  html += _prow('Your price', _crsMoney(q.clientSubtotal), false);
  html += _prow('Shipping', _crsMoney(q.freight), false);
  var pRows = _crsEl('qp-price-rows'); if (pRows) pRows.innerHTML = html;
  var totalEl = _crsEl('qp-total'); if (totalEl) totalEl.textContent = _crsMoney(q.clientTotal);
  if (priceEl) priceEl.style.display = '';
}

// Everything the customer chose, one row each — for the email and the cart.
function crsLines(r) {
  var o = crsOrder();
  var L = [
    { label: 'Product', value: 'Basic Roller Shades' },
    { label: 'Size', value: (CRS.w || '—') + '″ W × ' + (CRS.h || '—') + '″ H' },
    { label: 'Mount', value: CRS.mount === 'inside' ? 'Inside mount' : 'Outside mount' },
    { label: 'Quantity', value: String(CRS.qty) },
    { label: 'Fabric', value: CRS.blackout ? 'Blackout' : 'Solar Screen' + (CRS.openness ? ' ' + CRS.openness + ' openness' : '') },
    { label: 'Fabric color', value: CRS.color || '—' },
    { label: 'Top of shade', value: CRS.top === 'fascia' ? '4″ metal square fascia' : 'Open roll' },
    { label: 'Roll', value: CRS.roll === 'reverse' ? 'Reverse roll' : 'Regular roll' }
  ];
  if (CRS.top === 'fascia') { L.push({ label: 'Fascia color', value: CRS.fasciaColor || '—' }); L.push({ label: 'End caps', value: CRS.endCaps ? 'Yes' : 'No' }); }
  if (CRS.lift === 'motorized') {
    L.push({ label: 'Operation', value: 'Motorized' });
    L.push({ label: 'Motor brand', value: CRS.brand || '—' });
    if (CRS.brand !== 'Lutron') {
      L.push({ label: 'Power', value: CRS.power === 'hardwired' ? 'Hardwired' : 'Battery operated' });
      var acc = _crsAccessoryText(); L.push({ label: 'Accessories', value: acc || 'None' });
    }
  } else {
    L.push({ label: 'Operation', value: 'Manual chain (silver), ' + CRS.chainSide + ' side' });
  }
  L.push({ label: 'Warranty', value: 'None from Blindznation (sold as-is)' + (CRS.lift === 'motorized' ? '; motor: manufacturer warranty only' : '') });
  if (r && r.q) {
    var q = r.q;
    L.push({ label: '', value: 'PRICE' });
    L.push({ label: 'Retail', value: '$' + q.discountableRetail.toLocaleString() });
    L.push({ label: 'Discount 25%', value: '−' + _crsMoney(q.clientDiscount) });
    L.push({ label: 'Your price', value: _crsMoney(q.clientSubtotal) });
    L.push({ label: 'Shipping (' + q.freightTier + ')', value: _crsMoney(q.freight) });
    L.push({ label: 'Total', value: _crsMoney(q.clientTotal) });
  } else if (r && r.lutron) {
    L.push({ label: 'Price', value: 'Lutron — call the customer to quote' });
  } else if (r && r.issue) {
    L.push({ label: 'Price', value: r.issue });
  }
  return L;
}

// ── CART + SUBMIT ────────────────────────────────────────────
function addCustomRollerToCart() {
  var r = crsQuote();
  if (r.lutron) { alert('Lutron is quoted by phone — please use "Submit Order for Review" and Justin will call you.'); return; }
  if (r.need.length) { alert('Please choose ' + r.need.join(', ') + ' first.'); return; }
  if (r.issue && !r.manual) { alert(r.issue); return; }
  var lines = crsLines(r);
  // price = the whole order (all shades + shipping), so qty stays 1 — the cart multiplies price × qty.
  pbAddToCart({ product: 'Basic Roller Shades', lines: lines, specs: lines.map(function (l) { return (l.label ? l.label + ': ' : '') + l.value; }).join(' | '),
                price: r.q ? r.q.clientTotal : 0, qty: 1 });
  pbOpenCart();
}
function crsSubmit() {
  var name = ((_crsEl('cf-name') || {}).value || '').trim();
  var email = ((_crsEl('cf-email') || {}).value || '').trim();
  var phone = ((_crsEl('cf-phone') || {}).value || '').trim();
  var notes = ((_crsEl('cf-notes') || {}).value || '').trim();
  var hp = ((_crsEl('q-hp') || _crsEl('pb-hp') || {}).value || '');
  if (!name) { alert('Please enter your name.'); return; }
  if (!_pbValidEmail(email)) { alert('Please enter a valid email address.'); return; }
  if (hp) return;   // honeypot filled — a bot
  var r = crsQuote();
  if (r.need.length && !r.lutron) { alert('Please choose ' + r.need.join(', ') + ' first.'); return; }
  var btn = _crsEl('submit-btn') || document.querySelector('#pb-final-step [data-pb-require-contact]');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  var lines = crsLines(r);
  // Shared sender (js/shared.js): _t, every option row, notes, attached files → justin@blindznation.com
  pbSendOrder({ name: name, email: email, phone: phone, product: 'Basic Roller Shades' + (r.lutron ? ' (Lutron — call to quote)' : ''),
                lines: lines, notes: notes, estimate: r.q ? _crsMoney(r.q.clientTotal) + ' (estimate only)' : null })
    .then(function () {
      var form = _crsEl('pb-final-step'), sbox = _crsEl('success-box'), sw = _crsEl('submit-wrap');
      if (form) form.style.display = 'none';
      if (sw) sw.style.display = 'none';
      if (sbox) sbox.style.display = 'block';
      crsDone('step-7', name);
    })
    .catch(function () {
      if (btn) { btn.disabled = false; btn.textContent = 'Submit Order for Review →'; }
      _pbShowSendFailure(_pbMailtoFor('Basic Roller Shades', name, 'Name: ' + name + '\nEmail: ' + email + (phone ? '\nPhone: ' + phone : '') + '\n\n' +
        lines.map(function (l) { return (l.label ? l.label + ': ' : '') + l.value; }).join('\n') + (notes ? '\n\nNotes: ' + notes : '')), btn);
    });
}

// ── INIT ─────────────────────────────────────────────────────
(function () {
  if (!window.BasicEngine) return;
  _crsRenderColors();
  var p = new URLSearchParams(window.location.search);
  var w = p.get('w'), h = p.get('h'), qty = p.get('qty');
  if (w) { var we = _crsEl('crs-inp-w'); if (we) we.value = w; }
  if (h) { var he = _crsEl('crs-inp-h'); if (he) he.value = h; }
  if (qty) { var qe = _crsEl('qty-num'); if (qe) qe.value = qty; CRS.qty = _crsInt('qty-num', 1, 20); }
  if (w || h) crsDimChanged(); else crsUpdatePanel();
})();
