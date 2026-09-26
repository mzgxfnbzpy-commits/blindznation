// Regenerates js/pages/basic-roller-data.js + tools/basic-roller-vectors.json from the Basic
// Roller Shades rule book (the HTML file carrying <script id="basic-payload">).
//   node tools/basic-gen-data.js "<path to basic-roller-shades-rulebook.html>"
// Numbers are copied verbatim. HOUSE_OVERRIDES below are Justin's decisions that differ
// from the rule book — keep them here so a regenerate never loses them.
var fs = require('fs'), path = require('path');
var src = process.argv[2];
if (!src) { console.error('usage: node tools/basic-gen-data.js <basic-roller-shades-rulebook.html>'); process.exit(1); }
var h = fs.readFileSync(src, 'utf8');
var p = JSON.parse(h.match(/<script[^>]*id="basic-payload"[^>]*>([\s\S]*?)<\/script>/)[1]);
var tests = p.tests; delete p.tests;

// 1. Justin 2026-09-25: Basic Roller discount is 25% — the same as Soluna — not the
//    rule book's 30%. Freight is never discounted.
p.pricingLadder.clientDiscount = 0.25;
p.pricingLadder.formula = 'client = (shade + options) * 0.75 + freight';
p.pricingLadder.houseOverride = 'Justin 2026-09-25: 25%, same as Soluna (rule book said 30%).';

var hdr = '// Basic Roller Shades — price data, generated from the rule book payload\n' +
  '// (basic-roller-shades-rulebook.html, id="basic-payload", revision ' + p.revision + ', ' + p.generated + ').\n' +
  '// Do not hand-edit: regenerate with tools/basic-gen-data.js. House override applied there:\n' +
  '//   · pricingLadder.clientDiscount = 0.25 (rule book: 0.30)\n' +
  '// Engine: js/pages/basic-roller-engine.js · test vectors: tools/basic-roller-vectors.json\n';
fs.writeFileSync(path.join(__dirname, '..', 'js', 'pages', 'basic-roller-data.js'), hdr + 'var BASIC_DATA = ' + JSON.stringify(p) + ';\n');
fs.writeFileSync(path.join(__dirname, 'basic-roller-vectors.json'), JSON.stringify(tests, null, 1));
console.log('grid rows', p.grid.length, 'fascia cells', p.fasciaRow.length, 'tests', tests.length);
