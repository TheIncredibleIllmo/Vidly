const express = require('express');
const app = express();
const Joi = require('@hapi/joi');

//Middleware
app.use(express.json());

const genres = [
    {id:1, name:'Action'},
    {id:2, name:'Cartoons'},
    {id:3, name:'Anime'}
];

//Server
app.get('/vidly/',(req, res)=> {
    res.send('Hello from Vidly API');
});

app.get('/vidly/api/genres',(req, res)=> {
    res.send(genres);
});

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on port ${port}...`));

