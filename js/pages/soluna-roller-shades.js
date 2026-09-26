// Norman Soluna roller shades — configurator page.
//
// Every price on this page comes from SolunaEngine.quote() (js/pages/soluna-engine.js),
// which reads SOLUNA_DATA (js/pages/soluna-data.js). Both are generated from / ported
// out of the Soluna pricing handoff, Sept 2026 book. This file only turns the form into
// an order for the engine and shows the answer — do not put prices in here.
//
// Customer sees: retail → 25% Norman discount → your price, then motorization and
// shipping (never discounted) as their own lines. The itemised build-up (raceway, hem
// bar, fascia row…) stays inside the engine — owner rule, only motor-type surcharges
// are shown to the customer.

var solDelivery = 'ship';
var _solCoupledActive = false;
var _solCoupledCount = 2;
var _solCoupledSameSize = true;

var SOL = {
  dual: false,
  top: 'race',
  cat: { main: 'lf', lite: 'lf' },
  sel: { main: null, bo: null, lite: null }     // { collection, code, name }
};

var _SOL_CAT_OPACITY = {
  solar: 'Solar Screen', lf: 'Light Filtering', sheer: 'Sheer', natural: 'Natural Woven', rd: 'Room Darkening'
};
// Collections that carry a note in the picker (not a price effect).
var _SOL_FABRIC_NOTE = {
  'Breeze': 'Linen backing', 'Breeze RD': 'Linen backing', 'Breeze Screen 1%': 'Linen backing',
  'Breeze Screen 3%': 'Linen backing', 'Scarlett': 'Linen backing', 'Summerland': 'Linen backing',
  'Maui (Natural)': 'Max 120″ tall'
};
var _SOL_MAUI_MAX_H = 120;

// Colour lists (handoff section 06). None of them move the price.
var _SOL_COLORS = {
  fasciaMetal: ['White', 'Cottage White', 'Black', 'Bianca', 'Anodized Silver'],
  endCaps:     ['Match my shade', 'White', 'Cottage White', 'Nature', 'Terra', 'Sahara', 'Chocolate', 'Silver', 'Black', 'Bianca'],
  housing:     ['White', 'Bianca', 'Cottage White', 'Black', '3129 Silver', 'Bronze']
};
var _SOL_SWATCH = {
  'Bianca': '#fbfaf6', 'Nature': '#d8c7a6', 'Terra': '#a9714e', 'Sahara': '#cdb48a', '3129 Silver': 'linear-gradient(135deg,#dcdcdc,#a4a4a4)'
};

// ─── Small helpers ────────────────────────────────────────────
function _solEsc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
function _solVal(id) { var el = document.getElementById(id); return el ? el.value : ''; }
function _solSelBtn(groupId) { return document.querySelector('#' + groupId + ' .opt-btn.sel'); }
function _solData(groupId, attr) { var b = _solSelBtn(groupId); return b ? b.getAttribute(attr || 'data-v') : null; }
function _solVisible(id) { var el = document.getElementById(id); return !!el && el.style.display !== 'none'; }
function _solShow(id, on) { var el = document.getElementById(id); if (el) el.style.display = on ? '' : 'none'; }
function _solMoney(n) {
  var cents = Math.round(n * 100) % 100 !== 0;
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: cents ? 2 : 0, maximumFractionDigits: 2 });
}
function _solInch(v) { return String(v).replace('3.5', '3½').replace('4.5', '4½') + '″'; }
// Quantity: always a whole number 1–20, whatever was typed or pre-filled. Everything
// (engine, summary, email, cart) reads it through here so they can't disagree.
function _solQty() {
  var q = Math.round(parseFloat(_solVal('inp-qty')));
  return !(q >= 1) ? 1 : q > 20 ? 20 : q;
}
function solFixQty() { var el = document.getElementById('inp-qty'); if (el) el.value = _solQty(); updateSummary(); }
// Size text for the summary / email / cart. Coupled shades of different sizes carry
// their own sizes, so the main width × height boxes don't apply.
function _solSizeText(unit) {
  if (_solCoupledActive && !_solCoupledSameSize) return 'see coupled shades';
  var w = _solVal('inp-width'), h = _solVal('inp-height');
  return (w && h) ? w + unit + ' W × ' + h + unit + ' H' : '—';
}

// A row of colour pills. selIdx -1 = nothing chosen yet.
function _solPills(groupId, list, selIdx, withSwatch) {
  var el = document.getElementById(groupId);
  if (!el) return;
  el.innerHTML = list.map(function (name, i) {
    var sw = withSwatch && name !== 'Match my shade'
      ? '<span class="hw-sw" style="background:' + (_SOL_SWATCH[name] || (window.PB_SWATCH && PB_SWATCH[name]) || '#ccc') + '"></span>' : '';
    return '<button class="opt-btn' + (i === selIdx ? ' sel' : '') + '" onclick="selOpt(this,\'' + groupId + '\');updateSummary()">' + sw + _solEsc(name) + '</button>';
  }).join('');
}

// ─── Coupled shades ───────────────────────────────────────────
function solToggleCoupled() {
  if (SOL.dual && !_solCoupledActive) return;          // a dual is one bracket — never coupled
  _solCoupledActive = !_solCoupledActive;
  var btn = document.getElementById('coupled-toggle-btn');
  if (btn) btn.classList.toggle('sel', _solCoupledActive);
  _solShow('coupled-wrap', _solCoupledActive);
  if (_solCoupledActive) {
    solRenderCoupledFields(_solCoupledCount);
    solCheckCoupledOpWarn();
  }
  updateSummary();
}

function solCheckCoupledOpWarn() {
  var op = getOpt('grp-op') || '';
  var blocked = (op === 'PrecisionLift™ Cordless' || op === 'SmartRelease™');
  _solShow('coupled-op-warn', _solCoupledActive && blocked);
}

// Both modes have their own "2 / 3 / 4 shades" row but share one count — keep the
// visible row's highlight on the count that is actually priced.
function _solSyncCoupledPills() {
  ['grp-coupled-count', 'grp-coupled-diff-count'].forEach(function (g) {
    document.querySelectorAll('#' + g + ' .opt-btn').forEach(function (b) {
      b.classList.toggle('sel', parseInt(b.textContent, 10) === _solCoupledCount);
    });
  });
}

function solShowCoupledSame() {
  _solCoupledSameSize = true;
  _solShow('coupled-same-wrap', true);
  _solShow('coupled-diff-wrap', false);
  _solSyncCoupledPills();
}

function solShowCoupledDiff() {
  _solCoupledSameSize = false;
  _solShow('coupled-same-wrap', false);
  _solShow('coupled-diff-wrap', true);
  solRenderCoupledFields(_solCoupledCount);
  _solSyncCoupledPills();
}

function solSetCoupledCount(n) { _solCoupledCount = n; }

function solRenderCoupledFields(n) {
  _solCoupledCount = n;
  var container = document.getElementById('coupled-dim-fields');
  if (!container) return;
  var html = '';
  for (var i = 1; i <= n; i++) {
    html += '<div style="margin-bottom:8px;padding:10px 12px;background:#fff;border:1px solid #e8e8e4;border-radius:8px">';
    html += '<div style="font-size:11px;font-weight:600;color:#555;margin-bottom:7px">Shade ' + i + ' — from left</div>';
    html += '<div class="form-row">';
    html += '<div class="form-group"><label>Width</label><input type="number" id="coupled-w-' + i + '" min="12" max="118" step="0.125" placeholder="36" oninput="updateSummary()" style="width:100%"></div>';
    html += '<div class="form-group"><label>Height</label><input type="number" id="coupled-h-' + i + '" min="12" max="144" step="0.125" placeholder="72" oninput="updateSummary()" style="width:100%"></div>';
    html += '</div></div>';
  }
  container.innerHTML = html;
}

function solGetCoupledSummary() {
  if (!_solCoupledActive) return null;
  if (_solCoupledSameSize) return _solCoupledCount + ' shades — same size (see dimensions above)';
  var parts = [];
  for (var i = 1; i <= _solCoupledCount; i++) {
    parts.push('Shade ' + i + ': ' + (_solVal('coupled-w-' + i) || '?') + '″W × ' + (_solVal('coupled-h-' + i) || '?') + '″H');
  }
  return _solCoupledCount + ' shades — ' + parts.join(' | ');
}

// ─── Operating system ─────────────────────────────────────────
var _SOL_OP_DESC = {
  cordless: '<strong style="color:#1a6b1a">⭐ PrecisionLift™ Cordless — Recommended</strong> — Pull the handle down to lower, push the hem bar up to raise. No cords, no chains. Norman\'s best-in-class cordless system. WCMA Best for Kids™ certified. Up to 118″ wide; shades up to 20″ wide go to 72″ long, up to 24″ wide to 96″ long, wider to 144″.',
  loop:     '<strong style="color:#333">Manual with chain</strong> — Side-mounted bead chain operates the shade smoothly in both directions. Works for any window size. Best choice for large, heavy, or high windows. Max 118″ W × 144″ H.',
  smartrelease: '<strong style="color:#333">SmartRelease™</strong> — Norman\'s patent-pending upgrade to the cord loop. A gentle tug releases the shade from any raised position — no reaching up required. Ideal for high or hard-to-reach windows. Max 118″ W × 144″ H.',
  motor:    '<strong style="color:#333">Motorized</strong> — Battery or hardwired motor inside the roller tube. Control by app, remote, voice (Alexa/Google/HomeKit), or schedule. 100% cord-free. Available with Norman Smart or Rollease Acmeda Automate.'
};

function solShowOpDesc(key) {
  var box = document.getElementById('op-desc-box');
  if (!box) return;
  box.style.background = key === 'cordless' ? '#edf7ed' : '#f5f2ed';
  box.style.borderLeftColor = key === 'cordless' ? '#2e7d32' : 'var(--gold)';
  box.innerHTML = _SOL_OP_DESC[key] || '';
}

function toggleMotor(on) {
  document.getElementById('motor-sub').classList.toggle('show', on);
  var motorRow = document.getElementById('s-motor-row');
  if (motorRow) motorRow.style.display = on ? 'flex' : 'none';
  var cfg = document.getElementById('sol-motor-config');
  if (on) {
    // Render the shared Norman motor UI (Soluna is a roller → Rollease + Charging Wand allowed)
    if (typeof normanMotorSection === 'function') normanMotorSection('sol-motor-config', 'Soluna Roller Shade', updateSummary);
  } else if (cfg) {
    cfg.innerHTML = '';
  }
  updateSummary();
}

function adjustQty(d) {
  var el = document.getElementById('inp-qty');
  el.value = Math.min(20, Math.max(1, (parseInt(el.value) || 1) + d));
  updateSummary();
}

// ─── Fabric pickers ───────────────────────────────────────────
// Three slots: 'main' (standard shade), 'bo' (dual — blackout layer), 'lite' (dual —
// light layer). Collections and colours come straight from SOLUNA_DATA, so the picker
// can never offer a colour the engine can't price.
function _solSlotOpacity(slot) { return slot === 'bo' ? 'Room Darkening' : _SOL_CAT_OPACITY[SOL.cat[slot]]; }

function solRenderFabric(slot) {
  var inner = document.getElementById('sol-fab-' + slot);
  if (!inner || !window.SOLUNA_DATA) return;
  var opacity = _solSlotOpacity(slot);
  var cur = SOL.sel[slot];
  var html = '';
  SOLUNA_DATA.collections.forEach(function (c) {
    if (c.opacity !== opacity) return;
    var notes = [];
    if (_SOL_FABRIC_NOTE[c.collection]) notes.push(_SOL_FABRIC_NOTE[c.collection]);
    var fw = SolunaEngine.fabricWidth(c);
    if (fw < 118) notes.push('max ' + fw + '″ wide');
    html += '<div class="sol-fab-coll">' + _solEsc(c.collection) + (notes.length ? '<em>⚠ ' + _solEsc(notes.join(' · ')) + '</em>' : '') + '</div>';
    html += '<div style="display:flex;flex-wrap:wrap;gap:4px">';
    c.colors.forEach(function (col) {
      var on = cur && cur.code === col.code && cur.collection === c.collection;
      var tip = col.code + (col.fabricWidthOverride ? ' · max ' + parseFloat(col.fabricWidthOverride) + '″ wide' : '');
      html += '<button class="opt-btn' + (on ? ' sel' : '') + '" title="' + _solEsc(tip) + '" data-coll="' + _solEsc(c.collection) +
              '" data-code="' + col.code + '" data-name="' + _solEsc(col.name) + '" onclick="solPickColor(\'' + slot + '\',this)">' + _solEsc(col.name) + '</button>';
    });
    html += '</div>';
  });
  inner.innerHTML = html;
}

function solPickColor(slot, btn) {
  document.querySelectorAll('#sol-fab-' + slot + ' .opt-btn').forEach(function (b) { b.classList.remove('sel'); });
  btn.classList.add('sel');
  SOL.sel[slot] = { collection: btn.getAttribute('data-coll'), code: btn.getAttribute('data-code'), name: btn.getAttribute('data-name') };
  updateSummary();
}

function solPickCategory(slot, btn) {
  selOpt(btn, slot === 'main' ? 'grp-light' : 'grp-lite-cat');
  SOL.cat[slot] = btn.getAttribute('data-cat');
  var cur = SOL.sel[slot];
  if (cur && SolunaEngine.byCollection[cur.collection].opacity !== _solSlotOpacity(slot)) SOL.sel[slot] = null;
  solRenderFabric(slot);
  updateSummary();
}

function _solFabricLabel(s) { return s ? s.collection + ' — ' + s.name + ' (' + s.code + ')' : '—'; }

// ─── Shade type ───────────────────────────────────────────────
// Wrap-fabric choices for a fabric-wrapped fascia. A standard shade defaults to its own
// fabric; a dual has two, and the handoff says its valance fabric must be chosen — no default.
function _solRenderWrapChoices() {
  var el = document.getElementById('grp-fascia-fabric');
  if (!el) return;
  var list = SOL.dual
    ? ['Blackout layer fabric', 'Light layer fabric', 'A different fabric (I\'ll say which in the notes)']
    : ['Same as my shade', 'A different fabric (I\'ll say which in the notes)'];
  _solPills('grp-fascia-fabric', list, SOL.dual ? -1 : 0, false);
}

function solPickShadeType(type, btn) {
  var wasDual = SOL.dual;
  selOpt(btn, 'grp-shade-type');
  SOL.dual = type === 'dual';
  // Going to Dual forces the square 8″ fabric valance; remember what the customer had so
  // going back to Standard restores it instead of silently keeping the forced valance.
  if (SOL.dual && !wasDual) {
    SOL.beforeDual = { top: SOL.top, shape: _solData('grp-fascia-shape'), mat: _solData('grp-fascia-mat'), size: _solData('grp-fascia-size') };
  }
  if (SOL.dual !== wasDual) _solRenderWrapChoices();
  if (!SOL.dual && wasDual && SOL.beforeDual) {
    var bd = SOL.beforeDual; SOL.beforeDual = null;
    document.querySelectorAll('#grp-top .opt-btn').forEach(function (b) { b.classList.remove('blocked'); });
    [['grp-fascia-shape', bd.shape], ['grp-fascia-mat', bd.mat], ['grp-fascia-size', bd.size]].forEach(function (p) {
      var b = p[1] && document.querySelector('#' + p[0] + ' [data-v="' + p[1] + '"]');
      if (b) selOpt(b, p[0]);
    });
    solPickTop(bd.top, document.querySelector('#grp-top [data-top="' + bd.top + '"]'), true);
  }
  _solShow('sol-single-fabric', !SOL.dual);
  _solShow('sol-dual-fabric', SOL.dual);
  _solShow('sol-dual-note', SOL.dual);
  var t = document.getElementById('sol-fabric-title');
  if (t) t.textContent = SOL.dual ? 'Fabrics — blackout layer + light layer' : 'Fabric';
  if (SOL.dual && _solCoupledActive) solToggleCoupled();
  _solShow('coupled-toggle-btn', !SOL.dual);
  // A dual is forced to the square 8″ fabric-wrapped valance — the only top Norman builds on one.
  document.querySelectorAll('#grp-top .opt-btn').forEach(function (b) {
    b.classList.toggle('blocked', SOL.dual && b.getAttribute('data-top') !== 'fascia');
  });
  if (SOL.dual) solPickTop('fascia', document.querySelector('#grp-top [data-top="fascia"]'), true);
  solSyncFascia();
  updateSummary();
}

// ─── Top of the shade ─────────────────────────────────────────
var _SOL_TOP_NOTE = {
  race:     'Mounting rail only is the standard: a clean rail the shade hangs from, with the roll visible.',
  fascia:   'A fascia covers the roll. It mounts on the rail, which is included.',
  wood:     'A Modern Wood Valance covers the roll. It mounts on the rail, which is included.',
  cassette: 'The cassette encloses the roll and replaces the rail.',
  lg360:    'Full Blackout Side Channels: fully enclosed, 4-sided blackout.',
  none:     'Open roll: the roll is exposed and there is no mounting rail.'
};

function solPickTop(id, btn, force) {
  if (SOL.dual && id !== 'fascia' && !force) return;
  if (btn) selOpt(btn, 'grp-top');
  SOL.top = id;
  ['fascia', 'wood', 'cassette', 'lg360', 'none'].forEach(function (k) { _solShow('sol-top-' + k, k === id); });
  var note = document.getElementById('sol-top-note');
  if (note) note.textContent = SOL.dual ? 'A Dual Shade always takes the square 8″ fabric-wrapped valance.' : (_SOL_TOP_NOTE[id] || '');
  _solShow('sol-shim-wrap', id !== 'cassette' && id !== 'lg360');
  if (id === 'cassette' || id === 'lg360') { var s0 = document.querySelector('#grp-shims [data-v="0"]'); if (s0) selOpt(s0, 'grp-shims'); }
  solSyncDoor();
  solSyncCovers();
  updateSummary();
}

// Shape + material decide which sizes exist; material + size decide the price.
function solSyncFascia() {
  var shapeRow = document.getElementById('grp-fascia-shape');
  if (!shapeRow || !window.SOLUNA_DATA) return;
  if (SOL.dual) {
    ['grp-fascia-shape', 'grp-fascia-mat', 'grp-fascia-size'].forEach(function (g, i) {
      var want = ['square', 'fabric', '8'][i];
      document.querySelectorAll('#' + g + ' .opt-btn').forEach(function (b) {
        var on = b.getAttribute('data-v') === want;
        b.classList.toggle('sel', on);
        b.classList.toggle('blocked', !on);
      });
    });
  } else {
    document.querySelectorAll('#grp-fascia-shape .opt-btn, #grp-fascia-mat .opt-btn').forEach(function (b) { b.classList.remove('blocked'); });
    var shape = _solData('grp-fascia-shape') || 'curved', mat = _solData('grp-fascia-mat') || 'metal';
    var ok = SOLUNA_DATA.sizes.byShapeMaterial[shape][mat].map(String);
    var cur = _solData('grp-fascia-size');
    document.querySelectorAll('#grp-fascia-size .opt-btn').forEach(function (b) {
      b.classList.toggle('blocked', ok.indexOf(b.getAttribute('data-v')) === -1);
    });
    if (ok.indexOf(cur) === -1) {
      var fallback = document.querySelector('#grp-fascia-size [data-v="' + (ok.indexOf('4.5') !== -1 ? '4.5' : ok[ok.length - 1]) + '"]');
      if (fallback) selOpt(fallback, 'grp-fascia-size');
    }
  }
  var fabric = (_solData('grp-fascia-mat') || 'metal') === 'fabric';
  _solShow('sol-fascia-metal-wrap', !fabric);
  _solShow('sol-fascia-fabric-wrap', fabric);
}

// Size pills that are blocked can't be chosen.
document.addEventListener('click', function (e) {
  var b = e.target.closest && e.target.closest('.opt-btn.blocked');
  if (b) { e.stopPropagation(); e.preventDefault(); }
}, true);

function solSyncCovers() {
  _solShow('sol-cassette-color-wrap', /metal/i.test(getOpt('grp-cassette-mat') || ''));
  _solShow('sol-lg-cassette-color-wrap', /metal/i.test(getOpt('grp-lg-cassette-mat') || ''));
}

function solSyncPremium() {
  _solShow('sol-hw-subopts', /premium/i.test(getOpt('grp-premium') || ''));
}

function solPickHemBar(material, btn) {
  selOpt(btn, 'grp-hembar-mat');
  _solShow('sol-hembar-color-wrap', material === 'metal');
  updateSummary();
}

// Door: the magnetic hold down is offered (pre-ticked). LightGuard 360 takes none.
function _solIsDoor() { return /yes/i.test(getOpt('grp-door') || ''); }
function solSyncDoor() {
  var door = _solIsDoor();
  _solShow('sol-door-wrap', door);
  var lg = SOL.top === 'lg360';
  _solShow('grp-mag', !lg);
  var note = document.getElementById('sol-door-note');
  if (note) note.textContent = lg
    ? 'Full Blackout Side Channels on a door: must be outside mount, and takes no hold down.'
    : 'Keeps the bottom of the shade from swinging when the door opens and closes.';
}

// ─── Build the order for the engine ───────────────────────────
function _solSizes() {
  var w = parseFloat(_solVal('inp-width')) || 0, h = parseFloat(_solVal('inp-height')) || 0;
  if (!_solCoupledActive) return [{ w: w, h: h }];
  var out = [];
  for (var i = 1; i <= _solCoupledCount; i++) {
    if (_solCoupledSameSize) out.push({ w: w, h: h });
    else out.push({ w: parseFloat(_solVal('coupled-w-' + i)) || 0, h: parseFloat(_solVal('coupled-h-' + i)) || 0 });
  }
  return out;
}

// Returns { order, need } — `need` lists what is still missing before we can price.
function solBuildOrder() {
  var need = [];
  var sizes = _solSizes();
  if (sizes.some(function (s) { return !(s.w > 0 && s.h > 0); })) need.push(_solCoupledActive && !_solCoupledSameSize ? 'each shade\'s width and height' : 'width and height');
  var shades;
  if (SOL.dual) {
    if (!SOL.sel.bo) need.push('a blackout-layer fabric');
    if (!SOL.sel.lite) need.push('a light-layer fabric');
    var lite = SOL.sel.lite, bo = SOL.sel.bo;
    var boFront = /blackout in front/i.test(getOpt('grp-dual-front') || '');
    shades = (lite && bo) ? (boFront ? [bo, lite] : [lite, bo]).map(function (s) { return { collection: s.collection, code: s.code }; }) : [];
  } else {
    if (!SOL.sel.main) need.push('a fabric color');
    shades = SOL.sel.main ? sizes.map(function (s) {
      return { collection: SOL.sel.main.collection, code: SOL.sel.main.code, width: s.w, height: s.h };
    }) : [];
  }
  var op = getOpt('grp-op') || '';
  var addons = {};
  if (op === 'SmartRelease™') addons.sr = 1;
  document.querySelectorAll('#grp-extras .opt-btn.sel').forEach(function (b) { addons[b.getAttribute('data-add')] = 1; });
  var shims = parseInt(_solData('grp-shims'), 10) || 0;
  if (shims && _solVisible('sol-shim-wrap')) addons.shim = shims;
  var premium = SOL.top === 'none' && /premium/i.test(getOpt('grp-premium') || '');
  if (premium) addons.pole = 1;
  var order = {
    shades: shades,
    width: sizes[0].w, height: sizes[0].h,
    qty: _solQty(),
    coupledCount: _solCoupledActive ? _solCoupledCount : 0,
    header: SOL.top,
    mount: _solData('grp-mount', 'data-mount') || 'IM',
    door: _solIsDoor(),
    doorMagnets: !/no hold/i.test(getOpt('grp-mag') || ''),
    cordless: op === 'PrecisionLift™ Cordless',
    addons: addons
  };
  if (SOL.top === 'fascia') {
    order.shape = _solData('grp-fascia-shape');
    order.material = _solData('grp-fascia-mat');
    order.size = parseFloat(_solData('grp-fascia-size'));
    var cap = _solSelBtn('grp-endcaps');
    if (cap) order.endCapColor = cap.textContent.trim();
  }
  // A common valance over coupled shades spans all of them.
  if (_solCoupledActive && (SOL.top === 'fascia' || SOL.top === 'wood'))
    order.valanceWidth = sizes.reduce(function (t, s) { return t + s.w; }, 0);
  if (premium) order.hardwareFinish = (getOpt('grp-hw-color') || 'White').trim();

  // Fabric-wrapped fascia: the wrap fabric, and keystones where the valance is longer than
  // one piece of it. Handoff §06: max length = fabric width − 7″; beyond that it splices
  // with a keystone ($73 each), up to 5 per valance, 3 on a common valance.
  var keystones = 0, keystoneOver = false;
  if (SOL.top === 'fascia' && order.material === 'fabric') {
    var wrap = getOpt('grp-fascia-fabric') || '';
    if (SOL.dual && !_solSelBtn('grp-fascia-fabric')) need.push('the valance wrap fabric (Step 5)');
    var wrapFab = !SOL.dual ? SOL.sel.main
      : /blackout layer/i.test(wrap) ? SOL.sel.bo
      : /light layer/i.test(wrap) ? SOL.sel.lite
      : null;
    var cands = wrapFab ? [wrapFab] : [SOL.sel.bo, SOL.sel.lite].filter(Boolean);   // "different fabric": assume the narrower
    if (cands.length) {
      var fw = Math.min.apply(null, cands.map(function (c) { return SolunaEngine.fabricWidth(SolunaEngine.byCollection[c.collection], c.code); }));
      var piece = fw - 7, vw = order.valanceWidth || order.width;
      if (vw > piece && piece > 0) {
        keystones = Math.ceil(vw / piece) - 1;
        if (keystones > (_solCoupledActive ? 3 : 5)) keystoneOver = true;
        else addons.key = keystones;
      }
    }
  }
  return { order: order, need: need, sizes: sizes, op: op, keystones: keystoneOver ? 0 : keystones, keystoneOver: keystoneOver };
}

// Engine error → one plain sentence for the customer. `manual` = we price it by hand.
function _solIssue(err, built) {
  var code = err.split(':')[0];
  var w = built.sizes[0].w;
  switch (code) {
    case 'OFF_GRID':
    case 'OVER_MAX_WIDTH':
      return { manual: true, text: 'Over 118″ wide or 144″ tall — Norman\'s price chart stops there, so we\'ll price this one by hand.' };
    case 'OVER_FABRIC_WIDTH':
      return { text: err.replace(/^OVER_FABRIC_WIDTH:\s*/, '').replace(' runs ', ' is made up to ') + ' wide. Choose a wider fabric, or split the window into two shades.' };
    case 'CORDLESS_LIMIT':
      var m = err.match(/maxes at (\d+)/);
      return { text: 'At ' + w + '″ wide, a cordless shade can be up to ' + (m ? m[1] : '') + '″ long. Choose Manual with chain, SmartRelease™ or Motorized — or a wider shade.' };
    case 'MOUNT_REQUIRED':
      return { text: 'Full Blackout Side Channels on a door must be outside mount. Choose Outside mount in Step 1.' };
    case 'SIZE_NOT_AVAILABLE':
      return { text: 'That fascia size isn\'t made in that shape and finish — curved comes in 3½″ and 4½″; the 6″ and 8″ are square and fabric-wrapped.' };
    case 'INVALID_DUAL':
      return { text: 'A Dual Shade needs exactly one blackout layer and one light layer.' };
    case 'INVALID_COMBO':
      if (/premium hardware/i.test(err)) return { text: 'Premium hardware is for a single open-roll shade only.' };
      if (/single-shade/i.test(err)) return { text: 'The cassette and Full Blackout Side Channels are for single shades only — not coupled or dual.' };
      return { text: err.replace(/^INVALID_COMBO:\s*/, '') + '.' };
    default:
      return { text: err.replace(/^[A-Z_]+:\s*/, '') };
  }
}

// Checks the book states but the engine doesn't model.
function _solExtraIssues(built) {
  var out = [], o = built.order;
  if (built.keystoneOver) out.push({ manual: true, text: 'This fabric-wrapped valance is too long to splice from one fabric — we\'ll price it by hand.' });
  if (_solCoupledActive && (built.op === 'PrecisionLift™ Cordless' || built.op === 'SmartRelease™'))
    out.push({ text: 'Coupled shades need Manual with chain or Motorized.' });
  var mins = { 'PrecisionLift™ Cordless': 9.5, 'SmartRelease™': 12, 'Manual with chain': 8, 'Motorized': 12 };
  // Norman: the cassette is inside or outside mount only (SOLUNA_DATA.mount.note).
  if (o.header === 'cassette' && o.mount === 'SIM') out.push({ text: 'The cassette is made for inside or outside mount — choose one of those in Step 1.' });
  built.sizes.forEach(function (s) {
    if (s.w && mins[built.op] && s.w < mins[built.op]) out.push({ text: built.op + ' shades start at ' + mins[built.op] + '″ wide.' });
    if (s.h && s.h < 12) out.push({ text: 'Shades start at 12″ tall.' });
  });
  o.shades.forEach(function (sp) {
    if (sp.collection === 'Maui (Natural)' && (sp.height || o.height) > _SOL_MAUI_MAX_H)
      out.push({ text: 'Maui is made up to ' + _SOL_MAUI_MAX_H + '″ tall.' });
  });
  return out;
}

// One call that everything (summary, email, cart) uses, so they can't disagree.
function solQuote() {
  var built = solBuildOrder();
  var res = { built: built, quote: null, issues: [], manual: false, motor: 0, total: 0 };
  if (built.need.length) return res;
  var issues = _solExtraIssues(built);
  var q;
  try { q = SolunaEngine.quote(built.order); }
  catch (e) { q = { errors: ['PRICE_ERROR: ' + e.message] }; }
  if (q.errors) {
    q.errors.forEach(function (err) {
      var it = _solIssue(err, built);
      if (!issues.some(function (x) { return x.text === it.text; })) issues.push(it);
    });
  }
  res.issues = issues;
  // 'Manual quote' only when EVERY problem is a size-past-the-chart one; any other
  // problem still has to be fixed before the order can go to the cart.
  res.manual = issues.length > 0 && issues.every(function (i) { return i.manual; });
  if (!q.errors && !issues.length) {
    res.quote = q;
    var motorOn = document.getElementById('motor-sub') && document.getElementById('motor-sub').classList.contains('show');
    if (motorOn && typeof nmGetMotorPrice === 'function') res.motor = nmGetMotorPrice('Soluna Roller Shade', q.shadeCount * q.qty) || 0;
    res.total = Math.round((q.clientSubtotal + res.motor + q.freight) * 100) / 100;
  }
  return res;
}

// ─── Descriptions shared by the summary, email and cart ───────
function _solFabricDesc() {
  if (SOL.dual) {
    var boFront = /blackout in front/i.test(getOpt('grp-dual-front') || '');
    return 'Blackout layer: ' + _solFabricLabel(SOL.sel.bo) + ' · Light layer: ' + _solFabricLabel(SOL.sel.lite) +
           ' · ' + (boFront ? 'blackout faces the room' : 'light layer faces the room');
  }
  return _solFabricLabel(SOL.sel.main);
}

// Customer's words for the top treatment, and Norman's product name for the order.
function _solTopDesc() {
  var t = SOL.top;
  if (t === 'fascia') {
    var shape = _solData('grp-fascia-shape'), mat = _solData('grp-fascia-mat'), size = _solData('grp-fascia-size');
    var d = (shape === 'square' ? 'Square' : 'Curved') + ' fascia · ' + (mat === 'fabric' ? 'fabric-wrapped' : 'metal') + ' · ' + _solInch(size);
    if (mat === 'metal') d += ' · ' + (getOpt('grp-fascia-color') || '—');
    else d += ' · wrap: ' + (getOpt('grp-fascia-fabric') || '—');
    var cap = _solSelBtn('grp-endcaps');
    d += ' · end caps: ' + (cap ? cap.textContent.trim() : 'not answered (match my shade)');
    return d;
  }
  if (t === 'wood') return 'Modern Wood Valance 4½″ · ' + (getOpt('grp-wood-finish') || '—');
  if (t === 'cassette') return 'Cassette · ' + (/metal/i.test(getOpt('grp-cassette-mat')) ? 'metal ' + getOpt('grp-cassette-color') : 'fabric-wrapped');
  if (t === 'lg360') return 'Full Blackout Side Channels · housing ' + (/metal/i.test(getOpt('grp-lg-cassette-mat')) ? 'metal ' + getOpt('grp-lg-cassette-color') : 'fabric-wrapped') +
                           ' · side channels ' + getOpt('grp-lg-rail-color');
  if (t === 'none') return 'Open roll' + (/premium/i.test(getOpt('grp-premium') || '') ? ' · premium hardware, ' + getOpt('grp-hw-color') : '');
  return 'Mounting rail only';
}

function _solOptionParts() {
  var out = [];
  var hem = getOpt('grp-hembar-mat') || 'Fabric wrapped';
  out.push('Premium hem bar (' + hem.toLowerCase() + (/metal/i.test(hem) ? ', ' + getOpt('grp-hembar-color') : '') + ')');
  if (_solIsDoor()) out.push('Door shade' + (SOL.top !== 'lg360' && !/no hold/i.test(getOpt('grp-mag') || '') ? ' + magnetic hold down' : ''));
  document.querySelectorAll('#grp-extras .opt-btn.sel').forEach(function (b) { out.push(b.textContent.trim()); });
  var shims = parseInt(_solData('grp-shims'), 10) || 0;
  if (shims && _solVisible('sol-shim-wrap')) out.push(shims + ' shim' + (shims > 1 ? 's' : ''));
  var ks = solBuildOrder().keystones;
  if (ks) out.push(ks + ' valance keystone' + (ks > 1 ? 's' : '') + ' (fabric splice)');
  return out;
}

// ─── Summary card ─────────────────────────────────────────────
function updateSummary() {
  var shadeType = SOL.dual ? 'Dual Shade' : 'Standard';
  var w = _solVal('inp-width'), h = _solVal('inp-height');
  var set = function (id, v) { var el = document.getElementById(id); if (el) el.textContent = v; };
  set('s-light', SOL.dual ? _solFabricDesc() : _solFabricLabel(SOL.sel.main));
  set('s-op', getOpt('grp-op'));
  set('s-mount', getOpt('grp-mount') + (_solIsDoor() ? ' · door' : ''));
  set('s-shade-type', shadeType);
  set('s-qty', _solQty());
  set('s-size', _solSizeText('″'));
  set('s-top', _solTopDesc());
  set('s-addons', _solOptionParts().join(', '));

  var motorOn = document.getElementById('motor-sub') && document.getElementById('motor-sub').classList.contains('show');
  var motorRow = document.getElementById('s-motor-row');
  if (motorRow) {
    var mSum = (motorOn && typeof nmGetMotorSummary === 'function') ? nmGetMotorSummary() : null;
    motorRow.style.display = mSum ? '' : 'none';
    if (mSum) set('s-motor-brand', mSum);
  }
  var cSum = solGetCoupledSummary();
  _solShow('s-coupled-row', !!cSum);
  if (cSum) set('s-coupled', cSum);

  var r = solQuote();
  var issueEl = document.getElementById('s-issue');
  if (issueEl) {
    issueEl.style.display = r.issues.length ? '' : 'none';
    issueEl.style.color = r.manual && r.issues.length === 1 ? '#6b5314' : '#a3321f';
    issueEl.style.background = r.manual && r.issues.length === 1 ? '#fbf6ea' : '#fdf0ee';
    issueEl.innerHTML = r.issues.map(function (i) { return '⚠ ' + _solEsc(i.text); }).join('<br>');
  }
  var q = r.quote;
  _solShow('s-price-block', !!q);
  var note = document.getElementById('s-note');
  if (note) {
    note.textContent = r.built.need.length
      ? 'Still needed for a price: ' + r.built.need.join(', ') + '. Norman suggested retail, 25% off. Shipping is never discounted.'
      : 'Norman suggested retail, 25% off. Shipping is never discounted. Final price confirmed at quote.';
  }
  if (!q) return;
  set('s-retail', _solMoney(q.discountableRetail));
  set('s-disc', '−' + _solMoney(q.clientDiscount) + ' (25% off)');
  set('s-your', _solMoney(q.clientSubtotal));
  _solShow('s-motor-price-row', r.motor > 0);
  if (r.motor > 0) set('s-motor-price', nmMotorLineText(r.motor, q.shadeCount * q.qty));
  set('s-ship', _solMoney(q.freight) + (q.wideFreight ? ' (90″+ wide)' : ''));
  set('s-total', _solMoney(r.total));
}

// Plain-text price lines for the email / cart.
function _solPriceLines(r) {
  if (r.quote) {
    var q = r.quote, out = [
      'Norman retail: ' + _solMoney(q.discountableRetail),
      'Norman discount 25%: −' + _solMoney(q.clientDiscount),
      'Your price: ' + _solMoney(q.clientSubtotal)
    ];
    if (r.motor > 0) out.push('Motorization: ' + nmMotorLineText(r.motor, q.shadeCount * q.qty));
    out.push('Shipping (net, not discounted): ' + _solMoney(q.freight));
    out.push('TOTAL: ' + _solMoney(r.total));
    return out;
  }
  if (r.manual) return ['PRICE: manual quote required — size is past Norman\'s price chart'];
  if (r.issues.length) return ['PRICE: not calculated — needs review: ' + r.issues.map(function (i) { return i.text; }).join(' ')];
  return ['PRICE: not calculated — still needed: ' + r.built.need.join(', ')];
}

// Norman's names for what was ordered (the order to Norman must use them).
function _solNormanLines(r) {
  var q = r.quote;
  if (!q) return [];
  // Raceway is charged only on "raceway only"; a fascia / wood valance includes it.
  var incl = (q.header === 'fascia' || q.header === 'wood') ? ' (raceway included)' : '';
  var lines = ['Norman top treatment: ' + q.normanProduct + incl];
  q.shades.forEach(function (s, i) {
    lines.push('Norman fabric' + (q.shades.length > 1 ? ' ' + (i + 1) : '') + ': ' + s.collection + (s.code ? ' ' + s.code : '') +
               ' — ' + (s.chart === 'solar' ? 'Solar' : 'Fabric') + ' group ' + s.group + (s.uplift ? ' (+20% blackout)' : ''));
  });
  return lines;
}

// ─── Submit + cart ────────────────────────────────────────────
function submitQuote() {
  var name  = document.getElementById('cf-name').value.trim();
  var phone = document.getElementById('cf-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  var r = solQuote();
  var op = getOpt('grp-op') || '—';
  var shadeType = SOL.dual ? 'Dual Shade' : 'Standard';
  var w = _solVal('inp-width') || '—', h = _solVal('inp-height') || '—';
  var qty = _solQty();
  var email = document.getElementById('cf-email').value.trim();
  var notes = document.getElementById('cf-notes').value.trim();
  var motorOn = document.getElementById('motor-sub') && document.getElementById('motor-sub').classList.contains('show');
  var motorSummary = (motorOn && typeof nmGetMotorSummary === 'function') ? nmGetMotorSummary() : '';
  var coupledLine = solGetCoupledSummary();
  var deliveryLabel = window.pbDelivery === 'install' ? pbDeliveryLabel() : 'Ship to me — UPS / FedEx';

  var body = [
    '=== NORMAN SOLUNA ROLLER SHADE QUOTE REQUEST ===',
    '',
    'CONFIGURATION',
    'Shade type: ' + shadeType,
    'Fabric: ' + _solFabricDesc(),
    'Operating system: ' + op,
    'Motorization: ' + (motorOn ? 'Yes' : 'None'),
    (motorSummary ? 'Motor details: ' + motorSummary : null),
    'Mount type: ' + getOpt('grp-mount'),
    'Door shade: ' + (_solIsDoor() ? 'Yes' : 'No'),
    'Size: ' + _solSizeText('"'),
    'Quantity: ' + qty,
    (coupledLine ? 'Coupled shades: ' + coupledLine : null),
    'Top of shade: ' + _solTopDesc(),
    'Options: ' + _solOptionParts().join(', '),
    ''
  ].concat(_solNormanLines(r), [''], _solPriceLines(r), [
    '',
    'DELIVERY',
    deliveryLabel,
    '',
    'CUSTOMER',
    'Name: ' + name,
    'Phone: ' + phone,
    (email ? 'Email: ' + email : null),
    (notes ? 'Notes: ' + notes : null),
    '',
    '=== END QUOTE REQUEST ===',
    'Sent from blindznation.com/pages/soluna-roller-shades.html'
  ]).filter(function (l) { return l !== null && l !== undefined; }).join('\n');

  var fabricShort = SOL.dual ? 'Dual' : (SOL.sel.main ? SOL.sel.main.collection : 'no fabric');
  var subj = 'Soluna Roller Quote — ' + w + '"×' + h + '" ' + fabricShort + ' — ' + name;
  window.location.href = 'mailto:justin@blindznation.com?subject=' + encodeURIComponent('Blindznation — ' + subj) + '&body=' + encodeURIComponent('BLINDZNATION\n\n' + body);

  document.getElementById('quote-success').classList.add('show');
  document.getElementById('quote-success').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function addSolunaToCart() {
  var r = solQuote();
  if (r.built.need.length) { alert('Please choose ' + r.built.need.join(' and ') + ' first.'); return; }
  if (r.issues.length && !r.manual) { alert(r.issues.map(function (i) { return i.text; }).join('\n')); return; }
  // Handoff: end caps are ALWAYS asked on a fascia ("Match my shade" is a fine answer).
  if (SOL.top === 'fascia' && !_solSelBtn('grp-endcaps')) { alert('Please choose an end cap color in Step 5 — "Match my shade" is fine if you have no preference.'); return; }
  var qty = _solQty();
  var lines = [
    { label: 'Product',  value: 'Norman Soluna Roller Shade' },
    { label: 'Size',     value: _solSizeText('″') },
    { label: 'Type',     value: SOL.dual ? 'Dual Shade' : 'Standard' },
    { label: 'Fabric',   value: _solFabricDesc() },
    { label: 'Control',  value: getOpt('grp-op') },
    { label: 'Mount',    value: getOpt('grp-mount') + (_solIsDoor() ? ' (door)' : '') },
    { label: 'Top',      value: _solTopDesc() },
    { label: 'Options',  value: _solOptionParts().join(', ') },
    { label: 'Quantity', value: String(qty) }
  ];
  var cSum = solGetCoupledSummary();
  if (cSum) lines.push({ label: 'Coupled', value: cSum });
  _solPriceLines(r).forEach(function (l) { lines.push({ label: 'Price', value: l }); });
  // price = the whole order (all shades + motor + shipping), so qty stays 1 — the cart
  // multiplies price × qty, and the quantity is already inside this total.
  pbAddToCart({ product: 'Norman Soluna Roller Shade', lines: lines,
                specs: lines.map(function (l) { return l.label + ': ' + l.value; }).join(' | '),
                price: r.quote ? r.total : 0, qty: 1 });
  pbOpenCart();
}

// ─── Start-up ─────────────────────────────────────────────────
function solInit() {
  if (!window.SolunaEngine) return;
  ['main', 'bo', 'lite'].forEach(solRenderFabric);
  _solPills('grp-endcaps', _SOL_COLORS.endCaps, -1, true);
  var el = document.getElementById('sol-fascia-color-slot');
  if (el) el.innerHTML = '<div class="opt-row" id="grp-fascia-color" style="flex-wrap:wrap"></div>';
  _solPills('grp-fascia-color', _SOL_COLORS.fasciaMetal, 0, true);
  var wf = SOLUNA_DATA.finishes.modern_wood_valance;
  _solPills('grp-wood-finish', wf.paint.map(function (p) { return 'Paint ' + p; }).concat(wf.stain.map(function (s) { return 'Stain ' + s; })), 0, false);
  _solPills('grp-cassette-color', _SOL_COLORS.housing, 0, true);
  _solPills('grp-lg-cassette-color', _SOL_COLORS.housing, 0, true);
  _solPills('grp-lg-rail-color', _SOL_COLORS.housing, 0, true);
  var hem = document.getElementById('sol-hembar-color-slot');
  if (hem && typeof pbColorRow === 'function') hem.innerHTML = pbColorRow('grp-hembar-color', 'plainHemBar', 'updateSummary');
  solSyncFascia();
  solSyncCovers();
  solSyncDoor();
  var qEl = document.getElementById('inp-qty');
  if (qEl) qEl.value = _solQty();        // a pre-filled qty from another page may be 0, negative or a decimal
  updateSummary();
}

// Pre-fill from URL params (carry-over from Basic Roller Shades page)
(function() {
  var p = new URLSearchParams(window.location.search);
  var w = p.get('w'), h = p.get('h'), qty = p.get('qty'), mount = p.get('mount'), op = p.get('op'), motor = p.get('motor');
  if (w) { var el = document.getElementById('inp-width'); if (el) el.value = w; }
  if (h) { var el2 = document.getElementById('inp-height'); if (el2) el2.value = h; }
  if (qty) { var el3 = document.getElementById('inp-qty'); if (el3) el3.value = qty; }
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
})();
