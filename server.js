const express = require('express');
const path = require('path');
const session = require('express-session');

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

// Upload route for admin lottery images
app.post('/admin/lottery/upload', requireLogin, upload.array('images'), (req, res) => {
    // Debug: log session info
    console.log('SESSION:', req.session);
    // req.files: [{ filename, originalname, ... }]
    // req.body.photographers: array of photographer names (same order as files)
    const files = req.files;
    let photographers = req.body.photographers;
    if (!Array.isArray(photographers)) {
        photographers = photographers ? [photographers] : [];
    }
    // Save metadata if needed (for now, just respond)
    res.json({ success: true, files: files.map((f, i) => ({ filename: f.filename, photographer: photographers[i] || '' })) });
});
app.use(session({
    secret: 'aubfest_secret_key', // Change this for production
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 24 * 60 * 60 * 1000,
        sameSite: 'lax',
        secure: false // must be false for http
    }
}));


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