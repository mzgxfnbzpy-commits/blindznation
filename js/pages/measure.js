  renderNav('How to measure');
  renderFooter(false);

  /* ---- Tab switching ---- */
  function showTab(tabId) {
    /* Hide all panels */
    var panels = document.querySelectorAll('.tab-panel');
    for (var i = 0; i < panels.length; i++) {
      panels[i].classList.remove('active');
    }
    /* Show target panel */
    var target = document.getElementById('tab-' + tabId);
    if (target) { target.classList.add('active'); }

    /* Update tab button states */
    var btns = document.querySelectorAll('.tab-btn');
    for (var j = 0; j < btns.length; j++) {
      var onc = btns[j].getAttribute('onclick') || '';
      if (onc === "showTab('" + tabId + "')") {
        btns[j].classList.add('active');
      } else {
        btns[j].classList.remove('active');
      }
    }

    /* Smooth-scroll tab nav into view on mobile */
    var navWrap = document.querySelector('.tab-nav-wrap');
    if (navWrap) {
      navWrap.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }