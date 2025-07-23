// =========================
// Immediately Invoked Function Expression (IIFE) to scope variables
// =========================
(function() {

  // =========================
  // Exit if device does not support touch events (only run on touch devices)
  // =========================
  if (!('ontouchstart' in window)) return;

  // =========================
  // Select all artist card links and set up a timeout variable
  // =========================
  var links = document.querySelectorAll('.artist-card-link');
  var timeoutId = null;

  // =========================
  // Add touchend event listener to each artist card link
  // =========================
  links.forEach(function(link) {
    link.addEventListener('touchend', function(e) {
      // =========================
      // If card is already revealed, remove overlay and handle navigation
      // =========================
      if (link.classList.contains('tap-revealed')) {
        link.classList.remove('tap-revealed');
        if (timeoutId) clearTimeout(timeoutId);
        // Only follow link if it's not a placeholder
        if (!link.classList.contains('artist-card-placeholder')) {
          // Prevent default FIRST, then open link in a new tab
          e.preventDefault();
          window.open(link.href, '_blank');
        } else {
          // Prevent navigation for placeholders
          e.preventDefault();
        }
        return;
      }

      // =========================
      // First tap: show overlays and set timer to hide after 4 seconds
      // =========================
      e.preventDefault();
      links.forEach(function(l) { l.classList.remove('tap-revealed'); });
      link.classList.add('tap-revealed');
      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(function() {
        link.classList.remove('tap-revealed');
      }, 4000);
    }, {passive: false});

    // =========================
    // Hide overlay if user taps outside the card
    // =========================
    document.body.addEventListener('touchstart', function(ev) {
      if (!link.contains(ev.target)) {
        link.classList.remove('tap-revealed');
        if (timeoutId) clearTimeout(timeoutId);
      }
    });
  });
})();