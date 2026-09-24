// Load every page; report JS errors and undefined-function handlers.
const fs=require('fs'), path=require('path');
const {load}=require('./harness.js');
const B=process.argv[2];
const dir=path.join(B,'pages');
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.html')).sort();
let bad=0;
for(const f of files){
  let r;
  try { r=load(path.join(dir,f),'blindznation.com'); }
  catch(e){ console.log('THROW  '+f+': '+e.message.slice(0,90)); bad++; continue; }
  if(r.errors.length){ console.log('ERROR  '+f+': '+r.errors[0].slice(0,110)); bad++; }
}
console.log('\n'+files.length+' pages loaded, '+bad+' with errors');
