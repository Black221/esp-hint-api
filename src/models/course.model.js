const {Schema} = require("mongoose");
const mongoose = require("mongoose");



const CourseSchema = new Schema(
    {
        department: {
            type: String,
            enum: ['DGI', 'DGE', 'DGM', 'DGC', 'DG', 'GCBA']
        },
        option: [{
            type: String,
            enum: ['Inf', 'TR', 'BA', 'GC', 'GE', 'BioMed', 'IA', 'IK']
        }],
        level: {
            type: Number,
        },
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
        },
        files: [{
            type: Schema.Types.ObjectId,
            ref: 'File'
        }],
    }
);



module.exports.CourseModel = mongoose.model('Course', CourseSchema);