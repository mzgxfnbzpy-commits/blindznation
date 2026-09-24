const {load,click}=require('./harness.js');
const {window:w,document:d,errors}=load(process.argv[2]+'/pages/soft-treatments.html','blindznation.com');
if(errors.length) console.log('LOAD ERRORS:',errors.slice(0,2));
const $=id=>d.getElementById(id);
const est=box=>{const p=$(box+'-checkout-panel'); return p&&p._pbEstimate!=null?p._pbEstimate:null;};

// ---------- ROMAN ----------
function romanStyle(name){
  const c=[...d.querySelectorAll('#roman-style-cards .opt-card')].find(e=>(e.getAttribute('onclick')||'').includes("'"+name+"'"));
  if(!c) throw new Error('no roman style '+name);
  click(d,c);
}
function roman(style,W,H,qty,lining){
  romanStyle(style);
  if(lining){ const b=[...d.querySelectorAll('#grp-roman-lining-type .opt-btn')].find(e=>(e.getAttribute('onclick')||'').includes("'"+lining+"'")); if(b) click(d,b); }
  $('rn-w').value=W; $('rn-h').value=H; if($('rn-qty')) $('rn-qty').value=qty||1;
  w.calcRoman();
  return est('roman-pricebox');
}
console.log('=== ROMAN ===');
const rows=[
 ['flat 36x60 unlined (documented $675)', ()=>roman('Flat Roman',36,60,1), 675],
 ['flat 12x12 -> $150 min + ship',        ()=>roman('Flat Roman',12,12,1), null],
 ['pleated 12x12 -> $250 min + ship',     ()=>roman('Permanently Pleated Roman',12,12,1), null],
 ['flat 36x60 x2',                        ()=>roman('Flat Roman',36,60,2), null],
 ['flat 84x60 (oversize >80 -> $500)',    ()=>roman('Flat Roman',84,60,1), null],
 ['pleated 36x60 ($50/sqft)',             ()=>roman('Permanently Pleated Roman',36,60,1), null],
];
for(const [n,f,exp] of rows){
  let v; try{v=f();}catch(e){v='ERR '+e.message.slice(0,40);}
  console.log('  '+n.padEnd(40), String(v).padStart(9), exp!=null?(v===exp?' ok':' ** expected '+exp):'');
}
