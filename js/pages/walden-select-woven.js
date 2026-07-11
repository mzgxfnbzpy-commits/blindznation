let wsDelivery = 'ship';
function wsSetDelivery(val) {
  wsDelivery = val;
  document.getElementById('ws-del-ship').classList.toggle('sel', true);
}

// Step 1 canonical dim-box: mount pills write to the hidden #ws-mount field.
function wsSetMount(val) {
  document.getElementById('ws-mount').value = val;
}

// Step 1 canonical qty stepper — clamps #ws-qty to 1–20.
function wsAdjustQty(delta) {
  const el = document.getElementById('ws-qty');
  let v = (parseInt(el.value, 10) || 1) + delta;
  if (v < 1) v = 1;
  if (v > 20) v = 20;
  el.value = v;
}

function submitWSQuote() {
  const name = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!phone) { alert('Please enter your phone number.'); return; }
  if (!document.getElementById('ws-mount').value.trim()) { alert('Please select a mount type (Inside or Outside).'); return; }
  const subject = encodeURIComponent('Walden Select Woven Shade Quote — ' + name);
  const body = encodeURIComponent([
    'WALDEN SELECT WOVEN SHADE QUOTE REQUEST',
    '=========================================',
    '',
    'CUSTOMER INFO',
    'Name: ' + name,
    'Phone: ' + phone,
    'Email: ' + (document.getElementById('cf-email').value || 'Not provided'),
    '',
    'SHADE DETAILS',
    'Pattern/Color: ' + (document.getElementById('ws-pattern').value || 'Not specified'),
    'Product Type: ' + (document.getElementById('ws-type').value || 'Roman Shade'),
    'Style: ' + (document.getElementById('ws-style').value || 'Not selected'),
    'Width: ' + (document.getElementById('ws-width').value ? document.getElementById('ws-width').value + '"' : 'Not entered'),
    'Height: ' + (document.getElementById('ws-height').value ? document.getElementById('ws-height').value + '"' : 'Not entered'),
    'Quantity: ' + (document.getElementById('ws-qty').value || '1'),
    'Control: ' + (document.getElementById('ws-control').value || 'Not selected'),
    'Mount: ' + (document.getElementById('ws-mount').value || 'Not selected'),
    'Delivery: ' + ('Ship via UPS/FedEx'),
    '',
    'NOTES',
    document.getElementById('cf-notes').value || '(none)',
  ].join('\n'));
  window.location.href = 'mailto:blindznation@gmail.com?subject=' + subject + '&body=' + body;
}

function addWaldenSelectToCart() {
  const type = document.getElementById('ws-type').value || 'Roman Shade';
  const pattern = document.getElementById('ws-pattern').value || '—';
  const w = document.getElementById('ws-width').value || '—';
  const h = document.getElementById('ws-height').value || '—';
  const qty = parseInt(document.getElementById('ws-qty').value) || 1;
  const control = document.getElementById('ws-control').value || '—';
  const lines = [
    { label: 'Product', value: 'Walden Select Natural Woven Shade' },
    { label: 'Type', value: type },
    { label: 'Pattern', value: pattern },
    { label: 'Size', value: w + '″ × ' + h + '″' },
    { label: 'Control', value: control },
    { label: 'Quantity', value: String(qty) }
  ];
  pbAddToCart({ product: 'Walden Select Natural Woven Shade', lines: lines, specs: lines.map(function(l){ return l.label+': '+l.value; }).join(' | '), qty: qty });
  pbOpenCart();
}
