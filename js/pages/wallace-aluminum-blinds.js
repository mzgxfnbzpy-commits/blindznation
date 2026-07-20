// ── Wallace 1" Aluminum Mini-Blinds ──────────────────────────────────────────
// Source: Wallace Blinds "1" Aluminum Mini-Blinds" PDF (wallaceblinds.com, April 2024;
// price tables effective 08.15.2018). Three price tables by bracket / gauge type.
// Pricing is retail estimate only — confirmed at order.

// Width columns (in) and Length rows (in)
const AL_W = [23,26,29,32,36,40,44,48,52,57,62,67,72,82,92,102,112,122,132,142];
const AL_L = [42,48,54,60,66,72,78,84,90,96,102,108,114,120,126,132,138,144];

// Table 1 — Customiser Box Brackets, 6 gauge, 1"x1" (includes Single Slat Valance)
const AL_T1 = {42:[139,151,164,177,196,217,230,243,261,296,314,333,356,398,436,497,536,590,623,675],48:[151,170,181,196,212,235,256,274,293,322,345,364,387,436,475,525,587,643,694,727],54:[167,181,201,213,235,258,277,298,313,354,374,398,425,480,525,562,607,665,727,787],60:[178,201,213,235,256,275,296,312,339,380,419,440,467,519,564,614,675,752,797,858],66:[191,213,235,252,272,294,313,343,364,412,440,468,488,559,609,681,764,806,849,926],72:[206,226,246,271,284,312,342,367,406,442,475,500,536,601,662,753,813,878,951,1007],78:[217,241,264,278,309,336,364,398,438,481,504,538,593,653,727,798,864,919,1001,1082],84:[226,258,280,309,338,367,397,433,478,519,548,594,652,725,796,867,938,1010,1072,1159],90:[245,274,304,333,365,398,433,475,519,552,590,648,710,782,861,926,1004,1084,1175,1281],96:[254,284,312,348,394,433,475,520,555,607,658,706,775,852,932,1003,1090,1182,1272,1372],102:[271,293,332,372,422,462,517,555,609,659,709,778,836,926,1004,1088,1194,1262,1349,1453],108:[277,310,343,391,440,494,552,606,662,710,782,845,913,1003,1098,1191,1266,1361,1453,1556],114:[296,325,361,403,464,517,568,629,687,736,810,885,946,1055,1161,1262,1365,1453,1563,1687],120:[310,343,380,430,481,552,597,672,727,809,882,935,1030,1140,1256,1333,1443,1558,1676,1798],126:[329,362,400,462,507,584,633,709,775,849,926,972,1065,1175,1290,1384,1500,1643,1762,1913],132:[342,380,423,498,543,620,669,740,813,887,965,1009,1106,1242,1348,1443,1556,1688,1821,1976],138:[358,400,442,530,575,658,707,775,846,926,1006,1052,1145,1314,1421,1514,1627,1781,1898,2053],144:[374,427,467,562,610,696,742,813,887,965,1049,1090,1187,1375,1481,1571,1681,1827,1963,2124]};

// Table 2 — Customiser 8ga (1x1) / Classic 6ga (1x1.5) (includes Double Slat Valance). Lengths 60"+ only.
const AL_T2 = {60:[162,174,185,204,225,251,264,278,298,339,362,385,407,461,503,571,619,677,719,775],66:[174,196,210,225,243,270,294,314,335,369,397,422,440,503,548,601,674,739,798,836],72:[188,210,230,245,270,296,320,343,361,403,430,459,485,552,601,648,697,768,836,904],78:[206,230,245,270,294,317,339,359,391,436,478,507,535,596,651,706,775,865,917,988],84:[220,245,270,291,313,336,361,396,422,474,507,538,561,643,700,782,875,926,975,1065],90:[236,261,284,310,325,359,394,425,468,510,548,574,619,693,764,867,936,1009,1091,1159],96:[251,275,304,322,356,388,422,461,504,555,580,620,681,751,836,917,994,1058,1153,1243],102:[261,296,323,356,390,425,458,500,551,596,629,684,746,833,913,997,1077,1164,1233,1335],108:[280,314,348,385,423,461,500,548,596,633,677,743,819,900,991,1065,1156,1246,1350,1472],114:[293,325,359,400,452,500,548,597,638,697,756,811,893,978,1071,1155,1255,1356,1463,1575],120:[309,335,381,429,481,530,594,638,700,759,817,897,961,1065,1156,1252,1374,1453,1552,1671],126:[320,358,396,448,507,568,633,694,764,819,900,969,1051,1155,1262,1369,1459,1565,1671,1788],132:[339,372,414,465,532,594,653,723,787,846,932,1022,1088,1216,1336,1453,1566,1671,1798,1939],138:[358,396,436,494,555,633,688,772,836,929,1016,1074,1184,1311,1443,1532,1661,1790,1930,2068],144:[374,419,459,517,578,662,700,797,882,958,1045,1107,1223,1349,1472,1571,1729,1836,2020,2120]};

// Table 3 — Classic 8ga (1x1.5) / Micro Box Brackets (includes Double Slat Valance)
const AL_T3 = {42:[203,219,235,258,280,313,332,354,377,429,459,481,514,578,632,722,778,853,903,978],48:[219,245,264,280,307,339,369,397,425,465,501,527,558,632,691,761,849,932,1004,1053],54:[241,264,291,309,339,372,401,432,455,510,543,578,613,696,761,816,878,965,1053,1140],60:[259,291,309,339,369,400,429,452,493,552,601,640,675,751,819,893,978,1091,1155,1242],66:[277,309,339,364,396,426,455,497,527,597,640,678,707,810,880,988,1104,1165,1229,1342],72:[297,329,358,393,407,452,496,532,591,643,691,725,778,874,961,1093,1179,1274,1377,1462],78:[313,346,381,403,446,487,527,578,636,697,732,780,859,946,1053,1156,1253,1333,1453,1566],84:[329,372,406,446,490,532,575,629,693,751,791,861,942,1049,1153,1256,1359,1466,1556,1682],90:[355,397,439,481,530,578,629,691,751,798,853,938,1032,1133,1249,1342,1456,1569,1703,1856],96:[367,407,452,504,569,629,691,752,804,878,955,1026,1124,1233,1349,1455,1581,1714,1846,1988],102:[391,425,480,539,609,668,746,804,880,956,1030,1129,1211,1342,1456,1575,1730,1830,1955,2105],108:[401,451,497,564,640,716,798,875,961,1032,1133,1224,1326,1455,1594,1726,1839,1974,2105,2255],114:[429,469,523,587,669,746,823,910,994,1066,1175,1285,1372,1530,1684,1830,1976,2105,2266,2446],120:[451,497,552,623,697,798,865,974,1053,1171,1281,1353,1494,1655,1821,1932,2094,2256,2431,2607],126:[469,517,575,651,732,833,900,1026,1107,1237,1333,1439,1575,1755,1920,2031,2194,2371,2598,2739],132:[493,536,598,672,759,871,940,1066,1152,1306,1401,1520,1662,1846,2021,2136,2294,2478,2728,2876],138:[510,559,627,696,788,900,969,1107,1194,1365,1461,1597,1750,1950,2124,2233,2420,2585,2859,3023],144:[527,581,652,725,816,940,1003,1149,1233,1421,1523,1671,1829,2046,2240,2340,2511,2694,3010,3176]};

// Optional valance upgrade $ by width col (Single Slat included in base)
const AL_DBL_VAL = [14,16,19,20,23,25,28,29,30,35,38,42,45,49,57,61,68,74,80,87];
const AL_DLX_VAL = [35,38,43,46,52,58,62,68,74,81,87,94,103,116,132,143,159,172,185,201];

// Bracket types → table + which upgrades apply
const AL_BRACKETS = {
  t1: { table: AL_T1, name: 'Customiser Box Brackets — 6 ga, 1"×1"', incl: 'Single Slat Valance', perfNet: 20, cordlessPct: 0, concealedPct: 0, microPct: 0, perfPct: 0 },
  t2: { table: AL_T2, name: 'Customiser 8 ga (1"×1") / Classic 6 ga (1"×1½")', incl: 'Double Slat Valance', perfNet: 0, cordlessPct: 15, concealedPct: 65, microPct: 0, perfPct: 25 },
  t3: { table: AL_T3, name: 'Classic 8 ga (1"×1½") / Micro Box Brackets', incl: 'Double Slat Valance', perfNet: 0, cordlessPct: 25, concealedPct: 65, microPct: 40, perfPct: 25 }
};

const S = { bracket:'t1', mount:'inside', valance:'included', color:'', perforated:false, cordless:false, concealed:false, micro:false, privacy:false, twoOn1:false };

// Nearest breakpoint at or above the ordered dimension (clamped to table max)
function alIdxAtOrAbove(arr, v){ for(let i=0;i<arr.length;i++){ if(arr[i]>=v) return i; } return arr.length-1; }

function alGetW(){ return parseFloat((document.getElementById('inp-width')||{}).value)||0; }
function alGetH(){ return parseFloat((document.getElementById('inp-height')||{}).value)||0; }
function alGetQty(){ return parseInt((document.getElementById('inp-qty')||{}).value,10)||1; }

function alBasePrice(w,h,brKey){
  const br = AL_BRACKETS[brKey]; const tbl = br.table;
  const lens = Object.keys(tbl).map(Number).sort((a,b)=>a-b);
  const minLen = lens[0];
  const wi = alIdxAtOrAbove(AL_W, w);
  let li = alIdxAtOrAbove(lens, h);
  if (h < minLen) li = 0; // clamp small heights to smallest available row
  const row = tbl[lens[li]];
  return { base: row[wi], wi: wi, lenUsed: lens[li], minLen: minLen };
}

// Pure price computation → { per, subtotal, freight, total, lines[] }
function alPrice(){
  const w=alGetW(), h=alGetH(), qty=alGetQty(); const br=AL_BRACKETS[S.bracket];
  if(!(w>0&&h>0)) return null;
  const bp = alBasePrice(w,h,S.bracket);
  let per = bp.base; const lines=[];
  lines.push({l:'Base ('+br.name.split('—')[0].split('/')[0].trim()+')', v:'$'+bp.base});
  if (h < bp.minLen) lines.push({l:'Note', v:'Priced at '+bp.minLen+'″ min length for this bracket'});
  let pct=0;
  if(S.cordless && br.cordlessPct){ pct+=br.cordlessPct; lines.push({l:'Cordless', v:'+'+br.cordlessPct+'%'}); }
  if(S.concealed && br.concealedPct){ pct+=br.concealedPct; lines.push({l:'Concealed headrail (S-3000)', v:'+'+br.concealedPct+'%'}); }
  if(S.micro && br.microPct){ pct+=br.microPct; lines.push({l:'Micro box bracket', v:'+'+br.microPct+'%'}); }
  if(S.perforated && br.perfPct){ pct+=br.perfPct; lines.push({l:'Perforated', v:'+'+br.perfPct+'%'}); }
  per += Math.round(bp.base * pct/100);
  if(S.perforated && br.perfNet){ per+=br.perfNet; lines.push({l:'Perforated', v:'+$'+br.perfNet}); }
  if(S.privacy){ per+=20; lines.push({l:'Privacy (S-3000)', v:'+$20'}); }
  if(w<=12){ per+=10; lines.push({l:'Undersized (≤12″ W)', v:'+$10'}); }
  if(h>120){ per+=20; lines.push({l:'Oversized (>120″ L)', v:'+$20'}); }
  if(S.twoOn1){ per+=30; lines.push({l:'2-on-1 Headrail', v:'+$30'}); }
  if(S.valance==='double'){ const vv=AL_DBL_VAL[bp.wi]; per+=vv; lines.push({l:'Double Slat Valance', v:'+$'+vv}); }
  else if(S.valance==='deluxe'){ const vv=AL_DLX_VAL[bp.wi]; per+=vv; lines.push({l:'Deluxe Slat Valance', v:'+$'+vv}); }
  else lines.push({l:'Valance', v:br.incl+' (included)'});
  let freight=25+(qty-1)*8;
  if(w>=90) freight += 80 + (qty-1)*50;
  const subtotal = per*qty;
  return { per:per, subtotal:subtotal, freight:freight, total:subtotal+freight, qty:qty, lines:lines };
}

function calcPrice(){
  const out=document.getElementById('al-price-box'); if(!out) return;
  const p=alPrice(); if(!p){ out.style.display='none'; return; }
  out.style.display='block';
  out.innerHTML =
    '<div style="font-size:10px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:var(--gold);margin-bottom:8px">Estimated price</div>'+
    p.lines.map(function(x){return '<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0;color:#555"><span>'+x.l+'</span><span style="font-weight:600;color:#333">'+x.v+'</span></div>';}).join('')+
    '<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0;color:#555;border-top:1px dashed #ddd;margin-top:4px;padding-top:5px"><span>Per blind</span><span style="font-weight:700">$'+p.per+'</span></div>'+
    (p.qty>1?'<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0;color:#555"><span>× '+p.qty+' blinds</span><span>$'+p.subtotal+'</span></div>':'')+
    '<div style="display:flex;justify-content:space-between;font-size:12px;padding:2px 0;color:#555"><span>Freight (est.)</span><span>$'+p.freight+'</span></div>'+
    '<div style="display:flex;justify-content:space-between;font-size:16px;font-weight:700;color:var(--espresso);border-top:2px solid #e8e8e4;margin-top:6px;padding-top:8px"><span>Estimated total</span><span>$'+Math.round(p.total).toLocaleString()+'</span></div>'+
    '<div style="font-size:10px;color:#aaa;margin-top:6px;line-height:1.5">Retail estimate only — 2″ blinds are quote-only. Final price, colors, and options confirmed at order.</div>';
}

// ── option setters ──
function alSetBracket(el,key){ S.bracket=key; _alSel(el); _alSyncOptionAvail(); calcPrice(); }
function alSetMount(el,m){ S.mount=m; _alSel(el); calcPrice(); }
function alSetValance(el,v){ S.valance=v; _alSel(el); calcPrice(); }
function alTgl(key,el){ S[key]=!S[key]; if(el) el.classList.toggle('sel',S[key]); calcPrice(); }
function _alSel(el){ if(el&&el.parentElement) el.parentElement.querySelectorAll('.opt-btn').forEach(function(b){b.classList.remove('sel');}); if(el) el.classList.add('sel'); }
function _alSyncOptionAvail(){
  const br=AL_BRACKETS[S.bracket];
  var map={'al-opt-cordless':br.cordlessPct>0,'al-opt-concealed':br.concealedPct>0,'al-opt-micro':br.microPct>0,'al-opt-privacy':(S.bracket!=='t1')};
  Object.keys(map).forEach(function(id){ var el=document.getElementById(id); if(el){ el.style.display=map[id]?'':'none'; if(!map[id]){ var k=id.replace('al-opt-',''); S[k]=false; el.classList.remove('sel'); } } });
}

function _alSpec(){
  const w=alGetW(),h=alGetH(),qty=alGetQty(),br=AL_BRACKETS[S.bracket];
  const opts=[]; if(S.cordless)opts.push('Cordless'); if(S.concealed)opts.push('Concealed headrail'); if(S.micro)opts.push('Micro box bracket'); if(S.perforated)opts.push('Perforated'); if(S.privacy)opts.push('Privacy'); if(S.twoOn1)opts.push('2-on-1 headrail');
  return [
    {label:'Product', value:'Wallace 1″ Aluminum Mini-Blinds'},
    {label:'Bracket / gauge', value:br.name},
    {label:'Size', value:(w||'?')+'″ W × '+(h||'?')+'″ H'},
    {label:'Mount', value:(function(){var b=document.querySelector('#grp-mount .opt-btn.sel');return b?b.textContent.trim():'Inside mount';})()},
    {label:'Quantity', value:String(qty)},
    {label:'Color', value:S.color||'To confirm (standard aluminum colors)'},
    {label:'Valance', value:S.valance==='double'?'Double Slat':S.valance==='deluxe'?'Deluxe Slat':br.incl+' (included)'},
    {label:'Control', value:'Wand tilt'+(S.cordless?' · Cordless lift':' · Corded lift')},
    {label:'Options', value:opts.length?opts.join(', '):'None'}
  ];
}

function addAluminumToCart(){
  const w=alGetW(),h=alGetH(); if(!(w>0&&h>0)){ alert('Please enter width and height.'); return; }
  const p=alPrice(); const specLines=_alSpec();
  const specs=specLines.map(function(l){return l.label+': '+l.value;}).join(' | ');
  pbAddToCart({ product:'Wallace 1″ Aluminum Mini-Blinds', specs:specs, lines:specLines, price:(p?p.per:null), qty:alGetQty() });
  if(typeof pbToast==='function') pbToast('Wallace Aluminum Blinds');
}

async function submitQuote(){
  const name=(document.getElementById('cf-name')||{value:''}).value.trim();
  const phone=(document.getElementById('cf-phone')||{value:''}).value.trim();
  const email=(document.getElementById('cf-email')||{value:''}).value.trim();
  const notes=(document.getElementById('cf-notes')||{value:''}).value.trim();
  const err=document.getElementById('cf-contact-err');
  const w=alGetW(),h=alGetH();
  if(!(w>0&&h>0)){ if(err){err.textContent='Please enter width and height first.';err.style.display='block';} return; }
  const btn=document.querySelector('[data-pb-require-contact]');
  const p=alPrice();
  const selections=_alSpec();
  if(notes) selections.push({label:'Notes', value:notes});
  const estimate = p ? ('$'+Math.round(p.total).toLocaleString()+' (estimate only)') : null;
  if(btn){ btn.disabled=true; btn.textContent='Sending…'; }
  try{
    const r=await fetch('/api/quote',{method:'POST',headers:{'Content-Type':'application/json'},
      body:JSON.stringify({name:name,email:email,phone:phone,delivery:'Ship to me',
        product:'Wallace 1″ Aluminum Mini-Blinds',selections:selections,estimate:estimate,notes:notes,
        agreedToTerms:true,agreedToTermsAt:new Date().toISOString(),sourceUrl:window.location.href,_hp:'',_t:Date.now()-(window._formLoadTime||0)})});
    const d=await r.json().catch(function(){return{};});
    if(!r.ok) throw new Error(d.error||'Server error');
    const sb=document.getElementById('success-box'); if(sb){ sb.style.display='block'; sb.scrollIntoView({behavior:'smooth',block:'center'}); }
    var form=document.getElementById('contact-block'); if(form) form.style.display='none';
    try{ if(typeof pbSaveContact==='function') pbSaveContact({name:name,email:email,phone:phone}); }catch(e){}
  }catch(e){
    var body=encodeURIComponent(selections.map(function(l){return l.label+': '+l.value;}).join('\n')+'\n\nName: '+name+'\nPhone: '+phone+'\nEmail: '+email);
    var mail='mailto:blindznation@gmail.com?subject='+encodeURIComponent('Wallace Aluminum Blinds Quote — '+name)+'&body='+body;
    if(err){ err.innerHTML='<strong>Issue sending.</strong> <a href="'+mail+'" style="color:#991B1B;font-weight:700;text-decoration:underline">Email your quote directly →</a> or call <a href="tel:6097421720" style="color:#991B1B">(609) 742-1720</a>.'; err.style.display='block'; }
    if(btn){ btn.disabled=false; btn.textContent='Submit Order for Review →'; }
  }
}

document.addEventListener('DOMContentLoaded', function(){ window._formLoadTime=window._formLoadTime||Date.now(); _alSyncOptionAvail(); calcPrice(); });
