const mongoose = require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');
const {Department} = require("./constants.model");
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
        studentId: {
            type: String,
            required: true,
            minLength: 2,
            maxLength: 55,
            trim: true
        },
        department: {
            type: Schema.Types.ObjectId, ref: 'Department'
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
        }
    }
);

// play function before save into DB
userSchema.pre("save", async function (next)  {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

userSchema.statics.login = async function (email, password) {
    const user = await this.findOne({ email });
    if (user) {
        const auth = await bcrypt.compare(password, user.password);
        if (auth) {
            return user;
        }
        throw Error('incorrect email or password');
    }
    throw Error('incorrect email or password');
};

const UserModel = mongoose.model("User", userSchema);
module.exports = UserModel;