// =========================
// Scroll to Volunteer Section Link Handler
// =========================
document.querySelectorAll('.go-to-volunteer').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Store the target in sessionStorage
    sessionStorage.setItem('scrollToVolunteer', 'true');
    // Navigate to /involved (no hash)
    window.location.href = '/involved';
  });
});

// =========================
// FAQ Accordion Toggle Handler
// =========================
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function() {
        this.classList.toggle('open');
        const answer = this.nextElementSibling;
        answer.classList.toggle('open');
    });
});

// =========================
// Scroll to Food Vendor Section Link Handler
// =========================
document.querySelectorAll('.go-to-food-vendor').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    sessionStorage.setItem('scrollToFoodVendor', 'true');
    window.location.href = '/involved';
  });
});

// =========================
// Scroll to Photographer Section Link Handler
// =========================
document.querySelectorAll('.go-to-photographer').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Store the target in sessionStorage for use on /involved page
    sessionStorage.setItem('scrollToPhotographer', 'true');
    window.location.href = '/involved';
  });
});

// =========================
// Scroll to Performer Section Link Handler
// =========================
document.querySelectorAll('.go-to-performer').forEach(link => {
  link.addEventListener('click', function(e) {
    e.preventDefault();
    // Store the target in sessionStorage for use on /involved page
    sessionStorage.setItem('scrollToPerformer', 'true');
    window.location.href = '/involved';
  });
});
