// ── PRICING DATA ──────────────────────────────────────────────────────────────
const W_COLS = [24,28,32,36,42,48,54,60,66,72,78,84,96];
const H_ROWS = [30,36,42,48,54,60,66,73,78,84,90,96];
const MATRIX = {
  30:[169,185,200,223,238,256,280,326,347,373,400,421,454],
  36:[180,194,210,236,254,273,304,347,371,408,421,454,494],
  42:[193,210,228,252,272,298,329,372,403,438,462,498,535],
  48:[206,223,239,267,289,319,350,397,431,471,494,528,571],
  54:[223,249,259,296,321,350,384,438,471,509,543,577,620],
  60:[238,255,278,314,340,368,407,467,500,544,574,620,673],
  66:[252,270,293,331,357,394,432,497,531,591,614,660,715],
  73:[265,288,312,355,383,420,462,531,571,620,660,711,769],
  78:[273,302,329,365,400,438,482,559,598,659,696,742,812],
  84:[288,314,342,388,420,462,512,585,632,701,730,771,854],
  90:[302,329,357,407,439,482,533,609,660,725,761,805,null],
  96:[312,346,373,421,462,512,569,641,695,764,791,null,null]
};
const VALANCE_PRICE = {24:28,28:28,32:34,36:40,42:51,48:56,54:61,60:73,66:78,72:84,78:94,84:100,96:106};

// ── STATE ─────────────────────────────────────────────────────────────────────
const S = {
  slat:'2in', color:null, isPrinted:false,
  mount:null, w:0, h:0, sizeOk:false,
  valance:null,
  hdb:false, sideMt:false, shims:0,
  wandLoc:'left', delivery:'ship', qty:1
};

const $=id=>document.getElementById(id);
const fmt=n=>'$'+Math.round(n).toLocaleString();

function toggleStep(id){
  const el=$(id);
  el.classList.add('active');
  setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),60);
}
function markDone(id){ $(id).classList.add('done'); }

// ── STEP 1 ────────────────────────────────────────────────────────────────────
function pickSlat(el,label){
  document.querySelectorAll('#step1 .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.slat=label.includes('2½')?'2.5in':'2in';
  $('s1val').innerHTML=label+' (selected)';
  markDone('step1');
  // Filter color cards by slat size
  document.querySelectorAll('#step2 .color-card').forEach(function(card) {
    const ds = card.getAttribute('data-slat');
    const ok = !ds || ds === 'both' || ds === S.slat;
    card.style.display = ok ? '' : 'none';
    if (!ok && card.classList.contains('sel')) {
      card.classList.remove('sel'); S.color=null; S.isPrinted=false; $('s2val').textContent='—';
    }
  });
  const note = $('color-slat-note');
  if (note) {
    note.textContent = S.slat==='2in'
      ? '2″ slat: All colors available including Storm Gray Smooth and all printed colors. Storm Gray Embossed not available in 2″.'
      : '2½″ slat: Storm Gray Embossed and Mist available. Storm Gray Smooth and other printed colors (Old Teak, Granite, Chestnut) not available in 2½″.';
    note.style.display='block';
  }
  calcPrice();
}

// ── STEP 2 ────────────────────────────────────────────────────────────────────
function pickColor(el,label,code,printed){
  document.querySelectorAll('#step2 .color-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.color=label; S.isPrinted=printed;
  $('s2val').innerHTML=label;
  markDone('step2'); calcPrice();
}

// ── STEP 3 ────────────────────────────────────────────────────────────────────
function pickMount(el,label,val){
  document.querySelectorAll('#step3 .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.mount=val; $('s3val').textContent=label;

  const mn=$('mount-note');
  if(val==='inside'){
    mn.textContent='Inside mount: manufacturer deducts 3/8″ from your ordered width. Enter the actual frame opening width.';
    mn.style.display='block';
  } else {
    mn.textContent='Outside mount: no deduction. Add approximately 3″ to both width and height for best light control and privacy coverage.';
    mn.style.display='block';
  }

  // Side mount brackets: only for inside mount
  $('side-mount-section').style.display = val==='inside' ? 'block' : 'none';
  if(val!=='inside'){ S.sideMt=false; $('side-row').classList.remove('sel'); updateSideMtUI(); }

  // Shims: only for outside mount
  if(val==='outside'){
    $('shim-section').style.display='block'; $('shim-na').style.display='none';
  } else {
    $('shim-section').style.display='none'; $('shim-na').style.display='block';
    S.shims=0; $('shim-qty').value=0; $('shim-cost').textContent='$0';
  }

  markDone('step3'); calcSize(); calcPrice();
}

// ── STEP 4 ────────────────────────────────────────────────────────────────────
function calcSize(){
  const w=(parseFloat($('w-whole').value)||0)+(parseFloat($('w-frac').value)||0);
  const h=(parseFloat($('h-whole').value)||0)+(parseFloat($('h-frac').value)||0);
  S.w=w; S.h=h; S.sizeOk=false;

  const msgs=$('size-msgs');
  const cbox=$('computed-box');
  msgs.innerHTML='';

  if(!w&&!h){ cbox.style.display='none'; $('s4val').textContent='—'; updateWandUI(); calcPrice(); return; }

  const errs=[];
  if(w>0&&w<16.5) errs.push('Minimum width is 16½″.');
  if(w>72)        errs.push('Maximum width is 72″ (inside/outside mount). Side mount brackets available — max 37″ wide. Call for anything wider.');
  if(h>0&&h<24)   errs.push('Minimum height is 24″.');
  if(h>96)        errs.push('Maximum height is 96″.');
  const area=(w*h)/144;

  if(errs.length){
    errs.forEach(e=>{const d=document.createElement('div');d.className='msg-box msg-err';d.textContent=e;msgs.appendChild(d);});
    cbox.style.display='none'; $('s4val').textContent='—'; updateWandUI(); updateSideMtUI(); calcPrice(); return;
  }
  if(!w||!h){ cbox.style.display='none'; updateWandUI(); calcPrice(); return; }

  const pW=W_COLS.find(v=>v>=w);
  const pH=H_ROWS.find(v=>v>=h);
  if(!pW||!pH){
    const d=document.createElement('div');d.className='msg-box msg-err';
    d.textContent='Size is outside the pricing range. Please call us for a custom quote.';msgs.appendChild(d);
    cbox.style.display='none'; $('s4val').textContent='—'; updateWandUI(); calcPrice(); return;
  }

  const wi=W_COLS.indexOf(pW);
  if(MATRIX[pH][wi]===null){
    const d=document.createElement('div');d.className='msg-box msg-err';
    d.textContent='This width × height combination is not available as a standard order. Please call us for a custom quote.';msgs.appendChild(d);
    cbox.style.display='none'; $('s4val').textContent='—'; updateWandUI(); calcPrice(); return;
  }

  if(w>=90){
    const d=document.createElement('div');d.className='msg-box msg-warn';
    d.textContent='Width 90″ or over: oversized freight applies ($80 first blind, $50 each additional).';msgs.appendChild(d);
  }
  if(w>0&&h>0&&area>48){
    const extra=Math.ceil(area-48);
    const d=document.createElement('div');d.className='msg-box msg-warn';
    d.textContent='Area '+area.toFixed(2)+' sq ft exceeds 48 sq ft — overage surcharge of +$18 per additional sq ft ('+extra+' sq ft = +$'+(extra*18)+') added to price.';msgs.appendChild(d);
  }

  cbox.style.display='block';
  $('cv-size').textContent=w+'″ W × '+h+'″ H';
  $('cv-pricesize').textContent=pW+'″ W × '+pH+'″ H';
  $('cv-area').textContent=area.toFixed(2)+' sq ft';
  $('s4val').textContent=w+'″ × '+h+'″';

  // Hold down brackets
  $('hdb-prompt').style.display='none';
  if(w<=30){
    $('hdb-auto').style.display='block'; $('hdb-row').style.display='none'; S.hdb=true;
  } else {
    $('hdb-auto').style.display='none'; $('hdb-row').style.display='flex';
  }

  S.sizeOk=true;
  markDone('step4'); updateWandUI(); updateSideMtUI(); calcPrice();
}

function updateWandUI(){
  const wl=$('wand-loc-normal');
  const wc=$('wand-loc-center');
  const wp=$('wand-loc-prompt');
  if(!S.w){
    wl.style.display='none'; wc.style.display='none'; wp.style.display='block';
  } else if(S.w<15){
    wl.style.display='none'; wc.style.display='block'; wp.style.display='none';
  } else {
    wl.style.display='grid'; wc.style.display='none'; wp.style.display='none';
  }
}

function updateSideMtUI(){
  if(S.mount!=='inside'){ return; }
  const block=$('side-mount-block');
  const row=$('side-row');
  if(S.sizeOk && S.w>37){
    block.style.display='block'; row.style.display='none';
    S.sideMt=false;
  } else {
    block.style.display='none'; row.style.display='flex';
  }
}

// ── STEP 5 ────────────────────────────────────────────────────────────────────
function pickValance(el,label,val){
  document.querySelectorAll('#step5 .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.valance=val;
  $('s5val').innerHTML=label;
  markDone('step5'); calcPrice();
}

// ── STEP 6 ADD-ONS ────────────────────────────────────────────────────────────
function toggleHdb(){
  const row=$('hdb-row');
  row.classList.toggle('sel');
  S.hdb=row.classList.contains('sel');
  calcPrice();
}

function toggleAddon(el,key){
  el.classList.toggle('sel');
  S[key]=el.classList.contains('sel');
  calcPrice();
}

function adjShims(d){
  const nv=Math.max(0,Math.min(2,(parseInt($('shim-qty').value)||0)+d));
  $('shim-qty').value=nv; S.shims=nv;
  $('shim-cost').textContent='$'+(nv*7); calcPrice();
}

function pickWandLoc(el,label){
  document.querySelectorAll('#wand-loc-normal .opt-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.wandLoc=label.toLowerCase(); calcPrice();
}

// ── STEP 7 ────────────────────────────────────────────────────────────────────
function adjQty(d){
  const nv=Math.max(1,Math.min(50,(parseInt($('qty-input').value)||1)+d));
  $('qty-input').value=nv; updateQty();
}
function updateQty(){
  S.qty=Math.max(1,parseInt($('qty-input').value)||1);
  $('s7val').textContent=S.qty+(S.qty===1?' blind':' blinds'); calcPrice();
}

// ── DELIVERY ──────────────────────────────────────────────────────────────────
function pickDel(v){
  S.delivery=v;
  document.querySelectorAll('.delivery-opt-card').forEach(function(c){c.classList.remove('sel');});
  $('del-'+v).classList.add('sel');
}

const NORMAN_DISC = 0.35; // 35% off retail subtotal — not applied to shipping

// ── PRICE CALC ────────────────────────────────────────────────────────────────
function calcPrice(){
  if(!S.sizeOk||!S.color||!S.mount||!S.valance){
    $('qp-pending').style.display='block'; $('qp-detail').style.display='none'; return;
  }
  const pW=W_COLS.find(v=>v>=S.w);
  const pH=H_ROWS.find(v=>v>=S.h);
  if(!pW||!pH){ $('qp-pending').style.display='block'; $('qp-detail').style.display='none'; return; }
  const wi=W_COLS.indexOf(pW);
  const base=MATRIX[pH][wi];
  if(base===null){ $('qp-pending').style.display='block'; $('qp-detail').style.display='none'; return; }

  const printedAdd = S.isPrinted ? Math.round(base*0.20) : 0;
  const valAdd = (S.valance&&S.valance!=='none') ? (VALANCE_PRICE[pW]||0) : 0;
  const sideAdd = S.sideMt ? 23 : 0;
  const shimAdd = S.shims*7;
  // Area overage: +$18 per sq ft over 48 sq ft (based on actual ordered size)
  const actualArea = (S.w*S.h)/144;
  const overageSqft = actualArea>48 ? Math.ceil(actualArea-48) : 0;
  const overageAdd = overageSqft*18;

  const unit = base + printedAdd + valAdd + sideAdd + shimAdd + overageAdd;
  const retailSub = unit * S.qty;
  const discountAmt = Math.round(retailSub * NORMAN_DISC);
  const yourPrice = retailSub - discountAmt;

  const isOversized = S.w >= 90;
  const freight = isOversized
    ? (80 + (S.qty>1 ? (S.qty-1)*50 : 0))
    : (25 + (S.qty>1 ? (S.qty-1)*11 : 0));
  const total = yourPrice + freight;

  $('qp-pending').style.display='none';
  $('qp-detail').style.display='block';
  $('q-base').textContent=fmt(base);

  $('q-printed-row').style.display = S.isPrinted ? 'flex' : 'none';
  if(S.isPrinted) $('q-printed').textContent='+'+fmt(printedAdd);

  $('q-valance-row').style.display = valAdd>0 ? 'flex' : 'none';
  if(valAdd>0) $('q-valance').textContent='+'+fmt(valAdd);

  $('q-side-row').style.display = S.sideMt ? 'flex' : 'none';
  if(S.sideMt) $('q-side').textContent='+'+fmt(sideAdd);

  $('q-shim-row').style.display = S.shims>0 ? 'flex' : 'none';
  if(S.shims>0) $('q-shim').textContent='+'+fmt(shimAdd)+' ('+S.shims+'×)';

  const overageRow=$('q-overage-row');
  if(overageRow){ overageRow.style.display=overageSqft>0?'flex':'none'; if(overageSqft>0) $('q-overage').textContent='+'+fmt(overageAdd)+' ('+overageSqft+' sq ft × $18)'; }

  $('q-qty').textContent='× '+S.qty;

  // Retail subtotal row (strikethrough), discount, and your price
  let retailSubRow=$('q-retail-sub-row');
  let discRow=$('q-disc-row');
  let yourPriceRow=$('q-yourprice-row');
  if(!retailSubRow){
    const subEl=$('q-sub').closest('.qrow');
    const retailSubDiv=document.createElement('div');
    retailSubDiv.className='qrow';retailSubDiv.id='q-retail-sub-row';
    retailSubDiv.innerHTML='<span class="qrow-label"><s style="color:var(--text-dark)">Retail subtotal</s></span><span class="qrow-val" style="text-decoration:line-through;color:var(--text-dark)" id="q-retail-sub-val">—</span>';
    subEl.parentNode.insertBefore(retailSubDiv,subEl);
    discRow=document.createElement('div');
    discRow.className='qrow';discRow.id='q-disc-row';
    discRow.innerHTML='<span class="qrow-label" style="color:#2DE0C1">35% Norman discount</span><span class="qrow-val" style="color:#2DE0C1" id="q-disc-val">—</span>';
    subEl.parentNode.insertBefore(discRow,subEl);
    yourPriceRow=document.createElement('div');
    yourPriceRow.className='qrow';yourPriceRow.id='q-yourprice-row';
    yourPriceRow.innerHTML='<span class="qrow-label" style="font-weight:600;color:var(--cream)">Your price (before shipping)</span><span class="qrow-val" style="color:var(--cream);font-weight:600" id="q-yourprice-val">—</span>';
    subEl.parentNode.insertBefore(yourPriceRow,subEl);
  }
  $('q-retail-sub-val').textContent=fmt(retailSub);
  $('q-disc-val').textContent='-'+fmt(discountAmt);
  $('q-yourprice-val').textContent=fmt(yourPrice);
  $('q-sub').textContent=fmt(yourPrice); // keep the existing subtotal element showing your price

  $('q-freight').textContent=fmt(freight);
  $('q-total').textContent=fmt(total);
  $('q-note').textContent = (isOversized
    ? 'Oversized freight: $80 first blind + $50 each additional (width 90″+).'
    : 'Freight: $25 first blind + $11 each additional.')
    + ' Norman retail pricing — 35% off. ⓘ Estimated price only — tariffs, import fees, and exact shipping confirmed at order. No charge until Justin reviews and confirms your price.';
}

// ── SUBMIT ────────────────────────────────────────────────────────────────────
function submitForm(){
  const name=$('f-name').value.trim();
  const phone=$('f-phone').value.trim();
  const email=$('f-email').value.trim();
  const errEl=$('form-err');
  errEl.style.display='none';

  if(!name){ errEl.textContent='Please enter your name.'; errEl.style.display='block'; return; }
  if(!phone&&!email){ errEl.textContent='Please enter a phone number or email address.'; errEl.style.display='block'; return; }
  if(!S.color){ errEl.textContent='Please select a color in Step 2.'; errEl.style.display='block'; return; }
  if(!S.mount){ errEl.textContent='Please select a mount type in Step 3.'; errEl.style.display='block'; return; }
  if(!S.sizeOk){ errEl.textContent='Please enter valid dimensions in Step 4.'; errEl.style.display='block'; return; }
  if(!S.valance){ errEl.textContent='Please select a valance option in Step 5.'; errEl.style.display='block'; return; }

  const pW=W_COLS.find(v=>v>=S.w);
  const pH=H_ROWS.find(v=>v>=S.h);
  const wi=W_COLS.indexOf(pW);
  const base=MATRIX[pH][wi];
  const printedAdd=S.isPrinted?Math.round(base*0.20):0;
  const valAdd=(S.valance&&S.valance!=='none')?(VALANCE_PRICE[pW]||0):0;
  const sideAdd=S.sideMt?23:0;
  const shimAdd=S.shims*7;
  const unit=base+printedAdd+valAdd+sideAdd+shimAdd;
  const subtotal=unit*S.qty;
  const isOversized=S.w>=90;
  const freight=isOversized?(80+(S.qty>1?(S.qty-1)*50:0)):(25+(S.qty>1?(S.qty-1)*11:0));
  const total=subtotal+freight;

  const valLabel=S.valance==='none'?'No Valance':(S.valance==='modern'?'Modern Curved 2½"':'Designer Crown 3¼"');
  const slatLabel=S.slat==='2.5in'?'2½"':'2"';

  const body=[
    'SMARTPRIVACY FAUX WOOD BLINDS QUOTE REQUEST',
    '=============================================',
    '',
    'CUSTOMER',
    'Name: '+name,
    'Phone: '+(phone||'—'),
    'Email: '+(email||'—'),
    'Delivery: '+(S.delivery==='ship'?'Ship to me (UPS/FedEx)':'Customer pickup'),
    '',
    'PRODUCT SPECS',
    'Product: SmartPrivacy Faux Wood Blinds (Ultimate program)',
    'Slat Size: '+slatLabel,
    'Color: '+S.color+(S.isPrinted?' [PRINTED — +20% surcharge]':''),
    'Mount Type: '+(S.mount==='inside'?'Inside Mount':'Outside Mount'),
    'Width: '+S.w+'"',
    'Height: '+S.h+'"',
    'Area: '+(S.w*S.h/144).toFixed(2)+' sq ft',
    'Priced at: '+pW+'" W × '+pH+'" H',
    'Valance: '+valLabel,
    'Side Mount Brackets: '+(S.sideMt?'Yes (+$23)':'No'),
    'Hold Down Brackets: '+(S.hdb||S.w<=30?'Yes':'No'),
    'Shims: '+S.shims+(S.shims>0?' (+$'+shimAdd+')':''),
    'Wand Location: '+(S.w<15?'Center (auto — blind under 15")':S.wandLoc.charAt(0).toUpperCase()+S.wandLoc.slice(1)),
    'Quantity: '+S.qty,
    '',
    'PRICING',
    'Base price (per blind): $'+base,
    'Printed surcharge: '+(printedAdd?'+$'+printedAdd:'—'),
    'Valance: '+(valAdd?'+$'+valAdd:'—'),
    'Side mount bracket: '+(sideAdd?'+$'+sideAdd:'—'),
    'Shims: '+(shimAdd?'+$'+shimAdd:'—'),
    'Unit price: $'+unit,
    'Qty: ×'+S.qty,
    'Subtotal: $'+subtotal,
    'Freight: $'+freight+(isOversized?' (oversized — width 90″+)':''),
    'TOTAL: $'+total,
    '',
    'NOTES',
    ($('f-notes').value||'None')
  ].join('\n');

  const subj='SmartPrivacy Faux Wood Blinds Quote — '+name;
  window.location.href='mailto:justin@blindznation.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  $('success-box').style.display='block';
  errEl.style.display='none';
}

function addFauxWoodToCart(){
  if(!S.color){ alert('Please select a color (Step 2) before adding to cart.'); return; }
  if(!S.mount){ alert('Please select a mount type (Step 3) before adding to cart.'); return; }
  if(!S.sizeOk){ alert('Please enter valid dimensions (Step 4) before adding to cart.'); return; }
  if(!S.valance){ alert('Please select a valance option (Step 5) before adding to cart.'); return; }

  const pW=W_COLS.find(v=>v>=S.w);
  const pH=H_ROWS.find(v=>v>=S.h);
  const wi=W_COLS.indexOf(pW);
  const base=MATRIX[pH][wi];
  const printedAdd=S.isPrinted?Math.round(base*0.20):0;
  const valAdd=(S.valance&&S.valance!=='none')?(VALANCE_PRICE[pW]||0):0;
  const sideAdd=S.sideMt?23:0;
  const shimAdd=S.shims*7;
  const unit=base+printedAdd+valAdd+sideAdd+shimAdd;
  const subtotal=unit*S.qty;
  const isOversized=S.w>=90;
  const freight=isOversized?(80+(S.qty>1?(S.qty-1)*50:0)):(25+(S.qty>1?(S.qty-1)*11:0));
  const total=subtotal+freight;

  const slatLabel=S.slat==='2.5in'?'2½"':'2"';
  const valLabel=S.valance==='none'?'No Valance':(S.valance==='modern'?'Modern Curved 2½"':'Designer Crown 3¼"');

  const lines=[
    {label:'Product',value:'SmartPrivacy Faux Wood Blinds (Ultimate)'},
    {label:'Slat Size',value:slatLabel},
    {label:'Color',value:S.color+(S.isPrinted?' [Printed +20%]':'')},
    {label:'Mount',value:S.mount==='inside'?'Inside Mount':'Outside Mount'},
    {label:'Width',value:S.w+'"'},
    {label:'Height',value:S.h+'"'},
    {label:'Valance',value:valLabel},
    {label:'Side Mount Brackets',value:S.sideMt?'Yes (+$23)':'No'},
    {label:'Shims',value:S.shims>0?S.shims+' (+$'+shimAdd+')':'None'},
    {label:'Quantity',value:String(S.qty)}
  ];
  const specs=lines.map(l=>l.label+': '+l.value).join(' | ');
  pbAddToCart({product:'SmartPrivacy Faux Wood Blinds',lines:lines,specs:specs,price:total,qty:S.qty});
  pbOpenCart();
}

// Init — apply default 2" slat color filter on page load
document.addEventListener('DOMContentLoaded',()=>{
  S.slat='2in'; markDone('step1'); $('s7val').textContent='1 blind';
  // Hide colors not available for 2" slat (Storm Gray Embossed = 2.5in only)
  document.querySelectorAll('#step2 .color-card').forEach(function(card){
    var ds=card.getAttribute('data-slat');
    card.style.display=(!ds||ds==='both'||ds==='2in')?'':'none';
  });
  var note=$('color-slat-note');
  if(note){note.textContent='2″ slat: All colors available including Storm Gray Smooth and all printed colors. Storm Gray Embossed is only available in 2½″.';note.style.display='block';}
});
