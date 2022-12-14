const Joi = require("joi");

module.exports.registerValidation = data => {
    const schema = Joi.object({
        name: Joi
            .string()
            .min(3)
            .required(),
        password: Joi
            .string()
            .min(8)
            .required(),
        email: Joi
            .string()
            .required()
            .min(5),
    });
    return schema.validate(data);
}

module.exports.loginValidation = data => {
    const schema = Joi.object({
        password: Joi
            .string()
            .min(8)
            .required(),
        email: Joi
            .string()
            .required()
            .min(5)
    });
    return schema.validate(data);
}

module.exports.updateValidation = data => {
    const schema = Joi.object({

    })
    return schema.validate(data);
}