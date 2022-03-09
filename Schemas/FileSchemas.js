const mongoose = require('mongoose')

const FileSchemas = mongoose.Schema({
    file: {
        type: String
    }
});
module.exports = FileSchemas