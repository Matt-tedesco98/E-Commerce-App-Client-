const userModel = require('../models/userModel');
const createError =  require('http-errors');

const findId = (id) => {
    const user = userModel.findById(id);
    if (!user) {
        throw createError(404, 'User not found');
    }
    return user;
}

module.exports = {
    findId,
}
