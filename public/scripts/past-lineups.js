
document.addEventListener("DOMContentLoaded", function() {
const gallery = document.querySelector('.past-lineups-gallery');
  if (gallery) {
    gallery.addEventListener('wheel', function(e) {
      if (e.deltaY !== 0) {
        e.preventDefault();
        gallery.scrollLeft += e.deltaY;
      }
    }, { passive: false });
  }
});