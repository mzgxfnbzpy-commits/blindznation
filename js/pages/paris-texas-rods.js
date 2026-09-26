/* ─── STATE ─── */
const S = {
  type:'', finishType:'', diameter:'', finish:'', finishCode:'', finishTrackColor:'',
  finial:'', poleDia:'', width:'', qty:1,
  draw:'', header:'', fullness:'', masterCarrier:'', mount:'', fascia:'', motor:'',
  somfyMotor:'', rtecPower:'', baton:'', holdback:'', frenchReturn:'', controls:'',
  delivery:'', ptmColor:'', ptmSheen:'', ptmHighlight:'none'
};

/* ─── DESCRIPTIONS (shown in the step-note under each pill row) ─── */
const TYPE_DESC = {
  static:'<strong>Stationary / decorative pole</strong> — drapery hangs from rings and slides manually. Rod stays fixed. Best for panels that rarely open and close. 1⅛" · 1⅜" · 2¼" poles · all finishes.',
  baton:'<strong>Baton draw metal traverse</strong> — panel glides on a concealed metal track, operated by baton (wand). Modern, clean look. 1⅛" and 1⅜" diameters; 1⅜" also in QS Wood &amp; Resin finishes. 4\' min · up to 20\' track.',
  rtec:'<strong>R-TEC motorized metal traverse</strong> — Paris Texas\' proprietary R-TEC Automation® slim drapery motor. Rechargeable Li-ion or 110v AC. 77 lbs max. 5-year warranty. RF remote + app + voice control. 1⅜" metal track only, up to 24\'. All finishes except Antique Gold Leaf.',
  hd:'<strong>Heavy duty traverse</strong> — for longer widths, heavier fabrics, or decorative wood fascia. 1⅜" or 2¼" smooth/reeded/fluted fascia, 1⅞" slim round, or 2¼" flat smooth. Corded or baton draw up to 40\', R-TEC motorized (110 lbs, 36\' max), or Somfy motorized (2¼" only). Portfolio, QS Wood &amp; Resin, or PTH Perfect Match finishes — no QS Metal.',
  unsure:'<strong>Not sure?</strong> Answer what you can below, then tell us about your space in the notes in Your details — room, style (modern/traditional), fabric weight, motorized vs manual, ceiling height. We\'ll recommend the right system, size, and finish.'
};
const FINISHTYPE_DESC = {
  'portfolio':'<strong>Portfolio</strong> — artisan hand-painted finishes on metal or wood poles. 10-15 business day lead time. Available on all pole sizes and all traverse systems.',
  'qs-metal':'<strong>Quick Ship metal</strong> — in-stock metal finishes ship within 24 hours: Brushed Bronze, Brushed Nickel, Charcoal Zinc, Matte Black, Rose Gold, Satin Gold. 1⅛" and 1⅜" systems only — not available for Heavy Duty traverse.',
  'qs-wood':'<strong>Quick Ship wood &amp; resin</strong> — in-stock wood-look finishes on 1⅜" and 2¼" poles and traverse: Antique Brass, Oil Rubbed Bronze, Platinum, Rose Gold, Walnut. For 1⅜" R-TEC, 1⅜" baton draw, and all HD traverse. Not available for 1⅛" systems.',
  'ptm':'<strong>PTH Perfect Match™</strong> — match any Benjamin Moore paint color. Eggshell or high-gloss, optional metallic highlight. +10% upcharge (no highlight) or +15% (with highlight). $100/$150 minimum. 10-15 business days.'
};
function diaDesc(d){
  if(d==='1⅛') return S.type==='baton'
    ? '<strong>1⅛"</strong> — sleek, modern profile. Metal poles and traverse tracks. 5 finial style categories. QS Metal or Portfolio finishes (QS Wood &amp; Resin not available in 1⅛"). Max track 20\'.'
    : '<strong>1⅛"</strong> — sleek, modern profile. Metal poles and traverse tracks. 5 finial style categories (Modern, Clean Deco, Bohemian Chic, Transitional Luxe, Rustic Retreat). Poles up to 12\'. Portfolio or Quick Ship Metal only.';
  if(d==='1⅜') return '<strong>1⅜"</strong> — standard decorative profile. Metal and wood poles, baton traverse, R-TEC motorized traverse, and heavy duty traverse. 3 finial style categories. Poles up to 12\' (metal) or 16\' (wood). All finish types · all traverse systems.';
  if(d==='2¼'){
    var tag = S.type==='baton' ? 'Portfolio / QS Wood &amp; Resin · wood poles only · stationary or HD only'
      : S.type==='hd' ? 'Wood poles · HD traverse (corded, baton, R-TEC, Somfy) · Portfolio or QS Wood &amp; Resin'
      : 'Wood poles only · heavy duty traverse · Portfolio or Quick Ship Wood &amp; Resin';
    return '<strong>2¼"</strong> — bold, substantial profile. Wood poles only. Finials from Today\'s Traditional and Heritage Classics collections. Heavy duty traverse (corded, baton, Somfy). Poles up to 16\'. ' + tag + '.';
  }
  return 'Larger diameters carry heavier draperies and have bolder visual impact.';
}

/* ─── STEP NUMBERING / VISIBILITY ─── */
function renumberSteps(){
  var n=0;
  document.querySelectorAll('#cfg-steps > .step-block').forEach(function(b){
    if(b.style.display==='none') return;
    n++; var s=b.querySelector('.step-num'); if(s) s.textContent=n;
  });
}
// Re-evaluate every dependent step after any answer changes (replaces the old Next/Back paging).
function refreshAll(){
  prep2(); prep3(); prep4(); prep5(); prep6(); prep7();
  updatePriceEstimate();
  renumberSteps();
}

/* ─── PILL PICKS (type / finish collection / diameter) ─── */
function pick(key, val, el) {
  S[key]=val;
  const group = el.closest('.opt-row');
  if(group) group.querySelectorAll('.opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  if(key==='type') document.getElementById('type-note').innerHTML = TYPE_DESC[val]||'';
  if(key==='finishType') document.getElementById('finishtype-note').innerHTML = FINISHTYPE_DESC[val]||'';
  refreshAll();
}

/* ─── FINISH COLLECTION availability ─── */
function prep2() {
  // FINISH TYPE AVAILABILITY BY SYSTEM (PDF p.56 + General Info):
  // Portfolio (35): all systems ✓
  // QS Metal (6):   1⅜" R-TEC, 1⅛" Baton, 1⅜" Baton — NOT available for HD traverse or Somfy (PDF)
  // QS Wood (5):    1⅜" R-TEC, 1⅜" Baton, all HD traverse — NOT available for 1⅛" any system
  // PTH Perfect Match: all systems ✓
  const qsWood = document.getElementById('qs-wood-card');
  const qsMetal = document.getElementById('qs-metal-card');
  // HD traverse cannot use QS Metal (only Portfolio, PTH Perfect Match, QS Wood & Resin)
  if(qsMetal) qsMetal.classList.toggle('disabled', S.type==='hd');
  // QS Wood IS available for HD, R-TEC, and 1⅜" baton. Never disable it here.
  if(qsWood) qsWood.classList.toggle('disabled', false);
}

/* ─── DIAMETER availability ─── */
function prep3() {
  const d118=document.getElementById('dia-118');
  const d138=document.getElementById('dia-138');
  const d214=document.getElementById('dia-214');

  // 1⅛" not available for HD traverse. Also not available if QS Wood & Resin selected
  // (QS Wood only comes in 1⅜" and 2¼" — PDF finish table).
  const no118 = S.type==='hd'||S.finishType==='qs-wood';
  d118.classList.toggle('disabled', no118);

  // 2¼" not available for R-TEC (1⅜" metal track only) or QS Metal finishes.
  // 2¼" IS available for stationary poles, baton draw (wood poles), and HD traverse.
  const no214 = S.type==='rtec'||S.finishType==='qs-metal';
  d214.classList.toggle('disabled', no214);

  // If chosen diameter is now invalid, clear it
  if(S.diameter==='1⅛'&&no118) S.diameter='';
  if(S.diameter==='2¼'&&no214) S.diameter='';
  [d118,d138,d214].forEach(b=>b.classList.toggle('sel', b.getAttribute('data-val')===S.diameter));
  document.getElementById('dia-note').innerHTML = diaDesc(S.diameter);
}

/* ─── FINISH ─── */
function prep4() {
  // Show/hide AGL warning for traverse types
  const aglWarn = document.getElementById('agl-warn');
  if(aglWarn) aglWarn.style.display = (S.type && S.type!=='static') ? 'block' : 'none';
  // Dim AGL card for traverse
  const fcAGL = document.getElementById('fc-AGL');
  if(fcAGL) fcAGL.classList.toggle('off', !!S.type && S.type!=='static');

  // QS Metal short-length warning for traverse
  const qsMetalWarn = document.getElementById('qs-metal-short-warn');
  if(qsMetalWarn) qsMetalWarn.style.display = (S.finishType==='qs-metal'&&S.type&&S.type!=='static') ? 'block' : 'none';

  hide('finish-portfolio'); hide('finish-qs-metal'); hide('finish-qs-wood'); hide('finish-ptm');
  if(S.finishType==='portfolio') show('finish-portfolio');
  else if(S.finishType==='qs-metal') show('finish-qs-metal');
  else if(S.finishType==='qs-wood') show('finish-qs-wood');
  else if(S.finishType==='ptm') show('finish-ptm');
  document.getElementById('finish-placeholder').style.display = S.finishType ? 'none' : '';
}

function selectFinish(name, code, trackColor, el) {
  S.finish=name; S.finishCode=code; S.finishTrackColor=trackColor;
  document.querySelectorAll('.finish-card').forEach(c=>c.classList.remove('sel'));
  if(el) el.classList.add('sel');
  updateSummary();
}

/* ─── FINIALS ─── */
function prep5() {
  const c = document.getElementById('finial-content');
  const cuffNote = document.getElementById('finial-cuff-note');
  const cuff118Note = document.getElementById('finial-118-cuff-note');
  cuffNote.style.display='none'; cuff118Note.style.display='none';

  const isTraverse = !!S.type && S.type!=='static' && S.type!=='unsure';
  const dia = S.diameter;

  if(S.type==='hd' && S.fascia && (S.fascia.includes('slim')||S.fascia.includes('flat')||S.fascia.includes('Mitered'))) {
    c.innerHTML = '<div class="info-banner"><strong>No finials available</strong> for slim round, flat smooth, or mitered return fascia profiles.</div>';
    S.finial='';
    document.getElementById('sec5-title').textContent='Finial style';
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
    html = '<div class="placeholder-note">Choose a pole diameter above to see its finial collections.</div>';
  }
  c.innerHTML = html;
  // Keep the customer's pick if it is still offered; otherwise clear it.
  let still = null;
  if(S.finial) c.querySelectorAll('.opt-btn').forEach(b=>{ if(!still && b.getAttribute('data-finial')===S.finial) still=b; });
  if(still) { still.classList.add('sel'); showFinialCuff(S.finial); } else S.finial='';
  document.getElementById('sec5-title').textContent = dia==='1⅛' ? '1⅛" finial collections' : dia==='1⅜' ? '1⅜" finial collections' : dia==='2¼' ? '2¼" finial collections' : 'Finial style';
}

function finialSection(title, items, id) {
  let h = `<div class="sub-label">${title}</div><div class="opt-row">`;
  for(const it of items) {
    h += `<button class="opt-btn" data-finial="${it.n.replace(/"/g,'&quot;')}" title="${(it.d+' · '+it.p).replace(/"/g,'&quot;')}" onclick="pickFinial(this.getAttribute('data-finial'),this)">${it.n} <span class="pill-hint">${it.p.split(' / ')[0]}</span></button>`;
  }
  h += '</div>';
  return h;
}

function showFinialCuff(name) {
  const cuffNote = document.getElementById('finial-cuff-note');
  if(cuffNote && S.type!=='static' && S.type!=='unsure' && S.diameter==='1⅜') {
    const needsCuff = !['Adair','Ainsley End Cap','Asher End Cap','Cohen','Exton','London — Crystal','Quinn','Remi — Crystal','Sterling — Crystal','Zara'].includes(name);
    cuffNote.style.display = needsCuff ? 'block' : 'none';
  }
}

function pickFinial(name, el) {
  S.finial=name;
  document.querySelectorAll('#finial-content .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  showFinialCuff(name);
  const t = el.getAttribute('title');
  if(t) document.getElementById('finial-note').textContent = name + ' — ' + t + '. Finials are sold in pairs; final pricing confirmed at quote with current tariff surcharge.';
  updateSummary();
}

/* ─── MEASUREMENT HINTS + TRAVERSE OPTIONS ─── */
function prep6() {
  const isTraverse = S.type==='baton'||S.type==='rtec'||S.type==='hd';
  const isHD = S.type==='hd';
  const isRTEC = S.type==='rtec';

  const li = document.getElementById('length-info');
  const wh = document.getElementById('width-hint');
  li.style.display = (S.type && S.type!=='unsure') ? '' : 'none';

  if(S.type==='static') {
    li.innerHTML = S.diameter ? buildLengthInfo() : '<strong>Stationary pole:</strong> choose a diameter to see its maximum pole length.';
    wh.textContent = 'Measure the finished pole length you need. Poles are cut to specified length; fall-off will not be saved.';
  } else if(isRTEC) {
    li.innerHTML = '<strong>R-TEC Motorized 1⅜" Metal Traverse:</strong> Track sold in 1ft increments, 4ft minimum. Max continuous: 12ft (8ft for Brushed Bronze and Rose Gold). Spliced lengths up to 24ft maximum (2 splices). Maximum drapery weight: 77 lbs.';
    wh.textContent = 'Enter the finished track length in inches. System length includes pulleys; Ainsley end caps add ½" each end (1" total).';
  } else if(isHD) {
    li.innerHTML = '<strong>Heavy Duty Traverse:</strong> Sold in 2ft increments, 4ft minimum. Max continuous: 20ft (240"). Spliced up to 40ft center draw only. Max R-TEC motorized: 36ft. Max Somfy 60e: 36ft. Standard cord drop: 120".';
    wh.textContent = 'Enter the finished track length in inches. For mitered returns, add depth per side (1⅜" fascia: +2", 2¼" fascia: +3", flat: +1¾", slim: +1½").';
  } else if(S.type==='baton') {
    li.innerHTML = '<strong>Baton Draw Metal Traverse:</strong> Track sold in 1ft increments, 4ft minimum. Max continuous: 12ft (most finishes), 8ft for Brushed Bronze, Rose Gold (QS). Batons are sold separately — add one in Add-ons.';
    wh.textContent = 'Enter the finished track length in inches. System includes track, glides, master carriers, and end caps. Ainsley end caps add ½" each end.';
  } else {
    wh.textContent = 'inches · finished rod / track length';
  }

  // Show/hide traverse-specific options
  document.getElementById('step-opts').style.display = isTraverse ? '' : 'none';
  document.getElementById('traverse-opts').style.display = (isTraverse&&!isHD) ? 'block' : 'none';
  document.getElementById('hd-fascia-opts').style.display = isHD ? 'block' : 'none';
  document.getElementById('hd-motorize-opts').style.display = isHD ? 'block' : 'none';
  document.getElementById('rtec-power-opts').style.display = isRTEC ? 'block' : 'none';

  // Show Somfy pill only if 2¼" diameter
  document.getElementById('somfy-opt').style.display = S.diameter==='2¼' ? '' : 'none';
  document.getElementById('somfy-motor-opts').style.display = (S.motor&&S.motor.includes('Somfy')) ? 'block' : 'none';
  // Low-profile ceiling option appears once a mounting choice has been made
  document.getElementById('low-profile-opt').style.display = S.mount ? '' : 'none';

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
  if(group) group.querySelectorAll('.opt-btn').forEach(p=>p.classList.remove('sel'));
  el.classList.add('sel');
  if(key==='header') document.getElementById('rf-opts').style.display = val==='Ripplefold'?'block':'none';
  if(key==='fascia') {
    const noFin = val.includes('slim')||val.includes('flat')||val.includes('Mitered');
    document.getElementById('fascia-finial-warn').style.display = noFin?'block':'none';
    prep5();
  }
  if(key==='motor') {
    document.getElementById('somfy-motor-opts').style.display = val.includes('Somfy')?'block':'none';
    prep7();
  }
  if(key==='mount') {
    document.getElementById('low-profile-opt').style.display = '';
  }
  updatePriceEstimate();
}

function toggle1(key, val, el) {
  S[key]=val;
  const group=el.closest('.opt-row');
  if(group) group.querySelectorAll('.opt-btn').forEach(p=>p.classList.remove('sel'));
  el.classList.add('sel');
  updateSummary();
}

function updatePriceEstimate() {
  const w = parseInt(document.getElementById('width-in')?.value||'0');
  const qty = parseInt(document.getElementById('qty-in')?.value||'1');
  if(!w||w<1) {document.getElementById('price-est').style.display='none';syncPriceRow();return;}
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
  syncPriceRow();
}

// Summary card: show the MSRP estimate when there is one, otherwise "Custom quote".
function syncPriceRow() {
  const est = document.getElementById('price-est');
  const hasEst = est && est.style.display !== 'none';
  const q = document.getElementById('price-quote-row');
  if(q) q.style.display = hasEst ? 'none' : '';
  if(!hasEst) {
    const n = document.getElementById('price-est-note');
    if(n) n.textContent = 'Instant MSRP estimates are shown for baton draw and R-TEC traverse systems. Everything else is custom quoted — final pricing confirmed at quote with current tariff surcharge and freight.';
  }
  updateSummary();
}

/* ─── QTY STEPPER (shared .qty-btns) ─── */
function adjQty(d){
  const q=document.getElementById('qty-in');
  if(!q) return;
  let v=(parseInt(q.value,10)||1)+d;
  if(v<1)v=1; if(v>50)v=50;
  q.value=v;
  updatePriceEstimate();
}

/* ─── ADD-ONS visibility ─── */
function prep7() {
  const isTrav = S.type==='baton'||S.type==='rtec'||S.type==='hd';
  document.getElementById('fr-opts-section').style.display = isTrav?'block':'none';
  document.getElementById('rtec-controls-section').style.display = (S.type==='rtec'||(S.type==='hd'&&S.motor&&S.motor.includes('R-TEC')))?'block':'none';
}

/* ─── SUMMARY CARD ─── */
function finishCollectionLabel() {
  return S.finishType==='portfolio'?'Portfolio (35 hand-painted)':S.finishType==='qs-metal'?'Quick Ship Metal':S.finishType==='qs-wood'?'Quick Ship Wood & Resin':S.finishType==='ptm'?'PTH Perfect Match':'—';
}
function updateSummary() {
  const sum = document.getElementById('quote-summary');
  if(!sum) return;
  const w = document.getElementById('width-in')?.value;
  const rows = [
    ['Product', 'Paris Texas Hardware'],
    ['Size', w ? w + '" wide' : '—'],
    ['Mount', S.mount || '—'],
    ['Qty', document.getElementById('qty-in')?.value||'1'],
    ['Rod type', S.type ? typeLabel() : '—'],
    ['Finish collection', finishCollectionLabel()],
    ['Diameter', S.diameter ? S.diameter+'"' : ''],
    ['Finish', S.finish||(S.finishType==='ptm'?`${S.ptmColor||'TBD'} / ${S.ptmSheen||'TBD'}${S.ptmHighlight!=='none'?' / '+S.ptmHighlight+' highlight':''}` : '')],
    ['Finial', S.finial||''],
    ['Draw', S.draw||''],
    ['Header', S.header ? S.header+(S.fullness?' '+S.fullness:'') : ''],
    ['Master carrier', S.masterCarrier||''],
    ['Fascia (HD)', S.fascia||''],
    ['Operation', S.motor||(S.type==='rtec'?'R-TEC Motorized':S.type==='baton'?'Baton draw':'')],
    ['R-TEC power', S.rtecPower||''],
    ['Somfy motor', S.somfyMotor||''],
    ['Baton', S.baton||''],
    ['Holdbacks', S.holdback||''],
    ['French returns', S.frenchReturn||''],
    ['Smart controls', S.controls||''],
  ].filter(r=>r[1]);
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
  sum.innerHTML = rows.map(r=>`<div class="summary-row"><span class="sr-key">${r[0]}</span><span class="sr-val">${esc(r[1])}</span></div>`).join('');
}
// Kept for any legacy caller.
function prep8(){ updateSummary(); }

function typeLabel() {
  return {static:'Stationary Pole',baton:'Baton Draw Metal Traverse',rtec:'R-TEC Motorized Metal Traverse',hd:'Heavy Duty Traverse',unsure:'Custom Quote'}[S.type]||S.type;
}

document.addEventListener('input', e => {
  if(e.target.id==='width-in'||e.target.id==='qty-in') updatePriceEstimate();
});

/* ─── SUBMIT ─── */
function readPTM(){
  const c=document.getElementById('ptm-color'); if(c) S.ptmColor=c.value.trim();
  const s=document.getElementById('ptm-sheen'); if(s) S.ptmSheen=s.value;
  const h=document.getElementById('ptm-highlight'); if(h) S.ptmHighlight=h.value||'none';
}

function addParisTexasToCart(){
  if(!S.type){ alert('Please select a rod type before adding to cart.'); return; }
  readPTM();

  const w=document.getElementById('width-in')?.value||'';
  const qty=document.getElementById('qty-in')?.value||'1';
  const finishLabel=S.finishType==='ptm'?'PTH Perfect Match™':S.finishType==='portfolio'?'Portfolio':S.finishType==='qs-metal'?'Quick Ship Metal':'Quick Ship Wood & Resin';

  const lines=[
    {label:'Product',value:'Paris Texas Hardware'},
    {label:'Rod Type',value:typeLabel()},
    {label:'Finish Collection',value:finishLabel},
    {label:'Diameter',value:S.diameter||'—'},
    {label:'Finish',value:S.finish||S.ptmColor||'—'},
    {label:'Finial',value:S.finial||'None/TBD'},
    {label:'Width / Track',value:w?w+'"':'—'},
    {label:'Quantity',value:String(qty)},
    {label:'Draw',value:S.draw||'N/A'},
    {label:'Motor / Operation',value:S.motor||(S.type==='rtec'?'R-TEC Motorized':S.type==='baton'?'Baton draw':'N/A')},
    {label:'Mount',value:S.mount||'—'}
  ];
  const specs=lines.map(l=>l.label+': '+l.value).join(' | ');
  pbAddToCart({product:'Paris Texas Hardware',lines:lines,specs:specs,price:null,qty:parseInt(qty)||1});
  pbOpenCart();
}

function submitQuote() {
  const name=document.getElementById('cf-name').value.trim();
  const phone=document.getElementById('cf-phone').value.trim();
  const email=document.getElementById('cf-email').value.trim();
  const errEl=document.getElementById('cf-contact-err');
  errEl.style.display='none';
  if(!name){ errEl.textContent='Please enter your name.'; errEl.style.display='block'; return; }
  if(!email){ errEl.textContent='Please enter your email address.'; errEl.style.display='block'; return; }
  const contact=[phone,email].filter(Boolean).join(' / ');
  readPTM();

  const notes=document.getElementById('cf-notes').value;
  const addr=document.getElementById('cf-address').value;
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
    'Preference: '+(window.pbDelivery==='install'?'Professional Installation':'Ship to Customer'),
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
  window.pbMailto = 'mailto:justin@blindznation.com?subject='+encodeURIComponent('Blindznation — ' + subject)+'&body='+encodeURIComponent('BLINDZNATION\n\n' + body);
  document.getElementById('config-main').style.display='none';
  document.getElementById('success-box').style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ─── HELPERS ─── */
function show(id){const el=document.getElementById(id);if(el)el.style.display='';}
function hide(id){const el=document.getElementById(id);if(el)el.style.display='none';}

/* ─── INIT (called after the shared delivery/contact steps are rendered) ─── */
function initParisTexas(){ refreshAll(); }
