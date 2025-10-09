// =========================
// Flair Squares for Home Page Carousel
// =========================
document.addEventListener('DOMContentLoaded', function() {
    var leftStack = document.getElementById('carousel-flair-left');
    var rightStack = document.getElementById('carousel-flair-right');
    if (!leftStack || !rightStack) return;

    // Use the same image list as about-flair-stacks.js (update as needed)
    var lotteryImages = [
        'ellie-1.JPG','ellie-2.JPG','ellie-3.JPG','ellie-4.JPG','ellie-5.JPG','ellie-6.JPG','ellie-7.JPG',
        'hannah-1.JPG','hannah-2.JPG','hannah-3.JPG','hannah-4.JPG','hannah-5.JPG','hannah-6.JPG','hannah-7.JPG','hannah-8.JPG','hannah-9.JPG','hannah-10.JPG','hannah-11.JPG','hannah-12.JPG','hannah-13.JPG','hannah-14.JPG','hannah-15.JPG','hannah-16.JPG',
        'regis-1.JPG','regis-2.JPG','regis-3.JPG','regis-4.JPG','regis-5.JPG','regis-6.JPG','regis-7.JPG',
        'warren-1.jpg','warren-2.jpg','warren-3.jpg','warren-4.jpg','warren-5.jpg','warren-6.jpg','warren-7.jpg',
        'caroline-1.jpg','carrington-1.jpg','carrington-2.jpg','carrington-3.jpg','carrington-4.jpg','carrington-5.jpg','carrington-6.jpg','carrington-7.jpg','carrington-8.jpg','carrington-9.jpg','carrington-10.jpg','carrington-11.jpg','carrington-12.jpg','carrington-13.jpg','carrington-14.jpg',
        'nordista-1.JPG','nordista-2.JPG','nordista-3.JPG','nordista-4.JPG','nordista-5.JPG','nordista-6.JPG','nordista-7.JPG','nordista-8.JPG',
        'piper-1.jpeg','piper-2.jpeg','piper-3.jpeg','piper-4.jpeg','piper-5.jpeg',
        'trey-1.jpg','trey-2.jpg','trey-3.jpg','trey-4.jpg','trey-5.jpg','trey-6.jpg',
        'justin-1.jpg','justin-2.jpg','justin-3.jpg',
    ];
    function pickUniqueImages(n) {
        var arr = lotteryImages.slice();
        var result = [];
        for (var i = 0; i < n; i++) {
            if (arr.length === 0) arr = lotteryImages.slice();
            var idx = Math.floor(Math.random() * arr.length);
            result.push(arr[idx]);
            arr.splice(idx, 1);
        }
        return result;
    }
    function createFlairSquare(imgSrc) {
        var square = document.createElement('div');
        square.className = 'about-flair-square';
        var container = document.createElement('div');
        container.className = 'flair-img-container';
        var img = document.createElement('img');
        img.className = 'flair-img';
        img.src = '/images/lottery/' + imgSrc;
        img.alt = 'Aubfest flair';
        var overlay = document.createElement('div');
        overlay.className = 'flair-img-overlay';
        container.appendChild(img);
        container.appendChild(overlay);
        square.appendChild(container);
        return square;
    }
    // Pick 2 unique images for each side, no overlap
    var images = pickUniqueImages(4);
    for (var i = 0; i < 2; i++) {
        leftStack.appendChild(createFlairSquare(images[i]));
        rightStack.appendChild(createFlairSquare(images[i+2]));
    }
});
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