function submitInstall() {
  var name    = document.getElementById('inst-name').value.trim();
  var phone   = document.getElementById('inst-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
  var email   = document.getElementById('inst-email').value.trim();
  var address = document.getElementById('inst-address').value.trim();
  var product = document.getElementById('inst-product').value;
  var windows = document.getElementById('inst-windows').value;
  var source  = document.getElementById('inst-source').value;
  var motor   = document.getElementById('inst-motor').value;
  var notes   = document.getElementById('inst-notes').value.trim();
  var delivery = getOpt('grp-del-inst');
  var body = 'INSTALLATION QUOTE REQUEST\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + (email || '—') + '\n'
    + 'Address: ' + (address || '—') + '\n\n'
    + 'Product type: ' + product + '\nNumber of windows: ' + windows + '\n'
    + 'Product source: ' + source + '\nMotorization: ' + motor + '\n'
    + 'Delivery preference: ' + delivery + '\n\n'
    + 'Project details:\n' + (notes || 'None provided');
  window.location.href = 'mailto:blindznation@gmail.com'
    + '?subject=' + encodeURIComponent('Installation Quote Request — ' + name)
    + '&body=' + encodeURIComponent(body);
  document.getElementById('quote-form-wrap').style.display = 'none';
  document.getElementById('inst-success').style.display = 'block';
}
