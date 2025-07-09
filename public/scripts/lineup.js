(function() {
  if (!('ontouchstart' in window)) return;
  var links = document.querySelectorAll('.artist-card-link');
  links.forEach(function(link) {
    var revealed = false;
    link.addEventListener('touchend', function(e) {
      if (!revealed) {
        e.preventDefault();
        links.forEach(function(l) { l.classList.remove('tap-revealed'); });
        link.classList.add('tap-revealed');
        revealed = true;
        setTimeout(function() { revealed = false; }, 1200); // reset after 1.2s
      } else {
        // allow navigation
        link.classList.remove('tap-revealed');
        revealed = false;
      }
    }, {passive: false});
    document.body.addEventListener('touchstart', function(ev) {
      if (!link.contains(ev.target)) {
        link.classList.remove('tap-revealed');
        revealed = false;
      }
    });
  });
})();