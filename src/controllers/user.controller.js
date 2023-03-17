const { ObjectId } = require("mongodb");
const { UserModel } = require("../models/user.model");
const bcrypt = require("bcrypt");
const { CourseModel} = require("../models/course.model");

const YEARS = {
    "DUT1" : 1,
    "DUT2" : 2,
    "DIC1" : 1,
    "DIC2" : 2,
    "DST1" : 1,
    "DST2" : 2,
    "L1" : 1,
    "L2" : 2,
    "L3" : 3,
    "M1" : 1,
    "M2" : 2,
}



module.exports.getUserInfo = async (req, res) => {

    try {

        const user = await UserModel
            .findById(req.params.id)
            .select(['-password', '-token']);

        return res.status(200).json({user});

    } catch (err) {
        return res.status(400).json({error: err});
    }
};

module.exports.getAllUsers = async (req, res) => {
    try {

        const users = await UserModel
            .find()
            .select('-password')

        return res.status(200).json({users});
    } catch (err) {
        return res.status(400).json({error: err});
    }
};


module.exports.updateUserPassword = async (req ,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');

    try {
        const user = await UserModel.findById({ _id: req.params.id});
        if (!user)
            return res.status(400).json('Mot de passe invalide');

        const validPass = await bcrypt.compare(req.body.exPassword, user.password);

        if (!validPass)
            return res.status(400).json('Mot de passe invalide');

        const salt = await bcrypt.genSalt();
        const password = await bcrypt.hash(req.body.password, salt);
        const newUser = await UserModel.updateOne(
            {_id: req.params.id},
            {
                $set: {
                    password,
                }
            }
        );
        res.status(200).json({user : newUser});
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.updateUser = async (req ,res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');

    try {
        const user = await UserModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    picture : `api/file/pictures/${req.file.filename}`
                }
            }
        )
        res.status(200).json({user});
    } catch (err) {
        return res.status(500).json({ message: err });
    }
};

module.exports.updateUserFormation = async (req, res) => {

    const {
        department,
        formation,
        option,
        level
    } = req.body;

    try {
        const user = await UserModel.findByIdAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    department,
                    formation,
                    option,
                    level
                }
            }
        )
        res.status(200).json({user});
    } catch (err) {
        console.log(err)
        return res.status(500).json({ message: err });
    }
}

module.exports.deleteUser = async (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send('ID unknown');
    try {
        await UserModel
            .remove({_id: req.params.id})
            .exec();
        return res.status(200).json({message: "Successfully deleted"});
    } catch (err) {
        return res.status(400).json({error: err});
    }
};