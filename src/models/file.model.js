const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true
        },
        filePath: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true
    }
);

module.exports.FileModel = mongoose.model('File', FileSchema);