/* Involved page Script
  Makes it to where when section is clicked at the
  top of the page, it scrolls down to that respective
  section. */


// Scroll Functionality
// Check for scroll target in sessionStorage and scroll to section if needed
document.addEventListener("DOMContentLoaded", function() {
  // Scroll to Volunteer Section
  if (sessionStorage.getItem('scrollToVolunteer')) {
    sessionStorage.removeItem('scrollToVolunteer');
    const el = document.querySelector('#volunteer');
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  // Scroll to Food Vendor Section
  if (sessionStorage.getItem('scrollToFoodVendor')) {
    sessionStorage.removeItem('scrollToFoodVendor');
    const el = document.querySelector('#food-vendor');
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  // Scroll to Photographer Section
  if (sessionStorage.getItem('scrollToPhotographer')) {
    sessionStorage.removeItem('scrollToPhotographer');
    const el = document.querySelector('#photographer');
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }

  // Scroll to Performer Section
if (sessionStorage.getItem('scrollToPerformer')) {
  sessionStorage.removeItem('scrollToPerformer');
  const el = document.querySelector('#performer');
  if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 400);
}
});