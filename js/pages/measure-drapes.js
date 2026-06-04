renderNav('How to measure');
renderFooter(false);
function showTab(id) {
  document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
  document.getElementById('tab-' + id).classList.add('active');
  event.currentTarget.classList.add('active');
}