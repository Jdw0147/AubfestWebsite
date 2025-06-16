const express = require('express');
const path = require('path');
const app = express();
const port = 3001;

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

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

// Start server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
}); 