const {load,click}=require('./harness.js');
const {window:w,document:d,errors}=load(process.argv[2]+'/pages/soft-treatments.html','blindznation.com');
if(errors.length) console.log('LOAD ERRORS:',errors.slice(0,2));
const $=id=>d.getElementById(id);
click(d,[...d.querySelectorAll('#pleat-cards .opt-card')].find(e=>(e.getAttribute('onclick')||'').includes("'Pinch Pleat'")));
console.log('DRAPERY FREIGHT  $200 \u2264180\u00d7150 \u00b7 $300 \u2264250\u00d7200 \u00b7 $500 beyond');
let bad=0;
for(const [W,H,exp] of [
  [100,96,200],[180,150,200],[150,120,200],
  [181,150,300],[180,151,300],[250,200,300],[200,170,300],[220,180,300],
  [251,200,500],[250,201,500],[300,185,500],
]){
  const got=w.pbDraperyFreight(W,H); const ok=got===exp; if(!ok) bad++;
  console.log((ok?'  ok  ':'  **  ')+(W+'x'+H).padEnd(10),'$'+String(got).padEnd(5),'want $'+exp);
}
console.log('\nORDERABLE NOW (width cap raised 200 -> 300):');
for(const [W,H] of [[250,185],[300,185],[260,120]]){
  $('d-exact-width').value=W; $('d-exact-length').value=H; w.calcDrapePrice();
  const p=$('drape-price-box-checkout-panel');
  const txt=(p.textContent||'').replace(/\s+/g,' ');
  const note=(txt.match(/can be ordered[^.]*\./)||[''])[0];
  console.log('  '+(W+'x'+H).padEnd(10),'quote $'+String(p._pbEstimate||'\u2014').padEnd(7), note?'| "'+note.slice(0,58)+'"':'');
}
console.log('\nSTILL A HAND QUOTE (length past the 185\u2033 rate ladder):');
for(const [W,H] of [[250,200],[150,186]]){
  $('d-exact-width').value=W; $('d-exact-length').value=H; w.calcDrapePrice();
  const p=$('drape-price-box-checkout-panel');
  console.log('  '+(W+'x'+H).padEnd(10),'estimate:', p._pbEstimate===null?'none (custom quote)':'$'+p._pbEstimate);
}
console.log('\n'+bad+' mismatches');
