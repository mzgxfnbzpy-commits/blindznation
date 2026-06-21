renderNav('Soft treatments'); renderFooter(false);
_initMeasureHelp(`
  <div class="pb-help-heading">Drapery &amp; roman shade measuring</div>
  <div class="pb-help-sub">Rod placement and panel sizing tips</div>
  <div class="pb-help-section">
    <h4>Rod placement</h4>
    <ul>
      <li>Mount rod <strong>4–8 inches above</strong> the window frame (higher = taller room feel).</li>
      <li>Extend rod <strong>6–12 inches past</strong> each side of the frame so panels stack clear of glass.</li>
      <li>Standard clearance between rod and ceiling: at least 2 inches.</li>
    </ul>
  </div>
  <div class="pb-help-section">
    <h4>Panel width</h4>
    <ul>
      <li>Each panel should be <strong>1.5× to 2.5×</strong> the width of the opening it covers (for fullness).</li>
      <li>For a pair of panels covering one window: measure total rod width, divide by 2 per panel, then multiply by fullness factor.</li>
    </ul>
    <div class="pb-help-tip">Not sure? We measure for free during your in-home consult.</div>
  </div>
  <div class="pb-help-section">
    <h4>Panel length</h4>
    <ul>
      <li><strong>Puddle:</strong> floor + 3–6 inches (romantic/formal)</li>
      <li><strong>Brush:</strong> floor + 0.5 inch</li>
      <li><strong>Float:</strong> floor – 0.5 inch (easiest to clean)</li>
    </ul>
  </div>
`, '../pages/measure-drapes.html');
// Auto-switch tabs based on URL ?tab= param — runs on load so everything is ready
window.addEventListener('load', function() {
  var tab = new URLSearchParams(window.location.search).get('tab');
  if (!tab) return;
  var btn = Array.from(document.querySelectorAll('.type-tab')).find(function(b) {
    return (b.getAttribute('onclick') || '').indexOf("'" + tab + "'") !== -1;
  });
  if (btn) switchTab(tab, btn);
});

// ── Tab switcher ──────────────────────────────────────────
function switchTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('on'));
  document.querySelectorAll('.type-tab').forEach(b => b.classList.remove('on'));
  document.getElementById('tab-' + id).classList.add('on');
  btn.classList.add('on');
}

// ── Selection helpers ────────────────────────────────────
var drapeState  = { pleat:'', fabric:'' };
var romanState  = { style:'', fabric:'' };

// ── Roman style state carryover ──────────────────────────
var _rnStyleCache = {};
function _rnCaptureState(styleName) {
  if (!styleName) return;
  var s = {};
  ['rn-w','rn-h','rn-qty','rn-return','roman-clen-in','val-folds','val-fold-size'].forEach(function(id) {
    var el = document.getElementById(id); if (el) s[id] = el.value;
  });
  ['rn-w-frac','rn-h-frac'].forEach(function(id) {
    var el = document.getElementById(id); if (el) s[id] = el.value;
  });
  ['grp-roman-mount','grp-roman-tdbu','grp-roman-color','grp-roman-liner','grp-roman-lining',
   'grp-roman-rings','grp-roman-op','grp-roman-clen','grp-roman-motor-brand','grp-roman-control',
   'grp-roman-trim-supply','grp-roman-mount-style','grp-roman-back-valance','grp-rn-back-val-h',
   'grp-rn-back-val-fabric','grp-rn-front-val-h','grp-val-lining','grp-val-fabric'].forEach(function(grp) {
    var sel = document.querySelector('#' + grp + ' .opt-btn.sel');
    if (sel) s[grp] = sel.textContent.trim();
  });
  var trimChecks = document.querySelectorAll('.rn-trim-check');
  s['rn-trim-checks'] = Array.from(trimChecks).map(function(cb) { return { loc: cb.getAttribute('data-loc'), checked: cb.checked }; });
  var fabCard = document.querySelector('#roman-fabric-cards .fabric-card.sel');
  if (fabCard) { var h3 = fabCard.querySelector('h3'); if (h3) s['roman-fabric-card'] = h3.textContent.trim(); }
  _rnStyleCache[styleName] = s;
}
function _rnRestoreState(styleName, fromState) {
  var saved = _rnStyleCache[styleName];
  if (!saved) {
    if (fromState) {
      ['rn-w','rn-h','rn-qty','rn-w-frac','rn-h-frac'].forEach(function(id) {
        var el = document.getElementById(id); if (el && fromState[id] !== undefined) el.value = fromState[id];
      });
    }
    return;
  }
  ['rn-w','rn-h','rn-qty','rn-return','roman-clen-in','val-folds','val-fold-size'].forEach(function(id) {
    var el = document.getElementById(id); if (el && saved[id] !== undefined) el.value = saved[id];
  });
  ['rn-w-frac','rn-h-frac'].forEach(function(id) {
    var el = document.getElementById(id); if (el && saved[id] !== undefined) el.value = saved[id];
  });
  ['grp-roman-mount','grp-roman-tdbu','grp-roman-color','grp-roman-liner','grp-roman-lining',
   'grp-roman-rings','grp-roman-op','grp-roman-clen','grp-roman-motor-brand','grp-roman-control',
   'grp-roman-trim-supply','grp-roman-mount-style','grp-roman-back-valance','grp-rn-back-val-h',
   'grp-rn-back-val-fabric','grp-rn-front-val-h','grp-val-lining','grp-val-fabric'].forEach(function(grp) {
    if (!saved[grp]) return;
    var btns = document.querySelectorAll('#' + grp + ' .opt-btn');
    btns.forEach(function(b) {
      if (b.textContent.trim() === saved[grp]) { b.classList.add('sel'); }
      else { b.classList.remove('sel'); }
    });
  });
  if (saved['rn-trim-checks']) {
    saved['rn-trim-checks'].forEach(function(item) {
      var cb = document.querySelector('.rn-trim-check[data-loc="' + item.loc + '"]');
      if (cb) cb.checked = item.checked;
    });
  }
  if (saved['roman-fabric-card']) {
    document.querySelectorAll('#roman-fabric-cards .fabric-card').forEach(function(card) {
      var h3 = card.querySelector('h3');
      if (h3 && h3.textContent.trim() === saved['roman-fabric-card']) card.classList.add('sel');
      else card.classList.remove('sel');
    });
  }
}

// ── Drape style state carryover ──────────────────────────
var _drapePleatCache = {};
function _drapeGetCurrentDims() {
  var p = drapeState.pleat;
  if (p === 'Pinch Pleat' || p === 'French Pleat' || p === '2-Prong Tack' || p === 'Tailored Pleat' || p === 'Goblet Pleat' || p === 'Barrel Pleat') {
    var pp = document.getElementById('pp-w'), pl = document.getElementById('pp-l');
    return { w: pp ? pp.value : '', h: pl ? pl.value : '', type: 'pp' };
  } else if (p === 'Rod Pocket / Sheered Pocket') {
    var rp = document.getElementById('rp-w'), rl = document.getElementById('rp-l');
    return { w: rp ? rp.value : '', h: rl ? rl.value : '', type: 'rp' };
  } else if (p === 'Ripple Fold') {
    var rfw = document.getElementById('rf-w'), rfl = document.getElementById('rf-l');
    return { w: rfw ? rfw.value : '', h: rfl ? rfl.value : '', type: 'rf' };
  } else {
    var dw = document.getElementById('d-exact-width'), dl = document.getElementById('d-exact-length');
    return { w: dw ? dw.value : '', h: dl ? dl.value : '', type: 'std' };
  }
}
function _drapeSetDims(targetPleat, dims) {
  if (!dims || (!dims.w && !dims.h)) return;
  var isPinch = ['Pinch Pleat','French Pleat','2-Prong Tack','Tailored Pleat','Goblet Pleat','Barrel Pleat'].indexOf(targetPleat) !== -1;
  var isRodP  = targetPleat === 'Rod Pocket / Sheered Pocket';
  var isRip   = targetPleat === 'Ripple Fold';
  if (isPinch) {
    var pw = document.getElementById('pp-w'), pl = document.getElementById('pp-l');
    if (pw) pw.value = dims.w; if (pl) pl.value = dims.h;
  } else if (isRodP) {
    var rw = document.getElementById('rp-w'), rl = document.getElementById('rp-l');
    if (rw) rw.value = dims.w; if (rl) rl.value = dims.h;
  } else if (isRip) {
    var rfw2 = document.getElementById('rf-w'), rfl2 = document.getElementById('rf-l');
    if (rfw2) rfw2.value = dims.w; if (rfl2) rfl2.value = dims.h;
  } else {
    var dw2 = document.getElementById('d-exact-width'), dl2 = document.getElementById('d-exact-length');
    if (dw2) dw2.value = dims.w; if (dl2) dl2.value = dims.h;
  }
}
function _drapeCaptureState(pleatName) {
  if (!pleatName) return;
  var s = { dims: _drapeGetCurrentDims() };
  ['grp-drape-panels','grp-drape-side','grp-drape-fullness','grp-drape-liner',
   'grp-drape-hardware','grp-drape-hw-need','grp-drape-hw-type'].forEach(function(grp) {
    var sel = document.querySelector('#' + grp + ' .opt-btn.sel');
    if (sel) s[grp] = sel.textContent.trim();
  });
  _drapePleatCache[pleatName] = s;
}
function _drapeRestoreState(targetPleat, prevDims) {
  var saved = _drapePleatCache[targetPleat];
  if (!saved) {
    if (prevDims) _drapeSetDims(targetPleat, prevDims);
    return;
  }
  _drapeSetDims(targetPleat, saved.dims);
  ['grp-drape-panels','grp-drape-side','grp-drape-fullness','grp-drape-liner',
   'grp-drape-hardware','grp-drape-hw-need','grp-drape-hw-type'].forEach(function(grp) {
    if (!saved[grp]) return;
    document.querySelectorAll('#' + grp + ' .opt-btn').forEach(function(b) {
      if (b.textContent.trim() === saved[grp]) b.classList.add('sel');
      else b.classList.remove('sel');
    });
  });
}

var _RIPPLE_STYLES    = ['Ripple Fold'];
var _NO_FULLNESS      = ['Grommet / Eyelet']; // Rod Pocket has its own fullness section

function selectPleat(el, val) {
  if (drapeState.pleat && drapeState.pleat !== val) _drapeCaptureState(drapeState.pleat);
  var _prevDims = drapeState.pleat ? _drapeGetCurrentDims() : null;

  document.querySelectorAll('#pleat-cards .opt-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  drapeState.pleat = val;

  var isPinch = ['Pinch Pleat','French Pleat','2-Prong Tack','Tailored Pleat','Goblet Pleat','Barrel Pleat'].indexOf(val) !== -1;
  var subopts = document.getElementById('pinch-subopts');
  if (subopts) {
    subopts.style.display = isPinch ? 'block' : 'none';
    if (!isPinch) document.querySelectorAll('#pinch-subopts .opt-card').forEach(c => c.classList.remove('sel'));
  }

  var rpOpts = document.getElementById('rodpocket-subopts');
  if (rpOpts) rpOpts.style.display = val === 'Rod Pocket / Sheered Pocket' ? 'block' : 'none';

  var isRipple    = _RIPPLE_STYLES.indexOf(val) !== -1;
  var isRodPocket = val === 'Rod Pocket / Sheered Pocket';
  var noFull      = _NO_FULLNESS.indexOf(val) !== -1;
  var stdFull     = document.getElementById('drape-fullness-std');
  var stdDims     = document.getElementById('drape-std-dims');
  var rippleOpts  = document.getElementById('drape-ripple-opts');
  var fullRec     = document.getElementById('drape-fullness-rec');

  // Hide standard fullness for ripple, grommet, and rod pocket (rod pocket has its own)
  if (stdFull)    stdFull.style.display    = (!isRipple && !noFull && !isRodPocket) ? 'block' : 'none';
  // Hide standard dims for pleat types that have their own dim inputs
  if (stdDims)    stdDims.style.display    = (isPinch || isRodPocket || isRipple) ? 'none' : '';
  if (rippleOpts) rippleOpts.style.display = isRipple ? 'block' : 'none';
  if (fullRec && (isRipple || isRodPocket)) { fullRec.style.display = 'none'; }

  _drapeRestoreState(val, _prevDims);
  calcDrapePrice();

  // Scroll to reveal the sub-options or next step that just appeared
  setTimeout(function() {
    var target = isPinch ? document.getElementById('pinch-subopts')
               : isRodPocket ? document.getElementById('rodpocket-subopts')
               : isRipple    ? document.getElementById('drape-ripple-opts')
               : stdFull;
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 120);
}

function drapeFullnessHint(val) {
  var rec = document.getElementById('drape-fullness-rec');
  if (!rec) return;
  rec.style.display = 'block';
  var f = parseFloat(val);
  if (f <= 2.0) {
    rec.style.cssText = 'display:block;margin-top:8px;font-size:12px;padding:8px 12px;border-radius:7px;background:#EAF3DE;color:#27500A';
    rec.textContent = '✓ We recommend 2-prong tack top for ' + val + '× fullness.';
  } else {
    rec.style.cssText = 'display:block;margin-top:8px;font-size:12px;padding:8px 12px;border-radius:7px;background:#FBF7F0;color:#7A4F00';
    rec.textContent = '✓ We recommend 3-prong tack top for ' + val + '× fullness — rich, full look.';
  }
}

function drapeRippleHwHint(hw) {
  var note = document.getElementById('ripple-hw-note');
  if (!note) return;
  var msgs = { graber: 'Graber ripple fold system selected.', kirsch: 'Kirsch ripple fold system selected.', idk: "No problem — we'll use standard Kirsch hardware." };
  note.textContent = msgs[hw] || '';
  note.style.color = hw === 'idk' ? 'var(--gold)' : '#555';
}

function selectPinchDetail(el, val) {
  document.querySelectorAll('#pinch-subopts .opt-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  drapeState.pleat = val;
}
function selectRomanStyle(el, val) {
  if (romanState.style && romanState.style !== val) _rnCaptureState(romanState.style);
  var _prevRnState = romanState.style ? _rnStyleCache[romanState.style] : null;

  document.querySelectorAll('#roman-style-cards .opt-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  romanState.style = val;

  var isVignette = val === 'Vignette®';
  var isValance  = val === 'Roman Valance';
  var hideSteps  = isVignette || isValance;
  var tdbuStyles = ['Flat Roman', 'Permanently Pleated Roman'];

  document.getElementById('vignette-notice').style.display = isVignette ? 'block' : 'none';
  document.getElementById('valance-config').style.display  = isValance  ? 'block' : 'none';
  document.getElementById('roman-tdbu-wrap').style.display = tdbuStyles.indexOf(val) !== -1 ? 'block' : 'none';

  var mountStep = document.getElementById('roman-step-mount');
  if (mountStep) mountStep.style.display = hideSteps ? 'none' : '';
  ['step-roman-3','step-roman-4','step-roman-5','step-roman-6'].forEach(function(id){
    var s = document.getElementById(id);
    if (s) s.style.display = hideSteps ? 'none' : '';
  });

  _rnRestoreState(val, _prevRnState);
  calcRoman();

  // Auto-scroll to the revealed content
  setTimeout(function() {
    var target = isValance ? document.getElementById('valance-config')
               : document.getElementById('roman-step-dims');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 150);
}

function romanChainCheck() {
  var len  = parseFloat(document.getElementById('roman-clen-in').value) || 0;
  var h    = parseFloat(document.getElementById('rn-h').value) || 0;
  var warn = document.getElementById('roman-clen-warn');
  if (!warn) return;
  if (!len || !h) { warn.style.display = 'none'; return; }
  var minLen = Math.ceil(h * 0.75);
  if (len < minLen) {
    warn.style.display = 'block';
    warn.textContent = '⚠ Minimum chain length is 75% of finished length — at least ' + minLen + '" for a ' + h + '" shade.';
  } else { warn.style.display = 'none'; }
}

function romanToggleOp(type) {
  document.getElementById('roman-manual-opts').style.display = type === 'manual'    ? 'block' : 'none';
  document.getElementById('roman-motor-opts').style.display  = type === 'motorized' ? 'block' : 'none';
}
function selectFabric(tab, el, val) {
  var container = tab === 'drape' ? '#drape-fabric-cards' : '#roman-fabric-cards';
  document.querySelectorAll(container + ' .fabric-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  var weSupply = val === 'We supply the fabric';
  if (tab === 'drape') {
    drapeState.fabric = val;
    var dp = document.getElementById('drape-fabric-detail');
    if (dp) dp.style.display = weSupply ? 'block' : 'none';
    calcDrapePrice();
  } else {
    romanState.fabric = val;
    var rp = document.getElementById('roman-fabric-detail');
    if (rp) rp.style.display = weSupply ? 'block' : 'none';
    calcRoman();
  }
}

// Helper: read shipping estimate from nearest delivery section ZIP input
function _getShippingEst(containerEl) {
  var el = containerEl ? containerEl.querySelector('.pb-ship-est .pb-zip-result strong') : null;
  if (!el || !el.textContent) return 0;
  var m = el.textContent.match(/\$(\d+)/);
  return m ? parseInt(m[1]) : 0;
}

// ── Roman pricing ─────────────────────────────────────────
var RN_TRIM_PER_FT = 15;
// Minimums: flat/relaxed $150, permanently pleated $250
function rnGetMin() {
  return (romanState.style === 'Permanently Pleated Roman') ? 250 : 150;
}

// $40/sqft = cost $26 ÷ 0.65 margin. Same rate all styles — liner included in labor.
var RN_RATES = {
  'Flat Roman':               { unlined: 40, lined: 40 },
  'Permanently Pleated Roman':{ unlined: 50, lined: 50 },
  'Relaxed Roman':            { unlined: 40, lined: 40 },
  'Roman Valance':            { unlined: 40, lined: 40 }
};

function rnGetRate() {
  var style   = romanState.style || 'Flat Roman';
  var lBtn    = document.querySelector('#grp-roman-lining .opt-btn.sel');
  var lining  = lBtn ? lBtn.textContent.trim() : 'Unlined';
  var isLined = lining !== 'Unlined';
  var rates   = RN_RATES[style] || { unlined: 35, lined: 38 };
  return isLined ? rates.lined : rates.unlined;
}

function adjRomanQty(d) {
  var el = document.getElementById('rn-qty');
  el.value = Math.max(1, (parseInt(el.value) || 1) + d);
  calcRoman();
}

function _motorCustomMsg(box, label) {
  if (!box) return;
  box.style.display = 'block';
  box.innerHTML =
    '<div style="padding:2px 0">' +
      '<div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">' + label + ' — Custom Quote</div>' +
      '<div style="font-size:12px;color:var(--text-dark);line-height:1.7">Motorized installation pricing varies by motor brand, wiring, and integration. We\'ll include the full price in your custom quote after review.</div>' +
    '</div>';
}

function _customSizeMsg(box, label, maxW, maxH) {
  if (!box) return;
  box.style.display = 'block';
  box.innerHTML =
    '<div style="padding:2px 0">' +
      '<div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">' + label + ' — Custom Quote Required</div>' +
      '<div style="font-size:12px;color:var(--text-dark);line-height:1.7">This size exceeds our standard pricing range (max ' + maxW + '″ wide × ' + maxH + '″ tall). Submit your order for review and we\'ll provide a custom price.</div>' +
    '</div>';
}

function calcRoman() {
  var w   = parseFloat(document.getElementById('rn-w').value);
  var h   = parseFloat(document.getElementById('rn-h').value);
  var qty = parseInt(document.getElementById('rn-qty').value) || 1;
  var box = document.getElementById('roman-pricebox');
  if (!w || !h) { if(box) box.style.display = 'none'; return; }

  // Motorized operation → no customer-facing estimate
  if (getOpt('grp-roman-op') === 'Motorized') { _motorCustomMsg(box, 'Motorized Roman Shade'); return; }

  // Minimum functional size — 12″
  if ((w > 0 && w < 12) || (h > 0 && h < 12)) {
    if (box) { box.style.display = 'block'; box.innerHTML = '<div style="padding:6px 0;font-size:12px;color:var(--text-dark)">&#9888; Roman shades require a minimum <strong>12&rdquo;</strong> width and height to operate correctly.</div>'; }
    return;
  }

  // Custom quote for over 120″
  if (w > 120 || h > 120) { _customSizeMsg(box, 'Roman Shade', 120, 120); return; }

  // Oversized freight flag (>96″ wide = 8 ft)
  var isRomanOversized = w > 96;

  var rate     = rnGetRate();
  var sqft     = (w / 12) * (h / 12);
  var perShade = Math.max(rnGetMin(), sqft * rate);
  var laborTotal = perShade * qty;

  // Trim
  var trimTotal = 0;
  var trimChecks = document.querySelectorAll('.rn-trim-check:checked');
  if (trimChecks.length) {
    var trimFt = 0;
    trimChecks.forEach(function(cb) {
      var loc = cb.getAttribute('data-loc');
      if (loc === 'sides')  trimFt += (h / 12) * 2 * qty;  // both sides
      if (loc === 'top')    trimFt += (w / 12) * qty;
      if (loc === 'bottom') trimFt += (w / 12) * qty;
    });
    trimTotal = Math.ceil(trimFt) * RN_TRIM_PER_FT;
  }

  // Fabric yardage estimate
  var cutsPerShade = Math.max(1, Math.ceil(w / 54));
  var yardsPerCut  = Math.ceil((h + 16) / 36 * 4) / 4;
  var fabricYds    = cutsPerShade * yardsPerCut * qty;

  // Fabric & liner cost if we supply
  var fabricCost = 0; var linerCost = 0;
  if (romanState.fabric === 'We supply the fabric') {
    fabricCost = fabricYds * 25;
    var linerBtn = document.querySelector('#grp-roman-liner .opt-btn.sel');
    if (linerBtn && linerBtn.textContent.indexOf('liner') !== -1) {
      linerCost = fabricYds * 10;
    }
  }

  // Shipping estimate — FedEx/UPS from Philadelphia; min $75; >96″ wide = oversized freight $200
  var isShippingRn = true;
  var shipEst = 0;
  if (isShippingRn) {
    if (isRomanOversized) {
      shipEst = 200;
    } else {
      var rnShipBase = Math.ceil((w / 12) * (h / 12) * qty * 3 / 5) * 5;
      shipEst = Math.max(75, rnShipBase);
    }
  }

  var grandTotal = laborTotal + trimTotal + fabricCost + linerCost + shipEst;
  if (box) box.style.display = 'block';
  document.getElementById('rn-pb-style').textContent = romanState.style || '—';
  document.getElementById('rn-pb-dims').textContent  = w + '″ W × ' + h + '″ H';
  document.getElementById('rn-pb-qty').textContent   = qty;
  document.getElementById('rn-pb-motor').textContent = getOpt('grp-roman-op') || 'Manual';
  // Add fabric/liner/shipping rows to price box
  var extraRows = document.getElementById('rn-pb-extra-rows');
  if (!extraRows) {
    extraRows = document.createElement('div');
    extraRows.id = 'rn-pb-extra-rows';
    document.getElementById('rn-pb-min-note').before(extraRows);
  }
  extraRows.innerHTML = '';
  document.getElementById('rn-pb-min-note').style.display = 'none';
  // Fabric yardage note
  var fabNote = document.getElementById('rn-pb-fabric-note');
  if (!fabNote) {
    fabNote = document.createElement('div');
    fabNote.id = 'rn-pb-fabric-note';
    fabNote.style.cssText = 'margin-top:8px;font-size:11px;background:rgba(201,169,110,.1);border:1px solid rgba(201,169,110,.2);border-radius:7px;padding:7px 10px;color:var(--cream);line-height:1.5';
    box.appendChild(fabNote);
  }
  fabNote.textContent = '🧵 Est. fabric needed: ~' + fabricYds.toFixed(2) + ' yards' + (cutsPerShade > 1 ? ' ('+cutsPerShade+' widths)' : '') + ' — pattern repeats will add more. Confirmed at order.';

  // Line-by-line estimate panel
  var rnLines = [
    { label: 'Product',        value: (romanState.style || 'Roman Shade') },
    { label: 'Size',           value: w + '″ W × ' + h + '″ finished length' },
    { label: 'Quantity',       value: qty + ' shade(s)' },
    { label: 'Fabric',         value: (romanState.fabric || '—') },
    { label: 'Lining',         value: (getOpt('grp-roman-lining') || '—') },
    { label: 'Operation',      value: (getOpt('grp-roman-op') || '—') },
    { label: 'Mounting',       value: (getOpt('grp-roman-mount-style') || '—') }
  ];
  if (getOpt('grp-roman-op') === 'Motorized') rnLines.push({ label: 'Motor brand', value: getOpt('grp-roman-motor-brand') || 'TBD at order' });
  if (trimTotal) rnLines.push({ label: 'Trim', value: getOpt('grp-roman-trim') || 'Selected' });
  if (shipEst)   rnLines.push({ label: isRomanOversized ? 'Oversized freight est. (>96″ wide)' : 'Shipping est. (FedEx/UPS, Philadelphia)', value: '~$' + shipEst });
  var rnAtMin = perShade === rnGetMin();
  if (rnAtMin) rnLines.push({ label: 'Note', value: 'At ' + (romanState.style === 'Permanently Pleated Roman' ? 'pleated' : 'flat/relaxed') + ' minimum — $' + rnGetMin() + '/shade' });
  pbRenderEstimate('roman-pricebox', rnLines, grandTotal, '', function(checkout) {
    pbCollectItem(romanState.style || 'Roman Shade', rnLines, grandTotal, getOpt('grp-roman-op')==='Motorized');
    pbOpenCart();
    if (checkout) setTimeout(function(){
      var f=document.getElementById('pb-cart-foot'); if(f) f.style.display='block';
    }, 150);
  });
}

// ── DRAPERY PRICING CALCULATOR ───────────────────────────────
// Rates (Justin confirmed): $120/width unlined · $130/width lined (liner included, BO=LF same price)
// Goblet/Barrel: +$20/width · Interlining: +$10/width · Height >100": +$10/width per 10"
var D_RATE_UNLINED = 120;   // per cut/width — unlined
var D_RATE_LINED   = 130;   // per cut/width — liner included (BO or LF, same price)
var D_MIN_WIDTHS   = 2;
var D_FABRIC_WIDTH = 54;    // standard fabric width (inches)
var D_LEN_SURCHARGE = 10;   // per width per 10" over 100"
var D_INTERLINING_PER_WIDTH = 10; // interlining surcharge per width (on top of lined rate)
var D_FABRIC_PER_YD = 25;   // placeholder — fabric is custom per spec
var D_LINING_PER_YD = 10;   // when we supply lining (White or Cream) — same yardage as face fabric
var D_CORNICE_PER_FT = 38.50; // per linear ft (cost $25 ÷ 0.65)
var D_CORNICE_MIN_FT = 4;
var D_VALANCE_PER_FT = 38.50; // same as cornice
var D_TRIM_PER_FT   = 15;

function calcDrapePrice() {
  var isRippleDim = drapeState.pleat === 'Ripple Fold';
  var isPinchDim  = ['Pinch Pleat','French Pleat','2-Prong Tack','Tailored Pleat','Goblet Pleat','Barrel Pleat'].indexOf(drapeState.pleat) !== -1;
  var isRodPDim   = drapeState.pleat === 'Rod Pocket / Sheered Pocket';
  var w, h;
  if (isPinchDim) {
    w = parseFloat((document.getElementById('pp-w') || {}).value) || 0;
    h = parseFloat((document.getElementById('pp-l') || {}).value) || 0;
  } else if (isRodPDim) {
    w = parseFloat((document.getElementById('rp-w') || {}).value) || 0;
    h = parseFloat((document.getElementById('rp-l') || {}).value) || 0;
  } else if (isRippleDim) {
    w = parseFloat((document.getElementById('rf-w') || {}).value) || 0;
    h = parseFloat((document.getElementById('rf-l') || {}).value) || 0;
  } else {
    w = parseFloat((document.getElementById('d-exact-width') || {}).value) || 0;
    h = parseFloat((document.getElementById('d-exact-length') || {}).value) || 0;
  }
  if (!w) w = parseFloat((document.getElementById('d-exact-width') || {}).value) || 0;
  if (!h) h = parseFloat((document.getElementById('d-exact-length') || {}).value) || 0;
  var box = document.getElementById('drape-price-box');
  if (!box) return;
  if (!w || !h) { box.style.display = 'none'; return; }

  // Motorized track hardware → no customer-facing estimate
  var hwNeedBtn = document.querySelector('#grp-drape-hw-need .opt-btn.sel');
  var hwTypeBtn = document.querySelector('#grp-drape-hw-type .opt-btn.sel');
  var hwNeed = hwNeedBtn ? hwNeedBtn.textContent.trim() : '';
  var hwType = hwTypeBtn ? hwTypeBtn.textContent.trim() : '';
  if (hwNeed === 'I need hardware' && hwType === 'Motorized track') { _motorCustomMsg(box, 'Motorized Drapery'); return; }

  // Minimum dimension guard
  var minWarn = document.getElementById('d-min-warn');
  if (minWarn) {
    var tooNarrow = w > 0 && w < 10, tooShort = h > 0 && h < 10;
    if (tooNarrow && tooShort) {
      minWarn.textContent = '⚠ Both dimensions are below the 10″ minimum. Call (609) 742-1720 for specialty sizes.';
      minWarn.style.display = 'block';
    } else if (tooNarrow) {
      minWarn.textContent = '⚠ Minimum panel width is 10″. Call (609) 742-1720 to confirm.';
      minWarn.style.display = 'block';
    } else if (tooShort) {
      minWarn.textContent = '⚠ Minimum finished length is 10″. Call (609) 742-1720 to confirm.';
      minWarn.style.display = 'block';
    } else if (w > 200 || h > 150) {
      minWarn.textContent = w > 200
        ? '⚠ Width over 200″ exceeds our standard range — custom pricing required. Submit your order and we\'ll quote it.'
        : '⚠ Length over 150″ exceeds our standard range — custom pricing required. Submit your order and we\'ll quote it.';
      minWarn.style.display = 'block';
    } else {
      minWarn.style.display = 'none';
    }
  }

  // Oversized → custom quote (max 200″ wide × 150″ tall)
  if (w > 200 || h > 150) { _customSizeMsg(box, 'Custom Drapery', 200, 150); return; }

  // Fullness factor
  var isRipple   = drapeState.pleat === 'Ripple Fold';
  var isRodPocket = drapeState.pleat === 'Rod Pocket / Sheered Pocket';
  var fullness = 2.0;
  if (isRipple) {
    var rfBtn = document.querySelector('#grp-ripple-fullness .opt-btn.sel');
    var rfPct = rfBtn ? parseFloat(rfBtn.textContent) : 80;
    fullness = 1 + rfPct / 100;
  } else if (isRodPocket) {
    var rpBtn = document.querySelector('#grp-rp-fullness .opt-btn.sel');
    var rpTxt = rpBtn ? rpBtn.textContent.trim() : '2.0';
    fullness = rpTxt === 'Flat (1×)' ? 1.0 : (parseFloat(rpTxt) || 2.0);
  } else {
    var fBtn = document.querySelector('#grp-drape-fullness .opt-btn.sel');
    fullness = fBtn ? (parseFloat(fBtn.textContent) || 2.0) : 2.0;
  }

  // Widths
  var numWidths = Math.max(D_MIN_WIDTHS, Math.ceil((w * fullness) / D_FABRIC_WIDTH));

  // Lining — read from inline liner picker (grp-drape-liner)
  var lBtn = document.querySelector('#grp-drape-liner .opt-btn.sel');
  var lining = lBtn ? lBtn.textContent.trim() : 'No liner';
  var isLined = lining !== 'No liner';
  var interCheck = document.getElementById('d-interlining-check');
  var isInterlining = interCheck ? interCheck.checked : false;
  // Goblet and Barrel pleat carry a premium — $140/width unlined, $150/width lined
  var isSpecialtyPleat = drapeState.pleat === 'Goblet Pleat' || drapeState.pleat === 'Barrel Pleat';
  var ratePerWidth = isSpecialtyPleat
    ? (isLined ? 150 : 140)
    : (isLined ? D_RATE_LINED : D_RATE_UNLINED);

  // Length surcharge (over 100")
  var lenSurcharge = h > 100 ? Math.ceil((h - 100) / 10) * D_LEN_SURCHARGE : 0;
  var effectiveRate = ratePerWidth + lenSurcharge;
  var laborTotal = numWidths * effectiveRate;
  var interlineTotal = isInterlining ? numWidths * D_INTERLINING_PER_WIDTH : 0;

  // Fabric & lining (if we supply)
  var fabricCost = 0; var liningCost = 0; var yardsTotal = 0;
  if (drapeState.fabric === 'We supply the fabric') {
    yardsTotal = Math.ceil(((h + 16) / 36) * numWidths * 10) / 10;
    fabricCost = yardsTotal * D_FABRIC_PER_YD;
    if (isLined) liningCost = yardsTotal * D_LINING_PER_YD;
  }

  // Cornice
  var corniceTotal = 0;
  var corniceCheck = document.getElementById('d-cornice-check');
  if (corniceCheck && corniceCheck.checked) {
    var cw = parseFloat(document.getElementById('d-cornice-width').value) || 0;
    var cFt = Math.max(D_CORNICE_MIN_FT, cw / 12);
    corniceTotal = Math.ceil(cFt) * D_CORNICE_PER_FT;
    // Cornice trim
    if (document.getElementById('d-cornice-trim-check') && document.getElementById('d-cornice-trim-check').checked) {
      corniceTotal += Math.ceil(cFt) * D_TRIM_PER_FT;
    }
  }

  // Valance
  var valanceTotal = 0;
  var valanceCheck = document.getElementById('d-valance-check');
  if (valanceCheck && valanceCheck.checked) {
    var vw = parseFloat(document.getElementById('d-valance-width').value) || 0;
    var vFt = Math.max(1, vw / 12);
    valanceTotal = Math.ceil(vFt) * D_VALANCE_PER_FT;
    if (drapeState.fabric === 'We supply the fabric') {
      var vYards = Math.ceil(vFt * 0.75); // rough valance yardage estimate
      valanceTotal += vYards * D_FABRIC_PER_YD;
    }
    // Valance trim
    if (document.getElementById('d-valance-trim-check') && document.getElementById('d-valance-trim-check').checked) {
      valanceTotal += Math.ceil(vFt) * D_TRIM_PER_FT;
    }
  }

  // Trim on drapes
  var trimTotal = 0;
  var trimChecks = document.querySelectorAll('.drape-trim-check:checked');
  if (trimChecks.length) {
    var trimFt = 0;
    trimChecks.forEach(function(cb) {
      var loc = cb.getAttribute('data-loc');
      if (loc === 'lead')       trimFt += (h / 12) * (getOpt('grp-drape-panels') === 'Single panel' ? 1 : 2);
      if (loc === 'lead-return')trimFt += ((h + 4) / 12) * (getOpt('grp-drape-panels') === 'Single panel' ? 1 : 2);
      if (loc === 'top')        trimFt += w / 12;
      if (loc === 'hem')        trimFt += w / 12;
    });
    trimTotal = Math.ceil(trimFt) * D_TRIM_PER_FT;
  }

  // Liner from drape liner picker (when we supply fabric)
  var linerCost2 = 0;
  if (drapeState.fabric === 'We supply the fabric') {
    var dlBtn = document.querySelector('#grp-drape-liner .opt-btn.sel');
    if (dlBtn && dlBtn.textContent.indexOf('liner') !== -1) {
      linerCost2 = yardsTotal * D_LINING_PER_YD;
    }
    // Override liningCost with picker value (not from lining step)
    liningCost = linerCost2;
  }

  // Shipping estimate — FedEx/UPS from Philadelphia; min $75 for drapes
  var isShippingDrape = true;
  var dShipEst = 0;
  if (isShippingDrape) {
    var dShipBase = Math.ceil(numWidths * 12 / 5) * 5;
    dShipEst = Math.max(75, dShipBase);
  }

  var grandTotal = laborTotal + interlineTotal + fabricCost + liningCost + corniceTotal + valanceTotal + trimTotal + dShipEst;
  grandTotal = Math.max(200, grandTotal); // $200 minimum for custom drapery

  // Render
  var rows = '';
  var row = function(lbl, val) {
    rows += '<div style="display:flex;justify-content:space-between;font-size:12px;color:var(--text-dark);padding:4px 0;border-bottom:.5px solid var(--border-dark)">' +
      '<span>' + lbl + '</span><span style="color:var(--cream);font-weight:500">$' + val.toFixed(0) + '</span></div>';
  };
  row('Labor — ' + numWidths + ' widths × $' + effectiveRate + (lenSurcharge ? ' (incl. +$' + lenSurcharge + ' length)' : ''), laborTotal);
  if (interlineTotal) row('Interlining', interlineTotal);
  if (fabricCost)  row('Fabric est. (' + yardsTotal + ' yd × $25/yd)', fabricCost);
  if (liningCost)  row('Liner est. (' + yardsTotal + ' yd × $'+D_LINING_PER_YD+'/yd)', liningCost);
  if (trimTotal)   row('Trim', trimTotal);
  if (corniceTotal)row('Cornice', corniceTotal);
  if (valanceTotal)row('Valance', valanceTotal);
  if (dShipEst)    row('Shipping est. (FedEx/UPS from Philadelphia)', dShipEst);

  document.getElementById('drape-price-rows').innerHTML = '';
  // Fabric yardage note for drapes
  var dFabNote = document.getElementById('drape-fabric-yds-note');
  if (!dFabNote) {
    dFabNote = document.createElement('div');
    dFabNote.id = 'drape-fabric-yds-note';
    dFabNote.style.cssText = 'margin-top:8px;font-size:11px;background:rgba(201,169,110,.1);border:1px solid rgba(201,169,110,.2);border-radius:7px;padding:7px 10px;color:var(--cream);line-height:1.5';
    document.getElementById('drape-price-box').appendChild(dFabNote);
  }
  var dYardsPerWidth = Math.ceil((h + 16) / 36 * 4) / 4;
  var dTotalYards    = Math.ceil(dYardsPerWidth * numWidths * 4) / 4;
  var cornYds = 0;
  if (document.getElementById('d-cornice-check') && document.getElementById('d-cornice-check').checked) {
    var cw2 = parseFloat(document.getElementById('d-cornice-width').value) || 0;
    cornYds = cw2 ? Math.ceil((cw2/36)*1.2*4)/4 : 0;
  }
  var valYds = 0;
  if (document.getElementById('d-valance-check') && document.getElementById('d-valance-check').checked) {
    var vw2 = parseFloat(document.getElementById('d-valance-width').value) || 0;
    valYds = vw2 ? Math.ceil((vw2/36)*1.5*4)/4 : 0;
  }
  var totalFabYds = dTotalYards + cornYds + valYds;
  dFabNote.textContent = '🧵 Est. fabric needed: ~'+totalFabYds.toFixed(2)+' yards (drapes: '+dTotalYards+
    (cornYds?' · cornice: '+cornYds:'')+
    (valYds?' · valance: '+valYds:'')+
    ') — pattern repeats add more. Confirmed at order.';

  document.getElementById('drape-price-note').textContent = 'Pricing confirmed at order. Fill out the form to request your custom quote.';
  box.style.display = 'block';

  // Line-by-line estimate panel
  var drapeLines = [
    { label: 'Product',     value: (drapeState.pleat || 'Custom Drapery') },
    { label: 'Fabric',      value: (drapeState.fabric || '—') },
    { label: 'Lining',      value: (lining || '—') },
    { label: 'Widths',      value: numWidths + ' widths' },
    { label: 'Panels',      value: (panels || '—') + (panelSide !== '—' ? ' — ' + panelSide : '') }
  ];
  if (returnSz) drapeLines.push({ label: 'Return / Overlap', value: returnSz + '" / ' + overlapSz + '"' });
  if (fabricCost) drapeLines.push({ label: 'Fabric', value: '~' + yardsTotal + ' yds (est.)' });
  if (isInterlining) drapeLines.push({ label: 'Interlining', value: 'Yes' });
  if (dShipEst)  drapeLines.push({ label: 'Shipping est. (FedEx/UPS, Philadelphia)', value: '~$' + dShipEst });
  if (grandTotal === 200) drapeLines.push({ label: 'Note', value: '$200 minimum for custom drapery' });
  pbRenderEstimate('drape-price-box', drapeLines, grandTotal, '', function(checkout) {
    pbCollectItem(drapeState.pleat || 'Custom Drapery', drapeLines, grandTotal, false);
    pbOpenCart();
    if (checkout) setTimeout(function(){
      var f=document.getElementById('pb-cart-foot'); if(f) f.style.display='block';
    }, 150);
  });
}

function drapeToggleAddon(type, show) {
  var el = document.getElementById('d-' + type + '-opts');
  if (el) el.style.display = show ? 'block' : 'none';
  // Show recommendation banner if either cornice or valance is checked
  var corniceOn = document.getElementById('d-cornice-check') && document.getElementById('d-cornice-check').checked;
  var valanceOn = document.getElementById('d-valance-check') && document.getElementById('d-valance-check').checked;
  var rec = document.getElementById('drape-cv-rec');
  if (rec) rec.style.display = (corniceOn || valanceOn) ? 'block' : 'none';
  calcDrapePrice();
}
function drapeShowTrimSupply() {
  var anyChecked = document.querySelectorAll('.drape-trim-check:checked').length > 0;
  var row = document.getElementById('grp-drape-trim-supply');
  if (row) row.style.display = anyChecked ? 'flex' : 'none';
  calcDrapePrice();
}

function drapeToggleHardware(show) {
  var el = document.getElementById('drape-hardware-opts');
  if (el) el.style.display = show ? 'block' : 'none';
}
function drapeToggleSingle(show) {
  var el = document.getElementById('drape-single-opts');
  if (el) el.style.display = show ? 'block' : 'none';
}
// ── CORNICE & VALANCE PRICING ─────────────────────────────
// Cost $25/linear ft incl. returns ÷ 0.65 margin = $38.50/ft
var CV_PER_FT     = 38.50; // cost $25/LF ÷ 0.65
var CV_MIN_FT     = 4;
var CV_MIN_PRICE  = 154;   // 4 ft × $38.50
var CV_TRIM_PER_FT= 15;
var CV_FABRIC_YD  = 30;    // placeholder — fabric custom per spec

function cvSetType(type) {
  var isCorn = type === 'cornice';
  var note = document.getElementById('cv-type-note');
  if (note) note.textContent = isCorn
    ? 'Fabric-wrapped wood box valance. Custom quoted — submit for pricing.'
    : 'Fabric soft top treatment. Custom quoted.';

  // Swap hero photo + labels
  var img   = document.getElementById('cv-hero-img');
  var title = document.getElementById('cv-hero-title');
  var sub   = document.getElementById('cv-hero-sub');
  if (img) {
    img.style.opacity = '0';
    setTimeout(function() {
      img.src = isCorn
        ? '../images/thumbnails/specialty-soft-treatments.JPG'
        : '../images/thumbnails/specialty-valance.JPEG';
      img.style.objectPosition = isCorn ? 'center 40%' : 'center 30%';
      img.style.opacity = '1';
    }, 150);
  }
  if (title) title.textContent = isCorn ? 'Cornices' : 'Valances';
  if (sub)   sub.textContent   = isCorn
    ? 'Fabric-wrapped wood box valances. Custom quoted.'
    : 'Fabric soft top treatment. Custom quoted.';
  var cornFin = document.getElementById('cv-cornice-finish');
  var valFin  = document.getElementById('cv-valance-finish');
  var trimOpts= document.getElementById('corn-trim-opts');
  if (cornFin) cornFin.style.display = isCorn ? 'block' : 'none';
  if (valFin)  valFin.style.display  = isCorn ? 'none'  : 'block';
  // For valance, always show trim edges; for cornice, respect the toggle
  if (!isCorn && trimOpts) trimOpts.style.display = 'block';
  if (isCorn  && trimOpts) { trimOpts.style.display = 'none'; }
  calcCornice();
}
function cornToggleTrim(show) {
  var el = document.getElementById('corn-trim-opts');
  if (el) el.style.display = show ? 'block' : 'none';
}
function valToggleTrim(show) {
  var el = document.getElementById('val-trim-opts');
  if (el) el.style.display = show ? 'block' : 'none';
}

function _cvTrimFt(edgeClass, w, h, ret) {
  var ft = 0;
  document.querySelectorAll('.' + edgeClass + ':checked').forEach(function(cb) {
    var loc = cb.getAttribute('data-loc');
    if (loc === 'top')     ft += w / 12;
    if (loc === 'bottom')  ft += w / 12;
    if (loc === 'sides')   ft += (h / 12) * 2;
    if (loc === 'returns') ft += (ret / 12) * 2;
  });
  return ft;
}

function _cvPriceBox(boxId, rowsId, totalId, noteId, w, h, ret, trimClass, trimGrp, fabricGrp, isCorn) {
  var box = document.getElementById(boxId);
  if (!box) return;
  if (!w) { box.style.display = 'none'; return; }
  // Total linear footage includes width + both end returns, always round UP to full foot
  var rawFt   = (w + ret * 2) / 12;
  var ft      = Math.max(CV_MIN_FT, Math.ceil(rawFt));
  var labor   = Math.max(CV_MIN_PRICE, ft * CV_PER_FT);
  var selTrimBtn = document.querySelector('#' + trimGrp + ' .opt-btn.sel');
  var selTrimTxt = selTrimBtn ? selTrimBtn.textContent.trim() : '';
  var hasTrim  = selTrimTxt.indexOf('Applied trim') !== -1;
  var isDblWelt= selTrimTxt === 'Double self welt';
  var isSelfWelt = selTrimTxt === 'Self welt' || isDblWelt;
  var trimFt   = hasTrim ? _cvTrimFt(trimClass, w, h, ret) : 0;
  var trimCost = Math.ceil(trimFt) * CV_TRIM_PER_FT;
  var fabricSup = document.querySelector('#' + fabricGrp + ' .opt-btn.sel');
  var weSupply  = fabricSup && fabricSup.textContent.trim() === 'We supply fabric';
  var fabricCost = 0; var fabricYds = 0;
  if (weSupply) {
    // Cornice: wrap width + 2 returns + 2 depths (est 12" depth)
    // Valance: width + 2 returns + 1.5x fullness
    var perimInches = isCorn ? (w + ret*2 + 24) : (w + ret*2);
    fabricYds = Math.ceil((perimInches * (h + 12)) / 1296 * 4) / 4;
    fabricYds = Math.max(fabricYds, 1);
    // Add welt fabric: self welt ~0.25 yd per 10ft of perimeter; double welt ~0.5 yd
    if (isCorn && isSelfWelt) {
      var weltPerim = (w + ret * 2) / 12;
      var weltYds = Math.ceil(weltPerim * (isDblWelt ? 0.05 : 0.025) * 4) / 4;
      fabricYds = Math.round((fabricYds + weltYds) * 4) / 4;
    }
    fabricCost = fabricYds * CV_FABRIC_YD;
  }
  var heightSurcharge = 0;
  if (h > 15) {
    var heightMult = Math.ceil((h - 15) / 10);
    heightSurcharge = heightMult * 10 * ft;
  }
  var total = labor + trimCost + fabricCost + heightSurcharge;
  var rows = '';
  rows += '<div style="font-size:12px;color:var(--text-dark);padding:4px 0">' + ft + ' linear ft (incl. ends) × $' + CV_PER_FT.toFixed(2) + '/ft</div>';
  if (heightSurcharge) {
    var hMult = Math.ceil((h - 15) / 10);
    rows += '<div style="font-size:12px;color:var(--text-dark);padding:3px 0">Height over 15″ (+' + hMult + ' × $10/ft) <span style="color:var(--gold)">+$' + heightSurcharge.toFixed(2) + '</span></div>';
  }
  if (hasTrim) rows += '<div style="font-size:12px;color:var(--text-dark);padding:3px 0">' + selTrimTxt + '</div>';
  if (fabricCost) rows += '<div style="font-size:12px;color:var(--text-dark);padding:3px 0">We supply fabric (~' + fabricYds + ' yds est.)</div>';
  rows += '<div style="font-size:11px;font-weight:700;color:var(--cream);padding-top:8px;margin-top:6px;border-top:1px solid rgba(255,255,255,.1)">Est. total: $' + total.toFixed(2) + '</div>';
  document.getElementById(rowsId).innerHTML = rows;
  var noteEl = document.getElementById(noteId);
  if (noteEl) noteEl.textContent = 'Estimated pricing — confirmed at order. Fabric and trim pricing confirmed during consultation.';
  box.style.display = 'block';
}

function calcCornice() {
  var w   = parseFloat(document.getElementById('cv-corn-w').value) || 0;
  var h   = parseFloat(document.getElementById('cv-corn-h').value) || 8;
  var ret = parseFloat(document.getElementById('cv-corn-return').value) || 4;
  _cvPriceBox('corn-price-box','corn-price-rows','corn-price-total','corn-fabric-note', w, h, ret, 'corn-trim-edge','grp-corn-trim','grp-corn-fabric', true);
}
function calcValance() {
  var w   = parseFloat(document.getElementById('cv-val-w').value) || 0;
  var h   = parseFloat(document.getElementById('cv-val-h').value) || 14;
  var ret = parseFloat(document.getElementById('cv-val-return').value) || 4;
  _cvPriceBox('val-price-box','val-price-rows','val-price-total','val-fabric-note', w, h, ret, 'val-trim-edge','grp-val-trim','grp-val-fabric', false);
}

async function _stApiSubmit(formId, successId, name, email, phone, product, selections, notes) {
  var formEl = formId ? document.getElementById(formId) : null;
  var successEl = successId ? document.getElementById(successId) : null;
  var btn = formEl ? (formEl.querySelector('.btn-gold') || formEl.querySelector('button[onclick]')) : null;
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  try {
    var resp = await fetch('/api/quote', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, phone: phone, product: product, selections: selections, notes: notes, sourceUrl: window.location.href })
    });
    var data = {}; try { data = await resp.json(); } catch(e) {}
    if (!resp.ok) throw new Error(data.error || 'Server error');
    if (formEl) formEl.style.display = 'none';
    if (successEl) successEl.style.display = 'block';
  } catch(err) {
    if (btn) { btn.disabled = false; btn.textContent = 'Send Quote Request →'; }
    alert((err.message && err.message.length < 200 ? err.message + '\n\n' : '') +
      'Please email us at justin@blindznation.com or call (609) 742-1720.');
  }
}

async function submitCornice() {
  var name  = document.getElementById('cn-name').value.trim();
  var email = document.getElementById('cn-email').value.trim();
  var phone = document.getElementById('cn-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
  var selections = [
    { label: 'Width',        value: (document.getElementById('cv-corn-w').value||'—') + '"' },
    { label: 'Height',       value: (document.getElementById('cv-corn-h').value||'—') + '"' },
    { label: 'Return depth', value: (document.getElementById('cv-corn-return').value||'4') + '"' },
    { label: 'Finishing',    value: getOpt('grp-corn-trim') || '—' },
    { label: 'Fabric',       value: getOpt('grp-corn-fabric') || '—' },
    { label: 'Installation', value: pbInstallRequested(document.getElementById('corn-form')) ? 'Requested' : 'Not requested' }
  ];
  await _stApiSubmit('corn-form', 'corn-success', name, email, phone, 'Cornice', selections, document.getElementById('cn-notes').value.trim());
}

async function submitValanceCv() {
  var name  = document.getElementById('vn-name').value.trim();
  var email = document.getElementById('vn-email').value.trim();
  var phone = document.getElementById('vn-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
  var selections = [
    { label: 'Width',        value: (document.getElementById('cv-val-w').value||'—') + '"' },
    { label: 'Height',       value: (document.getElementById('cv-val-h').value||'—') + '"' },
    { label: 'Return depth', value: (document.getElementById('cv-val-return').value||'4') + '"' },
    { label: 'Finishing',    value: getOpt('grp-val-trim') || '—' },
    { label: 'Fabric',       value: getOpt('grp-val-fabric') || '—' }
  ];
  await _stApiSubmit('val-form', 'val-cv-success', name, email, phone, 'Valance', selections, document.getElementById('vn-notes').value.trim());
}

function rnShowTrimSupply() {
  var any = document.querySelectorAll('.rn-trim-check:checked').length > 0;
  var el = document.getElementById('grp-rn-trim-supply');
  if (el) el.style.display = any ? 'block' : 'none';
}
function romanToggleMountStyle(type) {
  var wf = document.getElementById('roman-waterfall-opts');
  var ob = document.getElementById('roman-offback-opts');
  if (wf) wf.style.display = type === 'waterfall' ? 'block' : 'none';
  if (ob) ob.style.display = type === 'offback'    ? 'block' : 'none';
}
function romanToggleBackValance(show) {
  var el = document.getElementById('roman-back-valance-opts');
  if (el) el.style.display = show ? 'block' : 'none';
}
function rnToggleBackValCustom(show) {
  var el = document.getElementById('rn-back-val-custom');
  if (el) el.style.display = show ? 'block' : 'none';
}
function rnToggleFrontValCustom(show) {
  var el = document.getElementById('rn-front-val-custom');
  if (el) el.style.display = show ? 'block' : 'none';
}

// ── ADD TO CART: DRAPERY ─────────────────────────────────
function addDrapeToCart(){
  var pleat=drapeState.pleat||'';
  if(!pleat){ alert('Please select a pleat style before adding to cart.'); return; }
  var panel=document.getElementById('drape-price-box-checkout-panel');
  if(panel&&panel._pbLines&&panel._pbEstimate){
    pbCollectItem(drapeState.pleat||'Custom Drapery',panel._pbLines,panel._pbEstimate,false);
    pbOpenCart();
  } else {
    calcDrapePrice();
    var p2=document.getElementById('drape-price-box-checkout-panel');
    if(p2&&p2._pbLines&&p2._pbEstimate){
      pbCollectItem(drapeState.pleat||'Custom Drapery',p2._pbLines,p2._pbEstimate,false);
      pbOpenCart();
    } else {
      alert('Please complete your drapery configuration (width, height, pleat style) to see a price before adding to cart.');
    }
  }
}

// ── ADD TO CART: ROMAN SHADES ────────────────────────────
function addRomanToCart(){
  var style=romanState.style||'';
  if(!style){ alert('Please select a roman shade style before adding to cart.'); return; }
  var panel=document.getElementById('roman-pricebox-checkout-panel');
  if(panel&&panel._pbLines&&panel._pbEstimate){
    pbCollectItem(romanState.style||'Roman Shade',panel._pbLines,panel._pbEstimate,false);
    pbOpenCart();
  } else {
    calcRomanPrice();
    var p2=document.getElementById('roman-pricebox-checkout-panel');
    if(p2&&p2._pbLines&&p2._pbEstimate){
      pbCollectItem(romanState.style||'Roman Shade',p2._pbLines,p2._pbEstimate,false);
      pbOpenCart();
    } else {
      alert('Please complete your roman shade configuration (width, height, style) to see a price before adding to cart.');
    }
  }
}

// ── SUBMIT: DRAPERY ───────────────────────────────────────
async function submitDrape() {
  var name  = document.getElementById('d-name').value.trim();
  var phone = document.getElementById('d-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
  // Warn if cornice or valance is added but not yet configured in CV tab
  var corniceOn = document.getElementById('d-cornice-check') && document.getElementById('d-cornice-check').checked;
  var valanceOn = document.getElementById('d-valance-check') && document.getElementById('d-valance-check').checked;
  if (corniceOn || valanceOn) {
    var what = corniceOn && valanceOn ? 'cornice and valance' : corniceOn ? 'cornice' : 'valance';
    var ok = confirm('You have a ' + what + ' added to this drapery.\n\nHave you already configured it in the Cornices & Valances tab?\n\nClick OK to submit anyway, or Cancel to go configure it first.');
    if (!ok) {
      var cvBtn = document.querySelector('.type-tab:nth-child(3)');
      if (cvBtn) switchTab('cornval', cvBtn);
      return;
    }
  }
  var pleat      = drapeState.pleat  || getOpt('pleat-cards') || '—';
  var fabric     = drapeState.fabric || '—';
  var lining     = getOpt('grp-drape-liner') || 'No liner';
  var interCb    = document.getElementById('d-interlining-check');
  var interlining = interCb && interCb.checked;
  var panels     = getOpt('grp-drape-panels');
  var panelSide  = panels === 'Single panel' ? getOpt('grp-drape-side') : '—';
  var returnSz   = document.getElementById('d-return').value || '4';
  var overlapSz  = document.getElementById('d-overlap').value || '4';
  // Fullness (standard pleat styles)
  var fullness   = getOpt('grp-drape-fullness') || '—';
  // Ripple fold specific
  var isRipple   = pleat === 'Ripple Fold';
  var rippleFull = isRipple ? getOpt('grp-ripple-fullness') : '—';
  var rippleHw   = isRipple ? getOpt('grp-ripple-hw') : '—';
  var rippleSnaps= isRipple ? getOpt('grp-ripple-snaps') : '—';
  var rippleJoin = isRipple ? getOpt('grp-ripple-join') : '—';
  var hwNeed     = getOpt('grp-drape-hardware');
  var hwType     = hwNeed === 'I need hardware' ? getOpt('grp-drape-hw-type') : 'N/A';
  var delivery   = 'Ship (UPS/FedEx from Huntingdon Valley PA)';
  var rfW = isRipple ? (document.getElementById('rf-w') || {}).value || '—' : null;
  var rfL = isRipple ? (document.getElementById('rf-l') || {}).value || '—' : null;
  var body = 'DRAPERY QUOTE REQUEST\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone
    + '\nEmail: ' + (document.getElementById('d-email').value.trim() || '—')
    + '\nAddress: ' + (document.getElementById('d-address').value.trim() || '—') + '\n\n'
    + 'Pleat style: ' + (drapeState.pleat || '—') + '\n'
    + 'Fabric: ' + fabric + '\n'
    + (fabric === 'We supply the fabric' ? 'Color: ' + (getOpt('grp-drape-color')||'—') + '  Liner: ' + lining + '\n' : '')
    + 'Lining: ' + lining + (interlining ? ' + Interlining' : '') + '\n'
    + 'Panels: ' + panels + (panelSide !== '—' ? ' — ' + panelSide : '') + '\n'
    + (!isRipple && pleat !== 'Rod Pocket / Sheered Pocket' && fullness !== '—' ? 'Fullness: ' + fullness + '\n' : '')
    + (pleat === 'Rod Pocket / Sheered Pocket' ? (function(){
        var casing = getOpt('grp-rp-casing') || '—';
        var header = getOpt('grp-rp-header') || 'No header';
        var placement = (document.querySelector('input[name="rp-placement"]:checked') || {}).value || '—';
        var rpFull = (function(){ var b=document.querySelector('#grp-rp-fullness .opt-btn.sel'); return b?b.textContent.trim():'2.0×'; })();
        return 'Casing: ' + casing + '  Header: ' + header + '  Placement: ' + placement + '  Fullness: ' + rpFull + '\n';
      }()) : '')
    + 'Return: ' + returnSz + '"  Overlap: ' + overlapSz + '"\n'
    + (isRipple ? 'Panel width: ' + rfW + '"  Panel length: ' + rfL + '"\n' +
       'Ripple fullness: ' + rippleFull + '  Hardware: ' + rippleHw + '  Snaps: ' + rippleSnaps + '\n' +
       'Join type: ' + rippleJoin + '\n' : '')
    + (function(){
        var trimSel = document.querySelectorAll('.drape-trim-check:checked');
        if (!trimSel.length) return '';
        var locs = Array.from(trimSel).map(function(c){return c.getAttribute('data-loc');}).join(', ');
        var ts = getOpt('grp-drape-trim-supply');
        return 'Trim locations: ' + locs + '  Supply: ' + (ts||'—') + '\n';
      }())
    + (document.getElementById('d-cornice-check') && document.getElementById('d-cornice-check').checked ?
        'Cornice width: ' + (document.getElementById('d-cornice-width').value||'—') + '"' +
        (document.getElementById('d-cornice-trim-check') && document.getElementById('d-cornice-trim-check').checked ? '  + trim\n' : '\n') : '')
    + (document.getElementById('d-valance-check') && document.getElementById('d-valance-check').checked ?
        'Valance width: ' + (document.getElementById('d-valance-width').value||'—') + '"' +
        (document.getElementById('d-valance-trim-check') && document.getElementById('d-valance-trim-check').checked ? '  + trim\n' : '\n') : '')
    + (document.getElementById('drape-price-total') && document.getElementById('drape-price-box').style.display !== 'none' ?
        'Estimate: ' + document.getElementById('drape-price-total').textContent + '\n' : '')
    + 'Hardware: ' + hwNeed + (hwType !== 'N/A' ? ' — ' + hwType : '') + '\n'
    + 'Width range: ' + document.getElementById('d-width').value
    + '\nExact width: ' + (document.getElementById('d-exact-width').value ? document.getElementById('d-exact-width').value + '"' : '—')
    + '\nFinished length: ' + (document.getElementById('d-exact-length').value ? document.getElementById('d-exact-length').value + '"' : '—') + '\n'
    + 'Delivery: ' + delivery + '\n'
    + pbInstallLine(document.getElementById('drape-form')) + '\n\n'
    + 'Notes:\n' + (document.getElementById('d-notes').value.trim() || 'None')
    + (function(){ var fu = document.querySelector('#drape-form .pb-fu-wrap input[type="file"]'); var n = fu && fu.files.length ? '\n\nFiles to send: ' + Array.from(fu.files).map(function(f){return f.name;}).join(', ') + '\n(Customer will email these to justin@blindznation.com)' : ''; return n; }());
  var email = document.getElementById('d-email').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
  var drapeSelections = [
    { label: 'Pleat style', value: drapeState.pleat || '—' },
    { label: 'Fabric', value: drapeState.fabric || '—' },
    { label: 'Lining', value: lining + (interlining ? ' + Interlining' : '') },
    { label: 'Panels', value: panels + (panelSide !== '—' ? ' — ' + panelSide : '') },
    { label: 'Width', value: (isRipple ? rfW : (document.getElementById('d-exact-width').value || '—')) + '"' },
    { label: 'Finished length', value: (isRipple ? rfL : (document.getElementById('d-exact-length').value || '—')) + '"' },
    { label: 'Return / Overlap', value: (document.getElementById('d-return').value || '4') + '" / ' + (document.getElementById('d-overlap').value || '4') + '"' },
    { label: 'Hardware', value: hwNeed + (hwType !== 'N/A' ? ' — ' + hwType : '') },
    { label: 'Delivery', value: delivery }
  ];
  var drapeNotes = document.getElementById('d-notes').value.trim();
  if (pbInstallRequested(document.getElementById('drape-form'))) drapeSelections.push({ label: 'Installation', value: 'Requested' });
  await _stApiSubmit('drape-form', 'drape-success', name, email, phone, 'Custom Drapery', drapeSelections, drapeNotes);
}

function _getDim(wholeId, fracId) {
  var whole = parseFloat((document.getElementById(wholeId) || {}).value) || 0;
  var frac  = parseFloat((document.getElementById(fracId)  || {}).value) || 0;
  return whole + frac || '';
}

// ── SUBMIT: ROMAN VALANCE ─────────────────────────────────
async function submitValance() {
  var name  = document.getElementById('val-name').value.trim();
  var email = document.getElementById('val-email').value.trim();
  var phone = document.getElementById('val-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
  var selections = [
    { label: 'Width',             value: (_getDim('rn-w','rn-w-frac') || '—') + '"' },
    { label: 'Height / drop',     value: (_getDim('rn-h','rn-h-frac') || '—') + '"' },
    { label: 'Number of folds',   value: document.getElementById('val-folds').value || '—' },
    { label: 'Fold section size', value: (document.getElementById('val-fold-size').value || '—') + '"' }
  ];
  await _stApiSubmit(null, 'valance-success', name, email, phone, 'Roman Valance',
    selections, document.getElementById('val-notes').value.trim());
}

// ── SUBMIT: ROMAN SHADES ──────────────────────────────────
async function submitRoman() {
  var name  = document.getElementById('rn-name').value.trim();
  var email = document.getElementById('rn-email').value.trim();
  var phone = document.getElementById('rn-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
  var w        = document.getElementById('rn-w').value;
  var h        = document.getElementById('rn-h').value;
  var qty      = document.getElementById('rn-qty').value;
  var tdbu        = getOpt('grp-roman-tdbu');
  var op          = getOpt('grp-roman-op');
  var isMotor     = op === 'Motorized';
  var liftType    = !isMotor ? 'Chain loop' : '—';
  var remotes     = isMotor ? getOpt('grp-roman-remotes') : '—';
  var channel     = isMotor ? getOpt('grp-roman-channel') : '—';
  var controlSide = getOpt('grp-roman-control');
  var lining      = getOpt('grp-roman-lining');
  var returnSz    = (document.getElementById('rn-return') || {}).value || '4';
  var mountStyle  = getOpt('grp-roman-mount-style') || 'Waterfall';
  var mountType   = getOpt('grp-roman-mount') || 'Inside mount';
  var frontVal    = mountStyle === 'Off Back' ? ((document.getElementById('rn-valance-front') || {}).value || '6') : '—';
  var backVal     = mountStyle === 'Off Back' ? getOpt('grp-roman-back-valance') : '—';
  var backValSz   = backVal === 'Add back valance' ? ((document.getElementById('rn-valance-back') || {}).value || '4') : '—';
  var delivery    = 'Ship (UPS/FedEx from Huntingdon Valley PA)';
  var body = 'ROMAN SHADE QUOTE REQUEST\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone
    + '\nEmail: ' + (document.getElementById('rn-email').value.trim() || '—')
    + '\nAddress: ' + (document.getElementById('rn-address').value.trim() || '—') + '\n\n'
    + 'Style: ' + (romanState.style || '—') + '\n'
    + 'TDBU: ' + tdbu + '\n'
    + 'Fabric: ' + (romanState.fabric || '—') + '\n'
    + (romanState.fabric === 'We supply the fabric' ? 'Color: ' + (getOpt('grp-roman-color')||'—') + '  Liner: ' + (getOpt('grp-roman-liner')||'No liner') + '\n' : '')
    + 'Lining: ' + lining + '\n'
    + 'Operation: ' + op + '\n'
    + (isMotor
        ? 'Remotes: ' + remotes + '\nChannel: ' + channel + '\n'
        : 'Lift type: ' + liftType + '\n')
    + 'Control side: ' + controlSide + '\n'
    + 'Return: ' + returnSz + '"\n'
    + 'Mount type: ' + mountType + '\n'
    + 'Mounting: ' + mountStyle
    + (mountStyle === 'Off Back' ? ' | Front valance: ' + frontVal + '" | Back valance: ' + (backVal === 'Add back valance' ? backValSz + '"' : 'No') : '') + '\n'
    + 'Qty: ' + qty
    + '\nWidth: ' + (w ? w + '"' : '—')
    + '  Finished length: ' + (h ? h + '"' : '—') + '\n'
    + 'Delivery: ' + delivery + '\n'
    + pbInstallLine(document.getElementById('roman-form')) + '\n\n'
    + 'Notes:\n' + (document.getElementById('rn-notes').value.trim() || 'None')
    + (function(){
        var trimSel = document.querySelectorAll('.rn-trim-check:checked');
        if (!trimSel.length) return '';
        var locs = Array.from(trimSel).map(function(c){return c.getAttribute('data-loc');}).join(', ');
        return '\nTrim: ' + locs + '  Supply: ' + (getOpt('grp-roman-trim-supply')||'—');
      }())
  var romanSelections = [
    { label: 'Style',        value: romanState.style || '—' },
    { label: 'TDBU',         value: getOpt('grp-roman-tdbu') || '—' },
    { label: 'Fabric',       value: romanState.fabric || '—' },
    { label: 'Lining',       value: getOpt('grp-roman-lining') || '—' },
    { label: 'Operation',    value: op },
    { label: 'Control side', value: controlSide },
    { label: 'Mount type',   value: mountType },
    { label: 'Mounting',     value: mountStyle },
    { label: 'Quantity',     value: qty },
    { label: 'Width',        value: (document.getElementById('rn-w').value||'—') + '"' },
    { label: 'Finished length', value: (document.getElementById('rn-h').value||'—') + '"' },
    { label: 'Delivery',     value: delivery }
  ];
  if (pbInstallRequested(document.getElementById('roman-form'))) romanSelections.push({ label: 'Installation', value: 'Requested' });
  await _stApiSubmit('roman-form', 'roman-success', name, email, phone, 'Custom Roman Shade',
    romanSelections, document.getElementById('rn-notes').value.trim());
}

async function handleSoftQuote(e) {
  e.preventDefault();
  const form = document.getElementById('soft-quote-form');
  const data = new FormData(form);
  const name  = (data.get('name') || '').trim();
  const email = (data.get('email') || '').trim();
  const phone = (data.get('phone') || '').trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
  const selections = [
    { label: 'Product',  value: data.get('product') || 'Not specified' },
    { label: 'Windows',  value: data.get('window_count') || 'Not specified' },
    { label: 'Timeline', value: data.get('timeline') || 'Not specified' }
  ];
  await _stApiSubmit('soft-quote-form', 'soft-quote-success', name, email, phone,
    'Soft Treatments', selections, data.get('notes') || '');
}