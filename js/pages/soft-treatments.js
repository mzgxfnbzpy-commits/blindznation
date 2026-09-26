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
  stSummary();
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
  ['grp-roman-mount','grp-roman-tdbu','grp-roman-color','grp-roman-liner','grp-roman-lining-type',
   'grp-roman-rings','grp-roman-op','grp-roman-clen','grp-roman-motor-brand',
   'grp-roman-motor-power','grp-roman-motor-hardwire','grp-roman-control',
   'grp-roman-trim-supply','grp-roman-mount-style','grp-roman-back-valance','grp-rn-back-val-h',
   'grp-rn-back-val-fabric','grp-rn-front-val-h','grp-val-lining','grp-val-fabric'].forEach(function(grp) {
    var sel = document.querySelector('#' + grp + ' .opt-btn.sel');
    if (sel) s[grp] = sel.textContent.trim();
  });
  var trimChecks = document.querySelectorAll('.rn-trim-check');
  s['rn-trim-checks'] = Array.from(trimChecks).map(function(cb) { return { loc: cb.getAttribute('data-loc'), checked: stIsOn(cb) }; });
  var fabBtn = document.querySelector('#roman-fabric-cards .opt-btn.sel');
  if (fabBtn) s['roman-fabric-card'] = fabBtn.getAttribute('data-val');
  _rnStyleCache[styleName] = s;
}
function _rnRestoreState(styleName, fromState) {
  var saved = _rnStyleCache[styleName];
  if (!saved) {
    if (fromState) {
      ['rn-w','rn-h','rn-qty'].forEach(function(id) {
        var el = document.getElementById(id); if (el && fromState[id] !== undefined) el.value = fromState[id];
      });
    }
    return;
  }
  ['rn-w','rn-h','rn-qty','rn-return','roman-clen-in','roman-ring-size','roman-ring-color','val-folds','val-fold-size'].forEach(function(id) {
    var el = document.getElementById(id); if (el && saved[id] !== undefined) { el.value = saved[id]; _stSyncPills(el); }
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
      if (cb) { if (cb.type === 'checkbox') cb.checked = item.checked; else cb.classList.toggle('sel', !!item.checked); }
    });
  }
  if (saved['roman-fabric-card']) {
    document.querySelectorAll('#roman-fabric-cards .opt-btn').forEach(function(c) {
      if (c.getAttribute('data-val') === saved['roman-fabric-card']) selectFabric('roman', c, saved['roman-fabric-card']);
    });
  }
  rnMountNote();
}

// ── Drape style state carryover ──────────────────────────
var _drapePleatCache = {};
// Every pleat style now shares the one Step 1 dim box (d-exact-width / d-exact-length),
// which sits above the pleat picker — so switching pleat never touches the size.
// (Ripple fold and rod pocket used to carry their own rf-* / rp-* inputs.)
function _drapeGetCurrentDims() {
  return {
    w: parseFloat((document.getElementById('d-exact-width') || {}).value) || 0,
    h: parseFloat((document.getElementById('d-exact-length') || {}).value) || 0
  };
}
function _drapeSetDims(targetPleat, dims) { /* size is shared across pleats — nothing to restore */ }
function _drapeCaptureState(pleatName) {
  if (!pleatName) return;
  var s = { dims: _drapeGetCurrentDims() };
  ['grp-drape-fullness','grp-drape-panels','grp-drape-side','grp-drape-hw-need','grp-drape-hw-type',
   'grp-drape-color','grp-drape-liner','grp-ripple-fullness','grp-ripple-hw','grp-ripple-snaps',
   'grp-ripple-join','grp-pp-fullness','grp-rp-fullness','grp-rp-casing','grp-rp-header'].forEach(function(grp) {
    var sel = document.querySelector('#' + grp + ' .opt-btn.sel');
    if (sel) s[grp] = sel.textContent.trim();
  });
  var fabBtn = document.querySelector('#drape-fabric-cards .opt-btn.sel');
  if (fabBtn) s['drape-fabric-card'] = fabBtn.getAttribute('data-val');
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
    document.querySelectorAll('#drape-fabric-cards .opt-btn').forEach(function(c) {
      if (c.getAttribute('data-val') === saved['drape-fabric-card']) selectFabric('drape', c, saved['drape-fabric-card']);
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

  // Return (Step 1) and overlap (Step 3) — pinch + standard pleats only
  // (hidden for the ripple track system & rod pocket, exactly as before).
  var retWrap = document.getElementById('drape-return-wrap');
  if (retWrap) retWrap.style.display = (isRipple || isRodPocket) ? 'none' : '';
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
               : isRipple ? document.getElementById('ds-ripple-fullness')
               : isPinch ? document.getElementById('pinch-subopts')
               : document.getElementById('drape-step-panels');
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
      rec.style.cssText = 'display:block;margin-top:8px;font-size:12px;padding:8px 12px;border-radius:7px;background:var(--gold-mid);color:#2A1E0C';
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
  stRenumber('tab-roman');

  _rnRestoreState(val, _prevRnState);
  calcRoman();

  // Auto-scroll to the revealed content
  setTimeout(function() {
    var target = isValance  ? document.getElementById('valance-config')
               : document.getElementById('step-roman-3');
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
  document.querySelectorAll(container + ' .opt-btn').forEach(c => c.classList.remove('sel'));
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
// ── Roman shades are CUSTOM QUOTE ONLY (Justin, 2026-09-22) ─────────────────
// No figure is shown and nothing priced reaches the cart or the emailed spec.
// Everything below still computes correctly — the rates, the $150/$250 minimum,
// the whole-square-foot rounding and the 80x100 / 200x200 freight ladder are all
// intact and tested. Flip this to false and Roman pricing comes straight back.
var RN_QUOTE_ONLY = true;
// Size cap follows the freight ladder (300" x 250"), not a rate limit: a Roman is
// priced on area, which scales to any size. Quote-only right now anyway, so this
// only decides whether the customer can describe the shade and send it, or is told
// to call. Raised from 120 x 120 (Justin, 2026-09-23).
var RN_MAX_W = 300;
var RN_MAX_H = 250;
// Past this a Roman can still be submitted, but needs our approval before it can be
// paid for (Justin, 2026-09-23). Romans are all quote-only today, so this matters
// once RN_QUOTE_ONLY is turned off and Stripe is back.
var RN_APPROVE_W = 150;
var RN_APPROVE_H = 115;

// Lining a Roman adds $5/sqft on top of the style rate (Justin, Sept 2026).
var RN_LINING_PER_SQFT = 5;

// Freight lives in shared.js now, one function per product, because the three
// no longer share a rule: pbDraperyFreight (whole panel), pbRomanFreight (whole
// shade), pbBoardFreight (width only). 80″ is still the first step on a board,
// which is all this constant is used for here.
var D_OVERSIZE_W = (typeof PB_OVERSIZE_W !== 'undefined') ? PB_OVERSIZE_W : 80;

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
// pbRenderEstimate builds a sibling panel (<boxId>-checkout-panel) holding the
// line items, the total and Add to Cart. Rewriting the price box alone leaves
// that panel on screen still showing the LAST price that calculated — so a
// customer who types an out-of-range size sees "custom quote required" with a
// stale dollar total sitting right underneath it. Clear it whenever we bail out.
function _clearEstimatePanel(box) {
  if (!box || !box.id) return;
  var panel = document.getElementById(box.id + '-checkout-panel');
  if (!panel) return;
  panel.innerHTML = '';
  panel.style.display = 'none';
  // The add-to-cart buttons read these properties, not the markup. Emptying the
  // panel without clearing them left the last valid price live: price a 185"
  // drape, push it to 200", get "custom quote" on screen -- and Add to Cart
  // still added the 185" price.
  panel._pbEstimate = null;
  panel._pbLines    = null;
  setTimeout(stSummary, 0);   // summary card: drop the stale figure too
}

function _motorCustomMsg(box, label) {
  if (!box) return;
  _clearEstimatePanel(box);
  box.style.display = 'block';
  box.innerHTML =
    '<div style="padding:2px 0">' +
      '<div style="font-size:10px;letter-spacing:2px;text-transform:uppercase;color:var(--gold);font-weight:600;margin-bottom:8px">' + label + ' — Custom Quote</div>' +
      '<div style="font-size:12px;color:var(--text-dark);line-height:1.7">Motorized installation pricing varies by motor brand, wiring, and integration. We\'ll include the full price in your custom quote after review.</div>' +
    '</div>';
}

function _customSizeMsg(box, label, maxW, maxH) {
  if (!box) return;
  _clearEstimatePanel(box);
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
  if (!w || !h) { if(box) { _clearEstimatePanel(box); box.style.display = 'none'; } return; }

  // Motorized operation → no customer-facing estimate
  if (getOpt('grp-roman-op') === 'Motorized') { _motorCustomMsg(box, 'Motorized Roman Shade'); return; }

  // Minimum functional size — 12″
  if ((w > 0 && w < 12) || (h > 0 && h < 12)) {
    _clearEstimatePanel(box);
    if (box) { box.style.display = 'block'; box.innerHTML = '<div style="padding:6px 0;font-size:12px;color:var(--text-dark)">&#9888; Roman shades require a minimum <strong>12&rdquo;</strong> width and height to operate correctly.</div>'; }
    return;
  }

  // Custom quote past RN_MAX_W × RN_MAX_H
  if (w > RN_MAX_W || h > RN_MAX_H) { _customSizeMsg(box, 'Roman Shade', RN_MAX_W, RN_MAX_H); return; }
  // Normal path: the box only ever carries the messages above, so clear any stale one.
  if (box) box.innerHTML = '';

  // Past the base shipping step — see pbRomanFreight (80″ × 100″ envelope).
  var isRomanOversized = !(w <= 80 && h <= 100);   // past the base shipping step

  var rate     = rnGetRate();
  var isPleated = romanState.style === 'Permanently Pleated Roman';
  // Lining adds $5/sqft on top of the style rate (Justin, Sept 2026).
  var romanLined = (romanState.liningType && romanState.liningType !== 'unlined');
  if (romanLined) rate += RN_LINING_PER_SQFT;
  // Square footage rounds UP to a whole square foot (Justin, 2026-09-22):
  // we never price on a fraction of a foot. 24x22 = 3.67 -> 4 sq ft.
  var sqft     = Math.ceil((w / 12) * (h / 12));
  var perShade = Math.max(rnGetMin(), sqft * rate);
  var laborTotal = perShade * qty;
  // Permanently pleated yardage uses 3× height (extra fabric for folds)
  var rnFabricH = isPleated ? h * 3 : h;

  // Trim
  var trimTotal = 0;
  var trimChecks = stOn('rn-trim-check');
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
    fabricCost = Math.ceil(fabricYds * D_FABRIC_PER_YD);      // whole dollars
    var linerVal = getOpt('grp-roman-liner') || 'White liner';
    if (isRomanLined && (linerVal === 'White liner' || linerVal === 'Cream liner')) {
      linerCost = Math.ceil(liningYdsRn * D_LINING_PER_YD);   // whole dollars
    }
  }

  // Shipping — FedEx/UPS.
  // $100 up to 80x100, $200 up to 200x200, $300 past that. Flat per order.
  var shipEst = (typeof pbRomanFreight === 'function')
    ? pbRomanFreight(w, h)
    : ((w <= 80 && h <= 100) ? 100 : (w <= 120 && h <= 120) ? 150 : (w <= 160 && h <= 150) ? 200
       : (w <= 220 && h <= 200) ? 300 : (w <= 300 && h <= 250) ? 400 : 500);

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
    document.getElementById('rn-pb-min-note').after(fabNote);
  }
  fabNote.textContent = '🧵 Est. fabric needed: ~' + fabricYds.toFixed(2) + ' yards' + (cutsPerShade > 1 ? ' ('+cutsPerShade+' widths)' : '') + ' — pattern repeats will add more. Confirmed at order.';

  // Line-by-line estimate panel
  var isRnValance = romanState.style === 'Roman Valance';
  var rnLines = isRnValance ? [
    // Roman Valance has its own details step — describe what the customer chose there.
    { label: 'Product',        value: 'Roman Valance' },
    { label: 'Size',           value: w + '″ W × ' + h + '″ finished length' },
    { label: 'Quantity',       value: qty + ' valance(s)' },
    { label: 'Mount',          value: getOpt('grp-roman-mount') },
    { label: 'Lining',         value: getOpt('grp-val-lining') },
    { label: 'Fabric',         value: getOpt('grp-val-fabric') },
    { label: 'Folds',          value: ((document.getElementById('val-folds') || {}).value || '—') + ' × ' + (((document.getElementById('val-fold-size') || {}).value || '—')) + '"' }
  ] : [
    { label: 'Product',        value: (romanState.style || 'Roman Shade') },
    { label: 'Size',           value: w + '″ W × ' + h + '″ finished length' },
    { label: 'Quantity',       value: qty + ' shade(s)' },
    { label: 'Mount',          value: getOpt('grp-roman-mount') },
    { label: 'Fabric',         value: (romanState.fabric || '—') },
    { label: 'Lining',         value: romanLiningLabel() },
    { label: 'Operation',      value: (getOpt('grp-roman-op') || '—') },
    { label: 'Mounting',       value: (getOpt('grp-roman-mount-style') || '—') }
  ];
  if (!isRnValance && getOpt('grp-roman-op') === 'Motorized') {
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
  if (w > RN_APPROVE_W || h > RN_APPROVE_H) {
    rnLines.push(pbApprovalLine('Roman shade over ' + RN_APPROVE_W + '″ wide or ' + RN_APPROVE_H + '″ tall'));
  }
  // Money lines only exist when Romans are priced. Quote-only keeps the spec
  // lines, so the shade is still fully described in the cart and the email.
  if (!RN_QUOTE_ONLY) {
    if (shipEst) {
      rnLines.push({ label: (shipEst > 100 ? 'Oversize freight (over 80″ × 100″)'
                          : 'Shipping (FedEx/UPS)'), value: '$' + shipEst });
      rnLines.push({ label: '', value: (typeof PB_ST_SHIP_NOTE !== 'undefined' ? PB_ST_SHIP_NOTE : 'Shipping is an estimate and may change.') });
    }
    if (perShade === rnGetMin()) {
      rnLines.push({ label: 'Note', value: 'At ' + (isPleated ? 'pleated' : 'flat/relaxed') + ' minimum — $' + rnGetMin() + '/shade' });
    }
  }
  var rnShown = RN_QUOTE_ONLY ? null : grandTotal;
  var rnMsg   = RN_QUOTE_ONLY
    ? 'Roman shades are custom quoted. Send your configuration and we will price it by hand — usually within one business day.'
    : '';
  pbRenderEstimate('roman-pricebox', rnLines, rnShown, rnMsg, function(checkout) {
    pbCollectItem(romanState.style || 'Roman Shade', rnLines, rnShown, getOpt('grp-roman-op')==='Motorized');
    pbOpenCart();
    if (checkout) setTimeout(function(){
      var f=document.getElementById('pb-cart-foot'); if(f) f.style.display='block';
    }, 150);
  });
  _stShowPanel('roman-pricebox');
  stSummary();
}

// ── DRAPERY PRICING CALCULATOR ───────────────────────────────
// ── Drapery rates — Justin, Sept 2026 ───────────────────────────────────────
// Priced per cut (one 54" width of fabric). The rate climbs with finished
// length, because a longer drape is more fabric handling and more labour per
// cut. Bands, on top of whichever base applies:
//   ≤ 99″     base            (125 unlined / 135 lined)
//   100–115″  +$20            (145 / 155)
//   116–130″  +$35            (160 / 170)
//   131–141″  +$70            (195 / 205)
//   142–151″  +$105           (230 / 240)   ← +$35 per further 10″
//   152–161″  +$140  … and so on, +$35 per 10″, to 300″ (292–300″ = +$630)
//   over 300″ NOT auto-priced — quoted by hand
// Extended 185 -> 300 (Justin, 2026-09-23: "show the prices for everything").
// Anything over D_APPROVE_W wide or D_APPROVE_H long still shows its price but
// needs our approval before it can be paid for — see pbApprovalLine in shared.js.
var D_RATE_UNLINED = 125;   // per cut/width — unlined
var D_RATE_LINED   = 135;   // per cut/width — liner included (BO or LF, same price)
var D_SPECIALTY_PLEAT_ADD = 20;  // Goblet / Barrel, on top of the base rate
var D_LEN_BAND_ADD = 35;    // added per 10" band above 141"
var D_LEN_MAX_AUTO = 300;   // longer than this is a manual quote, no number shown (was 185)
var D_APPROVE_W    = 250;   // wider than this  → priced, but approval required before payment (Justin: 250 W x 110 L is fine)
var D_APPROVE_H    = 150;   // longer than this → priced, but approval required before payment
// Width has no rate ladder of its own: a wider panel simply takes more cuts and the
// cut formula handles any width, so this cap is only about what we quote
// automatically. Raised 200 -> 300 (Justin, 2026-09-23) so the wide sizes in the
// freight brackets can actually be ordered. Length still stops at 185, because that
// is where the per-cut rate ladder ends.
var D_WIDTH_MAX_AUTO = 300;
var D_MIN_WIDTHS   = 2;
var D_SET_MIN      = 250;   // minimum per drapery set, BEFORE shipping (Justin 2026-09-23, was 200)
var D_FABRIC_WIDTH = 54;    // standard fabric width (inches)

// ── Width (cut) calculation ─────────────────────────────────────────────────
// Rod width × fullness is only the visible face. A real cut list also has to
// cover the returns back to the wall and the centre overlap on a pair, and each
// 54" cut does not yield 54" of finished panel — side hems and the seams
// between widths eat into it. Under-counting here loses a whole width on jobs
// that sit just over a boundary, which is money out of pocket every time.
// Justin's workroom formula:
//   cuts = ceil( (rod width + allowance) × fullness ÷ fabric width )
// The allowance covers returns/leads and side hems, and it is added BEFORE the
// fullness multiplier — that ordering matters, it is what the fullness is
// actually applied to. Standard 4″ returns with 2″ hems = +12″; 6″ returns = +18″.
var D_RETURN_IN    = 4;     // standard return/lead
var D_SIDE_HEM_IN  = 2;     // standard side hem
var D_FABRIC_CUT_W = 54;    // solid goods; 118″ fabric and railroading are quoted by hand
var D_YARD_ALLOW   = 16;    // added to finished length for header + hems, before ÷36

// Width allowance for a given return size. Anchored on Justin's two numbers —
// 4″ returns → +12″, 6″ returns → +18″ — which is three times the return.
// Anything larger scales the same way; "more than that, accommodate it" per Justin.
function dWidthAllowance(returnIn) {
  var r = parseFloat(returnIn) || D_RETURN_IN;
  return r * 3;
}

// Per-cut rate for a finished length, or null when it is past the auto-price
// ceiling and has to be quoted by hand.
function dDrapeRatePerWidth(heightIn, baseRate) {
  var h = parseFloat(heightIn) || 0;
  if (h <= 99)  return baseRate;
  if (h <= 115) return baseRate + 20;
  if (h <= 130) return baseRate + 35;
  if (h <= 141) return baseRate + 70;
  if (h >  D_LEN_MAX_AUTO) return null;
  // Every further 10" past the 131–141 band adds another $35.
  return baseRate + 70 + Math.ceil((h - 141) / 10) * D_LEN_BAND_ADD;
}
var D_INTERLINING_PER_WIDTH = 10; // interlining surcharge per width (on top of lined rate)
var D_LINING_PER_YD = 10;   // when we supply lining (White or Cream) — same yardage as face fabric
var D_FABRIC_PER_YD = 25;   // placeholder — face fabric custom per spec
// ── Cornice / valance — Justin, Sept 2026 ───────────────────────────────────
// $35 per linear foot at standard height, $200 minimum per piece, and the rate
// steps up with the face height: a deeper board is more material and more
// labour per running foot.
//   ≤ 15″   $35/ft
//   16–35″  $70/ft   (doubles once past 15″)
//   36–55″  $95/ft   (+$25)
//   56–75″  $120/ft  (+$25 for each further 20″, and so on)
// FABRIC IS NOT INCLUDED in these rates — it is quoted separately, same as the
// drapery face fabric. Do not fold a fabric estimate into these totals.
var D_CORNICE_PER_FT = 35;    // base rate, standard height
var D_CORNICE_MIN_FT = 4;
var D_VALANCE_PER_FT = 35;    // same as cornice
var D_BOARD_MIN      = 200;   // minimum per cornice / per valance
var D_BOARD_STD_H    = 15;    // at or under this height, the base rate applies
var D_BOARD_STEP_IN  = 20;    // height band width above the standard
var D_BOARD_STEP_ADD = 25;    // added per band after the initial doubling

// Per-linear-foot rate for a cornice/valance of a given face height (inches).
// Height 0 / blank falls back to the base rate so a half-filled form still
// shows a sensible number.
function dBoardRatePerFt(heightIn, baseRate) {
  var base = baseRate || D_CORNICE_PER_FT;
  var h = parseFloat(heightIn) || 0;
  if (h <= D_BOARD_STD_H) return base;
  // First band past the standard height doubles; each further band adds $25.
  var band = Math.floor((h - (D_BOARD_STD_H + 1)) / D_BOARD_STEP_IN);
  return (base * 2) + (band * D_BOARD_STEP_ADD);
}
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
  // One Step 1 dim box for every pleat style.
  var w = _getDim('d-exact-width',  'd-exact-width-frac');
  var h = _getDim('d-exact-length', 'd-exact-length-frac');
  var qty = parseInt((document.getElementById('drape-qty') || {}).value) || 1;
  var box = document.getElementById('drape-price-box');
  if (!box) return;
  if (!w || !h) { _clearEstimatePanel(box); box.style.display = 'none'; return; }

  // Motorized track hardware → no customer-facing estimate
  var hwNeedBtn = document.querySelector('#grp-drape-hw-need .opt-btn.sel');
  var hwTypeBtn = document.querySelector('#grp-drape-hw-type .opt-btn.sel');
  var hwNeed = hwNeedBtn ? hwNeedBtn.textContent.trim() : '';
  var hwType = hwTypeBtn ? hwTypeBtn.textContent.trim() : '';
  if (hwNeed === 'I need hardware' && hwType === 'Motorized track') { _motorCustomMsg(box, 'Motorized Drapery'); return; }

  // Minimum dimension guard
  var minWarnId = 'd-min-warn';
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
    } else if (w > D_WIDTH_MAX_AUTO || h > D_LEN_MAX_AUTO) {
      minWarn.textContent = w > D_WIDTH_MAX_AUTO
        ? '⚠ Width over ' + D_WIDTH_MAX_AUTO + '″ exceeds our standard range — custom pricing required. Submit your order and we\'ll quote it.'
        : '⚠ Length over ' + D_LEN_MAX_AUTO + '″ exceeds our standard range — custom pricing required. Submit your order and we\'ll quote it.';
      minWarn.style.display = 'block';
    } else {
      minWarn.style.display = 'none';
    }
  }

  // Oversized → custom quote. The length limit is D_LEN_MAX_AUTO, the same limit
  // the rate ladder stops at, so the cap and the pricing cannot drift apart:
  // raise one and the other follows.
  if (w > D_WIDTH_MAX_AUTO || h > D_LEN_MAX_AUTO) { _customSizeMsg(box, 'Custom Drapery', D_WIDTH_MAX_AUTO, D_LEN_MAX_AUTO); return; }
  // Normal path: the box only ever carries the messages above, so clear any stale one.
  box.innerHTML = '';

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

  // Widths (cuts) — Justin's workroom formula:
  //   (rod width + allowance) × fullness ÷ 54″ , rounded up
  // The allowance covers returns/leads and side hems and goes on BEFORE the
  // fullness multiplier. It follows the return size the customer picked
  // (4″ → +12″, 6″ → +18″), because that is the number that decides whether a
  // job needs one more width of fabric.
  var _retEl = document.getElementById('d-return');
  var returnEach  = parseFloat(_retEl && _retEl.value) || D_RETURN_IN;
  var widthAllowance = dWidthAllowance(returnEach);
  // Allowance goes on BEFORE the fullness multiplier, then divide by the cut width.
  var faceWidthNeeded = (w + widthAllowance) * fullness;
  var numWidths = Math.max(D_MIN_WIDTHS, Math.ceil(faceWidthNeeded / D_FABRIC_CUT_W));

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
  var ratePerWidth = (isLined ? D_RATE_LINED : D_RATE_UNLINED)
                   + (isSpecialtyPleat ? D_SPECIALTY_PLEAT_ADD : 0);

  // Length bands. Past 185" there is no published rate — the job is quoted by
  // hand, so we show no number rather than inventing one.
  var effectiveRate = dDrapeRatePerWidth(h, ratePerWidth);
  var overMaxLength = (effectiveRate === null);
  var lenSurcharge  = overMaxLength ? 0 : (effectiveRate - ratePerWidth);
  if (overMaxLength) effectiveRate = 0;
  var laborTotal = numWidths * effectiveRate;
  var interlineTotal = isInterlining ? numWidths * D_INTERLINING_PER_WIDTH : 0;

  // Face fabric (when we supply)
  var fabricCost = 0; var yardsTotal = 0;
  if (drapeState.fabric === 'We supply the fabric') {
    yardsTotal = Math.ceil(((h + 16) / 36) * numWidths * 10) / 10;
    fabricCost = Math.ceil(yardsTotal * D_FABRIC_PER_YD);     // whole dollars
  }
  // Lining fabric — $10/yd when we supply White or Cream; same yardage as face fabric
  var liningYards = Math.ceil(((h + 16) / 36) * numWidths * 10) / 10;
  var weSupplyLiner = (lColor === 'White liner' || lColor === 'Cream liner');
  var liningCost = (isLined && weSupplyLiner) ? Math.ceil(liningYards * D_LINING_PER_YD) : 0;

  // Cornice
  var corniceTotal = 0;
  var corniceCheck = document.getElementById('d-cornice-check');
  if (corniceCheck && corniceCheck.checked) {
    var cw = parseFloat(document.getElementById('d-cornice-width').value) || 0;
    var chEl = document.getElementById('d-cornice-height');
    var ch  = chEl ? (parseFloat(chEl.value) || 0) : 0;
    var cFt = Math.max(D_CORNICE_MIN_FT, cw / 12);
    var cRate = dBoardRatePerFt(ch, D_CORNICE_PER_FT);
    // $200 minimum applies to the board itself, before trim is added.
    corniceTotal = Math.max(D_BOARD_MIN, Math.ceil(cFt) * cRate);
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
    var vhEl = document.getElementById('d-valance-height');
    var vh  = vhEl ? (parseFloat(vhEl.value) || 0) : 0;
    var vFt = Math.max(1, vw / 12);
    var vRate = dBoardRatePerFt(vh, D_VALANCE_PER_FT);
    // $200 minimum applies to the board itself, before trim is added.
    // Fabric is deliberately NOT added here — it is not included in the rate.
    valanceTotal = Math.max(D_BOARD_MIN, Math.ceil(vFt) * vRate);
    // Valance trim
    if (document.getElementById('d-valance-trim-check') && document.getElementById('d-valance-trim-check').checked) {
      valanceTotal += Math.ceil(vFt) * D_TRIM_PER_FT;
    }
  }

  // Trim on drapes
  var trimTotal = 0;
  var trimChecks = stOn('drape-trim-check');
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

  // Shipping estimate — FedEx/UPS; min $75 for drapes
  // $100 up to 180x150, $300 up to 250x200, $500 past that (base was $200 until 2026-09-23).
  // own base (higher than the $100 on Romans and boards) because a made-up drape
  // is bulkier. The finished panel decides it, not the cut count.
  var dShipEst = (typeof pbDraperyFreight === 'function')
    ? pbDraperyFreight(w, h)
    : ((w <= 180 && h <= 150) ? 100 : (w <= 250 && h <= 200) ? 300 : 500);

  // Per-window costs (labor, fabric, lining, trim) scale with quantity; the D_SET_MIN minimum
  // applies per set, with shipping added on top. Cornice/valance are single shared pieces and shipping is one estimate —
  // added ONCE, not multiplied by quantity.
  var perSetTotal = laborTotal + interlineTotal + fabricCost + liningCost + trimTotal;
  perSetTotal = Math.max(D_SET_MIN, perSetTotal); // minimum per set; shipping is added on top
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
  if (dShipEst) {
    drapeLines.push({ label: (dShipEst >= 500 ? 'Oversize freight (over 250″ × 200″)'
                           : dShipEst > 100 ? 'Oversize freight (over 180″ × 150″)'
                           : 'Shipping (FedEx/UPS)'), value: '$' + dShipEst });
    drapeLines.push({ label: '', value: (dShipEst >= 500
      ? 'This size can be ordered, but the freight is confirmed at order and may increase.'
      : (typeof PB_ST_SHIP_NOTE !== 'undefined' ? PB_ST_SHIP_NOTE : 'Shipping is an estimate and may change.')) });
  }
  drapeLines.push({ label: 'Fabric needed est.', value: '~' + (totalFabYds * qty).toFixed(1) + ' yds (pattern repeats add more)' });
  if (perSetTotal === D_SET_MIN) drapeLines.push({ label: 'Note', value: '$' + D_SET_MIN + ' minimum per drapery set, plus shipping' });
  if (w > D_APPROVE_W || h > D_APPROVE_H) {
    drapeLines.push(pbApprovalLine('Drapery over ' + D_APPROVE_W + '″ wide or ' + D_APPROVE_H + '″ long'));
  }
  var cvOverH = [];
  if (corniceTotal && cvOverApproval(cw, ch)) cvOverH.push('Cornice');
  if (valanceTotal && cvOverApproval(vw, vh)) cvOverH.push('Valance');
  if (cvOverH.length) drapeLines.push(pbApprovalLine(cvOverH.join(' and ') + ' ' + CV_APPROVE_TXT));
  // Past the published length ladder there is no rate to apply, so show the
  // spec without a price rather than a number we would have to walk back.
  if (overMaxLength) {
    drapeLines.push({ label: 'Length', value: h + '″ — over ' + D_LEN_MAX_AUTO + '″' });
  }
  pbRenderEstimate('drape-price-box', drapeLines,
    overMaxLength ? null : grandTotal,
    overMaxLength
      ? 'Drapery longer than ' + D_LEN_MAX_AUTO + '″ is priced by hand — send your specs and we\'ll quote it, usually within one business day.'
      : '',
    function(checkout) {
    pbCollectItem(drapeState.pleat || 'Custom Drapery', drapeLines, grandTotal, false);
    pbOpenCart();
    if (checkout) setTimeout(function(){
      var f=document.getElementById('pb-cart-foot'); if(f) f.style.display='block';
    }, 150);
  });
  _stShowPanel('drape-price-box');
  stSummary();
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
  var anyChecked = stOn('drape-trim-check').length > 0;
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
// Justin, Sept 2026: $35/linear ft at standard height with a $200 minimum per
// piece, and the per-foot rate steps up with face height — see dBoardRatePerFt
// above for the ladder (35 / 70 / 95 / 120 …). Fabric is NOT included at these
// rates; when we supply it, it is quoted separately rather than estimated here.
var CV_PER_FT     = 35;    // base rate at standard height
var CV_MIN_FT     = 4;
var CV_MIN_PRICE  = 200;   // minimum per cornice / per valance
var CV_TRIM_PER_FT= 15;
// Cornices and valances taller than this still show a price and can be submitted,
// but need our approval before they can be paid for (Justin, 2026-09-23).
// Applies to the standalone forms and the add-ons on the drapery form.
var CV_APPROVE_H  = 40;
var CV_APPROVE_W  = 150;   // Justin, 2026-09-23 — over either one needs approval
function cvOverApproval(w, h) { return w > CV_APPROVE_W || h > CV_APPROVE_H; }
var CV_APPROVE_TXT = 'over ' + CV_APPROVE_W + '″ wide or ' + CV_APPROVE_H + '″ tall';

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
  stOn(cls).forEach(function(cb) {
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
  stOn(edgeClass).forEach(function(cb) {
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
  if (!w) { box.style.display = 'none'; box._cvTotal = null; stSummary(); return; }
  // Total linear footage includes width + both end returns, always round UP to full foot
  var rawFt   = (w + ret * 2) / 12;
  var ft      = Math.max(CV_MIN_FT, Math.ceil(rawFt));
  // Per-foot rate steps up with face height; $200 minimum applies to the board.
  var cvRate  = dBoardRatePerFt(h, CV_PER_FT);
  var labor   = Math.max(CV_MIN_PRICE, ft * cvRate);
  var selTrimBtn = document.querySelector('#' + trimGrp + ' .opt-btn.sel');
  var selTrimTxt = selTrimBtn ? selTrimBtn.textContent.trim() : '';
  var hasTrim  = selTrimTxt.indexOf('Applied trim') !== -1;
  var isDblWelt= selTrimTxt === 'Double self welt';
  var isSelfWelt = selTrimTxt === 'Self welt' || isDblWelt;
  var trimFt   = hasTrim ? _cvTrimFt(trimClass, w, h, ret) : 0;
  var trimCost = Math.ceil(trimFt) * CV_TRIM_PER_FT;
  var fabricSup = document.querySelector('#' + fabricGrp + ' .opt-btn.sel');
  var weSupply  = fabricSup && fabricSup.textContent.trim() === 'We supply fabric';
  // Fabric is not included in the per-foot rate and is not estimated here — it
  // is quoted separately once the fabric is chosen. Estimating it off a
  // placeholder yard price produced a number we could not stand behind.
  //
  // Over 80″ the board will not ship parcel. It can be spliced — jointed board,
  // fabric still one piece — or shipped whole at oversize freight. The customer
  // answers that in the form; default is unspliced, so we quote the freight
  // rather than quietly leaving it out of the price.
  var spliceEl   = document.getElementById(boxId.replace('-price-box', '') + '-splice');
  var willSplice = spliceEl ? spliceEl.checked : false;
  // Splicing brings a wide board back to the base rate: jointed board, fabric
  // stays one piece, ships parcel.
  var cvShipBase = (typeof PB_ST_SHIP_BASE !== 'undefined') ? PB_ST_SHIP_BASE : 100;
  var cvFreight = willSplice ? cvShipBase
    : ((typeof pbBoardFreight === 'function') ? pbBoardFreight(w)
       : (w > 250 ? 400 : w > 160 ? 300 : w > 120 ? 250 : w > 80 ? 200 : cvShipBase));
  var isOversizeCV = cvFreight > cvShipBase;
  var total = labor + trimCost + cvFreight;
  var rows = '';
  rows += '<div style="font-size:12px;color:var(--text-dark);padding:4px 0">' + ft + ' linear ft (incl. ends) × $' + cvRate + '/ft' +
          (h > 15 ? ' <span style="color:var(--gold)">(' + h + '″ high)</span>' : '') + '</div>';
  if (labor > ft * cvRate) {
    rows += '<div style="font-size:12px;color:var(--text-dark);padding:3px 0">$' + CV_MIN_PRICE + ' minimum applied</div>';
  }
  if (hasTrim) {
    var trimEdges = _cvEdges(trimClass);
    rows += '<div style="font-size:12px;color:var(--text-dark);padding:3px 0">' + selTrimTxt + (trimEdges ? ' — ' + trimEdges : '') + '</div>';
  } else if (isSelfWelt) {
    var weltEdges = _cvEdges(trimClass.replace('-trim-', '-welt-'));
    rows += '<div style="font-size:12px;color:var(--text-dark);padding:3px 0">' + selTrimTxt + (weltEdges ? ' — ' + weltEdges : '') + '</div>';
  }
  rows += '<div style="font-size:12px;color:var(--text-dark);padding:3px 0">Fabric ' +
          (weSupply ? '(we supply)' : '(you supply)') +
          ' <span style="color:var(--gold)">not included &mdash; quoted separately</span></div>';
  if (w > D_OVERSIZE_W && willSplice) {
    rows += '<div style="font-size:12px;color:var(--text-dark);padding:3px 0">Spliced board &mdash; ships parcel <span style="color:var(--gold)">(no oversize freight)</span></div>';
  }
  var cvBand = w > 250 ? 250 : w > 160 ? 160 : w > 120 ? 120 : 80;
  rows += '<div style="font-size:12px;color:var(--text-dark);padding:3px 0">' + (isOversizeCV
      ? 'Oversize freight (over ' + cvBand + '&Prime; wide, not spliced)'
      : 'Shipping (FedEx/UPS)')
    + ' <span style="color:var(--gold)">$' + cvFreight + '</span></div>';
  rows += '<div style="font-size:11px;color:var(--text-dark);opacity:.75;padding:2px 0">' +
    ((typeof PB_ST_SHIP_NOTE !== 'undefined') ? PB_ST_SHIP_NOTE : 'Shipping is an estimate and may change.') + '</div>';
  if (cvOverApproval(w, h)) {
    rows += '<div style="font-size:12px;color:var(--gold);font-weight:600;padding:6px 0 2px">&#9888; ' + PB_APPROVAL_LABEL +
      ' <span style="font-weight:400;color:var(--text-dark)">&mdash; ' + CV_APPROVE_TXT + '. We review and approve this size before it can be paid for. Submit it as a request.</span></div>';
  }
  rows += '<div style="font-size:11px;font-weight:700;color:var(--cream);padding-top:8px;margin-top:6px;border-top:1px solid rgba(255,255,255,.1)">Est. total: $' + Math.ceil(total).toLocaleString() + '<span style="font-weight:400;color:var(--text-dark)"> + fabric</span></div>';
  document.getElementById(rowsId).innerHTML = rows;
  box._cvTotal = Math.ceil(total);   // read by the summary card only
  var noteEl = document.getElementById(noteId);
  if (noteEl) noteEl.textContent = 'Estimated pricing — confirmed at order. Fabric and trim pricing confirmed during consultation.';
  box.style.display = 'block';
  stSummary();
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
  if (!String(name || '').trim()) { alert('Please enter your name.'); return; }
  if (!_pbValidEmail(email)) { alert('Please enter a valid email address so we can send your quote.'); return; }
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  try {
    // Shared sender (js/shared.js): _t, every option row, notes, attached files → justin@blindznation.com
    await pbSendOrder({ name: name, email: email, phone: phone, product: product, lines: selections, notes: notes, scope: formEl });
    if (formEl) formEl.style.display = 'none';
    if (successEl) successEl.style.display = 'block';
  } catch(err) {
    if (btn) { btn.disabled = false; btn.textContent = 'Submit Order for Review →'; }
    var txt = 'Name: ' + name + '\nEmail: ' + email + (phone ? '\nPhone: ' + phone : '') + '\n\n' +
      (selections || []).map(function (l) { return l.label + ': ' + l.value; }).join('\n') + (notes ? '\n\nNotes: ' + notes : '');
    _pbShowSendFailure(_pbMailtoFor(product, name, txt), btn);
  }
}

async function submitCornice() {
  var name  = document.getElementById('cn-name').value.trim();
  var email = document.getElementById('cn-email').value.trim();
  var phone = document.getElementById('cn-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
  var selections = [
    { label: 'Type',         value: getOpt('grp-cv-type') },
    { label: 'Width',        value: (document.getElementById('cv-corn-w').value||'—') + '"' },
    { label: 'Height',       value: (document.getElementById('cv-corn-h').value||'—') + '"' },
    { label: 'Return depth', value: (document.getElementById('cv-corn-return').value||'4') + '"' },
    { label: 'Mount',        value: getOpt('grp-cv-corn-mount') || '—' },
    { label: 'Quantity',     value: ((document.getElementById('cv-corn-qty')||{}).value) || '1' },
    { label: 'Finishing',    value: _cvFinishDesc('grp-corn-trim','corn-welt-edge','corn-trim-edge') },
    { label: 'Trim supply',  value: getOpt('grp-corn-trim').indexOf('Applied trim') !== -1 ? getOpt('grp-corn-trim-supply') : '—' },
    { label: 'Fabric',       value: getOpt('grp-corn-fabric') || '—' },
    { label: 'Fabric direction', value: getOpt('grp-corn-direction') },
    { label: 'Splice board', value: (document.getElementById('corn-splice') || {}).checked ? 'Yes' : 'No' },
    { label: 'Delivery',     value: pbDeliveryLabel() },
    { label: 'Installation', value: (window.pbDelivery === 'install' || pbInstallRequested(document.getElementById('corn-form'))) ? 'Requested' : 'Not requested' }
  ];
  var cBox = document.getElementById('corn-price-box');
  if (cBox && cBox._cvTotal) selections.push({ label: 'Estimate', value: '$' + cBox._cvTotal.toLocaleString() + ' + fabric (quoted separately)' });
  var cLabels = (typeof pbGetShadeLabels === 'function') ? pbGetShadeLabels() : '';
  if (cLabels) selections.push({ label: 'Labels', value: cLabels });
  if (cvOverApproval(parseFloat(document.getElementById('cv-corn-w').value) || 0,
                     parseFloat(document.getElementById('cv-corn-h').value) || 0)) {
    selections.push(pbApprovalLine('Cornice ' + CV_APPROVE_TXT));
  }
  await _stApiSubmit('corn-form', 'corn-success', name, email, phone, getOpt('grp-cv-type') === 'Valance' ? 'Valance' : 'Cornice', selections, document.getElementById('cn-notes').value.trim());
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
  if (cvOverApproval(parseFloat(document.getElementById('cv-val-w').value) || 0,
                     parseFloat(document.getElementById('cv-val-h').value) || 0)) {
    selections.push(pbApprovalLine('Valance ' + CV_APPROVE_TXT));
  }
  await _stApiSubmit('val-form', 'val-cv-success', name, email, phone, 'Valance', selections, document.getElementById('vn-notes').value.trim());
}

function rnShowTrimSupply() {
  var any = stOn('rn-trim-check').length > 0;
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
  if(panel&&panel.style.display==='none'){ panel=null; }   // out-of-range size: no live estimate
  if(panel&&panel._pbLines&&panel._pbEstimate){
    pbCollectItem(drapeState.pleat||'Custom Drapery',panel._pbLines,panel._pbEstimate,false);
    pbOpenCart();
  } else {
    // Trigger calc which will build the estimate panel, then collect
    calcDrapePrice();
    var p2=document.getElementById('drape-price-box-checkout-panel');
    if(p2&&p2.style.display==='none'){ p2=null; }
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
  if(panel&&panel.style.display==='none'){ panel=null; }   // out-of-range size: no live estimate
  // Quote-only Romans carry no estimate, so require only the spec lines.
  if(panel&&panel._pbLines&&(panel._pbEstimate||RN_QUOTE_ONLY)){
    pbCollectItem(romanState.style||'Roman Shade',panel._pbLines,panel._pbEstimate,false);
    pbOpenCart();
  } else {
    calcRoman();
    var p2=document.getElementById('roman-pricebox-checkout-panel');
    if(p2&&p2.style.display==='none'){ p2=null; }
    if(p2&&p2._pbLines&&(p2._pbEstimate||RN_QUOTE_ONLY)){
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
  if (!name) { alert('Please enter your name.'); return; }
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
  var delivery   = pbDeliveryLabel();
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
        var placement = _rpPlacement();
        var rpFull = (function(){ var b=document.querySelector('#grp-rp-fullness .opt-btn.sel'); return b?b.textContent.trim():'2.0×'; })();
        return 'Casing: ' + casing + '  Header: ' + header + '  Placement: ' + placement + '  Fullness: ' + rpFull + '\n';
      }()) : '')
    + (!isRipple ? 'Return: ' + returnSz + '"  Overlap: ' + overlapSz + (overlapSz === '—' ? '' : '"') + '\n' : '')
    + (showHems ? 'Hems: side ' + sideHem + '"  bottom ' + bottomHem + '"\n' : '')
    + (isRipple ? 'Ripple fullness: ' + rippleFull + '  Hardware: ' + rippleHw + '  Snaps: ' + rippleSnaps + '\n' +
       'Butt master / Overlap: ' + rippleJoin + '\n' : '')
    + (function(){
        var trimSel = stOn('drape-trim-check');
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
    + '\nExact width: ' + (document.getElementById('d-exact-width').value ? document.getElementById('d-exact-width').value + '"' : '—')
    + '\nFinished length: ' + (document.getElementById('d-exact-length').value ? document.getElementById('d-exact-length').value + '"' : '—') + '\n'
    + 'Delivery: ' + delivery + '\n'
    + pbInstallLine(document.getElementById('drape-form')) + '\n\n'
    + 'Notes:\n' + (document.getElementById('d-notes').value.trim() || 'None')
    + (function(){ var fu = document.querySelector('#drape-form .pb-fu-wrap input[type="file"]'); var n = fu && fu.files.length ? '\n\nFiles to send: ' + Array.from(fu.files).map(function(f){return f.name;}).join(', ') + '\n(Customer will email these to justin@blindznation.com)' : ''; return n; }());
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
    { label: 'Width', value: (document.getElementById('d-exact-width').value || '—') + '"' },
    { label: 'Finished length', value: (document.getElementById('d-exact-length').value || '—') + '"' },
    { label: 'Return / Overlap', value: returnSz + (returnSz === '—' ? '' : '"') + ' / ' + overlapSz + (overlapSz === '—' ? '' : '"') },
    { label: 'Hardware', value: hwNeed + (hwType !== 'N/A' ? ' — ' + hwType : '') },
    { label: 'Delivery', value: delivery }
  ];
  if (showHems) drapeSelections.splice(8, 0, { label: 'Hems', value: 'Side ' + sideHem + '" / Bottom ' + bottomHem + '"' });
  if (isRipple) drapeSelections.splice(8, 0, { label: 'Butt master / Overlap', value: rippleJoin });
  if (isSubmitBox) drapeSelections.push({ label: 'Box pleat size', value: boxPleatSz + '"' });
  if (isSubmitGrommet) drapeSelections.push({ label: 'Grommet', value: gromSize + ' Ø · ' + gromColor + ' · ' + gromSupply });
  // Everything else the customer chose. These used to live only in the unused
  // "body" string above, so they never reached the request.
  if (fullness && fullness !== '—' && !isRipple && !isSubmitRP) drapeSelections.push({ label: 'Fullness', value: fullness });
  if (fabric === 'We supply the fabric') drapeSelections.push({ label: 'Fabric color', value: getOpt('grp-drape-color') });
  if (isSubmitRP) drapeSelections.push({ label: 'Rod pocket', value: 'Casing ' + getOpt('grp-rp-casing') + ' · Header ' + getOpt('grp-rp-header') + ' · ' + _rpPlacement() + ' · Fullness ' + getOpt('grp-rp-fullness') });
  if (isRipple) drapeSelections.push({ label: 'Ripple fold', value: 'Fullness ' + rippleFull + ' · Hardware ' + rippleHw + ' · Snaps: ' + rippleSnaps });
  var dTrim = stOn('drape-trim-check');
  if (dTrim.length) drapeSelections.push({ label: 'Trim', value: Array.from(dTrim).map(function(c){ return c.textContent.trim(); }).join(', ') + ' · ' + getOpt('grp-drape-trim-supply') });
  if (document.getElementById('d-cornice-check').checked) drapeSelections.push({ label: 'Cornice add-on', value: (document.getElementById('d-cornice-width').value || '—') + '" W × ' + (document.getElementById('d-cornice-height').value || '—') + '" H' + (document.getElementById('d-cornice-trim-check').checked ? ' + trim' : '') });
  if (document.getElementById('d-valance-check').checked) drapeSelections.push({ label: 'Valance add-on', value: (document.getElementById('d-valance-width').value || '—') + '" W × ' + (document.getElementById('d-valance-height').value || '—') + '" H' + (document.getElementById('d-valance-trim-check').checked ? ' + trim' : '') });
  var dEstPanel = document.getElementById('drape-price-box-checkout-panel');
  if (dEstPanel && dEstPanel.style.display !== 'none' && dEstPanel._pbEstimate) drapeSelections.push({ label: 'Estimate', value: '$' + dEstPanel._pbEstimate });
  var dLabels = (typeof pbGetShadeLabels === 'function') ? pbGetShadeLabels() : '';
  if (dLabels) drapeSelections.push({ label: 'Labels', value: dLabels });
  var drapeNotes = document.getElementById('d-notes').value.trim();
  if (window.pbDelivery === 'install' || pbInstallRequested(document.getElementById('drape-form'))) drapeSelections.push({ label: 'Installation', value: 'Requested' });
  // Carry any approval-required flags from the live estimate into the request.
  var dPanel = document.getElementById('drape-price-box-checkout-panel');
  ((dPanel && dPanel._pbLines) || []).forEach(function(l){ if (l && l.approval) drapeSelections.push(l); });
  await _stApiSubmit('drape-form', 'drape-success', name, email, phone, 'Custom Drapery', drapeSelections, drapeNotes);
}

// ── SUBMIT: ROMAN VALANCE ─────────────────────────────────
async function submitValance() {
  var name  = document.getElementById('rn-name').value.trim();
  var email = document.getElementById('rn-email').value.trim();
  var phone = document.getElementById('rn-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { alert('Please enter a valid email address.'); return; }
  var selections = [
    { label: 'Width',             value: (_getDim('rn-w','rn-w-frac') || '—') + '"' },
    { label: 'Height / drop',     value: (_getDim('rn-h','rn-h-frac') || '—') + '"' },
    { label: 'Mount',             value: getOpt('grp-roman-mount') },
    { label: 'Quantity',          value: (document.getElementById('rn-qty') || {}).value || '1' },
    { label: 'Lining',            value: getOpt('grp-val-lining') },
    { label: 'Fabric',            value: getOpt('grp-val-fabric') },
    { label: 'Number of folds',   value: document.getElementById('val-folds').value || '—' },
    { label: 'Fold section size', value: (document.getElementById('val-fold-size').value || '—') + '"' },
    { label: 'Delivery',          value: pbDeliveryLabel() }
  ];
  if (window.pbDelivery === 'install') selections.push({ label: 'Installation', value: 'Requested' });
  var vLabels = (typeof pbGetShadeLabels === 'function') ? pbGetShadeLabels() : '';
  if (vLabels) selections.push({ label: 'Labels', value: vLabels });
  await _stApiSubmit('roman-form', 'roman-success', name, email, phone, 'Roman Valance',
    selections, document.getElementById('rn-notes').value.trim());
}

// The Roman tab has one "Your details" step for both flows.
function submitRomanTab() {
  return (romanState.style === 'Roman Valance') ? submitValance() : submitRoman();
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
  var delivery    = pbDeliveryLabel();
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
        var trimSel = stOn('rn-trim-check');
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
  // Everything else the customer chose. These used to live only in the unused
  // "body" string above, so they never reached the request.
  if (romanState.fabric === 'We supply the fabric') romanSelections.push({ label: 'Fabric color', value: getOpt('grp-roman-color') });
  if (isMotor) romanSelections.push({ label: 'Motor', value: motorBrand + (motorPower !== '—' ? ' · ' + motorPower : '') + (motorHardwire !== '—' ? ' · ' + motorHardwire : '') });
  if (op === 'Manual chain') romanSelections.push({ label: 'Chain length', value: getOpt('grp-roman-clen') === 'Custom' ? (((document.getElementById('roman-clen-in') || {}).value || '—') + '"') : 'Default' });
  romanSelections.push({ label: 'Return', value: returnSz + '"' });
  if (mountStyle === 'Off Back') romanSelections.push({ label: 'Front valance', value: (getOpt('grp-rn-front-val-h') === 'Custom' ? frontVal : '6') + '"' });
  if (mountStyle === 'Waterfall' && getOpt('grp-roman-back-valance') === 'Add back valance') romanSelections.push({ label: 'Back valance', value: (getOpt('grp-rn-back-val-h') === 'Custom' ? ((document.getElementById('rn-valance-back') || {}).value || '6') : '6') + '" · ' + getOpt('grp-rn-back-val-fabric') });
  var rTrim = stOn('rn-trim-check');
  if (rTrim.length) romanSelections.push({ label: 'Trim', value: Array.from(rTrim).map(function(c){ return c.textContent.trim(); }).join(', ') + ' · ' + getOpt('grp-roman-trim-supply') });
  var rLabels = (typeof pbGetShadeLabels === 'function') ? pbGetShadeLabels() : '';
  if (rLabels) romanSelections.push({ label: 'Labels', value: rLabels });
  if (window.pbDelivery === 'install' || pbInstallRequested(document.getElementById('roman-form'))) romanSelections.push({ label: 'Installation', value: 'Requested' });
  // Carry any approval-required flag from the live estimate into the request.
  var rPanel = document.getElementById('roman-pricebox-checkout-panel');
  ((rPanel && rPanel._pbLines) || []).forEach(function(l){ if (l && l.approval) romanSelections.push(l); });
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


// ════════════════════════════════════════════════════════════════════════
// FORM-STANDARD HELPERS (CONFIGURATOR-STANDARD.md) — step numbering, toggle
// pills, the shared Delivery step on three tabs, and the summary cards.
// Display only: none of this feeds a price.
// ════════════════════════════════════════════════════════════════════════

// Multi-select pills ("select any"): each one toggles .sel on its own.
function stToggle(el) { el.classList.toggle('sel'); }
function stIsOn(el) { return !!(el && (el.checked || el.classList.contains('sel'))); }
// Every "on" element of a class — toggle pills (.sel) or legacy checkboxes (:checked).
function stOn(cls) { return document.querySelectorAll('.' + cls + '.sel, .' + cls + ':checked'); }

// Keep a data-pb-pills <select>'s pill row in step after code sets .value directly.
function _stSyncPills(sel) {
  if (!sel || !sel._pbPills) return;
  Array.prototype.forEach.call(sel._pbPills.children, function(b, i) { b.classList.toggle('sel', i === sel.selectedIndex); });
}

// Rod pocket placement pill → the code value it always sent.
function _rpPlacement() {
  var b = document.querySelector('#grp-rp-placement .opt-btn.sel');
  return b ? (b.getAttribute('data-val') || b.textContent.trim()) : '—';
}

// Roman mount deduction note follows the Inside / Outside pill.
function rnMountNote() {
  var inside = getOpt('grp-roman-mount') !== 'Outside mount';
  var i = document.getElementById('roman-mount-note-inside');
  var o = document.getElementById('roman-mount-note-outside');
  if (i) i.style.display = inside ? 'block' : 'none';
  if (o) o.style.display = inside ? 'none' : 'block';
}

// Number the visible steps of a tab 1..N in order (Roman Valance hides steps 3–6).
function stRenumber(tabId) {
  var tab = document.getElementById(tabId);
  if (!tab) return;
  var n = 0;
  Array.prototype.forEach.call(tab.querySelectorAll('.step-block'), function(b) {
    if (b.style.display === 'none') return;
    var num = b.querySelector('.step-num');
    if (num) num.textContent = ++n;
  });
}

// pbRenderEstimate never re-shows a panel that _clearEstimatePanel hid, so after an
// out-of-range size the estimate stayed hidden even once the size was valid again.
function _stShowPanel(boxId) {
  var p = document.getElementById(boxId + '-checkout-panel');
  if (p) p.style.display = '';
}

// One global delivery choice (window.pbDelivery), three grids — keep them all showing it.
function stDeliverySync() {
  var idx = window.pbDelivery === 'install' ? 1 : 0;
  document.querySelectorAll('.delivery-opt-grid').forEach(function(g) {
    Array.prototype.forEach.call(g.querySelectorAll('.delivery-opt-card'), function(c, i) { c.classList.toggle('sel', i === idx); });
  });
  stSummary();
}

// Summary cards ("Your configuration") on the drapery, Roman and cornice tabs.
function _stSet(id, v) { var e = document.getElementById(id); if (e) e.textContent = v; }
function stSummary() {
  var del = window.pbDelivery === 'install' ? 'Professional installation' : 'Ship to me';
  // Drapery
  if (document.getElementById('drape-summary')) {
    var dw = (document.getElementById('d-exact-width') || {}).value, dh = (document.getElementById('d-exact-length') || {}).value;
    var dq = parseInt((document.getElementById('drape-qty') || {}).value, 10) || 1;
    _stSet('ds-pleat', drapeState.pleat || '—');
    _stSet('ds-size', (dw && dh) ? dw + '″ W × ' + dh + '″ L' : '—');
    _stSet('ds-qty', dq + (dq === 1 ? ' set' : ' sets'));
    var pn = getOpt('grp-drape-panels');
    _stSet('ds-panels', pn === 'Single panel' ? 'Single — ' + getOpt('grp-drape-side') : pn);
    _stSet('ds-lining', drapeLiningLabel());
    _stSet('ds-fabric', drapeState.fabric || '—');
    _stSet('ds-delivery', del);
    var dp = document.getElementById('drape-price-box-checkout-panel');
    var dBox = document.getElementById('drape-price-box');
    var dLive = dp && dp.style.display !== 'none' && dp._pbLines;
    _stSet('ds-price', (dLive && dp._pbEstimate) ? '$' + Number(dp._pbEstimate).toLocaleString()
                     : ((dBox && dBox.innerHTML) || dLive) ? 'Custom quote' : '—');
  }
  // Roman
  if (document.getElementById('roman-summary')) {
    var isVal = romanState.style === 'Roman Valance';
    var rw = (document.getElementById('rn-w') || {}).value, rh = (document.getElementById('rn-h') || {}).value;
    _stSet('rn-pb-style', romanState.style || '—');
    _stSet('rn-pb-dims', (rw && rh) ? rw + '″ W × ' + rh + '″ H' : '—');
    _stSet('rn-pb-qty', (document.getElementById('rn-qty') || {}).value || '1');
    _stSet('rn-pb-mount', getOpt('grp-roman-mount'));
    _stSet('rn-pb-lining', isVal ? getOpt('grp-val-lining') : romanLiningLabel());
    _stSet('rn-pb-motor', getOpt('grp-roman-op'));
    var mr = document.getElementById('rn-pb-motor-row'); if (mr) mr.style.display = isVal ? 'none' : '';
    _stSet('rn-pb-delivery', del);
    var rp = document.getElementById('roman-pricebox-checkout-panel');
    _stSet('rn-pb-price', RN_QUOTE_ONLY ? 'Custom quote — we confirm pricing'
      : ((rp && rp.style.display !== 'none' && rp._pbEstimate) ? '$' + Number(rp._pbEstimate).toLocaleString() : '—'));
  }
  // Cornice / valance
  if (document.getElementById('corn-summary')) {
    var cw = (document.getElementById('cv-corn-w') || {}).value, ch = (document.getElementById('cv-corn-h') || {}).value;
    var cr = (document.getElementById('cv-corn-return') || {}).value;
    _stSet('cs-product', getOpt('grp-cv-type'));
    _stSet('cs-size', cw ? cw + '″ W × ' + (ch || '8') + '″ H' + (cr ? ' · ' + cr + '″ return' : '') : '—');
    _stSet('cs-mount', getOpt('grp-cv-corn-mount'));
    _stSet('cs-qty', (document.getElementById('cv-corn-qty') || {}).value || '1');
    _stSet('cs-finish', _cvFinishDesc('grp-corn-trim', 'corn-welt-edge', 'corn-trim-edge'));
    _stSet('cs-fabric', getOpt('grp-corn-fabric'));
    _stSet('cs-delivery', del);
    var cb = document.getElementById('corn-price-box');
    _stSet('cs-price', (cb && cb.style.display !== 'none' && cb._cvTotal) ? '$' + cb._cvTotal.toLocaleString() + ' + fabric' : '—');
  }
}
// Any pick, keystroke or tab change refreshes the summaries after the page's own handlers run.
['click', 'input', 'change'].forEach(function(ev) {
  document.addEventListener(ev, function() { setTimeout(stSummary, 0); });
});
