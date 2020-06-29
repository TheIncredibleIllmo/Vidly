const winston = require('winston');
const express = require('express');
const app = express();

//Error config
require('./startup/logging')();

//Routes config
require('./startup/routes')(app);

//DB config
require('./startup/db')();

//Environment variables config
require('./startup/config')();

//Joi validation config
require('./startup/validation')();

const port = process.env.PORT || 3000;
app.listen(port, () => winston.info(`Listening on port ${port}...`));