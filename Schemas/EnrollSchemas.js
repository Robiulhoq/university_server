const mongoose = require('mongoose');

const EnrollSchemas =  mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    imgLink: {
        type: String
    },
    status: {
        type: String
    }
});

module.exports = EnrollSchemas;