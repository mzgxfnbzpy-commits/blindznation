function showTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
  var target = document.getElementById('tab-' + tabId);
  if (target) target.classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(function(b){
    var onc = b.getAttribute('onclick') || '';
    b.classList.toggle('active', onc === "showTab('" + tabId + "')");
  });
  var nav = document.querySelector('.tab-nav-wrap');
  if (nav) nav.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
