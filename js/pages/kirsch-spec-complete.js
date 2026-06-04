renderNav('Hardware'); renderFooter(false);

var _delivery = 'ship';

/* ── dim label helper ── */
function dim_label(){}
document.querySelectorAll('.dim-label').forEach(function(){});

/* ── opt pill selector ── */
function selPill(el, grp) {
  document.querySelectorAll('#' + grp + ' .opt-pill').forEach(function(b){ b.classList.remove('sel'); });
  el.classList.add('sel');
}

/* ── delivery ── */
function selDel(m) {
  _delivery = m;
  var ship = document.getElementById('del-ship'), pick = document.getElementById('del-pickup');
  ship.style.border = m==='ship' ? '2px solid var(--gold)' : '1.5px solid #e8e8e4';
  ship.style.background = m==='ship' ? 'rgba(201,169,110,.05)' : '';
  pick.style.border = m==='pickup' ? '2px solid var(--gold)' : '1.5px solid #e8e8e4';
  pick.style.background = m==='pickup' ? 'rgba(201,169,110,.05)' : '';
  document.getElementById('del-ship-note').style.display = m==='ship' ? 'block' : 'none';
  document.getElementById('del-pickup-note').style.display = m==='pickup' ? 'block' : 'none';
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
  var name=document.getElementById('q-name').value.trim();
  var phone=document.getElementById('q-phone').value.trim();
  if(!name||!phone){alert('Please enter your name and phone number.');return;}

  function gp(grp){ var s=document.querySelector('#'+grp+' .opt-pill.sel'); return s?s.textContent.trim():'—'; }
  var delivery=_delivery==='pickup'?"I'll pick up (Huntingdon Valley, PA)":'Ship to me (UPS/FedEx)';

  var body='KIRSCH DRAPERY HARDWARE — SPECIFICATION REQUEST\n\n'
    +'── CUSTOMER ──\n'
    +'Name: '+name+'\nPhone: '+phone
    +'\nEmail: '+(document.getElementById('q-email').value.trim()||'—')
    +'\nAddress: '+(document.getElementById('q-address').value.trim()||'—')+'\n\n'
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
    +'Room / window: '+(document.getElementById('q-room').value.trim()||'—')+'\n'
    +'\n── DELIVERY ──\n'+delivery+'\n\n'
    +'── NOTES ──\n'+(document.getElementById('q-notes').value.trim()||'None');

  window.location.href='mailto:justin@blindznation.com'
    +'?subject='+encodeURIComponent('Kirsch Hardware Spec — '+gp('grp-rod-type')+' — '+name)
    +'&body='+encodeURIComponent(body);
  document.getElementById('q-success').style.display='block';
}