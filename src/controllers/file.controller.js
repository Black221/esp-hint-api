
const { FileModel } = require('../models/file.model');
const {ObjectId} = require("mongodb");
const { CourseModel } = require("../models/course.model");


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

module.exports.addOneFile = async (req, res) => {

    if (!ObjectId.isValid(req.params.id_course) &&
        CourseModel.exists({_id: req.params.id_course}))
        return res.status(400).send('ID unknown');
    const {date} = req.body;
    try {
        const file = await FileModel.create({
            date,
            size : req.file.size,
            filepath: `${req.protocol}://${process.env.HOST}:${process.env.PORT}/api/file/documents/${req.file.filename}`
        });

        const course = await CourseModel.findOneAndUpdate(
            {_id: req.params.id_course},
            { $push : {
                files : file._id
            }}
        )
        res.status(200).json({file : file, course : course});
    } catch (error) {
        console.log(error)
        res.status(400).json( { error })
    }
}

module.exports.updateFile  = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');

    try {
        const file = await FileModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    date : req.body.date
                }
            }
        );
        res.status(200).json({file});
    } catch (err) {
        return res.status(500).json({ message: err });
    }
}

module.exports.deleteFile  = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');

    try {
        await FileModel
            .remove({_id: req.params.id})
            .exec();
        return res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}
