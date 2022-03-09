const mongoose = require('mongoose');

const courseSchemas =  mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    imgLink: {
        type: String
    }
});

module.exports = courseSchemas;