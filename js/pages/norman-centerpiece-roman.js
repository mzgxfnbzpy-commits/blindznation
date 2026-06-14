renderNav('Roman Shades');
renderFooter(false);

// ── STATE ─────────────────────────────────────────────────────────────────────
var S = {
  type:'', qty:1, room:'', lift:'', headrail:'1.5',
  width:0, height:0, mount:'Inside mount', style:'',
  fabric:null, lining:'Translucent', banding:'none',
  ribbonColor:null, edgeBase:null, edgeBorder:null,
  rollerFabric:null, valance:false, sbs:false,
  holddown:false, pole:false, cordlessPole:false, shims:0,
  motor:'', power:'Rechargeable battery', delivery:'ship'
};

// ── FABRIC DATA ───────────────────────────────────────────────────────────────
// ⚠ PDF CONFIRM: verify codes, colorways, price groups against PDF pages 23-30
// Discontinued: F1052 Silver 8045, AA0901 Libeco Belgian Linen, AB0203 Old Gold,
// F0407 Oyster/Pewter, F0396 Charcoal — excluded below.
var FABRICS = [
  {g:1,coll:'Lakeside',code:'F1642',name:'Natural Gray',    w:98, seam:true, hex:'#B8B4AA'},
  {g:1,coll:'Francis', code:'F0876',name:'Pearl',           w:118,seam:true, hex:'#F0ECE0'},
  {g:1,coll:'Francis', code:'F0877',name:'Barley',          w:118,seam:true, hex:'#E8DEC0'},
  {g:1,coll:'Francis', code:'F0878',name:'Sandstone',       w:118,seam:true, hex:'#D8C8A0'},
  {g:1,coll:'Francis', code:'F0879',name:'Toast',           w:118,seam:true, hex:'#C8A870'},
  {g:1,coll:'Francis', code:'F0882',name:'Espresso',        w:118,seam:true, hex:'#3A2410'},
  {g:1,coll:'Francis', code:'F0883',name:'Brownie',         w:118,seam:true, hex:'#7A4820'},
  {g:1,coll:'Francis', code:'F0884',name:'Oatmeal',         w:118,seam:true, hex:'#E8D8B8'},
  {g:1,coll:'Francis', code:'F0885',name:'Doe',             w:118,seam:true, hex:'#C8A890'},
  {g:1,coll:'Francis', code:'F0886',name:'Shale',           w:118,seam:true, hex:'#8A8078'},
  {g:1,coll:'Francis', code:'F0888',name:'Black',           w:118,seam:true, hex:'#1C1C1C'},
  {g:1,coll:'Francis', code:'F0889',name:'Denim',           w:118,seam:true, hex:'#4A6080'},
  {g:1,coll:'Emery',   code:'F0753',name:'Creamy',          w:118,seam:true, hex:'#F5F0E4'},
  {g:1,coll:'Emery',   code:'F0754',name:'Khaki',           w:118,seam:true, hex:'#BFB08A'},
  {g:1,coll:'Emery',   code:'F1560',name:'Chiffon',         w:118,seam:true, hex:'#F0E8D8'},
  {g:1,coll:'Emery',   code:'F1561',name:'Maize',           w:118,seam:true, hex:'#E8C870'},
  {g:1,coll:'Brook',   code:'F1121',name:'Egret',           w:118,seam:true, hex:'#F0EDE6'},
  {g:1,coll:'Brook',   code:'F1122',name:'Smoke',           w:118,seam:true, hex:'#B8B0A8'},
  {g:1,coll:'Brook',   code:'F1123',name:'Beige',           w:118,seam:true, hex:'#DDD0B0'},
  {g:1,coll:'Brook',   code:'F1124',name:'Latte',           w:118,seam:true, hex:'#C0A080'},
  {g:2,coll:'Alma',    code:'F1643',name:'Ivory',           w:110,seam:true, hex:'#F5EED8'},
  {g:2,coll:'Alma',    code:'F1644',name:'Mist',            w:110,seam:true, hex:'#DDE0DC'},
  {g:2,coll:'Alma',    code:'F1645',name:'Sand',            w:110,seam:true, hex:'#D8C8A8'},
  {g:2,coll:'Alma',    code:'F1646',name:'Stone',           w:110,seam:true, hex:'#B0A898'},
  {g:2,coll:'Alma',    code:'F1647',name:'Slate',           w:110,seam:true, hex:'#808890'},
  {g:2,coll:'Valerie', code:'F0738',name:'Moonscape',       w:118,seam:true, hex:'#C0BCC0'},
  {g:2,coll:'Valerie', code:'F0739',name:'Cove',            w:118,seam:true, hex:'#6A8898'},
  {g:2,coll:'Valerie', code:'F0740',name:'Dolphin',         w:118,seam:true, hex:'#88A0B0'},
  {g:2,coll:'Valerie', code:'F0741',name:'Pomegranate',     w:118,seam:true, hex:'#A83040'},
  {g:2,coll:'Valerie', code:'F0742',name:'Sapphire',        w:118,seam:true, hex:'#284090'},
  {g:2,coll:'Valerie', code:'F0743',name:'Silhouette',      w:118,seam:true, hex:'#9090A8'},
  {g:2,coll:'Valerie', code:'F0752',name:'Daylight',        w:118,seam:true, hex:'#C8D8E0'},
  {g:2,coll:'Hayes',   code:'F0747',name:'Maple',           w:118,seam:true, hex:'#C89050'},
  {g:2,coll:'Hayes',   code:'F0748',name:'Hickory',         w:118,seam:true, hex:'#886040'},
  {g:2,coll:'Hayes',   code:'F0749',name:'Birch',           w:118,seam:true, hex:'#E8D8C0'},
  {g:2,coll:'Hayes',   code:'F0751',name:'Mahogany',        w:118,seam:true, hex:'#602818'},
  {g:3,coll:'Breeze',  code:'F0891',name:'Linen Flax',      w:108,seam:true, hex:'#D8CE9A'},
  {g:3,coll:'Breeze',  code:'F0893',name:'Linen Natural',   w:108,seam:true, hex:'#D0C098'},
  {g:3,coll:'Breeze',  code:'F0894',name:'Linen Khaki',     w:108,seam:true, hex:'#C0A880'},
  {g:3,coll:'Breeze',  code:'F0895',name:'Linen Dune',      w:108,seam:true, hex:'#C09060'},
  {g:3,coll:'Breeze',  code:'F0896',name:'Linen Graphite',  w:108,seam:true, hex:'#686868'},
  {g:3,coll:'Breeze',  code:'F0927',name:'Linen Almond Milk',w:108,seam:true,hex:'#F2E4C6'},
  {g:3,coll:'Breeze',  code:'F1778',name:'Linen Stone',     w:108,seam:true, hex:'#928070'},
  {g:3,coll:'Breeze',  code:'F1847',name:'Linen Cloud',     w:108,seam:true, hex:'#E0E0E0'},
  {g:3,coll:'Breeze',  code:'F1851',name:'Linen Warm Ivory',w:108,seam:true, hex:'#FFF2DC'},
];

// ── D&N REAR ROLLER FABRICS ───────────────────────────────────────────────────
// ⚠ PDF CONFIRM: verify against PDF pages 31-38. Excluded: appendix pp.44-45 discontinued list.
var ROLLER_FABRICS = [
  {coll:'Dazzle', code:'F1538',name:'Soft White',   maxW:98,  cat:'Sheer',          hex:'#F8F5F0'},
  {coll:'Dazzle', code:'F1539',name:'Eggshell',     maxW:98,  cat:'Sheer',          hex:'#EEE8D8'},
  {coll:'Dazzle', code:'F1540',name:'Pewter Green', maxW:98,  cat:'Sheer',          hex:'#8A9880'},
  {coll:'Dazzle', code:'F1541',name:'Charcoal',     maxW:98,  cat:'Sheer',          hex:'#484848'},
  {coll:'Dazzle', code:'F1542',name:'Ink',          maxW:98,  cat:'Sheer',          hex:'#282830'},
  {coll:'Francis',code:'F0876',name:'Pearl',         maxW:118, cat:'Light Filtering',hex:'#F0ECE0'},
  {coll:'Francis',code:'F0878',name:'Sandstone',    maxW:118, cat:'Light Filtering',hex:'#D8C8A0'},
  {coll:'Francis',code:'F0882',name:'Espresso',     maxW:118, cat:'Light Filtering',hex:'#3A2410'},
  {coll:'Francis',code:'F0886',name:'Shale',        maxW:118, cat:'Light Filtering',hex:'#8A8078'},
  {coll:'Francis',code:'F0888',name:'Black',        maxW:118, cat:'Light Filtering',hex:'#1C1C1C'},
];

// ── PRICE TABLES ─────────────────────────────────────────────────────────────
// ⚠ PDF CONFIRM: verify against Norman Centerpiece Roman PDF pages 6-7
var CP_W = [24,31,36,42,48,54,60,66,72,84,96];
var CP_H = [36,42,48,54,60,66,72,78,90,102];
var CP_PRICE = {
  1:[[148,162,176,190,204,218,232,246,274,302],[165,180,196,212,228,244,260,276,308,340],[181,198,215,232,250,268,285,302,337,371],[200,218,237,256,275,294,313,332,370,408],[218,238,259,280,301,322,342,363,405,446],[237,259,282,304,327,350,372,395,440,486],[256,280,304,329,354,378,403,427,476,526],[276,302,328,354,381,407,433,460,513,566],[295,323,351,379,408,436,464,492,549,606],[334,366,397,429,461,493,525,557,621,685],[374,409,444,479,515,550,585,621,692,763]],
  2:[[170,186,202,218,235,251,267,283,315,347],[190,207,225,244,262,281,299,317,354,391],[208,228,247,267,288,308,328,347,388,427],[230,251,273,295,316,338,360,382,426,469],[251,274,298,322,346,370,394,418,466,513],[273,298,324,350,376,403,428,454,506,559],[294,322,350,378,407,435,463,491,548,605],[317,347,377,407,438,468,498,529,590,651],[339,371,404,436,469,501,534,566,631,697],[384,421,457,493,530,567,604,641,714,788],[430,471,511,551,592,633,673,714,796,877]],
  3:[[192,211,229,247,265,283,302,320,356,393],[215,234,255,276,296,317,338,359,400,442],[235,257,280,302,325,348,371,393,438,483],[260,283,308,333,358,382,407,432,481,530],[283,309,337,365,391,418,445,472,526,579],[308,337,365,395,425,455,484,513,572,632],[333,364,395,427,460,491,524,555,619,684],[359,393,426,460,496,529,563,598,667,735],[384,420,457,493,530,567,603,640,713,787],[434,476,516,557,599,641,681,722,807,891],[486,532,577,623,670,715,761,807,900,992]]
};

var VALANCE_W   = [24,31,36,42,48,54,60,66,72,84,96,108,120,132,144];
var VALANCE_SUR = [128,133,145,155,161,178,188,204,221,255,293,326,359,387,408];

var LIFT_LIMITS = {
  'aerolite':        {minW:20,maxW:96,minH:24,maxH:96,maxSqFt:40,   label:'AeroLite™ Cordless'},
  'ccl':             {minW:12,maxW:96,minH:24,maxH:96,maxSqFt:null, label:'Continuous Cord Loop',cclSub:true},
  'smartrelease':    {minW:12,maxW:96,minH:24,maxH:96,maxSqFt:52,   label:'SmartRelease™',sr:true},
  'motor':           {minW:12,maxW:96,minH:24,maxH:96,maxSqFt:null, label:'Motorized',motor:true},
  'cordless-dn':     {minW:20,maxW:96,minH:24,maxH:96,maxSqFt:40,   label:'Cordless Day & Night',dn:true},
  'ccl-dn':          {minW:12,maxW:96,minH:24,maxH:96,maxSqFt:64,   label:'CCL Day & Night',dn:true,cclSub:true},
  'smartrelease-dn': {minW:12,maxW:96,minH:24,maxH:96,maxSqFt:52,   label:'SmartRelease™ D&N',dn:true,sr:true},
  'motor-dn':        {minW:12,maxW:96,minH:24,maxH:96,maxSqFt:null, label:'Motorized Day & Night',dn:true,motor:true}
};

var CCL_SUB = {'1.5':{maxW:50,maxSqFt:33},'2':{maxW:96,maxSqFt:64}};
var EDGE_COLLS = ['Lakeside','Alma','Francis'];
var currentCollFilter = 'all';
var rollerFilter = 'all';

// ── HELPERS ───────────────────────────────────────────────────────────────────
function selBtn(el, grpId) {
  document.getElementById(grpId).querySelectorAll('.opt-btn').forEach(function(b){b.classList.remove('sel');});
  el.classList.add('sel');
}

function toggleStep(id) {
  var el = document.getElementById(id);
  var wasActive = el.classList.contains('active');
  el.classList.toggle('open', !wasActive);
  if (!wasActive) el.classList.add('active');
}

function openNext(id) {
  var el = document.getElementById(id);
  if (el && el.style.display !== 'none') el.classList.add('active');
}

function sp(id, val) { var el=document.getElementById(id); if(el){el.textContent=val||'—';el.classList.toggle('empty',!val||val==='—');} }

// ── STEP 1 ────────────────────────────────────────────────────────────────────
function setType(type, el) {
  S.type = type;
  document.querySelectorAll('#step1 .product-card').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  document.getElementById('val1').textContent = type==='standard' ? 'Standard' : 'Day & Night';
  document.getElementById('step1').classList.add('done');
  document.getElementById('lift-standard-opts').style.display = type==='standard' ? 'block' : 'none';
  document.getElementById('lift-dn-opts').style.display       = type==='dn'       ? 'block' : 'none';
  document.getElementById('step9').style.display              = type==='dn'       ? 'block' : 'none';
  document.getElementById('sp-roller-row').style.display      = type==='dn'       ? '' : 'none';
  S.lift='';
  document.querySelectorAll('#grp-lift .opt-btn,#grp-lift-dn .opt-btn').forEach(function(b){b.classList.remove('sel');});
  document.getElementById('val3').textContent = '—';
  validateBanding(); updateSpec(); updateCalc();
  openNext('step2');
}

// ── STEP 2 ────────────────────────────────────────────────────────────────────
function setQtyVal(n) {
  n = Math.max(1, Math.min(50, n||1));
  S.qty = n;
  document.getElementById('val2').textContent = n + (n===1?' shade':' shades');
  document.getElementById('step2').classList.add('done');
  updateSpec(); updateCalc(); openNext('step3');
}
function adjQty(d) {
  var el = document.getElementById('qty-inp');
  el.value = Math.max(1, Math.min(50, (parseInt(el.value)||1)+d));
  setQtyVal(parseInt(el.value));
}

// ── STEP 3 ────────────────────────────────────────────────────────────────────
function setLift(lift, el) {
  S.lift = lift;
  var grp = S.type==='dn' ? 'grp-lift-dn' : 'grp-lift';
  document.getElementById(grp).querySelectorAll('.opt-btn').forEach(function(b){b.classList.remove('sel');});
  el.classList.add('sel');
  var lim = LIFT_LIMITS[lift];
  document.getElementById('val3').textContent = lim ? lim.label : lift;
  document.getElementById('step3').classList.add('done');
  var isCCL = lift==='ccl'||lift==='ccl-dn';
  document.getElementById('ccl-headrail-wrap').style.display = isCCL ? 'block' : 'none';
  var isMotor = lift==='motor'||lift==='motor-dn';
  document.getElementById('step13').style.display    = isMotor ? 'block' : 'none';
  document.getElementById('sp-motor-row').style.display = isMotor ? '' : 'none';
  var noteEl = document.getElementById('lift-note');
  var notes = {
    'aerolite':       'Min 20″W · max 96″W · max 40 sqft. No cords — child-safe.',
    'ccl':            'Min 12″W. 1½″ headrail: max 50″W / 33 sqft. 2″ headrail: max 96″W / 64 sqft. Child-safe tensioner required.',
    'smartrelease':   'Min 12″W · max 96″W · max 52 sqft. SmartRelease™ provides controlled descent.',
    'motor':          'Norman motorization only. Power source confirmed at measurement visit.',
    'cordless-dn':    'D&N Cordless: min 20″W · max 96″W · max 40 sqft. Height must not exceed 3× width.',
    'ccl-dn':         'D&N CCL: min 12″W · max 96″W · max 64 sqft. Height must not exceed 3× width.',
    'smartrelease-dn':'D&N SmartRelease™: min 12″W · max 96″W · max 52 sqft. Height must not exceed 3× width.',
    'motor-dn':       'D&N Motorized: Norman motorization. Height must not exceed 3× width.'
  };
  if (notes[lift]) { noteEl.textContent = notes[lift]; noteEl.style.display = ''; }
  else noteEl.style.display = 'none';
  validateDims(); updateSpec(); updateCalc(); openNext('step4');
}

function setHeadrail(size, el) {
  S.headrail = size; selBtn(el,'grp-headrail'); validateDims(); updateCalc();
}

// ── STEP 4 ────────────────────────────────────────────────────────────────────
function validateDims() {
  var w = parseFloat(document.getElementById('inp-width').value)||0;
  var h = parseFloat(document.getElementById('inp-height').value)||0;
  S.width=w; S.height=h;
  var fb = document.getElementById('dim-feedback');
  if (!w||!h) { fb.innerHTML=''; updateSpec(); return; }
  if (!S.lift) { fb.innerHTML='<div class="info-box" style="margin-top:0">Select a lift system first to see size limits.</div>'; return; }
  var lim = LIFT_LIMITS[S.lift]; if (!lim) return;
  var sqft = (w*h)/144;
  var maxW=lim.maxW, maxSqFt=lim.maxSqFt;
  if (lim.cclSub && S.headrail) { var cl=CCL_SUB[S.headrail]; if(cl){maxW=cl.maxW;maxSqFt=cl.maxSqFt;} }
  var errs=[], warns=[];
  if (w<lim.minW) errs.push('Width '+w+'" is below minimum '+lim.minW+'" for '+lim.label+'.');
  if (w>maxW)     errs.push('Width '+w+'" exceeds maximum '+maxW+'".');
  if (h<lim.minH) errs.push('Height '+h+'" is below minimum '+lim.minH+'".');
  if (h>lim.maxH) errs.push('Height '+h+'" exceeds maximum '+lim.maxH+'".');
  if (maxSqFt&&sqft>maxSqFt) errs.push('Area '+sqft.toFixed(1)+' sqft exceeds '+maxSqFt+' sqft limit.');
  if (S.type==='dn'&&h>3*w) errs.push('Day & Night: height ('+h+'") cannot exceed 3× width ('+Math.round(3*w)+'").');
  if (S.fabric&&w>S.fabric.w&&!S.fabric.seam) warns.push('Fabric '+S.fabric.code+' width is '+S.fabric.w+'". Width '+w+'" requires a seam but this fabric does not support seams. Choose a different fabric or confirm.');
  var html='';
  if (errs.length)  html+=errs.map(function(e){return'<div class="warn-box warn-box-red" style="margin-top:6px">⚠ '+e+'</div>';}).join('');
  if (warns.length) html+=warns.map(function(e){return'<div class="warn-box" style="margin-top:6px">⚠ '+e+'</div>';}).join('');
  if (!errs.length&&!warns.length&&w&&h) {
    html='<div class="ok-box">✓ '+w+'" × '+h+'" · '+sqft.toFixed(1)+' sqft — within '+lim.label+' limits.</div>';
    document.getElementById('step4').classList.add('done');
    document.getElementById('val4').textContent = w+'" × '+h+'"';
    openNext('step5');
  }
  fb.innerHTML = html;
  updateValanceSurcharge(); updateSpec(); updateCalc();
}

// ── STEP 5 ────────────────────────────────────────────────────────────────────
function setStyle(style, el) {
  S.style = style;
  selBtn(el,'grp-style');
  var labels = {flat:'Flat Fold without Seams',batten:'Flat Fold with Batten Back',soft:'Soft Fold (+30%)'};
  document.getElementById('val5').textContent = labels[style]||style;
  document.getElementById('step5').classList.add('done');
  document.getElementById('style-dn-warn').style.display = (style==='soft'&&S.type==='dn') ? '' : 'none';
  var notes={flat:'Classic flat Roman, clean face without seams.',batten:'Structured flat fold with batten back for crisp folds. Required for ribbon or edge banding.',soft:'Cascading soft folds — romantic, relaxed look. +30% surcharge.'};
  var noteEl=document.getElementById('style-note');
  noteEl.textContent=notes[style]||''; noteEl.style.display=notes[style]?'':'none';
  validateBanding(); updateSpec(); updateCalc(); openNext('step6');
}

// ── STEP 6: FABRIC ────────────────────────────────────────────────────────────
function filterFabrics(coll, el) {
  currentCollFilter = coll;
  if(el){selBtn(el,'grp-coll-filter');}
  renderFabricGrid();
}

function renderFabricGrid() {
  var filtered = FABRICS.filter(function(f){return currentCollFilter==='all'||f.coll===currentCollFilter;});
  var groups={};
  filtered.forEach(function(f){if(!groups[f.coll])groups[f.coll]=[];groups[f.coll].push(f);});
  var html='';
  Object.keys(groups).forEach(function(coll){
    var fabrics=groups[coll];
    var g=fabrics[0].g;
    var isLinen=coll==='Breeze'||coll==='Alma';
    html+='<div class="coll-section"><div class="coll-label">'+coll+' · Price Group '+g+(isLinen?' · ⚠ Linen blend':'')+' <span style="font-size:9px;color:#f59e0b;font-weight:600">PDF CONFIRM</span></div><div class="fabric-grid">';
    fabrics.forEach(function(f){
      var isSel=S.fabric&&S.fabric.code===f.code;
      var safef=JSON.stringify(f).replace(/'/g,"\\'");
      html+='<div class="swatch'+(isSel?' sel':'')+'" onclick=\'selectFabric('+safef+')\'>'+
        '<div class="swatch-color" style="background:'+f.hex+'"></div>'+
        '<div class="swatch-label"><div class="swatch-name">'+f.name+'</div>'+
        '<div class="swatch-code">'+f.code+'</div>'+
        '<div class="swatch-badge">G'+f.g+' · '+f.w+'"W</div></div></div>';
    });
    html+='</div></div>';
  });
  document.getElementById('fabric-grid-wrap').innerHTML = html;
}

function selectFabric(f) {
  S.fabric = f;
  document.getElementById('val6').textContent = f.name+' ('+f.code+')';
  document.getElementById('step6').classList.add('done');
  var warnEl = document.getElementById('fabric-width-warn');
  if (S.width&&S.width>f.w) {
    warnEl.textContent = f.seam
      ? '⚠ Shade width '+S.width+'" exceeds fabric width '+f.w+'". A seam will be required.'
      : '⚠ Shade width '+S.width+'" exceeds fabric width '+f.w+'". This fabric does not support seams — select a narrower shade or different fabric.';
    warnEl.style.display = '';
  } else { warnEl.style.display='none'; }
  validateBanding(); updateSpec(); updateCalc(); renderFabricGrid(); renderBandingGrids(); openNext('step7');
}

// ── STEP 7: LINING ────────────────────────────────────────────────────────────
function updateLining() {
  var btn = document.querySelector('#grp-lining .opt-btn.sel');
  var txt = btn ? btn.textContent.trim() : 'Translucent (standard)';
  S.lining = txt.includes('Blackout') ? 'Blackout' : 'Translucent';
  document.getElementById('val7').textContent = S.lining;
  document.getElementById('step7').classList.add('done');
  sp('sp-lining', S.lining); updateCalc(); openNext('step8');
}

// ── STEP 8: BANDING ───────────────────────────────────────────────────────────
function setBanding(b, el) {
  S.banding = b;
  selBtn(el,'grp-banding');
  var rw=document.getElementById('ribbon-color-wrap'), ew=document.getElementById('edge-color-wrap');
  rw.style.display = b==='ribbon' ? '' : 'none';
  ew.style.display = b==='edge'   ? '' : 'none';
  var labels={none:'None',ribbon:'Ribbon (+15%)',edge:'Edge/Border (+30%)'};
  document.getElementById('val8').textContent = labels[b]||b;
  document.getElementById('step8').classList.add('done');
  validateBanding(); renderBandingGrids(); sp('sp-banding',labels[b]||b); updateCalc();
}

function validateBanding() {
  var warnEl=document.getElementById('banding-warn');
  var b=S.banding, style=S.style, type=S.type;
  var msgs=[];
  if (b==='ribbon'||b==='edge') {
    if (type==='dn')        msgs.push('Banding is not available with Day & Night shades.');
    if (style==='soft')     msgs.push('Banding is not available with Soft Fold style.');
    if (style==='flat')     msgs.push('Banding requires Flat Fold with Batten Back. Select that style first.');
  }
  if (b==='edge') {
    if (S.fabric&&!EDGE_COLLS.includes(S.fabric.coll)) {
      msgs.push('Edge banding is only available with Lakeside, Alma, or Francis collections. Current fabric: '+(S.fabric.coll||'—')+'.');
    }
  }
  var blocked = type==='dn'||style==='soft'||style==='flat';
  var rb=document.getElementById('btn-ribbon'), eb=document.getElementById('btn-edge');
  if(rb) rb.classList.toggle('disabled-rule',blocked);
  if(eb) eb.classList.toggle('disabled-rule',blocked);
  if (msgs.length) { warnEl.innerHTML='⚠ '+msgs.join(' '); warnEl.style.display=''; }
  else warnEl.style.display='none';
}

function renderBandingGrids() {
  function swatchPill(f, selCode, onclick) {
    var isSel = selCode===f.code;
    var sf=JSON.stringify(f).replace(/'/g,"\\'");
    return '<span style="display:inline-flex;align-items:center;gap:6px;margin:3px;padding:5px 10px;border:1.5px solid '+(isSel?'var(--gold)':'#e8e8e4')+';border-radius:20px;cursor:pointer;font-size:11px;background:'+(isSel?'var(--gold-mid)':'#fff')+'" onclick="'+onclick+'('+sf+')">'
      +'<span style="width:14px;height:14px;border-radius:50%;background:'+f.hex+';border:1px solid #ddd;flex-shrink:0"></span>'
      +f.name+' · '+f.coll+'</span>';
  }
  if (S.banding==='ribbon') {
    document.getElementById('ribbon-fabric-grid').innerHTML = FABRICS.map(function(f){return swatchPill(f,S.ribbonColor&&S.ribbonColor.code,'setRibbonColor');}).join('');
  }
  if (S.banding==='edge') {
    var eligible=FABRICS.filter(function(f){return EDGE_COLLS.includes(f.coll);});
    document.getElementById('edge-base-grid').innerHTML   = eligible.map(function(f){return swatchPill(f,S.edgeBase&&S.edgeBase.code,'setEdgeBase');}).join('');
    document.getElementById('edge-border-grid').innerHTML = eligible.map(function(f){return swatchPill(f,S.edgeBorder&&S.edgeBorder.code,'setEdgeBorder');}).join('');
    document.getElementById('edge-same-warn').style.display = (S.edgeBase&&S.edgeBorder&&S.edgeBase.code===S.edgeBorder.code) ? '' : 'none';
  }
}

function setRibbonColor(f) { S.ribbonColor=f; renderBandingGrids(); updateSpec(); }
function setEdgeBase(f)     { S.edgeBase=f;   renderBandingGrids(); document.getElementById('edge-same-warn').style.display=(S.edgeBorder&&f.code===S.edgeBorder.code)?'':'none'; updateSpec(); }
function setEdgeBorder(f)   { S.edgeBorder=f; renderBandingGrids(); document.getElementById('edge-same-warn').style.display=(S.edgeBase&&f.code===S.edgeBase.code)?'':'none';   updateSpec(); }

// ── STEP 9: ROLLER ────────────────────────────────────────────────────────────
function filterRoller(cat, el) {
  rollerFilter=cat; selBtn(el,'grp-roller-filter'); renderRollerGrid();
}

function renderRollerGrid() {
  var filtered=ROLLER_FABRICS.filter(function(f){return rollerFilter==='all'||f.cat===rollerFilter;});
  var groups={};
  filtered.forEach(function(f){if(!groups[f.coll])groups[f.coll]=[];groups[f.coll].push(f);});
  var html='';
  Object.keys(groups).forEach(function(coll){
    var fabrics=groups[coll];
    html+='<div class="coll-section"><div class="coll-label">'+coll+' · '+fabrics[0].cat+'</div><div class="fabric-grid">';
    fabrics.forEach(function(f){
      var isSel=S.rollerFabric&&S.rollerFabric.code===f.code;
      var sf=JSON.stringify(f).replace(/'/g,"\\'");
      html+='<div class="swatch'+(isSel?' sel':'')+'" onclick=\'selectRoller('+sf+')\'>'
        +'<div class="swatch-color" style="background:'+f.hex+'"></div>'
        +'<div class="swatch-label"><div class="swatch-name">'+f.name+'</div><div class="swatch-code">'+f.code+'</div>'
        +'<div class="swatch-badge">max '+f.maxW+'"W</div></div></div>';
    });
    html+='</div></div>';
  });
  document.getElementById('roller-fabric-grid').innerHTML = html;
}

function selectRoller(f) {
  S.rollerFabric=f;
  document.getElementById('val9').textContent=f.name+' ('+f.code+')';
  document.getElementById('step9').classList.add('done');
  sp('sp-roller',f.name+' · '+f.coll+' ('+f.code+')'); renderRollerGrid(); updateCalc();
}

// ── VALANCE ───────────────────────────────────────────────────────────────────
function updateValance() {
  var hasV = document.querySelector('#grp-valance .opt-btn.sel').textContent.trim().includes('Fabric');
  S.valance = hasV;
  document.getElementById('val10').textContent = hasV ? 'Fabric valance' : 'None';
  sp('sp-valance', hasV ? 'Fabric valance' : 'None');
  document.getElementById('step10').classList.add('done');
  updateValanceSurcharge(); updateCalc();
}

function getValanceSurcharge(w) {
  if (!w) return 0;
  for (var i=0;i<VALANCE_W.length;i++) { if (w<=VALANCE_W[i]) return VALANCE_SUR[i]; }
  return VALANCE_SUR[VALANCE_SUR.length-1];
}

function updateValanceSurcharge() {
  var note = document.getElementById('valance-surcharge-note');
  if (S.valance && S.width) {
    var sur=getValanceSurcharge(S.width);
    note.textContent='Fabric valance surcharge for '+S.width+'" width: $'+sur+' per shade (from Norman surcharge table — PDF CONFIRM).';
    note.style.display='';
  } else { note.style.display='none'; }
}

// ── SBS ────────────────────────────────────────────────────────────────────────
function updateSBS() {
  var hasSBS=document.querySelector('#grp-sbs .opt-btn.sel').textContent.trim().includes('Yes');
  S.sbs=hasSBS;
  document.getElementById('val11').textContent=hasSBS?'Yes':'No';
  sp('sp-sbs',hasSBS?'Yes':'No');
  document.getElementById('step11').classList.add('done');
}

// ── ACCESSORIES ───────────────────────────────────────────────────────────────
function updateAcc() {
  S.holddown    = document.getElementById('acc-holddown').checked;
  S.pole        = document.getElementById('acc-pole').checked;
  S.cordlessPole= document.getElementById('acc-cordless-pole').checked;
  var acc=[S.holddown?'Hold-down':'',S.pole?'Pole attach':'',S.cordlessPole?'Cordless pole':'',S.shims>0?S.shims+' shim'+(S.shims>1?'s':''):''].filter(Boolean);
  document.getElementById('val12').textContent=acc.length?acc.join(', '):'None';
  document.getElementById('step12').classList.add('done');
  updateCalc();
}

var shimsCount=0;
function adjShims(d) {
  shimsCount=Math.min(4,Math.max(0,shimsCount+d));
  S.shims=shimsCount;
  document.getElementById('shim-count').textContent=shimsCount;
  updateAcc();
}

// ── MOTOR ─────────────────────────────────────────────────────────────────────
function setMotor(m, el) {
  S.motor=m; selBtn(el,'grp-motor');
  var labels={smart:'Norman Smart Motor',autowand:'AutoWand™',automate:'Automate Home by Norman'};
  document.getElementById('val13').textContent=labels[m]||m;
  sp('sp-motor',labels[m]||m);
  document.getElementById('step13').classList.add('done');
}

// ── DELIVERY ──────────────────────────────────────────────────────────────────
function setDelivery(opt) {
  S.delivery=opt;
  ['ship','pickup','install'].forEach(function(o){var el=document.getElementById('del-'+o);if(el)el.classList.toggle('sel',o===opt);});
  var labels={ship:'Ship to me',pickup:'Pick up',install:'Professional installation'};
  document.getElementById('val14').textContent=labels[opt]||opt;
  sp('sp-delivery',labels[opt]||opt);
  document.getElementById('step14').classList.add('done');
  updateCalc();
}

// ── SPEC PANEL ────────────────────────────────────────────────────────────────
function updateSpec() {
  sp('sp-type', S.type==='standard'?'Standard Centerpiece Roman':S.type==='dn'?'Day & Night':'');
  var room=document.getElementById('room-label').value.trim(); S.room=room;
  sp('sp-qty', S.qty?(S.qty+' shade'+(S.qty>1?'s':''))+(room?' · '+room:''):'');
  sp('sp-lift', S.lift?(LIFT_LIMITS[S.lift]&&LIFT_LIMITS[S.lift].label)||S.lift:'');
  sp('sp-size', S.width&&S.height ? S.width+'"×'+S.height+'"' : '');
  var mountBtn=document.querySelector('#grp-mount .opt-btn.sel');
  sp('sp-mount', mountBtn?mountBtn.textContent.trim():'Inside mount');
  var sLabels={flat:'Flat Fold without Seams',batten:'Flat Fold with Batten Back',soft:'Soft Fold'};
  sp('sp-style', S.style?sLabels[S.style]||S.style:'');
  sp('sp-fabric', S.fabric?S.fabric.name+' · '+S.fabric.coll+' ('+S.fabric.code+') G'+S.fabric.g:'');
  var bLabels={none:'None',ribbon:'Ribbon (+15%)',edge:'Edge/Border (+30%)'};
  sp('sp-banding', bLabels[S.banding]||'None');
}

// ── PRICING ───────────────────────────────────────────────────────────────────
function tableLookup(w, h, g) {
  if(!w||!h||!g) return 0;
  var wi=CP_W.findIndex(function(v){return w<=v;}); if(wi<0)wi=CP_W.length-1;
  var hi=CP_H.findIndex(function(v){return h<=v;}); if(hi<0)hi=CP_H.length-1;
  var tbl=CP_PRICE[g]; if(!tbl||!tbl[wi])return 0;
  return tbl[wi][hi]||0;
}

function showRow(id, show) { var el=document.getElementById(id); if(el)el.style.display=show?'':'none'; }
function setVal(id, v) { var el=document.getElementById(id); if(el)el.textContent=v; }

function updateCalc() {
  var w=S.width,h=S.height,g=S.fabric?S.fabric.g:0,qty=S.qty||1;
  if(!w||!h||!g){setVal('pr-base','—');setVal('pr-total','—');return;}
  var base=tableLookup(w,h,g);
  if(!base){setVal('pr-base','Out of range — call for quote');setVal('pr-total','—');return;}
  setVal('pr-base','$'+base+'/shade');
  var per=base;
  var hasBlackout=S.lining==='Blackout';
  if(hasBlackout){var add=Math.round(base*.10);per+=add;showRow('pr-lining-row',true);setVal('pr-lining','+$'+add);}
  else showRow('pr-lining-row',false);
  var isSoft=S.style==='soft',isRibbon=S.banding==='ribbon',isEdge=S.banding==='edge';
  var factor=0;
  if(isRibbon)factor=.15;
  if(isEdge||isSoft)factor=Math.max(factor,.30);
  showRow('pr-soft-row',isSoft&&!isEdge);
  showRow('pr-banding-row',isRibbon||isEdge);
  if(factor>0){var badd=Math.round(base*factor);per+=badd;
    if(isSoft&&!isEdge)setVal('pr-soft','+$'+Math.round(base*.30));
    if(isRibbon)setVal('pr-banding','+$'+Math.round(base*.15)+' (ribbon)');
    if(isEdge)  setVal('pr-banding','+$'+Math.round(base*.30)+' (edge)');
  }
  var hasSR=S.lift==='smartrelease'||S.lift==='smartrelease-dn';
  showRow('pr-sr-row',hasSR); var srAdd=hasSR?89:0;
  var isDN=S.type==='dn'; showRow('pr-dn-row',isDN); var dnAdd=isDN?425:0;
  var hasV=S.valance; var vSur=hasV?getValanceSurcharge(w):0;
  showRow('pr-valance-row',hasV); if(hasV)setVal('pr-valance','+$'+vSur);
  var accT=(S.holddown?28:0)+(S.pole?40:0)+(S.cordlessPole?89:0)+((S.shims||0)*7);
  showRow('pr-acc-row',accT>0); if(accT>0)setVal('pr-acc','+$'+accT+'/shade');
  var freight=S.delivery==='pickup'||S.delivery==='install'?0:25+(qty>1?(qty-1)*11:0);
  showRow('pr-freight-row',freight>0); if(freight>0)setVal('pr-freight','$'+freight);
  var total=(per*qty)+(srAdd*qty)+(dnAdd*qty)+(vSur*qty)+(accT*qty)+freight;
  setVal('pr-total','~$'+Math.round(total).toLocaleString());
}

// ── SUBMIT ────────────────────────────────────────────────────────────────────
function addNormanCenterpieceToCart(){
  if(!S.type){ alert('Please select product type before adding to cart.'); return; }
  if(!S.lift){ alert('Please select a lift system before adding to cart.'); return; }
  if(!S.width||!S.height){ alert('Please enter dimensions before adding to cart.'); return; }
  if(!S.style){ alert('Please select a shade style before adding to cart.'); return; }
  if(!S.fabric){ alert('Please select a fabric before adding to cart.'); return; }

  var sLabels={flat:'Flat Fold without Seams',batten:'Flat Fold with Batten Back',soft:'Soft Fold'};
  var motorLabel={smart:'Norman Smart Motor',autowand:'AutoWand™',automate:'Automate Home by Norman'}[S.motor]||'—';

  var lines=[
    {label:'Product',value:'Norman Centerpiece™ Roman Shades — '+(S.type==='dn'?'Day & Night':'Standard')},
    {label:'Quantity',value:String(S.qty||1)},
    {label:'Width',value:S.width+'"'},
    {label:'Height',value:S.height+'"'},
    {label:'Mount',value:S.mount||'Inside mount'},
    {label:'Lift System',value:(S.lift||'—')},
    {label:'Shade Style',value:sLabels[S.style]||S.style},
    {label:'Fabric',value:S.fabric?S.fabric.name+' · '+S.fabric.coll+' (Group '+S.fabric.g+')':'—'},
    {label:'Lining',value:S.lining||'—'},
    {label:'Banding',value:S.banding==='none'?'None':S.banding},
    {label:'Motorization',value:(S.lift==='motor'||S.lift==='motor-dn')?motorLabel:'None'}
  ];
  var specs=lines.map(function(l){return l.label+': '+l.value;}).join(' | ');
  pbAddToCart({product:'Norman Centerpiece™ Roman Shades',lines:lines,specs:specs,price:null,qty:S.qty||1});
  pbOpenCart();
}

function submitQuote() {
  var name=document.getElementById('q-name').value.trim();
  var phone=document.getElementById('q-phone').value.trim();
  var errEl=document.getElementById('submit-errors');
  var errs=[];
  if(!name)         errs.push('Name required.');
  if(!phone)        errs.push('Phone required.');
  if(!S.type)       errs.push('Select product type (Step 1).');
  if(!S.lift)       errs.push('Select lift system (Step 3).');
  if(!S.width||!S.height) errs.push('Enter dimensions (Step 4).');
  if(!S.style)      errs.push('Select shade style (Step 5).');
  if(!S.fabric)     errs.push('Select fabric (Step 6).');
  if(S.type==='dn'&&!S.rollerFabric) errs.push('Select D&N rear roller fabric (Step 9).');
  if(S.banding==='ribbon'&&!S.ribbonColor) errs.push('Select ribbon banding color (Step 8).');
  if(S.banding==='edge'&&(!S.edgeBase||!S.edgeBorder)) errs.push('Select base and border colors for edge banding (Step 8).');
  if(S.banding==='edge'&&S.edgeBase&&S.edgeBorder&&S.edgeBase.code===S.edgeBorder.code) errs.push('Edge banding: base and border must be different colors.');
  if(errs.length){errEl.innerHTML='⚠ Please complete: '+errs.join(' ');errEl.style.display='';document.getElementById('step15').scrollIntoView({behavior:'smooth',block:'start'});return;}
  errEl.style.display='none';
  var liftLabel=(LIFT_LIMITS[S.lift]&&LIFT_LIMITS[S.lift].label)||S.lift;
  var _mountBtn=document.querySelector('#grp-mount .opt-btn.sel');
  var mount=_mountBtn?_mountBtn.textContent.trim():'Inside mount';
  var lining=S.lining;
  var valance=S.valance?'Fabric valance ($'+getValanceSurcharge(S.width)+')':'None';
  var sbs=S.sbs?'Yes':'No';
  var sLabels={flat:'Flat Fold without Seams',batten:'Flat Fold with Batten Back',soft:'Soft Fold'};
  var delivery={ship:'Ship (UPS/FedEx from Huntingdon Valley PA)',pickup:'Pick up (Huntingdon Valley PA)',install:'Professional installation'}[S.delivery]||S.delivery;
  var motorLabel={smart:'Norman Smart Motor',autowand:'AutoWand™',automate:'Automate Home by Norman'}[S.motor]||'—';
  var _powerBtn=document.querySelector('#grp-power .opt-btn.sel');
  var power=_powerBtn?_powerBtn.textContent.trim():'Rechargeable battery';
  var accList=[(S.holddown?'Magnetic hold-down':''),(S.pole?'Pole attachment':''),(S.cordlessPole?'Cordless operating pole':''),((S.shims||0)>0?S.shims+' shim(s)':'')].filter(Boolean).join(', ')||'None';
  var bandDesc=S.banding==='none'?'None':S.banding==='ribbon'?'Ribbon banding (+15%) — color: '+(S.ribbonColor?S.ribbonColor.name+' '+S.ribbonColor.code:'TBD'):'Edge banding/Border (+30%) — base: '+(S.edgeBase?S.edgeBase.name+' '+S.edgeBase.code:'—')+' / border: '+(S.edgeBorder?S.edgeBorder.name+' '+S.edgeBorder.code:'—');
  var body=[
    '=== NORMAN CENTERPIECE™ ROMAN SHADE QUOTE ===','',
    'CONTACT','Name: '+name,'Phone: '+phone,'Email: '+(document.getElementById('q-email').value.trim()||'—'),'',
    'CONFIGURATION',
    'Product: Norman Centerpiece™ Roman Shades — '+(S.type==='dn'?'Day & Night':'Standard'),
    'Quantity: '+S.qty+' shade(s)',
    'Room/Window: '+(S.room||'—'),
    'Width: '+S.width+'"','Height: '+S.height+'"','Mount: '+mount,
    'Lift system: '+liftLabel+((S.lift==='ccl'||S.lift==='ccl-dn')?' — '+S.headrail+'" headrail':''),
    'Shade style: '+(sLabels[S.style]||S.style),'',
    'FABRIC','! Fabric codes are PDF CONFIRM — verify prices before finalizing',
    'Roman fabric: '+(S.fabric?S.fabric.name+' · '+S.fabric.coll+' · '+S.fabric.code+' · Price Group '+S.fabric.g:'—'),
    'Lining: '+lining,'Banding: '+bandDesc,'',
    (S.type==='dn'?'DAY & NIGHT\nRear roller fabric: '+(S.rollerFabric?S.rollerFabric.name+' · '+S.rollerFabric.coll+' · '+S.rollerFabric.code+' · max '+S.rollerFabric.maxW+'"W':'—')+'\n':''),
    'EXTRAS','Valance: '+valance,'Side-by-side alignment: '+sbs,'Accessories: '+accList,'',
    'MOTORIZATION','Motorization: '+((S.lift==='motor'||S.lift==='motor-dn')?motorLabel+' · Power: '+power:'None — '+liftLabel),'',
    'DELIVERY',delivery,'','NOTES',document.getElementById('q-notes').value.trim()||'None','',
    '--- Sent from blindznation.com/pages/norman-centerpiece-roman.html ---'
  ].join('\n');
  var subj='Norman Centerpiece™ Roman — '+S.width+'"×'+S.height+'" '+(S.fabric?S.fabric.name:'')+' — '+name;
  window.location.href='mailto:justin@blindznation.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  document.getElementById('step15-body').querySelectorAll(':not(#success-box)').forEach(function(el){el.style.display='none';});
  document.getElementById('success-box').style.display='block';
}

// ── INIT ──────────────────────────────────────────────────────────────────────
renderFabricGrid();
renderRollerGrid();
setQtyVal(1);
document.getElementById('room-label').addEventListener('input', updateSpec);
document.querySelectorAll('#grp-mount .opt-btn').forEach(function(b){b.addEventListener('click',function(){sp('sp-mount',this.textContent.trim());});});