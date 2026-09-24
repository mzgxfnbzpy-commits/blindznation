// Dump text items with x/y for one page, so side-by-side tables can be told apart.
const fs=require('fs');
(async()=>{
  const pdfjs=await import('pdfjs-dist/legacy/build/pdf.mjs');
  const data=new Uint8Array(fs.readFileSync(process.argv[2]));
  const doc=await pdfjs.getDocument({data,useSystemFonts:true}).promise;
  const page=await doc.getPage(Number(process.argv[3]));
  const tc=await page.getTextContent();
  const re=process.argv[4]? new RegExp(process.argv[4],'i') : null;
  const out=tc.items.filter(i=>i.str.trim()).map(i=>({s:i.str.trim(),x:Math.round(i.transform[4]),y:Math.round(i.transform[5])}));
  for(const o of out) if(!re||re.test(o.s)) console.log(String(o.x).padStart(5),String(o.y).padStart(5),' ',o.s);
})().catch(e=>{console.error('ERR '+e.message);process.exit(1);});
