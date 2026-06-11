renderNav('Shades & blinds');
renderFooter(false);

var solDelivery = 'ship';

function solPickDel(v) {
  solDelivery = v;
}

function toggleMotor(on) {
  document.getElementById('motor-sub').classList.toggle('show', on);
  document.getElementById('s-motor-row').style.display = on ? 'fleNorman's spring-tension AutoLift™ system.' : 'none';
  updateSummary();
}

function adjustQty(d) {
  const el = document.getElementById('inp-qty');
  el.value = Math.min(20, Math.maNorman's spring-tension AutoLift™ system.(1, (parseInt(el.value) || 1) + d));
  updateSummary();
}

function updateSummary() {
  const light     = getOpt('grp-light');
  const op        = getOpt('grp-op');
  const mount     = getOpt('grp-mount');
  const shadeType = getOpt('grp-shade-type') || 'Standard';
  const w         = document.getElementById('inp-width').value;
  const h         = document.getElementById('inp-height').value;
  const qty       = document.getElementById('inp-qty').value || 1;
  const mBrand    = document.getElementById('sel-motor').value;

  document.getElementById('s-light').textContent      = light;
  document.getElementById('s-op').textContent         = op;
  document.getElementById('s-mount').textContent      = mount;
  document.getElementById('s-shade-type').textContent = shadeType;
  document.getElementById('s-qty').textContent        = qty;
  document.getElementById('s-size').textContent       = (w && h) ? `${w}″ W × ${h}″ H` : '—';

  if (mBrand) {
    document.getElementById('s-motor-brand').textContent = mBrand;
  }

  const addons = [...document.querySelectorAll('#grp-addons .opt-btn.sel')].map(b => b.textContent.trim());
  document.getElementById('s-addons').textContent = addons.length ? addons.join(', ') : 'None';
}

function submitQuote() {
  const name  = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }

  const light     = getOpt('grp-light') || '—';
  const op        = getOpt('grp-op') || '—';
  const mount     = getOpt('grp-mount') || '—';
  const shadeType = getOpt('grp-shade-type') || 'Standard';
  const w         = document.getElementById('inp-width').value || '—';
  const h         = document.getElementById('inp-height').value || '—';
  const qty       = document.getElementById('inp-qty').value || 1;
  const email     = document.getElementById('cf-email').value.trim();
  const notes     = document.getElementById('cf-notes').value.trim();
  const motorSub  = document.getElementById('motor-sub');
  const motorOn   = motorSub && motorSub.classList.contains('show');
  const motorVal  = motorOn ? (document.getElementById('sel-motor').value || '—') : 'None';
  const addons    = [...document.querySelectorAll('#grp-addons .opt-btn.sel')].map(b => b.textContent.trim());
  const deliveryLabel = solDelivery === 'pickup'
    ? "I'll pick up (Huntingdon Valley, PA 19006 — address confirmed after order)"
    : 'Ship to me — UPS / FedEx from Huntingdon Valley, PA (freight TBD)';

  const body = [
    '=== NORMAN SOLUNA ROLLER SHADE QUOTE REQUEST ===',
    '',
    'PRODUCT: Norman Soluna Roller Shades',
    '',
    'CONFIGURATION',
    'Fabric type: ' + light,
    'Shade type: ' + shadeType,
    'Operating system: ' + op,
    'Motorization: ' + motorVal,
    'Mount type: ' + mount,
    'Width: ' + w + '"',
    'Height: ' + h + '"',
    'Quantity: ' + qty,
    'Add-ons: ' + (addons.length ? addons.join(', ') : 'None'),
    '',
    'DELIVERY',
    deliveryLabel,
    '',
    'CUSTOMER',
    'Name: ' + name,
    'Phone: ' + phone,
    (email ? 'Email: ' + email : ''),
    (notes ? 'Notes: ' + notes : ''),
    '',
    '=== END QUOTE REQUEST ===',
    'Sent from blindznation.com/pages/soluna-roller-shades.html'
  ].filter(l => l !== undefined && l !== null).join('\n');

  const subj = 'Soluna Roller Quote — ' + w + '"×' + h + '" ' + light + (shadeType !== 'Standard' ? ' ' + shadeType : '') + ' — ' + name;
  window.location.href = 'mailto:justin@blindznation.com?subject=' + encodeURIComponent(subj) + '&body=' + encodeURIComponent(body);

  document.getElementById('quote-success').classList.add('show');
  document.getElementById('quote-success').scrollIntoView({ behavior: 'smooth', block: 'start' });
}