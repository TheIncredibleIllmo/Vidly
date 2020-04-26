const bcrypt = require('bcrypt');

//salt: string before or after
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    const hashed = bcrypt.hash(password, salt);
    return hashed;
}

async function comparePassword(inPassword, refPassword) {
    return await bcrypt.compare(inPassword, refPassword);
}

module.exports.hashPassword = hashPassword;
module.exports.comparePassword = comparePassword;
