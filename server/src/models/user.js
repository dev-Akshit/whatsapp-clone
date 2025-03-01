const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: 'string', required: true, unique: true },
    email: { type: 'string', required: true},
    password: { type: 'string', required: true}
});

module.exports = mongoose.model('user', UserSchema);