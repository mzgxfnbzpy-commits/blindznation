// ── PRICING DATA — Norman Ultimate™ Normandy® Cordless Wood Blinds ──────────
// Suggested retail prices from Norman wholesale price list (motorized-p5)
// Widths: 24,28,32,36,42,48,54,60,66,72,78,84,90,96
const NW_W = [24,28,32,36,42,48,54,60,66,72,78,84,90,96];
const NW_H = [30,36,42,48,54,60,66,73,78,84,90,96];
const NW_MATRIX = {
  30: [297,318,339,364,394,425,472,526,563,609,655,709,748,796],
  36: [327,343,361,389,429,461,501,574,612,664,714,775,816,876],
  42: [345,369,389,421,464,501,557,627,678,735,788,864,913,982],
  48: [376,389,418,451,500,536,598,680,732,794,856,938,994,1063],
  54: [390,424,449,505,557,604,666,760,815,888,956,1053,1111,1191],
  60: [420,464,494,535,598,641,714,813,875,956,1035,1133,1191,1289],
  66: [448,493,523,568,633,691,767,870,937,1020,1111,1223,1289,1407],
  73: [479,522,560,604,682,739,822,939,1022,1115,1218,1329,1412,1531],
  78: [487,542,581,635,709,769,884,1008,1084,1167,1261,1433,1515,1655],
  84: [522,561,621,673,751,820,943,1059,1147,1223,1342,1505,1619,1698],
  90: [548,585,649,704,788,862,986,1106,1187,1307,1378,1578,1667,1774],
  96: [561,616,684,746,834,913,1035,1156,1266,1369,1414,1600,1703,1799]
};
// Valance retail prices by width column
const NW_VAL_CROWN   = [50,56,62,75,87,93,106,118,130,143,155,161,174,186];
const NW_VAL_CONTEMPO = [62,68,81,87,99,118,124,143,155,167,180,198,211,223];

const NORMAN_DISC = 0.25; // 25% off retail

// ── STATE ─────────────────────────────────────────────────────────────────────
const S = {
  mount: null,
  slat: '2in',
  w: 0, h: 0, sizeOk: false,
  color: null, colorSurcharge: 0,
  valance: null,
  wandLoc: 'left',
  qty: 1,
  delivery: 'ship'
};

const $ = id => document.getElementById(id);
const fmt = n => '$' + Math.round(n).toLocaleString();

function toggleStep(id) {
  const el = $(id);
  el.classList.add('active');
  setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
}
function markDone(id) { $(id).classList.add('done'); }

// ── STEP 1: MOUNT ─────────────────────────────────────────────────────────────
function pickMount(el, val) {
  document.querySelectorAll('#step1 .opt-btn').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  S.mount = val;
  $('s1val').textContent = val === 'inside' ? 'Inside mount' : 'Outside mount';
  markDone('step1');
  // Show/hide shim note
  const shimNote = $('shim-note');
  if (shimNote) shimNote.style.display = val === 'outside' ? 'block' : 'none';
  toggleStep('step2');
  calcPrice();
}

// ── STEP 2: SLAT SIZE ─────────────────────────────────────────────────────────
function pickSlat(el, label) {
  document.querySelectorAll('#step2 .opt-btn').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  S.slat = label.includes('2½') ? '2.5in' : '2in';
  $('s2val').textContent = label + ' (selected)';
  markDone('step2');
  toggleStep('step4');
  calcPrice();
}

// ── STEP 1: DIMENSIONS (merged into Window measurements & mount) ───────────────
function calcSize() {
  const w = parseFloat($('w-whole').value) || 0;
  const h = parseFloat($('h-whole').value) || 0;
  const msgs = $('size-msgs');
  const cbox = $('computed-box');

  msgs.innerHTML = '';
  S.w = 0; S.h = 0; S.sizeOk = false;

  if (!w && !h) { cbox.style.display = 'none'; calcPrice(); return; }

  const errs = [];
  if (w && (w < 6.5 || w > 96)) errs.push('Width must be between 6½″ and 96″.');
  if (h && (h < 16 || h > 96)) errs.push('Height must be between 16″ and 96″.');
  if (w && h && (w * h) > 64 * 144) errs.push('Area exceeds 64 sq ft maximum. Reduce width or height.');

  if (errs.length) {
    msgs.innerHTML = errs.map(e => '<div class="msg-box msg-err">' + e + '</div>').join('');
    cbox.style.display = 'none';
    calcPrice(); return;
  }

  const pW = NW_W.find(v => v >= w);
  const pH = NW_H.find(v => v >= h);

  if (!pW || !pH) {
    msgs.innerHTML = '<div class="msg-box msg-err">Size is outside the price chart range (max 96″ × 96″).</div>';
    cbox.style.display = 'none'; calcPrice(); return;
  }

  S.w = w; S.h = h; S.sizeOk = true;

  $('cv-size').textContent = w + '″ W × ' + h + '″ H';
  $('cv-pricesize').textContent = pW + '″ W × ' + pH + '″ H';
  $('cv-area').textContent = (w * h / 144).toFixed(2) + ' sq ft';
  cbox.style.display = 'block';

  markDone('step1');

  // Wand center note
  const wandCenter = $('wand-center-note');
  const wandNormal = $('wand-normal');
  if (wandCenter && wandNormal) {
    const isNarrow = w < 15;
    wandCenter.style.display = isNarrow ? 'block' : 'none';
    wandNormal.style.display = isNarrow ? 'none' : 'block';
  }

  calcPrice();
}

// ── STEP 4: COLOR ─────────────────────────────────────────────────────────────
function pickColor(el, name, code, surcharge) {
  document.querySelectorAll('#step4 .color-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  S.color = name;
  S.colorSurcharge = surcharge;
  $('s4val').textContent = name;
  markDone('step4');
  toggleStep('step5');
  calcPrice();
}

// ── STEP 5: VALANCE ───────────────────────────────────────────────────────────
function pickValance(el, label, val) {
  document.querySelectorAll('#step5 .opt-btn').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  S.valance = val;
  $('s5val').textContent = label;
  markDone('step5');
  toggleStep('step6');
  calcPrice();
}

// ── STEP 6: CONTROLS ──────────────────────────────────────────────────────────
function pickWand(el, val) {
  document.querySelectorAll('#step6 .opt-btn').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  S.wandLoc = val;
  $('s6val').textContent = val.charAt(0).toUpperCase() + val.slice(1) + ' wand';
  markDone('step6');
  toggleStep('step8');
}

// ── STEP 7: QUANTITY ──────────────────────────────────────────────────────────
function adjQty(d) {
  const el = $('qty-input');
  let v = parseInt(el.value, 10) + d;
  if (v < 1) v = 1;
  if (v > 50) v = 50;
  el.value = v;
  updateQty();
}
function updateQty() {
  const v = Math.max(1, parseInt($('qty-input').value, 10) || 1);
  S.qty = v;
  calcPrice();
}

// ── DELIVERY ──────────────────────────────────────────────────────────────────
function pickDel(v) {
  S.delivery = v;
  document.querySelectorAll('.delivery-opt-card').forEach(c => c.classList.remove('sel'));
  $('del-' + v).classList.add('sel');
  calcPrice();
}

// ── PRICE CALC ────────────────────────────────────────────────────────────────
function calcPrice() {
  if (!S.sizeOk || !S.color || !S.mount || !S.valance) {
    $('qp-pending').style.display = 'block';
    $('qp-detail').style.display = 'none';
    return;
  }

  const pW = NW_W.find(v => v >= S.w);
  const pH = NW_H.find(v => v >= S.h);
  if (!pW || !pH) { $('qp-pending').style.display = 'block'; $('qp-detail').style.display = 'none'; return; }

  const wi = NW_W.indexOf(pW);
  const base = NW_MATRIX[pH][wi];
  if (!base) { $('qp-pending').style.display = 'block'; $('qp-detail').style.display = 'none'; return; }

  // Color surcharge on base (designer +10%, premium +50%)
  const colorAdd = Math.round(base * S.colorSurcharge);

  // Valance retail price
  let valRetail = 0;
  if (S.valance && S.valance !== 'none') {
    const arr = S.valance === 'crown' ? NW_VAL_CROWN : NW_VAL_CONTEMPO;
    valRetail = arr[wi] || 0;
  }

  const unitRetail = base + colorAdd + valRetail;
  const retailSub = unitRetail * S.qty;
  const discountAmt = Math.round(retailSub * NORMAN_DISC);
  const yourPrice = retailSub - discountAmt;

  const isOversized = S.w >= 90;
  let freight = 0;
  if (S.delivery === 'ship') {
    freight = isOversized
      ? (80 + (S.qty > 1 ? (S.qty - 1) * 50 : 0))
      : (25 + (S.qty > 1 ? (S.qty - 1) * 11 : 0));
  }
  const total = yourPrice + freight;

  $('qp-pending').style.display = 'none';
  $('qp-detail').style.display = 'block';

  // Detail hidden per owner request — base/color/valance roll silently into the retail subtotal.
  // Customer sees retail → 25% off → your price → freight. (Cordless-only; no motor/TDBU/D&N.)
  $('q-base').textContent = fmt(base);
  const _baseRow = $('q-base').closest ? $('q-base').closest('.qrow') : null; if(_baseRow) _baseRow.style.display='none';
  const colorRow = $('q-color-row'); if (colorRow) colorRow.style.display='none';
  const valRow = $('q-valance-row'); if (valRow) valRow.style.display='none';

  $('q-qty').textContent = '× ' + S.qty;
  $('q-retail-sub').textContent = fmt(retailSub);
  $('q-disc').textContent = '-' + fmt(discountAmt);
  $('q-yourprice').textContent = fmt(yourPrice);
  $('q-freight').textContent = S.delivery === 'ship' ? fmt(freight) : 'Pickup — $0';
  $('q-total').textContent = fmt(total);

  $('q-note').textContent = (isOversized
    ? 'Oversized freight: $80 first blind + $50 each additional (width 90″+). '
    : 'Freight: $25 first blind + $11 each additional. ')
    + 'Norman retail pricing — 25% off. Estimated price — confirmed at order. No charge until Justin reviews.';
}

// ── ADD TO CART ───────────────────────────────────────────────────────────────
function addRealWoodToCart() {
  const errEl = $('cf-contact-err');
  errEl.style.display = 'none';
  if (!S.mount)  { errEl.textContent = 'Please select a mount type (Step 1) before adding to cart.';      errEl.style.display = 'block'; return; }
  if (!S.sizeOk) { errEl.textContent = 'Please enter valid dimensions (Step 1) before adding to cart.';   errEl.style.display = 'block'; return; }
  if (!S.color)  { errEl.textContent = 'Please select a color (Step 3) before adding to cart.';           errEl.style.display = 'block'; return; }
  if (!S.valance){ errEl.textContent = 'Please select a valance option (Step 4) before adding to cart.';  errEl.style.display = 'block'; return; }

  const pW = NW_W.find(v => v >= S.w);
  const pH = NW_H.find(v => v >= S.h);
  const wi = NW_W.indexOf(pW);
  const base = NW_MATRIX[pH][wi];
  const colorAdd = Math.round(base * S.colorSurcharge);
  const valArr = S.valance === 'crown' ? NW_VAL_CROWN : (S.valance === 'contempo' ? NW_VAL_CONTEMPO : null);
  const valRetail = valArr ? (valArr[wi] || 0) : 0;
  const unitRetail = base + colorAdd + valRetail;
  const retailSub = unitRetail * S.qty;
  const yourPrice = Math.round(retailSub * (1 - NORMAN_DISC));
  const isOversized = S.w >= 90;
  const freight = S.delivery === 'ship'
    ? (isOversized ? (80 + (S.qty - 1) * 50) : (25 + (S.qty - 1) * 11))
    : 0;
  const total = yourPrice + freight;

  const surchargeLabel = S.colorSurcharge === 0.10 ? ' [Designer +10%]' : S.colorSurcharge === 0.50 ? ' [Premium +50%]' : '';
  const valLabel = S.valance === 'none' ? 'No Valance' : S.valance === 'crown' ? 'Designer Crown' : 'Contempo';

  const lines = [
    { label: 'Product',   value: 'Norman Ultimate™ Normandy® Real Wood Blinds' },
    { label: 'Slat Size', value: S.slat === '2.5in' ? '2½"' : '2"' },
    { label: 'Color',     value: S.color + surchargeLabel },
    { label: 'Mount',     value: S.mount === 'inside' ? 'Inside mount' : 'Outside mount' },
    { label: 'Width',     value: S.w + '"' },
    { label: 'Height',    value: S.h + '"' },
    { label: 'Valance',   value: valLabel },
    { label: 'Quantity',  value: String(S.qty) }
  ];
  const specs = lines.map(l => l.label + ': ' + l.value).join(' | ');
  pbAddToCart({ product: 'Norman Real Wood Blinds', lines: lines, specs: specs, price: total, qty: S.qty });
  pbOpenCart();
}

// ── SUBMIT ────────────────────────────────────────────────────────────────────
function submitForm() {
  const name = $('cf-name').value.trim();
  const phone = $('cf-phone').value.trim();
  const email = $('cf-email').value.trim();
  const notes = ($('cf-notes') || {}).value || '';
  const errEl = $('cf-contact-err');
  errEl.style.display = 'none';

  if (!name) { errEl.textContent = 'Please enter your name.'; errEl.style.display = 'block'; return; }
  if (!phone && !email) { errEl.textContent = 'Please enter a phone or email.'; errEl.style.display = 'block'; return; }
  if (!S.mount) { errEl.textContent = 'Please select a mount type (Step 1).'; errEl.style.display = 'block'; return; }
  if (!S.sizeOk) { errEl.textContent = 'Please enter valid dimensions (Step 1).'; errEl.style.display = 'block'; return; }
  if (!S.color) { errEl.textContent = 'Please select a color (Step 3).'; errEl.style.display = 'block'; return; }
  if (!S.valance) { errEl.textContent = 'Please select a valance option (Step 4).'; errEl.style.display = 'block'; return; }

  const pW = NW_W.find(v => v >= S.w);
  const pH = NW_H.find(v => v >= S.h);
  const wi = NW_W.indexOf(pW);
  const base = NW_MATRIX[pH][wi];
  const colorAdd = Math.round(base * S.colorSurcharge);
  const valArr = S.valance === 'crown' ? NW_VAL_CROWN : (S.valance === 'contempo' ? NW_VAL_CONTEMPO : null);
  const valRetail = valArr ? (valArr[wi] || 0) : 0;
  const unitRetail = base + colorAdd + valRetail;
  const retailSub = unitRetail * S.qty;
  const yourPrice = Math.round(retailSub * (1 - NORMAN_DISC));
  const isOversized = S.w >= 90;
  const freight = S.delivery === 'ship'
    ? (isOversized ? (80 + (S.qty - 1) * 50) : (25 + (S.qty - 1) * 11))
    : 0;
  const total = yourPrice + freight;

  const surchargeLabel = S.colorSurcharge === 0.10 ? ' [Designer +10%]' : S.colorSurcharge === 0.50 ? ' [Premium +50%]' : '';
  const valLabel = S.valance === 'none' ? 'No Valance' : S.valance === 'crown' ? 'Designer Crown' : 'Contempo';
  const wandLabel = S.w < 15 ? 'Center (auto — under 15" wide)' : S.wandLoc.charAt(0).toUpperCase() + S.wandLoc.slice(1);

  const body = [
    'NORMANDY® REAL WOOD BLINDS QUOTE REQUEST',
    '=========================================',
    '',
    'CUSTOMER',
    'Name: ' + name,
    'Phone: ' + (phone || '—'),
    'Email: ' + (email || '—'),
    'Notes: ' + (notes || '—'),
    'Delivery: ' + ('Ship to me (UPS/FedEx)'),
    '',
    'PRODUCT SPECS',
    'Product: Norman Ultimate™ Normandy® Cordless Wood Blinds',
    'Slat Size: ' + (S.slat === '2.5in' ? '2½"' : '2"'),
    'Mount: ' + (S.mount === 'inside' ? 'Inside mount' : 'Outside mount'),
    'Width (ordered): ' + S.w + '"',
    'Height (ordered): ' + S.h + '"',
    'Area: ' + (S.w * S.h / 144).toFixed(2) + ' sq ft',
    'Priced at grid: ' + pW + '" W × ' + pH + '" H',
    'Color: ' + S.color + surchargeLabel,
    'Valance: ' + valLabel,
    'Wand: ' + wandLabel,
    'Quantity: ' + S.qty,
    '',
    'PRICING (Norman retail → 25% off)',
    'Base price (retail, per blind): $' + base,
    'Color surcharge (retail): ' + (colorAdd ? '+$' + colorAdd : '—'),
    'Valance (retail): ' + (valRetail ? '+$' + valRetail : '—'),
    'Retail subtotal: $' + retailSub,
    '25% Norman discount: -$' + (retailSub - yourPrice),
    'Your price (subtotal): $' + yourPrice,
    'Freight: $' + freight,
    'TOTAL ESTIMATE: $' + total
  ].join('\n');

  fetch('/api/quote', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      subject: 'Real Wood Blinds Quote — ' + name,
      body: body
    })
  }).then(r => {
    if (r.ok) {
      $('cf-contact-err').style.display = 'none';
      $('success-box').style.display = 'block';
      const _sb = document.querySelector('[data-pb-require-contact]');
      if (_sb) _sb.style.display = 'none';
    } else {
      errEl.textContent = 'Submission failed. Please call (609) 742-1720.';
      errEl.style.display = 'block';
    }
  }).catch(() => {
    errEl.textContent = 'Network error. Please call (609) 742-1720.';
    errEl.style.display = 'block';
  });
}
