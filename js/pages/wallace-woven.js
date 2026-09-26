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
   Real ZH- codes and price groups A-E (2026 Portfolio PDF).
   Sliding panels and draperies available.
───────────────────────────────────────────── */
const PORT_LINERS = {
  lf: [{code:'LF-BG', name:'Beige'},{code:'LF-WH', name:'White'},{code:'LF-IV', name:'Ivory'},{code:'LF-GY', name:'Gray'}],
  bo: [{code:'BO-BG', name:'Beige'},{code:'BO-WH', name:'White'},{code:'BO-CH', name:'Chocolate'}]
};
const PORT_EB_COLORS = ['Natural','Wheat','Camel','Onyx','Pearl','Stone','Ivory','White'];
// Portfolio patterns — real ZH- codes and price groups A-E, taken from the same
// data the standalone Portfolio Natural configurator uses (2026 Portfolio PDF).
const PORT_PATTERNS = [
  {code:'ZH-49B', name:'Aucoin White Sand', group:'A', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Ivory'},
  {code:'ZH-48E', name:'Collina Static', group:'A', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Chalk'},
  {code:'ZH-48D', name:'Collina White Pine', group:'A', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Chalk'},
  {code:'ZH-49D', name:'Gilles Weathered Gray', group:'A', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:55, motorMaxWithLiner:44, coordEB:'Titanium'},
  {code:'ZH-79D', name:'Jettie Ginger Snap', group:'A', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Cedar'},
  {code:'ZH-N2C', name:'Kaia Boucle', group:'A', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Ivory'},
  {code:'ZH-N2A', name:'Kaia Moss', group:'A', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Stone'},
  {code:'ZH-N2D', name:'Kaia Spice', group:'A', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Brown'},
  {code:'ZH-N2B', name:'Kaia Teak', group:'A', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Sable'},
  {code:'ZH-41B', name:'Amie Ashberry', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Stone'},
  {code:'ZH-41C', name:'Amie Charcoal', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Graphite'},
  {code:'ZH-41D', name:'Amie Truffle', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Satin Black'},
  {code:'ZH-25D', name:'Avalon Dusk', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:55, motorMaxWithLiner:44, coordEB:'Stone'},
  {code:'ZH-25C', name:'Avalon Morning', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:55, motorMaxWithLiner:44, coordEB:'Stone'},
  {code:'ZH-50D', name:'Covington Deep Blue', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Navy'},
  {code:'ZH-50A', name:'Covington Parchment', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Chalk'},
  {code:'ZH-55C', name:'Eze Amethyst', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Stone'},
  {code:'ZH-55D', name:'Eze Cinnamon', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Camel'},
  {code:'ZH-55A', name:'Eze Moonlight', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Stone'},
  {code:'ZH-55B', name:'Eze Natural', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Camel'},
  {code:'ZH-55F', name:'Eze Night Sky', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Cedar'},
  {code:'ZH-55E', name:'Eze Teak', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Cedar'},
  {code:'ZH-010', name:'Lille Mocha', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Linen'},
  {code:'ZH-027', name:'Lyon Gray Mist', group:'B', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:true, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Linen'},
  {code:'ZH-193', name:'Acacia Chalk', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Ivory'},
  {code:'ZH-243', name:'Acacia Mist', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Marble'},
  {code:'ZH-61A', name:'Arista Black', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:true, motorMaxNoLiner:55, motorMaxWithLiner:44, coordEB:'Midnight'},
  {code:'ZH-61W', name:'Arista Sugar', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:true, motorMaxNoLiner:55, motorMaxWithLiner:44, coordEB:'Chalk'},
  {code:'ZH-21E', name:'Calloway Canyon', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Stone'},
  {code:'ZH-21A', name:'Calloway Cotton', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Chalk'},
  {code:'ZH-21D', name:'Calloway Light Gray', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Ivory'},
  {code:'ZH-21C', name:'Calloway Twine', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Linen'},
  {code:'ZH-041', name:'Chantelle Mist', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:55, motorMaxWithLiner:44, coordEB:'Stone'},
  {code:'ZH-R1A', name:'Duval Coconut', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Ivory'},
  {code:'ZH-R1B', name:'Duval Driftwood', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Stone'},
  {code:'ZH-02B', name:'Gleam Fog', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Silver Gray'},
  {code:'ZH-005', name:'Lucia Beige', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Camel'},
  {code:'ZH-04A', name:'Lucia Sand', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Linen'},
  {code:'ZH-133', name:'Provence Beige', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Marble'},
  {code:'ZH-373', name:'Provence Chalk', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Ivory'},
  {code:'ZH-173', name:'Provence Soft Gray', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Ivory'},
  {code:'ZH-P1C', name:'Tuscany Gray', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Titanium'},
  {code:'ZH-P1A', name:'Tuscany White', group:'C', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:44, motorMaxWithLiner:36, coordEB:'Chalk'},
  {code:'ZH-200', name:'Batiste Light', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Stone'},
  {code:'ZH-E64', name:'Cécile Bronze', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Marble'},
  {code:'ZH-213', name:'Emele Contrast', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Marble'},
  {code:'ZH-031', name:'Emele Ivory', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:55, motorMaxWithLiner:44, coordEB:'Ivory'},
  {code:'ZH-032', name:'Emele Mist', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:55, motorMaxWithLiner:44, coordEB:'Marble'},
  {code:'ZH-033', name:'Emele Pearl', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:55, motorMaxWithLiner:44, coordEB:'Ivory'},
  {code:'ZH-003', name:'Emele Soft White', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Ivory'},
  {code:'ZH-187', name:'Milla Graphite', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Cedar'},
  {code:'ZH-M02', name:'Mirielle Bronze', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Marble'},
  {code:'ZH-M11', name:'Mirielle Champagne', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Marble'},
  {code:'ZH-M01', name:'Mirielle Golden', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Marble'},
  {code:'ZH-M31', name:'Mirielle Onyx', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Satin Black'},
  {code:'ZH-M03', name:'Mirielle Tourmaline', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Satin Black'},
  {code:'ZH-624', name:'Nael Lavender Mist', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Stone'},
  {code:'ZH-QE4', name:'Pascal Antique', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Bronze'},
  {code:'ZH-QE3', name:'Pascal Harbor', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:55, motorMaxWithLiner:44, coordEB:'Stone'},
  {code:'ZH-QE2', name:'Pascal Powder', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:true, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Chalk'},
  {code:'ZH-11A', name:'Rochelle Iron', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Silver Gray'},
  {code:'ZH-R31', name:'Ventana Dunes', group:'D', cordlessTDBU:true, slidingPanel:true, naturalDrapery:false, edgeBindingRequired:true, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:56, coordEB:'Marble'}
];

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
// Galaxy patterns — real SKUs and price groups 1-6, taken from the same data the
// standalone Galaxy configurator uses. Headrail and chain colour are set by pattern.
const GAL_PATTERNS = [
  {code:'BB1080', name:'Zagoli Sienna', group:'1', headrail:'Chestnut', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BB1001', name:'Argos', group:'1', headrail:'Chestnut', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BB1266', name:'Kyoto Russet', group:'1', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BB1268', name:'Kyoto Frost', group:'1', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BB2253', name:'Mesabi White', group:'2', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BB2264', name:'Bamboo Harvest', group:'2', headrail:'Chestnut', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BB2780', name:'Aris Wheat', group:'2', headrail:'Chestnut', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BB2090', name:'Edessa Cream', group:'2', headrail:'Walnut', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BJ3403', name:'Lulea Snow', group:'3', headrail:'Natural', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4250', name:'Luxor Chestnut', group:'4', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4260', name:'Luxor Sand', group:'4', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4270', name:'Luxor Silver Charm', group:'4', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4363', name:'Lyon Taupe', group:'4', headrail:'Natural', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4373', name:'Lyon Glacier', group:'4', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4383', name:'Lyon Chalk', group:'4', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BY4201', name:'Arroyo Thunder', group:'4', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BY4202', name:'Arroyo Gray', group:'4', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BY4203', name:'Arroyo Pale Smoke', group:'4', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4160', name:'Essex White Cloud', group:'4', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4170', name:'Essex Sage', group:'4', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4180', name:'Essex Straw', group:'4', headrail:'Walnut', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4190', name:'Essex Latte', group:'4', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4101', name:'Lakeshore White Sands', group:'4', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4102', name:'Lakeshore Latte', group:'4', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4103', name:'Lakeshore Straw', group:'4', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PP4701', name:'Sanoma Snow', group:'4', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PP4702', name:'Sanoma Sands', group:'4', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PP4703', name:'Sanoma Caramel', group:'4', headrail:'Natural', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PP4704', name:'Sanoma Rust', group:'4', headrail:'Walnut', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PP4705', name:'Sanoma Concrete', group:'4', headrail:'Greywash', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PP4706', name:'Sanoma Ginger', group:'4', headrail:'Natural', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4210', name:'Hudson Pebble', group:'4', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4212', name:'Hudson Flax', group:'4', headrail:'Natural', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4240', name:'Timmins Cream', group:'4', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4220', name:'Timmins Fossil', group:'4', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB4230', name:'Timmins Seal', group:'4', headrail:'Greywash', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BJ4523', name:'Serenity Mist', group:'4', headrail:'Natural', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BJ4350', name:'Avedon', group:'4', headrail:'Chestnut', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PP5720', name:'Kingston Smoke', group:'5', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PP5730', name:'Kingston Rock', group:'5', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PP5740', name:'Kingston Rice', group:'5', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB5420', name:'Giza Midnight', group:'5', headrail:'Greywash', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB5430', name:'Giza Wheat', group:'5', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB5440', name:'Giza Snow', group:'5', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB5460', name:'Chatou Star', group:'5', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB5470', name:'Chatou Stone', group:'5', headrail:'Greywash', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PB5480', name:'Chatou Snow', group:'5', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PY5520', name:'Dawson White', group:'5', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PY5510', name:'Dawson Marble', group:'5', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PY5530', name:'Dawson Tea', group:'5', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PY5313', name:'Zaria Mink', group:'5', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PY5311', name:'Zaria Silver White', group:'5', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BJ5514', name:'Boras Snow', group:'5', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BJ5525', name:'Amour Wheat', group:'5', headrail:'Chestnut', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'BJ5240', name:'Bengali Sand', group:'5', headrail:'Natural', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JJ5010', name:'Goya Dawn', group:'5', headrail:'Natural', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JJ5050', name:'Goya Wheat', group:'5', headrail:'Natural', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6777', name:'Moncton Granite', group:'6', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6778', name:'Moncton Snow White', group:'6', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6779', name:'Moncton Snow Gray', group:'6', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6333', name:'Zeffa Mushroom', group:'6', headrail:'Natural', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6335', name:'Zeffa Whitish Gray', group:'6', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6334', name:'Zeffa White', group:'6', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6336', name:'Zeffa Grayish White', group:'6', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6870', name:'Kuwada Stone', group:'6', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6872', name:'Kuwada Lava', group:'6', headrail:'Greywash', chain:'Bronze', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6874', name:'Kuwada Cotton', group:'6', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6810', name:'Surroy Amber', group:'6', headrail:'Natural', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6811', name:'Surroy Whiterock', group:'6', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6812', name:'Surroy Tea', group:'6', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'JP6813', name:'Surroy Pearl', group:'6', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PY6830', name:'Winnipeg Silver', group:'6', headrail:'Greywash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''},
  {code:'PY6832', name:'Winnipeg Cream', group:'6', headrail:'Whitewash', chain:'Stainless', cordlessTDBU:true, slidingPanel:false, naturalDrapery:false, hobbledEligible:true, edgeBindingRequired:false, edgeBindingRecommended:false, edgeSeal:false, motorMaxNoLiner:64, motorMaxWithLiner:64, coordEB:''}
];

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
  mountType:'inside', w:0, h:0, pattern:null,
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

// Single-select pill: clears the other pills in the same .opt-row only.
function togglePill(el) {
  var row = el.closest('.opt-row');
  if(row) row.querySelectorAll('.opt-btn').forEach(function(p){ p.classList.remove('sel'); });
  el.classList.add('sel');
  wwSummary();
}
function selInRow(el) { togglePill(el); }

/* ── Refresh dependent steps (every step is always visible — no Next/Back) ── */
function wwRefresh() {
  setupS6();
  updateControls();
  buildLinerOpts();
  updateSpecials();
  updateMotor();
  wwSummary();
}
function goS(n) { wwRefresh(); }

/* ── Style picker (Roller vs Roman) ── */
var rS = { mount:'Inside mount', ctrl:'', liner:'', cass:'', delivery:'' };
var wwFlow = '';

function pickStyle(s, el) {
  wwFlow = s;
  document.querySelectorAll('#style-opts .opt-btn').forEach(function(c){c.classList.remove('sel');});
  if(el) el.classList.add('sel');
  document.getElementById('ww-config').style.display = 'block';
  document.getElementById('roller-section').style.display = s==='roller' ? 'block' : 'none';
  document.getElementById('roman-section').style.display  = s==='roman'  ? 'block' : 'none';
  // Delivery + Your details are shared by both flows — renumber them to follow the open flow.
  var last = s==='roller' ? 5 : 10;
  var dn = document.querySelector('#pb-delivery-block .step-num'); if(dn) dn.textContent = last+1;
  var cn = document.querySelector('#contact-block .step-num');     if(cn) cn.textContent = last+2;
  wwRefresh();
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
    el.classList.add('sel');
  } else {
    var grp = document.getElementById(grpId);
    if(grp) grp.querySelectorAll('.opt-btn').forEach(function(p){p.classList.remove('sel');});
    el.classList.add('sel');
  }
  wwSummary();
}

function submitRollerQuote() {
  var name = ((document.getElementById('cf-name')||{}).value||'').trim();
  var phone = ((document.getElementById('cf-phone')||{}).value||'').trim();
  var email = ((document.getElementById('cf-email')||{}).value||'').trim();
  var contact = [phone, email].filter(Boolean).join(' / ');
  if(!name||!email){ alert('Please enter your name and email address.'); return; }

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
    +'DELIVERY: '+wwDeliveryLabel()+'\n\n'
    +'CONTACT\n'
    +'  Name    : '+name+'\n'
    +'  Contact : '+contact+'\n'
    +'  Address : '+((document.getElementById('cf-address')||{}).value||'—')+'\n'
    +'  Notes   : '+((document.getElementById('cf-notes')||{}).value||'—');

  window.pbMailto = 'mailto:justin@blindznation.com'
    +'?subject='+encodeURIComponent('Blindznation — ' + 'Natural Woven Roller Shades Quote — '+name)
    +'&body='+encodeURIComponent('BLINDZNATION\n\n' + body);

  document.getElementById('success-box').style.display = 'block';
  document.getElementById('ww-config').style.display = 'none';
  document.getElementById('s0').style.display = 'none';
}

/* ── Step 1: Collection ── */
function pickCollection(c, el) {
  S.collection = c;
  _s6setup = false;
  document.querySelectorAll('#coll-opts .opt-btn').forEach(function(cc){cc.classList.remove('sel');});
  el.classList.add('sel');
  // Portfolio and Galaxy are Roman-shade-only in this flow
  var romanOnly = (c === 'portfolio' || c === 'galaxy');
  $('s2-panel-card').style.display    = romanOnly ? 'none' : '';
  $('s2-drapery-card').style.display  = romanOnly ? 'none' : '';
  $('s2-valance-card').style.display  = romanOnly ? 'none' : '';
  $('s2-roman-only-note').style.display = romanOnly ? 'block' : 'none';
  if(romanOnly && S.productType && S.productType!=='roman') pickType('roman', $('s2-roman-card'));
  // Galaxy supports hobbled style
  $('hobbled-style-pill').style.display = (c === 'galaxy') ? '' : 'none';
  if(c !== 'galaxy' && S.shadeStyle === 'hobbled') { S.shadeStyle=''; $('hobbled-style-pill').classList.remove('sel'); }
  $('hobbled-note').style.display = 'none';
  buildFabricGrid();
  buildEBOpts();
  if(S.liner==='lf'||S.liner==='bo'){ var lb=document.querySelector('#liner-type-opts .opt-btn.sel'); if(lb) pickLiner(S.liner, lb); }
  wwRefresh();
}

/* ── Step 2: Product type ── */
function pickType(t, el) {
  S.productType = t;
  _s6setup = false; // reset so step 6 re-renders for new product type
  document.querySelectorAll('#type-opts .opt-btn').forEach(function(cc){cc.classList.remove('sel');});
  el.classList.add('sel');
  // Ceiling mount only for panels/draperies
  var noCeiling = (t==='roman'||t==='valance');
  $('mount-ceiling').style.display = noCeiling ? 'none' : '';
  if(noCeiling && S.mountType==='ceiling') pickMount('inside', document.querySelector('#mount-opts .opt-btn'));
  if(S.collection) buildFabricGrid();
  dimChanged();
  wwRefresh();
}

/* ── Step 3: Mount ── */
function pickMount(m, el) {
  S.mountType = m;
  document.querySelectorAll('#mount-opts .opt-btn').forEach(function(p){p.classList.remove('sel');});
  el.classList.add('sel');
  if(S.control) pickControl(S.control, document.getElementById('ctrl-'+S.control)); // re-check TDBU/returns rule
  wwSummary();
}

/* ── Step 3: Quantity stepper ── */
function adjQty(d) {
  var el = $('qty'); if(!el) return;
  var v = Math.max(1, Math.min(50, (parseInt(el.value,10)||1) + d));
  el.value = v; S.qty = v;
  wwSummary();
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
  $si.style.display = $si.innerHTML ? 'block' : 'none';
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
  wwSummary();
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
    portfolio:'<strong>Wallace Portfolio Natural Woven</strong> — 62 fabrics, price groups A&ndash;E. Sliding panels and draperies available on most patterns.',
    galaxy:'<strong>Wallace Galaxy Woven</strong> — 73 fabrics, price groups 1&ndash;6. Hobbled style available. Headrail and chain colour are set by pattern.',
    premier:'<strong>Walden Premier</strong> — 47 fabrics, price groups A&ndash;F.',
    select:'<strong>Walden Select</strong> — 57 fabrics, price groups with WS- fabric codes.'
  };
  $('fabric-collection-note').innerHTML = collNotes[S.collection]||'';
  $('fabric-wait-note').style.display = S.collection ? 'none' : 'block';
  $('fabric-picker-wrap').style.display = S.collection ? 'block' : 'none';
  if(S.pattern && patterns.indexOf(S.pattern)<0){ S.pattern=null; $('fabric-summary').style.display='none'; }
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
    if(S.pattern===p) el.classList.add('sel');
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
  buildEBOpts();
  if(S.control) pickControl(S.control, document.getElementById('ctrl-'+S.control));
  wwSummary();
}

/* ── Step 6: Style ── */
function pickShadeStyle(st, el) {
  S.shadeStyle=st;
  selInRow(el);
  // Waterfall and Hobbled: block 3-on-1, TDBU, Pro Wand
  if(st==='waterfall'||st==='hobbled'){
    $('multi-3on1').classList.add('disabled');
    $('twin-yes').classList.add('disabled');
  } else {
    $('multi-3on1').classList.remove('disabled');
    $('twin-yes').classList.remove('disabled');
  }
  $('hobbled-note').style.display = st==='hobbled' ? 'block' : 'none';
  updateControls();
}
function pickMulti(m, el) {
  S.multi=m;
  selInRow(el);
  $('warn-multi-width').style.display=(m==='2on1'||m==='3on1')?'block':'none';
  if(m==='3on1') $('twin-yes').classList.add('disabled');
  else if(S.shadeStyle!=='waterfall') $('twin-yes').classList.remove('disabled');
  updateControls();
}
function pickTwin(yes, el) {
  S.twin=yes;
  selInRow(el);
  $('twin-info').style.display=yes?'block':'none';
  updateControls();
  buildLinerOpts();
}
function pickOpening(o, el) {
  S.openingStyle=o;
  selInRow(el);
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

// Show the style section that matches the product type (step 5).
var _s6setup=false;
function setupS6(){
  hideb('roman-style-opts'); hideb('opening-style-opts'); hideb('valance-only-opts');
  hideb('panel-extras'); hideb('drapery-extras');
  $('s6-wait-note').style.display = S.productType ? 'none' : 'block';
  if(!S.productType){ $('s6-title').textContent='Shade style'; return; }
  if(S.productType==='roman'){
    $('s6-title').textContent='Shade style';
    showb('roman-style-opts');
  } else if(S.productType==='panel'){
    $('s6-title').textContent='Panel opening';
    showb('opening-style-opts');
    showb('panel-extras');
  } else if(S.productType==='drapery'){
    $('s6-title').textContent='Drapery opening';
    showb('opening-style-opts');
    showb('drapery-extras');
  } else {
    $('s6-title').textContent='Valance options';
    showb('valance-only-opts');
  }
}

/* ── Step 7: Controls ── */
function updateControls() {
  hideb('roman-controls'); hideb('panel-ctrl-note'); hideb('drape-ctrl-note'); hideb('valance-ctrl-note');
  $('s7-wait-note').style.display = S.productType ? 'none' : 'block';
  if(!S.productType) return;
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
  // drop a control that the new style/twin/3-on-1 choice just disabled
  if(S.control){ var cur=$('ctrl-'+S.control); if(cur && (cur.classList.contains('disabled')||cur.style.display==='none')){ cur.classList.remove('sel'); S.control=''; $('ctrl-err').style.display='none'; $('ctrl-limit-info').style.display='none'; updateMotor(); } }
}
function pickControl(c, el) {
  S.control=c;
  document.querySelectorAll('#ctrl-opts .opt-btn').forEach(function(p){p.classList.remove('sel');});
  if(el) el.classList.add('sel');
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
  updateMotor();
  wwSummary();
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
  if(!S.twin && S.liner==='twin') pickLiner('none', document.querySelector('#liner-type-opts .opt-btn'));
}
function pickLiner(type, el) {
  S.liner=type;
  document.querySelectorAll('#liner-type-opts .opt-btn').forEach(function(p){p.classList.remove('sel');});
  el.classList.add('sel');
  S.linerColor='';
  if(type==='none'||type==='twin'){
    hideb('liner-color-section');
  } else {
    showb('liner-color-section');
    var liners = getLiners()[type]||[];
    var $opts=$('liner-color-opts'); $opts.innerHTML='';
    liners.forEach(function(l){
      var p=document.createElement('button');
      p.type='button'; p.className='opt-btn';
      p.textContent=l.name+' ('+l.code+')';
      p.onclick=function(){
        S.linerColor=l.code+' '+l.name;
        document.querySelectorAll('#liner-color-opts .opt-btn').forEach(function(x){x.classList.remove('sel');});
        this.classList.add('sel');
        $('warn-black-seam').style.display=(l.note==='seam>53'&&S.w>53)?'block':'none';
        wwSummary();
      };
      $opts.appendChild(p);
    });
  }
  wwSummary();
}

/* ── Step 9: Edge binding ── */
function buildEBOpts() {
  var $eto=$('eb-type-opts'); $eto.innerHTML='';
  $('eb-wait-note').style.display = S.collection ? 'none' : 'block';
  if(!S.collection){ hideb('eb-color-section'); return; }
  $('warn-eb-req-step9').style.display=(S.pattern&&S.pattern.edgeBindingRequired)?'block':'none';
  $('warn-edge-seal').style.display='none';

  var ebReq = !!(S.pattern&&S.pattern.edgeBindingRequired);
  var keys = S.collection==='premier' ? ['none','narrow','wide','ramie'] : ['none','ramie'];
  if(keys.indexOf(S.ebType)<0 || (ebReq && S.ebType==='none')) { S.ebType = ebReq ? '' : 'none'; S.ebColor=''; }
  if(!S.ebType || S.ebType==='none') hideb('eb-color-section');
  function addEBType(label, key) {
    var p=document.createElement('button');
    p.type='button'; p.className='opt-btn';
    if(ebReq&&key==='none') p.classList.add('disabled');
    if(S.ebType===key) p.classList.add('sel');
    p.textContent=label;
    p.onclick=function(){
      S.ebType=key; S.ebColor='';
      document.querySelectorAll('#eb-type-opts .opt-btn').forEach(function(x){x.classList.remove('sel');});
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
      wwSummary();
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
    var p=document.createElement('button');
    p.type='button'; p.className='opt-btn'; p.textContent=c;
    p.onclick=function(){
      S.ebColor=c;
      document.querySelectorAll('#eb-color-opts .opt-btn').forEach(function(x){x.classList.remove('sel');});
      this.classList.add('sel');
      wwSummary();
    };
    $ec.appendChild(p);
  });
}

/* ── Step 10: Specials ── */
function updateSpecials() {
  hideb('roman-specials'); hideb('panel-specials'); hideb('valance-specials');
  $('s10-wait-note').style.display = S.productType ? 'none' : 'block';
  if(!S.productType) return;
  if(S.productType==='roman') showb('roman-specials');
  else if(S.productType==='panel') showb('panel-specials');
  else showb('valance-specials');
}
function pickReturns(r, el) {
  S.returns=r;
  selInRow(el);
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

/* ── Delivery — shared pbDeliveryStepHTML; the choice lives in window.pbDelivery ── */
function wwDeliveryLabel() { return (typeof pbDeliveryLabel==='function') ? pbDeliveryLabel() : 'Ship to me'; }
function wwMountLabel(m) { return {inside:'Inside mount',outside:'Outside mount',ceiling:'Ceiling mount'}[m] || '—'; }

/* ── Summary card ── */
function wwSummary() {
  var set=function(id,v){ var e=document.getElementById(id); if(e) e.textContent=v||'—'; };
  var val=function(id){ var e=document.getElementById(id); return e ? (e.value||'').trim() : ''; };
  if(wwFlow==='roller'){
    var w=val('r-w'), h=val('r-h');
    set('ws-product','Portfolio Natural Woven Roller');
    set('ws-size',(w&&h)?(w+'″ × '+h+'″'):'—');
    set('ws-mount',rS.mount);
    set('ws-qty',val('r-qty')||'1');
    set('ws-type','Roller shade');
    set('ws-fabric',[val('r-pattern'),val('r-color')].filter(Boolean).join(' · '));
    set('ws-control',rS.ctrl);
    set('ws-liner',rS.liner);
  } else {
    var collMap={portfolio:'Wallace Portfolio Natural Woven',galaxy:'Wallace Galaxy Woven',premier:'Walden Premier',select:'Walden Select'};
    var ctrlEl=S.control?document.getElementById('ctrl-'+S.control):null;
    set('ws-product',collMap[S.collection]||'Natural Woven');
    set('ws-size',(S.w&&S.h)?(S.w+'″ × '+S.h+'″'):'—');
    set('ws-mount',wwMountLabel(S.mountType));
    set('ws-qty',String(S.qty||1));
    set('ws-type',{roman:'Roman shade',panel:'Sliding panel',drapery:'Natural drapery',valance:'Valance only'}[S.productType]);
    set('ws-fabric',S.pattern?(S.pattern.name+' ('+S.pattern.code+')'):'');
    set('ws-control',ctrlEl?ctrlEl.textContent:'');
    set('ws-liner',S.liner==='none'?'No liner':({lf:'Light filtering',bo:'Blackout',twin:'Twin / movable liner'}[S.liner])+(S.linerColor?' · '+S.linerColor:''));
  }
  set('ws-del',wwDeliveryLabel());
}

/* ── Submit ── */
function submitQuote() {
  if(wwFlow==='roller') return submitRollerQuote();
  var name=$('cf-name').value.trim();
  var phone=($('cf-phone')||{value:''}).value.trim();
  var email=($('cf-email')||{value:''}).value.trim();
  var contact=phone||(email)||'';
  if(!name||!email){alert('Please enter your name and email address.'); return;}
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
    'Mount type: '+wwMountLabel(S.mountType),
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
    'Wall or Ceiling mount: '+(S.wallOrCeiling||wwMountLabel(S.mountType)),
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
    'Preference: '+wwDeliveryLabel(),
    '',
    'NOTES',
    $('cf-notes').value||'None',
    '',
    '--- Sent from blindznation.com/pages/wallace-woven.html ---'
  ];

  var subj='Wallace '+coll+' Quote — '+prod+' — '+name;
  window.pbMailto = 'mailto:justin@blindznation.com?subject='+encodeURIComponent('Blindznation — ' + subj)+'&body='+encodeURIComponent('BLINDZNATION\n\n' + bodyLines.join('\n'));

  $('success-box').style.display='block';
  $('success-box').scrollIntoView({behavior:'smooth'});
  $('ww-config').style.display='none';
  $('s0').style.display='none';
}

function addWallaceWovenToCart() {
  if(wwFlow==='roller'){
    var v=function(id){ var e=document.getElementById(id); return e ? (e.value||'').trim() : ''; };
    var rq=parseInt(v('r-qty'),10)||1;
    var rl=[
      { label: 'Product', value: 'Wallace Portfolio Natural Woven Rollers' },
      { label: 'Type', value: 'Roller Shade' },
      { label: 'Pattern', value: v('r-pattern') || '—' },
      { label: 'Color', value: v('r-color') || '—' },
      { label: 'Size', value: (v('r-w')||'—') + '″ × ' + (v('r-h')||'—') + '″' },
      { label: 'Mount', value: rS.mount || '—' },
      { label: 'Control', value: rS.ctrl || '—' },
      { label: 'Liner', value: rS.liner || '—' },
      { label: 'Cassette', value: rS.cass || '—' },
      { label: 'Room', value: v('r-room') || '—' },
      { label: 'Quantity', value: String(rq) }
    ];
    pbAddToCart({ product: 'Wallace Portfolio Natural Woven Rollers', lines: rl, specs: rl.map(function(l){ return l.label+': '+l.value; }).join(' | '), qty: rq });
    pbOpenCart();
    return;
  }
  var collMap = {portfolio:'Wallace Portfolio Natural Woven',galaxy:'Wallace Galaxy Woven',premier:'Walden Premier',select:'Walden Select'};
  var prodMap = {roman:'Roman Shade',panel:'Sliding Panel',drapery:'Natural Drapery',valance:'Valance Only'};
  var coll = collMap[S.collection] || (S.collection || 'Natural Woven');
  var prod = prodMap[S.productType] || (S.productType || '—');
  var lines = [
    { label: 'Product', value: coll },
    { label: 'Type', value: prod },
    { label: 'Pattern', value: S.pattern ? S.pattern.name : '—' },
    { label: 'Size', value: (S.w||'—') + '″ × ' + (S.h||'—') + '″' },
    { label: 'Mount', value: wwMountLabel(S.mountType) },
    { label: 'Control', value: S.control || '—' },
    { label: 'Liner', value: S.liner + (S.linerColor ? ' — ' + S.linerColor : '') },
    { label: 'Quantity', value: String(S.qty||1) }
  ];
  pbAddToCart({ product: coll, lines: lines, specs: lines.map(function(l){ return l.label+': '+l.value; }).join(' | '), qty: S.qty||1 });
  pbOpenCart();
}
