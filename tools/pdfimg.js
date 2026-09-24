// Per page: text length and number of image XObjects — an image-only page is a
// price chart that text extraction cannot see.
const fs=require('fs');
(async()=>{
  const pdfjs=await import('pdfjs-dist/legacy/build/pdf.mjs');
  const data=new Uint8Array(fs.readFileSync(process.argv[2]));
  const doc=await pdfjs.getDocument({data,useSystemFonts:true}).promise;
  const rows=[];
  for(let p=1;p<=doc.numPages;p++){
    const page=await doc.getPage(p);
    const tc=await page.getTextContent();
    const len=tc.items.map(i=>i.str).join('').replace(/\s/g,'').length;
    let imgs=0;
    try{
      const ops=await page.getOperatorList();
      const OPS=pdfjs.OPS;
      for(const f of ops.fnArray) if(f===OPS.paintImageXObject||f===OPS.paintJpegXObject||f===OPS.paintInlineImageXObject) imgs++;
    }catch(e){}
    rows.push({p,len,imgs});
  }
  const sus=rows.filter(r=>r.len<160&&r.imgs>0);
  console.log('  pages:'+doc.numPages+'  image-heavy & text-poor:'+sus.length);
  sus.slice(0,14).forEach(r=>console.log('    p'+r.p+' text='+r.len+' imgs='+r.imgs));
  const big=rows.filter(r=>r.imgs>=3).slice(0,8);
  if(big.length) console.log('    (pages with >=3 images: '+big.map(r=>'p'+r.p+'/'+r.imgs+'img/'+r.len+'ch').join(' ')+')');
})().catch(e=>{console.error('ERR '+e.message);});
