let wpDelivery = 'ship';
function wpSetDelivery(val) {
  wpDelivery = val;
  document.getElementById('wp-del-ship').classList.toggle('sel', true);
}

function submitWPQuote() {
  const name = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  const errEl = document.getElementById('cf-contact-err');
  if (errEl) errEl.style.display = 'none';
  if (!name) { if (errEl) { errEl.textContent = 'Please enter your name.'; errEl.style.display = 'block'; } else { alert('Please enter your name.'); } return; }
  if (!phone) { if (errEl) { errEl.textContent = 'Please enter your phone number.'; errEl.style.display = 'block'; } else { alert('Please enter your phone number.'); } return; }
  const mount = getOpt('grp-mount');
  if (!mount || mount === '—') { if (errEl) { errEl.textContent = 'Please select a mount type (Inside or Outside).'; errEl.style.display = 'block'; } else { alert('Please select a mount type (Inside or Outside).'); } return; }
  const subject = encodeURIComponent('Walden Premier Woven Shade Quote — ' + name);
  const body = encodeURIComponent([
    'WALDEN PREMIER WOVEN SHADE QUOTE REQUEST',
    '==========================================',
    '',
    'CUSTOMER INFO',
    'Name: ' + name,
    'Phone: ' + phone,
    'Email: ' + (document.getElementById('cf-email').value || 'Not provided'),
    '',
    'SHADE DETAILS',
    'Pattern/Color: ' + (document.getElementById('wp-pattern').value || 'Not specified'),
    'Product Type: ' + (document.getElementById('wp-type').value || 'Roman Shade'),
    'Style: ' + (document.getElementById('wp-style').value || 'Not selected'),
    'Width: ' + (document.getElementById('wp-width').value ? document.getElementById('wp-width').value + '"' : 'Not entered'),
    'Height: ' + (document.getElementById('wp-height').value ? document.getElementById('wp-height').value + '"' : 'Not entered'),
    'Quantity: ' + (document.getElementById('wp-qty').value || '1'),
    'Control: ' + (document.getElementById('wp-control').value || 'Not selected'),
    'Mount: ' + mount,
    'Delivery: ' + ('Ship via UPS/FedEx'),
    '',
    'NOTES',
    document.getElementById('cf-notes').value || '(none)',
  ].join('\n'));
  window.location.href = 'mailto:blindznation@gmail.com?subject=' + subject + '&body=' + body;
}

function addWaldenPremierToCart() {
  const type = document.getElementById('wp-type').value || 'Roman Shade';
  const pattern = document.getElementById('wp-pattern').value || '—';
  const w = document.getElementById('wp-width').value || '—';
  const h = document.getElementById('wp-height').value || '—';
  const qty = parseInt(document.getElementById('wp-qty').value) || 1;
  const control = document.getElementById('wp-control').value || '—';
  const mount = getOpt('grp-mount');
  const lines = [
    { label: 'Product', value: 'Walden Premier Natural Woven Shade' },
    { label: 'Type', value: type },
    { label: 'Pattern', value: pattern },
    { label: 'Size', value: w + '″ × ' + h + '″' },
    { label: 'Mount', value: mount },
    { label: 'Control', value: control },
    { label: 'Quantity', value: String(qty) }
  ];
  pbAddToCart({ product: 'Walden Premier Natural Woven Shade', lines: lines, specs: lines.map(function(l){ return l.label+': '+l.value; }).join(' | '), qty: qty });
  pbOpenCart();
}
