// =========================
// Smooth Scrolling for Anchor Links
// =========================
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

// =========================
// Hamburger Menu Toggle for Mobile Navigation
// =========================
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger-menu');
    const slideMenu = document.getElementById('slide-menu');
    const navOverlay = document.getElementById('nav-overlay');
    const closeMenu = document.getElementById('close-menu');

    // Show or hide the close (X) button
    function showCloseMenu(show) {
        if (closeMenu) {
            closeMenu.style.display = show ? 'block' : 'none';
        }
    }

    // Open the slide-in menu and overlay
    function openMenu() {
        slideMenu.classList.add('open');
        navOverlay.classList.add('active');
        showCloseMenu(true);
        // Ensure overlay is on top and clickable
        navOverlay.style.pointerEvents = 'auto';
    }

    // Close the slide-in menu and overlay
    function closeMenuFunc() {
        slideMenu.classList.remove('open');
        navOverlay.classList.remove('active');
        showCloseMenu(false);
        navOverlay.style.pointerEvents = 'none';
    }

    // Set up event listeners for menu open/close
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