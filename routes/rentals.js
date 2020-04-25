const { Rental, validate } = require('../models/rental');
const { Movie } = require('../models/movie');
const { Customer } = require('../models/customer');
const express = require('express');
const router = express.Router();
const Fawn = require('fawn');
const mongoose = require('mongoose');
Fawn.init(mongoose);

router.get('/', async (req, res) => {
    const rentals = await Rental.find().sort('-outDate');
    res.send(rentals);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid Movie');

    if (movie.numberInStock == 0) return res.status(400).send('Movie out of stock');

    const rental = new Rental({
        outDate: req.body.outDate,
        inDate: req.body.inDate,
        customer: {
            _id: customer._id,
            name: customer.name,
            phone: customer.phone
        },
        movie: {
            _id: movie._id,
            title: movie.title,
            dailyRentalRate: movie.dailyRentalRate
        }
    });

    //transactions (two face commits)
    try {
        new Fawn.Task()
            .save('rentals', rental)
            .update('movies', { _id: movie._id }, {
                $inc: { numberInStock: -1 }
            })
            .run();

        // rental = await rental.save(rental);
        // movie.numberInStock--;
        // movie.save();
        res.status(200).send(rental);
    }
    catch (ex) {
        res.status(500).send('Something failed');
    }
});

router.put('/:id', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const customer = await Customer.findById(req.body.customerId);
    if (!customer) return res.status(400).send('Invalid Customer');

    const movie = await Movie.findById(req.body.movieId);
    if (!movie) return res.status(400).send('Invalid Movie');

    let rental = await Rental.findByIdAndUpdate(req.params.id, {
        movie: movie,
        customer: customer
    }, { new: true });

    if (!rental) return res.status(400).send('Invalid Rental');

    res.send(rental);
    //var fawnTask = new Fawn.Task();
    // try {
    //     fawnTask.update('rentals',
    //         { _id: req.params.id },
    //         { outDate: req.body.outDate })
    //         .run()
    //         .then(function (results) {
    //             rental = results[0];
    //             res.send(rental);
    //         });
    // }
    // catch (ex) {
    //     res.status(500).send(ex.message);
    // }
});

module.exports = router;