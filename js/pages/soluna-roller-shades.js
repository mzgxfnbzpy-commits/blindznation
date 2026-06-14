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
    html += '<div class="form-group"><label>Height</label><input type="number" id="coupled-h-' + i + '" min="12" max="132" step="0.5" placeholder="72" oninput="updateSummary()" style="width:100%"></div>';
    html += '</div></div>';
  }
  container.innerHTML = html;
}

var _SOL_OP_DESC = {
  cordless: '<strong style="color:#1a6b1a">⭐ PrecisionLift™ Cordless — Recommended</strong> — Pull the handle down to lower, push the hem bar up to raise. No cords, no chains. Norman\'s best-in-class cordless system. WCMA Best for Kids™ certified. Max 120″ W × 132″ H.',
  loop:     '<strong style="color:#333">Continuous Cord Loop</strong> — Side-mounted bead chain operates the shade smoothly in both directions. Works for any window size. Best choice for large, heavy, or high windows. Max 144″ W × 132″ H.',
  smartrelease: '<strong style="color:#333">SmartRelease™</strong> — Norman\'s patent-pending upgrade to the cord loop. A gentle tug releases the shade from any raised position — no reaching up required. Ideal for high or hard-to-reach windows. Raceway always included. Max 144″ W × 132″ H.',
  motor:    '<strong style="color:#333">Motorized</strong> — Battery or hardwired motor inside the roller tube. Control by app, remote, voice (Alexa/Google/HomeKit), or schedule. 100% cord-free. Available with Norman Smart or Rollease Acmeda Automate. Max 144″ W × 132″ H.'
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
    {name:'Galaxy 3%', colors:[{n:'Soft White',c:'F1728'},{n:'Ash',c:'F1731'},{n:'Black',c:'F1727'}]}
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

function solPickDel(v, card) {
  solDelivery = v;
  document.querySelectorAll('.delivery-opt-card').forEach(function(c){c.classList.remove('sel');});
  card.classList.add('sel');
}

function toggleMotor(on) {
  document.getElementById('motor-sub').classList.toggle('show', on);
  document.getElementById('s-motor-row').style.display = on ? 'flex' : 'none';
  updateSummary();
}

function adjustQty(d) {
  const el = document.getElementById('inp-qty');
  el.value = Math.min(20, Math.max(1, (parseInt(el.value) || 1) + d));
  updateSummary();
}

function updateSummary() {
  const light     = getOpt('grp-light');
  const op        = getOpt('grp-op');
  const mount     = getOpt('grp-mount');
  const shadeType = getOpt('grp-shade-type') || 'Standard';
  const w         = document.getElementById('inp-width').value;
  const h         = document.getElementById('inp-height').value;
  const qty       = document.getElementById('inp-qty').value || 1;
  const mBrand    = document.getElementById('sel-motor').value;
  const fabric    = getSelectedFabricColor();

  document.getElementById('s-light').textContent      = light;
  document.getElementById('s-op').textContent         = op;
  document.getElementById('s-mount').textContent      = mount;
  document.getElementById('s-shade-type').textContent = shadeType;
  document.getElementById('s-qty').textContent        = qty;
  document.getElementById('s-size').textContent       = (w && h) ? `${w}″ W × ${h}″ H` : '—';

  if (mBrand) {
    document.getElementById('s-motor-brand').textContent = mBrand;
  }

  const fabricRow = document.getElementById('s-fabric-row');
  if (fabricRow) {
    fabricRow.style.display = fabric ? '' : 'none';
    const fabricEl = document.getElementById('s-fabric');
    if (fabricEl) fabricEl.textContent = fabric || '—';
  }

  const addons = [...document.querySelectorAll('#grp-addons .opt-btn.sel')].map(b => b.textContent.trim());
  document.getElementById('s-addons').textContent = addons.length ? addons.join(', ') : 'None';

  var coupledRow = document.getElementById('s-coupled-row');
  var coupledEl  = document.getElementById('s-coupled');
  if (coupledRow && coupledEl) {
    var cSum = solGetCoupledSummary();
    coupledRow.style.display = cSum ? '' : 'none';
    if (cSum) coupledEl.textContent = cSum;
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
  const motorVal  = motorOn ? (document.getElementById('sel-motor').value || '—') : 'None';
  const addons    = [...document.querySelectorAll('#grp-addons .opt-btn.sel')].map(b => b.textContent.trim());
  const fabricColor = getSelectedFabricColor();
  const deliveryLabel = solDelivery === 'pickup'
    ? "I'll pick up (Huntingdon Valley, PA 19006 — address confirmed after order)"
    : 'Ship to me — UPS / FedEx from Huntingdon Valley, PA (freight TBD)';

  const coupledLine = solGetCoupledSummary();
  const body = [
    '=== PREMIER NORMAN ROLLER SHADE QUOTE REQUEST ===',
    '',
    'PRODUCT: Premier Norman Roller Shades',
    '',
    'CONFIGURATION',
    'Fabric type: ' + light,
    (fabricColor ? 'Fabric selection: ' + fabricColor : ''),
    'Shade type: ' + shadeType,
    'Operating system: ' + op,
    'Motorization: ' + motorVal,
    'Mount type: ' + mount,
    'Width: ' + w + '"',
    'Height: ' + h + '"',
    'Quantity: ' + qty,
    (coupledLine ? 'Coupled shades: ' + coupledLine : ''),
    'Add-ons: ' + (addons.length ? addons.join(', ') : 'None'),
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
  window.location.href = 'mailto:justin@blindznation.com?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);

  document.getElementById('quote-success').classList.add('show');
  document.getElementById('quote-success').scrollIntoView({ behavior: 'smooth', block: 'start' });
}
