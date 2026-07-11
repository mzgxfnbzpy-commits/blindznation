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
  f1:[[254,273,291,312,333,351,371,401,429,474,500,526,551,601,652],[274,298,318,345,368,397,422,464,495,547,576,608,639,697,750],[296,318,346,377,414,448,482,526,566,620,655,690,717,774,826],[313,345,382,420,457,497,538,591,628,689,717,749,779,841,903],[336,375,418,462,503,546,592,648,683,737,774,806,841,909,982],[357,406,453,501,549,598,639,696,730,791,828,866,903,982,1055],[383,437,488,544,594,640,677,737,779,842,885,923,968,1048,1130],[409,469,526,582,636,676,719,782,828,895,941,987,1030,1121,1207],[435,500,560,623,670,714,762,828,873,945,995,1042,1092,1188,1286],[462,530,596,649,701,750,802,871,923,997,1050,1103,1155,1255,1362]],
  f2:[[278,299,323,341,367,389,412,446,476,529,558,587,617,672,731],[301,328,353,377,406,440,471,518,549,609,647,679,713,780,843],[325,353,384,420,462,497,537,587,628,692,733,772,803,868,927],[349,383,422,467,509,555,600,659,703,770,803,842,873,944,1017],[370,415,465,513,562,611,661,727,765,829,868,907,944,1023,1103],[396,449,503,561,613,670,714,777,820,887,932,973,1017,1103,1189],[423,486,543,605,667,717,763,829,873,945,994,1042,1091,1181,1276],[454,520,591,650,708,759,809,878,932,1005,1055,1107,1157,1261,1359],[485,558,627,697,748,801,854,932,985,1066,1122,1173,1230,1341,1449],[513,593,668,730,785,842,898,983,1042,1123,1183,1243,1299,1417,1537]],
  f3:[[307,337,365,396,424,454,485,517,552,609,645,680,719,786,856],[337,372,407,443,482,522,563,605,648,715,755,800,841,927,1002],[366,407,449,497,545,594,643,693,745,817,868,918,957,1044,1126],[398,444,498,554,613,671,725,782,839,917,964,1011,1054,1153,1247],[428,487,549,617,677,740,809,869,920,999,1049,1103,1154,1261,1366],[462,530,602,674,745,817,879,940,995,1081,1137,1195,1254,1367,1489],[497,575,656,734,813,879,944,1005,1071,1160,1226,1289,1352,1480,1608],[534,622,707,792,871,940,1011,1079,1148,1242,1314,1382,1451,1592,1731],[572,667,759,846,921,999,1071,1148,1225,1325,1398,1473,1549,1704,1852],[607,708,811,897,976,1054,1138,1219,1301,1407,1485,1569,1647,1812,1974]],
  f4:[[337,371,402,435,468,500,534,569,608,671,711,749,792,865,942],[371,409,448,487,529,574,620,668,713,787,834,879,924,1021,1103],[403,448,495,546,601,651,707,763,820,898,955,1011,1053,1148,1239],[437,488,547,609,674,738,798,863,922,1010,1058,1112,1160,1267,1372],[470,537,605,677,747,814,889,956,1014,1098,1155,1215,1268,1388,1504],[508,582,664,742,820,898,969,1035,1095,1189,1251,1316,1380,1505,1637],[546,634,723,809,895,969,1041,1106,1179,1278,1349,1420,1488,1628,1770],[590,682,778,870,959,1035,1112,1187,1263,1365,1446,1521,1596,1750,1904],[629,733,835,933,1015,1098,1179,1263,1348,1457,1539,1621,1704,1873,2040],[669,779,892,988,1075,1160,1252,1342,1431,1549,1633,1725,1812,1995,2172]],
  s1:[[240,258,278,296,314,331,362,382,406,450,474,507,533,577,628],[259,282,302,325,350,372,412,439,468,519,545,587,614,671,723],[281,302,326,357,390,421,467,497,535,586,618,666,692,745,795],[297,325,359,397,430,468,522,558,595,650,677,721,749,809,870],[318,354,394,434,474,513,573,614,645,697,745,776,809,874,941],[336,383,428,471,518,563,618,656,690,745,797,831,870,941,1015],[361,411,461,511,558,600,659,697,737,795,850,890,932,1007,1088],[387,440,495,546,597,635,697,739,780,844,903,949,990,1078,1160],[408,470,526,582,627,670,737,780,826,894,956,1002,1049,1141,1235],[434,498,561,609,659,703,777,823,872,940,1010,1061,1111,1206,1309]],
  s2:[[261,283,306,325,346,367,406,428,454,503,530,571,600,652,711],[284,309,334,357,384,416,462,495,526,581,617,660,692,761,818],[307,334,361,396,434,468,525,561,600,658,699,748,779,842,898],[328,359,398,439,477,522,587,627,671,733,766,817,846,918,986],[351,390,437,483,527,574,645,693,728,791,842,877,918,992,1069],[372,422,474,526,575,628,699,740,778,843,902,945,986,1069,1153],[399,456,510,571,624,672,745,791,831,902,966,1010,1055,1145,1235],[428,490,551,611,667,711,791,837,887,957,1023,1073,1123,1220,1317],[454,523,591,650,701,749,835,887,936,1014,1086,1139,1190,1297,1400],[483,554,626,684,737,789,877,935,990,1067,1146,1204,1258,1373,1488]],
  s3:[[290,322,346,374,404,430,460,488,522,575,608,655,690,754,822],[322,354,385,419,454,495,533,573,611,673,713,768,805,891,963],[349,385,423,469,515,561,605,651,701,770,815,879,918,1000,1079],[376,420,470,525,577,633,683,738,791,863,905,969,1013,1105,1194],[406,462,519,579,641,699,762,818,868,940,1006,1057,1106,1206,1312],[436,501,570,636,701,770,829,885,938,1017,1090,1146,1200,1313,1426],[469,544,620,693,766,829,890,945,1010,1091,1173,1236,1294,1417,1541],[503,587,668,745,821,885,950,1015,1080,1169,1256,1325,1389,1523,1657],[541,627,714,799,869,940,1010,1080,1152,1246,1341,1413,1482,1628,1772],[574,669,764,844,920,992,1070,1146,1222,1320,1422,1499,1576,1732,1888]]
};
var _SOL_COLL_GROUP = {
  // Solar PG1: higher-openness screents + commercial NA400
  'Serene 7%':'s1','Flow 7%':'s1','Windsong 5%':'s1',
  'NA400 3%':'s1','NA400 5%':'s1','NA400 10%':'s1',
  // Solar PG2: lower-openness screens, Moon, Breeze Screen + NA820
  'Serene 1%':'s2','Serene 3%':'s2','Flow 1%':'s2','Flow 5%':'s2',
  'Windsong 1%':'s2','Moon 5%':'s2','Breeze Screen 1%':'s2','Breeze Screen 3%':'s2',
  'NA820 3%':'s2',
  // Solar PG3: Lakeview, Meadows, Jubilee, Galaxy
  'Lakeview 3%':'s3','Lakeview 7%':'s3','Lakeview 10%':'s3',
  'Meadows 1%':'s3','Meadows 3%':'s3','Jubilee 3%':'s3','Galaxy 3%':'s3',
  // Fabric PG1: Scarlett, Catalina, Brook, Chelsea, Callie, Elements
  'Scarlett':'f1','Catalina (Natural)':'f1','Brook':'f1','Chelsea':'f1',
  'Callie':'f1','Callie RD':'f1','Elements':'f1','Elements White Backing':'f1',
  // Fabric PG2: most sheers/naturals/designer/RD
  'Sheer':'f2','Dazzle':'f2','Lakeshore':'f2',
  'Samoa (Natural)':'f2','Phuket (Natural)':'f2','Bora Bora (Natural)':'f2',
  'Java (Natural)':'f2','Bali (Natural)':'f2','Riviera (Natural)':'f2',
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
  if (!base) return null;
  var srFee = (op === 'SmartRelease™') ? 89 : 0;
  if (shadeType === 'Dual Shade') base = base * 2 + 73;
  var unitPrice, totalPrice;
  if (_solCoupledActive) {
    if (_solCoupledSameSize) {
      unitPrice = (base + srFee) * _solCoupledCount + 117 * (_solCoupledCount - 1);
    } else {
      var tally = 0;
      for (var ci2 = 1; ci2 <= _solCoupledCount; ci2++) {
        var pw = parseFloat((document.getElementById('coupled-w-'+ci2)||{}).value) || 0;
        var ph = parseFloat((document.getElementById('coupled-h-'+ci2)||{}).value) || 0;
        if (!pw || !ph) return null;
        tally += _solGridLookup(gKey, pw, ph) + srFee;
      }
      unitPrice = tally + 117 * (_solCoupledCount - 1);
    }
    totalPrice = unitPrice * qty;
  } else {
    unitPrice  = base + srFee;
    totalPrice = unitPrice * qty;
  }
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
    if (priceResult) {
      var pTxt = '$' + priceResult.total.toLocaleString();
      if (priceResult.qty > 1 && !_solCoupledActive) pTxt += ' (' + priceResult.qty + ' × $' + priceResult.unit.toLocaleString() + ')';
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
  const priceEstLine = priceEst
    ? 'Est. retail: $' + priceEst.total.toLocaleString() + (priceEst.motor ? ' (motor priced separately)' : '') + (priceEst.qty > 1 && !_solCoupledActive ? ' (' + priceEst.qty + ' × $' + priceEst.unit.toLocaleString() + ')' : '')
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
