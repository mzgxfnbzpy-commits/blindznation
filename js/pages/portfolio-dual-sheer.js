/* ── FABRIC DATA ── */
const FABRICS = [
  // LF
  {code:'AS04',name:'Addison',color:'Ivory',type:'LF',grp:'E',maxW:108,maxH:108,band:'4¾"',sheer:'3"',comp:'Beige'},
  {code:'AS01',name:'Addison',color:'Sand',type:'LF',grp:'E',maxW:108,maxH:108,band:'4¾"',sheer:'3"',comp:'Beige'},
  {code:'AS03',name:'Addison',color:'Silver',type:'LF',grp:'E',maxW:108,maxH:108,band:'4¾"',sheer:'3"',comp:'Gray'},
  {code:'AS02',name:'Addison',color:'Sky',type:'LF',grp:'E',maxW:108,maxH:108,band:'4¾"',sheer:'3"',comp:'Gray'},
  {code:'AS05',name:'Addison',color:'Snow',type:'LF',grp:'E',maxW:108,maxH:108,band:'4¾"',sheer:'3"',comp:'White'},
  {code:'AI01',name:'Alaia',color:'Dark Gray',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'AI03',name:'Alaia',color:'Ice',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'White'},
  {code:'AI02',name:'Alaia',color:'Soft Gray',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'AN14',name:'Albion',color:'Ice',type:'LF',grp:'C',maxW:108,maxH:108,band:'3¾"',sheer:'2¾"',comp:'White'},
  {code:'AN15',name:'Albion',color:'Ivory',type:'LF',grp:'C',maxW:108,maxH:108,band:'3¾"',sheer:'2¾"',comp:'Beige'},
  {code:'AN16',name:'Albion',color:'Khaki',type:'LF',grp:'C',maxW:108,maxH:108,band:'3¾"',sheer:'2¾"',comp:'Bronze'},
  {code:'AN12',name:'Albion',color:'Latte',type:'LF',grp:'C',maxW:108,maxH:108,band:'3¾"',sheer:'2¾"',comp:'Beige'},
  {code:'AN17',name:'Albion',color:'Midnight',type:'LF',grp:'C',maxW:108,maxH:108,band:'3¾"',sheer:'2¾"',comp:'Black'},
  {code:'AN11',name:'Albion',color:'Pearl',type:'LF',grp:'C',maxW:108,maxH:108,band:'3¾"',sheer:'2¾"',comp:'White'},
  {code:'AN13',name:'Albion',color:'Soft Gray',type:'LF',grp:'C',maxW:108,maxH:108,band:'3¾"',sheer:'2¾"',comp:'Gray'},
  {code:'AN19',name:'Albion',color:'Storm',type:'LF',grp:'C',maxW:108,maxH:108,band:'3¾"',sheer:'2¾"',comp:'Gray'},
  {code:'AN18',name:'Albion',color:'Thunder',type:'LF',grp:'C',maxW:108,maxH:108,band:'3¾"',sheer:'2¾"',comp:'Gray'},
  {code:'AL01',name:'Alessa',color:'Beige',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'AL02',name:'Alessa',color:'Coconut',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'AL03',name:'Alessa',color:'Gray',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'AL04',name:'Alessa',color:'Ivory',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'AL05',name:'Alessa',color:'Sand',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'AL06',name:'Alessa',color:'Taupe',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'AL07',name:'Alessa',color:'White',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'White'},
  {code:'AH04',name:'Asher',color:'Canyon',type:'LF',grp:'A',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Bronze'},
  {code:'AH03',name:'Asher',color:'Gray',type:'LF',grp:'A',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'AH02',name:'Asher',color:'Mineral',type:'LF',grp:'A',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'AH01',name:'Asher',color:'Sandstone',type:'LF',grp:'A',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'BX01',name:'Bixby',color:'Black',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Black'},
  {code:'BX05',name:'Bixby',color:'Bright White',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'White'},
  {code:'BX02',name:'Bixby',color:'Heather Gray',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'BX03',name:'Bixby',color:'Ivory',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'BX04',name:'Bixby',color:'Oxford',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Black'},
  {code:'KG04',name:'Kingston',color:'Bright White',type:'LF',grp:'D',maxW:108,maxH:108,band:'3¼"',sheer:'2¼"',comp:'White'},
  {code:'KG02',name:'Kingston',color:'Onyx',type:'LF',grp:'D',maxW:108,maxH:108,band:'3¼"',sheer:'2¼"',comp:'Black'},
  {code:'KG01',name:'Kingston',color:'Sand',type:'LF',grp:'D',maxW:108,maxH:108,band:'3¼"',sheer:'2¼"',comp:'Beige'},
  {code:'KG03',name:'Kingston',color:'Shadow',type:'LF',grp:'D',maxW:108,maxH:108,band:'3¼"',sheer:'2¼"',comp:'Gray'},
  {code:'LA03',name:'Lani',color:'Aluminum',type:'LF',grp:'D',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Gray'},
  {code:'LA04',name:'Lani',color:'Cloud',type:'LF',grp:'D',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'White'},
  {code:'LA01',name:'Lani',color:'Honey',type:'LF',grp:'D',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Beige'},
  {code:'LA02',name:'Lani',color:'Iron',type:'LF',grp:'D',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Gray'},
  {code:'LE31',name:'Leigh',color:'Champagne',type:'LF',grp:'B',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'LE34',name:'Leigh',color:'Clay',type:'LF',grp:'B',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'LE32',name:'Leigh',color:'Eggshell',type:'LF',grp:'B',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'LE37',name:'Leigh',color:'Mineral',type:'LF',grp:'B',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'LM03',name:'Loma',color:'Fog',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'LM04',name:'Loma',color:'Ice',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'White'},
  {code:'LM01',name:'Loma',color:'Mist',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'LM02',name:'Loma',color:'Stone',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Bronze'},
  {code:'MB03',name:'Marble',color:'Hazel',type:'LF',grp:'E',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Bronze'},
  {code:'MB01',name:'Marble',color:'Ivory',type:'LF',grp:'E',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'MB04',name:'Marble',color:'Pearl',type:'LF',grp:'E',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'White'},
  {code:'MB02',name:'Marble',color:'Taupe',type:'LF',grp:'E',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Bronze'},
  {code:'MT03',name:'Matteo',color:'Chiffon',type:'LF',grp:'C',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'MT02',name:'Matteo',color:'Contrast',type:'LF',grp:'C',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Black'},
  {code:'MT04',name:'Matteo',color:'Earth',type:'LF',grp:'C',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Bronze'},
  {code:'MT06',name:'Matteo',color:'Navy',type:'LF',grp:'C',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Black'},
  {code:'MT01',name:'Matteo',color:'Slate',type:'LF',grp:'C',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'MT05',name:'Matteo',color:'Soft Gray',type:'LF',grp:'C',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'MT07',name:'Matteo',color:'Stone',type:'LF',grp:'C',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'MT08',name:'Matteo',color:'White',type:'LF',grp:'C',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'White'},
  {code:'SL01',name:'Solana',color:'Driftwood',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'SL03',name:'Solana',color:'Walnut',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Bronze'},
  {code:'SL02',name:'Solana',color:'Winter',type:'LF',grp:'D',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'White'},
  {code:'TH17',name:'Theo',color:'Chocolate',type:'LF',grp:'A',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Bronze'},
  {code:'TH24',name:'Theo',color:'Gray',type:'LF',grp:'A',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'TH11',name:'Theo',color:'Ice White',type:'LF',grp:'A',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'White'},
  {code:'TH16',name:'Theo',color:'Latte',type:'LF',grp:'A',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Bronze'},
  {code:'TH15',name:'Theo',color:'Sand',type:'LF',grp:'A',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'TH21',name:'Theo',color:'Storm',type:'LF',grp:'A',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'Gray'},
  {code:'TH12',name:'Theo',color:'White',type:'LF',grp:'A',maxW:110,maxH:108,band:'3"',sheer:'2"',comp:'White'},
  {code:'TR03',name:'Tory',color:'Caramel',type:'LF',grp:'E',maxW:108,maxH:108,band:'4¾"',sheer:'3"',comp:'Bronze',tory:true},
  {code:'TR01',name:'Tory',color:'Cotton',type:'LF',grp:'E',maxW:108,maxH:108,band:'4¾"',sheer:'3"',comp:'Beige',tory:true},
  {code:'TR02',name:'Tory',color:'Latte',type:'LF',grp:'E',maxW:108,maxH:108,band:'4¾"',sheer:'3"',comp:'Bronze',tory:true},
  {code:'TR04',name:'Tory',color:'Pearl',type:'LF',grp:'E',maxW:108,maxH:108,band:'4¾"',sheer:'3"',comp:'White',tory:true},
  // RD
  {code:'BR05',name:'Brantley',color:'Bark',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Bronze'},
  {code:'BR01',name:'Brantley',color:'Beige',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Beige'},
  {code:'BR02',name:'Brantley',color:'Charcoal',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Gray'},
  {code:'BR03',name:'Brantley',color:'Natural Gray',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Gray'},
  {code:'BR04',name:'Brantley',color:'White',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Gray'},
  {code:'BG01',name:'Briggs',color:'Charcoal',type:'RD',grp:'D',maxW:110,maxH:108,band:'4"',sheer:'2¾"',comp:'Black'},
  {code:'BG02',name:'Briggs',color:'Clay',type:'RD',grp:'D',maxW:110,maxH:108,band:'4"',sheer:'2¾"',comp:'Gray'},
  {code:'BG03',name:'Briggs',color:'Light Gray',type:'RD',grp:'D',maxW:110,maxH:108,band:'4"',sheer:'2¾"',comp:'Gray'},
  {code:'BG04',name:'Briggs',color:'White',type:'RD',grp:'D',maxW:110,maxH:108,band:'4"',sheer:'2¾"',comp:'White'},
  {code:'DL02',name:'Declan',color:'Iron',type:'RD',grp:'E',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Black'},
  {code:'DL01',name:'Declan',color:'Ivory',type:'RD',grp:'E',maxW:108,maxH:108,band:'3"',sheer:'2"',comp:'Beige'},
  {code:'EV11',name:'Evlin',color:'Black',type:'RD',grp:'D',maxW:110,maxH:108,band:'3¼"',sheer:'2"',comp:'Black'},
  {code:'LD01',name:'Landry',color:'Anthracite',type:'RD',grp:'D',maxW:110,maxH:108,band:'3¾"',sheer:'2½"',comp:'Gray'},
  {code:'LD02',name:'Landry',color:'Mist',type:'RD',grp:'D',maxW:110,maxH:108,band:'3¾"',sheer:'2½"',comp:'Gray'},
  {code:'LN01',name:'Lena',color:'Heather Gray',type:'RD',grp:'E',maxW:108,maxH:108,band:'4¼"',sheer:'3"',comp:'Gray'},
  {code:'LN04',name:'Lena',color:'Mist',type:'RD',grp:'E',maxW:108,maxH:108,band:'4¼"',sheer:'3"',comp:'White'},
  {code:'LN03',name:'Lena',color:'Sand',type:'RD',grp:'E',maxW:108,maxH:108,band:'4¼"',sheer:'3"',comp:'Beige'},
  {code:'LN02',name:'Lena',color:'Walnut',type:'RD',grp:'E',maxW:108,maxH:108,band:'4¼"',sheer:'3"',comp:'Bronze'},
  {code:'MA01',name:'Mara',color:'Bronze',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Bronze'},
  {code:'MA02',name:'Mara',color:'Ivory',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Gray'},
  {code:'MA03',name:'Mara',color:'Silver',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Gray'},
  {code:'NK01',name:'Nika',color:'Ivory',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Beige'},
  {code:'NK02',name:'Nika',color:'White',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'White'},
];

/* ── PRICE MATRICES (W cols × H rows) ── */
const W_COLS = [24,30,36,42,48,54,60,66,72,84,96,110];
const H_ROWS = [36,42,48,54,60,66,72,78,84,90,96,108];

const PRICES = {A:[[243,261,279,298,315,334,365,388,410,478,547,615],[254,276,298,319,339,383,425,452,478,558,637,717],[267,292,315,339,389,437,487,517,547,637,727,819],[279,306,334,383,437,492,547,582,615,717,819,921],[292,322,365,425,487,547,607,646,684,797,911,1024],[303,337,402,467,534,601,668,711,750,877,1001,1127],[315,365,437,511,583,656,728,775,819,956,1093,1230],[328,394,474,552,632,710,790,840,887,1036,1183,1331],[339,425,511,596,679,765,850,905,956,1114,1274,1433],[365,456,547,637,728,819,911,969,1024,1195,1366,1536],[389,487,583,679,776,875,971,1035,1093,1274,1456,1638],[437,547,656,765,875,984,1093,1162,1230,1433,1638,1843]],B:[[294,312,331,349,367,385,419,446,472,550,630,708],[305,328,349,370,391,441,490,522,550,642,734,826],[318,342,367,391,447,502,559,596,630,734,838,943],[331,357,385,441,502,566,630,669,708,826,943,1060],[342,373,419,490,559,630,699,744,787,917,1048,1180],[355,388,461,540,615,692,769,818,864,1009,1153,1297],[367,419,502,587,671,754,838,893,943,1100,1258,1414],[379,454,546,636,727,818,908,967,1022,1191,1362,1533],[391,490,587,686,782,881,979,1042,1100,1285,1467,1650],[419,525,630,735,838,942,1048,1115,1180,1376,1572,1768],[447,559,671,782,894,1007,1119,1189,1258,1467,1677,1886],[502,630,754,881,1007,1132,1258,1340,1414,1650,1886,2122]],C:[[343,363,383,403,422,442,447,493,520,606,693,779],[357,379,403,425,448,504,523,575,606,708,808,909],[369,395,422,448,512,576,598,657,693,808,924,1040],[383,412,442,504,576,647,671,739,779,909,1040,1168],[395,429,479,560,639,719,745,820,866,1011,1154,1299],[409,445,528,615,704,792,820,903,953,1111,1270,1429],[422,479,576,671,767,863,895,985,1040,1212,1384,1558],[436,520,624,727,831,935,969,1066,1126,1313,1500,1688],[448,560,671,782,895,1007,1044,1148,1212,1414,1617,1818],[479,600,719,838,959,1078,1119,1231,1299,1516,1732,1948],[512,639,767,895,1023,1151,1193,1312,1384,1617,1847,2078],[576,719,863,1007,1151,1294,1343,1477,1558,1818,2078,2337]],D:[[426,446,466,485,505,525,569,604,637,743,850,956],[440,463,485,508,531,598,664,706,743,867,991,1114],[453,478,505,531,607,683,759,806,850,991,1132,1274],[466,495,525,598,683,769,853,906,956,1114,1274,1433],[478,512,569,664,759,853,948,1008,1062,1239,1415,1592],[492,528,626,731,834,938,1043,1108,1167,1362,1556,1752],[505,569,683,797,911,1024,1137,1208,1274,1486,1698,1910],[518,617,740,863,986,1109,1233,1308,1380,1610,1840,2069],[531,664,797,930,1062,1195,1327,1410,1486,1733,1981,2229],[569,711,853,995,1137,1279,1421,1509,1592,1857,2122,2388],[607,759,911,1062,1214,1365,1517,1610,1698,1981,2264,2547],[683,853,1024,1195,1365,1536,1706,1813,1910,2229,2547,2865]],E:[[515,532,551,570,587,606,657,697,739,861,985,1127],[527,548,570,590,613,689,765,815,861,1005,1148,1314],[540,563,587,613,700,788,876,932,985,1148,1312,1503],[551,579,606,689,788,886,985,1047,1107,1292,1477,1690],[563,595,657,765,876,985,1094,1164,1231,1434,1641,1878],[576,610,722,843,962,1082,1203,1279,1353,1578,1803,2065],[587,657,788,918,1049,1181,1312,1396,1477,1720,1967,2254],[600,711,853,995,1136,1278,1421,1513,1598,1866,2131,2440],[613,765,918,1072,1224,1378,1531,1629,1720,2009,2295,2628],[657,820,985,1148,1312,1476,1639,1745,1844,2152,2459,2815],[700,876,1049,1224,1400,1574,1749,1862,1967,2295,2622,3003],[788,985,1181,1378,1574,1771,1967,2094,2213,2582,2951,3379]]};

const BB_WRAP_PRICES = [33,40,50,57,65,73,82,89,98,114,130,146];

/* ── STATE ── */
const S = {
  type:null, fabricCode:null, mount:null,
  width:'', height:'',
  cassette:null, cassColor:null, cassWrap:false,
  bbStyle:null, bbLarge:false, bbWrap:false,
  control:null,
  cordLen:null, metalChain:false,
  liftAssist:false,
  wandLen:null,
  motorType:null, powerSupply:null,
  remote:false, wallSwitch:false, hub:false,
  liPack:false, plugAdapter:false,
  ext6:0, ext48:0, ext96:0, charger:false,
  sbs:false, sideCount:2,
  qty:1, name:'', phone:'', notes:'',
  delivery:'Ship (UPS/FedEx)',
  maxStep:1
};

function fab(){ return FABRICS.find(f=>f.code===S.fabricCode); }

/* ── PRICING ── */
function getBasePrice(){
  const f=fab(); if(!f) return 0;
  const w=parseFloat(S.width), h=parseFloat(S.height);
  if(!w||!h) return 0;
  const wi=W_COLS.findIndex(c=>w<=c);
  const hi=H_ROWS.findIndex(r=>h<=r);
  if(wi<0||hi<0) return 0;
  return PRICES[f.grp][hi][wi];
}
function getBBWrapPrice(){
  const w=parseFloat(S.width); if(!w) return 0;
  const wi=W_COLS.findIndex(c=>w<=c);
  return wi>=0 ? BB_WRAP_PRICES[wi] : 0;
}
function calcTotal(){
  let base=getBasePrice();
  if(!base) return 0;
  if(S.cassWrap) base+=80;
  if(S.bbWrap) base+=getBBWrapPrice();
  if(S.control==='cordless') base+=192;
  if(S.control==='prowand') base+=232;
  if(S.control==='remote') base+=460;
  if(S.metalChain) base+=62;
  if(S.liftAssist) base+=80;
  if(S.remote) base+=111;
  if(S.wallSwitch) base+=114;
  if(S.hub) base+=458;
  if(S.liPack) base+=160;
  if(S.plugAdapter) base+=60;
  base+=S.ext6*32 + S.ext48*43 + S.ext96*60;
  if(S.charger) base+=83;
  return base * S.qty;
}
function fmt(n){ return '$'+n.toLocaleString('en-US'); }

function updatePrice(){
  const base=getBasePrice();
  const lines=document.getElementById('price-lines');
  if(!lines) return;
  const f=fab();
  let rows=[];
  if(base) rows.push(['Base ('+f.name+' '+f.color+' — Grp '+f.grp+')', fmt(base)]);
  if(S.cassWrap) rows.push(['Square cassette fabric wrap','+$80']);
  if(S.bbWrap){ const p=getBBWrapPrice(); if(p) rows.push(['Bottom bar fabric wrap','+'+fmt(p)]); }
  if(S.control==='cordless') rows.push(['Cordless upgrade','+$192']);
  if(S.control==='prowand') rows.push(['Pro Wand motor','+$232']);
  if(S.control==='remote') rows.push(['Remote motor','+$460']);
  if(S.metalChain) rows.push(['Metal bead chain','+$62']);
  if(S.liftAssist) rows.push(['Lift assist pole','+$80']);
  if(S.remote) rows.push(['15-ch remote','+$111']);
  if(S.wallSwitch) rows.push(['15-ch wall switch','+$114']);
  if(S.hub) rows.push(['Pro Hub','+$458']);
  if(S.liPack) rows.push(['LI rechargeable battery pack','+$160']);
  if(S.plugAdapter) rows.push(['Plug-in power adapter','+$60']);
  if(S.ext6) rows.push(['6" extension cable ×'+S.ext6,'+'+fmt(S.ext6*32)]);
  if(S.ext48) rows.push(['48" extension cable ×'+S.ext48,'+'+fmt(S.ext48*43)]);
  if(S.ext96) rows.push(['96" extension cable ×'+S.ext96,'+'+fmt(S.ext96*60)]);
  if(S.charger) rows.push(['16½\' charger','+$83']);
  lines.innerHTML=rows.map(r=>'<div class="price-line"><span>'+r[0]+'</span><span>'+r[1]+'</span></div>').join('');
  const total=calcTotal();
  document.getElementById('total-display').textContent=total?fmt(total):'—';
  document.getElementById('qty-display').textContent=S.qty;
}

/* ── STEP NAVIGATION ── */
function showStep(n){
  if(n>S.maxStep) S.maxStep=n;
  const el=document.getElementById('s'+n);
  if(el){ el.classList.add('active'); el.classList.remove('done'); el.scrollIntoView({behavior:'smooth',block:'nearest'}); }
}
function doneStep(n,label){
  const el=document.getElementById('s'+n);
  if(!el) return;
  el.classList.add('done'); el.classList.remove('active');
  const d=document.getElementById('d'+n);
  if(d) d.textContent=label;
}
function editStep(n){
  // Re-activate this step, hide all later steps
  for(let i=n;i<=12;i++){
    const el=document.getElementById('s'+i);
    if(!el) continue;
    if(i===n){ el.classList.add('active'); el.classList.remove('done'); }
    else { el.classList.remove('active','done'); }
  }
  S.maxStep=n;
}
function pickDelivery(v,card){
  document.querySelectorAll('.delivery-opt-card').forEach(function(c){c.classList.remove('sel');});
  card.classList.add('sel');
  S.delivery=v==='ship'?'Ship (UPS/FedEx)':'Pickup (Huntingdon Valley PA 19006)';
}
function advance(fromStep, label){
  doneStep(fromStep, label);
  showStep(fromStep+1);
}

/* ── STEP 1: Window measurements & mount ── */
function pickMount(m,el){
  S.mount=m;
  document.querySelectorAll('#mount-opts .opt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  const note=document.getElementById('dim-note-mount');
  if(note) note.textContent=
    m==='inside'?'Inside mount: enter the window opening size. A ¼" deduction will be made to the shade width.':
    'Outside mount: enter the desired finished shade width and height.';
}
function dimChanged(){
  const w=parseFloat(document.getElementById('inp-w').value)||0;
  const h=parseFloat(document.getElementById('inp-h').value)||0;
  const we=document.getElementById('w-err');
  const he=document.getElementById('h-err');
  if(we) we.classList.remove('show');
  if(he) he.classList.remove('show');
  if(w>0 && w>110){ we.textContent='Maximum width is 110". Please adjust.'; we.classList.add('show'); }
  else if(w>0 && w<16){ we.textContent='Minimum width is 16".'; we.classList.add('show'); }
  if(h>0 && h>108){ he.textContent='Maximum height is 108".'; he.classList.add('show'); }
  else if(h>0 && h<20){ he.textContent='Minimum height is 20".'; he.classList.add('show'); }
  updatePrice();
}
function confirmStep1(){
  const w=parseFloat(document.getElementById('inp-w').value)||0;
  const h=parseFloat(document.getElementById('inp-h').value)||0;
  if(!w||!h){ alert('Please enter both width and height.'); return; }
  if(w<16){ alert('Minimum width is 16".'); return; }
  if(w>110){ alert('Maximum width is 110".'); return; }
  if(h<20){ alert('Minimum height is 20".'); return; }
  if(h>108){ alert('Maximum height is 108".'); return; }
  if(!S.mount){ alert('Please select a mount type (inside or outside).'); return; }
  S.width=w; S.height=h;
  S.qty=parseInt(document.getElementById('qty-inp').value)||1;
  // Cordless availability based on dims
  const ctrl=document.getElementById('ctrl-cordless');
  if(ctrl){ if(w>96||h>99){ ctrl.classList.add('disabled'); if(S.control==='cordless') S.control=null; } else ctrl.classList.remove('disabled'); }
  // Bottom bar wrap price display (fabric-independent, width-based)
  const wi=W_COLS.findIndex(c=>w<=c);
  const bbp=wi>=0?BB_WRAP_PRICES[wi]:0;
  const bbEl=document.getElementById('bb-wrap-price'); if(bbEl) bbEl.textContent='(+'+fmt(bbp)+')';
  advance(1, w+'" W × '+h+'" H · '+(S.mount==='inside'?'Inside':'Outside')+' mount · Qty '+S.qty);
  updatePrice();
}

/* ── STEP 2: Type ── */
function pickType(t,el){
  S.type=t;
  document.querySelectorAll('.type-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  buildFabricGrid(t);
  advance(2, t==='LF'?'Light-Filtering':'Blackout');
}

/* ── STEP 3: Fabric Grid ── */
function buildFabricGrid(type){
  const grid=document.getElementById('fabric-grid');
  // Consistent shared color picker: families grouped into price-group sections.
  // Colors/codes come straight from FABRICS — nothing changed, only presentation.
  if(window.pbFabricPicker){
    var COMP_HEX={white:'#f4f1ea',beige:'#e3d5bd',gray:'#9a9a9a',bronze:'#8a6d43',black:'#2a2a2a'};
    var byFam={};
    FABRICS.filter(function(f){return f.type===type;}).forEach(function(f){
      if(!byFam[f.name]) byFam[f.name]={grp:f.grp, colors:[]};
      byFam[f.name].colors.push({n:f.color, c:f.code, hex:COMP_HEX[f.comp.toLowerCase()]||''});
    });
    var collections=Object.keys(byFam).sort().map(function(name){
      var isTory=name==='Tory';
      return {
        type:type, pg:byFam[name].grp,
        name: isTory ? name+' ⚠ Large bottom bar required — no cordless or square bottom bar' : name,
        colors:byFam[name].colors
      };
    });
    pbFabricPicker.render('fabric-grid', {
      hideTabs:true, showPriceGroups:true,
      types:[{key:type, label:(type==='LF'?'Light Filtering':'Blackout')}],
      collections:collections,
      onSelect:function(sel){ pickFabric(sel.code); }
    });
    // Restore highlight if the current selection belongs to this type
    if(S.fabricCode){ var cur=fab(); if(cur && cur.type===type){ grid.querySelectorAll('.pbfp-sw').forEach(function(b){ if(b.title===S.fabricCode) b.classList.add('sel'); }); } }
    if(type==='RD'){ var n=document.createElement('div'); n.className='step-note'; n.style.marginTop='8px'; n.textContent='All Blackout fabrics include a large bottom bar.'; grid.appendChild(n); }
    return;
  }
  // Fallback — original rendering (component unavailable)
  const patterns={};
  FABRICS.filter(f=>f.type===type).forEach(f=>{
    if(!patterns[f.name]) patterns[f.name]={grp:f.grp, colors:[]};
    patterns[f.name].colors.push(f);
  });
  let html='';
  Object.keys(patterns).sort().forEach(pname=>{
    const p=patterns[pname];
    const isTory=pname==='Tory';
    html+='<div class="pattern-row"><div class="pattern-name-bar">'+pname+' <span class="pattern-grp-badge">Group '+p.grp+'</span></div>';
    html+='<div class="color-chips">';
    p.colors.forEach(f=>{
      const dot='dot-'+f.comp.toLowerCase();
      html+='<button class="color-chip" id="chip-'+f.code+'" onclick="pickFabric(\''+f.code+'\')">';
      html+='<span class="color-dot '+dot+'"></span>'+f.color+'</button>';
    });
    html+='</div>';
    if(isTory) html+='<div class="tory-note">* Tory requires a large bottom bar. Not available with cordless or square bottom bar.</div>';
    html+='</div>';
  });
  if(type==='RD') html+='<div class="step-note" style="margin-top:8px">All Blackout fabrics include a large bottom bar.</div>';
  grid.innerHTML=html;
}
function pickFabric(code){
  S.fabricCode=code;
  const f=fab();
  document.querySelectorAll('.color-chip').forEach(c=>c.classList.remove('sel'));
  const chip=document.getElementById('chip-'+code);
  if(chip) chip.classList.add('sel');
  // Update cassette color recommendation
  const rec=document.getElementById('rec-comp-color');
  if(rec) rec.textContent=f.comp;
  // Re-check ordered width against this fabric's max (dims are entered in Step 1)
  if(S.width && S.width>f.maxW){
    alert('Note: '+f.name+' has a maximum width of '+f.maxW+'". Your width '+S.width+'" exceeds it — please Edit Step 1 to adjust.');
  }
  advance(3, f.name+' — '+f.color+' ('+f.code+') · Grp '+f.grp);
}

/* ── STEP 4: Cassette ── */
function pickCassette(v,el){
  S.cassette=v;
  document.querySelectorAll('#s4 .opt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  advance(4, v==='rounded'?'Rounded cassette':'Square cassette');
  // Skip step 6 (wrap) if rounded
  if(v==='rounded'){
    S.cassWrap=false;
    document.getElementById('s6').classList.remove('active','done');
  }
}

/* ── STEP 5: Cassette Color ── */
function pickCassColor(v,el){
  S.cassColor=v;
  document.querySelectorAll('.color-circle-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  const label=v.charAt(0).toUpperCase()+v.slice(1);
  if(S.cassette==='square'){
    advance(5, label);
  } else {
    doneStep(5, label);
    // Skip step 6 (wrap) for rounded, go to step 7 (bottom bar)
    showStep(7);
    applyBBRules();
  }
}

/* ── STEP 6: Cassette Wrap ── */
function pickCassWrap(v,el){
  S.cassWrap=v;
  document.querySelectorAll('#s6 .opt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  advance(6, v?'Fabric wrapped (+$80)':'Unwrapped');
  applyBBRules();
}

/* ── STEP 7: Bottom Bar ── */
function applyBBRules(){
  const f=fab(); if(!f) return;
  const isRD=f.type==='RD';
  const isTory=!!f.tory;
  S.bbLarge = isRD || isTory;
  const warn=document.getElementById('bb-large-warn');
  if(S.bbLarge){ warn.style.display='block'; warn.textContent=(isRD?'Blackout fabrics':'Tory fabrics')+' require a large bottom bar. It is automatically included.'; }
  else warn.style.display='none';
  // If cordless selected later, square BB not available
  const sqBtn=document.getElementById('bb-sq-btn');
  if(isTory){ sqBtn.classList.add('disabled'); }
  else sqBtn.classList.remove('disabled');
  showStep(7);
}
function pickBBStyle(v,el){
  S.bbStyle=v;
  document.querySelectorAll('#bb-style-opts .opt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  updatePrice();
}
function pickBBWrap(v,el){
  S.bbWrap=v;
  document.querySelectorAll('#s7 [onclick^="pickBBWrap"]').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  const bbStyle=S.bbStyle||'rounded';
  const bbSz=S.bbLarge?'large':'standard';
  advance(7, (bbStyle.charAt(0).toUpperCase()+bbStyle.slice(1))+' '+bbSz+(v?' — fabric wrapped':''));
  updatePrice();
  // Apply cordless BB square block if needed
  showStep(8);
  const f=fab();
  const cordlessBtn=document.getElementById('ctrl-cordless');
  if(f&&f.tory){ cordlessBtn.classList.add('disabled'); document.getElementById('cordless-tory-warn').classList.add('show'); }
  else { cordlessBtn.classList.remove('disabled'); document.getElementById('cordless-tory-warn').classList.remove('show'); }
}

/* ── STEP 8: Control ── */
function pickControl(v,el){
  S.control=v;
  document.querySelectorAll('#control-opts .opt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  // Update BB square availability for cordless (square bottom bar not available on cordless)
  const sqBtn=document.getElementById('bb-sq-btn');
  if(v==='cordless'){
    sqBtn.classList.add('disabled');
    if(S.bbStyle==='square'){                       // revert a now-unavailable square selection
      S.bbStyle='rounded';
      document.querySelectorAll('#bb-style-opts .opt-btn').forEach(b=>b.classList.remove('sel'));
      var _rb=document.querySelector('#bb-style-opts .opt-btn[onclick*="rounded"]'); if(_rb) _rb.classList.add('sel');
    }
  } else {
    var _f=fab();
    if(!(_f&&_f.tory)) sqBtn.classList.remove('disabled');   // re-enable unless a Tory fabric blocks square
  }
  buildControlOptions(v);
  const labels={clutch:'Clutch (beaded chain)',cordless:'Cordless (+$192)',prowand:'Pro Wand (+$232)',remote:'Remote Motor (+$460)'};
  advance(8, labels[v]);
  updatePrice();
}

/* ── STEP 9: Control Options ── */
function buildControlOptions(ctrl){
  const title=document.getElementById('s9-title');
  const body=document.getElementById('s9-body');
  if(ctrl==='clutch'){
    title.textContent='Clutch Options';
    const cordLens=['19½"','29½"','39"','49"','59"','69"','79"','89"','98"'];
    body.innerHTML='<div class="step-sub" style="margin-bottom:8px;font-size:12px;font-weight:600;color:#555">Cord Loop Length <span style="font-size:11px;font-weight:400;color:#999">(standard = closest to ¾ shade height)</span></div>'+
      '<div class="opt-row" id="cord-len-opts">'+cordLens.map(l=>'<button class="opt-btn opt-btn-sm" onclick="pickCordLen(\''+l+'\',this)">'+l+'</button>').join('')+'</div>'+
      '<div style="margin-top:14px"><label class="check-row"><input type="checkbox" onchange="S.metalChain=this.checked;updatePrice()"><div class="check-label">Metal bead chain upgrade <span class="check-price">+$62</span><div class="check-sub">Custom length metal bead chain instead of standard plastic</div></div></label></div>'+
      '<button class="next-btn" onclick="confirmStep10Clutch()" style="margin-top:12px">Continue</button>';
  } else if(ctrl==='cordless'){
    title.textContent='Cordless Options';
    body.innerHTML='<div class="step-note">Cordless shades are raised/lowered by hand. A handle is included. Bottom bar will be a cordless style (rounded).</div>'+
      '<label class="check-row"><input type="checkbox" onchange="S.liftAssist=this.checked;updatePrice()"><div class="check-label">Add Lift Assist Pole <span class="check-price">+$80</span><div class="check-sub">Telescoping pole to 53" helps raise and lower cordless shades</div></div></label>'+
      '<button class="next-btn" onclick="confirmStep10Cordless()" style="margin-top:12px">Continue</button>';
  } else if(ctrl==='prowand'){
    title.textContent='Pro Wand Options';
    body.innerHTML='<div class="step-sub" style="margin-bottom:8px;font-size:12px;font-weight:600;color:#555">Wand Length <span style="font-size:11px;font-weight:400;color:#999">(White only)</span></div>'+
      '<div class="opt-row" id="wand-len-opts">'+['24"','36"','48"','60"'].map(l=>'<button class="opt-btn opt-btn-lg" onclick="pickWandLen(\''+l+'\',this)">'+l+'</button>').join('')+'</div>'+
      '<button class="next-btn" onclick="confirmStep10Wand()" style="margin-top:12px">Continue</button>';
  } else if(ctrl==='remote'){
    title.textContent='Remote Motor Type';
    body.innerHTML='<div class="step-note">All remote motor styles include standard lift. Choose power supply type.</div>'+
      '<div class="opt-row" id="motor-type-opts">'+
      '<button class="opt-btn opt-btn-lg" onclick="pickMotorType(\'li\',this)"><strong style="display:block">Rechargeable LI</strong><span style="font-size:11px;color:#888">Internal battery · 16½\' USB-C charger included</span></button>'+
      '<button class="opt-btn opt-btn-lg" onclick="pickMotorType(\'dc\',this)"><strong style="display:block">12V DC Hardwired</strong><span style="font-size:11px;color:#888">Hardwired · 13" lead wire · 8" wire harness incl.</span></button>'+
      '<button class="opt-btn opt-btn-lg" onclick="pickMotorType(\'dc-ext\',this)"><strong style="display:block">12V DC External</strong><span style="font-size:11px;color:#888">Battery tube (incl.) · LI battery pack or plug adapter</span></button>'+
      '<button class="opt-btn opt-btn-lg" onclick="pickMotorType(\'ac\',this)"><strong style="display:block">100-240V AC</strong><span style="font-size:11px;color:#888">Hardwired · 43" lead wire · Requires electrician</span></button>'+
      '</div>'+
      '<button class="next-btn" onclick="confirmStep10Motor()" style="margin-top:12px">Continue</button>';
  }
  showStep(9);
}

function pickCordLen(v,el){ S.cordLen=v; document.querySelectorAll('#cord-len-opts .opt-btn').forEach(b=>b.classList.remove('sel')); el.classList.add('sel'); }
function pickWandLen(v,el){ S.wandLen=v; document.querySelectorAll('#wand-len-opts .opt-btn').forEach(b=>b.classList.remove('sel')); el.classList.add('sel'); }
function pickMotorType(v,el){ S.motorType=v; document.querySelectorAll('#motor-type-opts .opt-btn').forEach(b=>b.classList.remove('sel')); el.classList.add('sel'); }

function confirmStep10Clutch(){
  const lbl=(S.cordLen||'Standard length')+(S.metalChain?' · Metal chain':'');
  advance(9, lbl);
  skipS11();
}
function confirmStep10Cordless(){
  advance(9, 'Cordless'+(S.liftAssist?' · Lift assist':''));
  skipS11();
}
function confirmStep10Wand(){
  if(!S.wandLen){ alert('Please select a wand length.'); return; }
  advance(9, 'Pro Wand · '+S.wandLen);
  skipS11();
}
function confirmStep10Motor(){
  if(!S.motorType){ alert('Please select a motor type.'); return; }
  const labels={li:'Rechargeable LI',dc:'12V DC Hardwired','dc-ext':'12V DC External Power',ac:'100-240V AC Hardwired'};
  advance(9, labels[S.motorType]);
  buildMotorAccessories();
}

/* ── STEP 10: Motor Accessories ── */
function buildMotorAccessories(){
  const body=document.getElementById('s10-body');
  const t=S.motorType;
  let html='<div class="step-note">Select any additional accessories for your motor. Shades will operate without a remote (smart button on shade). Remotes and hub are optional upgrades.</div>';
  html+='<div style="margin-bottom:14px">';
  html+='<label class="check-row"><input type="checkbox" onchange="S.remote=this.checked;updatePrice()"><div class="check-label">15-Channel Hand-Held Remote <span class="check-price">+$111</span><div class="check-sub">White or black (specify in notes)</div></div></label>';
  html+='<label class="check-row"><input type="checkbox" onchange="S.wallSwitch=this.checked;updatePrice()"><div class="check-label">15-Channel Wall Switch <span class="check-price">+$114</span></div></label>';
  html+='<label class="check-row"><input type="checkbox" onchange="S.hub=this.checked;updatePrice()"><div class="check-label">Pro Hub <span class="check-price">+$458</span><div class="check-sub">WiFi / ethernet — works with Alexa, Google Home, Control4, IFTTT</div></div></label>';
  html+='</div>';
  if(t==='li'){
    html+='<div class="step-note" style="margin-top:4px">Rechargeable LI includes internal battery. A 16½\' USB-C charger is included. No additional power supply needed.</div>';
    html+='<label class="check-row"><input type="checkbox" onchange="S.charger=this.checked;updatePrice()"><div class="check-label">Extra 16½\' USB-C Charger <span class="check-price">+$83</span></div></label>';
  }
  if(t==='dc-ext'){
    html+='<div class="step-sub" style="margin-top:12px;margin-bottom:8px;font-size:12px;font-weight:600;color:#555">Power Supply (choose one or both)</div>';
    html+='<label class="check-row"><input type="checkbox" onchange="S.liPack=this.checked;updatePrice()"><div class="check-label">External LI Rechargeable Battery Pack <span class="check-price">+$160</span><div class="check-sub">5¼" lead wire · Requires recharging · Ships separately</div></div></label>';
    html+='<label class="check-row"><input type="checkbox" onchange="S.plugAdapter=this.checked;updatePrice()"><div class="check-label">Plug-In Power Adapter <span class="check-price">+$60</span><div class="check-sub">60" lead wire · Powers motor via standard outlet</div></div></label>';
    html+='<div class="step-sub" style="margin-top:12px;margin-bottom:8px;font-size:12px;font-weight:600;color:#555">Extension Cables</div>';
    html+=extRow('ext6','6" Extension Cable (+$32 ea)','For LI battery pack',32,'ext6');
    html+=extRow('ext48','48" Extension Cable (+$43 ea)','For LI battery pack or power adapter',43,'ext48');
    html+=extRow('ext96','96" Extension Cable (+$60 ea)','For power adapter only',60,'ext96');
    html+='<label class="check-row"><input type="checkbox" onchange="S.charger=this.checked;updatePrice()"><div class="check-label">16½\' USB-C Charger <span class="check-price">+$83</span><div class="check-sub">For LI battery pack</div></div></label>';
  }
  html+='<button class="next-btn" onclick="confirmStep11()" style="margin-top:12px">Continue</button>';
  body.innerHTML=html;
  showStep(10);
}
function extRow(id,label,sub,price,stateKey){
  return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px"><div class="qty-wrap"><button class="qty-btn" onclick="adjExt(\''+stateKey+'\',-1,\''+id+'\')">−</button><input class="qty-num" type="number" id="'+id+'" value="0" min="0" max="10" style="width:36px;height:30px" oninput="S[\''+stateKey+'\']=parseInt(this.value)||0;updatePrice()"><button class="qty-btn" onclick="adjExt(\''+stateKey+'\',1,\''+id+'\')">+</button></div><div><div class="check-label" style="font-size:12px">'+label+'</div><div class="check-sub">'+sub+'</div></div></div>';
}
function adjExt(key,delta,id){ const el=document.getElementById(id); if(!el) return; let v=parseInt(el.value)||0; v=Math.max(0,v+delta); el.value=v; S[key]=v; updatePrice(); }

function confirmStep11(){
  let parts=['Motor accessories'];
  if(S.remote) parts.push('Remote');
  if(S.wallSwitch) parts.push('Wall switch');
  if(S.hub) parts.push('Pro Hub');
  advance(10, parts.join(' · '));
}

function skipS11(){
  document.getElementById('s10').classList.remove('active','done');
  showStep(11);
}

/* ── STEP 11: SBS ── */
function pickSBS(v,el){
  S.sbs=v;
  document.querySelectorAll('#s11 .opt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  document.getElementById('sbs-count-wrap').style.display=v?'block':'none';
  if(!v){ advance(11,'No — independent shades'); showStep(12); updatePrice(); }
}
function adjSBS(d){ const el=document.getElementById('sbs-count'); let v=Math.max(2,Math.min(10,(parseInt(el.value)||2)+d)); el.value=v; S.sideCount=v; }

function adjQty(d){ const el=document.getElementById('qty-inp'); let v=Math.max(1,Math.min(50,(parseInt(el.value)||1)+d)); el.value=v; S.qty=v; updatePrice(); }

/* ── SBS confirm button (inject after SBS opt-row) ── */
(function(){
  const s11body=document.querySelector('#s11 .step-body');
  if(s11body){
    const btn=document.createElement('button');
    btn.className='next-btn';
    btn.style.marginTop='12px';
    btn.textContent='Continue to Quote';
    btn.onclick=function(){
      if(S.sbs){ S.sideCount=parseInt(document.getElementById('sbs-count').value)||2; advance(11,'Side-by-side · '+S.sideCount+' shades'); }
      else advance(11,'Independent');
      showStep(12);
      updatePrice();
    };
    s11body.appendChild(btn);
  }
})();

/* ── SUBMIT ── */
function addPortfolioDualSheerToCart(){
  const f=fab();
  if(!f){ alert('Please select a fabric before adding to cart.'); return; }
  if(!S.width||!S.height){ alert('Please enter dimensions before adding to cart.'); return; }
  if(!S.control){ alert('Please select a control type before adding to cart.'); return; }

  const totalEl=document.getElementById('total-display');
  const priceText=totalEl?totalEl.textContent.trim():'';
  const price=priceText?parseFloat(priceText.replace(/[^0-9.]/g,''))||null:null;

  const ctrlLabel=S.control==='clutch'?'Clutch (beaded chain)':S.control==='cordless'?'Cordless (+$192)':S.control==='prowand'?'Pro Wand (+$232)':'Remote Motor (+$460)';
  const lines=[
    {label:'Product',value:'Wallace Portfolio Collection™ Dual Sheer Shades'},
    {label:'Fabric Type',value:f.type==='LF'?'Light-Filtering':'Blackout'},
    {label:'Pattern',value:f.name},
    {label:'Color',value:f.color},
    {label:'Code',value:f.code},
    {label:'Price Group',value:f.grp},
    {label:'Width',value:S.width+'"'},
    {label:'Height',value:S.height+'"'},
    {label:'Mount',value:S.mount==='inside'?'Inside mount':'Outside mount'},
    {label:'Cassette',value:S.cassette||'—'},
    {label:'Control',value:ctrlLabel},
    {label:'Quantity',value:String(S.qty||1)}
  ];
  const specs=lines.map(l=>l.label+': '+l.value).join(' | ');
  pbAddToCart({product:'Wallace Portfolio Collection™ Dual Sheer Shades',lines:lines,specs:specs,price:price,qty:S.qty||1});
  pbOpenCart();
}

function submitQuote(){
  const f=fab();
  if(!f){ alert('Please complete all steps before submitting.'); return; }
  const name=(document.getElementById('cf-name').value||'').trim();
  const phone=(document.getElementById('cf-phone').value||'').trim();
  const email=(document.getElementById('cf-email').value||'').trim();
  const notes=(document.getElementById('cf-notes').value||'').trim();
  const lines=[
    '=== PORTFOLIO COLLECTION™ DUAL SHEER SHADE QUOTE REQUEST ===',
    '',
    'FABRIC',
    'Type: '+(f.type==='LF'?'Light-Filtering':'Blackout'),
    'Pattern: '+f.name,
    'Color: '+f.color,
    'Code: '+f.code,
    'Price Group: '+f.grp,
    'Band size: '+f.band+' fabric / '+f.sheer+' sheer',
    '',
    'DIMENSIONS',
    'Width: '+S.width+'"',
    'Height: '+S.height+'"',
    'Mount: '+(S.mount==='inside'?'Inside mount (¼" deducted from width)':'Outside mount'),
    (S.mount==='inside'?'Ordered shade width: '+(S.width-0.25)+'"':''),
    '',
    'CASSETTE & BOTTOM BAR',
    'Cassette: '+S.cassette+(S.cassette==='rounded'?' (fabric insert standard)':''),
    'Cassette color: '+(S.cassColor||'—'),
    (S.cassette==='square'?'Cassette wrap: '+(S.cassWrap?'Fabric wrapped (+$80)':'Unwrapped'):''),
    'Bottom bar: '+(S.bbStyle||'rounded')+(S.bbLarge?' (large — required)':' (standard)'),
    'Bottom bar wrap: '+(S.bbWrap?'Fabric wrapped (+'+fmt(getBBWrapPrice())+')':'Unwrapped'),
    '',
    'CONTROL',
    'Type: '+(S.control==='clutch'?'Clutch (beaded chain)':S.control==='cordless'?'Cordless (+$192)':S.control==='prowand'?'Pro Wand (+$232)':'Remote Motor (+$460)'),
    S.control==='clutch'?'Cord length: '+(S.cordLen||'Standard')+(S.metalChain?' · Metal bead chain (+$62)':''):'',
    S.control==='cordless'?'Lift assist pole: '+(S.liftAssist?'Yes (+$80)':'No'):'',
    S.control==='prowand'?'Wand length: '+(S.wandLen||'—')+' (White)':'',
    S.control==='remote'?'Motor type: '+({'li':'Rechargeable LI','dc':'12V DC Hardwired','dc-ext':'12V DC External Power','ac':'100-240V AC Hardwired'}[S.motorType]||'—'):'',
    (S.control==='remote'&&S.remote)?'15-ch hand-held remote: Yes (+$111)':'',
    (S.control==='remote'&&S.wallSwitch)?'15-ch wall switch: Yes (+$114)':'',
    (S.control==='remote'&&S.hub)?'Pro Hub: Yes (+$458)':'',
    (S.control==='remote'&&S.liPack)?'LI battery pack: Yes (+$160)':'',
    (S.control==='remote'&&S.plugAdapter)?'Plug-in power adapter: Yes (+$60)':'',
    (S.control==='remote'&&S.ext6)?'6" extension cables: '+S.ext6+' (+'+fmt(S.ext6*32)+')':'',
    (S.control==='remote'&&S.ext48)?'48" extension cables: '+S.ext48+' (+'+fmt(S.ext48*43)+')':'',
    (S.control==='remote'&&S.ext96)?'96" extension cables: '+S.ext96+' (+'+fmt(S.ext96*60)+')':'',
    (S.control==='remote'&&S.charger)?'16½\' charger: Yes (+$83)':'',
    '',
    'ORDER DETAILS',
    'Quantity: '+S.qty,
    S.sbs?'Side-by-side: Yes · '+S.sideCount+' shades (same fabric, control, and length)':'Side-by-side: No',
    'Delivery: '+S.delivery,
    '',
    'ESTIMATE',
    'Unit base (Grp '+f.grp+'): '+fmt(getBasePrice()),
    'Est. total (×'+S.qty+'): '+fmt(calcTotal()),
    'Note: Estimated retail per 2026 Wallace Blinds price book. Final pricing confirmed at order. Freight not included.',
    '',
    'CONTACT',
    'Name: '+name,
    'Phone: '+phone,
    'Email: '+email,
    'Notes: '+notes,
    '',
    '=== END QUOTE REQUEST ==='
  ].filter(l=>l!=='').join('\n');

  const sub='Portfolio Dual Sheer Quote — '+f.name+' '+f.color+' '+S.width+'"×'+S.height+'"';
  window.location.href='mailto:blindznation@gmail.com?subject='+encodeURIComponent(sub)+'&body='+encodeURIComponent(lines);
}
