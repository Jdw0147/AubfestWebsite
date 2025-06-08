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
    const closeMenu = document.getElementById('close-menu');

    function showCloseMenu(show) {
        if (closeMenu) {
            closeMenu.style.display = show ? 'block' : 'none';
        }
    }

    function openMenu() {
        slideMenu.classList.add('open');
        navOverlay.classList.add('active');
        showCloseMenu(true);
        // Ensure overlay is on top and clickable
        navOverlay.style.pointerEvents = 'auto';
    }
    function closeMenuFunc() {
        slideMenu.classList.remove('open');
        navOverlay.classList.remove('active');
        showCloseMenu(false);
        navOverlay.style.pointerEvents = 'none';
    }

    if (hamburger && slideMenu && navOverlay) {
        hamburger.addEventListener('click', openMenu);
        navOverlay.addEventListener('click', closeMenuFunc);
        if (closeMenu) {
            closeMenu.addEventListener('click', closeMenuFunc);
        }
        // Optional: close menu on link click (mobile UX)
        slideMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenuFunc);
        });
    }
    // Hide closeMenu by default on load
    showCloseMenu(false);
    navOverlay.style.pointerEvents = 'none';
});