const fs=require('fs'), path=require('path');
const {load,click}=require('./harness.js');
const wait=ms=>new Promise(r=>setTimeout(r,ms));
const B=process.argv[2];
const pages=fs.readdirSync(path.join(B,'pages')).filter(f=>f.endsWith('.html')).sort();
function fillContact(d){
  // the shared contact step + per-page variants
  const map={name:'Test Person',phone:'6095551234',email:'t@example.com'};
  [...d.querySelectorAll('input')].forEach(function(i){
    const id=(i.id||'').toLowerCase(), ph=(i.placeholder||'').toLowerCase(), ty=(i.type||'').toLowerCase();
    if(ty==='checkbox'||ty==='radio'||ty==='file') return;
    if(/name/.test(id)||/name/.test(ph)) i.value=map.name;
    else if(/phone|tel/.test(id)||/phone/.test(ph)||ty==='tel') i.value=map.phone;
    else if(/email/.test(id)||/email/.test(ph)||ty==='email') i.value=map.email;
  });
}
(async()=>{
  let tested=0, blocked=0, allowed=0, problems=[];
  for(const p of pages){
    let r; try{ r=load(path.join(B,'pages',p),'blindznation.com'); }catch(e){ continue; }
    const {window:w,document:d}=r; await wait(0);
    const btns=[...d.querySelectorAll('[data-pb-terms-gate]')];
    if(!btns.length) continue;
    const btn=btns[0];
    const m=(btn.getAttribute('onclick')||'').match(/([A-Za-z_]\w*)\s*\(/); if(!m) continue;
    const fn=m[1]; tested++;
    let fired=0; w[fn]=function(){fired++;};
    fillContact(d);
    const scope=btn.closest('.pb-cart-extras')||btn.closest('form')||btn.parentNode;
    const box=(scope&&scope.querySelector('.pb-terms-check'))||d.querySelector('.pb-terms-check');
    if(!box){ problems.push(p+': no checkbox'); continue; }
    box.checked=false; fired=0; click(d,btn);
    if(fired===0) blocked++; else problems.push(p+': UNCHECKED LEAKED ('+fn+')');
    box.checked=true; fired=0; click(d,btn);
    if(fired>=1) allowed++; else problems.push(p+': checked still blocked ('+fn+')');
  }
  console.log('pages tested           : '+tested);
  console.log('unchecked -> blocked   : '+blocked);
  console.log('checked   -> submitted : '+allowed);
  console.log('\nREMAINING PROBLEMS:');
  problems.length? problems.forEach(x=>console.log('  ** '+x)) : console.log('  none');
})();
