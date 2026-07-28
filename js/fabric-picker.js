// ============================================================
// Blindznation — Shared Fabric / Color Picker
// ------------------------------------------------------------
// One reusable selector so every product's color UI looks & behaves
// identically: light-control TYPE tabs → (optional) PRICE-GROUP sections →
// named COLLECTIONS → color swatches.
//
// Products differ only in the DATA they feed in. Usage:
//
//   pbFabricPicker.render('my-container', {
//     types: [
//       { key:'lf', label:'Light Filtering', desc:'Softens light, daytime privacy' },
//       { key:'rd', label:'Room Darkening',  desc:'Maximum darkness & privacy' }
//     ],
//     collections: [
//       { type:'lf', pg:1, pgLabel:'Best value', name:'Serene',
//         colors:[ {n:'Snow White', c:'F1158', hex:'#f4f1e8'}, ... ] },
//       ...
//     ],
//     showPriceGroups: true,          // group collections under price-tier headers
//     priceGroupTabs: true,           // …and put each price group behind its own tab
//                                     // instead of stacking them (keeps long lists short)
//     defaultType: 'lf',              // which tab opens first (optional)
//     onSelect: function(sel){ ... }  // sel = {type, collection, name, code, hex}
//   });
//
//   var sel = pbFabricPicker.getSelection('my-container'); // or null
// ============================================================
window.pbFabricPicker = (function () {
  var _stylesInjected = false;

  function _injectStyles() {
    if (_stylesInjected) return;
    _stylesInjected = true;
    var css =
      '.pbfp{--pbfp-accent:var(--gold,#C9A96E);font-family:inherit}' +
      '.pbfp-tabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}' +
      '.pbfp-tab{appearance:none;border:1px solid #d8cdbb;background:#fff;color:#3a3128;' +
        'font:inherit;font-size:12.5px;font-weight:600;padding:8px 14px;border-radius:8px;cursor:pointer;' +
        'transition:background .12s,border-color .12s,color .12s;line-height:1.1}' +
      '.pbfp-tab:hover{border-color:var(--pbfp-accent)}' +
      '.pbfp-tab.sel{background:var(--pbfp-accent);border-color:var(--pbfp-accent);color:#231a0d}' +
      '.pbfp-tab .pbfp-tab-sub{display:block;font-size:10px;font-weight:400;opacity:.7;margin-top:2px}' +
      '.pbfp-tab.sel .pbfp-tab-sub{opacity:.85}' +
      // Price-group tab bar sits under the type tabs — lighter so the type stays primary.
      '.pbfp-subtabs{gap:5px;margin-bottom:10px;padding-bottom:10px;border-bottom:1px solid #ece5d8}' +
      '.pbfp-subtabs .pbfp-tab{padding:5px 10px;font-size:11px}' +
      '.pbfp-typedesc{font-size:12px;color:inherit;opacity:.72;line-height:1.5;margin:0 0 12px}' +
      '.pbfp-pg{margin:0 0 14px}' +
      '.pbfp-pg-head{display:flex;align-items:baseline;gap:8px;margin:0 0 8px;padding-top:10px;' +
        'border-top:1px solid rgba(128,120,105,.28)}' +
      '.pbfp-pg:first-child .pbfp-pg-head{border-top:none;padding-top:0}' +
      '.pbfp-pg-name{font-size:10px;font-weight:700;letter-spacing:.9px;text-transform:uppercase;color:var(--pbfp-accent)}' +
      '.pbfp-pg-tier{font-size:11px;color:inherit;opacity:.6;font-weight:500}' +
      '.pbfp-coll{margin:0 0 10px}' +
      '.pbfp-coll-name{font-size:10px;font-weight:600;letter-spacing:.7px;text-transform:uppercase;color:inherit;opacity:.6;margin:0 0 5px}' +
      '.pbfp-coll-name .pbfp-warn{color:#e67e22;font-weight:400;text-transform:none;letter-spacing:0;margin-left:5px}' +
      '.pbfp-swatches{display:flex;flex-wrap:wrap;gap:6px}' +
      '.pbfp-sw{appearance:none;display:inline-flex;align-items:center;gap:7px;border:1px solid #ddd4c5;' +
        'background:#fff;color:#3a3128;font:inherit;font-size:11.5px;padding:5px 10px 5px 6px;border-radius:7px;' +
        'cursor:pointer;transition:border-color .12s,box-shadow .12s;line-height:1.1}' +
      '.pbfp-sw:hover{border-color:var(--pbfp-accent)}' +
      '.pbfp-sw.sel{border-color:var(--pbfp-accent);box-shadow:0 0 0 1px var(--pbfp-accent) inset}' +
      '.pbfp-sw:focus-visible,.pbfp-tab:focus-visible{outline:2px solid var(--pbfp-accent);outline-offset:2px}' +
      '.pbfp-dot{width:16px;height:16px;border-radius:50%;flex-shrink:0;border:1px solid rgba(0,0,0,.18)}' +
      '.pbfp-empty{font-size:12px;color:inherit;opacity:.55;font-style:italic;padding:8px 0}' +
      '@media (max-width:520px){.pbfp-tab{flex:1 1 auto;text-align:center}}';
    var s = document.createElement('style');
    s.setAttribute('data-pbfp', '1');
    s.textContent = css;
    document.head.appendChild(s);
  }

  function _clean(name) {
    return name.replace(/\s*⚠.*$/, '').trim();
  }
  function _warn(name) {
    var m = name.match(/⚠\s*(.+)$/);
    return m ? m[1].trim() : '';
  }

  function _renderType(container, config, typeKey) {
    var panel = container.querySelector('.pbfp-panel');
    panel.innerHTML = '';
    var type = config.types.filter(function (t) { return t.key === typeKey; })[0];
    if (type && type.desc) {
      var d = document.createElement('p');
      d.className = 'pbfp-typedesc';
      d.textContent = type.desc;
      panel.appendChild(d);
    }
    var colls = config.collections.filter(function (c) { return c.type === typeKey; });
    if (!colls.length) {
      var e = document.createElement('div');
      e.className = 'pbfp-empty';
      e.textContent = 'No fabrics in this category.';
      panel.appendChild(e);
      return;
    }

    // Group by price group when requested; otherwise one implicit group.
    var groups;
    if (config.showPriceGroups) {
      var order = [];
      var byPg = {};
      colls.forEach(function (c) {
        var key = (c.pg === undefined || c.pg === null) ? '_' : String(c.pg);
        if (!byPg[key]) { byPg[key] = { pg: c.pg, pgLabel: c.pgLabel, colls: [] }; order.push(key); }
        byPg[key].colls.push(c);
      });
      order.sort(function (a, b) {
        if (a === '_') return 1; if (b === '_') return -1;
        var na = parseFloat(a), nb = parseFloat(b);
        if (!isNaN(na) && !isNaN(nb)) return na - nb;   // numeric groups (1,2,3…)
        return String(a).localeCompare(String(b));       // letter groups (A,B,C…)
      });
      groups = order.map(function (k) { return byPg[k]; });
    } else {
      groups = [{ pg: null, colls: colls }];
    }

    _paintGroups(container, config, typeKey, panel, groups);
  }

  // Either stack every price group down the page (default), or put the groups behind
  // their own tab bar so a long fabric list collapses to one group at a time.
  function _paintGroups(container, config, typeKey, panel, groups) {
    if (!(config.priceGroupTabs && groups.length > 1)) {
      groups.forEach(function (grp) {
        panel.appendChild(_renderGroup(container, config, typeKey, grp, !!config.showPriceGroups));
      });
      return;
    }
    var sub = document.createElement('div');
    sub.className = 'pbfp-tabs pbfp-subtabs';
    sub.setAttribute('role', 'tablist');
    sub.setAttribute('aria-label', 'Price group');
    var body = document.createElement('div');
    groups.forEach(function (grp) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'pbfp-tab';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-selected', 'false');
      var main = document.createElement('span');
      main.textContent = (grp.pg === undefined || grp.pg === null) ? 'Other' : 'Group ' + grp.pg;
      b.appendChild(main);
      if (grp.pgLabel) {
        var s = document.createElement('span');
        s.className = 'pbfp-tab-sub';
        s.textContent = grp.pgLabel;
        b.appendChild(s);
      }
      b.onclick = function () {
        sub.querySelectorAll('.pbfp-tab').forEach(function (x) {
          x.classList.remove('sel'); x.setAttribute('aria-selected', 'false');
        });
        b.classList.add('sel');
        b.setAttribute('aria-selected', 'true');
        body.innerHTML = '';
        // Group head is redundant once the tab itself names the group.
        body.appendChild(_renderGroup(container, config, typeKey, grp, false));
      };
      sub.appendChild(b);
    });
    panel.appendChild(sub);
    panel.appendChild(body);
    sub.querySelector('.pbfp-tab').click();
  }

  // Renders one price group (optional header + its collections and swatches).
  function _renderGroup(container, config, typeKey, grp, showHead) {
    var gDiv = document.createElement('div');
    gDiv.className = 'pbfp-pg';
    if (showHead && grp.pg !== undefined && grp.pg !== null) {
      var head = document.createElement('div');
      head.className = 'pbfp-pg-head';
      var nm = document.createElement('span');
      nm.className = 'pbfp-pg-name';
      nm.textContent = 'Group ' + grp.pg;
      head.appendChild(nm);
      if (grp.pgLabel) {
        var tr = document.createElement('span');
        tr.className = 'pbfp-pg-tier';
        tr.textContent = grp.pgLabel;
        head.appendChild(tr);
      }
      gDiv.appendChild(head);
    }
    grp.colls.forEach(function (coll) {
        var cDiv = document.createElement('div');
        cDiv.className = 'pbfp-coll';
        if (coll.name) {
          var cn = document.createElement('div');
          cn.className = 'pbfp-coll-name';
          cn.textContent = _clean(coll.name);
          var w = _warn(coll.name);
          if (w) {
            var ws = document.createElement('span');
            ws.className = 'pbfp-warn';
            ws.textContent = '⚠ ' + w;
            cn.appendChild(ws);
          }
          cDiv.appendChild(cn);
        }
        var row = document.createElement('div');
        row.className = 'pbfp-swatches';
        (coll.colors || []).forEach(function (color) {
          var btn = document.createElement('button');
          btn.type = 'button';
          btn.className = 'pbfp-sw';
          btn.setAttribute('aria-pressed', 'false');
          btn.setAttribute('aria-label',
            color.n + (color.c ? ', ' + color.c : '') + (coll.name ? ', ' + _clean(coll.name) : ''));
          if (color.hex) {
            var dot = document.createElement('span');
            dot.className = 'pbfp-dot';
            dot.style.background = color.hex;
            dot.setAttribute('aria-hidden', 'true');
            btn.appendChild(dot);
          }
          var lbl = document.createElement('span');
          lbl.textContent = color.n;
          btn.appendChild(lbl);
          if (color.c) btn.title = color.c;
          btn.onclick = function () {
            container.querySelectorAll('.pbfp-sw.sel').forEach(function (b) { b.classList.remove('sel'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('sel');
            btn.setAttribute('aria-pressed', 'true');
            container._pbfpSel = {
              type: typeKey,
              collection: _clean(coll.name || ''),
              name: color.n,
              code: color.c || '',
              hex: color.hex || '',
              pg: (coll.pg === undefined ? null : coll.pg)
            };
            if (typeof config.onSelect === 'function') config.onSelect(container._pbfpSel);
          };
          row.appendChild(btn);
        });
      cDiv.appendChild(row);
      gDiv.appendChild(cDiv);
    });
    return gDiv;
  }

  function render(containerId, config) {
    _injectStyles();
    var container = document.getElementById(containerId);
    if (!container) return;
    container.className = (container.className || '').replace(/\bpbfp\b/, '').trim() + ' pbfp';
    container.innerHTML = '';
    container._pbfpSel = null;
    container._pbfpConfig = config;
    if (!container.getAttribute('role')) container.setAttribute('role', 'group');
    if (!container.getAttribute('aria-label')) container.setAttribute('aria-label', 'Fabric color selection');

    var tabs = null;
    // Hide the tab bar for single-type products (type is chosen elsewhere).
    if (!config.hideTabs && config.types.length > 1) {
      tabs = document.createElement('div');
      tabs.className = 'pbfp-tabs';
      tabs.setAttribute('role', 'tablist');
      tabs.setAttribute('aria-label', 'Fabric type');
      config.types.forEach(function (t, i) {
        var b = document.createElement('button');
        b.type = 'button';
        b.className = 'pbfp-tab';
        b.setAttribute('data-key', t.key);
        b.setAttribute('role', 'tab');
        b.setAttribute('aria-selected', 'false');
        var main = document.createElement('span');
        main.textContent = t.label;
        b.appendChild(main);
        b.onclick = function () {
          tabs.querySelectorAll('.pbfp-tab').forEach(function (x) { x.classList.remove('sel'); x.setAttribute('aria-selected', 'false'); });
          b.classList.add('sel');
          b.setAttribute('aria-selected', 'true');
          _renderType(container, config, t.key);
        };
        tabs.appendChild(b);
      });
      container.appendChild(tabs);
    }

    var panel = document.createElement('div');
    panel.className = 'pbfp-panel';
    container.appendChild(panel);

    var startKey = config.defaultType || (config.types[0] && config.types[0].key);
    if (startKey) {
      if (tabs) {
        var startTab = tabs.querySelector('.pbfp-tab[data-key="' + startKey + '"]');
        if (startTab) { startTab.classList.add('sel'); startTab.setAttribute('aria-selected', 'true'); }
      }
      _renderType(container, config, startKey);
    }
  }

  function getSelection(containerId) {
    var c = document.getElementById(containerId);
    return c ? (c._pbfpSel || null) : null;
  }

  function clearSelection(containerId) {
    var c = document.getElementById(containerId);
    if (!c) return;
    c._pbfpSel = null;
    c.querySelectorAll('.pbfp-sw.sel').forEach(function (b) { b.classList.remove('sel'); });
  }

  return { render: render, getSelection: getSelection, clearSelection: clearSelection };
})();
