renderNav('Kirsch Rods');
renderFooter(false);

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

const TOTAL_STEPS = 7;

// ── STEP BAR ──
function renderStepBar(current) {
  const bar = document.getElementById('step-bar');
  let html = '';
  for (let i = 1; i <= TOTAL_STEPS; i++) {
    const cls = i < current ? 'done' : i === current ? 'active' : '';
    html += `<div class="step-dot"><div class="step-circle ${cls}">${i < current ? '✓' : i}</div></div>`;
    if (i < TOTAL_STEPS) html += `<div class="step-line ${i < current ? 'done' : ''}"></div>`;
  }
  bar.innerHTML = html;
}

// ── NAVIGATION ──
let currentStep = 1;

function goStep(n) {
  // Hide all sections
  document.querySelectorAll('.section').forEach(s => s.classList.remove('on'));

  if (n === 'unsure') {
    document.getElementById('sec-unsure').classList.add('on');
    document.getElementById('step-bar').style.display = 'none';
    return;
  }

  currentStep = n;
  renderStepBar(n);
  document.getElementById('step-bar').style.display = 'flex';

  const sec = document.getElementById('sec-' + n);
  if (sec) sec.classList.add('on');

  // Update step content based on current state
  if (n === 2) updateStep2();
  if (n === 3) updateStep3();
  if (n === 4) updateStep4();
  if (n === 5) updateStep5();
  if (n === 6) updateStep6();
  if (n === 7) updateStep7();

  window.scrollTo({top: 0, behavior: 'smooth'});
}

function goSection(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('on'));
  document.getElementById('step-bar').style.display = 'none';
  document.getElementById(id === 'unsure-form' ? 'sec-unsure' : id).classList.add('on');
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// ── STEP 1 ──
function selectType(t, el) {
  S.type = t;
  document.querySelectorAll('#sec-1 .choice-card').forEach(c => c.classList.remove('sel'));
  (el || event.target).classList.add('sel');

  if (t === 'unsure') { goSection('unsure-form'); return; }
  goStep(2);
}

// ── STEP 2 ──
function updateStep2() {
  hide('decor-collections'); hide('traverse-systems'); hide('basic-options'); hide('unsure-options');
  document.getElementById('architrac-model-picker').style.display = 'none';

  if (S.type === 'static') {
    show('decor-collections');
    document.getElementById('sec2-title').textContent = 'Choose a Collection';
    document.getElementById('sec2-sub').textContent = 'All three decorative collections work as stationary poles. Rings slide on manually.';
  } else if (S.type === 'traverse') {
    show('traverse-systems');
    document.getElementById('sec2-title').textContent = 'Decorative or Functional Traverse?';
    document.getElementById('sec2-sub').textContent = 'Estate™ rods show visible finials; Architrac® tracks are fully concealed behind drapery.';
  } else if (S.type === 'basic') {
    show('basic-options');
    document.getElementById('sec2-title').textContent = 'Basic Hardware Type';
    document.getElementById('sec2-sub').textContent = 'White finish only. Great for budget-conscious projects.';
  }
}

function selectCollection(c, el) {
  S.collection = c;
  document.querySelectorAll('.coll-card').forEach(el => el.classList.remove('sel'));
  (el || event.target).classList.add('sel');

  // For traverse type, collection implies Estate system
  if (S.type === 'traverse' && c !== 'arch') {
    S.traverseSystem = 'estate';
  }
  goStep(3);
}

function selectTraverseSystem(sys, el) {
  S.traverseSystem = sys;
  document.querySelectorAll('#traverse-systems .choice-card').forEach(c => c.classList.remove('sel'));
  (el || event.target).classList.add('sel');

  if (sys === 'architrac') {
    S.collection = 'arch';
    // Show model picker — don't jump to step 3 yet
    hide('decor-collections');
    document.getElementById('architrac-model-picker').style.display = 'block';
    document.getElementById('sec2-title').textContent = 'Choose Architrac® Model';
    document.getElementById('sec2-sub').textContent = 'Select the track model that best fits your project requirements.';
  } else {
    // Show collection choices for Estate
    hide('traverse-systems');
    show('decor-collections');
    document.getElementById('sec2-title').textContent = 'Estate™ Collection';
    document.getElementById('sec2-sub').textContent = 'All three collections offer Estate™ traverse rods — choose your preferred finish family.';
  }
}

function selectArchitracModel(m, el) {
  S.architracModel = m;
  document.querySelectorAll('#architrac-model-picker .choice-card').forEach(c => c.classList.remove('sel'));
  (el || event.target).classList.add('sel');
  goStep(3);
}

function selectBasic(sub, el) {
  S.basicSubtype = sub;
  S.collection = 'basic-' + sub;
  document.querySelectorAll('#basic-options .choice-card').forEach(c => c.classList.remove('sel'));
  (el || event.target).classList.add('sel');
  goStep(3);
}

// ── STEP 3 ──
function updateStep3() {
  hide('finish-dm'); hide('finish-wt'); hide('finish-wi'); hide('finish-arch'); hide('finish-basic');
  clearFinishSel();

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
  (el || event.target).closest('.finish-grid, #finish-arch, #finish-basic')
    ?.querySelectorAll('.finish-card').forEach(c => c.classList.remove('sel'));
  (el || event.target).classList.add('sel');
}

function clearFinishSel() {
  document.querySelectorAll('.finish-card').forEach(c => c.classList.remove('sel'));
  document.querySelectorAll('#finish-arch .opt-pill, #finish-basic .opt-pill').forEach(p => p.classList.remove('sel'));
}

// ── STEP 4 ──
function updateStep4() {
  // Hide all finial panels
  ['finials-dm-1','finials-dm-138','finials-dm-2','finials-wi-1','finials-wi-138','finials-wt-138','finials-wt-2','finials-arch','finials-basic'].forEach(hide);

  document.getElementById('sec4-title').textContent = 'Choose a Finial';
  document.getElementById('sec4-sub').textContent = 'Select the finial style for the ends of your pole or rod.';

  if (S.collection === 'dm') {
    // Show based on pole diameter selected (we'll show all 1⅜" by default since most common)
    show('finials-dm-138');
    if (S.poleDia === '1"') { hide('finials-dm-138'); show('finials-dm-1'); }
    else if (S.poleDia === '2"') { hide('finials-dm-138'); show('finials-dm-2'); }
  } else if (S.collection === 'wt') {
    if (S.poleDia === '2"') show('finials-wt-2');
    else show('finials-wt-138');
  } else if (S.collection === 'wi') {
    show('finials-wi-138');
    if (S.poleDia === '1"') { hide('finials-wi-138'); show('finials-wi-1'); }
  } else if (S.collection === 'arch') {
    show('finials-arch');
    document.getElementById('sec4-title').textContent = 'Track Finish — No Finials';
    document.getElementById('sec4-sub').textContent = 'Architrac® 94001 is a concealed track with no visible finials.';
  } else {
    show('finials-basic');
    document.getElementById('sec4-title').textContent = 'No Finials on Basic Hardware';
  }
}

function selectFinial(f, el) {
  S.finial = f;
  document.querySelectorAll('.finial-card').forEach(c => c.classList.remove('sel'));
  (el || event.target).classList.add('sel');
}

// ── STEP 5 ──
function updateStep5() {
  hide('sz-pole-diameter'); hide('sz-stationary'); hide('sz-traverse'); hide('sz-basic');
  hide('sz-superfine-opts'); hide('sz-lockseam-opts'); hide('sz-tension-opts'); hide('sz-pole-style');
  document.getElementById('mount-recessed').style.display = S.collection === 'arch' ? '' : 'none';

  if (S.type === 'static') {
    show('sz-pole-diameter');
    show('sz-stationary');
    if (S.collection === 'wt') show('sz-pole-style');

    // Fill diameter options
    const opts = document.getElementById('pole-dia-opts');
    let diameters = [];
    if (S.collection === 'dm') diameters = S.type === 'static' ? ['1"','1⅜"'] : ['1"','1⅜"','2"']; // 2" is Estate traverse only — no 2" stationary DM pole exists
    else if (S.collection === 'wt') diameters = ['1⅜"','2"'];
    else if (S.collection === 'wi') diameters = S.type === 'static' ? ['1"','1⅜"'] : ['1⅜"']; // WI Estate traverse: 1⅜" ONLY
    opts.innerHTML = diameters.map(d =>
      `<div class="opt-pill" onclick="selectPoleDia('${d}', this)">${d}</div>`
    ).join('');

    // Pole length info
    const info = document.getElementById('pole-length-info');
    if (S.collection === 'dm') {
      info.innerHTML = S.poleDia === '1"'
        ? '<strong>Designer Metals™ 1" poles:</strong> Fixed lengths only — 4\'(48"), 6\'(72"), 8\'(96"). No telescoping for 1". Splice with #1042812 for runs over 8\'.'
        : '<strong>Designer Metals™ 1⅜" poles:</strong> Fixed 4\'/6\'/8\' or Telescoping 36"–66", 66"–120", 120"–180". All 8 finishes. Splice with #73304061 for runs over 15\'.' ;
      if (S.poleDia) updateDMSubSections(S.poleDia);
    }
    else if (S.collection === 'wt') info.innerHTML = '<strong>Wood Trends™ poles:</strong> Fixed 4\', 6\', 8\', 12\' — Smooth or Fluted. Can be spliced for longer runs with Pole Connector #5610E061 — <strong>always support every splice with a bracket.</strong> To cut: wrap with painter\'s tape, cut with fine-tooth saw, drill new finial pilot hole. <strong>1⅜" broken-pack pricing/piece:</strong> 4\'=$25.80 · 6\'=$38.61 · 8\'=$49.56 · 12\'=$77.32 (6 pieces/box). <strong>2" broken-pack pricing/piece:</strong> 4\'=$58.52 · 6\'=$85.20 · 8\'=$112.97 · 12\'=$172.41 (2 pieces/box).';
    else if (S.collection === 'wi') info.innerHTML = '<strong>Wrought Iron poles:</strong> Fixed 6\' or 8\'. Can be spliced and spliced with internal rod splice for longer runs.';
    else info.innerHTML = '';

  } else if (S.type === 'traverse' || (S.type === 'static' && S.traverseSystem === 'estate')) {
    show('sz-traverse');
    const info = document.getElementById('traverse-limits-info');
    if (S.traverseSystem === 'estate' || S.collection !== 'arch') {
      const estPrice = S.collection === 'wt' ? ' AMP™ motorization available — pricing confirmed at quote.' : '';
      info.innerHTML = '<strong>Estate™ Traverse Rod:</strong> Min 18" · Max 192" (16ft) · Max 64 lbs / 4 lbs per ft. Tracks over 8ft: splice + keystone included. AMP™ available (max 16ft motorized, cannot curve when motorized). Pleated or Ripplefold™ headers.' + estPrice + (S.collection === 'wt' ? ' <strong>Note:</strong> Unfinished finish not available on Estate™ Traverse Rods.' : '');
      // Show DM Estate dia picker
      const dmED = document.getElementById('dm-estate-dia');
      if (dmED) dmED.style.display = S.collection === 'dm' ? '' : 'none';
    } else {
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
    }
  } else if (S.type === 'basic') {
    show('sz-basic');
    if (S.basicSubtype === 'superfine') show('sz-superfine-opts');
    else if (S.basicSubtype === 'lockseam') show('sz-lockseam-opts');
    else if (S.basicSubtype === 'tension') show('sz-tension-opts');
  }
}

function selectPoleDia(d, el) {
  S.poleDia = d;
  ['finials-dm-1','finials-dm-138','finials-dm-2','finials-wi-1','finials-wi-138','finials-wt-138','finials-wt-2'].forEach(hide);
  if (S.collection === 'dm') {
    if (d === '1"') show('finials-dm-1');
    else if (d === '2"') show('finials-dm-2');
    else show('finials-dm-138');
    // K-Rail note only for 1⅜"
    const kr = document.getElementById('dm-krail-note');
    if (kr) kr.style.display = d === '1⅜"' ? '' : 'none';
  } else if (S.collection === 'wi') {
    if (d === '1"') show('finials-wi-1');
    else show('finials-wi-138');
  } else if (S.collection === 'wt') {
    if (d === '2"') show('finials-wt-2');
    else show('finials-wt-138');
  }
  // Show DM stationary sub-sections when DM static pole
  if (S.collection === 'dm' && S.type === 'static') updateDMSubSections(d);
}

function selectDraw(d) { S.draw = d; }
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
}
function selectFullness(f) { S.fullness = f; }
function selectMount(m) { S.mount = m; }
function selectBasicOp(o) { S.basicOp = o; }
function selectLockseam(w) { S.lockseamWidth = w; }

// ── STEP 6 ──
function updateStep6() {
  // AMP only available on Estate traverse or Architrac 94001
  const isEstate = S.traverseSystem === 'estate';
  const isArch94001 = S.collection === 'arch' && S.architracModel === '94001';
  const ampEligible = isEstate || isArch94001;
  if (ampEligible) {
    show('amp-eligible');
    hide('amp-not-eligible');
    // Bend warning only for 94001 (AMP cannot be bent/curved)
    document.getElementById('amp-bend-warning').style.display = isArch94001 ? 'block' : 'none';
    // Update sub text for non-94001 Architrac that lands here (shouldn't normally)
    const sub = document.getElementById('sec6-sub');
    if (sub) sub.textContent = isArch94001
      ? 'AMP™ motorization is available on Architrac® 94001. Max 16ft motorized. Track cannot be bent or curved when motorized.'
      : 'AMP™ motorization is available on Estate™ traverse rods.';
  } else {
    hide('amp-eligible');
    show('amp-not-eligible');
    const sub = document.getElementById('sec6-sub');
    if (sub) {
      if (S.collection === 'arch') {
        sub.textContent = 'AMP™ motorization is only available on Architrac® 94001. Your selected model (' + (S.architracModel || 'N/A') + ') is manual-only.';
      } else {
        sub.textContent = 'AMP™ motorization is only available on Estate™ traverse rods and Architrac® 94001.';
      }
    }
  }
  document.getElementById('wt-accessories').style.display = S.collection === 'wt' ? 'block' : 'none';
}

const wtAccessories = [];
function toggleWTAccessory(el, key) {
  el.classList.toggle('sel');
  const idx = wtAccessories.indexOf(key);
  if (idx >= 0) wtAccessories.splice(idx, 1);
  else wtAccessories.push(key);
}

function toggleAMP(row) {
  S.motorized = !S.motorized;
  const sw = document.getElementById('amp-switch');
  sw.classList.toggle('on', S.motorized);
  row.classList.toggle('sel', S.motorized);
  document.getElementById('amp-extras').style.display = S.motorized ? 'block' : 'none';
}

function toggleAMPExtra(el, key) {
  el.classList.toggle('sel');
  const idx = S.ampExtras.indexOf(key);
  if (idx >= 0) S.ampExtras.splice(idx, 1);
  else S.ampExtras.push(key);
}

// ── STEP 7 ──
function updateStep7() {
  const sum = document.getElementById('quote-summary');
  const rows = [
    ['Rod Type', S.type === 'static' ? 'Stationary / Decorative' : S.type === 'traverse' ? 'Traverse / Traversing' : S.type === 'basic' ? 'Basic Hardware' : 'Custom Quote'],
    ['Collection', collectionLabel()],
    ['Architrac Model', S.architracModel || '—'],
    ['Finish', S.finish || '—'],
    ['Finial', S.finial || '—'],
    ['Pole Diameter', S.poleDia || S.dmEstateDia || '—'],
    ['Estate Rod Size', S.dmEstateDia ? S.dmEstateDia : null],
    ['Pole Type', S.dmPoleType ? S.dmPoleType : null],
    ['Duotone Combo', S.dmDuotoneFinish ? S.dmDuotoneFinish : ((S.finial||'').includes('Duotone') ? '⚠ Not selected — REQUIRED' : null)],
    ['Bracket Type', S.dmBracketType ? S.dmBracketType : null],
    ['Ring Type', S.dmRingType ? S.dmRingType : null],
    ['Pole Style', S.poleStyle || '—'],
    ['Track Width', (document.getElementById('trav-width') || {value:''}).value ? document.getElementById('trav-width').value + '"' : (document.getElementById('rod-width') || {value:''}).value ? document.getElementById('rod-width').value + '"' : '—'],
    ['Draw', S.draw || '—'],
    ['Header Style', S.header ? (S.header + (S.fullness ? ' ' + S.fullness : '')) : '—'],
    ['Mounting', S.mount || '—'],
    ['AMP™ Motorization', S.motorized ? 'Yes — ' + (S.ampExtras.length ? S.ampExtras.join(', ') : 'motor only') : 'No'],
  ].filter(r => r[1] && r[1] !== '—');

  sum.innerHTML = '<div class="summary-title">Your Configuration</div>' +
    rows.map(r => `<div class="summary-row"><span>${r[0]}</span><strong>${r[1]}</strong></div>`).join('');
}

function collectionLabel() {
  const map = {dm:'Designer Metals™',wt:'Wood Trends™',wi:'Wrought Iron','basic-superfine':'Superfine Pro (Basic)','basic-lockseam':'Lockseam (Basic)','basic-tension':'Tension / Sash (Basic)'};
  if (S.collection === 'arch') return 'Architrac® ' + (S.architracModel || '');
  return map[S.collection] || S.collection;
}

// ── DELIVERY ──
function selectDelivery(opt, prefix) {
  S.delivery = opt;
  prefix = prefix || '';
  ['install','ship','pickup'].forEach(o => {
    const el = document.getElementById((prefix ? prefix + '-' : '') + 'del-' + o);
    if (el) el.classList.toggle('sel', o === opt);
  });
}

// ── SUBMIT ──
function submitQuote() {
  const name = document.getElementById('q-name').value.trim();
  const contact = document.getElementById('q-contact').value.trim();
  if (!name || !contact) { alert('Please enter your name and contact information.'); return; }

  const travW = (document.getElementById('trav-width') || {value:''}).value;
  const rodW = (document.getElementById('rod-width') || {value:''}).value;
  const notes = document.getElementById('q-notes').value;
  const addr = document.getElementById('q-address').value;

  const body = [
    '=== KIRSCH ROD QUOTE REQUEST ===',
    '',
    'CONTACT',
    'Name: ' + name,
    'Phone/Email: ' + contact,
    'Location: ' + (addr || 'Not provided'),
    '',
    'CONFIGURATION',
    'Rod Type: ' + (S.type === 'static' ? 'Stationary/Decorative' : S.type === 'traverse' ? 'Traverse Rod' : 'Basic Hardware'),
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
    'Width: ' + (travW || rodW || 'See notes'),
    'Quantity: ' + (document.getElementById('rod-qty')?.value || document.getElementById('trav-qty')?.value || '1'),
    'Draw Type: ' + (S.draw || 'N/A'),
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
    'Preference: ' + (S.delivery === 'install' ? 'Professional Installation' : S.delivery === 'ship' ? 'Ship to Customer' : 'Pick Up'),
    '',
    'NOTES',
    notes || 'None',
    '',
    '--- Sent from blindznation.com/pages/kirsch-rods.html ---'
  ].join('\n');

  const subject = 'Kirsch Rod Quote — ' + collectionLabel() + ' — ' + name;
  window.location.href = 'mailto:justin@blindznation.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);

  document.querySelectorAll('.section').forEach(s => s.classList.remove('on'));
  document.getElementById('success-box').style.display = 'block';
  document.getElementById('step-bar').style.display = 'none';
  window.scrollTo({top: 0, behavior: 'smooth'});
}

function submitUnsure() {
  const name = document.getElementById('u-name').value.trim();
  const contact = document.getElementById('u-contact').value.trim();
  if (!name || !contact) { alert('Please enter your name and contact info.'); return; }

  const size = document.getElementById('u-size').value;
  const notes = document.getElementById('u-notes').value;

  const body = [
    '=== KIRSCH HARDWARE HELP REQUEST ===',
    '',
    'Name: ' + name,
    'Contact: ' + contact,
    'Window sizes: ' + (size || 'Not provided'),
    'Delivery: ' + (S.delivery || 'Not selected'),
    '',
    'PROJECT DETAILS',
    notes || 'No details provided',
    '',
    '--- Sent from blindznation.com/pages/kirsch-rods.html ---'
  ].join('\n');

  window.location.href = 'mailto:justin@blindznation.com?subject=' + encodeURIComponent('Kirsch Hardware Help — ' + name) + '&body=' + encodeURIComponent(body);
  document.querySelectorAll('.section').forEach(s => s.classList.remove('on'));
  document.getElementById('success-box').style.display = 'block';
  document.getElementById('step-bar').style.display = 'none';
  window.scrollTo({top: 0, behavior: 'smooth'});
}

// ── DM-SPECIFIC FUNCTIONS ──

function selectDMFinial(name, el) {
  S.finial = name;
  S.dmDuotoneFinish = '';
  document.querySelectorAll('.finial-card').forEach(c => c.classList.remove('sel'));
  if (el) el.classList.add('sel');
  const isDuotone = name === 'Maxwell Duotone' || name === 'Briggs Duotone';
  const picker = document.getElementById('dm-duotone-picker');
  if (picker) picker.style.display = isDuotone ? '' : 'none';
  if (isDuotone) {
    document.querySelectorAll('#grp-dm-duotone .opt-pill').forEach(p => p.classList.remove('sel'));
  }
}

function selectDuotonePair(pair, el) {
  S.dmDuotoneFinish = pair;
  document.querySelectorAll('#grp-dm-duotone .opt-pill').forEach(p => p.classList.remove('sel'));
  if (el) el.classList.add('sel');
}

function selectDMPoleType(t, el) {
  S.dmPoleType = t;
  document.querySelectorAll('#grp-dm-pole-type .opt-pill').forEach(p => p.classList.remove('sel'));
  if (el) el.classList.add('sel');
}

function selectDMBracket(b, el) {
  S.dmBracketType = b;
  // Deselect all bracket pills in both groups
  ['grp-dm-bracket-1','grp-dm-bracket-138'].forEach(g => {
    const grp = document.getElementById(g);
    if (grp) grp.querySelectorAll('.opt-pill').forEach(p => p.classList.remove('sel'));
  });
  if (el) el.classList.add('sel');
}

function selectDMRing(r, el) {
  S.dmRingType = r;
  ['grp-dm-ring-1','grp-dm-ring-138'].forEach(g => {
    const grp = document.getElementById(g);
    if (grp) grp.querySelectorAll('.opt-pill').forEach(p => p.classList.remove('sel'));
  });
  if (el) el.classList.add('sel');
}

function selectDMEstateDia(dia, el) {
  S.dmEstateDia = dia;
  S.poleDia = dia.replace(' Estate','');
  document.querySelectorAll('#grp-dm-estate-dia .opt-pill').forEach(p => p.classList.remove('sel'));
  if (el) el.classList.add('sel');
  // Update finials panel for 2" vs 1⅜"
  if (S.collection === 'dm') {
    ['finials-dm-1','finials-dm-138','finials-dm-2'].forEach(hide);
    const is2in = dia.startsWith('2"');
    if (is2in) show('finials-dm-2');
    else show('finials-dm-138');
    const warn = document.getElementById('dm-estate-2in-warn');
    if (warn) warn.style.display = is2in ? '' : 'none';
  }
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

function toggleOptPill(el, group) {
  if (group) {
    // single-select within group: deselect siblings
    const container = el.closest('.opt-row, .opt-pills-group, .section');
    if (container) {
      container.querySelectorAll('.opt-pill').forEach(p => {
        if (p.dataset.group === group || !p.dataset.group) p.classList.remove('sel');
      });
    }
    el.classList.add('sel');
  } else {
    el.classList.toggle('sel');
  }
}

// ── INIT ──
renderStepBar(1);