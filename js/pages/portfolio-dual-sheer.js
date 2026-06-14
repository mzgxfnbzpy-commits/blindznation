renderNav('Portfolio Dual Sheer Shades');
renderFooter(false);

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
  {code:'BY04',name:'Bryson',color:'Almond',type:'LF',grp:'D',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'White'},
  {code:'BY02',name:'Bryson',color:'Bark',type:'LF',grp:'D',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Bronze'},
  {code:'BY01',name:'Bryson',color:'Beige',type:'LF',grp:'D',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Beige'},
  {code:'BY03',name:'Bryson',color:'Canvas',type:'LF',grp:'D',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Beige'},
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
  {code:'KN04',name:'Kane',color:'Almond',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'White'},
  {code:'KN02',name:'Kane',color:'Bark',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Bronze'},
  {code:'KN01',name:'Kane',color:'Beige',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Beige'},
  {code:'KN03',name:'Kane',color:'Gray',type:'RD',grp:'E',maxW:108,maxH:108,band:'4"',sheer:'2¾"',comp:'Gray'},
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

const PRICES = {
  A:[
    [229,246,263,281,297,315,344,366,387,451,516,580],
    [240,260,281,301,320,361,401,426,451,526,601,676],
    [252,275,297,320,367,412,459,488,516,601,686,773],
    [263,289,315,361,412,464,516,549,580,676,773,869],
    [275,304,344,401,459,516,573,609,645,752,859,966],
    [286,318,379,441,504,567,630,671,708,827,944,1063],
    [297,344,412,482,550,619,687,731,773,902,1031,1160],
    [309,372,447,521,596,670,745,792,837,977,1116,1256],
    [320,401,482,562,641,722,802,854,902,1051,1202,1352],
    [344,430,516,601,687,773,859,914,966,1127,1289,1449],
    [367,459,550,641,732,825,916,976,1031,1202,1374,1545],
    [412,516,619,722,825,928,1031,1096,1160,1352,1545,1739]
  ],
  B:[
    [277,294,312,329,346,363,395,421,445,519,594,668],
    [288,309,329,349,369,416,462,492,519,606,692,779],
    [300,323,346,369,422,474,527,562,594,692,791,890],
    [312,337,363,416,474,534,594,631,668,779,890,1000],
    [323,352,395,462,527,594,659,702,742,865,989,1113],
    [335,366,435,509,580,653,725,772,815,952,1088,1224],
    [346,395,474,554,633,711,791,842,890,1038,1187,1334],
    [358,428,515,600,686,772,857,912,964,1124,1285,1446],
    [369,462,554,647,738,831,924,983,1038,1212,1384,1557],
    [395,495,594,693,791,889,989,1052,1113,1298,1483,1668],
    [422,527,633,738,843,950,1056,1122,1187,1384,1582,1779],
    [474,594,711,831,950,1068,1187,1264,1334,1557,1779,2002]
  ],
  C:[
    [324,342,361,380,398,417,422,465,491,572,654,735],
    [337,358,380,401,423,475,493,542,572,668,762,858],
    [348,373,398,423,483,543,564,620,654,762,872,981],
    [361,389,417,475,543,610,633,697,735,858,981,1102],
    [373,405,452,528,603,678,703,774,817,954,1089,1225],
    [386,420,498,580,664,747,774,852,899,1048,1198,1348],
    [398,452,543,633,724,814,844,929,981,1143,1306,1470],
    [411,491,589,686,784,882,914,1006,1062,1239,1415,1592],
    [423,528,633,738,844,950,985,1083,1143,1334,1525,1715],
    [452,566,678,791,905,1017,1056,1161,1225,1430,1634,1838],
    [483,603,724,844,965,1086,1125,1238,1306,1525,1742,1960],
    [543,678,814,950,1086,1221,1267,1393,1470,1715,1960,2205]
  ],
  D:[
    [402,421,440,458,476,495,537,570,601,701,802,902],
    [415,437,458,479,501,564,626,666,701,818,935,1051],
    [427,451,476,501,573,644,716,760,802,935,1068,1202],
    [440,467,495,564,644,725,805,855,902,1051,1202,1352],
    [451,483,537,626,716,805,894,951,1002,1169,1335,1502],
    [464,498,591,690,787,885,984,1045,1101,1285,1468,1653],
    [476,537,644,752,859,966,1073,1140,1202,1402,1602,1802],
    [489,582,698,814,930,1046,1163,1234,1302,1519,1736,1952],
    [501,626,752,877,1002,1127,1252,1330,1402,1635,1869,2103],
    [537,671,805,939,1073,1207,1341,1424,1502,1752,2002,2253],
    [573,716,859,1002,1145,1288,1431,1519,1602,1869,2136,2403],
    [644,805,966,1127,1288,1449,1609,1710,1802,2103,2403,2703]
  ],
  E:[
    [486,502,520,538,554,572,620,658,697,812,929,1063],
    [497,517,538,557,578,650,722,769,812,948,1083,1240],
    [509,531,554,578,660,743,826,879,929,1083,1238,1418],
    [520,546,572,650,743,836,929,988,1044,1219,1393,1594],
    [531,561,620,722,826,929,1032,1098,1161,1353,1548,1772],
    [543,575,681,795,908,1021,1135,1207,1276,1489,1701,1948],
    [554,620,743,866,990,1114,1238,1317,1393,1623,1856,2126],
    [566,671,805,939,1072,1206,1341,1427,1508,1760,2010,2302],
    [578,722,866,1011,1155,1300,1444,1537,1623,1895,2165,2479],
    [620,774,929,1083,1238,1392,1546,1646,1740,2030,2320,2656],
    [660,826,990,1155,1321,1485,1650,1757,1856,2165,2474,2833],
    [743,929,1114,1300,1485,1671,1856,1975,2088,2436,2784,3188]
  ]
};

const BB_WRAP_PRICES = [31,38,47,54,61,69,77,84,92,108,123,138];

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
  delivery:'ship',
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
  for(let i=n;i<=14;i++){
    const el=document.getElementById('s'+i);
    if(!el) continue;
    if(i===n){ el.classList.add('active'); el.classList.remove('done'); }
    else { el.classList.remove('active','done'); }
  }
  S.maxStep=n;
}
function advance(fromStep, label){
  doneStep(fromStep, label);
  showStep(fromStep+1);
}

/* ── STEP 1: Type ── */
function pickType(t,el){
  S.type=t;
  document.querySelectorAll('.type-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  buildFabricGrid(t);
  advance(1, t==='LF'?'Light-Filtering':'Room-Darkening');
}

/* ── STEP 2: Fabric Grid ── */
function buildFabricGrid(type){
  const grid=document.getElementById('fabric-grid');
  // Group by pattern name
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
  if(type==='RD') html+='<div class="step-note" style="margin-top:8px">All room-darkening fabrics include a large bottom bar.</div>';
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
  advance(2, f.name+' — '+f.color+' ('+f.code+') · Grp '+f.grp);
}

/* ── STEP 3: Mount ── */
function pickMount(m,el){
  S.mount=m;
  document.querySelectorAll('#s3 .opt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  // Update dim note
  document.getElementById('dim-note-mount').textContent=
    m==='inside'?'Enter the window opening size. A ¼" deduction will be made to the shade width for inside mount.':
    'Enter the desired shade width and height for outside mount.';
  const f=fab();
  document.getElementById('w-hint').textContent='Max width: '+f.maxW+'" for '+f.name;
  advance(3, m==='inside'?'Inside Mount':'Outside Mount');
}

/* ── STEP 4: Dimensions ── */
function dimChanged(){
  const w=parseFloat(document.getElementById('inp-w').value)||0;
  const h=parseFloat(document.getElementById('inp-h').value)||0;
  const f=fab(); if(!f) return;
  const we=document.getElementById('w-err');
  const he=document.getElementById('h-err');
  we.classList.remove('show'); he.classList.remove('show');
  if(w>0 && w>f.maxW){ we.textContent='Max width for '+f.name+' is '+f.maxW+'". Please adjust.'; we.classList.add('show'); }
  if(w>0 && w<16){ we.textContent='Minimum width is 16".'; we.classList.add('show'); }
  if(h>0 && h>108){ he.textContent='Maximum height is 108".'; he.classList.add('show'); }
  if(h>0 && h<20){ he.textContent='Minimum height is 20".'; he.classList.add('show'); }
  updatePrice();
}
function confirmDims(){
  const w=parseFloat(document.getElementById('inp-w').value)||0;
  const h=parseFloat(document.getElementById('inp-h').value)||0;
  if(!w||!h){ alert('Please enter both width and height.'); return; }
  const f=fab();
  if(w>f.maxW){ alert('Width '+w+'" exceeds '+f.name+' maximum of '+f.maxW+'".'); return; }
  if(w<16){ alert('Minimum width is 16".'); return; }
  if(h>108){ alert('Maximum height is 108".'); return; }
  if(h<20){ alert('Minimum height is 20".'); return; }
  S.width=w; S.height=h;
  // Reset cordless button based on dims
  const ctrl=document.getElementById('ctrl-cordless');
  if(w>96||h>99){ ctrl.classList.add('disabled'); if(S.control==='cordless') S.control=null; }
  else ctrl.classList.remove('disabled');
  // Update BB wrap price display
  const wi=W_COLS.findIndex(c=>w<=c);
  const bbp=wi>=0?BB_WRAP_PRICES[wi]:0;
  document.getElementById('bb-wrap-price').textContent='(+'+fmt(bbp)+')';
  advance(4, w+'" W × '+h+'" H');
  updatePrice();
}

/* ── STEP 5: Cassette ── */
function pickCassette(v,el){
  S.cassette=v;
  document.querySelectorAll('#s5 .opt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  advance(5, v==='rounded'?'Rounded cassette':'Square cassette');
  // Skip step 7 if rounded
  if(v==='rounded'){
    S.cassWrap=false;
    document.getElementById('s7').classList.remove('active','done');
  }
}

/* ── STEP 6: Cassette Color ── */
function pickCassColor(v,el){
  S.cassColor=v;
  document.querySelectorAll('.color-circle-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  const label=v.charAt(0).toUpperCase()+v.slice(1);
  if(S.cassette==='square'){
    advance(6, label);
  } else {
    doneStep(6, label);
    // Skip step 7 (wrap) for rounded, go to step 8
    showStep(8);
    applyBBRules();
  }
}

/* ── STEP 7: Cassette Wrap ── */
function pickCassWrap(v,el){
  S.cassWrap=v;
  document.querySelectorAll('#s7 .opt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  advance(7, v?'Fabric wrapped (+$80)':'Unwrapped');
  applyBBRules();
}

/* ── STEP 8: Bottom Bar ── */
function applyBBRules(){
  const f=fab(); if(!f) return;
  const isRD=f.type==='RD';
  const isTory=!!f.tory;
  S.bbLarge = isRD || isTory;
  const warn=document.getElementById('bb-large-warn');
  if(S.bbLarge){ warn.style.display='block'; warn.textContent=(isRD?'Room-darkening fabrics':'Tory fabrics')+' require a large bottom bar. It is automatically included.'; }
  else warn.style.display='none';
  // If cordless selected later, square BB not available
  const sqBtn=document.getElementById('bb-sq-btn');
  if(isTory){ sqBtn.classList.add('disabled'); }
  else sqBtn.classList.remove('disabled');
  showStep(8);
}
function pickBBStyle(v,el){
  S.bbStyle=v;
  document.querySelectorAll('#bb-style-opts .opt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  updatePrice();
}
function pickBBWrap(v,el){
  S.bbWrap=v;
  document.querySelectorAll('#s8 [onclick^="pickBBWrap"]').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  const bbStyle=S.bbStyle||'rounded';
  const bbSz=S.bbLarge?'large':'standard';
  advance(8, (bbStyle.charAt(0).toUpperCase()+bbStyle.slice(1))+' '+bbSz+(v?' — fabric wrapped':''));
  updatePrice();
  // Apply cordless BB square block if needed
  showStep(9);
  const f=fab();
  const cordlessBtn=document.getElementById('ctrl-cordless');
  if(f&&f.tory){ cordlessBtn.classList.add('disabled'); document.getElementById('cordless-tory-warn').classList.add('show'); }
  else { cordlessBtn.classList.remove('disabled'); document.getElementById('cordless-tory-warn').classList.remove('show'); }
}

/* ── STEP 9: Control ── */
function pickControl(v,el){
  S.control=v;
  document.querySelectorAll('#control-opts .opt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  // Update BB square availability for cordless
  const sqBtn=document.getElementById('bb-sq-btn');
  if(v==='cordless') sqBtn.classList.add('disabled');
  buildControlOptions(v);
  const labels={clutch:'Clutch (beaded chain)',cordless:'Cordless (+$192)',prowand:'Pro Wand (+$232)',remote:'Remote Motor (+$460)'};
  advance(9, labels[v]);
  updatePrice();
}

/* ── STEP 10: Control Options ── */
function buildControlOptions(ctrl){
  const title=document.getElementById('s10-title');
  const body=document.getElementById('s10-body');
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
  showStep(10);
}

function pickCordLen(v,el){ S.cordLen=v; document.querySelectorAll('#cord-len-opts .opt-btn').forEach(b=>b.classList.remove('sel')); el.classList.add('sel'); }
function pickWandLen(v,el){ S.wandLen=v; document.querySelectorAll('#wand-len-opts .opt-btn').forEach(b=>b.classList.remove('sel')); el.classList.add('sel'); }
function pickMotorType(v,el){ S.motorType=v; document.querySelectorAll('#motor-type-opts .opt-btn').forEach(b=>b.classList.remove('sel')); el.classList.add('sel'); }

function confirmStep10Clutch(){
  const lbl=(S.cordLen||'Standard length')+(S.metalChain?' · Metal chain':'');
  advance(10, lbl);
  skipS11();
}
function confirmStep10Cordless(){
  advance(10, 'Cordless'+(S.liftAssist?' · Lift assist':''));
  skipS11();
}
function confirmStep10Wand(){
  if(!S.wandLen){ alert('Please select a wand length.'); return; }
  advance(10, 'Pro Wand · '+S.wandLen);
  skipS11();
}
function confirmStep10Motor(){
  if(!S.motorType){ alert('Please select a motor type.'); return; }
  const labels={li:'Rechargeable LI',dc:'12V DC Hardwired','dc-ext':'12V DC External Power',ac:'100-240V AC Hardwired'};
  advance(10, labels[S.motorType]);
  buildMotorAccessories();
}

/* ── STEP 11: Motor Accessories ── */
function buildMotorAccessories(){
  const body=document.getElementById('s11-body');
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
  showStep(11);
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
  advance(11, parts.join(' · '));
}

function skipS11(){
  document.getElementById('s11').classList.remove('active','done');
  showStep(12);
}

/* ── STEP 12: SBS ── */
function pickSBS(v,el){
  S.sbs=v;
  document.querySelectorAll('#s12 .opt-btn').forEach(b=>b.classList.remove('sel'));
  el.classList.add('sel');
  document.getElementById('sbs-count-wrap').style.display=v?'block':'none';
  if(!v){ advance(12,'No — independent shades'); showStep(13); }
}
function adjSBS(d){ const el=document.getElementById('sbs-count'); let v=Math.max(2,Math.min(10,(parseInt(el.value)||2)+d)); el.value=v; S.sideCount=v; }

// Need next button for SBS=yes
document.addEventListener('DOMContentLoaded',function(){
  const sbsYes=document.querySelector('#s12 .opt-btn:last-of-type');
});

/* ── STEP 13: Quantity ── */
function advanceFromQty(){
  S.qty=parseInt(document.getElementById('qty-inp').value)||1;
  doneStep(13, 'Qty: '+S.qty);
  showStep(14);
  updatePrice();
}
function adjQty(d){ const el=document.getElementById('qty-inp'); let v=Math.max(1,Math.min(50,(parseInt(el.value)||1)+d)); el.value=v; S.qty=v; updatePrice(); }

/* ── SBS confirm button (inject after SBS opt-row) ── */
(function(){
  const s12body=document.querySelector('#s12 .step-body');
  if(s12body){
    const btn=document.createElement('button');
    btn.className='next-btn';
    btn.style.marginTop='12px';
    btn.textContent='Continue';
    btn.onclick=function(){
      if(S.sbs){ S.sideCount=parseInt(document.getElementById('sbs-count').value)||2; advance(12,'Side-by-side · '+S.sideCount+' shades'); }
      else advance(12,'Independent');
      showStep(13);
    };
    s12body.appendChild(btn);
  }
})();

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
    {label:'Fabric Type',value:f.type==='LF'?'Light-Filtering':'Room-Darkening'},
    {label:'Pattern',value:f.name},
    {label:'Color',value:f.color},
    {label:'Code',value:f.code},
    {label:'Price Group',value:f.grp},
    {label:'Width',value:S.width+'"'},
    {label:'Height',value:S.height+'"'},
    {label:'Mount',value:S.mount==='inside'?'Inside Mount':'Outside Mount'},
    {label:'Cassette',value:S.cassette||'—'},
    {label:'Control',value:ctrlLabel},
    {label:'Quantity',value:String(S.qty||1)}
  ];
  const specs=lines.map(l=>l.label+': '+l.value).join(' | ');
  pbAddToCart({product:'Wallace Portfolio Collection™ Dual Sheer Shades',lines:lines,specs:specs,price:price,qty:S.qty||1});
  pbOpenCart();
}

/* ── SUBMIT ── */
function submitQuote(){
  const f=fab();
  if(!f){ alert('Please complete all steps before submitting.'); return; }
  const lines=[
    '=== PORTFOLIO COLLECTION™ DUAL SHEER SHADE QUOTE REQUEST ===',
    '',
    'FABRIC',
    'Type: '+(f.type==='LF'?'Light-Filtering':'Room-Darkening'),
    'Pattern: '+f.name,
    'Color: '+f.color,
    'Code: '+f.code,
    'Price Group: '+f.grp,
    'Band size: '+f.band+' fabric / '+f.sheer+' sheer',
    '',
    'DIMENSIONS',
    'Width: '+S.width+'"',
    'Height: '+S.height+'"',
    'Mount: '+(S.mount==='inside'?'Inside Mount (¼" deducted from width)':'Outside Mount'),
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
    'Name: '+S.name,
    'Phone/Email: '+S.phone,
    'Notes: '+S.notes,
    '',
    '=== END QUOTE REQUEST ==='
  ].filter(l=>l!=='').join('\n');

  const sub='Portfolio Dual Sheer Quote — '+f.name+' '+f.color+' '+S.width+'"×'+S.height+'"';
  window.location.href='mailto:justin@blindznation.com?subject='+encodeURIComponent(sub)+'&body='+encodeURIComponent(lines);
}