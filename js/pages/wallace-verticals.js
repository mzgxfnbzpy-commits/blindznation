var vwColor = '';

function pickColor(name, card) {
  vwColor = name;
  document.querySelectorAll('.color-card').forEach(function(c){c.classList.remove('sel');});
  card.classList.add('sel');
}

function adjQty(d) {
  var el = document.getElementById('vw-qty');
  el.value = Math.max(1, Math.min(20, (parseInt(el.value) || 1) + d));
}

function pickCard(card, groupId) {
  document.querySelectorAll('#' + groupId + ' .delivery-opt-card').forEach(function(c){c.classList.remove('sel');});
  card.classList.add('sel');
}

function pickValance(val, card) {
  pickCard(card, 'grp-vw-valance');
  document.getElementById('return-size-row').style.display = val === 'yes' ? 'block' : 'none';
}

function setCustomReturn(show) {
  var row = document.getElementById('return-custom-row');
  row.style.display = show ? 'flex' : 'none';
}

function getReturnSize() {
  var sel = document.querySelector('#grp-vw-return .opt-btn.sel');
  if (!sel) return '3.5"';
  var txt = sel.textContent.trim().split(' ')[0];
  if (txt === 'Custom') {
    var v = document.getElementById('vw-return-custom').value;
    return v ? v + '"' : 'Custom (unspecified)';
  }
  return txt;
}

function addWallaceVerticalsToCart(){
  var color=vwColor||'—';
  var w=document.getElementById('vw-width').value;
  var h=document.getElementById('vw-height').value;
  var qty=document.getElementById('vw-qty').value||'1';
  if(!color||color==='—'){ alert('Please select a color before adding to cart.'); return; }
  if(!w||!h){ alert('Please enter width and height before adding to cart.'); return; }

  var mount=document.querySelector('#grp-vw-mount .opt-btn.sel')?.textContent.trim()||'—';
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

async function submitVWForm(btn) {
  var name  = document.getElementById('cf-name').value.trim();
  var phone = document.getElementById('cf-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  var color   = vwColor || '—';
  var w       = document.getElementById('vw-width').value;
  var h       = document.getElementById('vw-height').value;
  var qty     = document.getElementById('vw-qty').value;
  var email   = document.getElementById('cf-email').value.trim();
  var notes   = document.getElementById('cf-notes').value.trim();

  var mount   = document.querySelector('#grp-vw-mount .opt-btn.sel')?.textContent.trim() || '—';
  var valSel  = document.querySelector('#grp-vw-valance .delivery-opt-card.sel')?.querySelector('.delivery-opt-title')?.textContent.trim() || '—';
  var hasVal  = valSel.toLowerCase().includes('with');
  var returnSz = hasVal ? getReturnSize() : 'N/A';
  var delivery = document.querySelector('#grp-vw-del .delivery-opt-card.sel')?.querySelector('.delivery-opt-title')?.textContent.trim() || 'Ship to me';

  var body =
    'WALLACE VERTICAL BLINDS QUOTE REQUEST\n' +
    '══════════════════════════════════════\n' +
    'Name:      ' + name  + '\n' +
    'Phone:     ' + phone + '\n' +
    'Email:     ' + (email || '—') + '\n\n' +
    'Color:     ' + color  + '\n' +
    'Width:     ' + (w || '—') + '″\n' +
    'Height:    ' + (h || '—') + '″\n' +
    'Quantity:  ' + qty + '\n' +
    'Mount:     ' + mount + '\n' +
    'Valance:   ' + valSel + '\n' +
    'Return:    ' + returnSz + '\n\n' +
    'Delivery:  ' + delivery + '\n\n' +
    'Notes:\n' + (notes || 'None');

  await _apiSubmit(name, email, phone, 'Wallace Vertical Blinds', body, 'vw-success', null, btn);
  document.getElementById('vw-success').style.display = 'block';
}
