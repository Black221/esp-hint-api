const {Schema} = require("mongoose");
const mongoose = require("mongoose");


const DepartmentSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true
        },
        options: [{
            name: {
                type: String,
                required: true,
            },
            matieres : [{
                type: Schema.Types.ObjectId, ref: 'Matiere'
            }]
        }],
    }
);

const MatiereSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        files: [{
            type: Schema.Types.ObjectId, ref: 'File'
        }]
    }
);



module.exports.Matiere = mongoose.model('Matiere', MatiereSchema);
module.exports.Department =  mongoose.model('Department', DepartmentSchema);