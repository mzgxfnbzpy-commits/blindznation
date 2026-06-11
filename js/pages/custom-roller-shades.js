// Custom Roller Shades — configurator logic
// All steps visible; each auto-advances to the next on selection.
// No pricing shown anywhere — collects specs → POST /api/quote.

var CRS = {
  type: '', openness: '',
  mount: '',
  headrail: '',
  w: 0, h: 0,
  fabric: '',
  motor: '',
  qty: 1,
  delivery: ''
};

var _crsLoadTime = Date.now();
var _crsDimTimer, _crsQtyTimer;

function _crsEl(id) { return document.getElementById(id); }

// ── STEP CONTROL ─────────────────────────────────────────────
function crsToggle(id) {
  var el = _crsEl(id);
  if (!el) return;
  el.classList.toggle('open');
  el.classList.toggle('active');
}

function crsOpen(id) {
  var el = _crsEl(id);
  if (!el || el.classList.contains('active')) return;
  el.classList.add('active');
  setTimeout(function() {
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

// ── STEP 1: SHADE TYPE ───────────────────────────────────────
function crsPickType(val, label) {
  CRS.type = val;
  CRS.color = '';
  document.querySelectorAll('.type-card').forEach(function(c) { c.classList.remove('sel'); });
  var card = _crsEl('tc-' + val);
  if (card) card.classList.add('sel');

  var solarOpts = _crsEl('solar-opts');
  var colorOpts = _crsEl('color-opts');
  if (solarOpts) solarOpts.classList.toggle('show', val === 'solar');
  // Blackout shows color immediately; solar shows color after openness picked
  if (colorOpts) colorOpts.classList.toggle('show', val === 'blackout');

  // Reset color selection
  document.querySelectorAll('#crs-grp-color .opt-btn').forEach(function(b) { b.classList.remove('sel'); });

  if (val === 'solar') return; // wait for openness + color before advancing
  // Blackout: wait for color pick before advancing
}

function crsPickOpenness(val, label) {
  CRS.openness = val;
  document.querySelectorAll('.openness-btn').forEach(function(b) { b.classList.remove('sel'); });
  var btn = _crsEl('ob-' + val);
  if (btn) btn.classList.add('sel');
  // Show color options after openness selected
  var colorOpts = _crsEl('color-opts');
  if (colorOpts) colorOpts.classList.add('show');
  setTimeout(function() { if (colorOpts) colorOpts.scrollIntoView({ behavior: 'smooth', block: 'nearest' }); }, 100);
}

function crsPickColor(btn, color) {
  CRS.color = color;
  document.querySelectorAll('#crs-grp-color .opt-btn').forEach(function(b) { b.classList.remove('sel'); });
  btn.classList.add('sel');
  var label = CRS.type === 'solar'
    ? 'Solar · ' + CRS.openness + '% · ' + color
    : 'Blackout · ' + color;
  crsDone('step-1', label);
  crsUpdatePanel();
  setTimeout(function() { crsOpen('step-2'); }, 350);
}

// ── STEP 2: MOUNT ────────────────────────────────────────────
function crsPickMount(val, label) {
  CRS.mount = val;
  document.querySelectorAll('#step-2 .opt-card').forEach(function(c) { c.classList.remove('sel'); });
  var card = _crsEl('mc-' + val);
  if (card) card.classList.add('sel');

  var noteIM = _crsEl('mount-note-im');
  var noteOM = _crsEl('mount-note-om');
  if (noteIM) noteIM.classList.toggle('show', val === 'inside');
  if (noteOM) noteOM.classList.toggle('show', val === 'outside');

  // Refresh dim info if dims already entered
  var w = parseFloat((_crsEl('crs-inp-w') || {}).value) || 0;
  var h = parseFloat((_crsEl('crs-inp-h') || {}).value) || 0;
  if (w && h) crsDimChanged();

  crsDone('step-2', label);
  crsUpdatePanel();
  setTimeout(function() { crsOpen('step-3'); }, 350);
}

// ── STEP 3: HEADRAIL ─────────────────────────────────────────
function crsPickHeadrail(val, label) {
  CRS.headrail = val;
  document.querySelectorAll('#step-3 .opt-card:not(.disabled)').forEach(function(c) { c.classList.remove('sel'); });
  var card = _crsEl('hc-' + val);
  if (card && !card.classList.contains('disabled')) card.classList.add('sel');
  crsDone('step-3', label);
  crsUpdatePanel();
  setTimeout(function() { crsOpen('step-4'); }, 350);
}

// ── STEP 4: DIMENSIONS ───────────────────────────────────────
function crsDimChanged() {
  var w = parseFloat((_crsEl('crs-inp-w') || {}).value) || 0;
  var h = parseFloat((_crsEl('crs-inp-h') || {}).value) || 0;
  var warnEl = _crsEl('dim-warn');
  var infoEl = _crsEl('dim-info');

  if (!w && !h) {
    warnEl.classList.remove('show');
    infoEl.classList.remove('show');
    return;
  }

  var errs = [];
  if (w && (w < 12 || w > 144)) errs.push('Width must be 12–144"');
  if (h && (h < 12 || h > 132)) errs.push('Height must be 12–132"');

  if (errs.length) {
    warnEl.textContent = errs.join(' · ');
    warnEl.classList.add('show');
    infoEl.classList.remove('show');
    return;
  }

  warnEl.classList.remove('show');

  var infoLines = [];
  if (CRS.mount === 'inside') {
    var dedW = Math.round((w - 0.25) * 1000) / 1000;
    infoLines.push('Inside mount: we\'ll cut width to ' + dedW + '" for proper fit.');
  }
  if (CRS.type === 'exterior') {
    infoLines.push('Exterior: allow 2–4" overlap on each side for full coverage and wind resistance.');
  }
  if (infoLines.length) {
    infoEl.textContent = infoLines.join(' ');
    infoEl.classList.add('show');
  } else {
    infoEl.classList.remove('show');
  }

  if (w > 0 && h > 0) {
    CRS.w = w; CRS.h = h;
    crsDone('step-4', w + '" × ' + h + '"');
    crsUpdatePanel();
    clearTimeout(_crsDimTimer);
    _crsDimTimer = setTimeout(function() { crsOpen('step-5'); }, 900);
  }
}

// ── STEP 5: FABRIC ───────────────────────────────────────────
function crsPickFabric(val, label) {
  CRS.fabric = val;
  document.querySelectorAll('.fabric-card').forEach(function(c) { c.classList.remove('sel'); });
  var card = _crsEl('fc-' + val);
  if (card) card.classList.add('sel');
  var note = _crsEl('cust-fabric-note');
  if (note) note.classList.toggle('show', val === 'customer');
  crsDone('step-5', label);
  crsUpdatePanel();
  setTimeout(function() { crsOpen('step-6'); }, 350);
}

// ── STEP 6: MOTORIZATION ─────────────────────────────────────
function crsPickMotor(val, label) {
  CRS.motor = val;
  document.querySelectorAll('#step-6 .opt-card').forEach(function(c) { c.classList.remove('sel'); });
  var card = _crsEl('motor-' + val);
  if (card) card.classList.add('sel');
  crsDone('step-6', label);
  crsUpdatePanel();
  setTimeout(function() { crsOpen('step-7'); }, 350);
}

// ── STEP 7: QUANTITY ─────────────────────────────────────────
function crsAdjQty(d) {
  CRS.qty = Math.max(1, Math.min(20, CRS.qty + d));
  var el = _crsEl('qty-num');
  if (el) el.value = CRS.qty;
  crsDone('step-7', CRS.qty + (CRS.qty === 1 ? ' shade' : ' shades'));
  crsUpdatePanel();
  clearTimeout(_crsQtyTimer);
  _crsQtyTimer = setTimeout(function() { crsOpen('step-8'); }, 500);
}

function crsQtyInput() {
  var v = parseInt((_crsEl('qty-num') || {}).value) || 1;
  CRS.qty = Math.max(1, Math.min(20, v));
  crsDone('step-7', CRS.qty + (CRS.qty === 1 ? ' shade' : ' shades'));
  crsUpdatePanel();
  clearTimeout(_crsQtyTimer);
  _crsQtyTimer = setTimeout(function() { crsOpen('step-8'); }, 700);
}

// ── STEP 8: DELIVERY ─────────────────────────────────────────
function crsPickDelivery(val) {
  CRS.delivery = val;
  document.querySelectorAll('.delivery-opt').forEach(function(o) { o.classList.remove('sel'); });
  var opt = _crsEl('del-' + val);
  if (opt) opt.classList.add('sel');
  crsDone('step-8', val === 'ship' ? 'Ship (UPS/FedEx)' : 'Pickup — Huntingdon Valley');
  crsUpdatePanel();
  setTimeout(function() { crsOpen('step-9'); }, 350);
}

// ── PANEL SUMMARY ────────────────────────────────────────────
function crsUpdatePanel() {
  var rows = [];
  if (CRS.type) {
    var tl = CRS.type === 'solar' ? 'Solar Screen' : 'Blackout';
    if (CRS.type === 'solar' && CRS.openness) tl += ' · ' + CRS.openness + '%';
    if (CRS.color) tl += ' · ' + CRS.color;
    rows.push(['Type', tl]);
  }
  if (CRS.mount) rows.push(['Mount', CRS.mount === 'inside' ? 'Inside' : 'Outside']);
  if (CRS.headrail) {
    var hMap = { open: 'Open roll', cassette: 'Cassette', fascia: 'Fascia', valance: 'Wood valance box' };
    rows.push(['Headrail', hMap[CRS.headrail] || CRS.headrail]);
  }
  var w = parseFloat((_crsEl('crs-inp-w') || {}).value) || 0;
  var h = parseFloat((_crsEl('crs-inp-h') || {}).value) || 0;
  if (w && h) rows.push(['Size', w + '" W × ' + h + '" H']);
  if (CRS.fabric) {
    var fMap = { we: 'We supply', customer: 'Customer supplies', consult: 'Consult' };
    rows.push(['Fabric', fMap[CRS.fabric] || CRS.fabric]);
  }
  if (CRS.motor) {
    var mMap = { cord: 'Manual cord', cordless: 'Cordless', lutron: 'Lutron Serena', somfy: 'Somfy', rollease: 'Rollease Acmeda', other: 'Other (see notes)' };
    rows.push(['Operation', mMap[CRS.motor] || CRS.motor]);
  }
  if (CRS.qty > 1) rows.push(['Quantity', CRS.qty + ' shades']);
  if (CRS.delivery) rows.push(['Delivery', CRS.delivery === 'ship' ? 'Ship' : 'Pickup']);

  var pending  = _crsEl('qp-pending');
  var rowsEl   = _crsEl('qp-rows');
  var divEl    = _crsEl('qp-div');
  var noteEl   = _crsEl('qp-note');

  if (!rows.length) {
    if (pending) pending.style.display = 'block';
    if (rowsEl)  rowsEl.innerHTML = '';
    if (divEl)   divEl.style.display = 'none';
    if (noteEl)  noteEl.style.display = 'none';
    return;
  }

  if (pending) pending.style.display = 'none';
  if (rowsEl) {
    rowsEl.innerHTML = rows.map(function(r) {
      return '<div class="qrow"><span class="qrow-label">' + r[0] + '</span><span class="qrow-val">' + r[1] + '</span></div>';
    }).join('');
  }
  if (divEl)  divEl.style.display = '';
  if (noteEl) noteEl.style.display = '';
}

// ── SUBMIT ───────────────────────────────────────────────────
function crsSubmit() {
  var name  = ((_crsEl('q-name')  || {}).value || '').trim();
  var email = ((_crsEl('q-email') || {}).value || '').trim();
  var phone = ((_crsEl('q-phone') || {}).value || '').trim();
  var notes = ((_crsEl('q-notes') || {}).value || '').trim();
  var hp    = ((_crsEl('q-hp')    || {}).value || '');

  if (!name)              { alert('Please enter your name.'); return; }
  if (!email && !phone)   { alert('Please enter an email address or phone number.'); return; }

  var typeMap = { lf: 'Light Filtering', rd: 'Blackout', bk: 'Blackout', solar: 'Solar Screening', exterior: 'Exterior Roller (outdoor)' };
  var hMap    = { open: 'Open roll (no valance)', cassette: 'Cassette headrail', fascia: 'Fascia valance', valance: 'Wood valance box' };
  var mMap    = { cord: 'Manual — continuous cord loop', cordless: 'Manual — cordless lift', lutron: 'Motorized — Lutron Serena', somfy: 'Motorized — Somfy', rollease: 'Motorized — Rollease Acmeda / Automate', other: 'Other / not sure — see notes' };
  var fMap    = { we: 'We supply the fabric', customer: 'Customer supplies fabric (ships to shop — do NOT ship until confirmed)', consult: 'Consult — fabric TBD' };

  var selections = [];
  if (CRS.type) {
    var tl = typeMap[CRS.type] || CRS.type;
    if (CRS.type === 'solar' && CRS.openness) tl += ' · ' + CRS.openness + '% openness factor';
    selections.push({ label: 'Shade type', value: tl });
  }
  if (CRS.mount)    selections.push({ label: 'Mount', value: CRS.mount === 'inside' ? 'Inside mount' : 'Outside mount' });
  if (CRS.headrail) selections.push({ label: 'Headrail / valance', value: hMap[CRS.headrail] || CRS.headrail });

  var w = parseFloat((_crsEl('crs-inp-w') || {}).value) || 0;
  var h = parseFloat((_crsEl('crs-inp-h') || {}).value) || 0;
  if (w) selections.push({ label: 'Width', value: w + '"' + (CRS.mount === 'inside' ? ' (frame — we deduct ¼" for fit)' : '') });
  if (h) selections.push({ label: 'Height', value: h + '"' });

  if (CRS.fabric) selections.push({ label: 'Fabric', value: fMap[CRS.fabric] || CRS.fabric });
  if (CRS.motor)  selections.push({ label: 'Operation', value: mMap[CRS.motor]  || CRS.motor  });
  selections.push({ label: 'Quantity', value: CRS.qty + ' shade' + (CRS.qty === 1 ? '' : 's') });
  if (CRS.delivery) selections.push({ label: 'Delivery', value: CRS.delivery === 'ship' ? 'Ship via UPS/FedEx' : 'Pickup — Huntingdon Valley, PA' });

  var btn = _crsEl('submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

  fetch('/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name, email: email, phone: phone,
      product: 'Custom Roller Shades',
      notes: notes,
      selections: selections,
      sourceUrl: window.location.href,
      _hp: hp,
      _t: Date.now() - _crsLoadTime
    })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    if (data.ok) {
      var form = _crsEl('contact-form');
      var sbox = _crsEl('success-box');
      var sw   = _crsEl('submit-wrap');
      if (form) form.style.display = 'none';
      if (sw)   sw.style.display   = 'none';
      if (sbox) sbox.style.display = 'block';
      crsDone('step-9', name);
    } else {
      if (btn) { btn.disabled = false; btn.textContent = 'Submit Order for Review'; }
      alert(data.error || 'Something went wrong. Please call (609) 742-1720.');
    }
  })
  .catch(function() {
    if (btn) { btn.disabled = false; btn.textContent = 'Submit Order for Review'; }
    // Mailto fallback
    var lines = ['Custom Roller Shades Order'];
    selections.forEach(function(s) { lines.push(s.label + ': ' + s.value); });
    if (notes) lines.push('Notes: ' + notes);
    lines.push('Name: ' + name);
    if (email) lines.push('Email: ' + email);
    if (phone) lines.push('Phone: ' + phone);
    window.location.href = 'mailto:justin@blindznation.com?subject=' + encodeURIComponent('Custom Roller Quote — ' + name) + '&body=' + encodeURIComponent(lines.join('\n'));
  });
}

// Init
crsUpdatePanel();
