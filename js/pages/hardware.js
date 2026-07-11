var hwState = { type:'', style:'', brand:'' };

function hwReveal(id) {
  var el = document.getElementById(id);
  el.classList.add('on');
  setTimeout(function(){ el.scrollIntoView({ behavior:'smooth', block:'nearest' }); }, 60);
}
function hwUpdateSummary() {
}

function hwPickType(type) {
  hwState.type = type; hwState.style = ''; hwState.brand = '';
  document.getElementById('card-decorative').classList.toggle('sel', type === 'decorative');
  document.getElementById('card-functional').classList.toggle('sel', type === 'functional');
  // Reset downstream
  document.getElementById('sec-decorative').classList.remove('on');
  document.getElementById('sec-functional').classList.remove('on');
  document.getElementById('dec-brand-step').classList.remove('on');
  document.getElementById('sec-quote').classList.remove('on');
  document.querySelectorAll('#dec-type-cards .opt-btn').forEach(function(c){ c.classList.remove('sel'); });
  document.querySelectorAll('#dec-brand-cards .brand-card').forEach(function(c){ c.classList.remove('sel'); });

  if (type === 'decorative') {
    hwReveal('sec-decorative');
  } else {
    hwReveal('sec-functional');
    // Kirsch basics starts at type selection — no auto-reveal of form
  }
}

// ── KIRSCH BASICS CONFIGURATOR ────────────────────────────
var kfType = '';

function kfSetType(type, el) {
  kfType = type;
  document.querySelectorAll('#kf-step1 .opt-btn').forEach(function(c){ c.classList.remove('sel'); });
  if (el) el.classList.add('sel');

  // Show/hide sub-option panels
  ['traverse','lockseam','tension','sash'].forEach(function(t) {
    var el2 = document.getElementById('kf-' + t + '-opts');
    if (el2) el2.style.display = t === type ? 'block' : 'none';
  });

  var titles = {
    traverse: 'Traverse rod configuration',
    lockseam: 'Curtain rod options',
    tension:  'Tension rod options',
    sash:     'Sash rod options'
  };
  document.getElementById('kf-step2-title').textContent = titles[type] || 'Options';
  document.getElementById('kf-step2').style.display = 'block';
  document.getElementById('kf-step3').style.display = 'block';
  // Mount is already chosen inside the Architrac configurator — don't repeat it in Step 3
  var mountGroup = document.getElementById('kf-mount-group');
  if (mountGroup) mountGroup.style.display = type === 'traverse' ? 'none' : '';
  kfUpdate();
  // Traverse: wait until user enters a width before showing the quote form (archCalc reveals it)
  if (type !== 'traverse') hwReveal('sec-quote');
  setTimeout(function() {
    var s = document.getElementById('kf-step2');
    if (s) { var nav = document.getElementById('site-nav'); var off = nav ? nav.offsetHeight + 12 : 86; window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - off, behavior: 'smooth' }); }
  }, 80);
}

function kfUpdate() {
  var qty = parseInt(document.getElementById('kf-qty').value) || 1;
  var mount = (document.querySelector('#grp-kf-mount .opt-btn.sel') || {}).textContent || 'Wall mount';
  var lines = [];

  if (kfType === 'traverse') {
    // Traverse uses the Architrac sub-configurator — its own summary (archCalc) handles the spec
    // panel and email. Do not duplicate here.
    return;
  } else if (kfType === 'lockseam') {
    var config = (document.querySelector('#grp-kf-rconfig .opt-btn.sel') || {}).textContent || '—';
    var diam   = (document.querySelector('#grp-kf-diam .opt-btn.sel') || {}).textContent || '—';
    var width2 = (document.querySelector('#grp-kf-ls-width .opt-btn.sel') || {}).textContent || '—';
    lines = [
      {l:'System', v:'Kirsch Lockseam® Curtain Rod'},
      {l:'Configuration', v:config},
      {l:'Rod diameter', v:diam.replace(/<[^>]+>/g,'').trim()},
      {l:'Width range', v:width2},
      {l:'Mount', v:mount},
      {l:'Quantity', v:qty + ' rod(s)'},
      {l:'Finish', v:'White · Brackets included'}
    ];
  } else if (kfType === 'tension') {
    var ttype = (document.querySelector('#grp-kf-ten-type .opt-btn.sel') || {}).textContent || '—';
    var twidth= (document.querySelector('#grp-kf-ten-width .opt-btn.sel') || {}).textContent || '—';
    lines = [
      {l:'System', v:'Kirsch Tension Rod'},
      {l:'Type', v:ttype},
      {l:'Width range', v:twidth},
      {l:'Quantity', v:qty + ' rod(s)'},
      {l:'Finish', v:'White (zinc for door sash)'}
    ];
  } else if (kfType === 'sash') {
    var stype = (document.querySelector('#grp-kf-sash-type .opt-btn.sel') || {}).textContent || '—';
    var swidth= (document.querySelector('#grp-kf-sash-width .opt-btn.sel') || {}).textContent || '—';
    lines = [
      {l:'System', v:'Kirsch Lockseam® Sash Rod'},
      {l:'Type', v:stype},
      {l:'Width range', v:swidth},
      {l:'Mount', v:mount},
      {l:'Quantity', v:qty + ' rod(s)'},
      {l:'Finish', v:'White'}
    ];
  }

  if (!lines.length) return;
  var html = lines.map(function(l) {
    return '<div style="display:flex;justify-content:space-between;font-size:12px;padding:4px 0;border-bottom:.5px solid rgba(45,224,193,.15)">' +
      '<span style="color:var(--text-muted)">' + l.l + '</span>' +
      '<span style="color:var(--cream);font-weight:500">' + l.v + '</span>' +
      '</div>';
  }).join('');
  document.getElementById('kf-summary-lines').innerHTML = html;
  document.getElementById('kf-summary').style.display = 'block';

  // Pre-fill the quote form
  document.getElementById('hw-notes').placeholder = 'e.g. ' + (lines[0].v) + ', ' + qty + ' window(s), ' + mount.toLowerCase() + '. Any other details…';
}

function kfGetSummary() {
  if (kfType === 'traverse') {
    // Architrac configurator — use its dedicated summary only
    return (window._archSummary || []).join('\n');
  }
  var lines = [];
  document.querySelectorAll('#kf-summary-lines > div').forEach(function(d) {
    var spans = d.querySelectorAll('span');
    if (spans.length >= 2) lines.push(spans[0].textContent + ': ' + spans[1].textContent);
  });
  return lines.join('\n');
}

// ── ARCHITRAC CONFIGURATOR ────────────────────────────────────
var ARCH_MODEL_NOTES = {
  '94001': '94001 Cord draw — standard residential traverse. Wall or ceiling mount. Solid workhorse for most installs.',
  '94003': '94003 Architrac (Recommended) — wall or ceiling mount, can be curved for bay windows. Most versatile option for any application.',
  '94004': '94004 Easy ceiling mount — flange on back of track for flush ceiling installation. Great for low-clearance ceilings.',
  '94005': '⚠ 94005 Direct mount — screws go through the track. Requires low-profile trim screws. Difficult to adjust after install. Not recommended.'
};

var ARCH_BATONS = [
  {sku:'BA80A',len:24,att:'Plastic',price:3.71},
  {sku:'BA80S',len:24,att:'Stainless Steel',price:3.71},
  {sku:'BA81A',len:30,att:'Plastic',price:3.90},
  {sku:'BA81S',len:30,att:'Stainless Steel',price:3.90},
  {sku:'BA82A',len:36,att:'Plastic',price:5.20},
  {sku:'BA82S',len:36,att:'Stainless Steel',price:5.20},
  {sku:'BA84A',len:48,att:'Plastic',price:7.80},
  {sku:'BA84S',len:48,att:'Stainless Steel',price:7.80},
  {sku:'BA86A',len:60,att:'Plastic',price:9.10},
  {sku:'BA86S',len:60,att:'Stainless Steel',price:9.10},
  {sku:'BA88A',len:72,att:'Plastic',price:10.40},
  {sku:'BA88S',len:72,att:'Stainless Steel',price:10.40},
  {sku:'BA94A',len:84,att:'Plastic',price:12.35},
  {sku:'BA96A',len:96,att:'Plastic',price:13.00}
];

var _archModel = '94003';
var _archSelectedBatons = [];

function archSelModel(model, el) {
  _archModel = model;
  ['94001','94003','94004','94005'].forEach(function(m) {
    var c = document.getElementById('arch-' + m + '-card');
    if (c) c.classList.toggle('sel', m === model);
  });
  var note = document.getElementById('arch-model-note');
  if (note) note.textContent = ARCH_MODEL_NOTES[model] || '';

  // Cord length: 94001 only (cord-draw model)
  var cordWrap = document.getElementById('arch-cord-wrap');
  if (cordWrap) cordWrap.style.display = model === '94001' ? 'block' : 'none';

  archCalc();
}

function archCalc() {
  var w = parseFloat(document.getElementById('arch-width').value) || 0;
  var drawSel = (document.querySelector('#grp-kf-draw .opt-btn.sel') || {}).textContent || '';
  var isSplit = drawSel.indexOf('Split') !== -1;
  var acc = document.getElementById('arch-accessories');
  if (!w) { if (acc) acc.style.display = 'none'; return; }
  if (acc) acc.style.display = 'block';
  hwReveal('sec-quote');

  // Brackets: 1 per foot (every 12") + 2 extra
  var feetBrackets = Math.ceil(w / 12);
  var totalBrackets = feetBrackets + 2;
  var bInp = document.getElementById('arch-brackets-inp');
  if (bInp) bInp.value = totalBrackets;
  var bCount = document.getElementById('arch-bracket-count');
  if (bCount) bCount.textContent = totalBrackets + ' brackets';
  var bNote = document.getElementById('arch-bracket-note');
  if (bNote) bNote.innerHTML = '<strong>' + feetBrackets + '</strong> brackets (1 per foot for ' + Math.ceil(w/12) + ' ft) + <strong>2 extra</strong> = <strong>' + totalBrackets + ' total</strong>. Edit the quantity below if needed.';

  // Master carriers: 1 set per pair
  var masterWrap = document.getElementById('arch-master-wrap');
  var mNote = document.getElementById('arch-master-note');
  var mInp = document.getElementById('arch-masters-inp');
  if (isSplit) {
    if (masterWrap) masterWrap.style.display = 'block';
    if (mNote) mNote.innerHTML = 'Split draw: <strong>1 overlap set</strong> (1 over-arm + 1 under-arm) at the center per pair of panels. Default is 1 set. Add more sets if you have additional panel pairs.';
    if (mInp && parseInt(mInp.value) < 1) mInp.value = 1;
    var soldTag = masterWrap ? masterWrap.querySelector('[style*="gold-mid"]') : null;
    if (soldTag) soldTag.textContent = 'Sold in pairs — 1 over + 1 under';
  } else {
    if (masterWrap) masterWrap.style.display = 'block';
    if (mNote) mNote.innerHTML = 'One-way draw: <strong>1 single-arm master carrier</strong> at the leading edge of the panel. Specify left or right in the notes.';
    if (mInp && parseInt(mInp.value) < 1) mInp.value = 1;
    var soldTag = masterWrap ? masterWrap.querySelector('[style*="gold-mid"]') : null;
    if (soldTag) soldTag.textContent = 'Single-arm carrier';
  }

  // Carriers: ball bearing (standard) or ripplefold snap carriers
  var pleatSelNow = (document.querySelector('#grp-arch-pleat .opt-btn.sel') || {}).textContent || '';
  var isRipple = pleatSelNow.toLowerCase().indexOf('ripple') !== -1;
  var numRods = isSplit ? 2 : 1; // split draw = 2 rods, one-way = 1 rod
  var calcWidth = isRipple ? (w + 10 * numRods) : w; // +10" per rod for ripplefold snap carriers
  var rawCarriers = Math.ceil(calcWidth / 50 * 25);
  var carrierLabel = document.getElementById('arch-carrier-label');
  if (carrierLabel) carrierLabel.textContent = isRipple ? 'Ripplefold snap carriers' : 'Ball bearing carriers';
  var cInp = document.getElementById('arch-carriers-inp');
  if (cInp) cInp.value = rawCarriers;
  var cCount = document.getElementById('arch-carrier-count');
  if (cCount) cCount.textContent = rawCarriers + ' carriers';
  var cNote = document.getElementById('arch-carrier-note');
  if (cNote) {
    if (isRipple) {
      cNote.innerHTML = 'Ripplefold: track ' + w + '″ + <strong>' + (10 * numRods) + '″ extra</strong> (' + numRods + ' rod × 10″) = <strong>' + calcWidth + '″</strong> → <strong>' + rawCarriers + ' snap carriers</strong>. Edit below if needed.';
    } else {
      cNote.innerHTML = '<strong>25 carriers per 50″</strong> of track for ' + w + '″ = <strong>' + rawCarriers + ' carriers</strong>. Edit below if needed.';
    }
  }

  // Batons: 1 per panel — sold individually, default 1 each
  var numPanels = isSplit ? 2 : 1;
  var bainp = document.getElementById('arch-batons-inp');
  if (bainp && parseInt(bainp.value) < numPanels) bainp.value = numPanels; // only set if lower than default
  var bainpLabel = bainp ? bainp.closest('div') : null;
  // Update baton count label
  var batonSetsNote = document.querySelector('#arch-accessories .qty-val, #arch-batons-inp + *');
  // note is in the qty section
  var batonQtyDiv = bainp ? bainp.closest('[style]') : null;
  var bcn = document.getElementById('arch-baton-custom-note');
  if (bcn) bcn.textContent = 'White only. Need a custom color? Use the link below.';

  archRenderBatons();

  // Auto-sync bracket/carrier color to track color unless user manually overrode it
  var trackColorBtn = document.querySelector('#grp-arch-color .opt-btn.sel');
  var trackIsBlack = (trackColorBtn || {}).textContent.indexOf('Black') !== -1;
  ['grp-bracket-color','grp-carrier-color'].forEach(function(gid) {
    var btns = document.querySelectorAll('#' + gid + ' .opt-btn');
    if (!btns.length) return;
    var grpEl = document.getElementById(gid);
    if (grpEl && !grpEl.dataset.manualSet) {
      btns.forEach(function(b){ b.classList.remove('sel'); });
      btns[trackIsBlack ? 1 : 0].classList.add('sel');
    }
  });

  // Read actual user-adjusted quantities (not auto-calculated)
  var finalBrackets = parseInt((document.getElementById('arch-brackets-inp') || {}).value) || totalBrackets;
  var finalCarriers = parseInt((document.getElementById('arch-carriers-inp') || {}).value) || rawCarriers;
  var finalMasters  = parseInt((document.getElementById('arch-masters-inp')  || {}).value) || 1;
  var finalBatons   = parseInt((document.getElementById('arch-batons-inp')   || {}).value) || numPanels;

  // Extract clean color labels (strip dot-span whitespace)
  function colorLabel(grpSel, fallback) {
    var t = ((document.querySelector(grpSel + ' .opt-btn.sel') || {}).textContent || fallback).trim();
    return t.replace(/^\s+|\s+$/g,'').replace(/\s+/g,' ');
  }
  var color        = colorLabel('#grp-arch-color', 'White');
  var bracketColor = colorLabel('#grp-bracket-color', color);
  var carrierColor = colorLabel('#grp-carrier-color', color);
  var mount   = (document.querySelector('#grp-arch-mount .opt-btn.sel') || {}).textContent || 'Wall mount';
  var pleatSel = (document.querySelector('#grp-arch-pleat .opt-btn.sel') || {}).textContent || 'Pinch pleat';
  var ripplePct = pleatSel.indexOf('Ripple') !== -1
    ? ' — ' + ((document.querySelector('#grp-arch-ripple-pct .opt-btn.sel') || {}).textContent || '80%') + ' fullness'
    : '';
  var cordSel = _archModel === '94001'
    ? ((document.querySelector('#grp-arch-cord .opt-btn.sel') || {}).textContent || '').trim()
    : '';

  window._archSummary = [
    'Architrac model: ' + _archModel,
    'Track width: ' + w + '"',
    'Draw: ' + drawSel.split('—')[0].trim(),
    'Drapery style: ' + pleatSel.trim() + ripplePct,
    'Track color: ' + color,
    'Mount: ' + mount,
    (_archModel === '94001' && cordSel ? 'Cord length: ' + cordSel : ''),
    'Brackets: ' + finalBrackets + ' — ' + bracketColor,
    isSplit
      ? 'Master carriers: ' + finalMasters + ' overlap set(s) (over + under arm each)'
      : 'Master carrier: ' + finalMasters + ' single-arm (specify left or right in notes)',
    (isRipple ? 'Ripplefold snap carriers' : 'Ball bearing carriers') + ': ' + finalCarriers + ' — ' + carrierColor,
    'Batons: ' + finalBatons + ' (1 per panel, sold individually)'
  ].filter(Boolean);
}

function archTogglePleat(type) {
  var rippleOpts = document.getElementById('arch-ripple-opts');
  if (rippleOpts) rippleOpts.style.display = type === 'ripple' ? 'block' : 'none';
  archCalc();
}

function archRenderBatons() {
  var clipSel = (document.querySelector('#grp-arch-baton-clip .opt-btn.sel') || {}).textContent || 'Plastic clip';
  var isPlastic = clipSel.indexOf('Plastic') !== -1 || clipSel.indexOf('plastic') !== -1;
  var filtered = ARCH_BATONS.filter(function(b) {
    return isPlastic ? b.att === 'Plastic' : b.att === 'Stainless Steel';
  });
  var grid = document.getElementById('arch-baton-grid');
  if (!grid) return;
  grid.innerHTML = filtered.map(function(b) {
    var sel = _archSelectedBatons.indexOf(b.sku) !== -1;
    return '<div onclick="archToggleBaton(\'' + b.sku + '\',this)" style="border:1.5px solid ' + (sel ? 'var(--gold)' : '#e8e8e4') + ';background:' + (sel ? 'var(--gold-mid)' : '#fff') + ';border-radius:8px;padding:10px 12px;cursor:pointer;transition:border-color .15s">' +
      '<div style="font-size:13px;font-weight:600;color:#1a1a1a">' + b.len + '"</div>' +
      '<div style="font-size:10px;color:#888;margin-top:2px">' + b.sku + '</div>' +
      '<div style="font-size:13px;font-weight:700;color:var(--espresso);margin-top:4px">$' + b.price.toFixed(2) + '</div>' +
      '</div>';
  }).join('');
}

function archToggleBaton(sku, el) {
  var idx = _archSelectedBatons.indexOf(sku);
  if (idx === -1) {
    _archSelectedBatons.push(sku);
    el.style.borderColor = 'var(--gold)';
    el.style.background = 'var(--gold-mid)';
  } else {
    _archSelectedBatons.splice(idx, 1);
    el.style.borderColor = '#e8e8e4';
    el.style.background = '#fff';
  }
}

// Auto-init: make Traverse the default when non-decorative is selected
(function() {
  var origHwPickType = window.hwPickType;
  window.hwPickType = function(type) {
    if (origHwPickType) origHwPickType(type);
    if (type === 'functional') {
      // Auto-select Traverse as default
      setTimeout(function() {
        var traverseCard = document.querySelector('#kf-step1 .opt-btn:first-child');
        if (traverseCard && !traverseCard.classList.contains('sel')) {
          kfSetType('traverse', traverseCard);
        }
      }, 50);
    }
  };
})();

function hwPickStyle(el, style) {
  hwState.style = style; hwState.brand = '';
  document.querySelectorAll('#dec-type-cards .opt-btn').forEach(function(c){ c.classList.remove('sel'); });
  el.classList.add('sel');
  document.getElementById('dec-brand-step').classList.remove('on');
  document.getElementById('sec-quote').classList.remove('on');

  if (style === 'Specialty / Custom') {
    // Specialty goes straight to form (no brand needed)
    hwUpdateSummary();
    hwReveal('sec-quote');
  } else {
    hwReveal('dec-brand-step');
  }
}

function hwPickBrand(el, brand) {
  hwState.brand = brand;
  document.querySelectorAll('#dec-brand-cards .brand-card').forEach(function(c){ c.classList.remove('sel'); });
  el.classList.add('sel');
  hwUpdateSummary();
  hwReveal('sec-quote');
}

function submitHardware() {
  var name  = document.getElementById('hw-name').value.trim();
  var phone = document.getElementById('hw-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
  var delivery = getOpt('grp-del-hw');
  // Include Kirsch selection if non-decorative
  var kirschSummary = (hwState.type !== 'decorative' && typeof kfGetSummary === 'function') ? kfGetSummary() : '';
  var body = 'HARDWARE QUOTE REQUEST\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone
    + '\nEmail: ' + (document.getElementById('hw-email').value.trim() || '—') + '\n\n'
    + 'Hardware type: ' + (hwState.type === 'decorative' ? 'Decorative' : 'Non-decorative — Kirsch Basics') + '\n'
    + (hwState.style ? 'Style: ' + hwState.style + '\n' : '')
    + (hwState.brand ? 'Brand: ' + hwState.brand + '\n' : '')
    + (kirschSummary ? '\nKIRSCH SELECTION:\n' + kirschSummary + '\n' : '')
    + '\nQty (windows): ' + (document.getElementById('kf-qty') ? document.getElementById('kf-qty').value : document.getElementById('hw-qty').value) + '\n'
    + 'Width: ' + document.getElementById('hw-width').value + '\n'
    + 'Finish: ' + document.getElementById('hw-finish').value + '\n'
    + 'Delivery: ' + delivery + '\n\n'
    + 'Notes:\n' + (document.getElementById('hw-notes').value.trim() || 'None');
  window.location.href = 'mailto:blindznation@gmail.com'
    + '?subject=' + encodeURIComponent('Hardware Quote — ' + (hwState.style || hwState.type) + ' — ' + name)
    + '&body=' + encodeURIComponent(body);
  document.getElementById('hw-form').style.display = 'none';
  document.getElementById('hw-success').style.display = 'block';
}
