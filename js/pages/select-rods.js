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
function showStep(id,on){var e=document.getElementById(id);if(e)e.style.display=on?'':'none';}
function selOpt(el,grp){document.querySelectorAll('#'+grp+' .opt-btn').forEach(function(b){b.classList.remove('sel');});el.classList.add('sel');}
function getOpt(grp){var s=document.querySelector('#'+grp+' .opt-btn.sel');return s?s.textContent.trim():'';}
function selWidth(){return parseFloat((document.getElementById('sel-width')||{value:''}).value)||0;}
function selQty(){return parseInt((document.getElementById('sel-qty')||{value:'1'}).value)||1;}

// Visible steps run 1..N with no gaps
function renumberSteps(){
  var n=0;
  document.querySelectorAll('#cfg-steps > .step-block').forEach(function(b){
    if(b.style.display==='none')return;
    n++;var s=b.querySelector('.step-num');if(s)s.textContent=n;
  });
}
// Show exactly the steps that apply to the current answers (replaces the old reveal-as-you-go flow).
function refreshSteps(){
  var wood=SS.collection==='wood';
  var hasColl=!!SS.collection;
  showStep('sec-finish',!wood);
  showStep('sec-diameter',SS.system==='stationary'&&hasColl&&!wood);
  showStep('sec-stat',SS.system==='stationary'&&hasColl&&!wood);
  showStep('sec-trav-brass',SS.system==='traverse'&&SS.collection==='brass');
  showStep('sec-trav-cortina',SS.collection==='cortina');
  showStep('sec-wood-quote',wood);
  var hint=document.getElementById('sel-width-hint');
  if(hint) hint.innerHTML=SS.collection==='cortina'?'inches &middot; max continuous 236&Prime; &middot; brackets included, count auto-calculated'
    :(SS.system==='traverse'&&SS.collection==='brass')?'inches &middot; max continuous 16ft (192&Prime;) &middot; over 16ft spliced 2-way, up to 32ft'
    :'inches &middot; finished rod / track width';
  renumberSteps();
  updateSummary();
}

function getCurrentSummaryLines(){
  if(SS.collection==='wood') return getWoodSummary();
  if(SS.collection==='brass' && SS.system==='traverse') return getBrassTravSummary();
  if(SS.collection==='cortina') return getCortinaSummary();
  if(SS.collection) return getStatSummary();
  return [
    {k:'System',v:SS.system==='stationary'?'Stationary pole':SS.system==='traverse'?'Decorative traverse rod':'—'},
  ];
}
function currentMount(){
  if(SS.collection==='brass'&&SS.system==='traverse') return getOpt('grp-brass-mount');
  if(SS.collection==='cortina') return getOpt('grp-cort-mount');
  if(SS.collection&&SS.collection!=='wood') return getOpt('grp-stat-mount');
  return '';
}
// Summary card: Product · Size · Mount · Qty first, then the product lines.
function updateSummary(){
  var w=selWidth();
  var head=[
    {k:'Product',v:'Select drapery hardware'},
    {k:'Size',v:w?w+'" wide':'—'},
    {k:'Mount',v:currentMount()||'—'},
    {k:'Qty',v:selQty()+' rod(s)'},
  ];
  renderSummary(head.concat(getCurrentSummaryLines()));
}

// ── STEP 2: SYSTEM ────────────────────────────────────────────────
function selSystem(s){
  SS.system=s; SS.collection=''; SS.finish=''; SS.diameter=''; SS.finial=''; SS.travFinial=''; SS.woodFinish=''; SS.woodDia='';
  document.getElementById('sys-stat').classList.toggle('sel',s==='stationary');
  document.getElementById('sys-trav').classList.toggle('sel',s==='traverse');
  document.getElementById('sys-note').textContent=s==='stationary'
    ?'Stationary pole — fixed rod with finials; panels hang from rings. Best for pinch pleat, goblet, grommet, and tab-top styles. Select Metal Brass · Iron Works · Wood.'
    :'Decorative traverse rod — decorative fascia over an internal track; panels open and close. Pinch Pleat or Ripplefold® compatible. Select Metal Traverse · Cortina Collection · Wood Traverse.';
  buildCollCards(s);
  resetFinishStep();
  refreshSteps();
}

// ── STEP 3: COLLECTION ────────────────────────────────────────────
var COLL_CARDS={
  stationary:[
    {id:'brass',name:'Select Metal Brass',desc:'8 stunning finishes · ¾" and 1 3/16" · 22+ finials · Brass construction',tag:'Most popular'},
    {id:'ironworks',name:'Iron Works',desc:'4 dark finishes · ¾" and 1 3/16" · 9 finials · Steel poles · Industrial look',tag:'Contemporary / industrial'},
    {id:'wood',name:'Select Wood',desc:'13 finishes · 1 3/8" and 2 1/4" · Natural wood poles · Classic look',tag:'Custom quote'},
  ],
  traverse:[
    {id:'brass',name:'Select Metal Brass Traverse',desc:'Half Round or Metro Flat fascia · 8 finishes · Pinch Pleat or Ripplefold · Up to 32ft',tag:'Decorative traverse'},
    {id:'cortina',name:'Cortina Collection',desc:'Sintra, Obidos, or Coimbra designs · 4 finishes · Single or double rod · Up to 236"',tag:'Modern traverse'},
    {id:'wood',name:'Select Wood Traverse',desc:'Wood poles with traverse hardware · 13 finishes · 1 3/8" and 2 1/4"',tag:'Custom quote'},
  ]
};
function buildCollCards(sys){
  var cards=COLL_CARDS[sys]||[];
  document.getElementById('coll-title').textContent=sys==='stationary'?'Which collection?':'Which traverse system?';
  document.getElementById('coll-note').textContent='';
  document.getElementById('coll-cards').innerHTML=cards.map(function(c){
    return '<button class="opt-btn" id="coll-'+c.id+'" onclick="selCollection(\''+c.id+'\')">'+c.name+' <span class="pill-hint">'+c.tag.toLowerCase()+'</span></button>';
  }).join('');
}

function selCollection(coll){
  SS.collection=coll; SS.finish=''; SS.diameter=''; SS.finial=''; SS.travFinial=''; SS.woodFinish=''; SS.woodDia='';
  document.querySelectorAll('#coll-cards .opt-btn').forEach(function(c){c.classList.remove('sel');});
  var card=document.getElementById('coll-'+coll);
  if(card)card.classList.add('sel');
  var info=(COLL_CARDS[SS.system]||[]).find(function(c){return c.id===coll;});
  document.getElementById('coll-note').textContent=info?info.desc+'.':'';
  document.getElementById('diam-34').classList.remove('sel');
  document.getElementById('diam-1316').classList.remove('sel');
  document.getElementById('finial-grid').innerHTML='<div class="placeholder-note">Choose a pole diameter above to see its finials.</div>';
  if(coll==='wood'){
    resetFinishStep();
  } else {
    buildFinishes(coll);
    if(SS.system==='traverse'&&coll==='brass') buildBrassFinials();
    if(SS.system==='stationary') document.getElementById('stat-title').textContent=coll==='ironworks'?'Iron Works stationary rod details':'Select Metal Brass stationary rod details';
  }
  refreshSteps();
}

// ── STEP 4: FINISH ────────────────────────────────────────────────
function resetFinishStep(){
  document.getElementById('finish-sub').textContent='';
  document.getElementById('finish-note').textContent='';
  document.getElementById('finish-cards').innerHTML='<div class="placeholder-note">Choose a collection above to see its finishes.</div>';
}
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
  updateSummary();
}

// ── SELECT WOOD (custom quote) ────────────────────────────────────
function getWoodSummary(){
  return [
    {k:'Collection',v:SS.system==='traverse'?'Select Wood Traverse':'Select Wood Stationary Pole'},
    {k:'Details',v:'Custom quote — see notes'},
  ];
}

// ── STEP 5: DIAMETER (brass/ironworks stationary) ──────────────────
function selDiameter(d){
  SS.diameter=d; SS.finial='';
  document.getElementById('diam-34').classList.toggle('sel',d==='3/4');
  document.getElementById('diam-1316').classList.toggle('sel',d==='1-3/16');
  var title=SS.collection==='ironworks'?'Iron Works – '+d+'" pole details':'Select Metal Brass – '+d+'" pole details';
  document.getElementById('stat-title').textContent=title;
  buildFinials();
  sUpdate();
}

// ── FINIALS ───────────────────────────────────────────────────────
function buildFinials(){
  var list=SS.collection==='ironworks'?FINIALS_IW:(SS.diameter==='3/4'?FINIALS_BRASS_34:FINIALS_BRASS_1316);
  document.getElementById('finial-grid').innerHTML=list.map(function(f){
    return '<button class="opt-btn" onclick="selFinial(\''+f+'\',this)">'+f+'</button>';
  }).join('');
}

function buildBrassFinials(){
  document.getElementById('brass-finial-grid').innerHTML=FINIALS_BRASS_1316.map(function(f){
    return '<button class="opt-btn" onclick="selTravFinial(\''+f+'\',this)">'+f+'</button>';
  }).join('');
}

function selFinial(name,el){
  SS.finial=name;
  document.querySelectorAll('#finial-grid .opt-btn').forEach(function(b){b.classList.remove('sel');});
  el.classList.add('sel'); sUpdate();
}
function selTravFinial(name,el){
  SS.travFinial=name;
  document.querySelectorAll('#brass-finial-grid .opt-btn').forEach(function(b){b.classList.remove('sel');});
  el.classList.add('sel'); tBrassUpdate();
}

// ── BRACKET ───────────────────────────────────────────────────────
function selBracket(el,gridId,name){
  if(gridId==='stat-bracket-grid') SS.bracket=name;
  else SS.brassBracket=name;
  document.querySelectorAll('#'+gridId+' .opt-btn').forEach(function(c){c.classList.remove('sel');});
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
    inp.style.borderColor='var(--gold)';
  } else if(est){
    est.textContent='';
    inp.style.borderColor='#d8d8d4';
  }
  sUpdate();
}

// ── STATIONARY SUMMARY ────────────────────────────────────────────
function getStatSummary(){
  var shape=getOpt('grp-stat-shape');
  var config=getOpt('grp-stat-config');
  var ring=getOpt('grp-ring-type');
  var ringQtyInp=document.getElementById('ring-qty-input');
  var ringQtyVal=ringQtyInp?parseInt(ringQtyInp.value)||0:0;
  var ringQty=ringQtyVal>0?(ringQtyVal+' rings total (est. 5 per 15")'):'';
  var baton=getOpt('grp-stat-baton');
  var accs=SS.accList.length?SS.accList.join(', '):'None';
  return [
    {k:'Collection',v:SS.collection==='ironworks'?'Select Iron Works':'Select Metal Brass'},
    {k:'Finish',v:SS.finish||'—'},
    {k:'Diameter',v:SS.diameter?SS.diameter+'"':'—'},
    {k:'Window shape',v:shape||'—'},
    {k:'Rod configuration',v:config||'—'},
    {k:'Finial',v:SS.finial||'— (not selected)'},
    {k:'Ring type',v:ring||'—'},
    {k:'Rings',v:ringQty||'—'},
    {k:'Bracket style',v:SS.bracket},
    {k:'Baton',v:baton||'—'},
    {k:'Accessories',v:accs},
  ];
}
function sUpdate(){updateSummary();}

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
  var w=selWidth();
  var draw=getOpt('grp-brass-draw');
  var pleat=getOpt('grp-brass-pleat');
  var ripple=getOpt('grp-brass-ripple');
  var op=getOpt('grp-brass-op');
  var config=getOpt('grp-brass-config');
  var bracket=SS.brassBracket;
  var cord=getOpt('grp-brass-cord');
  var brCount=w?calcBrassBrackets(w):'—';
  var brNote=document.getElementById('brass-bracket-note');
  if(brNote){brNote.style.display=w?'block':'none';if(w)brNote.textContent=w+'" track requires '+brCount+' bracket(s). (Up to 57"=2, 58"–85"=3, 86"–113"=4, 114"–140"=5, 141"–168"=6, 169"–192"=7)';}
  // Cord drop only applies to cord draw
  var cw=document.getElementById('brass-cord-wrap');
  if(cw) cw.style.display=op.indexOf('Cord')!==-1?'':'none';
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
    {k:'Finial / End cap',v:SS.travFinial||'— (not selected)'},
  ];
}
function tBrassUpdate(){updateSummary();}

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
  var w=selWidth();
  var design=SS.cortDesign||'sintra';
  var face=design==='coimbra'?(' · '+(getOpt('grp-coimbra-face')||'Flat face')):'';
  var config=getOpt('grp-cort-config');
  var draw=getOpt('grp-cort-draw');
  var pleat=getOpt('grp-cort-pleat');
  var ripple=getOpt('grp-cort-ripple');
  var op=getOpt('grp-cort-op');
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
    {k:'Brackets needed',v:brCount!=='—'?brCount+' (included)':'—'},
  ];
}
function cUpdate(){updateSummary();}

function calcCortinaBrackets(w){
  if(w<=60)return 2;if(w<=90)return 3;if(w<=120)return 4;
  if(w<=150)return 5;if(w<=180)return 6;if(w<=210)return 7;return 8;
}

// ── SUMMARY RENDER ────────────────────────────────────────────────
function renderSummary(lines){
  var el=document.getElementById('summary-lines');
  if(!el)return;
  // bracket notes for the other traverse system are stale once the collection changes
  if(!(SS.collection==='brass'&&SS.system==='traverse')){var b=document.getElementById('brass-bracket-note');if(b)b.style.display='none';}
  if(SS.collection!=='cortina'){var c=document.getElementById('cort-bracket-note');if(c)c.style.display='none';}
  el.innerHTML=lines.map(function(l){
    return '<div class="summary-row"><span class="sr-key">'+l.k+'</span><span class="sr-val">'+l.v+'</span></div>';
  }).join('');
}

function getSummaryText(){
  var lines=[];
  document.querySelectorAll('#summary-lines .summary-row').forEach(function(d){
    var spans=d.querySelectorAll('span');
    if(spans.length>=2)lines.push(spans[0].textContent+': '+spans[1].textContent);
  });
  return lines.join('\n');
}
// Kept for any legacy caller.
function revealQuote(){ updateSummary(); }

// ── SUBMIT ────────────────────────────────────────────────────────
function addSelectToCart(){
  if(!SS.system){ alert('Please select a hardware system before adding to cart.'); return; }

  var summaryLines=[{k:'Size',v:selWidth()?selWidth()+'" wide':'—'},{k:'Mount',v:currentMount()||'—'},{k:'Quantity',v:selQty()+' rod(s)'}].concat(getCurrentSummaryLines());
  var lines=[{label:'Product',value:'Select Drapery Hardware'}].concat(
    summaryLines.filter(function(l){return l&&(l.k||l.label);}).map(function(l){return {label:l.k||l.label,value:String(l.v||l.value||'')};})
  );
  var specs=lines.map(function(l){return l.label+': '+l.value;}).join(' | ');
  pbAddToCart({product:'Select Drapery Hardware',lines:lines,specs:specs,price:null,qty:1});
  pbOpenCart();
}

function submitSelect(){
  var name=document.getElementById('cf-name').value.trim();
  var phone=document.getElementById('cf-phone').value.trim();
  var errEl=document.getElementById('cf-contact-err');
  if(errEl)errEl.style.display='none';
  if(!name||!phone){
    if(errEl){errEl.textContent='Please enter your name and phone number.';errEl.style.display='block';}
    else{alert('Please enter your name and phone number.');}
    return;
  }
  updateSummary();
  var delivery=pbDeliveryLabel();
  var spec=getSummaryText();
  var title=SS.collection==='wood'?'SELECT WOOD HARDWARE QUOTE REQUEST':'SELECT HARDWARE QUOTE REQUEST';
  var body=title+'\n\n'
    +'Name: '+name+'\nPhone: '+phone
    +'\nEmail: '+(document.getElementById('cf-email').value.trim()||'—')+'\n\n'
    +'SPECIFICATION:\n'+spec+'\n\n'
    +'Delivery: '+delivery+'\n\n'
    +'Notes:\n'+(document.getElementById('cf-notes').value.trim()||'None');
  window.location.href='mailto:justin@blindznation.com'
    +'?subject='+encodeURIComponent('Blindznation — ' + 'Select Hardware Quote — '+(SS.collection||'')+(SS.finish||SS.woodFinish?' · '+(SS.finish||SS.woodFinish):'')+' — '+name)
    +'&body='+encodeURIComponent('BLINDZNATION\n\n' + body);
  document.getElementById('sel-form').style.display='none';
  document.getElementById('sel-success').style.display='block';
}

// ── INIT (called after the shared delivery/contact steps are rendered) ──
function initSelect(){ refreshSteps(); }
