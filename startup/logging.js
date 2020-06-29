const winston = require('winston');
require('winston-mongodb');
require('express-async-errors');

module.exports = function () {

    //For Sync code only!
    // process.on('uncaughtException', (ex) => {
    //     winston.error(ex.message, ex);
    //     process.exit(1);
    // });

    winston.handleExceptions(
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'uncaughtExceptions.log' })
    );

    //For rejected promises
    process.on('unhandledRejection', (ex) => {
        // winston.error(ex.message, ex);
        // process.exit(1);
        throw ex;

    });

    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    winston.add(new winston.transports.MongoDB({ db: 'mongodb://localhost:27017/vidly' }));

    //Uncomment this line in case you want to test any error:
    //throw new Error('Something failed during startup');
    // const p = Promise.reject(new Error('Something failed miserably!'));
    // p.then(() => console.log('Done'));
}