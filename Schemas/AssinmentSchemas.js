const mongoose = require('mongoose')
const AssinmentSchemas = mongoose.Schema({
    name: String,
    subject: String,
    marks: Number,
    driscription: String,
    requirement: String,
    expaction: String,
    openDate: Date,
    closeDate: Date
});

module.exports = AssinmentSchemas