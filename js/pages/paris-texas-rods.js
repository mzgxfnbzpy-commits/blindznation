renderNav('Paris Texas');
renderFooter(false);

/* ─── STATE ─── */
const S = {
  type:'', finishType:'', diameter:'', finish:'', finishCode:'', finishTrackColor:'',
  finial:'', poleDia:'', width:'', qty:1,
  draw:'', header:'', fullness:'', masterCarrier:'', mount:'', fascia:'', motor:'',
  somfyMotor:'', rtecPower:'', baton:'', holdback:'', frenchReturn:'', controls:'',
  delivery:'', ptmColor:'', ptmSheen:'', ptmHighlight:'none'
};

const STEPS = 8;

/* ─── STEP BAR ─── */
function renderStepBar(cur) {
  const el = document.getElementById('step-bar');
  let h = '';
  for(let i=1;i<=STEPS;i++){
    const cl = i<cur?'done':i===cur?'active':'';
    h += `<div class="step-dot"><div class="step-circle ${cl}">${i<cur?'✓':i}</div></div>`;
    if(i<STEPS) h+=`<div class="step-line ${i<cur?'done':''}"></div>`;
  }
  el.innerHTML = h;
}

let cur = 1;

function goStep(n) {
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('on'));
  if(n==='unsure'){
    document.getElementById('sec-unsure').classList.add('on');
    document.getElementById('step-bar').style.display='none';
    window.scrollTo({top:0,behavior:'smooth'}); return;
  }
  cur=n; renderStepBar(n);
  document.getElementById('step-bar').style.display='flex';
  const sec=document.getElementById('sec-'+n);
  if(sec) sec.classList.add('on');
  if(n===2) prep2();
  if(n===3) prep3();
  if(n===4) prep4();
  if(n===5) prep5();
  if(n===6) prep6();
  if(n===7) prep7();
  if(n===8) prep8();
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ─── STEP 1 ─── */
function pick(key, val, el) {
  S[key]=val;
  const group = el.closest('.choice-grid, .section');
  if(group) group.querySelectorAll('.choice-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  if(key==='type'&&val==='unsure'){goStep('unsure');return;}
  // Auto-advance: step 1→2 (type), step 2→3 (finishType), step 3→4 (diameter)
  const next = {type:2, finishType:3, diameter:4}[key];
  if(next) setTimeout(function(){ goStep(next); }, 320);
}

/* ─── STEP 2 ─── */
function prep2() {
  // FINISH TYPE AVAILABILITY BY SYSTEM (PDF p.56 + General Info):
  // Portfolio (35): all systems ✓
  // QS Metal (6):   1⅜" R-TEC, 1⅛" Baton, 1⅜" Baton — NOT available for HD traverse or Somfy (PDF)
  // QS Wood (5):    1⅜" R-TEC, 1⅜" Baton, all HD traverse — NOT available for 1⅛" any system
  // PTH Perfect Match: all systems ✓
  const qsWood = document.getElementById('qs-wood-card');
  const qsMetal = document.getElementById('qs-metal-card');

  // HD traverse cannot use QS Metal (only Portfolio, PTH Perfect Match, QS Wood & Resin)
  if(qsMetal) qsMetal.classList.toggle('dim', S.type==='hd');

  // QS Wood not available for 1⅛" systems — can't enforce here since diameter not yet chosen.
  // QS Wood IS available for HD, R-TEC, and 1⅜" baton. Never dim it at this step.
  qsWood.classList.toggle('dim', false);

  // (QS Metal is dimmed for HD — the card description already explains "not available for Heavy Duty traverse")
}

/* ─── STEP 3 ─── */
function prep3() {
  const d118=document.getElementById('dia-118');
  const d214=document.getElementById('dia-214');

  // 1⅛" not available for HD traverse. Also not available if QS Wood & Resin selected
  // (QS Wood only comes in 1⅜" and 2¼" — PDF finish table).
  const no118 = S.type==='hd'||S.finishType==='qs-wood';
  d118.classList.toggle('dim', no118);

  // 2¼" not available for R-TEC (1⅜" metal track only) or QS Metal finishes.
  // 2¼" IS available for stationary poles, baton draw (wood poles), and HD traverse.
  const no214 = S.type==='rtec'||S.finishType==='qs-metal';
  d214.classList.toggle('dim', no214);

  // If chosen diameter is now invalid, clear it
  if(S.diameter==='1⅛'&&no118) S.diameter='';
  if(S.diameter==='2¼'&&no214) S.diameter='';

  // Update 1⅛" baton draw note: QS Wood & Resin not available (1Ⅰ" only has metal QS)
  const d118desc = d118.querySelector('.choice-desc');
  if(d118desc && S.type==='baton') {
    d118desc.textContent = 'Sleek, modern profile. Metal poles and traverse tracks. 5 finial style categories. QS Metal or Portfolio finishes (QS Wood & Resin not available in 1⅛"). Max track 20\'.';
  }
  // 2¼" baton draw: only stationary or HD — update tag
  const d214tag = d214.querySelector('.choice-tag');
  if(d214tag) {
    if(S.type==='baton') d214tag.textContent = 'Portfolio / QS Wood & Resin · wood poles only · stationary or HD only';
    else if(S.type==='hd') d214tag.textContent = 'Wood poles · HD traverse (corded, baton, R-TEC, Somfy) · Portfolio or QS Wood & Resin';
    else d214tag.textContent = 'Wood poles only · heavy duty traverse · Portfolio or Quick Ship Wood & Resin';
  }
}

/* ─── STEP 4 ─── */
function prep4() {
  // Show/hide AGL warning for traverse types
  const aglWarn = document.getElementById('agl-warn');
  if(aglWarn) aglWarn.style.display = (S.type!=='static') ? 'block' : 'none';
  // Dim AGL card for traverse
  const fcAGL = document.getElementById('fc-AGL');
  if(fcAGL) fcAGL.classList.toggle('off', S.type!=='static');

  // QS Metal short-length warning for traverse
  const qsMetalWarn = document.getElementById('qs-metal-short-warn');
  if(qsMetalWarn) qsMetalWarn.style.display = (S.finishType==='qs-metal'&&S.type!=='static') ? 'block' : 'none';

  hide('finish-portfolio'); hide('finish-qs-metal'); hide('finish-qs-wood'); hide('finish-ptm');
  if(S.finishType==='portfolio') show('finish-portfolio');
  else if(S.finishType==='qs-metal') show('finish-qs-metal');
  else if(S.finishType==='qs-wood') show('finish-qs-wood');
  else if(S.finishType==='ptm') show('finish-ptm');
  document.getElementById('sec4-title').textContent = 'Choose Your Finish';
}

function selectFinish(name, code, trackColor) {
  S.finish=name; S.finishCode=code; S.finishTrackColor=trackColor;
  document.querySelectorAll('.finish-card').forEach(c=>c.classList.remove('sel'));
  event.currentTarget.classList.add('sel');
  // Auto-advance to step 5 (finials)
  setTimeout(function(){ goStep(5); }, 320);
}

/* ─── STEP 5 — FINIALS ─── */
function prep5() {
  const c = document.getElementById('finial-content');
  const cuffNote = document.getElementById('finial-cuff-note');
  const cuff118Note = document.getElementById('finial-118-cuff-note');
  cuffNote.style.display='none'; cuff118Note.style.display='none';

  const isTraverse = S.type!=='static';
  const dia = S.diameter;

  if(S.type==='hd' && S.fascia && (S.fascia.includes('slim')||S.fascia.includes('flat')||S.fascia.includes('Mitered'))) {
    c.innerHTML = '<div class="info-banner"><strong>No finials available</strong> for slim round, flat smooth, or mitered return fascia profiles.</div>';
    return;
  }

  let html = '';
  if(dia==='1⅛') {
    if(isTraverse) { cuff118Note.style.display='block'; }
    html += finialSection('1⅛" Modern Finial Collection', [
      {n:'Cole',d:'3¼"L×1½"W · Metal',p:'$113.71 PO / $98.88 QS'},
      {n:'Ella',d:'1⅝"L×1⅝"W · Metal',p:'$100.11 PO / $86.52 QS'},
      {n:'Elm',d:'1⅛"L×2"W · Metal',p:'$100.11 PO / $86.52 QS'},
      {n:'Elm — Smoke Glass',d:'1⅛"L×2"W · Metal/Glass',p:'$113.71 PO / $98.88 QS'},
      {n:'Knox — Crystal',d:'1¼"L×2⅝"W · Crystal',p:'$177.98 PO / $154.50 QS'},
      {n:'Lex',d:'1⅞"L×2"W · Metal',p:'$100.11 PO / $86.52 QS'},
      {n:'London — Crystal',d:'1⅞"L×3"W · Metal/Crystal',p:'$206.41 PO / $179.21 QS'},
      {n:'Reese — Crystal',d:'2¾"L×2½"W · Crystal',p:'$177.98 PO / $154.50 QS'},
      {n:'Ryder — Crystal',d:'1¾"L×1¾"W · Metal/Crystal',p:'$177.98 PO / $154.50 QS'},
    ]);
    html += finialSection('1⅛" Clean Deco Collection', [
      {n:'Andes',d:'2½"L×2⅝"W · Metal',p:'$128.54 PO'},{n:'Dakota — Crystal',d:'2¾"L×2½"W',p:'$206.41 PO'},
      {n:'Deco End Cap',d:'¾"L×1⅜"W',p:'$42.02 PO'},{n:'Neve — Crystal',d:'2½"L×2"W',p:'$206.41 PO'},
      {n:'Penelope',d:'1⅛"L×2¾"W',p:'$113.71 PO'},{n:'Viktor',d:'1½"L×2¾"W · Metal/Acrylic',p:'$113.71 PO'},
      {n:'Wren',d:'2"L×1⅞"W',p:'$113.71 PO'},{n:'Wright — Crystal',d:'2½"L×2¾"W',p:'$206.41 PO'},
      {n:'Zane End Cap',d:'⅝"L×2⅜"W',p:'$56.85 PO'},
    ]);
    html += finialSection('1⅛" Bohemian Chic Collection', [
      {n:'Achilles',d:'4⅛"L · Resin',p:'$128.54 PO'},{n:'Astor',d:'1⅜"L · Resin',p:'$100.11 PO'},
      {n:'Monet',d:'2¼"L · Resin',p:'$113.71 PO'},{n:'Nerissa',d:'4½"L · Resin',p:'$128.54 PO'},
      {n:'Patience',d:'5⅛"L · Metal',p:'$128.54 PO'},{n:'Phoebe',d:'2⅛"L · Resin/Glass',p:'$177.98 PO'},
      {n:'Tybalt',d:'2"L · Resin',p:'$100.11 PO'},
    ]);
    html += finialSection('1⅛" Transitional Luxe Collection', [
      {n:'Beale End Cap',d:'½"L · Resin',p:'$49.44 PO'},{n:'Callie',d:'1½"L · Resin',p:'$128.54 PO'},
      {n:'Fairbanks',d:'3¼"L · Resin',p:'$128.54 PO'},{n:'Hudson End Cap',d:'⅞"L · Resin',p:'$56.85 PO'},
      {n:'Jules',d:'2⅞"L · Resin',p:'$128.54 PO'},{n:'Kensington — Crystal',d:'2⅝"L · Resin/Crystal',p:'$206.41 PO'},
      {n:'Nola',d:'2¾"L · Resin',p:'$128.54 PO'},{n:'Nora',d:'2⅛"L · Metal',p:'$113.71 PO'},
      {n:'Nora — Mercury Glass',d:'2⅛"L · Metal/Glass',p:'$177.98 PO'},{n:'Piper',d:'3⅛"L · Resin/Glass',p:'$177.98 PO'},
    ]);
    html += finialSection('1⅛" Rustic Retreat Collection', [
      {n:'Annabel',d:'2"L · Resin',p:'$113.71 PO'},{n:'Ash',d:'3¼"L · Resin',p:'$113.71 PO'},
      {n:'Cheyenne — Crystal',d:'2½"L · Metal/Crystal',p:'$206.41 PO'},{n:'Finley',d:'3"L · Resin',p:'$113.71 PO'},
      {n:'Kane',d:'2½"L · Resin',p:'$113.71 PO'},{n:'Lena End Cap',d:'¾"L · Resin',p:'$56.85 PO'},
      {n:'Rhea',d:'2"L · Resin',p:'$113.71 PO'},{n:'Stowe',d:'2¼"L · Resin',p:'$113.71 PO'},
    ]);
  } else if(dia==='1⅜') {
    // Today's Traditional + Heritage Classics need cuff for traverse
    if(isTraverse) { cuffNote.style.display='none'; } // shown per finial style
    html += finialSection('1⅜" Modern Collection — no cuff needed for traverse', [
      {n:'Adair',d:'3⅜"L×3"W · Metal',p:'$113.71 PO'},{n:'Ainsley End Cap',d:'¾"L×1½"W',p:'$49.44 PO'},
      {n:'Asher End Cap',d:'1"L×2¼"W',p:'$49.44 PO'},{n:'Cohen',d:'1⅞"L×3⅜"W · Metal/Acrylic',p:'$234.83 PO'},
      {n:'Exton',d:'2¾"L×2¼"W',p:'$113.71 PO'},{n:'London — Crystal',d:'2⅝"L×3⅜"W',p:'$247.19 PO'},
      {n:'Quinn',d:'1¾"L×2¼"W',p:'$113.71 PO'},{n:'Remi — Crystal',d:'3¼"L×3"W',p:'$222.47 PO'},
      {n:'Sterling — Crystal',d:'2¼"L×3"W',p:'$222.47 PO'},{n:'Zara',d:'2½"L×3½"W · Metal/Acrylic',p:'$247.19 PO'},
    ], 'modern-138');
    if(isTraverse) {
      html += '<div class="warn-banner" style="margin-top:4px"><strong>Today\'s Traditional &amp; Heritage Classics finials require a Transitional Cuff (PO138CUFF, $48.20/pair) to attach to metal traverse.</strong></div>';
    }
    html += finialSection("1⅜\" Today's Traditional — cuff required for traverse", [
      {n:'Aubrie End Cap',d:'¾"L×2¼"W · Resin',p:'$56.85 PO'},{n:'Bradford',d:'3¼"L×2¼"W · Resin',p:'$116.18 PO'},
      {n:'Essex End Cap',d:'¾"L×2"W · Resin',p:'$56.85 PO'},{n:'Everette',d:'2⅞"L×3¼"W · Resin',p:'$116.18 PO'},
      {n:'June',d:'2¾"L×2⅝"W · Resin',p:'$116.18 PO'},{n:'Leo',d:'3½"L×2¾"W · Resin',p:'$116.18 PO'},
      {n:'Lillian',d:'4"L×3⅜"W · Resin',p:'$116.18 PO'},{n:'Lillian — Mercury Glass',d:'4"L×3⅜"W',p:'$189.10 PO'},
      {n:'Lyla',d:'2⅝"L×2¾"W · Resin',p:'$116.18 PO'},{n:'Rose — Crystal',d:'2½"L×2¾"W · Resin/Crystal',p:'$259.55 PO'},
    ]);
    html += finialSection('1⅜" Heritage Classics — cuff required for traverse', [
      {n:'Adele',d:'3⅝"L · Metal/Glass',p:'$259.55 PO'},{n:'Amboise',d:'5¼"L · Resin',p:'$116.18 PO'},
      {n:'Avon',d:'3⅝"L · Resin',p:'$116.18 PO'},{n:'Blythe',d:'3⅝"L · Metal/Glass',p:'$259.55 PO'},
      {n:'Brielle',d:'4"L · Resin',p:'$116.18 PO'},{n:'Gaston',d:'3⅝"L · Resin',p:'$116.18 PO'},
      {n:'Harper',d:'3"L · Resin',p:'$116.18 PO'},{n:'Lane',d:'3⅝"L · Resin',p:'$116.18 PO'},
      {n:'Lowell End Cap',d:'1"L×2"W · Resin',p:'$56.85 PO'},{n:'Severn',d:'3¾"L · Resin',p:'$116.18 PO'},
    ]);
  } else if(dia==='2¼') {
    html += finialSection("2¼\" Today's Traditional", [
      {n:'Amelie',d:'2"L×3¼"W · Resin',p:'$128.54 PO'},{n:'Amelie — Glass',d:'2"L×3¼"W',p:'$222.47 PO'},
      {n:'Aspen',d:'4½"L×4½"W · Resin',p:'$143.37 PO'},{n:'Aspen — Glass',d:'4½"L×4½"W',p:'$222.47 PO'},
      {n:'Edward',d:'4¼"L×3¼"W · Resin',p:'$143.37 PO'},{n:'Hazel — Crystal',d:'2⅝"L×3⅜"W',p:'$278.09 PO'},
      {n:'Landon',d:'5½"L×4"W · Resin',p:'$143.37 PO'},{n:'Leighton',d:'3"L×4⅛"W · Resin',p:'$143.37 PO'},
      {n:'Leighton — Glass',d:'3"L×4⅛"W',p:'$222.47 PO'},{n:'Nolan',d:'4⅝"L×3½"W · Metal/Glass',p:'$278.09 PO'},
      {n:'Opal',d:'3⅛"L×3¾"W · Resin',p:'$143.37 PO'},{n:'Sidney',d:'3⅛"L×4⅛"W · Resin',p:'$128.54 PO'},
      {n:'Stella',d:'2½"L×3¼"W · Resin',p:'$128.54 PO'},
    ]);
    html += finialSection('2¼" Heritage Classics', [
      {n:'Adelaide',d:'5"L×3½"W · Resin',p:'$143.37 PO'},{n:'Adelaide — Mercury Glass',d:'5"L×3½"W',p:'$222.47 PO'},
      {n:'Bordeaux',d:'4⅝"L×4"W · Resin',p:'$170.56 PO'},{n:'Durham End Cap',d:'1"L×3"W',p:'$71.69 PO'},
      {n:'Farrin — Mercury Glass',d:'4½"L×4⅞"W',p:'$222.47 PO'},{n:'Fiona',d:'4"L×5"W · Resin',p:'$170.56 PO'},
      {n:'Greek',d:'5"L×4¼"W · Resin',p:'$143.37 PO'},{n:'Large Carved End Cap',d:'1⅛"L×2¾"W',p:'$71.69 PO'},
      {n:'Lyon',d:'4½"L×4⅝"W · Resin',p:'$170.56 PO'},{n:'Margot End Cap',d:'¾"L×3"W',p:'$71.69 PO'},
      {n:'Michael',d:'6½"L×4"W · Resin',p:'$170.56 PO'},{n:'Oliver',d:'3⅝"L×3⅞"W · Resin',p:'$143.37 PO'},
      {n:'Quentin',d:'5"L×3½"W · Metal/Glass',p:'$278.09 PO'},{n:'Rydal',d:'5¾"L×4¼"W · Resin',p:'$170.56 PO'},
      {n:'Vivian',d:'5¼"L×4"W · Metal/Glass',p:'$278.09 PO'},
    ]);
  } else {
    html = '<div class="info-banner">Please go back and select a pole diameter first.</div>';
  }
  c.innerHTML = html;
  document.getElementById('sec5-title').textContent = dia==='1⅛' ? '1⅛" Finial Collections' : dia==='1⅜' ? '1⅜" Finial Collections' : '2¼" Finial Collections';
}

function finialSection(title, items, id) {
  let h = `<div class="sub-section">${title}</div><div class="finial-grid">`;
  for(const it of items) {
    h += `<div class="finial-card" onclick="pickFinial('${it.n.replace(/'/g,"\\'")}',this)"><div class="finial-name">${it.n}</div><div class="finial-meta">${it.d}</div><div class="finial-price">${it.p}</div></div>`;
  }
  h += '</div>';
  return h;
}

function pickFinial(name, el) {
  S.finial=name;
  document.querySelectorAll('.finial-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  // Show cuff note if applicable
  const cuffNote = document.getElementById('finial-cuff-note');
  if(cuffNote && S.type!=='static' && S.diameter==='1⅜') {
    const needsCuff = !['Adair','Ainsley End Cap','Asher End Cap','Cohen','Exton','London — Crystal','Quinn','Remi — Crystal','Sterling — Crystal','Zara'].includes(name);
    cuffNote.style.display = needsCuff ? 'block' : 'none';
  }
  // Auto-advance to step 6 (size & configuration)
  setTimeout(function(){ goStep(6); }, 320);
}

/* ─── STEP 6 ─── */
function prep6() {
  const isTraverse = S.type!=='static';
  const isHD = S.type==='hd';
  const isRTEC = S.type==='rtec';

  show('length-info');
  const li = document.getElementById('length-info');
  const wh = document.getElementById('width-hint');

  if(S.type==='static') {
    li.innerHTML = buildLengthInfo();
    wh.textContent = 'Measure the finished pole length you need. Poles are cut to specified length; fall-off will not be saved.';
  } else if(isRTEC) {
    li.innerHTML = '<strong>R-TEC Motorized 1⅜" Metal Traverse:</strong> Track sold in 1ft increments, 4ft minimum. Max continuous: 12ft (8ft for Brushed Bronze and Rose Gold). Spliced lengths up to 24ft maximum (2 splices). Maximum drapery weight: 77 lbs.';
    wh.textContent = 'Enter the finished track length in inches. System length includes pulleys; Ainsley end caps add ½" each end (1" total).';
  } else if(isHD) {
    li.innerHTML = '<strong>Heavy Duty Traverse:</strong> Sold in 2ft increments, 4ft minimum. Max continuous: 20ft (240"). Spliced up to 40ft center draw only. Max R-TEC motorized: 36ft. Max Somfy 60e: 36ft. Standard cord drop: 120".';
    wh.textContent = 'Enter the finished track length in inches. For mitered returns, add depth per side (1⅜" fascia: +2", 2¼" fascia: +3", flat: +1¾", slim: +1½").';
  } else { // baton
    li.innerHTML = '<strong>Baton Draw Metal Traverse:</strong> Track sold in 1ft increments, 4ft minimum. Max continuous: 12ft (most finishes), 8ft for Brushed Bronze, Rose Gold (QS). Batons are sold separately and must be added in Step 7.';
    wh.textContent = 'Enter the finished track length in inches. System includes track, glides, master carriers, and end caps. Ainsley end caps add ½" each end.';
  }

  // Show/hide traverse-specific options
  document.getElementById('traverse-opts').style.display = (isTraverse&&!isHD) ? 'block' : 'none';
  document.getElementById('hd-fascia-opts').style.display = isHD ? 'block' : 'none';
  document.getElementById('hd-motorize-opts').style.display = isHD ? 'block' : 'none';
  document.getElementById('rtec-power-opts').style.display = isRTEC ? 'block' : 'none';

  // Show Somfy pill only if 2¼" diameter
  document.getElementById('somfy-opt').style.display = S.diameter==='2¼' ? '' : 'none';
  // Baton draw includes low-profile option
  document.getElementById('low-profile-opt').style.display = 'none'; // only show if selected

  // Show/hide 1⅜" fascia options on HD
  const fas138 = ['fas-138','fas-138r','fas-138g'];
  fas138.forEach(id=>{const el=document.getElementById(id);if(el)el.style.display=(S.diameter!=='1⅛')?'':'none';});
}

function buildLengthInfo() {
  const d = S.diameter, ft = S.finishType;
  if(d==='1⅛') {
    if(ft==='qs-metal') return '<strong>1⅛" QS Metal Pole:</strong> Max 12ft (BN/MK) or 8ft (BZ/CZ/RGD/SG). Sold in 2ft increments, 2ft minimum.';
    return '<strong>1⅛" Portfolio Metal Pole:</strong> Max 12ft continuous. Sold in 2ft increments, 2ft minimum.';
  } else if(d==='1⅜') {
    if(ft==='portfolio') return '<strong>1⅜" Portfolio Pole:</strong> Metal max 12ft; Wood max 16ft. Sold in 2ft increments.';
    if(ft==='qs-metal') return '<strong>1⅜" QS Metal Pole:</strong> Max 12ft (BN/MK) or 8ft (BZ/CZ/RGD/SG). Sold in 2ft increments.';
    if(ft==='qs-wood') return '<strong>1⅜" QS Wood &amp; Resin Pole:</strong> Max 12ft. Sold in 2ft increments.';
    return '<strong>1⅜" PTH Perfect Match Pole:</strong> Metal max 12ft; Wood max 16ft.';
  } else {
    if(ft==='qs-wood') return '<strong>2¼" QS Wood &amp; Resin Pole:</strong> Max 12ft. Sold in 2ft increments.';
    return '<strong>2¼" Portfolio Wood Pole:</strong> Max 16ft continuous. Sold in 2ft increments, 2ft minimum.';
  }
}

function pick1(key, val, el) {
  S[key]=val;
  const group = el.closest('.opt-row');
  if(group) group.querySelectorAll('.opt-pill').forEach(p=>p.classList.remove('sel'));
  el.classList.add('sel');
  if(key==='header') document.getElementById('rf-opts').style.display = val==='Ripplefold'?'block':'none';
  if(key==='fascia') {
    const noFin = val.includes('slim')||val.includes('flat')||val.includes('Mitered');
    document.getElementById('fascia-finial-warn').style.display = noFin?'block':'none';
    document.getElementById('somfy-motor-opts').style.display='none';
  }
  if(key==='motor') {
    document.getElementById('somfy-motor-opts').style.display = val.includes('Somfy')?'block':'none';
  }
  if(key==='mount') {
    document.getElementById('low-profile-opt').style.display = 'block';
  }
  updatePriceEstimate();
}

function toggle1(key, val, el) {
  S[key]=val;
  const group=el.closest('.opt-row');
  if(group) group.querySelectorAll('.opt-pill').forEach(p=>p.classList.remove('sel'));
  el.classList.add('sel');
}

function updatePriceEstimate() {
  const w = parseInt(document.getElementById('width-in')?.value||'0');
  const qty = parseInt(document.getElementById('qty-in')?.value||'1');
  if(!w||w<1) {document.getElementById('price-est').style.display='none';return;}
  const ft = Math.ceil(w/12);
  let base=0, label='';
  const isDouble = S.mount&&S.mount.includes('Double');
  const wall6 = S.mount&&S.mount.includes('6');

  if(S.type==='baton') {
    if(S.diameter==='1⅛') {
      base = isDouble ? 593.26+148.32*(ft-4) : wall6 ? 336.18+84.05*(ft-4) : 296.63+74.16*(ft-4);
      label = `~$${(base*qty).toLocaleString(undefined,{maximumFractionDigits:0})} MSRP`;
    } else {
      base = isDouble ? 781.13+195.28*(ft-4) : wall6 ? 435.06+108.76*(ft-4) : 390.56+97.64*(ft-4);
      label = `~$${(base*qty).toLocaleString(undefined,{maximumFractionDigits:0})} MSRP`;
    }
  } else if(S.type==='rtec') {
    base = isDouble ? 3752.37+195.28*(Math.min(ft,12)-4) : wall6 ? 1970.12+108.76*(Math.min(ft,12)-4) : 1876.19+97.64*(Math.min(ft,12)-4);
    if(ft>12) base += 82.81*(ft-12);
    label = `~$${(base*qty).toLocaleString(undefined,{maximumFractionDigits:0})} MSRP (base system)`;
  }
  if(base>0) {
    document.getElementById('price-est').style.display='block';
    document.getElementById('price-est-range').textContent=label;
    document.getElementById('price-est-note').textContent='Estimated MSRP — final price confirmed at quote with current tariff surcharge and freight. Includes track and standard components. Excludes finials, batons, cuffs, packaging, and delivery.';
  } else {
    document.getElementById('price-est').style.display='none';
  }
}

document.addEventListener('input', e => {
  if(e.target.id==='width-in'||e.target.id==='qty-in') updatePriceEstimate();
});

/* ─── STEP 7 ─── */
function prep7() {
  const isTrav = S.type!=='static';
  document.getElementById('fr-opts-section').style.display = isTrav?'block':'none';
  document.getElementById('rtec-controls-section').style.display = (S.type==='rtec'||(S.type==='hd'&&S.motor&&S.motor.includes('R-TEC')))?'block':'none';
}

/* ─── STEP 8 ─── */
function prep8() {
  const rows = [
    ['Rod Type', typeLabel()],
    ['Finish Collection', S.finishType==='portfolio'?'Portfolio (35 hand-painted)':S.finishType==='qs-metal'?'Quick Ship Metal':S.finishType==='qs-wood'?'Quick Ship Wood & Resin':S.finishType==='ptm'?'PTH Perfect Match':'—'],
    ['Diameter', S.diameter||'—'],
    ['Finish', S.finish||(S.finishType==='ptm'?`${S.ptmColor||'TBD'} / ${S.ptmSheen||'TBD'}${S.ptmHighlight!=='none'?' / '+S.ptmHighlight+' highlight':''}` : '—')],
    ['Finial', S.finial||'Not selected'],
    ['Width / Track Length', document.getElementById('width-in')?.value ? document.getElementById('width-in').value + '"' : '—'],
    ['Quantity', document.getElementById('qty-in')?.value||'1'],
    ['Draw', S.draw||'—'],
    ['Header', S.header+(S.fullness?' '+S.fullness:'')||'—'],
    ['Master Carrier', S.masterCarrier||'—'],
    ['Mounting', S.mount||'—'],
    ['Fascia (HD)', S.fascia||'—'],
    ['Motor / Operation', S.motor||(S.type==='rtec'?'R-TEC Motorized':S.type==='baton'?'Baton draw':'—')],
    ['R-TEC Power', S.rtecPower||'—'],
    ['Somfy Motor', S.somfyMotor||'—'],
    ['Baton', S.baton||'—'],
    ['Holdbacks', S.holdback||'—'],
    ['French Returns', S.frenchReturn||'—'],
    ['Smart Controls', S.controls||'—'],
  ].filter(r=>r[1]&&r[1]!=='—'&&r[1]!=='Not selected');

  const sum = document.getElementById('quote-summary');
  sum.innerHTML = '<div class="summary-title">Configuration Summary</div>' +
    rows.map(r=>`<div class="summary-row"><span>${r[0]}</span><strong>${r[1]}</strong></div>`).join('');
}

function typeLabel() {
  return {static:'Stationary Pole',baton:'Baton Draw Metal Traverse',rtec:'R-TEC Motorized Metal Traverse',hd:'Heavy Duty Traverse',unsure:'Custom Quote'}[S.type]||S.type;
}

/* ─── DELIVERY ─── */
function selectDelivery(opt, prefix) {
  S.delivery=opt;
  const pre = prefix||'';
  ['install','ship','pickup'].forEach(o=>{
    const el=document.getElementById((pre?pre+'-':'')+'del-'+o);
    if(el) el.classList.toggle('sel',o===opt);
  });
}

/* ─── SUBMIT ─── */
function submitQuote() {
  const name=document.getElementById('q-name').value.trim();
  const contact=document.getElementById('q-contact').value.trim();
  if(!name||!contact){alert('Please enter your name and contact information.');return;}

  const notes=document.getElementById('q-notes').value;
  const addr=document.getElementById('q-address').value;
  const w=document.getElementById('width-in')?.value||'';
  const qty=document.getElementById('qty-in')?.value||'1';

  // Cuff rule: 1⅜" Today's Traditional + Heritage Classics always need cuff for traverse.
  // Also: QS Wood & Resin 1⅜" traverse ALWAYS needs cuff for any finial (PDF General Info).
  const modernFinials138 = ['Adair','Ainsley End Cap','Asher End Cap','Cohen','Exton','London — Crystal','Quinn','Remi — Crystal','Sterling — Crystal','Zara'];
  const cuffNeeded = S.type!=='static' && S.diameter==='1⅜' &&
    S.finial && (S.finishType==='qs-wood' || !modernFinials138.includes(S.finial));

  const body = [
    '=== PARIS TEXAS HARDWARE QUOTE REQUEST ===',
    '',
    'CONTACT',
    'Name: '+name,'Phone/Email: '+contact,'Location: '+(addr||'Not provided'),
    '',
    'CONFIGURATION',
    'Rod Type: '+typeLabel(),
    'Finish Collection: '+(S.finishType==='ptm'?'PTH Perfect Match™':S.finishType==='portfolio'?'Portfolio (10-15 business days)':S.finishType==='qs-metal'?'Quick Ship Metal (ships 24hrs)':'Quick Ship Wood & Resin (ships 24hrs)'),
    'Diameter: '+(S.diameter||'Not specified'),
    'Finish: '+(S.finish||S.ptmColor||'Not specified'),
    ...(S.finishType==='ptm'?['PTH Sheen: '+(S.ptmSheen||'TBD'),'PTH Highlight: '+S.ptmHighlight]:[]),
    'Finial: '+(S.finial||'None/TBD'),
    ...(cuffNeeded?['NOTE: Transitional Cuff/Finial Adapter (PO138CUFF) required — add to order at $48.20/pair']:
        S.type!=='static'&&S.diameter==='1⅛'?['NOTE: Cuff/Finial Adapter (PO118CUFF or PO118DECUFF) required — add to order at $42.02/pair']:[]),
    '',
    'DIMENSIONS',
    'Width/Track Length: '+(w?w+'"':'Not specified'),
    'Quantity: '+qty,
    '',
    'TRAVERSE DETAILS',
    'Draw: '+(S.draw||'N/A'),
    'Header: '+(S.header+(S.fullness?' '+S.fullness:'')||'N/A'),
    'Master Carrier: '+(S.masterCarrier||'N/A'),
    'Mounting: '+(S.mount||'N/A'),
    'Fascia: '+(S.fascia||'N/A'),
    'Motor/Operation: '+(S.motor||(S.type==='rtec'?'R-TEC Motorized':S.type==='baton'?'Baton draw':'N/A')),
    'R-TEC Power: '+(S.rtecPower||'N/A'),
    'Somfy Motor: '+(S.somfyMotor||'N/A'),
    '',
    'ADD-ONS',
    'Baton: '+(S.baton||'None'),
    'Holdbacks: '+(S.holdback||'None'),
    'French Returns: '+(S.frenchReturn||'None'),
    'Smart Controls: '+(S.controls||'None'),
    '',
    'DELIVERY',
    'Preference: '+(S.delivery==='install'?'Professional Installation':S.delivery==='ship'?'Ship to Customer':'Pick Up'),
    '',
    'ADDITIONAL NOTES',
    notes||'None',
    '',
    '--- Sent from blindznation.com/pages/paris-texas-rods.html ---',
    '--- Pricing based on June 2, 2025 Suggested Retail Price List ---',
    '--- All prices subject to tariff surcharge (6% adjustment eff. June 2025 + existing 10% surcharge since 2019) ---',
    '--- Freight/packaging fees confirmed at quote. Li-ion battery orders: +$25 shipping surcharge. FOB Dallas TX. ---'
  ].join('\n');

  const subject='Paris Texas Hardware Quote — '+typeLabel()+' — '+name;
  window.location.href='mailto:justin@blindznation.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(body);
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('on'));
  document.getElementById('success-box').style.display='block';
  document.getElementById('step-bar').style.display='none';
  window.scrollTo({top:0,behavior:'smooth'});
}

function submitUnsure() {
  const name=document.getElementById('u-name').value.trim();
  const contact=document.getElementById('u-contact').value.trim();
  if(!name||!contact){alert('Please enter your name and contact info.');return;}
  const size=document.getElementById('u-size').value;
  const notes=document.getElementById('u-notes').value;
  const body=[
    '=== PARIS TEXAS HARDWARE HELP REQUEST ===','',
    'Name: '+name,'Contact: '+contact,'Window sizes: '+(size||'Not provided'),
    'Delivery: '+(S.delivery||'Not selected'),'','PROJECT DETAILS',notes||'No details provided',
    '','--- Sent from blindznation.com/pages/paris-texas-rods.html ---'
  ].join('\n');
  window.location.href='mailto:justin@blindznation.com?subject='+encodeURIComponent('Paris Texas Help — '+name)+'&body='+encodeURIComponent(body);
  document.querySelectorAll('.section').forEach(s=>s.classList.remove('on'));
  document.getElementById('success-box').style.display='block';
  document.getElementById('step-bar').style.display='none';
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ─── HELPERS ─── */
function show(id){const el=document.getElementById(id);if(el)el.style.display='';}
function hide(id){const el=document.getElementById(id);if(el)el.style.display='none';}

renderStepBar(1);