// ── STATE ─────────────────────────────────────────────────────────────────────
var S = {
  qty:1, room:'', mount:'inside', width:0, length:0,
  shadeStyle:'', panelStyle:'',
  fabric:null, liner:'LF03', linerLabel:'Light Filtering Ivory',
  alignment:'top', control:'', motorType:'', controlSide:'Left',
  returns:'none', returnDepth:4.5,
  twoOn1:false, width2:0,
  cutFabric:false, delivery:'ship'
};

// ── FABRIC DATA ───────────────────────────────────────────────────────────────
// Source: Wallace - Portfolio Fabric Roman Shades.pdf — extracted 2026-05-16
// All codes, colors, compositions, and specs verified from PDF pages 3-5
// [1] = not available in Flat panel style
// TDBU availability per PDF materials table
// Blank color names below: PDF text extraction could not resolve — marked "PDF CONFIRM"
var FABRICS = [
  // ── GROUP A ───────────────────────────────────────────────────────────────
  // Alese — [1] No Flat — 85% Poly 15% Cotton Linen — TDBU Y
  {code:'ASE01',pattern:'Alese',color:'Cashew',      priceGroup:'A',noFlat:true,composition:'85% Polyester, 15% Cotton Linen',weightGsm:350,cordLoopColor:'Beige', tdbuAvailable:true, fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#D4B896'},
  {code:'ASE02',pattern:'Alese',color:'Iron Gray',   priceGroup:'A',noFlat:true,composition:'85% Polyester, 15% Cotton Linen',weightGsm:350,cordLoopColor:'Gray',  tdbuAvailable:true, fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#9A9090'},
  {code:'ASE03',pattern:'Alese',color:'Ivory',       priceGroup:'A',noFlat:true,composition:'85% Polyester, 15% Cotton Linen',weightGsm:350,cordLoopColor:'Beige', tdbuAvailable:true, fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#F2E8D4'},
  {code:'ASE04',pattern:'Alese',color:'Natural',     priceGroup:'A',noFlat:true,composition:'85% Polyester, 15% Cotton Linen',weightGsm:350,cordLoopColor:'Beige', tdbuAvailable:true, fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#D8C8A8'},
  {code:'ASE05',pattern:'Alese',color:'Stone',       priceGroup:'A',noFlat:true,composition:'85% Polyester, 15% Cotton Linen',weightGsm:350,cordLoopColor:'Gray',  tdbuAvailable:true, fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#B0A898'},
  // Herrington — 100% Polyester — TDBU Y
  {code:'HRG01',pattern:'Herrington',color:'Sea Salt',   priceGroup:'A',noFlat:false,composition:'100% Polyester',weightGsm:305,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#D8CFC4'},
  {code:'HRG02',pattern:'Herrington',color:'Snow Drop',  priceGroup:'A',noFlat:false,composition:'100% Polyester',weightGsm:305,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#F0EDE8'},
  // Ladner — [1] No Flat — 100% Polyester — TDBU Y
  {code:'LDN01',pattern:'Ladner',color:'Midnight', priceGroup:'A',noFlat:true,composition:'100% Polyester',weightGsm:320,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#4A4850'},
  {code:'LDN02',pattern:'Ladner',color:'Shore',    priceGroup:'A',noFlat:true,composition:'100% Polyester',weightGsm:320,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#A8B4B8'},
  // Miller — 100% Polyester — TDBU Y
  {code:'MIL01',pattern:'Miller',color:'Snow',     priceGroup:'A',noFlat:false,composition:'100% Polyester',weightGsm:214,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#F5F2EE'},

  // ── GROUP B ───────────────────────────────────────────────────────────────
  // Barlow — 100% Polyester — TDBU Y
  {code:'BRL01',pattern:'Barlow',color:'Gold',       priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:257,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#C8A84A'},
  // Callaway — 100% Polyester — TDBU Y — 116"W
  {code:'CLL01',pattern:'Callaway',color:'Granite',  priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:260,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#8A8880'},
  {code:'CLL02',pattern:'Callaway',color:'Limestone',priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:260,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#C4BDB0'},
  {code:'CLL03',pattern:'Callaway',color:'Marble',   priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:260,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#E8E4DC'},
  {code:'CLL04',pattern:'Callaway',color:'Slate',    priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:260,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#7A8090'},
  // Caravello — [1] No Flat — TDBU N (not available)
  {code:'CRV01',pattern:'Caravello',color:'Burlap',  priceGroup:'B',noFlat:true,composition:'100% Polyester',weightGsm:500,cordLoopColor:'Beige',tdbuAvailable:false,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#C8A870'},
  {code:'CRV02',pattern:'Caravello',color:'Macadamia',priceGroup:'B',noFlat:true,composition:'100% Polyester',weightGsm:500,cordLoopColor:'Beige',tdbuAvailable:false,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#D4B890'},
  {code:'CRV03',pattern:'Caravello',color:'Pewter',  priceGroup:'B',noFlat:true,composition:'100% Polyester',weightGsm:500,cordLoopColor:'Gray', tdbuAvailable:false,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#9A9898'},
  {code:'CRV04',pattern:'Caravello',color:'Slate',   priceGroup:'B',noFlat:true,composition:'100% Polyester',weightGsm:500,cordLoopColor:'Gray', tdbuAvailable:false,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#7A8090'},
  {code:'CRV05',pattern:'Caravello',color:'Wheat',   priceGroup:'B',noFlat:true,composition:'100% Polyester',weightGsm:500,cordLoopColor:'Beige',tdbuAvailable:false,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#E0C890'},
  {code:'CRV06',pattern:'Caravello',color:'Gray',    priceGroup:'B',noFlat:true,composition:'100% Polyester',weightGsm:500,cordLoopColor:'Gray', tdbuAvailable:false,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#909090'},
  // DFF (pattern name PDF CONFIRM — 80% Poly 20% Linen) — TDBU Y
  {code:'DFF01R',pattern:'DFF — PDF CONFIRM',color:'Natural',priceGroup:'B',noFlat:false,composition:'80% Polyester, 20% Linen',weightGsm:330,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#D8CEAC',pdfConfirm:true},
  {code:'DFF03R',pattern:'DFF — PDF CONFIRM',color:'Khaki',  priceGroup:'B',noFlat:false,composition:'80% Polyester, 20% Linen',weightGsm:330,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#C0B080',pdfConfirm:true},
  // Gwin — TDBU Y
  {code:'GWI02',pattern:'Gwin',color:'Dusty Rose',   priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:410,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#D4A0A0'},
  {code:'GWI03',pattern:'Gwin',color:'PDF CONFIRM',  priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:410,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#D8CDB8',pdfConfirm:true},
  {code:'GWI04',pattern:'Gwin',color:'Palm',         priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:410,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#8BAC78'},
  {code:'GWI05',pattern:'Gwin',color:'Rust',         priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:410,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#B86040'},
  {code:'GWI06',pattern:'Gwin',color:'White',        priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:410,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#F5F2EE'},
  // Lea — 100% Polyester — TDBU Y — 114"W
  {code:'LEA01',pattern:'Lea',color:'Azure',       priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:400,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#88A8C8'},
  {code:'LEA02',pattern:'Lea',color:'Cobblestone', priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:400,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#9A9080'},
  {code:'LEA03',pattern:'Lea',color:'PDF CONFIRM', priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:400,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#D0C8B0',pdfConfirm:true},
  {code:'LEA04',pattern:'Lea',color:'Honey',       priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:400,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#C8A858'},
  {code:'LEA05',pattern:'Lea',color:'Pebble',      priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:400,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#A89888'},
  {code:'LEA06',pattern:'Lea',color:'Gray',        priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:390,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#909090'},
  {code:'LEA07',pattern:'Lea',color:'Ice',         priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:390,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#E0EAF0'},
  {code:'LEA08',pattern:'Lea',color:'Light Gray',  priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:390,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#C0C0C0'},
  {code:'LEA09',pattern:'Lea',color:'PDF CONFIRM', priceGroup:'B',noFlat:false,composition:'100% Polyester',weightGsm:390,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#F0EEE8',pdfConfirm:true},

  // ── GROUP C ───────────────────────────────────────────────────────────────
  // Andie — [1] No Flat — 100% Polyester — TDBU Y
  {code:'AND01',pattern:'Andie',color:'PDF CONFIRM',priceGroup:'C',noFlat:true,composition:'100% Polyester',weightGsm:275,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#C8C0B0',pdfConfirm:true},
  {code:'AND05',pattern:'Andie',color:'Coral',      priceGroup:'C',noFlat:true,composition:'100% Polyester',weightGsm:275,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#D49080'},
  {code:'AND09',pattern:'Andie',color:'Lavender',   priceGroup:'C',noFlat:true,composition:'100% Polyester',weightGsm:275,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#B0A8C8'},
  {code:'AND17',pattern:'Andie',color:'White',      priceGroup:'C',noFlat:true,composition:'100% Polyester',weightGsm:275,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#F5F2F0'},
  // Chiasson — [1] No Flat — 100% Polyester — TDBU Y — 116"W
  {code:'CHS01',pattern:'Chiasson',color:'Lily',   priceGroup:'C',noFlat:true,composition:'100% Polyester',weightGsm:350,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#F2EAD8'},
  {code:'CHS02',pattern:'Chiasson',color:'Silver', priceGroup:'C',noFlat:true,composition:'100% Polyester',weightGsm:350,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#C0C0C4'},
  {code:'CHS03',pattern:'Chiasson',color:'Stone',  priceGroup:'C',noFlat:true,composition:'100% Polyester',weightGsm:350,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#A8A098'},
  // Darby — 100% Polyester — TDBU Y — 114"W
  {code:'DBY01',pattern:'Darby',color:'Magnolia',priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:405,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#F0EAD8'},
  {code:'DBY02',pattern:'Darby',color:'Mist',    priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:405,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#B8C0C8'},
  {code:'DBY03',pattern:'Darby',color:'Shell',   priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:405,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#E8D8C0'},
  {code:'DBY04',pattern:'Darby',color:'Thunder', priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:405,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#606880'},
  {code:'DBY05',pattern:'Darby',color:'Tide',    priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:405,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#7A9098'},
  // Kiernan — 100% Polyester — TDBU Y — 116"W
  {code:'KRN01',pattern:'Kiernan',color:'Ash',     priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:240,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#A8A8A0'},
  {code:'KRN02',pattern:'Kiernan',color:'Birch',   priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:240,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#C8C0A8'},
  {code:'KRN03',pattern:'Kiernan',color:'Tapenade',priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:240,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#706858'},
  {code:'KRN04',pattern:'Kiernan',color:'Winter',  priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:240,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#E8E8E8'},
  // Laken — [1] No Flat — 70% Poly 20% Viscose 10% Linen — TDBU Y — 114"W
  {code:'LKN01',pattern:'Laken',color:'Aqua',    priceGroup:'C',noFlat:true,composition:'70% Polyester, 20% Viscose, 10% Linen',weightGsm:350,cordLoopColor:'Gray',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#6AA8A8'},
  {code:'LKN03',pattern:'Laken',color:'Contrast',priceGroup:'C',noFlat:true,composition:'70% Polyester, 20% Viscose, 10% Linen',weightGsm:350,cordLoopColor:'Gray',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#787878'},
  {code:'LKN02',pattern:'Laken',color:'Storm',   priceGroup:'C',noFlat:true,composition:'70% Polyester, 20% Viscose, 10% Linen',weightGsm:350,cordLoopColor:'Gray',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#606870'},
  // Parson — [1] No Flat — 65% Poly 25% Viscose 10% Linen — TDBU Y — 114"W
  {code:'PRS01',pattern:'Parson',color:'Cream',       priceGroup:'C',noFlat:true,composition:'65% Polyester, 25% Viscose, 10% Linen',weightGsm:350,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#F0E8D0'},
  {code:'PRS02',pattern:'Parson',color:'PDF CONFIRM', priceGroup:'C',noFlat:true,composition:'65% Polyester, 25% Viscose, 10% Linen',weightGsm:350,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:114,repeatWidth:null,repeatHeight:null,hex:'#D8CEB8',pdfConfirm:true},
  // Theis — 100% Polyester — TDBU Y — 118"W
  {code:'THE01',pattern:'Theis',color:'Aluminum',priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:240,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:118,repeatWidth:null,repeatHeight:null,hex:'#B0B0B8'},
  {code:'THE02',pattern:'Theis',color:'Camel',   priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:240,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:118,repeatWidth:null,repeatHeight:null,hex:'#C89850'},
  {code:'THE03',pattern:'Theis',color:'Denim',   priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:240,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:118,repeatWidth:null,repeatHeight:null,hex:'#5068A0'},
  {code:'THE04',pattern:'Theis',color:'Jade',    priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:240,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:118,repeatWidth:null,repeatHeight:null,hex:'#68A078'},
  {code:'THE05',pattern:'Theis',color:'Seafoam', priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:240,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:118,repeatWidth:null,repeatHeight:null,hex:'#88C0B0'},
  {code:'THE06',pattern:'Theis',color:'Sun',     priceGroup:'C',noFlat:false,composition:'100% Polyester',weightGsm:240,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:118,repeatWidth:null,repeatHeight:null,hex:'#D4A830'},
  // Waldron — [1] No Flat — 54% Poly 32% Viscose 14% Linen — TDBU Y
  {code:'WLD01',pattern:'Waldron',color:'Flour',   priceGroup:'C',noFlat:true,composition:'54% Polyester, 32% Viscose, 14% Linen',weightGsm:345,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#F0E8D8'},
  {code:'WLD02',pattern:'Waldron',color:'Olive',   priceGroup:'C',noFlat:true,composition:'54% Polyester, 32% Viscose, 14% Linen',weightGsm:345,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#8A9060'},
  {code:'WLD03',pattern:'Waldron',color:'Sand',    priceGroup:'C',noFlat:true,composition:'54% Polyester, 32% Viscose, 14% Linen',weightGsm:345,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#C8B888'},
  {code:'WLD04',pattern:'Waldron',color:'Twilight',priceGroup:'C',noFlat:true,composition:'54% Polyester, 32% Viscose, 14% Linen',weightGsm:345,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#5A5870'},
  {code:'WLD05',pattern:'Waldron',color:'Twine',   priceGroup:'C',noFlat:true,composition:'54% Polyester, 32% Viscose, 14% Linen',weightGsm:345,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#C0A870'},
  {code:'WLD06',pattern:'Waldron',color:'Gray',    priceGroup:'C',noFlat:true,composition:'54% Polyester, 32% Viscose, 14% Linen',weightGsm:345,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#909090'},

  // ── GROUP D ───────────────────────────────────────────────────────────────
  // Cassia — 100% Polyester — TDBU Y — 106"W — repeat 18"H
  {code:'CSS01',pattern:'Cassia',color:'Kiwi', priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:320,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:106,repeatWidth:null,repeatHeight:18,hex:'#88B060'},
  {code:'CSS02',pattern:'Cassia',color:'Zest', priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:320,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:106,repeatWidth:null,repeatHeight:18,hex:'#E8B840'},
  // Current — 100% Polyester — TDBU Y
  {code:'CRN01',pattern:'Current',color:'Aquifer',priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:300,cordLoopColor:'Gray',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#7098A8'},
  {code:'CRN02',pattern:'Current',color:'Iron',   priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:300,cordLoopColor:'Gray',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#707880'},
  {code:'CRN03',pattern:'Current',color:'Wind',   priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:300,cordLoopColor:'Gray',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#9090A0'},
  // Eden — 100% Polyester — TDBU Y — 106"W — repeat 18"H
  {code:'EDN01',pattern:'Eden',color:'Cloud',    priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:320,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:106,repeatWidth:null,repeatHeight:18,hex:'#D8E8F0'},
  {code:'EDN02',pattern:'Eden',color:'Ink',      priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:320,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:106,repeatWidth:null,repeatHeight:18,hex:'#2A3048'},
  {code:'EDN03',pattern:'Eden',color:'Moonlight',priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:320,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:106,repeatWidth:null,repeatHeight:18,hex:'#C0C8D8'},
  // Kenlie — 98% Poly 2% Lurex — TDBU Y — 116"W
  {code:'KEN01',pattern:'Kenlie',color:'Charcoal', priceGroup:'D',noFlat:false,composition:'98% Polyester, 2% Lurex',weightGsm:420,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#404848'},
  {code:'KEN02',pattern:'Kenlie',color:'Diamond',  priceGroup:'D',noFlat:false,composition:'98% Polyester, 2% Lurex',weightGsm:420,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#E8E8E8'},
  {code:'KEN03',pattern:'Kenlie',color:'Evergreen',priceGroup:'D',noFlat:false,composition:'98% Polyester, 2% Lurex',weightGsm:420,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#3A6040'},
  {code:'KEN04',pattern:'Kenlie',color:'Silver',   priceGroup:'D',noFlat:false,composition:'98% Polyester, 2% Lurex',weightGsm:420,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#C0C0C8'},
  {code:'KEN05',pattern:'Kenlie',color:'Twilight', priceGroup:'D',noFlat:false,composition:'98% Polyester, 2% Lurex',weightGsm:420,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:116,repeatWidth:null,repeatHeight:null,hex:'#4A4868'},
  // LeBeau — 51% Poly 49% Viscose — TDBU Y
  {code:'LBU01',pattern:'LeBeau',color:'Gold',  priceGroup:'D',noFlat:false,composition:'51% Polyester, 49% Viscose',weightGsm:290,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#C8A040'},
  {code:'LBU02',pattern:'LeBeau',color:'Silver',priceGroup:'D',noFlat:false,composition:'51% Polyester, 49% Viscose',weightGsm:290,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#C0C0C8'},
  {code:'LBU03',pattern:'LeBeau',color:'White', priceGroup:'D',noFlat:false,composition:'51% Polyester, 49% Viscose',weightGsm:290,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#F0EEEC'},
  // Lumen — 100% Polyester — TDBU Y
  {code:'LUM01',pattern:'Lumen',color:'Gray',  priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:305,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#909090'},
  {code:'LUM02',pattern:'Lumen',color:'Mist',  priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:305,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#C0C8C8'},
  {code:'LUM03',pattern:'Lumen',color:'White', priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:305,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#F2F0EE'},
  // Merida (MDA — patterned, 106"W, 18"H repeat)
  {code:'MDA01',pattern:'Merida',color:'Radish',  priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:320,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:106,repeatWidth:null,repeatHeight:18,hex:'#B84040'},
  {code:'MDA02',pattern:'Merida',color:'Concrete', priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:320,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:106,repeatWidth:null,repeatHeight:18,hex:'#A0A0A8'},
  {code:'MDA03',pattern:'Merida',color:'Citron',   priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:320,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:106,repeatWidth:null,repeatHeight:18,hex:'#D4C040'},
  {code:'MDA04',pattern:'Merida',color:'Laurel',   priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:320,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:106,repeatWidth:null,repeatHeight:18,hex:'#6A8A50'},
  // Merida (MTT — solid, 110"W, no repeat)
  {code:'MTT01',pattern:'Merida',color:'Celadon',  priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:285,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#88B0A0'},
  {code:'MTT02',pattern:'Merida',color:'Lagoon',   priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:285,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#508898'},
  {code:'MTT03',pattern:'Merida',color:'Metallic', priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:285,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#A8A8B0'},
  {code:'MTT04',pattern:'Merida',color:'Storm',    priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:285,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#707880'},
  {code:'MTT05',pattern:'Merida',color:'Taupe',    priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:285,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#908070'},
  {code:'MTT06',pattern:'Merida',color:'Tungsten', priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:285,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#606468'},
  // Ramsey — 100% Polyester — TDBU Y
  {code:'RAM01',pattern:'Ramsey',color:'Alloy',      priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:305,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#989088'},
  {code:'RAM02',pattern:'Ramsey',color:'PDF CONFIRM',priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:305,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#B0A8A0',pdfConfirm:true},
  {code:'RAM03',pattern:'Ramsey',color:'Silver',     priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:305,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#C0C0C0'},
  {code:'RAM04',pattern:'Ramsey',color:'White Gold',  priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:305,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#E8D890'},
  // Ursa — 100% Polyester — TDBU Y
  {code:'URS01',pattern:'Ursa',color:'Skyline',priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:260,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#8890A0'},
  {code:'URS02',pattern:'Ursa',color:'Slate',  priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:260,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#708090'},
  {code:'URS03',pattern:'Ursa',color:'White',  priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:260,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:null,repeatHeight:null,hex:'#F0EEEC'},
  // Victoria — 100% Polyester — TDBU Y — 106"W — repeat 13.75"W × 18"H
  {code:'VCT01',pattern:'Victoria',color:'Cascade',priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:320,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:106,repeatWidth:13.75,repeatHeight:18,hex:'#A0C0D0'},
  {code:'VCT02',pattern:'Victoria',color:'Chime',  priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:320,cordLoopColor:'White',tdbuAvailable:true,fabricWidth:106,repeatWidth:13.75,repeatHeight:18,hex:'#C0D0E0'},
  {code:'VCT03',pattern:'Victoria',color:'Mirage', priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:320,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:106,repeatWidth:13.75,repeatHeight:18,hex:'#909898'},
  // Windham — 100% Polyester — TDBU Y — repeat 14.5"W × 17.5"H
  {code:'WIN01',pattern:'Windham',color:'Chateau',    priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:285,cordLoopColor:'Beige',tdbuAvailable:true,fabricWidth:110,repeatWidth:14.5,repeatHeight:17.5,hex:'#C8B890'},
  {code:'WIN02',pattern:'Windham',color:'Luxe',       priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:285,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:14.5,repeatHeight:17.5,hex:'#808898'},
  {code:'WIN03',pattern:'Windham',color:'PDF CONFIRM',priceGroup:'D',noFlat:false,composition:'100% Polyester',weightGsm:285,cordLoopColor:'Gray', tdbuAvailable:true,fabricWidth:110,repeatWidth:14.5,repeatHeight:17.5,hex:'#989090',pdfConfirm:true},
];

// ── INTERNAL PRICING TABLES (do not expose in public UI) ─────────────────────
// Source: Wallace Portfolio Fabric Roman Shades PDF — pricing pages
// Width brackets (inches): 24,30,36,42,48,54,60,66,72,78,84,96
// Length brackets (inches): 24,30,36,42,48,54,60,66,72,78,84,96
// FLAT and KNIFE PLEAT shades — Cordless or Clutch (base price per shade)
var W_BRKT=[24,30,36,42,48,54,60,66,72,78,84,96];
var L_BRKT=[24,30,36,42,48,54,60,66,72,78,84,96];
var PRICE_FLAT={
  A:[[496,528,553,560,599,709,732,800,825,831,872,977],[501,532,558,565,604,715,738,807,833,838,879,986],[505,537,563,570,609,721,744,814,840,846,887,995],[526,568,596,604,646,764,789,863,891,897,941,1057],[548,593,622,630,663,796,822,901,930,954,1004,1072],[571,618,649,657,686,831,858,940,971,1024,1079,1153],[596,645,666,675,699,867,896,982,1014,1092,1153,1232],[621,673,683,692,724,905,935,1025,1059,1161,1226,1311],[648,702,713,723,750,949,979,1062,1095,1242,1313,1405],[676,733,745,755,776,999,1031,1119,1153,1310,1386,1484],[706,766,778,788,804,1050,1083,1177,1213,1380,1461,1565],[737,800,812,824,847,1119,1185,1288,1329,1514,1605,1721]],
  'A[1]':[[538,595,615,627,646,800,834,918,936,952,963,1036],[542,600,620,633,652,807,841,926,944,960,972,1045],[547,605,625,638,657,814,849,934,953,969,981,1055],[556,628,650,666,692,858,907,940,958,974,1025,1151],[582,635,669,695,728,930,982,1027,1040,1060,1117,1252],[605,663,698,726,767,997,1059,1102,1114,1139,1202,1329],[622,695,742,758,808,1062,1100,1148,1177,1217,1286,1351],[644,736,786,791,851,1128,1171,1235,1259,1295,1369,1439],[675,753,827,838,897,1169,1213,1299,1343,1386,1466,1543],[707,776,864,882,946,1211,1257,1370,1409,1464,1550,1632],[767,814,903,928,998,1255,1303,1445,1502,1543,1635,1722],[823,889,944,1015,1053,1301,1351,1546,1625,1696,1800,1896]],
  C:[[553,617,630,643,660,820,853,940,966,992,1014,1055],[560,622,638,663,686,844,875,965,988,1014,1045,1078],[564,633,651,676,747,870,908,998,1031,1049,1084,1163],[573,649,672,718,812,902,972,1053,1078,1100,1133,1273],[606,680,687,779,881,980,1056,1084,1116,1175,1236,1386],[622,698,738,835,945,1052,1135,1204,1224,1268,1333,1496],[641,734,785,892,1007,1122,1213,1279,1331,1358,1427,1604],[682,781,832,946,1070,1192,1291,1334,1398,1451,1521,1711],[715,821,887,1009,1140,1268,1373,1393,1466,1550,1629,1835],[749,849,934,1064,1202,1338,1433,1468,1553,1626,1723,1942],[782,869,983,1120,1266,1410,1480,1535,1615,1716,1820,2052],[840,916,1035,1155,1305,1454,1511,1644,1775,1889,2006,2264]],
  D:[[623,696,711,727,746,926,964,1065,1095,1125,1150,1196],[631,703,721,750,776,954,989,1093,1120,1150,1185,1223],[636,715,737,765,846,984,1028,1131,1170,1190,1230,1321],[646,733,760,813,922,1021,1102,1195,1223,1249,1286,1448],[685,770,778,883,1000,1111,1198,1230,1267,1335,1405,1578],[703,790,836,948,1074,1193,1289,1368,1391,1442,1516,1704],[725,832,890,1013,1146,1274,1379,1454,1514,1545,1624,1828],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null],[null,null,null,null,null,null,null,null,null,null,null,null]]
};
// HOBBLED and FRONT SLAT shades — Cordless or Clutch
// Length max 72" for hobbled. Width max 78" for standard LI/DC/AC motor.
var PRICE_HOBBLED={
  A:[[518,550,574,593,649,750,785,833,866,892,905,1011],[534,560,595,616,674,776,800,863,918,963,1009,1063],[547,577,624,646,733,814,876,945,1007,1061,1114,1139],[559,605,649,703,797,884,954,1030,1100,1160,1221,1246],[575,622,680,767,869,963,1039,1125,1206,1273,1341,1361],[590,643,729,823,931,1033,1117,1210,1299,1373,1448,1468],[612,683,774,876,992,1102,1193,1292,1388,1469,1553,1573],[636,722,821,931,1055,1171,1270,1376,1480,1567,1658,1677],[678,773,878,995,1126,1250,1355,1469,1594,1690,1788,1811],[710,812,925,1050,1187,1318,1431,1553,1686,1788,1893,1915],[744,853,972,1105,1250,1388,1509,1638,1777,1887,1999,2023],[809,933,1067,1213,1373,1526,1660,1803,1957,2080,2208,2231]],
  C:[[576,640,664,704,730,856,886,982,1055,1092,1127,1197],[586,653,709,749,772,898,949,1031,1133,1155,1209,1272],[614,667,727,789,849,941,1015,1097,1197,1262,1330,1381],[625,691,779,821,929,1032,1115,1206,1290,1363,1439,1476],[660,721,797,900,1018,1129,1221,1322,1419,1501,1586,1620],[685,757,859,972,1098,1219,1321,1431,1537,1629,1723,1759],[709,808,918,1041,1177,1306,1417,1536,1651,1752,1856,1893],[749,858,978,1110,1255,1394,1513,1641,1766,1875,1988,2027],[801,919,1048,1189,1343,1491,1619,1757,1905,2023,2146,2189],[843,970,1107,1258,1421,1578,1716,1862,2020,2147,2278,2323],[887,1023,1169,1330,1502,1669,1815,1971,2138,2274,2415,2462],[970,1124,1288,1468,1657,1843,2007,2181,2366,2520,2679,2729]]
};

// VALANCE ONLY pricing — widths 24-96
var VALANCE_ONLY_W=[24,30,36,42,48,54,60,66,72,78,84,96];
var VALANCE_ONLY_PRICE={
  A:[275,296,314,318,344,400,415,461,478,482,508,580],
  B:[303,341,355,363,375,461,484,539,551,562,570,618],
  C:[313,356,365,373,385,474,496,554,571,589,603,631],
  D:[346,395,406,415,430,530,556,620,641,661,679,709]
};

// Surcharge pricing (internal — included in quote email, not shown publicly)
var SURCHARGES={
  blackoutLiner:0.10,     // +10% of shade price
  waterfallFrontValance:51,
  twoOn1Headrail:56,
  cordlessTDBU:145,
  proWand:165,
  motorStandardLI:308,
  motorPowerLI:492,
  motorRemote15ch:114,
  motorWallSwitch:132,
  motorProHub:468,
  motorExtBattery:120,
  motorPluginAdapter:55,
  motorExt6:29,
  motorExt48:35,
  motorExt96:45,
  motorCharger:48,
  cutFabricA:60,cutFabricB:90,cutFabricC:121,cutFabricD:139,
  cutLiner:60,
  cutFabricFreightWithShade:5,
  cutFabricFreightFirst:25,cutFabricFreightAdditional:5
};

function getPriceFlat(w,l,group,noFlat){
  var tbl=noFlat?PRICE_FLAT['A[1]']:PRICE_FLAT[group];
  if(!tbl)return null;
  var wi=W_BRKT.findIndex(function(v){return w<=v;}); if(wi<0)wi=W_BRKT.length-1;
  var li=L_BRKT.findIndex(function(v){return l<=v;}); if(li<0)li=L_BRKT.length-1;
  return(tbl[li]&&tbl[li][wi])||null;
}

function getPriceHobbled(w,l,group){
  var tbl=PRICE_HOBBLED[group];
  if(!tbl)return null;
  var wi=W_BRKT.findIndex(function(v){return w<=v;}); if(wi<0)wi=W_BRKT.length-1;
  var li=L_BRKT.findIndex(function(v){return l<=v;}); if(li<0||li>=9)return null; // max 72" length
  return(tbl[li]&&tbl[li][wi])||null;
};

// ── SIZE LIMITS ───────────────────────────────────────────────────────────────
// All limits per Wallace Portfolio Fabric Roman Shades PDF 2026
// panelGroups: 'standard' = Flat/Knife/FrontSlat; 'hobbled' = Hobbled only
var SIZE_LIMITS = {
  'cordless':   {standard:{minW:16,maxW:96,minL:25,maxL:96},hobbled:{minW:16,maxW:96,minL:25,maxL:72}},
  'tdbu':       {standard:{minW:24,maxW:48,minL:24,maxL:72},hobbled:null},
  'clutch':     {standard:{minW:16,maxW:96,minL:18,maxL:96},hobbled:{minW:16,maxW:96,minL:18,maxL:72}},
  'prowand':    {standard:{minW:23.375,maxW:96,minL:18,maxL:86},hobbled:null},
  'motor-std-li':{standard:{minW:23.375,maxW:96,minL:18,maxL:86},hobbled:{minW:23.375,maxW:78,minL:18,maxL:72}},
  'motor-dc':   {standard:{minW:15.5,maxW:96,minL:18,maxL:86},hobbled:{minW:15.5,maxW:78,minL:18,maxL:72}},
  'motor-dc-ext':{standard:{minW:15.5,maxW:96,minL:18,maxL:86},hobbled:{minW:15.5,maxW:78,minL:18,maxL:72}},
  'motor-ac':   {standard:{minW:22.125,maxW:96,minL:18,maxL:86},hobbled:{minW:22.125,maxW:78,minL:18,maxL:72}},
  'motor-power-li':{standard:{minW:30,maxW:96,minL:18,maxL:96},hobbled:{minW:30,maxW:96,minL:18,maxL:72}},
};

var fabFilter = 'all';

// ── HELPERS ───────────────────────────────────────────────────────────────────
function selBtn(el, grpId) {
  document.getElementById(grpId).querySelectorAll('.opt-btn').forEach(function(b){b.classList.remove('sel');});
  el.classList.add('sel');
}
function toggleStep(id) {
  var el=document.getElementById(id);
  el.classList.add('active');
  setTimeout(function(){el.scrollIntoView({behavior:'smooth',block:'start'});},60);
}
function openNext(id) { var el=document.getElementById(id); if(el&&el.style.display!=='none')el.classList.add('active'); }
function sp(id,val) { var el=document.getElementById(id); if(el){el.textContent=val||'—';el.classList.toggle('empty',!val||val==='—');} }

// ── STEP 1 ────────────────────────────────────────────────────────────────────
function setQtyVal(n) {
  n = Math.max(1, Math.min(50, n||1));
  S.qty = n;
  sp('sp-qty', n + (n===1?' shade':' shades'));
}
function adjQty(d) {
  var el = document.getElementById('qty-inp');
  el.value = Math.max(1, Math.min(50, (parseInt(el.value)||1)+d));
  setQtyVal(parseInt(el.value));
}

// ── MOUNT (Step 1) ────────────────────────────────────────────────────────────
function setMount(m, el) {
  S.mount=m; selBtn(el,'grp-mount');
  var label=m==='inside'?'Inside mount':'Outside mount';
  sp('sp-mount',label);
  // Outside mount: extended returns available; inside: standard only
  var extBtn=document.getElementById('btn-ext-returns');
  if(extBtn) extBtn.classList.toggle('blocked',m==='inside');
  validateTDBU(); validateReturns(); validateDims();
}

// ── DIMENSIONS (Step 1) ───────────────────────────────────────────────────────
function validateDims() {
  S.width=parseFloat(document.getElementById('inp-w').value)||0;
  S.length=parseFloat(document.getElementById('inp-l').value)||0;
  var fb=document.getElementById('dim-feedback');
  if(!S.width||!S.length){fb.innerHTML='';updateSpec();return;}
  var controlKey=getControlKey();
  var panelGrp=S.panelStyle==='hobbled'?'hobbled':'standard';
  var errs=[], warns=[];
  // Roman Valance: decorative, no lift system — skip control-based size limits
  if(S.shadeStyle!=='roman-valance'){
    if(controlKey&&SIZE_LIMITS[controlKey]){
      var lim=SIZE_LIMITS[controlKey][panelGrp];
      if(lim){
        if(S.width<lim.minW) errs.push('Width '+S.width+'" < minimum '+lim.minW+'" for '+getControlLabel()+'.');
        if(S.width>lim.maxW) errs.push('Width '+S.width+'" > maximum '+lim.maxW+'".');
        if(S.length<lim.minL) errs.push('Length '+S.length+'" < minimum '+lim.minL+'" for '+getControlLabel()+'.');
        if(S.length>lim.maxL) errs.push('Length '+S.length+'" > maximum '+lim.maxL+'".');
      }
    }
    if(S.panelStyle==='hobbled'&&S.length>72) errs.push('Hobbled style max length is 72".');
  } else {
    // Roman Valance: width must be 16"-96"; length is total height (no max — decorative)
    if(S.width<16) errs.push('Width '+S.width+'" is below minimum 16" for a Roman Valance.');
    if(S.width>96) errs.push('Width '+S.width+'" exceeds maximum 96".');
    if(S.length<12) errs.push('Total height '+S.length+'" — enter the full height including folds (minimum 12").');
    warns.push('Roman Valance: total height entered = '+S.length+'". This is the FULL fabric height including all folds — used for flat roman pricing.');
  }
  var html='';
  if(errs.length) html+=errs.map(function(e){return'<div class="warn-box warn-box-red" style="margin-top:6px">&#9888; '+e+'</div>';}).join('');
  if(warns.length) html+=warns.map(function(e){return'<div class="warn-box" style="margin-top:6px">&#9888; '+e+'</div>';}).join('');
  if(!errs.length&&S.width&&S.length){
    html='<div class="ok-box">&#10003; '+S.width+'" W &times; '+S.length+'" L — dimensions accepted.</div>';
    document.getElementById('step1').classList.add('done');
    document.getElementById('val1').textContent=S.width+'" W &times; '+S.length+'" L';
    sp('sp-size',S.width+'" × '+S.length+'"');
    openNext('step5');
  }
  fb.innerHTML=html;
  validate2on1(); updateSpec();
}

function getControlKey() {
  if(!S.control) return null;
  if(S.control==='motor') return 'motor-'+S.motorType;
  return S.control;
}

function getControlLabel() {
  var labels={cordless:'Cordless',tdbu:'Cordless TDBU',clutch:'Clutch/Loop',prowand:'Pro Wand',motor:'Remote Motor'};
  return labels[S.control]||S.control;
}

// ── STEP 5 ────────────────────────────────────────────────────────────────────
function setShadeStyle(style, el) {
  S.shadeStyle=style;
  selBtn(el,'grp-shade-style');
  var labels={standard:'Standard With Valance',waterfall:'Waterfall Without Valance','waterfall-fv':'Waterfall Front Valance','valance-only':'Valance Only','roman-valance':'Roman Valance (decorative)'};
  document.getElementById('val5').textContent=labels[style]||style;
  sp('sp-shade-style',labels[style]||style);
  document.getElementById('step5').classList.add('done');
  var notes={
    standard:'6" front valance; shade fabric comes off back of headrail.',
    waterfall:'Shade fabric comes off front of headrail; no front valance. Control loop hidden behind shade; cannot use Clutch adjacent.',
    'waterfall-fv':'Waterfall with front valance surcharge — used to cover the top fold.',
    'valance-only':'Valance Only: max 96" W × 18" L. Attached to 1½" or 2½" headrail.',
    'roman-valance':'Decorative non-functional Roman Valance — flat roman construction, stays in the raised position. No lift system. Price = flat roman pricing at TOTAL height (including all folds). Flat panel style only.'
  };
  var noteEl=document.getElementById('shade-style-note');
  noteEl.textContent=notes[style]||''; noteEl.style.display=notes[style]?'':'none';
  // Hobbled only valid with waterfall; block Hobbled if standard
  var hobbledBtn=document.getElementById('btn-hobbled');
  var isWaterfall=style==='waterfall'||style==='waterfall-fv';
  if(hobbledBtn){
    hobbledBtn.classList.toggle('blocked',!isWaterfall);
    if(!isWaterfall&&S.panelStyle==='hobbled'){S.panelStyle='';document.getElementById('val6').textContent='—';sp('sp-panel-style','');}
  }
  // Pro Wand blocked for waterfall
  var pwBtn=document.getElementById('btn-prowand');
  if(pwBtn){
    pwBtn.classList.toggle('blocked',isWaterfall||style==='waterfall-fv');
    if((isWaterfall||style==='waterfall-fv')&&S.control==='prowand'){S.control='';document.getElementById('val10').textContent='—';}
  }
  // Roman Valance: Flat panel only, no lift system, show total-height note
  var isRV=style==='roman-valance';
  var flatBtn=document.getElementById('btn-flat');
  var hobBtn=document.getElementById('btn-hobbled');
  // Block Hobbled for Roman Valance (Flat only makes sense)
  if(hobBtn) hobBtn.classList.toggle('blocked',!isWaterfall||isRV);
  // Auto-select Flat if Roman Valance and no flat-compatible style chosen
  if(isRV&&S.panelStyle&&S.panelStyle!=='flat'&&S.panelStyle!=='knife'){
    if(!S.panelStyleBeforeRV) S.panelStyleBeforeRV=S.panelStyle;   // remember it to restore when leaving Roman Valance
    S.panelStyle='flat';
    document.querySelectorAll('#grp-panel-style .opt-btn').forEach(function(b){b.classList.remove('sel');});
    if(flatBtn) flatBtn.classList.add('sel');
    document.getElementById('val6').textContent='Flat';
    sp('sp-panel-style','Flat');
  } else if(!isRV && S.panelStyleBeforeRV){
    // Leaving Roman Valance — restore the panel style the user had before.
    var _prev=S.panelStyleBeforeRV; S.panelStyleBeforeRV='';
    var _pbtn=document.querySelector('#grp-panel-style .opt-btn[onclick*="\''+_prev+'\'"]');
    if(_pbtn && !_pbtn.classList.contains('blocked')) setPanelStyle(_prev,_pbtn);
  }
  // Show/hide total-height note
  var rvHNote=document.getElementById('roman-valance-height-note');
  if(rvHNote) rvHNote.style.display=isRV?'':'none';
  // Show/hide control step — Roman Valance is decorative, no lift needed
  document.getElementById('step10').style.display=isRV?'none':'';
  document.getElementById('step13').style.display=isRV||S.control!=='motor'?'none':'';
  if(isRV){
    // Clear any previously chosen control
    S.control=''; S.motorType='';
    document.getElementById('val10').textContent='Decorative — no lift system';
    sp('sp-control','Decorative — no lift system');
  } else if(!S.control){
    document.getElementById('val10').textContent='—';
    sp('sp-control','');
  }
  validateTDBU(); validate2on1(); validateDims(); updateSpec(); openNext('step6');
}

// ── STEP 6 ────────────────────────────────────────────────────────────────────
function setPanelStyle(style, el) {
  // Check if blocked
  if(el.classList.contains('blocked')) return;
  S.panelStyle=style;
  document.getElementById('grp-panel-style').querySelectorAll('.opt-btn:not(.blocked)').forEach(function(b){b.classList.remove('sel');});
  el.classList.add('sel');
  var labels={flat:'Flat',hobbled:'Hobbled',knife:'Knife Pleated','front-slat':'Front Slat'};
  document.getElementById('val6').textContent=labels[style]||style;
  sp('sp-panel-style',labels[style]||style);
  document.getElementById('step6').classList.add('done');
  var notes={
    flat:'Flat continuous front panel. Light-filtering shades may show shadow from hidden rib on some fabrics.',
    hobbled:'Extra fabric in each fold for a billowing look. Waterfall style only. Max 72" length. May need dressing after installation.',
    knife:'Ribs sewn into pockets on back of shade; seam visible on front at each pocket. Least dressing needed.',
    'front-slat':'Ribs sewn into pockets on front; pocket visible on front face.'
  };
  var noteEl=document.getElementById('panel-style-note');
  noteEl.textContent=notes[style]||''; noteEl.style.display=notes[style]?'':'none';
  // Warn for flat
  var warnEl=document.getElementById('panel-style-warn');
  if(style==='flat'&&S.fabric&&S.fabric.noFlat){
    warnEl.textContent='&#9888; Selected fabric ('+S.fabric.pattern+' '+S.fabric.color+') is not available in Flat style. Please select a different fabric or panel style.';
    warnEl.style.display='';
  } else { warnEl.style.display='none'; }
  // Block flat for current fabric if needed
  renderFabricGrid();
  validateTDBU(); validate2on1(); validateDims(); updateSpec(); openNext('step7');
}

// ── STEP 7: FABRIC ────────────────────────────────────────────────────────────
function filterFabrics(g, el) {
  fabFilter=g; selBtn(el,'grp-fabric-filter'); renderFabricGrid();
}

function renderFabricGrid() {
  var filtered=FABRICS.filter(function(f){return fabFilter==='all'||f.priceGroup===fabFilter;});
  var groups={};
  filtered.forEach(function(f){var k=f.priceGroup;if(!groups[k])groups[k]=[];groups[k].push(f);});
  var flatWarn=document.getElementById('fabric-flat-warn');
  flatWarn.style.display=(S.panelStyle==='flat')?'':'none';
  var html='';
  ['A','B','C','D'].forEach(function(g){
    if(!groups[g])return;
    html+='<div class="coll-section"><div class="coll-label">Price Group '+g+' <span style="font-size:9px;color:#f59e0b;font-weight:600">PDF CONFIRM codes</span></div><div class="fabric-grid">';
    groups[g].forEach(function(f){
      var isSel=S.fabric&&S.fabric.code===f.code&&S.fabric.pattern===f.pattern&&S.fabric.color===f.color;
      var isBlocked=S.panelStyle==='flat'&&f.noFlat;
      var isPlaceholder=f.placeholder;
      var sf=JSON.stringify(f).replace(/'/g,"\\'");
      html+='<div class="swatch'+(isSel?' sel':'')+(isBlocked?' blocked-swatch':'')+(isPlaceholder?' blocked-swatch':'')+'" '
        +(isBlocked||isPlaceholder?'title="'+(isBlocked?'Not available in Flat style':'PDF CONFIRM color')+'"':'onclick=\'selectFabric('+sf+')\'')+' >';
      html+='<div class="swatch-color" style="background:'+f.hex+'"></div>';
      html+='<div class="swatch-label">';
      html+='<div class="swatch-name">'+f.pattern+(f.color&&f.color!=='PDF CONFIRM'?' &mdash; '+f.color:'')+'</div>';
      html+='<div class="swatch-code">'+(isPlaceholder?'ENTER CODE':f.code)+'</div>';
      if(f.noFlat) html+='<div class="swatch-nf">NO FLAT</div>';
      if(f.tdbuAvailable) html+='<div class="swatch-badge">TDBU</div>';
      if(f.pdfConfirm) html+='<div class="swatch-badge" style="background:#FEE2E2;color:#7f1d1d">PDF CONFIRM</div>';
      html+='</div></div>';
    });
    html+='</div></div>';
  });
  document.getElementById('fabric-grid-wrap').innerHTML=html||'<div class="info-box">No fabrics in this price group. Enter fabric data from PDF pages 3&ndash;5.</div>';
}

function selectFabric(f) {
  if(f.placeholder){return;}
  // Block flat for [1] fabrics
  if(S.panelStyle==='flat'&&f.noFlat){alert(f.pattern+' '+f.color+' is not available in Flat style. Change panel style first.');return;}
  S.fabric=f;
  document.getElementById('val7').textContent=f.pattern+' '+f.color+' ('+f.code+')';
  sp('sp-fabric',f.pattern+' '+f.color+' · Group '+f.priceGroup+' ('+f.code+')');
  document.getElementById('step7').classList.add('done');
  renderFabricGrid();
  // Re-validate panel style warning
  var warnEl=document.getElementById('panel-style-warn');
  warnEl.style.display='none';
  // Check TDBU
  validateTDBU(); updateSpec(); openNext('step8');
}

// ── STEP 8: LINER ─────────────────────────────────────────────────────────────
function setLiner(code, label, comp, el) {
  S.liner=code; S.linerLabel=label;
  ['liner-lf03','liner-lf02','liner-bo01'].forEach(function(id){var e=document.getElementById(id);if(e)e.classList.remove('sel');});
  el.classList.add('sel');
  document.getElementById('val8').textContent=code+' '+label;
  sp('sp-liner',code+' '+label);
  document.getElementById('step8').classList.add('done');
  var bo=document.getElementById('liner-bo-note');
  bo.style.display=code==='BO01'?'':'none';
  updateSpec(); openNext('step9');
}

// ── STEP 9: ALIGNMENT ─────────────────────────────────────────────────────────
function setAlignment(a, el) {
  S.alignment=a; selBtn(el,'grp-alignment');
  var labels={top:'Top Panel Aligned',bottom:'Bottom Panel Aligned'};
  document.getElementById('val9').textContent=labels[a]||a;
  sp('sp-alignment',labels[a]||a);
  document.getElementById('step9').classList.add('done');
  var notes={
    top:'Top Panel Aligned (recommended): first row of rings/rib sewn 6" from top. Shade apron 4"–7". Best for most single-shade installations.',
    bottom:'Bottom Panel Aligned: recommended where side-by-side windows have aligned bottoms but different heights. Last row sewn at seam of 4" bottom hem. Top fold 4"–9 7/8". If uneven top folds are a concern, consider Standard shade or Waterfall with front valance instead.'
  };
  document.getElementById('alignment-note').textContent=notes[a]||'';
  updateSpec(); openNext('step10');
}

// ── STEP 10: CONTROL ─────────────────────────────────────────────────────────
function setControl(c, el) {
  if(el.classList.contains('blocked')) return;
  S.control=c;
  document.getElementById('grp-control').querySelectorAll('.opt-btn:not(.blocked)').forEach(function(b){b.classList.remove('sel');});
  el.classList.add('sel');
  var labels={cordless:'Cordless',tdbu:'Cordless TDBU',clutch:'Clutch / Loop',prowand:'Pro Wand',motor:'Remote Motor'};
  document.getElementById('val10').textContent=labels[c]||c;
  sp('sp-control',labels[c]||c);
  document.getElementById('step10').classList.add('done');
  // Sub-options visibility
  document.getElementById('control-side-wrap').style.display=(c==='clutch'||c==='prowand'||c==='motor')?'':'none';
  document.getElementById('clutch-opts').style.display   = c==='clutch' ? '' : 'none';
  document.getElementById('prowand-opts').style.display  = c==='prowand'? '' : 'none';
  document.getElementById('tdbu-opts').style.display     = c==='tdbu'   ? '' : 'none';
  document.getElementById('motor-opts').style.display    = c==='motor'  ? '' : 'none';
  document.getElementById('step13').style.display        = c==='motor'  ? '' : 'none';
  var notes={
    cordless:'Raised/lowered by pulling hem bar behind bottom panel. Clear hem grip included. Child-safe.',
    tdbu:'TDBU requires Standard shade style, Knife Pleat panel style, and fabric with TDBU available. Inside mount TDBU cannot be ordered with returns.',
    clutch:'Metal chain loops standard, supplied at 2/3 shade height. Compliant cord tensioner required.',
    prowand:'Rechargeable battery motor, White wand only. Fabric 3/4" narrower on control side without returns; 1" narrower with returns. Not for waterfall or hobbled.',
    motor:'Remote motor. Select motor type and controls below.'
  };
  document.getElementById('control-note').textContent=notes[c]||'';
  document.getElementById('control-note').style.display=notes[c]?'':'none';
  document.getElementById('control-warn').style.display='none';
  validateTDBU(); validateDims(); updateSpec(); openNext('step11');
}

function setMotorType(type, el) {
  S.motorType=type; selBtn(el,'grp-motor-type');
  var notes={
    'std-li':'Standard Lift 1.1Nm rechargeable LI motor.',
    'power-li':'Power Lift 2.0Nm rechargeable LI motor — for heavier or taller shades.',
    'dc':'12V DC hardwired. Power connection required.',
    'dc-ext':'12V DC external power supply.',
    'ac':'100–240V AC hardwired. Requires licensed electrician.',
  };
  var noteEl=document.getElementById('motor-type-note');
  noteEl.textContent=notes[type]||''; noteEl.style.display=notes[type]?'':'none';
  var acWarn=document.getElementById('ac-electrician-warn');
  if(acWarn) acWarn.style.display=type==='ac'?'':'none';
  validateDims(); updateSpec();
}

function validateTDBU() {
  if(S.control!=='tdbu') return;
  var msgs=[];
  if(S.shadeStyle!=='standard') msgs.push('TDBU requires Standard shade style.');
  if(S.panelStyle!=='knife') msgs.push('TDBU requires Knife Pleated panel style.');
  if(S.fabric&&!S.fabric.tdbuAvailable) msgs.push('Selected fabric does not support TDBU.');
  if(S.mount==='inside'&&S.returns!=='none') msgs.push('Inside mount TDBU cannot be ordered with returns.');
  var warnEl=document.getElementById('control-warn');
  if(msgs.length){warnEl.innerHTML='&#9888; TDBU restrictions: '+msgs.join(' ');warnEl.style.display='';}
  else warnEl.style.display='none';
}

// ── STEP 11: RETURNS ─────────────────────────────────────────────────────────
function setReturns(r, el) {
  if(el.classList.contains('blocked')) return;
  S.returns=r; selBtn(el,'grp-returns');
  var labels={none:'No returns',standard:'Standard 4½" returns',extended:'Extended depth returns',custom:'Custom return depth'};
  document.getElementById('val11').textContent=labels[r]||r;
  sp('sp-returns',labels[r]||r);
  document.getElementById('step11').classList.add('done');
  var notes={
    none:'',
    standard:'Standard 4½" return depth. Molded insert is 4½". Available for inside and outside mount.',
    extended:'Extended depth: ½" deeper than headrail. Outside mount only. Extra length beyond 4½" is fabric only — may have softer corner.',
    custom:'Custom return depth ordered. Molded insert remains 4½"; extra length is fabric only.'
  };
  document.getElementById('returns-note').textContent=notes[r]||''; document.getElementById('returns-note').style.display=r&&r!=='none'?'':'none';
  document.getElementById('returns-depth-wrap').style.display=r==='custom'?'':'none';
  validateReturns(); validateTDBU(); updateSpec();
}

function validateReturns() {
  var warnEl=document.getElementById('returns-warn');
  var msgs=[];
  if(S.returns==='extended'&&S.mount==='inside') msgs.push('Extended depth returns are available for outside mount only.');
  // Waterfall without valance — headrail 1/2" narrower
  if((S.shadeStyle==='waterfall'||S.shadeStyle==='waterfall-fv')&&S.returns!=='none'){
    msgs.push('Note: Waterfall shade with returns has headrail ½" narrower than ordered width.');
  }
  if(msgs.length){warnEl.innerHTML='&#9888; '+msgs.join(' ');warnEl.style.display='';}
  else warnEl.style.display='none';
}

// ── STEP 12: 2-ON-1 ──────────────────────────────────────────────────────────
function set2on1(on, el) {
  S.twoOn1=on; selBtn(el,'grp-2on1');
  document.getElementById('val12').textContent=on?'Yes — 2-on-1 headrail':'No';
  sp('sp-2on1',on?'Yes':'No');
  document.getElementById('step12').classList.add('done');
  document.getElementById('2on1-note').style.display=on?'':'none';
  document.getElementById('2on1-shade2-wrap').style.display=on?'':'none';
  validate2on1();
}

function validate2on1() {
  var warnEl=document.getElementById('2on1-warn');
  var feedbackEl=document.getElementById('2on1-feedback');
  if(!S.twoOn1){if(warnEl)warnEl.style.display='none';return;}
  var msgs=[];
  if(S.shadeStyle!=='standard') msgs.push('2-on-1 is only available with Standard shade style.');
  if(S.panelStyle&&S.panelStyle!=='flat'&&S.panelStyle!=='knife'&&S.panelStyle!=='front-slat') msgs.push('2-on-1 is only available with Flat, Knife Pleat, or Front Slat panel styles.');
  S.width2=parseFloat(document.getElementById('inp-w2').value)||0;
  if(S.twoOn1&&S.width&&S.width2){
    var total=S.width+S.width2;
    if(total>112) msgs.push('Total combined width '+total+'" exceeds 2-on-1 maximum of 112".');
    else {
      if(feedbackEl){feedbackEl.textContent='Total combined width: '+total+'" — within 2-on-1 limit of 112".';feedbackEl.style.display='';}
    }
  }
  if(msgs.length){warnEl.innerHTML='&#9888; '+msgs.join(' ');warnEl.style.display='';}
  else warnEl.style.display='none';
}

// ── STEP 14: CUT FABRIC ───────────────────────────────────────────────────────
function setCutFabric(on) {
  S.cutFabric=on;
  document.getElementById('val14').textContent=on?'Yes — cut fabric requested':'None';
  document.getElementById('cut-fabric-wrap').style.display=on?'':'none';
  document.getElementById('step14').classList.add('done');
}

// ── STEP 15: DELIVERY ─────────────────────────────────────────────────────────
function setDelivery(opt,card) {
  S.delivery=opt;
  document.querySelectorAll('.delivery-opt-card').forEach(function(c){c.classList.remove('sel');});
  card.classList.add('sel');
  var labels={ship:'Ship to me',install:'Professional installation'};
  document.getElementById('val15').textContent=labels[opt]||opt;
  sp('sp-delivery',labels[opt]||opt);
  document.getElementById('step15').classList.add('done');
}

// ── SPEC UPDATE ───────────────────────────────────────────────────────────────
function updateSpec() {}

// ── SUBMIT ────────────────────────────────────────────────────────────────────
function addWallaceRomanToCart(){
  if(!S.width||!S.length){ alert('Please enter dimensions before adding to cart.'); return; }
  if(!S.shadeStyle){ alert('Please select a shade style before adding to cart.'); return; }
  if(!S.fabric){ alert('Please select a fabric before adding to cart.'); return; }

  var shadStyleLabels={standard:'Standard With Valance',waterfall:'Waterfall Without Valance','waterfall-fv':'Waterfall Front Valance','valance-only':'Valance Only'};
  var panelLabels={flat:'Flat',hobbled:'Hobbled',knife:'Knife Pleated','front-slat':'Front Slat'};
  var controlLabels={cordless:'Cordless',tdbu:'Cordless TDBU',clutch:'Clutch / Loop',prowand:'Pro Wand',motor:'Remote Motor'};

  var lines=[
    {label:'Product',value:'Wallace Portfolio Fabric Roman Shades'},
    {label:'Quantity',value:String(S.qty||1)},
    {label:'Mount',value:S.mount==='inside'?'Inside mount':'Outside mount'},
    {label:'Width',value:(S.width||'—')+'"'},
    {label:'Length',value:(S.length||'—')+'"'},
    {label:'Shade Style',value:shadStyleLabels[S.shadeStyle]||S.shadeStyle},
    {label:'Panel Style',value:panelLabels[S.panelStyle]||S.panelStyle||'—'},
    {label:'Fabric',value:S.fabric?S.fabric.pattern+' '+S.fabric.color+' ('+S.fabric.code+') Group '+S.fabric.priceGroup:'—'},
    {label:'Liner',value:S.linerLabel||S.liner||'—'},
    {label:'Control',value:controlLabels[S.control]||S.control||'—'},
    {label:'Returns',value:S.returns||'None'}
  ];
  var specs=lines.map(function(l){return l.label+': '+l.value;}).join(' | ');
  pbAddToCart({product:'Wallace Portfolio Fabric Roman Shades',lines:lines,specs:specs,price:null,qty:S.qty||1});
  pbOpenCart();
}

function submitQuote() {
  var name=document.getElementById('cf-name').value.trim();
  var phone=document.getElementById('cf-phone').value.trim();
  var errEl=document.getElementById('cf-contact-err');
  var errs=[];
  if(!name)         errs.push('Name required.');
  if(!phone)        errs.push('Phone required.');
  if(!S.qty)        errs.push('Select number of shades (Step 1).');
  if(!S.width||!S.length) errs.push('Enter width and length (Step 1).');
  if(!S.shadeStyle) errs.push('Select shade construction style (Step 3).');
  if(!S.panelStyle) errs.push('Select panel style (Step 4).');
  if(!S.fabric)     errs.push('Select a fabric (Step 5).');
  if(!S.control&&S.shadeStyle!=='roman-valance') errs.push('Select control type (Step 8).');
  if(S.control==='motor'&&!S.motorType&&S.shadeStyle!=='roman-valance') errs.push('Select motor type (Step 8).');

  // Validation warnings to flag in email
  var validationFlags=[];
  if(S.panelStyle==='flat'&&S.fabric&&S.fabric.noFlat) validationFlags.push('WARNING: '+S.fabric.pattern+' '+S.fabric.color+' is NOT available in Flat style — must be corrected before production.');
  if(S.control==='tdbu'){
    if(S.shadeStyle!=='standard') validationFlags.push('WARNING: TDBU requires Standard shade style.');
    if(S.panelStyle!=='knife') validationFlags.push('WARNING: TDBU requires Knife Pleat panel style.');
    if(S.fabric&&!S.fabric.tdbuAvailable) validationFlags.push('WARNING: Selected fabric does not support TDBU.');
    if(S.mount==='inside'&&S.returns!=='none') validationFlags.push('WARNING: Inside mount TDBU ordered with returns — returns must be removed.');
  }
  if(S.control==='prowand'&&(S.shadeStyle==='waterfall'||S.shadeStyle==='waterfall-fv'||S.shadeStyle==='valance-only')) validationFlags.push('WARNING: Pro Wand is not available with waterfall or valance-only shade styles.');
  if(S.panelStyle==='hobbled'&&S.shadeStyle!=='waterfall'&&S.shadeStyle!=='waterfall-fv') validationFlags.push('WARNING: Hobbled panel style is only available with Waterfall shade construction.');
  if(S.panelStyle==='hobbled'&&S.length>72) validationFlags.push('WARNING: Hobbled style max length is 72". Ordered length '+S.length+'" exceeds limit.');
  if(S.twoOn1){
    if(S.shadeStyle!=='standard') validationFlags.push('WARNING: 2-on-1 headrail is only available with Standard shade style.');
    if(S.width2&&(S.width+S.width2)>112) validationFlags.push('WARNING: 2-on-1 total width '+(S.width+S.width2)+'" exceeds maximum 112".');
  }
  if(S.control==='motor'&&S.motorType==='ac') validationFlags.push('REQUIRED: AC hardwired motor requires licensed electrician.');

  if(errs.length){errEl.innerHTML='&#9888; Please complete: '+errs.join(' ');errEl.style.display='';document.getElementById('step16').scrollIntoView({behavior:'smooth',block:'start'});return;}
  errEl.style.display='none';

  var shadStyleLabels={standard:'Standard With Valance',waterfall:'Waterfall Without Valance','waterfall-fv':'Waterfall Front Valance','valance-only':'Valance Only'};
  var panelLabels={flat:'Flat',hobbled:'Hobbled',knife:'Knife Pleated','front-slat':'Front Slat'};
  var controlLabels={cordless:'Cordless',tdbu:'Cordless TDBU',clutch:'Clutch / Loop',prowand:'Pro Wand',motor:'Remote Motor'};
  var motorTypeLabels={'std-li':'Standard Lift LI 1.1Nm','power-li':'Power Lift LI 2.0Nm','dc':'12V DC Hardwired','dc-ext':'12V DC External','ac':'100-240V AC Hardwired'};
  var motorControl=document.querySelector('#grp-motor-control .opt-btn.sel')?.textContent.trim()||'—';
  var chainLen=document.querySelector('#grp-chain-len .opt-btn.sel')?.textContent.trim()||'—';
  var wandLen=document.querySelector('#grp-wand-len .opt-btn.sel')?.textContent.trim()||'—';
  var controlSide=document.querySelector('#grp-control-side .opt-btn.sel')?.textContent.trim()||'—';
  var returnLabel={none:'No returns',standard:'Standard 4½" returns',extended:'Extended depth returns',custom:'Custom — '+document.getElementById('return-depth').value+'"'}[S.returns]||S.returns;
  var delivery='Ship (UPS/FedEx)'||S.delivery;

  // Motor accessories
  var motorAcc=[];
  if(document.getElementById('acc-battery-pack')?.checked) motorAcc.push('External LI battery pack');
  if(document.getElementById('acc-plugin')?.checked)       motorAcc.push('Plug-in power adapter');
  if(document.getElementById('acc-charger')?.checked)      motorAcc.push('16½\' charger');
  if(document.getElementById('acc-ext-6')?.checked)        motorAcc.push('6" extension cable');
  if(document.getElementById('acc-ext-48')?.checked)       motorAcc.push('48" extension cable');
  if(document.getElementById('acc-ext-96')?.checked)       motorAcc.push('96" extension cable');

  var body=[
    '=== WALLACE PORTFOLIO FABRIC ROMAN SHADE QUOTE ===','',
    'CONTACT',
    'Name: '+name,
    'Phone: '+phone,
    'Email: '+(document.getElementById('cf-email').value.trim()||'—'),
    'Address: '+(document.getElementById('cf-address').value.trim()||'—'),'',
    'ORDER DETAILS',
    'Product: Wallace Portfolio Collection Fabric Roman Shades',
    'Quantity: '+S.qty+' shade(s)',
    'Mount: '+(S.mount==='inside'?'Inside mount':'Outside mount'),
    'Width: '+S.width+'"',
    'Length: '+S.length+'"','',
    'CONSTRUCTION',
    'Shade style: '+(S.shadeStyle==='roman-valance'?'Roman Valance — decorative non-functional flat roman (no lift system)':shadStyleLabels[S.shadeStyle]||S.shadeStyle),
    'Panel style: '+(panelLabels[S.panelStyle]||S.panelStyle),'',
    'FABRIC',
    'Pattern: '+(S.fabric?S.fabric.pattern:'—'),
    'Color: '+(S.fabric?S.fabric.color:'—'),
    'Fabric code: '+(S.fabric?S.fabric.code:'—'),
    'Price group: '+(S.fabric?'Group '+S.fabric.priceGroup:'—'),
    'Composition: '+(S.fabric?S.fabric.composition:'—'),
    'Weight: '+(S.fabric?S.fabric.weightGsm+' gsm':'—'),
    'Fabric width: '+(S.fabric?S.fabric.fabricWidth+'"':'—'),
    'Repeat: '+(S.fabric&&S.fabric.repeatWidth?'W '+S.fabric.repeatWidth+'" × H '+S.fabric.repeatHeight+'"':'None'),
    'Flat style available: '+(S.fabric?(!S.fabric.noFlat?'Yes':'No — [1] fabric'):'—'),
    'TDBU available: '+(S.fabric?(S.fabric.tdbuAvailable?'Yes':'No'):'—'),
    'Cord loop color: '+(S.fabric?S.fabric.cordLoopColor:'—'),'',
    'LINER & ALIGNMENT',
    'Liner: '+S.liner+' — '+S.linerLabel,
    'Panel alignment: '+(S.alignment==='top'?'Top Panel Aligned':'Bottom Panel Aligned'),'',
    'CONTROL',
    'Control type: '+(S.shadeStyle==='roman-valance'?'Decorative — no lift system (Roman Valance)':controlLabels[S.control]||S.control),
    (S.control==='clutch'?'Chain length: '+chainLen:''),
    (S.control==='prowand'?'Wand length: '+wandLen+' (White)':''),
    ((S.control==='clutch'||S.control==='prowand'||S.control==='motor')?'Control side: '+controlSide:''),
    (S.control==='motor'?'Motor type: '+(motorTypeLabels[S.motorType]||S.motorType):''),
    (S.control==='motor'?'Motor controls: '+motorControl:''),
    (S.control==='motor'&&motorAcc.length?'Motor accessories: '+motorAcc.join(', '):''),'',
    'VALANCE & RETURNS',
    'Returns: '+returnLabel,
    '2-on-1 headrail: '+(S.twoOn1?'Yes — second shade width: '+S.width2+'" (total '+(S.width+S.width2)+'")':'No'),'',
    'CUT FABRIC',
    'Cut fabric request: '+(S.cutFabric?'Yes — '+(document.getElementById('cut-fabric-notes')?.value.trim()||'see notes'):'None'),'',
    'DELIVERY',
    delivery,'',
    (validationFlags.length?'VALIDATION FLAGS\n'+validationFlags.join('\n')+'\n':''),
    'INTERNAL PRICING (owner reference only — not shown to customer):',
    (function(){
      var f=S.fabric,w=S.width,l=S.length;
      if(!f||!w||!l) return 'Enter dims + fabric to calculate';
      var isHob=S.panelStyle==='hobbled';
      // Roman Valance: priced as flat roman using total height (already in S.length)
var p=isHob?getPriceHobbled(w,l,f.priceGroup):getPriceFlat(w,l,f.priceGroup,f.noFlat);
      if(!p) return 'Out of table range — call for price';
      var tot=p;var ns=[];
      if(S.liner==='BO01'){tot=Math.round(tot*1.10);ns.push('blackout +10%');}
      return '$'+tot+'/shade Group '+f.priceGroup+(ns.length?' ('+ns.join(', ')+')':'');
    })(),
    'NOTES',
    document.getElementById('cf-notes').value.trim()||'None','',
    '⚠ INTERNAL NOTE: Fabric codes marked "ENTER" are placeholders. Enter all codes from Wallace PDF pages 3-5 before finalizing this quote.','',
    '--- Sent from blindznation.com/pages/wallace-portfolio-roman.html ---',
  ].filter(function(l){return l!==undefined&&l!==null;}).join('\n');

  var subj='Wallace Portfolio Roman — '+S.width+'"×'+S.length+'" '+(S.fabric?S.fabric.pattern+' '+S.fabric.color:'')+' — '+name;
  window.location.href='mailto:blindznation@gmail.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(body);

  document.getElementById('step16-body').querySelectorAll(':not(#success-box)').forEach(function(el){el.style.display='none';});
  document.getElementById('success-box').style.display='block';
}

// ── INIT ──────────────────────────────────────────────────────────────────────
renderFabricGrid();
// Initialize quantity spec (qty defaults to 1)
setQtyVal(1);
