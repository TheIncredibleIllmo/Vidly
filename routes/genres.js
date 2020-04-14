const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('@hapi/joi');

//Collection and schema
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    }
}));

router.get('/:id',async (req,res)=>{
    const genre = await Genre.findById(req.params.id);
    if(!genre) return res.status(400).send('Genre not found');
    res.send(genre);
});

router.get('/',async (req, res)=> {
    const genres = await Genre.find().sort('name');
    res.send(genres);
});

router.post('/',async (req,res)=>{
    const {error} =  validateGenre(req.body);

    if(error) return res.status(400).send(error.details[0].message);

    let genre = new Genre({ name: req.body.name });
    genre = await genre.save(genre);
    res.send(genre);
});

router.put('/:id', async (req,res)=> {
    const {error} =  validateGenre(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let genre = await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{
        new:true
    });

    if(!genre) return res.status(400).send('Genre not found');
    res.send(genre);
});

router.delete('/:id',async (req,res)=>{
    const genre = await Genre.findByIdAndRemove(req.params.id);
    if(!genre) return res.status(400).send('Genre not found');
    res.send(genre);
});

function validateGenre(genre) {

    const schema = Joi.object({
        name: Joi.string()
                .min(3)
                .required()
    });

    return schema.validate(genre);
}

module.exports = router;