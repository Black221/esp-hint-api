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
        abv: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true
        },
        formations: [{
            type: Schema.Types.ObjectId,
            ref: 'Formation'
        }]
    }
);

const FormationSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true
        },
        department: [{
            type: Schema.Types.ObjectId,
            ref: 'Department'
        }],
        options: [{
            type: Schema.Types.ObjectId,
            ref: 'Option'
        }]
    }
);


const OptionSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        abv: {
            type: String,
            required: true,
            maxlength: 50,
            unique: true
        },
        matieres : [{
            type: Schema.Types.ObjectId,
            ref: 'Matiere'
        }]
    }
)

const MatiereSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        icon: {
            type: String,
        },
        years: [{
            number : {
                type: Number,
            },
            semesters : [{
                num : {
                    type: Number,
                },
                files : [{
                    type: Schema.Types.ObjectId,
                    ref: 'File'
                }],
                default : [{num: 1, files:[]}, {num: 2, files:[]}]
            }],
        }],
        department_options: {
            department: {
                type: Schema.Types.ObjectId,
                ref: 'Department',
            },
            options: [{
                type: Schema.Types.ObjectId,
                ref: 'Option'
            }],
        },
    }
);


module.exports.MatiereModel = mongoose.model('Matiere', MatiereSchema);
module.exports.OptionModel = mongoose.model('Option', OptionSchema)
module.exports.FormationModel = mongoose.model('Formation', FormationSchema)
module.exports.DepartmentModel =  mongoose.model('Department', DepartmentSchema);