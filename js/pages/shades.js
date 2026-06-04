renderNav('Shades & blinds');
renderFooter(false);

// Auto-open product configurator from URL ?product=xxx parameter
window.addEventListener("load", function() {
  var params = new URLSearchParams(window.location.search);
  var product = params.get("product");
  var brand   = params.get("brand");
  if (!product) return;
  // 'blinds' → open the Faux vs Real Wood type chooser directly
  if (product === "verticals") {
    setTimeout(function() { if(typeof selectVerticalsType==="function") selectVerticalsType(); }, 200);
    return;
  }
  if (product === "blinds") {
    setTimeout(function() { if(typeof selectBlindsType==="function") selectBlindsType(); }, 200);
    return;
  }
  var map = {
    "roller":     ["roller",    "Roller Shades",               true],
    "cellular":   ["cellular",  "Cellular / Honeycomb Shades", true, "norman"],
    "fwb":        ["fwb",       "Wood Blinds",                 false],
    "exterior":   ["exterior",  "Exterior Roller Shades",      false],
    "pb":         ["roller",    "Custom Roller Shades",        true, "pb"]
  };
  var args = map[product];
  if (!args) return;
  setTimeout(function() {
    selectProduct(args[0], args[1], args[2]);
    var autoBrand = brand || args[3];
    if (autoBrand) setTimeout(function(){ if(typeof selectBrand==="function") selectBrand(autoBrand); }, 100);
  }, 200);
});
_initMeasureHelp(`
  <div class="pb-help-heading">How to measure your windows</div>
  <div class="pb-help-sub">Quick guide — inside or outside mount</div>
  <div class="pb-help-section">
    <h4>Inside mount (sits inside the window frame)</h4>
    <ol>
      <li>Measure width at <strong>top, middle, and bottom</strong> — use the narrowest.</li>
      <li>Measure height at <strong>left, center, and right</strong> — use the longest.</li>
      <li>Give us exact measurements — we deduct for fit.</li>
    </ol>
    <div class="pb-help-tip">Best for a clean, built-in look. Minimum depth required — ask us if unsure.</div>
  </div>
  <div class="pb-help-section">
    <h4>Outside mount (mounts on wall above or around frame)</h4>
    <ol>
      <li>Add <strong>2–4 inches</strong> to each side of the window width for full coverage.</li>
      <li>Mount <strong>2–4 inches above</strong> the frame to make ceilings look taller.</li>
      <li>Add extra height for the shade to clear the window when raised.</li>
    </ol>
    <div class="pb-help-tip">Best when inside mount depth is not available, or for a dramatic look.</div>
  </div>
`);

// ── NORMAN PORTRAIT™ HONEYCOMB PRICING TABLES (Feb 2026 MSRP) ─
// Widths:  24  30  36  42  48  54  60  66  72  84  96 108 120
// Heights: 36  42  48  54  60  66  72  78  84  90  96 108 120 144
const CELL_W = [24,30,36,42,48,54,60,66,72,84,96,108,120];
const CELL_H = [36,42,48,54,60,66,72,78,84,90,96,108,120,144];
// 9/16" Single (most popular, lowest price point)
const CELL_9_16S = [
  [212,254,274,297,318,362,437,460,508,551,630,711,791],
  [238,270,282,312,336,385,460,486,543,579,659,737,814],
  [248,278,291,328,366,404,485,513,573,616,695,771,849],
  [252,286,304,340,374,423,512,543,607,659,747,837,923],
  [266,301,318,353,412,445,543,572,642,669,750,862,918],
  [282,326,340,368,420,463,566,596,671,723,811,898,988],
  [289,335,349,385,439,486,592,625,707,763,864,966,1067],
  [338,387,412,449,490,573,611,650,730,805,923,1043,1161],
  [345,401,423,468,508,596,635,676,766,845,965,1081,1198],
  [353,412,439,484,525,618,661,707,797,888,1002,1120,1235],
  [365,423,451,499,544,640,688,737,829,927,1043,1157,1274],
  [401,471,508,565,618,730,791,843,956,1011,1122,1233,1347],
  [439,520,565,625,692,823,887,952,1083,1173,1281,1388,1494],
  [519,622,674,748,838,1007,1080,1173,1264,1389,1500,1694,1790]
];
// 3/8" Single & 3/4" Single (same table)
const CELL_3_8S = [
  [270,336,351,387,418,448,472,569,600,666,727,868,1153],
  [311,347,367,404,437,471,501,601,635,705,770,924,1227],
  [319,359,382,424,484,497,527,634,672,747,821,981,1301],
  [334,373,398,443,500,522,552,669,707,791,868,1035,1365],
  [342,394,415,465,527,546,577,705,744,843,920,1097,1446],
  [367,423,443,482,532,566,605,739,779,872,968,1148,1515],
  [376,434,456,502,543,595,635,770,820,925,1017,1206,1593],
  [438,504,537,590,639,699,747,800,850,956,1061,1258,1657],
  [449,523,554,608,666,727,779,830,888,999,1108,1316,1727],
  [465,537,573,629,688,752,810,866,924,1042,1155,1369,1797],
  [474,552,592,650,713,780,841,897,960,1082,1204,1425,1873],
  [507,596,639,705,778,850,919,987,1057,1195,1331,1576,2066],
  [543,636,688,764,842,922,999,1074,1149,1312,1459,1726,2256],
  [572,676,749,820,904,997,1079,1162,1249,1422,1652,1874,2450]
];
// 1/2" Double
const CELL_1_2D = [
  [281,347,364,402,433,464,490,592,623,690,752,900,1195],
  [323,359,382,420,453,487,520,624,659,733,800,960,1275],
  [333,373,397,440,501,515,545,658,698,775,852,1018,1352],
  [346,388,411,460,519,541,573,695,736,818,900,1073,1417],
  [356,407,430,483,545,567,601,733,772,874,955,1139,1500],
  [382,439,460,499,549,587,628,767,810,904,1004,1192,1572],
  [390,450,472,522,563,616,659,800,849,963,1055,1253,1652],
  [454,526,558,609,665,725,775,830,882,992,1100,1309,1722],
  [465,542,574,630,690,752,810,863,921,1037,1149,1365,1795],
  [483,558,595,652,712,780,840,898,960,1081,1200,1422,1867],
  [493,573,613,674,739,811,871,933,998,1123,1251,1479,1945],
  [527,617,665,733,809,882,953,1022,1095,1243,1383,1635,2144],
  [563,660,712,793,873,956,1037,1116,1193,1361,1516,1793,2341],
  [594,690,766,849,939,1035,1120,1206,1295,1475,1650,1946,2543]
];
// 3/4" Double & 1 1/4" Single (most insulating, highest price)
const CELL_3_4D = [
  [336,416,436,483,519,555,591,707,746,827,903,1080,1437],
  [387,432,457,503,544,586,625,747,792,878,960,1152,1529],
  [399,446,474,529,602,620,655,789,839,932,1021,1220,1622],
  [415,465,494,549,624,648,689,831,879,983,1080,1288,1700],
  [429,490,517,577,655,680,721,878,925,1049,1146,1366,1801],
  [457,527,549,600,660,704,753,920,970,1088,1204,1430,1885],
  [469,541,569,626,675,739,792,960,1020,1154,1265,1503,1981],
  [545,629,669,733,797,871,932,995,1058,1190,1320,1570,2067],
  [561,649,690,759,827,903,970,1036,1105,1243,1380,1637,2153],
  [577,669,713,786,854,938,1007,1079,1152,1298,1439,1705,2238],
  [592,689,736,811,887,971,1046,1120,1196,1348,1499,1774,2333],
  [630,740,797,878,969,1058,1145,1228,1316,1490,1658,1963,2571],
  [675,793,854,951,1047,1148,1243,1341,1431,1632,1818,2149,2809],
  [712,810,918,1020,1126,1241,1343,1447,1553,1769,1978,2334,3048]
];

function _cellTableLookup(w, h) {
  var cellBtn = document.querySelector('#grp-cell-size .opt-btn.sel');
  var t = cellBtn ? cellBtn.textContent : '';
  var c1 = (t.match(/1/g)||[]).length;
  var isD = t.indexOf('D') >= 0;
  var tbl, name;
  if (isD && c1 >= 1) { tbl = CELL_1_2D; name = '1/2" Double'; }
  else if (isD)        { tbl = CELL_3_4D; name = '3/4" Double'; }
  else if (c1 >= 2)    { tbl = CELL_3_4D; name = '1¼" Single'; }
  else if (t.indexOf('9') >= 0) { tbl = CELL_9_16S; name = '9/16" Single'; }
  else if (t.indexOf('4') >= 0) { tbl = CELL_3_8S; name = '3/4" Single'; }
  else                 { tbl = CELL_3_8S; name = '3/8" Single'; }

  var wi = -1, hi = -1;
  for (var i=0;i<CELL_W.length;i++) { if (CELL_W[i]>=w){ wi=i; break; } }
  for (var j=0;j<CELL_H.length;j++) { if (CELL_H[j]>=h){ hi=j; break; } }
  if (wi<0||hi<0) return { name:name, price:null, pricedAt:null };
  return { name:name, price:tbl[hi][wi], pricedAt: CELL_W[wi]+'″ W × '+CELL_H[hi]+'″ H' };
}

// ─── Product rates (fallback / non-cellular products) ────────
const RATES = {
  roller:   22,
  cellular: 26,  // unused — cellular now uses Portrait table lookup
  zebra:    20,
  woven:    18
};
// Absolute product minimums (across all systems)
const PRODUCT_LIMITS = {
  roller:   { minW: 12, maxW: 144, minH: 12, maxH: 132 },
  cellular: { minW: 12, maxW: 120, minH: 12, maxH: 144 },
  zebra:    { minW: 12, maxW: 106, minH: 18, maxH: 125 },
  woven:    { minW: 12, maxW: 96,  minH: 12, maxH: 108 }
};
// Per-system size limits from manufacturer catalogs
const SYSTEM_LIMITS = {
  roller: {
    'Spring':          { maxW: 72,  maxH: 96,  note: 'Spring max 72″W × 96″H — pull-to-release operation' },
    'Cordless':        { maxW: 72,  maxH: 84,  note: 'Cordless max 72″W × 84″H — child & pet safe certified' },
    'Continuous loop': { maxW: 144, maxH: 132, note: 'Continuous loop max 144″W × 132″H — handles any size smoothly' },
    'Motorized':       { maxW: 144, maxH: 132, note: 'Motorized max 144″W × 132″H — app, remote & voice control' },
  },
  cellular: {
    'Cordless':  { maxW: 108, maxH: 120, note: 'Cordless max 108″W × 120″H — child & pet safe' },
    'Cord Loop': { maxW: 120, maxH: 144, note: 'Cord Loop max 120″W × 144″H · 80 sq ft area limit — best for larger windows' },
    'Motorized': { maxW: 120, maxH: 144, note: 'Motorized max 120″W × 144″H — app, remote & voice control' },
  },
  zebra: {
    'Soft-Touch Cordless': { maxW: 98,  maxH: 84,  note: 'Soft-Touch Cordless max 98″W × 84″H — child & pet safe' },
    'Continuous loop':     { maxW: 106, maxH: 125, note: 'Continuous loop max 106″W × 125″H' },
    'Battery motor':       { maxW: 98,  maxH: 84,  note: 'Battery motor max 98″W × 84″H — rechargeable, no wiring needed' },
    'Wand motor':          { maxW: 106, maxH: 125, note: 'Wand motor max 106″W × 125″H — standard motor operation' },
  },
  woven: {
    'Cord lift':  { maxW: 96, maxH: 108, note: 'Cord lift max 96″W × 108″H' },
    'Cordless':   { maxW: 72, maxH: 84,  note: 'Cordless max 72″W × 84″H — varies by fabric weave weight' },
    'Motorized':  { maxW: 96, maxH: 108, note: 'Motorized max 96″W × 108″H — app, remote & voice control' },
  }
};
const MOTOR_UPCHARGE = 482; // Norman Smart motor per shade (Norman brand products)
const MIN_ORDER = 85;

// ─── State ───────────────────────────────────────────────────
let currentProduct = null;
let currentBrand   = null;
let motorOn = false;
let cellMotorUpcharge = 482;  // tracks selected Norman cellular motor cost

// ─── selectProduct ───────────────────────────────────────────
function selectProduct(productId, productName, isInstant) {
  document.querySelectorAll('.product-card').forEach(c => c.classList.remove('selected'));
  const card = document.getElementById('card-' + productId);
  if (card) card.classList.add('selected');

  currentProduct = productId;
  currentBrand   = null;

  const sec = document.getElementById('configurator-section');
  sec.style.display = 'block';

  if (isInstant) {
    document.getElementById('instant-config').classList.add('open');
    document.getElementById('hd-config').classList.remove('open');
    document.getElementById('config-product-name').textContent = productName;

    // Reset brand chooser — hide all brand content, clear selections
    document.querySelectorAll('.brand-btn').forEach(b => b.classList.remove('sel'));
    ['brand-norman-content','brand-pb-content'].forEach(id => {
      document.getElementById(id).style.display = 'none';
    });

    // Cellular always uses Norman — skip brand chooser, auto-select, let scroll/heading run
    if (productId === 'cellular') {
      document.getElementById('brand-chooser').style.display = 'none';
      selectBrand('norman');
    } else {
      // Restore brand chooser for all other instant products
      document.getElementById('brand-chooser').style.display = '';

      // PB Custom is only valid for roller — dim the button for other products
      const pbBtn = document.getElementById('btn-brand-pb');
      if (productId === 'roller') {
        pbBtn.classList.remove('disabled');
        document.getElementById('pb-only-note').style.display = 'none';
        // Show roller type subsection; hide brand chooser until type is picked
        document.getElementById('roller-types').style.display = 'block';
        document.getElementById('brand-chooser').style.display = 'none';
        // Scroll to roller-types anchor
        setTimeout(function(){ var el=document.getElementById('roller-types'); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); }, 100);
      } else {
        pbBtn.classList.add('disabled');
        document.getElementById('pb-only-note').style.display = 'block';
        document.getElementById('roller-types').style.display = 'none';
      }
    }

  } else if (productId === 'perfectsheer') {
    ['instant-config','fwb-config','hd-config','exterior-config'].forEach(id => document.getElementById(id).classList.remove('open'));
    document.getElementById('perfectsheer-config').classList.add('open');
  } else if (productId === 'exterior') {
    document.getElementById('instant-config').classList.remove('open');
    document.getElementById('fwb-config').classList.remove('open');
    document.getElementById('hd-config').classList.remove('open');
    document.getElementById('exterior-config').classList.add('open');
  } else if (productId === 'fwb') {
    document.getElementById('instant-config').classList.remove('open');
    document.getElementById('hd-config').classList.remove('open');
    document.getElementById('fwb-config').classList.add('open');
  } else {
    document.getElementById('instant-config').classList.remove('open');
    document.getElementById('fwb-config').classList.remove('open');
    document.getElementById('hd-config').classList.add('open');
    document.getElementById('hd-product-name').textContent = productName;
    const hdSel = document.getElementById('hd-product-sel');
    if (productId === 'silhouette')  hdSel.value = 'silhouette';
    else if (productId === 'pirouette') hdSel.value = 'pirouette';
    else if (productId === 'luminette') hdSel.value = 'luminette';
    else if (productId === 'vignette')  hdSel.value = 'vignette';
  }

  // Scroll with offset so sticky nav doesn't cover the section
  setTimeout(() => {
    const nav = document.getElementById('site-nav');
    const navH = nav ? nav.offsetHeight : 86;
    const top = sec.getBoundingClientRect().top + window.scrollY - navH - 12;
    window.scrollTo({ top, behavior: 'smooth' });
  }, 60);

  // Update the section heading
  const heading = document.getElementById('configurator-section-heading');
  if (heading) heading.textContent = 'Configure your ' + productName;
}

// ─── selectBrand ─────────────────────────────────────────────
function selectBrand(brand) {
  currentBrand = brand;

  document.querySelectorAll('.brand-btn').forEach(b => b.classList.remove('sel'));
  document.getElementById('btn-brand-' + brand).classList.add('sel');

  document.getElementById('brand-norman-content').style.display = brand === 'norman' ? 'block' : 'none';
  document.getElementById('brand-pb-content').style.display    = brand === 'pb'     ? 'block' : 'none';

  // Update config title
  if (brand === 'pb') {
    document.getElementById('config-product-name').textContent = 'Custom Roller Shades';
  } else if (brand === 'norman' && currentProduct) {
    const card = document.getElementById('card-' + currentProduct);
    const pname = card ? card.querySelector('.product-name').textContent : 'Shade';
    document.getElementById('config-product-name').textContent = 'Norman ' + pname;
  }

  // Motor brand selector removed — no brand choice for Norman products

  if (brand === 'norman' && currentProduct) {
    configureForProduct(currentProduct);
    updatePrice();
  }
  if (brand === 'pb') {
    pbRenderFabricColors();
  }
}

// ─── clearProduct ────────────────────────────────────────────
function clearProduct() {
  document.querySelectorAll('.product-card').forEach(c => c.classList.remove('selected'));
  currentProduct = null;
  document.getElementById('roller-types').style.display = 'none';
  document.getElementById('configurator-section').style.display = 'none';
  document.getElementById('instant-config').classList.remove('open');
  document.getElementById('hd-config').classList.remove('open');
  document.getElementById('fwb-config').classList.remove('open');
  document.getElementById('exterior-config').classList.remove('open');
  document.getElementById('perfectsheer-config').classList.remove('open');
  // Scroll back to product grid
  document.getElementById('product-grid').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── rtSelect — roller type subsection handler ───────────────
function rtSelect(type) {
  // Mark selected card
  ['rt-basic','rt-norman'].forEach(function(id){
    var el = document.getElementById(id);
    if (el) el.classList.toggle('sel', id === 'rt-' + type);
  });
  if (type === 'basic') {
    selectBrand('pb');
  } else if (type === 'norman') {
    selectBrand('norman');
  }
  // Woven Wood is an <a> tag — navigates directly, no JS needed
}

// ─── toggleMeasure ───────────────────────────────────────────
function toggleMeasure(mode) {
  const block = document.getElementById('measure-inputs');
  if (mode === 'help') {
    block.classList.remove('show');
  } else {
    block.classList.add('show');
  }
}

// ─── toggleMotor ─────────────────────────────────────────────
const CORDLESS_SYSTEMS = ['Spring','Cordless','Soft-Touch Cordless','Battery motor'];

function toggleMotor(on) {
  motorOn = on;
  const sub = document.getElementById('motor-sub');
  const row = document.getElementById('pb-motor-row');
  const normanSub = document.getElementById('motor-sub-norman');
  const customSub = document.getElementById('motor-sub-custom');
  if (on) {
    sub.classList.add('show');
    row.style.display = 'flex';
    const isNorman = (currentProduct === 'cellular');
    if (normanSub) normanSub.style.display = isNorman ? 'block' : 'none';
    if (customSub) customSub.style.display = isNorman ? 'none' : 'block';
  } else {
    sub.classList.remove('show');
    row.style.display = 'none';
  }
  checkMotorConflict();
  updatePrice();
}

function checkMotorConflict() {
  // Enforce: Norman Smart controls and Automate Home motors are NOT compatible.
  // Both programs are Norman-brand but use different RF protocols — cannot mix.
  if (currentProduct !== 'cellular') return;
  const motorTypeSel = document.querySelector('#grp-motor-type .opt-btn.sel');
  if (!motorTypeSel || !motorOn) return;
  const motorLabel = motorTypeSel.textContent || '';
  const isNormanSmart   = motorLabel.indexOf('Norman Smart') !== -1;
  const isAutomateHome  = motorLabel.indexOf('Automate Home') !== -1;
  // Currently UI only lets user pick one at a time, so mix can't happen via normal flow.
  // This guard exists in case programmatic state gets out of sync.
  const conflictNote = document.getElementById('motor-program-conflict');
  if (!conflictNote) return;
  if (isNormanSmart && isAutomateHome) {
    conflictNote.style.display = 'block';
    conflictNote.textContent = '⛔ Norman Smart and Automate Home are NOT compatible — they use different RF protocols. Select one system only.';
  } else {
    conflictNote.style.display = 'none';
  }
}

// ─── updateChainStdLabel — live 75%-of-height on Standard btn ─
function updateChainStdLabel(labelId, heightId) {
  var h   = parseFloat(document.getElementById(heightId).value) || 0;
  var lbl = document.getElementById(labelId);
  if (lbl) lbl.textContent = h > 0 ? '(' + Math.ceil(h * 0.75) + '"' + ')' : '';
}

// ─── chainLenCheck — shared 75% validation ───────────────────
function chainLenCheck(inputId, warnId, heightId) {
  var len  = parseFloat(document.getElementById(inputId).value) || 0;
  var h    = parseFloat(document.getElementById(heightId).value) || 0;
  var warn = document.getElementById(warnId);
  if (!warn) return;
  if (!len || !h) { warn.style.display = 'none'; return; }
  var minLen = Math.ceil(h * 0.75);
  if (len < minLen) {
    warn.style.display = 'block';
    warn.textContent = '⚠ Minimum chain length is 75% of shade height — at least ' + minLen + '" for a ' + h + '" shade.';
  } else {
    warn.style.display = 'none';
  }
}

// ─── cellularOpChange ────────────────────────────────────────
// Handles operating system selection for cellular shades.
// TDBU and Day & Night are mutually exclusive — auto-correct on conflict.
// source: 'tdbu' = user just clicked TDBU, 'dn_fabric' = user just picked D&N fabric,
//         'bu' = user switched back to Bottom Up, other = general check.
function cellCheckConflict(source) {
  var liftSel = (document.querySelector('#grp-cellular-lift .opt-btn.sel') || {}).textContent || '';
  var fabSel  = (document.querySelector('#grp-cell-fabric .opt-btn.sel')  || {}).textContent || '';
  var isTDBU  = liftSel.indexOf('Top Down') !== -1;
  var isDNFab = fabSel.indexOf('Night') !== -1;

  // Ensure note element exists
  var el = document.getElementById('cell-conflict-note');
  if (!el) {
    el = document.createElement('div');
    el.id = 'cell-conflict-note';
    el.style.cssText = 'display:none;border-radius:8px;padding:10px 13px;font-size:12px;margin-top:8px;line-height:1.5';
    var lr = document.getElementById('grp-cellular-lift');
    if (lr && lr.parentElement) lr.parentElement.appendChild(el);
  }

  if (isTDBU && isDNFab) {
    if (source === 'tdbu') {
      // User just selected TDBU while D&N fabric was active → switch fabric to Room Darkening
      var rdBtn = Array.from(document.querySelectorAll('#grp-cell-fabric .opt-btn'))
        .find(function(b){ return b.textContent.trim() === 'Room Darkening'; });
      if (rdBtn) { selOpt(rdBtn, 'grp-cell-fabric'); filterCellSizes('rd'); }
      el.style.cssText = 'display:block;background:#FEF9C3;border:1px solid #FDE68A;border-radius:8px;padding:10px 13px;font-size:12px;color:#92400E;margin-top:8px;line-height:1.5';
      el.textContent = '⚠ Day & Night is not compatible with Top Down / Bottom Up — fabric auto-switched to Room Darkening. To use Day & Night, select Bottom Up lift.';
    } else if (source === 'dn_fabric') {
      // User just selected D&N fabric while TDBU was active → switch lift to Bottom Up
      var buBtn = Array.from(document.querySelectorAll('#grp-cellular-lift .opt-btn'))
        .find(function(b){ return b.textContent.trim() === 'Bottom Up'; });
      if (buBtn) { selOpt(buBtn, 'grp-cellular-lift'); showCellularLiftNote('bu'); updateSizeLimits(); }
      el.style.cssText = 'display:block;background:#FEF9C3;border:1px solid #FDE68A;border-radius:8px;padding:10px 13px;font-size:12px;color:#92400E;margin-top:8px;line-height:1.5';
      el.textContent = '⚠ Top Down / Bottom Up is not compatible with Day & Night — lift auto-switched to Bottom Up. To use TDBU, select a different fabric.';
    }
  } else {
    el.style.display = 'none';
  }
}
function cellularOpChange(type) {
  const liftBtn  = document.querySelector('#grp-cellular-lift .opt-btn.sel');
  const liftMode = liftBtn ? liftBtn.textContent.trim() : 'Bottom Up';
  const note     = document.getElementById('cellular-op-note');
  const chainWrap = document.getElementById('cell-chain-len');
  if (chainWrap) chainWrap.style.display = type === 'cord' ? 'block' : 'none';
  if (!note) return;

  if (type === 'cordless') {
    if (motorOn) toggleMotor(false);
    note.innerHTML =
      'Selected lift mode: <strong>' + liftMode + '</strong> &nbsp;·&nbsp; Selected operation: <strong>Cordless</strong><br>' +
      'Cordless operation has no motor. To add a motor, change the operating system to <strong>Motorized</strong>.';
  } else if (type === 'motor') {
    autoMotor();
    note.textContent = 'Norman Smart Motorization — configure power source, remote, and smart home options below.';
    // Inject Norman motor section
    var cellMotorWrap = document.getElementById('cell-motor-section');
    if (!cellMotorWrap) {
      cellMotorWrap = document.createElement('div');
      cellMotorWrap.id = 'cell-motor-section';
      var noteEl = document.getElementById('cellular-op-note');
      if (noteEl && noteEl.parentElement) noteEl.after(cellMotorWrap);
    }
    if (typeof normanMotorSection === 'function') normanMotorSection('cell-motor-section', 'Cellular Shade');
    else cellMotorWrap.innerHTML = '<div style="background:var(--espresso-mid);border-radius:8px;padding:12px 14px;margin-top:10px;font-size:12px;color:var(--text-dark)">Norman Smart Motorization: power source (battery/hardwired), remote, and smart home options confirmed at measurement visit.</div>';
  } else {
    if (motorOn) toggleMotor(false);
    note.textContent = 'Cord Loop: handles larger windows up to 120″ W × 144″ H (80 sq ft max area). Available in Bottom Up, TDBU, and Day & Night. SmartRelease™ upgrade available.';
  }
}

// ─── configureForProduct ─────────────────────────────────────
function configureForProduct(productId) {
  const limits = PRODUCT_LIMITS[productId] || PRODUCT_LIMITS.roller;
  const wEl = document.getElementById('inp-width');
  const hEl = document.getElementById('inp-height');
  wEl.min = limits.minW; wEl.max = limits.maxW;
  hEl.min = limits.minH; hEl.max = limits.maxH;
  wEl.value = ''; hEl.value = '';

  // Norman roller gets the full dedicated 8-step configurator (rn-wrap)
  // All other products use the shared steps (shared-steps-wrap)
  const rnActive = (productId === 'roller' && typeof currentBrand !== 'undefined' && currentBrand === 'norman');
  document.getElementById('rn-wrap').style.display = rnActive ? 'block' : 'none';
  document.getElementById('shared-steps-wrap').style.display = rnActive ? 'none' : 'block';
  if (rnActive) {
    renderFlatFabricGrid('roller'); // populate Step 3a on initial load
    return;
  }

  // Show/hide operating system selector
  const hasSystem = ['roller','cellular','zebra','woven'].includes(productId);
  document.getElementById('op-system-block').style.display = hasSystem ? 'block' : 'none';
  ['roller','cellular','zebra','woven'].forEach(function(p) {
    document.getElementById('op-' + p).style.display = (p === productId) ? 'block' : 'none';
  });
  // Renumber: op-system is Step 2, dimensions becomes Step 3
  if (hasSystem) {
    var el=document.querySelector('#op-system-block .step-num-circle'); if(el) el.textContent='2';
    var el2=document.querySelector('#measure-inputs > .step-block:nth-child(2) .step-num-circle'); if(el2) el2.textContent='3';
  }

  // Show correct light control section
  // Cellular: fabric category in Step 3b already covers Sheer/LF/RD — hide this step entirely
  var stepLight = document.getElementById('step-light');
  if (productId === 'cellular') {
    if (stepLight) stepLight.style.display = 'none';
  } else {
    if (stepLight) stepLight.style.display = 'block';
    ['roller', 'cellular', 'zebra', 'woven'].forEach(function(p) {
      document.getElementById('light-' + p).style.display = (p === productId) ? 'block' : 'none';
    });
    document.getElementById('light-step-title').textContent =
      productId === 'woven' ? 'Liner / light control' : 'Light control';
  }

  // Product-specific option blocks
  document.getElementById('cellular-opts').style.display =
    productId === 'cellular' ? 'block' : 'none';
  document.getElementById('woven-material-opts').style.display =
    productId === 'woven' ? 'block' : 'none';
  document.getElementById('roller-hardware-opts').style.display =
    productId === 'roller' ? 'block' : 'none';
  if (productId === 'roller') {
    renderFlatFabricGrid('roller');
  } else if (productId === 'cellular') {
    // Initialize cell size state from the currently selected button
    var selSzBtn = document.querySelector('#grp-cell-size .opt-btn.sel');
    if (selSzBtn) {
      var szMap = {'3⁄8″ S':'38s','9⁄16″ S':'916s','1⁄2″ D':'12d','3⁄4″ S':'34s','3⁄4″ D':'34d','1 1⁄4″ S':'114s'};
      var szKey = Object.keys(szMap).find(function(k){ return selSzBtn.textContent.trim().startsWith(k.substring(0,3)); });
      currentCellSizeCode = szKey ? szMap[szKey] : '34s';
    }
    selectCellSz(currentCellSizeCode);
    renderFlatFabricGrid('cell');
  }
  // Always reset chain-opts when switching products
  document.getElementById('chain-opts').style.display = 'none';

  // Reset solar openness
  document.getElementById('solar-openness').style.display = 'none';

  // Set system limits for the default selected system
  updateSizeLimits();
}

// ─── updateSizeLimits ────────────────────────────────────────
// Reads the selected operating system and updates size input limits + notes
function updateSizeLimits() {
  if (!currentProduct || !SYSTEM_LIMITS[currentProduct]) return;

  const grpId = 'grp-op-' + currentProduct;
  const btn = document.querySelector('#' + grpId + ' .opt-btn.sel');
  if (!btn) return;
  const sysName = btn.textContent.trim();
  const lim = SYSTEM_LIMITS[currentProduct][sysName];
  if (!lim) return;

  // Update input maxes to reflect this system
  document.getElementById('inp-width').max  = lim.maxW;
  document.getElementById('inp-height').max = lim.maxH;

  // Show system note
  document.getElementById('op-system-note').textContent = lim.note;

  // TDBU callout — driven by lift direction, not operating system
  const tdbuNote = document.getElementById('tdbu-note');
  if (tdbuNote) {
    const liftBtn = document.querySelector('#grp-cellular-lift .opt-btn.sel');
    const isTdbu  = currentProduct === 'cellular' && liftBtn &&
                    liftBtn.textContent.trim() === 'Top Down / Bottom Up';
    tdbuNote.style.display = isTdbu ? 'block' : 'none';
  }

  // Update size-note below the inputs
  document.getElementById('size-note').textContent =
    sysName + ' max: ' + lim.maxW + '″ W × ' + lim.maxH + '″ H';

  // Re-check motor conflict whenever operating system changes
  checkMotorConflict();
  updatePrice();
}

// ─── toggleChainOpts ─────────────────────────────────────────
function toggleChainOpts(on) {
  const el = document.getElementById('chain-opts');
  if (el) el.style.display = on ? 'block' : 'none';
  if (on) updateChainStdLabel('chain-std-label', 'inp-height');
}

// ─── autoMotor ───────────────────────────────────────────────
// Auto-activates the motorization toggle when a motor system is chosen
function autoMotor() {
  const motorBtns = document.querySelectorAll('#grp-motor .opt-btn');
  if (motorBtns.length >= 2) {
    motorBtns[0].classList.remove('sel');
    motorBtns[1].classList.add('sel');
    toggleMotor(true);
  }
}

// ─── toggleSolar ─────────────────────────────────────────────
function toggleSolar(on) {
  document.getElementById('solar-openness').style.display = on ? 'block' : 'none';
}

// ─── toggleLightGuardNote ────────────────────────────────────
function toggleLightGuardNote(on) {
  const el = document.getElementById('lightguard-note');
  if (el) el.style.display = on ? 'block' : 'none';
}

// ─── 9/16"S limited color availability (Norman HC 9/16"S chart) ──────
const CELL_916S_LF = new Set(['C7015K','C7016K','C7017K','C7427K','C7135K','C7138K',
  'C7423K','C7424K','C7425K','C7142K','C7208K','C7143K','C7516K','C7617K','C7715K']);
const CELL_916S_RD = new Set(['C4008T','C4009T','C4010T','C4011T','C4427T','C4123T',
  'C4126T','C4420T','C4421T','C4422T','C4131T','C4205T','C4130T','C4518T','C4609T','C4708T']);
let currentCellSizeCode = '34s';
const CELL_SZ_IDX = {'38s':0,'916s':1,'12d':2,'34s':3,'34d':4,'114s':5};

function selectCellSz(sizeCode) {
  currentCellSizeCode = sizeCode;
  var sizeIdx = CELL_SZ_IDX[sizeCode] !== undefined ? CELL_SZ_IDX[sizeCode] : 3;
  var fabSels = {'lf':'#grp-cell-fabric .opt-btn:first-child','rd':'#grp-cell-fabric .opt-btn:nth-child(2)','sheer':'#cell-fab-sheer-btn','dn':'#cell-fab-dn-btn'};
  var needReset = false;
  ['lf','rd','sheer','dn'].forEach(function(fab) {
    var allowed = CELL_COMPAT[fab] || [0,1,2,3,4,5];
    var ok = allowed.includes(sizeIdx);
    var btn = document.querySelector(fabSels[fab]);
    if (!btn) return;
    btn.disabled = !ok; btn.style.opacity = ok?'1':'0.35'; btn.style.cursor = ok?'pointer':'not-allowed';
    if (!ok && btn.classList.contains('sel')) { btn.classList.remove('sel'); needReset = true; }
  });
  if (needReset) {
    var lfBtn = document.querySelector('#grp-cell-fabric .opt-btn:first-child');
    if (lfBtn) { lfBtn.classList.add('sel'); filterCellSizes('lf'); return; }
  }
  var msgs = {
    '38s':'3⁄8″S: Light Filtering and Sheer available. Room Darkening not available in 3⁄8″S.',
    '916s':'9⁄16″S has a limited colour palette — 15 Light Filtering and 16 Room Darkening colors. Sheer not available.',
    '12d':'1⁄2″D: Light Filtering and Room Darkening available. Sheer not available in double-cell.',
    '34d':'3⁄4″D: Light Filtering and Room Darkening available. Sheer not available in double-cell.',
    '34s':'3⁄4″S: All fabric categories available.',
    '114s':'1 1⁄4″S: All fabric categories available.'
  };
  var noteEl = document.getElementById('cell-size-note');
  if (noteEl) { var m=msgs[sizeCode]||''; noteEl.textContent=m; noteEl.style.display=m?'block':'none'; }
  if (currentProduct === 'cellular') renderFlatFabricGrid('cell');
}
// ─── filterCellSizes ─────────────────────────────────────────
// Fabric → cell size compatibility from Norman Portrait catalog
const CELL_COMPAT = {
  // indices: 0=3/8S · 1=9/16S · 2=1/2D · 3=3/4S · 4=3/4D · 5=1¼S
  // Source: Norman Portrait Honeycomb catalog Option Reference Chart
  'lf':   [0,1,2,3,4,5],  // Light Filtering — all 6 sizes
  'rd':   [  1,2,3,4,5],  // Room Darkening — 9/16"S (16-color limited palette), 1/2"D, 3/4"S, 3/4"D, 1¼"S. NOT 3/8"S.
  'sheer':[0],             // Sheer — 3/8"S only as single shade (9/16"S top in D&N only)
  'dn':   [0,1,2,3,4,5],  // Day & Night — all 6 cell sizes confirmed by owner 2026-05-16. Top & bottom same cell size.
};
const FABRIC_NOTES = {
  'lf':   'Light Filtering: available in all 6 cell sizes.',
  'rd':   'Room Darkening: available in 9⁄16″S (16-color limited palette), 1⁄2″D, 3⁄4″S, 3⁄4″D, and 1 1⁄4″S. Not available in 3⁄8″S.',
  'sheer':'Sheer is available in 3⁄8″S only as a single shade. 9⁄16″S Sheer is available as the top (day) shade in Day &amp; Night mode.',
  'dn':   'Day &amp; Night: two shades in one headrail — all 6 cell sizes available. Top &amp; bottom use the same cell size. 1⁄2″D or 3⁄4″D bottom pairs with nearest single-cell Sheer top.',
};

function filterCellSizes(fabric) {
  currentCellFabric = fabric;
  const allowed = CELL_COMPAT[fabric] || [0,1,2,3,4,5];
  const btns = document.getElementById('grp-cell-size').querySelectorAll('.opt-btn');
  btns.forEach(function(btn, idx) {
    const ok = allowed.includes(idx);
    btn.disabled = !ok;
    btn.style.opacity = ok ? '1' : '0.35';
    btn.style.cursor = ok ? 'pointer' : 'not-allowed';
    if (!ok && btn.classList.contains('sel')) {
      btn.classList.remove('sel');
      // Auto-select first valid
      const firstValid = document.getElementById('grp-cell-size').querySelector('.opt-btn:not([disabled])');
      if (firstValid) firstValid.classList.add('sel');
    }
  });
  const noteEl = document.getElementById('fabric-cell-note');
  if (noteEl) {
    noteEl.innerHTML = FABRIC_NOTES[fabric] || '';
    // D&N note — sheer is top-only in D&N mode
    const liftBtn = document.querySelector('#grp-cellular-lift .opt-btn.sel');
    if (liftBtn && liftBtn.textContent.trim() === 'Day & Night') {
      if (fabric === 'sheer') {
        noteEl.innerHTML += ' <span style="color:var(--gold)">In Day &amp; Night: top shade only.</span>';
      }
    }
  }
  if (currentProduct === 'cellular') renderFlatFabricGrid('cell');
  // Auto-correct TDBU + D&N conflict when D&N fabric is selected
  if (fabric === 'dn') cellCheckConflict('dn_fabric');
  else cellCheckConflict('other'); // clear any stale note if switching away from D&N
}

// ─── showCellularLiftNote ─────────────────────────────────────
function showCellularLiftNote(mode) {
  document.getElementById('tdbu-note').style.display = mode === 'tdbu' ? 'block' : 'none';
  document.getElementById('dn-note').style.display   = mode === 'dn'   ? 'block' : 'none';
  // Re-run the op system note so lift mode label stays current
  const opBtn = document.querySelector('#grp-op-cellular .opt-btn.sel');
  if (opBtn) {
    const opText = opBtn.textContent.trim();
    if (opText === 'Cordless') cellularOpChange('cordless');
    else if (opText === 'Motorized') cellularOpChange('motor');
    else cellularOpChange('cord');
  }
}

// ─── adjustQty / clampQty ────────────────────────────────────
function adjustQty(delta) {
  const inp = document.getElementById('inp-qty');
  let v = parseInt(inp.value) || 1;
  v = Math.min(10, Math.max(1, v + delta));
  inp.value = v;
  updatePrice();
}
function clampQty() {
  const inp = document.getElementById('inp-qty');
  let v = parseInt(inp.value);
  if (isNaN(v) || v < 1) v = 1;
  if (v > 10) v = 10;
  inp.value = v;
}

// ─── updatePrice ─────────────────────────────────────────────
function updatePrice() {
  if (!currentProduct || !(currentProduct in RATES)) return;

  const w = parseFloat(document.getElementById('inp-width').value);
  const h = parseFloat(document.getElementById('inp-height').value);
  const qty = parseInt(document.getElementById('inp-qty').value) || 1;
  const rate = RATES[currentProduct];

  document.getElementById('pb-product').textContent = document.getElementById('config-product-name').textContent;
  document.getElementById('pb-qty').textContent = qty;

  const limits = PRODUCT_LIMITS[currentProduct] || PRODUCT_LIMITS.roller;

  // Get active system limits (may be tighter than product-wide limits)
  let activeMaxW = limits.maxW, activeMaxH = limits.maxH;
  const sysGrp = document.querySelector('#grp-op-' + currentProduct + ' .opt-btn.sel');
  if (sysGrp && SYSTEM_LIMITS[currentProduct]) {
    const sysLim = SYSTEM_LIMITS[currentProduct][sysGrp.textContent.trim()];
    if (sysLim) { activeMaxW = sysLim.maxW; activeMaxH = sysLim.maxH; }
  }

  // Real-time size warning
  const sizeNote = document.getElementById('size-note');
  const sqftArea = w && h ? (w / 12) * (h / 12) : 0;

  // TDBU cellular: 60 sqft max area limit
  const liftBtn = document.querySelector('#grp-cellular-lift .opt-btn.sel');
  const isTdbu  = currentProduct === 'cellular' && liftBtn &&
                  liftBtn.textContent.trim() === 'Top Down / Bottom Up';
  const tdbuOver = isTdbu && sqftArea > 60;

  if (w && h && (w > activeMaxW || h > activeMaxH || tdbuOver)) {
    const sys = sysGrp ? sysGrp.textContent.trim() : 'this system';
    sizeNote.style.color = '#DC2626';
    if (tdbuOver) {
      sizeNote.textContent = '⚠ TDBU max area is 60 sqft — current size is ' + sqftArea.toFixed(1) + ' sqft. Reduce width or height.';
    } else {
      sizeNote.textContent = '⚠ ' + (w > activeMaxW ? 'Width exceeds ' + activeMaxW + '″' : 'Height exceeds ' + activeMaxH + '″') + ' max for ' + sys;
    }
  } else if (sysGrp) {
    sizeNote.style.color = 'var(--gold)';
    sizeNote.textContent = sysGrp.textContent.trim() + ' max: ' + activeMaxW + '″ W × ' + activeMaxH + '″ H' +
      (isTdbu ? ' · 60 sqft area limit' : '');
  }

  if (!w || !h || w < limits.minW || w > activeMaxW || h < limits.minH || h > activeMaxH) {
    document.getElementById('pb-dims').textContent = w > activeMaxW || h > activeMaxH ? 'Size exceeds system limit — call for options' : 'Enter valid width & height';
    document.getElementById('pb-sqft').textContent = '—';
    document.getElementById('pb-base').textContent = '—';
    document.getElementById('pb-total').textContent = '—';
    document.getElementById('pb-min-note').style.display = 'none';
    const mUp = (currentProduct === 'cellular') ? cellMotorUpcharge : MOTOR_UPCHARGE;
    if (motorOn) document.getElementById('pb-motor').textContent = '+$' + mUp + ' / shade';
    return;
  }

  // ── CELLULAR: Norman Portrait™ table lookup — all line items ─
  if (currentProduct === 'cellular') {
    const res = _cellTableLookup(w, h);
    // Helper to show/hide a row
    function cellRow(rowId, labelId, valId, label, val) {
      const row = document.getElementById(rowId);
      if (!row) return;
      if (val !== null) {
        row.style.display = 'flex';
        if (labelId) { const l = document.getElementById(labelId); if (l) l.textContent = label; }
        if (valId)   { const v = document.getElementById(valId);   if (v) v.textContent = val; }
      } else { row.style.display = 'none'; }
    }
    if (!res.price) {
      document.getElementById('pb-dims').textContent = w + '" W × ' + h + '" H — exceeds table, call for quote';
      document.getElementById('pb-sqft').textContent = res.name;
      document.getElementById('pb-base').textContent = 'Out of range — call (609) 742-1720';
      document.getElementById('pb-total').textContent = '—';
      ['pb-sur-rd-row','pb-sur-op-row','pb-sur-lift-row','pb-freight-row'].forEach(function(id){
        var el = document.getElementById(id); if (el) el.style.display = 'none';
      });
      return;
    }
    const fabBtn  = document.querySelector('#grp-cell-fabric .opt-btn.sel');
    const fabTxt  = fabBtn ? fabBtn.textContent.trim() : '';
    const liftDir = document.querySelector('#grp-cellular-lift .opt-btn.sel');
    const liftTxt = liftDir ? liftDir.textContent.trim() : '';
    const opBtn   = document.querySelector('#grp-op-cellular .opt-btn.sel');
    const opTxt   = opBtn ? opBtn.textContent.trim() : '';

    // Base (table price, no surcharges)
    const tableBase = res.price;

    // Fabric surcharge (+20%)
    const rdAdd = (fabTxt === 'Room Darkening' || fabTxt === 'Sheer') ? Math.round(tableBase * 0.20) : 0;
    cellRow('pb-sur-rd-row', 'pb-sur-rd-label', 'pb-sur-rd',
      fabTxt + ' fabric (+20%)', rdAdd > 0 ? '+$' + rdAdd : null);

    // Operating system surcharge (CCL +$73)
    const opAdd = opTxt === 'Cord Loop' ? 73 : 0;
    cellRow('pb-sur-op-row', 'pb-sur-op-label', 'pb-sur-op',
      'Cord Loop system', opAdd > 0 ? '+$73' : null);

    // Lift direction surcharge (TDBU/D&N +$89)
    const liftAdd = (liftTxt === 'Top Down / Bottom Up') ? 89 : (liftTxt === 'Day & Night') ? 89 : 0;
    const liftLabel = liftTxt === 'Top Down / Bottom Up' ? 'Top Down / Bottom Up' : liftTxt === 'Day & Night' ? 'Day & Night' : '';
    cellRow('pb-sur-lift-row', 'pb-sur-lift-label', 'pb-sur-lift',
      liftLabel, liftAdd > 0 ? '+$89' : null);

    // Freight
    const cellFreight = w >= 90 ? (80 + Math.max(0,qty-1)*50) : (25 + Math.max(0,qty-1)*11);
    cellRow('pb-freight-row', null, 'pb-freight', '', '$' + cellFreight + (w >= 90 ? ' (90″+ oversize)' : ''));

    const perShadeAll = tableBase + rdAdd + opAdd + liftAdd;
    const activeMotorUp = cellMotorUpcharge;
    const motorCost = motorOn ? activeMotorUp * qty : 0;
    const total = (perShadeAll * qty) + motorCost + cellFreight;

    document.getElementById('pb-dims').textContent = w + '" W × ' + h + '" H';
    document.getElementById('pb-sqft').textContent = res.name + '  ·  table: ' + res.pricedAt;
    document.getElementById('pb-base').textContent = '$' + tableBase + '/shade (Norman Portrait™ MSRP)';
    if (motorOn) {
      document.getElementById('pb-motor-row').style.display = 'flex';
      document.getElementById('pb-motor').textContent = '+$' + activeMotorUp + ' × ' + qty + ' = $' + (activeMotorUp * qty);
    } else {
      document.getElementById('pb-motor-row').style.display = 'none';
    }
    document.getElementById('pb-total').textContent = '$' + total.toLocaleString() + ' est.';
    document.getElementById('pb-min-note').style.display = 'none';
    return;
  }

  // Update custom roller standard chain label (75% of inp-height)
  updateChainStdLabel('chain-std-label', 'inp-height');

  // ── ALL OTHER PRODUCTS: sqft estimate ────────────────────────
  const sqft = (w / 12) * (h / 12);
  const basePerShade = Math.max(MIN_ORDER, sqft * rate);
  const activeMotorUp = MOTOR_UPCHARGE;
  const motorCost = motorOn ? activeMotorUp * qty : 0;
  const total = (basePerShade * qty) + motorCost;

  document.getElementById('pb-dims').textContent = w + '" W × ' + h + '" H';
  document.getElementById('pb-sqft').textContent = sqft.toFixed(2) + ' sqft';
  document.getElementById('pb-base').textContent = '$' + rate + '/sqft → $' + basePerShade.toFixed(0) + ' est.';
  if (motorOn) {
    document.getElementById('pb-motor').textContent = '+$' + activeMotorUp + ' × ' + qty + ' = $' + (activeMotorUp * qty).toFixed(0);
  }
  document.getElementById('pb-total').textContent = '$' + total.toFixed(0) + ' est.';

  const minApplied = (basePerShade === MIN_ORDER);
  document.getElementById('pb-min-note').style.display = minApplied ? 'block' : 'none';
}

// ─── showShadeForm ───────────────────────────────────────────
function showShadeForm() {
  const f = document.getElementById('shade-submit-form');
  f.classList.add('show');
  f.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── submitShadeForm ─────────────────────────────────────────
async function submitShadeForm(btn) {
  const name = document.getElementById('sf-name').value.trim();
  const phone = document.getElementById('sf-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  const email    = document.getElementById('sf-email').value.trim();
  const notes    = document.getElementById('sf-notes').value.trim();
  const delBtn   = document.querySelector('#grp-del-sf .opt-btn.sel');
  const delivery = delBtn ? delBtn.textContent.trim() : 'Ship to me';
  const pname    = (document.getElementById('config-product-name') || {}).textContent || currentProduct;
  const w = document.getElementById('inp-width').value;
  const h = document.getElementById('inp-height').value;
  const qty = document.getElementById('inp-qty').value;
  const motorTypeSel  = document.querySelector('#grp-motor-type .opt-btn.sel');
  const motorBrandSel = document.querySelector('#grp-motor-brand .opt-btn.sel');
  const motorBrand = motorOn
    ? (currentProduct === 'cellular' && motorTypeSel
        ? motorTypeSel.textContent.split('\n')[0].trim()
        : (motorBrandSel ? motorBrandSel.textContent.trim() : 'Yes — brand confirmed at visit'))
    : 'No';

  // Roller hardware extras
  const isRoller   = currentProduct === 'roller';
  const isCellular = currentProduct === 'cellular';
  // Note: Norman roller uses rn-wrap (separate submit). These fields are for Other-brand/shared roller only.
  const fascia    = (isRoller && currentBrand !== 'norman') ? '\nFascia:   ' + getOpt('grp-fascia') : '';
  const endcap    = '';   // field removed from current UI
  const chainType = '';   // field removed from current UI
  const chainLen  = '';
  const cellLift    = isCellular ? '\nLift:         ' + getOpt('grp-cellular-lift') : '';
  const cellSize    = isCellular ? '\nCell size:    ' + getOpt('grp-cell-size')     : '';
  const cellType    = isCellular ? '\nCell type:    ' + getOpt('grp-cell-type')     : '';

  const body =
    'SHADE QUOTE REQUEST\n' +
    '───────────────────────────────\n' +
    'Name:  ' + name  + '\n' +
    'Phone: ' + phone + '\n' +
    'Email: ' + (email || '—') + '\n\n' +
    'Product:      ' + pname + '\n' +
    'Brand:        ' + (currentBrand || '—') + '\n' +
    'Width:        ' + (w || '—') + '"\n' +
    'Height:       ' + (h || '—') + '"\n' +
    'Qty:          ' + (qty || 1) + '\n' +
    'Mount:        ' + getOpt('grp-mount') + '\n' +
    'Operating:    ' + getOpt('grp-op-' + currentProduct) +
    cellLift + cellSize + cellType +
    fascia + endcap + chainType + chainLen + '\n' +
    'Motorization: ' + (motorOn ? 'Yes — ' + motorBrand : 'No') + '\n' +
    (motorOn && currentBrand === 'norman' && typeof nmGetMotorSummary === 'function' ? 'Motor options: ' + nmGetMotorSummary() + '\n' : '') +
    '\nDelivery: ' + delivery + '\n\n' +
    'Notes:\n' + (notes || '(none)');

  await _apiSubmit(name, email, phone, pname, body, 'shade-success', 'shade-submit-form', btn);
}

// ─── submitPBForm ─────────────────────────────────────────────
async function submitPBForm(btn) {
  const name  = document.getElementById('pb-name').value.trim();
  const phone = document.getElementById('pb-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
  const email    = document.getElementById('pb-email').value.trim();
  const delBtn   = document.querySelector('#grp-del-pb .opt-btn.sel');
  const delivery = delBtn ? delBtn.textContent.trim() : 'Ship to me';
  const w     = document.getElementById('pb-width').value;   // fixed: was inp-width
  const h     = document.getElementById('pb-height').value;  // fixed: was inp-height
  const gPB   = function(id) { const b = document.querySelector('#' + id + ' .opt-btn.sel'); return b ? b.textContent.trim() : '—'; };
  const notes = (document.getElementById('pb-fabric-notes') || {}).value || '';
  const body =
    'CUSTOM ROLLER SHADE REQUEST\n' +
    '══════════════════════════════════════════\n' +
    'Name:           ' + name  + '\n' +
    'Phone:          ' + phone + '\n' +
    'Email:          ' + (email || '—') + '\n\n' +
    'Configuration:  ' + gPB('pb-grp-config') + '\n' +
    'Width:          ' + (w || '—') + '″\n' +
    'Height:         ' + (h || '—') + '″\n' +
    'Mount type:     ' + gPB('pb-grp-mount')     + '\n' +
    'Operation:      ' + gPB('pb-grp-operation') + '\n' +
    'Control side:   ' + gPB('pb-grp-control') + '\n' +
    'Fascia type:    ' + gPB('pb-grp-fascia') + '\n' +
    'Hardware color: ' + gPB('pb-grp-hw-color') + '\n' +
    'End caps:       ' + gPB('pb-grp-endcap') + '\n' +
    'Fabric type:    ' + gPB('pb-grp-fabric-type') + '\n' +
    'Solar openness: ' + gPB('pb-grp-solar')     + '\n' +
    'Color:          ' + gPB('pb-grp-fabric-color') + '\n' +
    'Fabric source:  ' + gPB('pb-grp-fabric')    + '\n' +
    'Delivery:       ' + delivery                + '\n\n' +
    'Fabric notes:\n' + (notes || '(none)') +
    pbInstallLine(document.getElementById('brand-pb-content')) +
    (function(){ var fu = document.querySelector('#brand-pb-content .pb-fu-wrap input[type="file"]'); return fu && fu.files.length ? '\n\nFiles to send: ' + Array.from(fu.files).map(function(f){return f.name;}).join(', ') + '\n(Customer will email these to justin@blindznation.com)' : ''; }());
  await _apiSubmit(name, email, phone, 'Custom Roller Shade', body, 'pb-success', null, btn);
}

// submitOtherForm removed — dead code, no HTML form references oth-* IDs

// ─── submitQuoteForm (Hunter Douglas) ────────────────────────
async function submitQuoteForm(btn) {
  const name = document.getElementById('hd-name').value.trim();
  const phone = document.getElementById('hd-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
  const email    = document.getElementById('hd-email').value.trim();
  const product  = document.getElementById('hd-product-sel').value;
  const wincount = document.getElementById('hd-wincount').value;
  const notes    = document.getElementById('hd-notes').value.trim();
  const delBtn   = document.querySelector('#grp-del-hd .opt-btn.sel');
  const delivery = delBtn ? delBtn.textContent.trim() : 'Ship to me';
  const body =
    'HUNTER DOUGLAS QUOTE REQUEST\n' +
    '─────────────────────────────\n' +
    'Name:    ' + name  + '\n' +
    'Phone:   ' + phone + '\n' +
    'Email:   ' + (email || '—') + '\n\n' +
    'Product: ' + product  + '\n' +
    'Windows: ' + wincount + '\n\n' +
    'Delivery: ' + delivery + '\n\n' +
    'Notes:\n' + (notes || '(none)');
  await _apiSubmit(name, email, phone, 'Hunter Douglas — ' + product, body, 'hd-success', null, btn);
}

// ═══ CART / QUOTE LIST ════════════════════════════════════════
let cart = [];
let cartId = 0;

function optVal(grpId) {
  const b = document.querySelector('#' + grpId + ' .opt-btn.sel:not([disabled])');
  return b ? b.textContent.trim() : '';
}

function buildCartItem() {
  const w   = parseFloat(document.getElementById('inp-width').value);
  const h   = parseFloat(document.getElementById('inp-height').value);
  const qty = parseInt(document.getElementById('inp-qty').value) || 1;
  if (!w || !h || !currentProduct || !currentBrand) return null;

  const rate     = RATES[currentProduct] || 0;
  const sqft     = (w / 12) * (h / 12);
  const base     = Math.max(85, sqft * rate);
  const motorCost = motorOn ? MOTOR_UPCHARGE * qty : 0;
  const estimated = (base * qty) + motorCost;

  const productName = document.getElementById('config-product-name').textContent;
  const brandLabel  = currentBrand === 'norman' ? 'Norman'
                    : currentBrand === 'pb'     ? 'Blindznation Custom'
                    : 'Other';

  const system = optVal('grp-op-' + currentProduct);
  const light  = optVal('grp-light-' + currentProduct) ||
                 optVal('grp-light-roller') ||
                 optVal('grp-light-woven');
  const mount  = optVal('grp-mount');

  const tags = [mount, system, light].filter(Boolean);
  if (currentProduct === 'cellular') {
    const lift   = optVal('grp-cellular-lift');
    const cfabric = optVal('grp-cell-fabric');
    const csize  = optVal('grp-cell-size');
    if (lift)              tags.push(lift);
    if (cfabric)           tags.push(cfabric);
    if (ctype)             tags.push(ctype);
    if (csize)             tags.push(csize + ' cell');
    if (currentCellColl)   tags.push(currentCellColl);
    if (currentCellColor)  tags.push(currentCellColor);
  }
  if (currentProduct === 'roller' && currentBrand !== 'norman') {
    // Norman roller uses rn-wrap (not captured in cart item — separate quote flow)
    const fascia = optVal('grp-fascia');
    if (fascia) tags.push(fascia);
  }
  if (motorOn) {
    const mb = document.getElementById('sel-motor-brand');
    tags.push('Motorized' + (mb && mb.selectedOptions[0] ? ' — ' + mb.selectedOptions[0].text : ''));
  }

  return {
    id: ++cartId,
    productName, brandLabel, w, h, qty,
    tags, estimated,
    brandColor: currentBrand === 'norman' ? '#1C3A6E'
              : currentBrand === 'pb'     ? '#0D4A42' : '#555'
  };
}

function addToCart() {
  const item = buildCartItem();
  if (!item) {
    alert('Please select a brand and enter width & height before adding to quote.');
    return;
  }
  cart.push(item);
  renderCart();
  // Toast
  const t = document.getElementById('add-toast');
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2000);
  // Scroll to cart
  setTimeout(() => {
    document.getElementById('cart-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 150);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  renderCart();
}

function clearCart() {
  if (!cart.length || confirm('Remove all items from your quote list?')) {
    cart = [];
    renderCart();
  }
}

function renderCart() {
  const sec      = document.getElementById('cart-section');
  const itemsEl  = document.getElementById('cart-items');
  const totalsEl = document.getElementById('cart-totals');
  const emptyEl  = document.getElementById('cart-empty-msg');
  const badge    = document.getElementById('cart-count-badge');

  if (!cart.length) {
    sec.style.display    = 'none';
    emptyEl.style.display = 'block';
    totalsEl.style.display = 'none';
    return;
  }

  sec.style.display     = 'block';
  emptyEl.style.display  = 'none';
  totalsEl.style.display = 'block';
  badge.textContent      = '(' + cart.length + ' item' + (cart.length !== 1 ? 's' : '') + ')';

  let grand = 0;
  itemsEl.innerHTML = cart.map(item => {
    grand += item.estimated;
    return `<div class="cart-item">
      <div style="flex-shrink:0;padding-top:2px">
        <span style="background:${item.brandColor};color:#fff;font-size:9px;font-weight:700;letter-spacing:0.8px;text-transform:uppercase;padding:2px 7px;border-radius:10px;white-space:nowrap">${item.brandLabel}</span>
      </div>
      <div class="ci-body">
        <div class="ci-name">${item.productName}</div>
        <div class="ci-specs">${item.w}″ W × ${item.h}″ H · Qty ${item.qty}${item.tags.length ? ' · ' + item.tags.join(' · ') : ''}</div>
      </div>
      <div class="ci-price">~$${item.estimated.toFixed(0)}</div>
      <button class="ci-remove" onclick="removeFromCart(${item.id})" title="Remove item">&#x2715;</button>
    </div>`;
  }).join('');

  document.getElementById('cart-grand-total').textContent = '~$' + grand.toFixed(0);
}

// ════════════════════════════════════════════════════════════════
// NORMAN ROLLER (rn-*) — Full 8-step Soluna configurator
// ════════════════════════════════════════════════════════════════

let rnFabricType   = 'lf';
let rnFabricWidth  = 96;
let currentCellFabric  = 'lf';
let currentRollerColls = [];
let currentCellColls   = [];
let currentRollerColl  = null;
let currentCellColl    = null;
let currentRollerColor = null;
let currentCellColor   = null;

// ─── Norman Soluna roller fabric collections ──────────────────
// Source: Norman Soluna Program Reference Guide, February 2026
// Colors: {n: name, c: fabric code}. Lakeview 1% removed (not in 2026 guide).
// ⚠ Linen = linen content, color variation normal. Maui Natural max height 120".
const SOLUNA_COLLECTIONS = {
  'sheer': [
    {name:'Sheer', colors:[{n:'Linen Weave',c:'F0908'}]},
    {name:'Dazzle', colors:[
      {n:'Soft White',c:'F1538'},{n:'Eggshell',c:'F1539'},{n:'Pewter Green',c:'F1540'},
      {n:'Charcoal',c:'F1541'},{n:'Ink',c:'F1542'}
    ]},
    {name:'Scarlett ⚠ Linen', colors:[
      {n:'Cottage Linen',c:'F1599'},{n:'Seashell',c:'F1600'},{n:'Crema',c:'F1601'},{n:'Stone',c:'F1602'}
    ]},
    {name:'Lakeshore', colors:[{n:'Natural Gray',c:'F1642'}]}
  ],
  'lf': [
    {name:'Kendra', colors:[{n:'LF Foliage',c:'F0890'}]},
    {name:'Francis', colors:[
      {n:'Pearl',c:'F0876'},{n:'Barley',c:'F0877'},{n:'Sandstone',c:'F0878'},{n:'Toast',c:'F0879'},
      {n:'Espresso',c:'F0882'},{n:'Brownie',c:'F0883'},{n:'Oatmeal',c:'F0884'},{n:'Doe',c:'F0885'},
      {n:'Shale',c:'F0886'},{n:'Black',c:'F0888'},{n:'Denim',c:'F0889'}
    ]},
    {name:'Breeze ⚠ Linen', colors:[
      {n:'Linen Flax',c:'F0891'},{n:'Linen Natural',c:'F0893'},{n:'Linen Khaki',c:'F0894'},
      {n:'Linen Dune',c:'F0895'},{n:'Linen Graphite',c:'F0896'},{n:'Linen Almond Milk',c:'F0927'},
      {n:'Linen Stone',c:'F1778'},{n:'Linen Cloud',c:'F1847'},{n:'Linen Warm Ivory',c:'F1851'}
    ]},
    {name:'Hayes', colors:[
      {n:'Maple',c:'F0747'},{n:'Hickory',c:'F0748'},{n:'Birch',c:'F0749'},{n:'Mahogany',c:'F0751'}
    ]},
    {name:'Valerie', colors:[
      {n:'Moonscape',c:'F0738'},{n:'Cove',c:'F0739'},{n:'Dolphin',c:'F0740'},
      {n:'Pomegranate',c:'F0741'},{n:'Sapphire',c:'F0742'},{n:'Silhouette',c:'F0743'},
      {n:'Daylight',c:'F0752'}
    ]},
    {name:'Emery', colors:[
      {n:'Creamy',c:'F0753'},{n:'Khaki',c:'F0754'},
      {n:'Chiffon',c:'F1560'},{n:'Maize',c:'F1561'}
    ]},
    {name:'Brook', colors:[
      {n:'Egret',c:'F1121'},{n:'Smoke',c:'F1122'},
      {n:'Beige',c:'F1123'},{n:'Latte',c:'F1124'}
    ]},
    {name:'Chelsea', colors:[
      {n:'Snow',c:'F1445'},{n:'Cream',c:'F1446'},{n:'Natural',c:'F1447'},
      {n:'Stone',c:'F1448'},{n:'Caviar',c:'F1449'}
    ]},
    {name:'Sierra', colors:[
      {n:'Snow',c:'F1450'},{n:'Cream',c:'F1451'},{n:'Natural',c:'F1452'},
      {n:'Stone',c:'F1453'},{n:'Caviar',c:'F1454'},{n:'Canvas',c:'F1966'},{n:'Graphite',c:'F1967'}
    ]},
    {name:'Shimmer', colors:[
      {n:'Goldmine',c:'F1436'},{n:'Starry Night',c:'F1437'},{n:'Pewter',c:'F1439'},{n:'Midnight',c:'F1440'}
    ]},
    {name:'Amelia', colors:[
      {n:'Mist Gray',c:'F1484'},{n:'Heather Gray',c:'F1485'},
      {n:'Heather Charcoal',c:'F1486'},{n:'Heather Smoke',c:'F1487'}
    ]},
    {name:'Lola LF', colors:[
      {n:'Porcelain',c:'F1551'},{n:'Almond',c:'F1552'},{n:'Light Khaki',c:'F1553'},
      {n:'Wheat',c:'F1554'},{n:'Platinum',c:'F1555'},{n:'Cement',c:'F1556'},
      {n:'Pewter',c:'F1557'},{n:'Iron',c:'F1558'},{n:'Indigo',c:'F1559'}
    ]},
    {name:'Clarissa', colors:[
      {n:'Wheat',c:'F0870'},{n:'Platinum',c:'F0871'},{n:'Tobacco Brown',c:'F0872'},
      {n:'Sable Brown',c:'F0873'},{n:'Burlap',c:'F0874'},{n:'Porcelain',c:'F0928'},
      {n:'Powder',c:'F1532'},{n:'Steel',c:'F1533'},{n:'Silver Satin',c:'F1534'},
      {n:'Golden Straw',c:'F1535'},{n:'Coffee Bean',c:'F1536'},{n:'Coal',c:'F1550'}
    ]},
    {name:'Verona LF', colors:[{n:'Pearl Cotton',c:'F1641'}]},
    {name:'Callie', colors:[
      {n:'Pure White',c:'F1734'},{n:'Vanilla Cream',c:'F1735'},{n:'Natural Tan',c:'F1736'},
      {n:'Silver Ash',c:'F1737'},{n:'Pebble Gray',c:'F1738'},{n:'Black Iron',c:'F1739'},
      {n:'Cloudy Gray',c:'F2028'},{n:'Gray',c:'F2030'},{n:'Rich Truffle',c:'F2032'}
    ]},
    {name:'Remy', colors:[
      {n:'White Dove',c:'F1746'},{n:'Seashell Gray',c:'F1747'},{n:'Dune',c:'F1748'},
      {n:'Hickory Bark',c:'F1749'},{n:'Creamy Mocha',c:'F1750'},{n:'Natural Slate',c:'F1751'}
    ]}
  ],
  'natural': [
    {name:'Aruba', colors:[
      {n:'Sparkle Ivory',c:'F0860'},{n:'Sparkle Khaki',c:'F0861'},{n:'Sparkle Espresso',c:'F0862'}
    ]},
    {name:'Caroline', colors:[{n:'White Sand',c:'F0867'}]},
    {name:'Samoa', colors:[
      {n:'Daylight',c:'F0863'},{n:'Sand',c:'F0864'},{n:'Cumin',c:'F0865'},{n:'Old Teak',c:'F0866'}
    ]},
    {name:'Bali', colors:[
      {n:'Black Walnut',c:'F0668'},{n:'Sand',c:'F1668'},{n:'Flax',c:'F1669'},
      {n:'Latte',c:'F1926'},{n:'Stone Gray',c:'F1927'},{n:'Desert Beige',c:'F2023'},
      {n:'Warm Mocha',c:'F2024'},{n:'Soft Sandstone',c:'F2025'},{n:'Gentle Ash',c:'F2026'},{n:'Gray',c:'F2027'}
    ]},
    {name:'Phuket', colors:[
      {n:'Snow White',c:'F0656'},{n:'Honey',c:'F0657'},{n:'Black Olive',c:'F0659'},
      {n:'Grey Fog',c:'F0660'},{n:'Dust',c:'F0661'},{n:'Dough',c:'F0868'},{n:'Mocha',c:'F1670'}
    ]},
    {name:'Bora Bora', colors:[
      {n:'Seashell White',c:'F0662'},{n:'Straw',c:'F0663'},{n:'Cinnamon',c:'F0869'}
    ]},
    {name:'Sumatra', colors:[{n:'Fog',c:'F0854'}]},
    {name:'Java', colors:[
      {n:'Raffia',c:'F0856'},{n:'Haystack',c:'F0857'},{n:'Natural',c:'F0858'},
      {n:'Sage',c:'F0859'},{n:'Toasted Brown',c:'F1562'}
    ]},
    {name:'Riviera', colors:[
      {n:'Frost',c:'F1290'},{n:'Sugar Cane',c:'F1291'},{n:'Honey',c:'F1292'},
      {n:'Metal',c:'F1293'},{n:'Silver Fox',c:'F1713'}
    ]},
    {name:'Maui Natural ⚠ Max 120″H', colors:[
      {n:'Vanilla Stripe',c:'F1543'},{n:'Natural Stripe',c:'F1544'},{n:'Slate Stripe',c:'F1545'},
      {n:'Ink/Natural',c:'F1548'},{n:'Coffee/Natural',c:'F1549'}
    ]},
    {name:'Lake Tahoe', colors:[{n:'Stone',c:'F1577'}]},
    {name:'Catalina', colors:[{n:'Sea Salt',c:'F1605'},{n:'Oatmeal',c:'F1712'}]},
    {name:'Cove', colors:[{n:'Jet Black',c:'F1714'}]}
  ],
  'rd': [
    {name:'Garden', colors:[
      {n:'RD Foliage',c:'F0853'},{n:'Winter White',c:'F1514'},{n:'Ecru',c:'F1515'},
      {n:'Cinnamon',c:'F1516'},{n:'Forest',c:'F1517'},{n:'Midnight',c:'F1518'}
    ]},
    // Elements White Backing: F1108-F1113 are ACTIVE per Feb 2026 PDF (page 16).
    // Old "Glamour" collection NAME was discontinued; same codes now listed under "Elements White Backing".
    {name:'Elements White Backing', colors:[
      {n:'White',c:'F1108'},{n:'Stone Gray',c:'F1109'},{n:'Broken White',c:'F1110'},
      {n:'Cloudy Gray',c:'F1111'},{n:'Gray',c:'F1112'},{n:'Anthracite Gray',c:'F1113'}
    ]},
    {name:'Elements', colors:[
      {n:'Stone Gray',c:'F2109'},{n:'Broken White',c:'F2110'},{n:'Cloudy Gray',c:'F2111'},
      {n:'Gray',c:'F2112'},{n:'Anthracite Gray',c:'F2113'},{n:'Weathered White',c:'F2114'},
      {n:'Soft Sandstone',c:'F2115'},{n:'Gentle Ash',c:'F2116'},{n:'Soothing Gray',c:'F2117'},
      {n:'Graphite',c:'F2118'},{n:'Desert Beige',c:'F2119'},{n:'Warm Mocha',c:'F2120'},
      {n:'Rich Truffle',c:'F2121'},{n:'Alabaster',c:'F2043'},{n:'Canvas',c:'F2044'},{n:'New Khaki',c:'F2045'}
    ]},
    {name:'Jamaica', colors:[
      {n:'Latte',c:'F0827'},{n:'Crystal',c:'F0828'},{n:'Biscuit',c:'F0829'}
    ]},
    {name:'Bermuda', colors:[
      {n:'Mushroom',c:'F0831'},{n:'Cocoa',c:'F0832'},{n:'Charcoal',c:'F0834'}
    ]},
    {name:'Fiji', colors:[
      {n:'Pure White',c:'F0822'},{n:'Cream/Ash',c:'F0823'},{n:'Flax/Brown',c:'F0824'},
      {n:'Chocolate/Cream',c:'F0825'},{n:'Charcoal/Brown',c:'F0826'}
    ]},
    {name:'Lola BO', colors:[
      {n:'Porcelain',c:'F1455'},{n:'Almond',c:'F1456'},{n:'Light Khaki',c:'F1457'},
      {n:'Wheat',c:'F1458'},{n:'Platinum',c:'F1459'},{n:'Cement',c:'F1460'},
      {n:'Pewter',c:'F1461'},{n:'Iron',c:'F1462'},{n:'Indigo',c:'F1463'}
    ]},
    {name:'Summerland ⚠ Linen', colors:[
      {n:'Pearl',c:'F1510'},{n:'Maize',c:'F1511'},{n:'Sterling',c:'F1512'}
    ]},
    {name:'Cory', colors:[{n:'White',c:'F1479'},{n:'Ivory',c:'F1480'},{n:'Sand',c:'F1481'}]},
    {name:'Callie RD', colors:[
      {n:'Pure White',c:'F1740'},{n:'Vanilla Cream',c:'F1741'},{n:'Natural Tan',c:'F1742'},
      {n:'Silver Ash',c:'F1743'},{n:'Pebble Gray',c:'F1744'},{n:'Black Iron',c:'F1745'},
      {n:'Cloudy Gray',c:'F2033'},{n:'Gray',c:'F2035'},{n:'Rich Truffle',c:'F2037'}
    ]},
    {name:'Remy RD', colors:[
      {n:'White Dove',c:'F1752'},{n:'Seashell Gray',c:'F1753'},{n:'Dune',c:'F1754'},
      {n:'Hickory Bark',c:'F1755'},{n:'Creamy Mocha',c:'F1756'},{n:'Natural Slate',c:'F1757'}
    ]},
    {name:'Francis RD', colors:[
      {n:'Pearl',c:'F1762'},{n:'Sandstone',c:'F1763'},{n:'Oatmeal',c:'F1764'},
      {n:'Doe',c:'F1765'},{n:'Black',c:'F1766'},{n:'Denim',c:'F1767'}
    ]},
    {name:'Breeze RD ⚠ Linen', colors:[
      {n:'Linen Flax',c:'F1768'},{n:'Linen Natural',c:'F1769'},{n:'Linen Khaki',c:'F1770'},
      {n:'Linen Dune',c:'F1771'},{n:'Linen Graphite',c:'F1772'},{n:'Linen Almond Milk',c:'F1773'},
      {n:'Linen Stone',c:'F1779'},{n:'Linen Cloud',c:'F1848'},{n:'Linen Warm Ivory',c:'F1852'}
    ]},
    {name:'Amelia RD', colors:[
      {n:'Mist Gray',c:'F1774'},{n:'Heather Gray',c:'F1775'},
      {n:'Heather Charcoal',c:'F1776'},{n:'Heather Smoke',c:'F1777'}
    ]}
  ],
  'solar': [
    // Lakeview 1% — listed in Price Group 3 on spec but color codes not confirmed; add when codes available
    {name:'Lakeview 3%', colors:[{n:'Light Taupe',c:'F1270'},{n:'Sand Drift',c:'F1271'}]},
    {name:'Lakeview 7%', colors:[{n:'Flax',c:'F1266'},{n:'Yellow Stone',c:'F1267'}]},
    {name:'Lakeview 10%', colors:[{n:'Frost Gray',c:'F1268'},{n:'Java',c:'F1269'}]},
    {name:'Meadows 1%', colors:[{n:'Travertine',c:'F1274'},{n:'Mushroom',c:'F1275'},{n:'Sun Buff',c:'F1276'}]},
    {name:'Meadows 3%', colors:[{n:'Rustic Brown',c:'F1272'},{n:'Earth Brown',c:'F1273'}]},
    {name:'Jubilee 3%', colors:[
      {n:'Sweet Cream',c:'F1277'},{n:'Steel Blue/Beige',c:'F1278'},{n:'Chestnut',c:'F1279'},
      {n:'Egg Shell',c:'F1280'},{n:'Coal',c:'F1281'}
    ]},
    {name:'Moon 5%', colors:[
      {n:'Chalk',c:'F1519'},{n:'Pearl Linen',c:'F1520'},{n:'Pearl',c:'F1521'},{n:'Pearl Pewter',c:'F1522'},
      {n:'Charcoal Chestnut',c:'F1523'},{n:'Charcoal Gray',c:'F1524'},{n:'Raven Black',c:'F1525'}
    ]},
    {name:'Serene 1%', colors:[{n:'Snow White',c:'F1158'},{n:'Silver',c:'F1150'},{n:'Umber',c:'F1149'},{n:'Steel',c:'F1151'}]},
    {name:'Serene 3%', colors:[{n:'Snow White',c:'F1232'},{n:'Silver',c:'F1233'},{n:'Umber',c:'F1234'},{n:'Steel',c:'F1235'}]},
    {name:'Serene 7%', colors:[{n:'Snow White',c:'F1240'},{n:'Silver',c:'F1241'},{n:'Umber',c:'F1242'},{n:'Steel',c:'F1243'}]},
    {name:'Flow 1%', colors:[{n:'Polar White',c:'F1244'},{n:'Wheat',c:'F1245'},{n:'Quarry Stone',c:'F1246'},{n:'Ink',c:'F1247'}]},
    {name:'Flow 5%', colors:[{n:'Polar White',c:'F1159'},{n:'Wheat',c:'F1152'},{n:'Quarry Stone',c:'F1154'},{n:'Ink',c:'F1153'}]},
    {name:'Flow 7%', colors:[{n:'Polar White',c:'F1248'},{n:'Wheat',c:'F1249'},{n:'Quarry Stone',c:'F1250'},{n:'Ink',c:'F1251'}]},
    {name:'Windsong 1%', colors:[{n:'Soft White',c:'F1252'},{n:'Canvas',c:'F1253'},{n:'Graphite',c:'F1254'},{n:'Raven Black',c:'F1255'}]},
    {name:'Windsong 5%', colors:[
      {n:'Soft White',c:'F1260'},{n:'Canvas',c:'F1261'},{n:'Nickel',c:'F1262'},
      {n:'Graphite',c:'F1263'},{n:'Eclipse',c:'F1264'},{n:'Raven Black',c:'F1265'}
    ]},
    {name:'Breeze Screen 1% ⚠ Linen', colors:[
      {n:'Linen Flax',c:'F1780'},{n:'Linen Khaki',c:'F1782'},{n:'Linen Dune',c:'F1783'},
      {n:'Linen Graphite',c:'F1784'},{n:'Linen Almond Milk',c:'F1785'},{n:'Linen Stone',c:'F1786'},
      {n:'Linen Cloud',c:'F1846'},{n:'Linen Warm Ivory',c:'F1850'}
    ]},
    {name:'Breeze Screen 3% ⚠ Linen', colors:[
      {n:'Linen Flax',c:'F1787'},{n:'Linen Khaki',c:'F1789'},{n:'Linen Dune',c:'F1790'},
      {n:'Linen Graphite',c:'F1791'},{n:'Linen Almond Milk',c:'F1792'},{n:'Linen Stone',c:'F1793'},
      {n:'Linen Cloud',c:'F1845'},{n:'Linen Warm Ivory',c:'F1849'}
    ]},
    {name:'Galaxy 3%', colors:[{n:'Soft White',c:'F1728'},{n:'Ash',c:'F1731'},{n:'Black',c:'F1727'}]}
  ],
  // Commercial solar — verified against Feb 2026 Norman Soluna PDF (pages 20 active fabric list).
  // OLD F0355-F0369 variants (Pearl/Linen/Pewter/Chestnut/Gray in NA300): discontinued per appendix p.66 → NOT in picker
  // NEW F1872/F1873/F1874 Charcoal (NA300) and F1875/F1876 Chalk (NA400 1%): ACTIVE ✓
  // NA400 3%: F0381/F0382/F0384 — shown ACTIVE on PDF p.20 (no F1xxx replacement) ✓
  // NA820 3%: F0407 Oyster/Pewter — shown ACTIVE on PDF p.20 ✓
  // NA400 5%: F0388/F0390 — shown ACTIVE on PDF p.20 ✓
  // NA400 10%: F0396 Charcoal — shown ACTIVE on PDF p.20 ✓
  // Note: appendix also lists F0396/F0407/F0381-F0390 under old "A400"/"A820" naming — these are
  // the same products now listed as "NA400"/"NA820" in the current Feb 2026 active catalog.
  'commercial': [
    {name:'NA300 1%', colors:[{n:'Charcoal',c:'F1872'}]},
    {name:'NA400 1%', colors:[{n:'Chalk',c:'F1875'},{n:'Chalk/Beige',c:'F1876'}]},
    {name:'NA300 3%', colors:[{n:'Charcoal',c:'F1873'}]},
    {name:'NA400 3%', colors:[{n:'Chalk',c:'F0381'},{n:'Chalk/Beige',c:'F0382'},{n:'Charcoal',c:'F0384'}]},
    {name:'NA820 3%', colors:[{n:'Oyster/Pewter',c:'F0407'}]},
    {name:'NA300 5%', colors:[{n:'Charcoal',c:'F1874'}]},
    {name:'NA400 5%', colors:[{n:'Chalk/Beige',c:'F0388'},{n:'Charcoal',c:'F0390'}]},
    {name:'NA400 10%', colors:[{n:'Charcoal',c:'F0396'}]}
  ]
};

// ─── Norman Portrait Cellular — real fabric data (2025-2026) ──
// Source: Norman HC Color Coordination spreadsheet, updated 2026-03-06
// ⚠ DISCONTINUED — DO NOT RE-ADD:
// Discontinued per Wallace email dated 2026-04-23 (see C:\Users\Blind\PhillyBlinds Photos\fabrics\discontinued.png):
//   Light Filtering C7018K Soft Stone — removed from ALL Portrait honeycomb cell sizes:
//     9/16"S, 3/8"S, 1/2"D, 3/4"S, 3/4"D, 1 1/4"S
//   Rustica designer colors (C7004/C7409/C7610/C7113 LF, C4004/C4403/C4606/C4115 RD) — discontinued 2/1/2026
// Audit verified 2026-05-16 — no C7018K in active CELL_COLLECTIONS or CELL_916S_LF.
// NOTE: C4011T "Soft Stone RD" is a DIFFERENT color and is still active.
// Colors stored as {n: name, c: code}
const CELL_COLLECTIONS = {
  'sheer': [
    {name:'Sheer', colors:[
      {n:'Cloud White',    c:'C5004'},
      {n:'Seapearl',       c:'C5001'},
      {n:'Cloudy Chiffon', c:'C5002'},
      {n:'Jersey Cream',   c:'C5501'},
      {n:'Nightfall',      c:'C5201'}
    ]}
  ],
  'lf': [
    {name:'Whites & Creams', colors:[
      {n:'Brilliant White', c:'C7015K'},
      {n:'Cotton Cloud',    c:'C7016K'},
      {n:'Gardenia',        c:'C7017K'},
      {n:'White Cream',     c:'C7515K'},
      {n:'Daisy',           c:'C7133K'},
      {n:'Provence Cream',  c:'C7417K'},
      {n:'Yellow Bliss',    c:'C7510K'},
      {n:'Morning Blush',   c:'C7303K'},
      {n:'White Rain',      c:'C7703K'}
    ]},
    {name:'Naturals & Warm Tones', colors:[
      {n:'Natural Tan',    c:'C7423K'},
      {n:'Pale Oak',       c:'C7424K'},
      {n:'New Camel',      c:'C7516K'},
      {n:'Wheat',          c:'C7427K'},
      {n:'Pashmina',       c:'C7408K'},
      {n:'Autumn Gold',    c:'C7506K'},
      {n:'Cabin',          c:'C7433K'},
      {n:'River Rock',     c:'C7507K'},
      {n:'Reflections',    c:'C7145K'},
      {n:'Annapolis Gray', c:'C7105K'},
      {n:'Morning Mist',   c:'C7121K'},
      {n:'Whipped Mocha',  c:'C7425K'},
      {n:'Rue Bourbon',    c:'C7426K'},
      {n:'Coffee Beans',   c:'C7434K'}
    ]},
    {name:'Silvers & Grays', colors:[
      {n:'Seal Gray',      c:'C7139K'},
      {n:'Silver Satin',   c:'C7134K'},
      {n:'French Silver',  c:'C7135K'},
      {n:'Classic Silver', c:'C7136K'},
      {n:'Power Gray',     c:'C7137K'},
      {n:'Iron Mountain',  c:'C7138K'},
      {n:'Orion Gray',     c:'C7140K'},
      {n:'Silver Dusk',    c:'C7143K'},
      {n:'Space Gray',     c:'C7208K'},
      {n:'Dew',            c:'C7142K'}
    ]},
    {name:'Blues', colors:[
      {n:'Florida Keys',  c:'C7617K'},
      {n:'Bella Blue',    c:'C7715K'},
      {n:'Ocean Air',     c:'C7705K'},
      {n:'Seaside Blue',  c:'C7704K'},
      {n:'Blue Flower',   c:'C7706K'},
      {n:'Lakeside',      c:'C7702K'},
      {n:'Smokey Blue',   c:'C7709K'},
      {n:'Spring Sky',    c:'C7107K'},
      {n:'Catalina Blue', c:'C7603K'}
    ]},
    {name:'Greens & Accents', colors:[
      {n:'Fernwood',         c:'C7604K'},
      {n:'Meadows',          c:'C7612K'},
      {n:'Mulberry',         c:'C7802K'},
      {n:'Eggplant',         c:'C7104K'},
      {n:'Pacific Cove',     c:'C7305K'},
      {n:'Roasted Pumpkin',  c:'C7306K'},
      {n:'Black Olive',      c:'C7201K'}
    ]}
  ],
  'rd': [
    {name:'Whites & Creams', colors:[
      {n:'Brilliant White RD', c:'C4008T'},
      {n:'Cotton Cloud RD',    c:'C4009T'},
      {n:'Gardenia RD',        c:'C4010T'},
      {n:'White Cream RD',     c:'C4517T'},
      {n:'Daisy RD',           c:'C4121T'},
      {n:'Provence Cream RD',  c:'C4431T'},
      {n:'Yellow Bliss RD',    c:'C4519T'},
      {n:'Soft Stone RD',      c:'C4011T'}
    ]},
    {name:'Naturals & Warm Tones', colors:[
      {n:'Natural Tan RD',    c:'C4420T'},
      {n:'Pale Oak RD',       c:'C4421T'},
      {n:'New Camel RD',      c:'C4518T'},
      {n:'Wheat RD',          c:'C4427T'},
      {n:'Pashmina RD',       c:'C4433T'},
      {n:'Autumn Gold RD',    c:'C4520T'},
      {n:'Cabin RD',          c:'C4430T'},
      {n:'River Rock RD',     c:'C4521T'},
      {n:'Reflections RD',    c:'C4135T'},
      {n:'Annapolis Gray RD', c:'C4102T'},
      {n:'Morning Mist RD',   c:'C4133T'},
      {n:'Whipped Mocha RD',  c:'C4422T'},
      {n:'Rue Bourbon RD',    c:'C4423T'},
      {n:'Coffee Beans RD',   c:'C4432B'}
    ]},
    {name:'Silvers & Grays', colors:[
      {n:'Seal Gray RD',      c:'C4129T'},
      {n:'Silver Satin RD',   c:'C4122T'},
      {n:'French Silver RD',  c:'C4123T'},
      {n:'Classic Silver RD', c:'C4124T'},
      {n:'Power Gray RD',     c:'C4125T'},
      {n:'Iron Mountain RD',  c:'C4126T'},
      {n:'Orion Gray RD',     c:'C4127T'},
      {n:'Silver Dusk RD',    c:'C4130T'},
      {n:'Space Gray RD',     c:'C4205T'},
      {n:'Dew RD',            c:'C4131T'}
    ]},
    {name:'Blues', colors:[
      {n:'Florida Keys RD', c:'C4609T'},
      {n:'Bella Blue RD',   c:'C4708T'},
      {n:'Ocean Air RD',    c:'C4709T'},
      {n:'Black Olive RD',  c:'C4201B'}
    ]}
  ],
  'dn': [
    {name:'Sheer + Room Darkening', colors:[]},
    {name:'Sheer + Light Filtering', colors:[]},
    {name:'Light Filtering + Room Darkening', colors:[]},
    {name:'Light Filtering + Light Filtering', colors:[]},
    {name:'Woven Windsong + Light Filtering', colors:[]},
    {name:'Woven Windsong + Room Darkening', colors:[]}
  ]
};

// ─── Windsong D&N colors (valid as top/day shade in Day & Night config)
// Windsong is a woven-texture Norman Portrait fabric — specify exact color in quote notes.
// Full color list not programmed; customer selects via notes field.
CELL_COLLECTIONS['windsong'] = [
  {name:'Woven Windsong (Day shade)', colors:[
    {n:'Specify color in notes below', c:'WS'}
  ]}
];

// ─── Fabric type → human label maps ──────────────────────────
const RN_FABRIC_LABELS = {
  'sheer':'Sheer','lf':'Light Filtering','natural':'Natural',
  'rd':'Room Darkening','solar':'Solar Screen','commercial':'Commercial Solar'
};
const CELL_FABRIC_LABELS = {
  'lf':'Light Filtering','rd':'Room Darkening','sheer':'Sheer','dn':'Day & Night','windsong':'Woven Windsong'
};

// ─── Color swatch map ────────────────────────────────────────
const COLOR_HEX = {
  'White':'#FFFFFF','Soft White':'#F8F5F0','Off-White':'#F3EEE6','Antique White':'#FAEBD7','Snow':'#FFFAFA','Cotton':'#F5F2EC',
  'Ivory':'#FFFFF0','Cream':'#FFFDD0','Pearl':'#F0E8DC','Champagne':'#F7E7CE','Almond':'#EFDECD',
  'Natural':'#C8B890','Linen':'#F0E4D0','Flax':'#DDD0A0','Hemp':'#A89068','Oatmeal':'#DECFA0','Parchment':'#F2E8D0',
  'Sand':'#C8B27A','Wheat':'#F5DEB3','Caramel':'#C68030','Khaki':'#C0A880','Dune':'#C09060',
  'Teak':'#7A4E2A','Tan':'#D2B48C','Toast':'#A85030','Maple':'#C07830','Cinnamon':'#C86420',
  'Stone':'#928070','Taupe':'#8A7868','Clay':'#9A6050','Driftwood':'#A07848','Pebble':'#9A8878',
  'Fog':'#C8C0B6','Mist':'#CED8DE','Beige':'#F0E8CA','Bark':'#784E28','Brown':'#885030',
  'Dark Brown':'#604020','Ebony':'#3A2818','Espresso':'#2A1810','Cocoa':'#583018',
  'Dove':'#D4CCBF','Light Gray':'#D0D0D0','Gray':'#888888','Warm Gray':'#A09870',
  'Ash':'#B0B0A6','Silver':'#C0C0C0','Slate':'#687078','Smoke':'#9C9C9C','Steel':'#7E90A0',
  'Graphite':'#505050','Pewter':'#909898','Charcoal':'#36444E','Black':'#1C1C1C',
  'Gold':'#D4A828','Bronze':'#C07A38','Dark Bronze':'#503820',
  'Linen Flax':'#DECE9A','Linen Natural':'#D0C098','Linen Khaki':'#C0A880','Linen Dune':'#C09060',
  'Linen Graphite':'#686868','Linen Almond Milk':'#F2E4C6','Linen Stone':'#928070',
  'Linen Cloud':'#E0E0E0','Linen Warm Ivory':'#FFF2DC',
  'Light':'#D8C8A6','Medium':'#B09058','Dark':'#6A4020',
  'Blush':'#F2B8B0','Rose':'#E07888','Dusty Rose':'#D09090','Mauve':'#B88888',
  'Berry':'#881840','Plum':'#6A0070','Burgundy':'#780018','Lilac':'#C498CC',
  'Sage':'#8EA870','Mint':'#98D8A8','Forest':'#2A6828',
  'Sky':'#88CEEA','Powder Blue':'#B0D8EE','Blue Gray':'#6090AE','Denim':'#2860A6',
  'Navy':'#182860','Midnight':'#181828','Dusty Blue':'#8890B6','Cloud':'#E6EEF2',
  'White (1%)':'#FAFAFA','White (3%)':'#F5F5F5','White (5%)':'#F0F0F0',
  'Linen (1%)':'#F4EAD6','Linen (3%)':'#EEDEC6','Linen (5%)':'#E8D4B6',
  'Charcoal (1%)':'#606060','Charcoal (3%)':'#505050','Charcoal (5%)':'#404040',
  // ─── Norman Portrait Cellular 2025-2026 colors ───────────────
  'Cloud White':'#F8F6F2','Seapearl':'#EDE8E0','Cloudy Chiffon':'#E8E0D4','Jersey Cream':'#EFE4CC','Nightfall':'#1A1A28',
  'Brilliant White':'#FAFAFA','Cotton Cloud':'#EFF0EE','Gardenia':'#F2EDE4','White Cream':'#FAF5E8','Daisy':'#FAF6D8',
  'Wheat':'#E0C88A','Seal Gray':'#9CA3AF','Silver Satin':'#C8CAC8','French Silver':'#BCBEC0','Classic Silver':'#B8BAB8',
  'Power Gray':'#8C8E90','Iron Mountain':'#707270','Orion Gray':'#686A6C','Natural Tan':'#C8A87A','Pale Oak':'#D4B888',
  'Whipped Mocha':'#A87850','Rue Bourbon':'#703018','Dew':'#DDE8DC','Space Gray':'#6A7278','Silver Dusk':'#A8B0B8',
  'New Camel':'#C8A060','Florida Keys':'#3A98A8','Bella Blue':'#5880B8','Yellow Bliss':'#F2DE78','Autumn Gold':'#C87E30',
  'Cabin':'#7A5030','Provence Cream':'#EAD8A8','Reflections':'#C8A870','River Rock':'#9A7860','Coffee Beans':'#3E2818',
  'Pashmina':'#C0A090','Morning Mist':'#C8C8C0','Annapolis Gray':'#988870','Black Olive':'#282E24','Ocean Air':'#8CC0D0',
  'Seaside Blue':'#4888A8','Blue Flower':'#6890C0','Lakeside':'#486888','Smokey Blue':'#6070A0','Spring Sky':'#80A8C0',
  'White Rain':'#D0E0EC','Catalina Blue':'#364E80','Fernwood':'#687858','Meadows':'#849860','Mulberry':'#702038',
  'Eggplant':'#48284E','Morning Blush':'#E8B0B8','Pacific Cove':'#B87038','Roasted Pumpkin':'#B84E20',
  // RD versions (slightly darker/deeper)
  'Brilliant White RD':'#F5F5F5','Cotton Cloud RD':'#E8EAE8','Gardenia RD':'#EDE8E0','White Cream RD':'#F5F0E0',
  'Daisy RD':'#F5F0D0','Soft Stone RD':'#D8C8A8','Wheat RD':'#D8BE80','Seal Gray RD':'#909698','Silver Satin RD':'#C0C2C0',
  'French Silver RD':'#B4B6B8','Classic Silver RD':'#B0B2B0','Power Gray RD':'#848688','Iron Mountain RD':'#686A6C',
  'Orion Gray RD':'#606264','Natural Tan RD':'#C0A070','Pale Oak RD':'#CCB080',
  'Whipped Mocha RD':'#A07040','Rue Bourbon RD':'#682810','Dew RD':'#D5E0D4','Space Gray RD':'#626A70',
  'Silver Dusk RD':'#A0A8B0','New Camel RD':'#C09858','Florida Keys RD':'#328898','Bella Blue RD':'#5078B0',
  'Yellow Bliss RD':'#ECD870','Autumn Gold RD':'#C07828','Cabin RD':'#724828','Provence Cream RD':'#E2D0A0',
  'Reflections RD':'#C0A068','River Rock RD':'#927060','Coffee Beans RD':'#382010','Pashmina RD':'#B89888',
  'Morning Mist RD':'#C0C0B8','Annapolis Gray RD':'#908070','Black Olive RD':'#20261C','Ocean Air RD':'#84B8C8',
};
function colorDot(name) {
  var hex = COLOR_HEX[name]; if (!hex) return '';
  return '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + hex
    + ';border:1px solid rgba(0,0,0,0.15);margin-right:5px;vertical-align:middle;flex-shrink:0;"></span>';
}

// ─── renderFlatFabricGrid ─────────────────────────────────────
// Flat one-step picker: "Collection – Color" buttons, no intermediate step
function renderFlatFabricGrid(product) {
  const colls = product === 'roller'
    ? (SOLUNA_COLLECTIONS[rnFabricType] || [])
    : (CELL_COLLECTIONS[currentCellFabric] || []);

  if (product === 'roller') {
    currentRollerColls = colls; currentRollerColl = null; currentRollerColor = null;
  } else {
    currentCellColls   = colls; currentCellColl   = null; currentCellColor   = null;
  }

  // For cellular D&N: swap to the dual picker instead of flat grid
  if (product === 'cell') {
    const dnWrap  = document.getElementById('cell-dn-wrap');
    const summary = document.getElementById('cell-fabric-inline-summary');
    const grid    = document.getElementById('cell-fabric-inline-grid');
    if (currentCellFabric === 'dn') {
      if (dnWrap)  dnWrap.style.display  = 'block';
      if (summary) summary.textContent   = '';
      if (grid)    grid.innerHTML        = '';
      // Auto-render default D&N selections
      cellDnRender('top',    'sheer');
      cellDnRender('bottom', 'rd');
      return;
    } else {
      if (dnWrap) dnWrap.style.display = 'none';
    }
  }

  const summaryId = product === 'roller' ? 'rn-fabric-inline-summary' : 'cell-fabric-inline-summary';
  const gridId    = product === 'roller' ? 'rn-fabric-inline-grid'    : 'cell-fabric-inline-grid';
  const summaryEl = document.getElementById(summaryId);
  const gridEl    = document.getElementById(gridId);
  if (!summaryEl || !gridEl) return;

  const typeLabel = product === 'roller'
    ? (RN_FABRIC_LABELS[rnFabricType] || '')
    : (CELL_FABRIC_LABELS[currentCellFabric] || '');

  if (!colls.length) {
    summaryEl.textContent = '';
    gridEl.innerHTML = '<div class="tooltip-note">Fabric options coming soon.</div>';
    return;
  }

  // Summary line — all collection names
  const shown = colls.slice(0, 6).map(function(c){ return c.name; }).join(', ');
  const extra = colls.length > 6 ? ' +' + (colls.length - 6) + ' more' : '';
  summaryEl.textContent = typeLabel + ': ' + shown + extra;

  // Flat buttons — supports both plain string colors (roller) and {n,c} objects (cellular)
  let html = '';
  colls.forEach(function(coll, ci) {
    if (coll.colors.length) {
      if (coll.name) {
        html += '<div style="font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#888;margin:10px 0 5px">' + coll.name + '</div>';
      }
      html += '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:4px">';
      coll.colors.forEach(function(color, ki) {
        const isObj  = color && typeof color === 'object';
        const cName  = isObj ? color.n : color;
        const cCode  = isObj ? color.c : '';
        // Filter by cell size for cellular product
        if (product === 'cell' && cCode && currentCellSizeCode === '916s') {
          if (currentCellFabric === 'lf' && !CELL_916S_LF.has(cCode)) return;
          if (currentCellFabric === 'rd' && !CELL_916S_RD.has(cCode)) return;
        }
        const dot    = colorDot(cName);
        const codeTxt = cCode ? ' <span style="font-size:9px;color:#aaa;margin-left:2px">' + cCode + '</span>' : '';
        html += '<button class="opt-btn" style="font-size:11px;display:inline-flex;align-items:center;gap:0" onclick="selFlatFabric(this,\'' + product + '\',' + ci + ',' + ki + ')">'
              + dot + cName + codeTxt + '</button>';
      });
      html += '</div>';
    } else {
      html += '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:4px">';
      html += '<button class="opt-btn" style="font-size:11px;opacity:0.65" onclick="selFlatFabric(this,\'' + product + '\',' + ci + ',-1)">'
            + coll.name + '</button>';
      html += '</div>';
    }
  });

  gridEl.innerHTML = html;
}

function selFlatFabric(el, product, ci, ki) {
  const gridId = product === 'roller' ? 'rn-fabric-inline-grid' : 'cell-fabric-inline-grid';
  document.querySelectorAll('#' + gridId + ' .opt-btn').forEach(function(b) { b.classList.remove('sel'); });
  el.classList.add('sel');
  const colls = product === 'roller' ? currentRollerColls : currentCellColls;
  const coll  = colls[ci];
  if (!coll) return;
  if (product === 'roller') {
    currentRollerColl  = coll.name;
    currentRollerColor = ki >= 0 ? coll.colors[ki] : '';
  } else {
    currentCellColl  = coll.name;
    const raw = ki >= 0 ? coll.colors[ki] : '';
    // Support both plain string colors (roller) and {n,c} objects (cellular)
    if (raw && typeof raw === 'object') {
      currentCellColor = raw.n + (raw.c ? ' (' + raw.c + ')' : '');
    } else {
      currentCellColor = raw;
    }
  }
}
// ─── Norman Faux Wood Blinds ─────────────────────────────────
function fwbAdjQty(delta) {
  var inp = document.getElementById('fwb-qty');
  var v = parseInt(inp.value) || 1;
  v = Math.min(20, Math.max(1, v + delta));
  inp.value = v;
}
// ─── Wood Blinds type selector ───────────────────────────────
function selectVerticalsType() {
  document.querySelectorAll('.product-card').forEach(function(c){c.classList.remove('selected');});
  var card = document.getElementById('card-verticals');
  if (card) card.classList.add('selected');
  currentProduct = 'verticals';
  var sec = document.getElementById('configurator-section');
  sec.style.display = 'block';
  ['instant-config','hd-config','fwb-config','rwb-config','blinds-type-config','exterior-config','perfectsheer-config'].forEach(function(id){
    var e = document.getElementById(id); if (e) e.classList.remove('open');
  });
  document.getElementById('verticals-type-config').classList.add('open');
  sec.scrollIntoView({behavior:'smooth',block:'start'});
}
function selectBlindsType() {
  document.querySelectorAll('.product-card').forEach(function(c){c.classList.remove('selected');});
  var card = document.getElementById('card-fwb');
  if (card) card.classList.add('selected');
  currentProduct = 'fwb';
  var sec = document.getElementById('configurator-section');
  sec.style.display = 'block';
  document.getElementById('instant-config').classList.remove('open');
  document.getElementById('hd-config').classList.remove('open');
  document.getElementById('fwb-config').classList.remove('open');
  document.getElementById('rwb-config').classList.remove('open');
  document.getElementById('blinds-type-config').classList.add('open');
  sec.scrollIntoView({behavior:'smooth',block:'start'});
}
function selectBlindsSubtype(type) {
  document.getElementById('blinds-type-config').classList.remove('open');
  if (document.getElementById('verticals-type-config')) document.getElementById('verticals-type-config').classList.remove('open');
  if (type === 'fwb') {
    document.getElementById('fwb-config').classList.add('open');
    document.getElementById('rwb-config').classList.remove('open');
    resetBlindsConfig('fwb');
  } else {
    document.getElementById('rwb-config').classList.add('open');
    document.getElementById('fwb-config').classList.remove('open');
    resetBlindsConfig('rwb');
  }
  // Scroll to top of configurator section
  setTimeout(function() {
    var el = document.getElementById('configurator-section');
    if (el) { var nav = document.getElementById('site-nav'); el.scrollIntoView({ behavior:'smooth', block:'start' }); }
  }, 60);
}
function switchBlindsType(type) {
  document.getElementById(type === 'fwb' ? 'rwb-config' : 'fwb-config').classList.remove('open');
  document.getElementById(type + '-config').classList.add('open');
  resetBlindsConfig(type);
  setTimeout(function() {
    var el = document.getElementById(type + '-config');
    if (el) el.scrollIntoView({ behavior:'smooth', block:'start' });
  }, 60);
}
function resetBlindsConfig(type) {
  var pfx = type + '-';
  // Reset all opt-btn selections to their default (first button = sel)
  ['grp-slat','grp-color','grp-finish','grp-op','grp-mount'].forEach(function(grp) {
    var el = document.getElementById(pfx + grp);
    if (!el) return;
    var btns = el.querySelectorAll('.opt-btn');
    btns.forEach(function(b, i) { b.classList.toggle('sel', i === 0); });
  });
  // Clear form fields
  ['name','phone','email','notes','width','height'].forEach(function(f) {
    var el = document.getElementById(pfx + f);
    if (el) el.value = '';
  });
  var qty = document.getElementById(pfx + 'qty'); if (qty) qty.value = 1;
  // Reset delivery to ship
  var delGrp = document.getElementById('grp-del-' + type);
  if (delGrp) {
    var dbtns = delGrp.querySelectorAll('.opt-btn');
    dbtns.forEach(function(b,i){ b.classList.toggle('sel', i===0); });
  }
  var ds = document.getElementById('del-' + type + '-s');
  var dp = document.getElementById('del-' + type + '-p');
  if (ds) ds.style.display = 'block';
  if (dp) dp.style.display = 'none';
  // Hide success
  var succ = document.getElementById(type + '-success');
  if (succ) succ.style.display = 'none';
}
function showBlindsTypeSelector() {
  document.getElementById('fwb-config').classList.remove('open');
  document.getElementById('rwb-config').classList.remove('open');
  document.getElementById('blinds-type-config').classList.add('open');
}
async function submitRWBForm(btn) {
  var name  = document.getElementById('rwb-name').value.trim();
  var phone = document.getElementById('rwb-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
  var slat   = document.querySelector('#rwb-grp-slat .opt-btn.sel')?.textContent.trim() || '';
  var finish = document.querySelector('#rwb-grp-finish .opt-btn.sel')?.textContent.trim() || '';
  var op     = document.querySelector('#rwb-grp-op .opt-btn.sel')?.textContent.trim() || '';
  var mount  = document.querySelector('#rwb-grp-mount .opt-btn.sel')?.textContent.trim() || '';
  var w      = document.getElementById('rwb-width').value;
  var h      = document.getElementById('rwb-height').value;
  var qty    = document.getElementById('rwb-qty').value;
  var del    = document.querySelector('#grp-del-rwb .opt-btn.sel')?.textContent.trim() || '';
  var notes  = document.getElementById('rwb-notes').value.trim();
  var email  = document.getElementById('rwb-email').value.trim();
  var body = 'Real Wood Blinds Quote Request\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + (email||'—') + '\n\n'
    + 'Slat size: ' + slat + '\nFinish: ' + finish + '\nOperating system: ' + op
    + '\nMount: ' + mount + '\nWidth: ' + (w||'—') + '"\nHeight: ' + (h||'—') + '"\nQty: ' + qty
    + '\nDelivery: ' + del + '\n\nNotes: ' + (notes||'None');
  await _apiSubmit(name, email, phone, 'Real Wood Blinds', body, 'rwb-success', null, btn);
}
async function submitFWBForm(btn) {
  var name  = document.getElementById('fwb-name').value.trim();
  var phone = document.getElementById('fwb-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
  var slat  = document.querySelector('#fwb-grp-slat .opt-btn.sel')?.textContent.trim() || '';
  var color = document.querySelector('#fwb-grp-color .opt-btn.sel')?.textContent.trim() || '';
  var op    = document.querySelector('#fwb-grp-op .opt-btn.sel')?.textContent.trim() || '';
  var mount = document.querySelector('#fwb-grp-mount .opt-btn.sel')?.textContent.trim() || '';
  var w     = document.getElementById('fwb-width').value;
  var h     = document.getElementById('fwb-height').value;
  var qty   = document.getElementById('fwb-qty').value;
  var del   = document.querySelector('#grp-del-fwb .opt-btn.sel')?.textContent.trim() || '';
  var notes = document.getElementById('fwb-notes').value.trim();
  var email = document.getElementById('fwb-email').value.trim();
  var body  = 'Norman Faux Wood Blinds Quote Request\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + (email||'—') + '\n\n'
    + 'Slat size: ' + slat + '\nColor family: ' + color + '\nOperating system: ' + op
    + '\nMount: ' + mount + '\nWidth: ' + (w||'—') + '"\nHeight: ' + (h||'—') + '"\nQty: ' + qty
    + '\nDelivery: ' + del + '\n\nNotes: ' + (notes||'None');
  await _apiSubmit(name, email, phone, 'Norman Faux Wood Blinds', body, 'fwb-success', null, btn);
}

// ─── PB Custom roller fabric picker ──────────────────────────
// ── CUSTOM ROLLER SHADE PRICING TABLE (Cordless Solar Screen) ──
const PB_WIDTHS  = [24,30,36,42,48,54,60,66,72,78,84,90,96,108,120];
const PB_HEIGHTS = [36,48,60,72,84,96,108,120,132,144];
const PB_SOLAR   = {
  36:  [240,258,278,296,314,331,362,382,406,450,474,507,533,577,628],
  48:  [259,282,302,325,350,372,412,439,468,519,545,587,614,671,723],
  60:  [281,302,326,357,390,421,467,497,535,586,618,666,692,745,795],
  72:  [297,325,359,397,430,468,522,558,595,650,677,721,749,809,870],
  84:  [318,354,394,434,474,513,573,614,645,697,745,776,809,874,941],
  96:  [336,383,428,471,518,563,618,656,690,745,797,831,870,941,1015],
  108: [361,411,461,511,558,600,659,697,737,795,850,890,932,1007,1088],
  120: [387,440,495,546,597,635,697,739,780,844,903,949,990,1078,1160],
  132: [408,470,526,582,627,670,737,780,826,894,956,1002,1049,1141,1235],
  144: [434,498,561,609,659,703,777,823,872,940,1010,1061,1111,1206,1309]
};
const PB_FASCIA_W  = [24,30,36,42,48,54,60,66,72,78,84,90,96,108,120,132,144];
const PB_FASCIA_P  = [117,122,133,139,150,161,171,188,204,216,232,249,265,293,326,349,375];
// Cassette / 8" Fabric Valance surcharge (Soluna Feb 2026 MSRP)
const PB_CASSETTE_P = [188,199,216,227,244,260,282,304,331,354,382,408,431,486,530,552,612];

function _pbRoundUp(val, arr) {
  for (var i=0;i<arr.length;i++) if (val<=arr[i]) return arr[i];
  return null; // oversized
}
function _pbLookup(w,h) {
  var rw = _pbRoundUp(w,PB_WIDTHS);
  var rh = _pbRoundUp(h,PB_HEIGHTS);
  if (!rw||!rh) return null;
  var row = PB_SOLAR[rh]; if (!row) return null;
  return { price: row[PB_WIDTHS.indexOf(rw)], rw:rw, rh:rh, oversized: rw>90 };
}
function _pbFasciaLookup(w) {
  var rw = _pbRoundUp(w, PB_FASCIA_W);
  if (!rw) return null;
  return PB_FASCIA_P[PB_FASCIA_W.indexOf(rw)];
}

function pbCalcPrice() {
  var w   = parseFloat(document.getElementById('pb-width').value);
  var h   = parseFloat(document.getElementById('pb-height').value);
  var box = document.getElementById('pb-price-box');
  var vWrap = document.getElementById('pb-fascia-wrap');
  if (!box) return;

  var fabBtn  = document.querySelector('#pb-grp-fabric-type .opt-btn.sel');
  var fabType = fabBtn ? fabBtn.textContent.trim() : '';
  var isSolar   = fabType === 'Solar Screen';
  var isBlackout = fabType === 'Blackout';
  var hasPricing = isSolar || isBlackout;

  // Show valance add-on when width known
  if (vWrap) vWrap.style.display = (hasPricing && w) ? 'block' : 'none';
  var valOpts = document.getElementById('pb-fascia-opts');
  var addVal  = document.getElementById('pb-add-fascia');
  if (valOpts && addVal) valOpts.style.display = addVal.checked ? 'block' : 'none';

  if (!hasPricing || !w || !h) { box.style.display='none'; return; }

  var qty = parseInt(document.getElementById('pb-qty-inp').value) || 1;
  var baseResult = _pbLookup(w,h);
  // Apply 20% upcharge for Blackout
  var result = baseResult ? Object.assign({}, baseResult, {
    price: isBlackout ? Math.round(baseResult.price * 1.20) : baseResult.price
  }) : null;
  var rows='';
  var pRow = function(lbl,val,light) {
    rows+='<div style="display:flex;justify-content:space-between;font-size:12px;color:'+(light?'var(--text-faint)':'var(--text-dark)')+';padding:4px 0;border-bottom:.5px solid var(--border-dark)"><span>'+lbl+'</span><span style="color:var(--cream);font-weight:500">$'+val.toFixed(0)+'</span></div>';
  };

  if (!result) {
    box.innerHTML='<div style="font-size:12px;color:var(--gold)">⚠ Width or height exceeds standard sizes — custom quote required. Submit the form and Justin will price this for you.</div>';
    box.style.display='block'; return;
  }

  var shadeTotal = result.price * qty;
  var isOversized = result.oversized;
  var freight = isOversized ? (80 + Math.max(0,qty-1)*50) : (25 + Math.max(0,qty-1)*11);

  // Metal Fascia
  var valTotal = 0;
  var valRows = '';
  if (addVal && addVal.checked) {
    var vwEl = document.getElementById('pb-fascia-width');
    var vw = parseFloat((vwEl && vwEl.value) ? vwEl.value : w);
    var vp = _pbFasciaLookup(vw);
    valTotal = vp ? vp * qty : 0;
    if (vp) valRows = '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-dark);padding:4px 0;border-bottom:.5px solid var(--border-dark)"><span>Metal fascia ('+(vw)+'→'+_pbRoundUp(vw,PB_FASCIA_W)+'") × '+qty+'</span><span style="color:var(--cream);font-weight:500">$'+valTotal.toFixed(0)+'</span></div>';
    else valRows = '<div style="font-size:11px;color:var(--gold);padding:4px 0">Fascia width exceeds 144″ — quote required.</div>';
  }

  var grandTotal = shadeTotal + freight + valTotal;

  // Display: shade first, then valance, then freight
  pRow((isBlackout?'Blackout (+20%)':'Solar Screen')+' ('+w+'→'+result.rw+'" × '+h+'→'+result.rh+'") × '+qty, shadeTotal);
  rows += valRows;
  pRow((isOversized?'Oversized freight (over 90")':'Standard freight')+' — '+qty+' shade'+(qty>1?'s':''), freight, true);

  document.getElementById('pb-price-rows').innerHTML = rows;
  document.getElementById('pb-price-total').textContent = '$'+grandTotal.toFixed(0);
  var note = 'Dimensions rounded up to next standard size. ' +
    (isBlackout ? 'Blackout includes +20% upcharge. ' : '') +
    (isOversized ? 'Oversized freight: $80 first + $50 each additional. ' : 'Freight: $25 first + $11 each additional. ') +
    'Retail prices — installation quoted separately. Final confirmed at order.';
  document.getElementById('pb-price-note').textContent = note;
  box.style.display='block';

  // Line-by-line estimate panel
  var gPBs = function(id){ var b=document.querySelector('#'+id+' .pmm-opt.sel'); return b?b.textContent.trim():''; };
  var selLines = [
    { label:'Product',     value:'Custom Roller Shade' },
    { label:'Fabric type', value: fabType },
    { label:'Size',        value: w+'″ W × '+h+'″ H → '+result.rw+'″ × '+result.rh+'"' },
    { label:'Operation',   value: gPB('pb-grp-operation') || '—' },
    { label:'Fascia',      value: gPB('pb-grp-fascia') || '—' },
    { label:'End caps',    value: gPB('pb-grp-endcap') || '—' },
    { label:'Mount',       value: gPB('pb-grp-mount') || '—' },
    { label:'Quantity',    value: (parseInt(document.getElementById('pb-qty-inp').value)||1)+' shade(s)' },
    { label:'Freight',     value: isOversized ? 'Oversized rate ($80 first + $50 ea.)' : 'Standard ($25 first + $11 ea.)' }
  ];
  pbRenderEstimate('pb-price-box', selLines, grandTotal, '', function(checkout) {
    pbCollectItem('Custom Roller Shade', selLines, grandTotal, gPB('pb-grp-operation')==='Motorized');
    pbOpenCart();
    if (checkout) {
      setTimeout(function(){
        var f=document.getElementById('pb-cart-foot'); if(f) f.style.display='block';
      }, 150);
    }
  });
}

const PB_FABRICS = {
  'Blackout':      ['White','Black','Cream','Off-White','Gray','Charcoal'],
  'Solar Screen':  ['White','Black','Cream','Off-White','Gray','Charcoal']
};
function pbToggleFasciaColor(isMetal) {
  var lbl  = document.getElementById('pb-hw-color-label');
  var note = document.getElementById('pb-hw-color-note');
  if (lbl)  lbl.textContent  = isMetal ? 'Hardware & metal fascia color' : 'Hardware color';
  if (note) note.style.display = isMetal ? 'block' : 'none';
}
function pbToggleMotor(show) {
  var el = document.getElementById('pb-motor-system-wrap');
  if (el) el.style.display = show ? 'block' : 'none';
}
function pbToggleSolarOpts(show) {
  var el = document.getElementById('pb-solar-opts');
  if (el) el.style.display = show ? 'block' : 'none';
}
function pbShowFabricPicker(show) {
  var el = document.getElementById('pb-fabric-picker');
  if (el) el.style.display = show ? 'block' : 'none';
  if (show) pbRenderFabricColors();
}
function pbRenderFabricColors() {
  var typeBtn = document.querySelector('#pb-grp-fabric-type .opt-btn.sel');
  var type = typeBtn ? typeBtn.textContent.trim() : 'Linen Blend';
  var colors = PB_FABRICS[type] || [];
  var html = '<div style="display:flex;flex-wrap:wrap;gap:6px">';
  colors.forEach(function(c) {
    html += '<button class="opt-btn" style="font-size:11px;display:inline-flex;align-items:center" onclick="selOpt(this,\'pb-grp-fabric-color\')">' + colorDot(c) + c + '</button>';
  });
  html += '</div>';
  document.getElementById('pb-fabric-colors').innerHTML = html;
}

let rnSystemType   = 'standard';
let rnLiftType     = 'cord';
// ─── Norman Soluna Retail Pricing — Feb 2026 catalog (verified against PDF) ─
// Width cols: 24,30,36,42,48,54,60,66,72,78,84,90,96,108,120
// Height rows (fabric): 36,48,60,72,84,96,108,120,132,144  (PDF exact rows — round up)
// Height rows (solar):  36,48,60,72,84,96,108,120,132,144
const RN_W = [24,30,36,42,48,54,60,66,72,78,84,90,96,108,120];
const RN_H_FABRIC  = [36,48,60,72,84,96,108,120,132,144];
const RN_H_SOLAR   = [36,48,60,72,84,96,108,120,132,144];

// ─────────────────────────────────────────────────────────────────────
// Norman Soluna Retail Price Matrices — verified Feb 2026 catalog PDF
// All 7 matrices use exact PDF values. Height rounds UP to next row.
// ─────────────────────────────────────────────────────────────────────

// FABRIC PG1: Brook • Chelsea • Verona LF • Callie • Callie RD • Elements • Scarlett • Catalina
const RN_PG1_FABRIC = {
  36:  [278,299,323,341,367,389,412,446,476,529,558,587,617,672,731],
  48:  [301,328,353,377,406,440,471,518,549,609,647,679,713,780,843],
  60:  [325,353,384,420,462,497,537,587,628,692,733,772,803,868,927],
  72:  [349,383,422,467,509,555,600,659,703,770,803,842,873,944,1017],
  84:  [370,415,465,513,562,611,661,727,765,829,868,907,944,1023,1103],
  96:  [396,449,503,561,613,670,714,777,820,887,932,973,1017,1103,1189],
  108: [423,486,543,605,667,717,763,829,873,945,994,1042,1091,1181,1276],
  120: [454,520,591,650,708,759,809,878,932,1005,1055,1107,1157,1261,1359],
  132: [485,558,627,697,748,801,854,932,985,1066,1122,1173,1230,1341,1449],
  144: [513,593,668,730,785,842,898,983,1042,1123,1183,1243,1299,1417,1537]
};

// FABRIC PG2: Samoa • Phuket • Bora Bora • Sumatra • Java • Bali • Riviera • Lake Tahoe
//             Francis • Hayes • Valerie • Emery • Sierra • Shimmer • Amelia • Lola LF • Remy
//             Jamaica • Bermuda • Fiji • Francis RD • Amelia RD • Sheer (F0908) • Dazzle • Lakeshore
const RN_PG2_FABRIC = {
  36:  [254,273,291,312,333,351,371,401,429,474,500,526,551,601,652],
  48:  [274,298,318,345,368,397,422,464,495,547,576,608,639,697,750],
  60:  [296,318,346,377,414,448,482,526,566,620,655,690,717,774,826],
  72:  [313,345,382,420,457,497,538,591,628,689,717,749,779,841,903],
  84:  [336,375,418,462,503,546,592,648,683,737,774,806,841,909,982],
  96:  [357,406,453,501,549,598,639,696,730,791,828,866,903,982,1055],
  108: [383,437,488,544,594,640,677,737,779,842,885,923,968,1048,1130],
  120: [409,469,526,582,636,676,719,782,828,895,941,987,1030,1121,1207],
  132: [435,500,560,623,670,714,762,828,873,945,995,1042,1092,1188,1286],
  144: [462,530,596,649,701,750,802,871,923,997,1050,1103,1155,1255,1362]
};

// FABRIC PG3: Caroline • Aruba • Maui Natural • Cove • Breeze • Clarissa
//             Lola BO • Garden • Breeze RD • Remy RD • Summerland • Cory
const RN_PG3_FABRIC = {
  36:  [337,371,402,435,468,500,534,569,608,671,711,749,792,865,942],
  48:  [371,409,448,487,529,574,620,668,713,787,834,879,924,1021,1103],
  60:  [403,448,495,546,601,651,707,763,820,898,955,1011,1053,1148,1239],
  72:  [437,488,547,609,674,738,798,863,922,1010,1058,1112,1160,1267,1372],
  84:  [470,537,605,677,747,814,889,956,1014,1098,1155,1215,1268,1388,1504],
  96:  [508,582,664,742,820,898,969,1035,1095,1189,1251,1316,1380,1505,1637],
  108: [546,634,723,809,895,969,1041,1106,1179,1278,1349,1420,1488,1628,1770],
  120: [590,682,778,870,959,1035,1112,1187,1263,1365,1446,1521,1596,1750,1904],
  132: [629,733,835,933,1015,1098,1179,1263,1348,1457,1539,1621,1704,1873,2040],
  144: [669,779,892,988,1075,1160,1252,1342,1431,1549,1633,1725,1812,1995,2172]
};

// FABRIC PG4: Kendra (LF Foliage — single color)
const RN_PG4_FABRIC = {
  36:  [307,337,365,396,424,454,485,517,552,609,645,680,719,786,856],
  48:  [337,372,407,443,482,522,563,605,648,715,755,800,841,927,1002],
  60:  [366,407,449,497,545,594,643,693,745,817,868,918,957,1044,1126],
  72:  [398,444,498,554,613,671,725,782,839,917,964,1011,1054,1153,1247],
  84:  [428,487,549,617,677,740,809,869,920,999,1049,1103,1154,1261,1366],
  96:  [462,530,602,674,745,817,879,940,995,1081,1137,1195,1254,1367,1489],
  108: [497,575,656,734,813,879,944,1005,1071,1160,1226,1289,1352,1480,1608],
  120: [534,622,707,792,871,940,1011,1079,1148,1242,1314,1382,1451,1592,1731],
  132: [572,667,759,846,921,999,1071,1148,1225,1325,1398,1473,1549,1704,1852],
  144: [607,708,811,897,976,1054,1138,1219,1301,1407,1485,1569,1647,1812,1974]
};

// SOLAR PG1: Serene 7% • Flow 7% • Windsong 5% • NA400 3/5/10% • NA300 3/5%
const RN_PG1_SOLAR = {
  36:  [240,258,278,296,314,331,362,382,406,450,474,507,533,577,628],
  48:  [259,282,302,325,350,372,412,439,468,519,545,587,614,671,723],
  60:  [281,302,326,357,390,421,467,497,535,586,618,666,692,745,795],
  72:  [297,325,359,397,430,468,522,558,595,650,677,721,749,809,870],
  84:  [318,354,394,434,474,513,573,614,645,697,745,776,809,874,941],
  96:  [336,383,428,471,518,563,618,656,690,745,797,831,870,941,1015],
  108: [361,411,461,511,558,600,659,697,737,795,850,890,932,1007,1088],
  120: [387,440,495,546,597,635,697,739,780,844,903,949,990,1078,1160],
  132: [408,470,526,582,627,670,737,780,826,894,956,1002,1049,1141,1235],
  144: [434,498,561,609,659,703,777,823,872,940,1010,1061,1111,1206,1309]
};

// SOLAR PG2: Serene 1/3% • Flow 1/5% • Windsong 1% • Moon 5%
//            Breeze Screen 1/3% • NA300 1% • NA400 1% • NA820 3%
const RN_PG2_SOLAR = {
  36:  [261,283,306,325,346,367,406,428,454,503,530,571,600,652,711],
  48:  [284,309,334,357,384,416,462,495,526,581,617,660,692,761,818],
  60:  [307,334,361,396,434,468,525,561,600,658,699,748,779,842,898],
  72:  [328,359,398,439,477,522,587,627,671,733,766,817,846,918,986],
  84:  [351,390,437,483,527,574,645,693,728,791,842,877,918,992,1069],
  96:  [372,422,474,526,575,628,699,740,778,843,902,945,986,1069,1153],
  108: [399,456,510,571,624,672,745,791,831,902,966,1010,1055,1145,1235],
  120: [428,490,551,611,667,711,791,837,887,957,1023,1073,1123,1220,1317],
  132: [454,523,591,650,701,749,835,887,936,1014,1086,1139,1190,1297,1400],
  144: [483,554,626,684,737,789,877,935,990,1067,1146,1204,1258,1373,1488]
};

// SOLAR PG3: Lakeview 3/7/10% • Meadows 1/3% • Jubilee 3% • Galaxy 3%
const RN_PG3_SOLAR = {
  36:  [290,322,346,374,404,430,460,488,522,575,608,655,690,754,822],
  48:  [322,354,385,419,454,495,533,573,611,673,713,768,805,891,963],
  60:  [349,385,423,469,515,561,605,651,701,770,815,879,918,1000,1079],
  72:  [376,420,470,525,577,633,683,738,791,863,905,969,1013,1105,1194],
  84:  [406,462,519,579,641,699,762,818,868,940,1006,1057,1106,1206,1312],
  96:  [436,501,570,636,701,770,829,885,938,1017,1090,1146,1200,1313,1426],
  108: [469,544,620,693,766,829,890,945,1010,1091,1173,1236,1294,1417,1541],
  120: [503,587,668,745,821,885,950,1015,1080,1169,1256,1325,1389,1523,1657],
  132: [541,627,714,799,869,940,1010,1080,1152,1246,1341,1413,1482,1628,1772],
  144: [574,669,764,844,920,992,1070,1146,1222,1320,1422,1499,1576,1732,1888]
};
// Metal Fascia / Fascia surcharges by width (17 cols: 24–144")
const RN_VALANCE_W = [24,30,36,42,48,54,60,66,72,78,84,90,96,108,120,132,144];
const RN_SURCHARGE_FASCIA_WOOD  = [117,122,133,139,150,161,171,188,204,216,232,249,265,293,326,349,375];
const RN_SURCHARGE_FABRIC_SMALL = [133,139,155,161,171,183,199,216,232,249,271,288,304,342,375,403,431];
const RN_SURCHARGE_FABRIC_8     = [188,199,216,227,244,260,282,304,331,354,382,408,431,486,530,552,612];
const RN_SURCHARGE_RACEWAY      = [56,61,67,73,78,84,94,100,111,117,122,133,150,161,null,null];

// Map: collection name → price group (verified against Feb 2026 PDF catalog)
function rnGetPriceGroup() {
  const c = (currentRollerColl || '').toLowerCase();
  // SOLAR PG3: Lakeview • Meadows • Jubilee • Galaxy
  if (c.includes('lakeview')||c.includes('meadows')||c.includes('jubilee')||c.includes('galaxy')) return 3;
  // SOLAR PG1: Serene 7 • Flow 7 • Windsong 5 • NA400 3/5/10% • NA300 3/5%
  if (c.includes('serene 7')||c.includes('flow 7')||c.includes('windsong 5')||
      c.includes('na400 3')||c.includes('na400 5')||c.includes('na400 10')||
      c.includes('na300 3')||c.includes('na300 5')) return 1;
  // SOLAR PG2: Serene 1/3 • Flow 1/5 • Windsong 1 • Moon • Breeze Screen • NA300 1% • NA400 1% • NA820
  if (c.includes('serene 1')||c.includes('serene 3')||c.includes('flow 1')||c.includes('flow 5')||
      c.includes('windsong 1')||c.includes('moon')||c.includes('breeze screen')||
      c.includes('na300 1')||c.includes('na400 1')||c.includes('na820')||
      (rnFabricType==='commercial'&&(c.includes('1%')||c.includes('na820')))) return 2;
  // FABRIC PG4: Kendra only
  if (c.includes('kendra')) return 4;
  // FABRIC PG3: Caroline • Aruba • Maui • Cove • Breeze LF • Clarissa
  //             Lola BO • Garden • Breeze RD • Remy RD • Summerland • Cory
  if (c.includes('aruba')||c.includes('caroline')||c.includes('maui')||c.includes('cove')||
      c.includes('clarissa')||c.includes('breeze')||c.includes('lola bo')||
      c.includes('summerland')||c.includes('cory')||c.includes('garden')||
      c.includes('remy rd')) return 3;
  // FABRIC PG1: Brook • Chelsea • Verona LF • Callie • Callie RD • Elements • Scarlett • Catalina
  if (c.includes('brook')||c.includes('chelsea')||c.includes('callie')||
      c.includes('elements')||c.includes('verona')||c.includes('scarlett')||
      c.includes('catalina')) return 1;
  // Commercial solar default → PG1 (NA300/NA400 3/5/10%)
  if (rnFabricType === 'commercial') return 1;
  // FABRIC PG2: everything else (Samoa, Phuket, Bora Bora, Sumatra, Java, Bali, Riviera,
  //             Lake Tahoe, Francis, Hayes, Valerie, Emery, Sierra, Shimmer, Amelia,
  //             Lola LF, Remy, Jamaica, Bermuda, Fiji, Francis RD, Amelia RD, Sheer, Dazzle, Lakeshore)
  return 2;
}

function rnLookupPrice(w, h) {
  const pg = rnGetPriceGroup();
  const isSolar = (rnFabricType === 'solar' || rnFabricType === 'commercial');
  const hRows = isSolar ? RN_H_SOLAR : RN_H_FABRIC;
  const matrices = isSolar
    ? [null, RN_PG1_SOLAR, RN_PG2_SOLAR, RN_PG3_SOLAR, RN_PG3_SOLAR]
    : [null, RN_PG1_FABRIC, RN_PG2_FABRIC, RN_PG3_FABRIC, RN_PG4_FABRIC];

  const pW = RN_W.find(function(v){ return v >= w; });
  const pH = hRows.find(function(v){ return v >= h; });
  if (!pW || !pH) return null;

  const matrix = matrices[pg];
  if (!matrix || !matrix[pH]) return null;
  const wi = RN_W.indexOf(pW);
  const price = matrix[pH][wi];
  return { price: price || null, pricedAt: pW + '″ W × ' + pH + '″ H', group: pg };
}

const RN_MOTOR_UP  = 482;  // Norman Smart motor per shade (per April 2026 Norman price book)
const RN_MIN       = 85;   // minimum per shade

const RN_SYSTEM_NOTES = {
  standard:  'Standard: single shade per bracket set — most straightforward.',
  dual:      'Dual shade: two fabrics (front + back) in one headrail — sheer + room darkening is the most popular combo. Extra mounting depth required.',
  coupled2:  'Coupled 2: two panels linked, operated together. Must use same lift system. Center gap applies.',
  coupled3:  'Coupled 3: three panels linked. Two coupled surcharges apply.',
  coupled4:  'Coupled 4: four panels linked. Three coupled surcharges apply.',
  sidebyside:'Side-by-Side: independent shades installed adjacent. Separate operation. Gap rules apply.',
  dn:        'Day & Night: two fabrics in one headrail — sheer or light filtering on the day roll, room darkening on the night roll. Choose which roll faces the glass vs. the room.'
};
const RN_FABRIC_NOTES = {
  sheer:      'Sheer: minimal privacy, maximum view-through. Works with all standard systems.',
  lf:         'Light Filtering: diffused light, medium privacy. Works with all systems.',
  natural:    '⚠ Natural fabrics (bamboo, jute, paper blends) may show variation, bowing, fraying, color shift over time — these are normal material characteristics and not defects.',
  rd:         'Room Darkening: high privacy, coated backing. ⚠ Alone it still allows edge light gaps — add LightGuard 360™ in Step 7 for true blackout.',
  solar:      'Solar Screen: UV and glare control. Openness factor = % of light allowed through. ⚠ ±10% tolerance is industry standard — not a defect.',
  commercial: 'Commercial Solar (NA series): PVC/polyester construction rated for high UV environments. Same openness rules as residential solar.'
};

// ─── rnSetSystem ─────────────────────────────────────────────
function rnSetSystem(type) {
  rnSystemType = type;
  const note = document.getElementById('rn-system-note');
  if (note) note.textContent = RN_SYSTEM_NOTES[type] || '';

  const isDual = (type === 'dual' || type === 'dn');
  const singleBlock = document.getElementById('rn-single-fabric-block');
  const dualBlock   = document.getElementById('rn-dual-fabric');
  if (singleBlock) singleBlock.style.display = isDual ? 'none' : 'block';
  if (dualBlock)   dualBlock.style.display   = isDual ? 'block' : 'none';

  if (isDual) {
    // Pre-populate Day roll (sheer default) and Night roll (RD) on switch
    rnLoadDualFabrics('day',   'sheer');
    rnLoadDualFabrics('night', 'rd');
  }
}

// ─── rnLoadDualFabrics ───────────────────────────────────────
function rnLoadDualFabrics(roll, fabType) {
  const summaryId = roll === 'day' ? 'rn-day-summary' : 'rn-night-summary';
  const gridId    = roll === 'day' ? 'rn-day-grid'    : 'rn-night-grid';
  const summaryEl = document.getElementById(summaryId);
  const gridEl    = document.getElementById(gridId);
  if (!summaryEl || !gridEl) return;

  const colls = SOLUNA_COLLECTIONS[fabType] || [];
  const label = RN_FABRIC_LABELS[fabType] || fabType;

  if (!colls.length) {
    summaryEl.textContent = '';
    gridEl.innerHTML = '<div class="tooltip-note">Fabric options coming soon.</div>';
    return;
  }

  const shown = colls.slice(0, 5).map(function(c){ return c.name; }).join(', ');
  const extra = colls.length > 5 ? ' +' + (colls.length - 5) + ' more' : '';
  summaryEl.textContent = label + ' collections: ' + shown + extra;

  let btns = '';
  colls.forEach(function(coll, ci) {
    if (coll.colors.length) {
      coll.colors.forEach(function(color, ki) {
        btns += '<button class="opt-btn" style="font-size:11px" onclick="selDualFabric(this,\'' + roll + '\',' + ci + ',' + ki + ',\'' + fabType + '\')">'
              + coll.name + ' – ' + color + '</button>';
      });
    } else {
      btns += '<button class="opt-btn" style="font-size:11px;opacity:0.65" onclick="selDualFabric(this,\'' + roll + '\',' + ci + ',-1,\'' + fabType + '\')">'
            + coll.name + '</button>';
    }
  });
  gridEl.innerHTML = '<div style="display:flex;flex-wrap:wrap;gap:6px">' + btns + '</div>';
}

function selDualFabric(el, roll, ci, ki, fabType) {
  const gridId = roll === 'day' ? 'rn-day-grid' : 'rn-night-grid';
  document.querySelectorAll('#' + gridId + ' .opt-btn').forEach(function(b) { b.classList.remove('sel'); });
  el.classList.add('sel');
  const colls = SOLUNA_COLLECTIONS[fabType] || [];
  const coll  = colls[ci];
  if (!coll) return;
  if (roll === 'day') {
    currentRollerColl  = coll.name;
    currentRollerColor = ki >= 0 ? coll.colors[ki] : '';
  }
}

// ─── cellDnRender ─────────────────────────────────────────────
function cellDnRender(position, fabType) {
  const gridId    = position === 'top' ? 'cell-dn-top-grid'    : 'cell-dn-bottom-grid';
  const gridEl    = document.getElementById(gridId);
  if (!gridEl) return;

  const colls = CELL_COLLECTIONS[fabType] || [];
  if (!colls.length) {
    gridEl.innerHTML = '<div class="tooltip-note">Color options coming soon.</div>';
    return;
  }

  let html = '';
  colls.forEach(function(coll, ci) {
    if (coll.colors.length) {
      if (coll.name) html += '<div style="font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#888;margin:8px 0 4px">' + coll.name + '</div>';
      html += '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:2px">';
      coll.colors.forEach(function(color, ki) {
        const isObj = color && typeof color === 'object';
        const cName = isObj ? color.n : color;
        const cCode = isObj ? color.c : '';
        const dot   = colorDot(cName);
        const codeTxt = cCode ? ' <span style="font-size:9px;color:#aaa">' + cCode + '</span>' : '';
        html += '<button class="opt-btn" style="font-size:11px;display:inline-flex;align-items:center" onclick="selCellDnFabric(this,\'' + position + '\',' + ci + ',' + ki + ',\'' + fabType + '\')">'
              + dot + cName + codeTxt + '</button>';
      });
      html += '</div>';
    } else {
      html += '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:2px"><button class="opt-btn" style="font-size:11px;opacity:0.65" onclick="selCellDnFabric(this,\'' + position + '\',' + ci + ',-1,\'' + fabType + '\')">'
            + coll.name + '</button></div>';
    }
  });
  gridEl.innerHTML = html;
}

function selCellDnFabric(el, position, ci, ki, fabType) {
  const gridId = position === 'top' ? 'cell-dn-top-grid' : 'cell-dn-bottom-grid';
  document.querySelectorAll('#' + gridId + ' .opt-btn').forEach(function(b) { b.classList.remove('sel'); });
  el.classList.add('sel');
}

// ─── selRnFabric ─────────────────────────────────────────────
// Handles click on fabric card (visual selection + logic)
function selRnFabric(el, type) {
  document.querySelectorAll('.rn-fabric-card').forEach(function(c) {
    c.classList.remove('rn-fc-sel');
  });
  el.classList.add('rn-fc-sel');
  rnSetFabric(type);
}

// ─── rnSetFabric ─────────────────────────────────────────────
function rnSetFabric(type) {
  rnFabricType = type;
  document.getElementById('rn-solar-opts').style.display =
    (type === 'solar' || type === 'commercial') ? 'block' : 'none';
  const rdNote = document.getElementById('rn-rd-note');
  if (rdNote) rdNote.style.display = type === 'rd' ? 'block' : 'none';
  const noteEl = document.getElementById('rn-fabric-note');
  if (noteEl) noteEl.textContent = RN_FABRIC_NOTES[type] || '';
  rnRunValidation();
  rnUpdatePrice();
  renderFlatFabricGrid('roller');
}

// ─── rnSetFabricWidth ────────────────────────────────────────
function rnSetFabricWidth(w) {
  rnFabricWidth = w;
  const inp = document.getElementById('rn-width');
  if (inp) inp.max = w;
  const note = document.getElementById('rn-width-note');
  if (note) note.textContent = 'Max shade width: ' + w + '″ (selected fabric roll width)';
  rnRunValidation();
  rnUpdatePrice();
}

// ─── rnSetLift ───────────────────────────────────────────────
function rnSetLift(type) {
  rnLiftType = type;
  const motorWrap = document.getElementById('rn-motor-wrap');
  if (motorWrap) {
    motorWrap.style.display = type === 'motor' ? 'block' : 'none';
    if (type === 'motor') {
      if (typeof normanMotorSection === 'function') normanMotorSection('rn-norman-motor-section', 'Norman Roller Shade');
    }
  }

  // Chain/cord control + color options only apply when Cord Loop is selected
  const isCordLoop = type === 'cord';
  var ctrlSection = document.getElementById('rn-control-section');
  if (ctrlSection) ctrlSection.style.display = isCordLoop ? 'block' : 'none';
  var chainWrap = document.getElementById('rn-chain-color-wrap');
  var cordWrap  = document.getElementById('rn-cord-color-wrap');
  if (!isCordLoop) {
    if (chainWrap) chainWrap.style.display = 'none';
    if (cordWrap)  cordWrap.style.display  = 'none';
  } else {
    // Show chain color picker for chain loop lift (metal chain is the control)
    if (chainWrap) chainWrap.style.display = 'block';
  }

  const liftNotes = {
    cordless: 'PrecisionLift™ Cordless: child & pet safe, no exposed chain. Max width varies by fabric weight — not recommended for oversized or very heavy shades.',
    cord:     'Continuous Cord Loop: handles large widths & heavy fabrics. Child-safe tensioner required. Choose chain or cord control below.',
    smart:    'SmartRelease™: controlled soft descent. Requires compatible raceway/cassette. Has surcharge.',
    motor:    'Motorized: required for large shades, hard-to-reach windows, dual & coupled systems. Battery or hardwired options available.'
  };
  const note = document.getElementById('rn-lift-note');
  if (note) note.textContent = liftNotes[type] || '';
  rnRunValidation();
  rnUpdatePrice();
}

// ════════════════════════════════════════════════════════════════
// SOLUNA COLOR COORDINATION RULE ENGINE (Norman 2026 spec)
// ════════════════════════════════════════════════════════════════

const COLOR_OPTIONS = {
  standardHardware:      ["White", "Cottage White", "Black", "Silver"],
  beadChain:             ["White", "Cottage White", "Black", "Silver", "Chocolate", "Stainless Steel"],
  fasciaPlain:           ["White", "Cottage White", "Black", "Anodized Silver"],
  plainHemBar:           ["White", "Cottage White", "Black", "Anodized Silver"],
  fabricWrappedEndCaps:  ["White", "Cottage White", "Black", "Silver", "Chocolate"],
  chargingPort:          ["White", "Cottage White", "Black", "Silver", "Chocolate"],
  lightGuard360:         ["White", "Cottage White", "Black", "Silver", "Bronze"],
  cassette:              ["White", "Cottage White", "Black", "Silver"]
};

const SYSTEM_RULES = {
  standardHardware: {
    description: "Standard hardware includes brackets, raceway, end plugs, clutch, bracket covers, tension dial, and back of fabric-wrapped hem bar.",
    defaultBasedOnFabric: true, overrideAvailable: true,
    options: COLOR_OPTIONS.standardHardware,
    notes: [
      "Silver is optional only when hardware is exposed (no raceway or valance).",
      "Raceway mounting brackets are nickel-plated by default — cannot be color overridden.",
      "Norman Smart Motor button box and wire connector box are white when bracket color is Silver."
    ]
  },
  beadChain: {
    description: "Plastic bead chain and required tension device.",
    defaultBasedOnFabric: true, overrideAvailable: true,
    options: COLOR_OPTIONS.beadChain,
    rules: [
      "Tension device is required and cannot be removed.",
      "Tension device color coordinates with selected bead chain color.",
      "If Stainless Steel chain is selected, tension device coordinates with standard hardware color."
    ]
  },
  squareFascia: {
    validShapes: ["Square"], validMaterials: ["Metal", "Fabric Wrapped"],
    colorOptions: { metal: ["White", "Cottage White", "Black", "Anodized Silver"], fabricWrapped: "Fabric selected by user" },
    rules: ["Square fascia may be metal or fabric wrapped.", "Anodized Silver available for plain square fascia.", "Metal fascia is square only."]
  },
  curvedFascia: {
    validShapes: ["Curved"], validMaterials: ["Fabric Wrapped"],
    colorOptions: { fabricWrapped: "Fabric selected by user", endCaps: COLOR_OPTIONS.fabricWrappedEndCaps },
    rules: ["Curved fascia must be fabric wrapped.", "Curved metal fascia is not allowed.", "End caps use Color Coordination 2 options."]
  },
  plainHemBar: {
    validOptions: ["Fabric Wrapped", "Sealed Pocket"],
    colorOptions: { plain: ["White", "Cottage White", "Black", "Anodized Silver"], fabricWrappedEndCaps: COLOR_OPTIONS.fabricWrappedEndCaps },
    rules: [
      "Fabric-wrapped hem bar: front = selected fabric, back = standard hardware color.",
      "End caps for fabric-wrapped hem bar use Color Coordination 2.",
      "Anodized Silver available for plain hem bar."
    ]
  },
  chargingPort: {
    appliesWhen: ["Motorized", "Rechargeable Battery"], overrideAvailable: true,
    options: COLOR_OPTIONS.chargingPort,
    rules: ["Show only for rechargeable motorized shades.", "Default follows fabric color coordination.", "User may override using Color Coordination 2 options."]
  },
  dualShade: {
    rules: [
      "Standard Hardware Color Coordination 1 override is disabled on dual shades.",
      "Raceway, brackets, and bracket covers match front shade color coordination.",
      "Clutch, end plug, chain match the fabric of that individual shade.",
      "Use Special Instructions for custom color overrides."
    ]
  },
  lightGuard360: {
    colorOptions: COLOR_OPTIONS.lightGuard360,
    rules: ["Housing color must be selected manually.", "Fabric Color Coordination 1 and 2 do not apply.", "Standard hardware is black.", "LG360 must not use default fabric coordination."]
  },
  cassetteSystem: {
    colorOptions: COLOR_OPTIONS.cassette,
    rules: [
      "Cassette color must be selected manually.",
      "Cassette selection determines color coordination for plain hem bars.",
      "Fabric Color Coordination 1 and 2 only apply to end caps for fabric-wrapped hem bar and bead chain for CCL.",
      "Standard hardware is black."
    ]
  }
};

function getAvailableColorOptions(config) {
  const { systemType, fasciaShape, fasciaMaterial, hemBarType, operatingSystem, motorType, isDualShade } = config;
  if (isDualShade) return { warning: "Dual shade: standard hardware override disabled. Use Special Instructions.", rules: SYSTEM_RULES.dualShade.rules };
  if (systemType === "LightGuard 360") return { colorOptions: SYSTEM_RULES.lightGuard360.colorOptions, rules: SYSTEM_RULES.lightGuard360.rules };
  if (systemType === "Cassette")       return { colorOptions: SYSTEM_RULES.cassetteSystem.colorOptions, rules: SYSTEM_RULES.cassetteSystem.rules };
  if (fasciaShape === "Square" && fasciaMaterial === "Metal")           return { fasciaColors: SYSTEM_RULES.squareFascia.colorOptions.metal, rules: SYSTEM_RULES.squareFascia.rules };
  if (fasciaShape === "Square" && fasciaMaterial === "Fabric Wrapped")  return { fasciaColor: "Fabric selected by user", endCapColors: COLOR_OPTIONS.fabricWrappedEndCaps, rules: SYSTEM_RULES.squareFascia.rules };
  if (fasciaShape === "Curved") return { fasciaColor: "Fabric selected by user", endCapColors: COLOR_OPTIONS.fabricWrappedEndCaps, rules: SYSTEM_RULES.curvedFascia.rules };
  if (hemBarType === "Fabric Wrapped") return { hemBarFront: "Fabric selected by user", hemBarBack: "Standard hardware coordination", endCapColors: COLOR_OPTIONS.fabricWrappedEndCaps, rules: SYSTEM_RULES.plainHemBar.rules };
  if (operatingSystem === "Motorized" && motorType === "Rechargeable Battery") return { chargingPortColors: COLOR_OPTIONS.chargingPort, rules: SYSTEM_RULES.chargingPort.rules };
  return { standardHardwareColors: COLOR_OPTIONS.standardHardware, beadChainColors: COLOR_OPTIONS.beadChain, rules: [...SYSTEM_RULES.standardHardware.notes, ...SYSTEM_RULES.beadChain.rules] };
}

function validateSolunaColorConfig(config) {
  const errors = [];
  if (config.fasciaShape === "Flat")                                              errors.push("Flat fascia is not a valid Soluna option.");
  if (config.fasciaShape === "Curved" && config.fasciaMaterial === "Metal")       errors.push("Curved fascia must be fabric wrapped — curved metal is not allowed.");
  if (config.fasciaMaterial === "Metal" && config.fasciaShape !== "Square")       errors.push("Metal fascia is only available as square fascia.");
  if (config.operatingSystem === "Continuous Cord Loop" && config.tensionDevice === false)   errors.push("Safety tension device is required for continuous cord loop — cannot be removed.");
  if (config.systemType === "LightGuard 360" && config.usesFabricDefaultColor)   errors.push("LightGuard 360 requires manual housing color selection — fabric defaults do not apply.");
  if (config.systemType === "Cassette" && !config.cassetteColor)                 errors.push("Cassette color must be selected.");
  return { valid: errors.length === 0, errors };
}

// ─── rnBuildConfig ───────────────────────────────────────────
// Reads current UI state → builds config object for rule engine
function rnBuildConfig() {
  const g = function(id) { const b = document.querySelector('#' + id + ' .opt-btn.sel, #' + id + ' .rn-fc-sel .rn-fc-name'); return b ? b.textContent.trim() : ''; };
  const hrBtn = document.querySelector('#rn-grp-headrail .opt-btn.sel');
  const hrText = hrBtn ? hrBtn.textContent.trim() : 'Open Roll';
  const isPremium = document.getElementById('rn-premium-hw').style.display !== 'none';

  return {
    systemType:         hrText.includes('Cassette') ? 'Cassette' : hrText.includes('Fascia') ? 'Fascia' : 'Open Roll',
    lightGuard:         (document.querySelector('#rn-grp-lg .opt-btn.sel') || {}).textContent || 'None',
    fasciaShape:        g('rn-grp-fascia-shape'),
    fasciaMaterial:     g('rn-grp-fascia-mat'),
    hemBarType:         g('rn-grp-hem-type'),
    operatingSystem:    rnLiftType === 'motor' ? 'Motorized' : rnLiftType === 'cord' ? 'Continuous Cord Loop' : 'Cordless',
    motorType:          'Battery / Wired (TBD)',
    isDualShade:        rnSystemType === 'dual' || rnSystemType === 'dn',
    tensionDevice:      true,         // always required
    cassetteColor:      'Standard',   // defaults to standard — cassette color confirmed at order
    usesFabricDefaultColor: !isPremium,
    premiumFinish:      isPremium ? g('rn-grp-premium-finish') : null
  };
}

// ─── Premium hardware color mapping (Norman Soluna 2026 spec) ─
const PREMIUM_FINISH_MAP = {
  bronze: { bracket: 'Bronze',       hem: 'Bronze',       chain: 'Chocolate', motor: 'Black' },
  black:  { bracket: 'Brushed Black', hem: 'Brushed Black', chain: 'Black',     motor: 'Black' },
  brass:  { bracket: 'Brass',         hem: 'Brass',         chain: 'Brass',     motor: 'White' },
  silver: { bracket: 'Matte Silver',  hem: 'Matte Silver',  chain: 'Silver',    motor: 'White' },
  white:  { bracket: 'White',         hem: 'White',         chain: 'White',     motor: 'White' }
};

function rnSetPremiumFinish(finish) {
  const m = PREMIUM_FINISH_MAP[finish];
  if (!m) return;
  document.getElementById('rn-ps-bracket').textContent = m.bracket;
  document.getElementById('rn-ps-hem').textContent     = m.hem;
  document.getElementById('rn-ps-chain').textContent   = m.chain + ' (tensioner matches)';
  // Motor accessories row shown only if motorized
  if (rnLiftType === 'motor') {
    document.getElementById('rn-ps-motor-row').style.display = 'block';
    document.getElementById('rn-ps-motor').textContent       = m.motor;
  }
  document.getElementById('rn-premium-summary').style.display = 'block';
}

// ─── rnSwitchHardwareMode ────────────────────────────────────
// Open Roll → Premium Hardware / Fascia|Cassette|LightGuard → Standard Hardware
function rnSwitchHardwareMode(mode) {
  // mode: 'premium' or 'standard'
  document.getElementById('rn-premium-hw').style.display  = mode === 'premium'  ? 'block' : 'none';
  document.getElementById('rn-standard-hw').style.display = mode === 'standard' ? 'block' : 'none';
}

// ─── rnSetFasciaShape ────────────────────────────────────────
// Curved = ALWAYS Fabric Wrapped (auto-select + disable Metal)
// Square = Metal OR Fabric Wrapped (both enabled)
function rnSetFasciaShape(shape) {
  const metalBtn  = document.getElementById('rn-fascia-metal-btn');
  const matBtns   = document.querySelectorAll('#rn-grp-fascia-mat .opt-btn');
  const note      = document.getElementById('rn-fascia-rule-note');
  // Defer price update until after state is set
  setTimeout(rnUpdatePrice, 0);

  if (shape === 'curved') {
    // Force Fabric Wrapped, disable Metal
    matBtns.forEach(function(b) {
      b.classList.remove('sel');
      if (b.textContent.trim() === 'Fabric Wrapped') b.classList.add('sel');
      if (b.id === 'rn-fascia-metal-btn') {
        b.disabled = true;
        b.style.opacity = '0.35';
        b.style.cursor  = 'not-allowed';
      }
    });
    if (note) note.innerHTML = '<strong>Curved fascia = Fabric Wrapped only</strong> — aluminum base with fabric cover. Metal finish is not available on curved shapes.';
  } else {
    // Square — re-enable Metal option
    matBtns.forEach(function(b) {
      b.disabled = false;
      b.style.opacity = '1';
      b.style.cursor  = 'pointer';
    });
    if (note) note.innerHTML = 'Square fascia: <strong>Metal</strong> (standard) or <strong>Fabric Wrapped</strong>. Both options available.';
  }
}

// ─── rnSetFasciaMat ──────────────────────────────────────────
// Metal = Square ONLY (auto-select Square, disable Curved)
// Fabric Wrapped = Square OR Curved (both enabled)
function rnSetFasciaMat(mat) {
  const shapeBtns = document.querySelectorAll('#rn-grp-fascia-shape .opt-btn');
  const note      = document.getElementById('rn-fascia-rule-note');

  if (mat === 'metal') {
    // Force Square, disable Curved
    shapeBtns.forEach(function(b) {
      b.classList.remove('sel');
      if (b.textContent.trim() === 'Square') b.classList.add('sel');
      if (b.textContent.trim() === 'Curved') {
        b.disabled = true;
        b.style.opacity = '0.35';
        b.style.cursor  = 'not-allowed';
      }
    });
    if (note) note.innerHTML = '<strong>Metal fascia = Square shape only.</strong> Curved shape requires Fabric Wrapped material.';
  } else {
    // Fabric Wrapped — re-enable all shapes
    shapeBtns.forEach(function(b) {
      b.disabled = false;
      b.style.opacity = '1';
      b.style.cursor  = 'pointer';
    });
    if (note) note.innerHTML = 'Fabric Wrapped fascia available in Square or Curved shape. Fabric-wrapped fascias have max width limits — confirmed at order.';
  }
  setTimeout(rnUpdatePrice, 0);
}

// ─── rnSetHeadrail ───────────────────────────────────────────
function rnSetHeadrail(type) {
  // Show/hide sub-options
  document.getElementById('rn-fascia-opts').style.display   = type === 'fascia'   ? 'block' : 'none';
  document.getElementById('rn-cassette-opts').style.display = type === 'cassette' ? 'block' : 'none';
  // Note
  const notes = {
    open:     'Open Roll: exposed tube, most compact profile. Brackets are visible. Not compatible with LightGuard 360™.',
    fascia:   'Fascia System: covers the tube with a decorative front panel. Choose shape and material below.',
    cassette: 'Cassette System: fully enclosed headrail. Required for LightGuard 360™ and most room-darkening/blackout setups.'
  };
  const n = document.getElementById('rn-headrail-note');
  if (n) n.textContent = notes[type] || '';
  // Premium Hardware only available with Open Roll
  rnSwitchHardwareMode(type === 'open' ? 'premium' : 'standard');

  // If LightGuard 360 is selected but headrail changes away from cassette → deselect LG360
  const lgBtn = document.querySelector('#rn-grp-lg .opt-btn.sel');
  if (lgBtn && lgBtn.textContent.includes('360') && type !== 'cassette') {
    lgBtn.classList.remove('sel');
    document.querySelector('#rn-grp-lg .opt-btn').classList.add('sel');
    document.getElementById('rn-lg-note').style.display = 'none';
  }
  rnRunValidation();
  setTimeout(rnUpdatePrice, 0);
}

// ─── rnSetControl ────────────────────────────────────────────
function rnSetControl(type) {
  document.getElementById('rn-chain-color-wrap').style.display = type === 'chain' ? 'block' : 'none';
  document.getElementById('rn-cord-color-wrap').style.display  = type === 'cord'  ? 'block' : 'none';
  const note = document.getElementById('rn-control-note');
  if (note) {
    note.textContent = type === 'cord'
      ? 'Cord loop (clutch): pairs with Continuous Cord Loop lift system. Color options are more limited than metal chain.'
      : 'Metal chain: standard for most systems. Wide color selection. Plastic bead or stainless steel available.';
  }
}

// ─── rnSetLG ─────────────────────────────────────────────────
function rnSetLG(type) {
  const note = document.getElementById('rn-lg-note');
  if (note) note.style.display = type === '360' ? 'block' : 'none';
  if (type === '360') {
    // LightGuard 360 requires Cassette — auto-switch headrail
    const hrBtn = document.querySelector('#rn-grp-headrail .opt-btn.sel');
    if (hrBtn && !hrBtn.textContent.includes('Cassette')) {
      document.querySelectorAll('#rn-grp-headrail .opt-btn').forEach(function(b) {
        b.classList.remove('sel');
        if (b.textContent.includes('Cassette')) { b.classList.add('sel'); rnSetHeadrail('cassette'); }
      });
    }
    // LightGuard 360 → Standard Hardware (not Premium)
    rnSwitchHardwareMode('standard');
  }
  rnRunValidation();
}

// ─── rnRunValidation ─────────────────────────────────────────
// Implements the validateSolunaShade logic from the Soluna 2026 spec
function rnRunValidation() {
  const errors = [], warnings = [];
  const w   = parseFloat((document.getElementById('rn-width')  || {}).value);
  const h   = parseFloat((document.getElementById('rn-height') || {}).value);
  const lgSel = document.querySelector('#rn-grp-lg .opt-btn.sel');
  const lgType = lgSel ? lgSel.textContent.trim() : 'None';

  const RN_MAX_FABRIC_W = 118;
  if (w && w > RN_MAX_FABRIC_W) {
    errors.push('Shade width (' + w + '″) exceeds maximum available fabric width (118″). Split into Side-by-Side or Coupled configuration.');
  } else if (w && rnFabricType === 'natural' && w > 96) {
    errors.push('Natural fabrics are available up to 96″ wide (some collections only 78″). Choose a narrower shade or a different fabric type.');
  }
  if (h && rnFabricType === 'natural' && h > 120) {
    errors.push('Some natural fabrics (e.g. Maui Natural) have a maximum fabric height of 120″.');
  }
  if (rnLiftType === 'cordless' && w && w > 72) {
    warnings.push('Cordless lift may not support widths over ~72″ depending on fabric weight. Consider Continuous Cord Loop or Motorized.');
  }
  if (lgType === 'LightGuard 360™' && rnFabricType !== 'rd') {
    errors.push('LightGuard 360™ requires Room Darkening fabric to be effective. Select Room Darkening in Step 2.');
  }
  if (rnSystemType === 'dual' || rnSystemType === 'dn') {
    warnings.push('Dual / Day & Night shades require extra mounting depth — confirm depth at order. Price calculated as two individual shades.');
    if (rnLiftType === 'motor') {
      warnings.push('Dual shade + Motorized: Rechargeable Battery with Charging Wand is NOT available. Power source must be AC Adapter or DC Low Voltage. Confirmed at order.');
    }
  }
  // Cassette + motorized: charging wand not available
  const headrailSel = document.querySelector('#rn-grp-headrail .opt-btn.sel');
  if (headrailSel && headrailSel.textContent.includes('Cassette') && rnLiftType === 'motor') {
    warnings.push('Cassette System + Motorized: Rechargeable Battery with Charging Wand is NOT available. Power source must be AC Adapter Charger or DC Low Voltage.');
  }
  // Day & Night (dual roller) 3:1 height-to-width ratio limit per Norman spec
  if ((rnSystemType === 'dn') && w && h && h > w * 3) {
    errors.push('Day & Night shades cannot exceed a 3:1 height-to-width ratio (height must be ≤ 3× width) because of telescoping mechanism. Current ratio: ' + (h/w).toFixed(1) + ':1. Reduce height or increase width.');
  }
  if (['coupled2','coupled3','coupled4'].includes(rnSystemType)) {
    warnings.push('Coupled shades must use the same lift system. Center gaps and alignment tolerance may be visible. Surcharge applies per linked section.');
  }
  if (rnFabricType === 'natural') {
    warnings.push('Natural fabrics may show variation, bowing, fraying, shrinkage, stretching, or color change over time. These are normal material characteristics — not defects.');
  }
  if (rnFabricType === 'rd') {
    warnings.push('Room Darkening fabrics may show temporary creases or dents near the roller tube, especially after shipping or when left partially raised. Leave fully lowered to resolve.');
  }
  if (rnFabricType === 'solar' || rnFabricType === 'commercial') {
    warnings.push('Solar openness tolerance is approximately ±10%. Actual visibility and glare control will vary by lighting conditions.');
  }

  // Run the color coordination rule engine
  const colorResult = validateSolunaColorConfig(rnBuildConfig());
  colorResult.errors.forEach(function(e) { errors.push(e); });

  const alertEl = document.getElementById('rn-compat-alerts');
  if (!alertEl) return;
  if (!errors.length && !warnings.length) { alertEl.innerHTML = ''; return; }
  alertEl.innerHTML =
    errors.map(e => '<div style="background:#FEF2F2;border:1px solid #FCA5A5;border-radius:8px;padding:10px 14px;font-size:11px;color:#B91C1C;line-height:1.6;margin-bottom:6px">⚠ ' + e + '</div>').join('') +
    warnings.map(w => '<div style="background:#FFFBEB;border:1px solid #FCD34D;border-radius:8px;padding:10px 14px;font-size:11px;color:#92400E;line-height:1.6;margin-bottom:6px">ℹ ' + w + '</div>').join('');
}

// ─── rnUpdatePrice ───────────────────────────────────────────
function rnUpdatePrice() {
  const w   = parseFloat((document.getElementById('rn-width')  || {}).value);
  const h   = parseFloat((document.getElementById('rn-height') || {}).value);
  const qty = parseInt((document.getElementById('rn-qty')      || {}).value) || 1;
  const isMotor = rnLiftType === 'motor';

  const warn = document.getElementById('rn-size-warning');

  // Auto-compute compatible fabric widths from entered shade width
  const RN_ALL_WIDTHS = [78, 94.5, 96, 110, 118];
  const compatWidths  = w ? RN_ALL_WIDTHS.filter(function(fw){ return fw >= w; }) : [];
  const autoFabricW   = compatWidths.length ? compatWidths[0] : null;
  rnFabricWidth       = autoFabricW || 118; // used by validation

  const fwBox   = document.getElementById('rn-fw-compat');
  const fwPills = document.getElementById('rn-fw-pills');
  const fwNote  = document.getElementById('rn-fw-note');

  if (w && fwBox && fwPills) {
    fwBox.style.display = 'block';
    fwPills.innerHTML = RN_ALL_WIDTHS.map(function(fw) {
      const ok = fw >= w;
      return '<span class="rn-fw-pill' + (ok ? '' : ' unavail') + '">' + fw + '″</span>';
    }).join('');
    if (compatWidths.length === 0) {
      fwNote.textContent = '⚠ Shade width exceeds all standard fabric widths (max 118″). Use Side-by-Side or Coupled configuration.';
      fwNote.style.color = '#DC2626';
    } else {
      fwNote.textContent = 'Minimum fabric width needed: ' + compatWidths[0] + '″. Final collection availability confirmed at order.';
      fwNote.style.color = '#555';
    }
  } else if (fwBox) {
    fwBox.style.display = 'none';
  }

  if (w && compatWidths.length === 0 && warn) {
    warn.style.display = 'block';
    warn.textContent = '⚠ Width ' + w + '″ exceeds all standard fabric widths (max 118″). Consider Side-by-Side or Coupled.';
  } else if (warn) {
    warn.style.display = 'none';
  }

  document.getElementById('rn-pb-fabric').textContent = {
    sheer:'Sheer', lf:'Light Filtering', natural:'Natural',
    rd:'Room Darkening', solar:'Solar Screen', commercial:'Commercial Solar'
  }[rnFabricType] || rnFabricType;
  document.getElementById('rn-pb-qty').textContent = qty;

  if (!w || !h) {
    document.getElementById('rn-pb-dims').textContent = 'Enter width & height';
    document.getElementById('rn-pb-sqft').textContent = '—';
    document.getElementById('rn-pb-base').textContent = '—';
    document.getElementById('rn-pb-total').textContent = '—';
    if (isMotor) { document.getElementById('rn-pb-motor-row').style.display = 'flex'; document.getElementById('rn-pb-motor').textContent = '+$' + RN_MOTOR_UP + '/shade'; }
    else { document.getElementById('rn-pb-motor-row').style.display = 'none'; }
    return;
  }

  const sqft      = (w / 12) * (h / 12);
  const lookup    = rnLookupPrice(w, h);
  const basePrice = lookup ? lookup.price : null;
  const perShade  = basePrice ? Math.max(RN_MIN, basePrice) : null;
  const motorCost = isMotor ? RN_MOTOR_UP * qty : 0;

  // ── Headrail / fascia surcharge ──────────────────────────────
  var hrBtn2     = document.querySelector('#rn-grp-headrail .opt-btn.sel');
  var hrType     = hrBtn2 ? hrBtn2.textContent.trim() : 'Open Roll';
  var hrSurcharge = 0;
  var hrLabel    = 'Open Roll';
  var hrDisplay  = 'Open Roll — included';
  var fascRW     = _pbRoundUp(w, PB_FASCIA_W);
  var fascIdx    = fascRW ? PB_FASCIA_W.indexOf(fascRW) : -1;

  if (hrType.includes('Fascia') && fascIdx >= 0) {
    var shapeBtn = document.querySelector('#rn-grp-fascia-shape .opt-btn.sel');
    var matBtn   = document.querySelector('#rn-grp-fascia-mat .opt-btn.sel');
    var shape    = shapeBtn ? shapeBtn.textContent.trim() : 'Square';
    var mat      = matBtn   ? matBtn.textContent.trim()   : 'Metal';
    hrSurcharge  = PB_FASCIA_P[fascIdx];
    hrLabel      = shape + ' Fascia' + (mat === 'Fabric Wrapped' ? ' (Fabric)' : '');
    hrDisplay    = hrLabel + ': +$' + hrSurcharge.toLocaleString();
  } else if (hrType.includes('Cassette') && fascIdx >= 0) {
    hrSurcharge  = PB_CASSETTE_P[fascIdx];
    hrLabel      = 'Cassette';
    hrDisplay    = 'Cassette: +$' + hrSurcharge.toLocaleString();
  }

  // ── Headrail display ───────────────────────────────────────
  var hrLblEl = document.getElementById('rn-pb-headrail-label');
  var hrValEl = document.getElementById('rn-pb-headrail');
  if (hrLblEl) hrLblEl.textContent = hrLabel;
  if (hrValEl) hrValEl.textContent = hrDisplay;

  // ── System type surcharge ──────────────────────────────────
  var sysBtn    = document.querySelector('#rn-grp-system .opt-btn.sel');
  var sysText   = sysBtn ? sysBtn.textContent.trim() : 'Standard Roller';
  var sysSur    = 0;
  var sysRow    = document.getElementById('rn-pb-system-row');
  var sysSurEl  = document.getElementById('rn-pb-system');
  var sysLblEl  = document.getElementById('rn-pb-system-label');
  if (sysText.includes('Dual'))      { sysSur = 73;  }
  else if (sysText.includes('2 Sh')) { sysSur = 117; }
  else if (sysText.includes('3 Sh')) { sysSur = 234; }
  else if (sysText.includes('4 Sh')) { sysSur = 351; }
  if (sysSur > 0 && sysRow) {
    sysRow.style.display = 'flex';
    if (sysLblEl) sysLblEl.textContent = sysText;
    if (sysSurEl) sysSurEl.textContent = '+$' + sysSur;
  } else if (sysRow) { sysRow.style.display = 'none'; }

  // ── Lift system surcharge (SmartRelease only) ──────────────
  var liftBtn2  = document.querySelector('#rn-grp-lift .opt-btn.sel');
  var liftText2 = liftBtn2 ? liftBtn2.textContent.trim() : '';
  var liftSur   = liftText2.includes('AutoLift') ? 89 : 0;
  var liftRow   = document.getElementById('rn-pb-liftsur-row');
  var liftSurEl = document.getElementById('rn-pb-liftsur');
  var liftLblEl = document.getElementById('rn-pb-liftsur-label');
  if (liftSur > 0 && liftRow) {
    liftRow.style.display = 'flex';
    if (liftLblEl) liftLblEl.textContent = 'AutoLift™';
    if (liftSurEl) liftSurEl.textContent = '+$89';
  } else if (liftRow) { liftRow.style.display = 'none'; }

  // ── Light guard surcharge ─────────────────────────────────
  var lgSelBtn  = document.querySelector('#rn-grp-lg .opt-btn.sel');
  var lgText    = lgSelBtn ? lgSelBtn.textContent.trim() : 'None';
  var lgSur     = lgText.includes('360') ? 375 : lgText.includes('LightGap') ? 45 : 0;
  var lgLabel   = lgText.includes('360') ? 'LightGuard 360™' : lgText.includes('LightGap') ? 'Basic light guard' : '';
  var lgRow     = document.getElementById('rn-pb-lg-row');
  var lgEl      = document.getElementById('rn-pb-lg');
  var lgLblEl   = document.getElementById('rn-pb-lg-label');
  if (lgSur > 0 && lgRow) {
    lgRow.style.display = 'flex';
    if (lgLblEl) lgLblEl.textContent = lgLabel;
    if (lgEl)    lgEl.textContent    = '+$' + lgSur;
  } else if (lgRow) { lgRow.style.display = 'none'; }

  // ── Hold-down (door application) ──────────────────────────
  var mountBtn  = document.querySelector('#rn-grp-mount .opt-btn.sel');
  var isDoor    = mountBtn && mountBtn.textContent.includes('Door');
  var hdSur     = isDoor ? (28 * qty) : 0;
  var hdRow     = document.getElementById('rn-pb-holddown-row');
  var hdEl      = document.getElementById('rn-pb-holddown');
  if (isDoor && hdRow) {
    hdRow.style.display = 'flex';
    if (hdEl) hdEl.textContent = '+$28 × ' + qty + ' = $' + hdSur;
  } else if (hdRow) { hdRow.style.display = 'none'; }

  // ── Freight estimate ───────────────────────────────────────
  var freightRow = document.getElementById('rn-pb-freight-row');
  var freightEl  = document.getElementById('rn-pb-freight');
  var oversize   = w >= 90;
  var freightAmt = oversize ? (80 + Math.max(0, qty - 1) * 50) : (25 + Math.max(0, qty - 1) * 11);
  if (freightRow) {
    freightRow.style.display = 'flex';
    if (freightEl) freightEl.textContent = '$' + freightAmt + (oversize ? ' (90″+ oversize rate)' : '');
  }

  // ── Grand total ───────────────────────────────────────────
  const allSurcharges = hrSurcharge + sysSur + liftSur + lgSur + hdSur + freightAmt;
  const total = perShade ? (perShade * qty) + motorCost + allSurcharges : null;

  // Update standard chain label (75% of height)
  updateChainStdLabel('rn-clen-std-label', 'rn-height');

  document.getElementById('rn-pb-dims').textContent  = w + '″ W × ' + h + '″ H';
  document.getElementById('rn-pb-sqft').textContent  = lookup ? lookup.pricedAt : '—';
  document.getElementById('rn-pb-base').textContent  = perShade
    ? '$' + perShade.toFixed(0) + '/shade (PG' + (lookup ? lookup.group : '?') + ')'
    : 'Size out of range — call for quote';
  document.getElementById('rn-pb-total').textContent = total ? '$' + total.toFixed(0) + ' est.' : '—';
  document.getElementById('rn-pb-min-note').style.display = (perShade === RN_MIN) ? 'block' : 'none';
  if (isMotor) {
    document.getElementById('rn-pb-motor-row').style.display = 'flex';
    document.getElementById('rn-pb-motor').textContent = '+$' + RN_MOTOR_UP + ' × ' + qty + ' = $' + (RN_MOTOR_UP * qty).toFixed(0);
  } else {
    document.getElementById('rn-pb-motor-row').style.display = 'none';
  }
  rnRunValidation();
}

// ─── rnAdjQty ────────────────────────────────────────────────
function rnAdjQty(delta) {
  const inp = document.getElementById('rn-qty');
  let v = parseInt(inp.value) || 1;
  v = Math.min(10, Math.max(1, v + delta));
  inp.value = v;
  rnUpdatePrice();
}

// ─── rnShowForm ──────────────────────────────────────────────
function rnShowForm() {
  const f = document.getElementById('rn-submit-form');
  f.classList.add('show');
  f.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── rnSubmitForm ────────────────────────────────────────────
async function rnSubmitForm(btn) {
  const name  = (document.getElementById('rn-sf-name')  || {}).value.trim();
  const phone = (document.getElementById('rn-sf-phone') || {}).value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  const email   = (document.getElementById('rn-sf-email') || {}).value.trim();
  const notes   = (document.getElementById('rn-sf-notes') || {}).value.trim();
  const w       = (document.getElementById('rn-width')    || {}).value;
  const h       = (document.getElementById('rn-height')   || {}).value;
  const qty     = (document.getElementById('rn-qty')      || {}).value || 1;
  const delBtn  = document.querySelector('#grp-del-rn .opt-btn.sel');
  const delivery = delBtn ? delBtn.textContent.trim() : 'Ship to me';

  const g = function(id) { const b = document.querySelector('#' + id + ' .opt-btn.sel'); return b ? b.textContent.trim() : '—'; };

  // Headrail detail lines
  const hrType = g('rn-grp-headrail');
  let hrDetail = '';
  if (hrType.includes('Fascia')) {
    hrDetail = '\n  Shape:          ' + g('rn-grp-fascia-shape') + '\n  Material:       ' + g('rn-grp-fascia-mat');
  } else if (hrType.includes('Cassette')) {
    hrDetail = '\n  Cassette type:  ' + g('rn-grp-cassette');
  }

  // Hardware mode: premium (open roll) or standard (fascia/cassette)
  const isPremium = document.getElementById('rn-premium-hw').style.display !== 'none';
  const premiumFinishBtn = document.querySelector('#rn-grp-premium-finish .rn-fc-sel .rn-fc-name');
  const premiumFinish = isPremium && premiumFinishBtn ? premiumFinishBtn.textContent.trim() : null;

  // Control detail (standard only)
  const ctrlType = g('rn-grp-control');
  const ctrlColor = ctrlType.includes('chain') || ctrlType.includes('Metal')
    ? g('rn-grp-chain-color')
    : g('rn-grp-cord-color');

  const body =
    'NORMAN SOLUNA ROLLER SHADE QUOTE REQUEST\n' +
    '═════════════════════════════════════════\n' +
    'Name:           ' + name  + '\n' +
    'Phone:          ' + phone + '\n' +
    'Email:          ' + (email || '—') + '\n\n' +
    '── SHADE CONFIGURATION ──────────────────\n' +
    'System:         ' + g('rn-grp-system')   + '\n' +
    ((rnSystemType === 'dual' || rnSystemType === 'dn') ? (
      'Blackout pos:   ' + g('rn-grp-bo-pos')  + '\n' +
      'Day roll type:  ' + g('rn-grp-day-type') + '\n' +
      'Day roll fabric:' + (currentRollerColl ? ' ' + currentRollerColl + (currentRollerColor ? ' – ' + currentRollerColor : '') : ' —') + '\n' +
      'Night roll:     Room Darkening\n' +
      'Night fabric:   (see notes / confirmation)\n'
    ) : (
      'Fabric type:    ' + g('rn-grp-fabric')   + '\n' +
      'Collection:     ' + (currentRollerColl  || '—') + '\n' +
      'Color:          ' + (currentRollerColor || '—') + '\n'
    )) +
    'Min fabric W:   ' + rnFabricWidth + '″ (auto from shade width)\n' +
    'Width:          ' + (w || '—') + '″\n' +
    'Height:         ' + (h || '—') + '″\n' +
    'Qty:            ' + qty + '\n' +
    'Lift system:    ' + g('rn-grp-lift')     + '\n' +
    (rnLiftType === 'motor' ? '── MOTORIZATION ─────────────────────────\n' + (typeof nmGetMotorSummary === 'function' ? nmGetMotorSummary() : 'Motor details: confirmed at measurement visit') + '\n\n' : '') +
    'Mount type:     ' + g('rn-grp-mount')    + '\n\n' +
    '── HEADRAIL & TOP ───────────────────────\n' +
    'Headrail type:  ' + hrType + hrDetail     + '\n' +
    'LightGuard:     ' + g('rn-grp-lg')        + '\n' +
    'Hem bar type:   ' + g('rn-grp-hem-type')  + '\n' +
    'Hem bar color:  Fabric Matched (auto)\n\n' +
    '── HARDWARE & COLORS ────────────────────\n' +
    (isPremium
      ? 'Hardware mode:  Premium (Open Roll — no mix & match)\n' +
        'Premium finish: ' + (premiumFinish || '—') + '\n' +
        '  Brackets/Clutch: ' + (document.getElementById('rn-ps-bracket')||{}).textContent + '\n' +
        '  Hem Bar:         ' + (document.getElementById('rn-ps-hem')||{}).textContent + '\n' +
        '  Chain/Tensioner: ' + (document.getElementById('rn-ps-chain')||{}).textContent + '\n'
      : 'Hardware mode:  Standard (Fascia/Cassette/LightGuard)\n' +
        'Control:        ' + ctrlType + '\n' +
        'Control color:  ' + ctrlColor + '\n' +
        'Hardware color: ' + g('rn-grp-hw-color') + '\n'
    ) +
    'Safety tensioner: Included (required by code)\n\n' +
    'Delivery:       ' + delivery             + '\n\n' +
    'Notes:\n' + (notes || '(none)');

  await _apiSubmit(name, email, phone, 'Norman Soluna Roller Shade', body, 'rn-success', 'rn-submit-form', btn);
}

// ─── showCellularLiftNote (already defined above, referenced here for context)
function showCartForm() {
  const w = document.getElementById('cart-contact-wrap');
  w.style.display = 'block';
  w.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ─── Exterior Roller Shade ───────────────────────────────────
function extToggleMotor(show) {
  var el = document.getElementById('ext-motor-note');
  if (el) el.style.display = show ? 'block' : 'none';
}
function extChannelNote(btn) {
  var note = document.getElementById('ext-channel-note');
  var val = btn.textContent.trim();
  var msgs = {
    'None': '',
    'Zipper track channels': 'Fabric edge zips into an aluminum track on each side — provides maximum wind resistance and a near-blackout seal at the sides. Best for enclosed patios, pergolas, or any application needing full weather protection.',
    'Cable hold-downs': 'Stainless cables run vertically on each side and attach to the fabric at the bottom rail — keeps the shade from lifting in wind. Simpler installation, open at the sides. Best for patios where some airflow is acceptable.'
  };
  if (msgs[val]) { note.textContent = msgs[val]; note.style.display = 'block'; }
  else { note.style.display = 'none'; }
}
async function submitExteriorForm(btn) {
  var name  = (document.getElementById('ext-name') || {}).value || '';
  var phone = (document.getElementById('ext-phone') || {}).value || '';
  if (!name.trim() || !phone.trim()) { alert('Please enter your name and phone number.'); return; }
  var gExt = function(id) { var b = document.querySelector('#' + id + ' .opt-btn.sel'); return b ? b.textContent.trim() : '—'; };
  var w       = document.getElementById('ext-width').value;
  var h       = document.getElementById('ext-height').value;
  var qty     = document.getElementById('ext-qty').value;
  var motorReq= document.getElementById('ext-motor-req').value.trim();
  var delivery= gExt('grp-del-ext');
  var body = 'EXTERIOR ROLLER SHADE QUOTE\n' +
    '=====================================\n' +
    'Name:  ' + name + '\nPhone: ' + phone +
    '\nEmail: ' + (document.getElementById('ext-email').value.trim() || '—') + '\n\n' +
    'Width: ' + (w || '—') + '"  Height: ' + (h || '—') + '"  Qty: ' + qty + '\n' +
    'Mount: '       + gExt('ext-grp-mount')    + '\n' +
    'Openness: '    + gExt('ext-grp-openness') + '\n' +
    'Color: '       + gExt('ext-grp-color')    + '\n' +
    'Housing: Cassette (standard)\n' +
    'Side channels: '+ gExt('ext-grp-channels') + '\n' +
    'Operation: '   + gExt('ext-grp-op')       + '\n' +
    (motorReq ? 'Motor preference: ' + motorReq + '\n' : '') +
    'Control side: '+ gExt('ext-grp-control')  + '\n' +
    'Fabric: '      + gExt('ext-grp-fabric')   + '\n' +
    'Delivery: '    + delivery                  + '\n\n' +
    'Notes:\n' + (document.getElementById('ext-notes').value.trim() || 'None');
  var extEmail = document.getElementById('ext-email').value.trim();
  await _apiSubmit(name.trim(), extEmail, phone.trim(), 'Exterior Roller Shade', body, 'ext-success', null, btn);
}

async function handleQuickQuote(e) {
  e.preventDefault();
  const form = document.getElementById('quick-quote-form');
  const btn = form.querySelector('button[type="submit"]');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  const fd = new FormData(form);
  const name     = fd.get('name') || '';
  const phone    = fd.get('phone') || '';
  const email    = fd.get('email') || '';
  const product  = fd.get('product') || '';
  const windows  = fd.get('window_count') || '';
  const timeline = fd.get('timeline') || '';
  const notes    = fd.get('notes') || '';
  const selections = [];
  if (product)  selections.push({ label: 'Product', value: product });
  if (windows)  selections.push({ label: 'Number of windows', value: windows });
  if (timeline) selections.push({ label: 'Timeline', value: timeline });
  try {
    const resp = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, phone, product: product || 'Quick Quote Request', selections, notes })
    });
    const data = await resp.json().catch(() => ({}));
    if (resp.ok) {
      form.style.display = 'none';
      document.getElementById('quick-quote-success').style.display = 'block';
    } else {
      throw new Error(data.error || 'Server error');
    }
  } catch(err) {
    btn.disabled = false;
    btn.textContent = 'Send quote request →';
    alert('Something went wrong. Please call (609) 742-1720 or email justin@blindznation.com');
  }
}

async function submitCart(btn) {
  const name  = document.getElementById('cq-name').value.trim();
  const phone = document.getElementById('cq-phone').value.trim();
  const email = document.getElementById('cq-email').value.trim();
  const notes = document.getElementById('cq-notes').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  const lines = cart.map((item, i) =>
    (i + 1) + '. ' + item.brandLabel + ' ' + item.productName +
    '\n   ' + item.w + '″ W × ' + item.h + '″ H · Qty ' + item.qty +
    (item.tags.length ? '\n   ' + item.tags.join(', ') : '') +
    '\n   Est. ~$' + item.estimated.toFixed(0)
  ).join('\n\n');

  const body = 'QUOTE REQUEST — ' + cart.length + ' item(s)\n' +
    '═══════════════════════════════════\n' +
    'Name:  ' + name + '\nPhone: ' + phone + '\nEmail: ' + (email || '—') +
    '\n\nITEMS:\n\n' + lines +
    (notes ? '\n\nNOTES:\n' + notes : '');

  var cartLen = cart.length;
  await _apiSubmit(name, email, phone, 'Shade Quote (' + cartLen + ' item' + (cartLen !== 1 ? 's' : '') + ')', body, 'cart-success', null, btn, function() {
    document.getElementById('cart-success-count').textContent = cartLen + ' item' + (cartLen !== 1 ? 's' : '');
    document.getElementById('cart-contact-wrap').style.display = 'none';
  });
}

// ── NORMAN PERFECTSHEER™ PRICING ENGINE ──────────────────────────
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

function psGetIdx(arr, val) {
  for (var i=0; i<arr.length; i++) { if (arr[i] >= val) return i; }
  return -1;
}

function psCalc() {
  var w  = parseFloat(document.getElementById('ps-width').value)  || 0;
  var h  = parseFloat(document.getElementById('ps-height').value) || 0;
  var pb = document.getElementById('ps-price-box');
  var pn = document.getElementById('ps-price-note');
  pb.style.display = 'none'; pn.style.display = 'none';
  if (!w || !h) return;

  // Validate size — Norman PerfectSheer PDF p.4 spec table:
  // CCL: min 12"×12", max 98"×98". Motorized: min per motor guide, max per price book (up to 110"W × 120"H).
  var liftBtn = document.querySelector('#grp-ps-lift .opt-btn.sel');
  var isCCL = !liftBtn || liftBtn.textContent.indexOf('Continuous') >= 0;
  if (w < 12 || h < 12) { pn.style.display='block'; pn.textContent='Minimum size is 12″ × 12″.'; return; }
  if (w > 110) { pn.style.display='block'; pn.textContent='Width over 110″ — call us for a custom quote on oversized shades: (609) 742-1720.'; return; }
  if (h > 120) { pn.style.display='block'; pn.textContent='Height over 120″ — call us for a custom quote: (609) 742-1720.'; return; }
  if (isCCL && w > 98) { pn.style.display='block'; pn.textContent='Continuous Cord Loop max width is 98″ (Norman spec). For 98″–110″ width, motorization is required — select "Norman motorization" above.'; return; }
  if (isCCL && h > 98) { pn.style.display='block'; pn.textContent='Continuous Cord Loop max height is 98″ (Norman spec). For 98″–120″ height, motorization is required — select "Norman motorization" above.'; return; }
  if (h > 4*w) { pn.style.display='block'; pn.textContent='Height cannot exceed 4× the width (ratio limit). Adjust your dimensions.'; return; }

  var wi = psGetIdx(PS_WIDTHS,  w);
  var hi = psGetIdx(PS_HEIGHTS, h);
  if (wi<0) wi = PS_WIDTHS.length-1;
  if (hi<0) hi = PS_HEIGHTS.length-1;

  var base = PS_PRICES[hi][wi];
  var lines = ['Base price (' + PS_WIDTHS[wi] + '″W × ' + PS_HEIGHTS[hi] + '″H): $' + base.toLocaleString()];
  var total = base;

  // Room darkening +20%
  var rdBtn = document.querySelector('#grp-ps-opacity .opt-btn.sel');
  var isRD = rdBtn && rdBtn.textContent.indexOf('Room darkening') >= 0;
  if (isRD) { var rdAdd = Math.round(base*0.20); total+=rdAdd; lines.push('Room darkening (+20%): +$'+rdAdd.toLocaleString()); }

  // Metal Fascia surcharge
  var valBtn = document.querySelector('#grp-ps-valance .opt-btn.sel');
  var valText = valBtn ? valBtn.textContent.trim() : '';
  var vi = psGetIdx(PS_WIDTHS, w); if (vi<0) vi=PS_WIDTHS.length-1;
  if (valText.indexOf('Fabric valance') >= 0) {
    var fv = PS_FABRIC_V[vi]; total+=fv; lines.push('Fabric valance: +$'+fv.toLocaleString());
  } else if (valText.indexOf('Wood valance') >= 0) {
    var wv = PS_WOOD_V[vi]; total+=wv; lines.push('Wood valance: +$'+wv.toLocaleString());
  }

  // Light guard
  if (document.getElementById('ps-lightguard-basic').checked)   { total+=45;  lines.push('Basic light guard: +$45'); }
  if (document.getElementById('ps-lightguard-premium').checked) { total+=117; lines.push('Premium wood light guard: +$117'); }

  // Hold-down
  if (document.getElementById('ps-holddown').checked) { total+=28; lines.push('Magnetic hold-down: +$28'); }

  // Shims
  var shims = parseInt(document.getElementById('ps-shims').value)||0;
  if (shims>0) { var sv=shims*7; total+=sv; lines.push('Shims ('+shims+'×$7): +$'+sv); }

  // Motorization note
  var liftBtn = document.querySelector('#grp-ps-lift .opt-btn.sel');
  if (liftBtn && liftBtn.textContent.indexOf('motor') >= 0) lines.push('Motorization surcharge: added to final quote');

  document.getElementById('ps-price-num').textContent = '$' + total.toLocaleString();
  document.getElementById('ps-price-breakdown').innerHTML = lines.join('<br>');
  pb.style.display = 'block';
}

function psUpdateColors(type) {
  var sel = document.getElementById('ps-color');
  var rdGrp = document.getElementById('ps-rd-group');
  for (var i=0; i<sel.options.length; i++) {
    var opt = sel.options[i];
    var inRD = opt.parentElement && opt.parentElement.id === 'ps-rd-group';
    if (type === 'lf' && inRD) opt.style.display = 'none';
    else if (type === 'rd' && !inRD) opt.style.display = 'none';
    else opt.style.display = '';
  }
  rdGrp.style.display = type === 'rd' ? '' : 'none';
  // Select first visible option
  for (var j=0; j<sel.options.length; j++) {
    if (sel.options[j].style.display !== 'none') { sel.selectedIndex = j; break; }
  }
}

async function submitPSForm(btn) {
  var name  = document.getElementById('ps-name').value.trim();
  var phone = document.getElementById('ps-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  var w      = document.getElementById('ps-width').value   || '?';
  var h      = document.getElementById('ps-height').value  || '?';
  var mount  = (document.querySelector('#grp-ps-mount .opt-btn.sel')||{}).textContent || '';
  var opac   = (document.querySelector('#grp-ps-opacity .opt-btn.sel')||{}).textContent || '';
  var color  = document.getElementById('ps-color').value;
  var lift   = (document.querySelector('#grp-ps-lift .opt-btn.sel')||{}).textContent || '';
  var cord   = (document.querySelector('#grp-ps-cord .opt-btn.sel')||{}).textContent || '';
  var valance= (document.querySelector('#grp-ps-valance .opt-btn.sel')||{}).textContent || '';
  var qty    = document.getElementById('ps-qty').value;
  var loc    = document.getElementById('ps-location').value;
  var notes  = document.getElementById('ps-notes').value;
  var email  = document.getElementById('ps-email').value;
  var delBtn = (document.querySelector('#grp-del-ps .opt-btn.sel')||{}).textContent || '';
  var price  = document.getElementById('ps-price-num').textContent;
  var lg     = document.getElementById('ps-lightguard-basic').checked ? 'Basic light guard' :
               document.getElementById('ps-lightguard-premium').checked ? 'Premium wood light guard' : 'None';
  var hd     = document.getElementById('ps-holddown').checked ? 'Yes' : 'No';
  var shims  = document.getElementById('ps-shims').value;

  var body = 'NORMAN PERFECTSHEER QUOTE REQUEST\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + (email||'not provided') + '\n\n'
    + 'SHADE SPECS\n'
    + 'Width: ' + w + '"  |  Height: ' + h + '"\n'
    + 'Mount: ' + mount + '\n'
    + 'Opacity: ' + opac + '\n'
    + 'Color: ' + color + '\n'
    + 'Operation: ' + lift + '\n'
    + 'Cord side: ' + cord + '\n'
    + 'Valance: ' + valance + '\n'
    + 'Light guard: ' + lg + '\n'
    + 'Magnetic hold-down: ' + hd + '\n'
    + 'Shims: ' + shims + '\n\n'
    + 'ORDER DETAILS\n'
    + 'Quantity: ' + qty + '\n'
    + 'Room/location: ' + (loc||'not specified') + '\n'
    + 'Delivery: ' + delBtn + '\n'
    + 'Estimated price: ' + price + ' per shade\n\n'
    + 'Notes: ' + (notes||'none');

  await _apiSubmit(name, email, phone, 'Norman PerfectSheer', body, 'ps-success', null, btn);
}

// ── SHARED API SUBMIT HELPER ─────────────────────────────────────────────────
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
    var mh = 'mailto:justin@blindznation.com?subject=' + encodeURIComponent('Quote — ' + name) + '&body=' + encodeURIComponent('Name: ' + name + '\nPhone: ' + phone + '\nProduct: ' + productName + '\n\n' + configText);
    var eDiv = document.createElement('div');
    eDiv.style.cssText = 'background:#FEE2E2;border-radius:8px;padding:10px 13px;margin-top:10px;font-size:12px;color:#991B1B;line-height:1.5';
    eDiv.innerHTML = '<strong>Issue sending.</strong> <a href="' + mh + '" style="color:#991B1B;font-weight:700;text-decoration:underline">Email directly →</a> or call <a href="tel:6097421720" style="color:#991B1B">(609) 742-1720</a>';
    if (btn && btn.parentElement) btn.insertAdjacentElement('afterend', eDiv);
    setTimeout(function(){ if (eDiv.parentElement) eDiv.remove(); }, 15000);
  }
}

// ── AUTO-SELECT FROM URL PARAM ────────────────────────────────────────────────
(function(){
  var params=new URLSearchParams(window.location.search);
  var t=params.get('type');
  if(!t)return;
  var map={
    roller:function(){selectProduct('roller','Roller Shades',true);},
    cellular:function(){selectProduct('cellular','Cellular Shades',true);},
    zebra:function(){pbShowContact('Banded 2D Zebra Shades — get a free quote');},
    woven:function(){selectProduct('woven','Woven Wood Shades',true);},
    exterior:function(){selectProduct('exterior','Exterior Roller Shades',false);}
  };
  if(map[t]) setTimeout(map[t],120);
})();

// ── AUTO-ADVANCE: click any opt-btn inside a [data-goto] row → smooth-scroll to next section ──
(function(){
  function scrollTo(id){
    var el=document.getElementById(id); if(!el) return;
    var nav=document.getElementById('site-nav');
    var off=nav?nav.offsetHeight+20:76;
    setTimeout(function(){
      window.scrollTo({top:el.getBoundingClientRect().top+window.scrollY-off,behavior:'smooth'});
    },90);
  }
  document.addEventListener('click',function(e){
    var btn=e.target.closest('.opt-btn,.brand-btn');
    if(!btn) return;
    var row=btn.closest('[data-goto]');
    if(row) scrollTo(row.dataset.goto);
  });
})();