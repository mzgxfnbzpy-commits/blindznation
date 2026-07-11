// Anchor-based auto-selection: #roman-woven-choice or #roller-woven-choice
(function(){
  var hash = window.location.hash;
  if(hash === '#roman-woven-choice' || hash === '#roller-woven-choice') {
    var style = hash === '#roller-woven-choice' ? 'roller' : 'roman';
    window.addEventListener('load', function(){
      setTimeout(function(){
        var card = document.getElementById('style-' + style);
        if(card) pickStyle(style, card);
        var anchor = document.getElementById(hash.slice(1));
        if(anchor) anchor.scrollIntoView({behavior:'smooth', block:'start'});
      }, 250);
    });
  }
})();

/* ─────────────────────────────────────────────
   PORTFOLIO NATURAL WOVEN pattern data
   NOTE: ZH- codes and price groups need
   verification from Portfolio PDF.
   Sliding panels and draperies available.
───────────────────────────────────────────── */
const PORT_LINERS = {
  lf: [{code:'LF-BG', name:'Beige'},{code:'LF-WH', name:'White'},{code:'LF-IV', name:'Ivory'},{code:'LF-GY', name:'Gray'}],
  bo: [{code:'BO-BG', name:'Beige'},{code:'BO-WH', name:'White'},{code:'BO-CH', name:'Chocolate'}]
};
const PORT_EB_COLORS = ['Natural','Wheat','Camel','Onyx','Pearl','Stone','Ivory','White'];
// Portfolio patterns — ZH- codes placeholder, verify from PDF
const PORT_PATTERNS = [
  'Abaca Grain','Antilles Natural','Bamboo Tokyo','Bontae Wheat','Briar Bone',
  'Buckeye Flax','Burma Grass','Camelot Straw','Cebu Seagrass','Celeste Ivory',
  'Cezanne Fog','Charade Natural','Chimayo Cotton','Cocoa Beach Tortoiseshell',
  'Cora Natural','Delray Natural','Dune Wheat','Fuji Natural','Grassy Knoll Natural',
  'Hatteras Natural','Java Cocoa','Kauai Natural','Kilauea Bark','Kona Coffee',
  'La Palma Natural','Lagos Seagrass','Lahinch Dune','Lomas Natural','Maui Driftwood',
  'Mayan Weave','Mykonos Natural','Nantucket Natural','Nassau Natural','Nepal Stone',
  'Outer Banks Natural','Palapa Wheat','Palmetto Natural','Papyrus Natural',
  'Pashmina Ivory','Prairie Natural','Richmond Natural','Sahara Gold','Samoa Natural',
  'Savanna Natural','Seagrass Ivory','Serpentine Natural','Shoji Wheat','Siena Natural',
  'Singapore Natural','Sonoma Dusk','Tivoli Wheat','Toscana Natural','Vail Natural',
  'Waikiki Natural','Waterfall Birch','Whistler Natural','Yucatan Natural'
].map((n,i)=>({
  code:'ZH-'+(101+i).toString().padStart(3,'0'), // placeholder — verify from PDF
  name:n, group:'TBD', // verify price group from PDF
  cordlessTDBU:true, slidingPanel:true, naturalDrapery:true,
  edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false,
  motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''
}));

/* ─────────────────────────────────────────────
   GALAXY WOVEN pattern data
   NOTE: G- codes and price groups need
   verification from Galaxy PDF.
   Roman shades only. Hobbled style available.
   Pattern-specific motor/size limits apply.
───────────────────────────────────────────── */
const GAL_LINERS = {
  lf: [{code:'LF-BG',name:'Beige'},{code:'LF-WH',name:'White'},{code:'LF-IV',name:'Ivory'},{code:'LF-GY',name:'Gray'}],
  bo: [{code:'BO-BG',name:'Beige'},{code:'BO-WH',name:'White'}]
};
const GAL_EB_COLORS = ['Natural','Wheat','Camel','Onyx','Pearl','Stone','Ivory'];
// Galaxy patterns — G- codes placeholder, verify from Galaxy PDF
const GAL_PATTERNS = [
  'Arusha Wheat','Aurora Grain','Bali Gold','Borneo Bark','Bounty Natural',
  'Canton Ivory','Capetown Natural','Caribe Natural','Ceylon Ivory','Congo Natural',
  'Delhi Wheat','Driftwood Sandy','Dublin Natural','Essex Natural','Finca Wheat',
  'Flores Natural','Galaxy Gold','Galaxy Natural','Galaxy White','Geneva Linen',
  'Havana Natural','Hong Kong Natural','Honolulu Natural','Ibiza Natural','Indigo Sky',
  'Jakarta Natural','Java Natural','Juniper Wheat','Kenya Natural','Kingston Natural',
  'Lagos Natural','Lucerne Natural','Manila Natural','Maui Natural','Milan Linen',
  'Monaco Linen','Nassau Wheat','Nepal Natural','Oslo Ivory','Pacific Natural',
  'Palermo Natural','Panama Natural','Perth Natural','Porto Natural','Prague Natural',
  'Queensland Natural','Rio Natural','Roma Natural','Samoa Wheat','Santiago Natural',
  'Seoul Natural','Shanghai Natural','Sofia Natural','Sydney Natural','Tahiti Natural',
  'Taipei Natural','Tokyo Natural','Trinidad Natural','Tuscan Natural','Valencia Natural'
].map((n,i)=>({
  code:'G-'+(101+i).toString().padStart(3,'0'), // placeholder — verify from Galaxy PDF
  name:n, group:'TBD', // verify price group from Galaxy 2025 PDF
  cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true,
  edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false,
  motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:'' // verify per-pattern from PDF
}));

/* ─────────────────────────────────────────────
   WALDEN PREMIER pattern data
   Source: 2026 Walden Premier PDF pages 4-5
   All 47 patterns verified: real E-codes, groups
   A-F, per-pattern cordlessTDBU/slidingPanel/
   naturalDrapery flags, motor sq ft, coordEB.
   Max width: 96" for all patterns.
───────────────────────────────────────────── */
const WP_LINERS = {
  lf: [
    {code:'NK-L', name:'Beige'}, {code:'NB-L', name:'Black', note:'seam>53'},
    {code:'NC-L', name:'Chocolate'}, {code:'NG-L', name:'Gray'},
    {code:'W4-L', name:'White'}
  ],
  bo: [
    {code:'K3-D', name:'Beige'}, {code:'C2-D', name:'Chocolate'}, {code:'W4-D', name:'White'}
  ]
};
const WP_EB = {
  narrow: ['N3 Beige','N10 Black','N4 Chocolate','N5 Copper','N8 Cream','N6 Desert Sand','N2 Light Beige','N15 Natural','N11 Sienna','N1 White'],
  wide:   ['W3 Beige','W10 Black','W4 Chocolate','W5 Copper','W8 Cream','W6 Desert Sand','W2 Light Beige','W15 Natural','W11 Sienna','W1 White'],
  ramie:  ['NL4 Brown','NL35 Camel','NL88 Cedar','NL1 Chalk','NL3 Graphite','NL2 Linen','NL7 Midnight','NL6 Navy','NL71 Stone','NL33 Titanium']
};
// Premier patterns — verified from 2026 Walden Premier PDF pages 4-5
const WP_PATTERNS = [
  {code:'E-M01',  name:'Aires White',        group:'F', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:true,  motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:'Chalk',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-87K',  name:'Alder Oak',          group:'B', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:true,  motorMaxNoLiner:44, motorMaxWithLiner:38, coordEB:'Camel',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-232W', name:'Andell Linen',       group:'F', edgeBindingRequired:true,  cordlessTDBU:true,  slidingPanel:false, naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:'Stone',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-432',  name:'Artisan Weave',      group:'E', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:false, naturalDrapery:false, motorMaxNoLiner:44, motorMaxWithLiner:38, coordEB:'Stone',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-416-3',name:'Aspen Ebony',        group:'C', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:44, motorMaxWithLiner:38, coordEB:'Brown',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-082',  name:'Aspen Walnut',       group:'C', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:44, motorMaxWithLiner:38, coordEB:'Brown',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-416-4',name:'Aspen White',        group:'C', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:44, motorMaxWithLiner:38, coordEB:'Chalk',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-234G', name:'Avon Dawn',          group:'F', edgeBindingRequired:true,  cordlessTDBU:true,  slidingPanel:false, naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:'Stone',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-234W', name:'Avon Lace',          group:'F', edgeBindingRequired:true,  cordlessTDBU:true,  slidingPanel:false, naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:'Chalk',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-R26',  name:'Bamboo Forest',      group:'B', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:44, motorMaxWithLiner:38, coordEB:'Camel',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-365',  name:'Barcelona Café',     group:'B', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:54, motorMaxWithLiner:44, coordEB:'Camel',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-861',  name:'Bora Bora',          group:'B', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:50, motorMaxWithLiner:42, coordEB:'Camel',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-430',  name:'Capri Natural',      group:'D', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Camel',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-233B', name:'Castelo Black',      group:'D', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:false, naturalDrapery:true,  motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Midnight', edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-233P', name:'Castelo White',      group:'D', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:false, naturalDrapery:true,  motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Chalk',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-389',  name:'Catalina',           group:'E', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:true,  motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:'Linen',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-E11',  name:'Devon Ivory',        group:'A', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:true,  motorMaxNoLiner:56, motorMaxWithLiner:45, coordEB:'Linen',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-E06',  name:'Devon Maple',        group:'A', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:true,  motorMaxNoLiner:56, motorMaxWithLiner:45, coordEB:'Cedar',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-E02',  name:'Devon White',        group:'A', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:true,  motorMaxNoLiner:56, motorMaxWithLiner:45, coordEB:'Chalk',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-68N',  name:'Driftwood Natural',  group:'B', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:44, motorMaxWithLiner:38, coordEB:'Linen',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-055',  name:'Java Cocoa',         group:'B', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:54, motorMaxWithLiner:44, coordEB:'Brown',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-B01',  name:'Mandalay Umber',     group:'C', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:33, motorMaxWithLiner:30, coordEB:'Brown',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-801',  name:'Mykonos Dunes',      group:'F', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Linen',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-390',  name:'Natural Jute',       group:'E', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:true,  motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Linen',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-803',  name:'Navarre White Sand', group:'F', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Linen',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-P01',  name:'Orleans Macaroon',   group:'E', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:false, naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:'Chalk',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-403-B',name:'Penang Oak',         group:'A', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:56, motorMaxWithLiner:45, coordEB:'Camel',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-427',  name:'Prairie Golden',     group:'E', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Linen',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-828',  name:'Prairie Snow',       group:'F', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Linen',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-428',  name:'Prairie White',      group:'E', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Linen',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-M04',  name:'Remi Breeze',        group:'E', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Stone',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-233W', name:'Rhone Blanc',        group:'E', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:false, naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:'Chalk',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-001',  name:'Sakura Oregano',     group:'C', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:54, motorMaxWithLiner:44, coordEB:'Cedar',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-352',  name:'Savanna Husk',       group:'C', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Camel',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-U01',  name:'Saybrook Stone',     group:'E', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:56, motorMaxWithLiner:45, coordEB:'Cedar',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-U03',  name:'Seaside White',      group:'F', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:56, motorMaxWithLiner:45, coordEB:'Stone',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-370',  name:'Sierra Sand',        group:'D', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:false, naturalDrapery:false, motorMaxNoLiner:50, motorMaxWithLiner:42, coordEB:'Camel',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-438',  name:'Sunshade Brown',     group:'A', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:true,  motorMaxNoLiner:54, motorMaxWithLiner:48, coordEB:'Camel',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-10H',  name:'Sunshade White',     group:'C', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:true,  motorMaxNoLiner:44, motorMaxWithLiner:38, coordEB:'Chalk',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-394',  name:'Tamarind Sunset',    group:'B', edgeBindingRequired:false, cordlessTDBU:false, slidingPanel:true,  naturalDrapery:true,  motorMaxNoLiner:44, motorMaxWithLiner:38, coordEB:'Camel',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-805',  name:'Telluride Frost',    group:'D', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:true,  motorMaxNoLiner:44, motorMaxWithLiner:38, coordEB:'Chalk',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-806',  name:'Telluride Thunder',  group:'D', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:true,  motorMaxNoLiner:44, motorMaxWithLiner:38, coordEB:'Stone',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-2203', name:'Twyla Cascade',      group:'E', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:56, motorMaxWithLiner:45, coordEB:'Stone',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-2201', name:'Twyla Cotton',       group:'E', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:56, motorMaxWithLiner:45, coordEB:'Chalk',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-2104', name:'Zahra Dark Olive',   group:'F', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Cedar',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-2103', name:'Zahra Sepia',        group:'F', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Cedar',    edgeBindingRecommended:false, edgeSeal:false},
  {code:'E-2102', name:'Zahra Sorbet',       group:'F', edgeBindingRequired:false, cordlessTDBU:true,  slidingPanel:true,  naturalDrapery:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Stone',    edgeBindingRecommended:false, edgeSeal:false},
];

/* ─────────────────────────────────────────────
   WALDEN SELECT pattern data — complete from PDF
───────────────────────────────────────────── */
const WS_LINERS = {
  lf: [
    {code:'LF82', name:'Beige'}, {code:'LF10', name:'Black', note:'seam>53'},
    {code:'LF1',  name:'Bright White'}, {code:'LF5',  name:'Ivory'},
    {code:'LF58', name:'Gray'}, {code:'LF62', name:'Soft White'}
  ],
  bo: [
    {code:'BO03', name:'Beige'}, {code:'BO09', name:'Espresso'}, {code:'BO01', name:'White'}
  ]
};
const WS_EB_COLORS = ['EB09 Camel','EB78 Navy','EB15 Olive','EB10 Onyx','EB62 Pearl','EB105 Stone','EB58 Titanium','EB82 Wheat'];
// Select patterns — complete with WS codes and price groups
// edgeBindingRequired/Recommended/edgeSeal flags default to false — verify [1][2][3] marks from PDF pages 4-5
const WS_PATTERNS = [
  {code:'WS-F132',name:'Alisia Antique White',group:'E',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:true,coordEB:'Wheat'},
  {code:'WS-F111',name:'Alisia Chiffon',group:'E',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-F122',name:'Alisia Morning',group:'E',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-V043',name:'Andros Birch',group:'E',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-V049',name:'Andros Harbor',group:'E',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1922',name:'Antilles Mist',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1903',name:'Antilles Sand',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1905',name:'Antilles Seagrass',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-5322',name:'Cala Platinum',group:'B',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-5302',name:'Cala Titanium',group:'B',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0390',name:'Camden Natural',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0392',name:'Camden Snow',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-W116',name:'Chelsea Lace',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-W118',name:'Chelsea Taupe',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1322',name:'Como Charcoal',group:'E',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1302',name:'Como Ecru',group:'E',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1323',name:'Como Gray',group:'E',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1388',name:'Como Midnight',group:'E',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1303',name:'Como Umber',group:'E',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-A904',name:'Fay Black',group:'E',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-A133',name:'Fay Snow',group:'E',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-D601',name:'Fay Tan',group:'E',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0389',name:'Halifax Natural',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0427',name:'Harbor Golden',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0428',name:'Harbor White',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-E402',name:'Lou Coconut',group:'C',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-E302',name:'Lou Contrast',group:'C',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-E401',name:'Lou Cotton',group:'C',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-E501',name:'Lou Driftwood',group:'C',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0702',name:'Malvern Chalk',group:'B',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0722',name:'Malvern Gray',group:'B',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0721',name:'Malvern Light Gray',group:'B',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0723',name:'Malvern Platinum',group:'B',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0812',name:'Metro Caramel',group:'C',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0802',name:'Metro Chalk',group:'C',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0822',name:'Metro Smoke',group:'C',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1806',name:'Montana Inkwash',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1888',name:'Montana Mineral',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1605',name:'Nantucket Sea Mist',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0522',name:'Osaka Granite',group:'B',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0502',name:'Osaka Snow',group:'B',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1516',name:'Parchment Husk',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1201',name:'Peri Mist',group:'E',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1517',name:'Portland Inkwash',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1522',name:'Portland Sky',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0602',name:'Pudong White',group:'A',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1101',name:'Selene Natural',group:'E',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1102',name:'Selene White',group:'E',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0004',name:'Soft Jute Beige',group:'F',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0022',name:'Soft Jute Gray',group:'F',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0001',name:'Soft Jute White',group:'F',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-1504',name:'Sonoma Dusk',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-9077',name:'Terra Oak',group:'C',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0833',name:'Tortola Natural',group:'D',naturalDrapery:true,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0288',name:'Umbria Ink',group:'C',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0222',name:'Umbria Mist',group:'C',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''},
  {code:'WS-0219',name:'Umbria Sepia',group:'C',naturalDrapery:false,slidingPanel:true,edgeBindingRequired:false,edgeBindingRecommended:false,edgeSeal:false,coordEB:''}
];

/* ── Control size limits ── */
const CTRL_LIMITS = {
  cordless: {minW:15, maxW:96, minH:18, maxH:96},
  tdbu:     {minW:18, maxW_premier:60, maxW_select:70, minH:18, maxH_premier:72, maxH_select:96},
  clutch:   {minW:14, maxW:96, minH:18, maxH:108},
  prowand:  {minW:23, maxW:96, minH:18, maxH:108},
  motorLI:  {minW:23, maxW:96, minH:18, maxH:108},
  motorDC:  {minW:17.375, maxW:96, minH:18, maxH:108},
  motorAC:  {minW:20, maxW:96, minH:18, maxH:108},
  motorPL:  {minW:29.5, maxW:96, minH:18, maxH:108} // Premier only
};

/* ── Sliding panel configuration ── */
function getPanelConfig(w, opening) {
  if (w <= 84)  return opening==='center' ? {panels:4,channels:'3-channel or 2-channel narrow'} : {panels:3,channels:'3-channel'};
  if (w <= 120) return opening==='center' ? {panels:4,channels:'3-channel or 2-channel narrow'} : {panels:4,channels:'4-channel'};
  if (w <= 144) return opening==='center' ? {panels:6,channels:'3-channel'} : {panels:5,channels:'5-channel'};
  return opening==='center' ? {panels:8,channels:'4-channel'} : {panels:5,channels:'5-channel'};
}

/* ── Drapery stack depth ── */
const STACK_MAP = {48:13,60:16.25,72:19.5,84:22.75,96:26,108:29.25,120:32.5,132:35.75,144:39,156:42.25,168:45.5,180:48.75,192:52};
function getStack(w) {
  const keys = Object.keys(STACK_MAP).map(Number).sort((a,b)=>a-b);
  for (const k of keys) if (w <= k) return STACK_MAP[k];
  return STACK_MAP[192];
}

/* ── State ── */
const S = {
  collection:'', productType:'', qty:1,
  mountType:'', w:0, h:0, pattern:null,
  shadeStyle:'', multi:'none', twin:false,
  openingStyle:'', trackColor:'', bracketType:'',
  valanceBoard:false, trackProfile:'', wallOrCeiling:'',
  control:'', liner:'none', linerColor:'',
  ebType:'none', ebColor:'', returns:'none',
  cutouts:0, holdDown:false, spacer:false,
  motorAccs:[], delivery:'', warnings:[]
};

function $ (id) { return document.getElementById(id); }
function show(id){var e=$( id);if(e)e.style.display='';}
function hide(id){var e=$(id);if(e)e.style.display='none';}
function showb(id){var e=$(id);if(e){e.style.display='block';}}
function hideb(id){var e=$(id);if(e)e.style.display='none';}

function togglePill(el, grp) {
  el.closest('.opt-row,.step-block').querySelectorAll('.opt-pill').forEach(function(p){
    if(p.dataset.group===grp||!grp) p.classList.remove('sel');
  });
  if(grp) el.closest('.step-block, .config-wrap').querySelectorAll('.opt-pill').forEach(function(p){
    if(p.getAttribute('onclick')&&p.getAttribute('onclick').includes(grp)) p.classList.remove('sel');
  });
  el.classList.add('sel');
}

/* ── Step navigation ── */
function goS(n) {
  // Validate current step before moving forward
  if(n===5 && S.productType==='drapery' && S.collection==='select') {
    // will filter fabric grid on show
  }
  $('s'+n).style.display='block';
  $('s'+n).scrollIntoView({behavior:'smooth',block:'start'});
  if(n===5) buildFabricGrid();
  if(n===7) updateControls();
  if(n===8) buildLinerOpts();
  if(n===9) buildEBOpts();
  if(n===10) updateSpecials();
  if(n===11) updateMotor();
}

/* ── Style picker (Roller vs Roman) ── */
var rS = { mount:'', ctrl:'', liner:'', cass:'', delivery:'' };

function pickStyle(s, el) {
  document.querySelectorAll('#s0 .choice-card').forEach(function(c){c.classList.remove('sel');});
  if(el) el.classList.add('sel');
  document.getElementById('roller-section').style.display = s==='roller' ? 'block' : 'none';
  document.getElementById('roman-section').style.display  = s==='roman'  ? 'block' : 'none';
  if(s==='roman') setTimeout(function(){
    document.getElementById('roman-section').scrollIntoView({behavior:'smooth',block:'start'});
  },80);
  if(s==='roller') setTimeout(function(){
    document.getElementById('roller-section').scrollIntoView({behavior:'smooth',block:'start'});
  },80);
}

function rPill(el, grpId) {
  // For opt-pill groups, remove sel from siblings; for delivery-opt groups remove sel
  if(grpId==='r-del-grp') {
    ['r-del-install','r-del-ship'].forEach(function(id){
      var e=document.getElementById(id); if(e) e.classList.remove('sel');
    });
    el.classList.add('sel');
  } else {
    var grp = document.getElementById(grpId);
    if(grp) grp.querySelectorAll('.opt-pill').forEach(function(p){p.classList.remove('sel');});
    el.classList.add('sel');
  }
}

function submitRollerQuote() {
  var name = (document.getElementById('r-name')||{}).value||'';
  var contact = (document.getElementById('r-contact')||{}).value||'';
  name = name.trim(); contact = contact.trim();
  if(!name||!contact){ alert('Please enter your name and contact info.'); return; }

  var body =
    'Wallace Portfolio Natural Woven Rollers — Quote Request\n'
    +'=====================================================\n\n'
    +'PRODUCT: Roller Shade — Wallace Portfolio Natural Woven Rollers\n\n'
    +'FABRIC PREFERENCE\n'
    +'  Pattern / style : '+((document.getElementById('r-pattern')||{}).value||'—')+'\n'
    +'  Color           : '+((document.getElementById('r-color')||{}).value||'—')+'\n\n'
    +'DIMENSIONS\n'
    +'  Width  : '+((document.getElementById('r-w')||{}).value||'—')+' in\n'
    +'  Height : '+((document.getElementById('r-h')||{}).value||'—')+' in\n'
    +'  Qty    : '+((document.getElementById('r-qty')||{}).value||'1')+'\n'
    +'  Room   : '+((document.getElementById('r-room')||{}).value||'—')+'\n\n'
    +'OPTIONS\n'
    +'  Mount          : '+(rS.mount||'—')+'\n'
    +'  Control        : '+(rS.ctrl||'—')+'\n'
    +'  Light / liner  : '+(rS.liner||'—')+'\n'
    +'  Cassette color : '+(rS.cass||'—')+'\n\n'
    +'DELIVERY: '+(rS.delivery||'—')+'\n\n'
    +'CONTACT\n'
    +'  Name    : '+name+'\n'
    +'  Contact : '+contact+'\n'
    +'  Address : '+((document.getElementById('r-address')||{}).value||'—')+'\n'
    +'  Notes   : '+((document.getElementById('r-notes')||{}).value||'—');

  window.location.href = 'mailto:blindznation@gmail.com'
    +'?subject='+encodeURIComponent('Natural Woven Roller Shades Quote — '+name)
    +'&body='+encodeURIComponent(body);

  document.getElementById('success-box').style.display = 'block';
  document.getElementById('roller-section').style.display = 'none';
  document.getElementById('s0').style.display = 'none';
}

/* ── Step 1: Collection ── */
function pickCollection(c, el) {
  S.collection = c;
  _s6setup = false;
  document.querySelectorAll('#s1 .choice-card').forEach(function(cc){cc.classList.remove('sel');});
  el.classList.add('sel');
  // Portfolio and Galaxy are Roman-shade-only in this flow
  var romanOnly = (c === 'portfolio' || c === 'galaxy');
  $('s2-panel-card').style.display    = romanOnly ? 'none' : '';
  $('s2-drapery-card').style.display  = romanOnly ? 'none' : '';
  $('s2-valance-card').style.display  = romanOnly ? 'none' : '';
  $('s2-extra-row').style.display     = romanOnly ? 'none' : '';
  $('s2-roman-only-note').style.display = romanOnly ? 'block' : 'none';
  // Galaxy supports hobbled style
  $('hobbled-style-pill').style.display = (c === 'galaxy') ? '' : 'none';
  $('hobbled-note').style.display = 'none';
  $('s2').style.display='block';
  $('s2').scrollIntoView({behavior:'smooth',block:'start'});
}

/* ── Step 2: Product type ── */
function pickType(t, el) {
  S.productType = t;
  _s6setup = false; // reset so step 6 re-renders for new product type
  document.querySelectorAll('#s2 .choice-card').forEach(function(cc){cc.classList.remove('sel');});
  el.classList.add('sel');
  // Ceiling mount only for panels/draperies
  $('mount-ceiling').style.display = (t==='roman'||t==='valance') ? 'none' : '';
  $('s3').style.display='block';
  $('s3').scrollIntoView({behavior:'smooth',block:'start'});
}

/* ── Step 3: Mount ── */
function pickMount(m, el) {
  S.mountType = m;
  document.querySelectorAll('#mount-opts .opt-btn').forEach(function(p){p.classList.remove('sel');});
  el.classList.add('sel');
  $('warn-im-deduction').style.display = m==='inside' ? 'block' : 'none';
}

/* ── Step 3: Quantity stepper ── */
function adjQty(d) {
  var el = $('qty'); if(!el) return;
  var v = Math.max(1, Math.min(50, (parseInt(el.value,10)||1) + d));
  el.value = v; S.qty = v;
}

/* ── Step 4: Dimensions ── */
function dimChanged() {
  var w = parseFloat($('w').value)||0, h = parseFloat($('h').value)||0;
  S.w=w; S.h=h;
  // Size limits by product type
  var limits = {
    roman: {minW:14,maxW:96,minH:18,maxH:108},
    panel: {minW:48,maxW:192,minH:24,maxH:120},
    drapery:{minW:48,maxW:192,minH:24,maxH:96},
    valance:{minW:1,maxW:96,minH:1,maxH:18}
  }[S.productType]||{};
  var $si = $('size-limits-info');
  $si.innerHTML = {
    roman:'Max 96" W × 108" H for most controls. Cordless max 96"H. All controls min 18"H.',
    panel:'Min 48"W × 24"H &nbsp;|&nbsp; Max 192"W × 120"H. Tracks over 94" spliced.',
    drapery:'Min 48"W × 24"H &nbsp;|&nbsp; Max 192"W × 96"H. Tracks over 94" spliced.',
    valance:'Max 96"W × 18"H.'
  }[S.productType]||'';
  var errs=[];
  if(w&&h){
    if(w<limits.minW) errs.push('Width below minimum '+limits.minW+'".');
    if(w>limits.maxW) errs.push('Width exceeds maximum '+limits.maxW+'".');
    if(h<limits.minH) errs.push('Height below minimum '+limits.minH+'".');
    if(h>limits.maxH) errs.push('Height exceeds maximum '+limits.maxH+'".');
  }
  var $e=$('dim-err'); $e.textContent=errs.join(' '); $e.style.display=errs.length?'block':'none';
  // Splice warning
  var spliceW = (S.productType==='panel'||S.productType==='drapery') && w>94;
  $('warn-splice').style.display = spliceW?'block':'none';
  // Panel config
  if(S.productType==='panel'&&w&&h&&S.openingStyle){
    var cfg=getPanelConfig(w,S.openingStyle);
    $('panel-calc').style.display='block';
    $('panel-calc-text').textContent=cfg.panels+' panels, '+cfg.channels+' track';
  } else $('panel-calc').style.display='none';
  // Drapery stack
  if(S.productType==='drapery'&&w){
    var st=getStack(w);
    $('stack-display').style.display='block';
    $('stack-text').textContent=st+'" (÷2 for split draw)';
  } else $('stack-display').style.display='none';
}

/* ── Step 5: Fabric grid ── */
function getPatterns() {
  if(S.collection==='portfolio') return PORT_PATTERNS;
  if(S.collection==='galaxy')    return GAL_PATTERNS;
  if(S.collection==='premier')   return WP_PATTERNS;
  return WS_PATTERNS;
}
function buildFabricGrid() {
  var patterns = getPatterns();
  var grid = $('fabric-grid');
  grid.innerHTML = '';
  var collNotes = {
    portfolio:'<strong>Wallace Portfolio Natural Woven</strong> — ZH- fabric codes. Codes require PDF verification before ordering.',
    galaxy:'<strong>Wallace Galaxy Woven</strong> — G- fabric codes. Hobbled style available. Motor/size limits are pattern-specific — verify from PDF.',
    premier:'<strong>Walden Premier</strong> — 47 fabrics. E- codes require PDF verification.',
    select:'<strong>Walden Select</strong> — 56 fabrics with WS- fabric codes.'
  };
  $('fabric-collection-note').innerHTML = collNotes[S.collection]||'';
  patterns.forEach(function(p){
    var el=document.createElement('div');
    el.className='fabric-card';
    el.setAttribute('data-name',p.name.toLowerCase());
    el.setAttribute('data-code',(p.code||'').toLowerCase());
    // Check eligibility for selected product type
    var ineligible=false;
    if(S.productType==='panel' && p.slidingPanel===false) ineligible=true;
    if(S.productType==='drapery' && p.naturalDrapery===false) ineligible=true;
    if(ineligible) {el.style.opacity='0.4'; el.style.pointerEvents='none';}
    var flags='';
    if(p.edgeBindingRequired) flags+='<span class="fabric-flag warn">EB Required</span>';
    if(p.edgeSeal) flags+='<span class="fabric-flag">Edge Seal</span>';
    if(p.naturalDrapery===false) flags+='<span class="fabric-flag">No Drapery</span>';
    el.innerHTML='<div class="fabric-code">'+p.code+'</div>'
      +'<div class="fabric-name">'+p.name+'</div>'
      +'<div class="fabric-group">Group '+(p.group||'?')+'</div>'
      +(flags?'<div class="fabric-flags">'+flags+'</div>':'');
    el.onclick=function(){selectFabric(p,this);};
    grid.appendChild(el);
  });
}
function filterFabrics(q) {
  q=q.toLowerCase();
  document.querySelectorAll('.fabric-card').forEach(function(c){
    var match=!q||c.getAttribute('data-name').includes(q)||c.getAttribute('data-code').includes(q);
    c.classList.toggle('hidden',!match);
  });
}
function selectFabric(p, el) {
  document.querySelectorAll('.fabric-card').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  S.pattern=p;
  var $fs=$('fabric-summary');
  $fs.style.display='block';
  $fs.innerHTML='<strong>'+p.name+'</strong> &nbsp;|&nbsp; '+p.code+' &nbsp;|&nbsp; Group '+(p.group||'?')
    +(p.coordEB?'<br>Coordinated edge binding: '+p.coordEB:'');
  $('warn-eb-required').style.display=p.edgeBindingRequired?'block':'none';
  $('warn-panel-ineligible').style.display=(S.productType==='panel'&&p.slidingPanel===false)?'block':'none';
  $('warn-drape-ineligible').style.display=(S.productType==='drapery'&&p.naturalDrapery===false)?'block':'none';
}

/* ── Step 6: Style ── */
function pickShadeStyle(st, el) {
  S.shadeStyle=st;
  document.querySelectorAll('#roman-style-opts .opt-row:first-of-type .opt-pill').forEach(function(p){p.classList.remove('sel');});
  el.classList.add('sel');
  // Waterfall and Hobbled: block 3-on-1, TDBU, Pro Wand
  if(st==='waterfall'||st==='hobbled'){
    $('multi-3on1').classList.add('disabled');
    $('twin-yes').classList.add('disabled');
  } else {
    $('multi-3on1').classList.remove('disabled');
    $('twin-yes').classList.remove('disabled');
  }
  $('hobbled-note').style.display = st==='hobbled' ? 'block' : 'none';
}
function pickMulti(m, el) {
  S.multi=m;
  document.querySelectorAll('#roman-style-opts .opt-row:nth-of-type(2) .opt-pill').forEach(function(p){p.classList.remove('sel');});
  el.classList.add('sel');
  $('warn-multi-width').style.display=(m==='2on1'||m==='3on1')?'block':'none';
  if(m==='3on1') $('twin-yes').classList.add('disabled');
  else if(S.shadeStyle!=='waterfall') $('twin-yes').classList.remove('disabled');
}
function pickTwin(yes, el) {
  S.twin=yes;
  document.querySelectorAll('#roman-style-opts .opt-row:nth-of-type(3) .opt-pill').forEach(function(p){p.classList.remove('sel');});
  el.classList.add('sel');
  $('twin-info').style.display=yes?'block':'none';
}
function pickOpening(o, el) {
  S.openingStyle=o;
  document.querySelectorAll('#opening-style-opts .opt-row .opt-pill').forEach(function(p){p.classList.remove('sel');});
  el.classList.add('sel');
  // Update panel config display
  if(S.productType==='panel'&&S.w){
    var cfg=getPanelConfig(S.w,o);
    $('panel-calc-s6').style.display='block';
    $('panel-calc-s6-text').textContent=cfg.panels+' panels, '+cfg.channels+' track';
  }
  // Drapery stack
  if(S.productType==='drapery'&&S.w){
    var st=getStack(S.w);
    $('drape-stack').style.display='block';
    $('drape-stack-text').textContent=st+'" '+(o==='center'?'(÷2 for split draw ≈ '+Math.round(st/2*4)/4+'")':'');
  }
}

// Show correct style section in step 6
(function setupS6(){
  document.addEventListener('DOMContentLoaded',function(){});
})();

// Called when step 6 shown
var _s6setup=false;
var _origGoS=goS;
goS=function(n){
  _origGoS(n);
  if(n===6&&!_s6setup){
    _s6setup=true;
    hideb('roman-style-opts'); hideb('opening-style-opts'); hideb('valance-only-opts');
    hideb('panel-extras'); hideb('drapery-extras');
    if(S.productType==='roman'){
      $('s6-title').textContent='Shade Style';
      showb('roman-style-opts');
    } else if(S.productType==='panel'){
      $('s6-title').textContent='Panel Opening';
      showb('opening-style-opts');
      showb('panel-extras');
    } else if(S.productType==='drapery'){
      $('s6-title').textContent='Drapery Opening';
      showb('opening-style-opts');
      showb('drapery-extras');
    } else {
      $('s6-title').textContent='Valance Options';
      showb('valance-only-opts');
    }
  }
};

/* ── Step 7: Controls ── */
function updateControls() {
  hideb('roman-controls'); hideb('panel-ctrl-note'); hideb('drape-ctrl-note'); hideb('valance-ctrl-note');
  if(S.productType==='roman'){
    showb('roman-controls');
    // Power Lift: Premier only
    $('ctrl-motorPL').style.display = S.collection==='premier' ? '' : 'none';
    // TDBU: disabled if waterfall, hobbled, twin, 3on1
    var tdbBlock=(S.shadeStyle==='waterfall'||S.shadeStyle==='hobbled'||S.twin||S.multi==='3on1');
    $('ctrl-tdbu').classList.toggle('disabled', tdbBlock);
    // Pro Wand: disabled if waterfall, hobbled, or twin
    var pwBlock=(S.shadeStyle==='waterfall'||S.shadeStyle==='hobbled'||S.twin);
    $('ctrl-prowand').classList.toggle('disabled', pwBlock);
    // Twin control option (show only if twin shade enabled)
    $('ctrl-twin-ctrl').style.display = S.twin ? '' : 'none';
  } else if(S.productType==='panel') showb('panel-ctrl-note');
  else if(S.productType==='drapery') showb('drape-ctrl-note');
  else showb('valance-ctrl-note');
}
function pickControl(c, el) {
  S.control=c;
  document.querySelectorAll('#ctrl-opts .opt-pill').forEach(function(p){p.classList.remove('sel');});
  el.classList.add('sel');
  var w=S.w, h=S.h, lm=CTRL_LIMITS[c]||{};
  var errs=[];
  var isTdbu = c==='tdbu';
  var isPremier = S.collection==='premier';
  var maxW = isTdbu ? (S.collection==='select'?lm.maxW_select:lm.maxW_premier) : lm.maxW;
  var maxH = isTdbu ? (isPremier?lm.maxH_premier:lm.maxH_select) : lm.maxH;
  if(w&&lm.minW&&w<lm.minW) errs.push('Min width for '+c+' is '+lm.minW+'".');
  if(w&&maxW&&w>maxW) errs.push('Max width for '+c+' is '+maxW+'".');
  if(h&&lm.minH&&h<lm.minH) errs.push('Min height for '+c+' is '+lm.minH+'".');
  if(h&&maxH&&h>maxH) errs.push('Max height for '+c+' is '+maxH+'" for '+S.collection+' TDBU.');
  var $ce=$('ctrl-err'); $ce.innerHTML=errs.join('<br>'); $ce.style.display=errs.length?'block':'none';
  // Limit info
  var $cli=$('ctrl-limit-info');
  if(c&&lm.minW){
    var dispMaxW = isTdbu?(S.collection==='select'?lm.maxW_select:lm.maxW_premier):lm.maxW;
    var dispMaxH = isTdbu?(isPremier?lm.maxH_premier:lm.maxH_select):lm.maxH;
    $cli.innerHTML='<strong>'+c.replace('motor','Remote Motor — ')+':</strong> Min '+lm.minW+'"W × '+lm.minH+'"H &nbsp;|&nbsp; Max '+dispMaxW+'"W × '+dispMaxH+'"H.';
    $cli.style.display='block';
  } else $cli.style.display='none';
  // Motor sqft warning (Premier pattern-specific)
  var motorTypes=['motorLI','motorDC','motorAC','prowand'];
  if(motorTypes.includes(c)&&S.collection==='premier'&&S.pattern&&w&&h){
    var sqft=w*h/144;
    var limit=S.liner==='none'?(S.pattern.motorMaxNoLiner||64):(S.pattern.motorMaxWithLiner||64);
    $('warn-motor-sqft').style.display=(sqft>limit&&c!=='motorPL')?'block':'none';
  } else $('warn-motor-sqft').style.display='none';
  // TDBU inside mount + returns warning
  $('warn-tdbu-returns').style.display=(c==='tdbu'&&S.mountType==='inside')?'block':'none';
}

/* ── Step 8: Liners ── */
function getLiners() {
  if(S.collection==='portfolio') return PORT_LINERS;
  if(S.collection==='galaxy')    return GAL_LINERS;
  if(S.collection==='premier')   return WP_LINERS;
  return WS_LINERS;
}
function buildLinerOpts() {
  $('liner-twin-opt').style.display = S.twin ? '' : 'none';
}
function pickLiner(type, el) {
  S.liner=type;
  document.querySelectorAll('#s8 .opt-row .opt-pill').forEach(function(p){p.classList.remove('sel');});
  el.classList.add('sel');
  if(type==='none'||type==='twin'){
    hideb('liner-color-section');
  } else {
    showb('liner-color-section');
    var liners = getLiners()[type]||[];
    var $opts=$('liner-color-opts'); $opts.innerHTML='';
    liners.forEach(function(l){
      var p=document.createElement('div');
      p.className='opt-pill';
      p.textContent=l.name+' ('+l.code+')';
      p.onclick=function(){
        S.linerColor=l.code+' '+l.name;
        document.querySelectorAll('#liner-color-opts .opt-pill').forEach(function(x){x.classList.remove('sel');});
        this.classList.add('sel');
        $('warn-black-seam').style.display=(l.note==='seam>53'&&S.w>53)?'block':'none';
      };
      $opts.appendChild(p);
    });
  }
}

/* ── Step 9: Edge binding ── */
function buildEBOpts() {
  var $eto=$('eb-type-opts'); $eto.innerHTML='';
  $('warn-eb-req-step9').style.display=(S.pattern&&S.pattern.edgeBindingRequired)?'block':'none';
  $('warn-edge-seal').style.display='none';

  function addEBType(label, key) {
    var p=document.createElement('div');
    p.className='opt-pill';
    if(S.pattern&&S.pattern.edgeBindingRequired&&key==='none') p.classList.add('disabled');
    p.textContent=label;
    p.onclick=function(){
      S.ebType=key;
      document.querySelectorAll('#eb-type-opts .opt-pill').forEach(function(x){x.classList.remove('sel');});
      this.classList.add('sel');
      if(key==='none'){
        hideb('eb-color-section');
        $('warn-edge-seal').style.display=(S.pattern&&S.pattern.edgeSeal)?'block':'none';
        $('warn-cutout-eb').style.display='none';
      } else {
        showb('eb-color-section');
        $('warn-edge-seal').style.display='none';
        buildEBColors(key);
        $('warn-cutout-eb').style.display=(S.cutouts>0)?'block':'none';
      }
    };
    $eto.appendChild(p);
  }

  addEBType('No edge binding','none');
  if(S.collection==='premier'){
    addEBType('Narrow Twill Tape','narrow');
    addEBType('Wide Twill Tape','wide');
    addEBType('Ramie Binding','ramie');
  } else {
    addEBType('Ramie Binding','ramie');
  }
}
function getEBColors(type) {
  if(S.collection==='select') return WS_EB_COLORS;
  if(S.collection==='portfolio') return PORT_EB_COLORS;
  if(S.collection==='galaxy') return GAL_EB_COLORS;
  return WP_EB[type]||[];
}
function buildEBColors(type) {
  var colors = getEBColors(type);
  var $ec=$('eb-color-opts'); $ec.innerHTML='';
  colors.forEach(function(c){
    var p=document.createElement('div');
    p.className='opt-pill'; p.textContent=c;
    p.onclick=function(){
      S.ebColor=c;
      document.querySelectorAll('#eb-color-opts .opt-pill').forEach(function(x){x.classList.remove('sel');});
      this.classList.add('sel');
    };
    $ec.appendChild(p);
  });
}

/* ── Step 10: Specials ── */
function updateSpecials() {
  hideb('roman-specials'); hideb('panel-specials'); hideb('valance-specials');
  if(S.productType==='roman') showb('roman-specials');
  else if(S.productType==='panel') showb('panel-specials');
  else showb('valance-specials');
}
function pickReturns(r, el) {
  S.returns=r;
  document.querySelectorAll('#s10 .opt-row .opt-pill[id^="ret"]').forEach(function(p){p.classList.remove('sel');});
  el.classList.add('sel');
  $('warn-tdbu-ret').style.display=(r==='yes'&&S.control==='tdbu'&&S.mountType==='inside')?'block':'none';
}
function updateCutoutWarn() {
  $('warn-cutout-conflict').style.display=(S.cutouts>0&&S.ebType!=='none')?'block':'none';
  $('warn-cutout-eb').style.display=(S.cutouts>0&&S.ebType!=='none')?'block':'none';
}

/* ── Step 11: Motor ── */
function updateMotor() {
  var motors=['motorLI','motorDC','motorAC','motorPL','prowand'];
  if(motors.includes(S.control)){
    showb('motor-eligible');
    hideb('motor-not-eligible');
  } else {
    hideb('motor-eligible');
    showb('motor-not-eligible');
  }
}
function toggleMotorAcc(el, key) {
  el.classList.toggle('sel');
  var idx=S.motorAccs.indexOf(key);
  if(idx>=0) S.motorAccs.splice(idx,1); else S.motorAccs.push(key);
}

/* ── Delivery ── */
function pickDel(opt) {
  S.delivery=opt;
  ['install','ship'].forEach(function(o){
    $('del-'+o).classList.toggle('sel', o===opt);
  });
}

/* ── Submit ── */
function submitQuote() {
  var name=$('cf-name').value.trim();
  var phone=($('cf-phone')||{value:''}).value.trim();
  var email=($('cf-email')||{value:''}).value.trim();
  var contact=phone||(email)||'';
  if(!name||!contact){alert('Please enter your name and contact info.'); return;}
  if(!S.pattern){alert('Please select a fabric pattern.'); return;}

  var collMap = {portfolio:'Wallace Portfolio Natural Woven',galaxy:'Wallace Galaxy Woven',premier:'Walden Premier',select:'Walden Select'};
  var coll = collMap[S.collection]||S.collection;
  var prod = {roman:'Roman Shade',panel:'Sliding Panel',drapery:'Natural Drapery',valance:'Valance Only'}[S.productType]||'';
  var bodyLines=[
    '=== WALLACE NATURAL WOVEN QUOTE REQUEST ===',
    '',
    'CONTACT',
    'Name: '+name,
    'Phone: '+(phone||'—'),
    'Email: '+(email||'—'),
    'Location: '+($('cf-address').value||'Not provided'),
    '',
    'PRODUCT CONFIGURATION',
    'Collection: Wallace '+coll,
    'Product Type: '+prod,
    'Quantity: '+S.qty,
    'Mount type: '+S.mountType,
    'Width: '+S.w+'"',
    'Height: '+S.h+'"',
    '',
    'FABRIC',
    'Fabric Name: '+S.pattern.name,
    'Fabric Code: '+S.pattern.code,
    'Price Group: '+(S.pattern.group||'TBD — verify from PDF'),
    'Natural Drapery Eligible: '+(S.pattern.naturalDrapery!==false?'Yes':'No'),
    'Sliding Panel Eligible: '+(S.pattern.slidingPanel!==false?'Yes':'No'),
    '',
    'STYLE & OPTIONS',
    'Shade Style: '+(S.shadeStyle||prod),
    'Multi-Shade Headrail: '+(S.multi==='none'?'Single':S.multi),
    'Twin Shade / Movable Liner: '+(S.twin?'Yes':'No'),
    'Opening Style: '+(S.openingStyle||'N/A'),
    'Track Color: '+(S.trackColor||'N/A'),
    'Track Profile: '+(S.trackProfile||'N/A'),
    'Wall or Ceiling mount: '+(S.wallOrCeiling||S.mountType),
    'Valance Board: '+(S.valanceBoard?'Yes':'No'),
    '',
    'CONTROL',
    'Control System: '+(S.control||'N/A'),
    '',
    'LINER',
    'Liner Type: '+S.liner,
    'Liner Color: '+(S.linerColor||'N/A'),
    '',
    'EDGE BINDING',
    'Edge Binding Type: '+S.ebType,
    'Edge Binding Color: '+(S.ebColor||'N/A'),
    '',
    'SPECIAL OPTIONS',
    'Cutouts: '+S.cutouts,
    'Hold-Down Brackets: '+(S.holdDown?'Yes':'No'),
    'Spacer Blocks: '+(S.spacer?'Yes':'No'),
    'Fabric Valance Returns: '+(S.returns==='yes'?'Yes':'No'),
    '',
    'MOTOR / ACCESSORIES',
    'Motor: '+(S.control.includes('motor')||S.control==='prowand'?S.control:'None'),
    'Motor Accessories: '+(S.motorAccs.length?S.motorAccs.join(', '):'None'),
    '',
    'DELIVERY / SERVICE',
    'Preference: '+(S.delivery==='install'?'Professional Installation':'Ship to Customer'),
    '',
    'NOTES',
    $('cf-notes').value||'None',
    '',
    '--- Sent from blindznation.com/pages/wallace-woven.html ---'
  ];

  var subj='Wallace '+coll+' Quote — '+prod+' — '+name;
  window.location.href='mailto:blindznation@gmail.com?subject='+encodeURIComponent(subj)+'&body='+encodeURIComponent(bodyLines.join('\n'));

  $('success-box').style.display='block';
  $('success-box').scrollIntoView({behavior:'smooth'});
  document.querySelectorAll('.step-block').forEach(function(b){b.style.display='none';});
}

function addWallaceWovenToCart() {
  var collMap = {portfolio:'Wallace Portfolio Natural Woven',galaxy:'Wallace Galaxy Woven',premier:'Walden Premier',select:'Walden Select'};
  var prodMap = {roman:'Roman Shade',panel:'Sliding Panel',drapery:'Natural Drapery',valance:'Valance Only'};
  var coll = collMap[S.collection] || (S.collection || 'Natural Woven');
  var prod = prodMap[S.productType] || (S.productType || '—');
  var lines = [
    { label: 'Product', value: coll },
    { label: 'Type', value: prod },
    { label: 'Pattern', value: S.pattern ? S.pattern.name : '—' },
    { label: 'Size', value: (S.w||'—') + '″ × ' + (S.h||'—') + '″' },
    { label: 'Control', value: S.control || '—' },
    { label: 'Quantity', value: String(S.qty||1) }
  ];
  pbAddToCart({ product: coll, lines: lines, specs: lines.map(function(l){ return l.label+': '+l.value; }).join(' | '), qty: S.qty||1 });
  pbOpenCart();
}
