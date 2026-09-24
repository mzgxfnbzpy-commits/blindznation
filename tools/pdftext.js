// Extract text from a PDF. Usage: node pdftext.js <file> [firstPage] [lastPage]
const fs=require('fs');
(async()=>{
  const pdfjs=await import('pdfjs-dist/legacy/build/pdf.mjs');
  const file=process.argv[2];
  const from=parseInt(process.argv[3]||'1',10);
  const to=parseInt(process.argv[4]||String(from),10);
  const data=new Uint8Array(fs.readFileSync(file));
  const doc=await pdfjs.getDocument({data, useSystemFonts:true}).promise;
  console.log('PAGES: '+doc.numPages);
  const last=Math.min(to, doc.numPages);
  for(let p=from;p<=last;p++){
    const page=await doc.getPage(p);
    const tc=await page.getTextContent();
    const txt=tc.items.map(i=>i.str).join(' ').replace(/\s+/g,' ').trim();
    console.log('--- p'+p+' ---');
    console.log(txt.slice(0, parseInt(process.env.LIM||'700',10)));
  }
})().catch(e=>{console.error('ERR '+e.message);process.exit(1);});
