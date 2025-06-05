# Aubfest Website Documentation

## Overview
This project is the official website for the Aubfest Music Festival. It is a Node.js/Express web application using EJS for templating, with static assets (CSS, JS, images) served from the `public` directory. The site is designed to be responsive and user-friendly, with a modern look and mobile-first navigation.

---

## Project Structure

```
AubfestWebsite/
├── public/
│   ├── images/           # Festival and logo images
│   ├── scripts/          # Client-side JavaScript (main.js, carousel.js)
│   └── styles/           # CSS files (main.css, home.css)
├── views/
│   ├── pages/            # Main page templates (index.ejs, etc.)
│   └── partials/         # Shared layout components (header.ejs, footer.ejs)
├── server.js             # Express server setup
├── package.json          # Project dependencies and scripts
└── index.html            # (Optional) Static entry point
```

---

## Key Files and Their Roles

### 1. `server.js`
- Sets up the Express server.
- Serves static files from the `public` directory.
- Renders EJS templates for each route (e.g., home, lineup, info, contact, tickets).

### 2. `views/`
- **`partials/header.ejs`**: Contains the navigation bar, logo, tickets button, and hamburger menu for mobile navigation. Included at the top of every page.
- **`partials/footer.ejs`**: Contains the footer with contact info, social links, and quick links. Included at the bottom of every page.
- **`pages/index.ejs`**: The homepage. Features a carousel of festival images, a logo overlay, and a welcome section. Uses the header and footer partials.

### 3. `public/styles/main.css`
- Main stylesheet for the site.
- Handles layout, colors, typography, and responsive design.
- Contains special rules for the navigation bar, hamburger menu, slide-in mobile menu, carousel, and footer.

### 4. `public/scripts/main.js`
- Handles the hamburger menu toggle for mobile navigation.
- Ensures the slide-in menu and overlay open/close correctly.
- May contain other site-wide JS behaviors.

### 5. `public/scripts/carousel.js`
- (If present) Handles the image carousel logic on the homepage.

### 6. `public/images/`
- Contains all images used on the site, including the logo and carousel images.

---

## Navigation & Layout

- **Header**: Contains the Aubfest logo (left on desktop, left of tickets button on mobile), a central Tickets button, and navigation links (Home, Lineup, Info, Contact).
    - On desktop: links are shown horizontally.
    - On mobile: links are hidden in a hamburger menu that slides in from the right, overlaying the header.
    - The Tickets button always remains visible and centered.
- **Footer**: Contains contact info, social media links, and quick links (FAQ, Terms, Privacy).

---

## Responsive Design
- Uses CSS media queries to adapt the layout for desktop and mobile.
- The hamburger menu and slide-in navigation are only visible on screens ≤900px wide.
- The slide-in menu overlays the logo and tickets button for a clean mobile experience.

---

## Carousel (Homepage)
- The homepage features a carousel of images with navigation buttons and dots.
- The carousel overlay can display a logo or other branding.
- The carousel is controlled by `carousel.js` (if present).

---

## Adding/Editing Content
- **Navigation Links**: Edit in `header.ejs`.
- **Carousel Images**: Add/remove `<div class="carousel-slide"><img ...></div>` in `index.ejs` and place images in `public/images/`.
- **Footer Links/Info**: Edit in `footer.ejs`.
- **Styles**: Edit or add to `public/styles/main.css`.
- **Scripts**: Add to `public/scripts/main.js` or create new files in `public/scripts/`.

---

## How Everything Works Together
- The Express server renders EJS templates for each route, injecting the correct page content and including the shared header and footer.
- Static assets (CSS, JS, images) are served from the `public` directory.
- The header and footer are reused across all pages for consistency.
- The navigation adapts to screen size, providing a modern, mobile-friendly experience.
- The homepage carousel provides a dynamic, engaging entry point for visitors.

---

## For New Developers
- Start the server (usually with `node server.js` or `npm start`).
- Edit EJS files in `views/` to change page content or layout.
- Edit CSS in `public/styles/` for design changes.
- Edit JS in `public/scripts/` for interactive features.
- Add images to `public/images/` as needed.
- Follow the structure and conventions in place for consistency and maintainability.

If you have any questions, check the comments in each file or ask the project maintainer.
