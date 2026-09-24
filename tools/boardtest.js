const {load}=require('./harness.js');
const {window:w,document:d}=load(process.argv[2]+'/pages/soft-treatments.html','blindznation.com');
const $=id=>d.getElementById(id);
function cv(W,H,splice){
  $('cv-corn-w').value=W; $('cv-corn-h').value=H;
  if($('cv-corn-return')) $('cv-corn-return').value=4;
  const sp=$('corn-splice'); if(sp) sp.checked=!!splice;
  w.calcCornice();
  const txt=$('corn-price-rows').textContent||'';
  const t=txt.match(/Est\. total: \$([0-9,]+)/);
  const sh=txt.match(/(Oversize freight[^$]*|Shipping[^$]*)\$([0-9,]+)/);
  return {total:t?t[1]:'—', ship:sh?sh[2]:'—', label:sh?sh[1].trim():'—'};
}
console.log('CORNICE / VALANCE FREIGHT  $100 ≤80 · $200 >80 · $250 >120 · $300 >160 · $400 >250');
let bad=0;
for(const [W,exp] of [[60,100],[80,100],[81,200],[120,200],[121,250],[160,250],[161,300],[250,300],[251,400],[300,400]]){
  const got=w.pbBoardFreight(W); const ok=got===exp; if(!ok) bad++;
  const r=cv(W,16,false);
  console.log((ok?'  ok  ':'  **  ')+(W+'\u2033').padEnd(6),'$'+String(got).padEnd(5),'want $'+String(exp).padEnd(5),'| total $'+r.total.padEnd(7),'| '+r.label.slice(0,42));
}
console.log('\nsplice returns any width to the $100 base:');
for(const W of [84,130,170,260]){
  const r=cv(W,16,true);
  console.log('  '+(W+'\u2033 spliced').padEnd(16),'ship $'+r.ship.padEnd(5),'total $'+r.total);
}
console.log('\nunchanged: Roman '+w.pbRomanFreight(90,60)+' (90x60) · Drapery '+w.pbDraperyFreight(150,120)+' (150x120)');
console.log(bad+' mismatches');
