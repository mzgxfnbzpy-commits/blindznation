renderNav('Shades & blinds');
renderFooter(false);

// ═══════════════════════════════════════════════════════════
// STATE — initialized before any function calls
// ═══════════════════════════════════════════════════════════
var S = {
  op: 'wand', stack: 'left', mount: 'wall', isDoor: false,
  w: 0, h: 0, qty: 1,
  opacity: '', fabric: null,
  hw: '', // '' = fabric default
  accs: [],
  delivery: 'ship'
};

// ═══════════════════════════════════════════════════════════
// FABRIC DATA — source: Norman PDF pages 40–41 (Feb 2026)
// ═══════════════════════════════════════════════════════════
var SD_FABRICS = {
  lf: {
    'Plain': [
      {code:'F1124',name:'White',         hw:'White',        hex:'#F5F5F0'},
      {code:'F1128',name:'Ivory',          hw:'Cottage White',hex:'#F0E8D0'},
      {code:'F1132',name:'Light Gray',     hw:'Matte Silver', hex:'#C4C4C0'},
      {code:'F1136',name:'Gray',           hw:'Black',        hex:'#888080'},
      {code:'F1140',name:'Charcoal',       hw:'Black',        hex:'#404040'},
      {code:'F1866',name:'French Silver',  hw:'Matte Silver', hex:'#B4B8C0'},
      {code:'F1867',name:'Alabaster',      hw:'Cottage White',hex:'#E8DCC8'},
      {code:'F1868',name:'Leather Brown',  hw:'Bronze',       hex:'#8B6334'},
      {code:'F1341',name:'Cottonwood',     hw:'Cottage White',hex:'#E8D0B0'},
      {code:'F1345',name:'Platinum',       hw:'Cottage White',hex:'#C8C0B0'},
      {code:'F2128',name:'Linen White',    hw:'White',        hex:'#F4F0E4'},
      {code:'F2129',name:'Linen Ivory',    hw:'Cottage White',hex:'#ECE4C4'},
      {code:'F2130',name:'Linen Cottonwood',hw:'Cottage White',hex:'#D4C098'}
    ],
    'Net': [
      {code:'F1125',name:'White',     hw:'White',        hex:'#F2F2EE'},
      {code:'F1129',name:'Ivory',     hw:'Cottage White',hex:'#EEE4C4'},
      {code:'F1133',name:'Light Gray',hw:'Matte Silver', hex:'#BCBCB8'},
      {code:'F1137',name:'Gray',      hw:'Black',        hex:'#807878'},
      {code:'F1141',name:'Charcoal',  hw:'Black',        hex:'#3C3C3C'},
      {code:'F1342',name:'Cottonwood',hw:'Cottage White',hex:'#E4CCA8'},
      {code:'F1346',name:'Platinum',  hw:'Cottage White',hex:'#C4BCA8'}
    ],
    'Pacific': [
      {code:'F1126',name:'White',     hw:'White',        hex:'#F0F0EC'},
      {code:'F1130',name:'Ivory',     hw:'Cottage White',hex:'#EAE0C4'},
      {code:'F1134',name:'Light Gray',hw:'Matte Silver', hex:'#B8B8B0'},
      {code:'F1138',name:'Gray',      hw:'Black',        hex:'#787878'},
      {code:'F1343',name:'Cottonwood',hw:'Cottage White',hex:'#E0CCAC'},
      {code:'F1347',name:'Platinum',  hw:'Cottage White',hex:'#C0B8A8'}
    ],
    'Circle': [
      {code:'F1127',name:'White',     hw:'White',        hex:'#F0F0EC'},
      {code:'F1131',name:'Ivory',     hw:'Cottage White',hex:'#EAE0C4'},
      {code:'F1135',name:'Light Gray',hw:'Matte Silver', hex:'#BCBCB8'},
      {code:'F1139',name:'Gray',      hw:'Black',        hex:'#7C7C7C'},
      {code:'F1344',name:'Cottonwood',hw:'Cottage White',hex:'#E0CCAC'},
      {code:'F1348',name:'Platinum',  hw:'Cottage White',hex:'#C0B8A8'}
    ],
    'Lakeshore Stripe': [
      {code:'F1663',name:'White',          hw:'White',        hex:'#F5F5EE'},
      {code:'F1664',name:'Light Gray',     hw:'Matte Silver', hex:'#C0C0BC'},
      {code:'F1665',name:'Charcoal',       hw:'Black',        hex:'#444444'},
      {code:'F1964',name:'Warm White',     hw:'White',        hex:'#F4EED8'},
      {code:'F1965',name:'Fog Mist',       hw:'Cottage White',hex:'#D4D0C4'},
      {code:'F2038',name:'Reddish Brown',  hw:'Bronze',       hex:'#8B4A30'},
      {code:'F2039',name:'Malibu Beige',   hw:'Cottage White',hex:'#D4C4A4'},
      {code:'F2040',name:'Shadow',         hw:'Matte Silver', hex:'#A8A4A0'},
      {code:'F2041',name:'Latte',          hw:'Cottage White',hex:'#C4A880'},
      {code:'F2042',name:'Empirical Gray', hw:'Matte Silver', hex:'#989090'}
    ]
  },
  rd: {
    'Standard': [
      {code:'F1169',name:'Soft White',hw:'White',        hex:'#F2F2EC'},
      {code:'F1170',name:'Crema',     hw:'Cottage White',hex:'#E8D8C0'},
      {code:'F1171',name:'Coffee',    hw:'Black',        hex:'#5C3820'},
      {code:'F1172',name:'Carbon',    hw:'Black',        hex:'#2C2C2C'},
      {code:'F1603',name:'Light Gray',hw:'Matte Silver', hex:'#B0ACA8'},
      {code:'F1604',name:'Cottonwood',hw:'Cottage White',hex:'#D8C8A8'}
    ],
    'Plain': [
      {code:'F1854',name:'Soft White',hw:'White',        hex:'#F0F0E8'},
      {code:'F1855',name:'Crema',     hw:'Cottage White',hex:'#E4D4B8'},
      {code:'F1856',name:'Coffee',    hw:'Black',        hex:'#583218'},
      {code:'F1857',name:'Carbon',    hw:'Black',        hex:'#282828'},
      {code:'F1858',name:'Light Gray',hw:'Matte Silver', hex:'#ACACA8'}
    ]
  }
};

// ═══════════════════════════════════════════════════════════
// PRICE TABLE — source: Norman Feb 2026 price book p.27
// Track widths (W): 48, 60, 72, 84, 100, 120, 132, 144
// Heights (H): 36, 48, 54, 60, 66, 72, 78, 84, 90, 96, 108, 120, 132, 148, 160, 172, 184
// ═══════════════════════════════════════════════════════════
var SD_W = [48,60,72,84,100,120,132,144];
var SD_H = [36,48,54,60,66,72,78,84,90,96,108,120,132,148,160,172,184];
var SD_PRICES = [
  [758,892,951,1013,1107,1171,1235,1306,1400,1484,1604,1821,2051,2305,2582,2834,3088],
  [842,998,1082,1156,1269,1342,1415,1499,1609,1705,1842,2071,2314,2575,2886,3146,3408],
  [951,1146,1239,1342,1459,1555,1643,1744,1868,1983,2277,2535,2817,3111,3485,3779,4073],
  [1026,1281,1382,1491,1624,1730,1835,1939,2078,2203,2382,2651,2941,3249,3639,3947,4255],
  [1115,1347,1459,1576,1714,1830,1942,2052,2203,2337,2587,2865,3169,3486,3904,4223,4542],
  [1262,1455,1590,1720,1867,1996,2124,2244,2411,2559,2928,3225,3546,3889,4355,4699,5042],
  [1310,1554,1695,1832,1984,2122,2263,2386,2563,2717,2966,3267,3589,3935,4409,4758,5107],
  [1382,1685,1835,1979,2146,2292,2450,2575,2769,2929,3069,3377,3711,4070,4560,4922,5285]
];
var SD_ADD_PER_FT = [255,263,296,309,320,345,350,369]; // per extra foot over 184"

function lookupPrice(w,h){
  var wi=SD_W.findIndex(function(v){return w<=v;}); if(wi<0)wi=SD_W.length-1;
  var hi=SD_H.findIndex(function(v){return h<=v;});
  var base;
  if(hi>=0){
    base=SD_PRICES[wi][hi];
  } else {
    // over 184" height
    var extraFt=Math.ceil((h-184)/12);
    base=SD_PRICES[wi][SD_H.length-1]+extraFt*SD_ADD_PER_FT[wi];
  }
  return base||0;
}

// ═══════════════════════════════════════════════════════════
// STEP HELPERS
// ═══════════════════════════════════════════════════════════
function toggleStep(id){var el=document.getElementById(id);el.classList.add('active');setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'});},60);}
function openStep(id){var e=document.getElementById(id);if(e){e.classList.add('active','open');}}
function markDone(id,txt){
  var el=document.getElementById(id);
  el.classList.add('done');
  var vEl=document.getElementById(id.replace('step','s')+'val');
  if(vEl&&txt) vEl.textContent=txt;
}
function sp(id,val){var e=document.getElementById(id);if(e){e.textContent=val||'—';e.classList.toggle('empty',!val||val==='—');}}

// ═══════════════════════════════════════════════════════════
// STEP 1: OPERATION
// ═══════════════════════════════════════════════════════════
function pickOp(op){
  S.op=op;
  document.getElementById('op-wand').classList.toggle('sel',op==='wand');
  document.getElementById('op-motor').classList.toggle('sel',op==='motor');
  document.getElementById('motor-note').style.display=op==='motor'?'block':'none';
  document.getElementById('acc-charge-row').style.display=op==='motor'?'flex':'none';
  var lbl=op==='wand'?'Wand Tilt':'Motorized (Norman Smart)';
  markDone('step1',lbl); sp('sp-op',lbl);
  // Rebuild stack options
  buildStack();
  calcPrice();
  openStep('step2');
}

// ═══════════════════════════════════════════════════════════
// STEP 2: STACK
// ═══════════════════════════════════════════════════════════
function buildStack(){
  var opts=S.op==='wand'?[
    {val:'left',  label:'Left Stack',              desc:'All vanes stack to left side'},
    {val:'right', label:'Right Stack',             desc:'All vanes stack to right side'},
    {val:'center',label:'Traveling Center Stack',  desc:'Wand on each side — vanes draw from center'}
  ]:[
    {val:'left',  label:'Left Stack',      desc:'Vanes stack left'},
    {val:'right', label:'Right Stack',     desc:'Vanes stack right'},
    {val:'center',label:'Center Stack',    desc:'Vanes stack toward center (added Jan 2026)'},
    {val:'copen', label:'Center Opening',  desc:'Motorized only — two panels part from center outward'}
  ];
  document.getElementById('stack-opts').innerHTML=opts.map(function(o){
    return '<div class="opt-card'+(S.stack===o.val?' sel':'')+'" id="stk-'+o.val+'" onclick="pickStack(\''+o.val+'\')">'
      +'<div class="opt-card-title">'+o.label+'</div><div class="opt-card-desc">'+o.desc+'</div></div>';
  }).join('');
  // SBS toggle: wand only
  var sbsWrap=document.getElementById('sbs-wrap');
  if(sbsWrap) sbsWrap.style.display=S.op==='wand'?'flex':'none';
  document.getElementById('center-open-note').style.display=S.op==='motor'?'block':'none';
}

function pickStack(v){
  S.stack=v;
  document.querySelectorAll('#stack-opts .opt-card').forEach(function(c){c.classList.remove('sel');});
  var el=document.getElementById('stk-'+v);
  if(el) el.classList.add('sel');
  var labels={'left':'Left Stack','right':'Right Stack','center':'Traveling Center Stack','copen':'Center Opening'};
  markDone('step2',labels[v]||v); sp('sp-stack',labels[v]||v);
  calcDims();
  openStep('step3');
}

function onSBSChange(){calcDims();}

// ═══════════════════════════════════════════════════════════
// STEP 3: MOUNT
// ═══════════════════════════════════════════════════════════
function pickMount(el,m){
  S.mount=m;
  ['mc-wall','mc-ceiling','mc-pocket'].forEach(function(id){
    var e=document.getElementById(id); if(e) e.classList.remove('sel');
  });
  el.classList.add('sel');
  var lbl={'wall':'Wall Mount (L bracket)','ceiling':'Ceiling Mount','pocket':'Ceiling Pocket Mount'}[m]||'Outside Mount';
  markDone('step3',lbl); sp('sp-mount',lbl);
  openStep('step4');
}

function onDoorChange(){
  S.isDoor=document.getElementById('door-check').checked;
  document.getElementById('door-warn').style.display=S.isDoor?'block':'none';
}

// ═══════════════════════════════════════════════════════════
// STEP 4: DIMENSIONS
// ═══════════════════════════════════════════════════════════
function calcDims(){
  S.w=parseFloat(document.getElementById('inp-w').value)||0;
  S.h=parseFloat(document.getElementById('inp-h').value)||0;
  S.qty=parseInt(document.getElementById('inp-qty').value)||1;
  var msgEl=document.getElementById('dim-msg');
  var comp=document.getElementById('computed-panel');
  msgEl.innerHTML=''; comp.style.display='none';
  if(!S.w||!S.h) return;

  var isSBS=document.getElementById('sbs-check')&&document.getElementById('sbs-check').checked;
  var minW=isSBS?15.625:17.625;
  var maxW=isSBS?284.375:285.625;
  var errs=[];
  if(S.w<minW) errs.push('Min width '+(isSBS?'(side-by-side) ':'')+'is '+minW+'″.');
  if(S.w>maxW) errs.push('Max width '+(isSBS?'(side-by-side) ':'')+'is '+maxW+'″.');
  if(S.h<24) errs.push('Min height is 24″.');
  if(S.h>144) errs.push('Max height is 144″.');
  var area=(S.w/12)*(S.h/12);
  if(area>237) errs.push('Area '+area.toFixed(1)+' sq ft exceeds 237 sq ft maximum.');
  if(S.stack==='copen'&&S.w<30) errs.push('Center Opening minimum track width is 30″.');

  if(errs.length){
    msgEl.innerHTML=errs.map(function(e){return '<div class="msg-err">⚠ '+e+'</div>';}).join('');
    return;
  }

  msgEl.innerHTML='<div class="msg-ok">✓ '+S.w+'″ × '+S.h+'″ · '+area.toFixed(1)+' sq ft — within spec.</div>';
  comp.style.display='block';
  var joints=S.w<=97.625?0:S.w<=189.625?1:2;
  document.getElementById('cp-fabric').textContent=S.w+'″ (no deduction — outside mount)';
  document.getElementById('cp-joints').textContent=joints===0?'None (track ≤97⅝″)':joints===1?'1 SmartJoint™':'2 SmartJoints™';
  document.getElementById('cp-area').textContent=area.toFixed(1)+' sq ft';
  var dimsText=S.w+'″ × '+S.h+'″';
  markDone('step4',dimsText);
  sp('sp-dims',dimsText); sp('sp-qty',S.qty+' shade'+(S.qty>1?'s':''));
  calcPrice();
  openStep('step5');
}

// ═══════════════════════════════════════════════════════════
// STEP 5: LIGHT CONTROL
// ═══════════════════════════════════════════════════════════
function pickOpacity(o){
  S.opacity=o;
  S.fabric=null;
  document.getElementById('oc-lf').classList.toggle('sel',o==='lf');
  document.getElementById('oc-rd').classList.toggle('sel',o==='rd');
  document.getElementById('rd-warn').style.display=o==='rd'?'block':'none';
  var lbl=o==='lf'?'Light Filtering':'Room Darkening (+20%)';
  markDone('step5',lbl); sp('sp-opacity',lbl);
  sp('sp-fabric','—');
  document.getElementById('s6val').textContent='—';
  document.getElementById('step6').classList.remove('done');
  buildFabricGrid();
  calcPrice();
  openStep('step6');
}

// ═══════════════════════════════════════════════════════════
// STEP 6: FABRIC
// ═══════════════════════════════════════════════════════════
var activeColl='';
function buildFabricGrid(){
  var body=document.getElementById('fabric-body');
  if(!S.opacity){body.innerHTML='<div class="msg-info">Select light control first (step 5).</div>';return;}
  var colls=Object.keys(SD_FABRICS[S.opacity]);
  activeColl=activeColl&&SD_FABRICS[S.opacity][activeColl]?activeColl:colls[0];
  // Collection filter buttons
  var btns='<div class="coll-filter-row">'+colls.map(function(c){
    return '<button class="coll-btn'+(c===activeColl?' sel':'')+'" onclick="switchColl(\''+c+'\')">'+c+'</button>';
  }).join('')+'</div>';
  // Swatches for active collection
  var fabrics=SD_FABRICS[S.opacity][activeColl]||[];
  var swatches=fabrics.map(function(f){
    var isSel=S.fabric&&S.fabric.code===f.code;
    var isDark=isDark_(f.hex);
    return '<div class="swatch'+(isSel?' sel':'')+'" onclick="pickFabric(\''+f.code+'\',\''+f.name+'\',\''+activeColl+'\',\''+f.hw+'\',\''+f.hex+'\')">'
      +'<div class="swatch-color" style="background:'+f.hex+'"><span style="position:absolute;bottom:4px;right:5px;font-size:8px;color:'+(isDark?'rgba(255,255,255,.6)':'rgba(0,0,0,.4)')+'">'+f.code+'</span></div>'
      +'<div class="swatch-label"><div class="swatch-name">'+f.name+'</div><div class="swatch-hw" style="color:#ccc">hw: '+f.hw+'</div></div>'
      +'</div>';
  }).join('');
  body.innerHTML=btns+'<div class="fabric-grid">'+swatches+'</div>'
    +'<div class="msg-info" style="margin-top:10px;font-size:11px">Codes shown are verified from Norman Feb 2026 price book. Final color confirmed with swatches at quote.</div>';
}

function switchColl(c){
  activeColl=c;
  buildFabricGrid();
}

function isDark_(hex){
  var r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  return (0.299*r+0.587*g+0.114*b)<140;
}

function pickFabric(code,name,coll,hw,hex){
  S.fabric={code:code,name:name,coll:coll,hw:hw,hex:hex};
  if(!S.hw) S.hw=hw; // Set hardware default from fabric
  buildFabricGrid();
  markDone('step6',name+' · '+coll);
  sp('sp-fabric',name+' ('+code+') · '+coll);
  sp('sp-hw',S.hw||'Fabric default ('+hw+')');
  calcPrice();
  openStep('step7');
}

// ═══════════════════════════════════════════════════════════
// STEP 7: HARDWARE COLOR
// ═══════════════════════════════════════════════════════════
function pickHW(el,color){
  S.hw=color;
  document.querySelectorAll('#hw-color-grid .opt-card').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  markDone('step7',color); sp('sp-hw',color);
}

// ═══════════════════════════════════════════════════════════
// STEP 8: ACCESSORIES
// ═══════════════════════════════════════════════════════════
function updateAcc(){
  var ids=['acc-keystone','acc-extra-wand','acc-alt-colors','acc-vane-pack','acc-shims','acc-long-bracket','acc-charge-wand'];
  var labels={
    'acc-keystone':'Keystones',
    'acc-extra-wand':'Additional wand',
    'acc-alt-colors':'Alternating colors',
    'acc-vane-pack':'Additional vane pack',
    'acc-shims':'Aluminum shims',
    'acc-long-bracket':'Long L brackets',
    'acc-charge-wand':'Charging Extension Wand'
  };
  var checked=[];
  ids.forEach(function(id){
    var el=document.getElementById(id);
    if(el&&el.checked) checked.push(labels[id]);
  });
  S.accs=checked;
  sp('sp-acc',checked.length>0?checked.join(', '):'None');
  calcPrice();
}

// ═══════════════════════════════════════════════════════════
// STEP 9: DELIVERY
// ═══════════════════════════════════════════════════════════
function pickDel(d){
  S.delivery=d;
  document.getElementById('del-ship').classList.toggle('sel',d==='ship');
  document.getElementById('del-pickup').classList.toggle('sel',d==='pickup');
}

// ═══════════════════════════════════════════════════════════
// PRICE CALCULATION
// ═══════════════════════════════════════════════════════════
function calcPrice(){
  if(!S.w||!S.h||!S.opacity){
    document.getElementById('price-pending').style.display='block';
    document.getElementById('price-box').style.display='none';
    return;
  }
  var base=lookupPrice(S.w,S.h);
  if(!base){
    document.getElementById('price-pending').style.display='block';
    document.getElementById('price-box').style.display='none';
    return;
  }
  document.getElementById('price-pending').style.display='none';
  document.getElementById('price-box').style.display='block';

  var per=base;
  document.getElementById('pr-base').textContent='$'+base.toLocaleString();
  // RD surcharge
  var isRD=S.opacity==='rd';
  var rdAdd=isRD?Math.round(base*0.20):0;
  document.getElementById('pr-rd-row').style.display=isRD?'flex':'none';
  if(isRD) document.getElementById('pr-rd').textContent='+$'+rdAdd;
  per+=rdAdd;
  // Alternating colors
  var isAlt=document.getElementById('acc-alt-colors')&&document.getElementById('acc-alt-colors').checked;
  var altAdd=isAlt?Math.round(base*0.10):0;
  document.getElementById('pr-alt-row').style.display=isAlt?'flex':'none';
  if(isAlt) document.getElementById('pr-alt').textContent='+$'+altAdd;
  per+=altAdd;
  // Motor
  var isMotor=S.op==='motor';
  document.getElementById('pr-motor-row').style.display=isMotor?'flex':'none';
  if(isMotor) per+=642;
  // Total
  document.getElementById('pr-qty').textContent=S.qty+' shade'+(S.qty>1?'s':'');
  document.getElementById('pr-total').textContent='~$'+Math.round(per*S.qty).toLocaleString();
}

// ═══════════════════════════════════════════════════════════
// SUBMIT
// ═══════════════════════════════════════════════════════════
function getOpt(id){var e=document.getElementById(id);return e?e.textContent.trim():'';}

async function submitQuote(){
  var name=document.getElementById('q-name').value.trim();
  var email=document.getElementById('q-email').value.trim();
  var phone=document.getElementById('q-phone').value.trim();
  var err=document.getElementById('q-err');
  if(!name){err.textContent='Please enter your name.';err.style.display='block';return;}
  if(!email||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){err.textContent='Please enter a valid email address.';err.style.display='block';return;}
  err.style.display='none';
  var stackLabels={'left':'Left Stack','right':'Right Stack','center':'Traveling Center Stack','copen':'Center Opening'};
  var mountLabels={'wall':'Wall Mount (L bracket)','ceiling':'Ceiling Mount','pocket':'Ceiling Pocket Mount'};
  var isSBS=document.getElementById('sbs-check')&&document.getElementById('sbs-check').checked;
  var joints=S.w<=97.625?0:S.w<=189.625?1:2;
  var selections=[
    {label:'Product',value:'Norman SmartDrape™'},
    {label:'Operation',value:S.op==='wand'?'Wand Tilt':'Motorized — Norman Smart'},
    {label:'Stack',value:stackLabels[S.stack]||S.stack},
    {label:'Side by side',value:isSBS?'Yes':'No'},
    {label:'Mount',value:mountLabels[S.mount]||S.mount},
    {label:'Track width',value:(S.w||'—')+'″'},
    {label:'Height',value:(S.h||'—')+'″'},
    {label:'SmartJoints',value:joints===0?'None':joints===1?'1 SmartJoint™':'2 SmartJoints™'},
    {label:'Quantity',value:String(S.qty)},
    {label:'Light control',value:S.opacity==='lf'?'Light Filtering':'Room Darkening'},
    {label:'Collection',value:S.fabric?S.fabric.coll:'—'},
    {label:'Color',value:S.fabric?S.fabric.name:'—'},
    {label:'Fabric code',value:S.fabric?S.fabric.code:'—'},
    {label:'Hardware color',value:S.hw&&S.hw!==(S.fabric?S.fabric.hw:'')?S.hw:'Fabric default'},
    {label:'Accessories',value:S.accs.length>0?S.accs.join(', '):'None'},
    {label:'Delivery',value:S.delivery==='ship'?'Ship to me':'Will pick up (Huntingdon Valley, PA)'}
  ];
  if(S.isDoor) selections.push({label:'Application',value:'Patio door/slider'});
  var notes=document.getElementById('q-notes').value.trim();
  var btn=document.querySelector('#quote-form .btn-gold');
  if(btn){btn.disabled=true;btn.textContent='Sending…';}
  try{
    var resp=await fetch('/api/quote',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:name,email:email,phone:phone,product:'Norman SmartDrape™',selections:selections,notes:notes})});
    var data={};try{data=await resp.json();}catch(e){}
    if(!resp.ok) throw new Error(data.error||'Server error');
    document.getElementById('quote-success').style.display='block';
    var form=document.getElementById('quote-form'); if(form) form.style.display='none';
  }catch(err2){
    if(btn){btn.disabled=false;btn.textContent='Submit SmartDrape™ Specification & Request Quote →';}
    err.innerHTML=(err2.message&&err2.message.length<200?err2.message+'<br>':'')+'Please email <a href="mailto:justin@blindznation.com">justin@blindznation.com</a> or call (609) 742-1720.';
    err.style.display='block';
  }
}

// ═══════════════════════════════════════════════════════════
// INIT — called AFTER all function and state definitions
// ═══════════════════════════════════════════════════════════
(function(){
  // Pre-select defaults and mark step3 done (wall mount pre-selected)
  pickOp('wand');        // operation → builds stack options → opens step2
  pickStack('left');     // stack → opens step3
  // Mount is pre-selected (wall) — mark done
  markDone('step3','Wall Mount (L bracket)');
  openStep('step4');
})();