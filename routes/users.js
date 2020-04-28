const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const _ = require('lodash');
const hash = require('../helpers/hash');
const jwt = require('jsonwebtoken');
const config = require('config');


router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already registered.');

    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    user.password = await hash.hashPassword(user.password);

    await user.save();
    const token = jwt.sign({ _id: user._id }, config.get('jwtPrivateKey'));
    res.header('x-auth-token', token).send(_.pick(user, ['_id', 'name', 'email']));
});

module.exports = router;