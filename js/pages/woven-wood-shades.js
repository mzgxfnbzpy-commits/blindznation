renderNav('Woven Wood Shades');
renderFooter(false);

// ─── FABRIC DATA ──────────────────────────────────────────────
const FABRICS = [
  {code:'PR-017',name:'Alston Ash',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#9E9085'},
  {code:'PR-015',name:'Alston Peppered White',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#E8E0D4'},
  {code:'PR-016',name:'Alston Russet',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#8B5E3C'},
  {code:'PR-031',name:'Easton Charcoal',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#5A5750'},
  {code:'PR-032',name:'Easton Iron',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#3A3835'},
  {code:'PR-030',name:'Easton Smoke',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#7A7870'},
  {code:'PR-025',name:'Hampton Graphite',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#6A6860'},
  {code:'PR-024',name:'Hampton Pebble',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#B0A898'},
  {code:'PR-023',name:'Hampton Snowfall',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#EEE8E0'},
  {code:'PR-022',name:'Isla Rockside',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#2E2B28'},
  {code:'PR-026',name:'Isla Seashell',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#F0EAE0'},
  {code:'PR-021',name:'Marco Contrast',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#1E1C1A'},
  {code:'PR-018',name:'Mason Grove',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#7A5840'},
  {code:'PR-019',name:'Mason Lumber',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#9E8870'},
  {code:'PR-020',name:'Mason Shade',pg:'A',mat:'100% Paper',maxW:90,maxH:108,color:'#8A8278'},
  {code:'PR-027',name:'Clifton Silver',pg:'B',mat:'100% Paper',maxW:90,maxH:108,color:'#B0B0B0'},
  {code:'PR-013',name:'Iris Cream',pg:'B',mat:'100% Flax',maxW:72,maxH:108,color:'#E8D8BC'},
  {code:'PR-131',name:'Iris Fossil',pg:'B',mat:'100% Flax',maxW:72,maxH:108,color:'#A89888'},
  {code:'PR-014',name:'Iris Khaki',pg:'B',mat:'100% Flax',maxW:72,maxH:108,color:'#C0A878'},
  {code:'PR-093',name:'Keys Almond',pg:'B',mat:'100% Paper',maxW:90,maxH:108,color:'#D8C8A8'},
  {code:'PR-094',name:'Keys Harbor Gray',pg:'B',mat:'100% Paper',maxW:90,maxH:108,color:'#9898A0'},
  {code:'PR-095',name:'Keys Hazelnut',pg:'B',mat:'100% Paper',maxW:90,maxH:108,color:'#B89070'},
  {code:'PR-034',name:'Seville Earth',pg:'B',mat:'100% Paper',maxW:90,maxH:108,color:'#988070'},
  {code:'PR-033',name:'Seville Wisp',pg:'B',mat:'100% Paper',maxW:90,maxH:108,color:'#E0D8CC'},
  {code:'PR-291',name:'Cyprus Crystal',pg:'C',mat:'100% Paper',maxW:90,maxH:96,color:'#F0ECEC'},
  {code:'PR-292',name:'Cyprus Morning Mist',pg:'C',mat:'100% Paper',maxW:90,maxH:96,color:'#D8CEC8'},
  {code:'PR-029',name:'Cyprus Thunder',pg:'C',mat:'100% Paper',maxW:90,maxH:96,color:'#686060'},
  {code:'PR-028',name:'Lace Snow',pg:'C',mat:'100% Paper',maxW:90,maxH:108,color:'#F4F0E8'},
  {code:'PR-089',name:'Layla Natural White',pg:'C',mat:'100% Paper',maxW:90,maxH:108,color:'#EDE8E0'},
  {code:'PR-090',name:'Layla Truffle',pg:'C',mat:'100% Paper',maxW:90,maxH:108,color:'#78685C'},
  {code:'PR-881',name:'Wyatt Almond',pg:'C',mat:'100% Paper',maxW:90,maxH:96,color:'#D8CCBC'},
  {code:'PR-883',name:'Wyatt Antique White',pg:'C',mat:'100% Paper',maxW:90,maxH:96,color:'#EEE8DC'},
  {code:'PR-088',name:'Wyatt Marble',pg:'C',mat:'100% Paper',maxW:90,maxH:96,color:'#C8C0B8'},
  {code:'PR-882',name:'Wyatt Slate',pg:'C',mat:'100% Paper',maxW:90,maxH:96,color:'#888888'},
  {code:'PR-Z4C',name:'Ashton Camel',pg:'D',mat:'100% Paper',maxW:114,maxH:108,color:'#C89860'},
  {code:'PR-Z4A',name:'Ashton Dove',pg:'D',mat:'100% Paper',maxW:114,maxH:108,color:'#C0B8B0'},
  {code:'PR-Z3A',name:'Brenna Cloud',pg:'D',mat:'100% Paper',maxW:114,maxH:108,color:'#E8E4E0'},
  {code:'PR-Z3B',name:'Brenna Mirage',pg:'D',mat:'100% Paper',maxW:114,maxH:108,color:'#A8A8A8'},
  {code:'PR-Y3C',name:'Mallory Fog',pg:'D',mat:'50% Flax, 50% Paper',maxW:114,maxH:108,color:'#BCBCBC'},
  {code:'PR-Y3A',name:'Mallory Frost',pg:'D',mat:'50% Flax, 50% Paper',maxW:114,maxH:108,color:'#E8E8EC'},
  {code:'PR-Z1D',name:'Torrey Twine',pg:'D',mat:'70% Paper, 30% Hemp',maxW:114,maxH:108,color:'#C0A878'},
  {code:'PR-M8A',name:'Rhea Champagne',pg:'E',mat:'100% Hemp',maxW:90,maxH:108,color:'#D8C898',noSquareCassette:true},
  {code:'PR-M8C',name:'Rhea Moonlight',pg:'E',mat:'100% Hemp',maxW:90,maxH:108,color:'#C8C8C0',noSquareCassette:true},
  {code:'PR-M8E',name:'Rhea Sapphire',pg:'E',mat:'100% Hemp',maxW:90,maxH:108,color:'#282830',noSquareCassette:true},
  {code:'PR-Z5F',name:'Sophie Birch',pg:'E',mat:'80% Flax, 20% Poly/Cotton',maxW:114,maxH:108,color:'#F0EAE2'},
  {code:'PR-Z5J',name:'Sophie Limestone',pg:'E',mat:'80% Flax, 20% Poly/Cotton',maxW:114,maxH:108,color:'#C8C0B0'},
  {code:'PR-Z5K',name:'Sophie Linen',pg:'E',mat:'80% Flax, 20% Poly/Cotton',maxW:114,maxH:108,color:'#D8C8A8'},
  {code:'PR-Z5B',name:'Sophie Papyrus',pg:'E',mat:'80% Flax, 20% Poly/Cotton',maxW:114,maxH:108,color:'#E8E0D0'},
  {code:'PR-Z5A',name:'Sophie Pearl',pg:'E',mat:'80% Flax, 20% Poly/Cotton',maxW:114,maxH:108,color:'#F4F0EC'},
  {code:'PR-Z5E',name:'Sophie Sand',pg:'E',mat:'80% Flax, 20% Poly/Cotton',maxW:114,maxH:108,color:'#D0C0A0'},
  {code:'PR-Z5G',name:'Sophie Sea Breeze',pg:'E',mat:'80% Flax, 20% Poly/Cotton',maxW:114,maxH:108,color:'#E8F0F0'},
  {code:'PR-Z5M',name:'Sophie Skyline',pg:'E',mat:'80% Flax, 20% Poly/Cotton',maxW:114,maxH:108,color:'#9098A0'},
  {code:'PR-Z5H',name:'Sophie Twig',pg:'E',mat:'80% Flax, 20% Poly/Cotton',maxW:114,maxH:108,color:'#8A7060'},
];

// ─── PRICE MATRICES ──────────────────────────────────────────
// Rows = heights (24,30,36,42,48,54,60,66,72,78,84,96,108)
// Cols = widths  (24,30,36,42,48,54,60,66,72,78,84,90)
const WIDTHS_AB = [24,30,36,42,48,54,60,66,72,78,84,90];
const HEIGHTS_AB = [24,30,36,42,48,54,60,66,72,78,84,96,108];
const PRICES_A = [
  [163,204,245,285,326,367,408,448,489,530,571,611],
  [196,245,293,342,391,440,489,538,587,636,685,734],
  [228,285,342,399,456,514,571,628,685,742,799,856],
  [261,326,391,456,522,587,652,717,783,848,913,978],
  [293,367,440,514,587,660,734,807,880,954,1027,1100],
  [326,408,489,571,652,734,815,897,978,1060,1141,1223],
  [359,448,538,628,717,807,897,986,1076,1166,1255,1345],
  [391,489,587,685,783,880,978,1076,1174,1272,1369,1467],
  [424,530,636,742,848,954,1060,1166,1272,1378,1484,1590],
  [456,571,685,799,913,1027,1141,1255,1369,1484,1598,1712],
  [494,617,740,863,986,1109,1233,1356,1479,1602,1725,1848],
  [564,705,845,986,1127,1267,1409,1550,1691,1831,1972,2113],
  [635,793,951,1109,1267,1426,1586,1744,1902,2060,2219,2377]
];
const PRICES_B = [
  [174,217,261,304,348,391,435,478,522,565,608,652],
  [209,261,313,365,417,469,522,574,626,678,730,782],
  [243,304,365,426,487,548,608,669,730,791,852,913],
  [278,348,417,487,556,626,695,765,835,904,974,1043],
  [313,391,469,548,626,704,782,861,939,1017,1095,1174],
  [348,435,522,608,695,782,869,956,1043,1130,1217,1304],
  [382,478,574,669,765,861,956,1052,1147,1243,1339,1434],
  [417,522,626,730,835,939,1043,1147,1252,1356,1460,1565],
  [452,565,678,791,904,1017,1130,1243,1356,1469,1582,1695],
  [487,608,730,852,974,1095,1217,1339,1460,1582,1704,1825],
  [526,658,788,920,1051,1183,1314,1446,1577,1709,1839,1972],
  [601,752,901,1052,1201,1352,1502,1653,1802,1953,2102,2253],
  [676,845,1014,1183,1351,1521,1689,1859,2027,2197,2365,2535]
];
// Cyprus/Wyatt max H=96 so 108 row not used for those fabrics
const PRICES_C = [
  [194,242,290,339,387,435,484,532,581,629,677,726],
  [232,290,348,406,464,523,581,639,697,755,813,871],
  [271,339,406,474,542,610,677,745,813,881,948,1016],
  [310,387,464,542,619,697,774,852,929,1006,1084,1161],
  [348,435,523,610,697,784,871,958,1045,1132,1219,1306],
  [387,484,581,677,774,871,968,1064,1161,1258,1355,1451],
  [426,532,639,745,852,958,1064,1171,1277,1384,1490,1597],
  [464,581,697,813,929,1045,1161,1277,1393,1510,1626,1742],
  [503,629,755,881,1006,1132,1258,1384,1510,1635,1761,1887],
  [542,677,813,948,1084,1219,1355,1490,1626,1761,1897,2032],
  [586,732,878,1024,1170,1316,1463,1610,1756,1902,2048,2195],
  [669,837,1004,1171,1338,1505,1672,1840,2007,2174,2341,2508],
  [753,941,1129,1317,1505,1693,1880,2070,2258,2446,2634,2822]
];
const WIDTHS_DE = [24,30,36,42,48,54,60,66,72,78,84,96,108,114];
const HEIGHTS_DE = [24,30,36,42,48,54,60,66,72,78,84,96,108];
const PRICES_D = [
  [231,283,336,389,442,495,548,601,654,707,760,866,972,1025],
  [273,336,400,464,527,591,654,718,781,845,908,1036,1163,1226],
  [315,389,464,538,612,686,760,834,908,983,1057,1205,1353,1428],
  [358,442,527,612,697,781,866,951,1036,1120,1205,1375,1544,1629],
  [400,495,591,686,781,877,972,1067,1163,1258,1353,1544,1735,1830],
  [442,548,654,760,866,972,1078,1184,1290,1396,1502,1714,1925,2031],
  [485,601,718,834,951,1067,1184,1300,1417,1533,1650,1883,2116,2233],
  [527,654,781,908,1036,1163,1290,1417,1544,1671,1798,2053,2307,2434],
  [569,707,845,983,1120,1258,1396,1533,1671,1809,1947,2222,2497,2635],
  [612,760,908,1057,1205,1353,1502,1650,1798,1947,2095,2392,2688,2836],
  [654,813,972,1131,1290,1449,1608,1767,1925,2084,2243,2561,2879,3038],
  [739,919,1099,1279,1459,1639,1820,2000,2180,2360,2540,2900,3260,3440],
  [831,1039,1247,1455,1663,1871,2078,2286,2494,2702,2910,3325,3741,3949]
];
const PRICES_E = [
  [245,301,358,414,471,527,584,640,697,753,810,866,974,1028],
  [290,358,425,493,561,629,697,764,832,900,968,1036,1165,1230],
  [335,414,493,572,651,730,810,889,968,1047,1126,1205,1356,1431],
  [380,471,561,651,742,832,923,1013,1103,1194,1284,1374,1546,1632],
  [425,527,629,730,832,934,1036,1137,1239,1341,1442,1544,1737,1833],
  [471,584,697,810,923,1036,1148,1261,1374,1487,1600,1713,1928,2035],
  [516,640,764,889,1013,1137,1261,1386,1510,1634,1759,1883,2118,2236],
  [561,697,832,968,1103,1239,1374,1510,1646,1781,1917,2052,2309,2437],
  [606,753,900,1047,1194,1341,1487,1634,1781,1928,2075,2222,2500,2638],
  [651,810,968,1126,1284,1442,1600,1759,1917,2075,2233,2391,2690,2840],
  [697,866,1036,1205,1374,1544,1713,1883,2052,2222,2391,2561,2881,3041],
  [787,979,1171,1363,1555,1747,1939,2131,2324,2516,2708,2900,3262,3443],
  [885,1107,1328,1549,1771,1992,2213,2435,2656,2877,3099,3541,3984,4205]
];
// Back fabric pricing (rows=heights, cols=widths[24..114])
const BF_WIDTHS = [24,30,36,42,48,54,60,66,72,78,84,96,108,114];
const BF_HEIGHTS = [24,30,36,42,48,54,60,66,72,78,84,96];
const PRICES_BF = [
  [90,102,114,125,137,148,160,172,183,195,207,236,266,280],
  [100,114,128,141,155,169,183,197,211,225,239,273,308,325],
  [109,125,141,158,174,190,207,223,239,255,272,311,349,369],
  [118,137,155,174,193,211,230,249,267,286,304,348,391,413],
  [128,148,169,190,211,232,253,274,295,316,337,385,433,457],
  [137,160,183,207,230,253,276,300,323,346,370,422,475,501],
  [146,172,197,223,249,274,300,325,351,376,402,460,517,546],
  [155,183,211,239,267,295,323,351,379,407,435,497,559,590],
  [165,195,225,255,286,316,346,376,407,437,467,534,601,634],
  [174,207,239,272,304,337,370,402,435,467,500,571,643,678],
  [183,218,253,288,323,358,393,428,463,497,532,608,684,723],
  [202,242,281,321,360,400,439,479,518,558,598,683,768,811]
];
// Cassette surcharge by width (24..114" in 6" steps)
const CASS_WIDTHS = [24,30,36,42,48,54,60,66,72,78,84,96,108,114];
const CASS_PRICES = [117,146,176,205,234,263,293,322,351,380,410,468,527,556];
// Box Valance (same width cols as cassette + 116")
const BOX_WIDTHS = [24,30,36,42,48,54,60,66,72,78,84,96,108,114,116];
const BOX_PRICES = [137,172,206,240,275,309,343,378,412,446,481,550,618,653,664];

// ─── STATE ────────────────────────────────────────────────────
let state = {
  fabric: null,
  mount: null,
  width: null,
  height: null,
  control: null,
  isDouble: null,
  backFabric: null,
  topTreatment: null,
  cassetteColor: null,
  metalColor: null,
  rollDir: null,
  delivery: 'ship',
  qty: 1
};

// ─── NAV FUNCTIONS ────────────────────────────────────────────
function showChoice() {
  document.getElementById('choice-section').style.display = 'block';
  document.getElementById('roller-section').style.display = 'none';
  document.getElementById('roman-section').style.display = 'none';
  window.scrollTo({top: 0, behavior:'smooth'});
}
function showRoller() {
  document.getElementById('choice-section').style.display = 'none';
  document.getElementById('roller-section').style.display = 'block';
  document.getElementById('roman-section').style.display = 'none';
  buildFabricGrid('all');
  window.scrollTo({top: document.getElementById('roller-section').offsetTop - 80, behavior:'smooth'});
}
function showRoman() {
  document.getElementById('choice-section').style.display = 'none';
  document.getElementById('roller-section').style.display = 'none';
  document.getElementById('roman-section').style.display = 'block';
  window.scrollTo({top: document.getElementById('roman-section').offsetTop - 80, behavior:'smooth'});
}

// ─── STEP TOGGLE ─────────────────────────────────────────────
function toggleStep(id) {
  const body = document.getElementById(id + '-body');
  const chev = document.getElementById(id + '-chev');
  const isOpen = body.classList.contains('active');
  body.classList.toggle('active', !isOpen);
  if (chev) chev.classList.toggle('open', !isOpen);
}

// ─── FABRIC ──────────────────────────────────────────────────
function buildFabricGrid(filter) {
  const grid = document.getElementById('fabric-grid');
  const list = filter === 'all' ? FABRICS : FABRICS.filter(f => f.pg === filter);
  grid.innerHTML = list.map(f => `
    <div class="fabric-card ${state.fabric && state.fabric.code === f.code ? 'selected' : ''}"
         onclick="selectFabric('${f.code}')" data-pg="${f.pg}">
      <div class="fabric-swatch" style="background:${f.color}"></div>
      <div class="fabric-code">${f.code}</div>
      <div class="fabric-name">${f.name}</div>
      <div class="fabric-pg">Group ${f.pg}</div>
      <div class="fabric-mat">${f.mat}</div>
    </div>
  `).join('');
}
function filterFabrics(pg, btn) {
  document.querySelectorAll('.gf-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  buildFabricGrid(pg);
}
function selectFabric(code) {
  state.fabric = FABRICS.find(f => f.code === code);
  document.querySelectorAll('.fabric-card').forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.fabric-card').forEach(c => {
    if (c.querySelector('.fabric-code').textContent === code) c.classList.add('selected');
  });
  document.getElementById('s1-preview').textContent = state.fabric ? ' — ' + state.fabric.name : '';
  updatePrice();
  validateDims();
}

// ─── MOUNT ────────────────────────────────────────────────────
function selectMount(el) {
  document.querySelectorAll('#step2-body .opt-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.mount = el.dataset.val;
  document.getElementById('s2-preview').textContent = ' — ' + el.textContent.split('\n')[0].trim();
}

// ─── DIMENSIONS ──────────────────────────────────────────────
function dimChanged() {
  state.width = parseFloat(document.getElementById('inp-width').value) || null;
  state.height = parseFloat(document.getElementById('inp-height').value) || null;
  const wStr = state.width ? state.width + '"' : '';
  const hStr = state.height ? state.height + '"' : '';
  document.getElementById('s3-preview').textContent = (wStr && hStr) ? ' — ' + wStr + ' W x ' + hStr + ' H' : '';
  validateDims();
  updatePrice();
}
function validateDims() {
  let wErr = '', hErr = '';
  const w = state.width, h = state.height;
  const fab = state.fabric;
  const maxW = fab ? fab.maxW : 114;
  const maxH = fab ? fab.maxH : 108;
  const doubleMaxH = 96;

  if (w !== null) {
    if (w < 10 || w > maxW) wErr = `Width must be 10"–${maxW}" for this fabric.`;
  }
  if (h !== null) {
    const mH = state.isDouble === 'double' ? Math.min(maxH, doubleMaxH) : maxH;
    if (h < 12 || h > mH) hErr = `Height must be 12"–${mH}" for this configuration.`;
  }
  document.getElementById('err-width').style.display = wErr ? 'block' : 'none';
  document.getElementById('err-width').textContent = wErr;
  document.getElementById('err-height').style.display = hErr ? 'block' : 'none';
  document.getElementById('err-height').textContent = hErr;
}

// ─── CONTROL ─────────────────────────────────────────────────
function selectControl(el) {
  document.querySelectorAll('#control-chips .opt-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.control = el.dataset.val;
  document.getElementById('s4-preview').textContent = ' — ' + el.firstChild.textContent.trim();
  // Pro wand = single shade only
  if (state.control === 'prowand' && state.isDouble === 'double') {
    state.isDouble = 'single';
    document.querySelectorAll('#double-chips .opt-chip').forEach(c => c.classList.remove('selected'));
    document.querySelector('#double-chips .opt-chip[data-val="single"]').classList.add('selected');
    document.getElementById('s5-preview').textContent = ' — Single Shade';
    document.getElementById('back-fabric-wrap').style.display = 'none';
  }
  updatePrice();
}

// ─── DOUBLE SHADE ────────────────────────────────────────────
function selectDouble(el) {
  document.querySelectorAll('#double-chips .opt-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.isDouble = el.dataset.val;
  document.getElementById('s5-preview').textContent = ' — ' + el.firstChild.textContent.trim();
  document.getElementById('back-fabric-wrap').style.display = state.isDouble === 'double' ? 'block' : 'none';
  validateDims();
  updatePrice();
}
function selectBackFabric(el) {
  document.querySelectorAll('#back-fabric-chips .opt-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.backFabric = {code: el.dataset.code, type: el.dataset.type, name: el.firstChild.textContent.trim()};
  updatePrice();
}

// ─── TOP TREATMENT ────────────────────────────────────────────
function selectTopTreatment(el) {
  document.querySelectorAll('#top-treatment-chips .opt-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.topTreatment = el.dataset.val;
  document.getElementById('s6-preview').textContent = ' — ' + el.firstChild.textContent.trim();
  document.getElementById('cassette-color-wrap').style.display = state.topTreatment === 'cassette' ? 'block' : 'none';
  document.getElementById('metal-color-wrap').style.display = state.topTreatment === 'metal' ? 'block' : 'none';
  updatePrice();
}
function selectCassetteColor(el) {
  document.querySelectorAll('#cassette-color-wrap .opt-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.cassetteColor = el.dataset.val;
}
function selectMetalColor(el) {
  document.querySelectorAll('#metal-color-wrap .opt-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.metalColor = el.dataset.val;
}

// ─── ROLL DIRECTION ───────────────────────────────────────────
function selectRollDir(el) {
  document.querySelectorAll('#step7-body .opt-chip').forEach(c => c.classList.remove('selected'));
  el.classList.add('selected');
  state.rollDir = el.dataset.val;
  document.getElementById('s7-preview').textContent = ' — ' + el.firstChild.textContent.trim();
}

// ─── DELIVERY ────────────────────────────────────────────────
function selectDelivery(val) {
  state.delivery = val;
  document.getElementById('del-ship').classList.toggle('selected', val === 'ship');
  document.getElementById('del-pickup').classList.toggle('selected', val === 'pickup');
  document.getElementById('s9-preview').textContent = val === 'ship' ? ' — Ship to me' : ' — Pick up';
}

// ─── PRICE LOOKUP ────────────────────────────────────────────
function lookupPrice(matrix, widths, heights, w, h) {
  // Find closest bracket
  let wIdx = widths.length - 1;
  for (let i = 0; i < widths.length; i++) { if (widths[i] >= w) { wIdx = i; break; } }
  let hIdx = heights.length - 1;
  for (let i = 0; i < heights.length; i++) { if (heights[i] >= h) { hIdx = i; break; } }
  return matrix[hIdx][wIdx];
}
function updatePrice() {
  const qty = parseInt(document.getElementById('inp-qty').value) || 1;
  state.qty = qty;
  document.getElementById('s8-preview').textContent = qty > 1 ? ' — x' + qty : '';

  if (!state.fabric || !state.width || !state.height) {
    document.getElementById('roller-price-panel').style.display = 'none';
    return;
  }
  const w = state.width, h = state.height;
  const pg = state.fabric.pg;
  let shadePrice = 0;
  const widths = (pg === 'D' || pg === 'E') ? WIDTHS_DE : WIDTHS_AB;
  const heights = HEIGHTS_DE; // DE have 13 rows same as AB
  const heightsAB = HEIGHTS_AB;

  if (pg === 'A') shadePrice = lookupPrice(PRICES_A, WIDTHS_AB, HEIGHTS_AB, w, h);
  else if (pg === 'B') shadePrice = lookupPrice(PRICES_B, WIDTHS_AB, HEIGHTS_AB, w, h);
  else if (pg === 'C') shadePrice = lookupPrice(PRICES_C, WIDTHS_AB, HEIGHTS_AB, w, h);
  else if (pg === 'D') shadePrice = lookupPrice(PRICES_D, WIDTHS_DE, HEIGHTS_DE, w, h);
  else if (pg === 'E') shadePrice = lookupPrice(PRICES_E, WIDTHS_DE, HEIGHTS_DE, w, h);

  // Motor surcharge
  let motorCost = 0, motorLabel = '';
  if (state.control === 'prowand') { motorCost = 256; motorLabel = 'Pro Wand Motor'; }
  else if (state.control === 'remote-li' || state.control === 'remote-dc' || state.control === 'remote-ac') { motorCost = 420; motorLabel = 'Remote Motor'; }
  else if (state.control === 'powerlift') { motorCost = 579; motorLabel = 'Power Lift Motor'; }

  // Cordless surcharge
  let cordlessCost = 0;
  if (state.control === 'cordless') {
    cordlessCost = state.isDouble === 'double' ? 84 : 42;
  }

  // Top treatment surcharge
  let topCost = 0, topLabel = '';
  if (state.topTreatment === 'cassette') {
    topCost = lookupPrice([CASS_PRICES], CASS_WIDTHS, [1], w, 0);
    topLabel = 'Square Cassette';
  } else if (state.topTreatment === 'boxvalance') {
    topCost = lookupPrice([BOX_PRICES], BOX_WIDTHS, [1], w, 0);
    topLabel = 'Box Valance';
  } else if (state.topTreatment === 'tradvalance') {
    topCost = 51;
    topLabel = 'Traditional Valance';
  } else if (state.topTreatment === 'metal') {
    topCost = 169;
    topLabel = 'Decorative Metal Bracket';
  }

  // Back fabric
  let bfCost = 0;
  if (state.isDouble === 'double' && state.backFabric) {
    bfCost = lookupPrice(PRICES_BF, BF_WIDTHS, BF_HEIGHTS, w, Math.min(h, 96));
  }

  const subtotal1 = shadePrice + motorCost + cordlessCost + topCost + bfCost;
  const total = subtotal1 * qty;

  // Show panel
  const panel = document.getElementById('roller-price-panel');
  panel.style.display = 'block';
  document.getElementById('pp-shade-price').textContent = '$' + shadePrice.toLocaleString();

  const motorRow = document.getElementById('pp-motor-row');
  motorRow.style.display = motorCost ? 'flex' : 'none';
  document.getElementById('pp-motor-label').textContent = motorLabel;
  document.getElementById('pp-motor-price').textContent = motorCost ? '+$' + motorCost : '';

  const topRow = document.getElementById('pp-top-row');
  topRow.style.display = topCost ? 'flex' : 'none';
  document.getElementById('pp-top-label').textContent = topLabel;
  document.getElementById('pp-top-price').textContent = topCost ? '+$' + topCost.toLocaleString() : '';

  const backRow = document.getElementById('pp-back-row');
  backRow.style.display = bfCost ? 'flex' : 'none';
  document.getElementById('pp-back-price').textContent = bfCost ? '+$' + bfCost.toLocaleString() : '';

  const cordlessRow = document.getElementById('pp-cordless-row');
  cordlessRow.style.display = cordlessCost ? 'flex' : 'none';
  document.getElementById('pp-cordless-price').textContent = cordlessCost ? '+$' + cordlessCost : '';

  const qtyRow = document.getElementById('pp-qty-row');
  qtyRow.style.display = qty > 1 ? 'flex' : 'none';
  document.getElementById('pp-qty-label').textContent = 'Subtotal x ' + qty;
  document.getElementById('pp-qty-price').textContent = qty > 1 ? '$' + (subtotal1 * qty).toLocaleString() : '';

  document.getElementById('pp-total').textContent = '$' + total.toLocaleString();
}

// ─── SUBMIT ──────────────────────────────────────────────────
function submitRollerQuote() {
  const name = document.getElementById('q-name').value.trim();
  const phone = document.getElementById('q-phone').value.trim();
  const email = document.getElementById('q-email').value.trim();
  const notes = document.getElementById('q-notes').value.trim();

  if (!name) { alert('Please enter your name.'); return; }
  if (!phone) { alert('Please enter your phone number.'); return; }

  const fab = state.fabric;
  const ctrl = state.control || 'Not selected';
  const mount = state.mount || 'Not selected';
  const rollDir = state.rollDir || 'Standard';
  const topTx = state.topTreatment || 'Open Roll (Standard)';
  const isDouble = state.isDouble || 'single';

  const subject = encodeURIComponent('Woven Wood Roller Shade Quote — ' + (fab ? fab.name : 'No fabric selected') + ' — ' + name);

  const body = encodeURIComponent([
    'WOVEN WOOD ROLLER SHADE QUOTE REQUEST',
    '======================================',
    '',
    'CUSTOMER INFO',
    'Name: ' + name,
    'Phone: ' + phone,
    'Email: ' + (email || 'Not provided'),
    '',
    'SHADE CONFIGURATION',
    'Fabric: ' + (fab ? fab.name + ' (' + fab.code + ') — Group ' + (fab ? fab.pg : '') : 'Not selected'),
    'Material: ' + (fab ? fab.mat : ''),
    'Mount Type: ' + mount,
    'Width: ' + (state.width ? state.width + '"' : 'Not entered'),
    'Height: ' + (state.height ? state.height + '"' : 'Not entered'),
    'Control Type: ' + ctrl,
    'Single/Double: ' + isDouble,
    'Back Fabric: ' + (isDouble === 'double' && state.backFabric ? state.backFabric.name + ' (' + state.backFabric.code + ')' : 'N/A'),
    'Top Treatment: ' + topTx,
    'Cassette Color: ' + (state.cassetteColor || 'N/A'),
    'Metal Bracket Color: ' + (state.metalColor || 'N/A'),
    'Roll Direction: ' + rollDir,
    'Quantity: ' + state.qty,
    'Delivery: ' + (state.delivery === 'ship' ? 'Ship via UPS/FedEx' : 'Customer pickup'),
    '',
    'NOTES FROM CUSTOMER',
    notes || '(none)',
    '',
    'PRICE ESTIMATE (MSRP — confirm at order)',
    'Shade base: $' + (fab && state.width && state.height ? '(see pricing matrix)' : 'N/A'),
    '',
    'Please confirm pricing and availability. Customer is aware all prices are MSRP estimates confirmed at order.',
  ].join('\n'));

  window.location.href = 'mailto:justin@blindznation.com?subject=' + subject + '&body=' + body;
}

// Quantity input
document.getElementById('inp-qty').addEventListener('input', function() {
  state.qty = parseInt(this.value) || 1;
  document.getElementById('s8-preview').textContent = state.qty > 1 ? ' — x' + state.qty : '';
  updatePrice();
});

// Auto-open first step
window.addEventListener('DOMContentLoaded', function() {
  // Steps start collapsed except step 1 which is open
});