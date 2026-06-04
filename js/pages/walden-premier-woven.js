renderNav('Woven Wood Shades');
renderFooter(false);

let wpDelivery = 'ship';
function wpSetDelivery(val) {
  wpDelivery = val;
  document.getElementById('wp-del-ship').classList.toggle('sel', val === 'ship');
  document.getElementById('wp-del-pickup').classList.toggle('sel', val === 'pickup');
}

function submitWPQuote() {
  const name = document.getElementById('wp-name').value.trim();
  const phone = document.getElementById('wp-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  if (!phone) { alert('Please enter your phone number.'); return; }

  const subject = encodeURIComponent('Walden Premier Woven Shade Quote — ' + name);
  const body = encodeURIComponent([
    'WALDEN PREMIER WOVEN SHADE QUOTE REQUEST',
    '==========================================',
    '',
    'CUSTOMER INFO',
    'Name: ' + name,
    'Phone: ' + phone,
    'Email: ' + (document.getElementById('wp-email').value || 'Not provided'),
    '',
    'SHADE DETAILS',
    'Pattern/Color: ' + (document.getElementById('wp-pattern').value || 'Not specified'),
    'Product Type: ' + (document.getElementById('wp-type').value || 'Roman Shade'),
    'Style: ' + (document.getElementById('wp-style').value || 'Not selected'),
    'Width: ' + (document.getElementById('wp-width').value ? document.getElementById('wp-width').value + '"' : 'Not entered'),
    'Height: ' + (document.getElementById('wp-height').value ? document.getElementById('wp-height').value + '"' : 'Not entered'),
    'Quantity: ' + (document.getElementById('wp-qty').value || '1'),
    'Control: ' + (document.getElementById('wp-control').value || 'Not selected'),
    'Mount: ' + (document.getElementById('wp-mount').value || 'Not selected'),
    'Delivery: ' + (wpDelivery === 'ship' ? 'Ship via UPS/FedEx' : 'Customer pickup'),
    '',
    'NOTES',
    document.getElementById('wp-notes').value || '(none)',
  ].join('\n'));

  window.location.href = 'mailto:justin@blindznation.com?subject=' + subject + '&body=' + body;
}