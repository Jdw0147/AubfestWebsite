const express = require('express');
const path = require('path');

const session = require('express-session');
const SQLiteStore = require('connect-sqlite3')(session);

const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3001;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Move session middleware here (before any routes or multer)
app.use(session({
    store: new SQLiteStore({ db: 'sessions.sqlite', dir: './db' }),
    secret: 'aubfest_secret_key', // Change this for production
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax',
        secure: false // must be false for http unless using https
    }
}));

// Multer setup for image uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public', 'images', 'lottery'));
    },
    filename: function (req, file, cb) {
        // Use original filename
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// GET endpoint to fetch the current image library
app.get('/admin/lottery/images', requireLogin, (req, res) => {
    const jsonPath = path.join(__dirname, 'public', 'images', 'lottery', 'lotteryImages.json');
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false, error: 'Could not read image library.' });
        let images = [];
        try {
            images = JSON.parse(data);
        } catch (e) {}
        res.json({ success: true, images });
    });
});

// Upload route for admin lottery images
app.post('/admin/lottery/upload', requireLogin, upload.array('images'), (req, res) => {
    const files = req.files;
    let photographers = req.body.photographers;
    if (!Array.isArray(photographers)) {
        photographers = photographers ? [photographers] : [];
    }
    const jsonPath = path.join(__dirname, 'public', 'images', 'lottery', 'lotteryImages.json');
    // Read current list
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        let images = [];
        if (!err && data) {
            try { images = JSON.parse(data); } catch (e) {}
        }
        // Add new images
        files.forEach((f, i) => {
            images.push({ filename: f.filename, photographer: photographers[i] || '' });
        });
        // Write back
        fs.writeFile(jsonPath, JSON.stringify(images, null, 2), (err2) => {
            if (err2) return res.status(500).json({ success: false, error: 'Could not update image library.' });
            res.json({ success: true, files: files.map((f, i) => ({ filename: f.filename, photographer: photographers[i] || '' })) });
        });
    });
});

// Edit route for admin lottery images (photographer only)
app.post('/admin/lottery/edit', requireLogin, (req, res) => {
    const { filename, photographer } = req.body;
    if (!filename) return res.status(400).json({ success: false, error: 'No filename provided.' });
    const jsonPath = path.join(__dirname, 'public', 'images', 'lottery', 'lotteryImages.json');
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        let images = [];
        if (!err && data) {
            try { images = JSON.parse(data); } catch (e) {}
        }
        let found = false;
        images = images.map(img => {
            if (img.filename === filename) {
                found = true;
                return { ...img, photographer: photographer || '' };
            }
            return img;
        });
        if (!found) return res.status(404).json({ success: false, error: 'Image not found.' });
        fs.writeFile(jsonPath, JSON.stringify(images, null, 2), (err2) => {
            if (err2) return res.status(500).json({ success: false, error: 'Could not update image library.' });
            res.json({ success: true });
        });
    });
});

// Delete route for admin lottery images
app.post('/admin/lottery/delete', requireLogin, (req, res) => {
    const { filename } = req.body;
    if (!filename) return res.status(400).json({ success: false, error: 'No filename provided.' });
    const jsonPath = path.join(__dirname, 'public', 'images', 'lottery', 'lotteryImages.json');
    const imgPath = path.join(__dirname, 'public', 'images', 'lottery', filename);
    // Read current list
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        let images = [];
        if (!err && data) {
            try { images = JSON.parse(data); } catch (e) {}
        }
        // Remove image from array
        const newImages = images.filter(img => img.filename !== filename);
        // Write back
        fs.writeFile(jsonPath, JSON.stringify(newImages, null, 2), (err2) => {
            if (err2) return res.status(500).json({ success: false, error: 'Could not update image library.' });
            // Delete file from disk
            fs.unlink(imgPath, (err3) => {
                if (err3 && err3.code !== 'ENOENT') {
                    // Only error if not file-not-found
                    return res.status(500).json({ success: false, error: 'Could not delete image file.' });
                }
                res.json({ success: true });
            });
        });
    });
});

function requireLogin(req, res, next) {
    if (req.session && req.session.loggedIn) {
        return next();
    } else {
        return res.redirect('/login');
    }
}

app.get('/login', (req, res) => {
    res.render('pages/login', { error: null });
});

app.post('/login', (req, res) => {
    const { password } = req.body;
    // Only check password, since login.ejs only asks for password
    if (password === 'AubFestTesting2025') {
        req.session.loggedIn = true;
        return res.redirect('/admin');
    } else {
        return res.render('pages/login', { error: 'Invalid password.' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
});


// Only protect /admin route (and future admin routes)
app.get('/admin', requireLogin, (req, res) => {
    res.render('pages/admin', { title: 'Admin Dashboard', page: 'admin', loggedIn: req.session.loggedIn });
});

// Admin lottery page (protected)
app.get('/admin/lottery', requireLogin, (req, res) => {
    res.render('pages/admin-lottery', { title: 'Edit Lottery', page: 'admin-lottery', loggedIn: req.session.loggedIn });
});

// Public endpoint for flair squares and other public uses
app.get('/lottery/images', (req, res) => {
    const jsonPath = path.join(__dirname, 'public', 'images', 'lottery', 'lotteryImages.json');
    fs.readFile(jsonPath, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ success: false, error: 'Could not read image library.' });
        let images = [];
        try {
            images = JSON.parse(data);
        } catch (e) {}
        res.json({ success: true, images });
    });
});

// Routes
app.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Home - Aubfest Music Festival',
        page: 'home',
        loggedIn: req.session && req.session.loggedIn
    });
});

app.get('/lineup', (req, res) => {
    res.render('pages/lineup', {
        title: 'Lineup - Aubfest Music Festival',
        page: 'lineup',
        loggedIn: req.session && req.session.loggedIn
    });
});

app.get('/tickets', (req, res) => {
    res.render('pages/tickets', {
        title: 'Tickets - Aubfest Music Festival',
        page: 'tickets',
        loggedIn: req.session && req.session.loggedIn
    });
});

app.get('/info', (req, res) => {
    res.render('pages/info', {
        title: 'Info - Aubfest Music Festival',
        page: 'info',
        loggedIn: req.session && req.session.loggedIn
    });
});

app.get('/involved', (req, res) => {
    res.render('pages/involved', {
        title: 'Get Involved - Aubfest Music Festival',
        page: 'involved',
        loggedIn: req.session && req.session.loggedIn
    });
});


app.get('/about', (req, res) => {
    res.render('pages/about', {title: 'About AubFest - Aubfest Music Festival',  page: 'about', loggedIn: req.session && req.session.loggedIn });
});

function stripThe(name) {
  return name.replace(/^The\s+/i, '').trim();
}
app.get('/lineups/fest7lineup', (req, res) => {
  const artists = JSON.parse(fs.readFileSync(path.join(__dirname, '/views/pages/lineups/artists.json')));
  const fest7Artists = artists
    .filter(artist => artist.festivals && artist.festivals.includes("7"))
    .sort((a, b) => a.name.localeCompare(stripThe(b.name)));
  res.render('pages/lineups/fest7lineup', { 
    title: 'AubFest VII Lineup - Aubfest Music Festival', 
    page: 'aubfest vii lineup', 
    loggedIn: req.session && req.session.loggedIn,
    artists: fest7Artists });
});

app.get('/past-lineups', (req, res) => {
  res.render('pages/past-lineups');
});

app.get('/photos', (req, res) => {
    res.render('pages/photos', {
        title: 'Photos - Aubfest Music Festival',
        page: 'photos',
        loggedIn: req.session && req.session.loggedIn
    });
});

// Pass loggedIn to all views
app.use((req, res, next) => {
    res.locals.loggedIn = req.session && req.session.loggedIn;
    next();
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});