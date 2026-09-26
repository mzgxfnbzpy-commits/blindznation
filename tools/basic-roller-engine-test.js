// Replays the Basic Roller rule book's 26 test vectors through js/pages/basic-roller-engine.js.
//   node tools/basic-roller-engine-test.js
// The vectors were written at the book's 30% discount, so they run with discount 0.30 and
// every field must match exactly. The live 25% (Justin 2026-09-25) is checked after.
var fs = require('fs'), path = require('path'), vm = require('vm');
var ctx = { console: console }; ctx.globalThis = ctx; vm.createContext(ctx);
['basic-roller-data.js', 'basic-roller-engine.js'].forEach(function (f) {
  vm.runInContext(fs.readFileSync(path.join(__dirname, '..', 'js', 'pages', f), 'utf8'), ctx, { filename: f });
});
var E = ctx.BasicEngine;
var vectors = JSON.parse(fs.readFileSync(path.join(__dirname, 'basic-roller-vectors.json'), 'utf8'));
var fail = 0;
vectors.forEach(function (v) {
  var got = E.quote(v.input, { discount: 0.30 }), exp = v.expect, bad = [];
  if (exp.errors) {
    var want = exp.errors.map(function (e) { return e.split(':')[0]; }).join(','), have = (got.errors || []).map(function (e) { return e.split(':')[0]; }).join(',');
    if (want !== have) bad.push('errors want [' + want + '] got [' + have + ']');
  } else if (got.errors) bad.push('unexpected ' + got.errors.join(' | '));
  else Object.keys(exp).forEach(function (k) {
    var a = JSON.stringify(exp[k]), b = JSON.stringify(got[k]);
    if (a !== b) bad.push(k + ' want ' + a + ' got ' + b);
  });
  if (bad.length) { fail++; console.log('FAIL ' + v.id + ' ' + v.desc + '\n   ' + bad.join('\n   ')); }
});
console.log((vectors.length - fail) + '/' + vectors.length + ' rule-book vectors pass (at the book\'s 30%)');
function live(name, o, total) {
  var q = E.quote(o), ok = !q.errors && q.clientTotal === total;
  if (!ok) fail++;
  console.log((ok ? 'PASS ' : 'FAIL ') + name + ' — client $' + q.clientTotal + (q.errors ? ' ' + q.errors : ''));
}
live('live 25%: solar 48×60 open roll manual = $390 → $292.50 + $35', { width: 48, height: 60 }, 327.5);
live('live 25%: blackout 48×60 = $468 → $351 + $35', { width: 48, height: 60, blackout: true }, 386);
live('live 25%: + fascia 48″ = ($390 + $150) × .75 + $35', { width: 48, height: 60, topTreatment: 'fascia' }, 440);
process.exit(fail ? 1 : 0);
