// ============================================================
// Wallace Portfolio Natural Shades — Configurator
// ============================================================

// ── State ──────────────────────────────────────────────────
const W = {
  type: 'shade',
  pattern: null,
  mount: 'inside',
  width: 0,
  height: 0,
  qty: 1,
  style: 'standard',
  control: 'cordless',
  controlSide: 'right',
  liner: 'No Liner',
  linerCode: '',
  binding: 'No Binding',
  bindingCode: '',
  bindingType: '',
  valance: 'standard',
  returns: 'none',
  returnMat: '',
  cutouts: false,
  holdDown: false,
  spacerBlocks: 0,
  twinShade: false,
  multiOn: 1,
  motorRemote: 'remote',
  motorHub: false,
  motorPower: '',
  trackColor: 'white',
  trackProfile: 'standard'
};

// ── Pattern data ────────────────────────────────────────────
// Fields: code, name, color, group, comp, sp (sliding panel ok), nd (natural drape ok),
//         ebReq (edge binding required), edgeSeal (factory sealed edge — binding optional),
//         ebColor (list of compatible binding codes or [] for all),
//         motorSqFtLiner (max sq ft motorized WITH liner), motorSqFtNoLiner (WITHOUT liner)
// Verified against: Wallace - Portfolio Natural Woven Woods.pdf pages 4-5 (May 2026)
const PATTERNS = [
  // ── Group A ─────────────────────────────────────────────────────────────────
  {code:'ZH-49B',name:'Aucoin',  color:'White Sand',    group:'A',comp:'50% Jute, 50% Wood Fiber',                sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Ivory'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L12'},
  {code:'ZH-48E',name:'Collina', color:'Static',        group:'A',comp:'60% Paper, 30% Bamboo, 10% Ramie',        sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Chalk'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'R29'},
  {code:'ZH-48D',name:'Collina', color:'White Pine',    group:'A',comp:'60% Paper, 30% Bamboo, 10% Ramie',        sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Chalk'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'L10'},
  {code:'ZH-49D',name:'Gilles',  color:'Weathered Gray',group:'A',comp:'50% Jute, 50% Wood Fiber',                sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Titanium'],   motorSqFtLiner:44,motorSqFtNoLiner:55,book:'R20'},
  {code:'ZH-79D',name:'Jettie',  color:'Ginger Snap',   group:'A',comp:'100% Paper',                              sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Cedar'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R10'},
  {code:'ZH-N2C',name:'Kaia',    color:'Boucle',        group:'A',comp:'50% Paper, 50% Ramie',                    sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Ivory'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L1'},
  {code:'ZH-N2A',name:'Kaia',    color:'Moss',          group:'A',comp:'60% Jute, 40% Ramie',                     sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Stone'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L26'},
  {code:'ZH-N2D',name:'Kaia',    color:'Spice',         group:'A',comp:'60% Jute, 40% Ramie',                     sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Brown'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L31'},
  {code:'ZH-N2B',name:'Kaia',    color:'Teak',          group:'A',comp:'60% Jute, 40% Ramie',                     sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Sable'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R24'},
  // ── Group B ─────────────────────────────────────────────────────────────────
  {code:'ZH-41B',name:'Amie',    color:'Ashberry',      group:'B',comp:'50% Bamboo, 50% Ramie',                   sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Stone'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'R3'},
  {code:'ZH-41C',name:'Amie',    color:'Charcoal',      group:'B',comp:'50% Bamboo, 50% Ramie',                   sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Graphite'],   motorSqFtLiner:36,motorSqFtNoLiner:44,book:'R18'},
  {code:'ZH-41D',name:'Amie',    color:'Truffle',       group:'B',comp:'50% Bamboo, 50% Ramie',                   sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Satin Black'],motorSqFtLiner:36,motorSqFtNoLiner:44,book:'R22'},
  {code:'ZH-25D',name:'Avalon',  color:'Dusk',          group:'B',comp:'50% Wood Fiber, 40% Ramie, 10% Bamboo',   sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Stone'],      motorSqFtLiner:44,motorSqFtNoLiner:55,book:'R19'},
  {code:'ZH-25C',name:'Avalon',  color:'Morning',       group:'B',comp:'50% Wood Fiber, 40% Ramie, 10% Bamboo',   sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Stone'],      motorSqFtLiner:44,motorSqFtNoLiner:55,book:'R2'},
  {code:'ZH-50D',name:'Covington',color:'Deep Blue',    group:'B',comp:'60% Paper, 30% Bamboo, 10% Ramie',        sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Navy'],       motorSqFtLiner:36,motorSqFtNoLiner:44,book:'R28'},
  {code:'ZH-50A',name:'Covington',color:'Parchment',    group:'B',comp:'60% Paper, 30% Bamboo, 10% Ramie',        sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Chalk'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'L2'},
  {code:'ZH-55C',name:'Eze',     color:'Amethyst',      group:'B',comp:'60% Jute, 40% Bamboo',                    sp:true,nd:false,ebReq:false,edgeSeal:false,ebColor:['Stone'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'R16'},
  {code:'ZH-55D',name:'Eze',     color:'Cinnamon',      group:'B',comp:'60% Jute, 40% Bamboo',                    sp:true,nd:false,ebReq:false,edgeSeal:false,ebColor:['Camel'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'L28'},
  {code:'ZH-55A',name:'Eze',     color:'Moonlight',     group:'B',comp:'60% Jute, 40% Bamboo',                    sp:true,nd:false,ebReq:false,edgeSeal:false,ebColor:['Stone'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'R1'},
  {code:'ZH-55B',name:'Eze',     color:'Natural',       group:'B',comp:'60% Jute, 40% Bamboo',                    sp:true,nd:false,ebReq:false,edgeSeal:false,ebColor:['Camel'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'L24'},
  {code:'ZH-55F',name:'Eze',     color:'Night Sky',     group:'B',comp:'60% Jute, 40% Bamboo',                    sp:true,nd:false,ebReq:false,edgeSeal:false,ebColor:['Cedar'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'R27'},
  {code:'ZH-55E',name:'Eze',     color:'Teak',          group:'B',comp:'60% Jute, 40% Bamboo',                    sp:true,nd:false,ebReq:false,edgeSeal:false,ebColor:['Cedar'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'R21'},
  {code:'ZH-010',name:'Lille',   color:'Mocha',         group:'B',comp:'50% Jute, 50% Polyester',                 sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Linen'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L25'},
  {code:'ZH-027',name:'Lyon',    color:'Gray Mist',     group:'B',comp:'100% Jute',                               sp:true,nd:true, ebReq:false,edgeSeal:true, ebColor:['Linen'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R12'},
  // ── Group C ─────────────────────────────────────────────────────────────────
  {code:'ZH-193',name:'Acacia',  color:'Chalk',         group:'C',comp:'80% Flax, 20% Jute',                      sp:true,nd:true, ebReq:true, edgeSeal:false,ebColor:['Ivory'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L8'},
  {code:'ZH-243',name:'Acacia',  color:'Mist',          group:'C',comp:'80% Flax, 20% Jute',                      sp:true,nd:true, ebReq:true, edgeSeal:false,ebColor:['Marble'],     motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L16'},
  {code:'ZH-61A',name:'Arista',  color:'Black',         group:'C',comp:'50% Bamboo, 50% Ramie',                   sp:true,nd:true, ebReq:false,edgeSeal:true, ebColor:['Midnight'],   motorSqFtLiner:44,motorSqFtNoLiner:55,book:'R31'},
  {code:'ZH-61W',name:'Arista',  color:'Sugar',         group:'C',comp:'50% Bamboo, 50% Ramie',                   sp:true,nd:true, ebReq:false,edgeSeal:true, ebColor:['Chalk'],      motorSqFtLiner:44,motorSqFtNoLiner:55,book:'L5'},
  {code:'ZH-21E',name:'Calloway',color:'Canyon',        group:'C',comp:'80% Wood Fiber, 20% Polyester',           sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Stone'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R17'},
  {code:'ZH-21A',name:'Calloway',color:'Cotton',        group:'C',comp:'80% Wood Fiber, 20% Polyester',           sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Chalk'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L6'},
  {code:'ZH-21D',name:'Calloway',color:'Light Gray',    group:'C',comp:'80% Wood Fiber, 20% Polyester',           sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Ivory'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R6'},
  {code:'ZH-21C',name:'Calloway',color:'Twine',         group:'C',comp:'80% Wood Fiber, 20% Polyester',           sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Linen'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L18'},
  {code:'ZH-041',name:'Chantelle',color:'Mist',         group:'C',comp:'100% Ramie',                              sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Stone'],      motorSqFtLiner:44,motorSqFtNoLiner:55,book:'R11'},
  {code:'ZH-R1A',name:'Duval',   color:'Coconut',       group:'C',comp:'100% Ramie',                              sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Ivory'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'L7'},
  {code:'ZH-R1B',name:'Duval',   color:'Driftwood',     group:'C',comp:'100% Ramie',                              sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Stone'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'R13'},
  {code:'ZH-02B',name:'Gleam',   color:'Fog',           group:'C',comp:'70% Jute, 30% Wire',                      sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Silver Gray'], motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R8'},
  {code:'ZH-005',name:'Lucia',   color:'Beige',         group:'C',comp:'50% Flax, 50% Jute',                      sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Camel'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L27'},
  {code:'ZH-04A',name:'Lucia',   color:'Sand',          group:'C',comp:'50% Flax, 50% Jute',                      sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Linen'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L22'},
  {code:'ZH-133',name:'Provence',color:'Beige',         group:'C',comp:'70% Flax, 30% Reed',                      sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Marble'],     motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L19'},
  {code:'ZH-373',name:'Provence',color:'Chalk',         group:'C',comp:'85% Flax, 15% Reed',                      sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Ivory'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L9'},
  {code:'ZH-173',name:'Provence',color:'Soft Gray',     group:'C',comp:'70% Flax, 30% Reed',                      sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Ivory'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R4'},
  {code:'ZH-P1C',name:'Tuscany', color:'Gray',          group:'C',comp:'50% Paper, 50% Ramie',                    sp:true,nd:false,ebReq:false,edgeSeal:false,ebColor:['Titanium'],   motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R7'},
  {code:'ZH-P1A',name:'Tuscany', color:'White',         group:'C',comp:'50% Bamboo, 50% Paper',                   sp:true,nd:false,ebReq:false,edgeSeal:false,ebColor:['Chalk'],      motorSqFtLiner:36,motorSqFtNoLiner:44,book:'L4'},
  // ── Group D ─────────────────────────────────────────────────────────────────
  {code:'ZH-200',name:'Batiste', color:'Light',         group:'D',comp:'95% Flax, 5% Bamboo',                     sp:true,nd:true, ebReq:true, edgeSeal:false,ebColor:['Stone'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L17'},
  {code:'ZH-E64',name:'Cécile',  color:'Bronze',        group:'D',comp:'60% Polyester, 40% Red Ramie',            sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Marble'],     motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L20'},
  {code:'ZH-213',name:'Emele',   color:'Contrast',      group:'D',comp:'100% Flax',                               sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Marble'],     motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R25'},
  {code:'ZH-031',name:'Emele',   color:'Ivory',         group:'D',comp:'100% Ramie',                              sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Ivory'],      motorSqFtLiner:44,motorSqFtNoLiner:55,book:'L11'},
  {code:'ZH-032',name:'Emele',   color:'Mist',          group:'D',comp:'100% Ramie',                              sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Marble'],     motorSqFtLiner:44,motorSqFtNoLiner:55,book:'R5'},
  {code:'ZH-033',name:'Emele',   color:'Pearl',         group:'D',comp:'100% Ramie',                              sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Ivory'],      motorSqFtLiner:44,motorSqFtNoLiner:55,book:'R14'},
  {code:'ZH-003',name:'Emele',   color:'Soft White',    group:'D',comp:'100% Ramie',                              sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Ivory'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L15'},
  {code:'ZH-187',name:'Milla',   color:'Graphite',      group:'D',comp:'60% Flax, 40% Bamboo',                    sp:true,nd:true, ebReq:true, edgeSeal:false,ebColor:['Cedar'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L30'},
  {code:'ZH-M02',name:'Mirielle',color:'Bronze',        group:'D',comp:'100% Manila Hemp',                        sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Marble'],     motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L23'},
  {code:'ZH-M11',name:'Mirielle',color:'Champagne',     group:'D',comp:'100% Manila Hemp',                        sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Marble'],     motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L13'},
  {code:'ZH-M01',name:'Mirielle',color:'Golden',        group:'D',comp:'100% Manila Hemp',                        sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Marble'],     motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L21'},
  {code:'ZH-M31',name:'Mirielle',color:'Onyx',          group:'D',comp:'100% Manila Hemp',                        sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Satin Black'],motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R30'},
  {code:'ZH-M03',name:'Mirielle',color:'Tourmaline',    group:'D',comp:'100% Manila Hemp',                        sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Satin Black'],motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R23'},
  {code:'ZH-624',name:'Nael',    color:'Lavender Mist', group:'D',comp:'50% Bamboo, 50% Ramie',                   sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Stone'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R15'},
  {code:'ZH-QE4',name:'Pascal',  color:'Antique',       group:'D',comp:'50% Bamboo, 50% Ramie',                   sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Bronze'],     motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L29'},
  {code:'ZH-QE3',name:'Pascal',  color:'Harbor',        group:'D',comp:'50% Bamboo, 50% Ramie',                   sp:true,nd:true, ebReq:false,edgeSeal:false,ebColor:['Stone'],      motorSqFtLiner:44,motorSqFtNoLiner:55,book:'R9'},
  {code:'ZH-QE2',name:'Pascal',  color:'Powder',        group:'D',comp:'50% Bamboo, 50% Ramie',                   sp:true,nd:true, ebReq:false,edgeSeal:true, ebColor:['Chalk'],      motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L3'},
  {code:'ZH-11A',name:'Rochelle',color:'Iron',          group:'D',comp:'100% Ramie Yarn',                         sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Silver Gray'], motorSqFtLiner:56,motorSqFtNoLiner:64,book:'R26'},
  {code:'ZH-R31',name:'Ventana', color:'Dunes',         group:'D',comp:'100% Ramie',                              sp:true,nd:false,ebReq:true, edgeSeal:false,ebColor:['Marble'],     motorSqFtLiner:56,motorSqFtNoLiner:64,book:'L14'}
];

// ── Liners ─────────────────────────────────────────────────
const LINERS = [
  {code:'',     name:'No Liner',       cat:''},
  {code:'LF01', name:'Natural',        cat:'Light Filtering'},
  {code:'LF02', name:'Beige',          cat:'Light Filtering'},
  {code:'LF82', name:'Soft Beige',     cat:'Light Filtering'},
  {code:'LF08', name:'White',          cat:'Light Filtering'},
  {code:'LF12', name:'Bright White',   cat:'Light Filtering'},
  {code:'LF58', name:'Soft Gray',      cat:'Light Filtering'},
  {code:'LF04', name:'Gray',           cat:'Light Filtering'},
  {code:'LF03', name:'Espresso',       cat:'Light Filtering'},
  {code:'LF10', name:'Black',          cat:'Light Filtering'},
  {code:'BO01', name:'Soft White',     cat:'Blackout'},
  {code:'BO02', name:'Beige',          cat:'Blackout'},
  {code:'BO03', name:'Dark Linen',     cat:'Blackout'},
  {code:'BO11', name:'Black',          cat:'Blackout'}
];

// ── Edge Bindings ───────────────────────────────────────────
const BINDINGS_RAMIE = [
  {code:'NL1', name:'Chalk'},
  {code:'NL2', name:'Linen'},
  {code:'NL3', name:'Graphite'},
  {code:'NL4', name:'Brown'},
  {code:'NL6', name:'Navy'},
  {code:'NL7', name:'Midnight'},
  {code:'NL33',name:'Titanium'},
  {code:'NL35',name:'Camel'},
  {code:'NL71',name:'Stone'},
  {code:'NL88',name:'Cedar'}
];
const BINDINGS_SILK = [
  {code:'E1', name:'Ivory'},
  {code:'E2', name:'Marble'},
  {code:'E3', name:'Silver Gray'},
  {code:'E4', name:'Pale Jade'},
  {code:'E5', name:'Pewter'},
  {code:'E6', name:'Copper Teal'},
  {code:'E7', name:'Bronze'},
  {code:'E8', name:'Sable'},
  {code:'E9', name:'Dark Taupe'},
  {code:'E10',name:'Satin Black'}
];

// ── Color → CSS swatch ──────────────────────────────────────
function colorToCSS(color) {
  const c = color.toLowerCase();
  if (/chalk|white|snow|ice|bright white/.test(c))         return '#F0EDE8';
  if (/sand|natural|linen|straw|wheat|flax/.test(c))       return '#D4C9A8';
  if (/beige|cream|ivory|powder|soft white/.test(c))       return '#E8DCC8';
  if (/gray|grey|smoke|stone|slate|mist/.test(c))          return '#A8A8A0';
  if (/driftwood|dune|tan|camel/.test(c))                  return '#C8B090';
  if (/black|ebony|onyx|espresso|midnight/.test(c))        return '#2A2A2A';
  if (/brown|cocoa|mocha|mahogany|cedar/.test(c))          return '#7A5A3A';
  if (/blue|navy|ocean|teal|jade/.test(c))                 return '#3A5A7A';
  if (/green|sage|moss|forest/.test(c))                    return '#6A7A5A';
  if (/gold|amber|honey|copper/.test(c))                   return '#C9A96E';
  if (/taupe|mushroom|pewter|sable/.test(c))               return '#9A8A78';
  if (/silver|metallic|graphite|titanium/.test(c))         return '#9A9A9A';
  if (/sugar/.test(c))                                     return '#F5F0E8';
  return '#D4C9A8';
}

// ── Panel track auto-config ─────────────────────────────────
const PANEL_CONFIGS = [
  {minW:48,   maxW:84,    left:{panels:3,channels:3,note:'3 panels · 3-channel track'},
                           right:{panels:3,channels:3,note:'3 panels · 3-channel track'},
                           center:{panels:4,channels:3,note:'4 panels · 3-channel or 2-channel narrow track'}},
  {minW:84.25,maxW:120,   left:{panels:4,channels:4,note:'4 panels · 4-channel track'},
                           right:{panels:4,channels:4,note:'4 panels · 4-channel track'},
                           center:{panels:4,channels:3,note:'4 panels · 3-channel or 2-channel narrow track'}},
  {minW:120.25,maxW:144,  left:{panels:5,channels:5,note:'5 panels · 5-channel track'},
                           right:{panels:5,channels:5,note:'5 panels · 5-channel track'},
                           center:{panels:6,channels:3,note:'6 panels · 3-channel track'}},
  {minW:144.25,maxW:192,  left:{panels:5,channels:5,note:'5 panels · 5-channel track'},
                           right:{panels:5,channels:5,note:'5 panels · 5-channel track'},
                           center:{panels:8,channels:4,note:'8 panels · 4-channel track'}}
];

// ── Drapery stack depths ────────────────────────────────────
const DRAPE_STACK = [
  [48,13],[60,16.25],[72,19.5],[84,22.75],[96,26],[108,29.25],
  [120,32.5],[132,35.75],[144,39],[156,42.25],[168,45.5],[180,48.75],[192,52]
];

// ── Control size limits (verified against wwnw PDF p.15) ────
const CTRL_LIMITS = {
  'cordless':   {minW:15,     maxW:96, minH:18, maxH:95},
  'tdbu':       {minW:15,     maxW:60, minH:18, maxH:72},
  'clutch':     {minW:14,     maxW:96, minH:18, maxH:120},
  'prowand':    {minW:25,     maxW:96, minH:18, maxH:120},
  'motor-li':   {minW:29,     maxW:96, minH:18, maxH:120},
  'motor-dc':   {minW:17.125, maxW:96, minH:18, maxH:120},
  'motor-ac':   {minW:20,     maxW:96, minH:18, maxH:120},
  'motor-pl':   {minW:29,     maxW:96, minH:18, maxH:120}
};

// ── Helpers ─────────────────────────────────────────────────
function selOpt(btn, grpId) {
  document.querySelectorAll('#' + grpId + ' .opt-btn').forEach(b => b.classList.remove('sel'));
  btn.classList.add('sel');
}

function show(id) { const el = document.getElementById(id); if(el) el.style.display='block'; }
function hide(id) { const el = document.getElementById(id); if(el) el.style.display='none'; }
function showStep(id) { const el = document.getElementById(id); if(el) el.classList.add('on'); }
function hideStep(id) { const el = document.getElementById(id); if(el) el.classList.remove('on'); }
function warn(id, on) {
  const el = document.getElementById(id);
  if(el) { el.classList.toggle('on', on); el.style.display = on ? 'block' : 'none'; }
}

// ── Step 1: Pick type ───────────────────────────────────────
function pickType(t, cardEl) {
  W.type = t;
  document.querySelectorAll('.type-card').forEach(c => c.classList.remove('sel'));
  if(cardEl) cardEl.classList.add('sel');

  // Filter patterns by type
  renderPatterns(currentGroup);

  // Show/hide style sections
  hide('style-shade'); hide('style-panel'); hide('style-drape'); hide('style-valance');
  if(t === 'shade')   show('style-shade');
  if(t === 'panel')   show('style-panel');
  if(t === 'drape')   show('style-drape');
  if(t === 'valance') show('style-valance');

  // Step labels
  document.getElementById('style-ttl').textContent =
    t==='shade' ? 'Shade Style' : t==='panel' ? 'Opening Direction' :
    t==='drape' ? 'Draw Direction' : 'Valance Style';

  // Dims label
  document.getElementById('dims-ttl').textContent =
    t==='panel' ? 'Opening Dimensions' : t==='drape' ? 'Drapery Dimensions' : 'Dimensions';

  // Show/hide control step
  if(t === 'shade') showStep('sec-control'); else hideStep('sec-control');

  // Show/hide multi/twin for shade only
  document.getElementById('twin-opt').style.display = t==='shade' ? 'block' : 'none';
  document.getElementById('multi-opt').style.display = t==='shade' ? 'block' : 'none';

  // Valance step changes
  hide('valance-shade-opts'); hide('valance-panel-opts'); hide('valance-drape-opts');
  document.getElementById('valance-ttl').textContent =
    t==='panel' ? 'Track &amp; Hardware' : t==='drape' ? 'Hardware' : 'Valance &amp; Hardware';
  if(t==='panel')   show('valance-panel-opts');
  else if(t==='drape') show('valance-drape-opts');
  else show('valance-shade-opts');

  // Style defaults
  if(t==='shade')   { W.style = 'standard'; }
  if(t==='panel')   { W.style = 'left'; }
  if(t==='drape')   { W.style = 'left'; }
  if(t==='valance') { W.style = 'cornice'; }

  updateSummary();
}

// ── Step 2: Pattern rendering ───────────────────────────────
let currentGroup = 'all';

function filterPatterns(group, btn) {
  currentGroup = group;
  document.querySelectorAll('.pat-filter-btn').forEach(b => b.classList.remove('sel'));
  if(btn) btn.classList.add('sel');
  renderPatterns(group);
}

function renderPatterns(group) {
  const grid = document.getElementById('pattern-grid');
  let filtered = PATTERNS;

  // Filter by type (panel/drape restrictions)
  if(W.type === 'panel') filtered = filtered.filter(p => p.sp);
  if(W.type === 'drape') filtered = filtered.filter(p => p.nd);

  // Filter by group
  if(group && group !== 'all') filtered = filtered.filter(p => p.group === group);

  // Consistent shared picker: families grouped into price-group sections.
  // Colors/codes come straight from PATTERNS — nothing changed, only presentation.
  if(window.pbFabricPicker){
    var byFam={};
    filtered.forEach(function(p){
      var key=p.group+'|'+p.name;
      if(!byFam[key]) byFam[key]={grp:p.group,name:p.name,colors:[]};
      var extra=(p.ebReq?' · Binding Req':'')+(p.edgeSeal?' · Sealed Edge':'');
      byFam[key].colors.push({n:p.color+extra, c:p.code, hex:colorToCSS(p.color)});
    });
    var collections=Object.keys(byFam).map(function(k){ return {type:'nat', pg:byFam[k].grp, name:byFam[k].name, colors:byFam[k].colors}; });
    pbFabricPicker.render('pattern-grid', {
      hideTabs:true, showPriceGroups:true,
      types:[{key:'nat',label:'Natural Woven'}],
      collections:collections,
      onSelect:function(sel){ pickPattern(PATTERNS.findIndex(function(p){return p.code===sel.code;})); }
    });
    if(W.pattern){ grid.querySelectorAll('.pbfp-sw').forEach(function(b){ if(b.title===W.pattern.code) b.classList.add('sel'); }); }
    return;
  }

  grid.innerHTML = filtered.map(p => {
    const bg = colorToCSS(p.color);
    const isSelected = W.pattern && W.pattern.code === p.code ? 'sel' : '';
    const sealBadge = p.edgeSeal ? '<span class="pat-seal">Sealed Edge</span>' : '';
    const reqBadge = p.ebReq ? '<span class="pat-seal" style="background:#FFF3E0;color:#E65100">Binding Req</span>' : '';
    return `<div class="pat-card ${isSelected}" onclick="pickPattern(${PATTERNS.indexOf(p)})">
      <div class="pat-swatch" style="background:${bg}"></div>
      <div class="pat-body">
        <div class="pat-code">${p.code}</div>
        <div class="pat-name">${p.name}</div>
        <div class="pat-color">${p.color}</div>
        <span class="pat-group">Group ${p.group}</span>${sealBadge}${reqBadge}
      </div>
    </div>`;
  }).join('');
}

function pickPattern(idx) {
  W.pattern = PATTERNS[idx];
  renderPatterns(currentGroup);

  // Edge binding warnings
  warn('warn-ebreq', W.pattern.ebReq && W.binding === '' );
  warn('warn-edgeseal', W.pattern.edgeSeal);

  // If binding req, show warning in binding step
  const reqBox = document.getElementById('warn-binding-req');
  if(reqBox) { reqBox.style.display = W.pattern.ebReq ? 'block' : 'none'; }

  updateSummary();
}

// ── Step 3: Mount ───────────────────────────────────────────
function pickMount(m, btn) {
  W.mount = m;
  if(btn) { selOpt(btn, 'grp-mount'); }

  const notes = {
    inside:  'Inside mount: minimum 2¼″ depth (cordless) to 4¼″ (clutch/motor). Shade width = ordered width − 3/8″.',
    outside: 'Outside mount: measure the width and height you want the shade to cover. Allow overlap on all sides.',
    ceiling: 'Ceiling mount: measured and installed from the ceiling. Requires minimum clearance from ceiling to sill.'
  };
  document.getElementById('mount-note').textContent = notes[m] || '';

  // TDBU + returns warning
  validateReturns();
  updateSummary();
}

// ── Quantity ────────────────────────────────────────────────
function adjQty(d) {
  const el = document.getElementById('qty-input');
  let v = (parseInt(el.value, 10) || 1) + d;
  v = Math.max(1, Math.min(50, v));
  el.value = v;
  updateQty();
}
function updateQty() {
  const v = Math.max(1, Math.min(50, parseInt(document.getElementById('qty-input').value, 10) || 1));
  W.qty = v;
  updateSummary();
}

// ── Step 4: Dimensions ──────────────────────────────────────
function updateDims() {
  const w = parseFloat(document.getElementById('inp-width').value) || 0;
  const h = parseFloat(document.getElementById('inp-height').value) || 0;
  W.width = w; W.height = h;

  const warnEl = document.getElementById('warn-dims');
  let msg = '';

  if(w > 0 && h > 0) {
    // Validate against control limits
    if(W.type === 'shade' && W.control) {
      const lim = CTRL_LIMITS[W.control];
      if(lim) {
        if(w < lim.minW) msg = `⚠ Width too small. Min: ${lim.minW}″ for ${W.control}.`;
        else if(w > lim.maxW) msg = `⚠ Width too large. Max: ${lim.maxW}″ for ${W.control}.`;
        else if(h < lim.minH) msg = `⚠ Height too small. Min: ${lim.minH}″ for ${W.control}.`;
        else if(h > lim.maxH) msg = `⚠ Height too large. Max: ${lim.maxH}″ for ${W.control}.`;
      }
    }

    // Panel size validation (PDF p.25: min 48", max 192"W × 120"H)
    if(W.type === 'panel') {
      if(w < 48) msg = '⚠ Sliding panels require minimum 48″ total width.';
      else if(w > 192) msg = '⚠ Maximum sliding panel width is 192″.';
      else if(h > 120) msg = '⚠ Maximum sliding panel height is 120″.';
    }

    // Panel track info
    if(W.type === 'panel') {
      showPanelConfig(w, W.style);
      hide('drape-stack-info');
    } else {
      hide('panel-info');
    }

    // Drapery stack depth
    if(W.type === 'drape' && w > 0) {
      showDrapeStack(w, W.style);
      hide('panel-info');
    } else if(W.type !== 'panel') {
      hide('drape-stack-info');
    }

    // Track over 94" warning
    if(W.type === 'panel' && w > 94) {
      msg += (msg ? '\n' : '') + '⚠ Track over 94″ will be spliced for shipping.';
    }

    // Motor sq ft check
    checkMotorSqFt();

    showStep('sec-style');
  }

  if(msg) {
    warnEl.textContent = msg;
    warnEl.classList.add('on'); warnEl.style.display='block';
  } else {
    warnEl.classList.remove('on'); warnEl.style.display='none';
  }

  updateSummary();
}

function showPanelConfig(w, direction) {
  const cfg = PANEL_CONFIGS.find(c => w >= c.minW && w <= c.maxW);
  if(!cfg) {
    hide('panel-info');
    return;
  }
  const dir = direction==='center' ? 'center' : (direction==='right' ? 'right' : 'left');
  const info = cfg[dir] || cfg.left;
  document.getElementById('panel-config-text').innerHTML =
    `Recommended: <strong>${info.note}</strong> for ${w}″ wide opening, ${dir} stack.`;
  show('panel-info');
}

function showDrapeStack(w, draw) {
  const entry = DRAPE_STACK.find(([width]) => width >= w);
  const stackW = entry ? entry[1] : 52;
  const eachSide = draw === 'split' ? (stackW / 2).toFixed(2) : null;
  let txt = `Estimated stack depth for ${w}″ wide drapery: <strong>${stackW}″</strong> per panel.`;
  if(eachSide) txt += ` Split draw: approx <strong>${eachSide}″</strong> per side.`;
  txt += ' (Stack depth estimate — actual may vary by fabric weight and fullness.)';
  document.getElementById('drape-stack-text').innerHTML = txt;
  show('drape-stack-info');
}

// ── Step 5: Style ───────────────────────────────────────────
function pickStyle(s, btn, typeCtx) {
  W.style = s;
  if(btn && typeCtx) selOpt(btn, 'grp-style-' + typeCtx);

  // Pro Wand + waterfall
  if(s === 'waterfall' && W.control === 'prowand') {
    warn('warn-ctrl', true);
    document.getElementById('warn-ctrl').textContent = '⚠ Pro Wand is not available with Waterfall shade style.';
  }
  // TDBU + waterfall
  if(s === 'waterfall' && W.control === 'tdbu') {
    warn('warn-ctrl', true);
    document.getElementById('warn-ctrl').textContent = '⚠ TDBU is not available with Waterfall shade style.';
  }

  // Reveal control (shade) or liner (others)
  if(W.type === 'shade') {
    showStep('sec-control');
  } else {
    showStep('sec-liner');
    renderLiners();
  }

  // Panel: update config on direction change
  if(W.type === 'panel' && W.width > 0) showPanelConfig(W.width, s);
  // Drape: update stack on draw change
  if(W.type === 'drape' && W.width > 0) showDrapeStack(W.width, s);

  updateSummary();
}

// ── Step 6: Control ─────────────────────────────────────────
function pickControl(c, btn) {
  W.control = c;
  if(btn) selOpt(btn, 'grp-control');

  // Show/hide control side
  const sideRow = document.getElementById('ctrl-side-row');
  if(sideRow) sideRow.style.display = ['clutch','prowand','cordless','tdbu'].includes(c) ? 'block' : 'none';

  // Motor accessories
  const motorOpts = document.getElementById('motor-opts');
  if(motorOpts) motorOpts.style.display = c.startsWith('motor') ? 'block' : 'none';

  // Validate
  validateControl();
  validateSpecial();
  checkMotorSqFt();

  showStep('sec-liner');
  renderLiners();
  updateSummary();
}

function validateControl() {
  const warnEl = document.getElementById('warn-ctrl');
  let msg = '';

  if(W.control === 'tdbu') {
    if(W.style === 'waterfall') msg = '⚠ TDBU is not available with Waterfall shade style.';
    if(W.multiOn === 3) msg = '⚠ TDBU is not available with 3-on-1 headrail.';
    if(W.twinShade) msg = '⚠ TDBU is not available with Twin Shade.';
  }
  if(W.control === 'prowand') {
    if(W.style === 'waterfall') msg = '⚠ Pro Wand is not available with Waterfall shade style.';
    if(W.twinShade) msg = '⚠ Pro Wand is not available with Twin Shade.';
  }

  // Size limits
  if(W.width > 0 && W.height > 0) {
    const lim = CTRL_LIMITS[W.control];
    if(lim) {
      if(W.width > lim.maxW)  msg += (msg?'\n':'') + `⚠ Width ${W.width}″ exceeds max ${lim.maxW}″ for this control.`;
      if(W.height > lim.maxH) msg += (msg?'\n':'') + `⚠ Height ${W.height}″ exceeds max ${lim.maxH}″ for this control.`;
    }
  }

  if(msg) {
    warnEl.textContent = msg;
    warnEl.classList.add('on'); warnEl.style.display='block';
  } else {
    warnEl.classList.remove('on'); warnEl.style.display='none';
  }
}

function checkMotorSqFt() {
  if(!W.pattern || !W.control || !W.control.startsWith('motor') || W.type !== 'shade') {
    warn('warn-motor-sqft', false);
    return;
  }
  if(W.width <= 0 || W.height <= 0) { warn('warn-motor-sqft', false); return; }
  const sqFt = (W.width * W.height) / 144;
  const limit = W.linerCode ? W.pattern.motorSqFtLiner : W.pattern.motorSqFtNoLiner;
  warn('warn-motor-sqft', sqFt > limit);
}

// ── Step 7: Liner ───────────────────────────────────────────
function renderLiners() {
  const grid = document.getElementById('liner-grid');
  grid.innerHTML = LINERS.map(l => {
    const isSelected = W.linerCode === l.code ? 'sel' : '';
    const catLine = l.cat ? `<span class="liner-cat">${l.cat}</span>` : '';
    return `<button class="liner-btn ${isSelected}" onclick="pickLiner('${l.code}','${l.name}')">
      <span class="liner-code">${l.code || '—'}</span>
      ${l.name}${catLine}
    </button>`;
  }).join('');
}

function pickLiner(code, name) {
  W.linerCode = code;
  W.liner = name;
  renderLiners();
  checkMotorSqFt();
  showStep('sec-binding');
  renderBindings();
  updateSummary();
}

// ── Step 8: Edge binding ────────────────────────────────────
function renderBindings() {
  const rGrid = document.getElementById('ramie-grid');
  const sGrid = document.getElementById('silk-grid');

  rGrid.innerHTML = BINDINGS_RAMIE.map(b => {
    const isSel = W.bindingCode === b.code ? 'sel' : '';
    return `<button class="binding-btn ${isSel}" onclick="pickBinding('${b.code}','${b.name}','ramie')">
      <span class="binding-code">${b.code}</span>${b.name}
      <span class="binding-cat">Ramie</span>
    </button>`;
  }).join('');

  sGrid.innerHTML = BINDINGS_SILK.map(b => {
    const isSel = W.bindingCode === b.code ? 'sel' : '';
    return `<button class="binding-btn ${isSel}" onclick="pickBinding('${b.code}','${b.name}','silk')">
      <span class="binding-code">${b.code}</span>${b.name}
      <span class="binding-cat">Silk Blend</span>
    </button>`;
  }).join('');

  // Highlight no-binding button
  const noBind = document.getElementById('btn-no-binding');
  if(noBind) noBind.classList.toggle('sel', W.bindingCode === '');
}

function pickBinding(code, name, type) {
  W.bindingCode = code;
  W.binding = name;
  W.bindingType = type;

  renderBindings();

  // Cutout + binding conflict
  warn('warn-binding-cutout', W.cutouts && code !== '');

  // ebReq warning
  const reqBox = document.getElementById('warn-binding-req');
  if(reqBox) reqBox.style.display = (W.pattern && W.pattern.ebReq && code === '') ? 'block' : 'none';
  warn('warn-ebreq', W.pattern && W.pattern.ebReq && code === '');

  showStep('sec-valance');
  showStep('sec-special');
  updateSummary();
}

// ── Step 9: Returns validation ──────────────────────────────
function validateReturns() {
  const tdbuReturns = W.control === 'tdbu' && W.mount === 'inside' && W.returns !== 'none';
  warn('warn-tdbu-returns', tdbuReturns);
}

// ── Step 10: Special validation ─────────────────────────────
function validateSpecial() {
  // Twin shade conflicts
  let twinMsg = '';
  if(W.twinShade) {
    if(W.control === 'tdbu')    twinMsg = '⚠ TDBU is not available with Twin Shade.';
    if(W.control === 'prowand') twinMsg = '⚠ Pro Wand is not available with Twin Shade.';
    if(W.multiOn === 3)         twinMsg = '⚠ Twin Shade is not available with 3-on-1 headrail.';
  }
  const twinWarn = document.getElementById('warn-twin');
  if(twinWarn) { twinWarn.textContent = twinMsg; twinWarn.style.display = twinMsg ? 'block' : 'none'; twinWarn.classList.toggle('on', !!twinMsg); }

  // Multi conflicts
  let multiMsg = '';
  if(W.multiOn === 3) {
    if(W.control === 'tdbu')  multiMsg = '⚠ TDBU is not available with 3-on-1 headrail.';
    if(W.twinShade)           multiMsg = '⚠ 3-on-1 headrail is not available with Twin Shade.';
  }
  const multiWarn = document.getElementById('warn-multi');
  if(multiWarn) { multiWarn.textContent = multiMsg; multiWarn.style.display = multiMsg ? 'block' : 'none'; multiWarn.classList.toggle('on', !!multiMsg); }

  // Cutout + binding
  warn('warn-binding-cutout', W.cutouts && W.bindingCode !== '');
  warn('warn-cutout', W.cutouts && W.bindingCode !== '');

  validateControl();
  validateReturns();
}

// ── Summary ─────────────────────────────────────────────────
const TYPE_LABELS = {shade:'Natural Shade',panel:'Sliding Panel',drape:'Natural Drapery',valance:'Valance Only'};
const CTRL_LABELS = {
  cordless:'Cordless','tdbu':'Top-Down/Bottom-Up',clutch:'Loop Clutch',prowand:'Pro Wand',
  'motor-li':'Motor (Li-Ion)','motor-dc':'Motor (DC Low Voltage)','motor-ac':'Motor (AC Hardwired)','motor-pl':'Motor (Power Lift)'
};

function updateSummary() {
  setText('s-type',    TYPE_LABELS[W.type] || '—');
  setText('s-pattern', W.pattern ? `${W.pattern.name} (${W.pattern.code})` : '—');
  setText('s-color',   W.pattern ? W.pattern.color : '—');
  setText('s-group',   W.pattern ? `Group ${W.pattern.group} · ${W.pattern.comp}` : '—');
  setText('s-mount',   W.mount ? W.mount.charAt(0).toUpperCase() + W.mount.slice(1) + ' Mount' : '—');
  setText('s-size',    W.width && W.height ? `${W.width}″ W × ${W.height}″ H${W.qty > 1 ? ` · Qty ${W.qty}` : ''}` : '—');
  setText('s-style',   W.style || '—');
  setText('s-control', W.type === 'shade' ? (CTRL_LABELS[W.control] || '—') + (W.controlSide ? ` · ${W.controlSide} side` : '') : 'N/A');
  setText('s-liner',   W.liner || '—');
  setText('s-binding', W.bindingCode ? `${W.binding} (${W.bindingCode}) · ${W.bindingType}` : 'No Binding');

  let valStr = '';
  if(W.type === 'panel') valStr = `Track: ${W.trackColor} · ${W.trackProfile}`;
  else if(W.type === 'drape') valStr = 'Per hardware consultation';
  else valStr = W.valance + (W.returns !== 'none' ? ` · ${W.returns} returns` : '');
  setText('s-valance', valStr || '—');

  const specials = [];
  if(W.twinShade) specials.push('Twin Shade');
  if(W.multiOn > 1) specials.push(`${W.multiOn}-on-1 headrail`);
  if(W.cutouts) specials.push('Cutouts');
  if(W.holdDown) specials.push('Hold-Down Brackets');
  if(W.spacerBlocks > 0) specials.push(`${W.spacerBlocks} Spacer Blocks`);
  setText('s-special', specials.length ? specials.join(', ') : 'None');
}

function setText(id, val) {
  const el = document.getElementById(id);
  if(el) el.textContent = val;
}

// ── Quote builder ────────────────────────────────────────────
function buildQuote() {
  const delivery = document.querySelector('#grp-wf-del .opt-btn.sel');
  const deliveryStr = delivery ? delivery.textContent.trim() : 'Ship to me';

  const specials = [];
  if(W.twinShade) specials.push('Twin Shade');
  if(W.multiOn > 1) specials.push(`${W.multiOn}-on-1 headrail`);
  if(W.cutouts) specials.push('Cutouts');
  if(W.holdDown) specials.push('Hold-Down Brackets');
  if(W.spacerBlocks > 0) specials.push(`${W.spacerBlocks} Spacer Block(s)`);

  const warnings = [];
  if(W.control === 'tdbu' && W.style === 'waterfall') warnings.push('CONFLICT: TDBU + Waterfall');
  if(W.control === 'tdbu' && W.multiOn === 3) warnings.push('CONFLICT: TDBU + 3-on-1');
  if(W.control === 'tdbu' && W.twinShade) warnings.push('CONFLICT: TDBU + Twin Shade');
  if(W.control === 'tdbu' && W.mount === 'inside' && W.returns !== 'none') warnings.push('CONFLICT: Inside TDBU + Returns');
  if(W.control === 'prowand' && W.style === 'waterfall') warnings.push('CONFLICT: Pro Wand + Waterfall');
  if(W.control === 'prowand' && W.twinShade) warnings.push('CONFLICT: Pro Wand + Twin Shade');
  if(W.multiOn === 3 && W.twinShade) warnings.push('CONFLICT: 3-on-1 + Twin Shade');
  if(W.cutouts && W.bindingCode !== '') warnings.push('CONFLICT: Cutouts + Edge Binding');
  if(W.pattern && W.pattern.ebReq && W.bindingCode === '') warnings.push('NOTE: Fabric requires edge binding — frayed-edge warranty voided without binding');
  if(W.width > 94 && W.type === 'panel') warnings.push('NOTE: Track over 94″ — will be spliced for shipping');

  const name  = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  const email = document.getElementById('cf-email').value.trim();
  const notes = document.getElementById('cf-notes').value.trim();

  return `QUOTE REQUEST — Wallace Portfolio Collection Natural Shades
================================================

PRODUCT
Product Line: Wallace Portfolio Collection Natural Shades
Sub-product:  ${TYPE_LABELS[W.type] || W.type}

PATTERN
Code:        ${W.pattern ? W.pattern.code : 'Not selected'}
Name:        ${W.pattern ? W.pattern.name : '—'}
Color:       ${W.pattern ? W.pattern.color : '—'}
Group:       ${W.pattern ? 'Group ' + W.pattern.group : '—'}
Composition: ${W.pattern ? W.pattern.comp : '—'}
Edge Seal:   ${W.pattern && W.pattern.edgeSeal ? 'Yes (factory sealed)' : 'No'}
Binding Req: ${W.pattern && W.pattern.ebReq ? 'YES — required' : 'No'}

DIMENSIONS & MOUNT
Mount:  ${W.mount ? W.mount.charAt(0).toUpperCase() + W.mount.slice(1) + ' Mount' : '—'}
Width:  ${W.width || '—'}″
Height: ${W.height || '—'}″
Qty:    ${W.qty}

STYLE & CONTROL
Style:        ${W.style || '—'}
Control:      ${W.type === 'shade' ? (CTRL_LABELS[W.control] || '—') : 'N/A'}
Control Side: ${W.type === 'shade' ? W.controlSide : 'N/A'}
Motor Remote: ${W.control && W.control.startsWith('motor') ? (W.motorRemote || '—') : 'N/A'}

LINER & BINDING
Liner:        ${W.linerCode ? W.linerCode + ' ' + W.liner : 'No Liner'}
Edge Binding: ${W.bindingCode ? W.bindingCode + ' ' + W.binding + ' (' + W.bindingType + ')' : 'No Binding'}
Edge Seal Note: ${W.pattern && W.pattern.edgeSeal ? 'Factory edge-sealed — binding is decorative/optional' : '—'}

VALANCE & HARDWARE
${W.type === 'shade' ? `Valance:  ${W.valance || '—'}
Returns:  ${W.returns}` :
  W.type === 'panel' ? `Track Color:   ${W.trackColor}
Track Profile: ${W.trackProfile}
Spacer Blocks: ${W.spacerBlocks}` :
  'Hardware: Per consultation'}

SPECIAL OPTIONS
Twin Shade:      ${W.twinShade ? 'Yes' : 'No'}
Multi-on-One:    ${W.multiOn > 1 ? W.multiOn + '-on-1 headrail' : 'Standard (1)'}
Cutouts:         ${W.cutouts ? 'Yes' : 'No'}
Hold-Down Brk:   ${W.holdDown ? 'Yes' : 'No'}
Other:           ${specials.filter(s => !['Twin Shade','Cutouts','Hold-Down Brackets'].includes(s)).join(', ') || 'None'}

${warnings.length ? 'VALIDATION FLAGS\n' + warnings.map(w => '  ! ' + w).join('\n') + '\n' : ''}
DELIVERY / PICKUP
${deliveryStr}

CONTACT
Name:  ${name}
Phone: ${phone}
Email: ${email}

NOTES
${notes || 'None'}

---
Submitted from blindznation.com/pages/wallace-portfolio-natural-shades.html
`;
}

function addWallacePortfolioNaturalToCart(){
  if(!W.pattern){ alert('Please select a pattern before adding to cart.'); return; }
  if(!W.width||!W.height){ alert('Please enter dimensions before adding to cart.'); return; }

  const lines=[
    {label:'Product',value:'Wallace Portfolio Natural Woven Wood Shades'},
    {label:'Type',value:W.type||'—'},
    {label:'Pattern',value:W.pattern?W.pattern.name+' ('+W.pattern.code+')':'—'},
    {label:'Color',value:W.pattern?W.pattern.color:'—'},
    {label:'Price Group',value:W.pattern?W.pattern.group:'—'},
    {label:'Mount',value:W.mount==='inside'?'Inside mount':'Outside mount'},
    {label:'Width',value:(W.width||'—')+'"'},
    {label:'Height',value:(W.height||'—')+'"'},
    {label:'Style',value:W.style||'—'},
    {label:'Control',value:W.control||'—'},
    {label:'Liner',value:W.liner||'No Liner'},
    {label:'Binding',value:W.binding||'No Binding'},
    {label:'Valance',value:W.valance||'—'},
    {label:'Quantity',value:String(W.qty)}
  ];
  const specs=lines.map(l=>l.label+': '+l.value).join(' | ');
  pbAddToCart({product:'Wallace Portfolio Natural Woven Wood Shades',lines:lines,specs:specs,price:null,qty:W.qty});
  pbOpenCart();
}

function submitQuote() {
  const name  = document.getElementById('cf-name').value.trim();
  const phone = document.getElementById('cf-phone').value.trim();
  const errEl = document.getElementById('cf-contact-err');

  if(!name || !phone) {
    errEl.textContent = 'Please enter your name and phone number.';
    errEl.style.display = 'block';
    return;
  }
  errEl.style.display = 'none';

  const body = encodeURIComponent(buildQuote());
  const sub  = encodeURIComponent('Wallace Portfolio Natural Shades Quote — ' + name);
  window.location.href = `mailto:blindznation@gmail.com?subject=${sub}&body=${body}`;

  document.getElementById('wallace-form').style.display = 'none';
  document.getElementById('wf-success').style.display = 'block';
}

// ── Init ────────────────────────────────────────────────────
(function init() {
  renderPatterns('all');
  renderLiners();
  renderBindings();
  // Set initial defaults in UI
  W.controlSide = 'right';
  W.valance = 'standard';
  W.returns = 'none';
  W.motorRemote = 'remote';
  // Show shade steps by default (type=shade)
  show('style-shade');
  hide('style-panel'); hide('style-drape'); hide('style-valance');
  show('valance-shade-opts');
  hide('valance-panel-opts'); hide('valance-drape-opts');
  showStep('sec-pattern');
  showStep('sec-control');
  showStep('sec-liner');
  showStep('sec-binding');
  showStep('sec-valance');
  showStep('sec-special');
  document.getElementById('ctrl-side-row').style.display = 'block';
  document.getElementById('motor-opts').style.display = 'none';
  updateSummary();
})();
