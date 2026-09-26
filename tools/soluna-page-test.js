// Drives pages/soluna-roller-shades.html headlessly and checks the prices it shows.
//   NODE_PATH=<folder with jsdom> node tools/soluna-page-test.js
// Expected figures are Norman retail from the Sept 2026 book (via the handoff), 25% off,
// shipping added at net. See tools/soluna-engine-test.js for the engine-level vectors.
var path = require('path');
var H = require('./harness');
var FILE = path.join(__dirname, '..', 'pages', 'soluna-roller-shades.html');
var fails = 0;
function check(name, cond, extra) { if (!cond) fails++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (extra ? '  — ' + extra : '')); }
function tick() { return new Promise(function (r) { setTimeout(r, 20); }); }

async function fresh() {
  var p = H.load(FILE, 'blindznation.com');
  await tick();
  return p;
}
function txt(d, id) { var e = d.getElementById(id); return e ? e.textContent.trim() : null; }
function vis(d, id) { var e = d.getElementById(id); return !!e && e.style.display !== 'none'; }
function pick(d, sel) { return H.click(d, d.querySelector(sel)); }
function color(d, slot, coll, name) {
  return H.click(d, d.querySelector('#sol-fab-' + slot + ' .opt-btn[data-coll="' + coll + '"][data-name="' + name + '"]'));
}
function btn(d, group, text) {
  var b = Array.prototype.find.call(d.querySelectorAll('#' + group + ' .opt-btn'), function (x) { return x.textContent.trim().indexOf(text) === 0; });
  return H.click(d, b);
}
function size(d, w, h) { H.set(d, 'inp-width', String(w)); H.set(d, 'inp-height', String(h)); }
function prices(d) { return { retail: txt(d, 's-retail'), your: txt(d, 's-your'), ship: txt(d, 's-ship'), total: txt(d, 's-total'), issue: vis(d, 's-issue') ? txt(d, 's-issue') : '' }; }

(async function () {
  var p = await fresh(), d = p.document;
  check('page loads without script errors', p.errors.length === 0, p.errors.join(' | '));
  check('light-filtering picker lists Callie', !!d.querySelector('#sol-fab-main [data-coll="Callie"]'));
  check('no discontinued Francis LF colours offered', !d.querySelector('[data-coll="Francis"]'));
  check('no price before a fabric is picked', !vis(d, 's-price-block'));

  size(d, 48, 60); color(d, 'main', 'Callie', 'Pure White');
  var r = prices(d);
  check('Callie 48×60, mounting rail: retail $503 → $377.25 + $25 = $402.25',
        r.retail === '$503' && r.your === '$377.25' && r.ship === '$25' && r.total === '$402.25', JSON.stringify(r));

  pick(d, '#grp-top [data-top="fascia"]');
  r = prices(d);
  check('curved metal 4½″ fascia (default), raceway included: retail $580 → $435 + $25 = $460', r.retail === '$580' && r.total === '$460', JSON.stringify(r));

  pick(d, '#grp-fascia-mat [data-v="fabric"]');
  r = prices(d);
  check('curved fabric-wrapped 4½″ prices off row 2: retail $601', r.retail === '$601', JSON.stringify(r));
  check('curved fabric: 8″ is not selectable', d.querySelector('#grp-fascia-size [data-v="8"]').classList.contains('blocked'));
  pick(d, '#grp-fascia-size [data-v="8"]');
  check('clicking the blocked 8″ does nothing', d.querySelector('#grp-fascia-size .sel').getAttribute('data-v') === '4.5');
  pick(d, '#grp-fascia-shape [data-v="square"]'); pick(d, '#grp-fascia-size [data-v="8"]');
  r = prices(d);
  check('square fabric-wrapped 8″ (Fabric Valance 8″): retail $674', r.retail === '$674', JSON.stringify(r));

  pick(d, '#grp-top [data-top="cassette"]');
  check('cassette: retail $674 (no raceway line)', prices(d).retail === '$674', JSON.stringify(prices(d)));
  pick(d, '#grp-top [data-top="none"]');
  check('open roll: retail $430 (hem bar still charged)', prices(d).retail === '$430');
  btn(d, 'grp-premium', 'Premium hardware');
  check('open roll + premium hardware: retail $519', prices(d).retail === '$519', JSON.stringify(prices(d)));

  pick(d, '#grp-top [data-top="lg360"]');
  check('Full Blackout Side Channels: retail $805', prices(d).retail === '$805', JSON.stringify(prices(d)));
  btn(d, 'grp-door', 'Yes');
  check('LG360 on a door, inside mount → asks for outside mount', /outside mount/i.test(prices(d).issue) && !vis(d, 's-price-block'), prices(d).issue);
  btn(d, 'grp-mount', 'Outside mount');
  check('LG360 on a door, outside mount → $805, no hold down', prices(d).retail === '$805', JSON.stringify(prices(d)));
  pick(d, '#grp-top [data-top="race"]');
  check('door shade on mounting rail adds the hold down: retail $531', prices(d).retail === '$531', JSON.stringify(prices(d)));
  btn(d, 'grp-mag', 'No hold down');
  check('…and the customer can decline it: retail $503', prices(d).retail === '$503');
  btn(d, 'grp-door', 'No');

  // Blackout: pinned uplift and the no-uplift group jump (open roll, standard hardware, as in the handoff)
  pick(d, '#grp-top [data-top="none"]'); btn(d, 'grp-premium', 'Standard hardware');
  pick(d, '#grp-light [data-cat="rd"]'); color(d, 'main', 'Francis RD', 'Pearl');
  check('Francis RD keeps the +20%: retail $570.40', prices(d).retail === '$570.40', JSON.stringify(prices(d)));
  color(d, 'main', 'Leah RD', 'White');
  check('Leah RD takes no uplift (group 2): retail $478', prices(d).retail === '$478', JSON.stringify(prices(d)));

  // Solar group 1 vs fabric group 1 must not cross
  pick(d, '#grp-light [data-cat="solar"]'); color(d, 'main', 'Flow 7%', 'Polar White');
  size(d, 48, 72);
  check('Flow 7% (solar group 1) 48×72: retail $446', prices(d).retail === '$446', JSON.stringify(prices(d)));

  // Cordless tube limit
  size(d, 24, 120); btn(d, 'grp-op', 'PrecisionLift');
  check('cordless 24×120 refused with a plain reason', /96″ long/.test(prices(d).issue), prices(d).issue);
  btn(d, 'grp-op', 'Manual with chain');
  check('chain 24×120 prices', vis(d, 's-price-block'));

  // Past the chart
  size(d, 130, 60);
  check('130″ wide → manual quote message', /by hand/.test(prices(d).issue), prices(d).issue);

  // Freight
  pick(d, '#grp-light [data-cat="lf"]'); color(d, 'main', 'Callie', 'Pure White');
  size(d, 90, 84); H.set(d, 'inp-qty', '3');
  r = prices(d);
  check('3 × 90″ wide: shipping $180 (wide table)', /^\$180/.test(r.ship), JSON.stringify(r));
  size(d, 89.875, 84);
  check('3 × 89.875″: shipping $47', prices(d).ship === '$47', JSON.stringify(prices(d)));
  H.set(d, 'inp-qty', '1');

  // Coupled: common valance spans all three
  size(d, 48, 60); pick(d, '#grp-top [data-top="fascia"]');
  pick(d, '#grp-fascia-shape [data-v="curved"]'); pick(d, '#grp-fascia-mat [data-v="metal"]');
  H.click(d, d.getElementById('coupled-toggle-btn')); btn(d, 'grp-coupled-count', '3 shades');
  r = prices(d);
  check('coupled 3 × 48″ + curved metal fascia over 144″ (raceways included): retail $1,899', r.retail === '$1,899', JSON.stringify(r));
  check('coupled 3: shipping $47 (three shades)', r.ship === '$47', JSON.stringify(r));
  H.click(d, d.getElementById('coupled-toggle-btn'));

  // Dual
  p = await fresh(); d = p.document;
  size(d, 48, 60);
  btn(d, 'grp-shade-type', 'Dual Shade');
  check('dual forces the square 8″ fabric valance', d.querySelector('#grp-top .sel').getAttribute('data-top') === 'fascia' &&
        d.querySelector('#grp-fascia-size .sel').getAttribute('data-v') === '8' && d.querySelector('#grp-top [data-top="cassette"]').classList.contains('blocked'));
  color(d, 'bo', 'Callie RD', 'Pure White'); color(d, 'lite', 'Callie', 'Pure White');
  r = prices(d);
  check('dual Callie + Callie RD: retail $1,259.80 → $944.85 + $36 = $980.85',
        r.retail === '$1,259.80' && r.your === '$944.85' && r.ship === '$36' && r.total === '$980.85', JSON.stringify(r));
  check('dual hides the coupled button', !vis(d, 'coupled-toggle-btn'));

  // Motorization adds its own line
  btn(d, 'grp-op', 'Motorized');
  await tick();
  r = prices(d);
  check('motorized dual adds a motor line to the total', vis(d, 's-motor-price-row') && r.total !== '$980.85', JSON.stringify(r) + ' motor ' + txt(d, 's-motor-price'));

  // Email + cart
  // jsdom can't capture the mailto navigation, so read the lines submitQuote() puts in the body.
  var rq = p.window.solQuote();
  var body = p.window._solNormanLines(rq).concat(p.window._solPriceLines(rq)).join('\n');
  check('email names Norman\'s product: Fabric Valance 8″ (raceway included)', /Norman top treatment: Fabric Valance 8" \(raceway included\)/.test(body), body.split('\n').filter(function (l) { return /Norman/.test(l); }).join(' / '));
  check('email carries 25% and shipping lines', /Norman discount 25%/.test(body) && /Shipping \(net, not discounted\): \$36/.test(body));
  check('email goes only to justin@blindznation.com', /mailto:justin@blindznation\.com\?subject=/.test(p.window.submitQuote.toString()) && !/phillyblinds/.test(p.window.submitQuote.toString()));
  p.window.addSolunaToCart();
  var cart = JSON.parse(p.window.localStorage.getItem('pb_cart_v1') || '[]');
  var item = cart[cart.length - 1] || {};
  check('cart item carries the whole-order total at qty 1', item.qty === 1 && item.price > 980, JSON.stringify({ price: item.price, qty: item.qty }));

  console.log(fails ? fails + ' FAILED' : 'all page checks pass');
  process.exit(fails ? 1 : 0);
})();
