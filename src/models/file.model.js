const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
    {

        date: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true
        },
        size: {
            type: String
        },
        examType: {
            type: String,
            enum: ['CC', 'DS']
        },
        filepath: {
            type: String,
            required: true,
            unique: true
        },
    }
);

module.exports.FileModel = mongoose.model('File', FileSchema);