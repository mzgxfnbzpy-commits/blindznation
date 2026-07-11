// ═══════════════════════════════════════════════════════════
// GALAXY PATTERN DATA — Source: 2025 Galaxy Woven Collection PDF (Wallace)
// ═══════════════════════════════════════════════════════════
// [pg, sku, name, headrail, chain]
const GALAXY_PATTERNS = [
  [1,'BB1080','Zagoli Sienna','Chestnut','Bronze'],
  [1,'BB1001','Argos','Chestnut','Bronze'],
  [1,'BB1266','Kyoto Russet','Greywash','Stainless'],
  [1,'BB1268','Kyoto Frost','Whitewash','Stainless'],
  [2,'BB2253','Mesabi White','Whitewash','Stainless'],
  [2,'BB2264','Bamboo Harvest','Chestnut','Bronze'],
  [2,'BB2780','Aris Wheat','Chestnut','Bronze'],
  [2,'BB2090','Edessa Cream','Walnut','Stainless'],
  [3,'BJ3403','Lulea Snow','Natural','Stainless'],
  [4,'PB4250','Luxor Chestnut','Whitewash','Stainless'],
  [4,'PB4260','Luxor Sand','Greywash','Stainless'],
  [4,'PB4270','Luxor Silver Charm','Whitewash','Stainless'],
  [4,'PB4363','Lyon Taupe','Natural','Stainless'],
  [4,'PB4373','Lyon Glacier','Greywash','Stainless'],
  [4,'PB4383','Lyon Chalk','Whitewash','Stainless'],
  [4,'BY4201','Arroyo Thunder','Greywash','Stainless'],
  [4,'BY4202','Arroyo Gray','Greywash','Stainless'],
  [4,'BY4203','Arroyo Pale Smoke','Whitewash','Stainless'],
  [4,'PB4160','Essex White Cloud','Whitewash','Stainless'],
  [4,'PB4170','Essex Sage','Greywash','Stainless'],
  [4,'PB4180','Essex Straw','Walnut','Bronze'],
  [4,'PB4190','Essex Latte','Whitewash','Stainless'],
  [4,'PB4101','Lakeshore White Sands','Whitewash','Stainless'],
  [4,'PB4102','Lakeshore Latte','Whitewash','Stainless'],
  [4,'PB4103','Lakeshore Straw','Greywash','Stainless'],
  [4,'PP4701','Sanoma Snow','Whitewash','Stainless'],
  [4,'PP4702','Sanoma Sands','Greywash','Stainless'],
  [4,'PP4703','Sanoma Caramel','Natural','Stainless'],
  [4,'PP4704','Sanoma Rust','Walnut','Bronze'],
  [4,'PP4705','Sanoma Concrete','Greywash','Bronze'],
  [4,'PP4706','Sanoma Ginger','Natural','Stainless'],
  [4,'PB4210','Hudson Pebble','Greywash','Stainless'],
  [4,'PB4212','Hudson Flax','Natural','Stainless'],
  [4,'PB4240','Timmins Cream','Whitewash','Stainless'],
  [4,'PB4220','Timmins Fossil','Greywash','Stainless'],
  [4,'PB4230','Timmins Seal','Greywash','Bronze'],
  [4,'BJ4523','Serenity Mist','Natural','Stainless'],
  [4,'BJ4350','Avedon','Chestnut','Bronze'],
  [5,'PP5720','Kingston Smoke','Greywash','Stainless'],
  [5,'PP5730','Kingston Rock','Greywash','Stainless'],
  [5,'PP5740','Kingston Rice','Whitewash','Stainless'],
  [5,'PB5420','Giza Midnight','Greywash','Bronze'],
  [5,'PB5430','Giza Wheat','Whitewash','Stainless'],
  [5,'PB5440','Giza Snow','Whitewash','Stainless'],
  [5,'PB5460','Chatou Star','Greywash','Stainless'],
  [5,'PB5470','Chatou Stone','Greywash','Bronze'],
  [5,'PB5480','Chatou Snow','Whitewash','Stainless'],
  [5,'PY5520','Dawson White','Whitewash','Stainless'],
  [5,'PY5510','Dawson Marble','Greywash','Stainless'],
  [5,'PY5530','Dawson Tea','Greywash','Stainless'],
  [5,'PY5313','Zaria Mink','Greywash','Stainless'],
  [5,'PY5311','Zaria Silver White','Whitewash','Stainless'],
  [5,'BJ5514','Boras Snow','Whitewash','Stainless'],
  [5,'BJ5525','Amour Wheat','Chestnut','Bronze'],
  [5,'BJ5240','Bengali Sand','Natural','Stainless'],
  [5,'JJ5010','Goya Dawn','Natural','Stainless'],
  [5,'JJ5050','Goya Wheat','Natural','Stainless'],
  [6,'JP6777','Moncton Granite','Greywash','Stainless'],
  [6,'JP6778','Moncton Snow White','Whitewash','Stainless'],
  [6,'JP6779','Moncton Snow Gray','Whitewash','Stainless'],
  [6,'JP6333','Zeffa Mushroom','Natural','Stainless'],
  [6,'JP6335','Zeffa Whitish Gray','Whitewash','Stainless'],
  [6,'JP6334','Zeffa White','Whitewash','Stainless'],
  [6,'JP6336','Zeffa Grayish White','Greywash','Stainless'],
  [6,'JP6870','Kuwada Stone','Greywash','Stainless'],
  [6,'JP6872','Kuwada Lava','Greywash','Bronze'],
  [6,'JP6874','Kuwada Cotton','Whitewash','Stainless'],
  [6,'JP6810','Surroy Amber','Natural','Stainless'],
  [6,'JP6811','Surroy Whiterock','Whitewash','Stainless'],
  [6,'JP6812','Surroy Tea','Greywash','Stainless'],
  [6,'JP6813','Surroy Pearl','Whitewash','Stainless'],
  [6,'PY6830','Winnipeg Silver','Greywash','Stainless'],
  [6,'PY6832','Winnipeg Cream','Whitewash','Stainless']
];

// TDBU limits: {sku: [noLinerMaxW, noLinerMaxH, linerMaxW, linerMaxH]} or null=N/A
const TDBU_LIMITS = {
  'BB1080':null,'BB1001':null,'BB1266':null,'BB1268':null,
  'BB2253':null,'BB2264':null,'BB2780':null,'BB2090':null,
  'BJ3403':null,
  'PB4250':[60,72,60,54],'PB4260':[60,72,60,54],'PB4270':[60,72,60,54],
  'PB4363':[60,54,48,54],'PB4373':[60,54,48,54],'PB4383':[60,54,48,54],
  'BY4201':[72,68,60,60],'BY4202':[72,69,60,60],'BY4203':[60,72,60,54],
  'PB4160':[72,72,72,72],'PB4170':[72,72,72,72],'PB4180':[72,72,72,72],'PB4190':[72,72,72,72],
  'PB4101':[72,72,60,72],'PB4102':[72,72,72,72],'PB4103':[72,72,72,72],
  'PP4701':[72,72,72,72],'PP4702':[72,72,72,66],'PP4703':[72,72,72,66],
  'PP4704':[72,72,72,66],'PP4705':[72,72,72,66],'PP4706':[72,72,72,66],
  'PB4210':[72,72,60,72],'PB4212':[72,72,60,72],
  'PB4240':[72,72,60,72],'PB4220':[72,72,60,72],'PB4230':[72,72,60,72],
  'BJ4523':null,'BJ4350':null,
  'PP5720':[72,72,60,72],'PP5730':[72,72,60,72],'PP5740':[72,72,60,72],
  'PB5420':[72,72,60,66],'PB5430':[72,72,60,66],'PB5440':[72,72,60,66],
  'PB5460':[72,72,60,72],'PB5470':[72,72,60,72],'PB5480':[72,72,60,72],
  'PY5520':[72,72,72,72],'PY5510':[72,72,72,72],'PY5530':[72,72,72,72],
  'PY5313':[72,72,72,66],'PY5311':[72,72,72,72],
  'BJ5514':[72,66,60,60],'BJ5525':null,'BJ5240':[72,67,60,60],
  'JJ5010':[72,72,72,66],'JJ5050':[72,72,72,66],
  'JP6777':[72,72,72,72],'JP6778':[72,72,72,72],'JP6779':[72,72,72,72],
  'JP6333':[72,72,72,66],'JP6335':[72,72,72,66],'JP6334':[72,72,72,66],'JP6336':[72,72,72,66],
  'JP6870':[72,72,72,72],'JP6872':[72,72,72,72],'JP6874':[72,72,72,72],
  'JP6810':[72,72,60,72],'JP6811':[72,72,60,72],'JP6812':[72,72,72,66],'JP6813':[72,72,60,72],
  'PY6830':[72,72,60,72],'PY6832':[72,72,60,72]
};

// Motor limits: [w72noLiner, w72liner, w96noLiner, w96liner] all are max widths
const MOTOR_LIMITS = {
  'BJ5525':[96,84,72,60],'BB1001':[96,84,72,60],'BB2780':[96,96,96,96],
  'BY4202':[96,96,96,96],'BY4203':[96,96,96,96],'BY4201':[96,96,96,96],
  'BJ4350':[96,96,96,96],'BB2264':[84,72,60,48],
  'BJ5240':[96,96,96,96],'BJ5514':[96,96,96,96],
  'PB5480':[96,96,96,96],'PB5460':[96,96,96,96],'PB5470':[96,96,96,96],
  'PY5510':[96,96,96,96],'PY5530':[96,96,96,96],'PY5520':[96,96,96,96],
  'BB2090':[96,96,96,84],
  'PB4190':[96,96,96,96],'PB4170':[96,96,96,96],'PB4180':[96,96,96,96],'PB4160':[96,96,96,96],
  'PB5420':[96,96,96,96],'PB5440':[96,96,96,96],'PB5430':[96,96,96,96],
  'JJ5010':[96,96,96,96],'JJ5050':[96,96,96,96],
  'PB4212':[96,96,96,96],'PB4210':[96,96,96,96],
  'PP5740':[96,96,96,96],'PP5730':[96,96,96,96],'PP5720':[96,96,96,96],
  'JP6874':[96,96,96,96],'JP6872':[96,96,96,96],'JP6870':[96,96,96,96],
  'BB1268':[96,96,96,96],'BB1266':[96,96,96,96],
  'PB4102':[96,96,96,96],'PB4103':[96,96,96,96],'PB4101':[96,96,96,96],
  'BJ3403':[96,96,96,96],
  'PB4250':[96,96,96,96],'PB4260':[96,96,96,96],'PB4270':[96,96,96,96],
  'PB4383':[96,96,96,72],'PB4373':[96,96,96,72],'PB4363':[96,96,96,72],
  'BB2253':[96,96,84,72],
  'JP6777':[96,96,96,96],'JP6779':[96,96,96,96],'JP6778':[96,96,96,96],
  'PP4703':[96,96,96,96],'PP4705':[96,96,96,96],'PP4706':[96,96,96,96],
  'PP4704':[96,96,96,96],'PP4702':[96,96,96,96],'PP4701':[96,96,96,96],
  'BJ4523':[96,96,96,96],
  'JP6810':[96,96,96,96],'JP6813':[96,96,96,96],'JP6812':[96,96,96,96],'JP6811':[96,96,96,96],
  'PB4240':[96,96,96,96],'PB4220':[96,96,96,96],'PB4230':[96,96,96,96],
  'PY6832':[96,96,96,96],'PY6830':[96,96,96,96],
  'BB1080':[96,84,72,60],
  'PY5313':[96,96,96,96],'PY5311':[96,96,96,96],
  'JP6333':[96,96,96,96],'JP6335':[96,96,96,96],'JP6334':[96,96,96,96],'JP6336':[96,96,96,96]
};

// ── PRICE TABLES ─────────────────────────────────────────────
// Width cols: 24,30,36,42,48,60,72,84,96
// Height rows: 36,42,48,54,60,66,72,78,84,90,96,102,108,114,120
// Plus each-additional-6" row
const W = [24,30,36,42,48,60,72,84,96];
const H = [36,42,48,54,60,66,72,78,84,90,96,102,108,114,120];
const PG = {
  1:{prices:{36:[242,282,319,361,409,499,637,734,937],42:[247,288,326,369,419,511,652,751,957],48:[252,294,334,378,429,524,667,769,977],54:[282,330,376,427,484,592,747,862,1082],60:[287,336,384,435,494,604,762,879,1102],66:[296,348,397,450,504,617,777,896,1122],72:[321,378,433,493,553,678,850,982,1220],78:[326,385,441,502,563,691,865,1000,1240],84:[331,391,448,511,573,703,880,1017,1260],90:[361,428,492,560,629,771,961,1110,1365],96:[366,434,499,569,638,784,976,1128,1385],102:[371,440,506,578,648,796,991,1145,1405],108:[396,471,543,620,697,857,1064,1231,1503],114:[401,477,551,629,707,870,1079,1248,1523],120:[406,484,558,638,717,882,1094,1266,1543]},add6:[9,11,13,16,18,23,27,32,37]},
  2:{prices:{36:[256,299,340,385,434,530,675,778,988],42:[263,307,350,397,447,547,695,802,1015],48:[269,316,360,408,460,564,715,825,1041],54:[301,354,405,460,519,636,800,924,1153],60:[308,363,415,472,533,653,820,947,1180],66:[317,374,428,487,546,669,840,970,1207],72:[343,406,467,533,598,735,919,1062,1311],78:[350,415,477,544,612,751,939,1085,1338],84:[356,423,487,556,625,768,959,1109,1364],90:[389,462,533,608,684,840,1044,1207,1477],96:[395,470,543,620,697,857,1064,1231,1503],102:[402,479,553,632,710,874,1084,1254,1530],108:[428,512,592,677,763,939,1162,1346,1634],114:[435,520,602,689,776,956,1182,1369,1661],120:[441,528,612,701,789,972,1202,1392,1688]},add6:[10,13,16,18,21,26,31,36,41]},
  3:{prices:{36:[309,358,407,462,517,635,796,919,1144],42:[322,374,427,485,543,668,835,964,1196],48:[335,391,446,508,569,700,874,1010,1249],54:[370,432,494,563,630,775,962,1111,1363],60:[383,448,514,585,656,808,1001,1157,1416],66:[396,465,533,608,682,840,1040,1203,1468],72:[422,497,572,654,734,906,1118,1294,1572],78:[435,513,592,677,760,938,1157,1339,1624],84:[448,530,612,699,786,971,1197,1385,1676],90:[483,571,659,754,848,1046,1284,1486,1791],96:[496,588,679,777,874,1078,1324,1532,1843],102:[509,604,699,800,900,1111,1363,1578,1895],108:[535,637,738,845,952,1176,1441,1669,1999],114:[548,653,757,868,978,1209,1480,1714,2051],120:[561,669,777,891,1004,1241,1519,1760,2104]},add6:[14,18,21,24,28,35,42,49,56]},
  4:{prices:{36:[361,420,478,546,610,749,936,1079,1336],42:[379,442,506,578,647,794,990,1143,1409],48:[397,465,533,610,683,840,1045,1207,1482],54:[436,511,586,670,751,923,1142,1318,1608],60:[454,534,614,702,787,968,1197,1382,1681],66:[472,557,641,734,824,1014,1251,1446,1754],72:[501,592,684,784,880,1085,1336,1545,1868],78:[519,615,711,816,917,1130,1391,1609,1941],84:[537,638,738,848,953,1176,1446,1673,2014],90:[576,684,791,908,1021,1259,1543,1785,2140],96:[594,707,819,940,1058,1304,1597,1849,2213],102:[612,730,846,972,1094,1350,1652,1912,2286],108:[641,765,889,1022,1151,1421,1737,2012,2399],114:[659,788,916,1054,1187,1466,1792,2075,2472],120:[677,811,943,1086,1224,1512,1846,2139,2545]},add6:[16,20,24,27,31,39,47,55,63]},
  5:{prices:{36:[394,460,527,602,674,829,1031,1191,1464],42:[418,490,563,644,722,889,1104,1275,1560],48:[442,520,599,686,770,949,1176,1359,1656],54:[482,568,654,749,841,1035,1276,1475,1787],60:[506,598,690,791,889,1095,1348,1559,1883],66:[530,628,726,833,937,1155,1420,1643,1979],72:[559,665,770,885,996,1229,1509,1746,2097],78:[583,695,806,927,1044,1289,1581,1830,2193],84:[607,725,842,969,1092,1349,1653,1915,2289],90:[647,773,897,1032,1162,1434,1753,2030,2420],96:[671,803,933,1074,1210,1495,1825,2114,2517],102:[695,833,969,1116,1258,1555,1897,2199,2613],108:[725,870,1014,1168,1317,1628,1986,2302,2731],114:[749,900,1050,1210,1365,1688,2058,2386,2827],120:[773,930,1086,1252,1413,1748,2130,2470,2923]},add6:[18,22,26,31,35,44,53,62,70]},
  6:{prices:{36:[477,564,651,747,840,1036,1280,1481,1795],42:[511,607,702,807,908,1122,1383,1601,1932],48:[545,649,754,867,977,1207,1485,1720,2068],54:[596,710,825,948,1068,1319,1618,1873,2242],60:[630,753,876,1008,1137,1405,1720,1993,2379],66:[664,796,927,1068,1205,1490,1822,2112,2515],72:[704,846,987,1138,1285,1591,1943,2253,2676],78:[738,889,1039,1198,1354,1676,2045,2373,2813],84:[772,931,1090,1258,1422,1761,2148,2492,2949],90:[823,992,1161,1340,1514,1874,2281,2646,3124],96:[857,1035,1212,1399,1582,1959,2383,2765,3260],102:[891,1078,1263,1459,1650,2044,2485,2884,3396],108:[932,1128,1324,1529,1731,2145,2606,3025,3557],114:[966,1171,1375,1589,1799,2230,2708,3145,3694],120:[1000,1213,1426,1649,1867,2316,2811,3264,3830]},add6:[22,28,33,39,44,56,67,77,89]}
};

// Surcharges by width bracket index (matches W array)
const LOOP_SURCHARGE   = [136,null,156,null,171,187,202,230,242]; // W: 24,30,36,42,48,60,72,84,96
const CORD_SURCHARGE   = [121,null,142,null,162,223,263,289,297];
const TDBU_SURCHARGE   = [156,null,188,null,218,271,323,null,null]; // NA for 84" and 96"
// Liner surcharge tables (privacy) — [w24,w30,w36,w42,w48,w60,w72,w84,w96] per H row
const LINER_P = {
  36:[56,62,70,77,97,128,145,163,179],42:[61,67,76,84,107,140,158,178,197],48:[65,73,82,91,115,151,172,194,215],
  54:[68,77,88,98,125,162,186,210,233],60:[74,83,94,105,134,173,199,226,251],66:[77,87,100,112,142,184,213,241,269],
  72:[81,93,106,119,151,196,226,257,287],78:[109,126,142,158,214,272,311,351,391],84:[113,132,149,166,226,285,328,370,413],
  90:[119,138,156,174,236,299,344,389,435],96:[124,143,163,182,248,312,360,408,457],102:[128,148,170,190,259,327,378,429,479],
  108:[132,154,176,198,270,340,394,448,500],114:[138,160,183,206,281,354,411,467,523],120:[142,166,190,214,292,368,427,486,544]
};
const LINER_BO = {
  36:[66,77,86,96,119,155,178,200,223],42:[72,84,94,106,130,170,196,221,247],48:[77,91,103,116,142,185,213,242,271],
  54:[83,97,110,125,154,199,232,262,294],60:[88,104,118,134,166,214,249,283,318],66:[94,112,126,144,178,229,266,304,341],
  72:[99,118,135,153,189,244,285,325,365],78:[128,150,172,194,261,329,382,435,486],84:[134,158,181,204,275,347,403,459,515],
  90:[141,165,190,214,289,366,424,484,544],96:[147,173,198,225,303,384,446,509,571],102:[152,179,208,236,317,401,468,534,600],
  108:[158,188,216,246,331,419,489,558,628],114:[164,195,225,256,345,436,509,584,657],120:[170,202,234,266,360,454,531,609,685]
};
// Dual shade liner (privacy)
const LINER_DUAL_P = {
  36:[159,173,187,204,244,298,332,363,393],42:[162,177,192,210,252,308,343,375,408],48:[166,181,197,216,259,317,354,388,422],
  54:[169,186,202,222,266,326,365,401,437],60:[173,190,207,228,274,335,376,413,451],66:[176,194,212,234,281,345,387,426,468],
  72:[180,199,218,240,289,354,398,439,485],78:[237,260,283,309,414,502,560,615,670],84:[241,265,289,316,424,514,574,632,689],
  90:[245,270,295,323,434,526,589,648,708],96:[249,275,301,330,443,537,603,665,727],102:[253,280,307,337,453,550,617,682,746],
  108:[257,285,312,344,462,562,632,698,773],114:[261,290,319,351,472,574,646,715,799],120:[265,295,324,358,481,585,660,737,824]
};

// Dual shade liner (blackout)
const LINER_DUAL_BO = {
  36:[177,195,213,234,275,338,378,417,455],42:[182,201,221,244,286,352,395,436,477],
  48:[188,208,229,253,298,366,412,456,500],54:[193,215,237,261,309,380,429,476,522],
  60:[198,221,246,271,320,394,446,495,545],66:[203,228,252,280,331,408,463,515,567],
  72:[208,234,260,289,343,422,480,535,590],78:[273,304,335,371,483,588,664,737,809],
  84:[279,312,345,381,496,606,685,761,838],90:[285,319,354,392,511,623,707,786,866],
  96:[292,327,363,402,525,641,728,812,895],102:[297,335,372,413,540,659,749,836,924],
  108:[304,342,381,424,554,677,771,862,952],114:[309,350,390,435,568,695,793,887,981],
  120:[316,357,399,445,582,713,814,912,1010]
};
// Valance surcharges by group and width bracket [24,36,48,60,72,84,96]
const VAL_W = [24,36,48,60,72,84,96];
const VALANCE_6 = {1:[59,74,94,116,131,152,167],2:[62,79,99,122,139,161,179],3:[81,106,136,169,194,229,255],4:[90,119,154,191,221,260,292],5:[97,130,168,211,245,289,324],6:[110,149,194,241,280,327,366]};
const VALANCE_12 = {1:[96,122,155,185,220,251,279],2:[104,135,171,206,245,281,313],3:[123,165,215,261,312,358,400],4:[139,190,248,302,360,414,465],5:[152,210,275,336,401,462,519],6:[188,263,345,424,506,585,660]};
const VALANCE_18 = {1:[122,160,204,247,293,335,374],2:[135,178,231,280,333,382,428],3:[168,229,298,363,432,497,559],4:[195,270,352,431,513,591,666],5:[218,304,398,487,581,671,757],6:[276,391,514,633,756,875,991]};
// Edge binding surcharges by perimeter length (approx 2W+H)
// We'll use a simple lookup: compute edge length, find bracket in [36,48,60,72,84,96,108,120]
const EB_HALF_FF = [56,64,72,80,91,104,119,131]; // ½" flat/waterfall
const EB_HALF_HB = [73,83,93,104,119,135,155,171]; // ½" hobble
const EB_1H_FF  = [114,130,148,166,191,226,259,292]; // 1.5" flat/waterfall
const EB_1H_HB  = [148,170,192,215,249,294,337,379]; // 1.5" hobble
const EB_LENGTHS = [36,48,60,72,84,96,108,120];

// ── STATE ─────────────────────────────────────────────────────────────────────
const S = {
  style:null, pattern:null, pg:null, sku:null, patternName:null, headrail:null, chain:null,
  w:0, h:0, mount:'inside',
  control:null, liner:'none', linerType:'P', linerColor:'White', linerCode:'2294',
  edge:'none', valance:'standard', qty:1, del:'ship',
  holdDown:false, sideReturn:false, cutOut:false, twoOn1:false,
  accHub:false, accRemote:false, accCharger:false, accSolar:false, accExt:false
};

// ── BUILD PATTERN GRID ────────────────────────────────────────────────────────
function buildPatternGrid(){
  const grid=document.getElementById('pattern-grid');
  grid.innerHTML=GALAXY_PATTERNS.map(([pg,sku,name,hr,chain])=>`
    <div class="pattern-card" data-sku="${sku}" data-name="${name.toLowerCase()}" onclick="pickPattern(this,'${sku}',${pg},'${name}','${hr}','${chain}')">
      <div class="pattern-sku">${sku}</div>
      <div class="pattern-name">${name}</div>
      <div class="pattern-meta"><span class="pg-badge">PG${pg}</span>Headrail: ${hr} · Chain: ${chain}</div>
    </div>`).join('');
}
buildPatternGrid();

function filterPatterns(q){
  q=q.toLowerCase().trim();
  document.querySelectorAll('.pattern-card').forEach(card=>{
    const match=!q||card.dataset.sku.toLowerCase().includes(q)||card.dataset.name.includes(q);
    card.classList.toggle('hidden',!match);
  });
}

// ── STEP HELPERS ──────────────────────────────────────────────────────────────
function toggleStep(id){const el=document.getElementById(id);el.classList.add('active');setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),60);}
function openStep(id){const el=document.getElementById(id);el.classList.add('active');setTimeout(()=>el.scrollIntoView({behavior:'smooth',block:'start'}),80);}
function markDone(id){document.getElementById(id).classList.add('done');}

// ── STEP 1: STYLE ─────────────────────────────────────────────────────────────
function pickStyle(el,key,label){
  document.querySelectorAll('#step1 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.style=key;
  document.getElementById('s1val').textContent=label;
  markDone('step1');
  // Update control availability
  updateControlOptions();
  // Update valance
  updateValanceNote();
  // Re-check pattern compat
  if(S.sku) checkPatternCompat();
  calcPrice();
  const note=document.getElementById('style-compat-note');
  if(key==='hobbled'){note.style.display='block';note.textContent='Hobbled: Cordless and Motorized not available. +30% to base and liner surcharges.';}
  else if(key==='tdbu'){note.style.display='block';note.textContent='TDBU (Flat Fold only): Max 72″W × 72″H. Some patterns are N/A for TDBU — check pattern chart.';}
  else if(key==='motor'){note.style.display='block';note.textContent='Motorized (Flat & Waterfall only): Min 26″W × 36″H. Max width is pattern-specific.';}
  else note.style.display='none';
  // Pre-select control
  if(key==='tdbu'){pickControlByKey('cordless');}
  else if(key==='motor'){pickControlByKey('motor');}
  else if(key==='dual'){pickControlByKey('loop');}
}

// ── STEP 2: PATTERN ───────────────────────────────────────────────────────────
function pickPattern(el,sku,pg,name,hr,chain){
  document.querySelectorAll('.pattern-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.sku=sku; S.pg=pg; S.patternName=name; S.headrail=hr; S.chain=chain;
  document.getElementById('s2val').textContent=name+' ('+sku+')';
  markDone('step2');
  checkPatternCompat();
  calcPrice();
}

function checkPatternCompat(){
  const note=document.getElementById('pattern-compat-note');
  note.style.display='none';
  if(!S.sku||!S.style) return;
  if(S.style==='tdbu'){
    const lim=TDBU_LIMITS[S.sku];
    if(!lim){note.style.display='block';note.textContent='⚠ '+S.patternName+' ('+S.sku+') is NOT available as TDBU. Please choose a different pattern or style.';}
    else{note.style.display='block';note.className='msg-info';note.textContent='TDBU limits for this pattern: Without liner max '+lim[0]+'″W × '+lim[1]+'″H; With liner max '+lim[2]+'″W × '+lim[3]+'″H.';}
  }
  if(S.style==='motor'||S.control==='motor'){
    const ml=MOTOR_LIMITS[S.sku];
    if(ml){note.style.display='block';note.className='msg-info';note.textContent='Motor limits: 72″ drop — '+ml[0]+'″W (no liner), '+ml[1]+'″W (with liner). 96″ drop — '+ml[2]+'″W (no liner), '+ml[3]+'″W (with liner).';}
  }
}

// ── STEP 3: DIMENSIONS ────────────────────────────────────────────────────────
function pickMount(el,key){
  document.querySelectorAll('#step3 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.mount=key;
  calcPrice();
}

// ── STEP 4: CONTROL ───────────────────────────────────────────────────────────
function updateControlOptions(){
  const hobble=(S.style==='hobbled');
  const tdbu=(S.style==='tdbu');
  const motor=(S.style==='motor');
  const dual=(S.style==='dual');
  document.getElementById('ctrl-loop').classList.toggle('disabled',motor||tdbu);
  document.getElementById('ctrl-cordless').classList.toggle('disabled',hobble||motor);
  document.getElementById('ctrl-motor').classList.toggle('disabled',hobble||tdbu||dual);
  // If the currently-selected control just became disabled by the style change, clear it.
  if(S.control){
    var cur=document.getElementById('ctrl-'+S.control);
    if(cur&&cur.classList.contains('disabled')){
      S.control='';cur.classList.remove('sel');
      document.getElementById('s4val').textContent='—';
      var ma=document.getElementById('motor-accessories'); if(ma) ma.style.display='none';
    }
  }
}

function pickControl(el,key){
  if(el.classList.contains('disabled')) return;
  document.querySelectorAll('#step4 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  pickControlByKey(key);
}

function pickControlByKey(key){
  S.control=key;
  // Highlight the matching control button (this is also called programmatically from pickStyle).
  document.querySelectorAll('#step4 .opt-btn').forEach(c=>c.classList.remove('sel'));
  var _cb=document.getElementById('ctrl-'+key); if(_cb) _cb.classList.add('sel');
  const label={loop:'Loop Control',cordless:'Cordless',motor:'Motorized'}[key]||key;
  document.getElementById('s4val').textContent=label;
  markDone('step4');
  document.getElementById('motor-accessories').style.display=(key==='motor')?'block':'none';
  const note=document.getElementById('ctrl-note');
  if(key==='loop'){note.style.display='block';note.textContent='Metal bead chain ('+( S.chain||'Stainless')+') matches your pattern. Rollease loop control included.';}
  else if(key==='motor'){note.style.display='block';note.textContent='Rollease Acmeda Automate ARC-12V Li-ion motor. Min 26″W × 36″H. Check pattern motor limits.';}
  else note.style.display='none';
  checkPatternCompat();
  calcPrice();
}

// ── STEP 5: LINER ─────────────────────────────────────────────────────────────
function pickLiner(el,type,label,code){
  document.querySelectorAll('#step5 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.liner=type;
  document.getElementById('s5val').textContent=label;
  document.getElementById('liner-color-section').style.display=(type==='none')?'none':'block';
  // Update codes shown
  const suffix=type==='blackout'?'BO':(type==='privacy'?'P':'');
  ['2294','2277','2290','2291','2273'].forEach((c,i)=>{
    const ids=['white','nat','cream','teak','gray'];
    const el2=document.getElementById('lc-'+ids[i]+'-code');
    if(el2&&suffix) el2.textContent=c+suffix;
  });
  if(type==='none') markDone('step5');
  calcPrice();
}

function pickLinerColor(el,name,code){
  document.querySelectorAll('#liner-color-section .liner-card').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.linerColor=name; S.linerCode=code;
  markDone('step5');
  calcPrice();
}

// ── STEP 6: EDGE BINDING ─────────────────────────────────────────────────────
function pickEdge(el,key,label){
  document.querySelectorAll('#step6 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.edge=key;
  document.getElementById('s6val').textContent=label;
  markDone('step6');
  calcPrice();
}

// ── STEP 7: VALANCE ───────────────────────────────────────────────────────────
function updateValanceNote(){
  const note=document.getElementById('valance-standard-note');
  if(S.style==='waterfall'){note.style.display='block';note.textContent='Waterfall: 4″ back valance included.';}
  else if(S.style==='flat'||S.style==='hobbled'||S.style==='tdbu'){note.style.display='block';note.textContent='Flat/Hobbled: 6″ front valance included.';}
  else note.style.display='none';
}

function pickValance(el,key,label){
  document.querySelectorAll('#step7 .opt-btn').forEach(c=>c.classList.remove('sel'));
  el.classList.add('sel');
  S.valance=key;
  document.getElementById('s7val').textContent=label;
  markDone('step7');
  calcPrice();
}

// ── ACCESSORIES ───────────────────────────────────────────────────────────────
function toggleAddon(el,key){
  el.classList.toggle('sel');
  S[key]=el.classList.contains('sel');
  const check=el.querySelector('.addon-check');
  if(check) check.style.color=S[key]?'#111110':'transparent';
  calcPrice();
}

// ── STEP 9 ────────────────────────────────────────────────────────────────────
function pickDel(btn,key){
  document.querySelectorAll('.delivery-opt-card').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel');
  S.del=key;
      calcPrice();
}

// ── PRICE LOOKUP HELPERS ──────────────────────────────────────────────────────
function lookupW(arr,w){return arr.find(v=>v>=w)||null;}
function wIdx(w){const wc=lookupW(W,w);return wc?W.indexOf(wc):-1;}
function hIdx(h){
  for(let i=0;i<H.length;i++) if(h<=H[i]) return {row:H[i],idx:i,extraSix:0};
  // Over 120: extraSix
  const over=h-120;
  const extra=Math.ceil(over/6);
  return {row:120,idx:H.length-1,extraSix:extra};
}

function lookupSurcharge(arr,w){
  const wi=wIdx(w);
  return (wi>=0&&arr[wi]!=null)?arr[wi]:null;
}
function lookupValW(w){return VAL_W.find(v=>v>=w)||VAL_W[VAL_W.length-1];}
function valWIdx(w){const v=lookupValW(w);return VAL_W.indexOf(v);}

// ── MAIN CALC ─────────────────────────────────────────────────────────────────
function calcPrice(){
  S.w=parseFloat(document.getElementById('w-whole').value)||0;
  S.h=parseFloat(document.getElementById('h-whole').value)||0;
  S.qty=parseInt(document.getElementById('qty').value)||1;
  document.getElementById('s9val').textContent=S.qty+' shade'+(S.qty>1?'s':'');

  const dimMsg=document.getElementById('dim-msg');
  const sizeInfo=document.getElementById('size-info');
  dimMsg.style.display='none'; sizeInfo.style.display='none';

  if(!S.w||!S.h){updateQuote();return;}

  // validate
  const maxW=(S.style==='tdbu')?72:96;
  const maxH=(S.style==='tdbu')?72:120;
  const minW=(S.style==='motor')?26:18;
  const minH=(S.style==='motor')?36:24;

  if(S.w<minW||S.h<minH||S.w>maxW||S.h>maxH){
    dimMsg.className='msg-box msg-err';
    dimMsg.textContent='Size out of range for this style. Width: '+minW+'″–'+maxW+'″, Height: '+minH+'″–'+maxH+'″.';
    dimMsg.style.display='block';
    updateQuote();return;
  }

  // TDBU pattern check
  if(S.style==='tdbu'&&S.sku){
    const lim=TDBU_LIMITS[S.sku];
    if(!lim){dimMsg.className='msg-box msg-err';dimMsg.textContent='Pattern '+S.sku+' is not available for TDBU.';dimMsg.style.display='block';updateQuote();return;}
    const hasLiner=S.liner!=='none';
    const mW=hasLiner?lim[2]:lim[0];
    const mH=hasLiner?lim[3]:lim[1];
    if(S.w>mW||S.h>mH){dimMsg.className='msg-box msg-err';dimMsg.textContent='TDBU limit exceeded for '+S.sku+(hasLiner?' with liner':'')+': max '+mW+'″W × '+mH+'″H.';dimMsg.style.display='block';updateQuote();return;}
  }

  // Motor pattern check
  if((S.style==='motor'||S.control==='motor')&&S.sku){
    const ml=MOTOR_LIMITS[S.sku];
    if(ml){
      const hasLiner=S.liner!=='none';
      const drop=(S.h<=72)?'72':'96';
      const maxMW=hasLiner?(drop==='72'?ml[1]:ml[3]):(drop==='72'?ml[0]:ml[2]);
      if(S.w>maxMW){dimMsg.className='msg-box msg-err';dimMsg.textContent='Motor width limit for '+S.sku+': max '+maxMW+'″ wide ('+drop+'″ drop, '+(hasLiner?'with':'no')+' liner).';dimMsg.style.display='block';updateQuote();return;}
    }
  }

  document.getElementById('s3val').textContent=S.w+'″ × '+S.h+'″ '+S.mount;
  markDone('step3');

  sizeInfo.style.display='block';
  sizeInfo.textContent='Width rounds to '+( lookupW(W,S.w)||'96')+'″ bracket for pricing.';
  updateQuote();
}

function updateQuote(){
  const qty=S.qty||1;
  const ready=S.pg&&S.style&&S.control&&S.w&&S.h;
  if(!ready){document.getElementById('qp-pending').style.display='block';document.getElementById('qp-detail').style.display='none';return;}

  const dimMsg=document.getElementById('dim-msg');
  if(dimMsg.style.display==='block'&&dimMsg.classList.contains('msg-err')){
    document.getElementById('qp-pending').style.display='block';
    document.getElementById('qp-pending').textContent='Fix the size error to see your estimate.';
    document.getElementById('qp-detail').style.display='none';return;
  }

  const wi=wIdx(S.w); if(wi<0){document.getElementById('qp-pending').style.display='block';document.getElementById('qp-detail').style.display='none';return;}
  const {row:hrow,extraSix}=hIdx(S.h);
  const pgData=PG[S.pg];
  let base=pgData.prices[hrow][wi];
  if(extraSix>0) base+=extraSix*pgData.add6[wi];

  // hobbled
  const isHobbled=(S.style==='hobbled');
  const hobbleAdd=isHobbled?Math.round(base*0.30):0;
  let total=base+hobbleAdd;

  // control surcharge
  let ctrlAdd=0;
  if(S.control==='loop') ctrlAdd=lookupSurcharge(LOOP_SURCHARGE,S.w)||0;
  else if(S.control==='cordless'&&S.style!=='tdbu') ctrlAdd=lookupSurcharge(CORD_SURCHARGE,S.w)||0;
  else if(S.style==='tdbu') ctrlAdd=lookupSurcharge(TDBU_SURCHARGE,S.w)||0;
  total+=ctrlAdd;

  // motor base (unit price)
  const motorBase=(S.control==='motor'||S.style==='motor')?515:0;
  total+=motorBase;

  // liner
  let linerAdd=0;
  if(S.liner!=='none'){
    let ltable=(S.style==='dual')?(S.liner==='blackout'?LINER_DUAL_BO:LINER_DUAL_P):(S.liner==='blackout'?LINER_BO:LINER_P);
    const row=ltable[hrow];
    if(row) linerAdd=row[wi]||0;
    if(isHobbled) linerAdd=Math.round(linerAdd*1.30);
  }
  total+=linerAdd;

  // edge binding
  let edgeAdd=0;
  if(S.edge!=='none'){
    // approximate perimeter: 2*W + H
    const perim=Math.round(2*S.w+S.h);
    const eBrk=EB_LENGTHS.find(l=>l>=perim)||120;
    const eIdx=EB_LENGTHS.indexOf(eBrk);
    const arr=(S.edge==='half')?(isHobbled?EB_HALF_HB:EB_HALF_FF):(isHobbled?EB_1H_HB:EB_1H_FF);
    edgeAdd=arr[eIdx]||arr[arr.length-1];
  }
  total+=edgeAdd;

  // valance upgrade
  let valAdd=0;
  if(S.valance==='classic6'){const vi=valWIdx(S.w);valAdd=(VALANCE_6[S.pg]||[])[vi]||0;}
  else if(S.valance==='double12'){const vi=valWIdx(S.w);valAdd=(VALANCE_12[S.pg]||[])[vi]||0;}
  else if(S.valance==='triple18'){const vi=valWIdx(S.w);valAdd=(VALANCE_18[S.pg]||[])[vi]||0;}
  total+=valAdd;

  // motor accessories
  let motorAccAdd=0;
  if(S.accHub) motorAccAdd+=416;
  if(S.accRemote) motorAccAdd+=68;
  if(S.accCharger) motorAccAdd+=52;
  if(S.accSolar) motorAccAdd+=130;
  if(S.accExt) motorAccAdd+=21;
  total+=motorAccAdd;

  // freight
  let freight=0;
  if(S.del==='ship'){
    freight=25+(qty-1)*8;
    if(S.w>=90) freight+=80*qty;
  }

  const grandTotal=total*qty+freight;

  // display
  document.getElementById('qp-pending').style.display='none';
  document.getElementById('qp-detail').style.display='block';
  document.getElementById('qr-style').textContent=({waterfall:'Waterfall',flat:'Flat Fold',hobbled:'Hobbled',tdbu:'TDBU Cordless',motor:'Motorized',dual:'Dual Shade'}[S.style])||S.style;
  document.getElementById('qr-pattern').textContent=S.patternName+' ('+S.sku+') PG'+S.pg;
  document.getElementById('qr-size').textContent=S.w+'″ × '+S.h+'″ '+S.mount;
  document.getElementById('qr-ctrl').textContent=({loop:'Loop / '+S.chain,cordless:'Cordless',motor:'Motorized (Rollease Acmeda)'}[S.control])||S.control;
  document.getElementById('qr-liner').textContent=S.liner==='none'?'None':(S.liner==='privacy'?'Privacy':'Blackout')+' — '+S.linerColor;
  document.getElementById('qr-qty').textContent=qty+' shade'+(qty>1?'s':'');
  document.getElementById('qr-base').textContent='$'+base.toLocaleString();

  const sr=(id,show,val)=>{document.getElementById(id).style.display=show?'flex':'none';if(val)document.getElementById(id.replace('-row','-s')).textContent=val;};
  sr('qr-ctrl-row',ctrlAdd>0,'$'+ctrlAdd);
  sr('qr-hobble-row',isHobbled,'$'+hobbleAdd+' (+30%)');
  sr('qr-liner-row',linerAdd>0,'$'+linerAdd);
  sr('qr-edge-row',edgeAdd>0,'$'+edgeAdd);
  sr('qr-valance-row',valAdd>0,'$'+valAdd);
  sr('qr-motor-row',motorBase>0,'$'+motorBase+' motor'+( motorAccAdd>0?' + $'+motorAccAdd+' accessories':''));
  document.getElementById('qr-sub').textContent='$'+(total).toLocaleString()+'/shade';
  sr('qr-freight-row',freight>0,'$'+freight);
  document.getElementById('qr-total').textContent='$'+Math.round(grandTotal).toLocaleString();
}

// ── SUBMIT ────────────────────────────────────────────────────────────────────
function addGalaxyToCart(){
  if(!S.patternName){ alert('Please select a pattern before adding to cart.'); return; }
  if(!S.w||!S.h){ alert('Please enter valid dimensions before adding to cart.'); return; }

  const totalEl=document.getElementById('qr-total');
  const priceText=totalEl?totalEl.textContent.trim():'';
  const price=priceText?parseFloat(priceText.replace(/[^0-9.]/g,''))||null:null;
  const qty=S.qty||1;

  const styleLabel={waterfall:'Waterfall',flat:'Flat Fold',hobbled:'Hobbled',tdbu:'TDBU Cordless',motor:'Motorized',dual:'Dual Shade'}[S.style]||S.style||'—';
  const ctrlLabel={loop:'Loop Control',cordless:'Cordless',motor:'Motorized'}[S.control]||S.control||'—';
  const linerLabel=S.liner==='none'?'No liner':(S.liner==='privacy'?'Privacy':'Blackout')+' liner';
  const edgeLabel={none:'None',half:'½″ Twill',one5:'1½″ Twill'}[S.edge]||'None';
  const valLabel={standard:'Standard (included)',classic6:'6″ Classic',double12:'12″ Double Hobble',triple18:'18″ Triple Hobble'}[S.valance]||'—';

  const lines=[
    {label:'Product',value:'Wallace Galaxy Woven Wood Shades'},
    {label:'Pattern',value:S.patternName+(S.sku?' ('+S.sku+')':'')},
    {label:'Price Group',value:S.pg||'—'},
    {label:'Style',value:styleLabel},
    {label:'Mount',value:S.mount==='inside'?'Inside mount':'Outside mount'},
    {label:'Width',value:(S.w||'—')+'″'},
    {label:'Height',value:(S.h||'—')+'″'},
    {label:'Control',value:ctrlLabel},
    {label:'Liner',value:linerLabel},
    {label:'Edge Binding',value:edgeLabel},
    {label:'Valance',value:valLabel},
    {label:'Quantity',value:String(qty)}
  ];
  const specs=lines.map(l=>l.label+': '+l.value).join(' | ');
  pbAddToCart({product:'Wallace Galaxy Woven Wood Shades',lines:lines,specs:specs,price:price,qty:qty});
  pbOpenCart();
}

function submitQuote(){
  const name=document.getElementById('cf-name').value.trim();
  const phone=document.getElementById('cf-phone').value.trim();
  const err=document.getElementById('cf-contact-err');
  if(!name||!phone){err.textContent='Please enter your name and phone number.';err.style.display='block';return;}
  err.style.display='none';

  const qty=S.qty||1;
  const styleLabel={waterfall:'Waterfall',flat:'Flat Fold',hobbled:'Hobbled',tdbu:'TDBU Cordless',motor:'Motorized',dual:'Dual Shade'}[S.style]||S.style||'—';
  const ctrlLabel={loop:'Loop Control (chain: '+(S.chain||'—')+')',cordless:'Cordless',motor:'Motorized — Rollease Acmeda ARC-12V'}[S.control]||S.control||'—';
  const linerLabel=S.liner==='none'?'No liner':(S.liner==='privacy'?'Privacy':'Blackout')+' liner — '+S.linerColor+' (code: '+S.linerCode+(S.liner==='blackout'?'BO':'P')+')';

  const accs=[];
  if(S.holdDown) accs.push('Hold down clips');
  if(S.sideReturn) accs.push('Side returns');
  if(S.cutOut) accs.push('Cut-outs needed — see notes');
  if(S.twoOn1) accs.push('2-on-1 headrail');

  const motorAccs=[];
  if(S.accHub) motorAccs.push('Pulse 2 Hub ($416)');
  if(S.accRemote) motorAccs.push('15-Ch RF Remote ($68)');
  if(S.accCharger) motorAccs.push('Li-Ion Charger ($52)');
  if(S.accSolar) motorAccs.push('Solar Panel ($130)');
  if(S.accExt) motorAccs.push('Extension Cable 1.2M ($21)');

  const lines=[
    'WALLACE GALAXY WOVEN WOODS QUOTE REQUEST',
    '',
    'Product: Wallace Galaxy Woven Woods Natural Shade',
    'Pattern: '+(S.patternName||'—')+' ('+( S.sku||'—')+')',
    'Price Group: '+(S.pg||'—'),
    'Headrail color: '+(S.headrail||'—'),
    'Chain color: '+(S.chain||'—'),
    '',
    'Style: '+styleLabel,
    'Width: '+(S.w||'—')+'″',
    'Height: '+(S.h||'—')+'″',
    'Mount: '+(S.mount==='inside'?'Inside mount':'Outside mount'),
    'Quantity: '+qty,
    '',
    'Control: '+ctrlLabel,
    'Liner: '+linerLabel,
    'Edge binding: '+({none:'None',half:'½″ Twill',one5:'1½″ Twill'}[S.edge]||'None'),
    'Valance: '+({standard:'Standard (included)',classic6:'6″ Classic',double12:'12″ Double Hobble',triple18:'18″ Triple Hobble'}[S.valance]||'—'),
    '',
    'Motor accessories: '+(motorAccs.length?motorAccs.join(', '):'None'),
    'Accessories: '+(accs.length?accs.join(', '):'None'),
    '',
    'Delivery: '+'Ship to me (UPS/FedEx)',
    '',
    'Notes: '+(document.getElementById('cf-notes').value.trim()||'None'),
    '',
    'CUSTOMER:',
    'Name: '+name,
    'Phone: '+phone,
    'Email: '+(document.getElementById('cf-email').value.trim()||'—'),
    '',
    'Pricing is an internal estimate only. Final price confirmed with current Wallace Galaxy price book.'
  ];

  window.location.href='mailto:blindznation@gmail.com?subject='+encodeURIComponent('Galaxy Woven Woods Quote — '+name)+'&body='+encodeURIComponent(lines.join('\n'));
  document.getElementById('success-box').style.display='block';
}

// Init: set mount default
document.getElementById('mc-inside').classList.add('sel');
