var _delivery = 'ship';

/* ── dim label helper ── */
function dim_label(){}
document.querySelectorAll('.dim-label').forEach(function(){});

/* ── quantity stepper (shared, reuses #q-qty) ── */
function adjQty(d) {
  var el = document.getElementById('q-qty');
  if (!el) return;
  var v = (parseInt(el.value) || 1) + d;
  if (v < 1) v = 1;
  if (v > 50) v = 50;
  el.value = v;
}
function updateQty() {
  var el = document.getElementById('q-qty');
  if (!el) return;
  var v = parseInt(el.value) || 1;
  if (v < 1) v = 1;
  if (v > 50) v = 50;
  el.value = v;
}

/* ── opt pill selector ── */
function selPill(el, grp) {
  document.querySelectorAll('#' + grp + ' .opt-pill').forEach(function(b){ b.classList.remove('sel'); });
  el.classList.add('sel');
}

/* ── delivery ── */
function selDel(m) {
  _delivery = m;
  var ship = document.getElementById('del-ship');
  if (ship) { ship.style.border = '2px solid var(--gold)'; ship.style.background = 'rgba(45,224,193,.05)'; }
  var note = document.getElementById('del-ship-note');
  if (note) note.style.display = 'block';
}

/* ── weight calc ── */
function wCalc() {
  var y=parseFloat(document.getElementById('wc-yards').value)||0;
  var w=parseFloat(document.getElementById('wc-width').value)||0;
  var t=parseFloat(document.getElementById('wc-track').value)||0;
  var oz=parseFloat(document.getElementById('wc-oz').value)||0;
  var res=document.getElementById('wc-result');
  if(!y||!w||!oz){res.innerHTML='';return;}
  var sqyd=(y*36*w)/1296;
  var lbs=(sqyd*oz)/16;
  var lim=t>0?Math.min(64,t*4):64;
  var pct=(lbs/lim*100).toFixed(0);
  var cls=lbs>lim?'err-box':lbs>lim*.85?'warn-box':'rule-ok';
  res.innerHTML='<div class="'+cls+'" style="padding:10px 14px;border-radius:8px;font-size:13px;margin-top:4px">'+
    '<strong>Estimated weight: '+lbs.toFixed(1)+' lbs</strong> ('+sqyd.toFixed(1)+' sq yds × '+oz+' oz ÷ 16)<br>'+
    'Track limit: '+lim.toFixed(0)+' lbs — using '+pct+'%'+
    (lbs>lim?'<br><strong>⚠ EXCEEDS LIMIT — split into two rods, reduce yardage, or choose lighter fabric.</strong>':'')+
  '</div>';
}

/* ── submit ── */
function submitQ() {
  var name=document.getElementById('cf-name').value.trim();
  var phone=document.getElementById('cf-phone').value.trim();
  if(!name||!phone){alert('Please enter your name and phone number.');return;}

  function gp(grp){ var s=document.querySelector('#'+grp+' .opt-pill.sel'); return s?s.textContent.trim():'—'; }
  var delivery='Ship to me (UPS/FedEx)';

  var body='KIRSCH DRAPERY HARDWARE — SPECIFICATION REQUEST\n\n'
    +'── CUSTOMER ──\n'
    +'Name: '+name+'\nPhone: '+phone
    +'\nEmail: '+(document.getElementById('cf-email').value.trim()||'—')
    +'\nAddress: '+(document.getElementById('cf-address').value.trim()||'—')+'\n\n'
    +'── PRODUCT SPECIFICATION ──\n'
    +'Rod / track type: '+gp('grp-rod-type')+'\n'
    +'Collection: '+gp('grp-coll')+'\n'
    +'Finish: '+(document.getElementById('q-finish').value.trim()||'—')+'\n'
    +'Length: '+(document.getElementById('q-len').value||'—')+'" | Qty: '+(document.getElementById('q-qty').value||'1')+'\n'
    +'Header: '+gp('grp-header')+'\n'
    +'Draw: '+gp('grp-draw')+'\n'
    +'Mount: '+gp('grp-mount')+'\n'
    +'Finial: '+(document.getElementById('q-finial').value.trim()||'—')+'\n'
    +'Motorization: '+gp('grp-motor')+'\n'
    +'Motor accessories: '+(document.getElementById('q-motor-acc').value.trim()||'None')+'\n'
    +'\n── DELIVERY ──\n'+delivery+'\n\n'
    +'── NOTES ──\n'+(document.getElementById('cf-notes').value.trim()||'None');

  window.location.href='mailto:blindznation@gmail.com'
    +'?subject='+encodeURIComponent('Kirsch Hardware Spec — '+gp('grp-rod-type')+' — '+name)
    +'&body='+encodeURIComponent(body);
  document.getElementById('q-success').style.display='block';
}

function addKirschSpecToCart() {
  function gp(grp){ var s=document.querySelector('#'+grp+' .opt-pill.sel'); return s?s.textContent.trim():'—'; }
  var rodType = gp('grp-rod-type');
  var coll = gp('grp-coll');
  var len = (document.getElementById('q-len')||{value:''}).value || '—';
  var qty = parseInt((document.getElementById('q-qty')||{value:'1'}).value) || 1;
  var lines = [
    { label: 'Product', value: 'Kirsch ' + rodType },
    { label: 'Collection', value: coll },
    { label: 'Length', value: len + '″' },
    { label: 'Draw', value: gp('grp-draw') },
    { label: 'Mount', value: gp('grp-mount') },
    { label: 'Quantity', value: String(qty) }
  ];
  pbAddToCart({ product: 'Kirsch ' + rodType, lines: lines, specs: lines.map(function(l){ return l.label+': '+l.value; }).join(' | '), qty: qty });
  pbOpenCart();
}
