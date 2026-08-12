var solDelivery = 'ship';
var _solCoupledActive = false;
var _solCoupledCount = 2;
var _solCoupledSameSize = true;

function solToggleCoupled() {
  _solCoupledActive = !_solCoupledActive;
  var btn = document.getElementById('coupled-toggle-btn');
  var wrap = document.getElementById('coupled-wrap');
  if (btn) btn.classList.toggle('sel', _solCoupledActive);
  if (wrap) wrap.style.display = _solCoupledActive ? 'block' : 'none';
  if (_solCoupledActive) {
    solRenderCoupledFields(2);
    solCheckCoupledOpWarn();
  }
  updateSummary();
}

function solCheckCoupledOpWarn() {
  var warn = document.getElementById('coupled-op-warn');
  if (!warn) return;
  var op = getOpt('grp-op') || '';
  var blocked = (op === 'PrecisionLift™ Cordless' || op === 'SmartRelease™');
  warn.style.display = (_solCoupledActive && blocked) ? 'block' : 'none';
}

function solShowCoupledSame() {
  _solCoupledSameSize = true;
  var s = document.getElementById('coupled-same-wrap');
  var d = document.getElementById('coupled-diff-wrap');
  if (s) s.style.display = 'block';
  if (d) d.style.display = 'none';
}

function solShowCoupledDiff() {
  _solCoupledSameSize = false;
  var s = document.getElementById('coupled-same-wrap');
  var d = document.getElementById('coupled-diff-wrap');
  if (s) s.style.display = 'none';
  if (d) d.style.display = 'block';
  solRenderCoupledFields(_solCoupledCount);
}

function solSetCoupledCount(n) {
  _solCoupledCount = n;
}

function solRenderCoupledFields(n) {
  _solCoupledCount = n;
  var container = document.getElementById('coupled-dim-fields');
  if (!container) return;
  var html = '';
  for (var i = 1; i <= n; i++) {
    html += '<div style="margin-bottom:8px;padding:10px 12px;background:#fff;border:1px solid #e8e8e4;border-radius:8px">';
    html += '<div style="font-size:11px;font-weight:600;color:#555;margin-bottom:7px">Shade ' + i + ' — from left</div>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label>Width</label><input type="number" id="coupled-w-' + i + '" min="12" max="144" step="0.5" placeholder="36" oninput="updateSummary()" style="width:100%"></div>';
    html += '<div class="form-group"><label>Height</label><input type="number" id="coupled-h-' + i + '" min="12" max="144" step="0.5" placeholder="72" oninput="updateSummary()" style="width:100%"></div>';
    html += '</div></div>';
  }
  container.innerHTML = html;
}

var _SOL_OP_DESC = {
  cordless: '<strong style="color:#1a6b1a">⭐ PrecisionLift™ Cordless — Recommended</strong> — Pull the handle down to lower, push the hem bar up to raise. No cords, no chains. Norman\'s best-in-class cordless system. WCMA Best for Kids™ certified. Max 118″ W × 144″ H.',
  loop:     '<strong style="color:#333">Manual with chain</strong> — Side-mounted bead chain operates the shade smoothly in both directions. Works for any window size. Best choice for large, heavy, or high windows. Max 118″ W × 144″ H.',
  smartrelease: '<strong style="color:#333">SmartRelease™</strong> — Norman\'s patent-pending upgrade to the cord loop. A gentle tug releases the shade from any raised position — no reaching up required. Ideal for high or hard-to-reach windows. Raceway always included. Max 118″ W × 144″ H.',
  motor:    '<strong style="color:#333">Motorized</strong> — Battery or hardwired motor inside the roller tube. Control by app, remote, voice (Alexa/Google/HomeKit), or schedule. 100% cord-free. Available with Norman Smart or Rollease Acmeda Automate. Max 144″ W × 144″ H.'
};

function solShowOpDesc(key) {
  var box = document.getElementById('op-desc-box');
  if (!box) return;
  var bg = key === 'cordless' ? '#edf7ed' : '#f5f2ed';
  var border = key === 'cordless' ? '#2e7d32' : 'var(--gold)';
  box.style.background = bg;
  box.style.borderLeftColor = border;
  box.innerHTML = _SOL_OP_DESC[key] || '';
}

function solGetCoupledSummary() {
  if (!_solCoupledActive) return null;
  if (_solCoupledSameSize) {
    return _solCoupledCount + ' shades — same size (see dimensions above)';
  }
  var parts = [];
  for (var i = 1; i <= _solCoupledCount; i++) {
    var w = (document.getElementById('coupled-w-' + i) || {}).value || '?';
    var h = (document.getElementById('coupled-h-' + i) || {}).value || '?';
    parts.push('Shade ' + i + ': ' + w + '″W × ' + h + '″H');
  }
  return _solCoupledCount + ' shades — ' + parts.join(' | ');
}

var SOLUNA_FABRIC_DATA = {
  'solar': [
    {name:'Lakeview 3%', colors:[{n:'Light Taupe',c:'F1270'},{n:'Sand Drift',c:'F1271'}]},
    {name:'Lakeview 7%', colors:[{n:'Flax',c:'F1266'},{n:'Yellow Stone',c:'F1267'}]},
    {name:'Lakeview 10%', colors:[{n:'Frost Gray',c:'F1268'},{n:'Java',c:'F1269'}]},
    {name:'Meadows 1%', colors:[{n:'Travertine',c:'F1274'},{n:'Mushroom',c:'F1275'},{n:'Sun Buff',c:'F1276'}]},
    {name:'Meadows 3%', colors:[{n:'Rustic Brown',c:'F1272'},{n:'Earth Brown',c:'F1273'}]},
    {name:'Jubilee 3%', colors:[{n:'Sweet Cream',c:'F1277'},{n:'Steel Blue/Beige',c:'F1278'},{n:'Chestnut',c:'F1279'},{n:'Egg Shell',c:'F1280'},{n:'Coal',c:'F1281'}]},
    {name:'Moon 5%', colors:[{n:'Chalk',c:'F1519'},{n:'Pearl Linen',c:'F1520'},{n:'Pearl',c:'F1521'},{n:'Pearl Pewter',c:'F1522'},{n:'Charcoal Chestnut',c:'F1523'},{n:'Charcoal Gray',c:'F1524'},{n:'Raven Black',c:'F1525'}]},
    {name:'Serene 1%', colors:[{n:'Snow White',c:'F1158'},{n:'Silver',c:'F1150'},{n:'Umber',c:'F1149'},{n:'Steel',c:'F1151'}]},
    {name:'Serene 3%', colors:[{n:'Snow White',c:'F1232'},{n:'Silver',c:'F1233'},{n:'Umber',c:'F1234'},{n:'Steel',c:'F1235'}]},
    {name:'Serene 7%', colors:[{n:'Snow White',c:'F1240'},{n:'Silver',c:'F1241'},{n:'Umber',c:'F1242'},{n:'Steel',c:'F1243'}]},
    {name:'Flow 1%', colors:[{n:'Polar White',c:'F1244'},{n:'Wheat',c:'F1245'},{n:'Quarry Stone',c:'F1246'},{n:'Ink',c:'F1247'}]},
    {name:'Flow 5%', colors:[{n:'Polar White',c:'F1159'},{n:'Wheat',c:'F1152'},{n:'Quarry Stone',c:'F1154'},{n:'Ink',c:'F1153'}]},
    {name:'Flow 7%', colors:[{n:'Polar White',c:'F1248'},{n:'Wheat',c:'F1249'},{n:'Quarry Stone',c:'F1250'},{n:'Ink',c:'F1251'}]},
    {name:'Windsong 1%', colors:[{n:'Soft White',c:'F1252'},{n:'Canvas',c:'F1253'},{n:'Graphite',c:'F1254'},{n:'Raven Black',c:'F1255'}]},
    {name:'Windsong 5%', colors:[{n:'Soft White',c:'F1260'},{n:'Canvas',c:'F1261'},{n:'Nickel',c:'F1262'},{n:'Graphite',c:'F1263'},{n:'Eclipse',c:'F1264'},{n:'Raven Black',c:'F1265'}]},
    {name:'Breeze Screen 1% ⚠ Linen', colors:[{n:'Linen Flax',c:'F1780'},{n:'Linen Khaki',c:'F1782'},{n:'Linen Dune',c:'F1783'},{n:'Linen Graphite',c:'F1784'},{n:'Linen Almond Milk',c:'F1785'},{n:'Linen Stone',c:'F1786'},{n:'Linen Cloud',c:'F1846'},{n:'Linen Warm Ivory',c:'F1850'}]},
    {name:'Breeze Screen 3% ⚠ Linen', colors:[{n:'Linen Flax',c:'F1787'},{n:'Linen Khaki',c:'F1789'},{n:'Linen Dune',c:'F1790'},{n:'Linen Graphite',c:'F1791'},{n:'Linen Almond Milk',c:'F1792'},{n:'Linen Stone',c:'F1793'},{n:'Linen Cloud',c:'F1845'},{n:'Linen Warm Ivory',c:'F1849'}]},
    {name:'Galaxy 3%', colors:[{n:'Soft White',c:'F1728'},{n:'Ash',c:'F1731'},{n:'Black',c:'F1727'}]},
    {_divider:'Commercial Solar Screens (NA Series)'},
    {name:'NA400 3%', colors:[{n:'Chalk',c:'F0381'},{n:'Chalk/Beige',c:'F0382'},{n:'Charcoal',c:'F0384'}]},
    {name:'NA820 3%', colors:[{n:'Oyster/Pewter',c:'F0407'}]},
    {name:'NA400 5%', colors:[{n:'Chalk/Beige',c:'F0388'},{n:'Charcoal',c:'F0390'}]},
    {name:'NA400 10%', colors:[{n:'Charcoal',c:'F0396'}]}
  ],
  'lf': [
    {name:'Kendra', colors:[{n:'LF Foliage',c:'F0890'}]},
    {name:'Francis', colors:[{n:'Pearl',c:'F0876'},{n:'Barley',c:'F0877'},{n:'Sandstone',c:'F0878'},{n:'Toast',c:'F0879'},{n:'Espresso',c:'F0882'},{n:'Brownie',c:'F0883'},{n:'Oatmeal',c:'F0884'},{n:'Doe',c:'F0885'},{n:'Shale',c:'F0886'},{n:'Black',c:'F0888'},{n:'Denim',c:'F0889'}]},
    {name:'Breeze ⚠ Linen', colors:[{n:'Linen Flax',c:'F0891'},{n:'Linen Natural',c:'F0893'},{n:'Linen Khaki',c:'F0894'},{n:'Linen Dune',c:'F0895'},{n:'Linen Graphite',c:'F0896'},{n:'Linen Almond Milk',c:'F0927'},{n:'Linen Stone',c:'F1778'},{n:'Linen Cloud',c:'F1847'},{n:'Linen Warm Ivory',c:'F1851'}]},
    {name:'Hayes', colors:[{n:'Maple',c:'F0747'},{n:'Hickory',c:'F0748'},{n:'Birch',c:'F0749'},{n:'Mahogany',c:'F0751'}]},
    {name:'Valerie', colors:[{n:'Moonscape',c:'F0738'},{n:'Cove',c:'F0739'},{n:'Dolphin',c:'F0740'},{n:'Pomegranate',c:'F0741'},{n:'Sapphire',c:'F0742'},{n:'Silhouette',c:'F0743'},{n:'Daylight',c:'F0752'}]},
    {name:'Emery', colors:[{n:'Creamy',c:'F0753'},{n:'Khaki',c:'F0754'},{n:'Chiffon',c:'F1560'},{n:'Maize',c:'F1561'}]},
    {name:'Brook', colors:[{n:'Egret',c:'F1121'},{n:'Smoke',c:'F1122'},{n:'Beige',c:'F1123'},{n:'Latte',c:'F1124'}]},
    {name:'Chelsea', colors:[{n:'Snow',c:'F1445'},{n:'Cream',c:'F1446'},{n:'Natural',c:'F1447'},{n:'Stone',c:'F1448'},{n:'Caviar',c:'F1449'}]},
    {name:'Sierra', colors:[{n:'Snow',c:'F1450'},{n:'Cream',c:'F1451'},{n:'Natural',c:'F1452'},{n:'Stone',c:'F1453'},{n:'Caviar',c:'F1454'},{n:'Canvas',c:'F1966'},{n:'Graphite',c:'F1967'}]},
    {name:'Shimmer', colors:[{n:'Goldmine',c:'F1436'},{n:'Starry Night',c:'F1437'},{n:'Pewter',c:'F1439'},{n:'Midnight',c:'F1440'}]},
    {name:'Amelia', colors:[{n:'Mist Gray',c:'F1484'},{n:'Heather Gray',c:'F1485'},{n:'Heather Charcoal',c:'F1486'},{n:'Heather Smoke',c:'F1487'}]},
    {name:'Lola LF', colors:[{n:'Porcelain',c:'F1551'},{n:'Almond',c:'F1552'},{n:'Light Khaki',c:'F1553'},{n:'Wheat',c:'F1554'},{n:'Platinum',c:'F1555'},{n:'Cement',c:'F1556'},{n:'Pewter',c:'F1557'},{n:'Iron',c:'F1558'},{n:'Indigo',c:'F1559'}]},
    {name:'Clarissa', colors:[{n:'Wheat',c:'F0870'},{n:'Platinum',c:'F0871'},{n:'Tobacco Brown',c:'F0872'},{n:'Sable Brown',c:'F0873'},{n:'Burlap',c:'F0874'},{n:'Porcelain',c:'F0928'},{n:'Powder',c:'F1532'},{n:'Steel',c:'F1533'},{n:'Silver Satin',c:'F1534'},{n:'Golden Straw',c:'F1535'},{n:'Coffee Bean',c:'F1536'},{n:'Coal',c:'F1550'}]},
    {name:'Callie', colors:[{n:'Pure White',c:'F1734'},{n:'Vanilla Cream',c:'F1735'},{n:'Natural Tan',c:'F1736'},{n:'Silver Ash',c:'F1737'},{n:'Pebble Gray',c:'F1738'},{n:'Black Iron',c:'F1739'},{n:'Cloudy Gray',c:'F2028'},{n:'Gray',c:'F2030'},{n:'Rich Truffle',c:'F2032'}]},
    {name:'Remy', colors:[{n:'White Dove',c:'F1746'},{n:'Seashell Gray',c:'F1747'},{n:'Dune',c:'F1748'},{n:'Hickory Bark',c:'F1749'},{n:'Creamy Mocha',c:'F1750'},{n:'Natural Slate',c:'F1751'}]}
  ],
  'sheer': [
    {name:'Sheer', colors:[{n:'Linen Weave',c:'F0908'}]},
    {name:'Dazzle', colors:[{n:'Soft White',c:'F1538'},{n:'Eggshell',c:'F1539'},{n:'Pewter Green',c:'F1540'},{n:'Charcoal',c:'F1541'},{n:'Ink',c:'F1542'}]},
    {name:'Scarlett ⚠ Linen', colors:[{n:'Cottage Linen',c:'F1599'},{n:'Seashell',c:'F1600'},{n:'Crema',c:'F1601'},{n:'Stone',c:'F1602'}]},
    {name:'Lakeshore', colors:[{n:'Natural Gray',c:'F1642'}]},
    {name:'Aruba (Natural)', colors:[{n:'Sparkle Ivory',c:'F0860'},{n:'Sparkle Khaki',c:'F0861'},{n:'Sparkle Espresso',c:'F0862'}]},
    {name:'Caroline (Natural)', colors:[{n:'White Sand',c:'F0867'}]},
    {name:'Samoa (Natural)', colors:[{n:'Daylight',c:'F0863'},{n:'Sand',c:'F0864'},{n:'Cumin',c:'F0865'},{n:'Old Teak',c:'F0866'}]},
    {name:'Bali (Natural)', colors:[{n:'Black Walnut',c:'F0668'},{n:'Sand',c:'F1668'},{n:'Flax',c:'F1669'},{n:'Latte',c:'F1926'},{n:'Stone Gray',c:'F1927'},{n:'Desert Beige',c:'F2023'},{n:'Warm Mocha',c:'F2024'},{n:'Soft Sandstone',c:'F2025'},{n:'Gentle Ash',c:'F2026'},{n:'Gray',c:'F2027'}]},
    {name:'Phuket (Natural)', colors:[{n:'Snow White',c:'F0656'},{n:'Honey',c:'F0657'},{n:'Black Olive',c:'F0659'},{n:'Grey Fog',c:'F0660'},{n:'Dust',c:'F0661'},{n:'Dough',c:'F0868'},{n:'Mocha',c:'F1670'}]},
    {name:'Bora Bora (Natural)', colors:[{n:'Seashell White',c:'F0662'},{n:'Straw',c:'F0663'},{n:'Cinnamon',c:'F0869'}]},
    {name:'Java (Natural)', colors:[{n:'Raffia',c:'F0856'},{n:'Haystack',c:'F0857'},{n:'Natural',c:'F0858'},{n:'Sage',c:'F0859'},{n:'Toasted Brown',c:'F1562'}]},
    {name:'Riviera (Natural)', colors:[{n:'Frost',c:'F1290'},{n:'Sugar Cane',c:'F1291'},{n:'Honey',c:'F1292'},{n:'Metal',c:'F1293'},{n:'Silver Fox',c:'F1713'}]},
    {name:'Maui Natural ⚠ Max 120″H', colors:[{n:'Vanilla Stripe',c:'F1543'},{n:'Natural Stripe',c:'F1544'},{n:'Slate Stripe',c:'F1545'},{n:'Ink/Natural',c:'F1548'},{n:'Coffee/Natural',c:'F1549'}]},
    {name:'Catalina (Natural)', colors:[{n:'Sea Salt',c:'F1605'},{n:'Oatmeal',c:'F1712'}]},
    {name:'Cove (Natural)', colors:[{n:'Jet Black',c:'F1714'}]}
  ],
  'rd': [
    {name:'Garden', colors:[{n:'RD Foliage',c:'F0853'},{n:'Winter White',c:'F1514'},{n:'Ecru',c:'F1515'},{n:'Cinnamon',c:'F1516'},{n:'Forest',c:'F1517'},{n:'Midnight',c:'F1518'}]},
    {name:'Elements White Backing', colors:[{n:'White',c:'F1108'},{n:'Stone Gray',c:'F1109'},{n:'Broken White',c:'F1110'},{n:'Cloudy Gray',c:'F1111'},{n:'Gray',c:'F1112'},{n:'Anthracite Gray',c:'F1113'}]},
    {name:'Elements', colors:[{n:'Stone Gray',c:'F2109'},{n:'Broken White',c:'F2110'},{n:'Cloudy Gray',c:'F2111'},{n:'Gray',c:'F2112'},{n:'Anthracite Gray',c:'F2113'},{n:'Weathered White',c:'F2114'},{n:'Soft Sandstone',c:'F2115'},{n:'Gentle Ash',c:'F2116'},{n:'Soothing Gray',c:'F2117'},{n:'Graphite',c:'F2118'},{n:'Desert Beige',c:'F2119'},{n:'Warm Mocha',c:'F2120'},{n:'Rich Truffle',c:'F2121'},{n:'Alabaster',c:'F2043'},{n:'Canvas',c:'F2044'},{n:'New Khaki',c:'F2045'}]},
    {name:'Jamaica', colors:[{n:'Latte',c:'F0827'},{n:'Crystal',c:'F0828'},{n:'Biscuit',c:'F0829'}]},
    {name:'Bermuda', colors:[{n:'Mushroom',c:'F0831'},{n:'Cocoa',c:'F0832'},{n:'Charcoal',c:'F0834'}]},
    {name:'Fiji', colors:[{n:'Pure White',c:'F0822'},{n:'Cream/Ash',c:'F0823'},{n:'Flax/Brown',c:'F0824'},{n:'Chocolate/Cream',c:'F0825'},{n:'Charcoal/Brown',c:'F0826'}]},
    {name:'Lola BO', colors:[{n:'Porcelain',c:'F1455'},{n:'Almond',c:'F1456'},{n:'Light Khaki',c:'F1457'},{n:'Wheat',c:'F1458'},{n:'Platinum',c:'F1459'},{n:'Cement',c:'F1460'},{n:'Pewter',c:'F1461'},{n:'Iron',c:'F1462'},{n:'Indigo',c:'F1463'}]},
    {name:'Summerland ⚠ Linen', colors:[{n:'Pearl',c:'F1510'},{n:'Maize',c:'F1511'},{n:'Sterling',c:'F1512'}]},
    {name:'Cory', colors:[{n:'White',c:'F1479'},{n:'Ivory',c:'F1480'},{n:'Sand',c:'F1481'}]},
    {name:'Callie RD', colors:[{n:'Pure White',c:'F1740'},{n:'Vanilla Cream',c:'F1741'},{n:'Natural Tan',c:'F1742'},{n:'Silver Ash',c:'F1743'},{n:'Pebble Gray',c:'F1744'},{n:'Black Iron',c:'F1745'},{n:'Cloudy Gray',c:'F2033'},{n:'Gray',c:'F2035'},{n:'Rich Truffle',c:'F2037'}]},
    {name:'Remy RD', colors:[{n:'White Dove',c:'F1752'},{n:'Seashell Gray',c:'F1753'},{n:'Dune',c:'F1754'},{n:'Hickory Bark',c:'F1755'},{n:'Creamy Mocha',c:'F1756'},{n:'Natural Slate',c:'F1757'}]},
    {name:'Francis RD', colors:[{n:'Pearl',c:'F1762'},{n:'Sandstone',c:'F1763'},{n:'Oatmeal',c:'F1764'},{n:'Doe',c:'F1765'},{n:'Black',c:'F1766'},{n:'Denim',c:'F1767'}]},
    {name:'Breeze RD ⚠ Linen', colors:[{n:'Linen Flax',c:'F1768'},{n:'Linen Natural',c:'F1769'},{n:'Linen Khaki',c:'F1770'},{n:'Linen Dune',c:'F1771'},{n:'Linen Graphite',c:'F1772'},{n:'Linen Almond Milk',c:'F1773'},{n:'Linen Stone',c:'F1779'},{n:'Linen Cloud',c:'F1848'},{n:'Linen Warm Ivory',c:'F1852'}]},
    {name:'Amelia RD', colors:[{n:'Mist Gray',c:'F1774'},{n:'Heather Gray',c:'F1775'},{n:'Heather Charcoal',c:'F1776'},{n:'Heather Smoke',c:'F1777'}]}
  ]
};

function showFabricColls(key) {
  var wrap = document.getElementById('fabric-coll-wrap');
  var inner = document.getElementById('fabric-coll-inner');
  if (!wrap || !inner) return;
  var colls = SOLUNA_FABRIC_DATA[key] || [];
  if (!colls.length) { wrap.style.display = 'none'; return; }
  inner.innerHTML = '';
  colls.forEach(function(coll) {
    if (coll._divider) {
      var divEl = document.createElement('div');
      divEl.style.cssText = 'font-size:10px;font-weight:700;color:var(--gold);text-transform:uppercase;letter-spacing:.8px;margin:14px 0 6px;padding-top:10px;border-top:1px solid #e8e4de';
      divEl.textContent = coll._divider;
      inner.appendChild(divEl);
      return;
    }
    var isLinen = coll.name.indexOf('⚠') !== -1;
    var cleanName = coll.name.replace(' ⚠ Linen', '').replace(' ⚠ Max 120″H', '');
    var grpDiv = document.createElement('div');
    grpDiv.style.cssText = 'margin-bottom:10px';
    var nameEl = document.createElement('div');
    nameEl.style.cssText = 'font-size:10px;font-weight:600;color:#777;text-transform:uppercase;letter-spacing:.8px;margin-bottom:4px';
    nameEl.textContent = cleanName;
    if (isLinen) {
      var warn = document.createElement('span');
      warn.style.cssText = 'color:#e67e22;font-weight:400;margin-left:4px;text-transform:none;letter-spacing:0';
      warn.textContent = isLinen ? (coll.name.indexOf('Max') !== -1 ? '⚠ Max 120″H' : '⚠ Linen backing') : '';
      nameEl.appendChild(warn);
    }
    grpDiv.appendChild(nameEl);
    var row = document.createElement('div');
    row.style.cssText = 'display:flex;flex-wrap:wrap;gap:4px';
    coll.colors.forEach(function(color) {
      var btn = document.createElement('button');
      btn.className = 'opt-btn';
      btn.style.cssText = 'font-size:11px;padding:3px 9px';
      btn.textContent = color.n;
      btn.title = color.c;
      btn.setAttribute('data-coll', cleanName);
      btn.onclick = function() {
        document.querySelectorAll('#fabric-coll-inner .opt-btn').forEach(function(b){b.classList.remove('sel');});
        btn.classList.add('sel');
        updateSummary();
      };
      row.appendChild(btn);
    });
    grpDiv.appendChild(row);
    inner.appendChild(grpDiv);
  });
  wrap.style.display = 'block';
}

function getSelectedFabricColor() {
  var sel = document.querySelector('#fabric-coll-inner .opt-btn.sel');
  return sel ? sel.textContent.trim() + ' (' + sel.title + ')' : '';
}

function solPickShadeType(type, btn) {
  selOpt(btn, 'grp-shade-type');
  var isDual = type === 'dual';
  var dualFabrics = document.getElementById('dual-shade-fabrics');
  var fabricStep = document.getElementById('fabric-coll-wrap');
  var grpLight = document.getElementById('grp-light');
  if (dualFabrics) dualFabrics.style.display = isDual ? 'block' : 'none';
  // Dim single-shade fabric picker when dual is active
  if (grpLight) grpLight.style.opacity = isDual ? '0.4' : '';
  if (fabricStep) fabricStep.style.display = isDual ? 'none' : '';
  // Auto-select cassette when dual shade chosen
  if (isDual) {
    ['openroll','cassette','fascia','lightguard'].forEach(function(t) {
      var el = document.getElementById('sol-addon-' + t);
      if (el) el.classList.remove('sel');
    });
    var cassetteBtn = document.getElementById('sol-addon-cassette');
    if (cassetteBtn) cassetteBtn.classList.add('sel');
    var hwOpts = document.getElementById('sol-hw-subopts');
    var fasciaOpts = document.getElementById('sol-fascia-subopts');
    if (hwOpts) hwOpts.style.display = 'none';
    if (fasciaOpts) fasciaOpts.style.display = 'none';
  }
  updateSummary();
}

function solPickAddon(type, btn) {
  var isActive = btn.classList.contains('sel');
  // All headrail options are mutually exclusive — clear all first
  ['openroll','cassette','fascia','lightguard'].forEach(function(t) {
    var el = document.getElementById('sol-addon-' + t);
    if (el) el.classList.remove('sel');
  });
  var activeType = isActive ? null : type;
  if (!isActive) btn.classList.add('sel');
  // Show/hide sub-panels
  var hwOpts = document.getElementById('sol-hw-subopts');
  var fasciaOpts = document.getElementById('sol-fascia-subopts');
  if (hwOpts) hwOpts.style.display = (activeType === 'openroll') ? 'block' : 'none';
  if (fasciaOpts) fasciaOpts.style.display = (activeType === 'fascia') ? 'block' : 'none';
  updateSummary();
}

function solPickDel(v, card) {
  solDelivery = v;
  document.querySelectorAll('.delivery-opt-card').forEach(function(c){c.classList.remove('sel');});
  card.classList.add('sel');
}

function toggleMotor(on) {
  document.getElementById('motor-sub').classList.toggle('show', on);
  var motorRow = document.getElementById('s-motor-row');
  if (motorRow) motorRow.style.display = on ? 'flex' : 'none';
  var cfg = document.getElementById('sol-motor-config');
  if (on) {
    // Render the shared Norman motor UI (Soluna is a roller → Rollease + Charging Wand allowed)
    if (typeof normanMotorSection === 'function') normanMotorSection('sol-motor-config', 'Soluna Roller Shade');
  } else if (cfg) {
    cfg.innerHTML = '';
  }
  updateSummary();
}

function adjustQty(d) {
  const el = document.getElementById('inp-qty');
  el.value = Math.min(20, Math.max(1, (parseInt(el.value) || 1) + d));
  updateSummary();
}

// ── Pricing grids (Norman suggested retail, cordless base) ───
var _SOL_W = [24,30,36,42,48,54,60,66,72,78,84,90,96,108,120];
var _SOL_H = [36,48,60,72,84,96,108,120,132,144];
var _SOL_GRIDS = {
  f1:[[246,265,282,302,323,340,360,389,416,460,485,510,534,583,633],[266,289,308,334,357,385,409,450,480,531,559,590,620,676,728],[287,308,335,366,401,434,467,510,549,601,635,669,696,751,801],[303,334,370,407,443,482,522,573,609,668,696,727,756,816,876],[326,364,405,448,488,530,574,629,663,715,751,782,816,882,953],[346,394,439,486,533,580,620,675,708,767,803,840,876,953,1024],[371,424,473,528,576,621,657,715,756,817,859,896,939,1017,1097],[397,455,510,565,617,656,698,759,803,868,913,958,1000,1088,1171],[422,485,543,604,650,693,739,803,847,917,966,1011,1060,1153,1248],[448,514,578,630,680,728,778,845,896,967,1019,1070,1121,1218,1322]],
  f2:[[269,290,313,331,356,377,400,433,462,513,541,569,599,652,709],[292,318,342,366,394,427,457,502,533,591,628,659,692,757,818],[315,342,372,407,448,482,521,569,609,671,711,749,779,842,900],[338,371,409,453,494,538,582,639,682,747,779,817,847,916,987],[359,402,451,498,545,593,641,705,742,804,842,880,916,993,1070],[384,435,488,544,595,650,693,754,796,861,904,944,987,1070,1154],[410,471,527,587,647,696,740,804,847,917,965,1011,1059,1146,1238],[440,504,573,631,687,736,785,852,904,975,1024,1074,1123,1224,1319],[470,541,608,676,726,777,829,904,956,1034,1089,1138,1194,1301,1406],[498,575,648,708,762,817,871,954,1011,1090,1148,1206,1261,1375,1492]],
  f3:[[298,327,354,384,411,440,470,501,535,591,626,660,698,763,831],[327,361,395,430,467,506,546,587,629,694,733,776,816,900,972],[355,395,435,482,529,576,624,672,723,793,842,891,929,1013,1093],[386,431,483,537,595,651,703,759,814,890,935,981,1023,1119,1210],[415,472,533,599,657,718,785,843,893,969,1018,1070,1120,1224,1326],[448,514,584,654,723,793,853,912,966,1049,1103,1160,1217,1327,1445],[482,558,636,712,789,853,916,975,1039,1126,1190,1251,1312,1436,1561],[518,603,686,768,845,912,981,1047,1114,1205,1275,1341,1408,1545,1680],[555,647,736,821,894,969,1039,1114,1189,1286,1357,1430,1503,1654,1798],[589,687,787,870,947,1023,1104,1183,1263,1366,1441,1523,1599,1759,1916]],
  f4:[[327,360,390,422,454,485,518,552,590,651,690,727,768,839,914],[360,397,434,472,513,557,601,648,692,764,809,853,897,991,1070],[391,434,480,530,583,632,686,740,796,871,927,981,1022,1114,1202],[424,473,531,591,654,716,774,837,895,980,1027,1079,1126,1230,1332],[456,521,587,657,725,790,863,928,984,1066,1121,1179,1231,1347,1460],[493,565,644,720,796,871,940,1004,1063,1154,1214,1277,1339,1461,1589],[530,615,701,785,868,940,1010,1073,1144,1240,1309,1378,1444,1580,1718],[572,662,755,844,931,1004,1079,1152,1226,1325,1403,1476,1549,1699,1848],[610,711,810,905,985,1066,1144,1226,1308,1414,1494,1573,1654,1818,1980],[649,756,866,959,1043,1126,1215,1302,1389,1503,1585,1674,1759,1936,2108]],
  s1:[[233,250,269,287,304,321,351,370,394,436,460,492,517,560,609],[251,273,293,315,339,361,400,426,454,503,529,569,596,651,701],[272,293,316,346,378,408,453,482,519,568,600,646,671,723,771],[288,315,348,385,417,454,506,541,577,631,657,700,727,785,844],[308,343,382,421,460,498,556,596,626,676,723,753,785,848,913],[326,371,415,457,502,546,600,636,669,723,773,806,844,913,985],[350,399,447,496,541,582,639,676,715,771,825,864,904,977,1056],[375,427,480,530,579,616,676,717,757,819,876,921,961,1046,1126],[396,456,510,565,608,650,715,757,801,867,928,972,1018,1107,1199],[421,483,544,591,639,682,754,799,846,912,980,1030,1078,1170,1270]],
  s2:[[253,274,297,315,335,356,394,415,440,488,514,554,582,633,690],[275,300,324,346,372,403,448,480,510,564,599,640,671,738,794],[298,324,350,384,421,454,509,544,582,638,678,726,756,817,871],[318,348,386,426,463,506,569,608,651,711,743,793,821,891,957],[340,378,424,468,511,557,626,672,706,767,817,851,891,963,1037],[361,409,460,510,558,609,678,718,755,818,875,917,957,1037,1119],[387,442,495,554,605,652,723,767,806,875,937,980,1024,1111,1199],[415,475,534,593,647,690,767,812,861,929,993,1041,1090,1184,1278],[440,507,573,631,680,727,810,861,908,984,1054,1105,1155,1259,1359],[468,537,607,664,715,766,851,907,961,1035,1112,1168,1221,1333,1444]],
  s3:[[281,312,335,363,392,417,446,473,506,558,590,635,669,732,798],[312,343,373,406,440,480,517,556,593,653,692,745,781,865,934],[338,373,410,455,500,544,587,632,680,747,791,853,891,970,1047],[365,407,456,509,560,614,663,716,767,837,878,940,983,1072,1159],[394,448,503,562,622,678,739,794,842,912,976,1026,1073,1170,1273],[423,486,553,617,680,747,804,859,910,987,1058,1112,1165,1274,1384],[455,528,601,672,743,804,864,917,980,1059,1138,1200,1256,1375,1496],[488,569,648,723,797,859,922,985,1048,1134,1219,1286,1348,1478,1608],[525,608,693,775,843,912,980,1048,1118,1209,1301,1371,1438,1580,1720],[557,649,741,819,893,963,1038,1112,1186,1281,1380,1455,1530,1681,1833]]
};
var _SOL_COLL_GROUP = {
  // Solar PG1: higher-openness screents + commercial NA400
  'Serene 7%':'s1','Flow 7%':'s1','Windsong 5%':'s1',
  'NA400 3%':'s1','NA400 5%':'s1','NA400 10%':'s1',
  'NA300 3%':'s1','NA300 5%':'s1', // ⚠ book PG1 but NOT yet in swatch data (no color codes on site)
  // Solar PG2: lower-openness screens, Moon, Breeze Screen + NA820
  'Serene 1%':'s2','Serene 3%':'s2','Flow 1%':'s2','Flow 5%':'s2',
  'Windsong 1%':'s2','Moon 5%':'s2','Breeze Screen 1%':'s2','Breeze Screen 3%':'s2',
  'NA820 3%':'s2',
  'W120 12%':'s2','NA300 1%':'s2','NA400 1%':'s2', // ⚠ book PG2 but NOT yet in swatch data
  // Solar PG3: Lakeview, Meadows, Jubilee, Galaxy
  'Lakeview 3%':'s3','Lakeview 7%':'s3','Lakeview 10%':'s3',
  'Meadows 1%':'s3','Meadows 3%':'s3','Jubilee 3%':'s3','Galaxy 3%':'s3',
  // Fabric PG1: Scarlett, Catalina, Brook, Chelsea, Callie, Elements
  'Scarlett':'f1','Catalina (Natural)':'f1','Brook':'f1','Chelsea':'f1',
  'Callie':'f1','Callie RD':'f1','Elements':'f1','Elements White Backing':'f1',
  'Verona LF':'f1', // ⚠ book PG1 but NOT yet in swatch data
  // Fabric PG2: most sheers/naturals/designer/RD
  'Sheer':'f2','Dazzle':'f2','Lakeshore':'f2',
  'Samoa (Natural)':'f2','Phuket (Natural)':'f2','Bora Bora (Natural)':'f2',
  'Java (Natural)':'f2','Bali (Natural)':'f2','Riviera (Natural)':'f2',
  'Sumatra (Natural)':'f2','Lake Tahoe (Natural)':'f2', // book PG2 naturals (Sumatra flagged discontinued in CLAUDE.md — verify before re-adding to swatches)
  'Francis':'f2','Hayes':'f2','Valerie':'f2','Emery':'f2','Sierra':'f2',
  'Shimmer':'f2','Amelia':'f2','Lola LF':'f2','Remy':'f2',
  'Jamaica':'f2','Bermuda':'f2','Fiji':'f2','Francis RD':'f2','Amelia RD':'f2',
  // Fabric PG3: Aruba/Caroline/Maui/Cove naturals, Breeze/Clarissa designer, most RD
  'Aruba (Natural)':'f3','Caroline (Natural)':'f3','Maui Natural':'f3','Cove (Natural)':'f3',
  'Breeze':'f3','Clarissa':'f3',
  'Garden':'f3','Lola BO':'f3','Summerland':'f3','Cory':'f3',
  'Remy RD':'f3','Breeze RD':'f3',
  // Fabric PG4: Kendra only
  'Kendra':'f4'
};

function _solGridLookup(gKey, w, h) {
  var g = _SOL_GRIDS[gKey];
  if (!g) return 0;
  // Norman charts cover 24–120" wide × 36–144" tall. Beyond that we do NOT clamp or
  // extrapolate — return null so the caller flags it for manual review / quote.
  if (w > _SOL_W[_SOL_W.length - 1] || h > _SOL_H[_SOL_H.length - 1]) return null;
  var ci = _SOL_W.length - 1;
  for (var i = 0; i < _SOL_W.length; i++) { if (w <= _SOL_W[i]) { ci = i; break; } }
  var ri = _SOL_H.length - 1;
  for (var j = 0; j < _SOL_H.length; j++) { if (h <= _SOL_H[j]) { ri = j; break; } }
  return g[ri][ci];
}

function getSelectedFabricColl() {
  var sel = document.querySelector('#fabric-coll-inner .opt-btn.sel');
  return sel ? sel.getAttribute('data-coll') : null;
}

// Fascia / Wood Valance surcharge by width bucket (round UP). Norman book May 2026 p.18.
// All three fascia styles (flat metal, flat/curved fabric-wrapped) price off this row — they are
// all fascias; hanging fabric valances aren't offered in this configurator. Raceway is included.
var _SOL_FASCIA_W   = [24,30,36,42,48,54,60,66,72,78,84,90,96,108,120,132,144];
var _SOL_FASCIA_SUR = [113,118,129,134,145,156,166,182,198,209,225,241,257,284,316,338,364];
function _solFasciaSurcharge(w) {
  for (var i = 0; i < _SOL_FASCIA_W.length; i++) { if (w <= _SOL_FASCIA_W[i]) return _SOL_FASCIA_SUR[i]; }
  return _SOL_FASCIA_SUR[_SOL_FASCIA_SUR.length - 1]; // >144" caught earlier by grid oversize → manual review
}

function _solEstimatePrice() {
  var w    = parseFloat((document.getElementById('inp-width') ||{}).value) || 0;
  var h    = parseFloat((document.getElementById('inp-height')||{}).value) || 0;
  var qty  = parseInt( (document.getElementById('inp-qty')   ||{}).value) || 1;
  var op   = getOpt('grp-op') || '';
  var shadeType = getOpt('grp-shade-type') || 'Standard';
  var coll = getSelectedFabricColl();
  if (!w || !h || !coll) return null;
  var gKey = _SOL_COLL_GROUP[coll];
  if (!gKey) return null;
  var base = _solGridLookup(gKey, w, h);
  if (base === null) return { review: true, qty: qty, motor: op === 'Motorized' };
  if (!base) return null;
  var srFee = (op === 'SmartRelease™') ? 86 : 0;                 // book May 2026: SmartRelease $86
  if (shadeType === 'Dual Shade') base = base * 2 + 70;          // book: price as 2 shades + $70 dual surcharge
  var unitPrice;
  if (_solCoupledActive) {
    if (_solCoupledSameSize) {
      unitPrice = (base + srFee) * _solCoupledCount + 113 * (_solCoupledCount - 1);
    } else {
      var tally = 0;
      for (var ci2 = 1; ci2 <= _solCoupledCount; ci2++) {
        var pw = parseFloat((document.getElementById('coupled-w-'+ci2)||{}).value) || 0;
        var ph = parseFloat((document.getElementById('coupled-h-'+ci2)||{}).value) || 0;
        if (!pw || !ph) return null;
        var pcell = _solGridLookup(gKey, pw, ph);
        if (pcell === null) return { review: true, qty: qty, motor: op === 'Motorized' };
        tally += pcell + srFee;
      }
      unitPrice = tally + 113 * (_solCoupledCount - 1);
    }
  } else {
    unitPrice = base + srFee;
  }
  // Headrail add-on surcharges (book May 2026): LightGuard 360™ $364 flat; fascia/valance by width.
  // Added once per shade unit / common headrail. Folded into the price, NOT itemized — owner rule
  // hides this detail from customers (only motor/remote/charger/hub/TDBU/D&N/trim show a surcharge).
  var lgEl = document.getElementById('sol-addon-lightguard');
  if (lgEl && lgEl.classList.contains('sel')) unitPrice += 364;
  var fasEl = document.getElementById('sol-addon-fascia');
  if (fasEl && fasEl.classList.contains('sel')) unitPrice += _solFasciaSurcharge(w);
  var totalPrice = unitPrice * qty;
  return { unit: unitPrice, total: totalPrice, qty: qty, motor: op === 'Motorized' };
}

function updateSummary() {
  const light     = getOpt('grp-light');
  const op        = getOpt('grp-op');
  const mount     = getOpt('grp-mount');
  const shadeType = getOpt('grp-shade-type') || 'Standard';
  const w         = document.getElementById('inp-width').value;
  const h         = document.getElementById('inp-height').value;
  const qty       = document.getElementById('inp-qty').value || 1;
  const fabric    = getSelectedFabricColor();

  var isDual = shadeType === 'Dual Shade';
  var dualFront = isDual ? getOpt('grp-dual-front') : '';
  var dualBack = isDual ? getOpt('grp-dual-back') : '';
  var lightDisplay = isDual
    ? 'Front: ' + (dualFront || '—') + ' / Back: ' + (dualBack || '—')
    : light;
  document.getElementById('s-light').textContent      = lightDisplay;
  document.getElementById('s-op').textContent         = op;
  document.getElementById('s-mount').textContent      = mount;
  document.getElementById('s-shade-type').textContent = shadeType;
  document.getElementById('s-qty').textContent        = qty;
  document.getElementById('s-size').textContent       = (w && h) ? `${w}″ W × ${h}″ H` : '—';

  var motorSub = document.getElementById('motor-sub');
  var motorOn = motorSub && motorSub.classList.contains('show');

  // Motor summary comes from the shared Norman motor section (nmGetMotorSummary in shared.js)
  var motorRow = document.getElementById('s-motor-row');
  var motorBrandEl = document.getElementById('s-motor-brand');
  if (motorRow && motorBrandEl) {
    var mSum = (motorOn && typeof nmGetMotorSummary === 'function') ? nmGetMotorSummary() : null;
    motorRow.style.display = mSum ? '' : 'none';
    if (mSum) motorBrandEl.textContent = mSum;
  }

  const fabricRow = document.getElementById('s-fabric-row');
  if (fabricRow) {
    fabricRow.style.display = fabric ? '' : 'none';
    const fabricEl = document.getElementById('s-fabric');
    if (fabricEl) fabricEl.textContent = fabric || '—';
  }

  const addons = [...document.querySelectorAll('#grp-addons .opt-btn.sel')].map(b => b.textContent.trim());
  const hwColor = getOpt('grp-hw-color');
  const fasciaStyle = getOpt('grp-fascia-style');
  var addonParts = addons.slice();
  if (hwColor) addonParts.push('Premium HW: ' + hwColor);
  if (fasciaStyle) addonParts.push(fasciaStyle);
  document.getElementById('s-addons').textContent = addonParts.length ? addonParts.join(', ') : 'None';

  var coupledRow = document.getElementById('s-coupled-row');
  var coupledEl  = document.getElementById('s-coupled');
  if (coupledRow && coupledEl) {
    var cSum = solGetCoupledSummary();
    coupledRow.style.display = cSum ? '' : 'none';
    if (cSum) coupledEl.textContent = cSum;
  }

  var priceResult = _solEstimatePrice();
  var priceRow = document.getElementById('s-price-row');
  var priceEl2 = document.getElementById('s-price');
  if (priceRow && priceEl2) {
    if (priceResult && priceResult.review) {
      priceEl2.textContent = 'Size exceeds our standard price chart (max 120″W × 144″H) — we’ll prepare a manual quote.';
      priceRow.style.display = '';
    } else if (priceResult) {
      // Norman retail → 25% off → your price (35% applies to all Norman products; not to shipping).
      var _solRetail = priceResult.total;
      var _solYour   = Math.round(_solRetail * 0.75);
      var pTxt = '$' + _solRetail.toLocaleString() + ' retail → $' + _solYour.toLocaleString() + ' your price (25% off)';
      if (priceResult.qty > 1 && !_solCoupledActive) pTxt += ' · ' + priceResult.qty + ' × $' + Math.round(priceResult.unit * 0.75).toLocaleString();
      if (priceResult.motor) pTxt += ' + motor est.';
      priceEl2.textContent = pTxt;
      priceRow.style.display = '';
    } else {
      priceRow.style.display = 'none';
    }
  }
}

function submitQuote() {
  const name  = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  const light     = getOpt('grp-light') || '—';
  const op        = getOpt('grp-op') || '—';
  const mount     = getOpt('grp-mount') || '—';
  const shadeType = getOpt('grp-shade-type') || 'Standard';
  const w         = document.getElementById('inp-width').value || '—';
  const h         = document.getElementById('inp-height').value || '—';
  const qty       = document.getElementById('inp-qty').value || 1;
  const email     = document.getElementById('cf-email').value.trim();
  const notes     = document.getElementById('cf-notes').value.trim();
  const motorSub  = document.getElementById('motor-sub');
  const motorOn   = motorSub && motorSub.classList.contains('show');
  // Motor details come from the shared Norman motor section (nmGetMotorSummary in shared.js)
  const motorSummary = (motorOn && typeof nmGetMotorSummary === 'function') ? nmGetMotorSummary() : '';
  const addons    = [...document.querySelectorAll('#grp-addons .opt-btn.sel')].map(b => b.textContent.trim());
  const hwColor   = getOpt('grp-hw-color');
  const fasciaStyle = getOpt('grp-fascia-style');
  if (hwColor) addons.push('Premium hardware: ' + hwColor);
  if (fasciaStyle) addons.push('Fascia style: ' + fasciaStyle);
  const fabricColor = getSelectedFabricColor();
  const deliveryLabel = 'Ship to me — UPS / FedEx (freight TBD)';

  const isDualSubmit = shadeType === 'Dual Shade';
  const dualFrontSubmit = isDualSubmit ? getOpt('grp-dual-front') : '';
  const dualBackSubmit = isDualSubmit ? getOpt('grp-dual-back') : '';
  const fabricTypeLabel = isDualSubmit
    ? 'Dual shade — front: ' + (dualFrontSubmit || '—') + ' / back: ' + (dualBackSubmit || '—')
    : light;

  const coupledLine = solGetCoupledSummary();
  const priceEst = _solEstimatePrice();
  const priceEstLine = (priceEst && priceEst.review)
    ? 'Size exceeds standard price chart (max 120"W x 144"H) — MANUAL QUOTE REQUIRED'
    : priceEst
    ? 'Est. retail: $' + priceEst.total.toLocaleString() + ' → 25% off → your price: $' + Math.round(priceEst.total * 0.75).toLocaleString() + ' (freight/motor additional, not discounted)' + (priceEst.motor ? ' (motor priced separately)' : '') + (priceEst.qty > 1 && !_solCoupledActive ? ' (' + priceEst.qty + ' × $' + priceEst.unit.toLocaleString() + ')' : '')
    : '';
  const body = [
    '=== PREMIER NORMAN ROLLER SHADE QUOTE REQUEST ===',
    '',
    'PRODUCT: Premier Norman Roller Shades',
    '',
    'CONFIGURATION',
    'Fabric type: ' + fabricTypeLabel,
    (fabricColor && !isDualSubmit ? 'Fabric selection: ' + fabricColor : ''),
    'Shade type: ' + shadeType,
    'Operating system: ' + op,
    'Motorization: ' + (motorOn ? 'Yes' : 'None'),
    (motorSummary ? 'Motor details: ' + motorSummary : ''),
    'Mount type: ' + mount,
    'Width: ' + w + '"',
    'Height: ' + h + '"',
    'Quantity: ' + qty,
    (coupledLine ? 'Coupled shades: ' + coupledLine : ''),
    'Add-ons: ' + (addons.length ? addons.join(', ') : 'None'),
    (priceEstLine ? priceEstLine : ''),
    '',
    'DELIVERY',
    deliveryLabel,
    '',
    'CUSTOMER',
    'Name: ' + name,
    'Phone: ' + phone,
    (email ? 'Email: ' + email : ''),
    (notes ? 'Notes: ' + notes : ''),
    '',
    '=== END QUOTE REQUEST ===',
    'Sent from blindznation.com/pages/soluna-roller-shades.html'
  ].filter(l => l !== undefined && l !== null).join('\n');

  const subj = 'Soluna Roller Quote — ' + w + '"×' + h + '" ' + light + (shadeType !== 'Standard' ? ' ' + shadeType : '') + ' — ' + name;
  window.location.href = 'mailto:blindznation@gmail.com?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);

  document.getElementById('quote-success').classList.add('show');
  document.getElementById('quote-success').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function addSolunaToCart() {
  const light     = getOpt('grp-light') || '—';
  const op        = getOpt('grp-op') || '—';
  const mount     = getOpt('grp-mount') || '—';
  const shadeType = getOpt('grp-shade-type') || 'Standard';
  const w         = document.getElementById('inp-width').value || '—';
  const h         = document.getElementById('inp-height').value || '—';
  const qty       = parseInt(document.getElementById('inp-qty').value) || 1;
  const lines = [
    { label: 'Product',  value: 'Norman Soluna Roller Shade' },
    { label: 'Size',     value: w + '″ × ' + h + '″' },
    { label: 'Type',     value: shadeType },
    { label: 'Fabric',   value: light },
    { label: 'Control',  value: op },
    { label: 'Mount',    value: mount },
    { label: 'Quantity', value: String(qty) }
  ];
  pbAddToCart({ product: 'Norman Soluna Roller Shade', lines: lines, specs: lines.map(function(l){ return l.label+': '+l.value; }).join(' | '), qty: qty });
  pbOpenCart();
}

// Pre-fill from URL params (carry-over from Basic Roller Shades page)
(function() {
  var p = new URLSearchParams(window.location.search);
  var w = p.get('w'), h = p.get('h'), qty = p.get('qty'), mount = p.get('mount'), op = p.get('op'), motor = p.get('motor');
  if (w) { var el = document.getElementById('inp-width'); if (el) el.value = w; }
  if (h) { var el = document.getElementById('inp-height'); if (el) el.value = h; }
  if (qty) { var el = document.getElementById('inp-qty'); if (el) el.value = qty; }
  if (mount) {
    document.querySelectorAll('#grp-mount .opt-btn').forEach(function(b) {
      b.classList.toggle('sel', b.textContent.trim().toLowerCase().startsWith(mount.toLowerCase()));
    });
  }
  if (op) {
    var opMap = { cordless: 'PrecisionLift™ Cordless', loop: 'Manual with chain', smart: 'SmartRelease™', motor: 'Motorized' };
    var target = opMap[op] || op;
    document.querySelectorAll('#grp-op .opt-btn').forEach(function(b) {
      if (b.textContent.trim() === target) b.click();
    });
  }
  if (motor && op === 'motor') {
    // The op click above already rendered the shared Norman motor section; select Rollease brand if requested
    setTimeout(function() {
      if (motor === 'rollease') {
        var brandBtns = document.querySelectorAll('#nm-grp-brand .opt-btn');
        if (brandBtns.length > 1) { brandBtns[1].click(); updateSummary(); }
      }
    }, 100);
  }
  if (w || h || op) updateSummary();
})();
