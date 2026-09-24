// jsdom harness. Gotchas: jsdom fetches neither <script src> nor <link rel=stylesheet>,
// so both are inlined IN DOCUMENT ORDER; a literal closing script tag inside a .js file
// ends the inlined tag early and must be escaped; pages must load from the real hostname
// or host-gated code takes a different path.
const fs=require('fs'), path=require('path');
const {JSDOM, VirtualConsole}=require('jsdom');
const CLOSE='</'+'script', SAFE='<'+String.fromCharCode(92)+'/'+'script';
function inline(html,dir){
  return html.replace(/<script\b[^>]*\bsrc\s*=\s*"([^"]+)"[^>]*>\s*<\/script>|<link\b[^>]*\brel\s*=\s*"stylesheet"[^>]*>/gi,(tag,src)=>{
    if(src===undefined){const m=/href\s*=\s*"([^"]+)"/i.exec(tag);if(!m||/^https?:/i.test(m[1]))return '';
      const q=path.resolve(dir,m[1]);return fs.existsSync(q)?'<style>'+fs.readFileSync(q,'utf8')+'</style>':'';}
    if(/^https?:/i.test(src))return ''; const q=path.resolve(dir,src);
    if(!fs.existsSync(q))return '';
    return '<script>'+fs.readFileSync(q,'utf8').split(CLOSE).join(SAFE)+CLOSE+'>';});
}
function load(file,host){
  const errors=[]; const vc=new VirtualConsole();
  vc.on('jsdomError',e=>{const k=String((e&&e.message)||e); if(!/Not implemented: navigation/.test(k)) errors.push(k);});
  const dom=new JSDOM(inline(fs.readFileSync(file,'utf8'),path.dirname(file)),
    {url:'https://'+(host||'localhost')+'/pages/'+path.basename(file),runScripts:'dangerously',pretendToBeVisual:true,virtualConsole:vc});
  const w=dom.window; w.scrollTo=()=>{}; w.alert=()=>{}; w.print=()=>{};
  w.Element.prototype.scrollIntoView=function(){};
  return {dom,window:w,document:w.document,errors};
}
function set(d,id,v){const e=d.getElementById(id);if(!e)return false;e.value=v;['input','change'].forEach(t=>e.dispatchEvent(new d.defaultView.Event(t,{bubbles:true})));return true;}
function click(d,s){const e=typeof s==='string'?d.querySelector(s):s;if(!e)return false;e.dispatchEvent(new d.defaultView.MouseEvent('click',{bubbles:true,cancelable:true}));return true;}
module.exports={load,set,click};
