// Custom Roller Shades — configurator logic

var CRS = {
  type: '', openness: '', color: '',
  mount: '',
  headrail: '', hwColor: '',
  w: 0, h: 0,
  fabric: '',
  motor: '',
  qty: 1,
  delivery: ''
};

// ── PRICING TABLES ────────────────────────────────────────────
// Source: Norman Price Group 1 Solar retail chart
var _CRS_W = [24,30,36,42,48,54,60,66,72,78,84,90,96,108,120];
var _CRS_H = [36,48,60,72,84,96,108,120,132,144];
var _CRS_GRID = [
  [240,258,278,296,314,331,362,382,406,450,474,507,533,577,628],
  [259,282,302,325,350,372,412,439,468,519,545,587,614,671,723],
  [281,302,326,357,390,421,467,497,535,586,618,666,692,745,795],
  [297,325,359,397,430,468,522,558,595,650,677,721,749,809,870],
  [318,354,394,434,474,513,573,614,645,697,745,776,809,874,941],
  [336,383,428,471,518,563,618,656,690,745,797,831,870,941,1015],
  [361,411,461,511,558,600,659,697,737,795,850,890,932,1007,1088],
  [387,440,495,546,597,635,697,739,780,844,903,949,990,1078,1160],
  [408,470,526,582,627,670,737,780,826,894,956,1002,1049,1141,1235],
  [434,498,561,609,659,703,777,823,872,940,1010,1061,1111,1206,1309]
];
// Fascia surcharge by width bracket
var _CRS_FASCIA_W = [24,30,36,42,48,54,60,66,72,78,84,90,96,108,120,132,144];
var _CRS_FASCIA_P = [117,122,133,139,150,161,171,188,204,216,232,249,265,293,326,349,375];

function _crsPriceLookup(w, h) {
  // Round up to nearest bracket; use minimum bracket if below minimum
  var wi = _CRS_W.length - 1, hi = _CRS_H.length - 1;
  for (var i = 0; i < _CRS_W.length; i++) { if (w <= _CRS_W[i]) { wi = i; break; } }
  for (var j = 0; j < _CRS_H.length; j++) { if (h <= _CRS_H[j]) { hi = j; break; } }
  if (w > _CRS_W[_CRS_W.length-1] || h > _CRS_H[_CRS_H.length-1]) return null;
  return _CRS_GRID[hi][wi];
}

function _crsFasciaLookup(w) {
  for (var i = 0; i < _CRS_FASCIA_W.length; i++) {
    if (w <= _CRS_FASCIA_W[i]) return _CRS_FASCIA_P[i];
  }
  return null;
}

function crsCalcPricing() {
  if (!CRS.w || !CRS.h) return null;
  var baseRetail = _crsPriceLookup(CRS.w, CRS.h);
  if (baseRetail === null) return null;
  var fasciaAdj = 0;
  if (CRS.headrail === 'fascia') {
    fasciaAdj = _crsFasciaLookup(CRS.w) || 0;
  }
  var retail = baseRetail + fasciaAdj;
  if (CRS.type === 'blackout') retail = Math.round(retail * 1.20);
  var discount = Math.round(retail * 0.35);
  var yourPrice = retail - discount;
  var isOversized = CRS.w >= 90;
  var freight = isOversized
    ? (80 + Math.max(0, CRS.qty - 1) * 50)
    : (25 + Math.max(0, CRS.qty - 1) * 11);
  var shadeTotal = yourPrice * CRS.qty;
  return { retail: retail, discount: discount, yourPrice: yourPrice, fasciaAdj: fasciaAdj, freight: freight, shadeTotal: shadeTotal, grandTotal: shadeTotal + freight };
}

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

// ── STEP 3: SHADE TYPE ───────────────────────────────────────
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
  if (window.pbFabricPicker) pbFabricPicker.clearSelection('crs-fabric-picker');

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

// Expanded basic solids — same palette for Solar Screen & Blackout lines.
var CRS_BASIC_SOLIDS = [
  {n:'White',     hex:'#ffffff'}, {n:'Ivory',    hex:'#f5efe0'}, {n:'Cream',   hex:'#f3e9d2'},
  {n:'Beige',     hex:'#e8dcc4'}, {n:'Sand',     hex:'#ddcba6'}, {n:'Taupe',   hex:'#b8a98f'},
  {n:'Linen',     hex:'#d9cbb2'}, {n:'Gray',     hex:'#9e9e9e'}, {n:'Slate',   hex:'#6e7377'},
  {n:'Charcoal',  hex:'#4a4a4a'}, {n:'Black',    hex:'#1a1a1a'}, {n:'Chocolate',hex:'#4b3a2b'},
  {n:'Navy',      hex:'#24324a'}
];

// Render the shared fabric picker into the color step (single type → no tabs here;
// Solar vs Blackout is the type-card choice above, openness handled separately).
function crsRenderColors() {
  if (!window.pbFabricPicker) return;
  pbFabricPicker.render('crs-fabric-picker', {
    hideTabs: true,
    types: [{ key: 'solids', label: 'Colors' }],
    collections: [{ type: 'solids', name: '', colors: CRS_BASIC_SOLIDS }],
    onSelect: function(sel) { crsSelectColor(sel.name); }
  });
}

function crsSelectColor(color) {
  CRS.color = color;
  var label = CRS.type === 'solar'
    ? 'Solar · ' + CRS.openness + '% · ' + color
    : 'Blackout · ' + color;
  crsDone('step-2', label);
  crsUpdatePanel();
  setTimeout(function() { crsOpen('step-3'); }, 350);
}

// ── STEP 1: MOUNT ────────────────────────────────────────────
function crsPickMount(val, label) {
  CRS.mount = val;
  document.querySelectorAll('#crs-grp-mount .opt-btn').forEach(function(c) { c.classList.remove('sel'); });
  var card = _crsEl('mc-' + val);
  if (card) card.classList.add('sel');

  var noteIM = _crsEl('mount-note-im');
  var noteOM = _crsEl('mount-note-om');
  if (noteIM) noteIM.classList.toggle('show', val === 'inside');
  if (noteOM) noteOM.classList.toggle('show', val === 'outside');

  // Mount, dimensions & quantity all live in Step 1 — advancing is owned by crsDimChanged()
  var w = parseFloat((_crsEl('crs-inp-w') || {}).value) || 0;
  var h = parseFloat((_crsEl('crs-inp-h') || {}).value) || 0;
  if (w && h) crsDimChanged();
  crsUpdatePanel();
}

// ── STEP 4: HEADRAIL ─────────────────────────────────────────
function crsPickHeadrail(val, label) {
  CRS.headrail = val;
  CRS.hwColor = '';
  document.querySelectorAll('#crs-grp-headrail .opt-btn:not(.disabled)').forEach(function(c) { c.classList.remove('sel'); });
  var card = _crsEl('hc-' + val);
  if (card && !card.classList.contains('disabled')) card.classList.add('sel');
  // Show hardware color picker; update label for fascia
  var hwSection = _crsEl('hw-color-section');
  var hwLabel = _crsEl('hw-color-label');
  if (hwSection) hwSection.style.display = '';
  if (hwLabel) hwLabel.textContent = val === 'fascia' ? 'Hardware & fascia color' : 'Hardware color';
  document.querySelectorAll('#crs-grp-hw-color .opt-btn').forEach(function(b) { b.classList.remove('sel'); });
  crsDone('step-3', label);
  crsUpdatePanel();
  setTimeout(function() { crsOpen('step-4'); }, 350);
}

function crsPickHwColor(btn, color) {
  CRS.hwColor = color;
  document.querySelectorAll('#crs-grp-hw-color .opt-btn').forEach(function(b) { b.classList.remove('sel'); });
  btn.classList.add('sel');
  crsUpdatePanel();
}

// ── STEP 2: DIMENSIONS ───────────────────────────────────────
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
  if (h && (h < 12 || h > 144)) errs.push('Height must be 12–144"');

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
    var ml = CRS.mount === 'inside' ? 'Inside · ' : CRS.mount === 'outside' ? 'Outside · ' : '';
    crsDone('step-1', ml + w + '" × ' + h + '"');
    crsUpdatePanel();
    clearTimeout(_crsDimTimer);
    _crsDimTimer = setTimeout(function() { crsOpen('step-2'); }, 900);
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
  crsDone('step-4', label);
  crsUpdatePanel();
  setTimeout(function() { crsOpen('step-5'); }, 350);
}

// ── STEP 6: OPERATION ────────────────────────────────────────
function crsPickMotor(val, label) {
  CRS.motor = val;
  // Clear top-level cards only
  document.querySelectorAll('#crs-grp-motor .opt-btn').forEach(function(c) { c.classList.remove('sel'); });
  var card = _crsEl('motor-' + val);
  if (card) card.classList.add('sel');

  // Show/hide sub-sections
  var cordlessRedir = _crsEl('cordless-redirect');
  var motorSub = _crsEl('motor-subopts');
  var solunaRedir = _crsEl('motor-soluna-redirect');
  if (cordlessRedir) cordlessRedir.style.display = val === 'cordless' ? 'block' : 'none';
  if (motorSub) motorSub.style.display = val === 'motorized' ? 'block' : 'none';
  if (solunaRedir) solunaRedir.style.display = 'none';

  // Clear sub-option selections when switching away from motorized
  document.querySelectorAll('#motor-subopts .opt-btn').forEach(function(c) { c.classList.remove('sel'); });

  if (val !== 'motorized') {
    crsDone('step-5', label);
    crsUpdatePanel();
    if (val === 'cord') {
      setTimeout(function() { crsOpen('step-6'); }, 350);
    }
  } else {
    crsUpdatePanel(); // show panel in pending state
  }
}

function crsPickMotorSub(val, label) {
  CRS.motor = val;
  document.querySelectorAll('#motor-subopts .opt-btn').forEach(function(c) { c.classList.remove('sel'); });
  var idMap = { 'norman-motor': 'msub-norman', 'rollease-motor': 'msub-rollease', lutron: 'msub-lutron', somfy: 'msub-somfy', other: 'msub-other' };
  var card = _crsEl(idMap[val]);
  if (card) card.classList.add('sel');

  var solunaRedir = _crsEl('motor-soluna-redirect');
  var isNormanOrRollease = val === 'norman-motor' || val === 'rollease-motor';
  if (solunaRedir) solunaRedir.style.display = isNormanOrRollease ? 'block' : 'none';

  crsDone('step-5', 'Motorized — ' + label);
  crsUpdatePanel();
  if (!isNormanOrRollease) {
    setTimeout(function() { crsOpen('step-6'); }, 350);
  }
}

// ── STEP 1: QUANTITY (lives in the combined first step) ──────
function crsAdjQty(d) {
  CRS.qty = Math.max(1, Math.min(20, CRS.qty + d));
  var el = _crsEl('qty-num');
  if (el) el.value = CRS.qty;
  crsUpdatePanel();
}

function crsQtyInput() {
  var v = parseInt((_crsEl('qty-num') || {}).value) || 1;
  CRS.qty = Math.max(1, Math.min(20, v));
  crsUpdatePanel();
}

// ── STEP 6: DELIVERY ─────────────────────────────────────────
function crsPickDelivery(val) {
  CRS.delivery = val;
  document.querySelectorAll('.delivery-opt').forEach(function(o) { o.classList.remove('sel'); });
  var opt = _crsEl('del-' + val);
  if (opt) opt.classList.add('sel');
  crsDone('step-6', val === 'ship' ? 'Ship (UPS/FedEx)' : 'Pickup — Huntingdon Valley');
  crsUpdatePanel();
  setTimeout(function() { crsOpen('step-7'); }, 350);
}

// ── PANEL SUMMARY ────────────────────────────────────────────
function _qrow(label, val) {
  return '<div class="qrow"><span class="qrow-label">' + label + '</span><span class="qrow-val">' + val + '</span></div>';
}
function _prow(label, val, isNeg) {
  return '<div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:.5px solid rgba(255,255,255,.07)">' +
    '<span style="color:var(--text-muted)">' + label + '</span>' +
    '<span style="color:' + (isNeg ? '#f87171' : 'var(--cream)') + ';font-weight:500">' + val + '</span></div>';
}

function crsUpdatePanel() {
  var rows = [];
  if (CRS.type) {
    var tl = CRS.type === 'solar' ? 'Solar ' + (CRS.openness ? CRS.openness + '%' : 'Screen') : 'Blackout';
    if (CRS.color) tl += ' · ' + CRS.color;
    rows.push(['Type', tl]);
  }
  if (CRS.mount) rows.push(['Mount', CRS.mount === 'inside' ? 'Inside' : 'Outside']);
  if (CRS.headrail) {
    var hMap = { open: 'Open roll', fascia: 'Metal fascia' };
    var hw = hMap[CRS.headrail] || CRS.headrail;
    if (CRS.hwColor) hw += ' · ' + CRS.hwColor;
    rows.push(['Headrail', hw]);
  }
  var w = parseFloat((_crsEl('crs-inp-w') || {}).value) || 0;
  var h = parseFloat((_crsEl('crs-inp-h') || {}).value) || 0;
  if (w && h) rows.push(['Size', w + '" W × ' + h + '" H']);
  if (CRS.fabric) {
    var fMap = { we: 'We supply', customer: 'Customer supplies', consult: 'Consult' };
    rows.push(['Fabric', fMap[CRS.fabric] || CRS.fabric]);
  }
  if (CRS.motor) {
    var mMap = { cord: 'Manual chain', cordless: 'Cordless → Norman Soluna', motorized: 'Motorized (selecting brand…)', 'norman-motor': 'Motorized — Norman Smart', 'rollease-motor': 'Motorized — Rollease Automate', lutron: 'Motorized — Lutron', somfy: 'Motorized — Somfy', other: 'Motorized — Other' };
    rows.push(['Operation', mMap[CRS.motor] || CRS.motor]);
  }
  if (CRS.qty > 1) rows.push(['Quantity', CRS.qty + ' shades']);
  if (CRS.delivery) rows.push(['Delivery', 'Ship']);

  var pending = _crsEl('qp-pending');
  var rowsEl  = _crsEl('qp-rows');
  var divEl   = _crsEl('qp-div');
  var noteEl  = _crsEl('qp-note');
  var priceEl = _crsEl('qp-price');

  if (!rows.length) {
    if (pending) pending.style.display = 'block';
    if (rowsEl)  rowsEl.innerHTML = '';
    if (divEl)   divEl.style.display = 'none';
    if (noteEl)  noteEl.style.display = 'none';
    if (priceEl) priceEl.style.display = 'none';
    return;
  }

  if (pending) pending.style.display = 'none';
  if (rowsEl)  rowsEl.innerHTML = rows.map(function(r) { return _qrow(r[0], r[1]); }).join('');
  if (divEl)   divEl.style.display = '';
  if (noteEl)  noteEl.style.display = '';

  // Price breakdown
  var isCustomQuote = CRS.motor === 'lutron' || CRS.motor === 'somfy' || CRS.motor === 'other';
  var isCustomFabric = CRS.fabric === 'customer';
  var isRedirect = CRS.motor === 'cordless' || CRS.motor === 'norman-motor' || CRS.motor === 'rollease-motor';
  var isPending = CRS.motor === 'motorized';
  if (isCustomFabric) {
    if (priceEl) priceEl.style.display = 'none';
    if (noteEl) {
      noteEl.textContent = 'Customer-supplied fabric pricing is custom — submit your specs and Justin will send you a quote.';
      noteEl.style.display = '';
    }
  } else if (isCustomQuote) {
    if (priceEl) priceEl.style.display = 'none';
    if (noteEl) {
      noteEl.textContent = 'Motorized pricing is custom — fill out your specs and submit. Justin will send you a personalized quote.';
      noteEl.style.display = '';
    }
  } else if (isRedirect || isPending) {
    if (priceEl) priceEl.style.display = 'none';
    if (noteEl) noteEl.style.display = 'none';
  } else {
    var p = (CRS.w && CRS.h) ? crsCalcPricing() : null;
    if (p && priceEl) {
      var pRowsEl = _crsEl('qp-price-rows');
      if (pRowsEl) {
        var html = _prow('Retail price' + (CRS.qty > 1 ? ' (per shade)' : ''), '$' + p.retail.toLocaleString(), false);
        html += _prow('Blindznation discount (35%)', '−$' + p.discount.toLocaleString(), true);
        html += _prow('Your price' + (CRS.qty > 1 ? ' × ' + CRS.qty : ''), '$' + p.shadeTotal.toLocaleString(), false);
        html += _prow('Shipping', '$' + p.freight.toLocaleString(), false);
        pRowsEl.innerHTML = html;
      }
      var totalEl = _crsEl('qp-total');
      if (totalEl) totalEl.textContent = '$' + p.grandTotal.toLocaleString();
      priceEl.style.display = '';
      if (noteEl) noteEl.style.display = 'none';
    } else if (priceEl) {
      priceEl.style.display = 'none';
      if (noteEl) noteEl.style.display = '';
    }
  }
}

// ── SUBMIT ───────────────────────────────────────────────────
function addCustomRollerToCart(){
  if(!CRS.mount){ alert('Please select a mount type before adding to cart.'); return; }
  if(!CRS.w||!CRS.h){ alert('Please enter valid dimensions before adding to cart.'); return; }

  var totalEl=document.getElementById('qp-total');
  var priceText=totalEl?totalEl.textContent.trim():'';
  var price=priceText&&priceText!=='—'?parseFloat(priceText.replace(/[^0-9.]/g,''))||null:null;

  var typeMap={lf:'Light Filtering',rd:'Blackout',bk:'Blackout',solar:'Solar Screening',exterior:'Exterior Roller'};
  var hMap={open:'Open Roll (no valance)',fascia:'Metal Fascia'};
  var mMap={cord:'Manual chain',cordless:'Cordless',motorized:'Motorized',lutron:'Motorized — Lutron',somfy:'Motorized — Somfy','norman-motor':'Motorized — Norman Smart'};
  var fMap={we:'We supply fabric',customer:'Customer supplies fabric',consult:'Consult — TBD'};

  var typeLabel=typeMap[CRS.type]||CRS.type||'—';
  if(CRS.type==='solar'&&CRS.openness) typeLabel+=' · '+CRS.openness+'% openness';
  if(CRS.color) typeLabel+=' · '+CRS.color;

  var lines=[
    {label:'Product',value:'Custom Roller Shades'},
    {label:'Shade Type',value:typeLabel},
    {label:'Mount',value:CRS.mount==='inside'?'Inside mount':'Outside mount'},
    {label:'Headrail',value:(hMap[CRS.headrail]||CRS.headrail||'—')+(CRS.hwColor?' — '+CRS.hwColor:'')},
    {label:'Width',value:(CRS.w||'—')+'"'},
    {label:'Height',value:(CRS.h||'—')+'"'},
    {label:'Fabric',value:fMap[CRS.fabric]||CRS.fabric||'—'},
    {label:'Operation',value:mMap[CRS.motor]||CRS.motor||'—'},
    {label:'Quantity',value:String(CRS.qty||1)}
  ];
  var specs=lines.map(function(l){return l.label+': '+l.value;}).join(' | ');
  pbAddToCart({product:'Custom Roller Shades',lines:lines,specs:specs,price:price,qty:CRS.qty||1});
  pbOpenCart();
}

function crsSubmit() {
  var name  = ((_crsEl('cf-name')  || {}).value || '').trim();
  var email = ((_crsEl('cf-email') || {}).value || '').trim();
  var phone = ((_crsEl('cf-phone') || {}).value || '').trim();
  var notes = ((_crsEl('cf-notes') || {}).value || '').trim();
  var hp    = ((_crsEl('q-hp')    || {}).value || '');

  if (!name)              { alert('Please enter your name.'); return; }
  if (!email && !phone)   { alert('Please enter an email address or phone number.'); return; }

  var typeMap = { lf: 'Light Filtering', rd: 'Blackout', bk: 'Blackout', solar: 'Solar Screening', exterior: 'Exterior Roller (outdoor)' };
  var hMap    = { open: 'Open roll (no valance)', fascia: 'Metal fascia' };
  var mMap    = { cord: 'Manual chain', cordless: 'Cordless (see Norman Soluna recommendation)', motorized: 'Motorized — brand not selected', 'norman-motor': 'Motorized — Norman Smart (see Norman Soluna)', 'rollease-motor': 'Motorized — Rollease Automate (see Norman Soluna)', lutron: 'Motorized — Lutron (custom quote)', somfy: 'Motorized — Somfy (custom quote)', other: 'Motorized — Other / not sure (specify in notes)' };
  var fMap    = { we: 'We supply the fabric', customer: 'Customer supplies fabric (ships to shop — do NOT ship until confirmed)', consult: 'Consult — fabric TBD' };

  var selections = [];
  if (CRS.type) {
    var tl = typeMap[CRS.type] || CRS.type;
    if (CRS.type === 'solar' && CRS.openness) tl += ' · ' + CRS.openness + '% openness factor';
    selections.push({ label: 'Shade type', value: tl });
  }
  if (CRS.mount)    selections.push({ label: 'Mount', value: CRS.mount === 'inside' ? 'Inside mount' : 'Outside mount' });
  if (CRS.headrail) {
    var hrLabel = (hMap[CRS.headrail] || CRS.headrail) + (CRS.hwColor ? ' — ' + CRS.hwColor : '');
    selections.push({ label: 'Headrail', value: hrLabel });
  }

  var w = parseFloat((_crsEl('crs-inp-w') || {}).value) || 0;
  var h = parseFloat((_crsEl('crs-inp-h') || {}).value) || 0;
  if (w) selections.push({ label: 'Width', value: w + '"' + (CRS.mount === 'inside' ? ' (frame — we deduct ¼" for fit)' : '') });
  if (h) selections.push({ label: 'Height', value: h + '"' });

  if (CRS.fabric) selections.push({ label: 'Fabric', value: fMap[CRS.fabric] || CRS.fabric });
  if (CRS.motor)  selections.push({ label: 'Operation', value: mMap[CRS.motor]  || CRS.motor  });
  selections.push({ label: 'Quantity', value: CRS.qty + ' shade' + (CRS.qty === 1 ? '' : 's') });
  if (CRS.delivery) selections.push({ label: 'Delivery', value: 'Ship via UPS/FedEx' });

  var btn = _crsEl('submit-btn');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }

  fetch('/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: name, email: email, phone: phone,
      product: 'Basic Roller Shades',
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
      var form = _crsEl('pb-final-step');
      var sbox = _crsEl('success-box');
      var sw   = _crsEl('submit-wrap');
      if (form) form.style.display = 'none';
      if (sw)   sw.style.display   = 'none';
      if (sbox) sbox.style.display = 'block';
      crsDone('step-7', name);
    } else {
      if (btn) { btn.disabled = false; btn.textContent = 'Submit Order for Review'; }
      alert(data.error || 'Something went wrong. Please call (609) 742-1720.');
    }
  })
  .catch(function() {
    if (btn) { btn.disabled = false; btn.textContent = 'Submit Order for Review'; }
    // Mailto fallback
    var lines = ['Basic Roller Shades Order'];
    selections.forEach(function(s) { lines.push(s.label + ': ' + s.value); });
    var p = crsCalcPricing();
    if (p) {
      lines.push('---');
      lines.push('Retail (per shade): $' + p.retail.toLocaleString());
      lines.push('Discount (35%): -$' + p.discount.toLocaleString());
      lines.push('Your price (×' + CRS.qty + '): $' + p.shadeTotal.toLocaleString());
      lines.push('Shipping: $' + p.freight.toLocaleString());
      lines.push('Estimated total: $' + p.grandTotal.toLocaleString());
    }
    if (notes) lines.push('Notes: ' + notes);
    lines.push('Name: ' + name);
    if (email) lines.push('Email: ' + email);
    if (phone) lines.push('Phone: ' + phone);
    window.location.href = 'mailto:blindznation@gmail.com?subject=' + encodeURIComponent('Basic Roller Quote — ' + name) + '&body=' + encodeURIComponent(lines.join('\n'));
  });
}

// Init — render color swatches + pre-select ship delivery
crsRenderColors();
CRS.delivery = 'ship';
crsUpdatePanel();
