// Drives pages/custom-roller-shades.html (Basic Roller) headlessly and checks what it shows.
//   NODE_PATH=<folder with jsdom> node tools/basic-roller-page-test.js
// Figures: Solar Screen group 1 grid (rule book), 25% off, freight by widest shade, never discounted.
var path = require('path');
var H = require('./harness');
var FILE = path.join(__dirname, '..', 'pages', 'custom-roller-shades.html');
var fails = 0;
function check(name, cond, extra) { if (!cond) fails++; console.log((cond ? 'PASS ' : 'FAIL ') + name + (extra ? '  — ' + extra : '')); }
function tick(ms) { return new Promise(function (r) { setTimeout(r, ms || 20); }); }
function txt(d, id) { var e = d.getElementById(id); return e ? e.textContent.trim() : null; }
function vis(d, id) { var e = d.getElementById(id); return !!e && e.style.display !== 'none'; }
function btn(d, group, text) {
  var b = Array.prototype.find.call(d.querySelectorAll('#' + group + ' .opt-btn'), function (x) { return x.textContent.trim().indexOf(text) === 0; });
  if (!b) throw new Error('no button "' + text + '" in #' + group);
  return H.click(d, b);
}
function size(d, w, h) { H.set(d, 'crs-inp-w', String(w)); H.set(d, 'crs-inp-h', String(h)); }
function total(d) { return vis(d, 'qp-price') ? txt(d, 'qp-total') : null; }

(async function () {
  var p = H.load(FILE, 'blindznation.com'); await tick(); var d = p.document, W = p.window;
  check('page loads without script errors', p.errors.length === 0, p.errors.join(' | '));
  check('no cordless option anywhere in the form', !Array.prototype.some.call(d.querySelectorAll('#configurator .opt-btn'), function (b) { return /cordless/i.test(b.textContent); }));
  check('prices are not hidden (page is no longer quote-only)', !W.pbPageIsQuoteOnly());
  size(d, 48, 60);
  check('price shows from the size alone (colour never moves it) but openness + colour are still required', total(d) === '$327.50' && /openness/.test(JSON.stringify(W.crsQuote().need)) && /color/.test(JSON.stringify(W.crsQuote().need)));
  W.alert = function () {}; var _c0 = JSON.parse(W.localStorage.getItem('pb_cart_v1') || '[]').length; W.addCustomRollerToCart();
  check('cart refuses until openness + colour are chosen', JSON.parse(W.localStorage.getItem('pb_cart_v1') || '[]').length === _c0);
  btn(d, 'crs-grp-open', '3%'); btn(d, 'crs-grp-color', 'White');
  check('solar 48×60 open roll manual: $390 → 25% off $292.50 + $35 = $327.50', total(d) === '$327.50', txt(d, 'qp-price-rows'));
  btn(d, 'crs-grp-type', 'Blackout');
  check('switching to blackout clears a colour it does not come in? (White is offered — kept)', W.CRS.color === 'White');
  check('blackout 48×60: $468 → $351 + $35 = $386', total(d) === '$386', txt(d, 'qp-price-rows'));
  btn(d, 'crs-grp-color', 'Off-White');
  btn(d, 'crs-grp-type', 'Solar Screen');
  check('Off-White (blackout only) is dropped when switching back to solar', W.CRS.color === '' && /color/.test(JSON.stringify(W.crsQuote().need)));
  btn(d, 'crs-grp-color', 'White');
  H.click(d, d.getElementById('hc-fascia'));
  check('fascia colour is required before cart/submit', /fascia color/.test(JSON.stringify(W.crsQuote().need)));
  btn(d, 'crs-grp-fascia-color', 'Black');
  check('solar + fascia 48″: ($390 + $150) × .75 + $35 = $440', total(d) === '$440', txt(d, 'qp-price-rows'));
  btn(d, 'crs-grp-endcaps', 'Add end caps');
  check('end caps are free', total(d) === '$440');
  H.click(d, d.getElementById('hc-open'));
  check('end caps cleared when fascia is removed (no refusal)', W.CRS.endCaps === false && total(d) === '$327.50');

  H.click(d, d.getElementById('motor-motorized'));
  check('motor brand is required before cart/submit', /motor brand/.test(JSON.stringify(W.crsQuote().need)));
  btn(d, 'crs-grp-brand', 'Somfy');
  check('Somfy battery: ($390 + $450) × .75 + $35 = $665', total(d) === '$665', txt(d, 'qp-price-rows'));
  btn(d, 'crs-grp-brand', 'Automate');
  check('Automate by Rollease prices the same as Somfy', total(d) === '$665');
  btn(d, 'crs-grp-power', 'Hardwired'); btn(d, 'crs-grp-remote', '5-channel'); H.set(d, 'crs-hubs', '1');
  check('hardwired + 5-ch remote + hub: ($390+$550+$125+$400) × .75 + $35 = $1,133.75', total(d) === '$1,133.75', txt(d, 'qp-price-rows'));
  H.set(d, 'qty-num', '3');
  check('qty 3: accessories stay once per order: ((390+550)×3 + 125 + 400) × .75 + $35 + $30', total(d) === '$2,573.75', txt(d, 'qp-price-rows'));
  H.set(d, 'qty-num', '1'); H.set(d, 'crs-hubs', '0'); btn(d, 'crs-grp-remote', 'No remote'); btn(d, 'crs-grp-power', 'Battery');
  btn(d, 'crs-grp-brand', 'Lutron');
  check('Lutron shows NO price, just a call note', total(d) === null && /quoted by phone/.test(txt(d, 'qp-note')));
  var before = JSON.parse(W.localStorage.getItem('pb_cart_v1') || '[]').length;
  W.alert = function () {}; W.addCustomRollerToCart();
  check('Lutron cannot go to the cart', JSON.parse(W.localStorage.getItem('pb_cart_v1') || '[]').length === before);
  H.click(d, d.getElementById('motor-manual'));

  size(d, 90, 60); H.set(d, 'qty-num', '3');
  check('3 × 90″: shipping $100 + $65 + $65 = $230 (80–120″ tier)', /\$230/.test(txt(d, 'qp-price-rows')), txt(d, 'qp-price-rows'));
  size(d, 80, 60);
  check('3 × 80″: shipping $35 + $15 + $15 = $65 (up to 80″)', /\$65/.test(txt(d, 'qp-price-rows')), txt(d, 'qp-price-rows'));
  size(d, 130, 60);
  check('130″ wide → hand quote, no price', total(d) === null && /by hand/.test(txt(d, 'qp-note')));
  size(d, 48, 60); H.set(d, 'qty-num', '2');

  W.addCustomRollerToCart();
  var cart = JSON.parse(W.localStorage.getItem('pb_cart_v1') || '[]'), it = cart[cart.length - 1] || {};
  check('cart carries the whole order at qty 1 (2 × $390 × .75 + $50 = $635)', it.qty === 1 && it.price === 635, JSON.stringify({ price: it.price, qty: it.qty }));

  var posts = []; W.fetch = async function (u, o) { posts.push(JSON.parse(o.body)); return { ok: true, status: 200, json: async function () { return { ok: true }; } }; };
  W._formLoadTime = Date.now() - 60000;
  H.set(d, 'cf-name', 'Test Person'); H.set(d, 'cf-email', 'test@example.com'); H.set(d, 'cf-notes', 'Nursery window');
  await W.crsSubmit(); await tick(60);
  var q = posts[0] || {}, rows = (q.selections || []).map(function (l) { return l.label + ': ' + l.value; }).join(' | ');
  check('submit sends with name + email only (no phone)', q.name === 'Test Person' && q.email === 'test@example.com' && q._t >= 2000, JSON.stringify({ n: q.name, e: q.email, t: q._t }));
  check('email carries every choice + price', /Fabric color: White/.test(rows) && /Solar Screen 3%/.test(rows) && /Manual chain \(silver\), right side/.test(rows) && /Total: \$635/.test(rows) && q.notes === 'Nursery window', rows);
  console.log(fails ? fails + ' FAILED' : 'all Basic Roller page checks pass');
  process.exit(fails ? 1 : 0);
})();
