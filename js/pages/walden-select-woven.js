renderNav('Woven Wood Shades');
renderFooter(false);

let wsDelivery = 'ship';
function wsSetDelivery(val) {
  wsDelivery = val;
  document.getElementById('ws-del-ship').classList.toggle('sel', val === 'ship');
  document.getElementById('ws-del-pickup').classList.toggle('sel', val === 'pickup');
}

function submitWSQuote() {
  const name = document.getElementById('ws-name').value.trim();
  const phone = document.getElementById('ws-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!phone) { alert('Please enter your phone number.'); return; }

  const subject = encodeURIComponent('Walden Select Woven Shade Quote — ' + name);
  const body = encodeURIComponent([
    'WALDEN SELECT WOVEN SHADE QUOTE REQUEST',
    '=========================================',
    '',
    'CUSTOMER INFO',
    'Name: ' + name,
    'Phone: ' + phone,
    'Email: ' + (document.getElementById('ws-email').value || 'Not provided'),
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
    'Delivery: ' + (wsDelivery === 'ship' ? 'Ship via UPS/FedEx' : 'Customer pickup'),
    '',
    'NOTES',
    document.getElementById('ws-notes').value || '(none)',
  ].join('\n'));

  window.location.href = 'mailto:justin@blindznation.com?subject=' + subject + '&body=' + body;
}