document.addEventListener("DOMContentLoaded", function() {
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