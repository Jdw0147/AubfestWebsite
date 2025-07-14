(function() {
  if (!('ontouchstart' in window)) return;

  var links = document.querySelectorAll('.artist-card-link');
  var timeoutId = null;

  links.forEach(function(link) {
    link.addEventListener('touchend', function(e) {
      // If already revealed, allow navigation (for real links)
      if (link.classList.contains('tap-revealed')) {
        link.classList.remove('tap-revealed');
        if (timeoutId) clearTimeout(timeoutId);
        // Only follow link if it's not a placeholder
        if (!link.classList.contains('artist-card-placeholder')) {
          return;
        } else {
          // Prevent navigation for placeholders
          e.preventDefault();
          return;
        }
      }
      // Otherwise, show overlays and set timer
      e.preventDefault();
      links.forEach(function(l) { l.classList.remove('tap-revealed'); });
      link.classList.add('tap-revealed');
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(function() {
        link.classList.remove('tap-revealed');
      }, 4000); // 4 seconds
    }, {passive: false});

    // Hide overlays if user taps elsewhere
    document.body.addEventListener('touchstart', function(ev) {
      if (!link.contains(ev.target)) {
        link.classList.remove('tap-revealed');
        if (timeoutId) clearTimeout(timeoutId);
      }
    });
  });
})();