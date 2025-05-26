// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const slideMenu = document.getElementById('slide-menu');
    const navOverlay = document.getElementById('nav-overlay');

    if (hamburger && slideMenu && navOverlay) {
        hamburger.addEventListener('click', function() {
            slideMenu.classList.toggle('open');
            navOverlay.classList.toggle('active');
        });
        navOverlay.addEventListener('click', function() {
            slideMenu.classList.remove('open');
            navOverlay.classList.remove('active');
        });
        // Optional: close menu on link click (mobile UX)
        slideMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                slideMenu.classList.remove('open');
                navOverlay.classList.remove('active');
            });
        });
    }
});