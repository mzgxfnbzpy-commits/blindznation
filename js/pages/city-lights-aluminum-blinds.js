// ── PRICING DATA ──────────────────────────────────────────────────────────────
const W_COLS = [24,28,32,36,42,48,54,60,66,72,78,84,90,96];
const H_ROWS = [42,48,54,61,66,73,78,84,90,96];
const MATRIX = {
  42: [261,270,279,284,298,309,319,337,389,408,411,435,485,514],
  48: [269,273,283,292,305,319,325,345,397,418,422,444,496,535],
  54: [271,278,291,296,313,325,334,356,405,424,432,453,509,548],
  61: [274,281,293,303,321,333,340,365,418,438,444,468,525,566],
  66: [278,287,299,307,324,339,349,371,422,446,452,474,529,586],
  73: [281,291,303,317,333,346,356,382,424,449,455,477,537,600],
  78: [334,350,368,376,402,423,435,469,483,518,547,577,606,617],
  84: [338,353,371,384,407,430,441,476,501,529,560,591,618,642],
  90: [350,367,384,396,423,443,462,495,527,548,580,617,642,null],
  96: [353,373,389,404,431,453,467,506,538,562,594,628,null,null]
};

// ── STATE ─────────────────────────────────────────────────────────────────────
let state = {slat:null,colorCode:null,colorName:null,colorSurcharge:0,mount:null,w:0,h:0,privacy:false,sidemount:false,shim:false,shimQty:1,qty:1,del:null};

// ── STEP HELPERS ──────────────────────────────────────────────────────────────
function toggleStep(id){
  const el=document.getElementById(id);
  el.classList.add('active');
  setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),60);
}
function markDone(id){document.getElementById(id).classList.add('done');}
function goNext(fromId,toId){
  document.getElementById(fromId).classList.add('done');
  document.getElementById(fromId).classList.remove('active');
  const t=document.getElementById(toId);
  t.classList.add('active');
  setTimeout(()=>t.scrollIntoView({behavior:'smooth',block:'start'}),80);
}

function filterColorsBySlat(slatKey){
  const warn=document.getElementById('color-compat-warn');
  let cleared=false;
  document.querySelectorAll('#color-grid .color-card').forEach(card=>{
    const avail=card.dataset.avail;
    let ok=false;
    if(slatKey==='half') ok=(avail==='all'||avail==='half-one');
    else if(slatKey==='one') ok=(avail==='all'||avail==='half-one'||avail==='one'||avail==='one-two');
    else if(slatKey==='two') ok=(avail==='all'||avail==='one-two'||avail==='two');
    card.classList.toggle('unavail',!ok);
    if(!ok && card.classList.contains('sel')){
      card.classList.remove('sel');
      state.colorCode=null;state.colorName=null;state.colorSurcharge=0;
      document.getElementById('s2val').textContent='—';
      document.getElementById('step2').classList.remove('done');
      cleared=true;
    }
  });
  if(cleared){
    warn.style.display='block';
    const slatNames={half:'½″ Micro',one:'1″ Standard',two:'2″ SmartPrivacy®'};
    warn.textContent='Your previously selected color is not available in '+slatNames[slatKey]+' slats. Please choose a new color from the options below (dimmed colors are unavailable for this slat size).';
  } else {
    warn.style.display='none';
  }
}

function pickSlat(el,key,label){
  document.querySelectorAll('#step1 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  state.slat=key;
  document.getElementById('s1val').textContent=label;
  markDone('step1');
  // Privacy slat option: 1" only. ½" has no privacy option. 2" has SmartPrivacy STANDARD (included).
  document.getElementById('privacy-wrap').style.display=(key==='one')?'block':'none';
  if(key!=='one'){state.privacy=false;document.getElementById('privacy-addon').classList.remove('sel');}
  document.getElementById('sidemount-wrap').style.display=(key==='two')?'block':'none';
  const n=document.getElementById('size-limits-note');
  if(key==='half'||key==='one') n.textContent='Max width 78″ · max height 96″ · max area 50 sq ft.';
  else n.textContent='Max width 96″ · max height 96″ · max area 48 sq ft. Side mount available (IB only).';
  filterColorsBySlat(key);
  calcPrice();
  goNext('step1','step2');
}
function pickColor(el,code,name,surcharge){
  document.querySelectorAll('#color-grid .color-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  state.colorCode=code;state.colorName=name;state.colorSurcharge=surcharge;
  document.getElementById('s2val').textContent=name+(surcharge?' (+'+surcharge+'%)':'');
  document.getElementById('color-compat-warn').style.display='none';
  markDone('step2');
  calcPrice();
  goNext('step2','step5');
}
function pickMount(el,key,label){
  document.querySelectorAll('#step3 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  state.mount=key;
  document.getElementById('s3val').textContent=label;
  markDone('step3');
  const note=document.getElementById('mount-note');
  if(key==='inside'){note.style.display='block';note.textContent='Inside mount: measure exact frame opening. Mfr deducts 3/8″ from width automatically.';}
  else{note.style.display='block';note.textContent='Outside mount: measure the area you want covered. Add ~3″ to width & height for light block. Shim available for trim clearance.';}
  document.getElementById('shim-wrap').style.display=(key==='outside')?'block':'none';
  if(key==='inside'){state.shim=false;document.getElementById('shim-addon').classList.remove('sel');document.getElementById('shim-qty-wrap').style.display='none';}
  calcPrice();
  goNext('step3','step1');
}

function calcPrice(){
  state.w=parseFloat(document.getElementById('w-whole').value)||0;
  state.h=parseFloat(document.getElementById('h-whole').value)||0;

  const dimMsg=document.getElementById('dim-msg');
  const sizeBox=document.getElementById('size-box');
  dimMsg.style.display='none'; sizeBox.style.display='none';

  if(!state.w||!state.h){updateQuote();return;}

  // validate size limits
  const maxW=(state.slat==='two')?96:78;
  const minW=(state.slat==='two')?10.5:9;
  const minH=(state.slat==='two')?16:10;
  const maxArea=(state.slat==='two')?48:50;
  const sqft=(state.w*state.h)/144;

  if(state.w<minW||state.h<minH||state.w>maxW||state.h>96){
    dimMsg.className='msg-box msg-err';
    dimMsg.textContent=`Size out of range. ${state.slat==='two'?'2″ slats':'½″ & 1″ slats'}: width ${minW}″–${maxW}″, height ${minH}″–96″.`;
    dimMsg.style.display='block';
    updateQuote();return;
  }
  if(sqft>maxArea){
    dimMsg.className='msg-box msg-err';
    dimMsg.textContent=`This size (${sqft.toFixed(1)} sq ft) exceeds the ${maxArea} sq ft maximum. Reduce width or height.`;
    dimMsg.style.display='block';
    updateQuote();return;
  }

  // find bracket
  const wCol=W_COLS.find(c=>c>=state.w);
  const hRow=H_ROWS.find(r=>r>=state.h);
  if(!wCol||!hRow){
    dimMsg.className='msg-box msg-err';
    dimMsg.textContent='Size exceeds the largest pricing bracket. Please call us at (609) 742-1720 for a custom quote.';
    dimMsg.style.display='block';
    updateQuote();return;
  }
  const wIdx=W_COLS.indexOf(wCol);
  const basePrice=MATRIX[hRow][wIdx];
  if(!basePrice){
    dimMsg.className='msg-box msg-err';
    dimMsg.textContent='This size combination is not available. Please reduce width or height.';
    dimMsg.style.display='block';
    updateQuote();return;
  }

  // all good — size lives in the merged Step 1 (Window measurements & mount)
  markDone('step3');
  sizeBox.style.display='block';
  // Auto-open the remaining steps the first time dimensions are valid
  ['step1','step2','step5','step7','step8'].forEach(id=>{
    const el=document.getElementById(id);
    if(el&&!el.classList.contains('active')&&!el.classList.contains('open'))el.classList.add('active');
  });
  document.getElementById('cv-size').textContent=`${state.w}″ W × ${state.h}″ H`;
  document.getElementById('cv-sqft').textContent=sqft.toFixed(2)+' sq ft';
  document.getElementById('cv-bracket').textContent=`${wCol}″ W × ${hRow}″ H`;
  document.getElementById('cv-base').textContent='$'+basePrice;
  updateQuote();
}

function updateSizeLimitsNote(){calcPrice();}

function toggleAddon(row,key){
  row.classList.toggle('sel');
  state[key]=row.classList.contains('sel');
  if(key==='shim'){
    document.getElementById('shim-qty-wrap').style.display=state.shim?'block':'none';
  }
  calcPrice();
}
function adjQty(d){
  const el=document.getElementById('qty');
  el.value=Math.max(1,Math.min(99,(parseInt(el.value)||1)+d));
  state.qty=parseInt(el.value);
  calcPrice();
}
function adjShim(d){
  const el=document.getElementById('shim-qty');
  el.value=Math.max(1,Math.min(10,(parseInt(el.value)||1)+d));
  state.shimQty=parseInt(el.value);
  calcPrice();
}
function pickDel(btn,key){
  document.querySelectorAll('.delivery-opt-card').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  state.del=key;
      document.getElementById('s7val').textContent=key==='ship'?'Ship to me':'Pick up';
  markDone('step7');
  calcPrice();
  goNext('step7','step8');
}

function updateQuote(){
  const qty=parseInt(document.getElementById('qty').value)||1;
  state.qty=qty;

  const ready=state.slat&&state.colorCode&&state.mount&&state.w&&state.h;
  if(!ready){document.getElementById('qp-pending').style.display='block';document.getElementById('qp-detail').style.display='none';return;}

  // recompute
  const maxW=(state.slat==='two')?96:78;
  const minW=(state.slat==='two')?10.5:9;
  const minH=(state.slat==='two')?16:10;
  const maxArea=(state.slat==='two')?48:50;
  const sqft=(state.w*state.h)/144;
  if(state.w<minW||state.h<minH||state.w>maxW||state.h>96||sqft>maxArea){
    document.getElementById('qp-pending').style.display='block';
    document.getElementById('qp-pending').textContent='Fix the size error above to see your estimate.';
    document.getElementById('qp-detail').style.display='none';return;
  }
  const wCol=W_COLS.find(c=>c>=state.w);
  const hRow=H_ROWS.find(r=>r>=state.h);
  if(!wCol||!hRow){document.getElementById('qp-pending').style.display='block';document.getElementById('qp-detail').style.display='none';return;}
  const basePrice=MATRIX[hRow][W_COLS.indexOf(wCol)];
  if(!basePrice){document.getElementById('qp-pending').style.display='block';document.getElementById('qp-detail').style.display='none';return;}

  const NORMAN_DISC = 0.35; // 35% off retail subtotal — not applied to shipping

  // slat multiplier + color finish surcharge + optional privacy
  const slatMult={half:1.10,one:1.00,two:1.20}[state.slat];
  const colorMult=1+(state.colorSurcharge/100);
  const privMult=state.privacy?1.10:1.00;

  let pricePerBlind=basePrice*slatMult*colorMult*privMult;
  let shimTotal=state.shim?(state.shimQty*7):0;
  let sideTotal=state.sidemount?25:0;
  let retailSub=pricePerBlind*qty+shimTotal+sideTotal;
  const discountAmt=Math.round(retailSub*NORMAN_DISC);
  const yourPrice=retailSub-discountAmt;

  // freight — no discount
  let freight=0;
  if(state.del==='ship'){
    if(state.w>=90) freight=80+(qty-1)*50;
    else freight=25+(qty-1)*11;
  }
  const total=yourPrice+freight;

  // show detail
  document.getElementById('qp-pending').style.display='none';
  document.getElementById('qp-detail').style.display='block';

  const slatLabels={half:'½″ Micro Slats',one:'1″ Standard Slats',two:'2″ SmartPrivacy®'};
  document.getElementById('qr-slat').textContent=slatLabels[state.slat];
  document.getElementById('qr-finish').textContent=state.colorName;
  document.getElementById('qr-mount').textContent=state.mount==='inside'?'Inside mount':'Outside mount';
  document.getElementById('qr-dims').textContent=state.w+'″ × '+state.h+'″';
  document.getElementById('qr-qty').textContent=qty+(qty>1?' blinds':' blind');
  document.getElementById('qr-base').textContent='$'+basePrice.toFixed(0);

  // Detail hidden per owner request — slat/finish/privacy/side-mount/shim surcharges + base roll silently
  // into the retail subtotal. Customer sees retail → 35% off → your price → freight. (Cordless-only; no motor/TDBU/D&N.)
  const _hideRow=(id)=>{const e=document.getElementById(id);if(e)e.style.display='none';};
  const _qrBase=document.getElementById('qr-base'); if(_qrBase&&_qrBase.closest){const r=_qrBase.closest('.qrow'); if(r)r.style.display='none';}
  ['qr-slat-row','qr-finish-row','qr-privacy-row','qr-sm-row','qr-shim-row'].forEach(_hideRow);

  // Retail subtotal row
  let retailRow=document.getElementById('qr-retail-row');
  let discRow=document.getElementById('qr-disc-row');
  let yourPriceRow=document.getElementById('qr-yourprice-row');
  const firstDiv=document.querySelector('#qp-detail .qdiv:last-of-type');
  if(!retailRow){
    retailRow=document.createElement('div');
    retailRow.className='qrow';retailRow.id='qr-retail-row';
    retailRow.innerHTML='<span class="qrow-label"><s style="color:var(--text-dark)">Retail subtotal</s></span><span class="qrow-val" style="text-decoration:line-through;color:var(--text-dark)" id="qr-retail-s">—</span>';
    firstDiv.parentNode.insertBefore(retailRow,firstDiv);
    discRow=document.createElement('div');
    discRow.className='qrow';discRow.id='qr-disc-row';
    discRow.innerHTML='<span class="qrow-label" style="color:#2DE0C1">35% Norman discount</span><span class="qrow-val" style="color:#2DE0C1" id="qr-disc-s">—</span>';
    firstDiv.parentNode.insertBefore(discRow,firstDiv);
    yourPriceRow=document.createElement('div');
    yourPriceRow.className='qrow';yourPriceRow.id='qr-yourprice-row';
    yourPriceRow.innerHTML='<span class="qrow-label" style="font-weight:600;color:var(--cream)">Your price (before shipping)</span><span class="qrow-val" style="color:var(--cream);font-weight:600" id="qr-yourprice-s">—</span>';
    firstDiv.parentNode.insertBefore(yourPriceRow,firstDiv);
  }
  document.getElementById('qr-retail-s').textContent='$'+Math.round(retailSub).toLocaleString();
  document.getElementById('qr-disc-s').textContent='-$'+discountAmt;
  document.getElementById('qr-yourprice-s').textContent='$'+yourPrice.toLocaleString();

  showRow('qr-freight-row',state.del==='ship','$'+freight);

  document.getElementById('qr-total').textContent='$'+Math.round(total).toLocaleString();
}

function addCityLightsToCart(){
  if(!state.slat){ alert('Please select a slat size (Step 1) before adding to cart.'); return; }
  if(!state.colorName){ alert('Please select a color (Step 2) before adding to cart.'); return; }
  if(!state.mount){ alert('Please select a mount type (Step 3) before adding to cart.'); return; }
  if(!state.w||!state.h){ alert('Please enter valid dimensions (Step 4) before adding to cart.'); return; }

  const totalEl=document.getElementById('qr-total');
  const priceText=totalEl?totalEl.textContent.trim():'';
  const price=priceText?parseFloat(priceText.replace(/[^0-9.]/g,''))||null:null;

  const slatLabels={half:'½″ Micro Slats',one:'1″ Standard Slats',two:'2″ SmartPrivacy®'};
  const lines=[
    {label:'Product',value:'Norman City Lights™ Aluminum Blinds'},
    {label:'Slat Size',value:slatLabels[state.slat]||state.slat},
    {label:'Color',value:state.colorName+(state.colorSurcharge?' (+'+state.colorSurcharge+'% surcharge)':'')},
    {label:'Mount',value:state.mount==='inside'?'Inside mount':'Outside mount'},
    {label:'Width',value:state.w+'″'},
    {label:'Height',value:state.h+'″'},
    {label:'Privacy Slats',value:state.privacy?'Yes (+10%)':'No'},
    {label:'Side Mount Bracket',value:state.sidemount?'Yes':'No'},
    {label:'Shims',value:state.shim?state.shimQty+' × $7':'None'},
    {label:'Quantity',value:String(state.qty||1)}
  ];
  const specs=lines.map(l=>l.label+': '+l.value).join(' | ');
  pbAddToCart({product:'Norman City Lights™ Aluminum Blinds',lines:lines,specs:specs,price:price,qty:state.qty||1});
  pbOpenCart();
}

function submitQuote(){
  const name=document.getElementById('cf-name').value.trim();
  const phone=document.getElementById('cf-phone').value.trim();
  const err=document.getElementById('cf-contact-err');
  if(!name||!phone){err.style.display='block';return;}
  err.style.display='none';

  const qty=parseInt(document.getElementById('qty').value)||1;
  const slatLabels={half:'½″ Micro Slats',one:'1″ Standard Slats',two:'2″ SmartPrivacy®'};
  const lines=[
    'CITYLIGHTS™ ALUMINUM BLINDS QUOTE REQUEST',
    '','Product: Norman Citylights™ Aluminum Blinds',
    'Slat size: '+(slatLabels[state.slat]||'—'),
    'Color: '+(state.colorName||'—')+' ('+state.colorCode+')'+(state.colorSurcharge?' +'+state.colorSurcharge+'%':''),
    'Mount: '+(state.mount==='inside'?'Inside mount':'Outside mount'),
    'Width: '+state.w+'″',
    'Height: '+state.h+'″',
    'Privacy slats: '+(state.privacy?'Yes':'No'),
    'Side mount bracket: '+(state.sidemount?'Yes':'No'),
    'Shims: '+(state.shim?state.shimQty+' × $7':'No'),
    'Quantity: '+qty,
    'Delivery: '+(state.del==='ship'?'Ship to me':'Pick up'),
    '',
    'Notes: '+(document.getElementById('cf-notes').value.trim()||'None'),
    '',
    'Name: '+name,
    'Phone: '+phone,
    'Email: '+(document.getElementById('cf-email').value.trim()||'—')
  ];
  const body=encodeURIComponent(lines.join('\n'));
  const subject=encodeURIComponent('Citylights Aluminum Blinds Quote — '+name);
  window.location.href='mailto:blindznation@gmail.com?subject='+subject+'&body='+body;
  document.getElementById('success-box').style.display='block';
}
