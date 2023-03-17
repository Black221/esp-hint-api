
const {ObjectId} = require("mongodb");
const { CourseModel } = require("../models/course.model");
const {FileModel} = require("../models/file.model");
const { UserModel } = require("../models/user.model");


module.exports.getOneCourse = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        const course = await CourseModel
            .findById(req.params.id)
            .populate('files')
        return res.status(200).json({course});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.getAllCourse = async (req, res) => {
    try {
        const courses = await CourseModel
            .find()
            .populate('files')
        return res.status(200).json({courses});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}

module.exports.getUserCourses = async  (req, res) => {

    try {
        const {id_user} = req.params;
        const user = await UserModel.findById(id_user);
        if (!user) {
            return res.status(400).json(("Veuillez ressayer"))
        }
        const courses = await CourseModel.find({
            department: user.department,
            option: user.option,
            level: user.level
        })

        return res.status(200).json({courses});

    } catch (err) {
        return res.status(500).json({result: null, msg: err.message})
    }
}


module.exports.addCourse = async (req, res) => {
    const {
        name,
        icon,
        department,
        option,
        level
    } = req.body;
    try {
        const course = await CourseModel.create({
            name,
            icon,
            department,
            option,
            level
        });

        res.status(201).json({course});
    } catch (err) {
        res.status(400).json({err});
    }
}


module.exports.updateCourse = async (req, res) => {
    if (!ObjectId.isValid(req.params.id_formation)
        && !CourseModel.exists({_id: req.params.id_course}))
        return res.status(400).send('ID unknown');

    try {
        const update = await CourseModel.findByIdAndUpdate(
            {
                _id: req.params.id_course,
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


module.exports.addCourseFile = async (req, res) => {

    if (!ObjectId.isValid(req.params.id_course)
        && !CourseModel.exists({_id: req.params.id_course}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_file)
        && !FileModel.exists({_id: req.params.id_file}))
        return res.status(400).send('ID unknown');

    try {
        const update = await CourseModel.update(
            {
                _id: req.params.id_course,
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


module.exports.delCourseFile = async (req, res) => {

    if (!ObjectId.isValid(req.params.id_course)
        && !CourseModel.exists({_id: req.params.id_course}))
        return res.status(400).send('ID unknown');

    if (!ObjectId.isValid(req.params.id_file)
        && !FileModel.exists({_id: req.params.id_file}))
        return res.status(400).send('ID unknown');

    try {
        const update = await CourseModel.update(
            {
                _id: req.params.id_course,
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

module.exports.delCourse = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await CourseModel
            .remove({_id: req.params.id})
            .exec();
        return res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        return res.status(400).json({error: err});
    }
}