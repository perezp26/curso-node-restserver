const bcryptjs = require('bcryptjs');

const passEncrypt = (password = '') => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
}

module.exports = passEncrypt;