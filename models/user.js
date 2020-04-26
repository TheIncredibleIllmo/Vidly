const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//Collection and schema
const User = mongoose.model('Users', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    }
}));

function validateUser(user) {

    const schema = Joi.object({
        name: Joi.string().min(2).max(50).required(),
        email: Joi.string().min(5).max(255).email().required(),
        password: Joi.string().min(5).max(255).required()
    });

    return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;