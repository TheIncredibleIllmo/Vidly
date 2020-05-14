const asyncMiddleware = require('../middleware/async')
const { Genre, validate } = require('../models/genre');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');

router.get('/:id', asyncMiddleware(async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    if (!genre) return res.status(400).send('Genre not found');
    res.send(genre);
}));

router.get('/', auth, async (req, res) => {
    throw new Error('Could not get the genres.');
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/', auth, asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });

    await genre.save(genre);
    res.send(genre);
}));

router.put('/:id', auth, asyncMiddleware(async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
        new: true
    });

    if (!genre) return res.status(400).send('Genre not found');
    res.send(genre);
}));

router.delete('/:id', [auth, admin], asyncMiddleware(async (req, res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if (!genre) return res.status(400).send('Genre not found');
    res.send(genre);
}));

module.exports = router;