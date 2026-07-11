// Norman Portrait™ Cellular — standalone configurator

// ── Pricing tables ────────────────────────────────────────────
const CELL_W = [24,30,36,42,48,54,60,66,72,84,96,108,120];
const CELL_H = [36,42,48,54,60,66,72,78,84,90,96,108,120,144];
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

// ── Size codes ────────────────────────────────────────────────
const CELL_SZ_IDX = {'38s':0,'916s':1,'12d':2,'34s':3,'34d':4,'114s':5};

// ── Cell size / fabric compatibility (Norman Portrait catalog) ─
const CELL_COMPAT = {
  // indices: 0=3⁄8S · 1=9⁄16S · 2=1⁄2D · 3=3⁄4S · 4=3⁄4D · 5=1¼S
  'lf':   [0,1,2,3,4,5],
  'rd':   [  1,2,3,4,5],
  'sheer':[0,  3,  5],   // Sheer single shade: 3⁄8″S, 3⁄4″S, 1¼″S (9⁄16″S is D&N-only; not in double cells) — Norman Portrait chart
  'dn':   [0,1,2,3,4,5]
};

// ── 9/16"S limited color sets ─────────────────────────────────
const CELL_916S_LF = new Set(['C7015K','C7016K','C7017K','C7427K','C7135K','C7138K',
  'C7423K','C7424K','C7425K','C7142K','C7208K','C7143K','C7516K','C7617K','C7715K']);
const CELL_916S_RD = new Set(['C4008T','C4009T','C4010T','C4011T','C4427T','C4123T',
  'C4126T','C4420T','C4421T','C4422T','C4131T','C4205T','C4130T','C4518T','C4609T','C4708T']);

// ── Color data ────────────────────────────────────────────────
const CELL_COLLECTIONS = {
  'sheer': [
    {name:'Sheer', colors:[
      {n:'Cloud White',    c:'C5004'},{n:'Seapearl',       c:'C5001'},
      {n:'Cloudy Chiffon', c:'C5002'},{n:'Jersey Cream',   c:'C5501'},
      {n:'Nightfall',      c:'C5201'}
    ]}
  ],
  'lf': [
    {name:'Whites & Creams', colors:[
      {n:'Brilliant White',c:'C7015K'},{n:'Cotton Cloud',  c:'C7016K'},{n:'Gardenia',      c:'C7017K'},
      {n:'White Cream',    c:'C7515K'},{n:'Daisy',         c:'C7133K'},{n:'Provence Cream', c:'C7417K'},
      {n:'Yellow Bliss',   c:'C7510K'},{n:'Morning Blush', c:'C7303K'},{n:'White Rain',     c:'C7703K'}
    ]},
    {name:'Naturals & Warm Tones', colors:[
      {n:'Natural Tan',    c:'C7423K'},{n:'Pale Oak',       c:'C7424K'},{n:'New Camel',      c:'C7516K'},
      {n:'Wheat',          c:'C7427K'},{n:'Pashmina',       c:'C7408K'},{n:'Autumn Gold',    c:'C7506K'},
      {n:'Cabin',          c:'C7433K'},{n:'River Rock',     c:'C7507K'},{n:'Reflections',    c:'C7145K'},
      {n:'Annapolis Gray', c:'C7105K'},{n:'Morning Mist',   c:'C7121K'},{n:'Whipped Mocha',  c:'C7425K'},
      {n:'Rue Bourbon',    c:'C7426K'},{n:'Coffee Beans',   c:'C7434K'}
    ]},
    {name:'Silvers & Grays', colors:[
      {n:'Seal Gray',      c:'C7139K'},{n:'Silver Satin',   c:'C7134K'},{n:'French Silver',  c:'C7135K'},
      {n:'Classic Silver', c:'C7136K'},{n:'Power Gray',     c:'C7137K'},{n:'Iron Mountain',  c:'C7138K'},
      {n:'Orion Gray',     c:'C7140K'},{n:'Silver Dusk',    c:'C7143K'},{n:'Space Gray',     c:'C7208K'},
      {n:'Dew',            c:'C7142K'}
    ]},
    {name:'Blues', colors:[
      {n:'Florida Keys',  c:'C7617K'},{n:'Bella Blue',    c:'C7715K'},{n:'Ocean Air',      c:'C7705K'},
      {n:'Seaside Blue',  c:'C7704K'},{n:'Blue Flower',   c:'C7706K'},{n:'Lakeside',       c:'C7702K'},
      {n:'Smokey Blue',   c:'C7709K'},{n:'Spring Sky',    c:'C7107K'},{n:'Catalina Blue',  c:'C7603K'}
    ]},
    {name:'Greens & Accents', colors:[
      {n:'Fernwood',      c:'C7604K'},{n:'Meadows',        c:'C7612K'},{n:'Mulberry',       c:'C7802K'},
      {n:'Eggplant',      c:'C7104K'},{n:'Pacific Cove',   c:'C7305K'},{n:'Roasted Pumpkin',c:'C7306K'},
      {n:'Black Olive',   c:'C7201K'}
    ]}
  ],
  'rd': [
    {name:'Whites & Creams', colors:[
      {n:'Brilliant White RD',c:'C4008T'},{n:'Cotton Cloud RD',  c:'C4009T'},{n:'Gardenia RD',     c:'C4010T'},
      {n:'White Cream RD',   c:'C4517T'},{n:'Daisy RD',          c:'C4121T'},{n:'Provence Cream RD',c:'C4431T'},
      {n:'Yellow Bliss RD',  c:'C4519T'},{n:'Soft Stone RD',     c:'C4011T'}
    ]},
    {name:'Naturals & Warm Tones', colors:[
      {n:'Natural Tan RD',   c:'C4420T'},{n:'Pale Oak RD',       c:'C4421T'},{n:'New Camel RD',    c:'C4518T'},
      {n:'Wheat RD',         c:'C4427T'},{n:'Pashmina RD',       c:'C4433T'},{n:'Autumn Gold RD',  c:'C4520T'},
      {n:'Cabin RD',         c:'C4430T'},{n:'River Rock RD',     c:'C4521T'},{n:'Reflections RD',  c:'C4135T'},
      {n:'Annapolis Gray RD',c:'C4102T'},{n:'Morning Mist RD',   c:'C4133T'},{n:'Whipped Mocha RD',c:'C4422T'},
      {n:'Rue Bourbon RD',   c:'C4423T'},{n:'Coffee Beans RD',   c:'C4432B'}
    ]},
    {name:'Silvers & Grays', colors:[
      {n:'Seal Gray RD',     c:'C4129T'},{n:'Silver Satin RD',   c:'C4122T'},{n:'French Silver RD',c:'C4123T'},
      {n:'Classic Silver RD',c:'C4124T'},{n:'Power Gray RD',     c:'C4125T'},{n:'Iron Mountain RD',c:'C4126T'},
      {n:'Orion Gray RD',    c:'C4127T'},{n:'Silver Dusk RD',    c:'C4130T'},{n:'Space Gray RD',   c:'C4205T'},
      {n:'Dew RD',           c:'C4131T'}
    ]},
    {name:'Blues', colors:[
      {n:'Florida Keys RD',c:'C4609T'},{n:'Bella Blue RD',   c:'C4708T'},
      {n:'Ocean Air RD',   c:'C4709T'},{n:'Black Olive RD',  c:'C4201B'}
    ]}
  ],
  'dn': [
    {name:'Day & Night combinations — specify at consultation', colors:[
      {n:'Sheer + Room Darkening', c:'DN-SR'},{n:'Sheer + Light Filtering', c:'DN-SL'},
      {n:'Light Filtering + Room Darkening', c:'DN-LR'},{n:'Light Filtering + Light Filtering', c:'DN-LL'},
      {n:'Woven Windsong + Light Filtering', c:'DN-WL'},{n:'Woven Windsong + Room Darkening', c:'DN-WR'}
    ]}
  ]
};

const CELL_FABRIC_LABELS = {
  'lf':'Light Filtering','rd':'Room Darkening','sheer':'Sheer','dn':'Day & Night'
};

// ── Day & Night valid fabric combinations (Norman Portrait catalog, p.11) ──
// Top ("day") shade + Bottom ("night") shade. Exclusions from D&N: Woven Breeze,
// Ashton, Flame-Resistant (LF & RD), FR Essentials. Top & bottom same cell size.
// Solus is bottom-shade only. LF+RD (incl. Designer) only in 3⁄4″S or 1¼″S single cell.
const CELL_DN_COMBOS = [
  {code:'DN-SL', top:'Sheer',            bottom:'Light Filtering'},
  {code:'DN-SR', top:'Sheer',            bottom:'Room Darkening'},
  {code:'DN-SS', top:'Sheer',            bottom:'Solus'},
  {code:'DN-WL', top:'Woven Windsong',   bottom:'Light Filtering'},
  {code:'DN-WR', top:'Woven Windsong',   bottom:'Room Darkening'},
  {code:'DN-WS', top:'Woven Windsong',   bottom:'Solus'},
  {code:'DN-LL', top:'Light Filtering',  bottom:'Light Filtering'},
  {code:'DN-LR', top:'Light Filtering',  bottom:'Room Darkening'}
];
// Combos that require a 3⁄4″ Single or 1¼″ Single cell (LF + Room Darkening pairings)
const CELL_DN_RD_LIMITED = { 'DN-LR': true };

const CELL_SIZE_LABELS = {
  '38s':'3⁄8″ Single','916s':'9⁄16″ Single','12d':'1⁄2″ Double',
  '34s':'3⁄4″ Single','34d':'3⁄4″ Double','114s':'1 1⁄4″ Single'
};

const SYSTEM_LIMITS_CELL = {
  'Cordless':  { maxW:108, maxH:120, note:'Cordless max 108″W × 120″H — child & pet safe' },
  'Cord Loop': { maxW:120, maxH:144, note:'Cord Loop max 120″W × 144″H · 80 sq ft area limit' },
  'Motorized': { maxW:120, maxH:144, note:'Motorized max 120″W × 144″H — app, remote & voice control' }
};

// ── Color hex map (shared subset) ─────────────────────────────
const COLOR_HEX = {
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
  'Brilliant White RD':'#F5F5F5','Cotton Cloud RD':'#E8EAE8','Gardenia RD':'#EDE8E0','White Cream RD':'#F5F0E0',
  'Daisy RD':'#F5F0D0','Soft Stone RD':'#D8C8A8','Wheat RD':'#D8BE80','Seal Gray RD':'#909698',
  'Silver Satin RD':'#C0C2C0','French Silver RD':'#B4B6B8','Classic Silver RD':'#B0B2B0','Power Gray RD':'#848688',
  'Iron Mountain RD':'#686A6C','Orion Gray RD':'#606264','Natural Tan RD':'#C0A070','Pale Oak RD':'#CCB080',
  'Whipped Mocha RD':'#A07040','Rue Bourbon RD':'#682810','Dew RD':'#D5E0D4','Space Gray RD':'#626A70',
  'Silver Dusk RD':'#A0A8B0','New Camel RD':'#C09858','Florida Keys RD':'#328898','Bella Blue RD':'#5078B0',
  'Autumn Gold RD':'#C07828','Cabin RD':'#724828','Provence Cream RD':'#E2D0A0','Reflections RD':'#C0A068',
  'River Rock RD':'#927060','Coffee Beans RD':'#382010','Pashmina RD':'#B89888','Morning Mist RD':'#C0C0B8',
  'Annapolis Gray RD':'#908070','Black Olive RD':'#20261C','Ocean Air RD':'#84B8C8'
};

function colorDot(name) {
  var hex = COLOR_HEX[name]; if (!hex) return '';
  return '<span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:' + hex
    + ';border:1px solid rgba(0,0,0,0.15);margin-right:5px;vertical-align:middle;flex-shrink:0"></span>';
}

// ── State ─────────────────────────────────────────────────────
var CELL = {
  mount:    null,
  lift:     'bu',
  opSys:    'Cordless',
  fabric:   'lf',
  sizeCode: '34s',
  color:    '',
  colorCode:'',
  dnCombo:  '',      // Day & Night combination code (e.g. 'DN-SR'); '' when not D&N
  dnTop:    '',      // Day & Night day layer (top): Sheer / Woven Windsong / Light Filtering
  dnBottom: '',      // Day & Night night layer (bottom): Light Filtering / Room Darkening / Solus
  dnTopColor:'',     dnTopColorCode:'',     // chosen day-layer color
  dnBottomColor:'',  dnBottomColorCode:'',  // chosen night-layer color
  qty:      1,
  delivery: 'ship'
};

function cellPickDel(v, el) {
  CELL.delivery = v;
  document.querySelectorAll('.delivery-opt-card[id^="cell-del"]').forEach(function(c){ c.classList.remove('sel'); });
  el.classList.add('sel');
}

var cellMotorOn = false;
var cellMotorCost = 482;

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

function adjCellQty(delta) {
  CELL.qty = Math.min(20, Math.max(1, CELL.qty + delta));
  document.getElementById('cell-qty-display').textContent = CELL.qty;
  document.getElementById('qr-cell-qty').textContent = CELL.qty + (CELL.qty === 1 ? ' shade' : ' shades');
  cellCalcPrice();
}

// ── Table lookup ──────────────────────────────────────────────
function cellTableLookup(w, h) {
  var tbl, name;
  var sc = CELL.sizeCode;
  if      (sc === '12d')  { tbl = CELL_1_2D;  name = '1⁄2″ Double'; }
  else if (sc === '34d')  { tbl = CELL_3_4D;  name = '3⁄4″ Double'; }
  else if (sc === '114s') { tbl = CELL_3_4D;  name = '1 1⁄4″ Single'; }
  else if (sc === '916s') { tbl = CELL_9_16S; name = '9⁄16″ Single'; }
  else if (sc === '38s')  { tbl = CELL_3_8S;  name = '3⁄8″ Single'; }
  else                    { tbl = CELL_3_8S;  name = '3⁄4″ Single'; }

  var wi = -1, hi = -1;
  for (var i = 0; i < CELL_W.length; i++) { if (CELL_W[i] >= w) { wi = i; break; } }
  for (var j = 0; j < CELL_H.length; j++) { if (CELL_H[j] >= h) { hi = j; break; } }
  if (wi < 0 || hi < 0) return {name:name, price:null, pricedAt:null};
  return {name:name, price:tbl[hi][wi], pricedAt:CELL_W[wi] + '″W × ' + CELL_H[hi] + '″H'};
}

// ── Day & Night combination picker ────────────────────────────
// (TDBU and Day & Night are now mutually-exclusive options in the same Lift
//  group, so no cross-step conflict can occur — no conflict check needed.)
function cellFabricLabel() {
  if (CELL.fabric === 'dn') {
    var l = cellDNComboLabel();
    return 'Day & Night' + (l ? ' — ' + l : '');
  }
  return CELL_FABRIC_LABELS[CELL.fabric] || CELL.fabric;
}
function cellDNComboLabel() {
  var c = CELL.dnCombo;
  for (var i = 0; i < CELL_DN_COMBOS.length; i++) {
    if (CELL_DN_COMBOS[i].code === c) {
      return CELL_DN_COMBOS[i].top + ' (day) + ' + CELL_DN_COMBOS[i].bottom + ' (night)';
    }
  }
  return '';
}
function cellDNComboObj() {
  for (var i = 0; i < CELL_DN_COMBOS.length; i++) {
    if (CELL_DN_COMBOS[i].code === CELL.dnCombo) return CELL_DN_COMBOS[i];
  }
  return null;
}
// Per-shade fabric surcharge: +20% for Sheer / Room Darkening (blackout) / Solus.
function cellDNFabAdd(fabName, base) {
  return (fabName === 'Sheer' || fabName === 'Room Darkening' || fabName === 'Solus')
    ? Math.round(base * 0.20) : 0;
}
// Per-UNIT price (before qty/motor/discount/freight), plus breakdown lines.
// Day & Night = two shades in one headrail: each shade = table price (+20% if that
// shade's fabric is Sheer/Room Darkening/Solus), summed, then the D&N surcharge.
function cellPerShadePrice(tableBase) {
  var lines = [], perShade;
  if (CELL.fabric === 'dn') {
    var combo   = cellDNComboObj();
    var topName = combo ? combo.top    : 'Sheer';
    var botName = combo ? combo.bottom : 'Room Darkening';
    var topShade = tableBase + cellDNFabAdd(topName, tableBase);
    var botShade = tableBase + cellDNFabAdd(botName, tableBase);
    perShade = topShade + botShade;
    lines.push('Day &amp; Night — two shades, priced together:');
    lines.push('&nbsp;&nbsp;Day / top (' + topName + '): $' + topShade.toLocaleString());
    lines.push('&nbsp;&nbsp;Night / bottom (' + botName + '): $' + botShade.toLocaleString());
  } else {
    perShade = tableBase;
    var fabAdd = (CELL.fabric === 'rd' || CELL.fabric === 'sheer') ? Math.round(tableBase * 0.20) : 0;
    if (fabAdd > 0) { perShade += fabAdd; lines.push((CELL_FABRIC_LABELS[CELL.fabric] || '') + ' fabric (+20%): +$' + fabAdd); }
  }
  // Operating-system surcharge (Cord Loop +$73, once per unit)
  if (CELL.opSys === 'Cord Loop') { perShade += 73; lines.push('Cord Loop system: +$73'); }
  // Configuration surcharge (TDBU or Day & Night +$89, once per unit)
  if (CELL.lift === 'tdbu' || CELL.lift === 'dn') {
    perShade += 89;
    lines.push((CELL.lift === 'tdbu' ? 'Top Down / Bottom Up' : 'Day &amp; Night') + ' surcharge: +$89');
  }
  return { price: perShade, lines: lines };
}
// ── Day & Night: pick a Day layer (top) then a Night layer (bottom) ──
// Only valid pairings are enabled (Norman Portrait catalog p.11 — see CELL_DN_COMBOS).
var CELL_DN_TOPS    = ['Sheer', 'Woven Windsong', 'Light Filtering'];
var CELL_DN_BOTTOMS = ['Light Filtering', 'Room Darkening', 'Solus'];
var CELL_DN_DESC = {
  'Sheer':           'See-through weave · soft daytime view',
  'Woven Windsong':  'Textured woven look · filtered light',
  'Light Filtering': 'Diffused glow · daytime privacy',
  'Room Darkening':  'Maximum privacy · blocks most light',
  'Solus':           'Solar screen · cuts glare & UV (night layer only)'
};
function _dnValidBottoms(top) {
  return CELL_DN_COMBOS.filter(function(c){ return c.top === top; }).map(function(c){ return c.bottom; });
}
function _dnComboCode(top, bottom) {
  for (var i = 0; i < CELL_DN_COMBOS.length; i++) {
    if (CELL_DN_COMBOS[i].top === top && CELL_DN_COMBOS[i].bottom === bottom) return CELL_DN_COMBOS[i].code;
  }
  return '';
}
function _dnCardHTML(name, group, selected, disabled) {
  var handler = group === 'top' ? 'selCellDNTop' : 'selCellDNBottom';
  var style = 'display:flex;flex-direction:column;align-items:flex-start;text-align:left;gap:2px;min-width:150px'
            + (disabled ? ';opacity:.3;pointer-events:none' : '');
  return '<button class="opt-btn' + (selected ? ' sel' : '') + '" style="' + style + '"'
    + ' onclick="' + handler + '(\'' + name + '\')">'
    + '<span style="font-weight:600">' + name + '</span>'
    + '<span style="font-size:10px;opacity:.7;font-weight:400">' + (CELL_DN_DESC[name] || '') + '</span>'
    + '</button>';
}
// Treatment → color collection key (Woven Windsong & Solus have no online palette).
function _dnCollKey(treatment) {
  return { 'Sheer':'sheer', 'Light Filtering':'lf', 'Room Darkening':'rd' }[treatment] || null;
}
function _dnColorGridHTML(layer, treatment) {
  var key = _dnCollKey(treatment);
  if (!key) return '<div class="step-note" style="margin-top:4px">' + treatment + ' color options are confirmed at your free in-home consultation.</div>';
  var colls   = CELL_COLLECTIONS[key] || [];
  var selName = layer === 'top' ? CELL.dnTopColor : CELL.dnBottomColor;
  var handler = layer === 'top' ? 'selCellDNTopColor' : 'selCellDNBottomColor';
  var html = '';
  colls.forEach(function(coll) {
    if (coll.name) html += '<div style="font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#888;margin:8px 0 4px">' + coll.name + '</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:4px">';
    coll.colors.forEach(function(color) {
      if (typeof color !== 'object') return;
      var isSel = selName === color.n;
      html += '<button class="opt-btn' + (isSel ? ' sel' : '') + '" style="font-size:11px;display:inline-flex;align-items:center;gap:0"'
        + ' onclick="' + handler + '(\'' + color.n.replace(/'/g, "\\'") + '\',\'' + (color.c || '') + '\')">'
        + colorDot(color.n) + color.n + (color.c ? ' <span style="font-size:9px;color:#aaa;margin-left:2px">' + color.c + '</span>' : '') + '</button>';
    });
    html += '</div>';
  });
  return html;
}
function _dnColorPanel(layer, treatment) {
  var lbl = layer === 'top' ? (treatment + ' color (day)') : (treatment + ' color (night)');
  return '<div style="margin:6px 0 2px;padding:10px 12px;background:#fafaf8;border:1px solid #e8e8e4;border-radius:8px">'
    + '<div style="font-size:11px;font-weight:600;color:#555;margin-bottom:2px">' + lbl + '</div>'
    + _dnColorGridHTML(layer, treatment) + '</div>';
}
function renderCellDNCombos() {
  var wrap = document.getElementById('grp-cell-dn');
  if (!wrap) return;
  var validBottoms = CELL.dnTop ? _dnValidBottoms(CELL.dnTop) : [];
  var topHTML = CELL_DN_TOPS.map(function(t){ return _dnCardHTML(t, 'top', CELL.dnTop === t, false); }).join('');
  var botHTML = CELL_DN_BOTTOMS.map(function(b){
    var ok = validBottoms.indexOf(b) >= 0;
    return _dnCardHTML(b, 'bottom', CELL.dnBottom === b, !CELL.dnTop || !ok);
  }).join('');
  var topColors = CELL.dnTop ? _dnColorPanel('top', CELL.dnTop) : '';
  var botColors = (CELL.dnTop && CELL.dnBottom) ? _dnColorPanel('bottom', CELL.dnBottom) : '';
  var summary = (CELL.dnTop && CELL.dnBottom && CELL.dnCombo)
    ? '<div class="step-note" style="margin-top:12px;color:var(--gold);font-weight:600">&#10003; ' + CELL.dnTop + (CELL.dnTopColor ? ' &mdash; ' + CELL.dnTopColor : '') + ' (day) over ' + CELL.dnBottom + (CELL.dnBottomColor ? ' &mdash; ' + CELL.dnBottomColor : '') + ' (night)</div>'
    : '<div class="step-note" style="margin-top:12px">Pick a day layer, then a night layer &mdash; then choose a color for each.</div>';
  wrap.innerHTML =
    '<div style="font-size:12px;font-weight:600;color:#555;margin-bottom:6px">Step 1 &middot; Day layer <span style="font-weight:400;color:#888">(top &mdash; filtered light &amp; view)</span></div>'
    + '<div class="opt-row" style="flex-wrap:wrap;margin-bottom:2px">' + topHTML + '</div>'
    + topColors
    + '<div style="font-size:12px;font-weight:600;color:#555;margin:14px 0 6px">Step 2 &middot; Night layer <span style="font-weight:400;color:#888">(bottom &mdash; privacy &amp; darkness)</span></div>'
    + '<div class="opt-row" style="flex-wrap:wrap">' + botHTML + '</div>'
    + botColors
    + summary;
}
function _dnSync() {
  CELL.dnCombo = (CELL.dnTop && CELL.dnBottom) ? _dnComboCode(CELL.dnTop, CELL.dnBottom) : '';
}
function selCellDNTop(top) {
  if (CELL.dnTop !== top) CELL.dnTopColor = '';   // new day treatment → reset its color
  CELL.dnTop = top;
  // if the previously-chosen night layer isn't valid with this day layer, clear it
  if (CELL.dnBottom && _dnValidBottoms(top).indexOf(CELL.dnBottom) < 0) { CELL.dnBottom = ''; CELL.dnBottomColor = ''; }
  _dnSync();
  renderCellDNCombos();
  renderCellColorGrid();   // refreshes the D&N label in the Color step
  cellCheckDNSize();
  cellCalcPrice();
}
function selCellDNBottom(bottom) {
  if (!CELL.dnTop || _dnValidBottoms(CELL.dnTop).indexOf(bottom) < 0) return; // only valid pairings
  if (CELL.dnBottom !== bottom) CELL.dnBottomColor = '';  // new night treatment → reset its color
  CELL.dnBottom = bottom;
  _dnSync();
  renderCellDNCombos();
  renderCellColorGrid();
  cellCheckDNSize();
  cellCalcPrice();
}
function selCellDNTopColor(name, code) {
  CELL.dnTopColor = name; CELL.dnTopColorCode = code;
  renderCellDNCombos(); renderCellColorGrid(); cellCalcPrice();
}
function selCellDNBottomColor(name, code) {
  CELL.dnBottomColor = name; CELL.dnBottomColorCode = code;
  renderCellDNCombos(); renderCellColorGrid(); cellCalcPrice();
}
// LF + Room Darkening combos are only offered in 3⁄4″S or 1¼″S single cell.
function cellCheckDNSize() {
  var warn = document.getElementById('cell-dn-warn');
  if (!warn) return;
  if (CELL_DN_RD_LIMITED[CELL.dnCombo] && CELL.sizeCode !== '34s' && CELL.sizeCode !== '114s') {
    warn.style.display = 'block';
    warn.textContent   = 'The Light Filtering + Room Darkening combination is only available in 3⁄4″ Single or 1¼″ Single cell size — please pick one of those cell sizes above.';
  } else {
    warn.style.display = 'none';
  }
}

// ── Cell size compatibility filter ────────────────────────────
function filterCellSizes() {
  var allowed = CELL_COMPAT[CELL.fabric] || [0,1,2,3,4,5];
  var sizeIdx = CELL_SZ_IDX[CELL.sizeCode] !== undefined ? CELL_SZ_IDX[CELL.sizeCode] : 3;
  // If current size is not allowed, pick first valid
  if (!allowed.includes(sizeIdx)) {
    for (var code in CELL_SZ_IDX) {
      if (allowed.includes(CELL_SZ_IDX[code])) { CELL.sizeCode = code; break; }
    }
  }
  // Update UI
  document.querySelectorAll('#grp-cell-size .opt-btn').forEach(function(card) {
    var code = card.dataset.size;
    var idx  = CELL_SZ_IDX[code];
    var ok   = idx !== undefined && allowed.includes(idx);
    card.style.opacity = ok ? '1' : '0.35';
    card.style.pointerEvents = ok ? 'auto' : 'none';
    card.classList.toggle('sel', code === CELL.sizeCode);
  });
  // Update size note
  var notes = {
    '38s':'3⁄8″S: Light Filtering and Sheer only. Room Darkening not available.',
    '916s':'9⁄16″S has a limited colour palette — 15 LF and 16 RD colors. Sheer not available.',
    '12d':'1⁄2″D: Light Filtering and Room Darkening. Sheer not available in double-cell.',
    '34d':'3⁄4″D: Light Filtering and Room Darkening. Sheer not available in double-cell.',
    '34s':'3⁄4″S: All fabric categories available.',
    '114s':'1 1⁄4″S: All fabric categories available.'
  };
  var noteEl = document.getElementById('cell-size-note');
  if (noteEl) { noteEl.textContent = notes[CELL.sizeCode] || ''; noteEl.style.display = notes[CELL.sizeCode] ? 'block' : 'none'; }
  document.getElementById('s5val').textContent = CELL_SIZE_LABELS[CELL.sizeCode] || CELL.sizeCode;
  document.getElementById('qr-cell-size').textContent = CELL_SIZE_LABELS[CELL.sizeCode] || CELL.sizeCode;
}

// ── Render color grid ─────────────────────────────────────────
function renderCellColorGrid() {
  var gridEl  = document.getElementById('cell-color-grid');
  if (!gridEl) return;
  // Day & Night: two fabrics — layers + their colors are chosen in the Fabric step above.
  if (CELL.fabric === 'dn') {
    var day   = CELL.dnTop ? (CELL.dnTop + (CELL.dnTopColor ? ' — ' + CELL.dnTopColor : '')) : '—';
    var night = CELL.dnBottom ? (CELL.dnBottom + (CELL.dnBottomColor ? ' — ' + CELL.dnBottomColor : '')) : '—';
    // Any layer that has a palette but no color chosen yet → nudge; else consultation note for Windsong/Solus.
    var needColor = (_dnCollKey(CELL.dnTop) && !CELL.dnTopColor) || (CELL.dnBottom && _dnCollKey(CELL.dnBottom) && !CELL.dnBottomColor);
    var note = needColor
      ? 'Choose a color for each layer in the Fabric &amp; combination step above.'
      : 'Woven Windsong / Solus colors are finalized at your free in-home consultation.';
    gridEl.innerHTML = '<div class="step-note"><strong>Day &amp; Night</strong><br>Day layer: ' + day
      + '<br>Night layer: ' + night + '<br><span style="color:#888">' + note + '</span></div>';
    CELL.color     = day + ' / ' + night;
    CELL.colorCode = CELL.dnCombo || '';
    document.getElementById('s6val').textContent = (CELL.dnTop && CELL.dnBottom) ? (CELL.dnTop + ' + ' + CELL.dnBottom) : 'Day & Night';
    document.getElementById('qr-cell-color').textContent = CELL.color;
    markDone('step6');
    return;
  }
  var colls = CELL_COLLECTIONS[CELL.fabric] || [];
  if (!colls.length || (colls.length === 1 && !colls[0].colors.length)) {
    gridEl.innerHTML = '<div class="step-note">Colors confirmed at consultation.</div>';
    return;
  }
  var html = '';
  colls.forEach(function(coll) {
    if (coll.name) {
      html += '<div style="font-size:10px;font-weight:600;letter-spacing:1px;text-transform:uppercase;color:#888;margin:10px 0 5px">' + coll.name + '</div>';
    }
    html += '<div style="display:flex;flex-wrap:wrap;gap:5px;margin-bottom:4px">';
    coll.colors.forEach(function(color) {
      if (typeof color !== 'object') return;
      // Filter 9/16"S limited palette
      if (CELL.sizeCode === '916s') {
        if (CELL.fabric === 'lf' && color.c && !CELL_916S_LF.has(color.c)) return;
        if (CELL.fabric === 'rd' && color.c && !CELL_916S_RD.has(color.c)) return;
      }
      var dot   = colorDot(color.n);
      var code  = color.c ? ' <span style="font-size:9px;color:#aaa;margin-left:2px">' + color.c + '</span>' : '';
      var isSel = CELL.color === color.n;
      html += '<button class="opt-btn' + (isSel ? ' sel' : '') + '" style="font-size:11px;display:inline-flex;align-items:center;gap:0"'
            + ' onclick="selCellColor(\'' + color.n.replace(/'/g,"\\'") + '\',\'' + (color.c||'') + '\')">'
            + dot + color.n + code + '</button>';
    });
    html += '</div>';
  });
  gridEl.innerHTML = html;
}

function selCellColor(name, code) {
  CELL.color = name; CELL.colorCode = code;
  document.querySelectorAll('#cell-color-grid .opt-btn').forEach(function(b){
    b.classList.toggle('sel', b.textContent.indexOf(name) >= 0 && b.textContent.indexOf(name) < 40);
  });
  document.getElementById('s6val').textContent = name;
  document.getElementById('qr-cell-color').textContent = name + (code ? ' (' + code + ')' : '');
  markDone('step6');
  cellCalcPrice();
}

// ── Live price calculation ────────────────────────────────────
function cellCalcPrice() {
  var w   = parseFloat(document.getElementById('cell-width').value)  || 0;
  var h   = parseFloat(document.getElementById('cell-height').value) || 0;
  var pb  = document.getElementById('cell-price-box');
  var pn  = document.getElementById('cell-price-note');
  pb.style.display = 'none';
  pn.style.display = 'none';

  // Update summary
  document.getElementById('cell-selection-summary').style.display = 'block';
  document.getElementById('qr-cell-dims').textContent = (w && h) ? w + '″ W × ' + h + '″ H' : '—';
  document.getElementById('qp-cell-pending').style.display = (w && h) ? 'none' : 'block';

  if (!w || !h) return;

  // System limits
  var lim  = SYSTEM_LIMITS_CELL[CELL.opSys] || SYSTEM_LIMITS_CELL['Cordless'];
  var sqft = (w / 12) * (h / 12);
  var tdbuOver = CELL.lift === 'tdbu' && sqft > 60;
  // Cordless in the smallest cells (3⁄8″S, 9⁄16″S) is capped at 96″W, not 108″ (Norman Portrait).
  var maxW = lim.maxW;
  if (CELL.opSys === 'Cordless' && (CELL.sizeCode === '38s' || CELL.sizeCode === '916s')) maxW = Math.min(maxW, 96);

  if (w > maxW || h > lim.maxH || tdbuOver) {
    pn.style.display = 'block';
    pn.textContent = tdbuOver
      ? '⚠ TDBU max area is 60 sqft — current: ' + sqft.toFixed(1) + ' sqft. Reduce dimensions.'
      : '⚠ Size exceeds ' + CELL.opSys + ' limit (' + maxW + '″W × ' + lim.maxH + '″H'
        + (maxW < lim.maxW ? ' for this cell size' : '') + ').';
    return;
  }

  var res = cellTableLookup(w, h);
  if (!res.price) {
    pn.style.display = 'block';
    pn.textContent   = 'Size exceeds Norman Portrait pricing table — call us: (609) 742-1720.';
    return;
  }

  var tableBase = res.price;

  // Per-unit price (handles Day & Night = two shades, fabric/op/config surcharges — details hidden)
  var ps       = cellPerShadePrice(tableBase);
  var perShade = ps.price;
  var motorTotal = cellMotorOn ? cellMotorCost * CELL.qty : 0;

  // Apply 35% Norman discount to product cost (not to freight)
  var productSub  = perShade * CELL.qty + motorTotal;
  var discountAmt = Math.round(productSub * 0.35);
  var yourPrice   = productSub - discountAmt;
  var freight    = w >= 90 ? (80 + Math.max(0, CELL.qty - 1) * 50) : (25 + Math.max(0, CELL.qty - 1) * 11);
  var grandTotal = yourPrice + freight;

  // ── Customer-facing breakdown: only add-on surcharges, then retail → discount → price ──
  // (base table price, +20% fabric, cord-loop, D&N two-shade math are intentionally hidden)
  var lines = [];
  if (CELL.lift === 'tdbu')    lines.push('Top Down / Bottom Up: +$89');
  else if (CELL.lift === 'dn') lines.push('Day &amp; Night: +$89');
  if (motorTotal) lines.push('Motorization ($' + cellMotorCost + ' × ' + CELL.qty + '): +$' + motorTotal.toLocaleString());
  if (lines.length) lines.push('<hr style="border:none;border-top:1px solid rgba(255,255,255,.15);margin:7px 0">');
  lines.push('Retail: $' + productSub.toLocaleString());
  lines.push('<span style="color:var(--gold)">35% Norman discount: −$' + discountAmt.toLocaleString() + '</span>');
  lines.push('<span style="color:var(--gold);font-weight:600">Your price: $' + yourPrice.toLocaleString() + '</span>');
  lines.push('Freight (not discounted): +$' + freight.toLocaleString());

  // Update panel
  document.getElementById('cell-price-per').textContent   = '$' + Math.round(yourPrice / CELL.qty).toLocaleString() + '/shade';
  document.getElementById('cell-price-total').textContent = '$' + grandTotal.toLocaleString();
  document.getElementById('cell-price-breakdown').innerHTML = lines.join('<br>');
  document.getElementById('cell-size-info').textContent    = res.name + ' · ' + res.pricedAt + ' · ' + sqft.toFixed(1) + ' sqft';
  document.getElementById('cell-size-info').style.display  = 'block';
  pb.style.display = 'block';
  document.getElementById('qp-cell-pending').style.display = 'none';
  document.getElementById('cell-cart-wrap').style.display  = 'block';
}

// ── Add to cart ───────────────────────────────────────────────
function cellAddToCart() {
  var w = parseFloat(document.getElementById('cell-width').value)  || 0;
  var h = parseFloat(document.getElementById('cell-height').value) || 0;
  if (!w || !h) { alert('Please enter your window dimensions first.'); return; }
  if (!CELL.mount) { alert('Please select a mount type first.'); return; }

  var res = cellTableLookup(w, h);
  if (!res.price) { alert('Size is out of the pricing table range. Please call us: (609) 742-1720.'); return; }

  var perShade    = cellPerShadePrice(res.price).price;
  var motorTotal  = cellMotorOn ? cellMotorCost * CELL.qty : 0;
  var productSub  = perShade * CELL.qty + motorTotal;
  var yourPrice   = productSub - Math.round(productSub * 0.35);
  var freight     = w >= 90 ? (80 + Math.max(0, CELL.qty - 1) * 50) : (25 + Math.max(0, CELL.qty - 1) * 11);

  var liftLabel = CELL.lift === 'bu' ? 'Bottom Up' : CELL.lift === 'tdbu' ? 'Top Down / Bottom Up' : 'Day & Night';
  var lines = [
    {label:'Product',       value:'Norman Portrait™ Cellular'},
    {label:'Mount',         value: CELL.mount || '—'},
    {label:'Width',         value: w + '″'},
    {label:'Height',        value: h + '″'},
    {label:'Lift direction',value: liftLabel},
    {label:'Operation',     value: CELL.opSys + (cellMotorOn ? ' (motorized)' : '')},
    {label:'Fabric',        value: cellFabricLabel()},
    {label:'Cell size',     value: CELL_SIZE_LABELS[CELL.sizeCode] || CELL.sizeCode},
    {label:'Color',         value: CELL.color + (CELL.colorCode ? ' (' + CELL.colorCode + ')' : '') || '—'},
    {label:'Quantity',      value: String(CELL.qty)}
  ];
  var specs = lines.map(function(l){ return l.label + ': ' + l.value; }).join(' | ');
  pbAddToCart({product:'Norman Portrait™ Cellular', lines:lines, specs:specs, price:yourPrice + freight, qty:CELL.qty});
  if (typeof pbOpenCart === 'function') pbOpenCart();
}

// ── Quote form submit ─────────────────────────────────────────
async function submitCellQuote(btn) {
  var name  = document.getElementById('cf-name').value.trim();
  var phone = document.getElementById('cf-phone').value.trim();
  if (!name || !phone) {
    var errEl = document.getElementById('cf-contact-err');
    if (errEl) { errEl.textContent = 'Please enter your name and phone number.'; errEl.style.display = 'block'; }
    else { alert('Please enter your name and phone number.'); }
    return;
  }
  var w     = document.getElementById('cell-width').value  || '?';
  var h     = document.getElementById('cell-height').value || '?';
  var email = document.getElementById('cf-email').value;
  var notes = document.getElementById('cf-notes').value;
  var price = document.getElementById('cell-price-total').textContent;
  var liftLabel = CELL.lift === 'bu' ? 'Bottom Up' : CELL.lift === 'tdbu' ? 'Top Down / Bottom Up' : 'Day & Night';

  var body = 'NORMAN PORTRAIT™ CELLULAR ORDER\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + (email || 'not provided') + '\n\n'
    + 'SPECS\n'
    + 'Width: ' + w + '"  Height: ' + h + '"\n'
    + 'Mount: ' + (CELL.mount || '—') + '\n'
    + 'Lift direction: ' + liftLabel + '\n'
    + 'Operation: ' + CELL.opSys + (cellMotorOn ? ' (motorized)' : '') + '\n'
    + 'Fabric: ' + cellFabricLabel() + '\n'
    + 'Cell size: ' + (CELL_SIZE_LABELS[CELL.sizeCode] || CELL.sizeCode) + '\n'
    + 'Color: ' + (CELL.color || '—') + (CELL.colorCode ? ' (' + CELL.colorCode + ')' : '') + '\n'
    + 'Quantity: ' + CELL.qty + '\n'
    + 'Estimated total: ' + price + '\n\n'
    + 'Delivery: ' + ('Ship to customer (UPS/FedEx)') + '\n\n'
    + 'Notes: ' + (notes || 'none');

  if (typeof _apiSubmit === 'function') {
    await _apiSubmit(name, email, phone, 'Norman Portrait™ Cellular', body, 'cell-success', null, btn);
  } else {
    document.getElementById('cell-success').style.display = 'block';
    if (btn) { btn.disabled = true; btn.textContent = 'Submitted ✓'; }
  }
}

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('step1').classList.add('active');
  document.getElementById('qr-cell-qty').textContent    = '1 shade';
  document.getElementById('qr-cell-lift').textContent   = 'Bottom Up';
  document.getElementById('qr-cell-opsys').textContent  = 'Cordless';
  document.getElementById('qr-cell-fabric').textContent = 'Light Filtering';
  document.getElementById('qr-cell-size').textContent   = '3⁄4″ Single';
  document.getElementById('s3val').textContent = 'Cordless';
  document.getElementById('s5val').textContent = '3⁄4″ Single';
  filterCellSizes();
  renderCellColorGrid();
});
