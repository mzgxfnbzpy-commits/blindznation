// ── PRICING DATA ──────────────────────────────────────────────────────────────

// Paris Texas — Retail prices (June 2025, 10% tariff included)
const PT_POLES_158 = {2:43.26, 4:86.52, 6:129.78, 8:173.05, 10:216.29, 12:259.55}; // metal per section
const PT_POLES_178 = {2:43.26, 4:86.52, 6:129.78, 8:173.05, 10:216.29, 12:259.55};
const PT_FINIALS_158 = {
  standard:  {label:'Standard',     price:113.71, note:'Per pair — Modern, Clean Deco, Rustic styles'},
  premium:   {label:'Premium',      price:128.54, note:'Per pair — Transitional Luxe, Bohemian Chic'},
  crystal:   {label:'Crystal/Glass',price:206.41, note:'Per pair — Crystal and glass finials'},
  endcap:    {label:'End Cap',      price:49.44,  note:'Per pair — clean minimal finish'}
};
const PT_FINIALS_178 = {
  standard:  {label:'Standard',     price:113.71, note:'Per pair'},
  premium:   {label:'Premium',      price:177.98, note:'Per pair — Luxe styles'},
  crystal:   {label:'Crystal/Glass',price:247.19, note:'Per pair — Crystal finials'},
  endcap:    {label:'End Cap',      price:49.44,  note:'Per pair'}
};
const PT_BRACKETS_158 = {
  single:    {label:'Single Bracket (3½&Prime; return)',  price:61.80},
  single6:   {label:'Single 6&Prime; Bracket (6&Prime; return)', price:67.98},
  double:    {label:'Double Bracket (3½/6&Prime;)',       price:74.16},
  inside:    {label:'Inside mount (pair)',                price:80.34}
};
const PT_BRACKETS_178 = {
  single:    {label:'Single Bracket (3½&Prime; return)',  price:67.98},
  single6:   {label:'Single 6&Prime; Bracket (6&Prime; return)', price:74.16},
  double:    {label:'Double Bracket (3½/6&Prime;)',       price:80.34},
  inside:    {label:'Inside mount (pair)',                price:80.34}
};
const PT_FRENCH_158  = {square:{label:'French Return w/ Square Plate (pair)',price:92.70}, round:{label:'French Return w/ Round Plate (pair)',price:92.70}};
const PT_RING_158    = 9.27;  // per ring
const PT_RING_178    = 9.27;

// Select Metal — Wholesale × 2.0 = Retail
const SM_34_POLES   = {6:155.00, 8:163.50, 12:310.00}; // retail
const SM_138_POLES  = {6:237.00, 8:295.50, 12:473.50};
const SM_34_FINIAL  = {low:32.00, mid:43.50, high:54.50}; // retail tiers (wholesale × 2)
const SM_138_FINIAL = {low:46.00, mid:62.00, high:80.00};
const SM_34_BRACKET = {standard:52.50, extended:57.00, double:69.50, urban:86.00, ceiling:55.00};
const SM_138_BRACKET= {standard:65.00, extended:72.00, double:85.00};
const SM_RING_34    = 6.50;   // per ring retail
const SM_RING_138   = 7.00;

// Kirsch Designer Metals — Wholesale × 2.5 = Retail
const KDM_1IN_FINIAL = {standard:45.00, premium:89.00}; // retail per pair
const KDM_1IN_BRACKET = {standard:38.00, double:58.00};

// Kirsch Basic Superfine Pro — Wholesale broken-pack × 2.0 = Retail
const KB_TRAVERSE = {
  split_30_48:   {label:'Single 30–48&Prime; Split Draw', price:126.18},
  split_48_84:   {label:'Single 48–84&Prime; Split Draw', price:140.16},
  split_66_120:  {label:'Single 66–120&Prime; Split Draw', price:168.98},
  split_84_156:  {label:'Single 84–156&Prime; Split Draw', price:214.60},
  split_156_228: {label:'Single 156–228&Prime; Split Draw', price:226.96},
  oneR_30_48:    {label:'Single 30–48&Prime; One-Way Right', price:125.96},
  oneR_48_84:    {label:'Single 48–84&Prime; One-Way Right', price:140.16},
  oneR_66_120:   {label:'Single 66–120&Prime; One-Way Right', price:168.98},
  oneL_30_48:    {label:'Single 30–48&Prime; One-Way Left',  price:125.96},
  oneL_48_84:    {label:'Single 48–84&Prime; One-Way Left',  price:140.16},
  dbl_48_84:     {label:'Double 48–84&Prime; Split Draw', price:301.28},
  dbl_84_156:    {label:'Double 84–156&Prime; Split Draw', price:363.62}
};

// BDD Motorization — Wholesale × 1.5 = Retail
const MOTOR_TRACK = {
  60:  {label:'60&Prime; Track',  price:730},
  72:  {label:'72&Prime; Track',  price:747},
  84:  {label:'84&Prime; Track',  price:773},
  96:  {label:'96&Prime; Track',  price:829},
  108: {label:'108&Prime; Track', price:886},
  120: {label:'120&Prime; Track', price:939},
  132: {label:'132&Prime; Track', price:999},
  144: {label:'144&Prime; Track', price:1057},
  156: {label:'156&Prime; Track', price:1116},
  168: {label:'168&Prime; Track', price:1170}
};
// Remote/accessories: Double bracket $28.50, USB Charging $15, Splice $21

// ── STATE ─────────────────────────────────────────────────────────────────────
const S = {
  brand:'', brandLabel:'', diameter:'', length:0, finish:'', finishLabel:'',
  finialKey:'', finialQty:0,
  bracketKey:'', bracketQty:0, frenchReturn:false,
  rings:0, motorKey:'', motorTrackWidth:0, delivery:'ship'
};

const $=id=>document.getElementById(id);
const fmt=n=>'$'+Math.round(n).toLocaleString();

function toggleStep(id){ const b=$(id); b.classList.toggle('open'); b.classList.toggle('active'); }
function markDone(id){ $(id).classList.add('done'); }

// ── STEP 1: BRAND ─────────────────────────────────────────────────────────────
function pickBrand(el,code,label,type){
  document.querySelectorAll('#step1 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.brand=code; S.brandLabel=label;
  $('s1val').textContent=label;
  markDone('step1');
  buildDiameterStep(code,type);
  buildFinishStep(code);
  buildFinialStep(code);
  buildBracketStep(code);
  buildRingsStep(code);
  buildMotorStep(code,type);
  calcPrice();
  $('step2').classList.add('active','open');
}

// ── STEP 2: DIAMETER ──────────────────────────────────────────────────────────
function buildDiameterStep(code,type){
  const body=$('s2-body');
  $('s2-title').textContent = type==='Traverse'||type==='Motorized' ? 'Configuration' : 'Diameter';
  if(code==='pt'){
    body.innerHTML=optRow([
      ['158','1⅛&Prime; Metal Pole','Most popular — works with all PT finials'],
      ['178','1⅜&Prime; Metal Pole','Larger statement look — heavier drapes']
    ],'pickDia',code);
  } else if(code==='sm'){
    body.innerHTML=optRow([
      ['34','¾&Prime; Brass Poles','Classic proportions — 8 finishes'],
      ['138','1⅜&Prime; Brass Poles','Bold presence — 8 finishes']
    ],'pickDia',code);
  } else if(code==='kdm'){
    body.innerHTML=optRow([
      ['1in','1&Prime; Designer Metals','Antique Silver, Black, Brushed Bronze, Elegant/Gilded Brass, Polished/Satin Nickel, Gunmetal']
    ],'pickDia',code);
    S.diameter='1in'; $('s2val').textContent='1″';
    markDone('step2');
  } else if(code==='kb'){
    body.innerHTML='<div style="font-size:12px;color:#555;line-height:1.6;margin-top:8px">Kirsch Superfine Pro traverse rods in white. Choose your draw type and length below.</div>' +
      optRow([
        ['split','Split Draw','Panels draw from both sides to center'],
        ['oneR','One-Way Right','All fabric stacks to the right'],
        ['oneL','One-Way Left','All fabric stacks to the left'],
        ['double','Double Traverse','Two rods — sheer + blackout']
      ],'pickDia',code);
  } else if(code==='moto'){
    body.innerHTML='<div class="info-box" style="margin-top:8px">Sonoran motorized aluminum track. Quiet, app and remote controlled. Available in white or bronze aluminum. Double-track (sheer + panel) also available.</div>' +
      optRow([
        ['single110','Single Track — 110V AC','Hardwired motor — most reliable for permanent installs'],
        ['singleBatt','Single Track — Battery','Rechargeable battery — no wiring needed'],
        ['double','Double Track','Two independent tracks (sheer + panel)']
      ],'pickDia',code);
  } else {
    body.innerHTML='<div class="info-box" style="margin-top:8px">No problem — we\'ll recommend the right rod type for your panels and space. Just tell us your fabric weight and window width in the notes.</div>';
    S.diameter='other'; $('s2val').textContent='Will advise';
    markDone('step2');
    $('step3').classList.add('active','open');
  }
}

// Build a row of Soluna-style pills + one combined step-note from the descriptions.
// items: array of [val, title, desc?]; fn/extra form the onclick: fn(this,'val','extra')
function optRow(items,fn,extra){
  const btns=items.map(it=>
    '<button class="opt-btn" onclick="'+fn+'(this,\''+it[0]+'\',\''+extra+'\')">'+it[1]+'</button>'
  ).join('');
  const notes=items.filter(it=>it[2]).map(it=>'<strong>'+it[1]+'</strong> — '+it[2]).join('<br>');
  return '<div class="opt-row">'+btns+'</div>'+(notes?'<div class="step-note">'+notes+'</div>':'');
}

function pickDia(el,val,brand){
  document.querySelectorAll('#step2 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.diameter=val;
  const labels={'158':'1⅝″','178':'1⅞″','34':'¾″','138':'1⅜″','1in':'1″',
    'split':'Split Draw','oneR':'One-Way Right','oneL':'One-Way Left','double':'Double',
    'single110':'Single Track AC','singleBatt':'Single Track Battery'};
  $('s2val').textContent=labels[val]||val;
  markDone('step2');
  buildLengthStep(brand,val);
  calcPrice();
  $('step3').classList.add('active','open');
}

// ── STEP 3: LENGTH ────────────────────────────────────────────────────────────
function buildLengthStep(brand,dia){
  const body=$('s3-body');
  if(brand==='pt'){
    body.innerHTML='<div class="sub-label" style="margin-top:0">Number of rod sections needed</div>' +
      '<div style="font-size:11px;color:#888;margin-bottom:8px">Most windows use 1 section (up to 12 ft). Splice two sections for wider spans.</div>' +
      '<div class="opt-row">'+[1,2,3].map(n=>'<button class="opt-btn" onclick="pickLength(this,'+n+',\'pt\')">'+n+' section'+(n>1?'s':'')+'</button>').join('')+'</div>' +
      '<div class="step-note">'+[1,2,3].map(n=>'<strong>'+n+' section'+(n>1?'s':'')+'</strong> — up to '+(n*12)+' ft total').join('<br>')+'</div>' +
      '<div class="sub-label">Length per section</div>' +
      '<div class="opt-row" id="pt-seclen-row">' + [2,4,6,8,10,12].map(ft=>
        '<button class="opt-btn" onclick="pickPTLen(this,'+ft+')">'+ft+' ft</button>'
      ).join('')+'</div>' +
      '<div class="step-note">'+[2,4,6,8,10,12].map(ft=>ft+' ft = '+(ft*12)+'"').join(' · ')+'</div>';
    S.length=6; // default
  } else if(brand==='sm'){
    body.innerHTML='<div class="opt-row">' + [6,8,12].map(ft=>
      '<button class="opt-btn" onclick="pickLength(this,'+ft+',\'sm\')">'+ft+' ft</button>'
    ).join('')+'</div>' +
    '<div class="step-note">'+[6,8,12].map(ft=>ft+' ft = '+(ft*12)+'&Prime;').join(' · ')+'</div>' +
    '<div class="info-box" style="margin-top:8px">Poles can be cut to specified measurement ($5 per cut). Poles 90&Prime; or less may reduce shipping cost.</div>';
  } else if(brand==='kb'){
    const ranges=['30–48&Prime;','48–84&Prime;','66–120&Prime;','84–156&Prime;','156–228&Prime;'];
    body.innerHTML='<div class="opt-row">'+ranges.map((r,i)=>
      '<button class="opt-btn" onclick="pickLength(this,\'kb'+i+'\',\'kb\')">'+r+'</button>'
    ).join('')+'</div>';
  } else if(brand==='moto'){
    body.innerHTML='<div class="sub-label" style="margin-top:0">Track width (finished track size)</div>' +
      '<div class="opt-row">'+[60,72,84,96,108,120,132,144,156,168].map(w=>
        '<button class="opt-btn" onclick="pickMotorWidth(this,'+w+')">'+w+'&Prime;</button>'
      ).join('')+'</div>';
  } else {
    body.innerHTML='<div class="form-group" style="margin-top:8px"><label>Window width (inches)</label><input type="number" id="len-other" min="12" max="288" placeholder="e.g. 72" oninput="pickOtherLen()"></div>';
  }
}

let ptSections=1;
function pickPTLen(el,ft){
  document.querySelectorAll('#pt-seclen-row .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.length=ft;
  $('s3val').textContent=(ptSections)+' × '+ft+'ft';
  markDone('step3');
  calcPrice();
  $('step4').classList.add('active','open');
}
function pickLength(el,val,brand){
  document.querySelectorAll('#step3 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.length=val;
  $('s3val').textContent=typeof val==='number' ? val+'ft' : val;
  markDone('step3');
  calcPrice();
  $('step4').classList.add('active','open');
}
function pickMotorWidth(el,w){
  document.querySelectorAll('#step3 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.motorTrackWidth=w;
  S.length=w;
  $('s3val').textContent=w+'″ track';
  markDone('step3');
  calcPrice();
  $('step4').classList.add('active','open');
}
function pickOtherLen(){
  const v=parseFloat($('len-other').value)||0;
  S.length=v;
  $('s3val').textContent=v?v+'″':'—';
  if(v>0){markDone('step3'); calcPrice();}
}

// ── STEP 4: FINISH ────────────────────────────────────────────────────────────
const PT_FINISHES=[
  {code:'AM',name:'Amulet',hex:'#4a3728'},
  {code:'AND',name:'Andiron',hex:'#6b5a4e'},
  {code:'AGL',name:'Antique Gold Leaf',hex:'#b8960c'},
  {code:'BK',name:'Black',hex:'#222222'},
  {code:'CO',name:'Concrete',hex:'#8a7968'},
  {code:'DC',name:'Dark Chocolate',hex:'#3d1c08'},
  {code:'FO',name:'Fossil',hex:'#7a6e5f'},
  {code:'GG',name:'Glam Gold',hex:'#c9a227'},
  {code:'JA',name:'Java',hex:'#2c1a0e'},
  {code:'LU',name:'Luminous',hex:'#d4c04a'},
  {code:'MA',name:'Manor',hex:'#5c4a3a'},
  {code:'MYS',name:'Mystic',hex:'#4a4560'},
  {code:'NAB',name:'New Age Bronze',hex:'#6e4e2e'},
  {code:'PAL',name:'Palma',hex:'#8b7355'},
  {code:'SH',name:'Shimmer',hex:'#c8c8c8'},
  {code:'SM',name:'Silver Maple',hex:'#a0a0a0'},
  {code:'STA',name:'Stardust',hex:'#1a1a2e'},
  {code:'TRU',name:'Truffle',hex:'#5c3d2e'},
  {code:'URB',name:'Urban Bronze',hex:'#4a3520'},
  {code:'PPM',name:'PTH Perfect Match™',hex:'#f0ece6'}
];
const SM_FINISHES=[
  {code:'07',name:'Bronze',hex:'#6e4e2e'},
  {code:'22',name:'Satin Brass',hex:'#b8960c'},
  {code:'27',name:'Brushed Brass',hex:'#d4a83a'},
  {code:'46',name:'Matte Black',hex:'#222'},
  {code:'48',name:'Graphite',hex:'#555'},
  {code:'65',name:'Gunmetal',hex:'#3a3a3a'},
  {code:'67',name:'Steel',hex:'#888'},
  {code:'68',name:'Polished Nickel',hex:'#c0c0c0'}
];
const KDM_FINISHES=[
  {code:'AS',name:'Antique Silver',hex:'#a0a098'},
  {code:'BK',name:'Black',hex:'#222'},
  {code:'BB',name:'Brushed Bronze',hex:'#7a5a3a'},
  {code:'EB',name:'Elegant Brass',hex:'#b89020'},
  {code:'GB',name:'Gilded Bronze',hex:'#c4a830'},
  {code:'PN',name:'Polished Nickel',hex:'#c0c0c0'},
  {code:'SN',name:'Satin Nickel',hex:'#a8a8a8'},
  {code:'GM',name:'Gunmetal',hex:'#454545'}
];

function buildFinishStep(brand){
  const body=$('s4-body');
  let finishes=[];
  if(brand==='pt') finishes=PT_FINISHES;
  else if(brand==='sm') finishes=SM_FINISHES;
  else if(brand==='kdm') finishes=KDM_FINISHES;
  else if(brand==='kb'){
    body.innerHTML='<div style="font-size:12px;color:#555;padding-top:8px">Kirsch Superfine Pro is available in <strong>White only</strong>.</div>';
    S.finish='white'; S.finishLabel='White'; $('s4val').textContent='White'; markDone('step4'); return;
  } else if(brand==='moto'){
    body.innerHTML='<div class="opt-row"><button class="opt-btn" onclick="pickFinish(this,\'wh\',\'White Aluminum\')">White</button><button class="opt-btn" onclick="pickFinish(this,\'br\',\'Bronze Aluminum\')">Bronze</button></div>';
    return;
  } else {
    body.innerHTML='<div style="font-size:12px;color:#555;padding-top:8px">Specify preferred finish in notes — we carry a wide range across all brands.</div>';
    S.finish='tbd'; $('s4val').textContent='TBD'; markDone('step4'); return;
  }
  body.innerHTML='<div class="finish-grid">'+finishes.map(f=>
    '<div class="finish-card" onclick="pickFinish(this,\''+f.code+'\',\''+f.name+'\')">' +
    '<div class="finish-swatch" style="background:'+f.hex+'"></div>' +
    '<div class="finish-name">'+f.name+'</div></div>'
  ).join('')+'</div>' +
  (brand==='pt'?'<div class="step-note">PTH Perfect Match™ — provide Benjamin Moore® color; sample chip required. 30-day order window.</div>':'');
}

function pickFinish(el,code,name){
  document.querySelectorAll('#step4 .finish-card, #step4 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.finish=code; S.finishLabel=name;
  $('s4val').textContent=name;
  markDone('step4'); calcPrice();
  $('step5').classList.add('active','open');
}

// ── STEP 5: FINIALS ───────────────────────────────────────────────────────────
function buildFinialStep(brand){
  const body=$('s5-body');
  let tiers={};
  if(brand==='pt' && S.diameter!=='178') tiers=PT_FINIALS_158;
  else if(brand==='pt') tiers=PT_FINIALS_178;
  else if(brand==='sm') tiers={low:{label:'Standard Finial',price:S.diameter==='138'?46:32,note:'Per pair'},high:{label:'Premium Finial',price:S.diameter==='138'?80:55,note:'Per pair'}};
  else if(brand==='kdm') tiers={standard:{label:'Standard',price:45,note:'Per pair'},premium:{label:'Premium',price:89,note:'Per pair'}};
  else if(brand==='kb'||brand==='moto'){
    body.innerHTML='<div style="font-size:12px;color:#555;padding-top:8px">Traverse rods do not use decorative finials.</div>';
    S.finialKey='none'; $('s5val').textContent='N/A'; markDone('step5'); return;
  } else {
    body.innerHTML='<div style="font-size:12px;color:#555;padding-top:8px">Finial selection confirmed at quote.</div>';
    S.finialKey='other'; $('s5val').textContent='TBD'; markDone('step5'); return;
  }
  body.innerHTML='<div class="opt-row">'+Object.entries(tiers).map(([k,v])=>
    '<button class="opt-btn" onclick="pickFinial(this,\''+k+'\','+v.price+',\''+v.label+'\')">'+v.label+'</button>'
  ).join('')+'</div>' +
  '<div class="step-note">'+Object.entries(tiers).map(([k,v])=>
    '<strong>'+v.label+'</strong> — '+fmt(v.price)+'/pair · '+v.note
  ).join('<br>')+'</div>' +
  '<div class="sub-label">Quantity</div>' +
  '<div class="spinner-row"><button class="spin-btn" onclick="adjFinials(-1)">&#8722;</button>' +
  '<input class="spin-num" type="number" id="finial-qty" value="1" min="0" max="20" oninput="updFinials()" style="width:52px">' +
  '<button class="spin-btn" onclick="adjFinials(1)">&#43;</button><span style="font-size:12px;color:#666">pair(s)</span></div>' +
  '<div class="step-note">Typically 1 pair per rod. Double setups need 2 pairs (one per panel).</div>';
}

let finialPrice=0;
function pickFinial(el,key,price,label){
  document.querySelectorAll('#step5 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.finialKey=key; finialPrice=price;
  S.finialQty=parseInt($('finial-qty').value)||1;
  $('s5val').textContent=label+' ×'+S.finialQty;
  markDone('step5'); calcPrice();
  $('step6').classList.add('active','open');
}
function adjFinials(d){
  const el=$('finial-qty');
  el.value=Math.max(0,Math.min(20,(parseInt(el.value)||0)+d));
  updFinials();
}
function updFinials(){
  S.finialQty=parseInt($('finial-qty').value)||0;
  calcPrice();
}

// ── STEP 6: BRACKETS ──────────────────────────────────────────────────────────
function buildBracketStep(brand){
  const body=$('s6-body');
  let bracks={};
  if(brand==='pt' && S.diameter==='158') bracks=PT_BRACKETS_158;
  else if(brand==='pt') bracks=PT_BRACKETS_178;
  else if(brand==='sm' && S.diameter==='34') bracks=SM_34_BRACKET;
  else if(brand==='sm') bracks=SM_138_BRACKET;
  else if(brand==='kdm') bracks=KDM_1IN_BRACKET;
  else if(brand==='kb'||brand==='moto'){
    body.innerHTML='<div style="font-size:12px;color:#555;padding-top:8px">Brackets/mounting hardware included with traverse rod.</div>';
    S.bracketKey='incl'; $('s6val').textContent='Included'; markDone('step6'); return;
  } else {
    body.innerHTML='<div style="font-size:12px;color:#555;padding-top:8px">Bracket type confirmed at quote.</div>';
    S.bracketKey='tbd'; $('s6val').textContent='TBD'; markDone('step6'); return;
  }

  body.innerHTML='<div class="opt-row">'+Object.entries(bracks).map(([k,v])=>
    '<button class="opt-btn" onclick="pickBracket(this,\''+k+'\','+v.price+',\''+v.label+'\')">'+v.label+'</button>'
  ).join('')+'</div>' +
  '<div class="step-note">'+Object.entries(bracks).map(([k,v])=>
    '<strong>'+v.label+'</strong> — '+fmt(v.price)+(k==='inside'?'/pair':' ea')
  ).join('<br>')+'</div>' +
  '<div class="sub-label">Quantity</div>' +
  '<div class="spinner-row"><button class="spin-btn" onclick="adjBrackets(-1)">&#8722;</button>' +
  '<input class="spin-num" type="number" id="bracket-qty" value="3" min="1" max="20" oninput="updBrackets()" style="width:52px">' +
  '<button class="spin-btn" onclick="adjBrackets(1)">&#43;</button><span style="font-size:12px;color:#666">bracket(s)</span></div>' +
  '<div class="step-note">Standard: 1 bracket per end + 1 center support per 4 ft of span.</div>' +
  (brand==='pt'?'<div class="sub-label">French Returns?</div><div class="opt-row" id="fr-row">' +
    '<button class="opt-btn" onclick="pickFR(this,false)">No French Returns</button>' +
    '<button class="opt-btn" onclick="pickFR(this,true)">Add French Returns</button>' +
    '</div><div class="step-note"><strong>Add French Returns</strong> — $92.70–$105.06/pair</div>':'');
}

let bracketPrice=0;
function pickBracket(el,key,price,label){
  document.querySelectorAll('#step6 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.bracketKey=key; bracketPrice=price;
  S.bracketQty=parseInt($('bracket-qty').value)||3;
  $('s6val').textContent=label+' ×'+S.bracketQty;
  markDone('step6'); calcPrice();
  $('step7').classList.add('active','open');
}
function adjBrackets(d){
  const el=$('bracket-qty');
  el.value=Math.max(1,Math.min(20,(parseInt(el.value)||3)+d));
  updBrackets();
}
function updBrackets(){
  S.bracketQty=parseInt($('bracket-qty').value)||1;
  calcPrice();
}
function pickFR(el,val){
  document.querySelectorAll('#fr-row .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.frenchReturn=val;
  calcPrice();
}

// ── STEP 7: RINGS ─────────────────────────────────────────────────────────────
function buildRingsStep(brand){
  const body=$('s7-body');
  if(brand==='kb'||brand==='moto'){
    body.innerHTML='<div style="font-size:12px;color:#555;padding-top:8px">Traverse and motorized tracks use slides/carriers — no rings needed.</div>';
    S.rings=0; $('s7val').textContent='N/A'; markDone('step7'); return;
  }
  const rPrice = brand==='sm' ? (S.diameter==='34'?SM_RING_34:SM_RING_138) : PT_RING_158;
  body.innerHTML='<div style="font-size:12px;color:#555;line-height:1.6;margin-top:8px">Rings slide along the pole and attach to drapery hooks. Recommended: 7 rings per foot of fabric (typically 12–16 rings per panel).</div>' +
    '<div class="sub-label">Ring quantity</div>' +
    '<div class="spinner-row"><button class="spin-btn" onclick="adjRings(-1)">&#8722;</button>' +
    '<input class="spin-num" type="number" id="ring-qty" value="0" min="0" max="200" oninput="updRings()" style="width:52px">' +
    '<button class="spin-btn" onclick="adjRings(1)">&#43;</button>' +
    '<span style="font-size:12px;color:#666">'+(rPrice>0?'rings @ '+fmt(rPrice)+' ea':'rings')+'</span></div>' +
    '<div class="step-note">Leave 0 if your panels have rings already or you\'ll specify at order.</div>';
}

function adjRings(d){
  const el=$('ring-qty');
  el.value=Math.max(0,Math.min(200,(parseInt(el.value)||0)+d));
  updRings();
}
function updRings(){
  S.rings=parseInt($('ring-qty').value)||0;
  $('s7val').textContent=S.rings>0?S.rings+' rings':'None';
  if(S.rings>0)markDone('step7');
  calcPrice();
}

// ── STEP 8: MOTORIZATION ──────────────────────────────────────────────────────
function buildMotorStep(brand,type){
  const body=$('s8-body');
  if(brand==='moto'){
    body.innerHTML='<div style="font-size:12px;color:#555;padding-top:8px">Motorized track pricing is already included in Step 3. The track price includes one motor.</div>';
    S.motorKey='included'; $('s8val').textContent='Included'; markDone('step8'); return;
  }
  if(brand==='kb'){
    body.innerHTML='<div style="font-size:12px;color:#555;padding-top:8px">To add motorization to a traverse system, we convert to a Sonoran motorized track — price quoted separately.</div>';
    $('s8val').textContent='None'; return;
  }
  body.innerHTML='<div class="opt-row">' +
    '<button class="opt-btn" onclick="pickMotor(this,\'none\',0)">No Motorization</button>' +
    '</div>' +
    '<div class="step-note"><strong>No Motorization</strong> — Manual wand or baton draw</div>' +
    '<div class="info-box" style="margin-top:8px">Motorization for decorative rods is brand-specific and varies by manufacturer. Select in notes and we will confirm compatibility and pricing at quote stage.</div>';
  S.motorKey='none'; $('s8val').textContent='None';
}

function pickMotor(el,key,price){
  document.querySelectorAll('#step8 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.motorKey=key;
  $('s8val').textContent=key==='none'?'None':key;
  calcPrice();
  $('step9').classList.add('active','open');
}

// ── DELIVERY ──────────────────────────────────────────────────────────────────
function pickDel(v){
  S.delivery=v;
  document.querySelectorAll('.delivery-opt-card').forEach(function(c){c.classList.remove('sel');});
  $('del-'+v).classList.add('sel');
}

// ── PRICE CALC ────────────────────────────────────────────────────────────────
// KB traverse: map draw type + length index to KB_TRAVERSE key
const KB_DRAW_KEYS = {
  split: ['split_30_48','split_48_84','split_66_120','split_84_156','split_156_228'],
  oneR:  ['oneR_30_48', 'oneR_48_84', 'oneR_66_120'],
  oneL:  ['oneL_30_48', 'oneL_48_84'],
  double:['dbl_48_84',  'dbl_84_156']
};

function calcPrice(){
  if(!S.brand){
    $('qp-pending').style.display='block'; $('qp-detail').style.display='none';
    updateSubmitState(); return;
  }
  $('qp-pending').style.display='none';
  $('qp-detail').style.display='block';
  $('q-brand').textContent=S.brandLabel;

  let rodCost=0, rodLabel='—';

  if(S.brand==='pt' && S.length && S.diameter){
    const pmap=S.diameter==='158'?PT_POLES_158:PT_POLES_178;
    const pp=pmap[S.length]||0;
    rodCost=pp*ptSections;
    rodLabel=ptSections+'×'+S.length+'ft @ '+fmt(pp)+'/section = '+fmt(rodCost);
  } else if(S.brand==='sm' && S.length){
    const pmap=S.diameter==='34'?SM_34_POLES:SM_138_POLES;
    const pp=pmap[S.length]||0;
    rodCost=pp; rodLabel=S.length+'ft pole = '+fmt(pp);
  } else if(S.brand==='moto' && S.motorTrackWidth){
    const tm=MOTOR_TRACK[S.motorTrackWidth];
    if(tm){rodCost=tm.price; rodLabel=tm.label+' = '+fmt(rodCost);}
  } else if(S.brand==='kb' && S.diameter && S.length){
    // Map draw type + length range index to KB_TRAVERSE entry
    const drawKeys=KB_DRAW_KEYS[S.diameter]||[];
    const rangeIdx=parseInt(S.length.replace('kb',''))||0;
    const key=drawKeys[rangeIdx];
    if(key && KB_TRAVERSE[key]){
      rodCost=KB_TRAVERSE[key].price;
      rodLabel=KB_TRAVERSE[key].label+' = '+fmt(rodCost);
    }
  }
  if(rodCost>0){$('q-rod-row').style.display='flex'; $('q-rod').textContent=rodLabel;}
  else $('q-rod-row').style.display='none';

  let finCost=0;
  if(S.finialKey && S.finialKey!=='none' && S.finialKey!=='other' && S.finialKey!=='incl' && finialPrice>0 && S.finialQty>0){
    finCost=finialPrice*S.finialQty;
    $('q-finial-row').style.display='flex';
    $('q-finial').textContent=S.finialQty+' pair(s) = '+fmt(finCost);
  } else $('q-finial-row').style.display='none';

  let braCost=0;
  if(bracketPrice>0 && S.bracketQty>0){
    braCost=bracketPrice*S.bracketQty;
    if(S.frenchReturn){
      const frP=S.diameter==='178'?105.06:92.70;
      braCost+=frP;
    }
    $('q-bracket-row').style.display='flex';
    $('q-bracket').textContent=S.bracketQty+' × '+fmt(bracketPrice)+' = '+fmt(braCost)+(S.frenchReturn?' + French Returns':'');
  } else $('q-bracket-row').style.display='none';

  let ringCost=0;
  if(S.rings>0){
    const rp=S.brand==='sm'?(S.diameter==='34'?SM_RING_34:SM_RING_138):PT_RING_158;
    ringCost=rp*S.rings;
    $('q-rings-row').style.display='flex';
    $('q-rings').textContent=S.rings+' rings @ '+fmt(rp)+' = '+fmt(ringCost);
  } else $('q-rings-row').style.display='none';

  $('q-motor-row').style.display='none';

  const total=rodCost+finCost+braCost+ringCost;
  S.estTotal=total;
  $('q-total').textContent=total>0?fmt(total)+' est.':'TBD';

  // ── Update inline summary in Step 9 (always shown once brand picked) ──
  const inlineRows=$('inline-rows');
  const inlineTotal=$('inline-total');
  if(inlineRows && inlineTotal){
    if(S.brand){
      let rows='';
      rows+='<div style="display:flex;justify-content:space-between;font-size:12px;padding:3px 0;border-bottom:.5px solid rgba(255,255,255,.08);margin-bottom:8px">' +
        '<span style="color:var(--text-muted)">Brand</span>' +
        '<span style="color:var(--cream);font-weight:500">'+S.brandLabel+'</span></div>';
      if(S.diameter) rows+='<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0"><span style="color:var(--text-muted)">Type / Diameter</span><span style="color:var(--cream)">'+S.diameter+'</span></div>';
      if(S.finishLabel) rows+='<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0"><span style="color:var(--text-muted)">Finish</span><span style="color:var(--cream)">'+S.finishLabel+'</span></div>';
      if(rodCost>0) rows+='<div style="display:flex;justify-content:space-between;font-size:12px;padding:3px 0"><span style="color:var(--text-muted)">Rod / Track</span><span style="color:var(--cream)">'+fmt(rodCost)+'</span></div>';
      else if(S.length) rows+='<div style="display:flex;justify-content:space-between;font-size:12px;padding:3px 0"><span style="color:var(--text-muted)">Length</span><span style="color:#aaa;font-style:italic">Confirm at quote</span></div>';
      if(finCost>0) rows+='<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0"><span style="color:var(--text-muted)">Finials</span><span style="color:var(--cream)">'+fmt(finCost)+'</span></div>';
      if(braCost>0) rows+='<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0"><span style="color:var(--text-muted)">Brackets</span><span style="color:var(--cream)">'+fmt(braCost)+'</span></div>';
      if(ringCost>0) rows+='<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0"><span style="color:var(--text-muted)">Rings ('+S.rings+')</span><span style="color:var(--cream)">'+fmt(ringCost)+'</span></div>';
      if(!rows) rows='<div style="font-size:12px;color:var(--text-muted);font-style:italic">Keep filling in the steps above — your estimate builds as you go.</div>';
      inlineRows.innerHTML=rows;
      inlineTotal.textContent=total>0?fmt(total)+' est.':'Building...';
    } else {
      inlineRows.innerHTML='<div style="font-size:12px;color:var(--text-muted);font-style:italic">Select brand and size above to see your estimate build in real time.</div>';
      inlineTotal.textContent='—';
    }
  }

  updateSubmitState();
}

// ── SUBMIT VALIDATION ─────────────────────────────────────────────────────────
function updateSubmitState(){
  const name=($('cf-name')||{}).value||'';
  const phone=($('cf-phone')||{}).value||'';
  const email=($('cf-email')||{}).value||'';
  const missing=[];

  if(!S.brand) missing.push('Select a brand (Step 1)');
  if(!S.diameter && S.brand!=='other') missing.push('Choose diameter or configuration (Step 2)');
  if(!S.length && S.brand!=='other') missing.push('Choose a length (Step 3)');
  if(!S.finish && S.brand!=='kb' && S.brand!=='moto' && S.brand!=='other') missing.push('Choose a finish (Step 4)');
  if(!name.trim()) missing.push('Enter your name');
  if(!phone.trim() && !email.trim()) missing.push('Enter a phone number or email');

  const btn=$('submit-btn');
  const clBox=$('checklist-box');
  const clItems=$('checklist-items');

  if(missing.length===0){
    if(btn){ btn.disabled=false; btn.style.opacity='1'; btn.style.cursor='pointer'; btn.textContent='Submit Order for Review →'; }
    if(clBox) clBox.style.display='none';
  } else {
    if(btn){ btn.disabled=true; btn.style.opacity='.45'; btn.style.cursor='not-allowed'; btn.textContent='Complete required fields to submit →'; }
    if(clBox && clItems){
      clBox.style.display='block';
      clItems.innerHTML=missing.map(m=>'• '+m).join('<br>');
    }
  }
}

// ── ADD TO CART ───────────────────────────────────────────────────────────────
function addHardwareQuoteToCart(){
  const errEl=$('cf-contact-err'); errEl.style.display='none';
  if(!S.brand){errEl.textContent='Please select a brand (Step 1) before adding to cart.';errEl.style.display='block';return;}
  calcPrice(); // refresh S.estTotal from current selections
  const lines=[
    {label:'Product',       value:'Drapery Hardware — '+(S.brandLabel||'Custom')},
    {label:'Diameter/Type', value:S.diameter||'—'},
    {label:'Finish',        value:S.finishLabel||'TBD'},
    {label:'Length',        value:S.length?(typeof S.length==='number'?S.length+'ft':S.length):'TBD'},
    {label:'Finials',       value:(!S.finialKey||S.finialKey==='none')?'None':S.finialKey+' × '+(S.finialQty||1)+' pair(s)'},
    {label:'French Returns',value:S.frenchReturn?'Yes':'No'},
    {label:'Brackets',      value:(!S.bracketKey||S.bracketKey==='tbd')?'TBD':S.bracketKey+' × '+(S.bracketQty||0)},
    {label:'Rings',         value:String(S.rings||0)},
    {label:'Motorization',  value:(!S.motorKey||S.motorKey==='none')?'None':S.motorKey}
  ];
  const specs=lines.map(l=>l.label+': '+l.value).join(' | ');
  pbAddToCart({product:'Drapery Hardware ('+(S.brandLabel||'Custom')+')',lines:lines,specs:specs,price:(S.estTotal>0?S.estTotal:null),qty:1});
  pbOpenCart();
}

// ── SUBMIT ────────────────────────────────────────────────────────────────────
function submitForm(){
  const name=$('cf-name').value.trim();
  const phone=$('cf-phone').value.trim();
  const email=$('cf-email').value.trim();
  const errEl=$('cf-contact-err'); errEl.style.display='none';
  if(!name){errEl.textContent='Please enter your name.';errEl.style.display='block';return;}
  if(!phone&&!email){errEl.textContent='Please enter a phone number or email.';errEl.style.display='block';return;}
  if(!S.brand){errEl.textContent='Please select a brand in Step 1.';errEl.style.display='block';return;}

  const body=[
    'DRAPERY HARDWARE QUOTE REQUEST',
    '================================',
    '',
    'CUSTOMER',
    'Name: '+name,
    'Phone: '+(phone||'—'),
    'Email: '+(email||'—'),
    'Delivery: '+'Ship (UPS/FedEx)',
    '',
    'HARDWARE SPECS',
    'Brand: '+S.brandLabel,
    'Diameter/Type: '+(S.diameter||'—'),
    'Length: '+(S.length?(typeof S.length==='number'?S.length+'ft or '+S.length*12+'"':S.length):'TBD'),
    'Finish: '+(S.finishLabel||'TBD'),
    'Finials: '+(!S.finialKey||S.finialKey==='none'?'None':S.finialKey+' × '+S.finialQty+' pair(s)'),
    'French Returns: '+(S.frenchReturn?'Yes':'No'),
    'Brackets: '+(!S.bracketKey||S.bracketKey==='tbd'?'TBD':S.bracketKey+' × '+S.bracketQty),
    'Rings: '+(S.rings||0),
    'Motorization: '+(S.motorKey==='none'||!S.motorKey?'None':S.motorKey),
    '',
    'NOTES',
    ($('cf-notes').value||'None')
  ].join('\n');

  const subj='Drapery Hardware Quote — '+name+' — '+S.brandLabel;
  window.location.href='mailto:blindznation@gmail.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  $('success-box').style.display='block';
}
