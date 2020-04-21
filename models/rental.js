const mongoose = require('mongoose');
const Joi = require('@hapi/joi')
const customerSchema = require('../models/customer');
const movieSchema = require('../models/movie');

const Rental = mongoose.model('Rentals', new mongoose.Schema({
    outDate: { type: Date, default: Date.now, required: true },
    inDate: { type: Date },
    customer: { type: customerSchema, required: true },
    movie: { type: movieSchema, required: true },
    rentalFee: { type: Number, min: 0 }
}));

function validateRental(rental) {
    const schema = Joi.object({
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
        //dates and rental fee are calculated on the server
    });

    return schema.validate(rental);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;
