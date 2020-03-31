const express = require('express');
const app = express();

//routes
const genres = require('./routes/genres');
const home = require('./routes/home');

//Middleware
app.use(express.json());

app.use('/vidly/api/genres',genres);
app.use('/vidly/api/',home);

const port = process.env.PORT || 3000;
app.listen(port,()=> console.log(`Listening on port ${port}...`));

