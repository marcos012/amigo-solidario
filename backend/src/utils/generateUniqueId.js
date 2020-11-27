const cryoto = require('crypto');

module.exports = function uniqueId() {
    return cryoto.randomBytes(4).toString('HEX');
}