// =========================
// Wait for DOM to be fully loaded
// =========================
document.addEventListener('DOMContentLoaded', function() {
    // =========================
    // Carousel Element and State Variables
    // =========================
    const carousel = document.querySelector('.carousel');
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentSlide = 0;
    let autoplayInterval;

    // =========================
    // Function to update the active slide and dot
    // =========================
    function updateSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    // =========================
    // Function to go to next slide
    // =========================
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlide(currentSlide);
    }

    // =========================
    // Function to go to previous slide
    // =========================
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlide(currentSlide);
    }

    // =========================
    // Event listeners for navigation buttons
    // =========================
    nextButton.addEventListener('click', () => {
        nextSlide();
        resetAutoplay();
    });
    prevButton.addEventListener('click', () => {
        prevSlide();
        resetAutoplay();
    });

    // =========================
    // Event listeners for dots (slide indicators)
    // =========================
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlide(index);
            resetAutoplay();
        });
    });

    // =========================
    // Autoplay functionality
    // =========================
    function startAutoplay() {
        autoplayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }
    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    // Start autoplay on load
    startAutoplay();

    // =========================
    // Pause autoplay when hovering over carousel
    // =========================
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    // =========================
    // Resume autoplay when mouse leaves carousel
    // =========================
    carousel.addEventListener('mouseleave', () => {
        startAutoplay();
    });

    // =========================
    // Touch support for mobile devices (swipe left/right)
    // =========================
    let touchStartX = 0;
    let touchEndX = 0;
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });
    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    // =========================
    // Handle swipe gestures for carousel navigation
    // =========================
    function handleSwipe() {
        const swipeThreshold = 50; // minimum distance for swipe
        const difference = touchStartX - touchEndX;

        if (Math.abs(difference) > swipeThreshold) {
            if (difference > 0) {
                // Swipe left
                nextSlide();
            } else {
                // Swipe right
                prevSlide();
            }
            resetAutoplay();
        }
    }
}); 


// Custom carousel functionality
document.addEventListener('DOMContentLoaded', function() {
  const imgs = document.querySelectorAll('.carousel-3d-img');
  const prevBtn = document.querySelector('.carousel-3d-btn.prev-btn');
  const nextBtn = document.querySelector('.carousel-3d-btn.next-btn');
  let idx = 0;

  function updateCarousel3D() {
    imgs.forEach((img, i) => {
      img.classList.remove('active', 'left', 'right');
      img.style.display = 'block';
    });

    const total = imgs.length;
    imgs[idx].classList.add('active');

    // Only show left/right on desktop
    if (window.innerWidth > 700) {
      const leftIdx = (idx - 1 + total) % total;
      const rightIdx = (idx + 1) % total;
      imgs[leftIdx].classList.add('left');
      imgs[rightIdx].classList.add('right');
    }
  }

  prevBtn.addEventListener('click', () => {
    idx = (idx - 1 + imgs.length) % imgs.length;
    updateCarousel3D();
  });
  nextBtn.addEventListener('click', () => {
    idx = (idx + 1) % imgs.length;
    updateCarousel3D();
  });
  window.addEventListener('resize', updateCarousel3D);

  updateCarousel3D();
});