const Joi = require('@hapi/joi')
Joi.objectId = require('joi-objectid')(Joi);

const mongoose = require('mongoose');
const express = require('express');
const app = express();

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/vidly', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
    .then(() => console.log('Connected to MongoDb...'))
    .catch((err) => console.log(`Could not connect to MongoDb, report: ${err.message}`));

//Routes
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const movies = require('./routes/movies');
const rentals = require('./routes/rentals');
const users = require('./routes/users');
const auth = require('./routes/auth');

//Middleware
app.use(express.json());

app.use('/vidly/api/', home);
app.use('/vidly/api/genres', genres);
app.use('/vidly/api/customers', customers);
app.use('/vidly/api/movies', movies);
app.use('/vidly/api/rentals', rentals);
app.use('/vidly/api/users', users);
app.use('/vidly/api/auth', auth);




const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));