// Measure / installation request — sent straight to justin@blindznation.com through
// /api/quote (Resend), so it arrives even if the customer never opens their mail app.
// The API silently drops a request without a numeric _t ≥ 2000 ms (bot filter), so
// _t is always sent: time since the page loaded (_formLoadTime is set in shared.js).
var INST_PRICING = 'Measure $150 min within 20 mi of Midvale UT (farther priced by distance) · ' +
  'Install from $30/shade · battery motor +$15/shade · hardwired +$60/shade · ' +
  'drapery $20/linear ft · steaming $15/ft · subject to change for location, access, ladder height, surface';

async function submitInstall() {
  var val = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ''; };
  var name = val('inst-name'), phone = val('inst-phone'), email = val('inst-email'), address = val('inst-address');
  var need = val('inst-need') || 'Measure';
  var err = document.getElementById('inst-contact-err');
  var showErr = function (msg) { if (err) { err.innerHTML = msg; err.style.display = 'block'; } else alert(msg); };
  if (!name || !phone) { showErr('Please enter your name and phone number.'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showErr('Please enter a valid email so we can confirm your appointment.'); return; }
  if (!address) { showErr('Please enter the address so we can confirm the distance from Midvale.'); return; }
  if (err) err.style.display = 'none';

  var selections = [
    { label: 'Request', value: need },
    { label: 'Address', value: address },
    { label: 'Product type', value: val('inst-product') },
    { label: 'Number of windows', value: val('inst-windows') },
    { label: 'Product source', value: val('inst-source') },
    { label: 'Motorization', value: val('inst-motor') },
    { label: 'Pricing shown to customer', value: INST_PRICING }
  ];
  var notes = val('inst-notes');
  var btn = document.getElementById('inst-submit');
  if (btn) { btn.disabled = true; btn.textContent = 'Sending…'; }
  try {
    var r = await fetch('/api/quote', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name, email: email, phone: phone, address: address,
        product: need + ' request', delivery: need, selections: selections, notes: notes,
        agreedToTerms: true, agreedToTermsAt: new Date().toISOString(),
        sourceUrl: window.location.href, _hp: '',
        _t: Date.now() - (typeof _formLoadTime === 'number' ? _formLoadTime : 0)
      })
    });
    var d = await r.json().catch(function () { return {}; });
    if (!r.ok) throw new Error(d.error || 'Server error');
    try { if (typeof pbSaveContact === 'function') pbSaveContact({ name: name, email: email, phone: phone }); } catch (e) {}
    document.getElementById('quote-form-wrap').style.display = 'none';
    var ok = document.getElementById('inst-success');
    ok.style.display = 'block';
    ok.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } catch (e) {
    // Email service down → hand the customer a pre-filled email instead of losing the request.
    var body = 'BLINDZNATION\n\n' + need.toUpperCase() + ' REQUEST\n\n' +
      selections.map(function (s) { return s.label + ': ' + s.value; }).join('\n') +
      '\n\nName: ' + name + '\nPhone: ' + phone + '\nEmail: ' + email + '\n\nDetails:\n' + (notes || 'None provided');
    var mail = 'mailto:justin@blindznation.com?subject=' + encodeURIComponent('Blindznation — ' + need + ' request — ' + name) + '&body=' + encodeURIComponent(body);
    showErr('<strong>We couldn’t send that just now.</strong> <a href="' + mail + '" style="font-weight:700;text-decoration:underline">Email your request directly →</a> or call <a href="tel:6097421720">(609) 742-1720</a>.');
    if (btn) { btn.disabled = false; btn.textContent = 'Send request →'; }
  }
}
