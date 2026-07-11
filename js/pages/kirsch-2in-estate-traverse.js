// ═══════════════════════════════════════════════════════════
// DATA
// ═══════════════════════════════════════════════════════════
var DM_FINISHES = [
  {name:'Antique Silver',  hex:'#B0ACA8'},
  {name:'Elegant Brass',   hex:'#C8A840'},
  {name:'Gunmetal',        hex:'#606060'},
  {name:'Black',           hex:'#222222'},
  {name:'Polished Nickel', hex:'#D4D4D0'},
  {name:'Brushed Bronze',  hex:'#9A7A60'},
  {name:'Gilded Bronze',   hex:'#B08040'},
  {name:'Satin Nickel',    hex:'#C0BCBC'}
];
var WT_FINISHES = [
  {name:'Black',            hex:'#222222'},
  {name:'Mahogany',         hex:'#6B2A18'},
  {name:'Dark Chocolate',   hex:'#3A1E10'},
  {name:'Truffle',          hex:'#7A5040'},
  {name:'Coffee',           hex:'#5C3620'},
  {name:'Marble',           hex:'#D0C8C0'},
  {name:'Estate Oak',       hex:'#C09860'},
  {name:'White',            hex:'#F5F5F0'}
];
var WI_FINISHES = [
  {name:'Black',            hex:'#222222'},
  {name:'Iron Oxide',       hex:'#6B3820'},
  {name:'Golden Heirloom',  hex:'#C8A030'},
  {name:'Graphite',         hex:'#505050'},
  {name:'Chalk',            hex:'#E8E4E0'},
  {name:'Rust',             hex:'#A04020'}
];
var STRATTA_FINISHES = [
  {name:'Antique Silver', hex:'#B0ACA8', item:'1832210'},
  {name:'Elegant Brass',  hex:'#C8A840', item:'1043919'},
  {name:'Polished Nickel',hex:'#D4D4D0', item:'1832216'},
  {name:'Black',          hex:'#222222', item:'1832211A'},
  {name:'Gilded Bronze',  hex:'#B08040', item:'1832214'},
  {name:'Satin Nickel',   hex:'#C0BCBC', item:'1832217'},
  {name:'Brushed Bronze', hex:'#9A7A60', item:'1832212'},
  {name:'Gunmetal',       hex:'#606060', item:'1043963'}
];

// Pleated stackback table (4 carriers/ft, 2.5x fullness) from Kirsch 2026 price guide
// [track_inches, stackback_oneway, stackback_twoway_per_side]
var PLEATED_STACK = [
  [18,8.75,null],[24,9.25,null],[30,11.75,8.75],[36,14.5,10],[42,15.75,10.5],
  [48,17,11.25],[54,18.5,12],[60,19.75,12.5],[66,21,13.25],[72,22.25,14],
  [78,23.75,14.5],[84,25,15.25],[90,26.25,16],[96,27.5,16.5],[102,29,17.25],
  [108,30.25,18],[114,31.5,18.5],[120,33,19.25],[126,34.25,19.75],[132,35.5,20.5],
  [138,36.75,21.25],[144,38.25,21.75],[150,39.5,22.5],[156,40.75,23.25],
  [162,42.25,23.75],[168,43.5,24.5],[174,44.75,25.25],[180,46,25.75],
  [186,47.5,26.5],[192,48.75,27]
];

// STATE
var S = {
  coll:null, finish:null,
  draw:null, isMotor:false,
  heading:null, fullness:null,
  mount:null, brktFinish:null,
  len:0, dir:'oneway',
  finial:null, finialFinish:null,
  swivelSocket:false,
  remote15:false, gateway:false, wallswitch:false, wallswitchSurf:false,
  cable15:false, cable4:false, cable10:false, cable20:false,
  qty:1, del:'ship'
};

// ═══════════════════════════════════════════════════════════
// BUILD FINISH GRIDS
// ═══════════════════════════════════════════════════════════
function buildFinishGrid(arr, gridId, onclick_fn, itemFn) {
  var g = document.getElementById(gridId);
  g.innerHTML = arr.map(function(f) {
    var isDark = isDarkHex(f.hex);
    var itemStr = itemFn ? ' · '+itemFn(f) : '';
    return '<div class="fin-chip" onclick="'+onclick_fn+'(this,\''+f.name+'\',\''+f.hex+'\')">'
      +'<div class="fin-dot" style="background:'+f.hex+'"></div>'
      +f.name+itemStr+'</div>';
  }).join('');
}
function isDarkHex(h){var r=parseInt(h.slice(1,3),16),g=parseInt(h.slice(3,5),16),b=parseInt(h.slice(5,7),16);return(0.299*r+0.587*g+0.114*b)<140;}

buildFinishGrid(DM_FINISHES,'fin-dm-grid','pickDMFin',null);
buildFinishGrid(WT_FINISHES,'fin-wt-grid','pickWTFin',null);
buildFinishGrid(WI_FINISHES,'fin-wi-grid','pickWIFin',null);
buildFinishGrid(STRATTA_FINISHES,'stratta-fin-grid','pickStrattaFin',function(f){return f.item;});

// ═══════════════════════════════════════════════════════════
// STEP HELPERS
// ═══════════════════════════════════════════════════════════
function toggleStep(id){document.getElementById(id).classList.toggle('open');}
function openStep(id){var e=document.getElementById(id);e.classList.add('active','open');}
function markDone(id,txt){var e=document.getElementById(id);e.classList.add('done');var v=document.getElementById(id.replace('step','s')+'val');if(v&&txt)v.textContent=txt;}
function sp(id,val){var e=document.getElementById(id);if(e){e.textContent=val||'—';}}

// ═══════════════════════════════════════════════════════════
// STEP 1: COLLECTION & FINISH
// ═══════════════════════════════════════════════════════════
function pickColl(el,coll){
  S.coll=coll; S.finish=null;
  document.querySelectorAll('#step1 .opt-btn').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  ['fin-dm','fin-wt','fin-wi'].forEach(function(id){document.getElementById(id).style.display='none';});
  document.getElementById('fin-'+coll).style.display='block';
  var collNames={dm:'Designer Metals',wt:'Wood Trends',wi:'Wrought Iron'};
  sp('sp-coll',collNames[coll]);
  sp('sp-fin','— select finish below');
  document.getElementById('s1val').textContent=collNames[coll];
}
function pickFinish(name){
  S.finish=name; sp('sp-fin',name);
  markDone('step1',S.coll+' · '+name);
  updateSpec();
  openStep('step2');
}
function pickDMFin(el,name){clearFinChips('fin-dm-grid');el.classList.add('sel');pickFinish(name);}
function pickWTFin(el,name){clearFinChips('fin-wt-grid');el.classList.add('sel');pickFinish(name);}
function pickWIFin(el,name){clearFinChips('fin-wi-grid');el.classList.add('sel');pickFinish(name);}
function clearFinChips(id){document.querySelectorAll('#'+id+' .fin-chip').forEach(function(c){c.classList.remove('sel');});}

// ═══════════════════════════════════════════════════════════
// STEP 2: DRAW TYPE
// ═══════════════════════════════════════════════════════════
function pickDraw(el,key,label){
  S.draw=key; S.isMotor=(key==='motor');
  document.querySelectorAll('#step2 .opt-btn').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  document.getElementById('motor-detail').style.display=S.isMotor?'block':'none';
  markDone('step2',label); sp('sp-draw',label);
  updateSpec();
  openStep('step3');
}
function toggleAddon(el,key){
  el.classList.toggle('sel'); S[key]=el.classList.contains('sel');
  var c=el.querySelector('.addon-check');
  if(c){c.style.background=S[key]?'var(--gold)':'';c.style.borderColor=S[key]?'var(--gold)':'#ccc';c.style.color=S[key]?'#111110':'transparent';}
  updateSpec();
}

// ═══════════════════════════════════════════════════════════
// STEP 3: HEADING
// ═══════════════════════════════════════════════════════════
function pickHeading(el,key,label){
  S.heading=key; S.fullness=null;
  document.querySelectorAll('#step3 .opt-btn').forEach(function(c){if(!c.closest('#ripplefold-opts'))c.classList.remove('sel');});
  el.classList.add('sel');
  document.getElementById('ripplefold-opts').style.display=key==='ripplefold'?'block':'none';
  if(key==='ripplefold'){document.getElementById('s3val').textContent='Ripplefold™ — select fullness';}
  else{markDone('step3',label);sp('sp-heading',label);updateSpec();if(S.len>0)buildStackback(S.len);openStep('step4');}
  document.getElementById('sp-fullness-row').style.display=key==='ripplefold'?'flex':'none';
}
function pickFullness(el,pct){
  S.fullness=pct;
  document.querySelectorAll('#ripplefold-opts .opt-btn').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  var lbl='Ripplefold™ '+pct+'%';
  markDone('step3',lbl); sp('sp-heading','Ripplefold™'); sp('sp-fullness',pct+'% fullness');
  updateSpec(); if(S.len>0)buildStackback(S.len); openStep('step4');
}

// ═══════════════════════════════════════════════════════════
// STEP 4: MOUNT
// ═══════════════════════════════════════════════════════════
function pickMount(el,key,label){
  S.mount=key;
  document.querySelectorAll('#step4 .opt-btn').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  document.getElementById('wall-bracket-opts').style.display=key==='wall'?'block':'none';
  document.getElementById('ceiling-mount-note').style.display=key==='ceiling'?'block':'none';
  document.getElementById('dbl-wall-note').style.display=key==='dbl-wall'?'block':'none';
  document.getElementById('dbl-combo-note').style.display=key==='dbl-combo'?'block':'none';
  markDone('step4',label); sp('sp-mount',label);
  updateSpec(); openStep('step6');
}
function pickBrktFinish(el,name){
  document.querySelectorAll('#wall-bracket-opts .fin-chip').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel'); S.brktFinish=name; sp('sp-brkt',name); updateSpec();
}

// ═══════════════════════════════════════════════════════════
// STEP 5: TRACK LENGTH
// ═══════════════════════════════════════════════════════════
function pickDrawDir(el,key,label){
  S.dir=key;
  ['draw-oneway','draw-twoway'].forEach(function(id){document.getElementById(id).classList.remove('sel');});
  el.classList.add('sel'); sp('sp-dir',label); calcTrack();
}

function calcTrack(){
  var len=parseFloat(document.getElementById('track-len').value)||0;
  S.len=len;
  var msg=document.getElementById('track-msg');
  var bracketPlan=document.getElementById('bracket-plan');
  var spliceNote=document.getElementById('splice-note');
  var stackPanel=document.getElementById('stackback-panel');
  msg.innerHTML=''; bracketPlan.style.display='none'; spliceNote.style.display='none'; stackPanel.style.display='none';
  if(!len) return;
  if(len<18){msg.innerHTML='<div class="msg-err">⚠ Minimum track length is 18″.</div>';return;}
  if(len>192){msg.innerHTML='<div class="msg-err">⚠ Maximum track length is 16 ft (192″). Kirsch does not offer longer individual tracks.</div>';return;}
  var lenFt=(len/12).toFixed(2);
  msg.innerHTML='<div class="msg-ok">✓ '+len+'″ ('+lenFt+' ft) — within specification.</div>';
  // Splice check
  if(len>96){
    spliceNote.innerHTML='⚠ Track over 8 ft ('+len+'″) will be factory-spliced. One splice and one Keystone cover piece are included.';
    spliceNote.style.display='block';
    document.getElementById('sp-warn-splice').style.display='block';
  } else {
    document.getElementById('sp-warn-splice').style.display='none';
  }
  // Bracket spacing plan
  buildBracketPlan(len);
  // Stack-back estimate
  buildStackback(len);
  sp('sp-len',len+'″ ('+(len/12).toFixed(1)+' ft)');
  sp('sp-dir',S.dir==='oneway'?'One-Way':'Two-Way (Split)');
  markDone('step5',len+'″ · '+(S.dir==='oneway'?'One-Way':'Two-Way'));
  updateSpec();
  openStep('step1');
}

function buildBracketPlan(len){
  var isOneway=(S.dir==='oneway');
  var plan=[];
  var cur=0;
  // First bracket at 0 (left end)
  plan.push({pos:0,note:'End bracket — left'});
  if(isOneway){
    // Stack side (assume left stack for simplicity) — next bracket at max 24" from end
    if(len>24){plan.push({pos:24,note:'Stack bracket — max 24″ from end'});}
    var next=isOneway?24:0;
    // Right end bracket
    while(next+48 < len){next+=48;plan.push({pos:Math.round(next),note:'At 48″ intervals'});}
    plan.push({pos:Math.round(len),note:'End bracket — right'});
  } else {
    // Two-way: both ends are stack sides
    var r=Math.round(Math.min(24,len));
    plan.push({pos:r,note:'Stack bracket — max 24″ from left end'});
    var p2=Math.round(len-Math.min(24,len));
    if(p2>r) plan.push({pos:p2,note:'Stack bracket — max 24″ from right end'});
    // Fill 48" intervals in middle
    var cur2=r;
    while(cur2+48<p2){cur2+=48;plan.push({pos:Math.round(cur2),note:'At 48″ intervals'});}
    plan.push({pos:Math.round(len),note:'End bracket — right'});
  }
  // Sort by position and deduplicate
  plan.sort(function(a,b){return a.pos-b.pos;});
  var seen={};
  plan=plan.filter(function(p){if(seen[p.pos])return false;seen[p.pos]=true;return true;});
  var html='<thead><tr><th>Bracket #</th><th>Position from left</th><th>Note</th></tr></thead><tbody>';
  plan.forEach(function(p,i){
    html+='<tr><td>'+(i+1)+'</td><td>'+p.pos+'″'+(p.pos===0?'':' ('+( p.pos/12).toFixed(1)+'ft')+(p.pos>0?')':'')+'</td><td>'+p.note+'</td></tr>';
  });
  html+='</tbody>';
  document.getElementById('brkt-table').innerHTML=html;
  document.getElementById('bracket-plan').style.display='block';
}

function buildStackback(len){
  if(!S.heading) return;
  var panel=document.getElementById('stackback-panel');
  var content=document.getElementById('stackback-content');
  // Find closest stack data
  var row=PLEATED_STACK.find(function(r){return r[0]>=len;});
  if(!row) row=PLEATED_STACK[PLEATED_STACK.length-1];
  if(S.heading==='pleated'){
    var ow=row[1]; var tw=row[2];
    content.innerHTML='<div class="wt-result">'
      +'<div>At 4 carriers/ft, 2½× fullness:</div>'
      +'<div style="display:flex;gap:20px;margin-top:6px">'
      +'<div><div style="font-size:16px;font-weight:600;color:var(--espresso)">'+(ow||'—')+'″</div><div style="font-size:11px;color:#666">One-way stack</div></div>'
      +(tw?'<div><div style="font-size:16px;font-weight:600;color:var(--espresso)">'+tw+'″</div><div style="font-size:11px;color:#666">Per side (two-way)</div></div>':'')
      +'</div></div>';
    panel.style.display='block';
  } else if(S.heading==='ripplefold'&&S.fullness){
    // Ripplefold stackback is ~1/3 of track for 100%
    var stackFactor={120:0.22,100:0.19,80:0.16,60:0.13}[S.fullness]||0.19;
    var rfStack=Math.round(len*stackFactor*10)/10;
    content.innerHTML='<div class="wt-result">'
      +'<div>Ripplefold™ '+S.fullness+'% fullness (approx):</div>'
      +'<div style="display:flex;gap:20px;margin-top:6px">'
      +'<div><div style="font-size:16px;font-weight:600;color:var(--espresso)">'+rfStack+'″</div><div style="font-size:11px;color:#666">One-way stack (est.)</div></div>'
      +'<div><div style="font-size:16px;font-weight:600;color:var(--espresso)">'+(Math.round(rfStack/2*10)/10)+'″</div><div style="font-size:11px;color:#666">Per side (two-way, est.)</div></div>'
      +'</div><div style="font-size:10px;color:#888;margin-top:4px">For exact Ripplefold™ stack data, see Kirsch Ripplefold Fabrication Manual (snap tape length varies by vane count and fullness).</div></div>';
    panel.style.display='block';
  }
}

// ═══════════════════════════════════════════════════════════
// STEP 6: FINIAL
// ═══════════════════════════════════════════════════════════
function pickFinial(el,key,label){
  S.finial=key;
  document.querySelectorAll('#step6 > .step-body > .opt-row .opt-btn').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  document.getElementById('stratta-finishes').style.display=key==='stratta'?'block':'none';
  if(key==='none'){markDone('step6','No finial / endcap only');sp('sp-finial','Endcap only');updateSpec();openStep('step7');}
  else{document.getElementById('s6val').textContent='Stratta — select finish';}
}
function pickStrattaFin(el,name){
  document.querySelectorAll('#stratta-fin-grid .fin-chip').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel'); S.finialFinish=name;
  markDone('step6','Stratta · '+name); sp('sp-finial','Stratta · '+name);
  updateSpec(); openStep('step7');
}

// ═══════════════════════════════════════════════════════════
// STEP 7: DRAPERY WEIGHT
// ═══════════════════════════════════════════════════════════
document.getElementById('wt-ozPerYd').addEventListener('change',function(){
  document.getElementById('wt-custom-row').style.display=this.value==='custom'?'block':'none';
  calcWeight();
});
function calcWeight(){
  var yards=parseFloat(document.getElementById('wt-yards').value)||0;
  var width=parseFloat(document.getElementById('wt-width').value)||0;
  var ozSel=document.getElementById('wt-ozPerYd').value;
  var oz=ozSel==='custom'?(parseFloat(document.getElementById('wt-custom-oz').value)||0):parseFloat(ozSel)||0;
  var liningYards=parseFloat(document.getElementById('wt-lining-yards').value)||0;
  if(!yards||!width||!oz){document.getElementById('wt-result').style.display='none';return;}
  var sqYds=(yards*36*width)/1296;
  var lbs=(sqYds*oz)/16;
  var liningLbs=0;
  if(liningYards>0){var linSqYds=(liningYards*36*width)/1296;liningLbs=(linSqYds*3)/16;}
  var total=Math.round((lbs+liningLbs)*10)/10;
  var perFt=S.len>0?Math.round((total/(S.len/12))*10)/10:null;
  document.getElementById('wt-result').style.display='block';
  document.getElementById('wt-result-lbs').textContent=total+' lbs'+(liningLbs>0?' (fabric '+Math.round(lbs*10)/10+' + lining '+Math.round(liningLbs*10)/10+')'  :'');
  var over=total>64||(perFt&&perFt>4);
  document.getElementById('wt-result-status').innerHTML=over
    ?'<div class="msg-err" style="margin-top:4px">⚠ Exceeds maximum: 64 lbs total or 4 lbs/ft. Reduce fabric or use multiple rods.</div>'
    :'<div class="msg-ok" style="margin-top:4px">✓ Within rod capacity (64 lbs max / 4 lbs per ft)</div>';
  document.getElementById('sp-warn-wt').style.display=over?'block':'none';
  document.getElementById('wt-formula').textContent='SqYds='+sqYds.toFixed(1)+' · '+oz+'oz/sqyd · '+lbs.toFixed(1)+' lbs fabric'+(liningYards>0?' + '+liningLbs.toFixed(1)+' lbs lining':'')+( perFt?' · '+perFt+' lbs/ft':'');
}

// ═══════════════════════════════════════════════════════════
// STEP 8: DELIVERY
// ═══════════════════════════════════════════════════════════
function pickDel(el,key){
  S.del=key;
  document.querySelectorAll('#step8 .opt-btn').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  markDone('step8',(parseInt(document.getElementById('qty').value)||1)+' rod(s) · '+(key==='ship'?'Ship':'Pickup'));
  updateSpec();
}

// ═══════════════════════════════════════════════════════════
// SPEC UPDATE
// ═══════════════════════════════════════════════════════════
function updateSpec(){
  var qty=parseInt(document.getElementById('qty').value)||1;
  sp('sp-qty',qty+' rod'+(qty>1?'s':''));
  document.getElementById('s8val').textContent=qty+' rod'+(qty>1?'s':'')+' · '+'Ship';
}
// Shared canonical qty stepper — reuses id "qty" + updateSpec handler
function adjQty(d){
  var el=document.getElementById('qty'); if(!el) return;
  var v=(parseInt(el.value,10)||1)+d;
  if(v<1)v=1; if(v>50)v=50;
  el.value=v; updateSpec();
}

// ═══════════════════════════════════════════════════════════
// SUBMIT
// ═══════════════════════════════════════════════════════════
function submitQuote(){
  var name=document.getElementById('cf-name').value.trim();
  var phone=document.getElementById('cf-phone').value.trim();
  var err=document.getElementById('cf-contact-err');
  if(!name||!phone){err.textContent='Please enter your name and phone number.';err.style.display='block';return;}
  err.style.display='none';
  var qty=parseInt(document.getElementById('qty').value)||1;
  var motorAccs=[];
  if(S.remote15) motorAccs.push('15-ch RF Remote ($47.85)');
  if(S.gateway) motorAccs.push('AMP Gateway USB Bridge ($141.33)');
  if(S.wallswitch) motorAccs.push('Wall Switch recessed ($38.59)');
  if(S.wallswitchSurf) motorAccs.push('Wall Switch Surface ($61.75)');
  if(S.cable15) motorAccs.push('15″ Cable ($6.57)');
  if(S.cable4) motorAccs.push("4′ Cable ($7.40)");
  if(S.cable10) motorAccs.push("10′ Cable ($11.01)");
  if(S.cable20) motorAccs.push("20′ Cable ($15.93)");
  var lines=[
    'KIRSCH 2″ ESTATE™ TRAVERSE ROD — QUOTE REQUEST','',
    'PRODUCT:',
    'Rod: Kirsch 2″ Estate™ Traverse Rod',
    'Track model: 83601 / 93601',
    'Finish collection: '+(S.coll==='dm'?'Designer Metals':S.coll==='wt'?'Wood Trends':'Wrought Iron')||(S.coll||'—'),
    'Finish: '+(S.finish||'—'),
    '',
    'CONFIGURATION:',
    'Draw type: '+(S.draw==='hand'?'Hand Draw':S.draw==='cord'?'Cord Draw':S.draw==='baton'?'Baton Draw':S.draw==='duplex'?'Duplex Baton (split — one baton moves both panels)':S.draw==='motor'?'AMP™ Motorized':S.draw||'—'),
    (S.isMotor?'AMP™ motor upcharge: +$621/rod (charger #62201300 included)':''),
    (S.isMotor&&motorAccs.length?'AMP™ accessories: '+motorAccs.join(', '):''),
    'Drapery heading: '+(S.heading==='pleated'?'Pleated':S.heading==='ripplefold'?('Ripplefold™ '+S.fullness+'% fullness'):S.heading||'—'),
    'Mount type: '+(S.mount==='wall'?'Wall mount (all components included)':S.mount==='ceiling'?'Ceiling mount (94130xxx included; order #1796061 separately)':S.mount==='dbl-wall'?'Double Wall mount (94125xxx + #1796061 + 94130xxx)':S.mount==='dbl-combo'?'2″ Front + 1⅜″ Back Double (94130xxx + #71134110)':S.mount||'—'),
    (S.brktFinish?'Wall bracket finish: '+S.brktFinish:''),
    'Track length: '+(S.len?S.len+'″ ('+( S.len/12).toFixed(1)+' ft)':'—'),
    'Draw direction: '+(S.dir==='oneway'?'One-Way':'Two-Way (Split Draw)'),
    (S.len>96?'NOTE: Track over 8 ft — will be factory-spliced. One Keystone provided.':''),
    'Finial: '+(S.finial==='stratta'?('Stratta · '+(S.finialFinish||'finish TBD')):S.finial==='none'?'Endcap only':'—'),
    (S.swivelSocket?'Swivel Socket: Yes (+$23.13/piece)':''),
    '',
    'QUANTITY & DELIVERY:',
    'Qty: '+qty+' rod'+(qty>1?'s':''),
    'Delivery: '+'Ship (UPS/FedEx)',
    '',
    'NOTES:',
    document.getElementById('cf-notes').value.trim()||'None',
    '',
    'CUSTOMER:',
    'Name: '+name,'Phone: '+phone,
    'Email: '+(document.getElementById('cf-email').value.trim()||'—')
  ].filter(function(l){return l!==null&&l!==undefined;}).join('\n');
  window.location.href='mailto:blindznation@gmail.com?subject='+encodeURIComponent('Kirsch 2″ Estate Traverse Rod — '+name)+'&body='+encodeURIComponent(lines);
  document.getElementById('success-box').style.display='block';
}

function addKirsch2InEstatToCart() {
  var finish = S.finish || '—';
  var coll = S.coll === 'dm' ? 'Designer Metals' : S.coll === 'wt' ? 'Wood Trends' : 'Wrought Iron';
  var len = S.len ? S.len + '″' : '—';
  var qty = parseInt((document.getElementById('qty')||{}).value) || 1;
  var lines = [
    { label: 'Product', value: 'Kirsch 2″ Estate™ Traverse Rod' },
    { label: 'Collection', value: coll },
    { label: 'Finish', value: finish },
    { label: 'Track Length', value: len },
    { label: 'Draw', value: S.draw || '—' },
    { label: 'Quantity', value: String(qty) }
  ];
  pbAddToCart({ product: 'Kirsch 2″ Estate™ Traverse Rod', lines: lines, specs: lines.map(function(l){ return l.label+': '+l.value; }).join(' | '), qty: qty });
  pbOpenCart();
}

// INIT — pre-select one-way draw direction
document.getElementById('draw-oneway').classList.add('sel');
