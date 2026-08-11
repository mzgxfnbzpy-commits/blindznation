// Norman PerfectSheer™ — standalone configurator

// ── Pricing tables ────────────────────────────────────────────
const PS_WIDTHS  = [24,30,36,42,48,54,60,66,72,78,84,90,98,104,110];
const PS_HEIGHTS = [36,42,48,54,60,66,72,78,84,90,98,102,108,120];
const PS_PRICES  = [
  [624,698,774,846,921,1005,1074,1155,1342,1425,1502,1581,1653,1726,1800],
  [651,727,793,873,951,1039,1118,1196,1388,1470,1553,1629,1713,1797,1879],
  [693,762,838,922,1010,1105,1195,1288,1475,1557,1651,1740,1829,1916,2004],
  [715,799,879,983,1074,1171,1275,1372,1557,1657,1746,1852,1950,2050,2149],
  [750,841,927,1029,1128,1243,1348,1461,1644,1751,1862,1974,2081,2187,2294],
  [785,878,976,1083,1195,1313,1433,1555,1732,1856,1976,2094,2211,2329,2448],
  [815,918,1021,1137,1261,1392,1518,1644,1829,1950,2084,2211,2337,2462,2587],
  [837,943,1055,1188,1315,1453,1582,1722,1914,2051,2183,2321,2455,2590,2726],
  [870,988,1102,1247,1383,1525,1672,1810,2011,2157,2303,2445,2584,2724,2863],
  [905,1019,1147,1301,1453,1605,1749,1901,2105,2260,2413,2564,2719,2872,3025],
  [943,1062,1196,1361,1518,1674,1832,1994,2203,2367,2528,2686,2845,3003,3161],
  [983,1103,1249,1421,1579,1741,1915,2083,2302,2475,2645,2808,2972,3136,3299],
  [1020,1146,1298,1479,1644,1807,1998,2175,2398,2581,2758,2928,3099,3267,3437],
  [1058,1188,1348,1539,1706,1874,2081,2265,2496,2687,2873,3050,3225,3399,3574]
];
const PS_WOOD_V   = [117,122,133,139,150,161,171,188,204,216,232,249,277,282,304];
const PS_FABRIC_V = [133,139,155,161,171,183,199,216,232,249,271,288,315,326,349];
const PS_NORM_DISC  = 0.35;
const PS_MOTOR_COST = 482;

// ── State ─────────────────────────────────────────────────────
var PS = {
  mount:    null,
  fabric:   'lf',
  color:    '',
  lift:     'ccl',
  valance:  'Curved fascia (free)',
  lgBasic:  false,
  lgPrem:   false,
  holddown: false,
  shims:    0,
  qty:      1,
  delivery: 'ship'
};

function psPickDel(v, el) {
  PS.delivery = v;
  document.querySelectorAll('.delivery-opt-card[id^="ps-del"]').forEach(function(c){ c.classList.remove('sel'); });
  el.classList.add('sel');
}

// ── Step helpers ──────────────────────────────────────────────
function toggleStep(id) {
  var el = document.getElementById(id);
  el.classList.add('active');
  setTimeout(function(){ el.scrollIntoView({behavior:'smooth',block:'start'}); }, 60);
}
function markDone(id) { document.getElementById(id).classList.add('done'); }
function goNext(fromId, toId) {
  document.getElementById(fromId).classList.add('done');
  document.getElementById(fromId).classList.remove('active');
  var t = document.getElementById(toId);
  t.classList.add('active');
  setTimeout(function(){ t.scrollIntoView({behavior:'smooth',block:'start'}); }, 80);
}

// ── Qty spinner ───────────────────────────────────────────────
function adjPsQty(delta) {
  PS.qty = Math.min(20, Math.max(1, PS.qty + delta));
  document.getElementById('ps-qty-display').textContent = PS.qty;
  document.getElementById('qr-qty').textContent = PS.qty + (PS.qty === 1 ? ' shade' : ' shades');
  if (typeof updateStep1Val === 'function') updateStep1Val();
  psCalc();
}

// ── Color dropdown toggle ─────────────────────────────────────
function psUpdateColors(type) {
  var sel   = document.getElementById('ps-color');
  var rdGrp = document.getElementById('ps-rd-group');
  for (var i = 0; i < sel.options.length; i++) {
    var opt  = sel.options[i];
    var inRD = opt.parentElement && opt.parentElement.id === 'ps-rd-group';
    opt.style.display = (type === 'lf' && inRD) ? 'none' : (type === 'rd' && !inRD) ? 'none' : '';
  }
  rdGrp.style.display = type === 'rd' ? '' : 'none';
  for (var j = 0; j < sel.options.length; j++) {
    if (sel.options[j].style.display !== 'none') { sel.selectedIndex = j; break; }
  }
  PS.color = sel.value;
  document.getElementById('qr-color').textContent  = PS.color.split('(')[0].trim();
  document.getElementById('qr-opacity').textContent = type === 'rd' ? 'Room Darkening (+20%)' : 'Light Filtering';
  psCalc();
}

// ── Table index lookup ────────────────────────────────────────
function psGetIdx(arr, val) {
  for (var i = 0; i < arr.length; i++) { if (arr[i] >= val) return i; }
  return -1;
}

// ── Live price calculation ────────────────────────────────────
function psCalc() {
  var w  = parseFloat(document.getElementById('ps-width').value)  || 0;
  var h  = parseFloat(document.getElementById('ps-height').value) || 0;
  var pb = document.getElementById('ps-price-box');
  var pn = document.getElementById('ps-price-note');
  pb.style.display = 'none';
  pn.style.display = 'none';

  // Update right panel selection summary
  var mountEl = document.getElementById('qr-mount');
  var dimsEl  = document.getElementById('qr-dims');
  if (mountEl) mountEl.textContent = PS.mount || '—';
  if (dimsEl)  dimsEl.textContent  = (w && h) ? w + '″ W × ' + h + '″ H' : '—';
  document.getElementById('ps-selection-summary').style.display = 'block';

  if (!w || !h) return;

  // Validate
  var isCCL = PS.lift === 'ccl';
  if (w < 12 || h < 12) {
    pn.style.display = 'block'; pn.textContent = 'Minimum size is 12″ × 12″.'; return;
  }
  if (w > 110) {
    pn.style.display = 'block'; pn.textContent = 'Width over 110″ — call us for a custom quote: (609) 742-1720.'; return;
  }
  if (h > 120) {
    pn.style.display = 'block'; pn.textContent = 'Height over 120″ — call us for a custom quote: (609) 742-1720.'; return;
  }
  if (isCCL && w > 98) {
    pn.style.display = 'block'; pn.textContent = 'Continuous Cord Loop max width is 98″. For wider shades, select Norman Motorization above.'; return;
  }
  if (isCCL && h > 98) {
    pn.style.display = 'block'; pn.textContent = 'Continuous Cord Loop max height is 98″. For taller shades, select Norman Motorization above.'; return;
  }
  if (h > 4 * w) {
    pn.style.display = 'block'; pn.textContent = 'Height cannot exceed 4× the width (Norman ratio limit).'; return;
  }

  // Valance height restriction
  var valSizeWarn = document.getElementById('ps-val-size-warn');
  var val35Btn    = document.getElementById('ps-val-fab35');
  if (valSizeWarn && val35Btn) {
    if (h > 72) {
      valSizeWarn.style.display = 'block';
      val35Btn.disabled = true; val35Btn.style.opacity = '0.4';
      if (PS.valance === 'Fabric valance 3½″') {
        PS.valance = 'Fabric valance 4½″';
        document.querySelectorAll('#grp-ps-valance .opt-btn').forEach(function(c){ c.classList.remove('sel'); });
        var v45 = Array.from(document.querySelectorAll('#grp-ps-valance .opt-btn')).find(function(c){ return c.textContent.indexOf('4½') >= 0 && c.textContent.indexOf('Fabric') >= 0; });
        if (v45) v45.classList.add('sel');
        document.getElementById('s6val').textContent = 'Fabric valance 4½″';
        document.getElementById('qr-valance').textContent = 'Fabric valance 4½″';
      }
    } else {
      valSizeWarn.style.display = 'none';
      val35Btn.disabled = false; val35Btn.style.opacity = '';
    }
  }

  var wi = psGetIdx(PS_WIDTHS,  w); if (wi < 0) wi = PS_WIDTHS.length - 1;
  var hi = psGetIdx(PS_HEIGHTS, h); if (hi < 0) hi = PS_HEIGHTS.length - 1;

  var base  = PS_PRICES[hi][wi];
  var lines = ['Base (' + PS_WIDTHS[wi] + '″W × ' + PS_HEIGHTS[hi] + '″H): $' + base.toLocaleString()];
  var total = base;

  // Room Darkening +20%
  var isRD = PS.fabric === 'rd';
  if (isRD) {
    var rdAdd = Math.round(base * 0.20);
    total += rdAdd;
    lines.push('Room Darkening (+20%): +$' + rdAdd.toLocaleString());
  }

  // Valance
  var vi = psGetIdx(PS_WIDTHS, w); if (vi < 0) vi = PS_WIDTHS.length - 1;
  if (PS.valance.indexOf('Fabric valance') >= 0) {
    var fv = PS_FABRIC_V[vi]; total += fv;
    lines.push('Fabric valance: +$' + fv.toLocaleString());
  } else if (PS.valance.indexOf('Wood valance') >= 0) {
    var wv = PS_WOOD_V[vi]; total += wv;
    lines.push('Wood valance: +$' + wv.toLocaleString());
  }

  // Accessories
  if (PS.lgBasic)   { total += 45;  lines.push('Basic light guard: +$45'); }
  if (PS.lgPrem)    { total += 117; lines.push('Premium wood light guard: +$117'); }
  if (PS.holddown)  { total += 28;  lines.push('Magnetic hold-down: +$28'); }
  if (PS.shims > 0) { var sv = PS.shims * 7; total += sv; lines.push('Shims (' + PS.shims + '×$7): +$' + sv); }

  if (!isCCL) {
    lines.push('Motorization (+$' + PS_MOTOR_COST + '/shade): added to final quote');
  }

  var discAmt   = Math.round(total * PS_NORM_DISC);
  var yourPrice = total - discAmt;
  lines.push('<span style="color:var(--gold)">Retail: $' + total.toLocaleString()
    + ' → 35% off: −$' + discAmt.toLocaleString()
    + ' → Your price: $' + yourPrice.toLocaleString() + '/shade</span>');

  var freight    = w >= 90 ? (80 + Math.max(0, PS.qty - 1) * 50) : (25 + Math.max(0, PS.qty - 1) * 11);
  var grandTotal = (yourPrice * PS.qty) + freight;

  lines.push('Freight (' + (w >= 90 ? '90″+ oversize' : 'standard') + '): +$' + freight);

  document.getElementById('ps-price-num').textContent   = '$' + yourPrice.toLocaleString() + '/shade';
  document.getElementById('ps-price-total').textContent = '$' + grandTotal.toLocaleString();
  document.getElementById('ps-price-breakdown').innerHTML = lines.join('<br>');
  pb.style.display = 'block';
  document.getElementById('qp-pending').style.display    = 'none';
}

// ── Add to cart ───────────────────────────────────────────────
function psAddToCart() {
  var w = parseFloat(document.getElementById('ps-width').value)  || 0;
  var h = parseFloat(document.getElementById('ps-height').value) || 0;
  if (!w || !h) { alert('Please enter your window dimensions first.'); return; }
  if (!PS.mount) { alert('Please select a mount type first.'); return; }

  var wi = psGetIdx(PS_WIDTHS,  w); if (wi < 0) wi = PS_WIDTHS.length - 1;
  var hi = psGetIdx(PS_HEIGHTS, h); if (hi < 0) hi = PS_HEIGHTS.length - 1;
  var base  = PS_PRICES[hi][wi];
  var total = base;
  var isRD  = PS.fabric === 'rd';
  if (isRD) total += Math.round(base * 0.20);
  var vi = psGetIdx(PS_WIDTHS, w); if (vi < 0) vi = PS_WIDTHS.length - 1;
  if (PS.valance.indexOf('Fabric valance') >= 0) total += PS_FABRIC_V[vi];
  else if (PS.valance.indexOf('Wood valance') >= 0) total += PS_WOOD_V[vi];
  if (PS.lgBasic)  total += 45;
  if (PS.lgPrem)   total += 117;
  if (PS.holddown) total += 28;
  total += PS.shims * 7;
  var discAmt   = Math.round(total * PS_NORM_DISC);
  var yourPrice = total - discAmt;
  var freight   = w >= 90 ? (80 + Math.max(0, PS.qty - 1) * 50) : (25 + Math.max(0, PS.qty - 1) * 11);

  var lines = [
    {label:'Product',       value:'Norman PerfectSheer™'},
    {label:'Mount',         value: PS.mount},
    {label:'Width',         value: w + '″'},
    {label:'Height',        value: h + '″'},
    {label:'Light control', value: isRD ? 'Room Darkening (+20%)' : 'Light Filtering'},
    {label:'Color',         value: PS.color || '—'},
    {label:'Lift',          value: PS.lift === 'ccl' ? 'Continuous Cord Loop' : 'Norman Motorization'},
    {label:'Valance',       value: PS.valance},
    {label:'Quantity',      value: String(PS.qty)}
  ];
  if (PS.lift !== 'ccl') {
    var motorSummary = (typeof nmGetMotorSummary === 'function') ? nmGetMotorSummary() : 'Norman Smart Motorization';
    lines.splice(7, 0, {label:'Motor config', value: motorSummary});
  }
  var specs = lines.map(function(l){ return l.label + ': ' + l.value; }).join(' | ');
  pbAddToCart({product:'Norman PerfectSheer™', lines:lines, specs:specs, price:yourPrice * PS.qty + freight, qty:PS.qty});
  if (typeof pbOpenCart === 'function') pbOpenCart();
}

// ── Quote form submit ─────────────────────────────────────────
async function submitPSQuote(btn) {
  var name  = document.getElementById('cf-name').value.trim();
  var phone = document.getElementById('cf-phone').value.trim();
  if (!name || !phone) {
    var errEl = document.getElementById('cf-contact-err');
    if (errEl) { errEl.textContent = 'Please enter your name and phone number.'; errEl.style.display = 'block'; }
    else { alert('Please enter your name and phone number.'); }
    return;
  }
  var w     = document.getElementById('ps-width').value   || '?';
  var h     = document.getElementById('ps-height').value  || '?';
  var email = document.getElementById('cf-email').value;
  var notes = document.getElementById('cf-notes').value;
  var price = document.getElementById('ps-price-total').textContent;
  var woodColor = '';
  if (PS.valance.indexOf('Wood') >= 0) {
    var wvc = document.getElementById('ps-wood-val-color');
    if (wvc) woodColor = ' — ' + wvc.value;
  }
  var lg = PS.lgBasic ? 'Basic light guard' : PS.lgPrem ? 'Premium wood light guard' : 'None';
  var motorLine = '';
  if (PS.lift !== 'ccl') {
    var motorSummary = (typeof nmGetMotorSummary === 'function') ? nmGetMotorSummary() : 'Norman Smart Motorization';
    motorLine = 'Motor config: ' + motorSummary + ' (+$' + PS_MOTOR_COST + '/shade)\n';
  }

  var body = 'NORMAN PERFECTSHEER™ ORDER\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + (email || 'not provided') + '\n\n'
    + 'SPECS\n'
    + 'Width: ' + w + '"  Height: ' + h + '"\n'
    + 'Mount: ' + (PS.mount || '—') + '\n'
    + 'Light control: ' + (PS.fabric === 'rd' ? 'Room Darkening (+20%)' : 'Light Filtering') + '\n'
    + 'Color: ' + (PS.color || '—') + '\n'
    + 'Lift: ' + (PS.lift === 'ccl' ? 'Continuous Cord Loop' : 'Norman Motorization') + '\n'
    + motorLine
    + 'Valance: ' + PS.valance + woodColor + '\n'
    + 'Light guard: ' + lg + '\n'
    + 'Hold-down: ' + (PS.holddown ? 'Yes' : 'No') + '\n'
    + 'Shims: ' + PS.shims + '\n'
    + 'Quantity: ' + PS.qty + '\n'
    + 'Estimated total: ' + price + '\n\n'
    + 'Delivery: ' + ('Ship to customer (UPS/FedEx)') + '\n\n'
    + 'Notes: ' + (notes || 'none');

  if (typeof _apiSubmit === 'function') {
    await _apiSubmit(name, email, phone, 'Norman PerfectSheer™', body, 'ps-success', null, btn);
  } else {
    document.getElementById('ps-success').style.display = 'block';
    if (btn) { btn.disabled = true; btn.textContent = 'Submitted ✓'; }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('step1').classList.add('active');
  PS.color = (document.getElementById('ps-color') || {}).value || 'Snowflake';
  document.getElementById('qr-qty').textContent = '1 shade';
  document.getElementById('qr-valance').textContent = 'Curved fascia (free)';
  document.getElementById('qr-lift').textContent    = 'Continuous Cord Loop';
  document.getElementById('qr-opacity').textContent = 'Light Filtering';
  document.getElementById('s6val').textContent = 'Curved fascia';
  document.getElementById('s5val').textContent = 'Cord Loop';
  document.getElementById('s3val').textContent = 'Light Filtering';
});
