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
  ['rn-w','rn-h','rn-qty','rn-return','roman-clen-in','roman-ring-size','roman-ring-color','val-folds','val-fold-size'].forEach(function(id) {
    var el = document.getElementById(id); if (el) s[id] = el.value;
  });
  ['rn-w-frac','rn-h-frac'].forEach(function(id) {
    var el = document.getElementById(id); if (el) s[id] = el.value;
  });
  ['grp-roman-mount','grp-roman-tdbu','grp-roman-color','grp-roman-liner','grp-roman-lining-type',
   'grp-roman-rings','grp-roman-op','grp-roman-clen','grp-roman-motor-brand',
   'grp-roman-motor-power','grp-roman-motor-hardwire','grp-roman-control',
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
  ['rn-w','rn-h','rn-qty','rn-return','roman-clen-in','roman-ring-size','roman-ring-color','val-folds','val-fold-size','rn-w-frac','rn-h-frac'].forEach(function(id) {
    var el = document.getElementById(id); if (el && saved[id] !== undefined) el.value = saved[id];
  });
  ['grp-roman-mount','grp-roman-tdbu','grp-roman-color','grp-roman-liner','grp-roman-lining-type',
   'grp-roman-rings','grp-roman-op','grp-roman-clen','grp-roman-motor-brand',
   'grp-roman-motor-power','grp-roman-motor-hardwire','grp-roman-control',
   'grp-roman-trim-supply','grp-roman-mount-style','grp-roman-back-valance','grp-rn-back-val-h',
   'grp-rn-back-val-fabric','grp-rn-front-val-h','grp-val-lining','grp-val-fabric'].forEach(function(grp) {
    if (!saved[grp]) return;
    var grpEl = document.getElementById(grp); if (!grpEl) return;
    grpEl.querySelectorAll('.opt-btn').forEach(function(b) { b.classList.toggle('sel', b.textContent.trim() === saved[grp]); });
  });
  if (saved['rn-trim-checks']) {
    saved['rn-trim-checks'].forEach(function(item) {
      var cb = document.querySelector('.rn-trim-check[data-loc="' + item.loc + '"]');
      if (cb) cb.checked = item.checked;
    });
  }
  if (saved['roman-fabric-card']) {
    document.querySelectorAll('#roman-fabric-cards .fabric-card').forEach(function(c) {
      var h3 = c.querySelector('h3'); if (!h3) return;
      if (h3.textContent.trim() === saved['roman-fabric-card']) {
        var val = h3.textContent.trim() === 'We supply the fabric' ? 'We supply the fabric'
                : h3.textContent.trim() === 'I have my own fabric' ? 'Customer supplies fabric'
                : 'Not sure — needs consultation';
        selectFabric('roman', c, val);
      }
    });
  }
}

// ── Drape style state carryover ──────────────────────────
var _drapePleatCache = {};
function _drapeGetCurrentDims() {
  var pleat = drapeState.pleat;
  var w = 0, h = 0;
  if (pleat === 'Rod Pocket / Sheered Pocket') {
    w = parseFloat((document.getElementById('rp-w') || {}).value) || 0;
    h = parseFloat((document.getElementById('rp-l') || {}).value) || 0;
  } else if (pleat === 'Ripple Fold') {
    w = parseFloat((document.getElementById('rf-w') || {}).value) || 0;
    h = parseFloat((document.getElementById('rf-l') || {}).value) || 0;
  } else {
    w = parseFloat((document.getElementById('d-exact-width') || {}).value) || 0;
    h = parseFloat((document.getElementById('d-exact-length') || {}).value) || 0;
  }
  return { w: w, h: h };
}
function _drapeSetDims(targetPleat, dims) {
  if (!dims || (!dims.w && !dims.h)) return;
  var isRP = targetPleat === 'Rod Pocket / Sheered Pocket';
  var isRipple = targetPleat === 'Ripple Fold';
  if (isRP) {
    var rw = document.getElementById('rp-w'); if (rw && dims.w) rw.value = dims.w;
    var rl = document.getElementById('rp-l'); if (rl && dims.h) rl.value = dims.h;
  } else if (isRipple) {
    var rfw = document.getElementById('rf-w'); if (rfw && dims.w) rfw.value = dims.w;
    var rfl = document.getElementById('rf-l'); if (rfl && dims.h) rfl.value = dims.h;
  } else {
    var dw = document.getElementById('d-exact-width'); if (dw && dims.w) dw.value = dims.w;
    var dl = document.getElementById('d-exact-length'); if (dl && dims.h) dl.value = dims.h;
  }
}
function _drapeCaptureState(pleatName) {
  if (!pleatName) return;
  var s = { dims: _drapeGetCurrentDims() };
  ['grp-drape-fullness','grp-drape-panels','grp-drape-side','grp-drape-hw-need','grp-drape-hw-type',
   'grp-drape-color','grp-drape-liner','grp-ripple-fullness','grp-ripple-hw','grp-ripple-snaps',
   'grp-ripple-join','grp-pp-fullness','grp-rp-fullness','grp-rp-casing','grp-rp-header'].forEach(function(grp) {
    var sel = document.querySelector('#' + grp + ' .opt-btn.sel');
    if (sel) s[grp] = sel.textContent.trim();
  });
  var fabCard = document.querySelector('#drape-fabric-cards .fabric-card.sel');
  if (fabCard) { var h3 = fabCard.querySelector('h3'); if (h3) s['drape-fabric-card'] = h3.textContent.trim(); }
  _drapePleatCache[pleatName] = s;
}
function _drapeRestoreState(targetPleat, prevDims) {
  var saved = _drapePleatCache[targetPleat];
  if (!saved) { if (prevDims) _drapeSetDims(targetPleat, prevDims); return; }
  _drapeSetDims(targetPleat, saved.dims);
  ['grp-drape-fullness','grp-drape-panels','grp-drape-side','grp-drape-hw-need','grp-drape-hw-type',
   'grp-drape-color','grp-drape-liner','grp-ripple-fullness','grp-ripple-hw','grp-ripple-snaps',
   'grp-ripple-join','grp-pp-fullness','grp-rp-fullness','grp-rp-casing','grp-rp-header'].forEach(function(grp) {
    if (!saved[grp]) return;
    var grpEl = document.getElementById(grp); if (!grpEl) return;
    grpEl.querySelectorAll('.opt-btn').forEach(function(b) { b.classList.toggle('sel', b.textContent.trim() === saved[grp]); });
  });
  if (saved['drape-fabric-card']) {
    document.querySelectorAll('#drape-fabric-cards .fabric-card').forEach(function(c) {
      var h3 = c.querySelector('h3'); if (!h3) return;
      if (h3.textContent.trim() === saved['drape-fabric-card']) {
        var val = h3.textContent.trim() === 'We supply the fabric' ? 'We supply the fabric'
                : h3.textContent.trim() === 'I have my own fabric' ? 'Customer supplies fabric'
                : 'Not sure — needs consultation';
        selectFabric('drape', c, val);
      }
    });
  }
}

var _RIPPLE_STYLES    = ['Ripple Fold'];
var _NO_FULLNESS      = ['Grommet / Eyelet', 'Box Pleat', 'Goblet Pleat', 'Barrel Pleat']; // these use fixed 2.5× fullness
var _ppProngs = 3; // current prong count for pinch pleat (2 or 3, updated by fullness selection)

function selectPleat(el, val) {
  if (drapeState.pleat && drapeState.pleat !== val) _drapeCaptureState(drapeState.pleat);
  var _prevDims = drapeState.pleat ? _drapeGetCurrentDims() : null;

  document.querySelectorAll('#pleat-cards .opt-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  drapeState.pleat = val;

  var isPinch     = val === 'Pinch Pleat';
  var isRodPocket = val === 'Rod Pocket / Sheered Pocket';
  var isRipple    = _RIPPLE_STYLES.indexOf(val) !== -1;
  var noFull      = _NO_FULLNESS.indexOf(val) !== -1;

  // Show / hide pinch sub-options
  var subopts = document.getElementById('pinch-subopts');
  if (subopts) {
    subopts.style.display = isPinch ? 'block' : 'none';
    if (!isPinch) document.querySelectorAll('#pinch-subopts .opt-card').forEach(c => c.classList.remove('sel'));
  }

  // Show / hide rod pocket sub-options
  var rpOpts = document.getElementById('rodpocket-subopts');
  if (rpOpts) rpOpts.style.display = isRodPocket ? 'block' : 'none';

  // Standard dims (d-exact-width/length) — used by pinch + standard pleats; hidden for rod pocket & ripple (they have their own dim inputs)
  var stdDims = document.getElementById('drape-std-dims');
  if (stdDims) stdDims.style.display = (isRodPocket || isRipple) ? 'none' : '';

  // Ripple fold panel-size block — shown only for ripple
  var rippleDims = document.getElementById('ds-ripple-dims');
  if (rippleDims) rippleDims.style.display = isRipple ? '' : 'none';

  // Overlaps & returns — pinch + standard pleats only (hidden for ripple track system & rod pocket)
  var stdReturns = document.getElementById('drape-std-returns');
  if (stdReturns) stdReturns.style.display = (isRipple || isRodPocket) ? 'none' : '';

  // Ripple fullness + butt-master/overlap + hardware blocks — shown only for ripple
  var rippleFullness = document.getElementById('ds-ripple-fullness');
  if (rippleFullness) rippleFullness.style.display = isRipple ? '' : 'none';
  var rippleExtra = document.getElementById('ds-ripple-extra');
  if (rippleExtra) rippleExtra.style.display = isRipple ? '' : 'none';

  // Hem sizes — pinch + standard pleats only (hidden for ripple & rod pocket)
  var hemBlock = document.getElementById('drape-hems');
  if (hemBlock) hemBlock.style.display = (isRipple || isRodPocket) ? 'none' : '';

  // Fixed fullness note for Box/Goblet/Barrel
  var fixedFullNote = document.getElementById('drape-fixed-fullness-note');
  if (fixedFullNote) fixedFullNote.style.display = noFull && val !== 'Grommet / Eyelet' ? 'block' : 'none';

  // Box pleat size (Box Pleat only)
  var boxOpts = document.getElementById('box-pleat-opts');
  if (boxOpts) boxOpts.style.display = (val === 'Box Pleat') ? 'block' : 'none';

  // Grommet details — size / color / who supplies (Grommet / Eyelet only)
  var gromOpts = document.getElementById('grommet-opts');
  if (gromOpts) gromOpts.style.display = (val === 'Grommet / Eyelet') ? 'block' : 'none';

  // Step 4: hide trim and cornice for rod pocket
  var trimSec = document.getElementById('drape-trim-section');
  var corniceSec = document.getElementById('drape-cornice-section');
  if (trimSec) trimSec.style.display = isRodPocket ? 'none' : '';
  if (corniceSec) corniceSec.style.display = isRodPocket ? 'none' : '';

  // Step 4: rod pocket = single panel only; restore pair for other styles
  var pairBtn = document.getElementById('drape-pair-btn');
  if (pairBtn) pairBtn.style.display = isRodPocket ? 'none' : '';
  if (isRodPocket) {
    // Force single panel selection
    var singleBtn = document.getElementById('drape-single-btn');
    if (singleBtn) { selOpt(singleBtn, 'grp-drape-panels'); drapeToggleSingle(true); }
  }

  // Pinch: auto-init default fullness (2.5× → 3-prong tack top)
  if (isPinch) {
    drapeFullnessHint('2.5');
  }

  _drapeRestoreState(val, _prevDims);
  calcDrapePrice();

  // Scroll to reveal the sub-options panel that just appeared
  setTimeout(function() {
    var target = isRodPocket ? document.getElementById('rodpocket-subopts')
               : isRipple ? document.getElementById('ds-ripple-dims')
               : document.getElementById('drape-std-dims');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 120);
}

function drapeFullnessHint(val) {
  var f = parseFloat(val);
  var is2prong = f <= 2.0;
  _ppProngs = is2prong ? 2 : 3;
  var prong = String(_ppProngs);

  // Sync fullness button selection (for programmatic calls)
  document.querySelectorAll('#grp-pp-fullness .opt-btn').forEach(function(b) {
    b.classList.toggle('sel', parseFloat(b.textContent) === f);
  });

  // Update tack card images, names, descriptions
  var topImg  = document.getElementById('pp-tack-top-img');
  var topName = document.getElementById('pp-tack-top-name');
  var topDesc = document.getElementById('pp-tack-top-desc');
  var botImg  = document.getElementById('pp-tack-bot-img');
  var botName = document.getElementById('pp-tack-bot-name');
  var botDesc = document.getElementById('pp-tack-bot-desc');
  if (topImg)  topImg.src  = '../images/pleat-styles/pinch-' + prong + 'prong-tack-top.png';
  if (topName) topName.textContent = prong + '-Prong Tack Top';
  if (topDesc) topDesc.textContent = is2prong ? 'Classic 2-prong, tack at heading' : 'Fuller triple pleat at heading';
  if (botImg)  botImg.src  = '../images/pleat-styles/pinch-' + prong + 'prong-tack-bottom.png';
  if (botName) botName.textContent = prong + '-Prong Tack Bottom';
  if (botDesc) botDesc.textContent = is2prong ? '2-prong, tack at base of pleat' : 'Full triple pleat, tack at base';

  // Auto-select tack top (default)
  var topCard = document.getElementById('pp-tack-top');
  var botCard = document.getElementById('pp-tack-bot');
  if (topCard) topCard.classList.add('sel');
  if (botCard) botCard.classList.remove('sel');
  drapeState.pleat = 'Pinch Pleat — ' + prong + '-Prong Tack Top';

  // Show recommendation note
  var rec = document.getElementById('pp-fullness-rec');
  if (rec) {
    rec.style.display = 'block';
    if (is2prong) {
      rec.style.cssText = 'display:block;margin-top:8px;font-size:12px;padding:8px 12px;border-radius:7px;background:#EAF3DE;color:#27500A';
      rec.textContent = '2-prong tack top selected for ' + val + '× fullness.';
    } else {
      rec.style.cssText = 'display:block;margin-top:8px;font-size:12px;padding:8px 12px;border-radius:7px;background:var(--gold-mid);color:#0A4A42';
      rec.textContent = '3-prong tack top selected for ' + val + '× fullness — rich, full look.';
    }
  }
}

function drapeRippleHwHint(hw) {
  var note = document.getElementById('ripple-hw-note');
  if (!note) return;
  var msgs = { graber: 'Graber ripple fold system selected.', kirsch: 'Kirsch ripple fold system selected.', idk: "No problem — we'll use standard Kirsch hardware." };
  note.textContent = msgs[hw] || '';
  note.style.color = hw === 'idk' ? 'var(--gold)' : '#555';
}

function selectPinchDetail(el, pos) {
  var topCard = document.getElementById('pp-tack-top');
  var botCard = document.getElementById('pp-tack-bot');
  if (topCard) topCard.classList.remove('sel');
  if (botCard) botCard.classList.remove('sel');
  el.classList.add('sel');
  var prong = String(_ppProngs);
  var tack = pos === 'top' ? 'Tack Top' : 'Tack Bottom';
  drapeState.pleat = 'Pinch Pleat — ' + prong + '-Prong ' + tack;
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

  ['step-roman-3','step-roman-4','step-roman-5','step-roman-6'].forEach(function(id){
    var s = document.getElementById(id);
    if (s) s.style.display = hideSteps ? 'none' : '';
  });

  _rnRestoreState(val, _prevRnState);
  calcRoman();

  // Auto-scroll to the revealed content
  setTimeout(function() {
    var target = isValance  ? document.getElementById('valance-config')
               : document.getElementById('roman-step-dims');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 150);
}

function romanChainCheck() {
  var len  = parseFloat(document.getElementById('roman-clen-in').value) || 0;
  var h    = _getDim('rn-h', 'rn-h-frac') || 0;
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
  var cd = document.getElementById('roman-cordless-opts');
  var mn = document.getElementById('roman-manual-opts');
  var mo = document.getElementById('roman-motor-opts');
  var ctrl = document.getElementById('roman-control-wrap');
  if (cd) cd.style.display = type === 'cordless'  ? 'block' : 'none';
  if (mn) mn.style.display = type === 'manual'    ? 'block' : 'none';
  if (mo) mo.style.display = type === 'motorized' ? 'block' : 'none';
  // Control side applies to chain + motor only — cordless has no control side
  if (ctrl) ctrl.style.display = (type === 'cordless') ? 'none' : 'block';
  calcRoman();
}

// Motorized: brand selection. Norman → redirect to its own form; others → power options.
function romanMotorBrand(brand) {
  var isNorman = brand === 'norman';
  var rd = document.getElementById('roman-norman-redirect');
  var pw = document.getElementById('roman-motor-power');
  if (rd) rd.style.display = isNorman ? 'block' : 'none';
  if (pw) pw.style.display = isNorman ? 'none'  : 'block';
  calcRoman();
}

// Motorized power source: Hardwired reveals the low-voltage / 110V choice.
function romanMotorPower(p) {
  var hw = document.getElementById('roman-motor-hardwire');
  if (hw) hw.style.display = (p === 'hardwired') ? 'block' : 'none';
  calcRoman();
}

// Hand off to the dedicated Norman Centerpiece Roman form, carrying size + qty.
function romanGoNorman() {
  var w = _getDim('rn-w', 'rn-w-frac') || '';
  var h = _getDim('rn-h', 'rn-h-frac') || '';
  var qtyEl = document.getElementById('rn-qty');
  var qty = qtyEl ? (parseInt(qtyEl.value) || 1) : 1;
  var p = new URLSearchParams();
  if (w) p.set('w', w);
  if (h) p.set('h', h);
  p.set('qty', qty);
  var q = p.toString();
  window.location.href = 'norman-centerpiece-roman.html' + (q ? '?' + q : '');
}
function selectFabric(tab, el, val) {
  var container = tab === 'drape' ? '#drape-fabric-cards' : '#roman-fabric-cards';
  document.querySelectorAll(container + ' .fabric-card').forEach(c => c.classList.remove('sel'));
  el.classList.add('sel');
  var weSupply = val === 'We supply the fabric';
  var custSupply = val === 'Customer supplies fabric';
  if (tab === 'drape') {
    drapeState.fabric = val;
    var dp = document.getElementById('drape-fabric-detail');
    if (dp) dp.style.display = weSupply ? 'block' : 'none';
    var cn = document.getElementById('drape-cust-fabric-notice');
    if (cn) cn.style.display = custSupply ? 'block' : 'none';
    // (lining color section visibility is driven by the lining-type selector, not the fabric path)
    calcDrapePrice();
  } else {
    romanState.fabric = val;
    var rp = document.getElementById('roman-fabric-detail');
    if (rp) rp.style.display = weSupply ? 'block' : 'none';
    calcRoman();
  }
}

function drapeLinerToggle() {
  var lining = getOpt('grp-drape-liner');
  var weSupply = document.getElementById('drape-liner-supply-note');
  var custSupply = document.getElementById('drape-liner-customer-note');
  if (weSupply) weSupply.style.display = (lining === 'White liner' || lining === 'Cream liner') ? 'block' : 'none';
  if (custSupply) custSupply.style.display = (lining === 'I supply lining') ? 'block' : 'none';
}
// Lining light-control type (chosen before fabric). Shows/hides the lining-color section.
function setDrapeLiningType(type, el) {
  drapeState.liningType = type;
  document.querySelectorAll('#grp-drape-lining-type .opt-btn').forEach(function(b){ b.classList.remove('sel'); });
  el.classList.add('sel');
  var sec = document.getElementById('drape-lining-section');
  if (sec) sec.style.display = (type === 'unlined') ? 'none' : 'block';
  calcDrapePrice();
}
// Full lining description ("Unlined" / "Light Filtering — White liner" / …) for pricing + quote.
function drapeLiningLabel() {
  var t = drapeState.liningType || 'unlined';
  if (t === 'unlined') return 'Unlined';
  var typeLbl = (t === 'blackout') ? 'Blackout' : 'Light Filtering';
  return typeLbl + ' — ' + (getOpt('grp-drape-liner') || 'White liner');
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

// Flat/Relaxed: $40/sqft. Permanently Pleated: $50/sqft (extra fabric + labor).
// Permanently Pleated yardage uses height × 3 before calculation.
var RN_RATES = {
  'Flat Roman':               40,
  'Permanently Pleated Roman':50,
  'Relaxed Roman':            40,
  'Roman Valance':            40
};

function rnGetRate() {
  var style = romanState.style || 'Flat Roman';
  return RN_RATES[style] || 40;
}

function adjRomanQty(d) {
  var el = document.getElementById('rn-qty');
  el.value = Math.max(1, (parseInt(el.value) || 1) + d);
  calcRoman();
}

function romanLinerToggle() {
  var lining = getOpt('grp-roman-liner');
  var weNote = document.getElementById('roman-liner-supply-note');
  var custNote = document.getElementById('roman-liner-customer-note');
  if (weNote) weNote.style.display = (lining === 'White liner' || lining === 'Cream liner') ? 'block' : 'none';
  if (custNote) custNote.style.display = (lining === 'I supply lining') ? 'block' : 'none';
}
// Lining light-control type (chosen before fabric). Shows/hides the lining-color section.
function setRomanLiningType(type, el) {
  romanState.liningType = type;
  document.querySelectorAll('#grp-roman-lining-type .opt-btn').forEach(function(b){ b.classList.remove('sel'); });
  el.classList.add('sel');
  var sec = document.getElementById('roman-lining-section');
  if (sec) sec.style.display = (type === 'unlined') ? 'none' : 'block';
  calcRoman();
}
// Full lining description ("Unlined" / "Blackout — Cream liner" / …) for pricing + quote.
function romanLiningLabel() {
  var t = romanState.liningType || 'unlined';
  if (t === 'unlined') return 'Unlined';
  var typeLbl = (t === 'blackout') ? 'Blackout' : 'Light Filtering';
  return typeLbl + ' — ' + (getOpt('grp-roman-liner') || 'White liner');
}
function romanRingsToggle() {
  var choice = getOpt('grp-roman-rings');
  var opts = document.getElementById('roman-ring-opts');
  var custNote = document.getElementById('roman-ring-customer-note');
  if (opts) opts.style.display = (choice === 'We supply rings') ? 'block' : 'none';
  if (custNote) custNote.style.display = (choice === 'I supply rings') ? 'block' : 'none';
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
  var w   = _getDim('rn-w', 'rn-w-frac');
  var h   = _getDim('rn-h', 'rn-h-frac');
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
  var isPleated = romanState.style === 'Permanently Pleated Roman';
  var sqft     = (w / 12) * (h / 12);
  var perShade = Math.max(rnGetMin(), sqft * rate);
  var laborTotal = perShade * qty;
  // Permanently pleated yardage uses 3× height (extra fabric for folds)
  var rnFabricH = isPleated ? h * 3 : h;

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

  // Fabric yardage — permanently pleated uses 3× height for folds
  var cutsPerShade = Math.max(1, Math.ceil(w / 54));
  var yardsPerCut  = Math.ceil((rnFabricH + 16) / 36 * 4) / 4;
  var fabricYds    = cutsPerShade * yardsPerCut * qty;
  // Lining yardage = same as face fabric yardage
  var liningYdsRn  = fabricYds;

  // Fabric & liner cost if we supply
  var fabricCost = 0; var linerCost = 0;
  var isRomanLined = (romanState.liningType && romanState.liningType !== 'unlined');
  if (romanState.fabric === 'We supply the fabric') {
    fabricCost = fabricYds * 25;
    var linerVal = getOpt('grp-roman-liner') || 'White liner';
    if (isRomanLined && (linerVal === 'White liner' || linerVal === 'Cream liner')) {
      linerCost = liningYdsRn * D_LINING_PER_YD;
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
    fabNote.style.cssText = 'margin-top:8px;font-size:11px;background:rgba(45,224,193,.1);border:1px solid rgba(45,224,193,.2);border-radius:7px;padding:7px 10px;color:var(--cream);line-height:1.5';
    box.appendChild(fabNote);
  }
  fabNote.textContent = '🧵 Est. fabric needed: ~' + fabricYds.toFixed(2) + ' yards' + (cutsPerShade > 1 ? ' ('+cutsPerShade+' widths)' : '') + ' — pattern repeats will add more. Confirmed at order.';

  // Line-by-line estimate panel
  var rnLines = [
    { label: 'Product',        value: (romanState.style || 'Roman Shade') },
    { label: 'Size',           value: w + '″ W × ' + h + '″ finished length' },
    { label: 'Quantity',       value: qty + ' shade(s)' },
    { label: 'Fabric',         value: (romanState.fabric || '—') },
    { label: 'Lining',         value: romanLiningLabel() },
    { label: 'Operation',      value: (getOpt('grp-roman-op') || '—') },
    { label: 'Mounting',       value: (getOpt('grp-roman-mount-style') || '—') }
  ];
  if (getOpt('grp-roman-op') === 'Motorized') {
    var rnBrand = getOpt('grp-roman-motor-brand') || 'TBD at order';
    rnLines.push({ label: 'Motor brand', value: rnBrand });
    if (rnBrand !== 'Norman') {
      var rnPwr = getOpt('grp-roman-motor-power');
      if (rnPwr) rnLines.push({ label: 'Power', value: rnPwr });
      if (rnPwr === 'Hardwired') {
        var rnHw = getOpt('grp-roman-motor-hardwire');
        if (rnHw) rnLines.push({ label: 'Hardwired type', value: rnHw });
      }
    }
  }
  if (trimTotal) rnLines.push({ label: 'Trim', value: getOpt('grp-roman-trim') || 'Selected' });
  if (shipEst)   rnLines.push({ label: isRomanOversized ? 'Oversized freight est. (>96″ wide)' : 'Shipping est. (FedEx/UPS, Philadelphia)', value: '~$' + shipEst });
  var rnAtMin = perShade === rnGetMin();
  if (rnAtMin) rnLines.push({ label: 'Note', value: 'At ' + (isPleated ? 'pleated' : 'flat/relaxed') + ' minimum — $' + rnGetMin() + '/shade' });
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
// Width = ceil((rod width × fullness) ÷ 54), min 2
var D_RATE_UNLINED = 120;   // per cut/width — unlined
var D_RATE_LINED   = 130;   // per cut/width — liner included (BO or LF, same price)
var D_MIN_WIDTHS   = 2;
var D_FABRIC_WIDTH = 54;    // standard fabric width (inches)
var D_LEN_SURCHARGE = 10;   // per width per 10" over 100"
var D_INTERLINING_PER_WIDTH = 10; // interlining surcharge per width (on top of lined rate)
var D_LINING_PER_YD = 10;   // when we supply lining (White or Cream) — same yardage as face fabric
var D_FABRIC_PER_YD = 25;   // placeholder — face fabric custom per spec
var D_CORNICE_PER_FT = 38.50; // per linear ft (cost $25 ÷ 0.65)
var D_CORNICE_MIN_FT = 4;
var D_VALANCE_PER_FT = 38.50; // same as cornice
var D_TRIM_PER_FT   = 15;

function _getDim(wholeId, fracId) {
  var whole = parseFloat(document.getElementById(wholeId).value) || 0;
  var frac  = parseFloat((document.getElementById(fracId) || {}).value) || 0;
  return whole + frac;
}
function calcDrapePrice() {
  var isPinchPleat = drapeState.pleat === 'Pinch Pleat' || (drapeState.pleat && drapeState.pleat.indexOf('Pinch Pleat') === 0);
  var isRodPocket  = drapeState.pleat === 'Rod Pocket / Sheered Pocket';
  var isRippleDim  = drapeState.pleat === 'Ripple Fold';
  var w, h;
  if (isRodPocket) {
    w = _getDim('rp-w', 'rp-w-frac');
    h = _getDim('rp-l', 'rp-l-frac');
  } else if (isRippleDim) {
    w = parseFloat((document.getElementById('rf-w') || {}).value) || 0;
    h = parseFloat((document.getElementById('rf-l') || {}).value) || 0;
  } else {
    // Pinch + standard pleats share the same dim inputs
    w = _getDim('d-exact-width',  'd-exact-width-frac');
    h = _getDim('d-exact-length', 'd-exact-length-frac');
  }
  var qty = parseInt((document.getElementById('drape-qty') || {}).value) || 1;
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
  var minWarnId = isRodPocket ? 'rp-min-warn' : 'd-min-warn';
  var minWarn = document.getElementById(minWarnId);
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
  var fullness = 2.0;
  if (isRipple) {
    var rfBtn = document.querySelector('#grp-ripple-fullness .opt-btn.sel');
    var rfPct = rfBtn ? parseFloat(rfBtn.textContent) : 80;
    fullness = 1 + rfPct / 100;
  } else if (isRodPocket) {
    var rpBtn = document.querySelector('#grp-rp-fullness .opt-btn.sel');
    var rpTxt = rpBtn ? rpBtn.textContent.trim() : '2.0';
    fullness = rpTxt === 'Flat (1×)' ? 1.0 : (parseFloat(rpTxt) || 2.0);
  } else if (isPinchPleat) {
    var ppBtn = document.querySelector('#grp-pp-fullness .opt-btn.sel');
    fullness = ppBtn ? (parseFloat(ppBtn.textContent) || 2.5) : 2.5;
  } else if (_NO_FULLNESS.indexOf(drapeState.pleat) !== -1) {
    // Grommet/Eyelet, Box, Goblet & Barrel pleats have no fullness selector — fixed 2.5× standard
    fullness = 2.5;
  } else {
    var fBtn = document.querySelector('#grp-drape-fullness .opt-btn.sel');
    fullness = fBtn ? (parseFloat(fBtn.textContent) || 2.0) : 2.0;
  }

  // Widths
  var numWidths = Math.max(D_MIN_WIDTHS, Math.ceil((w * fullness) / D_FABRIC_WIDTH));

  // Lining — type chosen before fabric (unlined/lf/blackout); color from inline picker
  var liningType = drapeState.liningType || 'unlined';
  var isLined = liningType !== 'unlined';
  var lColorBtn = document.querySelector('#grp-drape-liner .opt-btn.sel');
  var lColor = lColorBtn ? lColorBtn.textContent.trim() : 'White liner';
  var lining = drapeLiningLabel();
  var interCheck = document.getElementById('d-interlining-check');
  var isInterlining = interCheck ? interCheck.checked : false;
  // Goblet and Barrel pleat: +$20/width over base rate
  var isSpecialtyPleat = drapeState.pleat === 'Goblet Pleat' || drapeState.pleat === 'Barrel Pleat';
  var ratePerWidth = isSpecialtyPleat
    ? (isLined ? 150 : 140)
    : (isLined ? D_RATE_LINED : D_RATE_UNLINED);

  // Length surcharge (over 100")
  var lenSurcharge = h > 100 ? Math.ceil((h - 100) / 10) * D_LEN_SURCHARGE : 0;
  var effectiveRate = ratePerWidth + lenSurcharge;
  var laborTotal = numWidths * effectiveRate;
  var interlineTotal = isInterlining ? numWidths * D_INTERLINING_PER_WIDTH : 0;

  // Face fabric (when we supply)
  var fabricCost = 0; var yardsTotal = 0;
  if (drapeState.fabric === 'We supply the fabric') {
    yardsTotal = Math.ceil(((h + 16) / 36) * numWidths * 10) / 10;
    fabricCost = yardsTotal * D_FABRIC_PER_YD;
  }
  // Lining fabric — $10/yd when we supply White or Cream; same yardage as face fabric
  var liningYards = Math.ceil(((h + 16) / 36) * numWidths * 10) / 10;
  var weSupplyLiner = (lColor === 'White liner' || lColor === 'Cream liner');
  var liningCost = (isLined && weSupplyLiner) ? liningYards * D_LINING_PER_YD : 0;

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

  // Shipping estimate — FedEx/UPS from Philadelphia; min $75 for drapes
  var isShippingDrape = true;
  var dShipEst = 0;
  if (isShippingDrape) {
    // one shipment sized to the TOTAL number of widths across all sets
    var dShipBase = Math.ceil(numWidths * qty * 12 / 5) * 5;
    dShipEst = Math.max(75, dShipBase);
  }

  // Per-window costs (labor, fabric, lining, trim) scale with quantity; the $200 minimum
  // applies per set. Cornice/valance are single shared pieces and shipping is one estimate —
  // added ONCE, not multiplied by quantity.
  var perSetTotal = laborTotal + interlineTotal + fabricCost + liningCost + trimTotal;
  perSetTotal = Math.max(200, perSetTotal); // $200 minimum per drapery set
  var grandTotal = perSetTotal * qty + corniceTotal + valanceTotal + dShipEst;

  var panels    = getOpt('grp-drape-panels') || '—';
  var panelSide = panels === 'Single panel' ? (getOpt('grp-drape-side') || '—') : '—';
  var returnSz  = (document.getElementById('d-return') || {}).value || '4';
  var overlapSz = isRodPocket ? '—' : ((document.getElementById('d-overlap') || {}).value || '3');
  var sideHem   = (document.getElementById('d-side-hem') || {}).value || '2';
  var bottomHem = (document.getElementById('d-bottom-hem') || {}).value || '4';
  var rippleJoin = isRippleDim ? (getOpt('grp-ripple-join') || '—') : '';
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

  box.style.display = 'block';

  var drapeLines = [
    { label: 'Product',   value: (drapeState.pleat || 'Custom Drapery') },
    { label: 'Size',      value: w + '″ W × ' + h + '″ finished length' },
    { label: 'Quantity',  value: qty + ' set(s)' },
    { label: 'Panels',    value: (panels || '—') + (panelSide !== '—' ? ' — ' + panelSide : '') },
    { label: 'Widths',    value: numWidths + ' widths × $' + effectiveRate + (lenSurcharge ? ' (incl. length surcharge)' : '') + (qty > 1 ? ' × ' + qty + ' sets' : '') },
    { label: 'Lining',    value: lining + (isInterlining ? ' + Interlining' : '') },
    { label: 'Fabric',    value: (drapeState.fabric || '—') }
  ];
  if (drapeState.pleat === 'Box Pleat') {
    drapeLines.push({ label: 'Box pleat size', value: ((document.getElementById('d-box-pleat-size') || {}).value || '3') + '"' });
  }
  if (drapeState.pleat === 'Grommet / Eyelet') {
    var gSizeSel = document.getElementById('d-grommet-size');
    var gSizeTxt = gSizeSel ? gSizeSel.options[gSizeSel.selectedIndex].text : '1 3/4" (standard)';
    drapeLines.push({ label: 'Grommet', value: gSizeTxt + ' · ' + ((document.getElementById('d-grommet-color') || {}).value || '—') + ' · ' + (getOpt('grp-grommet-supply') || 'We supply grommets') });
  }
  if (!isRodPocket && !isRippleDim) drapeLines.push({ label: 'Return / Overlap', value: returnSz + '" / ' + overlapSz + '"' });
  if (rippleJoin) drapeLines.push({ label: 'Join', value: rippleJoin });
  if (!isRodPocket && !isRippleDim) drapeLines.push({ label: 'Hems', value: 'Side ' + sideHem + '" / Bottom ' + bottomHem + '"' });
  if (corniceTotal) drapeLines.push({ label: 'Cornice', value: '$' + corniceTotal.toFixed(0) });
  if (valanceTotal) drapeLines.push({ label: 'Valance', value: '$' + valanceTotal.toFixed(0) });
  if (trimTotal)    drapeLines.push({ label: 'Trim', value: '$' + trimTotal.toFixed(0) });
  if (dShipEst)     drapeLines.push({ label: 'Shipping est.', value: '~$' + dShipEst + (qty > 1 ? ' × ' + qty + ' sets' : '') });
  drapeLines.push({ label: 'Fabric needed est.', value: '~' + (totalFabYds * qty).toFixed(1) + ' yds (pattern repeats add more)' });
  if (perSetTotal === 200) drapeLines.push({ label: 'Note', value: '$200 minimum per drapery set' });
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
  // Both cornice and valance use the same finishing choices: Self welt / Double self welt / Applied trim.
  if (cornFin) cornFin.style.display = 'block';
  if (valFin)  valFin.style.display  = 'none';   // legacy valance-only "Applied trim" label — no longer used
  // Sync the placement pickers (welt vs applied-trim edges) to whichever finishing is selected.
  var trimSel = document.querySelector('#grp-corn-trim .opt-btn.sel');
  cornToggleTrim(!!(trimSel && trimSel.textContent.indexOf('Applied trim') !== -1));
  calcCornice();
}
// show=true → Applied trim (edge picker + supply). show=false → Self/Double welt (welt-placement picker).
function cornToggleTrim(show) {
  var trim = document.getElementById('corn-trim-opts');
  var welt = document.getElementById('corn-welt-opts');
  if (trim) trim.style.display = show ? 'block' : 'none';
  if (welt) welt.style.display = show ? 'none'  : 'block';
}
function valToggleTrim(show) {
  var trim = document.getElementById('val-trim-opts');
  var welt = document.getElementById('val-welt-opts');
  if (trim) trim.style.display = show ? 'block' : 'none';
  if (welt) welt.style.display = show ? 'none'  : 'block';
}
// Readable list of checked edge locations for a given checkbox class ('Top, Bottom, …')
function _cvEdges(cls) {
  var m = {top:'Top', bottom:'Bottom', sides:'Both sides', returns:'Returns'};
  var locs = [];
  document.querySelectorAll('.' + cls + ':checked').forEach(function(cb) {
    locs.push(m[cb.getAttribute('data-loc')] || cb.getAttribute('data-loc'));
  });
  return locs.join(', ');
}
// Finishing description including placement (welt edges, or applied-trim edges)
function _cvFinishDesc(trimGrp, weltCls, trimCls) {
  var t = getOpt(trimGrp) || '—';
  if (t.indexOf('Applied trim') !== -1) { var e = _cvEdges(trimCls); return t + (e ? ' (' + e + ')' : ''); }
  if (t.toLowerCase().indexOf('welt') !== -1) { var w = _cvEdges(weltCls); return t + (w ? ' (' + w + ')' : ''); }
  return t;
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
  if (hasTrim) {
    var trimEdges = _cvEdges(trimClass);
    rows += '<div style="font-size:12px;color:var(--text-dark);padding:3px 0">' + selTrimTxt + (trimEdges ? ' — ' + trimEdges : '') + '</div>';
  } else if (isSelfWelt) {
    var weltEdges = _cvEdges(trimClass.replace('-trim-', '-welt-'));
    rows += '<div style="font-size:12px;color:var(--text-dark);padding:3px 0">' + selTrimTxt + (weltEdges ? ' — ' + weltEdges : '') + '</div>';
  }
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
  _cvPriceBox('val-price-box','val-price-rows','val-price-total','val-fabric-note', w, h, ret, 'val-trim-edge','grp-val-trim','grp-cv-val-fabric', false);
}

// Shared API submit helper for all soft-treatment forms
async function _stApiSubmit(formId, successId, name, email, phone, product, selections, notes) {
  var formEl = document.getElementById(formId);
  var successEl = document.getElementById(successId);
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
      'Please email us at blindznation@gmail.com or call (609) 742-1720.');
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
    { label: 'Mount',        value: getOpt('grp-cv-corn-mount') || '—' },
    { label: 'Quantity',     value: ((document.getElementById('cv-corn-qty')||{}).value) || '1' },
    { label: 'Finishing',    value: _cvFinishDesc('grp-corn-trim','corn-welt-edge','corn-trim-edge') },
    { label: 'Fabric',       value: getOpt('grp-corn-fabric') || '—' },
    { label: 'Delivery',     value: 'Ship to me (UPS/FedEx)' },
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
    { label: 'Mount',        value: getOpt('grp-cv-val-mount') || '—' },
    { label: 'Quantity',     value: ((document.getElementById('cv-val-qty')||{}).value) || '1' },
    { label: 'Finishing',    value: _cvFinishDesc('grp-val-trim','val-welt-edge','val-trim-edge') },
    { label: 'Fabric',       value: getOpt('grp-cv-val-fabric') || '—' },
    { label: 'Delivery',     value: 'Ship to me (UPS/FedEx)' }
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
    // Trigger calc which will build the estimate panel, then collect
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
  var lining     = drapeLiningLabel();
  var interCb    = document.getElementById('d-interlining-check');
  var interlining = interCb && interCb.checked;
  var panels     = getOpt('grp-drape-panels');
  var panelSide  = panels === 'Single panel' ? getOpt('grp-drape-side') : '—';
  var isSubmitPinch  = pleat === 'Pinch Pleat' || (pleat && pleat.indexOf('Pinch Pleat') === 0);
  var isSubmitRP     = pleat === 'Rod Pocket / Sheered Pocket';
  var isRipple   = pleat === 'Ripple Fold';
  var qty        = parseInt((document.getElementById('drape-qty') || {}).value) || 1;
  var returnSz   = isRipple ? '—' : ((document.getElementById('d-return') || {}).value || '4');
  var overlapSz  = (isSubmitRP || isRipple) ? '—' : ((document.getElementById('d-overlap') || {}).value || '3');
  var sideHem    = (document.getElementById('d-side-hem') || {}).value || '2';
  var bottomHem  = (document.getElementById('d-bottom-hem') || {}).value || '4';
  var showHems   = !isRipple && !isSubmitRP;
  // Fullness (standard pleat styles); Grommet/Box/Goblet/Barrel use a fixed 2.5× standard
  var fullness   = isSubmitPinch ? getOpt('grp-pp-fullness')
                 : (_NO_FULLNESS.indexOf(pleat) !== -1 ? '2.5× (standard)' : (getOpt('grp-drape-fullness') || '—'));
  // Box pleat size (Box Pleat only)
  var isSubmitBox = pleat === 'Box Pleat';
  var boxPleatSz  = (document.getElementById('d-box-pleat-size') || {}).value || '3';
  // Grommet details (Grommet / Eyelet only)
  var isSubmitGrommet = pleat === 'Grommet / Eyelet';
  var gromSizeSel = document.getElementById('d-grommet-size');
  var gromSize    = gromSizeSel ? (gromSizeSel.options[gromSizeSel.selectedIndex].text) : '1 3/4" (standard)';
  var gromColor   = (document.getElementById('d-grommet-color') || {}).value || '—';
  var gromSupply  = getOpt('grp-grommet-supply') || 'We supply grommets';
  // Ripple fold specific
  var rippleFull = isRipple ? getOpt('grp-ripple-fullness') : '—';
  var rippleHw   = isRipple ? getOpt('grp-ripple-hw') : '—';
  var rippleSnaps= isRipple ? getOpt('grp-ripple-snaps') : '—';
  var rippleJoin = isRipple ? getOpt('grp-ripple-join') : '—';
  var hwNeed     = getOpt('grp-drape-hardware');
  var hwType     = hwNeed === 'I need hardware' ? getOpt('grp-drape-hw-type') : 'N/A';
  var delivery   = 'Ship to me (UPS/FedEx)';
  var custFabricFlag = fabric === 'Customer supplies fabric'
    ? '*** CUSTOMER SUPPLYING FABRIC ***\nDO NOT PROCESS PAYMENT UNTIL FABRIC RECEIVED AT SHOP.\nContact customer with shipping address before fabrication begins.\n\n'
    : '';
  var body = custFabricFlag + 'DRAPERY QUOTE REQUEST\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone
    + '\nEmail: ' + (document.getElementById('d-email').value.trim() || '—')
    + '\nAddress: ' + (document.getElementById('d-address').value.trim() || '—') + '\n\n'
    + 'Pleat style: ' + (drapeState.pleat || '—') + '\n'
    + 'Fabric: ' + fabric + '\n'
    + (fabric === 'We supply the fabric' ? 'Color: ' + (getOpt('grp-drape-color')||'—') + '\n' : '')
    + 'Lining: ' + lining + (interlining ? ' + Interlining' : '') + '\n'
    + 'Quantity: ' + qty + ' set(s)\n'
    + 'Panels: ' + panels + (panelSide !== '—' ? ' — ' + panelSide : '') + '\n'
    + (!isRipple && pleat !== 'Rod Pocket / Sheered Pocket' && fullness !== '—' ? 'Fullness: ' + fullness + '\n' : '')
    + (isSubmitBox ? 'Box pleat size: ' + boxPleatSz + '"\n' : '')
    + (isSubmitGrommet ? 'Grommet: ' + gromSize + ' inner Ø — ' + gromColor + ' — ' + gromSupply + '\n' : '')
    + (pleat === 'Rod Pocket / Sheered Pocket' ? (function(){
        var casing = getOpt('grp-rp-casing') || '—';
        var header = getOpt('grp-rp-header') || 'No header';
        var placement = (document.querySelector('input[name="rp-placement"]:checked') || {}).value || '—';
        var rpFull = (function(){ var b=document.querySelector('#grp-rp-fullness .opt-btn.sel'); return b?b.textContent.trim():'2.0×'; })();
        return 'Casing: ' + casing + '  Header: ' + header + '  Placement: ' + placement + '  Fullness: ' + rpFull + '\n';
      }()) : '')
    + (!isRipple ? 'Return: ' + returnSz + '"  Overlap: ' + overlapSz + (overlapSz === '—' ? '' : '"') + '\n' : '')
    + (showHems ? 'Hems: side ' + sideHem + '"  bottom ' + bottomHem + '"\n' : '')
    + (isRipple ? 'Ripple fullness: ' + rippleFull + '  Hardware: ' + rippleHw + '  Snaps: ' + rippleSnaps + '\n' +
       'Butt master / Overlap: ' + rippleJoin + '\n' : '')
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
    + '\nExact width: ' + (isSubmitRP ? ((document.getElementById('rp-w')||{}).value || '—') + '"'
        : isRipple ? ((document.getElementById('rf-w')||{}).value || '—') + '"'
        : (document.getElementById('d-exact-width').value ? document.getElementById('d-exact-width').value + '"' : '—'))
    + '\nFinished length: ' + (isSubmitRP ? ((document.getElementById('rp-l')||{}).value || '—') + '"'
        : isRipple ? ((document.getElementById('rf-l')||{}).value || '—') + '"'
        : (document.getElementById('d-exact-length').value ? document.getElementById('d-exact-length').value + '"' : '—')) + '\n'
    + 'Delivery: ' + delivery + '\n'
    + pbInstallLine(document.getElementById('drape-form')) + '\n\n'
    + 'Notes:\n' + (document.getElementById('d-notes').value.trim() || 'None')
    + (function(){ var fu = document.querySelector('#drape-form .pb-fu-wrap input[type="file"]'); var n = fu && fu.files.length ? '\n\nFiles to send: ' + Array.from(fu.files).map(function(f){return f.name;}).join(', ') + '\n(Customer will email these to blindznation@gmail.com)' : ''; return n; }());
  var email = document.getElementById('d-email').value.trim();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
  if (fabric === 'Customer supplies fabric') {
    var sbox = document.getElementById('drape-success');
    if (sbox) sbox.innerHTML = '<strong>Order details received!</strong><br>'
      + 'Since you\'re supplying your own fabric, we will contact you shortly with our shop\'s shipping address. '
      + '<strong>Payment will not be collected until your fabric arrives and is inspected.</strong><br><br>'
      + 'Questions? <a href="tel:6097421720" style="color:#2e7d32">(609) 742-1720</a> &middot; 24/7 call or text.';
  }
  var drapeSelections = [
    { label: 'Pleat style', value: drapeState.pleat || '—' },
    { label: 'Fabric', value: drapeState.fabric || '—' },
    { label: 'Lining', value: lining + (interlining ? ' + Interlining' : '') },
    { label: 'Quantity', value: qty + ' set(s)' },
    { label: 'Panels', value: panels + (panelSide !== '—' ? ' — ' + panelSide : '') },
    { label: 'Width', value: (isSubmitRP ? ((document.getElementById('rp-w')||{}).value || '—')
        : isRipple ? ((document.getElementById('rf-w')||{}).value || '—')
        : (document.getElementById('d-exact-width').value || '—')) + '"' },
    { label: 'Finished length', value: (isSubmitRP ? ((document.getElementById('rp-l')||{}).value || '—')
        : isRipple ? ((document.getElementById('rf-l')||{}).value || '—')
        : (document.getElementById('d-exact-length').value || '—')) + '"' },
    { label: 'Return / Overlap', value: returnSz + (returnSz === '—' ? '' : '"') + ' / ' + overlapSz + (overlapSz === '—' ? '' : '"') },
    { label: 'Hardware', value: hwNeed + (hwType !== 'N/A' ? ' — ' + hwType : '') },
    { label: 'Delivery', value: delivery }
  ];
  if (showHems) drapeSelections.splice(8, 0, { label: 'Hems', value: 'Side ' + sideHem + '" / Bottom ' + bottomHem + '"' });
  if (isRipple) drapeSelections.splice(8, 0, { label: 'Butt master / Overlap', value: rippleJoin });
  if (isSubmitBox) drapeSelections.push({ label: 'Box pleat size', value: boxPleatSz + '"' });
  if (isSubmitGrommet) drapeSelections.push({ label: 'Grommet', value: gromSize + ' Ø · ' + gromColor + ' · ' + gromSupply });
  var drapeNotes = document.getElementById('d-notes').value.trim();
  if (pbInstallRequested(document.getElementById('drape-form'))) drapeSelections.push({ label: 'Installation', value: 'Requested' });
  await _stApiSubmit('drape-form', 'drape-success', name, email, phone, 'Custom Drapery', drapeSelections, drapeNotes);
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
    { label: 'Fold section size', value: (document.getElementById('val-fold-size').value || '—') + '"' },
    { label: 'Delivery',          value: 'Ship to me (UPS/FedEx)' }
  ];
  await _stApiSubmit('valance-form-fields', 'valance-success', name, email, phone, 'Roman Valance',
    selections, document.getElementById('val-notes').value.trim());
}

// ── SUBMIT: ROMAN SHADES ──────────────────────────────────
async function submitRoman() {
  var name  = document.getElementById('rn-name').value.trim();
  var email = document.getElementById('rn-email').value.trim();
  var phone = document.getElementById('rn-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
  var w        = String(_getDim('rn-w', 'rn-w-frac') || '');
  var h        = String(_getDim('rn-h', 'rn-h-frac') || '');
  var qty      = document.getElementById('rn-qty').value;
  var tdbu        = getOpt('grp-roman-tdbu');
  var op          = getOpt('grp-roman-op');
  var isMotor     = op === 'Motorized';
  var isCordless  = op === 'Cordless';
  var liftType    = isCordless ? 'Cordless' : (isMotor ? '—' : 'Chain loop');
  var motorBrand    = isMotor ? (getOpt('grp-roman-motor-brand') || 'TBD at order') : '—';
  var motorPower    = (isMotor && motorBrand !== 'Norman') ? (getOpt('grp-roman-motor-power') || '—') : '—';
  var motorHardwire = (motorPower === 'Hardwired') ? (getOpt('grp-roman-motor-hardwire') || '—') : '—';
  var controlSide = isCordless ? '—' : getOpt('grp-roman-control');
  var lining      = romanLiningLabel();
  var returnSz    = (document.getElementById('rn-return') || {}).value || '4';
  var mountStyle  = getOpt('grp-roman-mount-style') || 'Waterfall';
  var frontVal    = mountStyle === 'Off Back' ? ((document.getElementById('rn-valance-front') || {}).value || '6') : '—';
  var backVal     = mountStyle === 'Off Back' ? getOpt('grp-roman-back-valance') : '—';
  var backValSz   = backVal === 'Add back valance' ? ((document.getElementById('rn-valance-back') || {}).value || '4') : '—';
  var delivery    = 'Ship to me (UPS/FedEx)';
  var mountType   = getOpt('grp-roman-mount') || 'Inside mount';
  var body = 'ROMAN SHADE QUOTE REQUEST\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone
    + '\nEmail: ' + (document.getElementById('rn-email').value.trim() || '—')
    + '\nAddress: ' + (document.getElementById('rn-address').value.trim() || '—') + '\n\n'
    + 'Style: ' + (romanState.style || '—') + '\n'
    + 'Mount type: ' + mountType + '\n'
    + 'TDBU: ' + tdbu + '\n'
    + 'Fabric: ' + (romanState.fabric || '—') + '\n'
    + (romanState.fabric === 'We supply the fabric' ? 'Color: ' + (getOpt('grp-roman-color')||'—') + '\n' : '')
    + 'Lining: ' + lining + '\n'
    + 'Operation: ' + op + '\n'
    + (isMotor
        ? 'Motor brand: ' + motorBrand
          + (motorBrand !== 'Norman'
              ? '\nPower: ' + motorPower + (motorPower === 'Hardwired' ? '\nHardwired type: ' + motorHardwire : '')
              : '') + '\n'
        : 'Lift type: ' + liftType + '\n')
    + 'Control side: ' + controlSide + '\n'
    + 'Return: ' + returnSz + '"\n'
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
    { label: 'Mount type',   value: mountType },
    { label: 'TDBU',         value: getOpt('grp-roman-tdbu') || '—' },
    { label: 'Fabric',       value: romanState.fabric || '—' },
    { label: 'Lining',       value: romanLiningLabel() },
    { label: 'Operation',    value: op },
    { label: 'Control side', value: controlSide },
    { label: 'Mounting',     value: mountStyle },
    { label: 'Quantity',     value: qty },
    { label: 'Width',        value: (_getDim('rn-w','rn-w-frac')||'—') + '"' },
    { label: 'Finished length', value: (_getDim('rn-h','rn-h-frac')||'—') + '"' },
    { label: 'Rings',        value: (getOpt('grp-roman-rings')||'—') + (getOpt('grp-roman-rings')==='We supply rings' ? ' · ' + ((document.getElementById('roman-ring-size')||{}).value||'¾"') + ' · ' + ((document.getElementById('roman-ring-color')||{}).value||'White') : '') },
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

