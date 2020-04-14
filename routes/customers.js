const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
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

router.get('/',async (req,res)=>{
    const customers = await Customer.find().sort('name');
    res.send(customers);
});

router.get('/id',async (req,res)=>{
    const customer = await Customer.findById(req.params.id);
    if(!customer) return res.status(400).send('Customer not found.');
    res.send(customer);
});

router.post('/', async (req,res)=>{
    const {error} = validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = new Customer({
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    });

    customer = await customer.save();
    res.send(customer);
});

router.put('/id',async (req,res)=> {
    const {error} =  validateCustomer(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let customer = await Customer.findByIdAndUpdate(req.params.id,{
        isGold:req.body.isGold,
        name:req.body.name,
        phone:req.body.phone
    }, {
        new:true
    });

    if(!customer) res.status(400).send('Customer not found');

    res.send(customer);
});

router.delete('/id',async (req,res)=>{
    const customer = await Customer.findByIdAndRemove(req.params.id); 
    if(!customer) res.status(400).send('Customer not found');

    res.send(customer);
});

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string()
        .min(2)
        .max(50)
        .required(),
        phone: Joi.String()
        .min(10)
        .max(10)
        .required()
    });

    return schema.validate(customer);
}

module.exports = router;