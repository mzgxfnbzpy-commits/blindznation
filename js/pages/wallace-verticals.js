renderNav('Shades & blinds');
renderFooter(false);

// ═══════════════════════════════════════════════════════════
// WALLACE VERTICAL BLINDS — DATA
// Source: Wallace - Verticals.pdf (March 1, 2026)
// Types: 'pvc' = PVC only | 'fh' = fabric free-hang only | 'fhcp' = FH or channel panel
// ═══════════════════════════════════════════════════════════
const PATTERNS = [
  {name:'Allure',           type:'pvc',  pg:3},
  {name:'Allwood',          type:'pvc',  pg:3},
  {name:'Altima',           type:'pvc',  pg:3},
  {name:'Beckley',          type:'pvc',  pg:4},
  {name:'Berks',            type:'fhcp', pg:6, notes:'5% Openness solar'},
  {name:'Cadiz',            type:'pvc',  pg:3},
  {name:'Cambria',          type:'fhcp', pg:4},
  {name:'Channel Panel 3.5"',type:'pvc', pg:4, notes:'Channel panel track pattern'},
  {name:'Chester',          type:'fhcp', pg:7, notes:'5% Openness solar'},
  {name:'Corly',            type:'pvc',  pg:2},
  {name:'Emerson',          type:'pvc',  pg:4},
  {name:'Franklin',         type:'fhcp', pg:4},
  {name:'Fresno',           type:'pvc',  pg:4},
  {name:'Hampton',          type:'pvc',  pg:4},
  {name:'Hampton S',        type:'pvc',  pg:5},
  {name:'Lancaster',        type:'fhcp', pg:4},
  {name:'Lehigh',           type:'fhcp', pg:3},
  {name:'Leno',             type:'pvc',  pg:4},
  {name:'Maestro',          type:'pvc',  pg:0},
  {name:'Mayfair',          type:'pvc',  pg:1},
  {name:'Montgomery',       type:'fhcp', pg:7, notes:'5% Openness solar'},
  {name:'Ovation',          type:'pvc',  pg:1},
  {name:'Penland',          type:'pvc',  pg:2},
  {name:'Perforated',       type:'pvc',  pg:4},
  {name:'Pinnacle',         type:'pvc',  pg:2},
  {name:'Ridgeway II',      type:'pvc',  pg:1},
  {name:'Rustic Wood',      type:'pvc',  pg:3},
  {name:'Shannon',          type:'pvc',  pg:4},
  {name:'Standard II',      type:'pvc',  pg:0},
  {name:'Trends Solid',     type:'pvc',  pg:4},
  {name:'Trends Stain',     type:'pvc',  pg:4},
  {name:'Tropics',          type:'pvc',  pg:4},
  {name:'Vogue',            type:'pvc',  pg:4},
  {name:'Waterford',        type:'pvc',  pg:4},
  {name:'Waterford S',      type:'pvc',  pg:5},
  {name:'Westmorland',      type:'fhcp', pg:5}
];

// ── STATE ──────────────────────────────────────────────────────────────────
const S = {
  patternIdx:null, vaneType:null,
  w:0, h:0,
  mount:null, draw:null, stackSide:null, ctrlSide:null,
  centerStack:false, offCenter:false, oppositeStack:false,
  tiltChain:null, track:'regular', valance:'regular',
  autoWand:false, verticlips:false, hingedCorners:false, tHandles:false,
  qty:1, del:'ship'
};

// ── FILTER STATE ──────────────────────────────────────────────────────────
let _typeFilter='all', _pgFilter='all';

function setTypeFilter(t,btn){
  _typeFilter=t;
  document.querySelectorAll('#grp-type-filter .typef-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  buildPatternGrid();
}
function setPgFilter(pg,btn){
  _pgFilter=pg;
  document.querySelectorAll('#grp-pg-filter .pgf-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  buildPatternGrid();
}

// ── BUILD PATTERN GRID (grouped by price group) ───────────────────────────
function buildPatternGrid(){
  const g=document.getElementById('pattern-grid');
  // filter first
  const visible=PATTERNS.map((p,i)=>({...p,idx:i})).filter(p=>{
    if(_typeFilter!=='all'&&p.type!==_typeFilter)return false;
    if(_pgFilter!=='all'&&p.pg!==_pgFilter)return false;
    return true;
  });
  if(!visible.length){g.innerHTML='<div style="grid-column:1/-1;font-size:13px;color:#999;padding:12px 0">No patterns match the selected filters.</div>';return;}

  // group by pg
  const groups={};
  visible.forEach(p=>{
    if(!groups[p.pg])groups[p.pg]=[];
    groups[p.pg].push(p);
  });

  const pgLabel=pg=>pg===0?'Standard — Group 0':'Price Group '+pg;
  const typeCount=pg=>{
    const arr=groups[pg];
    const pvc=arr.filter(p=>p.type==='pvc').length;
    const fab=arr.filter(p=>p.type==='fhcp'||p.type==='fh').length;
    const parts=[];
    if(pvc)parts.push(pvc+' PVC');
    if(fab)parts.push(fab+' Fabric');
    return parts.join(' · ');
  };

  let html='';
  Object.keys(groups).sort((a,b)=>+a-+b).forEach(pg=>{
    html+=`<div class="pattern-grid-header">${pgLabel(+pg)}<span>${typeCount(+pg)}</span></div>`;
    groups[pg].forEach(p=>{
      const tb=p.type==='pvc'?'type-badge-pvc':p.type==='fh'?'type-badge-fh':'type-badge-fhcp';
      const tl=p.type==='pvc'?'PVC':p.type==='fh'?'Fabric':'Fabric';
      html+=`<div class="pattern-card" data-idx="${p.idx}" onclick="pickPattern(${p.idx})">
        <div class="pattern-name">${p.name}</div>
        <div class="pattern-meta"><span class="${tb}">${tl}</span>${p.notes?'<br><span style="color:#aaa;font-size:9px">'+p.notes+'</span>':''}</div>
      </div>`;
    });
  });
  g.innerHTML=html;
  // re-apply selected state
  if(S.patternIdx!==null){
    const sel=g.querySelector(`[data-idx="${S.patternIdx}"]`);
    if(sel)sel.classList.add('sel');
  }
}
buildPatternGrid();

// ── STEP UTILS ─────────────────────────────────────────────────────────────
function toggleStep(id){const el=document.getElementById(id);el.classList.add('active');setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),60);}
function openStep(id){const el=document.getElementById(id);el.classList.add('active');setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),80);}
function markDone(id){document.getElementById(id).classList.add('done');}

// ── STEP 1: PATTERN ────────────────────────────────────────────────────────
function pickPattern(idx){
  document.querySelectorAll('.pattern-card').forEach(c=>c.classList.remove('sel'));
  document.querySelectorAll('.pattern-card')[idx].classList.add('sel');
  S.patternIdx=idx;
  const p=PATTERNS[idx];
  document.getElementById('s1val').textContent=p.name+' (Group '+p.pg+')';
  markDone('step1');
  buildVaneTypeGrid(p);
  // Reset vane type on pattern change
  S.vaneType=null;
  document.getElementById('color-section').style.display='none';
  document.getElementById('s2val').textContent='—';
  document.getElementById('step2').classList.remove('done');
  updateSpec();
  openStep('step2');
}

function buildVaneTypeGrid(p){
  const g=document.getElementById('vane-type-grid');
  const note=document.getElementById('vane-type-note');
  if(p.type==='pvc'){
    g.innerHTML=`<div class="opt-card sel" onclick="pickVane(this,'pvc')"><div class="opt-card-title">PVC / Vinyl</div><div class="opt-card-desc">Standard vinyl vane</div></div>`;
    note.style.display='none';
    // Auto-select PVC
    S.vaneType='pvc';
    document.getElementById('color-section').style.display='block';
    document.getElementById('s2val').textContent='PVC / Vinyl';
    markDone('step2');
  } else if(p.type==='fh'){
    g.innerHTML=`<div class="opt-card sel" onclick="pickVane(this,'fh')"><div class="opt-card-title">Fabric Free-Hang</div><div class="opt-card-desc">Sewn-in weights included</div></div>`;
    note.style.display='block';
    note.textContent='This pattern is fabric free-hang only. Includes sewn-in weights.';
    S.vaneType='fh';
    document.getElementById('color-section').style.display='block';
    document.getElementById('s2val').textContent='Fabric Free-Hang';
    markDone('step2');
  } else {
    // fhcp
    g.innerHTML=`
      <div class="opt-card" onclick="pickVane(this,'fh')"><div class="opt-card-title">Fabric Free-Hang</div><div class="opt-card-desc">Vanes hang free · Sewn-in weights</div></div>
      <div class="opt-card" onclick="pickVane(this,'cp')"><div class="opt-card-title">Fabric in Channel Panel</div><div class="opt-card-desc">Fabric inserted into 3.5″ PVC channel · Surcharge applies</div></div>`;
    note.style.display='block';
    note.textContent='Choose: free-hang fabric vanes or insert fabric into 3.5″ channel panel (channel panel surcharge added at quote).';
    S.vaneType=null;
    document.getElementById('color-section').style.display='none';
  }
}

function pickVane(el,type){
  document.querySelectorAll('#vane-type-grid .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.vaneType=type;
  const labels={pvc:'PVC / Vinyl',fh:'Fabric Free-Hang',cp:'Fabric → Channel Panel'};
  document.getElementById('s2val').textContent=labels[type];
  markDone('step2');
  document.getElementById('color-section').style.display='block';
  const vnote=document.getElementById('vane-type-note');
  if(type==='cp'){vnote.style.display='block';vnote.textContent='Channel panel surcharge added at quote. Fabric inserted into 3.5″ PVC channel. Clearly labeled in your quote email.';}
  else if(type==='fh'){vnote.style.display='block';vnote.textContent='Fabric free-hang vanes include sewn-in weights.';}
  else vnote.style.display='none';
  updateSpec();
}

// ── STEP 3: DIMENSIONS ────────────────────────────────────────────────────
function calcDims(){
  const wW=parseFloat(document.getElementById('w-whole').value)||0;
  const wF=parseFloat(document.getElementById('w-frac').value)||0;
  const hW=parseFloat(document.getElementById('h-whole').value)||0;
  const hF=parseFloat(document.getElementById('h-frac').value)||0;
  S.w=+(wW+wF).toFixed(3); S.h=+(hW+hF).toFixed(3);

  const dimMsg=document.getElementById('dim-msg');
  const splitInfo=document.getElementById('split-info');
  const osWarn=document.getElementById('oversize-warn');
  const vaneStats=document.getElementById('vane-stats');
  dimMsg.style.display='none'; splitInfo.style.display='none'; osWarn.style.display='none'; vaneStats.style.display='none';

  if(!S.w||!S.h) return;

  if(S.w>240){dimMsg.className='msg-box msg-err';dimMsg.textContent='Maximum width is 240″. Please split into multiple openings.';dimMsg.style.display='block';return;}

  // Split logic: over 193" → 2 blinds
  if(S.w>193){
    const half=Math.ceil(S.w/2*4)/4; // round up to nearest 1/4"
    splitInfo.innerHTML='Width '+S.w+'″ exceeds 193″ max chart width. This will be priced as <strong>2 separate blinds</strong>, each approximately '+half+'″ wide. Enter total width — your quote will specify both blinds.';
    splitInfo.style.display='block';
  }

  // Oversize warning
  if(S.w>=92||S.h>=92){
    osWarn.textContent='⚠ Width or height is 92″ or greater — this vertical requires common carrier shipping. True freight cost confirmed at quote (Wallace will contact with options for multiple units).';
    osWarn.style.display='block';
  }

  // Vane count estimation (3.5" vane system)
  const vaneCount=Math.ceil(S.w/3.5);
  const stackOneWay=Math.round(vaneCount*0.25*10)/10; // approx 1/4 of vane pitch
  const stackSplit=Math.round(stackOneWay/2*10)/10;
  vaneStats.innerHTML='Est. vanes: ~'+vaneCount+' · One-way stack: ~'+stackOneWay+'″ · Split-draw each side: ~'+stackSplit+'″ (reference only)';
  vaneStats.style.display='block';

  document.getElementById('s3val').textContent=S.w+'″ × '+S.h+'″';
  markDone('step3');
  updateSpec();
}

// ── GENERIC OPT PICKER ────────────────────────────────────────────────────
function pickOpt(el,key,val,label){
  const parent=el.closest('.step-body')||el.parentElement;
  parent.querySelectorAll('.opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S[key]=val;
  const stepMap={mount:'s4val',tiltChain:'s6val',track:'s7val',valance:'s8val'};
  if(stepMap[key]) document.getElementById(stepMap[key]).textContent=label;
  const doneMap={mount:'step4',tiltChain:'step6',track:'step7',valance:'step8'};
  if(doneMap[key]) markDone(doneMap[key]);
  updateSpec();
}

// ── DRAW ─────────────────────────────────────────────────────────────────
function pickDraw(el,key,label){
  document.querySelectorAll('#step5 #draw-oneway,#step5 #draw-split').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.draw=key;
  document.getElementById('stack-side-section').style.display=key==='oneway'?'block':'none';
  if(key==='split') {S.stackSide='split';}
  buildStep5Val();
  markDone('step5');
  updateSpec();
}

function pickSide(el,type,val){
  const rowId=type==='stack'?'stack-side-section':'ctrl-side-row';
  const row=document.getElementById(rowId)||el.closest('.radio-row')||el.parentElement;
  row.querySelectorAll('.radio-chip').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  if(type==='stack') S.stackSide=val; else S.ctrlSide=val;
  buildStep5Val();
  markDone('step5');
  updateSpec();
}

function buildStep5Val(){
  const parts=[];
  if(S.draw) parts.push(S.draw==='oneway'?'One-way':'Split draw');
  if(S.ctrlSide) parts.push('Ctrl: '+S.ctrlSide);
  if(S.stackSide&&S.stackSide!=='split') parts.push('Stack: '+S.stackSide);
  document.getElementById('s5val').textContent=parts.join(' · ')||'—';
}

// ── ADDONS ────────────────────────────────────────────────────────────────
function toggleAddon(el,key){
  if(!el.classList.contains('addon-row')) return;
  el.classList.toggle('sel');
  S[key]=el.classList.contains('sel');
  const check=el.querySelector('.addon-check');
  if(check){check.style.background=S[key]?'var(--gold)':'';check.style.borderColor=S[key]?'var(--gold)':'#ccc';check.style.color=S[key]?'#1C1510':'transparent';}
  // Show/hide quantity rows
  if(key==='verticlips') document.getElementById('vclip-qty-row').style.display=S[key]?'block':'none';
  if(key==='hingedCorners') document.getElementById('hvc-qty-row').style.display=S[key]?'block':'none';
  if(key==='tHandles') document.getElementById('th-qty-row').style.display=S[key]?'block':'none';
  updateSpec();
}

// ── DELIVERY ─────────────────────────────────────────────────────────────
function pickDel(btn,key){
  document.querySelectorAll('.del-btn').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel'); S.del=key;
  document.getElementById('del-ship').style.display=key==='ship'?'block':'none';
  document.getElementById('del-pickup').style.display=key==='pickup'?'block':'none';
}

// ── SPEC PANEL ────────────────────────────────────────────────────────────
function updateSpec(){
  const p=S.patternIdx!==null?PATTERNS[S.patternIdx]:null;
  const ready=p&&S.vaneType&&S.w&&S.h;
  document.getElementById('sp-pending').style.display=ready?'none':'block';
  document.getElementById('sp-detail').style.display=ready?'block':'none';
  if(!ready) return;

  document.getElementById('sp-pattern').textContent=p.name;
  document.getElementById('sp-pg').textContent='Group '+p.pg+(p.notes?' — '+p.notes:'');
  document.getElementById('sp-vtype').textContent=({pvc:'PVC / Vinyl',fh:'Fabric Free-Hang (incl. sewn-in weights)',cp:'Fabric in 3.5″ Channel Panel (+ CP surcharge)'})[S.vaneType];
  document.getElementById('sp-color').textContent=document.getElementById('f-color').value.trim()||'—';
  document.getElementById('sp-size').textContent=S.w+'″ W × '+S.h+'″ H';
  document.getElementById('sp-mount').textContent=({ceiling:'Ceiling mount',outside:'Outside bracket',extension:'Extension bracket',inside:'Inside bracket'})[S.mount]||'—';
  const drawStr=(S.draw==='oneway'?'One-way':S.draw==='split'?'Split draw':'—')+(S.centerStack?' + Center stack':'')+(S.offCenter?' + Off-center draw':'')+(S.oppositeStack?' + Opposite stack/ctrl':'');
  document.getElementById('sp-draw').textContent=drawStr||'—';
  document.getElementById('sp-ctrl').textContent=S.ctrlSide?S.ctrlSide.charAt(0).toUpperCase()+S.ctrlSide.slice(1):'—';
  document.getElementById('sp-stack').textContent=S.draw==='split'?'Split (both sides)':S.stackSide?(S.stackSide.charAt(0).toUpperCase()+S.stackSide.slice(1)):'—';
  document.getElementById('sp-chain').textContent=({vinyl:'Vinyl / plastic',metal:'Metal'})[S.tiltChain]||'—';
  document.getElementById('sp-track').textContent=({regular:'Regular (Decomatic 3.5″)',replacement:'Replacement track only',topbottom:'Top & bottom track (rotate & traverse)'})[S.track]||'Regular';
  document.getElementById('sp-valance').textContent=({regular:'Regular',deluxe:'Deluxe',single:'Single',laser:'Laser trim',none:'No valance'})[S.valance]||'—';
  const qty=parseInt(document.getElementById('qty').value)||1;
  S.qty=qty;
  document.getElementById('sp-qty').textContent=qty+' blind'+(qty>1?'s':'');
  document.getElementById('s10val').textContent=qty+' blind'+(qty>1?'s':'')+' · '+(S.del==='ship'?'Ship':'Pickup');

  // Vane count stats
  if(S.w){
    const vc=Math.ceil(S.w/3.5);
    const so=Math.round(vc*0.25*10)/10;
    document.getElementById('sp-vane-count').textContent='~'+vc+' vanes';
    document.getElementById('sp-stack-est').textContent='Stack est: '+(S.draw==='split'?'~'+Math.round(so/2*10)/10+'″/side (split)':'~'+so+'″ (one-way)');
    document.getElementById('sp-vane-count').style.display='block';
    document.getElementById('sp-stack-est').style.display='block';
  }

  document.getElementById('sp-warn-os').style.display=(S.w>=92||S.h>=92)?'block':'none';
  document.getElementById('sp-warn-split').style.display=S.w>193?'block':'none';
}

// ── SUBMIT ────────────────────────────────────────────────────────────────
function addWallaceVerticalsToCart(){
  var color=vwColor||'—';
  var w=document.getElementById('vw-width').value;
  var h=document.getElementById('vw-height').value;
  var qty=document.getElementById('vw-qty').value||'1';
  if(!color||color==='—'){ alert('Please select a color before adding to cart.'); return; }
  if(!w||!h){ alert('Please enter width and height before adding to cart.'); return; }

  var mount=document.querySelector('#grp-vw-mount .delivery-opt-card.sel')?.querySelector('.delivery-opt-title')?.textContent.trim()||'—';
  var valSel=document.querySelector('#grp-vw-valance .delivery-opt-card.sel')?.querySelector('.delivery-opt-title')?.textContent.trim()||'—';

  var lines=[
    {label:'Product',value:'Wallace Vertical Blinds'},
    {label:'Color',value:color},
    {label:'Width',value:(w||'—')+'″'},
    {label:'Height',value:(h||'—')+'″'},
    {label:'Quantity',value:String(qty)},
    {label:'Mount',value:mount},
    {label:'Valance',value:valSel}
  ];
  var specs=lines.map(function(l){return l.label+': '+l.value;}).join(' | ');
  pbAddToCart({product:'Wallace Vertical Blinds',lines:lines,specs:specs,price:null,qty:parseInt(qty)||1});
  pbOpenCart();
}

function submitQuote(){
  const name=document.getElementById('f-name').value.trim();
  const phone=document.getElementById('f-phone').value.trim();
  const err=document.getElementById('form-err');
  if(!name||!phone){err.style.display='block';return;}
  err.style.display='none';

  const p=S.patternIdx!==null?PATTERNS[S.patternIdx]:null;
  if(!p||!S.vaneType){err.style.display='block';err.textContent='Please select a pattern and vane type.';return;}

  const qty=S.qty||1;
  const vaneLabel={pvc:'PVC / Vinyl',fh:'Fabric Free-Hang (sewn-in weights included)',cp:'Fabric inserted into 3.5″ Channel Panel (channel panel surcharge applies)'}[S.vaneType];
  const drawLabel=(S.draw==='oneway'?'One-way draw':S.draw==='split'?'Split draw':'Not specified')+(S.centerStack?' + Center stack (surcharge)':'')+(S.offCenter?' + Off-center draw (surcharge)':'')+(S.oppositeStack?' + Opposite stack/controls (surcharge)':'');
  const accs=[];
  if(S.autoWand) accs.push('Auto Wand (no charge)');
  if(S.verticlips){const n=parseInt(document.getElementById('vclip-qty').value)||2;accs.push('Verticlips × '+n+' ($6 ea)');}
  if(S.hingedCorners){const n=parseInt(document.getElementById('hvc-qty').value)||2;accs.push('Hinged valance corners × '+n+' ($6 ea)');}
  if(S.tHandles){const n=parseInt(document.getElementById('th-qty').value)||1;accs.push('T-handles × '+n+' ($8.25 ea)');}
  const vc=Math.ceil(S.w/3.5);
  const so=Math.round(vc*0.25*10)/10;
  const stackEst=S.draw==='split'?'~'+Math.round(so/2*10)/10+'″ per side':'~'+so+'″ (one-way)';
  const splitNote=S.w>193?'\n⚠ Width '+S.w+'″ exceeds 193″ — will be priced as 2 blinds (~'+Math.ceil(S.w/2*4/4)+'″ each).':'';
  const oversizeNote=(S.w>=92||S.h>=92)?'\n⚠ 92″+ dimension — common carrier required, true freight confirmed at quote.':'';

  const lines=[
    'WALLACE VERTICAL BLINDS — QUOTE REQUEST',
    '(Wallace Vertical Price Book, March 1 2026)',
    '',
    'PRODUCT SPECIFICATIONS:',
    'Product: Wallace Vertical Blinds',
    'Pattern: '+p.name,
    'Price Group: Group '+p.pg+(p.notes?' ('+p.notes+')':''),
    'Vane type: '+vaneLabel,
    'Color code / name: '+(document.getElementById('f-color').value.trim()||'—'),
    '',
    'DIMENSIONS:',
    'Width: '+S.w+'″',
    'Height / drop: '+S.h+'″',
    splitNote,
    oversizeNote,
    '',
    'MOUNTING:',
    'Mount / bracket: '+({ceiling:'Ceiling mount',outside:'Outside bracket',extension:'Extension bracket',inside:'Inside bracket'}[S.mount]||'—'),
    '',
    'DRAW & STACK:',
    drawLabel,
    'Control side: '+(S.ctrlSide||'—'),
    'Stack side: '+(S.draw==='split'?'Split (both sides)':S.stackSide||'—'),
    'Estimated vane count: ~'+vc+' vanes',
    'Estimated stack width: '+stackEst,
    '',
    'TILT CHAIN:',
    ({vinyl:'Vinyl / plastic chain',metal:'Metal chain'}[S.tiltChain]||'—'),
    '',
    'TRACK:',
    ({regular:'Regular Decomatic 3.5″ track (included)',replacement:'Replacement 3.5″ track only (priced by width)',topbottom:'Top & bottom track / rotate & traverse'}[S.track]||'Regular'),
    '',
    'VALANCE:',
    ({regular:'Regular valance',deluxe:'Deluxe valance',single:'Single valance',laser:'Laser trim valance',none:'No valance'}[S.valance]||'—'),
    '',
    'ACCESSORIES:',
    accs.length?accs.join('\n'):'None',
    '',
    'ORDER DETAILS:',
    'Quantity: '+qty+' vertical blind'+(qty>1?'s':''),
    'Room / sidemark: '+(document.getElementById('room-label').value.trim()||'—'),
    'Delivery: '+(S.del==='ship'?'Ship (UPS/FedEx from Huntingdon Valley PA)':'Will pick up'),
    '',
    'NOTES:',
    document.getElementById('f-notes').value.trim()||'None',
    '',
    'FREIGHT NOTE:',
    'First blind: $25. Each additional (under 92″): $15. 92″+ height or width: common carrier, true freight confirmed.',
    '',
    'CUSTOMER:',
    'Name: '+name,
    'Phone: '+phone,
    'Email: '+(document.getElementById('f-email').value.trim()||'—'),
    '',
    'Pricing confirmed with current Wallace Vertical price book. Not shown publicly per owner policy.'
  ].filter(l=>l!==null&&l!==undefined);

  window.location.href='mailto:justin@blindznation.com?subject='+encodeURIComponent('Wallace Verticals Quote — '+name)+'&body='+encodeURIComponent(lines.join('\n'));
  document.getElementById('success-box').style.display='block';
}

// Init: pre-select defaults
document.querySelector('#step7 .opt-card.sel')&&null; // track already sel
document.getElementById('mc-inside')&&null;