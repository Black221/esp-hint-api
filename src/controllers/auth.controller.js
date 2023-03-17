const { UserModel } = require('../models/user.model');

const {
    // loginValidation,
    // registerValidation
} = require('../utils/validation.utils');

const {
    // signUpErrors,
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
        const {email , password} = req.body;
        const user = await UserModel.findOne({email});

        if (!user)
            return res.status(400).json("Vous n'êtes pas encore inscrit");

        const validPass = await bcrypt.compare(password, user.password);
        if (!validPass)
            return res.status(400).json('Email ou mot de passe invalide');
        const token = createToken(user);

        res.status(200).setHeader('Authorization', `Bearer ${token}`).json({
            userId: user._id,
            admin: user.admin,
            token: token
        });
        
    } catch (err) {
        res.status(500).json("Une erreur c'est produit");
    }
};

module.exports.createUser = async (req, res) => {

    try {
        const {pseudo, email, password, department, option, level, formation} = req.body;
        
        if (await UserModel.exists({email}))
            return res.status(200).json({result: null, msg: "Vous êtes déjà inscrit."})

        const user = await UserModel.create({
            pseudo,
            email,
            password,
            department, option, level, formation,
            admin: false
        })

        if (user)
            return res.status(200).json({result: user.pseudo, msg: "Inscription réussie"});
        return res.status(400).json({result: "fail", msg: "Une erreur c'est produite veuillez réessayer plutard"});

    } catch (err) {
        console.log(err);
        return res.status(500).json({result: null, msg: err.message})
    }
}


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
