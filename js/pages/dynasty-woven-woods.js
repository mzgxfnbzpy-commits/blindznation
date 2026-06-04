renderNav('Shades & blinds');
renderFooter(false);

// ── PRICING DATA ─────────────────────────────────────────────────────────────
const W=[24,30,36,42,48,60,72,84,96];
const H=[36,42,48,54,60,66,72,78,84,90,96,102,108,114,120];

const BASE={
1:[[272,317,359,406,454,555,700,806,1015],[281,329,373,423,473,579,729,840,1054],[291,341,388,440,492,603,758,874,1092],[321,377,429,488,546,668,834,962,1192],[331,389,444,505,565,692,863,996,1231],[340,401,458,522,584,716,892,1029,1269],[363,429,492,561,629,773,960,1109,1360],[373,441,507,578,649,797,989,1142,1398],[383,454,521,595,668,821,1018,1176,1437],[413,490,563,643,721,886,1094,1264,1536],[422,502,577,659,740,911,1123,1298,1575],[432,514,592,676,760,935,1152,1332,1613],[455,542,626,716,805,991,1220,1411,1704],[464,554,640,733,824,1015,1249,1445,1742],[474,566,655,750,843,1039,1278,1478,1781]],
2:[[309,358,407,462,517,635,796,919,1144],[322,374,427,485,543,668,835,964,1196],[335,391,446,508,569,700,874,1010,1249],[370,432,494,563,630,775,962,1111,1363],[383,448,514,585,656,808,1001,1157,1416],[396,465,533,608,682,840,1040,1203,1468],[422,497,572,654,734,906,1118,1294,1572],[435,513,592,677,760,938,1157,1339,1624],[448,530,612,699,786,971,1197,1385,1676],[483,571,659,754,848,1046,1284,1486,1791],[496,588,679,777,874,1078,1324,1532,1843],[509,604,699,800,900,1111,1363,1578,1895],[535,637,738,845,952,1176,1441,1669,1999],[548,653,757,868,978,1209,1480,1714,2051],[561,669,777,891,1004,1241,1519,1760,2104]],
3:[[334,389,443,505,565,693,866,999,1237],[351,410,468,535,599,736,917,1058,1305],[368,431,494,564,632,778,968,1118,1372],[404,473,543,621,695,854,1057,1221,1489],[421,495,568,650,729,896,1108,1280,1557],[437,516,593,680,763,939,1159,1339,1624],[464,549,633,726,815,1004,1237,1431,1729],[481,570,658,755,849,1047,1288,1490,1797],[498,591,684,785,883,1089,1339,1549,1865],[533,633,733,841,946,1165,1428,1653,1981],[550,655,758,871,979,1208,1479,1712,2049],[567,676,783,900,1013,1250,1530,1771,2117],[593,709,823,946,1066,1315,1608,1863,2222],[610,730,848,976,1099,1358,1659,1922,2289],[627,751,873,1005,1133,1400,1710,1981,2357]],
4:[[365,426,488,557,624,767,955,1103,1355],[387,454,521,596,669,823,1022,1181,1444],[409,482,555,635,713,879,1089,1258,1533],[446,526,605,694,778,958,1181,1365,1654],[468,554,639,733,823,1014,1248,1443,1743],[490,582,672,771,867,1069,1315,1521,1832],[518,616,713,819,922,1138,1397,1617,1942],[540,644,747,858,966,1193,1464,1695,2031],[562,671,780,897,1011,1249,1530,1773,2120],[599,716,831,955,1076,1328,1623,1880,2241],[622,743,864,994,1121,1384,1690,1958,2330],[644,771,898,1033,1165,1439,1757,2036,2419],[671,805,939,1081,1220,1508,1839,2131,2528],[693,833,972,1120,1264,1563,1905,2209,2617],[716,861,1005,1159,1309,1619,1972,2287,2706]],
5:[[441,522,603,692,778,960,1185,1371,1662],[473,562,650,747,841,1038,1280,1482,1789],[505,601,698,802,904,1117,1375,1593,1915],[551,658,764,878,989,1222,1498,1735,2076],[583,697,811,933,1052,1301,1593,1845,2203],[615,737,858,989,1116,1380,1687,1956,2329],[652,783,914,1054,1190,1473,1799,2086,2478],[684,823,962,1109,1253,1552,1894,2197,2605],[715,862,1009,1165,1316,1631,1989,2307,2731],[762,919,1075,1240,1402,1735,2112,2450,2892],[794,958,1122,1296,1465,1814,2206,2560,3018],[825,998,1170,1351,1528,1893,2301,2671,3145],[863,1045,1226,1416,1602,1986,2413,2801,3294],[894,1084,1273,1471,1666,2065,2508,2912,3420],[926,1124,1320,1527,1729,2144,2602,3022,3547]]
};
const ADD6={1:[7,9,11,13,14,18,22,25,29],2:[8,10,11,13,15,19,23,26,30],3:[10,13,15,18,21,26,31,36,41],4:[13,16,19,22,26,32,38,45,51],5:[19,23,29,33,38,47,57,66,76]};

// Loop surcharge [by W cols 24,36,48,60,72,84,96]
const LOOP_W=[24,36,48,60,72,84,96];
const LOOP_S=[136,156,171,187,202,230,242];
// Cordless surcharge same W cols
const CORD_S=[121,142,162,223,263,289,297];
// TDBU surcharge: widths 18-24, 24⅛-36, 36⅛-48, 48⅛-60, 60⅛-72 → N/A for >72
const TDBU_BREAKS=[24,36,48,60,72];
const TDBU_S=[156,188,218,271,323];

// Privacy liner [H rows][W cols 24,30,36,42,48,60,72,84,96]
const PRIV=[[56,62,70,77,97,128,145,163,179],[61,67,76,84,107,140,158,178,197],[65,73,82,91,115,151,172,194,215],[68,77,88,98,125,162,186,210,233],[74,83,94,105,134,173,199,226,251],[77,87,100,112,142,184,213,241,269],[81,93,106,119,151,196,226,257,287],[109,126,142,158,214,272,311,351,391],[113,132,149,166,226,285,328,370,413],[119,138,156,174,236,299,344,389,435],[124,143,163,182,248,312,360,408,457],[128,148,170,190,259,327,378,429,479],[132,154,176,198,270,340,394,448,500],[138,160,183,206,281,354,411,467,523],[142,166,190,214,292,368,427,486,544]];
const BO=[[66,77,86,96,119,155,178,200,223],[72,84,94,106,130,170,196,221,247],[77,91,103,116,142,185,213,242,271],[83,97,110,125,154,199,232,262,294],[88,104,118,134,166,214,249,283,318],[94,112,126,144,178,229,266,304,341],[99,118,135,153,189,244,285,325,365],[128,150,172,194,261,329,382,435,486],[134,158,181,204,275,347,403,459,515],[141,165,190,214,289,366,424,484,544],[147,173,198,225,303,384,446,509,571],[152,179,208,236,317,401,468,534,600],[158,188,216,246,331,419,489,558,628],[164,195,225,256,345,436,509,584,657],[170,202,234,266,360,454,531,609,685]];
// Dual shade liner surcharge
const PRIV_DUAL=[[159,173,187,204,244,298,332,363,393],[162,177,192,210,252,308,343,375,408],[166,181,197,216,259,317,354,388,422],[169,186,202,222,266,326,365,401,437],[173,190,207,228,274,335,376,413,451],[176,194,212,234,281,345,387,426,468],[180,199,218,240,289,354,398,439,485],[237,260,283,309,414,502,560,615,670],[241,265,289,316,424,514,574,632,689],[245,270,295,323,434,526,589,648,708],[249,275,301,330,443,537,603,665,727],[253,280,307,337,453,550,617,682,746],[257,285,312,344,462,562,632,698,773],[261,290,319,351,472,574,646,715,799],[265,295,324,358,481,585,660,737,824]];
const BO_DUAL=[[177,195,213,234,275,338,378,417,455],[182,201,221,244,286,352,395,436,477],[188,208,229,253,298,366,412,456,500],[193,215,237,261,309,380,429,476,522],[198,221,246,271,320,394,446,495,545],[203,228,252,280,331,408,463,515,567],[208,234,260,289,343,422,480,535,590],[273,304,335,371,483,588,664,737,809],[279,312,345,381,496,606,685,761,838],[285,319,354,392,511,623,707,786,866],[292,327,363,402,525,641,728,812,895],[297,335,372,413,540,659,749,836,924],[304,342,381,424,554,677,771,862,952],[309,350,390,435,568,695,793,887,981],[316,357,399,445,582,713,814,912,1010]];

// Edge binding [by length cols: 36,48,60,72,84,96,108,120]
const EB_L=[36,48,60,72,84,96,108,120];
const EB_HALF_FF=[56,64,72,80,91,104,119,131];
const EB_HALF_HOB=[73,83,93,104,119,135,155,171];
const EB_15_FF=[114,130,148,166,191,226,259,292];
const EB_15_HOB=[148,170,192,215,249,294,337,379];

// Valance surcharge [W cols: 24,36,48,60,72,84,96]
const VAL_W=[24,36,48,60,72,84,96];
const VAL={
  1:{std:[0,0,0,0,0,0,0],'12"':[96,122,155,185,220,251,279],'18"':[122,160,204,247,293,335,374]},
  2:{std:[0,0,0,0,0,0,0],'12"':[104,135,171,206,245,281,313],'18"':[135,178,231,280,333,382,428]},
  3:{std:[0,0,0,0,0,0,0],'12"':[123,165,215,261,312,358,400],'18"':[168,229,298,363,432,497,559]},
  4:{std:[0,0,0,0,0,0,0],'12"':[139,190,248,302,360,414,465],'18"':[195,270,352,431,513,591,666]},
  5:{std:[0,0,0,0,0,0,0],'12"':[152,210,275,336,401,462,519],'18"':[218,304,398,487,581,671,757]}
};

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
  let f=25+(qty-1)*8;
  if(oversize) f+=80*qty;
  return f;
}

// ── CALC + RENDER ─────────────────────────────────────────────────────────────
function calcPrice(){
  const wW=parseFloat(document.getElementById('w-whole').value)||0;
  const wF=parseFloat(document.getElementById('w-frac').value)||0;
  const hW=parseFloat(document.getElementById('h-whole').value)||0;
  const hF=parseFloat(document.getElementById('h-frac').value)||0;
  S.w=wW+wF; S.h=hW+hF;
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
    document.getElementById('s3val').textContent=S.w+'″ × '+S.h+'″';
    markDone('step3');
  }

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
  document.querySelectorAll('#step2 .opt-card').forEach(c=>c.classList.remove('sel'));
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
  document.querySelectorAll('#step2 .opt-card').forEach(c=>{
    if(c.closest('#step2')) c.classList.remove('sel');
  });
  // re-apply style selection
  if(S.style){
    const ids={Waterfall:'sc-waterfall','Flat Fold':'sc-flatfold',Hobbled:'sc-hobbled'};
    const sid=ids[S.style]; if(sid){const e=document.getElementById(sid);if(e)e.classList.add('sel');}
  }
  el.classList.add('sel');
  S.mount=mount;
  updateStyleVal();
  updateQuote();
}

function updateStyleVal(){
  if(S.style&&S.mount){
    document.getElementById('s2val').textContent=S.style+' · '+S.mount;
    markDone('step2');
  }
}

function pickLift(el,lift){
  document.querySelectorAll('#step4 .opt-card').forEach(c=>c.classList.remove('sel'));
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
  document.querySelectorAll('#step6 .opt-card').forEach(c=>c.classList.remove('sel'));
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
  document.querySelectorAll('#step6 .opt-card').forEach((c,i)=>{
    if(i>=3) c.classList.remove('sel'); // 0,1,2 are EB cards; 3,4,5 are valance
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
  check.style.color=isOn?'#1C1510':'transparent';
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
  document.querySelectorAll('.del-btn').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  S.del=key;
  showEl('del-ship',key==='ship');
  showEl('del-pickup',key==='pickup');
  document.getElementById('s8val').textContent=key==='ship'?'Ship to me':'Pick up';
  markDone('step8');
  updateQuote();
}

// ── SUBMIT ────────────────────────────────────────────────────────────────────
function submitQuote(){
  const name=document.getElementById('f-name').value.trim();
  const phone=document.getElementById('f-phone').value.trim();
  const err=document.getElementById('form-err');
  if(!name||!phone){err.style.display='block';return;}
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
    '  '+(S.del==='ship'?'Ship to me (UPS/FedEx from Huntingdon Valley PA)':'Will pick up (Huntingdon Valley, PA — address after order)'),
    '',
    'CUSTOMER',
    '  Name: '+name,
    '  Phone: '+phone,
    '  Email: '+(document.getElementById('f-email').value.trim()||'—'),
    '  Room/location: '+(document.getElementById('f-room').value.trim()||'Not provided'),
    '  Notes: '+(document.getElementById('f-notes').value.trim()||'None'),
    '',
    'NOTE: Estimated retail pricing only. Final price confirmed with current Wallace Blinds price book before order.'
  ];

  const body=encodeURIComponent(lines.join('\n'));
  const subject=encodeURIComponent('Dynasty Woven Quote — '+S.patName+' (Grp '+S.grp+') — '+name);
  window.location.href='mailto:justin@blindznation.com?subject='+subject+'&body='+body;
  document.getElementById('success-box').style.display='block';
  markDone('step9');
}