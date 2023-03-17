

const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const {Schema} = require("mongoose");
const { required } = require('joi');

const userSchema = new mongoose.Schema(
    {
        pseudo: {
            type: String,
            minlength: 3,
            max: 12,
        },
        email: {
            type: String,
            required: true,
            validate: [isEmail],
            lowercase: true,
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            max: 1024,
            minlength: 8
        },
        picture: {
            type: String,
        },
        level: {
            type: Number,
            required: true,
        },
        department: {
            type: String,
            enum:['DGI','GCBA', 'DGM', 'DG', 'DGE', 'DGC'],
            required: true,
        },
        option: {
            type: String,
            required: true,
        },
        formation: {
            type: String
        },
        token: {
            type: String,
            default: 'fake token'
        },
        admin: {
            type: Boolean,
            default: false
        }
    }
);

// play function before save into DB
userSchema.pre("save", async function (next)  {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports.UserModel= mongoose.model("User", userSchema);
