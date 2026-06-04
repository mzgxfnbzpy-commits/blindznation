renderNav('Custom upholstery'); renderFooter(false);

// ── Gallery data ──────────────────────────────────────────────
var closetImgs = [
  {src:'../images/upholstery/IMG_2166.JPEG',  label:'Closet — floral fabric panels overview'},
  {src:'../images/upholstery/IMG_2166-1.JPEG',label:'Closet — panel detail'},
  {src:'../images/upholstery/IMG_2166-2.JPEG',label:'Closet — panel detail 2'},
  {src:'../images/upholstery/IMG_2167.JPEG',  label:'Closet — corridor view'},
  {src:'../images/upholstery/IMG_2167-1.JPEG',label:'Closet — corridor detail'},
  {src:'../images/upholstery/IMG_2168.JPEG',  label:'Closet — full wall panel'},
  {src:'../images/upholstery/IMG_2168-1.JPEG',label:'Closet — panel close-up'},
  {src:'../images/upholstery/IMG_2169.JPEG',  label:'Closet — hallway perspective'},
  {src:'../images/upholstery/IMG_2169-1.JPEG',label:'Closet — hallway 2'},
  {src:'../images/upholstery/IMG_2170.JPEG',  label:'Closet — dressing area'},
  {src:'../images/upholstery/IMG_2170-1.JPEG',label:'Closet — dressing area 2'},
  {src:'../images/upholstery/IMG_2171.JPEG',  label:'Closet — sconce &amp; panel detail'},
  {src:'../images/upholstery/IMG_2172.JPEG',  label:'Closet — full width view'},
  {src:'../images/upholstery/IMG_2172-1.JPEG',label:'Closet — full width 2'},
  {src:'../images/upholstery/IMG_2173.JPEG',  label:'Closet — panel between cabinetry'},
  {src:'../images/upholstery/IMG_2173-1.JPEG',label:'Closet — panel between cabinetry 2'},
  {src:'../images/upholstery/IMG_2174.JPEG',  label:'Closet — room overview'},
  {src:'../images/upholstery/IMG_2174-1.JPEG',label:'Closet — room overview 2'},
  {src:'../images/upholstery/IMG_2175.JPEG',  label:'Closet — accent wall'},
  {src:'../images/upholstery/IMG_2175-1.JPEG',label:'Closet — accent wall 2'},
  {src:'../images/upholstery/IMG_2176.JPEG',  label:'Closet — finished installation'},
  {src:'../images/upholstery/IMG_2176-1.JPEG',label:'Closet — finished installation 2'},
  {src:'../images/upholstery/IMG_2178.JPEG',  label:'Closet — final overview'},
  {src:'../images/upholstery/CUSTOM WALL UPHOLSTERY.JPEG', label:'Custom wall upholstery installation'},
  {src:'../images/upholstery/WALL UPHOLSTERY 3.JPG',       label:'Wall upholstery — fabric panel detail'},
  {src:'../images/upholstery/IMG_5580.JPEG',               label:'Wall upholstery installation'},
  {src:'../images/upholstery/IMG_5581.JPEG',               label:'Wall upholstery installation'},
  {src:'../images/upholstery/IMG_5582.JPEG',               label:'Wall upholstery installation'},
  {src:'../images/upholstery/IMG_5583.JPEG',               label:'Wall upholstery installation'},
  {src:'../images/upholstery/IMG_5584.JPEG',               label:'Wall upholstery installation'},
  {src:'../images/upholstery/IMG_5585.JPEG',               label:'Wall upholstery installation'},
  {src:'../images/upholstery/IMG_5586.JPEG',               label:'Wall upholstery installation'},
  {src:'../images/upholstery/IMG_5587.JPEG',               label:'Wall upholstery installation'},
  {src:'../images/upholstery/IMG_5588.JPEG',               label:'Wall upholstery installation'},
  {src:'../images/upholstery/IMG_5589.JPEG',               label:'Wall upholstery installation'},
  {src:'../images/upholstery/IMG_5590.JPEG',               label:'Wall upholstery installation'},
  {src:'../images/upholstery/IMG_5591.JPEG',               label:'Wall upholstery installation'}
];
var theaterImgs = [
  {src:'../images/upholstery/IMG_2161.JPEG',  label:'Home theater — acoustic fabric walls'},
  {src:'../images/upholstery/IMG_2162.JPEG',  label:'Home theater — damask feature panel'},
  {src:'../images/upholstery/IMG_2163.JPEG',  label:'Home theater — entry feature wall'},
  {src:'../images/upholstery/IMG_2164.JPEG',  label:'Home theater — entry wall 2'},
  {src:'../images/upholstery/IMG_2165.JPEG',  label:'Home theater — velvet acoustic panels'},
  {src:'../images/upholstery/IMG_2165-1.JPEG',label:'Home theater — seating view'},
  {src:'../images/upholstery/IMG_2165-2.JPEG',label:'Home theater — full room view'}
];
var softImgs = [
  {src:'../images/upholstery/HEADBOARD UPHOLSTERY.JPG',              label:'Custom upholstered headboard'},
  {src:'../images/upholstery/HEADBOARD AND FOOT BOARD UPHOLSTERY.JPEG', label:'Headboard &amp; footboard set'},
  {src:'../images/upholstery/custom cushion upholstery.JPEG',        label:'Custom cushion upholstery'},
  {src:'../images/upholstery/UPHOLSTERY BENCH.JPEG',                 label:'Upholstered bench'},
  {src:'../images/upholstery/CUSTOM UPHOLSERY 2.JPEG',               label:'Custom furniture upholstery'},
  {src:'../images/upholstery/UPHOLSTERY 3.JPEG',                     label:'Custom upholstery project'},
  {src:'../images/upholstery/UPHOLSTERY 4.JPEG',                     label:'Custom upholstery project'},
  {src:'../images/upholstery/UPHOLSTERY 5.JPEG',                     label:'Custom cushions &amp; pillows'},
  {src:'../images/upholstery/UPHOLSTERY 6.JPEG',                     label:'Custom furniture upholstery'},
  {src:'../images/upholstery/UPHOLSTERY.JPEG',                       label:'Custom upholstery'},
  {src:'../images/upholstery/specialty-shade-sails.JPEG',            label:'Specialty — custom shade sails &amp; outdoor treatments'}
];
var allImgs = theaterImgs.concat(closetImgs).concat(softImgs);

// Current lightbox state
var lbImages = [];
var lbIndex  = 0;

function buildGrid(containerId, imgs) {
  var el = document.getElementById(containerId);
  if (!el) return;
  var html = '';
  imgs.forEach(function(img, i) {
    html += '<div class="gitem" onclick="lbOpen(' + JSON.stringify(imgs) + ',' + i + ')">'
          + '<img src="' + img.src + '" alt="' + img.label + '" loading="lazy">'
          + '<div class="gitem-overlay"><div class="gitem-label">' + img.label + '</div></div>'
          + '</div>';
  });
  el.innerHTML = html;
}

buildGrid('grid-all',    allImgs);
buildGrid('grid-closet', closetImgs);
buildGrid('grid-theater',theaterImgs);
buildGrid('grid-soft',   softImgs);

function showGallery(id, btn) {
  document.querySelectorAll('.gallery-panel').forEach(function(p){p.classList.remove('active')});
  document.querySelectorAll('.gtab').forEach(function(b){b.classList.remove('active')});
  document.getElementById('gpanel-' + id).classList.add('active');
  btn.classList.add('active');
}

function lbOpen(imgs, idx) {
  lbImages = imgs;
  lbIndex  = idx;
  lbShow();
  document.getElementById('lb-overlay').classList.add('open');
}
function lbShow() {
  document.getElementById('lb-img').src = lbImages[lbIndex].src;
  document.getElementById('lb-counter').textContent = (lbIndex + 1) + ' / ' + lbImages.length;
}
function lbNav(dir) {
  lbIndex = (lbIndex + dir + lbImages.length) % lbImages.length;
  lbShow();
}
function lbClose(e) {
  if (!e || e.target === document.getElementById('lb-overlay') || e.currentTarget === document.querySelector('.lb-close')) {
    document.getElementById('lb-overlay').classList.remove('open');
  }
}
document.addEventListener('keydown', function(e) {
  var lb = document.getElementById('lb-overlay');
  if (!lb.classList.contains('open')) return;
  if (e.key === 'ArrowRight') lbNav(1);
  if (e.key === 'ArrowLeft')  lbNav(-1);
  if (e.key === 'Escape')     lb.classList.remove('open');
});

// ── Quote form ─────────────────────────────────────────────────
function submitUpholstery() {
  var name  = document.getElementById('u-name').value.trim();
  var phone = document.getElementById('u-phone').value.trim();
  if (!name || !phone) { alert('Please enter your name and phone number.'); return; }
  var email   = document.getElementById('u-email').value.trim();
  var address = document.getElementById('u-address').value.trim();
  var type    = document.getElementById('u-type').value;
  var area    = document.getElementById('u-area').value;
  var fabric  = document.getElementById('u-fabric').value;
  var notes   = document.getElementById('u-notes').value.trim();

  var delivery = getOpt('grp-del-uph');
  var body = 'WALL UPHOLSTERY QUOTE REQUEST\n\n'
    + 'Name: ' + name + '\nPhone: ' + phone + '\nEmail: ' + (email || '—') + '\n'
    + 'Address: ' + (address || '—') + '\n\n'
    + 'Application type: ' + type + '\n'
    + 'Approximate area: ' + area + '\n'
    + 'Fabric: ' + fabric + '\n'
    + 'Delivery preference: ' + delivery + '\n\n'
    + 'Project details:\n' + (notes || 'None provided');

  window.location.href = 'mailto:justin@blindznation.com'
    + '?subject=' + encodeURIComponent('Wall Upholstery Quote — ' + name)
    + '&body=' + encodeURIComponent(body);

  document.getElementById('upholstery-form-card').style.display = 'none';
  document.getElementById('u-success').style.display = 'block';
}