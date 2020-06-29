const config = require('config');

module.exports = function () {
    //Environment variables
    if (!config.get('jwtPrivateKey')) {
        throw new Error("FATAL ERROR: jwtPrivateKey is not defined.");
    }
}