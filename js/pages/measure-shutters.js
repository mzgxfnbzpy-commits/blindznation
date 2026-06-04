  renderNav('How to measure');
  renderFooter(false);

  function showTab(tabId) {
    var panels = document.querySelectorAll('.tab-panel');
    for (var i = 0; i < panels.length; i++) {
      panels[i].classList.remove('active');
    }
    var target = document.getElementById('tab-' + tabId);
    if (target) { target.classList.add('active'); }

    var btns = document.querySelectorAll('.tab-btn');
    for (var j = 0; j < btns.length; j++) {
      var onc = btns[j].getAttribute('onclick') || '';
      if (onc === "showTab('" + tabId + "')") {
        btns[j].classList.add('active');
      } else {
        btns[j].classList.remove('active');
      }
    }

    var navWrap = document.querySelector('.tab-nav-wrap');
    if (navWrap) {
      navWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }