const express = require('express');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3001;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'aubfest_secret_key', // Change this for production
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 }
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
    const { username, password } = req.body;
    if (username === 'AubFestAdmin' && password === 'AubFestTesting2025') {
        req.session.loggedIn = true;
        return res.redirect('/');
    } else {
        return res.render('pages/login', { error: 'Invalid username or password.' });
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/login');
    });
});

// Protect all routes except /login and static assets
app.use((req, res, next) => {
    if (
        req.path === '/login' ||
        req.path === '/logout' ||
        req.path.startsWith('/styles') ||
        req.path.startsWith('/images') ||
        req.path.startsWith('/scripts') ||
        req.path.startsWith('/favicon') ||
        req.path.startsWith('/public')
    ) {
        return next();
    }
    return requireLogin(req, res, next);
});

// Routes
app.get('/', (req, res) => {
    res.render('pages/index', {
        title: 'Home - Aubfest Music Festival',
        page: 'home'
    });
});

app.get('/lineup', (req, res) => {
    res.render('pages/lineup', {
        title: 'Lineup - Aubfest Music Festival',
        page: 'lineup'
    });
});

app.get('/tickets', (req, res) => {
    res.render('pages/tickets', {
        title: 'Tickets - Aubfest Music Festival',
        page: 'tickets'
    });
});

app.get('/info', (req, res) => {
    res.render('pages/info', {
        title: 'Info - Aubfest Music Festival',
        page: 'info'
    });
});

app.get('/involved', (req, res) => {
    res.render('pages/involved', {
        title: 'Get Involved - Aubfest Music Festival',
        page: 'involved'
    });
});

app.get('/about', (req, res) => {
    res.render('pages/about', {title: 'About AubFest - Aubfest Music Festival',  page: 'about' });
});

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});