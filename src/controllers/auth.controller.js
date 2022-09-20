const {UserModel} = require('../models/user.model');

const {
    // loginValidation,
    // registerValidation
} = require('../utils/validation.utils');

const {
    signUpErrors,
    // signInErrors
} = require("../utils/error.utils");

const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");

// const MAX_AGE = 8 * 60 * 60 * 1000;
const createToken = (user) => {
    return jwt.sign(
        { user : user._id, login: user.email, access: user.admin},
        process.env.TOKEN_SECRET,
        { expiresIn: "6h"},
        undefined
    )
};



module.exports.login = async (req, res) => {
    // const {error} = loginValidation(req.body);
    // if (error)
    //     return res.status(400).json(error.details[0].message);
    try {
        const user = await UserModel.findOne({ email: req.body.email});
        if (!user)
            return res.status(400).json('Login ou mot de passe invalide');
        const validPass = await bcrypt.compare(req.body.password, user.password);
        if (!validPass)
            return res.status(400).json('Login ou mot de passe invalide');
        const token = createToken(user);
        await UserModel.findOneAndUpdate(
            { login: req.body.login },
            {
                $set: { token: token }
            }
        );
        console.log("connexion etablie")
        res.status(200).setHeader('Authorization', `Bearer ${token}`).json({
            userId: user._id,
            admin: user.admin,
            token: token
        });
    } catch (err) {
        console.log("connexion echoué")

        res.status(400).json({err : err});
    }
};

module.exports.register = async (req, res) => {

    // const {error} = registerValidation(req.body);
    // if (error)
    //     return res.status(400).json(error.details[0].message);

    const emailExist = await UserModel.findOne({ email: req.body.email});
    if (emailExist)
        return res.status(400).json('email already exists');

    const {name, email, password, department, formation, option, year} = req.body;
    try {
        const user = await UserModel.create({
            name,
            email,
            password,
            department,
            formation,
            option,
            year
        });
        res.status(201).json({use: user._id});
    } catch (err) {
        const errors = signUpErrors(err);
        res.status(200).json({errors});
    }
};

module.exports.logout = async (req, res) => {
    const token = req.user;
    try {
        await UserModel.findByIdAndUpdate(
            {_id: token.user},
            {
                $set: { token: 'fake token'}
            }
        );
        res.status(200).setHeader('Authorization', '').json('disconnected');
    } catch (err) {
        res.status(500).json({error: err})
    }
};
