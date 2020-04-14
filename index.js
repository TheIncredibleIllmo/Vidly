const mongoose = require('mongoose');
const express = require('express');
const app = express();

//MongoDB connection
mongoose.connect('mongodb://localhost:27017/vidly',  { 
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false})
        .then(()=>console.log('Connected to MongoDb...'))
        .catch((err)=>console.log(`Could not connect to MongoDb, report: ${err.message}`));
 
//Routes
const home = require('./routes/home');
const genres = require('./routes/genres');
const customers = require('./routes/customers');


//Middleware
app.use(express.json());

app.use('/vidly/api/',home);
app.use('/vidly/api/genres',genres);
app.use('/vidly/api/customers',customers);


const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on port ${port}...`));