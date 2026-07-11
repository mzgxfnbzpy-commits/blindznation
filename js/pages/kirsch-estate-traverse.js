// ═══════════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════════
var COLLECTIONS = {
  dm: {
    label: 'Designer Metals™',
    finishes: [
      {name:'Elegant Brass',    bg:'radial-gradient(#C8A84A,#8B6914)'},
      {name:'Antique Silver',   bg:'radial-gradient(#B0B8C0,#7A8490)'},
      {name:'Gunmetal',         bg:'radial-gradient(#4A4A52,#2A2A30)'},
      {name:'Black',            bg:'#1A1A1A'},
      {name:'Polished Nickel',  bg:'radial-gradient(#E8E8E8,#C0C0C0)'},
      {name:'Brushed Bronze',   bg:'radial-gradient(#8B5E3C,#5A3820)'},
      {name:'Gilded Bronze',    bg:'radial-gradient(#C8A040,#7A5A10)'},
      {name:'Satin Nickel',     bg:'radial-gradient(#C0C0B8,#8A8A80)'}
    ],
    finials: [
      {name:'Archer',       depth:'4"',        note:'cage-style'},
      {name:'Briggs',       depth:'3-7/16"',   note:''},
      {name:'Briggs Duotone',depth:'3-7/16"', note:'two-tone finish'},
      {name:'Corsa',        depth:'1⅝"',       note:'slim low-profile'},
      {name:'Elmore',       depth:'3"',         note:''},
      {name:'Emerson',      depth:'2⅞"',        note:''},
      {name:'Europa',       depth:'3"',         note:'crystal accent'},
      {name:'Harlow',       depth:'4"',         note:'flat disc'},
      {name:'Lenn',         depth:'1-15/16"',  note:'crystal'},
      {name:'Odessa',       depth:'3-7/32"',   note:'ribbed sphere'},
      {name:'Pandora',      depth:'4"',         note:'ball'},
      {name:'Quinn',        depth:'3-3/16"',   note:'faceted'},
      {name:'Rao',          depth:'⅞"',         note:'very low-profile'},
      {name:'Stratta',      depth:'2¼"',        note:'square-ish'},
      {name:'Vivien',       depth:'3⅝"',        note:''},
      {name:'Round Endcap', depth:'—',          note:'clean finish, no projection'},
      {name:'Square Endcap',depth:'—',          note:'clean finish, no projection'}
    ],
    accessories: [
      {id:'dm-rings',  label:'Rings (int 1¾" · ext 2⅛")', sub:'Per pair, per finish — for stationary panels on traverse'},
      {id:'dm-bypass', label:'Bypass C-Ring',               sub:'For bypass panel applications'},
      {id:'dm-trans',  label:'Transitional Ring (int 1⅝")',sub:'Allows smaller rings on 1⅜" rod'},
      {id:'dm-lock',   label:'Lock Ring',                   sub:'French return use only'},
      {id:'dm-baton',  label:'36" Baton w/ Bypass C-Ring (#1831558)', sub:'For hand-draw operation'},
      {id:'dm-splice', label:'Internal Rod Splice (#73304061 Bright Zinc)', sub:'For spans over 180" — extends pole'}
    ]
  },
  wt: {
    label: 'Wood Trends™',
    finishes: [
      {name:'Black',            bg:'#1A1A1A'},
      {name:'Coffee',           bg:'radial-gradient(#6B4423,#3A2010)'},
      {name:'Dark Chocolate',   bg:'radial-gradient(#3A2010,#200808)'},
      {name:'Estate Oak',       bg:'radial-gradient(#C8A870,#8B6830)'},
      {name:'Mahogany',         bg:'radial-gradient(#5C2010,#380808)'},
      {name:'Marble',           bg:'radial-gradient(#E0D8C8,#C0B0A0)'},
      {name:'Truffle',          bg:'radial-gradient(#8B6830,#5C4020)'},
      {name:'White',            bg:'#F5F5F5'}
    ],
    finials: [
      {name:'Ball',        depth:'varies', note:'classic round finial'},
      {name:'Disc/Flat',   depth:'varies', note:'low-profile modern'},
      {name:'Spear/Tapered',depth:'varies',note:'traditional pointed'},
      {name:'Cylinder/Barrel',depth:'varies',note:'clean cylindrical'},
      {name:'Square/Block',depth:'varies', note:'contemporary'},
      {name:'Open/Cage',   depth:'varies', note:'decorative cage style'},
      {name:'Ethan',       depth:'varies', note:'ball style (shown in AMP brochure)'},
      {name:'Endcap',      depth:'—',     note:'clean finish'},
      {name:'Custom / Other', depth:'—',  note:'contact us for full Wood Trends finial catalog'}
    ],
    accessories: [
      {id:'wt-rings',  label:'Rings (int 1¾" · ext 2⅛")', sub:'Finish-matched wood rings'},
      {id:'wt-bypass', label:'Bypass C-Ring',               sub:'For bypass panel applications'},
      {id:'wt-lock',   label:'Lock Ring',                   sub:'French return use only'},
      {id:'wt-baton',  label:'36" Baton',                   sub:'For hand-draw operation'},
      {id:'wt-holdback',label:'Holdback Medallions',        sub:'Matching finish — wall-mount tieback brackets'}
    ]
  },
  wi: {
    label: 'Wrought Iron',
    finishes: [
      {name:'Black',            bg:'#1A1A1A'},
      {name:'Iron Oxide',       bg:'radial-gradient(#6B5A48,#3A2A20)'},
      {name:'Rust',             bg:'radial-gradient(#C86020,#903010)'},
      {name:'Graphite',         bg:'radial-gradient(#606870,#404850)',  note:'NEW 2026'},
      {name:'Chalk',            bg:'#F0EDE8',                            note:'NEW 2026'},
      {name:'Heirloom Copper',  bg:'radial-gradient(#C87840,#905020)',   note:'NEW 2026'}
    ],
    finials: [
      {name:'Axiom',            depth:'3-13/16"', note:''},
      {name:'Darby',            depth:'3¼"',      note:''},
      {name:'Lincoln',          depth:'2⅝"',      note:''},
      {name:'Otto',             depth:'2-9/16"',  note:''},
      {name:'Pedestal Ball',    depth:'4⅞"',      note:'ornate base'},
      {name:'Petite Faucet',    depth:'2⅜"',      note:'slim faucet style'},
      {name:'Petite Modern Ball',depth:'3⅜"',     note:''},
      {name:'Ponce',            depth:'5½"',      note:'large statement finial'},
      {name:'Endcap',           depth:'1⅛"',      note:'clean finish'}
    ],
    accessories: [
      {id:'wi-rings',  label:'Rings (int 2" · ext 2½")',    sub:'Wrought iron finish-matched rings'},
      {id:'wi-bypass', label:'Bypass C-Ring',               sub:'For bypass panel applications'},
      {id:'wi-lock',   label:'Lock Ring',                   sub:'French return use only'},
      {id:'wi-baton',  label:'36" Baton w/ Bypass C-Ring (#56376xxx)', sub:'For hand-draw operation'},
      {id:'wi-splice', label:'Internal Rod Splice (Zinc #56466061)',    sub:'For spans over the max single rod length'},
      {id:'wi-tape',   label:'Teflon Tape (#84990000)',                 sub:'Reduces friction on carrier slides'}
    ]
  }
};

// Pleated stackback table (2.5x fullness, 4 carriers/ft)
var STACK_TABLE = [
  {len:48,  ow:17,   tw:11.25},
  {len:72,  ow:22.25,tw:14},
  {len:96,  ow:27.5, tw:16.5},
  {len:120, ow:33,   tw:19.25},
  {len:144, ow:38.25,tw:21.75},
  {len:192, ow:48.75,tw:27}
];

// ═══════════════════════════════════════════════════════════════
// STATE
// ═══════════════════════════════════════════════════════════════
var S = {
  coll: '', finish: '', header: '', fullness: '100%',
  draw: '', mount: '', trackLen: 0, qty: 1,
  finial: '', motorized: false, motorSide: '',
  accessories: [], delivery: 'ship'
};

// ═══════════════════════════════════════════════════════════════
// COLLECTION
// ═══════════════════════════════════════════════════════════════
function selectColl(c) {
  S.coll = c; S.finish = ''; S.finial = '';
  ['dm','wt','wi'].forEach(function(id){ document.getElementById('coll-'+id).classList.toggle('sel', id===c); });
  var label = COLLECTIONS[c].label;
  completeStep('step-2', label);
  updateSpec('sp-coll', label);
  updateSpec('sp-finish', '—'); document.getElementById('sp-finish').classList.add('empty');
  updateSpec('sp-finial', '—'); document.getElementById('sp-finial').classList.add('empty');
  buildFinishStep(c);
  buildFinialStep(c);
  buildAccStep(c);
  activateStep('step-3');
}

// ═══════════════════════════════════════════════════════════════
// FINISH
// ═══════════════════════════════════════════════════════════════
function buildFinishStep(c) {
  var body = document.getElementById('s3-body');
  var finishes = COLLECTIONS[c].finishes;
  var warn = c === 'wt' ? '<div class="err-box" style="margin-bottom:10px"><span>⚠️</span><span><strong>Unfinished is not available for Estate™ Traverse Rods</strong> — stationary poles only. All 8 wood finishes above are available.</span></div>' : '';
  body.innerHTML = warn + '<div class="finish-grid">' +
    finishes.map(function(f) {
      var noteHtml = f.note ? '<div style="font-size:9px;color:var(--gold);font-weight:600;margin-top:2px">' + f.note + '</div>' : '';
      return '<div class="finish-card" id="fin-' + f.name.replace(/\s/g,'-') + '" onclick="selectFinish(\'' + f.name.replace(/'/g,"'") + '\')">' +
        '<div class="finish-swatch" style="background:' + f.bg + (f.name.includes('White')||f.name.includes('Chalk')?';border:2px solid #ddd':'') + '"></div>' +
        '<div class="finish-name">' + f.name + '</div>' + noteHtml +
      '</div>';
    }).join('') + '</div>';
}

function selectFinish(name) {
  S.finish = name;
  document.querySelectorAll('.finish-card').forEach(function(el){ el.classList.remove('sel'); });
  var id = 'fin-' + name.replace(/\s/g,'-');
  var el = document.getElementById(id);
  if (el) el.classList.add('sel');
  completeStep('step-3', name);
  updateSpec('sp-finish', name);
  activateStep('step-4');
}

// ═══════════════════════════════════════════════════════════════
// HEADER
// ═══════════════════════════════════════════════════════════════
function selectHeader(h) {
  S.header = h;
  document.getElementById('hdr-pleated').classList.toggle('sel', h==='pleated');
  document.getElementById('hdr-ripple').classList.toggle('sel', h==='ripplefold');
  document.getElementById('ripple-fullness-wrap').style.display = h==='ripplefold' ? 'block' : 'none';
  var label = h==='pleated' ? 'Pleated Carriers' : 'Ripplefold™ Carriers (' + S.fullness + ' fullness)';
  completeStep('step-4', label);
  updateSpec('sp-header', label);
  activateStep('step-5');
}

function selectFullness(f) {
  S.fullness = f;
  ['60%','80%','100%','120%'].forEach(function(v){
    var el = document.getElementById('rf-'+v.replace('%',''));
    if (el) el.classList.toggle('sel', v===f);
  });
  var label = 'Ripplefold™ Carriers (' + f + ' fullness)';
  completeStep('step-4', label);
  updateSpec('sp-header', label);
}

// ═══════════════════════════════════════════════════════════════
// DRAW TYPE
// ═══════════════════════════════════════════════════════════════
function selectDraw(d) {
  S.draw = d;
  ['two-way','one-right','one-left'].forEach(function(id){ document.getElementById('draw-'+id).classList.remove('sel'); });
  document.getElementById('draw-'+d).classList.add('sel');
  var labels = {'two-way':'Two-Way / Split Draw','one-way-right':'One-Way Right','one-way-left':'One-Way Left'};
  completeStep('step-5', labels[d]);
  updateSpec('sp-draw', labels[d]);
  document.getElementById('draw-amp-note').style.display = S.motorized ? 'block' : 'none';
  calcTrack();
  activateStep('step-6');
}

// ═══════════════════════════════════════════════════════════════
// MOUNT
// ═══════════════════════════════════════════════════════════════
function selectMount(m) {
  S.mount = m;
  ['wall','ceil','double'].forEach(function(id){ document.getElementById('mnt-'+id).classList.remove('sel'); });
  document.getElementById('mnt-'+m).classList.add('sel');
  var labels = {wall:'Wall mount',ceiling:'Ceiling mount',double:'Double Rod'};
  var detail = document.getElementById('mount-detail');
  if (m === 'wall') {
    detail.innerHTML = '<div class="info-box">Wall mount bracket #94129061 (Zinc) · #1856973 (Satin Nickel) · #1856978 (Brushed Bronze) · #1857324 (Black). Adjustable projection 3¼"–4¾". AMP™ compatible.</div>';
  } else if (m === 'ceiling') {
    detail.innerHTML = '<div class="info-box">Ceiling mount bracket #1796061 — order one per bracket location. Flat bracket included with rod. Top-hole measurement: no addition needed (floor-to-ceiling: subtract 3⅝"; pin set ½"). AMP™ compatible.</div>';
  } else if (m === 'double') {
    detail.innerHTML = '<div class="info-box"><strong>Double Rod Configurations:</strong><br>' +
      '• 1⅜" front + 1⅜" back using bracket #71134110 (Satin Brass, height 2¼") — projections ~7⅞" / ~5⅛"<br>' +
      '• 1⅜" + 1⅜" using #71132062/110/006/012 (height 3⅛") — projections 9¼" / 5¼", returns 8¼" / 4¼"<br>' +
      'Specify front and back finish/collection separately if mixing. Both AMP™ compatible on the same double bracket.</div>';
  }
  completeStep('step-6', labels[m]);
  updateSpec('sp-mount', labels[m]);
  activateStep('step-7');
}

// ═══════════════════════════════════════════════════════════════
// TRACK LENGTH
// ═══════════════════════════════════════════════════════════════
function calcTrackFt() {
  var ft = parseFloat(document.getElementById('track-ft').value) || 0;
  var inches = ft * 12;
  document.getElementById('track-len').value = inches > 0 ? inches.toFixed(1) : '';
  calcTrack();
}

function adjQty(d) {
  var inp = document.getElementById('track-qty-inp');
  var v = (parseInt(inp.value) || 1) + d;
  if (v < 1) v = 1;
  if (v > 20) v = 20;
  inp.value = v;
  calcTrack();
}

function calcTrack() {
  var len = parseFloat(document.getElementById('track-len').value) || 0;
  if (len > 0) document.getElementById('track-ft').value = (len/12).toFixed(2);
  S.trackLen = len;
  S.qty = parseInt(document.getElementById('track-qty-inp').value) || 1;

  var msgs = document.getElementById('track-msgs');
  msgs.innerHTML = '';
  if (!len) { document.getElementById('track-computed').style.display='none'; return; }

  var errors = [], warns = [];
  if (len < 18) errors.push('Minimum track length is 18".');
  if (len > 192) errors.push('Maximum track length is 192" (16 ft). Contact us for custom lengths.');

  errors.forEach(function(e){ msgs.innerHTML += '<div class="err-box"><span>⚠️</span><span>' + e + '</span></div>'; });
  if (errors.length) { document.getElementById('track-computed').style.display='none'; return; }

  var splice = len > 96 ? 'Yes — 1 splice + 1 keystone included' : 'No';
  if (len > 96) warns.push('Track over 8 ft — one splice and keystone are included with the rod.');

  // Bracket count: end brackets always + center brackets at ~48" intervals
  var brackets = Math.max(2, Math.ceil(len / 48) + 1);
  // Per the Kirsch spacing rule, stack-end gets 24" then 48" intervals
  // For simplicity: 2 ends + ceil((len-48)/48) center brackets, min 2 total
  if (len <= 48) brackets = 2;
  else if (len <= 96) brackets = 3;
  else if (len <= 144) brackets = 4;
  else if (len <= 192) brackets = 5;

  // Weight limit per foot check
  var maxWeight = Math.min(64, len / 12 * 4);

  // Stackback estimate
  var stack = '';
  if (S.draw && S.header) {
    stack = getStackback(len, S.draw === 'two-way');
  }

  warns.forEach(function(w){ msgs.innerHTML += '<div class="warn-box"><span>⚠️</span><span>' + w + '</span></div>'; });
  if (!errors.length) msgs.innerHTML += '<div class="size-ok">✓ Track length within specification.</div>';

  document.getElementById('cp-len').textContent = len + '" (' + (len/12).toFixed(2) + ' ft)';
  document.getElementById('cp-splice').textContent = splice;
  document.getElementById('cp-brackets').textContent = brackets + ' brackets (end brackets + center brackets at 48" intervals; first center within 24" of stack end)';
  document.getElementById('cp-weight').textContent = maxWeight.toFixed(0) + ' lbs max (' + (len/12).toFixed(1) + ' ft × 4 lbs/ft = ' + (len/12*4).toFixed(0) + '; hard max 64 lbs)';

  var stackRow = document.getElementById('cp-stack-row');
  if (stack) {
    stackRow.style.display = 'flex';
    document.getElementById('cp-stack').textContent = stack;
  } else {
    stackRow.style.display = 'none';
  }
  document.getElementById('track-computed').style.display = 'block';

  updateSpec('sp-len', len + '"');
  updateSpec('sp-brackets', brackets + ' (est.)');
  document.getElementById('s1-val').textContent = len + '"';
  completeStep('step-1', len + '" (' + (len/12).toFixed(1) + ' ft)');
}

function getStackback(len, isTwoWay) {
  // Interpolate from table
  var table = STACK_TABLE;
  if (len <= table[0].len) { var r = table[0]; return isTwoWay ? r.tw + '" per side (pleated, 2.5x)' : r.ow + '" one-side (pleated, 2.5x)'; }
  if (len >= table[table.length-1].len) { var r = table[table.length-1]; return isTwoWay ? r.tw + '" per side' : r.ow + '" one-side'; }
  for (var i = 0; i < table.length-1; i++) {
    var a = table[i], b = table[i+1];
    if (len >= a.len && len <= b.len) {
      var t = (len - a.len) / (b.len - a.len);
      var ow = (a.ow + t * (b.ow - a.ow)).toFixed(1);
      var tw = (a.tw + t * (b.tw - a.tw)).toFixed(1);
      return isTwoWay ? tw + '" per side (pleated, 2.5x fullness)' : ow + '" (pleated, 2.5x fullness)';
    }
  }
  return '—';
}

// ═══════════════════════════════════════════════════════════════
// FINIALS
// ═══════════════════════════════════════════════════════════════
function buildFinialStep(c) {
  var body = document.getElementById('s7-body');
  var finials = COLLECTIONS[c] ? COLLECTIONS[c].finials : [];
  body.innerHTML = '<div style="font-size:12px;color:#666;margin-bottom:8px;line-height:1.6">Select your finial style. All finials available in all ' + (COLLECTIONS[c]?COLLECTIONS[c].finishes.length:0) + ' ' + (COLLECTIONS[c]?COLLECTIONS[c].label:'') + ' finishes. Sold as a pair.</div>' +
    '<div class="finial-grid">' +
    finials.map(function(f) {
      return '<div class="finial-card" id="fn-' + f.name.replace(/\s/g,'-') + '" onclick="selectFinial(\'' + f.name.replace(/'/g,"\\'") + '\')">' +
        '<div class="finial-name">' + f.name + '</div>' +
        '<div class="finial-depth">' + (f.depth !== '—' ? 'Depth: ' + f.depth : '') + (f.note ? ' · ' + f.note : '') + '</div>' +
      '</div>';
    }).join('') + '</div>';
}

function selectFinial(name) {
  S.finial = name;
  document.querySelectorAll('.finial-card').forEach(function(el){ el.classList.remove('sel'); });
  var el = document.getElementById('fn-' + name.replace(/\s/g,'-'));
  if (el) el.classList.add('sel');
  completeStep('step-7', name + ' (pair)');
  updateSpec('sp-finial', name);
  activateStep('step-8');
}

// ═══════════════════════════════════════════════════════════════
// AMP MOTORIZATION
// ═══════════════════════════════════════════════════════════════
function selectAMP(on) {
  S.motorized = on;
  document.getElementById('amp-no').classList.toggle('sel', !on);
  document.getElementById('amp-yes').classList.toggle('sel', on);
  document.getElementById('amp-detail').style.display = on ? 'block' : 'none';
  var label = on ? 'AMP™ Motorized' : 'Manual';
  completeStep('step-8', label);
  updateSpec('sp-motor', label);
  document.getElementById('draw-amp-note').style.display = on && S.draw ? 'block' : 'none';
  activateStep('step-9');
}

function selectAMPSide(side) {
  S.motorSide = side;
  ['amp-right','amp-left'].forEach(function(id){ document.getElementById(id).classList.remove('sel'); });
  document.getElementById('amp-' + side).classList.add('sel');
  updateSpec('sp-motor', 'AMP™ Motorized — motor ' + side);
}

// ═══════════════════════════════════════════════════════════════
// ACCESSORIES
// ═══════════════════════════════════════════════════════════════
function buildAccStep(c) {
  var list = document.getElementById('acc-list');
  var items = COLLECTIONS[c] ? COLLECTIONS[c].accessories : [];
  list.innerHTML = items.map(function(item) {
    return '<div class="acc-item">' +
      '<input type="checkbox" id="' + item.id + '" onchange="updateAcc()" style="width:15px;height:15px;cursor:pointer;flex-shrink:0;margin-top:2px">' +
      '<div><div class="acc-label">' + item.label + '</div><div class="acc-sub">' + item.sub + '</div></div>' +
    '</div>';
  }).join('');
}

function updateAcc() {
  var acc = [];
  document.querySelectorAll('#acc-list input:checked').forEach(function(el){
    var lbl = el.nextElementSibling && el.nextElementSibling.querySelector('.acc-label');
    if (lbl) acc.push(lbl.textContent);
  });
  S.accessories = acc;
  document.getElementById('s9-val').textContent = acc.length ? acc.length + ' selected' : 'None';
}

// ═══════════════════════════════════════════════════════════════
// WEIGHT CALCULATOR
// ═══════════════════════════════════════════════════════════════
function calcWeight() {
  var yards = parseFloat(document.getElementById('fw-yards').value) || 0;
  var width = parseFloat(document.getElementById('fw-width').value) || 0;
  var oz    = parseFloat(document.getElementById('fw-oz').value) || 0;
  var result = document.getElementById('weight-result');
  if (!yards || !width || !oz) { result.innerHTML = ''; return; }
  var sqYds = (yards * 36 * width) / 1296;
  var lbs   = (sqYds * oz) / 16;
  var maxW  = S.trackLen > 0 ? Math.min(64, S.trackLen / 12 * 4) : 64;
  var pct   = (lbs / maxW * 100).toFixed(0);
  var cls   = lbs > maxW ? 'err-box' : lbs > maxW * 0.85 ? 'warn-box' : 'size-ok';
  result.innerHTML = '<div class="' + cls + '">' +
    '<strong>Estimated weight: ' + lbs.toFixed(1) + ' lbs</strong><br>' +
    'Fabric: ' + sqYds.toFixed(1) + ' sq yds × ' + oz + ' oz/sq yd ÷ 16 = ' + lbs.toFixed(1) + ' lbs<br>' +
    'Track limit: ' + maxW.toFixed(0) + ' lbs — using ' + pct + '%' +
    (lbs > maxW ? '<br><strong>⚠ EXCEEDS LIMIT — reduce yardage, choose lighter fabric, or split into two rods.</strong>' : '') +
  '</div>';
  document.getElementById('s10-val').textContent = lbs.toFixed(1) + ' lbs';
}

// ═══════════════════════════════════════════════════════════════
// DELIVERY
// ═══════════════════════════════════════════════════════════════
function selectDel(m) {
  S.delivery = m;
  document.getElementById('del-ship').classList.toggle('sel', true);
}

// ═══════════════════════════════════════════════════════════════
// SUBMIT
// ═══════════════════════════════════════════════════════════════
function getAMPAcc() {
  var ids = ['acc-remote-wh','acc-remote-bk','acc-switch-surf','acc-switch-flush','acc-bridge','acc-ext-15','acc-ext-4','acc-ext-10','acc-ext-20'];
  var labels = ['RF Remote White #62101000','RF Remote Black #62101010','Surface Mount Wall Switch #62109000','Flush Mount Wall Switch #62108000','USB Bridge/Gateway #62102000','15" Cable Extension #1026660','4\' Cable Extension #1026661','10\' Cable Extension #1026662','20\' Cable Extension #1026663'];
  var selected = [];
  ids.forEach(function(id,i){ var el=document.getElementById(id); if(el&&el.checked) selected.push(labels[i]); });
  return selected;
}

function submitQuote() {
  var name  = document.getElementById('cf-name').value.trim();
  var phone = document.getElementById('cf-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  var len    = S.trackLen;
  var brackets = len <= 48 ? 2 : len <= 96 ? 3 : len <= 144 ? 4 : 5;
  var delivery = 'Ship to me (UPS/FedEx)';
  var ampAcc = S.motorized ? getAMPAcc() : [];
  var stack  = (S.draw && S.header && len) ? getStackback(len, S.draw==='two-way') : '—';

  var warns = [];
  if (len > 96) warns.push('Track over 8 ft — 1 splice + 1 keystone included');
  if (S.motorized) warns.push('Motorized: DO NOT bend or curve track · One motor only · 6 ft power cord — plan outlet location');
  if (S.coll === 'wt') warns.push('Wood Trends: Unfinished finish is NOT available on Estate Traverse Rods');

  var body = 'KIRSCH 1⅜" ESTATE™ TRAVERSE ROD — SPECIFICATION REQUEST\n\n'
    + '── CUSTOMER ──\n'
    + 'Name: ' + name + '\nPhone: ' + phone
    + '\nEmail: ' + (document.getElementById('cf-email').value.trim() || '—')
    + '\nAddress: ' + (document.getElementById('cf-address').value.trim() || '—') + '\n\n'
    + '── PRODUCT SPECIFICATION ──\n'
    + 'Product: Kirsch 1⅜" Estate™ Traverse Rod\n'
    + 'Collection: ' + (COLLECTIONS[S.coll] ? COLLECTIONS[S.coll].label : '—') + '\n'
    + 'Finish: ' + (S.finish || '—') + '\n'
    + 'Header / carrier: ' + (S.header === 'ripplefold' ? 'Ripplefold™ Carriers — ' + S.fullness + ' fullness' : S.header === 'pleated' ? 'Pleated Carriers (16mm ball-bearing)' : '—') + '\n'
    + 'Draw type: ' + (S.draw === 'two-way' ? 'Two-Way / Split Draw' : S.draw === 'one-way-right' ? 'One-Way Right' : S.draw === 'one-way-left' ? 'One-Way Left' : '—') + '\n'
    + 'Mount type: ' + (S.mount === 'wall' ? 'Wall mount' : S.mount === 'ceiling' ? 'Ceiling mount' : S.mount === 'double' ? 'Double Rod' : '—') + '\n'
    + 'Track length: ' + (len ? len + '" (' + (len/12).toFixed(2) + ' ft)' : '—') + '\n'
    + 'Quantity: ' + S.qty + ' rod(s)\n'
    + 'Splice required: ' + (len > 96 ? 'Yes — 1 splice + 1 keystone' : len ? 'No' : '—') + '\n'
    + 'Bracket count (est.): ' + (len ? brackets + ' brackets' : '—') + '\n'
    + 'Max fabric weight for this track: ' + (len ? Math.min(64, len/12*4).toFixed(0) + ' lbs' : '64 lbs') + '\n'
    + 'Estimated stackback: ' + stack + '\n'
    + 'Finial: ' + (S.finial || '— not specified') + '\n'
    + '\n── MOTORIZATION ──\n'
    + 'AMP™ Motorization: ' + (S.motorized ? 'YES' : 'No — manual') + '\n'
    + (S.motorized ? 'Motor side: ' + (S.motorSide || '— specify') + '\n' +
      'Motor product #: 62001300 (DC 16.5V White)\n' +
      'Note: One motor only · 6 ft cord · plan outlet location\n' : '')
    + (ampAcc.length ? 'AMP accessories:\n' + ampAcc.map(function(a){ return '  • ' + a; }).join('\n') + '\n' : '')
    + '\n── ACCESSORIES ──\n'
    + (S.accessories.length ? S.accessories.map(function(a){ return '• ' + a; }).join('\n') : 'None') + '\n'
    + (warns.length ? '\n── NOTES / WARNINGS ──\n' + warns.map(function(w){ return '• ' + w; }).join('\n') + '\n' : '')
    + '\n── DELIVERY ──\n' + delivery + '\n\n'
    + '── CUSTOMER NOTES ──\n' + (document.getElementById('cf-notes').value.trim() || 'None');

  window.location.href = 'mailto:blindznation@gmail.com'
    + '?subject=' + encodeURIComponent('Kirsch 1⅜" Estate Traverse — ' + (S.finish||'') + ' ' + (COLLECTIONS[S.coll]?COLLECTIONS[S.coll].label:'') + ' — ' + name)
    + '&body=' + encodeURIComponent(body);
  document.getElementById('quote-success').style.display = 'block';
}

// ═══════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════
function activateStep(id){ var el=document.getElementById(id); if(el) el.classList.add('active','open'); }
function toggleStep(id){ var el=document.getElementById(id); if(el) el.classList.toggle('open'); }
function completeStep(id,val){
  var el=document.getElementById(id); if(!el) return;
  el.classList.add('done'); el.classList.remove('active');
  var vid=id.replace('step-','s')+'-val', vel=document.getElementById(vid);
  if(vel) vel.textContent=val;
}
function updateSpec(id,val){
  var el=document.getElementById(id); if(!el) return;
  el.textContent=val; el.classList.remove('empty');
}

function addKirschEstateTraverseToCart() {
  var collLabel = COLLECTIONS[S.coll] ? COLLECTIONS[S.coll].label : (S.coll || '—');
  var len = S.trackLen ? S.trackLen + '″' : '—';
  var lines = [
    { label: 'Product', value: 'Kirsch 1⅜" Estate™ Traverse Rod' },
    { label: 'Collection', value: collLabel },
    { label: 'Finish', value: S.finish || '—' },
    { label: 'Track Length', value: len },
    { label: 'Draw', value: S.draw || '—' },
    { label: 'Quantity', value: String(S.qty || 1) }
  ];
  pbAddToCart({ product: 'Kirsch 1⅜" Estate™ Traverse Rod', lines: lines, specs: lines.map(function(l){ return l.label+': '+l.value; }).join(' | '), qty: S.qty || 1 });
  pbOpenCart();
}
