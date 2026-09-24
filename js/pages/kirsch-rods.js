// ── STATE ──
const S = {
  type: '',         // 'static'|'traverse'|'basic'|'unsure'
  collection: '',   // 'dm'|'wt'|'wi'|'arch'|'basic-sf'|'basic-ls'|'basic-tn'
  traverseSystem: '', // 'estate'|'architrac'
  architracModel: '', // '94001'|'94003'|'94004'|'94005'|'9046'|'9600'|'K-Rail'
  finish: '',
  finial: '',
  poleDia: '',
  poleStyle: '',    // 'Smooth'|'Fluted' (Wood Trends only)
  rodWidth: '',
  rodQty: 1,
  draw: '',
  header: '',
  fullness: '',
  mount: '',
  motorized: false,
  ampExtras: [],
  delivery: '',
  basicSubtype: '',
  basicDraw: '',
  basicOp: '',
  lockseamWidth: '',
  dmDuotoneFinish: '',
  dmPoleType: '',
  dmBracketType: '',
  dmRingType: '',
  dmEstateDia: ''
};

// ── DESCRIPTIONS (step-note under each pill row) ──
const TYPE_DESC = {
  static: '<strong>Stationary / decorative pole</strong> — drapery hangs from rings that slide manually. Rod stays fixed. Ideal for panels that rarely open and close. Designer Metals · Wood Trends · Wrought Iron · 1″ · 1⅜″ · 2″.',
  traverse: '<strong>Traversing</strong> — drapery travels smoothly on a track with carriers. One-way or two-way draw. Manual or AMP™ motorized. Max 16 ft / 64 lbs. Estate™ Traverse · Architrac® (7 models).',
  basic: '<strong>Basic / budget traverse</strong> — telescoping Superfine Pro or flat Lockseam rod. White finish only. Great for bedrooms, rentals, or back rooms. Superfine Pro · Lockseam · Tension Rods.',
  unsure: '<strong>Not sure?</strong> No problem — tell us about your space in the notes in Your details: what room, modern or traditional, will drapery open/close often, fabric weight, ceiling height, colors/metals you like. We\'ll recommend the right Kirsch system and follow up with a quote.'
};
const COLL_DESC = {
  dm: '<strong>Designer Metals™</strong> — 8 metal finishes: Elegant Brass, Gunmetal, Black, Satin Nickel, Brushed Bronze, Gilded Bronze, Antique Silver, Polished Nickel. 1" · 1⅜" · 2" · 27 finials · Estate Traverse · AMP™ ready.',
  wt: '<strong>Wood Trends™</strong> — 9 wood finishes: Black, Coffee, Dark Chocolate, Estate Oak, Mahogany, Marble, Truffle, White, Unfinished. 1⅜" · 2" · 18 finials · Estate Traverse · AMP™ ready.',
  wi: '<strong>Wrought Iron</strong> — 6 finishes: Black, Iron Oxide, Rust, Graphite, Chalk, Heirloom Copper. Sand-cast real wrought iron. 1" · 1⅜" · 18 finials · 1⅜" Estate · AMP™ ready.'
};
const ARCH_DESC = {
  '94001': '<strong>94001</strong> (best seller) — wall, ceiling, or recessed. One-way 20ft / 80 lbs · Two-way 40ft / 160 lbs. AMP™ motorized (max 16ft / 64 lbs). Draw: Hand, Cord, Baton, Duplex, Motorized. Bent (12" radius) or curved — manual only. Pleated &amp; Ripplefold™.',
  '94003': '<strong>94003</strong> — wall, ceiling, or recessed. One-way 20ft / 80 lbs · Two-way 40ft / 160 lbs. Draw: Hand &amp; Baton only. Can be bent (12" radius) or curved. Pleated &amp; Ripplefold™.',
  '94004': '<strong>94004</strong> (best seller) — ceiling or recessed only. One-way 16ft / 64 lbs · Two-way 32ft / 128 lbs. Draw: Hand &amp; Baton only. Cannot be bent or curved. Low-profile ¾" track. Pre-drilled 16" on center. Pleated &amp; Ripplefold™.',
  '94005': '<strong>94005</strong> — ceiling or recessed only. One-way 16ft / 64 lbs · Two-way 32ft / 128 lbs. Draw: Hand &amp; Baton only. Can be bent (12" radius) or curved. Pre-drilled 16" on center. Pleated &amp; Ripplefold™.',
  '9046': '<strong>9046</strong> — ceiling or recessed only. One-way 16ft / 64 lbs · Two-way 32ft / 128 lbs. Draw: Hand &amp; Baton only. Bent (8" or 12" radius) or curved. Pleated only. Hospital/cubicle curtain track.',
  '9600': '<strong>9600</strong> — ceiling, wall, recessed, or suspension mount. One-way 20ft / 80 lbs · Two-way 40ft / 160 lbs. Draw: Hand &amp; Baton only. Bent (12" or 14" radius) or curved. Pleated only.',
  'K-Rail': '<strong>K-Rail</strong> — ceiling or wall mount. One-way 16ft / 64 lbs · Two-way 16ft / 64 lbs. Draw: Hand &amp; Baton only. Cannot be bent or curved. Pleated &amp; Ripplefold™. Compatible with Wrought Iron &amp; Wood Trends finials.'
};
const BASIC_DESC = {
  superfine: '<strong>Superfine Pro traverse rod</strong> — telescoping traverse rod. Single split draw (30"–228"), one-way draw (30"–120"), or double split draw (48"–156"). Continuous loop, baton, or hand draw. White only. Front return 2¾"–4½".',
  lockseam: '<strong>Lockseam rod</strong> — flat-profile stationary curtain rods. ½" to 8½" face widths. Single, double (3½"+2½"), triple (5½"+3½"+2½"), or bay rod (78"–127"). White only.',
  tension: '<strong>Spring tension / sash rod</strong> — no brackets needed. Spring tension rods (⅝" oval 8"–72", ⁷⁄₁₆" 18"–48"), door sash rods (⁵⁄₁₆" 11"–36", ⁷⁄₁₆" 18"–28"), or flat sash (¹¹⁄₁₆" 16"–50"). Mostly White; Zinc available on door sash.'
};

// ── STEP NUMBERING / VISIBILITY ──
function renumberSteps() {
  let n = 0;
  document.querySelectorAll('#cfg-steps > .step-block').forEach(b => {
    if (b.style.display === 'none') return;
    n++; const s = b.querySelector('.step-num'); if (s) s.textContent = n;
  });
}
function setStepVisible(id, on) { const e = document.getElementById(id); if (e) e.style.display = on ? '' : 'none'; }
// Re-evaluate every dependent step after any answer changes (replaces the old Next/Back paging).
function refreshAll() {
  const unsure = S.type === 'unsure';
  ['step-coll','step-finish','step-finial','step-config'].forEach(id => setStepVisible(id, !unsure));
  setStepVisible('step-dia', S.type === 'static');
  setStepVisible('step-motor', !!S.type && !unsure);
  updateStep2(); updateStep3(); updateDiaStep(); updateStep4(); updateStep5(); updateStep6();
  // Width hint in Step 1 follows the rod type
  const wh = document.getElementById('rod-width-hint');
  if (wh) wh.innerHTML = S.type === 'traverse'
    ? 'inches &middot; measure bracket to bracket (finished opening + overlap). Estate min 18", max 192" (16ft).'
    : S.type === 'basic'
      ? 'inches &middot; we\'ll select the right telescoping size for your measurement.'
      : 'inches &middot; rod length. Most poles extend 6"–12" per side beyond the window frame.';
  renumberSteps();
  updateSummary();
}
function markSel(groupId, val) {
  document.querySelectorAll('#' + groupId + ' .opt-btn').forEach(b => b.classList.toggle('sel', !!val && b.getAttribute('data-val') === val));
}

// Clear the answers of the configuration step (they belong to the previous rod type / collection).
function resetConfig() {
  ['draw','header','fullness','mount','basicOp','lockseamWidth','dmPoleType','dmBracketType','dmRingType','dmEstateDia','poleStyle'].forEach(k => { S[k] = ''; });
  document.querySelectorAll('#step-config .opt-btn.sel, #step-dia .opt-btn.sel').forEach(b => b.classList.remove('sel'));
  const rf = document.getElementById('ripplefold-options'); if (rf) rf.style.display = 'none';
  const sf = document.getElementById('sf-draw-note'); if (sf) sf.style.display = 'none';
  const w2 = document.getElementById('dm-estate-2in-warn'); if (w2) w2.style.display = 'none';
}

// ── STEP 2: ROD USE ──
function selectType(t, el) {
  if (S.type !== t) {
    S.collection = ''; S.traverseSystem = ''; S.architracModel = ''; S.basicSubtype = '';
    S.finish = ''; S.finial = ''; S.poleDia = ''; S.dmDuotoneFinish = '';
    clearFinishSel(); resetConfig();
  }
  S.type = t;
  markSel('grp-type', t);
  document.getElementById('type-note').innerHTML = TYPE_DESC[t] || '';
  refreshAll();
}

// ── STEP 3: COLLECTION / SYSTEM ──
function updateStep2() {
  hide('decor-collections'); hide('traverse-systems'); hide('basic-options');
  document.getElementById('architrac-model-picker').style.display = 'none';
  document.getElementById('coll-placeholder').style.display = S.type ? 'none' : '';
  const title = document.getElementById('sec2-title');

  if (S.type === 'static') {
    show('decor-collections');
    title.textContent = 'Collection';
  } else if (S.type === 'traverse') {
    show('traverse-systems');
    title.textContent = 'Decorative or functional traverse?';
    if (S.traverseSystem === 'architrac') {
      document.getElementById('architrac-model-picker').style.display = 'block';
      title.textContent = 'Traverse system & Architrac® model';
    }
  } else if (S.type === 'basic') {
    show('basic-options');
    title.textContent = 'Basic hardware type';
  } else {
    title.textContent = 'Collection';
  }
  markSel('grp-coll', ['dm','wt','wi'].includes(S.collection) ? S.collection : '');
  markSel('grp-trav-sys', S.traverseSystem);
  markSel('grp-arch-model', S.architracModel);
  markSel('grp-basic', S.basicSubtype);
}

function selectCollection(c, el) {
  if (S.collection !== c) { S.finish = ''; S.finial = ''; S.poleDia = ''; S.dmDuotoneFinish = ''; clearFinishSel(); resetConfig(); }
  S.collection = c;
  // For traverse type, collection implies Estate system
  if (S.type === 'traverse' && c !== 'arch') {
    S.traverseSystem = 'estate';
  }
  document.getElementById('coll-note').innerHTML = COLL_DESC[c] || '';
  refreshAll();
}

function selectTraverseSystem(sys, el) {
  S.traverseSystem = sys;
  if (sys === 'architrac') {
    if (S.collection !== 'arch') { S.finish = ''; S.finial = ''; clearFinishSel(); }
    S.collection = 'arch';
  }
  refreshAll();
}

function selectArchitracModel(m, el) {
  S.architracModel = m;
  document.getElementById('arch-note').innerHTML = ARCH_DESC[m] || '';
  refreshAll();
}

function selectBasic(sub, el) {
  if (S.basicSubtype !== sub) resetConfig();
  S.basicSubtype = sub;
  S.collection = 'basic-' + sub;
  document.getElementById('basic-note').innerHTML = BASIC_DESC[sub] || '';
  refreshAll();
}

// ── STEP 4: FINISH ──
function updateStep3() {
  hide('finish-dm'); hide('finish-wt'); hide('finish-wi'); hide('finish-arch'); hide('finish-basic');
  document.getElementById('finish-placeholder').style.display = S.collection ? 'none' : '';
  if (!S.collection) return;
  if (S.collection === 'dm') show('finish-dm');
  else if (S.collection === 'wt') show('finish-wt');
  else if (S.collection === 'wi') show('finish-wi');
  else if (S.collection === 'arch') show('finish-arch');
  else show('finish-basic');
}

function selectFinish(f, el) {
  // Block Unfinished on Estate Traverse — stationary poles only
  if (f === 'Unfinished' && S.type === 'traverse') {
    alert('Unfinished finish is not available on Estate™ Traverse Rods. Please choose a stained or painted finish.');
    return;
  }
  S.finish = f;
  const box = el && el.closest('#finish-dm, #finish-wt, #finish-wi, #finish-arch, #finish-basic');
  if (box) box.querySelectorAll('.finish-card, .opt-btn').forEach(c => c.classList.remove('sel'));
  if (el) el.classList.add('sel');
  updateSummary();
}

function clearFinishSel() {
  document.querySelectorAll('#step-finish .finish-card, #step-finish .opt-btn').forEach(c => c.classList.remove('sel'));
}

// ── STEP 5: POLE DIAMETER (stationary) ──
function updateDiaStep() {
  if (S.type !== 'static') return;
  hide('sz-pole-style');
  show('sz-pole-diameter');
  if (S.collection === 'wt') show('sz-pole-style');
  const opts = document.getElementById('pole-dia-opts');
  let diameters = [];
  if (S.collection === 'dm') diameters = ['1"','1⅜"']; // 2" is Estate traverse only — no 2" stationary DM pole exists
  else if (S.collection === 'wt') diameters = ['1⅜"','2"'];
  else if (S.collection === 'wi') diameters = ['1"','1⅜"'];
  if (S.poleDia && !diameters.includes(S.poleDia)) S.poleDia = '';
  opts.innerHTML = diameters.length
    ? diameters.map(d => `<button class="opt-btn${S.poleDia === d ? ' sel' : ''}" onclick="selectPoleDia('${d.replace(/"/g,'&quot;')}', this)">${d}</button>`).join('')
    : '<div class="placeholder-note">Choose a collection above to see its pole diameters.</div>';
}

function selectPoleDia(d, el) {
  S.poleDia = d;
  refreshAll();
}

// ── STEP 6: FINIALS ──
function updateStep4() {
  // Hide all finial panels
  ['finials-dm-1','finials-dm-138','finials-dm-2','finials-wi-1','finials-wi-138','finials-wt-138','finials-wt-2','finials-arch','finials-basic'].forEach(hide);
  document.getElementById('finial-placeholder').style.display = S.collection ? 'none' : '';

  document.getElementById('sec4-title').textContent = 'Finial';
  document.getElementById('sec4-sub').textContent = 'Select the finial style for the ends of your pole or rod.';
  const kr = document.getElementById('dm-krail-note');
  if (kr) kr.style.display = 'none';

  if (!S.collection) return;
  if (S.collection === 'dm') {
    // 1⅜" shown by default (most common) until a diameter is chosen
    if (S.poleDia === '1"') show('finials-dm-1');
    else if (S.poleDia === '2"') show('finials-dm-2');
    else show('finials-dm-138');
    if (kr) kr.style.display = S.poleDia === '1⅜"' ? '' : 'none';
  } else if (S.collection === 'wt') {
    if (S.poleDia === '2"') show('finials-wt-2');
    else show('finials-wt-138');
  } else if (S.collection === 'wi') {
    if (S.poleDia === '1"') show('finials-wi-1');
    else show('finials-wi-138');
  } else if (S.collection === 'arch') {
    show('finials-arch');
    document.getElementById('sec4-title').textContent = 'Track finish — no finials';
    document.getElementById('sec4-sub').textContent = 'Architrac® is a concealed track with no visible finials.';
  } else {
    show('finials-basic');
    document.getElementById('sec4-title').textContent = 'No finials on basic hardware';
    document.getElementById('sec4-sub').textContent = 'Finial plugs (White) are included with all stationary pole sets.';
  }
  // Keep the visible selection in step with S.finial
  document.querySelectorAll('#step-finial .opt-btn').forEach(b => {
    if (b.closest('#grp-dm-duotone')) return;
    const m = /select(?:DM)?Finial\('((?:[^'\\]|\\.)*)'/.exec(b.getAttribute('onclick') || '');
    const panel = b.closest('[id^="finials-"]');
    const visible = panel && panel.style.display !== 'none';
    b.classList.toggle('sel', !!(visible && m && S.finial && m[1].replace(/&quot;/g, '"') === S.finial));
  });
  // Duotone pair picker only belongs to a Duotone finial
  const isDuo = S.collection === 'dm' && /Duotone/.test(S.finial || '');
  const picker = document.getElementById('dm-duotone-picker');
  if (picker) picker.style.display = isDuo ? '' : 'none';
  if (!isDuo) S.dmDuotoneFinish = '';
  document.querySelectorAll('#grp-dm-duotone .opt-btn').forEach(b => b.classList.toggle('sel', !!S.dmDuotoneFinish && (b.getAttribute('onclick') || '').indexOf("'" + S.dmDuotoneFinish + "'") >= 0));
}

function selectFinial(f, el) {
  S.finial = f;
  S.dmDuotoneFinish = '';
  document.querySelectorAll('#step-finial .opt-btn').forEach(c => { if (!c.closest('#grp-dm-duotone')) c.classList.remove('sel'); });
  if (el) el.classList.add('sel');
  const picker = document.getElementById('dm-duotone-picker');
  if (picker) picker.style.display = 'none';
  const d = el && el.getAttribute('data-desc');
  document.getElementById('sec4-sub').textContent = f + (d ? ' — ' + d : '') + '. Sold in pairs.';
  updateSummary();
}

// ── STEP 7: CONFIGURATION ──
function updateStep5() {
  hide('sz-stationary'); hide('sz-traverse'); hide('sz-basic');
  hide('sz-superfine-opts'); hide('sz-lockseam-opts'); hide('sz-tension-opts');
  document.getElementById('mount-recessed').style.display = S.collection === 'arch' ? '' : 'none';
  document.getElementById('config-placeholder').style.display = (S.type && S.type !== 'unsure') ? 'none' : '';
  const title = document.getElementById('config-title');

  if (S.type === 'static') {
    show('sz-stationary');
    title.textContent = 'Pole length, brackets & rings';
    // Pole length info
    const info = document.getElementById('pole-length-info');
    if (S.collection === 'dm') {
      info.innerHTML = S.poleDia === '1"'
        ? '<strong>Designer Metals™ 1" poles:</strong> Fixed lengths only — 4\'(48"), 6\'(72"), 8\'(96"). No telescoping for 1". Splice with #1042812 for runs over 8\'.'
        : '<strong>Designer Metals™ 1⅜" poles:</strong> Fixed 4\'/6\'/8\' or Telescoping 36"–66", 66"–120", 120"–180". All 8 finishes. Splice with #73304061 for runs over 15\'.' ;
    }
    else if (S.collection === 'wt') info.innerHTML = '<strong>Wood Trends™ poles:</strong> Fixed 4\', 6\', 8\', 12\' — Smooth or Fluted. Can be spliced for longer runs with Pole Connector #5610E061 — <strong>always support every splice with a bracket.</strong> To cut: wrap with painter\'s tape, cut with fine-tooth saw, drill new finial pilot hole. <strong>1⅜" broken-pack pricing/piece:</strong> 4\'=$25.80 · 6\'=$38.61 · 8\'=$49.56 · 12\'=$77.32 (6 pieces/box). <strong>2" broken-pack pricing/piece:</strong> 4\'=$58.52 · 6\'=$85.20 · 8\'=$112.97 · 12\'=$172.41 (2 pieces/box).';
    else if (S.collection === 'wi') info.innerHTML = '<strong>Wrought Iron poles:</strong> Fixed 6\' or 8\'. Can be spliced and spliced with internal rod splice for longer runs.';
    else info.innerHTML = 'Choose a collection above to see pole lengths.';
    // DM stationary detail sections (pole type, bracket, ring) — DM + diameter chosen
    const dmOn = S.collection === 'dm' && !!S.poleDia;
    ['dm-pole-type-section','dm-bracket-section','dm-ring-section'].forEach(id => { const e = document.getElementById(id); if (e) e.style.display = dmOn ? '' : 'none'; });
    if (dmOn) updateDMSubSections(S.poleDia);

  } else if (S.type === 'traverse') {
    show('sz-traverse');
    title.textContent = 'Draw, header & mounting';
    const info = document.getElementById('traverse-limits-info');
    if (S.traverseSystem === 'estate' || (S.collection && S.collection !== 'arch')) {
      const estPrice = S.collection === 'wt' ? ' AMP™ motorization available — pricing confirmed at quote.' : '';
      info.innerHTML = '<strong>Estate™ Traverse Rod:</strong> Min 18" · Max 192" (16ft) · Max 64 lbs / 4 lbs per ft. Tracks over 8ft: splice + keystone included. AMP™ available (max 16ft motorized, cannot curve when motorized). Pleated or Ripplefold™ headers.' + estPrice + (S.collection === 'wt' ? ' <strong>Note:</strong> Unfinished finish not available on Estate™ Traverse Rods.' : '');
      // Show DM Estate dia picker
      const dmED = document.getElementById('dm-estate-dia');
      if (dmED) dmED.style.display = S.collection === 'dm' ? '' : 'none';
    } else if (S.collection === 'arch') {
      const dmED = document.getElementById('dm-estate-dia');
      if (dmED) dmED.style.display = 'none';
      // Data verified against official Kirsch spec sheets (v2.26 / v7.25 / v11.23)
      const archLimits = {
        '94001': 'One-Way manual <strong>20ft / 80 lbs</strong> · Two-Way manual <strong>40ft / 160 lbs</strong>. <strong>AMP™ motorized: 16ft / 64 lbs max.</strong> Draw types: Hand, Cord, Baton, Duplex, Motorized. Can be bent (12" radius) or curved — <strong>manual only</strong>. Cannot be convex bent/curved. AMP cannot be bent or curved. Wall, ceiling, or recessed mount. Pleated &amp; Ripplefold™. Colors: White (94270H025) · Gray (94270H090) · Bronze (94270H064) · Black (94270H059).',
        '94003': 'One-Way <strong>20ft / 80 lbs</strong> · Two-Way <strong>40ft / 160 lbs</strong>. Draw types: Hand &amp; Baton only. Can be bent (12" radius) or curved. Wall, ceiling, or recessed mount. Pleated &amp; Ripplefold™. Colors: White (94373025) · Gray (94373090) · Bronze (94373064) · Black (94373059).',
        '94004': 'One-Way <strong>16ft / 64 lbs</strong> · Two-Way <strong>32ft / 128 lbs</strong>. Draw types: Hand &amp; Baton only. <strong>Cannot be bent or curved.</strong> Ceiling or recessed mount only. Pre-drilled 16" on center; max bracket spacing 32". Pleated &amp; Ripplefold™. Colors: White (94374025) · Gray (94374090) · Bronze (94374064) · Black (94374059).',
        '94005': 'One-Way <strong>16ft / 64 lbs</strong> · Two-Way <strong>32ft / 128 lbs</strong>. Draw types: Hand &amp; Baton only. Can be bent (12" radius) or curved. Ceiling or recessed mount only. Pre-drilled 16" on center; max bracket spacing 32". Pleated &amp; Ripplefold™. Colors: White (94375025) · Gray (94375090) · Bronze (94375064) · Black (94375059).',
        '9046':  'One-Way <strong>16ft / 64 lbs</strong> · Two-Way <strong>32ft / 128 lbs</strong>. Draw types: Hand &amp; Baton only. Can be bent (8" or 12" radius) or curved. Ceiling or recessed mount only. Pleated only. Hospital/cubicle curtain track.',
        '9600':  'One-Way <strong>20ft / 80 lbs</strong> · Two-Way <strong>40ft / 160 lbs</strong>. Draw types: Hand &amp; Baton only. Can be bent (12" or 14" radius) or curved. Ceiling, wall, recessed, or suspension mount. Pleated only.',
        'K-Rail': 'One-Way <strong>16ft / 64 lbs</strong> · Two-Way <strong>16ft / 64 lbs</strong>. Draw types: Hand &amp; Baton only. <strong>Cannot be bent or curved.</strong> Ceiling or wall mount. Pleated &amp; Ripplefold™. Compatible with Wrought Iron and Wood Trends finials.'
      };
      const m = S.architracModel || '94001';
      info.innerHTML = '<strong>Architrac® ' + m + ':</strong> ' + (archLimits[m] || archLimits['94001']) + ' All models: max 4 lbs/ft drapery weight.';
    } else {
      info.innerHTML = 'Choose a traverse system above to see its length and weight limits.';
    }
  } else if (S.type === 'basic') {
    show('sz-basic');
    title.textContent = 'Rod options';
    if (S.basicSubtype === 'superfine') show('sz-superfine-opts');
    else if (S.basicSubtype === 'lockseam') show('sz-lockseam-opts');
    else if (S.basicSubtype === 'tension') show('sz-tension-opts');
  } else {
    title.textContent = 'Rod configuration';
  }
}

function selectDraw(d) { S.draw = d; updateSummary(); }
function showSFNote(type) {
  var el = document.getElementById('sf-draw-note');
  if (!el) return;
  var msgs = {
    'split':  'Split Draw: available in 30"–48", 48"–84", 66"–120", 84"–156", and 156"–228". Front return 2¾"–4½".',
    'oneway': 'One-Way Draw (Left or Right): available up to 66"–120" maximum. Not available above 120". Front return 2¾"–4½".',
    'double': 'Double Traverse Split Draw: available in 48"–84" and 84"–156" only. Front return 2¾"–4½" and 5¼"–6½".'
  };
  el.textContent = msgs[type] || '';
  el.style.display = msgs[type] ? 'block' : 'none';
}
function selectHeader(h) {
  S.header = h;
  document.getElementById('ripplefold-options').style.display = h === 'Ripplefold' ? 'block' : 'none';
  updateSummary();
}
function selectFullness(f) { S.fullness = f; updateSummary(); }
function selectMount(m) { S.mount = m; updateSummary(); }
function selectBasicOp(o) { S.basicOp = o; updateSummary(); }
function selectLockseam(w) { S.lockseamWidth = w; updateSummary(); }

// ── STEP 8: MOTORIZATION (AMP) ──
function updateStep6() {
  // AMP only available on Estate traverse or Architrac 94001
  const isEstate = S.traverseSystem === 'estate';
  const isArch94001 = S.collection === 'arch' && S.architracModel === '94001';
  const ampEligible = isEstate || isArch94001;
  const sub = document.getElementById('sec6-sub');
  if (ampEligible) {
    show('amp-eligible');
    hide('amp-not-eligible');
    // Bend warning only for 94001 (AMP cannot be bent/curved)
    document.getElementById('amp-bend-warning').style.display = isArch94001 ? 'block' : 'none';
    if (sub) sub.textContent = isArch94001
      ? 'AMP™ motorization is available on Architrac® 94001. Max 16ft motorized. Track cannot be bent or curved when motorized.'
      : 'AMP™ motorization is available on Estate™ traverse rods.';
  } else {
    hide('amp-eligible');
    show('amp-not-eligible');
    if (S.motorized) setAMP(false);
    if (S.ampExtras.length) { S.ampExtras = []; document.querySelectorAll('#amp-extras .opt-btn').forEach(b => b.classList.remove('sel')); }
    if (sub) {
      if (S.collection === 'arch') {
        sub.textContent = 'AMP™ motorization is only available on Architrac® 94001. Your selected model (' + (S.architracModel || 'N/A') + ') is manual-only.';
      } else {
        sub.textContent = 'AMP™ motorization is only available on Estate™ traverse rods and Architrac® 94001.';
      }
    }
  }
  document.getElementById('wt-accessories').style.display = S.collection === 'wt' ? 'block' : 'none';
  if (S.collection !== 'wt' && wtAccessories.length) {
    wtAccessories.length = 0;
    document.querySelectorAll('#wt-accessories .opt-btn').forEach(b => b.classList.remove('sel'));
  }
}

const wtAccessories = [];
function toggleWTAccessory(el, key) {
  el.classList.toggle('sel');
  const idx = wtAccessories.indexOf(key);
  if (idx >= 0) wtAccessories.splice(idx, 1);
  else wtAccessories.push(key);
  updateSummary();
}

function setAMP(on, el) {
  S.motorized = !!on;
  markSel('grp-amp', S.motorized ? 'yes' : 'no');
  document.getElementById('amp-extras').style.display = S.motorized ? 'block' : 'none';
  updateSummary();
}
// Legacy name kept for any old caller.
function toggleAMP() { setAMP(!S.motorized); }

function toggleAMPExtra(el, key) {
  el.classList.toggle('sel');
  const idx = S.ampExtras.indexOf(key);
  if (idx >= 0) S.ampExtras.splice(idx, 1);
  else S.ampExtras.push(key);
  updateSummary();
}

// ── SUMMARY CARD ──
function rodWidth() { return (document.getElementById('rod-width') || {value:''}).value; }
function rodQty() { return (document.getElementById('rod-qty') || {value:'1'}).value || '1'; }
function updateSummary() {
  const sum = document.getElementById('quote-summary');
  if (!sum) return;
  const w = rodWidth();
  const rows = [
    ['Product', 'Kirsch drapery hardware'],
    ['Size', w ? w + '" wide' : '—'],
    ['Mount', S.mount || S.dmBracketType || '—'],
    ['Qty', rodQty()],
    ['Rod type', S.type === 'static' ? 'Stationary / Decorative' : S.type === 'traverse' ? 'Traverse / Traversing' : S.type === 'basic' ? 'Basic Hardware' : S.type === 'unsure' ? 'Custom Quote' : '—'],
    ['Collection', S.collection ? collectionLabel() : ''],
    ['Finish', S.finish || ''],
    ['Finial', S.finial || ''],
    ['Pole diameter', S.poleDia || S.dmEstateDia || ''],
    ['Pole type', S.dmPoleType || ''],
    ['Duotone combo', S.dmDuotoneFinish ? S.dmDuotoneFinish : ((S.finial||'').includes('Duotone') ? '⚠ Not selected — REQUIRED' : '')],
    ['Ring type', S.dmRingType || ''],
    ['Pole style', S.poleStyle || ''],
    ['Draw', S.draw || ''],
    ['Header style', S.header ? (S.header + (S.fullness ? ' ' + S.fullness : '')) : ''],
    ['Operation', S.basicOp || ''],
    ['Rod size', S.lockseamWidth || ''],
    ['AMP™ motorization', (S.type && S.type !== 'unsure') ? (S.motorized ? 'Yes — ' + (S.ampExtras.length ? S.ampExtras.join(', ') : 'motor only') : 'No') : ''],
  ].filter(r => r[1]);
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
  sum.innerHTML = rows.map(r => `<div class="summary-row"><span class="sr-key">${r[0]}</span><span class="sr-val">${esc(r[1])}</span></div>`).join('') +
    '<div class="summary-row" style="border-top:0.5px solid rgba(255,255,255,.2);margin-top:6px;padding-top:10px"><span class="sr-key">Price</span><span class="sr-val">Custom quote — we confirm pricing</span></div>';
}
// Kept for any legacy caller.
function updateStep7() { updateSummary(); }

function collectionLabel() {
  const map = {dm:'Designer Metals™',wt:'Wood Trends™',wi:'Wrought Iron','basic-superfine':'Superfine Pro (Basic)','basic-lockseam':'Lockseam (Basic)','basic-tension':'Tension / Sash (Basic)'};
  if (S.collection === 'arch') return 'Architrac® ' + (S.architracModel || '');
  return map[S.collection] || S.collection;
}

// ── SUBMIT ──
function addKirschToCart(){
  if(!S.type){ alert('Please select a rod type before adding to cart.'); return; }

  const width=rodWidth();
  const qty=rodQty();

  const lines=[
    {label:'Product',value:'Kirsch Drapery Hardware'},
    {label:'Rod Type',value:S.type==='static'?'Stationary/Decorative':S.type==='traverse'?'Traverse Rod':S.type==='unsure'?'Custom Quote — help me decide':'Basic Hardware'},
    {label:'System',value:S.traverseSystem==='estate'?'Estate™ Traverse':S.traverseSystem==='architrac'?'Architrac® '+(S.architracModel||'94001'):collectionLabel()||'—'},
    {label:'Collection',value:collectionLabel()||'—'},
    {label:'Finish',value:S.finish||'—'},
    {label:'Finial',value:S.finial||'N/A'},
    {label:'Pole Diameter',value:S.poleDia||S.dmEstateDia||'—'},
    {label:'Width',value:(width||'—')+(width?'"':'')},
    {label:'Quantity',value:String(qty)},
    {label:'Draw',value:S.draw||'N/A'},
    {label:'Mount',value:S.mount||'—'},
    {label:'AMP Motor',value:S.motorized?'Yes — Motor #62001300':'No'}
  ];
  const specs=lines.map(l=>l.label+': '+l.value).join(' | ');
  pbAddToCart({product:'Kirsch Drapery Hardware',lines:lines,specs:specs,price:null,qty:parseInt(qty)||1});
  pbOpenCart();
}

function submitQuote() {
  const name = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const errEl = document.getElementById('cf-contact-err');
  if (errEl) errEl.style.display = 'none';
  if (!name) { if (errEl) { errEl.textContent = 'Please enter your name.'; errEl.style.display = 'block'; } return; }
  if (!phone && !email) { if (errEl) { errEl.textContent = 'Please enter a phone number or email address.'; errEl.style.display = 'block'; } return; }

  const notes = document.getElementById('cf-notes').value;
  const addr = document.getElementById('cf-address').value;

  const body = [
    S.type === 'unsure' ? '=== KIRSCH HARDWARE HELP REQUEST ===' : '=== KIRSCH ROD QUOTE REQUEST ===',
    '',
    'CONTACT',
    'Name: ' + name,
    'Phone: ' + (phone || 'Not provided'),
    'Email: ' + (email || 'Not provided'),
    'Location: ' + (addr || 'Not provided'),
    '',
    'CONFIGURATION',
    'Rod Type: ' + (S.type === 'static' ? 'Stationary/Decorative' : S.type === 'traverse' ? 'Traverse Rod' : S.type === 'unsure' ? 'Not sure — help me decide' : 'Basic Hardware'),
    'System: ' + (S.traverseSystem === 'estate' ? 'Estate™ Traverse' : S.traverseSystem === 'architrac' ? ('Architrac® ' + (S.architracModel || '94001')) : ''),
    'Collection: ' + collectionLabel(),
    'Finish/Color: ' + (S.finish || 'Not specified'),
    'Finial: ' + (S.finial || 'N/A'),
    'Pole Diameter: ' + (S.poleDia || S.dmEstateDia || 'N/A'),
    ...(S.dmEstateDia ? ['Estate Rod Size: ' + S.dmEstateDia] : []),
    ...(S.dmDuotoneFinish ? ['Duotone Combo: ' + S.dmDuotoneFinish] : []),
    ...(S.dmPoleType ? ['Pole Type: ' + S.dmPoleType] : []),
    ...(S.dmBracketType ? ['Bracket Type: ' + S.dmBracketType] : []),
    ...(S.dmRingType ? ['Ring Type: ' + S.dmRingType] : []),
    'Pole Style: ' + (S.poleStyle || 'N/A'),
    'Width: ' + (rodWidth() || 'See notes'),
    'Quantity: ' + rodQty(),
    'Draw Type: ' + (S.draw || 'N/A'),
    ...(S.basicOp ? ['Operation: ' + S.basicOp] : []),
    ...(S.lockseamWidth ? ['Rod Type / Size: ' + S.lockseamWidth] : []),
    'Header Style: ' + (S.header || 'N/A') + (S.fullness ? ' ' + S.fullness : ''),
    'Mounting: ' + (S.mount || 'N/A'),
    '',
    'MOTORIZATION',
    'AMP™ Motor: ' + (S.motorized ? 'YES — Motor #62001300' : 'No'),
    'AMP™ Extras: ' + (S.ampExtras.length ? S.ampExtras.join(', ') : 'None'),
    'Pole Style: ' + (S.poleStyle || 'N/A'),
    'Accessories Requested: ' + (wtAccessories.length ? wtAccessories.join(', ') : 'None'),
    '',
    'DELIVERY / SERVICE',
    'Preference: ' + (window.pbDelivery === 'install' ? 'Professional Installation' : 'Ship to Customer'),
    '',
    'NOTES',
    notes || 'None',
    '',
    '--- Sent from blindznation.com/pages/kirsch-rods.html ---'
  ].join('\n');

  const subject = S.type === 'unsure' ? 'Kirsch Hardware Help — ' + name : 'Kirsch Rod Quote — ' + collectionLabel() + ' — ' + name;
  window.location.href = 'mailto:justin@blindznation.com?subject=' + encodeURIComponent('Blindznation — ' + subject) + '&body=' + encodeURIComponent('BLINDZNATION\n\n' + body);

  document.getElementById('config-main').style.display = 'none';
  document.getElementById('success-box').style.display = 'block';
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// ── DM-SPECIFIC FUNCTIONS ──

function selectDMFinial(name, el) {
  S.finial = name;
  S.dmDuotoneFinish = '';
  document.querySelectorAll('#step-finial .opt-btn').forEach(c => { if (!c.closest('#grp-dm-duotone')) c.classList.remove('sel'); });
  if (el) el.classList.add('sel');
  const isDuotone = name === 'Maxwell Duotone' || name === 'Briggs Duotone';
  const picker = document.getElementById('dm-duotone-picker');
  if (picker) picker.style.display = isDuotone ? '' : 'none';
  if (isDuotone) {
    document.querySelectorAll('#grp-dm-duotone .opt-btn').forEach(p => p.classList.remove('sel'));
  }
  updateSummary();
}

function selectDuotonePair(pair, el) {
  S.dmDuotoneFinish = pair;
  document.querySelectorAll('#grp-dm-duotone .opt-btn').forEach(p => p.classList.remove('sel'));
  if (el) el.classList.add('sel');
  updateSummary();
}

function selectDMPoleType(t, el) {
  S.dmPoleType = t;
  document.querySelectorAll('#grp-dm-pole-type .opt-btn').forEach(p => p.classList.remove('sel'));
  if (el) el.classList.add('sel');
  updateSummary();
}

function selectDMBracket(b, el) {
  S.dmBracketType = b;
  // Deselect all bracket pills in both groups
  ['grp-dm-bracket-1','grp-dm-bracket-138'].forEach(g => {
    const grp = document.getElementById(g);
    if (grp) grp.querySelectorAll('.opt-btn').forEach(p => p.classList.remove('sel'));
  });
  if (el) el.classList.add('sel');
  updateSummary();
}

function selectDMRing(r, el) {
  S.dmRingType = r;
  ['grp-dm-ring-1','grp-dm-ring-138'].forEach(g => {
    const grp = document.getElementById(g);
    if (grp) grp.querySelectorAll('.opt-btn').forEach(p => p.classList.remove('sel'));
  });
  if (el) el.classList.add('sel');
  updateSummary();
}

function selectDMEstateDia(dia, el) {
  S.dmEstateDia = dia;
  S.poleDia = dia.replace(' Estate','');
  document.querySelectorAll('#grp-dm-estate-dia .opt-btn').forEach(p => p.classList.remove('sel'));
  if (el) el.classList.add('sel');
  const warn = document.getElementById('dm-estate-2in-warn');
  if (warn) warn.style.display = dia.startsWith('2"') ? '' : 'none';
  refreshAll();
}

function updateDMSubSections(dia) {
  // Show all three DM stationary sections
  ['dm-pole-type-section','dm-bracket-section','dm-ring-section'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = '';
  });

  const is1in = dia === '1"';
  const is138 = dia === '1⅜"';

  // Pole length notes
  const n1 = document.getElementById('dm-pole-1-note');
  const n138 = document.getElementById('dm-pole-138-note');
  if (n1) n1.style.display = is1in ? '' : 'none';
  if (n138) n138.style.display = is138 ? '' : 'none';

  // Telescoping pills — 1⅜" only
  document.querySelectorAll('.dm-tele-only').forEach(el => {
    el.style.display = is138 ? '' : 'none';
  });

  // Bracket options
  const b1 = document.getElementById('dm-bracket-1-opts');
  const b138 = document.getElementById('dm-bracket-138-opts');
  if (b1) b1.style.display = is1in ? '' : 'none';
  if (b138) b138.style.display = is138 ? '' : 'none';

  // Ring options
  const r1 = document.getElementById('dm-ring-1-opts');
  const r138 = document.getElementById('dm-ring-138-opts');
  if (r1) r1.style.display = is1in ? '' : 'none';
  if (r138) r138.style.display = is138 ? '' : 'none';
}

// ── HELPERS ──
function show(id) { const el = document.getElementById(id); if (el) el.style.display = ''; }
function hide(id) { const el = document.getElementById(id); if (el) el.style.display = 'none'; }

// Shared quantity stepper (dim-box qty-btns) — clamps to input min/max.
function kAdjQty(id, delta) {
  const el = document.getElementById(id);
  if (!el) return;
  const min = parseInt(el.min) || 1;
  const max = parseInt(el.max) || 50;
  let v = (parseInt(el.value) || min) + delta;
  if (v < min) v = min;
  if (v > max) v = max;
  el.value = v;
  updateSummary();
}

// Single-select pill within its .opt-row (group arg kept for old call sites).
function toggleOptPill(el, group) {
  if (group) {
    const container = el.closest('.opt-row');
    if (container) container.querySelectorAll('.opt-btn').forEach(p => p.classList.remove('sel'));
    el.classList.add('sel');
  } else {
    el.classList.toggle('sel');
  }
  updateSummary();
}

// ── INIT (called after the shared delivery/contact steps are rendered) ──
function initKirsch() { refreshAll(); }
