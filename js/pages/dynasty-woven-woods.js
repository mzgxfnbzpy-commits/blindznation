// ── PRICING DATA ─────────────────────────────────────────────────────────────
const W=[24,30,36,42,48,60,72,84,96];
const H=[36,42,48,54,60,66,72,78,84,90,96,102,108,114,120];

const BASE={1:[[302,352,398,451,504,616,777,895,1127],[312,365,414,470,525,643,809,932,1170],[323,379,431,488,546,669,841,970,1212],[356,418,476,542,606,741,926,1068,1323],[367,432,493,561,627,768,958,1106,1366],[377,445,508,579,648,795,990,1142,1409],[403,476,546,623,698,858,1066,1231,1510],[414,490,563,642,720,885,1098,1268,1552],[425,504,578,660,741,911,1130,1305,1595],[458,544,625,714,800,983,1214,1403,1705],[468,557,640,731,821,1011,1247,1441,1748],[480,571,657,750,844,1038,1279,1479,1790],[505,602,695,795,894,1100,1354,1566,1891],[515,615,710,814,915,1127,1386,1604,1934],[526,628,727,833,936,1153,1419,1641,1977]],2:[[343,397,452,513,574,705,884,1020,1270],[357,415,474,538,603,741,927,1070,1328],[372,434,495,564,632,777,970,1121,1386],[411,480,548,625,699,860,1068,1233,1513],[425,497,571,649,728,897,1111,1284,1572],[440,516,592,675,757,932,1154,1335,1629],[468,552,635,726,815,1006,1241,1436,1745],[483,569,657,751,844,1041,1284,1486,1803],[497,588,679,776,872,1078,1329,1537,1860],[536,634,731,837,941,1161,1425,1649,1988],[551,653,754,862,970,1197,1470,1701,2046],[565,670,776,888,999,1233,1513,1752,2103],[594,707,819,938,1057,1305,1600,1853,2219],[608,725,840,963,1086,1342,1643,1903,2277],[623,743,862,989,1114,1378,1686,1954,2335]],3:[[371,432,492,561,627,769,961,1109,1373],[390,455,519,594,665,817,1018,1174,1449],[408,478,548,626,702,864,1074,1241,1523],[448,525,603,689,771,948,1173,1355,1653],[467,549,630,722,809,995,1230,1421,1728],[485,573,658,755,847,1042,1286,1486,1803],[515,609,703,806,905,1114,1373,1588,1919],[534,633,730,838,942,1162,1430,1654,1995],[553,656,759,871,980,1209,1486,1719,2070],[592,703,814,934,1050,1293,1585,1835,2199],[611,727,841,967,1087,1341,1642,1900,2274],[629,750,869,999,1124,1388,1698,1966,2350],[658,787,914,1050,1183,1460,1785,2068,2466],[677,810,941,1083,1220,1507,1841,2133,2541],[696,834,969,1116,1258,1554,1898,2199,2616]],4:[[405,473,542,618,693,851,1060,1224,1504],[430,504,578,662,743,914,1134,1311,1603],[454,535,616,705,791,976,1209,1396,1702],[495,584,672,770,864,1063,1311,1515,1836],[519,615,709,814,914,1126,1385,1602,1935],[544,646,746,856,962,1187,1460,1688,2034],[575,684,791,909,1023,1263,1551,1795,2156],[599,715,829,952,1072,1324,1625,1881,2254],[624,745,866,996,1122,1386,1698,1968,2353],[665,795,922,1060,1194,1474,1802,2087,2488],[690,825,959,1103,1244,1536,1876,2173,2586],[715,856,997,1147,1293,1597,1950,2260,2685],[745,894,1042,1200,1354,1674,2041,2365,2806],[769,925,1079,1243,1403,1735,2115,2452,2905],[795,956,1116,1286,1453,1797,2189,2539,3004]],5:[[490,579,669,768,864,1066,1315,1522,1845],[525,624,722,829,934,1152,1421,1645,1986],[561,667,775,890,1003,1240,1526,1768,2126],[612,730,848,975,1098,1356,1663,1926,2304],[647,774,900,1036,1168,1444,1768,2048,2445],[683,818,952,1098,1239,1532,1873,2171,2585],[724,869,1015,1170,1321,1635,1997,2315,2751],[759,914,1068,1231,1391,1723,2102,2439,2892],[794,957,1120,1293,1461,1810,2208,2561,3031],[846,1020,1193,1376,1556,1926,2344,2720,3210],[881,1063,1245,1439,1626,2014,2449,2842,3350],[916,1108,1299,1500,1696,2101,2554,2965,3491],[958,1160,1361,1572,1778,2204,2678,3109,3656],[992,1203,1413,1633,1849,2292,2784,3232,3796],[1028,1248,1465,1695,1919,2380,2888,3354,3937]]};
const ADD6={1:[8,10,12,14,16,20,24,28,32],2:[9,11,12,14,17,21,26,29,33],3:[11,14,17,20,23,29,34,40,46],4:[14,18,21,24,29,36,42,50,57],5:[21,26,32,37,42,52,63,73,84]};

// Loop surcharge [by W cols 24,36,48,60,72,84,96]
const LOOP_W=[24,36,48,60,72,84,96];
const LOOP_S=[151,173,190,208,224,255,269];
// Cordless surcharge same W cols
const CORD_S=[134,158,180,248,292,321,330];
// TDBU surcharge: widths 18-24, 24⅛-36, 36⅛-48, 48⅛-60, 60⅛-72 → N/A for >72
const TDBU_BREAKS=[24,36,48,60,72];
const TDBU_S=[173,209,242,301,359];

// Privacy liner [H rows][W cols 24,30,36,42,48,60,72,84,96]
const PRIV=[[62,69,78,85,108,142,161,181,199],[68,74,84,93,119,155,175,198,219],[72,81,91,101,128,168,191,215,239],[75,85,98,109,139,180,206,233,259],[82,92,104,117,149,192,221,251,279],[85,97,111,124,158,204,236,268,299],[90,103,118,132,168,218,251,285,319],[121,140,158,175,238,302,345,390,434],[125,147,165,184,251,316,364,411,458],[132,153,173,193,262,332,382,432,483],[138,159,181,202,275,346,400,453,507],[142,164,189,211,287,363,420,476,532],[147,171,195,220,300,377,437,497,555],[153,178,203,229,312,393,456,518,581],[158,184,211,238,324,408,474,539,604]];
const BO=[[73,85,95,107,132,172,198,222,248],[80,93,104,118,144,189,218,245,274],[85,101,114,129,158,205,236,269,301],[92,108,122,139,171,221,258,291,326],[98,115,131,149,184,238,276,314,353],[104,124,140,160,198,254,295,337,379],[110,131,150,170,210,271,316,361,405],[142,167,191,215,290,365,424,483,539],[149,175,201,226,305,385,447,509,572],[157,183,211,238,321,406,471,537,604],[163,192,220,250,336,426,495,565,634],[169,199,231,262,352,445,519,593,666],[175,209,240,273,367,465,543,619,697],[182,216,250,284,383,484,565,648,729],[189,224,260,295,400,504,589,676,760]];
// Dual shade liner surcharge
const PRIV_DUAL=[[176,192,208,226,271,331,369,403,436],[180,196,213,233,280,342,381,416,453],[184,201,219,240,287,352,393,431,468],[188,206,224,246,295,362,405,445,485],[192,211,230,253,304,372,417,458,501],[195,215,235,260,312,383,430,473,519],[200,221,242,266,321,393,442,487,538],[263,289,314,343,460,557,622,683,744],[268,294,321,351,471,571,637,702,765],[272,300,327,359,482,584,654,719,786],[276,305,334,366,492,596,669,738,807],[281,311,341,374,503,611,685,757,828],[285,316,346,382,513,624,702,775,858],[290,322,354,390,524,637,717,794,887],[294,327,360,397,534,649,733,818,915]];
const BO_DUAL=[[196,216,236,260,305,375,420,463,505],[202,223,245,271,317,391,438,484,529],[209,231,254,281,331,406,457,506,555],[214,239,263,290,343,422,476,528,579],[220,245,273,301,355,437,495,549,605],[225,253,280,311,367,453,514,572,629],[231,260,289,321,381,468,533,594,655],[303,337,372,412,536,653,737,818,898],[310,346,383,423,551,673,760,845,930],[316,354,393,435,567,692,785,872,961],[324,363,403,446,583,712,808,901,993],[330,372,413,458,599,731,831,928,1026],[337,380,423,471,615,751,856,957,1057],[343,389,433,483,630,771,880,985,1089],[351,396,443,494,646,791,904,1012,1121]];

// Edge binding [by length cols: 36,48,60,72,84,96,108,120]
const EB_L=[36,48,60,72,84,96,108,120];
const EB_HALF_FF=[62,71,80,89,101,115,132,145];
const EB_HALF_HOB=[81,92,103,115,132,150,172,190];
const EB_15_FF=[127,144,164,184,212,251,287,324];
const EB_15_HOB=[164,189,213,239,276,326,374,421];

// Valance surcharge [W cols: 24,36,48,60,72,84,96]
const VAL_W=[24,36,48,60,72,84,96];
const VAL={1:{std:[0,0,0,0,0,0,0],"12\"":[107,135,172,205,244,279,310],"18\"":[135,178,226,274,325,372,415]},2:{std:[0,0,0,0,0,0,0],"12\"":[115,150,190,229,272,312,347],"18\"":[150,198,256,311,370,424,475]},3:{std:[0,0,0,0,0,0,0],"12\"":[137,183,239,290,346,397,444],"18\"":[186,254,331,403,480,552,620]},4:{std:[0,0,0,0,0,0,0],"12\"":[154,211,275,335,400,460,516],"18\"":[216,300,391,478,569,656,739]},5:{std:[0,0,0,0,0,0,0],"12\"":[169,233,305,373,445,513,576],"18\"":[242,337,442,541,645,745,840]}};

// TDBU availability (group 1 & 2 = N/A; group 3,4,5 = available up to chart limits)
// Pattern-specific TDBU max: [no_liner_maxW, no_liner_maxH, liner_maxW, liner_maxH]
const TDBU_LIMITS={
  'BJ3405':[60,72,60,60],'BJ3406':[60,72,60,60],'BJ3407':[60,72,60,60],
  'BJ3415':[72,72,60,72],'BJ3416':[72,72,60,72],
  'BP3511':[72,72,60,60],'BP3512':[72,72,60,60],'BP3513':[72,72,60,60],
  'BP3501':[72,72,72,72],'BP3502':[72,72,72,72],'BP3503':[72,72,72,72],'BP3504':[72,72,72,72],
  'BP3505':[72,72,60,60],'BP3506':[72,72,60,60],
  'J3515':[72,72,72,72],'J3516':[72,72,72,72],'J3517':[72,72,72,72],'J3518':[72,72,72,72],
  'J3601':[72,72,72,72],'J3602':[72,72,72,72],'J3603':[72,72,72,72],'J3604':[72,72,72,72],
  'J3605':[72,72,72,72],'J3606':[72,72,72,72],'J3607':[72,72,72,72],'J3608':[72,72,72,72],
  'BJ3611':[72,72,60,72],'BJ3612':[72,72,60,72],'BJ3613':[72,72,60,72]
};

// Slim clutch: B3311/B3312 ≤60×60 slim; rest ≤72×72 slim
const SLIM60=['B3311','B3312'];

// ── STATE ─────────────────────────────────────────────────────────────────────
const S={
  patNum:'',patName:'',grp:0,
  style:'',mount:'',
  w:0,h:0,qty:1,
  lift:'',linerType:'none',linerColor:'',linerCode:'',
  eb:'none',valance:'Standard (included)',
  hw:[],
  motorAcc:{},
  del:'',
  valid:false
};

// ── HELPERS ───────────────────────────────────────────────────────────────────
function toggleStep(id){const el=document.getElementById(id);el.classList.add('active');setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),60);}
function openStep(id){const el=document.getElementById(id);el.classList.add('active');setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),80);}
function markDone(id){document.getElementById(id).classList.add('done');}
function showEl(id,show){const e=document.getElementById(id);if(e)e.style.display=show?'block':'none';}
function showFlex(id,show){const e=document.getElementById(id);if(e)e.style.display=show?'flex':'none';}
function setText(id,v){const e=document.getElementById(id);if(e)e.textContent=v||'—';}

function lookup(table,val,cols){
  // find smallest col >= val
  for(let i=0;i<cols.length;i++) if(cols[i]>=val) return i;
  return cols.length-1;
}

function getBasePrice(grp,w,h){
  if(!grp||!w||!h) return null;
  const wi=lookup(BASE[grp][0],w,W); // width index in W array
  if(W[wi]<w) return null;
  // find height row
  const hi=H.findIndex(r=>r>=h);
  if(hi>=0){
    return BASE[grp][hi][wi];
  }
  // above 120": 120 price + extra 6" increments
  const base120=BASE[grp][14][wi];
  const extraH=h-120;
  const n6=Math.ceil(extraH/6);
  return base120+n6*ADD6[grp][wi];
}

function getLiftSurcharge(){
  if(!S.lift||!S.w) return 0;
  const wi=lookup(LOOP_W,S.w,LOOP_W);
  if(S.lift==='Loop Chain') return LOOP_S[wi];
  if(S.lift==='Cordless') return CORD_S[wi];
  if(S.lift==='Cordless TDBU'){
    const ti=TDBU_BREAKS.findIndex(b=>S.w<=b);
    return ti>=0?TDBU_S[ti]:0;
  }
  if(S.lift==='Motorized') return 515; // motor price
  return 0;
}

function getLinerSurcharge(base){
  if(S.linerType==='none') return 0;
  if(!S.w||!S.h) return 0;
  const wi=W.findIndex(c=>c>=S.w); if(wi<0) return 0;
  const hi=H.findIndex(r=>r>=S.h); if(hi<0) return 0;
  const isDual=S.lift==='Dual Shade';
  if(S.linerType==='privacy') return isDual?PRIV_DUAL[hi][wi]:PRIV[hi][wi];
  if(S.linerType==='blackout') return isDual?BO_DUAL[hi][wi]:BO[hi][wi];
  return 0;
}

function getEBSurcharge(){
  if(S.eb==='none') return 0;
  if(!S.h) return 0;
  const li=EB_L.findIndex(l=>l>=S.h); const idx=li>=0?li:EB_L.length-1;
  const isHob=(S.style==='Hobbled');
  if(S.eb==='0.5') return isHob?EB_HALF_HOB[idx]:EB_HALF_FF[idx];
  if(S.eb==='1.5') return isHob?EB_15_HOB[idx]:EB_15_FF[idx];
  return 0;
}

function getValanceSurcharge(){
  if(S.valance==='Standard (included)'||!S.w||!S.grp) return 0;
  const vi=VAL_W.findIndex(c=>c>=S.w); const idx=vi>=0?vi:VAL_W.length-1;
  const key=S.valance.includes('12')? '"12"' :'"18"';
  const arr=VAL[S.grp][key.replace(/"/g,'')+'\"'];
  // map key
  const map12=VAL[S.grp]['12"'];
  const map18=VAL[S.grp]['18"'];
  if(S.valance.includes('12')) return map12?map12[idx]:0;
  if(S.valance.includes('18')) return map18?map18[idx]:0;
  return 0;
}

function getMotorAccTotal(){
  const prices={remote:68,charger:52,ext:21,solar:130,hub:416};
  return Object.keys(S.motorAcc).filter(k=>S.motorAcc[k]).reduce((t,k)=>t+(prices[k]||0),0);
}

function getFreight(){
  if(S.del!=='ship') return 0;
  const qty=S.qty||1;
  const oversize=(S.w>=90||S.h>=90);
  let f=25+(qty-1)*10;
  if(oversize) f+=80*qty;
  return f;
}

// ── CALC + RENDER ─────────────────────────────────────────────────────────────
function calcPrice(){
  S.w=parseFloat(document.getElementById('w-whole').value)||0;
  S.h=parseFloat(document.getElementById('h-whole').value)||0;
  const qty=parseInt(document.getElementById('qty').value)||1;
  S.qty=qty;

  const dimErr=document.getElementById('dim-err');
  const dimWarn=document.getElementById('dim-warn');
  const sizeBox=document.getElementById('size-box');
  dimErr.classList.remove('show'); dimWarn.classList.remove('show'); sizeBox.style.display='none';

  if(!S.w||!S.h){updateQuote();return;}

  if(S.w<18){dimErr.textContent='Minimum width is 18″.';dimErr.classList.add('show');updateQuote();return;}
  if(S.h<24){dimErr.textContent='Minimum height is 24″.';dimErr.classList.add('show');updateQuote();return;}

  if(S.w>96||S.h>96){
    dimWarn.textContent='⚠ Standard max is 96″×96″. Sizes beyond this may require custom review. An estimate is shown but confirm with us before ordering.';
    dimWarn.classList.add('show');
  }

  if(S.grp){
    const wi=W.findIndex(c=>c>=S.w);
    const hi=H.findIndex(r=>r>=S.h);
    const wCol=wi>=0?W[wi]:'>96"';
    const hRow=hi>=0?H[hi]:(H[14]+' + extra');
    const base=getBasePrice(S.grp,S.w,S.h);
    sizeBox.style.display='block';
    document.getElementById('cv-size').textContent=S.w+'″ W × '+S.h+'″ H';
    document.getElementById('cv-bracket').textContent=wCol+'″ × '+hRow+'″';
    document.getElementById('cv-base').textContent=base?'$'+base:'Group not selected';
  }

  updateWindowVal();

  // Slim clutch note
  if(S.patNum&&S.w&&S.h){
    const isB3312=SLIM60.includes(S.patNum);
    const slimMax=isB3312?60:72;
    const usesSlim=(S.w<=slimMax&&S.h<=slimMax);
    const clutchNote=document.getElementById('clutch-note');
    clutchNote.textContent=usesSlim?
      `Headrail: 1.5″ slim clutch (shade ≤${slimMax}″×${slimMax}″). Fits better in tight inside mount applications.`:
      `Headrail: 2.5″ regular clutch (shade >${slimMax}″×${slimMax}″ for ${isB3312?'Lhasa patterns':'this pattern'}).`;
    clutchNote.style.display='block';
  }

  // TDBU validation
  validateLift();
  updateQuote();
}

function validateLift(){
  const e=document.getElementById('lift-err');
  const w=document.getElementById('lift-warn');
  e.classList.remove('show'); w.classList.remove('show');
  if(!S.lift) return;

  const hobbled=S.style==='Hobbled';
  if(hobbled&&(S.lift==='Cordless'||S.lift==='Motorized'||S.lift==='Dual Shade')){
    e.textContent=`⚠ ${S.lift} is not available with Hobbled shade style. Please choose Loop Chain, or change the shade style.`;
    e.classList.add('show'); return;
  }
  if(hobbled&&S.lift==='Cordless TDBU'){
    e.textContent='⚠ Cordless TDBU is not available with Hobbled shade.';
    e.classList.add('show'); return;
  }

  if(S.lift==='Cordless TDBU'){
    if(S.style&&S.style!=='Flat Fold'){
      e.textContent='⚠ Cordless TDBU is only available in Flat Fold style.';
      e.classList.add('show'); return;
    }
    if(S.w>72||S.h>72){
      e.textContent='⚠ Cordless TDBU maximum is 72″ × 72″. Your dimensions exceed this limit.';
      e.classList.add('show'); return;
    }
    // Check pattern TDBU availability
    if(S.patNum&&S.grp<=2){
      e.textContent='⚠ Price Group 1 and 2 patterns (bamboo) are NOT available in Cordless TDBU due to weight.';
      e.classList.add('show'); return;
    }
    if(S.patNum&&TDBU_LIMITS[S.patNum]){
      const lim=TDBU_LIMITS[S.patNum];
      const hasLiner=S.linerType!=='none';
      const maxW=hasLiner?lim[2]:lim[0];
      const maxH=hasLiner?lim[3]:lim[1];
      if(S.w>maxW||S.h>maxH){
        w.textContent=`⚠ ${S.patName} TDBU limit${hasLiner?' (with liner)':''}: max ${maxW}″ W × ${maxH}″ H. Your size exceeds this.`;
        w.classList.add('show');
      }
    }
  }

  if(S.lift==='Dual Shade'&&hobbled){
    e.textContent='⚠ Dual Shade is not available with Hobbled style.';
    e.classList.add('show'); return;
  }

  if(S.lift==='Motorized'){
    if(S.style==='Hobbled'){e.textContent='⚠ Motorized is not available with Hobbled style.';e.classList.add('show');return;}
    if(S.w>0&&S.w<26){e.textContent='⚠ Motorized minimum width is 26″.';e.classList.add('show');return;}
    if(S.h>0&&S.h<36){e.textContent='⚠ Motorized minimum height is 36″.';e.classList.add('show');return;}
    if(S.w>96||S.h>96){w.textContent='⚠ Motorized max width/height: refer to motorization chart. Confirm with installer.';w.classList.add('show');}
  }
}

function updateQuote(){
  const base=getBasePrice(S.grp,S.w,S.h);
  const ready=S.patNum&&S.style&&S.mount&&S.w&&S.h&&S.lift;
  if(!ready){showEl('qp-pending',true);showEl('qp-detail',false);return;}
  if(!base){showEl('qp-pending',true);showEl('qp-detail',false);return;}

  showEl('qp-pending',false);showEl('qp-detail',true);

  setText('qr-pat',S.patNum+' '+S.patName);
  setText('qr-grp','Group '+S.grp);
  setText('qr-style',S.style);
  setText('qr-mount',S.mount);
  setText('qr-size',S.w+'″ × '+S.h+'″');
  setText('qr-lift',S.lift);
  setText('qr-liner',S.linerType==='none'?'None':capitalize(S.linerType)+' ('+S.linerColor+' '+S.linerCode+')');
  setText('qr-qty',S.qty+' shade'+(S.qty>1?'s':''));
  setText('qr-base','$'+base+' each');

  const liftS=getLiftSurcharge();
  const hobMult=S.style==='Hobbled'?0.3:0;
  const hobAmt=Math.round(base*hobMult);
  const linerS=getLinerSurcharge(base);
  const linerHobAmt=S.style==='Hobbled'?Math.round(linerS*0.3):0;
  const ebS=getEBSurcharge();
  const valS=getValanceSurcharge();
  const motorS=S.lift==='Motorized'?getMotorAccTotal():0;
  const freight=getFreight();

  showFlex('qr-lift-row',liftS>0);
  if(liftS>0){setText('qr-lift-lbl',S.lift+' surcharge');setText('qr-lift-s','$'+liftS+' each');}
  showFlex('qr-hob-row',hobAmt>0);
  if(hobAmt>0) setText('qr-hob-s','+$'+hobAmt+' each');
  showFlex('qr-liner-row',linerS>0);
  if(linerS>0) setText('qr-liner-s','$'+linerS+' each');
  showFlex('qr-lhob-row',linerHobAmt>0);
  if(linerHobAmt>0) setText('qr-lhob-s','+$'+linerHobAmt+' each');
  showFlex('qr-eb-row',ebS>0);
  if(ebS>0) setText('qr-eb-s','$'+ebS+' each');
  showFlex('qr-val-row',valS>0);
  if(valS>0) setText('qr-val-s','$'+valS+' each');
  showFlex('qr-mot-row',motorS>0);
  if(motorS>0) setText('qr-mot-s','$515 motor + $'+motorS+' acc. each');
  showFlex('qr-fr-row',S.del==='ship');
  if(S.del==='ship') setText('qr-fr-s','$'+getFreight()+' (est.)');

  const perShade=base+liftS+hobAmt+linerS+linerHobAmt+ebS+valS+(S.lift==='Motorized'?515+motorS:0);
  const total=perShade*S.qty+freight;
  setText('qr-total','$'+Math.round(total).toLocaleString());
}

function capitalize(s){return s.charAt(0).toUpperCase()+s.slice(1);}

// ── PICKERS ───────────────────────────────────────────────────────────────────
function pickPattern(num,name,grp,el){
  document.querySelectorAll('.pat-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.patNum=num; S.patName=name; S.grp=grp;
  document.getElementById('s1val').textContent=num+' '+name+' (Grp '+grp+')';
  markDone('step1');
  // Update disabled states for TDBU based on group
  const tdbuCard=document.getElementById('lc-tdbu');
  if(grp<=2){tdbuCard.classList.add('disabled');}
  else{tdbuCard.classList.remove('disabled');}
  validateLift(); calcPrice(); updateQuote();
}

function pickStyle(el,style){
  document.querySelectorAll('#step2 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.style=style;
  const warn=document.getElementById('style-warn');
  if(style==='Hobbled'){
    warn.textContent='⚠ Hobbled shade carries a 30% surcharge on base price. Not available with Cordless, Motorized, Dual Shade, or TDBU.';
    warn.classList.add('show');
    // Disable incompatible lift options
    ['lc-cordless','lc-tdbu','lc-motor','lc-dual'].forEach(id=>{
      const e=document.getElementById(id);
      if(e)e.classList.add('disabled');
    });
    if(S.lift&&['Cordless','Cordless TDBU','Motorized','Dual Shade'].includes(S.lift)){
      S.lift='';document.getElementById('s4val').textContent='—';
    }
  } else {
    warn.classList.remove('show');
    ['lc-cordless','lc-motor','lc-dual'].forEach(id=>{
      const e=document.getElementById(id); if(e)e.classList.remove('disabled');
    });
    if(S.grp>2){const e=document.getElementById('lc-tdbu');if(e)e.classList.remove('disabled');}
  }
  updateStyleVal();
  validateLift(); calcPrice(); updateQuote();
}

function pickMount(el,mount){
  document.querySelectorAll('#grp-mount .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.mount=mount;
  updateWindowVal();
  updateQuote();
}

function updateWindowVal(){
  const parts=[];
  if(S.w&&S.h) parts.push(S.w+'″ × '+S.h+'″');
  if(S.mount) parts.push(S.mount);
  if(parts.length){
    document.getElementById('s3val').textContent=parts.join(' · ');
    markDone('step3');
  }
}

function updateStyleVal(){
  if(S.style){
    document.getElementById('s2val').textContent=S.style;
    markDone('step2');
  }
}

function pickLift(el,lift){
  document.querySelectorAll('#step4 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.lift=lift;
  document.getElementById('s4val').textContent=lift;
  showEl('motor-section',lift==='Motorized');
  markDone('step4');
  // Dual shade requires liner
  if(lift==='Dual Shade'&&S.linerType==='none'){
    document.getElementById('liner-warn').textContent='⚠ Dual Shade requires a Privacy or Blackout liner. Please select one in Step 5.';
    document.getElementById('liner-warn').classList.add('show');
  } else {
    document.getElementById('liner-warn').classList.remove('show');
  }
  validateLift(); calcPrice(); updateQuote();
}

function toggleMotorAcc(key,el){
  S.motorAcc[key]=!S.motorAcc[key];
  el.classList.toggle('sel',S.motorAcc[key]);
  updateQuote();
}

function pickLiner(type,el){
  document.querySelectorAll('.liner-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.linerType=type;
  S.linerColor=''; S.linerCode='';
  const wrap=document.getElementById('liner-color-wrap');
  wrap.style.display=(type!=='none')?'block':'none';
  if(type!=='none'){
    document.querySelectorAll('#liner-colors .clr-btn').forEach(b=>b.classList.remove('sel'));
  }
  document.getElementById('s5val').textContent=type==='none'?'No liner':capitalize(type)+' liner';
  markDone('step5');
  // Update liner code suffix in color buttons based on type
  document.querySelectorAll('#liner-colors .clr-btn').forEach(b=>{
    b.onclick=function(){
      const parts=b.getAttribute('onclick').match(/pickLinerColor\('([^']+)','([^']+)'/);
      if(parts) pickLinerColor(parts[1],parts[2],this);
    };
  });
  validateLift(); calcPrice(); updateQuote();
}

function pickLinerColor(color,codeBase,el){
  document.querySelectorAll('#liner-colors .clr-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  const suffix=S.linerType==='blackout'?'BO':'P';
  S.linerColor=color;
  S.linerCode=codeBase+suffix;
  document.getElementById('s5val').textContent=capitalize(S.linerType)+' — '+color+' ('+S.linerCode+')';
  updateQuote();
}

function pickEB(el,type){
  // EB pills are the first 3 buttons in #step6; valance buttons (index 3+) keep their highlight.
  document.querySelectorAll('#step6 .opt-btn').forEach((c,i)=>{ if(i<3) c.classList.remove('sel'); });
  el.classList.add('sel');
  S.eb=type;
  updateEBVal();
  // Hold down + EB warning
  const hasHoldDown=S.hw.includes('Hold Down Clips');
  const warn=document.getElementById('eb-warn');
  if(hasHoldDown&&type!=='none'){
    warn.textContent='⚠ When Hold Down Clips are selected with edge binding, there is NO bottom edge binding.';
    warn.classList.add('show');
  } else warn.classList.remove('show');
  updateQuote();
}

function pickValance(el,val){
  // Only update valance cards within step6
  document.querySelectorAll('#step6 .opt-btn').forEach((c,i)=>{
    if(i>=3) c.classList.remove('sel'); // 0,1,2 are EB pills; 3,4,5 are valance
  });
  el.classList.add('sel');
  S.valance=val;
  updateEBVal();
  updateQuote();
}

function updateEBVal(){
  const eb=S.eb==='none'?'No EB':(S.eb==='0.5'?'½″ EB':'1½″ EB');
  const val=S.valance==='Standard (included)'?'Std valance':S.valance.replace('Valance','val.');
  document.getElementById('s6val').textContent=eb+' · '+val;
  markDone('step6');
}

function toggleHW(el,label){
  el.classList.toggle('sel');
  const check=el.querySelector('.addon-check');
  const isOn=el.classList.contains('sel');
  check.style.color=isOn?'#111110':'transparent';
  if(isOn){if(!S.hw.includes(label))S.hw.push(label);}
  else{S.hw=S.hw.filter(v=>v!==label);}
  // Hold down + EB conflict warning
  const ebWarn=document.getElementById('eb-warn');
  if(S.hw.includes('Hold Down Clips')&&S.eb!=='none'){
    ebWarn.textContent='⚠ When Hold Down Clips are selected with edge binding, there is NO bottom edge binding.';
    ebWarn.classList.add('show');
  } else ebWarn.classList.remove('show');
  document.getElementById('s7val').textContent=S.hw.length?S.hw.length+' option'+(S.hw.length>1?'s':''):'Standard';
  markDone('step7');
  updateQuote();
}

function adjQty(d){
  const el=document.getElementById('qty');
  el.value=Math.max(1,Math.min(99,(parseInt(el.value)||1)+d));
  S.qty=parseInt(el.value);
  calcPrice();
}

function pickDel(btn,key){
  document.querySelectorAll('.delivery-opt-card').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  S.del=key;
  document.getElementById('s8val').textContent=key==='ship'?'Ship to me':'Pick up';
  markDone('step8');
  updateQuote();
}

// ── SUBMIT ────────────────────────────────────────────────────────────────────
function addDynastyToCart(){
  if(!S.patName){ alert('Please select a pattern before adding to cart.'); return; }
  if(!S.mount){ alert('Please select a mount type before adding to cart.'); return; }
  if(!S.w||!S.h){ alert('Please enter valid dimensions before adding to cart.'); return; }
  if(!S.lift){ alert('Please select a lift/control type before adding to cart.'); return; }

  const totalEl=document.getElementById('qr-total');
  const priceText=totalEl?totalEl.textContent.trim():'';
  const price=priceText?parseFloat(priceText.replace(/[^0-9.]/g,''))||null:null;

  const lines=[
    {label:'Product',value:'Wallace Dynasty Woven Wood Shades'},
    {label:'Pattern',value:(S.patNum?S.patNum+' ':'')+S.patName},
    {label:'Price Group',value:String(S.grp||'—')},
    {label:'Style',value:S.style||'—'},
    {label:'Mount',value:S.mount||'—'},
    {label:'Width',value:(S.w||'—')+'″'},
    {label:'Height',value:(S.h||'—')+'″'},
    {label:'Control',value:S.lift||'—'},
    {label:'Liner',value:S.linerType&&S.linerType!=='none'?capitalize(S.linerType):'None'},
    {label:'Edge Binding',value:S.eb!=='none'?(S.eb+'″ twill'):'None'},
    {label:'Valance',value:S.valance||'—'},
    {label:'Quantity',value:String(S.qty||1)}
  ];
  const specs=lines.map(l=>l.label+': '+l.value).join(' | ');
  pbAddToCart({product:'Wallace Dynasty Woven Wood Shades',lines:lines,specs:specs,price:price,qty:S.qty||1});
  pbOpenCart();
}

function submitQuote(){
  const name=document.getElementById('cf-name').value.trim();
  const phone=document.getElementById('cf-phone').value.trim();
  const err=document.getElementById('cf-contact-err');
  if(!name||!phone){err.textContent='Please enter your name and phone number.';err.style.display='block';return;}
  err.style.display='none';

  const base=getBasePrice(S.grp,S.w,S.h)||0;
  const liftS=getLiftSurcharge();
  const hobAmt=S.style==='Hobbled'?Math.round(base*0.3):0;
  const linerS=getLinerSurcharge(base);
  const linerHobAmt=S.style==='Hobbled'?Math.round(linerS*0.3):0;
  const ebS=getEBSurcharge();
  const valS=getValanceSurcharge();
  const motorAcc=S.lift==='Motorized'?getMotorAccTotal():0;
  const perShade=base+liftS+hobAmt+linerS+linerHobAmt+ebS+valS+(S.lift==='Motorized'?515+motorAcc:0);
  const total=perShade*S.qty+getFreight();

  const accList=Object.keys(S.motorAcc).filter(k=>S.motorAcc[k]).join(', ')||'None';
  const hwList=S.hw.join(', ')||'None';

  const lines=[
    'DYNASTY WOVEN WOOD SHADES — QUOTE REQUEST',
    '',
    'PRODUCT',
    '  Product: Wallace Dynasty Woven Wood Shades',
    '  Pattern: '+S.patNum+' '+S.patName,
    '  Price Group: '+S.grp,
    '  Style: '+S.style,
    '  Mount: '+S.mount,
    '',
    'DIMENSIONS & QUANTITY',
    '  Width: '+S.w+'″',
    '  Height: '+S.h+'″',
    '  Quantity: '+S.qty,
    '',
    'LIFT / CONTROL',
    '  Control: '+S.lift,
    '  Headrail: '+(S.lift==='Dual Shade'?'3.5″':S.lift==='Motorized'?'1.5″ (Automate 25mm motor)':'Slim 1.5″ or 2.5″ regular (see clutch chart)'),
    '',
    'LINER',
    '  Liner type: '+(S.linerType==='none'?'None':capitalize(S.linerType)),
    '  Liner color: '+(S.linerColor||'N/A'),
    '  Liner code: '+(S.linerCode||'N/A'),
    '',
    'UPGRADES',
    '  Edge binding: '+S.eb+(S.eb!=='none'?'″ twill':''),
    '  Valance: '+S.valance,
    '',
    'HARDWARE OPTIONS',
    '  '+hwList,
    '',
    'MOTORIZATION ACCESSORIES',
    '  '+(S.lift==='Motorized'?'Motor: Automate™ Li-ion $515\n  Accessories: '+accList:'N/A'),
    '',
    'PRICING ESTIMATE (retail — confirm with current Wallace price book)',
    '  Base price: $'+base+' per shade',
    '  Lift surcharge: $'+liftS,
    '  Hobbled surcharge (30%): $'+hobAmt,
    '  Liner surcharge: $'+linerS,
    '  Liner hobbled surcharge: $'+linerHobAmt,
    '  Edge binding: $'+ebS,
    '  Valance upgrade: $'+valS,
    '  Motor + accessories: $'+(S.lift==='Motorized'?515+motorAcc:0),
    '  Qty: '+S.qty,
    '  Freight (est.): $'+getFreight(),
    '  ESTIMATED TOTAL: $'+Math.round(total).toLocaleString(),
    '',
    'DELIVERY',
    '  '+'Ship to me (UPS/FedEx)',
    '',
    'CUSTOMER',
    '  Name: '+name,
    '  Phone: '+phone,
    '  Email: '+(document.getElementById('cf-email').value.trim()||'—'),
    '  Notes: '+(document.getElementById('cf-notes').value.trim()||'None'),
    '',
    'NOTE: Estimated retail pricing only. Final price confirmed with current Wallace Blinds price book before order.'
  ];

  const body=encodeURIComponent(lines.join('\n'));
  const subject=encodeURIComponent('Dynasty Woven Quote — '+S.patName+' (Grp '+S.grp+') — '+name);
  window.location.href='mailto:blindznation@gmail.com?subject='+subject+'&body='+body;
  document.getElementById('success-box').style.display='block';
  markDone('step9');
}
