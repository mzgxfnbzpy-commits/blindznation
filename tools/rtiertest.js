const {load,click}=require('./harness.js');
const {window:w,document:d}=load(process.argv[2]+'/pages/soft-treatments.html','blindznation.com');
const $=id=>d.getElementById(id);
click(d,[...d.querySelectorAll('#roman-style-cards .opt-card')].find(e=>(e.getAttribute('onclick')||'').includes("'Flat Roman'")));
console.log('ROMAN FREIGHT  $100/$150/$200/$300/$400/$500');
let bad=0;
for(const [W,H,exp] of [
  [36,60,100],[80,100,100],
  [81,100,150],[120,120,150],[100,110,150],
  [121,120,200],[160,150,200],
  [161,150,300],[220,200,300],
  [221,200,400],[300,250,400],
  [301,250,500],[300,251,500],
]){
  const got=w.pbRomanFreight(W,H); const ok=got===exp; if(!ok) bad++;
  console.log((ok?'  ok  ':'  **  ')+(W+'x'+H).padEnd(10),'$'+String(got).padEnd(5),'want $'+exp);
}
console.log('\nsizes now accepted (was capped at 120x120):');
for(const [W,H] of [[36,60],[200,180],[300,250],[301,250]]){
  $('rn-w').value=W; $('rn-h').value=H; w.calcRoman();
  const box=$('roman-pricebox'), p=$('roman-pricebox-checkout-panel');
  const txt=((box?box.textContent:'')+' '+(p?p.textContent:'')).replace(/\s+/g,' ');
  const money=txt.match(/\$[0-9][0-9,]*/g);
  console.log('  '+(W+'x'+H).padEnd(10), /exceeds our standard/.test(txt)?'rejected (custom size msg)':'accepted', '| $ shown:', money?money.join(' '):'none');
}
console.log('\n'+bad+' mismatches');
