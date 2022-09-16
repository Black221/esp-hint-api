
//Models
const {
    DepartmentModel,
    MatiereModel,
    OptionModel,
    FormationModel
} = require('../models/constants.model');
const { ObjectId } = require("mongodb");
const {FileModel} = require("../models/file.model");
const mongoose = require("mongoose");


//Formation

module.exports.getAllFormation = async (req, res) => {
    try {
        const formation = await FormationModel
            .find()
            .populate('options')
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
            .populate('options')
        return res.status(200).json({formation});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.addFormation = async (req, res) => {
    const {name} = req.body;
    console.log(req.body)
    try {
        const formation = await FormationModel.create({
            name,
        });
        res.status(201).json({formation});
    } catch (err) {
        console.log(err)
        res.status(400).json({err});
    }
}

module.exports.updateFormationAddDepartment = async (req, res) => {

    if (!ObjectId.isValid(req.params.id_formation)
        && !FormationModel.exists({_id: req.params.id_formation}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_dep)
        && !DepartmentModel.exists({_id: req.params.id_dep}))
        return res.status(400).send('ID unknown');

    try {
        const update = await FormationModel.findByIdAndUpdate(
            {_id: req.params.id_formation},
            {
                $push: {
                    departments: req.params.id_dep
                }
            }
        )
        res.status(201).json({update});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.updateFormationAddOption = async (req, res) => {

    if (!ObjectId.isValid(req.params.id_formation)
        && !FormationModel.exists({_id: req.params.id_formation}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_option)
        && !OptionModel.exists({_id:req.params.id_option}))
        return res.status(400).send('ID unknown');

    try {
        const update = await FormationModel.findByIdAndUpdate(
            {_id: req.params.id_formation},
            {
                $push: {
                    options: req.params.id_option
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


module.exports.getAllDepartment = async (req, res) => {
    try {
        const departments = await DepartmentModel
            .find()
            .populate('formations.options')
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
            .populate('options')
        return res.status(200).json({department});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.addDepartment = async (req, res) => {
    const {name, abv} = req.body;
    console.log(req.body)
    try {
        const department = await DepartmentModel.create({
            name,
            abv
        });
        res.status(201).json({department});
    } catch (err) {
        console.log(err)
        res.status(400).json({err});
    }
}

module.exports.updateDepartment = async (req, res) => {

    if (!ObjectId.isValid(req.params.id_dep)
        && !DepartmentModel.exists({_id: req.params.id_dep}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_formation)
        && !FormationModel.exists({_id: req.params.id_formation}))
        return res.status(400).send('ID unknown');

    try {
        const update = await DepartmentModel.findByIdAndUpdate(
            {_id: req.params.id_formation},
            {
                $push: {
                    formations: req.params.id_formation
                }
            }
        )
        res.status(201).json({update});
    } catch (err) {
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
        res.status(201).json({option: option._id});
    } catch (err) {
        console.log(err)
        res.status(400).json({err});
    }
}

module.exports.updateOption = async (req, res) => {
    if (!ObjectId.isValid(req.params.id_option)
        && !OptionModel.exists({_id: req.params.id_option}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_matiere)
        && !MatiereModel.exists({_id: req.params.id_matiere}))
        return res.status(400).send('ID unknown');

    try {
        const update = await OptionModel.findByIdAndUpdate(
            {_id: req.params.id_option},
            {
                $push: {
                    matieres: req.params.id_matiere
                }
            }
        )
        res.status(201).json({update});
    } catch (err) {
        return res.status(400).json({error: err});
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
module.exports.getAllMatiere = async (req, res) => {
    try {
        const matieres = await MatiereModel
            .find()
        return res.status(200).json({matieres});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.getOneMatiere = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        const matiere = await MatiereModel
            .findById({_id: req.params.id})
        return res.status(200).json({matiere});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.addMatiere = async (req, res) => {
    const {
        name,
        icons,
        department_options
    } = req.body;
    console.log(req.body)
    try {
        const matiere = await MatiereModel.create({
            name,
            icons,
            department_options
        });

        res.status(201).json({matiere});
    } catch (err) {
        console.log(err)
        res.status(400).json({err});
    }
}

module.exports.updateMatiereFile = async (req, res) => {

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
                'years.number': req.body.year,
                'semesters.num': req.body.semester
            },
            {
                $push: {
                    'years.$.semesters.$.files': req.params.id_file
                }
            }
        )
        res.status(201).json({update});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.updateMatiereOption = async (req, res) => {
    if (!ObjectId.isValid(req.params.id_matiere)
        && !MatiereModel.exists({_id: req.params.id_matiere}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_option)
        && !OptionModel.exists({_id: req.params.id_option}))
        return res.status(400).send('ID unknown');

    try {
        const update = await MatiereModel.update(
            {_id: req.params.id_matiere},
            {
                $push: {
                    'department_options.options': req.params.id_option
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