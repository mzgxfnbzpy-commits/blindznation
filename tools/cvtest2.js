const {load}=require('./harness.js');
const {window:w,document:d}=load(process.argv[2]+'/pages/soft-treatments.html','blindznation.com');
const $=id=>d.getElementById(id);
function cv(W,H,ret,splice){
  $('cv-corn-w').value=W; $('cv-corn-h').value=H;
  if($('cv-corn-return')) $('cv-corn-return').value=ret||4;
  const sp=$('corn-splice'); if(sp) sp.checked=!!splice;
  w.calcCornice();
  const t=($('corn-price-rows').textContent||'').match(/Est\. total: \$([0-9,]+)/);
  const ft=($('corn-price-rows').textContent||'').match(/(\d+) linear ft \(incl\. ends\) × \$(\d+)\/ft/);
  return (t?('$'+t[1]).padEnd(8):'—') + (ft?('  '+ft[1]+'ft @ $'+ft[2]+'/ft'):'');
}
console.log('=== CORNICE (4" returns) ===');
for(const [n,W,H,r,sp] of [
  ['60x16 (documented $420)',60,16,4,false],
  ['60x15 (standard height)',60,15,4,false],
  ['24x8  ($200 minimum)',24,8,4,false],
  ['60x35 (still $70/ft)',60,35,4,false],
  ['60x36 ($95/ft)',60,36,4,false],
  ['60x56 ($120/ft)',60,56,4,false],
  ['60x76 ($145/ft)',60,76,4,false],
  ['84x16 (>80 oversize +$500)',84,16,4,false],
  ['84x16 SPLICED (no freight)',84,16,4,true],
]) console.log('  '+n.padEnd(30), cv(W,H,r,sp));
