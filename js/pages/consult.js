function showPanel(id, el) {
  document.querySelectorAll('.path-tab').forEach(function(t){ t.classList.remove('active'); });
  document.querySelectorAll('.form-panel').forEach(function(p){ p.classList.remove('active'); });
  el.classList.add('active');
  document.getElementById('panel-' + id).classList.add('active');
}

function submitInperson() {
  var name    = document.getElementById('ip-name').value.trim();
  var phone   = document.getElementById('ip-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  var email   = document.getElementById('ip-email').value.trim();
  var address = document.getElementById('ip-address').value.trim();
  var day     = document.getElementById('ip-day').value;
  var time    = document.getElementById('ip-time').value;
  var products= document.getElementById('ip-products').value.trim();
  var windows = document.getElementById('ip-windows').value;
  var notes   = document.getElementById('ip-notes').value.trim();
  var body = 'IN-HOME VISIT REQUEST\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + (email || '—') + '\n'
    + 'Address: ' + (address || '—') + '\n\n'
    + 'Preferred day: ' + day + '\nPreferred time: ' + time + '\n'
    + 'Products interested in: ' + (products || '—') + '\n'
    + 'Number of windows: ' + windows + '\n\n'
    + 'Notes: ' + (notes || 'None');
  window.pbMailto = 'mailto:justin@blindznation.com'
    + '?subject=' + encodeURIComponent('Blindznation — ' + 'In-Home Visit Request — ' + name)
    + '&body=' + encodeURIComponent('BLINDZNATION\n\n' + body);
  document.getElementById('card-inperson').style.display = 'none';
  document.getElementById('success-inperson').style.display = 'block';
}

function submitCallback() {
  var name  = document.getElementById('cb-name').value.trim();
  var phone = document.getElementById('cb-phone').value.trim();
  if (!name) { alert('Please enter your name.'); return; }
  var time  = document.getElementById('cb-time').value;
  var topic = document.getElementById('cb-topic').value;
  var notes = document.getElementById('cb-notes').value.trim();
  var email = ((document.getElementById('cb-email') || {}).value || '').trim();
  var body = 'CALLBACK REQUEST\n\n'
    + 'Name: ' + name + '\nEmail: ' + email + '\nPhone: ' + (phone || '—') + '\n'
    + 'Best time to call: ' + time + '\n'
    + 'Topic: ' + topic + '\n\n'
    + 'Notes: ' + (notes || 'None');
  window.pbMailto = 'mailto:justin@blindznation.com'
    + '?subject=' + encodeURIComponent('Blindznation — ' + 'Callback Request — ' + name)
    + '&body=' + encodeURIComponent('BLINDZNATION\n\n' + body);
  document.getElementById('card-callback').style.display = 'none';
  document.getElementById('success-callback').style.display = 'block';
}
