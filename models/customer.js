const mongoose = require('mongoose');
const Joi = require('@hapi/joi');

//Collection and schema
const Customer =  mongoose.model('Customers', new mongoose.Schema({
    isGold: {
        type:Boolean,
        default:false
    },
    name: {
        required:true,
        type: String,
        minlength:2,
        maxlength:50
    },
    phone: {
        required:true,
        type:String,
        minlength:10,
        maxlength:10
    }
}));

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string()
        .min(2)
        .max(50)
        .required(),
        phone: Joi.string()
        .min(10)
        .max(10)
        .required()
    });

    return schema.validate(customer);
}

module.exports.Customer = Customer;
module.exports.validate = validateCustomer;