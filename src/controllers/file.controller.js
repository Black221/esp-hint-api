
const { FileModel } = require('../models/file.model');
const {ObjectId} = require("mongodb");


module.exports.getAllFiles  = async (req, res) => {
    try {
        const files = await FileModel
            .find()
            .select('-password')
        return res.status(200).json({files});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.getOneFile  = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        const file = await FileModel
            .findById({_id: req.params.id})
        return res.status(200).json({file});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.addOneFile = (req, res) => {

}

module.exports.addManyFiles = (req, res) => {

}

module.exports.updateFile  = (req, res) => {

}

module.exports.deleteFile  = (req, res) => {

}
