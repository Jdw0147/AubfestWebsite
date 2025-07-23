// =========================
// Scroll to Section on Page Load (from About Page)
// =========================
document.addEventListener("DOMContentLoaded", function() {
  // Check for scroll target in sessionStorage and scroll to section if needed
  if (sessionStorage.getItem('scrollToVolunteer')) {
    sessionStorage.removeItem('scrollToVolunteer');
    const el = document.querySelector('#volunteer');
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }
  if (sessionStorage.getItem('scrollToFoodVendor')) {
    sessionStorage.removeItem('scrollToFoodVendor');
    const el = document.querySelector('#food-vendor');
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }
  if (sessionStorage.getItem('scrollToPhotographer')) {
    sessionStorage.removeItem('scrollToPhotographer');
    const el = document.querySelector('#photographer');
    if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  }
if (sessionStorage.getItem('scrollToPerformer')) {
  sessionStorage.removeItem('scrollToPerformer');
  const el = document.querySelector('#performer');
  if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 400);
}
});