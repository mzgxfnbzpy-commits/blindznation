renderNav('Shades & blinds');
renderFooter(false);

// ═══════════════════════════════════════════════════════════
// WALLACE 3D DUAL SHEER — DATA
// Source: Wallace - Sheer 3D Horizontals.pdf (10/01/2024)
// ═══════════════════════════════════════════════════════════
// Collections: {name, group, band, lightControl, fabricInsert, bottomRail, minW, maxW, minH, maxH, colors:[{code,hwColor,label}]}
const COLLECTIONS = [
  {name:'Lux',      group:'A', band:'3"',    lc:'Translucent',    insert:true,  rail:'Moon Shape', minW:12, maxW:100, minH:20, maxH:120,
   colors:[{code:'LX-7511',hw:'White',label:'White'},{code:'LX-7512',hw:'Ivory',label:'Ivory'},{code:'LX-7513',hw:'Beige',label:'Beige'},{code:'LX-7514',hw:'Grey',label:'Grey'}]},
  {name:'Natural',  group:'A', band:'3"',    lc:'Translucent',    insert:true,  rail:'Moon Shape', minW:12, maxW:100, minH:20, maxH:120,
   colors:[{code:'DNT-9001',hw:'Beige',label:'Beige 1'},{code:'DNT-9002',hw:'Beige',label:'Beige 2'},{code:'DNT-9003',hw:'Grey',label:'Grey 1'},{code:'DNT-9004',hw:'Grey',label:'Grey 2'}]},
  {name:'Arcadia',  group:'B', band:'3⅛"',  lc:'Translucent',    insert:true,  rail:'Moon Shape', minW:12, maxW:100, minH:20, maxH:120,
   colors:[{code:'ARC-5451',hw:'White',label:'White 1'},{code:'ARC-5452',hw:'White',label:'White 2'},{code:'ARC-5453',hw:'Beige',label:'Beige'},{code:'ARC-5454',hw:'Ivory',label:'Ivory'},{code:'ARC-5455',hw:'Black',label:'Black'}]},
  {name:'Bellus',   group:'B', band:'2"',    lc:'Translucent',    insert:false, rail:'Moon Shape', minW:12, maxW:100, minH:20, maxH:120,
   colors:[{code:'BLS-1851',hw:'White',label:'White 1'},{code:'BLS-1852',hw:'White',label:'White 2'},{code:'BLS-1853',hw:'Beige',label:'Beige'},{code:'BLS-1854',hw:'Grey',label:'Grey'}]},
  {name:'Chagall',  group:'B', band:'3"',    lc:'Translucent',    insert:true,  rail:'Moon Shape', minW:12, maxW:100, minH:20, maxH:120,
   colors:[{code:'SGS-1111',hw:'White',label:'White 1'},{code:'SGS-1112',hw:'Ivory',label:'Ivory'},{code:'SGS-1113',hw:'Grey',label:'Grey'},{code:'SGS-1114',hw:'Beige',label:'Beige'},{code:'SGS-1115',hw:'Brown',label:'Brown'},{code:'SGS-1116',hw:'White',label:'White 2'}]},
  {name:'Eco',      group:'B', band:'3"',    lc:'Translucent',    insert:true,  rail:'Moon Shape', minW:12, maxW:100, minH:20, maxH:120,
   colors:[{code:'ECO-1811',hw:'Grey',label:'Grey'},{code:'ECO-1812',hw:'Ivory',label:'Ivory'},{code:'ECO-1813',hw:'Beige',label:'Beige'}]},
  {name:'Vivid',    group:'B', band:'3"',    lc:'Translucent',    insert:true,  rail:'Moon Shape', minW:12, maxW:100, minH:20, maxH:120,
   colors:[{code:'VVD-5901',hw:'White',label:'White 1'},{code:'VVD-5902',hw:'White',label:'White 2'},{code:'VVD-5903',hw:'Ivory',label:'Ivory'},{code:'VVD-5904',hw:'Beige',label:'Beige'},{code:'VVD-5907',hw:'Brown',label:'Brown'}]},
  {name:'Fresh Band',group:'B',band:'3"',    lc:'Translucent',    insert:false, rail:'Deluxe',     minW:20, maxW:100, minH:20, maxH:120,
   colors:[{code:'FRB-1371',hw:'Ivory',label:'Ivory 1'},{code:'FRB-1372',hw:'Ivory',label:'Ivory 2'},{code:'FRB-1373',hw:'Grey',label:'Grey'},{code:'FRB-1374',hw:'Brown',label:'Brown 1'},{code:'FRB-1375',hw:'Brown',label:'Brown 2'}]},
  {name:'One Band', group:'B', band:'3"',    lc:'Translucent',    insert:false, rail:'Deluxe',     minW:20, maxW:100, minH:20, maxH:120,
   colors:[{code:'BD-1151',hw:'White',label:'White'},{code:'BD-1152',hw:'Ivory',label:'Ivory'},{code:'BD-1153',hw:'Beige',label:'Beige'},{code:'BD-1154',hw:'Brown',label:'Brown 1'},{code:'BD-1155',hw:'Brown',label:'Brown 2'}]},
  {name:'Blackout Ares',group:'C',band:'3"', lc:'Blackout', insert:true,  rail:'Moon Shape', minW:12, maxW:100, minH:20, maxH:120,
   colors:[{code:'ARB-1131',hw:'White',label:'White'},{code:'ARB-1132',hw:'Beige',label:'Beige'},{code:'ARB-1133',hw:'Brown',label:'Brown 1'},{code:'ARB-1134',hw:'Grey',label:'Grey'},{code:'ARB-1135',hw:'Ivory',label:'Ivory'},{code:'ARB-1136',hw:'Brown',label:'Brown 2'}]},
  {name:'Chelsea',  group:'C', band:'3"',    lc:'Translucent',    insert:false, rail:'Deluxe',     minW:20, maxW:100, minH:20, maxH:120,
   colors:[{code:'CS-1831',hw:'White',label:'White'},{code:'CS-1832',hw:'Ivory',label:'Ivory'},{code:'CS-1833',hw:'Beige',label:'Beige'},{code:'CS-1834',hw:'Brown',label:'Brown'},{code:'CS-1835',hw:'Grey',label:'Grey'}]},
  {name:'Shiny',    group:'C', band:'3"',    lc:'Translucent',    insert:true,  rail:'Moon Shape', minW:12, maxW:100, minH:20, maxH:120,
   colors:[{code:'SNY-1841',hw:'White',label:'White'},{code:'SNY-1842',hw:'Ivory',label:'Ivory'},{code:'SNY-1843',hw:'Beige',label:'Beige 1'},{code:'SNY-1844',hw:'Beige',label:'Beige 2'},{code:'SNY-1845',hw:'Grey',label:'Grey'}]},
  {name:'Sunlux',   group:'C', band:'2"',    lc:'Blackout', insert:false, rail:'Moon Shape', minW:12, maxW:100, minH:20, maxH:120,
   colors:[{code:'SLX-1861',hw:'White',label:'White'},{code:'SLX-1862',hw:'Grey',label:'Grey'},{code:'SLX-1863',hw:'Beige',label:'Beige'},{code:'SLX-1864',hw:'Brown',label:'Brown 1'},{code:'SLX-1865',hw:'Brown',label:'Brown 2'}]}
];

// ═══════════════════════════════════════════════════════════
// PRICE MATRIX — Wallace 3D Dual Sheer / Sheer 3D Horizontals
// Source: Wallace - Sheer 3D Horizontals.pdf (10/01/2024)
// Width cols: 24,32,36,44,52,60,68,76,84,92,100
// Height rows: 40,50,60,70,80,90,100,110,120,125
// ═══════════════════════════════════════════════════════════
const PRICE_W=[24,32,36,44,52,60,68,76,84,92,100];
const PRICE_H=[40,50,60,70,80,90,100,110,120,125];
const PRICE_MATRIX={
  A:[
    [414,414,414,414,420,447,475,503,572,607,647],
    [414,414,414,430,465,499,534,568,648,695,742],
    [414,414,427,468,509,551,592,633,733,774,816],
    [414,434,458,506,554,602,651,699,789,837,885],
    [414,461,489,544,599,654,709,764,824,879,934],
    [427,489,520,582,644,706,768,830,892,954,1016],
    [447,516,551,620,689,757,826,895,964,1033,1102],
    [468,544,582,658,733,809,885,961,1036,1112,1188],
    [489,571,613,695,778,861,943,1026,1109,1191,1274],
    [499,585,628,714,801,887,973,1059,1145,1231,1317]
  ],
  B:[
    [465,465,465,465,472,507,543,578,654,697,744],
    [465,465,465,485,529,573,618,662,750,807,863],
    [465,465,481,534,587,640,693,746,855,908,961],
    [465,490,520,582,644,706,768,830,932,994,1056],
    [465,525,560,631,702,772,843,914,988,1059,1130],
    [481,560,600,679,759,839,918,998,1077,1157,1236],
    [507,596,640,728,816,905,993,1082,1170,1258,1347],
    [534,631,679,777,874,971,1068,1166,1263,1360,1457],
    [560,666,719,825,931,1037,1143,1249,1356,1462,1568],
    [573,684,739,850,960,1071,1181,1291,1402,1512,1623]
  ],
  C:[
    [522,522,522,522,532,577,622,667,752,805,863],
    [522,522,522,549,605,662,718,775,875,943,1012],
    [522,522,543,611,679,747,814,882,1006,1074,1141],
    [522,554,594,673,752,831,911,990,1109,1188,1267],
    [522,600,645,735,826,916,1007,1097,1192,1282,1373],
    [543,645,696,798,899,1001,1103,1205,1307,1409,1510],
    [577,690,747,860,973,1086,1199,1312,1425,1539,1652],
    [611,735,798,922,1046,1171,1295,1420,1544,1669,1793],
    [645,781,848,984,1120,1256,1392,1527,1663,1799,1935],
    [662,803,874,1015,1157,1298,1440,1581,1723,1864,2005]
  ]
};

function lookupPrice(w,h,group){
  const tbl=PRICE_MATRIX[group]; if(!tbl) return null;
  let wi=PRICE_W.findIndex(v=>w<=v); if(wi<0) wi=PRICE_W.length-1;
  let hi=PRICE_H.findIndex(v=>h<=v); if(hi<0) hi=PRICE_H.length-1;
  return(tbl[hi]&&tbl[hi][wi])||null;
}

function calcPrice(){
  if(!S.coll||!S.w||!S.h) return null;
  const base=lookupPrice(S.w,S.h,S.coll.group);
  if(!base) return null;
  let per=base;
  // Surcharges
  if(S.fabInsert) per+=30;           // fabric headrail insert
  if(S.deluxeInsert) per+=40;        // Deluxe bottom rail
  if(S.stainlessChain) per+=15;      // stainless chain upgrade
  if(S.ctrl==='motor') per+=350;     // battery motor
  if(S.charger10) per+=45;
  if(S.charger16) per+=45;
  if(S.remote1) per+=85;
  if(S.remote15) per+=120;
  if(S.smartHub) per+=350;
  // Oversize
  if(S.w>=100) per+=80;
  else if(S.w>=90) per+=40;
  // Shade minimum
  const qty=S.qty||1;
  let total=per*qty;
  if(total<25) total=25;             // min 5 first shade
  if(qty>1) total+=(qty-1)*8;        //  handling each additional
  return{base,per,total,qty};
}

// Hardware color swatches
const HW_COLORS = [
  {name:'White',  hex:'#FFFFFF'},{name:'Ivory',hex:'#FFFFF0'},{name:'Beige',hex:'#D2B48C'},
  {name:'Brown',  hex:'#6B3A2A'},{name:'Grey', hex:'#9E9E9E'},{name:'Black',hex:'#222222'}
];
// Swatch approximations for color chips (by label keyword)
const CHIP_SWATCHES = {White:'#F8F8F8',Ivory:'#FFFFF0',Beige:'#D2B48C',Grey:'#A0A0A0',Brown:'#6B3A2A',Black:'#222222'};

// Cord/chain length table [minH, maxH, chainLen]
const CHAIN_TABLE = [
  [20,22,12],[23,26,16],[27,29,20],[30,34,24],[35,37,28],[38,41,31],
  [42,45,35],[46,49,39],[50,53,43],[54,57,47],[58,61,51],[62,65,55],
  [66,69,59],[70,74,63],[75,78,67],[79,82,71],[83,86,75],[87,99,79]
];
function chainLen(h){
  if(h>100) return 87;
  const row=CHAIN_TABLE.find(r=>h>=r[0]&&h<=r[1]);
  return row?row[2]:null;
}

// ── STATE ──────────────────────────────────────────────────────────────────
const S = {
  coll:null, color:null, hwColor:null, mount:'inside',
  w:0, h:0, cassette:'round', fabInsert:false,
  rail:'Moon Shape', deluxeInsert:false,
  ctrl:null, chainColor:'White', stainlessChain:false, stainlessFinish:'Stainless Steel',
  charger10:false, charger16:false, remote1:false, remote15:false, smartHub:false, solarPanel:false,
  headrail:'single', sideBySide:false, qty:1, del:'ship'
};

// ── BUILD COLLECTION GRID ─────────────────────────────────────────────────
function buildCollGrid(){
  const g=document.getElementById('coll-grid');
  g.innerHTML=COLLECTIONS.map((c,i)=>`
    <div class="coll-card" onclick="pickCollection(${i})">
      <div class="coll-name">${c.name}</div>
      <div class="coll-meta">
        <span class="pg-badge">Group ${c.group}</span>
        ${c.lc==='Blackout'?'<span class="rd-badge">Blackout</span>':''}
        ${c.band} band · ${c.rail==='Deluxe'?'Deluxe bottom rail':c.rail}
      </div>
    </div>`).join('');
}
buildCollGrid();

// Build HW color dots
function buildHWColors(suggested){
  const g=document.getElementById('hw-colors');
  if(!S.hwColorManual) S.hwColor=suggested;   // keep a manually-chosen hardware color across fabric changes
  const cur=S.hwColor;
  g.innerHTML=HW_COLORS.map(c=>`
    <div class="hw-col-item">
      <div class="hw-dot${c.name===cur?' sel':''}" style="background:${c.hex};border-color:${c.name===cur?'var(--gold)':'transparent'}"
        onclick="pickHWColor(this,'${c.name}')" title="${c.name}"></div>
      <div class="hw-dot-label">${c.name}</div>
    </div>`).join('');
}

// ── STEP TOGGLES ──────────────────────────────────────────────────────────
function toggleStep(id){
  const b=document.getElementById(id);
  const isOpen=b.classList.contains('open');
  b.classList.toggle('open',!isOpen);
}
function openStep(id){
  const b=document.getElementById(id);
  b.classList.add('active','open');
}
function markDone(id){document.getElementById(id).classList.add('done');}

// ── STEP 1: COLLECTION ────────────────────────────────────────────────────
function pickCollection(idx){
  document.querySelectorAll('.coll-card').forEach(c=>c.classList.remove('sel'));
  document.querySelectorAll('.coll-card')[idx].classList.add('sel');
  S.coll=COLLECTIONS[idx];
  document.getElementById('s1val').textContent=S.coll.name+' (Group '+S.coll.group+')';
  markDone('step1');
  // Build color grid
  buildColorGrid();
  // Update fabric insert visibility
  updateFabInsert();
  // Update bottom rail section
  updateBottomRail();
  // Re-validate dims
  if(S.w&&S.h) calcDims();
  updateSpec();
  openStep('step2');
}

// ── STEP 2: COLOR ─────────────────────────────────────────────────────────
function buildColorGrid(){
  if(!S.coll) return;
  const g=document.getElementById('color-grid');
  g.innerHTML=S.coll.colors.map(c=>`
    <div class="color-chip" onclick="pickColor(this,'${c.code}','${c.label}','${c.hw}')">
      <div class="chip-swatch" style="background:${CHIP_SWATCHES[c.hw]||'#ccc'}"></div>
      <div class="chip-info"><div class="chip-code">${c.code}</div><div class="chip-name">${c.label}</div></div>
    </div>`).join('');
  S.color=null;
  document.getElementById('s2val').textContent='—';
}

function pickColor(el,code,label,hwSuggested){
  document.querySelectorAll('.color-chip').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.color={code,label};
  document.getElementById('s2val').textContent=label+' ('+code+')';
  markDone('step2');
  buildHWColors(hwSuggested);
  updateSpec();
  openStep('step3');
}

// ── STEP 3: MOUNT & DIMS ──────────────────────────────────────────────────
function pickMount(el,key){
  document.querySelectorAll('#step3 .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.mount=key;
  calcDims();
}

function calcDims(){
  const wW=parseFloat(document.getElementById('w-whole').value)||0;
  const wF=parseFloat(document.getElementById('w-frac').value)||0;
  const hW=parseFloat(document.getElementById('h-whole').value)||0;
  const hF=parseFloat(document.getElementById('h-frac').value)||0;
  S.w=+(wW+wF).toFixed(3); S.h=+(hW+hF).toFixed(3);
  const msg=document.getElementById('dim-msg');
  const dd=document.getElementById('dim-deduct');
  msg.style.display='none'; dd.style.display='none';
  if(!S.w||!S.h) return;

  // Validate against collection
  const c=S.coll;
  const minW=c?c.minW:12; const maxW=c?c.maxW:100;
  const minH=c?c.minH:20; const maxH=c?c.maxH:120;

  let err='';
  if(S.w<minW||S.w>maxW) err='Width must be '+minW+'″–'+maxW+'″ for '+( c?c.name:'this collection')+'.';
  else if(S.h<minH||S.h>maxH) err='Height must be '+minH+'″–'+maxH+'″ for '+(c?c.name:'this collection')+'.';
  else if(S.ctrl==='motor'&&(S.w<23||S.w>100)) err='Motor control requires 23″–100″ width.';

  if(err){msg.className='msg-box msg-err';msg.textContent=err;msg.style.display='block';return;}

  const isIM=S.mount==='inside';
  const isCCL=S.ctrl!=='motor';
  // Cassette w = ordW - 1/4 (IM) or ordW (OM)
  const casW=isIM?S.w-0.25:S.w;
  // Tube w
  const tubeW=isIM?(isCCL?S.w-0.875:S.w-1):(isCCL?S.w-0.625:S.w-0.75);
  // Fabric w
  const fabW=isIM?S.w-1.25:S.w-1;
  // Bottom rail w
  const railW=isIM?(isCCL?S.w-1:S.w-1.125):(isCCL?S.w-0.75:S.w-0.875);
  // Shade height (open) = ordered H - 0.5
  const shadeH=S.h-0.5;

  document.getElementById('dims-tbody').innerHTML=[
    ['Cassette width', fmtDim(casW)],
    ['Tube width', fmtDim(tubeW)],
    ['Fabric width', fmtDim(fabW)],
    ['Bottom rail width', fmtDim(railW)],
    ['Shade height (vanes open)', fmtDim(shadeH)]
  ].map(r=>'<tr><td>'+r[0]+'</td><td>'+r[1]+'</td></tr>').join('');

  dd.style.display='block';
  document.getElementById('s3val').textContent=S.w+'″ × '+S.h+'″ '+S.mount;
  markDone('step3');
  updateChainNote();
  updateSpec();
}

function fmtDim(v){
  const whole=Math.floor(v);
  const frac=+(v-whole).toFixed(3);
  const fracs={0:'',0.125:'⅛″',0.25:'¼″',0.375:'⅜″',0.5:'½″',0.625:'⅝″',0.75:'¾″',0.875:'⅞″'};
  return whole+(fracs[frac]||(' '+v+'″'))+(frac?'':'″');
}

// ── STEP 4: CASSETTE ─────────────────────────────────────────────────────
function pickCassette(el,key){
  document.querySelectorAll('#step4 .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.cassette=key;
  document.getElementById('s4val').textContent=(key==='round'?'Round':'Square')+' cassette · '+(S.hwColor||'—');
  markDone('step4');
  updateSpec();
  calcDims();
}

function pickHWColor(el,name){
  document.querySelectorAll('.hw-dot').forEach(d=>{d.classList.remove('sel');d.style.borderColor='transparent';});
  el.classList.add('sel');
  el.style.borderColor='var(--gold)';
  S.hwColor=name;
  S.hwColorManual=true;
  document.getElementById('s4val').textContent=(S.cassette==='round'?'Round':'Square')+' · '+name;
  updateSpec();
}

function updateFabInsert(){
  const c=S.coll;
  if(!c) return;
  document.getElementById('fab-insert-section').style.display=c.insert?'block':'none';
  document.getElementById('fab-insert-na').style.display=c.insert?'none':'block';
  if(!c.insert){S.fabInsert=false;document.getElementById('fab-insert-row').classList.remove('sel');}
}

// ── STEP 5: BOTTOM RAIL ───────────────────────────────────────────────────
function updateBottomRail(){
  const c=S.coll;
  if(!c){return;}
  const sec=document.getElementById('bottomrail-content');
  S.rail=c.rail;
  if(c.rail==='Moon Shape'){
    sec.innerHTML='<div class="msg-info" style="margin-top:4px">Moon Shape bottom bar — standard for '+c.name+'. No upgrade required.</div><div class="step-note" style="margin-top:6px">Moon Shape is the standard 3D sheer bottom rail.</div>';
    S.deluxeInsert=false;
    document.getElementById('s5val').textContent='Moon Shape (standard)';
    markDone('step5');
  } else {
    sec.innerHTML=`
      <div class="msg-info" style="margin-top:4px">${c.name} uses a Deluxe round bottom rail with fabric insert (+$40 per shade).</div>
      <div class="addon-row sel" id="deluxe-rail-row" onclick="toggleAddon(this,'deluxeInsert')" style="margin-top:10px">
        <div class="addon-left"><div class="addon-check" style="background:var(--gold);border-color:var(--gold);color:#1C1510">✓</div><div><div class="addon-name">Deluxe bottom rail with fabric insert</div><div class="addon-sub">Required for this collection · +$40</div></div></div>
        <div class="addon-price">+$40</div>
      </div>`;
    S.deluxeInsert=true;
    document.getElementById('s5val').textContent='Deluxe + fabric insert (+$40)';
    markDone('step5');
  }
}

// ── STEP 6: CONTROL ───────────────────────────────────────────────────────
const CHAIN_COLORS=['White','Ivory','Beige','Brown','Grey','Black'];
const STAINLESS_FINISHES=['Stainless Steel Metal','Oil-Rubbed Bronze Metal','Gun Metal'];

function buildChainColorGrid(){
  const g=document.getElementById('chain-color-grid');
  g.innerHTML=CHAIN_COLORS.map(c=>`<div class="chain-chip${c===S.chainColor?' sel':''}" onclick="pickChainColor(this,'${c}')">${c}</div>`).join('');
}
function buildStainlessGrid(){
  const g=document.getElementById('stainless-finish-grid');
  g.innerHTML=STAINLESS_FINISHES.map(f=>`<div class="chain-chip${f===S.stainlessFinish?' sel':''}" onclick="pickStainlessFinish(this,'${f}')">${f}</div>`).join('');
}
buildChainColorGrid();
buildStainlessGrid();

function pickControl(el,key){
  document.querySelectorAll('#step6 .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.ctrl=key;
  const note=document.getElementById('ctrl-msg');
  note.style.display='none';
  document.getElementById('ccl-options').style.display=key==='ccl'?'block':'none';
  document.getElementById('motor-options').style.display=key==='motor'?'block':'none';
  if(key==='motor'&&S.w&&(S.w<23||S.w>100)){
    note.className='msg-box msg-err';
    note.textContent='Battery motor requires 23″–100″ width. Current width: '+S.w+'″.';
    note.style.display='block';
  }
  document.getElementById('s6val').textContent=key==='ccl'?'Continuous Cord Loop':'Battery Motor ($350)';
  markDone('step6');
  updateChainNote();
  calcDims();
  updateSpec();
}

function pickChainColor(el,name){
  document.querySelectorAll('#chain-color-grid .chain-chip').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.chainColor=name;
  updateSpec();
}

function pickStainlessFinish(el,name){
  document.querySelectorAll('#stainless-finish-grid .chain-chip').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.stainlessFinish=name;
  updateSpec();
}

function updateChainNote(){
  if(!S.h||S.ctrl!=='ccl') return;
  const len=chainLen(S.h);
  const note=document.getElementById('chain-length-note');
  if(note) note.textContent='Chain length for '+S.h+'″ shade height: ~'+( len||'custom')+'″ chain.';
}

// ── STEP 7: MULTI-SHADE ────────────────────────────────────────────────────
function pickHeadrail(el,key){
  document.querySelectorAll('.radio-chip').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.headrail=key;
  const mf=document.getElementById('multi-fields');
  const mn=document.getElementById('multi-note');
  mf.style.display=key==='single'?'none':'block';
  if(key!=='single'){
    mn.style.display='block';
    mn.textContent=key==='2on1'?'2-on-1: two shades share one headrail. Enter each shade width in the field below. Priced as two separate shades.':'3-on-1: three shades share one headrail. Enter each shade width below. Priced as three separate shades.';
    checkMulti();
  } else {
    mn.style.display='none';
  }
  document.getElementById('s7val').textContent=key==='single'?'Single shade':key==='2on1'?'2-on-1 headrail':'3-on-1 headrail';
  updateSpec();
}

function checkMulti(){
  const raw=document.getElementById('f-sub-widths').value.trim();
  const warn=document.getElementById('multi-warn');
  warn.style.display='none';
  if(!raw) return;
  const parts=raw.split(/[\s,]+/).map(Number).filter(Boolean);
  const total=parts.reduce((a,b)=>a+b,0);
  if(total>110){warn.className='msg-box msg-err';warn.textContent='Combined headrail width '+total+'″ exceeds 110″ maximum.';warn.style.display='block';}
  else if(total>106){warn.className='msg-box msg-warn';warn.textContent='Combined width '+total+'″ exceeds 106″ — fabric headrail insert will have a center seam.';warn.style.display='block';}
  updateSpec();
}

// ── ACCESSORIES ────────────────────────────────────────────────────────────
function toggleAddon(el,key){
  if(!el.classList.contains('addon-row')) return;
  el.classList.toggle('sel');
  S[key]=el.classList.contains('sel');
  const check=el.querySelector('.addon-check');
  if(check){check.style.background=S[key]?'var(--gold)':'';check.style.borderColor=S[key]?'var(--gold)':'#ccc';check.style.color=S[key]?'#1C1510':'transparent';}
  if(key==='stainlessChain'){
    document.getElementById('stainless-options').style.display=S[key]?'block':'none';
  }
  updateSpec();
}

// ── DELIVERY ───────────────────────────────────────────────────────────────
function pickDel(btn,key){
  document.querySelectorAll('.delivery-opt-card').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  S.del=key;
    }

// ── SPEC PANEL ─────────────────────────────────────────────────────────────
function updateSpec(){
  const ready=S.coll&&S.color&&S.w&&S.h&&S.ctrl;
  document.getElementById('sp-pending').style.display=ready?'none':'block';
  document.getElementById('sp-detail').style.display=ready?'block':'none';
  if(!ready) return;

  document.getElementById('sp-coll').textContent=S.coll.name;
  document.getElementById('sp-pg').textContent='Group '+S.coll.group;
  document.getElementById('sp-color').textContent=(S.color.label||'—')+' ('+S.color.code+')';
  document.getElementById('sp-band').textContent=S.coll.band+' · '+S.coll.lc;
  document.getElementById('sp-mount').textContent=S.mount==='inside'?'Inside Mount':'Outside Mount';
  document.getElementById('sp-size').textContent=S.w+'″ × '+S.h+'″';
  document.getElementById('sp-cassette').textContent=(S.cassette==='round'?'Round':'Square')+' cassette';
  document.getElementById('sp-hwcolor').textContent=S.hwColor||'—';
  document.getElementById('sp-insert').textContent=S.fabInsert?'Yes (+$30)':'No';
  document.getElementById('sp-rail').textContent=S.rail+(S.deluxeInsert?' + fabric insert (+$40)':'');

  let ctrlStr=S.ctrl==='ccl'?'Continuous Cord Loop — '+S.chainColor+(S.stainlessChain?' ('+S.stainlessFinish+', +$15)':''):'Battery Motor';
  document.getElementById('sp-ctrl').textContent=ctrlStr;

  // Accessories summary
  const accs=[];
  if(S.ctrl==='motor'){
    if(S.charger10) accs.push('10ft charger');
    if(S.charger16) accs.push('16ft charger');
    if(S.remote1) accs.push('Single remote');
    if(S.remote15) accs.push('15-ch remote');
    if(S.smartHub) accs.push('Smart Hub DD7006');
    if(S.solarPanel) accs.push('Solar panel');
  }
  document.getElementById('sp-accs').textContent=accs.length?accs.join(', '):'—';

  const qty=parseInt(document.getElementById('qty').value)||1;
  S.qty=qty;
  document.getElementById('sp-qty').textContent=qty+' shade'+(qty>1?'s':'');
  document.getElementById('s8val').textContent=qty+' shade'+(qty>1?'s':'')+' · Ship (UPS/FedEx)';

  // Oversize warning
  document.getElementById('sp-warn-os').style.display=S.w>=90?'block':'none';

  // Height >120 warning
  if(S.h>120){
    const oNote=document.getElementById('sp-warn-os');
    if(S.w<90){oNote.className='sp-warn';oNote.style.display='block';oNote.textContent='⚠ Height '+S.h+'″ exceeds 120″ — confirm with us before ordering (PDF has conflicting max-height signals at 120″–130″).';}
    else{oNote.textContent='⚠ Width ≥90″ oversize applies. Height '+S.h+'″ > 120″ — confirm before ordering.';}
  }

  // Live price estimate
  const pr=calcPrice();
  const spPrice=document.getElementById('sp-price');
  const spBreak=document.getElementById('sp-price-breakdown');
  if(pr&&spPrice){
    spPrice.textContent='~$'+Math.round(pr.per).toLocaleString()+'/shade';
    if(spBreak) spBreak.textContent='Base $'+pr.base+(pr.per>pr.base?' + surcharges $'+(pr.per-pr.base):'')+(pr.qty>1?' | '+pr.qty+' shades, total ~$'+Math.round(pr.total).toLocaleString():'');
  } else if(spPrice){
    spPrice.textContent='--';
    if(spBreak) spBreak.textContent='';
  }

  // Seam warning
  const raw=document.getElementById('f-sub-widths').value.trim();
  const parts=raw?raw.split(/[\s,]+/).map(Number).filter(Boolean):[];
  const total=parts.reduce((a,b)=>a+b,0);
  document.getElementById('sp-warn-seam').style.display=(total>106)?'block':'none';
}

// ── SUBMIT ─────────────────────────────────────────────────────────────────
function addWallace3dSheerToCart(){
  if(!S.coll){ alert('Please select a collection before adding to cart.'); return; }
  if(!S.color){ alert('Please select a color before adding to cart.'); return; }
  if(!S.w||!S.h){ alert('Please enter valid dimensions before adding to cart.'); return; }
  if(!S.ctrl){ alert('Please select a control type before adding to cart.'); return; }

  const qty=S.qty||1;
  const coll=S.coll;
  const ctrlLabel=S.ctrl==='ccl'?'Continuous Cord Loop':'Battery Motor';

  const lines=[
    {label:'Product',value:'Wallace 3D Dual Sheer Shades'},
    {label:'Collection',value:coll?coll.name:'—'},
    {label:'Price Group',value:coll?'Group '+coll.group:'—'},
    {label:'Band Size',value:coll?coll.band:'—'},
    {label:'Color',value:S.color?S.color.label+' ('+S.color.code+')':'—'},
    {label:'Mount',value:S.mount==='inside'?'Inside Mount':'Outside Mount'},
    {label:'Width',value:(S.w||'—')+'″'},
    {label:'Height',value:(S.h||'—')+'″'},
    {label:'Control',value:ctrlLabel},
    {label:'Cassette',value:S.cassette==='round'?'Round':'Square'},
    {label:'Hardware Color',value:S.hwColor||'—'},
    {label:'Quantity',value:String(qty)}
  ];
  const specs=lines.map(l=>l.label+': '+l.value).join(' | ');
  pbAddToCart({product:'Wallace 3D Dual Sheer Shades',lines:lines,specs:specs,price:null,qty:qty});
  pbOpenCart();
}

function submitQuote(){
  const name=document.getElementById('f-name').value.trim();
  const phone=document.getElementById('f-phone').value.trim();
  const err=document.getElementById('form-err');
  if(!name||!phone){err.style.display='block';return;}
  err.style.display='none';

  const qty=S.qty||1;
  const coll=S.coll;
  const ctrl=S.ctrl==='ccl'?'Continuous Cord Loop':'Battery Motor ($350/motor)';
  const chainInfo=S.ctrl==='ccl'?('Chain color: '+S.chainColor+(S.stainlessChain?'\nStainless chain finish: '+S.stainlessFinish+' (+$15)':'')):'';
  const chainLenInfo=S.ctrl==='ccl'&&S.h?'Calculated chain length: ~'+chainLen(S.h)+'″':'';
  const motorAccs=[];
  if(S.charger10) motorAccs.push('10ft USB charger (+$45)');
  if(S.charger16) motorAccs.push('16ft USB charger (+$45)');
  if(S.remote1) motorAccs.push('Single remote (+$85)');
  if(S.remote15) motorAccs.push('15-ch remote (+$120)');
  if(S.smartHub) motorAccs.push('Smart Connector Hub DD7006 (+$350)');
  if(S.solarPanel) motorAccs.push('Solar panel charger');
  const multiInfo=S.headrail==='single'?'Single shade':S.headrail+' headrail\nSub-shade widths: '+document.getElementById('f-sub-widths').value;

  const lines=[
    'WALLACE 3D DUAL SHEER SHADES — QUOTE REQUEST',
    '(Sheer 3D Horizontals / Commerce Window Fashions)',
    '',
    'PRODUCT SPECIFICATIONS:',
    'Product: Wallace 3D Dual Sheer Shades / Sheer 3D Horizontals',
    'Collection: '+(coll?coll.name:'—'),
    'Price Group: '+(coll?'Group '+coll.group:'—'),
    'Band size: '+(coll?coll.band:'—'),
    'Light control: '+(coll?coll.lc:'—'),
    'Color: '+(S.color?S.color.label+' ('+S.color.code+')':'—'),
    '',
    'DIMENSIONS:',
    'Mount type: '+(S.mount==='inside'?'Inside Mount':'Outside Mount'),
    'Ordered width: '+S.w+'″',
    'Ordered height: '+S.h+'″',
    'Finished shade height (vanes open): '+(S.h?S.h-0.5+'″':'—'),
    '',
    'HARDWARE:',
    'Cassette style: '+(S.cassette==='round'?'Round (3⅜″ D × 3″ H)':'Square (3½″ D × 3″ H)'),
    'Hardware color: '+(S.hwColor||'—'),
    'Fabric headrail insert: '+(S.fabInsert?'Yes (+$30)':'No'),
    'Bottom rail: '+S.rail+(S.deluxeInsert?' + fabric insert (+$40)':''),
    '',
    'CONTROL:',
    ctrl,
    chainInfo,
    chainLenInfo,
    S.ctrl==='motor'&&motorAccs.length?'Motor accessories:\n  '+motorAccs.join('\n  '):'',
    '',
    'HEADRAIL:',
    multiInfo,
    S.sideBySide?'Side-by-side vane alignment requested (¼″ tolerance, same height/color/style required)':'',
    '',
    'QUANTITY & DELIVERY:',
    'Quantity: '+qty+' shade'+(qty>1?'s':''),
    'Room/window: '+(document.getElementById('room-label').value.trim()||'—'),
    'Delivery: '+(S.del==='ship'?'Ship (UPS/FedEx from Huntingdon Valley PA)':'Will pick up'),
    '',
    'NOTES:',
    document.getElementById('f-notes').value.trim()||'None',
    '',
    'CUSTOMER:',
    'Name: '+name,
    'Phone: '+phone,
    'Email: '+(document.getElementById('f-email').value.trim()||'—'),
    '',
    'ESTIMATED PRICE (MSRP — confirmed at order):',
    (()=>{const pr=calcPrice();if(!pr)return 'Not calculated';
      return 'Base: $'+pr.base+' (Group '+(coll?coll.group:'?')+') + surcharges $'+(pr.per-pr.base)+' = $'+pr.per+'/shade | '+pr.qty+' shade'+(pr.qty>1?'s':'')+' total: ~$'+Math.round(pr.total).toLocaleString();
    })(),
  ].filter(l=>l!==null&&l!==undefined&&l!=='');

  window.location.href='mailto:justin@blindznation.com?subject='+encodeURIComponent('Wallace 3D Sheer Quote — '+name)+'&body='+encodeURIComponent(lines.join('\n'));
  document.getElementById('success-box').style.display='block';
}

// Init defaults
document.getElementById('mc-inside').classList.add('sel');