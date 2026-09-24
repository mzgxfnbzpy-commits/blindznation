/* ── STATE ── */
const S = {
  type:'', collection:'', rodType:'', rodDia:'',
  single:'', finial:'', mount:'', bracketType:'',
  ring:'', ringStyle:'', accessories:[],
  finish:'', gloss:'', draw:'', trackSystem:'',
  motor:'', motorAccs:[], delivery:''
};

/* ── DATA ── */
const COLLECTIONS = {
  decorative: [
    {id:'ironart', name:'Iron Art', sub:'Wrought iron rods · 40+ finishes · Full finial catalog', swatch:'#2a2a2a'},
    {id:'italian', name:'Italian', sub:'Brushed Nickel, Polished Chrome, Rose Gold · Modern profiles', swatch:'#c8c8c8'},
    {id:'woodart', name:'Wood Art', sub:'1⅜"–3" poles · 11 wood finishes · Smooth, fluted, decorative', swatch:'#8a5228'},
    {id:'bohemia', name:'Bohemia Crystal', sub:'Crystal finials 763–792 · Iron Art rods · Accent pieces', swatch:'#7ec8e3'},
    {id:'tropical', name:'Tropical', sub:'Faux bamboo · 6 finishes · Available while supplies last', limited:true, swatch:'#8b7355'},
    {id:'village', name:'Village Forge', sub:'Heavy traditional finials 600–608 · Iron Art rods', swatch:'#4a3728'},
  ],
  traverse: [
    {id:'ironart', name:'Iron Art Traverse', sub:'1½"–3" rods · Single or double · Miter available', swatch:'#2a2a2a'},
    {id:'italian', name:'Italian Traverse', sub:'Modern profiles · Single or double', swatch:'#c8c8c8'},
    {id:'woodart', name:'Wood Art Traverse', sub:'2"–3" poles · Single or double · Smooth and fluted', swatch:'#8a5228'},
  ],
  motorized: [
    {id:'ironart', name:'Iron Art Motorized', sub:'Somfy Glydea or Irismo · Single or double · Rings optional', swatch:'#2a2a2a'},
    {id:'italian', name:'Italian Motorized', sub:'Somfy powered · Modern track', swatch:'#c8c8c8'},
    {id:'woodart', name:'Wood Art Motorized', sub:'Somfy powered · Wood fascia', swatch:'#8a5228'},
  ],
  '3d': [
    {id:'3dia', name:'3D — Iron Art', sub:'3D-SIA Single · 3D-DIA Double · 1" round hollow only', swatch:'#2a2a2a'},
    {id:'3dit', name:'3D — Italian', sub:'3D-SIT Single · 3D-DIT Double · No Polished Chrome', swatch:'#c8c8c8'},
    {id:'3dpanel', name:'3D Panel Kit', sub:'3D-PIA / 3D-PIT · Front panel extensions up to 24" each side', swatch:'#555'},
  ],
  cornice:[{id:'cornice', name:'Cornice / Crown / Scroll', sub:'Decorative top treatment · Custom sizing and finish · Quote required', swatch:'#c8a870'}],
  tieback:[
    {id:'tieback-exp', name:'Expandable Post', sub:'Item 1088 · Expands 3"–4½" · Specify finish', swatch:'#888'},
    {id:'tieback-fix', name:'Fixed Post', sub:'Item 1088FX · 3", 4", or 6½" projection · Specify finish', swatch:'#666'},
    {id:'tieback-u',   name:'U-Shape Bend', sub:'Curved arm tieback · Specify projection and finish', swatch:'#444'},
  ]
};

const ROD_TYPES = {
  ironart:[
    {id:'round-hollow',          name:'Round Hollow',          dias:['½"','⅝"','¾"','1"','1¼"','1½"','2"','3"']},
    {id:'round-hollow-hammered', name:'Round Hollow Hammered',  dias:['½"','⅝"','¾"','1"','1¼"','1½"','2"','3"']},
    {id:'round-solid',           name:'Round Solid',            dias:['½"','⅝"','¾"','1"','1¼"','1½"']},
    {id:'round-solid-hammered',  name:'Round Solid Hammered',   dias:['½"','⅝"','¾"','1"','1¼"','1½"']},
    {id:'twist-hollow',          name:'Twist Hollow',           dias:['½"','⅝"','¾"','1"','1¼"','1½"']},
    {id:'twist-hollow-hammered', name:'Twist Hollow Hammered',  dias:['½"','⅝"','¾"','1"','1¼"','1½"']},
    {id:'square-hollow',         name:'Square Hollow',          dias:['½"','⅝"','¾"','1"','1¼"','1½"']},
    {id:'square-hollow-hammered',name:'Square Hollow Hammered', dias:['½"','⅝"','¾"','1"','1¼"','1½"']},
    {id:'rope-rod',              name:'Rope Rod',               dias:['⅝"','¾"','1"']},
    {id:'wood-grain',            name:'Wood Grain Solid Rod',   dias:['1"','1¼"','1½"']},
    {id:'fluted-iron',           name:'Fluted Iron Rod',        dias:['1¼"'], note:'Available in 1¼" only'},
  ],
  italian:[
    {id:'it-round-75',  name:'Round 7019 (¾")',   dias:['¾"']},
    {id:'it-round-1',   name:'Round 7020 (1")',    dias:['1"']},
    {id:'it-round-125', name:'Round 7023 (1¼")',   dias:['1¼"']},
    {id:'it-square-75', name:'Square 7021 (¾")',   dias:['¾"']},
    {id:'it-square-1',  name:'Square 7022 (1")',   dias:['1"']},
    {id:'it-square-125',name:'Square 7024 (1¼")',  dias:['1¼"']},
  ],
  woodart:[
    {id:'wood-smooth',  name:'Smooth Pole',  dias:['1⅜"','2"','2¼"','3"']},
    {id:'wood-fluted',  name:'Fluted Pole',  dias:['1⅜"','2"','2¼"','3"']},
    {id:'wood-decorative',name:'Decorative Profile', dias:['1⅜"','2"','2¼"']},
  ],
  tropical:[
    {id:'9020',  name:'9020 Straight',    dias:['¾"','1"','1¼"','1½"','2"'], note:'Available while supplies last'},
    {id:'9020BT',name:'9020BT Bent',      dias:['¾"','1"','1¼"','1½"','2"'], note:'Available while supplies last'},
    {id:'9022',  name:'9022 Decorative',  dias:['¾"','1"','1¼"','1½"','2"'], note:'Available while supplies last'},
  ],
  bohemia: [{id:'ironart', name:'Iron Art rod (with Bohemia Crystal finial)', dias:['½"','⅝"','¾"','1"','1¼"','1½"','2"','3"']}],
  village: [{id:'ironart', name:'Iron Art rod (with Village Forge finial)',    dias:['½"','⅝"','¾"','1"','1¼"','1½"','2"','3"']}],
  '3dia':  [{id:'3d-1-smooth', name:'1" Round Hollow Smooth (bypass OK)',    dias:['1"']},
            {id:'3d-1-hammer', name:'1" Round Hollow Hammered (no bypass)',   dias:['1"']}],
  '3dit':  [{id:'3d-1-smooth', name:'1" Round Hollow Smooth (bypass OK)',    dias:['1"']},
            {id:'3d-1-hammer', name:'1" Round Hollow Hammered (no bypass)',   dias:['1"']}],
  '3dpanel':[{id:'1-smooth-only', name:'1" Smooth Round Hollow only (required)', dias:['1"']}],
};

const FINIALS = {
  ironart: {
    'Iron Art Classic': '400–422 range (400, 401, 402, 403, 404, 405, 406, 407, 408, 409, 411, 412, 413, 414, 415, 417, 418, 419, 420, 421, 422)',
    'Iron Art Decorative': '501–513 range (501, 502, 503, 505, 506, 507, 508, 509, 510, 511, 512, 513)',
    'Iron Art Specialty': '707, 711, 900S/M, 901–916, 921, 927, 929, 929MV, 933–956, 966, 971, 973, 975, 976, 979, 982–992',
    'New Iron Finials': '550–559, 9704, 9705, 9705L, 9706, 9706L',
    'Endcap / Socket': 'Open end / rod socket (no decorative finial)',
  },
  village: {
    'Village Forge': '600, 601, 602S, 602L, 603, 604, 605, 606, 607, 608',
  },
  bohemia: {
    'Bohemia Crystal': '763–792 (763, 764, 765, 766, 767, 768, 769, 770, 771, 772, 773, 774, 775, 776, 777, 778, 779, 780, 781, 782, 783, 784, 785, 786, 787, 788, 789, 790, 791, 792)',
  },
  italian: {
    'Italian Finials': '7001, 7002, 7003, 7004, 7005, 7005L, 7006, 7006L, 7070, 7070L, 7071, 7071L',
    'Endcap / Socket': 'Open end / rod socket',
  },
  woodart: {
    'Wood Craft (limited)': '5060–5067, 5080–5088',
    'New York Wood (limited)': '5020–5038, 5040–5043',
    'Rosina Resin (limited)': '6002, 6003, 6004, 6006, 6007, 6009, 6010, 6011, 6013, 6017, 6019, 6020, 6022',
    'Endcap / Socket': 'Open end / rod socket',
  },
  '3dia':  {'Iron Art Classic':'400–422 range','Iron Art Decorative':'501–513 range','Iron Art Specialty':'900s, 933–992'},
  '3dit':  {'Italian Finials':'7001–7006L, 7070–7071L (no Polished Chrome)'},
  '3dpanel':{'Iron Art or Italian':'Same as 3D Single/Double kit finials'},
  tropical:{'No decorative finial':'Tropical rods do not use a standard finial socket — note in quote'},
  cornice:{'Custom':  'Custom cornice, crown, or scroll — describe in notes'},
  tieback: {'Tieback Medallion or Arm': 'Specify style in notes (expandable, fixed, or U-shape)'},
};

const FINISHES = {
  ironart:{
    'Group A — Standard':[
      {id:'09',name:'Light Brown'},{id:'14',name:'Black'},{id:'19',name:'Brown'}
    ],
    'Group B — Standard':[
      {id:'01',name:'Old Black'},{id:'02',name:'Antique Bronze'},{id:'03',name:'Naturelle'},
      {id:'04',name:'Rusty'},{id:'06',name:'Antique Gold'},{id:'07',name:'Rich Gold'},
      {id:'10',name:'Antique Copper'},{id:'12',name:'New Nickel'},{id:'13',name:'Soft Pewter'},
      {id:'15',name:'Bronze Vecchio'},{id:'17',name:'Burnt Silver'},{id:'20',name:'Antique White'},
      {id:'32',name:'Ivory'},{id:'33',name:'Pure White'},{id:'34',name:'Oil Rubbed Bronze'},
      {id:'35',name:'Metal Ore'}
    ],
    'Group C — Premium':[
      {id:'11',name:'Versace'},{id:'16',name:'Gold Antique White'},{id:'18',name:'Renaissance Silver'},
      {id:'24',name:'Sage Gold'},{id:'25',name:'Burnt Gold'},{id:'26',name:'Bronze Patina'},
      {id:'27',name:'Cherry Gold'},{id:'28',name:'Vecchio Patina'},{id:'29',name:'Golden Oak'}
    ],
    'Group D — Specialty':[
      {id:'05',name:'Autumn'},{id:'08',name:'Imposter'},{id:'21',name:'Crackle'},
      {id:'22',name:'Antique Crackle'},{id:'23',name:'Mocha Mix'},{id:'30',name:'Warm Cherry'},
      {id:'31',name:'Sugar Maple'}
    ]
  },
  italian:{
    'Italian Finishes':[
      {id:'IT201',name:'Brushed Nickel'},{id:'IT202',name:'Black Nickel'},{id:'IT203',name:'Oiled Bronze'},
      {id:'IT204',name:'Satin Copper'},{id:'IT205',name:'Satin Gold'},{id:'IT206',name:'Polished Chrome'},
      {id:'IT207',name:'Polished Nickel'},{id:'IT208',name:'Black Chrome'},{id:'IT209',name:'Polished Brass'},
      {id:'IT210',name:'Satin Brass'},{id:'IT211',name:'Antique Brass'},{id:'IT212',name:'Polished Rose Gold'},
      {id:'IT213',name:'Satin Rose Gold'}
    ]
  },
  woodart:{
    'Wood Art Finishes':[
      {id:'WC101',name:'Light Cherry'},{id:'WC102',name:'Natural'},{id:'WC103',name:'Mahogany'},
      {id:'WC104',name:'White Wash'},{id:'WC105',name:'Dusk Black'},{id:'WC106',name:'Walnut'},
      {id:'WC107',name:'White Distress'},{id:'WC108',name:'Aged Pewter'},{id:'WC109',name:'Imitation Gold Leaf'},
      {id:'WC110',name:'Golden Teak'},{id:'WC111',name:'Sun Oak'}
    ]
  },
  tropical:{
    'Tropical Finishes':[
      {id:'TC201',name:'Yellow Tiger'},{id:'TC202',name:'Black Timor'},{id:'TC203',name:'Natural Brown'},
      {id:'TC204',name:'Red Bambusa'},{id:'TC205',name:'Green Cane'},{id:'TC206',name:'Rustic Bamboo'}
    ]
  }
};

const FINISH_SWATCHES = {
  '09':'#8B6914','14':'#111','19':'#5a3a1a','01':'#1a1208','02':'#6b4226','03':'#c8b98a',
  '04':'#8B3A1A','06':'#b8963e','07':'#d4a017','10':'#b87333','12':'#c8c8c8','13':'#888888',
  '15':'#5a3e28','17':'#8a8a9a','20':'#f5f0e8','32':'#f5e8c8','33':'#fafaf8','34':'#2a1a0a',
  '35':'#5a5a5a','11':'#c0a030','16':'#d4c08a','18':'#c0c0b0',
  '05':'#c8a870','08':'#7a6858','21':'#b8b0a0','22':'#a8a090','23':'#8a6848','24':'#b0a040',
  '25':'#c89020','26':'#7a5830','27':'#c07820','28':'#987048','29':'#c8a040','30':'#8a4030','31':'#c8b080',
  'IT201':'#b8b8b8','IT202':'#2a2a2a','IT203':'#5a3a18','IT204':'#b87840','IT205':'#c8a820',
  'IT206':'#e8e8f0','IT207':'#d8d8e0','IT208':'#181818','IT209':'#c8a820','IT210':'#b89830',
  'IT211':'#a08030','IT212':'#e8a0b0','IT213':'#c89090',
  'WC101':'#c87040','WC102':'#d4a870','WC103':'#6a1808','WC104':'#e8e0d0','WC105':'#1a1a1a',
  'WC106':'#4a3018','WC107':'#f0ece0','WC108':'#7a7888','WC109':'#c8a820','WC110':'#b07830','WC111':'#b89050',
  'TC201':'#d4b820','TC202':'#1a0808','TC203':'#7a5830','TC204':'#9a1808','TC205':'#3a6020','TC206':'#5a4020'
};

/* ── HELPERS ── */
function $(id){return document.getElementById(id);}
function show(id){var e=$(id);if(e)e.style.display='';}
function hide(id){var e=$(id);if(e)e.style.display='none';}
// Single-select pill inside its .opt-row
function togglePill(el){
  var row=el.closest('.opt-row');
  if(row) row.querySelectorAll('.opt-btn').forEach(p=>p.classList.remove('sel'));
  el.classList.add('sel');
  updateSummary();
}
// Multi-select pill (controls, batons, accessories)
function toggleMotorAcc(el, key){
  el.classList.toggle('sel');
  var idx=S.motorAccs.indexOf(key);
  if(idx>=0) S.motorAccs.splice(idx,1); else S.motorAccs.push(key);
  updateSummary();
}
function esc(s){return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');}

const TYPE_LABELS={decorative:'Decorative Rod',traverse:'Traversing System',motorized:'Motorized Traversing','3d':'3D Hardware',cornice:'Cornice/Crown/Scroll',tieback:'Tieback/Swing Arm'};
const TYPE_DESC={
  decorative:'<strong>Decorative rod</strong> — stationary; panels hang from rings that slide manually. Iron Art, Italian, Wood, Crystal, Tropical.',
  traverse:'<strong>Traversing system</strong> — drapery opens and closes on a track. Single or double. Up to 30ft. Center, left, or right stack.',
  motorized:'<strong>Motorized traversing</strong> — Somfy-powered. Glydea 60e (132 lb), Glydea 35e (77 lb), Irismo 35 Mini DC, or Irismo 45 WireFree.',
  '3d':'<strong>3D hardware</strong> — finials sit in front of the rod. Adjustable position. Iron Art or Italian finishes. 1" round hollow rod only.',
  cornice:'<strong>Cornice / crown / scroll</strong> — decorative top treatment mounted above the window. Custom sizing and finish.',
  tieback:'<strong>Tieback / swing arm</strong> — expandable post projection, fixed post projection, or U-shape bend. Must specify style.'
};
function isTrav(){return S.type==='traverse'||S.type==='motorized';}
function noRodType(){return S.type==='cornice'||S.type==='tieback';}

/* ── STEP NUMBERING — visible steps run 1..N with no gaps ── */
function renumberSteps(){
  var n=0;
  document.querySelectorAll('#cfg-steps > .step-block').forEach(function(b){
    if(b.style.display==='none') return;
    n++; var s=b.querySelector('.step-num'); if(s) s.textContent=n;
  });
}
function refreshVisibility(){
  var hideRod=noRodType();
  ['step-rod','step-finial','step-mount','step-rings','step-finish'].forEach(function(id){ var e=$(id); if(e) e.style.display=hideRod?'none':''; });
  $('step-trav').style.display=isTrav()?'':'none';
  $('step-motor').style.display=S.type==='motorized'?'':'none';
  // Inside-mount socket is stationary only
  var ins=$('mnt-inside');
  if(ins){ ins.style.display=isTrav()?'none':''; if(isTrav()&&S.mount==='inside'){ S.mount=''; ins.classList.remove('sel'); } }
  renumberSteps();
}

/* ── STEP 2: HARDWARE TYPE ── */
function pickType(t, el){
  S.type=t; S.collection=''; S.rodType=''; S.rodTypeName=''; S.rodDia=''; S.finial=''; S.finish='';
  document.querySelectorAll('#grp-type .opt-btn').forEach(c=>c.classList.remove('sel'));
  if(el) el.classList.add('sel');
  // Traverse / motor answers only apply to those types — clear them when they are hidden.
  if(!isTrav()){ S.draw=''; S.trackSystem=''; document.querySelectorAll('#draw-row .opt-btn, #track-row .opt-btn').forEach(b=>b.classList.remove('sel')); }
  if(S.type!=='motorized'){ S.motor=''; document.querySelectorAll('#motor-row .opt-btn').forEach(b=>b.classList.remove('sel')); }
  $('type-note').innerHTML=TYPE_DESC[t]||'';
  buildCollGrid(); buildRodStep(); buildFinialStep(); buildFinishStep(); updateRingAvail();
  refreshVisibility();
  updateSummary();
}

/* ── STEP 3: COLLECTION ── */
function buildCollGrid(){
  var grid=$('coll-grid'); grid.innerHTML='';
  var note=$('s2-note'); var cnote=$('coll-note');
  cnote.innerHTML='';
  if(!S.type){ note.style.display='none'; grid.innerHTML='<div class="placeholder-note">Choose a hardware type above to see its collections.</div>'; return; }
  if(noRodType()){
    note.style.display='block';
    note.innerHTML='<strong>'+({cornice:'Cornice / Crown / Scroll',tieback:'Tieback / Swing Arm'}[S.type])+'</strong> — all custom quote. Describe your requirements in the notes field in Your details.';
  } else note.style.display='none';
  (COLLECTIONS[S.type]||[]).forEach(function(c){
    var b=document.createElement('button');
    b.className='opt-btn'+(S.collection===c.id?' sel':'');
    b.innerHTML=esc(c.name)+(c.limited?' <span class="pill-hint">limited</span>':'');
    b.onclick=function(){
      grid.querySelectorAll('.opt-btn').forEach(x=>x.classList.remove('sel'));
      b.classList.add('sel');
      S.collection=c.id; S.rodType=''; S.rodTypeName=''; S.rodDia=''; S.finial=''; S.finish='';
      cnote.textContent=c.sub;
      buildRodStep(); buildFinialStep(); buildFinishStep(); updateRingAvail();
      updateSummary();
    };
    grid.appendChild(b);
  });
}
function collName(){
  var c=(COLLECTIONS[S.type]||[]).find(x=>x.id===S.collection);
  return c?c.name:(S.collection||'');
}

/* ── STEP 4: ROD ── */
function buildRodStep(){
  var el=$('s3-content'); el.innerHTML='';
  $('warn-3d-rod').style.display=S.type==='3d'?'block':'none';
  $('warn-fluted').style.display='none';
  if(!S.collection){ el.innerHTML='<div class="placeholder-note">Choose a collection above to see its rod profiles and diameters.</div>'; return; }
  var rods=ROD_TYPES[S.collection]||ROD_TYPES['ironart'];
  el.innerHTML='<div class="sub-label">Rod / pole type</div>';
  var typeRow=document.createElement('div'); typeRow.className='opt-row'; typeRow.id='rod-type-row';
  rods.forEach(function(r){
    var p=document.createElement('button'); p.className='opt-btn wrap';
    p.textContent=r.name+(r.note?' ('+r.note+')':'');
    p.onclick=function(){
      typeRow.querySelectorAll('.opt-btn').forEach(x=>x.classList.remove('sel'));
      p.classList.add('sel');
      S.rodType=r.id; S.rodTypeName=r.name; S.rodDia='';
      $('warn-fluted').style.display=(r.id==='fluted-iron')?'block':'none';
      buildDiaOptions(r.dias);
      updateRingAvail();
      updateSummary();
    };
    typeRow.appendChild(p);
  });
  el.appendChild(typeRow);
  var diaSection=document.createElement('div'); diaSection.id='dia-section';
  diaSection.innerHTML='<div class="placeholder-note">Pick a rod type to see its diameters.</div>';
  el.appendChild(diaSection);
}
function buildDiaOptions(dias){
  var sec=$('dia-section'); if(!sec) return;
  sec.innerHTML='<div class="sub-label">Diameter</div><div class="opt-row" id="dia-row"></div>';
  var row=$('dia-row');
  dias.forEach(function(d){
    var p=document.createElement('button'); p.className='opt-btn';
    p.textContent=d;
    p.onclick=function(){
      row.querySelectorAll('.opt-btn').forEach(x=>x.classList.remove('sel'));
      p.classList.add('sel');
      S.rodDia=d;
      updateSummary();
    };
    row.appendChild(p);
  });
}

/* ── STEP 5: FINIALS ── */
function selectFinialPill(el, val){
  document.querySelectorAll('#s4-content .opt-btn').forEach(x=>x.classList.remove('sel'));
  el.classList.add('sel');
  S.finial=val;
  updateSummary();
}
function buildFinialStep(){
  var el=$('s4-content'); el.innerHTML='';
  $('warn-3d-finial').style.display=S.type==='3d'?'block':'none';
  if(!S.collection){ el.innerHTML='<div class="placeholder-note">Choose a collection above to see its finials.</div>'; return; }
  var groups=FINIALS[S.collection]||FINIALS['ironart'];
  Object.entries(groups).forEach(function([grpName, ids]){
    var lab=document.createElement('div'); lab.className='sub-label'; lab.textContent=grpName;
    var row=document.createElement('div'); row.className='opt-row';
    var p=document.createElement('button'); p.className='opt-btn wrap';
    p.textContent=ids;
    p.onclick=function(){ selectFinialPill(p, grpName+': '+ids); };
    row.appendChild(p);
    el.appendChild(lab); el.appendChild(row);
  });
  var lab=document.createElement('div'); lab.className='sub-label'; lab.textContent='No finial';
  var row=document.createElement('div'); row.className='opt-row';
  var ec=document.createElement('button'); ec.className='opt-btn'; ec.textContent='Endcap / socket only (no finial)';
  ec.onclick=function(){ selectFinialPill(ec,'Endcap/Socket only'); };
  row.appendChild(ec); el.appendChild(lab); el.appendChild(row);
}

/* ── STEP 9: RINGS ── */
function pickRing(r, el){
  S.ring=r;
  togglePill(el);
  $('warn-bypass').style.display=(r==='330C'||r==='7330C')?'block':'none';
}
function updateRingAvail(){
  var isHammered=S.rodType&&(S.rodType.includes('hammered')||S.rodType.includes('hammer'));
  var isRoundHollow=S.rodType&&(S.rodType.includes('round-hollow')||S.rodType.includes('1-smooth')||S.rodType==='ironart');
  var bypassOK=!!(!isHammered&&isRoundHollow);
  ['ring-330c','ring-7330c'].forEach(function(id){ var b=$(id); if(b){ b.style.display=bypassOK?'':'none'; if(!bypassOK) b.classList.remove('sel'); } });
  if(!bypassOK&&(S.ring==='330C'||S.ring==='7330C')) S.ring='';
  $('warn-bypass').style.display=(S.ring==='330C'||S.ring==='7330C')?'block':'none';
  $('warn-chrome-3d').style.display=(S.type==='3d'&&S.collection==='3dit')?'block':'none';
}

/* ── STEP 10: FINISH ── */
function buildFinishStep(){
  var el=$('s7-content'); el.innerHTML='';
  if(!S.collection){ el.innerHTML='<div class="placeholder-note">Choose a collection above to see its finishes.</div>'; return; }
  var collMap={'ironart':'ironart','village':'ironart','bohemia':'ironart','tropical':'tropical','3dia':'ironart','3dit':'italian','3dpanel':'ironart','italian':'italian','woodart':'woodart'};
  var finKey=collMap[S.collection]||'ironart';
  var groups=FINISHES[finKey]||FINISHES['ironart'];
  Object.entries(groups).forEach(function([grpName, fins]){
    var grpDiv=document.createElement('div'); grpDiv.className='finish-group';
    grpDiv.innerHTML=`<div class="finish-group-label">${grpName}</div>`;
    var grid=document.createElement('div'); grid.className='finish-grid';
    fins.forEach(function(f){
      var card=document.createElement('div'); card.className='finish-card';
      var sw=FINISH_SWATCHES[f.id]||'#ccc';
      var is3dItalianChrome=(S.type==='3d'&&S.collection==='3dit'&&f.id==='IT206');
      if(is3dItalianChrome){ card.classList.add('disabled'); card.style.opacity='.35'; card.style.pointerEvents='none'; }
      card.innerHTML=`<div class="finish-swatch" style="background:${sw}"></div><div class="finish-name">${f.id} — ${f.name}</div>`;
      card.onclick=function(){
        document.querySelectorAll('.finish-card').forEach(x=>x.classList.remove('sel'));
        card.classList.add('sel');
        S.finish=f.id+' — '+f.name;
        updateSummary();
      };
      grid.appendChild(card);
    });
    grpDiv.appendChild(grid);
    el.appendChild(grpDiv);
  });
}
function pickGloss(g, el){
  ['pill-standard','pill-semi','pill-high','pill-custom-finish'].forEach(function(id){ var e=$(id); if(e) e.classList.remove('sel'); });
  el.classList.add('sel');
  S.gloss=g;
  updateSummary();
}

/* ── SUMMARY CARD ── */
function updateSummary(){
  var sum=$('quote-summary'); if(!sum) return;
  var len=($('m-length')||{value:''}).value;
  var qty=($('m-qty')||{value:'1'}).value||'1';
  var mountLbl={wall:'Wall mount',ceiling:'Ceiling mount',inside:'Inside mount socket'}[S.mount]||'—';
  var rows=[
    ['Product','Orion decorative hardware'],
    ['Size', len?len+'" wide':'—'],
    ['Mount', mountLbl],
    ['Qty', qty],
    ['Hardware type', TYPE_LABELS[S.type]||'—'],
    ['Collection', S.collection?collName():'—'],
    ['Rod type', S.rodTypeName||S.rodType||''],
    ['Diameter', S.rodDia||''],
    ['Finial', S.finial?S.finial.split(':')[0]:''],
    ['Bracket', S.bracketType||''],
    ['Projection', S.projection?S.projection+'"':''],
    ['System', S.single||''],
    ['Draw', isTrav()?S.draw:''],
    ['Track', isTrav()?S.trackSystem:''],
    ['Motor', S.type==='motorized'?S.motor:''],
    ['Ring', S.ring||''],
    ['Finish', S.finish||''],
    ['Gloss', S.gloss||'Standard'],
  ].filter(r=>r[1]);
  sum.innerHTML=rows.map(r=>`<div class="summary-row"><span class="sr-key">${r[0]}</span><span class="sr-val">${esc(r[1])}</span></div>`).join('')+
    '<div class="summary-row" style="border-top:0.5px solid rgba(255,255,255,.2);margin-top:6px;padding-top:10px"><span class="sr-key">Price</span><span class="sr-val">Custom quote — we confirm pricing</span></div>';
}
// Kept for any legacy caller.
function buildSummary(){ updateSummary(); }

/* ── SUBMIT ── */
function addOrionToCart(){
  if(!S.type){ alert('Please select a hardware type before adding to cart.'); return; }

  var typeLabel2=TYPE_LABELS[S.type]||S.type;
  var length=($('m-length')||{value:''}).value;
  var qty=($('m-qty')||{value:'1'}).value;

  var lines=[
    {label:'Product',value:'Orion Drapery Hardware'},
    {label:'Hardware Type',value:typeLabel2},
    {label:'Collection',value:S.collection||'—'},
    {label:'Diameter',value:S.rodDia||'N/A'},
    {label:'Finish',value:S.finish||'—'},
    {label:'Finial',value:S.finial||'N/A'},
    {label:'Mount',value:S.mount||'—'},
    {label:'Rod/Track Length',value:length?length+'"':'—'},
    {label:'Quantity',value:String(qty)},
    {label:'Draw',value:S.draw||'N/A'},
    {label:'Motor',value:S.motor||'N/A'}
  ];
  var specs=lines.map(function(l){return l.label+': '+l.value;}).join(' | ');
  pbAddToCart({product:'Orion Drapery Hardware',lines:lines,specs:specs,price:null,qty:parseInt(qty)||1});
  pbOpenCart();
}

function submitQuote(){
  var name=$('cf-name').value.trim(), contact=$('cf-phone').value.trim(), email=$('cf-email').value.trim();
  if(!name||!contact){alert('Please enter your name and contact info.');return;}

  var typeLabel=TYPE_LABELS[S.type]||S.type;
  var trav=isTrav();

  var bodyLines=[
    '=== ORION HARDWARE QUOTE REQUEST ===',
    '',
    'CONTACT',
    'Name: '+name,
    'Phone: '+contact,
    'Email: '+(email||'Not provided'),
    'Location: '+($('cf-address').value||'Not provided'),
    '',
    'CONFIGURATION',
    'Hardware Type: '+typeLabel,
    'Collection: '+S.collection,
    'Rod Type: '+(S.rodTypeName||S.rodType||'N/A'),
    'Diameter: '+(S.rodDia||'N/A'),
    'Finial: '+(S.finial||'N/A'),
    'Mount: '+(S.mount||'N/A'),
    'Bracket: '+(S.bracketType||'N/A'),
    'Projection: '+(S.projection?S.projection+'"':'N/A'),
    'System: '+(S.single||'N/A'),
    'Ring: '+(S.ring||'N/A'),
    'Accessories: '+(S.motorAccs.length?S.motorAccs.join(', '):'None'),
    'Finish: '+(S.finish||'N/A'),
    'Gloss: '+(S.gloss||'Standard'),
    '',
    trav?'TRAVERSING\nDraw Direction: '+(S.draw||'N/A')+'\nTrack System: '+(S.trackSystem||'N/A'):'',
    S.type==='motorized'?'MOTORIZATION\nMotor: '+(S.motor||'N/A')+'\nMotor Controls/Accessories: '+(S.motorAccs.join(', ')||'None'):'',
    '',
    'MEASUREMENTS',
    'Rod/Track Length: '+($('m-length').value||'N/A')+'"',
    'Projection/Return: '+($('m-return').value||'N/A')+'"',
    'Quantity: '+($('m-qty').value||'1'),
    '',
    'PRICING NOTE: Orion — Request Quote Only (catalog pricing to be confirmed)',
    '',
    'DELIVERY/SERVICE',
    'Preference: '+(window.pbDelivery==='install'?'Professional Installation':'Ship to Customer'),
    '',
    'NOTES',
    $('cf-notes').value||'None',
    '',
    '--- Sent from blindznation.com/pages/orion-rods.html ---'
  ].filter(l=>l!==undefined&&l!==null).join('\n');

  var subj='Orion Hardware Quote — '+typeLabel+' — '+S.collection+' — '+name;
  window.location.href='mailto:justin@blindznation.com?subject='+encodeURIComponent('Blindznation — ' + subj)+'&body='+encodeURIComponent('BLINDZNATION\n\n' + bodyLines);

  $('config-main').style.display='none';
  $('success-box').style.display='block';
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ── INIT (called after the shared delivery/contact steps are rendered) ── */
function initOrion(){
  buildCollGrid(); buildRodStep(); buildFinialStep(); buildFinishStep(); updateRingAvail();
  refreshVisibility();
  updateSummary();
}
