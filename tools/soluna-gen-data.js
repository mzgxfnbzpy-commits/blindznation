// Regenerates js/pages/soluna-data.js + tools/soluna-vectors.json from the Soluna
// pricing handoff (the HTML file carrying <script id="soluna-payload">).
//   node tools/soluna-gen-data.js "<path to soluna-pricing-handoff.html>"
// Numbers are copied verbatim. The HOUSE_OVERRIDES below are Justin's decisions that
// differ from the handoff — keep them here so a regenerate never loses them.
var fs = require('fs'), path = require('path');
var src = process.argv[2];
if (!src) { console.error('usage: node tools/soluna-gen-data.js <soluna-pricing-handoff.html>'); process.exit(1); }
var root = path.join(__dirname, '..');
var h = fs.readFileSync(src, 'utf8');
var p = JSON.parse(h.match(/<script type="application\/json" id="soluna-payload">([\s\S]*?)<\/script>/)[1]);
var tests = p.tests; delete p.tests;

// 1. Justin 2026-09-25: Norman customer discount is 25%, not the handoff's 30%.
p.pricingLadder.clientFacing.discount = 0.25;
p.pricingLadder.clientFacing.formula = 'clientTotal = (shadeSubtotal + optionsSubtotal) * 0.75 + freight';
p.pricingLadder.clientFacing.houseOverride = 'Justin 2026-09-25: 25%, not the handoff\'s 30%.';

// 2. Justin 2026-09-25: the raceway is charged ONLY when no other top treatment is
//    chosen ("mounting rail only"). A fascia or wood valance includes it, as Norman's
//    book prints ("*Raceway included"). The handoff charged it on fascia + wood too.
p.raceway.appliesTo = ['race'];
p.raceway.houseRule = 'Charged only on "raceway only" — when nothing else covers the roll. A fascia or wood valance includes the raceway (Justin 2026-09-25, overriding the handoff\'s always-separate rule).';
p.headerTreatments.forEach(function (t) {
  if (t.id === 'fascia' || t.id === 'wood') { t.racewayLine = false; t.racewayIncluded = true; }
});

var hdr = '// Norman Soluna roller shades — price data, generated from the handoff payload\n' +
  '// (soluna-pricing-handoff.html, id="soluna-payload", revision ' + p.meta.revision + ', ' + p.meta.generated + ').\n' +
  '// Do not hand-edit: regenerate with tools/soluna-gen-data.js. House overrides applied there:\n' +
  '//   · pricingLadder.clientFacing.discount = 0.25 (handoff: 0.30)\n' +
  '//   · raceway.appliesTo = ["race"] — charged only when no other top treatment (handoff: race, fascia, wood)\n' +
  '// Engine: js/pages/soluna-engine.js · test vectors: tools/soluna-vectors.json\n';
fs.writeFileSync(path.join(root, 'js', 'pages', 'soluna-data.js'), hdr + 'var SOLUNA_DATA = ' + JSON.stringify(p) + ';\n');
fs.writeFileSync(path.join(__dirname, 'soluna-vectors.json'), JSON.stringify(tests, null, 1));
console.log('collections', p.collections.length, 'colors', p.collections.reduce(function (t, c) { return t + c.colors.length; }, 0), 'tests', tests.length);
