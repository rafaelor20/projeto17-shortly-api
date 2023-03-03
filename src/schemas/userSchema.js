import joi from "joi"

export const userSignUpSchema = joi.object ({
    name: joi.string().max(250).required(),
    email: joi.string().max(250).email({ tlds: { allow: false } }).required(),
    password: joi.string().max(250).required(),
    confirmPassword: joi.string().max(250).required()
})

export const userSignInSchema = joi.object ({
    email: joi.string().max(250).email({ tlds: { allow: false } }),
    password: joi.string().max(250).required()
})

