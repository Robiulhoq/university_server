const mongoose = require('mongoose')

const ClassSchemas = mongoose.Schema({
    topic: {
        type: String
    },
    overView: {
        type: String
    },
    drescrption: {
        type: String
    },
    subject: {
        type: String
    },
    status: {
        type: String
    },
});
module.exports = ClassSchemas