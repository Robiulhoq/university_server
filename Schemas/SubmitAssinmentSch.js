const mongoose = require('mongoose');
const SubmitAssinSchemas = mongoose.Schema({
    assinmetId: String,
    email: String,
    title: String,
    fileUrl: String,
    subject: String,
    studentName: String,
    description: String,
    gradePoint: String,
    comment: String,
    date: String,
    
});

module.exports = SubmitAssinSchemas