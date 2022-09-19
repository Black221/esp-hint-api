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
        formations_options : [{
            formation: {
                type: Schema.Types.ObjectId,
                ref: 'Formation'
            },
            option: {
                type: Schema.Types.ObjectId,
                ref: 'Option'
            },
            years: [{
                number : {
                    type: Number,
                },
                semesters : {
                    type :[{
                        number: {
                            type: Number,
                        },
                        matieres: [{
                            type: Schema.Types.ObjectId,
                            ref: 'Matiere'
                        }]
                    }],
                    default : [
                        {number: 1, matieres:[]},
                        {number: 2, matieres:[]}
                    ]
                },
            }],
        }],
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
        abv : {
            type: String,
            required: true,
            maxlength: 50,
            unique: true
        },
        year : {
            type : Number
        }
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
        files: [{
            type: Schema.Types.ObjectId,
            ref: 'File'
        }],
    }
);


module.exports.MatiereModel = mongoose.model('Matiere', MatiereSchema);
module.exports.OptionModel = mongoose.model('Option', OptionSchema)
module.exports.FormationModel = mongoose.model('Formation', FormationSchema)
module.exports.DepartmentModel =  mongoose.model('Department', DepartmentSchema);