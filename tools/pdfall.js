// Dump all text of a PDF to a file, for old-vs-new comparison.
const fs=require('fs');
(async()=>{
  const pdfjs=await import('pdfjs-dist/legacy/build/pdf.mjs');
  const data=new Uint8Array(fs.readFileSync(process.argv[2]));
  const doc=await pdfjs.getDocument({data,useSystemFonts:true}).promise;
  const out=[];
  for(let p=1;p<=doc.numPages;p++){
    const tc=await (await doc.getPage(p)).getTextContent();
    out.push('=== p'+p+' ===\n'+tc.items.map(i=>i.str).join(' ').replace(/\s+/g,' ').trim());
  }
  fs.writeFileSync(process.argv[3], out.join('\n'));
  console.log('  '+doc.numPages+' pages -> '+process.argv[3]);
})().catch(e=>{console.error('ERR '+e.message);process.exit(1);});
