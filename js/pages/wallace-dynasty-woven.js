renderNav('Woven Wood Shades');
renderFooter(false);

let dyDelivery = 'ship';
function dySetDelivery(val) {
  dyDelivery = val;
  document.getElementById('dy-del-ship').classList.toggle('sel', val === 'ship');
  document.getElementById('dy-del-pickup').classList.toggle('sel', val === 'pickup');
}

function submitDynastyQuote() {
  const name = document.getElementById('dy-name').value.trim();
  const phone = document.getElementById('dy-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!phone) { alert('Please enter your phone number.'); return; }

  const subject = encodeURIComponent('Dynasty Woven Wood Shade Quote — ' + name);
  const body = encodeURIComponent([
    'DYNASTY WOVEN WOOD SHADE QUOTE REQUEST',
    '========================================',
    '',
    'CUSTOMER INFO',
    'Name: ' + name,
    'Phone: ' + phone,
    'Email: ' + (document.getElementById('dy-email').value || 'Not provided'),
    '',
    'SHADE DETAILS',
    'Pattern: ' + (document.getElementById('dy-pattern').value || 'Not specified'),
    'Width: ' + (document.getElementById('dy-width').value ? document.getElementById('dy-width').value + '"' : 'Not entered'),
    'Height: ' + (document.getElementById('dy-height').value ? document.getElementById('dy-height').value + '"' : 'Not entered'),
    'Quantity: ' + (document.getElementById('dy-qty').value || '1'),
    'Style: ' + (document.getElementById('dy-style').value || 'Not selected'),
    'Control: ' + (document.getElementById('dy-control').value || 'Not selected'),
    'Mount: ' + (document.getElementById('dy-mount').value || 'Not selected'),
    'Delivery: ' + (dyDelivery === 'ship' ? 'Ship via UPS/FedEx' : 'Customer pickup'),
    '',
    'NOTES',
    document.getElementById('dy-notes').value || '(none)',
  ].join('\n'));

  window.location.href = 'mailto:justin@blindznation.com?subject=' + subject + '&body=' + body;
}