const winston = require('winston');
const mongoose = require('mongoose');

module.exports = function () {
    //MongoDB connection
    mongoose.connect('mongodb://localhost:27017/vidly', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
        .then(() => winston.info('Connected to MongoDb...'))
    //.catch((err) => console.log(`Could not connect to MongoDb, report: ${err.message}`));
}