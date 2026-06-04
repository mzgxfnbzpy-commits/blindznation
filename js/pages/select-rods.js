renderNav('Hardware'); renderFooter(false);

// ── DATA ──────────────────────────────────────────────────────────
var BRASS_FINISHES = [
  {code:'07',name:'Bronze',color:'#8B6344',surcharge:false},
  {code:'22',name:'Satin Brass',color:'#C4A03A',surcharge:false},
  {code:'27',name:'Brushed Brass',color:'#C9A84C',surcharge:false},
  {code:'46',name:'Matte Black',color:'#2A2A2A',surcharge:false},
  {code:'67',name:'Steel',color:'#8E8E8E',surcharge:false},
  {code:'48',name:'Graphite',color:'#4A4A4A',surcharge:true},
  {code:'65',name:'Gunmetal',color:'#6A6A6A',surcharge:true},
  {code:'68',name:'Polished Nickel',color:'#D4D4D4',surcharge:true},
];
var IW_FINISHES = [
  {code:'845',name:'Black',color:'#1A1A1A',surcharge:false},
  {code:'815',name:'Black Copper',color:'#3D2B1F',surcharge:true},
  {code:'857',name:'Sandstone',color:'#C8B89A',surcharge:true},
  {code:'865',name:'Black Pewter',color:'#3A3A3A',surcharge:true},
];
var CORTINA_FINISHES = [
  {code:'NB',name:'Gloss Black',color:'#111111',surcharge:false},
  {code:'BL',name:'Gloss White',color:'#F0F0F0',surcharge:false},
  {code:'BC',name:'Champagne',color:'#D4C090',surcharge:false},
  {code:'AP',name:'Steel',color:'#9A9A9A',surcharge:false},
];
var WOOD_FINISHES = [
  {code:'WD01',name:'Natural',color:'#D4B896',surcharge:false},
  {code:'WD02',name:'Golden Oak',color:'#C8A050',surcharge:false},
  {code:'WD03',name:'Honey Maple',color:'#D4A870',surcharge:false},
  {code:'WD04',name:'Medium Cherry',color:'#C07040',surcharge:false},
  {code:'WD05',name:'Dark Cherry',color:'#8B2018',surcharge:false},
  {code:'WD06',name:'Mahogany',color:'#6A1808',surcharge:false},
  {code:'WD07',name:'Dark Walnut',color:'#4A3018',surcharge:false},
  {code:'WD08',name:'Espresso',color:'#2A1A0A',surcharge:false},
  {code:'WD09',name:'White',color:'#F5F0E8',surcharge:false},
  {code:'WD10',name:'Antique White',color:'#EDE0C8',surcharge:false},
  {code:'WD11',name:'Driftwood',color:'#9A9080',surcharge:true},
  {code:'WD12',name:'Matte Black',color:'#1A1A1A',surcharge:true},
  {code:'WD13',name:'Gold Leaf',color:'#C8A030',surcharge:true},
];

var FINIALS_BRASS_34 = ['Opus','Nova','Acrylic Halo','Deco Aries','Windsor','Acrylic Ball','Ball','Candler','Tetra','Empire','Urban','Kingston','Aries','Gatsby','Modern Ball','Acrylic Aries','Acrylic Flare','Acrylic Mystic','Gala','Cadet','Landover','End Cap','Square End Cap'];
var FINIALS_BRASS_1316 = FINIALS_BRASS_34.concat(['Stella Crystal','Solitaire Crystal']);
var FINIALS_IW = ['Iron End Cap','Iron Ball','Capri End Cap','Argo','Avalon','Cypress','Royal','Valor','Grenada'];
var FINIALS_WOOD = ['Ball','Fluted Ball','Acorn','Arrow','Pineapple','Trumpet','Square','Flat Disc','Decorative Ring','Endcap'];

// ── STATE ─────────────────────────────────────────────────────────
var SS = {
  system:'', collection:'', finish:'', finishCode:'',
  diameter:'', finial:'', travFinial:'', bracket:'Standard Wall Bracket (3½" return)',
  brassBracket:'Standard heavy-duty (included)',
  cortDesign:'sintra', accList:[], fascia:'halfround',
  woodFinish:'', woodDia:'', woodFinial:''
};

// ── HELPERS ──────────────────────────────────────────────────────
function reveal(id){var e=document.getElementById(id);if(e){e.classList.add('on');setTimeout(function(){e.scrollIntoView({behavior:'smooth',block:'nearest'});},80);}}
function hide(id){var e=document.getElementById(id);if(e)e.classList.remove('on');}
function hideAll(a){a.forEach(function(id){hide(id);});}
function selOpt(el,grp){document.querySelectorAll('#'+grp+' .opt-btn').forEach(function(b){b.classList.remove('sel');});el.classList.add('sel');}
function getOpt(grp){var s=document.querySelector('#'+grp+' .opt-btn.sel');return s?s.textContent.trim():'';}

function revealQuote(){
  renderSummary(getCurrentSummaryLines());
  reveal('sec-summary');
  reveal('sec-quote');
}

function getCurrentSummaryLines(){
  if(SS.collection==='wood' && SS.system==='stationary') return getWoodSummary();
  if(SS.collection==='brass' && SS.system==='traverse') return getBrassTravSummary();
  if(SS.collection==='cortina') return getCortinaSummary();
  return getStatSummary();
}

// ── STEP 1: SYSTEM ────────────────────────────────────────────────
function selSystem(s){
  SS.system=s; SS.collection=''; SS.finish=''; SS.diameter=''; SS.finial=''; SS.travFinial=''; SS.woodFinish=''; SS.woodDia='';
  document.getElementById('sys-stat').classList.toggle('sel',s==='stationary');
  document.getElementById('sys-trav').classList.toggle('sel',s==='traverse');
  hideAll(['sec-collection','sec-finish','sec-wood-finish','sec-wood-diam','sec-diameter','sec-stat','sec-wood-stat','sec-trav-brass','sec-trav-cortina','sec-wood-quote','sec-summary','sec-quote']);
  buildCollCards(s);
  reveal('sec-collection');
}

// ── STEP 2: COLLECTION ────────────────────────────────────────────
function buildCollCards(sys){
  var cards;
  if(sys==='stationary'){
    cards=[
      {id:'brass',icon:'🔩',name:'Select Metal Brass',desc:'8 stunning finishes · ¾" and 1 3/16" · 22+ finials · Brass construction',tag:'Most popular'},
      {id:'ironworks',icon:'⚙️',name:'Iron Works',desc:'4 dark finishes · ¾" and 1 3/16" · 9 finials · Steel poles · Industrial look',tag:'Contemporary / industrial'},
      {id:'wood',icon:'🪵',name:'Select Wood',desc:'13 finishes · 1 3/8" and 2 1/4" · Natural wood poles · Classic look',tag:'Custom quote'},
    ];
  } else {
    cards=[
      {id:'brass',icon:'🔩',name:'Select Metal Brass Traverse',desc:'Half Round or Metro Flat fascia · 8 finishes · Pinch Pleat or Ripplefold · Up to 32ft',tag:'Decorative traverse'},
      {id:'cortina',icon:'🎛️',name:'Cortina Collection',desc:'Sintra, Obidos, or Coimbra designs · 4 finishes · Single or double rod · Up to 236"',tag:'Modern traverse'},
      {id:'wood',icon:'🪵',name:'Select Wood Traverse',desc:'Wood poles with traverse hardware · 13 finishes · 1 3/8" and 2 1/4"',tag:'Custom quote'},
    ];
  }
  document.getElementById('coll-title').textContent=sys==='stationary'?'Which collection?':'Which traverse system?';
  document.getElementById('coll-cards').innerHTML=cards.map(function(c){
    return '<div class="coll-card" id="coll-'+c.id+'" onclick="selCollection(\''+c.id+'\')">'+
      '<div class="coll-icon">'+c.icon+'</div>'+
      '<div class="coll-name">'+c.name+'</div>'+
      '<div class="coll-desc">'+c.desc+'</div>'+
      '<div class="coll-tag">'+c.tag+'</div>'+
      '</div>';
  }).join('');
}

function selCollection(coll){
  SS.collection=coll; SS.finish=''; SS.diameter=''; SS.finial=''; SS.travFinial=''; SS.woodFinish=''; SS.woodDia='';
  document.querySelectorAll('.coll-card').forEach(function(c){c.classList.remove('sel');});
  var card=document.getElementById('coll-'+coll);
  if(card)card.classList.add('sel');
  hideAll(['sec-finish','sec-wood-finish','sec-wood-diam','sec-diameter','sec-stat','sec-wood-stat','sec-trav-brass','sec-trav-cortina','sec-wood-quote','sec-summary','sec-quote']);
  if(coll==='wood'){
    reveal('sec-wood-quote');
  } else {
    buildFinishes(coll);
    reveal('sec-finish');
  }
}

// ── STEP 3: FINISH ────────────────────────────────────────────────
function buildFinishes(coll){
  var fins=coll==='cortina'?CORTINA_FINISHES:(coll==='ironworks'?IW_FINISHES:BRASS_FINISHES);
  var sub=fins.length+' finishes available.';
  var note='';
  if(coll==='brass'){sub='8 finishes — Bronze, Satin Brass, Brushed Brass, Matte Black, Steel, Graphite, Gunmetal, Polished Nickel.';note='Graphite (48), Gunmetal (65), and Polished Nickel (68) carry a small price surcharge over the standard 5 finishes.';}
  else if(coll==='ironworks'){sub='4 finishes — Black, Black Copper, Sandstone, Black Pewter.';note='Black (845) is the base price; Black Copper, Sandstone, and Black Pewter carry a small surcharge.';}
  else if(coll==='cortina'){sub='4 finishes — Gloss Black, Gloss White, Champagne, Steel.';note='All Cortina brackets and end caps are color-coordinated to your finish selection.';}
  document.getElementById('finish-sub').textContent=sub;
  document.getElementById('finish-note').textContent=note||'Finish samples available — ask us for a selector card.';
  document.getElementById('finish-cards').innerHTML=fins.map(function(f){
    var isLight=f.color==='#F0F0F0'||f.color==='#D4D4D4'||f.color==='#C8B89A';
    var swatchBorder=isLight?'border-bottom:1px solid #ddd;':'';
    return '<div class="finish-card" onclick="selFinish(\''+f.code+'\',\''+f.name+'\',this)">'+
      '<div class="finish-swatch" style="background:'+f.color+';'+swatchBorder+'"></div>'+
      '<div class="finish-name">'+f.name+(f.surcharge?'<span class="finish-surcharge">+surcharge</span>':'')+'</div>'+
      '</div>';
  }).join('');
}

function selFinish(code,name,el){
  SS.finish=name; SS.finishCode=code;
  document.querySelectorAll('#finish-cards .finish-card').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  hideAll(['sec-diameter','sec-stat','sec-trav-brass','sec-trav-cortina','sec-summary','sec-quote']);
  if(SS.system==='stationary'){
    reveal('sec-diameter');
  } else {
    if(SS.collection==='brass'){
      buildBrassFinials();
      reveal('sec-trav-brass');
    } else if(SS.collection==='cortina'){
      reveal('sec-trav-cortina');
    }
  }
}

// ── WOOD FINISH + DIAMETER ────────────────────────────────────────
function buildWoodFinishCards(){
  document.getElementById('wood-finish-cards').innerHTML=WOOD_FINISHES.map(function(f){
    var isLight=f.color==='#F5F0E8'||f.color==='#EDE0C8';
    var swatchBorder=isLight?'border-bottom:1px solid #ddd;':'';
    return '<div class="finish-card" onclick="selWoodFinish(\''+f.code+'\',\''+f.name+'\',this)">'+
      '<div class="finish-swatch" style="background:'+f.color+';'+swatchBorder+'"></div>'+
      '<div class="finish-name">'+f.name+(f.surcharge?'<span class="finish-surcharge">+surcharge</span>':'')+'</div>'+
      '</div>';
  }).join('');
}

function selWoodFinish(code,name,el){
  SS.woodFinish=name;
  document.querySelectorAll('#wood-finish-cards .finish-card').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  hideAll(['sec-wood-diam','sec-wood-stat','sec-summary','sec-quote']);
  reveal('sec-wood-diam');
}

function selWoodDia(d){
  SS.woodDia=d;
  document.getElementById('wd-diam-138').classList.toggle('sel',d==='1-3/8');
  document.getElementById('wd-diam-214').classList.toggle('sel',d==='2-1/4');
  hideAll(['sec-wood-stat','sec-summary','sec-quote']);
  buildWoodFinials();
  if(SS.system==='stationary'){
    reveal('sec-wood-stat');
  } else {
    // Wood traverse — goes to wood stat config re-used section with traverse context
    reveal('sec-wood-stat');
  }
  woodUpdate();
}

function buildWoodFinials(){
  document.getElementById('wood-finial-grid').innerHTML=FINIALS_WOOD.map(function(f){
    return '<button class="finial-btn" onclick="selWoodFinial(\''+f+'\',this)">'+f+'</button>';
  }).join('');
}

function selWoodFinial(name,el){
  SS.woodFinial=name;
  document.querySelectorAll('#wood-finial-grid .finial-btn').forEach(function(b){b.classList.remove('sel');});
  el.classList.add('sel');
  woodUpdate();
}

function woodUpdate(){
  var profile=getOpt('grp-wd-profile');
  var width=getOpt('grp-wd-width');
  var shape=getOpt('grp-wd-shape');
  var config=getOpt('grp-wd-config');
  var ring=getOpt('grp-wd-ring');
  var mount=getOpt('grp-wd-mount');
  var qty=parseInt(document.getElementById('wd-qty').value)||1;
}

function submitWoodQuote(){
  var name=document.getElementById('wd-q-name').value.trim();
  var phone=document.getElementById('wd-q-phone').value.trim();
  if(!name||!phone){alert('Please enter your name and phone number.');return;}
  var notes=document.getElementById('wd-q-notes').value.trim();
  var sys=SS.system==='traverse'?'Select Wood Traverse':'Select Wood Stationary Pole';
  var body='SELECT WOOD HARDWARE QUOTE REQUEST\n\nType: '+sys+'\nName: '+name+'\nPhone: '+phone+'\n\nProject notes:\n'+(notes||'None')+'\n\n--- blindznation.com/pages/select-rods.html ---';
  window.location.href='mailto:justin@blindznation.com?subject='+encodeURIComponent('Select Wood Quote — '+name)+'&body='+encodeURIComponent(body);
  document.getElementById('wd-q-form').style.display='none';
  document.getElementById('wd-q-success').style.display='block';
}

function getWoodSummary(){
  var profile=getOpt('grp-wd-profile');
  var width=getOpt('grp-wd-width');
  var shape=getOpt('grp-wd-shape');
  var config=getOpt('grp-wd-config');
  var ring=getOpt('grp-wd-ring');
  var mount=getOpt('grp-wd-mount');
  var qty=parseInt(document.getElementById('wd-qty').value)||1;
  return [
    {k:'Collection',v:'Select Wood'},
    {k:'Finish',v:SS.woodFinish||'—'},
    {k:'Diameter',v:SS.woodDia?SS.woodDia+'"':'—'},
    {k:'Profile',v:profile||'—'},
    {k:'Window width',v:width||'—'},
    {k:'Window shape',v:shape||'—'},
    {k:'Rod configuration',v:config||'—'},
    {k:'Finial',v:SS.woodFinial||'— (not selected)'},
    {k:'Ring type',v:ring||'—'},
    {k:'Mount',v:mount||'—'},
    {k:'Quantity',v:qty+' rod(s)'},
  ];
}

// ── STEP 4: DIAMETER (brass/ironworks stationary) ──────────────────────────────────────────────
function selDiameter(d){
  SS.diameter=d; SS.finial='';
  document.getElementById('diam-34').classList.toggle('sel',d==='3/4');
  document.getElementById('diam-1316').classList.toggle('sel',d==='1-3/16');
  hideAll(['sec-stat','sec-summary','sec-quote']);
  var title=SS.collection==='ironworks'?'Iron Works – '+d+'" Pole':'Select Metal Brass – '+d+'" Pole';
  document.getElementById('stat-title').textContent=title;
  buildFinials();
  reveal('sec-stat');
  sUpdate();
}

// ── FINIALS ───────────────────────────────────────────────────────
function buildFinials(){
  var list=SS.collection==='ironworks'?FINIALS_IW:(SS.diameter==='3/4'?FINIALS_BRASS_34:FINIALS_BRASS_1316);
  document.getElementById('finial-grid').innerHTML=list.map(function(f){
    return '<button class="finial-btn" onclick="selFinial(\''+f+'\',this)">'+f+'</button>';
  }).join('');
}

function buildBrassFinials(){
  document.getElementById('brass-finial-grid').innerHTML=FINIALS_BRASS_1316.map(function(f){
    return '<button class="finial-btn" onclick="selTravFinial(\''+f+'\',this)">'+f+'</button>';
  }).join('');
}

function selFinial(name,el){
  SS.finial=name;
  document.querySelectorAll('#finial-grid .finial-btn').forEach(function(b){b.classList.remove('sel');});
  el.classList.add('sel'); sUpdate();
}
function selTravFinial(name,el){
  SS.travFinial=name;
  document.querySelectorAll('#brass-finial-grid .finial-btn').forEach(function(b){b.classList.remove('sel');});
  el.classList.add('sel'); tBrassUpdate();
}

// ── BRACKET ───────────────────────────────────────────────────────
function selBracket(el,gridId,name){
  if(gridId==='stat-bracket-grid') SS.bracket=name;
  else SS.brassBracket=name;
  document.querySelectorAll('#'+gridId+' .bracket-card').forEach(function(c){c.classList.remove('sel');});
  el.classList.add('sel');
  if(gridId==='stat-bracket-grid') sUpdate(); else tBrassUpdate();
}

// ── ACCESSORIES ────────────────────────────────────────────────
function toggleAcc(el,name){
  var idx=SS.accList.indexOf(name);
  if(idx===-1){SS.accList.push(name);el.classList.add('sel');}
  else{SS.accList.splice(idx,1);el.classList.remove('sel');}
  sUpdate();
}

function toggleRingQty(show){
  var w=document.getElementById('ring-qty-wrap');
  if(w) w.style.display=show?'':'none';
}

function ringQtyChanged(inp){
  var qty=parseInt(inp.value)||0;
  var est=document.getElementById('ring-qty-estimate');
  if(qty>0&&est){
    var impliedWidth=Math.round(qty*15/5);
    est.textContent='≈ '+qty+' rings for a ~'+impliedWidth+'" wide panel';
    inp.style.borderColor='var(--gold,#C8973F)';
  } else if(est){
    est.textContent='';
    inp.style.borderColor='#d8d8d4';
  }
  sUpdate();
}

// ── STATIONARY SUMMARY ────────────────────────────────────────────
function getStatSummary(){
  var width=getOpt('grp-stat-width');
  var shape=getOpt('grp-stat-shape');
  var config=getOpt('grp-stat-config');
  var ring=getOpt('grp-ring-type');
  var ringQtyInp=document.getElementById('ring-qty-input');
  var ringQtyVal=ringQtyInp?parseInt(ringQtyInp.value)||0:0;
  var ringQty=ringQtyVal>0?(ringQtyVal+' rings total (est. 5 per 15")'):'';
  var mount=getOpt('grp-stat-mount');
  var baton=getOpt('grp-stat-baton');
  var qty=parseInt(document.getElementById('stat-qty').value)||1;
  var accs=SS.accList.length?SS.accList.join(', '):'None';
  return [
    {k:'Collection',v:SS.collection==='ironworks'?'Select Iron Works':'Select Metal Brass'},
    {k:'Finish',v:SS.finish||'—'},
    {k:'Diameter',v:SS.diameter?SS.diameter+'"':'—'},
    {k:'Window width',v:width||'—'},
    {k:'Window shape',v:shape||'—'},
    {k:'Rod configuration',v:config||'—'},
    {k:'Finial',v:SS.finial||'— (not selected)'},
    {k:'Ring type',v:ring||'—'},
    {k:'Rings',v:ringQty||'—'},
    {k:'Bracket style',v:SS.bracket},
    {k:'Baton',v:baton||'—'},
    {k:'Accessories',v:accs},
    {k:'Mount',v:mount||'—'},
    {k:'Quantity',v:qty+' rod(s)'},
  ];
}
function sUpdate(){renderSummary(getStatSummary());}

// ── BRASS TRAVERSE ────────────────────────────────────────────
function selFascia(f){
  SS.fascia=f;
  document.getElementById('fascia-hr').classList.toggle('sel',f==='halfround');
  document.getElementById('fascia-metro').classList.toggle('sel',f==='metro');
  tBrassUpdate();
}

function tBrassTogglePleat(type){
  document.getElementById('brass-ripple-opts').style.display=type==='ripple'?'block':'none';
  tBrassUpdate();
}

function getBrassTravSummary(){
  var w=parseFloat(document.getElementById('brass-width').value)||0;
  var draw=getOpt('grp-brass-draw');
  var pleat=getOpt('grp-brass-pleat');
  var ripple=getOpt('grp-brass-ripple');
  var op=getOpt('grp-brass-op');
  var config=getOpt('grp-brass-config');
  var bracket=SS.brassBracket;
  var mount=getOpt('grp-brass-mount');
  var cord=getOpt('grp-brass-cord');
  var qty=parseInt(document.getElementById('brass-qty').value)||1;
  var brCount=w?calcBrassBrackets(w):'—';
  var brNote=document.getElementById('brass-bracket-note');
  if(brNote){brNote.style.display=w?'block':'none';if(w)brNote.textContent=w+'" track requires '+brCount+' bracket(s). (Up to 57"=2, 58"–85"=3, 86"–113"=4, 114"–140"=5, 141"–168"=6, 169"–192"=7)';}
  var isRipple=pleat.indexOf('Ripplefold')!==-1;
  return [
    {k:'Collection',v:'Select Metal Brass Traverse'},
    {k:'Finish',v:SS.finish||'—'},
    {k:'Fascia',v:SS.fascia==='halfround'?'1 3/16" Half Round Fascia':'1 3/8" Metro Flat Fascia'},
    {k:'Track width',v:w?w+'"':'—'},
    {k:'Draw',v:draw||'—'},
    {k:'Drapery style',v:pleat.split(' ')[0]+(isRipple?' · '+ripple+' fullness':'')},
    {k:'Operation',v:op.split(' ')[0]+(op.indexOf('Cord')!==-1?' · cord drop '+cord:'')},
    {k:'Rod config',v:config||'—'},
    {k:'Bracket',v:bracket},
    {k:'Brackets needed',v:brCount!=='—'?brCount+' per rod':'—'},
    {k:'Mount',v:mount||'—'},
    {k:'Finial / End cap',v:SS.travFinial||'— (not selected)'},
    {k:'Quantity',v:qty+' rod(s)'},
  ];
}
function tBrassUpdate(){renderSummary(getBrassTravSummary());}

function calcBrassBrackets(w){
  if(w<=57)return 2;if(w<=85)return 3;if(w<=113)return 4;
  if(w<=140)return 5;if(w<=168)return 6;return 7;
}

// ── CORTINA TRAVERSE ──────────────────────────────────────────────
function selCortina(design,el){
  SS.cortDesign=design;
  ['cort-sintra','cort-obidos','cort-coimbra'].forEach(function(id){
    var c=document.getElementById(id);if(c)c.classList.remove('sel');
  });
  el.classList.add('sel');
  document.getElementById('coimbra-face-wrap').style.display=design==='coimbra'?'block':'none';
  cUpdate();
}

function cTogglePleat(type){
  document.getElementById('cort-ripple-opts').style.display=type==='ripple'?'block':'none';
  cUpdate();
}

function getCortinaSummary(){
  var w=parseFloat(document.getElementById('cort-width').value)||0;
  var design=SS.cortDesign||'sintra';
  var face=design==='coimbra'?(' · '+(getOpt('grp-coimbra-face')||'Flat face')):'';
  var config=getOpt('grp-cort-config');
  var draw=getOpt('grp-cort-draw');
  var pleat=getOpt('grp-cort-pleat');
  var ripple=getOpt('grp-cort-ripple');
  var op=getOpt('grp-cort-op');
  var mount=getOpt('grp-cort-mount');
  var qty=parseInt(document.getElementById('cort-qty').value)||1;
  var brCount=w?calcCortinaBrackets(w):'—';
  var brNote=document.getElementById('cort-bracket-note');
  if(brNote){brNote.style.display=w?'block':'none';if(w)brNote.textContent=w+'" track requires '+brCount+' brackets (included in set).';}
  var isRipple=pleat.indexOf('Ripplefold')!==-1;
  return [
    {k:'Collection',v:'Cortina Collection'},
    {k:'Finish',v:SS.finish||'—'},
    {k:'Design',v:design.charAt(0).toUpperCase()+design.slice(1)+face},
    {k:'Rod config',v:config||'—'},
    {k:'Track width',v:w?w+'"':'—'},
    {k:'Draw',v:draw||'—'},
    {k:'Drapery style',v:pleat.split(' ')[0]+(isRipple?' · '+ripple+' fullness':'')},
    {k:'Operation',v:op.split('(')[0].trim()},
    {k:'Mount',v:mount||'—'},
    {k:'Brackets needed',v:brCount!=='—'?brCount+' (included)':'—'},
    {k:'Quantity',v:qty+' rod(s)'},
  ];
}
function cUpdate(){renderSummary(getCortinaSummary());}

function calcCortinaBrackets(w){
  if(w<=60)return 2;if(w<=90)return 3;if(w<=120)return 4;
  if(w<=150)return 5;if(w<=180)return 6;if(w<=210)return 7;return 8;
}

// ── SUMMARY RENDER ────────────────────────────────────────────────
function renderSummary(lines){
  var el=document.getElementById('summary-lines');
  if(!el)return;
  el.innerHTML=lines.map(function(l){
    return '<div class="summary-line"><span class="summary-key">'+l.k+'</span><span class="summary-val">'+l.v+'</span></div>';
  }).join('');
}

function getSummaryText(){
  var lines=[];
  document.querySelectorAll('#summary-lines .summary-line').forEach(function(d){
    var spans=d.querySelectorAll('span');
    if(spans.length>=2)lines.push(spans[0].textContent+': '+spans[1].textContent);
  });
  return lines.join('\n');
}

// ── SUBMIT ────────────────────────────────────────────────────────
function submitSelect(){
  var name=document.getElementById('sel-name').value.trim();
  var phone=document.getElementById('sel-phone').value.trim();
  if(!name||!phone){alert('Please enter your name and phone number.');return;}
  var delivery=getOpt('grp-del-sel');
  var spec=getSummaryText();
  var body='SELECT HARDWARE QUOTE REQUEST\n\n'
    +'Name: '+name+'\nPhone: '+phone
    +'\nEmail: '+(document.getElementById('sel-email').value.trim()||'—')+'\n\n'
    +'SPECIFICATION:\n'+spec+'\n\n'
    +'Delivery: '+delivery+'\n\n'
    +'Notes:\n'+(document.getElementById('sel-notes').value.trim()||'None');
  window.location.href='mailto:justin@blindznation.com'
    +'?subject='+encodeURIComponent('Select Hardware Quote — '+(SS.collection||'')+(SS.finish||SS.woodFinish?' · '+(SS.finish||SS.woodFinish):'')+' — '+name)
    +'&body='+encodeURIComponent(body);
  document.getElementById('sel-form').style.display='none';
  document.getElementById('sel-success').style.display='block';
}