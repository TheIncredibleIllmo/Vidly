const express = require('express');
const error = require('../middleware/error');

const home = require('../routes/home');
const genres = require('../routes/genres');
const customers = require('../routes/customers');
const movies = require('../routes/movies');
const rentals = require('../routes/rentals');
const users = require('../routes/users');
const auth = require('../routes/auth');

module.exports = function (app) {
    app.use(express.json());
    app.use('/vidly/api/', home);
    app.use('/vidly/api/genres', genres);
    app.use('/vidly/api/customers', customers);
    app.use('/vidly/api/movies', movies);
    app.use('/vidly/api/rentals', rentals);
    app.use('/vidly/api/users', users);
    app.use('/vidly/api/auth', auth);
    app.use(error);
}