const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

const mongodb = require('./data/database');
const app = express();

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

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