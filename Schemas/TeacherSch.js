const mongoose = require('mongoose');

const TeacherSch = mongoose.Schema({
    email: String,
    password: String
});

module.exports = TeacherSch;