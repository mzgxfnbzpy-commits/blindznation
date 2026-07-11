function switchTab(id, btn) {
  document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
  document.getElementById('tab-' + id).classList.add('active');
  btn.classList.add('active');
}
