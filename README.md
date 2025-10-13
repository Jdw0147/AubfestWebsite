
# AubFest Website

AubFest Music Festival website project. This project is a web application for managing and displaying information about AubFest.  On this website users can get information on the upcoming festival, including but not limited to lineup, ways to get involved, and frequently asked questions.  The website itself includes information pages and an admin dashboard for managing images and content.  Soon-to-be implemented features include an AubFest calendar, and access to information regarding past AubFest lineups.

## Project Tools
This is a Node.js web application built with Express.js and EJS templates. Languages used include EJS for the main visual interfaces, CSS for styling, and JavaScript for server-side interactivity.


## Features
- **Information**: Pages include information on Lineup, Tickets, Getting Involved, About/FAQ, and a dedicated Photos page archiving photographs from previous festivals.
- **Image Library**: Dynamic image squares on the About page and home page, randomly selected from a shared image library. Images and their metadata are stored in a single JSON file, making updates easy and consistent.
- **Admin Dashboard**: Secure login for admins to manage aspects of the website live, including uploading images and editing content.
- **Session Management**: Admins stay logged in securely until they log out.

---

## How the Project Works: Pages & Communication

### Main Pages

- **Home (`/`)**: Landing page with preview of upcoming events and quick links to other sections of the website.
- **Lineup (`/lineup`)**: Displays the artists performing at the festival. Artist info is managed in EJS templates and can be updated by editing the relevant files.  Past lineups sub-page is a work in progress.
- **Tickets (`/tickets`)**: Information on ticket purchasing, prices, and entry policies.
- **About (`/about`)**: Festival background, policies, advice, general information, and FAQ.
- **Get Involved (`/involved`)**: Details on volunteering, performing, or vending at the festival. (This page will eventually have 2 tabs, one for getting involved during days of festival, one documenting AubFest related events in the future where people can get involved before the actual festival)
- **Photos (`/photos`)**: Gallery of past festival images via drive links to each photographer who submitted photos.
- **Admin Dashboard (`/admin`)**: Protected area for admins to manage content and images.
- **Admin Lottery (`/admin/lottery`)**: Admins can upload, edit, and remove images from the image library.

### How Pages Communicate

- **Frontend (Browser)**: Loads EJS-rendered HTML, CSS, and JavaScript. For dynamic features (like flair squares), the browser fetches data from backend API endpoints using JavaScript (fetch/AJAX).
- **Backend (Express.js)**: Handles all routing, serves static files, renders EJS templates, and provides API endpoints for dynamic data (like `/lottery/images`).
- **Data Storage**: The image library is stored in a JSON file (`public/images/lottery/lotteryImages.json`). Admin actions update this file, and public pages read from it.

#### Example: Flair Squares Flow
1. User visits the About page.
2. The page loads and runs a JavaScript script (`about-flair-stacks.js`).
3. The script fetches the image list from `/lottery/images` (a backend API endpoint).
4. The backend reads `lotteryImages.json` and returns the image list as JSON.
5. The script displays random images as flair squares on the page.

#### Example: Admin Image Upload Flow
1. Admin logs in at `/login` and is redirected to `/admin`.
2. Admin goes to `/admin/lottery` to manage images.
3. Admin uploads new images and enters photographer info.
4. The backend saves the images and updates `lotteryImages.json`.
5. The new images are immediately available for flair squares and other public features.

### Diagram: How Everything Connects

```
User Browser
   |         (requests page)
   v
Express.js Backend <----> lotteryImages.json (image data)
   |         (renders EJS, serves static files, provides API)
   v
HTML/CSS/JS (EJS templates, scripts)
```

---

## Page-by-Page Breakdown

| Page/Route         | Purpose & Features                                                                 | How it Communicates                |
|--------------------|-----------------------------------------------------------------------------------|------------------------------------|
| `/` (Home)         | Welcome, highlights, carousel, quick links                                        | Static EJS, some JS for carousel   |
| `/lineup`          | Artist lineup, links to artist info                                               | Static EJS, easy to update         |
| `/tickets`         | Ticket info, prices, entry rules                                                  | Static EJS                         |
| `/info`            | Festival policies, logistics                                                      | Static EJS                         |
| `/about`           | Festival background, FAQ, flair squares (random images)                           | JS fetches `/lottery/images`       |
| `/involved`        | Volunteer, vendor, performer info and forms                                       | Static EJS                         |
| `/photos`          | Gallery of past festival images                                                   | Static EJS, images in `/images/`   |
| `/admin`           | Admin dashboard (login required)                                                  | Protected EJS, session-based       |
| `/admin/lottery`   | Admin image management (upload, edit, delete flair images)                        | JS fetches/POSTs to backend APIs   |
| `/lottery/images`  | Public API endpoint for flair image list (JSON)                                   | Backend reads JSON, returns data   |

---

## How to Update Content

- **Text & Info**: Edit the relevant EJS files in `views/pages/`.
- **Images**: Use the admin dashboard to upload new flair images, or add to `public/images/lottery/` and update `lotteryImages.json`.
- **Artist Lineup**: Edit the lineup EJS file.

---

## How does it work?
- The backend is built with Express.js and serves both static files and dynamic pages using EJS templates.
- Images for the public images are stored in `public/images/lottery/` and tracked in `lotteryImages.json`.
- The About page fetches the image list from a public API endpoint and displays random images as 'flair squares'.
- Admins can log in to a protected dashboard to upload new images and update the image library.

## Project Structure
```
AubfestWebsite/
├── public/
│   ├── images/
│   │   └── lottery/           # Flair images and lotteryImages.json
│   ├── scripts/               # Frontend JavaScript
│   └── styles/                # CSS stylesheets
├── views/
│   ├── pages/                 # EJS page templates
│   └── partials/              # Shared EJS partials
├── server.js                  # Main Express server
├── package.json               # Project dependencies and scripts
└── README.md                  # This file
```

## How do I run it?
1. **Install Node.js**: Download and install Node.js from [nodejs.org](https://nodejs.org/).
2. **Install dependencies**:
   ```
   npm install
   ```
3. **Start the server**:
   ```
   node server.js
   ```
4. **Open your browser** and go to [http://localhost:3001](http://localhost:3001)

## Admin Login
- Go to `/login` on your local server.
- Enter the admin password (ask the project owner [David] for this).
- Once logged in, you can access `/admin` and `/admin/lottery` to manage images.

## How do I add new images?
- Log in as admin.
- Go to the "Edit Lottery" page.
- Upload new images and add photographer info.
- The image list updates automatically for all users.

## Where is the image list stored?
- All flair images and their metadata are stored in `public/images/lottery/lotteryImages.json`.
- This file is the single source of truth for the flair squares and admin dashboard.

## Who is this for?
- Festival organizers who want to manage their website and image library easily.
- Anyone interested in learning about web development with Node.js, Express, and EJS.

## Need help?
If you're new to programming or web development, start by reading through the code and this README. If you have questions, ask the project owner or search for tutorials on Node.js, Express, and EJS.

---

Enjoy building and managing the Aubfest website!


