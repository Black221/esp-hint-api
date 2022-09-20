
//Models
const {
    DepartmentModel,
    MatiereModel,
    OptionModel,
    FormationModel
} = require('../models/department.model');
const { ObjectId } = require("mongodb");
const {FileModel} = require("../models/file.model");
const mongoose = require("mongoose");


module.exports.getAllDepartment = async (req, res) => {
    try {
        const departments = await DepartmentModel
            .find()
            .populate('formations_options.formation')
            .populate('formations_options.option')
            .populate('formations_options.years.semesters.matieres.file')
            .populate('formations_options.years.semesters.matieres')

        return res.status(200).json({departments});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.getOneDepartment = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        const department = await DepartmentModel
            .findById({_id: req.params.id})
            .populate('formations_options.formation')
            .populate('formations_options.option')
            .populate('formations_options.years.semesters.matieres')
            .populate('formations_options.years.semesters.matieres.files')
        return res.status(200).json({department});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.addDepartment = async (req, res) => {
    const {name, abv} = req.body;
    try {
        const department = await DepartmentModel.create({
            name,
            abv
        });
        res.status(201).json({department});
    } catch (err) {
        res.status(400).json({err});
    }
}

module.exports.addDepartmentFormationOption = async (req, res) => {

    if (!ObjectId.isValid(req.params.id_dep)
        && !DepartmentModel.exists({_id: req.params.id_dep}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_formation)
        && !FormationModel.exists({_id: req.params.id_formation}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_option)
        && !FormationModel.exists({_id: req.params.id_option}))
        return res.status(400).send('ID unknown');

    if (await DepartmentModel.findOne({
            _id: req.params.id_dep,
            $and: [
                    {'formations_options.formation': req.params.id_formation},
                    {'formations_options.option': req.params.id_option}
            ]
    })) return res.status(400).send('Existe deja');

    try {
        const formation = await FormationModel.findById(req.params.id_formation);
        let years = [];
        for (let i = 0; i < formation.year; i++) {
            years.push({number: i + 1});
        }
        const update = await DepartmentModel.findByIdAndUpdate(
            {_id: req.params.id_dep},
            {
                $push: {
                    formations_options: {
                        option : req.params.id_option,
                        formation : req.params.id_formation,
                        years
                    },
                }

            }  )
        res.status(201).json({update});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.delDepartmentFormationOption = async (req, res) => {

    if (!ObjectId.isValid(req.params.id_dep)
        && !DepartmentModel.exists({_id: req.params.id_dep}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_formation)
        && !FormationModel.exists({_id: req.params.id_formation}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_option)
        && !FormationModel.exists({_id: req.params.id_option}))
        return res.status(400).send('ID unknown');

    try {
        const update = await DepartmentModel.findByIdAndUpdate(
            {_id: req.params.id_dep},
            {
                $pull: {
                    formations_options: {
                        option : req.params.id_option,
                        formation : req.params.id_formation,
                    },
                }

            }  )
        res.status(201).json({update});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.addDepartmentFormationOptionMatiere = async (req, res) => {

    if (!ObjectId.isValid(req.params.id_dep)
        && !DepartmentModel.exists({_id: req.params.id_dep}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_formation)
        && !FormationModel.exists({_id: req.params.id_formation}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_option)
        && !OptionModel.exists({_id: req.params.id_option}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_matiere)
        && !MatiereModel.exists({_id: req.params.id_matiere}))
        return res.status(400).send('ID unknown');

    if (await DepartmentModel.findOne({
        _id: req.params.id_dep,
        $and: [
            {'formations_options.years.number': req.body.year},
            {'formations_options.years.semesters.number': req.body.semester,},
            {'formations_options.years.semesters.matieres': req.params.id_matiere},
        ]
    })) return res.status(400).send('Existe deja');


    try {
        const update = await DepartmentModel.findOneAndUpdate(
            {
                _id: req.params.id_dep,
                $and: [
                    {'formations_options.formation': req.params.id_formation},
                    {'formations_options.option': req.params.id_option}
                ]
            },
            {
                $push: {
                    'formations_options.$.years.$[year].semesters.$[semester].matieres': req.params.id_matiere,
                }
            },
            {
                arrayFilters: [
                    {'year.number' : req.body.year},
                    {'semester.number' : req.body.semester}
                ]
            }
        )
        res.status(201).json({update});
    } catch (err) {
        console.log(err)
        return res.status(400).json({error: err});
    }
}


module.exports.delDepartment = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await DepartmentModel
            .remove({_id: req.params.id})
            .exec();
        return res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}


//Formation
module.exports.getAllFormation = async (req, res) => {
    try {
        const formation = await FormationModel
            .find()
        return res.status(200).json({formation});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.getOneFormation = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        const formation = await FormationModel
            .findById({_id: req.params.id})
        return res.status(200).json({formation});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.addFormation = async (req, res) => {
    const {name, abv} = req.body;
    try {
        const formation = await FormationModel.create({
            name,
            abv
        });
        res.status(201).json({formation});
    } catch (err) {
        res.status(400).json({err});
    }
}

module.exports.updateFormation = async (req, res) => {
    if (!ObjectId.isValid(req.params.id_formation)
        && !FileModel.exists({_id: req.params.id_formation}))
        return res.status(400).send('ID unknown');

    try {
        const update = await FormationModel.findByIdAndUpdate(
            {
                _id: req.params.id_formation,
            },
            {
                $set: {
                    abv : req.body.abv,
                    year : req.body.year
                }
            }
        )
        res.status(201).json({update});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.delFormation = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await FormationModel
            .remove({_id: req.params.id})
            .exec();
        return res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

/*--------------------------------------------------------------------------------*/
//Option

module.exports.getAllOption = async (req, res) => {
    try {
        const options = await OptionModel
            .find()
        return res.status(200).json({options});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.getOneOption = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        const option = await OptionModel
            .findById({_id: req.params.id})
        return res.status(200).json({option});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.addOption = async (req, res) => {
    const {
        name,
        abv
    } = req.body;

    try {
        const option = await OptionModel.create({
            name,
            abv
        });
        res.status(201).json({option});
    } catch (err) {
        res.status(400).json({err});
    }
}

module.exports.delOption = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await OptionModel
            .remove({_id: req.params.id})
            .exec();
        return res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

/*--------------------------------------------------------------------------------*/
//Matiere
module.exports.getOneMatiere = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        const matiere = await MatiereModel
            .findById(req.params.id)
            .populate('files')
        return res.status(200).json({matiere});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.getAllMatiere = async (req, res) => {
    try {
        const matieres = await MatiereModel
            .find()
            .populate('files')
        return res.status(200).json({matieres});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.addMatiere = async (req, res) => {
    const {
        name,
        icon,
    } = req.body;
    try {
        const matiere = await MatiereModel.create({
            name,
            icon,
        });

        res.status(201).json({matiere});
    } catch (err) {
        res.status(400).json({err});
    }
}


module.exports.updateMatiere = async (req, res) => {
    if (!ObjectId.isValid(req.params.id_formation)
        && !MatiereModel.exists({_id: req.params.id_matiere}))
        return res.status(400).send('ID unknown');

    try {
        const update = await MatiereModel.findByIdAndUpdate(
            {
                _id: req.params.id_matiere,
            },
            {
                $set: {
                    icon : req.body.icon,
                }
            }
        )
        res.status(201).json({update});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}


module.exports.addMatiereFile = async (req, res) => {

    if (!ObjectId.isValid(req.params.id_matiere)
        && !MatiereModel.exists({_id: req.params.id_matiere}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_file)
        && !FileModel.exists({_id: req.params.id_file}))
        return res.status(400).send('ID unknown');

    try {
        const update = await MatiereModel.update(
            {
                _id: req.params.id_matiere,
            },
            {
                $push: {
                    'files': req.params.id_file
                }
            }
        )
        res.status(201).json({update});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}


module.exports.delMatiereFile = async (req, res) => {

    if (!ObjectId.isValid(req.params.id_matiere)
        && !MatiereModel.exists({_id: req.params.id_matiere}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_file)
        && !FileModel.exists({_id: req.params.id_file}))
        return res.status(400).send('ID unknown');

    try {
        const update = await MatiereModel.update(
            {
                _id: req.params.id_matiere,
            },
            {
                $pull: {
                    'files': req.params.id_file
                }
            }
        )
        res.status(201).json({update});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.delMatiere = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await MatiereModel
            .remove({_id: req.params.id})
            .exec();
        return res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.delCollection = async (req, res) => {
    try {
        await mongoose.connection.db.dropCollection(req.body.collection)
        return res.status(200).json({message: "Successfully deleted"});
    }  catch (err) {
        return res.status(400).json({error: err});
    }
}