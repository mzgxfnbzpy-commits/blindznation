// Replays the Soluna handoff's 85 test vectors through js/pages/soluna-engine.js.
//   node tools/soluna-engine-test.js
// The vectors were written under the handoff's rules — 30% client discount and the raceway
// charged on fascia + wood as well — so they are replayed with both passed back in. That
// proves the grids, hem bar, blackout uplift, shipping etc. match to the cent. The live
// house rules (25%, raceway only on "raceway only") are checked in the second block.
var fs = require('fs'), path = require('path'), vm = require('vm');
var ctx = { console: console };
ctx.globalThis = ctx;
vm.createContext(ctx);
['soluna-data.js', 'soluna-engine.js'].forEach(function (f) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'pages', f), 'utf8'), ctx, { filename: f });
});
var E = ctx.SolunaEngine;
var vectors = JSON.parse(fs.readFileSync(path.join(__dirname, 'soluna-vectors.json'), 'utf8'));

var HANDOFF = { discount: 0.30, racewayOn: ['race', 'fascia', 'wood'] };
var FIELDS = ['shadeSubtotal', 'optionsSubtotal', 'raceway', 'freight', 'discountableRetail',
              'clientDiscount', 'clientSubtotal', 'clientTotal', 'retailTotal'];
var fail = 0;
vectors.forEach(function (v) {
  var got = E.quote(v.input, HANDOFF), exp = v.expect, bad = [];
  if (exp.errors) {
    var want = exp.errors.map(function (e) { return e.split(':')[0]; }).join(',');
    var have = (got.errors || []).map(function (e) { return e.split(':')[0]; }).join(',');
    if (want !== have) bad.push('errors want [' + want + '] got [' + have + ']');
  } else if (got.errors) {
    bad.push('unexpected errors ' + got.errors.join(' | '));
  } else {
    FIELDS.forEach(function (k) { if (Math.abs((got[k] || 0) - (exp[k] || 0)) > 0.005) bad.push(k + ' want ' + exp[k] + ' got ' + got[k]); });
    exp.shades.forEach(function (s, i) {
      if (Math.abs(got.shades[i].price - s.price) > 0.005 || got.shades[i].rule !== s.rule)
        bad.push('shade ' + i + ' want ' + s.price + '/' + s.rule + ' got ' + got.shades[i].price + '/' + got.shades[i].rule);
    });
  }
  if (bad.length) { fail++; console.log('FAIL ' + v.id + ' ' + v.desc + '\n   ' + bad.join('\n   ')); }
});
console.log((vectors.length - fail) + '/' + vectors.length + ' handoff vectors pass (under the handoff\'s own rules)');

// Live house rules: 25% off retail, shipping at full net, raceway only on "raceway only".
function live(name, o, retail, total) {
  var q = E.quote(o), ok = !q.errors && q.discountableRetail === retail && q.clientTotal === total;
  if (!ok) fail++;
  console.log((ok ? 'PASS ' : 'FAIL ') + name + ' — retail $' + q.discountableRetail + ', client $' + q.clientTotal + (q.errors ? ' ' + q.errors : ''));
}
var C = [{ collection: 'Callie' }];
live('raceway only 48×60: 414 + 73 raceway + 16 hem = $503 → $377.25 + $25', { shades: C, width: 48, height: 60, header: 'race' }, 503, 402.25);
live('curved metal fascia 48×60 includes the raceway: 414 + 150 + 16 = $580 → $435 + $25', { shades: C, width: 48, height: 60, header: 'fascia' }, 580, 460);
live('wood valance 48×60 includes the raceway: $580', { shades: C, width: 48, height: 60, header: 'wood' }, 580, 460);
live('square fabric 8″ 48×60: 414 + 244 + 16 = $674', { shades: C, width: 48, height: 60, header: 'fascia', shape: 'square', material: 'fabric', size: 8 }, 674, 530.5);
live('cassette 48×60 unchanged: $674', { shades: C, width: 48, height: 60, header: 'cassette' }, 674, 530.5);
live('dual Callie + Callie RD: 910.80 + 244 + 32 + 73 = $1,259.80 → $944.85 + $36',
     { shades: [{ collection: 'Callie' }, { collection: 'Callie RD' }], width: 48, height: 60, header: 'fascia' }, 1259.8, 980.85);
process.exit(fail ? 1 : 0);
