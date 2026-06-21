renderNav('Shades & blinds'); renderFooter(false);

// ═══════════════════════════════════════════════════════════════
// FABRIC DATA — patterns from PDF pages 4-5
// maxH = single shade max height; double shades always capped at 96"
// rhea = true → no cassette fabric wrap, no fabric-wrapped box valance
// Exact PR-XXX color codes entered by customer from sample book
// ═══════════════════════════════════════════════════════════════
var FABRICS = [
  {name:'Alston',  group:'A', maxW:90,  maxH:108, rhea:false, note:'Best privacy'},
  {name:'Easton',  group:'A', maxW:90,  maxH:108, rhea:false},
  {name:'Hampton', group:'A', maxW:90,  maxH:108, rhea:false, note:'Best privacy'},
  {name:'Isla',    group:'A', maxW:90,  maxH:108, rhea:false},
  {name:'Marco',   group:'A', maxW:90,  maxH:108, rhea:false},
  {name:'Mason',   group:'A', maxW:90,  maxH:108, rhea:false},
  {name:'Clifton', group:'B', maxW:90,  maxH:108, rhea:false},
  {name:'Iris',    group:'B', maxW:72,  maxH:108, rhea:false, note:'Max 72" wide'},
  {name:'Keys',    group:'B', maxW:90,  maxH:108, rhea:false},
  {name:'Seville', group:'B', maxW:90,  maxH:108, rhea:false},
  {name:'Cyprus',  group:'C', maxW:90,  maxH:96,  rhea:false, note:'Max 96" tall · Best privacy'},
  {name:'Lace',    group:'C', maxW:90,  maxH:108, rhea:false},
  {name:'Layla',   group:'C', maxW:90,  maxH:108, rhea:false},
  {name:'Wyatt',   group:'C', maxW:90,  maxH:96,  rhea:false, note:'Max 96" tall'},
  {name:'Ashton',  group:'D', maxW:114, maxH:108, rhea:false},
  {name:'Brenna',  group:'D', maxW:114, maxH:108, rhea:false},
  {name:'Mallory', group:'D', maxW:114, maxH:108, rhea:false},
  {name:'Torrey',  group:'D', maxW:114, maxH:108, rhea:false},
  {name:'Rhea',    group:'E', maxW:114, maxH:108, rhea:true,  note:'No cassette wrap · No box valance'},
  {name:'Sophie',  group:'E', maxW:114, maxH:108, rhea:false}
];

// Back fabrics for double shades
var BACK_LF = [
  {code:'NRLF-01',name:'White',light:'LF'},
  {code:'NRLF-02',name:'Cotton',light:'LF'},
  {code:'NRLF-03',name:'Beige',light:'LF'},
  {code:'NRLF-05',name:'Limestone',light:'LF'},
  {code:'NRLF-06',name:'Mist',light:'LF'},
  {code:'NRLF-07',name:'Gray',light:'LF'}
];
var BACK_RD = [
  {code:'NRRD-01',name:'White',light:'RD'},
  {code:'NRRD-02',name:'Sand',light:'RD'},
  {code:'NRRD-03',name:'Beige',light:'RD'},
  {code:'NRRD-04',name:'Titanium',light:'RD'},
  {code:'NRRD-05',name:'Gray',light:'RD'},
  {code:'NRRD-07',name:'Basalt',light:'RD'},
  {code:'NRRD-08',name:'Iron',light:'RD'},
  {code:'NRRD-09',name:'Black',light:'RD'}
];

// Top treatments keyed by id
var TOP_TREATMENTS = {
  'open-std':    {label:'Open Roll — Standard Bracket',     single:true,  double:false, cassette:false, note:'Silver brackets with color-coordinated covers. Clutch, cordless, Pro Wand, or motor.'},
  'open-metal':  {label:'Open Roll — Decorative Metal Bracket', single:true, double:false, cassette:false, note:'Antique Brass, Satin Nickel, or Black. Cordless, Pro Wand, or motor only (no clutch). Pro Wand requires top mount.'},
  'open-dual':   {label:'Open Roll — Dual Bracket',         single:false, double:true,  cassette:false, note:'Silver brackets, white covers. Double shades only. Clutch, cordless, or motor.'},
  'cassette':    {label:'Square Cassette',                   single:true,  double:false, cassette:true,  note:'4" cassette. Colors: White, Beige, Gray, Black. Wrapped or unwrapped. Standard roll only.'},
  'box-valance': {label:'Fabric-Wrapped Box Valance',        single:true,  double:true,  cassette:false, note:'4" height single, 6" height double. Top or face mount. Returns available. Max width 116".'},
  'trad-valance':{label:'Traditional Valance',               single:true,  double:true,  cassette:false, note:'Wood headrail with fabric valance. 6" single, 8" double. Returns available.'}
};

// Fabric width deductions (inches) by top treatment + control
// Keys: top treatment key → control key → deduction
var DEDUCTIONS = {
  'open-std':    {clutch:1.5, cordless:1.25, prowand:1.5,  motor:1.375},
  'open-metal':  {clutch:null, cordless:1.375, prowand:1.5, motor:1.375},
  'open-dual':   {clutch:1.5, cordless:1.0,  prowand:null, motor:1.375},
  'cassette':    {clutch:1.5, cordless:1.0,  prowand:1.5,  motor:1.5},
  'box-valance': {clutch:1.5, cordless:1.0,  prowand:1.5,  motor:1.375},
  'trad-valance':{clutch:1.375, cordless:0.75, prowand:1.5, motor:1.5}
};

// ═══════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════
var S = {
  shadeType: '',    // 'single' | 'double'
  mount: '',
  width: 0, height: 0, qty: 1, room: '',
  fabric: null, fabColor: '',
  backFabric: null,
  topTreatment: '',
  cassetteColor: 'White', cassetteWrap: true,
  metalBracketColor: 'Satin Nickel',
  valanceReturn: '',
  rollDir: '',
  control: '',
  controlSide: '',
  chainColor: 'White', chainDrop: '',
  wandLength: '',
  motorType: '',
  motorAccessories: [],
  holdDown: false, spacer: false,
  delivery: 'ship'
};

// ═══════════════════════════════════════════════════════════════
// STEP 1 — SHADE TYPE
// ═══════════════════════════════════════════════════════════════
function selectType(t) {
  S.shadeType = t;
  S.topTreatment = ''; S.control = ''; S.rollDir = '';
  document.getElementById('tc-single').classList.toggle('sel', t === 'single');
  document.getElementById('tc-double').classList.toggle('sel', t === 'double');
  var label = t === 'single' ? 'Single Natural Roller' : 'Double Natural Roller';
  completeStep('step-1', label);
  updateSpec('sp-type', label);

  // Show/hide back fabric step
  document.getElementById('step-5').style.display = t === 'double' ? 'block' : 'none';
  document.getElementById('sp-back-row').style.display = t === 'double' ? 'flex' : 'none';

  // Update size note
  var note = document.getElementById('size-type-note');
  if (t === 'double') {
    note.style.display = 'block';
    note.textContent = 'Double shades: maximum height 96" regardless of fabric selection.';
  } else {
    note.style.display = 'none';
  }

  buildTopTreatmentStep();
  buildControlStep();
  validateSize();
  activateStep('step-2');
}

// ═══════════════════════════════════════════════════════════════
// STEP 2 — MOUNT
// ═══════════════════════════════════════════════════════════════
function selectMount(m) {
  S.mount = m;
  document.getElementById('mc-in').classList.toggle('sel', m === 'inside');
  document.getElementById('mc-out').classList.toggle('sel', m === 'outside');
  var label = m === 'inside' ? 'Inside Mount' : 'Outside Mount';
  completeStep('step-2', label);
  updateSpec('sp-mount', label);
  validateSize();
  activateStep('step-3');
}

// ═══════════════════════════════════════════════════════════════
// STEP 3 — SIZE
// ═══════════════════════════════════════════════════════════════
function validateSize() {
  var w = parseFloat(document.getElementById('inp-w').value) || 0;
  var h = parseFloat(document.getElementById('inp-h').value) || 0;
  var qty = parseInt(document.getElementById('inp-qty').value) || 1;
  S.width = w; S.height = h; S.qty = qty;
  S.room = document.getElementById('inp-room') ? document.getElementById('inp-room').value.trim() : '';

  var msgs = document.getElementById('size-msgs');
  msgs.innerHTML = '';
  var errors = [], warns = [];

  if (w > 0 && h > 0) {
    var maxH = S.shadeType === 'double' ? 96 : (S.fabric ? S.fabric.maxH : 108);
    var maxW = S.fabric ? S.fabric.maxW : 114;

    if (S.fabric && w > S.fabric.maxW) errors.push('Width ' + w + '" exceeds ' + S.fabric.name + ' maximum of ' + S.fabric.maxW + '".');
    if (S.shadeType === 'double' && h > 96) errors.push('Double shades: maximum height is 96". Entered: ' + h + '".');
    if (S.fabric && !S.shadeType === 'double' && h > S.fabric.maxH) errors.push('Height ' + h + '" exceeds ' + S.fabric.name + ' maximum of ' + S.fabric.maxH + '".');

    errors.forEach(function(e){ msgs.innerHTML += '<div class="size-error">⚠️ ' + e + '</div>'; });
    warns.forEach(function(w){ msgs.innerHTML += '<div class="size-warn">⚠️ ' + w + '</div>'; });

    if (!errors.length) {
      msgs.innerHTML += '<div class="size-ok">✓ Dimensions within specification.</div>';
      updateSpec('sp-dims', w + '" × ' + h + '"');
      updateSpec('sp-qty', qty);
      document.getElementById('s3-val').textContent = w + '" × ' + h + '"';

      // Approximate fabric width
      var ded = getDeduction();
      var im = S.mount === 'inside' ? 0.125 : 0;
      var fabW = (w - im - ded).toFixed(3);
      document.getElementById('cp-fabW').textContent = fabW + '"';
      document.getElementById('size-computed').style.display = 'block';

      if (!document.getElementById('step-4').classList.contains('done')) activateStep('step-4');
    } else {
      document.getElementById('size-computed').style.display = 'none';
    }
  } else {
    document.getElementById('size-computed').style.display = 'none';
  }
}

function validateQty() {
  var qty = parseInt(document.getElementById('inp-qty').value) || 1;
  S.qty = qty;
  updateRoomLabels(qty);
  S.room = getRoomLabels();
  var label = qty + ' shade' + (qty !== 1 ? 's' : '') + (S.room ? ' · ' + S.room : '');
  document.getElementById('s3-val').textContent = label;
  updateSpec('sp-qty', qty);
  completeStep('step-3', label);
  activateStep('step-4');
}

function updateRoomLabels(qty) {
  var wrap = document.getElementById('room-labels-wrap');
  if (!wrap) return;
  if (qty <= 1) {
    wrap.innerHTML = '<div class="dim-label">Room / window label <span style="font-weight:400;color:#999">(optional)</span></div>' +
      '<input type="text" id="inp-room" placeholder="e.g. Master Bedroom Left" style="padding:8px 10px;border:1px solid #ddd;border-radius:8px;font-size:13px;width:100%;box-sizing:border-box" oninput="validateQty()">';
  } else {
    var html = '<div class="dim-label">Room / window labels <span style="font-weight:400;color:#999">(optional — one per shade)</span></div>';
    for (var i = 1; i <= qty; i++) {
      var prev = (document.getElementById('inp-room-' + i) || {}).value || '';
      html += '<div style="display:flex;align-items:center;gap:8px;margin-bottom:6px">' +
        '<span style="font-size:11px;font-weight:600;color:#777;min-width:56px">Shade ' + i + '</span>' +
        '<input type="text" id="inp-room-' + i + '" placeholder="e.g. Living room left" value="' + prev.replace(/"/g, '&quot;') + '" style="flex:1;padding:7px 10px;border:1px solid #ddd;border-radius:7px;font-size:12px" oninput="validateQty()">' +
        '</div>';
    }
    wrap.innerHTML = html;
  }
}

function getRoomLabels() {
  var qty = parseInt((document.getElementById('inp-qty') || {}).value) || 1;
  if (qty <= 1) {
    return (document.getElementById('inp-room') || {}).value || '';
  }
  var parts = [];
  for (var i = 1; i <= qty; i++) {
    var v = ((document.getElementById('inp-room-' + i) || {}).value || '').trim();
    if (v) parts.push('Shade ' + i + ': ' + v);
  }
  return parts.join(' | ');
}

function getDeduction() {
  if (!S.topTreatment || !S.control) return 1.375;
  var row = DEDUCTIONS[S.topTreatment];
  if (!row) return 1.375;
  return row[S.control] || 1.375;
}

// ═══════════════════════════════════════════════════════════════
// STEP 4 — FRONT FABRIC
// ═══════════════════════════════════════════════════════════════
function buildFabGrid(filter) {
  var grid = document.getElementById('fab-grid');
  var list = filter === 'all' ? FABRICS : FABRICS.filter(function(f){ return f.group === filter; });
  grid.innerHTML = list.map(function(f, i) {
    var idx = FABRICS.indexOf(f);
    var sel = S.fabric && S.fabric.name === f.name ? ' sel' : '';
    return '<div class="fab-card' + sel + '" onclick="selectFabric(' + idx + ')">' +
      '<span class="fab-badge">Group ' + f.group + '</span>' +
      '<div class="fab-name">' + f.name + '</div>' +
      '<div class="fab-meta">Max ' + f.maxW + '"W × ' + f.maxH + '"H' + (f.note ? '<br>' + f.note : '') + '</div>' +
    '</div>';
  }).join('');
}

function filterFab(f, btn) {
  document.querySelectorAll('.fab-tab').forEach(function(t){ t.classList.remove('on'); });
  btn.classList.add('on');
  buildFabGrid(f);
}

function selectFabric(idx) {
  S.fabric = FABRICS[idx];
  S.fabColor = '';
  buildFabGrid('all');
  document.querySelectorAll('.fab-tab')[0].click();

  document.getElementById('fab-color-wrap').style.display = 'block';
  document.getElementById('fab-color-inp').value = '';
  document.getElementById('rhea-warn').style.display = S.fabric.rhea ? 'flex' : 'none';

  updateSpec('sp-front', S.fabric.name + ' · Group ' + S.fabric.group);
  updateSpec('sp-group', 'Group ' + S.fabric.group);
  validateSize();
  buildTopTreatmentStep();

  if (S.shadeType === 'double') activateStep('step-5');
  else activateStep('step-6');
}

function updateFabColor(val) {
  S.fabColor = val;
  if (val.trim()) {
    completeStep('step-4', S.fabric.name + (val ? ' · ' + val : ''));
    updateSpec('sp-front', S.fabric.name + (val ? ' · ' + val : '') + ' · Group ' + S.fabric.group);
  }
}

// ═══════════════════════════════════════════════════════════════
// STEP 5 — BACK FABRIC (double only)
// ═══════════════════════════════════════════════════════════════
function buildBackGrids() {
  ['back-lf-grid','back-rd-grid'].forEach(function(id){ document.getElementById(id).innerHTML = ''; });
  BACK_LF.forEach(function(b,i) {
    document.getElementById('back-lf-grid').innerHTML +=
      '<div class="back-card" id="backc-' + b.code + '" onclick="selectBack(\'' + b.code + '\',\'' + b.name + '\',\'LF\')">' +
      '<div class="back-name">Light Filtering ' + b.name + '</div><div class="back-code">' + b.code + '</div></div>';
  });
  BACK_RD.forEach(function(b,i) {
    document.getElementById('back-rd-grid').innerHTML +=
      '<div class="back-card" id="backc-' + b.code + '" onclick="selectBack(\'' + b.code + '\',\'' + b.name + '\',\'RD\')">' +
      '<div class="back-name">Blackout ' + b.name + '</div><div class="back-code">' + b.code + '</div></div>';
  });
}

function selectBack(code, name, type) {
  S.backFabric = {code:code, name:name, type:type};
  document.querySelectorAll('.back-card').forEach(function(el){ el.classList.remove('sel'); });
  var el = document.getElementById('backc-' + code);
  if (el) el.classList.add('sel');
  var label = (type === 'RD' ? 'Blackout ' : 'Light Filtering ') + name + ' · ' + code;
  completeStep('step-5', label);
  updateSpec('sp-back', label);
  activateStep('step-6');
}

// ═══════════════════════════════════════════════════════════════
// STEP 6 — TOP TREATMENT
// ═══════════════════════════════════════════════════════════════
function buildTopTreatmentStep() {
  var body = document.getElementById('s6-body');
  var isDouble = S.shadeType === 'double';
  var isRhea = S.fabric && S.fabric.rhea;

  var items = [
    {key:'open-std',    icon:'📋', title:'Open Roll — Standard Bracket',     desc:'Silver brackets + color covers · Clutch, cordless, Pro Wand, or motor', show:!isDouble},
    {key:'open-metal',  icon:'✨', title:'Open Roll — Decorative Metal Bracket', desc:'Antique Brass · Satin Nickel · Black · Cordless, Pro Wand, or motor only', show:!isDouble},
    {key:'open-dual',   icon:'⚙️', title:'Open Roll — Dual Bracket',         desc:'Silver/white · Double shades only · Clutch, cordless, or motor', show:isDouble},
    {key:'cassette',    icon:'📦', title:'Square Cassette',                   desc:'4" cassette · White/Beige/Gray/Black · Standard roll only' + (isRhea ? ' — BLOCKED (Rhea fabric)' : ''), show:!isDouble, blocked:isRhea},
    {key:'box-valance', icon:'🎨', title:'Fabric-Wrapped Box Valance',        desc:'4" single / 6" double · Returns available · Max 116" wide' + (isRhea ? ' — BLOCKED (Rhea fabric)' : ''), show:true, blocked:isRhea},
    {key:'trad-valance',icon:'🪵', title:'Traditional Valance',               desc:'Wood headrail + fabric · 6" single / 8" double · Returns available', show:true}
  ];

  body.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:10px;margin-top:4px">' +
    items.filter(function(i){ return i.show; }).map(function(item) {
      var sel = S.topTreatment === item.key ? ' sel' : '';
      var blocked = item.blocked ? ' blocked' : '';
      var onclick = item.blocked ? '' : 'onclick="selectTopTreatment(\'' + item.key + '\')"';
      return '<div class="opt-card' + sel + blocked + '" id="tt-' + item.key + '" ' + onclick + '>' +
        '<div class="opt-card-icon">' + item.icon + '</div>' +
        '<div class="opt-card-title">' + item.title + '</div>' +
        '<div class="opt-card-desc">' + item.desc + '</div>' +
      '</div>';
    }).join('') + '</div>';

  // Sub-options appear below when a treatment is selected
  body.innerHTML += '<div id="tt-sub-opts" style="margin-top:14px"></div>';
}

function selectTopTreatment(key) {
  S.topTreatment = key;
  S.control = ''; S.rollDir = '';
  document.querySelectorAll('[id^="tt-"]').forEach(function(el){ el.classList.remove('sel'); });
  var el = document.getElementById('tt-' + key);
  if (el) el.classList.add('sel');

  var label = TOP_TREATMENTS[key] ? TOP_TREATMENTS[key].label : key;
  completeStep('step-6', label);
  updateSpec('sp-top', label);

  buildTopSubOpts(key);
  buildRollStep();
  buildControlStep();
  validateSize();
  activateStep('step-7');
}

function buildTopSubOpts(key) {
  var wrap = document.getElementById('tt-sub-opts');
  var html = '';
  if (key === 'cassette') {
    html += '<div style="font-size:12px;font-weight:500;color:#444;margin-bottom:8px">Cassette color</div>' +
      '<div class="hw-color-row" id="grp-cass-color">' +
      ['White','Beige','Gray','Black'].map(function(c) {
        var dots = {White:'#F5F5F5',Beige:'#D4B896',Gray:'#909090',Black:'#1A1A1A'};
        return '<div class="hw-color-opt' + (c === S.cassetteColor ? ' sel' : '') + '" onclick="selCassetteColor(\'' + c + '\',this)"><span class="hw-dot" style="background:' + dots[c] + '"></span>' + c + '</div>';
      }).join('') + '</div>' +
      '<div style="font-size:12px;font-weight:500;color:#444;margin:12px 0 8px">Fabric wrap</div>' +
      '<div class="opt-grid-2">' +
      '<div class="opt-card' + (S.cassetteWrap ? ' sel' : '') + '" onclick="selCassetteWrap(true)"><div class="opt-card-title">Wrapped</div><div class="opt-card-desc">Fabric-covered cassette housing</div></div>' +
      '<div class="opt-card' + (!S.cassetteWrap ? ' sel' : '') + '" onclick="selCassetteWrap(false)"><div class="opt-card-title">Unwrapped</div><div class="opt-card-desc">Solid color cassette housing</div></div>' +
      '</div>';
    if (S.fabric && S.fabric.rhea) html = '<div class="err-box"><span>⚠️</span><span>Rhea fabric cannot use square cassette fabric wrap.</span></div>';
  } else if (key === 'open-metal') {
    html += '<div style="font-size:12px;font-weight:500;color:#444;margin-bottom:8px">Bracket color</div>' +
      '<div class="opt-grid-3">' +
      ['Antique Brass','Satin Nickel','Black'].map(function(c) {
        return '<div class="opt-card' + (S.metalBracketColor === c ? ' sel' : '') + '" onclick="selMetalBracket(\'' + c + '\')">' +
          '<div class="opt-card-title">' + c + '</div></div>';
      }).join('') + '</div>';
  } else if (key === 'box-valance') {
    if (S.fabric && S.fabric.rhea) {
      html = '<div class="err-box"><span>⚠️</span><span>Rhea fabric cannot use fabric-wrapped box valance.</span></div>';
    } else {
      html += '<div style="font-size:12px;font-weight:500;color:#444;margin-bottom:6px">Valance height</div>' +
        '<div class="opt-grid-2">' +
        '<div class="opt-card' + (S.shadeType === 'double' ? '' : ' sel') + '" onclick="this.classList.add(\'sel\');this.nextElementSibling.classList.remove(\'sel\')"><div class="opt-card-title">4" height</div><div class="opt-card-desc">Single shades</div></div>' +
        '<div class="opt-card' + (S.shadeType === 'double' ? ' sel' : '') + '" onclick="this.classList.add(\'sel\');this.previousElementSibling.classList.remove(\'sel\')"><div class="opt-card-title">6" height</div><div class="opt-card-desc">Double shades — recommended</div></div>' +
        '</div>' +
        '<div class="info-box" style="margin-top:10px">Returns from 1"–6". Outside mount recommended: 3¼" single, 4" double. Not recommended inside mount. If returns used, valance must be ≥1⅞" wider than shade.</div>';
      document.getElementById('box-val-return-wrap').style.display = 'block';
    }
  }
  wrap.innerHTML = html;
}

function selCassetteColor(c, el) {
  S.cassetteColor = c;
  document.querySelectorAll('#grp-cass-color .hw-color-opt').forEach(function(e){ e.classList.remove('sel'); });
  el.classList.add('sel');
}
function selCassetteWrap(v) {
  S.cassetteWrap = v;
  document.querySelectorAll('#tt-cassette ~ #tt-sub-opts .opt-card').forEach(function(e,i){ e.classList.toggle('sel', i === (v ? 0 : 1)); });
  buildTopSubOpts('cassette');
}
function selMetalBracket(c) {
  S.metalBracketColor = c;
  buildTopSubOpts('open-metal');
}

// ═══════════════════════════════════════════════════════════════
// STEP 7 — ROLL DIRECTION
// ═══════════════════════════════════════════════════════════════
function buildRollStep() {
  var body = document.getElementById('s7-body');
  var tt = S.topTreatment;
  var isDouble = S.shadeType === 'double';

  if (isDouble) {
    body.innerHTML = '<div class="info-box">Double shades: roll direction is fixed — front fabric reverse roll, back fabric standard roll. No selection needed.</div>';
    S.rollDir = 'double-fixed';
    completeStep('step-7', 'Front: Reverse · Back: Standard (fixed)');
    updateSpec('sp-roll', 'Front Reverse / Back Standard');
    return;
  }

  var reverseBlocked = tt === 'cassette' || tt === 'trad-valance';
  var whyBlocked = tt === 'cassette' ? 'Not available with square cassette' : tt === 'trad-valance' ? 'Not available with traditional valance' : '';

  body.innerHTML = '<div class="opt-grid-2">' +
    '<div class="opt-card' + (S.rollDir === 'standard' ? ' sel' : '') + '" id="rd-std" onclick="selectRoll(\'standard\')">' +
      '<div class="opt-card-title">Standard Roll</div>' +
      '<div class="opt-card-desc">Fabric off back of roll — best for privacy and light blocking</div>' +
    '</div>' +
    '<div class="opt-card' + (reverseBlocked ? ' blocked' : (S.rollDir === 'reverse' ? ' sel' : '')) + '" id="rd-rev" onclick="selectRoll(\'reverse\')">' +
      '<div class="opt-card-title">Reverse Roll</div>' +
      '<div class="opt-card-desc">' + (reverseBlocked ? '<span style="color:#dc2626;font-weight:600">' + whyBlocked + '</span>' : 'Fabric off front — best for clearing obstructions') + '</div>' +
    '</div>' +
  '</div>';

  if (reverseBlocked && S.rollDir === 'reverse') {
    S.rollDir = 'standard';
    document.getElementById('rd-std') && document.getElementById('rd-std').classList.add('sel');
  }
}

function selectRoll(dir) {
  S.rollDir = dir;
  document.getElementById('rd-std') && document.getElementById('rd-std').classList.toggle('sel', dir === 'standard');
  document.getElementById('rd-rev') && document.getElementById('rd-rev').classList.toggle('sel', dir === 'reverse');
  completeStep('step-7', dir === 'standard' ? 'Standard Roll' : 'Reverse Roll');
  updateSpec('sp-roll', dir === 'standard' ? 'Standard' : 'Reverse');
  activateStep('step-8');
}

// ═══════════════════════════════════════════════════════════════
// STEP 8 — CONTROL TYPE
// ═══════════════════════════════════════════════════════════════
function buildControlStep() {
  var body = document.getElementById('s8-body');
  var tt = S.topTreatment;
  var isDouble = S.shadeType === 'double';

  var controls = [
    {key:'clutch',   icon:'🔗', title:'Clutch',     desc:'Plastic bead chain — White, Beige, Gray, or Black. 2–5 ft drops.',
      blocked: tt === 'open-metal'},
    {key:'cordless', icon:'👆', title:'Cordless',   desc:'Raise/lower by hand. Clear hem grip + optional Lift Assist pole.',
      blocked: false},
    {key:'prowand',  icon:'⚡', title:'Pro Wand Motor', desc:'Rechargeable battery. White wand. 24/36/48/60" lengths.',
      blocked: isDouble, blockedReason: 'Not available for double shades'},
    {key:'motor',    icon:'🔋', title:'Remote Motor',   desc:'LI rechargeable, DC, or AC hardwired. 15-ch remote/wall switch.',
      blocked: false}
  ];

  if (!tt) {
    body.innerHTML = '<div style="font-size:12px;color:#888">Select a top treatment first.</div>';
    return;
  }

  body.innerHTML = '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:10px;margin-top:4px">' +
    controls.map(function(c) {
      var isBlocked = c.blocked || (tt === 'open-metal' && c.key === 'clutch');
      var sel = S.control === c.key && !isBlocked ? ' sel' : '';
      var blocked = isBlocked ? ' blocked' : '';
      var desc = isBlocked && c.blockedReason ? '<span style="color:#dc2626;font-weight:600">' + c.blockedReason + '</span>' : c.desc;
      return '<div class="opt-card' + sel + blocked + '" id="ctrl-' + c.key + '" onclick="selectControl(\'' + c.key + '\')">' +
        '<div class="opt-card-icon">' + c.icon + '</div>' +
        '<div class="opt-card-title">' + c.title + '</div>' +
        '<div class="opt-card-desc">' + desc + '</div>' +
      '</div>';
    }).join('') + '</div>';
}

function selectControl(key) {
  S.control = key;
  S.controlSide = '';
  var labels = {clutch:'Clutch', cordless:'Cordless', prowand:'Pro Wand Motor', motor:'Remote Motor'};
  completeStep('step-8', labels[key]);
  updateSpec('sp-control', labels[key]);
  validateSize();

  var needsSide = key !== 'cordless';
  var needsMotorAcc = key === 'motor' || key === 'prowand';
  document.getElementById('step-9').style.display = 'block';
  document.getElementById('step-10').style.display = needsMotorAcc ? 'block' : 'none';

  buildControlDetails(key);
  if (needsMotorAcc) buildMotorAcc(key);

  activateStep('step-9');
}

// ═══════════════════════════════════════════════════════════════
// STEP 9 — CONTROL DETAILS
// ═══════════════════════════════════════════════════════════════
function buildControlDetails(key) {
  var body = document.getElementById('s9-body');
  var titleEl = document.getElementById('s9-title');
  titleEl.textContent = 'Control side' + (key === 'clutch' ? ' + chain' : key === 'prowand' ? ' + wand length' : key === 'motor' ? ' + motor type' : '');

  var sideHTML = '<div style="font-size:12px;font-weight:500;color:#444;margin-bottom:8px">Control side</div>' +
    '<div class="opt-grid-2">' +
    '<div class="opt-card' + (S.controlSide === 'Right' ? ' sel' : '') + '" id="side-right" onclick="selectSide(\'Right\')"><div class="opt-card-title">Right</div></div>' +
    '<div class="opt-card' + (S.controlSide === 'Left' ? ' sel' : '') + '" id="side-left" onclick="selectSide(\'Left\')"><div class="opt-card-title">Left</div></div>' +
    '</div>';

  var extraHTML = '';

  if (key === 'clutch') {
    extraHTML = '<div style="font-size:12px;font-weight:500;color:#444;margin:14px 0 8px">Chain color</div>' +
      '<div class="hw-color-row" id="grp-chain-color">' +
      ['White','Beige','Gray','Black'].map(function(c) {
        var dots = {White:'#F5F5F5',Beige:'#D4B896',Gray:'#909090',Black:'#1A1A1A'};
        return '<div class="hw-color-opt' + (c === S.chainColor ? ' sel' : '') + '" onclick="selChainColor(\'' + c + '\',this)"><span class="hw-dot" style="background:' + dots[c] + '"></span>' + c + '</div>';
      }).join('') + '</div>' +
      '<div style="font-size:12px;font-weight:500;color:#444;margin:14px 0 8px">Chain drop length</div>' +
      '<div class="opt-grid-3">' +
      ['2 ft','3 ft','4 ft','5 ft'].map(function(l){
        var isClosest = S.height > 0 && isChainDefault(l);
        return '<div class="opt-card' + (S.chainDrop === l ? ' sel' : '') + '" onclick="selChainDrop(\'' + l + '\')">' +
          '<div class="opt-card-title">' + l + (isClosest ? ' ✓' : '') + '</div>' +
          (isClosest ? '<div class="opt-card-desc">Default (≈2/3 height)</div>' : '') +
        '</div>';
      }).join('') + '</div>' +
      '<div class="info-box" style="margin-top:10px">Default chain is closest to 2/3 of shade height. Compliant cord tensioner included. Metal chain available — note in quote.</div>';
  }

  if (key === 'prowand') {
    extraHTML = '<div style="font-size:12px;font-weight:500;color:#444;margin:14px 0 8px">Wand length</div>' +
      '<div class="opt-grid-2">' +
      ['24"','36"','48"','60"'].map(function(l) {
        return '<div class="opt-card' + (S.wandLength === l ? ' sel' : '') + '" onclick="selWandLength(\'' + l + '\')">' +
          '<div class="opt-card-title">' + l + '</div></div>';
      }).join('') + '</div>' +
      (S.topTreatment === 'open-metal' ? '<div class="info-box" style="margin-top:10px">Pro Wand with decorative metal bracket requires top mount installation.</div>' : '');
  }

  if (key === 'motor') {
    extraHTML = '<div style="font-size:12px;font-weight:500;color:#444;margin:14px 0 8px">Motor type</div>' +
      '<div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(180px,1fr));gap:8px">' +
      [
        {v:'li-std',   label:'LI Rechargeable',     desc:'Standard lift — rechargeable lithium ion'},
        {v:'li-power', label:'LI Power Lift',        desc:'Heavy fabric/oversized — rechargeable LI'},
        {v:'dc-12v',   label:'12V DC Hardwired',     desc:'Hardwired to 12V DC power'},
        {v:'dc-ext',   label:'12V DC External',      desc:'External 12V DC power supply'},
        {v:'ac-100',   label:'AC 100–240V Hardwired',desc:'Requires licensed electrician'}
      ].map(function(m) {
        var warn = m.v === 'ac-100' ? '<div class="opt-card-desc" style="color:#dc2626">Electrician required</div>' : '<div class="opt-card-desc">' + m.desc + '</div>';
        return '<div class="opt-card' + (S.motorType === m.v ? ' sel' : '') + '" onclick="selMotorType(\'' + m.v + '\')">' +
          '<div class="opt-card-title">' + m.label + '</div>' + warn + '</div>';
      }).join('') + '</div>';
  }

  if (key === 'cordless') {
    extraHTML = '<div class="info-box" style="margin-top:10px">Cordless shades include a clear hem grip. Lift Assist pole (telescopes to 45") available — request in notes.</div>';
  }

  body.innerHTML = sideHTML + extraHTML;
}

function selectSide(side) {
  S.controlSide = side;
  ['side-right','side-left'].forEach(function(id){ var el=document.getElementById(id); if(el) el.classList.remove('sel'); });
  var el = document.getElementById('side-' + side.toLowerCase()); if(el) el.classList.add('sel');
  document.getElementById('s9-val').textContent = side;
  activateStep('step-11');
}
function selChainColor(c,el) { S.chainColor=c; document.querySelectorAll('#grp-chain-color .hw-color-opt').forEach(function(e){e.classList.remove('sel');}); el.classList.add('sel'); }
function selChainDrop(l) { S.chainDrop=l; buildControlDetails('clutch'); }
function selWandLength(l) { S.wandLength=l; buildControlDetails('prowand'); }
function selMotorType(v) { S.motorType=v; buildControlDetails('motor'); if(S.motorType==='ac-100'){ document.querySelector('#s9-body .err-box') || (document.getElementById('s9-body').insertAdjacentHTML('beforeend','<div class="err-box" style="margin-top:10px"><span>⚠️</span><span>AC hardwired motor requires installation by a licensed electrician.</span></div>')); } }
function isChainDefault(l) {
  if (!S.height) return false;
  var twoThirds = S.height * 2 / 3;
  var drops = {'2 ft':24, '3 ft':36, '4 ft':48, '5 ft':60};
  var best = Object.keys(drops).reduce(function(a,b){ return Math.abs(drops[a]-twoThirds) < Math.abs(drops[b]-twoThirds) ? a : b; });
  return l === best;
}

// ═══════════════════════════════════════════════════════════════
// STEP 10 — MOTOR ACCESSORIES
// ═══════════════════════════════════════════════════════════════
function buildMotorAcc(key) {
  var body = document.getElementById('s10-body');
  var items = [
    {id:'acc-remote15', label:'15-Channel Handheld Remote',  sub:'Controls up to 15 shades'},
    {id:'acc-switch15', label:'15-Channel Wall Switch',       sub:'Wall-mounted controller'},
    {id:'acc-prohub',   label:'Pro Hub',                     sub:'Smart home integration'},
    {id:'acc-batt',     label:'Rechargeable LI Battery Pack', sub:'External battery for remote motor'},
    {id:'acc-adapter',  label:'Plug-in Power Adapter',       sub:'Continuous power without charging'},
    {id:'acc-ext6',     label:'6" Extension Cable',          sub:'Short extension'},
    {id:'acc-ext48',    label:'48" Extension Cable',         sub:'Medium extension'},
    {id:'acc-ext96',    label:'96" Extension Cable',         sub:'Long extension'},
    {id:'acc-charger',  label:'16½ ft Charger',              sub:'Extended reach charger cable'}
  ];
  body.innerHTML = items.map(function(item) {
    return '<div class="acc-item">' +
      '<input type="checkbox" class="acc-check" id="' + item.id + '" onchange="updateMotorAcc()" style="width:16px;height:16px;cursor:pointer;flex-shrink:0;margin-top:2px">' +
      '<div><div class="acc-label">' + item.label + '</div><div class="acc-sub">' + item.sub + '</div></div>' +
    '</div>';
  }).join('');
}

function updateMotorAcc() {
  var acc = [];
  document.querySelectorAll('#s10-body .acc-check:checked').forEach(function(el) {
    var lbl = el.nextElementSibling && el.nextElementSibling.querySelector('.acc-label');
    if (lbl) acc.push(lbl.textContent);
  });
  S.motorAccessories = acc;
  document.getElementById('s10-val').textContent = acc.length ? acc.length + ' selected' : 'Optional';
}

// ═══════════════════════════════════════════════════════════════
// STEP 11 — OPTIONS
// ═══════════════════════════════════════════════════════════════
function updateOptions() {
  S.holdDown = document.getElementById('opt-holddown').checked;
  S.spacer = document.getElementById('opt-spacer').checked;
  S.valanceReturn = document.getElementById('val-return-inp') ? document.getElementById('val-return-inp').value.trim() : '';
  var opts = [];
  if (S.holdDown) opts.push('Hold-downs');
  if (S.spacer) opts.push('Spacer blocks');
  document.getElementById('s11-val').textContent = opts.length ? opts.join(', ') : 'None';
}

// ═══════════════════════════════════════════════════════════════
// DELIVERY
// ═══════════════════════════════════════════════════════════════
function selectDelivery(mode) {
  S.delivery = mode;
  document.getElementById('del-ship').classList.toggle('sel', mode === 'ship');
  document.getElementById('del-pickup').classList.toggle('sel', mode === 'pickup');
  document.getElementById('del-ship-note').style.display = mode === 'ship' ? 'block' : 'none';
  document.getElementById('del-pickup-note').style.display = mode === 'pickup' ? 'block' : 'none';
}

// ═══════════════════════════════════════════════════════════════
// STEP HELPERS
// ═══════════════════════════════════════════════════════════════
function activateStep(id) { document.getElementById(id).classList.add('active','open'); }
function toggleStep(id){const el=document.getElementById(id);el.classList.add('active');setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),60);}
function openStep(id){const el=document.getElementById(id);el.classList.add('active');setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),80);}
function completeStep(id, val) {
  var el = document.getElementById(id);
  el.classList.add('done'); el.classList.remove('active');
  var vid = id.replace('step-','s') + '-val';
  var vel = document.getElementById(vid);
  if (vel) vel.textContent = val;
}
function updateSpec(id, val) {
  var el = document.getElementById(id);
  if (!el) return;
  el.textContent = val; el.classList.remove('empty');
}

// ═══════════════════════════════════════════════════════════════
// SUBMIT QUOTE
// ═══════════════════════════════════════════════════════════════
function addWallaceNaturalRollerToCart(){
  if(!S.shadeType){ alert('Please select single or double shade before adding to cart.'); return; }
  if(!S.fabric){ alert('Please select a fabric before adding to cart.'); return; }
  if(!S.width||!S.height){ alert('Please enter dimensions before adding to cart.'); return; }

  var fab=S.fabric;
  var ttlabels={'open-std':'Open Roll — Standard Bracket','open-metal':'Open Roll — Metal Bracket','cassette':'Square Cassette','box-valance':'Box Valance','trad-valance':'Traditional Valance'};
  var ctrllabels={clutch:'Clutch',cordless:'Cordless',prowand:'Pro Wand Motor',motor:'Remote Motor'};

  var lines=[
    {label:'Product',value:'Wallace Portfolio Collection Natural Roller Shades'},
    {label:'Shade Type',value:S.shadeType==='single'?'Single Natural Roller':'Double Natural Roller'},
    {label:'Mount',value:S.mount==='inside'?'Inside Mount':'Outside Mount'},
    {label:'Width',value:(S.width||'—')+'"'},
    {label:'Height',value:(S.height||'—')+'"'},
    {label:'Quantity',value:String(S.qty||1)},
    {label:'Pattern',value:fab?fab.name:'—'},
    {label:'Price Group',value:fab?'Group '+fab.group:'—'},
    {label:'Color Code',value:S.fabColor||'— (from sample book)'},
    {label:'Top Treatment',value:ttlabels[S.topTreatment]||S.topTreatment||'—'},
    {label:'Control',value:ctrllabels[S.control]||S.control||'—'}
  ];
  var specs=lines.map(function(l){return l.label+': '+l.value;}).join(' | ');
  pbAddToCart({product:'Wallace Portfolio Collection Natural Roller Shades',lines:lines,specs:specs,price:null,qty:S.qty||1});
  pbOpenCart();
}

function submitQuote() {
  var name  = document.getElementById('q-name').value.trim();
  var phone = document.getElementById('q-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  var fab = S.fabric;
  var tt = S.topTreatment;
  var ctrl = S.control;
  var ctrllabels = {clutch:'Clutch', cordless:'Cordless', prowand:'Pro Wand Motor', motor:'Remote Motor'};
  var ttlabels = {'open-std':'Open Roll — Standard Bracket','open-metal':'Open Roll — Decorative Metal Bracket','open-dual':'Open Roll — Dual Bracket','cassette':'Square Cassette','box-valance':'Fabric-Wrapped Box Valance','trad-valance':'Traditional Valance'};
  var delivery = S.delivery === 'pickup' ? "I'll pick up (Huntingdon Valley, PA)" : 'Ship to me (UPS/FedEx from Huntingdon Valley, PA)';

  var warns = [];
  if (fab && S.width > fab.maxW) warns.push('Width exceeds fabric max (' + fab.maxW + '")');
  if (S.shadeType === 'double' && S.height > 96) warns.push('Double shade height exceeds 96" maximum');
  if (S.motorType === 'ac-100') warns.push('AC hardwired motor requires a licensed electrician');
  if (S.backFabric && S.backFabric.type === 'RD') warns.push('Room-darkening back fabric is not total blackout — light may pass through side gaps');
  if (fab && fab.rhea && (tt === 'cassette' || tt === 'box-valance')) warns.push('Rhea fabric selected with incompatible top treatment — please review');

  var im = S.mount === 'inside' ? 0.125 : 0;
  var ded = getDeduction();
  var fabW = S.width > 0 ? (S.width - im - ded).toFixed(3) + '"' : '—';

  var body = 'WALLACE PORTFOLIO COLLECTION NATURAL ROLLER SHADES — SPECIFICATION REQUEST\n\n'
    + '── CUSTOMER ──\n'
    + 'Name: ' + name + '\nPhone: ' + phone
    + '\nEmail: ' + (document.getElementById('q-email').value.trim() || '—')
    + '\nAddress: ' + (document.getElementById('q-address').value.trim() || '—') + '\n\n'
    + '── PRODUCT SPECIFICATION ──\n'
    + 'Product: Wallace Portfolio Collection Natural Roller Shades (2026)\n'
    + 'Shade type: ' + (S.shadeType === 'single' ? 'Single Natural Roller' : 'Double Natural Roller') + '\n'
    + 'Room / window: ' + (S.room || '—') + '\n'
    + 'Mount: ' + (S.mount === 'inside' ? 'Inside Mount (−1/8" deduction)' : S.mount === 'outside' ? 'Outside Mount' : '—') + '\n'
    + 'Ordered width: ' + (S.width || '—') + '"\n'
    + 'Ordered height: ' + (S.height || '—') + '"\n'
    + 'Quantity: ' + S.qty + '\n'
    + 'Approx. fabric width: ' + fabW + '\n'
    + '\n── FRONT FABRIC ──\n'
    + 'Pattern: ' + (fab ? fab.name : '—') + '\n'
    + 'Price group: ' + (fab ? 'Group ' + fab.group : '—') + '\n'
    + 'Color / PR code: ' + (S.fabColor || '— (to be confirmed with sample book)') + '\n'
    + 'Max width: ' + (fab ? fab.maxW + '"' : '—') + '\n'
    + 'Max height: ' + (fab ? fab.maxH + '"' : '—') + '\n'
    + (fab && fab.rhea ? 'NOTE: Rhea fabric — no cassette wrap, no box valance\n' : '')
    + (S.shadeType === 'double'
      ? '\n── BACK FABRIC ──\n'
        + 'Back fabric: ' + (S.backFabric ? (S.backFabric.type === 'RD' ? 'Blackout' : 'Light Filtering') + ' ' + S.backFabric.name + ' · ' + S.backFabric.code : '—') + '\n'
      : '')
    + '\n── TOP TREATMENT / BRACKET ──\n'
    + 'Top treatment: ' + (ttlabels[tt] || '—') + '\n'
    + (tt === 'cassette' ? 'Cassette color: ' + S.cassetteColor + '\nFabric wrap: ' + (S.cassetteWrap ? 'Wrapped' : 'Unwrapped') + '\n' : '')
    + (tt === 'open-metal' ? 'Bracket color: ' + S.metalBracketColor + '\n' : '')
    + 'Roll direction: ' + (S.rollDir === 'double-fixed' ? 'Front: Reverse / Back: Standard (fixed for double shades)' : S.rollDir === 'standard' ? 'Standard Roll' : S.rollDir === 'reverse' ? 'Reverse Roll' : '—') + '\n'
    + '\n── CONTROL ──\n'
    + 'Control type: ' + (ctrllabels[ctrl] || '—') + '\n'
    + (S.controlSide ? 'Control side: ' + S.controlSide + '\n' : '')
    + (ctrl === 'clutch' ? 'Chain color: ' + S.chainColor + '\nChain drop: ' + (S.chainDrop || 'default (closest to 2/3 height)') + '\n' : '')
    + (ctrl === 'prowand' ? 'Wand length: ' + (S.wandLength || '— specify') + '\n' : '')
    + (ctrl === 'motor' ? 'Motor type: ' + (S.motorType || '— specify') + '\n' : '')
    + (S.motorAccessories.length ? 'Motor accessories: ' + S.motorAccessories.join(', ') + '\n' : '')
    + '\n── OPTIONS ──\n'
    + 'Hold-down brackets: ' + (S.holdDown ? 'Yes' : 'No') + '\n'
    + 'Spacer blocks: ' + (S.spacer ? 'Yes (3/8")' : 'No') + '\n'
    + (S.valanceReturn ? 'Box valance returns: ' + S.valanceReturn + '\n' : '')
    + (warns.length ? '\n── WARNINGS / FLAGS ──\n' + warns.map(function(w){ return '• ' + w; }).join('\n') + '\n' : '')
    + '\n── DELIVERY ──\n'
    + delivery + '\n\n'
    + '── NOTES ──\n'
    + (document.getElementById('q-notes').value.trim() || 'None');

  window.location.href = 'mailto:justin@blindznation.com'
    + '?subject=' + encodeURIComponent('Wallace Natural Roller Spec — ' + name + (fab ? ' · ' + fab.name : ''))
    + '&body=' + encodeURIComponent(body);

  document.getElementById('quote-success').style.display = 'block';
}

// ── INIT ──
buildFabGrid('all');
buildBackGrids();
buildTopTreatmentStep();
buildControlStep();