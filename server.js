const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');
require('./auth');
const util = require('./utilities/util')
const passport = require('passport')
const session = require('express-session')

const mongodb = require('./data/database');
const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.PORT || 3000;

app.use(session({ secret: 'kovekk', resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/', require('./routes'));

app.get('/auth/google',
    passport.authenticate('google', { scope: ['email', 'profile'] })
)

app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/api-docs',
        failureRedirect: '/auth/failure'
    })
)

app.get('/auth/failure', (req, res) => {
    next(createError(401, 'Authentication failed.'))
})

app.get('/logout', (req, res) => {
    req.logout(function (err) {
        if (err) {return next(err);}
    });
    res.send('Logged out');
})

app.use((req, res, next) => {
    next(createError(404, 'Not found'))
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message
        }
    });
});

mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {console.log(`Database is listening and node is running on port ${port}`)});
    }
});