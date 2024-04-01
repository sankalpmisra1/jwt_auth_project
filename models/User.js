const mongoose = require('mongoose');
const {userSchema} = require('../schemas/user.schemas');

//Create provider model
const User = mongoose.model('User', userSchema);

module.exports = User;