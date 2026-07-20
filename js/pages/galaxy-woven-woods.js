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
const PG = {1:{prices:{36:[269,313,354,401,454,554,707,815,1040],42:[274,320,362,410,465,567,724,834,1062],48:[280,326,371,420,476,582,740,854,1084],54:[313,366,417,474,537,657,829,957,1201],60:[319,373,426,483,548,670,846,976,1223],66:[329,386,441,500,559,685,862,995,1245],72:[356,420,481,547,614,753,944,1090,1354],78:[362,427,490,557,625,767,960,1110,1376],84:[367,434,497,567,636,780,977,1129,1399],90:[401,475,546,622,698,856,1067,1232,1515],96:[406,482,554,632,708,870,1083,1252,1537],102:[412,488,562,642,719,884,1100,1271,1560],108:[440,523,603,688,774,951,1181,1366,1668],114:[445,529,612,698,785,966,1198,1385,1691],120:[451,537,619,708,796,979,1214,1405,1713]},add6:[10,12,14,18,20,26,30,36,41]},2:{prices:{36:[284,332,377,427,482,588,749,864,1097],42:[292,341,389,441,496,607,771,890,1127],48:[299,351,400,453,511,626,794,916,1156],54:[334,393,450,511,576,706,888,1026,1280],60:[342,403,461,524,592,725,910,1051,1310],66:[352,415,475,541,606,743,932,1077,1340],72:[381,451,518,592,664,816,1020,1179,1455],78:[389,461,529,604,679,834,1042,1204,1485],84:[395,470,541,617,694,852,1064,1231,1514],90:[432,513,592,675,759,932,1159,1340,1639],96:[438,522,603,688,774,951,1181,1366,1668],102:[446,532,614,702,788,970,1203,1392,1698],108:[475,568,657,751,847,1042,1290,1494,1814],114:[483,577,668,765,861,1061,1312,1520,1844],120:[490,586,679,778,876,1079,1334,1545,1874]},add6:[11,14,18,20,23,29,34,40,46]},3:{prices:{36:[343,397,452,513,574,705,884,1020,1270],42:[357,415,474,538,603,741,927,1070,1328],48:[372,434,495,564,632,777,970,1121,1386],54:[411,480,548,625,699,860,1068,1233,1513],60:[425,497,571,649,728,897,1111,1284,1572],66:[440,516,592,675,757,932,1154,1335,1629],72:[468,552,635,726,815,1006,1241,1436,1745],78:[483,569,657,751,844,1041,1284,1486,1803],84:[497,588,679,776,872,1078,1329,1537,1860],90:[536,634,731,837,941,1161,1425,1649,1988],96:[551,653,754,862,970,1197,1470,1701,2046],102:[565,670,776,888,999,1233,1513,1752,2103],108:[594,707,819,938,1057,1305,1600,1853,2219],114:[608,725,840,963,1086,1342,1643,1903,2277],120:[623,743,862,989,1114,1378,1686,1954,2335]},add6:[16,20,23,27,31,39,47,54,62]},4:{prices:{36:[401,466,531,606,677,831,1039,1198,1483],42:[421,491,562,642,718,881,1099,1269,1564],48:[441,516,592,677,758,932,1160,1340,1645],54:[484,567,650,744,834,1025,1268,1463,1785],60:[504,593,682,779,874,1074,1329,1534,1866],66:[524,618,712,815,915,1126,1389,1605,1947],72:[556,657,759,870,977,1204,1483,1715,2073],78:[576,683,789,906,1018,1254,1544,1786,2155],84:[596,708,819,941,1058,1305,1605,1857,2236],90:[639,759,878,1008,1133,1397,1713,1981,2375],96:[659,785,909,1043,1174,1447,1773,2052,2456],102:[679,810,939,1079,1214,1499,1834,2122,2537],108:[712,849,987,1134,1278,1577,1928,2233,2663],114:[731,875,1017,1170,1318,1627,1989,2303,2744],120:[751,900,1047,1205,1359,1678,2049,2374,2825]},add6:[18,22,27,30,34,43,52,61,70]},5:{prices:{36:[437,511,585,668,748,920,1144,1322,1625],42:[464,544,625,715,801,987,1225,1415,1732],48:[491,577,665,761,855,1053,1305,1508,1838],54:[535,630,726,831,934,1149,1416,1637,1984],60:[562,664,766,878,987,1215,1496,1730,2090],66:[588,697,806,925,1040,1282,1576,1824,2197],72:[620,738,855,982,1106,1364,1675,1938,2328],78:[647,771,895,1029,1159,1431,1755,2031,2434],84:[674,805,935,1076,1212,1497,1835,2126,2541],90:[718,858,996,1146,1290,1592,1946,2253,2686],96:[745,891,1036,1192,1343,1659,2026,2347,2794],102:[771,925,1076,1239,1396,1726,2106,2441,2900],108:[805,966,1126,1296,1462,1807,2204,2555,3031],114:[831,999,1166,1343,1515,1874,2284,2648,3138],120:[858,1032,1205,1390,1568,1940,2364,2742,3245]},add6:[20,24,29,34,39,49,59,69,78]},6:{prices:{36:[529,626,723,829,932,1150,1421,1644,1992],42:[567,674,779,896,1008,1245,1535,1777,2145],48:[605,720,837,962,1084,1340,1648,1909,2295],54:[662,788,916,1052,1185,1464,1796,2079,2489],60:[699,836,972,1119,1262,1560,1909,2212,2641],66:[737,884,1029,1185,1338,1654,2022,2344,2792],72:[781,939,1096,1263,1426,1766,2157,2501,2970],78:[819,987,1153,1330,1503,1860,2270,2634,3122],84:[857,1033,1210,1396,1578,1955,2384,2766,3273],90:[914,1101,1289,1487,1681,2080,2532,2937,3468],96:[951,1149,1345,1553,1756,2174,2645,3069,3619],102:[989,1197,1402,1619,1832,2269,2758,3201,3770],108:[1035,1252,1470,1697,1921,2381,2893,3358,3948],114:[1072,1300,1526,1764,1997,2475,3006,3491,4100],120:[1110,1346,1583,1830,2072,2571,3120,3623,4251]},add6:[24,31,37,43,49,62,74,85,99]}};

// Surcharges by width bracket index (matches W array)
const LOOP_SURCHARGE   = [151,null,173,null,190,208,224,255,269]; // W: 24,30,36,42,48,60,72,84,96
const CORD_SURCHARGE   = [134,null,158,null,180,248,292,321,330];
const TDBU_SURCHARGE   = [173,null,209,null,242,301,359,null,null]; // NA for 84" and 96"
// Liner surcharge tables (privacy) — [w24,w30,w36,w42,w48,w60,w72,w84,w96] per H row
const LINER_P = {36:[62,69,78,85,108,142,161,181,199],42:[68,74,84,93,119,155,175,198,219],48:[72,81,91,101,128,168,191,215,239],54:[75,85,98,109,139,180,206,233,259],60:[82,92,104,117,149,192,221,251,279],66:[85,97,111,124,158,204,236,268,299],72:[90,103,118,132,168,218,251,285,319],78:[121,140,158,175,238,302,345,390,434],84:[125,147,165,184,251,316,364,411,458],90:[132,153,173,193,262,332,382,432,483],96:[138,159,181,202,275,346,400,453,507],102:[142,164,189,211,287,363,420,476,532],108:[147,171,195,220,300,377,437,497,555],114:[153,178,203,229,312,393,456,518,581],120:[158,184,211,238,324,408,474,539,604]};
const LINER_BO = {36:[73,85,95,107,132,172,198,222,248],42:[80,93,104,118,144,189,218,245,274],48:[85,101,114,129,158,205,236,269,301],54:[92,108,122,139,171,221,258,291,326],60:[98,115,131,149,184,238,276,314,353],66:[104,124,140,160,198,254,295,337,379],72:[110,131,150,170,210,271,316,361,405],78:[142,167,191,215,290,365,424,483,539],84:[149,175,201,226,305,385,447,509,572],90:[157,183,211,238,321,406,471,537,604],96:[163,192,220,250,336,426,495,565,634],102:[169,199,231,262,352,445,519,593,666],108:[175,209,240,273,367,465,543,619,697],114:[182,216,250,284,383,484,565,648,729],120:[189,224,260,295,400,504,589,676,760]};
// Dual shade liner (privacy)
const LINER_DUAL_P = {36:[176,192,208,226,271,331,369,403,436],42:[180,196,213,233,280,342,381,416,453],48:[184,201,219,240,287,352,393,431,468],54:[188,206,224,246,295,362,405,445,485],60:[192,211,230,253,304,372,417,458,501],66:[195,215,235,260,312,383,430,473,519],72:[200,221,242,266,321,393,442,487,538],78:[263,289,314,343,460,557,622,683,744],84:[268,294,321,351,471,571,637,702,765],90:[272,300,327,359,482,584,654,719,786],96:[276,305,334,366,492,596,669,738,807],102:[281,311,341,374,503,611,685,757,828],108:[285,316,346,382,513,624,702,775,858],114:[290,322,354,390,524,637,717,794,887],120:[294,327,360,397,534,649,733,818,915]};

// Dual shade liner (blackout)
const LINER_DUAL_BO = {36:[196,216,236,260,305,375,420,463,505],42:[202,223,245,271,317,391,438,484,529],48:[209,231,254,281,331,406,457,506,555],54:[214,239,263,290,343,422,476,528,579],60:[220,245,273,301,355,437,495,549,605],66:[225,253,280,311,367,453,514,572,629],72:[231,260,289,321,381,468,533,594,655],78:[303,337,372,412,536,653,737,818,898],84:[310,346,383,423,551,673,760,845,930],90:[316,354,393,435,567,692,785,872,961],96:[324,363,403,446,583,712,808,901,993],102:[330,372,413,458,599,731,831,928,1026],108:[337,380,423,471,615,751,856,957,1057],114:[343,389,433,483,630,771,880,985,1089],120:[351,396,443,494,646,791,904,1012,1121]};
// Valance surcharges by group and width bracket [24,36,48,60,72,84,96]
const VAL_W = [24,36,48,60,72,84,96];
const VALANCE_6 = {1:[65,82,104,129,145,169,185],2:[69,88,110,135,154,179,199],3:[90,118,151,188,215,254,283],4:[100,132,171,212,245,289,324],5:[108,144,186,234,272,321,360],6:[122,165,215,268,311,363,406]};
const VALANCE_12 = {1:[107,135,172,205,244,279,310],2:[115,150,190,229,272,312,347],3:[137,183,239,290,346,397,444],4:[154,211,275,335,400,460,516],5:[169,233,305,373,445,513,576],6:[209,292,383,471,562,649,733]};
const VALANCE_18 = {1:[135,178,226,274,325,372,415],2:[150,198,256,311,370,424,475],3:[186,254,331,403,480,552,620],4:[216,300,391,478,569,656,739],5:[242,337,442,541,645,745,840],6:[306,434,571,703,839,971,1100]};
// Edge binding surcharges by perimeter length (approx 2W+H)
// We'll use a simple lookup: compute edge length, find bracket in [36,48,60,72,84,96,108,120]
const EB_HALF_FF = [62,71,80,89,101,115,132,145]; // ½" flat/waterfall
const EB_HALF_HB = [81,92,103,115,132,150,172,190]; // ½" hobble
const EB_1H_FF  = [127,144,164,184,212,251,287,324]; // 1.5" flat/waterfall
const EB_1H_HB  = [164,189,213,239,276,326,374,421]; // 1.5" hobble
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
var _galaxyFilter='';
function buildPatternGrid(){
  const grid=document.getElementById('pattern-grid');
  var pats=GALAXY_PATTERNS.filter(function(p){ var sku=p[1].toLowerCase(), name=p[2].toLowerCase(); return !_galaxyFilter || sku.indexOf(_galaxyFilter)>=0 || name.indexOf(_galaxyFilter)>=0; });
  // Consistent shared picker: patterns grouped into price-group sections (data unchanged).
  if(window.pbFabricPicker){
    var byPg={};
    pats.forEach(function(p){ var pg=p[0]; if(!byPg[pg]) byPg[pg]={pg:pg,colors:[]}; byPg[pg].colors.push({n:p[2], c:p[1]}); });
    var collections=Object.keys(byPg).map(function(k){ return {type:'woven', pg:byPg[k].pg, name:'', colors:byPg[k].colors}; });
    pbFabricPicker.render('pattern-grid', {
      hideTabs:true, showPriceGroups:true,
      types:[{key:'woven',label:'Pattern'}],
      collections:collections,
      onSelect:function(sel){ pickGalaxyPattern(sel.code); }
    });
    if(S.sku){ grid.querySelectorAll('.pbfp-sw').forEach(function(b){ if(b.title===S.sku) b.classList.add('sel'); }); }
    return;
  }
  // Fallback — original cards
  grid.innerHTML=pats.map(function(t){ var pg=t[0],sku=t[1],name=t[2],hr=t[3],chain=t[4];
    return '<div class="pattern-card" data-sku="'+sku+'" data-name="'+name.toLowerCase()+'" onclick="pickPattern(this,\''+sku+'\','+pg+',\''+name+'\',\''+hr+'\',\''+chain+'\')">'+
      '<div class="pattern-sku">'+sku+'</div><div class="pattern-name">'+name+'</div>'+
      '<div class="pattern-meta"><span class="pg-badge">PG'+pg+'</span>Headrail: '+hr+' · Chain: '+chain+'</div></div>';
  }).join('');
}
buildPatternGrid();

function filterPatterns(q){
  _galaxyFilter=(q||'').toLowerCase().trim();
  buildPatternGrid();
}

// Select a pattern from the shared picker (mirrors pickPattern without the clicked element)
function pickGalaxyPattern(sku){
  var t=GALAXY_PATTERNS.find(function(p){return p[1]===sku;});
  if(!t) return;
  S.sku=t[1]; S.pg=t[0]; S.patternName=t[2]; S.headrail=t[3]; S.chain=t[4];
  document.getElementById('s2val').textContent=t[2]+' ('+t[1]+')';
  markDone('step2');
  checkPatternCompat();
  calcPrice();
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
    freight=25+(qty-1)*10;
    if(S.w>=90||S.h>=90) freight+=80*qty;
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
