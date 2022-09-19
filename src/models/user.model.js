

const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const {Schema} = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 55,
            trim: true
        },
        picture: {
            type: String,
        },
        studentId: {
            type: String,
            minLength: 2,
            maxLength: 55,
            trim: true
        },
        department: {
            type: Schema.Types.ObjectId,
            ref: 'Department'
        },
        formation : {
            type: Schema.Types.ObjectId,
            ref: 'Formation'
        },
        option: {
            type: Schema.Types.ObjectId,
            ref: 'Option'
        },
        year: {

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
