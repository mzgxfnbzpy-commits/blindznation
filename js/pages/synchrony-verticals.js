// ── PRICING DATA ──────────────────────────────────────────────────────────────
const W_COLS=[24,36,48,60,72,84,92,100];
const H_ROWS=[48,60,72,84,96,108];
const MATRICES={
  1:{48:[204,251,303,346,398,434,492,559],60:[217,261,321,366,417,460,519,590],72:[224,279,341,386,440,477,546,623],84:[240,294,361,404,463,501,572,651],96:[247,304,376,428,486,534,601,682],108:[255,319,396,446,511,557,632,714]},
  2:{48:[244,301,365,417,477,522,594,674],60:[260,319,391,440,501,549,624,708],72:[271,335,412,465,529,580,659,746],84:[288,351,433,488,559,609,685,787],96:[298,367,454,511,585,636,724,823],108:[307,386,472,539,614,668,760,862]},
  3:{48:[272,347,421,462,532,581,661,747],60:[288,354,435,488,560,612,697,789],72:[299,375,454,517,586,643,735,829],84:[318,389,482,543,617,675,766,874],96:[328,404,507,573,655,708,808,913],108:[346,428,529,601,681,744,845,965]},
  4:{48:[319,394,480,549,633,692,781,888],60:[338,423,514,580,664,730,829,938],72:[359,441,543,614,696,764,866,988],84:[374,463,573,649,736,800,911,1037],96:[394,486,598,679,776,842,958,1089],108:[406,510,629,710,811,888,1001,1141]}
};

let state={group:null,collection:null,colorName:null,vane:null,mount:null,w:0,h:0,shim:false,shimQty:1,qty:1,del:null,wand:'No preference'};

function toggleStep(id){
  const b=document.getElementById(id);
  b.classList.toggle('open',!b.classList.contains('open'));
  b.classList.toggle('active',!b.classList.contains('active')||b.classList.contains('open'));
}
function markDone(id){document.getElementById(id).classList.add('done');}

function pickFabric(el,collection,colorName,group){
  document.querySelectorAll('#step1 .color-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  state.group=group;
  state.collection=collection;
  state.colorName=colorName;
  state.vane=el.dataset.vane||'Traditional Curved';
  document.getElementById('s1val').textContent=collection+' — '+colorName;
  markDone('step1');
  calcPrice();
}

// Legacy alias in case anything still references pickGroup
function pickGroup(el,g,label){}
function pickMount(el,key,label){
  document.querySelectorAll('#step2 .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  state.mount=key;
  document.getElementById('s2val').textContent=label;
  markDone('step2');
  const note=document.getElementById('mount-note');
  const msgs={
    inside:'Inside mount (fully flushed): min depth 3¾″. Mfr deducts 3/8″ W and 3/16″ H.',
    semi:'Semi-inside mount: min depth 2 13/16″. Mfr deducts 3/8″ W and 3/16″ H.',
    outside:'Outside mount: no deductions. Add ~1½″ each side to minimize light leakage. Total projection: 3¾″–4⅛″.'
  };
  note.style.display='block';
  note.textContent=msgs[key]||'';
  // Shims: outside mount only per Norman spec
  const shimAddon=document.getElementById('shim-addon');
  const shimNa=document.getElementById('shim-na-note');
  if(key!=='outside'){
    if(shimAddon){shimAddon.style.opacity='0.35';shimAddon.style.pointerEvents='none';shimAddon.classList.remove('sel');}
    if(shimNa)shimNa.style.display='block';
    state.shim=false;document.getElementById('shim-qty-wrap').style.display='none';
    document.getElementById('shim-check').style.color='transparent';
  } else {
    if(shimAddon){shimAddon.style.opacity='';shimAddon.style.pointerEvents='';}
    if(shimNa)shimNa.style.display='none';
  }
  calcPrice();
}

function calcPrice(){
  const wW=parseFloat(document.getElementById('w-whole').value)||0;
  const wF=parseFloat(document.getElementById('w-frac').value)||0;
  const hW=parseFloat(document.getElementById('h-whole').value)||0;
  const hF=parseFloat(document.getElementById('h-frac').value)||0;
  state.w=wW+wF; state.h=hW+hF;
  const dimMsg=document.getElementById('dim-msg');
  const sizeBox=document.getElementById('size-box');
  dimMsg.style.display='none'; sizeBox.style.display='none';
  if(!state.w||!state.h){updateQuote();return;}
  if(state.w<18||state.w>100||state.h<36||state.h>108){
    dimMsg.className='msg-box msg-err';
    dimMsg.textContent='Size out of range. Width 18″–100″, Height 36″–108″.';
    dimMsg.style.display='block';
    updateQuote();return;
  }
  const wCol=W_COLS.find(c=>c>=state.w);
  const hRow=H_ROWS.find(r=>r>=state.h);
  if(!wCol||!hRow){
    dimMsg.className='msg-box msg-err';
    dimMsg.textContent='Exceeds the largest pricing bracket. Call (609) 742-1720 for a custom quote.';
    dimMsg.style.display='block';
    updateQuote();return;
  }
  document.getElementById('s3val').textContent=state.w+'″ × '+state.h+'″';
  markDone('step3');
  let price=null;
  if(state.group){price=MATRICES[state.group][hRow][W_COLS.indexOf(wCol)];}
  sizeBox.style.display='block';
  document.getElementById('cv-size').textContent=state.w+'″ W × '+state.h+'″ H';
  document.getElementById('cv-bracket').textContent=wCol+'″ W × '+hRow+'″ H';
  document.getElementById('cv-price').textContent=price?'$'+price:'Select collection';
  updateQuote();
}

function toggleShim(row){
  row.classList.toggle('sel');
  state.shim=row.classList.contains('sel');
  document.getElementById('shim-qty-wrap').style.display=state.shim?'block':'none';
  const addonCheck=document.getElementById('shim-check');
  addonCheck.style.color=state.shim?'#1C1510':'transparent';
  document.getElementById('s4val').textContent=state.shim?state.shimQty+' shim':'None selected';
  calcPrice();
}
function adjShim(d){
  const el=document.getElementById('shim-qty');
  el.value=Math.max(1,Math.min(10,(parseInt(el.value)||1)+d));
  state.shimQty=parseInt(el.value);
  document.getElementById('s4val').textContent=state.shim?state.shimQty+' shim(s)':'None selected';
  calcPrice();
}
function adjQty(d){
  const el=document.getElementById('qty');
  el.value=Math.max(1,Math.min(99,(parseInt(el.value)||1)+d));
  state.qty=parseInt(el.value);
  document.getElementById('s5val').textContent=state.qty+' blind'+(state.qty>1?'s':'');
  markDone('step5');
  calcPrice();
}
function pickWand(btn,side){
  btn.parentElement.querySelectorAll('button').forEach(b=>{b.style.borderColor='#e8e8e4';b.style.color='';b.style.background='#fff';});
  btn.style.borderColor='var(--gold)';btn.style.color='#0A4A42';btn.style.background='var(--gold-mid)';
  state.wand=side;
}
function pickDel(btn,key){
  document.querySelectorAll('.delivery-opt-card').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  state.del=key;
      document.getElementById('s6val').textContent=key==='ship'?'Ship to me':'Pick up';
  markDone('step6');
  calcPrice();
}

const NORMAN_DISC = 0.35; // 35% off retail subtotal — not applied to shipping

function updateQuote(){
  const qty=parseInt(document.getElementById('qty').value)||1;
  state.qty=qty;
  document.getElementById('s5val').textContent=qty+' blind'+(qty>1?'s':'');
  const mountLabel=state.mount==='inside'?'Inside Mount':state.mount==='semi'?'Semi-Inside Mount':state.mount==='outside'?'Outside Mount':'';
  const ready=state.group&&state.colorName&&state.mount&&state.w&&state.h;
  if(!ready){document.getElementById('qp-pending').style.display='block';document.getElementById('qp-detail').style.display='none';return;}
  if(state.w<18||state.w>100||state.h<36||state.h>108){document.getElementById('qp-pending').style.display='block';document.getElementById('qp-pending').textContent='Fix the size error above.';document.getElementById('qp-detail').style.display='none';return;}
  const wCol=W_COLS.find(c=>c>=state.w);
  const hRow=H_ROWS.find(r=>r>=state.h);
  if(!wCol||!hRow){document.getElementById('qp-pending').style.display='block';document.getElementById('qp-detail').style.display='none';return;}
  const pricePerBlind=MATRICES[state.group][hRow][W_COLS.indexOf(wCol)];
  const shimTotal=state.shim?(state.shimQty*7):0;
  const retailSub=pricePerBlind*qty+shimTotal;
  const discountAmt=Math.round(retailSub*NORMAN_DISC);
  const yourPrice=retailSub-discountAmt;
  let freight=0;
  if(state.del==='ship'){
    const oversized=state.w>=90||state.h>=90;
    freight=oversized?(80+(qty-1)*50):(25+(qty-1)*11);
  }
  const total=yourPrice+freight;

  document.getElementById('qp-pending').style.display='none';
  document.getElementById('qp-detail').style.display='block';
  document.getElementById('qr-group').textContent=(state.collection||'—')+' — '+(state.colorName||'—');
  document.getElementById('qr-vane').textContent=state.vane||'—';
  document.getElementById('qr-mount').textContent=state.mount==='inside'?'Inside Mount':state.mount==='semi'?'Semi-Inside Mount':'Outside Mount';
  document.getElementById('qr-dims').textContent=state.w+'″ × '+state.h+'″';
  document.getElementById('qr-qty').textContent=qty+(qty>1?' blinds':' blind');
  document.getElementById('qr-price').innerHTML='<s style="color:var(--text-dark);font-weight:400">$'+pricePerBlind+' retail</s> &rarr; $'+Math.round(pricePerBlind*0.65)+' your price';
  const showRow=(id,show,val)=>{document.getElementById(id).style.display=show?'flex':'none';if(val)document.getElementById(id.replace('-row','-s')).textContent=val;};
  showRow('qr-shim-row',state.shim,'$'+(state.shimQty*7));

  // Add discount rows if not already present
  let discRow=document.getElementById('qr-disc-row');
  let yourPriceRow=document.getElementById('qr-yourprice-row');
  const qdiv=document.querySelector('#qp-detail .qdiv:last-of-type');
  if(!discRow){
    discRow=document.createElement('div');
    discRow.className='qrow';discRow.id='qr-disc-row';
    discRow.innerHTML='<span class="qrow-label" style="color:#2DE0C1">15% Norman discount</span><span class="qrow-val" style="color:#2DE0C1" id="qr-disc-s">—</span>';
    qdiv.parentNode.insertBefore(discRow,qdiv);
    yourPriceRow=document.createElement('div');
    yourPriceRow.className='qrow';yourPriceRow.id='qr-yourprice-row';
    yourPriceRow.innerHTML='<span class="qrow-label" style="font-weight:600;color:var(--cream)">Your price (before shipping)</span><span class="qrow-val" style="color:var(--cream);font-weight:600" id="qr-yourprice-s">—</span>';
    qdiv.parentNode.insertBefore(yourPriceRow,qdiv);
  }
  document.getElementById('qr-disc-s').textContent='-$'+discountAmt;
  document.getElementById('qr-yourprice-s').textContent='$'+yourPrice.toLocaleString();

  showRow('qr-freight-row',state.del==='ship','$'+freight);
  document.getElementById('qr-total').textContent='$'+Math.round(total).toLocaleString();
}

function submitQuote(){
  const name=document.getElementById('f-name').value.trim();
  const phone=document.getElementById('f-phone').value.trim();
  const err=document.getElementById('form-err');
  if(!name||!phone){err.style.display='block';return;}
  err.style.display='none';
  const qty=parseInt(document.getElementById('qty').value)||1;
  const lines=[
    'SYNCHRONY™ VERTICAL BLINDS QUOTE REQUEST',
    '','Product: Norman Synchrony™ Vertical Blinds',
    'Collection: '+(state.collection||'—'),
    'Color: '+(state.colorName||'—'),
    'Vane style: '+(state.vane||'—'),
    'Mount: '+(state.mount==='inside'?'Inside Mount (fully flushed)':state.mount==='semi'?'Semi-Inside Mount':'Outside Mount'),
    'Wand/control side: '+state.wand,
    'Width: '+state.w+'″',
    'Height: '+state.h+'″',
    'Shims: '+(state.shim?state.shimQty+' × $7':'No'),
    'Quantity: '+qty,
    'Delivery: '+(state.del==='ship'?'Ship to me':'Pick up'),
    '',
    'Notes: '+(document.getElementById('f-notes').value.trim()||'None'),
    '','Name: '+name,'Phone: '+phone,
    'Email: '+(document.getElementById('f-email').value.trim()||'—')
  ];
  const body=encodeURIComponent(lines.join('\n'));
  const subject=encodeURIComponent('Synchrony Verticals Quote — '+name);
  window.location.href='mailto:justin@blindznation.com?subject='+subject+'&body='+body;
  document.getElementById('success-box').style.display='block';
}
