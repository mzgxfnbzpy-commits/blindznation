renderNav('Shades & blinds');
renderFooter(false);

var S={prod:'',opacity:'lf',fabric:null,fabFilter:'all',w:0,h:0,ctrl:'',motorType:'std-li',cassColor:'White',cassette:'rounded',qty:1,room:'',del:'ship'};

// ── FABRIC DATA — Portfolio Dual Sheer (Wallace 2026 PDF) ─────────────────────
var FABRICS=[
  // GROUP A — LF
  {code:'AH01',pat:'Asher',color:'Sandstone',g:'A',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#C8B890'},
  {code:'AH02',pat:'Asher',color:'Mineral',  g:'A',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#989898'},
  {code:'AH03',pat:'Asher',color:'Gray',     g:'A',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#888888'},
  {code:'AH04',pat:'Asher',color:'Canyon',   g:'A',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#A86840'},
  {code:'TH11',pat:'Theo', color:'Ice White', g:'A',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#F5F2EE'},
  {code:'TH12',pat:'Theo', color:'White',     g:'A',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#F0EEE8'},
  {code:'TH15',pat:'Theo', color:'Sand',      g:'A',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#D8C890'},
  {code:'TH16',pat:'Theo', color:'Latte',     g:'A',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#C09868'},
  {code:'TH17',pat:'Theo', color:'Chocolate', g:'A',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#704830'},
  {code:'TH21',pat:'Theo', color:'Storm',     g:'A',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#607080'},
  {code:'TH24',pat:'Theo', color:'Gray',      g:'A',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#909090'},
  // GROUP B — LF
  {code:'LE31',pat:'Leigh',color:'Champagne',g:'B',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#E8D898'},
  {code:'LE32',pat:'Leigh',color:'Eggshell', g:'B',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#F0E8D0'},
  {code:'LE34',pat:'Leigh',color:'Clay',     g:'B',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#C09878'},
  {code:'LE37',pat:'Leigh',color:'Mineral',  g:'B',op:'lf',maxW:110,band:'3"',cordless:true,lb:false,hex:'#A0A0A8'},
  // GROUP C — LF
  {code:'AN11',pat:'Albion',color:'Pearl',    g:'C',op:'lf',maxW:108,band:'3-7/16"',cordless:true,lb:false,hex:'#F0ECE4'},
  {code:'AN12',pat:'Albion',color:'Latte',    g:'C',op:'lf',maxW:108,band:'3-7/16"',cordless:true,lb:false,hex:'#C0A880'},
  {code:'AN13',pat:'Albion',color:'Soft Gray',g:'C',op:'lf',maxW:108,band:'3-7/16"',cordless:true,lb:false,hex:'#B0B0B0'},
  {code:'AN14',pat:'Albion',color:'Ice',      g:'C',op:'lf',maxW:108,band:'3-7/16"',cordless:true,lb:false,hex:'#E0EAF0'},
  {code:'AN15',pat:'Albion',color:'Ivory',    g:'C',op:'lf',maxW:108,band:'3-7/16"',cordless:true,lb:false,hex:'#F5EED8'},
  {code:'AN16',pat:'Albion',color:'Khaki',    g:'C',op:'lf',maxW:108,band:'3-7/16"',cordless:true,lb:false,hex:'#C0A870'},
  {code:'AN17',pat:'Albion',color:'Midnight', g:'C',op:'lf',maxW:108,band:'3-7/16"',cordless:true,lb:false,hex:'#282838'},
  {code:'AN18',pat:'Albion',color:'Thunder',  g:'C',op:'lf',maxW:108,band:'3-7/16"',cordless:true,lb:false,hex:'#606070'},
  {code:'AN19',pat:'Albion',color:'Storm',    g:'C',op:'lf',maxW:108,band:'3-7/16"',cordless:true,lb:false,hex:'#708080'},
  {code:'MT01',pat:'Matteo',color:'Slate',    g:'C',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#708090'},
  {code:'MT02',pat:'Matteo',color:'Contrast', g:'C',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#2A2A2A'},
  {code:'MT03',pat:'Matteo',color:'Chiffon',  g:'C',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#E8D8C0'},
  {code:'MT04',pat:'Matteo',color:'Earth',    g:'C',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#988060'},
  {code:'MT05',pat:'Matteo',color:'Soft Gray',g:'C',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#C0C0C0'},
  {code:'MT06',pat:'Matteo',color:'Navy',     g:'C',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#202848'},
  {code:'MT07',pat:'Matteo',color:'Stone',    g:'C',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#A09890'},
  {code:'MT08',pat:'Matteo',color:'White',    g:'C',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#F5F2EE'},
  // GROUP D — LF
  {code:'AI01',pat:'Alaia', color:'Dark Gray',g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#484848'},
  {code:'AI02',pat:'Alaia', color:'Soft Gray',g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#A0A0A0'},
  {code:'AI03',pat:'Alaia', color:'Ice',      g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#E0EAF0'},
  {code:'AL01',pat:'Alessa',color:'Beige',    g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#D8C8A8'},
  {code:'AL02',pat:'Alessa',color:'Coconut',  g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#E8D8B8'},
  {code:'AL03',pat:'Alessa',color:'Gray',     g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#909090'},
  {code:'AL04',pat:'Alessa',color:'Ivory',    g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#F5EED8'},
  {code:'AL05',pat:'Alessa',color:'Sand',     g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#D0B888'},
  {code:'AL06',pat:'Alessa',color:'Taupe',    g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#A89880'},
  {code:'AL07',pat:'Alessa',color:'White',    g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#F5F2EE'},
  {code:'BX01',pat:'Bixby', color:'Black',    g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#1C1C1C'},
  {code:'BX02',pat:'Bixby', color:'Heather Gray',g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#B0B0B8'},
  {code:'BX03',pat:'Bixby', color:'Ivory',    g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#F5EED8'},
  {code:'BX04',pat:'Bixby', color:'Oxford',   g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#2A2A38'},
  {code:'BX05',pat:'Bixby', color:'Bright White',g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#FAFAFA'},
  {code:'BY01',pat:'Bryson',color:'Beige',    g:'D',op:'lf',maxW:108,band:'4"',cordless:true,lb:false,hex:'#D8C8A0'},
  {code:'BY02',pat:'Bryson',color:'Bark',     g:'D',op:'lf',maxW:108,band:'4"',cordless:true,lb:false,hex:'#806040'},
  {code:'BY03',pat:'Bryson',color:'Canvas',   g:'D',op:'lf',maxW:108,band:'4"',cordless:true,lb:false,hex:'#D0C090'},
  {code:'BY04',pat:'Bryson',color:'Almond',   g:'D',op:'lf',maxW:108,band:'4"',cordless:true,lb:false,hex:'#E8DCC0'},
  {code:'KG01',pat:'Kingston',color:'Sand',   g:'D',op:'lf',maxW:108,band:'3-1/4"',cordless:true,lb:false,hex:'#D0B878'},
  {code:'KG02',pat:'Kingston',color:'Onyx',   g:'D',op:'lf',maxW:108,band:'3-1/4"',cordless:true,lb:false,hex:'#282828'},
  {code:'KG03',pat:'Kingston',color:'Shadow', g:'D',op:'lf',maxW:108,band:'3-1/4"',cordless:true,lb:false,hex:'#686868'},
  {code:'KG04',pat:'Kingston',color:'Bright White',g:'D',op:'lf',maxW:108,band:'3-1/4"',cordless:true,lb:false,hex:'#FAFAFA'},
  {code:'LA01',pat:'Lani',  color:'Honey',    g:'D',op:'lf',maxW:108,band:'4"',cordless:true,lb:false,hex:'#C8A050'},
  {code:'LA02',pat:'Lani',  color:'Iron',     g:'D',op:'lf',maxW:108,band:'4"',cordless:true,lb:false,hex:'#606870'},
  {code:'LA03',pat:'Lani',  color:'Aluminum', g:'D',op:'lf',maxW:108,band:'4"',cordless:true,lb:false,hex:'#A8A8B0'},
  {code:'LA04',pat:'Lani',  color:'Cloud',    g:'D',op:'lf',maxW:108,band:'4"',cordless:true,lb:false,hex:'#D8E8F0'},
  {code:'LM01',pat:'Loma',  color:'Mist',     g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#C8D0D0'},
  {code:'LM02',pat:'Loma',  color:'Stone',    g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#807868'},
  {code:'LM03',pat:'Loma',  color:'Fog',      g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#B8C0C0'},
  {code:'LM04',pat:'Loma',  color:'Ice',      g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#E0EAF0'},
  {code:'SL01',pat:'Solana',color:'Driftwood',g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#B89870'},
  {code:'SL02',pat:'Solana',color:'Winter',   g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#E8E8E8'},
  {code:'SL03',pat:'Solana',color:'Walnut',   g:'D',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#7A5838'},
  // GROUP D — RD
  {code:'BG01',pat:'Briggs',color:'Charcoal', g:'D',op:'rd',maxW:110,band:'4"',cordless:true,lb:true, hex:'#404848'},
  {code:'BG02',pat:'Briggs',color:'Clay',     g:'D',op:'rd',maxW:110,band:'4"',cordless:true,lb:true, hex:'#908070'},
  {code:'BG03',pat:'Briggs',color:'Light Gray',g:'D',op:'rd',maxW:110,band:'4"',cordless:true,lb:true, hex:'#C0C0C0'},
  {code:'BG04',pat:'Briggs',color:'White',    g:'D',op:'rd',maxW:110,band:'4"',cordless:true,lb:true, hex:'#F5F2EE'},
  {code:'EV11',pat:'Evlin', color:'Black',    g:'D',op:'rd',maxW:110,band:'3-1/4"',cordless:true,lb:true, hex:'#1C1C1C'},
  {code:'LD01',pat:'Landry',color:'Anthracite',g:'D',op:'rd',maxW:110,band:'3-7/16"',cordless:true,lb:true, hex:'#484858'},
  {code:'LD02',pat:'Landry',color:'Mist',     g:'D',op:'rd',maxW:110,band:'3-7/16"',cordless:true,lb:true, hex:'#B8C0C8'},
  // GROUP E — LF
  {code:'AS01',pat:'Addison',color:'Sand',    g:'E',op:'lf',maxW:108,band:'4-7/16"',cordless:true,lb:false,hex:'#D8BE88'},
  {code:'AS02',pat:'Addison',color:'Sky',     g:'E',op:'lf',maxW:108,band:'4-7/16"',cordless:true,lb:false,hex:'#A0C0D8'},
  {code:'AS03',pat:'Addison',color:'Silver',  g:'E',op:'lf',maxW:108,band:'4-7/16"',cordless:true,lb:false,hex:'#C0C0C8'},
  {code:'AS04',pat:'Addison',color:'Ivory',   g:'E',op:'lf',maxW:108,band:'4-7/16"',cordless:true,lb:false,hex:'#F5EED8'},
  {code:'AS05',pat:'Addison',color:'Snow',    g:'E',op:'lf',maxW:108,band:'4-7/16"',cordless:true,lb:false,hex:'#FAFAFA'},
  {code:'MB01',pat:'Marble', color:'Ivory',   g:'E',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#F5EED8'},
  {code:'MB02',pat:'Marble', color:'Taupe',   g:'E',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#A89880'},
  {code:'MB03',pat:'Marble', color:'Hazel',   g:'E',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#907858'},
  {code:'MB04',pat:'Marble', color:'Pearl',   g:'E',op:'lf',maxW:108,band:'3"',cordless:true,lb:false,hex:'#F0E8DC'},
  {code:'TR01',pat:'Tory*',  color:'Cotton',  g:'E',op:'lf',maxW:108,band:'4-7/16"',cordless:false,lb:true, hex:'#F0ECE0'},
  {code:'TR02',pat:'Tory*',  color:'Latte',   g:'E',op:'lf',maxW:108,band:'4-7/16"',cordless:false,lb:true, hex:'#C0A870'},
  {code:'TR03',pat:'Tory*',  color:'Caramel', g:'E',op:'lf',maxW:108,band:'4-7/16"',cordless:false,lb:true, hex:'#B88040'},
  {code:'TR04',pat:'Tory*',  color:'Pearl',   g:'E',op:'lf',maxW:108,band:'4-7/16"',cordless:false,lb:true, hex:'#F0ECE0'},
  // GROUP E — RD
  {code:'BR01',pat:'Brantley',color:'Beige',       g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#D8C8A0'},
  {code:'BR02',pat:'Brantley',color:'Charcoal',    g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#484848'},
  {code:'BR03',pat:'Brantley',color:'Natural Gray', g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#909090'},
  {code:'BR04',pat:'Brantley',color:'White',       g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#F5F2EE'},
  {code:'BR05',pat:'Brantley',color:'Bark',        g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#806040'},
  {code:'DL01',pat:'Declan',  color:'Ivory',       g:'E',op:'rd',maxW:108,band:'3"',cordless:true,lb:true, hex:'#F5EED8'},
  {code:'DL02',pat:'Declan',  color:'Iron',        g:'E',op:'rd',maxW:108,band:'3"',cordless:true,lb:true, hex:'#484848'},
  {code:'KN01',pat:'Kane',    color:'Beige',       g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#D8C8A0'},
  {code:'KN02',pat:'Kane',    color:'Bark',        g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#806040'},
  {code:'KN03',pat:'Kane',    color:'Gray',        g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#909090'},
  {code:'KN04',pat:'Kane',    color:'Almond',      g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#E8DCC0'},
  {code:'LN01',pat:'Lena',    color:'Heather Gray',g:'E',op:'rd',maxW:108,band:'4-1/4"',cordless:true,lb:true, hex:'#A8A8B0'},
  {code:'LN02',pat:'Lena',    color:'Walnut',      g:'E',op:'rd',maxW:108,band:'4-1/4"',cordless:true,lb:true, hex:'#7A5838'},
  {code:'LN03',pat:'Lena',    color:'Sand',        g:'E',op:'rd',maxW:108,band:'4-1/4"',cordless:true,lb:true, hex:'#D0B878'},
  {code:'LN04',pat:'Lena',    color:'Mist',        g:'E',op:'rd',maxW:108,band:'4-1/4"',cordless:true,lb:true, hex:'#C8D8D8'},
  {code:'MA01',pat:'Mara',    color:'Bronze',      g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#8A5828'},
  {code:'MA02',pat:'Mara',    color:'Ivory',       g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#F5EED8'},
  {code:'MA03',pat:'Mara',    color:'Silver',      g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#C0C0C8'},
  {code:'NK01',pat:'Nika',    color:'Ivory',       g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#F5EED8'},
  {code:'NK02',pat:'Nika',    color:'White',       g:'E',op:'rd',maxW:108,band:'4"',cordless:true,lb:true, hex:'#FAFAFA'},
];

// PRICING — Portfolio Dual Sheer (Wallace 2026 PDF pages 12-15)
// Width: 24,30,36,42,48,54,60,66,72,84,96,110 | Length: 36,42,48,54,60,66,72,78,84,90,96,108
var W=[24,30,36,42,48,54,60,66,72,84,96,110];
var L=[36,42,48,54,60,66,72,78,84,90,96,108];
var PRICE={
  A:[[229,246,263,281,297,315,344,366,387,451,516,580],[240,260,281,301,320,361,401,426,451,526,601,676],[252,275,297,320,367,412,459,488,516,601,686,773],[263,289,315,361,412,464,516,549,580,676,773,869],[275,304,344,401,459,516,573,609,645,752,859,966],[286,318,379,441,504,567,630,671,708,827,944,1063],[297,344,412,482,550,619,687,731,773,902,1031,1160],[309,372,447,521,596,670,745,792,837,977,1116,1256],[320,401,482,562,641,722,802,854,902,1051,1202,1352],[344,430,516,601,687,773,859,914,966,1127,1289,1449],[367,459,550,641,732,825,916,976,1031,1202,1374,1545],[412,516,619,722,825,928,1031,1096,1160,1352,1545,1739]],
  B:[[277,294,312,329,346,363,395,421,445,519,594,668],[288,309,329,349,369,416,462,492,519,606,692,779],[300,323,346,369,422,474,527,562,594,692,791,890],[312,337,363,416,474,534,594,631,668,779,890,1000],[323,352,395,462,527,594,659,702,742,865,989,1113],[335,366,435,509,580,653,725,772,815,952,1088,1224],[346,395,474,554,633,711,791,842,890,1038,1187,1334],[358,428,515,600,686,772,857,912,964,1124,1285,1446],[369,462,554,647,738,831,924,983,1038,1212,1384,1557],[395,495,594,693,791,889,989,1052,1113,1298,1483,1668],[422,527,633,738,843,950,1056,1122,1187,1384,1582,1779],[474,594,711,831,950,1068,1187,1264,1334,1557,1779,2002]],
  C:[[324,342,361,380,398,417,422,465,491,572,654,735],[337,358,380,401,423,475,493,542,572,668,762,858],[348,373,398,423,483,543,564,620,654,762,872,981],[361,389,417,475,543,610,633,697,735,858,981,1102],[373,405,452,528,603,678,703,774,817,954,1089,1225],[386,420,498,580,664,747,774,852,899,1048,1198,1348],[398,452,543,633,724,814,844,929,981,1143,1306,1470],[411,491,589,686,784,882,914,1006,1062,1239,1415,1592],[423,528,633,738,844,950,985,1083,1143,1334,1525,1715],[452,566,678,791,905,1017,1056,1161,1225,1430,1634,1838],[483,603,724,844,965,1086,1125,1238,1306,1525,1742,1960],[543,678,814,950,1086,1221,1267,1393,1470,1715,1960,2205]],
  D:[[402,421,440,458,476,495,537,570,601,701,802,902],[415,437,458,479,501,564,626,666,701,818,935,1051],[427,451,476,501,573,644,716,760,802,935,1068,1202],[440,467,495,564,644,725,805,855,902,1051,1202,1352],[451,483,537,626,716,805,894,951,1002,1169,1335,1502],[464,498,591,690,787,885,984,1045,1101,1285,1468,1653],[476,537,644,752,859,966,1073,1140,1202,1402,1602,1802],[489,582,698,814,930,1046,1163,1234,1302,1519,1736,1952],[501,626,752,877,1002,1127,1252,1330,1402,1635,1869,2103],[537,671,805,939,1073,1207,1341,1424,1502,1752,2002,2253],[573,716,859,1002,1145,1288,1431,1519,1602,1869,2136,2403],[644,805,966,1127,1288,1449,1609,1710,1802,2103,2403,2703]],
  E:[[486,502,520,538,554,572,620,658,697,812,929,1063],[497,517,538,557,578,650,722,769,812,948,1083,1240],[509,531,554,578,660,743,826,879,929,1083,1238,1418],[520,546,572,650,743,836,929,988,1044,1219,1393,1594],[531,561,620,722,826,929,1032,1098,1161,1353,1548,1772],[543,575,681,795,908,1021,1135,1207,1276,1489,1701,1948],[554,620,743,866,990,1114,1238,1317,1393,1623,1856,2126],[566,671,805,939,1072,1206,1341,1427,1508,1760,2010,2302],[578,722,866,1011,1155,1300,1444,1537,1623,1895,2165,2479],[620,774,929,1083,1238,1392,1546,1646,1740,2030,2320,2656],[660,826,990,1155,1321,1485,1650,1757,1856,2165,2474,2833],[743,929,1114,1300,1485,1671,1856,1975,2088,2436,2784,3188]]
};

var CTRL_LIM={clutch:{minW:16,maxW:110,minH:20,maxH:108},cordless:{minW:24,maxW:96,minH:20,maxH:99},prowand:{minW:23,maxW:110,minH:20,maxH:108},'motor-std-li':{minW:23,maxW:110,minH:20,maxH:108},'motor-dc':{minW:15,maxW:110,minH:20,maxH:108},'motor-ac':{minW:21,maxW:110,minH:20,maxH:108}};
var WRAP_P=[31,38,47,54,61,69,77,84,92,108,123,138]; // by width bracket

// ── HELPERS ───────────────────────────────────────────────────────────────────
function selB(el,g){document.getElementById(g).querySelectorAll('.opt-btn').forEach(function(b){b.classList.remove('sel');});el.classList.add('sel');}
function tog(id){var e=document.getElementById(id);e.classList.toggle('active');}
function openNext(id){
  var e=document.getElementById(id);
  if(e){e.classList.add('active');setTimeout(function(){e.scrollIntoView({behavior:'smooth',block:'start'});},80);}
}
function spv(id,val){var e=document.getElementById(id);if(e){e.textContent=val||'—';e.classList.toggle('empty',!val||val==='—');}}
function showR(id,s){var e=document.getElementById(id);if(e)e.style.display=s?'':'none';}
function setV(id,v){var e=document.getElementById(id);if(e)e.textContent=v;}

// ── STEP 1 ────────────────────────────────────────────────────────────────────
function setProd(p,el){
  if(p==='dual'){window.location.href='portfolio-dual-sheer.html';return;}
  S.prod=p;
  document.querySelectorAll('#step1 .product-card').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  document.getElementById('val1').textContent=p==='dual'?'Portfolio Dual Sheer':'Banded 2D Shades';
  document.getElementById('step1').classList.add('done');

  document.getElementById('step2-dual').style.display=p==='dual'?'':'none';
  document.getElementById('step2-2d').style.display=p==='2d'?'':'none';
  document.getElementById('ctrl-dual').style.display=p==='dual'?'':'none';
  document.getElementById('ctrl-2d').style.display=p==='2d'?'':'none';
  document.getElementById('step5-dual').style.display=p==='dual'?'':'none';
  document.getElementById('step5-2d').style.display=p==='2d'?'':'none';
  document.getElementById('opts-2d').style.display=p==='2d'?'':'none';
  document.getElementById('s2title').textContent=p==='dual'?'Fabric':'Fabric Preferences';
  spv('sp-prod',p==='dual'?'Portfolio Dual Sheer':'Banded 2D Shades');
  if(p==='2d'){render2dGrid();}
  updateCalc();openNext('step2');
}

// ── BANDED 2D: COLLECTION + COLOR DATA ────────────────────────────────────────
var COLL2D=[
  // ── Translucent ──
  {n:'Bermuda Normal', l:'T', g:'A', c:null},
  {n:'Cona',           l:'T', g:'B', c:null},
  {n:'Linen',          l:'T', g:'B', c:null},
  {n:'Woodlook',       l:'T', g:'B', c:['White','Ice White','Mushroom','L-45','Khaki','J-3','Chocolate']},
  {n:'Comfy',          l:'T', g:'C', c:null},
  {n:'Dot',            l:'T', g:'C', c:null},
  {n:'Iron',           l:'T', g:'C', c:null},
  {n:'Lexus 9570',     l:'T', g:'C', c:null},
  {n:'Neat 9570',      l:'T', g:'C', c:['White','Beige','Grey','Charcoal']},
  {n:'New Avante',     l:'T', g:'C', c:['Ice White','White','Cream','Beige','Light Grey','Grey','Charcoal']},
  {n:'Palau',          l:'T', g:'C', c:['White','Ivory','Sand','Beige','Grey','Reed']},
  {n:'Pony',           l:'T', g:'C', c:['White','Ivory','Grey','Dark Grey']},
  {n:'Selene',         l:'T', g:'C', c:['Ice White','Dark Grey','Cream']},
  {n:'Tivoli',         l:'T', g:'C', c:['Khaki','White','Ivory','Grey','Dark Grey']},
  {n:'Woodlook Wide',  l:'T', g:'C', c:['White','Ice White','Mushroom','Khaki','B-1']},
  {n:'Bari Pleats',    l:'T', g:'D', c:null, note:'no cordless'},
  {n:'Beehive 1',      l:'T', g:'D', c:null},
  {n:'Beehive 2',      l:'T', g:'D', c:null},
  {n:'Bumblebee',      l:'T', g:'D', c:null},
  {n:'Chaqra',         l:'T', g:'D', c:null},
  {n:'Cooing',         l:'T', g:'D', c:null},
  {n:'Foliate',        l:'T', g:'D', c:null},
  {n:'Hardin Pleats',  l:'T', g:'D', c:null, note:'no cordless'},
  {n:'Line 7550',      l:'T', g:'D', c:null},
  {n:'Luxury',         l:'T', g:'D', c:['White','Ivory','Beige','Grey']},
  {n:'Luxury Wide',    l:'T', g:'D', c:['White','Ivory','Beige','Grey','Light Grey']},
  {n:'Palisander',     l:'T', g:'D', c:['White','Brown','Grey','Black']},
  {n:'Stellar Two Tone',l:'T',g:'D', c:['Ice White','White','Ivory','Baby Pink','Sky Blue','Mint','Light Grey','Grey']},
  {n:'Chroma',         l:'T', g:'E', c:null},
  {n:'Glow',           l:'T', g:'E', c:null},
  {n:'Lanikai',        l:'T', g:'E', c:null},
  {n:'Manado',         l:'T', g:'E', c:['White','Ivory','Sand','Khaki','Grey']},
  {n:'Manresa',        l:'T', g:'E', c:['White','Pearl','Cream','Blue Grey','Blue','Stone Blue','Dark Grey']},
  {n:'Maseru Pleats',  l:'T', g:'E', c:['White','Ivory','Beige','Pastel','Grey','Black'], note:'no cordless'},
  {n:'Reed',           l:'T', g:'E', c:['Ice White','White','Ivory','Light Grey','Grey','Dark Grey']},
  {n:'Sparkle',        l:'T', g:'E', c:['White (9-2)','Ivory (7-4)','2-6','3-4','Black']},
  {n:'Spread 1390',    l:'T', g:'E', c:['White','Grey','Stone Blue','Black Brown']},
  // ── Blackout ──
  {n:'Almond',         l:'RD',g:'D', c:['Ice White','Ivory','Beige','Latte','Grey','Teak','Khaki','Anthracite'], note:'large rail req.'},
  {n:'Abakan',         l:'RD',g:'E', c:null},
  {n:'Equus One Tone', l:'RD',g:'E', c:null, note:'large rail req.'},
  {n:'Equus Two Tone', l:'RD',g:'E', c:null, note:'large rail req.'},
  {n:'Linen 15%',      l:'RD',g:'E', c:['White','Beige','Brown','Grey']},
  {n:'SB Grand One Tone',l:'RD',g:'E',c:['White','Ocher','Clay']},
  {n:'SB Grand Two Tone',l:'RD',g:'E',c:['Ocher','White','Beige','Grey','Teak']},
  {n:'Adana',          l:'RD',g:'F', c:['White','Ivory','Beige','Light Grey','Grey','Black']},
  {n:'True Black & White',l:'RD',g:'F',c:['Ice White','White','Cloud White','Black']}
];

var COLOR2D_HEX={
  'Ice White':'#F0EDE8','White':'#F5F2EE','Cloud White':'#F8F8F5','Bright White':'#FAFAFA',
  'Ivory':'#F5EED8','Cream':'#EDE0C0','Pearl':'#E8E0D0','Eggshell':'#EDE8D8',
  'Beige':'#D8C8A0','Sand':'#C8B090','Khaki':'#B8A880','Linen':'#E8DCC8',
  'Latte':'#B08060','Mushroom':'#A09080','Reed':'#A09060','Pastel':'#D8C8B0',
  'Almond':'#E8DCC0','Natural':'#D0C8A0','Taupe':'#9A8878','Tan':'#C0A870',
  'Caramel':'#B88040','Canyon':'#A86840','Clay':'#B07850','Ocher':'#C8A840',
  'Bark':'#806040','Teak':'#7A5230','Walnut':'#7A5838','Brown':'#6B4423',
  'Chocolate':'#4A2810','Espresso':'#3A2010',
  'Light Grey':'#C0C0C0','Silver':'#C0C0C8','Storm':'#607080',
  'Grey':'#909090','Dark Grey':'#606060','Charcoal':'#3A3A3A',
  'Anthracite':'#303030','Black':'#1C1C1C',
  'Black Brown':'#2C1A10',
  'Blue Grey':'#7890A8','Stone Blue':'#6080A0','Blue':'#6088C0',
  'Mint':'#90C8B0','Baby Pink':'#E8B8B8','Sky Blue':'#A8D8F0',
  'J-3':'#607080','B-1':'#B0B8C0','L-45':'#D0C0A0',
  'White (9-2)':'#F8F5F0','Ivory (7-4)':'#F5EED8',
  '2-6':'#808080','3-4':'#A0A0A0'
};

/* Standard palette shown for patterns that have no specific color list.
   Covers every color offered across the 2D banded shade range. */
var DEFAULT_COLORS_2D=[
  'Ice White','White','Cloud White','Bright White',
  'Ivory','Cream','Pearl','Eggshell',
  'Beige','Sand','Khaki','Linen','Mushroom','Almond','Natural','Taupe',
  'Latte','Caramel','Clay','Ocher','Bark','Canyon',
  'Teak','Walnut','Brown','Chocolate',
  'Light Grey','Silver','Storm','Grey','Dark Grey','Charcoal','Anthracite','Black'
];

var b2dLight='T';

function set2dLight(l,btn){
  b2dLight=l;
  document.querySelectorAll('#grp-2d-light .opt-btn').forEach(function(b){b.classList.remove('sel');});
  if(btn)btn.classList.add('sel');
  render2dGrid();
  S.fabric=null;
  document.getElementById('val2').textContent='—';
  document.getElementById('step2').classList.remove('done');
  spv('sp-fab','');spv('sp-op',l==='T'?'Translucent':'Blackout');
}

function escQ(s){return (s+'').replace(/\\/g,'\\\\').replace(/'/g,"\\'");}

function render2dGrid(){
  var colls=COLL2D.filter(function(c){return c.l===b2dLight;});
  var opLabel=b2dLight==='T'?'Light Filtering':'Blackout';
  var html='';var hasAny=false;
  ['A','B','C','D','E','F'].forEach(function(grp){
    var grpColls=colls.filter(function(c){return c.g===grp;});
    if(!grpColls.length)return;
    hasAny=true;
    html+='<div class="coll-head">Price Group '+grp+
      ' <span class="coll-badge'+(b2dLight==='RD'?' coll-badge-rd':'')+'">'
      +opLabel+'</span></div>';
    html+='<div class="fabric-grid" style="margin-bottom:16px">';
    grpColls.forEach(function(coll){
      var colors=(coll.c&&coll.c.length)?coll.c:DEFAULT_COLORS_2D;
      /* pattern header row */
      html+='<div style="grid-column:1/-1;display:flex;align-items:center;gap:8px;margin-top:8px;margin-bottom:3px">';
      html+='<span style="font-size:12px;font-weight:600;color:#333">'+coll.n+'</span>';
      if(coll.note)html+='<span class="b2d-note-tag">'+coll.note+'</span>';
      html+='</div>';
      /* color swatches */
      colors.forEach(function(color){
        var hex=COLOR2D_HEX[color]||'#C8C0B0';
        var id='b2d-'+encodeURIComponent(coll.n+'-'+color);
        html+='<div class="swatch" id="'+id+'" onclick="pick2dFabric(\''+escQ(coll.n)+'\',\''+escQ(color)+'\',this)">';
        html+='<div class="swatch-color" style="background:'+hex+'"></div>';
        html+='<div class="swatch-label">';
        html+='<div class="swatch-name">'+color+'</div>';
        html+='<div class="swatch-code">'+coll.n+'</div>';
        html+='</div></div>';
      });
      /* other/custom color always at end */
      html+='<div class="swatch" onclick="pick2dFabric(\''+escQ(coll.n)+'\',\'Other — note color below\',this)" style="border-style:dashed">';
      html+='<div class="swatch-color" style="background:linear-gradient(135deg,#f0ece4 50%,#e0d8cc 50%)"></div>';
      html+='<div class="swatch-label"><div class="swatch-name" style="color:#888">Other color</div></div></div>';
    });
    html+='</div>';
  });
  var el=document.getElementById('b2d-grid');
  if(el)el.innerHTML=hasAny?html:'<div class="info-box">No collections in this category.</div>';
}

function pick2dFabric(collName,colorName,btn){
  document.querySelectorAll('#b2d-grid .swatch').forEach(function(b){b.classList.remove('sel');});
  if(btn)btn.classList.add('sel');
  var label=collName+' — '+colorName;
  S.fabric={name:label,type:'2d'};
  spv('sp-fab',label);
  spv('sp-op',b2dLight==='T'?'Translucent':'Blackout');
  document.getElementById('val2').textContent=label.length>32?collName:label;
  document.getElementById('step2').classList.add('done');
  openNext('step3');
}

// ── STEP 2 ────────────────────────────────────────────────────────────────────
function setOpacity(op,el){
  S.opacity=op;S.fabric=null;
  selB(el,'grp-opacity');
  document.getElementById('rd-note').style.display=op==='rd'?'':'none';
  if(op==='rd'){var lb=document.getElementById('btn-lb');if(lb)selB(lb,'grp-bar');}
  spv('sp-op',op==='lf'?'Light Filtering':'Blackout');
  renderFabricGrid();
}

function filterFab(g,el){S.fabFilter=g;selB(el,'grp-fab-filter');renderFabricGrid();}

function renderFabricGrid(){
  var byGrp={A:[],B:[],C:[],D:[],E:[]};
  FABRICS.forEach(function(f){
    if(f.op!==S.opacity)return;
    if(S.fabFilter!=='all'&&f.g!==S.fabFilter)return;
    byGrp[f.g].push(f);
  });
  var html='';
  ['A','B','C','D','E'].forEach(function(g){
    if(!byGrp[g].length)return;
    html+='<div><div class="coll-head">Price Group '+g+' <span class="coll-badge'+(S.opacity==='rd'?' coll-badge-rd':'')+'">'+S.opacity.toUpperCase()+'</span></div><div class="fabric-grid">';
    byGrp[g].forEach(function(f){
      var isSel=S.fabric&&S.fabric.code===f.code;
      var isBlocked=!f.cordless&&S.ctrl==='cordless';
      var sf=JSON.stringify(f).replace(/"/g,'&quot;');
      html+='<div class="swatch'+(isSel?' sel':'')+(isBlocked?' bsw':'')+'" '+(isBlocked?'title="Not available cordless"':'onclick="selectFab('+sf+')"')+'>';
      html+='<div class="swatch-color" style="background:'+f.hex+'"></div>';
      html+='<div class="swatch-label"><div class="swatch-name">'+f.pat.replace('*','')+' '+f.color+'</div>';
      html+='<div class="swatch-code">'+f.code+' &middot; '+f.band+' band</div>';
      if(f.lb)html+='<div class="swatch-rd">LARGE BAR</div>';
      html+='</div></div>';
    });
    html+='</div></div>';
  });
  document.getElementById('fabric-grid-wrap').innerHTML=html||'<div class="info-box">No fabrics in this filter.</div>';
}

function selectFab(f){
  S.fabric=f;
  document.getElementById('val2').textContent=f.pat.replace('*','')+' '+f.color+' ('+f.code+') Grp '+f.g;
  spv('sp-fab',f.pat.replace('*','')+' '+f.color+' ('+f.code+') · Group '+f.g+' · max '+f.maxW+'"W');
  spv('sp-op',S.opacity==='lf'?'Light Filtering':'Blackout');
  document.getElementById('step2').classList.add('done');
  document.getElementById('tory-warn').style.display=f.code.startsWith('TR')?'':'none';
  var cb=document.getElementById('btn-cordless');
  if(cb)cb.classList.toggle('blocked',!f.cordless);
  if(!f.cordless&&S.ctrl==='cordless'){S.ctrl='';document.getElementById('val4').textContent='—';}
  if(f.lb||f.op==='rd'){var lb=document.getElementById('btn-lb');if(lb)selB(lb,'grp-bar');}
  renderFabricGrid();validateDims();updateCalc();openNext('step3');
}

// ── STEP 3 ────────────────────────────────────────────────────────────────────
function validateDims(){
  S.w=parseFloat(document.getElementById('inp-w').value)||0;
  S.h=parseFloat(document.getElementById('inp-h').value)||0;
  var fb=document.getElementById('dim-fb');
  if(!S.w||!S.h){fb.innerHTML='';updateSpec();return;}
  var errs=[],warns=[];
  if(S.prod==='dual'){
    var ck=S.ctrl==='motor'?'motor-'+S.motorType:S.ctrl;
    var lim=CTRL_LIM[ck];
    if(lim){
      if(S.w<lim.minW)errs.push('Width '+S.w+'" < min '+lim.minW+'" for '+getCtrlLabel()+'.');
      if(S.w>lim.maxW)errs.push('Width '+S.w+'" > max '+lim.maxW+'".');
      if(S.h<lim.minH)errs.push('Height '+S.h+'" < min '+lim.minH+'".');
      if(S.h>lim.maxH)errs.push('Height '+S.h+'" > max '+lim.maxH+'".');
    }
    if(S.fabric&&S.w>S.fabric.maxW)errs.push('Fabric '+S.fabric.code+' max width is '+S.fabric.maxW+'". Width '+S.w+'" exceeds this limit.');
    if(!lim&&S.ctrl)warns.push('Select control type to see size limits.');
  } else {
    if(S.w<12)errs.push('Min width 12".');
    if(S.w>108)errs.push('Max width 108".');
    if(S.h<12)errs.push('Min height 12".');
    if(S.h>108)errs.push('Max height 108".');
  }
  var html='';
  errs.forEach(function(e){html+='<div class="warn-box warn-box-red" style="margin-top:6px">&#9888; '+e+'</div>';});
  warns.forEach(function(e){html+='<div class="warn-box" style="margin-top:6px">&#9888; '+e+'</div>';});
  // Outside mount: shade must be at least 5" wider than window opening (2½" per side)
  var mountBtn=document.querySelector('#grp-mount .opt-btn.sel');
  var isOutside=mountBtn&&mountBtn.textContent.indexOf('Outside')!==-1;
  if(isOutside&&S.w){
    var opening=Math.round((S.w-5)*8)/8; // round to nearest 1/8"
    if(opening<=0){
      warns.push('Outside mount: shade width should be at least 5″ wider than the window opening (2\xbd″ each side).');
    } else {
      html+='<div class="info-box" style="margin-top:6px">Outside mount &mdash; shade covers a window opening up to <strong>'+opening+'″</strong> wide &nbsp;(2\xbd″ overlap each side).</div>';
    }
  }
  if(!errs.length&&S.w&&S.h){
    html='<div class="ok-box">&#10003; '+S.w+'" W &times; '+S.h+'" H &mdash; accepted.</div>'+html;
    document.getElementById('step3').classList.add('done');
    document.getElementById('val3').textContent=S.w+'" W \xd7 '+S.h+'" H';
    spv('sp-sz',S.w+'" \xd7 '+S.h+'"');
    openNext('step4');
  }
  fb.innerHTML=html;
  updateCalc();
}

// ── STEP 4 ────────────────────────────────────────────────────────────────────
function setCtrl(c,el){
  S.ctrl=c;
  document.getElementById('grp-ctrl').querySelectorAll('.opt-btn:not(.blocked)').forEach(function(b){b.classList.remove('sel');});
  el.classList.add('sel');
  var labels={clutch:'Clutch / Cord Loop',cordless:'Cordless',prowand:'Pro Wand Motor',motor:'Remote Motor'};
  document.getElementById('val4').textContent=labels[c]||c;
  spv('sp-ctrl',labels[c]||c);
  document.getElementById('step4').classList.add('done');
  var notes={
    clutch:'Standard cord loop. Cord length = ~\xbe shade height (default). Color-matched to cassette. Min 16"W, max 110"W.',
    cordless:'Min 24"W, max 96"W, max 99"H. Not available for Tory* fabrics.',
    prowand:'Rechargeable battery motor, wand operated. White wand only. Min 23"W, max 110"W.',
    motor:'Select motor type and remote below. Min width varies by motor type.'
  };
  document.getElementById('ctrl-note').textContent=notes[c]||'';
  document.getElementById('ctrl-note').style.display=notes[c]?'':'none';
  document.getElementById('cord-color-wrap').style.display=c==='clutch'?'':'none';
  document.getElementById('wand-opts').style.display=c==='prowand'?'':'none';
  document.getElementById('motor-opts').style.display=c==='motor'?'':'none';
  document.getElementById('cordless-opts').style.display=c==='cordless'?'':'none';
  // Re-render fabric grid to reflect cordless restriction
  if(S.prod==='dual')renderFabricGrid();
  validateDims();updateCalc();openNext('step5');
}

function setMotorType(t,el){S.motorType=t;selB(el,'grp-motor-type');validateDims();updateCalc();}
function setCassColor(c,el){S.cassColor=c;document.getElementById('grp-cord-color').querySelectorAll('.color-chip').forEach(function(ch){ch.classList.remove('sel');});el.classList.add('sel');updateSpec();}
function getCtrlLabel(){if(S.ctrl==='motor')return 'Remote Motor ('+S.motorType+')';return{clutch:'Clutch',cordless:'Cordless',prowand:'Pro Wand'}[S.ctrl]||S.ctrl;}

// ── STEP 5 ────────────────────────────────────────────────────────────────────
function setCass(c,el){
  S.cassette=c;selB(el,'grp-cassette');
  spv('sp-cass',c==='rounded'?'Rounded':'Square (+$80 wrap)');
  document.getElementById('val5').textContent=c==='rounded'?'Rounded':'Square (+$80 wrap)';
  document.getElementById('step5').classList.add('done');
  updateCalc();
}

// ── STEP 6 ────────────────────────────────────────────────────────────────────
function setQtyInp(v){
  var n=Math.max(1,Math.min(50,parseInt(v)||1));
  S.qty=n;
  spv('sp-qty',n+(n===1?' shade':' shades'));
  document.getElementById('step6').classList.add('done');
  document.getElementById('val6').textContent=n+' shade'+(n===1?'':'s');
  updateCalc();
}
function adjQty(d){
  var el=document.getElementById('qty-inp');
  el.value=Math.max(1,Math.min(50,(parseInt(el.value)||1)+d));
  setQtyInp(el.value);
}
document.getElementById('room-lbl').addEventListener('input',function(){S.room=this.value.trim();updateSpec();});

// ── STEP 7 ────────────────────────────────────────────────────────────────────
function setDel(opt){
  S.del=opt;
  ['ship','pickup','install'].forEach(function(o){var e=document.getElementById('del-'+o);if(e)e.classList.toggle('sel',o===opt);});
  var lbl={ship:'Ship to me',pickup:'Pick up',install:'Professional installation'}[opt]||opt;
  document.getElementById('val7').textContent=lbl;
  spv('sp-del',lbl);
  document.getElementById('step7').classList.add('done');
  updateCalc();
}

// ── SPEC / PRICING ────────────────────────────────────────────────────────────
function updateSpec(){
  spv('sp-mnt',document.querySelector('#grp-mount .opt-btn.sel')?.textContent.trim().replace(/\s+/g,' ')||'Inside mount');
  updateCalc();
}

function lookupPrice(w,h,g){
  if(!w||!h||!g)return null;
  var tbl=PRICE[g];if(!tbl)return null;
  var wi=W.findIndex(function(v){return w<=v;}); if(wi<0)wi=W.length-1;
  var li=L.findIndex(function(v){return h<=v;}); if(li<0)li=L.length-1;
  return(tbl[li]&&tbl[li][wi])||null;
}

function getWrapP(w){
  var wi=W.findIndex(function(v){return w<=v;}); if(wi<0)wi=W.length-1;
  return WRAP_P[wi]||31;
}

function updateCalc(){
  if(S.prod!=='dual'){setV('pr-total','Custom quote');setV('pr-base','—');return;}
  var w=S.w,h=S.h,g=S.fabric?S.fabric.g:null;
  if(!w||!h||!g){setV('pr-base','—');setV('pr-total','—');return;}
  var base=lookupPrice(w,h,g);
  if(!base){setV('pr-base','Out of range — call');setV('pr-total','—');return;}
  setV('pr-base','$'+base+'/shade');
  var ctrlUp=0,wrapUp=0,accUp=0;
  if(S.ctrl==='cordless')ctrlUp=192;
  else if(S.ctrl==='prowand')ctrlUp=232;
  else if(S.ctrl==='motor')ctrlUp=460;
  if(S.cassette==='square')wrapUp=80;
  var bbWrap=document.querySelector('#grp-bar-wrap .opt-btn.sel');
  if(bbWrap&&bbWrap.textContent.includes('wrap'))wrapUp+=getWrapP(w);
  if(document.getElementById('acc-bat')?.checked)accUp+=160;
  if(document.getElementById('acc-plug')?.checked)accUp+=60;
  if(document.getElementById('acc-charger')?.checked)accUp+=83;
  if(document.getElementById('acc-ext6')?.checked)accUp+=32;
  if(document.getElementById('acc-ext48')?.checked)accUp+=43;
  if(document.getElementById('acc-pole')?.checked)accUp+=80;
  showR('pr-ctrl-row',ctrlUp>0); if(ctrlUp)setV('pr-ctrl','+$'+ctrlUp);
  showR('pr-wrap-row',wrapUp>0); if(wrapUp)setV('pr-wrap','+$'+wrapUp+'/shade');
  showR('pr-acc-row',accUp>0);   if(accUp)setV('pr-acc','+$'+accUp);
  var freight=(S.del==='pickup'||S.del==='install')?0:25+(S.qty>1?(S.qty-1)*11:0);
  showR('pr-frt-row',freight>0); if(freight)setV('pr-frt','$'+freight);
  var total=(base+ctrlUp+wrapUp+accUp)*S.qty+freight;
  setV('pr-total','~$'+Math.round(total).toLocaleString());
}

['acc-bat','acc-plug','acc-charger','acc-ext6','acc-ext48','acc-pole'].forEach(function(id){
  var e=document.getElementById(id);if(e)e.addEventListener('change',updateCalc);
});
document.getElementById('grp-bar-wrap').querySelectorAll('.opt-btn').forEach(function(b){b.addEventListener('click',updateCalc);});
document.getElementById('grp-bar').querySelectorAll('.opt-btn').forEach(function(b){b.addEventListener('click',updateCalc);});

// ── SUBMIT ────────────────────────────────────────────────────────────────────
function submitQ(){
  var name=document.getElementById('q-name').value.trim();
  var phone=document.getElementById('q-phone').value.trim();
  var errEl=document.getElementById('sub-err');
  var errs=[];
  if(!name)errs.push('Name required.');
  if(!phone)errs.push('Phone required.');
  if(!S.prod)errs.push('Select product (Step 1).');
  if(S.prod==='dual'&&!S.fabric)errs.push('Select fabric (Step 2).');
  if(!S.w||!S.h)errs.push('Enter width and height (Step 3).');
  if(S.prod==='dual'&&!S.ctrl)errs.push('Select control type (Step 4).');
  if(errs.length){errEl.innerHTML='&#9888; '+errs.join(' ');errEl.style.display='';return;}
  errEl.style.display='none';

  var mount=document.querySelector('#grp-mount .opt-btn.sel')?.textContent.trim()||'Inside mount';
  var del={ship:'Ship (UPS/FedEx from Huntingdon Valley PA)',pickup:'Pick up',install:'Professional installation'}[S.del]||S.del;
  var sbs=document.querySelector('#grp-sbs .opt-btn.sel')?.textContent.trim().includes('Yes')?'Yes':'No';
  var bar=document.querySelector('#grp-bar .opt-btn.sel')?.textContent.trim()||'Standard';
  var barWrap=document.querySelector('#grp-bar-wrap .opt-btn.sel')?.textContent.trim().includes('wrap')?'Yes (+$'+getWrapP(S.w)+')':'No';
  var base=S.prod==='dual'?lookupPrice(S.w,S.h,S.fabric?S.fabric.g:null):null;
  var ctrlUp=S.ctrl==='cordless'?192:S.ctrl==='prowand'?232:S.ctrl==='motor'?460:0;
  var wrapUp=S.cassette==='square'?80:0;
  var bbW=document.querySelector('#grp-bar-wrap .opt-btn.sel');if(bbW&&bbW.textContent.includes('wrap'))wrapUp+=getWrapP(S.w);
  var accUp=(document.getElementById('acc-bat')?.checked?160:0)+(document.getElementById('acc-plug')?.checked?60:0)+(document.getElementById('acc-charger')?.checked?83:0)+(document.getElementById('acc-ext6')?.checked?32:0)+(document.getElementById('acc-ext48')?.checked?43:0)+(document.getElementById('acc-pole')?.checked?80:0);
  var freight=(S.del==='pickup'||S.del==='install')?0:25+(S.qty>1?(S.qty-1)*11:0);

  var body=[
    '=== WALLACE ZEBRA / BANDED SHADE QUOTE ===','',
    'CONTACT','Name: '+name,'Phone: '+phone,'Email: '+(document.getElementById('q-email').value||'—'),'',
    'ORDER DETAILS',
    'Product: '+(S.prod==='dual'?'Wallace Portfolio Dual Sheer Shades':'Wallace Banded 2D Shades'),
    'Quantity: '+S.qty+' shade(s)',
    'Room: '+(S.room||'—'),
    'Width: '+S.w+'"','Height: '+S.h+'"','Mount: '+mount,''
  ].concat(S.prod==='dual'?[
    'FABRIC',
    'Pattern: '+S.fabric.pat.replace('*',''),'Color: '+S.fabric.color,'Code: '+S.fabric.code,
    'Price group: Group '+S.fabric.g,'Opacity: '+(S.opacity==='lf'?'Light Filtering':'Blackout'),
    'Band height: '+S.fabric.band,'Max fabric width: '+S.fabric.maxW+'"',
    '','CONTROL',
    'Control: '+getCtrlLabel(),
    (S.ctrl==='clutch'?'Cord/cassette color: '+S.cassColor:''),
    (S.ctrl==='prowand'?'Wand length: '+(document.querySelector('#grp-wand .opt-btn.sel')?.textContent.trim()||'—'):''),
    (S.ctrl==='motor'?'Motor type: '+S.motorType:''),
    (S.ctrl==='motor'?'Remote: '+(document.querySelector('#grp-remote .opt-btn.sel')?.textContent.trim()||'—'):''),
    '','CASSETTE & BOTTOM BAR',
    'Cassette: '+(S.cassette==='rounded'?'Rounded':'Square (+$80 fabric wrap)'),
    'Bottom bar: '+bar,'Bottom bar wrap: '+barWrap,
    '','PRICING (MSRP estimate)',
    'Base per shade: '+(base?'$'+base:'Out of range'),
    'Control: '+(ctrlUp>0?'+$'+ctrlUp:'Included'),
    'Wrap: '+(wrapUp>0?'+$'+wrapUp:'None'),
    'Accessories: '+(accUp>0?'+$'+accUp:'None'),
    'Est. total: ~$'+Math.round((base||0+ctrlUp+wrapUp+accUp)*S.qty+freight),
  ]:['CONTROL',document.querySelector('#grp-ctrl-2d .opt-btn.sel')?.textContent.trim()||'—']).concat([
    '','OPTIONS','Side-by-side matching: '+sbs,'Delivery: '+del,
    '','NOTES',document.getElementById('q-notes').value||'None','',
    '--- Sent from blindznation.com/pages/wallace-banded-shades.html ---'
  ]).join('\n');

  var subj='Wallace '+(S.prod==='dual'?'Dual Sheer':'Banded 2D')+' Quote — '+S.w+'"x'+S.h+'" — '+name;
  window.location.href='mailto:justin@blindznation.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);
  document.getElementById('step8-body').querySelectorAll(':not(#success-box)').forEach(function(el){el.style.display='none';});
  document.getElementById('success-box').style.display='block';
}